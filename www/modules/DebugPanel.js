// DebugPanel.js — toggle with Ctrl+D

import gameConfig from '../config/gameConfig.js';

export class DebugPanel {
    constructor({ player, battleModule, gatherScreen, craftScreen, questModule, updatePlayerStats, checkLevelUp }) {
        this.player = player;
        this.battleModule = battleModule;
        this.gatherScreen = gatherScreen;
        this.craftScreen = craftScreen;
        this.questModule = questModule;
        this.updatePlayerStats = updatePlayerStats;
        this.checkLevelUp = checkLevelUp;
        this.panel = null;
    }

    init() {
        const div = document.createElement('div');
        div.id = 'debug-panel';
        div.className = 'hidden';
        Object.assign(div.style, {
            position: 'fixed', top: '0', right: '0', width: '260px', height: '100vh',
            background: '#0f1a1f', borderLeft: '2px solid #4da6ff', overflowY: 'auto',
            zIndex: '9999', padding: '0.75rem', fontSize: '0.82em', boxSizing: 'border-box',
            color: 'var(--text)', fontFamily: 'inherit',
        });
        document.body.appendChild(div);
        this.panel = div;

        document.addEventListener('keydown', e => {
            if (e.ctrlKey && e.key === 'd') { e.preventDefault(); this.toggle(); }
        });
    }

    toggle() {
        this.panel.classList.toggle('hidden');
        if (!this.panel.classList.contains('hidden')) this.render();
    }

    // Full reset + level ups + random stat/spell distribution
    _setLevel(target) {
        const p = this.player;
        if (target < 1 || target > 100) return;

        // Reset combat stats and pools to initial values
        p.level = 1; p.maxHP = 10; p.currentHP = 10; p.regeneration = 1;
        p.toughness = 4; p.swiftness = 4; p.fortitude = 0; p.defiance = 0;
        p.damage = 1; p.defense = 1;
        p.precision = 1; p.evasion = 1;
        p.critical = 1; p.resistance = 1;
        p.block = 1; p.penetration = 1;
        p.availableSpellPoints = 1;
        for (const spell of gameConfig.spells) p[spell.id] = 0;

        // Apply each level up (mirrors PlayerModel.levelUp)
        for (let lvl = 2; lvl <= target; lvl++) {
            p.level = lvl;
            p.maxHP += 1;
            if (lvl % 25 === 0) p.regeneration += 1;
            p.toughness += 1;
            p.swiftness += 1;
            if (lvl % 10 === 0) {
                p.fortitude += 1;
                p.defiance  += 1;
                p.availableSpellPoints += 1;
            }
        }
        p.currentHP = p.maxHP;

        const req = gameConfig.levelUpRequirements.find(r => r.level === target);
        p.experience = req ? req.experience : 0;

        // Randomly distribute all stat points into their two substats
        this._splitPool(p, 'toughness',  'damage',     'defense');
        this._splitPool(p, 'swiftness',  'precision',  'evasion');
        this._splitPool(p, 'fortitude',  'critical',   'resistance');
        this._splitPool(p, 'defiance',   'block',      'penetration');

        // Randomly assign spell points
        this._randomSpells(p);

        this.updatePlayerStats();
        this.render();
    }

    // Spend all points in `pool` randomly between statA and statB, leaving pool = 0
    _splitPool(p, pool, statA, statB) {
        const total = p[pool];
        const toA = Math.floor(Math.random() * (total + 1));
        p[statA] += toA;
        p[statB] += total - toA;
        p[pool] = 0;
    }

    // Spend all available spell points randomly across spells (up to spellMaxLevel each)
    _randomSpells(p) {
        const max = gameConfig.spellMaxLevel ?? 10;
        let pts = p.availableSpellPoints;
        while (pts > 0) {
            const available = gameConfig.spells.filter(s => (p[s.id] ?? 0) < max);
            if (!available.length) break;
            const spell = available[Math.floor(Math.random() * available.length)];
            p[spell.id] += 1;
            pts -= 1;
        }
        p.availableSpellPoints = 0;
    }

    _avgStat(enemies, stat) {
        if (!enemies.length) return 0;
        return Math.round(enemies.reduce((s, e) => s + (e[stat] ?? 0), 0) / enemies.length);
    }

    render() {
        const p  = this.player;
        const area = gameConfig.areas[p.areaIndex];

        // Enemies the player would actually face: same area, level ≤ player level
        const areaEnemies = gameConfig.enemies.filter(e => e.areaIndex === p.areaIndex && e.type === 'BASE');
        const enemies = areaEnemies.filter(e => e.level <= p.level);
        const displayEnemies = enemies.length ? enemies : areaEnemies; // fallback if overcapped

        const lvMin = areaEnemies.length ? Math.min(...areaEnemies.map(e => e.level)) : '?';
        const lvMax = areaEnemies.length ? Math.max(...areaEnemies.map(e => e.level)) : '?';

        const you = {
            atk:  p.damage    + p.calculateEquippedDamage(),
            def:  p.defense   + p.calculateEquippedDefense(),
            pre:  p.precision + p.calculateEquippedPrecision(),
            eva:  p.evasion   + p.calculateEquippedEvasion(),
        };
        const avg = {
            atk:  this._avgStat(displayEnemies, 'damage'),
            def:  this._avgStat(displayEnemies, 'defense'),
            pre:  this._avgStat(displayEnemies, 'precision'),
            eva:  this._avgStat(displayEnemies, 'evasion'),
            hp:   this._avgStat(displayEnemies, 'maxHP'),
        };

        const row = (label, yours, theirs) => {
            const ok = yours >= theirs;
            return `<tr>
                <td style="opacity:0.65;padding:0.1rem 0">${label}</td>
                <td style="text-align:right;padding:0.1rem 0.3rem"><strong>${yours}</strong></td>
                <td style="text-align:right;padding:0.1rem 0;opacity:0.6">${theirs}</td>
                <td style="text-align:right;padding:0.1rem 0;color:${ok ? '#4caf50' : '#f44336'}">${ok ? '✅' : '⚠️'}</td>
            </tr>`;
        };

        this.panel.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;
                        padding-bottom:0.5rem;margin-bottom:0.6rem;border-bottom:1px solid #2a3d4a">
                <strong style="color:#4da6ff">🛠️ Debug</strong>
                <span style="opacity:0.4;font-size:0.85em">Ctrl+D</span>
            </div>

            <!-- Jump to state -->
            <div style="margin-bottom:0.8rem">
                <div style="opacity:0.5;font-size:0.85em;margin-bottom:0.35rem;text-transform:uppercase;letter-spacing:0.05em">Jump to state</div>

                <div style="display:flex;gap:0.3rem;align-items:center;margin-bottom:0.3rem">
                    <span style="opacity:0.6;white-space:nowrap">Lvl</span>
                    <input id="dbg-level" type="number" value="${p.level}" min="1" max="100"
                           style="width:52px;padding:0.15rem 0.3rem;background:#1a2730;border:1px solid #2a3d4a;color:inherit">
                    <button id="dbg-set-level" style="flex:1">→ Set</button>
                </div>

                <div style="display:flex;gap:0.3rem;align-items:center;margin-bottom:0.3rem">
                    <span style="opacity:0.6">💰</span>
                    <input id="dbg-money" type="number" value="${p.money}" min="0"
                           style="width:70px;padding:0.15rem 0.3rem;background:#1a2730;border:1px solid #2a3d4a;color:inherit">
                    <button id="dbg-set-money" style="flex:1">→ Set</button>
                </div>

                <div style="display:flex;gap:0.3rem;align-items:center;margin-bottom:0.4rem">
                    <select id="dbg-area"
                            style="flex:1;padding:0.2rem;background:#1a2730;border:1px solid #2a3d4a;color:inherit">
                        ${gameConfig.areas.map((a, i) =>
                            `<option value="${i}"${i === p.areaIndex ? ' selected' : ''}>${a.icon} ${a.name}</option>`
                        ).join('')}
                    </select>
                    <button id="dbg-set-area">→ Go</button>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.3rem">
                    <button id="dbg-max-hp">💖 Full HP</button>
                    <button id="dbg-give-money">+500 💰</button>
                    <button id="dbg-give-items">+5 items</button>
                    <button id="dbg-reset-cd">Reset CDs</button>
                </div>
            </div>

            <!-- Balance -->
            <div style="margin-bottom:0.8rem">
                <div style="opacity:0.5;font-size:0.85em;margin-bottom:0.35rem;text-transform:uppercase;letter-spacing:0.05em">
                    Balance — ${area.icon} ${area.name} (Lv ${lvMin}–${lvMax})
                </div>
                <table style="width:100%;border-collapse:collapse">
                    <thead><tr style="opacity:0.4;font-size:0.85em">
                        <th></th>
                        <th style="text-align:right">You</th>
                        <th style="text-align:right">Avg enemy</th>
                        <th></th>
                    </tr></thead>
                    <tbody>
                        ${row('ATK', you.atk, avg.atk)}
                        ${row('DEF', you.def, avg.def)}
                        ${row('PRE', you.pre, avg.pre)}
                        ${row('EVA', you.eva, avg.eva)}
                        <tr>
                            <td style="opacity:0.65;padding:0.1rem 0">HP</td>
                            <td style="text-align:right;padding:0.1rem 0.3rem"><strong>${p.currentHP}/${p.maxHP}</strong></td>
                            <td style="text-align:right;opacity:0.6">${avg.hp}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Simulation -->
            <div>
                <div style="opacity:0.5;font-size:0.85em;margin-bottom:0.35rem;text-transform:uppercase;letter-spacing:0.05em">Simulation</div>
                <button id="dbg-sim" style="width:100%;background:#0a1a2a;border-color:#4da6ff;color:#4da6ff;margin-bottom:0.4rem">
                    ⚔️ Run 20 fights (this area)
                </button>
                <div id="dbg-sim-result"></div>
            </div>
        `;

        this._attachListeners();
    }

    _attachListeners() {
        const $ = id => this.panel.querySelector(id);
        const p = this.player;

        $('#dbg-set-level').onclick = () => {
            const val = Math.max(1, Math.min(100, parseInt($('#dbg-level').value) || 1));
            this._setLevel(val);
        };

        $('#dbg-set-money').onclick = () => {
            p.money = Math.max(0, parseInt($('#dbg-money').value) || 0);
            this.updatePlayerStats();
            this.render();
        };

        $('#dbg-set-area').onclick = () => {
            p.areaIndex = parseInt($('#dbg-area').value);
            this.updatePlayerStats();
            this.render();
        };

        $('#dbg-max-hp').onclick = () => {
            p.currentHP = p.maxHP;
            this.updatePlayerStats();
        };

        $('#dbg-give-money').onclick = () => {
            p.money += 500;
            this.updatePlayerStats();
            this.render();
        };

        $('#dbg-give-items').onclick = () => {
            const pool = gameConfig.itemsList.filter(i => i.level <= p.level + 5);
            for (let i = 0; i < 5; i++) {
                const item = pool[Math.floor(Math.random() * pool.length)];
                if (item) p.inventory.push({ ...item });
            }
            this.updatePlayerStats();
        };

        $('#dbg-reset-cd').onclick = () => {
            this.gatherScreen?.cooldowns?.clear();
            this.craftScreen?.cooldowns?.clear();
        };

        $('#dbg-sim').onclick = () => this._simulate(20);
    }

    _simulate(n) {
        const p  = this.player;
        const bm = this.battleModule;

        const savedHP    = p.currentHP;
        const savedFlee  = bm.fleeMode;
        const savedBoss  = bm.bossMode;
        const savedBossP = bm.bossPhaseTriggered;
        bm.fleeMode = false; bm.bossMode = false;
        bm.bossPhaseTriggered = false; bm.fleedFromBattle = false;

        let wins = 0, losses = 0, draws = 0;
        let totalRounds = 0, totalDealt = 0, totalTaken = 0;

        for (let i = 0; i < n; i++) {
            p.currentHP = p.maxHP;
            const enemy = bm.generateEnemy({ areaIndex: p.areaIndex, type: 'BASE' }, { maxLevel: p.level });
            enemy.currentHP = enemy.maxHP;
            const rounds = bm.battle(enemy);
            const last = rounds.length ? rounds[rounds.length - 1] : { playerHP: p.currentHP, enemyHP: enemy.currentHP };

            totalRounds += rounds.length;
            totalDealt  += enemy.maxHP - Math.max(last.enemyHP, 0);
            totalTaken  += Math.max(0, p.maxHP - last.playerHP);

            if (last.enemyHP <= 0)       wins++;
            else if (last.playerHP <= 0) losses++;
            else                          draws++;
        }

        p.currentHP       = savedHP;
        bm.fleeMode       = savedFlee;
        bm.bossMode       = savedBoss;
        bm.bossPhaseTriggered = savedBossP;
        bm.fleedFromBattle = false;

        const winRate  = Math.round(wins / n * 100);
        const barColor = winRate >= 70 ? '#4caf50' : winRate >= 45 ? '#ff9800' : '#f44336';

        const el = this.panel.querySelector('#dbg-sim-result');
        el.innerHTML = `
            <div style="height:6px;background:#1a2730;border-radius:3px;margin-bottom:0.35rem">
                <div style="width:${winRate}%;height:100%;background:${barColor};border-radius:3px"></div>
            </div>
            <table style="width:100%;border-collapse:collapse">
                <tr>
                    <td style="opacity:0.65">Win rate</td>
                    <td style="text-align:right"><strong style="color:${barColor}">${winRate}%</strong></td>
                </tr>
                <tr>
                    <td style="opacity:0.65">W / L / D</td>
                    <td style="text-align:right">${wins} / ${losses} / ${draws}</td>
                </tr>
                <tr>
                    <td style="opacity:0.65">Avg rounds</td>
                    <td style="text-align:right">${(totalRounds / n).toFixed(1)}</td>
                </tr>
                <tr>
                    <td style="opacity:0.65">Avg HP lost</td>
                    <td style="text-align:right">${Math.round(totalTaken / n)} / ${p.maxHP}</td>
                </tr>
            </table>
            <div style="opacity:0.4;font-size:0.85em;margin-top:0.3rem">
                Target: zone 1 ≥80% · mid ~60% · endgame ~40%
            </div>
        `;
    }
}
