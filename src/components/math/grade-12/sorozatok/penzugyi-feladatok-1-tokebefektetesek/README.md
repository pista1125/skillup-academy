# 8. Pénzügyi feladatok I. – tőkebefektetések (29. lecke, 66–67. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 29. lecke, 66–67. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a II. Sorozatok fejezet **8.** leckéje.

---

## 🎯 Tananyag Áttekintés

A pénz értéke az idővel változik. Tőke, kamat, kamatláb; egyszerű és kamatos kamatozás; a kamatláb éves, egyszerű kamatozásra vonatkozó megadása (ezért rövidebb jóváírási periódusnál a hozam nagyobb a kamatlábnál); **gyűjtőjáradék** mint mértani sorozat összege.

---

## 📐 Elmélet

- **Tőke:** a bankba tett, lekötött összeg. **Kamat:** amivel a tőke megnő. **Kamatláb:** a kamat hány százaléka a tőkének.
- **Egyszerű kamatozás:** a kamat nem adódik a tőkéhez. **Kamatos kamatozás:** a kamat a tőkéhez adódik, és vele együtt kamatozik: Kₙ = K₀ · qⁿ, q = 1 + p/100.
- **Periódusok:** negyedéves jóváírás, évi 8% ⇒ negyedévente 2%, egy év alatt 1,02⁴ ≈ 1,0824, azaz 8,24% növekedés. (Kamatadótól eltekintünk.)
- **Gyűjtőjáradék:** egyenlő időszakonként azonos összeg; periódus eleji befizetésnél Sₙ = x · q · (qⁿ − 1)/(q − 1).

### Kidolgozott feladat
- **Dalma:** havonta, a hónap elején 20 000 Ft, évi 6%, havi jóváírás: S₂₄ = 20 000 · 1,005 · (1,005²⁴ − 1)/0,005 ≈ **511 182 Ft** (31 182 Ft-tal több a befizetett 480 000 Ft-nál).

### Tankönyvi feladatok (a modulban feldolgozva, ellenőrzött eredmények)
- **1.** 6 millió → 7 millió Ft 5 év alatt: ≈ 3,13%.
- **2. (Érettségi, 2022)** a) lineáris modell: 50 000 Ft/hó; b) havonta −1%: 2 év után ≈ 4 714 069 Ft (≈ 21,4%-os csökkenés), felére ≈ 69 hónap alatt.
- **3.** Ferenc (2 év 200 000 Ft 7%-on, 2 év 300 000 Ft 9%-on): ≈ 1 209 735 Ft.
- **4.** Havi 10 000 Ft, 10 év, évi 6%, havi jóváírás: ≈ 1 646 987 Ft.
- **5.** Dávid: x · 1,07 · (1,07⁴ − 1)/0,07 = 1 140 000 ⇒ x ≈ 239 963 Ft.
- **HF 1.** A: 1,098² ≈ 1,2056; B: 1,008²⁴ ≈ 1,2107 ⇒ B előnyösebb.
- **HF 2.** 3 millió → 4,7 millió Ft 12 év alatt: ≈ 3,81%.
- **HF 3. (Érettségi, 2008)** a) 500 000 · 1,08¹⁸ ≈ 1 998 010 Ft; b) 36 félév, q³⁶ = 5 ⇒ félévi ≈ 4,57%.
- **HF 4.** Zsuzsa: 5 × 350 000 Ft év elején, 7,5% ⇒ ≈ 2 185 407 Ft.
- A kvízbe a 31. (törölt) Gyakorlás lecke két pénzügyi feladata is bekerült: Anikó gyűjtőszámlája (≈ 7,8%; 9%-on 5 év alatt 1,6 millió Ft) és a Manhattan-ráadás (1626 + 338 = 1964).

> **⚠️ CSAPDA:** havi jóváírásnál a havi kamatláb p/12 %, és a kitevő a hónapok száma; évi 6%-nál a tényező 1,005, nem 1,06.

---

## 💻 Elkészített Komponensek

1. **`FinanceInvestmentsFigures.tsx`**:
   - `SimpleVsCompoundSvg`: egyszerű és kamatos kamat 10 éven át (1 millió Ft, 10%).
   - `QuarterlyCompoundingSvg`: négy negyedéves 2%-os jóváírás ⇒ 8,24%.
   - `SavingsTimelineSvg`: Dalma befizetései és kamatozási idejük.
   - `CarDepreciationSvg`: az autó értéke lineáris és exponenciális modellben.
   - `TwoPhaseSavingsSvg`: Ferenc két szakaszos gyűjtőszámlája évenként.
2. **`FinanceInvestmentsTheory.tsx`**: fogalmak táblázata, periódusok, gyűjtőjáradék kidolgozott feladat, kidolgozott feladatok (1–5.), házi feladatok táblázata, csapda.
   - **I. Laboratórium:** kamatos kamat kalkulátor – tőke, kamatláb, futamidő, jóváírási periódus; egyszerű és kamatos kamat összevetése, valódi éves hozam, grafikon.
   - **II. Laboratórium:** gyűjtőjáradék-kalkulátor – havi vagy éves befizetés, kamatláb, periódusszám; egyenleg, befizetés, kamatjövedelem, grafikon.
3. **`FinanceInvestmentsMatcher.tsx`**: 3 szint × 8 pár (fogalmak; képletek és tényezők; tankönyvi feladatok).
4. **`FinanceInvestmentsSorter.tsx`**: 3 szint × 3 kategória × 9 elem (lineáris / exponenciális növekedés / csökkenés; végösszeg / kamatláb / időtartam; igaz / hamis / függ).
5. **`FinanceInvestmentsQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 6 kérdésábrával, 3 puskakártyával.
- Rajzsegédek: `../a-mertani-sorozat-elso-n-tagjanak-osszege/seqKit.tsx`.

Aktivitás-azonosítók: `g12-seq-tokebefektetes-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic2FinanceInvestments.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
