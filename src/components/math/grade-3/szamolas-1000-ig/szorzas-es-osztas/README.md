# 4. Szorzás és osztás (3. osztály, XI. Számolás 0-tól 1000-ig)

**Források:** tankönyv OH-MAT03TA 114–115. oldal, munkafüzet OH-MAT03MA II. kötet 41–43. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 114.:** dobozonként 90 építőelem (2, 3, 7, 8, 10 doboz; 360, 450, 540, 810 elem hány doboz); 10 Ft-osok és 100 Ft-osok sora → 8 · 10, 8 · 100 … 10 · 100; 30 db 10 Ft-os beváltása 100 Ft-osra; 500 : 100, 500 : 10 … 1000 : 10; „Melyik számra gondoltam?” (18 tízszerese, 230 tizedrésze, 5 százszorosa, 800 századrésze, 1000 és 100 hányadosa …); érmeképek (12 db 20 Ft-os, 8 db 50 Ft-os, 4 db 200 Ft-os) és oszlopos szorzások–osztások (2 · 40 → 2 · 400, 80 : 20 → 800 : 200, 7 · 70, 720 : 8, 540 : 60 …).
- **TK 115.:** házépítés 80 perc alatt (6, 8, 10 ház); a készlet „fele, negyede, harmada, ötöde, tizede” táblázat; <, =, > szóval megadott kifejezések között („az ezernek a negyede”, „a háromszázhatvan hatoda” …); számkártyákból szorzások és osztások (10, 40, 8, 2, 50, 4, 800); nyitott mondatok (3 · 8 > ◆ > 810 : 90 …); hiányzó műveleti jelek (409 = 40 ■ 10 ■ 900 ■ 100 …).
- **MF 41–43.:** tornyok 50-esével, 80-asával … 110-esével (számsorozatok); érmeképekről szorzás és osztás; szorzatok párokban (2 · 30 → 2 · 300, 50 · 9, 120 · 2); táblázat dobozonként 70 elemmel; A1–C3 „koordinátás” táblázat és műveletek az eredményeivel; hányadosok sorban (24 : 6 → 240 : 6 → 240 : 60); szöveggel megadott műveletsorok; szabálytáblázat (▲ = 80 · ■); szorzások a 60, 80, 90, 20 és 9, 10, 7, 6, 5 számokból.

**A lecke lényege:** szorzás és osztás 10-zel és 100-zal, kerek tízes · egyjegyű (8 · 90 = 720), kerek százas · egyjegyű (5 · 200 = 1000), osztás egyjegyűvel (720 : 8 = 90) és kerek tízessel/százassal (540 : 60 = 9, 800 : 200 = 4) – mindig a szorzótábla „tízesekkel / százasokkal” kimondva. Új az V. fejezethez képest: számkör 1000-ig, kerek százasok szorzása és osztása, osztás 100-zal.

## Mit csinál a DiákZóna lecke?

Saját feladatok, számok és helyzetek (bab, virághagyma, gyöngy, cukor, alma, busz, kötél, szalag, könyvespolc, pénzváltás) – a könyv feladattípusait gyakoroljuk, de nem másoljuk.

- **Elmélet:** „Mit tanulunk?”, szorzás 10-zel és 100-zal (érmesorok, táblázat a „tízszerese, százszorosa” kifejezéssel), osztás 10-zel és 100-zal beváltásként (600 Ft = 6 db 100 Ft-os = 3 db 200 Ft-os), „A szorzótábla segít” lépcső (3 · 3 → 3 · 30 → 3 · 300) és 4 · 200 százas lapokkal, a kétféle osztás külön képpel (560 : 7 tányérokkal; 1000 : 200 ugrásokkal), 3 mintapélda, 3 „Vigyázz!” doboz (8 · 90 ≠ 72; 4 · 200 ≠ 80; 640 : 80 ≠ 80).
- **Labor I – Szorzótábla-lépcső:** négy feladatfajta (szorzás tízessel, szorzás százassal, részekre osztás, bennfoglalás). Minden feladat két lépcső: előbb a szorzótáblás pár (6 · 8), aztán a nagy szám (6 · 80). Kép: rúdcsoportok, százas-lap csoportok vagy a szétosztandó rudak. A rossz válaszra célzott tipp („Ne hagyd le a nullát!”, „Egy nulla elég!”, „Ez csak a tízesek száma”, „Itt azt kérdezzük, hányszor van meg”).
- **Labor II – Pénzváltó:** véletlen összeg (100–1000 Ft) és érme (20, 50, 100, 200 Ft). A gyerek gombnyomásra egyenként leteszi az érméket, a számláló mutatja az eddigi összeget; ha pont kijött, megmondja az érmék számát. Hibánál tipp (pl. „Ezt a 10 forintosokkal kapnád”). Ellenőrző szorzással zárul.
- **Kvíz:** 30 kérdés (10/10/10), 22 ábrával, mind típusjelvénnyel, 3 puskakártya. Egyetlen szám (a rossz válaszokban sem) nagyobb 1000-nél – teszt ellenőrzi.
- **Párosító:** 3 szint × 8 pár, szintenként 4 képes kártya (rúdcsoportok és százas-lap csoportok ↔ szorzat; tányérokra osztás ↔ hányados; érmerács ↔ összeg; □-es feladatok).
- **Csoportosító:** 3 szint × 9 elem (szorzat 600 / 800 / 900 zsákokkal; egy részre jut 100-nál kevesebb / pontosan 100 / több tányérokkal; műveletsorok és érmék: 400 / 600 / 1000), szintenként 4–5 képes elem.

## Komponensek

- `MulDiv1000G3Parts.tsx`: `Note1000`, `FlatGroups`, `flatGroupsHeight`, labor-generátorok (`makeStairTask`, `makeExchangeTask`); az érme, a százas lap, a tízesrúd, a tányér, az ugrásos számegyenes a V. fejezet leckéiből jön
- `MulDiv1000G3Figures.tsx`: `MulDiv1000TenHundredSvg`, `MulDiv1000StairSvg`, `MulDiv1000FlatsSvg`, `MulDiv1000SharingSvg`, `MulDiv1000HopsSvg`, `MulDiv1000ExchangeSvg`
- `MulDiv1000G3CardFigures.tsx`: kártyaképek (`MiniFlatGroups` + a V. fejezet `MiniRodGroups`, `MiniShare`, `MiniCoinGrid`, `SortBags`, `SortShare`, `SortCoinSet`)
- `MulDiv1000G3QuizParts.tsx`: kérdésábrák
- `MulDiv1000G3Theory.tsx`: `MulDiv1000G3Theory`
- `MulDiv1000G3Quiz.tsx`: `MulDiv1000G3Quiz`, `MUL_DIV_1000_G3_QUESTIONS` (azonosító: `g3-c1000-szorzas-quiz`)
- `MulDiv1000G3Matcher.tsx`: `MulDiv1000G3Matcher`, `MUL_DIV_1000_G3_MATCHER_LEVELS` (`g3-c1000-szorzas-matcher`)
- `MulDiv1000G3Sorter.tsx`: `MulDiv1000G3Sorter`, `MUL_DIV_1000_G3_SORTER_LEVELS` (`g3-c1000-szorzas-sorter`)

Teszt: `src/test/grade3Topic11MulDiv1000G3.test.tsx`

## Eltérések a tankönyvtől

1. **Törtszavak túl korán (TK 114/3., TK 115/6., 115/7.):** „a 230 tizedrésze”, „a 800 századrésze”, „a 670 tizede”, „a 700 százada”, a készlet „fele, negyede, harmada, ötöde, tizede” és „az ezernek a negyede”, „a háromszázhatvan hatoda” – a törteket csak a XIV. fejezet tanítja. DiákZóna ezek helyett osztást ír („230 : 10”, „10 egyforma részre osztod”), törtszó nincs a leckében.
2. **Következetlen elnevezés (TK 114/3.):** ugyanabban a feladatban „tizedrésze” és „tizede”, „századrésze” és „százada” is szerepel ugyanarra a műveletre – a gyerek azt hiheti, hogy ezek különböző dolgok. Nálunk egyetlen forma van: „: 10”, „: 100”.
3. **Még nem tanult szorzás (MF 42/3e., TK 115/7., 115/10f.):** 120 · 2, „a tíz huszonegyszerese”, 20 · 20 – ezek kívül esnek a szorzótáblán (kétjegyű szorzó, ill. tízes · tízes). DiákZóna csak 10 · szám, 100 · egyjegyű, kerek tízes vagy kerek százas · egyjegyű szorzást kér (az írásbeli szorzás a XIII. fejezetben jön).
4. **Nehezen érthető mondat (MF 43/7c.):** „A 490-ben a 70-nél 930-cal nagyobb.” – a mondatból alig derül ki, hogy (490 : 70) + 930-ról van szó. Nem vettük át; a szöveges műveleteink rövid, egyértelmű mondatok („6-tal szoroztam, és 480 lett”).
5. **Koordinátás táblázat (MF 42/5b.):** a „B1 : C1 · A1” típusú feladat két dolgot kér egyszerre (táblázatolvasás + műveleti sorrend), a 3.-osnak túl sok lépés. Helyette a műveleti sorrendet külön gyakoroljuk (1000 − 4 · 90).
6. **A kétféle osztás nincs megnevezve:** a könyv a részekre osztást (720 : 8) és a bennfoglalást (540 : 60) ugyanabban az oszlopban vegyesen adja. DiákZóna külön néven, külön képpel tanítja (tányérok ↔ ugrások), a Labor I-ben külön gombbal, és a „Vigyázz!” doboz a 640 : 8 és 640 : 80 összekeverésére figyelmeztet.
7. **Szereplők, helyzetek:** a „játék város” történetét és szereplőit nem vettük át; saját helyzetek.
8. **Didaktikai változtatások:** a „szorzótábla-lépcső” (3 · 3 → 3 · 30 → 3 · 300) minden feladatnál kimondatja a szorzótáblás párt; az osztást a pénzváltásra építjük (a könyv TK 114/2c. ötlete), de a laborban a gyerek maga rakja ki az érméket, és azonnali visszajelzést kap. A százasokat egységesen piros lappal, a tízeseket kék rúddal mutatjuk (mint a fejezet többi leckéje).
9. A régi README a címek alapján készült; most a valódi oldalak alapján átírtuk.
