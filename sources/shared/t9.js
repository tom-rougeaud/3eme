/* 3ème Série Pro · chapitre 9 — Échelles, agrandissements et réductions (longueurs, aires, volumes), théorème de Thalès. */
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
    return { titre: 'Le plan à l’échelle', consigne: `Le plan (fictif) d’une salle de jeux vidéo est à l’échelle 1/${n} : 1 cm sur le plan représente ${n} cm en vrai.`,
      support: table(['', 'Sur le plan', 'En vrai'], [['Longueur de la salle', `${L[0]} cm`, `a. ${tb('a', fr(r1), 12)} m`], ['Largeur de la salle', `${L[1]} cm`, `b. ${tb('b', fr(r2), 12)} m`], ['Un écran géant', `c. ${tb('c', fr(p3), 12)} cm`, `${real3} m`]]) + `<p class="tr-l">d. Aire réelle de la salle : ${tb('d', fr(rnd(r1 * r2, 2)), 14)} m²</p>`, items,
      hints: ['Du plan au réel : × ' + n + '.', 'Du réel au plan : ÷ ' + n + ', avec la même unité.', '1 m = 100 cm.'] };
  };

  /* e2 · agrandir ou réduire : longueurs, aires, volumes */
  TR.c9e2 = R => {
    const k = pick(R, [2, 3, 1.5, 0.5, 4]), Ln = pick(R, [6, 8, 10, 12]), A = pick(R, [20, 24, 30, 40]), V = pick(R, [50, 80, 100, 120]);
    const what = k > 1 ? 'agrandissement' : 'réduction';
    const items = [qcm('a', ['agrandissement', 'réduction'], k > 1 ? 0 : 1, `${what} : k ${k > 1 ? '>' : '<'} 1`), num('b', rnd(Ln * k, 2), 2, fr(rnd(Ln * k, 2)) + ' cm'), num('c', rnd(A * k * k, 2), 2, fr(rnd(A * k * k, 2)) + ' cm²', [{ v: rnd(A * k, 2), m: 'Une aire est multipliée par k² = ' + fr(k * k) + ', pas par k.' }]), num('d', rnd(V * k ** 3, 2), 2, fr(rnd(V * k ** 3, 2)) + ' cm³', [{ v: rnd(V * k, 2), m: 'Un volume est multiplié par k³ = ' + fr(k ** 3) + '.' }, { v: rnd(V * k * k, 2), m: 'Pour un volume, c’est k³, pas k².' }])];
    xs(items, { b: `${Ln} × ${fr(k)} = ${fr(rnd(Ln * k, 2))} cm`, c: `${A} × ${fr(k)}² = ${A} × ${fr(k * k)} = ${fr(rnd(A * k * k, 2))} cm²`, d: `${V} × ${fr(k)}³ = ${V} × ${fr(k ** 3)} = ${fr(rnd(V * k ** 3, 2))} cm³` });
    return { titre: 'Agrandir ou réduire', consigne: `On fabrique une figurine (fictive) à partir d’un modèle, avec un coefficient k = ${fr(k)}.`,
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
})(typeof module !== 'undefined' ? module.exports : window);
