# 4. Az összeg változásai (3. osztály, VII. Írásbeli összeadás)

**Források:** tankönyv OH-MAT03TA 81. oldal, munkafüzet OH-MAT03MA I. kötet 91–92. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 81.:** három pénzes szöveges feladat összefüggés-kereséssel: két gyereknek ugyanannyi pénze van, és különböző összeget kapnak (melyiküknek lesz több, mennyivel); két persely különböző összeggel, mindkettőbe ugyanannyit tesznek (a különbség marad); két vásárlás, ahol az egyik tag 100-zal több, a másik 100-zal kevesebb (ugyanannyit költöttek). Táblázat: két szülőtől összesen 245 Ft, az egyik rész 10-esével nő, a másik 10-esével csökken (állandó összeg). „Változtasd meg a tagokat, hogy az összeg 100-zal kisebb / 10-zel nagyobb / változatlan legyen!”
- **MF 91.:** számtáblában a 98-ról indulva a százasával és tízesével növekvő számok; az összeg változása nyilakkal; összegek összehasonlítása számolás nélkül (<, >, =), majd ellenőrzés írásbeli összeadással.
- **MF 92.:** összegsorozatok, ahol a tagok 10-esével nőnek (a + 10, b + 10) vagy ellentétesen változnak (állandó összeg); egy tag 100-zal nagyobb; igaz–hamis állítások az összeg változásáról.

Számkör: 1000-ig (a könyv példái 500 körül mozognak).

## Mit csinál a DiákZóna lecke?

A szabályt nem csak kimondja, hanem **látni** is lehet: a tagok és az összeg dobozban, a változás nyíllal (+100, −10, ?) mutatja, mi változik és mennyivel. Sorban: egy tag nő vagy csökken → az összeg ugyanannyival változik; mindkét tag változik → a változások összeadódnak (+100 és −10 → +90); átrakás egyik tagból a másikba → az összeg nem változik (szakaszos ábra, állandó összeg táblázat, felcserélés); okos számolás kerek számmal (198 + 147 = 200 + 145); összegek összehasonlítása számolás nélkül. Saját számok és helyzetek (persely, büfé, zsebpénz).

## Komponensek

1. **`SumChangesG3Parts.tsx`** – közös rajzelemek és segédfüggvények (a fejezet 5. és 6. leckéje is használja): `QFig`, `NumBox`, `ChangeArrow`, `ChangeRowsG`/`ChangeRowsFig` (tag + tag = összeg sorok változás-nyilakkal), `Coin`, `PriceTag`, `BarRowsG`/`BarsFig` (összehasonlító szakaszos ábra), `PartsBarG`/`PartsFig` (részekből álló csík „összesen: ?” zárójellel), `SumTableFig`; `ins()` (10-zel, 20-szal, 100-zal…), `changeText()`, `signed()`, `opts4()`.
2. **`SumChangesG3Figures.tsx`** – `SumChangesOneTagSvg`, `SumChangesBothSvg`, `SumChangesMoveSvg` (átrakás csíkkal), `SumChangesTableSvg` (állandó összeg), `SumChangesCleverSvg` (198 + 147 = 200 + 145), `SumChangesCompareSvg` (236 + 158 ○ 246 + 158).
3. **`SumChangesG3CardFigures.tsx`** – `MiniGrow`, `MiniTwoChanges`, `MiniMove` (párosító), `SortChange`, `SortSwap` (csoportosító).
4. **`SumChangesG3Theory.tsx`** – `SumChangesG3Theory`, `makeGoalTask`, `checkGoal`, `goalText`, `makeCompareTask`.
   - **Labor I – Tagváltoztató:** véletlen tagok és cél („Az összeg 10-zel nagyobb legyen!”, „ne változzon”, „110-zel nagyobb”…). A gyerek a két tagot ±1, ±10, ±100 gombokkal változtatja, a változás nyílként jelenik meg; „Ellenőrzöm” után célzott visszajelzés („Az 1. tag: +10, a 2. tag: +10. Így az összeg 20-szal nő. Neked az kell…”).
   - **Labor II – Számolás nélkül!:** véletlen összegpárok (egy tag változik, mindkettő, ellentétesen, felcserélve, +100 és −10); a gyerek <, = vagy > jelet választ, hiba esetén gondolkodási tippet kap, jó válasz után a magyarázatot és a kiszámolt összegeket.
5. **`SumChangesG3Quiz.tsx`** – `SUM_CHANGES_G3_QUESTIONS`: 30 kérdés (10/10/10), 21 ábrával, minden kérdésnél badge, 3 puska. Azonosító: `g3-wadd-valtozasok-quiz`.
6. **`SumChangesG3Matcher.tsx`** – `SUM_CHANGES_G3_MATCHER_LEVELS`: összeg-csík + változás ↔ új összeg; két tag változása ↔ „20-szal nő / nem változik / 90-nel nő…”; okos számolás ↔ összeg. Szintenként 4–5 képes kártya. `g3-wadd-valtozasok-matcher`.
7. **`SumChangesG3Sorter.tsx`** – `SUM_CHANGES_G3_SORTER_LEVELS`: nő / nem változik / csökken; 10-zel nő / 20-szal nő / nem változik; 250 + 250-ből kiindulva kevesebb / pontosan / több, mint 500. Szintenként 6 képes elem. `g3-wadd-valtozasok-sorter`.

**Teszt:** `src/test/grade3Topic7SumChangesG3.test.tsx`

## Eltérések a tankönyvtől

- **Hiányzó szabály:** a TK 81. oldal csak feladatokat ad, a szabályt sehol nem mondja ki (a gyerekeknek maguknak kell „összefüggést keresni”). A DiákZóna kimondja, és ábrával mutatja: a tag és az összeg ugyanarra változik; két változás összeadódik; ellentétes, egyenlő változásnál az összeg nem változik.
- **MF 92/5. állításai** közül az „Ha mindkét tagot csökkentem 10-zel, az összeg 20-szal kevesebb lesz” igaz, de a „Ha 10-zel csökkentem az egyik tagot, az összeg 10-zel nő” típusú csapdát a könyv csak igaz–hamis jelöléssel kéri. Mi ezt csapdadobozban meg is magyarázzuk (240 + 130 = 370, de 240 + 120 = 360).
- **„Melyikük költött többet?” (TK 81/1. c):** a helyes válasz az, hogy ugyanannyit (405 Ft). A kérdés úgy van feltéve, mintha valamelyikük többet költött volna; ez félrevezető lehet. A mi büfés kérdésünk válaszlehetőségei között az „Ugyanannyit költött” is szerepel, és a magyarázat megmutatja, miért (+100 és −100).
- **Felcserélés:** a könyv ennél a leckénél nem említi, pedig az írásbeli összeadás ellenőrzése (TK 77–78.) erre épül. Nálunk a „nem változik” esetei közé bekerült.
- **Saját helyzetek és szereplők:** a könyv szereplőit (Manó, Mona, Lili, Benjámin, Dani, Boldizsár, Peti) és a kézművesvásáros történeteket nem vettük át; saját nevek (Zsófi, Levi, Nóra, Dávid, Kata) és helyzetek (persely, büfé).
- **Tudatos didaktikai változtatások:**
  - A változást mindig nyíllal és előjeles számmal (+10, −10) mutatjuk a tag és az összeg között, így a gyerek „látja” a szabályt, mielőtt kimondaná.
  - Az állandó összeget szakaszos ábrán is megmutatjuk: 10-et átteszünk az egyik részből a másikba, a csík hossza nem változik.
  - Az „okos számolás” (198 + 147 = 200 + 145) a szabály hasznát mutatja meg; a könyv ezt nem tanítja külön.
  - A számtábla (MF 91/1.) helyett interaktív Tagváltoztató labor: a gyerek maga állítja elő a kívánt változást, és azonnal látja az eredményt.
