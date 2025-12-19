# Accessibility Reference Guide

This document serves as a quick reference for accessibility best practices used in the Track'em All project, based on W3C WCAG 2.1 guidelines and ARIA specifications.

**Last Updated:** 2025-01-19

---

## 📚 Authoritative Sources

When in doubt, refer to these official sources:

- **[W3C Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)** - Official W3C accessibility standards
- **[WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)** - Web Content Accessibility Guidelines
- **[ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)** - How to use ARIA correctly
- **[MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)** - Practical guides and examples
- **[WebAIM](https://webaim.org/)** - Web Accessibility In Mind - practical resources
- **[The A11y Project](https://www.a11yproject.com/)** - Community-driven accessibility resource

---

## 🎯 Core Principles

### 1. Semantic HTML First

- Use semantic elements (`<main>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`)
- Use proper heading hierarchy (H1 → H2 → H3, don't skip levels)
- One H1 per page (page title)
- Use `<button>` for buttons, `<a>` for links

### 2. ARIA: Use Only When Necessary

- **Don't use ARIA if native HTML works**
- Use ARIA to enhance, not replace, semantic HTML
- Avoid redundant ARIA (e.g., `aria-label` on elements with visible text)

### 3. Icon Buttons

- Icons inside buttons should have `aria-hidden="true"` if the button has:
  - An `aria-label`, OR
  - Visible text that describes the action
- This prevents screen readers from announcing redundant information

**Example:**

```jsx
<button aria-label="Add to favorites">
  <FontAwesomeIcon icon={faHeart} aria-hidden="true" />
</button>
```

### 4. Images

- All images must have descriptive `alt` text
- Decorative images should have `alt=""` (empty string)
- Functional images (like logos) should have descriptive alt text

**Example:**

```jsx
// Descriptive
<img alt="Breaking Bad poster" src="..." />

// Decorative (empty alt)
<img alt="" src="decorative-pattern.svg" />
```

### 5. Sections and Headings

- `<section>` elements should have headings (H2, H3, etc.)
- If heading is a direct child of section, `aria-labelledby` is **not needed** (screen readers infer the relationship)
- Use `aria-labelledby` only when:
  - Heading is NOT a direct child
  - Multiple sections of same type need disambiguation

**Example:**

```jsx
// ✅ Good - heading is direct child, no aria-labelledby needed
<section>
  <h2>Popular Shows</h2>
  {/* content */}
</section>

// ✅ Good - aria-labelledby when heading is elsewhere
<section aria-labelledby="section-title">
  <div>
    <h2 id="section-title">Popular Shows</h2>
  </div>
  {/* content */}
</section>
```

### 6. Non-Interactive Elements

- **Don't use `aria-label` on non-interactive elements with visible text**
- The visible text IS the accessible name
- `aria-label` is for:
  - Elements without visible text (icon-only buttons)
  - When you need to override the accessible name

**Example:**

```jsx
// ❌ Bad - redundant aria-label
<div aria-label={`Character: ${character}`}>
  {character}
</div>

// ✅ Good - visible text is sufficient
<div>{character}</div>
```

### 7. Error Messages

- Use `role="alert"` for important error messages
- This ensures screen readers announce them immediately

**Example:**

```jsx
{
  error && (
    <div role="alert" className="error">
      {error}
    </div>
  );
}
```

### 8. Focus Indicators (WCAG 2.4.7 - Focus Visible)

- **All keyboard-operable elements MUST have visible focus indicators**
- Use `:focus-visible` (not `:focus`) for better UX
  - Shows outline when navigating with keyboard (Tab)
  - Hides outline when clicking with mouse
- Never use `outline: none` without providing an alternative focus indicator
- Focus indicator should be:
  - At least 2px thick
  - High contrast (meets WCAG AA standards)
  - Visible against all backgrounds

**Example:**

```scss
// ❌ Bad - removes all focus indicators
*:focus {
  outline: none;
}

// ✅ Good - visible focus indicators for keyboard navigation
button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid $color-main;
  outline-offset: 2px;
  border-radius: 2px;
}
```

**Why `:focus-visible`?**

- Modern browsers only show it when keyboard navigation is detected
- Better user experience (no outline on mouse clicks)
- Recommended by WCAG and browser vendors

---

## ✅ Checklist for New Components

When creating or reviewing components, check:

- [ ] Uses semantic HTML elements where appropriate
- [ ] Has proper heading hierarchy (if headings are used)
- [ ] All images have appropriate `alt` text
- [ ] Icon buttons have `aria-hidden="true"` on icons
- [ ] Buttons without visible text have `aria-label`
- [ ] No redundant ARIA attributes
- [ ] Interactive elements are keyboard accessible
- [ ] **Visible focus indicators for all interactive elements** (use `:focus-visible`)
- [ ] Error messages use `role="alert"`
- [ ] Color contrast meets WCAG AA standards (4.5:1 for text)

---

## 🚫 Common Mistakes to Avoid

1. **Removing focus indicators** - Never use `outline: none` without providing alternative focus styles
2. **Redundant `aria-labelledby`** - Not needed when heading is direct child of section
3. **`aria-label` on visible text** - Only use when element has no visible text
4. **Missing `aria-hidden` on decorative icons** - Icons in buttons should be hidden if button has label
5. **Skipping heading levels** - H1 → H2 → H3, not H1 → H3
6. **Multiple H1s** - Only one H1 per page (the page title)

---

## 📖 Quick Reference: When to Use ARIA

| Situation                                 | Solution                                              |
| ----------------------------------------- | ----------------------------------------------------- |
| Icon-only button                          | `aria-label` on button, `aria-hidden="true"` on icon  |
| Button with text + icon                   | Visible text is enough, `aria-hidden="true"` on icon  |
| Section with heading (direct child)       | No ARIA needed                                        |
| Section with heading (not direct child)   | `aria-labelledby` pointing to heading ID              |
| Non-interactive element with visible text | No `aria-label` needed                                |
| Error message                             | `role="alert"`                                        |
| Decorative image                          | `alt=""` (empty)                                      |
| Functional image                          | Descriptive `alt` text                                |
| Focus indicators                          | Use `:focus-visible` with 2px+ outline, high contrast |

---

## 🔍 Testing Accessibility

1. **Automated Testing:**

   - Lighthouse accessibility audit
   - axe DevTools browser extension
   - WAVE browser extension

2. **Manual Testing:**

   - Keyboard navigation (Tab, Enter, Space, Arrow keys)
   - Screen reader testing (NVDA, JAWS, VoiceOver)
   - Color contrast checkers

3. **CI/CD:**
   - Lighthouse CI (already set up)
   - Consider adding axe-core to test suite

---

## 📝 Notes

- This guide is based on WCAG 2.1 Level AA standards
- When in doubt, refer to official W3C/WAI documentation
- Accessibility is an ongoing process, not a one-time check
- Test with real users and assistive technologies when possible

---

**Remember:** Semantic HTML + ARIA only when needed = Better accessibility! 🎯
