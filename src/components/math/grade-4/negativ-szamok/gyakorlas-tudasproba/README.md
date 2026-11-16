# 4. Gyakorlás, tudáspróba (tankönyv 87–92. oldal, munkafüzet I. 82–89. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 87–92. oldal) és munkafüzet (`OH-MAT04MA_I`, 82–89. oldal) alapján kidolgozott fejezetzáró modul. A diákzónában ez a IV. fejezet 4. leckéje, amely az 1–3. lecke anyagát kéri számon.

---

## 🎯 Tananyag Áttekintés

- **1. lecke anyaga (TK 87–89., MF 82–83.)**: hőmérő leolvasása, fagypont (0 °C), településtáblázat (Budapest 3 °C … Zabar −10 °C), Manó grafikonja, tengerszint (0 m), emeletek, −17 °C + 10 fok = −7 °C.
- **2. lecke anyaga (TK 90–91., MF 84–86.)**: számegyenes (a 0-tól balra negatív, jobbra pozitív), ellentett számok, „Melyik számra gondoltam?”, szöcskeugrások, számszomszédok (−15: −20, −16, −14, −10), 100-as és 1000-es osztásköz, búvárok mélysége.
- **3. lecke anyaga (TK 89–92., MF 83–87.)**: összehasonlítás és sorba rendezés, nyitott mondatok (−3 < □ < 15: 17 egész szám; 20 > △ > −5: 24 egész szám), hőmérséklet-változás a 0-n át és a 0 egyik oldalán, szabálytáblázat (▲ = ● − 3 °C), fabatkás készpénz–adósság modell, vagyonváltozás.
- **Munkafüzet I. 88–89. („Ellenőrizd a tudásodat!”)**: a fejezet ellenőrző oldala főleg a III. fejezet írásbeli műveleteit kéri; a negatív számokhoz a 3. feladat tartozik (hőmérők leolvasása és növekvő sorrendbe rendezése) – ez a tudáspróbában a hőmérős és sorrendes kérdésekben szerepel.

> **⚠️ CSAPDA:** −20 > −10? Nem! A mínusz után álló nagyobb szám kisebb értéket jelent: −20 < −10.

### A régi README javított hibái
- A mappához korábban nem tartozott README; ez a fájl a tankönyv és a munkafüzet oldalai alapján készült.

---

## 💻 Elkészített Komponensek

1. **`NegativesExamFigures.tsx`**:
   - `ExamOverviewSvg`: a fejezet három eszköze (hőmérő, számegyenes, fabatka-pénztárca).
   - `ChangeRuleSvg`: változás a 0 egyik oldalán (kivonás) és a 0-n át (összeadás).
   - `TempLadderSvg`: hőmérsékletlétra (18 °C … −30 °C).
   - `HeightDepthSvg`: zászló 400 m, hal −50 m – különbség 450 m.
   - A kvízábrákhoz az 1–3. lecke segédjeit használja (`ThermoGroup`, `NumberLineGroup`, `WalletGroup`, `TempChangeSvg`, `DayGraphSvg`, `DiversSvg`).
2. **`NegativesExamTheory.tsx`**: „Amit már tudsz” összefoglaló a 3 leckéről, sorba rendezés, változások, kidolgozott vegyes feladatok, „Vigyázz!” csapda. Exportálja: `makeNegTask`, `normalizeAnswer`, `TF_STATEMENTS`.
   - **I. labor:** vegyes feladatgyár 7 feladattípussal (változás, hány fokot, < vagy >, ellentett, számszomszéd, szöcske, fabatka), beírt válasz ellenőrzésével, mínuszjel-gombbal és pontszámlálóval.
   - **II. labor:** „Igaz vagy hamis?” – a tankönyv (89. o., 6.) és a munkafüzet (84. o., 8.) állításai, magyarázattal és pontokkal.
3. **`NegativesExamMatcher.tsx`**: 3 szint × 8 pár (helyzetek és ellentettek; számegyenes, hőmérő, pénztárca; különbségek).
4. **`NegativesExamSorter.tsx`**: 3 szint × 3 kategória × 9 elem (negatív / 0 / pozitív; −10 alatt / −10 és 0 között / 0 felett; nőtt / csökkent / nem változott).
5. **`NegativesExamQuiz.tsx`**: **90 kérdés** (30 / szint), az 1–3. lecke anyagából; kb. a kérdések fele ábrás (hőmérő, számegyenes, pénztárca, változásnyíl, grafikon, búvárdiagram), 3 puskakártya. A gyakori típusokat építőfüggvények készítik (`readQ`, `oppQ`, `cmpQ`, `hopQ`, `walletQ`, `changeQ`, `diffQ`, `orderQ`), tipikus gyerekhibákból képzett rossz válaszokkal.

Azonosítók: kvíz `g4-neg-tudasproba-quiz`, párosító `g4-neg-tudasproba-matcher`, csoportosító `g4-neg-tudasproba-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic4NegativesExam.test.tsx` (4 komponens, 4 SVG ábra, 90 kérdés szerkezete és kiválasztott helyes válaszai, feladatgenerátor).
