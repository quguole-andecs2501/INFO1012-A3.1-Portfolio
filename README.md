# Qu Guole — Personal Digital Portfolio

**Course:** INFO1012 Information Technology Systems  
**Assessment:** 3.1 Web Page Development  
**Student:** 曲国乐 (Qu Guole)  
**Student ID:** 2518020124  
**Programme:** Computer Science, Class 2501  
**Institution:** Xi'an University of Architecture and Technology — Ande College

> **GitHub repository:** https://github.com/quguole-andecs2501/INFO1012-A3.1-Portfolio

---

## 1. Project overview

This project is a responsive personal digital portfolio built with HTML, CSS and JavaScript. It presents my academic background, ways of working, current learning focus, selected coursework and personal interest in sport.

The website is intentionally self-contained: there are no external frameworks, font downloads or image libraries. The only image asset is my own profile photograph.

## 2. Main features

### HTML and page structure

- Semantic landmarks: `header`, `nav`, `main`, `section`, `article`, `footer`.
- A skip link for keyboard users.
- Descriptive headings in a logical hierarchy.
- A project-detail modal built with the native `dialog` element.
- Accessible form labels, help/error relationships and live status areas.
- Responsive image markup with intrinsic dimensions.

### CSS

- CSS custom properties for a consistent colour and spacing system.
- CSS Grid for the hero, project grid, information cards and form layout.
- Responsive breakpoints for tablet and mobile screens.
- A light/dark theme stored by JavaScript.
- Distinct hover and `:focus-visible` states.
- Reduced-motion support through `prefers-reduced-motion`.
- Subtle grid and radial-gradient backgrounds built entirely with CSS.

### JavaScript

- Mobile navigation toggle with `aria-expanded` state.
- Scroll progress indicator.
- Active navigation link tracking with `IntersectionObserver`.
- Progressive reveal-on-scroll animation.
- Project filtering by category.
- Accessible project-detail dialog generated from a JavaScript object.
- Light/dark theme switching with `localStorage` persistence.
- Contact-form validation with inline feedback, field focus management and a live character counter.

## 3. Project structure

```text
.
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── profile.jpg
└── README.md
```

## 4. Run the website

1. Open the repository in Visual Studio Code.
2. Open `index.html` in a modern browser.
3. For the closest experience to GitHub Pages, use the VS Code Live Server extension or another static local server.

No build command or package installation is required.

## 5. Testing checklist

I tested the website at desktop and mobile widths and checked the following:

- Navigation links scroll to the correct sections.
- The mobile menu opens, closes and updates `aria-expanded`.
- The theme switch changes both the colours and the button label.
- The All/Web/Systems project filters show the correct cards.
- Each project button opens the expected case-study dialog.
- The dialog closes with its button, the Escape key and a backdrop click.
- The contact form rejects empty, short and malformed values.
- Valid contact-form data produces a success message.
- Keyboard focus remains visible throughout the page.

## 6. Data validation

The contact form checks:

1. The name is not empty and contains at least two characters.
2. The email matches a basic `name@example.com` pattern.
3. The message is at least 20 characters and no more than 500 characters.

Error messages are associated with fields through `aria-describedby`, and `aria-invalid` marks the relevant input. Focus moves to the first invalid field.

The portfolio is hosted as a static GitHub website, so the form validates data in the browser but does not send it to a server.

## 7. Design decisions and assumptions

- The design uses warm paper tones, deep teal and orange to create a calm but distinctive identity that reflects my reserved personality.
- Personal facts are limited to information I supplied: name, student ID, institution, programme, year of study, personality and interest in sport.
- The project cards describe coursework I have completed rather than inventing professional experience.
- The contact form is clearly labelled as a validation demonstration because a static GitHub Pages site has no backend.
- Comments in the HTML, CSS and JavaScript explain the purpose of major sections and the reasoning behind important choices.

## 8. Submission

For INFO1012 Assessment 3.1:

1. Push every file in this folder to the correct GitHub Classroom repository.
2. Replace the placeholder at the top of this README with the final repository URL.
3. Export the complete repository as a ZIP file.
4. Upload the ZIP file to Canvas.
5. If required, also add the GitHub repository URL in the Canvas submission comment.
