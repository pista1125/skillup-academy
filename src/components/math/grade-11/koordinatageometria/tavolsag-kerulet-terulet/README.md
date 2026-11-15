# 6. Távolság, kerület, terület (70. lecke, 230–231. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 230–231. oldal) alapján kidolgozott oktatási modul. A diákzónában a VI. Koordinátageometria fejezet 6. szakasza.

---

## 🎯 Tananyag Áttekintés

**Bevezető – a Bermuda-háromszög:** a térképre illesztett koordináta-rendszerben a csúcsok M(−4; 1) (Miami), S(4; −4) (San Juan), H(6; 5) (Hamilton); 1 egység = 160 km.

- **Kerület:** MS = √(8² + (−5)²) = √89, SH = √(2² + 9²) = √85, HM = √(10² + 4²) = √116 ⇒ K ≈ 29,4 egység ≈ **4700 km**.
- **Terület:** a háromszöget befoglaló, a tengelyekkel párhuzamos oldalú legkisebb téglalap 10 × 9-es; ebből három derékszögű háromszöget vágunk le:
  $$T = 10\cdot 9 - \frac{8\cdot 5}{2} - \frac{2\cdot 9}{2} - \frac{10\cdot 4}{2} = 41 \text{ területegység} \approx 41\cdot 160^2\ \text{km}^2 = 1\,049\,600\ \text{km}^2.$$

---

## 📐 Elmélet

- Az AB szakasz hossza = az A(a₁; a₂) és B(b₁; b₂) pontok távolsága = az →AB vektor abszolút értéke:
  $$AB = \sqrt{(b_1 - a_1)^2 + (b_2 - a_2)^2}.$$
- Sokszög kerülete: a szomszédos csúcsok távolságainak összege.
- Sokszög területe: befoglaló téglalap területe − a levágott derékszögű háromszögek (és téglalapok) területe.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1. a)** ABD: A(−4; −7), B(8; −3), D(0; 3): AB = 4√10, BD = 10, DA = 2√29 ⇒ K ≈ 33,42; T = 120 − 68 = **52**.
- **1. b)** EFC: E(3; −7), F(8; 3), C(−4; 3): EF = 5√5, FC = 12, CE = √149 ⇒ K ≈ 35,39; T = 12 · 10 / 2 = **60**.
- **2.** ABCD: A(−3; 1), B(6; 1), C(3; 5), D(−1; 4): befoglaló téglalap 9 · 4 = 36, toldott részek 6 + 2 + 2 + 3 = 13 ⇒ T = **23**.
- **3. a)** Négyzet, szomszédos csúcsok A(1; 2), B(6; −10): oldal 13 ⇒ K = 52, T = 169.
- **3. b)** Négyzet, szemközti csúcsok A(7; −3), C(1; 5): átló 10, oldal 5√2 ⇒ K = 20√2 ≈ 28,28, T = 50.
- **3. c)** Szabályos háromszög A(−12; 20), B(15; −16): oldal 45 ⇒ K = 135, T = 2025√3 / 4 ≈ 876,85.
- **HF 1.** A(1; −4), B(7; 2), C(−5; −2) súlyvonalai: 4, √106 ≈ 10,30, √82 ≈ 9,06.
- **HF 2.** P(1; −4), Q(7; 2), R(−5; −2): K = 6√2 + 6√10 ≈ 27,46; T = 24 (tompaszögű háromszög).
- **HF 3.** a = 5√2 ≈ 7,07; b = 4√3 ≈ 6,93; c = 2√13 ≈ 7,21 ⇒ b < a < c.
- (A HF 4. a tankönyvi ábrára épül, ezért a modul nem közöl rá eredményt.)

> **⚠️ CSAPDA:** A levágott derékszögű háromszögek területe a befogók szorzatának **fele** – felezés nélkül a Bermuda-háromszögre 90 − 40 − 18 − 40 = −8 jönne ki. A valós területnél a lépték **négyzetével** szorzunk.

---

## 💻 Elkészített Komponensek

1. **`DistancePerimeterAreaFigures.tsx`**:
   - `BermudaTriangleSvg`: az M, S, H csúcsok a koordináta-rendszerben (városnevekkel, lépték).
   - `BoundingRectangleSvg`: a 10 × 9-es befoglaló téglalap és a három levágott derékszögű háromszög (20, 9, 20), derékszög-jelölés negyedkörívvel.
   - `DistanceFormulaSvg`: a távolságképlet a koordináták különbségeiből álló derékszögű háromszögből.
   - `TriangleABDSvg`: az 1. a) feladat háromszöge a befoglaló téglalapban (120 − 68 = 52).
   - `QuadrilateralAreaSvg`: a 2. feladat négyszöge (36 − 13 = 23).
   - Segédkomponensek: `DPAGrid`, `DPAArrow`, `DPALabel`, `DPARightAngle`.
2. **`DistancePerimeterAreaTheory.tsx`**: bevezető, kerület, terület befoglaló téglalappal, elmélet és módszertáblázat, 6 kidolgozott feladatkártya (1–3. feladat, házi feladatok), csapda.
   - **I. Laboratórium:** húzható sokszögcsúcsok rácson (3–6 csúcs, előbeállítások: Bermuda, ABCD, PQR, ötszög) – élő oldalhosszak (egyszerűsített gyökös alakban), kerület, befoglaló téglalap és terület; önmetsző sokszög jelzése.
   - **II. Laboratórium:** két pontból négyzet (szomszédos / szemközti csúcsok) vagy szabályos háromszög kerülete és területe, térképi lépték csúszkával (km, km²).
3. **`DistancePerimeterAreaMatcher.tsx`**: 3 szint × 8 pár (képletek és módszerek; két pont távolsága; területek).
4. **`DistancePerimeterAreaSorter.tsx`**: 3 szint × 3 kategória × 9 elem (távolság 5 / 10 / 13; távolság / kerület / terület; igaz / hamis / adatfüggő).
5. **`DistancePerimeterAreaQuiz.tsx`**: 30 kérdés 3 szinten (16 ábrával), 3 puskakártyával (progress id: `g11-geo-tavolsag-terulet-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic6DistancePerimeterArea.test.tsx` fájlban található: a 4 komponens, a kvízábrák és mind az 5 SVG ábra renderelését, valamint a kérdések számát és szintenkénti eloszlását ellenőrzi.
