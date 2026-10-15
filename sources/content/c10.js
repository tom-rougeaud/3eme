/* Chapitre 10 · Espace, transformations et algorithmique — 3ème Série Pro (programme du cycle 4, BO n° 31 du 30 juillet 2020). */
'use strict';
const K = require('./kit3e');
const { H, FM, R, Q, BQ, PB, S, T, Rc, Ar, st, SN, Sketch } = K;
const { D, SV, tt, fill } = require('./sk3');

module.exports = function (chk) {
  const c = { id: 'c10', n: 10, col: 'ciel', icone: '👾', dom: 'Espace et géométrie · Algorithmique et programmation', titre: 'Espace, transformations et programmes', sous: 'Volumes, repérage sur la Terre, pixel art et Scratch' };
  c.parties = [{ t: 'Volumes', n: [1, 2] }, { t: 'Se repérer sur la sphère', n: [3] }, { t: 'Transformations et programmes', n: [4, 5] }];
  c.travail = { question: `Combien de pop-corn tient dans un ${H('seau de 20 cm de diamètre')} ? Quel volume d’air dans un ${H('ballon de taille 5')} ? Où est Tokyo par rapport à Paris ? Et comment programmer un logo ? Tu sauras répondre aux notions 1, 2, 3 et 5.` };
  c.objectifs = ['Je saurai calculer le volume d’un cylindre, d’un cône et d’une pyramide.', 'Je saurai calculer le volume d’une boule.', 'Je saurai me repérer sur la Terre avec la latitude et la longitude.', 'Je saurai reconnaître une translation, une symétrie, une rotation et une homothétie.', 'Je saurai écrire un programme Scratch avec une boucle.'];
  c.depart = 'c10';
  const PI = Math.PI, r0 = x => Math.round(x);
  chk(r0(PI * 100 * 25) === 7854 && Math.abs(69 / (2 * PI) - 10.98) < .01 && r0(4 / 3 * PI * (69 / (2 * PI)) ** 3) === 5547 && 360 / 6 === 60, 'c10 notions');

  /* ---------- illustrations « Je découvre » ---------- */
  const skSeau = () => { const k = Sketch(801); return SV(k.P('M52 26 L64 112 L136 112 L148 26', { fill: '#fff' }) + `<ellipse cx="100" cy="26" rx="48" ry="9" class="k2 ks" stroke-width="2"/>` + [60, 76, 92, 108, 124, 140].map((x, i) => `<circle cx="${x}" cy="${18 - (i % 2) * 6}" r="7" class="wh ks" stroke-width="1.4"/>`).join('') + k.P(k.line(76, 34, 80, 108) + k.line(100, 36, 100, 110) + k.line(124, 34, 120, 108), { w: 1.4, c: '#C2332A' }) + tt(100, 128, 'Ø 20 cm · h 25 cm', 11), 'Un seau de pop-corn'); };
  const skBallon = () => { const k = Sketch(802); return SV(fill(54, 14, 92, 92, .35, 'k2', 46) + k.P(k.circ(100, 60, 46)) + `<polygon points="100,44 115,55 109,72 91,72 85,55" class="k"/>` + k.P(k.line(100, 44, 100, 18) + k.line(115, 55, 140, 46) + k.line(85, 55, 60, 46) + k.line(109, 72, 124, 94) + k.line(91, 72, 76, 94), { w: 1.4 }) + tt(100, 126, 'tour : 68 à 70 cm', 11), 'Un ballon de football'); };
  const skGlobe = () => { const k = Sketch(803); return SV(fill(50, 10, 100, 100, .3, 'k2', 50) + k.P(k.circ(100, 60, 50)) + `<ellipse cx="100" cy="60" rx="50" ry="12" fill="none" class="ks" stroke-width="1.6"/><ellipse cx="100" cy="60" rx="14" ry="50" fill="none" class="ks" stroke-width="1.6"/><circle cx="104" cy="34" r="4" class="k"/><circle cx="138" cy="44" r="4" class="k"/>` + tt(100, 126, 'Paris, Tokyo', 11), 'Un globe avec l’équateur, un méridien et deux villes'); };
  const SPR = [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2], [1, 3], [0, 3]];
  const skSprite = () => SV(SPR.map(([x, y]) => `<rect x="${40 + x * 16}" y="${20 + y * 16}" width="16" height="16" class="k ks" stroke-width="1"/>`).join('') + SPR.map(([x, y]) => `<rect x="${140 - x * 16}" y="${20 + y * 16}" width="16" height="16" class="k2 ks" stroke-width="1"/>`).join('') + tt(100, 30, '↔', 18) + tt(100, 120, 'avancer, retourner, tourner', 11), 'Un petit vaisseau en pixel art et son reflet');
  const skLogo = () => { const k = Sketch(805); const p = Array.from({ length: 6 }, (_, i) => [100 + 40 * Math.cos(i * PI / 3), 58 + 40 * Math.sin(i * PI / 3)]); return SV(fill(60, 18, 80, 80, .3, 'k2', 40) + k.P(k.poly(p, true), { w: 3 }) + tt(100, 64, 'TOURNOI', 10) + tt(100, 120, 'un logo à 6 côtés', 11), 'Un logo hexagonal de tournoi'); };

  /* ---------- méthodes visuelles ---------- */
  // 1. le seau : un cylindre
  const vCyl = S(600, 230, st(1, SN(1, 22, 30) + `<path d="M70 44V190M230 44V190" class="ks" stroke-width="2.4"/><ellipse cx="150" cy="190" rx="80" ry="18" class="k2 ks" stroke-width="2"/><ellipse cx="150" cy="44" rx="80" ry="18" class="k2 ks" stroke-width="2"/><line x1="150" y1="44" x2="230" y2="44" stroke="#C2332A" stroke-width="2.4"/>` + T(190, 38, 'r = 10', { fs: 13, c: 'kt' }) + T(244, 120, 'h = 25 cm', { fs: 13, a: 'start' }) + T(150, 222, 'diamètre 20 cm', { fs: 12, c: 'ts' }))
    + st(2, SN(2, 330, 46) + T(348, 52, 'base : π × 10² ≈ 314,16 cm²', { fs: 14, a: 'start' }))
    + st(3, SN(3, 330, 100) + T(348, 106, 'V = π × 10² × 25', { fs: 14, a: 'start' }) + T(348, 128, '≈ 7 854 cm³', { fs: 15, a: 'start', c: 'kt' }))
    + st(4, SN(4, 330, 172) + Rc(346, 154, 230, 44, { c: 'k', rx: 10 }) + T(461, 182, '7 854 cm³ ≈ 7,9 L', { fs: 15, c: 'tw' })),
  'Le seau est un cylindre de rayon 10 cm et de hauteur 25 cm : environ 7 854 cm³, soit 7,9 litres');
  // 2. le ballon : une boule
  const vBou = S(600, 230, st(1, SN(1, 22, 30) + `<circle cx="150" cy="118" r="88" class="k2 ks" stroke-width="2.4" fill-opacity=".4"/><ellipse cx="150" cy="118" rx="88" ry="20" fill="none" stroke="#C2332A" stroke-width="2.4"/>` + T(150, 160, 'tour : 69 cm', { fs: 13, c: 'kt' }))
    + st(2, SN(2, 280, 46) + `<line x1="150" y1="118" x2="238" y2="118" class="ks" stroke-width="2.4" stroke-dasharray="6 4"/>` + T(194, 110, 'r', { fs: 15, c: 'kt' }) + T(298, 52, 'r = 69 ÷ (2π) ≈ 10,98 cm', { fs: 14, a: 'start' }))
    + st(3, SN(3, 280, 104) + T(298, 110, 'V = 4/3 × π × 10,98³', { fs: 14, a: 'start' }) + T(298, 132, '≈ 5 547 cm³', { fs: 15, a: 'start', c: 'kt' }))
    + st(4, SN(4, 280, 180) + Rc(296, 162, 260, 40, { c: 'k', rx: 10 }) + T(426, 188, '≈ 5,5 L d’air', { fs: 15, c: 'tw' })),
  'Le ballon est une boule : le tour donne le rayon, puis le volume, environ 5,5 litres');
  // 3. le planisphère : latitude et longitude
  const MX = lo => 30 + (lo + 180), MY = la => 30 + (90 - la);
  let grid = ''; for (let lo = -180; lo <= 180; lo += 30) grid += `<line x1="${MX(lo)}" y1="30" x2="${MX(lo)}" y2="210" stroke="#DCE2F2" stroke-width="1"/>`; for (let la = -90; la <= 90; la += 30) grid += `<line x1="30" y1="${MY(la)}" x2="390" y2="${MY(la)}" stroke="#DCE2F2" stroke-width="1"/>`;
  const vGeo = S(600, 230, grid + `<rect x="30" y="30" width="360" height="180" fill="none" class="ks" stroke-width="2"/>` + st(1, SN(1, 14, 18) + `<line x1="30" y1="${MY(0)}" x2="390" y2="${MY(0)}" stroke="#C2332A" stroke-width="2.6"/><line x1="${MX(0)}" y1="30" x2="${MX(0)}" y2="210" stroke="#1D5FC2" stroke-width="2.6"/>` + T(392, MY(0) - 4, 'équateur', { fs: 11, a: 'end', c: 'ts' }) + T(MX(0) + 4, 224, 'Greenwich', { fs: 11, a: 'start', c: 'ts' }))
    + st(2, `<circle cx="${MX(2.3)}" cy="${MY(48.9)}" r="6" class="k"/>` + T(MX(2.3) - 8, MY(48.9) - 8, 'Paris', { fs: 12, a: 'end' }) + SN(2, 410, 50) + T(428, 46, 'Paris : 48,9° N', { fs: 13, a: 'start' }) + T(428, 64, '2,3° E', { fs: 13, a: 'start' }))
    + st(3, `<circle cx="${MX(139.7)}" cy="${MY(35.7)}" r="6" class="k"/>` + T(MX(139.7), MY(35.7) - 10, 'Tokyo', { fs: 12 }) + SN(3, 410, 104) + T(428, 100, 'Tokyo : 35,7° N', { fs: 13, a: 'start' }) + T(428, 118, '139,7° E', { fs: 13, a: 'start' }))
    + st(4, SN(4, 410, 160) + T(428, 156, 'Tokyo : plus au sud', { fs: 13, a: 'start', c: 'kt' }) + T(428, 174, 'et 137,4° plus à l’est', { fs: 13, a: 'start', c: 'kt' })),
  'Un planisphère : l’équateur, le méridien de Greenwich, Paris et Tokyo repérés par leur latitude et leur longitude');
  chk(MX(139.7) < 390 && Math.abs(139.7 - 2.3 - 137.4) < 1e-9, 'c10 planisphère');
  // 4. les transformations du sprite
  const cs = 20, cell = (x, y, cls) => `<rect x="${20 + x * cs}" y="${12 + y * cs}" width="${cs}" height="${cs}" class="${cls} ks" stroke-width="1"/>`;
  let pg = ''; for (let i = 0; i < 28; i++) for (let j = 0; j < 10; j++) pg += `<rect x="${20 + i * cs}" y="${12 + j * cs}" width="${cs}" height="${cs}" fill="none" stroke="#E4E8F4" stroke-width="1"/>`;
  const P0 = SPR.map(([x, y]) => [x + 1, y + 1]), PA = P0.map(([x, y]) => [x + 4, y]), PB2 = PA.map(([x, y]) => [17 - x, y]);
  const bx0 = Math.min(...PB2.map(p => p[0])), PC = PB2.map(([x, y]) => [x - bx0, y - 1]).map(([u, v]) => [13 + (3 - v), 1 + u]);
  const cx0 = Math.min(...PC.map(p => p[0])), cy0 = Math.min(...PC.map(p => p[1])), PD = PC.flatMap(([x, y]) => { const u = 2 * (x - cx0) + 19, v = 2 * (y - cy0) + 1; return [[u, v], [u + 1, v], [u, v + 1], [u + 1, v + 1]]; });
  chk(Math.max(...PD.map(p => p[0])) <= 27 && Math.max(...PD.map(p => p[1])) <= 9 && Math.max(...PC.map(p => p[0])) < 19, 'c10 sprite dans la grille');
  const cap = (x, s) => T(20 + x * cs, 12 + 9.7 * cs, s, { fs: 11, c: 'ts' });
  const vTrans = S(600, 222, pg + P0.map(([x, y]) => cell(x, y, 'k')).join('') + cap(2.5, 'départ')
    + st(1, SN(1, 20 + 7 * cs, 12 + 6.2 * cs) + PA.map(([x, y]) => cell(x, y, 'k2')).join('') + cap(6.5, 'translation'))
    + st(2, `<line x1="${20 + 9 * cs}" y1="12" x2="${20 + 9 * cs}" y2="${12 + 7 * cs}" stroke="#C2332A" stroke-width="2.4" stroke-dasharray="6 4"/>` + SN(2, 20 + 11 * cs, 12 + 6.2 * cs) + PB2.map(([x, y]) => cell(x, y, 'k2')).join('') + cap(11, 'symétrie'))
    + st(3, SN(3, 20 + 15 * cs, 12 + 6.2 * cs) + PC.map(([x, y]) => cell(x, y, 'k2')).join('') + cap(15, 'rotation'))
    + st(4, SN(4, 20 + 23 * cs, 12 + 8.6 * cs) + PD.map(([x, y]) => cell(x, y, 'k')).join('') + cap(23, 'homothétie × 2')),
  'Un sprite en pixel art : il glisse (translation), se retourne (symétrie), tourne (rotation) et s’agrandit (homothétie)');
  // 5. Scratch : l’hexagone
  const hx = Array.from({ length: 7 }, (_, i) => [210 + 70 * Math.cos(-PI / 2 + i * PI / 3 + PI / 6), 116 + 70 * Math.sin(-PI / 2 + i * PI / 3 + PI / 6)]);
  const prog5 = [{ c: 'evt', t: 'quand ⚑ est cliqué' }, { c: 'pen', t: 'stylo en position d’écriture' }, { c: 'ctl', t: 'répéter 6 fois', open: 2 }, { c: 'mot', t: 'avancer de 50 pas', d: 1 }, { c: 'mot', t: 'tourner de 60 degrés', d: 1 }, { c: 'ctl', t: '', end: true }];
  const vHex = `<div class="vhex">${K.scratchSvg(prog5, 'Programme de l’hexagone')}${S(420, 230, st(1, SN(1, 40, 30) + `<path d="${hx.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('')}" fill="none" class="ks" stroke-width="3"/>` + T(210, 122, '6 côtés', { fs: 13, c: 'ts' }))
    + st(2, SN(2, 330, 46) + T(320, 72, '360 ÷ 6', { fs: 13, a: 'start' }) + T(320, 90, '= 60°', { fs: 14, a: 'start', c: 'kt' }))
    + st(3, SN(3, 330, 126) + T(320, 152, 'répéter', { fs: 13, a: 'start' }) + T(320, 170, '6 fois', { fs: 14, a: 'start', c: 'kt' }))
    + st(4, SN(4, 40, 206) + T(58, 212, 'côté : 50 pas, à modifier', { fs: 13, a: 'start' })), 'Un hexagone tracé en six côtés')}</div>`;

  c.notions = [
    { titre: 'Volume d’un cylindre, d’un cône, d’une pyramide', decouvre: { txt: `Un seau de pop-corn (fictif) est un cylindre de ${H('20 cm de diamètre')} et de ${H('25 cm de haut')}. Quel volume de pop-corn peut-il contenir, en litres ?`, img: skSeau() },
      methode: ['Je repère le solide, un cylindre, et je calcule son rayon : 20 ÷ 2 = 10 cm.', 'Je calcule l’aire de la base, un disque : π × 10² ≈ 314,16 cm².', 'Volume = aire de la base × hauteur : π × 10² × 25 ≈ 7 854 cm³.', 'Je convertis : 1 L = 1 000 cm³, donc environ 7,9 L.'],
      vois: vCyl,
      solution: `<p>${FM(R`V=\pi\times10^2\times25\approx7\,854\text{ cm}^3`)}, soit environ <b>7,9 L</b> de pop-corn.</p><p>Un cornet conique de même base et même hauteur contiendrait 3 fois moins : environ 2,6 L.</p>`,
      retiens: `<p>Pavé droit : ${FM(R`L\times\ell\times h`)}. Cylindre : ${FM(R`\pi\times r^2\times h`)}.</p><p>Cône et pyramide : ${FM(R`\dfrac{\text{aire de la base}\times h}{3}`)}. 1 L = 1 dm³ = 1 000 cm³.</p>`,
      attention: 'On utilise le rayon, pas le diamètre : r = 20 ÷ 2 = 10 cm.',
      amoi: [['Volume d’un pavé de 10 × 5 × 4 cm ?', '200 cm³'], ['Cône de base 30 cm² et de hauteur 10 cm ?', '30 × 10 ÷ 3 = 100 cm³']] },
    { titre: 'Volume d’une boule', decouvre: { txt: `Un ballon de football de ${H('taille 5')} a un tour (circonférence) compris entre ${H('68 et 70 cm')}. Avec un tour de 69 cm, quel volume d’air contient-il ?`, img: skBallon() },
      methode: ['Le tour est le périmètre d’un grand cercle : 69 = 2 × π × r.', 'Je calcule le rayon : r = 69 ÷ (2π) ≈ 10,98 cm.', 'Volume d’une boule : 4/3 × π × r³ ≈ 5 547 cm³.', 'Je convertis en litres : environ 5,5 L.'],
      vois: vBou,
      solution: `<p>${FM(R`V=\dfrac43\times\pi\times10{,}98^3\approx5\,547\text{ cm}^3`)} : le ballon contient environ <b>5,5 L</b> d’air.</p><p class="srcl">Taille 5 : circonférence entre 68 et 70 cm (Lois du jeu de l’IFAB, loi 2, consultées en octobre 2026).</p>`,
      retiens: `<p><b>Boule</b> de rayon r : ${FM(R`V=\dfrac43\times\pi\times r^3`)}. Aire de la <b>sphère</b> (sa surface) : ${FM(R`4\times\pi\times r^2`)}.</p><p>Périmètre d’un grand cercle : 2 × π × r.</p>`,
      attention: 'La sphère est la surface (le cuir), la boule est le solide (l’intérieur).',
      amoi: [['Volume d’une boule de rayon 3 cm, à l’unité ?', '≈ 113 cm³'], ['Rayon d’un cercle de 62,8 cm de tour ?', '≈ 10 cm']] },
    { titre: 'Se repérer sur la Terre', decouvre: { txt: `Paris a pour coordonnées ${H('48,9° N ; 2,3° E')} et Tokyo ${H('35,7° N ; 139,7° E')}. Laquelle des deux villes est la plus au nord ? De combien de degrés de longitude sont-elles écartées ?`, img: skGlobe() },
      methode: ['Je repère les deux lignes de référence : l’équateur (latitude 0°) et le méridien de Greenwich (longitude 0°).', 'Paris : 48,9° au nord de l’équateur et 2,3° à l’est de Greenwich.', 'Tokyo : 35,7° au nord et 139,7° à l’est.', 'Je compare : 35,7 < 48,9, Tokyo est plus au sud ; écart de longitude : 139,7 − 2,3 = 137,4°.'],
      vois: vGeo,
      solution: '<p><b>Paris est plus au nord</b> que Tokyo (48,9° contre 35,7°).</p><p>Les deux villes sont à l’est de Greenwich ; Tokyo est <b>137,4°</b> plus à l’est.</p>',
      retiens: '<p>Sur la sphère terrestre, un point est repéré par sa <b>latitude</b> (de 0° à 90°, Nord ou Sud de l’équateur) et sa <b>longitude</b> (de 0° à 180°, Est ou Ouest du méridien de Greenwich).</p>',
      attention: 'On écrit toujours la latitude en premier. Pour deux villes de part et d’autre de Greenwich, on additionne les longitudes.',
      amoi: [['New York : 40,7° N ; 74° O. Est ou ouest de Greenwich ?', 'à l’ouest'], ['Écart de longitude entre Paris (2,3° E) et New York (74° O) ?', '76,3°']] },
    { titre: 'Les transformations', decouvre: { txt: `Dans un jeu en ${H('pixel art')} (fictif), on fait avancer un petit vaisseau, puis on le retourne, on le fait tourner et enfin on l’agrandit. Quelle transformation utilise-t-on à chaque fois ?`, img: skSprite() },
      methode: ['Le vaisseau glisse de 4 cases vers la droite, sans tourner : c’est une translation.', 'Il se retourne comme dans un miroir, par rapport à un axe : c’est une symétrie axiale.', 'Il tourne d’un quart de tour autour d’un point : c’est une rotation de 90°.', 'Il est agrandi deux fois : c’est une homothétie de rapport 2.'],
      vois: vTrans,
      solution: '<p>Translation, symétrie axiale, rotation : le vaisseau garde la <b>même taille</b> et la même forme.</p><p>L’homothétie de rapport 2 <b>double les longueurs</b> : l’aire est multipliée par 4 (4 cases pour 1).</p>',
      retiens: '<p><b>Translation</b> : glisser. <b>Symétrie axiale</b> : retourner autour d’un axe. <b>Rotation</b> : tourner autour d’un point. Elles conservent les longueurs, les angles et les aires.</p><p><b>Homothétie</b> de rapport k : agrandir (k > 1) ou réduire (0 < k < 1) ; longueurs × k.</p>',
      attention: 'Une symétrie retourne la figure ; une rotation la fait seulement tourner.',
      amoi: [['Une translation change-t-elle la taille ?', 'non'], ['Homothétie de rapport 3 : un côté de 2 cm devient ?', '6 cm']] },
    { titre: 'Programmer une boucle avec Scratch', decouvre: { txt: `On veut que le lutin de Scratch dessine le ${H('logo à 6 côtés')} (fictif) d’un tournoi, avec des côtés de 50 pas. Quel programme écrire ?`, img: skLogo() },
      methode: ['Je reconnais la figure : un hexagone régulier, 6 côtés égaux.', 'À chaque coin, le lutin tourne de 360 ÷ 6 = 60°.', 'Je répète 6 fois le même couple d’instructions : avancer de 50, tourner de 60°.', 'Pour changer la taille, je change seulement le nombre de pas.'],
      vois: vHex,
      solution: '<p>Le programme « répéter 6 fois : avancer de 50, tourner de 60° » trace l’hexagone. Son périmètre est 6 × 50 = 300 pas.</p>',
      retiens: '<p>Une <b>boucle</b> « répéter n fois » évite d’écrire n fois les mêmes blocs.</p><p>Pour un polygone régulier à n côtés, le lutin tourne de 360 ÷ n degrés à chaque coin.</p>',
      attention: 'L’angle de rotation n’est pas l’angle intérieur du polygone : pour l’hexagone, on tourne de 60°, alors que l’angle intérieur mesure 120°.',
      amoi: [['Pour un triangle équilatéral, de combien tourner ?', '120°'], ['Pour un octogone régulier ?', '360 ÷ 8 = 45°']] }];
  chk(10 * 5 * 4 === 200 && 30 * 10 / 3 === 100 && r0(4 / 3 * PI * 27) === 113 && Math.round(62.8 / (2 * PI)) === 10 && Math.abs(74 + 2.3 - 76.3) < 1e-9 && 360 / 8 === 45, 'c10 « À moi »');

  c.mots = [['cylindre', 'solide à deux bases en disques ; V = π × r² × h', 'un seau'], ['cône', 'solide à base en disque et un sommet ; V = π × r² × h ÷ 3', 'un cornet'], ['boule, sphère', 'boule : le solide, V = 4/3 × π × r³ ; sphère : sa surface', 'un ballon'], ['latitude, longitude', 'angles qui repèrent un point de la Terre', 'Tokyo : 35,7° N ; 139,7° E'], ['translation, symétrie, rotation', 'glisser, retourner, tourner : même taille', 'un sprite qui avance'], ['homothétie', 'agrandir ou réduire avec un rapport k', 'un sprite × 2'], ['boucle', 'bloc qui répète des instructions', 'répéter 6 fois']];

  c.scratch = [{ titre: 'le logo du tournoi', lc: 5, texte: 'Voici le programme qui trace un polygone. Lis-le, puis réponds.',
    prog: prog5,
    qs: [['Quelle figure le lutin dessine-t-il ?', 'un hexagone régulier', '6 côtés égaux de 50 pas et 6 rotations de 60° : 6 × 60 = 360°, le lutin revient au départ.'], ['Quel est son périmètre, en pas ?', '300 pas', '6 × 50 = 300 pas.'], ['Que faut-il modifier pour un carré ?', 'répéter 4 fois, tourner de 90°', '360 ÷ 4 = 90 : on répète 4 fois « avancer de 50, tourner de 90 ».']] }];

  c.resolus = [
    { titre: 'Volume d’un cône', outil: '🧮 calculatrice', enonce: `Un cornet de glace est un cône de rayon ${H('3 cm')} et de hauteur ${H('12 cm')}. Calcule son volume, au cm³.`,
      rows: [['Aire de la base : π × 3² ≈ 28,27 cm²', 'La base est un disque de rayon 3 cm.'], ['V = π × 3² × 12 ÷ 3', 'Cône : aire de la base × hauteur ÷ 3.'], ['V = π × 36 ≈ 113,1 cm³', 'Je simplifie : 9 × 12 ÷ 3 = 36.'], ['V ≈ 113 cm³', 'J’arrondis au cm³.']], verif: 'cylindre de mêmes dimensions : π × 9 × 12 ≈ 339 cm³, et 339 ÷ 3 = 113 ✓', rep: 'Le cornet a un volume d’environ 113 cm³.', go: ['e1'] },
    { titre: 'À toi : volume d’une pyramide', outil: '🧮 calculatrice', enonce: `Une lampe (fictive) en forme de pyramide a une base carrée de ${H('12 cm')} de côté et une hauteur de ${H('20 cm')}. Calcule son volume.`, trous: [0, 1, 2, 3],
      rows: [['Aire de la base : 12 × 12 = ⟦144⟧ cm²', 'La base est un carré.'], ['V = 144 × 20 ÷ ⟦3⟧', 'Pyramide : aire de la base × hauteur ÷ 3.'], ['V = 2 880 ÷ 3 = ⟦960⟧ cm³', 'Je calcule.'], ['V = ⟦0,96⟧ L', '1 L = 1 000 cm³.']], verif: 'pavé de mêmes dimensions : 2 880 cm³, et 2 880 ÷ 3 = 960 ✓', rep: 'La lampe a un volume de 960 cm³.', go: ['e1'] }];
  chk(r0(PI * 36) === 113 && 144 * 20 / 3 === 960, 'c10 résolus');
  c.entraine = [{ id: 'e1', gen: 'c10e1', lc: 1 }, { id: 'e2', gen: 'c10e2', lc: 3 }, { id: 'e3', gen: 'c10e3', lc: 4 }];

  /* ---------- je résous ---------- */
  chk(Math.round(69 / (2 * PI) * 100) / 100 === 10.98 && r0(4 * PI * (69 / (2 * PI)) ** 2) === 1515 && r0(4 / 3 * PI * (70 / (2 * PI)) ** 3) === 5792 && r0(4 / 3 * PI * (68 / (2 * PI)) ** 3) === 5310, 'c10 problème 1');
  chk(r0(PI * 81 * 20) === 5089 && r0(PI * 81 * 20 / 3) === 1696 && Math.round(8 / 5.089 * 100) / 100 === 1.57 && Math.round(3 / 1.696 * 100) / 100 === 1.77, 'c10 problème 2');
  chk(4 * 40 === 160 && 40 * 3 === 120 && 1600 * 9 === 14400 && -100 + 150 === 50, 'c10 problème 3');
  c.probs = [
    PB({ id: 'p1', etape: 2, lc: 2, comps: ['che', 'cal'], titre: 'Le ballon de taille 5',
      intro: `<p>Un ballon de football de taille 5 a une circonférence comprise entre ${H('68 cm')} et ${H('70 cm')}.</p><p class="srcl">Lois du jeu de l’IFAB, loi 2 (consultées en octobre 2026).</p>`,
      qs: [Q('a.', 'Pour une circonférence de 69 cm, calcule le rayon, au centième.', '69 ÷ (2π) ≈ 10,98 cm', 10.98, { w: 24, tol: .006, lab: 'en cm :' }), Q('b.', 'Calcule l’aire de cuir (aire de la sphère), au cm².', '4 × π × 10,98² ≈ 1 515 cm²', 1515, { w: 24, tol: 2, lab: 'en cm² :' }), Q('c.', 'Calcule le volume d’un ballon de 70 cm de tour, au cm³.', 'r ≈ 11,14 ; 4/3 × π × r³ ≈ 5 792 cm³', 5792, { w: 24, tol: 3, lab: 'en cm³ :' }), Q('d.', 'Le volume d’un ballon de 68 cm de tour est d’environ 5 310 cm³. Quelle différence de volume entre le plus grand et le plus petit ballon autorisé ?', '5 792 − 5 310 = 482 cm³, soit environ 0,5 L', 482, { w: 24, tol: 4, lab: 'en cm³ :' })],
      err: { 0: [{ v: 69 / PI, m: 'C’est le diamètre : le rayon est la moitié, 69 ÷ (2π).' }], 2: [{ v: r0(4 / 3 * PI * 70 ** 3), m: 'Il faut d’abord le rayon : 70 ÷ (2π).' }] },
      hints: ['Circonférence = 2 × π × r.', 'Aire d’une sphère : 4 × π × r².', 'Volume d’une boule : 4/3 × π × r³.'], pouce: 'r = 69 ÷ (2π) ; aire 4πr² ; pour 70 cm : r = 70 ÷ (2π) ≈ 11,14.', corr: 'a. 10,98 cm. b. 1 515 cm². c. 5 792 cm³. d. 482 cm³.' }),
    PB({ id: 'p2', etape: 3, lc: 1, defi: 4, bulle: 'Ce cas se fait en 4 étapes. Le cornet et le seau ont la même base et la même hauteur : compare d’abord leurs volumes.', autravail: { comp: 'cal', txt: 'calculer le volume de matière d’une pièce avant de lancer une impression 3D ou un usinage.' }, comps: ['che', 'mod', 'cal', 'com'], titre: 'Seau ou cornet ?',
      intro: `<p>Au cinéma (fictif), le pop-corn est vendu en seau cylindrique à ${H('8 €')} ou en cornet conique à ${H('3 €')}. Les deux ont un rayon de ${H('9 cm')} et une hauteur de ${H('20 cm')}.</p>`,
      qs: [Q('a.', 'Calcule le volume du seau, au cm³.', 'π × 9² × 20 ≈ 5 089 cm³', 5089, { w: 24, tol: 1, lab: 'en cm³ :' }), Q('b.', 'Calcule le volume du cornet, au cm³.', '5 089 ÷ 3 ≈ 1 696 cm³', 1696, { w: 24, tol: 1, lab: 'en cm³ :' }), Q('c.', 'Combien de cornets faut-il pour remplir un seau ?', '3 cornets', 3, { w: 20 }), Q('d.', 'Calcule le prix d’un litre de pop-corn pour chaque formule, au centime.', 'seau : 8 ÷ 5,089 ≈ 1,57 €/L ; cornet : 3 ÷ 1,696 ≈ 1,77 €/L', null, { lines: 1 }), Q('e.', 'Quelle formule est la plus avantageuse ? Rédige ta réponse.', 'Le seau : 1,57 € le litre contre 1,77 € pour le cornet.', null, { lines: 1 })],
      err: { 1: [{ v: 5089, m: 'Le cône contient le tiers du cylindre de même base et même hauteur.' }] },
      hints: ['Cylindre : π × r² × h.', 'Cône : le tiers du cylindre.', 'Prix d’un litre = prix ÷ volume en litres.'], pouce: 'Seau ≈ 5 089 cm³ = 5,089 L ; cornet ≈ 1,696 L ; prix au litre : 8 ÷ 5,089 et 3 ÷ 1,696.', corr: 'a. 5 089 cm³. b. 1 696 cm³. c. 3. d. 1,57 €/L et 1,77 €/L. e. le seau.' }),
    PB({ id: 'p3', etape: 4, lc: 5, cls: 'bac', defi: 5, bulle: 'Voici une question « vers le brevet » : 5 étapes. Lis le programme ligne par ligne, et suis le lutin avec ton doigt.', autravail: { comp: 'mod', txt: 'écrire le programme d’une machine à commande numérique : des déplacements répétés, avec des boucles.' }, comps: ['che', 'mod', 'cal', 'com'], titre: 'Le vaisseau du jeu',
      intro: `<p>Dans un jeu (fictif) programmé avec Scratch, le lutin dessine le bouclier d’un vaisseau avec ce programme :</p><div class="scr-w">${K.scratchSvg([{ c: 'evt', t: 'quand ⚑ est cliqué' }, { c: 'pen', t: 'stylo en position d’écriture' }, { c: 'ctl', t: 'répéter 4 fois', open: 2 }, { c: 'mot', t: 'avancer de 40 pas', d: 1 }, { c: 'mot', t: 'tourner de 90 degrés', d: 1 }, { c: 'ctl', t: '', end: true }], 'Programme du bouclier')}</div>`,
      qs: [BQ('1', 'Quelle figure le lutin dessine-t-il ? Justifier.', 'che', 'Un carré de côté 40 : 4 côtés égaux et 4 angles de 90°.', null, { lines: 1 }), BQ('2', 'Calculer le périmètre et l’aire de cette figure.', 'cal', 'Périmètre : 4 × 40 = 160 pas ; aire : 40 × 40 = 1 600 pas².', null, { lines: 1 }), BQ('3', 'Modifier le programme pour dessiner un hexagone régulier de même côté.', 'mod', 'répéter 6 fois : avancer de 40 pas, tourner de 60 degrés.', null, { lines: 1 }), BQ('4', 'Le jeu agrandit le bouclier carré par une homothétie de rapport 3. Calculer la nouvelle longueur du côté et la nouvelle aire.', 'cal', 'Côté : 40 × 3 = 120 pas ; aire : 1 600 × 3² = 14 400 pas².', null, { lines: 1 }), BQ('5', 'Le vaisseau est en (−100 ; 50). Il subit une translation de 150 pas vers la droite. Donner ses nouvelles coordonnées et expliquer.', 'com', '(50 ; 50) : l’abscisse augmente de 150, l’ordonnée ne change pas.', null, { lines: 2 })],
      err: {},
      hints: ['Compte les répétitions et l’angle : 4 fois 90°.', 'Pour un polygone à n côtés : 360 ÷ n.', 'Homothétie de rapport 3 : longueurs × 3, aires × 9.'], pouce: 'Carré de côté 40 ; hexagone : 6 fois, 60° ; rapport 3 : côté 120, aire × 9 ; translation : x + 150.', corr: '1. carré. 2. 160 et 1 600. 3. 6 fois, 60°. 4. 120 et 14 400. 5. (50 ; 50).' })];

  c.bilan = [['Je sais calculer le volume d’un cylindre, d’un cône, d’une pyramide.', ['e1', 'p2']], ['Je sais calculer le volume d’une boule.', ['e1', 'p1']], ['Je sais me repérer sur la Terre.', ['e2']], ['Je sais reconnaître une transformation.', ['e3', 'p3']], ['Je sais programmer une boucle.', ['p3']]];
  c.words = require('./gl3')('c10');
  return c;
};
