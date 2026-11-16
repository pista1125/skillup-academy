# 4. A tömeg mérése (II. Mérések, 4. lecke)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., **61–63. oldal**) és munkafüzet (`OH-MAT04MA_I`, **54–56. oldal**) alapján kidolgozott modul 4. osztályosoknak.

---

## Tananyag Áttekintés

- **61. o.:** ismétlés: **1 kg = 100 dkg** (kétkarú mérleg); a tízórai mérése dkg pontossággal; 1 dkg-nál könnyebb tárgyak keresése. A családi gazdaság termése oszlopdiagramon (fokhagyma 1000 kg, vöröshagyma 750 kg, sütőtök 300 kg, burgonya 1000 kg, sárgarépa 600 kg) – igaz/hamis állítások, összesen 3650 kg; zöldségszállító autó: 3500 kg megengedett össztömeg, 1250 kg az autó, 90 kg a sofőr → legfeljebb 2160 kg rakomány.
- **62. o.:** konténerek (6000 kg össztömeg, üresen 3800 kg → 2200 kg rakomány; 1600 kg sárgarépa, 2020 kg hagyma, 180 kg burgonya mellé még 600, 180, 2020 kg fér); **a gramm: 1 dkg = 10 g, 1 kg = 1000 g**; fűszerek csoportosítása: 10 dkg-nál kevesebb / pont 10 dkg / több (bazsalikom 8 g, rozmaring 15 g, tárkony 5 g, petrezselyem 30 g, fekete bors 100 g, kakaó 150 g, mustár és csípős paprika 200 g, őrölt paprika 250 g, ételízesítő 500 g); kamrapolc-sorrendek.
- **63. o.:** Nagyi és Bianka fatörzstorta-receptje (5 púpozott evőkanál liszt = 10 dkg, 7 evőkanál kristálycukor = 14 dkg, 3 tojásnyi vaj = 18 dkg, 1 tábla csoki = 150 g) – átváltás grammra; élelmiszerek tömegének becslése (sajt 25 dkg, cukkini 90 dkg, alma 230 g, szilva 6 dkg, zsák 1500 dkg → „TÖMEG”).
- **Munkafüzet 54–56. o.:** dkg-ban adott mennyiségek egész kg-ok közé helyezése (96, 72, 44, 58 dkg); almák mérése és kerekítése; mértékegységek sorrendje váltószámokkal; 10 g, 11 g, 20 g, 27 g, 35 g, 200 g átváltása; növekvő sorrend (80 g, 100 g, 10 dkg, 250 g, 1 kg); mérlegek egyensúlya (1 kg = 2 · 500 g = 4 · 250 g = 5 · 200 g = 10 · 100 g); fűszertáblázat g ↔ dkg; keksztekercs (95 dkg tészta + 35 dkg töltelék = 130 dkg).

## Mértékegységek

| Egység | Jele | Kapcsolat |
|---|---|---|
| kilogramm | kg | 1 kg = 100 dkg = 1000 g |
| dekagramm | dkg | 1 dkg = 10 g |
| gramm | g | – |

> **Csapda:** a g és a dkg összekeverése (50 dkg + 10 g = 51 dkg, nem 60 dkg).

> **Javítás a régi README-hez képest:** a korábbi leírás a tonnát (t) és LaTeX-képleteket is tartalmazott. A tankönyv ezen oldalai a **kg, dkg, g** egységeket tanítják, tonnát nem – a modul ezt követi.

---

## Elkészített Komponensek

1. **`MassMeasureFigures.tsx`**
   - `BalanceScaleSvg`: kétkarú mérleg egyensúlyban: 1 kg = 5 · 20 dkg = 100 dkg.
   - `MassUnitLadderSvg`: kg → dkg → g lépcső (· 100, · 10).
   - `HarvestChartSvg`: a családi gazdaság termése (oszlopdiagram).
   - `ContainersSvg`: a három konténer és a 2200 kg-os rakományhatár.
   - `KitchenScalesSvg`: konyhai mérleg: 1 dkg = 10 g, 1 kg liszt = 1000 g.
2. **`MassMeasureTheory.tsx`**: mértékegységek, becslési táblázat, fűszerek csoportosítása, kidolgozott példák (diagram, szállítóautó, recept, konténerek), csapda.
   - **Labor I – Kétkarú mérleg:** a bal serpenyőben élelmiszer, a gyerek súlyokat (50 dkg … 1 g) tesz a jobb serpenyőbe; a mérleg karja dől, egyensúlynál visszajelzés.
   - **Labor II – Tömeg-átváltó:** generált kg / dkg / g feladatok 4 válaszgombbal, pontszámlálóval.
3. **`MassMeasureMatcher.tsx`**: 3 szint × 8 pár (egységek, fűszerespolc, becslés és szöveges feladatok).
4. **`MassMeasureSorter.tsx`**: 3 szint × 3 kategória × 9 elem (g / dkg / kg; < 10 dkg / = 10 dkg / > 10 dkg; < 1 kg / = 1 kg / > 1 kg).
5. **`MassMeasureQuiz.tsx`**: 30 kérdés (10–10–10), 13 kérdésnél ábra (mérleg, konyhai mérleg, diagram, konténer, autó), 3 puskakártya.

Azonosítók: kvíz `g4-meas-tomeg-quiz`, párosító `g4-meas-tomeg-matcher`, csoportosító `g4-meas-tomeg-sorter`.

---

## Tesztelés

`src/test/grade4Topic2MassMeasure.test.tsx` – a 4 komponens és mind az 5 SVG ábra renderelése.
