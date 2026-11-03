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

  /* point de départ : le classeur de Sam */
  DEP.c2 = R => {
    const N = pick(R, [120, 180, 240, 360]), E = N / 4, D = N / 6, B = N / 5;
    const doc = `<table class="dt tcx dt-sm"><thead><tr><th>Le classeur de Sam</th><th>Ce qu’il contient</th></tr></thead><tbody><tr><th>Total</th><td data-cell="0">${N} cartes</td></tr><tr><th>Cartes énergie</th><td data-cell="1">${F(1, 4)} des cartes</td></tr><tr><th>Cartes dresseur</th><td data-cell="2">${F(1, 6)} des cartes</td></tr><tr><th>Cartes brillantes</th><td data-cell="3">${B} cartes</td></tr></tbody></table>`;
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
    s += T(x0 + n1 * cw / 2, 30, `${a}/${b}`, { fs: 15, c: 'kt' }) + T(x0 + (n1 + n2 / 2) * cw, 30, `${c}/${d}`, { fs: 15, c: 'kt' }) + (rest ? T(x0 + (S + rest / 2) * cw, 104, 'les autres', { fs: 13, c: 'ts' }) : '');
    /* trois propositions de fraction : la bonne, l’erreur « on additionne aussi les dénominateurs », l’inverse */
    const val = f => { const [x, y] = String(f).split('/').map(Number); return Number.isFinite(x / y) ? x / y : f; };
    const mix = (right, cands) => { const w = []; cands.forEach(f => { if (val(f) !== val(right) && !w.some(g => val(g) === val(f))) w.push(f); }); const ch = H.shuffle(R, [right, ...w.slice(0, 2)]); return [ch, ch.indexOf(right)]; };
    const fS = `${S}/${D}`, fR = `${rest}/${D}`;
    const [chC, okC] = mix(fS, [`${a + c}/${b + d}`, `${S}/${b + d}`, `${D}/${S}`]);
    const [chD, okD] = mix(fR, [fS, `${rest}/${b + d}`, `${D}/${rest}`, `${rest}/${D + b}`]);
    const okE = 'Pour écrire les deux fractions avec le même dénominateur';
    const [chE, okEi] = mix(okE, ['Parce qu’on additionne les deux dénominateurs', 'Parce qu’on multiplie les deux fractions']);
    const items = [num('a', n1, 0, String(n1), [{ v: a, m: 'Le numérateur ' + a + ' est le nombre de parts pour un découpage en ' + b + '. Ici la barre a ' + D + ' parts : multiplie ' + a + ' par ' + D / b + '.' }]),
      num('b', n2, 0, String(n2), [{ v: c, m: 'Multiplie le numérateur par le même nombre que le dénominateur : ' + c + ' × ' + D / d + '.' }]),
      qcm('c', chC, okC, fS, `${n1} parts + ${n2} parts = ${S} parts sur ${D} : on additionne les numérateurs et on garde le dénominateur ${D}.`),
      qcm('d', chD, okD, fR, `${D} − ${S} = ${rest} parts restent : ${fR} de la collection.`),
      qcm('e', chE, okEi, okE, 'On ne peut additionner que des parts de même taille : ' + D + ' est un multiple de ' + b + ' et de ' + d + '.')];
    xs(items, { a: `${a}/${b} = (${a} × ${D / b})/(${b} × ${D / b}) = ${n1}/${D} : ${n1} parts`, b: `${c}/${d} = (${c} × ${D / d})/(${d} × ${D / d}) = ${n2}/${D} : ${n2} parts` });
    return { titre: 'La barre de fractions', consigne: `Dans une collection, ${a}/${b} sont des ${ctx[0]} et ${c}/${d} des ${ctx[1]}. La barre ci-dessous est partagée en ${D} parts égales : les ${ctx[0]} sont en foncé, les ${ctx[1]} en rose clair.`,
      support: svg(W, 116, s, 'Barre partagée en parts égales') + `<p class="tr-l">a. Combien de parts de la barre représentent ${a}/${b} de la collection ?</p><p class="tr-l">b. Combien de parts de la barre représentent ${c}/${d} de la collection ?</p><p class="tr-l">c. Quelle fraction de la collection représentent les ${ctx[0]} et les ${ctx[1]} ensemble ?</p><p class="tr-l">d. Quelle fraction de la collection reste-t-il pour les autres ?</p><p class="tr-l">e. Pourquoi a-t-on partagé la barre en ${D} parts égales ?</p>`, items,
      hints: ['Cherche un nombre qui est dans la table de ' + b + ' et dans celle de ' + d + '.', 'Pour changer de dénominateur, on multiplie en haut et en bas par le même nombre.', 'La collection entière vaut ' + D + '/' + D + ' : le reste, c’est ' + D + ' moins le nombre de parts déjà colorées.'] };
  };

  /* e2 · puissances de 10 et préfixes */
  TR.c2e2 = R => {
    const p = int(R, 2, 6), q = int(R, 2, 5), u = int(R, 5, 9), v = int(R, 2, 4), n = int(R, 2, 4);
    const pre = pick(R, [['méga', 'M', 6, 'Mbit', 'bits', 'débit d’une box'], ['giga', 'G', 9, 'Go', 'octets', 'mémoire d’une console'], ['kilo', 'k', 3, 'ko', 'octets', 'taille d’une image']]);
    const k = pick(R, [15, 25, 40, 64, 120, 500]);
    const items = [num('a', p + q, 0, String(p + q), [{ v: p * q, m: 'On additionne les exposants : 10' + sup(p) + ' × 10' + sup(q) + ' = 10 puissance ' + p + ' + ' + q + '.' }]),
      num('b', u - v, 0, String(u - v), [{ v: u / v, m: 'Pour une division, on soustrait les exposants.' }]),
      num('c', pre[2], 0, String(pre[2])),
      num('d', 10 ** -n, n, fr(10 ** -n), [{ v: -(10 ** n), m: '10 puissance −' + n + ' est un nombre positif, très petit : 1 ÷ 10' + sup(n) + '.' }])];
    xs(items, { a: `10${sup(p)} × 10${sup(q)} = 10${sup(p + q)} : on additionne les exposants ${p} + ${q}`, b: `10${sup(u)} ÷ 10${sup(v)} = 10${sup(u - v)} : on soustrait les exposants ${u} − ${v}`, c: `${pre[0]} = 10${sup(pre[2])} : ${k} ${pre[3]} = ${k} × 10${sup(pre[2])} ${pre[4]}`, d: `10${sup(-n)} = 1 ÷ 10${sup(n)} = ${fr(10 ** -n)}` });
    return { titre: 'Puissances de 10 et préfixes', consigne: 'Réponds à chaque question. Le tableau des préfixes t’aide.',
      support: table(['Préfixe', 'Symbole', 'Puissance de 10', 'En nombre'], [['giga', 'G', '10⁹', '1 000 000 000'], ['méga', 'M', '10⁶', '1 000 000'], ['kilo', 'k', '10³', '1 000'], ['milli', 'm', '10⁻³', '0,001']])
        + `<p class="tr-l">a. Écris 10${sup(p)} × 10${sup(q)} sous la forme « 10 puissance n ». Quel est l’exposant n ? n = ${tb('a', String(p + q), 10)}</p><p class="tr-l">b. Écris 10${sup(u)} ÷ 10${sup(v)} sous la forme « 10 puissance n ». Quel est l’exposant n ? n = ${tb('b', String(u - v), 10)}</p><p class="tr-l">c. ${pre[5]} : ${k} ${pre[3]}. Écris cette valeur en ${pre[4]} sous la forme « ${k} × 10 puissance n ». Quel est n ? n = ${tb('c', String(pre[2]), 10)}</p><p class="tr-l">d. Écris 10${sup(-n)} en écriture décimale : ${tb('d', fr(10 ** -n), 16)}</p>`, items,
      hints: ['Multiplier deux puissances de 10 : on additionne les exposants.', 'Diviser : on soustrait les exposants.', 'Un exposant négatif donne un nombre plus petit que 1 : 10⁻² = 0,01.'] };
  };

  /* e3 · écriture scientifique */
  const BIG = [[4500000, 'vues d’une bande-annonce'], [32000000, 'joueurs d’un jeu en ligne'], [870000, 'abonnés d’une chaîne de dessin'], [2600000000, 'écoutes d’une chanson'], [56000000, 'exemplaires d’une série de mangas']];
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
  /* ===== exercice ajouté : notion 2 (prendre une fraction d’une quantité) ===== */
  {
    const { Q, fr, pick, int, table, eur } = H, MCF = H.MC.frac;
    TR.c2e4 = R => {
      const b = pick(R, [3, 4, 5, 6, 8]), a = int(R, 2, b - 1), k = int(R, 3, 11), Qn = b * k, [u, nom] = pick(R, [['kg', 'de farine'], ['L', 'de peinture'], ['m', 'de câble'], ['€', 'de budget']]);
      const U = u === '€' ? ' €' : ' ' + u, par = Qn / b, tot = a * par;
      const b2 = pick(R, [4, 5, 10]), a2 = pick(R, b2 === 4 ? [1, 3] : b2 === 5 ? [2, 3, 4] : [3, 7]), S = b2 * int(R, 6, 30), pS = S / b2 * a2;
      return Q('Prendre une fraction d’une quantité', `On dispose de ${fr(Qn, 0)}${U} ${nom}. On en utilise ${MCF(a, b)}.`, [
        { lab: `Un ${b === 3 ? 'tiers' : b === 4 ? 'quart' : b === 5 ? 'cinquième' : b === 6 ? 'sixième' : 'huitième'} de la quantité (${fr(Qn, 0)} ÷ ${b}), en ${u}`, v: par, d: 2, x: `${fr(Qn, 0)} ÷ ${b} = ${fr(par)}` },
        { lab: `La quantité utilisée (${MCF(a, b)} de ${fr(Qn, 0)}), en ${u}`, v: tot, d: 2, x: `On divise par ${b}, puis on multiplie par ${a} : ${fr(par)} × ${a} = ${fr(tot)}`, err: [{ v: par, m: `Après avoir divisé par ${b}, multiplie par le numérateur ${a}.` }] },
        { lab: `La quantité restante, en ${u}`, v: Qn - tot, d: 2, x: `${fr(Qn, 0)} − ${fr(tot)} = ${fr(Qn - tot)}`, err: [{ v: tot, m: 'Il faut soustraire la quantité utilisée à la quantité de départ.' }] },
        { lab: `Prendre ${MCF(a, b)} d’une quantité, c’est la…`, qcm: [`multiplier par ${a}/${b}`, `diviser par ${a}/${b}`, `ajouter ${a}/${b}`], ok: 0, x: `Prendre une fraction d’une quantité, c’est multiplier la quantité par cette fraction : ${fr(Qn, 0)} × ${a}/${b} = ${fr(tot)}.` },
        { lab: `${MCF(a2, b2)} d’un budget de ${eur(S)}, en €`, v: pS, d: 2, x: `${fr(S)} ÷ ${b2} × ${a2} = ${fr(S / b2)} × ${a2} = ${fr(pS)}` }],
        ['Pour prendre une fraction d’une quantité, divise d’abord par le dénominateur.', 'Multiplie ensuite par le numérateur.', 'Le reste, c’est la quantité de départ moins la quantité utilisée.'],
        table(['Quantité de départ', 'Fraction utilisée'], [[`${fr(Qn, 0)}${U}`, MCF(a, b)]]));
    };
  }
  /* ===== niveaux 🌱 guidé et 🚀 défi · chapitre 2 ===== */
  {
    const { Q, AI, fr, pick, int, shuffle, table, eur } = H, MCF = H.MC.frac;
    /* e1 · additionner des fractions */
    TR.c2e1a = R => {
      const [a, b, c, d] = pick(R, [[1, 2, 1, 3], [1, 3, 1, 4], [1, 4, 1, 6], [1, 2, 1, 5], [2, 3, 1, 6], [1, 2, 1, 4], [3, 4, 1, 6], [2, 5, 1, 4], [1, 6, 1, 4], [3, 10, 1, 4], [1, 3, 1, 5], [1, 2, 3, 10]]), D = lcm(b, d), n1 = a * D / b, n2 = c * D / d, S = n1 + n2;
      const mult = n => [1, 2, 3, 4, 5, 6].map(k => n * k).join(' · '), [x, y] = pick(R, [['de jus', 'de lait'], ['de peinture bleue', 'de peinture blanche'], ['de sirop', 'd’eau']]);
      return Q('Additionner deux fractions, pas à pas', `Un mélange contient ${MCF(a, b)} L ${x} et ${MCF(c, d)} L ${y}. Calcule ${MCF(a, b)} + ${MCF(c, d)}.`, [
        { lab: `Plus petit multiple commun de ${b} et ${d}`, v: D, d: 0, w: 12, x: `Multiples de ${b} : ${mult(b)} ; multiples de ${d} : ${mult(d)} ; le premier en commun est ${D}.`, err: [{ v: b + d, m: 'On additionne les fractions, pas les dénominateurs. Cherche un multiple commun.' }] },
        { lab: `${MCF(a, b)} s’écrit ?/${D}. Quel est le numérateur`, v: n1, d: 0, w: 12, x: `${a} × ${D / b} = ${n1} : ${MCF(a, b)} = ${MCF(n1, D)}`, err: [{ v: a, m: 'Multiplie le numérateur par le même nombre que le dénominateur.' }] },
        { lab: `${MCF(c, d)} s’écrit ?/${D}. Quel est le numérateur`, v: n2, d: 0, w: 12, x: `${c} × ${D / d} = ${n2} : ${MCF(c, d)} = ${MCF(n2, D)}`, err: [{ v: c, m: 'Multiplie le numérateur par le même nombre que le dénominateur.' }] },
        { lab: `Numérateur de la somme ${MCF(n1, D)} + ${MCF(n2, D)}, en litres`, v: S, d: 0, w: 12, x: `${n1} + ${n2} = ${S} : le dénominateur ne change pas, ${MCF(a, b)} + ${MCF(c, d)} = ${MCF(S, D)}`, err: [{ v: a + c, m: 'Additionne les numérateurs qui ont le même dénominateur ' + D + '.' }] }],
        ['Cherche un nombre qui est dans la table de ' + b + ' et dans la table de ' + d + '.', 'Pour changer de dénominateur, multiplie le haut et le bas par le même nombre.', 'Quand les dénominateurs sont égaux, on additionne les numérateurs.'],
        AI(`${MCF(1, 2)} + ${MCF(1, 3)} : multiples de 2 : 2, 4, 6 ; multiples de 3 : 3, 6 ; dénominateur commun 6 ; ${MCF(1, 2)} = ${MCF(3, 6)} et ${MCF(1, 3)} = ${MCF(2, 6)} ; la somme est ${MCF(5, 6)}.`));
    };
    TR.c2e1d = R => {
      const [[a, b], [c, d], [e, f], D] = pick(R, [[[1, 2], [1, 3], [1, 12], 12], [[1, 4], [1, 3], [1, 6], 12], [[1, 2], [1, 4], [1, 5], 20], [[1, 3], [1, 4], [1, 5], 60], [[1, 2], [1, 5], [1, 10], 10], [[2, 5], [1, 4], [1, 10], 20]]);
      const n = [a * D / b, c * D / d, e * D / f], S = n[0] + n[1] + n[2], rest = D - S, k = int(R, 2, 5), N = D * k;
      const nom = pick(R, [['cartes', 'rares', 'brillantes', 'communes'], ['épisodes', 'd’action', 'comiques', 'dramatiques'], ['morceaux', 'rap', 'pop', 'rock']]);
      return Q('Trois fractions et le reste', `Sur ${N} ${nom[0]}, ${MCF(a, b)} sont ${nom[1]}, ${MCF(c, d)} ${nom[2]} et ${MCF(e, f)} ${nom[3]}. Les autres sont neutres.`, [
        { lab: `Dénominateur commun aux trois fractions`, v: D, d: 0, w: 12, x: `${D} est le plus petit multiple commun de ${b}, ${d} et ${f}.`, err: [{ v: b * d * f, m: 'Ce nombre convient, mais il y en a un plus petit : cherche le plus petit multiple commun.' }] },
        { lab: `Numérateur de la somme des trois fractions, sur ${D}`, v: S, d: 0, w: 12, x: `${MCF(a, b)} = ${MCF(n[0], D)}, ${MCF(c, d)} = ${MCF(n[1], D)}, ${MCF(e, f)} = ${MCF(n[2], D)} ; ${n[0]} + ${n[1]} + ${n[2]} = ${S}.`, err: [{ v: a + c + e, m: 'Remplace d’abord chaque fraction par une fraction de dénominateur ' + D + '.' }] },
        { lab: `Numérateur des neutres, sur ${D}`, v: rest, d: 0, w: 12, x: `Le tout vaut ${D}/${D} : ${D} − ${S} = ${rest}.`, err: [{ v: S, m: 'C’est la part des trois autres types. Le reste : ' + D + ' − ' + S + '.' }] },
        { lab: `Nombre de ${nom[0]} neutres`, v: rest * k, d: 0, w: 12, x: `Une part de ${D} vaut ${N} ÷ ${D} = ${k} ${nom[0]} ; ${rest} × ${k} = ${rest * k} ${nom[0]}.`, err: [{ v: rest, m: 'Une part vaut ' + k + ' ' + nom[0] + '. Multiplie le nombre de parts par ' + k + '.' }] }],
        ['Cherche le plus petit nombre qui est dans les trois tables.', 'Passe les trois fractions au même dénominateur, puis additionne les numérateurs.', 'Le reste, c’est le tout (D/D) moins la somme. Une part vaut N ÷ D.']);
    };
    /* e2 · puissances de 10 et préfixes */
    TR.c2e2a = R => {
      const p = int(R, 2, 4), q = int(R, 2, 4), u = int(R, 5, 8), v = int(R, 2, 4), pre = pick(R, [['kilo', 'ko', 'octets', 3], ['méga', 'Mo', 'octets', 6], ['giga', 'Go', 'octets', 9]]);
      return Q('Puissances de 10, pas à pas', '10 puissance n s’écrit avec un 1 suivi de n zéros. Réponds à chaque question.', [
        { lab: `Nombre de zéros dans 10${sup(p)}`, v: p, d: 0, w: 10, x: `10${sup(p)} = ${fr(10 ** p)} : ${p} zéros.`, err: [{ v: 10 ** p, m: 'On demande le nombre de zéros, pas la valeur.' }] },
        { lab: `10${sup(p)} × 10${sup(q)} = 10 puissance n, donc n =`, v: p + q, d: 0, w: 10, x: `${fr(10 ** p)} × ${fr(10 ** q)} = ${fr(10 ** (p + q))} = 10${sup(p + q)} : ${p} + ${q} = ${p + q}`, err: [{ v: p * q, m: 'Pour une multiplication, on additionne les exposants.' }] },
        { lab: `10${sup(u)} ÷ 10${sup(v)} = 10 puissance n, donc n =`, v: u - v, d: 0, w: 10, x: `On soustrait les exposants : ${u} − ${v} = ${u - v}`, err: [{ v: u + v, m: 'Pour une division, on soustrait les exposants.' }] },
        { lab: `Un ${pre[1]} contient 10 puissance n ${pre[2]} (préfixe ${pre[0]}). Quel est n ? n =`, v: pre[3], d: 0, w: 10, x: `${pre[0]} signifie 10${sup(pre[3])} : 1 ${pre[1]} = ${fr(10 ** pre[3])} ${pre[2]}.` }],
        ['Compte les zéros : 10 puissance 3 = 1 000, il y a trois zéros.', 'Multiplication : on additionne les exposants.', 'Division : on soustrait les exposants.'],
        table(['Préfixe', 'Puissance de 10', 'En nombre'], [['kilo', '10³', '1 000'], ['méga', '10⁶', '1 000 000'], ['giga', '10⁹', '1 000 000 000']]) + AI('10² × 10³ = 100 × 1 000 = 100 000 = 10⁵ ; on a bien 2 + 3 = 5.'));
    };
    TR.c2e2d = R => {
      const a = int(R, 3, 7), b = int(R, 2, 6), c = int(R, 1, a + b - 1), p = int(R, 2, 5), q = int(R, p + 1, p + 4), k = pick(R, [2, 3, 4, 5, 8]);
      return Q('Puissances de 10 : conversions et calculs', `Un fichier pèse ${k} Mo. On rappelle : 1 Mo = 10${sup(6)} octets, 1 ko = 10${sup(3)} octets et 1 Go = 10${sup(9)} octets.`, [
        { lab: `10${sup(a)} × 10${sup(b)} ÷ 10${sup(c)} = 10 puissance`, v: a + b - c, d: 0, w: 10, x: `D’abord ${a} + ${b} = ${a + b}, puis ${a + b} − ${c} = ${a + b - c}`, err: [{ v: a + b + c, m: 'On soustrait l’exposant du diviseur.' }] },
        { lab: `10${sup(-p)} × 10${sup(q)} = 10 puissance`, v: q - p, d: 0, w: 10, x: `On additionne les exposants : −${p} + ${q} = ${q - p}`, err: [{ v: -(p + q), m: 'Additionne −' + p + ' et ' + q + ' : c’est une soustraction.' }] },
        { lab: `Le fichier de ${k} Mo en octets : ${k} × 10 puissance`, v: 6, d: 0, w: 10, x: `1 Mo = 10${sup(6)} octets : ${k} Mo = ${k} × 10${sup(6)} octets = ${fr(k * 10 ** 6)} octets.`, err: [{ v: 3, m: 'Le préfixe méga correspond à 10 puissance 6.' }] },
        { lab: 'Le même fichier en ko', v: k * 1000, d: 0, w: 14, x: `${k} × 10${sup(6)} ÷ 10${sup(3)} = ${k} × 10${sup(3)} = ${fr(k * 1000)} ko`, err: [{ v: k, m: 'Un ko est beaucoup plus petit qu’un Mo : il y a 1 000 ko dans 1 Mo.' }] },
        { lab: 'Combien de fichiers de ce type dans 1 Go ?', v: 1000 / k, d: 1, w: 12, x: `1 Go = 10${sup(9)} octets ; ${k} Mo = ${k} × 10${sup(6)} octets ; 10${sup(9)} ÷ (${k} × 10${sup(6)}) = 1 000 ÷ ${k} = ${fr(1000 / k)}`, err: [{ v: 1000 * k, m: 'Divise le contenu du Go par la taille d’un fichier.' }] }],
        ['Multiplier : on additionne les exposants ; diviser : on les soustrait.', 'Un exposant négatif se traite comme un nombre négatif dans l’addition.', '1 Go = 1 000 Mo = 1 000 000 ko.']);
    };
    /* e3 · écriture scientifique */
    TR.c2e3a = R => {
      const [N, lab] = pick(R, [[4500000, 'vues d’une vidéo'], [32000000, 'joueurs d’un jeu'], [870000, 'abonnés d’une chaîne'], [6200000, 'écoutes d’un titre'], [91000, 'spectateurs d’un concert']]), [m, e] = sci(N), [m2, e2] = pick(R, [[3.2, 5], [7.5, 4], [1.8, 6], [6.4, 3]]), big = Math.round(m2 * 10 ** e2);
      const bad = pick(R, [[45, 5], [32, 6], [68, 4], [12, 7]]);
      return Q('L’écriture scientifique, pas à pas', `Écriture scientifique : a × 10 puissance n, avec a entre 1 et 10. Écris ${fr(N)} (${lab}) sous cette forme.`, [
        { lab: `On place la virgule après le premier chiffre non nul : a =`, v: m, d: 1, w: 12, x: `${fr(N)} : le premier chiffre est ${String(N)[0]}, donc a = ${fr(m)}`, err: [{ v: N, m: 'a doit être entre 1 et 10 : un seul chiffre avant la virgule.' }] },
        { lab: 'La virgule s’est déplacée de combien de rangs ? n =', v: e, d: 0, w: 10, x: `${fr(N)} = ${fr(m)} × 10${sup(e)} : la virgule s’est déplacée de ${e} rangs.`, err: [{ v: e + 1, m: 'Compte bien les rangs entre la virgule d’origine et sa nouvelle place.' }] },
        { lab: `${fr(m2)} × 10${sup(e2)} en écriture décimale`, v: big, d: 0, w: 16, x: `On décale la virgule de ${e2} rangs vers la droite : ${fr(big)}`, err: [{ v: m2 * e2, m: '10 puissance ' + e2 + ' n’est pas 10 × ' + e2 + '.' }] },
        { lab: `${bad[0]} × 10${sup(bad[1])} est-elle une écriture scientifique ?`, qcm: ['oui', 'non'], ok: 1, x: `${bad[0]} n’est pas entre 1 et 10 : ce n’est pas une écriture scientifique (${bad[0]} × 10${sup(bad[1])} = ${fr(bad[0] / 10)} × 10${sup(bad[1] + 1)}).` }],
        ['Dans a × 10 puissance n, a est entre 1 et 10 : un seul chiffre non nul avant la virgule.', 'n est le nombre de rangs dont la virgule se déplace.', 'Pour revenir à l’écriture décimale, décale la virgule de n rangs vers la droite.'],
        AI(`pour 530 000 : la virgule se place après le 5, donc a = 5,3 ; elle s’est déplacée de 5 rangs, donc 530 000 = 5,3 × 10⁵.`));
    };
    TR.c2e3d = R => {
      const [m1, e1] = pick(R, [[4, 3], [5, 2], [2, 4], [6, 3], [8, 2]]), [m2, e2] = pick(R, [[5, 2], [4, 5], [3, 4], [2, 3], [7, 2]]), M = m1 * m2, mm = M >= 10 ? M / 10 : M, ee = e1 + e2 + (M >= 10 ? 1 : 0);
      const [c1, f1] = [pick(R, [3.2, 4.8, 5.5, 2.4]), pick(R, [5, 6, 7])], [c2, f2] = [pick(R, [7.1, 9.1, 8.4, 6.5]), f1 - 1];
      return Q('Calculer avec l’écriture scientifique', `On multiplie deux grands nombres : (${m1} × 10${sup(e1)}) × (${m2} × 10${sup(e2)}).`, [
        { lab: `On multiplie d’abord ${m1} × ${m2} =`, v: M, d: 0, w: 10, x: `${m1} × ${m2} = ${M}`, err: [{ v: m1 + m2, m: 'Multiplie les deux nombres, ne les additionne pas.' }] },
        { lab: `Puis les puissances de 10 : 10${sup(e1)} × 10${sup(e2)} = 10 puissance`, v: e1 + e2, d: 0, w: 10, x: `On additionne les exposants : ${e1} + ${e2} = ${e1 + e2}`, err: [{ v: e1 * e2, m: 'Multiplication de puissances de 10 : on additionne les exposants.' }] },
        { lab: 'Exposant dans l’écriture scientifique finale', v: ee, d: 0, w: 10, x: M >= 10 ? `${M} × 10${sup(e1 + e2)} = ${fr(mm)} × 10${sup(1)} × 10${sup(e1 + e2)} = ${fr(mm)} × 10${sup(ee)}` : `${M} est déjà entre 1 et 10 : l’exposant reste ${ee}.`, err: [{ v: e1 + e2 + (M >= 10 ? 0 : 1), m: M >= 10 ? 'a vaut ' + M + ', plus grand que 10 : il faut l’ajuster.' : 'a est déjà entre 1 et 10.' }] },
        { lab: `Plus grand nombre : ${fr(c1)} × 10${sup(f1)} ou ${fr(c2)} × 10${sup(f2)} ?`, qcm: [`${fr(c1)} × 10${sup(f1)}`, `${fr(c2)} × 10${sup(f2)}`], ok: 0, x: `Les exposants se comparent d’abord : ${f1} > ${f2}, donc ${fr(c1)} × 10${sup(f1)} est le plus grand, même si ${fr(c1)} < ${fr(c2)}.` }],
        ['Multiplie séparément les nombres, puis les puissances de 10.', 'Si a dépasse 10, décale la virgule d’un rang et ajoute 1 à l’exposant.', 'Pour comparer deux écritures scientifiques, regarde d’abord les exposants.']);
    };
    /* e4 · fraction d’une quantité */
    TR.c2e4a = R => {
      const b = pick(R, [3, 4, 5, 6]), a = int(R, 2, b - 1), k = int(R, 3, 9), Qn = b * k * 2, par = Qn / b, tot = par * a, [u, nom] = pick(R, [['L', 'de peinture'], ['m', 'de câble'], ['kg', 'de farine']]);
      return Q('Prendre une fraction d’une quantité, pas à pas', `On dispose de ${fr(Qn, 0)} ${u} ${nom}. On en utilise ${MCF(a, b)}.`, [
        { lab: `En combien de parts égales partage-t-on la quantité ?`, v: b, d: 0, w: 10, x: `Le dénominateur est ${b} : on partage en ${b} parts.`, err: [{ v: a, m: 'Le nombre de parts est le dénominateur, en bas de la fraction.' }] },
        { lab: `Valeur d’une part (${fr(Qn, 0)} ÷ ${b}), en ${u}`, v: par, d: 2, w: 12, x: `${fr(Qn, 0)} ÷ ${b} = ${fr(par)}`, err: [{ v: Qn * b, m: 'Pour partager en ' + b + ', on divise.' }] },
        { lab: `Valeur de ${a} parts, en ${u}`, v: tot, d: 2, w: 12, x: `${fr(par)} × ${a} = ${fr(tot)}`, err: [{ v: par, m: 'Il faut ' + a + ' parts, pas une seule : multiplie par ' + a + '.' }] },
        { lab: `Quantité qui reste, en ${u}`, v: Qn - tot, d: 2, w: 12, x: `${fr(Qn, 0)} − ${fr(tot)} = ${fr(Qn - tot)}`, err: [{ v: tot, m: 'Soustrais la quantité utilisée à la quantité de départ.' }] }],
        ['Le dénominateur donne le nombre de parts égales.', 'Pour une part, on divise la quantité par le dénominateur.', 'On multiplie ensuite la valeur d’une part par le numérateur.'],
        AI(`les ${MCF(3, 4)} de 20 € : 20 ÷ 4 = 5 € pour une part ; 5 × 3 = 15 €.`));
    };
    TR.c2e4d = R => {
      const [Q0, a1, b1, a2, b2] = pick(R, [[120, 1, 4, 1, 3], [240, 1, 3, 1, 4], [360, 1, 3, 3, 8], [180, 2, 5, 1, 4], [300, 1, 5, 3, 4], [200, 3, 10, 2, 5]]), Qn = Q0 * pick(R, [1, 2, 3, 5]);
      const u1 = Qn / b1 * a1, r1 = Qn - u1, u2 = r1 / b2 * a2, r2 = r1 - u2;
      return Q('Deux fractions à la suite', `Un budget de ${eur(Qn)} est dépensé en deux fois : d’abord ${MCF(a1, b1)} du budget, puis ${MCF(a2, b2)} de ce qui reste.`, [
        { lab: 'Première dépense, en €', v: u1, d: 2, w: 12, x: `${fr(Qn)} ÷ ${b1} × ${a1} = ${fr(u1)}` },
        { lab: 'Budget restant après la première dépense, en €', v: r1, d: 2, w: 12, x: `${fr(Qn)} − ${fr(u1)} = ${fr(r1)}`, err: [{ v: u1, m: 'C’est la dépense. Le reste : budget − dépense.' }] },
        { lab: 'Deuxième dépense, en €', v: u2, d: 2, w: 12, x: `${MCF(a2, b2)} de ${fr(r1)} : ${fr(r1)} ÷ ${b2} × ${a2} = ${fr(u2)}`, err: [{ v: Qn / b2 * a2, m: 'La deuxième fraction s’applique à ce qui reste, pas au budget de départ.' }] },
        { lab: 'Budget restant à la fin, en €', v: r2, d: 2, w: 12, x: `${fr(r1)} − ${fr(u2)} = ${fr(r2)}` },
        { lab: 'Total dépensé, en €', v: u1 + u2, d: 2, w: 12, x: `${fr(u1)} + ${fr(u2)} = ${fr(u1 + u2)}, soit ${fr(Qn)} − ${fr(r2)}`, err: [{ v: u1, m: 'Ajoute aussi la deuxième dépense.' }] }],
        ['Première dépense : budget ÷ dénominateur × numérateur.', 'La deuxième fraction se calcule sur le reste, pas sur le budget de départ.', 'Total dépensé = première dépense + deuxième dépense.']);
    };
  }
})(typeof module !== 'undefined' ? module.exports : window);
