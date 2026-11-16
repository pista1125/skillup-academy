# 4. Gyakorlás, tudáspróba (tankönyv 145–146. oldal + 135–144. oldal, munkafüzet II. 52–65. és 78–83. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 145. Megálló, 146. Kitekintő, valamint a fejezet 135–144. oldala) és munkafüzet (`OH-MAT04MA_II`, 52–65. oldal, továbbá a 78–83. oldal „Ellenőrizd a tudásodat!” és „Gyakorolj!” feladatai közül a szorzásosak) alapján kidolgozott fejezetzáró modul. A diákzónában ez a VII. fejezet (Írásbeli szorzás) 4. leckéje.

---

## 🎯 Tananyag Áttekintés

- **TK 145. Megálló:** kerek tízesek és százasok (28 · 60, 48 · 50, 15 · 500, 12 · 800, 19 · 400 …); Nagybörzsönyi Erdei Vasút (800 m, naponta háromszor oda-vissza, hétvégén → 9600 m); írásbeli szorzások becsléssel és ellenőrzéssel (362 · 26, 291 · 32, 407 · 18, 178 · 53, 514 · 16); turistaház büféje árjegyzékkel (bodzaszörp 250 Ft, csipkebogyószörp 280 Ft / 2 dl, szendvicsek 340 és 290 Ft, palacsinta 320 Ft / 2 db, puszedli 220 Ft); műveleti sorrend (448 · (28 − 16), 448 · 16 − 28, 448 − 28 · 16, (168 − 89) · 51, 51 · 168 + 89, 168 + 51 · 89).
- **TK 146. Kitekintő:** háromjegyű · kétjegyű szorzások (36 · 261, 29 · 132, 47 · 108; a 17 · 853 és 51 · 416 szorzat 10 000 fölötti, ezért kimaradt), a szorzat kétszeresére / felére / tízszeresére / tizedére változtatása (48 · 10, 53 · 20), következtetések (ceruza–radír, dobozok, tanszerek 1890 Ft-ért), bivalyos gondolkodtató, hársfasor 758 cm-es közökkel. (A kék bálna tömege 10 000 fölötti, kimaradt.)
- **TK 135–144.:** a fejezet leckéinek feladatai (lásd az 1–3. lecke README-jét): nyílkör 314-ből, nyitott mondatok (245 · 32, 373 · 25 < □, 216 · 34 > □ > 307 · 23), számkártyák (3, 2, 4), túzokok tömege, előadótermek, vonatjegyek (375 Ft, 679 Ft), bográcsok, „Melyik több, mennyivel?” (139 · 71 vagy 372 · 21 − 123 · 31).
- **MF II. 79.:** becslés tízesre kerekítéssel és szorzás (21 · 42, 85 · 64, 204 · 38), Valter magazinja (12 · 385 Ft).
- **MF II. 80–82. (szorzásos feladatok):** számkártyák (5, 2, 3, 7, 4; szorzat 1000 és 3000 között), Ervin bácsi utazása, Eszter a mezítlábas parkban (42 · 19, fele, 27 · 21, 23 · 18, 193 · 35 − 6500), „Kinek lett több helyes eredménye?” hibavadász, Péter bácsi és Joli néni almafái (78 · 36 és 82 · 28).

> **⚠️ CSAPDA:** elmaradt eltolás (291 · 32 ≠ 582 + 873), rossz műveleti sorrend (448 − 28 · 16 ≠ 420 · 16), „egyszerre történik” típusú feladatok (bivalyok, pizzák), n fa között n − 1 köz van.

### A régi README javított hibái
- A mappában nem volt README és komponens; a modul teljesen új. A kvíz a feladat szerint 90 kérdést tartalmaz (szintenként 30), a fejezet mindhárom leckéjéből.

---

## 💻 Elkészített Komponensek

1. **`WrittenMultExamFigures.tsx`**: `ChapterMapSvg` (a fejezet állomásai), `BuffetPriceSvg` (büfé árjegyzéke), `ForestTrainSvg` (erdei vasút), `OrchardSvg` (két gyümölcsös), `ErrorHuntSvg` (Karesz és Kitti füzete), `ArrowCycleSvg` (nyílkör 314-ből). Exportált adatok: `BUFFET`, `ERROR_HUNT`.
2. **`WrittenMultExamTheory.tsx`**: „Amit már tudsz” összefoglaló táblázat, 407 · 18 lépésről lépésre (az írásbeli elrendezés a 2. lecke `WrittenMul2Layout` komponensével), összefüggések, Megálló-feladatok (vasút, büfé, műveleti sorrend, gyümölcsös, nyílkör), „Vigyázz!” csapdák. Exportálja a `makeExamTask` (vegyes feladatgenerátor) és a `round10` függvényt.
   - **I. labor:** vegyes feladatgenerátor (kerek tízes, írásbeli szorzás, becslés, következtetés) 4 válaszlehetőséggel, magyarázattal, pontszámmal.
   - **II. labor:** Hibavadász – 8 eredmény jelölése jónak vagy hibásnak, a helyes eredmény megmutatása, „Kinek lett több helyes eredménye?”.
3. **`WrittenMultExamMatcher.tsx`**: 3 szint × 8 pár (kerek tízesek és százasok; írásbeli szorzás; műveleti sorrend).
4. **`WrittenMultExamSorter.tsx`**: 3 szint × 3 kategória × 9 elem (becslés B: 800 / 1800 / 5400; helyes / elmaradt eltolás / rossz sorrend; szorzat < 3000 / 3000–6000 / > 6000).
5. **`WrittenMultExamQuiz.tsx`**: **90 kérdés** 3 szinten (30/30/30), 44 kérdés ábrával (írásbeli elrendezés „?”-lel, nyílláncok, kerekítő számegyenes, táblázatok, büfé, vasút, gyümölcsös, nyílkör, számkártyák, fasor), 3 puskakártyával.

Azonosítók: kvíz `g4-wmult-tudasproba-quiz`, párosító `g4-wmult-tudasproba-matcher`, csoportosító `g4-wmult-tudasproba-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic7WrittenMultExam.test.tsx` (4 komponens, 6 SVG ábra, a feladatgenerátor 200 feladata és a hibavadász adatai).
