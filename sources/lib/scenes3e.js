/* 3ème Série Pro — scènes d’ouverture (une par chapitre) : objets de pop culture au trait, jamais de personnage ni de logo.
   viewBox 600 × 230. Et les 6 compétences du cycle 4, illustrées par un geste. */
'use strict';
const { Sketch, esc } = require('./visu');
const SV = (w, h, body, lab) => `<svg viewBox="0 0 ${w} ${h}" class="pic scene" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(lab)}">${body}</svg>`;
const tint = (x, y, w, h, op = .9, rx = 4) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" class="k2" opacity="${op}"/>`;
const acc = (x, y, w, h, op = .85, rx = 4) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" class="k" opacity="${op}"/>`;
const SC = {};

/* 1 · arithmétique : un classeur de cartes (pages de 9 pochettes), des boosters, une étagère de tomes numérotés */
SC.c1 = () => { const K = Sketch(511); let s = K.P(K.line(30, 205, 570, 205));
  s += tint(40, 40, 230, 160, .45) + K.P(K.rect(40, 40, 230, 160)) + K.P(K.line(155, 40, 155, 200), { w: 2 });
  [0, 1].forEach(p => { for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { const x = 50 + p * 115 + c * 34, y = 52 + r * 48; s += ((r + c + p) % 4 === 0 ? acc(x, y, 28, 40, .7, 3) : tint(x, y, 28, 40, .95, 3)) + K.P(K.rect(x, y, 28, 40), { w: 1.4 }); } });
  s += K.tx(155, 30, '9 cartes par page', 14);
  [[300, 120], [330, 112], [360, 124]].forEach(([x, y], i) => { s += (i === 1 ? acc(x, y, 40, 70, .8, 3) : tint(x, y, 40, 70, .9, 3)) + K.P(K.poly([[x, y + 8], [x + 6, y], [x + 34, y], [x + 40, y + 8], [x + 40, y + 70], [x, y + 70]], true), { w: 2 }) + K.P(K.line(x + 4, y + 14, x + 36, y + 14), { w: 1.2 }); });
  s += K.tx(345, 104, 'boosters', 13);
  s += K.P(K.line(420, 120, 570, 120), { w: 3 });
  [112, 113, 114].forEach((n, i) => { const x = 428 + i * 46; s += (i === 2 ? acc(x, 46, 40, 74, .8, 2) : tint(x, 46, 40, 74, .9, 2)) + K.P(K.rect(x, 46, 40, 74), { w: 1.8 }) + K.tx(x + 20, 92, String(n), 14, { c: i === 2 ? '#fff' : undefined }); });
  s += K.tx(497, 140, 'tomes 112 à 114', 13) + K.tx(497, 170, '114 = 2 × 3 × 19', 15);
  return SV(600, 230, s, 'Un classeur de cartes à 9 pochettes par page, trois boosters et une étagère de tomes numérotés 112, 113 et 114'); };

/* 2 · puissances : des montagnes de cartes, une pile de mangas, une box et un écran */
SC.c2 = () => { const K = Sketch(512); let s = K.P(K.line(30, 205, 570, 205));
  [[50, 9], [84, 13], [118, 16], [152, 11]].forEach(([x, n]) => { for (let k = 0; k < n; k++) s += (k % 3 ? tint(x, 196 - k * 10, 28, 8, .95, 1) : acc(x, 196 - k * 10, 28, 8, .8, 1)); s += K.P(K.rect(x, 204 - n * 10, 28, n * 10), { w: 1.4 }); });
  s += K.tx(115, 30, '85 milliards de cartes', 14) + K.tx(115, 48, '8,5 × 10¹⁰', 15);
  for (let k = 0; k < 12; k++) { const w = 70 - (k % 2) * 6; s += (k % 4 ? tint(270 + (k % 3), 190 - k * 12, w, 10, .95, 2) : acc(270 + (k % 3), 190 - k * 12, w, 10, .8, 2)) + K.P(K.rect(270 + (k % 3), 190 - k * 12, w, 10), { w: 1.2 }); }
  s += K.tx(305, 30, '600 millions', 14) + K.tx(305, 48, 'de mangas', 13);
  s += tint(420, 60, 140, 86, .5, 6) + K.P(K.rect(420, 60, 140, 86)) + K.P(K.line(490, 146, 490, 166) + K.line(460, 168, 520, 168), { w: 2.4 }) + K.tx(490, 108, 'Ultra HD', 16);
  s += acc(440, 178, 100, 22, .8, 6) + K.P(K.rect(440, 178, 100, 22)) + K.P(K.line(460, 178, 452, 160) + K.line(520, 178, 528, 160), { w: 2 }) + K.tx(490, 194, 'box', 12, { c: '#fff' }) + K.tx(490, 40, '15 Mbit/s', 15);
  return SV(600, 230, s, 'Des piles de cartes, une pile de mangas, un écran et une box internet'); };

/* 3 · calcul littéral : un écran avec trois tarifs, une manette, un cadenas à code */
SC.c3 = () => { const K = Sketch(513); let s = K.P(K.line(30, 205, 570, 205));
  s += tint(40, 40, 230, 140, .45, 8) + K.P(K.rect(40, 40, 230, 140)) + K.P(K.line(155, 180, 155, 200) + K.line(120, 202, 190, 202), { w: 2.4 });
  [['7,99 €', 'pub'], ['14,99 €', 'Standard'], ['21,99 €', 'Premium']].forEach(([p, l], i) => { const x = 54 + i * 72; s += (i === 1 ? acc(x, 70, 62, 70, .85, 8) : tint(x, 70, 62, 70, .95, 8)) + K.P(K.rect(x, 70, 62, 70), { w: 1.6 }) + K.tx(x + 31, 100, p, 13, { c: i === 1 ? '#fff' : undefined }) + K.tx(x + 31, 122, l, 11, { c: i === 1 ? '#fff' : undefined }); });
  s += K.tx(155, 30, 'trois formules par mois', 14);
  s += tint(312, 120, 120, 60, .9, 26) + K.P(K.rect(312, 120, 120, 60)) + K.P(K.line(340, 150, 360, 150) + K.line(350, 140, 350, 160), { w: 3 }) + `<circle cx="398" cy="142" r="6" class="k"/><circle cx="412" cy="158" r="6" class="k"/>` + K.tx(372, 106, 'x mois ?', 15);
  s += K.P('M488 102 V80 a30 30 0 0 1 60 0 V102', { w: 4 }) + acc(470, 102, 96, 84, .85, 8) + K.P(K.rect(470, 102, 96, 84)) + K.tx(518, 136, '(x − 3)', 13, { c: '#fff' }) + K.tx(518, 158, '(2x + 8) = 0', 13, { c: '#fff' });
  return SV(600, 230, s, 'Un écran avec trois tarifs mensuels, une manette de jeu et un cadenas à code'); };

/* 4 · proportionnalité : un écran de cinéma, un bol de ramen, des barres de réseau, une étiquette de prix */
SC.c4 = () => { const K = Sketch(514); let s = K.P(K.line(30, 205, 570, 205));
  s += tint(30, 30, 200, 110, .45, 6) + K.P(K.rect(30, 30, 200, 110)) + K.tx(130, 80, '181 min', 22) + K.tx(130, 108, 'Ultra HD', 14);
  for (let r = 0; r < 2; r++) for (let k = 0; k < 6; k++) s += K.P(K.circ(50 + k * 32, 170 + r * 22, 8), { w: 1.4 });
  s += K.P('M260 110 Q330 210 400 110 Z', { fill: '#fff' }) + tint(270, 106, 120, 10, .9, 4) + K.P(K.line(258, 110, 402, 110) + K.line(360, 60, 384, 104) + K.line(374, 56, 396, 100), { w: 2.6 }) + `<circle cx="306" cy="114" r="9" class="k"/>` + K.tx(330, 180, 'ratio 5 : 1', 14);
  [20, 36, 52, 68].forEach((h, i) => { s += (i < 3 ? acc(430 + i * 18, 110 - h, 12, h, .85, 2) : tint(430 + i * 18, 110 - h, 12, h, .95, 2)); });
  s += K.tx(460, 130, '15 Mbit/s', 14) + tint(500, 150, 70, 44, .95, 6) + K.P(K.rect(500, 150, 70, 44)) + K.tx(535, 168, '5,99 €', 11) + K.tx(535, 186, '→ 7,99 €', 12);
  return SV(600, 230, s, 'Un écran de cinéma, un bol de ramen, des barres de réseau et une étiquette de prix'); };

/* 5 · fonctions : un jeu de plateforme avec la trajectoire d’un saut, une manette, un ticket de cinéma */
SC.c5 = () => { const K = Sketch(515); let s = tint(30, 24, 330, 176, .35, 8) + K.P(K.rect(30, 24, 330, 176));
  for (let i = 0; i < 10; i++) s += tint(40 + i * 32, 170, 28, 22, .95, 2) + K.P(K.rect(40 + i * 32, 170, 28, 22), { w: 1.2 });
  s += acc(232, 120, 28, 50, .8, 2) + acc(264, 100, 28, 70, .8, 2);
  s += K.P(K.curve(x => 168 - (x - 70) * (250 - x) / 75, 70, 250), { w: 2.2, op: .8 }) + acc(150, 50, 26, 26, .9, 5) + K.P(K.rect(150, 50, 26, 26)) + K.tx(110, 50, 'h(t)', 16);
  s += tint(392, 60, 150, 70, .9, 30) + K.P(K.rect(392, 60, 150, 70)) + K.P(K.line(420, 95, 444, 95) + K.line(432, 83, 432, 107), { w: 3 }) + `<circle cx="505" cy="86" r="7" class="k"/><circle cx="520" cy="104" r="7" class="k"/>`;
  s += acc(400, 156, 140, 46, .85, 8) + K.P(K.rect(400, 156, 140, 46)) + K.tx(470, 185, '5x + 30', 16, { c: '#fff' });
  return SV(600, 230, s, 'Un écran de jeu de plateforme avec la trajectoire d’un saut, une manette et une carte de cinéma'); };

/* 6 · statistiques : un téléviseur et ses saisons, un clap de cinéma, un ordinateur avec un diagramme */
SC.c6 = () => { const K = Sketch(516); let s = K.P(K.line(30, 205, 570, 205));
  s += tint(30, 40, 170, 110, .45, 8) + K.P(K.rect(30, 40, 170, 110)) + K.P(K.line(115, 150, 115, 170) + K.line(85, 172, 145, 172), { w: 2.4 }) + K.tx(115, 88, '36 saisons', 17) + K.tx(115, 116, '790 épisodes', 14);
  s += tint(236, 90, 120, 80, .9, 4) + K.P(K.rect(236, 90, 120, 80)) + K.P(K.poly([[236, 90], [240, 62], [358, 48], [356, 76]], true), { w: 2.4 }) + K.tx(296, 136, 'TOP 10', 18) + K.tx(296, 158, '2025', 12);
  s += tint(390, 40, 180, 116, .4, 6) + K.P(K.rect(390, 40, 180, 116)) + K.P(K.poly([[372, 156], [588, 156], [576, 176], [384, 176]], true), { w: 2 });
  [13.8, 14.3, 12.7, 11.8, 11.2, 11.4, 14.3, 9.9, 9.5, 12.8, 14.1, 20.7].forEach((v, i) => { s += (i === 11 ? acc(402 + i * 13.5, 148 - v * 4.6, 10, v * 4.6, .85, 1) : tint(402 + i * 13.5, 148 - v * 4.6, 10, v * 4.6, .95, 1)); });
  s += K.tx(480, 32, 'entrées 2025', 13);
  return SV(600, 230, s, 'Un téléviseur, un clap de cinéma et un ordinateur portable avec un diagramme en barres'); };

/* 7 · probabilités : un dé à 20 faces, deux dés à 6 faces, des boosters, des blocs de programme */
SC.c7 = () => { const K = Sketch(517); let s = K.P(K.line(30, 205, 570, 205));
  const p = Array.from({ length: 6 }, (_, i) => [120 + 70 * Math.cos(Math.PI / 6 + i * Math.PI / 3), 112 + 70 * Math.sin(Math.PI / 6 + i * Math.PI / 3)]);
  s += tint(64, 56, 112, 112, .45, 50) + K.P(K.poly(p, true), { w: 2.6 }) + K.P(K.poly([[120, 74], [82, 136], [158, 136]], true), { w: 2 }) + K.tx(120, 124, '20', 26);
  const de = (x, y, pts) => tint(x, y, 62, 62, .9, 10) + K.P(K.rect(x, y, 62, 62)) + pts.map(([a, b]) => `<circle cx="${x + a}" cy="${y + b}" r="5.5" class="k"/>`).join('');
  s += de(220, 120, [[16, 16], [46, 46]]) + de(296, 112, [[16, 16], [31, 31], [46, 46], [16, 46], [46, 16]]);
  [[392, 70], [432, 60], [472, 74]].forEach(([x, y], i) => { s += (i === 1 ? acc(x, y, 36, 64, .85, 3) : tint(x, y, 36, 64, .95, 3)) + K.P(K.rect(x, y, 36, 64), { w: 1.6 }); });
  s += K.tx(450, 46, 'boosters', 13);
  [['#E6A800', 'répéter 1000 fois'], ['#3E9E3E', 'aléatoire 1 à 20'], ['#E8730A', 'ajouter 1']].forEach(([cl, t], i) => { s += `<rect x="${380 + i * 8}" y="${150 + i * 18}" width="170" height="16" rx="4" fill="${cl}"/><text x="${388 + i * 8}" y="${162 + i * 18}" font-family="Inter" font-size="10" font-weight="700" fill="#fff">${t}</text>`; });
  return SV(600, 230, s, 'Un dé à 20 faces, deux dés à 6 faces, trois boosters et des blocs de programme'); };

/* 8 · triangle rectangle : un grand écran et sa diagonale, une statue géante (silhouette rectangulaire), une équerre */
SC.c8 = () => { const K = Sketch(518); let s = K.P(K.line(30, 205, 570, 205));
  s += tint(30, 50, 220, 124, .45, 4) + K.P(K.rect(30, 50, 220, 124)) + K.P(K.line(30, 174, 250, 50), { w: 2, c: '#C2332A' }) + K.P(K.line(140, 174, 140, 196) + K.line(104, 198, 176, 198), { w: 2.4 }) + K.tx(140, 38, '55 pouces', 15);
  s += acc(380, 26, 46, 179, .55, 4) + K.P(K.rect(380, 26, 46, 179)) + K.P(K.line(274, 205, 380, 26), { w: 1.8, c: '#C2332A', op: .8 }) + K.tx(448, 110, '19,7 m', 15, { a: 'start' }) + K.tx(316, 196, '35°', 13);
  s += K.P(K.poly([[480, 205], [570, 205], [480, 140]], true), { w: 2.6 }) + `<path d="M480 191h14v14" fill="none" stroke="#2B2D7C" stroke-width="2"/>` + K.tx(526, 132, 'équerre', 13);
  return SV(600, 230, s, 'Un grand écran avec sa diagonale, une haute statue vue sous un angle et une équerre'); };

/* 9 · échelles : une haute statue et sa petite maquette, une boîte de figurine, un projecteur et son faisceau */
SC.c9 = () => { const K = Sketch(519); let s = K.P(K.line(30, 205, 570, 205));
  s += tint(40, 22, 60, 183, .5, 4) + K.P(K.rect(40, 22, 60, 183)) + K.tx(70, 120, '19,7 m', 14, { r: -90 }) + acc(130, 182, 12, 23, .85, 2) + K.P(K.rect(130, 182, 12, 23), { w: 1.4 }) + K.tx(136, 170, '1/144', 12);
  s += tint(190, 110, 90, 95, .9, 6) + K.P(K.rect(190, 110, 90, 95)) + acc(222, 126, 26, 64, .7, 10) + K.tx(235, 100, '1/6', 15);
  s += acc(320, 120, 40, 28, .85, 5) + K.P(K.rect(320, 120, 40, 28)) + K.P(K.line(360, 134, 560, 40) + K.line(360, 134, 560, 196), { w: 1.6, op: .7 }) + K.P(K.line(450, 92, 450, 176), { w: 3, c: '#1D5FC2' }) + K.P(K.line(560, 40, 560, 196), { w: 3, c: '#C2332A' }) + K.tx(450, 196, '4 m', 12) + K.tx(540, 218, '10 m', 12);
  return SV(600, 230, s, 'Une statue et sa maquette, une boîte de figurine, un projecteur et deux images de tailles différentes'); };

/* 10 · espace et programmes : un seau de pop-corn, un ballon, un globe, un sprite en pixel art et des blocs de programme */
SC.c10 = () => { const K = Sketch(520); let s = K.P(K.line(30, 205, 570, 205));
  s += K.P('M40 76 L54 205 L136 205 L150 76', { fill: '#fff' }) + `<ellipse cx="95" cy="76" rx="55" ry="11" class="k2 ks" stroke-width="2"/>` + [52, 70, 88, 106, 124, 140].map((x, i) => `<circle cx="${x}" cy="${66 - (i % 2) * 8}" r="9" class="wh ks" stroke-width="1.4"/>`).join('') + K.P(K.line(70, 90, 76, 200) + K.line(95, 92, 95, 202) + K.line(120, 90, 114, 200), { w: 1.6, c: '#C2332A' });
  s += tint(186, 140, 64, 64, .35, 32) + K.P(K.circ(218, 172, 32)) + `<polygon points="218,160 229,168 225,181 211,181 207,168" class="k"/>`;
  s += tint(280, 30, 120, 120, .3, 60) + K.P(K.circ(340, 90, 60)) + `<ellipse cx="340" cy="90" rx="60" ry="14" fill="none" class="ks" stroke-width="1.6"/><ellipse cx="340" cy="90" rx="16" ry="60" fill="none" class="ks" stroke-width="1.6"/>` + K.tx(340, 172, 'latitude, longitude', 12);
  [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2], [1, 3], [0, 3]].forEach(([x, y]) => { s += `<rect x="${440 + x * 18}" y="${40 + y * 18}" width="18" height="18" class="k ks" stroke-width="1"/>`; });
  [['#E8901A', 'répéter 6 fois'], ['#3373CC', 'avancer de 50'], ['#3373CC', 'tourner de 60°']].forEach(([cl, t], i) => { s += `<rect x="${430 + (i ? 10 : 0)}" y="${130 + i * 22}" width="130" height="18" rx="4" fill="${cl}"/><text x="${438 + (i ? 10 : 0)}" y="${143 + i * 22}" font-family="Inter" font-size="10.5" font-weight="700" fill="#fff">${t}</text>`; });
  return SV(600, 230, s, 'Un seau de pop-corn, un ballon, un globe terrestre, un petit vaisseau en pixel art et des blocs de programme'); };

/* les 6 compétences du cycle 4, illustrées par un geste */
const CP = {
  che: () => { const K = Sketch(601); return SV(200, 130, tint(28, 18, 112, 96, .6) + K.P(K.rect(28, 18, 112, 96)) + K.P(K.line(40, 40, 128, 40) + K.line(40, 60, 128, 60) + K.line(40, 80, 110, 80) + K.line(40, 100, 120, 100), { w: 1.4 }) + acc(104, 52, 40, 16, .5) + K.P(K.circ(128, 62, 24) + K.line(145, 79, 175, 112), { w: 3 }), 'Une loupe sur un tableau de données'); },
  mod: () => { const K = Sketch(602); return SV(200, 130, tint(16, 34, 66, 56, .9) + K.P(K.rect(16, 34, 66, 56)) + K.tx(49, 58, 'n mois', 13) + K.tx(49, 78, '7,99 €', 13) + K.P(K.line(88, 62, 116, 62), { w: 3 }) + K.P(K.poly([[110, 54], [120, 62], [110, 70]], false), { w: 3 }) + acc(122, 40, 66, 44, .85, 8) + K.tx(155, 68, '7,99 × n', 14, { c: '#fff' }), 'Une situation traduite par un calcul'); },
  rep: () => { const K = Sketch(603); let s = K.P(K.line(30, 112, 180, 112) + K.line(30, 112, 30, 16), { w: 2.2 }); [40, 70, 55, 92, 78].forEach((h, i) => { s += (i === 3 ? acc(42 + i * 27, 112 - h, 18, h, .85, 2) : tint(42 + i * 27, 112 - h, 18, h, .95, 2)) + K.P(K.rect(42 + i * 27, 112 - h, 18, h), { w: 1.4 }); }); return SV(200, 130, s, 'Un diagramme en barres'); },
  rai: () => { const K = Sketch(604); return SV(200, 130, tint(14, 14, 172, 28, .9, 6) + K.tx(100, 34, 'Je sais que…', 14) + tint(14, 52, 172, 28, .7, 6) + K.tx(100, 72, 'Or…', 14) + acc(14, 90, 172, 30, .85, 6) + K.tx(100, 111, 'Donc…', 15, { c: '#fff' }), 'Trois étapes d’un raisonnement'); },
  cal: () => { const K = Sketch(605); let s = K.P(K.rect(56, 10, 88, 112)) + tint(64, 18, 72, 24, .95) + K.tx(100, 36, '2 × 3 × 19', 12); for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) s += K.P(K.rect(66 + c * 24, 52 + r * 22, 18, 16), { w: 1.4 }); s += acc(66, 52, 18, 16, .6, 2); return SV(200, 130, s, 'Une calculatrice'); },
  com: () => { const K = Sketch(606); return SV(200, 130, tint(14, 14, 122, 54, .9, 14) + K.P(K.poly([[14, 14], [136, 14], [136, 68], [64, 68], [44, 88], [48, 68], [14, 68]], true)) + K.tx(75, 46, 'Donc l’offre B…', 12) + acc(76, 72, 110, 44, .85, 14) + K.tx(131, 99, 'coûte 12 € de moins', 11, { c: '#fff' }), 'Deux bulles : une explication et sa conclusion'); }
};
module.exports = { SC, CP };
