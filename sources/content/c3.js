/* Chapitre 3 · Calcul littéral et équations — 3ème Série Pro (programme du cycle 4, BO n° 31 du 30 juillet 2020). */
'use strict';
const K = require('./kit3e');
const { H, FM, R, Q, BQ, PB, S, T, Rc, Ar, st, SN, Sketch } = K;
const { D, SV, tt, fill } = require('./sk3');

module.exports = function (chk) {
  const c = { id: 'c3', n: 3, col: 'algebre', icone: '🧩', dom: 'Nombres et calculs · calcul littéral', titre: 'Calcul littéral et équations', sous: 'Développer, factoriser, prouver, résoudre' };
  c.parties = [{ t: 'Transformer une expression', n: [1, 2] }, { t: 'Résoudre une équation', n: [3, 4] }];
  c.travail = { question: `Trois formules de streaming : ${H('7,99 €')}, ${H('14,99 €')} et ${H('21,99 €')} par mois. Au bout de combien de mois l’écart atteint-il 42 € ? Et comment être sûr qu’une astuce de calcul marche pour tous les nombres ? Tu sauras répondre aux notions 2 et 3.` };
  c.objectifs = ['Je saurai développer une expression, avec une ou deux parenthèses.', 'Je saurai factoriser et prouver un résultat avec une lettre.', 'Je saurai résoudre une équation du premier degré.', 'Je saurai résoudre une équation produit nul.'];
  c.depart = 'c3';

  /* ---------- illustrations « Je découvre » ---------- */
  const skPoster = () => { const k = Sketch(731); return SV(fill(40, 16, 110, 84, .5) + k.P(k.rect(40, 16, 110, 84)) + k.P(k.line(52, 86, 80, 50) + k.line(80, 50, 104, 72) + k.line(104, 72, 138, 36), { w: 2 }) + tt(95, 114, 'x + 5', 13) + tt(22, 62, 'x + 2', 12, { a: 'middle' }) + tt(170, 62, '?', 22), 'Un poster rectangulaire de côtés x + 5 et x + 2'); };
  const skEnigme = () => { const k = Sketch(732); return SV(fill(24, 20, 152, 70, .45, 'k2', 12) + k.P(k.rect(24, 20, 152, 70)) + tt(100, 46, '+ 3, × 4, − 12', 15) + tt(100, 72, '= 4 × le nombre ?', 13) + tt(100, 116, 'toujours ?', 13), 'Une carte d’énigme avec un programme de calcul'); };
  const skPrix = () => { const k = Sketch(733); let s = ''; [['7,99 €', 'pub'], ['14,99 €', 'Standard']].forEach(([p, l], i) => { const x = 18 + i * 92; s += fill(x, 26, 76, 56, .9, i ? 'k' : 'k2', 8) + k.P(k.rect(x, 26, 76, 56)) + tt(x + 38, 52, p, 15, { c: i ? '#fff' : undefined }) + tt(x + 38, 72, l, 11, { c: i ? '#fff' : undefined }); }); return SV(s + tt(100, 112, 'écart total : 42 €', 13), 'Deux étiquettes de prix : 7,99 € et 14,99 € par mois'); };
  const skCadenas = () => { const k = Sketch(734); return SV(k.P(`M70 56 V40 a30 30 0 0 1 60 0 V56`, { w: 4 }) + fill(52, 56, 96, 60, .9, 'k2', 8) + k.P(k.rect(52, 56, 96, 60)) + tt(100, 82, '(x − 3)', 13) + tt(100, 102, '(2x + 8) = 0', 13), 'Un cadenas à code avec une équation'); };

  /* ---------- méthodes visuelles ---------- */
  // 1. (x + 5)(x + 2) : le rectangle découpé
  const X0 = 70, Y0 = 34, WX = 210, W5 = 100, HX = 104, H2 = 48;
  const vDev = S(600, 230, st(1, SN(1, 22, 30) + Rc(X0, Y0, WX + W5, HX + H2, { c: 'wh', rx: 2 }) + `<line x1="${X0 + WX}" y1="${Y0}" x2="${X0 + WX}" y2="${Y0 + HX + H2}" class="ks" stroke-width="2"/><line x1="${X0}" y1="${Y0 + HX}" x2="${X0 + WX + W5}" y2="${Y0 + HX}" class="ks" stroke-width="2"/>` + T(X0 + WX / 2, Y0 - 8, 'x', { fs: 15 }) + T(X0 + WX + W5 / 2, Y0 - 8, '5', { fs: 15 }) + T(X0 - 14, Y0 + HX / 2 + 5, 'x', { fs: 15 }) + T(X0 - 14, Y0 + HX + H2 / 2 + 5, '2', { fs: 15 }))
    + st(2, SN(2, 412, 44) + Rc(X0, Y0, WX, HX, { c: 'k2', rx: 2 }) + T(X0 + WX / 2, Y0 + HX / 2 + 6, 'x²', { fs: 20 }) + T(X0 + WX + W5 / 2, Y0 + HX / 2 + 6, '5x', { fs: 17 }) + T(X0 + WX / 2, Y0 + HX + H2 / 2 + 6, '2x', { fs: 17 }) + T(X0 + WX + W5 / 2, Y0 + HX + H2 / 2 + 6, '10', { fs: 17 }) + T(434, 50, 'x × x, x × 5, 2 × x, 5 × 2', { fs: 12, a: 'start', c: 'ts' }))
    + st(3, SN(3, 412, 104) + T(434, 110, 'x² + 5x + 2x + 10', { fs: 15, a: 'start' }))
    + st(4, SN(4, 412, 166) + Rc(430, 148, 160, 40, { c: 'k', rx: 10 }) + T(510, 174, 'x² + 7x + 10', { fs: 17, c: 'tw' })),
  'Un rectangle de côtés x + 5 et x + 2 découpé en quatre : x², 5x, 2x et 10');
  // 2. le programme de calcul : + 3, × 4, − 12
  const bxs = [[30, 70, 'x'], [140, 100, 'x + 3'], [280, 110, '4(x + 3)'], [430, 150, '4(x + 3) − 12']];
  const vProg = S(600, 230, st(1, SN(1, 22, 28) + Rc(bxs[0][0], 46, bxs[0][1], 44, { c: 'k', rx: 10 }) + T(65, 74, 'x', { fs: 18, c: 'tw' }) + T(65, 108, 'le nombre choisi', { fs: 11, c: 'ts' }))
    + st(2, SN(2, 200, 28) + bxs.slice(1).map(([x, w, l]) => Rc(x, 46, w, 44, { rx: 10 }) + T(x + w / 2, 74, l, { fs: 15 })).join('') + Ar(102, 68, 136, 68, { w: 2.2, h: 8, lab: '+ 3', fs: 12, dy: -12 }) + Ar(242, 68, 276, 68, { w: 2.2, h: 8, lab: '× 4', fs: 12, dy: -12 }) + Ar(392, 68, 426, 68, { w: 2.2, h: 8, lab: '− 12', fs: 12, dy: -12 }))
    + st(3, SN(3, 22, 140) + T(320, 146, 'je développe : 4(x + 3) − 12 = 4x + 12 − 12 = 4x', { fs: 15, c: 'kt' }))
    + st(4, SN(4, 22, 196) + Rc(44, 176, 540, 40, { c: 'k2', rx: 10 }) + T(314, 202, 'avec 5 : 5 → 8 → 32 → 20, et 4 × 5 = 20 ✓ (un exemple, pas une preuve)', { fs: 13 })),
  'Le programme de calcul écrit avec x : 4(x + 3) − 12 se développe en 4x');
  // 3. l’équation 14,99x = 7,99x + 42
  const vEq = S(600, 230, st(1, SN(1, 22, 30) + T(44, 36, 'x = le nombre de mois d’abonnement', { fs: 14, a: 'start', c: 'ts' }))
    + st(2, SN(2, 22, 74) + T(44, 81, '14,99x = 7,99x + 42', { fs: 19, a: 'start' }) + T(580, 81, 'Standard = pub + 42 €', { fs: 12, a: 'end', c: 'ts' }))
    + st(3, SN(3, 22, 120) + T(44, 127, '14,99x − 7,99x = 42   donc   7x = 42', { fs: 16, a: 'start' }) + T(580, 127, '− 7,99x des deux côtés', { fs: 12, a: 'end', c: 'kt' }))
    + st(4, Rc(40, 148, 544, 72, { c: 'k', rx: 12 }) + SN(4, 40, 148) + T(312, 178, 'x = 42 ÷ 7 = 6', { fs: 19, c: 'tw' }) + T(312, 206, 'je vérifie : 14,99 × 6 = 89,94 et 7,99 × 6 + 42 = 47,94 + 42 = 89,94 ✓', { fs: 13, c: 'tw' })),
  'On écrit l’équation 14,99x = 7,99x + 42, on enlève 7,99x des deux côtés, puis on divise par 7 : x = 6');
  // 4. produit nul
  const vNul = S(600, 230, st(1, SN(1, 128, 50) + Rc(150, 28, 300, 44, { c: 'k2', rx: 10 }) + T(300, 57, '(x − 3)(2x + 8) = 0', { fs: 18 }) + Ar(250, 74, 175, 108, { w: 2.2, h: 8 }) + Ar(350, 74, 425, 108, { w: 2.2, h: 8 }) + T(300, 96, 'un facteur est nul', { fs: 11, c: 'ts' }))
    + st(2, SN(2, 40, 128) + Rc(60, 110, 200, 82, { rx: 10 }) + T(160, 140, 'x − 3 = 0', { fs: 16 }) + T(160, 172, 'x = 3', { fs: 18, c: 'kt' }))
    + st(3, SN(3, 320, 128) + Rc(340, 110, 200, 82, { rx: 10 }) + T(440, 134, '2x + 8 = 0', { fs: 15 }) + T(440, 158, '2x = −8', { fs: 15 }) + T(440, 182, 'x = −4', { fs: 17, c: 'kt' }))
    + st(4, SN(4, 22, 212) + T(312, 217, 'je vérifie : (3 − 3) × 14 = 0 et (−4 − 3) × 0 = 0 ✓', { fs: 13, c: 'kt' })),
  'Le produit (x − 3)(2x + 8) est nul si x − 3 = 0 ou si 2x + 8 = 0 : x = 3 ou x = −4');
  chk(6 * 6 + 7 * 6 + 10 === 11 * 8 && 4 * (5 + 3) - 12 === 20 && Math.abs(14.99 * 6 - (7.99 * 6 + 42)) < 1e-9 && 2 * -4 + 8 === 0 && 2 * 3 + 8 === 14, 'c3 notions');

  c.notions = [
    { titre: 'Développer une expression', decouvre: { txt: `Un poster de film (fictif) mesure ${H('(x + 5) dm')} de long et ${H('(x + 2) dm')} de large. Comment écrire son aire sans parenthèses ?`, img: skPoster() },
      methode: ['Je découpe le rectangle en quatre rectangles : x sur x, 5 sur x, x sur 2 et 5 sur 2.', 'Je calcule l’aire de chaque morceau : x², 5x, 2x et 10.', 'J’additionne les quatre aires : x² + 5x + 2x + 10.', 'Je réduis en regroupant les termes en x : x² + 7x + 10.'],
      vois: vDev,
      solution: `<p>${FM(R`(x+5)(x+2)=x^2+7x+10`)}. Développer, c’est transformer le produit en somme.</p><p>Je vérifie avec x = 6 : (6 + 5) × (6 + 2) = 11 × 8 = 88 et 36 + 42 + 10 = 88 ✓.</p>`,
      retiens: `<p><b>Simple distributivité</b> : ${FM(R`k(a+b)=ka+kb`)}</p><p><b>Double distributivité</b> : ${FM(R`(a+b)(c+d)=ac+ad+bc+bd`)}</p>`,
      attention: '(x + 5)² n’est pas x² + 25 : (x + 5)(x + 5) = x² + 10x + 25.',
      amoi: [['Développe 3(x + 4).', '3x + 12'], ['Développe (x + 1)(x + 3).', 'x² + 4x + 3']] },
    { titre: 'Factoriser et prouver avec une lettre', decouvre: { txt: `Une carte d’énigme (fictive) dit : « Choisis un nombre, ${H('ajoute 3')}, ${H('multiplie par 4')}, puis ${H('enlève 12')}. Tu obtiens toujours 4 fois ton nombre. » Est-ce vrai pour tous les nombres ?`, img: skEnigme() },
      methode: ['J’appelle x le nombre choisi : une lettre représente n’importe quel nombre.', 'J’écris le programme avec x : x + 3, puis 4(x + 3), puis 4(x + 3) − 12.', 'Je développe et je réduis : 4x + 12 − 12 = 4x.', 'Un exemple aide à comprendre, mais seul le calcul avec x prouve que c’est toujours vrai.'],
      vois: vProg,
      solution: `<p>${FM(R`4(x+3)-12=4x+12-12=4x`)} : quel que soit le nombre choisi, on obtient 4 fois ce nombre. L’énigme dit vrai.</p><p>Dans l’autre sens, 4x + 12 = 4(x + 3) : c’est une <b>factorisation</b>.</p>`,
      retiens: `<p><b>Factoriser</b>, c’est transformer une somme en produit : ${FM(R`ka+kb=k(a+b)`)}. Exemple : 4x + 12 = 4(x + 3).</p><p>Pour <b>prouver</b> qu’une propriété est vraie pour tous les nombres, on fait le calcul avec une lettre.</p>`,
      attention: 'Vérifier sur un exemple ne prouve pas que c’est toujours vrai. Mais un seul contre-exemple prouve que c’est faux.',
      amoi: [['Factorise 5x + 15.', '5(x + 3)'], ['Factorise 6x − 18.', '6(x − 3)']] },
    { titre: 'Résoudre une équation du premier degré', decouvre: { txt: `Netflix coûte ${H('7,99 €')} par mois en Standard avec pub et ${H('14,99 €')} en Standard. En Standard, Sacha a payé ${H('42 € de plus')} qu’avec la pub. Depuis combien de mois est-il abonné ?`, img: skPrix() },
      methode: ['J’appelle x le nombre de mois.', 'Je traduis l’énoncé par une équation : 14,99x = 7,99x + 42.', 'J’enlève 7,99x des deux côtés : 7x = 42.', 'Je divise les deux côtés par 7 : x = 6. Je vérifie en remplaçant x par 6.'],
      vois: vEq,
      solution: `<p>${FM(R`14{,}99x=7{,}99x+42\iff7x=42\iff x=6`)}</p><p>Sacha est abonné depuis <b>6 mois</b> : 89,94 € en Standard contre 47,94 € avec la pub.</p><p class="srcl">${D.srcNetflix}</p>`,
      retiens: `<p>Une <b>équation</b> est une égalité avec une inconnue. La <b>résoudre</b>, c’est trouver la valeur de l’inconnue qui la rend vraie.</p><p>On garde l’égalité vraie en faisant la même opération des deux côtés : ajouter, soustraire, multiplier ou diviser (par un nombre non nul).</p>`,
      attention: 'On fait toujours la même opération des deux côtés du signe =. Pour isoler x dans 7x = 42, on divise par 7 : on ne soustrait pas 7.',
      amoi: [['Résous 3x + 5 = 20.', 'x = 5'], ['Résous 5x − 4 = 2x + 11.', 'x = 5']] },
    { titre: 'Résoudre une équation produit nul', decouvre: { txt: `Dans un escape game (fictif), le code du cadenas est un nombre x tel que ${H('(x − 3)(2x + 8) = 0')}. Quelles valeurs faut-il essayer ?`, img: skCadenas() },
      methode: ['Un produit est nul si l’un de ses facteurs est nul : x − 3 = 0 ou 2x + 8 = 0.', 'Je résous la première équation : x − 3 = 0, donc x = 3.', 'Je résous la seconde : 2x + 8 = 0, donc 2x = −8 et x = −4.', 'Je vérifie les deux valeurs dans le produit de départ.'],
      vois: vNul,
      solution: `<p>L’équation a <b>deux solutions</b> : x = 3 et x = −4.</p><p>Un code de cadenas est positif : il faut essayer 3.</p>`,
      retiens: `<p>Un produit est nul si et seulement si l’un au moins de ses facteurs est nul : ${FM(R`A\times B=0\iff A=0\ \text{ou}\ B=0`)}</p>`,
      attention: 'On ne développe pas : on résout chaque facteur séparément. Une équation produit nul peut avoir deux solutions.',
      amoi: [['Résous (x − 5)(x + 2) = 0.', 'x = 5 ou x = −2'], ['Résous x(3x − 6) = 0.', 'x = 0 ou x = 2']] }];

  c.mots = [['expression littérale', 'un calcul qui contient une ou plusieurs lettres', '4(x + 3) − 12'], ['développer', 'transformer un produit en somme', '3(x + 4) = 3x + 12'], ['factoriser', 'transformer une somme en produit', '4x + 12 = 4(x + 3)'], ['réduire', 'regrouper les termes de même nature', '5x + 2x = 7x'], ['équation', 'une égalité avec une inconnue', '7x = 42'], ['solution', 'la valeur de l’inconnue qui rend l’égalité vraie', '6 est la solution de 7x = 42.']];

  c.scratch = [{ titre: 'un programme de calcul', lc: 2, texte: 'Le lutin demande un nombre, puis il applique le programme de calcul de l’énigme.',
    prog: [{ c: 'evt', t: 'quand ⚑ est cliqué' }, { c: 'sns', t: 'demander « Choisis un nombre » et attendre' }, { c: 'var', t: 'mettre résultat à (réponse + 3)' }, { c: 'var', t: 'mettre résultat à (résultat × 4)' }, { c: 'var', t: 'mettre résultat à (résultat − 12)' }, { c: 'look', t: 'dire (regroupe « Résultat : » et résultat)' }],
    qs: [['Que dit le lutin si on répond 7 ?', 'Résultat : 28', '7 + 3 = 10 ; 10 × 4 = 40 ; 40 − 12 = 28.'], ['Et si on répond −2 ?', 'Résultat : −8', '−2 + 3 = 1 ; 1 × 4 = 4 ; 4 − 12 = −8.'], ['Quelle expression en x le programme calcule-t-il ?', '4(x + 3) − 12 = 4x', '4(x + 3) − 12 = 4x + 12 − 12 = 4x : le lutin dit toujours 4 fois le nombre.']] }];
  chk((7 + 3) * 4 - 12 === 28 && (-2 + 3) * 4 - 12 === -8, 'c3 Scratch');

  c.resolus = [
    { titre: 'Résoudre 5x − 7 = 2x + 8', outil: '✏️ à la main', enonce: `Résous l’équation ${H('5x − 7 = 2x + 8')}.`,
      rows: [['5x − 2x − 7 = 8, soit 3x − 7 = 8', 'J’enlève 2x des deux côtés pour regrouper les x à gauche.'], ['3x = 8 + 7, soit 3x = 15', 'J’ajoute 7 des deux côtés.'], ['x = 15 ÷ 3 = 5', 'Je divise les deux côtés par 3.'], ['5 × 5 − 7 = 18 et 2 × 5 + 8 = 18', 'Je vérifie : les deux membres sont égaux.']], verif: '25 − 7 = 18 et 10 + 8 = 18 ✓', rep: 'La solution est x = 5.', go: ['e2'] },
    { titre: 'À toi : résoudre 4x + 3 = x + 15', outil: '✏️ à la main', enonce: `Résous l’équation ${H('4x + 3 = x + 15')}.`, trous: [0, 1, 2, 3],
      rows: [['4x − x + 3 = 15, soit ⟦3x⟧ + 3 = 15', 'J’enlève x des deux côtés.'], ['3x = 15 − 3, soit 3x = ⟦12⟧', 'J’enlève 3 des deux côtés.'], ['x = 12 ÷ 3 = ⟦4⟧', 'Je divise par 3.'], ['4 × 4 + 3 = ⟦19⟧ et 4 + 15 = 19', 'Je vérifie.']], verif: '16 + 3 = 19 et 4 + 15 = 19 ✓', rep: 'La solution est x = 4.', go: ['e2', 'e3'] }];
  c.entraine = [{ id: 'e1', gen: 'c3e1', lc: 1 }, { id: 'e2', gen: 'c3e2', lc: 3 }, { id: 'e3', gen: 'c3e3', lc: 2 }];

  /* ---------- je résous ---------- */
  chk(12 * 5 + 30 === 90 && (186 - 30) / 12 === 13 && 2400 + 200 * 5 + 4 * 25 === 70 * 50 && 70 * 50 - 2400 === 1100, 'c3 problèmes 1 et 2');
  chk(Math.abs(21.99 * 12 - 263.88) < 1e-9 && Math.abs(21.99 - 7.99 - 14) < 1e-9 && 98 / 14 === 7 && Math.abs((7.99 + 21.99) / 2 - 14.99) < 1e-9, 'c3 problème 3');
  c.probs = [
    PB({ id: 'p1', etape: 2, lc: 3, comps: ['mod', 'cal'], titre: 'Le pass de jeux vidéo',
      intro: `<p>Un service de jeux vidéo (fictif) coûte ${H('12 € par mois')}, avec ${H('30 €')} de frais d’inscription payés une seule fois.</p>`,
      qs: [Q('a.', 'Combien coûtent 5 mois, inscription comprise ?', '30 + 12 × 5 = 90 €', 90, { w: 24, lab: 'en € :' }), Q('b.', 'Écris le prix de x mois, inscription comprise.', '12x + 30', null, { w: 34 }), Q('c.', 'Inès a un budget de 186 €. Écris une équation, puis trouve combien de mois elle peut payer.', '12x + 30 = 186, donc 12x = 156 et x = 13 mois', 13, { lines: 1, lab: 'nombre de mois :' }), Q('d.', 'Vérifie ta réponse.', '12 × 13 + 30 = 156 + 30 = 186 ✓', null, { lines: 1 })],
      err: { 0: [{ v: 12 * 5, m: 'N’oublie pas les 30 € d’inscription.' }, { v: (12 + 30) * 5, m: 'Les 30 € ne se paient qu’une fois.' }], 2: [{ v: 186 / 12, m: 'Il faut d’abord enlever les 30 € d’inscription : 12x + 30 = 186.' }] },
      hints: ['Prix = inscription + prix par mois × nombre de mois.', 'Remplace le nombre de mois par x.', 'Enlève 30 des deux côtés, puis divise par 12.'], pouce: 'Prix de x mois : 12x + 30. Équation : 12x + 30 = 186, donc 12x = 156.', corr: 'a. 90 €. b. 12x + 30. c. 13 mois. d. 186 ✓.' }),
    PB({ id: 'p2', etape: 3, lc: 1, defi: 4, bulle: 'Ce cas se fait en 4 étapes. Fais un schéma du poster et de son cadre, et écris les deux côtés avec x.', autravail: { comp: 'mod', txt: 'écrire une formule pour calculer une longueur de câble ou une surface à équiper, quelle que soit la taille de la pièce.' }, comps: ['che', 'mod', 'cal', 'rai'], titre: 'Le cadre du poster',
      intro: `<p>Un poster de film mesure ${H('60 cm')} sur ${H('40 cm')}. On l’entoure d’un cadre de largeur ${H('x cm')}, tout autour.</p>`,
      qs: [Q('a.', 'Explique pourquoi l’ensemble, cadre compris, mesure (60 + 2x) cm sur (40 + 2x) cm.', 'Le cadre ajoute x à gauche et x à droite : 60 + 2x ; de même en hauteur : 40 + 2x.', null, { lines: 2 }), Q('b.', 'Développe (60 + 2x)(40 + 2x).', '2 400 + 120x + 80x + 4x² = 4x² + 200x + 2 400', null, { lines: 1 }), Q('c.', 'Déduis-en l’aire du cadre seul, en fonction de x.', '4x² + 200x + 2 400 − 2 400 = 4x² + 200x', null, { w: 44 }), Q('d.', 'Calcule l’aire du cadre pour x = 5 cm.', '4 × 25 + 200 × 5 = 1 100 cm²', 1100, { w: 26, lab: 'en cm² :' }), Q('e.', 'Vérifie avec les dimensions : 70 cm sur 50 cm, moins le poster.', '70 × 50 − 60 × 40 = 3 500 − 2 400 = 1 100 cm² ✓', null, { lines: 1 })],
      err: { 3: [{ v: 3500, m: 'C’est l’aire de l’ensemble. Le cadre seul : on enlève l’aire du poster.' }] },
      hints: ['Dessine le cadre : il dépasse de x de chaque côté.', 'Quatre produits : 60 × 40, 60 × 2x, 2x × 40, 2x × 2x.', 'Aire du cadre = aire totale − aire du poster.'], pouce: '(60 + 2x)(40 + 2x) = 4x² + 200x + 2 400 ; cadre : 4x² + 200x ; pour x = 5 : 100 + 1 000.', corr: 'a. x de chaque côté. b. 4x² + 200x + 2 400. c. 4x² + 200x. d. 1 100 cm². e. 3 500 − 2 400 = 1 100.' }),
    PB({ id: 'p3', etape: 4, lc: 3, cls: 'bac', defi: 5, bulle: 'Voici une question « vers le brevet » : 5 étapes, avec les vrais tarifs. Pour chaque équation, écris-la, résous-la et vérifie.', autravail: { comp: 'rai', txt: 'comparer deux devis ou deux abonnements pour conseiller le moins cher, preuve à l’appui.' }, comps: ['mod', 'rai', 'cal', 'com'], titre: 'Trois formules de streaming',
      intro: `<p>Depuis le 18 avril 2025, Netflix coûte ${H('7,99 €')} par mois en Standard avec pub, ${H('14,99 €')} en Standard et ${H('21,99 €')} en Premium.</p><p class="srcl">${D.srcNetflix}</p>`,
      qs: [BQ('1', 'Calculer le prix d’une année de Premium.', 'cal', '21,99 × 12 = 263,88 €', 263.88, { w: 30 }), BQ('2', 'Exprimer, en fonction du nombre de mois x, l’écart de prix entre le Premium et le Standard avec pub.', 'mod', '21,99x − 7,99x = 14x', null, { w: 34 }), BQ('3', 'Au bout de combien de mois cet écart atteint-il 98 € ? Résoudre une équation.', 'cal', '14x = 98, donc x = 7 mois', 7, { w: 26 }), BQ('4', 'Vérifier le résultat de la question 3 avec les prix.', 'rai', '21,99 × 7 = 153,93 et 7,99 × 7 = 55,93 ; 153,93 − 55,93 = 98 ✓', null, { lines: 1 }), BQ('5', 'Montrer que, pour tout nombre de mois x, le prix du Standard est la moyenne des prix des deux autres formules.', 'com', '(7,99x + 21,99x) ÷ 2 = 29,98x ÷ 2 = 14,99x', null, { lines: 2 })],
      err: { 0: [{ v: 21.99 * 10, m: 'Une année compte 12 mois.' }], 2: [{ v: 98 - 14, m: 'Pour isoler x dans 14x = 98, on divise par 14.' }] },
      hints: ['Une année = 12 mois.', 'L’écart après x mois : 21,99x − 7,99x.', 'La moyenne de deux nombres : leur somme divisée par 2.'], pouce: 'Écart : 14x. 14x = 98 donc x = 7. Moyenne : (7,99x + 21,99x) ÷ 2 = 14,99x.', corr: '1. 263,88 €. 2. 14x. 3. 7 mois. 4. 98 ✓. 5. 14,99x.' })];

  c.bilan = [['Je sais développer une expression.', ['e1', 'p2']], ['Je sais factoriser et prouver avec une lettre.', ['e3', 'p3']], ['Je sais résoudre une équation du premier degré.', ['e2', 'p1', 'p3']], ['Je sais résoudre une équation produit nul.', ['n4']]];
  c.words = require('./gl3')('c3');
  return c;
};
