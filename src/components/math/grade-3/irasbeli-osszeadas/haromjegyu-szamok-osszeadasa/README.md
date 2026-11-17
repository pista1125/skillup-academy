# 1. Háromjegyű számok összeadása (3. osztály, VII. Írásbeli összeadás)

**Források:** tankönyv OH-MAT03TA 74–75. oldal, munkafüzet OH-MAT03MA I. kötet 81. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 74.:** kézművesvásár képe árplakáttal (50, 130, 120, 250, 80, 200 Ft), mit lehet 500 Ft-ért venni; oszlopdiagram 7 foglalkozás gyerek- és felnőttlátogatóiról, összesen hányan voltak.
- **TK 75.:** két pénztárca érmékkel (265 Ft + 200 Ft); **kerek százas hozzáadása** (135 + 200 … 95 + 400); **kerek tízesek összeadása** tízesekkel kirakva (180 + 250 … 190 + 150, „Mit veszel észre?”); árucikkek árai (250, 230, 125, 415, 100, 45 Ft) növekvő sorrendben, két-két portéka ára együtt, játékpénzzel.
- **MF 81.:** kerek százas hozzáadása (137 + 300, 200 + 235 …), két persely érméi táblázatban, összegek, igaz/hamis állítások (500 Ft-nál több? páros? 200 Ft-nál kevesebb?), két-két báb ára (210, 160, 220, 410, 230 Ft), melyik bábot nem lehet 500 Ft-ból kettesével megvenni.

A lecke tehát a **fejben (szóban) végzett** háromjegyű összeadás: kerek százas, kerek tízesek (tízesátlépéssel, 10 tízes = 1 százas), helyi értékenkénti összeadás – az írásbeli összeadás (3. lecke) előkészítése.

## Mit csinál a DiákZóna lecke?

Saját számokkal és helyzetekkel (iskolai vásár, perselyek, gesztenyegyűjtés, papírgyűjtés, ceruzás dobozok) gyakoroltatja: kerek százas hozzáadását (csak a százas változik), kerek tízesek összeadását beváltással (170 + 260 = 430), helyi értékenkénti összeadást (132 + 245 = 300 + 70 + 7), pénzösszegek összeadását, „elég az 500 Ft?” döntést. Minden szám 500-on belül van.

## Komponensek

1. **`ThreeDigitAddG3Parts.tsx`** – a fejezet 1–3. leckéjének közös rajzelemei: `QFig`, `Coin` (forint érmék), `Flat` / `Rod` / `Cube` (százas lap, tízesrúd, egyes kocka), `BlockNum`, `PriceTag`, `ItemIcon` (bögre, könyv, labda, sárkány, maci…), `PlaceHeader`; segédek: `rnd`, `shuffle`, `opts4`, `art`.
2. **`ThreeDigitAddG3Figures.tsx`** – `AddHundredsSvg` (236 + 200 kirakva), `RoundTensSvg` (170 + 260: 13 tízes → beváltás → 430), `PlaceValueAddSvg` (132 + 245 helyi értékenként), `FairStallSvg` (iskolai vásár 6 árcédulával), `CoinPurseSvg` (két persely: 270 Ft + 170 Ft).
3. **`ThreeDigitAddG3CardFigures.tsx`** – kártyaikonok: `MiniBlocks`, `MiniCoins`, `MiniTags`, `MiniRods` (párosító), `SortTags`, `SortBlocks` (csoportosító).
4. **`ThreeDigitAddG3Theory.tsx`** – kerek százas, kerek tízesek beváltással (két úton), helyi értékenként, 4 mintapélda (vásár, persely), „Vigyázz!” (180 + 250 ≠ 330; 236 + 200 ≠ 238).
   - **Labor I – Kirakó:** három mód (kerek százas / kerek tízesek / helyi értékenként), véletlen feladat 500-ig. A két szám helyiérték-táblázatban kirakva; „Tedd össze!” gombra az elemek az összeg sorába kerülnek; ha 10-nél több tízes lett, „Beváltom: 10 tízes → 1 százas” gomb cseréli 1 százas lapra (zölddel kiemelve). Utána 4 válaszgomb, célzott tippek (elfelejtett beváltott százas, rosszul számolt százasok/tízesek).
   - **Labor II – Iskolai vásár:** 4 tárgy véletlen árral, kettő kiemelve; mennyibe kerülnek együtt? Feladattípusok: kerek tízesek beváltással, kerek százas + szám, beváltás nélküli helyi értékes összeadás. Célzott tippek, sorozatszámláló, a végén: elég-e 500 Ft.
5. **`ThreeDigitAddG3Quiz.tsx`** – `THREE_DIGIT_ADD_G3_QUESTIONS`: 30 kérdés (10/10/10), 20 kérdésnél ábra (kirakás, perselyek, árcédulák, helyiérték-táblázat, tízesrudak, szalagos modell, oszlopdiagram), minden kérdésnél badge, 3 puska. Azonosító: `g3-wadd-haromjegyu-quiz`.
6. **`ThreeDigitAddG3Matcher.tsx`** – `THREE_DIGIT_ADD_G3_MATCHER_LEVELS`, 3 szint × 8 pár (kerek százas; kerek tízesek, beváltás; helyi értékenként), szintenként 4–5 képes kártya. `g3-wadd-haromjegyu-matcher`.
7. **`ThreeDigitAddG3Sorter.tsx`** – `THREE_DIGIT_ADD_G3_SORTER_LEVELS`, 3 szint × 3 kategória × 3 elem (300 alatt / 300–400 / 400 fölött; = 400 / 430 / 450; kevesebb / pont / több, mint 400), szintenként 6 képes elem. `g3-wadd-haromjegyu-sorter`.

**Teszt:** `src/test/grade3Topic7ThreeDigitAddG3.test.tsx`

## Eltérések a tankönyvtől

- **Számkör-túllépés (TK 75/4. b):** a 180 + 350 és a 160 + 370 összege 530 – ez kilép az addig tanult 500-as számkörből (az 1000-es számkör a XI. fejezetben jön). Nálunk minden összeg legfeljebb 500.
- **Hiányzó adat (TK 75/4. a):** „180 Ft-ért kipróbált két játékot” – hogy melyik kettőt (célba dobás 50 Ft + erőmérés 130 Ft), azt csak az 1. feladat plakátjáról lehet kitalálni, a feladat nem utal rá. Nálunk minden feladatban ott van minden ár.
- **Nehezen olvasható diagram (TK 74/2.):** 14 oszlop 2-es beosztással (pl. 2, 4, 5 fő is), az összesítéshez 14 számot kellene pontosan leolvasni és összeadni – ez nem a lecke célja. Nálunk a diagramos kérdésben 2 oszlop van, az értékek fel vannak írva.
- **A szabály nincs kimondva (TK 75/4. b):** a könyv csak azt kérdezi: „Rakd ki tízesekkel! Mit veszel észre?”. Nálunk ki van mondva és látható: **10 tízes = 1 százas**; a laborban a gyerek maga váltja be a 10 tízesrudat.
- **Kétjegyű tag a háromjegyű leckében (TK 75/3. b, 95 + 400):** megtartottuk a lehetőséget (pl. 140 + 50, 250 + 30), mert a helyiérték-gondolkodást erősíti.
- **Tudatos didaktikai változtatások:**
  - Kirakás → kép → szám sorrend: a Kirakó laborban előbb az elemek mozognak, csak utána kell számot választani.
  - Két út a kerek tízesekhez (13 tízes = 130, illetve 170 + 200 + 60).
  - Tipikus hibák rossz válaszként és csapdadobozban: elfelejtett beváltott százas (180 + 250 = 330), rossz helyi értékre adott százas (236 + 200 = 238).
  - Saját szereplők és helyzetek (iskolai vásár, Panna, Noé, Dani, Zsófi); a könyv kézművesvására, szereplői (Beáta, Árpi) és árai nem szerepelnek.
