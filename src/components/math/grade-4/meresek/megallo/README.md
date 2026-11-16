# 7. Megálló – tudáspróba (II. Mérések, 7. lecke – fejezetzáró)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., **67–68. oldal**, Megálló; a fejezet anyaga: **53–66. és 153–158. oldal**) és munkafüzet (`OH-MAT04MA_I`, **60–67. oldal**: „Ellenőrizd a tudásodat!”, „Gyakorolj!”; továbbá `OH-MAT04MA_II` **72–77. oldal**) alapján kidolgozott fejezetzáró modul 4. osztályosoknak.

A tudáspróba a fejezet mind a 6 leckéjét lefedi: 1. A hosszúság mérése, 2. A kerület mérése, 3. A terület mérése, 4. A tömeg mérése, 5. Az űrtartalom mérése, 6. Az idő mérése.

---

## Tananyag Áttekintés

- **67. o.:** mértékegységek csoportosítása (űrtartalom: ml, cl, dl; tömeg: kg, g, dkg; hosszúság: mm, m, cm, km); példák: < 1 km, 500 kg és 1000 kg között, > 100 l; egységválasztás (bögre víz – dl, logikai lap vastagsága – mm, táska – kg, tankönyv szélessége – cm); **autópályák 2013-ban** (Magyarország 1563, Törökország 2127, Horvátország 1295, Ausztria 1719, Dánia 1186 km; csökkenő sorrend; tízesre kerekítve 2130 − 1190 = 940 km); szöveges feladatok (1000 ml-es üveg, 80 cl szörp → 2 dl; 700 km-ből 180 km megtéve → 520 km; 1000 cm szalag, 10 cm-es darabok, 3-as fonatok → 33); állatok napi vízigénye (macska 20–30 cl, galamb 8 cl, kutya 8 dl, liba 8–10 dl, kígyó 5–10 cl → ml-ben).
- **68. o.:** befőzés szövege hiányzó mértékegységekkel (2 kg szilva, 7 dl-es üveg, 2 dkg cukor, 5 l-es edény, 20 perc); hőlégballon össztömege (113 + 22 + 184 + 63 + 320 + 3000 = 3702 kg); mértékegység-társasjáték 21 mezővel (literre, méterre, milliméterre, kilogrammra, milliliterre váltás).
- **Munkafüzet I. 60–67. o.** (a mérésekhez kapcsolódó feladatok): átváltások (1200 cm = 120 dm, 3900 dl = 390 l, 2300 dkg = 23 kg, 4900 dm = 490 m); négyzet lefedése egységekkel; téglalap kerülete mm pontossággal; italfogyasztás (100 · 5 dl + 85 l + 3470 dl = 482 l); ml / cl / dl / l átváltások; 5 km-re kiegészítés (3 km 340 m + 1 km 660 m); tömeg- és űrtartalom-becslés kizárással; összehasonlítás (>, =, <); kilométeróra; drót (7100 mm − 20 cm = 6900 mm); Vera terítői (30 cm-es négyzet, 1250 cm szalag → 10 terítő, 50 cm marad).
- **Munkafüzet II. 72–77. o.:** az idő mérése (lásd a 6. leckét).

> **Javítás a régi README-hez képest:** a korábbi leírás „6. Megálló” címet, LaTeX-képleteket, tonnát (t), hektolitert (hl), cm²-t és K = 2 · (a + b), T = a · b képleteket tartalmazott, az időt pedig kihagyta. A tankönyv ezen oldalai tonnát, hl-t és cm²-t nem tanítanak; a modul a diákzóna számozását (7. lecke) és a tankönyvi tartalmat követi, a területet egységnégyzetekkel méri, és az időmérést is lefedi.

---

## Elkészített Komponensek

1. **`MeasurementsExamFigures.tsx`**
   - `ChapterUnitsSvg`: a fejezet négy mértékegység-lépcsője (hosszúság, tömeg, űrtartalom, idő) váltószámokkal.
   - `MotorwayChartSvg`: autópályák hossza (oszlopdiagram).
   - `AnimalWaterSvg`: állatok napi vízigénye.
   - `BalloonMassSvg`: a hőlégballon részeinek tömege.
   - `UnitBoardGameSvg`: a 21 mezős mértékegység-társasjáték pályája (kiemelhető aktív mezővel).
   - Adatok: `MOTORWAYS`, `ANIMALS`, `BALLOON`, `BOARD`, `BOARD_TASKS`, `boardPos`.
2. **`MeasurementsExamTheory.tsx`**: „Amit már tudsz” – a 6 lecke összefoglalása kártyákon, egységválasztás; kidolgozott vegyes feladatok (autópályák, málnaszörp, zöldségszállítók, Betti fonatai, vízigény, hőlégballon, befőzés); csapda (különböző egységek összeadása).
   - **Labor I – Mértékegység-társasjáték:** kockadobás, lépés a pályán, a mező színe szerinti átváltás 4 válaszgombbal, letakart mezők számlálója.
   - **Labor II – Mit mér ez a mértékegység?:** 16 mértékegység-kártya szétválogatása hosszúság / tömeg / űrtartalom / idő dobozokba koppintással, azonnali visszajelzéssel.
3. **`MeasurementsExamMatcher.tsx`**: 3 szint × 8 pár (mértékegységek, társasjáték-mezők, vegyes szöveges feladatok).
4. **`MeasurementsExamSorter.tsx`**: 3 szint × 3 kategória × 9 elem (űrtartalom / tömeg / hosszúság; < 1 km / 500–1000 kg / > 100 l; kerületet / területet / időtartamot számolunk).
5. **`MeasurementsExamQuiz.tsx`**: **90 kérdés (30–30–30)** a teljes fejezetből (szintenként kb. 5-5 kérdés mind a 6 leckéből), 38 kérdésnél ábra (vonalzó, téglalapok, négyzetrács, sokszögek, mérleg, mérőkancsó, óra, menetrend, autópálya-diagram, hőlégballon, állatok, társasjáték-mező), 3 puskakártya.

Azonosítók: kvíz `g4-meas-tudasproba-quiz`, párosító `g4-meas-tudasproba-matcher`, csoportosító `g4-meas-tudasproba-sorter`.

---

## Tesztelés

`src/test/grade4Topic2MeasurementsExam.test.tsx` – a 4 komponens és mind az 5 SVG ábra renderelése.
