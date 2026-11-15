# 11. Gyakorlás, tudáspróba (76. lecke)

## Tananyag Áttekintés
A középiskolai 10. osztályos **IX. Hasonlóság** fejezet átfogó, lezáró tudáspróbája és gyakorló modulja. Magában foglalja az összes korábbi altéma (középpontos nagyítás és kicsinyítés, középpontos hasonlóság, geometriai hozzárendelések, hasonlósági alaptételek, méretarányos tervrajzok, árnyék- és tükörmérés, párhuzamos szelők tétele, a 4 háromszöghasonlósági alapeset, középvonalak és súlypont, magasság- és befogótétel, valamint a térbeli hasonlóság és a Varignon-tétel) elméleti és feladatmegoldási szintézisét.

---

## Modulok és Komponensek

1. **Interaktív SVG ábrák (`SimilarityPracticeExamFigures.tsx`):**
   - `SynthesisConceptMapSvg`: A fejezet átfogó tudásszint-térképe és fogalmi összefüggései.
   - `HexagonTrianglesSimilaritySvg`: Szabályos hatszög átlói által felosztott hasonló részháromszögek.
   - `MirrorReflectionMeasurementSvg`: Közvetett magasságmérés vízszintes tükörrel (optikai szimmetria).
   - `TruncatedPyramidSectionsSvg`: Szabályos gúla síkmetszete és csonkagúla kiegészítése (arányok: $\lambda, \lambda^2, \lambda^3$).
   - `PyraminxSimilaritySvg`: Szabályos tetraéder lapjainak felosztása és területi-térfogati skálázódása.

2. **Interaktív elméleti modul és laboratórium (`SimilarityPracticeExamTheory.tsx`):**
   - 1. Labor: Hasonlósági skálázási szimulátor (oldal, magasság, terület, térfogat valós idejű vizsgálata $\lambda$ függvényében).
   - 2. Labor: 4 tankönyvi témazáró esettanulmány interaktív fülekkel (tükörmódszer, gúlametszet, Pyraminx, Varignon-tétel).
   - Rendszerező elméleti szekciók, aranyszabály és vizsgacsapdák összefoglalója.
   - PDF összefoglaló exportálási lehetőség.

3. **3 szintű párosító játék (`SimilarityPracticeExamMatcher.tsx`):**
   - 1. szint: Fejezeti alapfogalmak és arányok (8 pár).
   - 2. szint: Geometriai számítások és tankönyvi feladatok (8 pár).
   - 3. szint: Tételbizonyítások és emelt szintű összefüggések (8 pár).
   - Összesen 24 feladatpár.

4. **3 szintű csoportosító játék (`SimilarityPracticeExamSorter.tsx`):**
   - 1. szint: Transzformációk és arányszámok (Egybevágóság, Nagyítás, Kicsinyítés).
   - 2. szint: Síkidompárok hasonlósági feltételei (Mindig hasonlóak, Szögfeltétellel hasonlóak, Nem feltétlenül hasonlóak).
   - 3. szint: Geometriai mennyiségek skálázódása ($\lambda, \lambda^2, \lambda^3$).
   - Összesen 27 elem, szintenként 3 kategória.

5. **90 kérdéses fejezeti témazáró kvíz (`SimilarityPracticeExamQuiz.tsx`):**
   - **Szintenként pontosan 30 feladat:**
     - 1. szint (Alapszint): 1–30. kérdés (fogalmi alapok, gyorsfeladványok, alapesetek).
     - 2. szint (Középszint): 31–60. kérdés (számításos feladatok, tankönyvi példák, metrikus tételek).
     - 3. szint (Emelt szint): 61–90. kérdés (összetett tételek, igaz/hamis állítások, térbeli hasonlóság).
   - 3 beépített puskakártya és integrált Wordwall játékmód-váltó (Kvíz / Matcher / Sorter).
