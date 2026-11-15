# 12. Körrel kapcsolatos feladatok (76. lecke, 246–247. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 246–247. oldal) alapján kidolgozott oktatási modul. A diákzónában a VI. Koordinátageometria fejezet 12. leckéje.

---

## 🎯 Tananyag Áttekintés

A lecke gyakorló jellegű: a kör egyenletét egyenes egyenletével közös egyenletrendszerbe foglalva, körző és vonalzó nélkül határozzuk meg a közös pontokat; a Thalész-tétellel derékszögű háromszög köré írt körét írjuk fel; megvizsgáljuk, hány érintő húzható egy pontból a körhöz.

---

## 📐 Fő Fogalmak

- **Kör és egyenes közös pontjai:** az egyenletrendszer megoldásai. Behelyettesítés után másodfokú egyenletet kapunk: diszkrimináns > 0 ⇒ 2 közös pont (szelő), = 0 ⇒ 1 közös pont (érintő), < 0 ⇒ nincs közös pont.
- **Érintők egy pontból:** körön belüli pontból 0, a kör pontjából 1, körön kívüli pontból 2 érintő húzható. Az érintő merőleges az érintési pontba húzott sugárra.
- **Derékszögű háromszög köré írt köre:** középpontja az átfogó felezőpontja, sugara az átfogó fele (Thalész-tétel).
- A „diszkriminánsos” általános egyenes–kör vizsgálat és az érintő egyenlete a kör egy pontjában a TERV.md szerinti kiegészítés (a tankönyv ezen a leckén csak az x = c alakú egyenest és az érintők számát tárgyalja).

### Kidolgozott feladatok
- **1.** (x − 2)² + (y − 1)² = 8,5, első koordináta 3,5: y² − 2y − 5,25 = 0 ⇒ y = (2 ± √25) / 2 ⇒ **P₁(3,5; 3,5), P₂(3,5; −1,5)**.
- **2.** A(−5; 2), B(3; 1), C(1; −2): AB = √65, AC = √52, BC = √13, 52 + 13 = 65 ⇒ derékszög C-nél; körülírt kör: F(−1; 1,5), **(x + 1)² + (y − 1,5)² = 16,25**.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** Vasúti híd, x² + (y + 32)² = 1600: r = 40 m; P(−24; 0), Q(24; 0), R(0; 8); ha egy oszlop középen áll és 6 m-enként követik egymást: a leghosszabb 8 m, a többi ≈ 7,55; 6,16; 3,72 m (a legrövidebb ≈ 3,72 m). *Bizonytalan: a tankönyvi ábrán az oszlopok pontos helye nem olvasható ki a forrásszövegből; a modul a középen álló oszlopot feltételezi.*
- **2.** (x + 1)² + (y − 1,5)² = 16,25: P(−3; 4,5) belül ⇒ 0 érintő; Q(−5; 1) a körön ⇒ 1; S(2; 5) kívül ⇒ 2.
- **3.** C(−5; −3), érinti az y tengelyt: r = 5, (x + 5)² + (y + 3)² = 25; y = −6 ⇒ (−1; −6) és (−9; −6).
- **HF 1.** A(7; 6), B(−1; −3), C(−3; 2): derékszög C-nél; (x − 3)² + (y − 1,5)² = 36,25; α ≈ 26,57°, β ≈ 63,43°; T = 29.
- **HF 2.** A(−1; 0), B(4; 3) – Thalész-kör (x − 1,5)² + (y − 1,5)² = 8,5; a tengelyeken: (4; 0), (0; 4), (0; −1) (a (−1; 0) maga az A pont).
- **HF 3.** Rádióadó P(−3; 2), r = 15: A, D fogható; C, F a határon; B, E nem fogható.

> **⚠️ CSAPDA:** (y − 1)² = 6,25-ből y − 1 = ±2,5 – a negatív gyököt elhagyva elveszik a P₂(3,5; −1,5) pont.

---

## 💻 Elkészített Komponensek

1. **`CircleProblemsFigures.tsx`**:
   - `VerticalLineCircleSvg`: a kör és az x = 3,5 egyenes közös pontjai.
   - `RightTriangleCircumcircleSvg`: az ABC derékszögű háromszög (derékszög C-nél negyedkörívvel és ponttal) és köré írt köre.
   - `BridgeArcSvg`: a vasúti híd körív alakú tartószerkezete az oszlopokkal.
   - `TangentCountSvg`: belső (0), körvonali (1) és külső (2) pontból húzható érintők.
   - `LineCirclePositionsSvg`: szelő, érintő és a kört elkerülő egyenes az x² + y² = 25 körrel.
   - `RadioRangeSvg`: a rádióadó hatóköre az A–F pontokkal.
   - Segédkomponensek / függvények: `CircleProblemsPlane` (koordinátasík derékszögjelekkel), `CircleProblemsRightAngle`, `circleTangentPoints`, `circleProblemsLineThrough`, `circleProblemsTangentAt`.
2. **`CircleProblemsTheory.tsx`**: két kidolgozott feladat, egyenes és kör kölcsönös helyzete, érintők, tankönyvi feladatok megoldásokkal, csapda.
   - **I. Laboratórium:** kör (u, v, r) és egyenes (y = mx + b vagy x = c) csúszkákkal – a behelyettesített másodfokú egyenlet, diszkrimináns, távolság, a metszéspontok élőben.
   - **II. Laboratórium:** kattintással mozgatható S pont – belül / rajta / kívül, az érintők rajza, érintési pontok, Thalész-kör, érintőszakasz hossza.
3. **`CircleProblemsMatcher.tsx`**: 3 szint × 8 pár (fogalmak, közös pontok, feladatból egyenlet).
4. **`CircleProblemsSorter.tsx`**: 3 szint × 3 kategória × 9 elem (szelő / érintő / nincs közös pont; 0 / 1 / 2 érintő; rádióadás).
5. **`CircleProblemsQuiz.tsx`**: 30 kérdés 3 szinten, 13 ábrával, 3 puskakártyával (progress id: `g11-geo-kor-feladatok-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic6CircleProblems.test.tsx` fájlban található: a 4 komponenst, a 30 kérdés szintenkénti eloszlását mind a 6 SVG ábrát és az összes kvízábrát ellenőrzi.
