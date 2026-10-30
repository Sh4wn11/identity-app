# Identity App

An interactive Single-Page Application (SPA) that translates psychologist James Marcia's **Four Statuses of Identity** into an accessible, gamified digital experience.

 **Live Demo:** `https://<your-github-username>.github.io/identity-compass/`

---

##  Psychological Premise

Navigating identity formation in the digital age often triggers analysis paralysis, cognitive dissonance, or apathy. **Identity Compass** crosses two core psychological dimensions—**Exploration** and **Commitment**—to guide users through four distinct stages:

1. **Identity Diffusion** (*Low Exploration, Low Commitment*): Understanding digital overwhelm and avoidance defenses, paired with low-stakes exposure strategies.
2. **Identity Moratorium** (*High Exploration, Low Commitment*): Reframing paralyzing life choices as temporary, editable rough drafts through **The Commitment Sandbox**.
3. **Identity Foreclosure** (*Low Exploration, High Commitment*): Safely introducing cognitive dissonance to examine inherited beliefs with curiosity.
4. **Identity Achievement** (*High Exploration, High Commitment*): Consolidating a resilient, self-authored moral framework.

---

##  Key Engineering & UX Features

* **Config-Driven UI Architecture:** Built with parameterized preset lookup maps (`SCALE_PRESETS`, `LAYOUT_PRESETS`) and fallback guards (`??`) to ensure full Tailwind v4 static class detection and effortless UI theming.
* **2x2 Quadrant Matrix HUD (`IntersectionObserver`):** A floating, context-aware compass that tracks viewport scroll position and dynamically highlights the active Exploration/Commitment quadrant.
* **The Commitment Sandbox (`useReducer` + Native HTML5 Drag-and-Drop):** An interactive square sticky-note pad and Drafts board with drag-to-trash deletion and touch-device fallbacks.
* **Onboarding Chat Modal:** An accessible (`aria-modal`), scroll-locked conversational guide introducing the core theoretical concepts before exploration begins.
* **Interactive Self-Discovery Quiz:** Calculates the user's primary identity status and deep-links directly to their corresponding section.
* **Dark / Light Mode Support:** Seamless theme switching powered by Tailwind CSS v4 custom variants.

---

##  Tech Stack

* **Frontend Framework:** React 19
* **Build Tool:** Vite
* **Styling:** Tailwind CSS v4 (CSS-first `@theme` architecture)
* **Deployment:** GitHub Actions CI/CD & GitHub Pages

---

## Running Locally

```bash
# 1. Clone the repository
git clone [https://github.com/](https://github.com/)Sh4wn11/identity-app

# 2. Navigate into the project directory
cd identity-compass

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev