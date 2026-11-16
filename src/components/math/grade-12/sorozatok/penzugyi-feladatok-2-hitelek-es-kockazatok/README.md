# 9. Pénzügyi feladatok II. – hitelek és kockázatok (30. lecke, 68–69. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 30. lecke, 68–69. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a II. Sorozatok fejezet **9.** leckéje.

---

## 🎯 Tananyag Áttekintés

Hitelfelvétel és -törlesztés: minden időszak végén előbb a kamat adódik a tartozáshoz, majd a törlesztőrészlet csökkenti. Egyösszegű visszafizetés, „csak kamat” konstrukció, **egyenlő törlesztőrészletek** mértani sorozattal; tőke- és kamatrész; a befektetések és hitelek **kockázatai**.

---

## 📐 Elmélet

- A bank a már kifizetett rész után nem számol kamatot, ezért az egyenlő részletet az egyre csökkenő tartozással, mértani sorozattal határozzuk meg (nem az egyösszegű tartozás n-ed része).
- T · qⁿ = x · (qⁿ⁻¹ + … + q + 1) = x · (qⁿ − 1)/(q − 1) ⇒ x = T · qⁿ · (q − 1)/(qⁿ − 1).
- A törvény külön kezeli a tőkét és a kamatot: minden részletben kifizetjük az időszak kamatát, a többi a tőkét csökkenti.
- **Kockázatok:** devizahitel (árfolyamváltozás), változékony értékű befektetések (deviza, részvény, startup); mérésükre a szórás ad lehetőséget.

### Kidolgozott feladat
- **Tamás:** 2 000 000 Ft, 3 év, évi 10%. a) egy összegben: 2 662 000 Ft; b) 3 egyenlő részlet: 2 662 000 = 3,31x ⇒ x ≈ **804 230 Ft** (összesen 2 412 690 Ft).

### Tankönyvi feladatok (a modulban feldolgozva, ellenőrzött eredmények)
- **1.** 2 000 000 Ft, 1 év, 8%: 2 160 000 Ft.
- **2.** 2 év, 8%, az 1. év végén csak kamat: 160 000 Ft, majd 2 160 000 Ft.
- **3.** 3 év, 8%, az 1–2. év végén 500 000 Ft: a 3. év végén 1 396 224 Ft.
- **4.** Antal (200 000 Ft, 10%, 4 × 63 095 Ft): kamat 20 000 / ≈ 15 691 / ≈ 10 950 / ≈ 5 736 Ft; tőketörlesztés 43 095 / 47 404 / 52 145 / 57 359 Ft; fennmaradó tőke 156 905 / ≈ 109 501 / ≈ 57 356 / −3 Ft (a pontos részlet ≈ 63 094,16 Ft; a kerekített 63 095 Ft-tal Antal kb. 3 Ft-ot túlfizet, a kamatrészek összege 52 377 Ft).
- **5.** Kálmán (1 000 000 Ft, évi 12%, negyedéves részletek): ≈ 269 027 Ft.
- **HF 1.** Judit: 38 500 / 350 000 = 11%; a 2. év végén 388 500 Ft.
- **HF 2.** Szilárd (500 000 Ft, 13%, 3 év): ≈ 211 761 Ft; tábla: kamat 65 000 / ≈ 45 921 / ≈ 24 362 Ft, tőketörlesztés ≈ 146 761 / ≈ 165 840 / ≈ 187 399 Ft.

> **⚠️ CSAPDA:** az egyenlő részlet nem az egyösszegű tartozás harmada (2 662 000 : 3 ≈ 887 333 Ft), mert a befizetett részletek után már nincs kamat.

A korábbi README THM-ről, kamatkockázatról és inflációról szóló részei nem szerepelnek a tankönyvben, ezért kimaradtak.

---

## 💻 Elkészített Komponensek

1. **`FinanceLoansFigures.tsx`**:
   - `LoanCycleSvg`: tartozás → kamat → törlesztés körforgás.
   - `AnnuityTableSvg`: Tamás táblázata és a 3,31x = 2 662 000 egyenlet.
   - `DebtStepsSvg`: Tamás tartozásának „fűrészfog” grafikonja.
   - `AmortizationBarsSvg`: Antal részleteinek kamat- és tőkerésze.
   - `CurrencyRiskSvg`: devizahitel forintban mért tartozása változó árfolyamon (a tankönyvben ehhez nincs ábra és adat – saját szemléltetés, ezt jelzi az ábra is).
2. **`FinanceLoansTheory.tsx`**: elmélet, Tamás kidolgozott feladata, feladatok táblázata, Antal és Szilárd törlesztőtáblája, kockázatok, csapda.
   - **I. Laboratórium:** törlesztőtábla-generátor – hitel, kamatláb, futamidő, éves / negyedéves / havi törlesztés; részlet, teljes visszafizetés, kamatteher, soronkénti tábla és kamat/tőke oszlopdiagram.
   - **II. Laboratórium:** árfolyamkockázat – euróhitel havi részlete forintban az árfolyam függvényében.
3. **`FinanceLoansMatcher.tsx`**: 3 szint × 8 pár (fogalmak; képletek; tankönyvi feladatok).
4. **`FinanceLoansSorter.tsx`**: 3 szint × 3 kategória × 9 elem (visszafizetési mód; kamatrész / tőkerész / tartozás; igaz / hamis / függ).
5. **`FinanceLoansQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 7 kérdésábrával, 3 puskakártyával.
- Rajzsegédek: `../a-mertani-sorozat-elso-n-tagjanak-osszege/seqKit.tsx`.

Aktivitás-azonosítók: `g12-seq-hitelek-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic2FinanceLoans.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
