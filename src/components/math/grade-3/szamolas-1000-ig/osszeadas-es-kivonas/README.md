# 3. Összeadás és kivonás (3. osztály, XI. Számolás 0-tól 1000-ig)

**Források:** tankönyv OH-MAT03TA 112–113. oldal, munkafüzet OH-MAT03MA II. kötet 38–40. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 112.:** 1000 elem két fiú között kerek százasokban (az 1000 bontásai), 500 + 120 és a különbségük, vödrök műveletekkel (160 + 90, 280 + 270, 190 + 280 …) és összegeik, papírbolt 1000 Ft-ból (450, 150, 360, 850, 670, 230 Ft), hiányzó számok (600 + □ = 990, □ + 440 = 970, 1000 − □ = 260, □ − 460 = 510 …).
- **TK 113.:** naponta 220 elem hétfő reggeltől péntek reggelig, kiállítás két napon (440 és 370 néző: különbség, összeg), műveletek a 109. oldal táblájával, nyitott mondatok (670 > □ > 650; 490 + □ < 840; 900 − 300 > 770 − □), útvonalak a játékvárosban (280, 390, 340, 350, 270 cm).
- **MF 38–40.:** bolhapiac (két játék ára), analóg összegtáblázat (200 … 330 + 30 … 670), párosítva összeadás, különbségek ellenőrzése összeadással (600 − 200 … 760 − 390), betűrejtvény, műveletláncok nyilakon, kivonás és pótlás összefüggése, sorozatok 5-ösével, 10-esével, 25-ösével, egyenlő műveletek párosítása, nyitott mondatok, szabálytáblázat (+190), szöveges feladat („40-nel kevesebb”).

**A fejezet fejben számolása kerek százasokkal és kerek tízesekkel dolgozik, 1000-en belül** (nem kerek számokkal csak a sorozatokban). Ami új az V. fejezethez képest: az 1000 bontásai, **pótlás 1000-re** (1000 − 740), átlépés a 6.–10. százban, három tag összeadása, egyenlőtlenségek műveletekkel, útvonalhosszak összevetése.

## Mit csinál a DiákZóna lecke?

Saját számokkal és helyzetekkel (kirakó, könyvtár, bábszínház, gyöngyök, kupakgyűjtés, szalagok, papírbolt) gyakoroltatja: kerek százasok és az 1000 bontásai, átlépés összeadásnál (ugrás a kerek százasig) és kivonásnál (előbb a százasok, aztán a tízesek), pótlás 1000-re, hiányzó szám, ellenőrzés összeadással, vásárlás 1000 Ft-ból, egy- és kétlépéses szöveges feladatok, nyitott mondatok.

## Komponensek

1. **`AddSub1000G3Parts.tsx`** – `JumpLine` (számegyenes ugrásokkal), `PartBar` (csíkmodell), `Tag` (árcédula), a laborok generátorai (`makeFillStart`, `fillOptions`, `makeShop`, `threeOptions`). A többi rajzelem az 1. lecke `Numbers1000G3Parts.tsx` fájljából jön.
2. **`AddSub1000G3Figures.tsx`** – `ThousandSplitSvg` (300 + 700 = 1000 lapokkal), `AddBridgeSvg` (480 + 20 + 50), `SubStepsSvg` (620 − 300 − 30), `ToThousandSvg` (740 + ? = 1000), `CheckSvg` (930 − 610 = 320 és ellenőrzése), `ShopSvg` (papírbolt 1000 Ft-tal).
3. **`AddSub1000G3CardFigures.tsx`** – `MiniJump`, `MiniBar1000`, `MiniTags` (párosító), `SortCoins`, `SortJump`, `SortTags` (csoportosító).
4. **`AddSub1000G3Theory.tsx`** – kerek százasok, átlépés összeadásnál (táblázattal) és kivonásnál, pótlás 1000-re, ellenőrzés, vásárlás, 3 mintapélda (□ + 350 = 790; kupakgyűjtés két lépésben; „mennyivel több”), „Vigyázz!” (680 + 50 ≠ 630; 1000 − 740 ≠ 360).
   - **Labor I – Pótold 1000-re!** Véletlen kerek tízes (110–990). Csík az 1000-ig: a gyerek százasokat és tízeseket tesz hozzá (+ / −), a csík zöldül; túllövésnél piros („Túl sok!”). Ha pont 1000, meg kell mondania: 1000 − kezdőszám = ? (a hozzátett százasok és tízesek számából). A rossz válaszok közt ott a tipikus „mindkét jegyet 10-re pótolom” hiba (1000 − 740 = 360).
   - **Labor II – Bevásárlás 1000 Ft-ból.** Hat véletlen áru kerek tízes árral. A gyerek kiválaszt kettőt; ha többe kerülnek 1000 Ft-nál, szól a program. 1. lépés: mennyit fizet (a rossz válaszok közt az elfelejtett új százas); 2. lépés: mennyi marad; a végén ellenőrzés összeadással.
5. **`AddSub1000G3Quiz.tsx`** – `ADD_SUB_1000_G3_QUESTIONS`: 30 kérdés (10/10/10), 20 kérdésnél ábra (lapok, ugrások, csíkmodell, árcédulák, összehasonlító csíkok, útvonal, számsor), minden kérdésnél badge, 3 puska. Azonosító: `g3-c1000-osszeadas-quiz`.
6. **`AddSub1000G3Matcher.tsx`** – `ADD_SUB_1000_G3_MATCHER_LEVELS`, 3 szint × 8 pár (ugrás ↔ eredmény és kerek számok; csík az 1000-ig ↔ hiányzó rész és □; két árcédula ↔ mennyi marad 1000 Ft-ból és kétlépéses műveletek), szintenként 4 képes kártya. `g3-c1000-osszeadas-matcher`.
7. **`AddSub1000G3Sorter.tsx`** – `ADD_SUB_1000_G3_SORTER_LEVELS`, 3 szint × 3 kategória × 3 elem (érmék összege 500-nál kevesebb / pont 500 / több; ugrás után 600 / 700 / 800; 1000 Ft-ból marad 100 / 200 / 300 Ft), szintenként 6 képes elem. `g3-c1000-osszeadas-sorter`.

**Teszt:** `src/test/grade3Topic11AddSub1000G3.test.tsx`

## Eltérések a tankönyvtől

- **Nem egyértelmű napszám (TK 113/6.):** „naponta 220 elemet építettek be … hétfő reggel 120 darabból állt a város, péntek reggelre hány darabosra bővült?” – a gyereknek ki kell találnia, hogy ez 4 nap (hétfő, kedd, szerda, csütörtök), sokan 5 nappal számolnak (ami 1220 lenne, a számkörön kívül). Nálunk a lépések száma mindig ki van mondva („kétszer teszel bele 300-at”).
- **Másik oldaltól függő feladat (TK 113/8.):** a műveletekhez a 109. oldal táblázatára kell lapozni. Nálunk minden feladat önálló, az ábra a kérdés mellett van.
- **Zavaros logikai feladvány (MF 38/3. c):** „A három állítás közül az egyik hamis … »Az első állítás az igaz«” – önmagára hivatkozó állítás, 8–9 évesnek túl nehéz és nem a számolásról szól. Nem vettük át.
- **Tudatos didaktikai változtatások:**
  - Egy fő számolási utat tanítunk (előbb a százasok, aztán a tízesek; átlépésnél ugrás a kerek százasig), mindig számegyenesen is.
  - A pótlás 1000-re (TK 112/5., MF 39/7.) saját labort kapott, és egy új, a könyvben nem szereplő tipikus hibát is kezelünk: 1000 − 740 ≠ 360 (mindkét jegy 10-re pótlása).
  - A papírbolt-feladatból (TK 112/4.) kétlépéses, ellenőrző labor lett (fizetés, visszajáró, ellenőrzés).
  - A kivonás ellenőrzését összeadással (MF 39/4.) ábra, kvízkérdés és a labor zárása is mutatja.
  - A rossz válaszok tipikus hibák: elfelejtett új százas (680 + 50 = 630), csak az egyik lépés elvégzése, fordított művelet.
  - Saját számok és helyzetek; a könyv szereplőit (Tomi, Bálint, Zoli, Anna, Bence) és a játékváros-történetet nem vettük át (az útvonalfeladatot saját, kétutas ábrával és méterben adjuk).
