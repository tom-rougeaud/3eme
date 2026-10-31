/* 3ème Série Pro · chapitre 1 — Nombres entiers et arithmétique : multiples, diviseurs, critères de divisibilité,
   nombres premiers, décomposition en produit de facteurs premiers, fraction irréductible, partage en lots identiques. */
(function (root) {
  'use strict';
  const { DEP, TR, H } = typeof module !== 'undefined' ? require('./train.js').MCVT : root.MCVT;
  const { fr, tb, sb, T, svg, table, num, qcm, pick, int, xs } = H;
  const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  const sup = n => String(n).split('').map(c => SUP[c]).join('');
  /* décomposition en produit de facteurs premiers : [[p, e], …] */
  const dec = n => { const out = []; let m = n; for (let p = 2; p * p <= m; p++) { let e = 0; while (m % p === 0) { m /= p; e++; } if (e) out.push([p, e]); } if (m > 1) out.push([m, 1]); return out; };
  const decTxt = n => dec(n).map(([p, e]) => e > 1 ? p + sup(e) : String(p)).join(' × ');
  const divs = n => { const d = []; for (let k = 1; k <= n; k++) if (n % k === 0) d.push(k); return d; };
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const isPrime = n => n > 1 && dec(n).length === 1 && dec(n)[0][1] === 1;
  const sumDigits = n => String(n).split('').reduce((a, c) => a + +c, 0);
  H.arith = { dec, decTxt, divs, gcd, isPrime, sup, sumDigits };

  /* point de départ : ranger des cartes dans un classeur de 9 pochettes par page */
  DEP.c1 = R => {
    const cols = pick(R, [[126, 135, 140, 162], [117, 144, 150, 171], [108, 153, 160, 189]]), k = int(R, 0, 3), bad = cols.find(n => n % 9), good = cols.filter(n => n % 9 === 0)[0];
    const doc = `<table class="dt tcx dt-sm"><thead><tr><th>Collection</th><th>Nombre de cartes</th></tr></thead><tbody>${cols.map((n, i) => `<tr><th>${['Ava', 'Bilal', 'Chloé', 'Dany'][i]}</th><td data-cell="${i}">${n}</td></tr>`).join('')}</tbody></table><p class="srcl">Un classeur range 9 cartes par page.</p>`;
    const rest = bad % 9, pages = Math.ceil(bad / 9);
    return { titre: 'Des cartes à ranger, 9 par page', doc,
      qs: [{ t: `Combien de cartes a ${['Ava', 'Bilal', 'Chloé', 'Dany'][k]} ?`, kind: 'tap', cell: String(k), v: cols[k], tol: .01, a: String(cols[k]) },
        { t: `Combien de pages pleines remplissent ${good} cartes ?`, kind: 'num', v: good / 9, tol: .01, a: String(good / 9), x: `${good} ÷ 9 = ${good / 9}` },
        { t: `${bad} cartes : combien en reste-t-il sur la dernière page, pas pleine ?`, kind: 'num', v: rest, tol: .01, a: String(rest), x: `${bad} = 9 × ${Math.floor(bad / 9)} + ${rest} : il reste ${rest} carte${rest > 1 ? 's' : ''}` },
        { t: `Combien de pages faut-il pour ranger les ${bad} cartes ?`, kind: 'num', v: pages, tol: .01, a: String(pages), x: `${Math.floor(bad / 9)} pages pleines + 1 page pour les ${rest} dernières : ${pages}` },
        { t: `9 est-il un diviseur de ${good} ?`, kind: 'qcm', choices: ['oui', 'non'], ok: 0, a: `oui : ${good} = 9 × ${good / 9}` }] };
  };

  /* e1 · les critères de divisibilité */
  const POOL = [126, 135, 140, 150, 162, 171, 180, 225, 234, 245, 252, 270, 315, 330, 342, 405, 432, 486, 510, 525, 612, 702, 735, 810, 945];
  TR.c1e1 = R => {
    const ns = H.shuffle(R, POOL).slice(0, 3);
    const [n1, n2, n3] = ns, s1 = sumDigits(n1);
    const yn = b => b ? 0 : 1;
    const items = [num('a', s1, 0, String(s1), [{ v: n1 % 9, m: 'On additionne les chiffres : ' + String(n1).split('').join(' + ') + '.' }]),
      qcm('b', ['oui', 'non'], yn(n1 % 3 === 0), n1 % 3 === 0 ? `oui : ${s1} est dans la table de 3` : `non : ${s1} n’est pas dans la table de 3`),
      qcm('c', ['oui', 'non'], yn(n1 % 9 === 0), n1 % 9 === 0 ? `oui : ${s1} est dans la table de 9` : `non : ${s1} n’est pas dans la table de 9`),
      qcm('d', ['oui', 'non'], yn(n2 % 2 === 0), n2 % 2 === 0 ? `oui : ${n2} se termine par ${n2 % 10}, un chiffre pair` : `non : ${n2} se termine par ${n2 % 10}, un chiffre impair`),
      qcm('e', ['oui', 'non'], yn(n2 % 5 === 0), n2 % 5 === 0 ? `oui : ${n2} se termine par 0 ou 5` : `non : ${n2} ne se termine ni par 0 ni par 5`),
      qcm('f', ['oui', 'non'], yn(n3 % 10 === 0), n3 % 10 === 0 ? `oui : ${n3} se termine par 0` : `non : ${n3} ne se termine pas par 0`)];
    xs(items, { a: `${String(n1).split('').join(' + ')} = ${s1}` });
    return { titre: 'Les critères de divisibilité', consigne: 'Sans poser de division, utilise les critères pour répondre.',
      support: table(['Critère', 'Le nombre est divisible si…'], [['par 2', 'son dernier chiffre est pair (0, 2, 4, 6, 8)'], ['par 5', 'son dernier chiffre est 0 ou 5'], ['par 10', 'son dernier chiffre est 0'], ['par 3', 'la somme de ses chiffres est dans la table de 3'], ['par 9', 'la somme de ses chiffres est dans la table de 9']])
        + `<p class="tr-l">a. Somme des chiffres de ${n1} : ${tb('a', String(s1), 12)}</p><p class="tr-l">b. ${n1} est-il divisible par 3 ? · c. par 9 ?</p><p class="tr-l">d. ${n2} est-il divisible par 2 ? · e. par 5 ?</p><p class="tr-l">f. ${n3} est-il divisible par 10 ?</p>`, items,
      hints: ['Pour 3 et 9, additionne tous les chiffres du nombre.', 'Pour 2, 5 et 10, regarde seulement le dernier chiffre.', 'Un nombre divisible par 9 est aussi divisible par 3.'] };
  };

  /* e2 · l’arbre de décomposition */
  const TREES = [[360, [2, 180], [2, 90], [2, 45], [3, 15], [3, 5]], [252, [2, 126], [2, 63], [3, 21], [3, 7]], [300, [2, 150], [2, 75], [3, 25], [5, 5]], [420, [2, 210], [2, 105], [3, 35], [5, 7]], [504, [2, 252], [2, 126], [2, 63], [3, 21], [3, 7]], [600, [2, 300], [2, 150], [2, 75], [3, 25], [5, 5]], [792, [2, 396], [2, 198], [2, 99], [3, 33], [3, 11]]];
  TR.c1e2 = R => {
    const [N, ...st] = pick(R, TREES), D = dec(N);
    // l’escalier des divisions : N | p, quotient… ; deux cases à compléter dans l’escalier
    const rows = [[N, st[0][0]], ...st.map(([p, q], i) => [q, st[i + 1] ? st[i + 1][0] : q])].slice(0, st.length + 1);
    const W = 600, rh = 30, Ht = 24 + (st.length + 1) * rh;
    const kq = 1, kp = st.length - 1; // case a : un quotient ; case b : un facteur
    let s = `<line x1="300" y1="14" x2="300" y2="${Ht - 6}" stroke="#1D2240" stroke-width="2.4"/>` + T(200, 14, 'nombre', { fs: 12, c: 'ts' }) + T(380, 14, 'facteur premier', { fs: 12, c: 'ts' });
    const lastQ = st[st.length - 1][1];
    const all = [N, ...st.map(x => x[1])];
    all.forEach((v, i) => { const y = 38 + i * rh, fac = i < st.length ? st[i][0] : (v === 1 ? null : v);
      s += (i === kq ? sb(232, y - 20, 120 - 66, 'a', fr(v), 26) : T(280, y, fr(v), { fs: 16, a: 'end' }));
      if (i < st.length) s += (i === kp ? sb(316, y - 20, 54, 'b', String(st[i][0]), 26) : T(320, y, String(st[i][0]), { fs: 16, a: 'start', c: 'kt' }));
      else s += T(320, y, String(v), { fs: 16, a: 'start', c: 'kt' }) + T(380, y, '← premier : on s’arrête', { fs: 12, a: 'start', c: 'ts' }); });
    const exps = D.map(([p, e]) => e), primes = D.map(([p]) => p);
    const items = [num('a', st[kq - 1][1], 0, fr(st[kq - 1][1]), [{ v: N / st[0][0] / 2, m: 'Divise le nombre de la ligne précédente par son facteur.' }]),
      num('b', st[kp][0], 0, String(st[kp][0]), [{ v: 1, m: '1 n’est pas un nombre premier : on cherche le plus petit nombre premier qui divise.' }]),
      num('c', exps[0], 0, String(exps[0]), [{ v: 2 * exps[0], m: 'L’exposant compte combien de fois le facteur 2 apparaît.' }]),
      num('d', D.length, 0, String(D.length))];
    xs(items, { a: `${fr(all[kq - 1])} ÷ ${st[kq - 1][0]} = ${fr(all[kq])}`, b: `${fr(all[kp])} ÷ ${st[kp][0]} = ${st[kp][1]} : ${st[kp][0]} est le plus petit nombre premier qui divise ${fr(all[kp])}`, c: `${N} = ${decTxt(N)} : le facteur 2 apparaît ${exps[0]} fois`, d: `facteurs premiers différents : ${primes.join(', ')}` });
    return { titre: 'L’escalier des divisions', consigne: `On décompose ${fr(N)} en divisant toujours par le plus petit nombre premier possible. Complète l’escalier, puis la décomposition.`,
      support: svg(W, Ht, s, 'Escalier des divisions successives') + `<p class="tr-l">${fr(N)} = 2${'<sup>c</sup>'} × … : c. exposant du facteur 2 : ${tb('c', String(exps[0]), 10)} · d. nombre de facteurs premiers différents : ${tb('d', String(D.length), 10)}</p>`, items,
      hints: ['Essaie 2, puis 3, puis 5, puis 7… : ce sont les premiers nombres premiers.', 'À chaque ligne, le nouveau nombre est le quotient de la ligne du dessus.', 'On s’arrête quand le quotient est un nombre premier.'] };
  };

  /* e3 · des lots identiques : diviseurs communs */
  const PAIRS = [[126, 84], [90, 60], [120, 72], [144, 96], [105, 70], [150, 90], [96, 72], [180, 126], [140, 84], [168, 120]];
  TR.c1e3 = R => {
    const [A, B] = pick(R, PAIRS), g = gcd(A, B), com = divs(g), ctx = pick(R, [['cartes promo', 'badges'], ['stickers', 'posters'], ['figurines', 'porte-clés']]);
    const lst = n => divs(n).map(d => com.includes(d) ? `<b>${d}</b>` : String(d)).join(' · ');
    const items = [num('a', g, 0, String(g), [{ v: com[com.length - 2], m: 'Ce diviseur est commun, mais ce n’est pas le plus grand.' }, { v: Math.min(A, B), m: Math.min(A, B) + ' ne divise pas ' + Math.max(A, B) + ' : il n’est pas commun aux deux listes.' }]),
      num('b', A / g, 0, String(A / g), [{ v: g, m: 'C’est le nombre de lots. On demande le nombre de ' + ctx[0] + ' dans chaque lot : ' + A + ' ÷ ' + g + '.' }]),
      num('c', B / g, 0, String(B / g)),
      qcm('d', ['oui', 'non'], (A % 4 === 0 && B % 4 === 0) ? 0 : 1, (A % 4 === 0 && B % 4 === 0) ? `oui : 4 divise ${A} et ${B}` : `non : 4 ne divise pas ${A % 4 ? A : B}`)];
    xs(items, { a: `diviseurs communs : ${com.join(', ')} ; le plus grand est ${g}`, b: `${A} ÷ ${g} = ${A / g}`, c: `${B} ÷ ${g} = ${B / g}`, d: `${A} ÷ 4 = ${A % 4 ? fr(A / 4) : A / 4} et ${B} ÷ 4 = ${B % 4 ? fr(B / 4) : B / 4}` });
    return { titre: 'Des lots identiques', consigne: `Un club fait des lots identiques avec ${A} ${ctx[0]} et ${B} ${ctx[1]}, sans rien laisser. Les diviseurs communs sont en gras.`,
      support: table(['Nombre', 'Ses diviseurs'], [[String(A), lst(A)], [String(B), lst(B)]]) + `<p class="tr-l">a. Nombre maximal de lots : ${tb('a', String(g), 12)}</p><p class="tr-l">Dans chaque lot : b. ${tb('b', String(A / g), 10)} ${ctx[0]} et c. ${tb('c', String(B / g), 10)} ${ctx[1]}</p><p class="tr-l">d. Peut-on faire exactement 4 lots identiques ?</p>`, items,
      hints: ['Un nombre de lots possible divise les deux quantités.', 'Le plus grand diviseur commun donne le nombre maximal de lots.', 'Dans chaque lot : quantité ÷ nombre de lots.'] };
  };
  if (typeof module !== 'undefined') module.exports = { dec, decTxt, divs, gcd, isPrime };
  /* ===== exercices ajoutés : notions 2 et 4 ===== */
  {
    const { Q, fr, pick, int, shuffle, table } = H, { gcd, decTxt } = H.arith, MCF = H.MC.frac;
    /* e4 · nombres premiers */
    TR.c1e4 = R => {
      const PR = shuffle(R, [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]), CO = shuffle(R, [21, 27, 33, 39, 49, 51, 57, 63, 65, 69, 77, 81, 85, 87, 91, 93, 95]);
      const np = pick(R, [2, 3]), pr = PR.slice(0, np), co = CO.slice(0, 5 - np), all = shuffle(R, pr.concat(co));
      const small = n => { for (let p = 2; p * p <= n; p++) if (n % p === 0) return p; return n; };
      const c1 = co[0], f1 = small(c1), big = Math.max(...pr);
      const why = n => H.arith.isPrime(n) ? `${n} est premier (ni 2, ni 3, ni 5, ni 7 ne le divisent)` : `${n} = ${small(n)} × ${n / small(n)} : pas premier`;
      return Q('Nombres premiers', 'Voici cinq nombres. Pour chacun, cherche s’il a un diviseur autre que 1 et lui-même.', [
        { lab: 'Combien de ces nombres sont premiers ?', v: np, d: 0, w: 12, x: all.map(why).join(' ; ') + ` : ${np} nombres premiers.`, err: [{ v: 5 - np, m: 'Tu as compté les nombres qui ne sont pas premiers.' }] },
        { lab: 'Le plus grand nombre premier de la liste', v: big, d: 0, w: 12, x: `Les nombres premiers de la liste sont ${pr.slice().sort((a, b) => a - b).join(', ')} : le plus grand est ${big}.` },
        { lab: `Le plus petit diviseur de ${c1} autre que 1`, v: f1, d: 0, w: 12, x: `${c1} = ${f1} × ${c1 / f1}. On essaie 2, 3, 5, 7 : le plus petit qui divise ${c1} est ${f1}.`, err: [{ v: c1, m: 'Cherche un diviseur plus petit que le nombre lui-même.' }] },
        { lab: 'Le nombre 1 est-il premier ?', qcm: ['oui', 'non'], ok: 1, x: '1 n’a qu’un seul diviseur, lui-même : un nombre premier en a exactement deux (1 et lui-même). 1 n’est pas premier.' },
        { lab: 'Le seul nombre premier pair est', v: 2, d: 0, w: 12, x: 'Tout nombre pair plus grand que 2 est divisible par 2 : il a au moins trois diviseurs (1, 2 et lui-même). Seul 2 est premier et pair.' }],
        ['Un nombre premier a exactement deux diviseurs : 1 et lui-même.', 'Essaie de diviser par 2, 3, 5 puis 7 : si aucun ne convient, le nombre est premier (jusqu’à 100).', '1 n’est pas premier, et 2 est le seul premier pair.'],
        table(['Liste', 'Les cinq nombres'], [['À étudier', all.join(' · ')]]));
    };
    /* e5 · rendre une fraction irréductible */
    TR.c1e5 = R => {
      const g = pick(R, [2, 3, 4, 5, 6, 7]), [p, q] = pick(R, [[2, 3], [3, 4], [3, 5], [5, 6], [4, 7], [5, 8], [7, 9], [5, 7], [7, 10], [8, 9]]), n = g * p, d = g * q;
      const [p2, q2] = pick(R, [[7, 12], [9, 14], [11, 15], [12, 18], [15, 20], [14, 21], [18, 27], [16, 24], [21, 35], [25, 40], [13, 20], [8, 15]]), g2 = gcd(p2, q2);
      return Q('Fraction irréductible', `Simplifie la fraction ${MCF(n, d)} pour la rendre irréductible.`, [
        { lab: `Le plus grand diviseur commun de ${n} et ${d}`, v: g, d: 0, w: 12, x: `${n} = ${decTxt(n)} et ${d} = ${decTxt(d)} : le plus grand diviseur commun est ${g}.`, err: [{ v: 1, m: `${n} et ${d} ont un diviseur commun plus grand que 1.` }] },
        { lab: 'Numérateur de la fraction irréductible', v: p, d: 0, w: 12, x: `${n} ÷ ${g} = ${p}`, err: [{ v: n, m: 'Divise le numérateur par le diviseur commun.' }] },
        { lab: 'Dénominateur de la fraction irréductible', v: q, d: 0, w: 12, x: `${d} ÷ ${g} = ${q} : ${MCF(n, d)} = ${MCF(p, q)}`, err: [{ v: d, m: 'Divise aussi le dénominateur par le diviseur commun.' }] },
        { lab: `La fraction ${MCF(p2, q2)} est-elle irréductible ?`, qcm: ['oui', 'non'], ok: g2 === 1 ? 0 : 1, x: g2 === 1 ? `${p2} et ${q2} n’ont aucun diviseur commun autre que 1 : la fraction est irréductible.` : `${p2} et ${q2} sont tous deux divisibles par ${g2} : on peut simplifier, la fraction n’est pas irréductible.` }],
        ['Cherche les diviseurs communs du numérateur et du dénominateur.', 'Divise en haut et en bas par le même nombre.', 'Une fraction est irréductible quand le seul diviseur commun est 1.'],
        table(['Fraction à simplifier'], [[MCF(n, d)]]));
    };
  }
})(typeof module !== 'undefined' ? module.exports : window);
