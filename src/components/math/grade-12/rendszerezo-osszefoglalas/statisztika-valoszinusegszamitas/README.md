# 10. Statisztika, valószínűségszámítás – rendszerező összefoglalás (166–174. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., Rendszerező összefoglalás, „Statisztika, valószínűségszámítás” blokk, 166–174. oldal) alapján kidolgozott érettségi ismétlő modul. A diákzónában ez a IV. Rendszerező összefoglalás fejezet **10.** leckéje.

---

## 🎯 Tananyag Áttekintés

Leíró statisztika (átlag, módusz, medián, kvartilisek, terjedelem, félterjedelem, szórás, relatív gyakoriság, oszlop-, kör- és dobozdiagram) és valószínűségszámítás (elemi esemény, eseménytér, műveletek eseményekkel, kizáró és független események, a valószínűség tulajdonságai, klasszikus és geometriai valószínűség, várható érték, visszatevéses és visszatevés nélküli mintavétel).

---

## 📐 Fogalmak, tételek, módszerek (tankönyvi táblázat)

- **D – Átlag, módusz, medián.** Medián: páratlan n-nél a középső, párosnál a két középső átlaga.
- **D – Alsó / felső kvartilis:** páros n-nél az alsó / felső fél mediánja; páratlan n-nél a mediánt elhagyva.
- **D – Terjedelem** (max − min), **félterjedelem** (Q₃ − Q₁), **szórás** σ = √(Σ(xᵢ − x̄)²/n), **relatív gyakoriság** k/n.
- **Diagramok:** oszlopdiagram, kördiagram, dobozdiagram (min; Q₁; medián; Q₃; max).
- **D – Elemi esemény, eseménytér, esemény** (biztos, lehetetlen); **A · B**, **A + B**, **Ā**; **egymást kizáró események**.
- **T – A valószínűség tulajdonságai:** 0 ≤ P(A) ≤ 1; P(biztos) = 1, P(lehetetlen) = 0; kizáróakra P(A + B) = P(A) + P(B); P(Ā) = 1 − P(A).
- **D – Klasszikus modell** (kedvező/összes), **geometriai valószínűség** (mértékek aránya), **független események** (P(A · B) = P(A) · P(B)), **várható érték** (súlyozott átlag).
- **D/T – Mintavételek:** visszatevéses (binomiális) P(k) = C(n; k) · pᵏ · (1 − p)ⁿ⁻ᵏ; visszatevés nélküli P(k) = C(M; k) · C(N − M; n − k)/C(N; n).

### Kidolgozott feladatok
1. **20 dolgozat:** dobozdiagram 16; 30; 40; 46; 50; osztályközepekkel átlag 38, σ² = 97,5, σ ≈ 9,87 (nyers adatokból 37,65 és 9,70).
2. **Úszócsoportok:** 73,28(n + 12) = 871,2 + 74,3n ⇒ n = 8.
3. **Két kocka, a nagyobbik érték:** P = 1/36, 3/36, …, 11/36; E = 161/36 ≈ 4,47.
4. **20 tétel (14 magyar, 6 külföldi), 5 húzás, pontosan 3 magyar:** visszatevés nélkül ≈ 0,352; visszatevéssel C(5; 3) · 0,7³ · 0,3² = 0,3087.
5. **Selejt (p = 0,015), 200 termék, legfeljebb 2 selejtes:** ≈ 0,049 + 0,148 + 0,225 ≈ 0,422.

### Feladatok (a modulban feldolgozva)
- **A rész:** A1 módusz 16, medián 16, átlag 16,6; A2 körcikkek ≈ 110,8°, 138,5°, 110,8°; A4 σ ≈ 0,304; A5 ≈ 45,4 év; A7 1/2; A8 1/12; A9 1/3; A10 240/729 ≈ 0,329; A12 3/28, 5/14, 15/28.
- **B rész:** B1 21 év; B2 44°, 53,6°, 105,6°, 156,8°; B3 a = 33; B5 25 zöld golyó; B6 11/90; B7 1/2; B8 ≈ 0,254; B9 1/8; B10 ≈ 0,0225; B11 4225 Ft; B12 5/12.
- **P és Q rész:** P1 átlag 39,76, σ ≈ 1,28; P3 4096, 1/4096, 1/4, 924/4096 ≈ 0,226; P4 várható érték 1; Q4 d) 91/216 ≈ 0,421; Q5 0,995¹⁰⁰ ≈ 0,606, ≈ 0,394, n ≥ 139.

> **⚠️ CSAPDA:** visszatevés nélkül nem a binomiális képlettel számolunk; az összevont átlag súlyozott átlag; a szórásnál az eltérések négyzetét átlagoljuk.

> **Javítás a korábbi README-hez:** a mappa korábbi README-je a cím alapján készült (pl. általános eloszlás- és képletgyűjtemény, a tankönyvben nem szereplő tartalmakkal, `$…$` jelöléssel). Az új leírás a tankönyv 166–174. oldalának D/T/M táblázatát, kidolgozott feladatait és feladatsorát követi; a jelölések a tankönyviek (A · B, A + B, Ā, σ, E).

---

## 💻 Elkészített Komponensek

1. **`StatProbSummaryFigures.tsx`**:
   - `BoxPlotSvg`: az 1. kidolgozott feladat dobozdiagramja.
   - `ClassHistogramSvg`: osztályok, osztályközepek és gyakoriságok.
   - `DiceMaxTableSvg`: két kocka nagyobbik értékének 6 × 6-os táblázata.
   - `SamplingCompareSvg`: visszatevés nélküli és visszatevéses mintavétel összevetése.
   - `EventVennSvg`: A + B, A · B, Ā Venn-diagramon.
   - `BinomialBarsSvg`: selejtesek számának binomiális eloszlása (n = 200, p = 0,015).
2. **`StatProbSummaryTheory.tsx`**: D/T/M táblázatok (statisztika, valószínűség), 5 kidolgozott feladat, a feladatsor eredményei, csapda.
   - **I. Laboratórium:** szerkeszthető adatsor – átlag, medián, módusz, kvartilisek (tankönyvi definícióval), terjedelem, félterjedelem, szórás, élő dobozdiagram.
   - **II. Laboratórium:** N, M, n, k csúszkák – visszatevéses és visszatevés nélküli valószínűség, a két eloszlás oszlopdiagramja.
3. **`StatProbSummaryMatcher.tsx`**: 3 szint × 8 pár (fogalmak; statisztikai jellemzők; valószínűségek).
4. **`StatProbSummarySorter.tsx`**: 3 szint × 3 kategória × 9 elem (középérték / szóródás / valószínűségi fogalom; klasszikus / binomiális / visszatevés nélküli modell; valószínűség nagysága).
5. **`StatProbSummaryQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 10 kérdésábrával, 3 puskakártyával.
- `sumKit.tsx`: belső rajz- és formázó segédek (nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-sum-statisztika-valoszinuseg-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic4StatProbSummary.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
