# 3. Vektorok számszorosa (68. lecke, 220–223. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 220–223. oldal) alapján kidolgozott oktatási modul. A diákzónában a VI. Koordinátageometria fejezet 3. leckéje.

---

## 🎯 Tananyag Áttekintés

A lecke két hétköznapi példával indul: az expander gumikötelei (sárga 4,5 kg, kék 7 kg, zöld 9 kg, fekete 11 kg, piros 13,5 kg) és a kötélhúzás (→F + →F = 2→F, →F + →F + →F = 3→F). Ezután a vektorokat rácsvektorokkal (→i, →j) fejezi ki, majd definiálja a vektor valós számmal való szorzását.

---

## 📐 Fő Fogalmak és Szabályok

- **Definíció:** λ · →0 = →0. Az →a vektor λ-szorosa az a λ · →a vektor, amely párhuzamos →a-val, hossza |→a| |λ|-szorosa, iránya
  - →a irányával megegyezik, ha 0 < λ;
  - →a irányával ellentétes, ha λ < 0;
  - tetszőleges, ha λ = 0 (0 · →a = →0).
- **Megjegyzések:** |λ| > 1 ⇒ hosszabb, |λ| < 1 ⇒ rövidebb, |λ| = 1 ⇒ ugyanolyan hosszú (→a ≠ →0); (−1) · →a = −→a.
- Szám és vektor szorzata **vektor**: hibás a „0 · →a = 0” felírás, helyesen 0 · →a = →0.
- (−3)→a = 3(−→a) = −(3→a) = −3→a; →a − (5→b) = →a + (−5)→b = →a + 5(−→b) = →a − 5→b.

### Kidolgozott feladatok
- **Bevezető:** sárga + zöld = 13,5 kg = 3 · 4,5 kg ⇒ 3-szoros erő; kék + fekete = 18 kg = 4 · 4,5 kg ⇒ 4-szeres erő.
- **1.** Rácsvektorok: →a = 3→i, →b = −2→j, →c = →i + →j, →d = 3→i − 2→j, →e = −3→i − 2→j.
- **2.** Szabályos hatszög: →b + →c = →AK, így →AD = 2(→b + →c), →b + →c = ½ →AD.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** →d + →e = −4→j, →d − →e = 6→i.
- **3.** Paralelogramma (oldalvektorok →a, →b, O a középpont): ½(→a + →b), −½(→a + →b), ½(→a − →b), ½(→b − →a), −→a, −→b a berajzolt vektorok között.
- **4.** Kocka (→a = →AB, →b = →AD, →c = →AE): →BF = →c, →CH = −→a + →c, →BH = −→a + →b + →c, →DQ = →a − →b + ½→c (Q a BF felezőpontja).
- **HF 1.** a) →a = 4→b, →b = 0,25→a; b) →a = −0,8→b, →b = −1,25→a; c) →a = ±0,4→b, →b = ±2,5→a (2 lehetőség).
- **HF 2.** |→u| = 24 mm, |→v| = 32 mm, →u ⊥ →v: |2→u| = 48, |2→v| = 64, |−1,5→v| = 48; |→u + →v| = 40, |2→u + 2→v| = |2→u − 2→v| = 80; |4→u ± 3→v| ≈ 135,8; |−→u − 2→v| ≈ 68,4 (mm).

> **⚠️ CSAPDA:** a negatív szorzó az irányt fordítja meg, a hossz |λ|-val szorzódik: |−1,5→a| = 1,5 · |→a|, sohasem negatív.

Jelölés a felületen: „→a”, „→AB”, nullvektor „→0” (a kombinált nyíl, „a⃗”, több gyakori betűtípusban nem jelenik meg). Az SVG-ábrákon a betűk fölé rajzolt nyíl kerül. A 2. feladat (k, l, m, n, p, q szorzók) és a HF 3. ábrája a szövegből nem volt kiolvasható, ezért nem szerepel.

---

## 💻 Elkészített Komponensek

1. **`VectorScalarFigures.tsx`**:
   - `ScalarMultiplesSvg`: →v, 2→v, 0,5→v, −→v, −1,5→v.
   - `UnitVectorsGridSvg`: az 1. kidolgozott feladat vektorai az →i, →j rácsvektorokkal.
   - `HexagonDiagonalSvg`: szabályos hatszög, →AD = 2(→b + →c) (`showSum` kapcsolóval).
   - `ParallelogramCenterSvg`: paralelogramma és középpontja, ½(→a + →b), ½(→b − →a).
   - `CubeVectorsSvg`: a kocka élvektorai és a Q pont (`showQ` kapcsolóval).
   - `PerpendicularCombinationSvg`: merőleges →u, →v és 2→u + →v.
   - Segédkomponensek: `VectorScalarGrid`, `VectorScalarArrow`, `VectorScalarLabel`.
2. **`VectorScalarTheory.tsx`**: bevezető, kidolgozott feladatok, definíció és táblázat, megjegyzések, tankönyvi és házi feladatok, csapda.
   - **I. Laboratórium:** λ-csúszka (−3 … 3) választható →a vektorral a rácson; élő hossz, irány és besorolás.
   - **II. Laboratórium:** p · →u + q · →v merőleges →u (24 mm), →v (32 mm) vektorokkal, HF 2. előbeállítások.
3. **`VectorScalarMatcher.tsx`**: 3 szint × 8 pár (λ és a számszoros, hosszak, vektorok kifejezése).
4. **`VectorScalarSorter.tsx`**: 3 szint × 3 kategória × 9 elem (irány, hossz, párhuzamosság).
5. **`VectorScalarQuiz.tsx`**: 30 kérdés 3 szinten, 13 ábrával, 3 puskakártyával (progress id: `g11-geo-vektor-szamszoros-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic6VectorScalar.test.tsx` fájlban található, a 4 komponenst, a kérdésszámot és mind a 6 SVG ábrát ellenőrzi.
