# Track'em All - Todo List

This document tracks all pending tasks and improvements for the Track'em All application.

**Last Updated:** 2025-01-19

---

## 🔄 In Progress

---

## 📱 PWA (Progressive Web App)

### Icons & Manifest

- [x] Configure PWA plugin in `vite.config.js`
- [x] Create PWA icons (192x192, 512x512, 180x180)
- [x] Update icon paths in manifest config
- [ ] **Verify and add maskable icons for Android adaptive icons**
  - [ ] Research maskable icon requirements (safe zone, padding)
  - [ ] Create maskable versions of icons (192x192, 512x512)
  - [ ] Add maskable icons to manifest with `purpose: "maskable"` or `purpose: "any maskable"`
  - [ ] Test adaptive icon behavior on Android devices
  - [ ] Verify icons display correctly in different Android launcher shapes
- [ ] **Icon improvements (low priority)**
  - [ ] Fix Safari icon background: Create new `apple-touch-icon.png` with black background baked into image (iOS uses white by default, need to design icon with black background)
  - [ ] Improve icon resolution for mobile home screens (currently low resolution)

### Testing

- [x] **Test PWA Installation**
  - [x] Test on Android (Chrome)
  - [x] Test on iOS (Safari)
  - [x] Verify icons display correctly
  - [x] Check app name and theme colors
- [x] **Verify Offline Functionality**
  - [x] Test service worker registration
  - [x] Test offline mode (disable network)
  - [x] Verify cached assets load offline
  - [x] Test update mechanism

### Optional Enhancements

- [ ] Add custom update notification (change from `autoUpdate` to `prompt`)
- [ ] Add offline indicator component
- [ ] Add "Install App" prompt for first-time users
- [ ] Configure caching strategies for API calls

---

## 🔍 SEO (Search Engine Optimization)

### Meta Tags & Structured Data

- [ ] Review and optimize existing meta tags in `index.html`
  - [ ] Verify title tag is descriptive and unique
  - [ ] Ensure meta description is compelling and under 160 characters
  - [ ] Add Open Graph tags for social media sharing
    - [ ] `og:title`
    - [ ] `og:description`
    - [ ] `og:image`
    - [ ] `og:url`
    - [ ] `og:type`
  - [ ] Add Twitter Card tags
    - [ ] `twitter:card`
    - [ ] `twitter:title`
    - [ ] `twitter:description`
    - [ ] `twitter:image`
- [ ] Add structured data (JSON-LD) for better search visibility
  - [ ] Organization/Website schema
  - [ ] BreadcrumbList schema (if applicable)
  - [ ] Article/Content schema for show/episode pages

### Content & URLs

- [ ] Review URL structure for SEO friendliness
  - [ ] Ensure URLs are descriptive and readable
  - [ ] Verify proper use of slugs
- [ ] Add canonical URLs to prevent duplicate content issues
- [ ] Implement dynamic meta tags for individual pages (shows, episodes, people)
  - [ ] Use React Helmet or similar library
  - [ ] Generate unique titles and descriptions per page
  - [ ] Add page-specific Open Graph images

### Technical SEO

- [ ] Verify `robots.txt` is properly configured
- [ ] Create and submit `sitemap.xml`
  - [ ] Include all important pages
  - [ ] Set appropriate priority and change frequency
- [ ] Ensure proper heading hierarchy (H1, H2, H3) on all pages
- [ ] Add alt text to all images
- [ ] Optimize page load speed (covered in Performance section)
- [ ] Ensure mobile-friendliness (verify responsive design)

### Analytics & Monitoring

- [ ] Set up Google Search Console
- [ ] Set up Google Analytics (if not already done)
- [ ] Monitor search performance and indexing status

---

## 🔒 Security Hardening

### Backend Security

- [ ] Add input validation to auth endpoints
  - [ ] Email format validation
  - [ ] Password strength requirements
  - [ ] Input sanitization
- [ ] Add rate limiting to auth endpoints
  - [ ] Login attempts
  - [ ] Registration attempts
  - [ ] API requests
- [ ] Review and tighten CORS policy
  - [ ] Restrict allowed origins
  - [ ] Review credentials handling
- [ ] Review JWT configuration
  - [ ] Set appropriate expiry times
  - [ ] Implement refresh token mechanism
  - [ ] Review token storage (httpOnly cookies vs localStorage)

### Cleanup

- [ ] Remove Firebase if unused
  - [ ] Currently used in `src/firebase/firebase.js` and `src/components/EpisodeCard/EpisodeCard.tsx`
  - [ ] Migrate EpisodeCard to use backend API instead
  - [ ] Delete `src/firebase/*` directory
  - [ ] Remove Firebase-related environment variables

---

## 🧪 Testing

### Test Framework Decision

- [ ] Choose testing framework:
  - [ ] Keep Jest (current setup)
  - [ ] Migrate to Vitest (better Vite integration)
  - [ ] Decision criteria: performance, Vite integration, migration effort

### Playwright Smoke Tests

- [x] Install and configure Playwright
- [x] Create homepage smoke test
- [ ] Add smoke tests for other pages:
  - [ ] Show page (`/show/:id`)
  - [ ] Person page (`/person/:id`)
  - [ ] Favorites page (`/favorites`)
  - [ ] Listing page (`/listing/:type`)
  - [ ] Episode page (`/episode/:id`)
- [ ] Verify Playwright HTML report upload in CI
- [ ] Improve test reliability and error messages

### Unit/Integration Tests

- [ ] Review existing Jest tests
- [ ] Add tests for critical user flows
- [ ] Add tests for auth slice
- [ ] Add tests for API utilities

---

## ⚡ Performance

### Bundle Analysis

- [ ] Install and run `vite-bundle-visualizer`
- [ ] Analyze bundle size
- [ ] Identify heavy modules
- [ ] Document findings

### Code Splitting & Lazy Loading

- [ ] Implement route-based code splitting
- [ ] Lazy-load heavy components
- [ ] Lazy-load images (if applicable)
- [ ] Review and optimize initial bundle size

### Performance Monitoring

- [x] Set up Lighthouse CI
- [x] Configure Lighthouse CI for local runs
- [x] Configure Lighthouse CI for GitHub Actions
- [ ] Set performance budgets/thresholds
- [ ] Monitor Lighthouse scores over time
- [ ] Address performance opportunities identified by Lighthouse

---

## 🛣️ Routing & Dependencies Modernization

### React Router Upgrade

- [ ] Evaluate React Router v6 migration
  - [ ] Review breaking changes from v5 to v6
  - [ ] Plan migration strategy
  - [ ] Update route definitions
  - [ ] Update navigation code
  - [ ] Test all routes after migration

### Dependency Audit

- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Review and upgrade older dependencies
- [ ] Check for deprecated packages
- [ ] Update to latest stable versions where possible
- [ ] Document breaking changes

---

## 🎨 Developer Experience

### Code Quality Tools

- [ ] Set up unified ESLint configuration
- [ ] Set up Prettier configuration
- [ ] Configure ESLint + Prettier integration
- [ ] Add pre-commit hooks (Husky + lint-staged)
- [ ] Document code style guidelines

### CI/CD Improvements

- [x] Set up Playwright tests in CI
- [x] Set up Lighthouse CI in GitHub Actions
- [ ] Add lint check to CI pipeline
- [ ] Add build check to CI pipeline
- [ ] Add test suite to CI pipeline
- [ ] Configure CI to run on all PRs
- [ ] Add status badges to README

---

## ♿ Accessibility & Semantic HTML

### Homepage Improvements

- [x] Review homepage HTML semantics
- [x] Add proper `<main>` element
- [x] Add proper heading hierarchy (`<h1>`, `<h2>`, etc.)
- [x] Use semantic `<section>` elements (removed redundant `aria-labelledby`)
- [x] Use `<article>` for show cards
- [x] Improve ARIA labels where needed
- [ ] Test with screen readers

### General Accessibility

- [x] Run accessibility audit (Lighthouse)
- [x] Fix accessibility issues (✅ 100% accessibility score achieved!)
- [ ] Add keyboard navigation support
- [ ] Ensure proper focus management
- [ ] Test color contrast ratios

---

## 📚 Documentation

- [x] Create CRA to Vite migration guide
- [x] Create Lighthouse CI setup guide
- [x] Create PWA setup summary
- [ ] Update main README with:
  - [ ] Current tech stack
  - [ ] Setup instructions
  - [ ] Development workflow
  - [ ] Testing instructions
  - [ ] Deployment process
- [ ] Document environment variables
- [ ] Create contributing guidelines

---

## 🎯 Completed Tasks

- [x] Migrate from Create React App to Vite
- [x] Upgrade to React 18
- [x] Configure PWA plugin
- [x] Update environment variables (REACT*APP*\_ → VITE\_\_)
- [x] Set up Playwright for smoke tests
- [x] Create homepage smoke test
- [x] Set up Lighthouse CI (local and CI)
- [x] Configure GitHub Actions for Playwright
- [x] Configure GitHub Actions for Lighthouse CI
- [x] Create PWA icons
- [x] Configure PWA manifest
- [x] Reorganize `package.json` dependencies
  - [x] Move testing libraries to `devDependencies` (`@testing-library/*`)
  - [x] Move type definitions to `devDependencies` (`@types/jest`, `@types/node-sass`, `@types/react-router-dom`)
  - [x] Move dev tools to `devDependencies` (`nodemon`)
  - [x] Remove unused Apollo/GraphQL packages (`@apollo/client`, `apollo-server-lambda`, `graphql`)
  - [x] Clean up commented Apollo code in `src/index.tsx`
  - [x] Remove unused `functions/graphql.js` file
- [x] **PWA Testing**
  - [x] Test PWA installation on iOS (Safari) - ✅ All checks passed
  - [x] Test PWA installation on Android (Chrome) - ✅ All checks passed
  - [x] Verify offline functionality - ✅ Service worker working correctly
  - [x] Test service worker registration and updates
  - [ ] **Note for later:** Safari icon shows white background (prefer black) - need to create icon with black background baked in
  - [ ] **Note for later:** Icons are low resolution on mobile home screens - needs improvement

---

## 📝 Notes

- **Priority Order**: Focus on dependencies cleanup → PWA testing → Security → Testing expansion
- **Breaking Changes**: React Router v6 migration should be planned carefully
- **Firebase Removal**: Requires migrating EpisodeCard component to use backend API
- **Testing Strategy**: Consider Vitest for better Vite integration, but Jest is already working

---

## 🔗 Related Documents

- **[Features Roadmap](./FEATURES-ROADMAP.md)** - Future features and enhancements planned for the application
- **[PWA Setup Summary](./PWA-SETUP-SUMMARY.md)** - PWA configuration and setup details
- **[CRA to Vite Migration Plan](./REACT-TO-VITE-MIGRATION-PLAN.md)** - Migration documentation

## 🔗 Resources

- [Vite Documentation](https://vitejs.dev/)
- [vite-plugin-pwa Documentation](https://vite-pwa-org.netlify.app/)
- [Playwright Documentation](https://playwright.dev/)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [React Router v6 Migration Guide](https://reactrouter.com/en/main/upgrading/v5)
- [Web.dev PWA Checklist](https://web.dev/pwa-checklist/)
