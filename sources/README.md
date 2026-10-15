# Sources de « 3ème Série Pro » (manuel PDF + appli)

Ces fichiers fabriquent le manuel de mathématiques de 3e Prépa-Métiers (version élève et version professeur), les PDF par chapitre, les trois sujets blancs du brevet série professionnelle et l’appli publiée dans le dépôt `3eme`.
Programme : cycle 4 (arrêté du 17 juillet 2020, BO n° 31 du 30 juillet 2020), attendus de fin de 3e ; épreuve de mathématiques du brevet, série professionnelle (note de service du 2 septembre 2025, BO n° 33 du 4 septembre 2025).
Tous les résultats sont calculés et contrôlés par programme (`chk`) : une erreur de calcul arrête la construction.

## Organisation
- `content/` : les 10 chapitres (`c1.js` … `c10.js`), le glossaire visuel (`gl_c1.js` … `gl_c10.js`), les évaluations sur 20 (`evals3.js`), les trois sujets blancs (`dnb3.js`), « Ce que tu sais déjà » (`pont3.js`), les métiers (`metiers3.js`), les dessins et les données réelles (`sk3.js`, `kit3e.js`), les corrigés détaillés de la version professeur (`det3.js`) ; `index.js` charge et vérifie le tout.
- `shared/` : `train.js` (moteur des exercices), `t1.js` … `t10.js` (documents de départ et exercices à support visuel, communs au manuel et à l’appli), `auto3.js` (automatismes du brevet).
- `lib/` : scènes au trait (`scenes3e.js`), pagination A4 (`paginate.js`), couverture, QR codes, KaTeX.
- `app/` : l’appli (`app3.js`, `app3.css`, `widgets.js` pour les simulateurs « Je manipule »).
- `style/` : charte du manuel et polices embarquées. `notice/` : la notice d’installation.

## Une notion, une page
🔎 Je découvre → 🧭 La méthode (étapes numérotées, reprises sur le dessin) → ✅ La solution → 📌 Je retiens et ⚠️ Attention → ✏️ À moi. La page « ✅ Je fais le point » de chaque chapitre porte le bilan et 10 automatismes du brevet.

## Construire
Prérequis : Node.js 18 ou plus, Python 3 avec `playwright` et `pypdf`, un Chromium ; `npm install` (KaTeX).

```
node test-train.js                     # documents de départ, exercices visuels et automatismes (60 000 + 150 000 tirages)
node lint3.js                          # contrôles pédagogiques (phrases, consignes, mots interdits, barèmes, supports)
python3 make3.py                       # manuel élève + professeur + PDF par chapitre + sujets blancs → build/
node build-app3.js ../index.html       # l’appli en un seul fichier
python3 test-app3.py "$PWD/../index.html"   # test de bout en bout (ordinateur et téléphone)
```

La version professeur (`build/maths-3e-serie-pro-professeur.pdf`) n’est pas publiée.

Données réelles : Wikipédia (épisodes des Simpson, statue de l’Unicorn Gundam), Shueisha (One Piece), The Pokémon Company, JeChange et centre d’aide Netflix, CNC (fréquentation 2025), IFAB (lois du jeu). Les entreprises, clubs et jeux des exercices sont fictifs et signalés comme tels.

Tom Rougeaud · licence CC BY-NC 4.0.
