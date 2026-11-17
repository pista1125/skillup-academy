# 1. Számok 200-ig (3. osztály, III. Számolás 0-tól 200-ig)

**Források:** tankönyv OH-MAT03TA 28–31. oldal, munkafüzet OH-MAT03MA I. kötet 35–38. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 28.:** nyitókép (utcarészlet háromjegyű számokkal: busz, házszámok, árak, zebra 100–200), számok kiolvasása, emlékezetből felírás; 200 lépés becslése.
- **TK 29.:** az első (1–100) és a második (101–200) számtábla, letakart számok (körök, négyzet), a 4. oszlop számai, lépegetés a táblán („Melyik számra gondoltam?”).
- **TK 30.:** számsorok tízesével / egyesével, „150 < □ < 160” típusú feladatok, tallérok (100-as láda, 10-es oszlop), zsebkendők 100-as és 10-es csomagban.
- **TK 31.:** négyzetek összeszámolása (100 + 10 + 4), golyós számoló (piros 100, kék 10, sárga 1), helyiérték-táblázat alaki és valódi értékkel, számok százasokból, tízesekből, egyesekből, bontás (124 = 1 százas + 2 tízes + 4 egyes).
- **MF 35–38.:** számtábla kiegészítése és színezése feltételek szerint, lépegetés, számírás betűvel/számmal, Venn-diagram (háromjegyű / számjegyösszeg 12), pénztárcák, golyós számoló színezése, helyiérték-táblázat, alaki/helyi/valódi érték, állítások párosítása számkártyákhoz, kakukktojás, számrejtvény, mérés otthon 2 m-ig.

## Mit csinál a DiákZóna lecke?

Saját számokkal és helyzetekkel gyakoroltatja a 200-as számkört: százas lap + tízesrúd + egyeskocka, golyós számoló, forintérmék (csak létező érmék: 5, 10, 20, 50, 100, 200 Ft), a második százas tábla (101–200) és lépegetés rajta, helyiérték-táblázat (alaki érték, helyiérték, valódi érték), számok betűvel, számsorok, összehasonlítás, „□ a két szám között”.

## Komponensek

1. **`Numbers200G3Figures.tsx`** – `HundredsTensOnesSvg` (136 = 1 lap + 3 rúd + 6 kocka), `SecondHundredBoardSvg` (101–200 tábla „?” mezőkkel, +1 / +10 jelöléssel), `PlaceValue200Svg` (158 alaki és valódi értékei), `Abacus200Svg` (142 golyós számolón), `Money200Svg` (100 + 50 + 20 + 5 = 175 Ft), `NumberWordsSvg` (száz + negyven + hét = száznegyvenhét).
2. **`Numbers200G3Parts.tsx`** – rajzelemek (százas lap, tízesrúd, egyeskocka, kétszínű 100/200 Ft-os érme, golyós számoló).
3. **`Numbers200G3CardFigures.tsx`** – kártyaábrák a játékokhoz: `BlocksCard`, `AbacusCard`, `DigitCard`.
4. **`Numbers200G3Theory.tsx`** – Mit tanulunk?, a második százas tábla, százas–tízes–egyes, golyós számoló és pénz, alaki/helyi/valódi érték, számok betűvel, számsorok és összehasonlítás, 3 mintapélda, „Vigyázz!” (százhét ≠ 1007).
   - **Labor I – Építsd meg a számot!** Százas lap, tízesrúd, egyeskocka hozzáadása/elvétele, kétféle beváltás gomb (10 kocka → 1 rúd, 10 rúd → 1 lap), ellenőrzés helyiértékenként szabott tippel, „Új feladat” (101–200).
   - **Labor II – Lépegess a második százas táblán!** Véletlen kezdőszám és két lépés; a gyerek a 101–200 táblára koppint; hiba esetén megmutatja az utat és a +1 / +10 szabályt.
5. **`Numbers200G3Quiz.tsx`** – `NUMBERS_200_G3_QUESTIONS`: 30 kérdés (10/10/10), 23 kérdésnél ábra, minden kérdésnél badge, 3 puska. Azonosító: `g3-c200-szamok-quiz`.
6. **`Numbers200G3Matcher.tsx`** – `NUMBERS_200_G3_MATCHER_LEVELS`, 3 szint × 8 pár (kirakás és betű ↔ szám; golyós számoló és bontás ↔ szám; bekeretezett jegy ↔ valódi érték), szintenként 4 képes kártya. `g3-c200-szamok-matcher`.
7. **`Numbers200G3Sorter.tsx`** – `NUMBERS_200_G3_SORTER_LEVELS`, 3 szint × 3 kategória × 9 elem (100 alatt / 100–150 / 150 fölött; tízesek helyén 3 / 5 / 0; a 6-os 6-ot / 60-at ér / nincs 6-os), szintenként 4 képes elem. `g3-c200-szamok-sorter`.

**Teszt:** `src/test/grade3Topic3Numbers200G3.test.tsx`

## Eltérések a tankönyvtől

- **„Helyi érték” két szóban (TK 31/11. a, MF 37/7.):** a táblázat fejlécében így áll, ugyanazon az oldalon pedig „helyiérték-táblázat”. A helyes szakszó egybeírva **helyiérték**; mi következetesen így írjuk.
- **Tört a 200-as számkörben (MF 37/10.):** „A százasok helyén a négy fele van.” A „fele” a törtekhez tartozik (XIV. fejezet). Nálunk nincs ilyen megfogalmazás.
- **Kétértelmű állítás (MF 37/11.):** „A százasok helyén az egyes alaki értékű szám áll.” Ez a 134-re és a 181-re is igaz, a feladat viszont egy-egy párosítást vár. Ráadásul az „egyes” itt egyszerre jelentheti az 1-es számjegyet és az egyesek helyét. Mi a jegyet mindig számjeggyel írjuk („az 1-es”), a helyet szóval („az egyesek helyén”), és minden állításnak pontosan egy megoldása van.
- **„Szám” a „számjegy” helyett (MF 37/10–11.):** „A tízesek helyén álló szám valódi értéke 30.” Helyesen: számjegy. Nálunk „jegy” / „számjegy” szerepel.
- **Nehezen megkülönböztethető színek (TK 29/3. h):** a „pirossal írt számok” mellett bordó számok is vannak a táblában (4, 45, 58, 62, 100), a két szín nyomtatásban alig különbözik. A mi ábráinkon a kiemelés jól elkülönülő színekkel és „?” jellel történik.
- **Nem egyértelmű kakukktojás (MF 38/13. a, zöld csoport: 189, 187, 188, 184, 131, 105):** több jó szempont is adódik, a feladat mégis egy kakukktojást vár. Ilyen feladatot nem vettünk át; a Csoportosító játékban a kategóriák egyértelműek.
- **Témán kívüli részek:** a nyitókép beszélgetős feladatait (előtt, mögött, között) és a 200 lépés kipróbálását (TK 28.), valamint a 2 m-ig tartó otthoni mérést (MF 38/12.) nem vettük át; a mérés a IV. Mérések fejezetben és a 2. leckében (mérőszalag) szerepel.
- **Tudatos didaktikai változtatások:**
  - A könyv a beváltást csak a tallérládánál mutatja; nálunk a Laborban a gyerek maga váltja be a 10 kockát rúdra és a 10 rudat lapra, és a hibájára szabott tippet kap.
  - A „százhét” típusú számoknál külön csapdadoboz figyelmeztet a 0-ra a tízesek helyén (1007 ≠ 107).
  - A golyós számolós kártyákon legfeljebb 6 golyó van egy rúdon, hogy a kis kártyán is meg lehessen számolni őket.
  - Saját számok és helyzetek; a könyv szereplőit (Anna, Balázs, Cili, Dani…) és a tallér/zsebkendő történeteket nem vettük át.
