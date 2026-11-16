# 1. A negatív számok a mindennapokban (tankönyv 87–89. oldal, munkafüzet I. 82–83. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 87–89. oldal) és munkafüzet (`OH-MAT04MA_I`, 82–83. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a IV. fejezet 1. leckéje.

---

## 🎯 Tananyag Áttekintés

- **Nyitókép és történet (87. o.)**: grönlandi táj hegyekkel (330 m, 350 m – jegesmedve, 400 m – zászló, 270 m, 250 m, 150 m), a tengerszint 0 m, a mélyben −50 m. Manó: „Reggel 7 órakor −6 °C volt.” Magyarországon is volt már −30 °C alatti hideg.
- **1. feladat (88. o.)**: reggeli hőmérsékletek táblázata – Budapest 3 °C, Pécs 5 °C, Zirc −1 °C, Zabar −10 °C, Miskolc −3 °C, Szeged 0 °C; legmelegebb Pécs, leghidegebb Zabar (különbség 15 °C); Miskolcon 6 °C-kal hidegebb, mint Budapesten; Szegeden 1 °C-kal melegebb, mint Zircen; esti változások: 0 °C, 7 °C, −5 °C, −8 °C, −3 °C, −2 °C.
- **2. feladat (88. o.)**: Manó grafikonja óránként 8 és 19 óra között: −3, −1, 0, 2, 5, 6, 4, 2, 0, −1, −2, −4 °C (legmelegebb 13 órakor, 6 °C).
- **3–7. feladat (89. o.)**: hőmérsékletek beállítása műanyag hőmérőn (−21, −30, −5, −3, 0, 18 °C) és csökkenő sorrend; iskolai mérések (20 °C, 18 °C, 5 °C); −17 °C + 10 °C emelkedés = −7 °C; igaz/hamis állítások (pl. a −10 °C hidegebb, mint a −1 °C); hétköznapi hőmérsékletek pótlása.
- **Munkafüzet I. 82.**: a 0-nál kisebb számok bekeretezése (−100, −520, −13, −2005, −1000, −37, −25), a nem negatív számok összege 50 + 2400 + 1250 = 3700; hőmérsékletek és szavak (szánkózás, olvadás, virágzás, napozás, szüretelés, a víz forráspontja 100 °C); hőmérők jelölése (−4, −2, 1, −8, −10, −6 °C).
- **Munkafüzet I. 83.**: −25…+25 °C-os hőmérők leolvasása (−15, 15, −10, 10 °C).
- A lecke kiegészítésként a lift / mélygarázs szintjeit (földszint = 0, −1, −2) és az adósság előjelét is bemutatja (a fabatkás modell a 3. leckében).

> **⚠️ CSAPDA:** a −10 °C nem melegebb a −1 °C-nál, mert „a 10 több” – a mínusz után álló nagyobb szám mélyebben van a 0 alatt.

### A régi README javított hibái
- LaTeX-jelölések ($-5\,^\circ\text{C}$ stb.) helyett a tankönyv írásmódja (−5 °C).
- A régi, cím alapján írt tartalom helyett a tankönyv valódi feladatai és adatai szerepelnek (településtáblázat, Manó grafikonja, grönlandi kép).

---

## 💻 Elkészített Komponensek

1. **`NegativesEverydayFigures.tsx`**:
   - `ThermometerSvg`: hőmérő −6 °C-kal, fagypont jelölve.
   - `SeaLevelSvg`: hegyek, tengerszint (0 m), −50 m mélység.
   - `TownTempsSvg`: a 88. oldali táblázat két hőmérővel.
   - `DayGraphSvg`: Manó óránkénti grafikonja (`DAY_TEMPS` adatok).
   - `FloorsSvg`: ház emeletekkel és mélygarázzsal (földszint = 0).
   - `WeatherWordsSvg`: mihez illik a hőmérséklet (munkafüzet 82. o.).
   - Segédek: `ThermoGroup` (újrahasznosítható hőmérő), `fmtNum`, `fmtTemp`.
2. **`NegativesEverydayTheory.tsx`**: Mit tanulunk?, településtáblázat kidolgozva, grafikon, tengerszint–emeletek–adósság, mihez illik, „Vigyázz!” csapda. Exportálja: `tempWord`, `SIGN_TASKS`.
   - **I. labor:** játék hőmérő – a tankönyvi kártyák értékeit ▲ ▼ gombokkal kell beállítani, ellenőrzéssel.
   - **II. labor:** „Írd le számmal!” – hétköznapi helyzetekhez (fagy, mélygarázs, tengerszint, adósság) kell kiválasztani az előjeles számot.
3. **`NegativesEverydayMatcher.tsx`**: 3 szint × 8 pár (helyzet → szám, mihez illik a hőmérséklet, változások).
4. **`NegativesEverydaySorter.tsx`**: 3 szint × 3 kategória × 9 elem (negatív / 0 / pozitív; fagypont alatt / fagypont / felett; melegebb / hidegebb / nem változott).
5. **`NegativesEverydayQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), ábrákkal (hőmérő, táblázat, grafikon, tengerszint, emeletek), 3 puskakártyával.

Azonosítók: kvíz `g4-neg-mindennapok-quiz`, párosító `g4-neg-mindennapok-matcher`, csoportosító `g4-neg-mindennapok-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic4NegativesEveryday.test.tsx` (4 komponens, 6 SVG ábra, kvízszerkezet, számformázás).
