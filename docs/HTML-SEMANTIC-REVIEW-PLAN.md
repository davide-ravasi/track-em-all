# HTML Semantic Review Plan

A step-by-step guide for reviewing and improving semantic HTML structure.

**Created:** 2025-01-19

---

## 🎯 Goal

Improve semantic HTML structure for better:
- Accessibility (screen readers, keyboard navigation)
- SEO (search engine understanding)
- Code maintainability
- User experience

---

## 📋 Tomorrow's Tasks

### Step 1: Run Lighthouse Accessibility Audit (10-15 min)

1. **Open your app in Chrome**
   - Navigate to your local dev server or production URL

2. **Run Lighthouse Audit**
   - Open Chrome DevTools (F12)
   - Go to "Lighthouse" tab
   - Select "Accessibility" category
   - Click "Generate report"
   - Wait for results

3. **Document Findings**
   - Take screenshots of the report
   - Note all accessibility issues
   - Prioritize: Critical → High → Medium → Low
   - Create a list of issues to fix

**Expected Issues to Look For:**
- Missing semantic HTML elements (`<main>`, `<header>`, `<nav>`, `<section>`, `<article>`)
- Missing or incorrect heading hierarchy (H1, H2, H3)
- Missing alt text on images
- Missing ARIA labels
- Color contrast issues
- Keyboard navigation issues

---

### Step 2: Review Homepage HTML Structure (15-20 min)

1. **Examine Current Structure**
   - Open `src/pages/HomePage/HomePage.tsx` (or wherever your homepage component is)
   - Review the JSX/HTML structure
   - Identify what semantic elements are missing

2. **Check for:**
   - [ ] Is there a `<main>` element wrapping the main content?
   - [ ] Is there a proper `<header>` for site header/navigation?
   - [ ] Is there a `<nav>` element for navigation?
   - [ ] Are sections using `<section>` with proper labels?
   - [ ] Are show cards using `<article>` elements?
   - [ ] Is there a proper heading hierarchy (H1 → H2 → H3)?
   - [ ] Are images using proper `alt` attributes?
   - [ ] Are interactive elements properly labeled?

3. **Document Current State**
   - List what's good
   - List what needs improvement
   - Note any patterns you see

---

### Step 3: Fix Homepage Semantic HTML (30-45 min)

1. **Add Semantic Structure**
   - Wrap main content in `<main>`
   - Add proper `<header>` and `<nav>` if missing
   - Convert divs to semantic elements where appropriate:
     - List sections → `<section>`
     - Show cards → `<article>`
     - Navigation → `<nav>`
     - Site header → `<header>`
     - Footer → `<footer>`

2. **Fix Heading Hierarchy**
   - Ensure there's one `<h1>` per page (usually page title)
   - Use `<h2>` for major sections
   - Use `<h3>` for subsections
   - Don't skip heading levels (H1 → H2 → H3, not H1 → H3)

3. **Add ARIA Labels Where Needed**
   - Add `aria-label` to buttons without text
   - Add `aria-labelledby` to sections
   - Add `role` attributes where semantic HTML isn't enough

4. **Improve Image Accessibility**
   - Ensure all images have descriptive `alt` text
   - Decorative images should have empty `alt=""`

---

### Step 4: Establish Patterns (15-20 min)

1. **Create Semantic HTML Patterns**
   - Document the structure you're using
   - Create examples for:
     - Page structure (header, main, footer)
     - Section structure
     - Card/article structure
     - Navigation structure

2. **Document Best Practices**
   - When to use `<section>` vs `<article>`
   - Heading hierarchy rules
   - ARIA label guidelines
   - Image alt text guidelines

---

## 📝 Semantic HTML Cheat Sheet

### Common Semantic Elements

```html
<!-- Page Structure -->
<header>Site header, navigation</header>
<nav>Navigation menu</nav>
<main>Main content (one per page)</main>
<aside>Sidebar, complementary content</aside>
<footer>Site footer</footer>

<!-- Content Structure -->
<section>Grouped content with a heading</section>
<article>Standalone content (blog post, show card)</article>

<!-- Text Elements -->
<h1>Page title (one per page)</h1>
<h2>Major section heading</h2>
<h3>Subsection heading</h3>
<p>Paragraph text</p>

<!-- Lists -->
<ul>Unordered list</ul>
<ol>Ordered list</ol>
<li>List item</li>

<!-- Interactive -->
<button>Button</button>
<a>Link</a>
```

### When to Use What

- **`<section>`**: Grouped related content with a heading
- **`<article>`**: Standalone, reusable content (show cards, blog posts)
- **`<main>`**: Main content of the page (one per page)
- **`<nav>`**: Navigation links
- **`<header>`**: Site header, page header, or article header
- **`<footer>`**: Site footer, page footer, or article footer

### Heading Hierarchy Rules

1. One `<h1>` per page (usually the page title)
2. Don't skip levels (H1 → H2 → H3, not H1 → H3)
3. Use headings to create document outline
4. Headings should describe the content that follows

---

## 🔍 Example: Before & After

### Before (Non-semantic)
```jsx
<div className="page">
  <div className="header">
    <div className="nav">...</div>
  </div>
  <div className="content">
    <div className="section">
      <div className="title">Popular Shows</div>
      <div className="card">...</div>
      <div className="card">...</div>
    </div>
  </div>
</div>
```

### After (Semantic)
```jsx
<div className="page">
  <header>
    <nav aria-label="Main navigation">...</nav>
  </header>
  <main>
    <section aria-labelledby="popular-shows">
      <h2 id="popular-shows">Popular Shows</h2>
      <article>...</article>
      <article>...</article>
    </section>
  </main>
</div>
```

---

## ✅ Checklist for Each Page

When reviewing/fixing a page, check:

- [ ] Has one `<main>` element
- [ ] Has proper `<header>` and `<nav>` (if applicable)
- [ ] Has one `<h1>` (page title)
- [ ] Heading hierarchy is correct (H1 → H2 → H3)
- [ ] Sections use `<section>` with `aria-labelledby`
- [ ] Cards/content use `<article>` where appropriate
- [ ] All images have `alt` text
- [ ] Interactive elements have proper labels
- [ ] No skipped heading levels
- [ ] Semantic structure makes sense when CSS is removed

---

## 🎯 Success Criteria

After tomorrow's work, you should have:

1. ✅ Lighthouse accessibility audit completed and documented
2. ✅ Homepage semantic HTML reviewed and improved
3. ✅ Patterns established for future pages
4. ✅ Documentation of best practices
5. ✅ Clear plan for fixing other pages

---

## 📚 Resources

- [MDN: HTML Semantic Elements](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantic_elements)
- [WebAIM: Semantic Structure](https://webaim.org/techniques/semanticstructure/)
- [W3C: HTML5 Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp)
- [A11y Project: Semantic HTML](https://www.a11yproject.com/checklist/)

---

## 🚀 Next Steps (After Tomorrow)

1. Apply semantic patterns to other pages:
   - Show pages
   - Episode pages
   - Person pages
   - Favorites page
   - Listing pages

2. Run Lighthouse audit again to measure improvement

3. Test with screen readers

4. Plan visual redesign (combine with semantic improvements)

---

**Good luck! Take it step by step and don't try to fix everything at once.**

