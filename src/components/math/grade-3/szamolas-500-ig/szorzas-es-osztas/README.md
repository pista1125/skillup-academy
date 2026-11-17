# 4. Szorzás és osztás (3. osztály, V. Számolás 0-tól 500-ig)

**Források:** tankönyv OH-MAT03TA 61–63. oldal, munkafüzet OH-MAT03MA I. kötet 73–76. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 61.:** tízes kötegek (5, 9, 12, 15, 20 köteg → szorzás 10-zel); ládák (8 · 20 kg) és 50 forintosok – összeadás és szorzás; oszlopos szorzások (3 · 9, 3 · 90, 90 · 3, 30 · 9; 10 · 5, 10 · 50; 6 · 80; 10 · 20, 20 · 10 …); műveletsorok, a legnagyobb eredmény kiválasztása (30 · 10 + 80, (450 − 410) · 10, 480 − 40 · 10 …); egy szám többféle szorzatként (270 = 3 · 9 · 10 = 3 · 90 = 9 · 30 …).
- **TK 62.:** bennfoglalás 10-zel (120 patkó, soronként 10); 10 forintos érmerács → két szorzás és négy osztás (3 · 50, 5 · 30, 150 : 3 …); hiányzó számok (32 : 4 → 320 : 4 → 320 : 40; ▲ : 4 = 70 …); nyitott mondatok (300 : 6 < ○ < 300 : 5); igaz–hamis állítások (tízszeres, kerekítés, különbség).
- **TK 63.:** dobozolás 40-esével (160 … 400 patkó), lovanként 4 patkó; patkószögek táblázata (5 szög · 4 láb · lovak száma); a 150 eredményű műveletek kiválasztása (betűrejtvény: CSENGŐ); rajtszám-sorrend (logika); „két lovas egymással szemben” szöveges feladat.
- **MF 73–76.:** 10 forintosok összeadással és szorzással; soronkénti szorzások (4 · 3, 4 · 30, 30 · 4, 3 · 40 …); 1 · 10 … 5 · 10, 10 · 10 … 50 · 10, 1 · 100 … 5 · 100; műveletsorok összekötése eredménnyel (250, 500, 470, 460); bárányok táblázata (· 2 … · 12); „50 ló és hatszor ennyi juh”; hányadosok soronként (18 : 2 → 180 : 2 → 180 : 20 …); hiányzó számok; nyitott mondatok; szabálytáblázat; „90 fekete és háromszor annyi szürke ló”.

**A fejezet szorzásai és osztásai mind a szorzótáblára épülnek, kerek tízesekkel:** szorzás 10-zel (12 · 10, 34 tízszerese), 100-zal (1 · 100 … 5 · 100), kerek tízes · egyjegyű (6 · 80 = 480), 10 · kerek tízes (10 · 40); osztás egyjegyűvel (320 : 4 = 80) és kerek tízessel (320 : 40 = 8). Ami új a III. fejezethez képest: a számkör 500-ig, a szorzás 100-zal, a „tízszerese” kifejezés, a háromtényezős szorzat (3 · 9 · 10) és a nagyobb szorzatok (pl. 9 · 50).

## Mit csinál a DiákZóna lecke?

Saját feladatok, számok és helyzetek (zsírkréta-dobozok, tojás, matricacsomagok, tanya, szalag, széksorok, érmék) – a könyv feladattípusait gyakoroljuk, de nem másoljuk.

- **Elmélet:** „Mit tanulunk?”, szorzás 10-zel (14 doboz kréta), szorzás 100-zal (százas lapok és 30 tízesrúd), „A szorzótábla segít” (6 · 7 → 6 · 7 tízes → 6 · 70), a kétféle osztás külön néven (részekre osztás tányérokkal: 280 : 4; bennfoglalás ugrásokkal: 280 : 40), műveletcsalád érmerácsból (4 · 60, 6 · 40, 240 : 4, 240 : 60), 3 mintapélda („háromszor annyi”, „hány doboz kell?”, műveleti sorrend), „Vigyázz!” (6 · 70 ≠ 42; 320 : 40 ≠ 80).
- **Labor I – Egy kép, három művelet:** véletlen tízesrúd-kép (g csoport, csoportonként v = kerek tízes, a szorzat legfeljebb 500). A gyerek sorban kitölti: g · v, a szorzat : g, a szorzat : v. A rossz válaszokra célzott tipp jön („Ne hagyd le a nullát!”, „Összeadtad a két számot”, „Ez csak a tízesek száma”, „Itt azt kérdezzük, hány csoport van”).
- **Labor II – Csomagolj!:** két mód. *Hány doboz kell?* (bennfoglalás): a gyerek gombnyomásra dobozonként pakolja a krétákat (1 rúd = 10 kréta), amíg el nem fogynak, aztán megmondja a hányadost. *Mennyi jut egy dobozba?* (részekre osztás): körönként minden dobozba egy rudat tesz, a végén megmondja, mennyi jutott egyre. „Új feladat” véletlen számokkal 480-ig, ellenőrző szorzással.
- **Kvíz:** 30 kérdés (10/10/10), 18 ábrával, mind típusjelvénnyel, 3 puskakártya. Egyetlen szám (a rossz válaszokban sem) nagyobb 500-nál.
- **Párosító:** 3 szint × 8 pár, szintenként 4 képes kártya (tízesrúd-csoportok ↔ szorzat; tányérokra osztás ↔ hányados; érmerács ↔ összeg, és □-es feladatok).
- **Csoportosító:** 3 szint × 3 kategória × 9 elem (szorzat 240 / 280 / 300 zsákokkal; egy részre jutó mennyiség 50-nél kevesebb / pontosan 50 / több tányérokkal; műveletsorok és érmék: 200 / 250 / 300), szintenként 4–6 képes elem.

## Komponensek

- `MulDiv500G3Parts.tsx`: rajzelemek (`RodGroups`, `Plate`, `HopLine`, `CoinGrid`, `NumBox`); az érme, a százas lap és a tízesrúd a 3. lecke `AddSub500G3Parts.tsx` fájljából jön
- `MulDiv500G3Figures.tsx`: `MulDiv500BoxesSvg`, `MulDiv500AnalogySvg`, `MulDiv500HundredsSvg`, `MulDiv500SharingSvg`, `MulDiv500HopsSvg`, `MulDiv500CoinGridSvg`
- `MulDiv500G3CardFigures.tsx`: kártyaképek (`MiniRodGroups`, `MiniShare`, `MiniCoinGrid`, `SortBags`, `SortShare`, `SortCoinSet`)
- `MulDiv500G3Theory.tsx`: `MulDiv500G3Theory`, `makeFamilyTask`, `makePackTask`
- `MulDiv500G3Quiz.tsx`: `MulDiv500G3Quiz`, `MUL_DIV_500_G3_QUESTIONS` (azonosító: `g3-c500-szorzas-quiz`)
- `MulDiv500G3Matcher.tsx`: `MulDiv500G3Matcher`, `MUL_DIV_500_G3_MATCHER_LEVELS` (`g3-c500-szorzas-matcher`)
- `MulDiv500G3Sorter.tsx`: `MulDiv500G3Sorter`, `MUL_DIV_500_G3_SORTER_LEVELS` (`g3-c500-szorzas-sorter`)

Teszt: `src/test/grade3Topic5MulDiv500G3.test.tsx`

## Eltérések a tankönyvtől

1. **Törtszavak túl korán (TK 62/10., TK 63/15.):** „A 100-nak a kétszerese nagyobb, mint a négyszáz **fele**”, „a 400 m **tizedrészénél** 220 méterrel többet” – a törteket csak a XIV. fejezet tanítja. DiákZóna nem használ törtszavakat; helyette „4 egyforma részre osztod”, „Mennyi jut egyre?”.
2. **Kétértelmű szöveges feladat (TK 63/15.):** „Egyikük a 400 m tizedrészénél 220 méterrel többet tett meg” – a mondatból nehezen derül ki, hogy ez egy távolság (40 + 220 = 260 m), és az a) kérdés („Hány méterrel többet tett meg a fürgébb?”) csak a b) rész után válaszolható meg. A feladatot nem vettük át.
3. **Még nem tanult szorzás (MF 74/5.):** a bárányos táblázatban 20 · 12 = 240 és 40 · 12 = 480 szerepel – ez kétjegyű · kétjegyű szorzás, a szorzótáblán kívül (az írásbeli szorzás csak a XIII. fejezetben jön). DiákZóna csak kerek tízes · egyjegyű, 10 · szám és 100 · egyjegyű szorzást kér.
4. **A kétféle osztás nincs megnevezve:** a könyv a részekre osztást (TK 62/8.) és a bennfoglalást (TK 62/6., 63/11.) vegyesen adja. DiákZóna külön néven, külön képpel tanítja (tányérok ↔ ugrások), a laborban a gyerek mindkettőt maga csinálja, és a „Vigyázz!” doboz a 320 : 4 és 320 : 40 összekeverésére figyelmeztet.
5. **Szereplők, helyzetek:** a lovarda-történeteket és szereplőit (Dezső bácsi, István bácsi, Ráró, Csillag) nem vettük át; saját helyzetek (kréta, tojás, tanya, szalag, széksorok).
6. **Didaktikai változtatások:** a kötegek helyett egységes tízesrúd (a fejezet többi leckéjével egyezően: százas piros, tízes kék); minden szorzásnál és osztásnál kimondjuk a szorzótáblás párját (6 · 7 = 42 → 6 · 70 = 420), és ellenőrző szorzással zárunk. A betűrejtvény és a rajtszám-logika helyett azonnali, hibára szabott visszajelzés a laborokban. A műveleti sorrend kérdésénél a rossz válasz (400) pontosan a „balról jobbra számoltam” hibát mutatja.
7. A régi README a címek alapján készült; most a valódi oldalak alapján átírtuk.
