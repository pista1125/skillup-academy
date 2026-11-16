# 5. Mértani sorozatok (26. lecke, 60–61. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 26. lecke, 60–61. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a sorozatok fejezet **5.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Kidolgozott feladat (egymásba írt négyzetek):** egy 8 cm oldalú négyzet oldalfelező pontjait összekötve újabb négyzetet kapunk, és így tovább. Pitagorasz-tétellel a₂ = a₁/√2, a hasonlóság aránya m = 1/√2 minden lépésben; a kerületek aránya m, a területeké m² = 1/2. A 4. négyzet: a₄ = 2√2 cm, K₄ = 8√2 ≈ 11,31 cm, T₄ = 8 cm². Az n-edik: aₙ = mⁿ⁻¹ · a₁, Kₙ = mⁿ⁻¹ · K₁, Tₙ = (m²)ⁿ⁻¹ · T₁.

---

## 📐 Elmélet

- **Definíció:** az {aₙ} sorozat mértani sorozat, ha a második tagtól kezdve aₙ/aₙ₋₁ 0-tól különböző állandó. Ez a **kvóciens** (hányados), jele **q**.
- **n-edik tag:** aₙ = a₁ · qⁿ⁻¹. A sorozatnak egyik tagja és a kvóciense sem lehet 0.
- **Megjegyzés:** két ismert tagból két megoldás is adódhat, pl. a₁₂ = 10, a₁₄ = 40 ⇒ q² = 4 ⇒ q = 2 vagy −2.

### Tankönyvi feladatok (a modulban feldolgozva)
- **1.** Zoltán: 3 millió Ft, évi 3,5% kamatos kamat ⇒ 6 év múlva ≈ 3 687 766 Ft; 3 840 000 Ft-hoz ≈ 4,2% kamat kell.
- **2.** Erdő: évi 2% csökkenés, 2010-ben 12 000 m³ ⇒ 2005-ben ≈ 13 275 m³, 2020-ban ≈ 9805 m³; 10 500 m³ alá először 2017-ben.
- **3.** a₁ = 7: a₄ = 189 ⇒ q = 3, a₆ = 1701; a₄ = −0,875 ⇒ q = −0,5, a₆ = −0,21875.
- **4.** a₂ = 1600, a₄ = 4 ⇒ q = ±1/20, a₁ = ±32 000.
- **5.** a₁ = 8, a₂ + a₃ = 16 ⇒ q = 1 vagy −2 ⇒ a₄ = 8 vagy −64.
- **6.** Gép: 21,5 millió Ft, évi 15% értékcsökkenés ⇒ 3 év múlva ≈ 13,2 millió Ft; 0,85ⁿ < 0,45 ⇒ 2026-ban adják el (a 21,5 milliós adat nélkül is).
- **HF 1.** Táblázat: a₁ = 4, a₃ = −16 nincs megoldás; a₂ = 9, a₄ = 81 két megoldás (q = ±3); a₁ = 500, a₄ = −864 ⇒ q = −1,2; a₃ = 400, a₄ = −320 ⇒ q = −0,8 (a táblázat oszlopait a szöveg alapján rekonstruáltuk).
- **HF 2.** a₃ = 32, a₆ = 108 ⇒ q = 1,5; 28 tag kisebb 1 000 000-nál.
- **HF 3.** a₁ = 10²³, q = 0,001: a 100 a 8. tag; 5 tag nagyobb 10¹⁰-nél.

> **⚠️ CSAPDA:** q² = 4-ből q = 2 **vagy** q = −2; és aₙ = a₁ · qⁿ⁻¹, nem a₁ · qⁿ.

---

## 💻 Elkészített Komponensek

1. **`GeometricSequenceFigures.tsx`**:
   - `NestedSquaresSvg`: egymásba írt négyzetek, a sarokháromszög derékszöge (negyedkörív ponttal), Pitagorasz.
   - `GeometricChainSvg`: a₁ … a₇ „·q” lépésekkel, aₙ = a₁ · qⁿ⁻¹.
   - `QuotientTypesSvg`: q = 1,5 / 0,5 / −2 pontgrafikonjai.
   - `TwoSolutionsSvg`: a₁₂ = 10, a₁₄ = 40 – két megoldás (q = ±2).
   - `ForestDeclineSvg`: a faállomány évi 2%-os csökkenése a 10 500 m³-es határral.
   - (segédfüggvény: `nestedSquares`)
2. **`GeometricSequenceTheory.tsx`**: kidolgozott négyzetes feladat, definíció, n-edik tag, két megoldás, alkalmazások (kamatos kamat, erdő, tagokból q, gép), csapda.
   - **I. Laboratórium:** q-csúszka (növő, csökkenő, alternáló, konstans) a₁-gyel, pontgrafikonnal és előbeállításokkal.
   - **II. Laboratórium:** „Rajzolj bele még egyet!” – egymásba írt négyzetek oldal- és lépésszám-csúszkával, oldal-, kerület-, területtáblázattal.
3. **`GeometricSequenceMatcher.tsx`**: 3 szint × 8 pár (sorozat ↔ q; adatokból az eredmény; folyamat ↔ szorzó).
4. **`GeometricSequenceSorter.tsx`**: 3 szint × 3 kategória × 9 elem (q > 0 / q < 0 / nem mértani; megoldások száma; monotonitás).
5. **`GeometricSequenceQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 6 kérdésábrával, 3 puskakártyával.
- `seqKit.tsx`: belső rajzsegédek (nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-seq-mertani-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic2GeometricSequence.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
