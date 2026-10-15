/* Chapitre 8 · Théorème de Pythagore et trigonométrie — 3ème Série Pro (programme du cycle 4, BO n° 31 du 30 juillet 2020). */
'use strict';
const K = require('./kit3e');
const { H, FM, R, Q, BQ, PB, S, T, Rc, Ar, st, SN, Sketch } = K;
const { D, SV, tt, fill } = require('./sk3');

module.exports = function (chk) {
  const c = { id: 'c8', n: 8, col: 'geometrie', icone: '📐', dom: 'Espace et géométrie · triangle rectangle', titre: 'Pythagore et trigonométrie', sous: 'Calculer des longueurs et des angles dans un triangle rectangle' };
  c.parties = [{ t: 'Le théorème de Pythagore', n: [1, 2] }, { t: 'La trigonométrie', n: [3, 4] }];
  c.travail = { question: `Un écran de ${H('55 pouces')} mesure-t-il vraiment 139,7 cm en diagonale ? À quelle distance de la ${H('statue géante de 19,7 m')} faut-il se placer pour voir son sommet sous un angle de 35° ? Tu sauras répondre aux notions 1 et 3.` };
  c.objectifs = ['Je saurai calculer une longueur avec le théorème de Pythagore.', 'Je saurai prouver qu’un triangle est rectangle, ou qu’il ne l’est pas.', 'Je saurai calculer une longueur avec le cosinus, le sinus ou la tangente.', 'Je saurai calculer un angle avec la calculatrice.'];
  c.depart = 'c8';
  const rad = d => d * Math.PI / 180, deg = x => x * 180 / Math.PI, r1 = x => Math.round(x * 10) / 10;
  chk(r1(Math.sqrt(121.8 ** 2 + 68.5 ** 2)) === 139.7 && r1(139.7 / 2.54) === 55 && 45 ** 2 + 60 ** 2 === 75 ** 2 && r1(19.7 / Math.tan(rad(35))) === 28.1 && r1(deg(Math.atan(.6))) === 31, 'c8 notions');

  /* ---------- illustrations « Je découvre » ---------- */
  const skEcran = () => { const k = Sketch(781); return SV(fill(20, 16, 150, 84, .45, 'k2', 4) + k.P(k.rect(20, 16, 150, 84)) + k.P(k.line(20, 100, 170, 16), { w: 1.8, c: '#C2332A' }) + k.P(k.line(95, 100, 95, 112) + k.line(70, 114, 120, 114), { w: 2 }) + tt(95, 128, '55 pouces ?', 12), 'Un écran et sa diagonale'); };
  const skCadre = () => { const k = Sketch(782); return SV(k.P(k.poly([[30, 108], [150, 108], [30, 18]], true), { w: 3 }) + `<path d="M30 94h14v14" fill="none" stroke="#2B2D7C" stroke-width="2"/>` + tt(90, 124, '60 cm', 12) + tt(16, 66, '45', 12) + tt(104, 56, '75 cm', 12) + tt(168, 40, 'd’équerre ?', 12), 'Un cadre triangulaire de côtés 45, 60 et 75 cm'); };
  const skStatue = () => { const k = Sketch(783); return SV(k.P(k.line(10, 112, 190, 112), { w: 2.4 }) + fill(140, 14, 26, 98, .9, 'k2', 3) + k.P(k.rect(140, 14, 26, 98)) + k.P(k.line(30, 112, 140, 14), { w: 1.6, c: '#C2332A' }) + tt(178, 66, '19,7 m', 11, { a: 'start' }) + tt(52, 104, '35°', 12) + tt(86, 126, 'distance ?', 11), 'Une statue de 19,7 m vue sous un angle de 35°'); };
  const skSkate = () => { const k = Sketch(784); return SV(k.P(k.line(10, 110, 190, 110), { w: 2.4 }) + fill(40, 40, 120, 70, .25, 'k2', 0) + k.P(k.poly([[40, 110], [160, 110], [160, 40]], true), { w: 3 }) + tt(100, 124, '2 m', 12) + tt(176, 80, '1,2 m', 11, { a: 'start' }) + tt(70, 104, '?', 14), 'Une rampe de skate de 1,2 m de haut sur 2 m au sol'); };

  /* ---------- méthodes visuelles ---------- */
  // 1. la diagonale de l’écran
  const vEcr = S(600, 230, st(1, SN(1, 40, 24) + Rc(60, 30, 300, 169, { c: 'k2', rx: 2, op: .5 }) + `<path d="M60 199L360 30" stroke="#C2332A" stroke-width="3"/><path d="M346 199v-14h14" fill="none" class="ks" stroke-width="2"/>` + T(210, 220, '121,8 cm', { fs: 14 }) + T(372, 118, '68,5 cm', { fs: 14, a: 'start' }) + T(198, 104, 'd', { fs: 18, c: 'kt' }))
    + st(2, SN(2, 448, 34) + T(466, 40, 'd² = 121,8² + 68,5²', { fs: 14, a: 'start' }))
    + st(3, SN(3, 448, 84) + T(466, 90, '= 14 835,24', { fs: 14, a: 'start' }) + T(466, 110, '+ 4 692,25', { fs: 14, a: 'start' }) + T(466, 132, '= 19 527,49', { fs: 14, a: 'start' }))
    + st(4, SN(4, 448, 168) + Rc(462, 152, 130, 54, { c: 'k', rx: 10 }) + T(527, 175, 'd ≈ 139,7 cm', { fs: 14, c: 'tw' }) + T(527, 196, '÷ 2,54 = 55 po', { fs: 13, c: 'tw' })),
  'Un écran de 121,8 cm sur 68,5 cm ; sa diagonale est l’hypoténuse d’un triangle rectangle : environ 139,7 cm');
  // 2. la réciproque : 45, 60, 75
  const vRec = S(600, 230, st(1, SN(1, 40, 30) + `<path d="M80 196L272 196L80 52Z" class="k2 ks" stroke-width="2.6" fill-opacity=".4"/>` + T(176, 216, '60 cm', { fs: 14 }) + T(70, 128, '45 cm', { fs: 14, a: 'end' }) + T(188, 116, '75 cm', { fs: 14, a: 'start', c: 'kt' }) + T(70, 210, 'A', { fs: 13 }))
    + st(2, SN(2, 330, 46) + T(350, 52, 'plus grand côté : 75² = 5 625', { fs: 14, a: 'start' }))
    + st(3, SN(3, 330, 96) + T(350, 102, '45² + 60² = 2 025 + 3 600', { fs: 14, a: 'start' }) + T(350, 124, '= 5 625', { fs: 14, a: 'start' }))
    + st(4, `<path d="M80 182h14v14" fill="none" stroke="#C2332A" stroke-width="2.6"/>` + SN(4, 330, 172) + Rc(348, 152, 238, 52, { c: 'k', rx: 10 }) + T(467, 174, 'égalité : rectangle en A', { fs: 14, c: 'tw' }) + T(467, 195, 'l’angle est droit', { fs: 13, c: 'tw' })),
  'Le cadre de côtés 45, 60 et 75 : 75 au carré égale 45 au carré plus 60 au carré, donc l’angle est droit');
  // 3. la statue : tan 35°
  const Ox = 480 - 166 / Math.tan(rad(35));
  const vTan = S(600, 230, st(1, SN(1, 22, 30) + `<line x1="30" y1="196" x2="580" y2="196" class="ks" stroke-width="2.4"/>` + Rc(480, 30, 26, 166, { c: 'k2', rx: 3 }) + `<path d="M${Ox.toFixed(1)} 196L480 30" stroke="#C2332A" stroke-width="2.4"/><path d="M466 196v-14h14" fill="none" class="ks" stroke-width="2"/><path d="M${(Ox + 44).toFixed(1)} 196A44 44 0 0 0 ${(Ox + 44 * Math.cos(rad(35))).toFixed(1)} ${(196 - 44 * Math.sin(rad(35))).toFixed(1)}" fill="none" class="ks" stroke-width="2"/>` + T(Ox + 58, 188, '35°', { fs: 13, c: 'kt' }) + T(516, 118, '19,7 m', { fs: 14, a: 'start' }) + T((Ox + 480) / 2, 216, 'd ?', { fs: 15, c: 'kt' }))
    + st(2, SN(2, 22, 62) + T(40, 67, 'opposé à 35° : 19,7 m ; adjacent : d', { fs: 13, a: 'start' }))
    + st(3, SN(3, 22, 94) + T(40, 99, 'tan 35° = 19,7 ÷ d', { fs: 15, a: 'start', c: 'kt' }))
    + st(4, SN(4, 22, 126) + T(40, 131, 'd = 19,7 ÷ tan 35° ≈ 28,1 m', { fs: 15, a: 'start', c: 'kt' })),
  'La statue de 19,7 m, le sol et la ligne de visée forment un triangle rectangle ; tangente de 35 degrés égale 19,7 sur d');
  chk(Ox > 210 && Ox < 250, 'c8 figure de la statue');
  // 4. la rampe : tan x = 0,6
  const vAng = S(600, 230, st(1, SN(1, 100, 24) + `<path d="M120 200L420 200L420 20Z" class="k2 ks" stroke-width="2.6" fill-opacity=".4"/><path d="M406 200v-14h14" fill="none" class="ks" stroke-width="2"/><path d="M170 200A50 50 0 0 0 ${(120 + 50 * Math.cos(Math.atan(.6))).toFixed(1)} ${(200 - 50 * Math.sin(Math.atan(.6))).toFixed(1)}" fill="none" class="ks" stroke-width="2"/>` + T(186, 190, 'x', { fs: 15, c: 'kt' }) + T(270, 220, '2 m (adjacent)', { fs: 13 }) + T(412, 110, '1,2 m', { fs: 13, a: 'end' }) + T(412, 128, '(opposé)', { fs: 11, a: 'end', c: 'ts' }))
    + st(2, SN(2, 448, 50) + T(466, 56, 'tan x = 1,2 ÷ 2', { fs: 14, a: 'start' }))
    + st(3, SN(3, 448, 96) + T(466, 102, 'tan x = 0,6', { fs: 14, a: 'start' }))
    + st(4, SN(4, 448, 152) + Rc(462, 132, 128, 58, { c: 'k', rx: 10 }) + T(526, 156, 'x = tan⁻¹(0,6)', { fs: 13, c: 'tw' }) + T(526, 178, 'x ≈ 31,0°', { fs: 15, c: 'tw' })),
  'Une rampe de 1,2 m de haut sur 2 m au sol : tangente de x égale 0,6, donc x vaut environ 31 degrés');

  c.notions = [
    { titre: 'Le théorème de Pythagore', decouvre: { txt: `Un téléviseur annoncé « ${H('55 pouces')} » a un écran de ${H('121,8 cm')} de large et ${H('68,5 cm')} de haut. Sa diagonale mesure-t-elle bien 55 pouces (1 pouce = 2,54 cm) ?`, img: skEcran() },
      methode: ['La diagonale coupe l’écran en deux triangles rectangles : elle en est l’hypoténuse.', 'J’écris le théorème de Pythagore : d² = 121,8² + 68,5².', 'Je calcule : d² = 14 835,24 + 4 692,25 = 19 527,49.', 'Je prends la racine carrée, puis je convertis : d ≈ 139,7 cm, et 139,7 ÷ 2,54 = 55.'],
      vois: vEcr,
      solution: `<p>${FM(R`d=\sqrt{121{,}8^2+68{,}5^2}=\sqrt{19\,527{,}49}\approx139{,}7\text{ cm}`)}</p><p>139,7 ÷ 2,54 = 55 : c’est bien un écran de <b>55 pouces</b>.</p>`,
      retiens: `<p><b>Théorème de Pythagore</b> : si le triangle ABC est rectangle en A, alors ${FM(R`BC^2=AB^2+AC^2`)}.</p><p>[BC] est l’<b>hypoténuse</b> : le côté opposé à l’angle droit, le plus long.</p>`,
      attention: 'Pour un côté de l’angle droit, on soustrait : AC² = BC² − AB². Et on n’oublie pas la racine carrée.',
      amoi: [['Côtés de l’angle droit 6 et 8 : hypoténuse ?', '√100 = 10'], ['Hypoténuse 13, un côté 5 : l’autre côté ?', '√144 = 12']] },
    { titre: 'Prouver qu’un triangle est rectangle', decouvre: { txt: `Pour accrocher un poster géant, un charpentier fabrique un cadre en bois. Il mesure un triangle de ${H('45 cm')}, ${H('60 cm')} et ${H('75 cm')}. Son angle est-il droit ?`, img: skCadre() },
      methode: ['Je repère le plus grand côté : 75 cm.', 'Je calcule son carré : 75² = 5 625.', 'Je calcule la somme des carrés des deux autres côtés : 45² + 60² = 5 625.', 'Il y a égalité : d’après la réciproque du théorème de Pythagore, le triangle est rectangle.'],
      vois: vRec,
      solution: '<p>75² = 45² + 60² : le triangle est <b>rectangle</b>, l’angle opposé au côté de 75 cm est droit. Le cadre est d’équerre.</p><p>Avec 46 cm au lieu de 45 : 46² + 60² = 5 716 ≠ 5 625, le cadre ne serait pas d’équerre.</p>',
      retiens: `<p><b>Réciproque</b> : si ${FM(R`BC^2=AB^2+AC^2`)}, alors le triangle ABC est rectangle en A.</p><p>Si BC² ≠ AB² + AC² ([BC] étant le plus grand côté), le triangle n’est pas rectangle.</p>`,
      attention: 'On compare toujours le carré du plus grand côté à la somme des carrés des deux autres.',
      amoi: [['5 ; 12 ; 13 : rectangle ?', 'oui : 25 + 144 = 169'], ['6 ; 7 ; 9 : rectangle ?', 'non : 36 + 49 = 85 et 81']] },
    { titre: 'Calculer une longueur avec la trigonométrie', decouvre: { txt: `À Tokyo, une ${H('statue géante de robot')} mesure ${H('19,7 m')} de haut. Depuis un point au sol, on voit son sommet sous un angle de ${H('35°')}. À quelle distance de la statue est-on ?`, img: skStatue() },
      methode: ['Je repère le triangle rectangle : la statue (verticale), le sol (horizontal) et la ligne de visée.', 'Par rapport à l’angle de 35° : la hauteur est le côté opposé, la distance d le côté adjacent.', 'Opposé et adjacent : j’utilise la tangente, tan 35° = 19,7 ÷ d.', 'J’isole d : d = 19,7 ÷ tan 35°, avec la calculatrice en degrés.'],
      vois: vTan,
      solution: `<p>${FM(R`d=\dfrac{19{,}7}{\tan35^\circ}\approx28{,}1\text{ m}`)} : on est à environ <b>28,1 m</b> de la statue.</p><p class="srcl">${D.srcGundam}</p>`,
      retiens: `<p>Dans un triangle rectangle, pour un angle aigu : ${FM(R`\cos=\dfrac{\text{adjacent}}{\text{hypoténuse}}`)}, ${FM(R`\sin=\dfrac{\text{opposé}}{\text{hypoténuse}}`)}, ${FM(R`\tan=\dfrac{\text{opposé}}{\text{adjacent}}`)}.</p><p>Moyen mnémotechnique : CAH SOH TOA.</p>`,
      attention: 'La calculatrice doit être en mode degrés (D ou Deg à l’écran).',
      amoi: [['Hypoténuse 10, angle 30° : côté opposé ?', '10 × sin 30° = 5'], ['Adjacent 8, angle 60° : hypoténuse ?', '8 ÷ cos 60° = 16']] },
    { titre: 'Calculer un angle', decouvre: { txt: `Une rampe de skate (fictive) monte de ${H('1,2 m')} sur ${H('2 m')} au sol. Quel angle fait-elle avec le sol ?`, img: skSkate() },
      methode: ['Je repère les côtés connus par rapport à l’angle x : 1,2 m est opposé, 2 m est adjacent.', 'Opposé et adjacent : tan x = 1,2 ÷ 2.', 'Je calcule : tan x = 0,6.', 'Je retrouve l’angle avec la touche tan⁻¹ (ou Arctan) : x ≈ 31,0°.'],
      vois: vAng,
      solution: `<p>${FM(R`x=\tan^{-1}(0{,}6)\approx31{,}0^\circ`)} : la rampe fait un angle d’environ <b>31°</b> avec le sol.</p>`,
      retiens: '<p>Pour calculer un angle, on choisit la formule qui utilise les deux côtés connus, puis on utilise la touche cos⁻¹, sin⁻¹ ou tan⁻¹ (souvent : 2nde ou Shift, puis cos, sin ou tan).</p>',
      attention: 'tan⁻¹(0,6) n’est pas 1 ÷ tan(0,6) : c’est l’angle dont la tangente vaut 0,6.',
      amoi: [['tan x = 1. Combien vaut x ?', '45°'], ['cos x = 0,5. Combien vaut x ?', '60°']] }];
  chk(r1(10 * Math.sin(rad(30))) === 5 && r1(8 / Math.cos(rad(60))) === 16 && r1(deg(Math.atan(1))) === 45 && r1(deg(Math.acos(.5))) === 60 && 46 ** 2 + 60 ** 2 === 5716, 'c8 « À moi »');

  c.mots = [['hypoténuse', 'le côté opposé à l’angle droit, le plus long', 'la diagonale de l’écran'], ['théorème de Pythagore', 'dans un triangle rectangle en A : BC² = AB² + AC²', '121,8² + 68,5² = d²'], ['réciproque', 'si BC² = AB² + AC², le triangle est rectangle en A', '45² + 60² = 75²'], ['côté adjacent', 'le côté de l’angle droit qui touche l’angle étudié', 'la distance au sol'], ['côté opposé', 'le côté en face de l’angle étudié', 'la hauteur de la statue'], ['cosinus, sinus, tangente', 'rapports de longueurs liés à un angle aigu', 'tan 35° = 19,7 ÷ d']];

  c.resolus = [
    { titre: 'Calculer un côté de l’angle droit', outil: '🧮 calculatrice', enonce: `Un écran de ${H('139,7 cm')} de diagonale mesure ${H('121,8 cm')} de large. Calcule sa hauteur, au dixième.`,
      rows: [['Triangle rectangle : la diagonale est l’hypoténuse', 'Je repère l’hypoténuse.'], ['h² = 139,7² − 121,8²', 'Pythagore : pour un côté de l’angle droit, je soustrais.'], ['h² = 19 516,09 − 14 835,24 = 4 680,85', 'Je calcule les carrés.'], ['h = √4 680,85 ≈ 68,4 cm', 'Je prends la racine carrée et j’arrondis.']], verif: '121,8² + 68,4² ≈ 19 514, proche de 139,7² ≈ 19 516 ✓', rep: 'L’écran mesure environ 68,4 cm de haut.', go: ['e1'] },
    { titre: 'À toi : calculer un côté de l’angle droit', outil: '🧮 calculatrice', enonce: `Une échelle de ${H('5 m')} est posée contre un mur. Son pied est à ${H('1,4 m')} du mur. À quelle hauteur touche-t-elle le mur ?`, trous: [0, 1, 2, 3],
      rows: [['L’échelle est l’⟦hypoténuse⟧', 'Le mur et le sol forment un angle droit.'], ['h² = 5² − ⟦1,4⟧²', 'Pythagore : je soustrais.'], ['h² = 25 − 1,96 = ⟦23,04⟧', 'Je calcule.'], ['h = √23,04 = ⟦4,8⟧ m', 'Je prends la racine carrée.']], verif: '1,4² + 4,8² = 1,96 + 23,04 = 25 = 5² ✓', rep: 'L’échelle touche le mur à 4,8 m de hauteur.', go: ['e1', 'e2'] }];
  chk(Math.abs(Math.sqrt(23.04) - 4.8) < 1e-9 && r1(Math.sqrt(139.7 ** 2 - 121.8 ** 2)) === 68.4, 'c8 résolus');
  c.entraine = [{ id: 'e1', gen: 'c8e1', lc: 1 }, { id: 'e2', gen: 'c8e2', lc: 2 }, { id: 'e3', gen: 'c8e3', lc: 3 }];

  /* ---------- je résous ---------- */
  chk(r1(65 * 2.54) === 165.1 && r1(Math.sqrt(143.9 ** 2 + 80.9 ** 2)) === 165.1 && 143.9 > 140, 'c8 problème 1');
  chk(r1(deg(Math.atan(19.7 / 30))) === 33.3 && r1(Math.sqrt(900 + 19.7 ** 2)) === 35.9, 'c8 problème 2');
  chk(Math.round(Math.sqrt(1.44 + 6.25) * 100) / 100 === 2.77 && r1(deg(Math.atan(1.2 / 2.5))) === 25.6 && Math.round(1.2 / Math.tan(rad(30)) * 100) / 100 === 2.08 && Math.abs(1.2 ** 2 + 1.6 ** 2 - 4) < 1e-9, 'c8 problème 3');
  c.probs = [
    PB({ id: 'p1', etape: 2, lc: 1, comps: ['che', 'cal'], titre: 'Un écran de 65 pouces',
      intro: `<p>Un téléviseur de ${H('65 pouces')} a un écran de ${H('143,9 cm')} de large et ${H('80,9 cm')} de haut. 1 pouce = 2,54 cm.</p>`,
      qs: [Q('a.', 'Convertis 65 pouces en centimètres.', '65 × 2,54 = 165,1 cm', 165.1, { w: 24, tol: .06, lab: 'en cm :' }), Q('b.', 'Vérifie avec le théorème de Pythagore que la diagonale mesure bien 165,1 cm environ.', '√(143,9² + 80,9²) = √27 252,02 ≈ 165,1 cm', null, { lines: 2 }), Q('c.', 'Le meuble TV (fictif) mesure 140 cm de large. L’écran sera-t-il plus large que le meuble ?', 'Oui : 143,9 cm > 140 cm.', null, { lines: 1 }), Q('d.', 'Quelle est la largeur d’un écran de 55 pouces (121,8 cm) ? Tient-il sur le meuble ?', 'Oui : 121,8 cm < 140 cm.', null, { lines: 1 })],
      err: { 0: [{ v: 65 / 2.54, m: 'Pour passer des pouces aux centimètres, on multiplie par 2,54.' }] },
      hints: ['1 pouce = 2,54 cm : on multiplie.', 'La diagonale est l’hypoténuse : d² = largeur² + hauteur².', 'Compare les largeurs.'], pouce: '65 × 2,54 ; d² = 143,9² + 80,9² = 20 707,21 + 6 544,81.', corr: 'a. 165,1 cm. b. ≈ 165,1. c. oui. d. oui, 121,8 < 140.' }),
    PB({ id: 'p2', etape: 3, lc: 3, defi: 4, bulle: 'Ce cas se fait en 4 étapes. Fais un schéma : la statue verticale, le sol, la ligne de visée. Repère l’angle droit.', autravail: { comp: 'mod', txt: 'calculer la pente d’un toit ou la longueur d’un chevron à partir d’une hauteur et d’un angle.' }, comps: ['che', 'mod', 'cal', 'com'], titre: 'Au pied de la statue géante',
      intro: `<p>La statue géante de robot d’Odaiba, à Tokyo, mesure ${H('19,7 m')}. Mika se place à ${H('30 m')} du pied de la statue, et regarde son sommet. On néglige sa taille.</p><p class="srcl">${D.srcGundam}</p>`,
      qs: [Q('a.', 'Fais un schéma et repère le triangle rectangle.', 'Statue verticale, sol horizontal : angle droit au pied de la statue.', null, { lines: 1 }), Q('b.', 'Calcule l’angle sous lequel Mika voit le sommet, au dixième de degré.', 'tan x = 19,7 ÷ 30 ; x ≈ 33,3°', 33.3, { w: 24, tol: .06, lab: 'en ° :' }), Q('c.', 'Calcule la distance entre Mika et le sommet de la statue, au dixième.', '√(30² + 19,7²) = √1 288,09 ≈ 35,9 m', 35.9, { w: 24, tol: .06, lab: 'en m :' }), Q('d.', 'Si Mika recule, l’angle augmente-t-il ou diminue-t-il ? Explique.', 'Il diminue : la hauteur reste la même et la distance augmente, donc tan x = 19,7 ÷ d diminue.', null, { lines: 2 })],
      err: { 1: [{ v: r1(deg(Math.atan(30 / 19.7))), m: 'tan = opposé ÷ adjacent : 19,7 ÷ 30, pas l’inverse.' }] },
      hints: ['Opposé à l’angle : la hauteur ; adjacent : la distance au sol.', 'Pour l’angle : tan⁻¹(19,7 ÷ 30).', 'La distance au sommet est l’hypoténuse : Pythagore.'], pouce: 'tan x = 19,7 ÷ 30 ≈ 0,657 ; hypoténuse² = 30² + 19,7².', corr: 'a. rectangle au pied. b. 33,3°. c. 35,9 m. d. il diminue.' }),
    PB({ id: 'p3', etape: 4, lc: 4, cls: 'bac', defi: 5, bulle: 'Voici une question « vers le brevet » : 5 étapes. Pour chaque calcul, dis quel théorème ou quelle formule tu utilises.', autravail: { comp: 'rai', txt: 'vérifier l’équerre d’une ossature et la pente d’un escalier ou d’une rampe avant de les poser.' }, comps: ['mod', 'rai', 'cal', 'com'], titre: 'La rampe de skate',
      intro: `<p>Un club (fictif) construit une rampe de skate. Vue de profil, c’est un triangle rectangle : ${H('1,2 m')} de haut et ${H('2,5 m')} au sol. La règle du club : l’angle avec le sol ne doit pas dépasser ${H('30°')}.</p>`,
      qs: [BQ('1', 'Calculer la longueur de la planche inclinée, au centième.', 'cal', '√(1,2² + 2,5²) = √7,69 ≈ 2,77 m', 2.77, { w: 26, tol: .006, lab: 'en m :' }), BQ('2', 'Calculer l’angle de la rampe avec le sol, au dixième de degré.', 'cal', 'tan x = 1,2 ÷ 2,5 = 0,48 ; x ≈ 25,6°', 25.6, { w: 24, tol: .06, lab: 'en ° :' }), BQ('3', 'La rampe respecte-t-elle la règle du club ? Justifier.', 'rai', 'Oui : 25,6° < 30°.', null, { lines: 1 }), BQ('4', 'Pour un angle de 30° avec la même hauteur, quelle longueur au sol faudrait-il ? Arrondir au centième.', 'mod', 'tan 30° = 1,2 ÷ d ; d = 1,2 ÷ tan 30° ≈ 2,08 m', 2.08, { w: 24, tol: .006, lab: 'en m :' }), BQ('5', 'Le charpentier mesure sur un support 1,2 m, 1,6 m et 2 m. Ce support a-t-il un angle droit ? Justifier.', 'com', '2² = 4 et 1,2² + 1,6² = 1,44 + 2,56 = 4 : égalité, donc le support est rectangle (réciproque de Pythagore).', null, { lines: 2 })],
      err: { 1: [{ v: r1(deg(Math.atan(2.5 / 1.2))), m: 'tan = opposé ÷ adjacent : 1,2 ÷ 2,5.' }], 3: [{ v: Math.round(1.2 * Math.tan(rad(30)) * 100) / 100, m: 'd est au dénominateur : d = 1,2 ÷ tan 30°.' }] },
      hints: ['La planche est l’hypoténuse.', 'Opposé et adjacent : la tangente.', 'Réciproque : compare 2² et 1,2² + 1,6².'], pouce: 'Planche : √(1,44 + 6,25). Angle : tan⁻¹(0,48). Sol pour 30° : 1,2 ÷ tan 30°.', corr: '1. 2,77 m. 2. 25,6°. 3. oui. 4. 2,08 m. 5. oui, 4 = 4.' })];

  c.bilan = [['Je sais calculer une longueur avec Pythagore.', ['e1', 'p1', 'p3']], ['Je sais prouver qu’un triangle est rectangle.', ['e2', 'p3']], ['Je sais calculer une longueur avec la trigonométrie.', ['e3', 'p3']], ['Je sais calculer un angle.', ['e3', 'p2', 'p3']]];
  c.words = require('./gl3')('c8');
  return c;
};
