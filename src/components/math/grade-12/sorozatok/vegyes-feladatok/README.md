# 7. Vegyes feladatok (28. lecke, 64–65. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 28. lecke, 64–65. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a II. Sorozatok fejezet **7.** leckéje.

---

## 🎯 Tananyag Áttekintés

A lecke nem tartalmaz új elméletet: számtani és mértani sorozatos feladatok vegyesen (tagszám, egyenlőtlenségek, geometriai alkalmazás, két érettségi feladat), a Ráadásban a **számtani és mértani közép** tulajdonság és a **négyzetszámok összege**.

---

## 📐 Elmélet (Ráadás)

- **Számtani közép:** számtani sorozatban aₙ = (aₙ₋₁ + aₙ₊₁)/2 – innen a név. Minden tag a tőle szimmetrikusan elhelyezkedő két tag számtani közepe.
- **Mértani közép:** mértani sorozatban aₙ² = aₙ₋₁ · aₙ₊₁; pozitív tagoknál aₙ a szomszédok mértani közepe.
- **Négyzetszámok összege:** 1² + 2² + … + n² = n(n + 1)(2n + 1)/6 (tökpiramis).

### Tankönyvi feladatok (a modulban feldolgozva, ellenőrzött eredmények)
- **1.** a₁ = 5, d = 2, Sₙ = 357 ⇒ n(n + 4) = 357 ⇒ n = 17.
- **2.** a₁ = 16, q = 1,07: a) 62 tag kisebb 1000-nél; b) Sₙ < 1000 ⇒ legfeljebb 24 tag.
- **3.** b₁ = 1, q = 1/2: S₅ = 31/16, S₁₀ = 1023/512, S₁₅ = 32 767/16 384, S₂₀ = 1 048 575/524 288 (≈ 1,938; 1,998; 2,000; 2,000); Sₙ = 2 − (1/2)ⁿ⁻¹ < 2, Bence állítása igaz.
- **4.** Torta: az oldalak aránya 1/√3 (30; 10√3; 10; 10/√3 cm), cukordíszítés ≈ 189,3 cm, alapterületek összege ≈ 577,4 cm², 10% hulladékkal ≈ 641,5 cm² tészta; marcipán (1 cm-es szintekkel számolva) ≈ 579 cm².
- **5. (Érettségi, 2009)** Járólapok: n(n + 7) = 858 ⇒ 26 sor; kimaradt 30 bordó és 12 szürke lap.
- **6. (Érettségi, 2006)** 5q² = 5 + 3d, 5q⁴ = 5 + 15d ⇒ q = ±2, d = 5 (illetve q = ±1, d = 0).
- **HF 2. c)** q = −3, S₁₀ = −7381 ⇒ a₁ = 0,5, a₇ = 364,5.
- **HF 3.** Faiskola: 40, +4, 1020 csemete ⇒ 15 sor.
- **HF 4.** a₁ = 10, Sₙ > 1000: számtani (d = 2) ⇒ 28 tag, mértani (q = 1,2) ⇒ 17 tag.
- **Ráadás 3.** 1 + 4 + 9 + 16 = 30; a képlet n = 9-re 285, n = 7-re 140; 1² + … + 25² = 5525.
- A HF 1. grafikonja, a HF 2. a)–b) (a szövegben sérült törtek) és a tökpiramis képhez kötött b)–c) kérdései nem egyértelműek, ezért nem dolgoztuk fel őket.

> **⚠️ CSAPDA:** két nem szomszédos tagból (pl. a₅ = 4, a₉ = 324) a köztes a₇ = a₅ · q² előjele kötött: a₇ = 36, a −36 nem megoldás.

---

## 💻 Elkészített Komponensek

1. **`MixedSequencesFigures.tsx`**:
   - `ArithVsGeoSvg`: számtani és mértani sorozat pontgrafikonja egy koordináta-rendszerben.
   - `HalvingNumberLineSvg`: 1 + 1/2 + 1/4 + 1/8 + 1/16 a számegyenesen.
   - `TriangleCakeSvg`: a négyszintes torta egymásba írt szabályos háromszögei.
   - `PavingRowsSvg`: Angéla járólapsorai bordó szélekkel.
   - `MeansSvg`: számtani és mértani közép tulajdonság.
   - `PumpkinPyramidSvg`: a tökpiramis és a négyzetösszeg-képlet.
2. **`MixedSequencesTheory.tsx`**: képlettár (számtani ↔ mértani), kidolgozott feladatok (1–6.), házi feladatok tanulságai, Ráadás, csapda.
   - **I. Laboratórium:** felismerő – négy beírt tagról eldönti, hogy számtani, mértani, mindkettő vagy egyik sem; különbségek, hányadosok, a következő tag, pontgrafikon.
   - **II. Laboratórium:** összegverseny – közös a₁, külön d és q csúszka, célérték: melyik részletösszeg-sorozat lépi túl előbb.
3. **`MixedSequencesMatcher.tsx`**: 3 szint × 8 pár (típusfelismerés; középső tagok; szöveges feladatok).
4. **`MixedSequencesSorter.tsx`**: 3 szint × 3 kategória × 9 elem (számtani / mértani / egyik sem; elsőfokú / másodfokú / exponenciális egyenlet; igaz / hamis / függ).
5. **`MixedSequencesQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 8 kérdésábrával, 3 puskakártyával.
- Rajzsegédek: `../a-mertani-sorozat-elso-n-tagjanak-osszege/seqKit.tsx`.

Aktivitás-azonosítók: `g12-seq-vegyes-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic2MixedSequences.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
