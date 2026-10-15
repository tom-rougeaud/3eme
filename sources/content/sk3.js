/* 3ème Série Pro — petites illustrations « Je découvre » (objets au trait, jamais de personnage ni de logo, viewBox 200 × 130)
   et données réelles de pop culture, avec leur source et leur date de consultation. */
'use strict';
const { Sketch, esc } = require('../lib/visu');
const { MCVP } = require('../shared/g1.js');
const SV = (body, lab, w = 200, h = 130) => `<svg viewBox="0 0 ${w} ${h}" class="pic scene" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(lab)}">${body}</svg>`;
const tt = (x, y, s, fs = 13, o = {}) => `<text x="${x}" y="${y}" font-family="Inter" font-size="${fs}" font-weight="800" text-anchor="${o.a || 'middle'}" class="${o.c || 'tx'}">${s}</text>`;
const fill = (x, y, w, h, op = .9, cls = 'k2', rx = 3) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" class="${cls}" opacity="${op}"/>`;
const mini = (o, f) => { const g = MCVP.plot({ W: 200, H: 130, ml: 30, mr: 8, mt: 8, mb: 22, fs: 10, ...o }); return SV(g.base + f(g), o.lab || 'Graphique'); };

/* ---------- données réelles ---------- */
const D = {
  /* Les Simpson : épisodes par saison, saisons 1 à 36 (terminées). 800e épisode diffusé le 7 décembre 2025 (saison 37). */
  simpsons: [13, 22, 24, 22, 22, 25, 25, 25, 25, 23, 22, 21, 22, 22, 22, 21, 22, 22, 20, 21, 23, 22, 22, 22, 22, 22, 22, 22, 21, 23, 22, 22, 22, 22, 18, 22],
  srcSimpsons: 'Source : Wikipédia (en), « List of The Simpsons episodes », consultée en octobre 2026.',
  /* One Piece : tome 114 sorti au Japon le 4 mars 2026 ; 600 millions d’exemplaires en circulation dans le monde (Shueisha). */
  srcOnePiece: 'Source : éditeur Shueisha, annonce du tome 114 (sorti au Japon le 4 mars 2026), relayée par Outlook Respawn le 15 avril 2026.',
  srcOnePiece2022: 'Source : Livres Hebdo, 4 août 2022 (annonce de Shueisha, tome 103).',
  /* cartes Pokémon : plus de 85 milliards produites au 31 mars 2026, environ 10 milliards en un an (The Pokémon Company). */
  srcPokemon: 'Source : The Pokémon Company, chiffres de l’entreprise au 31 mars 2026, relayés par PokéGuardian.',
  /* Netflix France : tarifs mensuels depuis la hausse du 18 avril 2025 (avant : 5,99 €, 13,49 €, 19,99 €). */
  netflix: [['Standard avec pub', 7.99, 5.99], ['Standard', 14.99, 13.49], ['Premium', 21.99, 19.99]],
  srcNetflix: 'Source : JeChange, « Tarifs Netflix », page mise à jour le 30 septembre 2026 (hausse du 18 avril 2025).',
  srcNetflixDebit: 'Source : centre d’aide Netflix, « Débits Internet recommandés » (consulté en octobre 2026).',
  /* cinéma en France : entrées par mois en 2025 (millions), CNC */
  cnc2025: [13.83, 14.30, 12.72, 11.83, 11.23, 11.37, 14.29, 9.94, 9.46, 12.84, 14.12, 20.73],
  cnc2024: [13.71, 15.06, 15.19, 11.92, 15.71, 14.14, 17.90, 14.13, 10.07, 15.34, 17.83, 20.54],
  srcCnc: 'Source : CNC, communiqués du 3 novembre, du 4 décembre et du 30 décembre 2025 (estimations).',
  top2025: [['Zootopie 2', 6.18], ['Lilo & Stitch', 5.10], ['Avatar : De feu et de cendres', 4.58], ['F1 le film', 3.31], ['Jurassic World : Renaissance', 2.97], ['God save the Tuche', 2.95], ['Minecraft, le film', 2.66], ['Mufasa : Le roi lion', 2.64], ['Dragons', 2.55], ['Mission : Impossible – The Final Reckoning', 2.46]],
  srcTop: 'Source : CNC (données Comscore), communiqué du 30 décembre 2025, entrées en millions.',
  srcEndgame: 'Source : CNC, visa d’exploitation n° 150633 (23 avril 2019) : durée 181 minutes, tous publics.',
  srcGundam: 'Source : Wikipédia (en), « Statue of Unicorn Gundam », consultée en octobre 2026.'
};

const SK = {
  /* chapitre 1 */
  classeur: () => { const K = Sketch(701); let s = fill(30, 14, 140, 104, .4) + K.P(K.rect(30, 14, 140, 104)); for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { const x = 40 + c * 42, y = 20 + r * 32; s += fill(x, y, 36, 28, (r + c) % 3 ? .9 : .6, (r + c) % 3 ? 'k2' : 'k') + K.P(K.rect(x, y, 36, 28), { w: 1.2 }); } return SV(s + tt(100, 128, '9 pochettes par page', 11), 'Une page de classeur à 9 pochettes'); },
  tomes: () => { const K = Sketch(702); let s = K.P(K.line(10, 104, 190, 104), { w: 3 }); [109, 110, 111, 112, 113, 114].forEach((n, i) => { const x = 14 + i * 29, pr = [109, 113].includes(n); s += fill(x, 26, 25, 78, .9, pr ? 'k' : 'k2', 2) + K.P(K.rect(x, 26, 25, 78), { w: 1.4 }) + `<text x="${x + 12.5}" y="72" font-family="Inter" font-size="11" font-weight="800" text-anchor="middle" class="${pr ? 'tw' : 'tx'}" transform="rotate(-90 ${x + 12.5} 68)">${n}</text>`; }); return SV(s + tt(100, 124, 'en couleur : numéro premier', 11), 'Six tomes numérotés de 109 à 114 ; 109 et 113 sont mis en valeur'); },
  arbre: () => { const t = (x, y, s, k) => fill(x - 17, y - 13, 34, 20, .9, k ? 'k' : 'k2', 6) + tt(x, y + 2, s, 12, { c: k ? 'tw' : 'tx' }); const L = (a, b, c, d) => `<path d="M${a} ${b}L${c} ${d}" class="ks" stroke-width="1.8"/>`;
    return SV(t(100, 18, '800') + L(92, 26, 60, 44) + L(108, 26, 140, 44) + t(56, 54, '2', 1) + t(144, 54, '400') + L(136, 62, 112, 80) + L(152, 62, 176, 80) + t(108, 90, '2', 1) + t(180, 90, '200') + tt(100, 122, '… jusqu’aux nombres premiers', 10), 'Le début d’un arbre de décomposition de 800'); },
  fraction: () => { let s = ''; for (let i = 0; i < 10; i++) s += fill(14 + i * 17.2, 34, 15, 40, .9, i < 7 ? 'k' : 'k2', 2); return SV(s + tt(100, 24, '252 sur 360', 13) + tt(100, 98, '= 7 sur 10', 15, { c: 'kt' }), 'Une barre de 10 parts, dont 7 colorées : 252/360 = 7/10'); },
  /* chapitre 2 */
  booster: () => { const K = Sketch(721); let s = fill(18, 14, 70, 104, .5) + K.P(K.poly([[18, 22], [26, 14], [80, 14], [88, 22], [88, 118], [18, 118]], true)) + tt(53, 70, '10', 22) + tt(53, 92, 'cartes', 12); for (let i = 0; i < 10; i++) { const x = 102 + (i % 5) * 19, y = 34 + Math.floor(i / 5) * 40; s += fill(x, y, 15, 32, .9, i < 5 ? 'k' : i < 7 ? 'k2' : 'wh', 2) + K.P(K.rect(x, y, 15, 32), { w: 1.2 }); } return SV(s + tt(150, 124, '5 énergie · 2 dresseur', 10), 'Un booster de 10 cartes : 5 cartes énergie, 2 dresseur, 3 autres'); },
  etagere: () => { const K = Sketch(722); let s = K.P(K.line(8, 96, 192, 96), { w: 3 }); for (let i = 0; i < 18; i++) { const x = 12 + i * 10, h = 54 + (i % 3) * 6; s += fill(x, 96 - h, 8, h, .9, i < 12 ? 'k2' : 'wh', 1) + K.P(K.rect(x, 96 - h, 8, h), { w: 1 }); } return SV(s + tt(100, 116, '114 tomes : 2/3 à Léa', 12), 'Une étagère de tomes de manga, dont les deux tiers en couleur'); },
  box: () => { const K = Sketch(723); return SV(fill(30, 60, 140, 40, .6) + K.P(K.rect(30, 60, 140, 40)) + K.P(K.line(60, 60, 50, 22) + K.line(140, 60, 150, 22), { w: 3 }) + `<circle cx="60" cy="80" r="5" class="k"/><circle cx="80" cy="80" r="5" class="k"/>` + K.P(K.circ(100, 30, 10) + K.circ(100, 30, 20), { w: 1.6, op: .6 }) + tt(130, 85, 'box', 12) + tt(100, 122, 'Ultra HD : 15 Mbit/s', 12), 'Une box internet avec deux antennes'); },
  montagne: () => { const K = Sketch(724); let s = ''; [[30, 6], [56, 9], [82, 11], [108, 9], [134, 6]].forEach(([x, n]) => { for (let k = 0; k < n; k++) s += fill(x, 96 - k * 8, 22, 7, .9, k % 2 ? 'k' : 'k2', 1); }); return SV(s + K.P(K.line(20, 104, 180, 104), { w: 2.4 }) + tt(100, 124, '85 000 000 000 cartes', 12), 'Des piles de cartes, de plus en plus hautes'); },
  pochettes: () => { const K = Sketch(705); let s = ''; [0, 1, 2].forEach(i => { const x = 18 + i * 60; s += fill(x, 30, 48, 62, .9) + K.P(K.rect(x, 30, 48, 62), { w: 1.6 }) + tt(x + 24, 56, '3 cartes', 10) + tt(x + 24, 76, '2 badges', 10); }); return SV(s + tt(100, 18, 'pochettes identiques', 12) + tt(100, 116, '… 42 pochettes en tout', 11), 'Trois pochettes identiques de 3 cartes et 2 badges'); }
};
module.exports = { SK, D, SV, tt, fill, mini };
