/* 3ème Série Pro · chapitre 8 — Théorème de Pythagore, réciproque, trigonométrie (cosinus, sinus, tangente). */
(function (root) {
  'use strict';
  const { DEP, TR, H } = typeof module !== 'undefined' ? require('./train.js').MCVT : root.MCVT;
  const { fr, rnd, tb, sb, T, svg, table, num, qcm, pick, int, xs } = H;
  const rad = d => d * Math.PI / 180, deg = x => x * 180 / Math.PI;

  /* point de départ : la diagonale des écrans */
  DEP.c8 = R => {
    const P = [32, 43, 55, 65], k = int(R, 0, 3), q = pick(R, [40, 50, 75]);
    const doc = `<table class="dt tcx dt-sm"><thead><tr><th>Écran</th><th>Diagonale en pouces</th><th>Diagonale en cm</th></tr></thead><tbody>${P.map((p, i) => `<tr><th>modèle ${'ABCD'[i]}</th><td>${p}</td><td data-cell="${i}">${fr(rnd(p * 2.54, 1))}</td></tr>`).join('')}</tbody></table><p class="srcl">1 pouce = 2,54 cm. La taille d’un écran est la longueur de sa diagonale.</p>`;
    return { titre: 'La diagonale des écrans', doc,
      qs: [{ t: `Touche la diagonale en cm du modèle de ${P[k]} pouces.`, kind: 'tap', cell: String(k), v: rnd(P[k] * 2.54, 1), tol: .06, a: fr(rnd(P[k] * 2.54, 1)) + ' cm' },
        { t: `Combien mesure, en cm, la diagonale d’un écran de ${q} pouces ?`, kind: 'num', v: q * 2.54, tol: .06, a: fr(q * 2.54) + ' cm', x: `${q} × 2,54 = ${fr(q * 2.54)} cm` },
        { t: 'La diagonale coupe l’écran en deux triangles. Quelle est la nature de ces triangles ?', kind: 'qcm', choices: ['rectangles', 'équilatéraux', 'isocèles'], ok: 0, a: 'rectangles : les coins de l’écran sont des angles droits' },
        { t: 'Dans ce triangle, la diagonale est :', kind: 'qcm', choices: ['l’hypoténuse', 'un côté de l’angle droit', 'une hauteur'], ok: 0, a: 'l’hypoténuse, opposée à l’angle droit' },
        { t: 'Une diagonale de 127 cm correspond à combien de pouces ?', kind: 'num', v: 50, tol: .06, a: '50', x: '127 ÷ 2,54 = 50' }] };
  };

  /* un triangle rectangle en A, dessiné à l’échelle dans un cadre 600 × 220 */
  const tri = (b, c, labs) => {
    const k = Math.min(420 / b, 170 / c), Ax = 90, Ay = 196, Bx = Ax + b * k, Cy = Ay - c * k;
    return `<path d="M${Ax} ${Ay}L${Bx} ${Ay}L${Ax} ${Cy}Z" class="k2 ks" stroke-width="2.4" fill-opacity=".35"/><path d="M${Ax} ${Ay - 14}h14v14" fill="none" class="ks" stroke-width="1.8"/>` + T(Ax - 12, Ay + 16, 'A', { fs: 14 }) + T(Bx + 12, Ay + 16, 'B', { fs: 14 }) + T(Ax - 12, Cy, 'C', { fs: 14 }) + labs({ Ax, Ay, Bx, Cy, k });
  };

  /* e1 · Pythagore : l’hypoténuse ou un côté de l’angle droit */
  TR.c8e1 = R => {
    const [b, c] = pick(R, [[8, 6], [12, 5], [9, 4], [7.5, 4], [10, 3], [6.4, 4.8], [11, 7]]), h = Math.sqrt(b * b + c * c), hy = rnd(h, 1), askHyp = R() < .5;
    const ctx = pick(R, ['un écran', 'une étagère en coin', 'une rampe']);
    const bc = askHyp ? '?' : fr(hy), ab = fr(b), ac = askHyp ? fr(c) : '?';
    const val = askHyp ? hy : rnd(Math.sqrt(hy * hy - b * b), 1);
    const sup = tri(b, c, ({ Ax, Ay, Bx, Cy }) => T((Ax + Bx) / 2, Ay + 18, `AB = ${ab}`, { fs: 13 }) + T(Ax - 14, (Ay + Cy) / 2, `AC = ${ac}`, { fs: 13, a: 'end' }) + T((Ax + Bx) / 2 + 18, (Ay + Cy) / 2 - 6, `BC = ${bc}`, { fs: 13, a: 'start' }));
    const items = [askHyp ? qcm('a', ['[BC]', '[AB]', '[AC]'], 0, '[BC], opposée à l’angle droit') : qcm('a', ['[BC]', '[AB]', '[AC]'], 0, '[BC], opposée à l’angle droit'),
      num('b', askHyp ? rnd(b * b + c * c, 2) : rnd(hy * hy - b * b, 2), 2, fr(askHyp ? rnd(b * b + c * c, 2) : rnd(hy * hy - b * b, 2)), [{ v: askHyp ? b + c : hy - b, m: 'Pythagore utilise les carrés des longueurs.' }, { v: askHyp ? -1 : rnd(hy * hy + b * b, 2), m: 'Pour un côté de l’angle droit, on soustrait : BC² − AB².' }]),
      num('c', val, 1, fr(val), [{ v: askHyp ? rnd(b * b + c * c, 2) : rnd(hy * hy - b * b, 2), m: 'N’oublie pas la racine carrée.' }])];
    xs(items, { a: 'l’hypoténuse est le côté opposé à l’angle droit, le plus long', b: askHyp ? `BC² = AB² + AC² = ${fr(b)}² + ${fr(c)}² = ${fr(rnd(b * b, 2))} + ${fr(rnd(c * c, 2))} = ${fr(rnd(b * b + c * c, 2))}` : `AC² = BC² − AB² = ${fr(hy)}² − ${fr(b)}² = ${fr(rnd(hy * hy, 2))} − ${fr(rnd(b * b, 2))} = ${fr(rnd(hy * hy - b * b, 2))}`, c: `${askHyp ? 'BC' : 'AC'} = √${fr(askHyp ? rnd(b * b + c * c, 2) : rnd(hy * hy - b * b, 2))} ${Number.isInteger(val) && Math.abs(val * val - (askHyp ? b * b + c * c : hy * hy - b * b)) < 1e-6 ? '=' : '≈'} ${fr(val)}` });
    return { titre: 'Le théorème de Pythagore', consigne: `Le triangle ABC, rectangle en A, représente ${ctx} (longueurs en dm). Calcule la longueur manquante, au dixième.`,
      support: svg(600, 222, sup, 'Triangle rectangle en A') + `<p class="tr-l">a. L’hypoténuse est le côté : · b. ${askHyp ? 'BC²' : 'AC²'} = ${tb('b', fr(askHyp ? rnd(b * b + c * c, 2) : rnd(hy * hy - b * b, 2)), 16)} · c. ${askHyp ? 'BC' : 'AC'} ≈ ${tb('c', fr(val), 12)} dm</p>`, items,
      hints: ['L’hypoténuse est en face de l’angle droit.', 'BC² = AB² + AC².', askHyp ? 'Additionne les carrés, puis prends la racine carrée.' : 'Pour un côté de l’angle droit : AC² = BC² − AB².'] };
  };

  /* e2 · la réciproque : rectangle ou pas ? */
  const TRIS = [[[30, 40, 50], true], [[45, 60, 75], true], [[20, 21, 29], true], [[12, 16, 20], true], [[30, 40, 51], false], [[14, 18, 23], false], [[25, 60, 66], false], [[9, 12, 16], false], [[24, 32, 40], true], [[11, 60, 61], true]];
  TR.c8e2 = R => {
    const ts = H.shuffle(R, TRIS).slice(0, 3), [[[a, b, c]]] = ts;
    const items = [num('a', c * c, 0, fr(c * c), [{ v: a * a, m: 'On calcule le carré du plus grand côté, ' + c + '.' }]), num('b', a * a + b * b, 0, fr(a * a + b * b)), ...ts.map(([s, r], i) => qcm('cde'[i], ['oui', 'non'], r ? 0 : 1, r ? `oui : ${s[0]}² + ${s[1]}² = ${s[2]}² = ${fr(s[2] * s[2])}` : `non : ${s[0]}² + ${s[1]}² = ${fr(s[0] * s[0] + s[1] * s[1])} et ${s[2]}² = ${fr(s[2] * s[2])}`))];
    xs(items, { a: `${c}² = ${fr(c * c)}`, b: `${a}² + ${b}² = ${fr(a * a)} + ${fr(b * b)} = ${fr(a * a + b * b)}` });
    return { titre: 'Rectangle ou pas ?', consigne: 'Un charpentier vérifie l’équerre de trois cadres. Les longueurs sont en cm.',
      support: table(['Cadre', 'Côtés', 'Rectangle ?'], ts.map(([s], i) => [String(i + 1), s.join(' ; '), `${'cde'[i]}.`])) + `<p class="tr-l">Pour le cadre 1 : a. ${c}² = ${tb('a', fr(c * c), 14)} · b. ${a}² + ${b}² = ${tb('b', fr(a * a + b * b), 14)}</p>`, items,
      hints: ['Repère le plus grand côté.', 'Compare son carré à la somme des carrés des deux autres.', 'Égalité : rectangle (réciproque de Pythagore). Sinon : pas rectangle.'] };
  };

  /* e3 · trigonométrie : une longueur, puis un angle */
  TR.c8e3 = R => {
    const mode = pick(R, ['cos', 'sin', 'tan']), ang = pick(R, [25, 30, 35, 40, 50, 55]), L = pick(R, [6, 8, 10, 12, 15]);
    let b, c, given, ask, val, formula;
    if (mode === 'cos') { const hy = L; b = hy * Math.cos(rad(ang)); c = hy * Math.sin(rad(ang)); given = `BC = ${hy} m`; ask = 'AB'; val = rnd(b, 2); formula = `AB = BC × cos ${ang}° = ${hy} × cos ${ang}°`; }
    else if (mode === 'sin') { const hy = L; b = hy * Math.cos(rad(ang)); c = hy * Math.sin(rad(ang)); given = `BC = ${hy} m`; ask = 'AC'; val = rnd(c, 2); formula = `AC = BC × sin ${ang}° = ${hy} × sin ${ang}°`; }
    else { b = L; c = L * Math.tan(rad(ang)); given = `AB = ${L} m`; ask = 'AC'; val = rnd(c, 2); formula = `AC = AB × tan ${ang}° = ${L} × tan ${ang}°`; }
    const [o, a2] = pick(R, [[3, 4], [5, 12], [2, 5], [7, 10]]), A2 = rnd(deg(Math.atan(o / a2)), 1);
    const sup = tri(b, c, ({ Ax, Ay, Bx, Cy }) => `<path d="M${Bx - 40} ${Ay}A40 40 0 0 0 ${Bx - 40 * Math.cos(Math.atan2(Ay - Cy, Bx - Ax))} ${Ay - 40 * Math.sin(Math.atan2(Ay - Cy, Bx - Ax))}" fill="none" class="ks" stroke-width="2"/>` + T(Bx - 58, Ay - 10, ang + '°', { fs: 13, c: 'kt' }) + T((Ax + Bx) / 2, Ay + 18, mode === 'tan' ? given : 'AB', { fs: 13 }) + T(Ax - 14, (Ay + Cy) / 2, 'AC', { fs: 13, a: 'end' }) + T((Ax + Bx) / 2 + 18, (Ay + Cy) / 2 - 6, mode === 'tan' ? 'BC' : given, { fs: 13, a: 'start' }));
    const items = [qcm('a', ['cosinus', 'sinus', 'tangente'], ['cos', 'sin', 'tan'].indexOf(mode), { cos: 'cosinus : adjacent et hypoténuse', sin: 'sinus : opposé et hypoténuse', tan: 'tangente : opposé et adjacent' }[mode]), num('b', val, 2, fr(val), [{ v: rnd(L / ({ cos: Math.cos, sin: Math.sin, tan: Math.tan })[mode](rad(ang)), 2), m: 'Ici on multiplie : le côté cherché est au numérateur.' }]), num('c', A2, 1, fr(A2) + '°', [{ v: rnd(deg(Math.atan(a2 / o)), 1), m: 'tan = côté opposé ÷ côté adjacent, dans cet ordre.' }])];
    xs(items, { b: `${formula} ≈ ${fr(val)} m`, c: `tan x = ${o} ÷ ${a2} ; x = tan⁻¹(${fr(o / a2)}) ≈ ${fr(A2)}°` });
    return { titre: 'Trigonométrie', consigne: `Le triangle ABC est rectangle en A, avec un angle de ${ang}° en B et ${given}. Calculatrice en mode degrés.`,
      support: svg(600, 222, sup, 'Triangle rectangle en A avec un angle en B') + `<p class="tr-l">a. Quelle formule utiliser pour calculer ${ask} ? · b. ${ask} ≈ ${tb('b', fr(val), 14)} m (au centième)</p><p class="tr-l">c. Dans un autre triangle rectangle, le côté opposé à l’angle x mesure ${o} m et le côté adjacent ${a2} m. x ≈ ${tb('c', fr(A2), 12)}° (au dixième)</p>`, items,
      hints: ['Repère les côtés par rapport à l’angle : opposé, adjacent, hypoténuse.', 'CAH : cos = adjacent ÷ hypoténuse ; SOH : sin = opposé ÷ hypoténuse ; TOA : tan = opposé ÷ adjacent.', 'Pour trouver un angle : touches cos⁻¹, sin⁻¹ ou tan⁻¹.'] };
  };
  /* ===== exercice ajouté : notion 4 (calculer un angle) ===== */
  {
    const { Q, fr, pick, int, svg, T, rnd } = H;
    TR.c8e4 = R => {
      const [p, q, h0] = pick(R, [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]]), k = pick(R, [1, 1, 2]), sw = R() < .5;
      const opp = (sw ? q : p) * k, adj = (sw ? p : q) * k, hyp = h0 * k, cas = pick(R, ['tan', 'sin', 'cos']);
      const num_ = cas === 'tan' ? opp : cas === 'sin' ? opp : adj, den_ = cas === 'tan' ? adj : hyp;
      const ratio = num_ / den_, ang = cas === 'tan' ? Math.atan(ratio) : cas === 'sin' ? Math.asin(ratio) : Math.acos(ratio), deg = ang * 180 / Math.PI, d0 = rnd(deg, 0), d1 = rnd(90 - deg, 0);
      const Wd = 230, Hd = Math.max(60, Math.min(130, Wd * opp / adj)), Bx = 84, By = 170, Ax = Bx + Wd, Ay = By, Cx = Bx, Cy = By - Hd, ux = (Cx - Ax) / Math.hypot(Cx - Ax, Cy - Ay), uy = (Cy - Ay) / Math.hypot(Cx - Ax, Cy - Ay);
      let g = `<polygon points="${Bx},${By} ${Ax},${Ay} ${Cx},${Cy}" fill="#EEF2FB" stroke="#1D2240" stroke-width="2.4" stroke-linejoin="round"/><path d="M ${Bx + 14} ${By} L ${Bx + 14} ${By - 14} L ${Bx} ${By - 14}" fill="none" stroke="#1D2240" stroke-width="1.8"/>`;
      g += `<path d="M ${Ax - 34} ${Ay} A 34 34 0 0 1 ${Ax + 34 * ux} ${Ay + 34 * uy}" fill="none" stroke="#B4501E" stroke-width="2.4"/>` + T(Ax + 14, Ay - 12, 'Â = ?', { fs: 14, a: 'start' });
      g += T(Bx - 14, By + 16, 'B', { fs: 15 }) + T(Ax + 14, Ay + 16, 'A', { fs: 15 }) + T(Cx - 14, Cy - 6, 'C', { fs: 15 });
      if (cas !== 'sin') g += T((Bx + Ax) / 2, By + 20, `BA = ${adj} cm`, { fs: 12.5 });
      if (cas !== 'cos') g += T(Bx - 10, (By + Cy) / 2, `BC = ${opp} cm`, { fs: 12.5, a: 'end' });
      if (cas !== 'tan') { const nl = Math.hypot(Hd, Wd); g += T((Ax + Cx) / 2 + 17 * Hd / nl, (Ay + Cy) / 2 - 17 * Wd / nl + 4, `AC = ${hyp} cm`, { fs: 12.5, r: Math.round(Math.atan(Hd / Wd) * 180 / Math.PI) }); }
      const pic = svg(400, 200, g, `Triangle ABC rectangle en B : ${cas === 'tan' ? 'BA et BC connus' : cas === 'sin' ? 'BC et AC connus' : 'BA et AC connus'}, angle en A à calculer`);
      const nm = { tan: 'BC ÷ BA (opposé ÷ adjacent)', sin: 'BC ÷ AC (opposé ÷ hypoténuse)', cos: 'BA ÷ AC (adjacent ÷ hypoténuse)' }[cas];
      const inv = { tan: 'tan⁻¹', sin: 'sin⁻¹', cos: 'cos⁻¹' }[cas];
      return Q('Calculer un angle', 'ABC est rectangle en B. Calcule l’angle Â au degré près, avec la touche tan⁻¹, sin⁻¹ ou cos⁻¹ (mode degrés).', [
        { lab: 'Quelle formule faut-il utiliser ?', qcm: ['cos(Â) = adjacent ÷ hypoténuse', 'sin(Â) = opposé ÷ hypoténuse', 'tan(Â) = opposé ÷ adjacent'], ok: ['cos', 'sin', 'tan'].indexOf(cas), x: `Pour l’angle Â, BC est le côté opposé, BA le côté adjacent et AC l’hypoténuse. Les côtés connus sont ${cas === 'tan' ? 'BC (opposé) et BA (adjacent) : on utilise la tangente' : cas === 'sin' ? 'BC (opposé) et AC (hypoténuse) : on utilise le sinus' : 'BA (adjacent) et AC (hypoténuse) : on utilise le cosinus'}.` },
        { lab: `Calcule ${nm}, au centième`, v: rnd(ratio, 2), d: 2, x: `${num_} ÷ ${den_} = ${fr(ratio, 4)} ≈ ${fr(rnd(ratio, 2))}` },
        { lab: 'Mesure de l’angle Â, au degré', v: d0, d: 0, w: 14, x: `${cas}(Â) = ${num_} ÷ ${den_}, donc Â = ${inv}(${fr(ratio, 4)}) ≈ ${fr(deg, 1)}° soit ${fr(d0, 0)}°`, err: [{ v: d1, m: 'Tu as peut-être calculé l’autre angle aigu : vérifie quels côtés touchent l’angle Â.' }, { v: rnd(ratio, 2), m: 'Le quotient n’est pas l’angle : utilise ensuite la touche ' + inv + '.' }] },
        { lab: 'Mesure de l’angle Ĉ, au degré', v: d1, d: 0, w: 14, x: `Dans un triangle, la somme des angles vaut 180° : Ĉ = 180° − 90° − ${fr(deg, 1)}° ≈ ${fr(90 - deg, 1)}° soit ${fr(d1, 0)}°`, err: [{ v: d0, m: 'La somme des angles d’un triangle vaut 180° : 180 − 90 − Â.' }] }],
        ['Repère le côté opposé à Â, le côté adjacent et l’hypoténuse.', 'Choisis cos, sin ou tan avec les deux côtés connus.', 'Pour trouver l’angle, utilise la touche cos⁻¹, sin⁻¹ ou tan⁻¹.'], pic);
    };
  }
  /* ===== niveaux 🌱 guidé et 🚀 défi · chapitre 8 ===== */
  {
    const { Q, AI } = H;
    const TRI = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [15, 20, 25]];
    const figPyth = (ab, ac, L) => svg(600, 222, tri(ab, ac, ({ Ax, Ay, Bx, Cy }) => T((Ax + Bx) / 2, Ay + 18, L[0], { fs: 13 }) + T(Ax - 14, (Ay + Cy) / 2, L[1], { fs: 13, a: 'end' }) + T((Ax + Bx) / 2 + 18, (Ay + Cy) / 2 - 6, L[2], { fs: 13, a: 'start' })), 'Triangle rectangle en A');
    /* e1 · Pythagore */
    TR.c8e1a = R => {
      const [b, c, h] = pick(R, TRI), [x, y] = R() < .5 ? [b, c] : [c, b];
      return Q('Pythagore, pas à pas', 'Le triangle ABC est rectangle en A (longueurs en dm). Calcule l’hypoténuse.', [
        { lab: 'L’hypoténuse est le côté', qcm: ['[BC]', '[AB]', '[AC]'], ok: 0, x: 'L’hypoténuse est le côté opposé à l’angle droit : c’est [BC], le plus long.' },
        { lab: `AB² = ${x} × ${x} =`, v: x * x, d: 0, w: 10, x: `${x} × ${x} = ${x * x}`, err: [{ v: 2 * x, m: 'Le carré, c’est le nombre multiplié par lui-même.' }] },
        { lab: `AC² = ${y} × ${y} =`, v: y * y, d: 0, w: 10, x: `${y} × ${y} = ${y * y}` },
        { lab: 'BC² = AB² + AC² =', v: h * h, d: 0, w: 10, x: `${x * x} + ${y * y} = ${h * h}`, err: [{ v: x + y, m: 'On additionne les carrés des deux côtés de l’angle droit.' }] },
        { lab: 'BC = racine carrée de BC² =', v: h, d: 0, w: 10, x: `√${h * h} = ${h} dm (car ${h} × ${h} = ${h * h})`, err: [{ v: h * h, m: 'Il reste à prendre la racine carrée : quel nombre multiplié par lui-même donne ' + h * h + ' ?' }] }],
        ['L’hypoténuse est en face de l’angle droit.', 'BC² = AB² + AC².', 'Pour finir, cherche le nombre qui, multiplié par lui-même, donne BC².'],
        figPyth(x, y, [`AB = ${x}`, `AC = ${y}`, 'BC = ?']) + AI('côtés 3 et 4 : 3² + 4² = 9 + 16 = 25 ; la racine carrée de 25 est 5.'));
    };
    TR.c8e1d = R => {
      const [b, c, h] = pick(R, TRI), [x, y] = R() < .5 ? [b, c] : [c, b];
      return Q('Un côté de l’angle droit', `Le triangle ABC est rectangle en A. On connaît AB = ${x} dm et BC = ${h} dm. On cherche AC.`, [
        { lab: 'AC² = BC² − AB² =', v: y * y, d: 0, w: 12, x: `${h}² − ${x}² = ${h * h} − ${x * x} = ${y * y}`, err: [{ v: h * h + x * x, m: 'BC est l’hypoténuse : pour un côté de l’angle droit, on soustrait.' }] },
        { lab: 'AC en dm', v: y, d: 0, w: 10, x: `√${y * y} = ${y}`, err: [{ v: y * y, m: 'N’oublie pas la racine carrée.' }] },
        { lab: 'Périmètre du triangle, en dm', v: x + y + h, d: 0, w: 10, x: `${x} + ${y} + ${h} = ${x + y + h}` },
        { lab: 'Aire du triangle, en dm²', v: x * y / 2, d: 1, w: 10, x: `(AB × AC) ÷ 2 = (${x} × ${y}) ÷ 2 = ${fr(x * y / 2)}`, err: [{ v: x * y, m: 'L’aire d’un triangle rectangle est la moitié du produit des côtés de l’angle droit.' }] }],
        ['BC est l’hypoténuse : AB² + AC² = BC².', 'Pour trouver AC² : BC² − AB².', 'Aire d’un triangle rectangle : (côté × côté) ÷ 2.'], figPyth(x, y, [`AB = ${x}`, 'AC = ?', `BC = ${h}`]));
    };
    /* e2 · réciproque */
    TR.c8e2a = R => {
      const [[s, rect]] = H.shuffle(R, TRIS), [a, b, c] = s;
      return Q('La réciproque, pas à pas', `Un charpentier vérifie un cadre triangulaire dont les côtés mesurent ${a} cm, ${b} cm et ${c} cm. Est-il rectangle ?`, [
        { lab: 'Plus grand côté (il serait l’hypoténuse)', v: c, d: 0, w: 10, x: `Le plus grand des trois côtés est ${c}.` },
        { lab: 'Le carré du plus grand côté', v: c * c, d: 0, w: 12, x: `${c} × ${c} = ${fr(c * c)}`, err: [{ v: a * a, m: 'On calcule le carré du plus grand côté, ' + c + '.' }] },
        { lab: 'La somme des carrés des deux autres côtés', v: a * a + b * b, d: 0, w: 12, x: `${fr(a * a)} + ${fr(b * b)} = ${fr(a * a + b * b)}`, err: [{ v: (a + b) * (a + b), m: 'Calcule chaque carré séparément, puis additionne.' }] },
        { lab: 'Les deux résultats sont-ils égaux ?', qcm: ['oui', 'non'], ok: rect ? 0 : 1, x: rect ? `${fr(c * c)} = ${fr(a * a + b * b)} : ils sont égaux.` : `${fr(c * c)} ≠ ${fr(a * a + b * b)} : ils sont différents.` },
        { lab: 'Le triangle est-il rectangle ?', qcm: ['oui', 'non'], ok: rect ? 0 : 1, x: rect ? 'Si c² = a² + b², la réciproque de Pythagore dit que le triangle est rectangle.' : 'Si c² ≠ a² + b², le triangle n’est pas rectangle.' }],
        ['Repère le plus grand côté : c’est le candidat à l’hypoténuse.', 'Calcule c², puis a² + b².', 'Égalité : le triangle est rectangle. Sinon : il ne l’est pas.'],
        table(['Côté', 'a', 'b', 'c'], [['Longueur (cm)', a, b, c]]) + AI('côtés 6, 8, 10 : 10² = 100 ; 6² + 8² = 36 + 64 = 100 ; les deux sont égaux : le triangle est rectangle.'));
    };
    TR.c8e2d = R => {
      const [[a, b, d]] = H.shuffle(R, [[30, 40, 50], [45, 60, 75], [20, 21, 29], [12, 16, 20], [24, 32, 40], [11, 60, 61]]), good = R() < .5, dm = good ? d : d + pick(R, [2, 3, -2, -3]);
      return Q('Contrôler un cadre par sa diagonale', `Un cadre de ${a} cm sur ${b} cm doit être rectangle. Le charpentier mesure sa diagonale : ${dm} cm.`, [
        { lab: `${a}² + ${b}² =`, v: a * a + b * b, d: 0, w: 12, x: `${fr(a * a)} + ${fr(b * b)} = ${fr(a * a + b * b)}`, err: [{ v: (a + b) * (a + b), m: 'Calcule chaque carré séparément, puis additionne.' }] },
        { lab: 'Longueur attendue de la diagonale, en cm', v: d, d: 0, w: 10, x: `√${fr(a * a + b * b)} = ${d} cm`, err: [{ v: a * a + b * b, m: 'N’oublie pas la racine carrée.' }] },
        { lab: `${dm}² =`, v: dm * dm, d: 0, w: 12, x: `${dm} × ${dm} = ${fr(dm * dm)}` },
        { lab: 'La diagonale mesurée est-elle égale à la diagonale attendue ?', qcm: ['oui', 'non'], ok: good ? 0 : 1, x: good ? `${dm} = ${d} : oui.` : `${dm} ≠ ${d} : non.` },
        { lab: 'Le cadre est-il rectangle ?', qcm: ['oui', 'non'], ok: good ? 0 : 1, x: good ? `${a}² + ${b}² = ${d}² : d’après la réciproque de Pythagore, le cadre est rectangle.` : `${a}² + ${b}² = ${fr(a * a + b * b)} mais ${dm}² = ${fr(dm * dm)} : ce n’est pas égal, le cadre n’est pas rectangle.` }],
        ['Les deux côtés et la diagonale forment un triangle.', 'S’il est rectangle : a² + b² = diagonale².', 'Compare la diagonale mesurée à la diagonale attendue.'],
        table(['Cadre', 'Longueur', 'Largeur', 'Diagonale mesurée'], [['Dimensions (cm)', a, b, dm]]));
    };
    /* e3 · trigonométrie */
    const figTrig = (ang, ab, ac, bc) => svg(600, 222, tri(8, 6, ({ Ax, Ay, Bx, Cy }) => `<path d="M${Bx - 40} ${Ay}A40 40 0 0 0 ${Bx - 40 * Math.cos(Math.atan2(Ay - Cy, Bx - Ax))} ${Ay - 40 * Math.sin(Math.atan2(Ay - Cy, Bx - Ax))}" fill="none" class="ks" stroke-width="2"/>` + T(Bx - 58, Ay - 10, ang + '°', { fs: 13, c: 'kt' }) + T((Ax + Bx) / 2, Ay + 18, ab, { fs: 13 }) + T(Ax - 14, (Ay + Cy) / 2, ac, { fs: 13, a: 'end' }) + T((Ax + Bx) / 2 + 18, (Ay + Cy) / 2 - 6, bc, { fs: 13, a: 'start' })), 'Triangle rectangle en A avec un angle en B');
    TR.c8e3a = R => {
      const mode = pick(R, ['sin', 'cos']), ang = pick(R, [25, 30, 35, 40, 50, 55]), hy = pick(R, [6, 8, 10, 12, 15]);
      const f = { sin: Math.sin, cos: Math.cos }[mode], val = rnd(hy * f(rad(ang)), 2), ask = mode === 'sin' ? 'AC' : 'AB';
      return Q('Trigonométrie, pas à pas', `Le triangle ABC est rectangle en A, avec un angle de ${ang}° en B et BC = ${hy} m. Calcule ${ask} (calculatrice en degrés).`, [
        { lab: 'Le côté opposé à l’angle B est', qcm: ['[AB]', '[AC]', '[BC]'], ok: 1, x: 'Le côté opposé à l’angle B est celui qui ne touche pas B : [AC].' },
        { lab: 'Le côté adjacent à l’angle B (autre que l’hypoténuse) est', qcm: ['[AB]', '[AC]', '[BC]'], ok: 0, x: 'Le côté adjacent à B (qui touche B, sans être l’hypoténuse) est [AB].' },
        { lab: `Pour calculer ${ask} avec BC, on utilise`, qcm: ['le cosinus', 'le sinus', 'la tangente'], ok: mode === 'cos' ? 0 : 1, x: mode === 'sin' ? 'AC est opposé à B et BC est l’hypoténuse : sinus = opposé ÷ hypoténuse.' : 'AB est adjacent à B et BC est l’hypoténuse : cosinus = adjacent ÷ hypoténuse.' },
        { lab: `${ask} = BC × ${mode} ${ang}°, en m (au centième)`, v: val, d: 2, w: 12, x: `${hy} × ${mode} ${ang}° ≈ ${fr(val)} m`, err: [{ v: rnd(hy / f(rad(ang)), 2), m: 'On multiplie l’hypoténuse par le ' + (mode === 'sin' ? 'sinus' : 'cosinus') + ' : le côté cherché est au numérateur.' }] }],
        ['Repère les côtés par rapport à l’angle B : opposé, adjacent, hypoténuse.', 'CAH : cos = adjacent ÷ hypoténuse ; SOH : sin = opposé ÷ hypoténuse.', 'Calculatrice en mode degrés.'],
        figTrig(ang, 'AB', 'AC', `BC = ${hy} m`) + AI('angle 30°, hypoténuse 10 m : le côté opposé vaut 10 × sin 30° = 10 × 0,5 = 5 m.'));
    };
    TR.c8e3d = R => {
      const L = pick(R, [4, 5, 6, 7, 8]), ang = pick(R, [60, 65, 70, 75]), h = L * Math.sin(rad(ang)), d = L * Math.cos(rad(ang)), [o, a2] = pick(R, [[3, 4], [5, 12], [2, 5], [7, 10], [4, 5]]), A2 = deg(Math.atan(o / a2));
      return Q('Une échelle contre un mur', `Une échelle de ${L} m est appuyée contre un mur vertical. Elle fait un angle de ${ang}° avec le sol.`, [
        { lab: 'Hauteur atteinte sur le mur, en m (au centième)', v: h, d: 2, w: 12, x: `${L} × sin ${ang}° ≈ ${fr(rnd(h, 2))} m`, err: [{ v: rnd(d, 2), m: 'La hauteur est le côté opposé à l’angle : sinus (pas cosinus).' }] },
        { lab: 'Distance entre le pied de l’échelle et le mur, en m (au centième)', v: d, d: 2, w: 12, x: `${L} × cos ${ang}° ≈ ${fr(rnd(d, 2))} m`, err: [{ v: rnd(h, 2), m: 'La distance au mur est le côté adjacent à l’angle : cosinus.' }] },
        { lab: `Un autre cas : pied à ${a2} m du mur, sommet à ${o} m de hauteur. Angle avec le sol, au dixième de degré`, v: A2, d: 1, w: 12, x: `tan x = ${o} ÷ ${a2} ; x = tan⁻¹(${fr(rnd(o / a2, 3))}) ≈ ${fr(rnd(A2, 1))}°`, err: [{ v: rnd(deg(Math.atan(a2 / o)), 1), m: 'tan = opposé ÷ adjacent : la hauteur sur la distance au mur.' }] },
        { lab: 'Plus l’angle avec le sol est grand, plus l’échelle est…', qcm: ['proche de la verticale', 'proche de l’horizontale'], ok: 0, x: 'Un angle de 90° avec le sol donne une échelle verticale : plus l’angle est grand, plus l’échelle se redresse.' }],
        ['La hauteur est opposée à l’angle avec le sol ; la distance au mur lui est adjacente.', 'Pour un angle : tan⁻¹ (ou sin⁻¹, cos⁻¹) de la calculatrice.', 'Calculatrice en mode degrés.'],
        table(['Échelle', 'Longueur', 'Angle avec le sol'], [['Données', `${L} m`, `${ang}°`]]));
    };
    /* e4 · calculer un angle */
    TR.c8e4a = R => {
      let [adj, opp, hyp] = pick(R, [[4, 3, 5], [12, 5, 13], [15, 8, 17], [24, 7, 25], [8, 6, 10], [20, 15, 25]]); if (R() < .5) [adj, opp] = [opp, adj];
      const tB = Math.atan(opp / adj) * 180 / Math.PI, B0 = rnd(tB, 0), C0 = rnd(90 - tB, 0);
      const pic = svg(600, 222, tri(adj, opp, ({ Ax, Ay, Bx, Cy }) => T((Ax + Bx) / 2, Ay + 18, `AB = ${adj} cm`, { fs: 13 }) + T(Ax - 14, (Ay + Cy) / 2, `AC = ${opp} cm`, { fs: 13, a: 'end' }) + T(Bx - 40, Ay - 10, 'B̂ = ?', { fs: 13, c: 'kt' })), 'Triangle rectangle en A, angle en B à calculer');
      return Q('Calculer un angle, pas à pas', 'Le triangle ABC est rectangle en A. Calcule l’angle B̂ au degré près (mode degrés).', [
        { lab: 'Pour l’angle B̂, le côté [AC] est le côté…', qcm: ['opposé', 'adjacent', 'hypoténuse'], ok: 0, x: '[AC] ne touche pas B : c’est le côté opposé à B̂.' },
        { lab: 'Pour l’angle B̂, le côté [AB] est le côté…', qcm: ['opposé', 'adjacent', 'hypoténuse'], ok: 1, x: '[AB] touche B et n’est pas l’hypoténuse : c’est le côté adjacent.' },
        { lab: 'tan B̂ = AC ÷ AB, au centième', v: opp / adj, d: 2, w: 12, a: fr(rnd(opp / adj, 2)), x: `${opp} ÷ ${adj} ≈ ${fr(rnd(opp / adj, 2))}`, err: [{ v: rnd(adj / opp, 2), m: 'tangente = opposé ÷ adjacent, dans cet ordre.' }] },
        { lab: 'Angle B̂, au degré', v: B0, d: 0, w: 12, x: `B̂ = tan⁻¹(${opp} ÷ ${adj}) ≈ ${fr(rnd(tB, 1))}° soit ${B0}°`, err: [{ v: rnd(opp / adj, 2), m: 'Le quotient n’est pas l’angle : utilise ensuite la touche tan⁻¹.' }] },
        { lab: 'Angle Ĉ, au degré', v: C0, d: 0, w: 12, x: `Ĉ = 180° − 90° − ${fr(rnd(tB, 1))}° ≈ ${fr(rnd(90 - tB, 1))}° soit ${C0}°`, err: [{ v: B0, m: 'La somme des angles d’un triangle vaut 180° : 180 − 90 − B̂.' }] }],
        ['Repère le côté opposé et le côté adjacent par rapport à B̂.', 'tangente = côté opposé ÷ côté adjacent.', 'Pour trouver l’angle, utilise la touche tan⁻¹.'], pic + AI('opposé 3, adjacent 4 : tan = 3 ÷ 4 = 0,75 ; l’angle est tan⁻¹(0,75) ≈ 37°.'));
    };
    TR.c8e4d = R => {
      const [a1, h1] = pick(R, [[4, 5], [5, 13], [8, 17], [7, 25], [12, 13]]), [o2, a2] = pick(R, [[3, 4], [5, 12], [8, 15], [7, 24], [6, 8]].filter(([o, a]) => Math.round(Math.hypot(o, a)) !== h1)), A1 = deg(Math.acos(a1 / h1)), A2 = deg(Math.atan(o2 / a2));
      return Q('Choisir la bonne formule', 'Deux triangles rectangles. Dans chacun, on cherche un angle aigu : choisis cos, sin ou tan, puis utilise cos⁻¹, sin⁻¹ ou tan⁻¹.', [
        { lab: `Triangle 1 : côtés adjacent (${a1} cm) et hypoténuse (${h1} cm). La formule est`, qcm: ['cosinus', 'sinus', 'tangente'], ok: 0, x: 'adjacent et hypoténuse : cosinus = adjacent ÷ hypoténuse.' },
        { lab: 'Angle du triangle 1, au degré', v: rnd(A1, 0), d: 0, w: 12, x: `cos x = ${a1} ÷ ${h1} ; x = cos⁻¹(${fr(rnd(a1 / h1, 3))}) ≈ ${fr(rnd(A1, 1))}° soit ${rnd(A1, 0)}°`, err: [{ v: rnd(deg(Math.asin(a1 / h1)), 0), m: 'Adjacent et hypoténuse : c’est le cosinus, pas le sinus.' }] },
        { lab: `Triangle 2 : côtés opposé (${o2} cm) et adjacent (${a2} cm). La formule est`, qcm: ['cosinus', 'sinus', 'tangente'], ok: 2, x: 'opposé et adjacent : tangente = opposé ÷ adjacent.' },
        { lab: 'Angle du triangle 2, au degré', v: rnd(A2, 0), d: 0, w: 12, x: `tan x = ${o2} ÷ ${a2} ; x = tan⁻¹(${fr(rnd(o2 / a2, 3))}) ≈ ${fr(rnd(A2, 1))}° soit ${rnd(A2, 0)}°`, err: [{ v: rnd(deg(Math.atan(a2 / o2)), 0), m: 'tangente = opposé ÷ adjacent, dans cet ordre.' }] },
        { lab: 'Autre angle aigu du triangle 1, au degré', v: rnd(90 - A1, 0), d: 0, w: 12, x: `90° − ${fr(rnd(A1, 1))}° ≈ ${fr(rnd(90 - A1, 1))}° soit ${rnd(90 - A1, 0)}°`, err: [{ v: rnd(A1, 0), m: 'Les deux angles aigus ont pour somme 90°.' }] }],
        ['Repère les côtés connus : opposé, adjacent ou hypoténuse.', 'cos : adjacent ÷ hypoténuse ; sin : opposé ÷ hypoténuse ; tan : opposé ÷ adjacent.', 'Les deux angles aigus d’un triangle rectangle ont pour somme 90°.'],
        table(['Triangle', 'Côtés connus'], [['1', `adjacent ${a1} cm ; hypoténuse ${h1} cm`], ['2', `opposé ${o2} cm ; adjacent ${a2} cm`]]));
    };
  }
})(typeof module !== 'undefined' ? module.exports : window);
