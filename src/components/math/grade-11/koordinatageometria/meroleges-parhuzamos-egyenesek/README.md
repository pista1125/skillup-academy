# 15. Merőleges, párhuzamos egyenesek (79. lecke, 254–257. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 254–257. oldal) alapján kidolgozott oktatási modul. A diákzónában a VI. Koordinátageometria fejezet 15. leckéje.

---

## 🎯 Tananyag Áttekintés

A lecke a Perseidák párhuzamosan száguldó hullócsillagaival indul: egy fotóra helyezett koordináta-rendszerben a meteorpályák akkor párhuzamosak, ha irányszögük – és így meredekségük – egyenlő. A kidolgozott feladat az mₑ = 0,5 meredekségű egyenesre merőleges egyenes meredekségét határozza meg az →OP(2; 1) vektor −90°-os elforgatásával (→OP′(1; −2), m_f = −2), és ebből adódik az m₁ · m₂ = −1 összefüggés. A Ráadás Descartes-ról és a koordinátageometria (analitikus geometria) születéséről szól.

---

## 📐 Fő Fogalmak és Szabályok

- **Párhuzamosság:** két, az y tengellyel nem párhuzamos egyenes akkor és csak akkor párhuzamos, ha iránytangenseik egyenlők. Az x = c alakú egyenesek egymással párhuzamosak.
- **Merőlegesség:** két, az y tengellyel nem párhuzamos egyenes akkor és csak akkor merőleges, ha iránytangenseik szorzata −1 (m₂ = −1/m₁). Az x = c egyenesek merőlegesek minden y = b egyenesre.
- (a; b) vektor −90°-os elforgatottja (b; −a).
- **Kiegészítés – pont és egyenes távolsága:** merőleges a ponton át → metszéspont (talppont) → két pont távolsága; képlettel d = |Ax₀ + By₀ − C| / √(A² + B²). (A tankönyv ezt képletként nem tárgyalja; a modul a tanult eszközökből építi fel.)

### Tankönyvi feladatok (ellenőrzött eredmények)
- **F1.** e: −4x + 20y = 12 (m = 1/5): párhuzamos −x + 5y = 2; 2x − 10y = −6 egybeesik e-vel; merőleges 10x + 2y = −5 és −40x − 8y = 20 (ugyanaz az egyenes); −40x + 8y = 20 (m = 5) egyik sem; a 6 egyenlet 4 különböző egyenest ad.
- **F2.** e: 6x − 15y = 2, 9x + py = 5: merőleges, ha p = 3,6; párhuzamos, ha p = −22,5.
- **F3.** P(5; 2): az y = −3-mal párhuzamos és az x = 7-re merőleges egyenes is y = 2.
- **F4.** Origón át, →v(5; −2)-vel párhuzamos e: m = −2/5, y = −2/5 x; f (P(0; 2)-n át, ∥ e): y = −2/5 x + 2; g (origón át, ⊥ e): y = 5/2 x.
- **HF 1.** e: 2x + 5y = −1 és j: 0,8x = 1 − 2y párhuzamos (m = −2/5); mindkettő merőleges h: x − 0,4y = 0,6-ra (m = 5/2); f: 4x − 3y = 12 ⊥ g: 6x + 8y = 5. (Az i egyenes egyenlete a szövegkivonatban nem olvasható egyértelműen, ezért kimaradt.)
- **HF 2.** A(−4; −2), B(4; 2), C(8; 10), D(0; 6): szemközti oldalak párhuzamosak (1/2 és 2), átlók merőlegesek (1 · (−1) = −1) – rombusz.
- **HF 4.** A(−3; 2), B(5; −4), C(0; 1): B-ből induló magasságvonal y = 3x − 19; AB felezőmerőlegese 4x − 3y = 7.
- A HF 3. és HF 5. a tankönyv (GeoGebra-, illetve rács-) ábrájára épül, amely a szövegkivonatból nem rekonstruálható, ezért nem került be.

> **⚠️ CSAPDA:** a merőleges meredekség a reciprok **ellentettje** – 2/5-re merőleges meredekség −5/2, nem 5/2 (2/5 · 5/2 = 1 ≠ −1).

---

## 💻 Elkészített Komponensek

1. **`PerpendicularParallelFigures.tsx`**:
   - `PerpendicularParallelMeteorsSvg`: párhuzamos meteorpályák egyenlő irányszögekkel.
   - `PerpendicularParallelRotationSvg`: kidolgozott feladat – →OP(2; 1) és −90°-os elforgatottja →OP′(1; −2).
   - `PerpendicularParallelSlopeTrianglesSvg`: a meredekségi háromszög 90°-os elforgatása (2/3 és −3/2).
   - `PerpendicularParallelRhombusSvg`: HF 2. – az ABCD rombusz merőleges átlókkal.
   - `PerpendicularParallelDistanceSvg`: A(−3; 2) távolsága az x + y = 1 egyenestől, T(−2; 3) talppont.
   - Segédkomponensek: `PerpendicularParallelPlane` (koordinátasík, kattintható rácspontokkal), `PerpendicularParallelAngleMark` (derékszög: negyedkörív ponttal), `PerpendicularParallelArrowHead`, `ppClipLine`.
2. **`PerpendicularParallelTheory.tsx`**: bevezető, párhuzamosság tétele (F1 táblázat), kidolgozott feladat és a merőlegesség tétele, tankönyvi feladatok, pont–egyenes távolság, csapda.
   - **I. Laboratórium:** m₁-csúszka; e, a vele párhuzamos e′ és a rá merőleges f élőben, elforgatott meredekségi háromszögek, m₁ · m₂ = −1 kijelzés (m₁ = 0 esetén függőleges f).
   - **II. Laboratórium:** egyenes m és b csúszkával, P pont kattintással; merőleges egyenes, T talppont és a távolság lépésenként.
3. **`PerpendicularParallelMatcher.tsx`**: 3 szint × 8 pár (merőleges meredekség, párhuzamos/merőleges egyenes felírása, alkalmazások).
4. **`PerpendicularParallelSorter.tsx`**: 3 szint × 3 kategória × 9 elem (viszony az y = 2x + 1-hez, az F1 egyenletei, mit állapít meg a számolás).
5. **`PerpendicularParallelQuiz.tsx`**: 30 kérdés 3 szinten, 11 ábrával, 3 puskakártyával (progress id: `g11-geo-meroleges-parhuzamos-quiz`; párosító: `g11-geo-meroleges-parhuzamos-matcher`, csoportosító: `g11-geo-meroleges-parhuzamos-sorter`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic6PerpendicularParallel.test.tsx` fájlban található: a 4 komponens renderelése, a kérdésszám (10/10/10), mindkét labor (m₁ · m₂ = −1 és a függőleges eset; a tankönyvi pont–egyenes távolság) és mind az 5 SVG ábra.
