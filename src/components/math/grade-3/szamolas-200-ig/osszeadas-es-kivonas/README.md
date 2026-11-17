# 4. Összeadás és kivonás (3. osztály, III. Számolás 0-tól 200-ig)

**Források:** tankönyv OH-MAT03TA 35–37. oldal, munkafüzet OH-MAT03MA I. kötet 42–44. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 35.:** perselyek érmékkel, kerek tízesek és a 100 összeadása oszloponként (100 + 30, 120 + 70, 60 + 100, 20 + 180…); letakart érme (150, 200, 180, 190 Ft); kivonások oszloponként; szöveges feladat (óvoda 130 m, iskola 60 m); műveletsorok összehasonlítása (200 − 50 − 20 = 200 − 40 − 30…).
- **TK 36.:** 60 + 50 háromféleképpen (60 + 40 + 10; számegyenes; 6 + 5 → 60 + 50); oszlopos gyakorlás; logikai lapos játék táblázattal; 180 − 90 háromféleképpen (180 − 80 − 10; számegyenes; 18 − 9).
- **TK 37.:** 6 + 8 = 14 → 6 t + 8 t = 14 t → 60 + 80 = 140 és a fordított kivonások; oszlopos gyakorlás; oszlopdiagram (busz 50, kerékpár 60, gyalog 120, autó 40) kérdésekkel.
- **MF 42–44.:** szabálytáblázat (+100), sorozatok (húszasával, harmincasával, negyvenesével), analóg összegek és különbségek (60 + 30, 160 + 30, 60 + 130), nyíldiagramok (+30, +40, +50, +90), jelekkel adott különbségek, színezés eredmény szerint, összehasonlítás (<, >, =), kérdések („Mennyivel kisebb a 70 a 130-nál?”), virágok ládába (60 < ● < 150), 200-as összegek színezése, kerti munkák diagramja.

A fejezet minden művelete **kerek tízesekkel** (és a 100-zal) dolgozik, 200-on belül. Kétjegyű nem kerek számok (pl. 135 + 48) itt még nem szerepelnek; a régi README-ben lévő ilyen példák nem a könyvből valók voltak.

## Mit csinál a DiákZóna lecke?

Saját számokkal és helyzetekkel (persely, pékség és iskola, megálló, papírbolt, busz, mesekönyv, pontgyűjtő verseny diagramja) gyakoroltatja: kerek tízesek összeadása és kivonása („tízesekkel számolok”), a 100 hozzáadása és elvétele, átlépés a 100-on két úton (tízesekkel: 6 t + 5 t; ugrással a 100-ig), pótlás 200-ra, hiányzó szám (□), műveletsorok, diagram leolvasása, egy- és kétlépéses szöveges feladatok.

## Komponensek

1. **`AddSub200G3Parts.tsx`** – `Coin` (10, 20, 50, 100, 200 Ft; letakart érme), `TensJumpLine` (számegyenes tízesekkel, ugrásokkal, a 100 kiemelve), `PriceTag`, `PointsChart`.
2. **`AddSub200G3Figures.tsx`** – `TensCoinsAddSvg` (120 + 30 érmékkel), `AnalogyRodsSvg` (6 + 5 → 60 + 50 tízesrudakkal), `BridgeHundredSvg` (60 + 40 + 10), `BridgeBackSvg` (130 − 30 − 20), `ToTwoHundredSvg` (140 + ? = 200 csíkkal), `PointsChartSvg` (pontgyűjtő verseny).
3. **`AddSub200G3CardFigures.tsx`** – kártyaikonok: `MiniCoins`, `MiniRods`, `MiniBar200` (párosító), `SortBlocks`, `SortCoins`, `SortShop` (csoportosító).
4. **`AddSub200G3Theory.tsx`** – kerek tízesek táblázattal, átlépés a 100-on (összeadás, kivonás), pótlás és hiányzó szám, 3 mintapélda (út, műveletsor, diagram), „Vigyázz!” (150 − 70 ≠ 120; 60 + 50 ≠ 11).
   - **Labor I – Ugorj a 100-ig!** Véletlen összeadás vagy kivonás kerek tízesekkel, mindig átlépéssel a 100-on. Három lépés: mennyi a 100-ig → mennyi van még hátra → eredmény; az ugrások a számegyenesen megjelennek; célzott tippek (pl. „Ne felejtsd el a 100-at!”), a végén ellenőrző művelet.
   - **Labor II – Töltsd meg a perselyt!** Véletlen összeg (30–200 Ft). A gyerek 10, 20, 50, 100 forintos érmékre kattintva tölti a perselyt, kattintással ki is veheti őket. Mindig látja az összeadást és azt, mennyi hiányzik / mennyivel több; a végén megtudja, ki lehet-e rakni kevesebb érmével.
5. **`AddSub200G3Quiz.tsx`** – `ADD_SUB_200_G3_QUESTIONS`: 30 kérdés (10/10/10), 19 kérdésnél ábra (érmék, ugrások, tízesrudak, csíkmodell, út, bolt, diagram, busz), minden kérdésnél badge, 3 puska. Azonosító: `g3-c200-osszeadas-quiz`.
6. **`AddSub200G3Matcher.tsx`** – `ADD_SUB_200_G3_MATCHER_LEVELS`, 3 szint × 8 pár (érmék és kerek tízesek; tízesrudak és átlépés a 100-on; pótlás 200-ra és □), szintenként 4 képes kártya. `g3-c200-osszeadas-matcher`.
7. **`AddSub200G3Sorter.tsx`** – `ADD_SUB_200_G3_SORTER_LEVELS`, 3 szint × 3 kategória × 9 elem (kisebb / pontosan / nagyobb mint 100; eredmény 110 / 120 / 130; mennyi pénz marad: 30 / 50 / 70 Ft), szintenként 4–6 képes elem. `g3-c200-osszeadas-sorter`.

**Teszt:** `src/test/grade3Topic3AddSub200G3.test.tsx`

## Eltérések a tankönyvtől

- **Kétértelmű távolság (TK 35/3.):** „az óvodától … a 60 m-re lévő iskolába” – nem derül ki, hogy a 60 m az óvodától vagy otthonról értendő (az utóbbi esetben az iskola közelebb lenne, mint az óvoda, és az út nem 190 m). Nálunk az ábra és a szöveg egyértelmű: „otthonról a megállóig 90 m, **onnan** az iskoláig 70 m”.
- **„Járművel” (TK 37/9.):** a „Hányan érkeznek járművel?” kérdésnél vitatható, hogy a kerékpár jármű-e (a KRESZ szerint igen, a gyerekek sokszor csak a buszra és az autóra gondolnak), így két különböző válasz jöhet ki (150 vagy 90). A mi diagramunk kérdései egyértelműek (osztályok pontjai, „mennyivel több”, „együtt”).
- **Hiányzó 0 a tengelyen (MF 44/12.):** a diagram vízszintes tengelyén nincs kiírva a 0. Nálunk a skála 0-tól indul, és a beosztás is fel van írva.
- **Tudatos didaktikai változtatások:**
  - A könyv a háromféle számolási utat egyszerre mutatja; mi két utat tanítunk (tízesekkel; ugrás a 100-ig), és minden lépés számegyenes-ugrásként is látszik.
  - A „kisebbet a nagyobból” hiba (150 − 70 = 120) és a „lehagyott nulla” (60 + 50 = 11) külön csapdadobozt kapott, a kvízben is ezek a tipikus rossz válaszok.
  - A letakart érmés feladat ötletéből manipulatív labor lett (persely érmékkel, azonnali visszajelzéssel).
  - Saját számok, helyzetek és szereplő (Boti); a könyv szereplőit (Zsófi, Karcsi, Kati…) és a logikai lapos táblázatot nem vettük át. Minden szám 200-on belül marad.
