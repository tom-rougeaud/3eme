/* 3ème Série Pro · chapitre 6 — Statistiques : moyenne (simple et pondérée), médiane, étendue, diagrammes, fréquences. */
(function (root) {
  'use strict';
  const { DEP, TR, H } = typeof module !== 'undefined' ? require('./train.js').MCVT : root.MCVT;
  const { fr, rnd, tb, sb, T, svg, table, num, qcm, pick, int, xs, P, shuffle } = H;
  /* épisodes par saison des Simpson, saisons 1 à 36 (Wikipédia, « List of The Simpsons episodes ») */
  const SIMP = [13, 22, 24, 22, 22, 25, 25, 25, 25, 23, 22, 21, 22, 22, 22, 21, 22, 22, 20, 21, 23, 22, 22, 22, 22, 22, 22, 22, 21, 23, 22, 22, 22, 22, 18, 22];
  const med = a => { const s = a.slice().sort((x, y) => x - y), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
  const sum = a => a.reduce((x, y) => x + y, 0);

  /* point de départ : six saisons des Simpson */
  DEP.c6 = R => {
    let s0; do { s0 = int(R, 0, 30); } while (Math.max(...SIMP.slice(s0, s0 + 6)) === Math.min(...SIMP.slice(s0, s0 + 6)));
    const sel = SIMP.slice(s0, s0 + 6), k = int(R, 0, 5), tot = sum(sel), mx = Math.max(...sel), mn = Math.min(...sel);
    const doc = `<table class="dt tcx dt-sm"><thead><tr><th>Saison</th>${sel.map((_, i) => `<th>${s0 + i + 1}</th>`).join('')}</tr></thead><tbody><tr><th>Épisodes</th>${sel.map((v, i) => `<td data-cell="${i}">${v}</td>`).join('')}</tr></tbody></table><p class="srcl">Source : Wikipédia (en), « List of The Simpsons episodes », consultée en octobre 2026.</p>`;
    return { titre: 'Six saisons des Simpson', doc,
      qs: [{ t: `Touche le nombre d’épisodes de la saison ${s0 + k + 1}.`, kind: 'tap', cell: String(k), v: sel[k], tol: .01, a: String(sel[k]) },
        { t: 'Combien d’épisodes en tout pour ces six saisons ?', kind: 'num', v: tot, tol: .01, a: String(tot), x: `${sel.join(' + ')} = ${tot}` },
        { t: 'Quel est le plus grand nombre d’épisodes d’une saison ?', kind: 'num', v: mx, tol: .01, a: String(mx) },
        { t: 'Quelle est l’étendue de la série (plus grand − plus petit) ?', kind: 'num', v: mx - mn, tol: .01, a: String(mx - mn), x: `${mx} − ${mn} = ${mx - mn}` },
        { t: 'La moyenne est-elle plus proche de 18, de 22 ou de 26 ?', kind: 'qcm', choices: ['18', '22', '26'], ok: 1, a: '22', x: `${tot} ÷ 6 ≈ ${fr(rnd(tot / 6, 1))}` }] };
  };

  /* e1 · moyenne simple et moyenne pondérée */
  TR.c6e1 = R => {
    let v; do { v = Array.from({ length: 5 }, () => int(R, 8, 20)); } while (sum(v) % 5);
    const m = sum(v) / 5;
    const vals = shuffle(R, [10, 12, 14, 15, 16]).slice(0, 3).sort((a, b) => a - b), cf = [int(R, 1, 3), int(R, 1, 3), int(R, 1, 3)], S = vals.reduce((a, x, i) => a + x * cf[i], 0), N = sum(cf), mp = rnd(S / N, 2);
    const items = [num('a', sum(v), 0, String(sum(v))), num('b', m, 2, fr(m), [{ v: sum(v) / 4, m: 'Il y a 5 valeurs : on divise par 5.' }]), num('c', S, 0, String(S), [{ v: sum(vals), m: 'Chaque note compte autant de fois que son coefficient.' }]), num('d', mp, 2, fr(mp), [{ v: rnd(sum(vals) / 3, 2), m: 'Moyenne pondérée : on divise par la somme des coefficients, ' + N + '.' }])];
    xs(items, { a: `${v.join(' + ')} = ${sum(v)}`, b: `${sum(v)} ÷ 5 = ${fr(m)}`, c: vals.map((x, i) => `${x} × ${cf[i]}`).join(' + ') + ` = ${S}`, d: `${S} ÷ ${N} ${S / N === mp ? '=' : '≈'} ${fr(mp)}` });
    return { titre: 'Moyenne simple, moyenne pondérée', consigne: 'Des scores dans un jeu de rythme (fictif), puis des notes avec coefficients.',
      support: table(['Partie', '1', '2', '3', '4', '5'], [['Score', ...v.map(String)]]) + `<p class="tr-l">a. Somme des scores : ${tb('a', String(sum(v)), 12)} · b. Score moyen : ${tb('b', fr(m), 12)}</p>` + table(['Note', ...vals.map(String)], [['Coefficient', ...cf.map(String)]]) + `<p class="tr-l">c. Somme des notes × coefficients : ${tb('c', String(S), 12)} · d. Moyenne pondérée, au centième : ${tb('d', fr(mp), 12)}</p>`, items,
      hints: ['Moyenne = somme des valeurs ÷ nombre de valeurs.', 'Avec des coefficients : on multiplie chaque note par son coefficient.', 'Puis on divise par la somme des coefficients.'] };
  };

  /* e2 · médiane et étendue */
  TR.c6e2 = R => {
    const n = pick(R, [7, 8, 9]); let v; do { v = Array.from({ length: n }, () => int(R, 60, 180)); } while (new Set(v).size < n);
    const s = v.slice().sort((a, b) => a - b), md = med(v), e = s[n - 1] - s[0], m = rnd(sum(v) / n, 1);
    const items = [num('a', s[0], 0, String(s[0])), num('b', md, 1, fr(md), [{ v: v[Math.floor(n / 2)], m: 'Il faut d’abord ranger les valeurs dans l’ordre croissant.' }]), num('c', e, 0, String(e), [{ v: s[n - 1], m: 'L’étendue est une différence : plus grande − plus petite.' }]), num('d', m, 1, fr(m))];
    xs(items, { a: `rangées : ${s.join(' ; ')} ; la plus petite est ${s[0]}`, b: n % 2 ? `${n} valeurs : la médiane est la ${(n + 1) / 2}e, ${md}` : `${n} valeurs : moyenne de la ${n / 2}e et de la ${n / 2 + 1}e : (${s[n / 2 - 1]} + ${s[n / 2]}) ÷ 2 = ${fr(md)}`, c: `${s[n - 1]} − ${s[0]} = ${e}`, d: `${sum(v)} ÷ ${n} ${sum(v) / n === m ? '=' : '≈'} ${fr(m)}` });
    return { titre: 'Médiane et étendue', consigne: `Durées (en minutes) de ${n} films vus par un ciné-club (fictif).`,
      support: table(['Film', ...v.map((_, i) => String(i + 1))], [['Durée (min)', ...v.map(String)]]) + `<p class="tr-l">a. Plus petite durée : ${tb('a', String(s[0]), 12)} · b. Médiane : ${tb('b', fr(md), 12)}</p><p class="tr-l">c. Étendue : ${tb('c', String(e), 12)} · d. Moyenne, au dixième : ${tb('d', fr(m), 12)}</p>`, items,
      hints: ['Range d’abord les durées de la plus petite à la plus grande.', n % 2 ? 'Avec ' + n + ' valeurs, la médiane est la ' + (n + 1) / 2 + 'e valeur rangée.' : 'Avec ' + n + ' valeurs, la médiane est entre la ' + n / 2 + 'e et la ' + (n / 2 + 1) + 'e.', 'Étendue = plus grande − plus petite.'] };
  };

  /* e3 · lire un diagramme en barres */
  const JOURS = ['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.', 'dim.'];
  TR.c6e3 = R => {
    const v = JOURS.map(() => int(R, 4, 24) * 50), tot = sum(v), iM = v.indexOf(Math.max(...v)), i1 = int(R, 0, 6), i2 = (i1 + int(R, 1, 6)) % 7;
    const g = P.plot({ W: 560, H: 220, x: [0, 7, 1], y: [0, 1200, 100], ly: 2, ml: 52, mr: 12, mt: 12, mb: 28, fs: 11, yl: 'spectateurs', xt: JOURS.map((j, i) => [i + .5, j]), grid: true, cls: 'pic vis trs' });
    const bars = v.map((y, i) => `<rect x="${g.X(i + .15)}" y="${g.Y(y)}" width="${g.X(.7) - g.X(0)}" height="${g.Y(0) - g.Y(y)}" class="k2 ks" stroke-width="1.4"/>`).join('');
    const items = [num('a', v[iM], 0, String(v[iM])), num('b', v[i1] - v[i2], 0, fr(v[i1] - v[i2])), num('c', tot, 0, fr(tot)), num('d', rnd(v[iM] / tot * 100, 1), 1, fr(rnd(v[iM] / tot * 100, 1)) + ' %', [{ v: rnd(tot / v[iM], 1), m: 'Fréquence = effectif ÷ total, pas l’inverse.' }])];
    xs(items, { a: `la barre la plus haute est celle du ${JOURS[iM]} : ${v[iM]}`, b: `${v[i1]} − ${v[i2]} = ${fr(v[i1] - v[i2])}`, c: `${v.join(' + ')} = ${fr(tot)}`, d: `${v[iM]} ÷ ${fr(tot)} × 100 ≈ ${fr(rnd(v[iM] / tot * 100, 1))} %` });
    return { titre: 'Lire un diagramme en barres', consigne: 'Spectateurs d’un live de jeu vidéo (fictif), jour par jour. Lis les valeurs : elles tombent sur des multiples de 50.',
      support: g.wrap(g.base + bars) + `<p class="tr-l">a. Le plus grand nombre de spectateurs : ${tb('a', String(v[iM]), 12)} · b. Écart entre ${JOURS[i1]} et ${JOURS[i2]} : ${tb('b', fr(v[i1] - v[i2]), 12)}</p><p class="tr-l">c. Total de la semaine : ${tb('c', fr(tot), 14)} · d. Fréquence du meilleur jour, en %, au dixième : ${tb('d', fr(rnd(v[iM] / tot * 100, 1)), 12)}</p>`, items,
      hints: ['Lis le haut de chaque barre sur l’axe vertical : chaque ligne vaut 100.', 'Un écart peut être négatif si le second jour a plus de spectateurs.', 'Fréquence = effectif ÷ total × 100.'] };
  };
  if (typeof module !== 'undefined') module.exports = { SIMP, med, sum };
})(typeof module !== 'undefined' ? module.exports : window);
