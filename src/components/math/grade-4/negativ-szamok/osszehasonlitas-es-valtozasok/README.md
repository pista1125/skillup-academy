# 3. Összehasonlítás és változások (tankönyv 89–92. oldal, munkafüzet I. 83–87. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 89–92. oldal) és munkafüzet (`OH-MAT04MA_I`, 83–87. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a IV. fejezet 3. leckéje.

---

## 🎯 Tananyag Áttekintés

- **9. feladat (90. o.)**: számkártyák −2, −6, −5, 8, 0, −8, −14, 11 – legkisebb −14, legnagyobb 11; negatív számok; 1-nél kisebb számok; −3-nál nagyobb számok (−2, 0, 8, 11).
- **10. feladat (90. o.)**: nyitott mondatok a számegyenes segítségével: −3 < □ < 15, 20 > △ > −5, −17 < ○ < −13 (−16, −15, −14).
- **6. feladat (89. o.) és munkafüzet 84. o., 8. feladat**: igaz/hamis állítások a hőmérsékletekről (−5 °C → 2 °C: 7 °C melegedés; −4 °C → −8 °C: 4 °C hűlés; −11 °C → 3 °C: 14 °C emelkedés; a −16 °C nem hidegebb a −17 °C-nál).
- **Munkafüzet I. 83.**: hőmérsékletek csökkentése (−15 − 6 → −21 °C, 15 − 35 → −20 °C, −10 − 6 → −16 °C, 10 − 35 → −25 °C); relációs jelek (−89 °C < −45 °C < −3 °C < 0 °C < 3 °C); „Hány °C-kal lett hidegebb?” (15, 28, 20, 3, 9, 26).
- **Munkafüzet I. 84.**: növekvő (−17, −7, −5, −2, 0, 13) és csökkenő (25, 6, 1, −4, −8, −10) sorrend.
- **Munkafüzet I. 85.–86.**: szabálytáblázat ▲ = ● − 3 °C (−6/−3, −13/−10, −8/−5, −7/−4); „A −1 nagyobb, mint a −2”, „A −20 kisebb, mint a −10” nyitott mondattal.
- **16–20. feladat (92. o.)**: fabatkás modell – piros kör = 1 fabatka készpénz, kék négyzet = 1 fabatka adósság, egy pár együtt 0; a 17. feladat cédulái: 7 és 2 → 5, 9 és 10 → −1, 9 és 13 → −4, 6 és 3 → 3; Kriszti 500 Ft és 200 Ft adósságcédula → 300 Ft; Zita 690 − 500 = 190 Ft kölcsön.
- **Munkafüzet I. 87.**: pénztárcák vagyona (−10 Ft / 10 Ft jelekkel), 2080 Ft tartozás 50 Ft-tal → még 2030 Ft; vagyonváltozás n/cs nyíllal (1500 → 2000: +500; 2500 → 1800: −700; 500 → −1000: −1500; 5500 → −2000: −7500; −1500 → 2000: +3500; −1500 → −5000: −3500).

> **⚠️ CSAPDA:** ha a hőmérséklet átlépi a 0-t, nem kivonunk, hanem összeadjuk a két részt: −5 °C → 2 °C = 5 + 2 = 7 fok (nem 3).

### A régi README javított hibái
- LaTeX-jelölések ($<$, $>$) helyett a tankönyv jelölése.
- A régi tartalomból hiányzott a tankönyv fabatkás készpénz–adósság modellje és a vagyonváltozás; ezek most szerepelnek.

---

## 💻 Elkészített Komponensek

1. **`NegativeChangesFigures.tsx`**:
   - `CompareLineSvg`: a 9. feladat számkártyái a számegyenesen.
   - `TempChangeSvg`: „Hány °C-kal lett hidegebb?” nyíl (munkafüzet 83. o.).
   - `FabatkaSvg`: Zsuzsi pénztárcája törlesztés előtt és után.
   - `DebtSlipSvg`: Kriszti pénztárcája és az adósságcédula.
   - `WealthChangeSvg`: a vagyonváltozás hat nyila (`WEALTH_CHANGES`).
   - Segédek: `MiniLine`, `WalletGroup`, `CARD_NUMBERS`, `fmtNum`.
2. **`NegativeChangesTheory.tsx`**: Mit tanulunk?, nyitott mondatok, igaz/hamis állítások, hőmérséklet-változás (0-n át / 0 egyik oldalán), fabatkák, vagyonváltozás, „Vigyázz!” csapda. Exportálja: `wealth`, `tempDiff`, `sortTemps`, `ORDER_SETS`, `FABATKA_TARGETS`.
   - **I. labor:** fabatka-pénztárca – készpénz és adósság hozzáadása/kivétele, törlesztés gomb, a kért vagyon (pl. 4, −1, −4) kirakása ellenőrzéssel, az érték a számegyenesen is látszik.
   - **II. labor:** „Rendezd sorba!” – a tankönyv és a munkafüzet hőmérsékleteit kell növekvő/csökkenő sorrendben kattintani, rossz választásnál tipp.
3. **`NegativeChangesMatcher.tsx`**: 3 szint × 8 pár (kisebb/nagyobb, hány fokkal lett hidegebb, vagyonváltozás).
4. **`NegativeChangesSorter.tsx`**: 3 szint × 3 kategória × 9 elem (−3 és 3 viszonyában; változás nagysága; vagyon törlesztés után).
5. **`NegativeChangesQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), ábrákkal (számegyenes, számkártyák, pénztárca, adósságcédula, változásnyíl), 3 puskakártyával.

Azonosítók: kvíz `g4-neg-valtozasok-quiz`, párosító `g4-neg-valtozasok-matcher`, csoportosító `g4-neg-valtozasok-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic4NegativeChanges.test.tsx` (4 komponens, 5 SVG ábra, kvízszerkezet, vagyon-, változás- és sorrendszámítás).
