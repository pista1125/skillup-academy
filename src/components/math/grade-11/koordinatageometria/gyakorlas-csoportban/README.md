# 8. Gyakorlás csoportban (72. lecke, 234–235. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 234–235. oldal) alapján kidolgozott gyakorló modul. A diákzónában ez a VI. Koordinátageometria fejezet **8.** leckéje.

---

## 🎯 Tananyag Áttekintés

Csoportmunka (2–3 fős csoportok) két feladatsorozattal, házi feladattal és egy Ráadás-feladattal. A lecke az eddigieket gyakoroltatja: vektorok koordinátái bázisvektorokkal, vektor hossza, két pont távolsága, ±90°-os elforgatás, felezőpont, paralelogramma és négyzet csúcsai a középpontból, |→u ± →v| a vektorok helyzetétől függően.

---

## 📐 Feladatok (ellenőrzött eredmények)

### I. feladatsorozat
- **1.** A(−4; −3), B(3; −1), K(−1; 2): C(2; 7), D(−5; 5); AB = √53 ≈ 7,28, AD = √65 ≈ 8,06; átlóvektorok →AC = (6; 10), →BD = (−8; 6).
- **2.** →a = 6→i − 8→j = (6; −8), →b = 12→i + 5→j = (12; 5); |→a| = 10, |→b| = 13; a végpontok távolsága √205 ≈ 14,32; →a, (8; 6), (−8; −6), (−6; 8) végpontjai négyzetet alkotnak.
- **3.** A(−3; 1), C(0; 6): T = 17, K = 4√17 ≈ 16,49; B(1; 2), D(−4; 5).
- **4.** |→u| = 3, |→v| = 4: |→u + →v| = 5 ⇒ merőlegesek (→u(3; 0), →v(0; 4)); |→u − →v| = 7 ⇒ ellentétes irányúak (→u(3; 0), →v(−4; 0)).

### II. feladatsorozat
- **1.** K(−4; −2,5), A(−3; −5,5): T = 20, K = 8√5 ≈ 17,89; B(−1; −1,5), C(−5; 0,5), D(−7; −3,5).
- **2.** A(3; −10), B(−3; −6), C(1; 4): három eset – D₁(7; 0) (átlók ≈ 14,14 és ≈ 11,66), D₂(−1; −20) (≈ 7,21 és ≈ 24,08), D₃(−5; 8) (≈ 10,77 és ≈ 19,70).
- **3.** |→u − →v| = 5 ⇒ merőlegesek; |→u + →v| = 1 ⇒ ellentétes irányúak.
- **4.** A(0; 0), B(6; 0), C(1; 8), D(−4; 4): E(3; 0), F(3,5; 4), G(−1,5; 6), H(−2; 2); →HE = →GF = (5; −2) ⇒ EFGH paralelogramma.

### Házi feladat és Ráadás
- **HF 1.** A(5; −12), B(−6; 8), K(−1; −4): C(−7; 4), D(4; −16); átlók 20 és 26.
- **HF 2.** Középpont az origó, A(5; −12): B(12; 5), C(−5; 12), D(−12; −5); átló 26, terület 338.
- **HF 3.** |→u − →v| = 1, |→u + →v| = 7 ⇒ egyirányúak (→u(3; 0), →v(4; 0)).
- **Ráadás.** Szabályos nyolcszög, O(1; 3), A(4; −1): C(5; 6); F(4,5; 2,5), |→OF| = √12,5 ≈ 3,54; →OB = √2 · (3,5; −0,5), B(1 + 3,5√2; 3 − 0,5√2) ≈ (5,95; 2,29).

> **⚠️ CSAPDA:** három csúcsból a paralelogramma negyedik csúcsa nem egyértelmű – ha a betűzés nincs megadva, három eset van.

---

## 💻 Elkészített Komponensek

1. **`CoordGroupPracticeFigures.tsx`** (a `../felezopont/MidpointFigures` `MidpointPlane` komponensére épül):
   - `GroupParallelogramSvg`, `RotatedVectorsSquareSvg`, `SquareFromCenterSvg`, `ParallelogramThreeCasesSvg`, `VarignonSvg`, `OctagonWellSvg`.
2. **`CoordGroupPracticeTheory.tsx`**: összefoglaló táblázat (vektorok koordinátákkal), az I. és II. feladatsorozat kidolgozott megoldásai, házi feladatok, Ráadás, csapda.
   - **I. Laboratórium:** paralelogramma negyedik csúcsa három csúcsból – mindhárom eset, átlóhosszak.
   - **II. Laboratórium:** négyzet a középpontból és egy csúcsból (90°-os elforgatás), terület és kerület.
   - **III. Laboratórium:** |→u + →v| és |→u − →v| a hosszak és a szög csúszkájával.
3. **`CoordGroupPracticeMatcher.tsx`**: 3 szint × 8 pár.
4. **`CoordGroupPracticeSorter.tsx`**: 3 szint × 3 kategória × 9 elem (vektorpárok helyzete; melyik eszköz; a paralelogramma három esete).
5. **`CoordGroupPracticeQuiz.tsx`**: 30 vegyes kérdés 3 szinten (13 ábrával), 3 puskakártyával (progress id: `g11-geo-csoportmunka-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic6CoordGroupPractice.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
