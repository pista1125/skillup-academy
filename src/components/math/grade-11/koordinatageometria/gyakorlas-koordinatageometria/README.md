# 16. Gyakorlás (80. lecke, 258–259. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 258–259. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a VI. Koordinátageometria fejezet **16.** leckéje.

---

## 🎯 Tananyag Áttekintés

Gyakorló óra a fejezet eddigi anyagából: vektorok párhuzamossága, merőlegessége és elforgatása, egyenlő szárú derékszögű háromszög a koordináta-rendszerben, körök egyenletének felírása, egyenesek y = mx + b alakja, iránytangense, irányszöge, tengelymetszetei, egyenesek kölcsönös helyzete. A modul ezt kiegészíti a háromszög nevezetes vonalainak (oldalegyenes, magasságvonal, oldalfelező merőleges, súlyvonal) és a körülírt körnek a koordinátás felírásával.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** →a(2; −3), →b(−2; 3), →c(4; −6), →d(6; 4), →e(10; −2), →f(−4; −1): párhuzamosak →a, →b, →c; →d merőleges rájuk; →e = →c + →d; →c = →e − →d; →d a →c +90°-os elforgatottja.
- **2.** Egyenlő szárú derékszögű háromszög, befogó A(4; 1), B(10; 5): 4 háromszög, C ∈ {(0; 7), (8; −5), (6; 11), (14; −1)}; K = 4√13 + 2√26 ≈ 24,62, T = 26; a körülírt kör középpontja (5; 6) vagy (9; 0).
- **3.** a) x² + y² = 169; b) (x + 2)² + (y − 7)² = 49; c) (x ± 3)² + (y ± 3)² = 9 (4 kör); d) (x − 2)² + (y + 5)² = 26.
- **4.** f: 5x − 12y + 43 = 0 ⇒ y = (5/12)x + 43/12, m = 5/12, α ≈ 22,6° (az y tengellyel ≈ 67,4°), tengelymetszetek (−8,6; 0) és (0; 43/12).
- **5.** e és h egybeesik, e ∥ g, e, g, h ⊥ f, i-t 3 egyenes metszi, i és h nem az y tengelyen metszik egymást.
- **HF 1.** A(−5; −4), B(2; −7), C(−6; −1): BC felezőpontja (−2; −4) rajta van e-n; BC ∥ f; AC nem merőleges g-re; e ∩ f = (2; 2); a g és a tengelyek által határolt háromszög területe 49/6.
- **HF 2.** (x − 4)² + (y + 5)² = 25; (x + 5)² + (y + 6)² = 25; (x + 4)² + (y + 4)² = 16; (x + 3,5)² + (y − 12)² = 420,25.
- **Ráadás.** A(2; 4), B(5; 7), C(−1; 10): PA² + PB² + PC² = 3(x − 2)² + 3(y − 7)² + 36, minimuma 36 a P(2; 7) súlypontban.

### Kidolgozott példa (nevezetes vonalak)
A(−2; −2), B(7; 1), C(5; 5): mc: 3x + y = 20, talppont T(6,4; 0,8), fAB: 3x + y = 7, fBC: x − 2y = 0, K(2; 1), r = 5, körülírt kör (x − 2)² + (y − 1)² = 25, sc: 11x − 5y = 30, M(6; 2), S(10/3; 4/3), T = 21.

> **⚠️ CSAPDA:** a magasságvonal a CSÚCSON megy át (merőlegesen a szemközti oldalra), az oldalfelező merőleges a FELEZŐPONTON – a két egyenes párhuzamos, de nem azonos.

---

## 💻 Elkészített Komponensek

1. **`CoordPracticeFigures.tsx`** (a `felezopont/MidpointFigures.tsx` `MidpointPlane` komponensét használja): `CoordPracticeVectorsSvg`, `CoordPracticeIsoscelesSvg`, `CoordPracticeAltitudeSvg`, `CoordPracticeCircumcircleSvg`, `CoordPracticeCentroidMinSvg`, `CoordPracticeLinesSvg`.
2. **`CoordPracticeTheory.tsx`**: összefoglaló táblázat, tankönyvi feladatok megoldása, nevezetes vonalak koordinátákkal, csapda.
   - **I. Laboratórium:** háromszög csúcsainak megadása; magasságvonalak, oldalfelező merőlegesek, súlyvonal, körülírt kör be-/kikapcsolva, egyenletek, M, S, K, r élőben.
   - **II. Laboratórium:** két egyenes Ax + By = C alakban – meredekség, irányszög, párhuzamos / egybeeső / merőleges / metsző, metszéspont, hajlásszög.
3. **`CoordPracticeMatcher.tsx`**: 3 szint × 8 pár (nevezetes vonalak, meredekségek, körök egyenlete).
4. **`CoordPracticeSorter.tsx`**: 3 szint × 3 kategória × 9 elem.
5. **`CoordPracticeQuiz.tsx`**: 30 kérdés (10/10/10), 16 kérdés ábrával, 3 puskakártya (progress id: `g11-geo-gyakorlas-quiz`; matcher: `g11-geo-gyakorlas-matcher`, sorter: `g11-geo-gyakorlas-sorter`).

---

## 🧪 Tesztelés

`src/test/grade11Topic6CoordPractice.test.tsx` – a 4 komponens és mind a 6 SVG ábra renderelése.
