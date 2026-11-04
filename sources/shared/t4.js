/* 3ème Prépa-Métiers · chapitre 4 — Proportionnalité, pourcentages, grandeurs composées, ratio. */
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
    return { titre: 'Adapter une recette', consigne: `Une recette de ${what} est prévue pour ${base} personnes. On la prépare pour ${N} personnes.`,
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
    return { titre: 'Hausses et baisses', consigne: 'Un abonnement, un jeu, une place de concert : calcule avec les pourcentages.',
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
      support: table(['Situation', 'Données', 'À trouver'], [['Un car roule', `${d} km en ${hm(m)}`, `a. vitesse moyenne : ${tb('a', fr(v), 14)} km/h`], ['Un scooter roule', `à ${v2} km/h pendant ${fr(t2)} h`, `b. distance : ${tb('b', fr(d2), 14)} km`], [`Un film en ${q}`, `${deb} Mbit/s pendant ${mn} min`, `c. données : ${tb('c', fr(go), 14)} Go`]]), items,
      hints: ['Vitesse = distance ÷ durée (en heures).', 'Distance = vitesse × durée.', 'Données (Mbit) = débit × durée en secondes ; ÷ 8 pour des Mo ; ÷ 1 000 pour des Go.'] };
  };
  /* ===== exercice ajouté : notion 4 (partager selon un ratio) ===== */
  {
    const { Q, fr, pick, int, table, eur } = H;
    TR.c4e4 = R => {
      let a = int(R, 1, 4), b = int(R, 2, 6); while (a === b) b = int(R, 2, 6);
      const per = pick(R, [5, 10, 12, 15, 20, 25, 50]), parts = a + b, S = per * parts, [n1, n2] = pick(R, [['Lou', 'Sam'], ['Inès', 'Karim'], ['Zoé', 'Malik'], ['Léa', 'Noa']]);
      const [ra, rb, mat1, mat2] = pick(R, [[1, 3, 'ciment', 'sable'], [1, 4, 'ciment', 'sable'], [2, 3, 'peinture bleue', 'peinture blanche'], [2, 5, 'concentré', 'eau']]), k = int(R, 2, 8), blanc = rb * k, bleu = ra * k;
      return Q('Partager selon un ratio', `${n1} et ${n2} se partagent une prime de ${eur(S)} dans le ratio ${a} : ${b} (${a} part${a > 1 ? 's' : ''} pour ${n1}, ${b} pour ${n2}).`, [
        { lab: 'Nombre de parts au total', v: parts, d: 0, w: 12, x: `${a} + ${b} = ${parts} parts`, err: [{ v: a * b, m: 'On additionne les parts, on ne les multiplie pas.' }] },
        { lab: 'Valeur d’une part, en €', v: per, d: 2, x: `${fr(S)} ÷ ${parts} = ${fr(per)}`, err: [{ v: S / a, m: 'Divise par le nombre total de parts.' }] },
        { lab: `Part de ${n1}, en €`, v: a * per, d: 2, x: `${a} × ${fr(per)} = ${fr(a * per)}` },
        { lab: `Part de ${n2}, en €`, v: b * per, d: 2, x: `${b} × ${fr(per)} = ${fr(b * per)} (contrôle : ${fr(a * per)} + ${fr(b * per)} = ${fr(S)})` },
        { lab: `Un mélange associe ${mat1} et ${mat2} dans le ratio ${ra} : ${rb}. Avec ${blanc} mesures de ${mat2}, il faut de ${mat1} (en mesures)`, v: bleu, d: 0, w: 12, x: `${blanc} ÷ ${rb} = ${k} fois le ratio, donc ${ra} × ${k} = ${bleu} mesures`, err: [{ v: blanc, m: 'La quantité de ' + mat1 + ' se déduit du ratio : elle n’est pas égale à celle de ' + mat2 + '.' }] }],
        ['Additionne les parts pour savoir en combien de morceaux on partage.', 'Une part vaut le total divisé par le nombre de parts.', 'Chaque personne reçoit son nombre de parts multiplié par la valeur d’une part.'],
        table(['Prime à partager', 'Ratio'], [[eur(S), `${a} : ${b}`]]));
    };
  }
  /* ===== niveaux 🌱 guidé et 🚀 défi · chapitre 4 ===== */
  {
    const { Q, AI, fr, pick, int, table, eur } = H, hmn = m => (m >= 60 ? Math.floor(m / 60) + ' h' + (m % 60 ? ' ' + (m % 60) + ' min' : '') : m + ' min');
    /* e1 · proportionnalité : adapter une recette */
    TR.c4e1a = R => {
      const [what, [[n1, u1], [n2, u2]], base, NS] = pick(R, [['de bols de ramen', [['nouilles (g)', 100], ['bouillon (cL)', 30]], 4, [8, 12, 16]], ['d’onigiris', [['riz cuit (g)', 60], ['feuilles d’algue', 1]], 6, [12, 18, 24]], ['de crêpes', [['farine (g)', 24], ['lait (cL)', 6]], 8, [16, 24, 32]]]), N = pick(R, NS), k = N / base;
      return Q('Adapter une recette, pas à pas', `Recette ${what} pour ${base} personnes. On la prépare pour ${N} personnes : on multiplie tout par le même nombre.`, [
        { lab: `Coefficient (${N} ÷ ${base})`, v: k, d: 0, w: 10, x: `${N} ÷ ${base} = ${k}`, err: [{ v: N - base, m: 'Le coefficient se trouve en divisant, pas en soustrayant.' }] },
        { lab: `${n1} pour ${N} personnes`, v: u1 * k, d: 2, w: 12, x: `${u1} × ${k} = ${fr(u1 * k)}`, err: [{ v: u1 + k, m: 'On multiplie la quantité par le coefficient.' }] },
        { lab: `${n2} pour ${N} personnes`, v: u2 * k, d: 2, w: 12, x: `${u2} × ${k} = ${fr(u2 * k)}` },
        { lab: `${n1} pour une seule personne`, v: u1 / base, d: 2, w: 12, x: `${u1} ÷ ${base} = ${fr(u1 / base)}`, err: [{ v: u1 * k, m: 'Pour une personne, on divise la quantité de la recette par ' + base + '.' }] }],
        ['Le coefficient : nombre de personnes voulu ÷ nombre de personnes de la recette.', 'On multiplie chaque quantité par le même coefficient.', 'Plus il y a de personnes, plus les quantités sont grandes.'],
        table(['Ingrédient', `Pour ${base} personnes`, `Pour ${N} personnes`], [[n1, fr(u1), '?'], [n2, fr(u2), '?']]) + AI('recette pour 2 personnes avec 50 g de riz, pour 6 personnes : 6 ÷ 2 = 3 ; 50 × 3 = 150 g.'));
    };
    TR.c4e1d = R => {
      const [what, [[n1, u1], [n2, u2]], base] = pick(R, [['de bols de ramen', [['nouilles (g)', 100], ['bouillon (cL)', 30]], 4], ['d’onigiris', [['riz cuit (g)', 60], ['feuilles d’algue', 2]], 6], ['de crêpes', [['farine (g)', 24], ['lait (cL)', 6]], 8]]);
      const k = pick(R, [1.5, 2.5, 3.5]), A = u1 * k, P = base * k, need = u2 * k, ok = R() < .5, B = ok ? need + u2 : need - u2;
      return Q('Pour combien de personnes ?', `Recette ${what} pour ${base} personnes : ${fr(u1)} de ${n1} et ${fr(u2)} de ${n2}. On dispose de ${fr(A)} de ${n1}.`, [
        { lab: `Coefficient (${fr(A)} ÷ ${fr(u1)})`, v: k, d: 2, a: fr(k), w: 10, x: `${fr(A)} ÷ ${fr(u1)} = ${fr(k)}`, err: [{ v: A - u1, m: 'On divise la quantité disponible par la quantité de la recette.' }] },
        { lab: 'Nombre de personnes qu’on peut servir', v: P, d: 2, w: 10, x: `${base} × ${fr(k)} = ${fr(P)} personnes`, err: [{ v: k, m: 'Multiplie le nombre de personnes de la recette par le coefficient.' }] },
        { lab: `${n2} nécessaire pour ce nombre de personnes`, v: need, d: 2, w: 12, x: `${fr(u2)} × ${fr(k)} = ${fr(need)}` },
        { lab: `Avec ${fr(B)} de ${n2}, la recette est-elle réalisable ?`, qcm: ['oui', 'non'], ok: ok ? 0 : 1, x: `Il faut ${fr(need)} de ${n2} : ${fr(B)} ${ok ? '≥' : '<'} ${fr(need)}, donc ${ok ? 'oui' : 'non'}.` }],
        ['Le coefficient : quantité disponible ÷ quantité de la recette.', 'Multiplie le nombre de personnes de la recette par ce coefficient.', 'Multiplie ensuite l’autre ingrédient par le même coefficient.']);
    };
    /* e2 · hausses et baisses */
    TR.c4e2a = R => {
      const p0 = pick(R, [20, 40, 60, 80, 100, 200]), t = pick(R, [10, 20, 25, 50]), up = R() < .5, cm = up ? 1 + t / 100 : 1 - t / 100, M = p0 * t / 100, p1 = p0 * cm;
      return Q('Hausses et baisses, pas à pas', `Un article coûte ${eur(p0)}. Son prix ${up ? 'augmente' : 'baisse'} de ${t} %.`, [
        { lab: `Montant de la ${up ? 'hausse' : 'baisse'} (${t} % de ${fr(p0)}), en €`, v: M, d: 2, w: 12, x: `${t} % de ${p0} : ${p0} ÷ 100 × ${t} = ${fr(M)}`, err: [{ v: t, m: 'Calcule ' + t + ' % du prix : prix ÷ 100 × ' + t + '.' }] },
        { lab: 'Nouveau prix, en €', v: p1, d: 2, w: 12, x: `${fr(p0)} ${up ? '+' : '−'} ${fr(M)} = ${fr(p1)}`, err: [{ v: up ? p0 - M : p0 + M, m: up ? 'Pour une hausse, on ajoute.' : 'Pour une baisse, on retranche.' }] },
        { lab: 'Coefficient multiplicateur', v: cm, d: 2, a: fr(cm), w: 12, x: `${up ? '1 + ' : '1 − '}${fr(t / 100)} = ${fr(cm)} ; contrôle : ${fr(p0)} × ${fr(cm)} = ${fr(p1)}`, err: [{ v: t / 100, m: (up ? 'Augmenter' : 'Baisser') + ' de ' + t + ' %, c’est multiplier par 1 ' + (up ? '+' : '−') + ' ' + fr(t / 100) + '.' }] },
        { lab: 'Une baisse de 20 % revient à multiplier par', qcm: ['0,8', '0,2', '1,2'], ok: 0, x: 'Baisser de 20 %, c’est multiplier par 1 − 0,20 = 0,8.' }],
        ['Un pourcentage de p : prix ÷ 100 × p.', 'Hausse : on ajoute le montant. Baisse : on le retranche.', 'Coefficient : 1 + t/100 pour une hausse, 1 − t/100 pour une baisse.'],
        AI('un jeu à 40 € baisse de 25 % : 40 ÷ 100 × 25 = 10 € ; nouveau prix 40 − 10 = 30 € ; coefficient 1 − 0,25 = 0,75.'));
    };
    TR.c4e2d = R => {
      const [t1, t2] = pick(R, [[20, 20], [10, 10], [25, 20], [50, 50], [20, 25], [30, 20], [40, 25]]), p0 = pick(R, [50, 80, 100, 200]), c1 = 1 + t1 / 100, c2 = 1 - t2 / 100, p1 = p0 * c1, p2 = p1 * c2, g = (p2 / p0 - 1) * 100, back = Math.abs(p2 - p0) < 1e-9;
      return Q('Une hausse, puis une baisse', `Un prix de ${eur(p0)} augmente de ${t1} %, puis baisse de ${t2} %.`, [
        { lab: 'Prix après la hausse, en €', v: p1, d: 2, w: 12, x: `${fr(p0)} × ${fr(c1)} = ${fr(p1)}` },
        { lab: 'Prix après la baisse, en €', v: p2, d: 2, w: 12, x: `La baisse s’applique au nouveau prix : ${fr(p1)} × ${fr(c2)} = ${fr(p2)}`, err: [{ v: p0 * c2, m: 'La baisse de ' + t2 + ' % s’applique au prix après la hausse, pas au prix de départ.' }] },
        { lab: 'Variation globale du prix, en €', v: p2 - p0, d: 2, w: 12, x: `${fr(p2)} − ${fr(p0)} = ${fr(p2 - p0)}` },
        { lab: 'Taux d’évolution global, en %', v: g, d: 1, w: 12, x: `${fr(c1)} × ${fr(c2)} = ${fr(+(c1 * c2).toFixed(4))} : l’évolution globale est ${fr(g)} %`, err: [{ v: t1 - t2, m: 'Les pourcentages ne s’additionnent pas : multiplie les coefficients.' }] },
        { lab: `Une hausse de ${t1} % puis une baisse de ${t2} % ramène-t-elle au prix de départ ?`, qcm: ['oui', 'non'], ok: back ? 0 : 1, x: back ? `${fr(c1)} × ${fr(c2)} = 1 : on retrouve exactement le prix de départ.` : `${fr(c1)} × ${fr(c2)} = ${fr(+(c1 * c2).toFixed(4))}, pas 1 : le prix final est différent du prix de départ.` }],
        ['Hausse : coefficient 1 + t/100. Baisse : coefficient 1 − t/100.', 'La seconde évolution s’applique au prix obtenu après la première.', 'Pour l’évolution globale, multiplie les deux coefficients.']);
    };
    /* e3 · vitesse et débit */
    TR.c4e3a = R => {
      const [d, m] = pick(R, [[30, 90], [24, 90], [60, 45], [36, 45], [18, 45], [45, 30]]), h = m / 60, v = d / h, t2 = pick(R, [2, 3, 0.5]);
      return Q('Calculer une vitesse, pas à pas', `Un cycliste parcourt ${d} km en ${hmn(m)}. La vitesse se calcule avec une durée en heures.`, [
        { lab: `Durée en heures (${hmn(m)})`, v: h, d: 2, w: 10, x: `${m} min = ${m} ÷ 60 = ${fr(h)} h`, err: [{ v: m, m: 'Il faut des heures, pas des minutes : divise par 60.' }] },
        { lab: 'Vitesse moyenne, en km/h', v, d: 1, w: 10, x: `${d} ÷ ${fr(h)} = ${fr(v)} km/h`, err: [{ v: d / m, m: 'Divise la distance par la durée en heures.' }] },
        { lab: `Distance parcourue en ${fr(t2)} h à cette vitesse, en km`, v: v * t2, d: 1, w: 10, x: `${fr(v)} × ${fr(t2)} = ${fr(v * t2)} km`, err: [{ v: v / t2, m: 'Distance = vitesse × durée.' }] },
        { lab: 'La vitesse se calcule…', qcm: ['distance ÷ durée', 'distance × durée', 'durée ÷ distance'], ok: 0, x: 'vitesse = distance ÷ durée, par exemple 60 km en 2 h : 60 ÷ 2 = 30 km/h.' }],
        ['1 h = 60 min : pour passer des minutes aux heures, divise par 60.', 'Vitesse = distance ÷ durée (en heures).', 'Distance = vitesse × durée.'],
        AI('45 min = 45 ÷ 60 = 0,75 h ; 30 km en 0,75 h : 30 ÷ 0,75 = 40 km/h.'));
    };
    TR.c4e3d = R => {
      const [Go, deb] = pick(R, [[1.5, 50], [1.5, 100], [3, 100], [3, 50], [4.5, 100], [4.5, 200], [6, 100], [6, 200], [1.5, 200], [3, 200]]), Mb = Go * 8000, s = Mb / deb, mn = s / 60, need = Mb / 60;
      return Q('Télécharger un fichier', `Jeu de ${fr(Go)} Go, débit de ${deb} Mbit/s. Rappel : 1 octet = 8 bits ; 1 Go = 1 000 Mo.`, [
        { lab: 'Taille du jeu en Mbit', v: Mb, d: 0, w: 14, x: `${fr(Go)} Go = ${fr(Go * 1000)} Mo ; × 8 = ${fr(Mb)} Mbit`, err: [{ v: Go * 1000, m: 'Les débits sont en bits : multiplie aussi par 8.' }] },
        { lab: 'Durée du téléchargement, en secondes', v: s, d: 0, w: 12, x: `${fr(Mb)} Mbit ÷ ${deb} Mbit/s = ${fr(s)} s`, err: [{ v: Mb * deb, m: 'Durée = quantité de données ÷ débit.' }] },
        { lab: 'Durée du téléchargement, en minutes', v: mn, d: 1, w: 10, x: `${fr(s)} ÷ 60 = ${fr(mn)} min`, err: [{ v: s, m: 'Divise par 60 pour passer des secondes aux minutes.' }] },
        { lab: 'Avec un débit deux fois plus grand, la durée est…', qcm: ['deux fois plus courte', 'deux fois plus longue', 'la même'], ok: 0, x: 'Durée = données ÷ débit : si le débit double, la durée est divisée par 2.' },
        { lab: 'Débit minimal pour le télécharger en 1 minute, en Mbit/s', v: need, d: 0, w: 12, x: `${fr(Mb)} Mbit ÷ 60 s = ${fr(need)} Mbit/s`, err: [{ v: Mb, m: 'Divise la taille en Mbit par 60 secondes.' }] }],
        ['Pour convertir des Go en Mbit : × 1 000 puis × 8.', 'Durée = taille ÷ débit, avec la même unité de données.', '60 secondes = 1 minute.']);
    };
    /* e4 · partager selon un ratio */
    TR.c4e4a = R => {
      const a = pick(R, [1, 2]), b = pick(R, [2, 3, 4].filter(x => x !== a)), per = pick(R, [2, 3, 4, 5]), parts = a + b, V = per * parts, [m1, m2] = pick(R, [['noir', 'blanc'], ['bleu', 'jaune'], ['rouge', 'blanc']]);
      return Q('Un ratio, pas à pas', `On prépare ${V} L de peinture : ${m1} et ${m2} dans le ratio ${a} : ${b} (${a} part${a > 1 ? 's' : ''} de ${m1}, ${b} de ${m2}).`, [
        { lab: 'Nombre de parts au total', v: parts, d: 0, w: 10, x: `${a} + ${b} = ${parts} parts`, err: [{ v: a * b, m: 'On additionne les parts.' }] },
        { lab: 'Volume d’une part, en L', v: per, d: 0, w: 10, x: `${V} ÷ ${parts} = ${per} L`, err: [{ v: V / a, m: 'Divise par le nombre total de parts.' }] },
        { lab: `Volume de ${m1}, en L`, v: a * per, d: 0, w: 10, x: `${a} × ${per} = ${a * per} L` },
        { lab: `Volume de ${m2}, en L`, v: b * per, d: 0, w: 10, x: `${b} × ${per} = ${b * per} L (contrôle : ${a * per} + ${b * per} = ${V})` }],
        ['Additionne les parts pour savoir en combien de morceaux on partage.', 'Une part vaut le volume total divisé par le nombre de parts.', 'Chaque couleur : son nombre de parts × le volume d’une part.'],
        AI('30 L en ratio 1 : 2 : 1 + 2 = 3 parts ; 30 ÷ 3 = 10 L par part ; 10 L et 20 L.'));
    };
    TR.c4e4d = R => {
      const [r1, r2, r3] = pick(R, [[2, 3, 5], [1, 2, 3], [3, 4, 5], [1, 3, 4], [2, 3, 4]]), per = pick(R, [10, 15, 20, 25]), S = r1 + r2 + r3, [n1, n2, n3] = pick(R, [['Lou', 'Sam', 'Noa'], ['Inès', 'Karim', 'Zoé'], ['Malik', 'Léa', 'Eli']]);
      return Q('Trois parts à retrouver', `${n1}, ${n2} et ${n3} se partagent une prime dans le ratio ${r1} : ${r2} : ${r3}. ${n1} reçoit ${per * r1} €.`, [
        { lab: 'Nombre de parts au total', v: S, d: 0, w: 10, x: `${r1} + ${r2} + ${r3} = ${S} parts`, err: [{ v: r1 * r2 * r3, m: 'On additionne les parts.' }] },
        { lab: `Valeur d’une part, en € (${n1} a ${r1} part${r1 > 1 ? 's' : ''})`, v: per, d: 0, w: 10, x: `${per * r1} ÷ ${r1} = ${per} €`, err: [{ v: per * r1, m: n1 + ' a ' + r1 + ' parts : divise sa somme par ' + r1 + '.' }] },
        { lab: 'Montant total de la prime, en €', v: per * S, d: 0, w: 12, x: `${S} × ${per} = ${per * S} €`, err: [{ v: per * r1 * S, m: 'Une part vaut ' + per + ' €, il y a ' + S + ' parts au total.' }] },
        { lab: `Part de ${n3}, en €`, v: per * r3, d: 0, w: 12, x: `${r3} × ${per} = ${per * r3} €` },
        { lab: `Écart entre la part de ${n2} et celle de ${n1}, en €`, v: per * (r2 - r1), d: 0, w: 12, x: `${n2} : ${r2} × ${per} = ${per * r2} € ; ${per * r2} − ${per * r1} = ${per * (r2 - r1)} €` }],
        ['Trouve d’abord la valeur d’une part à partir de la somme connue.', 'Le total, c’est le nombre de parts × la valeur d’une part.', 'Chaque personne : son nombre de parts × la valeur d’une part.']);
    };
  }
})(typeof module !== 'undefined' ? module.exports : window);
