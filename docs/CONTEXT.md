# Project context — Fantasy Clicker Battles

## Styling

**Pragmatic approach** — good layout matters more than strict “classless” purity.

- **Main stylesheet:** `www/custom.css` (Simple.css-inspired base + game layout). Keep changes focused; avoid huge new frameworks (Bootstrap, Tailwind).
- **CSS classes** are fine when they help (`hidden`, `game-notice`, list grids via `#…-list`).
- **Inline `style="..."`** in JS-generated HTML is OK when there is no clean alternative (e.g. battle HP bar row). Prefer `custom.css` when the pattern repeats.
- **Semantic HTML** where easy (`button`, `section`, `details`, `progress`).
- In-game UI text: **English**.

## Palette (`:root` in `custom.css`)

| Token | Value |
|-------|--------|
| Background | `#202b30` |
| Text / accent | `#f1e0c3` |

## Stack

- Vanilla JS (ES modules)
- `www/` = web app; Capacitor Android optional

## Architecture

- `www/index.js` — screen routing
- `www/config/gameConfig.js` — content
- `www/screens/` — UI panels
- `www/modules/` — combat, messages, mini-game bonuses
- Mini-game: `#combat-minigame-panel` inside `game-info-screen`, before combat only

## Roadmap

See `TODO.txt`.
