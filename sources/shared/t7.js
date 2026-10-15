/* 3ème Série Pro · chapitre 7 — Probabilités : issues, événements, probabilité, événement contraire,
   expérience à deux épreuves, fréquence et probabilité. */
(function (root) {
  'use strict';
  const { DEP, TR, H } = typeof module !== 'undefined' ? require('./train.js').MCVT : root.MCVT;
  const { fr, rnd, tb, T, svg, table, num, qcm, pick, int, xs, MC } = H;
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const fx = (k, n) => { const g = gcd(k, n) || 1; return k === 0 ? '0' : k === n ? '1' : (g > 1 ? `${k}/${n} = ${k / g}/${n / g}` : `${k}/${n}`); };
  const tolF = .002;

  /* point de départ : le sac de dés d’un club de jeux de rôle (fictif) */
  DEP.c7 = R => {
    const a = int(R, 3, 6), b = int(R, 2, 4), c = 10 - a - b, N = 10;
    const doc = `<table class="dt tcx dt-sm"><thead><tr><th>Dé</th><th>Nombre dans le sac</th></tr></thead><tbody><tr><th>dé à 6 faces</th><td data-cell="0">${a}</td></tr><tr><th>dé à 8 faces</th><td data-cell="1">${b}</td></tr><tr><th>dé à 20 faces</th><td data-cell="2">${c}</td></tr></tbody></table><p class="srcl">Sac fictif. On tire un dé au hasard, sans regarder.</p>`;
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
})(typeof module !== 'undefined' ? module.exports : window);
