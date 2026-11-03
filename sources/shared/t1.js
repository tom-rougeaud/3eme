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
        + `<p class="tr-l">a. Somme des chiffres de ${n1} : ${tb('a', String(s1), 12)}</p><p class="tr-l">b. ${n1} est-il divisible par 3 ?</p><p class="tr-l">c. ${n1} est-il divisible par 9 ?</p><p class="tr-l">d. ${n2} est-il divisible par 2 ?</p><p class="tr-l">e. ${n2} est-il divisible par 5 ?</p><p class="tr-l">f. ${n3} est-il divisible par 10 ?</p>`, items,
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
  /* ===== niveaux 🌱 guidé et 🚀 défi · chapitre 1 ===== */
  {
    const { Q, AI, fr, pick, int, shuffle, table } = H, { gcd, decTxt, dec, divs, isPrime, sumDigits } = H.arith, MCF = H.MC.frac;
    const digs = n => String(n).split('').join(' + ');
    /* e1 · critères de divisibilité */
    TR.c1e1a = R => {
      const [n1] = shuffle(R, [24, 36, 45, 54, 63, 72, 81, 90, 27, 18, 48, 42]), n2 = pick(R, [35, 42, 60, 75, 48, 90, 55, 64]), s1 = sumDigits(n1);
      return Q('Les critères de divisibilité, pas à pas', 'Sans poser de division, utilise les critères. Pour 3 et 9, additionne les chiffres.', [
        { lab: `Somme des chiffres de ${n1}`, v: s1, d: 0, w: 12, x: `${digs(n1)} = ${s1}`, err: [{ v: n1 % 9, m: 'Additionne tous les chiffres : ' + digs(n1) + '.' }] },
        { lab: `${n1} est-il divisible par 3 ?`, qcm: ['oui', 'non'], ok: s1 % 3 === 0 ? 0 : 1, x: `${s1} ${s1 % 3 === 0 ? 'est' : 'n’est pas'} dans la table de 3 : ${n1} ${s1 % 3 === 0 ? 'est' : 'n’est pas'} divisible par 3.` },
        { lab: `${n1} est-il divisible par 9 ?`, qcm: ['oui', 'non'], ok: s1 % 9 === 0 ? 0 : 1, x: `${s1} ${s1 % 9 === 0 ? 'est' : 'n’est pas'} dans la table de 9 : ${n1} ${s1 % 9 === 0 ? 'est' : 'n’est pas'} divisible par 9.` },
        { lab: `${n2} est-il divisible par 5 ?`, qcm: ['oui', 'non'], ok: n2 % 5 === 0 ? 0 : 1, x: `${n2} se termine par ${n2 % 10} : ${n2 % 5 === 0 ? 'divisible' : 'pas divisible'} par 5.` }],
        ['Pour 3 et 9, additionne tous les chiffres du nombre.', 'Si la somme est dans la table de 3 (ou de 9), le nombre est divisible par 3 (ou par 9).', 'Pour 5, regarde seulement le dernier chiffre.'],
        table(['Critère', 'Le nombre est divisible si…'], [['par 3', 'la somme de ses chiffres est dans la table de 3'], ['par 9', 'la somme de ses chiffres est dans la table de 9'], ['par 5', 'son dernier chiffre est 0 ou 5']]) + AI('pour 48 : 4 + 8 = 12 ; 12 est dans la table de 3, donc 48 est divisible par 3 ; 12 n’est pas dans la table de 9, donc 48 n’est pas divisible par 9.'));
    };
    TR.c1e1d = R => {
      let a, b; do { a = int(R, 1, 9); b = int(R, 0, 9); } while ((a + b) % 9 === 0);
      const x3 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(x => (a + b + x) % 3 === 0), x9 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].find(x => (a + b + x) % 9 === 0), s = a + b, e1 = int(R, 1, 9), e2 = int(R, 1, 9);
      return Q('Le chiffre caché', `Un chiffre est caché par un point d’interrogation. Il faut trouver les chiffres possibles. Nombre à 3 chiffres : ${a}<b>?</b>${b}.`, [
        { lab: `Plus petit chiffre qui rend ${a}?${b} divisible par 3`, v: x3[0], d: 0, w: 12, x: `${a} + ${b} = ${s} ; il faut que ${s} + ? soit dans la table de 3 : le plus petit chiffre est ${x3[0]}.`, err: [{ v: x3[x3.length - 1], m: 'Tu as donné le plus grand. Cherche le plus petit.' }] },
        { lab: `Plus grand chiffre qui rend ${a}?${b} divisible par 3`, v: x3[x3.length - 1], d: 0, w: 12, x: `Les chiffres possibles sont ${x3.join(', ')} : le plus grand est ${x3[x3.length - 1]}.`, err: [{ v: x3[0], m: 'Tu as donné le plus petit. Cherche le plus grand.' }] },
        { lab: `Le chiffre qui rend ${a}?${b} divisible par 9`, v: x9, d: 0, w: 12, x: `${s} + ? doit être dans la table de 9 : ${s} + ${x9} = ${s + x9}. Le chiffre est ${x9}.`, err: [{ v: x3[0], m: 'Ce chiffre donne un multiple de 3, mais pas de 9.' }] },
        { lab: `Chiffre qui rend ${e1}${e2}? divisible par 2 et par 5 à la fois`, v: 0, d: 0, w: 12, x: 'Divisible par 2 : dernier chiffre pair ; par 5 : dernier chiffre 0 ou 5. Seul 0 convient.', err: [{ v: 5, m: '5 est divisible par 5 mais pas par 2.' }] },
        { lab: 'Un nombre divisible par 2 et par 5 est aussi divisible par', qcm: ['10', '4', '7'], ok: 0, x: '2 × 5 = 10 : un nombre divisible par 2 et par 5 se termine par 0, il est divisible par 10.' }],
        ['Pour 3 : (somme des chiffres connus + chiffre caché) doit être dans la table de 3.', 'Pour 9 : même idée avec la table de 9.', 'Pour 2 et 5 : seul le dernier chiffre compte.']);
    };
    /* e2 · l’escalier des divisions */
    const stairs = n => { const st = []; let m = n; for (let p = 2; m > 1; p++) while (m % p === 0) { st.push([p, m / p]); m /= p; } return st; };
    TR.c1e2a = R => {
      const N = pick(R, [36, 60, 72, 90, 84, 40]), st = stairs(N), D = dec(N), e2 = D[0][1];
      const rows = [[String(N), String(st[0][0])], [String(st[0][1]), '?'], ['?', '?'], ['…', '…']];
      return Q('L’escalier des divisions, pas à pas', `On décompose ${N} en divisant toujours par le plus petit nombre premier possible. La première division est faite.`, [
        { lab: `Deuxième quotient (${st[0][1]} ÷ ${st[1][0]})`, v: st[1][1], d: 0, w: 12, x: `${st[0][1]} ÷ ${st[1][0]} = ${st[1][1]}`, err: [{ v: st[0][1], m: 'Divise ' + st[0][1] + ' par le facteur premier de la ligne 2.' }] },
        { lab: `Dernier facteur premier utilisé`, v: st[st.length - 1][0], d: 0, w: 12, x: `On s’arrête quand le quotient vaut 1 : la dernière division est par ${st[st.length - 1][0]}.`, err: [{ v: 1, m: '1 n’est pas un nombre premier : cherche le dernier diviseur utilisé.' }] },
        { lab: `Nombre de fois que le facteur ${D[0][0]} apparaît`, v: e2, d: 0, w: 12, x: `${N} = ${decTxt(N)} : le facteur ${D[0][0]} apparaît ${e2} fois.` },
        { lab: 'Nombre de facteurs premiers différents', v: D.length, d: 0, w: 12, x: `Facteurs premiers : ${D.map(d => d[0]).join(', ')} : ${D.length} différents.`, err: [{ v: st.length, m: 'Compte les facteurs différents, sans répéter ceux qui reviennent.' }] }],
        ['Divise toujours par le plus petit nombre premier possible : 2, puis 3, puis 5.', 'À chaque ligne, le nouveau nombre est le quotient de la ligne du dessus.', 'On s’arrête quand le quotient vaut 1.'],
        table(['Nombre', 'On divise par'], rows) + AI(`${N} ÷ ${st[0][0]} = ${st[0][1]} : le quotient devient le nombre de la ligne suivante.`));
    };
    TR.c1e2d = R => {
      const N = pick(R, [360, 420, 504, 540, 600, 756, 792]), D = dec(N), mult = D.filter(([p, e]) => e % 2).reduce((a, [p]) => a * p, 1), sq = N * mult;
      return Q('Décomposer, puis rendre un carré parfait', `Décompose ${fr(N)} en produit de facteurs premiers : ${fr(N)} = ${decTxt(N)}. Un carré parfait a tous ses exposants pairs.`, [
        { lab: `Exposant du facteur ${D[0][0]}`, v: D[0][1], d: 0, w: 12, x: `${fr(N)} = ${decTxt(N)} : le facteur ${D[0][0]} a pour exposant ${D[0][1]}.` },
        { lab: 'Nombre de facteurs premiers différents', v: D.length, d: 0, w: 12, x: `Les facteurs sont ${D.map(d => d[0]).join(', ')} : ${D.length} différents.`, err: [{ v: D.reduce((a, d) => a + d[1], 0), m: 'Compte chaque facteur une seule fois, sans tenir compte des exposants.' }] },
        { lab: `Plus petit nombre par lequel multiplier ${fr(N)} pour obtenir un carré parfait`, v: mult, d: 0, w: 12, x: `Exposants impairs : ${D.filter(([p, e]) => e % 2).map(([p, e]) => `${p}${e > 1 ? H.arith.sup(e) : ''}`).join(', ')}. Il manque un facteur ${D.filter(([p, e]) => e % 2).map(d => d[0]).join(' × ')} = ${mult} pour que tous les exposants soient pairs.`, err: [{ v: D.reduce((a, [p]) => a * p, 1), m: 'On ne complète que les facteurs dont l’exposant est impair.' }] },
        { lab: `Le carré parfait obtenu, ${fr(N)} × ${mult}`, v: sq, d: 0, w: 16, x: `${fr(N)} × ${mult} = ${fr(sq)}`, err: [{ v: N + mult, m: 'Multiplie, ne fais pas la somme.' }] }],
        ['Les exposants de la décomposition sont les petits nombres écrits en haut.', 'Pour un carré parfait, chaque exposant doit être pair.', 'Multiplie par les facteurs dont l’exposant est impair.']);
    };
    /* e3 · lots identiques */
    TR.c1e3a = R => {
      const [A, B] = pick(R, [[12, 18], [24, 36], [20, 30], [18, 27], [16, 24], [30, 45]]), g = gcd(A, B), com = divs(g), ctx = pick(R, [['cartes promo', 'badges'], ['stickers', 'posters'], ['figurines', 'porte-clés']]);
      const lst = n => divs(n).map(d => com.includes(d) ? `<b>${d}</b>` : String(d)).join(' · ');
      return Q('Des lots identiques, pas à pas', `Un club fait des lots identiques avec ${A} ${ctx[0]} et ${B} ${ctx[1]}, sans rien laisser. Les diviseurs communs sont en gras.`, [
        { lab: 'Nombre maximal de lots', v: g, d: 0, w: 12, x: `Diviseurs communs : ${com.join(', ')} ; le plus grand est ${g}.`, err: [{ v: com[com.length - 2], m: 'Ce diviseur est commun, mais pas le plus grand.' }] },
        { lab: `Nombre de ${ctx[0]} dans chaque lot`, v: A / g, d: 0, w: 12, x: `${A} ÷ ${g} = ${A / g}`, err: [{ v: g, m: 'C’est le nombre de lots. Divise ' + A + ' par ' + g + '.' }] },
        { lab: `Nombre de ${ctx[1]} dans chaque lot`, v: B / g, d: 0, w: 12, x: `${B} ÷ ${g} = ${B / g}` }],
        ['Un nombre de lots possible divise les deux quantités.', 'Le plus grand diviseur commun donne le nombre maximal de lots.', 'Dans chaque lot : quantité ÷ nombre de lots.'],
        table(['Nombre', 'Ses diviseurs'], [[String(A), lst(A)], [String(B), lst(B)]]) + AI('regarde les nombres en gras : ils sont dans les deux listes. Le plus grand est le nombre maximal de lots.'));
    };
    TR.c1e3d = R => {
      const [A, B, C] = pick(R, [[48, 72, 120], [60, 90, 150], [84, 126, 210], [36, 54, 90], [72, 108, 180]]), g = gcd(gcd(A, B), C), g2 = gcd(A, B);
      return Q('Trois quantités, des lots identiques', `Un magasin veut faire des lots identiques avec ${A} stylos, ${B} cahiers et ${C} gommes, sans rien laisser.`, [
        { lab: `Plus grand nombre de lots possibles avec les ${A} stylos et les ${B} cahiers seulement`, v: g2, d: 0, w: 12, x: `${A} = ${decTxt(A)} et ${B} = ${decTxt(B)} : le plus grand diviseur commun est ${g2}.` },
        { lab: 'Plus grand nombre de lots possibles avec les trois quantités', v: g, d: 0, w: 12, x: `${C} = ${decTxt(C)} : le plus grand diviseur commun aux trois nombres est ${g}.`, err: [{ v: g2, m: 'Ce nombre convient pour deux quantités. Il doit aussi diviser ' + C + '.' }] },
        { lab: 'Stylos dans chaque lot', v: A / g, d: 0, w: 12, x: `${A} ÷ ${g} = ${A / g}` },
        { lab: 'Cahiers dans chaque lot', v: B / g, d: 0, w: 12, x: `${B} ÷ ${g} = ${B / g}` },
        { lab: 'Gommes dans chaque lot', v: C / g, d: 0, w: 12, x: `${C} ÷ ${g} = ${C / g}` }],
        ['Le nombre de lots doit diviser chacune des trois quantités.', 'Décompose chaque nombre en facteurs premiers et garde les facteurs communs.', 'Dans chaque lot : quantité ÷ nombre de lots.'],
        table(['Article', 'Quantité'], [['Stylos', String(A)], ['Cahiers', String(B)], ['Gommes', String(C)]]));
    };
    /* e4 · nombres premiers */
    TR.c1e4a = R => {
      const P = pick(R, [11, 13, 17, 19, 23, 29, 31]), C = pick(R, [21, 27, 33, 35, 39, 49, 51, 55]), f = divs(C)[1];
      return Q('Nombres premiers, pas à pas', 'Un nombre premier a exactement deux diviseurs : 1 et lui-même.', [
        { lab: `Combien ${P} a-t-il de diviseurs ?`, v: 2, d: 0, w: 12, x: `${P} n’est divisible que par 1 et ${P} : 2 diviseurs.`, err: [{ v: 1, m: 'N’oublie pas 1 : il divise tous les nombres.' }] },
        { lab: `${P} est-il premier ?`, qcm: ['oui', 'non'], ok: 0, x: `${P} a exactement deux diviseurs : il est premier.` },
        { lab: `Plus petit diviseur de ${C} autre que 1`, v: f, d: 0, w: 12, x: `${C} = ${f} × ${C / f} : le plus petit diviseur autre que 1 est ${f}.`, err: [{ v: C, m: 'Cherche un diviseur plus petit que le nombre lui-même.' }] },
        { lab: `${C} est-il premier ?`, qcm: ['oui', 'non'], ok: 1, x: `${C} = ${f} × ${C / f} : il a plus de deux diviseurs, il n’est pas premier.` }],
        ['Un nombre premier a exactement deux diviseurs : 1 et lui-même.', 'Essaie de diviser par 2, 3, 5, 7.', 'Si un seul de ces nombres divise, le nombre n’est pas premier.'],
        AI('7 = 1 × 7 : seuls 1 et 7 le divisent, donc 7 est premier. 9 = 3 × 3 : 3 le divise, donc 9 n’est pas premier.') + table(['Nombre', 'Divisible par'], [['7', '1 et 7'], ['9', '1, 3 et 9']]));
    };
    TR.c1e4d = R => {
      const lo = pick(R, [20, 30, 40, 50]), hi = lo + 20, pr = []; for (let n = lo; n <= hi; n++) if (isPrime(n)) pr.push(n);
      const T = pick(R, [[51, 3], [57, 3], [87, 3], [91, 7], [119, 7], [133, 7], [143, 11]]);
      return Q('Chercher les nombres premiers', `Cherche les nombres premiers compris entre ${lo} et ${hi} (bornes comprises).`, [
        { lab: `Combien y a-t-il de nombres premiers entre ${lo} et ${hi} ?`, v: pr.length, d: 0, w: 12, x: `Nombres premiers entre ${lo} et ${hi} : ${pr.join(', ')} ; il y en a ${pr.length}.` },
        { lab: 'Le plus grand d’entre eux', v: pr[pr.length - 1], d: 0, w: 12, x: `Les nombres premiers de la liste sont ${pr.join(', ')} : le plus grand est ${pr[pr.length - 1]}.`, err: [{ v: pr[0], m: 'Tu as donné le plus petit.' }] },
        { lab: `${T[0]} est-il premier ?`, qcm: ['oui', 'non'], ok: 1, x: `${T[0]} = ${T[1]} × ${T[0] / T[1]} : il n’est pas premier, même s’il en a l’air.` },
        { lab: `Plus petit diviseur de ${T[0]} autre que 1`, v: T[1], d: 0, w: 12, x: `On essaie 2, 3, 5, 7, 11 : ${T[1]} divise ${T[0]}, et ${T[0]} ÷ ${T[1]} = ${T[0] / T[1]}.`, err: [{ v: T[0], m: 'Cherche un diviseur plus petit que le nombre lui-même.' }] }],
        ['Pour savoir si un nombre est premier, essaie de le diviser par 2, 3, 5, 7, 11.', 'Un nombre pair (sauf 2) n’est jamais premier.', 'Un nombre qui se termine par 5 (sauf 5) n’est jamais premier.']);
    };
    /* e5 · fractions irréductibles */
    TR.c1e5a = R => {
      const g = pick(R, [2, 3, 4, 5]), [p, q] = pick(R, [[2, 3], [3, 4], [3, 5], [5, 6], [2, 5], [3, 7]]), n = g * p, d = g * q;
      return Q('Simplifier une fraction, pas à pas', `Simplifie la fraction ${MCF(n, d)} pour la rendre irréductible.`, [
        { lab: `Plus grand diviseur commun de ${n} et ${d}`, v: g, d: 0, w: 12, x: `${n} = ${decTxt(n)} et ${d} = ${decTxt(d)} : le plus grand diviseur commun est ${g}.`, err: [{ v: 1, m: `${n} et ${d} ont un diviseur commun plus grand que 1.` }] },
        { lab: 'Numérateur de la fraction simplifiée', v: p, d: 0, w: 12, x: `${n} ÷ ${g} = ${p}`, err: [{ v: n, m: 'Divise le numérateur par le diviseur commun.' }] },
        { lab: 'Dénominateur de la fraction simplifiée', v: q, d: 0, w: 12, x: `${d} ÷ ${g} = ${q} : ${MCF(n, d)} = ${MCF(p, q)}`, err: [{ v: d, m: 'Divise aussi le dénominateur.' }] }],
        ['Cherche un nombre qui divise le numérateur et le dénominateur.', 'Divise en haut et en bas par ce nombre.', 'La fraction est irréductible quand le seul diviseur commun est 1.'],
        AI(`pour ${MCF(6, 8)} : 6 et 8 sont divisibles par 2 ; 6 ÷ 2 = 3 et 8 ÷ 2 = 4 ; donc ${MCF(6, 8)} = ${MCF(3, 4)}.`));
    };
    TR.c1e5d = R => {
      const g = pick(R, [12, 14, 15, 18, 21, 24]), [p, q] = pick(R, [[2, 3], [3, 4], [5, 6], [3, 7], [4, 9], [5, 8]]), n = g * p, d = g * q, k = pick(R, [2, 3, 4]), same = pick(R, [true, false]), p2 = same ? p * k : p * k + 1, q2 = q * k;
      return Q('Simplifier, puis comparer', `Une fraction ${MCF(n, d)} de la production est vendue. Rends-la irréductible, puis compare-la à ${MCF(p2, q2)}.`, [
        { lab: `Plus grand diviseur commun de ${n} et ${d}`, v: g, d: 0, w: 12, x: `${n} = ${decTxt(n)} et ${d} = ${decTxt(d)} : le plus grand diviseur commun est ${g}.`, err: [{ v: gcd(n, d) / 2, m: 'Prends le plus grand diviseur commun, pas un diviseur commun quelconque.' }] },
        { lab: 'Numérateur de la fraction irréductible', v: p, d: 0, w: 12, x: `${n} ÷ ${g} = ${p}` },
        { lab: 'Dénominateur de la fraction irréductible', v: q, d: 0, w: 12, x: `${d} ÷ ${g} = ${q} : ${MCF(n, d)} = ${MCF(p, q)}` },
        { lab: `${MCF(p2, q2)} est-elle égale à ${MCF(n, d)} ?`, qcm: ['oui', 'non'], ok: same ? 0 : 1, x: same ? `${MCF(p2, q2)} = ${MCF(p, q)} (on simplifie par ${k}) : elles sont égales.` : `${MCF(p, q)} = ${MCF(p * k, q2)} : pour le même dénominateur ${q2}, le numérateur serait ${p * k}, pas ${p2}. Les fractions sont différentes.` }],
        ['Cherche le plus grand diviseur commun avec la décomposition en facteurs premiers.', 'Divise le numérateur et le dénominateur par ce nombre.', 'Deux fractions sont égales si elles ont la même forme irréductible.']);
    };
  }
})(typeof module !== 'undefined' ? module.exports : window);
