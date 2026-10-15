/* Chapitre 5 · Fonctions — 3ème Série Pro (programme du cycle 4, BO n° 31 du 30 juillet 2020). */
'use strict';
const K = require('./kit3e');
const { H, FM, R, Q, BQ, PB, st, SN, Sketch, MCVP } = K;
const { D, SV, tt, fill } = require('./sk3');

module.exports = function (chk) {
  const c = { id: 'c5', n: 5, col: 'verbe', icone: '📈', dom: 'Fonctions', titre: 'Fonctions linéaires et affines', sous: 'Image, antécédent, graphique, comparer deux formules' };
  c.parties = [{ t: 'La notion de fonction', n: [1] }, { t: 'Fonctions linéaires et affines', n: [2, 3, 4] }];
  c.travail = { question: `Dans un jeu de plateforme, à quelle hauteur saute le personnage, et quand ? Au cinéma, une carte à ${H('30 €')} puis ${H('5 € la séance')} est-elle plus intéressante que ${H('11 € la séance')} ? Tu sauras répondre aux notions 1 et 4.` };
  c.objectifs = ['Je saurai lire et calculer une image et un antécédent.', 'Je saurai reconnaître une fonction linéaire et la relier à la proportionnalité.', 'Je saurai représenter une fonction affine et interpréter a et b.', 'Je saurai comparer deux formules avec un graphique ou une équation.'];
  c.depart = 'c5';

  /* ---------- illustrations « Je découvre » ---------- */
  const skSaut = () => { const k = Sketch(751); let s = k.P(k.line(10, 110, 190, 110), { w: 2.4 }); for (let i = 0; i < 6; i++) s += fill(14 + i * 30, 110, 26, 14, .9, 'k2', 2); s += k.P(k.curve(x => 110 - (x - 30) * (170 - x) / 75, 30, 170), { w: 2, op: .7 }) + fill(84, 30, 22, 22, .9, 'k', 4) + k.P(k.rect(84, 30, 22, 22)); return SV(s + tt(150, 20, 'h(t) ?', 13), 'Un personnage de jeu vidéo qui saute au-dessus de cases'); };
  const skMois = () => { const k = Sketch(752); let s = ''; for (let i = 0; i < 4; i++) s += fill(14 + i * 44, 30, 38, 46, .9, i % 2 ? 'k2' : 'k', 6) + k.P(k.rect(14 + i * 44, 30, 38, 46), { w: 1.4 }) + tt(33 + i * 44, 58, (i + 1) + 'ᵉ', 12, { c: i % 2 ? undefined : '#fff' }); return SV(s + tt(100, 100, '14,99 € par mois', 13) + tt(100, 120, 'p(x) = 14,99x', 12), 'Quatre mois d’abonnement à 14,99 euros'); };
  const skCarte = () => { const k = Sketch(753); return SV(fill(20, 24, 100, 62, .9, 'k', 10) + k.P(k.rect(20, 24, 100, 62)) + tt(70, 52, 'CARTE', 14, { c: '#fff' }) + tt(70, 72, '30 € / an', 12, { c: '#fff' }) + fill(130, 34, 54, 42, .9, 'k2', 6) + k.P(k.rect(130, 34, 54, 42)) + tt(157, 60, '5 €', 14) + tt(100, 112, 'g(x) = 5x + 30', 13), 'Une carte de cinéma à 30 euros et un ticket à 5 euros'); };
  const skDeux = () => { const k = Sketch(754); return SV(k.P(k.line(20, 110, 186, 110) + k.line(20, 110, 20, 14), { w: 2 }) + k.P(k.line(20, 110, 180, 20), { w: 2.6 }) + k.P(k.line(20, 74, 180, 34), { w: 2.6, c: '#C2332A' }) + `<circle cx="100" cy="54" r="6" class="k"/>` + tt(150, 124, 'sans carte ou avec ?', 11), 'Deux droites qui se croisent'); };

  /* ---------- méthodes visuelles : des graphiques exacts ---------- */
  const W = 600, Hh = 230, side = (x, y, s, o = {}) => MCVP.T(x - 18, y, s, { fs: 13, a: 'start', c: o.c || 'tx' });
  // 1. le saut : h(t) = 4t − 0,5t²
  const h = t => 4 * t - .5 * t * t;
  const g1 = MCVP.plot({ W, H: Hh, x: [0, 8, 1], y: [0, 9, 1], ml: 40, mr: 250, mt: 12, mb: 30, fs: 11, xl: 't', yl: 'h (cases)' });
  const vSaut = g1.wrap(g1.base + st(1, g1.curve(h) + SN(1, 368, 30) + side(404, 35, 'je repère les axes : t et h(t)', { fs: 13 }))
    + st(2, g1.guide(2, 6) + g1.dot(2, 6) + SN(2, 368, 76) + side(404, 81, 'image de 2 : h(2) = 6'))
    + st(3, g1.seg(0, 6, 8, 6, { dash: '6 5', w: 1.6 }) + g1.dot(6, 6) + g1.guide(6, 6) + SN(3, 368, 122) + side(404, 127, 'antécédents de 6 : 2 et 6'))
    + st(4, g1.dot(4, 8, { fill: '#C2332A', stroke: '#C2332A' }) + SN(4, 368, 168) + side(404, 173, 'maximum : 8 cases, à t = 4', { c: 'kt' })));
  // 2. linéaire : p(x) = 14,99x
  const g2 = MCVP.plot({ W, H: Hh, x: [0, 6, 1], y: [0, 100, 20], ml: 44, mr: 250, mt: 12, mb: 30, fs: 11, xl: 'mois', yl: 'prix (€)' });
  const vLin = g2.wrap(g2.base + st(1, SN(1, 368, 30) + side(404, 35, 'p(x) = 14,99x : de la forme ax', { fs: 13 }))
    + st(2, g2.pts([[0, 0], [2, 29.98], [4, 59.96], [6, 89.94]]) + SN(2, 368, 76) + side(404, 81, 'p(4) = 14,99 × 4 = 59,96', { fs: 13 }))
    + st(3, g2.line(14.99, 0) + SN(3, 368, 122) + side(404, 127, 'droite qui passe par l’origine', { fs: 13 }))
    + st(4, g2.seg(1, 14.99, 2, 14.99, { dash: '5 4', w: 1.8 }) + g2.seg(2, 14.99, 2, 29.98, { dash: '5 4', w: 1.8 }) + SN(4, 368, 168) + side(404, 173, '+ 1 mois : + 14,99 €', { c: 'kt' })));
  // 3. affine : g(x) = 5x + 30
  const g3 = MCVP.plot({ W, H: Hh, x: [0, 12, 2], y: [0, 100, 20], ml: 44, mr: 250, mt: 12, mb: 30, fs: 11, xl: 'séances', yl: 'prix (€)' });
  const vAff = g3.wrap(g3.base + st(1, SN(1, 368, 30) + side(404, 35, 'g(x) = 5x + 30 : a = 5, b = 30', { fs: 13 }))
    + st(2, g3.dot(0, 30, { lab: '(0 ; 30)', dy: -8 }) + SN(2, 368, 76) + side(404, 81, 'g(0) = 30 : ordonnée à l’origine', { fs: 13 }))
    + st(3, g3.seg(2, 40, 4, 40, { dash: '5 4', w: 1.8 }) + g3.seg(4, 40, 4, 50, { dash: '5 4', w: 1.8 }) + SN(3, 368, 122) + side(404, 127, '+ 1 séance : + 5 €', { fs: 13 }))
    + st(4, g3.dot(10, 80, { lab: '(10 ; 80)', dx: -70, dy: -8 }) + g3.line(5, 30) + SN(4, 368, 168) + side(404, 173, 'deux points suffisent', { c: 'kt' })));
  // 4. comparer : f(x) = 11x et g(x) = 5x + 30
  const g4 = MCVP.plot({ W, H: Hh, x: [0, 10, 1], y: [0, 110, 10], ml: 44, mr: 250, mt: 12, mb: 30, fs: 11, ly: 2, xl: 'séances', yl: 'prix (€)' });
  const vCmp = g4.wrap(g4.base + st(1, g4.line(11, 0, { stroke: MCVP.BLUE }) + g4.line(5, 30, { stroke: MCVP.RED }) + g4.txt(9.4, 103, 'f', { fill: MCVP.BLUE }) + g4.txt(9.6, 84, 'g', { fill: MCVP.RED, dy: 16 }) + SN(1, 368, 30) + side(404, 35, 'je trace les deux droites', { fs: 13 }))
    + st(2, g4.guide(5, 55) + g4.dot(5, 55) + SN(2, 368, 76) + side(404, 81, '11x = 5x + 30, donc x = 5', { fs: 13 }))
    + st(3, g4.band(0, 5, { fill: '#1D5FC2', op: .08 }) + g4.band(5, 10, { fill: '#C2332A', op: .08 }) + SN(3, 368, 122) + side(404, 127, 'avant 5 : f plus bas ; après : g', { fs: 13 }))
    + st(4, SN(4, 368, 168) + side(404, 173, 'dès 6 séances : la carte', { c: 'kt' })));
  chk(h(2) === 6 && h(6) === 6 && h(4) === 8 && h(5) === 7.5 && h(1) === 3.5 && Math.abs(14.99 * 4 - 59.96) < 1e-9 && 5 * 10 + 30 === 80 && 11 * 5 === 5 * 5 + 30 && 11 * 6 > 5 * 6 + 30, 'c5 notions');

  c.notions = [
    { titre: 'Image, antécédent, lecture graphique', decouvre: { txt: `Dans un jeu de plateforme (fictif), la hauteur h du saut d’un personnage, en cases, dépend du temps t, en dixièmes de seconde : ${H('h(t) = 4t − 0,5t²')}. À quelle hauteur est-il pour t = 2 ? Quand est-il à 6 cases ? Quelle est sa hauteur maximale ?`, img: skSaut() },
      methode: ['Je repère les axes : le temps t en abscisse, la hauteur h(t) en ordonnée.', 'L’image de 2 : je pars de 2 sur l’axe horizontal, je monte jusqu’à la courbe, je lis sur l’axe vertical.', 'Les antécédents de 6 : je pars de 6 sur l’axe vertical, je rejoins la courbe, je lis sur l’axe horizontal.', 'Le maximum : le point le plus haut de la courbe.'],
      vois: vSaut,
      solution: `<p>${FM(R`h(2)=4\times2-0{,}5\times2^2=8-2=6`)} : à t = 2, le personnage est à 6 cases.</p><p>Il est à 6 cases deux fois, pour t = 2 et t = 6. Sa hauteur maximale est 8 cases, pour t = 4.</p>`,
      retiens: `<p>Une <b>fonction</b> f associe à chaque nombre x un seul nombre f(x) : son <b>image</b>. On note f : x ↦ f(x).</p><p>Si f(a) = b, a est un <b>antécédent</b> de b. Sur le graphique, les images se lisent sur l’axe vertical, les antécédents sur l’axe horizontal.</p>`,
      attention: 'Un nombre n’a qu’une seule image, mais il peut avoir plusieurs antécédents : 6 en a deux, 2 et 6.',
      amoi: [['Calcule h(1).', '4 − 0,5 = 3,5'], ['Lis ou calcule h(5).', '20 − 12,5 = 7,5']] },
    { titre: 'Fonction linéaire et proportionnalité', decouvre: { txt: `Netflix Standard coûte ${H('14,99 € par mois')}. Le prix payé pour x mois est p(x) = 14,99x. Combien pour 4 mois ? À quoi ressemble le graphique ?`, img: skMois() },
      methode: ['Je reconnais la forme p(x) = ax avec a = 14,99 : c’est une fonction linéaire.', 'Je calcule quelques images : p(2) = 29,98 ; p(4) = 59,96 ; p(6) = 89,94.', 'Je place les points : ils sont alignés avec l’origine.', 'Le coefficient a = 14,99 est le prix d’un mois : quand x augmente de 1, p(x) augmente de 14,99.'],
      vois: vLin,
      solution: `<p>4 mois coûtent <b>59,96 €</b>.</p><p>La représentation est une droite qui passe par l’origine : le prix est proportionnel au nombre de mois.</p><p class="srcl">${D.srcNetflix}</p>`,
      retiens: `<p>Une <b>fonction linéaire</b> s’écrit ${FM(R`f(x)=ax`)}. Elle traduit une situation de proportionnalité, de coefficient a.</p><p>Sa représentation graphique est une <b>droite qui passe par l’origine</b>.</p>`,
      attention: 'f(x) = 14,99x + 5 n’est pas linéaire : sa droite ne passe pas par l’origine.',
      amoi: [['f(x) = 3x. Calcule f(7).', '21'], ['f(x) = 2,5x. Antécédent de 10 ?', '4']] },
    { titre: 'Fonction affine', decouvre: { txt: `Une carte de cinéma (fictive) coûte ${H('30 € par an')}, puis ${H('5 € la séance')}. Le prix pour x séances est g(x) = 5x + 30. Comment représenter g ?`, img: skCarte() },
      methode: ['Je reconnais la forme g(x) = ax + b avec a = 5 et b = 30 : c’est une fonction affine.', 'b = 30 = g(0) : la droite coupe l’axe vertical en 30 (le prix de la carte seule).', 'a = 5 : quand x augmente de 1, g(x) augmente de 5 (une séance de plus).', 'Je calcule un second point, g(10) = 80, et je trace la droite.'],
      vois: vAff,
      solution: '<p>La représentation de g est la droite qui passe par (0 ; 30) et (10 ; 80).</p><p>Avec la carte, 10 séances coûtent <b>80 €</b>.</p>',
      retiens: `<p>Une <b>fonction affine</b> s’écrit ${FM(R`f(x)=ax+b`)}. Sa représentation est une droite.</p><p><b>b</b> est l’ordonnée à l’origine : f(0) = b. <b>a</b> est le coefficient directeur : quand x augmente de 1, f(x) varie de a.</p>`,
      attention: 'Dans 5x + 30, la pente est 5 et le départ est 30 : ne pas les échanger. Une fonction linéaire est une fonction affine avec b = 0.',
      amoi: [['g(x) = 5x + 30. Calcule g(6).', '60'], ['Pour quel x a-t-on g(x) = 75 ?', 'x = 9']] },
    { titre: 'Comparer deux formules', decouvre: { txt: `Sans carte, la séance coûte ${H('11 €')} (fictif) : f(x) = 11x. Avec la carte : g(x) = 5x + 30. À partir de combien de séances la carte devient-elle intéressante ?`, img: skDeux() },
      methode: ['Je trace les deux droites dans le même repère.', 'Je cherche le point où elles se coupent, par le calcul : 11x = 5x + 30, donc 6x = 30 et x = 5.', 'Je regarde quelle droite est en dessous, avant et après x = 5.', 'Je conclus avec un nombre entier de séances.'],
      vois: vCmp,
      solution: '<p>Pour 5 séances, les deux formules coûtent 55 €.</p><p>Dès <b>6 séances</b>, la carte est moins chère : 60 € contre 66 € sans carte.</p>',
      retiens: '<p>Pour comparer deux formules f et g, on résout l’équation f(x) = g(x) : on trouve l’abscisse du point d’intersection des deux droites.</p><p>Ensuite, la droite la plus basse indique la formule la moins chère.</p>',
      attention: 'La lecture du graphique donne une valeur approchée ; l’équation donne la valeur exacte.',
      amoi: [['Résous 11x = 5x + 30.', 'x = 5'], ['Pour 8 séances, quelle formule choisir ?', 'la carte : 70 € contre 88 €']] }];
  chk(3 * 7 === 21 && 10 / 2.5 === 4 && 5 * 6 + 30 === 60 && (75 - 30) / 5 === 9 && 5 * 8 + 30 === 70 && 11 * 8 === 88, 'c5 « À moi »');

  c.mots = [['fonction', 'un procédé qui associe à chaque nombre un seul nombre', 'h : t ↦ 4t − 0,5t²'], ['image', 'le nombre associé à x, noté f(x)', 'h(2) = 6 : l’image de 2 est 6.'], ['antécédent', 'un nombre de départ qui donne une image donnée', '2 et 6 sont des antécédents de 6.'], ['fonction linéaire', 'f(x) = ax ; droite qui passe par l’origine', 'p(x) = 14,99x'], ['fonction affine', 'f(x) = ax + b ; une droite', 'g(x) = 5x + 30'], ['ordonnée à l’origine', 'b = f(0), là où la droite coupe l’axe vertical', 'g(0) = 30'], ['coefficient directeur', 'a : la variation de f(x) quand x augmente de 1', 'a = 5 : + 5 € par séance']];

  c.resolus = [
    { titre: 'Trouver l’antécédent de 85 par g(x) = 5x + 30', outil: '✏️ à la main', enonce: `Pour quel nombre de séances paie-t-on ${H('85 €')} avec la carte, g(x) = 5x + 30 ?`,
      rows: [['5x + 30 = 85', 'Je traduis la question par une équation.'], ['5x = 85 − 30 = 55', 'J’enlève 30 des deux côtés.'], ['x = 55 ÷ 5 = 11', 'Je divise par 5.'], ['g(11) = 5 × 11 + 30 = 85', 'Je vérifie en calculant l’image.']], verif: '55 + 30 = 85 ✓', rep: 'L’antécédent de 85 est 11 : 11 séances coûtent 85 €.', go: ['e2'] },
    { titre: 'À toi : trouver l’antécédent de 59 par f(x) = 4x + 15', outil: '✏️ à la main', enonce: `Une fonction affine est définie par ${H('f(x) = 4x + 15')}. Trouve l’antécédent de ${H('59')}.`, trous: [0, 1, 2, 3],
      rows: [['4x + 15 = ⟦59⟧', 'Je traduis par une équation.'], ['4x = 59 − 15 = ⟦44⟧', 'J’enlève 15 des deux côtés.'], ['x = 44 ÷ 4 = ⟦11⟧', 'Je divise par 4.'], ['f(11) = 4 × 11 + 15 = ⟦59⟧', 'Je vérifie.']], verif: '44 + 15 = 59 ✓', rep: 'L’antécédent de 59 est 11.', go: ['e1', 'e2'] }];
  c.entraine = [{ id: 'e1', gen: 'c5e1', lc: 3 }, { id: 'e2', gen: 'c5e2', lc: 2 }, { id: 'e3', gen: 'c5e3', lc: 4 }];

  /* ---------- je résous ---------- */
  chk(60 * 2 + 45 === 165 && 60 * 1.5 + 45 === 135 && (285 - 45) / 60 === 4, 'c5 problème 1');
  chk(100 - 12.5 * 2 === 75 && 100 / 12.5 === 8 && (100 - 25) / 12.5 === 6, 'c5 problème 2');
  chk(12 * 4 === 48 && 6 * 4 + 12 === 36 && 12 / 6 === 2 && (30 - 12) / 6 === 3, 'c5 problème 3');
  c.probs = [
    PB({ id: 'p1', etape: 2, lc: 3, comps: ['mod', 'cal'], titre: 'Le devis du garage',
      intro: `<p>Un garage (fictif) facture un forfait de diagnostic de ${H('45 €')}, plus ${H('60 € par heure')} de main-d’œuvre. Le prix pour x heures est f(x) = 60x + 45.</p>`,
      qs: [Q('a.', 'Calcule le prix pour 2 heures de travail.', 'f(2) = 60 × 2 + 45 = 165 €', 165, { w: 24, lab: 'en € :' }), Q('b.', 'La fonction f est-elle linéaire, affine, ou les deux ? Justifie.', 'Affine (de la forme ax + b avec b = 45), mais pas linéaire car b ≠ 0.', null, { lines: 1 }), Q('c.', 'Calcule le prix pour 1 h 30 min.', 'f(1,5) = 60 × 1,5 + 45 = 135 €', 135, { w: 24, lab: 'en € :' }), Q('d.', 'Un client a payé 285 €. Combien d’heures le mécanicien a-t-il travaillé ?', '60x + 45 = 285 ; 60x = 240 ; x = 4 h', 4, { w: 24, lab: 'en h :' })],
      err: { 2: [{ v: 60 * 1.3 + 45, m: '1 h 30 min = 1,5 h, pas 1,3 h.' }], 3: [{ v: 285 / 60, m: 'Enlève d’abord le forfait de 45 €.' }] },
      hints: ['Remplace x par le nombre d’heures.', '30 min = 0,5 h.', 'Écris 60x + 45 = 285, puis résous.'], pouce: 'f(2) = 120 + 45 ; 1 h 30 = 1,5 h ; 60x + 45 = 285 donne 60x = 240.', corr: 'a. 165 €. b. affine. c. 135 €. d. 4 h.' }),
    PB({ id: 'p2', etape: 3, lc: 1, defi: 4, bulle: 'Ce cas se fait en 4 étapes. La fonction donne la charge restante : pour « à plat », cherche quand elle vaut 0.', autravail: { comp: 'rep', txt: 'lire une courbe de diagnostic (charge d’une batterie, température d’un moteur) pour repérer une panne.' }, comps: ['mod', 'rep', 'cal', 'com'], titre: 'La batterie de la console',
      intro: `<p>Une console portable (fictive) est chargée à 100 %. En jeu, sa charge, en %, au bout de t heures est b(t) = 100 − 12,5t.</p>`,
      qs: [Q('a.', 'Calcule b(2). Que signifie ce nombre ?', 'b(2) = 100 − 25 = 75 : après 2 h, il reste 75 %.', 75, { w: 22, lab: 'b(2) =' }), Q('b.', 'Au bout de combien de temps la console est-elle à plat ?', '100 − 12,5t = 0 ; t = 100 ÷ 12,5 = 8 h', 8, { w: 22, lab: 'en h :' }), Q('c.', 'Quel est l’antécédent de 25 ? Interprète.', '100 − 12,5t = 25 ; t = 6 : à 25 % au bout de 6 h.', 6, { w: 22 }), Q('d.', 'La représentation de b est-elle une droite ? Explique.', 'Oui : b(t) = −12,5t + 100 est une fonction affine (a = −12,5, b = 100).', null, { lines: 2 })],
      err: { 1: [{ v: 12.5 * 100, m: 'Résous 100 − 12,5t = 0 : t = 100 ÷ 12,5.' }] },
      hints: ['b(2) : remplace t par 2.', 'À plat : la charge vaut 0.', 'Une fonction de la forme at + b est affine.'], pouce: 'b(2) = 75 ; à plat : 12,5t = 100 ; 25 % : 12,5t = 75.', corr: 'a. 75 %. b. 8 h. c. 6 h. d. affine, donc droite.' }),
    PB({ id: 'p3', etape: 4, lc: 4, cls: 'bac', defi: 5, bulle: 'Voici une question « vers le brevet » : 5 étapes. Trois formules, trois fonctions : résous les équations, puis conseille avec une phrase.', autravail: { comp: 'com', txt: 'conseiller un client entre deux formules d’entretien ou de location, selon son usage.' }, comps: ['mod', 'rai', 'cal', 'com'], titre: 'Trois formules de cinéma',
      intro: `<p>Un cinéma (fictif) propose trois formules par mois, pour x séances :</p><ul><li>sans carte : 12 € la séance, f(x) = 12x ;</li><li>carte demi-tarif : 12 € de carte, puis 6 € la séance, h(x) = 6x + 12 ;</li><li>illimité : 30 € par mois, g(x) = 30.</li></ul>`,
      qs: [BQ('1', 'Calculer le prix des trois formules pour 4 séances.', 'cal', 'f(4) = 48 € ; h(4) = 36 € ; g(4) = 30 €', null, { lines: 1 }), BQ('2', 'Laquelle de ces fonctions est linéaire ? Justifier.', 'rai', 'f, car f(x) = 12x est de la forme ax.', null, { lines: 1 }), BQ('3', 'Résoudre 12x = 6x + 12 et interpréter.', 'cal', '6x = 12 ; x = 2 : pour 2 séances, sans carte et demi-tarif coûtent 24 €.', 2, { lines: 1, lab: 'x =' }), BQ('4', 'Résoudre 6x + 12 = 30 et interpréter.', 'cal', '6x = 18 ; x = 3 : pour 3 séances, demi-tarif et illimité coûtent 30 €.', 3, { lines: 1, lab: 'x =' }), BQ('5', 'Conseiller Lina selon le nombre de séances qu’elle voit par mois.', 'com', '1 séance : sans carte ; 2 : sans carte ou demi-tarif ; 3 : demi-tarif ou illimité ; 4 ou plus : illimité.', null, { lines: 2 })],
      err: { 2: [{ v: 12 / 18, m: 'Regroupe les x : 12x − 6x = 12.' }] },
      hints: ['Remplace x par 4 dans chaque formule.', 'Linéaire : de la forme ax.', 'Compare les formules avant et après chaque intersection.'], pouce: 'f(4) = 48, h(4) = 36, g = 30. 12x = 6x + 12 donne x = 2 ; 6x + 12 = 30 donne x = 3.', corr: '1. 48 €, 36 €, 30 €. 2. f. 3. x = 2. 4. x = 3. 5. illimité dès 4 séances.' })];

  c.bilan = [['Je sais lire une image et un antécédent.', ['e1', 'p2']], ['Je sais reconnaître une fonction linéaire.', ['e2', 'p3']], ['Je sais utiliser une fonction affine.', ['e1', 'e2', 'p1']], ['Je sais comparer deux formules.', ['e3', 'p3']]];
  c.words = require('./gl3')('c5');
  return c;
};
