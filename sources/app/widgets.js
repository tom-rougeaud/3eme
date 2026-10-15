/* Maths · 3ème Série Pro — rubrique « Je manipule » : un simulateur par chapitre.
   Tout se calcule dans le navigateur ; rien n’est envoyé ni enregistré. Les graphiques utilisent le même moteur exact que le manuel (MCVP). */
(function () {
  'use strict';
  const M = window.MCVG, P = window.MCVP, fr = M.fr, rnd = M.rnd;
  const slider = (id, lab, min, max, step, val, unit = '') => `<label class="wg-sl"><span>${lab}</span><input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}"><output for="${id}" id="${id}-o"></output>${unit ? `<small>${unit}</small>` : ''}</label>`;
  const box = (title, intro, body) => `<section class="wg"><h2 class="wg-t">🎛️ ${title}</h2><p class="wg-i">${intro}</p>${body}</section>`;
  const defi = (id, txt) => `<p class="wg-defi" id="${id}"><span class="wg-dk">🎯 Défi</span> ${txt} <b class="wg-ok" hidden>✅ Réussi !</b></p>`;
  const setDefi = (el, id, ok) => { const d = el.querySelector('#' + id); if (!d) return; d.classList.toggle('done', !!ok); d.querySelector('.wg-ok').hidden = !ok; };
  const kpi = (lab, val, cls = '') => `<div><small>${lab}</small><b class="${cls}">${val}</b></div>`;
  const val = (el, id) => +el.querySelector('#' + id).value;
  const out = (el, ids, d = {}) => ids.forEach(k => { const o = el.querySelector('#' + k + '-o'); if (o) o.textContent = fr(val(el, k), d[k] == null ? null : d[k]); });
  const RED = P.RED, BLUE = P.BLUE, GRN = P.GRN, ORG = P.ORG;
  const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹', sup = n => String(n).replace('-', '⁻').split('').map(c => c === '⁻' ? c : SUP[c]).join('');
  const W = {};
  const dec = n => { const o = []; let m = n; for (let p = 2; p * p <= m; p++) { let e = 0; while (m % p === 0) { m /= p; e++; } if (e) o.push([p, e]); } if (m > 1) o.push([m, 1]); return o; };

  /* 1 · diviseurs et nombres premiers */
  W.c1 = el => {
    el.innerHTML = box('Les diviseurs d’un nombre', 'Choisis un nombre de cartes : le simulateur cherche tous les rangements en rectangles (les diviseurs) et la décomposition en facteurs premiers.',
      `<div class="wg-grid">${slider('c1-n', 'Nombre de cartes', 2, 240, 1, 36)}</div><div class="wg-svg" id="c1-g"></div><div class="wg-kpis" id="c1-k"></div>${defi('c1-d', 'Trouve un nombre entre <b>100 et 120</b> qui a exactement <b>12 diviseurs</b>.')}`);
    const up = () => {
      out(el, ['c1-n']); const n = val(el, 'c1-n'), ds = []; for (let k = 1; k <= n; k++) if (n % k === 0) ds.push(k);
      const D = dec(n), txt = D.map(([p, e]) => e > 1 ? p + sup(e) : p).join(' × ');
      const cols = ds.find(d => d * d >= n) || n, rows = n / cols, cs = Math.min(22, 560 / cols, 160 / rows);
      let s = ''; for (let i = 0; i < n; i++) s += `<rect x="${20 + (i % cols) * cs}" y="${10 + Math.floor(i / cols) * cs}" width="${cs - 2}" height="${cs - 2}" rx="2" fill="${ds.length === 2 ? '#C2332A' : '#1D5FC2'}" opacity=".75"/>`;
      el.querySelector('#c1-g').innerHTML = `<svg viewBox="0 0 600 ${Math.ceil(20 + rows * cs)}" class="pic"><title>${n} cartes rangées en ${rows} rangées de ${cols}</title>${s}</svg>`;
      el.querySelector('#c1-k').innerHTML = kpi('Diviseurs', ds.join(', ')) + kpi('Nombre de diviseurs', ds.length) + kpi('Décomposition', txt) + kpi('Premier ?', ds.length === 2 ? 'oui' : 'non', ds.length === 2 ? 'hot' : '');
      setDefi(el, 'c1-d', n >= 100 && n <= 120 && ds.length === 12);
    };
    el.addEventListener('input', up); up();
  };

  /* 2 · puissances de 10 : données d’une vidéo */
  W.c2 = el => {
    el.innerHTML = box('Combien de données pour une vidéo ?', 'Choisis la qualité et la durée : le simulateur calcule les données en bits, puis en gigaoctets, avec l’écriture scientifique.',
      `<div class="wg-grid">${slider('c2-d', 'Débit', 1, 25, 1, 5, 'Mbit/s')}${slider('c2-t', 'Durée', 1, 240, 1, 22, 'min')}</div><div class="wg-kpis" id="c2-k"></div>${defi('c2-x', 'Trouve une durée qui donne environ <b>1 Go</b> (à 0,05 Go près) avec un débit de 5 Mbit/s.')}`);
    const sci = x => { const e = Math.floor(Math.log10(x)); return `${fr(rnd(x / 10 ** e, 2))} × 10${sup(e)}`; };
    const up = () => { out(el, ['c2-d', 'c2-t']); const d = val(el, 'c2-d'), t = val(el, 'c2-t'), bits = d * 1e6 * t * 60, go = bits / 8 / 1e9;
      el.querySelector('#c2-k').innerHTML = kpi('Durée en secondes', fr(t * 60) + ' s') + kpi('Bits', sci(bits)) + kpi('Octets', sci(bits / 8)) + kpi('Gigaoctets', fr(rnd(go, 2)) + ' Go', 'hot');
      setDefi(el, 'c2-x', d === 5 && Math.abs(go - 1) <= .05); };
    el.addEventListener('input', up); up();
  };

  /* 3 · la balance des équations */
  W.c3 = el => {
    el.innerHTML = box('La balance des équations', 'Règle l’équation ax + b = cx + d. Le simulateur la résout pas à pas.',
      `<div class="wg-grid">${slider('c3-a', 'a', 1, 12, 1, 5)}${slider('c3-b', 'b', -20, 20, 1, -7)}${slider('c3-c', 'c', 0, 11, 1, 2)}${slider('c3-d', 'd', -20, 30, 1, 8)}</div><div class="wg-steps" id="c3-s"></div>${defi('c3-x', 'Règle les curseurs pour que la solution soit <b>x = 4</b>, avec a différent de 4.')}`);
    const sg = n => n < 0 ? '− ' + fr(-n) : '+ ' + fr(n), rel = n => n < 0 ? '−' + fr(-n) : fr(n);
    const up = () => { out(el, ['c3-a', 'c3-b', 'c3-c', 'c3-d']); const a = val(el, 'c3-a'), b = val(el, 'c3-b'), c = val(el, 'c3-c'), d = val(el, 'c3-d');
      let h = `<p><b>${a}x ${sg(b)} = ${c}x ${sg(d)}</b></p>`, ok = false;
      if (a === c) h += `<p>Les x s’éliminent : ${rel(b)} = ${rel(d)} est ${b === d ? 'toujours vraie' : 'fausse : pas de solution'}.</p>`;
      else { const x = (d - b) / (a - c); h += `<p>J’enlève ${c}x : ${a - c}x ${sg(b)} = ${rel(d)}</p><p>J’enlève ${rel(b)} : ${a - c}x = ${rel(d - b)}</p><p>Je divise par ${a - c} : <b>x = ${fr(rnd(x, 3))}</b></p><p class="small">Vérification : ${a} × ${fr(rnd(x, 3))} ${sg(b)} = ${fr(rnd(a * x + b, 3))} et ${c} × ${fr(rnd(x, 3))} ${sg(d)} = ${fr(rnd(c * x + d, 3))}</p>`; ok = Math.abs(x - 4) < 1e-9 && a !== 4; }
      el.querySelector('#c3-s').innerHTML = h; setDefi(el, 'c3-x', ok); };
    el.addEventListener('input', up); up();
  };

  /* 4 · hausses et baisses */
  W.c4 = el => {
    el.innerHTML = box('Hausses et baisses', 'Choisis un prix et un pourcentage d’évolution : le coefficient multiplicateur fait le calcul en une fois.',
      `<div class="wg-grid">${slider('c4-p', 'Prix de départ', 1, 100, .01, 5.99, '€')}${slider('c4-t', 'Évolution', -50, 60, .1, 10, '%')}</div><div class="wg-svg" id="c4-g"></div><div class="wg-kpis" id="c4-k"></div>${defi('c4-x', 'Retrouve la hausse Netflix d’avril 2025 : de <b>5,99 €</b> à <b>7,99 €</b> (à 0,01 € près).')}`);
    const up = () => { out(el, ['c4-p', 'c4-t'], { 'c4-p': 2, 'c4-t': 1 }); const p = val(el, 'c4-p'), t = val(el, 'c4-t'), k = 1 + t / 100, q = p * k, m = Math.max(p, q) * 1.15;
      const bar = (x, v, c, lab) => `<rect x="${x}" y="${200 - v / m * 180}" width="120" height="${v / m * 180}" rx="6" fill="${c}"/><text x="${x + 60}" y="${192 - v / m * 180}" text-anchor="middle" font-weight="800" font-size="16" class="tx">${lab}</text>`;
      el.querySelector('#c4-g').innerHTML = `<svg viewBox="0 0 600 210" class="pic"><title>Prix avant et après</title>${bar(120, p, '#9DB8E8', fr(rnd(p, 2), 2) + ' €')}${bar(360, q, t >= 0 ? '#E07A2E' : '#2E9D5B', fr(rnd(q, 2), 2) + ' €')}<text x="300" y="120" text-anchor="middle" font-size="18" font-weight="800" class="tx">× ${fr(rnd(k, 4))}</text></svg>`;
      el.querySelector('#c4-k').innerHTML = kpi('Coefficient', '× ' + fr(rnd(k, 4))) + kpi('Nouveau prix', fr(rnd(q, 2), 2) + ' €', 'hot') + kpi('Variation', (q >= p ? '+ ' : '− ') + fr(rnd(Math.abs(q - p), 2), 2) + ' €');
      setDefi(el, 'c4-x', Math.abs(p - 5.99) < .005 && Math.abs(q - 7.99) <= .01); };
    el.addEventListener('input', up); up();
  };

  /* 5 · deux formules : droites et intersection */
  W.c5 = el => {
    el.innerHTML = box('Deux formules de cinéma', 'Sans carte : f(x) = 11x. Avec une carte : g(x) = ax + b. Règle la carte et lis le point d’intersection.',
      `<div class="wg-grid">${slider('c5-a', 'Prix par séance avec la carte, a', 1, 10, .5, 5, '€')}${slider('c5-b', 'Prix de la carte, b', 0, 60, 1, 30, '€')}</div><div class="wg-svg" id="c5-g"></div><div class="wg-kpis" id="c5-k"></div>${defi('c5-x', 'Règle la carte pour que les deux formules coûtent le même prix pour <b>4 séances</b>.')}`);
    const up = () => { out(el, ['c5-a', 'c5-b'], { 'c5-a': 1 }); const a = val(el, 'c5-a'), b = val(el, 'c5-b'), X = b / (11 - a);
      const g = P.plot({ W: 600, H: 260, x: [0, 12, 1], y: [0, 140, 20], ml: 46, mt: 14, xl: 'séances', yl: 'prix (€)', lab: 'Deux droites' });
      el.querySelector('#c5-g').innerHTML = g.wrap(g.base + g.line(11, 0, { stroke: BLUE, w: 3 }) + g.line(a, b, { stroke: RED, w: 3 }) + (X >= 0 && X <= 12 ? g.guide(X, 11 * X) + g.dot(X, 11 * X, { lab: '(' + fr(rnd(X, 2)) + ' ; ' + fr(rnd(11 * X, 2)) + ')' }) : ''));
      el.querySelector('#c5-k').innerHTML = kpi('Intersection', 'x ≈ ' + fr(rnd(X, 2))) + kpi('Dès … séances, la carte gagne', String(Math.floor(X) + 1), 'hot') + kpi('g(10)', fr(rnd(a * 10 + b, 2)) + ' €');
      setDefi(el, 'c5-x', Math.abs(X - 4) < 1e-9); };
    el.addEventListener('input', up); up();
  };

  /* 6 · moyenne, médiane, étendue */
  W.c6 = el => {
    el.innerHTML = box('Résumer une série', 'Écris des valeurs séparées par des points-virgules. Le simulateur trace le diagramme et calcule les indicateurs.',
      `<label class="wg-sl wg-wide"><span>Valeurs</span><input type="text" id="c6-v" value="13 ; 22 ; 24 ; 22 ; 22 ; 25 ; 25 ; 25 ; 25 ; 23" inputmode="decimal"></label><div class="wg-svg" id="c6-g"></div><div class="wg-kpis" id="c6-k"></div>${defi('c6-x', 'Écris 5 valeurs de moyenne <b>10</b> et de médiane <b>8</b>.')}`);
    const up = () => { const v = el.querySelector('#c6-v').value.split(/[;\n]/).map(s => M.parse(s)).filter(Number.isFinite);
      if (!v.length) { el.querySelector('#c6-k').innerHTML = kpi('Valeurs', 'aucune'); return; }
      const s = v.slice().sort((a, b) => a - b), n = s.length, moy = v.reduce((a, b) => a + b, 0) / n, med = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2, mx = Math.max(...v), mn = Math.min(...v), top = Math.max(1, mx) * 1.15;
      const w = Math.min(50, 560 / n);
      let b = v.map((x, i) => `<rect x="${30 + i * w}" y="${200 - Math.max(0, x) / top * 180}" width="${w - 4}" height="${Math.max(0, x) / top * 180}" rx="3" fill="#9DB8E8"/>`).join('');
      b += `<line x1="26" x2="${30 + n * w}" y1="${200 - moy / top * 180}" y2="${200 - moy / top * 180}" stroke="${RED}" stroke-width="3" stroke-dasharray="7 5"/><text x="${34 + n * w}" y="${204 - moy / top * 180}" font-size="14" font-weight="800" fill="${RED}">moyenne</text>`;
      el.querySelector('#c6-g').innerHTML = `<svg viewBox="0 0 600 210" class="pic"><title>Diagramme des valeurs et ligne de la moyenne</title>${b}</svg>`;
      el.querySelector('#c6-k').innerHTML = kpi('Effectif', n) + kpi('Moyenne', fr(rnd(moy, 2)), 'hot') + kpi('Médiane', fr(rnd(med, 2))) + kpi('Étendue', fr(rnd(mx - mn, 2)));
      setDefi(el, 'c6-x', n === 5 && Math.abs(moy - 10) < 1e-9 && Math.abs(med - 8) < 1e-9); };
    el.addEventListener('input', up); up();
  };

  /* 7 · simuler des lancers de dé */
  W.c7 = el => {
    el.innerHTML = box('Simuler des lancers', 'Choisis le dé, le seuil de réussite et le nombre de lancers. Compare la fréquence obtenue à la probabilité.',
      `<div class="wg-grid">${slider('c7-f', 'Faces du dé', 4, 20, 2, 20)}${slider('c7-s', 'Réussite si au moins', 1, 20, 1, 15)}${slider('c7-n', 'Nombre de lancers', 10, 5000, 10, 100)}</div><p><button class="btn sm" id="c7-go">🎲 Relancer</button></p><div class="wg-svg" id="c7-g"></div><div class="wg-kpis" id="c7-k"></div>${defi('c7-x', 'Avec au moins <b>2 000</b> lancers, obtiens une fréquence à <b>0,01</b> près de la probabilité.')}`);
    const up = () => { out(el, ['c7-f', 'c7-s', 'c7-n']); const f = val(el, 'c7-f'), s = Math.min(val(el, 'c7-s'), f), n = val(el, 'c7-n'), p = (f - s + 1) / f;
      let ok = 0; const pts = []; const step = Math.max(1, Math.floor(n / 120));
      for (let i = 1; i <= n; i++) { if (1 + Math.floor(Math.random() * f) >= s) ok++; if (i % step === 0) pts.push([i, ok / i]); }
      const g = P.plot({ W: 600, H: 240, x: [0, n, n / 5], y: [0, 1, .2], ml: 46, mt: 14, xl: 'lancers', yl: 'fréquence', lab: 'Fréquence de réussite' });
      el.querySelector('#c7-g').innerHTML = g.wrap(g.base + g.seg(0, p, n, p, { stroke: RED, dash: '8 5', w: 2.4 }) + `<path d="${pts.map(([x, y], i) => (i ? 'L' : 'M') + g.X(x).toFixed(1) + ' ' + g.Y(y).toFixed(1)).join('')}" fill="none" stroke="${BLUE}" stroke-width="2.4"/>`);
      el.querySelector('#c7-k').innerHTML = kpi('Probabilité', `${f - s + 1}/${f} ≈ ${fr(rnd(p, 3))}`) + kpi('Réussites', ok) + kpi('Fréquence', fr(rnd(ok / n, 3)), 'hot') + kpi('Écart', fr(rnd(Math.abs(ok / n - p), 3)));
      setDefi(el, 'c7-x', n >= 2000 && Math.abs(ok / n - p) <= .01); };
    el.addEventListener('input', up); el.querySelector('#c7-go').addEventListener('click', up); up();
  };

  /* 8 · le triangle rectangle */
  W.c8 = el => {
    el.innerHTML = box('Le triangle rectangle', 'Règle la distance au sol et la hauteur : le simulateur calcule l’hypoténuse (Pythagore) et l’angle (tangente).',
      `<div class="wg-grid">${slider('c8-a', 'Distance au sol (adjacent)', 1, 40, .1, 25, 'm')}${slider('c8-o', 'Hauteur (opposé)', 1, 30, .1, 19.7, 'm')}</div><div class="wg-svg" id="c8-g"></div><div class="wg-kpis" id="c8-k"></div>${defi('c8-x', 'Avec la hauteur de la statue, <b>19,7 m</b>, trouve la distance qui donne un angle de <b>45°</b>.')}`);
    const up = () => { out(el, ['c8-a', 'c8-o'], { 'c8-a': 1, 'c8-o': 1 }); const a = val(el, 'c8-a'), o = val(el, 'c8-o'), h = Math.hypot(a, o), ang = Math.atan(o / a) * 180 / Math.PI, k = Math.min(500 / a, 170 / o);
      el.querySelector('#c8-g').innerHTML = `<svg viewBox="0 0 600 210" class="pic"><title>Triangle rectangle</title><path d="M50 195L${50 + a * k} 195L${50 + a * k} ${195 - o * k}Z" fill="#DCEFFA" stroke="#0E6BA8" stroke-width="3"/><path d="M${36 + a * k} 195v-14h14" fill="none" stroke="#0E6BA8" stroke-width="2"/><text x="${50 + a * k / 2}" y="208" text-anchor="middle" font-size="14" font-weight="800" class="tx">${fr(a)} m</text><text x="${44 + a * k}" y="${195 - o * k / 2}" text-anchor="end" font-size="14" font-weight="800" class="tx">${fr(o)} m</text><text x="96" y="186" font-size="14" font-weight="800" fill="${RED}">${fr(rnd(ang, 1))}°</text></svg>`;
      el.querySelector('#c8-k').innerHTML = kpi('Hypoténuse', fr(rnd(h, 2)) + ' m') + kpi('tan', fr(rnd(o / a, 3))) + kpi('Angle', fr(rnd(ang, 1)) + '°', 'hot');
      setDefi(el, 'c8-x', Math.abs(o - 19.7) < .05 && Math.abs(ang - 45) < .2); };
    el.addEventListener('input', up); up();
  };

  /* 9 · agrandir ou réduire : k, k², k³ */
  W.c9 = el => {
    el.innerHTML = box('Agrandir ou réduire', 'Choisis le rapport k : les longueurs sont multipliées par k, les aires par k², les volumes par k³.',
      `<div class="wg-grid">${slider('c9-k', 'Rapport k', .2, 3, .1, 2)}</div><div class="wg-svg" id="c9-g"></div><div class="wg-kpis" id="c9-k2"></div>${defi('c9-x', 'Trouve k pour que le volume soit multiplié par <b>8</b>.')}`);
    const up = () => { out(el, ['c9-k'], { 'c9-k': 1 }); const k = val(el, 'c9-k'), s0 = 50, s1 = s0 * k;
      const cube = (x, s, c) => `<path d="M${x} ${200 - s}h${s}v${s}h-${s}z" fill="${c}" stroke="#08767C" stroke-width="2"/><path d="M${x} ${200 - s}l${s * .4} ${-s * .3}h${s}l${-s * .4} ${s * .3}zM${x + s} ${200}l${s * .4} ${-s * .3}v${-s}l${-s * .4} ${s * .3}z" fill="${c}" stroke="#08767C" stroke-width="2" opacity=".8"/>`;
      el.querySelector('#c9-g').innerHTML = `<svg viewBox="0 0 600 210" class="pic"><title>Un cube et son agrandissement</title>${cube(60, s0, '#D6F2F2')}${cube(260, Math.min(s1, 150), '#9EDCDC')}</svg>`;
      el.querySelector('#c9-k2').innerHTML = kpi('Longueurs', '× ' + fr(rnd(k, 2))) + kpi('Aires', '× ' + fr(rnd(k * k, 3))) + kpi('Volumes', '× ' + fr(rnd(k ** 3, 3)), 'hot');
      setDefi(el, 'c9-x', Math.abs(k ** 3 - 8) < 1e-6); };
    el.addEventListener('input', up); up();
  };

  /* 10 · le lutin trace un polygone */
  W.c10 = el => {
    el.innerHTML = box('Le lutin trace un polygone', 'Choisis le nombre de côtés et leur longueur : « répéter n fois : avancer, tourner de 360 ÷ n degrés ».',
      `<div class="wg-grid">${slider('c10-n', 'Nombre de côtés n', 3, 12, 1, 6)}${slider('c10-l', 'Longueur d’un côté', 10, 80, 5, 50, 'pas')}</div><div class="wg-svg" id="c10-g"></div><div class="wg-kpis" id="c10-k"></div>${defi('c10-x', 'Trace un polygone de périmètre <b>400 pas</b> qui tourne de <b>45°</b> à chaque coin.')}`);
    const up = () => { out(el, ['c10-n', 'c10-l']); const n = val(el, 'c10-n'), L = val(el, 'c10-l'), a = 360 / n; let x = 300 - L / 2, y = 190, th = 0, d = `M${x} ${y}`;
      for (let i = 0; i < n; i++) { x += L * 1.2 * Math.cos(th * Math.PI / 180); y -= L * 1.2 * Math.sin(th * Math.PI / 180); d += `L${x.toFixed(1)} ${y.toFixed(1)}`; th += a; }
      el.querySelector('#c10-g').innerHTML = `<svg viewBox="0 0 600 210" class="pic"><title>Polygone régulier à ${n} côtés</title><path d="${d}" fill="#DCEFFA" stroke="#0E6BA8" stroke-width="3"/></svg><pre class="wg-code">quand ⚑ est cliqué\nstylo en position d’écriture\nrépéter ${n} fois\n   avancer de ${L} pas\n   tourner de ${fr(rnd(a, 2))} degrés</pre>`;
      el.querySelector('#c10-k').innerHTML = kpi('Angle de rotation', fr(rnd(a, 2)) + '°') + kpi('Périmètre', n * L + ' pas', 'hot') + kpi('Angle intérieur', fr(rnd(180 - a, 2)) + '°');
      setDefi(el, 'c10-x', n === 8 && n * L === 400); };
    el.addEventListener('input', up); up();
  };

  window.MCVW = W;
})();
