# 1. Szorzás kétjegyű szorzóval (tankönyv 135–137. oldal, munkafüzet II. 52. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 135–137. oldal) és munkafüzet (`OH-MAT04MA_II`, 52. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a VII. fejezet (Írásbeli szorzás) 1. leckéje.

---

## 🎯 Tananyag Áttekintés

- **TK 135.:** fejezetnyitó történet – az osztály kirándulást tervez (Aggteleki Nemzeti Park, 26 fős osztály, vonatjegy, szállás, belépő).
- **TK 136/1.:** érmék számolása (Éva 10 Ft-osai, Zsombor és Barnabás 20 Ft-osai, Eszter 50 Ft-osai), szorzások kerek tízessel: 11 · 10, 11 · 20, 23 · 50, 13 · 50 …
- **TK 136/2.:** „Mennyit ér 1, 10, 11, 20, 25, 45, 70, 100, 170 tízes?”; szorzás 10-zel E–sz–t–e táblázatban (71 · 10 = 710, 893 · 10 = 8930: a számjegyek egy hellyel balra lépnek), 10 · 43, 100 · 10, 961 · 10.
- **TK 137/3.:** a szorzat változása, ha a szorzót / szorzandót 10-szeresére, 100-szorosára változtatjuk (9 · 7 = 63, 9 · 70 = 630, 9 · 700 = 6300; 8 · 2 = 16, 80 · 2 = 160, 800 · 2 = 1600).
- **TK 137/4.:** szorzás tagonként: 130 · 60 = (100 + 30) · 60 = 6000 + 1800 = 7800; 130 · 40, 420 · 20, 150 · 60, 360 · 20 …
- **TK 137/5.:** szorzások alkotása (szorzandók: 25, 41, 60, 20; szorzók: 20, 30, 10, 100).
- **MF II. 52.:** kétjegyű páratlan számok a 4, 8, 7, 3 számjegyekből · 10 és · 100; Mona és Manó pénze; Manó és Karesz szorzatversenye (120 · 20, 330 · 30, 430 · 10, 150 · 50 ↔ 140 · 20, 250 · 30, 180 · 30, 160 · 40: kinek van több 5000-nél nagyobb szorzata).

> **⚠️ CSAPDA:** kerek tízessel szorzáskor nem szabad elhagyni a 10-zel szorzást (23 · 50 ≠ 115), és ha már a tízesek számával kapott szorzat is 0-ra végződik, két 0 lesz a végén (25 · 20 = 500).

### A régi README javított hibái
- A régi leírás LaTeX-képleteket (`$a \cdot (b + c)$`) és a tankönyvben itt nem szereplő „32 · 23 felbontását” tartalmazta; a tankönyv ebben a leckében még nem végez kétjegyű · kétjegyű szorzást, hanem 10-zel, 100-zal és kerek tízesekkel szoroz, és a 130 · 60 tagonkénti szorzását mutatja.
- A lecke helyes száma a diákzónában: VII. fejezet 1. lecke.

---

## 💻 Elkészített Komponensek

1. **`MulTwoDigitFigures.tsx`**:
   - `CoinGroupsSvg`: 12 darab 20 forintos = 240 Ft.
   - `TimesTenTableSvg`: 71 · 10 és 893 · 10 helyiérték-táblázatban, nyilakkal.
   - `FactorChainSvg`: 9 · 7, 9 · 70, 9 · 700 (a szorzat 10-szeres lesz).
   - `RoundTensSvg`: 23 · 50 = 23 · 5 · 10 = 1150.
   - `SplitMulSvg`: 130 · 60 téglalapmodellel (6000 + 1800).
   - Exportált színek: `PV_COLORS`, `PV_HEADS`.
2. **`MulTwoDigitTheory.tsx`**: Mit tanulunk?, szorzás 10-zel, a szorzat változása, kerek tízes (Eszter 50 forintosai), 130 · 60 tagonként, „Vigyázz!” csapdák. Exportálja a `roundTensSteps` segédfüggvényt és a `WITH` ragtáblát.
   - **I. labor:** Tízszerező gép – számválasztás, „· 10” gomb, a számjegyek balra lépnek a helyiérték-táblázatban.
   - **II. labor:** Szorozz kerek tízessel! – 8 feladat, 4 válaszgomb tipikus hibákkal, lépésenkénti magyarázat, pontszám.
3. **`MulTwoDigitMatcher.tsx`**: 3 szint × 8 pár (· 10 és · 100; kerek tízes; kerek tízesek és százasok).
4. **`MulTwoDigitSorter.tsx`**: 3 szint × 3 kategória × 9 elem (250 / 520 / 205; egyenlő szorzatok 1200 / 2400 / 3600; szorzat < 3000 / 3000–6000 / > 6000).
5. **`MulTwoDigitQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 13 kérdés ábrával (helyiérték-táblázat, érmék, nyílláncok, téglalapmodell, táblázat, számkártyák), 3 puskakártyával.

Azonosítók: kvíz `g4-wmult-ketjegyu-quiz`, párosító `g4-wmult-ketjegyu-matcher`, csoportosító `g4-wmult-ketjegyu-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic7MulTwoDigit.test.tsx` (4 komponens, 5 SVG ábra, kerek tízessel szorzás lépései).
