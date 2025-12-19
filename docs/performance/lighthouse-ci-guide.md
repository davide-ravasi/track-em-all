# Lighthouse CI – Local and CI Setup Guide

## Overview

**Goal:** Automatically run Lighthouse to monitor Performance, Accessibility, Best Practices, and SEO scores.

**Two Approaches:**

- **Local:** Quick iteration and config tuning
- **CI:** Automated monitoring and PR gating

**Reference:** [Performance monitoring with Lighthouse CI](https://web.dev/articles/lighthouse-ci)

---

## 1. Local Setup (Developer Loop)

### Prerequisites

- Node 20+ installed
- Your app built: `npm run build` (outputs to `build/` directory)
- Install Lighthouse CI CLI globally: `npm i -g @lhci/cli`

### Configuration File

Create `lighthouserc.js` in your repo root:

```javascript
module.exports = {
  ci: {
    collect: {
      // Option 1: Static site (after build)
      staticDistDir: "./build",
      url: ["/"],

      // Option 2: Dynamic site (if you prefer)
      // startServerCommand: 'npm run preview',
      // url: ['http://localhost:4173'],

      numberOfRuns: 3, // Default, uses median
    },
    assert: {
      // Optional: Start with warnings, move to errors later
      assertions: {
        "categories:performance": ["warn", { minScore: 0.6 }],
        "categories:accessibility": ["error", { minScore: 0.8 }],
        "categories:best-practices": ["warn", { minScore: 0.8 }],
        "categories:seo": ["warn", { minScore: 0.8 }],
      },
    },
    upload: {
      target: "temporary-public-storage", // Quick setup, expires in 7 days
    },
  },
};
```

### Running Locally

**For static build:**

```bash
npm run build
lhci autorun
```

**For dynamic server:**

```bash
lhci autorun
# LHCI will start/stop your server automatically
```

### What Happens

- Runs Lighthouse 3 times (default)
- Calculates median report (more stable)
- Uploads report to temporary public storage
- Shows you the report URL in console

### Tips

- Test against key pages: home, heavy pages, API-heavy pages
- Adjust `numberOfRuns` if needed (3 is usually good)
- Start with `warn` assertions, move to `error` once thresholds are stable

---

## 2. CI Setup (GitHub Actions + Netlify)

### Target URLs

Use the same BASE_URL pattern as Playwright:

- **Pull Request:** `https://deploy-preview-<PR_NUMBER>--trackem-all.netlify.app`
- **Push to main:** `https://trackem-all.netlify.app`

### Workflow Structure

Create `.github/workflows/lighthouse-ci.yml`:

```yaml
name: Lighthouse CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20.x

      # Set BASE_URL based on event type
      - name: Set BASE_URL
        run: |
          if [ "${{ github.event_name }}" = "pull_request" ]; then
            echo "BASE_URL=https://deploy-preview-${{ github.event.pull_request.number }}--trackem-all.netlify.app" >> $GITHUB_ENV
          else
            echo "BASE_URL=https://trackem-all.netlify.app" >> $GITHUB_ENV
          fi

      - name: Install Lighthouse CI
        run: npm install -g @lhci/cli

      - name: Run Lighthouse CI
        run: |
          lhci autorun \
            --collect.url=$BASE_URL \
            --upload.target=temporary-public-storage
        env:
          BASE_URL: ${{ env.BASE_URL }}

      - name: Upload Lighthouse reports
        uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: lighthouse-report
          path: .lighthouseci/
          retention-days: 30
```

### What Happens in CI

- Runs against deployed Netlify URL (preview or production)
- Generates median Lighthouse report
- Uploads report as artifact
- Can fail build if assertions are set to `error` and thresholds aren't met

### Timing Considerations

- Ensure Netlify preview is live before Lighthouse runs
- Consider adding a small delay or wait for preview deployment
- Same timing strategy as your Playwright tests

---

## 3. Assertions & Thresholds

### Purpose

Gate PRs and prevent performance regressions from being merged.

### Configuration

In `lighthouserc.js`, add assertions:

```javascript
assert: {
  assertions: {
    // Performance score (0-1 scale)
    'categories:performance': ['error', { minScore: 0.7 }],

    // Accessibility (should always be high)
    'categories:accessibility': ['error', { minScore: 0.9 }],

    // Best practices
    'categories:best-practices': ['warn', { minScore: 0.8 }],

    // SEO
    'categories:seo': ['warn', { minScore: 0.8 }],
  },
}
```

### Assertion Levels

- `off`: Ignore assertions
- `warn`: Print failures to stderr (doesn't fail build)
- `error`: Print failures and exit with non-zero code (fails build)

### Best Practices

- Start conservative (lower scores, `warn` mode)
- Tighten thresholds over time as you improve
- Focus on performance and accessibility first

---

## 4. Storage Options

### Temporary Public Storage (Quick Start)

- **Setup:** Just set `target: 'temporary-public-storage'`
- **Pros:** Zero configuration, instant setup
- **Cons:** Reports expire after 7 days
- **Best for:** Getting started, local testing

### Lighthouse CI Server (Advanced)

- **Setup:** Requires deploying your own server (Heroku, Docker, etc.)
- **Pros:** Long-term storage, dashboard, historical tracking
- **Cons:** Requires infrastructure management
- **Best for:** Teams wanting performance trends over time

---

## 5. Practical Tips

### URL Selection

- Test critical pages: home, listing pages, detail pages
- Don't test every page (too slow)
- Focus on user journeys

### Stability

- Use `numberOfRuns: 3` (default) for median calculation
- Network conditions can vary; median helps
- CI environment is more consistent than local

### Integration with Existing Workflows

- Use same BASE_URL logic as Playwright
- Can run in parallel with Playwright tests
- Both can use same Netlify preview URL

### Iteration Strategy

1. **Week 1:** Run locally, establish baseline scores
2. **Week 2:** Add to CI with `warn` assertions
3. **Week 3:** Set realistic thresholds based on baseline
4. **Week 4+:** Tighten thresholds, move to `error` mode

---

## 6. Troubleshooting

### Common Issues

**"Chrome installation not found"**

- LHCI needs Chrome/Chromium
- CI: `npx playwright install chromium` (if not already installed)
- Local: Ensure Chrome is installed

**"Connection refused"**

- Check BASE_URL is correct
- Ensure Netlify preview is deployed before running
- For local: ensure server is running or use `staticDistDir`

**Scores vary between runs**

- Normal! Use median (default `numberOfRuns: 3`)
- Network conditions affect performance scores
- CI is more consistent than local

**Assertions failing unexpectedly**

- Check if thresholds are too high
- Review actual scores vs. thresholds
- Start with `warn` mode to see patterns

---

## 7. Resources

- [Official Lighthouse CI Guide](https://web.dev/articles/lighthouse-ci)
- [Lighthouse CI GitHub Repo](https://github.com/GoogleChrome/lighthouse-ci)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md)

---

## Summary

**Local Setup:**

1. Install: `npm i -g @lhci/cli`
2. Create `lighthouserc.js` with collect/upload config
3. Run: `npm run build && lhci autorun`

**CI Setup:**

1. Create workflow file
2. Set BASE_URL based on PR vs main
3. Run `lhci autorun` against deployed URL
4. Upload artifacts

**Best Practice:**

- Do both! Local for quick iteration, CI for automated monitoring
- Start with warnings, move to errors once stable
- Focus on performance and accessibility scores
