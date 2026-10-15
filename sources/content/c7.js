/* Chapitre 7 · Probabilités — 3ème Série Pro (programme du cycle 4, BO n° 31 du 30 juillet 2020). */
'use strict';
const K = require('./kit3e');
const { H, FM, R, Q, BQ, PB, S, T, Rc, Ar, st, SN, Sketch, MCVP, tab } = K;
const { D, SV, tt, fill } = require('./sk3');
const { rng } = require('../shared/gens.js').MCVG;

module.exports = function (chk) {
  const c = { id: 'c7', n: 7, col: 'algo', icone: '🎲', dom: 'Organisation et gestion de données · probabilités', titre: 'Probabilités', sous: 'Dés, boosters et simulations' };
  c.parties = [{ t: 'Calculer une probabilité', n: [1, 2] }, { t: 'Deux épreuves et simulation', n: [3, 4] }];
  c.travail = { question: `Dans un jeu de rôle, on lance un ${H('dé à 20 faces')} : il faut ${H('15 ou plus')} pour réussir. Quelles sont tes chances ? Et que donnent ${H('1 000 lancers')} simulés par un programme ? Tu sauras répondre aux notions 1 et 4.` };
  c.objectifs = ['Je saurai calculer une probabilité dans une situation d’équiprobabilité.', 'Je saurai utiliser l’événement contraire, impossible ou certain.', 'Je saurai étudier une expérience à deux épreuves avec un tableau.', 'Je saurai comparer une fréquence observée et une probabilité.'];
  c.depart = 'c7';

  /* simulations reproductibles (graine fixe) */
  const R1 = rng(26), F = []; let ok = 0; for (let n = 1; n <= 1000; n++) { if (1 + Math.floor(R1() * 20) >= 15) ok++; F.push(ok / n); }
  const OK1000 = ok, f1000 = ok / 1000;
  chk(OK1000 === 322 && Math.abs(F[9] - .6) < 1e-9, 'c7 simulation de 1 000 lancers');
  const R2 = rng(2), SUM = {}; let DBL = 0; for (let n = 0; n < 600; n++) { const a = 1 + Math.floor(R2() * 6), b = 1 + Math.floor(R2() * 6); SUM[a + b] = (SUM[a + b] || 0) + 1; if (a === b) DBL++; }
  chk(SUM[7] === 109 && DBL === 93, 'c7 simulation de 600 lancers de deux dés');

  /* ---------- illustrations « Je découvre » ---------- */
  const d20 = (cx, cy, r, k, lab = '20') => { const p = Array.from({ length: 6 }, (_, i) => [cx + r * Math.cos(Math.PI / 6 + i * Math.PI / 3), cy + r * Math.sin(Math.PI / 6 + i * Math.PI / 3)]); const tri = [[cx, cy - r * .55], [cx - r * .55, cy + r * .35], [cx + r * .55, cy + r * .35]]; return fill(cx - r * .8, cy - r * .8, r * 1.6, r * 1.6, .35, 'k2', r) + k.P(k.poly(p, true), { w: 2.4 }) + k.P(k.poly(tri, true), { w: 1.6 }) + k.P(k.line(p[0][0], p[0][1], tri[2][0], tri[2][1]) + k.line(p[2][0], p[2][1], tri[1][0], tri[1][1]) + k.line(p[4][0], p[4][1], tri[0][0], tri[0][1]), { w: 1.2 }) + tt(cx, cy + 8, lab, r / 2.2); };
  const skD20 = () => { const k = Sketch(771); return SV(d20(70, 62, 46, k) + tt(150, 54, '15 ou', 14) + tt(150, 74, 'plus ?', 14) + tt(100, 124, 'un dé à 20 faces', 11), 'Un dé à 20 faces'); };
  const skEchec = () => { const k = Sketch(772); return SV(d20(66, 60, 44, k, '1') + tt(148, 50, 'échec', 14) + tt(148, 70, 'critique', 14) + tt(100, 124, 'et le contraire ?', 11), 'Un dé à 20 faces qui montre 1'); };
  const skDeuxDes = () => { const k = Sketch(773); const de = (x, y, n) => fill(x, y, 54, 54, .9, 'k2', 8) + k.P(k.rect(x, y, 54, 54)) + (n === 3 ? [[14, 14], [27, 27], [40, 40]] : [[14, 14], [40, 14], [27, 27], [14, 40], [40, 40]]).map(([a, b]) => `<circle cx="${x + a}" cy="${y + b}" r="5" class="k"/>`).join(''); return SV(de(30, 30, 3) + de(110, 22, 5) + tt(100, 112, '3 + 5 = 8', 14), 'Deux dés à 6 faces : 3 et 5'); };
  const skSimu = () => { const k = Sketch(774); const col = ['#E6A800', '#E8901A', '#3E9E3E', '#7A52CC']; let s = ''; ['quand ⚑ cliqué', 'répéter 1000 fois', 'si … ≥ 15 alors', 'ajouter 1 à succès'].forEach((l, i) => { s += `<rect x="${20 + (i > 1 ? 14 : 0)}" y="${14 + i * 24}" width="${150 - (i > 1 ? 14 : 0)}" height="20" rx="4" fill="${col[i]}"/>` + `<text x="${28 + (i > 1 ? 14 : 0)}" y="${28 + i * 24}" font-family="Inter" font-size="10.5" font-weight="700" fill="#fff">${l}</text>`; }); return SV(s + tt(100, 124, `succès : ${OK1000}`, 13), 'Un programme Scratch qui simule 1 000 lancers'); };

  /* ---------- méthodes visuelles ---------- */
  // 1. les 20 issues, 6 favorables
  const cell = (i, hl) => { const x = 40 + (i % 10) * 52, y = 30 + Math.floor(i / 10) * 50; return Rc(x, y, 46, 42, { c: hl ? 'k' : 'wh', rx: 8 }) + T(x + 23, y + 27, String(i + 1), { fs: 16, c: hl ? 'tw' : 'tx' }); };
  const vD20 = S(600, 230, st(1, SN(1, 22, 22) + Array.from({ length: 20 }, (_, i) => cell(i, false)).join(''))
    + st(2, SN(2, 22, 72) + Array.from({ length: 6 }, (_, i) => cell(14 + i, true)).join(''))
    + st(3, SN(3, 22, 160) + T(44, 165, '6 issues favorables sur 20 issues équiprobables', { fs: 15, a: 'start' }))
    + st(4, SN(4, 22, 204) + Rc(44, 184, 540, 40, { c: 'k2', rx: 10 }) + T(314, 210, 'P(« 15 ou plus ») = 6/20 = 3/10 = 0,3, soit 30 %', { fs: 16, c: 'kt' })),
  'Les vingt faces d’un dé ; les faces 15 à 20 sont colorées : 6 chances sur 20');
  // 2. l’échelle des probabilités
  const X = p => 50 + p * 500;
  const tick = (p, lab, up, cls = 'kt') => `<line x1="${X(p)}" y1="96" x2="${X(p)}" y2="${up ? 72 : 120}" class="ks" stroke-width="2"/><circle cx="${X(p)}" cy="96" r="7" class="k"/>` + T(X(p), up ? 62 : 138, lab, { fs: 13, c: cls });
  const vEch = S(600, 230, `<line x1="50" y1="96" x2="550" y2="96" class="ks" stroke-width="3"/>` + T(50, 172, '0', { fs: 14 }) + T(550, 172, '1', { fs: 14 }) + T(300, 172, '0,5', { fs: 13, c: 'ts' })
    + st(1, SN(1, 22, 30) + tick(.05, 'échec : 1/20 = 0,05', true))
    + st(2, SN(2, 300, 30) + tick(.95, 'pas d’échec : 1 − 0,05 = 0,95', true))
    + st(3, SN(3, 22, 200) + tick(0, 'obtenir 21 : impossible', false))
    + st(4, SN(4, 360, 200) + tick(1, 'entre 1 et 20 : certain', false)),
  'Une échelle de 0 à 1 : l’échec à 0,05, son contraire à 0,95, l’impossible à 0, le certain à 1');
  // 3. le tableau des sommes de deux dés
  const tx0 = 60, ty0 = 26, tw = 40, th = 28;
  let grid = Rc(tx0, ty0, tw, th, { c: 'k2', rx: 0 }) + T(tx0 + tw / 2, ty0 + 19, '+', { fs: 14 });
  for (let j = 1; j <= 6; j++) grid += Rc(tx0 + j * tw, ty0, tw, th, { c: 'k2', rx: 0 }) + T(tx0 + j * tw + tw / 2, ty0 + 19, String(j), { fs: 13 }) + Rc(tx0, ty0 + j * th, tw, th, { c: 'k2', rx: 0 }) + T(tx0 + tw / 2, ty0 + j * th + 19, String(j), { fs: 13 });
  let sums = '', s7 = '', dbl = '';
  for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) { const x = tx0 + j * tw, y = ty0 + i * th; sums += Rc(x, y, tw, th, { c: 'wh', rx: 0, sw: 1 }) + T(x + tw / 2, y + 19, String(i + j), { fs: 13 }); if (i + j === 7) s7 += Rc(x + 2, y + 2, tw - 4, th - 4, { c: 'k', rx: 4 }) + T(x + tw / 2, y + 19, '7', { fs: 13, c: 'tw' }); if (i === j) dbl += `<rect x="${x + 3}" y="${y + 3}" width="${tw - 6}" height="${th - 6}" rx="4" fill="none" stroke="#C2332A" stroke-width="2.4"/>`; }
  const vDeux = S(600, 230, st(1, SN(1, 40, 18) + grid + sums + T(450, 50, '6 × 6 = 36 issues', { fs: 15, a: 'start' }))
    + st(2, s7 + SN(2, 430, 90) + T(450, 95, '6 cases de somme 7', { fs: 14, a: 'start' }))
    + st(3, SN(3, 430, 130) + T(450, 135, 'P(7) = 6/36 = 1/6', { fs: 15, a: 'start', c: 'kt' }))
    + st(4, dbl + SN(4, 430, 170) + T(450, 175, 'doubles : 6/36 = 1/6', { fs: 14, a: 'start', c: 'kt' })),
  'Le tableau des 36 sommes de deux dés ; 6 cases valent 7 ; 6 cases sont des doubles');
  // 4. la fréquence se rapproche de la probabilité
  const g4 = MCVP.plot({ W: 600, H: 230, x: [0, 1000, 100], y: [0, .7, .1], ml: 44, mr: 200, mt: 14, mb: 28, fs: 10, lx: 2, xl: 'lancers', yl: 'fréquence' });
  let d4 = ''; for (let n = 10; n <= 1000; n += 5) d4 += (d4 ? 'L' : 'M') + g4.X(n).toFixed(1) + ' ' + g4.Y(F[n - 1]).toFixed(1);
  const vFreq = g4.wrap(g4.base + st(1, SN(1, 418, 30) + MCVP.T(436, 35, 'probabilité : 0,3', { fs: 13, a: 'start' }) + g4.seg(0, .3, 1000, .3, { stroke: '#C2332A', dash: '8 5', w: 2.2 }))
    + st(2, `<path d="${d4}" fill="none" class="ks" stroke-width="2.2"/>` + g4.dot(10, F[9], { r: 4.5 }) + SN(2, 418, 74) + MCVP.T(436, 79, '10 lancers : 0,6', { fs: 13, a: 'start' }))
    + st(3, g4.dot(1000, f1000, { r: 4.5 }) + SN(3, 418, 118) + MCVP.T(436, 123, `1 000 lancers : ${String(f1000).replace('.', ',')}`, { fs: 13, a: 'start' }))
    + st(4, SN(4, 418, 162) + MCVP.T(436, 167, 'la fréquence se', { fs: 13, a: 'start', c: 'kt' }) + MCVP.T(436, 185, 'rapproche de 0,3', { fs: 13, a: 'start', c: 'kt' })));

  c.notions = [
    { titre: 'Calculer une probabilité', decouvre: { txt: `Dans un jeu de rôle, on lance un ${H('dé équilibré à 20 faces')}, numérotées de 1 à 20. Pour réussir une action, il faut obtenir ${H('15 ou plus')}. Quelle est la probabilité de réussir ?`, img: skD20() },
      methode: ['Je liste les issues possibles : 1, 2, …, 20. Le dé est équilibré : elles ont toutes la même chance.', 'Je repère les issues favorables à l’événement « 15 ou plus » : 15, 16, 17, 18, 19, 20.', 'Je compte : 6 issues favorables sur 20 issues possibles.', 'Je calcule : P = 6/20 = 3/10 = 0,3.'],
      vois: vD20,
      solution: `<p>${FM(R`P(\text{15 ou plus})=\dfrac{6}{20}=\dfrac{3}{10}=0{,}3`)}</p><p>On a <b>30 %</b> de chances de réussir l’action, soit 3 chances sur 10.</p>`,
      retiens: `<p>Quand les issues sont <b>équiprobables</b> : ${FM(R`P(A)=\dfrac{\text{nombre d’issues favorables}}{\text{nombre d’issues possibles}}`)}</p><p>Une probabilité est toujours comprise entre 0 et 1.</p>`,
      attention: 'Ce calcul ne marche que si toutes les issues ont la même chance : le dé doit être équilibré.',
      amoi: [['P(obtenir 20) ?', '1/20 = 0,05'], ['P(obtenir un nombre pair) ?', '10/20 = 0,5']] },
    { titre: 'Événement contraire, impossible, certain', decouvre: { txt: `Avec le même dé, un ${H('échec critique')} arrive quand on obtient ${H('1')}. Quelle est la probabilité de ne pas faire d’échec critique ? Et celle d’obtenir 21 ?`, img: skEchec() },
      methode: ['Je calcule la probabilité de l’événement A, « obtenir 1 » : P(A) = 1/20 = 0,05.', 'Le contraire de A, « ne pas obtenir 1 », rassemble toutes les autres issues : P = 1 − 0,05 = 0,95.', 'Obtenir 21 est impossible : aucune face ne porte 21. Sa probabilité est 0.', 'Obtenir un nombre entre 1 et 20 est certain : sa probabilité est 1.'],
      vois: vEch,
      solution: '<p>La probabilité de ne pas faire d’échec critique est <b>0,95</b>, soit 95 %.</p><p>Obtenir 21 est un événement <b>impossible</b> : probabilité 0.</p>',
      retiens: `<p>L’<b>événement contraire</b> de A, noté « non A », se réalise quand A ne se réalise pas : ${FM(R`P(\text{non }A)=1-P(A)`)}</p><p>Un événement <b>impossible</b> a une probabilité de 0, un événement <b>certain</b> une probabilité de 1.</p>`,
      attention: '« Ne pas obtenir 1 » n’est pas « obtenir 20 » : c’est obtenir 2, 3, …, ou 20.',
      amoi: [['P(A) = 0,3. Calcule P(non A).', '0,7'], ['P(obtenir 0 avec ce dé) ?', '0 : impossible']] },
    { titre: 'Une expérience à deux épreuves', decouvre: { txt: `Dans un jeu de plateau (fictif), on lance ${H('deux dés équilibrés à 6 faces')} et on additionne. Quelle est la probabilité d’obtenir ${H('une somme de 7')} ? Et d’obtenir un double ?`, img: skDeuxDes() },
      methode: ['Je construis un tableau à double entrée : un dé en ligne, l’autre en colonne. Il y a 6 × 6 = 36 issues équiprobables.', 'Je repère les cases où la somme vaut 7 : il y en a 6.', 'Je calcule : P(somme 7) = 6/36 = 1/6.', 'Les doubles sont sur la diagonale : 6 cases, P = 6/36 = 1/6.'],
      vois: vDeux,
      solution: `<p>${FM(R`P(\text{somme }7)=\dfrac{6}{36}=\dfrac16`)} et ${FM(R`P(\text{double})=\dfrac{6}{36}=\dfrac16`)}</p><p>La somme 7 est la plus probable : c’est celle qui a le plus de cases.</p>`,
      retiens: '<p>Pour une expérience à <b>deux épreuves</b>, on liste toutes les issues avec un <b>tableau à double entrée</b> ou un <b>arbre</b>.</p><p>Nombre d’issues = nombre d’issues de la 1re épreuve × nombre d’issues de la 2de.</p>',
      attention: 'Les sommes ne sont pas équiprobables : la somme 2 n’a qu’une case (1/36), la somme 7 en a six (6/36).',
      amoi: [['P(somme = 12) ?', '1/36'], ['Combien d’issues pour un dé à 6 faces et une pièce ?', '6 × 2 = 12']] },
    { titre: 'Fréquence et probabilité', decouvre: { txt: `Un programme Scratch simule ${H('1 000 lancers')} du dé à 20 faces. Il obtient « 15 ou plus » ${H(OK1000 + ' fois')}. Est-ce cohérent avec la probabilité 0,3 ?`, img: skSimu() },
      methode: ['Je trace la probabilité théorique : une ligne à 0,3.', 'Je regarde la fréquence au début : après 10 lancers, elle vaut 0,6, loin de 0,3.', `Je calcule la fréquence finale : ${OK1000} ÷ 1 000 = ${String(f1000).replace('.', ',')}.`, 'Je conclus : quand le nombre de lancers augmente, la fréquence se rapproche de la probabilité.'],
      vois: vFreq,
      solution: `<p>La fréquence observée, ${String(f1000).replace('.', ',')}, est proche de la probabilité 0,3 : le résultat est <b>cohérent</b>.</p><p>Avec 10 lancers seulement, la fréquence (0,6) était très éloignée.</p>`,
      retiens: '<p>Quand on répète une expérience aléatoire un grand nombre de fois, la <b>fréquence</b> d’un événement se rapproche de sa <b>probabilité</b>.</p><p>Une simulation (Scratch, tableur) permet d’estimer une probabilité qu’on ne sait pas calculer.</p>',
      attention: 'Sur peu de lancers, la fréquence peut être très loin de la probabilité : ce n’est pas une erreur.',
      amoi: [['Fréquence de 42 succès sur 200 lancers ?', '0,21'], ['Sur 10 000 lancers du D20, combien de 20 environ ?', '10 000 × 1/20 = 500']] }];
  chk(42 / 200 === .21 && 10000 / 20 === 500, 'c7 « À moi »');

  c.mots = [['expérience aléatoire', 'une expérience dont on connaît les issues, sans savoir laquelle va arriver', 'lancer un dé à 20 faces'], ['issue', 'un résultat possible', '17 est une issue'], ['événement', 'un ensemble d’issues', '« 15 ou plus »'], ['équiprobable', 'qui a la même chance que les autres', 'les 20 faces d’un dé équilibré'], ['probabilité', 'un nombre entre 0 et 1 qui mesure la chance', 'P(« 15 ou plus ») = 0,3'], ['événement contraire', 'se réalise quand l’événement ne se réalise pas', 'P(non A) = 1 − P(A)']];

  c.scratch = [{ titre: 'simuler 1 000 lancers', lc: 4, texte: 'La variable « succès » compte les lancers qui donnent 15 ou plus.',
    prog: [{ c: 'evt', t: 'quand ⚑ est cliqué' }, { c: 'var', t: 'mettre succès à 0' }, { c: 'ctl', t: 'répéter 1000 fois', open: 2 }, { c: 'var', t: 'mettre dé à (nombre aléatoire entre 1 et 20)', d: 1 }, { c: 'ctl', t: 'si dé > 14 alors', d: 1, open: 1 }, { c: 'var', t: 'ajouter 1 à succès', d: 2 }, { c: 'ctl', t: '', end: true, d: 1 }, { c: 'ctl', t: '', end: true }, { c: 'look', t: 'dire (succès / 1000)' }],
    qs: [['Combien de nombres le programme tire-t-il ?', '1 000', 'La boucle « répéter 1000 fois » tire 1 000 nombres entre 1 et 20.'], ['Autour de quelle valeur « succès » sera-t-il, en général ?', 'environ 300', '1 000 × 0,3 = 300 : la fréquence affichée sera proche de 0,3.'], ['Que faut-il changer pour simuler « obtenir 20 » ?', 'si dé = 20 alors', 'On remplace la condition par « dé = 20 » : la fréquence sera proche de 1/20 = 0,05.']] }];

  c.resolus = [
    { titre: 'Utiliser l’événement contraire', outil: '✏️ à la main', enonce: `On lance un dé équilibré à 12 faces. Calcule la probabilité de ${H('ne pas obtenir un multiple de 5')}.`,
      rows: [['multiples de 5 : 5 et 10, soit 2 issues', 'Je cherche d’abord l’événement A, plus simple.'], ['P(A) = 2/12 = 1/6', 'Issues favorables ÷ issues possibles.'], ['P(non A) = 1 − 1/6', 'Le contraire de A.'], ['P(non A) = 5/6', 'Je calcule : 6/6 − 1/6 = 5/6.']], verif: '10 issues ne sont pas des multiples de 5 : 10/12 = 5/6 ✓', rep: 'La probabilité est 5/6.', go: ['e1'] },
    { titre: 'À toi : utiliser l’événement contraire', outil: '✏️ à la main', enonce: `On lance un dé équilibré à 20 faces. Calcule la probabilité de ${H('ne pas obtenir un multiple de 4')}.`, trous: [0, 1, 2, 3],
      rows: [['multiples de 4 : 4, 8, 12, 16, 20, soit ⟦5⟧ issues', 'Je cherche d’abord A.'], ['P(A) = 5/20 = ⟦1/4⟧', 'Issues favorables ÷ issues possibles.'], ['P(non A) = 1 − ⟦1/4⟧', 'Le contraire de A.'], ['P(non A) = ⟦3/4⟧', 'Je calcule.']], verif: '15 issues sur 20 ne sont pas des multiples de 4 : 15/20 = 3/4 ✓', rep: 'La probabilité est 3/4.', go: ['e1'] }];
  c.entraine = [{ id: 'e1', gen: 'c7e1', lc: 1 }, { id: 'e2', gen: 'c7e2', lc: 3 }, { id: 'e3', gen: 'c7e3', lc: 4 }];

  /* ---------- je résous ---------- */
  chk(3 / 20 === .15 && 17 / 20 === .85 && 4 / 20 === .2 && 10 / 20 === .5, 'c7 problème 1');
  chk(Math.abs(1 / 25 - .04) < 1e-12 && Math.abs(16 / 25 - .64) < 1e-12 && Math.abs(1 - 16 / 25 - .36) < 1e-12 && Math.round(500 * .36) === 180, 'c7 problème 2');
  const f7 = Math.round(SUM[7] / 600 * 1000) / 1000, fD = Math.round(DBL / 600 * 1000) / 1000;
  chk(f7 === .182 && fD === .155, 'c7 problème 3');
  c.probs = [
    PB({ id: 'p1', etape: 2, lc: 2, comps: ['che', 'cal'], titre: 'Le dé du maître du jeu',
      intro: `<p>Dans une partie de jeu de rôle, on lance un ${H('dé équilibré à 20 faces')}.</p>`,
      qs: [Q('a.', 'Quelle est la probabilité d’obtenir 18 ou plus ?', '18, 19, 20 : 3/20 = 0,15', .15, { w: 24, tol: .002 }), Q('b.', 'Quelle est la probabilité d’obtenir moins de 18 ?', '1 − 0,15 = 0,85', .85, { w: 24, tol: .002 }), Q('c.', 'Quelle est la probabilité d’obtenir un multiple de 5 ?', '5, 10, 15, 20 : 4/20 = 1/5', .2, { w: 24, tol: .002 }), Q('d.', 'Une attaque réussit avec 11 ou plus. Est-ce « une chance sur deux » ? Justifie.', 'Oui : 11 à 20, c’est 10 issues sur 20, soit 1/2.', null, { lines: 1 })],
      err: { 0: [{ v: 2 / 20, m: 'N’oublie pas 18 : 18, 19 et 20.' }] },
      hints: ['Compte les faces qui conviennent.', 'Moins de 18, c’est le contraire de 18 ou plus.', 'Les multiples de 5 jusqu’à 20 : 5, 10, 15, 20.'], pouce: 'P(18 ou plus) = 3/20 ; P(moins de 18) = 1 − 3/20 ; multiples de 5 : 4 faces.', corr: 'a. 0,15. b. 0,85. c. 0,2. d. oui, 10/20.' }),
    PB({ id: 'p2', etape: 3, lc: 3, defi: 4, bulle: 'Ce cas se fait en 4 étapes. Dessine un arbre : premier booster, puis second booster, avec « rare » et « pas rare » à chaque fois.', autravail: { comp: 'mod', txt: 'estimer combien de pièces défectueuses on risque de trouver dans un lot, à partir d’une probabilité de défaut.' }, comps: ['che', 'mod', 'cal', 'rai'], titre: 'Deux boosters',
      intro: `<p>Dans un jeu de cartes (fictif), chaque booster contient une carte rare avec une probabilité de ${H('1/5')}, indépendamment des autres boosters. On ouvre ${H('deux boosters')}.</p>`,
      qs: [Q('a.', 'Quelle est la probabilité qu’un booster ne contienne pas de carte rare ?', '1 − 1/5 = 4/5', .8, { w: 22, tol: .002 }), Q('b.', 'Quelle est la probabilité d’avoir deux cartes rares ?', '1/5 × 1/5 = 1/25 = 0,04', .04, { w: 22, tol: .002 }), Q('c.', 'Quelle est la probabilité de n’avoir aucune carte rare ?', '4/5 × 4/5 = 16/25 = 0,64', .64, { w: 22, tol: .002 }), Q('d.', 'Déduis-en la probabilité d’avoir au moins une carte rare.', '1 − 0,64 = 0,36', .36, { w: 22, tol: .002 }), Q('e.', 'Sur 500 paires de boosters, combien de fois environ aura-t-on au moins une rare ?', '500 × 0,36 = 180 fois environ', 180, { w: 22, tol: .5 })],
      err: { 1: [{ v: 2 / 5, m: 'Pour deux épreuves à la suite, on multiplie les probabilités le long de la branche.' }], 3: [{ v: .4, m: '« Au moins une » est le contraire de « aucune » : 1 − 0,64.' }] },
      hints: ['Le contraire de « rare » : 1 − 1/5.', 'Sur un arbre, on multiplie les probabilités le long d’une branche.', '« Au moins une rare » est le contraire de « aucune rare ».'], pouce: 'P(pas rare) = 4/5 ; deux rares : 1/5 × 1/5 ; aucune : 4/5 × 4/5 = 16/25 ; au moins une : 1 − 16/25.', corr: 'a. 4/5. b. 1/25. c. 16/25. d. 9/25 = 0,36. e. 180.' }),
    PB({ id: 'p3', etape: 4, lc: 4, cls: 'bac', defi: 5, bulle: 'Voici une question « vers le brevet » : 5 étapes. Distingue bien la probabilité (calculée) et la fréquence (observée).', autravail: { comp: 'rai', txt: 'contrôler une machine : comparer le taux de défauts observé à celui annoncé par le constructeur.' }, comps: ['mod', 'rep', 'rai', 'com'], titre: 'La simulation de deux dés',
      intro: `<p>Un programme Scratch a simulé ${H('600 lancers')} de deux dés équilibrés à 6 faces. Voici les effectifs des sommes obtenues.</p>${tab(['Somme', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], [['Effectif', ...[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(k => String(SUM[k]))]])}<p>Le programme a aussi compté ${H(DBL + ' doubles')}.</p>`,
      qs: [BQ('1', 'Calculer la probabilité d’obtenir une somme de 7. Justifier avec un tableau.', 'mod', '6 cases sur 36 : 6/36 = 1/6 ≈ 0,167', 1 / 6, { lines: 1, tol: .002 }), BQ('2', 'Calculer la fréquence observée de la somme 7, au millième.', 'rep', `${SUM[7]} ÷ 600 ≈ ${String(f7).replace('.', ',')}`, f7, { w: 24, tol: .0006 }), BQ('3', 'La fréquence des doubles est-elle proche de la probabilité d’obtenir un double ? Justifier.', 'rai', `Probabilité 1/6 ≈ 0,167 ; fréquence ${DBL} ÷ 600 ≈ ${String(fD).replace('.', ',')} : c’est proche.`, null, { lines: 2 }), BQ('4', 'D’après le tableau, quelle somme est la plus fréquente ? Est-ce aussi la plus probable ?', 'rep', '7 est la plus fréquente ; c’est aussi la plus probable (6 cases sur 36).', null, { lines: 1 }), BQ('5', 'Que faudrait-il faire pour que les fréquences se rapprochent encore des probabilités ?', 'com', 'Augmenter le nombre de lancers simulés (par exemple 10 000).', null, { lines: 1 })],
      err: { 1: [{ v: SUM[7] / 100, m: 'Divise par le nombre total de lancers, 600.' }] },
      hints: ['Fais le tableau des 36 sommes.', 'Fréquence = effectif ÷ 600.', 'Plus de lancers : la fréquence se rapproche de la probabilité.'], pouce: `P(7) = 6/36 ; fréquence : ${SUM[7]} ÷ 600 ; doubles : 6/36 et ${DBL} ÷ 600.`, corr: `1. 1/6. 2. ${String(f7).replace('.', ',')}. 3. oui, proche. 4. 7. 5. plus de lancers.` })];

  c.bilan = [['Je sais calculer une probabilité.', ['e1', 'p1']], ['Je sais utiliser l’événement contraire.', ['e1', 'p1', 'p2']], ['Je sais étudier deux épreuves.', ['e2', 'p2', 'p3']], ['Je sais comparer fréquence et probabilité.', ['e3', 'p3']]];
  c.words = require('./gl3')('c7');
  return c;
};
