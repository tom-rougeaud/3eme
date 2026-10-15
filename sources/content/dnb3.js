/* 3ème Série Pro — trois sujets blancs du brevet, série professionnelle (note de service du 2 septembre 2025, BO n° 33 du 4 septembre 2025).
   Partie 1 : 9 automatismes, 6 points, 20 minutes, sans calculatrice. Partie 2 : 4 exercices (2 + 4 + 4 + 2 points), 1 h 40,
   calculatrice autorisée, plus 2 points de rédaction. Chaque question porte son corrigé détaillé (x) pour la version professeur. */
'use strict';
const { H, tab } = require('./kit3e');
const { D } = require('./sk3');

module.exports = chk => {
  const r1 = x => Math.round(x * 10) / 10, rad = d => d * Math.PI / 180, deg = x => x * 180 / Math.PI;
  const SJ = [];

  /* ---------- sujet A · la convention manga ---------- */
  chk(60 * 3 / 4 === 45 && 3 * 5 - 5 === 10 && 1.5 * 60 === 90 && Math.sqrt(36 + 64) === 10 && 3 ** 3 === 27 && 84 === 2 * 2 * 3 * 7 && 126 === 2 * 3 * 3 * 7 && 9 * 3 === 4 * 3 + 15 && r1(deg(Math.atan(19.7 / 25))) === 38.2 && r1(Math.sqrt(25 ** 2 + 19.7 ** 2)) === 31.8 && r1(1970 / 144) === 13.7, 'DNB A');
  SJ.push({ id: 'A', titre: 'La convention manga', redac: 2,
    grille: { che: 'Je repère les informations utiles dans les documents.', mod: 'Je traduis une situation par un calcul, une fonction ou une échelle.', rai: 'Je justifie une propriété ou un résultat.', cal: 'Je calcule juste, à la main ou à la calculatrice.', com: 'Je rédige des réponses claires et je conclus.' },
    auto: [
      { t: 'Calcule 3/4 de 60.', comp: 'cal', pts: 1, a: '45', v: 45, tol: .01, w: 20, x: '60 ÷ 4 = 15 ; 15 × 3 = 45.' },
      { t: '10² × 10³ est égal à :', comp: 'cal', pts: .5, choices: ['10⁵', '10⁶', '20⁵'], ok: 0, a: '10⁵', v: null, x: 'On additionne les exposants : 2 + 3 = 5.' },
      { t: 'Calcule 25 % de 80.', comp: 'cal', pts: .5, a: '20', v: 20, tol: .01, w: 20, x: '25 % = un quart : 80 ÷ 4 = 20.' },
      { t: 'Résous 3x − 5 = 10.', comp: 'cal', pts: 1, a: 'x = 5', v: 5, tol: .01, w: 20, lab: 'x =', x: '3x = 15 ; x = 5.' },
      { t: 'Convertis 1,5 h en minutes.', comp: 'cal', pts: .5, a: '90 min', v: 90, tol: .01, w: 20, x: '1,5 × 60 = 90 min.' },
      { t: 'Médiane de la série 4 ; 7 ; 2 ; 9 ; 5 ?', comp: 'cal', pts: .5, a: '5', v: 5, tol: .01, w: 20, x: 'Rangée : 2 ; 4 ; 5 ; 7 ; 9. La valeur du milieu est 5.' },
      { t: 'On lance un dé équilibré à 6 faces. P(obtenir un nombre pair) =', comp: 'cal', pts: .5, choices: ['1/2', '1/3', '1/6'], ok: 0, a: '1/2', v: null, x: '2, 4, 6 : 3 issues sur 6, soit 1/2.' },
      { t: 'Triangle rectangle de côtés de l’angle droit 6 cm et 8 cm. Hypoténuse ?', comp: 'cal', pts: 1, a: '10 cm', v: 10, tol: .01, w: 20, x: '6² + 8² = 36 + 64 = 100 ; √100 = 10 cm.' },
      { t: 'Volume d’un cube d’arête 3 cm ?', comp: 'cal', pts: .5, a: '27 cm³', v: 27, tol: .01, w: 20, x: '3 × 3 × 3 = 27 cm³.' }],
    exos: [
      { t: 'Les lots de badges', intro: `<p>Les organisateurs d’une convention manga (fictive) ont ${H('84 badges')} et ${H('126 marque-pages')}. Ils veulent faire des lots identiques, en utilisant tout.</p>`, qs: [
        { t: 'Décomposer 84 et 126 en produits de facteurs premiers.', comp: 'cal', pts: 1, a: '84 = 2² × 3 × 7 ; 126 = 2 × 3² × 7', v: null, lines: 1, x: '84 ÷ 2 = 42 ; ÷ 2 = 21 ; ÷ 3 = 7 : 84 = 2² × 3 × 7. 126 ÷ 2 = 63 ; ÷ 3 = 21 ; ÷ 3 = 7 : 126 = 2 × 3² × 7.' },
        { t: 'Déterminer le nombre maximal de lots et la composition d’un lot.', comp: 'che', pts: 1, a: '2 × 3 × 7 = 42 lots, de 2 badges et 3 marque-pages', v: 42, tol: .01, lines: 1, lab: 'nombre de lots :', x: 'Facteurs communs : 2 × 3 × 7 = 42. 84 ÷ 42 = 2 badges et 126 ÷ 42 = 3 marque-pages par lot.' }] },
      { t: 'Le pass ateliers', intro: `<p>À la convention, un atelier de dessin coûte ${H('9 €')} sans pass. Avec le pass à ${H('15 €')}, l’atelier coûte ${H('4 €')}. Pour x ateliers : f(x) = 9x sans pass, g(x) = 4x + 15 avec le pass.</p>`, qs: [
        { t: 'Calculer le prix de 3 ateliers avec chaque formule.', comp: 'cal', pts: 1, a: 'f(3) = 27 € ; g(3) = 27 €', v: null, w: 40, x: 'f(3) = 9 × 3 = 27 € ; g(3) = 4 × 3 + 15 = 27 €.' },
        { t: 'Résoudre l’équation 9x = 4x + 15.', comp: 'cal', pts: 1, a: '5x = 15 ; x = 3', v: 3, tol: .01, w: 20, lab: 'x =', x: '9x − 4x = 15 ; 5x = 15 ; x = 3.' },
        { t: 'Laquelle des deux fonctions est linéaire ? Justifier.', comp: 'rai', pts: 1, a: 'f, de la forme ax (a = 9).', v: null, lines: 1, x: 'f(x) = 9x est de la forme ax : linéaire. g(x) = 4x + 15 est affine, non linéaire (b = 15).' },
        { t: 'Lou veut faire 5 ateliers. Lui conseiller une formule, en justifiant.', comp: 'com', pts: 1, a: 'Le pass : g(5) = 35 € contre f(5) = 45 €.', v: null, lines: 2, x: 'f(5) = 45 € et g(5) = 4 × 5 + 15 = 35 €. À partir de 4 ateliers (au-delà de 3), le pass est moins cher : Lou doit prendre le pass, elle économise 10 €.' }] },
      { t: 'La statue géante', intro: `<p>La statue géante de robot d’Odaiba, à Tokyo, mesure ${H('19,7 m')}. Un visiteur se place à ${H('25 m')} de son pied et regarde le sommet. On néglige sa taille.</p><p class="srcl">${D.srcGundam}</p>`, qs: [
        { t: 'Calculer l’angle sous lequel il voit le sommet, au dixième de degré.', comp: 'cal', pts: 1.5, a: 'tan x = 19,7 ÷ 25 ; x ≈ 38,2°', v: 38.2, tol: .06, w: 22, lab: 'en ° :', x: 'Triangle rectangle au pied de la statue. tan x = opposé ÷ adjacent = 19,7 ÷ 25 = 0,788 ; x = tan⁻¹(0,788) ≈ 38,2°.' },
        { t: 'Calculer la distance entre le visiteur et le sommet, au dixième.', comp: 'cal', pts: 1.5, a: '√(25² + 19,7²) ≈ 31,8 m', v: 31.8, tol: .06, w: 22, lab: 'en m :', x: 'Pythagore : d² = 25² + 19,7² = 625 + 388,09 = 1 013,09 ; d = √1 013,09 ≈ 31,8 m.' },
        { t: 'Une maquette de la statue est au 1/144. Quelle est sa hauteur, au millimètre ?', comp: 'mod', pts: 1, a: '1 970 ÷ 144 ≈ 13,7 cm', v: 13.7, tol: .06, w: 22, lab: 'en cm :', x: '19,7 m = 1 970 cm ; 1 970 ÷ 144 ≈ 13,7 cm.' }] },
      { t: 'Le tirage au sort', intro: `<p>Pour gagner un tome dédicacé (fictif), on tire un badge au hasard dans un sac : ${H('5 rouges')}, ${H('4 bleus')} et ${H('3 verts')}.</p>`, qs: [
        { t: 'Calculer la probabilité de tirer un badge rouge.', comp: 'cal', pts: 1, a: '5/12', v: 5 / 12, tol: .002, w: 22, x: '12 badges en tout, 5 rouges : P = 5/12.' },
        { t: 'Calculer la probabilité de ne pas tirer un badge vert. Justifier.', comp: 'rai', pts: 1, a: '1 − 3/12 = 9/12 = 3/4', v: .75, tol: .002, lines: 1, x: 'P(vert) = 3/12 = 1/4. Événement contraire : 1 − 1/4 = 3/4.' }] }] });

  /* ---------- sujet B · soirée cinéma et séries ---------- */
  const M = D.cnc2025;
  chk(Math.abs(11.83 + 11.23 + 11.37 - 34.43) < 1e-9 && r1(Math.sqrt(165.1 ** 2 - 143.9 ** 2)) === 80.9 && Math.round(2 / 5.99 * 1000) === 334 && Math.abs(7.99 * 12 - 95.88) < 1e-9 && (5 * 3 + 6) / 3 === 7, 'DNB B');
  SJ.push({ id: 'B', titre: 'Soirée cinéma et séries', redac: 2,
    grille: { che: 'Je relève les données dans un tableau ou un texte.', mod: 'Je choisis le calcul adapté à la situation.', rai: 'Je justifie avec un calcul, une propriété ou une lettre.', cal: 'Je calcule pourcentages, statistiques et longueurs.', com: 'Je rédige une conclusion argumentée.' },
    auto: [
      { t: '2/5 + 1/5 =', comp: 'cal', pts: .5, choices: ['3/5', '3/10', '2/25'], ok: 0, a: '3/5', v: null, x: 'Même dénominateur : 2/5 + 1/5 = 3/5.' },
      { t: 'Écris 4,5 × 10³ en écriture décimale.', comp: 'cal', pts: .5, a: '4 500', v: 4500, tol: .01, w: 20, x: 'La virgule avance de 3 rangs : 4 500.' },
      { t: 'Calcule 15 % de 200.', comp: 'cal', pts: 1, a: '30', v: 30, tol: .01, w: 20, x: '200 × 15 ÷ 100 = 30.' },
      { t: 'f(x) = 2x − 1. Calcule f(5).', comp: 'cal', pts: .5, a: '9', v: 9, tol: .01, w: 20, x: '2 × 5 − 1 = 9.' },
      { t: 'Moyenne de 12 ; 14 ; 19 ?', comp: 'cal', pts: 1, a: '15', v: 15, tol: .01, w: 20, x: '(12 + 14 + 19) ÷ 3 = 45 ÷ 3 = 15.' },
      { t: 'Plan à l’échelle 1/100 : 3 cm sur le plan représentent :', comp: 'mod', pts: .5, choices: ['3 m', '30 cm', '300 m'], ok: 0, a: '3 m', v: null, x: '3 × 100 = 300 cm = 3 m.' },
      { t: 'Un triangle a deux angles de 50° et 60°. Le troisième mesure ?', comp: 'cal', pts: .5, a: '70°', v: 70, tol: .01, w: 20, x: '180 − 50 − 60 = 70°.' },
      { t: 'Arrondis 7,846 au dixième.', comp: 'cal', pts: .5, a: '7,8', v: 7.8, tol: .01, w: 20, x: 'Le chiffre des centièmes est 4 < 5 : 7,8.' },
      { t: 'Baisser un prix de 30 %, c’est le multiplier par :', comp: 'mod', pts: 1, choices: ['0,7', '0,3', '1,3'], ok: 0, a: '0,7', v: null, x: '1 − 0,30 = 0,7.' }],
    exos: [
      { t: 'La hausse de l’abonnement', intro: `<p>Le 18 avril 2025, l’abonnement Netflix Standard avec pub est passé de ${H('5,99 €')} à ${H('7,99 €')} par mois.</p><p class="srcl">${D.srcNetflix}</p>`, qs: [
        { t: 'Calculer le taux d’évolution du prix, arrondi au dixième de pourcent.', comp: 'cal', pts: 1, a: '2 ÷ 5,99 × 100 ≈ + 33,4 %', v: 33.4, tol: .05, w: 22, lab: 'en % :', x: 'Hausse : 7,99 − 5,99 = 2 €. 2 ÷ 5,99 ≈ 0,334, soit + 33,4 %.' },
        { t: 'Calculer le prix d’une année d’abonnement au nouveau tarif.', comp: 'che', pts: 1, a: '7,99 × 12 = 95,88 €', v: 95.88, tol: .006, w: 22, lab: 'en € :', x: '7,99 × 12 = 95,88 €.' }] },
      { t: 'Les entrées au cinéma en 2025', intro: `${tab(['Mois', 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'], [['Entrées (M)', ...M.map(v => String(v).replace('.', ','))]])}<p>Total de l’année 2025 : ${H('156,66 millions')}. En 2024 : ${H('181,54 millions')}.</p><p class="srcl">${D.srcCnc}</p>`, qs: [
        { t: 'Calculer le total des entrées d’avril, mai et juin 2025.', comp: 'cal', pts: 1, a: '11,83 + 11,23 + 11,37 = 34,43 millions', v: 34.43, tol: .006, w: 24, x: '11,83 + 11,23 + 11,37 = 34,43 millions d’entrées.' },
        { t: 'Calculer la moyenne mensuelle de 2025, au centième.', comp: 'cal', pts: 1, a: '156,66 ÷ 12 ≈ 13,06 millions', v: 13.06, tol: .006, w: 24, x: '156,66 ÷ 12 = 13,055 ≈ 13,06 millions.' },
        { t: 'Déterminer la médiane des 12 mois.', comp: 'cal', pts: 1, a: '(12,72 + 12,84) ÷ 2 = 12,78 millions', v: 12.78, tol: .006, w: 24, x: 'Rangées : 9,46 ; 9,94 ; 11,23 ; 11,37 ; 11,83 ; 12,72 ; 12,84 ; 13,83 ; 14,12 ; 14,29 ; 14,30 ; 20,73. Médiane : (12,72 + 12,84) ÷ 2 = 12,78.' },
        { t: 'Les entrées ont-elles baissé de plus de 10 % entre 2024 et 2025 ? Justifier.', comp: 'rai', pts: 1, a: 'Oui : (156,66 − 181,54) ÷ 181,54 × 100 ≈ − 13,7 %.', v: null, lines: 2, x: '(156,66 − 181,54) ÷ 181,54 ≈ − 0,137, soit une baisse d’environ 13,7 %, donc de plus de 10 %.' }] },
      { t: 'L’écran du salon', intro: `<p>Un téléviseur de ${H('65 pouces')} a une diagonale de ${H('165,1 cm')} et un écran de ${H('143,9 cm')} de large. Le meuble TV mesure ${H('1,50 m')} de large.</p>`, qs: [
        { t: 'Calculer la hauteur de l’écran, au dixième.', comp: 'cal', pts: 1.5, a: '√(165,1² − 143,9²) ≈ 80,9 cm', v: 80.9, tol: .06, w: 22, lab: 'en cm :', x: 'Triangle rectangle, la diagonale est l’hypoténuse : h² = 165,1² − 143,9² = 27 258,01 − 20 707,21 = 6 550,8 ; h ≈ 80,9 cm.' },
        { t: 'Vérifier que l’écran est au format 16/9.', comp: 'rai', pts: 1, a: '143,9 ÷ 80,9 ≈ 1,78 et 16 ÷ 9 ≈ 1,78.', v: null, lines: 1, x: '143,9 ÷ 80,9 ≈ 1,779 et 16 ÷ 9 ≈ 1,778 : le rapport largeur ÷ hauteur vaut bien 16/9.' },
        { t: 'Le téléviseur tient-il sur le meuble ? Rédiger la réponse.', comp: 'com', pts: 1.5, a: 'Oui : 143,9 cm < 150 cm, il reste 6,1 cm.', v: null, lines: 2, x: '1,50 m = 150 cm. 143,9 < 150 : le téléviseur tient sur le meuble, avec 6,1 cm de marge.' }] },
      { t: 'Le programme de calcul', intro: '<p>Choisir un nombre ; le multiplier par 3 ; ajouter 6 ; diviser le résultat par 3.</p>', qs: [
        { t: 'Quel résultat obtient-on avec 5 ?', comp: 'cal', pts: 1, a: '5 × 3 = 15 ; 15 + 6 = 21 ; 21 ÷ 3 = 7', v: 7, tol: .01, w: 20, x: '5 × 3 = 15 ; 15 + 6 = 21 ; 21 ÷ 3 = 7.' },
        { t: 'Montrer qu’on obtient toujours le nombre de départ augmenté de 2.', comp: 'rai', pts: 1, a: '(3x + 6) ÷ 3 = x + 2', v: null, lines: 1, x: 'Avec x : (3x + 6) ÷ 3 = 3x ÷ 3 + 6 ÷ 3 = x + 2.' }] }] });

  /* ---------- sujet C · le tournoi de jeux ---------- */
  chk(91 === 7 * 13 && -3 + 8 === 5 && 180 / 2 === 90 && 18 / 72 === .25 && Math.round(Math.PI * 5 * 10) / 10 === 15.7 && 8 * 250 / 100 === 20 && 4.8 * 250 / 100 === 12 && 2 * 7.5 / 5 === 3 && 20 * 5 + 50 === 150 && (230 - 50) / 20 === 9 && Math.round(400 + Math.PI * 9 * 12 / 3) === 513, 'DNB C');
  SJ.push({ id: 'C', titre: 'Le tournoi de jeux', redac: 2,
    grille: { che: 'Je repère les données utiles dans un énoncé ou un plan.', mod: 'Je modélise avec une probabilité, une fonction ou un volume.', rai: 'Je justifie avec un théorème ou une propriété.', cal: 'Je calcule juste et je convertis.', com: 'Je rédige une réponse complète, avec l’unité.' },
    auto: [
      { t: 'Le nombre 91 est-il premier ?', comp: 'rai', pts: .5, choices: ['oui', 'non'], ok: 1, a: 'non : 91 = 7 × 13', v: null, x: '91 = 7 × 13 : il a d’autres diviseurs que 1 et 91.' },
      { t: 'Calcule −3 + 8.', comp: 'cal', pts: .5, a: '5', v: 5, tol: .01, w: 20, x: '8 − 3 = 5.' },
      { t: 'L’écriture scientifique de 0,0004 est :', comp: 'cal', pts: 1, choices: ['4 × 10⁻⁴', '4 × 10⁴', '0,4 × 10⁻³'], ok: 0, a: '4 × 10⁻⁴', v: null, x: 'La virgule se déplace de 4 rangs vers la droite : 4 × 10⁻⁴.' },
      { t: 'Le développement de 3(x − 2) est :', comp: 'cal', pts: .5, choices: ['3x − 6', '3x − 2', 'x − 6'], ok: 0, a: '3x − 6', v: null, x: '3 × x − 3 × 2 = 3x − 6.' },
      { t: 'Un car parcourt 180 km en 2 h. Vitesse moyenne, en km/h ?', comp: 'cal', pts: .5, a: '90 km/h', v: 90, tol: .01, w: 20, x: '180 ÷ 2 = 90 km/h.' },
      { t: 'Partager 30 dans le ratio 1 : 4 donne :', comp: 'mod', pts: .5, choices: ['6 et 24', '1 et 4', '10 et 20'], ok: 0, a: '6 et 24', v: null, x: '5 parts ; 30 ÷ 5 = 6 ; 1 × 6 = 6 et 4 × 6 = 24.' },
      { t: '18 victoires sur 72 parties : fréquence ?', comp: 'cal', pts: 1, a: '0,25', v: .25, tol: .002, w: 20, x: '18 ÷ 72 = 0,25.' },
      { t: 'Combien vaut cos 60° ?', comp: 'cal', pts: .5, a: '0,5', v: .5, tol: .002, w: 20, x: 'cos 60° = 0,5.' },
      { t: 'Volume d’un cylindre de rayon 1 cm et de hauteur 5 cm, au dixième ?', comp: 'cal', pts: 1, a: '≈ 15,7 cm³', v: 15.7, tol: .06, w: 20, x: 'π × 1² × 5 = 5π ≈ 15,7 cm³.' }],
    exos: [
      { t: 'Les boosters', intro: `<p>Dans un jeu de cartes (fictif), un booster contient une carte rare avec la probabilité ${H('1/5')}, indépendamment des autres boosters.</p>`, qs: [
        { t: 'Calculer la probabilité qu’un booster ne contienne pas de carte rare.', comp: 'cal', pts: 1, a: '1 − 1/5 = 4/5', v: .8, tol: .002, w: 22, x: 'Événement contraire : 1 − 1/5 = 4/5 = 0,8.' },
        { t: 'On ouvre deux boosters. Calculer la probabilité de n’avoir aucune carte rare.', comp: 'mod', pts: 1, a: '4/5 × 4/5 = 16/25 = 0,64', v: .64, tol: .002, w: 22, x: 'Sur l’arbre, branche « pas rare » puis « pas rare » : 4/5 × 4/5 = 16/25 = 0,64.' }] },
      { t: 'La salle du tournoi', intro: `<p>Le plan (fictif) de la salle est à l’échelle ${H('1/250')} : c’est un rectangle de ${H('8 cm')} sur ${H('4,8 cm')}. Un projecteur placé à ${H('5 m')} d’un écran donne une image de ${H('2 m')} de large.</p>`, qs: [
        { t: 'Calculer la longueur réelle de la salle, en mètres.', comp: 'cal', pts: 1, a: '8 × 250 = 2 000 cm = 20 m', v: 20, tol: .01, w: 20, lab: 'en m :', x: '8 × 250 = 2 000 cm = 20 m.' },
        { t: 'Calculer l’aire réelle de la salle.', comp: 'cal', pts: 1, a: '4,8 × 250 = 1 200 cm = 12 m ; 20 × 12 = 240 m²', v: 240, tol: .01, w: 22, lab: 'en m² :', x: 'Largeur : 4,8 × 250 = 1 200 cm = 12 m. Aire : 20 × 12 = 240 m².' },
        { t: 'On recule le projecteur à 7,5 m de l’écran. Calculer la nouvelle largeur de l’image.', comp: 'cal', pts: 1, a: '2 × 7,5 ÷ 5 = 3 m', v: 3, tol: .01, w: 20, lab: 'en m :', x: '5/7,5 = 2/L, donc L = 2 × 7,5 ÷ 5 = 3 m.' },
        { t: 'Quel théorème a-t-on utilisé à la question précédente ? Justifier son utilisation.', comp: 'rai', pts: 1, a: 'Thalès : les rayons partent du projecteur et les images sont parallèles.', v: null, lines: 1, x: 'Le théorème de Thalès : les rayons partent tous du projecteur (sommet commun) et les deux images sont parallèles.' }] },
      { t: 'Le budget de l’équipe', intro: `<p>L’inscription au tournoi coûte ${H('50 €')} par équipe, plus ${H('20 €')} par joueur. Pour x joueurs : f(x) = 20x + 50.</p>`, qs: [
        { t: 'Calculer le prix pour une équipe de 5 joueurs.', comp: 'cal', pts: 1, a: 'f(5) = 150 €', v: 150, tol: .01, w: 20, lab: 'en € :', x: 'f(5) = 20 × 5 + 50 = 100 + 50 = 150 €.' },
        { t: 'Une équipe a payé 230 €. Combien a-t-elle de joueurs ?', comp: 'cal', pts: 1, a: '20x + 50 = 230 ; x = 9', v: 9, tol: .01, w: 20, x: '20x + 50 = 230 ; 20x = 180 ; x = 9 joueurs.' },
        { t: 'La fonction f est-elle linéaire ? Justifier.', comp: 'rai', pts: 1, a: 'Non : affine, avec b = 50 ≠ 0.', v: null, lines: 1, x: 'f(x) = 20x + 50 est de la forme ax + b avec b = 50 ≠ 0 : f est affine mais pas linéaire.' },
        { t: 'Combien chaque joueur paie-t-il dans une équipe de 5, si l’on partage tout ? Répondre par une phrase.', comp: 'com', pts: 1, a: '150 ÷ 5 = 30 € par joueur.', v: null, lines: 1, x: '150 ÷ 5 = 30 : chaque joueur paie 30 €.' }] },
      { t: 'Le trophée', intro: `<p>Le trophée est formé d’un socle en pavé droit de ${H('10 cm × 10 cm × 4 cm')}, surmonté d’un cône de rayon ${H('3 cm')} et de hauteur ${H('12 cm')}.</p>`, qs: [
        { t: 'Calculer le volume total du trophée, au cm³.', comp: 'cal', pts: 1, a: '400 + π × 9 × 12 ÷ 3 ≈ 400 + 113 = 513 cm³', v: 513, tol: 1, w: 22, x: 'Pavé : 10 × 10 × 4 = 400 cm³. Cône : π × 3² × 12 ÷ 3 = 36π ≈ 113 cm³. Total ≈ 513 cm³.' },
        { t: 'Convertir ce volume en litres, au centième.', comp: 'mod', pts: 1, a: '513 cm³ ≈ 0,51 L', v: .51, tol: .006, w: 20, lab: 'en L :', x: '1 L = 1 000 cm³ : 513 cm³ = 0,513 L ≈ 0,51 L.' }] }] });

  /* vérification du format : 9 automatismes sur 6 points, 4 exercices de 2, 4, 4 et 2 points, 2 points de rédaction */
  SJ.forEach(sj => {
    const pa = sj.auto.reduce((a, q) => a + q.pts, 0), pe = sj.exos.map(x => x.qs.reduce((a, q) => a + q.pts, 0));
    chk(sj.auto.length === 9 && Math.abs(pa - 6) < 1e-9 && pe.join() === '2,4,4,2' && sj.redac === 2, `sujet ${sj.id} : ${sj.auto.length} automatismes / ${pa} pts, exercices ${pe.join(' + ')}`);
    [...sj.auto, ...sj.exos.flatMap(x => x.qs)].forEach(q => chk(!!sj.grille[q.comp], `sujet ${sj.id} : compétence ${q.comp} sans phrase`));
  });
  return SJ;
};
