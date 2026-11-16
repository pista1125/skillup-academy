# 5. Az űrtartalom mérése (II. Mérések, 5. lecke)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., **64–66. oldal**) és munkafüzet (`OH-MAT04MA_I`, **57–59. oldal**) alapján kidolgozott modul 4. osztályosoknak.

---

## Tananyag Áttekintés

- **64. o.:** ismétlés: **1 dl = 10 cl**, **1 l = 10 dl = 100 cl** (1 cl-es merőke, 1 dl-es pohár, literes kancsó); poharak mérése cl pontossággal, becslés; kiskanál, gyűszű, evőkanál, merőkanál; 2 l víz szétosztása 2 dl-es és 5 dl-es poharakba. Akváriumok: **160 l, 3000 cl, 700 dl** (összesen 260 l). Matyi akváriuma: 110 dl fér bele, 30 dl-rel többet töltött bele, mint amennyi még hiányzik → még 40 dl = 4 l kell.
- **65. o.:** locsolás: 2 perc alatt 1880 dl → 1 perc alatt 940 dl; permetező: 12 dl/mp → 5 mp alatt 60 dl; víztakarékossági tanácsok; eszközök és mennyiségek (1 cl, 1 l, 3 dl). **Új egység: a milliliter (ml): 1 cl = 10 ml, 1 l = 10 dl = 100 cl = 1000 ml.**
- **66. o.:** mit mérünk ml-ben (cumisüveg, naptej, joghurt, szemcsepp, 250 ml-es üdítő); mérőedények leolvasása (mérőhenger dl-ben, 200 ml, 4 cl, 500 ml); tejtermékek: 120 cl, 17 dl, „2 és fél liter”, 40 dl, 190 cl átváltása; csökkenő sorrend: a) 80 dl, 650 cl, 6200 ml, 400 cl, 60 cl 45 ml; b) 750 cl, 7 l 6 cl, 2400 ml, 200 cl 8 ml.
- **Munkafüzet 57–59. o.:** kancsók leolvasása dl / cl / ml-ben; pótlás 1 cl-re, 1 dl-re, 1 l-re (pl. 78 ml + 22 ml = 1 dl, 758 ml + 242 ml = 1 l); növekvő sorrend dl-re váltva (770 cl < 170 dl < 701 dl < 707 dl < 71 l); flakonok ml → cl (770 ml = 77 cl …); összehasonlítás (1 l > 75 ml, 5 dl < 2 l, 100 l > 90 dl) és igaz/hamis állítások; szüret: 40 · 30 l = 1200 l; dísztó szivattyúval (300 l/perc, 2100 l → 7. perc); tűzoltóautók 4000 l-es tartálya (2600, 1300, 400, 200, 10 l fér még); a mértékegységek sorrendje váltószámokkal (ml →10→ cl →10→ dl →10→ l).

## Mértékegységek

| Egység | Jele | Kapcsolat |
|---|---|---|
| liter | l | 1 l = 10 dl = 100 cl = 1000 ml |
| deciliter | dl | 1 dl = 10 cl = 100 ml |
| centiliter | cl | 1 cl = 10 ml |
| milliliter | ml | – |

> **Csapda:** különböző mértékegységű mennyiségek összehasonlítása átváltás nélkül (170 dl és 770 cl: 770 cl = 77 dl, tehát a 170 dl a több).

> **Javítás a régi README-hez képest:** a korábbi leírás LaTeX-képleteket és a hektolitert (hl) is tartalmazta, valamint tizedes törteket (1,5 l). A tankönyv ezen oldalai a **l, dl, cl, ml** egységeket tanítják, hektolitert nem – a modul ezt követi, tizedestörtek nélkül.

---

## Elkészített Komponensek

1. **`CapacityMeasureFigures.tsx`**
   - `MeasuringCupsSvg`: 1 cl-es merőke, 1 dl-es pohár, literes kancsó (1 dl = 10 cl, 1 l = 10 dl = 100 cl).
   - `CapacityUnitLadderSvg`: l → dl → cl → ml lépcső (lépésenként · 10).
   - `AquariumsSvg`: a három akvárium (160 l, 3000 cl, 700 dl).
   - `MeasuringVesselsSvg`: mérőedények leolvasása (3 dl, 200 ml, 4 cl, 500 ml).
   - `PondPumpChartSvg`: a dísztó feltöltésének diagramja (300 l percenként, 2100 l).
2. **`CapacityMeasureTheory.tsx`**: mértékegységek, a milliliter, becslési táblázat, kidolgozott példák (akváriumok, Matyi, locsolás, csökkenő sorrend, dísztó), csapda.
   - **Labor I – Töltsd meg a mérőkancsót!:** a gyerek + / − 1 dl, 1 cl, 1 ml gombokkal tölti a literes kancsót a megadott szintig; élő kijelzés (l, dl, cl, ml), túltöltés-figyelmeztetés, siker-visszajelzés.
   - **Labor II – Űrtartalom-átváltó:** generált l / dl / cl / ml feladatok 4 válaszgombbal, pontszámlálóval.
3. **`CapacityMeasureMatcher.tsx`**: 3 szint × 8 pár (egységek, tejtermékek, becslés és szöveges feladatok).
4. **`CapacityMeasureSorter.tsx`**: 3 szint × 3 kategória × 9 elem (ml / dl / l; < 1 l / = 1 l / > 1 l; < 10 dl / 10–100 dl / > 100 dl).
5. **`CapacityMeasureQuiz.tsx`**: 30 kérdés (10–10–10), 13 kérdésnél ábra (merőke, mérőkancsó, akvárium, flakon, diagram, tűzoltóautó, üveg és poharak), 3 puskakártya.

Azonosítók: kvíz `g4-meas-urtartalom-quiz`, párosító `g4-meas-urtartalom-matcher`, csoportosító `g4-meas-urtartalom-sorter`.

---

## Tesztelés

`src/test/grade4Topic2CapacityMeasure.test.tsx` – a 4 komponens és mind az 5 SVG ábra renderelése.
