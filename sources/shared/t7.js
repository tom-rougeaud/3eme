/* 3ème Série Pro · chapitre 7 — Probabilités : issues, événements, probabilité, événement contraire,
   expérience à deux épreuves, fréquence et probabilité. */
(function (root) {
  'use strict';
  const { DEP, TR, H } = typeof module !== 'undefined' ? require('./train.js').MCVT : root.MCVT;
  const { fr, rnd, tb, T, svg, table, num, qcm, pick, int, xs, MC } = H;
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const fx = (k, n) => { const g = gcd(k, n) || 1; return k === 0 ? '0' : k === n ? '1' : (g > 1 ? `${k}/${n} = ${k / g}/${n / g}` : `${k}/${n}`); };
  const tolF = .002;

  /* point de départ : le sac de dés d’un club de jeux de rôle */
  DEP.c7 = R => {
    const a = int(R, 3, 6), b = int(R, 2, 4), c = 10 - a - b, N = 10;
    const doc = `<table class="dt tcx dt-sm"><thead><tr><th>Dé</th><th>Nombre dans le sac</th></tr></thead><tbody><tr><th>dé à 6 faces</th><td data-cell="0">${a}</td></tr><tr><th>dé à 8 faces</th><td data-cell="1">${b}</td></tr><tr><th>dé à 20 faces</th><td data-cell="2">${c}</td></tr></tbody></table><p class="srcl">On tire un dé au hasard, sans regarder.</p>`;
    return { titre: 'Le sac de dés', doc,
      qs: [{ t: 'Touche le nombre de dés à 20 faces.', kind: 'tap', cell: '2', v: c, tol: .01, a: String(c) },
        { t: 'Combien y a-t-il de dés en tout ?', kind: 'num', v: N, tol: .01, a: '10', x: `${a} + ${b} + ${c} = 10` },
        { t: 'Quelle est la probabilité de tirer un dé à 20 faces ? (fraction ou décimal)', kind: 'num', v: c / N, tol: tolF, a: fx(c, N), x: `${c} dés favorables sur 10 : ${fx(c, N)}` },
        { t: 'Quelle est la probabilité de ne pas tirer un dé à 8 faces ?', kind: 'num', v: 1 - b / N, tol: tolF, a: fr(1 - b / N), x: `1 − ${b}/10 = ${10 - b}/10 = ${fr(1 - b / N)}` },
        { t: 'Tirer un dé à 4 faces est un événement :', kind: 'qcm', choices: ['impossible', 'certain', 'probable'], ok: 0, a: 'impossible : il n’y en a pas dans le sac', x: 'aucun dé à 4 faces : probabilité 0' }] };
  };

  /* e1 · les issues d’un dé */
  TR.c7e1 = R => {
    const n = pick(R, [6, 8, 10, 12, 20]), k = int(R, Math.ceil(n / 2), n - 1), fav1 = n - k + 1, fav2 = Math.floor(n / 2), m = pick(R, [3, 4, 5].filter(d => d < n)), fav3 = Math.floor(n / m);
    const items = [num('a', n, 0, String(n)), num('b', fav1, 0, String(fav1), [{ v: n - k, m: 'N’oublie pas ' + k + ' lui-même : « ' + k + ' ou plus ».' }]), num('c', fav1 / n, 3, fx(fav1, n)), num('d', fav2 / n, 3, fx(fav2, n)), num('e', fav3 / n, 3, fx(fav3, n)), num('f', 1 - fav1 / n, 3, fx(n - fav1, n), [{ v: fav1 / n, m: 'L’événement contraire : 1 − P(« ' + k + ' ou plus »).' }])];
    xs(items, { a: `les faces 1 à ${n}`, b: `${k}, …, ${n} : ${n} − ${k} + 1 = ${fav1} issues`, c: `${fav1} issues favorables sur ${n} : ${fx(fav1, n)}`, d: `nombres pairs de 2 à ${n} : ${fav2} issues ; ${fx(fav2, n)}`, e: `multiples de ${m} jusqu’à ${n} : ${Array.from({ length: fav3 }, (_, i) => m * (i + 1)).join(', ')} ; ${fx(fav3, n)}`, f: `1 − ${fav1}/${n} = ${n - fav1}/${n}` });
    return { titre: 'Les issues d’un dé', consigne: `On lance un dé équilibré à ${n} faces, numérotées de 1 à ${n}. Réponds par une fraction ou un nombre décimal.`,
      support: table(['Question', 'Réponse'], [['a. Nombre d’issues possibles', tb('a', String(n), 12)], [`b. Issues favorables à « ${k} ou plus »`, tb('b', String(fav1), 12)], [`c. P(« ${k} ou plus »)`, tb('c', fx(fav1, n), 16)], ['d. P(« nombre pair »)', tb('d', fx(fav2, n), 16)], [`e. P(« multiple de ${m} »)`, tb('e', fx(fav3, n), 16)], [`f. P(« moins de ${k} »)`, tb('f', fx(n - fav1, n), 16)]]), items,
      hints: ['Le dé est équilibré : toutes les faces ont la même chance.', 'Probabilité = issues favorables ÷ issues possibles.', '« Moins de ' + k + ' » est le contraire de « ' + k + ' ou plus ».'] };
  };

  /* e2 · le tableau à double entrée */
  TR.c7e2 = R => {
    const [p, q] = pick(R, [[4, 6], [6, 6], [4, 4], [6, 8], [3, 6]]), Ns = [];
    for (let i = 1; i <= p; i++) for (let j = 1; j <= q; j++) Ns.push(i + j);
    const sums = [...new Set(Ns)], s = pick(R, sums.filter(x => Ns.filter(y => y === x).length >= 2)), fav = Ns.filter(y => y === s).length, dbl = Math.min(p, q), N = p * q;
    let tbl = `<table class="dt tcx dt-sm"><thead><tr><th>+</th>${Array.from({ length: q }, (_, j) => `<th>${j + 1}</th>`).join('')}</tr></thead><tbody>`;
    for (let i = 1; i <= p; i++) tbl += `<tr><th>${i}</th>${Array.from({ length: q }, (_, j) => `<td>${i === 1 && j === 0 ? '2' : ''}</td>`).join('')}</tr>`;
    tbl += '</tbody></table>';
    const items = [num('a', N, 0, String(N), [{ v: p + q, m: 'On multiplie : ' + p + ' × ' + q + '.' }]), num('b', fav, 0, String(fav)), num('c', fav / N, 3, fx(fav, N)), num('d', dbl / N, 3, fx(dbl, N))];
    xs(items, { a: `${p} × ${q} = ${N} cases, toutes équiprobables`, b: `cases où la somme vaut ${s} : ${fav}`, c: `${fav} ÷ ${N} : ${fx(fav, N)}`, d: `doubles : (1 ; 1) … (${dbl} ; ${dbl}), ${dbl} cases : ${fx(dbl, N)}` });
    return { titre: 'Deux dés : le tableau', consigne: `Deux dés équilibrés, à ${p} et à ${q} faces : on additionne les deux nombres. Complète le tableau des sommes au brouillon.`,
      support: tbl + `<p class="tr-l">a. Nombre d’issues : ${tb('a', String(N), 12)} · b. Cases où la somme vaut ${s} : ${tb('b', String(fav), 12)}</p><p class="tr-l">c. P(somme = ${s}) : ${tb('c', fx(fav, N), 16)} · d. P(obtenir un double) : ${tb('d', fx(dbl, N), 16)}</p>`, items,
      hints: ['Chaque case : numéro de la ligne + numéro de la colonne.', 'Nombre d’issues = nombre de cases du tableau.', 'Un double : les deux dés donnent le même nombre.'] };
  };

  /* e3 · fréquence ou probabilité ? */
  TR.c7e3 = R => {
    const N = pick(R, [60, 120, 300, 600]), c = [0, 0, 0, 0, 0, 0], S = MC.rng(int(R, 1, 1e6));
    for (let i = 0; i < N; i++) c[Math.floor(S() * 6)]++;
    const f = int(R, 1, 6), fr1 = rnd(c[f - 1] / N, 3), pair = c[1] + c[3] + c[5], frp = rnd(pair / N, 3);
    const items = [num('a', fr1, 3, fr(fr1), [{ v: rnd(N / c[f - 1], 3), m: 'Fréquence = effectif ÷ nombre total de lancers.' }]), num('b', 1 / 6, 3, '1/6 ≈ 0,167'), num('c', frp, 3, fr(frp)), num('d', N / 6, 0, fr(N / 6))];
    xs(items, { a: `${c[f - 1]} ÷ ${N} ≈ ${fr(fr1)}`, b: '6 faces équiprobables : 1/6 ≈ 0,167', c: `(${c[1]} + ${c[3]} + ${c[5]}) ÷ ${N} = ${pair} ÷ ${N} ≈ ${fr(frp)}`, d: `${N} × 1/6 = ${fr(N / 6)}` });
    return { titre: 'Fréquence ou probabilité ?', consigne: `Un tableur a simulé ${N} lancers d’un dé équilibré à 6 faces. Voici les effectifs obtenus.`,
      support: table(['Face', '1', '2', '3', '4', '5', '6'], [['Effectif', ...c.map(String)]]) + `<p class="tr-l">a. Fréquence de la face ${f}, au millième : ${tb('a', fr(fr1), 14)} · b. Probabilité de la face ${f} : ${tb('b', '1/6', 14)}</p><p class="tr-l">c. Fréquence d’un nombre pair, au millième : ${tb('c', fr(frp), 14)} · d. Nombre de ${f} attendu en théorie : ${tb('d', fr(N / 6), 12)}</p>`, items,
      hints: ['Fréquence = effectif ÷ nombre de lancers.', 'Probabilité : 1 issue favorable sur 6.', 'Plus il y a de lancers, plus la fréquence se rapproche de la probabilité.'] };
  };
  /* ===== exercice ajouté : notion 2 (événement contraire, impossible, certain) ===== */
  {
    const { Q, fr, pick, int, table, rnd } = H;
    TR.c7e4 = R => {
      const N = pick(R, [20, 25, 50]), r = int(R, 3, Math.floor(N / 2)), v = int(R, 2, N - r - 3), b = N - r - v, pr = r / N, pv = v / N;
      return Q('Événement contraire', `Un sac contient ${N} boules indiscernables au toucher : on tire une boule au hasard. R est l’événement « la boule est rouge ».`, [
        { lab: 'P(R), probabilité de tirer une boule rouge', v: pr, d: 2, x: `${r} boules rouges sur ${N} : ${r} ÷ ${N} = ${fr(pr)}`, err: [{ v: rnd(r / (N - r), 2), m: 'Divise par le nombre total de boules.' }] },
        { lab: 'P(non R), probabilité de ne pas tirer de boule rouge', v: 1 - pr, d: 2, x: `P(non R) = 1 − P(R) = 1 − ${fr(pr)} = ${fr(1 - pr)}`, err: [{ v: pr, m: 'La probabilité du contraire vaut 1 − P(R).' }] },
        { lab: 'Probabilité de ne pas tirer de boule verte, en % (au dixième)', v: rnd((1 - pv) * 100, 1), d: 1, w: 14, x: `1 − ${v}/${N} = 1 − ${fr(pv)} = ${fr(1 - pv)} soit ${fr(rnd((1 - pv) * 100, 1), 1)} %`, err: [{ v: rnd(pv * 100, 1), m: 'On cherche la probabilité de ne pas tirer de verte : c’est 1 − P(verte).' }] },
        { lab: 'Tirer une boule jaune (il n’y en a aucune) est un événement…', qcm: ['impossible', 'certain', 'ni l’un ni l’autre'], ok: 0, x: 'Aucune boule jaune dans le sac : l’événement ne peut pas se produire, sa probabilité est 0 (événement impossible).' },
        { lab: 'Tirer une boule rouge, verte ou bleue est un événement…', qcm: ['impossible', 'certain', 'ni l’un ni l’autre'], ok: 1, x: `Toutes les boules sont rouges, vertes ou bleues (${r} + ${v} + ${b} = ${N}) : l’événement se produit toujours, sa probabilité est 1 (événement certain).` }],
        ['La probabilité du contraire vaut 1 moins la probabilité de l’événement.', 'Un événement impossible a une probabilité de 0, un événement certain de 1.', 'Probabilité = nombre de cas favorables ÷ nombre de cas possibles.'],
        table(['Couleur', 'rouge', 'verte', 'bleue'], [['Nombre de boules', r, v, b]]));
    };
  }
  /* ===== niveaux 🌱 guidé et 🚀 défi · chapitre 7 ===== */
  {
    const { Q, AI, shuffle } = H;
    const sumTbl = (p, q) => `<table class="dt tcx dt-sm"><thead><tr><th>+</th>${Array.from({ length: q }, (_, j) => `<th>${j + 1}</th>`).join('')}</tr></thead><tbody>${Array.from({ length: p }, (_, i) => `<tr><th>${i + 1}</th>${Array.from({ length: q }, (_, j) => `<td>${i + j + 2}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    const blankTbl = (p, q) => `<table class="dt tcx dt-sm"><thead><tr><th>+</th>${Array.from({ length: q }, (_, j) => `<th>${j + 1}</th>`).join('')}</tr></thead><tbody>${Array.from({ length: p }, (_, i) => `<tr><th>${i + 1}</th>${Array.from({ length: q }, (_, j) => `<td>${i === 0 && j === 0 ? '2' : ''}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
    /* e1 · issues d’un dé */
    TR.c7e1a = R => {
      const n = pick(R, [6, 8, 10, 12, 20]), k = n - pick(R, [1, 2, 3]), fav = n - k + 1;
      return Q('Les issues d’un dé, pas à pas', `On lance un dé équilibré à ${n} faces, numérotées de 1 à ${n}. Toutes les faces ont la même chance.`, [
        { lab: 'Nombre d’issues possibles', v: n, d: 0, w: 10, x: `Les faces 1 à ${n} : ${n} issues possibles.` },
        { lab: `Issues favorables à « ${k} ou plus »`, v: fav, d: 0, w: 10, x: `${Array.from({ length: fav }, (_, i) => k + i).join(', ')} : ${fav} issues. (${n} − ${k} + 1 = ${fav})`, err: [{ v: n - k, m: 'N’oublie pas ' + k + ' lui-même : « ' + k + ' ou plus ».' }] },
        { lab: `P(« ${k} ou plus »)`, v: fav / n, d: 3, w: 14, a: fx(fav, n), x: `${fav} issues favorables sur ${n} : ${fx(fav, n)}`, err: [{ v: n / fav, m: 'Probabilité = issues favorables ÷ issues possibles (et non l’inverse).' }] },
        { lab: 'Issues favorables à « nombre pair »', v: n / 2, d: 0, w: 10, x: `Pairs : ${Array.from({ length: n / 2 }, (_, i) => 2 * (i + 1)).join(', ')} : ${n / 2} issues.` },
        { lab: 'P(« nombre pair »)', v: .5, d: 3, w: 14, a: fx(n / 2, n), x: `${n / 2} issues favorables sur ${n} : ${fx(n / 2, n)}` }],
        ['Compte les issues favorables une par une.', 'Probabilité = issues favorables ÷ issues possibles.', 'Une probabilité est toujours entre 0 et 1.'],
        table(['Face', ...Array.from({ length: n }, (_, i) => String(i + 1))], [['Pair ?', ...Array.from({ length: n }, (_, i) => (i + 1) % 2 ? '' : '✓')]]) + AI(`dé à 6 faces, « 5 ou plus » : faces 5 et 6, soit 2 issues favorables sur 6 : P = 2/6 = 1/3.`));
    };
    TR.c7e1d = R => {
      const [n, cnt, kk] = pick(R, [[12, [5, 3, 2, 2], 5], [12, [4, 3, 3, 2], 10], [12, [6, 3, 2, 1], 5], [12, [4, 4, 3, 1], 10], [20, [8, 6, 4, 2], 5], [20, [7, 5, 5, 3], 5], [20, [10, 5, 3, 2], 5], [20, [6, 6, 5, 3], 10]]), [r, b, v, j] = cnt, N = n * kk;
      return Q('Un dé aux faces colorées', `Un dé équilibré à ${n} faces a ${r} faces rouges, ${b} bleues, ${v} vertes et ${j} jaunes. On le lance une fois.`, [
        { lab: 'P(« rouge »)', v: r / n, d: 3, w: 14, a: fx(r, n), x: `${r} faces rouges sur ${n} : ${fx(r, n)}` },
        { lab: 'P(« rouge ou verte »)', v: (r + v) / n, d: 3, w: 14, a: fx(r + v, n), x: `${r} + ${v} = ${r + v} faces favorables sur ${n} : ${fx(r + v, n)}`, err: [{ v: r / n, m: 'Compte aussi les faces vertes : « rouge ou verte ».' }] },
        { lab: 'P(« ni rouge ni verte »)', v: (b + j) / n, d: 3, w: 14, a: fx(b + j, n), x: `Événement contraire de « rouge ou verte » : 1 − ${fx(r + v, n).split(' =')[0]} = ${fx(b + j, n)}`, err: [{ v: (r + v) / n, m: 'C’est l’événement contraire : 1 − P(« rouge ou verte »).' }] },
        { lab: `Nombre de « rouge » attendu en ${N} lancers`, v: r * kk, d: 0, w: 12, x: `${N} ÷ ${n} = ${kk} ; ${kk} × ${r} = ${r * kk} (c’est ${N} × ${fx(r, n).split(' =')[0]})`, err: [{ v: r, m: 'Multiplie la probabilité par le nombre de lancers.' }] },
        { lab: '« rouge, bleue, verte ou jaune » est un événement…', qcm: ['impossible', 'certain', 'ni l’un ni l’autre'], ok: 1, x: 'Toutes les faces sont rouges, bleues, vertes ou jaunes : l’événement se produit toujours, sa probabilité vaut 1 (certain).' }],
        ['Probabilité = faces favorables ÷ faces possibles.', '« Ou » : on additionne les faces favorables (sans compter deux fois la même).', 'Le contraire d’un événement : 1 − sa probabilité.'],
        table(['Couleur', 'rouge', 'bleue', 'verte', 'jaune'], [['Nombre de faces', r, b, v, j]]));
    };
    /* e2 · deux dés */
    TR.c7e2a = R => {
      const p = pick(R, [3, 4, 5]), N = p * p; const cnt = s => { let c = 0; for (let i = 1; i <= p; i++) for (let j = 1; j <= p; j++) if (i + j === s) c++; return c; };
      const s = pick(R, Array.from({ length: 2 * p - 1 }, (_, i) => i + 2).filter(x => cnt(x) >= 2 && x !== p + 1)), c = cnt(s);
      return Q('Deux dés, pas à pas', `Deux dés équilibrés à ${p} faces : on additionne les deux nombres. Le tableau donne toutes les sommes possibles.`, [
        { lab: 'Nombre d’issues (nombre de cases)', v: N, d: 0, w: 10, x: `${p} × ${p} = ${N} cases, toutes équiprobables.`, err: [{ v: 2 * p, m: 'On multiplie : ' + p + ' lignes × ' + p + ' colonnes.' }] },
        { lab: `Cases où la somme vaut ${s}`, v: c, d: 0, w: 10, x: `On compte les cases qui contiennent ${s} : ${c}.` },
        { lab: `P(somme = ${s})`, v: c / N, d: 3, w: 14, a: fx(c, N), x: `${c} cases sur ${N} : ${fx(c, N)}`, err: [{ v: N / c, m: 'Cases favorables ÷ cases possibles.' }] },
        { lab: 'Somme qui apparaît le plus souvent', v: p + 1, d: 0, w: 10, x: `La somme ${p + 1} apparaît ${p} fois : c’est celle qui apparaît le plus souvent.`, err: [{ v: 2, m: 'Compte les cases : la plus petite somme est la plus rare.' }] }],
        ['Chaque case : numéro de la ligne + numéro de la colonne.', 'Nombre d’issues = nombre de cases du tableau.', 'Compte les cases qui contiennent la somme demandée.'],
        sumTbl(p, p) + AI(`avec deux dés à 3 faces, la somme 4 apparaît 3 fois sur 9 cases : P = 3/9 = 1/3.`));
    };
    TR.c7e2d = R => {
      const cnt = s => { let c = 0; for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) if (i + j === s) c++; return c; };
      const s = pick(R, [5, 6, 7, 8, 9]), c = cnt(s), t = pick(R, [9, 10, 11]); let ge = 0; for (let x = t; x <= 12; x++) ge += cnt(x);
      return Q('Deux dés à six faces', 'On lance deux dés équilibrés à 6 faces et on additionne les résultats. Complète le tableau au brouillon si besoin.', [
        { lab: `Nombre de cases où la somme vaut ${s}`, v: c, d: 0, w: 10, x: `Sur les 36 cases, ${c} contiennent ${s}.` },
        { lab: `P(somme = ${s})`, v: c / 36, d: 3, w: 14, a: fx(c, 36), x: `${c} cases sur 36 : ${fx(c, 36)}` },
        { lab: `P(somme ≠ ${s})`, v: 1 - c / 36, d: 3, w: 14, a: fx(36 - c, 36), x: `Événement contraire : 1 − ${c}/36 = ${fx(36 - c, 36)}`, err: [{ v: c / 36, m: 'C’est la probabilité de l’événement contraire : 1 − P(somme = ' + s + ').' }] },
        { lab: `P(somme ≥ ${t})`, v: ge / 36, d: 3, w: 14, a: fx(ge, 36), x: `Sommes ${Array.from({ length: 13 - t }, (_, i) => t + i).join(', ')} : ${Array.from({ length: 13 - t }, (_, i) => cnt(t + i)).join(' + ')} = ${ge} cases sur 36 : ${fx(ge, 36)}`, err: [{ v: cnt(t) / 36, m: '« ' + t + ' ou plus » : compte aussi les sommes supérieures à ' + t + '.' }] },
        { lab: `Nombre de fois où la somme vaut ${s}, attendu en 360 lancers`, v: c * 10, d: 0, w: 12, x: `360 × ${c}/36 = 10 × ${c} = ${c * 10}`, err: [{ v: c, m: 'Multiplie la probabilité par 360.' }] }],
        ['Il y a 6 × 6 = 36 cases dans le tableau.', 'Probabilité = cases favorables ÷ 36.', 'Pour « ≥ », additionne les cases de chaque somme concernée.'], blankTbl(6, 6));
    };
    /* e3 · fréquence et probabilité */
    TR.c7e3a = R => {
      const N = pick(R, [100, 200, 500]), ratio = pick(R, [.44, .46, .47, .52, .53, .55]), P1 = Math.round(N * ratio), F1 = N - P1;
      return Q('Fréquence et probabilité, pas à pas', `Une pièce équilibrée est lancée ${N} fois : on obtient ${P1} « pile » et ${F1} « face ».`, [
        { lab: 'Fréquence de « pile » (effectif ÷ nombre de lancers)', v: P1 / N, d: 3, w: 14, a: fr(P1 / N), x: `${P1} ÷ ${N} = ${fr(P1 / N)}`, err: [{ v: rnd(N / P1, 3), m: 'Fréquence = effectif ÷ nombre total de lancers.' }] },
        { lab: 'Fréquence de « face »', v: F1 / N, d: 3, w: 14, a: fr(F1 / N), x: `${F1} ÷ ${N} = ${fr(F1 / N)} (les deux fréquences ont pour somme 1)` },
        { lab: 'Probabilité théorique de « pile »', v: .5, d: 3, w: 14, a: '1/2 = 0,5', x: 'La pièce est équilibrée : 1 issue favorable sur 2, soit 1/2 = 0,5.' },
        { lab: 'Écart entre la fréquence de « pile » et 0,5', v: Math.abs(P1 / N - .5), d: 3, w: 14, a: fr(rnd(Math.abs(P1 / N - .5), 3)), x: `|${fr(P1 / N)} − 0,5| = ${fr(rnd(Math.abs(P1 / N - .5), 3))}` },
        { lab: 'Avec 10 000 lancers, la fréquence de « pile » sera probablement…', qcm: ['plus proche de 0,5', 'exactement 0,5', 'plus éloignée de 0,5'], ok: 0, x: 'Quand le nombre de lancers augmente, la fréquence se rapproche de la probabilité, sans être forcément égale à elle.' }],
        ['Fréquence = effectif ÷ nombre de lancers.', 'Pour une pièce équilibrée, la probabilité de « pile » est 1/2.', 'Plus on lance de fois, plus la fréquence se rapproche de la probabilité.'],
        table(['Résultat', 'pile', 'face', 'total'], [['Effectif', P1, F1, N]]) + AI('pièce lancée 50 fois, 24 « pile » : fréquence 24 ÷ 50 = 0,48 ; la probabilité théorique est 0,5.'));
    };
    TR.c7e3d = R => {
      const N = pick(R, [600, 1200]), u = N / 600, k = int(R, 1, 6), trucage = R() < .5; let c;
      if (trucage) { c = Array(6).fill(88 * u); c[k - 1] = 160 * u; }
      else { const L = pick(R, [[-6, 4, -2, 5, -4, 3], [3, -7, 6, -2, -4, 4]]), D = shuffle(R, L); c = D.map(d => 100 * u + d * u); }
      const f = c[k - 1] / N, e = Math.abs(f - 1 / 6);
      return Q('Ce dé est-il équilibré ?', `Un dé à 6 faces est lancé ${N} fois. Le tableau donne les effectifs. On examine la face ${k}.`, [
        { lab: 'Nombre total de lancers (somme des effectifs)', v: N, d: 0, w: 12, x: `${c.join(' + ')} = ${N}`, err: [{ v: 6, m: 'Additionne les six effectifs.' }] },
        { lab: `Fréquence de la face ${k}, au millième`, v: f, d: 3, w: 12, a: fr(rnd(f, 3)), x: `${c[k - 1]} ÷ ${N} ${Number.isInteger(f * 1000) ? '=' : '≈'} ${fr(rnd(f, 3))}`, err: [{ v: rnd(N / c[k - 1], 3), m: 'Fréquence = effectif ÷ nombre total de lancers.' }] },
        { lab: 'Probabilité théorique de la face avec un dé équilibré', v: 1 / 6, d: 3, w: 14, a: '1/6 ≈ 0,167', x: '6 faces équiprobables : 1/6 ≈ 0,167' },
        { lab: 'Écart entre la fréquence et 1/6, au millième', v: e, d: 3, w: 12, a: fr(rnd(e, 3)), x: `|${fr(rnd(f, 3))} − 0,167| ≈ ${fr(rnd(e, 3))}`, err: [{ v: rnd(f, 3), m: 'Soustrais la probabilité 0,167 à la fréquence.' }] },
        { lab: 'D’après la face ' + k + ', ce dé semble…', qcm: ['équilibré', 'truqué'], ok: trucage ? 1 : 0, x: trucage ? `L’écart est de ${fr(rnd(e, 3))} : c’est très grand pour ${N} lancers. Ce dé semble truqué.` : `L’écart est de ${fr(rnd(e, 3))} : il est petit, compatible avec un dé équilibré.` }],
        ['Fréquence = effectif ÷ nombre total de lancers.', 'Probabilité théorique d’une face : 1/6 ≈ 0,167.', 'Avec beaucoup de lancers, un grand écart entre fréquence et probabilité est suspect.'],
        table(['Face', '1', '2', '3', '4', '5', '6'], [['Effectif', ...c.map(String)]]));
    };
    /* e4 · événement contraire */
    TR.c7e4a = R => {
      const N = pick(R, [10, 20]), r = int(R, 2, N / 2 - 1), v = int(R, 2, N - r - 2), b = N - r - v, pr = r / N;
      return Q('Événement contraire, pas à pas', `Un sac contient ${N} boules indiscernables au toucher. On tire une boule au hasard. R est l’événement « la boule est rouge ».`, [
        { lab: 'Nombre de boules qui ne sont pas rouges', v: N - r, d: 0, w: 10, x: `${N} − ${r} = ${N - r} boules`, err: [{ v: r, m: 'On cherche les boules qui ne sont pas rouges : total − rouges.' }] },
        { lab: 'P(R)', v: pr, d: 2, w: 12, a: fr(pr), x: `${r} boules rouges sur ${N} : ${r} ÷ ${N} = ${fr(pr)}`, err: [{ v: rnd(r / (N - r), 2), m: 'Divise par le nombre total de boules.' }] },
        { lab: 'P(non R) = 1 − P(R)', v: 1 - pr, d: 2, w: 12, a: fr(1 - pr), x: `1 − ${fr(pr)} = ${fr(1 - pr)} (contrôle : ${N - r} ÷ ${N} = ${fr(1 - pr)})`, err: [{ v: pr, m: 'La probabilité du contraire vaut 1 − P(R).' }] },
        { lab: 'Tirer une boule jaune (il n’y en a aucune) est un événement…', qcm: ['impossible', 'certain', 'ni l’un ni l’autre'], ok: 0, x: 'Aucune boule jaune : l’événement ne peut pas se produire, sa probabilité est 0 (impossible).' }],
        ['Le contraire de « rouge » : toutes les autres couleurs.', 'P(contraire) = 1 − P(événement).', 'Un événement impossible a une probabilité 0, un événement certain une probabilité 1.'],
        table(['Couleur', 'rouge', 'verte', 'bleue'], [['Nombre de boules', r, v, b]]) + AI('sac de 10 boules dont 3 rouges : P(R) = 3/10 = 0,3 ; P(non R) = 1 − 0,3 = 0,7.'));
    };
    TR.c7e4d = R => {
      const N = 10, r = pick(R, [3, 4, 5]), v = int(R, 1, N - r - 1), b = N - r - v, pr = r / N, pp = pr * pr, M = 200;
      return Q('Deux tirages avec remise', `Un sac contient ${N} boules : ${r} rouges, ${v} verte${v > 1 ? 's' : ''} et ${b} bleues. On tire une boule, on la remet, puis on tire encore.`, [
        { lab: 'Nombre de couples de tirages possibles', v: N * N, d: 0, w: 10, x: `${N} choix pour la première boule, ${N} pour la seconde : ${N} × ${N} = ${N * N}.`, err: [{ v: 2 * N, m: 'On multiplie les possibilités : ' + N + ' × ' + N + '.' }] },
        { lab: 'P(« rouge » au premier tirage)', v: pr, d: 2, w: 12, a: fr(pr), x: `${r} ÷ ${N} = ${fr(pr)}` },
        { lab: 'P(« rouge puis rouge »)', v: pp, d: 2, w: 12, a: fr(rnd(pp, 2)), x: `${fr(pr)} × ${fr(pr)} = ${fr(rnd(pp, 2))} (${r} × ${r} = ${r * r} couples sur ${N * N})`, err: [{ v: pr, m: 'On multiplie : P(rouge) × P(rouge).' }, { v: 2 * pr, m: 'On multiplie les probabilités, on ne les additionne pas.' }] },
        { lab: 'P(« au moins une boule non rouge »)', v: 1 - pp, d: 2, w: 12, a: fr(rnd(1 - pp, 2)), x: `C’est le contraire de « deux rouges » : 1 − ${fr(rnd(pp, 2))} = ${fr(rnd(1 - pp, 2))}`, err: [{ v: 1 - pr, m: 'Le contraire de « deux rouges » : 1 − P(rouge puis rouge).' }] },
        { lab: `Nombre de « deux rouges » attendu en ${M} doubles tirages`, v: M * pp, d: 0, w: 12, x: `${M} × ${fr(rnd(pp, 2))} = ${fr(M * pp)}`, err: [{ v: M * pr, m: 'Utilise la probabilité de « deux rouges », pas celle d’une seule rouge.' }] }],
        ['Avec remise, les deux tirages sont indépendants : on multiplie les probabilités.', '« Au moins une non rouge » est le contraire de « deux rouges ».', 'Nombre attendu = nombre d’essais × probabilité.'],
        table(['Couleur', 'rouge', 'verte', 'bleue'], [['Nombre de boules', r, v, b]]));
    };
  }
})(typeof module !== 'undefined' ? module.exports : window);
