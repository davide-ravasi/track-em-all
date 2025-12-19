# PWA Testing Checklist

A comprehensive checklist for testing Progressive Web Apps (PWAs) that can be used for any application.

**Last Updated:** 2025-01-19

---

## 📱 iOS Testing (iPhone - Safari)

### Preparation
- [ ] Clear Safari cache: Settings → Safari → Clear History and Website Data
- [ ] Or use Private/Incognito mode for a fresh test
- [ ] Ensure latest iOS version (or test on target iOS version)

### Icon Testing
- [ ] Visit site in Safari
- [ ] Tap Share button (bottom center)
- [ ] Select "Add to Home Screen"
- [ ] Verify icon preview shows correct custom icon (not default/browser icon)
- [ ] Verify icon has correct background color (note if needs improvement)
- [ ] Add to home screen
- [ ] Check home screen - icon should be custom icon
- [ ] Verify icon resolution is clear (not pixelated)
- [ ] Launch app from home screen icon
- [ ] Verify app opens in standalone mode (no Safari UI - no address bar, no navigation buttons)

### App Functionality
- [ ] App name displays correctly (matches `apple-mobile-web-app-title`)
- [ ] Theme color matches (`theme-color` meta tag)
- [ ] Status bar style is correct (`apple-mobile-web-app-status-bar-style`)
- [ ] App loads and functions normally
- [ ] Navigation works correctly
- [ ] All features accessible from home screen launch
- [ ] App feels native (no browser chrome visible)

### Offline Testing (iOS)
- [ ] Load app while online
- [ ] Enable Airplane Mode
- [ ] Reload app
- [ ] Verify cached assets load (app shell visible)
- [ ] Note: API calls will fail offline (expected behavior)

---

## 🤖 Android Testing (Chrome)

### Icon Testing
- [ ] Visit site in Chrome
- [ ] Tap menu (3 dots) → "Add to Home screen" or "Install app"
- [ ] Verify install prompt shows correct icon
- [ ] Verify icon appears correctly on home screen
- [ ] Check icon resolution is clear
- [ ] Launch app from home screen
- [ ] Verify app opens in standalone mode (no browser UI)

### App Functionality
- [ ] App name displays correctly (matches manifest `short_name` or `name`)
- [ ] Theme colors display correctly (`theme_color` in manifest)
- [ ] Background color is correct (`background_color` in manifest)
- [ ] App loads and functions normally
- [ ] Navigation works correctly
- [ ] All features accessible from home screen launch
- [ ] App feels native

### Offline Testing (Android)
- [ ] Load app while online
- [ ] Enable Airplane Mode or disable network
- [ ] Reload app
- [ ] Verify cached assets load
- [ ] Note: API calls will fail offline (expected behavior)

---

## 🔧 Service Worker & Offline Functionality

### Service Worker Registration
- [ ] Open Chrome DevTools (F12)
- [ ] Go to Application tab → Service Workers
- [ ] Verify service worker is registered
- [ ] Check status shows "activated and running"
- [ ] Verify service worker file exists and is correct
- [ ] Check service worker scope is correct

### Offline Mode Test
- [ ] Load site normally (online)
- [ ] Open DevTools → Network tab
- [ ] Check "Offline" checkbox (or use airplane mode)
- [ ] Reload the page
- [ ] Verify app still loads (cached assets)
- [ ] Check that basic navigation works offline
- [ ] Verify app shell is cached and loads
- [ ] Test that dynamic content shows appropriate offline message
- [ ] Note: API calls will fail offline (expected)

### Update Mechanism
- [ ] Make a small change to your app
- [ ] Rebuild and redeploy
- [ ] Visit site again (service worker should auto-update if using `autoUpdate`)
- [ ] Verify new version loads
- [ ] Check DevTools → Application → Service Workers for update status
- [ ] If using `prompt` mode, verify update notification appears

---

## 📋 Manifest Verification

### Manifest File
- [ ] Verify `manifest.webmanifest` exists and is accessible
- [ ] Check manifest is valid JSON
- [ ] Verify all required fields are present:
  - [ ] `name` or `short_name`
  - [ ] `start_url`
  - [ ] `display` (should be "standalone" or "fullscreen")
  - [ ] `icons` array with at least 192x192 and 512x512
- [ ] Verify icon paths are correct and files exist
- [ ] Check `theme_color` matches design
- [ ] Check `background_color` matches design
- [ ] Verify `scope` is set correctly

### HTML Meta Tags
- [ ] Verify manifest link in HTML: `<link rel="manifest" href="/manifest.webmanifest">`
- [ ] Check `theme-color` meta tag: `<meta name="theme-color" content="#...">`
- [ ] Verify iOS-specific meta tags (if applicable):
  - [ ] `apple-mobile-web-app-capable`
  - [ ] `apple-mobile-web-app-status-bar-style`
  - [ ] `apple-mobile-web-app-title`
- [ ] Check `apple-touch-icon` links (if using iOS)

---

## 🎨 Visual & UX Testing

### Appearance
- [ ] App looks good in standalone mode
- [ ] No browser UI elements visible
- [ ] Status bar color matches theme
- [ ] Splash screen (if configured) displays correctly
- [ ] Icons are high resolution and clear
- [ ] Icons have appropriate background colors

### User Experience
- [ ] App feels native (not like a website)
- [ ] Navigation is smooth
- [ ] No flash of unstyled content (FOUC)
- [ ] Loading states are appropriate
- [ ] Error states are handled gracefully

---

## 🔍 Lighthouse Audit

### Run Lighthouse PWA Audit
- [ ] Install PWA audit passes (all checks green)
- [ ] Service worker registered
- [ ] Responds with 200 when offline
- [ ] Has a web app manifest
- [ ] Manifest has valid `name` and `short_name`
- [ ] Manifest has valid `start_url`
- [ ] Manifest has valid icons (192px and 512px)
- [ ] Manifest display property is set
- [ ] Manifest contains `theme_color`
- [ ] Content is sized correctly for viewport
- [ ] Has a `<meta name="viewport">` tag

### Performance
- [ ] First Contentful Paint (FCP) is good
- [ ] Largest Contentful Paint (LCP) is good
- [ ] Time to Interactive (TTI) is acceptable
- [ ] Bundle sizes are reasonable

---

## 📝 Notes & Issues

### Issues Found
```
[Document any problems encountered during testing]
```

### What Worked Well
```
[Document successful tests and positive findings]
```

### Improvements Needed
```
[Document areas that need improvement but aren't blockers]
```

---

## 🚀 Quick Commands Reference

```bash
# Rebuild if you need to update icons/manifest
npm run build

# Test locally before deploying
npm run preview

# Check service worker in DevTools
# Chrome: F12 → Application → Service Workers
```

---

## 📚 Additional Resources

- [Web.dev PWA Checklist](https://web.dev/pwa-checklist/)
- [MDN Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Apple iOS Safari Web Content Guide](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
- [Chrome PWA Documentation](https://web.dev/progressive-web-apps/)

---

## ✅ Sign-Off

**Tested by:** _________________  
**Date:** _________________  
**Platforms Tested:** iOS / Android / Both  
**Status:** ✅ Pass / ⚠️ Issues Found / ❌ Failed

**Notes:**
```
[Final notes and next steps]
```

---

**Tip:** Save a copy of this checklist for each project and customize it based on your specific PWA requirements.

