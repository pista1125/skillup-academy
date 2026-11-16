# 1. A törtrész és a törtek értelmezése (tankönyv 147–149. oldal, munkafüzet II. 66–67. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 147–149. oldal) és munkafüzet (`OH-MAT04MA_II`, 66–67. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a VIII. fejezet (A törtszámok) 1. leckéje.

---

## 🎯 Tananyag Áttekintés

- **Nyitótörténet (147. o.)**: Manó zászlói – a lengyel és a monacói zászló „egyketted része piros, egyketted része fehér”; Kitti 9 bonbonjából mindenkinek „a praliné egyharmada jut”; a francia zászló kék, fehér, piros része „egy-egy harmad, összesen három harmad, vagyis egy egész”.
- **1. feladat (148. o.)**: a négyzet alakú szalvéta hajtogatása – egyszer félbehajtva a szalvéta fele, kétszer félbehajtva a negyede látszik.
- **2. feladat (148. o.)**: ételek (pizza, csokoládé, alma, dobostorta) – hány egyenlő részre osztottuk, hányad részét tettük a tányérra.
- **3. feladat (148. o.)**: „Mindegyik téglalap 1 egészet ér. Hányad részét színeztük ki?” (1 harmad, fele, 1 negyed …).
- **4. feladat (148. o.)**: 12 darabos bonbon igazságos elosztása ketten, hárman, négyen, hatan, tizenketten (6, 4, 3, 2, 1 darab).
- **5–6. feladat (149. o.)**: színes rudak – a bordó rúd alá 4 rózsaszín rúd fér (1 rózsaszín = a bordó 1 negyede); a zöld rúd 1 egész: a lila a fele, a piros 1 harmada, a világoskék 1 negyede, a rózsaszín 1 hatoda, a fehér kocka 1 tizenkettede (a két feladatból adódó hosszak: fehér 1, rózsaszín 2, világoskék 3, piros 4, lila 6, bordó 8, zöld 12 egység).
- **Munkafüzet II. 66., 1. a)**: pizzák párosítása a törtrészek nevével (felek, harmad, negyed, ötöd, hatod részek).
- **Munkafüzet II. 67., 2–4.**: zászló, 3 × 3-as négyzet és 12 négyzet színezése (harmad, negyed) – a több rész színezését a 2. lecke dolgozza fel.

**Szóhasználat**: a tankönyv a törteket szavakkal írja (fél, fele, 1 ketted, 1 harmad, 1 negyede, 3 negyed, 1 tized), a „számláló”, „nevező”, „törtvonal” szavakat és a számjegyes törtalakot NEM használja. A modul is így tesz; a számjegyes alak (1/4) csak egy „Érdekesség” dobozban, a felső tagozatra utalva jelenik meg.

> **⚠️ CSAPDA:** a 4 szelet még nem biztosan 4 negyed – törtrészről csak akkor beszélünk, ha az egészet EGYENLŐ részekre osztottuk.

### A régi README javított hibái
- A régi README LaTeX-es képletekkel ($\frac{3}{4}$), „számláló / nevező / törtvonal” fogalmakkal és „a nevező sohasem lehet 0” szabállyal dolgozott – ezek nincsenek a 4. osztályos tankönyvben. Helyettük a tankönyv szavai és valódi feladatai szerepelnek.
- A „háromnegyed” és a több rész színezése a 2. leckébe került (Egynél kisebb törtek).

---

## 💻 Elkészített Komponensek

1. **`FractionIntro4Figures.tsx`**:
   - `FlagsSvg`: lengyel zászló (1 ketted piros) és francia zászló (3 harmad = 1 egész).
   - `FractionNamesSvg`: 2, 3, 4, 5, 6, 8 egyenlő szeletre vágott pizzák, 1-1 szelet színes, a rész nevével.
   - `EqualPartsSvg`: egyenlő (negyedek) és nem egyenlő részekre vágott pizza.
   - `NapkinFoldSvg`: szalvéta egyszer és kétszer félbehajtva (fele, negyede).
   - `RectanglePartsSvg`: a 148. oldali téglalapok (1 harmad, fele, 1 negyed).
   - `ColourRodsSvg`: bordó rúd 4 rózsaszín rúddal.
   - `BonbonShareSvg`: 12 bonbon három tányéron.
   - Újrahasznosítható segédek (a 2–3. lecke is használja): `PizzaG`, `BarG`, `ChocoG`, `RodG`, `BonbonG`, `sectorPath`, `ROD_COLORS`, `DENOM_NAMES`, `DENOM_OF`, `fracWord`, `fracOfWord`.
2. **`FractionIntro4Theory.tsx`**: Mit tanulunk? (zászlók), a részek nevei táblázattal, szalvéta és téglalapok kidolgozva, színes rudak, igazságos osztozkodás, „Vigyázz!” csapda. Exportálja: `readPizza`, `CUTTER_TASKS`, `CUTTER_PARTS`, `ROD_CHOICES`.
   - **I. labor – Pizzavágó:** a pizzát 2–12 egyenlő szeletre vágod, a szeletekre koppintva színezel; a feladatkártyák (1 ketted … 1 tized) ellenőrzik a vágást és a színezést.
   - **II. labor – Színes rudak:** a zöld rúd (1 egész) hosszát kirakod lila, piros, világoskék, rózsaszín, fehér vagy sárga rudakkal, és megmondod, hányad része (a sárga nem fér ki pontosan).
3. **`FractionIntro4Matcher.tsx`**: 3 szint × 8 pár (a részek nevei; szalvéta, rudak, ételek; igazságos osztozkodás).
4. **`FractionIntro4Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (fele / 1 harmad / 1 negyed; egyenlő részek / nem egyenlő / 1 egész; 2 / 3 / 4 darab jut).
5. **`FractionIntro4Quiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 20 kérdés ábrával (pizza, téglalap, csokoládé, szalvéta, rudak, bonbonok, zászlók), 3 puskakártyával.

Azonosítók: kvíz `g4-frac-ertelmezes-quiz`, párosító `g4-frac-ertelmezes-matcher`, csoportosító `g4-frac-ertelmezes-sorter`.

A mappában lévő régi `FractionsModule.tsx`, `FractionsQuiz.tsx`, `FractionVisualMatcher.tsx` korábbi eszközök, ezekhez a modul nem nyúl.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic8FractionIntro4.test.tsx` (4 komponens, 7 SVG ábra, kvíz-, párosító- és csoportosító-szerkezet, törtnevek, rúdhosszak).
