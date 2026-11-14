"use strict";

/* ==========================================================================
   1. Shared elements and feature detection
   Keeping selectors in one place makes the interactions easier to trace.
   ========================================================================== */

const root = document.documentElement;
const body = document.body;
const navToggle = document.getElementById("navToggle");
const navPanel = document.getElementById("primaryMenu");
const navLinks = [...document.querySelectorAll(".nav-link")];
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const scrollProgress = document.getElementById("scrollProgress");
const filterButtons = [...document.querySelectorAll(".filter")];
const projectCards = [...document.querySelectorAll(".project-card")];
const projectButtons = [...document.querySelectorAll("[data-project]")];
const projectDialog = document.getElementById("projectDialog");
const contactForm = document.getElementById("contactForm");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ==========================================================================
   2. Theme preference
   The selected theme is saved in localStorage so it survives page navigation.
   ========================================================================== */

function getStoredTheme() {
  try {
    return localStorage.getItem("portfolio-theme");
  }
  catch {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem("portfolio-theme", theme);
  }
  catch {
    // The page still works when storage is unavailable, such as in strict privacy mode.
  }
}

function setTheme(theme, savePreference = true) {
  root.dataset.theme = theme;
  const darkMode = theme === "dark";

  themeIcon.textContent = darkMode ? "☀" : "☾";
  themeToggle.setAttribute("aria-pressed", String(darkMode));
  themeToggle.setAttribute(
    "aria-label",
    darkMode ? "Switch to light colour theme" : "Switch to dark colour theme"
  );

  if (savePreference) {
    storeTheme(theme);
  }
}

const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
setTheme(getStoredTheme() || preferredTheme, false);

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

/* ==========================================================================
   3. Mobile navigation
   aria-expanded communicates menu state, while Escape closes the menu.
   ========================================================================== */

function setMenu(open) {
  navToggle.setAttribute("aria-expanded", String(open));
  navPanel.classList.toggle("open", open);
  body.classList.toggle("nav-open", open);
}

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  setMenu(!isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 780) {
    setMenu(false);
  }
});

/* ==========================================================================
   4. Reading progress and active navigation
   IntersectionObserver avoids repeatedly scanning section coordinates on scroll.
   ========================================================================== */

function updateScrollProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  scrollProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

const sections = [...document.querySelectorAll("main > section[id]")];

if ("IntersectionObserver" in window) {
  const navigationObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (!visibleEntries.length) {
        return;
      }

      const activeId = visibleEntries[0].target.id;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
      });
    },
    {
      rootMargin: "-25% 0px -58% 0px",
      threshold: [0.08, 0.2, 0.45]
    }
  );

  sections.forEach((section) => navigationObserver.observe(section));
}

/* ==========================================================================
   5. Reveal-on-scroll
   Content remains visible when JavaScript or IntersectionObserver is unavailable.
   ========================================================================== */

const revealItems = [...document.querySelectorAll(".reveal")];

if ("IntersectionObserver" in window && !prefersReducedMotion.matches) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}
else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

/* ==========================================================================
   6. Project filtering
   Each card has a data-category attribute and each button has a data-filter value.
   ========================================================================== */

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("active", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });

    projectCards.forEach((card) => {
      const shouldShow =
        selectedFilter === "all" || card.dataset.category === selectedFilter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

/* ==========================================================================
   7. Project case-study dialog
   Data is kept separately from the DOM so card markup stays focused on content.
   ========================================================================== */

const projectData = {
  profile: {
    category: "Web / HTML & CSS",
    title: "Personal Profile Page",
    summary:
      "A responsive introduction page designed to present identity, study context and interests with a strong, personal visual system.",
    details: [
      ["Structure", "Semantic header, navigation, main sections, figure and footer."],
      ["Design", "CSS variables, layered backgrounds, responsive grids and fluid typography."],
      ["Accessibility", "Descriptive image text, keyboard focus styles and a mobile-friendly layout."]
    ]
  },
  calculator: {
    category: "Web / JavaScript",
    title: "Arithmetic Calculator",
    summary:
      "A four-operation calculator that converts input to numbers, validates each value and updates the interface without reloading the page.",
    details: [
      ["Behaviour", "Addition, subtraction, multiplication and division share one reusable function."],
      ["Validation", "Empty fields, non-finite values and division by zero receive specific messages."],
      ["Interaction", "Event listeners update the result, the calculation history and accessible status text."]
    ]
  },
  systems: {
    category: "Systems / Analysis & UML",
    title: "GoodHealth Booking Model",
    summary:
      "A systems-analysis exercise that translated hospital booking requirements into classes, associations, multiplicities and stated assumptions.",
    details: [
      ["Requirements", "Patients, bookings, practitioners and medical services were identified from the brief."],
      ["Modelling", "Doctors and physiotherapists inherit from health practitioners."],
      ["Reasoning", "UML associations make booking and service limits visible before implementation."]
    ]
  }
};

const dialogCategory = document.getElementById("dialogCategory");
const dialogTitle = document.getElementById("dialogTitle");
const dialogSummary = document.getElementById("dialogSummary");
const dialogDetails = document.getElementById("dialogDetails");
const dialogDone = document.getElementById("dialogDone");

function openProjectDialog(projectKey) {
  const project = projectData[projectKey];
  if (!project) {
    return;
  }

  dialogCategory.textContent = project.category;
  dialogTitle.textContent = project.title;
  dialogSummary.textContent = project.summary;
  dialogDetails.replaceChildren();

  project.details.forEach(([heading, content]) => {
    const detail = document.createElement("div");
    const title = document.createElement("h3");
    const paragraph = document.createElement("p");
    title.textContent = heading;
    paragraph.textContent = content;
    detail.append(title, paragraph);
    dialogDetails.append(detail);
  });

  if (typeof projectDialog.showModal === "function") {
    projectDialog.showModal();
  }
  else {
    projectDialog.setAttribute("open", "");
  }
}

projectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openProjectDialog(button.dataset.project);
  });
});

dialogDone.addEventListener("click", () => projectDialog.close());

projectDialog.addEventListener("click", (event) => {
  // The dialog element itself is clicked only outside its internal content area.
  if (event.target === projectDialog) {
    projectDialog.close();
  }
});

/* ==========================================================================
   8. Contact form validation
   Errors are displayed inline, connected with aria-describedby, and focus moves
   to the first invalid field so keyboard and screen-reader users can recover.
   ========================================================================== */

const contactName = document.getElementById("contactName");
const contactEmail = document.getElementById("contactEmail");
const contactMessage = document.getElementById("contactMessage");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const messageCount = document.getElementById("messageCount");
const formStatus = document.getElementById("formStatus");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function setFieldError(field, errorElement, message) {
  errorElement.textContent = message;
  field.setAttribute("aria-invalid", String(Boolean(message)));
}

function validateContactForm() {
  const name = contactName.value.trim();
  const email = contactEmail.value.trim();
  const message = contactMessage.value.trim();
  const errors = [];

  const nameMessage =
    name.length === 0
      ? "Please enter your name."
      : name.length < 2
        ? "Your name should contain at least two characters."
        : "";
  setFieldError(contactName, nameError, nameMessage);
  if (nameMessage) {
    errors.push(contactName);
  }

  const emailMessage =
    email.length === 0
      ? "Please enter an email address."
      : !emailPattern.test(email)
        ? "Enter a valid email address, for example name@example.com."
        : "";
  setFieldError(contactEmail, emailError, emailMessage);
  if (emailMessage) {
    errors.push(contactEmail);
  }

  const messageLength = message.length;
  const messageText =
    messageLength === 0
      ? "Please write a message."
      : messageLength < 20
        ? `Please add ${20 - messageLength} more character(s) so your message is clear.`
        : messageLength > 500
          ? "Please keep the message below 500 characters."
          : "";
  setFieldError(contactMessage, messageError, messageText);
  if (messageText) {
    errors.push(contactMessage);
  }

  formStatus.textContent = "";

  if (errors.length > 0) {
    errors[0].focus();
    return false;
  }

  formStatus.textContent =
    "Validation passed. This static portfolio does not send the message to a server.";
  contactForm.reset();
  messageCount.textContent = "0 / 500";
  return true;
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const isValid = validateContactForm();
  if (isValid) {
    formStatus.textContent += " Thanks for testing the form.";
  }
});

contactMessage.addEventListener("input", () => {
  messageCount.textContent = `${contactMessage.value.length} / 500`;
  setFieldError(contactMessage, messageError, "");
});

[contactName, contactEmail].forEach((field) => {
  field.addEventListener("input", () => {
    const errorElement = field === contactName ? nameError : emailError;
    setFieldError(field, errorElement, "");
  });
});

/* ==========================================================================
   9. Initial state
   Sync the progress bar after fonts and images have had a chance to settle.
   ========================================================================== */

window.addEventListener("load", updateScrollProgress);
