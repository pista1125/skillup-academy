# 5. Oszthatóság és logika (46. lecke, 136–139. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 136–139. oldal) alapján kidolgozott oktatási modul. A diákzónában a IV. Számelmélet fejezet **5.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Kidolgozott feladat:** a 40-nél kisebb pozitív egészek halmazai: A = 4-gyel, B = 6-tal, C = 2-vel, D = 24-gyel, E = 12-vel oszthatók.

- **a)** A Venn-diagramon C (páros számok) tartalmazza A-t és B-t; **E = A ∩ B** = {12; 24; 36}, és **D = {24} ⊂ E**.
- **b)** A1 hamis (6 ∈ C); A2 igaz (pl. 2); A3 hamis (ellenpélda 12); A4 igaz (D ⊂ E); A5 igaz (E = A ∩ B); A6 hamis (ellenpélda 4); A7 igaz (az „és” miatt A ∩ B: 3 elem); A8 igaz (a „vagy” miatt A ∪ B: 9 + 6 − 3 = 12 elem).

---

## 📐 Elmélet

1. **Állítás (kijelentés, ítélet):** kijelentő mondat, amelyről egyértelműen eldönthető, hogy igaz vagy hamis (logikai értéke).
2. **Logikai műveletek I.:**
   - tagadás (negáció): igaz, ha az eredeti hamis – halmazos megfelelője a komplementer;
   - „és” (konjunkció): igaz, ha mindkettő igaz – metszet (A ∩ B); a „de” is „és”;
   - megengedő „vagy” (diszjunkció): igaz, ha legalább az egyik igaz – unió (A ∪ B);
   - kizáró „vagy-vagy”: igaz, ha pontosan az egyik igaz.
3. **Minden / van olyan:** a „minden” tagadása „van olyan, amelyre nem”; a „van olyan” tagadása „minden … nem”.
4. **Logikai műveletek II.:** „ha…, akkor” (implikáció) csak akkor hamis, ha az előtag igaz és az utótag hamis (⇔ van ellenpélda); „akkor és csak akkor” (ekvivalencia) igaz, ha a két kijelentés logikai értéke megegyezik.
5. **Állítás és megfordítása:** „ha A, akkor B” megfordítása „ha B, akkor A”. Igaz állítás megfordítása nem biztos, hogy igaz (4 | n ⇒ páros: igaz; páros ⇒ 4 | n: hamis, 6). A 3-mal való oszthatóság szabálya mindkét irányban igaz.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** Kijelentések: a) igaz; b) hamis (számjegyösszeg 22); c) és f) nem kijelentés; d) igaz; e) igaz; g) igaz (a 12-nek 6 osztója van).
- **2.** Tagadások: a) minden számnak 5-től különböző számú pozitív osztója van; b) van olyan prím, amelynek nem pontosan 2 osztója van; c) van olyan természetes szám, amelynek csak véges sok többszöröse van; d) egyik természetes szám sem osztható 0-val.
- **3.** 20-nál kisebb pozitív egészek: a) 3, 6, 15; b) 1, 2, 3, 5, 6, 10, 15; c) 1, 2, 5, 9, 10, 12, 18; d) nincs ilyen szám.
- **4.** a) hamis / megfordítás igaz; b) igaz / megfordítás hamis; c) hamis (2 + 3) / megfordítás hamis; d) hamis (4 és 6) / megfordítás hamis (2 és 3).
- **5.** a) hamis (10); b) igaz; c) hamis (4); d) hamis (2 · 3); e) igaz ([3; 4] = 12).
- **HF 1.** (Érettségi 2010) I. hamis, II. igaz, III. igaz, IV. hamis, V. hamis.
- **HF 2.** (Érettségi 2020) A hamis (8), B igaz, C hamis (4); megfordítások: A′ igaz, B′ hamis (6), C′ igaz.

> **⚠️ CSAPDA:** „4 | n és 6 | n ⇒ 24 | n” hamis (ellenpélda: 12). Helyesen: 4 | n és 6 | n ⇒ [4; 6] = 12 | n. A szorzattal csak relatív prím osztók esetén lehet „összevonni”.

---

## 💻 Elkészített Komponensek

1. **`DivisibilityLogicFigures.tsx`**:
   - `DivisibilityVennSvg`: a kidolgozott feladat Venn-diagramja (A, B, C, D, E halmazok elemekkel).
   - `LogicOperationsTableSvg`: a tagadás, „és”, „vagy”, „vagy-vagy” igazságtáblázata (zöld = igaz, piros = hamis).
   - `QuantifierNegationSvg`: „minden” ↔ „van olyan” tagadása példákkal.
   - `ImplicationConverseSvg`: 4 többszörösei ⊂ páros számok – az állítás igaz, a megfordítás hamis (ellenpélda 6).
   - `ThreeSetVennSvg`: a 3. feladat halmazábrája (30 osztói, 3 és 5 többszörösei 20 alatt).
2. **`DivisibilityLogicTheory.tsx`**: kidolgozott feladat, alapfogalmak, logikai műveletek I–II., minden / van olyan, megfordítás, tankönyvi és házi feladatok, csapda.
   - **I. Laboratórium:** két állítás kiválasztása – élő tagadás, „és”, „vagy”, „vagy-vagy”, „ha…, akkor”, „akkor és csak akkor” logikai értékekkel.
   - **II. Laboratórium:** oszthatósági állítások tesztelője (a, b csúszka) – „ha a | n, akkor b | n”, megfordítása, ekvivalencia, a „szorzat-szabály” ellenpéldával, 1–60 számtábla és az „és / vagy / vagy-vagy” darabszámok.
3. **`DivisibilityLogicMatcher.tsx`**: 3 szint × 8 pár (fogalmak; tagadások; állítások megfordítása).
4. **`DivisibilityLogicSorter.tsx`**: 3 szint × 3 kategória (kijelentés-e; 4 és 6 többszörösei a halmazábrán; állítás és megfordítása igaz-e).
5. **`DivisibilityLogicQuiz.tsx`**: 30 kérdés 3 szinten, kérdéstípus-címkékkel és szükség szerint ábrával, 3 puskakártyával (progress id: `g11-num-oszthatosag-logika-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic4DivisibilityLogic.test.tsx` fájlban található: a 4 komponenst, mind az 5 SVG ábrát és a kvíz 10/10/10-es szintbeosztását ellenőrzi.
