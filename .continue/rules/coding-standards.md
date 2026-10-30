---
name: Project Coding Standards
alwaysApply: true
---

# AI Coding Guidelines for Identity-app

- **Framework:** React 19 and Vite.
- **Styling:** Tailwind CSS v4.
- **React 19 Rules:** 
  - Do not use `forwardRef`. Pass `ref` as a standard prop.
  - Use `<Context>` instead of `<Context.Provider>`.
  - Prefer the new `use` hook for reading context or promises where applicable.
  - Use `useActionState` for form submissions.
- **Tailwind v4 Rules:**
  - Tailwind v4 is CSS-first. All configuration belongs in `src/index.css` using the `@theme` directive, not a `tailwind.config.js` file.
  - Rely on modern arbitrary values and built-in CSS variables.
- **Architecture:** Maintain functional components, clean state management, and mobile-first responsive design.

