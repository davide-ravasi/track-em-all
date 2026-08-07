# Track'em All - Todo List

This document tracks all pending tasks and improvements for the Track'em All application.

**Last Updated:** 2026-08-07

**How to organize:** See **[TODO-ORGANIZATION.md](./TODO-ORGANIZATION.md)** for suggested phases, quick wins, batching by theme, and “what’s next” ideas.

---

## 🔄 In Progress

---

## 🎯 Suggested priority (what to do next)

Use this order if you want a single sequence. Details are in [TODO-ORGANIZATION.md](./TODO-ORGANIZATION.md).

| Priority | Area                         | What to do                                                             | Why                                                                                                                |
| -------- | ---------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **1**    | **Security**                 | ~~HTTP hardening, server env, JWT expiry~~ ✓ ([archive](./TODO-LIST-ARCHIVE.md)). **Next:** favorites hardening → response minimization → logging / `npm audit`. | |
| **2**    | **Firebase**                 | Done (removed). Follow-ups: see **Security → Cleanup** and [archive](./TODO-LIST-ARCHIVE.md). | —                                                                                                                  |
| **3**    | **DevEx / CI**               | Core tooling + CI unified (see [archive](./TODO-LIST-ARCHIVE.md)). Optional: `prettier --check` in CI, lint-staged. | Build on Netlify.                                                                                                  |
| **4**    | **Testing**                  | More Playwright smoke tests (Show, Person, Favorites, etc.)            | You already have homepage; extend coverage before adding features.                                                 |
| **5**    | **Performance**              | Bundle visualizer → code splitting / lazy routes                       | Understand size first, then optimize; supports faster loads.                                                       |
| **6**    | **PWA polish**               | Maskable icons, optional update/offline/install prompts                | Improves install experience; not blocking.                                                                         |
| **7**    | **SEO**                      | Meta + Open Graph in `index.html` → dynamic meta (e.g. Helmet)         | Good for discovery; can batch in one pass.                                                                         |
| **8**    | **Routing / deps**           | React Router v6 evaluation, then dependency upgrades                   | Plan as a dedicated change; do after security and testing.                                                         |
| **9**    | **Polish / later**           | Reusable loader/error, headless kit audit, form CSS, README            | When foundation is solid; improves maintainability.                                                                |
| **—**    | **Cursor Skills**            | Add project **Skills** (`SKILL.md`) for repeatable agent workflows   | Same steps every time (tests, CI, deploy); complements `.cursor/rules`. See **Developer Experience → Cursor Skills**. |
| **—**    | **Data fetching (parallel)** | ~~Core React Query migration~~ ✓ (see [archive](./TODO-LIST-ARCHIVE.md)). Optional: auth `useMutation`, search `useQuery`. | Remaining items in **Data fetching / API** below.                                                                  |

**Quick wins when you have little time:** one more smoke test, `prettier --check` in CI, or meta + Open Graph in `index.html`.

---

## 📱 PWA (Progressive Web App)

### Icons & Manifest

- [ ] **Verify and add maskable icons for Android adaptive icons**
  - [ ] Research maskable icon requirements (safe zone, padding)
  - [ ] Create maskable versions of icons (192x192, 512x512)
  - [ ] Add maskable icons to manifest with `purpose: "maskable"` or `purpose: "any maskable"`
  - [ ] Test adaptive icon behavior on Android devices
  - [ ] Verify icons display correctly in different Android launcher shapes
- [ ] **Icon improvements (low priority)**
  - [ ] Fix Safari icon background: Create new `apple-touch-icon.png` with black background baked into image (iOS uses white by default, need to design icon with black background)
  - [ ] Improve icon resolution for mobile home screens (currently low resolution)

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

### Frontend auth forms (`Login` / `Register`)

Completed items: **[TODO-LIST-ARCHIVE.md — Security / Auth forms & API validation](./TODO-LIST-ARCHIVE.md#security--auth-forms--api-validation-2026-04-08)**.

**Still open (optional / later):**

- [ ] **Optional:** password strength meter (e.g. [zxcvbn](https://github.com/dropbox/zxcvbn))
- [ ] **Optional:** design-system refactor for inputs, buttons, and a11y

### Backend Security (learning path — your order)

**Done (archived):** auth validation + API errors — [2026-04-08](./TODO-LIST-ARCHIVE.md#security--auth-forms--api-validation-2026-04-08); rate limit, body limits, CORS, Helmet + Netlify CSP — [2026-06-03 HTTP](./TODO-LIST-ARCHIVE.md#backend-http-hardening-2026-06-03); **`MONGODB_URI` / `JWT_SECRET`** + env cleanup — [2026-06-03 env](./TODO-LIST-ARCHIVE.md#server-only-env-2026-06-03); **`JWT_EXPIRATION_TIME`** + fallback `1h` — [2026-06-03 JWT](./TODO-LIST-ARCHIVE.md#jwt-expiration-env-2026-06-03); **favorites response minimization** — [2026-06-03](./TODO-LIST-ARCHIVE.md#favorites-response-minimization-2026-06-03); **favorites routes hardening** — [2026-07-20](./TODO-LIST-ARCHIVE.md#favorites-routes-hardening-2026-07-20); **health check** — [2026-07-20](./TODO-LIST-ARCHIVE.md#health-check-2026-07-20); **logging & errors** — [2026-07-22](./TODO-LIST-ARCHIVE.md#logging--errors-2026-07-22); **dependency / driver hygiene** — [2026-07-22](./TODO-LIST-ARCHIVE.md#dependency--driver-hygiene-2026-07-22).

**Context:** [`functions/express.js`](../functions/express.js), [`netlify.toml`](../netlify.toml), [`functions/controllers/userController.js`](../functions/controllers/userController.js), [`.env.sample`](../.env.sample). **Wiki:** [`RATE-LIMITING-AND-CLIENT-IP.md`](./RATE-LIMITING-AND-CLIENT-IP.md); cerebro `nodejs/raw/`.

1. [x] **Deploy env** — `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRATION_TIME` on Netlify (2026-06). Add `CORS_ALLOWED_ORIGINS` only if you need explicit cross-origin allowlist.

_Optional later: JWT refresh tokens; Bearer vs httpOnly cookies (+ CSRF)._

### Cleanup (post-Firebase)

Firebase removal is **done** — details in [TODO-LIST-ARCHIVE.md](./TODO-LIST-ARCHIVE.md).

- [x] Remove Firebase- and GraphQL-related env vars from `.env` / `.env.sample` (2026-06-03)
- [ ] (Later) When backend has watched-episodes API: restore "watched" feature in EpisodeCard and connect to backend

---

## 🧪 Testing

### Test Framework Decision

- [ ] Choose testing framework:
  - [ ] Keep Jest (current setup)
  - [ ] Migrate to Vitest (better Vite integration)
  - [ ] Decision criteria: performance, Vite integration, migration effort

### Playwright Smoke Tests

- [ ] Add smoke tests for other pages:
  - [ ] Show page (`/show/:id`)
  - [x] Person page (`/person/:id`)
  - [ ] Favorites page (`/favorites`)
  - [ ] Listing page (`/listing/:type`)
  - [ ] Episode page (`/episode/:id`)
- [ ] Verify Playwright HTML report upload in CI
- [ ] Improve test reliability and error messages
- [ ] **Try Playwright CLI (e.g. with goose)** for generating tests from natural language and compare with current workflow. Link: [Agentic Testing with Playwright CLI Skill (goose)](https://block.github.io/goose/docs/tutorials/playwright-skill/)

### Unit/Integration Tests

- [ ] Review existing Jest tests
- [ ] Add tests for critical user flows
- [ ] Add tests for auth slice
- [ ] Add tests for API utilities

---

## 📡 Data fetching / API

Core **React Query** migration is **done** — see [TODO-LIST-ARCHIVE.md](./TODO-LIST-ARCHIVE.md).

- [x] (Optional) HomePage search: replace manual `fetch` with `useQuery({ queryKey: ['search', searchTerm], enabled: !!searchTerm })` (2026-07-27); Context search removed — props only
- [x] (Follow-up) Same search term submit: no refetch while data is fresh (`staleTime` 5 min in `App.tsx`) — solved with `refetch()` when term unchanged (2026-07-28); note: cerebro `sources/react/raw/react-query-stale-time-and-refetch.md`
- [ ] (Optional) ShowList "Load more": migrate to `useInfiniteQuery`
- [ ] (Later) Auth (login/register/favorites): migrate to `useMutation` when desired

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

- **npm audit pass** (2025-02) — archived in [TODO-LIST-ARCHIVE.md](./TODO-LIST-ARCHIVE.md). Re-run `npm audit` periodically.
- [ ] Review and upgrade older dependencies
- [ ] Check for deprecated packages
- [ ] Update to latest stable versions where possible
- [ ] Document breaking changes

---

## 🎨 Developer Experience

### Code Quality Tools

Done items (ESLint, Prettier, Husky, integration) — see [TODO-LIST-ARCHIVE.md](./TODO-LIST-ARCHIVE.md).

- [ ] Document code style guidelines

### Cursor Skills (Agent)

- [ ] **Add Skills to the project** — Cursor Agent **Skills** (`SKILL.md`): document repeatable workflows (e.g. run Playwright locally/CI, Lighthouse, Netlify env, release checklist) so the assistant follows the same procedure. Options: repo folder (e.g. `.cursor/skills/` or `docs/skills/`) and/or user-level skills; link from project README or team onboarding if shared.

### CI/CD Improvements

Lint in CI, unified `main-workflow.yml`, BASE_URL job, caching, README badge, and “no duplicate Netlify build” decision — see [TODO-LIST-ARCHIVE.md](./TODO-LIST-ARCHIVE.md).

- [ ] Add test suite to CI pipeline
- [ ] Configure CI to run on all PRs

### Component Reusability

- [ ] **Create reusable component loader**
  - [ ] Design a flexible loader component that can be used across different contexts
  - [ ] Support different sizes (small, medium, large)
  - [ ] Support different variants (spinner, skeleton, overlay)
  - [ ] Replace manual loading state implementations in pages (PersonPage, EpisodePage, ShowPage, etc.)
  - [ ] Replace LoadingStateHOC with the new component loader pattern
  - [ ] Standardize loading states across the application
  - [ ] Improve code reusability and maintainability

- [ ] **Create reusable error component**
  - [ ] Design a flexible error component with proper ARIA attributes (`role="alert"`)
  - [ ] Support different error types (API errors, validation errors, network errors)
  - [ ] Include optional retry functionality
  - [ ] Replace repeated error state implementations across pages (PersonPage, EpisodePage, ShowPage, ShowList, ShowEpisodes, etc.)
  - [ ] Standardize error messaging and styling across the application
  - [ ] Ensure all error states are accessible to screen readers

- [ ] **Create reusable loading/error wrapper component**
  - [ ] Combine loading and error states into a single reusable component
  - [ ] Support conditional rendering based on loading/error/data states
  - [ ] Include proper ARIA attributes for accessibility
  - [ ] Replace repeated loading/error pattern across components
  - [ ] Standardize the loading/error/data flow pattern

### External component kit (headless)

- [ ] **Audit and add an external headless component kit**
  - [ ] Research headless/unstyled React component libraries (e.g. **Ariakit** ([ariakit.org](https://ariakit.org)) — smaller set; **Radix UI** — broader set; Headless UI, React Aria, etc.)
  - [ ] Compare breadth of components (Ariakit has fewer primitives; Radix and others offer more out of the box) and choose according to needs
  - [ ] Choose one without bundled CSS so the app can fully control look and feel (custom SCSS/CSS)
  - [ ] Evaluate: accessibility, bundle size, API design, maintenance, and fit with existing stack
  - [ ] Document choice and usage guidelines (which components to use from kit vs. custom)
  - [ ] Introduce gradually (e.g. replace one existing component as pilot) before wider adoption

### Pages / content

- [ ] **About page polish** (dopo Person smoke)
  - [x] Rename “Show Tracker” → Track'em All (2026-08-06) — `AboutPage.tsx` + PWA manifest in `vite.config.js` (`name` / `short_name` / `description`)
  - [x] Rewrite short copy (what it is, credits, TMDB attribution, repo link) (2026-08-07)
  - [x] Improve layout/typography to match other pages (2026-08-07)
  - [ ] Optional: smoke test About after copy is stable

### Styles / CSS

- [ ] **Reorganize form-related CSS**
  - [ ] Audit all form-related styles (Login.scss, Register.scss, SearchBar.scss, Search.scss, etc.)
  - [ ] Identify duplicated form patterns (inputs, labels, buttons, containers)
  - [ ] Decide approach: shared SCSS partial (e.g. `_forms.scss`), shared form component styles, or design tokens/variables for form elements
  - [ ] Consolidate and refactor form CSS to reduce duplication and improve maintainability
  - [ ] Document form style conventions for future forms

---

## ♿ Accessibility & Semantic HTML

**Milestone (2025-01):** broad accessibility pass completed — summary in [TODO-LIST-ARCHIVE.md](./TODO-LIST-ARCHIVE.md). Continue with manual keyboard and screen reader testing when possible.

### General Accessibility

- [ ] Test with screen readers
- [ ] Add keyboard navigation support
- [ ] Ensure proper focus management
- [ ] Test color contrast ratios

---

## 📚 Documentation

- [ ] Update main README with:
  - [ ] Current tech stack
  - [ ] Setup instructions
  - [ ] Development workflow
  - [ ] Testing instructions
  - [ ] Deployment process
- [x] **Netlify production URL** — README corrected to `https://trackem-all.netlify.app/` (2026-08-05). Old names without hyphen were a different/legacy project.
- [ ] **Netlify orphan sites (verify & clean up)**
  - [ ] Confirm ownership of `https://trackemall.netlify.app/` and `https://trackemalldev.netlify.app/` (still serving old CRA; not this repo’s current deploy)
  - [ ] If they belong to you / Chingu voyage: unpublish or delete the Netlify sites (or lock them) so bookmarks/mobile don’t open the wrong app
  - [ ] If access is lost: search Netlify teams / email for `trackemall`, or accept they stay as stale public demos
  - [ ] Double-check bookmarks, home-screen PWA, and external links point to `trackem-all`
- [ ] **Optional: rename Netlify site URL when available**
  - [ ] If `trackemall.netlify.app` (no hyphen) becomes free after orphan cleanup: Site settings → Domain management → Edit site name
  - [ ] Or attach a custom domain (e.g. own domain) instead of relying on `*.netlify.app`
  - [ ] After rename/custom domain: update README, CI `base_url` (`.github/workflows/main-workflow.yml`), `CORS_ALLOWED_ORIGINS` on Netlify, bookmarks / home-screen PWA
- [ ] Document environment variables
- [ ] Create contributing guidelines

---

## 📋 Completed work

See **[TODO-LIST-ARCHIVE.md](./TODO-LIST-ARCHIVE.md)** for the full log of finished tasks (Firebase, React Query, CI, tooling, accessibility milestone, etc.).

---

## 📝 Notes

- **Priority Order**: See **Suggested priority** section above; full phases in [TODO-ORGANIZATION.md](./TODO-ORGANIZATION.md).
- **DevEx sequence:** Core items completed — see [TODO-LIST-ARCHIVE.md](./TODO-LIST-ARCHIVE.md). Optional: `prettier --check` in CI, lint-staged, **Cursor Skills** (see DevEx → Cursor Skills). Build in CI remains N/A (Netlify).
- **Breaking Changes**: React Router v6 migration should be planned carefully.
- **Firebase**: Removed. EpisodeCard "watched" feature to be restored when backend has watched-episodes API.
- **Testing Strategy**: Consider Vitest for better Vite integration, but Jest is already working.
- **Netlify URLs (2026-08-05):** Canonical prod = `https://trackem-all.netlify.app/`. `trackemall` / `trackemalldev` (no hyphen) are orphan CRA sites from the old project — verify ownership and delete when possible (see Documentation).

---

## 🔗 Related Documents

- **[TODO-ORGANIZATION.md](./TODO-ORGANIZATION.md)** - How to prioritize and organize work (phases, quick wins, themes)
- **[TODO-LIST-ARCHIVE.md](./TODO-LIST-ARCHIVE.md)** - Log of completed todo items (archive)
- **[NPM-AUDIT-GUIDE.md](./NPM-AUDIT-GUIDE.md)** - Step-by-step guide to check and fix npm vulnerabilities (generic, any project)
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
