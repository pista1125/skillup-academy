# 17. Gyakorlás, tudáspróba (81. lecke, 260–261. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 260–261. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a VI. Koordinátageometria fejezet **17.**, fejezetzáró leckéje.

---

## 🎯 Tananyag Áttekintés

A fejezet összefoglalása és érettségi típusú feladatok: vektorok (összeadás, kivonás, számszoros, felbontás, koordináták, elforgatás), két pont távolsága, felezőpont, súlypont, az egyenes egyenlete, meredeksége és irányszöge, párhuzamosság és merőlegesség, metszéspont, a kör egyenlete, pont és kör, kör és egyenes közös pontjai, érintő, Thalész-kör. A tankönyv öt érettségi feladatot és két tudáspróbát (I. és II.) tartalmaz.

### Érettségi feladatok (ellenőrzött eredmények)
- **1. (2011)** e: 5x − 2y = −14,5, f: 2x + 5y = 14,5: P(−1,5; 3,5); m(e) · m(f) = 2,5 · (−0,4) = −1, tehát merőlegesek; e és az x tengely szöge ≈ 68,2°.
- **2. (2012)** A(−2; −1), B(9; −3), C(−3; 6): BC: 3x + 4y = 15; a BC-vel párhuzamos középvonal 7,5; γ = 45°.
- **3. (2010)** A kör az (1; 0) és (7; 0) pontban metszi az x tengelyt, középpontja az y = x egyenesen: K(4; 4) (r = 5).
- **4. (2007)** e: 4x + 3y = −11: P(100; −36) nincs rajta, Q(−83; 107); AB átmérőjű kör (A(−5; 3), B(1; −5)): (x + 2)² + (y + 1)² = 25, S(1; 3) rajta van.
- **5. (2015)** |→AB + →AC| = 5, |→AB − →AC| = 5√3 ≈ 8,66; PRST rombusz, K(4; −3), T(7; 1): R(1; −7), P(−4; 3), S(12; −9) (vagy P és S felcserélve).

### Tudáspróbák
- **I.** →a + 4→c = (3; 10); ½→b elforgatottjai (−3; −1,5), (3; 1,5); BC felezőpontja (−1,25; 3,75); AB: x + 2y = 9; c = 13/3; y = 5x + 39; c = 1,6; (0; 3,5); e ∩ f = (5; 16); →AB(−3; −4), BC: x = −2, A a körön; (x + 2)² + (y − 6)² = 16; (x − 1)² + (y + 3)² = 1; rombusz: BD: 4x − 5y = 25, B(−5; −9), D(15; 7), oldal √205 ≈ 14,32.
- **II.** →a + 6→c = (−2; 14); ½→a elforgatottjai (−2; 1), (2; −1); k = 1; y = 6x − 32; k = 8/3; (−11/3; 0); e ∩ f = (3; 5); →PR(−3; −2), PQ: x = 1, P a körön; (x − 1)² + (y + 4)² = 9; (x − 1)² + (y − 7)² = 49; derékszögű háromszög: BC: 2x + 3y = 67, B(5; 19), körülírt kör (x + 2)² + (y − 15)² = 65.

> **⚠️ CSAPDA:** a kör egyenletében a középpont koordinátái ellentétes előjellel kerülnek a zárójelbe, és a jobb oldalon r² áll: K(−2; −1), r = 5 ⇒ (x + 2)² + (y + 1)² = 25.

A tankönyv Témazáró feladatgyűjteménye és a 260. oldali (sérült szövegű) Ráadás nem része a modulnak.

---

## 💻 Elkészített Komponensek

1. **`CoordPracticeExamFigures.tsx`** (a `felezopont/MidpointFigures.tsx` `MidpointPlane` komponensét használja): `CoordPracticeExamPerpLinesSvg`, `CoordPracticeExamTriangleSvg`, `CoordPracticeExamCircleAxisSvg`, `CoordPracticeExamVectorSumSvg`, `CoordPracticeExamRhombusSvg`, `CoordPracticeExamRightTriangleSvg`.
2. **`CoordPracticeExamTheory.tsx`**: összefoglaló táblázatok (vektorok; pontok, egyenesek, kör), az öt érettségi feladat és a Tudáspróba II. 4. kidolgozva, a tudáspróbák eredményei, csapda.
   - **I. Laboratórium:** vektorműveletek csúszkákkal (→a + →b, →a − →b, λ→a, hosszak, ±90°-os elforgatás, szög, párhuzamos/merőleges).
   - **II. Laboratórium:** kör és egyenes (y = mx + b vagy x = c) közös pontjai – diszkrimináns, szelő / érintő / nincs közös pont, metszéspontok.
3. **`CoordPracticeExamMatcher.tsx`**: 3 szint × 8 pár (vektorműveletek, pontok és egyenesek, körök egyenlete).
4. **`CoordPracticeExamSorter.tsx`**: 3 szint × 3 kategória × 9 elem (témakörök, vektorpárok helyzete, egyenes és kör).
5. **`CoordPracticeExamQuiz.tsx`**: fejezetzáró kvíz, **90 kérdés (30/30/30)** a teljes fejezetből (1–17. lecke), 46 kérdés ábrával, 3 puskakártya (progress id: `g11-geo-tudasproba-quiz`; matcher: `g11-geo-tudasproba-matcher`, sorter: `g11-geo-tudasproba-sorter`).

---

## 🧪 Tesztelés

`src/test/grade11Topic6CoordPracticeExam.test.tsx` – a 4 komponens és mind a 6 SVG ábra renderelése.
