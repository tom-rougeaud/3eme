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
    return { titre: 'Rectangle ou pas ?', consigne: 'Un charpentier (fictif) vérifie l’équerre de trois cadres. Les longueurs sont en cm.',
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
})(typeof module !== 'undefined' ? module.exports : window);
