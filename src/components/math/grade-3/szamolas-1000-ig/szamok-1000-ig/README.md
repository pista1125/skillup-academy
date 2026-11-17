# 1. Számok 1000-ig (3. osztály, XI. Számolás 0-tól 1000-ig)

**Források:** tankönyv OH-MAT03TA 108–110. oldal, munkafüzet OH-MAT03MA II. kötet 32–35. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 108.:** játékváros 10 házzal (100 elem/ház → 1000; 500 + 500 és százasával számolás), 1000 Ft kifizetése játékpénzzel, összegek kirakása (505, 898, 652, 837 **euró**), szalvéta-leltár 100-as és 10-es csomagokból, „mennyi az 1000?” példák (repülő, busz, vonat, autó tömege).
- **TK 109.:** a kerek tízesek táblája 10-től 1000-ig letakart mezőkkel (autó, repülő), számok betűvel, útvonal nyilakkal a táblán, számok alkotása szavakból (nyolcszáz / harminc / kilenc …), sorozatok (százasával, ötvenesével, húszasával és harmincasával visszafelé).
- **TK 110.:** helyiérték-táblázat új **ezres** oszloppal (173, 418, 231, 1000), az 1-es valódi értéke, bontás „543 = 5 sz + 4 t + 3 e”, a 8-as számjegy keresése, páros háromjegyű számok számkártyákból (7, 9, 6, 8, 5), két szám közé eső számok.
- **MF 32–35.:** zsebkendők 10-es és 100-as csomagban, golyós számoló (piros 100, kék 10, sárga 1), helyiérték-táblázat ezressel, alaki/helyi/valódi érték, „Melyik számra gondoltam?” beváltással (450 egyes + 15 tízes …), pénztárcák (530, 750, 820 Ft), két szám közötti számok, számegyenesek 0–100, 0–1000, 360–960, 500–1000, számkártyák (2, 4, 7, 8, 9), Venn-diagram (páros / háromjegyű), feltételes számkeresés.

**Újdonság az V. fejezethez (500-ig) képest:** a 6.–10. száz; **10 százas = 1 ezres = 1000**, az első **négyjegyű** szám; a helyiérték-táblázat ezres oszlopa; számegyenes 0–1000 és 500–1000; 1000 Ft-os bankjegy; a 999 → 1000 átlépés minden helyen.

## Mit csinál a DiákZóna lecke?

Saját számokkal és helyzetekkel gyakoroltatja az 1000-es számkört: százas lap + tízesrúd + egyeskocka, tíz százas = ezer, helyiérték-táblázat ezressel (a 0 szerepe), alaki / helyi / valódi érték, beváltás, betűvel írás, számegyenes, sorozatok, összehasonlítás, pénz (500 és 1000 Ft-os bankjegy, érmék), számkártyák páros/páratlan feltétellel. Minden szám (a rossz válaszok is) 1000-en belül marad, kivéve a szándékos írási hibákat (8046, 9007).

## Komponensek

1. **`Numbers1000G3Parts.tsx`** – a XI. fejezet 1–3. leckéjének közös rajzelemei: `QFig`, `HundredFlat`, `TenRod`, `OneCube`, `Blocks` (+ `blocksWidth`, `blocksHeight`), `Coin`, `Note` (500/1000 Ft), `NumLine`, `DigitCardRow`, `RowFig`, `OptButton`; segédek (`rnd`, `shuffle`, `art`) és a laborok generátorai (`makeBuildTarget`, `makeCardTask`, `cardAnswer`).
2. **`Numbers1000G3Figures.tsx`** – `TenHundredsSvg` (100-tól 1000-ig, a 10. lap zöld), `ThousandStepSvg` (999 + 1 = 1000), `PlaceValueTableSvg` (1000, 706, 960, 69), `Blocks685Svg`, `NumberLine1000Svg`, `Pay1000Svg` (1000 Ft háromféleképpen).
3. **`Numbers1000G3CardFigures.tsx`** – kártyaábrák: `MiniBlocks`, `MiniLine`, `MiniMoney`, `BoxedNum` (párosító), `SortPile`, `SortCards` (csoportosító).
4. **`Numbers1000G3Theory.tsx`** – Mit tanulunk?, tíz százas = ezer, kirakás, helyiérték-táblázat ezressel, betűvel írás, számegyenes és sorozatok, összehasonlítás, pénz, 3 mintapélda (7 sz + 13 t + 5 e; legnagyobb páros a 3, 8, 0 kártyákból; 995 < □ < 1000), „Vigyázz!” (hétszázhat ≠ 7006 / 76; az 1000 nem háromjegyű).
   - **Labor I – Rakd ki!** Véletlen szám 101–1000 között (néha kerek tízes, néha 1000). A gyerek + / − gombokkal lapot, rudat, kockát tesz az asztalra (a kirakás rajzon látszik). „Kész!” után célzott tipp minden fajtára külön („Lap: kevés. Tegyél még hozzá!”, „Rúd: túl sok…”); ha 10-nél több rudat/kockát rakott, a beváltásra figyelmeztet; 1000-nél: „10 lap = 1 ezres”.
   - **Labor II – Számkártyák.** Három véletlen, különböző számjegy (néha 0 is), és egy feladat: legnagyobb / legkisebb, páros / páratlan háromjegyű szám. A kártyákra koppintva rakja ki a számot; hibánál célzott tipp (0-val nem kezdődhet; páratlan lett, mert … van a végén; van nagyobb is). Sorozatszámláló.
5. **`Numbers1000G3Quiz.tsx`** – `NUMBERS_1000_G3_QUESTIONS`: 30 kérdés (10/10/10), 22 kérdésnél ábra (kirakás, számsor, bekeretezett jegy, számegyenes, pénz, kupac, számkártyák), minden kérdésnél badge, 3 puska. Azonosító: `g3-c1000-szamok-quiz`.
6. **`Numbers1000G3Matcher.tsx`** – `NUMBERS_1000_G3_MATCHER_LEVELS`, 3 szint × 8 pár (kirakás és betű ↔ szám; számegyenes, pénz, bontás ↔ szám; bekeretezett jegy ↔ valódi érték és beváltás), szintenként 4–5 képes kártya. `g3-c1000-szamok-matcher`.
7. **`Numbers1000G3Sorter.tsx`** – `NUMBERS_1000_G3_SORTER_LEVELS`, 3 szint × 3 kategória × 3 elem (6 / 7 / 8 százas; az 5-ös 500-at / 50-et / 5-öt ér; háromjegyű páros / páratlan / nem háromjegyű, benne az 1000), szintenként 6 képes elem. `g3-c1000-szamok-sorter`.

**Teszt:** `src/test/grade3Topic11Numbers1000G3.test.tsx`

## Eltérések a tankönyvtől

- **Euró a forint helyett (TK 108/2. b):** az összegeket (505, 898, 652, 837) euróban kell kirakni. Nálunk forinttal, és csak létező magyar pénzt rajzolunk (5–200 Ft-os érme, 500 és 1000 Ft-os bankjegy).
- **Szám a számkörön kívül (MF 33/5. f):** „9 százas + 123 egyes” = 1023, az 1000-es fejezetben (a válaszmező is négyjegyű). Nálunk minden bontás eredménye legfeljebb 1000.
- **„Helyi érték” két szóban (TK 110/7., MF 32/3.):** a helyes szakszó egybeírva **helyiérték**; nálunk végig így.
- **Szóköz az 1000-ben (MF 33/4.):** a munkafüzet itt „1 000”-et ír, máshol „1000”-et. Nálunk egységesen 1000.
- **Kimondatlan tény (MF 35/12.):** a Venn-diagramban az 1000 a „nem háromjegyű” részbe kerül, de sehol sincs kimondva, hogy az 1000 **négyjegyű**, és hogy a 999 a legnagyobb háromjegyű szám. Nálunk külön ábra (999 → 1000), csapdadoboz, kvízkérdés és csoportosító szint mondja ki.
- **Vitatható adatok (TK 108/3.):** „körülbelül 10 csuklós buszba férne el ennyi ember”, „egy személygépkocsi tömege lehet 1000 kg” – ellenőrizhetetlen becslések; nem vettük át.
- **Tudatos didaktikai változtatások:**
  - A kirakást (TK 108/1., MF 32/1–2.) digitális laborrá alakítottuk: a gyerek maga rakja ki a számot, és helyenként (százas, tízes, egyes) kap visszajelzést, nem csak „jó / rossz”-at.
  - A számkártyás feladatokat (TK 110/9., MF 35/11.) végtelen, véletlen feladatsorrá bővítettük, a tipikus hibákra (0 az elején, rossz paritás) célzott tippel.
  - A golyós számolót nem ismételtük (az V. fejezetben volt); helyette pénz és kirakás.
  - Saját számok és helyzetek; a könyv szereplőit (Dóri, Gábor, Roland, Ella, Dénes, Lilla, Marci) és a játékváros-történetet nem vettük át.
