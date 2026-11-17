# 3. Összeadás és kivonás (3. osztály, V. Számolás 0-tól 500-ig)

**Források:** tankönyv OH-MAT03TA 58–60. oldal, munkafüzet OH-MAT03MA I. kötet 68–72. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 58.:** 500 Ft-os album két gyerek 100 forintosaiból (minden felbontás); 310 + 40 és 310 + 140 pénzzel („3 százas + 5 tízes”); oszlopos összeadások (300 + 70, 180 + 300, 250 + 110 …); lóverseny 500 m-es pályán (mennyi van még hátra); 470 − 30 és 470 − 130 áthúzott érmékkel; oszlopos kivonások.
- **TK 59.:** ablakos számkártyákból műveletalkotás; százasátlépés oszloponként (80 + 80, 180 + 80, 280 + 90 …; 350 + 60 … 350 + 90; 130 − 70 … 430 − 90; 450 − 60 …); 250 + 170 háromféle bontással (250 + 100 + 70; 250 + 70 + 100; 250 + 100 + 50 + 20); pénzes szöveges feladat és betűrejtvény.
- **TK 60.:** 450 − 170 háromféle bontással; oszlopos különbségek (200 − 150, 420 − 180 …); „Melyik számra gondoltam?” (összeg, különbség, tízes szomszéd) és a kapott sorozat folytatása; kétlépéses szöveges feladat (pontgyűjtés, „80-nal kevesebb”, összesen).
- **MF 68–72.:** analóg összegek (15 + 15 → 150 + 150; 200 + 30 → 200 + 40), szabálytáblázat három összeadandóval, látogatók két napon, oszlopos százasátlépés, nyitott mondatok a kiszámolt összegekből, kivonás százasokkal, különbségtáblázat (− 20, − 200, − 230), pótlás a következő százasig, kivonás ellenőrzése kétféleképpen, hiányzó számok, „170-nel többen”, kétlépéses szöveges feladatok, tréfás feladat.

**A fejezet minden összeadása és kivonása kerek tízesekkel és kerek százasokkal dolgozik, 500-on belül.** Ami új a III. fejezethez képest: a háromjegyű kerek tízesek (250 + 170, 450 − 170), az átlépés bármelyik kerek százason (nem csak a 100-on), a bontás „előbb a százas, aztán a tízes” és a pótlás 500-ig. Nem kerek számok (pl. 235 + 48) itt még nincsenek; a régi README ilyen példái nem a könyvből valók voltak.

## Mit csinál a DiákZóna lecke?

Saját számokkal és helyzetekkel (persely-érmék, ösvény, papírbolt 500 Ft-os bankjeggyel, bábszínház, csapatverseny, könyvtár) gyakoroltatja: százasok és tízesek külön összeadása, „számolj tízesekkel” (28 t + 9 t = 37 t → 280 + 90 = 370), átlépés a kerek százason ugrással, háromjegyű kerek tízesek bontással (+100, aztán +70), pótlás a következő százasig és 500-ig, kivonás ellenőrzése összeadással, visszajáró pénz, egy- és kétlépéses szöveges feladatok.

## Komponensek

1. **`AddSub500G3Parts.tsx`** – `QFig`, `Coin` (10–200 Ft, áthúzható), `Note500` (500 Ft-os bankjegy), `PriceTag`, `Flat`/`Rod`/`Blocks` (százas lap, tízesrúd), `JumpLine` (számegyenes 10-es beosztással, a kerek százasok kiemelve, ugrásokkal), `Bar500` (csíkmodell).
2. **`AddSub500G3Figures.tsx`** – `AddSub500CoinsSvg` (240 + 130 érmékkel), `AddSub500AnalogySvg` (28 + 9 → 280 + 90), `AddSub500BridgeSvg` (280 + 20 + 30), `AddSub500BridgeBackSvg` (430 − 30 − 30), `AddSub500SplitAddSvg` (250 + 100 + 70), `AddSub500SplitSubSvg` (430 − 100 − 60), `AddSub500ToFiveHundredSvg` (360 + ? = 500).
3. **`AddSub500G3CardFigures.tsx`** – kártyaképek: `MiniCoins`, `MiniJump`, `MiniBar500` (párosító), `SortBlocks`, `SortJump`, `SortTags` (csoportosító).
4. **`AddSub500G3Theory.tsx`** – `AddSub500G3Theory`, `makeSplitTask`. Százasok és tízesek, tízesekkel számolás, átlépés a kerek százason (oda és vissza), bontás, pótlás és ellenőrzés, 3 mintapélda (biciklitúra, visszajáró, „mennyivel több”), „Vigyázz!” (350 + 80 ≠ 330; 420 − 50 ≠ 430; 300 + 70 ≠ 307).
   - **Labor I – Bontsd és ugorj!** Véletlen összeadás vagy kivonás háromjegyű kerek tízessel (pl. 260 + 180). 1. lépés: a százasok, 2. lépés: a tízesek; az ugrások megjelennek a számegyenesen. A rossz válaszokra célzott tipp jön („Ez csak 1 tízes volt. De 100 = 1 százas!”, „Átléptél egy százast!”, „Még ott van a 80!”), a végén ellenőrző művelet.
   - **Labor II – Visszajáró pénz.** A gyerek a pénztáros: a vevő 500 Ft-tal fizet egy véletlen árú (110–480 Ft) dologért. 10, 20, 50, 100, 200 forintosokra kattintva adja vissza a pénzt; mindig látja az „ár + visszajáró = ?” összeget, azt, mennyi hiányzik még az 500-hoz, és ha túl sokat adott. A végén megtudja, lehetett-e kevesebb érmével.
5. **`AddSub500G3Quiz.tsx`** – `ADD_SUB_500_G3_QUESTIONS`: 30 kérdés (10/10/10), 19 ábrával (érmék, számkép, ugrások, csík, ösvény, bolt, összehasonlító csíkok), minden kérdésnél badge, 3 puska. Azonosító: `g3-c500-osszeadas-quiz`. Egyetlen szám (a rossz válaszokban sem) nagyobb 500-nál.
6. **`AddSub500G3Matcher.tsx`** – `ADD_SUB_500_G3_MATCHER_LEVELS`, 3 szint × 8 pár (érmék ↔ összeg és százasok; ugrás ↔ eredmény átlépéssel; csík az 500-ig ↔ hiányzó rész és □), szintenként 4 képes kártya. `g3-c500-osszeadas-matcher`.
7. **`AddSub500G3Sorter.tsx`** – `ADD_SUB_500_G3_SORTER_LEVELS`, 3 szint × 3 kategória × 9 elem (300-nál kisebb / pontosan 300 / nagyobb – számképek is, pl. 2 lap + 10 rúd; eredmény 320 / 340 / 360; visszajáró 500 Ft-ból 120 / 150 / 210 Ft árcédulákkal), szintenként 4–6 képes elem. `g3-c500-osszeadas-sorter`.

**Teszt:** `src/test/grade3Topic5AddSub500G3.test.tsx`

## Eltérések a tankönyvtől

- **Kétféle „kerek tízes szomszéd” (TK 60/10. C):** „Az 500 és a 300 különbségének kisebb tízes szomszédja” – a különbség 200, ami maga is kerek tízes. A gyerek könnyen 200-at mond, pedig a feladat a 190-et várja (így jön ki a 70-esével növő sorozat: 50, 120, 190, 260). A kerek tízes „tízes szomszédja” fogalmat a könyv itt magyarázat nélkül használja. Ilyen kétértelmű kérdést nem tettünk be; a „gondolt szám” feladatunk egyértelmű (□ + 160 = 410).
- **Szereplők és helyzetek:** a lovas–lovarda történeteket és a könyv szereplőit (Réka, Peti, Lilla, Ella, Edina, András) nem vettük át; saját helyzetek és nevek (Hanna, Marci, Zoé).
- **Meghatározatlan sorrend (TK 59/7. b):** „rakd helyes sorrendbe az összeadások eredményeihez tartozó betűket” – a feladat nem mondja meg, mi a helyes sorrend. Sem a feladatok sora (P, E, S, R, LY, E), sem az oszlopok sora, sem a nagyság szerinti sorrend nem adja ki a szót (PERSELY); a gyereknek találgatnia kell (anagramma). DiákZóna-ban nincs ilyen rejtvény; a csoportosítóban minden elem pontosan egy kategóriába illik, és a kategóriák nem fedik egymást.
- **Tudatos didaktikai változtatások:**
  - A könyv három bontást mutat egyszerre (TK 59/6., 60/8.); mi egy fő utat tanítunk (előbb a százas, aztán a tízes), és a másik sorrendet csak tippként említjük. Minden lépés ugrásként is látszik a számegyenesen.
  - Az átlépést nem csak a 100-on (mint a III. fejezetben), hanem minden kerek százason gyakoroljuk (280 + 50, 430 − 60), két tipikus hibával csapdadobozban: elfelejtett új százas (350 + 80 = 330) és „kisebbet a nagyobból” (420 − 50 = 430).
  - A könyv kivonás-ellenőrzését (MF 70/12.) minden mintapéldában és a labor végén is megmutatjuk.
  - A 470 − 130 áthúzott érmés képéből és az 500 Ft-os album ötletéből manipulatív labor lett (visszajáró pénz 500 Ft-ból, azonnali visszajelzéssel).
  - A kvíz rossz válaszai tipikus hibák (lehagyott százas, 307 a 370 helyett, csak az egyik lépés elvégzése).
