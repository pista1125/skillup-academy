# 6. Alkalmazzuk a hasonlóságot! (71. lecke)

## Tananyag Áttekintés
Közvetett magasság- és távolságmérési eljárások hasonlóság segítségével: Thálész árnyékmódszere a párhuzamos napsugarakkal, síktükrös magasságmérés a talajon az $\alpha = \alpha$ fényvisszaverődéssel, Thálész tengerparti kitűzési eljárása hajók távolságának meghatározására, folyómélység és egyenletes mederlejtés arányai, az A4-es papírlap és a margó-csapda hivatalos érettségi cáfolata, valamint a biometrikus skálázódás törvényei („Ki a legerősebb?” – Hangya vs. Ember, izomerő $\sim \lambda^2$, tömeg $\sim \lambda^3$, relatív erő $\sim 1/\lambda$).

---

## Fő Módszerek és Összefüggések

- **Árnyékmódszer (Párhuzamos napsugarak elve):**
  - $\frac{M}{m} = \frac{A}{a} \implies M = m \cdot \frac{A}{a}$.
  - Péter ($1{,}6\text{ m}$) és a fa esete: fa teljes árnyéka $4{,}5 + 1{,}2 = 5{,}7\text{ m}$, Péter árnyéka $1{,}2\text{ m} \implies M_{\text{fa}} = 1{,}6 \cdot \frac{5{,}7}{1{,}2} = 7{,}6\text{ méter}$.

- **Síktükrös magasságmérés a talajon:**
  - Fényvisszaverődés törvénye: beesési szög = visszaverődési szög ($\alpha = \alpha$).
  - Két derékszögű hasonló háromszög: $\frac{M}{m_{\text{szem}}} = \frac{D}{d} \implies M = m_{\text{szem}} \cdot \frac{D}{d}$.
  - Szemmagasság: utólag mindig hozzá kell adni, ha a műszert szemmagasságba emeljük!

- **Thálész hajótávolság-mérése a tengerparton (120. oldal):**
  - Part menti kitűzés ($AB = b, BC = c$), merőleges szárazföldi séta ($CD = d$).
  - $\triangle ABH \sim \triangle CBD \implies \frac{t + a}{b} = \frac{d}{c} \implies t = \frac{d \cdot b}{c} - a$.

- **Az A4-es lap és a margó-csapda (Érettségi feladat, 118. oldal):**
  - A4 lap: $21\text{ cm} \times 29{,}7\text{ cm}$, oldalarány $\approx 1{,}414$ ($\sqrt{2}$).
  - $2{,}5\text{ cm}$ margó után: $16\text{ cm} \times 24{,}7\text{ cm}$, oldalarány $24{,}7 / 16 \approx 1{,}544$.
  - **A belső téglalap NEM hasonló az A4-es laphoz!**
  - Logikai tanulság: „Hasonló $\implies$ szögeik egyenlők” IGAZ, de a megfordítása: „Szögeik egyenlők $\implies$ hasonlók” négyszögekre **HAMIS**!

- **Biometrikus skálázódás („Ki a legerősebb?”, 121. oldal):**
  - Abszolút izomerő: izomrostok keresztmetszetével arányos $\implies \lambda^2$.
  - Testtömeg: térfogattal arányos $\implies \lambda^3$.
  - Relatív teherbírás: $\frac{\text{Erő}}{\text{Tömeg}} = \frac{\lambda^2}{\lambda^3} = \frac{1}{\lambda}$.
  - A méret csökkenésével a relatív erő ugrásszerűen nő: a hangyaméretű ember ($1/120$) saját tömege 120-szorosát bírná el!

---

## Elkészült Komponensek és Források

A tananyag és a feladatok a hivatalos **OH-MAT10TA/II** tankönyv 71. leckéjének (118–121. oldal) és az **OH-SNE-MAT10M-2** munkafüzetnek a feldolgozásával készültek:

1. **`PracticalSimilarityFigures.tsx`**:
   - `ShadowMeasurementSvg`: Árnyékmérés a terepen (Péter $1{,}6\text{ m}$ és fa $7{,}6\text{ m}$, párhuzamos napsugarak, $1{,}2\text{ m}$ és $5{,}7\text{ m}$ árnyékhossz).
   - `MirrorHeightSvg`: Síktükrös magasságmérés a talajon (szemmagasság, tükör távolság, torony magassága, beesési és visszaverődési fénysugarak $\alpha = \alpha$).
   - `ThalesShipDistanceSvg`: Thálész tengerparti hajótávolság-mérési eljárása ($\triangle ABH \sim \triangle CBD$ kitűzési pontokkal és formulával).
   - `MarginSimilarityCounterSvg`: Margó-cáfolat A4-es papíron ($21 \times 29{,}7\text{ cm}$ vs. $16 \times 24{,}7\text{ cm}$, oldalarányok összevetése: $\sqrt{2} \approx 1{,}414 \neq 1{,}544$).
   - `BiometricScalingSvg`: Hangya vs. Ember relatív erő skálázási diagramja (Izomkeresztmetszet $\lambda^2$ vs. Tömeg $\lambda^3$, relatív teherbírás $\sim 1/\lambda$).

2. **`PracticalSimilarityTheory.tsx`**:
   - **Laboratórium I:** Közvetett Terepi Magasságmérés Szimulátor (Árnyékmódszer vagy Síktükör választás, interaktív paramétercsúszkák, dinamikus sugarak és valós idejű magasság-számítás).
   - **Laboratórium II:** Tankönyvi Alkalmazási Mátrix (5 hivatalos tankönyvi feladat: Péter és a fa, A4 margó-cáfolat, Folyómélység lejtése, Thálész hajómérése, Hangya biometria).
   - 6 részletes fejezet, érettségi buktatók (`TheoryTrapBox`), terepi aranyszabályok (`quickRule`) és PDF export.

3. **`PracticalSimilarityMatcher.tsx`**:
   - 3 nehézségi szint $\times$ 8 pár = **24 kártyapár** (mérési módszerek, tankönyvi feladatok, biometria és érettségi logika).

4. **`PracticalSimilaritySorter.tsx`**:
   - 3 szintű csoportosító játék:
     - 1. szint: Közvetett mérési módszerek (Árnyékmódszer, Tükörmódszer, Thálész-kitűzés).
     - 2. szint: Biológiai és fizikai skálázódás kitevői ($\lambda^1, \lambda^2, \lambda^3$).
     - 3. szint: Állítások igazságtartalma hasonlóság alkalmazásakor (Mindig igaz, Feltételes, Hamis).

5. **`PracticalSimilarityQuiz.tsx`**:
   - 3 nehézségi szint $\times$ 10 feladat = **30 válogatott feladat** részletes magyarázatokkal a tankönyvi terepi mérési feladatok és biometriai modellek alapján.
   - 3 beépített CheatSheet kártya és közvetlen játékmód-váltás.
