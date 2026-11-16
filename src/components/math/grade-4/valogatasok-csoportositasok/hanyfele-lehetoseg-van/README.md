# 3. Hányféle lehetőség van? (VI. fejezet, 3. lecke)

A VI. fejezet tankönyvi oldalain (`OH-MAT04TA`, 131–134. o.) nincs külön kombinatorikai lecke – a lehetőségek rendszerezése a **TK 133/4.** elágazásos ceruza-válogatásából (Kitti rajza: 2 · 2 = 4 ág) és a **TK 134/8.** logikai lapjaiból indul. A modul ezért a tankönyv és a munkafüzet többi, ide illő „Hányféle…?” feladatát is felhasználja (a kombinatorikát a könyv az év során folyamatosan gyakoroltatja):

- **TK 25/11.** Alex, Barna, Csaba, Dániel futóversenye – *„Ennek a feladatnak a megoldásához célszerű elágazásos rajzot készíteni. A lejegyzéshez a fiúk nevének kezdőbetűjét használjuk.”* a) Dániel az első → 6 sorrend; b) Alex megelőzi Barnát és Csabát → 8; c) Csaba második, Dániel Barna előtt → 3.
- **TK 13/9.** Máté, Bence, Gergő sorrendje → 6; ha Balázs mindig utolsó → továbbra is 6.
- **TK 26/16.** Két fiú, két lány, két kiskutya – hárman szaladnak a labdáért (fajták szerint 7-féle hármas).
- **TK 86/3–4.** Dobogó: Anna, Bianka, Cecília → 6; a szülők közrefogják a kisfiút → 2; ha Anna is jön → 4.
- **MF I** – Zoli, Peti, Andris libasorban (6); 5 színű szalvétából 3 különböző (10); az A–E tavak párjai, *AB = BA* (10).

Kiegészítés: számkártyák (1, 2, 3 → 6 háromjegyű szám; 0, 5, 7 → 4, mert a 0 nem állhat elöl), két választás egymás után (sapka–sál, leves–főétel, szín–alak: szorzás az ágakon).

A régi README kombinatorikai jelölései (permutáció, „3 · 2 · 1” mint képlet, LaTeX) helyett a modul a tankönyv nyelvét használja: kezdőbetűs lejegyzés, elágazásos rajz, rendszerezett felírás.

> **⚠️ CSAPDA:** összevissza felírva könnyen kimarad vagy kétszer szerepel egy lehetőség – mindig rendszerezve (előbb az A-val kezdődők…) kell felírni; párosításnál AB és BA ugyanaz.

---

## 💻 Elkészített Komponensek

1. **`PossibilitiesFigures.tsx`** – `RunnersTreeSvg` (TK 25 elágazásos rajza), `PodiumSvg`, `PairsSvg`, `NapkinsSvg`, `NumberCardsSvg`, `BranchProductSvg`; számoló segédek: `permutations`, `pairsOf`, `choose`.
2. **`PossibilitiesTheory.tsx`** – elágazásos rajz lépésenként, dobogó, szorzás az ágakon, párok és választások, számkártyák, csapda.
   - **I. Laboratórium – Írd fel az összes sorrendet!** nevek kattintásos beírása a helyekre, felírás, ismétlés-figyelés (dobogó, futóverseny Dániellel az élen).
   - **II. Laboratórium – Logikai lap tervező:** színek, alakok, lyuk ki-be kapcsolása, tipp, majd az összes lap és a szorzat megjelenítése.
3. **`PossibilitiesMatcher.tsx`** – 3 szint × 8 pár.
4. **`PossibilitiesSorter.tsx`** – 3 szint × 3 kategória × 3 elem.
5. **`PossibilitiesQuiz.tsx`** – 30 kérdés (10/10/10), ábrákkal és kérdéstípus-jelvénnyel, 3 puskával.

---

## 🧪 Tesztelés

`src/test/grade4Topic6Possibilities.test.tsx` – renderelés, kérdésszám/szintek, a számoló segédek tankönyvi eredményei (6, 24, 10, 8, 3, 4), az I. labor felírás- és ismétlésfigyelése.
