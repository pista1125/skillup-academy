# 8. A téglalap és a négyzet területe (3. osztály, IV. Mérések)

A téglalap és a négyzet területe kis négyzetekkel mérve: soronként számolunk, és szorzunk („3 sor, soronként 5: 3 · 5 = 15”). Betűs képletet (T = a · b) és mértékegységet (cm²) nem használunk – a könyv sem.

## Források

- **Tankönyv (OH-MAT03TA):** 149. o. („A téglalap és a négyzet területe”)
- **Munkafüzet II. (OH-MAT03MA_II):** 82–83. o.

## Mi van a tankönyvi és munkafüzeti oldalakon?

- **TK 149/1.:** három színes, elforgatott terítő kis négyzetekből – „Számítsd ki! Mondd el, hogyan gondolkodtál!”.
- **TK 149/2.:** négyzetek 1, 2, 4 és 8 kis négyzet oldallal – hogyan változik a terület.
- **TK 149/3.:** terasz rajza, lefedés háromféle járólappal (1 × 1, 2 × 1, 2 × 2) – hogyan változik a darabszám.
- **TK 149/4.:** négy téglalap ugyanakkora területtel (1 · 24, 3 · 8, 4 · 6, 2 · 12), majd a kerületük mérése és sorba rendezése.
- **MF 82/1.:** 6 × 4-es takaró színezése (szélső piros, „4 középső” sárga, a maradék zöld), darabszámok.
- **MF 82/2.:** két téglalap mérése kétféle egységgel (álló dominó, kis négyzet, fél dominó), összefüggés keresése.
- **MF 82/3.:** rajzolás nyilak szerint (4 · 3-as téglalap, 6 · 6-os négyzet), majd a terület mérése választott egységgel.
- **MF 83/4.:** 12 · 4-es udvar térkövezése négyféle kővel, melyikből kell a legkevesebb / legtöbb.
- **MF 83/5.:** pihenőhely: a hosszabb oldalon 8, a rövidebben 6 lap – hány lap kell.
- **MF 83/6.:** három gyerek különböző egységekkel fed le (18 négyzet, 7 dominó, 32 fél négyzet) – ki fedett le többet.
- **MF 83/7.:** téglalapok rajzolása 12 egység területtel.

## Mit csinál a DiákZóna lecke?

Saját téglalapok, saját számok és helyzetek (csempe a falon, terasz, udvar virágágyással, kert medencével, takaró, képkeret, járólap ára). A könyv feladattípusait gyakoroljuk, nem másoljuk.

- **Elmélet:** „Mit tanulunk?”, soronként számolás színes sorokkal (5 + 5 + 5 = 3 · 5), „elég az első sor és az első oszlop”, egyre nagyobb négyzetek (1, 4, 9, 16, 25), nagyobb járólap – kevesebb darab (24 / 12 / 6), **„Terület vagy kerület?”** (1 · 12, 2 · 6, 3 · 4: ugyanakkora terület, körben 26, 16, 14 kis oldal), szélső és belső rész (takaró: 24 − 8 = 16), 3 mintapélda (szorzás, osztás visszafelé, két lépés), „Vigyázz!” (ne add össze, szorozd; a kerület nem a terület).
- **Labor I – Építs téglalapot!:** nagy +/− gombokkal a sorok száma (1–8) és az egy sorban lévő négyzetek száma (1–10); a rajz azonnal mutatja. Cél: adott terület (8, 10, 12, 16, 18, 20, 24, 30, 36 – mindegyik többféleképpen kirakható). Ellenőrzéskor szól, ha a gyerek összeadta a két számot; a megtalált téglalapokat gyűjti („Van más is?”).
- **Labor II – Hány lap kell?:** véletlen téglalap (2–7 sor, 3–9 egy sorban), csak az első sor és oszlop van kirakva. 4 válasz; a rossz válaszok tipikus hibák saját tippel: összeadás, csak a kirakott lapok megszámolása, a kerület (körben a kis oldalak), egy sorral kevesebb/több. „Rakd ki mind” gomb: az összes lap megjelenik.
- **Kvíz:** 30 kérdés (10/10/10), 27 ábrával, mind típusjelvénnyel, 3 puskakártya.
- **Párosító:** 3 szint × 8 pár (téglalap ↔ terület; téglalap ↔ szorzás és szöveg ↔ eredmény; részben kirakott téglalap ↔ szükséges lapok), szintenként 4–7 képes kártya.
- **Csoportosító:** 3 szint × 3 kategória × 9 elem (12 / 16 / 18; 20-nál kevesebb / pontosan 20 / több; két lépés: 24 / 30 / 36 – lyukas és L alakú síkidomokkal, dominókkal, nagy négyzetekkel), kategóriánként 4 képes elem.

## Komponensek

- `RectAreaG3Figures.tsx`: `RectRowsSvg`, `RectPartialSvg`, `RectSquaresSvg`, `RectTilesSvg`, `RectSame12Svg`, `RectBorderSvg`
- `RectAreaG3Parts.tsx`: `RectGrid` (téglalap kis négyzetekből; teljes / részben kirakott / üres), `SideLabel`, a laborok segédei (`makeRectAreaTask`, `RECT_TARGETS`, `rectsWithArea`); a többi rajzelemet a 7. leckéből (`../a-terulet-merese/AreaG3Parts`) veszi át
- `RectAreaG3CardFigures.tsx`: `CardRect`
- `RectAreaG3Theory.tsx`: `RectAreaG3Theory`
- `RectAreaG3Quiz.tsx`: `RectAreaG3Quiz`, `RECT_AREA_G3_QUESTIONS` (azonosító: `g3-meas-teglalap-terulet-quiz`)
- `RectAreaG3Matcher.tsx`: `RectAreaG3Matcher`, `RECT_AREA_G3_MATCHER_LEVELS` (`g3-meas-teglalap-terulet-matcher`)
- `RectAreaG3Sorter.tsx`: `RectAreaG3Sorter`, `RECT_AREA_G3_SORTER_LEVELS` (`g3-meas-teglalap-terulet-sorter`)

Teszt: `src/test/grade3Topic4RectAreaG3.test.tsx`

## Eltérések a tankönyvtől

1. **A szabályt kimondjuk (TK 149/1.):** a könyv „Számítsd ki! Mondd el, hogyan gondolkodtál!” kérdéssel indít, de sehol nem mondja ki, hogy soronként számolunk és szorzunk. DiákZóna szavakkal kimondja („sorok száma · egy sorban”), betűs képlet nélkül, és előbb színes sorokkal összeadásként mutatja (5 + 5 + 5), csak utána szorzásként.
2. **Elforgatott terítők helyett egyenes rács (TK 149/1.):** az elforgatott, tarka terítőkön a sorokat nehéz követni, a gyerek könnyen elszámolja magát. DiákZóna egyenes téglalapokat használ, és külön tanítja, hogy elég az első sor és az első oszlop.
3. **Kétértelmű „4 középső” (MF 82/1.):** a 6 × 4-es takaróban a szélső négyzetek után 8 belső négyzet marad, a „4 középső” így nem egyértelmű (melyik 4?). DiákZóna a takarónál egyértelműen „szélső” és „belső” részt különít el (belül 2 · 4 = 8, a szélén 24 − 8 = 16), és figyelmeztet a sarkok kétszeri számolására (6 + 6 + 4 + 4 = 20 hiba).
4. **Nagy lapok csak ott, ahol kijönnek:** DiákZóna minden járólapos feladatnál ellenőrizte, hogy a lap tényleg hézag nélkül lerakható (pl. 2 · 2-es lap csak páros sor- és oszlopszámú teraszra kerül); a darabszámot soronként is levezetjük („egy sorba 3 nagy lap fér, 2 ilyen sor van”), nem csak osztással.
5. **Kerület–terület kapcsolat egyszerűbben (TK 149/4.):** a könyv milliméteres pontosságú méréssel kéri a kerületet a rácson. DiákZóna a rácson a kis oldalakat számoltatja körben (26, 16, 14), így a gyerek mérés nélkül látja: ugyanakkora terület mellett más a kerület. A kerület számolását a téglalap oldalaival az 5–6. lecke tanítja.
6. **Didaktikai változtatások:** a négyzetek sorát 1–5 oldalig mutatjuk (a könyvben 1, 2, 4, 8 – a 8 · 8 = 64 kis négyzetet itt még nehéz átlátni); visszafelé (osztással) is kérdezünk („24 négyzet 4 sorban – hány egy sorban?”), és két lépéses feladatok vannak (lyuk kivonása, L alak feldarabolása).
7. A régi README a címek alapján készült, betűs képlettel; most a valódi oldalak alapján átírtuk.
