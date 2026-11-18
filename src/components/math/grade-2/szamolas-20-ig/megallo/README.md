# 7. Megálló – tudáspróba (2. osztály, I. Számolás 0-tól 20-ig)

Az I. témakör (1–6. lecke) záró összefoglaló leckéje és 90 kérdéses tudáspróbája.

## Források

- **Tankönyv (OH-MAT02TA_I):** *Megálló* 20–21. o., *Kitekintő* 22–23. o., valamint a teljes I. témakör (4–19. o.).
- **Munkafüzet I. (OH-MAT02MA_I):** a teljes 0-tól 20-ig tartó témakör (3–15. o.).

## Mit tartalmaznak a tankönyvi oldalak?

- **TK 20. o.:** négyféle számcsoport (egyjegyű/kétjegyű × páros/páratlan) színezéssel; három dobókocka összege; számolási szabály szerinti sorozatok.
- **TK 21. o.:** szöveges művelet- és számszomszéd-találós kérdések sportmezeken; műveletek párosítása célértékekhez (6, 9, 16, 19); négyemeletes számpiramisok és állítások (*egyik sem, van köztük, mindegyik*).
- **TK 22–23. o. (Kitekintő):** 1–20 társasjáték-ösvény dobókockával; 4 szám összege 17; bűvös háromszög; sugaras számpárkerék (6 és 12); négyzetrács másolása és színezése.

## Mit csinál a DiákZóna lecke?

Saját helyzetekkel és számokkal, szigorúan 0 és 20 között gyakoroljuk az egész témakört:

- **Elmélet:** „Amit már tudsz” összefoglaló táblázat (1–6. lecke), négy számcsoport térképe, tízesátlépés 20-as kerettel és számegyenessel, négyemeletes számpiramis, számpárkerék 12-höz, társasjáték-ösvény 1–20, szalagmodell a fordított összehasonlításhoz és csapdakártya.
- **Labor I – Vegyes feladatgenerátor (0–20):** 6 feladattípus (szomszédok, pótlás 10-re, összeadás 20-ig, kivonás 20-ig, kétjegyű − kétjegyű, műveletlánc), „Ellenőrzés” és „Új feladat” gombokkal, tipikus hibára reagáló visszajelzéssel.
- **Labor II – Számpiramis-építő (0–20):** véletlen háromemeletes piramisok (alulról felfelé és vegyes pótlás), azonnali ellenőrzéssel.
- **Kvíz:** 90 kérdés (30 / 30 / 30 a három szinten), 60 ábrás feladattal, típusjelvénnyel és 3 puskakártyával.
- **Párosító:** 3 szint × 8 pár képes és szöveges feladatokkal.
- **Csoportosító:** 3 szint × 3 kategória × 9 elem képes és számolós kártyákkal.

## Komponensek

- `Count20ExamG2Parts.tsx`: közös SVG rajzelemek és a két labor feladatgenerátorai (`makeExamG2Task`, `makePyramidG2Task`)
- `Count20ExamG2Figures.tsx`: `Count20ClassificationMapSvg`, `Count20BridgingFrameSvg`, `Count20PyramidSvg`, `Count20RadialWheelSvg`, `Count20GamePathSvg`, `Count20StripRecapSvg`
- `Count20ExamG2CardFigures.tsx`: mini kártyaábrák a Párosító (150×80) és Csoportosító (80×80) játékhoz
- `Count20ExamG2Theory.tsx`: `Count20ExamG2Theory`
- `Count20ExamG2Quiz.tsx`: `Count20ExamG2Quiz`, `COUNT20_EXAM_G2_QUESTIONS` (`g2-c20-tudasproba-quiz`)
- `Count20ExamG2Matcher.tsx`: `Count20ExamG2Matcher`, `COUNT20_EXAM_G2_MATCHER_LEVELS` (`g2-c20-tudasproba-matcher`)
- `Count20ExamG2Sorter.tsx`: `Count20ExamG2Sorter`, `COUNT20_EXAM_G2_SORTER_LEVELS` (`g2-c20-tudasproba-sorter`)

Teszt: `src/test/grade2Topic1Count20ExamG2.test.tsx`

## Eltérések a tankönyvtől

1. **A 20-as számkör túllépése a sorozatokban (TK 20/3., MF I 14/3.):** A tankönyv 20. oldalán két sorozat (3, 6, 9, ..., 21 és 0, 4, 8, ..., 20, 24) átlépi a 20-at (ahogy a munkafüzet 14/3. feladatának 21-ről induló sorozatai is). A DiákZóna minden feladatában valamennyi szám és részeredmény szigorúan **0 és 20 között** marad.
2. **Számpárok sorrendje a keréken (TK 23/1.):** A tankönyv megkérdezi, hány különböző párt találtunk a 6-os és a 12-es számpárkeréken (4 és 7 vonal látható), de nem írja le kifejezetten, hogy a tagok sorrendje nem számít. A DiákZóna ábráján és a kvízben egyértelműen kimondjuk: az 1 + 5 és az 5 + 1 ugyanannak a párnak számít.
3. **A 0 szerepe a nyitott mondatokban (TK 10/4., MF I 15/2.):** A nyitott mondatoknál egyértelműen jelezzük, hogy 0-tól 20-ig a **0** is érvényes megoldás (például a □ + 4 < 8 egyenlőtlenségnél a 0, 1, 2, 3 számok jók).
4. **Didaktikai változtatások és saját helyzetek:** A fordított összehasonlítási csapdát (például „6-tal többet, mint...”) szalagmodellel és külön csapdakártyával szemléltetjük. Minden műveletlánc minden nyila fölött szerepel a pontos művelet, és a könyv szereplői helyett saját, egyértelműen számlálható ábrákat és élethelyzeteket készítettünk.
