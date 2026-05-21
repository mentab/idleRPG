# Fantasy Clicker Battles

Idle/clicker RPG in vanilla JavaScript (ES modules). Play in the browser or package for Android with Capacitor.

## Quick start

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). ES modules require a local server — do not open `www/index.html` directly from the file system.

## Styling

- `www/custom.css` — main UI (Simple.css-inspired). Inline styles in JS when needed. See `docs/CONTEXT.md`.

## Project layout

| Path | Role |
|------|------|
| `docs/CONTEXT.md` | Project conventions for humans & AI |
| `www/index.html` | App shell |
| `www/index.js` | Game orchestration |
| `www/config/gameConfig.js` | Content and balance data |
| `www/screens/` | UI panels |
| `www/modules/` | Combat, heal, messages, etc. |
| `www/models/PlayerModel.js` | Player state and save/load |
| `main_save.js` (root) | Legacy monolith — move to `archive/` when cleaning up |

## Android (optional)

Copy `capacitor.config.sample.json` to `capacitor.config.json`, set `webDir` to `www`, then use the Capacitor CLI as usual.

## Mini-games (combat)

Before Battle / Boss / Quest / Duel, a random mini-game is required. Score 0–100 → temporary buff or debuff on `damage`, `precision`, `defense`, or `evasion` for 1–3 combat turns.

## Roadmap

See `TODO.txt` for version goals (stats rework, zones, crafting, etc.).
