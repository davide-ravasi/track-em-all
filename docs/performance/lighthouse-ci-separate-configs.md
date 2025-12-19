# Lighthouse CI: Separate Configs for Local vs CI Environments

## The Problem

When setting up Lighthouse CI to run in GitHub Actions against a deployed Netlify preview URL, you might encounter this error:

```
Runtime error encountered: Lighthouse was unable to reliably load the page you requested.
Make sure you are testing the correct URL and that the server is properly responding to all requests.
```

Or notice that Lighthouse is trying to access a URL with an unexpected port:

```
https://deploy-preview-90--trackem-all.netlify.app:36265/
```

The site works fine at `https://deploy-preview-90--trackem-all.netlify.app`, but Lighthouse is appending a port number and failing.

## Why This Happens

Lighthouse CI has two modes of operation:

1. **Local Development Mode**: Tests your app by starting a local server

   - Uses `startServerCommand` to run your dev server
   - Tests `http://localhost:5173` (or similar)
   - Perfect for local testing before pushing code

2. **CI Mode**: Tests a deployed URL directly
   - Should test the actual deployed site (e.g., Netlify preview)
   - No local server needed
   - Tests the real production-like environment

**The Conflict**: If you use the same config file for both environments, Lighthouse CI will try to start a local server even in CI, which causes:

- A random port being assigned (e.g., `36265`)
- The deployed URL getting the port appended (invalid URL)
- Timeouts because the URL doesn't exist
- Failed tests

## The Solution: Separate Configuration Files

The recommended approach is to maintain **two separate configuration files**:

### 1. `lighthouserc.cjs` (Local Development)

```javascript
module.exports = {
  ci: {
    collect: {
      // Start your local dev server
      startServerCommand: "npm run start",
      url: ["http://localhost:5173"],
      numberOfRuns: 3, // More runs for better accuracy locally
      staticDistDir: "./build", // Optional: for static builds
      settings: {
        maxWaitForFcp: 30000,
        maxWaitForLoad: 60000,
        chromeFlags: "--no-sandbox --disable-gpu",
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.6 }],
        "categories:accessibility": ["error", { minScore: 0.8 }],
        "categories:seo": ["off"],
        "categories:best-practices": ["off"],
      },
    },
  },
};
```

**Usage:**

```bash
npm run dev  # Start your dev server in another terminal
lhci autorun  # Uses lighthouserc.cjs by default
```

### 2. `lighthouserc.ci.cjs` (CI Environment)

```javascript
module.exports = {
  ci: {
    collect: {
      // No startServerCommand - we test deployed URLs in CI
      // No staticDistDir - we test deployed URLs in CI
      numberOfRuns: 1, // Faster in CI (can increase if needed)
      settings: {
        maxWaitForFcp: 30000,
        maxWaitForLoad: 60000,
        chromeFlags: "--no-sandbox --disable-gpu",
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.6 }],
        "categories:accessibility": ["error", { minScore: 0.8 }],
        "categories:seo": ["off"],
        "categories:best-practices": ["off"],
      },
    },
  },
};
```

**Key Differences:**

- ❌ No `startServerCommand` - doesn't try to start a local server
- ❌ No `staticDistDir` - doesn't try to serve local files
- ✅ URL provided via command-line override
- ✅ Fewer runs (faster CI execution)

### 3. GitHub Actions Workflow

```yaml
name: Lighthouse CI
on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  lhci:
    name: Lighthouse CI
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20 # Match your .nvmrc

      # Set BASE_URL based on PR vs main branch
      - name: Set up environment variables
        run: |
          if [ "${{ github.event_name }}" == "pull_request" ]; then
            echo "BASE_URL=https://deploy-preview-${{ github.event.pull_request.number }}--trackem-all.netlify.app" >> "$GITHUB_ENV"
          else
            echo "BASE_URL=https://trackem-all.netlify.app" >> "$GITHUB_ENV"
          fi

      - name: npm install dependencies
        run: npm ci

      - name: Install Lighthouse CI
        run: npm install -g @lhci/cli@0.15.1

      # Use CI-specific config and override URL
      - name: Run Lighthouse CI
        run: |
          lhci autorun \
            --config=lighthouserc.ci.cjs \
            --collect.url=$BASE_URL
        env:
          BASE_URL: ${{ env.BASE_URL }}
        timeout-minutes: 10

      - name: Upload Lighthouse reports
        uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: lighthouse-report
          path: .lighthouseci/
          retention-days: 30
```

**Key Points:**

- Uses `--config=lighthouserc.ci.cjs` to specify the CI config
- Overrides URL with `--collect.url=$BASE_URL` from environment variable
- Waits for Netlify preview to be ready (if needed, add a wait step)
- Uploads reports as artifacts for review

## Why This Solution Works

### ✅ Clear Separation of Concerns

- Local config handles local development needs
- CI config handles deployed environment needs
- No confusion about which settings apply where

### ✅ Easy to Maintain

- Change local settings without affecting CI
- Adjust CI settings independently
- Clear intent in each file

### ✅ Follows Best Practices

- Recommended by Lighthouse CI documentation
- Common pattern in production projects
- Reduces configuration complexity

### ✅ Flexible

- Different `numberOfRuns` for local (3) vs CI (1)
- Different timeout settings if needed
- Easy to add environment-specific optimizations

## Alternative Approaches (And Why They're Less Ideal)

### Option 1: Single Config with Environment Variables

```javascript
module.exports = {
  ci: {
    collect: {
      ...(process.env.CI ? {} : { startServerCommand: "npm run start" }),
      url: process.env.CI ? [process.env.BASE_URL] : ["http://localhost:5173"],
    },
  },
};
```

**Downsides:**

- More complex conditional logic
- Harder to read and maintain
- Mixes concerns in one file
- Less clear what applies where

### Option 2: Command-Line Overrides Only

```bash
lhci autorun \
  --collect.url=$BASE_URL \
  --collect.numberOfRuns=1 \
  --collect.settings.chromeFlags="--no-sandbox --disable-gpu"
```

**Downsides:**

- Very long command lines
- Harder to maintain shared defaults
- No clear separation between local and CI
- Easy to forget required flags

### Option 3: Conditional Logic in Workflow

```yaml
- name: Run Lighthouse CI
  run: |
    if [ "${{ github.event_name }}" == "pull_request" ]; then
      lhci autorun --collect.url=$PREVIEW_URL
    else
      lhci autorun --collect.url=$PROD_URL
    fi
```

**Downsides:**

- Still uses same config file
- Doesn't solve the `startServerCommand` issue
- More complex workflow logic

## Best Practices

### 1. Pin Node Version

Match your CI Node version to your project's `.nvmrc`:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20 # Match .nvmrc
```

### 2. Wait for Preview Deployment

If testing Netlify previews, ensure the deployment is ready:

```yaml
- name: Wait for Netlify preview to be ready
  run: |
    for i in {1..30}; do
      if curl -f "$BASE_URL" > /dev/null 2>&1; then
        echo "Preview is ready!"
        break
      fi
      echo "Waiting for preview... ($i/30)"
      sleep 2
    done
```

### 3. Use Appropriate Timeouts

Lighthouse can be slow, especially on first run:

```yaml
timeout-minutes: 10 # Give it enough time
```

### 4. Different Run Counts

- **Local**: `numberOfRuns: 3` for better accuracy
- **CI**: `numberOfRuns: 1` for faster execution (or 3 if you have time)

### 5. Store Reports

Always upload Lighthouse reports as artifacts:

```yaml
- name: Upload Lighthouse reports
  uses: actions/upload-artifact@v4
  with:
    name: lighthouse-report
    path: .lighthouseci/
    retention-days: 30
```

## Troubleshooting

### Issue: Still Getting Port Appended to URL

**Solution:** Ensure you're using the CI config file:

```bash
lhci autorun --config=lighthouserc.ci.cjs --collect.url=$BASE_URL
```

### Issue: "Unable to determine staticDistDir"

**Solution:** Remove `staticDistDir` from CI config (it's only for local static builds).

### Issue: Timeout in CI

**Solutions:**

- Increase `timeout-minutes` in workflow
- Increase `maxWaitForFcp` and `maxWaitForLoad` in config
- Reduce `numberOfRuns` to 1
- Ensure preview URL is actually deployed before running

### Issue: Connection Refused

**Solutions:**

- Verify `BASE_URL` is correct
- Add a wait step for preview deployment
- Check Netlify deployment status

## Summary

**The Problem:** Lighthouse CI tries to start a local server in CI, causing invalid URLs and failed tests.

**The Solution:** Use separate config files:

- `lighthouserc.cjs` for local development (with `startServerCommand`)
- `lighthouserc.ci.cjs` for CI (without `startServerCommand`)

**The Result:**

- ✅ Local testing works smoothly
- ✅ CI tests actual deployed URLs
- ✅ Clear, maintainable configuration
- ✅ Follows best practices

This approach is recommended by the Lighthouse CI team and is the standard pattern used in production projects.

## Resources

- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md)
- [Lighthouse CI GitHub Actions Example](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/github-actions.md)
- [Web.dev: Performance monitoring with Lighthouse CI](https://web.dev/articles/lighthouse-ci)
