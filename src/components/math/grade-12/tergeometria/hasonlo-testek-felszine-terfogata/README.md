# 8. Hasonló testek felszíne, térfogata (tankönyv 9. lecke, 22–23. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 22–23. oldal) alapján kidolgozott oktatási modul. A tankönyvben ez a **9. lecke**, a diákzónában a térgeometria fejezet **8.** leckéje (a 8. „Gyakorlás” lecke kimaradt).

---

## 🎯 Tananyag Áttekintés

A lecke a **Rubik-kockából** indul (ifj. Rubik Ernő, 1974; 2 × 2 × 2, 3 × 3 × 3, 4 × 4 × 4 „Rubik bosszúja”, 5 × 5 × 5 „Professzor kockája”, 25 × 25 × 25). Kis 1 × 1 × 1-es kockákból felépítve a k × k × k-as kocka felszíne k²-szerese, térfogata k³-szorosa a kis kockáénak. A 2. kidolgozott feladat megmutatja, hogy a k-szorosára nagyított henger felszíne k²-szeresére, térfogata k³-szorosára nő.

---

## 📐 Elmélet

1. **Emlékeztető (síkidomok):** ha két síkidom hasonló, arányszámuk k, akkor K′/K = k és T′/T = k².
2. **Testek:** ha két test hasonló, arányszámuk k, akkor
   $$\frac{A'}{A} = k^2, \qquad \frac{V'}{V} = k^3.$$

### Kidolgozott feladatok
- **1.** Rubik-táblázat: 2 × 2 × 2 → felszín 4×, térfogat 8×; 3 × 3 × 3 → 9×, 27×; 4 × 4 × 4 → 16×, 64×; 25 × 25 × 25 → 625×, 15 625×.
- **2.** Henger: A′/A = k², V′/V = k³ (levezetéssel).

### Tankönyvi feladatok
- **1.** 1,26 m élű betonkocka, kocka alakú üreg 21 / 42 / 63 cm ⇒ az üreg a maradék 1/215, 1/26, 1/7 része.
- **2.** 340 db 22 mm-es marcipángolyó → 30 mm-es bonbon: a) ≈ 1,90 dm³; b) térfogatarány (30/22)³ ≈ 2,54; c) máz ≈ 2,91 dm³; d) 5,2 dm³ csokoládéval d ≈ 34,2 mm; e) felszínek ≈ 1520,5 / 2827,4 / 3665,7 mm².
- **HF 1.** Sörétek hasonlósággal: k = 20 ⇒ 8000 db, felszín 20-szoros.
- **HF 2.** Minyon 4 × 3 × 2,5 cm, 3-szoros nagyítás: 12 × 9 × 7,5 cm; A: 59 → 531 cm² (9×); V: 30 → 810 cm³ (27×).
- **HF 3.** Henger térfogata 4-szeres ⇒ felszíne ∛16 ≈ 2,52-szeres; a nagyított r = 7 cm, M = 3 cm ⇒ eredeti r ≈ 4,4 cm, M ≈ 1,9 cm.

> **⚠️ CSAPDA:** a k-szoros nagyítás nem k-szoros anyagot jelent: a felszín k², a térfogat k³ arányban változik. Visszafelé k = √(A-arány) vagy ∛(V-arány).

---

## 💻 Elkészített Komponensek

1. **`SimilarSolidsFigures.tsx`**:
   - `ObliqueBox` (segédkomponens): ferde vetületű téglatest takart élekkel és opcionális rácsozással.
   - `RubikCubesSvg`: 1×1×1 … 4×4×4-es kockák.
   - `RatioPowersSvg`: k, k², k³ – szakasz, négyzet, kocka.
   - `CylinderScaleSvg`: a henger k-szoros nagyítása.
   - `ConcreteCubeSvg`: kocka alakú üreg a betonkockában.
   - `BonbonSvg`: marcipángolyó a csokoládémázas bonbonban.
   - `MinyonSvg`: a minyon és háromszoros nagyítása.
2. **`SimilarSolidsTheory.tsx`**: Rubik-táblázat, henger-levezetés, elmélet, kidolgozott feladatok (betonkocka, bonbon, minyon, henger visszafelé, sörétek), csapda.
   - **I. Laboratórium:** k-csúszka forgatható 3D kockával / hengerrel / gömbbel (`Solid3DViewer`, rögzített nagyítás), k, k², k³ és az új felszín, térfogat.
   - **II. Laboratórium:** arányfordító – ismert hossz-, felszín- vagy térfogatarányból a másik kettő, tankönyvi gyorsgombokkal.
3. **`SimilarSolidsMatcher.tsx`**: 3 szint × 8 pár.
4. **`SimilarSolidsSorter.tsx`**: 3 szint × 3 kategória × 9 elem (k / k² / k³; hasonló / nem hasonló / nem dönthető el; igaz / hamis / adatfüggő).
5. **`SimilarSolidsQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), kérdésábrákkal, 3 puskakártyával. Haladás-azonosító: `g12-ter-hasonlo-testek-quiz`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic1SimilarSolids.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
