# 8. Gyakorlás, tudáspróba (III. fejezet: Írásbeli műveletek 0-tól 10 000-ig)

Fejezetzáró modul a hivatalos tankönyv (`OH-MAT04TA`, Matematika 4.) **Megálló** és **Kitekintő** oldalai (84–86. és 108–110. o.), valamint a fejezet összes leckéje (70–83. és 93–107. o.) alapján; gyakorló anyag a munkafüzet I. kötet 88–95. („Ellenőrizd a tudásodat!”, „Gyakorolj!”) és II. kötet 4–23. oldaláról. A diákzónában ez a III. fejezet 8. leckéje.

---

## 🎯 Tananyag Áttekintés

- **A fejezet leckéi:** 1. Írásbeli összeadás és kivonás · 2. Írásbeli szorzás egyjegyű számmal · 3. Írásbeli osztás egyjegyű osztóval · 4. A számok tulajdonságai · 5. Összefüggések, következtetések · 6. A műveletek közötti kapcsolatok · 7. A műveletek sorrendje.
- **Tankönyv 84. o. (Megálló):** állatok testhossza diagramon; versenyzők száma 1776 + 1296 + 2070 + 2346 + 1278 = 8766; túzokállomány (1481 a hetede); Vörös Lista 2754 + 2464 + 1 + 1 = 5220 faj.
- **Tankönyv 85. o.:** 1534 · 5 − 7596 = 74, 2225 − 547 · 4 = 37, (6852 − 6778) · 2 = 148 → kétszerező sorozat 296, 592, 1184, 2368, 4736, 9472 → **TISZAFA** (az év fája 2011); év állatai (2811 − 799 = 2012, 576 + 1438 = 2014, 671 · 3 = 2013, 403 · 5 = 2015); számháromszögek és -körök.
- **Tankönyv 86. o. (Kitekintő):** hiányzó számok (■ + 3776 = 4134 → 358; 5766 − ■ = 4793 → 973; ■ · 3 = 2193 → 731; ■ · 5 = 2225 → 445) és számjegyek (3134 + 3796 = 6930, 2347 + 3716 = 6063, 9348 − 2716 = 6632, 134 · 7 = 938); futóverseny 600 m-es körökkel (5. nap 7 kör = 4200 m; 5 km fölött először a 7. napon); sorrendek, logikai táblázat.
- **Tankönyv 108. o. (Megálló):** szorzások, osztások számkártyákból; 1824 negyede 456, négyszerese 7296; hiányzó tényezők (4 · ■ = 3912 → 978 …), kitűzők 9 fajtából (8055 : 9 = 895, 3276 : 9 = 364, 7119 : 9 = 791); jelek helyett számok (□ = 8992, △ = 4, ○ = 2236, ◇ = 8327: (□ − ◇) · △ = 2660, □ : △ + ○ = 4484, △ · ○ − ◇ = 617, □ + ○ : △ − ◇ = 1224, □ − ○ · △ + ◇ = 8375, (□ − ○) : △ = 1689).
- **Tankönyv 109. o.:** könyvtári kölcsönzések (vers 1056, mese 3168 …), könyvjelzők (5000 − 1476 = 3524, 2291 · 2 = 4582, 8532 : 3 = 2844); 427-tel növekvő sorozat (265 · 5 = 1325, 876 · 2 = 1752, 5728 − 3549 = 2179, 1388 + 1218 = 2606).
- **Tankönyv 110. o. (Kitekintő):** kerékpár 24 km (ötöde 4800 m, a 3. órában 9600 m); hajók 5000 turistára (katamarán 400 fő → 13 forduló); hullámvasút (3 · 1270 = 3810, 5 · 438 = 2190); Budapest–Varsó 200 + (5 · 200 − 326) = 874 km.
- **Munkafüzet I. 88–95.:** „Melyik számra gondoltam?” (2346 + 5428 = 7774, 8256 − 4324 = 3932, 1346 · 4 = 5384, 297 · 9 = 2673), becslés + írásbeli műveletek, vonatjegy 325 Ft táblázat, óceánjáró (legfelső emelet = negyed: 424 → 1696), műveletsorok (3564 − 215 · 2 = 3134, (1836 + 2364) · 2 = 8400, 9572 − 1416 · 5 = 2492), Tisza 1419 − 962 = 457 km, propeller 1850 fordulat/perc, mozi 295 hely, folyamatábra, számolós lépcső.
- **Munkafüzet II. 4–23.:** az osztás, a számok tulajdonságai, az összefüggések, a műveletek kapcsolatai és sorrendje leckéinek gyakorló feladatai.

> **⚠️ CSAPDÁK:** elfelejtett maradék (3845 + 2850 ≠ 5695); kimaradt 0 a hányadosból (3150 : 3 = 1050, nem 105); kivonásnál nem a kisebb jegyből vonjuk ki a nagyobbat oszloponként (7212 − 5410 ≠ 2202); szorzás és osztás az összeadás, kivonás előtt.

> **Írásbeli kivonás:** a tankönyv két módszert mutat (73. o.): Mona felváltással, Manó a kisebbítendő és a kivonandó egyforma növelésével. A modul magyarázatai Manó módszerét követik pótlásos kimondással („4 meg 8 az 12, marad 1”, a maradékot a kivonandó következő jegyéhez adjuk). Az írásbeli osztás a tankönyv rövid alakját követi (2'8'7'2' : 2 = 1436, alatta a maradékok lépcsője).

---

## 💻 Elkészített Komponensek

1. **`WrittenOpsExamFigures.tsx`**:
   - Általános elrendezések (a kvíz is használja): `ColumnOp` (írásbeli összeadás/kivonás E–sz–t–e oszlopokban, maradékkal), `MulLayout` („1623 · 2” alatta vonal és a szorzat), `ShortDivLayout` + `shortDivRows` (rövid alakú osztás a maradékok lépcsőjével).
   - `ChapterStationsSvg`: a fejezet 7 állomása és a tudáspróba.
   - `ColumnAddSvg`: 3845 + 2850 = 6695 (maradékkal).
   - `ColumnSubSvg`: 7212 − 5410 = 1802 Manó módszerével (+10 sz, +1 E).
   - `ShortDivSvg`: 2872 : 2 = 1436 rövid alakban.
   - `MultiplesVennSvg`: a 2 és az 5 többszörösei halmazábrán.
   - `SolvingStepsSvg`: adatok → terv → becslés → számítás → ellenőrzés → válasz.
2. **`WrittenOpsExamTheory.tsx`**: „Amit már tudsz” – a 7 lecke összefoglaló táblázata, írásbeli összeadás és kivonás, szorzás és osztás kidolgozva, többszörösök, következtetések, kapcsolatok, sorrend; Megálló-feladatok táblázatban; két „Vigyázz!” csapda. Exportálja a `makeTask`, `lcg`, `DIGIT_PUZZLES`, `puzzleHolds` segédeket.
   - **I. labor:** „Vegyes feladatgenerátor” – összeadás, kivonás, szorzás, maradékos osztás, műveletsor 10 000-ig; beírt eredmény ellenőrzése, megoldás ellenőrző művelettel, pontszámláló.
   - **II. labor:** „Számjegy-detektív” – a Kitekintő 1. b) feladatának 4 rejtvénye; az ismeretlen számjegyek koppintással állíthatók (0–9), ellenőrzés.
3. **`WrittenOpsExamMatcher.tsx`**: 3 szint × 8 pár (írásbeli műveletek; ellenőrzés és a műveletek tagjai; műveletsorok és szöveges feladatok).
4. **`WrittenOpsExamSorter.tsx`**: 3 szint × 3 kategória × 9 elem (melyik művelet kell; kinek a többszöröse; hány jegyű a hányados).
5. **`WrittenOpsExamQuiz.tsx`**: **90 kérdés** (szintenként 30), mind a 7 leckéből (szintenként kb. 5 összeadás/kivonás, 5 szorzás, 5 osztás, 3 többszörös, 4 következtetés, 4 kapcsolat, 4 sorrend), 46 kérdésnél ábra (írásbeli elrendezések, táblázat, nyíllánc, halmazábra, műveletsor-kártya), kérdéstípus-jelvények, 3 puskakártya.

Azonosítók: kvíz `g4-wops-tudasproba-quiz`, párosító `g4-wops-tudasproba-matcher`, csoportosító `g4-wops-tudasproba-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic3WrittenOpsExam.test.tsx` (4 komponens, 6 SVG ábra, rövid alakú osztás lépései, feladatgenerátor számköre, számjegy-rejtvények megoldásai).
