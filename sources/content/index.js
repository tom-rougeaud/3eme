/* 3ème Série Pro — chargement des 10 chapitres (contenu commun à l’appli et au manuel). */
'use strict';
const fs = require('fs'), path = require('path');
const METIERS = require('./metiers3');
const PONT = require('./pont3');
const TEX = require('../lib/tex');
const TRG = require('../shared/train.js').MCVT.TR;
const NT = require('./notions-txt');
const hlText = require('../lib/hl');
module.exports = chk => {
  const EVALS = require('./evals3')(chk);
  const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(n => fs.existsSync(path.join(__dirname, `c${n}.js`)));
  return ids.map(n => {
    const c = require(`./c${n}.js`)(chk);
    /* niveaux : chaque exercice courant a sa variante 🌱 guidée et sa variante 🚀 défi (id + 'a', id + 'd'), dès que les deux existent */
    c.entraine = c.entraine.filter(e => !e.niv).flatMap(e => [{ ...e, niv: 0 }].concat(TRG[e.gen + 'a'] && TRG[e.gen + 'd'] ? [{ id: e.id + 'a', gen: e.gen + 'a', lc: e.lc, niv: -1, base: e.id }, { id: e.id + 'd', gen: e.gen + 'd', lc: e.lc, niv: 1, base: e.id }] : []));
    chk(c.entraine.filter(e => e.niv).every(e => c.entraine.some(b => b.id === e.base && b.niv === 0)), `${c.id} : chaque variante renvoie à un exercice courant`);
    /* textes de leçon réécrits en phrases complètes ; données chiffrées surlignées dans la méthode et la solution */
    (NT[c.id] || []).forEach((o, i) => { if (o && c.notions[i]) Object.assign(c.notions[i], o); });
    c.notions.forEach(nt => { nt.methode = nt.methode.map(hlText); nt.solution = hlText(nt.solution); });
    c.metier = METIERS[c.id]; c.eval = EVALS[c.id]; c.pont = PONT[c.id];
    chk(!!c.pont && c.pont.de.length >= 1 && c.pont.change.length >= 2, `${c.id} : encart « Ce que tu sais déjà »`);
    chk(!!c.metier && !!c.metier.job && c.metier.job.apres.length >= 1 && !!c.eval, `métier ou évaluation manquant : ${c.id}`);
    chk(c.notions.length >= 3 && c.notions.length <= 6, `${c.id} : 3 à 6 notions`);
    chk(!!c.parties && c.parties.flatMap(p => p.n).join() === c.notions.map((_, i) => i + 1).join(), `${c.id} : les parties couvrent toutes les notions, dans l’ordre`);
    chk(c.entraine.length >= 3 && c.probs.length === 3, `${c.id} : 3 exercices et 3 problèmes`);
    /* un seul problème par chapitre : le sujet « vers le brevet » (p3) ; le petit problème (p1) et le cas pratique (p2) ne sont plus proposés */
    c.probs = c.probs.filter(p => p.id === 'p3');
    c.bilan = c.bilan.map(([t, es]) => { const r = es.filter(e => e !== 'p1' && e !== 'p2'); return [t, r.length ? r : ['p3']]; });
    chk(c.resolus.length === 2 && !!c.resolus[1].trous, `${c.id} : un résolu complet et un à trous`);
    return TEX.deep(c);
  });
};
