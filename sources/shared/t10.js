/* 3ème Série Pro · chapitre 10 — Espace et transformations : volumes (pavé, cylindre, cône, pyramide, boule),
   repérage sur la sphère (latitude, longitude), transformations (translation, symétrie, rotation, homothétie), Scratch. */
(function (root) {
  'use strict';
  const { DEP, TR, H } = typeof module !== 'undefined' ? require('./train.js').MCVT : root.MCVT;
  const { fr, rnd, tb, sb, T, svg, table, num, qcm, pick, int, xs } = H;
  const PI = Math.PI;

  /* point de départ : trois seaux de pop-corn (fictifs), des cylindres */
  DEP.c10 = R => {
    const S = [['S', 12, 15], ['M', 16, 20], ['L', 20, 25]], k = int(R, 0, 2), V = S.map(([, d, h]) => PI * (d / 2) ** 2 * h);
    const doc = `<table class="dt tcx dt-sm"><thead><tr><th>Seau</th><th>Diamètre</th><th>Hauteur</th></tr></thead><tbody>${S.map(([t, d, h], i) => `<tr><th>${t}</th><td data-cell="${i}">${d} cm</td><td>${h} cm</td></tr>`).join('')}</tbody></table><p class="srcl">Seaux fictifs, en forme de cylindre. V = π × r² × h.</p>`;
    return { titre: 'Les seaux de pop-corn', doc,
      qs: [{ t: `Touche le diamètre du seau ${S[k][0]}.`, kind: 'tap', cell: String(k), v: S[k][1], tol: .01, a: S[k][1] + ' cm' },
        { t: 'Quel est le rayon du seau L ?', kind: 'num', v: 10, tol: .01, a: '10 cm', x: '20 ÷ 2 = 10 cm' },
        { t: 'Volume du seau L, en cm³, arrondi à l’unité ?', kind: 'num', v: Math.round(V[2]), tol: .6, a: fr(Math.round(V[2])) + ' cm³', x: `π × 10² × 25 ≈ ${fr(Math.round(V[2]))} cm³` },
        { t: 'Et en litres, au dixième ?', kind: 'num', v: rnd(V[2] / 1000, 1), tol: .06, a: fr(rnd(V[2] / 1000, 1)) + ' L', x: '1 L = 1 000 cm³' },
        { t: 'Le seau M contient-il deux fois plus que le seau S ?', kind: 'qcm', choices: ['plus de deux fois', 'exactement deux fois', 'moins de deux fois'], ok: 0, a: `plus de deux fois : ${fr(Math.round(V[1]))} cm³ contre ${fr(Math.round(V[0]))} cm³`, x: `${fr(Math.round(V[1]))} ÷ ${fr(Math.round(V[0]))} ≈ ${fr(rnd(V[1] / V[0], 2))}` }] };
  };

  /* e1 · les volumes */
  TR.c10e1 = R => {
    const a = int(R, 4, 12), b = int(R, 3, 8), c = int(R, 2, 10), r = int(R, 3, 9), h = int(R, 5, 15), rb = int(R, 4, 12);
    const Vp = a * b * c, Vc = PI * r * r * h, Vk = Vc / 3, Vb = 4 / 3 * PI * rb ** 3;
    const items = [num('a', Vp, 0, fr(Vp) + ' cm³'), num('b', Math.round(Vc), 0, fr(Math.round(Vc)) + ' cm³', [{ v: Math.round(PI * (2 * r) ** 2 * h), m: 'Utilise le rayon, pas le diamètre.' }, { v: Math.round(2 * PI * r * h), m: 'π × r² : le rayon est au carré.' }]), num('c', Math.round(Vk), 0, fr(Math.round(Vk)) + ' cm³', [{ v: Math.round(Vc), m: 'Le cône : on divise le volume du cylindre par 3.' }]), num('d', Math.round(Vb), 0, fr(Math.round(Vb)) + ' cm³')];
    items.forEach(it => { it.tol = .6; });
    xs(items, { a: `${a} × ${b} × ${c} = ${fr(Vp)} cm³`, b: `π × ${r}² × ${h} ≈ ${fr(Math.round(Vc))} cm³`, c: `π × ${r}² × ${h} ÷ 3 ≈ ${fr(Math.round(Vk))} cm³`, d: `4/3 × π × ${rb}³ ≈ ${fr(Math.round(Vb))} cm³` });
    return { titre: 'Les volumes', consigne: 'Calcule chaque volume, arrondi au cm³. Utilise la touche π de la calculatrice.',
      support: table(['Solide', 'Dimensions', 'Volume (cm³)'], [['Pavé droit (boîte)', `${a} cm × ${b} cm × ${c} cm`, `a. ${tb('a', fr(Vp), 14)}`], ['Cylindre (seau)', `rayon ${r} cm, hauteur ${h} cm`, `b. ${tb('b', fr(Math.round(Vc)), 14)}`], ['Cône (cornet)', `rayon ${r} cm, hauteur ${h} cm`, `c. ${tb('c', fr(Math.round(Vk)), 14)}`], ['Boule (ballon)', `rayon ${rb} cm`, `d. ${tb('d', fr(Math.round(Vb)), 14)}`]]), items,
      hints: ['Pavé : L × l × h. Cylindre : π × r² × h.', 'Cône : π × r² × h ÷ 3.', 'Boule : 4/3 × π × r³.'] };
  };

  /* e2 · se repérer sur la sphère terrestre */
  const VILLES = [['Paris', 48.9, 2.3], ['Tokyo', 35.7, 139.7], ['New York', 40.7, -74], ['Rio de Janeiro', -22.9, -43.2], ['Sydney', -33.9, 151.2], ['Le Cap', -33.9, 18.4], ['Reykjavik', 64.1, -21.9]];
  const cg = (la, lo) => `${fr(Math.abs(la))}° ${la >= 0 ? 'N' : 'S'} ; ${fr(Math.abs(lo))}° ${lo >= 0 ? 'E' : 'O'}`;
  TR.c10e2 = R => {
    const vs = H.shuffle(R, VILLES).slice(0, 3), [A, B, C] = vs, nN = vs.filter(v => v[1] >= 0).length;
    const north = vs.slice().sort((x, y) => y[1] - x[1])[0], dLon = rnd(Math.abs(A[2] - B[2]), 1);
    const items = [qcm('a', ['Nord', 'Sud'], A[1] >= 0 ? 0 : 1, `${A[0]} : hémisphère ${A[1] >= 0 ? 'Nord' : 'Sud'} (latitude ${A[1] >= 0 ? 'N' : 'S'})`), qcm('b', ['Est', 'Ouest'], B[2] >= 0 ? 0 : 1, `${B[0]} : à l’${B[2] >= 0 ? 'est' : 'ouest'} de Greenwich`), qcm('c', vs.map(v => v[0]), vs.indexOf(north), `${north[0]} : c’est la ville la plus au nord`), num('d', dLon, 1, fr(dLon) + '°', [{ v: rnd(Math.abs(Math.abs(A[2]) - Math.abs(B[2])), 1), m: 'Attention aux longitudes de part et d’autre de Greenwich : on additionne.' }])];
    xs(items, { d: `écart de longitude entre ${A[0]} et ${B[0]} : ${A[2] * B[2] < 0 ? `${fr(Math.abs(A[2]))} + ${fr(Math.abs(B[2]))}` : `${fr(Math.max(Math.abs(A[2]), Math.abs(B[2])))} − ${fr(Math.min(Math.abs(A[2]), Math.abs(B[2])))}`} = ${fr(dLon)}°` });
    return { titre: 'Se repérer sur la Terre', consigne: 'Coordonnées géographiques (arrondies au dixième) : latitude Nord ou Sud de l’équateur, longitude Est ou Ouest du méridien de Greenwich.',
      support: table(['Ville', 'Latitude ; longitude'], vs.map(v => [v[0], cg(v[1], v[2])])) + `<p class="tr-l">a. Dans quel hémisphère est ${A[0]} ? · b. ${B[0]} est-elle à l’est ou à l’ouest de Greenwich ?</p><p class="tr-l">c. Quelle ville est la plus au nord ? · d. Écart de longitude entre ${A[0]} et ${B[0]} : ${tb('d', fr(dLon), 12)}°</p>`, items,
      hints: ['N : au nord de l’équateur ; S : au sud.', 'E : à l’est de Greenwich ; O : à l’ouest.', 'De part et d’autre de Greenwich, on additionne les longitudes.'] };
  };

  /* e3 · les transformations d’un sprite en pixel art */
  const SPR = [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2], [1, 3], [0, 3]]; // un petit vaisseau (cases d’une grille)
  TR.c10e3 = R => {
    const cs = 22, G = (x, y, cls) => `<rect x="${20 + x * cs}" y="${12 + y * cs}" width="${cs}" height="${cs}" class="${cls} ks" stroke-width="1"/>`;
    let s = ''; for (let i = 0; i < 25; i++) for (let j = 0; j < 9; j++) s += `<rect x="${20 + i * cs}" y="${12 + j * cs}" width="${cs}" height="${cs}" fill="none" stroke="#DCE2F2" stroke-width="1"/>`;
    const tx = int(R, 4, 6), order = H.shuffle(R, ['translation', 'symétrie axiale', 'rotation']);
    const base = SPR.map(([x, y]) => [x + 1, y + 2]);
    s += base.map(([x, y]) => G(x, y, 'k')).join('') + T(20 + 2.5 * cs, 12 + 7.6 * cs, 'départ', { fs: 12, c: 'ts' });
    const lab = ['A', 'B', 'C'];
    // on place chaque image dans une zone : translation à côté, symétrie plus loin, rotation au bout
    const zones = { translation: base.map(([x, y]) => [x + tx, y]), 'symétrie axiale': base.map(([x, y]) => [15 - x, y]), rotation: base.map(([x, y]) => [24 - y, x + 1]) };
    order.forEach((k, i) => { const pts = zones[k]; s += pts.map(([x, y]) => G(x, y, 'k2')).join(''); });
    const lp = k => { const p = zones[k]; const mx = Math.max(...p.map(q => q[0])), my = Math.min(...p.map(q => q[1])); return [mx, my]; };
    order.forEach((k, i) => { const [mx, my] = lp(k); s += T(20 + (mx + 1.4) * cs, 12 + (my + .7) * cs, lab[i], { fs: 15, c: 'kt' }); });
    const items = order.map((k, i) => qcm('abc'[i], ['translation', 'symétrie axiale', 'rotation'], ['translation', 'symétrie axiale', 'rotation'].indexOf(k), k));
    items.push(num('d', tx, 0, String(tx), [{ v: tx + 1, m: 'Compte les cases entre une case du départ et la même case de l’image.' }]));
    xs(items, { d: `chaque case avance de ${tx} cases vers la droite` });
    return { titre: 'Les transformations du sprite', consigne: 'Dans un jeu en pixel art (fictif), le sprite de départ (foncé) est transformé trois fois. Reconnais chaque transformation.',
      support: svg(600, 12 + 9 * cs + 10, s, 'Un sprite et trois images transformées sur une grille') + `<p class="tr-l">a. A est obtenu par : · b. B par : · c. C par :</p><p class="tr-l">d. Pour la translation, de combien de cases le sprite a-t-il avancé ? ${tb('d', String(tx), 10)}</p>`, items,
      hints: ['Translation : le sprite glisse, sans tourner ni se retourner.', 'Symétrie axiale : le sprite est retourné, comme dans un miroir.', 'Rotation : le sprite a tourné d’un quart de tour.'] };
  };
})(typeof module !== 'undefined' ? module.exports : window);
