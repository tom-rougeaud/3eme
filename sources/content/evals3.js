/* 3ème Série Pro — « S’évaluer au format du brevet » : une évaluation par chapitre, sur le modèle de l’épreuve de mathématiques
   du DNB, série professionnelle (note de service du 2 septembre 2025) : partie 1 automatismes sans calculatrice (6 points),
   partie 2 problèmes avec la calculatrice (12 points), 2 points de rédaction. 45 minutes, sur 20.
   La grille reprend les 6 compétences du cycle 4, écrites en phrases d’élève. */
'use strict';
const K = require('./kit3e');
const { H, tab, S, T, Rc, MCVP } = K;
const { D } = require('./sk3');

const GR = {
  c10: { che: 'Je lis un programme ou un énoncé et je repère les données.', mod: 'Je choisis la formule de volume ou j’écris un programme.', rai: 'Je justifie un angle ou une figure.', cal: 'Je calcule un volume, un périmètre et je convertis.', com: 'Je rédige une conclusion claire.' },
  c9: { che: 'Je relève les longueurs et l’échelle dans l’énoncé.', mod: 'Je reconnais un agrandissement, une réduction ou une configuration de Thalès.', rai: 'Je justifie le théorème ou la propriété utilisée.', cal: 'Je calcule des longueurs, des aires ou des volumes et je convertis.', com: 'Je rédige une réponse claire avec l’unité.' },
  c8: { che: 'Je repère le triangle rectangle et les données utiles.', mod: 'Je fais un schéma et je choisis le théorème ou la formule.', rai: 'Je justifie qu’un triangle est rectangle, ou qu’il ne l’est pas.', cal: 'Je calcule une longueur ou un angle et j’arrondis.', com: 'Je rédige ma démarche et ma conclusion.' },
  c7: { che: 'Je repère les issues et l’événement étudié.', mod: 'Je choisis un tableau ou un arbre pour représenter l’expérience.', rep: 'Je lis un tableau d’effectifs ou de résultats.', rai: 'Je justifie avec une probabilité ou une fréquence.', cal: 'Je calcule une probabilité, celle d’un contraire ou une fréquence.', com: 'Je rédige une conclusion sur les chances.' },
  c6: { che: 'Je relève les données utiles dans un tableau.', mod: 'Je choisis l’indicateur qui répond à la question.', rep: 'Je lis un diagramme ou un tableau.', rai: 'J’interprète la moyenne et la médiane pour comparer.', cal: 'Je calcule moyenne, médiane, étendue et fréquence.', com: 'Je rédige une conclusion appuyée sur les indicateurs.' },
  c5: { che: 'Je relève les informations sur un graphique ou dans un énoncé.', mod: 'Je reconnais une fonction linéaire ou affine et je l’écris.', rep: 'Je lis une image, un antécédent ou un maximum sur un graphique.', rai: 'Je justifie la nature d’une fonction.', cal: 'Je calcule une image et je résous f(x) = g(x).', com: 'Je rédige une conclusion claire pour conseiller.' },
  c4: { che: 'Je relève les données utiles et je repère les unités.', mod: 'Je reconnais une situation de proportionnalité et je choisis le calcul.', rai: 'Je compare des pourcentages et je justifie ma conclusion.', cal: 'Je calcule avec un coefficient, un pourcentage ou un ratio, et je convertis.', com: 'Je rédige une réponse avec une phrase et l’unité.' },
  c3: { che: 'Je repère les données et l’inconnue dans un énoncé.', mod: 'Je traduis une situation par une expression ou une équation.', rai: 'Je prouve avec une lettre et je vérifie une solution.', cal: 'Je développe, je factorise et je résous une équation.', com: 'Je rédige une réponse qui répond à la question, avec l’unité.' },
  c2: { che: 'Je relève les données utiles dans un texte et un tableau.', mod: 'Je traduis une situation par un calcul de fraction ou de puissance.', rai: 'Je justifie une égalité de fractions ou une écriture.', cal: 'Je calcule avec des fractions et des puissances de 10.', com: 'Je rédige une réponse claire, avec l’écriture demandée.' },
  c1: { che: 'Je repère les données utiles dans un énoncé.', mod: 'Je traduis un partage en lots par un diviseur commun.', rep: 'Je lis un tableau de données.', rai: 'Je justifie avec un critère, un nombre premier ou un contre-exemple.', cal: 'Je décompose un nombre et je simplifie une fraction.', com: 'Je rédige une réponse claire, avec une phrase et l’unité.' }
};
const doc = {};
const E = {};
const chk0 = [];
const yn = ['oui', 'non'];

/* ---------- chapitre 1 · arithmétique ---------- */
{
  chk0.push(180 / 30 === 6 && 150 / 30 === 5 && 150 % 12 !== 0 && 800 / 16 === 50 && 2 ** 3 * 5 === 40 && 47 % 5 === 2 && 108 % 9 === 0 && 135 % 9 === 0 && 125 % 9 && 145 % 9);
  doc.c1 = `<div class="evdoc">${tab(['Saisons des Simpson', '1', '6', '7', '8', '9'], [['Épisodes', '13', '25', '25', '25', '25']])}<p class="srcl">${D.srcSimpsons} Le 800e épisode a été diffusé le 7 décembre 2025.</p></div>`;
  E.c1 = { lieu: 'Club de jeux et soirée séries', duree: '45 min', grille: GR.c1, redac: 2,
    auto: [
      { t: 'Lequel de ces nombres est divisible par 9 ?', comp: 'cal', pts: 1, choices: ['125', '135', '145'], ok: 1, a: '135 (1 + 3 + 5 = 9)', v: null },
      { t: '35 est-il un nombre premier ?', comp: 'rai', pts: 1, choices: yn, ok: 1, a: 'non : 35 = 5 × 7', v: null },
      { t: 'Écris 2³ × 5 sous la forme d’un nombre entier.', comp: 'cal', pts: 1, a: '40', v: 40, tol: .01, w: 20 },
      { t: 'Quelle est la fraction irréductible égale à 15/25 ?', comp: 'cal', pts: 1, choices: ['3/5', '5/15', '14/24'], ok: 0, a: '3/5', v: null },
      { t: 'Quel est le reste de la division de 47 par 5 ?', comp: 'cal', pts: 1, a: '2 (47 = 5 × 9 + 2)', v: 2, tol: .01, w: 20 },
      { t: '9 est-il un diviseur de 108 ?', comp: 'che', pts: 1, choices: yn, ok: 0, a: 'oui : 108 = 9 × 12', v: null }],
    exos: [
      { t: 'Le tournoi de cartes', intro: `<p>Un club (fictif) prépare un tournoi avec ${H('180 cartes')} et ${H('150 jetons')}. Il veut faire des lots identiques, en utilisant tout.</p>`, qs: [
        { t: 'Décomposer 180 et 150 en produits de facteurs premiers.', comp: 'cal', pts: 2, a: '180 = 2² × 3² × 5 ; 150 = 2 × 3 × 5²', v: null, lines: 1 },
        { t: 'Déterminer le nombre maximal de lots.', comp: 'mod', pts: 1.5, a: 'facteurs communs : 2 × 3 × 5 = 30 lots', v: 30, tol: .01, w: 24 },
        { t: 'Donner la composition d’un lot.', comp: 'cal', pts: 1.5, a: '180 ÷ 30 = 6 cartes et 150 ÷ 30 = 5 jetons', v: 6, tol: .01, w: 24, lab: 'cartes par lot :' },
        { t: 'Peut-on faire 12 lots ? Justifier.', comp: 'rai', pts: 1, a: 'Non : 150 ÷ 12 = 12,5 n’est pas un nombre entier.', v: null, lines: 1 }] },
      { t: 'Les épisodes des Simpson', intro: '', qs: [
        { t: 'Combien d’épisodes comptent, en tout, les saisons 6 à 9 ?', comp: 'che', pts: 1, a: '4 × 25 = 100 épisodes', v: 100, tol: .01, w: 24 },
        { t: 'Montrer que 800 n’est pas un nombre premier.', comp: 'rai', pts: 1.5, a: '800 est pair : il est divisible par 2 (800 = 2 × 400).', v: null, lines: 1 },
        { t: 'La saison 1 compte 13 épisodes. La fraction 13/800 est-elle irréductible ? Justifier.', comp: 'rai', pts: 2, a: 'Oui : 13 est premier et 800 = 2⁵ × 5² ne contient pas le facteur 13.', v: null, lines: 2 },
        { t: 'On regarde les 800 premiers épisodes, à raison de 16 par semaine. Combien de semaines faut-il ?', comp: 'mod', pts: 1.5, a: '800 ÷ 16 = 50 semaines', v: 50, tol: .01, w: 24 }] }] };
}

/* ---------- chapitre 2 · fractions et puissances ---------- */
{
  chk0.push(Math.abs(1 / 2 + 1 / 4 - 3 / 4) < 1e-12 && 4.2e3 === 4200 && 30 * 2 / 3 === 20 && Math.round(85e9 / 1e9) === 85 && Math.abs(10 / 85 - 2 / 17) < 1e-12 && Math.round(1e10 / 365 / 1e6) === 27 && Math.round(1e10 / 6e8 * 10) / 10 === 16.7);
  chk0.push(20 * 3 / 5 === 12 && 20 / 4 === 5 && 20 - 12 - 5 === 3 && Math.abs(3 / 5 + 1 / 4 - 17 / 20) < 1e-12 && 8 * 3 === 24);
  E.c2 = { lieu: 'Club manga et cartes à collectionner', duree: '45 min', grille: GR.c2, redac: 2,
    auto: [
      { t: 'Combien vaut 1/2 + 1/4 ?', comp: 'cal', pts: 1, choices: ['3/4', '2/6', '1/8'], ok: 0, a: '3/4', v: null },
      { t: '10³ × 10² est égal à :', comp: 'cal', pts: 1, choices: ['10⁵', '10⁶', '100⁵'], ok: 0, a: '10⁵', v: null },
      { t: 'Écris 4,2 × 10³ en écriture décimale.', comp: 'cal', pts: 1, a: '4 200', v: 4200, tol: .01, w: 24 },
      { t: 'Calcule 2/3 de 30.', comp: 'cal', pts: 1, a: '20', v: 20, tol: .01, w: 20 },
      { t: '10⁻² est égal à :', comp: 'rai', pts: 1, choices: ['0,01', '−100', '0,1'], ok: 0, a: '0,01', v: null },
      { t: 'Quelle écriture est l’écriture scientifique de 35 000 ?', comp: 'rai', pts: 1, choices: ['3,5 × 10⁴', '35 × 10³', '0,35 × 10⁵'], ok: 0, a: '3,5 × 10⁴', v: null }],
    exos: [
      { t: 'Les cartes produites', intro: `<p>Plus de ${H('85 milliards')} de cartes Pokémon ont été produites depuis le début, dont environ ${H('10 milliards')} entre avril 2025 et mars 2026. One Piece compte, lui, plus de ${H('600 millions')} d’exemplaires.</p><p class="srcl">${D.srcPokemon} ${D.srcOnePiece}</p>`, qs: [
        { t: 'Écrire 85 milliards en écriture scientifique.', comp: 'cal', pts: 1.5, a: '85 000 000 000 = 8,5 × 10¹⁰', v: null, w: 40 },
        { t: 'Quelle fraction des 85 milliards a été produite en un an ? Donner une fraction irréductible.', comp: 'cal', pts: 1.5, a: '10/85 = 2/17', v: 2 / 17, tol: .001, w: 26 },
        { t: 'Calculer le nombre moyen de cartes produites par jour, en millions, arrondi à l’unité.', comp: 'mod', pts: 1.5, a: '10 000 millions ÷ 365 ≈ 27 millions', v: 27, tol: .5, w: 24, lab: 'en millions :' },
        { t: 'Combien de fois 10 milliards est-il plus grand que 600 millions ? Arrondir au dixième.', comp: 'che', pts: 1.5, a: '10¹⁰ ÷ (6 × 10⁸) ≈ 16,7 fois', v: 16.7, tol: .05, w: 24 }] },
      { t: 'Le booster de 20 cartes', intro: `<p>Un booster (fictif) contient ${H('20 cartes')} : ${H('3/5')} sont communes, ${H('1/4')} sont peu communes, les autres sont rares.</p>`, qs: [
        { t: 'Calculer le nombre de cartes communes.', comp: 'cal', pts: 1, a: '20 ÷ 5 × 3 = 12 cartes', v: 12, tol: .01, w: 22 },
        { t: 'Quelle fraction du booster font les cartes communes et peu communes ensemble ?', comp: 'cal', pts: 2, a: '3/5 + 1/4 = 12/20 + 5/20 = 17/20', v: 17 / 20, tol: .001, w: 26 },
        { t: 'En déduire la fraction de cartes rares, puis leur nombre.', comp: 'mod', pts: 1.5, a: '1 − 17/20 = 3/20, soit 3 cartes', v: 3, tol: .01, w: 22, lab: 'nombre de rares :' },
        { t: 'Combien de cartes rares peut-on espérer dans 8 boosters ? Justifier.', comp: 'rai', pts: 1.5, a: '8 × 3 = 24 cartes rares', v: 24, tol: .01, w: 22 }] }] };
}

/* ---------- chapitre 3 · calcul littéral et équations ---------- */
{
  chk0.push(3 * 4 - 1 === 11 && (-2) * (-3) === 6 && Math.abs(14.99 * 12 - 179.88) < 1e-9 && 56 / 7 === 8 && Math.abs(14.99 * 8 - (7.99 * 8 + 56)) < 1e-9 && (7 + 5) * 2 - 10 === 14 && 2 * 4 === 3 * 4 - 4);
  E.c3 = { lieu: 'Soirée jeux et séries', duree: '45 min', grille: GR.c3, redac: 2,
    auto: [
      { t: 'Le développement de 2(x + 3) est :', comp: 'cal', pts: 1, choices: ['2x + 6', '2x + 3', 'x + 6'], ok: 0, a: '2x + 6', v: null },
      { t: 'Résous 2x = 10.', comp: 'cal', pts: 1, a: 'x = 5', v: 5, tol: .01, w: 20, lab: 'x =' },
      { t: 'Calcule 3x − 1 pour x = 4.', comp: 'cal', pts: 1, a: '11', v: 11, tol: .01, w: 20 },
      { t: 'Une factorisation de 4x + 8 est :', comp: 'cal', pts: 1, choices: ['4(x + 2)', '4(x + 8)', '2(x + 8)'], ok: 0, a: '4(x + 2)', v: null },
      { t: 'Les solutions de (x − 1)(x + 2) = 0 sont :', comp: 'rai', pts: 1, choices: ['1 et −2', '−1 et 2', '1 et 2'], ok: 0, a: '1 et −2', v: null },
      { t: 'Calcule (−2) × (−3).', comp: 'cal', pts: 1, a: '6', v: 6, tol: .01, w: 20 }],
    exos: [
      { t: 'Les formules de streaming', intro: `<p>Netflix coûte ${H('7,99 €')} par mois en Standard avec pub et ${H('14,99 €')} par mois en Standard.</p><p class="srcl">${D.srcNetflix}</p>`, qs: [
        { t: 'Exprimer le prix de x mois de Standard.', comp: 'mod', pts: 1, a: '14,99x', v: null, w: 30 },
        { t: 'Calculer le prix d’une année de Standard.', comp: 'cal', pts: 1, a: '14,99 × 12 = 179,88 €', v: 179.88, tol: .006, w: 26 },
        { t: 'Résoudre l’équation 14,99x = 7,99x + 56.', comp: 'cal', pts: 2, a: '7x = 56, donc x = 8', v: 8, tol: .01, w: 26, lab: 'x =' },
        { t: 'Vérifier la solution trouvée.', comp: 'rai', pts: 1, a: '14,99 × 8 = 119,92 et 7,99 × 8 + 56 = 63,92 + 56 = 119,92 ✓', v: null, lines: 1 },
        { t: 'Que signifie cette solution pour un abonné ? Répondre par une phrase.', comp: 'com', pts: 1, a: 'Au bout de 8 mois, le Standard a coûté 56 € de plus que le Standard avec pub.', v: null, lines: 1 }] },
      { t: 'L’énigme des deux programmes', intro: `<p>Programme A : choisir un nombre, ajouter 5, multiplier par 2, soustraire 10.</p><p>Programme B : choisir un nombre, le multiplier par 3, soustraire 4.</p>`, qs: [
        { t: 'Quel résultat donne le programme A avec 7 ?', comp: 'cal', pts: 1, a: '7 + 5 = 12 ; 12 × 2 = 24 ; 24 − 10 = 14', v: 14, tol: .01, w: 22 },
        { t: 'Montrer que le programme A donne toujours le double du nombre choisi.', comp: 'rai', pts: 2, a: '2(x + 5) − 10 = 2x + 10 − 10 = 2x', v: null, lines: 2 },
        { t: 'Écrire l’expression donnée par le programme B avec un nombre x.', comp: 'mod', pts: 1, a: '3x − 4', v: null, w: 26 },
        { t: 'Pour quel nombre les deux programmes donnent-ils le même résultat ?', comp: 'cal', pts: 2, a: '2x = 3x − 4, donc −x = −4 et x = 4', v: 4, tol: .01, w: 22 }] }] };
}

/* ---------- chapitre 4 · proportionnalité et pourcentages ---------- */
{
  chk0.push(24 / 3 * 5 === 40 && 50 * .2 === 10 && 120 / 2 === 60 && 300 / 4 * 10 === 750 && 1.5 / 5 * 4 === 1.2 && Math.abs(2.4 / 500 * 750 - 3.6) < 1e-9);
  chk0.push(Math.round(1.5 / 13.49 * 1000) === 111 && Math.abs(14.99 / 13.49 - 1.111) < .001 && Math.round(19.99 * 1.1 * 100) === 2199 && 2 * 12 === 24);
  E.c4 = { lieu: 'Cuisine pédagogique et soirée ciné', duree: '45 min', grille: GR.c4, redac: 2,
    auto: [
      { t: '3 places coûtent 24 €. Combien coûtent 5 places ?', comp: 'cal', pts: 1, a: '40 €', v: 40, tol: .01, w: 20, lab: 'en € :' },
      { t: 'Calcule 20 % de 50.', comp: 'cal', pts: 1, a: '10', v: 10, tol: .01, w: 20 },
      { t: 'Augmenter un prix de 5 %, c’est le multiplier par :', comp: 'mod', pts: 1, choices: ['1,05', '0,05', '1,5'], ok: 0, a: '1,05', v: null },
      { t: 'Convertis 2 h 30 min en minutes.', comp: 'cal', pts: 1, a: '150 min', v: 150, tol: .01, w: 20 },
      { t: 'Un car parcourt 120 km en 2 h. Sa vitesse moyenne, en km/h ?', comp: 'cal', pts: 1, a: '60 km/h', v: 60, tol: .01, w: 20 },
      { t: 'Partager 25 dans le ratio 2 : 3 donne :', comp: 'mod', pts: 1, choices: ['10 et 15', '2 et 3', '12 et 13'], ok: 0, a: '10 et 15', v: null }],
    exos: [
      { t: 'Les ramen de la cantine', intro: `<p>Une recette (fictive) de ramen pour ${H('4 personnes')} demande ${H('300 g')} de nouilles. Le bouillon se prépare avec de l’eau et de la sauce dans le ${H('ratio 4 : 1')}.</p>`, qs: [
        { t: 'Calculer la masse de nouilles pour 10 personnes.', comp: 'cal', pts: 1.5, a: '300 ÷ 4 × 10 = 750 g', v: 750, tol: .01, w: 22, lab: 'en g :' },
        { t: 'La masse de nouilles est-elle proportionnelle au nombre de personnes ? Donner le coefficient.', comp: 'mod', pts: 1.5, a: 'Oui : on multiplie par 75 (300 ÷ 4 = 75 g par personne).', v: null, lines: 1 },
        { t: 'Pour 1,5 L de bouillon, quel volume d’eau faut-il ?', comp: 'cal', pts: 1.5, a: '1,5 ÷ 5 = 0,3 L par part ; eau : 4 × 0,3 = 1,2 L', v: 1.2, tol: .01, w: 22, lab: 'en L :' },
        { t: 'Les nouilles coûtent 2,40 € les 500 g. Quel est le prix des nouilles pour 10 personnes ?', comp: 'che', pts: 1.5, a: '2,40 ÷ 500 × 750 = 3,60 €', v: 3.6, tol: .006, w: 22, lab: 'en € :' }] },
      { t: 'La hausse des abonnements', intro: `<p>Le 18 avril 2025, Netflix est passé de ${H('13,49 €')} à ${H('14,99 €')} par mois en Standard, et de ${H('19,99 €')} à ${H('21,99 €')} en Premium.</p><p class="srcl">${D.srcNetflix}</p>`, qs: [
        { t: 'Calculer le taux d’évolution du Standard, arrondi au dixième de pourcent.', comp: 'cal', pts: 2, a: '1,50 ÷ 13,49 × 100 ≈ + 11,1 %', v: 11.1, tol: .05, w: 22, lab: 'en % :' },
        { t: 'Quel est le coefficient multiplicateur correspondant, arrondi au millième ?', comp: 'mod', pts: 1, a: '14,99 ÷ 13,49 ≈ 1,111', v: 1.111, tol: .0006, w: 22 },
        { t: 'Montrer que le Premium a augmenté d’environ 10 %.', comp: 'rai', pts: 1.5, a: '19,99 × 1,1 = 21,989 ≈ 21,99 €', v: null, lines: 1 },
        { t: 'Combien un abonné Premium paie-t-il de plus sur une année ? Répondre par une phrase.', comp: 'com', pts: 1.5, a: '2 × 12 = 24 : il paie 24 € de plus par an.', v: null, lines: 1 }] }] };
}

/* ---------- chapitre 5 · fonctions ---------- */
{
  const { MCVP } = require('../shared/g1.js');
  const hh = t => 4 * t - .5 * t * t;
  chk0.push(2 * 4 + 3 === 11 && 35 / 5 === 7 && hh(2) === 6 && hh(3) === 7.5 && hh(5) === 7.5 && hh(4) === 8 && hh(1.5) === 4.875 && 11 * 4 === 44 && 5 * 4 + 30 === 50);
  const g = MCVP.plot({ W: 560, H: 220, x: [0, 8, 1], y: [0, 9, 1], ml: 40, mr: 16, mt: 12, mb: 30, fs: 11, xl: 't (dixièmes de s)', yl: 'h(t) (cases)' });
  E.c5 = { lieu: 'Atelier jeu vidéo et ciné-club', duree: '45 min', grille: GR.c5, redac: 2,
    auto: [
      { t: 'f(x) = 2x + 3. Calcule f(4).', comp: 'cal', pts: 1, a: '11', v: 11, tol: .01, w: 20 },
      { t: 'Si f(5) = 12, alors :', comp: 'rai', pts: 1, choices: ['12 est l’image de 5', '5 est l’image de 12', '12 est un antécédent de 5'], ok: 0, a: '12 est l’image de 5', v: null },
      { t: 'Quelle fonction est linéaire ?', comp: 'mod', pts: 1, choices: ['f(x) = 3x', 'f(x) = 3x + 1', 'f(x) = x²'], ok: 0, a: 'f(x) = 3x', v: null },
      { t: 'f(x) = 5x. Quel est l’antécédent de 35 ?', comp: 'cal', pts: 1, a: '7', v: 7, tol: .01, w: 20 },
      { t: 'Quelle est l’ordonnée à l’origine de f(x) = 4x − 2 ?', comp: 'rep', pts: 1, a: '−2', v: -2, tol: .01, w: 20 },
      { t: 'La droite d’une fonction linéaire passe toujours par :', comp: 'rep', pts: 1, choices: ['l’origine', 'le point (1 ; 1)', 'le point (0 ; 1)'], ok: 0, a: 'l’origine', v: null }],
    exos: [
      { t: 'Le saut du personnage', intro: `<p>Dans un jeu (fictif), la hauteur d’un saut, en cases, est donnée par ${H('h(t) = 4t − 0,5t²')}, où t est le temps en dixièmes de seconde.</p>${g.wrap(g.base + g.curve(hh))}`, qs: [
        { t: 'Lire graphiquement l’image de 2 par h.', comp: 'rep', pts: 1, a: 'h(2) = 6', v: 6, tol: .01, w: 20 },
        { t: 'Lire les antécédents de 7,5.', comp: 'rep', pts: 1.5, a: '3 et 5', v: null, w: 24 },
        { t: 'Quelle est la hauteur maximale, et à quel instant ?', comp: 'che', pts: 1, a: '8 cases, pour t = 4', v: null, w: 34 },
        { t: 'Calculer h(1,5).', comp: 'cal', pts: 1.5, a: '4 × 1,5 − 0,5 × 1,5² = 6 − 1,125 = 4,875', v: 4.875, tol: .001, w: 22 },
        { t: 'La fonction h est-elle affine ? Justifier.', comp: 'rai', pts: 1, a: 'Non : sa représentation n’est pas une droite (elle contient t²).', v: null, lines: 1 }] },
      { t: 'Deux formules de cinéma', intro: `<p>Sans carte, une séance coûte ${H('11 €')} : f(x) = 11x. Avec une carte (fictive) à ${H('30 €')}, la séance coûte ${H('5 €')} : g(x) = 5x + 30.</p>`, qs: [
        { t: 'Calculer le prix de 4 séances avec chaque formule.', comp: 'cal', pts: 1, a: 'f(4) = 44 € ; g(4) = 50 €', v: null, w: 40 },
        { t: 'Laquelle des deux fonctions est linéaire ? Justifier.', comp: 'rai', pts: 1, a: 'f, car f(x) = 11x est de la forme ax.', v: null, lines: 1 },
        { t: 'Résoudre l’équation 11x = 5x + 30.', comp: 'cal', pts: 2, a: '6x = 30 ; x = 5', v: 5, tol: .01, w: 22, lab: 'x =' },
        { t: 'Rédiger un conseil : à partir de combien de séances la carte est-elle avantageuse ?', comp: 'com', pts: 2, a: 'Pour 5 séances, les deux formules coûtent 55 €. Dès 6 séances, la carte est moins chère.', v: null, lines: 2 }] }] };
}

/* ---------- chapitre 6 · statistiques ---------- */
{
  const tb6 = D.cnc2025.map(v => String(v).replace('.', ','));
  chk0.push((10 + 12 + 14 + 16) / 4 === 13 && 15 - 2 === 13 && 9 / 36 === .25 && Math.abs(13.83 + 14.30 + 12.72 - 40.85) < 1e-9 && Math.abs(156.66 / 12 - 13.055) < 1e-9 && Math.round(6.18 / 35.4 * 1000) === 175);
  doc.c6 = `<div class="evdoc">${K.tab2(['Film', 'Entrées (M)'], D.top2025.map(([f, v]) => [f, String(v).replace('.', ',')]))}<p class="srcl">${D.srcTop}</p></div>`;
  E.c6 = { lieu: 'Club ciné et séries', duree: '45 min', grille: GR.c6, redac: 2,
    auto: [
      { t: 'Moyenne de 10 ; 12 ; 14 ; 16 ?', comp: 'cal', pts: 1, a: '13', v: 13, tol: .01, w: 20 },
      { t: 'Médiane de 3 ; 8 ; 5 ; 9 ; 1 ?', comp: 'cal', pts: 1, a: '5', v: 5, tol: .01, w: 20 },
      { t: 'Étendue de 2 ; 15 ; 7 ?', comp: 'cal', pts: 1, a: '13', v: 13, tol: .01, w: 20 },
      { t: '9 saisons sur 36 : fréquence en % ?', comp: 'cal', pts: 1, a: '25 %', v: 25, tol: .01, w: 20 },
      { t: 'Pour comparer les entrées mois par mois, on utilise plutôt :', comp: 'rep', pts: 1, choices: ['un diagramme en barres', 'un diagramme circulaire', 'un tableau de proportionnalité'], ok: 0, a: 'un diagramme en barres', v: null },
      { t: 'Quelle formule de tableur donne la moyenne de A1 à A5 ?', comp: 'mod', pts: 1, choices: ['=MOYENNE(A1:A5)', '=SOMME(A1:A5)', '=MEDIANE(A1:A5)'], ok: 0, a: '=MOYENNE(A1:A5)', v: null }],
    exos: [
      { t: 'Une année de cinéma', intro: `<p>Entrées au cinéma en France en 2025, en millions :</p>${tab(['Mois', 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'], [['2025', ...tb6]])}<p class="srcl">${D.srcCnc}</p>`, qs: [
        { t: 'Calculer le total des entrées du premier trimestre (janvier à mars).', comp: 'cal', pts: 1.5, a: '13,83 + 14,30 + 12,72 = 40,85 millions', v: 40.85, tol: .006, w: 24 },
        { t: 'Sachant que le total de l’année est 156,66 millions, calculer la moyenne mensuelle au centième.', comp: 'cal', pts: 1.5, a: '156,66 ÷ 12 ≈ 13,06 millions', v: 13.06, tol: .006, w: 24 },
        { t: 'Déterminer la médiane des 12 valeurs.', comp: 'cal', pts: 1.5, a: '(12,72 + 12,84) ÷ 2 = 12,78 millions', v: 12.78, tol: .006, w: 24 },
        { t: 'Quel est le meilleur mois de l’année ? Combien d’entrées de plus que le mois le plus faible ?', comp: 'che', pts: 1.5, a: 'Décembre : 20,73 − 9,46 = 11,27 millions de plus qu’en septembre.', v: null, lines: 1 }] },
      { t: 'Le top 10 de l’année 2025', intro: '', qs: [
        { t: 'Calculer l’étendue de la série.', comp: 'cal', pts: 1, a: '6,18 − 2,46 = 3,72 millions', v: 3.72, tol: .006, w: 24 },
        { t: 'Déterminer la médiane de la série.', comp: 'cal', pts: 1.5, a: '(2,95 + 2,97) ÷ 2 = 2,96 millions', v: 2.96, tol: .006, w: 24 },
        { t: 'Le total des entrées du top 10 est 35,40 millions. Quelle part le film n° 1 représente-t-il, en % au dixième ?', comp: 'mod', pts: 1.5, a: '6,18 ÷ 35,40 × 100 ≈ 17,5 %', v: 17.5, tol: .05, w: 22, lab: 'en % :' },
        { t: 'La moyenne vaut 3,54 millions. Expliquer pourquoi elle est plus grande que la médiane.', comp: 'rai', pts: 2, a: 'Les deux premiers films (6,18 et 5,10) ont des valeurs très élevées qui tirent la moyenne vers le haut ; la médiane n’en dépend pas.', v: null, lines: 2 }] }] };
}

/* ---------- chapitre 7 · probabilités ---------- */
{
  chk0.push(1 / 20 === .05 && 5 / 20 === .25 && 1 - .25 === .75 && 47 / 1000 === .047 && 3 / 36 === 1 / 12 && 11 / 36 > .3);
  E.c7 = { lieu: 'Club de jeux de rôle', duree: '45 min', grille: GR.c7, redac: 2,
    auto: [
      { t: 'Avec un dé équilibré à 6 faces, P(obtenir 6) =', comp: 'cal', pts: 1, choices: ['1/6', '6', '1/2'], ok: 0, a: '1/6', v: null },
      { t: 'Avec un dé équilibré à 6 faces, P(obtenir un nombre pair) ?', comp: 'cal', pts: 1, a: '0,5', v: .5, tol: .002, w: 20 },
      { t: 'Si P(A) = 0,2, alors P(non A) = ?', comp: 'cal', pts: 1, a: '0,8', v: .8, tol: .002, w: 20 },
      { t: 'Obtenir 7 avec un dé à 6 faces est un événement :', comp: 'rai', pts: 1, choices: ['impossible', 'certain', 'probable'], ok: 0, a: 'impossible', v: null },
      { t: 'On lance deux pièces. Combien d’issues ?', comp: 'mod', pts: 1, a: '4', v: 4, tol: .01, w: 20 },
      { t: '30 succès sur 120 essais : fréquence ?', comp: 'cal', pts: 1, a: '0,25', v: .25, tol: .002, w: 20 }],
    exos: [
      { t: 'Le dé à 20 faces', intro: `<p>On lance un ${H('dé équilibré à 20 faces')}, numérotées de 1 à 20.</p>`, qs: [
        { t: 'Calculer la probabilité d’obtenir 20.', comp: 'cal', pts: 1, a: '1/20 = 0,05', v: .05, tol: .002, w: 22 },
        { t: 'Calculer la probabilité d’obtenir 16 ou plus.', comp: 'cal', pts: 1.5, a: '16 à 20 : 5/20 = 1/4', v: .25, tol: .002, w: 22 },
        { t: 'En déduire la probabilité d’obtenir moins de 16.', comp: 'cal', pts: 1, a: '1 − 1/4 = 3/4', v: .75, tol: .002, w: 22 },
        { t: 'Lina dit : « Le 20 sort plus souvent, car c’est la réussite critique. » A-t-elle raison ? Justifier.', comp: 'rai', pts: 1.5, a: 'Non : le dé est équilibré, chaque face a la même probabilité, 1/20.', v: null, lines: 1 },
        { t: 'Sur 1 000 lancers simulés, le 20 est sorti 47 fois. Commenter.', comp: 'com', pts: 1, a: 'Fréquence 0,047, proche de la probabilité 0,05 : c’est cohérent.', v: null, lines: 1 }] },
      { t: 'Deux dés de plateau', intro: `<p>On lance ${H('deux dés équilibrés à 6 faces')} et on additionne les deux nombres.</p>`, qs: [
        { t: 'Combien y a-t-il d’issues ? Justifier avec un tableau.', comp: 'mod', pts: 1, a: '6 × 6 = 36 issues', v: 36, tol: .01, w: 20 },
        { t: 'Calculer la probabilité d’obtenir une somme de 10.', comp: 'cal', pts: 1.5, a: '(4 ; 6), (5 ; 5), (6 ; 4) : 3/36 = 1/12', v: 1 / 12, tol: .002, w: 22 },
        { t: 'Calculer la probabilité d’obtenir une somme de 11 ou plus.', comp: 'cal', pts: 1.5, a: '11 : 2 cases ; 12 : 1 case ; 3/36 = 1/12', v: 1 / 12, tol: .002, w: 22 },
        { t: 'Calculer la probabilité d’obtenir au moins un 6.', comp: 'rai', pts: 2, a: '11 cases contiennent un 6 (6 + 6 − 1) : 11/36', v: 11 / 36, tol: .002, w: 22 }] }] };
}

/* ---------- chapitre 8 · Pythagore et trigonométrie ---------- */
{
  const rd = d => d * Math.PI / 180, dg = x => x * 180 / Math.PI, r1 = x => Math.round(x * 10) / 10;
  chk0.push(Math.sqrt(9 + 16) === 5 && Math.sqrt(81) === 9 && 36 + 64 === 100 && r1(55 * 2.54) === 139.7 && r1(Math.sqrt(139.7 ** 2 - 121.8 ** 2)) === 68.4 && r1(dg(Math.atan(19.7 / 40))) === 26.2 && r1(19.7 / Math.tan(rd(50))) === 16.5);
  E.c8 = { lieu: 'Atelier bois et sortie à Tokyo', duree: '45 min', grille: GR.c8, redac: 2,
    auto: [
      { t: 'Triangle rectangle de côtés de l’angle droit 3 et 4. Hypoténuse ?', comp: 'cal', pts: 1, a: '5', v: 5, tol: .01, w: 20 },
      { t: 'Calcule √81.', comp: 'cal', pts: 1, a: '9', v: 9, tol: .01, w: 20 },
      { t: 'L’hypoténuse est le côté :', comp: 'rai', pts: 1, choices: ['opposé à l’angle droit', 'le plus court', 'adjacent à l’angle droit'], ok: 0, a: 'opposé à l’angle droit', v: null },
      { t: 'Dans un triangle rectangle, cos = …', comp: 'mod', pts: 1, choices: ['adjacent ÷ hypoténuse', 'opposé ÷ hypoténuse', 'opposé ÷ adjacent'], ok: 0, a: 'adjacent ÷ hypoténuse', v: null },
      { t: 'Un triangle de côtés 6, 8 et 10 est-il rectangle ?', comp: 'rai', pts: 1, choices: ['oui', 'non'], ok: 0, a: 'oui : 36 + 64 = 100', v: null },
      { t: 'Combien vaut tan 45° ?', comp: 'cal', pts: 1, a: '1', v: 1, tol: .01, w: 20 }],
    exos: [
      { t: 'L’écran de 55 pouces', intro: `<p>Un écran de ${H('55 pouces')} mesure ${H('121,8 cm')} de large. 1 pouce = 2,54 cm.</p>`, qs: [
        { t: 'Convertir 55 pouces en cm.', comp: 'cal', pts: 1, a: '55 × 2,54 = 139,7 cm', v: 139.7, tol: .06, w: 22 },
        { t: 'Calculer la hauteur de l’écran, au dixième.', comp: 'cal', pts: 2, a: 'h² = 139,7² − 121,8² = 4 680,85 ; h ≈ 68,4 cm', v: 68.4, tol: .06, w: 22, lab: 'en cm :' },
        { t: 'Montrer que le rapport largeur ÷ hauteur est proche de 16/9.', comp: 'rai', pts: 1.5, a: '121,8 ÷ 68,4 ≈ 1,78 et 16 ÷ 9 ≈ 1,78.', v: null, lines: 1 },
        { t: 'Rédiger une phrase qui donne les dimensions de l’écran.', comp: 'com', pts: 1.5, a: 'L’écran mesure environ 121,8 cm de large, 68,4 cm de haut et 139,7 cm de diagonale.', v: null, lines: 1 }] },
      { t: 'La statue géante', intro: `<p>La statue géante d’Odaiba mesure ${H('19,7 m')} de haut. On regarde son sommet depuis le sol.</p><p class="srcl">${D.srcGundam}</p>`, qs: [
        { t: 'Expliquer pourquoi la statue, le sol et la ligne de visée forment un triangle rectangle.', comp: 'rai', pts: 1, a: 'La statue est verticale et le sol horizontal : ils forment un angle droit.', v: null, lines: 1 },
        { t: 'Quelle formule de trigonométrie relie la hauteur, la distance au sol et l’angle ?', comp: 'mod', pts: 1, a: 'La tangente : tan = opposé ÷ adjacent = hauteur ÷ distance.', v: null, lines: 1 },
        { t: 'À 40 m de la statue, sous quel angle voit-on son sommet ? Arrondir au dixième.', comp: 'cal', pts: 2, a: 'tan x = 19,7 ÷ 40 ; x ≈ 26,2°', v: 26.2, tol: .06, w: 22, lab: 'en ° :' },
        { t: 'À quelle distance faut-il se placer pour voir le sommet sous un angle de 50° ? Arrondir au dixième.', comp: 'cal', pts: 2, a: 'd = 19,7 ÷ tan 50° ≈ 16,5 m', v: 16.5, tol: .06, w: 22, lab: 'en m :' }] }] };
}

/* ---------- chapitre 9 · échelles et Thalès ---------- */
{
  chk0.push(2 * 100 === 200 && 3 ** 2 === 9 && 2 ** 3 === 8 && 288 / 144 === 2 && 6 * 1.5 === 9 && 12 * 8 === 96 && 24 * 16 === 384 && 96 * 40000 / 10000 === 384 && 1.2 * 7.5 / 3 === 3 && 2.5 ** 2 === 6.25);
  E.c9 = { lieu: 'Atelier décors et ciné-club', duree: '45 min', grille: GR.c9, redac: 2,
    auto: [
      { t: 'Plan au 1/100 : 2 cm sur le plan font combien de cm en vrai ?', comp: 'cal', pts: 1, a: '200 cm', v: 200, tol: .01, w: 20 },
      { t: 'Si les longueurs sont multipliées par 3, l’aire est multipliée par :', comp: 'cal', pts: 1, choices: ['9', '3', '27'], ok: 0, a: '9', v: null },
      { t: 'Si les longueurs sont multipliées par 2, le volume est multiplié par :', comp: 'cal', pts: 1, choices: ['8', '4', '2'], ok: 0, a: '8', v: null },
      { t: 'Une statue de 288 cm au 1/144 mesure combien de cm ?', comp: 'cal', pts: 1, a: '2 cm', v: 2, tol: .01, w: 20 },
      { t: 'Une longueur de 6 cm agrandie × 1,5 mesure :', comp: 'cal', pts: 1, a: '9 cm', v: 9, tol: .01, w: 20 },
      { t: '(MN) // (BC), M sur [AB], N sur [AC]. Alors :', comp: 'rai', pts: 1, choices: ['AM/AB = MN/BC', 'AM/MB = MN/BC', 'AB/AM = MN/BC'], ok: 0, a: 'AM/AB = MN/BC', v: null }],
    exos: [
      { t: 'Le plan de la salle', intro: `<p>Le plan (fictif) d’une salle de cinéma est à l’échelle ${H('1/200')}. Sur le plan, la salle est un rectangle de ${H('12 cm')} sur ${H('8 cm')}, et l’écran mesure ${H('7 cm')}.</p>`, qs: [
        { t: 'Calculer la largeur réelle de l’écran, en mètres.', comp: 'cal', pts: 1.5, a: '7 × 200 = 1 400 cm = 14 m', v: 14, tol: .01, w: 20, lab: 'en m :' },
        { t: 'Calculer la longueur réelle de la salle, en mètres.', comp: 'cal', pts: 1, a: '12 × 200 = 2 400 cm = 24 m', v: 24, tol: .01, w: 20, lab: 'en m :' },
        { t: 'Calculer l’aire réelle de la salle, sachant que sa largeur réelle est 16 m.', comp: 'mod', pts: 1.5, a: '24 × 16 = 384 m²', v: 384, tol: .01, w: 22, lab: 'en m² :' },
        { t: 'Retrouver ce résultat à partir de l’aire sur le plan (96 cm²) et de k².', comp: 'rai', pts: 2, a: '96 × 200² = 96 × 40 000 = 3 840 000 cm² = 384 m²', v: null, lines: 2 }] },
      { t: 'Le projecteur', intro: `<p>Un projecteur S éclaire un mur. À ${H('3 m')} du projecteur, l’image mesure ${H('1,2 m')} de large. On recule le mur à ${H('7,5 m')} du projecteur. Les images sont parallèles.</p>`, qs: [
        { t: 'Justifier qu’on peut utiliser le théorème de Thalès.', comp: 'rai', pts: 1, a: 'Les rayons partent du même point S et les deux images sont parallèles.', v: null, lines: 1 },
        { t: 'Calculer la largeur de l’image à 7,5 m.', comp: 'cal', pts: 2, a: '1,2 × 7,5 ÷ 3 = 3 m', v: 3, tol: .01, w: 20, lab: 'en m :' },
        { t: 'Par combien l’aire de l’image est-elle multipliée ?', comp: 'mod', pts: 1.5, a: 'k = 7,5 ÷ 3 = 2,5 ; aire × 2,5² = 6,25', v: 6.25, tol: .006, w: 20 },
        { t: 'Rédiger une phrase de conclusion pour le ciné-club.', comp: 'com', pts: 1.5, a: 'À 7,5 m, l’image mesure 3 m de large, et son aire est 6,25 fois plus grande qu’à 3 m.', v: null, lines: 1 }] }] };
}

/* ---------- chapitre 10 · espace, transformations, programmes ---------- */
{
  chk0.push(2 * 3 * 4 === 24 && Math.round(Math.PI * 100 * 25) === 7854 && Math.round(Math.PI * 100 * 25 / 3) === 2618 && 360 / 6 === 60 && 6 * 50 === 300 && 360 / 3 === 120);
  E.c10 = { lieu: 'Snack du cinéma et atelier code', duree: '45 min', grille: GR.c10, redac: 2,
    auto: [
      { t: 'Volume d’un pavé de 2 cm × 3 cm × 4 cm ?', comp: 'cal', pts: 1, a: '24 cm³', v: 24, tol: .01, w: 20 },
      { t: 'Combien de cm³ dans 1 L ?', comp: 'cal', pts: 1, a: '1 000', v: 1000, tol: .01, w: 20 },
      { t: 'Le volume d’un cylindre de rayon r et de hauteur h est :', comp: 'mod', pts: 1, choices: ['π × r² × h', '2 × π × r × h', 'π × r × h²'], ok: 0, a: 'π × r² × h', v: null },
      { t: 'Quelle transformation change la taille d’une figure ?', comp: 'rai', pts: 1, choices: ['l’homothétie', 'la translation', 'la rotation'], ok: 0, a: 'l’homothétie', v: null },
      { t: 'Pour tracer un hexagone régulier, le lutin tourne de combien de degrés à chaque coin ?', comp: 'cal', pts: 1, a: '60°', v: 60, tol: .01, w: 20 },
      { t: 'La latitude de l’équateur est :', comp: 'rai', pts: 1, choices: ['0°', '90°', '180°'], ok: 0, a: '0°', v: null }],
    exos: [
      { t: 'Le seau de pop-corn', intro: `<p>Un seau de pop-corn (fictif) est un cylindre de rayon ${H('10 cm')} et de hauteur ${H('25 cm')}.</p>`, qs: [
        { t: 'Calculer le volume du seau, au cm³.', comp: 'cal', pts: 2, a: 'π × 10² × 25 ≈ 7 854 cm³', v: 7854, tol: 1, w: 24 },
        { t: 'Convertir ce volume en litres, au dixième.', comp: 'cal', pts: 1, a: '7 854 cm³ ≈ 7,9 L', v: 7.9, tol: .06, w: 20, lab: 'en L :' },
        { t: 'Un cornet conique a le même rayon et la même hauteur. Calculer son volume, au cm³.', comp: 'mod', pts: 1.5, a: '7 854 ÷ 3 ≈ 2 618 cm³', v: 2618, tol: 1, w: 24 },
        { t: 'Rédiger une phrase qui compare le seau et le cornet.', comp: 'com', pts: 1.5, a: 'Le seau contient trois fois plus de pop-corn que le cornet : environ 7,9 L contre 2,6 L.', v: null, lines: 1 }] },
      { t: 'Le programme du logo', intro: `<p>Voici un programme Scratch :</p><div class="scr-w">${K.scratchSvg([{ c: 'evt', t: 'quand ⚑ est cliqué' }, { c: 'pen', t: 'stylo en position d’écriture' }, { c: 'ctl', t: 'répéter 6 fois', open: 2 }, { c: 'mot', t: 'avancer de 50 pas', d: 1 }, { c: 'mot', t: 'tourner de 60 degrés', d: 1 }, { c: 'ctl', t: '', end: true }], 'Programme de l’hexagone')}</div>`, qs: [
        { t: 'Combien de côtés la figure tracée a-t-elle ?', comp: 'che', pts: 1, a: '6 côtés', v: 6, tol: .01, w: 20 },
        { t: 'Expliquer pourquoi le lutin tourne de 60° à chaque fois.', comp: 'rai', pts: 1.5, a: 'Il fait un tour complet en 6 rotations : 360 ÷ 6 = 60°.', v: null, lines: 1 },
        { t: 'Calculer le périmètre de la figure.', comp: 'cal', pts: 1, a: '6 × 50 = 300 pas', v: 300, tol: .01, w: 20 },
        { t: 'Modifier le programme pour tracer un triangle équilatéral.', comp: 'mod', pts: 1.5, a: 'répéter 3 fois : avancer de 50 pas, tourner de 120 degrés.', v: null, lines: 1 },
        { t: 'On agrandit la figure par une homothétie de rapport 2. Quel est le nouveau périmètre ?', comp: 'cal', pts: 1, a: '300 × 2 = 600 pas', v: 600, tol: .01, w: 20 }] }] };
}

/* vérification du format : 45 min, partie 1 de 6 questions sur 6 points, partie 2 sur 12 points (1 ou 2 exercices), 2 points de rédaction */
module.exports = (chk, extra = {}) => {
  Object.assign(E, extra);
  chk(chk0.every(Boolean), 'S’évaluer : contrôles de calcul');
  for (const [id, e] of Object.entries(E)) {
    if (doc[id]) { const ix = e.exos.length > 1 ? 1 : 0; if (!String(e.exos[ix].intro).startsWith(doc[id])) e.exos[ix].intro = doc[id] + (e.exos[ix].intro || ''); }
    const pa = e.auto.reduce((a, q) => a + q.pts, 0), pe = e.exos.reduce((a, x) => a + x.qs.reduce((b, q) => b + q.pts, 0), 0), n = e.exos.reduce((a, x) => a + x.qs.length, 0);
    chk(e.duree === '45 min' && e.auto.length === 6 && Math.abs(pa - 6) < 1e-9 && e.exos.length >= 1 && e.exos.length <= 2 && n >= 4 && n <= 10 && Math.abs(pe - 12) < 1e-9 && e.redac === 2, `S’évaluer ${id} : partie 1 ${e.auto.length} questions / ${pa} pts, partie 2 ${n} questions / ${pe} pts, rédaction ${e.redac}`);
    [...e.auto, ...e.exos.flatMap(x => x.qs)].forEach((q, i) => chk(!!GR[id] && !!GR[id][q.comp], `S’évaluer ${id} : compétence ${q.comp} sans phrase de grille`));
  }
  return E;
};
module.exports.GR = GR; module.exports.doc = doc; module.exports.E = E;
