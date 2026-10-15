/* Chapitre 1 · Nombres entiers et arithmétique — 3ème Série Pro (programme du cycle 4, BO n° 31 du 30 juillet 2020). */
'use strict';
const K = require('./kit3e');
const { H, FM, R, Q, BQ, PB, S, T, Rc, Ar, st, bl, SN } = K;
const { SK, D } = require('./sk3');
const { dec, decTxt, divs, gcd, isPrime } = require('../shared/t1.js');

module.exports = function (chk) {
  const c = { id: 'c1', n: 1, col: 'nombre', icone: '🃏', dom: 'Nombres et calculs · arithmétique', titre: 'Nombres entiers et arithmétique', sous: 'Diviseurs, nombres premiers, décomposition' };
  c.parties = [{ t: 'Multiples et diviseurs', n: [1] }, { t: 'Nombres premiers et décomposition', n: [2, 3] }, { t: 'Utiliser la décomposition', n: [4, 5] }];
  c.travail = { question: `Ton classeur range ${H('9 cartes par page')}. Tu as ${H('360 cartes')}, dont ${H('252 brillantes')}. Les pages seront-elles toutes pleines ? Quelle part de ta collection brille ? Tu sauras répondre aux notions 1 et 4.` };
  c.objectifs = ['Je saurai reconnaître un multiple et un diviseur, et utiliser les critères de divisibilité.', 'Je saurai dire si un nombre est premier.', 'Je saurai décomposer un nombre en produit de facteurs premiers.', 'Je saurai rendre une fraction irréductible.', 'Je saurai partager deux quantités en lots identiques.'];
  c.depart = 'c1';

  /* ---------- contrôles des nombres du chapitre ---------- */
  chk(decTxt(360) === '2³ × 3² × 5' && decTxt(800) === '2⁵ × 5²' && decTxt(252) === '2² × 3² × 7' && decTxt(114) === '2 × 3 × 19', 'c1 décompositions');
  chk(gcd(252, 360) === 36 && gcd(126, 84) === 42 && gcd(150, 90) === 30 && isPrime(113) && !isPrime(114) && !isPrime(91) && isPrime(97), 'c1 diviseurs communs et nombres premiers');
  chk(divs(36).join() === '1,2,3,4,6,9,12,18,36' && [101, 103, 107, 109, 113].every(isPrime) && [100, 102, 104, 105, 106, 108, 110, 111, 112, 114].every(n => !isPrime(n)), 'c1 listes');

  /* ---------- méthodes visuelles (les pastilles 1, 2, 3… suivent « La méthode, pas à pas ») ---------- */
  // 1. 360 et 365 cartes, 9 par page
  const page = (x, y, n) => `<rect x="${x}" y="${y}" width="62" height="62" rx="5" class="wh ks" stroke-width="1.6"/>` + Array.from({ length: 9 }, (_, i) => `<rect x="${x + 4 + (i % 3) * 19}" y="${y + 4 + Math.floor(i / 3) * 19}" width="16" height="16" rx="2" class="${i < n ? 'k2' : 'wh'} ks" stroke-width="1"/>`).join('');
  const pages = S(600, 230, st(1, SN(1, 22, 24) + T(165, 30, '360 ÷ 9 = 40, reste 0', { fs: 16 }) + page(40, 46, 9) + page(112, 46, 9) + page(184, 46, 9) + T(268, 84, '…', { fs: 22 }) + T(165, 130, '40 pages pleines', { fs: 14, c: 'kt' }))
    + st(2, SN(2, 322, 24) + T(465, 30, '365 ÷ 9 = 40, reste 5', { fs: 16 }) + page(340, 46, 9) + T(424, 84, '…', { fs: 22 }) + page(450, 46, 5) + T(465, 130, '40 pages pleines + 1 page de 5 cartes', { fs: 13, c: 'kt' }))
    + st(3, SN(3, 22, 164) + Rc(40, 150, 250, 64, { rx: 10 }) + T(165, 176, '3 + 6 + 0 = 9', { fs: 16 }) + T(165, 200, 'dans la table de 9 : 360 ✓', { fs: 13, c: 'kt' }) + Rc(320, 150, 250, 64, { rx: 10 }) + T(445, 176, '3 + 6 + 5 = 14', { fs: 16 }) + T(445, 200, 'pas dans la table de 9 : 365 ✗', { fs: 13, c: 'kt' })),
  '360 cartes font 40 pages pleines ; 365 cartes font 40 pages pleines et une page de 5 cartes ; le critère de 9 le dit sans diviser');
  chk(360 % 9 === 0 && 365 % 9 === 5 && Math.floor(365 / 9) === 40, 'c1 notion 1');
  // 2. 114 et 113 tomes : premier ou pas ?
  const T113 = [2, 3, 5, 7].map(d => [d, 113 % d]);
  chk(T113.every(([d, r]) => r > 0) && 11 * 11 > 113 && 114 % 2 === 0, 'c1 notion 2');
  const premier = S(600, 230, st(1, SN(1, 22, 24) + T(160, 30, '114 tomes', { fs: 16, c: 'kt' }) + Rc(40, 46, 240, 74, { rx: 10 }) + T(160, 76, '114 ÷ 2 = 57, reste 0', { fs: 16 }) + T(160, 102, '2 piles de 57 : pas premier', { fs: 13, c: 'kt' }))
    + st(2, SN(2, 322, 24) + T(450, 30, '113 tomes', { fs: 16, c: 'kt' }) + T113.map(([d, r], i) => T(450, 58 + i * 22, `113 ÷ ${d} → reste ${r}`, { fs: 14 })).join(''))
    + st(3, SN(3, 322, 152) + T(462, 157, '11 × 11 = 121 > 113 : je m’arrête', { fs: 13, c: 'kt' }))
    + st(4, SN(4, 22, 192) + Rc(40, 172, 540, 44, { c: 'k', rx: 10 }) + T(310, 200, '113 est premier : ses seuls diviseurs sont 1 et 113', { fs: 15, c: 'tw' })),
  '114 se divise par 2 ; 113 ne se divise ni par 2, ni par 3, ni par 5, ni par 7, et 11 × 11 dépasse 113 : 113 est premier');
  // 3. l’escalier de 800
  const L800 = [800, 400, 200, 100, 50, 25, 5, 1], F800 = [2, 2, 2, 2, 2, 5, 5];
  const row = i => T(225, 40 + i * 24, L800[i], { fs: 16, a: 'end' }) + (i < 7 ? T(255, 40 + i * 24, F800[i], { fs: 16, a: 'start', c: 'kt' }) : '');
  const escalier = S(600, 230, `<line x1="240" y1="22" x2="240" y2="${40 + 7 * 24 + 6}" class="ks" stroke-width="2.4"/>` + T(185, 16, 'nombre', { fs: 12, c: 'ts' }) + T(285, 16, 'facteur', { fs: 12, c: 'ts' })
    + st(1, [0, 1, 2, 3, 4].map(row).join('') + SN(1, 30, 58) + T(48, 63, '÷ 2 cinq fois', { fs: 13, a: 'start', c: 'ts' }))
    + st(2, [5, 6].map(row).join('') + SN(2, 30, 160) + T(48, 165, '25 impair : ÷ 5', { fs: 13, a: 'start', c: 'ts' }))
    + st(3, row(7) + SN(3, 268, 203) + T(284, 208, 'on arrive à 1', { fs: 13, a: 'start', c: 'ts' }))
    + st(4, SN(4, 362, 72) + Rc(370, 72, 210, 96, { c: 'k', rx: 12 }) + T(475, 108, '800 = 2⁵ × 5²', { fs: 22, c: 'tw' }) + T(475, 134, '5 fois le facteur 2', { fs: 13, c: 'tw' }) + T(475, 154, '2 fois le facteur 5', { fs: 13, c: 'tw' })),
  'Escalier des divisions de 800 : cinq fois par 2, deux fois par 5 ; 800 = 2 puissance 5 × 5 au carré');
  chk(L800.slice(0, 7).every((v, i) => v / F800[i] === L800[i + 1]), 'c1 escalier de 800');
  // 4. simplifier 252/360 avec les décompositions
  const fracSvg = (x, y, n, d, o = {}) => T(x, y, n, { fs: o.fs || 20, c: o.c }) + `<line x1="${x - (o.w || 40)}" y1="${y + 9}" x2="${x + (o.w || 40)}" y2="${y + 9}" class="ks" stroke-width="2.2"/>` + T(x, y + 34, d, { fs: o.fs || 20, c: o.c });
  const simpl = S(600, 230, st(1, SN(1, 24, 26) + fracSvg(80, 60, '252', '360') + T(80, 140, '252 brillantes', { fs: 13, c: 'ts' }) + T(80, 158, 'sur 360 cartes', { fs: 13, c: 'ts' }) + T(150, 76, '=', { fs: 22 }))
    + st(2, SN(2, 196, 26) + fracSvg(300, 60, '2² × 3² × 7', '2³ × 3² × 5', { w: 110 }))
    + st(3, `<path d="M205 50L265 72M205 84L265 106M270 50L320 72M275 84L325 106" stroke="#C2332A" stroke-width="2.4"/>` + SN(3, 164, 135) + T(300, 140, 'facteurs communs : 2² × 3² = 36', { fs: 14, c: 'kt' }) + T(300, 160, 'il reste 7 en haut, 2 × 5 = 10 en bas', { fs: 13, c: 'ts' }))
    + st(4, SN(4, 566, 30) + T(440, 76, '=', { fs: 22 }) + fracSvg(500, 60, '7', '10', { w: 22, c: 'kt' }) + Array.from({ length: 10 }, (_, i) => `<rect x="${150 + i * 30}" y="186" width="26" height="26" rx="4" class="${i < 7 ? 'k' : 'k2'} ks" stroke-width="1.4"/>`).join('') + T(470, 205, '7 cartes sur 10 brillent', { fs: 13, a: 'start', c: 'kt' })),
  '252 sur 360 : on décompose, on barre les facteurs communs 2² × 3², il reste 7 sur 10');
  chk(252 / 36 === 7 && 360 / 36 === 10, 'c1 fraction 252/360');
  // 5. 126 cartes et 84 badges : les diviseurs communs
  const d126 = divs(126), d84 = divs(84), com = d126.filter(x => d84.includes(x));
  const line = (y, lab, ds) => T(36, y + 18, lab, { fs: 13, a: 'start', c: 'kt' }) + ds.map((d, i) => `<rect x="${124 + i * 38}" y="${y}" width="34" height="26" rx="5" class="${com.includes(d) ? 'k2' : 'wh'} ks" stroke-width="1.2"/>` + T(141 + i * 38, y + 18, d, { fs: 13 })).join('');
  const lots = S(600, 230, st(1, SN(1, 18, 33) + line(20, '126', d126))
    + st(2, SN(2, 18, 77) + line(64, '84', d84))
    + st(3, SN(3, 70, 116) + T(320, 121, 'diviseurs communs (fond coloré) : ' + com.join(', '), { fs: 14 }) + `<rect x="${124 + d126.indexOf(42) * 38 - 3}" y="17" width="40" height="32" rx="7" fill="none" stroke="#C2332A" stroke-width="3"/><rect x="${124 + d84.indexOf(42) * 38 - 3}" y="61" width="40" height="32" rx="7" fill="none" stroke="#C2332A" stroke-width="3"/>`)
    + st(4, Rc(60, 142, 480, 76, { c: 'k', rx: 12 }) + SN(4, 60, 142) + T(300, 170, '42 pochettes au maximum', { fs: 18, c: 'tw' }) + T(300, 198, '126 ÷ 42 = 3 cartes et 84 ÷ 42 = 2 badges par pochette', { fs: 14, c: 'tw' })),
  'Les diviseurs de 126 et de 84 ; les diviseurs communs sont colorés ; le plus grand, 42, donne 42 pochettes');
  chk(com.join() === '1,2,3,6,7,14,21,42' && 124 + 11 * 38 + 34 <= 600, 'c1 diviseurs communs de 126 et 84');

  c.notions = [
    { titre: 'Multiples, diviseurs et critères de divisibilité', decouvre: { txt: `Un classeur range ${H('9 cartes par page')}. Avec ${H('360 cartes')}, les pages sont-elles toutes pleines ? Et avec ${H('365 cartes')} ?`, img: SK.classeur() },
      methode: ['Je divise 360 par 9 : 360 = 9 × 40, le reste vaut 0. La division tombe juste.', 'Je divise 365 par 9 : 365 = 9 × 40 + 5. Le reste vaut 5 : la division ne tombe pas juste.', 'Pour aller plus vite, j’additionne les chiffres : si la somme est dans la table de 9, le nombre est divisible par 9.'],
      vois: pages,
      solution: '<p>Avec 360 cartes, les 40 pages sont pleines : 360 est un <b>multiple</b> de 9, et 9 est un <b>diviseur</b> de 360.</p><p>Avec 365 cartes, il y a 40 pages pleines et une 41e page avec seulement 5 cartes.</p>',
      retiens: `<p>a est un <b>multiple</b> de b, et b est un <b>diviseur</b> de a, si a = b × k avec k entier : le reste de a ÷ b vaut 0.</p><p><b>Critères</b> · par 2 : dernier chiffre pair ; par 5 : 0 ou 5 ; par 10 : 0 ; par 3 ou 9 : la somme des chiffres est dans la table de 3 ou de 9.</p>`,
      attention: 'Divisible par 3 ne veut pas dire divisible par 9 : 15 est divisible par 3, mais pas par 9.',
      amoi: [['465 est-il divisible par 3 ? par 9 ?', 'par 3 oui, par 9 non (4 + 6 + 5 = 15)'], ['Combien de pages pleines font 252 cartes ?', '252 ÷ 9 = 28 pages']] },
    { titre: 'Nombres premiers', decouvre: { txt: `Au Japon, le ${H('tome 114')} de One Piece est sorti le 4 mars 2026. Peut-on ranger 114 tomes en piles égales, de plusieurs façons ? Et 113 tomes ?`, img: SK.tomes() },
      methode: ['J’essaie de diviser 114 par 2 : 114 = 2 × 57. La division tombe juste.', 'J’essaie de diviser 113 par les nombres premiers 2, 3, 5 et 7 : il reste toujours quelque chose.', 'Je m’arrête quand le diviseur multiplié par lui-même dépasse 113 : 11 × 11 = 121.', 'Je conclus : 113 n’a que deux diviseurs, 1 et 113.'],
      vois: premier,
      solution: '<p>114 tomes se rangent en piles égales : 2 piles de 57, 3 piles de 38, 6 piles de 19… 114 n’est pas premier.</p><p>113 tomes ne se rangent qu’en une pile de 113, ou en 113 piles d’un tome : 113 est un <b>nombre premier</b>.</p>',
      retiens: `<p>Un nombre est <b>premier</b> s’il a exactement deux diviseurs : 1 et lui-même.</p><p>Les nombres premiers jusqu’à 30 : 2, 3, 5, 7, 11, 13, 17, 19, 23, 29.</p>`,
      attention: '1 n’est pas premier, et 2 est le seul nombre premier pair. Un seul contre-exemple suffit : 9 est impair, mais 9 = 3 × 3.',
      amoi: [['91 est-il premier ?', 'non : 91 = 7 × 13'], ['97 est-il premier ?', 'oui : ni 2, ni 3, ni 5, ni 7 ; 11 × 11 = 121']] },
    { titre: 'Décomposer en produit de facteurs premiers', decouvre: { txt: `Le ${H('7 décembre 2025')}, les Simpson ont diffusé leur ${H('800e épisode')}. Peut-on écrire 800 comme un produit de nombres premiers ?`, img: SK.arbre() },
      methode: ['Je divise 800 par 2, le plus petit nombre premier, tant que c’est possible : 5 fois. J’obtiens 25.', '25 est impair : j’essaie 3, puis 5. 25 ÷ 5 = 5, puis 5 ÷ 5 = 1.', 'Je m’arrête quand j’arrive à 1.', 'Je compte les facteurs : 5 fois le 2 et 2 fois le 5. J’écris les exposants.'],
      vois: escalier,
      solution: `<p>800 = 2 × 2 × 2 × 2 × 2 × 5 × 5, soit ${FM(R`800=2^5\times5^2`)}.</p><p>Je vérifie : 2⁵ × 5² = 32 × 25 = 800.</p>`,
      retiens: `<p>Tout nombre entier plus grand que 1 s’écrit comme un <b>produit de nombres premiers</b>. C’est sa <b>décomposition</b>, et elle est unique.</p><p>On divise par 2, 3, 5, 7… tant que c’est possible : ${FM(R`360=2^3\times3^2\times5`)}.</p>`,
      attention: 'L’exposant compte les facteurs : 2⁵ = 2 × 2 × 2 × 2 × 2 = 32. Ce n’est pas 2 × 5.',
      amoi: [['Décompose 114.', '2 × 3 × 19'], ['Calcule 2³ × 5.', '40']] },
    { titre: 'Rendre une fraction irréductible', decouvre: { txt: `Dans une collection de ${H('360 cartes')}, ${H('252')} sont brillantes. Quelle part de la collection brille ? Peut-on l’écrire avec des nombres plus petits ?`, img: SK.fraction() },
      methode: ['J’écris la fraction : 252 cartes brillantes sur 360, soit 252/360.', 'Je décompose le numérateur et le dénominateur en facteurs premiers.', 'Je barre les facteurs communs, en haut et en bas : 2² × 3² = 36.', 'Je multiplie ce qui reste : 7 en haut, 2 × 5 = 10 en bas.'],
      vois: simpl,
      solution: `<p>${FM(R`\dfrac{252}{360}=\dfrac{7}{10}`)} : 7 cartes sur 10 brillent, soit 70 % de la collection.</p><p>7/10 est <b>irréductible</b> : 7 et 10 n’ont plus de diviseur commun, sauf 1.</p>`,
      retiens: `<p>Une fraction est <b>irréductible</b> quand le numérateur et le dénominateur n’ont plus de diviseur commun, sauf 1.</p><p>Pour la rendre irréductible, on divise en haut et en bas par tous les facteurs premiers communs.</p>`,
      attention: 'On simplifie en divisant, jamais en soustrayant : 252/360 n’est pas égal à 250/358.',
      amoi: [['Rends 15/25 irréductible.', '3/5'], ['13/800 est-elle irréductible ?', 'oui : 13 est premier et ne divise pas 800']] },
    { titre: 'Partager en lots identiques', decouvre: { txt: `Une boutique (fictive) prépare des pochettes pour un tournoi avec ${H('126 cartes promo')} et ${H('84 badges')}. Les pochettes sont toutes identiques et tout est utilisé. Combien peut-elle en faire au maximum ?`, img: SK.pochettes() },
      methode: ['J’écris tous les diviseurs de 126.', 'J’écris tous les diviseurs de 84.', 'Je repère les diviseurs communs aux deux listes.', 'Le plus grand donne le nombre maximal de pochettes ; je divise pour connaître une pochette.'],
      vois: lots,
      solution: '<p>Les diviseurs communs de 126 et 84 sont 1, 2, 3, 6, 7, 14, 21 et 42. Le plus grand est 42.</p><p>La boutique fait au maximum <b>42 pochettes</b>, chacune avec 126 ÷ 42 = 3 cartes et 84 ÷ 42 = 2 badges.</p>',
      retiens: `<p>Le nombre maximal de lots identiques est le <b>plus grand diviseur commun</b> des deux quantités.</p><p>Avec les décompositions : 126 = 2 × 3² × 7 et 84 = 2² × 3 × 7. On garde les facteurs communs : 2 × 3 × 7 = 42.</p>`,
      attention: 'Le plus grand diviseur commun n’est pas le plus petit des deux nombres : 84 ne divise pas 126.',
      amoi: [['90 cartes et 60 badges : combien de pochettes au maximum ?', '30 pochettes'], ['Que contient alors chaque pochette ?', '3 cartes et 2 badges']] }];
  chk(90 / 30 === 3 && 60 / 30 === 2 && gcd(90, 60) === 30 && 252 / 9 === 28 && 465 % 3 === 0 && 465 % 9 && 91 === 7 * 13, 'c1 « À moi »');

  /* Je programme avec Scratch */
  c.scratch = [{ titre: 'tester un diviseur', lc: 1, texte: 'Le bloc « modulo » donne le reste d’une division. Si le reste vaut 0, la division tombe juste.',
    prog: [{ c: 'evt', t: 'quand ⚑ est cliqué' }, { c: 'sns', t: 'demander « Nombre de cartes ? » et attendre' }, { c: 'ctl', t: 'si (réponse modulo 9) = 0 alors', open: 1 }, { c: 'look', t: 'dire « Toutes les pages sont pleines »', d: 1 }, { c: 'ctl', t: 'sinon', open: 1 }, { c: 'look', t: 'dire « La dernière page n’est pas pleine »', d: 1 }, { c: 'ctl', t: '', end: true }],
    qs: [['Que dit le lutin si on répond 360 ?', 'Toutes les pages sont pleines', '360 modulo 9 = 0 (360 = 9 × 40) : la condition est vraie, le lutin dit « Toutes les pages sont pleines ».'], ['Que dit le lutin si on répond 365 ?', 'La dernière page n’est pas pleine', '365 modulo 9 = 5 (365 = 9 × 40 + 5) : la condition est fausse, le lutin dit « La dernière page n’est pas pleine ».'], ['Que faut-il changer pour des pages de 4 cartes ?', 'remplacer 9 par 4', 'Le nombre de cartes par page est le diviseur testé : on remplace « modulo 9 » par « modulo 4 ».']] }];

  c.mots = [['multiple', 'nombre égal à un autre multiplié par un entier', '360 est un multiple de 9 : 360 = 9 × 40.'], ['diviseur', 'nombre qui divise un autre, avec un reste nul', '9 est un diviseur de 360.'], ['critère de divisibilité', 'règle pour savoir si un nombre est divisible, sans poser la division', '3 + 6 + 0 = 9 : 360 est divisible par 9.'], ['nombre premier', 'nombre qui a exactement deux diviseurs : 1 et lui-même', '113 est premier.'], ['décomposition en facteurs premiers', 'écriture d’un nombre comme un produit de nombres premiers', '800 = 2⁵ × 5².'], ['fraction irréductible', 'fraction qu’on ne peut plus simplifier', '252/360 = 7/10, irréductible.'], ['diviseur commun', 'nombre qui divise deux nombres à la fois', '42 divise 126 et 84.']];

  /* ---------- exercices résolus ---------- */
  c.resolus = [
    { titre: 'Décomposer 360', outil: '✏️ à la main', enonce: `Décompose ${H('360')} en produit de facteurs premiers.`,
      rows: [['360 ÷ 2 = 180 ; 180 ÷ 2 = 90 ; 90 ÷ 2 = 45', 'Je commence par 2, le plus petit nombre premier, tant que le quotient est pair.'], ['45 ÷ 3 = 15 ; 15 ÷ 3 = 5', '45 est impair. 4 + 5 = 9 : j’essaie 3.'], ['5 est premier : je m’arrête', 'Un nombre premier ne se décompose plus.'], ['360 = <b>2³ × 3² × 5</b>', 'Trois fois 2, deux fois 3, une fois 5 : j’écris les exposants.']], verif: '2³ × 3² × 5 = 8 × 9 × 5 = 360 ✓', rep: '360 = 2³ × 3² × 5.', go: ['e2'] },
    { titre: 'À toi : décomposer 252', outil: '✏️ à la main', enonce: `Décompose ${H('252')} en produit de facteurs premiers.`, trous: [0, 1, 2, 3],
      rows: [['252 ÷ 2 = ⟦126⟧ ; 126 ÷ 2 = ⟦63⟧', 'Je divise par 2 tant que le quotient est pair.'], ['63 ÷ 3 = ⟦21⟧ ; 21 ÷ 3 = ⟦7⟧', '63 est impair, 6 + 3 = 9 : j’essaie 3.'], ['7 est ⟦premier⟧ : je m’arrête', 'Un nombre premier ne se décompose plus.'], ['252 = 2² × 3² × ⟦7⟧', 'Deux fois 2, deux fois 3, une fois 7.']], verif: '2² × 3² × 7 = 4 × 9 × 7 = 252 ✓', rep: '252 = 2² × 3² × 7.', go: ['e1', 'e3'] }];
  c.entraine = [{ id: 'e1', gen: 'c1e1', lc: 1 }, { id: 'e2', gen: 'c1e2', lc: 3 }, { id: 'e3', gen: 'c1e3', lc: 5 }];

  /* ---------- je résous ---------- */
  chk(800 / 25 === 32 && 800 % 30 !== 0 && gcd(150, 90) === 30 && 150 / 30 === 5 && 90 / 30 === 3 && 90 % 20 !== 0, 'c1 problèmes 1 et 2');
  chk(114 === 6 * 19 && gcd(76, 114) === 38 && 76 / 38 === 2 && 114 / 38 === 3 && divs(114).filter(d => d >= 10 && d <= 20).join() === '19', 'c1 problème 3');
  c.probs = [
    PB({ id: 'p1', etape: 2, lc: 3, comps: ['cal', 'rai'], titre: 'Le 800e épisode des Simpson',
      intro: `<p>Les Simpson ont diffusé leur ${H('800e épisode')} le ${H('7 décembre 2025')}.</p><p class="srcl">${D.srcSimpsons}</p>`,
      qs: [Q('a.', '800 est-il divisible par 3 ? Justifie avec un critère.', 'Non : 8 + 0 + 0 = 8 n’est pas dans la table de 3.', null, { lines: 1 }), Q('b.', 'Décompose 800 en produit de facteurs premiers.', '800 = 2⁵ × 5²', null, { w: 44 }), Q('c.', 'Un fan regarde les 800 épisodes par séances de 25 épisodes. Combien de séances ?', '800 ÷ 25 = 32 séances', 32, { w: 30 }), Q('d.', 'Peut-il faire des séances de 30 épisodes, toutes complètes ? Justifie.', 'Non : 30 = 2 × 3 × 5, et 3 ne divise pas 800.', null, { lines: 2 })],
      err: { 2: [{ v: 800 * 25, m: 'Tu as multiplié. Pour savoir combien de séances, on divise 800 par 25.' }] },
      hints: ['Pour 3, additionne les chiffres de 800.', 'Divise 800 par 2 tant que c’est possible, puis par 5.', '30 divise 800 seulement si 2, 3 et 5 apparaissent dans la décomposition de 800.'], pouce: 'Critère de 3 : somme des chiffres. Décomposition : ÷ 2 cinq fois, puis ÷ 5. Séances : 800 ÷ 25.', corr: 'a. Non (8). b. 2⁵ × 5². c. 32. d. Non : 3 ne divise pas 800.' }),
    PB({ id: 'p2', etape: 3, lc: 5, defi: 4, bulle: 'Ce cas se fait en 4 étapes. Commence par les décompositions de 150 et de 90 : elles donnent tout le reste.', autravail: { comp: 'com', txt: 'préparer des colis identiques sans rien gaspiller, en entrepôt ou en atelier.' }, comps: ['che', 'mod', 'cal', 'com'], titre: 'Les pochettes du tournoi',
      intro: `<p>Pour un tournoi de jeux de cartes, une boutique (fictive) dispose de ${H('150 cartes promo')} et de ${H('90 badges')}. Elle veut faire des pochettes identiques et tout utiliser.</p>`,
      qs: [Q('a.', 'Décompose 150 et 90 en produits de facteurs premiers.', '150 = 2 × 3 × 5² ; 90 = 2 × 3² × 5', null, { lines: 1 }), Q('b.', 'Combien de pochettes peut-elle faire au maximum ?', '2 × 3 × 5 = 30 pochettes', 30, { w: 26 }), Q('c.', 'Combien de cartes promo y a-t-il dans chaque pochette ?', '150 ÷ 30 = 5 cartes', 5, { w: 24 }), Q('d.', 'Combien de badges y a-t-il dans chaque pochette ?', '90 ÷ 30 = 3 badges', 3, { w: 24 }), Q('e.', 'Le gérant voudrait 20 pochettes. Explique-lui pourquoi c’est impossible.', '90 ÷ 20 = 4,5 : on ne peut pas mettre un demi-badge. 20 ne divise pas 90.', null, { lines: 2 })],
      err: { 1: [{ v: 90, m: '90 ne divise pas 150 : ce n’est pas un diviseur commun.' }, { v: 15, m: '15 est un diviseur commun, mais pas le plus grand.' }], 2: [{ v: 30, m: 'C’est le nombre de pochettes. On demande les cartes dans une pochette : 150 ÷ 30.' }] },
      hints: ['Divise 150 par 2, 3, 5… puis fais pareil avec 90.', 'Garde les facteurs communs aux deux décompositions.', 'Dans une pochette : quantité ÷ nombre de pochettes.'], pouce: 'Facteurs communs de 150 = 2 × 3 × 5² et 90 = 2 × 3² × 5 : 2 × 3 × 5 = 30.', corr: 'a. 150 = 2 × 3 × 5² ; 90 = 2 × 3² × 5. b. 30. c. 5 cartes. d. 3 badges. e. 20 ne divise pas 90.' }),
    PB({ id: 'p3', etape: 4, lc: 3, cls: 'bac', defi: 5, bulle: 'Voici une question « vers le brevet » : 5 étapes, avec de vraies données. Justifie chaque réponse par un calcul ou une propriété : c’est noté au brevet.', autravail: { comp: 'rai', txt: 'ranger un stock sur des étagères toutes remplies de la même façon, en entrepôt ou en médiathèque.' }, comps: ['che', 'rai', 'cal', 'com'], titre: 'La collection One Piece',
      intro: `<p>Le manga One Piece compte ${H('114 tomes')} au Japon depuis le 4 mars 2026, avec plus de ${H('600 millions d’exemplaires')} dans le monde. Léa veut ranger toute la série chez elle.</p><p class="srcl">${D.srcOnePiece}</p>`,
      qs: [BQ('1', 'Le nombre 114 est-il premier ? Justifier.', 'rai', 'Non : 114 est pair, donc divisible par 2 (114 = 2 × 57).', null, { lines: 1 }), BQ('2', 'Décomposer 114 en produit de facteurs premiers.', 'cal', '114 = 2 × 3 × 19', null, { w: 40 }), BQ('3', 'Léa veut le même nombre de tomes sur chaque étagère, entre 10 et 20. Combien de tomes par étagère, et combien d’étagères ?', 'che', 'Seul diviseur de 114 entre 10 et 20 : 19. Donc 19 tomes sur 6 étagères.', 19, { w: 30, lab: 'tomes par étagère :' }), BQ('4', 'Elle a lu 76 tomes. Écrire la fraction des tomes lus sous forme irréductible.', 'cal', '76/114 = (2 × 2 × 19)/(2 × 3 × 19) = 2/3', 2 / 3, { w: 30, tol: .001 }), BQ('5', 'Parmi les tomes 100 à 114, lesquels ont un numéro premier ? Expliquer la méthode.', 'com', '101, 103, 107, 109 et 113 : ils ne sont divisibles ni par 2, ni par 3, ni par 5, ni par 7.', null, { lines: 2 })],
      err: { 2: [{ v: 57, m: '57 tomes par étagère, c’est plus que 20.' }, { v: 6, m: '6 est le nombre d’étagères. On demande le nombre de tomes par étagère.' }], 3: [{ v: 76 / 114, m: 'La fraction est juste, mais elle n’est pas encore irréductible : divise par 38.' }] },
      hints: ['Un nombre pair n’est jamais premier, sauf 2.', 'Les diviseurs de 114 : cherche ceux entre 10 et 20 dans la décomposition.', 'Pour tester un nombre de 100 à 114, essaie 2, 3, 5 et 7 (11 × 11 = 121).'], pouce: '114 = 2 × 3 × 19. Étagères : un diviseur de 114 entre 10 et 20. Fraction : 76 = 2² × 19.', corr: '1. Non (pair). 2. 2 × 3 × 19. 3. 19 tomes, 6 étagères. 4. 2/3. 5. 101, 103, 107, 109, 113.' })];

  c.bilan = [['Je sais reconnaître un multiple et un diviseur, avec les critères.', ['e1', 'p1']], ['Je sais dire si un nombre est premier.', ['p3']], ['Je sais décomposer un nombre en facteurs premiers.', ['e2', 'p1', 'p2']], ['Je sais rendre une fraction irréductible.', ['p3']], ['Je sais partager en lots identiques.', ['e3', 'p2']]];
  c.words = require('./gl3')('c1');
  return c;
};
