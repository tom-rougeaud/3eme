/* Chapitre 9 · Échelles, agrandissements, réductions et théorème de Thalès — 3ème Série Pro (cycle 4, BO n° 31 du 30 juillet 2020). */
'use strict';
const K = require('./kit3e');
const { H, FM, R, Q, BQ, PB, S, T, Rc, Ar, st, SN, Sketch } = K;
const { D, SV, tt, fill } = require('./sk3');

module.exports = function (chk) {
  const c = { id: 'c9', n: 9, col: 'mesure', icone: '🤖', dom: 'Grandeurs et mesures · Espace et géométrie', titre: 'Échelles, agrandissements et Thalès', sous: 'Plans, maquettes, figurines et projecteurs' };
  c.parties = [{ t: 'Échelles, agrandissements et réductions', n: [1, 2, 3] }, { t: 'Le théorème de Thalès', n: [4] }];
  c.travail = { question: `Une maquette au ${H('1/144')} de la statue géante de ${H('19,7 m')} : quelle taille ? Une figurine au 1/6 demande combien de fois moins de peinture ? Et quelle image donne un projecteur reculé de 4 m à 10 m ? Tu sauras répondre aux notions 2, 3 et 4.` };
  c.objectifs = ['Je saurai utiliser l’échelle d’un plan.', 'Je saurai calculer les longueurs d’un agrandissement ou d’une réduction.', 'Je saurai calculer les aires et les volumes avec k² et k³.', 'Je saurai utiliser le théorème de Thalès pour calculer une longueur.'];
  c.depart = 'c9';
  chk(7 * 200 === 1400 && 12 * 200 === 2400 && Math.round(1970 / 144 * 10) / 10 === 13.7 && 6 ** 2 === 36 && 6 ** 3 === 216 && 1.5 * 10 / 4 === 3.75, 'c9 notions');

  /* ---------- illustrations « Je découvre » ---------- */
  const skPlan = () => { const k = Sketch(791); let s = fill(20, 20, 160, 90, .3, 'k2', 2) + k.P(k.rect(20, 20, 160, 90)) + k.P(k.line(55, 26, 145, 26), { w: 5 }); for (let r = 0; r < 4; r++) for (let q = 0; q < 8; q++) s += `<rect x="${40 + q * 16}" y="${48 + r * 14}" width="11" height="9" rx="2" class="k2"/>`; return SV(s + tt(100, 126, 'plan au 1/200', 12), 'Le plan d’une salle de cinéma avec son écran et ses rangées'); };
  const skMaquette = () => { const k = Sketch(792); return SV(fill(40, 10, 40, 104, .5, 'k2', 3) + k.P(k.rect(40, 10, 40, 104)) + tt(60, 64, '19,7 m', 11) + k.P(k.line(10, 114, 190, 114), { w: 2 }) + fill(140, 98, 10, 16, .9, 'k', 2) + k.P(k.rect(140, 98, 10, 16), { w: 1.4 }) + tt(146, 88, '?', 14) + tt(100, 128, 'maquette au 1/144', 11), 'Une grande statue et sa petite maquette'); };
  const skFigurine = () => { const k = Sketch(793); return SV(fill(30, 14, 46, 100, .45, 'k2', 20) + k.P(k.rect(30, 14, 46, 100)) + tt(53, 70, '1,80 m', 11) + fill(130, 84, 16, 30, .9, 'k', 6) + k.P(k.rect(130, 84, 16, 30), { w: 1.4 }) + tt(160, 104, '30 cm', 11, { a: 'start' }) + k.P(k.line(10, 114, 190, 114), { w: 2 }) + tt(100, 128, 'figurine au 1/6', 11), 'Une silhouette de 1,80 m et une figurine de 30 cm'); };
  const skProj = () => { const k = Sketch(794); return SV(fill(14, 54, 30, 22, .9, 'k', 4) + k.P(k.rect(14, 54, 30, 22)) + k.P(k.line(44, 65, 120, 40) + k.line(44, 65, 120, 90) + k.line(44, 65, 186, 14) + k.line(44, 65, 186, 116), { w: 1.4, op: .7 }) + k.P(k.line(120, 40, 120, 90), { w: 3 }) + k.P(k.line(186, 14, 186, 116), { w: 3 }) + tt(120, 112, '4 m', 10) + tt(166, 128, '10 m', 10), 'Un projecteur et deux images, à 4 m et à 10 m'); };

  /* ---------- méthodes visuelles ---------- */
  // 1. le plan au 1/200
  const vPlan = S(600, 230, st(1, SN(1, 40, 22) + Rc(60, 30, 240, 160, { c: 'k2', rx: 2, op: .35 }) + `<line x1="110" y1="36" x2="250" y2="36" class="ks" stroke-width="6"/>` + T(180, 58, '7 cm', { fs: 13, c: 'kt' }) + T(180, 210, '12 cm', { fs: 13 }) + T(180, 124, 'plan au 1/200', { fs: 13, c: 'ts' }))
    + st(2, SN(2, 330, 40) + T(348, 46, '1 cm sur le plan = 200 cm en vrai', { fs: 13, a: 'start' }))
    + st(3, SN(3, 330, 92) + T(348, 98, 'écran : 7 × 200 = 1 400 cm', { fs: 14, a: 'start' }) + T(348, 118, '= 14 m', { fs: 15, a: 'start', c: 'kt' }))
    + st(4, SN(4, 330, 156) + T(348, 162, 'salle : 12 × 200 = 2 400 cm', { fs: 14, a: 'start' }) + T(348, 182, '= 24 m', { fs: 15, a: 'start', c: 'kt' })),
  'Plan au 1/200 : 7 cm représentent 14 m, 12 cm représentent 24 m');
  // 2. la maquette au 1/144
  const vMaq = S(600, 230, st(1, SN(1, 40, 24) + Rc(60, 22, 56, 190, { c: 'k2', rx: 4 }) + T(88, 120, '19,7 m', { fs: 13, r: -90 }) + Rc(170, 194, 14, 18, { c: 'k', rx: 2 }) + T(177, 186, '?', { fs: 14, c: 'kt' }) + `<line x1="40" y1="212" x2="230" y2="212" class="ks" stroke-width="2"/>` + T(140, 226, 'dessin sans échelle', { fs: 10, c: 'ts' }) + T(262, 46, 'échelle 1/144 : les longueurs sont divisées par 144', { fs: 13, a: 'start' }))
    + st(2, SN(2, 244, 90) + T(262, 96, 'même unité : 19,7 m = 1 970 cm', { fs: 14, a: 'start' }))
    + st(3, SN(3, 244, 140) + T(262, 146, '1 970 ÷ 144 ≈ 13,7 cm', { fs: 16, a: 'start', c: 'kt' }))
    + st(4, SN(4, 244, 190) + T(262, 196, 'les angles et la forme ne changent pas', { fs: 13, a: 'start' })),
  'La statue de 19,7 m et sa maquette au 1/144 : 1 970 cm divisés par 144, environ 13,7 cm');
  // 3. k² et k³
  let sq = ''; for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) sq += `<rect x="${40 + j * 18}" y="${70 + i * 18}" width="18" height="18" class="${i === 0 && j === 0 ? 'k' : 'wh'} ks" stroke-width="1"/>`;
  const cb = (() => { const x0 = 250, y0 = 100, a = 18, dx = 9, dy = 7; let s = ''; for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) s += `<rect x="${x0 + j * a}" y="${y0 + i * a}" width="${a}" height="${a}" class="k2 ks" stroke-width="1"/>`;
    for (let i = 0; i <= 6; i++) s += `<path d="M${x0 + i * a} ${y0}l${6 * dx} ${-6 * dy}" class="ks" stroke-width="1"/><path d="M${x0 + i * dx} ${y0 - i * dy}h${6 * a}" class="ks" stroke-width="1"/><path d="M${x0 + 6 * a} ${y0 + i * a}l${6 * dx} ${-6 * dy}" class="ks" stroke-width="1"/><path d="M${x0 + 6 * a + i * dx} ${y0 - i * dy}v${6 * a}" class="ks" stroke-width="1"/>`;
    return s; })();
  const vK = S(600, 230, st(1, SN(1, 22, 26) + T(40, 32, 'k = 1/6 : 180 cm → 30 cm (longueurs ÷ 6)', { fs: 14, a: 'start' }))
    + st(2, sq + SN(2, 22, 64) + T(94, 200, 'aire ÷ 6² = ÷ 36', { fs: 13, c: 'kt' }))
    + st(3, cb + SN(3, 236, 64) + T(330, 222, 'volume ÷ 6³ = ÷ 216', { fs: 13, c: 'kt' }))
    + st(4, SN(4, 444, 110) + T(462, 104, 'peinture :', { fs: 13, a: 'start' }) + T(462, 122, '36 fois moins', { fs: 13, a: 'start', c: 'kt' }) + T(462, 152, 'résine :', { fs: 13, a: 'start' }) + T(462, 170, '216 fois moins', { fs: 13, a: 'start', c: 'kt' })),
  'Un carré de 6 sur 6 contient 36 petits carrés ; un cube de 6 sur 6 sur 6 contient 216 petits cubes');
  chk(250 + 6 * 18 + 6 * 9 <= 440, 'c9 cube dans le cadre');
  // 4. le projecteur : Thalès
  const px = 40, py = 120, sc = 50, near = px + 4 * sc, far = px + 10 * sc, hn = .75 * sc, hf = 1.875 * sc;
  const vTh = S(600, 230, st(1, SN(1, 26, 104) + Rc(px - 30, py - 12, 30, 24, { c: 'k', rx: 4 }) + `<line x1="${px}" y1="${py}" x2="${far}" y2="${py - hf}" class="ks" stroke-width="1.6"/><line x1="${px}" y1="${py}" x2="${far}" y2="${py + hf}" class="ks" stroke-width="1.6"/><line x1="${px}" y1="${py}" x2="${far}" y2="${py}" class="ks" stroke-width="1.2" stroke-dasharray="5 4"/><line x1="${near}" y1="${py - hn}" x2="${near}" y2="${py + hn}" stroke="#1D5FC2" stroke-width="4"/><line x1="${far}" y1="${py - hf}" x2="${far}" y2="${py + hf}" stroke="#C2332A" stroke-width="4"/>` + T((px + near) / 2, py - 6, '4 m', { fs: 12 }) + T((near + far) / 2, py - 6, '10 m depuis le projecteur', { fs: 12 }) + T(near + 8, py - hn + 12, '1,5 m', { fs: 13, a: 'start', c: 'kt' }) + T(far - 8, py - hf + 14, 'L ?', { fs: 14, a: 'end', c: 'kt' }))
    + st(2, SN(2, 70, 30) + T(88, 36, 'les deux images sont parallèles', { fs: 13, a: 'start' }))
    + st(3, SN(3, 70, 182) + T(88, 188, '4/10 = 1,5/L', { fs: 14, a: 'start' }))
    + st(4, SN(4, 70, 212) + T(88, 218, 'L = 1,5 × 10 ÷ 4 = 3,75 m', { fs: 14, a: 'start', c: 'kt' })),
  'Un projecteur ; à 4 m l’image mesure 1,5 m ; à 10 m elle mesure 3,75 m');
  chk(py - hf >= 20 && py + hf <= 220, 'c9 figure du projecteur');

  c.notions = [
    { titre: 'Utiliser une échelle', decouvre: { txt: `Sur le plan (fictif) d’une salle de cinéma, à l’échelle ${H('1/200')}, l’écran mesure ${H('7 cm')} et la salle ${H('12 cm')} de long. Quelles sont les vraies dimensions ?`, img: skPlan() },
      methode: ['Je lis le plan : l’écran fait 7 cm, la salle 12 cm de long.', 'J’interprète l’échelle 1/200 : 1 cm sur le plan représente 200 cm en vrai.', 'Je multiplie par 200, puis je convertis : 7 × 200 = 1 400 cm = 14 m.', 'Même calcul pour la salle : 12 × 200 = 2 400 cm = 24 m.'],
      vois: vPlan,
      solution: '<p>L’écran mesure <b>14 m</b> de large et la salle <b>24 m</b> de long.</p><p>Les longueurs réelles sont proportionnelles aux longueurs du plan, de coefficient 200.</p>',
      retiens: `<p>${FM(R`\text{échelle}=\dfrac{\text{longueur sur le plan}}{\text{longueur réelle}}`)}, les deux longueurs dans la même unité.</p><p>Une échelle 1/200 veut dire : 1 cm sur le plan représente 200 cm en vrai.</p>`,
      attention: 'On met les deux longueurs dans la même unité avant de calculer une échelle.',
      amoi: [['Échelle 1/50 : 3 cm sur le plan. En vrai ?', '150 cm = 1,5 m'], ['5 m réels mesurent 2 cm sur le plan. Échelle ?', '2/500 = 1/250']] },
    { titre: 'Agrandir et réduire des longueurs', decouvre: { txt: `La statue géante de robot d’Odaiba mesure ${H('19,7 m')}. Une maquette en plastique est fabriquée à l’échelle ${H('1/144')}. Quelle est la hauteur de la maquette ?`, img: skMaquette() },
      methode: ['L’échelle 1/144 est une réduction de coefficient k = 1/144 : on divise les longueurs par 144.', 'Je mets la hauteur dans une unité adaptée : 19,7 m = 1 970 cm.', 'Je divise : 1 970 ÷ 144 ≈ 13,7 cm.', 'La maquette a la même forme : les angles ne changent pas.'],
      vois: vMaq,
      solution: `<p>La maquette mesure environ <b>13,7 cm</b> de haut.</p><p class="srcl">${D.srcGundam}</p>`,
      retiens: '<p>Dans un <b>agrandissement</b> ou une <b>réduction</b> de rapport k, toutes les longueurs sont multipliées par k : k > 1 pour un agrandissement, 0 < k < 1 pour une réduction.</p><p>Les angles et la forme sont conservés.</p>',
      attention: 'Diviser par 144, c’est multiplier par 1/144 : le résultat est plus petit.',
      amoi: [['Figurine au 1/10 d’une moto de 2,1 m ?', '21 cm'], ['Une image agrandie × 2,5 : 8 cm deviennent ?', '20 cm']] },
    { titre: 'Aires et volumes : k² et k³', decouvre: { txt: `Une figurine de collection (fictive) au ${H('1/6')} représente un personnage de ${H('1,80 m')} : elle mesure 30 cm. Combien de fois moins de peinture faut-il pour la colorier ? Et combien de fois moins de résine pour la fabriquer ?`, img: skFigurine() },
      methode: ['Les longueurs sont divisées par 6 : k = 1/6, et 180 cm ÷ 6 = 30 cm.', 'Une aire dépend de deux longueurs : elle est divisée par 6 × 6 = 6² = 36.', 'Un volume dépend de trois longueurs : il est divisé par 6 × 6 × 6 = 6³ = 216.', 'Peinture : aire. Résine : volume.'],
      vois: vK,
      solution: '<p>Il faut <b>36 fois moins de peinture</b> (aire × 1/36) et <b>216 fois moins de résine</b> (volume × 1/216).</p>',
      retiens: '<p>Dans un agrandissement ou une réduction de rapport k : les longueurs sont multipliées par <b>k</b>, les aires par <b>k²</b>, les volumes par <b>k³</b>.</p>',
      attention: 'Si les longueurs sont doublées, l’aire est multipliée par 4 et le volume par 8, pas par 2.',
      amoi: [['Longueurs × 3 : l’aire est multipliée par ?', '9'], ['Longueurs × 2 : le volume est multiplié par ?', '8']] },
    { titre: 'Le théorème de Thalès', decouvre: { txt: `Un vidéoprojecteur (fictif) placé à ${H('4 m')} du mur donne une image de ${H('1,5 m')} de large. On le recule à ${H('10 m')} du mur. Quelle sera la largeur de l’image ?`, img: skProj() },
      methode: ['Je repère la configuration : les rayons partent du projecteur, les deux images sont parallèles.', 'Je repère le sommet commun : le projecteur. Les distances 4 m et 10 m partent de lui.', 'J’écris l’égalité des rapports (Thalès) : 4/10 = 1,5/L.', 'Je calcule avec un produit en croix : L = 1,5 × 10 ÷ 4 = 3,75 m.'],
      vois: vTh,
      solution: `<p>${FM(R`\dfrac{4}{10}=\dfrac{1{,}5}{L}\ \text{donc}\ L=\dfrac{1{,}5\times10}{4}=3{,}75\text{ m}`)}</p><p>À 10 m, l’image mesure <b>3,75 m</b> de large.</p>`,
      retiens: `<p><b>Théorème de Thalès</b> : M est sur [AB], N sur [AC]. Si les droites (MN) et (BC) sont parallèles, alors ${FM(R`\dfrac{AM}{AB}=\dfrac{AN}{AC}=\dfrac{MN}{BC}`)}.</p>`,
      attention: 'Les longueurs des rapports partent toutes du sommet commun A. On ne mélange pas AM et MB.',
      amoi: [['AM = 3, AB = 9 et BC = 12. Calcule MN.', 'MN = 12 × 3 ÷ 9 = 4'], ['AN = 5 et AC = 15. Rapport AN/AC ?', '1/3']] }];
  chk(3 * 50 === 150 && 2 / 500 === 1 / 250 && 210 / 10 === 21 && 8 * 2.5 === 20 && 12 * 3 / 9 === 4, 'c9 « À moi »');

  c.mots = [['échelle', 'longueur sur le plan ÷ longueur réelle, même unité', '1/200'], ['agrandissement', 'figure de même forme, longueurs × k avec k > 1', 'une fresque à partir d’une affiche'], ['réduction', 'figure de même forme, longueurs × k avec 0 < k < 1', 'une maquette au 1/144'], ['rapport k', 'le nombre par lequel on multiplie les longueurs', 'k = 1/6'], ['aires et volumes', 'aires × k², volumes × k³', 'k = 2 : aires × 4, volumes × 8'], ['théorème de Thalès', 'rapports égaux dans deux triangles emboîtés, côtés parallèles', 'AM/AB = AN/AC = MN/BC']];

  c.resolus = [
    { titre: 'Calculer avec Thalès', outil: '✏️ à la main', enonce: `Dans le triangle ABC, M est sur [AB] et N sur [AC], avec (MN) // (BC). ${H('AM = 4 cm')}, ${H('AB = 10 cm')}, ${H('BC = 7,5 cm')}. Calcule MN.`,
      rows: [['(MN) // (BC), M ∈ [AB], N ∈ [AC]', 'Je vérifie la configuration de Thalès.'], ['AM/AB = AN/AC = MN/BC', 'J’écris l’égalité des rapports.'], ['4/10 = MN/7,5', 'Je remplace par les longueurs connues.'], ['MN = 7,5 × 4 ÷ 10 = 3 cm', 'Produit en croix.']], verif: '3/7,5 = 0,4 et 4/10 = 0,4 ✓', rep: 'MN = 3 cm.', go: ['e3'] },
    { titre: 'À toi : calculer avec Thalès', outil: '✏️ à la main', enonce: `Même configuration : ${H('AM = 6 cm')}, ${H('AB = 15 cm')}, ${H('BC = 10 cm')}. Calcule MN.`, trous: [0, 1, 2, 3],
      rows: [['(MN) // (BC) : configuration de ⟦Thalès⟧', 'Je vérifie la configuration.'], ['AM/AB = MN/⟦BC⟧', 'J’écris les rapports utiles.'], ['6/15 = MN/⟦10⟧', 'Je remplace.'], ['MN = 10 × 6 ÷ 15 = ⟦4⟧ cm', 'Produit en croix.']], verif: '4/10 = 0,4 et 6/15 = 0,4 ✓', rep: 'MN = 4 cm.', go: ['e3'] }];
  chk(7.5 * 4 / 10 === 3 && 10 * 6 / 15 === 4, 'c9 résolus');
  c.entraine = [{ id: 'e1', gen: 'c9e1', lc: 1 }, { id: 'e2', gen: 'c9e2', lc: 3 }, { id: 'e3', gen: 'c9e3', lc: 4 }];

  /* ---------- je résous ---------- */
  chk(Math.round(1970 / 144 * 10) / 10 === 13.7 && 1970 / 100 === 19.7 && Math.round(19.7 / (1970 / 144) * 100) / 100 === 1.44 && Math.round(1970 / 32.8) === 60, 'c9 problème 1');
  chk(240 / 60 === 4 && 40 * 4 === 160 && Math.abs(2.4 * 1.6 - 3.84) < 1e-9 && Math.abs(3.84 / .24 - 16) < 1e-9 && Math.abs(3.84 / 8 - .48) < 1e-9, 'c9 problème 2');
  chk(1.5 * 10 / 4 === 3.75 && 3 * 4 / 1.5 === 8 && (10 / 4) ** 2 === 6.25 && Math.round(1.5 * 9 / 16 * 100) / 100 === .84, 'c9 problème 3');
  c.probs = [
    PB({ id: 'p1', etape: 2, lc: 2, comps: ['cal', 'rai'], titre: 'Les maquettes de la statue',
      intro: `<p>La statue géante d’Odaiba mesure ${H('19,7 m')}. Des maquettes existent à plusieurs échelles.</p><p class="srcl">${D.srcGundam}</p>`,
      qs: [Q('a.', 'Calcule la hauteur d’une maquette au 1/144, au millimètre.', '1 970 ÷ 144 ≈ 13,7 cm', 13.7, { w: 22, tol: .06, lab: 'en cm :' }), Q('b.', 'Calcule la hauteur d’une maquette au 1/100.', '1 970 ÷ 100 = 19,7 cm', 19.7, { w: 22, tol: .06, lab: 'en cm :' }), Q('c.', 'Combien de fois la maquette au 1/100 est-elle plus haute que celle au 1/144 ?', '19,7 ÷ 13,68 ≈ 1,44 fois (144 ÷ 100)', 1.44, { w: 22, tol: .006 }), Q('d.', 'Une maquette mesure 32,8 cm. À quelle échelle est-elle ? Justifie.', '1 970 ÷ 32,8 ≈ 60 : échelle 1/60.', null, { lines: 1 })],
      err: { 0: [{ v: 1970 * 144, m: 'Une maquette est plus petite : on divise par 144.' }, { v: 19.7 / 144, m: 'Convertis d’abord 19,7 m en cm : 1 970 cm.' }] },
      hints: ['19,7 m = 1 970 cm.', 'Au 1/144, on divise par 144.', 'Échelle : longueur maquette ÷ longueur réelle, même unité.'], pouce: '1 970 ÷ 144 ≈ 13,7 ; 1 970 ÷ 100 = 19,7 ; 1 970 ÷ 32,8 ≈ 60.', corr: 'a. 13,7 cm. b. 19,7 cm. c. 1,44. d. 1/60.' }),
    PB({ id: 'p2', etape: 3, lc: 3, defi: 4, bulle: 'Ce cas se fait en 4 étapes. Trouve d’abord le coefficient d’agrandissement k : tout le reste en découle.', autravail: { comp: 'mod', txt: 'agrandir un modèle à la bonne échelle pour une enseigne ou une fresque, et prévoir la peinture.' }, comps: ['che', 'mod', 'cal', 'com'], titre: 'La fresque murale',
      intro: `<p>Un peintre en décors doit reproduire une affiche de ${H('40 cm × 60 cm')} sur un mur, en fresque de ${H('2,4 m')} de haut (la hauteur de l’affiche est 60 cm). Un litre de peinture couvre ${H('8 m²')} (fictif).</p>`,
      qs: [Q('a.', 'Calcule le coefficient d’agrandissement k.', '240 ÷ 60 = 4', 4, { w: 22 }), Q('b.', 'Quelle sera la largeur de la fresque ?', '40 × 4 = 160 cm = 1,6 m', 1.6, { w: 22, lab: 'en m :' }), Q('c.', 'Calcule l’aire de la fresque. Combien de fois l’aire de l’affiche ?', '2,4 × 1,6 = 3,84 m² ; 0,4 × 0,6 = 0,24 m² ; 3,84 ÷ 0,24 = 16 = 4²', 3.84, { lines: 1, lab: 'aire en m² :' }), Q('d.', 'Quelle quantité de peinture faut-il pour une couche ?', '3,84 ÷ 8 = 0,48 L', .48, { w: 22, tol: .006, lab: 'en L :' }), Q('e.', 'Le client veut une fresque deux fois plus haute. Explique pourquoi il faudra quatre fois plus de peinture.', 'Les longueurs sont doublées, donc l’aire est multipliée par 2² = 4.', null, { lines: 2 })],
      err: { 0: [{ v: 2.4 / 60, m: 'Même unité : 2,4 m = 240 cm.' }], 3: [{ v: 3.84 * 8, m: 'Un litre couvre 8 m² : on divise l’aire par 8.' }] },
      hints: ['2,4 m = 240 cm.', 'Aire de la fresque = longueur × largeur, en m².', 'Litres = aire ÷ 8.'], pouce: 'k = 240 ÷ 60 = 4 ; largeur 1,6 m ; aire 3,84 m² ; peinture 3,84 ÷ 8.', corr: 'a. 4. b. 1,6 m. c. 3,84 m², 16 fois. d. 0,48 L. e. aire × 4.' }),
    PB({ id: 'p3', etape: 4, lc: 4, cls: 'bac', defi: 5, bulle: 'Voici une question « vers le brevet » : 5 étapes. Fais un schéma vu de dessus : le projecteur, les deux images parallèles.', autravail: { comp: 'rai', txt: 'placer un projecteur ou une enseigne lumineuse à la bonne distance pour obtenir la taille voulue.' }, comps: ['mod', 'rai', 'cal', 'com'], titre: 'Le projecteur du ciné-club',
      intro: `<p>Un ciné-club (fictif) utilise un vidéoprojecteur. À ${H('4 m')} du mur, l’image mesure ${H('1,5 m')} de large. Les rayons partent du projecteur ; les images à différentes distances sont parallèles.</p>`,
      qs: [BQ('1', 'Quel théorème permet de calculer la largeur de l’image à une autre distance ? Justifier.', 'rai', 'Le théorème de Thalès : les images sont parallèles et les rayons partent du même point.', null, { lines: 1 }), BQ('2', 'Calculer la largeur de l’image à 10 m du mur.', 'cal', '1,5 × 10 ÷ 4 = 3,75 m', 3.75, { w: 22, tol: .006, lab: 'en m :' }), BQ('3', 'À quelle distance placer le projecteur pour une image de 3 m de large ?', 'cal', 'd = 3 × 4 ÷ 1,5 = 8 m', 8, { w: 22, lab: 'en m :' }), BQ('4', 'Par combien l’aire de l’image est-elle multipliée entre 4 m et 10 m ?', 'mod', 'k = 10/4 = 2,5 ; aire × 2,5² = 6,25', 6.25, { w: 22, tol: .006 }), BQ('5', 'L’image est au format 16/9. Calculer sa hauteur à 4 m, au centimètre, et rédiger une phrase.', 'com', '1,5 × 9 ÷ 16 ≈ 0,84 m : à 4 m, l’image mesure 1,5 m sur environ 84 cm.', null, { lines: 2 })],
      err: { 1: [{ v: 1.5 * 4 / 10, m: 'L’image est plus grande quand on s’éloigne : 1,5 × 10 ÷ 4.' }], 3: [{ v: 2.5, m: 'C’est le rapport des longueurs. Pour une aire : k².' }] },
      hints: ['Thalès : rapports égaux depuis le projecteur.', 'Largeur à 10 m : 1,5 × 10 ÷ 4.', 'Aires : × k².'], pouce: 'k = 10 ÷ 4 = 2,5 ; largeur 1,5 × 2,5 ; distance pour 3 m : 3 × 4 ÷ 1,5 ; aire × 2,5².', corr: '1. Thalès. 2. 3,75 m. 3. 8 m. 4. 6,25. 5. 0,84 m.' })];

  c.bilan = [['Je sais utiliser une échelle.', ['e1', 'p1']], ['Je sais calculer un agrandissement ou une réduction.', ['e2', 'p1', 'p2']], ['Je sais utiliser k² et k³.', ['e2', 'p2', 'p3']], ['Je sais utiliser le théorème de Thalès.', ['e3', 'p3']]];
  c.words = require('./gl3')('c9');
  return c;
};
