/* Chapitre 4 · Proportionnalité, pourcentages, grandeurs composées, ratio — 3ème Série Pro (cycle 4, BO n° 31 du 30 juillet 2020). */
'use strict';
const K = require('./kit3e');
const { H, FM, R, Q, BQ, PB, S, T, Rc, Ar, st, SN, Sketch } = K;
const { D, SV, tt, fill } = require('./sk3');

module.exports = function (chk) {
  const c = { id: 'c4', n: 4, col: 'fonction', icone: '🍜', dom: 'Organisation et gestion de données · proportionnalité', titre: 'Proportionnalité, pourcentages et grandeurs composées', sous: 'Recettes, hausses de prix, débits et ratios' };
  c.parties = [{ t: 'Proportionnalité et pourcentages', n: [1, 2] }, { t: 'Grandeurs composées et ratio', n: [3, 4] }];
  c.travail = { question: `Le 18 avril 2025, l’abonnement Netflix avec pub est passé de ${H('5,99 €')} à ${H('7,99 €')}. Est-ce une petite hausse ? Et combien de données faut-il pour regarder un film de ${H('181 minutes')} en Ultra HD ? Tu sauras répondre aux notions 2 et 3.` };
  c.objectifs = ['Je saurai reconnaître une situation de proportionnalité et calculer une quatrième proportionnelle.', 'Je saurai calculer un taux d’évolution et appliquer un pourcentage avec un coefficient.', 'Je saurai calculer avec une vitesse ou un débit.', 'Je saurai partager une quantité selon un ratio.'];
  c.depart = 'c4';

  /* ---------- illustrations « Je découvre » ---------- */
  const skEpisodes = () => { const k = Sketch(741); let s = fill(20, 20, 120, 76, .45, 'k2', 6) + k.P(k.rect(20, 20, 120, 76)) + k.P(k.line(80, 96, 80, 108) + k.line(60, 110, 100, 110), { w: 2 }); for (let i = 0; i < 4; i++) s += fill(30 + i * 26, 40, 20, 36, .9, 'k', 3); return SV(s + tt(160, 50, '4 ép.', 13) + tt(160, 72, '1 h 28', 13) + tt(100, 126, '22 épisodes : combien de temps ?', 10), 'Un écran avec quatre épisodes'); };
  const skHausse = () => { const k = Sketch(742); return SV(fill(20, 60, 60, 40, .9, 'k2', 6) + k.P(k.rect(20, 60, 60, 40)) + tt(50, 85, '5,99 €', 13) + k.P(k.line(88, 80, 112, 80), { w: 3 }) + k.P(k.poly([[106, 72], [116, 80], [106, 88]]), { w: 3 }) + fill(120, 40, 66, 60, .9, 'k', 6) + k.P(k.rect(120, 40, 66, 60)) + tt(153, 76, '7,99 €', 14, { c: '#fff' }) + tt(100, 124, 'hausse du 18 avril 2025', 11), 'Un prix qui passe de 5,99 € à 7,99 €'); };
  const skDebit = () => { const k = Sketch(743); let s = fill(24, 22, 110, 70, .45, 'k2', 6) + k.P(k.rect(24, 22, 110, 70)) + tt(79, 63, 'Full HD', 14); [16, 28, 40, 52].forEach((h, i) => { s += fill(148 + i * 11, 92 - h, 8, h, .9, i < 3 ? 'k' : 'k2', 2); }); return SV(s + tt(100, 120, '5 Mbit/s pendant 22 min', 11), 'Un écran en Full HD et des barres de réseau'); };
  const skRamen = () => { const k = Sketch(744); return SV(k.P('M30 60 Q100 130 170 60 Z', { fill: '#fff' }) + fill(40, 58, 120, 10, .9, 'k2', 4) + k.P(k.line(30, 60, 170, 60) + k.line(120, 20, 150, 56) + k.line(134, 16, 160, 54), { w: 2.6 }) + `<circle cx="80" cy="62" r="8" class="k"/>` + tt(100, 122, 'bouillon : sauce = 5 : 1', 12), 'Un bol de ramen avec des baguettes'); };

  /* ---------- méthodes visuelles ---------- */
  const cellR = (x, y, w, h, txt, o = {}) => Rc(x, y, w, h, { rx: 4, c: o.c || 'wh' }) + T(x + w / 2, y + h / 2 + 6, txt, { fs: o.fs || 16, c: o.tc || 'tx' });
  // 1. 4 épisodes en 88 min → 22 épisodes
  const vProp = S(600, 230, st(1, SN(1, 22, 30) + T(44, 36, '1 h 28 min = 60 + 28 = 88 min', { fs: 15, a: 'start' }))
    + st(2, SN(2, 22, 76) + cellR(60, 60, 110, 36, 'épisodes', { fs: 13, c: 'k2' }) + cellR(170, 60, 90, 36, '4') + cellR(60, 96, 110, 36, 'minutes', { fs: 13, c: 'k2' }) + cellR(170, 96, 90, 36, '88'))
    + st(3, SN(3, 290, 30) + cellR(260, 60, 90, 36, '1') + cellR(260, 96, 90, 36, '22', { c: 'k', tc: 'tw' }) + Ar(215, 54, 300, 54, { w: 2, h: 8, lab: '÷ 4', fs: 12, dy: -8 }) + Ar(215, 140, 300, 140, { w: 2, h: 8 }) + T(258, 158, '÷ 4', { fs: 12, c: 'kt' }))
    + st(4, SN(4, 400, 30) + cellR(350, 60, 90, 36, '22') + cellR(350, 96, 90, 36, '484', { c: 'k', tc: 'tw' }) + Ar(305, 140, 390, 140, { w: 2, h: 8 }) + T(348, 158, '× 22', { fs: 12, c: 'kt' }) + Rc(60, 176, 520, 40, { c: 'k2', rx: 10 }) + T(320, 202, '484 min = 8 × 60 + 4 = 8 h 04 min', { fs: 16 })),
  'Tableau de proportionnalité : 4 épisodes pour 88 minutes, 1 épisode pour 22 minutes, 22 épisodes pour 484 minutes');
  // 2. hausses Netflix
  const bar = (x, v, lab, k) => Rc(x, 196 - v * 7, 54, v * 7, { c: k, rx: 3 }) + T(x + 27, 190 - v * 7, lab, { fs: 13 });
  const vPct = S(600, 230, st(1, SN(1, 22, 24) + bar(60, 5.99, '5,99 €', 'k2') + bar(124, 7.99, '7,99 €', 'k') + T(122, 214, 'Standard avec pub', { fs: 12, c: 'ts' }) + bar(250, 13.49, '13,49 €', 'k2') + bar(314, 14.99, '14,99 €', 'k') + T(312, 214, 'Standard', { fs: 12, c: 'ts' }) + T(122, 118, '+ 2 €', { fs: 14, c: 'kt' }) + T(312, 66, '+ 1,50 €', { fs: 14, c: 'kt' }))
    + st(2, SN(2, 412, 50) + T(430, 56, '2 ÷ 5,99 ≈ 0,334', { fs: 14, a: 'start' }) + T(430, 78, '1,5 ÷ 13,49 ≈ 0,111', { fs: 14, a: 'start' }))
    + st(3, SN(3, 412, 112) + T(430, 118, '× 100 : + 33,4 %', { fs: 15, a: 'start', c: 'kt' }) + T(430, 140, '× 100 : + 11,1 %', { fs: 15, a: 'start', c: 'kt' }))
    + st(4, SN(4, 412, 178) + Rc(428, 162, 160, 52, { c: 'k', rx: 10 }) + T(508, 184, '7,99 ÷ 5,99', { fs: 13, c: 'tw' }) + T(508, 204, '≈ × 1,334', { fs: 14, c: 'tw' })),
  'Le Standard avec pub passe de 5,99 à 7,99 euros, soit plus 33,4 % ; le Standard de 13,49 à 14,99 euros, soit plus 11,1 %');
  // 3. débit × durée
  const vDeb = S(600, 230, st(1, SN(1, 22, 30) + T(44, 36, '22 min = 22 × 60 = 1 320 s', { fs: 15, a: 'start' }))
    + st(2, SN(2, 22, 84) + cellR(44, 64, 150, 44, '5 Mbit/s', { c: 'k2' }) + T(214, 92, '×', { fs: 20 }) + cellR(234, 64, 120, 44, '1 320 s', { c: 'k2' }) + T(374, 92, '=', { fs: 20 }) + cellR(394, 64, 180, 44, '6 600 Mbit', { c: 'k', tc: 'tw' }))
    + st(3, SN(3, 22, 146) + Ar(484, 112, 484, 136, { w: 2, h: 8 }) + T(474, 129, '÷ 8 (1 octet = 8 bits)', { fs: 12, a: 'end', c: 'kt' }) + cellR(394, 140, 180, 36, '825 Mo') + T(44, 152, 'des mégabits aux mégaoctets', { fs: 13, a: 'start', c: 'ts' }))
    + st(4, SN(4, 22, 202) + T(44, 208, '825 Mo ≈ 0,8 Go par épisode', { fs: 15, a: 'start', c: 'kt' })),
  'Données = débit × durée : 5 mégabits par seconde pendant 1 320 secondes donnent 6 600 mégabits, soit 825 mégaoctets');
  // 4. ratio 5 : 1
  const vRat = S(600, 230, st(1, SN(1, 22, 30) + T(44, 36, 'ratio 5 : 1 → 5 parts de bouillon, 1 part de sauce : 6 parts', { fs: 14, a: 'start' }))
    + st(2, SN(2, 22, 80) + Array.from({ length: 6 }, (_, i) => Rc(60 + i * 84, 58, 80, 46, { c: i < 5 ? 'k2' : 'k', rx: 6 }) + T(100 + i * 84, 87, '0,2 L', { fs: 14, c: i < 5 ? 'tx' : 'tw' })).join('') + T(320, 124, '1,2 L ÷ 6 = 0,2 L par part', { fs: 14, c: 'kt' }))
    + st(3, SN(3, 22, 160) + T(44, 166, 'bouillon : 5 × 0,2 = 1 L    ·    sauce : 1 × 0,2 = 0,2 L', { fs: 15, a: 'start' }))
    + st(4, SN(4, 22, 204) + T(44, 210, 'je vérifie : 1 + 0,2 = 1,2 L ✓ et 1 ÷ 0,2 = 5 ✓', { fs: 14, a: 'start', c: 'kt' })),
  'Le ratio 5 pour 1 partage 1,2 litre en 6 parts de 0,2 litre : 1 litre de bouillon et 0,2 litre de sauce');
  chk(88 / 4 === 22 && 22 * 22 === 484 && Math.round(2 / 5.99 * 1000) === 334 && Math.round(1.5 / 13.49 * 1000) === 111 && 5 * 1320 / 8 === 825 && Math.abs(1.2 / 6 - 0.2) < 1e-12, 'c4 notions');

  c.notions = [
    { titre: 'Proportionnalité et quatrième proportionnelle', decouvre: { txt: `Un fan regarde ${H('4 épisodes')} des Simpson en ${H('1 h 28 min')}. Tous les épisodes ont la même durée. Combien de temps lui faut-il pour une saison de ${H('22 épisodes')} ?`, img: skEpisodes() },
      methode: ['Je convertis la durée en minutes : 1 h 28 min = 88 min.', 'Je range les données dans un tableau : 4 épisodes pour 88 min.', 'Je reviens à l’unité : 1 épisode dure 88 ÷ 4 = 22 min.', 'Je multiplie : 22 épisodes durent 22 × 22 = 484 min, que je convertis en heures.'],
      vois: vProp,
      solution: '<p>Une saison de 22 épisodes dure 484 minutes, soit <b>8 h 04 min</b>.</p><p>La durée est proportionnelle au nombre d’épisodes : on multiplie toujours par 22.</p>',
      retiens: `<p>Deux grandeurs sont <b>proportionnelles</b> si on passe de l’une à l’autre en multipliant toujours par le même nombre : le <b>coefficient de proportionnalité</b>.</p><p>Quatrième proportionnelle : si a correspond à b, alors c correspond à ${FM(R`\dfrac{b\times c}{a}`)} (produit en croix).</p>`,
      attention: '1 h 28 min n’est pas 1,28 h : 28 min = 28/60 h ≈ 0,47 h. Convertis d’abord en minutes.',
      amoi: [['3 places de cinéma coûtent 27 €. Prix de 5 places ?', '45 €'], ['Convertis 2 h 15 min en minutes.', '135 min']] },
    { titre: 'Pourcentages d’évolution', decouvre: { txt: `Le 18 avril 2025, Netflix a augmenté ses prix : le Standard avec pub est passé de ${H('5,99 €')} à ${H('7,99 €')}, le Standard de ${H('13,49 €')} à ${H('14,99 €')}. Quelle formule a le plus augmenté, en pourcentage ?`, img: skHausse() },
      methode: ['Je calcule chaque hausse en euros : 7,99 − 5,99 = 2 € et 14,99 − 13,49 = 1,50 €.', 'Je divise chaque hausse par le prix de départ : 2 ÷ 5,99 et 1,50 ÷ 13,49.', 'Je multiplie par 100 pour avoir un pourcentage.', 'Le coefficient multiplicateur fait tout en une fois : 7,99 ÷ 5,99 ≈ 1,334.'],
      vois: vPct,
      solution: `<p>Standard avec pub : <b>+ 33,4 %</b>. Standard : <b>+ 11,1 %</b>.</p><p>La formule avec pub a le plus augmenté en pourcentage, même si la hausse en euros est proche.</p><p class="srcl">${D.srcNetflix}</p>`,
      retiens: `<p>Taux d’évolution : ${FM(R`\dfrac{\text{arrivée}-\text{départ}}{\text{départ}}\times100`)}</p><p>Augmenter de t %, c’est multiplier par (1 + t/100). Baisser de t %, c’est multiplier par (1 − t/100).</p>`,
      attention: 'Une hausse de 10 % puis une baisse de 10 % ne ramènent pas au prix de départ : 1,1 × 0,9 = 0,99.',
      amoi: [['Un prix de 40 € augmente de 15 %. Nouveau prix ?', '40 × 1,15 = 46 €'], ['Un jeu passe de 60 € à 45 €. Taux d’évolution ?', '−25 %']] },
    { titre: 'Grandeurs composées : vitesse et débit', decouvre: { txt: `Un épisode des Simpson dure environ ${H('22 minutes')}. En Full HD, Netflix recommande un débit de ${H('5 Mbit/s')}. Quelle quantité de données faut-il pour regarder un épisode ?`, img: skDebit() },
      methode: ['Je convertis la durée en secondes, l’unité du débit : 22 × 60 = 1 320 s.', 'Données = débit × durée : 5 × 1 320 = 6 600 Mbit.', 'Je convertis en mégaoctets : 1 octet = 8 bits, donc 6 600 ÷ 8 = 825 Mo.', 'Je donne un ordre de grandeur : environ 0,8 Go par épisode.'],
      vois: vDeb,
      solution: `<p>Un épisode en Full HD demande environ <b>825 Mo</b>, soit un peu moins de 1 Go.</p><p class="srcl">${D.srcNetflixDebit}</p>`,
      retiens: `<p>Une <b>grandeur composée</b> se calcule avec deux grandeurs. Vitesse moyenne : ${FM(R`v=\dfrac dt`)} en km/h ou m/s. Débit : données ÷ durée, en Mbit/s.</p><p>On en déduit : ${FM(R`d=v\times t`)} et données = débit × durée.</p>`,
      attention: 'Les unités doivent aller ensemble : des Mbit/s avec des secondes, des km/h avec des heures. Et 1 octet = 8 bits.',
      amoi: [['Un TGV parcourt 450 km en 1 h 30. Vitesse moyenne ?', '450 ÷ 1,5 = 300 km/h'], ['À 50 km/h, quelle distance en 3 h ?', '150 km']] },
    { titre: 'Partager selon un ratio', decouvre: { txt: `Pour un bol de ramen comme dans un animé, une recette (fictive) mélange bouillon et sauce dans le ${H('ratio 5 : 1')}. Combien faut-il de bouillon et de sauce pour ${H('1,2 L')} de soupe ?`, img: skRamen() },
      methode: ['Ratio 5 : 1 : 5 parts de bouillon pour 1 part de sauce, soit 6 parts en tout.', 'Je calcule une part : 1,2 L ÷ 6 = 0,2 L.', 'Bouillon : 5 × 0,2 = 1 L. Sauce : 1 × 0,2 = 0,2 L.', 'Je vérifie la somme et le ratio.'],
      vois: vRat,
      solution: '<p>Il faut <b>1 L de bouillon</b> et <b>0,2 L de sauce</b> (20 cL).</p>',
      retiens: '<p>Deux quantités sont dans le <b>ratio a : b</b> si, pour a parts de la première, il y a b parts de la seconde.</p><p>Pour partager une quantité selon a : b, on la divise en a + b parts égales.</p>',
      attention: 'Le ratio 5 : 1 ne veut pas dire 5 L et 1 L : ce sont des parts, à calculer.',
      amoi: [['Partage 35 € dans le ratio 3 : 4.', '15 € et 20 €'], ['30 élèves, garçons : filles = 2 : 3. Nombre de filles ?', '18 filles']] }];
  chk(27 / 3 * 5 === 45 && Math.abs(40 * 1.15 - 46) < 1e-9 && (45 - 60) / 60 === -0.25 && 450 / 1.5 === 300 && 35 / 7 * 3 === 15 && 30 / 5 * 3 === 18, 'c4 « À moi »');

  c.mots = [['proportionnelles', 'deux grandeurs reliées par un même coefficient multiplicateur', 'durée et nombre d’épisodes'], ['quatrième proportionnelle', 'la valeur manquante d’un tableau de proportionnalité', '4 → 88, donc 22 → 484'], ['taux d’évolution', 'la variation en pourcentage du prix de départ', '5,99 € → 7,99 € : + 33,4 %'], ['coefficient multiplicateur', 'le nombre par lequel on multiplie pour appliquer un pourcentage', '+ 15 % : × 1,15'], ['vitesse moyenne', 'distance ÷ durée', '450 km en 1,5 h : 300 km/h'], ['débit', 'quantité de données ÷ durée', '5 Mbit/s'], ['ratio', 'a : b, a parts pour b parts', 'bouillon : sauce = 5 : 1']];

  c.resolus = [
    { titre: 'Appliquer une baisse de 20 %', outil: '🧮 calculatrice', enonce: `Un jeu vidéo coûte ${H('69,90 €')}. Il est soldé à ${H('− 20 %')}. Calcule le nouveau prix.`,
      rows: [['Baisse de 20 % : × (1 − 0,20) = × 0,8', 'Je calcule le coefficient multiplicateur.'], ['69,90 × 0,8 = 55,92', 'Je multiplie le prix de départ par le coefficient.'], ['Nouveau prix : 55,92 €', 'J’écris l’unité.'], ['Baisse : 69,90 − 55,92 = 13,98 €', 'Je peux aussi donner la baisse en euros.']], verif: '13,98 ÷ 69,90 = 0,2, soit 20 % ✓', rep: 'Le jeu coûte 55,92 €.', go: ['e2'] },
    { titre: 'À toi : appliquer une hausse de 12 %', outil: '🧮 calculatrice', enonce: `Une place de concert coûte ${H('45 €')}. Son prix augmente de ${H('12 %')}. Calcule le nouveau prix.`, trous: [0, 1, 2, 3],
      rows: [['Hausse de 12 % : × (1 + 0,12) = × ⟦1,12⟧', 'Je calcule le coefficient multiplicateur.'], ['45 × 1,12 = ⟦50,4⟧', 'Je multiplie le prix de départ.'], ['Nouveau prix : ⟦50,40 €⟧', 'J’écris l’unité, avec deux décimales.'], ['Hausse : 50,40 − 45 = ⟦5,40 €⟧', 'La hausse en euros.']], verif: '5,40 ÷ 45 = 0,12, soit 12 % ✓', rep: 'La place coûte 50,40 €.', go: ['e2'] }];
  chk(Math.abs(69.9 * 0.8 - 55.92) < 1e-9 && Math.abs(45 * 1.12 - 50.4) < 1e-9, 'c4 résolus');
  c.entraine = [{ id: 'e1', gen: 'c4e1', lc: 1 }, { id: 'e2', gen: 'c4e2', lc: 2 }, { id: 'e3', gen: 'c4e3', lc: 3 }];

  /* ---------- je résous ---------- */
  chk(26 / 4 === 6.5 && 400 * 6.5 === 2600 && Math.abs(1.2 * 6.5 - 7.8) < 1e-9 && 2 * 6.5 === 13, 'c4 problème 1');
  chk(Math.round(2 / 19.99 * 1000) === 100 && Math.abs((14.99 - 13.49) * 12 - 18) < 1e-9 && Math.round(14.99 * 1.1 * 100) === 1649, 'c4 problème 2');
  chk(181 * 60 === 10860 && 15 * 10860 === 162900 && Math.round(162900 / 8 / 100) === 204 && Math.floor(100 / 20.3625) === 4 && (15 - 3) / 15 === 0.8, 'c4 problème 3');
  c.probs = [
    PB({ id: 'p1', etape: 2, lc: 1, comps: ['mod', 'cal'], titre: 'Des ramen pour toute la classe',
      intro: `<p>Une recette (fictive) de ramen pour ${H('4 bols')} demande ${H('400 g')} de nouilles, ${H('1,2 L')} de bouillon et ${H('2 œufs')}. On veut ${H('26 bols')} pour la classe.</p>`,
      qs: [Q('a.', 'Par combien faut-il multiplier les quantités ?', '26 ÷ 4 = 6,5', 6.5, { w: 24 }), Q('b.', 'Quelle masse de nouilles faut-il, en kg ?', '400 × 6,5 = 2 600 g = 2,6 kg', 2.6, { w: 24, lab: 'en kg :' }), Q('c.', 'Quel volume de bouillon faut-il ?', '1,2 × 6,5 = 7,8 L', 7.8, { w: 24, lab: 'en L :' }), Q('d.', 'Combien d’œufs faut-il ?', '2 × 6,5 = 13 œufs', 13, { w: 22 })],
      err: { 0: [{ v: 26 - 4, m: 'On ne soustrait pas : on cherche par combien multiplier, 26 ÷ 4.' }], 1: [{ v: 2600, m: 'C’est en grammes. La question demande des kilogrammes.' }] },
      hints: ['Coefficient = 26 ÷ 4.', 'On multiplie chaque quantité par le coefficient.', '1 kg = 1 000 g.'], pouce: 'Coefficient 26 ÷ 4 = 6,5. Nouilles : 400 × 6,5 g. Bouillon : 1,2 × 6,5 L. Œufs : 2 × 6,5.', corr: 'a. 6,5. b. 2,6 kg. c. 7,8 L. d. 13 œufs.' }),
    PB({ id: 'p2', etape: 3, lc: 2, defi: 4, bulle: 'Ce cas se fait en 4 étapes. Pour chaque pourcentage, divise toujours par le prix de départ.', autravail: { comp: 'cal', txt: 'calculer le prix d’un plat quand le prix des produits augmente, ou une perte à la cuisson.' }, comps: ['che', 'cal', 'rai', 'com'], titre: 'La hausse des abonnements',
      intro: `<p>Le 18 avril 2025, Netflix est passé de ${H('13,49 €')} à ${H('14,99 €')} par mois en Standard, et de ${H('19,99 €')} à ${H('21,99 €')} en Premium.</p><p class="srcl">${D.srcNetflix}</p>`,
      qs: [Q('a.', 'Calcule le taux d’évolution du Premium, arrondi au dixième.', '2 ÷ 19,99 × 100 ≈ + 10,0 %', 10, { w: 24, tol: .05, lab: 'en % :' }), Q('b.', 'Combien un abonné Standard paie-t-il de plus sur une année ?', '1,50 × 12 = 18 €', 18, { w: 24, lab: 'en € :' }), Q('c.', 'Si le Standard augmentait encore de 10 %, quel serait son prix, arrondi au centime ?', '14,99 × 1,1 ≈ 16,49 €', 16.49, { w: 24, tol: .006, lab: 'en € :' }), Q('d.', 'Léo dit : « Le Premium a pris 2 €, le Standard 1,50 € : le Premium a plus augmenté. » Es-tu d’accord ? Explique.', 'En euros oui, mais en pourcentage le Standard a plus augmenté : + 11,1 % contre + 10,0 %.', null, { lines: 2 })],
      err: { 0: [{ v: Math.round(2 / 21.99 * 1000) / 10, m: 'Il faut diviser par le prix de départ, 19,99 €.' }], 2: [{ v: 14.99 + 10, m: '10 % n’est pas 10 € : on multiplie par 1,1.' }] },
      hints: ['Taux = hausse ÷ prix de départ × 100.', 'Une année = 12 mois.', 'Hausse de 10 % : × 1,1.'], pouce: 'Premium : 2 ÷ 19,99 ≈ 0,100. Standard : 1,50 ÷ 13,49 ≈ 0,111. Année : 1,50 × 12.', corr: 'a. + 10,0 %. b. 18 €. c. 16,49 €. d. non, en % le Standard a plus augmenté.' }),
    PB({ id: 'p3', etape: 4, lc: 3, cls: 'bac', defi: 5, bulle: 'Voici une question « vers le brevet » : 5 étapes. Attention aux unités : minutes et secondes, bits et octets.', autravail: { comp: 'mod', txt: 'estimer une durée de cuisson ou une quantité de produits pour un service complet.' }, comps: ['che', 'mod', 'cal', 'com'], titre: 'Un film en Ultra HD',
      intro: `<p>Le film Avengers : Endgame dure ${H('181 minutes')}. En Ultra HD, Netflix recommande un débit de ${H('15 Mbit/s')}.</p><p class="srcl">${D.srcEndgame} ${D.srcNetflixDebit}</p>`,
      qs: [BQ('1', 'Convertir la durée du film en heures et minutes.', 'cal', '181 min = 3 × 60 + 1 = 3 h 01 min', null, { w: 34 }), BQ('2', 'Calculer la quantité de données du film, en mégabits.', 'mod', '181 × 60 = 10 860 s ; 15 × 10 860 = 162 900 Mbit', 162900, { w: 34 }), BQ('3', 'Convertir cette quantité en gigaoctets, arrondie au dixième (1 octet = 8 bits, 1 Go = 1 000 Mo).', 'cal', '162 900 ÷ 8 = 20 362,5 Mo ≈ 20,4 Go', 20.4, { w: 26, tol: .05, lab: 'en Go :' }), BQ('4', 'Avec un forfait mobile de 100 Go, combien de fois peut-on regarder le film en entier ?', 'che', '100 ÷ 20,4 ≈ 4,9 : 4 fois en entier', 4, { w: 22 }), BQ('5', 'En HD, le débit est de 3 Mbit/s. De quel pourcentage diminue la quantité de données ? Justifier.', 'com', '(3 − 15) ÷ 15 × 100 = − 80 % : 80 % de données en moins.', null, { lines: 2 })],
      err: { 1: [{ v: 15 * 181, m: 'Le débit est par seconde : convertis 181 min en secondes.' }], 2: [{ v: 162.9, m: 'Divise d’abord par 8 : un octet vaut 8 bits.' }], 3: [{ v: 5, m: '100 ÷ 20,4 ≈ 4,9 : la 5e fois n’est pas complète.' }] },
      hints: ['1 h = 60 min.', 'Données = débit × durée en secondes.', 'Mbit ÷ 8 → Mo ; Mo ÷ 1 000 → Go.'], pouce: '10 860 s × 15 = 162 900 Mbit ; ÷ 8 = 20 362,5 Mo ≈ 20,4 Go ; 100 ÷ 20,4 ≈ 4,9.', corr: '1. 3 h 01. 2. 162 900 Mbit. 3. 20,4 Go. 4. 4 fois. 5. − 80 %.' })];

  c.bilan = [['Je sais calculer une quatrième proportionnelle.', ['e1', 'p1']], ['Je sais calculer et appliquer un pourcentage d’évolution.', ['e2', 'p2']], ['Je sais calculer avec une vitesse ou un débit.', ['e3', 'p3']], ['Je sais partager selon un ratio.', ['n4']]];
  c.words = require('./gl3')('c4');
  return c;
};
