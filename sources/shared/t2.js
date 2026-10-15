/* 3ème Série Pro · chapitre 2 — Fractions, puissances de 10 et écriture scientifique :
   additionner des fractions, prendre une fraction d’une quantité, puissances de 10 et préfixes, écriture scientifique. */
(function (root) {
  'use strict';
  const { DEP, TR, H } = typeof module !== 'undefined' ? require('./train.js').MCVT : root.MCVT;
  const { fr, tb, T, svg, table, num, qcm, pick, int, xs, MC } = H;
  const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  const sup = n => String(n).replace('-', '⁻').split('').map(c => c === '⁻' ? c : SUP[c]).join('');
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const lcm = (a, b) => a / gcd(a, b) * b;
  const F = (n, d) => MC.frac(n, d);
  const red = (n, d) => { const g = gcd(n, d); return [n / g, d / g]; };
  const ft = (n, d) => `${n}/${d}`;

  /* point de départ : le classeur de Sam (fictif) */
  DEP.c2 = R => {
    const N = pick(R, [120, 180, 240, 360]), E = N / 4, D = N / 6, B = N / 5;
    const doc = `<table class="dt tcx dt-sm"><thead><tr><th>Le classeur de Sam</th><th>Ce qu’il contient</th></tr></thead><tbody><tr><th>Total</th><td data-cell="0">${N} cartes</td></tr><tr><th>Cartes énergie</th><td data-cell="1">${F(1, 4)} des cartes</td></tr><tr><th>Cartes dresseur</th><td data-cell="2">${F(1, 6)} des cartes</td></tr><tr><th>Cartes brillantes</th><td data-cell="3">${B} cartes</td></tr></tbody></table><p class="srcl">Collection fictive.</p>`;
    return { titre: 'Le classeur de Sam', doc,
      qs: [{ t: 'Touche la case qui donne le nombre total de cartes.', kind: 'tap', cell: '0', v: N, tol: .01, a: String(N) },
        { t: 'Combien y a-t-il de cartes énergie ?', kind: 'num', v: E, tol: .01, a: String(E), x: `1/4 de ${N} : ${N} ÷ 4 = ${E} cartes` },
        { t: 'Combien y a-t-il de cartes dresseur ?', kind: 'num', v: D, tol: .01, a: String(D), x: `1/6 de ${N} : ${N} ÷ 6 = ${D} cartes` },
        { t: 'Quelle fraction du classeur font les cartes énergie et dresseur ensemble ?', kind: 'qcm', choices: ['5/12', '2/10', '1/10'], ok: 0, a: '5/12', x: '1/4 + 1/6 = 3/12 + 2/12 = 5/12' },
        { t: 'Quelle fraction des cartes est brillante ?', kind: 'qcm', choices: ['1/4', '1/5', '5/1'], ok: 1, a: '1/5', x: `${B}/${N} = 1/5 (${N} ÷ ${B} = 5)` }] };
  };

  /* e1 · la barre de fractions : additionner, puis trouver le reste */
  const PAIRS = [[1, 2, 1, 5], [1, 3, 1, 4], [1, 4, 1, 6], [2, 3, 1, 6], [1, 2, 1, 3], [3, 4, 1, 6], [2, 5, 1, 10], [1, 3, 1, 6], [1, 4, 3, 8], [1, 6, 1, 4], [1, 2, 1, 6], [2, 5, 1, 4]];
  TR.c2e1 = R => {
    const [a, b, c, d] = pick(R, PAIRS), D = lcm(b, d), n1 = a * D / b, n2 = c * D / d, S = n1 + n2, rest = D - S;
    const ctx = pick(R, [['cartes énergie', 'cartes dresseur'], ['tomes de shōnen', 'tomes de shōjo'], ['épisodes d’action', 'épisodes comiques']]);
    const W = 600, cw = Math.min(46, 540 / D), x0 = (W - cw * D) / 2;
    let s = ''; for (let i = 0; i < D; i++) s += `<rect x="${x0 + i * cw}" y="40" width="${cw - 3}" height="40" rx="4" class="${i < n1 ? 'k' : i < S ? 'k2' : 'wh'} ks" stroke-width="1.4"/>`;
    s += T(x0 + n1 * cw / 2, 30, `${a}/${b}`, { fs: 15, c: 'kt' }) + T(x0 + (n1 + n2 / 2) * cw, 30, `${c}/${d}`, { fs: 15, c: 'kt' }) + (rest ? T(x0 + (S + rest / 2) * cw, 104, 'le reste', { fs: 13, c: 'ts' }) : '');
    const items = [num('a', D, 0, String(D), [{ v: b + d, m: 'On n’additionne pas les dénominateurs : on cherche un multiple commun de ' + b + ' et ' + d + '.' }, { v: b * d === D ? -1 : b * d, m: b * d + ' marche aussi, mais on cherche le plus petit multiple commun.' }]),
      num('b', n1, 0, String(n1)), num('c', n2, 0, String(n2)),
      num('d', S, 0, String(S), [{ v: a + c, m: 'Il faut d’abord écrire les deux fractions avec le dénominateur ' + D + '.' }]),
      num('e', rest, 0, String(rest), [{ v: S, m: 'C’est la part des deux familles. Le reste : ' + D + ' − ' + S + '.' }])];
    xs(items, { a: `${D} est le plus petit multiple commun de ${b} et ${d}`, b: `${a}/${b} = (${a} × ${D / b})/(${b} × ${D / b}) = ${n1}/${D}`, c: `${c}/${d} = (${c} × ${D / d})/(${d} × ${D / d}) = ${n2}/${D}`, d: `${n1}/${D} + ${n2}/${D} = ${S}/${D}`, e: `1 − ${S}/${D} = ${D}/${D} − ${S}/${D} = ${rest}/${D}` });
    return { titre: 'La barre de fractions', consigne: `Dans une collection (fictive), ${a}/${b} sont des ${ctx[0]} et ${c}/${d} des ${ctx[1]}. La barre est partagée en ${D} parts égales.`,
      support: svg(W, 116, s, 'Barre partagée en parts égales') + `<p class="tr-l">a. Dénominateur commun : ${tb('a', String(D), 12)}</p><p class="tr-l">${a}/${b} = ${tb('b', String(n1), 10)} / ${D} · ${c}/${d} = ${tb('c', String(n2), 10)} / ${D}</p><p class="tr-l">d. Les deux familles ensemble : ${tb('d', String(S), 10)} / ${D} · e. Il reste ${tb('e', String(rest), 10)} / ${D}</p>`, items,
      hints: ['Cherche un nombre qui est dans la table de ' + b + ' et dans celle de ' + d + '.', 'Pour changer de dénominateur, on multiplie en haut et en bas par le même nombre.', 'Le tout vaut ' + D + '/' + D + ' : le reste, c’est ' + D + ' moins la somme.'] };
  };

  /* e2 · puissances de 10 et préfixes */
  TR.c2e2 = R => {
    const p = int(R, 2, 6), q = int(R, 2, 5), u = int(R, 5, 9), v = int(R, 2, 4), n = int(R, 2, 4);
    const pre = pick(R, [['méga', 'M', 6, 'Mbit', 'bits', 'débit d’une box (fictive)'], ['giga', 'G', 9, 'Go', 'octets', 'mémoire d’une console (fictive)'], ['kilo', 'k', 3, 'ko', 'octets', 'taille d’une image (fictive)']]);
    const k = pick(R, [15, 25, 40, 64, 120, 500]);
    const items = [num('a', p + q, 0, String(p + q), [{ v: p * q, m: 'On additionne les exposants : 10' + sup(p) + ' × 10' + sup(q) + ' = 10 puissance ' + p + ' + ' + q + '.' }]),
      num('b', u - v, 0, String(u - v), [{ v: u / v, m: 'Pour une division, on soustrait les exposants.' }]),
      num('c', pre[2], 0, String(pre[2])),
      num('d', 10 ** -n, n, fr(10 ** -n), [{ v: -(10 ** n), m: '10 puissance −' + n + ' est un nombre positif, très petit : 1 ÷ 10' + sup(n) + '.' }])];
    xs(items, { a: `10${sup(p)} × 10${sup(q)} = 10${sup(p + q)} : on additionne les exposants ${p} + ${q}`, b: `10${sup(u)} ÷ 10${sup(v)} = 10${sup(u - v)} : on soustrait les exposants ${u} − ${v}`, c: `${pre[0]} = 10${sup(pre[2])} : ${k} ${pre[3]} = ${k} × 10${sup(pre[2])} ${pre[4]}`, d: `10${sup(-n)} = 1 ÷ 10${sup(n)} = ${fr(10 ** -n)}` });
    return { titre: 'Puissances de 10 et préfixes', consigne: 'Complète avec un exposant ou un nombre décimal. Le tableau des préfixes t’aide.',
      support: table(['Préfixe', 'Symbole', 'Puissance de 10', 'En nombre'], [['giga', 'G', '10⁹', '1 000 000 000'], ['méga', 'M', '10⁶', '1 000 000'], ['kilo', 'k', '10³', '1 000'], ['milli', 'm', '10⁻³', '0,001']])
        + `<p class="tr-l">a. 10${sup(p)} × 10${sup(q)} = 10 puissance ${tb('a', String(p + q), 10)}</p><p class="tr-l">b. 10${sup(u)} ÷ 10${sup(v)} = 10 puissance ${tb('b', String(u - v), 10)}</p><p class="tr-l">c. ${pre[5]} : ${k} ${pre[3]} = ${k} × 10 puissance ${tb('c', String(pre[2]), 10)} ${pre[4]}</p><p class="tr-l">d. 10${sup(-n)} en écriture décimale : ${tb('d', fr(10 ** -n), 16)}</p>`, items,
      hints: ['Multiplier deux puissances de 10 : on additionne les exposants.', 'Diviser : on soustrait les exposants.', 'Un exposant négatif donne un nombre plus petit que 1 : 10⁻² = 0,01.'] };
  };

  /* e3 · écriture scientifique */
  const BIG = [[4500000, 'vues d’une bande-annonce (fictive)'], [32000000, 'joueurs d’un jeu en ligne (fictif)'], [870000, 'abonnés d’une chaîne de dessin (fictive)'], [2600000000, 'écoutes d’une chanson (fictive)'], [56000000, 'exemplaires d’une série de mangas (fictive)']];
  const SMALL = [[0.00032, 'épaisseur d’une feuille, en m'], [0.0045, 'durée d’une image de jeu vidéo à 220 images par seconde, en s'], [0.00008, 'taille d’un pixel d’écran, en m'], [0.0006, 'épaisseur d’une carte, en m']];
  const sci = x => { const e = Math.floor(Math.log10(Math.abs(x)) + 1e-9); return [+(x / 10 ** e).toFixed(6), e]; };
  TR.c2e3 = R => {
    const [N1, l1] = pick(R, BIG), [N2, l2] = pick(R, SMALL), [m1, e1] = sci(N1), [m2, e2] = sci(N2);
    const [m3, e3] = pick(R, [[7.3, 5], [2.5, 4], [6.05, 3], [1.2, 6]]), N3 = Math.round(m3 * 10 ** e3);
    const items = [num('a', m1, 2, fr(m1), [{ v: N1 / 10 ** (e1 - 1), m: 'Il faut un seul chiffre, non nul, avant la virgule.' }]), num('b', e1, 0, String(e1), [{ v: e1 + 1, m: 'Compte les rangs dont la virgule se déplace : ' + e1 + '.' }]),
      num('c', m2, 2, fr(m2)), num('d', e2, 0, fr(e2), [{ v: -e2, m: 'Le nombre est plus petit que 1 : l’exposant est négatif.' }]),
      num('e', N3, 0, fr(N3), [{ v: m3 * 10 * e3, m: '10 puissance ' + e3 + ' n’est pas 10 × ' + e3 + ' : on décale la virgule de ' + e3 + ' rangs.' }])];
    xs(items, { a: `${fr(N1)} : je place la virgule après le premier chiffre : ${fr(m1)}`, b: `la virgule se décale de ${e1} rangs vers la gauche : ${fr(N1)} = ${fr(m1)} × 10${sup(e1)}`, c: `${fr(N2)} : premier chiffre non nul, puis la virgule : ${fr(m2)}`, d: `la virgule se décale de ${-e2} rangs vers la droite : ${fr(N2)} = ${fr(m2)} × 10${sup(e2)}`, e: `${fr(m3)} × 10${sup(e3)} : la virgule se décale de ${e3} rangs vers la droite : ${fr(N3)}` });
    return { titre: 'L’écriture scientifique', consigne: 'Écris chaque nombre sous la forme a × 10 puissance n, avec un seul chiffre non nul avant la virgule.',
      support: table(['Ce qu’on mesure', 'Le nombre', 'a', 'n'], [[l1, fr(N1), tb('a', fr(m1), 14), tb('b', String(e1), 10)], [l2, fr(N2), tb('c', fr(m2), 14), tb('d', fr(e2), 10)]]) + `<p class="tr-l">e. Écris ${fr(m3)} × 10${sup(e3)} en écriture décimale : ${tb('e', fr(N3), 26)}</p>`, items,
      hints: ['a est entre 1 et 10 : un seul chiffre avant la virgule, et ce n’est pas 0.', 'n compte de combien de rangs la virgule s’est déplacée.', 'Pour un nombre plus petit que 1, n est négatif.'] };
  };
})(typeof module !== 'undefined' ? module.exports : window);
