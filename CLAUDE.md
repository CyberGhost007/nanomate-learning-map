# Claude Project Notes

## Project

Nanomate Learning Map is a Vite + React prototype for a learner journey flow:

- Learner Profile
- Ability Score
- Outcome Score and Skill-Will Score
- KPI Dashboard
- Gap Analysis
- Practice choices: Quiz, Flashcard, Tips
- Release flow: Nudge Generated, Ability Score Updated, Map Generated and Released

Production URL:

```text
https://cyberghost007.github.io/nanomate-learning-map/
```

Repository:

```text
https://github.com/CyberGhost007/nanomate-learning-map
```

## Local Workflow

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build locally:

```bash
npm run build
```

Build for GitHub Pages:

```bash
VITE_BASE_PATH=/nanomate-learning-map/ npm run build
```

## Deployment

This repo is deployed through the `gh-pages` branch, not GitHub Actions.

GitHub Actions was blocked by an account billing-lock message, so the static `dist` output is built locally and pushed to `gh-pages`.

Recommended deploy flow:

```bash
VITE_BASE_PATH=/nanomate-learning-map/ npm run build
printf '' > dist/.nojekyll
```

Then publish the contents of `dist/` to the `gh-pages` branch.

Do not commit `dist/` to `main`.

## Code Map

- `src/main.jsx`: React state, journey data, node routing, detail panels, practice panels, release flow.
- `src/styles.css`: Layout, node styling, connector styling, panel styling, responsive behavior.
- `vite.config.js`: Vite config and GitHub Pages base-path handling.
- `index.html`: App shell and favicon.

## UI Notes

- Keep the first screen as the usable app, not a marketing page.
- Practice choices must open their own UI:
  - Quiz opens the quick-check quiz.
  - Flashcard opens the TAT concept card.
  - Tips opens coaching tips.
- Future nodes should stay hidden until they are revealed.
- Avoid scroll jumps when progressing through the flow.
- Keep connectors clean and professional; avoid diagonal line clutter where routed paths are clearer.
- Avoid horizontal overflow on desktop and mobile.

## Validation

Before publishing UI changes:

```bash
npm run build
```

Also click through these flows:

- Quiz -> Generate Nudge
- Flashcard -> Generate Nudge
- Tips -> Generate Nudge
- Nudge Generated -> Ability Score Updated -> Map Generated and Released
