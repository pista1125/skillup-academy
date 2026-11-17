# 3. Az űrtartalom mérése (3. osztály, IV. Mérések)

**Források:** tankönyv OH-MAT03TA 47–48. oldal, munkafüzet OH-MAT03MA I. kötet 52–55. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 47.:** öntözőkanna űrtartalmának mérése különböző edényekkel, becsléssel; az új mértékegység: **centiliter (cl)**; 1 dl = 10 cl, 1 l = 100 cl (mérőedények képe); keret: 1 l = 10 dl, 1 dl = 10 cl, 1 l = 100 cl; melyik edénnyel töltenél meg egy hordót (5 cl, 2 dl, 1 l, 2 l).
- **TK 48.:** állatok napi vízfogyasztása, átváltás dl-re és csökkenő sorrend; félliteres üveg pótlása, termoszból csészék (fél l, 5 cl); „ne lépj 2 l-nél többre” útvesztő; poharak, kancsó, palack átváltása cl-re.
- **MF 52–55.:** mérés dl-es és cl-es mérőpohárral, edény ↔ űrtartalom párosítás, kakaós kancsó, tréfás feladat (1 l-es edény, 60 cl + 60 cl), igaz/hamis állítások, álló oszlopdiagram (cl), turmix belefér-e az 1 l-es kancsóba, tigriskölykök cumisüvege, „□ + △ = 1 liter” táblázat, mondatok kiegészítése mértékegységgel, vödör, tehén vízfogyasztása, aranyhal: egyenlők színezése.

## Mit csinál a DiákZóna lecke?

Bevezeti a centilitert, és a három mértékegységet (l, dl, cl) 200-as számkörben gyakoroltatja: edények becslése (néhány cl / dl / l), 1 l = 10 dl = 100 cl képpel, átváltás oda-vissza (3 dl = 30 cl, 60 cl = 6 dl, 1 l 4 dl = 14 dl, 1 l 25 cl = 125 cl), összehasonlítás átváltással, mérőkancsó leolvasása, álló oszlopdiagram (saját gyümölcsital-recept), pótlás 1 literre, kifolyás (túltöltés), rövid szöveges feladatok (termosz és csészék, poharak száma, egy hét vízfogyasztása).

## Komponensek

1. **`CapacityG3Parts.tsx`** – nagy, feliratos mérőkancsó dl- és cl-vonalakkal, „?” jelöléssel (`BigJug`), álló oszlopdiagram (`ClBarChart`), saját adatok (`DRINK`: almalé 40, narancslé 30, víz 20, citromlé 10 cl). Az edényikonok a `../mit-mivel-merunk/WhatToMeasureG3Parts` közös készletéből jönnek.
2. **`CapacityG3Figures.tsx`** – `ContainersSvg`, `LiterDlClSvg`, `MeasuringJugSvg`, `ClConvertSvg`, `DrinkChartSvg`.
3. **`CapacityG3CardFigures.tsx`** – `JugCard` (kancsó 10 vonallal, opcionális „?” a tetejéig), `TwoBottlesCard`; újrahasznosítja az `IconCard` és `BottlesGlassesCard` kártyát.
4. **`CapacityG3Theory.tsx`** – Mit tanulunk?, mennyi fér bele, l–dl–cl, átváltás, leolvasás, 3 mintapélda (pótlás 1 l-re, termosz, kifolyás), „Vigyázz!” (1 l ≠ 10 cl; 8 dl < 1 l).
   - **Labor I – Töltsd ki pontosan!** Cél (pl. „4 dl 5 cl” vagy „45 cl”), +1 dl / +5 cl / +1 cl és visszaöntés gombok, a kancsóban emelkedik a víz, túltöltésnél „Kifolyt!”, ellenőrzés: mennyi hiányzik / mennyi a sok. „Új feladat”.
   - **Labor II – Váltsd át!** Véletlen feladat 6 típusból (l→dl, dl→cl, 1 l x dl→dl, cl→dl, 1 l x cl→cl, x cl + ? = 1 l); hibára szabott tipp (100-zal szorzott 10 helyett, fordított irány, 1 l = 10 cl tévhit, tízesátlépés).
5. **`CapacityG3Quiz.tsx`** – `CAPACITY_G3_QUESTIONS`: 30 kérdés (10/10/10), 24 kérdésnél ábra, minden kérdésnél badge, 3 puska. `g3-meas-urtartalom-quiz`.
6. **`CapacityG3Matcher.tsx`** – `CAPACITY_G3_MATCHER_LEVELS`: kancsó leolvasása és alapátváltások; palack + poharak ↔ dl és vegyes átváltások; „mennyi kell még 1 literhez?”. Szintenként 4 képes kártya. `g3-meas-urtartalom-matcher`.
7. **`CapacityG3Sorter.tsx`** – `CAPACITY_G3_SORTER_LEVELS`: néhány cl / dl / liter fér bele; 1 l-nél kevesebb / pontosan 1 l / több; ugyanannyi: 5 dl / 1 l / 2 l. Szintenként 4–6 képes elem. `g3-meas-urtartalom-sorter`.

**Teszt:** `src/test/grade3Topic4CapacityG3.test.tsx`

## Eltérések a tankönyvtől

- **Megoldhatatlan útvesztő (TK 48/7.):** „Csak azokra a területekre lépj, amelyeken a mennyiség nem több 2 l-nél!” A mezők többsége literben áll (105 l, 150 l, 147 l, 168 l, 200 l…), ezek messze 2 l fölött vannak; 2 l-nél nem több csak a 175 cl, a 15 cl és a 200 cl (Z, Í, V), ebből nem jön ki értelmes szó. Ha a „l” sajtóhiba „cl” helyett, akkor 12 mező lenne jó, és abból sem lesz szó. Valószínűleg mértékegység-elírások. Ilyen feladatot nem vettünk át; a mi „1 l-nél kevesebb / több” csoportosításunk egyértelmű.
- **Pontatlan állítás (TK 47/2. a):** „Mennyi folyadék fér bele egy csészébe? A tanult mértékegységekkel nem tudod kifejezni.” Egy teáscsészébe kb. 2 dl fér, ez dl-ben kifejezhető. Csak a kis **kávéscsészénél** kell a cl; nálunk így szerepel.
- **Valószerűtlen / kétértelmű párosítás (MF 52/2.):** termosz, piros csésze, cseppentős üvegcse, csíkos bögre ↔ 1 cl, 1 l, 2 dl, 5 cl. Az egyik bögrének 5 cl jutna, ami egy bögrénél valószerűtlen, és a csésze–bögre párosítás kétféleképpen is jó lehet. Nálunk: kávéscsésze 6 cl, bögre 3 dl, palack 1 l, vödör 10 l.
- **„Fél liter” tört a törtek előtt (TK 48/5–6., MF 55/11.):** a „fél” a XIV. fejezetben jön. Feladatban 5 dl-t / 50 cl-t írunk; a Tananyagban egy tippdoboz mondja el, hogy a „félliteres üveg” 5 dl = 50 cl.
- **Tudatos didaktikai változtatások:**
  - A könyv a cl-t képsorral vezeti be (10 kis edény = 1 dl); nálunk a Laborban a gyerek maga tölt dl-enként és cl-enként, és látja, hogy 10 cl egy dl-vonalnyi.
  - Az összehasonlításnál külön csapdadoboz: „8 dl vagy 1 l? A nagyobb szám nem mindig a több.”
  - A kifolyás (túltöltés) gondolatát a munkafüzet tréfás feladata (MF 52/4.) alapján saját számokkal mintapéldában, kvízben és a Laborban is megmutatjuk.
  - Saját számok és helyzetek; a könyv szereplőit (Hedvig, Anna, Géza bácsi, a tigriskölykök) és állatos táblázatát nem vettük át.
