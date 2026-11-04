/* 3ème Prépa-Métiers · chapitre 9 — Échelles, agrandissements et réductions (longueurs, aires, volumes), théorème de Thalès. */
(function (root) {
  'use strict';
  const { DEP, TR, H } = typeof module !== 'undefined' ? require('./train.js').MCVT : root.MCVT;
  const { fr, rnd, tb, sb, T, svg, table, num, qcm, pick, int, xs } = H;

  /* point de départ : la statue géante et ses maquettes */
  DEP.c9 = R => {
    const E = [144, 100, 60], k = int(R, 0, 2), hs = E.map(e => rnd(1970 / e, 1));
    const doc = `<table class="dt tcx dt-sm"><thead><tr><th>Échelle de la maquette</th><th>Hauteur de la maquette</th></tr></thead><tbody>${E.map((e, i) => `<tr><th>1/${e}</th><td data-cell="${i}">${fr(hs[i])} cm</td></tr>`).join('')}</tbody></table><p class="srcl">Statue géante d’Odaiba : 19,7 m (Wikipédia). Hauteurs arrondies au millimètre.</p>`;
    return { titre: 'La statue et ses maquettes', doc,
      qs: [{ t: `Touche la hauteur de la maquette au 1/${E[k]}.`, kind: 'tap', cell: String(k), v: hs[k], tol: .06, a: fr(hs[k]) + ' cm' },
        { t: 'Convertis 19,7 m en centimètres.', kind: 'num', v: 1970, tol: .01, a: '1 970 cm', x: '19,7 × 100 = 1 970 cm' },
        { t: 'Quelle maquette est la plus grande ?', kind: 'qcm', choices: ['1/60', '1/100', '1/144'], ok: 0, a: '1/60 : on divise par le plus petit nombre', x: '1 970 ÷ 60 > 1 970 ÷ 100 > 1 970 ÷ 144' },
        { t: 'Une maquette au 1/100 mesure combien de cm ?', kind: 'num', v: 19.7, tol: .06, a: '19,7 cm', x: '1 970 ÷ 100 = 19,7 cm' },
        { t: 'Au 1/100, 1 cm sur la maquette représente combien de mètres en vrai ?', kind: 'num', v: 1, tol: .01, a: '1 m', x: '1 cm × 100 = 100 cm = 1 m' }] };
  };

  /* e1 · le plan à l’échelle */
  TR.c9e1 = R => {
    const n = pick(R, [50, 100, 200, 250, 500]), L = [int(R, 3, 12), int(R, 2, 9)], real3 = pick(R, [5, 8, 10, 12, 15]);
    const r1 = L[0] * n / 100, r2 = L[1] * n / 100, p3 = real3 * 100 / n;
    const items = [num('a', r1, 2, fr(r1) + ' m', [{ v: L[0] * n, m: 'C’est en cm : convertis en mètres (÷ 100).' }]), num('b', r2, 2, fr(r2) + ' m'), num('c', p3, 2, fr(p3) + ' cm', [{ v: real3 * n, m: 'Pour passer du réel au plan, on divise par ' + n + '.' }]), num('d', rnd(r1 * r2, 2), 2, fr(rnd(r1 * r2, 2)) + ' m²')];
    xs(items, { a: `${L[0]} × ${n} = ${fr(L[0] * n)} cm = ${fr(r1)} m`, b: `${L[1]} × ${n} = ${fr(L[1] * n)} cm = ${fr(r2)} m`, c: `${real3} m = ${fr(real3 * 100)} cm ; ${fr(real3 * 100)} ÷ ${n} = ${fr(p3)} cm`, d: `${fr(r1)} × ${fr(r2)} = ${fr(rnd(r1 * r2, 2))} m²` });
    return { titre: 'Le plan à l’échelle', consigne: `Le plan d’une salle de jeux vidéo est à l’échelle 1/${n} : 1 cm sur le plan représente ${n} cm en vrai.`,
      support: table(['', 'Sur le plan', 'En vrai'], [['Longueur de la salle', `${L[0]} cm`, `a. ${tb('a', fr(r1), 12)} m`], ['Largeur de la salle', `${L[1]} cm`, `b. ${tb('b', fr(r2), 12)} m`], ['Un écran géant', `c. ${tb('c', fr(p3), 12)} cm`, `${real3} m`]]) + `<p class="tr-l">d. Aire réelle de la salle : ${tb('d', fr(rnd(r1 * r2, 2)), 14)} m²</p>`, items,
      hints: ['Du plan au réel : × ' + n + '.', 'Du réel au plan : ÷ ' + n + ', avec la même unité.', '1 m = 100 cm.'] };
  };

  /* e2 · agrandir ou réduire : longueurs, aires, volumes */
  TR.c9e2 = R => {
    const k = pick(R, [2, 3, 1.5, 0.5, 4]), Ln = pick(R, [6, 8, 10, 12]), A = pick(R, [20, 24, 30, 40]), V = pick(R, [50, 80, 100, 120]);
    const what = k > 1 ? 'agrandissement' : 'réduction';
    const items = [qcm('a', ['agrandissement', 'réduction'], k > 1 ? 0 : 1, `${what} : k ${k > 1 ? '>' : '<'} 1`), num('b', rnd(Ln * k, 2), 2, fr(rnd(Ln * k, 2)) + ' cm'), num('c', rnd(A * k * k, 2), 2, fr(rnd(A * k * k, 2)) + ' cm²', [{ v: rnd(A * k, 2), m: 'Une aire est multipliée par k² = ' + fr(k * k) + ', pas par k.' }]), num('d', rnd(V * k ** 3, 2), 2, fr(rnd(V * k ** 3, 2)) + ' cm³', [{ v: rnd(V * k, 2), m: 'Un volume est multiplié par k³ = ' + fr(k ** 3) + '.' }, { v: rnd(V * k * k, 2), m: 'Pour un volume, c’est k³, pas k².' }])];
    xs(items, { b: `${Ln} × ${fr(k)} = ${fr(rnd(Ln * k, 2))} cm`, c: `${A} × ${fr(k)}² = ${A} × ${fr(k * k)} = ${fr(rnd(A * k * k, 2))} cm²`, d: `${V} × ${fr(k)}³ = ${V} × ${fr(k ** 3)} = ${fr(rnd(V * k ** 3, 2))} cm³` });
    return { titre: 'Agrandir ou réduire', consigne: `On fabrique une figurine à partir d’un modèle, avec un coefficient k = ${fr(k)}.`,
      support: table(['', 'Modèle', 'Nouvelle figurine'], [['Hauteur', `${Ln} cm`, `b. ${tb('b', fr(rnd(Ln * k, 2)), 12)} cm`], ['Aire à peindre', `${A} cm²`, `c. ${tb('c', fr(rnd(A * k * k, 2)), 14)} cm²`], ['Volume de résine', `${V} cm³`, `d. ${tb('d', fr(rnd(V * k ** 3, 2)), 14)} cm³`]]) + `<p class="tr-l">a. Est-ce un agrandissement ou une réduction ?</p>`, items,
      hints: ['k > 1 : agrandissement ; k < 1 : réduction.', 'Longueurs × k, aires × k².', 'Volumes × k³.'] };
  };

  /* e3 · le théorème de Thalès */
  TR.c9e3 = R => {
    let AM, AB, BC, AN, AC; do { AB = int(R, 6, 15); AM = int(R, 2, AB - 2); BC = int(R, 4, 14); AC = int(R, 6, 15); AN = AM * AC / AB; } while (!Number.isInteger(AN * 2) || !Number.isInteger(BC * AM / AB * 2));
    const MN = BC * AM / AB;
    const Ax = 60, Ay = 190, Bx = 540, By = 190, Cx = 420, Cy = 30, t = AM / AB, Mx = Ax + (Bx - Ax) * t, My = Ay, Nx = Ax + (Cx - Ax) * t, Ny = Ay + (Cy - Ay) * t;
    const s = `<path d="M${Ax} ${Ay}L${Bx} ${By}L${Cx} ${Cy}Z" class="k2 ks" stroke-width="2.2" fill-opacity=".3"/><line x1="${Mx}" y1="${My}" x2="${Nx}" y2="${Ny}" class="ks" stroke-width="2.6"/>` + T(Ax - 12, Ay + 6, 'A', { fs: 14 }) + T(Bx + 12, By + 6, 'B', { fs: 14 }) + T(Cx, Cy - 8, 'C', { fs: 14 }) + T(Mx, My + 18, 'M', { fs: 14 }) + T(Nx - 12, Ny - 6, 'N', { fs: 14 }) + T((Ax + Mx) / 2, Ay + 18, `AM = ${AM}`, { fs: 12, c: 'ts' }) + T((Mx + Bx) / 2, By + 18, `AB = ${AB}`, { fs: 12, c: 'ts' }) + T((Bx + Cx) / 2 + 12, (By + Cy) / 2, `BC = ${BC}`, { fs: 12, a: 'start', c: 'ts' }) + T((Ax + Cx) / 2 - 20, (Ay + Cy) / 2 - 10, `AC = ${AC}`, { fs: 12, a: 'end', c: 'ts' });
    const items = [num('a', t, 3, `${AM}/${AB}`, [{ v: AB / AM, m: 'Le rapport : petit triangle ÷ grand triangle, AM ÷ AB.' }]), num('b', MN, 1, fr(MN), [{ v: BC * AB / AM, m: 'MN = BC × AM ÷ AB : le petit côté est plus court que BC.' }]), num('c', AN, 1, fr(AN))];
    xs(items, { a: `AM/AB = ${AM}/${AB}`, b: `MN/BC = AM/AB, donc MN = ${BC} × ${AM} ÷ ${AB} = ${fr(MN)}`, c: `AN/AC = AM/AB, donc AN = ${AC} × ${AM} ÷ ${AB} = ${fr(AN)}` });
    return { titre: 'Le théorème de Thalès', consigne: 'M est sur [AB], N est sur [AC] et les droites (MN) et (BC) sont parallèles. Les longueurs sont en cm.',
      support: svg(600, 216, s, 'Configuration de Thalès dans un triangle') + `<p class="tr-l">a. Rapport AM/AB : ${tb('a', `${AM}/${AB}`, 12)} · b. MN = ${tb('b', fr(MN), 12)} cm · c. AN = ${tb('c', fr(AN), 12)} cm</p>`, items,
      hints: ['Le sommet commun est A.', 'Thalès : AM/AB = AN/AC = MN/BC.', 'Produit en croix : MN = BC × AM ÷ AB.'] };
  };
  /* ===== exercice ajouté : notion 2 (agrandir et réduire des longueurs) ===== */
  {
    const { Q, fr, pick, int, table, rnd } = H;
    TR.c9e4 = R => {
      const k = pick(R, [0.5, 0.25, 0.2, 0.1, 2, 3, 4, 1.5]), L1 = pick(R, [20, 40, 60, 80]), M = pick(R, [12, 16, 24, 28, 32, 36, 40]), T = pick(R, [10, 15, 25, 30, 50]), ang = pick(R, [35, 40, 55, 65, 70, 110]), red = k < 1;
      const l1 = rnd(L1 * k, 2), mm = rnd(M * k, 2), pp = rnd(k * T, 2), nom = red ? 'une maquette' : 'un agrandissement';
      return Q('Agrandir et réduire', `On construit ${nom} d’une pièce métallique. La longueur AB mesure ${fr(L1, 0)} cm sur la pièce et ${fr(l1)} cm sur ${red ? 'la maquette' : 'l’agrandissement'}.`, [
        { lab: 'Coefficient de la transformation k (longueur obtenue ÷ longueur de départ)', v: k, d: 2, w: 14, x: `${fr(l1)} ÷ ${fr(L1, 0)} = ${fr(k)}`, err: [{ v: rnd(1 / k, 2), m: 'Divise la longueur obtenue par la longueur de départ, dans cet ordre.' }] },
        { lab: `Longueur de CD sur ${red ? 'la maquette' : 'l’agrandissement'}, sachant que CD mesure ${fr(M, 0)} cm sur la pièce (en cm)`, v: mm, d: 2, x: `${fr(M, 0)} × ${fr(k)} = ${fr(mm)}`, err: [{ v: rnd(M / k, 2), m: 'Toutes les longueurs sont multipliées par k, pas divisées.' }] },
        { lab: `Un segment mesure ${fr(pp)} cm sur ${red ? 'la maquette' : 'l’agrandissement'} : sa longueur sur la pièce (en cm)`, v: T, d: 2, x: `On revient à la pièce en divisant par k : ${fr(pp)} ÷ ${fr(k)} = ${fr(T, 0)}`, err: [{ v: rnd(pp * k, 2), m: 'Pour revenir à la pièce, on divise par k.' }] },
        { lab: `Un angle de ${ang}° sur la pièce mesure sur ${red ? 'la maquette' : 'l’agrandissement'} (en °)`, v: ang, d: 0, w: 12, x: `Les angles ne changent pas dans un agrandissement ou une réduction : ${ang}°.`, err: [{ v: rnd(ang * k, 0), m: 'Les angles sont conservés : ils ne sont pas multipliés par k.' }] },
        { lab: 'Cette transformation est…', qcm: ['un agrandissement', 'une réduction'], ok: red ? 1 : 0, x: red ? `k = ${fr(k)} est plus petit que 1 : c’est une réduction.` : `k = ${fr(k)} est plus grand que 1 : c’est un agrandissement.` }],
        ['k = longueur obtenue ÷ longueur de départ.', 'Toutes les longueurs sont multipliées par k, les angles ne changent pas.', 'k plus grand que 1 : agrandissement. k plus petit que 1 : réduction.'],
        table(['', 'Longueur AB', 'Longueur CD'], [['Pièce', `${fr(L1, 0)} cm`, `${fr(M, 0)} cm`], [red ? 'Maquette' : 'Agrandissement', `${fr(l1)} cm`, '?']]));
    };
  }
  /* ===== niveaux 🌱 guidé et 🚀 défi · chapitre 9 ===== */
  {
    const { Q, AI } = H;
    const thFig = (AM, AB, BC, AC, lab) => {
      const Ax = 60, Ay = 190, Bx = 540, By = 190, Cx = 420, Cy = 30, t = AM / AB, Mx = Ax + (Bx - Ax) * t, Nx = Ax + (Cx - Ax) * t, Ny = Ay + (Cy - Ay) * t;
      return svg(600, 216, `<path d="M${Ax} ${Ay}L${Bx} ${By}L${Cx} ${Cy}Z" class="k2 ks" stroke-width="2.2" fill-opacity=".3"/><line x1="${Mx}" y1="${Ay}" x2="${Nx}" y2="${Ny}" class="ks" stroke-width="2.6"/>` + T(Ax - 12, Ay + 6, 'A', { fs: 14 }) + T(Bx + 12, By + 6, 'B', { fs: 14 }) + T(Cx, Cy - 8, 'C', { fs: 14 }) + T(Mx, Ay + 18, 'M', { fs: 14 }) + T(Nx - 12, Ny - 6, 'N', { fs: 14 }) + T((Ax + Mx) / 2, Ay + 34, lab[0], { fs: 12, c: 'ts' }) + T((Mx + Bx) / 2, By + 34, lab[1], { fs: 12, c: 'ts' }) + T((Bx + Cx) / 2 + 14, (By + Cy) / 2, lab[2], { fs: 12, c: 'ts', a: 'start' }) + T((Ax + Cx) / 2 - 14, (Ay + Cy) / 2 - 6, lab[3], { fs: 12, c: 'ts', a: 'end' }), 'Configuration de Thalès dans un triangle');
    };
    /* e1 · plan à l’échelle */
    TR.c9e1a = R => {
      const n = pick(R, [50, 100, 200]), Lp = int(R, 3, 12), real3 = pick(R, [4, 5, 8, 10]);
      return Q('Lire un plan, pas à pas', `Le plan d’une salle de jeux vidéo est à l’échelle 1/${n} : 1 cm sur le plan représente ${n} cm en vrai.`, [
        { lab: `Longueur de la salle : ${Lp} cm sur le plan. En vrai, en cm`, v: Lp * n, d: 0, w: 12, x: `${Lp} × ${n} = ${fr(Lp * n)} cm`, err: [{ v: Lp / n, m: 'Du plan au réel, on multiplie par ' + n + '.' }] },
        { lab: 'La même longueur, en mètres', v: Lp * n / 100, d: 2, w: 12, x: `${fr(Lp * n)} cm ÷ 100 = ${fr(Lp * n / 100)} m`, err: [{ v: Lp * n, m: '1 m = 100 cm : divise par 100.' }] },
        { lab: `Un écran de ${real3} m : sa longueur sur le plan, en cm`, v: real3 * 100 / n, d: 2, a: fr(real3 * 100 / n), w: 12, x: `${real3} m = ${real3 * 100} cm ; ${real3 * 100} ÷ ${n} = ${fr(real3 * 100 / n)} cm`, err: [{ v: real3 * n, m: 'Du réel au plan, on divise par ' + n + ' (avec la même unité).' }] },
        { lab: 'Du plan au réel, on…', qcm: [`multiplie par ${n}`, `divise par ${n}`], ok: 0, x: `Une échelle 1/${n} signifie que le réel est ${n} fois plus grand : plan → réel : × ${n}.` }],
        ['Du plan au réel : × ' + n + '.', 'Du réel au plan : ÷ ' + n + ', avec la même unité.', '1 m = 100 cm.'],
        table(['', 'Sur le plan', 'En vrai'], [['Longueur de la salle', `${Lp} cm`, '?'], ['Un écran', '?', `${real3} m`]]) + AI('échelle 1/100 : 4 cm sur le plan font 4 × 100 = 400 cm = 4 m en vrai.'));
    };
    TR.c9e1d = R => {
      const n = pick(R, [50, 100, 200]), X = pick(R, [6, 8, 10, 12]), Y = pick(R, [4, 5, 6, 8]), lx = X * 100 / n, ly = Y * 100 / n;
      return Q('Retrouver l’échelle', `Une salle de ${X} m sur ${Y} m est dessinée sur un plan : la longueur mesure ${fr(lx)} cm sur le plan.`, [
        { lab: 'Échelle : 1 cm sur le plan représente combien de cm en vrai ?', v: n, d: 0, w: 12, x: `${X} m = ${X * 100} cm ; ${X * 100} ÷ ${fr(lx)} = ${n} : l’échelle est 1/${n}.`, err: [{ v: X, m: 'Convertis ' + X + ' m en cm avant de diviser.' }] },
        { lab: 'Largeur de la salle sur le plan, en cm', v: ly, d: 2, a: fr(ly), w: 12, x: `${Y} m = ${Y * 100} cm ; ${Y * 100} ÷ ${n} = ${fr(ly)} cm`, err: [{ v: Y * n, m: 'Du réel au plan, on divise par ' + n + '.' }] },
        { lab: 'Aire de la salle sur le plan, en cm²', v: lx * ly, d: 2, w: 12, a: fr(lx * ly), x: `${fr(lx)} × ${fr(ly)} = ${fr(lx * ly)} cm²` },
        { lab: 'Aire réelle de la salle, en m²', v: X * Y, d: 0, w: 12, x: `${X} × ${Y} = ${X * Y} m²` },
        { lab: 'L’aire réelle (en cm²) est ? fois plus grande que l’aire sur le plan', v: n * n, d: 0, w: 12, x: `${fr(X * Y * 10000)} cm² ÷ ${fr(lx * ly)} cm² = ${fr(n * n)} = ${n}² : une aire est multipliée par l’échelle au carré.`, err: [{ v: n, m: 'Pour une aire, le coefficient est élevé au carré : ' + n + '².' }] }],
        ['L’échelle : longueur réelle (en cm) ÷ longueur sur le plan.', 'Aire = longueur × largeur, avec les mesures du plan ou du réel.', 'Les aires sont multipliées par le carré du coefficient.'],
        table(['', 'Réel', 'Sur le plan'], [['Longueur', `${X} m`, `${fr(lx)} cm`], ['Largeur', `${Y} m`, '?']]));
    };
    /* e2 · agrandir ou réduire */
    TR.c9e2a = R => {
      const k = pick(R, [2, 3, .5]), Ln = pick(R, [6, 8, 10, 12]), A = pick(R, [20, 24, 30, 40]);
      return Q('Agrandir ou réduire, pas à pas', `On fabrique une figurine à partir d’un modèle de ${Ln} cm de haut, avec un coefficient k = ${fr(k)}.`, [
        { lab: 'Est-ce un agrandissement ou une réduction ?', qcm: ['agrandissement', 'réduction'], ok: k > 1 ? 0 : 1, x: `k = ${fr(k)} ${k > 1 ? '> 1 : agrandissement' : '< 1 : réduction'}.` },
        { lab: 'Hauteur de la figurine, en cm', v: Ln * k, d: 2, w: 12, x: `${Ln} × ${fr(k)} = ${fr(Ln * k)} cm`, err: [{ v: Ln / k, m: 'Les longueurs sont multipliées par k.' }] },
        { lab: 'Par quel nombre l’aire est-elle multipliée (k × k) ?', v: k * k, d: 2, w: 12, a: fr(k * k), x: `${fr(k)} × ${fr(k)} = ${fr(k * k)}`, err: [{ v: k, m: 'Une aire est multipliée par k², pas par k.' }] },
        { lab: `Aire à peindre : ${A} cm² sur le modèle. Aire sur la figurine, en cm²`, v: A * k * k, d: 2, w: 12, a: fr(A * k * k), x: `${A} × ${fr(k * k)} = ${fr(A * k * k)} cm²`, err: [{ v: A * k, m: 'Multiplie l’aire par k × k.' }] }],
        ['k plus grand que 1 : agrandissement ; plus petit que 1 : réduction.', 'Longueurs × k.', 'Aires × k × k.'],
        table(['', 'Modèle', 'Figurine'], [['Hauteur', `${Ln} cm`, '?'], ['Aire à peindre', `${A} cm²`, '?']]) + AI('k = 2 : une longueur de 5 cm devient 10 cm ; une aire de 10 cm² devient 10 × 4 = 40 cm².'));
    };
    TR.c9e2d = R => {
      const k = pick(R, [2, 3, .5, 1.5]), Ln = pick(R, [6, 8, 10, 12]), A = pick(R, [20, 24, 40, 80]), V = pick(R, [8, 16, 24, 40, 80, 120]);
      return Q('Longueur, aire et volume', `Coefficient k = ${fr(k)}. Le modèle mesure ${Ln} cm de haut, a une aire de ${A} cm² et un volume de ${V} cm³.`, [
        { lab: 'Hauteur de la nouvelle statue, en cm', v: Ln * k, d: 2, w: 12, x: `${Ln} × ${fr(k)} = ${fr(Ln * k)} cm` },
        { lab: 'Aire de la nouvelle statue, en cm²', v: A * k * k, d: 2, w: 12, a: fr(A * k * k), x: `${A} × ${fr(k)}² = ${A} × ${fr(k * k)} = ${fr(A * k * k)} cm²`, err: [{ v: A * k, m: 'Les aires sont multipliées par k².' }] },
        { lab: 'Par quel nombre le volume est-il multiplié (k × k × k) ?', v: k ** 3, d: 3, w: 12, a: fr(k ** 3), x: `${fr(k)}³ = ${fr(k ** 3)}`, err: [{ v: k * k, m: 'Un volume est multiplié par k³ (trois fois k).' }] },
        { lab: 'Volume de la nouvelle statue, en cm³', v: V * k ** 3, d: 2, w: 12, a: fr(V * k ** 3), x: `${V} × ${fr(k ** 3)} = ${fr(V * k ** 3)} cm³`, err: [{ v: V * k * k, m: 'Pour un volume, c’est k³, pas k².' }] },
        { lab: 'Si on double toutes les longueurs, le volume est multiplié par', qcm: ['2', '4', '8'], ok: 2, x: '2 × 2 × 2 = 8 : doubler les longueurs multiplie les volumes par 8.' }],
        ['Longueurs × k ; aires × k² ; volumes × k³.', 'k² = k × k et k³ = k × k × k.', 'Un volume est toujours multiplié plus que les longueurs quand k > 1.'], table(['', 'Modèle'], [['Hauteur', `${Ln} cm`], ['Aire', `${A} cm²`], ['Volume', `${V} cm³`]]));
    };
    /* e3 · Thalès */
    const thDat = R => { let AM, AB, BC, AC, AN; do { AB = int(R, 6, 15); AM = int(R, 2, AB - 2); BC = int(R, 4, 14); AC = int(R, 6, 15); AN = AM * AC / AB; } while (!Number.isInteger(AN * 2) || !Number.isInteger(BC * AM / AB * 2)); return { AM, AB, BC, AC, AN, MN: BC * AM / AB }; };
    TR.c9e3a = R => {
      const { AM, AB, BC, AC, AN, MN } = thDat(R);
      return Q('Thalès, pas à pas', 'M est sur [AB], N est sur [AC] et les droites (MN) et (BC) sont parallèles. Les longueurs sont en cm.', [
        { lab: 'Les deux droites parallèles sont', qcm: ['(MN) et (BC)', '(AM) et (AN)', '(MN) et (AB)'], ok: 0, x: 'L’énoncé le dit : (MN) et (BC) sont parallèles.' },
        { lab: 'Rapport AM/AB (petit triangle ÷ grand triangle)', v: AM / AB, d: 3, w: 14, a: `${AM}/${AB}`, x: `AM/AB = ${AM}/${AB}`, err: [{ v: AB / AM, m: 'Le rapport : petit triangle ÷ grand triangle, AM ÷ AB.' }] },
        { lab: 'MN, en cm (MN/BC = AM/AB)', v: MN, d: 1, w: 12, x: `MN = BC × AM ÷ AB = ${BC} × ${AM} ÷ ${AB} = ${fr(MN)}`, err: [{ v: BC * AB / AM, m: 'MN est plus court que BC : multiplie par le rapport AM/AB.' }] },
        { lab: 'AN, en cm (AN/AC = AM/AB)', v: AN, d: 1, w: 12, x: `AN = AC × AM ÷ AB = ${AC} × ${AM} ÷ ${AB} = ${fr(AN)}`, err: [{ v: AC * AB / AM, m: 'AN est plus court que AC : multiplie par le rapport AM/AB.' }] }],
        ['Le sommet commun des deux triangles est A.', 'Thalès : AM/AB = AN/AC = MN/BC.', 'Produit en croix : MN = BC × AM ÷ AB.'],
        thFig(AM, AB, BC, AC, [`AM = ${AM}`, `AB = ${AB}`, `BC = ${BC}`, `AC = ${AC}`]) + AI('AM = 2, AB = 6, BC = 9 : le rapport est 2/6 = 1/3 ; MN = 9 × 2 ÷ 6 = 3.'));
    };
    TR.c9e3d = R => {
      const [h1, o1] = pick(R, [[1.5, 2], [1.8, 1.2], [1.6, 2], [2, 2.5], [1.5, 1], [1.2, 1.6]]), o2 = pick(R, [8, 12, 16, 20]), hp = pick(R, [3, 6]), r = h1 / o1, [ar, ob] = pick(R, [['un arbre', 'l’arbre'], ['un pylône', 'le pylône'], ['un immeuble', 'l’immeuble']]);
      return Q('La hauteur par l’ombre', `Même moment : une personne de ${fr(h1)} m a une ombre de ${fr(o1)} m ; ${ar} a une ombre de ${fr(o2)} m. Rayons parallèles.`, [
        { lab: 'Rapport hauteur ÷ ombre de la personne', v: r, d: 2, w: 12, a: fr(r), x: `${fr(h1)} ÷ ${fr(o1)} = ${fr(r)}`, err: [{ v: rnd(o1 / h1, 2), m: 'Rapport hauteur ÷ ombre, dans cet ordre.' }] },
        { lab: `Hauteur de ${ob}, en m`, v: r * o2, d: 1, w: 12, a: fr(r * o2), x: `La hauteur est proportionnelle à l’ombre : ${fr(o2)} × ${fr(r)} = ${fr(r * o2)} m`, err: [{ v: rnd(o2 / r, 2), m: 'Multiplie l’ombre par le rapport hauteur ÷ ombre.' }] },
        { lab: `Ombre d’un poteau de ${hp} m au même moment, en m`, v: hp / r, d: 2, w: 12, a: fr(hp / r), x: `${hp} ÷ ${fr(r)} = ${fr(hp / r)} m`, err: [{ v: hp * r, m: 'Pour trouver l’ombre, divise la hauteur par le rapport.' }] },
        { lab: 'Les deux triangles (objet, ombre) sont…', qcm: ['des agrandissements l’un de l’autre', 'de formes différentes'], ok: 0, x: 'Les rayons sont parallèles : les triangles ont les mêmes angles. L’un est un agrandissement de l’autre.' }],
        ['Au même moment, hauteur ÷ ombre est le même pour tous les objets.', 'Hauteur = ombre × rapport.', 'Ombre = hauteur ÷ rapport.'],
        table(['', 'Hauteur', 'Ombre'], [['Personne', `${fr(h1)} m`, `${fr(o1)} m`], [ar[0].toUpperCase() + ar.slice(1), '?', `${fr(o2)} m`]]));
    };
    /* e4 · agrandir et réduire des longueurs */
    TR.c9e4a = R => {
      const k = pick(R, [2, 3, .5, .25]), L1 = pick(R, [20, 40, 60, 80]), M = pick(R, [12, 16, 24, 32]), ang = pick(R, [35, 40, 55, 70]);
      return Q('Un coefficient, pas à pas', `Une pièce de ${L1} cm est reproduite en ${k < 1 ? 'maquette' : 'plus grand'} : la longueur AB devient ${fr(L1 * k)} cm.`, [
        { lab: 'Coefficient k (longueur obtenue ÷ longueur de départ)', v: k, d: 2, w: 12, a: fr(k), x: `${fr(L1 * k)} ÷ ${L1} = ${fr(k)}`, err: [{ v: rnd(1 / k, 2), m: 'Divise la longueur obtenue par la longueur de départ.' }] },
        { lab: `Un segment CD de ${M} cm sur la pièce : sa longueur après la transformation, en cm`, v: M * k, d: 2, w: 12, a: fr(M * k), x: `${M} × ${fr(k)} = ${fr(M * k)} cm`, err: [{ v: M / k, m: 'Toutes les longueurs sont multipliées par k.' }] },
        { lab: `Un angle de ${ang}° sur la pièce mesure après la transformation (en °)`, v: ang, d: 0, w: 10, x: `Les angles ne changent pas : ${ang}°.`, err: [{ v: rnd(ang * k, 0), m: 'Les angles sont conservés.' }] },
        { lab: 'Cette transformation est…', qcm: ['un agrandissement', 'une réduction'], ok: k > 1 ? 0 : 1, x: `k = ${fr(k)} ${k > 1 ? '> 1 : agrandissement' : '< 1 : réduction'}.` }],
        ['k = longueur obtenue ÷ longueur de départ.', 'Toutes les longueurs sont multipliées par k ; les angles ne changent pas.', 'k > 1 : agrandissement. k < 1 : réduction.'],
        table(['', 'Longueur AB'], [['Pièce', `${L1} cm`], ['Après transformation', `${fr(L1 * k)} cm`]]) + AI('pièce de 10 cm devenue 5 cm : k = 5 ÷ 10 = 0,5 (réduction) ; un segment de 8 cm devient 8 × 0,5 = 4 cm.'));
    };
    TR.c9e4d = R => {
      const k = pick(R, [2, 4, .5, .25]), [L, l] = pick(R, [[8, 5], [12, 6], [10, 4], [16, 10]]), p = 2 * (L + l), A = L * l;
      return Q('Périmètre et aire d’un agrandissement', `Un rectangle de ${L} cm sur ${l} cm est transformé avec un coefficient k = ${fr(k)}.`, [
        { lab: 'Périmètre du rectangle de départ, en cm', v: p, d: 0, w: 10, x: `2 × (${L} + ${l}) = ${p} cm` },
        { lab: 'Périmètre du nouveau rectangle, en cm', v: p * k, d: 2, w: 12, a: fr(p * k), x: `Un périmètre est multiplié par k : ${p} × ${fr(k)} = ${fr(p * k)} cm`, err: [{ v: p * k * k, m: 'Un périmètre est une longueur : il est multiplié par k, pas par k².' }] },
        { lab: 'Aire du nouveau rectangle, en cm²', v: A * k * k, d: 2, w: 12, a: fr(A * k * k), x: `Les nouvelles dimensions sont ${fr(L * k)} et ${fr(l * k)} cm : ${fr(L * k)} × ${fr(l * k)} = ${fr(A * k * k)} cm² (aussi ${A} × ${fr(k)}²)`, err: [{ v: A * k, m: 'Une aire est multipliée par k², pas par k.' }] },
        { lab: 'Mesure d’un angle du nouveau rectangle, en °', v: 90, d: 0, w: 10, x: 'Les angles sont conservés : un angle droit reste un angle droit, 90°.' },
        { lab: 'Coefficient pour revenir du nouveau rectangle au rectangle de départ', v: 1 / k, d: 2, w: 12, a: fr(1 / k), x: `1 ÷ ${fr(k)} = ${fr(1 / k)}`, err: [{ v: k, m: 'Pour revenir en arrière, on utilise l’inverse : 1 ÷ k.' }] }],
        ['Périmètre : multiplié par k.', 'Aire : multipliée par k × k.', 'Les angles ne changent pas.'], table(['', 'Longueur', 'Largeur'], [['Rectangle de départ', `${L} cm`, `${l} cm`]]));
    };
  }
})(typeof module !== 'undefined' ? module.exports : window);
