# 1. Egybevágósági transzformációk (ismétlés) (8. osztály)

Ebben a mappában található a 8. osztályos geometria tananyag első leckéje, amely a síkbeli egybevágósági transzformációk tulajdonságait és a koordináta-rendszerben történő tükrözéseket tárgyalja a tankönyv (**OH-MAT08TA**, 50–52. o.) és munkafüzet (**OH-MAT08MA**, 31–33. o.) alapján.

---

## Elérhető Modulok

1. [**CongruenceTransformTheory.tsx**](./CongruenceTransformTheory.tsx)
   - Interaktív koordináta-tükröző laboratórium ($x$ tengely, $y$ tengely, origó és $y = x$ szögfelező).
   - Invariáns tulajdonságok részletes rendszerezése.
   - 4 alapvető egybevágósági transzformáció összehasonlító táblázata.
   - Konstrukciók: háromszögből deltoid (tengelyes tükrözés) és paralelogramma (középpontos tükrözés) előállítása.
   - Lépésről lépésre kidolgozott tankönyvi és munkafüzeti mintapéldák.
   - Letölthető PDF tananyag.

2. [**CongruenceTransformQuiz.tsx**](./CongruenceTransformQuiz.tsx)
   - A közös [QuizTemplate](../QuizTemplate.tsx) alapján felépített 3 szintes gyakorló kvíz (30 feladat).
   - **1. Szint:** Alapfogalmak, távolságtartás, körüljárási irány, fixpontok.
   - **2. Szint:** Tükrözések koordináta-rendszerben és alakzatok vizsgálata.
   - **3. Szint:** Adott pontra tükrözés koordinátaszámítása, háromszögek egybevágósági esetei, összetett feladatok.
   - Puskakártyák (CheatSheet) és Firebase pontszámmentés.

---

## Főbb Ismeretek és Szabályok

### 1. Invariáns Tulajdonságok
- **Távolságtartó:** $|A'B'| = |AB|$
- **Szögtartó:** $\alpha' = \alpha$
- **Egyenestartó:** egyenes képe egyenes
- **Párhuzamosságtartó:** $e \parallel f \implies e' \parallel f'$
- **Területtartó:** $T' = T$

### 2. Tükrözési Szabályok a Koordináta-rendszerben
- **$x$ tengelyre:** $(x; y) \mapsto (x; -y)$
- **$y$ tengelyre:** $(x; y) \mapsto (-x; y)$
- **Origóra:** $(x; y) \mapsto (-x; -y)$
- **$y = x$ szögfelezőre:** $(x; y) \mapsto (y; x)$
- **$K(x_0; y_0)$ középpontra:** $x' = 2x_0 - x, \quad y' = 2y_0 - y$

### 3. Háromszögek Egybevágósági Alapesetei
1. **o - o - o:** Három oldal páronként egyenlő.
2. **o - sz - o:** Két oldal és a közbezárt szög egyenlő.
3. **sz - o - sz:** Egy oldal és a rajta fekvő két szög egyenlő.
4. **d - o - o:** Két oldal és a nagyobbik oldallal szemközti szög egyenlő.
*(Figyelem: sz-sz-sz nem egybevágóság, csak hasonlóság!)*
