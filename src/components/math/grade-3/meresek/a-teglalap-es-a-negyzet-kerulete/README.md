# 6. A téglalap és a négyzet kerülete (3. osztály, IV. Mérések)

**Források:** tankönyv OH-MAT03TA 147. oldal, munkafüzet OH-MAT03MA II. kötet 79–80. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 147.:** téglalap alakú tárgyak keresése, oldalak mérése, körbekerítés fonallal; a téglalap oldalainak mérése, szabály: „A téglalap szemben lévő oldalai egyenlő hosszúak.”; kétféle sorrend a kerülethez (kék–piros–kék–piros, kék–kék–piros–piros); „Az olyan téglalapot, amelynek minden oldala egyenlő hosszúságú, négyzetnek nevezzük.”; a négyzet kerülete; szökőkút 3 m × 2 m körül; négyzet alakú virágágyás 155 cm-es oldallal; rajzolóprogram.
- **MF 79.:** téglalap körbekerítése színes rudakkal; négyzetek gyufaszálakból, becslés; síkidomok kerülete négyzethálón (kék 5 × 1, zöld 4 × 2, narancs 3 × 3 – mindhárom 12 egység); téglalapok rajzolása 16 egység kerülettel.
- **MF 80.:** park térképe (54 m × 28 m, virágágyás 12 m × 20 m, tűzrakó hely 12 m × 12 m, fás rész 15 m × 26 m), ágyásszegély hossza „K = …” alakban; medencék körbejárása (35 m × 18 m, 130 dm × 270 dm).

## Mit csinál a DiákZóna lecke?

Saját példákkal tanítja, hogy a téglalap szemben lévő oldalai egyenlők (a szemben lévő oldalak azonos színűek, a derékszögeket negyedkörív és pont jelöli); a téglalap kerületét mind a négy oldal összeadásával, kétféle sorrendben (6 + 3 + 6 + 3 vagy 6 + 6 + 3 + 3); a négyzetet mint olyan téglalapot, amelynek minden oldala egyenlő, és a kerületét egy oldal 4-szereseként; a különböző alakú, de egyenlő kerületű téglalapokat; valós feladatokat (kerítés, szegély, medence, sportpálya, kapu levonása, két kör); visszafelé számolást (a négyzet oldala a kerületből; a téglalap hiányzó oldala). **Betűs képlet nincs** (nincs K = 2 · (a + b)).

## Komponensek

1. **`RectPerimeterG3Figures.tsx`** – `RectOppositeSvg` (6 cm × 3 cm, szemben lévő oldalak azonos színnel, 4 derékszög-jel), `RectUnfoldSvg` (A: 6 + 3 + 6 + 3, B: 6 + 6 + 3 + 3 = 18 cm), `SquarePerimeterSvg` (4 · 4 cm = 16 cm), `SamePerimeterSvg` (6 × 1, 5 × 2, 4 × 3 – mind 14 egység), `PoolSvg` (25 m × 12 m, 74 m).
2. **`RectPerimeterG3Parts.tsx`** – rajzelemek: derékszög-jel (negyedkörív + pont), a téglalap 4 derékszöge, feliratozott téglalap (szemben lévő oldalak azonos színűek), négyzetrácsos téglalap.
3. **`RectPerimeterG3CardFigures.tsx`** – kártyaábrák: `RectCard`, `GridRectCard`, `DiamondSquareCard` (csúcsára állított négyzet derékszög-jellel), `OtherShapeCard` (rombusz, paralelogramma, háromszög, trapéz).
4. **`RectPerimeterG3Theory.tsx`** – Mit tanulunk?, a téglalap (szemben lévő oldalak, derékszög jele), a téglalap kerülete két úton, a négyzet kerülete, ugyanaz a kerület – más téglalap, 3 mintapélda (medence 74 m; négyzet alakú ágyás 135 cm → 540 cm; négyzet kerülete 28 cm → oldala 7 cm), „Vigyázz!” (6 + 3 = 9 csak két oldal; azonos egység).
   - **Labor I – Építs téglalapot!** Véletlen célkerület (8–28 egység); a gyerek léptetővel állítja a téglalap hosszát és szélességét a négyzetrácson. Visszajelzés a saját téglalapja kerületével (több / kevesebb), külön tipp, ha csak két oldalt adott össze; a megtalált különböző megoldásokat gyűjti.
   - **Labor II – Mennyi szegély kell?** Véletlen valós téglalap vagy négyzet (kert, medence, képkeret, asztallap, sportpálya, virágágyás, homokozó; m, dm, cm; a kerület legfeljebb 1000). A gyerek beírja a kerületet; tipikus hibákra külön tipp (csak két oldal, kihagyott oldal, a téglalapot négyzetnek vette).
5. **`RectPerimeterG3Quiz.tsx`** – `RECT_PERIMETER_G3_QUESTIONS`: 30 kérdés (10/10/10), 22 kérdésnél ábra, minden kérdésnél badge, 3 puska. Azonosító: `g3-meas-teglalap-kerulet-quiz`.
6. **`RectPerimeterG3Matcher.tsx`** – `RECT_PERIMETER_G3_MATCHER_LEVELS`, 3 szint × 8 pár (téglalap/négyzet képe ↔ kerület; rácsos téglalap ↔ egység, valós méretek ↔ kerület; kerület ↔ hiányzó oldal), szintenként 4 képes kártya. `g3-meas-teglalap-kerulet-matcher`.
7. **`RectPerimeterG3Sorter.tsx`** – `RECT_PERIMETER_G3_SORTER_LEVELS`, 3 szint × 3 kategória × 9 elem (négyzet / téglalap, de nem négyzet / nem téglalap; 12 / 16 / 20 cm; kevesebb / pont / több 1 m-nél), szintenként 5–6 képes elem. `g3-meas-teglalap-kerulet-sorter`.

**Teszt:** `src/test/grade3Topic4RectPerimeterG3.test.tsx` (azt is ellenőrzi, hogy nincs betűs kerületképlet).

## Eltérések a tankönyvtől

- **„K =” a munkafüzetben (MF 80/4.):** a munkafüzet a kerületet „K = …” alakban kéri. Nálunk nincs betűs jelölés és képlet; a kerületet szóval mondjuk, és az összeadást mind a négy oldallal leírjuk.
- **Ugyanaz a 12-es kerület (MF 79/3. a):** a munkafüzet mindhárom alakzata 12 egység kerületű, de a feladat nem mondja ki, hogy ez a lényeg. Nálunk saját példán (14 egység) külön ábra és mondat mutatja meg, hogy nagyon különböző téglalapoknak is lehet azonos a kerülete, a laborban pedig a gyerek maga keres több ilyen téglalapot.
- **A derékszög jelölése:** a könyv ábráin a téglalapok és négyzetek derékszögei nincsenek jelölve. Nálunk a magyar szokás szerint negyedkörív és pont jelöli őket, a csúcsára állított négyzeten is.
- **A négyzet is téglalap:** a könyv mondata („Az olyan téglalapot …, négyzetnek nevezzük”) ezt csak sugallja. Nálunk kimondjuk, a Csoportosítóban pedig a kategória „téglalap, de nem négyzet”, és szerepel a csúcsára állított négyzet is (ez is négyzet).
- **Színes rudak (MF 79/1.):** a rúdkészletes körbekerítést nem vettük át (a rudak színe a könyvben sem egyértelmű, lásd a 4. lecke README-jét); helyette a négyzetrácson építünk téglalapot.
- **Saját számok:** a könyv 3 m × 2 m-es szökőkútja, 155 cm-es virágágyása és parkja helyett saját méretek szerepelnek (pl. 25 m × 12 m medence, 125 cm és 135 cm oldalú ágyás, 120 m × 80 m sportpálya); minden kerület legfeljebb 1000.
- **Tudatos didaktikai változtatások:**
  - A könyv két „kiegyenesítő” csíkját (TK 147/2. b) kiegészítettük a két út összeadásával (6 + 3 + 6 + 3 = 6 + 6 + 3 + 3 = 18).
  - Csapdadoboz és laborhibaüzenet figyelmeztet a leggyakoribb hibára: csak két oldal összeadása.
  - Megfordított és kétlépéses feladatok: négyzet oldala a kerületből, téglalap hiányzó oldala, kapu levonása, két kör, drótból hajlított négyzet, két négyzet egymás mellett.
  - A terület nem szerepel (az a 7–8. lecke témája).
