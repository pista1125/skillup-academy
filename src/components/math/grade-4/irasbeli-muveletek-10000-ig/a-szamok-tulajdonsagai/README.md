# 4. A számok tulajdonságai (tankönyv 101–102. oldal, munkafüzet II. 13–16. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 101–102. oldal) és a II. kötetes munkafüzet (`OH-MAT04MA_II`, 13–16. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a III. fejezet (Írásbeli műveletek 0-tól 10 000-ig) 4. leckéje.

---

## 🎯 Tananyag Áttekintés

- **TK 101/1.:** számkártyák (0, 5, 3, 4, 0) – kétjegyű, háromjegyű, négyjegyű számok képzése és csoportosítása: **2 többszöröse, 5 többszöröse, 10 többszöröse, 100 többszöröse**; halmazábra a 10 000-nél kisebb számokról (2 többszörösei – 5 többszörösei, közös rész); igaz/hamis állítások (pl. „Ha egy egész szám 0-ra végződik, akkor többszöröse a 2-nek, az 5-nek és a 10-nek is.”).
- **TK 101/2.:** számítógépes játék pontszámai (2965, 4561, 7602, 4310 …): Bence pontszáma az 5, Gergőé a 2, Attiláé a 2 és az 5 többszöröse.
- **TK 102/3–6.:** a halmaz címkéje (osztható 2-vel = páros = 2-vel osztva 0 a maradék = 2 többszöröse), léghajó számai hiányzó számjeggyel (521A, 5B40, 62C0, 15DE, 131F), hőlégballonok műveletei (326 + 121A …), ismétlődő színsorozatok (léggömbök, buszok, vitorlások: 11., 12., 13., 28., 31., 100. elem).
- **MF II. 13–16.:** a 2 és a **4 többszörösei** halmazábrán (1240, 4543, 1422, 3486, 4304, 5311, 10 000, 1350), igaz/hamis állítások a 4 többszöröseiről, tulajdonság-táblázat (páros, 5000-nél kisebb, 5 és 10 többszöröse), túraútvonal a maradék szerint (4812 : 2, 7642 : 4 …), színezés („2 többszöröse, de nem az 5-é” …), folyamatábra (· 5 → páros? → : 10, különben · 2).

> **⚠️ CSAPDA:** a tulajdonságot az **utolsó** (egyesek helyén álló) számjegy dönti el, nem az első; az 5-re végződő szám nem páros, ezért nem kerül a közös részbe.

### A régi README javított hibái
- A régi leírás „számjegyek összege” és „számszomszédok” témát is ígért – ezek nem szerepelnek a tankönyv 101–102. oldalán. A tankönyv a **2, 5, 10, 100 többszöröseit** (a munkafüzet a 4 többszöröseit is), a páros/páratlan számokat, a halmazábrát és az ismétlődő sorozatokat tanítja; a lecke ezt követi.
- „Oszthatósági szabály” helyett a tankönyv szóhasználata: „a 2 többszöröse”, „2-vel osztva 0 a maradék”.
- A munkafüzeti oldalak a II. kötetben vannak (MF II. 13–16.).
- A lecke helyes száma a diákzónában: III. fejezet 4. lecke.

---

## 💻 Elkészített Komponensek

1. **`NumberPropertiesFigures.tsx`**:
   - `MultiplesVennSvg`: halmazábra (5 többszörösei, 2 többszörösei, közös rész = 10 többszörösei) a tankönyvi számokkal.
   - `LastDigitRuleSvg`: az utolsó számjegy szabálya (2, 5, 10 többszörösei).
   - `NumberCardsSvg`: a 0, 5, 3, 4, 0 számkártyák.
   - `MultiplesLineSvg`: számegyenes 0–30, 2-es és 5-ös ugrások, közös pontok.
   - `RepeatingPatternSvg`: ismétlődő léggömb- és buszsorozat.
2. **`NumberPropertiesTheory.tsx`**: Mit tanulunk? (mit jelent a „többszöröse”), az utolsó számjegy szabálya táblázattal, számkártyák csoportosítása, halmazábra + igaz/hamis, a 4 többszörösei, ismétlődő sorozatok maradékkal, „Vigyázz!”. Exportálja a `vennRegion` és `digitSolutions` segédfüggvényt.
   - **I. labor:** halmazábra-válogató – a szám helyének kiválasztása (csak 2, csak 5, közös rész, egyik sem), azonnali magyarázattal és pontszámmal.
   - **II. labor:** „Melyik számjegy jöhet?” – a □ helyére illő összes számjegy kiválasztása (521□ a 2 többszöröse, 131□ az 5 többszöröse …), ellenőrzés.
3. **`NumberPropertiesMatcher.tsx`**: 3 szint × 8 pár (tulajdonság ↔ végződés, legkisebb/legnagyobb négyjegyű, hiányzó számjegyek).
4. **`NumberPropertiesSorter.tsx`**: 3 szint × 3 kategória × 9 elem (halmazábra részei; 4 többszöröse / páros / páratlan; 10, 100, 1000 többszörösei).
5. **`NumberPropertiesQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 13 kérdés ábrával (halmazábra „?”-lel, számkártyák, sorozatok, folyamatábra, számlista), 3 puskakártyával.

Azonosítók: kvíz `g4-wops-szamok-tulajdonsagai-quiz`, párosító `g4-wops-szamok-tulajdonsagai-matcher`, csoportosító `g4-wops-szamok-tulajdonsagai-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic3NumberProperties.test.tsx` (4 komponens, 5 SVG ábra, halmazábra-besorolás, számjegy-megoldások).
