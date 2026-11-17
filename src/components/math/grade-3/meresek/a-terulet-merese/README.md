# 7. A terület mérése (3. osztály, IV. Mérések)

A terület szemléletes fogalma: mekkora helyet fed le egy síkidom. Lefedés választott egységgel (kis négyzet, fél négyzet, dominó, kis háromszög), megszámlálás, összehasonlítás. Mértékegységet (cm² stb.) nem használunk – a könyv sem –, csak „egységet”.

## Források

- **Tankönyv (OH-MAT03TA):** 148. o. („A terület mérése”)
- **Munkafüzet II. (OH-MAT03MA_II):** 81. o.

## Mi van a tankönyvi és munkafüzeti oldalakon?

- **TK 148/1.:** két alakzat (csónak, cikcakk) lefedése a logikai lapok kis háromszögeivel; páros munka: kis háromszögekből rakott síkidom körberajzolása és lefedése.
- **TK 148/2.:** hat síkidom négyzetrácson (A–F), „hány kis négyzettel fedhető le, hasonlítsd össze”; egység: □.
- **TK 148/3.:** hat síkidom háromszögrácson (hatszög, paralelogrammák, rombusz, háromszög, trapéz), egység: △; sorba rendezés terület szerint. Kiemelt mondat: „Területméréskor a síkidom területét összehasonlítjuk az egységnek választott területtel.”
- **TK 148/4.:** egy téglalap és egy ferde paralelogramma a rácson – „hogyan tudnátok összehasonlítani?”.
- **MF 81/1.:** négy síkidom (négyzet, L, téglalap, háromszög) mérése fél négyzet egységgel, igaz–hamis állítások.
- **MF 81/2.:** ugyanannak a téglalapnak a lefedése az 1. feladat lapjaival, mindig egyforma lapokkal.
- **MF 81/3.:** hatszögek lefedése színes síkidomokkal (trapéz, rombusz, háromszögek).

## Mit csinál a DiákZóna lecke?

Saját síkidomok, saját számok és helyzetek (terítő kendőkből, dominó, virágágyás, Panni és Gergő, Nóra és Dani, Bence). A könyv feladattípusait gyakoroljuk, nem másoljuk.

- **Elmélet:** „Mit tanulunk?”, „Mi a terület?” (lefedés megszámozott négyzetekkel), **„Kerület vagy terület?”** (a határ körben ↔ a belseje; kapcsolat az 5–6. leckével), az egység (ugyanaz a téglalap: 8 négyzet / 4 dominó / 16 fél négyzet – nagyobb egység, kevesebb darab), összehasonlítás (más alak, ugyanakkora terület), fél négyzetek (a ferde síkidom átrendezése téglalappá) és kis háromszögek (rombusz 2, háromszög 4, hatszög 6), 3 mintapélda, „Vigyázz!” (különböző egységgel mért számokat nem lehet csak úgy összevetni; a hosszú nem mindig nagyobb).
- **Labor I – Rakd ki!:** 7 × 5-ös koppintható rács; a gyerek pontosan *n* kis négyzetből (4–12) síkidomot színez. Visszajelzés: hány hiányzik / hány a sok, és szól, ha a négyzetek nem érnek össze oldalukkal. „Új feladat”: új *n*.
- **Labor II – Melyik nagyobb?:** két véletlen, összefüggő síkidom (4–12 négyzet, kb. negyedében egyforma), válasz: A / Egyforma / B. Válasz után a négyzetek megszámozva jelennek meg; a hibás válaszra a két darabszám és tipp jön („ne a hosszát nézd”).
- **Kvíz:** 30 kérdés (10/10/10), 24 ábrával, mind típusjelvénnyel, 3 puskakártya.
- **Párosító:** 3 szint × 8 pár (síkidom ↔ kis négyzetek száma; háromszögrácsos síkidom ↔ kis háromszögek száma; dominós / nagy négyzetes alakzat ↔ kis négyzetek, illetve dominók száma), szintenként 6–7 képes kártya.
- **Csoportosító:** 3 szint × 3 kategória × 9 elem (5 / 6 / 7 kis négyzet; fél négyzetekkel 4 / 5 / 6; „Terület / Kerület / Más mérés” hétköznapi helyzetekkel és ikonokkal), 45 képes elem.

## Komponensek

- `AreaG3Figures.tsx`: `AreaWhatIsSvg`, `AreaUnitsSvg`, `AreaCompareSvg`, `AreaHalvesSvg`, `AreaTrianglesSvg`, `AreaVsPerimeterSvg`
- `AreaG3Parts.tsx`: közös rajzelemek (darabokból álló síkidom automatikus körvonallal, fél négyzet, szabályos kis háromszög, rács, „Egység:” jel), alakzatok (`HEX`, `RHOMB`, `BIGTRI9` …), a laborok generátorai (`randomShape`, `isConnected`, `makeAreaCompareTask`) – a 8. lecke is ezeket használja
- `AreaG3CardFigures.tsx`: kártyaképek (`CardShape`, `CardPolys`, `dominoPolys`, `CardIcon`)
- `AreaG3Theory.tsx`: `AreaG3Theory`
- `AreaG3Quiz.tsx`: `AreaG3Quiz`, `AREA_G3_QUESTIONS` (azonosító: `g3-meas-terulet-quiz`)
- `AreaG3Matcher.tsx`: `AreaG3Matcher`, `AREA_G3_MATCHER_LEVELS` (`g3-meas-terulet-matcher`)
- `AreaG3Sorter.tsx`: `AreaG3Sorter`, `AREA_G3_SORTER_LEVELS` (`g3-meas-terulet-sorter`)

Teszt: `src/test/grade3Topic4AreaG3.test.tsx`

## Eltérések a tankönyvtől

1. **Kiderül, hogyan kell összehasonlítani (TK 148/4.):** a könyv csak megkérdezi, hogyan hasonlítható össze a téglalap és a ferde paralelogramma, módszert nem ad. DiákZóna megmutatja: a lelógó fél négyzetek párba rakva egész négyzetek („6 egész + 4 fél = 8”), és a kvízben is gyakoroljuk.
2. **Az egység szerepe kimondva:** a könyv csak annyit mond: „összehasonlítjuk az egységnek választott területtel”. A 3. osztályos gyereknek ez nehéz mondat. DiákZóna egy ábrán mutatja, hogy ugyanaz a téglalap 8 kis négyzet = 4 dominó = 16 fél négyzet, és hogy különböző egységgel mért darabszámot nem szabad közvetlenül összevetni (csapda-doboz, kvíz, párosító 3. szint).
3. **Kerület ↔ terület szembeállítása:** a könyvben a kerület (TK 146–147.) és a terület oldala egymás után jön, de a kettő különbségéről nincs feladat. DiákZóna külön részt, kvízkérdést és csoportosító szintet ad („Terület / Kerület / Más mérés”), és megmutatja: ugyanakkora terület mellett más lehet a kerület.
4. **Logikai lapok helyett digitális lefedés:** a TK 148/1. kézzel fogható logikai lapokat kér; ezt a laborban a koppintható rács és a háromszögrácsos ábrák pótolják.
5. **Szóhasználat:** a könyv „kis háromszöget” mond a logikai lap háromszögére és a munkafüzetben a fél négyzetre is (MF 81/1.: a fél négyzet derékszögű háromszög). DiákZóna a kettőt megkülönbözteti: „fél négyzet” (2 fél = 1 kis négyzet) és „kis háromszög” (a háromszögrács egysége), hogy ne keveredjen.
6. A régi README a címek alapján készült, LaTeX-szel ($T$) és betűs jelöléssel; most a valódi oldalak alapján átírtuk, betűjel és képlet nélkül.
