# 7. Osztás 8-cal

## Források
- *Matematika 2. osztályosoknak II. kötet* (`OH-MAT02TA_II.pdf`), 61–64. o. (Szorzás, osztás 8-cal), 65. o. (A 2-es, a 4-es és a 8-as szorzótábla kapcsolata – „fele, negyede, nyolcada”), 67. o. (Egerek és macskák), 68. o. (Maradékos osztás 8-cal)
- *Matematika munkafüzet 2. osztályosoknak II. kötet* (`OH-MAT02MA_II.pdf`), 41–43. o.

## Mit tartalmaznak az oldalak?
- **TK 61.** 64 sajtdarab szétosztása nyolcasával („Ennyi sajt van / Ennyi egérnek jut”).
- **TK 62–64.** A 8-as tábla mellett a bennfoglaló tábla (`0 : 8 = 0` … `80 : 8 = 10`), vegyes osztások (`□ = 48 : 8`), sajtcsomagolás naponta (`24`, `64`, `48`, `72`, `80`, `32` sajt → dobozok), „nyolcszorosa / nyolcada” nyilak, szorzás és osztás ugyanarról az ábráról.
- **TK 65.** Nyílláncok (`24 : □ → 3`, `: 2`, `: 4`), „80 fele → nyolcada → nyolcszorosa → negyede”; tejeskancsók és poharak táblázata.
- **TK 67.** Szöveges feladatok (80 m-es út 8 m/perc, sajtevő verseny, egymás felé haladó egerek).
- **TK 68.** Maradékos osztás: nyolcszögek pálcikákból (25, 27, 30 pálcika), sajtok dobozba nyolcasával; jelölés: `□ · 8 + □ = 17`, táblázat „Sajtok száma / Dobozok száma / Maradék sajt”.
- **MF 41–43.** Egyenlő osztozkodás 8 kisegér között, osztások, harmada / nyolcada / fele színezése, osztozkodási táblázat, nyílláncok; maradékos feladatok: pizzaszeletek 8 gyereknek, gyöngyök 8 karkötőre (34, 25, 18), 75 sajt nyolcasával asztalokra.

## A DiákZóna lecke
- **Tananyag:** bennfoglalás („hány nyolcas van benne?”), szétosztás 8 részre, a 8-as bennfoglaló tábla a szorzás mellé írva, **nyolcszorosa / nyolcada**, trükk: **felezd háromszor** (fele → negyede → nyolcada, a 2-es, 4-es és 8-as tábla kapcsolata), **maradékos osztás** a könyv jelölésével („Ennyi csoport / Ennyi maradt”) és szorzásos ellenőrzéssel (`4 · 8 + 3 = 35`), „hány asztal kell?” (felfelé kerekítés), 3 mintapélda, „Vigyázz!” (a maradék kevesebb, mint 8; az osztás nem kivonás).
- **Labor I – Szétosztás 8 tányérra:** a gyerek koppintással vagy „Mindenkinek 1-1” gombbal osztja ki a sütiket (8 tányér, 2 sorban), majd megadja, mennyi jutott egy tányérra. Visszajelzés: maradt a kosárban / nem egyforma / jó válasz + ellenőrzés.
- **Labor II – Maradékos osztás 8-cal:** a gyerek nyolcasával (soronként) bekarikázza a korongokat, majd léptetővel megadja a csoportok számát és a maradékot. Ha a maradék ≥ 8, a program figyelmeztet.
- **Kvíz:** 30 kérdés (10/szint), 20 kérdés ábrával; `+ − · :` műveletek, minden szám ≤ 80; pénz csak Ft.
- **Párosító:** 3 × 8 pár (hányados; szorzás ↔ osztás; maradékos osztás és visszafelé `4 · 8 + 7`). **Csoportosító:** 3 × 9 elem (hányados; maradék 0/3/7; 5-höz viszonyítás).

## Fájlok és teszt
- `Div8G2Parts.tsx` — közös SVG-elemek (`EightBoxPart`, `PlatePart`, `DotRowsPart`, `JumpLinePart`, `OctopusPart`) és a két labor (`ShareLab`, `RemainderLab`)
- `Div8G2Figures.tsx` — `GroupingBoxesSvg`, `SharingPlatesSvg`, `EighthArrowsSvg`, `HalveThriceSvg`, `RemainderGroupsSvg`, `RoundUpTablesSvg`
- `Div8G2CardFigures.tsx` — kártyaképek (`DotsCard`, `JumpsToCard`, `PlatesCard150`, `HowManyBoxesCard150`, `HalveCard150`)
- `Div8G2Theory.tsx`, `Div8G2Quiz.tsx` (`g2-osztas-8-quiz`), `Div8G2Matcher.tsx` (`g2-osztas-8-matcher`), `Div8G2Sorter.tsx` (`g2-osztas-8-sorter`)
- Teszt: `src/test/grade2Topic5Div8G2.test.tsx`

## Eltérések a tankönyvtől
- **Maradékos jelölés:** a könyv jelölését használjuk („Ennyi csoport / Ennyi maradt”, ellenőrzés `□ · 8 + □`, TK 68/2.); nem írunk „43 : 8 = 5 maradék 3” alakot. A csoportosítóban a maradékos feladatok „19 korong” alakban szerepelnek, nem osztásjellel.
- **„A maradék kevesebb, mint 8”:** a könyv ezt nem mondja ki; a DiákZóna „Vigyázz!” dobozban, a laborban és egy kvízkérdésben is kiemeli.
- **Kétértelmű / túl nehéz szöveges feladatok (TK 67.):** a 6. feladat (két egér 80 m-re, „egyenes vonalban haladnak”, nyolc-nyolc métert percenként) nem mondja ki, hogy egymás felé mennek, és `80 : 16`-ot kíván, ami nincs a 8-as táblában; a 4. feladat (8 órától 9 óra 4 percig) óra–perc átváltást is kér. Ezeket nem vettük át.
- **Rejtett csapda (MF 43/1.):** „Viktor 7 osztálytársával” – a gyerekek könnyen 7-tel osztanak 8 helyett, és a feladat két lépéses (5 · 6 = 30 szelet, majd szétosztás maradékkal). A DiákZóna a szétosztásnál mindig kimondja, hány részre osztunk.
- **Felfelé kerekítés:** a könyv („Hány asztalra jutott nyolc sajt?”) csak a teli csoportokat kérdezi; a DiákZóna külön megmutatja a „Hány asztal / kisbusz kell?” esetet is, ahol a maradéknak is kell egy hely.
- **Felezd háromszor:** a TK 65. „fele – negyede – nyolcada” láncából a DiákZóna kifejezett trükköt csinál (48 → 24 → 12 → 6).
- **Szétválasztott fejezetek:** a TK 61–66. együtt tanítja a szorzást és az osztást; a 8-as szorzás a „7. Szorzás 8-cal” leckében van, itt az osztás áll a középpontban.
- **Saját tartalom:** saját szereplők és helyzetek (golyós dobozok, sütik tányéron, polipok, szőlő, matrica és lufi Ft-os áron, karkötők, asztalok, kisbuszok); a könyv egér–sajt történeteit nem vettük át.
