# 2. A tömeg mérése (3. osztály, IV. Mérések)

**Források:** tankönyv OH-MAT03TA 45–46. oldal, munkafüzet OH-MAT03MA I. kötet 48–51. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 45.:** mérlegek (kétkarú, konyhai, rugós, bolti, személy-, raktári), karral „mérés” játék, az új mértékegység: **dekagramm (dkg, dag)**, súlyok 50, 25, 10, 5, 1 dkg; egyensúly 1 kg-mal; keret: **1 kg = 100 dkg**.
- **TK 46.:** tankönyvek tömegének becslése és mérése, „1 kg-nál könnyebb” tárgyak, színes rudak a mérlegen, vízszintes oszlopdiagram (só, cukor, liszt, őrölt paprika dkg-ban), bevásárlólista összegzése a táska tömegével.
- **MF 48–51.:** <, > élelmiszerek között (kg, dkg, fél kg), súlyok rajzolása egyensúlyhoz, gyümölcssaláta összege, recept és dupla adag, „torta” színezése feltételek szerint (135 dkg < ♣ < 140 dkg…), vásárlás összege, egész kg számszomszédok, ugyanannyi párosítása (111 dkg = 1 kg 11 dkg), <, >, = , növekvő sorrend, mókus-feladat (kétszer annyi, 50 dkg-mal több), labirintus 2 kg almával.

## Mit csinál a DiákZóna lecke?

Bevezeti a dekagrammot, és mindent 200 dkg-ig (2 kg-ig) gyakoroltat: mérlegfajták, súlykészlet (1 kg, 50, 20, 10, 5, 1 dkg), 1 kg = 100 dkg a kétkarú mérlegen, kg + dkg ↔ dkg átváltás, összehasonlítás átváltással, egész kg szomszédok, konyhai mérleg számlapjának leolvasása, vízszintes oszlopdiagram, „mennyi hiányzik 1 kg-hoz / 2 kg-hoz”, rövid szöveges feladatok (bevásárlás, tál, recept dupla adag, egyforma almák a mérlegen). Mértékegységek: csak kg és dkg (gramm nincs).

## Komponensek

1. **`MassG3Parts.tsx`** – konyhai mérleg számlappal (`DialScale`, `KitchenScale`), vízszintes oszlopdiagram (`MassBarChart`, saját kamra-adatok: zab 60, rizs 100, alma 130, mazsola 20 dkg), súlysor (`WeightRow`). A súly- és mérlegikonok a `../mit-mivel-merunk/WhatToMeasureG3Parts` közös készletéből jönnek.
2. **`MassG3Figures.tsx`** – `ScaleKindsSvg`, `WeightSetSvg`, `KgEqualsDkgSvg`, `KgDkgSplitSvg`, `KitchenDialSvg`, `PantryChartSvg`.
3. **`MassG3CardFigures.tsx`** – `WeightsCard` (párosító), `WeightsSmallCard` (csoportosító), opcionális „= 1 kg” felirattal és „?” súllyal.
4. **`MassG3Theory.tsx`** – Mit tanulunk?, mérlegek, a dekagramm, 1 kg = 100 dkg, kg és dkg együtt, összehasonlítás, leolvasás (számlap, diagram), 3 mintapélda, „Vigyázz!” (1 kg 5 dkg ≠ 15 dkg, 1 kg 50 dkg ≠ 1050 dkg).
   - **Labor I – Hozd egyensúlyba a mérleget!** Ismeretlen tömegű zsák (15–200 dkg), súlyok rakása/levétele koppintással, a mérleg karja animáltan billen; visszajelzés: melyik oldal van lent, mit tegyen; egyensúlynál kiírja a tömeget kg + dkg alakban is. „Új feladat”.
   - **Labor II – Váltsd át!** Véletlen feladat: „1 kg 37 dkg = ? dkg”, „164 dkg = ? kg ? dkg”, „65 dkg + ? = 1 kg”; hibára szabott tipp (1 kg-ot 1 dkg-nak vette; egymás mellé írta: 1037; tízesátlépés hibája).
5. **`MassG3Quiz.tsx`** – `MASS_G3_QUESTIONS`: 30 kérdés (10/10/10), 20 kérdésnél ábra, minden kérdésnél badge, 3 puska. `g3-meas-tomeg-quiz`.
6. **`MassG3Matcher.tsx`** – `MASS_G3_MATCHER_LEVELS`: súlyok összege ↔ dkg; súlyok / dkg ↔ kg + dkg; hiányzó súly ↔ dkg. Szintenként 4 képes kártya. `g3-meas-tomeg-matcher`.
7. **`MassG3Sorter.tsx`** – `MASS_G3_SORTER_LEVELS`: 1 kg-nál kevesebb / pontosan 1 kg / több; ugyanannyi: 102 / 120 / 200 dkg; még 10 / 20 / 50 dkg kell. Szintenként 4 képes elem. `g3-meas-tomeg-sorter`.

**Teszt:** `src/test/grade3Topic4MassG3.test.tsx`

## Eltérések a tankönyvtől

- **A kép ellentmond a szövegnek (MF 48/1. a):** a lisztes zacskón „1 KG” felirat látszik, alatta viszont „liszt: 5 kg” áll. Nálunk a kép felirata mindig egyezik a feladat számával.
- **Kétféle súlykészlet (TK 45/3. és MF 48/1. b):** a tankönyvben 50, 25, 10, 5, 1 dkg-os súlyok vannak, a munkafüzetben 1 kg, 20 dkg, 10 dkg. Mi végig egy készletet használunk: 1 kg, 50, 20, 10, 5, 1 dkg.
- **Gramm a mérlegen (TK 45/1.):** a digitális mérleg „0.0 g”-ot mutat, a gramm nem tananyag. Nálunk a számlap dkg-os.
- **„Fél kg” tört a törtek előtt (MF 48/1. a, 48/2., 50/6.):** a „fél” a XIV. fejezetben jön. Feladatban nem használjuk; a Tananyagban egyetlen tippdoboz mondja el a hétköznapi kifejezést: „fél kiló” = 50 dkg.
- **Két jel (TK 45/3.):** „dkg vagy dag”. Mi következetesen dkg-ot írunk, a „dag”-ot csak egyszer említjük.
- **Tudatos didaktikai változtatások:**
  - A könyv a kétkarú mérleget csak képen és osztálytermi méréssel mutatja; nálunk a gyerek maga rakja a súlyokat, és a billenő kar azonnal mutatja, melyik oldal nehezebb.
  - Összehasonlítás előtt mindig átváltunk dkg-ra; ezt minden magyarázat kimondja.
  - A konyhai mérleg számlapját is leolvastatjuk (a könyvben csak digitális kijelző és oszlopdiagram van).
  - Saját számok, élelmiszerek és helyzetek; a könyv szereplőit (Zsófi, Mona, Csenge, Misi Mókus) és receptjét nem vettük át.
