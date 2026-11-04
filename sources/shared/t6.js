/* 3ème Série Pro · chapitre 6 — Statistiques : moyenne (simple et pondérée), médiane, étendue, diagrammes, fréquences. */
(function (root) {
  'use strict';
  const { DEP, TR, H } = typeof module !== 'undefined' ? require('./train.js').MCVT : root.MCVT;
  const { fr, rnd, tb, sb, T, svg, table, num, qcm, pick, int, xs, P, shuffle } = H;
  /* épisodes par saison des Simpson, saisons 1 à 36 (Wikipédia, « List of The Simpsons episodes ») */
  const SIMP = [13, 22, 24, 22, 22, 25, 25, 25, 25, 23, 22, 21, 22, 22, 22, 21, 22, 22, 20, 21, 23, 22, 22, 22, 22, 22, 22, 22, 21, 23, 22, 22, 22, 22, 18, 22];
  const med = a => { const s = a.slice().sort((x, y) => x - y), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
  const sum = a => a.reduce((x, y) => x + y, 0);

  /* point de départ : six saisons des Simpson */
  DEP.c6 = R => {
    let s0; do { s0 = int(R, 0, 30); } while (Math.max(...SIMP.slice(s0, s0 + 6)) === Math.min(...SIMP.slice(s0, s0 + 6)));
    const sel = SIMP.slice(s0, s0 + 6), k = int(R, 0, 5), tot = sum(sel), mx = Math.max(...sel), mn = Math.min(...sel);
    const doc = `<table class="dt tcx dt-sm"><thead><tr><th>Saison</th>${sel.map((_, i) => `<th>${s0 + i + 1}</th>`).join('')}</tr></thead><tbody><tr><th>Épisodes</th>${sel.map((v, i) => `<td data-cell="${i}">${v}</td>`).join('')}</tr></tbody></table><p class="srcl">Source : Wikipédia (en), « List of The Simpsons episodes », consultée en octobre 2026.</p>`;
    return { titre: 'Six saisons des Simpson', doc,
      qs: [{ t: `Touche le nombre d’épisodes de la saison ${s0 + k + 1}.`, kind: 'tap', cell: String(k), v: sel[k], tol: .01, a: String(sel[k]) },
        { t: 'Combien d’épisodes en tout pour ces six saisons ?', kind: 'num', v: tot, tol: .01, a: String(tot), x: `${sel.join(' + ')} = ${tot}` },
        { t: 'Quel est le plus grand nombre d’épisodes d’une saison ?', kind: 'num', v: mx, tol: .01, a: String(mx) },
        { t: 'Quelle est l’étendue de la série (plus grand − plus petit) ?', kind: 'num', v: mx - mn, tol: .01, a: String(mx - mn), x: `${mx} − ${mn} = ${mx - mn}` },
        { t: 'La moyenne est-elle plus proche de 18, de 22 ou de 26 ?', kind: 'qcm', choices: ['18', '22', '26'], ok: 1, a: '22', x: `${tot} ÷ 6 ≈ ${fr(rnd(tot / 6, 1))}` }] };
  };

  /* e1 · moyenne simple et moyenne pondérée */
  TR.c6e1 = R => {
    let v; do { v = Array.from({ length: 5 }, () => int(R, 8, 20)); } while (sum(v) % 5);
    const m = sum(v) / 5;
    const vals = shuffle(R, [10, 12, 14, 15, 16]).slice(0, 3).sort((a, b) => a - b), cf = [int(R, 1, 3), int(R, 1, 3), int(R, 1, 3)], S = vals.reduce((a, x, i) => a + x * cf[i], 0), N = sum(cf), mp = rnd(S / N, 2);
    const items = [num('a', sum(v), 0, String(sum(v))), num('b', m, 2, fr(m), [{ v: sum(v) / 4, m: 'Il y a 5 valeurs : on divise par 5.' }]), num('c', S, 0, String(S), [{ v: sum(vals), m: 'Chaque note compte autant de fois que son coefficient.' }]), num('d', mp, 2, fr(mp), [{ v: rnd(sum(vals) / 3, 2), m: 'Moyenne pondérée : on divise par la somme des coefficients, ' + N + '.' }])];
    xs(items, { a: `${v.join(' + ')} = ${sum(v)}`, b: `${sum(v)} ÷ 5 = ${fr(m)}`, c: vals.map((x, i) => `${x} × ${cf[i]}`).join(' + ') + ` = ${S}`, d: `${S} ÷ ${N} ${S / N === mp ? '=' : '≈'} ${fr(mp)}` });
    return { titre: 'Moyenne simple, moyenne pondérée', consigne: 'Des scores dans un jeu de rythme, puis des notes avec coefficients.',
      support: table(['Partie', '1', '2', '3', '4', '5'], [['Score', ...v.map(String)]]) + `<p class="tr-l">a. Somme des scores : ${tb('a', String(sum(v)), 12)} · b. Score moyen : ${tb('b', fr(m), 12)}</p>` + table(['Note', ...vals.map(String)], [['Coefficient', ...cf.map(String)]]) + `<p class="tr-l">c. Somme des notes × coefficients : ${tb('c', String(S), 12)} · d. Moyenne pondérée, au centième : ${tb('d', fr(mp), 12)}</p>`, items,
      hints: ['Moyenne = somme des valeurs ÷ nombre de valeurs.', 'Avec des coefficients : on multiplie chaque note par son coefficient.', 'Puis on divise par la somme des coefficients.'] };
  };

  /* e2 · médiane et étendue */
  TR.c6e2 = R => {
    const n = pick(R, [7, 8, 9]); let v; do { v = Array.from({ length: n }, () => int(R, 60, 180)); } while (new Set(v).size < n);
    const s = v.slice().sort((a, b) => a - b), md = med(v), e = s[n - 1] - s[0], m = rnd(sum(v) / n, 1);
    const items = [num('a', s[0], 0, String(s[0])), num('b', md, 1, fr(md), [{ v: v[Math.floor(n / 2)], m: 'Il faut d’abord ranger les valeurs dans l’ordre croissant.' }]), num('c', e, 0, String(e), [{ v: s[n - 1], m: 'L’étendue est une différence : plus grande − plus petite.' }]), num('d', m, 1, fr(m))];
    xs(items, { a: `rangées : ${s.join(' ; ')} ; la plus petite est ${s[0]}`, b: n % 2 ? `${n} valeurs : la médiane est la ${(n + 1) / 2}e, ${md}` : `${n} valeurs : moyenne de la ${n / 2}e et de la ${n / 2 + 1}e : (${s[n / 2 - 1]} + ${s[n / 2]}) ÷ 2 = ${fr(md)}`, c: `${s[n - 1]} − ${s[0]} = ${e}`, d: `${sum(v)} ÷ ${n} ${sum(v) / n === m ? '=' : '≈'} ${fr(m)}` });
    return { titre: 'Médiane et étendue', consigne: `Durées (en minutes) de ${n} films vus par un ciné-club.`,
      support: table(['Film', ...v.map((_, i) => String(i + 1))], [['Durée (min)', ...v.map(String)]]) + `<p class="tr-l">a. Plus petite durée : ${tb('a', String(s[0]), 12)} · b. Médiane : ${tb('b', fr(md), 12)}</p><p class="tr-l">c. Étendue : ${tb('c', String(e), 12)} · d. Moyenne, au dixième : ${tb('d', fr(m), 12)}</p>`, items,
      hints: ['Range d’abord les durées de la plus petite à la plus grande.', n % 2 ? 'Avec ' + n + ' valeurs, la médiane est la ' + (n + 1) / 2 + 'e valeur rangée.' : 'Avec ' + n + ' valeurs, la médiane est entre la ' + n / 2 + 'e et la ' + (n / 2 + 1) + 'e.', 'Étendue = plus grande − plus petite.'] };
  };

  /* e3 · lire un diagramme en barres */
  const JOURS = ['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.', 'dim.'], JOURS_L = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
  TR.c6e3 = R => {
    const v = JOURS.map(() => int(R, 4, 24) * 50), tot = sum(v), iM = v.indexOf(Math.max(...v)); let i1 = int(R, 0, 6), i2 = (i1 + int(R, 1, 6)) % 7;
    if (v[i1] < v[i2]) { const t0 = i1; i1 = i2; i2 = t0; }
    const g = P.plot({ W: 560, H: 220, x: [0, 7, 1], y: [0, 1200, 100], ly: 2, ml: 52, mr: 12, mt: 12, mb: 28, fs: 11, yl: 'spectateurs', xt: JOURS.map((j, i) => [i + .5, j]), grid: true, cls: 'pic vis trs' });
    const bars = v.map((y, i) => `<rect x="${g.X(i + .15)}" y="${g.Y(y)}" width="${g.X(.7) - g.X(0)}" height="${g.Y(0) - g.Y(y)}" class="k2 ks" stroke-width="1.4"/>`).join('');
    const items = [num('a', v[iM], 0, String(v[iM])), num('b', v[i1] - v[i2], 0, fr(v[i1] - v[i2])), num('c', tot, 0, fr(tot)), num('d', rnd(v[iM] / tot * 100, 1), 1, fr(rnd(v[iM] / tot * 100, 1)) + ' %', [{ v: rnd(tot / v[iM], 1), m: 'Fréquence = effectif ÷ total, pas l’inverse.' }])];
    xs(items, { a: `la barre la plus haute est celle du ${JOURS_L[iM]} : ${v[iM]}`, b: `${v[i1]} − ${v[i2]} = ${fr(v[i1] - v[i2])}`, c: `${v.join(' + ')} = ${fr(tot)}`, d: `${v[iM]} ÷ ${fr(tot)} × 100 ≈ ${fr(rnd(v[iM] / tot * 100, 1))} %` });
    return { titre: 'Lire un diagramme en barres', consigne: 'Spectateurs d’un live de jeu vidéo, jour par jour. Lis les valeurs : elles tombent sur des multiples de 50.',
      support: g.wrap(g.base + bars) + `<p class="tr-l">a. Le plus grand nombre de spectateurs en une journée : ${tb('a', String(v[iM]), 12)} · b. Combien de spectateurs de plus le ${JOURS_L[i1]} que le ${JOURS_L[i2]} ? ${tb('b', fr(v[i1] - v[i2]), 12)}</p><p class="tr-l">c. Total de la semaine : ${tb('c', fr(tot), 14)} · d. Fréquence du meilleur jour (celui qui a le plus de spectateurs), en pourcentage, arrondie au dixième : ${tb('d', fr(rnd(v[iM] / tot * 100, 1)), 12)}</p>`, items,
      hints: ['Lis le haut de chaque barre sur l’axe vertical : chaque ligne vaut 100.', 'Un écart peut être négatif si le second jour a plus de spectateurs.', 'Fréquence = effectif ÷ total × 100.'] };
  };
  if (typeof module !== 'undefined') module.exports = { SIMP, med, sum };
  /* ===== exercice ajouté : notion 4 (fréquences et tableur) ===== */
  {
    const { Q, fr, pick, int, table, rnd } = H;
    TR.c6e4 = R => {
      const vals = pick(R, [[6, 8, 10, 12, 14], [8, 10, 12, 14, 16], [5, 8, 10, 13, 15], [7, 9, 11, 13, 15]]), eff = vals.map(() => int(R, 1, 8)), N = eff.reduce((a, b) => a + b, 0);
      const i = int(R, 0, 4), j = int(R, 0, 4), t = 2, ge = eff.slice(t).reduce((a, b) => a + b, 0), last = N + 1;
      return Q('Fréquences et tableur', 'Le tableau donne les notes d’un groupe d’élèves à un contrôle et le nombre d’élèves pour chaque note.', [
        { lab: 'Effectif total (nombre d’élèves)', v: N, d: 0, w: 12, x: `${eff.join(' + ')} = ${N} (au tableur : =SOMME de la ligne des effectifs)`, err: [{ v: vals.reduce((a, b) => a + b, 0), m: 'L’effectif total est la somme des effectifs, pas des notes.' }] },
        { lab: `Fréquence de la note ${vals[i]}, en % (au dixième)`, v: rnd(eff[i] / N * 100, 1), d: 1, w: 14, x: `${eff[i]} ÷ ${N} = ${fr(eff[i] / N, 3)} soit ${fr(rnd(eff[i] / N * 100, 1), 1)} %`, err: [{ v: rnd(eff[i] / N, 3), m: 'Pour avoir un pourcentage, multiplie la fréquence par 100.' }] },
        { lab: `Quelle formule compte les élèves ayant exactement ${vals[j]} dans la colonne A2:A${last} ?`, qcm: [`=NB.SI(A2:A${last} ; ${vals[j]})`, `=SOMME(A2:A${last})`, `=MOYENNE(A2:A${last})`], ok: 0, x: `La fonction NB.SI compte les cellules qui vérifient une condition : =NB.SI(A2:A${last} ; ${vals[j]}).` },
        { lab: `Nombre d’élèves ayant une note supérieure ou égale à ${vals[t]}`, v: ge, d: 0, w: 12, x: `${eff.slice(t).join(' + ')} = ${ge}` },
        { lab: 'La fréquence en % de ces élèves (au dixième)', v: rnd(ge / N * 100, 1), d: 1, w: 14, x: `${ge} ÷ ${N} = ${fr(ge / N, 3)} soit ${fr(rnd(ge / N * 100, 1), 1)} %` }],
        ['Effectif total = somme des effectifs.', 'Fréquence = effectif ÷ effectif total ; pour un pourcentage, multiplie par 100.', '=NB.SI compte les cellules qui répondent à une condition.'],
        table(['Note', ...vals], [['Effectif', ...eff]]));
    };
  }
  /* ===== niveaux 🌱 guidé et 🚀 défi · chapitre 6 ===== */
  {
    const { Q, AI, pick, int, table } = H;
    /* e1 · moyennes */
    TR.c6e1a = R => {
      let v; do { v = Array.from({ length: 4 }, () => int(R, 8, 20)); } while (sum(v) % 4);
      const m = sum(v) / 4, mx = Math.max(...v);
      return Q('La moyenne, pas à pas', 'Voici les scores obtenus à quatre parties d’un jeu de rythme. Calcule le score moyen.', [
        { lab: 'Somme des quatre scores', v: sum(v), d: 0, w: 12, x: `${v.join(' + ')} = ${sum(v)}`, err: [{ v: m, m: 'Additionne d’abord tous les scores, sans diviser.' }] },
        { lab: 'Score moyen (somme ÷ 4)', v: m, d: 2, w: 12, a: fr(m), x: `${sum(v)} ÷ 4 = ${fr(m)}`, err: [{ v: sum(v) / 5, m: 'Il y a 4 scores : divise par 4.' }] },
        { lab: 'Écart entre le meilleur score et la moyenne', v: mx - m, d: 2, w: 12, a: fr(mx - m), x: `Meilleur score : ${mx} ; ${mx} − ${fr(m)} = ${fr(mx - m)}`, err: [{ v: m - Math.min(...v), m: 'On compare le meilleur score (le plus grand) à la moyenne.' }] },
        { lab: 'La moyenne est toujours l’une des valeurs de la série', qcm: ['vrai', 'faux'], ok: 1, x: `Faux : ici la moyenne est ${fr(m)}${v.includes(m) ? ' (cela arrive, mais pas toujours)' : ', qui ne fait pas partie des scores'}. En général, la moyenne est entre la plus petite et la plus grande valeur.` }],
        ['Moyenne = somme des valeurs ÷ nombre de valeurs.', 'Compte bien le nombre de valeurs : ici 4.', 'Un écart se calcule avec une soustraction : le plus grand moins le plus petit.'],
        table(['Partie', '1', '2', '3', '4'], [['Score', ...v.map(String)]]) + AI('scores 8, 10, 12 : somme 8 + 10 + 12 = 30 ; moyenne 30 ÷ 3 = 10.'));
    };
    TR.c6e1d = R => {
      let vals, cf, S, N, k, need, T, tries = 0;
      do {
        vals = shuffle(R, [10, 11, 12, 13, 14, 15, 16]).slice(0, 3).sort((a, b) => a - b); cf = [int(R, 1, 3), int(R, 1, 3), int(R, 1, 3)];
        S = vals.reduce((a, x, i) => a + x * cf[i], 0); N = sum(cf); k = pick(R, [2, 3]); need = int(R, 9, 18); T = (S + k * need) / (N + k); tries++;
      } while (!(Number.isInteger(T) && T >= 10 && T <= 17) && tries < 5000);
      const mp = S / N;
      return Q('Moyenne pondérée et note à viser', 'Voici trois notes avec leur coefficient. Un dernier contrôle, de coefficient ' + k + ', reste à passer.', [
        { lab: 'Somme des notes × coefficients', v: S, d: 0, w: 12, x: vals.map((x, i) => `${x} × ${cf[i]}`).join(' + ') + ` = ${S}`, err: [{ v: sum(vals), m: 'Chaque note compte autant de fois que son coefficient.' }] },
        { lab: 'Somme des coefficients', v: N, d: 0, w: 10, x: `${cf.join(' + ')} = ${N}` },
        { lab: 'Moyenne pondérée actuelle, au centième', v: mp, d: 2, w: 12, x: `${S} ÷ ${N} ${Number.isInteger(S * 100 / N) ? '=' : '≈'} ${fr(rnd(mp, 2))}`, err: [{ v: rnd(sum(vals) / 3, 2), m: 'Divise par la somme des coefficients, ' + N + ', pas par 3.' }] },
        { lab: `Moyenne obtenue avec ${need} au dernier contrôle (coefficient ${k})`, v: T, d: 2, w: 12, a: fr(T), x: `(${S} + ${need} × ${k}) ÷ (${N} + ${k}) = ${S + need * k} ÷ ${N + k} = ${fr(T)}`, err: [{ v: rnd((mp + need) / 2, 2), m: 'Le dernier contrôle compte ' + k + ' fois : ajoute ' + need + ' × ' + k + ' et divise par ' + (N + k) + '.' }] },
        { lab: `Note à obtenir au dernier contrôle pour avoir exactement ${T} de moyenne`, v: need, d: 1, w: 12, a: fr(need), x: `${T} × ${N + k} = ${T * (N + k)} ; ${T * (N + k)} − ${S} = ${T * (N + k) - S} ; ${T * (N + k) - S} ÷ ${k} = ${need}`, err: [{ v: T, m: 'Le dernier contrôle a un coefficient : calcule le total de points attendu, soustrais ce que tu as déjà, puis divise par ' + k + '.' }] }],
        ['Moyenne pondérée = (somme des notes × coefficients) ÷ (somme des coefficients).', 'Le dernier contrôle ajoute sa note × son coefficient au total.', 'Pour viser une moyenne : total attendu = moyenne × somme des coefficients.'],
        table(['Note', ...vals.map(String)], [['Coefficient', ...cf.map(String)]]));
    };
    /* e2 · médiane et étendue */
    TR.c6e2a = R => {
      const n = pick(R, [7, 9]); let v; do { v = Array.from({ length: n }, () => int(R, 60, 180)); } while (new Set(v).size < n);
      const s = v.slice().sort((a, b) => a - b), md = s[(n - 1) / 2];
      return Q('La médiane, pas à pas', `Voici les durées (en minutes) de ${n} films vus par un ciné-club. La médiane partage la série rangée en deux groupes de même effectif.`, [
        { lab: 'Rang de la valeur centrale (après rangement)', v: (n + 1) / 2, d: 0, w: 10, x: `${n} valeurs : la valeur du milieu est la ${(n + 1) / 2}e (${(n - 1) / 2} valeurs avant, ${(n - 1) / 2} après).`, err: [{ v: n / 2, m: 'Avec ' + n + ' valeurs, il y a une valeur au milieu : la ' + (n + 1) / 2 + 'e.' }] },
        { lab: 'Médiane des durées, en minutes', v: md, d: 0, w: 12, x: `Valeurs rangées : ${s.join(' ; ')}. La ${(n + 1) / 2}e est ${md}.`, err: [{ v: v[(n - 1) / 2], m: 'Il faut d’abord ranger les durées dans l’ordre croissant.' }] },
        { lab: 'Étendue, en minutes', v: s[n - 1] - s[0], d: 0, w: 12, x: `${s[n - 1]} − ${s[0]} = ${s[n - 1] - s[0]}`, err: [{ v: s[n - 1], m: 'L’étendue est une différence : plus grande − plus petite.' }] },
        { lab: 'Nombre de films plus longs que la médiane', v: (n - 1) / 2, d: 0, w: 10, x: `La médiane partage la série en deux groupes égaux : ${(n - 1) / 2} valeurs sont plus grandes.` }],
        ['Range d’abord les valeurs de la plus petite à la plus grande.', 'Avec un nombre impair de valeurs, la médiane est la valeur du milieu.', 'Étendue = plus grande valeur − plus petite valeur.'],
        table(['Film', ...v.map((_, i) => String(i + 1))], [['Durée (min)', ...v.map(String)]]) + AI('valeurs 7, 3, 9 : rangées 3 ; 7 ; 9 : la médiane est la valeur du milieu, 7 ; l’étendue est 9 − 3 = 6.'));
    };
    TR.c6e2d = R => {
      let v; do { v = Array.from({ length: 7 }, () => int(R, 70, 110)); } while (new Set(v).size < 7);
      const O = pick(R, [240, 260, 300]), w = shuffle(R, [...v, O]), s = w.slice().sort((a, b) => a - b), md = (s[3] + s[4]) / 2, m = sum(w) / 8, m7 = sum(v) / 7;
      return Q('Médiane ou moyenne ?', 'Voici les durées (en minutes) de huit films. Un film est exceptionnellement long.', [
        { lab: 'Médiane des durées, en minutes', v: md, d: 1, w: 12, x: `Rangées : ${s.join(' ; ')}. Huit valeurs : on fait la moyenne de la 4e et de la 5e : (${s[3]} + ${s[4]}) ÷ 2 = ${fr(md)}.`, err: [{ v: s[3], m: 'Avec 8 valeurs, la médiane est entre la 4e et la 5e : fais leur moyenne.' }] },
        { lab: 'Moyenne des durées, au dixième', v: m, d: 1, w: 12, x: `${sum(w)} ÷ 8 ${Number.isInteger(m * 10) ? '=' : '≈'} ${fr(rnd(m, 1))}`, err: [{ v: rnd(sum(w) / 7, 1), m: 'Il y a 8 films : divise par 8.' }] },
        { lab: 'Étendue, en minutes', v: s[7] - s[0], d: 0, w: 12, x: `${s[7]} − ${s[0]} = ${s[7] - s[0]}` },
        { lab: 'Moyenne des sept autres films, au dixième', v: m7, d: 1, w: 12, x: `Sans le film de ${O} min : ${sum(v)} ÷ 7 ${Number.isInteger(m7 * 10) ? '=' : '≈'} ${fr(rnd(m7, 1))}`, err: [{ v: rnd(m, 1), m: 'Retire le film de ' + O + ' minutes, puis divise par 7.' }] },
        { lab: `Quel indicateur est le moins influencé par le film de ${O} minutes ?`, qcm: ['la médiane', 'la moyenne'], ok: 0, x: `La moyenne passe de ${fr(rnd(m7, 1))} à ${fr(rnd(m, 1))} à cause de ce film, alors que la médiane ne dépend que des valeurs du milieu.` }],
        ['Range les huit durées, puis prends le milieu : la 4e et la 5e valeur.', 'Pour la moyenne, additionne les huit durées et divise par 8.', 'Une valeur très grande tire la moyenne vers le haut, pas la médiane.']
        , table(['Film', ...w.map((_, i) => String(i + 1))], [['Durée (min)', ...w.map(String)]]));
    };
    /* e3 · diagrammes en barres */
    const JR = ['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.', 'dim.'];
    TR.c6e3a = R => {
      const v = JR.slice(0, 5).map(() => int(R, 2, 10) * 100), tot = sum(v); let i1 = int(R, 0, 4), i2 = (i1 + int(R, 1, 4)) % 5; if (v[i1] < v[i2]) [i1, i2] = [i2, i1];
      const g = P.plot({ W: 520, H: 210, x: [0, 5, 1], y: [0, 1100, 100], ly: 2, ml: 52, mr: 12, mt: 12, mb: 28, fs: 11, yl: 'spectateurs', xt: JR.slice(0, 5).map((j, i) => [i + .5, j]), grid: true, cls: 'pic vis trs' });
      const bars = v.map((y, i) => `<rect x="${g.X(i + .15)}" y="${g.Y(y)}" width="${g.X(.7) - g.X(0)}" height="${g.Y(0) - g.Y(y)}" class="k2 ks" stroke-width="1.4"/>`).join('');
      return Q('Lire un diagramme, pas à pas', 'Spectateurs d’un live, du lundi au vendredi. Chaque barre s’arrête sur une ligne du quadrillage : chaque ligne vaut 100.', [
        { lab: `Spectateurs le ${JR[i1]}`, v: v[i1], d: 0, w: 12, x: `La barre du ${JR[i1]} s’arrête sur la ligne ${v[i1]}.` },
        { lab: `Spectateurs le ${JR[i2]}`, v: v[i2], d: 0, w: 12, x: `La barre du ${JR[i2]} s’arrête sur la ligne ${v[i2]}.` },
        { lab: `Écart entre ${JR[i1]} et ${JR[i2]}`, v: v[i1] - v[i2], d: 0, w: 12, x: `${v[i1]} − ${v[i2]} = ${v[i1] - v[i2]} (le plus grand moins le plus petit)`, err: [{ v: v[i1] + v[i2], m: 'Un écart est une soustraction, pas une addition.' }] },
        { lab: 'Total de la semaine (du lundi au vendredi)', v: tot, d: 0, w: 12, x: `${v.join(' + ')} = ${fr(tot)}` }],
        ['Lis le haut de chaque barre sur l’axe vertical.', 'Un écart est une soustraction : le premier moins le second.', 'Pour un total, additionne les cinq valeurs.'],
        g.wrap(g.base + bars) + AI('si la barre s’arrête sur la 4e ligne du quadrillage, elle vaut 4 × 100 = 400.'));
    };
    TR.c6e3d = R => {
      const v = JR.map(() => int(R, 4, 24) * 50), tot = sum(v), mo = tot / 7, above = v.filter(x => x > mo).length, we = v[5] + v[6];
      const g = P.plot({ W: 560, H: 220, x: [0, 7, 1], y: [0, 1200, 100], ly: 2, ml: 52, mr: 12, mt: 12, mb: 28, fs: 11, yl: 'spectateurs', xt: JR.map((j, i) => [i + .5, j]), grid: true, cls: 'pic vis trs' });
      const bars = v.map((y, i) => `<rect x="${g.X(i + .15)}" y="${g.Y(y)}" width="${g.X(.7) - g.X(0)}" height="${g.Y(0) - g.Y(y)}" class="k2 ks" stroke-width="1.4"/>`).join('');
      return Q('Un diagramme à analyser', 'Spectateurs d’un live de jeu vidéo, jour par jour. Les valeurs tombent sur des multiples de 50.', [
        { lab: 'Total de la semaine', v: tot, d: 0, w: 12, x: `${v.join(' + ')} = ${fr(tot)}` },
        { lab: 'Nombre moyen de spectateurs par jour, au dixième', v: mo, d: 1, w: 12, x: `${fr(tot)} ÷ 7 ${Number.isInteger(mo * 10) ? '=' : '≈'} ${fr(rnd(mo, 1))}`, err: [{ v: rnd(tot / 6, 1), m: 'Il y a 7 jours dans la semaine.' }] },
        { lab: 'Nombre de jours au-dessus de cette moyenne', v: above, d: 0, w: 10, x: `On compare chaque barre à ${fr(rnd(mo, 1))} : ${above} jour${above > 1 ? 's' : ''} dépasse${above > 1 ? 'nt' : ''} la moyenne.` },
        { lab: 'Part du week-end (samedi + dimanche), en % au dixième', v: rnd(we / tot * 100, 1), d: 1, w: 12, x: `(${v[5]} + ${v[6]}) ÷ ${fr(tot)} × 100 = ${fr(we)} ÷ ${fr(tot)} × 100 ≈ ${fr(rnd(we / tot * 100, 1))} %`, err: [{ v: rnd(tot / we, 1), m: 'Fréquence = effectif ÷ total, pas l’inverse.' }] },
        { lab: 'Écart entre le meilleur et le moins bon jour', v: Math.max(...v) - Math.min(...v), d: 0, w: 12, x: `${Math.max(...v)} − ${Math.min(...v)} = ${Math.max(...v) - Math.min(...v)}` }],
        ['Lis chaque barre sur l’axe vertical : chaque ligne vaut 100.', 'Moyenne = total ÷ nombre de jours.', 'Part = effectif ÷ total × 100.'], g.wrap(g.base + bars));
    };
    /* e4 · fréquences */
    TR.c6e4a = R => {
      const vals = pick(R, [[6, 8, 10, 12, 14], [8, 10, 12, 14, 16], [5, 8, 10, 13, 15], [7, 9, 11, 13, 15]]), eff = pick(R, [[2, 4, 6, 5, 3], [1, 3, 8, 5, 3], [4, 5, 5, 4, 2], [2, 6, 6, 4, 2], [3, 5, 4, 6, 2]]), N = sum(eff), t = 3, ge = sum(eff.slice(t)); let i = int(R, 0, 4); for (let z = 0; z < 8 && eff[i] === ge; z++) i = int(R, 0, 4);
      return Q('Fréquences, pas à pas', 'Le tableau donne les notes d’un groupe d’élèves à un contrôle et le nombre d’élèves pour chaque note.', [
        { lab: 'Effectif total (nombre d’élèves)', v: N, d: 0, w: 10, x: `${eff.join(' + ')} = ${N} (au tableur : =SOMME de la ligne des effectifs)`, err: [{ v: sum(vals), m: 'L’effectif total est la somme des effectifs, pas des notes.' }] },
        { lab: `Fréquence de la note ${vals[i]}, en %`, v: eff[i] / N * 100, d: 1, w: 12, a: fr(eff[i] / N * 100), x: `${eff[i]} ÷ ${N} × 100 = ${fr(eff[i] / N * 100)} %`, err: [{ v: eff[i] / N, m: 'Pour avoir un pourcentage, multiplie par 100.' }] },
        { lab: `Nombre d’élèves ayant au moins ${vals[t]}`, v: ge, d: 0, w: 10, x: `${eff.slice(t).join(' + ')} = ${ge}` },
        { lab: 'Leur fréquence, en %', v: ge / N * 100, d: 1, w: 12, a: fr(ge / N * 100), x: `${ge} ÷ ${N} × 100 = ${fr(ge / N * 100)} %` },
        { lab: 'Pour additionner la ligne B2:B6 au tableur, on écrit', qcm: ['=SOMME(B2:B6)', '=MOYENNE(B2:B6)', '=B2+B6'], ok: 0, x: '=SOMME(B2:B6) additionne toutes les cellules de B2 à B6.' }],
        ['Effectif total = somme des effectifs.', 'Fréquence = effectif ÷ effectif total ; × 100 pour un pourcentage.', 'Pour « au moins », additionne les effectifs de cette note et des notes plus grandes.'],
        table(['Note', ...vals.map(String)], [['Effectif', ...eff.map(String)]]) + AI('effectifs 2, 3, 5 : total 10 ; la note qui a 5 élèves a pour fréquence 5 ÷ 10 = 0,5 = 50 %.'));
    };
    TR.c6e4d = R => {
      const vals = pick(R, [[6, 8, 10, 12, 14], [8, 10, 12, 14, 16], [5, 8, 10, 13, 15], [7, 9, 11, 13, 15]]); let eff, N;
      do { eff = vals.map(() => int(R, 1, 5)); N = sum(eff); } while (N % 2 === 0 || N < 9);
      const S = vals.reduce((a, x, i) => a + x * eff[i], 0), mo = S / N, rg = (N + 1) / 2; let cum = 0, md = vals[0]; for (let i = 0; i < 5; i++) { cum += eff[i]; if (cum >= rg) { md = vals[i]; break; } }
      return Q('Moyenne et médiane d’un tableau', 'Le tableau donne les notes d’un groupe et le nombre d’élèves pour chaque note.', [
        { lab: 'Effectif total', v: N, d: 0, w: 10, x: `${eff.join(' + ')} = ${N}` },
        { lab: 'Somme des notes de tous les élèves (note × effectif)', v: S, d: 0, w: 12, x: vals.map((x, i) => `${x} × ${eff[i]}`).join(' + ') + ` = ${S}`, err: [{ v: sum(vals), m: 'Chaque note compte autant de fois qu’il y a d’élèves qui l’ont obtenue.' }] },
        { lab: 'Moyenne du groupe, au centième', v: mo, d: 2, w: 12, x: `${S} ÷ ${N} ${Number.isInteger(S * 100 / N) ? '=' : '≈'} ${fr(rnd(mo, 2))}`, err: [{ v: rnd(sum(vals) / 5, 2), m: 'Divise par l’effectif total, ' + N + ', pas par 5.' }] },
        { lab: 'Rang de l’élève au milieu (médiane)', v: rg, d: 0, w: 10, x: `${N} élèves : l’élève du milieu est le ${rg}e.` },
        { lab: 'Note médiane', v: md, d: 0, w: 10, x: `Effectifs cumulés : ${vals.map((x, i) => `${x} → ${sum(eff.slice(0, i + 1))}`).join(' ; ')}. Le ${rg}e élève a la note ${md}.`, err: [{ v: vals[2], m: 'Calcule les effectifs cumulés : la médiane n’est pas forcément la note du milieu du tableau.' }] }],
        ['Moyenne = somme (note × effectif) ÷ effectif total.', 'La médiane est la note du ' + rg + 'e élève, quand les élèves sont rangés par note.', 'Pour la trouver, cumule les effectifs de gauche à droite.'],
        table(['Note', ...vals.map(String)], [['Effectif', ...eff.map(String)]]));
    };
  }
})(typeof module !== 'undefined' ? module.exports : window);
