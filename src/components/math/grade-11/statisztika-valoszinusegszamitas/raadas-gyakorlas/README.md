# 8. Ráadás – Gyakorlás (tankönyv „Ráadás: Gyakorlás”, 182–183. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 182–183. oldal) alapján kidolgozott oktatási modul. A diákzónában az V. fejezet (Statisztika és valószínűségszámítás) 8. leckéje: klasszikus valószínűségi feladatok gyakorlása, kiegészítve a geometriai valószínűséggel (célba dobás).

---

## 🎯 Tananyag Áttekintés

- Elemi esemény kiválasztása: versenyző, rendezett dobáspár, sorrend, dominókő – egyformán valószínűek legyenek.
- P(A) = kedvező / összes; komplementer: P(A) = 1 − P(nem A); sorrendek száma n!; „blokk”-módszer.
- Két kocka nagyobbik dobása: P(max = k) = (2k − 1)/36, P(max ≤ k) = (k/6)².

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1. Tokió 2020, 13 magyar vívó:** a) nő: 8/13; b) érmes (Szilágyi, Siklósi, Decsi, Gémesi, Szatmári): 5/13; c) 25 évnél fiatalabb: 5/13; d) 30 évnél idősebb: 5/13.
- **2. Védekező erő (a nagyobbik dobás):** a) 5: 9/36 = 1/4; b) legalább 5: 20/36 = 5/9; c) 3: 5/36; d) kisebb, mint 3: 4/36 = 1/9.
- **3. (érettségi, 2005) almák:** jonatán 1,25n, idared n ⇒ P(jonatán) = 1,25/2,25 = 5/9.
- **4. Dominó:** az 1–5-ös kő kivétele után a 27 kőből 12 illeszthető: 12/27 = 4/9.
- **5. Hat gyerek sorban:** a) Sári elöl: 1/6; b) nem Dóri hátul: 5/6; c) Sári 1., Dóri 2.: 1/30; d) egymás mögött: 1/3.
- **6. n ∈ {1, …, 9}:** a) 2ⁿ: 1; b) (1/2)ⁿ: 0; c) log₂ n (n = 1, 2, 4, 8): 4/9; d) log₀,₅ n (csak n = 1): 1/9.
- **HF 1. (érettségi, 2020) sportcsarnok:** a) a D szektor 1. zónája: 4 · 82 − (69 + 96 + 85) = 78 jegy.
- **HF 2. (érettségi, 2019):** a) A relatív gyakorisága 3/9 = 1/3; b) P(A) = 20/36 = 5/9.
- **HF 3. (érettségi, 2018) kulcsok:** 3/4 · 1/3 = 1/4.

> **⚠️ CSAPDA:** a „lehetséges értékek” (pl. a védekező erő 1–6) nem egyformán valószínűek: P(erő = 6) = 11/36, nem 1/6.

> Megjegyzés: a HF 1. táblázatának C és D szektorra vonatkozó 2–3. zónás adatai a forrásszövegben hiányosak, ezért a b) részhez a modul csak a módszert adja meg. Az a) részben a 69, 96, 85 értékeket az 1. zóna A, B, C szektorának vettük (a szöveg elrendezése alapján). A geometriai valószínűség (célba dobás) a TERV.md szerinti kiegészítés, nem tankönyvi feladat.

---

## 💻 Elkészített Komponensek

1. **`ProbabilityBonusPracticeFigures.tsx`**:
   - `ProbabilityBonusPracticeFencersSvg`: a 13 vívó versenyszámonként, életkorral, érmesek ★-gal.
   - `ProbabilityBonusPracticeMaxTableSvg`: a védekező erő (nagyobbik dobás) 6 × 6-os táblázata.
   - `ProbabilityBonusPracticeDominoSvg`: az 1–5-ös kőhöz illeszthető 12 dominó.
   - `ProbabilityBonusPracticeLineupSvg`: hat gyerek sora, Sári–Dóri „blokk”.
   - `ProbabilityBonusPracticeKeysTreeSvg`: Molnár úr kulcsai – valószínűségi fa.
   - segédek: `ProbabilityBonusDominoTile`, `PROBABILITY_BONUS_FENCERS`.
2. **`ProbabilityBonusPracticeTheory.tsx`**: az összes tankönyvi feladat kidolgozva, csapda.
   - **I. Laboratórium:** célba dobás – területarányos véletlen lövések az 5 gyűrűs céltáblára, relatív gyakoriság vs. (2k − 1)/25.
   - **II. Laboratórium:** 1–4 kocka legnagyobb / legkisebb dobásának eloszlása (kⁿ − (k − 1)ⁿ képlettel), 100 dobásos szimulációval.
3. **`ProbabilityBonusPracticeMatcher.tsx`**: 3 szint × 8 pár (védekező erő; sorrendek és kifejezések; feladatok).
4. **`ProbabilityBonusPracticeSorter.tsx`**: 3 szint × 3 kategória × 9 elem (vívók életkora; dobáspárok védekező ereje; P < 1/3, 1/3 ≤ P ≤ 1/2, P > 1/2).
5. **`ProbabilityBonusPracticeQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), kérdéstípus-címkékkel, 18 ábrás kérdéssel (vívótábla, 6 × 6-os rács, dominó, sor, céltábla), 3 puskakártyával (progress id: `g11-stat-raadas-gyakorlas-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic5ProbabilityBonusPractice.test.tsx` fájlban található, a 4 komponenst (100 lövés szimulációjával) és mind az 5 SVG ábrát ellenőrzi.
