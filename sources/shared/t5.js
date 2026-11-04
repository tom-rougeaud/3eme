/* 3ème Série Pro · chapitre 5 — Fonctions : image, antécédent, lecture graphique, fonctions linéaires et affines,
   comparer deux formules. */
(function (root) {
  'use strict';
  const { DEP, TR, H } = typeof module !== 'undefined' ? require('./train.js').MCVT : root.MCVT;
  const { fr, eur, rnd, tb, sb, T, svg, table, num, qcm, pick, int, xs, P } = H;
  const rel = n => n < 0 ? '−' + fr(-n) : fr(n);
  const sg = n => n < 0 ? '− ' + fr(-n) : '+ ' + fr(n);
  const sb0 = n => n ? ' ' + sg(n) : '';

  /* point de départ : le saut d’un personnage de jeu de plateforme */
  DEP.c5 = R => {
    const [L, k] = pick(R, [[8, .5], [10, .5], [8, 1]]), h = t => k * t * (L - t), ts = Array.from({ length: L + 1 }, (_, i) => i), t1 = int(R, 1, L / 2 - 1), tm = L / 2;
    const doc = `<table class="dt tcx dt-sm"><thead><tr><th>t (dixièmes de s)</th>${ts.map(t => `<th>${t}</th>`).join('')}</tr></thead><tbody><tr><th>h(t) (cases)</th>${ts.map(t => `<td data-cell="${t}">${fr(h(t))}</td>`).join('')}</tr></tbody></table><p class="srcl">h(t) est la hauteur du personnage au temps t.</p>`;
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
    const a = pick(R, [1.5, 2, 2.5, 3, 4, 12, 0.5]), b = pick(R, [0, 5, 10, 20, 45]), xs3 = [int(R, 1, 3), int(R, 4, 6), int(R, 8, 10)], k = pick(R, [3, 4, 5, 6, 7, 8, 9].filter(v => !xs3.includes(v))), yk = a * k + b;
    const f = x => rnd(a * x + b, 2), ctx = b ? `un forfait de ${eur(b)} plus ${eur(a)} par unité` : `${eur(a)} par unité, sans forfait`;
    const items = [num('a', f(xs3[0]), 2, fr(f(xs3[0]))), num('b', f(xs3[1]), 2, fr(f(xs3[1]))), num('c', f(xs3[2]), 2, fr(f(xs3[2]))),
      num('d', k, 2, String(k), [{ v: a * yk + b, m: 'On cherche l’antécédent : résous ' + fr(a) + 'x' + sb0(b) + ' = ' + fr(yk) + '.' }]),
      qcm('e', ['linéaire', 'affine, non linéaire'], b ? 1 : 0, b ? 'affine, non linéaire : b = ' + b + ' ≠ 0' : 'linéaire : b = 0')];
    xs(items, { a: `f(${xs3[0]}) = ${fr(a)} × ${xs3[0]}${sb0(b)} = ${fr(f(xs3[0]))}`, b: `f(${xs3[1]}) = ${fr(a)} × ${xs3[1]}${sb0(b)} = ${fr(f(xs3[1]))}`, c: `f(${xs3[2]}) = ${fr(a)} × ${xs3[2]}${sb0(b)} = ${fr(f(xs3[2]))}`, d: `${fr(a)}x${sb0(b)} = ${fr(yk)} ; ${fr(a)}x = ${fr(yk - b)} ; x = ${k}` });
    return { titre: 'Le tableau de valeurs', consigne: `Un service facture ${ctx} : f(x) = ${fr(a)}x${b ? ' ' + sg(b) : ''}, en euros, pour x unités.`,
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
    return { titre: 'Deux formules de cinéma', consigne: `Sans carte, une séance coûte ${p} € : f(x) = ${p}x. Avec une carte de ${r} €, la séance coûte ${q} € : g(x) = ${q}x + ${r}.`,
      support: g.wrap(g.base + g.line(p, 0, { stroke: P.BLUE }) + g.line(q, r, { stroke: P.RED }) + g.txt(X + 3.5, p * (X + 3.5), 'f', { dx: -14, dy: -4, fill: P.BLUE }) + g.txt(X + 3.5, q * (X + 3.5) + r, 'g', { dx: 4, dy: 18, fill: P.RED })) + table(['Séances', 'Sans carte f(x)', 'Avec carte g(x)'], [[String(n1), tb('a', eur(p * n1), 14), tb('b', eur(q * n1 + r), 14)]]) + `<p class="tr-l">c. Les deux formules coûtent le même prix pour x = ${tb('c', String(X), 10)} séances, soit ${tb('d', eur(p * X), 14)}.</p><p class="tr-l">e. Pour ${n2} séances, quelle formule est la moins chère ?</p>`, items,
      hints: ['Remplace x par le nombre de séances dans chaque formule.', 'Même prix : résous f(x) = g(x).', 'Après l’intersection, la droite la plus basse donne la formule la moins chère.'] };
  };
  /* ===== exercice ajouté : notion 1 (image, antécédent, lecture graphique) ===== */
  {
    const { Q, fr, pick, int, shuffle, svg, T } = H;
    TR.c5e4 = R => {
      const X = [0, 2, 4, 6, 8], Y = shuffle(R, [0, 2, 4, 6, 8, 10, 12]).slice(0, 5).sort((a, b) => a - b);
      const x0 = 46, y0 = 196, sx = 44, sy = 14, px = x => x0 + x * sx, py = y => y0 - y * sy;
      let g = '';
      for (let x = 0; x <= 8; x++) g += `<line x1="${px(x)}" y1="${py(0)}" x2="${px(x)}" y2="${py(12)}" stroke="#D5DBEC" stroke-width="1"/>` + T(px(x), y0 + 16, String(x), { fs: 11 });
      for (let y = 0; y <= 12; y += 2) g += `<line x1="${px(0)}" y1="${py(y)}" x2="${px(8)}" y2="${py(y)}" stroke="#D5DBEC" stroke-width="1"/>` + T(x0 - 8, py(y) + 4, String(y), { fs: 11, a: 'end' });
      g += `<line x1="${px(0)}" y1="${py(0)}" x2="${px(8) + 10}" y2="${py(0)}" stroke="#1D2240" stroke-width="2"/><line x1="${px(0)}" y1="${py(0)}" x2="${px(0)}" y2="${py(12) - 10}" stroke="#1D2240" stroke-width="2"/>` + T(px(8) + 14, y0 + 4, 'x', { fs: 12, a: 'start' }) + T(x0 + 14, py(12) - 8, 'f(x)', { fs: 12, a: 'start' });
      g += `<polyline points="${X.map((x, i) => px(x) + ',' + py(Y[i])).join(' ')}" fill="none" stroke="#2B59C3" stroke-width="3" stroke-linejoin="round"/>` + X.map((x, i) => `<circle cx="${px(x)}" cy="${py(Y[i])}" r="4.5" fill="#2B59C3"/>`).join('');
      const pic = svg(440, 226, g, 'Courbe de la fonction f : lecture d’images et d’antécédents');
      const i = int(R, 1, 4); let j = int(R, 1, 4); while (j === i) j = int(R, 1, 4);
      const Sx = shuffle(R, [0, 1, 2, 3, 4].filter(t => t !== i && t !== j)), yes = R() < .5, p = Sx[0], q = yes ? p : Sx[1], r3 = Sx[2];
      const m = pick(R, [1, 2, 3, 4]), xm = X[m - 1] + 1, ym = (Y[m - 1] + Y[m]) / 2;
      return Q('Lire une courbe : image et antécédent', 'Voici la courbe de la fonction f. Les points marqués sont sur des croisements du quadrillage ; entre deux points, la courbe est un segment.', [
        { lab: `Image de ${X[i]} par f : f(${X[i]})`, v: Y[i], d: 0, w: 12, x: `On part de ${X[i]} sur l’axe horizontal, on monte jusqu’à la courbe, puis on lit l’axe vertical : f(${X[i]}) = ${Y[i]}.`, err: [{ v: X[i], m: 'L’image se lit sur l’axe vertical, pas sur l’axe horizontal.' }] },
        { lab: `Antécédent de ${Y[j]} par f`, v: X[j], d: 0, w: 12, x: `On part de ${Y[j]} sur l’axe vertical, on va vers la courbe, puis on lit l’axe horizontal : l’antécédent de ${Y[j]} est ${X[j]}.`, err: [{ v: Y[j], m: 'Un antécédent se lit sur l’axe horizontal.' }] },
        { lab: `Le point de coordonnées (${X[p]} ; ${Y[q]}) est-il sur la courbe ?`, qcm: ['oui', 'non'], ok: yes ? 0 : 1, x: yes ? `f(${X[p]}) = ${Y[p]} : le point (${X[p]} ; ${Y[p]}) est bien sur la courbe.` : `f(${X[p]}) = ${Y[p]}, pas ${Y[q]} : le point n’est pas sur la courbe.` },
        { lab: `Dans l’égalité f(${X[r3]}) = ${Y[r3]}, le nombre ${X[r3]} est…`, qcm: [`l’image de ${Y[r3]}`, `un antécédent de ${Y[r3]}`], ok: 1, x: `Dans f(a) = b, b est l’image de a et a est un antécédent de b : ${X[r3]} est un antécédent de ${Y[r3]}.` },
        { lab: `Image de ${xm} (lecture sur le segment)`, v: ym, d: 0, w: 12, x: `${xm} est au milieu de ${X[m - 1]} et ${X[m]} : la courbe passe à mi-hauteur entre ${Y[m - 1]} et ${Y[m]}, soit (${Y[m - 1]} + ${Y[m]}) ÷ 2 = ${ym}.` }],
        ['L’image se lit sur l’axe vertical, l’antécédent sur l’axe horizontal.', 'Pour une image : pars de x, monte ou descends jusqu’à la courbe.', 'Pour un antécédent : pars de la valeur sur l’axe vertical, va jusqu’à la courbe, puis descends.'], pic);
    };
  }
  /* ===== niveaux 🌱 guidé et 🚀 défi · chapitre 5 ===== */
  {
    const { Q, AI, fr, pick, int, shuffle, table } = H;
    const plotLine = (a, b, x1, dots) => {
      const f = x => a * x + b, lo = Math.min(f(0), f(5), 0), hi = Math.max(f(0), f(5), 0), y0 = Math.floor(lo / 2) * 2, y1 = Math.ceil(hi / 2) * 2 + 2;
      const g = P.plot({ W: 560, H: 230, x: [0, 5, 1], y: [y0, y1, 2], ml: 46, mr: 16, mt: 12, mb: 28, fs: 12, xl: 'x', yl: 'f(x)', zeroAxes: true, cls: 'pic vis trs' });
      return g.wrap(g.base + g.line(a, b) + dots(g));
    };
    /* e1 · lire une droite */
    TR.c5e1a = R => {
      const a = pick(R, [1, 2, 3]), b = int(R, 1, 4), x1 = pick(R, [2, 3]), f = x => a * x + b;
      const pic = plotLine(a, b, x1, g => g.dot(0, b, { lab: 'A', dy: -10 }) + g.dot(x1, f(x1), { lab: 'B', dy: -10 }));
      return Q('Lire une droite, pas à pas', 'La droite représente une fonction affine f : f(x) = ax + b. A et B sont deux points de la droite.', [
        { lab: 'Ordonnée du point A, c’est f(0) =', v: b, d: 0, w: 10, x: `A est sur l’axe vertical : A(0 ; ${b}), donc f(0) = ${b} (c’est le nombre b).`, err: [{ v: a, m: 'On lit l’ordonnée du point A, là où la droite coupe l’axe vertical.' }] },
        { lab: `Ordonnée du point B, c’est f(${x1}) =`, v: f(x1), d: 0, w: 10, x: `B(${x1} ; ${f(x1)}) : f(${x1}) = ${f(x1)}`, err: [{ v: x1, m: 'L’image se lit sur l’axe vertical, pas sur l’axe horizontal.' }] },
        { lab: `De A à B, x augmente de ${x1}. De combien f(x) augmente-t-il ?`, v: f(x1) - b, d: 0, w: 10, x: `${f(x1)} − ${b} = ${f(x1) - b}`, err: [{ v: f(x1), m: 'Calcule la différence entre les ordonnées de B et de A.' }] },
        { lab: 'Quand x augmente de 1, f(x) augmente de (c’est a)', v: a, d: 0, w: 10, x: `${f(x1) - b} ÷ ${x1} = ${a} : a = ${a}`, err: [{ v: f(x1) - b, m: 'Divise cette augmentation par ' + x1 + ' pour passer à « x augmente de 1 ».' }] },
        { lab: 'Image de 10 par f (utilise a et b)', v: 10 * a + b, d: 0, w: 10, x: `f(x) = ${a}x + ${b} : f(10) = ${a} × 10 + ${b} = ${10 * a + b}`, err: [{ v: 10 * a, m: 'N’oublie pas d’ajouter b.' }] }],
        ['f(0) se lit là où la droite coupe l’axe vertical.', 'Pour a, compte de combien la droite monte quand x augmente de 1.', 'Une fois a et b connus : f(x) = ax + b, remplace x.'],
        pic + AI('la droite passe par (0 ; 1) et (2 ; 5) : b = 1 ; de 1 à 5, elle monte de 4 pour 2 de plus en x : a = 4 ÷ 2 = 2.'));
    };
    TR.c5e1d = R => {
      const a = -pick(R, [2, 3, 4]), x0 = pick(R, [3, 4, 5]), b = -a * x0, x2 = int(R, 1, x0 - 1), f = x => a * x + b, x1 = pick(R, [1, 2].filter(v => v !== x2));
      const pic = plotLine(a, b, x1, g => g.dot(0, b, { lab: 'A', dy: -10 }) + g.dot(x1, f(x1), { lab: 'B', dy: -10 }));
      return Q('Une droite qui descend', 'La droite représente la fonction affine f. Elle coupe l’axe horizontal en un point à trouver.', [
        { lab: 'f(0) =', v: b, d: 0, w: 10, x: `La droite coupe l’axe vertical en A(0 ; ${b}) : f(0) = ${b}.` },
        { lab: 'Coefficient a (de combien f(x) varie quand x augmente de 1)', v: a, d: 0, w: 10, x: `De A(0 ; ${b}) à B(${x1} ; ${f(x1)}) : (${f(x1)} − ${b}) ÷ ${x1} = ${rel(a)}. La droite descend : a est négatif.`, err: [{ v: -a, m: 'La droite descend : le coefficient a est négatif.' }] },
        { lab: `Antécédent de ${f(x2)} par f`, v: x2, d: 0, w: 10, x: `On part de ${f(x2)} sur l’axe vertical, on rejoint la droite, puis on lit l’axe horizontal : x = ${x2}.`, err: [{ v: f(x2), m: 'Un antécédent se lit sur l’axe horizontal.' }] },
        { lab: 'Valeur de x pour laquelle f(x) = 0', v: x0, d: 0, w: 10, x: `${rel(a)}x + ${b} = 0 donne ${rel(a)}x = ${rel(-b)}, donc x = ${rel(-b)} ÷ ${par(a)} = ${x0} : la droite coupe l’axe horizontal en x = ${x0}.`, err: [{ v: b, m: 'On cherche la valeur de x (axe horizontal) où la droite touche l’axe horizontal.' }] },
        { lab: 'Image de 10 par f', v: 10 * a + b, d: 0, w: 12, x: `f(10) = ${rel(a)} × 10 + ${b} = ${rel(10 * a)} + ${b} = ${rel(10 * a + b)}`, err: [{ v: -10 * a + b, m: 'Le coefficient a est négatif : ' + rel(a) + ' × 10 = ' + rel(10 * a) + '.' }] }],
        ['f(0), c’est l’ordonnée du point où la droite coupe l’axe vertical.', 'Si la droite descend, a est négatif.', 'Pour f(x) = 0, cherche le point où la droite touche l’axe horizontal.'], pic);
    };
    /* e2 · tableau de valeurs */
    TR.c5e2a = R => {
      const a = pick(R, [2, 3, 4, 5]), b = pick(R, [5, 10, 20]), [x1, x2, x3] = [int(R, 1, 3), int(R, 4, 6), int(R, 7, 9)], f = x => a * x + b;
      return Q('Un tableau de valeurs, pas à pas', `Un service facture ${fr(b)} € plus ${fr(a)} € par unité : f(x) = ${a}x + ${b}, en euros, pour x unités.`, [
        { lab: `${a} × ${x1} =`, v: a * x1, d: 0, w: 10, x: `${a} × ${x1} = ${a * x1}`, err: [{ v: a + x1, m: 'Le prix des unités se calcule en multipliant.' }] },
        { lab: `f(${x1}) = (le résultat de a) + ${b} =`, v: f(x1), d: 0, w: 10, x: `${a * x1} + ${b} = ${f(x1)}` },
        { lab: `f(${x2}) =`, v: f(x2), d: 0, w: 10, x: `${a} × ${x2} + ${b} = ${a * x2} + ${b} = ${f(x2)}`, err: [{ v: a * x2, m: 'N’oublie pas d’ajouter ' + b + '.' }] },
        { lab: `f(${x3}) =`, v: f(x3), d: 0, w: 10, x: `${a} × ${x3} + ${b} = ${a * x3} + ${b} = ${f(x3)}` },
        { lab: 'De x = 1 à x = 2, f(x) augmente de', v: a, d: 0, w: 10, x: `f(2) − f(1) = ${f(2)} − ${f(1)} = ${a} : c’est le coefficient a`, err: [{ v: b, m: 'f(x) augmente du coefficient a quand x augmente de 1.' }] }],
        ['Remplace x par le nombre, multiplie d’abord, ajoute ensuite.', 'Le forfait b ne se multiplie pas : on l’ajoute une seule fois.', 'Quand x augmente de 1, f(x) augmente de a.'],
        table(['x', String(x1), String(x2), String(x3)], [['f(x)', '?', '?', '?']]) + AI('f(x) = 3x + 2 pour x = 4 : 3 × 4 = 12, puis 12 + 2 = 14.'));
    };
    TR.c5e2d = R => {
      const a = pick(R, [2, 3, 4, 5, 6]), b = int(R, 2, 12), xA = pick(R, [1, 2]), xB = xA + pick(R, [3, 4]), f = x => a * x + b, k = pick(R, [6, 7, 8, 9, 11, 12]);
      return Q('Retrouver la fonction', `Une fonction affine f vérifie f(${xA}) = ${f(xA)} et f(${xB}) = ${f(xB)}. On cherche f(x) = ax + b.`, [
        { lab: 'Coefficient a', v: a, d: 0, w: 10, x: `a = (${f(xB)} − ${f(xA)}) ÷ (${xB} − ${xA}) = ${f(xB) - f(xA)} ÷ ${xB - xA} = ${a}`, err: [{ v: f(xB) - f(xA), m: 'Divise la variation de f(x) par la variation de x.' }] },
        { lab: 'Nombre b', v: b, d: 0, w: 10, x: `f(${xA}) = ${a} × ${xA} + b = ${f(xA)} donc b = ${f(xA)} − ${a * xA} = ${b}`, err: [{ v: f(xA), m: 'f(' + xA + ') = a × ' + xA + ' + b : retire a × ' + xA + '.' }] },
        { lab: 'Image de 10 par f', v: f(10), d: 0, w: 12, x: `f(10) = ${a} × 10 + ${b} = ${f(10)}` },
        { lab: `Antécédent de ${f(k)} par f`, v: k, d: 0, w: 10, x: `${a}x + ${b} = ${f(k)} ; ${a}x = ${f(k) - b} ; x = ${k}`, err: [{ v: a * f(k) + b, m: 'On cherche x tel que f(x) = ' + f(k) + ' : écris et résous l’équation.' }] },
        { lab: 'La fonction f est-elle linéaire ?', qcm: ['oui', 'non'], ok: 1, x: `f(x) = ${a}x + ${b} avec b = ${b} ≠ 0 : elle est affine, pas linéaire.` }],
        ['a = (variation de f(x)) ÷ (variation de x).', 'Remplace dans f(x) = ax + b pour trouver b.', 'Pour un antécédent, résous l’équation ax + b = y.']);
    };
    /* e3 · comparer deux formules */
    TR.c5e3a = R => {
      let p, q, r, X;
      do { p = pick(R, [8, 9, 10, 11, 12]); q = pick(R, [3, 4, 5, 6]); X = int(R, 3, 8); r = (p - q) * X; } while (r > 60);
      const n = pick(R, [X - 2, X - 1, X + 2, X + 3].filter(v => v > 0)), A = p * n, B = q * n + r, ok = A < B ? 0 : 1;
      return Q('Deux formules, pas à pas', `Sans carte, une séance coûte ${p} €. Avec une carte de ${r} €, la séance coûte ${q} €. On va ${n} fois au cinéma.`, [
        { lab: `Prix sans carte (${p} × ${n}), en €`, v: A, d: 0, w: 10, x: `${p} × ${n} = ${A} €` },
        { lab: `Prix avec carte (${q} × ${n} + ${r}), en €`, v: B, d: 0, w: 10, x: `${q} × ${n} = ${q * n} puis ${q * n} + ${r} = ${B} €`, err: [{ v: q * n, m: 'N’oublie pas le prix de la carte : ' + r + ' €.' }] },
        { lab: 'La formule la moins chère est…', qcm: ['sans carte', 'avec la carte'], ok, x: `${A} € sans carte contre ${B} € avec la carte : la moins chère est « ${ok === 0 ? 'sans carte' : 'avec la carte'} ».` },
        { lab: 'Économie réalisée avec la meilleure formule, en €', v: Math.abs(A - B), d: 0, w: 10, x: `${Math.max(A, B)} − ${Math.min(A, B)} = ${Math.abs(A - B)} €` }],
        ['Sans carte : prix d’une séance × nombre de séances.', 'Avec carte : prix de la carte + prix d’une séance × nombre de séances.', 'La formule la moins chère est celle qui donne le plus petit prix.'],
        AI('5 séances, 10 € la séance ou 6 € avec une carte de 20 € : sans carte 10 × 5 = 50 € ; avec carte 6 × 5 + 20 = 50 €.'));
    };
    TR.c5e3d = R => {
      let p, q, r, X;
      do { p = pick(R, [8, 9, 10, 11, 12]); q = pick(R, [3, 4, 5, 6]); X = int(R, 3, 8); r = (p - q) * X; } while (r > 60);
      const N = pick(R, [15, 20, 25]);
      return Q('Quand la carte devient-elle rentable ?', `f(x) = ${p}x sans carte ; g(x) = ${q}x + ${r} avec une carte de ${r} €. Quand la carte est-elle avantageuse ?`, [
        { lab: 'f(x) = g(x) donne ?x = ' + r + '. Le nombre est', v: p - q, d: 0, w: 10, x: `${p}x = ${q}x + ${r} ; ${p}x − ${q}x = ${r} ; ${p - q}x = ${r}`, err: [{ v: p + q, m: 'On enlève ' + q + 'x des deux côtés : ' + p + 'x − ' + q + 'x.' }] },
        { lab: 'Nombre de séances pour lequel les deux prix sont égaux', v: X, d: 0, w: 10, x: `${r} ÷ ${p - q} = ${X}`, err: [{ v: r / p, m: 'Divise par ' + (p - q) + ', le coefficient de x après regroupement.' }] },
        { lab: 'Nombre minimal de séances pour que la carte coûte moins cher', v: X + 1, d: 0, w: 10, x: `À ${X} séances les prix sont égaux ; à ${X + 1} séances, la carte devient moins chère : ${q} × ${X + 1} + ${r} = ${q * (X + 1) + r} € contre ${p} × ${X + 1} = ${p * (X + 1)} €.`, err: [{ v: X, m: 'À ' + X + ' séances les prix sont égaux : la carte n’est pas encore moins chère.' }] },
        { lab: `Économie avec la carte pour ${N} séances, en €`, v: p * N - (q * N + r), d: 0, w: 10, x: `${p} × ${N} = ${p * N} € ; ${q} × ${N} + ${r} = ${q * N + r} € ; ${p * N} − ${q * N + r} = ${p * N - (q * N + r)} €` },
        { lab: 'Pour 2 séances, la formule la moins chère est…', qcm: ['sans carte', 'avec la carte'], ok: 0, x: `2 séances : ${p * 2} € sans carte contre ${q * 2 + r} € avec la carte. 2 est plus petit que ${X} : la carte n’est pas encore rentable.` }],
        ['Écris l’équation f(x) = g(x) et regroupe les x d’un côté.', 'Avant ce nombre de séances, la carte n’est pas rentable ; après, elle l’est.', 'Pour comparer, calcule le prix de chaque formule.']);
    };
    /* e4 · image et antécédent */
    TR.c5e4a = R => {
      const X = [0, 2, 4, 6, 8], Y = shuffle(R, [0, 2, 4, 6, 8, 10, 12]).slice(0, 5).sort((a, b) => a - b), i = int(R, 1, 4); let j = int(R, 1, 4); while (j === i) j = int(R, 1, 4);
      const r3 = pick(R, [0, 1, 2, 3, 4].filter(t => t !== i && t !== j));
      return Q('Image et antécédent, pas à pas', 'Voici le tableau de valeurs d’une fonction f. La première ligne donne x, la seconde donne f(x).', [
        { lab: `Image de ${X[i]} par f`, v: Y[i], d: 0, w: 10, x: `Dans la colonne de x = ${X[i]}, on lit f(${X[i]}) = ${Y[i]}.`, err: [{ v: X[i], m: 'L’image est dans la seconde ligne, celle de f(x).' }] },
        { lab: `Antécédent de ${Y[j]} par f`, v: X[j], d: 0, w: 10, x: `${Y[j]} est dans la colonne de x = ${X[j]} : l’antécédent de ${Y[j]} est ${X[j]}.`, err: [{ v: Y[j], m: 'L’antécédent est dans la première ligne, celle de x.' }] },
        { lab: `Dans f(${X[r3]}) = ${Y[r3]}, le nombre ${X[r3]} est…`, qcm: [`l’image de ${Y[r3]}`, `un antécédent de ${Y[r3]}`], ok: 1, x: `Dans f(a) = b : b est l’image de a, et a est un antécédent de b. Donc ${X[r3]} est un antécédent de ${Y[r3]}.` },
        { lab: `f(${X[i]}) + f(${X[j]}) =`, v: Y[i] + Y[j], d: 0, w: 10, x: `${Y[i]} + ${Y[j]} = ${Y[i] + Y[j]}`, err: [{ v: X[i] + X[j], m: 'Additionne les images (deuxième ligne), pas les valeurs de x.' }] }],
        ['L’image de x se lit dans la ligne de f(x).', 'L’antécédent de y se lit dans la ligne de x, dans la colonne de y.', 'Dans f(a) = b, a est un antécédent de b.'],
        table(['x', ...X.map(String)], [['f(x)', ...Y.map(String)]]) + AI('si f(3) = 7 : 7 est l’image de 3, et 3 est un antécédent de 7.'));
    };
    TR.c5e4d = R => {
      const L = pick(R, [8, 10]), k = .5, h = t => k * t * (L - t), ts = Array.from({ length: L + 1 }, (_, i) => i), t1 = int(R, 1, L / 2 - 1), tm = L / 2; let ta = int(R, 1, L - 1); while (ta === t1 || ta === L - t1) ta = int(R, 1, L - 1);
      return Q('Le saut : plusieurs antécédents', `La hauteur h(t) d’un personnage qui saute est donnée par ce tableau (t en dixièmes de seconde, h en cases).`, [
        { lab: `Image de ${ta} par h`, v: h(ta), d: 1, w: 10, x: `On lit la colonne t = ${ta} : h(${ta}) = ${fr(h(ta))}.` },
        { lab: `Plus petit antécédent de ${fr(h(t1))} par h`, v: t1, d: 0, w: 10, x: `${fr(h(t1))} apparaît pour t = ${t1} et pour t = ${L - t1} : le plus petit est ${t1}.`, err: [{ v: L - t1, m: 'Il y a deux antécédents : donne le plus petit.' }] },
        { lab: `Plus grand antécédent de ${fr(h(t1))} par h`, v: L - t1, d: 0, w: 10, x: `${fr(h(t1))} apparaît pour t = ${t1} et pour t = ${L - t1} : le plus grand est ${L - t1}.`, err: [{ v: t1, m: 'Il y a deux antécédents : donne le plus grand.' }] },
        { lab: 'Hauteur maximale, en cases', v: h(tm), d: 1, w: 10, x: `La plus grande valeur du tableau est ${fr(h(tm))}, pour t = ${tm}.` },
        { lab: 'Durée totale du saut, en dixièmes de seconde', v: L, d: 0, w: 10, x: `Le personnage retombe au sol (h = 0) pour t = ${L} : le saut dure ${L} dixièmes de seconde.`, err: [{ v: tm, m: 'À t = ' + tm + ', c’est le sommet. Cherche quand h revient à 0.' }] }],
        ['Un même nombre peut avoir deux antécédents : cherche-le deux fois dans le tableau.', 'La hauteur maximale est la plus grande valeur de la deuxième ligne.', 'Le saut est fini quand h revient à 0.'],
        table(['t', ...ts.map(String)], [['h(t)', ...ts.map(t => fr(h(t)))]]));
    };
  }
})(typeof module !== 'undefined' ? module.exports : window);
