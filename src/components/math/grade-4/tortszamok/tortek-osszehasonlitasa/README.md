# 4. Törtek összehasonlítása (tankönyv 147–152. oldal, munkafüzet II. 66–71. és 83. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., „A törtszámok” fejezet, 147–152. oldal) és munkafüzet (`OH-MAT04MA_II`, 66–71. oldal, valamint a 83. oldal 8. feladata) alapján kidolgozott oktatási modul. A diákzónában ez a VIII. fejezet 4. leckéje.

A 4. osztályos tankönyv a törteket **szóval** írja („1 ketted”, „1 harmad”, „3 negyed”, „4 tized”, „a méter 3 negyede”), és nem használja a számláló, nevező, törtvonal kifejezéseket. A modul is így ír.

---

## 🎯 Tananyag Áttekintés

- **Munkafüzet 66. o., 1. b)–d)**: 1-1 pizzaszelet a tányéron – 1 ketted > 1 harmad > 1 negyed > 1 ötöd > 1 hatod. Az egész pizza 2400 Ft: egy szelet ára 1200, 800, 600, 480, 400 Ft; 2-2 szelet ára 2400, 1600, 1200, 960, 800 Ft.
- **Tankönyv 149. o., 5. feladat**: a bordó rúd alá 4 rózsaszín rúd fér – 1, 2, 3 negyed; a fele más néven 2 negyed.
- **Munkafüzet 83. o., 8. feladat**: 1 ketted = 4 nyolcad = 2 negyed („Mit tapasztaltál?”); ehhez kapcsolva 5 tized = a fele.
- **Tankönyv 147. o.**: a francia zászló 3 harmada = 1 egész.
- **Munkafüzet 69. o., 11. feladat**: ugróverseny a 2 m-es pályán – mókus 3 negyed = 150 cm, béka 4 tized = 80 cm, nyúl 4 ötöd = 160 cm; győztes a nyúl, utolsó a béka.
- **Tankönyv 151. o., 17. b)**: 1000 km-es út (684 + 316) – Zoliék 2 negyed = 500 km, Laciék 4 tized = 400 km; Zoliék járnak közelebb, nekik még 500 km, Laciéknak 600 km van hátra.
- **Munkafüzet 70. o., 15. feladat**: zászlók az 1 km-es vágtán – 1 tized km = 100 m, 1 ötöd = 200 m, 1 negyed = 250 m, 3 tized = 300 m, 3 ötöd = 600 m, 3 negyed = 750 m, 4 ötöd = 800 m.
- **Munkafüzet 71. o., 17–18. feladat**: a 400 literes dézsa 6 tizede (240 l) több mint a fele; a sportszelet hozzávalóiból a keksz 1 ketted, a margarin és a cukor 1-1 negyed.
- **Tankönyv 152. o., 19. feladat**: parkoló autói – „1 negyede kék”, „1 harmada zöld” típusú állítások (a kvízben egy 12 autós saját rajzzal).

> **⚠️ CSAPDA:** 1 hatod nem nagyobb 1 harmadnál, mert a 6 > 3! Minél több részre vágjuk az egészet, annál kisebb egy rész. Csak ugyanakkora egészek részeit hasonlítjuk össze.

### A régi README javított hibái
- LaTeX-képletek (`\frac{2}{7}`) és számjegyes törtek helyett a tankönyv szavas írásmódja („3 negyed”, „4 tized”); csak a könyvben előforduló ketted, harmad, negyed, ötöd, hatod, nyolcad, tized részek szerepelnek.
- A „számláló”, „nevező” kifejezések a 4. osztályos tankönyvben nem szerepelnek – helyettük „hány egyenlő részre vágtuk” és „hány részt veszünk”.
- Az 1-nél nagyobb törtek számegyenese (5/4) és a hetedek nem szerepelnek a tankönyv oldalain; helyettük a munkafüzet 1 km-es pályája és a 2 m-es ugróverseny.

---

## 💻 Elkészített Komponensek

1. **`FractionCompare4Figures.tsx`**:
   - `PizzaSlicesCompareSvg`: 1-1 szelet öt tányéron, köztük > jelek (MF 66. o.).
   - `QuarterBarsSvg`: 1, 2, 3, 4 negyed csíkon (TK 149. o., 5. feladat).
   - `FractionWallSvg`: törtfal 1 egésztől 1 tizedig.
   - `EqualHalvesSvg`: 1 ketted = 2 negyed = 4 nyolcad = 5 tized (MF 83. o., 8. feladat).
   - `KmTrackSvg`: a hét zászló az 1 km-es pályán (MF 70. o., 15. feladat).
   - `JumpContestSvg`: ugróverseny a 2 m-es pályán (MF 69. o., 11. feladat).
   - Segédek: `PieG`, `BarG`, `FlagG`, `fw`, `fwOf`, `PART_NAMES`, `PART_OF`, `compareFractions`, `TRACK_FLAGS`, `JUMPERS`.
2. **`FractionCompare4Theory.tsx`**: Mit tanulunk?, ugyanolyan részek, ugyanannyi rész (törtfal, pizzaárak), „Más néven ugyanannyi”, „Nézzük meg együtt!” (ugróverseny, utazás), törtek a pályán, „Vigyázz!” csapda. Exportálja: `STRIP_TASKS`, `flagMeters`.
   - **I. labor – Csíkmérleg:** 8 feladat; a gyerek mindkét csíkot felvágja (2–10 rész), kiszínezi a kért részeket, majd kiválasztja a <, =, > jelet; ellenőrzés és tipp.
   - **II. labor – Zászlók a versenypályán:** a munkafüzet hét zászlóját kell az 1 km-es pálya 50 m-es pontjaira tűzni; rossz koppintásnál számolási tipp, a végén a zászlók sorba rendezve.
3. **`FractionCompare4Matcher.tsx`**: 3 szint × 8 pár (melyik a nagyobb; egyenlő törtek; törtrész kiszámolva).
4. **`FractionCompare4Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (a felénél kevesebb / pont a fele / több; 1 egésznél kisebb / 1 egész / nagyobb; A vagy B a nagyobb, vagy egyenlők).
5. **`FractionCompare4Quiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 15 kérdés ábrával (pizza, csík, pálya, parkoló, dézsa), minden kérdésnek saját jelvénye, 3 puskakártya.

Azonosítók: kvíz `g4-frac-osszehasonlitas-quiz`, párosító `g4-frac-osszehasonlitas-matcher`, csoportosító `g4-frac-osszehasonlitas-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic8FractionCompare4.test.tsx` (4 komponens, 6 SVG ábra, kvízszerkezet, összehasonlítás, zászlók és ugrások értékei, a csoportosító és a párosító helyessége).
