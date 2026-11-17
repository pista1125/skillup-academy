# 1. Számok 500-ig (3. osztály, V. Számolás 0-tól 500-ig)

**Források:** tankönyv OH-MAT03TA 52–55. oldal, munkafüzet OH-MAT03MA I. kötet 61–64. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 52.:** nyitókép (500 darabos kirakó), mely adat pontos; mit lehet venni 500 Ft-ért; a kerek tízesek táblája 10-től 500-ig letakart mezőkkel (patkó, nyereg), számok betűvel.
- **TK 53.:** sorozatok (ötvenesével, húszasával, harmincasával visszafelé), négyzetek összeszámolása (százas lap, tízes oszlop, egyes), helyiérték-táblázat (500, 450, 285), golyós számoló (piros 100, kék 10, sárga 1), páros/páratlan, sorba rendezés.
- **TK 54.:** pénz eurókkal (1 €-s érme, 10 és 100 €-s bankjegy), rejtett számok egy képen, csoportosítás (jegyek száma, páros/páratlan, „kerek tízes vagy 333-nál nagyobb”), alaki és valódi érték.
- **TK 55.:** kirakó dobozok (100-as dobozok + darabok), „2 sz + 3 t + 5 e” típusú bontások, köztük beváltást kívánók (1 sz + 11 t + 5 e, 4 sz + 7 t + 15 e) és felcserélt sorrendűek (7 t + 3 sz + 9 e); számok szavakból; feltételes számgyűjtés; számkártyák (3, 2, 4 és 4, 3, 0).
- **MF 61–64.:** tallérok (láda = 100), 201–300 és 301–400 tábla letakart részekkel, sor–oszlop keresés, számok betűvel, számok két szám között, számegyenes 300–400 és 0–500, golyós számoló színezése, bontások (3 sz + 15 t + 4 e, 41 t + 7 e, 517 e), hiányzó helyiértékek, számkártyák (1, 3, 4).

**Újdonság a III. fejezethez (200-ig) képest:** a 3., 4. és 5. száz; több százas a kirakásban; sorozatok 20-asával, 30-asával, 50-esével; a beváltás és a „rendetlen” bontás (pl. 41 t + 6 e) önálló feladattípus lesz; számegyenes 0–500; számkártyákból háromjegyű számok, 0 a kártyák között.

## Mit csinál a DiákZóna lecke?

Saját számokkal és helyzetekkel gyakoroltatja az 500-as számkört: százas lap + tízesrúd + egyeskocka, golyós számoló, forintérmék (csak létező érmék: 5, 10, 20, 50, 100, 200 Ft), a kerek tízesek táblája, helyiérték-táblázat (alaki érték, helyiérték, valódi érték, a 0 szerepe), beváltás, számok betűvel, számsorok, összehasonlítás, számegyenes, számkártyák. Minden szám (a rossz válaszok is) 500-on belül marad, kivéve a szándékos „4006”, „30072” típusú írási hibákat.

## Komponensek

1. **`Numbers500G3Parts.tsx`** – rajzelemek: `HundredFlat`, `TenRod`, `OneCube`, `BlockRow` (+ `blockRowWidth`), `Coin`, `Abacus`, `NumLine500`, `DigitCardRow`.
2. **`Numbers500G3Figures.tsx`** – `FiveHundredsSvg` (öt százas lap 100-tól 500-ig), `TensBoardSvg` (kerek tízesek 210–500, „?” mezőkkel), `Blocks347Svg` (347 kirakva), `Abacus263Svg`, `PlaceValue405Svg` (405, 450, 45 – a 0 szerepe), `ExchangeSvg` (2 sz + 13 t + 6 e → 336), `NumberLine500Svg`, `DigitCardsSvg` (3, 0, 4 → négy háromjegyű szám, a 034 és a 043 nem az).
3. **`Numbers500G3CardFigures.tsx`** – kártyaábrák: `BlocksCard` (párosító; `small` = csoportosító, két sorban), `AbacusCard`, `DigitCard` (bekeretezett jegy), `PileCard` (kupac számokkal: lap × 2, rúd × 13…).
4. **`Numbers500G3Theory.tsx`** – Mit tanulunk?, öt százas, kirakás, golyós számoló, helyiérték, beváltás (táblázattal), számok betűvel, számegyenes és számsorok, számkártyák, 3 mintapélda (3 sz + 14 t + 2 e; növekvő sorrend; pénz 495 Ft), „Vigyázz!” (négyszázhat ≠ 4006 / 46; sok golyó ≠ nagy szám).
   - **Labor I – Rendetlen kupac:** véletlen „rendetlen” kupac (pl. 1 lap, 14 rúd, 12 kocka; mindig 101–500). Két gomb: „10 kocka → 1 rúd”, „10 rúd → 1 lap” (csak akkor aktív, ha van mit beváltani). A gyerek 4 szám közül választ; hibára célzott tipp (még nem váltott be / elfelejtette a beváltott rudat vagy lapot / számolja újra).
   - **Labor II – Hol lakik a szám?** Két mód: egy százon belül (10-es osztás) vagy 0-tól 500-ig (50-es osztás). A gyerek a számegyenesre koppint; hibánál megmondja, melyik számra koppintott, és hány osztással kell jobbra/balra menni; sorozatszámláló.
5. **`Numbers500G3Quiz.tsx`** – `NUMBERS_500_G3_QUESTIONS`: 30 kérdés (10/10/10), 24 kérdésnél ábra, minden kérdésnél badge, 3 puska. Azonosító: `g3-c500-szamok-quiz`.
6. **`Numbers500G3Matcher.tsx`** – `NUMBERS_500_G3_MATCHER_LEVELS`, 3 szint × 8 pár (kirakás és betű ↔ szám; golyós számoló és bontás ↔ szám; bekeretezett jegy ↔ valódi érték és beváltás ↔ szám), szintenként 4 képes kártya. `g3-c500-szamok-matcher`.
7. **`Numbers500G3Sorter.tsx`** – `NUMBERS_500_G3_SORTER_LEVELS`, 3 szint × 3 kategória × 3 elem (2/3/4 százas; a 4-es 400-at / 40-et / 4-et ér; beváltás után 300 alatt / 300 és 400 között / 400 fölött), szintenként 5–6 képes elem. `g3-c500-szamok-sorter`.

**Teszt:** `src/test/grade3Topic5Numbers500G3.test.tsx`

## Eltérések a tankönyvtől

- **„Helyi érték” két szóban (TK 53/5., TK 54/9. d, MF 64/10. b):** a helyes szakszó egybeírva **helyiérték**; nálunk következetesen így áll.
- **„Szám” a „számjegy” helyett (TK 55/12. b, MF 64/10. b):** „a százasok helyén álló szám valódi értéke 300”, „a tízesek helyén a legnagyobb alaki értékű szám van”, „2-es alaki értékű szám áll”. Helyesen: számjegy. Nálunk „jegy” / „számjegy”.
- **Szám a számkörön kívül (MF 64/9.):** az „517 e” kocsi 500-nál nagyobb számot jelent az „500-ig” fejezetben. Nálunk a rossz válaszok is 500-on belül maradnak.
- **Átfedő csoportosítási szempont (TK 54/8. b):** „kerek tízes vagy a 333-nál nagyobb” – a 450 mindkettő, így nem két szétváló csoport. A Csoportosító játékban minden elem pontosan egy kategóriába tartozik.
- **Euró a helyiértékhez (TK 54/7.):** a feladat külföldi pénzt (1 €, 10 €, 100 €) használ. Mi a gyerek saját pénzével, a forinttal számolunk, és csak létező érméket rajzolunk (5, 10, 20, 50, 100, 200 Ft). Mivel 1 Ft-os érme nincs, az egyeseket kockával és golyós számolóval mutatjuk, nem pénzzel.
- **Vitatható „pontos adat” kérdés (TK 52/1. a):** „Iskolánknak 500 tanulója van” lehet pontos is, közelítő is; a feladat egy választ sugall. Ezt nem vettük át; a pontos és a közelítő érték a 2. leckében, egyértelmű példákkal szerepel.
- **Kimondatlan szabály (TK 55/13. b):** a 4, 3, 0 kártyáknál a lényeget („0-val nem kezdődhet háromjegyű szám”) a gyereknek kell „tapasztalnia”. Nálunk ábra (034, 043 áthúzva) és kvízkérdés mondja ki.
- **Témán kívüli részek:** „Mit vehetsz 500 Ft-ért?” beszélgetés, a páros szóverseny (TK 55/11.), az ismétléses számkártyás kérdés (TK 55/13. c) és a rejtett számos kép nem került be.
- **Tudatos didaktikai változtatások:**
  - A könyv a beváltást csak kész bontásokkal kéri (3 sz + 13 t + 9 e). Nálunk a Labor I-ben a gyerek maga váltja be a rudakat és a kockákat, és látja, hogy a szám nem változik.
  - A számegyenesen való elhelyezést (MF 62/6.) azonnali visszajelzéses koppintós laborrá alakítottuk.
  - A 0 szerepét a helyiérték-táblázatban külön ábra mutatja (405 – 450 – 45), és csapdadoboz figyelmeztet (négyszázhat = 406).
  - A csoportosító kártyákon a sok rudat (11–14) „rúd × 13” jelöléssel rajzoltuk, hogy a kis kártyán is olvasható legyen.
  - Saját számok és helyzetek; a könyv szereplőit (Timi, Peti, Anna, Endre, Dóri, Sára, Pisti, Lilla) és a lovas/puzzle történeteket nem vettük át.
