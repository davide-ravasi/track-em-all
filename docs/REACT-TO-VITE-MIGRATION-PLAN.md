# Migrate Create React App to Vite

## Overview

This plan migrates the Track'em All application from Create React App to Vite, including React 18 upgrade and PWA support retention.

## Phase 1: Backup and Preparation

### Create backup branch

- Ensure current work is committed
- Create backup branch before migration starts

### Document current environment variables

- List all `REACT_APP_*` variables from `.env` files
- Prepare mapping to `VITE_*` equivalents

## Phase 2: Install Vite Dependencies

### Remove CRA dependencies

- Uninstall `react-scripts`
- Remove CRA-specific type definitions

### Install Vite core packages

- Install `vite` and `@vitejs/plugin-react`
- Install `vite-plugin-pwa` for service worker support
- Install React 18: `react@18`, `react-dom@18`
- Update TypeScript types: `@types/react@18`, `@types/react-dom@18`

## Phase 3: Configuration Files

### Create `vite.config.ts`

- Configure React plugin
- Configure PWA plugin with workbox
- Set build output to `build` directory (for Netlify compatibility)
- Configure SCSS support
- Set up path aliases if needed

### Update `tsconfig.json`

- Change `target` from `es5` to `ESNext`
- Update `lib` to include modern features
- Adjust module resolution for Vite

### Create `.env` template

- Document all required environment variables
- Update variable names from `REACT_APP_*` to `VITE_*`

## Phase 4: HTML and Entry Point Updates

### Move and update `index.html`

- Move from `public/index.html` to root `index.html`
- Remove `%PUBLIC_URL%` references (use `/` instead)
- Add module script tag: `<script type="module" src="/src/index.tsx"></script>`
- Update meta description

### Update `src/index.tsx`

- Replace `ReactDOM.render` with `ReactDOM.createRoot` (React 18)
- Update service worker registration for Vite PWA

## Phase 5: Environment Variables Migration

### Update all `process.env.REACT_APP_*` references

Files to update:

- `src/utils.tsx` (8 references)
- `src/pages/ShowPage/ShowPage.tsx` (2 references)
- `src/pages/PersonPage/PersonPage.tsx` (2 references)
- `src/pages/EpisodePage/EpisodePage.tsx` (2 references)
- `src/firebase/firebase.js` (7 references)
- `src/features/auth/authSlice.tsx` (1 reference)
- `src/features/auth/authService.js` (1 reference)
- `src/components/ShowVideo/ShowVideo.tsx` (1 reference)
- `src/components/ShowEpisodes/ShowEpisodes.tsx` (1 reference)

Change pattern: `process.env.REACT_APP_X` → `import.meta.env.VITE_X`

### Update service worker files

- Update `src/serviceWorkerRegistration.js` for Vite PWA
- Update or remove `src/service-worker.js` (handled by vite-plugin-pwa)

## Phase 6: Package.json Updates

### Update scripts

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "test": "react-scripts test"
}
```

### Update dependencies

- Remove `react-scripts`
- Add Vite dependencies
- Upgrade React to v18
- Update TypeScript types

## Phase 7: Static Assets and Public Files

### Update asset imports

- Verify SCSS imports work correctly
- Check SVG imports in components
- Ensure images in `public/` are referenced correctly

### Update `public/_redirects`

- Verify Netlify redirect rules still work

## Phase 8: Netlify Configuration

### Update `netlify.toml`

- Change build command to `npm install && npm run build`
- Verify `publish = "build"` is correct
- Ensure functions configuration remains unchanged

## Phase 9: Testing and Validation

### Local development testing

- Run `npm run dev`
- Test all routes and functionality
- Verify environment variables work
- Check PWA functionality
- Test service worker registration

### Production build testing

- Run `npm run build`
- Run `npm run preview`
- Verify build output in `build/` directory
- Check bundle sizes
- Test production PWA features

### Fix any issues

- Address TypeScript errors
- Fix import path issues
- Resolve any runtime errors

## Phase 10: Documentation and Cleanup

### Update README

- Document new scripts (`dev`, `build`, `preview`)
- Update environment variable naming convention
- Add Vite-specific notes

### Clean up

- Remove unused CRA files
- Delete `react-app-env.d.ts` if not needed
- Remove old build artifacts

### Create `.env.example`

- List all required `VITE_*` variables
- Provide example values

## Expected Benefits

- Faster development with instant HMR
- Smaller bundle sizes
- Better TypeScript support
- Elimination of webpack polyfill issues
- Modern build tooling
- Improved developer experience
