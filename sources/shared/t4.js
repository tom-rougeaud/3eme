/* 3ème Série Pro · chapitre 4 — Proportionnalité, pourcentages, grandeurs composées, ratio. */
(function (root) {
  'use strict';
  const { DEP, TR, H } = typeof module !== 'undefined' ? require('./train.js').MCVT : root.MCVT;
  const { fr, eur, rnd, tb, T, svg, table, num, qcm, pick, int, xs } = H;
  const hm = m => `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')} min`;

  /* point de départ : les débits recommandés par Netflix */
  DEP.c4 = R => {
    const h = pick(R, [2, 3, 4, 5]), k = int(R, 0, 2);
    const Q = [['HD', 3], ['Full HD', 5], ['Ultra HD (4K)', 15]];
    const doc = `<table class="dt tcx dt-sm"><thead><tr><th>Qualité</th><th>Débit recommandé</th></tr></thead><tbody>${Q.map(([q, d], i) => `<tr><th>${q}</th><td data-cell="${i}">${d} Mbit/s</td></tr>`).join('')}</tbody></table><p class="srcl">Source : centre d’aide Netflix, « Débits Internet recommandés », consulté en octobre 2026. 1 octet = 8 bits.</p>`;
    return { titre: 'Les débits du streaming', doc,
      qs: [{ t: `Touche le débit recommandé en ${Q[k][0]}.`, kind: 'tap', cell: String(k), v: Q[k][1], tol: .01, a: Q[k][1] + ' Mbit/s' },
        { t: 'Combien de fois le débit Ultra HD est-il plus grand que le débit HD ?', kind: 'num', v: 5, tol: .01, a: '5', x: '15 ÷ 3 = 5' },
        { t: 'En Full HD, combien de mégabits arrivent en une minute ?', kind: 'num', v: 300, tol: .01, a: '300 Mbit', x: '5 × 60 = 300 Mbit' },
        { t: `En HD, combien de mégabits en ${h} minutes ?`, kind: 'num', v: 3 * 60 * h, tol: .01, a: `${3 * 60 * h} Mbit`, x: `3 × 60 × ${h} = ${3 * 60 * h} Mbit` },
        { t: 'La quantité de données est-elle proportionnelle à la durée ?', kind: 'qcm', choices: ['oui', 'non'], ok: 0, a: 'oui : on multiplie toujours la durée par le débit', x: 'à débit constant, données = débit × durée : c’est proportionnel' }] };
  };

  /* e1 · le tableau de proportionnalité : une recette à adapter */
  const RECS = [['bols de ramen', [['nouilles (g)', 100], ['bouillon (cL)', 30], ['œufs', .5]], 4, [6, 10, 12, 20, 30]], ['onigiris', [['riz cuit (g)', 60], ['feuilles d’algue', 1], ['thon (g)', 15]], 6, [9, 12, 15, 18, 30]], ['crêpes', [['farine (g)', 25], ['lait (cL)', 5], ['œufs', .25]], 8, [12, 16, 20, 24]]];
  TR.c4e1 = R => {
    const [what, ing, base, NS] = pick(R, RECS), N = pick(R, NS), k = N / base;
    const rows = ing.map(([n, u]) => [n, fr(u * base), fr(rnd(u * N, 2))]);
    const items = [num('a', k, 2, fr(k), [{ v: N - base, m: 'Le coefficient se trouve en divisant : ' + N + ' ÷ ' + base + '.' }]), num('b', rnd(ing[0][1] * N, 2), 2, rows[0][2]), num('c', rnd(ing[1][1] * N, 2), 2, rows[1][2]), num('d', rnd(ing[2][1] * N, 2), 2, rows[2][2], [{ v: ing[2][1] * base + (N - base), m: 'On ne rajoute pas : on multiplie par ' + fr(k) + '.' }])];
    xs(items, { a: `${N} ÷ ${base} = ${fr(k)}`, b: `${rows[0][1]} × ${fr(k)} = ${rows[0][2]}`, c: `${rows[1][1]} × ${fr(k)} = ${rows[1][2]}`, d: `${rows[2][1]} × ${fr(k)} = ${rows[2][2]}` });
    return { titre: 'Adapter une recette', consigne: `Une recette (fictive) de ${what} est prévue pour ${base} personnes. On la prépare pour ${N} personnes.`,
      support: table(['Ingrédient', `Pour ${base} personnes`, `Pour ${N} personnes`], [[`coefficient : × ${tb('a', fr(k), 12)}`, '', ''], ...rows.map((r, i) => [r[0], r[1], tb('bcd'[i], r[2], 14)])]), items,
      hints: ['Le coefficient : nombre de personnes voulu ÷ nombre de personnes de la recette.', 'On multiplie chaque quantité par le même coefficient.', 'Vérifie : la nouvelle quantité doit être plus grande si on a plus de personnes.'] };
  };

  /* e2 · hausses et baisses */
  TR.c4e2 = R => {
    const p0 = pick(R, [40, 60, 80, 25, 120, 50]), t = pick(R, [10, 15, 20, 25, 30]), up = R() < .5, cm = up ? 1 + t / 100 : 1 - t / 100, p1 = rnd(p0 * cm, 2);
    const [a0, a1] = pick(R, [[20, 25], [50, 40], [80, 92], [12.5, 15], [60, 45], [200, 150]]), ev = rnd((a1 - a0) / a0 * 100, 1);
    const items = [num('a', cm, 2, fr(cm), [{ v: t / 100, m: (up ? 'Augmenter' : 'Baisser') + ' de ' + t + ' %, c’est multiplier par 1 ' + (up ? '+' : '−') + ' ' + fr(t / 100) + '.' }]), num('b', p1, 2, eur(p1), [{ v: p0 * t / 100, m: 'C’est le montant de la ' + (up ? 'hausse' : 'baisse') + '. Le nouveau prix : ' + p0 + ' × ' + fr(cm) + '.' }]),
      num('c', rnd(a1 - a0, 2), 2, eur(a1 - a0)), num('d', ev, 1, (ev > 0 ? '+' : '') + fr(ev) + ' %', [{ v: rnd((a1 - a0) / a1 * 100, 1), m: 'On divise par le prix de départ, ' + fr(a0) + ' €, pas par le prix d’arrivée.' }])];
    xs(items, { a: `${up ? 'hausse' : 'baisse'} de ${t} % : × (1 ${up ? '+' : '−'} ${fr(t / 100)}) = × ${fr(cm)}`, b: `${p0} × ${fr(cm)} = ${fr(p1, 2)} €`, c: `${fr(a1)} − ${fr(a0)} = ${fr(a1 - a0)} €`, d: `${fr(a1 - a0)} ÷ ${fr(a0)} × 100 = ${fr(ev)} %` });
    return { titre: 'Hausses et baisses', consigne: 'Un abonnement, un jeu, une place de concert (fictifs) : calcule avec les pourcentages.',
      support: table(['', 'Départ', 'Évolution', 'À trouver'], [['Prix 1', eur(p0), `${up ? '+' : '−'} ${t} %`, `a. coefficient : ${tb('a', fr(cm), 12)}<br>b. nouveau prix : ${tb('b', eur(p1), 16)}`], ['Prix 2', eur(a0), `arrivée : ${eur(a1)}`, `c. variation : ${tb('c', eur(a1 - a0), 14)}<br>d. taux : ${tb('d', fr(ev) + ' %', 14)}`]]), items,
      hints: ['Hausse de t % : × (1 + t/100). Baisse : × (1 − t/100).', 'Variation = prix d’arrivée − prix de départ.', 'Taux = variation ÷ prix de départ × 100.'] };
  };

  /* e3 · vitesse et débit */
  TR.c4e3 = R => {
    const [d, m] = pick(R, [[240, 180], [150, 90], [90, 45], [360, 240], [210, 150], [45, 30]]), v = d / (m / 60);
    const v2 = pick(R, [50, 80, 90, 110, 130]), t2 = pick(R, [1.5, 2.5, 0.75, 3]), d2 = v2 * t2;
    const [q, deb] = pick(R, [['HD', 3], ['Full HD', 5], ['Ultra HD', 15]]), mn = pick(R, [22, 45, 90, 120]), go = rnd(deb * mn * 60 / 8 / 1000, 2);
    const items = [num('a', v, 1, fr(v) + ' km/h', [{ v: d / m, m: 'Convertis d’abord la durée en heures : ' + hm(m) + ' = ' + fr(m / 60) + ' h.' }]), num('b', d2, 1, fr(d2) + ' km', [{ v: v2 / t2, m: 'Distance = vitesse × durée.' }]),
      num('c', go, 2, fr(go) + ' Go', [{ v: rnd(deb * mn * 60 / 1000, 2), m: 'N’oublie pas de diviser par 8 : 1 octet = 8 bits.' }, { v: rnd(deb * mn / 8 / 1000, 2), m: 'La durée doit être en secondes : ' + mn + ' × 60.' }])];
    xs(items, { a: `${hm(m)} = ${fr(m / 60)} h ; ${d} ÷ ${fr(m / 60)} = ${fr(v)} km/h`, b: `${v2} × ${fr(t2)} = ${fr(d2)} km`, c: `${deb} × ${mn} × 60 = ${fr(deb * mn * 60)} Mbit ; ÷ 8 = ${fr(deb * mn * 60 / 8)} Mo ; ÷ 1 000 ≈ ${fr(go)} Go` });
    return { titre: 'Vitesse et débit', consigne: 'Une grandeur composée se calcule avec deux grandeurs : distance et durée, données et durée.',
      support: table(['Situation', 'Données', 'À trouver'], [['Un car (fictif) roule', `${d} km en ${hm(m)}`, `a. vitesse moyenne : ${tb('a', fr(v), 14)} km/h`], ['Un scooter roule', `à ${v2} km/h pendant ${fr(t2)} h`, `b. distance : ${tb('b', fr(d2), 14)} km`], [`Un film en ${q}`, `${deb} Mbit/s pendant ${mn} min`, `c. données : ${tb('c', fr(go), 14)} Go`]]), items,
      hints: ['Vitesse = distance ÷ durée (en heures).', 'Distance = vitesse × durée.', 'Données (Mbit) = débit × durée en secondes ; ÷ 8 pour des Mo ; ÷ 1 000 pour des Go.'] };
  };
})(typeof module !== 'undefined' ? module.exports : window);
