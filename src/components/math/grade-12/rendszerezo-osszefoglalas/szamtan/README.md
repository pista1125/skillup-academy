# 3. Számtan – összefoglalás (Rendszerező összefoglalás, 116–127. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., Rendszerező összefoglalás – „Számtan, algebra” blokk, 116–127. oldal) alapján kidolgozott érettségi ismétlő modul. A diákzónában ez a rendszerező összefoglalás fejezet **3.** leckéje; a blokk algebrai része (azonosságok, egyenletek, egyenlőtlenségek, egyenletrendszerek) a **4. leckében** (`algebra`) található.

---

## 🎯 Tananyag Áttekintés

A tankönyvi „FOGALMAK, TÉTELEK, MÓDSZEREK” táblázat számtani sorai (116–119. o.):

- **D** A valós számkör (ℕ ⊂ ℤ ⊂ ℚ, ℚ*, ℝ); **T** racionális szám tizedes tört alakja véges vagy végtelen szakaszos, irracionálisé végtelen nem szakaszos.
- **D** Intervallumok (]a; b[, [a; b[, ]a; b], [a; b], ]a; ∞[, ]−∞; b[).
- **D** Oszthatóság (b | a), prím- és összetett számok (az 1 egyik sem), **D/M** LNKO és LKKT prímtényezős felbontással, relatív prímek.
- **T** Műveleti tulajdonságok (kommutativitás, asszociativitás, disztributivitás).
- **D/T** Egész kitevőjű hatvány és azonosságai; négyzetgyök (√(a²) = |a|) és azonosságai; n-edik gyök; törtkitevőjű hatvány.
- **D** Logaritmus (logₐ b), **T** áttérés más alapra.
- n alapú számrendszer (pl. 2304₆ = 544).
- **D** Egyenes és fordított arányosság, százalék (72 · 15 / 100 = 10,8).

### Kidolgozott feladatok
- **3.** 3014₅ = 384 = 1440₆.
- **6.** Kovács úr lakása: adó 330 000 Ft; 4 év, évi 3% értékcsökkenés: 7,8 · 0,97⁴ ≈ 6,9 millió Ft.
- **7.** A Föld népessége: havi kb. 0,14% növekedés; 2022 végére ≈ 8,018 milliárd; 9 milliárd ≈ 107 hónap múlva (2029 vége).

### Tankönyvi feladatok (a modulban feldolgozva)
- **A1.** Igaz/hamis: 101111₂ = 47; [90; 75] = 450 (nem 900); öt prím összege lehet páros (2 + 3 + 5 + 7 + 11 = 28), de nem mindig.
- **A2.** 2 280 000 / 0,94 ≈ 2 425 532 Ft. **A6.** √(47 − 3x): 16 természetes szám. **A11.** 18 gép: 308 perc.
- **A4.** 9/√27 = 3^{1/2}. **B10.** 2x − 7 ≤ 0: 4 természetes szám (0; 1; 2; 3). **B11.** 72/64 = 9/8 = 1,125 ⇒ □ = 6.
- **B4.** 5A7B osztható 15-tel: 7 szám. **B5.** 800 diák. **B9.** 1234₆ = 310 = 100110110₂. **B12.** 8^{-3/4} = 2^{-9/4} (a tankönyvi képen is 8^{-3/4} áll).
- **Q1.** a = 0,3, b = 1/3: a) 9/10; b) 10/3; c) −1/2.
- **Ráadás 1.** 153 846 (· 4 = 615 384).
- **P2. a)** hajók: [18; 20] = 180 nap ⇒ augusztus 28. **P3.** légnyomás 100 m-en ≈ 98 700 Pa. **P5.** flashmob: 364 diák, 52 sor × 7.
- **Q2.** ID = log₂ 32 = 5, 4-szer távolabbról 7 (1,4-szeres). **Q4.** n = 4; 1000₃ = 27 < 333₄ = 63. **Q5. b–d)** a kód 210 többszöröse: mindig van benne 0, négyzetszám nem lehet.

> **⚠️ CSAPDA:** √(a²) = |a|; az 1 nem prím; egymás utáni százalékos változások szorzódnak, nem adódnak össze.

---

## 💻 Elkészített Komponensek

1. **`ArithmeticSummaryFigures.tsx`**:
   - `NumberSetsSvg`: a valós számkör halmazábrája példákkal.
   - `IntervalsSvg`: ]−2; 1[, [2; 4[, [5; 6] a számegyenesen (nyílt/zárt végpontok).
   - `GcdLcmSvg`: LNKO és LKKT prímtényezős táblázattal (360 és 84).
   - `PowerRootLogSvg`: 2³ = 8 ⇔ ∛8 = 2 ⇔ log₂ 8 = 3; áttérés más alapra.
   - `NumberBaseSvg`: a 3014₅ → 1440₆ kidolgozott átváltás.
2. **`ArithmeticSummaryTheory.tsx`**: két fogalomtár-táblázat (számok; hatvány–gyök–logaritmus, arányosság, százalék), három kidolgozott feladat, a blokk feladatai, csapda.
   - **I. Laboratórium:** LNKO és LKKT – prímtényezős felbontás két tetszőleges számra, ellenőrzés (a; b) · [a; b] = a · b, tankönyvi előbeállítások.
   - **II. Laboratórium:** hatvány – gyök – logaritmus: aˣ = b megoldása x = lg b / lg a alakban, ellenőrzés, gyökös alak, előbeállítások (népesség, lakás).
3. **`ArithmeticSummaryMatcher.tsx`**: 3 szint × 8 pár (fogalom ↔ definíció; kifejezés ↔ érték; feladat ↔ eredmény).
4. **`ArithmeticSummarySorter.tsx`**: 3 szint × 3 kategória × 9 elem (egész / racionális / irracionális; prím / összetett / egyik sem; < 1 / = 1 / > 1).
5. **`ArithmeticSummaryQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 6 kérdésábrával, 3 puskakártyával.
- `arKit.ts`: belső színkonstansok (nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-sum-szamtan-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic4ArithmeticSummary.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
