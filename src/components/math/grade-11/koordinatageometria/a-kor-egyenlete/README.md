# 11. A kör egyenlete (75. lecke, 242–245. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 242–245. oldal) alapján kidolgozott oktatási modul. A diákzónában a VI. Koordinátageometria fejezet 11. leckéje.

---

## 🎯 Tananyag Áttekintés

A lecke a focipálya kezdőkörével indul (középpont a felezővonal felezőpontja, r = 9,15 m). Az origót a kezdőkör középpontjába téve a játékosok helyzetét az OP = √(x² + y²) távolság dönti el:
- A(9; 1,65) és C(−5,49; 7,32): OP = 9,15 ⇒ a kezdőkörön;
- B(−7; 4,4): OP ≈ 8,27 ⇒ belül; D(6,7; −6,4): OP ≈ 9,27 ⇒ kívül.

A körön lévő pontok koordinátái teljesítik az x² + y² = 9,15² egyenletet.

---

## 📐 Fő Fogalmak

- **A kör egyenlete:** a C(u; v) középpontú, r sugarú körön a P(x; y) pont akkor és csak akkor van rajta, ha CP = r, azaz
  $$(x - u)^2 + (y - v)^2 = r^2.$$
- Origó középpontú kör: x² + y² = r². Példa: C(3; 6), r = 10 ⇒ (x − 3)² + (y − 6)² = 100.
- Ha a pont koordinátáit behelyettesítve az egyenlőség teljesül, a pont a körön van; ha a bal oldal kisebb r²-nél, belül, ha nagyobb, kívül.
- Az azonos sugarú körök eltolással egymásba vihetők: x² + y² = 25 eltolva a →v(5; −2) vektorral (x − 5)² + (y + 2)² = 25.
- **Kitekintés (nem a tankönyv része, a TERV.md alapján):** a kifejtett x² + y² + Dx + Ey + F = 0 alakból teljes négyzetté kiegészítéssel: C(−D/2; −E/2), r² = (D/2)² + (E/2)² − F (ha ez ≤ 0, nem kör).

### Kidolgozott feladatok
- **1. a)** Az origótól 5 egységre végtelen sok pont van: (5; 0), (4; 3), (3; 4), (0; 5), (−4; 3), (−5; 0), (0; −5), (1; √24), (√11; −√14), (−√23; √2) …
- **1. b)** K′(5; −2) körül: az a) pontjainak (5; −2)-vel eltoltjai, pl. P₂′(9; 1), P₁₁′(8; −6).
- **2. a)** K(0; 0), r = 5: A(3,4; −3,4) belül, B(−3/2; √91/2) rajta, C(2,5; 4,5) kívül.
- **2. b)** K′(5; −2), r = 5: D(1; 1) rajta, E(9,5; 0) belül, F(17/2; −20/3) kívül.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** (x − 5)² + (y − 3)² = 4; (x − 5)² + (y + 3)² = 16; (x + 5)² + (y − 3)² = 0,25; x² + y² = 100.
- **2.** C(4; 2), A(−1; −10) ⇒ (x − 4)² + (y − 2)² = 169; C(−2; 2), A(1; −3) ⇒ (x + 2)² + (y − 2)² = 34.
- **3.** (x + 4)² + (y − 2)² = 25: D(−2; −3) nincs rajta; (x − 2)² + (y + 1)² = 10: C(3; −5) nincs rajta.
- **4.** A(1; −14), B(−15; 16): (x + 7)² + (y − 1)² = 289; a beírt négyzet oldala 17√2 ≈ 24,04; a négyzet beírt köre (x + 7)² + (y − 1)² = 144,5.
- **HF 1.** C(2; −5)-től 10 egységre: A(8; 3) és D(10; 1).
- **HF 2.** a) rajta; b) nincs rajta (belül, 17 < 25); c) rajta; d) rajta.
- **HF 3.** A(14; −24), C(0; 24): (x − 7)² + y² = 625; a beírt kör területe 312,5π ≈ 981,7.
- **Ráadás.** A(−2; 4), B(6; 0) befogó: 4 háromszög, de csak 2 különböző köré írt kör: (x − 4)² + (y − 6)² = 40 és x² + (y + 2)² = 40.

> **⚠️ CSAPDA:** (x + 4)² + (y − 2)² = 25 középpontja C(−4; 2) (nem (4; −2)), sugara 5 (nem 25).

---

## 💻 Elkészített Komponensek

1. **`G11CircleEquationFigures.tsx`**:
   - `KickoffCircleSvg`: a kezdőkör a koordináta-rendszerben az A, B, C, D játékosokkal.
   - `RadiusFivePointsSvg`: az origótól 5 egységre lévő pontok (3–4–5-ös háromszögekkel).
   - `TranslatedCircleSvg`: a K(0; 0) és a K′(5; −2) középpontú kör, eltolásvektor (nyíllal a betű fölött).
   - `CircleEquationDerivationSvg`: a kör egyenletének levezetése Pitagorasz-tétellel (derékszög: negyedkörív ponttal).
   - `DiameterSquareSvg`: 4. feladat – átmérőből a kör, a beírt négyzet és annak beírt köre.
   - `CompletingSquareSvg`: teljes négyzetté kiegészítés területmodellel.
   - Segédkomponensek: `G11CircleEquationPlane` (koordinátasík körökkel, egyenesekkel, pontokkal, kattintással), `G11CircleEquationRightAngle`.
2. **`G11CircleEquationTheory.tsx`**: bevezető, két kidolgozott feladat, elmélet, tankönyvi feladatok megoldásokkal, kitekintés a teljes négyzetté kiegészítésre, csapda.
   - **I. Laboratórium:** középpont (u, v) és sugár csúszkával → élő egyenlet (normál és kifejtett alak); kattintással áthelyezhető T pont: rajta / belül / kívül.
   - **II. Laboratórium:** D, E, F megadása → a teljes négyzetté kiegészítés 5 lépése, középpont és sugár (vagy: egy pont / üres halmaz), rajzzal.
3. **`G11CircleEquationMatcher.tsx`**: 3 szint × 8 pár (középpont és sugár; adatokból egyenlet; kifejtett alakból középpont és sugár).
4. **`G11CircleEquationSorter.tsx`**: 3 szint × 3 kategória × 9 elem (rajta / belül / kívül két körre; kör / pont / üres halmaz).
5. **`G11CircleEquationQuiz.tsx`**: 30 kérdés 3 szinten, 12 ábrával, 3 puskakártyával (progress id: `g11-geo-kor-egyenlete-quiz`).

A `G11` előtag azért kell, mert a `CircleEquation…` név a `graduation/geometria-trigonometria/GeometriaDiagrams.tsx` fájlban már foglalt (`CircleEquationDiagram`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic6G11CircleEquation.test.tsx` fájlban található: a 4 komponenst, a 30 kérdés szintenkénti eloszlását mind a 6 SVG ábrát és az összes kvízábrát ellenőrzi.
