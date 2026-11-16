# 1. Halmazok, logika – összefoglalás (Rendszerező összefoglalás, 108–115. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., Rendszerező összefoglalás – „Halmazok, logika, kombinatorika, gráfok” blokk, 108–115. oldal) alapján kidolgozott érettségi ismétlő modul. A diákzónában ez a rendszerező összefoglalás fejezet **1.** leckéje; a blokk kombinatorikai és gráfelméleti része a **2. leckében** (`kombinatorika-grafok`) található.

---

## 🎯 Tananyag Áttekintés

A halmaz és a halmaz eleme alapfogalom (nem definiáljuk). A tankönyvi „FOGALMAK, TÉTELEK, MÓDSZEREK” táblázat halmazos és logikai sorai (D = definíció, T = tétel, M = módszer):

- **M** Halmaz megadása: tulajdonsággal, felsorolással, jelekkel/ábrával, halmazműveletekkel; Venn-diagram.
- **D** Halmazok egyenlősége, üres halmaz (∅), véges és végtelen halmaz, számosság (|A|).
- **D** Részhalmaz (A ⊆ B), valódi részhalmaz (A ⊂ B), unió, metszet, különbség (A ∖ B), komplementer (Ā = H ∖ A).
- **T** Szitaformula: |A ∪ B| = |A| + |B| − |A ∩ B|; három halmazra |A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |A ∩ C| − |B ∩ C| + |A ∩ B ∩ C|.
- **D** Állítás, logikai érték, tagadás (¬A), VAGY (A ∨ B), ÉS (A ∧ B), kizáró vagy, implikáció (A → B), ekvivalencia (A ↔ B) – igazságtáblázatokkal.
- **M** Állítás megfordítása (A → B megfordítása B → A; logikai értékük független).

### Kidolgozott feladat
- **1.** Avatar / Mátrix / Gladiátor: 17 + 18 + 13 = x + 2x + 3x ⇒ x = 8, az osztály 32 fős.

### Tankönyvi feladatok (a modulban feldolgozva)
- **A1.** 120 és 150 osztói: A ∩ B = {1; 2; 3; 5; 6; 10; 15; 30}, A ∖ B = {4; 8; 12; 20; 24; 40; 60; 120}.
- **A2., B8.** Végtelen halmazok: ℕ ∩ ℝ, ℕ ∪ ℝ, ℝ ∖ ℕ (ℕ ∖ ℝ = ∅); ℝ ∩ ℤ, ℤ ∩ ℕ, ℝ ∖ ∅ (ℝ ∩ ∅ = ∅ ∖ ℝ = ∅).
- **A3.** |A| = 10, |B| = 13: |A ∩ B| ≤ 10, |B ∖ A| ≥ 3.
- **A10., B10.** „Minden …” tagadása: „Van olyan …, amely nem …”.
- **A11., B4.** Logikai értékek (A ∧ ¬B, A ∨ ¬B).
- **B1.** A = {1; 2; 3; 4; 5; 6}, B = {1; 2; 3; 6; 7; 8; 9}. **B2.** [2; 6] ∪ [3; 10] = [2; 10], metszet [3; 6].
- **B7.** „Ha |a| = |b|, akkor a = b” hamis, megfordítása igaz.
- **P1. a)** Úszás (szita): 3n = 105, n = 35, csak pénteken 9 gyerek. **P3. b–c)** csonkagúla-állítás és megfordítása.
- **Q1. b)** 100-nál kisebb, 2-vel, 7-tel, 11-gyel sem osztható számok: 39. **Q4. a)** németes nyelvvizsga: 7 tanuló.

> **⚠️ CSAPDA:** a „minden” tagadása nem a „semelyik”; egy igaz állítás megfordítása lehet hamis; szitánál a metszetet le kell vonni.

---

## 💻 Elkészített Komponensek

1. **`SetsLogicSummaryFigures.tsx`**:
   - `SubsetSvg`: részhalmaz, valódi részhalmaz, egyenlő halmazok.
   - `SetOperationsSvg`: unió, metszet, különbség, komplementer Venn-diagramon.
   - `SieveFormulaSvg`: szitaformula három halmazra.
   - `MovieVennSvg`: a kidolgozott filmes feladat Venn-diagramja.
   - `TruthTablesSvg`: ¬, ∨, ∧, kizáró vagy, →, ↔ igazságtáblázata.
2. **`SetsLogicSummaryTheory.tsx`**: fogalomtár (D/T/M táblázat), szitaformula, kidolgozott feladat, logika, tagadás és megfordítás, a blokk feladatai, csapda.
   - **I. Laboratórium:** háromhalmazos Venn-diagram – tartományonkénti elemszámok, választható művelet satírozással, szitaformula élő ellenőrzéssel.
   - **II. Laboratórium:** igazságtáblázat-építő (A, B kapcsolók, 8 művelet, kiemelt sor).
3. **`SetsLogicSummaryMatcher.tsx`**: 3 szint × 8 pár (jelölések; műveletek konkrét halmazokkal; logikai műveletek, tagadás).
4. **`SetsLogicSummarySorter.tsx`**: 3 szint × 3 kategória × 9 elem (véges / végtelen / üres; igaz / hamis / nem állítás; A ∩ B / A ∖ B / B ∖ A).
5. **`SetsLogicSummaryQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 6 kérdésábrával, 3 puskakártyával.
- `vennKit.tsx`: belső Venn-diagram-rajzoló (2 vagy 3 halmaz, tetszőleges régiók satírozása; nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-sum-halmazok-logika-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic4SetsLogicSummary.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
