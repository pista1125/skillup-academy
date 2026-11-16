# 3. Összefüggések, következtetések (tankönyv 144. oldal, munkafüzet II. 63–65. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 144. oldal) és munkafüzet (`OH-MAT04MA_II`, 63–65. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a VII. fejezet (Írásbeli szorzás) 3. leckéje.

---

## 🎯 Tananyag Áttekintés

- **TK 144/1.:** a tényezők és a szorzat változása: 126 · 23, 226 · 23, 326 · 23 (a szorzandó 100-zal nő → a szorzat 2300-zal nő); 61 · 80 = 122 · 40 = 244 · 20 (egyik kétszeres, másik fele → nem változik).
- **TK 144/2.:** melyik szorzat a nagyobb számolás előtt: 199 · 10 vagy 199 · 20, 241 · 22 vagy 241 · 21, 159 · 44 vagy 159 · 22; 120 · 21 vagy 60 · 42, 40 · 63, 30 · 84 (mind 2520).
- **TK 144/3–4.:** következtetés: 20 kg burgonya, ha 10 kg 1400 Ft; 9 kg körte, ha 3 kg 900 Ft; 15 db jégkrém, ha 5 db 3000 Ft; 2 kg alma, ha 8 kg 1600 Ft; Manó 5 napra napi 425 Ft (2125 Ft), 1, 2, 3 hétre.
- **TK 144/5–7.:** madarak napi útja oszlopdiagramon (seregély 40 km, gólya 200 km, sarki csér 300 km) 1, 2, 3 hétre; Lepkefutam (135 gyerek és 170 felnőtt, 23-, 25-, 27-, 29-féle lepke); gyertyás gondolkodtató (15 egyszerre gyújtott gyertya is 75 perc alatt ég el).
- **MF II. 63.:** belépőjegy 320 Ft-ért táblázat (10, 11, 12, 15, 20, 24, 25, 30, 31 fő); összevonás: 26 · 14 + 45 · 14 = (26 + 45) · 14, 134 · 42 − 118 · 42 = (134 − 118) · 42, 62 · 32 − 62 · 16 = 62 · 16, 55 · 18 + 127 · 18 = 182 · 18.
- **MF II. 64.:** nyílláncok (61 · 10 · 10 = 61 · 100, 14 · 20 · 20, 29 · 10 · 20 …); „Ha egy szám 7-szerese 448, mennyi a 14-szerese?” típusú következtetések.
- **MF II. 65.:** sorozatok (101, 202, 217, 434, 449 … szabály · 2, + 15; 132, 396, 241, 723, 568 … szabály · 3, − 155), 57 · 6 · 8 = 57 · 48, szabálytáblázat ◇, △, ○ (○ = ◇ · △ + 100).

> **⚠️ CSAPDA:** „kétszeresére nő” nem azt jelenti, hogy 2-vel nő; és nem minden szöveges feladatban kell szorozni (egyszerre égő gyertyák).

### A régi README javított hibái
- A régi leírás LaTeX-et, a tankönyvben nem szereplő 25 · 12, 35 · 14 példákat, „egyenleteket” (□ · 24 = 720, 1500 : △ = 25) és egy kitalált tankönyvszállítós feladatot tartalmazott. Most a TK 144. oldal valódi feladatai (tényezők változása, összehasonlítás, következtetés, diagram, Lepkefutam, gyertya) és a munkafüzet 63–65. oldala (táblázat, összevonás, láncok, sorozatok, szabálytáblázat) szerepelnek.
- A lecke helyes száma a diákzónában: VII. fejezet 3. lecke.

---

## 💻 Elkészített Komponensek

1. **`MulRelationsFigures.tsx`**:
   - `FactorChangeSvg` (126 · 23 → 226 · 23 → 326 · 23, +100 / +2300), `DoubleHalfSvg` (61 · 80 = 122 · 40 = 244 · 20), `BirdsChartSvg` (madarak napi útja), `TicketTableSvg` (320 Ft-os belépők táblázata), `DistributiveSvg` (26 · 14 + 45 · 14 téglalapmodell), `ChainShortcutSvg` (61 · 10 · 10 = 61 · 100).
   - Exportált adatok: `BIRDS`, `TICKET_PEOPLE`.
2. **`MulRelationsTheory.tsx`**: Mit tanulunk?, tényezők változása (táblázat), következtetés (árak, Manó zsebpénze), diagram, összevonás és láncok, sorozatok és többszörösök, „Vigyázz!” (gyertya, kétszeres ≠ kettővel több). Exportálja a `describeChange` és `ticketReasoning` függvényt.
   - **I. labor:** Szorzatváltoztató – a 61 · 80 tényezőinek duplázása / felezése gombokkal, a szorzat változásának szöveges visszajelzésével.
   - **II. labor:** Következtető táblázat – a 320 Ft-os belépők táblázatának kitöltése választással, a gondolatmenet megmutatásával.
3. **`MulRelationsMatcher.tsx`**: 3 szint × 8 pár (következtetés; duplázás–felezés; összevonás).
4. **`MulRelationsSorter.tsx`**: 3 szint × 3 kategória × 9 elem (kétszeresére nő / nem változik / felére csökken; 2520 / 4880 / 3600; belépők ára < 5000 / 5000–8000 / > 8000 Ft).
5. **`MulRelationsQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 18 kérdés ábrával (szorzássorok, kétsoros táblázatok, oszlopdiagram, nyílláncok, sorozatok, szabálytáblázat, téglalapmodell), 3 puskakártyával.

Azonosítók: kvíz `g4-wmult-osszefuggesek-quiz`, párosító `g4-wmult-osszefuggesek-matcher`, csoportosító `g4-wmult-osszefuggesek-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic7MulRelations.test.tsx` (4 komponens, 6 SVG ábra, a szorzatváltozás leírása és a belépőárak következtetése).
