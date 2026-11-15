# 6. Pénzügyi számítások (tankönyvi 31. lecke, 94–95. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 94–95. oldal) alapján kidolgozott oktatási modul. A diákzónában a III. fejezet 6. része.

---

## 🎯 Tananyag Áttekintés

A lecke egy családi beszélgetéssel indul: a nagyszülők 500 000 Ft-ot tennének bankba évi 6%-os kamatos kamatra 10 évre – megduplázódik-e a pénz? A kamatos kamat azt jelenti, hogy minden év végén az év eleji értékhez hozzáadják a 6%-át, azaz 1,06-dal szoroznak: 500 000 · 1,06¹⁰ ≈ **895 424 Ft**, tehát **nem** duplázódik meg.

### Kidolgozott feladatok
1. **Legalább mekkora kamatláb mellett duplázódna meg 10 év alatt?** 500 000 · x¹⁰ = 1 000 000 ⇒ x¹⁰ = 2 ⇒ x = ¹⁰√2 ≈ 1,072 ⇒ **≈ 7,2%**.
2. **Évi 6% mellett legalább hány év alatt duplázódna meg?** 1,06ˣ = 2 – egyelőre próbálgatással: 1,06¹¹ ≈ 1,898, 1,06¹² ≈ 2,012 ⇒ **12 év**.

---

## 📐 Fő Fogalmak

- **Kamatos kamat:** ha A forintot n évre (ciklusra) kötünk le p%-os évi kamatláb mellett, a felnövekedett összeg **Aₙ = A · (1 + p/100)ⁿ**.
- Ha **Aₙ** a kérdés: hatványozás és szorzás. Ha **p** a kérdés: n-edik gyök (1 + p/100 = ⁿ√(Aₙ/A)). Ha **n** a kérdés: egyelőre próbálgatás (a logaritmus később adja a pontos módszert).
- **Értékcsökkenés** p%-kal évente: szorzó 1 − p/100.
- **Kamatadó:** csak a kamatra (a növekményre) számítják fel, kivételkor.

### Tankönyvi feladatok (node-dal ellenőrzött eredmények)
- **1.** Benzin ötször 106%-ra: a) 1,06⁵ ≈ 1,338-szoros; b) ≈ 33,8%-os növekedés.
- **2.** 600 ezer Ft, 3 év, 6,5%: a) 600 000 · 1,065³ ≈ 724 770 Ft, növekmény ≈ 124 770 Ft; b) 15% kamatadóval kézhez ≈ 706 054 Ft.
- **3.** 10 év alatt a) másfélszeres: ≈ 4,14%; b) kétszeres: ≈ 7,18%; c) háromszoros: ≈ 11,61%.
- **4.** a) 3,5 M Ft, −20%/év, 3 év: veszteség 1 708 000 Ft; b) 2,5 M Ft, −12%/év, 3 év: veszteség 796 320 Ft; c) 4 éves autó új ára: 2 500 000 / (0,8³ · 0,88) ≈ 5 548 651 Ft.
- **5. (Érettségi, 2011)** 2 152 000 · x⁵ = 900 000 ⇒ x ≈ 0,84 ⇒ évi **16%** csökkenés.
- **HF 1.** a) 1,5 M · 1,18⁵ ≈ 3 431 637 Ft; b) ⁵√2 ≈ 1,1487 ⇒ ≈ 14,87%; c) 1,18⁶ ≈ 2,70, 1,18⁷ ≈ 3,19 ⇒ 7 év.
- **HF 2.** a) 1,075⁹ ≈ 1,917, 1,075¹⁰ ≈ 2,061 ⇒ 10 év; b) 16% adóval 1,075ⁿ ≥ 1 + 1/0,84 ≈ 2,190 ⇒ 11 év.
- **HF 3.** Nadrág (1000 Ft, hetente +5%): 5 hét 1,276 / 276 Ft; 10 hét 1,629 / 629 Ft (tankönyv: ≈ 630); 20 hét ≈ 2,65 (tankönyv: ≈ 2,65); … 50 hét 11,467 / 10 467 Ft.

> **⚠️ CSAPDA:** A százalékok nem adódnak össze: ötször 6% nem 30%, hanem 1,06⁵ ≈ 1,338 ⇒ 33,8%. A kamatadó nem a teljes összegre, csak a kamatra vonatkozik.

---

## 💻 Elkészített Komponensek

1. **`FinancialCalcFigures.tsx`**:
   - `FinancialCalcCompoundSvg`: 500 000 Ft növekedése 10 éven át (oszlopdiagram, 2A szint).
   - `FinancialCalcFormulaSvg`: az Aₙ = A · (1 + p/100)ⁿ képlet részei.
   - `FinancialCalcDoublingSvg`: 1,06ˣ = 2 próbálgatással (1,06¹⁰, 1,06¹¹, 1,06¹² számegyenesen).
   - `FinancialCalcSimpleVsCompoundSvg`: egyszerű (lineáris) és kamatos (exponenciális) kamat.
   - `FinancialCalcDepreciationSvg`: az autó értékcsökkenése évi 20%-kal.
2. **`FinancialCalcTheory.tsx`**: bevezető, két kidolgozott feladat, elmélet (három esettípus), feladatmegoldások (benzin, kamatadó, kamatláb gyökvonással, autók, érettségi, házi feladatok, nadrág-táblázat), csapda.
   - **I. Laboratórium:** kamatoskamat-kalkulátor növekedési grafikonnal – tőke, kamatláb (0,5–20%), futamidő (1–40 év), kamatadó (0/15/16%), egyszerű kamat összehasonlítás, duplázódási idő.
   - **II. Laboratórium:** hiányzó adat – szükséges évi változás gyökvonással, futamidő próbálgatással (növekedés és értékcsökkenés), tankönyvi előbeállításokkal.
3. **`FinancialCalcMatcher.tsx`**: 3 szint × 8 pár (százalék ↔ szorzó; hatványok/gyökök értéke; feladat ↔ eredmény).
4. **`FinancialCalcSorter.tsx`**: 3 szint × 3 kategória × 9 elem (nő / csökken / nem változik; hatványozás / gyökvonás / próbálgatás; < 2, 2–3, > 3-szoros).
5. **`FinancialCalcQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), minden kérdésen típus-címke, 4 kérdésen ábra, 3 puskakártya (progress id: `g11-exp-penzugyek-quiz`; matcher: `g11-exp-penzugyek-matcher`, sorter: `g11-exp-penzugyek-sorter`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic3FinancialCalc.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
