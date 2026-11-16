# 4. Algebra – összefoglalás (Rendszerező összefoglalás, 116–127. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., Rendszerező összefoglalás – „Számtan, algebra” blokk, 116–127. oldal; az algebrai fogalmak a 118. oldalon) alapján kidolgozott érettségi ismétlő modul. A diákzónában ez a rendszerező összefoglalás fejezet **4.** leckéje; a blokk számtani része a **3. leckében** (`szamtan`) található.

---

## 🎯 Tananyag Áttekintés

A tankönyvi „FOGALMAK, TÉTELEK, MÓDSZEREK” táblázat algebrai sorai:

- **T** Nevezetes azonosságok: (a ± b)² = a² ± 2ab + b², (a + b)(a − b) = a² − b².
- **D** Egyenlet alaphalmaza, megoldáshalmaza; **M** mérlegelv; **M** ekvivalens átalakítás (nem ekvivalens lehet: ismeretlennel szorzás/osztás, hatványozás, gyökvonás).
- **D** Másodfokú egyenlet általános alakja; **T** megoldóképlet; **D** diszkrimináns (D > 0, D = 0, D < 0); **T** gyöktényezős alak.
- Gyökös, exponenciális és logaritmusos egyenletek és egyenlőtlenségek, egyenletrendszerek (a kidolgozott feladatok és a Ráadás alapján).

### Kidolgozott feladatok
- **1.** 3x² − 12x = 3x(x − 4), 3x² − 12 = 3(x − 2)(x + 2), 3x² − 12x + 12 = 3(x − 2)²; megoldáshalmazok {0; 4}, {2; −2}, {2}.
- **2.** 3x² − 8x − 35 = 3(x + 7/3)(x − 5); a < 0 egyenlőtlenség egész megoldásai {−2; …; 4} (grafikus és előjeltáblázatos megoldás).
- **4.** √(3 − 7x) = −2: nincs megoldás; √(4x − 3) = x − 6: M = {13} (x = 3 hamis gyök).
- **5.** Két kft.: (4/5)x + 1,1y = 4300, (5/6)x + 1,05y = 4230 ⇒ x = 1800, y = 2600.
  **Javított tankönyvi elírás:** a megoldás ellenőrzésében a II. változatnál „3120 darab” és „4300 darab” áll; helyesen 2600 · 1,05 = 2730 és 1500 + 2730 = 4230 darab.
- **Ráadás 1.** lg(5 − 6x) ≤ −2 ⇒ [499/600; 5/6[; 0,3⁴ˣ⁻¹ < 0,09⁻³ ⇒ x > −5/4. **Ráadás 2.** xˣ⁺³ = x⁷ ⇒ 0; 1; 4.

### Tankönyvi feladatok (a modulban feldolgozva)
- **A5.** −2x² + 8x + 1, értéke x = −1/2-nél −3,5. **A8.** D = −8, nincs valós gyök. **A9.** (−1; 2). **A10.** 3b(2ab − 3), 3(x − 2)².
- **B3.** Antal 12 éves. **B6.** x = ±3/2. **B8.** x < 7/3.
- **P1.** a) x = 3; b) −2 ≤ x ≤ 3 (hat egész); c) √(x − 6) + (x + 6)² = 0-nak nincs megoldása. **P2. b–c)** 2,625 óra, 118,125 km; 50 és 42 év. **P3. b)** ≈ 0,83 km. **P4.** 8 fő; 35 880 Ft (56%).
- **Q3.** negatív megoldások: −1/2, illetve −1. **Q5. a)** macskaeledel 150 Ft, kutyaeledel 500 Ft.

> **⚠️ CSAPDA:** négyzetre emelés után hamis gyök keletkezhet – ellenőrizz; negatív számmal szorzáskor és 1-nél kisebb alapú exponenciális/logaritmusos lépésnél a relációjel megfordul.

---

## 💻 Elkészített Komponensek

1. **`AlgebraSummaryFigures.tsx`**:
   - `SquareIdentitySvg`: (a + b)² területes szemléltetése, a három nevezetes azonosság.
   - `FactoringSvg`: a kidolgozott 1. feladat három szorzattá alakítása és megoldáshalmaza.
   - `ParabolaSignSvg`: 3x² − 8x − 35 < 0 grafikus megoldása, egész megoldások.
   - `RootEquationSvg`: √(4x − 3) és x − 6 grafikonja, a valódi (13) és a hamis (3) gyök.
   - `LinearSystemSvg`: az A9. egyenletrendszer két egyenese és metszéspontja (−1; 2).
2. **`AlgebraSummaryTheory.tsx`**: fogalomtár (D/T/M táblázat), kidolgozott feladatok (szorzattá alakítás, másodfokú egyenlőtlenség, gyökös egyenlet, egyenletrendszer, exponenciális/logaritmusos egyenlőtlenség, esetszétválasztás), a blokk feladatai, csapda.
   - **I. Laboratórium:** másodfokú egyenlet és egyenlőtlenség – a, b, c és reláció megadása, diszkrimináns, gyökök, gyöktényezős alak, megoldáshalmaz, parabola automatikus skálázással.
   - **II. Laboratórium:** kétismeretlenes lineáris egyenletrendszer – megoldás, ellenőrzés, a két egyenes ábrája (egy / nincs / végtelen sok megoldás).
3. **`AlgebraSummaryMatcher.tsx`**: 3 szint × 8 pár (azonosságok és képletek; szorzattá alakítás; egyenlet ↔ megoldáshalmaz).
4. **`AlgebraSummarySorter.tsx`**: 3 szint × 3 kategória × 9 elem (egyenlettípus; diszkrimináns szerinti gyökszám; egyenlőtlenség megoldáshalmazának alakja).
5. **`AlgebraSummaryQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 5 kérdésábrával, 3 puskakártyával.
- `plotKit.tsx`: belső koordináta-rendszer- és görberajzoló segédek (nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-sum-algebra-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic4AlgebraSummary.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
