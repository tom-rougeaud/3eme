/* Maths · 3ème Série Pro — « Je m’entraîne à la mécanique » : dix petits calculs sans contexte pour chaque notion.
   Commun au manuel (tirage fixe) et à l’appli (nouveau tirage au choix).
   MCVT.mech('c3', 1, seed) → { titre, consigne, items:[{ k, t, a, v?, vs?, tol? }] }
     t : énoncé court (les formules sont mises en forme automatiquement) ; a : réponse affichée ;
     v : valeur numérique attendue (fractions et décimaux acceptés) ; vs : plusieurs nombres attendus (ordre libre).
   Toutes les réponses sont calculées, jamais écrites à la main. */
(function (root) {
  'use strict';
  const MCVT = typeof module !== 'undefined' ? require('./train.js').MCVT : root.MCVT;
  const { H, L } = MCVT, { fr, rnd, pick, int, shuffle, MC } = H;
  const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  const sup = n => String(n).replace('-', '⁻').split('').map(c => c === '⁻' ? c : SUP[c]).join('');
  const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
  const lcm = (a, b) => a / gcd(a, b) * b;
  const M = '−';
  const sg = n => (n < 0 ? M : '') + Math.abs(n);              // −3, 5
  const pl = (...tm) => { let s = ''; tm.forEach(([c, v]) => { if (!c) return; const ab = Math.abs(c), body = v ? (ab === 1 ? v : ab + v) : String(ab); s += s ? (c < 0 ? ' − ' : ' + ') + body : (c < 0 ? M : '') + body; }); return s || '0'; };
  const sf = (n, d) => { const g = gcd(n, d); n /= g; d /= g; if (d < 0) { n = -n; d = -d; } return d === 1 ? String(n).replace('-', M) : (n < 0 ? M : '') + Math.abs(n) + '/' + d; };
  const fv = (n, d) => n / d;
  const dec = n => { const f = []; for (let p = 2; n > 1; p++) { let e = 0; while (n % p === 0) { n /= p; e++; } if (e) f.push(e > 1 ? p + sup(e) : String(p)); } return f.join(' × '); };
  const isPrime = n => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };
  const divs = n => { const d = []; for (let i = 1; i <= n; i++) if (n % i === 0) d.push(i); return d; };
  const yn = b => b ? 'oui' : 'non';
  const it = (t, a, v, o) => ({ t, a: String(a), ...(v != null ? (Array.isArray(v) ? { vs: v } : { v }) : {}), ...(o || {}) });
  const num = (t, v, d, u) => it(t, (d === 0 ? String(Math.round(v)).replace('-', M) : fr(rnd(v, d))) + (u ? ' ' + u : ''), rnd(v, d), { tol: 0.5 * Math.pow(10, -d) + 1e-9 });
  const R2 = (R, lo, hi) => int(R, lo, hi);
  const MECH = {};
  const def = (cid, k, titre, consigne, mk) => { MECH[cid + '.' + k] = { titre, consigne, mk }; };

  /* ======================= chapitre 1 ======================= */
  def('c1', 1, 'Multiples, diviseurs et critères', 'Réponds sans poser de division quand c’est possible.', [
    R => { const n = pick(R, [126, 231, 345, 408, 513, 624]); return it(`${n} est-il divisible par 3 ?`, yn(n % 3 === 0), null); },
    R => { const n = pick(R, [243, 378, 459, 522, 684, 735]); return it(`${n} est-il divisible par 9 ?`, yn(n % 9 === 0), null); },
    R => { const n = pick(R, [118, 245, 360, 571, 836, 907]); return it(`${n} est-il divisible par 2 ?`, yn(n % 2 === 0), null); },
    R => { const n = pick(R, [115, 230, 342, 475, 508, 665]); return it(`${n} est-il divisible par 5 ?`, yn(n % 5 === 0), null); },
    R => { const n = pick(R, [140, 205, 370, 450, 508, 990]); return it(`${n} est-il divisible par 10 ?`, yn(n % 10 === 0), null); },
    R => { const k = R2(R, 6, 9); return it(`Écris les quatre premiers multiples de ${k}.`, [1, 2, 3, 4].map(i => i * k).join(' ; '), null); },
    R => { const n = pick(R, [18, 20, 24, 28, 30, 36]); return it(`Écris tous les diviseurs de ${n}.`, divs(n).join(' ; '), null); },
    R => { const k = R2(R, 4, 9), n = k * R2(R, 5, 12) + R2(R, 1, k - 1); return num(`Quel est le reste de la division de ${n} par ${k} ?`, n % k, 0); },
    R => { const d0 = R2(R, 1, 8), n = 400 + d0 * 10 + 2; /* 4?2 : plus petit chiffre pour que le nombre soit divisible par 3 */ let c = 0; while ((4 + c + 2) % 3) c++; return num(`Par quel plus petit chiffre remplacer ? pour que 4?2 soit divisible par 3 ?`, c, 0); },
    R => { const b = R2(R, 6, 12), q = R2(R, 5, 9), n = b * q + pick(R, [0, 1, 3]); return it(`${n} est-il un multiple de ${b} ?`, yn(n % b === 0), null); }
  ]);
  def('c1', 2, 'Nombres premiers', 'Un nombre premier a exactement deux diviseurs : 1 et lui-même.', [
    R => { const n = pick(R, [51, 57, 87, 91, 93, 119]); return it(`${n} est-il premier ?`, yn(isPrime(n)) + (isPrime(n) ? '' : ` (divisible par ${divs(n)[1]})`), null); },
    R => { const n = pick(R, [53, 59, 61, 67, 71, 73]); return it(`${n} est-il premier ?`, yn(isPrime(n)), null); },
    R => { const n = pick(R, [77, 85, 111, 133, 143, 121]); return it(`${n} est-il premier ?`, yn(isPrime(n)) + (isPrime(n) ? '' : ` (divisible par ${divs(n)[1]})`), null); },
    R => { const n = pick(R, [79, 83, 89, 97, 101, 103]); return it(`${n} est-il premier ?`, yn(isPrime(n)), null); },
    R => it('Écris tous les nombres premiers inférieurs à 20.', '2 ; 3 ; 5 ; 7 ; 11 ; 13 ; 17 ; 19', null),
    R => { const n = pick(R, [35, 49, 55, 65, 77, 91]); return num(`Quel est le plus petit diviseur de ${n} autre que 1 ?`, divs(n)[1], 0); },
    R => it('Le nombre 1 est-il premier ?', 'non (il n’a qu’un seul diviseur)', null),
    R => it('Quel est le seul nombre premier pair ?', '2', 2),
    R => { const a = pick(R, [2, 3, 5, 7, 11]), b = pick(R, [13, 17, 19, 23]); return it(`${a * b} est-il premier ? Si non, donne deux de ses diviseurs autres que 1.`, `non : ${a} et ${b}`, null); },
    R => { const n = pick(R, [21, 27, 33, 39, 45, 51]); return it(`Vrai ou faux : « ${n} est impair, donc ${n} est premier ».`, `faux : ${n} = ${divs(n)[1]} × ${n / divs(n)[1]}`, null); }
  ]);
  def('c1', 3, 'Décomposer en facteurs premiers', 'Écris chaque nombre sous la forme d’un produit de facteurs premiers.', [
    R => { const n = pick(R, [12, 18, 20, 28, 45, 50]); return it(`Décompose ${n}.`, dec(n), null); },
    R => { const n = pick(R, [24, 30, 36, 42, 54, 60]); return it(`Décompose ${n}.`, dec(n), null); },
    R => { const n = pick(R, [72, 75, 84, 90, 96, 100]); return it(`Décompose ${n}.`, dec(n), null); },
    R => { const n = pick(R, [105, 126, 132, 140, 150, 168]); return it(`Décompose ${n}.`, dec(n), null); },
    R => { const n = pick(R, [180, 200, 210, 220, 252, 270]); return it(`Décompose ${n}.`, dec(n), null); },
    R => { const n = pick(R, [240, 300, 308, 360, 400, 450]); return it(`Décompose ${n}.`, dec(n), null); },
    R => { const e = R2(R, 2, 4), f = R2(R, 1, 2), n = 2 ** e * 3 ** f * 5; return num(`Calcule ${dec(n)}.`, n, 0); },
    R => { const n = pick(R, [2 ** 3 * 7, 2 ** 2 * 3 * 7, 3 ** 2 * 5 * 7, 2 * 3 * 5 * 7]); return num(`Quel nombre vaut ${dec(n)} ?`, n, 0); },
    R => { const n = pick(R, [48, 80, 96, 112, 144, 160]), e = (() => { let c = 0, m = n; while (m % 2 === 0) { m /= 2; c++; } return c; })(); return num(`Combien de fois le facteur 2 apparaît-il dans la décomposition de ${n} ?`, e, 0); },
    R => { const n = pick(R, [60, 84, 90, 126, 150, 210]); return num(`Combien de facteurs premiers différents dans la décomposition de ${n} ?`, dec(n).split(' × ').length, 0); }
  ]);
  def('c1', 4, 'Rendre une fraction irréductible', 'Simplifie au maximum : la fraction obtenue ne peut plus être simplifiée.', (() => {
    const mk = (p, q, ks) => R => { const k = pick(R, ks); return it(`Simplifie ${p * k}/${q * k}.`, sf(p, q), fv(p, q)); };
    return [mk(1, 2, [6, 8, 12]), mk(3, 4, [6, 8, 12]), mk(2, 3, [10, 12, 14]), mk(5, 6, [4, 6, 7]), mk(3, 5, [12, 14, 16]), mk(7, 9, [3, 4, 6]), mk(4, 7, [5, 6, 8]), mk(5, 8, [6, 7, 9]),
      R => { const [a, b] = pick(R, [[35, 42], [21, 28], [45, 60], [36, 48]]); return it(`Quel est le plus grand diviseur commun de ${a} et ${b} ?`, gcd(a, b), gcd(a, b)); },
      R => { const [a, b] = pick(R, [[14, 21], [15, 28], [18, 35], [22, 45], [9, 14], [10, 21]]); return it(`${a}/${b} est-elle irréductible ?`, yn(gcd(a, b) === 1) + (gcd(a, b) > 1 ? ` (on peut diviser par ${gcd(a, b)})` : ''), null); }];
  })());
  def('c1', 5, 'Diviseurs communs et PGCD', 'Cherche le plus grand diviseur commun, puis utilise-le pour partager.', [
    R => { const [a, b] = pick(R, [[12, 18], [18, 30], [20, 28], [24, 36]]); return it(`Écris les diviseurs communs de ${a} et ${b}.`, divs(a).filter(d => b % d === 0).join(' ; '), null); },
    R => { const [a, b] = pick(R, [[12, 18], [16, 24], [20, 30], [14, 35]]); return num(`Quel est le PGCD de ${a} et ${b} ?`, gcd(a, b), 0); },
    R => { const [a, b] = pick(R, [[36, 48], [42, 56], [45, 60], [54, 72]]); return num(`Quel est le PGCD de ${a} et ${b} ?`, gcd(a, b), 0); },
    R => { const [a, b] = pick(R, [[84, 126], [90, 150], [96, 144], [120, 168]]); return num(`Quel est le PGCD de ${a} et ${b} ?`, gcd(a, b), 0); },
    R => { const [a, b] = pick(R, [[17, 51], [13, 39], [19, 57], [11, 44]]); return num(`Quel est le PGCD de ${a} et ${b} ?`, gcd(a, b), 0); },
    R => { const [a, b] = pick(R, [[24, 36], [32, 48], [40, 60], [30, 45]]); return num(`${a} billes rouges et ${b} billes bleues sont réparties en lots identiques, sans reste. Combien de lots au maximum ?`, gcd(a, b), 0); },
    R => { const [a, b] = pick(R, [[24, 36], [32, 48], [40, 60], [30, 45]]), g = gcd(a, b); return it(`Avec ${a} billes rouges et ${b} billes bleues en ${g} lots identiques, que contient un lot ?`, `${a / g} rouges et ${b / g} bleues`, null); },
    R => { const [a, b, k] = pick(R, [[18, 24, 4], [20, 30, 5], [28, 42, 7], [16, 40, 4]]); return it(`Peut-on faire ${k} lots identiques avec ${a} cartes et ${b} cartes, sans reste ?`, yn(a % k === 0 && b % k === 0), null); },
    R => { const [a, b] = pick(R, [[48, 72], [60, 90], [75, 100], [64, 96]]); return it(`Simplifie ${a}/${b} avec leur PGCD.`, sf(a, b), fv(a, b)); },
    R => { const [a, b] = pick(R, [[8, 15], [9, 28], [14, 25], [16, 35]]); return it(`Que vaut le PGCD de ${a} et ${b} ? Que peut-on dire de ${a}/${b} ?`, `PGCD = 1 : la fraction est irréductible`, null); }
  ]);

  /* ======================= chapitre 2 ======================= */
  def('c2', 1, 'Additionner et soustraire des fractions', 'Donne le résultat sous la forme d’une fraction irréductible.', (() => {
    const add = (b, d, sub) => R => { const D = lcm(b, d); const a = R2(R, 1, b - 1), c = R2(R, 1, d - 1); const n1 = a * D / b, n2 = c * D / d; if (sub && n1 <= n2) return add(b, d, false)(R); const n = sub ? n1 - n2 : n1 + n2; return it(`${a}/${b} ${sub ? M : '+'} ${c}/${d} =`, sf(n, D), fv(n, D)); };
    const same = (b, sub) => R => { const a = sub ? R2(R, 3, b - 1) : R2(R, 1, b - 2), c = sub ? R2(R, 1, a - 1) : R2(R, 1, b - 1 - a); const n = sub ? a - c : a + c; return it(`${a}/${b} ${sub ? M : '+'} ${c}/${b} =`, sf(n, b), fv(n, b)); };
    return [same(7, false), same(9, true), add(2, 3, false), add(4, 3, false), add(2, 5, true), add(6, 4, false), add(5, 10, true), add(3, 4, true), add(6, 9, false),
      R => { const a = R2(R, 1, 3), n = (10 - a * 2) / 10; return it(`1 ${M} ${a}/5 =`, sf(5 - a, 5), fv(5 - a, 5)); }];
  })());
  def('c2', 2, 'Prendre une fraction d’une quantité', 'Divise par le dénominateur, puis multiplie par le numérateur.', [
    R => { const b = pick(R, [3, 4, 5]), q = b * R2(R, 4, 12); return num(`1/${b} de ${q} =`, q / b, 0); },
    R => { const b = pick(R, [3, 4, 5]), a = R2(R, 2, b - 1), q = b * R2(R, 3, 12); return num(`${a}/${b} de ${q} =`, q / b * a, 0); },
    R => { const b = pick(R, [6, 8, 10]), a = R2(R, 3, b - 1), q = b * R2(R, 3, 9); return num(`${a}/${b} de ${q} =`, q / b * a, 0); },
    R => { const b = pick(R, [4, 5, 8]), a = R2(R, 1, b - 1), q = b * R2(R, 5, 25); return num(`${a}/${b} de ${q} €, en euros :`, q / b * a, 0, '€'); },
    R => { const b = pick(R, [3, 4, 6]), a = R2(R, 1, b - 1), q = b * R2(R, 2, 9) * 10; return num(`${a}/${b} de ${q} m =`, q / b * a, 0, 'm'); },
    R => { const [a, b, c, d] = pick(R, [[2, 3, 3, 5], [3, 4, 2, 7], [1, 2, 5, 6], [4, 5, 3, 8]]); return it(`${a}/${b} × ${c}/${d} =`, sf(a * c, b * d), fv(a * c, b * d)); },
    R => { const [a, b, c, d] = pick(R, [[3, 4, 2, 3], [5, 6, 3, 10], [2, 5, 5, 8], [4, 9, 3, 8]]); return it(`${a}/${b} × ${c}/${d} (simplifie le résultat) =`, sf(a * c, b * d), fv(a * c, b * d)); },
    R => { const b = pick(R, [4, 5, 6, 8]), k = R2(R, 2, 5), a = k * R2(R, 1, 2); return it(`Quelle fraction de ${b * 6} représente ${a * 6} ? (irréductible)`, sf(a, b), fv(a, b)); },
    R => { const q = pick(R, [60, 120, 240]), b = pick(R, [3, 4, 5]); return num(`On utilise 1/${b} de ${q} L, puis la moitié du reste. Combien de litres a-t-on utilisés en tout ?`, q / b + (q - q / b) / 2, 1, 'L'); },
    R => { const b = pick(R, [3, 4, 5]), q = b * R2(R, 6, 15); return num(`Les ${b - 1}/${b} d’une somme valent ${q / b * (b - 1)} €. Quelle est la somme ?`, q, 0, '€'); }
  ]);
  def('c2', 3, 'Puissances de 10 et préfixes', 'Écris le résultat sous la forme d’une puissance de 10 ou d’un nombre décimal.', [
    R => { const p = R2(R, 2, 5), q = R2(R, 2, 5); return it(`10${sup(p)} × 10${sup(q)} =`, `10${sup(p + q)}`, null); },
    R => { const p = R2(R, 6, 9), q = R2(R, 6, 9); return it(`10${sup(p)} × 10${sup(q)} =`, `10${sup(p + q)}`, null); },
    R => { const p = R2(R, 7, 9), q = R2(R, 2, 5); return it(`10${sup(p)} ÷ 10${sup(q)} =`, `10${sup(p - q)}`, null); },
    R => { const p = R2(R, 2, 4), q = R2(R, 5, 8); return it(`10${sup(p)} ÷ 10${sup(q)} =`, `10${sup(p - q)}`, null); },
    R => { const n = R2(R, 1, 4); return it(`Écris 10${sup(-n)} en écriture décimale.`, fr(10 ** -n), 10 ** -n); },
    R => { const n = pick(R, [0.01, 0.001, 0.0001, 0.00001]); return it(`Écris ${fr(n)} sous la forme 10 puissance n.`, `10${sup(Math.round(Math.log10(n)))}`, null); },
    R => { const k = R2(R, 2, 90), p = R2(R, 2, 4); return num(`${k} × 10${sup(p)} =`, k * 10 ** p, 0); },
    R => { const k = pick(R, [0.5, 1.5, 2.5, 3.2, 4.8]), p = R2(R, 2, 4); return num(`${fr(k)} × 10${sup(p)} =`, k * 10 ** p, 0); },
    R => { const k = R2(R, 2, 9) * 5, [n, u, e] = pick(R, [['kilo', 'ko', 3], ['méga', 'Mo', 6], ['giga', 'Go', 9]]); return it(`${k} ${u} = ${k} × 10 puissance ? octets. Donne l’exposant.`, e, e); },
    R => { const k = R2(R, 2, 9), p = R2(R, 1, 3); return num(`${k} × 10${sup(-p)} =`, k * 10 ** -p, p); }
  ]);
  def('c2', 4, 'L’écriture scientifique', 'Écris sous la forme a × 10 puissance n, avec un seul chiffre non nul avant la virgule.', (() => {
    const sc = (m, e) => `${fr(m)} × 10${sup(e)}`;
    const big = (ms, es) => R => { const m = pick(R, ms), e = pick(R, es); return it(`Écris ${fr(Math.round(m * 10 ** e))} en écriture scientifique.`, sc(m, e), null); };
    const small = (ms, es) => R => { const m = pick(R, ms), e = pick(R, es); return it(`Écris ${fr(rnd(m * 10 ** e, 8))} en écriture scientifique.`, sc(m, e), null); };
    return [big([4, 7, 9], [3, 4]), big([2.5, 3.6, 8.1], [4, 5]), big([1.2, 4.5, 6.4], [6, 7]), big([3.2, 5.6, 7.7], [8, 9]), small([4, 6, 8], [-2, -3]), small([2.5, 3.6, 7.2], [-3, -4]),
      R => { const m = pick(R, [2.5, 3.4, 6.1]), e = pick(R, [3, 4, 5]); return it(`Écris ${sc(m, e)} en écriture décimale.`, fr(Math.round(m * 10 ** e)), Math.round(m * 10 ** e)); },
      R => { const m = pick(R, [4, 7.5, 9.2]), e = pick(R, [2, 3, 4]); return it(`Écris ${sc(m, -e)} en écriture décimale.`, fr(rnd(m * 10 ** -e, 8)), rnd(m * 10 ** -e, 8)); },
      R => { const [x, y] = pick(R, [['45 × 10³', '4,5 × 10⁴'], ['0,8 × 10⁵', '8 × 10⁴'], ['62 × 10⁵', '6,2 × 10⁶'], ['0,3 × 10⁻²', '3 × 10⁻³']]); return it(`Écris ${x} en écriture scientifique.`, y, null); },
      R => { const [a, b] = pick(R, [[3, 2], [4, 3], [2, 6], [5, 4]]); return it(`Calcule ${a} × 10${sup(b)} × 2 puis donne l’écriture scientifique.`, a * 2 >= 10 ? `${fr(a * 2 / 10)} × 10${sup(b + 1)}` : `${a * 2} × 10${sup(b)}`, null); }];
  })());

  /* ======================= chapitre 3 ======================= */
  def('c3', 1, 'Développer et réduire', 'Développe, puis réduis l’expression.', [
    R => { const k = R2(R, 2, 9), a = R2(R, 2, 9); return it(`${k}(x + ${a})`, pl([k, 'x'], [k * a, '']), null); },
    R => { const k = R2(R, 2, 9), a = R2(R, 2, 9); return it(`${k}(x ${M} ${a})`, pl([k, 'x'], [-k * a, '']), null); },
    R => { const k = R2(R, 2, 6), a = R2(R, 2, 9); return it(`${M}${k}(x + ${a})`, pl([-k, 'x'], [-k * a, '']), null); },
    R => { const k = R2(R, 2, 5), a = R2(R, 2, 4), b = R2(R, 1, 7); return it(`${k}(${a}x + ${b})`, pl([k * a, 'x'], [k * b, '']), null); },
    R => { const a = R2(R, 2, 9), b = R2(R, 2, 9); return it(`(x + ${a})(x + ${b})`, pl([1, 'x²'], [a + b, 'x'], [a * b, '']), null); },
    R => { const a = R2(R, 2, 8), b = R2(R, 2, 8) + (R() < .5 ? 0 : 0); return it(`(x ${M} ${a})(x + ${b})`, pl([1, 'x²'], [b - a, 'x'], [-a * b, '']), null); },
    R => { const a = R2(R, 2, 8), b = R2(R, 2, 8); return it(`(x + ${a})(x ${M} ${b})`, pl([1, 'x²'], [a - b, 'x'], [-a * b, '']), null); },
    R => { const a = R2(R, 2, 8), b = R2(R, 2, 8); return it(`(x ${M} ${a})(x ${M} ${b})`, pl([1, 'x²'], [-a - b, 'x'], [a * b, '']), null); },
    R => { const a = R2(R, 2, 9); return it(`(x + ${a})²`, pl([1, 'x²'], [2 * a, 'x'], [a * a, '']), null); },
    R => { const a = R2(R, 2, 9); return it(`(x ${M} ${a})²`, pl([1, 'x²'], [-2 * a, 'x'], [a * a, '']), null); }
  ]);
  def('c3', 2, 'Factoriser et prouver', 'Factorise l’expression (ou développe puis réduis quand c’est demandé).', [
    R => { const k = R2(R, 2, 9), m = R2(R, 2, 9); return it(`Factorise ${pl([k, 'x'], [k * m, ''])}.`, `${k}(x + ${m})`, null); },
    R => { const k = R2(R, 2, 9), m = R2(R, 2, 9); return it(`Factorise ${pl([k, 'x'], [-k * m, ''])}.`, `${k}(x ${M} ${m})`, null); },
    R => { const k = R2(R, 3, 7), m = R2(R, 2, 5); return it(`Factorise ${pl([k * m, 'x'], [k, ''])}.`, `${k}(${m}x + 1)`, null); },
    R => { const a = R2(R, 2, 9); return it(`Factorise ${pl([1, 'x²'], [a, 'x'])}.`, `x(x + ${a})`, null); },
    R => { const a = R2(R, 2, 9); return it(`Factorise ${pl([1, 'x²'], [-a, 'x'])}.`, `x(x ${M} ${a})`, null); },
    R => { const k = R2(R, 2, 5), a = R2(R, 2, 6); return it(`Factorise ${pl([k, 'x²'], [k * a, 'x'])}.`, `${k}x(x + ${a})`, null); },
    R => { const k = R2(R, 2, 6), a = R2(R, 2, 7); return it(`Développe et réduis ${k}(x + ${a}) ${M} ${k * a}.`, `${k}x`, null); },
    R => { const a = R2(R, 2, 5), b = R2(R, 2, 5), c = R2(R, 1, 4); return it(`Développe et réduis ${a}(x + ${b}) + ${c}(x ${M} 1).`, pl([a + c, 'x'], [a * b - c, '']), null); },
    R => { const a = R2(R, 2, 6), k = R2(R, 2, 5); return it(`Je choisis x, j’ajoute ${a}, je multiplie par ${k}, puis je retire ${k * a}. Écris le résultat avec x, réduit.`, `${k}x`, null); },
    R => { const k = R2(R, 3, 8), m = R2(R, 2, 7), ok = R() < .5; return it(`Vrai ou faux : ${pl([k, 'x'], [k * m, ''])} = ${k}(x + ${ok ? m : m + 1}) ?`, ok ? 'vrai' : `faux : ${k}(x + ${m + 1}) = ${pl([k, 'x'], [k * (m + 1), ''])}`, null); }
  ]);
  def('c3', 3, 'Résoudre une équation', 'Résous l’équation. Vérifie en remplaçant x par ta solution.', [
    R => { const x = R2(R, 2, 15), a = R2(R, 3, 12); return it(`x + ${a} = ${x + a}`, `x = ${x}`, x); },
    R => { const x = R2(R, 3, 15), a = R2(R, 2, 9); return it(`x ${M} ${a} = ${x - a}`, `x = ${x}`, x); },
    R => { const x = R2(R, 2, 12), a = R2(R, 2, 9); return it(`${a}x = ${a * x}`, `x = ${x}`, x); },
    R => { const x = R2(R, 2, 10), a = R2(R, 2, 6), b = R2(R, 1, 9); return it(`${a}x + ${b} = ${a * x + b}`, `x = ${x}`, x); },
    R => { const x = R2(R, 2, 10), a = R2(R, 2, 6), b = R2(R, 1, 9); return it(`${a}x ${M} ${b} = ${a * x - b}`, `x = ${x}`, x); },
    R => { const x = R2(R, 2, 9), c = R2(R, 2, 4), a = c + R2(R, 2, 4), b = R2(R, 1, 9); return it(`${a}x + ${b} = ${c}x + ${a * x + b - c * x}`, `x = ${x}`, x); },
    R => { const x = R2(R, 2, 8), c = R2(R, 1, 3), a = c + R2(R, 2, 4), b = R2(R, 2, 9); return it(`${a}x ${M} ${b} = ${c}x + ${a * x - b - c * x}`, `x = ${x}`, x); },
    R => { const a = R2(R, 2, 6), b = R2(R, 2, 9); return it(`x ÷ ${a} = ${b}`, `x = ${a * b}`, a * b); },
    R => { const a = R2(R, 2, 5), b = R2(R, 1, 6), x = R2(R, 1, 8); return it(`${a}(x + ${b}) = ${a * (x + b)}`, `x = ${x}`, x); },
    R => { const x = R2(R, 2, 6), a = R2(R, 2, 5), b = R2(R, 3, 9); return it(`${a}x + ${b + a * x} = ${b}`, `x = ${M}${x}`, -x); }
  ]);
  def('c3', 4, 'Équations produit nul', 'Écris toutes les solutions de l’équation.', [
    R => { const a = R2(R, 1, 9), b = R2(R, 1, 9); return it(`(x ${M} ${a})(x ${M} ${b}) = 0`, `x = ${a} ou x = ${b}`, [a, b]); },
    R => { const a = R2(R, 1, 9), b = R2(R, 1, 9); return it(`(x + ${a})(x ${M} ${b}) = 0`, `x = ${M}${a} ou x = ${b}`, [-a, b]); },
    R => { const a = R2(R, 1, 9), b = R2(R, 1, 9); return it(`(x + ${a})(x + ${b}) = 0`, `x = ${M}${a} ou x = ${M}${b}`, [-a, -b]); },
    R => { const k = R2(R, 2, 4), m = R2(R, 1, 6), b = R2(R, 1, 6); return it(`(${k}x ${M} ${k * m})(x + ${b}) = 0`, `x = ${m} ou x = ${M}${b}`, [m, -b]); },
    R => { const a = R2(R, 2, 9); return it(`x(x ${M} ${a}) = 0`, `x = 0 ou x = ${a}`, [0, a]); },
    R => { const k = R2(R, 2, 4), m = R2(R, 1, 6); return it(`x(${k}x + ${k * m}) = 0`, `x = 0 ou x = ${M}${m}`, [0, -m]); },
    R => { const m = R2(R, 1, 5), a = m + R2(R, 1, 4), k = R2(R, 2, 5); return it(`(x ${M} ${a})(${k}x ${M} ${k * m}) = 0`, `x = ${a} ou x = ${m}`, [a, m]); },
    R => { const a = R2(R, 2, 9); return it(`(x ${M} ${a})² = 0`, `x = ${a}`, [a]); },
    R => { const a = R2(R, 1, 5), b = R2(R, 1, 5); return it(`Le produit (x ${M} ${a})(x + ${b}) est-il nul pour x = ${a} ?`, 'oui : le premier facteur est nul', null); },
    R => { const a = R2(R, 1, 5), b = R2(R, 6, 9); return num(`Combien de solutions a l’équation (x ${M} ${a})(x + ${b}) = 0 ?`, 2, 0); }
  ]);

  /* ======================= chapitre 4 ======================= */
  const Q4 = [[3, 4.5], [4, 6], [5, 7.5], [6, 9]];
  def('c4', 1, 'Proportionnalité', 'Utilise le coefficient de proportionnalité ou le produit en croix.', [
    R => { const k = pick(R, [1.5, 2.5, 3, 4]), a = R2(R, 2, 6), b = a + R2(R, 3, 8); return num(`${a} objets coûtent ${fr(a * k)} €. Combien coûtent ${b} objets ?`, b * k, 2, '€'); },
    R => { const k = pick(R, [12, 15, 18, 25]), a = R2(R, 2, 5), b = R2(R, 6, 10); return num(`${a} pots de peinture couvrent ${a * k} m². Quelle surface couvrent ${b} pots ?`, b * k, 0, 'm²'); },
    R => { const k = pick(R, [8, 9, 12]), a = R2(R, 3, 6), b = a * 2 + 1; return num(`Une voiture consomme ${fr(a * k / 10)} L en ${a * 100} km. Combien en ${b * 100} km ?`, b * k / 10, 1, 'L'); },
    R => { const [a, b, c] = pick(R, [[4, 6, 10], [5, 8, 15], [6, 9, 14], [3, 7, 12]]); return it(`4e proportionnelle : ${a} → ${b} ; ${c} → ?`, fr(rnd(b * c / a, 2)), rnd(b * c / a, 2), { tol: .006 }); },
    R => { const k = pick(R, [3, 4, 5, 6]); return it(`Un tableau de proportionnalité contient 2 → ${2 * k} et 5 → ${5 * k}. Quel est le coefficient ?`, k, k); },
    R => { const [a, b, c, d] = pick(R, [[2, 3, 6, 9], [4, 5, 12, 15], [3, 8, 6, 15], [5, 7, 10, 14]]); return it(`Le tableau ${a} → ${b} ; ${c} → ${d} est-il de proportionnalité ?`, yn(a * d === b * c), null); },
    R => { const t = R2(R, 3, 8), k = pick(R, [1.2, 1.5, 2.5]); return num(`Pour ${t} personnes, il faut ${fr(t * k)} kg. Pour 1 personne ?`, k, 2, 'kg'); },
    R => { const [h, m] = pick(R, [[2, 30], [1, 45], [3, 15]]); const min = h * 60 + m; return num(`Convertis ${h} h ${m} min en minutes.`, min, 0, 'min'); },
    R => { const k = pick(R, [4, 6, 8]), n = R2(R, 2, 5); return num(`${n} h de travail rapportent ${n * k * 3} €. Combien rapportent ${n + 3} h ?`, (n + 3) * k * 3, 0, '€'); },
    R => { const a = pick(R, [30, 45, 60, 75]), n = pick(R, [2, 3, 4]); return num(`${a} km en ${n} h à vitesse constante : combien de kilomètres en 1 h ?`, a / n, 2, 'km'); }
  ]);
  def('c4', 2, 'Pourcentages et évolutions', 'Utilise le coefficient multiplicateur quand c’est possible.', [
    R => { const p = pick(R, [10, 20, 25, 50]), q = R2(R, 3, 12) * 20; return num(`${p} % de ${q} =`, q * p / 100, 2); },
    R => { const p = pick(R, [5, 12, 15, 30]), q = R2(R, 4, 12) * 20; return num(`Augmente ${q} de ${p} %.`, q * (1 + p / 100), 2); },
    R => { const p = pick(R, [10, 20, 30, 40]), q = R2(R, 3, 10) * 20; return num(`Diminue ${q} de ${p} %.`, q * (1 - p / 100), 2); },
    R => { const p = pick(R, [5, 8, 12, 20]); return num(`Quel est le coefficient multiplicateur d’une hausse de ${p} % ?`, 1 + p / 100, 2); },
    R => { const p = pick(R, [5, 15, 25, 30]); return num(`Quel est le coefficient multiplicateur d’une baisse de ${p} % ?`, 1 - p / 100, 2); },
    R => { const a = pick(R, [40, 50, 80, 200]), p = pick(R, [10, 20, 25, 50]); return num(`Un prix passe de ${a} € à ${fr(a * (1 + p / 100))} €. Quel est le taux d’évolution, en % ?`, p, 1, '%'); },
    R => { const a = pick(R, [50, 80, 120, 250]), p = pick(R, [10, 20, 30, 40]); return num(`Un prix passe de ${a} € à ${fr(a * (1 - p / 100))} €. Quel est le taux d’évolution, en % ?`, -p, 1, '%'); },
    R => { const a = pick(R, [25, 40, 60, 90]), b = pick(R, [5, 8, 12, 15]); return num(`Sur ${a} élèves, ${b} sont absents. Quel pourcentage cela représente-t-il ? (arrondi à 0,1)`, b / a * 100, 1, '%'); },
    R => { const p = pick(R, [20, 25, 50]), v = pick(R, [60, 75, 90, 120]); return num(`Après une hausse de ${p} %, un prix vaut ${fr(v)} €. Quel était le prix de départ ?`, v / (1 + p / 100), 2, '€'); },
    R => { const a = pick(R, [100, 200, 400]), p = pick(R, [10, 20]); return num(`Hausse de ${p} % puis baisse de ${p} % sur ${a} €. Quel prix final ?`, a * (1 + p / 100) * (1 - p / 100), 2, '€'); }
  ]);
  def('c4', 3, 'Vitesse, débit, grandeurs composées', 'Écris la formule, puis calcule. Vérifie les unités.', [
    R => { const v = pick(R, [60, 80, 90, 110]), t = pick(R, [2, 3, 4]); return num(`Distance parcourue à ${v} km/h pendant ${t} h :`, v * t, 0, 'km'); },
    R => { const d = pick(R, [120, 180, 240, 300]), t = pick(R, [2, 3, 4, 5]); return num(`${d} km en ${t} h : vitesse moyenne ?`, d / t, 1, 'km/h'); },
    R => { const d = pick(R, [150, 200, 270]), v = pick(R, [50, 60, 90]); return num(`Durée pour parcourir ${d} km à ${v} km/h (en heures, arrondi à 0,01) :`, d / v, 2, 'h'); },
    R => { const d = pick(R, [45, 60, 75]), m = pick(R, [30, 45]); return num(`${d} km en ${m} min : vitesse moyenne ?`, d / (m / 60), 1, 'km/h'); },
    R => { const v = pick(R, [36, 72, 90, 108]); return num(`Convertis ${v} km/h en m/s.`, v / 3.6, 1, 'm/s'); },
    R => { const v = pick(R, [5, 10, 15, 20]); return num(`Convertis ${v} m/s en km/h.`, v * 3.6, 1, 'km/h'); },
    R => { const d = pick(R, [5, 8, 15, 25]), t = pick(R, [60, 120, 600]); return num(`Débit de ${d} Mbit/s pendant ${t} s : quantité de données ?`, d * t, 0, 'Mbit'); },
    R => { const q = pick(R, [800, 1600, 2400]); return num(`Convertis ${fr(q)} Mbit en Mo (1 octet = 8 bits).`, q / 8, 0, 'Mo'); },
    R => { const q = pick(R, [600, 900, 1500]), d = pick(R, [5, 10, 15]); return num(`${q} Mbit transférés à ${d} Mbit/s : durée en secondes ?`, q / d, 0, 's'); },
    R => { const t = pick(R, [90, 150, 210]); return num(`Convertis ${t} min en heures (décimal).`, t / 60, 2, 'h'); }
  ]);
  def('c4', 4, 'Partager selon un ratio', 'Compte les parts, calcule la valeur d’une part, puis réponds.', [
    R => { const [a, b] = pick(R, [[2, 3], [1, 4], [3, 5], [2, 5]]), p = (a + b) * R2(R, 4, 12); return num(`Partage ${p} dans le ratio ${a} : ${b}. Quelle est la plus petite part ?`, p / (a + b) * Math.min(a, b), 0); },
    R => { const [a, b] = pick(R, [[3, 2], [4, 1], [5, 3], [3, 4]]), p = (a + b) * R2(R, 5, 15); return num(`Partage ${p} € dans le ratio ${a} : ${b}. Quelle est la plus grande part ?`, p / (a + b) * Math.max(a, b), 0, '€'); },
    R => { const [a, b] = pick(R, [[1, 2], [2, 3], [3, 4]]), p = (a + b) * R2(R, 6, 14); return it(`Partage ${p} dans le ratio ${a} : ${b}. Donne les deux parts.`, `${p / (a + b) * a} et ${p / (a + b) * b}`, null); },
    R => { const [a, b] = pick(R, [[2, 3], [3, 4], [1, 5]]), p = a + b; return num(`Dans le ratio ${a} : ${b}, combien de parts en tout ?`, p, 0); },
    R => { const [a, b] = pick(R, [[2, 3], [3, 5], [4, 7]]), k = R2(R, 3, 9); return num(`Deux quantités sont dans le ratio ${a} : ${b}. La première vaut ${a * k}. Combien vaut la seconde ?`, b * k, 0); },
    R => { const [a, b] = pick(R, [[3, 2], [5, 4], [7, 3]]), k = R2(R, 3, 9); return num(`Deux quantités sont dans le ratio ${a} : ${b}. La seconde vaut ${b * k}. Combien vaut la première ?`, a * k, 0); },
    R => { const k = pick(R, [2, 3, 4, 6]), a = pick(R, [2, 3, 5]), b = pick(R, [7, 9, 4]); return it(`Simplifie le ratio ${a * k} : ${b * k}.`, `${a} : ${b}`, null); },
    R => { const [a, b] = pick(R, [[3, 2], [4, 3], [5, 2]]), t = (a + b) * R2(R, 5, 10); return num(`Une peinture mélange 2 couleurs dans le ratio ${a} : ${b}. Pour ${t} L, combien de litres de la première ?`, t / (a + b) * a, 1, 'L'); },
    R => { const [a, b] = pick(R, [[1, 3], [2, 3], [3, 7]]), g = pick(R, [6, 9, 12]); return num(`Un sirop se dilue dans le ratio ${a} : ${b} (sirop : eau). Pour ${g * b} mL d’eau, combien de mL de sirop ?`, g * a, 0, 'mL'); },
    R => { const [a, b, c] = pick(R, [[1, 2, 3], [2, 3, 5], [1, 1, 2]]), p = (a + b + c) * R2(R, 4, 9); return num(`Partage ${p} dans le ratio ${a} : ${b} : ${c}. Quelle est la plus grande part ?`, p / (a + b + c) * c, 0); }
  ]);

  /* ======================= chapitre 5 ======================= */
  const lf = (a, b) => `${pl([a, 'x'], [b, ''])}`;
  def('c5', 1, 'Image et antécédent', 'f et g sont des fonctions : calcule les images ou cherche les antécédents.', [
    R => { const a = R2(R, 2, 5), b = R2(R, 1, 6), x = R2(R, 2, 8); return num(`f(x) = ${lf(a, b)}. Calcule f(${x}).`, a * x + b, 0); },
    R => { const a = R2(R, 2, 5), b = R2(R, 1, 6), x = R2(R, 2, 8); return num(`f(x) = ${lf(a, -b)}. Calcule f(${x}).`, a * x - b, 0); },
    R => { const a = R2(R, 2, 5), x = R2(R, 2, 6); return num(`f(x) = ${M}${a}x. Calcule f(${x}).`, -a * x, 0); },
    R => { const x = R2(R, 2, 6); return num(`g(x) = x² ${M} 1. Calcule g(${x}).`, x * x - 1, 0); },
    R => { const x = R2(R, 2, 5); return num(`g(x) = x² + 3. Calcule g(${M}${x}).`, x * x + 3, 0); },
    R => { const a = R2(R, 2, 5), b = R2(R, 1, 6), x = R2(R, 1, 9); return num(`f(x) = ${lf(a, b)}. Quel est l’antécédent de ${a * x + b} ?`, x, 0); },
    R => { const a = R2(R, 2, 5), b = R2(R, 1, 6), x = R2(R, 1, 9); return num(`f(x) = ${lf(a, -b)}. Quel est l’antécédent de ${a * x - b} ?`, x, 0); },
    R => { const a = R2(R, 2, 4), x = R2(R, 2, 9); return num(`Si f(x) = ${a}x, quel nombre a pour image ${a * x} ?`, x, 0); },
    R => { const x = R2(R, 2, 5), y = x * x; return it(`g(x) = x². Donne les antécédents de ${y}.`, `${x} et ${M}${x}`, [x, -x]); },
    R => { const [x, y] = pick(R, [[3, 7], [4, 9], [2, 5], [5, 11]]); return it(`f(${x}) = ${y}. Quelle est l’image de ${x} ? Quel est un antécédent de ${y} ?`, `l’image de ${x} est ${y} ; un antécédent de ${y} est ${x}`, null); }
  ]);
  def('c5', 2, 'Fonctions linéaires', 'Une fonction linéaire s’écrit f(x) = ax.', [
    R => { const a = R2(R, 2, 9), x = R2(R, 2, 9); return num(`f(x) = ${a}x. Calcule f(${x}).`, a * x, 0); },
    R => { const a = R2(R, 2, 9); return num(`Quel est le coefficient de f(x) = ${a}x ?`, a, 0); },
    R => { const a = R2(R, 2, 7), x = R2(R, 3, 9); return num(`f(x) = ${M}${a}x. Calcule f(${x}).`, -a * x, 0); },
    R => { const a = R2(R, 2, 7), x = R2(R, 2, 9); return num(`f est linéaire et f(${x}) = ${a * x}. Quel est son coefficient ?`, a, 0); },
    R => { const a = R2(R, 2, 7), x = R2(R, 2, 5), y = R2(R, 6, 10); return num(`f est linéaire et f(${x}) = ${a * x}. Calcule f(${y}).`, a * y, 0); },
    R => { const a = R2(R, 2, 6), x = R2(R, 2, 9); return num(`f(x) = ${a}x. Quel est l’antécédent de ${a * x} ?`, x, 0); },
    R => { const a = R2(R, 2, 6), x = R2(R, 2, 9), ok = R() < .5; return it(`Le point (${x} ; ${ok ? a * x : a * x + 1}) est-il sur la droite d’équation y = ${a}x ?`, yn(ok), null); },
    R => { const a = pick(R, [1.5, 2.5, 4]), n = R2(R, 3, 9); return num(`Un kg de pommes coûte ${fr(a)} €. Écris le prix de ${n} kg.`, a * n, 2, '€'); },
    R => { const a = R2(R, 2, 9); return it(`La droite de f(x) = ${a}x passe-t-elle par l’origine (0 ; 0) ?`, 'oui : f(0) = 0', null); },
    R => { const a = R2(R, 3, 9), x = R2(R, 2, 8); return it(`Un point de la droite y = ${a}x a pour abscisse ${x}. Donne son ordonnée.`, a * x, a * x); }
  ]);
  def('c5', 3, 'Fonctions affines', 'Une fonction affine s’écrit f(x) = ax + b.', [
    R => { const a = R2(R, 2, 5), b = R2(R, 1, 9), x = R2(R, 2, 8); return num(`f(x) = ${lf(a, b)}. Calcule f(${x}).`, a * x + b, 0); },
    R => { const a = R2(R, 2, 5), b = R2(R, 1, 9), x = R2(R, 2, 8); return num(`f(x) = ${lf(a, -b)}. Calcule f(${x}).`, a * x - b, 0); },
    R => { const a = R2(R, 2, 7), b = R2(R, 1, 9); return it(`Pour f(x) = ${lf(a, b)}, donne a et b.`, `a = ${a} et b = ${b}`, null); },
    R => { const a = R2(R, 2, 7), b = R2(R, 1, 9); return num(`Quelle est l’ordonnée à l’origine de f(x) = ${lf(a, b)} ?`, b, 0); },
    R => { const a = R2(R, 2, 7), b = R2(R, 1, 9); return num(`Quel est le coefficient directeur de f(x) = ${lf(a, -b)} ?`, a, 0); },
    R => { const a = R2(R, 2, 5), b = R2(R, 1, 9); return num(`g(x) = ${pl([-a, 'x'], [b + 10, ''])}. Calcule g(2).`, -2 * a + b + 10, 0); },
    R => { const a = R2(R, 2, 5), b = R2(R, 2, 9); return num(`f est affine, f(0) = ${b} et f(1) = ${a + b}. Quel est a ?`, a, 0); },
    R => { const a = R2(R, 2, 5), b = R2(R, 2, 9), x = R2(R, 2, 8); return num(`f(x) = ${lf(a, b)}. Quel est l’antécédent de ${a * x + b} ?`, x, 0); },
    R => { const a = R2(R, 2, 5), b = R2(R, 5, 30); return it(`Un forfait coûte ${b} € puis ${a} € par séance. Écris la fonction f(x) du prix pour x séances.`, lf(a, b), null); },
    R => { const a = R2(R, 2, 5), b = R2(R, 5, 30), x = R2(R, 4, 12); return num(`Un forfait coûte ${b} € puis ${a} € par séance. Prix pour ${x} séances :`, a * x + b, 0, '€'); }
  ]);
  def('c5', 4, 'Comparer deux formules', 'Résous f(x) = g(x) pour trouver quand les deux formules coûtent autant.', [
    R => { const x = R2(R, 3, 10), c = R2(R, 2, 4), a = c + R2(R, 2, 5), b = (a - c) * x; return it(`f(x) = ${a}x et g(x) = ${c}x + ${b}. Pour quel x a-t-on f(x) = g(x) ?`, `x = ${x}`, x); },
    R => { const x = R2(R, 3, 10), c = R2(R, 2, 4), a = c + R2(R, 2, 5), b = (a - c) * x; return it(`f(x) = ${a}x et g(x) = ${c}x + ${b}. Pour x = ${x}, calcule f(x) puis g(x).`, `${a * x} et ${a * x}`, null); },
    R => { const x = R2(R, 4, 12), c = 5, a = 8 + R2(R, 0, 3), k = (a - c) * x; return it(`Tarif A : ${a} € la séance. Tarif B : ${c} € la séance + ${k} € d’abonnement. À partir de combien de séances B est-il moins cher ?`, `à partir de ${x + 1} séances (égalité pour ${x})`, null); },
    R => { const x = R2(R, 2, 9), a = R2(R, 3, 6), b = R2(R, 1, 9), c = R2(R, 1, 2); return it(`${lf(a, b)} = ${lf(c, a * x + b - c * x)}`, `x = ${x}`, x); },
    R => { const x = R2(R, 2, 9), a = R2(R, 4, 8), c = R2(R, 1, 3); return it(`${a}x = ${c}x + ${(a - c) * x}`, `x = ${x}`, x); },
    R => { const x = R2(R, 2, 9), a = R2(R, 4, 8), c = R2(R, 1, 3), b = R2(R, 3, 12); return it(`${a}x ${M} ${b} = ${c}x + ${(a - c) * x - b}`, `x = ${x}`, x); },
    R => { const x = R2(R, 3, 10), a = R2(R, 5, 9), c = R2(R, 2, 4); return it(`f(x) = ${a}x et g(x) = ${c}x + ${(a - c) * x}. Pour x = ${x + 2}, quelle formule est la plus basse ?`, 'g (la droite de g est en dessous après le point d’intersection)', null); },
    R => { const x = R2(R, 3, 10), a = R2(R, 5, 9), c = R2(R, 2, 4); return it(`f(x) = ${a}x et g(x) = ${c}x + ${(a - c) * x}. Pour x = ${Math.max(1, x - 2)}, quelle formule est la plus basse ?`, 'f', null); },
    R => { const x = R2(R, 5, 10), a = R2(R, 9, 12), c = R2(R, 4, 7); return num(`Sans abonnement : ${a} € la séance. Avec abonnement : ${c} € la séance + ${(a - c) * x} €. Pour combien de séances les deux coûtent-ils autant ?`, x, 0); },
    R => { const x = R2(R, 3, 8), a = R2(R, 2, 5); return it(`Les droites de f(x) = ${a}x + ${a * x} et g(x) = ${2 * a}x se coupent en un point. Donne son abscisse.`, `x = ${x}`, x); }
  ]);

  /* ======================= chapitre 6 ======================= */
  const lst = a => a.join(' ; ');
  const rl = (R, n, lo, hi) => Array.from({ length: n }, () => R2(R, lo, hi));
  def('c6', 1, 'Calculer une moyenne', 'Moyenne = somme des valeurs ÷ nombre de valeurs.', [
    R => { const v = rl(R, 4, 6, 16), s = v.reduce((x, y) => x + y, 0); return num(`Moyenne de ${lst(v)} (arrondi à 0,1) :`, s / 4, 1); },
    R => { const v = rl(R, 5, 8, 18), s = v.reduce((x, y) => x + y, 0); return num(`Moyenne de ${lst(v)} (arrondi à 0,1) :`, s / 5, 1); },
    R => { const m = R2(R, 9, 14), v = [m - 2, m + 2, m - 1, m + 1, m]; return num(`Moyenne de ${lst(v)} :`, m, 1); },
    R => { const v = rl(R, 6, 2, 20), s = v.reduce((x, y) => x + y, 0); return num(`Moyenne de ${lst(v)} (arrondi à 0,1) :`, s / 6, 1); },
    R => { const m = R2(R, 10, 14), n = R2(R, 4, 8); return num(`La moyenne de ${n} notes est ${m}. Quelle est la somme des notes ?`, m * n, 0); },
    R => { const [a, b] = [R2(R, 8, 12), R2(R, 12, 17)]; return num(`Moyenne de ${a} (coefficient 1) et ${b} (coefficient 2) :`, (a + 2 * b) / 3, 2); },
    R => { const e = [[10, 2], [12, 3], [15, 5]]; const s = e.reduce((x, [v, n]) => x + v * n, 0); return num(`Valeurs : 10 (effectif 2), 12 (effectif 3), 15 (effectif 5). Moyenne ?`, s / 10, 2); },
    R => { const e = [[1, 4], [2, 6], [3, 5], [4, 5]]; const s = e.reduce((x, [v, n]) => x + v * n, 0); return num(`Valeurs : 1 (effectif 4), 2 (effectif 6), 3 (effectif 5), 4 (effectif 5). Moyenne ?`, s / 20, 2); },
    R => { const m = R2(R, 11, 14), n = R2(R, 4, 6), x = R2(R, 8, 18); return num(`${n} notes ont pour moyenne ${m}. On ajoute la note ${x}. Quelle est la nouvelle moyenne ? (arrondi à 0,01)`, (m * n + x) / (n + 1), 2); },
    R => { const m = R2(R, 11, 14), n = R2(R, 4, 6); return num(`Il faut une moyenne de ${m + 1} sur ${n + 1} notes. La somme des ${n} premières est ${m * n}. Quelle note faut-il obtenir ?`, (m + 1) * (n + 1) - m * n, 0); }
  ]);
  def('c6', 2, 'Médiane et étendue', 'Range d’abord les valeurs dans l’ordre croissant.', [
    R => { const k = R2(R, 0, 2), v = [3, 5, 8, 9, 12].map(x => x + k); return num(`Médiane de ${lst(shuffle(R, v))} :`, v[2], 0); },
    R => { const v = [4, 6, 7, 11, 14, 15, 20].map((x, i) => x + i); return num(`Médiane de ${lst(shuffle(R, v))} :`, v[3], 0); },
    R => { const v = [2, 5, 7, 10], k = R2(R, 0, 3); const w = v.map(x => x + k); return num(`Médiane de ${lst(shuffle(R, w))} :`, (w[1] + w[2]) / 2, 1); },
    R => { const v = [10, 12, 13, 15, 18, 20]; return num(`Médiane de ${lst(shuffle(R, v))} :`, 14, 1); },
    R => { const v = rl(R, 7, 3, 19).sort((a, b) => a - b); return num(`Médiane de ${lst(shuffle(R, v))} :`, v[3], 0); },
    R => { const v = rl(R, 6, 4, 25).sort((a, b) => a - b); return num(`Médiane de ${lst(shuffle(R, v))} :`, (v[2] + v[3]) / 2, 1); },
    R => { const v = rl(R, 6, 3, 30); return num(`Étendue de ${lst(v)} :`, Math.max(...v) - Math.min(...v), 0); },
    R => { const v = rl(R, 7, 12, 45); return num(`Étendue de ${lst(v)} :`, Math.max(...v) - Math.min(...v), 0); },
    R => { const v = [2, 3, 3, 4, 5, 6, 40]; return it(`Pour ${lst(v)}, la médiane est-elle plus proche de la moyenne ou plus « représentative » ? Donne la médiane.`, 'médiane = 4 (la valeur 40 tire la moyenne vers le haut)', 4); },
    R => { const n = pick(R, [9, 11, 15, 21]); return num(`Une série de ${n} valeurs rangées : quel est le rang de la médiane ?`, (n + 1) / 2, 0); }
  ]);
  def('c6', 3, 'Lire et comparer des données', 'Les données sont dans l’énoncé : calcule avec les valeurs lues.', [
    R => { const a = pick(R, [80, 100, 120, 200]), p = pick(R, [10, 20, 25, 50]); return num(`En janvier : ${a} entrées. En février : ${fr(a * (1 + p / 100))}. Évolution en % ?`, p, 1, '%'); },
    R => { const a = pick(R, [150, 200, 250, 400]), p = pick(R, [10, 20, 30]); return num(`En 2024 : ${a}. En 2025 : ${fr(a * (1 - p / 100))}. Évolution en % ?`, -p, 1, '%'); },
    R => { const v = rl(R, 4, 20, 80); return num(`Un diagramme en barres donne ${lst(v)}. Quel est le total ?`, v.reduce((x, y) => x + y, 0), 0); },
    R => { const v = rl(R, 5, 10, 60); return num(`Un diagramme donne ${lst(v)}. Quelle est la plus grande valeur moins la plus petite ?`, Math.max(...v) - Math.min(...v), 0); },
    R => { const t = pick(R, [120, 200, 400]), p = pick(R, [15, 25, 30, 40]); return num(`Un diagramme circulaire donne ${p} % pour une catégorie sur un total de ${t}. Quel effectif ?`, t * p / 100, 1); },
    R => { const t = pick(R, [50, 80, 200]), a = pick(R, [10, 20, 30, 40]); return num(`Sur un total de ${t}, une catégorie compte ${a * t / 100}. Quel pourcentage ?`, a, 1, '%'); },
    R => { const a = pick(R, [12, 15, 18, 24]), b = pick(R, [20, 25, 30, 36]); return it(`Mois A : ${a} millions ; mois B : ${b} millions. Quel est l’écart ?`, `${b - a} millions`, b - a); },
    R => { const [a, b, c] = pick(R, [[30, 45, 60], [20, 35, 50], [12, 18, 24]]); return num(`Série : ${a} ; ${b} ; ${c}. Quelle est la moyenne ?`, (a + b + c) / 3, 1); },
    R => { const m = pick(R, ['axe vertical qui commence à 50', 'axe vertical qui commence à 0']); return it(`Un axe vertical commence à 50 au lieu de 0. Les différences paraissent-elles plus grandes ou plus petites ?`, 'plus grandes', null); },
    R => { const a = pick(R, [200, 250, 500]), p = pick(R, [10, 20, 40]); return num(`Valeur de départ ${a}. Elle augmente de ${p} %. Valeur d’arrivée ?`, a * (1 + p / 100), 1); }
  ]);
  def('c6', 4, 'Fréquences et tableur', 'Fréquence = effectif ÷ effectif total.', [
    R => { const t = pick(R, [20, 25, 40, 50]), e = R2(R, 3, 9); return num(`Effectif ${e} sur ${t}. Fréquence (décimal) ?`, e / t, 3); },
    R => { const t = pick(R, [20, 25, 40, 50]), e = R2(R, 3, 9); return num(`Effectif ${e} sur ${t}. Fréquence en % ?`, e / t * 100, 1, '%'); },
    R => { const t = pick(R, [200, 300, 500]), f = pick(R, [0.1, 0.25, 0.4]); return num(`Fréquence ${fr(f)} sur un total de ${t}. Quel effectif ?`, f * t, 0); },
    R => { const t = pick(R, [60, 80, 120]), e = pick(R, [15, 24, 30]); return num(`Effectif ${e} sur ${t}. Fréquence en % ? (arrondi à 0,1)`, e / t * 100, 1, '%'); },
    R => { const v = [R2(R, 4, 9), R2(R, 5, 12), R2(R, 6, 14)]; const t = v.reduce((a, b) => a + b, 0); return num(`Effectifs : ${lst(v)}. Quel est l’effectif total ?`, t, 0); },
    R => { const e = [8, 12, 20]; return num(`Effectifs 8, 12 et 20. Fréquence (en %) de la dernière valeur ?`, 50, 1, '%'); },
    R => { const f = [0.2, 0.3, 0.1]; return num(`Fréquences : 0,2 ; 0,3 ; 0,1 et une dernière valeur. Quelle est la dernière fréquence ?`, 0.4, 1); },
    R => { const t = pick(R, [20, 30, 40]); return it(`Quelle est la somme de toutes les fréquences d’une série ?`, '1 (ou 100 %)', 1); },
    R => it('Au tableur, quelle formule donne la moyenne des cellules B2 à B37 ?', '=MOYENNE(B2:B37)', null),
    R => it('Au tableur, quelle formule compte combien de fois la valeur 22 apparaît dans B2:B37 ?', '=NB.SI(B2:B37;22)', null)
  ]);

  /* ======================= chapitre 7 ======================= */
  def('c7', 1, 'Calculer une probabilité', 'Écris la probabilité sous forme de fraction irréductible.', [
    R => { const [r, b] = pick(R, [[3, 5], [2, 6], [4, 4], [5, 3]]); return it(`Un sac contient ${r} boules rouges et ${b} bleues. P(tirer une rouge) ?`, sf(r, r + b), fv(r, r + b)); },
    R => { const [r, b] = pick(R, [[2, 8], [6, 4], [3, 9], [5, 5]]); return it(`Un sac contient ${r} boules rouges et ${b} bleues. P(tirer une bleue) ?`, sf(b, r + b), fv(b, r + b)); },
    R => { const k = pick(R, [3, 4, 5]); return it(`Dé à 6 faces : P(obtenir ${k}) ?`, '1/6', 1 / 6); },
    R => { const t = pick(R, [3, 4, 5]); return it(`Dé à 6 faces : P(obtenir un nombre pair) ?`, '1/2', 0.5); },
    R => { const t = pick(R, [2, 3, 4]); return it(`Dé à 6 faces : P(obtenir un nombre supérieur ou égal à ${t + 1}) ?`, sf(6 - t, 6), fv(6 - t, 6)); },
    R => { const t = pick(R, [14, 15, 16, 17]); return it(`Dé à 20 faces : P(obtenir ${t} ou plus) ?`, sf(21 - t, 20), fv(21 - t, 20)); },
    R => { const n = pick(R, [1, 2, 4]); return it(`32 cartes dont 4 as. P(tirer un as) ?`, '1/8', 1 / 8); },
    R => { const [x, y] = pick(R, [[3, 10], [7, 20], [9, 25]]); return num(`Une urne : ${fr(x)} chances sur ${y}. Écris la probabilité en pourcentage.`, x / y * 100, 1, '%'); },
    R => { const w = pick(R, [['MATHS', 5, 'A', 1], ['CALCUL', 6, 'C', 2], ['PYTHAGORE', 9, 'E', 1]]); return it(`On choisit une lettre au hasard dans ${w[0]}. P(${w[2]}) ?`, sf(w[3], w[1]), fv(w[3], w[1])); },
    R => { const p = pick(R, [0.2, 0.35, 0.6]); return it(`Une probabilité peut-elle valoir ${fr(p + 0.9)} ? Pourquoi ?`, 'non : une probabilité est toujours entre 0 et 1', null); }
  ]);
  def('c7', 2, 'Événement contraire', 'P(non A) = 1 − P(A).', [
    R => { const p = pick(R, [0.2, 0.3, 0.35, 0.4]); return num(`P(A) = ${fr(p)}. P(non A) ?`, 1 - p, 2); },
    R => { const p = pick(R, [0.15, 0.25, 0.45, 0.6]); return num(`P(A) = ${fr(p)}. P(non A) ?`, 1 - p, 2); },
    R => { const [a, b] = pick(R, [[1, 4], [2, 5], [3, 8], [1, 6]]); return it(`P(A) = ${a}/${b}. P(non A) ?`, sf(b - a, b), fv(b - a, b)); },
    R => { const [a, b] = pick(R, [[3, 10], [7, 12], [5, 9]]); return it(`P(non A) = ${a}/${b}. P(A) ?`, sf(b - a, b), fv(b - a, b)); },
    R => { const k = pick(R, [1, 2, 3]); return it(`Dé à 6 faces : P(ne pas obtenir ${k}) ?`, '5/6', 5 / 6); },
    R => { const [r, b] = pick(R, [[3, 5], [4, 6], [2, 8]]); return it(`${r} rouges et ${b} bleues : P(ne pas tirer de rouge) ?`, sf(b, r + b), fv(b, r + b)); },
    R => it('Quelle est la probabilité d’un événement impossible ?', '0', 0),
    R => it('Quelle est la probabilité d’un événement certain ?', '1', 1),
    R => { const t = pick(R, [20, 30, 50]); return it(`Dé à ${t} faces : quel est le contraire de « obtenir ${t} » ?`, `obtenir un nombre de 1 à ${t - 1}`, null); },
    R => { const p = pick(R, [0.05, 0.1, 0.2]); return num(`${fr(p * 100)} % des pièces sont défectueuses. Quelle est la probabilité qu’une pièce soit correcte ?`, 1 - p, 2); }
  ]);
  def('c7', 3, 'Expériences à deux épreuves', 'Utilise un tableau à double entrée ou un arbre.', [
    R => num('On lance deux dés à 6 faces. Combien d’issues possibles ?', 36, 0),
    R => { const k = pick(R, [2, 3, 4]); return num(`On lance une pièce et un dé à 6 faces. Combien d’issues ?`, 12, 0); },
    R => it('Deux dés équilibrés : P(somme = 7) ?', '1/6', 1 / 6),
    R => { const [s, n] = pick(R, [[2, 1], [3, 2], [4, 3], [5, 4]]); return it(`Deux dés équilibrés : P(somme = ${s}) ?`, sf(n, 36), fv(n, 36)); },
    R => { const [s, n] = pick(R, [[8, 5], [9, 4], [10, 3], [11, 2]]); return it(`Deux dés équilibrés : P(somme = ${s}) ?`, sf(n, 36), fv(n, 36)); },
    R => it('Deux dés équilibrés : P(obtenir un double) ?', '1/6', 1 / 6),
    R => { const a = R2(R, 2, 4), b = R2(R, 3, 5); return num(`On choisit une entrée parmi ${a} et un plat parmi ${b}. Combien de menus ?`, a * b, 0); },
    R => it('Deux dés équilibrés : P(somme = 1) ?', '0 (impossible)', 0),
    R => it('Deux dés équilibrés : quelle somme est la plus probable ?', '7', 7),
    R => { const n = pick(R, [2, 3]); return num(`On lance une pièce ${n} fois. Combien d’issues possibles ?`, 2 ** n, 0); }
  ]);
  def('c7', 4, 'Fréquence et probabilité', 'Fréquence observée = effectif ÷ nombre d’essais.', [
    R => { const n = pick(R, [100, 200, 500]), e = pick(R, [31, 54, 112]); return num(`${e} succès sur ${n} essais. Fréquence ?`, e / n, 3); },
    R => { const n = pick(R, [50, 200, 250]), e = pick(R, [13, 40, 70]); return num(`${e} succès sur ${n} essais. Fréquence en % ?`, e / n * 100, 1, '%'); },
    R => { const p = pick(R, [0.25, 0.3, 0.5]), n = pick(R, [200, 400, 1000]); return num(`P(A) = ${fr(p)}. Sur ${n} essais, combien de succès attend-on environ ?`, p * n, 0); },
    R => { const n = pick(R, [100, 250, 500]), e = pick(R, [0.42, 0.6, 0.36]); return num(`Fréquence ${fr(e)} sur ${n} essais. Combien de succès ?`, e * n, 0); },
    R => it('Quand on répète beaucoup une expérience, la fréquence se rapproche de quoi ?', 'de la probabilité', null),
    R => { const f = [0.6, 0.35, 0.31]; return it(`Fréquences après 10, 100 et 1 000 essais : ${lst(f.map(fr))}. La probabilité théorique est 0,3. Quelle fréquence est la plus proche ?`, '0,31 (après 1 000 essais)', null); },
    R => { const n = pick(R, [20, 50, 80]); return it(`Avec seulement ${n} essais, la fréquence est-elle toujours proche de la probabilité ?`, 'non, elle peut en être éloignée', null); },
    R => { const p = pick(R, [1 / 6, 1 / 4, 1 / 3]); return num(`P(A) = ${sf(Math.round(p * 12), 12)}. Valeur décimale arrondie à 0,01 :`, p, 2); },
    R => it('Quel outil permet de simuler 1 000 lancers de dé ?', 'un tableur ou un programme Scratch', null),
    R => { const e = pick(R, [18, 27, 36]), n = 100; return num(`Sur ${n} lancers, ${e} résultats favorables. Quelle est la fréquence en % ?`, e, 0, '%'); }
  ]);

  /* ======================= chapitre 8 ======================= */
  const hyp = (a, b) => Math.sqrt(a * a + b * b), cote = (h, b) => Math.sqrt(h * h - b * b);
  def('c8', 1, 'Le théorème de Pythagore', 'ABC est rectangle en A. Arrondis au dixième si besoin.', [
    R => { const k = R2(R, 1, 4); return num(`AB = ${3 * k} cm, AC = ${4 * k} cm. Calcule BC.`, 5 * k, 0, 'cm'); },
    R => { const k = R2(R, 1, 3); return num(`AB = ${5 * k} cm, AC = ${12 * k} cm. Calcule BC.`, 13 * k, 0, 'cm'); },
    R => { const a = R2(R, 3, 9), b = R2(R, 3, 9); return num(`AB = ${a} cm, AC = ${b} cm. Calcule BC (arrondi à 0,1).`, hyp(a, b), 1, 'cm'); },
    R => { const a = R2(R, 5, 12), b = R2(R, 5, 12); return num(`AB = ${a} cm, AC = ${b} cm. Calcule BC (arrondi à 0,1).`, hyp(a, b), 1, 'cm'); },
    R => { const k = R2(R, 1, 4); return num(`BC = ${5 * k} cm, AB = ${3 * k} cm. Calcule AC.`, 4 * k, 0, 'cm'); },
    R => { const k = R2(R, 1, 3); return num(`BC = ${13 * k} cm, AC = ${12 * k} cm. Calcule AB.`, 5 * k, 0, 'cm'); },
    R => { const h = R2(R, 9, 15), b = R2(R, 4, 8); return num(`BC = ${h} cm, AB = ${b} cm. Calcule AC (arrondi à 0,1).`, cote(h, b), 1, 'cm'); },
    R => { const a = R2(R, 6, 10); return num(`Un carré de côté ${a} cm : calcule sa diagonale (arrondi à 0,1).`, hyp(a, a), 1, 'cm'); },
    R => { const a = R2(R, 20, 40), b = R2(R, 15, 30); return num(`Un écran mesure ${a} cm sur ${b} cm. Quelle est sa diagonale ? (arrondi à 0,1)`, hyp(a, b), 1, 'cm'); },
    R => { const a = R2(R, 6, 9); return it(`Dans un triangle rectangle, quel est le côté le plus long ?`, 'l’hypoténuse (en face de l’angle droit)', null); }
  ]);
  def('c8', 2, 'Triangle rectangle ou non ?', 'Compare le carré du plus grand côté à la somme des carrés des deux autres.', (() => {
    const test = (a, b, c) => R => it(`Un triangle a pour côtés ${a} cm, ${b} cm et ${c} cm. Est-il rectangle ?`, yn(a * a + b * b === c * c) + (a * a + b * b === c * c ? ` : ${a}² + ${b}² = ${c}²` : ` : ${a}² + ${b}² = ${a * a + b * b} et ${c}² = ${c * c}`), null);
    return [test(3, 4, 5), test(5, 12, 13), test(6, 8, 10), test(7, 24, 25), test(4, 5, 6), test(5, 6, 8), test(8, 15, 17), test(9, 12, 15), test(7, 8, 11), test(20, 21, 29)];
  })());
  def('c8', 3, 'Trigonométrie : calculer une longueur', 'ABC est rectangle en A. Mets la calculatrice en degrés ; arrondis au dixième.', (() => {
    const rd = x => x * Math.PI / 180;
    return [
      R => { const h = R2(R, 8, 20), a = pick(R, [30, 40, 50, 60]); return num(`BC = ${h} cm, angle B = ${a}°. Calcule AC (côté opposé à B).`, h * Math.sin(rd(a)), 1, 'cm'); },
      R => { const h = R2(R, 8, 20), a = pick(R, [25, 35, 45, 55]); return num(`BC = ${h} cm, angle B = ${a}°. Calcule AB (côté adjacent à B).`, h * Math.cos(rd(a)), 1, 'cm'); },
      R => { const o = R2(R, 5, 12), a = pick(R, [30, 40, 50, 60]); return num(`AC = ${o} cm (opposé à B), angle B = ${a}°. Calcule BC.`, o / Math.sin(rd(a)), 1, 'cm'); },
      R => { const ad = R2(R, 5, 12), a = pick(R, [30, 40, 50, 60]); return num(`AB = ${ad} cm (adjacent à B), angle B = ${a}°. Calcule BC.`, ad / Math.cos(rd(a)), 1, 'cm'); },
      R => { const ad = R2(R, 6, 14), a = pick(R, [25, 35, 45, 55]); return num(`AB = ${ad} cm (adjacent à B), angle B = ${a}°. Calcule AC.`, ad * Math.tan(rd(a)), 1, 'cm'); },
      R => { const o = R2(R, 6, 14), a = pick(R, [25, 35, 45, 55]); return num(`AC = ${o} cm (opposé à B), angle B = ${a}°. Calcule AB.`, o / Math.tan(rd(a)), 1, 'cm'); },
      R => it('Dans un triangle rectangle, que vaut cos(angle) ?', 'côté adjacent ÷ hypoténuse', null),
      R => it('Dans un triangle rectangle, que vaut sin(angle) ?', 'côté opposé ÷ hypoténuse', null),
      R => it('Dans un triangle rectangle, que vaut tan(angle) ?', 'côté opposé ÷ côté adjacent', null),
      R => { const h = R2(R, 10, 30); return num(`Une échelle de ${h} m fait un angle de 70° avec le sol. À quelle hauteur touche-t-elle le mur ? (arrondi à 0,1)`, h * Math.sin(rd(70)), 1, 'm'); }
    ];
  })());
  def('c8', 4, 'Trigonométrie : calculer un angle', 'ABC est rectangle en A. Utilise cos⁻¹, sin⁻¹ ou tan⁻¹ ; arrondis au degré près.', (() => {
    const dg = x => x * 180 / Math.PI;
    return [
      R => { const [o, a] = pick(R, [[3, 4], [5, 7], [6, 8], [4, 9]]); return num(`AC = ${o} cm (opposé à B), AB = ${a} cm (adjacent à B). Calcule l’angle B.`, dg(Math.atan(o / a)), 0, '°'); },
      R => { const [o, a] = pick(R, [[5, 6], [7, 5], [9, 4], [2, 5]]); return num(`AC = ${o} cm (opposé à B), AB = ${a} cm (adjacent à B). Calcule l’angle B.`, dg(Math.atan(o / a)), 0, '°'); },
      R => { const [o, h] = pick(R, [[4, 8], [5, 9], [3, 7], [6, 10]]); return num(`AC = ${o} cm (opposé à B), BC = ${h} cm. Calcule l’angle B.`, dg(Math.asin(o / h)), 0, '°'); },
      R => { const [o, h] = pick(R, [[5, 12], [7, 11], [4, 9], [8, 13]]); return num(`AC = ${o} cm (opposé à B), BC = ${h} cm. Calcule l’angle B.`, dg(Math.asin(o / h)), 0, '°'); },
      R => { const [a, h] = pick(R, [[6, 10], [7, 9], [5, 8], [4, 7]]); return num(`AB = ${a} cm (adjacent à B), BC = ${h} cm. Calcule l’angle B.`, dg(Math.acos(a / h)), 0, '°'); },
      R => { const [a, h] = pick(R, [[3, 5], [8, 12], [9, 15], [6, 11]]); return num(`AB = ${a} cm (adjacent à B), BC = ${h} cm. Calcule l’angle B.`, dg(Math.acos(a / h)), 0, '°'); },
      R => { const x = pick(R, [0.4, 0.5, 0.8, 1.5]); return num(`tan x = ${fr(x)}. Calcule x.`, dg(Math.atan(x)), 0, '°'); },
      R => { const x = pick(R, [0.3, 0.5, 0.6, 0.9]); return num(`sin x = ${fr(x)}. Calcule x.`, dg(Math.asin(x)), 0, '°'); },
      R => { const a = pick(R, [20, 35, 50, 62]); return num(`Dans un triangle rectangle, un angle aigu mesure ${a}°. Combien mesure l’autre angle aigu ?`, 90 - a, 0, '°'); },
      R => { const [d, h] = pick(R, [[3, 12], [2, 8], [5, 20]]); return num(`Une rampe monte de ${d} m sur ${h} m de long. Quel angle fait-elle avec l’horizontale ? (au degré près)`, dg(Math.asin(d / h)), 0, '°'); }
    ];
  })());

  /* ======================= chapitre 9 ======================= */
  def('c9', 1, 'Utiliser une échelle', 'Longueur réelle = longueur sur le plan × dénominateur de l’échelle.', [
    R => { const e = pick(R, [50, 100, 200]), l = R2(R, 2, 9); return num(`Échelle 1/${e} : ${l} cm sur le plan. Longueur réelle, en cm :`, l * e, 0, 'cm'); },
    R => { const e = pick(R, [100, 200, 500]), l = R2(R, 3, 12); return num(`Échelle 1/${e} : ${l} cm sur le plan. Longueur réelle, en m :`, l * e / 100, 1, 'm'); },
    R => { const e = pick(R, [1000, 2000, 5000]), l = R2(R, 2, 8); return num(`Échelle 1/${e} : ${l} cm sur la carte. Longueur réelle, en m :`, l * e / 100, 0, 'm'); },
    R => { const e = pick(R, [25000, 50000, 100000]), l = R2(R, 2, 9); return num(`Échelle 1/${fr(e)} : ${l} cm sur la carte. Distance réelle, en km :`, l * e / 100000, 2, 'km'); },
    R => { const e = pick(R, [50, 100, 200]), L2 = R2(R, 3, 10) * e; return num(`Échelle 1/${e} : ${fr(L2)} cm en réalité. Longueur sur le plan :`, L2 / e, 1, 'cm'); },
    R => { const e = pick(R, [100, 250, 500]), m = R2(R, 5, 25); return num(`Échelle 1/${e} : ${m} m en réalité. Longueur sur le plan, en cm :`, m * 100 / e, 1, 'cm'); },
    R => { const [p, r] = pick(R, [[4, 800], [5, 1000], [2, 600], [6, 300]]); return it(`${p} cm sur le plan représentent ${r} cm en vrai. Quelle est l’échelle ?`, `1/${r / p}`, null); },
    R => { const [p, r] = pick(R, [[3, 150], [2, 400], [5, 250]]); return it(`${p} cm sur le plan représentent ${r} m en vrai. Quelle est l’échelle ?`, `1/${r * 100 / p}`, null); },
    R => it('Une échelle 1/50 est-elle un agrandissement ou une réduction ?', 'une réduction', null),
    R => it('Que signifie l’échelle 2/1 ?', 'on agrandit : 1 cm en vrai est dessiné sur 2 cm', null)
  ]);
  def('c9', 2, 'Agrandissements et réductions', 'Toutes les longueurs sont multipliées par le même coefficient k.', [
    R => { const k = pick(R, [2, 3, 4]), l = R2(R, 3, 9); return num(`Agrandissement de rapport ${k} : ${l} cm devient ?`, l * k, 0, 'cm'); },
    R => { const k = pick(R, [1.5, 2.5]), l = R2(R, 4, 12); return num(`Agrandissement de rapport ${fr(k)} : ${l} cm devient ?`, l * k, 1, 'cm'); },
    R => { const k = pick(R, [2, 3, 4, 5]), l = k * R2(R, 3, 8); return num(`Réduction de rapport 1/${k} : ${l} cm devient ?`, l / k, 1, 'cm'); },
    R => { const k = pick(R, [0.5, 0.2, 0.25]), l = R2(R, 4, 10) * 4; return num(`Réduction de rapport ${fr(k)} : ${l} cm devient ?`, l * k, 1, 'cm'); },
    R => { const [a, b] = pick(R, [[4, 10], [6, 15], [8, 20], [5, 8]]); return num(`Un segment de ${a} cm devient ${b} cm. Quel est le rapport k ?`, b / a, 2); },
    R => { const [a, b] = pick(R, [[12, 3], [20, 5], [18, 6], [30, 6]]); return num(`Un segment de ${a} cm devient ${b} cm. Quel est le rapport k ? (décimal)`, b / a, 2); },
    R => { const k = pick(R, [2, 3]), a = pick(R, [30, 45, 60]); return num(`Un angle de ${a}° est agrandi de rapport ${k}. Quelle est sa mesure ?`, a, 0, '°'); },
    R => { const k = pick(R, [2, 3, 4]), p = R2(R, 3, 9); return num(`Le périmètre d’un carré de côté ${p} cm est multiplié par ${k} dans un agrandissement. Nouveau périmètre ?`, 4 * p * k, 0, 'cm'); },
    R => { const k = pick(R, [3, 4]), l = R2(R, 6, 12) * k; return num(`Une maquette est à l’échelle 1/${k * 10}. Un objet réel fait ${l * 10} cm. Longueur de la maquette ?`, l / k, 1, 'cm'); },
    R => it('Dans un agrandissement, les angles changent-ils ?', 'non, les angles sont conservés', null)
  ]);
  def('c9', 3, 'Aires et volumes : k² et k³', 'Longueurs × k ; aires × k² ; volumes × k³.', [
    R => { const k = pick(R, [2, 3, 4]); return num(`Les longueurs sont multipliées par ${k}. Par combien l’aire est-elle multipliée ?`, k * k, 0); },
    R => { const k = pick(R, [2, 3, 4]); return num(`Les longueurs sont multipliées par ${k}. Par combien le volume est-il multiplié ?`, k ** 3, 0); },
    R => { const k = pick(R, [2, 3, 5]), a = R2(R, 3, 12); return num(`Une aire de ${a} cm² est agrandie de rapport ${k}. Nouvelle aire ?`, a * k * k, 0, 'cm²'); },
    R => { const k = pick(R, [2, 3]), v = R2(R, 2, 9); return num(`Un volume de ${v} cm³ est agrandi de rapport ${k}. Nouveau volume ?`, v * k ** 3, 0, 'cm³'); },
    R => { const k = pick(R, [2, 3, 4]), a = k * k * R2(R, 2, 6); return num(`Une aire de ${a} cm² est réduite de rapport 1/${k}. Nouvelle aire ?`, a / (k * k), 1, 'cm²'); },
    R => { const k = pick(R, [2, 3]), v = k ** 3 * R2(R, 2, 5); return num(`Un volume de ${v} cm³ est réduit de rapport 1/${k}. Nouveau volume ?`, v / k ** 3, 1, 'cm³'); },
    R => { const k = pick(R, [4, 9, 16, 25]); return num(`L’aire est multipliée par ${k}. Par combien les longueurs sont-elles multipliées ?`, Math.sqrt(k), 0); },
    R => { const k = pick(R, [8, 27, 64]); return num(`Le volume est multiplié par ${k}. Par combien les longueurs sont-elles multipliées ?`, Math.round(Math.cbrt(k)), 0); },
    R => { const a = pick(R, [3, 4, 5]); return it(`Si on double les longueurs, l’aire est-elle doublée ?`, 'non : elle est multipliée par 4', null); },
    R => { const k = pick(R, [3, 6]); return num(`Figurine à l’échelle 1/${k} : combien de fois moins de peinture (aire) ?`, k * k, 0); }
  ]);
  def('c9', 4, 'Le théorème de Thalès', 'Les droites (MN) et (BC) sont parallèles ; M est sur [AB], N est sur [AC].', (() => {
    const th = (kind) => R => {
      const k = pick(R, [1.5, 2, 2.5, 3]), am = R2(R, 2, 6), an = R2(R, 2, 7), ab = am * k, ac = an * k, bc0 = R2(R, 4, 9), mn = bc0, bc = mn * k;
      if (kind === 'AB') return num(`AM = ${am}, AN = ${an}, AC = ${fr(ac)}. Calcule AB. (Rapport AN/AC = AM/AB)`, ab, 1);
      if (kind === 'AC') return num(`AM = ${am}, AB = ${fr(ab)}, AN = ${an}. Calcule AC.`, ac, 1);
      if (kind === 'MN') return num(`AM = ${am}, AB = ${fr(ab)}, BC = ${fr(bc)}. Calcule MN.`, mn, 1);
      if (kind === 'BC') return num(`AM = ${am}, AB = ${fr(ab)}, MN = ${mn}. Calcule BC.`, bc, 1);
      if (kind === 'AN') return num(`AM = ${am}, AB = ${fr(ab)}, AC = ${fr(ac)}. Calcule AN.`, an, 1);
      if (kind === 'AM') return num(`AB = ${fr(ab)}, AN = ${an}, AC = ${fr(ac)}. Calcule AM.`, am, 1);
      return num(`Rapport ${fr(k)} : MN = ${mn}. Calcule BC.`, bc, 1);
    };
    return [th('AB'), th('AC'), th('MN'), th('BC'), th('AN'), th('AM'), th('BC'),
      R => { const [a, b, c, d] = pick(R, [[4, 10, 6, 15], [3, 9, 5, 15], [2, 8, 3, 12]]); return it(`AM/AB = ${a}/${b} et AN/AC = ${c}/${d}. Les droites (MN) et (BC) peuvent-elles être parallèles ?`, yn(a * d === b * c) + ' : les rapports ' + (a * d === b * c ? 'sont égaux' : 'sont différents'), null); },
      R => { const [f, mn] = pick(R, [[3, 4], [2, 7], [4, 5]]); return num(`Rapport de réduction 1/${f} : BC = ${f * mn}. Calcule MN.`, mn, 1); },
      R => { const [d1, d2, im] = pick(R, [[4, 10, 1.5], [2, 6, 2], [5, 10, 3]]); return num(`Un projecteur à ${d1} m du mur donne une image de ${fr(im)} m. À ${d2} m, quelle largeur ?`, im * d2 / d1, 2, 'm'); }];
  })());

  /* ======================= chapitre 10 ======================= */
  const PI = Math.PI;
  def('c10', 1, 'Volumes : cylindre, cône, pyramide', 'Utilise π de la calculatrice et arrondis au dixième.', [
    R => { const r = R2(R, 2, 6), h = R2(R, 4, 12); return num(`Cylindre de rayon ${r} cm et de hauteur ${h} cm. Volume ?`, PI * r * r * h, 1, 'cm³'); },
    R => { const d = R2(R, 3, 9) * 2, h = R2(R, 5, 15); return num(`Cylindre de diamètre ${d} cm et de hauteur ${h} cm. Volume ?`, PI * (d / 2) ** 2 * h, 1, 'cm³'); },
    R => { const r = R2(R, 2, 6), h = R2(R, 4, 12); return num(`Cône de rayon ${r} cm et de hauteur ${h} cm. Volume ?`, PI * r * r * h / 3, 1, 'cm³'); },
    R => { const c = R2(R, 3, 8), h = R2(R, 5, 12); return num(`Pyramide à base carrée de côté ${c} cm et de hauteur ${h} cm. Volume ?`, c * c * h / 3, 1, 'cm³'); },
    R => { const [a, b, c] = [R2(R, 3, 8), R2(R, 3, 8), R2(R, 3, 8)]; return num(`Pavé droit ${a} cm × ${b} cm × ${c} cm. Volume ?`, a * b * c, 0, 'cm³'); },
    R => { const v = pick(R, [1000, 2500, 4000, 7500]); return num(`Convertis ${fr(v)} cm³ en litres.`, v / 1000, 2, 'L'); },
    R => { const l = pick(R, [0.5, 1.5, 2, 3.5]); return num(`Convertis ${fr(l)} L en cm³.`, l * 1000, 0, 'cm³'); },
    R => { const r = R2(R, 3, 8); return num(`Aire d’une base circulaire de rayon ${r} cm (arrondi à 0,1) :`, PI * r * r, 1, 'cm²'); },
    R => { const a = pick(R, [20, 30, 45]), h = R2(R, 6, 12); return num(`Pyramide : aire de la base ${a} cm², hauteur ${h} cm. Volume ?`, a * h / 3, 1, 'cm³'); },
    R => { const r = R2(R, 2, 5), h = R2(R, 4, 9); return num(`Le cylindre (r = ${r} cm, h = ${h} cm) a un volume V. Quel est le volume du cône de même base et même hauteur ?`, PI * r * r * h / 3, 1, 'cm³'); }
  ]);
  def('c10', 2, 'Volume d’une boule', 'Boule : V = 4/3 × π × r³ ; sphère : aire = 4 × π × r².', [
    R => { const r = R2(R, 2, 5); return num(`Boule de rayon ${r} cm. Volume ?`, 4 / 3 * PI * r ** 3, 1, 'cm³'); },
    R => { const r = R2(R, 6, 9); return num(`Boule de rayon ${r} cm. Volume ?`, 4 / 3 * PI * r ** 3, 1, 'cm³'); },
    R => { const d = R2(R, 3, 8) * 2; return num(`Boule de diamètre ${d} cm. Volume ?`, 4 / 3 * PI * (d / 2) ** 3, 1, 'cm³'); },
    R => { const r = R2(R, 2, 8); return num(`Sphère de rayon ${r} cm. Aire ?`, 4 * PI * r * r, 1, 'cm²'); },
    R => { const r = R2(R, 2, 8); return num(`Périmètre d’un grand cercle de rayon ${r} cm :`, 2 * PI * r, 1, 'cm'); },
    R => { const c = pick(R, [62.8, 69, 75.4]); return num(`Le tour d’un ballon mesure ${fr(c)} cm. Quel est son rayon ? (arrondi à 0,1)`, c / (2 * PI), 1, 'cm'); },
    R => { const r = R2(R, 2, 5); return num(`Boule de rayon ${r} cm : volume en litres (arrondi à 0,001) ?`, 4 / 3 * PI * r ** 3 / 1000, 3, 'L'); },
    R => { const r = R2(R, 2, 5); return it(`Si le rayon d’une boule double, par combien le volume est-il multiplié ?`, '8', 8); },
    R => it('Quelle différence entre une sphère et une boule ?', 'la sphère est la surface, la boule est le solide', null),
    R => { const r = R2(R, 3, 7); return num(`Demi-boule de rayon ${r} cm. Volume ? (arrondi à 0,1)`, 2 / 3 * PI * r ** 3, 1, 'cm³'); }
  ]);
  def('c10', 3, 'Se repérer sur la Terre', 'Latitude : Nord ou Sud de l’équateur (0° à 90°). Longitude : Est ou Ouest de Greenwich (0° à 180°).', [
    R => { const [v, la, lo] = pick(R, [['Paris', 48.9, 2.3], ['Madrid', 40.4, -3.7], ['Rome', 41.9, 12.5], ['Berlin', 52.5, 13.4]]); return it(`${v} : ${fr(la)}° N, ${fr(Math.abs(lo))}° ${lo < 0 ? 'O' : 'E'}. Dans quel hémisphère (Nord ou Sud) ?`, 'Nord', null); },
    R => { const [v, la] = pick(R, [['Sydney', -33.9], ['Lima', -12], ['Le Cap', -33.9], ['Santiago', -33.4]]); return it(`${v} a pour latitude ${fr(Math.abs(la))}° S. Dans quel hémisphère ?`, 'Sud', null); },
    R => { const a = R2(R, 10, 60), b = a + R2(R, 10, 40); return num(`Deux villes ont pour latitudes ${a}° N et ${b}° N. Quelle est la plus au nord (donne sa latitude) ?`, b, 0, '°'); },
    R => { const a = R2(R, 5, 40), b = R2(R, 60, 140); return num(`Deux villes à l’est de Greenwich, longitudes ${a}° E et ${b}° E. Écart de longitude ?`, b - a, 0, '°'); },
    R => { const a = R2(R, 10, 80), b = R2(R, 10, 80); return num(`Une ville à ${a}° O et une autre à ${b}° E. Écart de longitude ?`, a + b, 0, '°'); },
    R => it('Quelle est la latitude de l’équateur ?', '0°', 0),
    R => it('Quelle est la longitude du méridien de Greenwich ?', '0°', 0),
    R => { const lo = R2(R, 20, 160); return it(`Longitude ${lo}° E : à l’est ou à l’ouest de Greenwich ?`, 'à l’est', null); },
    R => { const la = R2(R, 10, 80); return it(`Dans une paire de coordonnées (${la}° N ; ${la + 5}° E), laquelle est la latitude ?`, `${la}° N (la latitude s’écrit en premier)`, null); },
    R => { const a = R2(R, 30, 80); return num(`Latitude maximale : combien vaut la latitude du pôle Nord ?`, 90, 0, '°'); }
  ]);
  def('c10', 4, 'Les transformations', 'Translation, symétrie axiale, rotation, homothétie.', [
    R => it('Une figure glisse sans tourner : quelle transformation ?', 'une translation', null),
    R => it('Une figure est retournée comme dans un miroir : quelle transformation ?', 'une symétrie axiale', null),
    R => it('Une figure tourne autour d’un point : quelle transformation ?', 'une rotation', null),
    R => { const k = pick(R, [2, 3, 4]); return it(`Une figure est agrandie : toutes les longueurs sont multipliées par ${k}. Quelle transformation ?`, `une homothétie de rapport ${k}`, null); },
    R => { const l = R2(R, 4, 12); return num(`Un segment de ${l} cm subit une rotation. Quelle est sa nouvelle longueur ?`, l, 0, 'cm'); },
    R => { const a = pick(R, [35, 50, 70, 110]); return num(`Un angle de ${a}° subit une symétrie axiale. Quelle est sa nouvelle mesure ?`, a, 0, '°'); },
    R => { const k = pick(R, [2, 3]), l = R2(R, 3, 9); return num(`Homothétie de rapport ${k} : un segment de ${l} cm devient ?`, l * k, 0, 'cm'); },
    R => { const k = pick(R, [2, 3]), a = R2(R, 3, 9); return num(`Homothétie de rapport ${k} : une aire de ${a} cm² devient ?`, a * k * k, 0, 'cm²'); },
    R => { const a = R2(R, 5, 30); return num(`Une translation conserve-t-elle les aires ? Si une aire vaut ${a} cm², que vaut l’aire de l’image ?`, a, 0, 'cm²'); },
    R => it('Quelles transformations conservent les longueurs ?', 'translation, symétrie axiale, rotation', null)
  ]);
  def('c10', 5, 'Programmer une boucle', 'Dans Scratch, « répéter n fois » évite d’écrire n fois les mêmes blocs.', [
    R => { const n = pick(R, [3, 4, 5, 6, 8]); return num(`Polygone régulier à ${n} côtés : angle de rotation à chaque coin (360 ÷ ${n}) ?`, 360 / n, 0, '°'); },
    R => { const n = pick(R, [9, 10, 12, 18]); return num(`Polygone régulier à ${n} côtés : angle de rotation à chaque coin ?`, 360 / n, 0, '°'); },
    R => { const a = pick(R, [30, 45, 60, 72, 90, 120]); return num(`Le lutin tourne de ${a}° à chaque coin. Combien de côtés pour revenir au départ ?`, 360 / a, 0); },
    R => { const n = R2(R, 3, 8), c = R2(R, 20, 60); return num(`Répéter ${n} fois : avancer de ${c}, tourner. Combien de pas parcourus en tout ?`, n * c, 0); },
    R => { const n = pick(R, [4, 6, 8]), c = pick(R, [30, 40, 50]); return num(`Hexagone, octogone… régulier à ${n} côtés de ${c} pas. Périmètre ?`, n * c, 0, 'pas'); },
    R => it('Quel bloc Scratch permet de répéter des instructions un nombre fixé de fois ?', '« répéter n fois »', null),
    R => { const n = R2(R, 3, 9); return it(`Pour dessiner un carré : répéter 4 fois (avancer de 50 ; tourner de ?°). Quel angle ?`, '90°', 90); },
    R => { const n = pick(R, [5, 6, 10]); return it(`L’angle de rotation pour un polygone à ${n} côtés est-il l’angle intérieur du polygone ?`, 'non : c’est 360 ÷ n, l’angle intérieur est 180 − 360 ÷ n', null); },
    R => { const n = pick(R, [6, 10, 12]); return num(`Angle intérieur d’un polygone régulier à ${n} côtés : 180 − 360 ÷ ${n} =`, 180 - 360 / n, 0, '°'); },
    R => { const a = pick(R, [20, 40, 60]); return num(`Un lutin tourne de ${a}° à chaque coin d’un polygone régulier. Combien de côtés a-t-il ?`, 360 / a, 0); }
  ]);

  const mech = (cid, k, seed) => {
    const m = MECH[cid + '.' + k]; if (!m) throw new Error('mécanique inconnue : ' + cid + '.' + k);
    const R = MC.rng(seed);
    return { titre: m.titre, consigne: m.consigne, items: m.mk.map((f, i) => { const o = f(R); o.k = L[i]; return o; }) };
  };
  MCVT.MECH = MECH; MCVT.mech = mech;
  MCVT.MECH_REGLE = {"c1.1": "Critères : par 2, dernier chiffre pair ; par 5, il finit par 0 ou 5 ; par 10, il finit par 0 ; par 3 ou 9, la somme des chiffres est dans la table de 3 ou de 9. Un multiple de 8 se vérifie en divisant.", "c1.2": "Un nombre est premier s’il a exactement deux diviseurs, 1 et lui-même. On teste les nombres premiers 2, 3, 5, 7… jusqu’à ce que leur carré dépasse le nombre ; dès qu’une division tombe juste, il n’est pas premier.", "c1.3": "On divise le nombre par le plus petit nombre premier possible (2, puis 3, puis 5…) et on recommence avec le quotient jusqu’à obtenir 1. On regroupe les facteurs identiques avec des puissances.", "c1.4": "On cherche un diviseur commun au numérateur et au dénominateur et on divise les deux ; on recommence jusqu’à ce qu’il n’y en ait plus (ou on divise par le PGCD en une fois).", "c1.5": "On écrit les diviseurs de chaque nombre, on garde ceux qui sont communs, puis le plus grand est le PGCD. Il donne le nombre maximal de lots identiques.", "c2.1": "Même dénominateur : on additionne ou soustrait les numérateurs et on garde le dénominateur. Dénominateurs différents : on les met d’abord au même dénominateur, puis on simplifie.", "c2.2": "Pour prendre a/b d’une quantité : on divise par b, puis on multiplie par a.", "c2.3": "Produit : on additionne les exposants (10⁴ × 10³ = 10⁷). Quotient : on soustrait les exposants (10⁸ ÷ 10⁴ = 10⁴). Exposant négatif : 10⁻³ = 1 ÷ 10³ = 0,001. Préfixes : kilo 10³, méga 10⁶, giga 10⁹, milli 10⁻³.", "c2.4": "Écriture scientifique : a × 10 puissance n, avec 1 ≤ a < 10. On déplace la virgule jusqu’à n’avoir qu’un chiffre non nul avant ; n est le nombre de rangs déplacés (positif si le nombre est grand, négatif s’il est petit).", "c3.1": "k(a + b) = ka + kb ; (a + b)(c + d) = ac + ad + bc + bd. Ensuite on regroupe les termes de même sorte (les x entre eux, les x² entre eux, les nombres entre eux).", "c3.2": "On repère le facteur commun, on le met devant une parenthèse et on écrit dans la parenthèse ce qui reste. On vérifie en redéveloppant. Identités : (a + b)² = a² + 2ab + b² ; (a − b)² = a² − 2ab + b² ; (a + b)(a − b) = a² − b².", "c3.3": "On garde l’équilibre : on fait la même opération des deux côtés du signe =. D’abord on regroupe les x d’un côté et les nombres de l’autre, puis on divise par le nombre devant x. On vérifie en remplaçant x.", "c3.4": "Un produit est nul si l’un des facteurs est nul : A × B = 0 équivaut à A = 0 ou B = 0. On résout chaque équation séparément et on donne toutes les solutions.", "c4.1": "On cherche le coefficient de proportionnalité (valeur ÷ quantité) ou on passe par l’unité ; sinon, produit en croix : a ÷ b = c ÷ d donne d = b × c ÷ a.", "c4.2": "Prendre t % d’une quantité : × t ÷ 100. Augmenter de t % : × (1 + t ÷ 100). Diminuer de t % : × (1 − t ÷ 100). Taux d’évolution = (valeur finale − valeur initiale) ÷ valeur initiale.", "c4.3": "v = d ÷ t ; d = v × t ; t = d ÷ v. On convertit les unités avant de calculer (1 h = 60 min ; 1 L = 1 000 mL ; 1 m³ = 1 000 L).", "c4.4": "Ratio a : b : on compte les parts (a + b), on divise le total par le nombre de parts pour obtenir une part, puis on multiplie par a et par b.", "c5.1": "Image de a : on remplace x par a dans l’expression. Antécédent de b : on résout l’équation f(x) = b.", "c5.2": "f(x) = ax : sa représentation est une droite qui passe par l’origine ; a est le coefficient (f(1) = a). On calcule a = f(x) ÷ x.", "c5.3": "f(x) = ax + b : a est le coefficient directeur (de combien f(x) augmente quand x augmente de 1), b l’ordonnée à l’origine (f(0) = b). On trouve a avec (f(b) − f(a)) ÷ (b − a) pour deux valeurs a et b de x.", "c5.4": "Deux formules coûtent autant quand f(x) = g(x) : on résout cette équation. Avant cette valeur l’une est moins chère, après c’est l’autre.", "c6.1": "Moyenne = somme des valeurs ÷ nombre de valeurs. Avec des effectifs, on multiplie chaque valeur par son effectif avant d’additionner.", "c6.2": "On range les valeurs dans l’ordre croissant. Médiane : valeur du milieu (nombre impair de valeurs) ou moyenne des deux valeurs du milieu (nombre pair). Étendue = plus grande − plus petite.", "c6.3": "On lit les valeurs dans le tableau ou le graphique, puis on calcule : évolution = (finale − initiale) ÷ initiale ; part = valeur ÷ total.", "c6.4": "Fréquence = effectif ÷ effectif total (nombre entre 0 et 1, ou en % en multipliant par 100). Tableur : =SOMME(…), =MOYENNE(…), =MEDIANE(…).", "c7.1": "P(A) = nombre d’issues favorables ÷ nombre d’issues possibles, si toutes les issues ont la même probabilité. Une probabilité est comprise entre 0 et 1.", "c7.2": "P(non A) = 1 − P(A) : la somme des probabilités d’un événement et de son contraire vaut 1.", "c7.3": "On dresse un tableau à double entrée (ou un arbre) pour compter toutes les issues : le nombre d’issues est le produit des nombres de possibilités à chaque épreuve.", "c7.4": "Fréquence = effectif observé ÷ nombre d’essais. Plus on répète l’expérience, plus la fréquence se rapproche de la probabilité.", "c8.1": "Triangle rectangle : hypoténuse² = somme des carrés des deux autres côtés. Hypoténuse : on additionne les carrés puis √. Côté de l’angle droit : on soustrait les carrés puis √.", "c8.2": "Réciproque : si le carré du plus grand côté est égal à la somme des carrés des deux autres, le triangle est rectangle ; sinon il ne l’est pas.", "c8.3": "cos = adjacent ÷ hypoténuse ; sin = opposé ÷ hypoténuse ; tan = opposé ÷ adjacent. On choisit le rapport qui contient la longueur cherchée et celle qu’on connaît, puis on isole l’inconnue.", "c8.4": "On choisit le rapport (cos, sin ou tan) avec les deux côtés connus, puis on utilise la touche cos⁻¹, sin⁻¹ ou tan⁻¹ de la calculatrice réglée en degrés.", "c9.1": "Échelle 1/n : longueur réelle = longueur sur le plan × n. On convertit ensuite en unité demandée (100 cm = 1 m).", "c9.2": "Agrandissement ou réduction de rapport k : toutes les longueurs sont multipliées par k ; les angles ne changent pas. k > 1 agrandit, 0 < k < 1 réduit.", "c9.3": "Si les longueurs sont multipliées par k : les aires sont multipliées par k², les volumes par k³.", "c9.4": "Thalès (MN) // (BC) : AM ÷ AB = AN ÷ AC = MN ÷ BC. On écrit l’égalité avec les longueurs connues, puis on fait un produit en croix.", "c10.1": "Cylindre : π × r² × h. Cône et pyramide : (aire de la base × h) ÷ 3. On garde π de la calculatrice et on arrondit à la fin ; 1 000 cm³ = 1 L.", "c10.2": "Boule : V = 4/3 × π × r³ ; sphère : A = 4 × π × r². Le rayon est la moitié du diamètre. On arrondit seulement à la fin.", "c10.3": "Latitude : angle au nord (N) ou au sud (S) de l’équateur, de 0° à 90°. Longitude : angle à l’est (E) ou à l’ouest (O) du méridien de Greenwich, de 0° à 180°.", "c10.4": "Translation : la figure glisse sans tourner. Symétrie axiale : retournement par rapport à une droite. Rotation : on tourne autour d’un point. Homothétie de rapport k : agrandit ou réduit (k > 1 / 0 < k < 1) en gardant la forme.", "c10.5": "Un polygone régulier à n côtés : « répéter n fois : avancer de d pas, tourner de 360 ÷ n degrés ». Le périmètre vaut n × d."};

})(typeof module !== 'undefined' ? module.exports : window);
