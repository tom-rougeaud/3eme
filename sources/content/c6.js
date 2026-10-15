/* Chapitre 6 · Statistiques — 3ème Série Pro (programme du cycle 4, BO n° 31 du 30 juillet 2020). */
'use strict';
const K = require('./kit3e');
const { H, FM, R, Q, BQ, PB, S, T, Rc, Ar, st, SN, Sketch, MCVP, tab } = K;
const { D, SV, tt, fill } = require('./sk3');

module.exports = function (chk) {
  const c = { id: 'c6', n: 6, col: 'donnees', icone: '📊', dom: 'Organisation et gestion de données · statistiques', titre: 'Statistiques', sous: 'Moyenne, médiane, étendue, diagrammes et tableur' };
  c.parties = [{ t: 'Résumer une série', n: [1, 2] }, { t: 'Lire et traiter des données', n: [3, 4] }];
  c.travail = { question: `Les Simpson : ${H('36 saisons')} terminées, ${H('790 épisodes')}. Le cinéma en France : ${H('156,8 millions')} d’entrées en 2025. Comment résumer ces séries de nombres en quelques valeurs, et les comparer ? Tu sauras répondre aux notions 1, 2 et 3.` };
  c.objectifs = ['Je saurai calculer une moyenne, simple ou pondérée.', 'Je saurai déterminer une médiane et une étendue, et les interpréter.', 'Je saurai lire et comparer des diagrammes.', 'Je saurai calculer des fréquences et utiliser un tableur.'];
  c.depart = 'c6';
  const SIMP = D.simpsons, sum = a => a.reduce((x, y) => x + y, 0);
  chk(SIMP.length === 36 && sum(SIMP) === 790 && sum(SIMP.slice(0, 10)) === 226 && SIMP.filter(v => v === 22).length === 21, 'c6 données des Simpson');
  const TOP = D.top2025.map(x => x[1]), TS = TOP.slice().sort((a, b) => a - b);
  chk(Math.abs(sum(TOP) - 35.4) < 1e-9 && Math.abs((TS[4] + TS[5]) / 2 - 2.96) < 1e-9 && Math.abs(TS[9] - TS[0] - 3.72) < 1e-9, 'c6 top 10');
  const M25 = D.cnc2025, M24 = D.cnc2024;
  chk(Math.abs(sum(M25) - 156.66) < 1e-9 && Math.abs(sum(M24) - 181.54) < 1e-9 && M25.filter((v, i) => v > M24[i]).length === 2, 'c6 entrées mensuelles');

  /* ---------- illustrations « Je découvre » ---------- */
  const skSaisons = () => { const k = Sketch(761); let s = fill(18, 18, 120, 80, .45, 'k2', 6) + k.P(k.rect(18, 18, 120, 80)) + k.P(k.line(78, 98, 78, 110) + k.line(56, 112, 100, 112), { w: 2 }) + tt(78, 54, '10', 22) + tt(78, 78, 'saisons', 12); return SV(s + tt(166, 58, '226', 15) + tt(166, 78, 'épisodes', 10) + tt(100, 126, 'en moyenne ?', 11), 'Un téléviseur : dix saisons, 226 épisodes'); };
  const skClap = () => { const k = Sketch(762); return SV(fill(40, 46, 120, 64, .9, 'k2', 4) + k.P(k.rect(40, 46, 120, 64)) + k.P(k.poly([[40, 46], [44, 22], [162, 10], [160, 34]], true), { w: 2.4 }) + tt(100, 84, 'TOP 10', 18) + tt(100, 104, '2025', 12) + tt(100, 126, 'entrées en millions', 11), 'Un clap de cinéma : le top 10 de 2025'); };
  const skBarres = () => { const k = Sketch(763); let s = k.P(k.line(16, 104, 186, 104) + k.line(16, 104, 16, 14), { w: 2 }); M25.forEach((v, i) => { s += fill(22 + i * 13.5, 104 - v * 4, 10, v * 4, .9, i === 11 ? 'k' : 'k2', 1); }); return SV(s + tt(100, 124, 'entrées par mois, 2025', 11), 'Un diagramme en barres des entrées mois par mois'); };
  const skTableur = () => { const k = Sketch(764); let s = ''; for (let r = 0; r < 5; r++) for (let q = 0; q < 3; q++) s += `<rect x="${24 + q * 52}" y="${16 + r * 18}" width="52" height="18" class="${r === 0 || q === 0 ? 'k2' : 'wh'} ks" stroke-width="1"/>`; s += tt(50, 29, 'A', 10) + tt(102, 29, 'B', 10) + tt(154, 29, 'C', 10) + tt(102, 47, '22', 11) + tt(102, 65, '21', 11) + tt(102, 83, '23', 11); return SV(s + tt(100, 120, '=NB.SI(B2:B37;22)', 12), 'Une feuille de tableur avec une formule'); };

  /* ---------- méthodes visuelles ---------- */
  const side = (x, y, s, o = {}) => MCVP.T(x, y, s, { fs: 13, a: 'start', c: o.c || 'tx' });
  // 1. moyenne des saisons 1 à 10
  const S10 = SIMP.slice(0, 10);
  const g1 = MCVP.plot({ W: 600, H: 230, x: [0, 10, 1], y: [0, 26, 2], ml: 36, mr: 230, mt: 12, mb: 30, fs: 10, ly: 2, yl: 'épisodes', xt: S10.map((_, i) => [i + .5, String(i + 1)]) });
  const vMoy = g1.wrap(g1.base + st(1, S10.map((v, i) => `<rect x="${g1.X(i + .15)}" y="${g1.Y(v)}" width="${g1.X(.7) - g1.X(0)}" height="${g1.Y(0) - g1.Y(v)}" class="k2 ks" stroke-width="1.2"/>`).join('') + SN(1, 386, 28) + side(404, 33, 'les 10 saisons'))
    + st(2, SN(2, 386, 72) + side(404, 77, 'somme : 226 épisodes'))
    + st(3, SN(3, 386, 116) + side(404, 121, '226 ÷ 10 = 22,6', { c: 'kt' }) + g1.seg(0, 22.6, 10, 22.6, { stroke: '#C2332A', w: 2.6, dash: '8 5' }) + g1.txt(10, 22.6, '22,6', { dx: 4, dy: -4, a: 'start', fill: '#C2332A' }))
    + st(4, SN(4, 386, 160) + side(404, 165, '13 ×1, 22 ×3, 23 ×1,') + side(404, 185, '24 ×1, 25 ×4 : même total')));
  // 2. médiane et étendue du top 10
  const bx = i => 22 + i * 56;
  const vMed = S(600, 230, st(1, SN(1, 22, 24) + T(44, 30, 'je range les entrées (en millions) dans l’ordre croissant', { fs: 14, a: 'start', c: 'ts' }) + TS.map((v, i) => Rc(bx(i), 46, 50, 40, { c: i === 4 || i === 5 ? 'k' : 'k2', rx: 6 }) + T(bx(i) + 25, 72, String(v).replace('.', ','), { fs: 14, c: i === 4 || i === 5 ? 'tw' : 'tx' })).join(''))
    + st(2, SN(2, 22, 112) + `<path d="M${bx(4) + 4} 94q0 10 10 10H${bx(5) + 36}q10 0 10-10" fill="none" class="ks" stroke-width="2"/>` + T(300, 124, 'médiane : (2,95 + 2,97) ÷ 2 = 2,96', { fs: 15, c: 'kt' }))
    + st(3, SN(3, 22, 162) + Ar(bx(0) + 25, 150, bx(9) + 25, 150, { w: 2, h: 8 }) + `<path d="M${bx(9) + 25} 150L${bx(0) + 25} 150" class="ks" stroke-width="2"/>` + T(300, 172, 'étendue : 6,18 − 2,46 = 3,72', { fs: 15, c: 'kt' }))
    + st(4, SN(4, 22, 206) + T(44, 212, '5 films en dessous de 2,96 millions, 5 au-dessus', { fs: 14, a: 'start' })),
  'Les entrées des dix films rangées ; la médiane 2,96 est entre la 5e et la 6e valeur ; l’étendue vaut 3,72');
  // 3. les entrées 2024 et 2025, mois par mois
  const MO = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  const g3 = MCVP.plot({ W: 600, H: 230, x: [0, 12, 1], y: [0, 22, 2], ml: 36, mr: 12, mt: 34, mb: 26, fs: 10, ly: 2, xt: MO.map((m, i) => [i + .5, m]) });
  const b3 = (arr, off, cls) => arr.map((v, i) => `<rect x="${g3.X(i + off)}" y="${g3.Y(v)}" width="${g3.X(.36) - g3.X(0)}" height="${g3.Y(0) - g3.Y(v)}" class="${cls} ks" stroke-width="1"/>`).join('');
  const vDia = g3.wrap(g3.base + st(1, SN(1, 22, 15) + MCVP.T(40, 20, 'millions d’entrées par mois', { fs: 12, a: 'start', c: 'ts' }) + `<rect x="330" y="9" width="14" height="14" class="k ks"/><rect x="420" y="9" width="14" height="14" class="k2 ks"/>` + MCVP.T(350, 20, '2025', { fs: 12, a: 'start' }) + MCVP.T(440, 20, '2024', { fs: 12, a: 'start' }))
    + st(2, b3(M25, .5, 'k') + SN(2, g3.X(11.5) + 4, g3.Y(20.73) - 6))
    + st(3, b3(M24, .14, 'k2') + SN(3, g3.X(6.3), g3.Y(17.9) - 14))
    + st(4, SN(4, 64, 52) + MCVP.T(82, 57, '2025 : 156,8 M · 2024 : 181,5 M · − 13,6 %', { fs: 13, a: 'start', c: 'kt' })));
  // 4. fréquences et tableur
  const VAL = [13, 18, 20, 21, 22, 23, 24, 25], EFF = VAL.map(v => SIMP.filter(x => x === v).length);
  chk(sum(EFF) === 36 && EFF[4] === 21 && EFF.join() === '1,1,1,4,21,3,1,4', 'c6 tableau des effectifs');
  const cw = 58, cx0 = 116;
  const vFreq = S(600, 230, st(1, SN(1, 22, 30) + Rc(20, 18, 96, 30, { c: 'k2', rx: 0 }) + T(68, 38, 'épisodes', { fs: 12 }) + Rc(20, 48, 96, 30, { c: 'k2', rx: 0 }) + T(68, 68, 'effectif', { fs: 12 }) + VAL.map((v, i) => Rc(cx0 + i * cw, 18, cw, 30, { c: 'wh', rx: 0 }) + T(cx0 + i * cw + cw / 2, 38, String(v), { fs: 14 }) + Rc(cx0 + i * cw, 48, cw, 30, { c: i === 4 ? 'k' : 'wh', rx: 0 }) + T(cx0 + i * cw + cw / 2, 68, String(EFF[i]), { fs: 14, c: i === 4 ? 'tw' : 'tx' })).join(''))
    + st(2, SN(2, 22, 104) + T(44, 109, 'total : 1 + 1 + 1 + 4 + 21 + 3 + 1 + 4 = 36 saisons', { fs: 14, a: 'start' }))
    + st(3, SN(3, 22, 142) + T(44, 147, 'fréquence de 22 : 21 ÷ 36 ≈ 0,583, soit 58,3 %', { fs: 15, a: 'start', c: 'kt' }))
    + st(4, SN(4, 22, 196) + Rc(44, 172, 260, 46, { c: 'k2', rx: 8 }) + T(174, 191, '=NB.SI(B2:B37;22)', { fs: 13 }) + T(174, 210, '→ 21', { fs: 13, c: 'kt' }) + Rc(316, 172, 264, 46, { c: 'k2', rx: 8 }) + T(448, 191, '=MOYENNE(B2:B37)', { fs: 13 }) + T(448, 210, '→ 21,94', { fs: 13, c: 'kt' })),
  'Tableau des effectifs des 36 saisons ; 22 épisodes apparaît 21 fois sur 36, soit 58,3 % ; formules de tableur');
  chk(cx0 + 8 * cw <= 590, 'c6 tableau dans le cadre');

  c.notions = [
    { titre: 'Calculer une moyenne', decouvre: { txt: `Les 10 premières saisons des Simpson comptent ${H('13, 22, 24, 22, 22, 25, 25, 25, 25 et 23')} épisodes. Combien d’épisodes par saison, en moyenne ?`, img: skSaisons() },
      methode: ['Je trace ou je lis les valeurs : une barre par saison.', 'J’additionne toutes les valeurs : 226 épisodes.', 'Je divise par le nombre de valeurs, 10 : 226 ÷ 10 = 22,6.', 'Avec un tableau d’effectifs, je multiplie chaque valeur par son effectif avant d’additionner : c’est la moyenne pondérée.'],
      vois: vMoy,
      solution: `<p>Les 10 premières saisons comptent en moyenne <b>22,6 épisodes</b>.</p><p>La ligne rouge « répartit » les épisodes : certaines saisons sont au-dessus, d’autres en dessous.</p><p class="srcl">${D.srcSimpsons}</p>`,
      retiens: `<p><b>Moyenne</b> = somme des valeurs ÷ nombre de valeurs.</p><p><b>Moyenne pondérée</b> : ${FM(R`\dfrac{v_1\times n_1+v_2\times n_2+\dots}{n_1+n_2+\dots}`)}</p>`,
      attention: 'La moyenne n’est pas forcément une des valeurs : aucune saison n’a 22,6 épisodes.',
      amoi: [['Moyenne de 12, 15 et 18 ?', '15'], ['Notes 10 (coefficient 1) et 16 (coefficient 2). Moyenne ?', '(10 + 32) ÷ 3 = 14']] },
    { titre: 'Médiane et étendue', decouvre: { txt: `Voici les entrées en France, en millions, des 10 films les plus vus de 2025 : ${H('6,18 ; 5,10 ; 4,58 ; 3,31 ; 2,97 ; 2,95 ; 2,66 ; 2,64 ; 2,55 ; 2,46')}. Quelle valeur coupe la série en deux ? Les films sont-ils proches les uns des autres ?`, img: skClap() },
      methode: ['Je range les valeurs dans l’ordre croissant.', 'Il y a 10 valeurs (nombre pair) : la médiane est entre la 5e et la 6e, (2,95 + 2,97) ÷ 2.', 'L’étendue mesure l’écart entre les extrêmes : 6,18 − 2,46.', 'J’interprète : la moitié des films sont en dessous de la médiane.'],
      vois: vMed,
      solution: `<p><b>Médiane : 2,96 millions</b> d’entrées. <b>Étendue : 3,72 millions</b>.</p><p>La moyenne vaut 35,4 ÷ 10 = 3,54 millions : elle est tirée vers le haut par le film le plus vu (6,18).</p><p class="srcl">${D.srcTop}</p>`,
      retiens: '<p>La <b>médiane</b> partage la série rangée en deux groupes de même effectif. Effectif impair : la valeur du milieu. Effectif pair : la moyenne des deux valeurs du milieu.</p><p>L’<b>étendue</b> = plus grande valeur − plus petite valeur. Elle mesure la dispersion.</p>',
      attention: 'Il faut ranger les valeurs avant de chercher la médiane.',
      amoi: [['Médiane de 4 ; 9 ; 2 ; 7 ; 5 ?', '5'], ['Étendue de cette série ?', '9 − 2 = 7']] },
    { titre: 'Lire et comparer des diagrammes', decouvre: { txt: `Le diagramme donne les entrées au cinéma en France, mois par mois, en ${H('2024')} et en ${H('2025')}. Quel a été le meilleur mois de 2025 ? Quels mois de 2025 ont fait mieux qu’en 2024 ?`, img: skBarres() },
      methode: ['Je lis le titre, l’unité (millions d’entrées) et la légende (2024, 2025).', 'Je repère la barre de 2025 la plus haute : décembre, 20,73 millions.', 'Je compare les deux barres de chaque mois : seuls janvier et décembre 2025 dépassent 2024.', 'Je calcule l’évolution sur l’année : (156,8 − 181,5) ÷ 181,5 ≈ − 13,6 %.'],
      vois: vDia,
      solution: `<p>Le meilleur mois de 2025 est <b>décembre</b> (20,73 millions d’entrées).</p><p>Seuls <b>janvier et décembre</b> 2025 font mieux qu’en 2024. Sur l’année, les entrées baissent d’environ 13,6 %.</p><p class="srcl">${D.srcCnc}</p>`,
      retiens: '<p>Avant de lire un diagramme : le <b>titre</b>, les <b>axes</b>, les <b>unités</b> et la <b>légende</b>.</p><p>Diagramme en barres : comparer des effectifs. Courbe : suivre une évolution. Diagramme circulaire : voir une répartition.</p>',
      attention: 'Si l’axe vertical ne commence pas à 0, les différences paraissent plus grandes qu’elles ne le sont.',
      amoi: [['Entrées en août 2025 ?', '9,94 millions'], ['Écart entre décembre et août 2025 ?', '10,79 millions']] },
    { titre: 'Fréquences et tableur', decouvre: { txt: `Sur les ${H('36 saisons')} terminées des Simpson, combien comptent exactement ${H('22 épisodes')} ? Quelle part des saisons cela représente-t-il ? Comment le faire calculer par un tableur ?`, img: skTableur() },
      methode: ['Je compte combien de fois chaque valeur apparaît : c’est le tableau des effectifs.', 'Je vérifie que le total des effectifs fait bien 36.', 'Fréquence = effectif ÷ effectif total : 21 ÷ 36 ≈ 0,583, soit 58,3 %.', 'Au tableur : =NB.SI(B2:B37;22) compte les 22, =MOYENNE(B2:B37) donne la moyenne.'],
      vois: vFreq,
      solution: `<p><b>21 saisons sur 36</b> comptent 22 épisodes : une fréquence de 21/36 ≈ <b>58,3 %</b>.</p><p>En moyenne, une saison compte 790 ÷ 36 ≈ 21,94 épisodes.</p>`,
      retiens: '<p><b>Fréquence</b> d’une valeur = son effectif ÷ effectif total. Elle est entre 0 et 1 ; en %, on multiplie par 100. La somme des fréquences vaut 1.</p><p>Au tableur : =MOYENNE( ), =MEDIANE( ), =MAX( ) − MIN( ), =NB.SI( ).</p>',
      attention: 'Dans une formule de tableur, la plage B2:B37 doit contenir toutes les valeurs, et seulement elles.',
      amoi: [['12 saisons sur 36 : fréquence en % ?', '33,3 %'], ['Formule de la médiane de B2 à B37 ?', '=MEDIANE(B2:B37)']] }];
  chk((12 + 15 + 18) / 3 === 15 && (10 + 32) / 3 === 14 && Math.abs(20.73 - 9.94 - 10.79) < 1e-9, 'c6 « À moi »');

  c.mots = [['moyenne', 'somme des valeurs ÷ nombre de valeurs', '226 ÷ 10 = 22,6'], ['moyenne pondérée', 'moyenne où chaque valeur compte selon son effectif ou son coefficient', '(10 × 1 + 16 × 2) ÷ 3 = 14'], ['médiane', 'valeur qui partage la série rangée en deux groupes de même effectif', 'top 10 : 2,96 millions'], ['étendue', 'plus grande valeur − plus petite valeur', '6,18 − 2,46 = 3,72'], ['effectif', 'nombre de fois qu’une valeur apparaît', '22 épisodes : effectif 21'], ['fréquence', 'effectif ÷ effectif total', '21 ÷ 36 ≈ 58,3 %']];

  c.resolus = [
    { titre: 'Calculer une médiane (effectif impair)', outil: '✏️ à la main', enonce: `Durées, en minutes, de 7 films vus par un ciné-club (fictif) : ${H('149 ; 134 ; 181 ; 124 ; 143 ; 130 ; 135')}. Calcule la médiane et l’étendue.`,
      rows: [['124 ; 130 ; 134 ; 135 ; 143 ; 149 ; 181', 'Je range dans l’ordre croissant.'], ['7 valeurs : (7 + 1) ÷ 2 = 4e valeur', 'Effectif impair : je cherche la valeur du milieu.'], ['médiane : 135 min', 'La 4e valeur rangée.'], ['étendue : 181 − 124 = 57 min', 'Plus grande − plus petite.']], verif: '3 valeurs avant 135, 3 valeurs après ✓', rep: 'Médiane : 135 min ; étendue : 57 min.', go: ['e2'] },
    { titre: 'À toi : calculer une médiane (effectif pair)', outil: '✏️ à la main', enonce: `Scores de 8 parties (fictives) : ${H('46 ; 52 ; 38 ; 61 ; 49 ; 55 ; 40 ; 58')}. Calcule la médiane et l’étendue.`, trous: [0, 1, 2, 3],
      rows: [['38 ; 40 ; 46 ; ⟦49⟧ ; 52 ; 55 ; 58 ; 61', 'Je range dans l’ordre croissant.'], ['8 valeurs : entre la 4e et la ⟦5e⟧', 'Effectif pair : deux valeurs au milieu.'], ['médiane : (49 + 52) ÷ 2 = ⟦50,5⟧', 'Je fais la moyenne des deux valeurs du milieu.'], ['étendue : 61 − 38 = ⟦23⟧', 'Plus grande − plus petite.']], verif: '4 valeurs avant 50,5, 4 après ✓', rep: 'Médiane : 50,5 ; étendue : 23.', go: ['e2'] }];
  chk((49 + 52) / 2 === 50.5 && 61 - 38 === 23 && 181 - 124 === 57, 'c6 résolus');
  c.entraine = [{ id: 'e1', gen: 'c6e1', lc: 1 }, { id: 'e2', gen: 'c6e2', lc: 2 }, { id: 'e3', gen: 'c6e3', lc: 3 }];

  /* ---------- je résous ---------- */
  chk(Math.abs(790 / 36 - 21.94) < .01 && 25 - 13 === 12 && SIMP.filter(v => v >= 23).length === 8 && 800 - 790 === 10, 'c6 problème 1');
  chk(Math.abs(156.66 / 12 - 13.055) < 1e-9 && Math.abs(((M25.slice().sort((a, b) => a - b))[5] + (M25.slice().sort((a, b) => a - b))[6]) / 2 - 12.78) < 1e-9 && Math.round((156.66 - 181.54) / 181.54 * 1000) === -137, 'c6 problème 2');
  chk(Math.round(6.18 / 35.4 * 1000) === 175 && Math.abs(35.4 / 10 - 3.54) < 1e-9, 'c6 problème 3');
  c.probs = [
    PB({ id: 'p1', etape: 2, lc: 1, comps: ['che', 'cal'], titre: '36 saisons des Simpson',
      intro: `<p>Les ${H('36 premières saisons')} des Simpson comptent ${H('790 épisodes')} en tout. La plus courte en compte ${H('13')}, la plus longue ${H('25')}. ${H('8 saisons')} comptent 23 épisodes ou plus.</p><p class="srcl">${D.srcSimpsons}</p>`,
      qs: [Q('a.', 'Calcule le nombre moyen d’épisodes par saison, au centième.', '790 ÷ 36 ≈ 21,94', 21.94, { w: 24, tol: .006 }), Q('b.', 'Calcule l’étendue de la série.', '25 − 13 = 12 épisodes', 12, { w: 22 }), Q('c.', 'Quelle est la fréquence des saisons de 23 épisodes ou plus, en % au dixième ?', '8 ÷ 36 ≈ 22,2 %', 22.2, { w: 22, tol: .05, lab: 'en % :' }), Q('d.', 'Le 800e épisode a été diffusé pendant la saison 37. Quel est son numéro dans cette saison ?', '800 − 790 = 10 : c’est le 10e épisode.', 10, { w: 22 })],
      err: { 0: [{ v: 36 / 790, m: 'On divise le nombre d’épisodes par le nombre de saisons.' }], 2: [{ v: 8 / 790 * 100, m: 'On compare au nombre de saisons, 36.' }] },
      hints: ['Moyenne = total ÷ nombre de saisons.', 'Étendue = plus grande − plus petite valeur.', 'Fréquence = 8 ÷ 36, puis × 100.'], pouce: '790 ÷ 36 ; 25 − 13 ; 8 ÷ 36 × 100 ; 800 − 790.', corr: 'a. 21,94. b. 12. c. 22,2 %. d. 10e.' }),
    PB({ id: 'p2', etape: 3, lc: 3, defi: 4, bulle: 'Ce cas se fait en 4 étapes. Commence par ranger les 12 valeurs de 2025 : la médiane en dépend.', autravail: { comp: 'rep', txt: 'tenir un tableau de bord de fréquentation et le présenter en réunion avec un diagramme.' }, comps: ['che', 'rep', 'cal', 'com'], titre: 'Une année de cinéma',
      intro: `<p>Entrées au cinéma en France en 2025, en millions, de janvier à décembre :</p>${tab(['Mois', 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'], [['2025', ...M25.map(v => String(v).replace('.', ','))]])}<p>En 2024, il y avait eu ${H('181,54 millions')} d’entrées en tout.</p><p class="srcl">${D.srcCnc}</p>`,
      qs: [Q('a.', 'Calcule le total des entrées de 2025.', '156,66 millions', 156.66, { w: 26, tol: .006, lab: 'en millions :' }), Q('b.', 'Calcule la moyenne mensuelle, au centième.', '156,66 ÷ 12 ≈ 13,06 millions', 13.06, { w: 24, tol: .006 }), Q('c.', 'Calcule la médiane des 12 mois.', '6e et 7e valeurs rangées : (12,72 + 12,84) ÷ 2 = 12,78', 12.78, { w: 24, tol: .006 }), Q('d.', 'Calcule le taux d’évolution entre 2024 et 2025, au dixième.', '(156,66 − 181,54) ÷ 181,54 × 100 ≈ − 13,7 %', -13.7, { w: 24, tol: .05, lab: 'en % :' }), Q('e.', 'Pourquoi la moyenne est-elle plus grande que la médiane ?', 'Décembre (20,73) est beaucoup plus haut que les autres mois : il tire la moyenne vers le haut.', null, { lines: 2 })],
      err: { 2: [{ v: (11.37 + 14.29) / 2, m: 'Range d’abord les 12 valeurs dans l’ordre croissant.' }], 3: [{ v: 13.7, m: 'Les entrées ont baissé : le taux est négatif.' }] },
      hints: ['Additionne les 12 valeurs, puis divise par 12.', '12 valeurs : la médiane est entre la 6e et la 7e valeur rangée.', 'Taux = (2025 − 2024) ÷ 2024 × 100.'], pouce: 'Total 156,66 ; moyenne 13,06 ; rangées : 6e = 12,72 et 7e = 12,84.', corr: 'a. 156,66 M. b. 13,06 M. c. 12,78 M. d. − 13,7 %. e. décembre très élevé.' }),
    PB({ id: 'p3', etape: 4, lc: 2, cls: 'bac', defi: 5, bulle: 'Voici une question « vers le brevet » : 5 étapes, sur le top 10 réel de 2025. Range les valeurs avant de chercher la médiane.', autravail: { comp: 'com', txt: 'résumer un tableau de chiffres en deux ou trois indicateurs clairs pour un responsable.' }, comps: ['rep', 'rai', 'cal', 'com'], titre: 'Le top 10 de l’année',
      intro: `${K.tab2(['Film', 'Entrées (M)'], D.top2025.map(([f, v]) => [f, String(v).replace('.', ',')]))}<p class="srcl">${D.srcTop}</p>`,
      qs: [BQ('1', 'Calculer le nombre moyen d’entrées de ces 10 films.', 'cal', '35,40 ÷ 10 = 3,54 millions', 3.54, { w: 26, tol: .006 }), BQ('2', 'Déterminer la médiane de la série.', 'rep', '(2,95 + 2,97) ÷ 2 = 2,96 millions', 2.96, { w: 26, tol: .006 }), BQ('3', 'Calculer l’étendue de la série.', 'cal', '6,18 − 2,46 = 3,72 millions', 3.72, { w: 26, tol: .006 }), BQ('4', 'Quelle part des entrées du top 10 le film n° 1 représente-t-il ? Arrondir au dixième de pourcent.', 'cal', '6,18 ÷ 35,40 × 100 ≈ 17,5 %', 17.5, { w: 24, tol: .05, lab: 'en % :' }), BQ('5', 'Un journaliste écrit : « En moyenne, un film du top 10 fait 3,5 millions d’entrées. » Expliquer pourquoi la médiane décrit mieux un film « typique » du top 10.', 'rai', 'La moyenne est tirée vers le haut par les deux premiers films ; 7 films sur 10 font moins de 3,54 millions. La médiane (2,96) n’est pas influencée par ces valeurs extrêmes.', null, { lines: 2 })],
      err: { 1: [{ v: (2.97 + 3.31) / 2, m: 'Range d’abord les valeurs dans l’ordre croissant.' }] },
      hints: ['Additionne les 10 entrées : 35,40 millions.', 'Pour la médiane, range les valeurs ; 10 valeurs : entre la 5e et la 6e.', 'Part en % = entrées du film ÷ total × 100.'], pouce: 'Total 35,40 ; moyenne 3,54 ; médiane (2,95 + 2,97) ÷ 2 ; étendue 6,18 − 2,46 ; part 6,18 ÷ 35,40.', corr: '1. 3,54 M. 2. 2,96 M. 3. 3,72 M. 4. 17,5 %. 5. valeurs extrêmes.' })];
  chk(Math.round(8 / 36 * 1000) === 222 && TOP.filter(v => v < 3.54).length === 7, 'c6 vérifications des problèmes');

  c.bilan = [['Je sais calculer une moyenne, simple ou pondérée.', ['e1', 'p1', 'p3']], ['Je sais déterminer une médiane et une étendue.', ['e2', 'p2', 'p3']], ['Je sais lire un diagramme.', ['e3', 'p2']], ['Je sais calculer une fréquence.', ['e3', 'p1']]];
  c.words = require('./gl3')('c6');
  return c;
};
