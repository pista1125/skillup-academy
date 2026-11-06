# 1. Igaz vagy hamis

## Tananyag Áttekintés
A matematikai logika alapvető építőkövei a kijelentések (állítások). Ebben az alfejezetben megtanuljuk pontosan megkülönböztetni az állításokat a hétköznapi mondatoktól, valamint meghatározni azok logikai igazságértékét.

---

## Fő Témakörök és Fogalmak

- **Kijelentés (állítás) fogalma a matematikában:**
  - Olyan kijelentő mondat, amelyről egyértelműen és objektíven eldönthető, hogy igaz (I, 1) vagy hamis (H, 0).
  - A harmadik kizárásának elve: Egy állítás vagy igaz, vagy hamis, harmadik lehetőség nincs.
  - Az ellentmondásmentesség elve: Egy állítás nem lehet egyszerre igaz és hamis is.

- **Mi NEM állítás a matematikában?**
  - Kérdések (*"Hány óra van?"*)
  - Felszólítások, parancsok (*"Oldd meg a feladatot!"*)
  - Óhajok, kívánságok (*"Bárcsak ötöst kapnék!"*)
  - Szubjektív értékítéletek, ízlések (*"A matematika a legszebb tantárgy."*)
  - Nyitott mondatok határozatlan változóval (*"x > 5"*, amíg $x$ értékét nem rögzítjük).

- **Igazságérték vizsgálata:**
  - Matematikai állítások (pl. *"Minden prímszám páratlan"* – Hamis, mert a 2 páros).
  - Geometriai és számelméleti alapfogalmakhoz kapcsolódó állítások.
  - Hétköznapi tényállások vizsgálata.

---

## Elkészült Komponensek és Források

A tananyag és a feladatok a hivatalos **OH-MAT10TA/I** tankönyv 7–10. oldalának és az **OH-MAT912GY** gyakorló feladatgyűjteménynek a feldolgozásával készültek:

1. **`TrueOrFalseFigures.tsx`**:
   - `LogicStatementSvg`: Állítás logikai feldolgozási folyamata (mondat -> objektív szűrő -> I / H).
   - `ExcludedMiddleSvg`: A harmadik kizárásának elve és kétértékű univerzum.
   - `BoundaryNegationSvg`: A határérték szerepe számegyenesen ($x > 32$ tagadása $x \le 32$).
   - `PaintedCubeSvg`: A festett 3×3×3-as kocka modellje (27 kis kocka: 8 csúcs, 12 él, 6 lapközép, 1 belső).

2. **`TrueOrFalseTheory.tsx`**:
   - Interaktív állítás- és igazságérték-laboratórium tankönyvi mintamondatokkal.
   - Elméleti fejezetek: definíció, logika 2 alaptörvénye, köznyelv vs. matematika, negáció és tipikus buktatók, kompetenciamérés feladványok.
   - PDF export (`10_osztaly_logika_1_igaz_vagy_hamis.pdf`).

3. **`TrueOrFalseQuiz.tsx`**:
   - 3 nehézségi szint × 10 feladat = 30 válogatott, magyarázatokkal és tippekkel ellátott kérdés.
   - 1. Szint: Alapfogalmak és egyszerű igazságértékek (sósav HCl, Svájc Zürich, kérdések/óhajok).
   - 2. Szint: Rejtett kvantorok, negáció és határértékek ($x > 32$, $x \ge 100$, Panni kutyája fekete/tarka).
   - 3. Szint: Festett kocka feladványok, aranyműves segédek, Dominik passzai és logikai következtetések.
   - Felugró CheatSheet (segédlet).

4. **`TrueOrFalseMatcher.tsx`**:
   - 3 szintű kártyapárosító játék ranglistával.

5. **`TrueOrFalseSorter.tsx`**:
   - 3 szintű kategóriába soroló játék ranglistával (Igaz / Hamis / Nem állítás; Valódi tagadás / Mindkettő hamis / Mindkettő igaz; Biztosan igaz / Biztosan hamis / Nem dönthető el).

