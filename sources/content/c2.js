/* Chapitre 2 · Fractions, puissances de 10, écriture scientifique — 3ème Série Pro (programme du cycle 4, BO n° 31 du 30 juillet 2020). */
'use strict';
const K = require('./kit3e');
const { H, FM, R, Q, BQ, PB, S, T, Rc, Ar, st, SN } = K;
const { SK, D } = require('./sk3');

module.exports = function (chk) {
  const c = { id: 'c2', n: 2, col: 'pop', icone: '🔢', dom: 'Nombres et calculs · fractions et puissances', titre: 'Fractions, puissances et écriture scientifique', sous: 'Calculer avec des fractions, écrire des nombres géants' };
  c.parties = [{ t: 'Calculer avec des fractions', n: [1, 2] }, { t: 'Puissances de 10 et écriture scientifique', n: [3, 4] }];
  c.travail = { question: `Plus de ${H('85 milliards')} de cartes Pokémon produites, plus de ${H('600 millions')} de mangas One Piece imprimés, ${H('15 Mbit/s')} pour regarder en Ultra HD : comment écrire, calculer et comparer ces nombres ? Tu sauras répondre aux notions 3 et 4.` };
  c.objectifs = ['Je saurai additionner et soustraire des fractions.', 'Je saurai prendre une fraction d’une quantité et multiplier des fractions.', 'Je saurai calculer avec des puissances de 10 et utiliser les préfixes kilo, méga, giga.', 'Je saurai écrire un nombre en écriture scientifique et comparer de très grands nombres.'];
  c.depart = 'c2';

  chk(1 / 2 + 1 / 5 === 7 / 10 && 114 * 2 / 3 === 76 && 76 * 3 / 4 === 57 && 15e6 * 3600 === 54e9 && Math.round(85e9 / 6e8) === 142, 'c2 notions');

  /* ---------- méthodes visuelles ---------- */
  const cells = (x0, y, n, w, ks, h = 30) => Array.from({ length: n }, (_, i) => `<rect x="${x0 + i * w}" y="${y}" width="${w - 3}" height="${h}" rx="4" class="${ks(i)} ks" stroke-width="1.4"/>`).join('');
  // 1. 1/2 + 1/5 dans un booster de 10 cartes
  const vFrac = S(600, 230, st(1, SN(1, 22, 26) + T(160, 31, 'une moitié, un cinquième', { fs: 14, c: 'ts' }) + cells(60, 42, 2, 100, i => i ? 'wh' : 'k') + T(288, 63, '1/2', { fs: 16, c: 'kt' }) + cells(60, 82, 5, 40, i => i ? 'wh' : 'k2') + T(288, 103, '1/5', { fs: 16, c: 'kt' }))
    + st(2, SN(2, 330, 26) + T(450, 31, 'en dixièmes', { fs: 14, c: 'ts' }) + cells(340, 42, 10, 20, i => i < 5 ? 'k' : 'wh') + T(568, 63, '5/10', { fs: 15, c: 'kt' }) + cells(340, 82, 10, 20, i => i < 2 ? 'k2' : 'wh') + T(568, 103, '2/10', { fs: 15, c: 'kt' }))
    + st(3, SN(3, 22, 160) + T(300, 136, '5/10 + 2/10 = 7/10', { fs: 16 }) + cells(60, 146, 10, 48, i => i < 5 ? 'k' : i < 7 ? 'k2' : 'wh', 34))
    + st(4, `<rect x="${60 + 7 * 48 - 3}" y="143" width="${3 * 48 + 3}" height="40" rx="7" fill="none" stroke="#C2332A" stroke-width="3"/>` + SN(4, 22, 210) + T(300, 214, 'il reste 3/10 : 3 cartes sur 10', { fs: 15, c: 'kt' })),
  'Un demi et un cinquième, écrits en dixièmes : 5/10 + 2/10 = 7/10 ; il reste 3/10');
  // 2. 2/3 de 114, puis 3/4 de 76
  const vQte = S(600, 230, st(1, SN(1, 22, 30) + cells(60, 40, 3, 160, i => i < 2 ? 'k' : 'wh', 34) + [0, 1, 2].map(i => T(140 + i * 160, 63, '38', { fs: 15, c: i < 2 ? 'tw' : 'tx' })).join('') + T(300, 98, '2/3 de 114 : 114 ÷ 3 × 2 = 76 tomes', { fs: 15, c: 'kt' }))
    + st(2, SN(2, 22, 130) + cells(60, 114, 4, 80, i => i < 3 ? 'k2' : 'wh', 34) + [0, 1, 2, 3].map(i => T(98 + i * 80, 137, '19', { fs: 14 })).join('') + T(392, 136, '3/4 de 76 = 57 tomes lus', { fs: 15, a: 'start', c: 'kt' }))
    + st(3, SN(3, 22, 186) + T(44, 192, '3/4 × 2/3 = 6/12 = 1/2', { fs: 15, a: 'start' }))
    + st(4, SN(4, 312, 186) + T(334, 192, '57 = 114 ÷ 2 : la moitié', { fs: 15, a: 'start', c: 'kt' })),
  'Deux tiers de 114 tomes, soit 76 ; trois quarts de 76, soit 57 : la moitié de la série');
  // 3. préfixes et puissances de 10
  const vPuis = S(600, 230, st(1, SN(1, 22, 30) + [['kilo', '10³'], ['méga', '10⁶'], ['giga', '10⁹']].map(([a, b], i) => Rc(60 + i * 175, 40, 130, 54, { rx: 10, c: i === 1 ? 'k' : 'k2' }) + T(125 + i * 175, 63, a, { fs: 15, c: i === 1 ? 'tw' : 'tx' }) + T(125 + i * 175, 84, b, { fs: 16, c: i === 1 ? 'tw' : 'kt' })).join('') + Ar(192, 67, 233, 67, { w: 2.4, h: 9 }) + Ar(367, 67, 408, 67, { w: 2.4, h: 9 }) + T(212, 112, '× 1 000', { fs: 12, c: 'ts' }) + T(387, 112, '× 1 000', { fs: 12, c: 'ts' }))
    + st(2, SN(2, 22, 138) + T(44, 144, '15 Mbit = 15 × 10⁶ bits = 15 000 000 bits', { fs: 15, a: 'start' }))
    + st(3, SN(3, 22, 172) + T(44, 178, '1 heure = 3 600 s = 3,6 × 10³ s', { fs: 15, a: 'start' }))
    + st(4, Rc(60, 190, 520, 34, { c: 'k', rx: 10 }) + SN(4, 22, 207) + T(320, 212, '15 × 10⁶ × 3,6 × 10³ = 54 × 10⁹ bits = 54 Gbit', { fs: 15, c: 'tw' })),
  'Les préfixes kilo, méga, giga ; 15 mégabits par seconde pendant une heure font 54 gigabits');
  // 4. écriture scientifique de 85 milliards
  const dg = '85000000000'.split(''), bx = k => 120 + k * 34 - 17;
  const vSci = S(600, 230, st(1, SN(1, 22, 30) + T(300, 36, '85 milliards = 85 000 000 000', { fs: 17 }))
    + st(2, SN(2, 22, 100) + dg.map((d, i) => T(120 + i * 34, 106, d, { fs: 22, c: i < 2 ? 'kt' : 'tx' })).join('') + T(bx(1), 112, ',', { fs: 26, c: 'kt' }) + T(bx(11) + 2, 112, ',', { fs: 26, c: 'ts' }))
    + st(3, SN(3, 22, 150) + Array.from({ length: 10 }, (_, k) => `<path d="M${bx(k + 2)} 80Q${(bx(k + 1) + bx(k + 2)) / 2} 60 ${bx(k + 1)} 80" fill="none" class="ks" stroke-width="1.8"/>`).join('') + T(300, 156, 'la virgule recule de 10 rangs : 85 000 000 000 = 8,5 × 10¹⁰', { fs: 14, c: 'kt' }))
    + st(4, Rc(60, 172, 480, 52, { c: 'k', rx: 10 }) + SN(4, 60, 172) + T(300, 194, '8,5 × 10¹⁰ ÷ (6 × 10⁸) ≈ 142', { fs: 15, c: 'tw' }) + T(300, 215, 'environ 142 fois plus de cartes que de mangas', { fs: 13, c: 'tw' })),
  'On place la virgule après le premier chiffre de 85 000 000 000 : elle recule de 10 rangs, donc 8,5 × 10 puissance 10');

  c.notions = [
    { titre: 'Additionner et soustraire des fractions', decouvre: { txt: `Dans un booster (fictif) de 10 cartes, ${H('la moitié')} sont des cartes énergie et ${H('un cinquième')} des cartes dresseur. Quelle fraction du booster reste-t-il pour les autres cartes ?`, img: SK.booster() },
      methode: ['J’écris les deux fractions : 1/2 et 1/5.', 'Je les écris avec le même dénominateur, 10 : 1/2 = 5/10 et 1/5 = 2/10.', 'J’additionne les numérateurs : 5/10 + 2/10 = 7/10.', 'Le booster entier vaut 10/10 : il reste 10/10 − 7/10 = 3/10.'],
      vois: vFrac,
      solution: `<p>${FM(R`\dfrac12+\dfrac15=\dfrac5{10}+\dfrac2{10}=\dfrac7{10}`)} : les cartes énergie et dresseur font 7/10 du booster.</p><p>Il reste ${FM(R`1-\dfrac7{10}=\dfrac3{10}`)} : 3 cartes sur 10 sont d’une autre famille.</p>`,
      retiens: `<p>Pour additionner ou soustraire des fractions, on les écrit avec le <b>même dénominateur</b>, puis on additionne ou on soustrait les numérateurs.</p><p>${FM(R`\dfrac ad+\dfrac bd=\dfrac{a+b}d`)}</p>`,
      attention: 'On n’additionne jamais les dénominateurs : 1/2 + 1/5 n’est pas égal à 2/7.',
      amoi: [['Calcule 2/3 + 1/6.', '4/6 + 1/6 = 5/6'], ['Calcule 1 − 3/8.', '5/8']] },
    { titre: 'Prendre une fraction d’une quantité', decouvre: { txt: `One Piece compte ${H('114 tomes')}. Léa en possède ${H('les 2/3')}, et elle a lu ${H('les 3/4')} de ses tomes. Combien de tomes a-t-elle lus ? Quelle fraction de la série cela fait-il ?`, img: SK.etagere() },
      methode: ['2/3 de 114 : je divise par 3, puis je multiplie par 2. 114 ÷ 3 × 2 = 76 tomes.', '3/4 de 76 : 76 ÷ 4 × 3 = 57 tomes lus.', 'Pour la fraction de la série, je multiplie les fractions : 3/4 × 2/3 = 6/12.', 'Je simplifie : 6/12 = 1/2. Je vérifie : 114 ÷ 2 = 57.'],
      vois: vQte,
      solution: `<p>Léa possède 76 tomes et en a lu <b>57</b>.</p><p>${FM(R`\dfrac34\times\dfrac23=\dfrac6{12}=\dfrac12`)} : elle a lu la moitié de la série.</p>`,
      retiens: `<p>Prendre la fraction a/b d’une quantité, c’est la multiplier par a/b : on divise par b, puis on multiplie par a.</p><p>Pour multiplier deux fractions : ${FM(R`\dfrac ab\times\dfrac cd=\dfrac{a\times c}{b\times d}`)}</p>`,
      attention: 'Pour multiplier, on ne met pas au même dénominateur : on multiplie les numérateurs entre eux et les dénominateurs entre eux.',
      amoi: [['Calcule 3/5 de 40.', '24'], ['Calcule 2/7 × 3/4.', '6/28 = 3/14']] },
    { titre: 'Puissances de 10 et préfixes', decouvre: { txt: `Pour regarder en ${H('Ultra HD')}, Netflix recommande un débit de ${H('15 Mbit/s')} : 15 mégabits par seconde. Combien de bits arrivent en une seconde ? Et en une heure ?`, img: SK.box() },
      methode: ['« Méga » veut dire million : 1 Mbit = 10⁶ bits. Kilo = 10³, giga = 10⁹.', 'En une seconde : 15 Mbit = 15 × 10⁶ bits = 15 000 000 bits.', 'Une heure dure 3 600 secondes, soit 3,6 × 10³ s.', 'Je multiplie et j’additionne les exposants : 15 × 3,6 = 54 et 10⁶ × 10³ = 10⁹.'],
      vois: vPuis,
      solution: `<p>En une seconde : <b>15 000 000 bits</b>. En une heure : 15 × 10⁶ × 3 600 = <b>54 × 10⁹ bits</b>, soit 54 gigabits.</p><p>Comme 1 octet = 8 bits, cela fait environ 6,75 gigaoctets par heure.</p><p class="srcl">${D.srcNetflixDebit}</p>`,
      retiens: `<p>10ⁿ s’écrit 1 suivi de n zéros. 10⁻ⁿ = 1 ÷ 10ⁿ : 10⁻³ = 0,001.</p><p>${FM(R`10^a\times10^b=10^{a+b}`)} et ${FM(R`10^a\div10^b=10^{a-b}`)}. Kilo = 10³, méga = 10⁶, giga = 10⁹, milli = 10⁻³.</p>`,
      attention: '10⁶ n’est pas 10 × 6 = 60 : c’est 10 × 10 × 10 × 10 × 10 × 10 = 1 000 000.',
      amoi: [['10³ × 10⁴ = 10 puissance… ?', '7'], ['Écris 10⁻² en écriture décimale.', '0,01']] },
    { titre: 'L’écriture scientifique', decouvre: { txt: `Plus de ${H('85 milliards')} de cartes Pokémon ont été produites (mars 2026), et plus de ${H('600 millions')} d’exemplaires de One Piece imprimés. Comment écrire simplement ces nombres, et combien de fois l’un est-il plus grand que l’autre ?`, img: SK.montagne() },
      methode: ['J’écris le nombre en entier : 85 milliards = 85 000 000 000.', 'Je place la virgule après le premier chiffre non nul : 8,5.', 'Je compte de combien de rangs la virgule a reculé : 10 rangs, donc × 10¹⁰.', 'Je compare en divisant : 8,5 × 10¹⁰ ÷ (6 × 10⁸) ≈ 142.'],
      vois: vSci,
      solution: `<p>85 milliards = <b>8,5 × 10¹⁰</b> et 600 millions = <b>6 × 10⁸</b>.</p><p>Il y a environ <b>142 fois</b> plus de cartes produites que de mangas One Piece imprimés.</p><p class="srcl">${D.srcPokemon} ${D.srcOnePiece}</p>`,
      retiens: `<p>L’<b>écriture scientifique</b> d’un nombre est a × 10ⁿ, avec un seul chiffre non nul avant la virgule de a (1 ≤ a < 10).</p><p>Grand nombre : n positif. Nombre plus petit que 1 : n négatif (0,0007 = 7 × 10⁻⁴).</p>`,
      attention: '85 × 10⁹ est juste, mais ce n’est pas l’écriture scientifique : 85 a deux chiffres avant la virgule.',
      amoi: [['Écris 3 400 000 en écriture scientifique.', '3,4 × 10⁶'], ['Écris 0,0007 en écriture scientifique.', '7 × 10⁻⁴']] }];
  chk(Math.abs(2 / 3 + 1 / 6 - 5 / 6) < 1e-12 && 40 * 3 / 5 === 24 && Math.abs(2 / 7 * 3 / 4 - 3 / 14) < 1e-12, 'c2 « À moi »');

  c.mots = [['fraction', 'a/b : on partage en b parts égales et on en prend a', '3/4 : trois parts sur quatre.'], ['dénominateur commun', 'un même dénominateur pour plusieurs fractions', '1/2 = 5/10 et 1/5 = 2/10 : 10 est commun.'], ['puissance de 10', '10 multiplié par lui-même plusieurs fois', '10³ = 10 × 10 × 10 = 1 000.'], ['exposant', 'le petit nombre en haut, qui compte les facteurs', 'dans 10⁶, l’exposant est 6.'], ['préfixe', 'kilo, méga, giga… placé devant une unité', '15 Mbit = 15 millions de bits.'], ['écriture scientifique', 'a × 10ⁿ, avec un seul chiffre non nul avant la virgule', '85 milliards = 8,5 × 10¹⁰.']];

  c.resolus = [
    { titre: 'Calculer 5/6 − 1/4', outil: '✏️ à la main', enonce: `Calcule ${H('5/6 − 1/4')} et donne le résultat sous forme irréductible.`,
      rows: [['Multiples de 6 : 6, 12… Multiples de 4 : 4, 8, 12… → 12', 'Je cherche le plus petit dénominateur commun.'], ['5/6 = 10/12 et 1/4 = 3/12', 'Je multiplie en haut et en bas par le même nombre : × 2 et × 3.'], ['10/12 − 3/12 = 7/12', 'Même dénominateur : je soustrais les numérateurs.'], ['7/12 est irréductible', '7 est premier et ne divise pas 12.']], verif: '7/12 + 3/12 = 10/12 = 5/6 ✓', rep: '5/6 − 1/4 = 7/12.', go: ['e1'] },
    { titre: 'À toi : calculer 2/3 + 1/4', outil: '✏️ à la main', enonce: `Calcule ${H('2/3 + 1/4')} et donne le résultat sous forme irréductible.`, trous: [0, 1, 2, 3],
      rows: [['Dénominateur commun : ⟦12⟧', 'Je cherche un multiple de 3 et de 4.'], ['2/3 = ⟦8⟧/12 et 1/4 = ⟦3⟧/12', 'Je multiplie en haut et en bas par 4, puis par 3.'], ['8/12 + 3/12 = ⟦11/12⟧', 'J’additionne les numérateurs.'], ['11/12 est ⟦irréductible⟧', '11 est premier et ne divise pas 12.']], verif: '11/12 − 3/12 = 8/12 = 2/3 ✓', rep: '2/3 + 1/4 = 11/12.', go: ['e1'] }];
  c.entraine = [{ id: 'e1', gen: 'c2e1', lc: 1 }, { id: 'e2', gen: 'c2e2', lc: 3 }, { id: 'e3', gen: 'c2e3', lc: 4 }];

  /* ---------- je résous ---------- */
  chk(Math.round(6e8 / 114 / 1e5) / 10 === 5.3 && Math.round(1e10 / 365 / 1e6) === 27 && Math.round(1e10 / 365 / 86400) === 317, 'c2 problèmes 1 et 2');
  chk(360 * 5 / 12 === 150 && Math.abs(1 - 5 / 12 - 1 / 4 - 1 / 3) < 1e-12 && 150 * 2 / 5 === 60 && 60 / 360 === 1 / 6 && 360 * 200 === 72000, 'c2 problème 3');
  c.probs = [
    PB({ id: 'p1', etape: 2, lc: 4, comps: ['cal', 'com'], titre: 'Les tomes de One Piece',
      intro: `<p>Le manga One Piece compte ${H('114 tomes')} au Japon, et plus de ${H('600 millions d’exemplaires')} dans le monde.</p><p class="srcl">${D.srcOnePiece}</p>`,
      qs: [Q('a.', 'Écris 600 millions en écriture scientifique.', '600 000 000 = 6 × 10⁸', null, { w: 40 }), Q('b.', 'En moyenne, combien d’exemplaires par tome ? Réponds en millions, arrondi au dixième.', '600 ÷ 114 ≈ 5,3 millions', 5.3, { w: 30, tol: .05, lab: 'en millions :' }), Q('c.', 'Écris ce nombre (5,3 millions) en écriture scientifique.', '5,3 × 10⁶', null, { w: 34 }), Q('d.', 'En août 2022, au tome 103, la série venait de dépasser 500 millions d’exemplaires. Combien d’exemplaires de plus en 2026 ? Écris-le avec une puissance de 10.', '600 − 500 = 100 millions = 10⁸', null, { lines: 1 })],
      err: { 1: [{ v: 114 / 600, m: 'Tu as divisé 114 par 600. On partage les exemplaires entre les tomes : 600 ÷ 114.' }] },
      hints: ['600 millions = 600 000 000 : un seul chiffre avant la virgule.', 'Exemplaires par tome = exemplaires ÷ nombre de tomes.', '1 million = 10⁶ ; 100 millions = 10⁸.'], pouce: '6 × 10⁸. Par tome : 600 ÷ 114 ≈ 5,3 millions = 5,3 × 10⁶. Différence : 100 millions = 10⁸.', corr: 'a. 6 × 10⁸. b. 5,3 millions. c. 5,3 × 10⁶. d. 10⁸.' }),
    PB({ id: 'p2', etape: 3, lc: 4, defi: 4, bulle: 'Ce cas se fait en 4 étapes. Écris d’abord 10 milliards avec une puissance de 10 : tous les calculs partent de là.', autravail: { comp: 'cal', txt: 'convertir des débits et des quantités de données, en mégabits ou en gigaoctets, pour installer une box ou la fibre.' }, comps: ['che', 'mod', 'cal', 'com'], titre: 'Dix milliards de cartes en un an',
      intro: `<p>D’avril 2025 à mars 2026, environ ${H('10 milliards')} de cartes Pokémon ont été produites. Au total, plus de ${H('85 milliards')} ont été produites depuis le début.</p><p class="srcl">${D.srcPokemon}</p>`,
      qs: [Q('a.', 'Écris 10 milliards avec une puissance de 10.', '10 000 000 000 = 10¹⁰', null, { w: 34 }), Q('b.', 'En moyenne, combien de millions de cartes par jour ? Arrondis à l’unité.', '10¹⁰ ÷ 365 ≈ 27 millions', 27, { w: 26, tol: .5, lab: 'en millions :' }), Q('c.', 'Et combien de cartes par seconde ? (1 jour = 86 400 s) Arrondis à l’unité.', '10¹⁰ ÷ (365 × 86 400) ≈ 317 cartes', 317, { w: 26, tol: .6 }), Q('d.', 'Quelle fraction des 85 milliards a été produite en un an ? Simplifie-la.', '10/85 = 2/17', 2 / 17, { w: 26, tol: .001 }), Q('e.', 'Un ami écrit : « 85 milliards = 85 × 10⁶ ». Explique son erreur.', '1 milliard = 10⁹ : 85 milliards = 85 × 10⁹ = 8,5 × 10¹⁰.', null, { lines: 2 })],
      err: { 1: [{ v: 10000 / 365, m: 'Tu as la réponse en milliers. Divise 10 000 millions par 365.' }], 2: [{ v: 1e10 / 86400, m: 'Il faut diviser par le nombre de secondes d’une année : 365 × 86 400.' }], 3: [{ v: 85 / 10, m: 'C’est l’inverse : la part produite en un an, c’est 10 sur 85.' }] },
      hints: ['1 milliard = 1 000 millions = 10⁹.', 'Une année compte 365 jours, un jour 86 400 secondes.', 'Pour simplifier 10/85, divise en haut et en bas par 5.'], pouce: '10¹⁰ ÷ 365 ≈ 27 millions par jour ; ÷ 86 400 ≈ 317 par seconde ; 10/85 = 2/17.', corr: 'a. 10¹⁰. b. 27 millions. c. 317. d. 2/17. e. un milliard, c’est 10⁹.' }),
    PB({ id: 'p3', etape: 4, lc: 2, cls: 'bac', defi: 5, bulle: 'Voici une question « vers le brevet » : 5 étapes. Pense à justifier chaque calcul, et donne les fractions sous forme irréductible.', autravail: { comp: 'mod', txt: 'répartir un stock ou un budget en parts, puis calculer chaque part.' }, comps: ['mod', 'rai', 'cal', 'com'], titre: 'La médiathèque des mangas',
      intro: `<p>Une médiathèque (fictive) possède ${H('360 mangas')}. ${H('5/12')} sont des shōnen, ${H('1/4')} des shōjo, et les autres des seinen.</p>`,
      qs: [BQ('1', 'Calculer le nombre de shōnen.', 'cal', '360 ÷ 12 × 5 = 150 shōnen', 150, { w: 30 }), BQ('2', 'Montrer que les seinen représentent 1/3 de la collection.', 'rai', '1 − 5/12 − 1/4 = 12/12 − 5/12 − 3/12 = 4/12 = 1/3', null, { lines: 2 }), BQ('3', 'Les 2/5 des shōnen sont empruntés. Calculer le nombre de shōnen empruntés.', 'cal', '150 ÷ 5 × 2 = 60 shōnen', 60, { w: 30 }), BQ('4', 'Quelle fraction de toute la collection représentent les shōnen empruntés ? Donner une fraction irréductible.', 'mod', '2/5 × 5/12 = 10/60 = 1/6 (ou 60/360 = 1/6)', 1 / 6, { w: 30, tol: .001 }), BQ('5', 'Un manga compte environ 200 pages. Écrire le nombre total de pages de la collection en écriture scientifique.', 'com', '360 × 200 = 72 000 = 7,2 × 10⁴ pages', null, { w: 44 })],
      err: { 0: [{ v: 360 * 12 / 5, m: 'Pour prendre 5/12 de 360 : divise par 12, puis multiplie par 5.' }], 3: [{ v: 60, m: 'C’est le nombre de mangas. On demande une fraction : 60 sur 360.' }] },
      hints: ['5/12 de 360 : 360 ÷ 12 × 5.', 'La collection entière vaut 12/12 : 1/4 = 3/12.', 'La fraction de la collection : 60 sur 360, à simplifier.'], pouce: '150 shōnen ; seinen : 12/12 − 5/12 − 3/12 = 4/12 ; 2/5 de 150 = 60 ; 60/360 = 1/6 ; 72 000 pages.', corr: '1. 150. 2. 4/12 = 1/3. 3. 60. 4. 1/6. 5. 7,2 × 10⁴.' })];

  c.bilan = [['Je sais additionner et soustraire des fractions.', ['e1', 'p3']], ['Je sais prendre une fraction d’une quantité.', ['p3']], ['Je sais calculer avec les puissances de 10 et les préfixes.', ['e2', 'p2']], ['Je sais utiliser l’écriture scientifique.', ['e3', 'p1', 'p2']]];
  c.words = require('./gl3')('c2');
  return c;
};
