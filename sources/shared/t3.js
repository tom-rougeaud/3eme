/* 3ème Série Pro · chapitre 3 — Calcul littéral et équations : développer, factoriser, prouver, résoudre une équation,
   équation produit nul. */
(function (root) {
  'use strict';
  const { DEP, TR, H } = typeof module !== 'undefined' ? require('./train.js').MCVT : root.MCVT;
  const { fr, eur, tb, sb, T, svg, table, num, qcm, pick, int, xs } = H;
  const sg = n => n < 0 ? '− ' + fr(-n) : '+ ' + fr(n);         // « + 3 » ou « − 3 »
  const rel = n => n < 0 ? '−' + fr(-n) : fr(n);                 // nombre relatif
  const par = n => n < 0 ? '(' + rel(n) + ')' : rel(n);           // entre parenthèses s’il est négatif
  const cx = k => (k === 1 ? '' : String(k)) + 'x';

  /* point de départ : les tarifs Netflix en France (depuis le 18 avril 2025) */
  DEP.c3 = R => {
    const n = pick(R, [3, 4, 5, 6, 8, 10]), k = int(R, 0, 2);
    const P = [['Standard avec pub', 7.99], ['Standard', 14.99], ['Premium', 21.99]];
    const doc = `<table class="dt tcx dt-sm"><thead><tr><th>Formule</th><th>Prix par mois</th></tr></thead><tbody>${P.map(([f, p], i) => `<tr><th>${f}</th><td data-cell="${i}">${eur(p)}</td></tr>`).join('')}</tbody></table><p class="srcl">Tarifs Netflix en France depuis le 18 avril 2025. Source : JeChange, page mise à jour le 30 septembre 2026.</p>`;
    return { titre: 'Trois formules de streaming', doc,
      qs: [{ t: `Touche le prix mensuel de la formule ${P[k][0]}.`, kind: 'tap', cell: String(k), v: P[k][1], tol: .001, a: eur(P[k][1]) },
        { t: `Combien coûtent ${n} mois de Standard avec pub ?`, kind: 'num', v: +(7.99 * n).toFixed(2), tol: .006, a: eur(7.99 * n), x: `7,99 × ${n} = ${fr(7.99 * n, 2)} €` },
        { t: 'Quelle expression donne le prix de x mois de Standard ?', kind: 'qcm', choices: ['14,99x', '14,99 + x', 'x ÷ 14,99'], ok: 0, a: '14,99x', x: 'le prix est proportionnel au nombre de mois : 14,99 × x = 14,99x' },
        { t: 'Combien d’euros de plus par mois coûte le Standard par rapport au Standard avec pub ?', kind: 'num', v: 7, tol: .006, a: '7 €', x: '14,99 − 7,99 = 7 €' },
        { t: `Et le Premium par rapport au Standard ?`, kind: 'num', v: 7, tol: .006, a: '7 €', x: '21,99 − 14,99 = 7 €' }] };
  };

  /* e1 · le rectangle découpé : (x + a)(x + b) */
  TR.c3e1 = R => {
    const a = int(R, 2, 7), b = int(R, 1, 6), t = int(R, 3, 9);
    const W = 600, x0 = 70, y0 = 30, wx = 220, wa = 30 + a * 12, hx = 110, hb = 34 + b * 6;
    let s = `<rect x="${x0}" y="${y0}" width="${wx}" height="${hx}" class="k2 ks" stroke-width="2"/><rect x="${x0 + wx}" y="${y0}" width="${wa}" height="${hx}" class="wh ks" stroke-width="2"/><rect x="${x0}" y="${y0 + hx}" width="${wx}" height="${hb}" class="wh ks" stroke-width="2"/><rect x="${x0 + wx}" y="${y0 + hx}" width="${wa}" height="${hb}" class="k2 ks" stroke-width="2" opacity=".5"/>`;
    s += T(x0 + wx / 2, y0 - 8, 'x', { fs: 15 }) + T(x0 + wx + wa / 2, y0 - 8, String(a), { fs: 15 }) + T(x0 - 14, y0 + hx / 2 + 5, 'x', { fs: 15 }) + T(x0 - 14, y0 + hx + hb / 2 + 5, String(b), { fs: 15 });
    s += T(x0 + wx / 2, y0 + hx / 2 + 6, 'x²', { fs: 18 }) + sb(x0 + wx + wa / 2 - 26, y0 + hx / 2 - 13, 52, 'a', a + 'x') + T(x0 + wx / 2, y0 + hx + hb / 2 + 6, cx(b), { fs: 15 }) + sb(x0 + wx + wa / 2 - 24, y0 + hx + hb / 2 - 13, 48, 'b', String(a * b));
    const v = (t + a) * (t + b);
    const items = [num('a', a, 0, a + 'x', [{ v: a + 1, m: 'Le morceau mesure x sur ' + a + ' : son aire est ' + a + ' × x.' }]), num('b', a * b, 0, String(a * b), [{ v: a + b, m: 'Le petit rectangle mesure ' + a + ' sur ' + b + ' : on multiplie.' }]),
      num('c', a + b, 0, String(a + b), [{ v: a * b, m: 'On réduit les termes en x : ' + b + 'x + ' + a + 'x.' }]), num('d', v, 0, String(v), [{ v: t * t + a * b, m: 'N’oublie pas les termes en x : ' + (a + b) + ' × ' + t + '.' }])];
    xs(items, { a: `x × ${a} = ${a}x`, b: `${a} × ${b} = ${a * b}`, c: `x² + ${cx(b)} + ${a}x + ${a * b} = x² + ${a + b}x + ${a * b}`, d: `${t}² + ${a + b} × ${t} + ${a * b} = ${t * t} + ${(a + b) * t} + ${a * b} = ${v} ; et (${t} + ${a})(${t} + ${b}) = ${t + a} × ${t + b} = ${v}` });
    return { titre: 'Le rectangle découpé', consigne: `Un poster (fictif) mesure (x + ${a}) sur (x + ${b}). On le découpe en quatre rectangles pour développer son aire.`,
      support: svg(W, y0 + hx + hb + 10, s, 'Rectangle découpé en quatre') + `<p class="tr-l">c. (x + ${a})(x + ${b}) = x² + ${tb('c', String(a + b), 10)} x + ${a * b}</p><p class="tr-l">d. Aire pour x = ${t} : ${tb('d', String(v), 14)}</p>`, items,
      hints: ['L’aire d’un rectangle : longueur × largeur.', 'On additionne les quatre morceaux, puis on regroupe les termes en x.', 'Pour vérifier, remplace x par ' + t + ' dans les deux écritures.'] };
  };

  /* e2 · la balance des équations : ax + b = cx + d */
  TR.c3e2 = R => {
    let a, c, x, b, d;
    do { c = int(R, 1, 5); a = c + int(R, 2, 6); x = int(R, -4, 9); b = int(R, -9, 12); d = (a - c) * x + b; } while (x === 0 || d === b || Math.abs(d) > 60);
    const lhs = `${a}x ${sg(b)}`, rhs = `${c}x ${sg(d)}`;
    const items = [num('a', a - c, 0, String(a - c), [{ v: a + c, m: 'On enlève ' + c + 'x des deux côtés : ' + a + 'x − ' + c + 'x.' }]), num('b', d - b, 0, rel(d - b), [{ v: d + b, m: 'On enlève ' + rel(b) + ' des deux côtés : ' + rel(d) + ' − ' + par(b) + '.' }]),
      num('c', x, 0, rel(x), [{ v: (d - b) * (a - c), m: 'On divise par ' + (a - c) + ', on ne multiplie pas.' }]), num('d', a * x + b, 0, rel(a * x + b))];
    xs(items, { a: `${a}x − ${c}x = ${a - c}x`, b: `${rel(d)} − ${par(b)} = ${rel(d - b)}`, c: `${a - c}x = ${rel(d - b)}, donc x = ${rel(d - b)} ÷ ${a - c} = ${rel(x)}`, d: `${a} × ${par(x)} ${sg(b)} = ${rel(a * x + b)} et ${c} × ${par(x)} ${sg(d)} = ${rel(c * x + d)} : les deux membres sont égaux` });
    return { titre: 'Résoudre une équation', consigne: `Résous l’équation ${lhs} = ${rhs} en suivant les étapes.`,
      support: table(['Étape', 'Ce que j’écris'], [['Je regroupe les x à gauche', `${tb('a', String(a - c), 10)} x ${sg(b)} = ${rel(d)}`], ['Je regroupe les nombres à droite', `${a - c}x = ${tb('b', rel(d - b), 12)}`], ['Je divise', `x = ${tb('c', rel(x), 12)}`], ['Je vérifie (membre de gauche)', `${a} × ${par(x)} ${sg(b)} = ${tb('d', rel(a * x + b), 12)}`]]), items,
      hints: ['On enlève ' + c + 'x des deux côtés pour regrouper les x à gauche.', 'Puis on enlève ' + rel(b) + ' des deux côtés.', 'Enfin, on divise les deux membres par le nombre devant x.'] };
  };

  /* e3 · les programmes de calcul */
  TR.c3e3 = R => {
    const p = int(R, 2, 6), m = pick(R, [2, 3, 4, 5]), q = int(R, 1, 9), n1 = int(R, 2, 8), n2 = -int(R, 1, 5), Rr = int(R, 2, 9);
    const f = n => (n + p) * m - q, target = f(Rr);
    const items = [num('a', f(n1), 0, rel(f(n1))), num('b', f(n2), 0, rel(f(n2)), [{ v: (Math.abs(n2) + p) * m - q, m: 'Attention au signe : on part de ' + rel(n2) + '.' }]),
      num('c', m, 0, String(m)), num('d', m * p - q, 0, rel(m * p - q), [{ v: p - q, m: 'Développe : ' + m + ' × (x + ' + p + ') = ' + m + 'x + ' + m * p + '.' }]),
      num('e', Rr, 0, String(Rr), [{ v: target, m: 'On cherche le nombre de départ : résous ' + m + 'x ' + sg(m * p - q) + ' = ' + target + '.' }])];
    xs(items, { a: `${n1} + ${p} = ${n1 + p} ; × ${m} = ${(n1 + p) * m} ; − ${q} = ${f(n1)}`, b: `${rel(n2)} + ${p} = ${rel(n2 + p)} ; × ${m} = ${rel((n2 + p) * m)} ; − ${q} = ${rel(f(n2))}`, c: `${m}(x + ${p}) − ${q} = ${m}x + ${m * p} − ${q}`, d: `${m * p} − ${q} = ${rel(m * p - q)} : le programme donne ${m}x ${sg(m * p - q)}`, e: `${m}x ${sg(m * p - q)} = ${target}, donc ${m}x = ${target - (m * p - q)} et x = ${Rr}` });
    return { titre: 'Le programme de calcul', consigne: `Programme : choisir un nombre, lui ajouter ${p}, multiplier par ${m}, puis soustraire ${q}.`,
      support: table(['Nombre de départ', 'Résultat'], [[String(n1), tb('a', rel(f(n1)), 12)], [rel(n2), tb('b', rel(f(n2)), 12)]]) + `<p class="tr-l">Avec x : ${m}(x + ${p}) − ${q} = ${tb('c', String(m), 10)} x + ${tb('d', rel(m * p - q), 12)}</p><p class="tr-l">e. Quel nombre de départ donne ${target} ? ${tb('e', String(Rr), 12)}</p>`, items,
      hints: ['Applique les étapes dans l’ordre, avec la calculatrice si besoin.', 'Avec une lettre : x + ' + p + ', puis ' + m + '(x + ' + p + '), puis on enlève ' + q + '.', 'Pour trouver le départ, écris l’équation et résous-la.'] };
  };
})(typeof module !== 'undefined' ? module.exports : window);
