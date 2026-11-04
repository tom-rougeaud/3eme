/* 3ème Prépa-Métiers · chapitre 10 — Espace et transformations : volumes (pavé, cylindre, cône, pyramide, boule),
   repérage sur la sphère (latitude, longitude), transformations (translation, symétrie, rotation, homothétie), Scratch. */
(function (root) {
  'use strict';
  const { DEP, TR, H } = typeof module !== 'undefined' ? require('./train.js').MCVT : root.MCVT;
  const { fr, rnd, tb, sb, T, svg, table, num, qcm, pick, int, xs } = H;
  const PI = Math.PI;

  /* point de départ : trois seaux de pop-corn, des cylindres */
  DEP.c10 = R => {
    const S = [['S', 12, 15], ['M', 16, 20], ['L', 20, 25]], k = int(R, 0, 2), V = S.map(([, d, h]) => PI * (d / 2) ** 2 * h);
    const doc = `<table class="dt tcx dt-sm"><thead><tr><th>Seau</th><th>Diamètre</th><th>Hauteur</th></tr></thead><tbody>${S.map(([t, d, h], i) => `<tr><th>${t}</th><td data-cell="${i}">${d} cm</td><td>${h} cm</td></tr>`).join('')}</tbody></table><p class="srcl">Seaux en forme de cylindre. V = π × r² × h.</p>`;
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
    return { titre: 'Les transformations du sprite', consigne: 'Dans un jeu en pixel art, le sprite de départ (foncé) est transformé trois fois. Reconnais chaque transformation.',
      support: svg(600, 12 + 9 * cs + 10, s, 'Un sprite et trois images transformées sur une grille') + `<p class="tr-l">a. A est obtenu par : · b. B par : · c. C par :</p><p class="tr-l">d. Pour la translation, de combien de cases le sprite a-t-il avancé ? ${tb('d', String(tx), 10)}</p>`, items,
      hints: ['Translation : le sprite glisse, sans tourner ni se retourner.', 'Symétrie axiale : le sprite est retourné, comme dans un miroir.', 'Rotation : le sprite a tourné d’un quart de tour.'] };
  };
  /* ===== exercices ajoutés : notions 2 (volume d’une boule) et 5 (boucle Scratch) ===== */
  {
    const { Q, fr, pick, int, table, svg, T, rnd, shuffle } = H, PI = Math.PI;
    TR.c10e4 = R => {
      const r = pick(R, [2, 3, 4, 5, 6, 7, 9, 10]), D = pick(R, [8, 10, 12, 14, 16, 18, 20]), r2 = D / 2;
      const V = 4 / 3 * PI * r ** 3, A = 4 * PI * r * r, P = 2 * PI * r, V2 = 4 / 3 * PI * r2 ** 3;
      const g = `<circle cx="150" cy="95" r="70" fill="#EEF2FB" stroke="#1D2240" stroke-width="2.4"/><ellipse cx="150" cy="95" rx="70" ry="18" fill="none" stroke="#1D2240" stroke-width="1.6" stroke-dasharray="5 4"/><line x1="150" y1="95" x2="220" y2="95" stroke="#B4501E" stroke-width="2.6"/><circle cx="150" cy="95" r="3.5" fill="#1D2240"/>` + T(186, 86, `r = ${r} cm`, { fs: 13, c: 'tx' }) + T(150, 186, 'une boule', { fs: 12, c: 'ts' });
      return Q('Volume d’une boule', `Une boule métallique a un rayon de ${r} cm. Utilise la touche π de la calculatrice et arrondis au dixième.`, [
        { lab: `r³ = ${r} × ${r} × ${r}`, v: r ** 3, d: 0, w: 14, x: `${r} × ${r} × ${r} = ${r ** 3}` },
        { lab: 'Volume de la boule, en cm³', v: rnd(V, 1), d: 1, w: 18, x: `V = 4/3 × π × r³ = 4/3 × π × ${r ** 3} ≈ ${fr(V, 1)} cm³`, err: [{ v: rnd(PI * r ** 3, 1), m: 'N’oublie pas le facteur 4/3 dans la formule du volume.' }, { v: rnd(4 / 3 * PI * r * r, 1), m: 'Le rayon est élevé au cube (r × r × r), pas au carré.' }] },
        { lab: 'Aire de la sphère (4 × π × r²), en cm²', v: rnd(A, 1), d: 1, w: 18, x: `4 × π × ${r}² = 4 × π × ${r * r} ≈ ${fr(A, 1)} cm²` },
        { lab: 'Périmètre d’un grand cercle (2 × π × r), en cm', v: rnd(P, 1), d: 1, w: 18, x: `2 × π × ${r} ≈ ${fr(P, 1)} cm` },
        { lab: `Une autre boule a un diamètre de ${D} cm : son rayon, en cm`, v: r2, d: 0, w: 14, x: `Le rayon est la moitié du diamètre : ${D} ÷ 2 = ${r2}`, err: [{ v: D, m: 'Le rayon est la moitié du diamètre.' }] },
        { lab: 'Le volume de cette autre boule, en cm³', v: rnd(V2, 1), d: 1, w: 18, x: `4/3 × π × ${r2}³ = 4/3 × π × ${r2 ** 3} ≈ ${fr(V2, 1)} cm³`, err: [{ v: rnd(4 / 3 * PI * D ** 3, 1), m: 'Utilise le rayon (la moitié du diamètre) dans la formule.' }] }],
        ['V = 4/3 × π × r × r × r.', 'L’aire de la sphère est 4 × π × r².', 'Le rayon est la moitié du diamètre.'], svg(300, 200, g, `Une boule de rayon ${r} cm`));
    };
    TR.c10e5 = R => {
      const n = pick(R, [3, 4, 5, 6, 8, 9, 10, 12]), L = pick(R, [30, 40, 50, 60]), m = pick(R, [5, 6, 8, 9, 10, 12].filter(x => x !== n)), a2 = pick(R, [60, 72, 90, 120]), n2 = 360 / a2;
      return Q('Une boucle Scratch', `Un script Scratch dessine une figure : « répéter ${n} fois : avancer de ${L} pas, tourner de ${rnd(360 / n, 2)} degrés ».`, [
        { lab: 'Nombre de côtés de la figure tracée', v: n, d: 0, w: 12, x: `La boucle répète ${n} fois « avancer » : la figure a ${n} côtés.` },
        { lab: 'Longueur totale parcourue par le lutin, en pas', v: n * L, d: 0, w: 14, x: `${n} × ${L} = ${n * L}`, err: [{ v: L, m: 'Le lutin avance de ' + L + ' pas à chaque répétition : multiplie par le nombre de répétitions.' }] },
        { lab: `Pour tracer un polygone régulier à ${m} côtés, on tourne à chaque coin de (en °)`, v: 360 / m, d: 2, w: 14, x: `360 ÷ ${m} = ${fr(360 / m)}°`, err: [{ v: 180 - 360 / m, m: 'Le lutin tourne de 360 ÷ nombre de côtés, pas de l’angle intérieur du polygone.' }] },
        { lab: `Un script fait tourner le lutin de ${a2}° à chaque coin : nombre de répétitions pour fermer la figure`, v: n2, d: 0, w: 12, x: `360 ÷ ${a2} = ${n2} répétitions`, err: [{ v: a2, m: 'Le nombre de répétitions est 360 divisé par l’angle de rotation.' }] },
        { lab: `Pour tracer un carré, il faut tourner à chaque coin de (en °)`, v: 90, d: 0, w: 12, x: '360 ÷ 4 = 90°' }],
        ['Une boucle « répéter n fois » répète n fois les mêmes blocs.', 'Pour un polygone régulier à n côtés, le lutin tourne de 360 ÷ n degrés à chaque coin.', 'La longueur totale = nombre de répétitions × longueur d’un côté.'],
        table(['Script Scratch', 'Valeur'], [['répéter', `${n} fois`], ['avancer de', `${L} pas`], ['tourner de', `${rnd(360 / n, 2) === 360 / n ? fr(360 / n, 0) : fr(360 / n, 2)} degrés`]]));
    };
  }
  /* ===== niveaux 🌱 guidé et 🚀 défi · chapitre 10 ===== */
  {
    const { Q, AI, shuffle } = H;
    const tolV = (g, ks) => { g.items.forEach(it => { if (ks.includes(it.k)) it.tol = .6; }); return g; };
    /* e1 · volumes */
    TR.c10e1a = R => {
      const a = int(R, 2, 6), b = int(R, 2, 5), c = int(R, 2, 6), r = pick(R, [2, 3, 4, 5]), h = pick(R, [4, 5, 6, 8, 10]), Vc = PI * r * r * h;
      return tolV(Q('Les volumes, pas à pas', 'Calcule chaque volume, arrondi au cm³. Utilise la touche π de la calculatrice.', [
        { lab: `Pavé de ${a} cm × ${b} cm × ${c} cm : volume, en cm³`, v: a * b * c, d: 0, w: 12, x: `${a} × ${b} × ${c} = ${a * b * c} cm³`, err: [{ v: a + b + c, m: 'Le volume d’un pavé se calcule en multipliant les trois dimensions.' }] },
        { lab: `Cylindre de rayon ${r} cm : aire de la base π × ${r}², en cm² (arrondie à l’unité)`, v: Math.round(PI * r * r), d: 0, w: 12, x: `π × ${r}² = π × ${r * r} ≈ ${fr(Math.round(PI * r * r))} cm²`, err: [{ v: Math.round(PI * r * 2), m: 'Le rayon est élevé au carré : r × r.' }] },
        { lab: `Cylindre de hauteur ${h} cm : volume π × ${r}² × ${h}, en cm³`, v: Math.round(Vc), d: 0, w: 12, x: `π × ${r}² × ${h} ≈ ${fr(Math.round(Vc))} cm³`, err: [{ v: Math.round(PI * (2 * r) ** 2 * h), m: 'Utilise le rayon, pas le diamètre.' }] },
        { lab: 'Un cône de même base et de même hauteur a un volume… fois plus petit', v: 3, d: 0, w: 10, x: 'Le volume d’un cône est le tiers de celui du cylindre de même base et de même hauteur.' },
        { lab: 'Volume de ce cône, en cm³', v: Math.round(Vc / 3), d: 0, w: 12, x: `Le tiers du cylindre : π × ${r}² × ${h} ÷ 3 ≈ ${fr(Math.round(Vc / 3))} cm³`, err: [{ v: Math.round(Vc), m: 'Le cône : on divise le volume du cylindre par 3.' }] }],
        ['Pavé : longueur × largeur × hauteur.', 'Cylindre : aire de la base (π × r²) × hauteur.', 'Cône : volume du cylindre ÷ 3.'],
        table(['Solide', 'Dimensions'], [['Pavé droit (boîte)', `${a} cm × ${b} cm × ${c} cm`], ['Cylindre (seau)', `rayon ${r} cm, hauteur ${h} cm`], ['Cône (cornet)', `rayon ${r} cm, hauteur ${h} cm`]]) + AI('cylindre de rayon 1 cm et de hauteur 2 cm : π × 1² × 2 ≈ 6 cm³ ; le cône de même base : 6 ÷ 3 = 2 cm³.')), ['c', 'e']);
    };
    TR.c10e1d = R => {
      const f1 = v => v.toFixed(1).replace('.', ',');
      const cb = []; [16, 20, 24].forEach(D => [20, 25, 30].forEach(H0 => [40, 60, 100, 150].forEach(B => { const L = PI * (D / 2) ** 2 * H0 / 1000; if (Math.ceil(B / L) === Math.ceil(B / rnd(L, 1)) && Math.abs(B / L - Math.round(B / L)) > .15) cb.push([D, H0, B]); })));
      const [D, H0, B] = cb[int(R, 0, cb.length - 1)], r = D / 2, V = PI * r * r * H0, Lt = V / 1000, nb = Math.ceil(B / Lt);
      return tolV(Q('La contenance d’un seau', `Un seau cylindrique a un diamètre de ${D} cm et une hauteur de ${H0} cm. On rappelle : 1 L = 1 000 cm³.`, [
        { lab: 'Rayon du seau, en cm', v: r, d: 0, w: 10, x: `${D} ÷ 2 = ${r} cm`, err: [{ v: D, m: 'Le rayon est la moitié du diamètre.' }] },
        { lab: 'Volume du seau, en cm³ (arrondi à l’unité)', v: Math.round(V), d: 0, w: 14, x: `π × ${r}² × ${H0} ≈ ${fr(Math.round(V))} cm³`, err: [{ v: Math.round(PI * D * D * H0), m: 'Utilise le rayon, pas le diamètre.' }] },
        { lab: 'Contenance du seau, en litres (au dixième)', v: rnd(Lt, 1), d: 1, w: 12, x: `${fr(Math.round(V))} cm³ ÷ 1 000 ≈ ${f1(rnd(Lt, 1))} L`, err: [{ v: Math.round(V), m: '1 L = 1 000 cm³ : divise par 1 000.' }] },
        { lab: `Nombre minimal de seaux pleins pour remplir un bac de ${B} L`, v: nb, d: 0, w: 10, x: `${B} ÷ ${f1(rnd(Lt, 1))} ≈ ${f1(rnd(B / Lt, 1))} : il faut ${nb} seaux (on arrondit au nombre entier supérieur).`, err: [{ v: Math.floor(B / Lt), m: 'Avec ce nombre de seaux, le bac n’est pas plein : arrondis au nombre entier supérieur.' }] }],
        ['Cylindre : π × r² × hauteur.', '1 L = 1 000 cm³.', 'Pour remplir un bac, arrondis au nombre entier de seaux supérieur.'], table(['Seau', 'Diamètre', 'Hauteur'], [['Cylindre', `${D} cm`, `${H0} cm`]])), ['b']);
    };
    /* e2 · se repérer sur la Terre */
    const VIL = [['Paris', 48.9, 2.3], ['Tokyo', 35.7, 139.7], ['New York', 40.7, -74], ['Rio de Janeiro', -22.9, -43.2], ['Sydney', -33.9, 151.2], ['Le Cap', -33.9, 18.4], ['Reykjavik', 64.1, -21.9]];
    const cgp = (la, lo) => `${fr(Math.abs(la))}° ${la >= 0 ? 'N' : 'S'} ; ${fr(Math.abs(lo))}° ${lo >= 0 ? 'E' : 'O'}`;
    TR.c10e2a = R => {
      const pairs = []; VIL.forEach((A, i) => VIL.forEach((B, j) => { if (i < j && A[1] * B[1] > 0) pairs.push([A, B]); }));
      const [A, B] = shuffle(R, pairs.length ? pairs[int(R, 0, pairs.length - 1)] : [VIL[0], VIL[1]]), north = A[1] > B[1] ? A : B;
      return Q('Se repérer sur la Terre, pas à pas', 'Coordonnées géographiques : latitude Nord ou Sud de l’équateur, longitude Est ou Ouest du méridien de Greenwich.', [
        { lab: `Dans quel hémisphère est ${A[0]} ?`, qcm: ['Nord', 'Sud'], ok: A[1] >= 0 ? 0 : 1, x: `${A[0]} : latitude ${A[1] >= 0 ? 'N' : 'S'}, donc hémisphère ${A[1] >= 0 ? 'Nord' : 'Sud'}.` },
        { lab: `${B[0]} est-elle à l’est ou à l’ouest de Greenwich ?`, qcm: ['Est', 'Ouest'], ok: B[2] >= 0 ? 0 : 1, x: `Longitude ${B[2] >= 0 ? 'E' : 'O'} : ${B[0]} est à l’${B[2] >= 0 ? 'est' : 'ouest'} de Greenwich.` },
        { lab: 'Quelle ville est la plus au nord ?', qcm: [A[0], B[0]], ok: north === A ? 0 : 1, x: `${fr(Math.abs(A[1]))}° ${A[1] >= 0 ? 'N' : 'S'} et ${fr(Math.abs(B[1]))}° ${B[1] >= 0 ? 'N' : 'S'} : ${north[0]} est la plus au nord.` },
        { lab: `Écart de latitude entre ${A[0]} et ${B[0]}, en degrés`, v: rnd(Math.abs(A[1] - B[1]), 1), d: 1, w: 12, x: `Même hémisphère : on soustrait. ${fr(Math.abs(Math.max(Math.abs(A[1]), Math.abs(B[1]))))} − ${fr(Math.min(Math.abs(A[1]), Math.abs(B[1])))} = ${fr(rnd(Math.abs(A[1] - B[1]), 1))}°`, err: [{ v: rnd(Math.abs(A[1]) + Math.abs(B[1]), 1), m: 'Les deux villes sont dans le même hémisphère : on soustrait.' }] }],
        ['N : au nord de l’équateur ; S : au sud.', 'E : à l’est de Greenwich ; O : à l’ouest.', 'Même hémisphère : on soustrait les latitudes.'],
        table(['Ville', 'Latitude ; longitude'], [[A[0], cgp(A[1], A[2])], [B[0], cgp(B[1], B[2])]]) + AI('Tokyo (35,7° N ; 139,7° E) : N = au nord de l’équateur, E = à l’est de Greenwich.'));
    };
    TR.c10e2d = R => {
      const pairs = []; VIL.forEach((A, i) => VIL.forEach((B, j) => { if (i < j) { const e = A[2] * B[2] < 0 ? Math.abs(A[2]) + Math.abs(B[2]) : Math.abs(Math.abs(A[2]) - Math.abs(B[2])); if (e <= 180 && e >= 15) pairs.push([A, B, e]); } }));
      const [A, B, ec] = pairs[int(R, 0, pairs.length - 1)], est = A[2] > B[2] ? A : B, ouest = est === A ? B : A, e1 = rnd(ec, 1);
      return Q('Longitudes et décalage horaire', 'La Terre fait un tour (360°) en 24 h : elle tourne de 15° par heure. Plus on va vers l’est, plus il est tard.', [
        { lab: `Écart de longitude entre ${A[0]} et ${B[0]}, en degrés`, v: e1, d: 1, w: 12, x: A[2] * B[2] < 0 ? `Longitudes de part et d’autre de Greenwich : on additionne ${fr(Math.abs(A[2]))} + ${fr(Math.abs(B[2]))} = ${fr(e1)}°` : `Même côté de Greenwich : on soustrait ${fr(Math.max(Math.abs(A[2]), Math.abs(B[2])))} − ${fr(Math.min(Math.abs(A[2]), Math.abs(B[2])))} = ${fr(e1)}°`, err: [{ v: rnd(Math.abs(Math.abs(A[2]) - Math.abs(B[2])), 1), m: 'Si les villes sont de part et d’autre de Greenwich (E et O), on additionne les longitudes.' }, { v: rnd(Math.abs(A[2]) + Math.abs(B[2]), 1), m: 'Si les villes sont du même côté de Greenwich, on soustrait les longitudes.' }] },
        { lab: 'Décalage horaire théorique, en heures (au dixième)', v: rnd(ec / 15, 1), d: 1, w: 12, x: `${fr(e1)} ÷ 15 ≈ ${fr(rnd(ec / 15, 1))} h`, err: [{ v: e1, m: 'La Terre tourne de 15° par heure : divise l’écart par 15.' }] },
        { lab: 'Quelle ville est la plus à l’est ?', qcm: [A[0], B[0]], ok: est === A ? 0 : 1, x: `${est[0]} (${fr(Math.abs(est[2]))}° ${est[2] >= 0 ? 'E' : 'O'}) est plus à l’est que ${ouest[0]} (${fr(Math.abs(ouest[2]))}° ${ouest[2] >= 0 ? 'E' : 'O'}).` },
        { lab: `Quand il est midi à ${ouest[0]}, à ${est[0]} il est…`, qcm: ['plus de midi', 'moins de midi'], ok: 0, x: `${est[0]} est plus à l’est : le soleil s’y lève plus tôt, il y est plus tard qu’à ${ouest[0]}.` }],
        ['Même côté de Greenwich : on soustrait. De part et d’autre : on additionne.', 'Décalage horaire = écart de longitude ÷ 15.', 'À l’est, il est plus tard.'],
        table(['Ville', 'Latitude ; longitude'], [[A[0], cgp(A[1], A[2])], [B[0], cgp(B[1], B[2])]]));
    };
    /* e3 · transformations du sprite */
    const SP = [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2], [1, 3], [0, 3]];
    const spFig = (kinds, tx) => {
      const cs = 22, G = (x, y, cls) => `<rect x="${20 + x * cs}" y="${12 + y * cs}" width="${cs}" height="${cs}" class="${cls} ks" stroke-width="1"/>`;
      let s = ''; for (let i = 0; i < 25; i++) for (let j = 0; j < 9; j++) s += `<rect x="${20 + i * cs}" y="${12 + j * cs}" width="${cs}" height="${cs}" fill="none" stroke="#DCE2F2" stroke-width="1"/>`;
      const base = SP.map(([x, y]) => [x + 1, y + 2]);
      s += base.map(([x, y]) => G(x, y, 'k')).join('') + T(20 + 2.5 * cs, 12 + 7.6 * cs, 'départ', { fs: 12, c: 'ts' });
      const zones = { translation: base.map(([x, y]) => [x + tx, y]), 'symétrie axiale': base.map(([x, y]) => [15 - x, y]), rotation: base.map(([x, y]) => [24 - y, x + 1]) };
      kinds.forEach(k => { s += zones[k].map(([x, y]) => G(x, y, 'k2')).join(''); });
      kinds.forEach((k, i) => { const p = zones[k], mx = Math.max(...p.map(q => q[0])), my = Math.min(...p.map(q => q[1])); s += T(20 + (mx + 1.4) * cs, 12 + (my + .7) * cs, 'ABC'[i], { fs: 15, c: 'kt' }); });
      return svg(600, 12 + 9 * cs + 10, s, 'Un sprite et ses images transformées sur une grille');
    };
    const NAT = ['translation', 'symétrie axiale', 'rotation'];
    TR.c10e3a = R => {
      const tx = int(R, 3, 8), order = shuffle(R, ['translation', 'symétrie axiale']);
      return Q('Reconnaître une transformation, pas à pas', 'Dans un jeu en pixel art, le sprite de départ (foncé) est transformé deux fois : on obtient les images A et B.', [
        { lab: 'A est obtenue par une', qcm: NAT, ok: NAT.indexOf(order[0]), x: order[0] === 'translation' ? 'Le sprite a glissé, sans tourner ni se retourner : translation.' : 'Le sprite est retourné comme dans un miroir : symétrie axiale.' },
        { lab: 'B est obtenue par une', qcm: NAT, ok: NAT.indexOf(order[1]), x: order[1] === 'translation' ? 'Le sprite a glissé, sans tourner ni se retourner : translation.' : 'Le sprite est retourné comme dans un miroir : symétrie axiale.' },
        { lab: 'Dans la translation, de combien de cases le sprite a-t-il avancé ?', v: tx, d: 0, w: 10, x: `Chaque case a avancé de ${tx} cases vers la droite.`, err: [{ v: tx + 1, m: 'Compte les cases entre une case du départ et la même case de l’image.' }] },
        { lab: 'Dans une translation, la figure est-elle retournée ?', qcm: ['oui', 'non'], ok: 1, x: 'Une translation fait glisser la figure : elle n’est ni retournée ni tournée.' }],
        ['Translation : le sprite glisse, sans tourner ni se retourner.', 'Symétrie axiale : le sprite est retourné, comme dans un miroir.', 'Pour compter un déplacement, compare une même case avant et après.'],
        spFig(order, tx) + AI('si une case passe de la colonne 2 à la colonne 6, le sprite a avancé de 6 − 2 = 4 cases.'));
    };
    TR.c10e3d = R => {
      const tx = int(R, 3, 8), order = shuffle(R, NAT);
      return Q('Trois transformations du sprite', 'Dans un jeu en pixel art, le sprite de départ (foncé) est transformé trois fois. Reconnais chaque transformation.', [
        ...order.map((k, i) => ({ lab: `${'ABC'[i]} est obtenue par une`, qcm: NAT, ok: NAT.indexOf(k), x: { translation: 'Le sprite a glissé sans tourner ni se retourner : translation.', 'symétrie axiale': 'Le sprite est retourné comme dans un miroir : symétrie axiale.', rotation: 'Le sprite a tourné d’un quart de tour : rotation.' }[k] })),
        { lab: 'On refait deux fois la même translation : le sprite avance en tout de (cases)', v: 2 * tx, d: 0, w: 10, x: `Une translation avance de ${tx} cases ; deux translations : 2 × ${tx} = ${2 * tx} cases.`, err: [{ v: tx, m: 'La translation est répétée deux fois.' }] },
        { lab: 'La rotation est un… de tour', qcm: ['huitième', 'quart', 'demi'], ok: 1, x: 'Le sprite a tourné de 90°, c’est un quart de tour.' }],
        ['Translation : le sprite glisse.', 'Symétrie axiale : le sprite est retourné comme dans un miroir.', 'Rotation : le sprite a tourné ; 90° = un quart de tour.'], spFig(order, tx));
    };
    /* e4 · volume d’une boule */
    TR.c10e4a = R => {
      const r = pick(R, [2, 3, 4, 5, 6]), V = 4 / 3 * PI * r ** 3, D = pick(R, [8, 10, 12, 14, 16]);
      const g = `<circle cx="150" cy="95" r="70" fill="#EEF2FB" stroke="#1D2240" stroke-width="2.4"/><ellipse cx="150" cy="95" rx="70" ry="18" fill="none" stroke="#1D2240" stroke-width="1.6" stroke-dasharray="5 4"/><line x1="150" y1="95" x2="220" y2="95" stroke="#B4501E" stroke-width="2.6"/><circle cx="150" cy="95" r="3.5" fill="#1D2240"/>` + T(186, 86, `r = ${r} cm`, { fs: 13, c: 'tx' }) + T(150, 186, 'une boule', { fs: 12, c: 'ts' });
      return Q('Le volume d’une boule, pas à pas', `Une boule métallique a un rayon de ${r} cm. Volume d’une boule : 4/3 × π × r × r × r. Arrondis au dixième.`, [
        { lab: `r × r × r = ${r} × ${r} × ${r}`, v: r ** 3, d: 0, w: 12, x: `${r} × ${r} × ${r} = ${r ** 3}`, err: [{ v: r * r, m: 'Le rayon est multiplié trois fois : r × r × r.' }] },
        { lab: `4 × π × ${r ** 3}`, v: rnd(4 * PI * r ** 3, 1), d: 1, w: 14, x: `4 × π × ${r ** 3} ≈ ${fr(rnd(4 * PI * r ** 3, 1))}`, err: [{ v: rnd(PI * r ** 3, 1), m: 'N’oublie pas le facteur 4.' }] },
        { lab: 'Volume de la boule (le résultat précédent ÷ 3), en cm³', v: rnd(V, 1), d: 1, w: 14, x: `${fr(rnd(4 * PI * r ** 3, 1))} ÷ 3 ≈ ${fr(rnd(V, 1))} cm³`, err: [{ v: rnd(4 * PI * r ** 3, 1), m: 'Divise par 3 : le volume est 4/3 × π × r³.' }] },
        { lab: `Une autre boule a un diamètre de ${D} cm : son rayon, en cm`, v: D / 2, d: 0, w: 12, x: `${D} ÷ 2 = ${D / 2}`, err: [{ v: D, m: 'Le rayon est la moitié du diamètre.' }] },
        { lab: 'Le volume d’une boule s’exprime en', qcm: ['cm³', 'cm²', 'cm'], ok: 0, x: 'Un volume s’exprime en unités cubes : cm³.' }],
        ['r³ = r × r × r.', 'V = 4/3 × π × r³ : multiplie par 4, par π, puis divise par 3.', 'Le rayon est la moitié du diamètre.'], svg(300, 200, g, `Une boule de rayon ${r} cm`) + AI('rayon 1 cm : r³ = 1 ; 4 × π × 1 ≈ 12,6 ; 12,6 ÷ 3 ≈ 4,2 cm³.'));
    };
    TR.c10e4d = R => {
      const r = pick(R, [2, 3, 4, 5, 6, 7, 8, 9, 10]), Vb = 4 / 3 * PI * r ** 3, Vc = (2 * r) ** 3, Vv = Vc - Vb, pc = Vb / Vc * 100;
      return Q('Une boule dans un cube', `Une boule de rayon ${r} cm est placée dans une boîte cubique qu’elle touche sur toutes ses faces.`, [
        { lab: 'Arête du cube, en cm', v: 2 * r, d: 0, w: 10, x: `L’arête est égale au diamètre de la boule : 2 × ${r} = ${2 * r} cm.`, err: [{ v: r, m: 'L’arête du cube est le diamètre de la boule, pas son rayon.' }] },
        { lab: 'Volume du cube, en cm³', v: Vc, d: 0, w: 12, x: `${2 * r}³ = ${fr(Vc)} cm³`, err: [{ v: (2 * r) ** 2, m: 'Le volume d’un cube : arête × arête × arête.' }] },
        { lab: 'Volume de la boule, en cm³ (au dixième)', v: rnd(Vb, 1), d: 1, w: 14, x: `4/3 × π × ${r}³ ≈ ${fr(rnd(Vb, 1))} cm³` },
        { lab: 'Volume vide dans la boîte, en cm³ (au dixième)', v: rnd(Vv, 1), d: 1, w: 14, x: `${fr(Vc)} − ${fr(rnd(Vb, 1))} ≈ ${fr(rnd(Vv, 1))} cm³`, err: [{ v: rnd(Vb, 1), m: 'Le volume vide = volume du cube − volume de la boule.' }] },
        { lab: 'Part de la boîte occupée par la boule, en % (au dixième)', v: rnd(pc, 1), d: 1, w: 12, x: `${fr(rnd(Vb, 1))} ÷ ${fr(Vc)} × 100 ≈ ${fr(rnd(pc, 1))} %`, err: [{ v: rnd(Vv / Vc * 100, 1), m: 'On cherche la part occupée par la boule, pas la part vide.' }] },
        { lab: 'Si on double le rayon de la boule, son volume est multiplié par', qcm: ['2', '4', '8'], ok: 2, x: 'Un volume est multiplié par k³ : 2 × 2 × 2 = 8.' }],
        ['L’arête du cube est égale au diamètre de la boule.', 'Boule : 4/3 × π × r³ ; cube : arête³.', 'Part occupée = volume de la boule ÷ volume du cube × 100.'], table(['Solide', 'Dimension'], [['Boule', `rayon ${r} cm`], ['Cube', 'arête = diamètre de la boule']]));
    };
    /* e5 · boucle Scratch */
    TR.c10e5a = R => {
      const n = pick(R, [3, 4, 5, 6, 8, 9, 10, 12]), L = pick(R, [30, 40, 50, 60]);
      return Q('Une boucle Scratch, pas à pas', `Un script Scratch fait « répéter ${n} fois : avancer de ${L} pas, tourner de ${fr(360 / n)} degrés ».`, [
        { lab: 'Nombre de côtés de la figure tracée', v: n, d: 0, w: 10, x: `La boucle répète ${n} fois « avancer » : ${n} côtés.` },
        { lab: 'Longueur totale parcourue par le lutin, en pas', v: n * L, d: 0, w: 12, x: `${n} × ${L} = ${n * L}`, err: [{ v: L, m: 'Il avance de ' + L + ' pas à chaque répétition : multiplie par ' + n + '.' }] },
        { lab: `Angle total tourné après ${n} répétitions (${n} × ${fr(360 / n)}), en degrés`, v: 360, d: 0, w: 10, x: `${n} × ${fr(360 / n)} = 360 : le lutin a fait un tour complet.`, err: [{ v: 180, m: 'Calcule ' + n + ' × ' + fr(360 / n) + '.' }] },
        { lab: 'Pour tracer un carré, le lutin tourne à chaque coin de (en °)', qcm: ['45°', '90°', '180°'], ok: 1, x: '360 ÷ 4 = 90° : un carré a quatre coins de 90°.' }],
        ['Une boucle « répéter n fois » répète n fois les mêmes blocs.', 'Pour fermer la figure, le lutin fait un tour complet : 360° au total.', 'Longueur totale = nombre de répétitions × longueur d’un côté.'],
        table(['Script Scratch', 'Valeur'], [['répéter', `${n} fois`], ['avancer de', `${L} pas`], ['tourner de', `${fr(360 / n)} degrés`]]) + AI('répéter 4 fois (avancer de 50, tourner de 90°) : 4 côtés, 4 × 50 = 200 pas, 4 × 90 = 360° : c’est un carré.'));
    };
    TR.c10e5d = R => {
      const A = pick(R, [120, 90, 72, 60, 45, 40, 36, 30]), n = 360 / A, L = pick(R, [20, 30, 40, 50]);
      const NOM = { 3: 'triangle équilatéral', 4: 'carré', 5: 'pentagone régulier', 6: 'hexagone régulier', 8: 'octogone régulier', 9: 'ennéagone régulier', 10: 'décagone régulier', 12: 'dodécagone régulier' };
      const all = Object.values(NOM), others = shuffle(R, all.filter(v => v !== NOM[n])).slice(0, 2), ch = shuffle(R, [NOM[n], ...others]);
      return Q('Quelle figure le script trace-t-il ?', `Script répété : « avancer de ${L} pas, tourner de ${A} degrés ». Combien de répétitions ferment la figure ?`, [
        { lab: `Nombre de répétitions pour fermer la figure (360 ÷ ${A})`, v: n, d: 0, w: 10, x: `360 ÷ ${A} = ${n} répétitions`, err: [{ v: A, m: 'Divise 360 par l’angle de rotation.' }] },
        { lab: 'Périmètre de la figure, en pas', v: n * L, d: 0, w: 12, x: `${n} × ${L} = ${n * L} pas`, err: [{ v: L, m: 'Il y a ' + n + ' côtés de ' + L + ' pas.' }] },
        { lab: 'La figure tracée est un', qcm: ch, ok: ch.indexOf(NOM[n]), x: `${n} côtés égaux et ${n} angles égaux : c’est un ${NOM[n]}.` },
        { lab: 'Angle intérieur de la figure, en degrés (180 − angle de rotation)', v: 180 - A, d: 0, w: 12, x: `180 − ${A} = ${180 - A}°`, err: [{ v: A, m: 'L’angle intérieur est 180° moins l’angle dont le lutin tourne.' }] }],
        ['Pour fermer la figure, le lutin tourne de 360° au total.', 'Nombre de côtés = 360 ÷ angle de rotation.', 'Angle intérieur = 180° − angle de rotation.'],
        table(['Script Scratch', 'Valeur'], [['avancer de', `${L} pas`], ['tourner de', `${A} degrés`]]));
    };
  }
})(typeof module !== 'undefined' ? module.exports : window);
