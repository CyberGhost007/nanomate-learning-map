# Codex Project Notes

## Project

Nanomate Learning Map is a Vite + React prototype for an interactive learner journey map.

Live page:

```text
https://cyberghost007.github.io/nanomate-learning-map/
```

GitHub repo:

```text
https://github.com/CyberGhost007/nanomate-learning-map
```

## Commands

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Build for GitHub Pages:

```bash
VITE_BASE_PATH=/nanomate-learning-map/ npm run build
```

## Repository Shape

- `src/main.jsx` owns the flow data, reveal state, node selection, practice routing, and panels.
- `src/styles.css` owns the full visual system, graph layout, connectors, panels, and responsive behavior.
- `vite.config.js` sets the correct base path for GitHub Pages.
- `README.md` has basic local setup and build instructions.

## Current UX Rules

- Do not collapse Quiz, Flashcard, and Tips into one generic screen.
- Each practice node must route to its own panel.
- The selected practice node is the only practice node that becomes complete after moving into the release flow.
- Future nodes stay hidden until their reveal level is reached.
- Progression should not force-scroll the page.
- Keep map connectors deliberate and routed; do not add messy crossing diagonals.
- Preserve responsive layout and avoid horizontal overflow.

## Deployment Notes

The public site is served from the `gh-pages` branch.

GitHub Actions was previously attempted, but the account returned a billing-lock error and did not run workflows. Keep deployment branch-based unless that account issue is resolved.

Manual publish pattern:

```bash
VITE_BASE_PATH=/nanomate-learning-map/ npm run build
printf '' > dist/.nojekyll
```

Push the contents of `dist/` to the `gh-pages` branch. Keep `dist/` ignored on `main`.

## Validation Checklist

Run:

```bash
npm run build
```

Then verify:

- Profile through Gap Analysis unlocks in order.
- Quiz opens the quiz panel.
- Flashcard opens the TAT concept card.
- Tips opens coaching tips.
- Each practice panel can continue to Nudge Generated.
- Release flow continues to Ability Score Updated and Map Generated and Released.
- No unexpected scroll jump or horizontal overflow appears.
