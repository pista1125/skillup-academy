# 1. Mit mivel mérünk? (3. osztály, IV. Mérések)

**Források:** tankönyv OH-MAT03TA 44. oldal. (A sorban megadott MF I/48. oldal már a tömeg mérésének első oldala, ezt a 2. lecke dolgozza fel.)

## Mit tartalmaz a könyv oldala?

- **TK 44/1.:** nagy konyhai kép (tej, liszt, kakaó, eper, mérőpohár, konyhai mérleg, tűzhely); beszélgetés: kinek mit lehet megmérni a tömegét, hosszúságát, űrtartalmát, milyen mértékegységgel.
- **TK 44/2.:** tárgyak (pohár üdítő, befőtt, tejesdoboz, dinnye, hal, kenyér, zsák, szörp, üdítő, méz, tejföl) és három mértékegység-kártya: deciliter, liter, kilogramm. „Melyik mértékegységgel mit mérnétek?”

## Mit csinál a DiákZóna lecke?

Áttekintő bevezető a fejezethez. A gyerek szétválasztja a három mennyiséget (hosszúság, tömeg, űrtartalom), megismeri a hozzájuk tartozó mérőeszközöket (vonalzó, mérőszalag; kétkarú, konyhai és személymérleg; mérőpohár, mérőkancsó), és a 2. osztályból ismert mértékegységeket (m, cm, kg, l, dl) a helyes mennyiséghez rendeli. Becslés: reális szám + mértékegység választása (15 cm-es ceruza, 2 dl-es pohár, 3 kg-os dinnye). Rövid átváltás: 1 m = 100 cm, 1 l = 10 dl. A számkör 200-ig tart. Előre jelzi az új mértékegységeket (dkg, cl), de nem tanítja őket.

## Komponensek

1. **`WhatToMeasureG3Parts.tsx`** – közös ikonkészlet a fejezet 1–3. leckéjéhez (vonalzó, mérőszalag, kétkarú mérleg billenéssel, konyhai/rugós/személymérleg, mérőkancsó dl-vonalakkal, pohár, csésze, bögre, palack, vödör, kád, tárgyak, súly feliratokkal).
2. **`WhatToMeasureG3Figures.tsx`** – `ThreeQuantitiesSvg`, `MeasuringToolsSvg`, `KnownUnitsSvg`, `RightUnitSvg`, `MeterLiterSvg`, `EstimateBucketSvg`.
3. **`WhatToMeasureG3CardFigures.tsx`** – kártyaábrák: `IconCard`, `MeterSticksCard`, `BottlesGlassesCard`, `LabelledIconCard`, `ScenarioCard`.
4. **`WhatToMeasureG3Theory.tsx`** – Mit tanulunk?, három kérdés – három mennyiség, mérőeszközök, ismert mértékegységek, becslés és mérés, 3 mintapélda, „Vigyázz!” (2 dl ≠ 2 l).
   - **Labor I – Mivel mérjük?** Kép + kérdés („Milyen nehéz a könyv?” / „Milyen hosszú a könyv?”), három eszközgomb, a tévesen választott eszközhöz szabott visszajelzés, „Új feladat” (15 helyzet).
   - **Labor II – Válaszd a jó mértékegységet!** „A ceruza 15 ? hosszú.” – cm, m, kg, dl, l gombok; ha más mennyiség egységét választja: „A kg-mal tömeget mérünk…”, ha jó mennyiség, de rossz méret: „Az túl sok/kevés lenne!”.
5. **`WhatToMeasureG3Quiz.tsx`** – `WHAT_TO_MEASURE_G3_QUESTIONS`: 30 kérdés (10/10/10), 25 kérdésnél ábra, minden kérdésnél badge, 3 puska. Azonosító: `g3-meas-mit-mivel-quiz`.
6. **`WhatToMeasureG3Matcher.tsx`** – `WHAT_TO_MEASURE_G3_MATCHER_LEVELS`: eszközkép ↔ név és jel ↔ név; tárgykép ↔ reális mennyiség; méterrudak / palackok + poharak ↔ cm / dl. Szintenként 4–5 képes kártya. `g3-meas-mit-mivel-matcher`.
7. **`WhatToMeasureG3Sorter.tsx`** – `WHAT_TO_MEASURE_G3_SORTER_LEVELS`: hosszúság / tömeg / űrtartalom; 1. szint eszközök, 2. szint mértékegységek, 3. szint mérési helyzetek és kérdések. Szintenként 4–5 képes elem. `g3-meas-mit-mivel-sorter`.

**Teszt:** `src/test/grade3Topic4WhatToMeasureG3.test.tsx`

## Eltérések a tankönyvtől

- **Még nem tanult mértékegység a képen (TK 44/1.):** a tűzhely mellett „800 mm” felirat áll, a milliméter viszont csak a hosszúság mérésénél (TK 142.) jön. Nálunk a hosszúság csak m és cm.
- **Gramm a mérleg kijelzőjén (TK 45/1., a fejezet nyitó mérleg-képe):** a digitális konyhai mérleg „0.0 g”-ot mutat, a grammot a 3. osztály nem tanítja. A mi mérlegeink számlap nélküli ikonok vagy dkg-beosztásúak.
- **Hiányzó mennyiség (TK 44/2.):** a feladat csak dl, l és kg kártyát ad, hosszúságot nem; a három mennyiséget mi egyformán gyakoroltatjuk.
- **Sorrend a forrásban:** a sorban az 1. leckéhez rendelt MF I/48. oldal valójában „A tömeg mérése” első oldala; a 2. lecke dolgozza fel.
- **Tudatos didaktikai változtatások:**
  - A könyv oldala csak beszélgetést kér; nálunk minden döntés azonnali, a hibára szabott visszajelzést kap.
  - „Ugyanaz a tárgy, más kérdés”: a könyvet és a gyereket egyszer hosszúság, egyszer tömeg szerint kérdezzük, hogy kiderüljön: a kérdés dönti el, mit mérünk.
  - Becslés: a rossz válaszok tipikus hibák (jó szám, rossz mértékegység: 15 m; jó mennyiség, rossz méret: 2 l a pohárban).
  - Saját tárgyak és helyzetek; a könyv konyhai jelenetét és szereplőit nem vettük át.
