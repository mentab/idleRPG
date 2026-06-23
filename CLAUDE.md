# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev   # start local dev server on http://localhost:3000
```

No test framework is configured. Manual browser testing is the current approach. ES modules require a local server — do not open `www/index.html` directly from the filesystem.

## Architecture

Vanilla JS idle/clicker RPG (no framework). All game code lives in `www/`.

**Core flow:**
1. `www/index.js` — `Game` class handles screen routing (toggles `hidden` class on screen elements)
2. Player picks an action on `ChooseScreen` → `AreasScreen` → `MiniGameScreen` (random mini-game) → `BattleModule` (combat) → results
3. Mini-game score (0–100) applies a temporary buff/debuff (`damage`, `precision`, `defense`, or `evasion`) for 1–3 combat turns via `MiniGameBonusModule`

**Key files:**
- `www/config/gameConfig.js` — all content and balance data (items, enemies, spells, areas)
- `www/models/PlayerModel.js` — player state, save/load (localStorage)
- `www/modules/BattleModule.js` — combat engine (Exploration, Challenge, Mission, Duel modes)
- `www/screens/` — 13 UI panels, each a JS class that renders HTML into its section
- `www/games/` — 4 mini-games: `TimingGame`, `ClickerGame`, `MemoryGame`, `AsciiReactionGame`

**`main_save.js`** at the root is a legacy monolith — move to `archive/` when cleaning up, do not edit it.

## Styling

- `www/custom.css` is the sole stylesheet (Simple.css-inspired, no external UI frameworks).
- CSS classes and IDs are fine (`hidden`, `.game-notice`, `#item-list` grids).
- Inline `style="..."` in JS-generated HTML is acceptable for one-off dynamic layout (e.g. HP bar rows). If the same pattern appears twice, move it to `custom.css`.
- Palette: background `#202b30`, text/accent `#f1e0c3` (defined as `:root` tokens in `custom.css`).
- All in-game UI text must be in **English**.

## Android

Copy `capacitor.config.sample.json` → `capacitor.config.json`, set `webDir` to `www`, then use the Capacitor CLI as usual.
