# 5. A kerület mérése (3. osztály, IV. Mérések)

**Források:** tankönyv OH-MAT03TA 146. oldal, munkafüzet OH-MAT03MA II. kötet 78. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 146.:** logikai lapok szélének végigsimítása („oldal”); a matematikakönyv körbekerítése egyforma rudakkal; a katica útja egy négyszög oldalai mentén, az oldalak egy egyenesbe rakva, szabály: „A kerület a síkidomot határoló vonalak hossza. A kerület jele a K.”; pálcikás háromszög, négyzet, ötszög, hatszög (1 pálcika 8 cm); L alakú kert kerítése (15, 5, 10, 10, 25, 15 m).
- **MF 78.:** síkidomok kerülete négyzethálón egységekben (téglalapok, kereszt alakú sokszögek), becslés; síkidomok színezése a kerületüket mutató szakasz alapján; háromszögek és négyszög oldalainak mérése mm-ben, kerület kiszámítása (a, b, c, d betűkkel és K = …).

## Mit csinál a DiákZóna lecke?

Saját példákkal tanítja a kerület fogalmát (körbejárás, az oldalak egy egyenesbe rakása), a kerület kiszámítását az oldalak összeadásával (cm, mm, m, vegyes egységek átváltással), a négyzetrácsos kerületet egységekben (a határ kis szakaszait számoljuk, nem a négyzeteket), az egyforma pálcikákból kirakott sokszögeket, a több oldalú (L alakú) kertek kerítését és a hiányzó oldal kiszámítását. Minden háromszög- és négyszögábra méretarányos.

## Komponensek

1. **`PerimeterG3Figures.tsx`** – `WalkAroundSvg` (katica körbejárja a négyszöget), `UnfoldSidesSvg` (4 + 5 + 7 + 4 = 20 cm, méretarányos trapéz és kiegyenesített oldalak), `GridPerimeterSvg` (L alak 12 egység, téglalap 10 egység, számozott kis szakaszokkal), `SticksShapesSvg` (1 pálcika 5 cm: 15, 20, 25, 30 cm), `GardenSvg` (L alakú kert, 90 m).
2. **`PerimeterG3Parts.tsx`** – rajzelemek: feliratozott sokszög (a felirat nem lóg a vonalra), szabályos sokszög csúcsai, pálcikás sokszög, négyzetrácsos alakzat határának körbejárása (`traceBoundary`, `countBoundary`), katica, fenyő.
3. **`PerimeterG3CardFigures.tsx`** – kártyaábrák: `GridCard`, `SticksCard`, `PolyCard`.
4. **`PerimeterG3Theory.tsx`** – Mit tanulunk?, mi a kerület, mérjük meg és adjuk össze, kerület a négyzetrácson, egyforma pálcikák, a kert körbekerítése, 3 mintapélda (háromszög, dm és cm, hiányzó oldal), „Vigyázz!” (kimaradt lépcsőoldalak; azonos egység).
   - **Labor I – Számold meg a kerületet a rácson!** Véletlen alakzat (két egymásba csúszó téglalap) a rácson; a gyerek léptetővel adja meg a kerületet. Ha a négyzeteket számolta, erre figyelmeztet; a „Mutasd meg a számolást!” gomb megszámozza a határ kis szakaszait. „Új feladat”.
   - **Labor II – Pálcikás síkidomok.** Véletlen 3–6 oldalú pálcikás sokszög, véletlen pálcikahossz (3–12 cm); a gyerek beírja a kerületet. Tipikus hibákra külön tipp (kihagyott oldal, eggyel több oldal, csak az oldalak száma, csak egy oldal).
5. **`PerimeterG3Quiz.tsx`** – `PERIMETER_G3_QUESTIONS`: 30 kérdés (10/10/10), 22 kérdésnél ábra, minden kérdésnél badge, 3 puska. Azonosító: `g3-meas-kerulet-quiz`.
6. **`PerimeterG3Matcher.tsx`** – `PERIMETER_G3_MATCHER_LEVELS`, 3 szint × 8 pár (rácsos alakzat ↔ egység, oldalak ↔ kerület; pálcikás sokszög ↔ kerület, vegyes egységek; hiányzó oldal ↔ hossz), szintenként 4 képes kártya. `g3-meas-kerulet-matcher`.
7. **`PerimeterG3Sorter.tsx`** – `PERIMETER_G3_SORTER_LEVELS`, 3 szint × 3 kategória × 9 elem (6 / 8 / 10 egység; 3 / 4 / 5 oldalt adunk össze; kevesebb / pont / több, mint 20 cm), szintenként 5–7 képes elem. `g3-meas-kerulet-sorter`.

**Teszt:** `src/test/grade3Topic4PerimeterG3.test.tsx` (a határszámoló függvényeket is ellenőrzi).

## Eltérések a tankönyvtől

- **Betűs jelölés (MF 78/3.):** a munkafüzet az oldalakat a, b, c, d betűkkel jelöli, és „K = □ mm” alakban kéri a kerületet. A 3. osztályban nálunk nincs betűs jelölés: az oldalak hosszát az oldal mellé írjuk, a kerületet szóval mondjuk („a kerület 24 cm”). A „K” jelet a könyv szerint egyszer megemlítjük, de képletben nem használjuk.
- **A kerület és a négyzetek száma:** a könyv nem figyelmeztet arra, hogy a négyzethálón a gyerekek gyakran a kis négyzeteket számolják meg. Nálunk külön figyelmeztetés, kvízkérdés (4 négyzetből álló alakzatok: 10 és 8 egység) és labortipp szól erről.
- **Saját számok:** a könyv pálcikái 8 cm-esek, a kert oldalai 15, 5, 10, 10, 25, 15 m; nálunk 5 cm-es pálcikák és más méretű kertek (90 m, 36 m) szerepelnek, a logikai lapok és a katica csak ötletként.
- **Tudatos didaktikai változtatások:**
  - Az oldalak „kiegyenesítését” (TK 146/3.) méretarányos ábrán mutatjuk: a trapéz oldalai 4, 5, 7, 4 cm, és ugyanilyen hosszú szakaszok kerülnek egy egyenesbe.
  - Csapdadoboz figyelmeztet a lépcsős (L alakú) kertek kis oldalainak kihagyására és a vegyes egységekre (1 dm = 10 cm).
  - Megfordított feladatok: hiányzó oldal a kerületből, egy pálcika hossza a kerületből, kapu levonása a kerítésből.
  - A téglalap és a négyzet „szemben lévő oldalak” szabálya a következő leckébe (6.) került, itt minden oldalt külön összeadunk.
