/* 3ème Série Pro · chapitre 5 — Fonctions : image, antécédent, lecture graphique, fonctions linéaires et affines,
   comparer deux formules. */
(function (root) {
  'use strict';
  const { DEP, TR, H } = typeof module !== 'undefined' ? require('./train.js').MCVT : root.MCVT;
  const { fr, eur, rnd, tb, sb, T, svg, table, num, qcm, pick, int, xs, P } = H;
  const rel = n => n < 0 ? '−' + fr(-n) : fr(n);
  const sg = n => n < 0 ? '− ' + fr(-n) : '+ ' + fr(n);
  const sb0 = n => n ? ' ' + sg(n) : '';

  /* point de départ : le saut d’un personnage de jeu de plateforme (fictif) */
  DEP.c5 = R => {
    const [L, k] = pick(R, [[8, .5], [10, .5], [8, 1]]), h = t => k * t * (L - t), ts = Array.from({ length: L + 1 }, (_, i) => i), t1 = int(R, 1, L / 2 - 1), tm = L / 2;
    const doc = `<table class="dt tcx dt-sm"><thead><tr><th>t (dixièmes de s)</th>${ts.map(t => `<th>${t}</th>`).join('')}</tr></thead><tbody><tr><th>h(t) (cases)</th>${ts.map(t => `<td data-cell="${t}">${fr(h(t))}</td>`).join('')}</tr></tbody></table><p class="srcl">Jeu fictif. h(t) est la hauteur du personnage au temps t.</p>`;
    return { titre: 'Le saut d’un personnage', doc,
      qs: [{ t: `Touche la case de h(${t1}).`, kind: 'tap', cell: String(t1), v: h(t1), tol: .01, a: fr(h(t1)) },
        { t: `Quelle est l’image de ${tm} par la fonction h ?`, kind: 'num', v: h(tm), tol: .01, a: fr(h(tm)), x: `h(${tm}) = ${fr(h(tm))} : on lit la colonne t = ${tm}` },
        { t: `Quels sont les antécédents de ${fr(h(t1))} ?`, kind: 'qcm', choices: [`${t1} et ${L - t1}`, `${t1} seulement`, fr(h(t1))], ok: 0, a: `${t1} et ${L - t1}`, x: `h(${t1}) = h(${L - t1}) = ${fr(h(t1))}` },
        { t: 'Quelle est la hauteur maximale, en cases ?', kind: 'num', v: h(tm), tol: .01, a: fr(h(tm)), x: `la plus grande valeur du tableau : ${fr(h(tm))}, pour t = ${tm}` },
        { t: 'Au bout de combien de dixièmes de seconde le personnage retombe-t-il au sol ?', kind: 'num', v: L, tol: .01, a: String(L), x: `h(${L}) = 0 : il retombe à t = ${L}` }] };
  };

  /* e1 · lire un graphique : droite d’une fonction affine */
  TR.c5e1 = R => {
    const a = pick(R, [2, 3, -2, 4, -3, 5]), b = a > 0 ? int(R, -2, 4) : int(R, 8, 14), x1 = int(R, 1, 3), x2 = int(R, 1, 4);
    const f = x => a * x + b, y2 = f(x2), lo = Math.min(f(0), f(5), 0), hi = Math.max(f(0), f(5));
    const y0 = Math.floor(lo / 2) * 2, y1 = Math.ceil(hi / 2) * 2 + 2;
    const g = P.plot({ W: 560, H: 230, x: [0, 5, 1], y: [y0, y1, 2], ml: 46, mr: 16, mt: 12, mb: 28, fs: 12, xl: 'x', yl: 'f(x)', zeroAxes: true, cls: 'pic vis trs' });
    const body = g.base + g.line(a, b) + g.dot(0, b, { lab: 'A', dy: -10 }) + g.dot(x1, f(x1), { lab: 'B', dy: -10 });
    const items = [num('a', b, 0, rel(b), [{ v: a, m: 'L’ordonnée à l’origine se lit sur l’axe vertical, pour x = 0.' }]), num('b', f(x1), 0, rel(f(x1)), [{ v: x1, m: 'L’image se lit sur l’axe vertical : on part de x = ' + x1 + ' et on monte jusqu’à la droite.' }]),
      num('c', x2, 0, String(x2), [{ v: f(y2), m: 'L’antécédent se lit sur l’axe horizontal.' }]), num('d', a, 0, rel(a), [{ v: -a, m: 'Si la droite ' + (a > 0 ? 'monte' : 'descend') + ', le coefficient est ' + (a > 0 ? 'positif' : 'négatif') + '.' }])];
    xs(items, { a: `la droite coupe l’axe vertical en A(0 ; ${rel(b)}) : f(0) = ${rel(b)}`, b: `B(${x1} ; ${rel(f(x1))}) : f(${x1}) = ${rel(f(x1))}`, c: `on part de ${rel(y2)} sur l’axe vertical, on rejoint la droite, on descend : x = ${x2}`, d: `de A à B : (${rel(f(x1))} − ${par(b)}) ÷ ${x1} = ${rel(a)} ; f(x) = ${rel(a)}x${sb0(b)}` });
    return { titre: 'Lire une fonction affine', consigne: 'La droite représente une fonction affine f. Lis le graphique.',
      support: g.wrap(body) + `<p class="tr-l">a. f(0) = ${tb('a', rel(b), 12)} · b. image de ${x1} : ${tb('b', rel(f(x1)), 12)} · c. antécédent de ${rel(y2)} : ${tb('c', String(x2), 12)}</p><p class="tr-l">d. Quand x augmente de 1, f(x) varie de ${tb('d', rel(a), 12)} : c’est le coefficient a.</p>`, items,
      hints: ['L’image de x se lit sur l’axe vertical ; l’antécédent sur l’axe horizontal.', 'f(0), c’est là où la droite coupe l’axe vertical.', 'Compte de combien la droite monte (ou descend) quand x augmente de 1.'] };
  };
  const par = n => n < 0 ? '(' + rel(n) + ')' : rel(n);

  /* e2 · le tableau de valeurs d’une fonction affine */
  TR.c5e2 = R => {
    const a = pick(R, [1.5, 2, 2.5, 3, 4, 12, 0.5]), b = pick(R, [0, 5, 10, 20, 45]), xs3 = [int(R, 1, 3), int(R, 4, 6), int(R, 8, 10)], k = int(R, 3, 9), yk = a * k + b;
    const f = x => rnd(a * x + b, 2), ctx = b ? `un forfait de ${eur(b)} plus ${eur(a)} par unité` : `${eur(a)} par unité, sans forfait`;
    const items = [num('a', f(xs3[0]), 2, fr(f(xs3[0]))), num('b', f(xs3[1]), 2, fr(f(xs3[1]))), num('c', f(xs3[2]), 2, fr(f(xs3[2]))),
      num('d', k, 2, String(k), [{ v: a * yk + b, m: 'On cherche l’antécédent : résous ' + fr(a) + 'x' + sb0(b) + ' = ' + fr(yk) + '.' }]),
      qcm('e', ['linéaire', 'affine, non linéaire'], b ? 1 : 0, b ? 'affine, non linéaire : b = ' + b + ' ≠ 0' : 'linéaire : b = 0')];
    xs(items, { a: `f(${xs3[0]}) = ${fr(a)} × ${xs3[0]}${sb0(b)} = ${fr(f(xs3[0]))}`, b: `f(${xs3[1]}) = ${fr(a)} × ${xs3[1]}${sb0(b)} = ${fr(f(xs3[1]))}`, c: `f(${xs3[2]}) = ${fr(a)} × ${xs3[2]}${sb0(b)} = ${fr(f(xs3[2]))}`, d: `${fr(a)}x${sb0(b)} = ${fr(yk)} ; ${fr(a)}x = ${fr(yk - b)} ; x = ${k}` });
    return { titre: 'Le tableau de valeurs', consigne: `Un service (fictif) facture ${ctx} : f(x) = ${fr(a)}x${b ? ' ' + sg(b) : ''}, en euros, pour x unités.`,
      support: table(['x', String(xs3[0]), String(xs3[1]), String(xs3[2])], [['f(x)', tb('a', fr(f(xs3[0])), 12), tb('b', fr(f(xs3[1])), 12), tb('c', fr(f(xs3[2])), 12)]]) + `<p class="tr-l">d. Pour quel nombre d’unités paie-t-on ${eur(yk)} ? ${tb('d', String(k), 12)}</p><p class="tr-l">e. La fonction f est-elle linéaire ?</p>`, items,
      hints: ['Remplace x par le nombre, puis calcule.', 'Pour l’antécédent, écris une équation.', 'Linéaire : de la forme ax, sans nombre ajouté.'] };
  };

  /* e3 · comparer deux formules */
  TR.c5e3 = R => {
    let p, q, r, X;
    do { p = pick(R, [8, 9, 10, 11, 12]); q = pick(R, [3, 4, 5, 6]); X = int(R, 3, 8); r = (p - q) * X; } while (r > 60);
    const n1 = X - int(R, 1, 2), n2 = X + int(R, 2, 4);
    const items = [num('a', p * n1, 2, eur(p * n1)), num('b', q * n1 + r, 2, eur(q * n1 + r)), num('c', X, 2, String(X), [{ v: r / p, m: 'Écris l’équation ' + p + 'x = ' + q + 'x + ' + r + ', puis regroupe les x.' }]), num('d', p * X, 2, eur(p * X)),
      qcm('e', ['sans carte', 'avec la carte'], 1, `avec la carte : ${eur(q * n2 + r)} contre ${eur(p * n2)}`)];
    xs(items, { a: `f(${n1}) = ${p} × ${n1} = ${p * n1} €`, b: `g(${n1}) = ${q} × ${n1} + ${r} = ${q * n1 + r} €`, c: `${p}x = ${q}x + ${r} ; ${p - q}x = ${r} ; x = ${X}`, d: `f(${X}) = ${p} × ${X} = ${p * X} € = g(${X})`, e: `pour ${n2} séances : f = ${p * n2} € et g = ${q * n2 + r} €` });
    const g = P.plot({ W: 560, H: 220, x: [0, X + 4, 1], y: [0, Math.ceil(p * (X + 4) / 20) * 20, 20], ml: 46, mr: 16, mt: 12, mb: 28, fs: 11, xl: 'séances', yl: 'prix (€)', cls: 'pic vis trs' });
    return { titre: 'Deux formules de cinéma', consigne: `Sans carte, une séance coûte ${p} € : f(x) = ${p}x. Avec une carte (fictive) de ${r} €, la séance coûte ${q} € : g(x) = ${q}x + ${r}.`,
      support: g.wrap(g.base + g.line(p, 0, { stroke: P.BLUE }) + g.line(q, r, { stroke: P.RED }) + g.txt(X + 3.5, p * (X + 3.5), 'f', { dx: -14, dy: -4, fill: P.BLUE }) + g.txt(X + 3.5, q * (X + 3.5) + r, 'g', { dx: 4, dy: 18, fill: P.RED })) + table(['Séances', 'Sans carte f(x)', 'Avec carte g(x)'], [[String(n1), tb('a', eur(p * n1), 14), tb('b', eur(q * n1 + r), 14)]]) + `<p class="tr-l">c. Les deux formules coûtent le même prix pour x = ${tb('c', String(X), 10)} séances, soit ${tb('d', eur(p * X), 14)}.</p><p class="tr-l">e. Pour ${n2} séances, quelle formule est la moins chère ?</p>`, items,
      hints: ['Remplace x par le nombre de séances dans chaque formule.', 'Même prix : résous f(x) = g(x).', 'Après l’intersection, la droite la plus basse donne la formule la moins chère.'] };
  };
})(typeof module !== 'undefined' ? module.exports : window);
