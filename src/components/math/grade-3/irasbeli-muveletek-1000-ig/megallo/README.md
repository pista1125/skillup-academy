# 5. Megálló – tudáspróba (3. osztály, XII. Írásbeli műveletek 1000-ig)

**Források:** tankönyv OH-MAT03TA 118–121. oldal, munkafüzet OH-MAT03MA II. kötet 44–47. oldal. A fejezetnek nincs külön „Megálló” oldala a könyvben: a 118–121. oldal maga a vegyes gyakorló rész (a 122. oldalon már az Írásbeli szorzás kezdődik), ezért a tudáspróba ezekből és a négy testvérlecke anyagából épül.

## Mit tartalmaznak a könyv oldalai?

- **TK 118–119.:** írásbeli összeadás és kivonás 1000-ig, becslés százasra, hiányzó kivonandó, szakaszos ábrák.
- **TK 120.:** bűvös háromszög / négyzet (oldalösszeg 1000), „Melyik számra gondoltam?”, képekkel jelölt műveletsorok zárójellel, táblázat (fiúk, lányok, ebédelők).
- **TK 121.:** szakaszos ábrához szöveges feladat (613 cm és 386 cm), számkártyák (legnagyobb / legkisebb összeg, különbség), bűvös négyzet, nyitott mondatok, „véletlenül kivonta hozzáadás helyett”.
- **MF II/44–47.:** számrejtvények, hiányzó számjegyek, futóverseny-sáv (ki mennyire van a céltól), színező (1000 − 496).

## Mit csinál a DiákZóna lecke?

Fejezetzáró tudáspróba: 90 kvízkérdés (30/szint) a teljes XII. fejezetből, saját számokkal. A kivonás mindenhol a tanító döntése szerinti **pótlásos-maradékos** módszer, a VIII. fejezet `WrittenSubG3Column` komponensével; az összeadás a VII. fejezet `WrittenAddG3Column` komponensével.

- **1. szint:** egy lépés – írásbeli összeadás/kivonás, balról jobbra, szorzás előbb, zárójel, hiányzó tag, pótlás 1000-ig, becslés százasra, egyszerű szöveges feladat, ellenőrzés.
- **2. szint:** több maradék, három tag, kivonás nullás és 1000-es kisebbítendőből, hiányzó számjegy, táblázat és útvonal leolvasása, nyitott mondat, sorozat.
- **3. szint:** legfeljebb két lépés – kétlépéses szöveges feladatok, pénz, futóverseny, „gondoltam egy számot”, fordított művelet, hová a zárójel, hibakeresés, összegpiramis, bűvös háromszög, számkártyák.

## Komponensek

1. **`WrittenOps1000ExamG3Parts.tsx`** – `q`, `qAdd`, `qSub` kérdés-építők (tipikus hibákból képzett rossz válaszokkal: `addNoCarry`, `subNoCarry`, `subSwap`), `addExplain` / `subExplain` (kimondott lépések), `AddFig`, `SubFig` (1000-nél 4 oszlop), `PyramidFig`, labor-generátorok `genWritten`, `genCheck`.
2. **`WrittenOps1000ExamG3Figures.tsx`** – `WrittenOps1000ExamMapSvg` (a fejezet 4 része), `…AddSvg` (467 + 385), `…SubSvg` (1000 − 496 pótlással), `…OrderSvg` (sorrend), `…PlanSvg` (a szöveges feladat terve).
3. **`WrittenOps1000ExamG3CardFigures.tsx`** – a testvérleckék kártyaképei (MiniAdd, SortAdd, MiniSub, SortSub, ChainCard, SmallChain, SmallWallet, MiniBar, MiniRoute, MiniRows, MiniCoins) újraexportálva.
4. **`WrittenOps1000ExamG3Theory.tsx`** – „Amit már tudsz” összefoglaló, összeadás, kivonás pótlással, sorrend-táblázat, kétlépéses mintapélda és hiányzó szám, két csapda (elfelejtett maradék, fordított pótlás).
   - **Labor I – Számolj írásban!** Feladattípus-választó (vegyes / összeadás / három tag / kivonás / kivonás nullákkal, 1000-ből is), célzott visszajelzés (elfelejtett maradék, fordított pótlás), „Mutasd meg!” a kimondott lépésekkel, jó válasz után a maradékok is megjelennek.
   - **Labor II – Jó vagy hibás?** Egy gyerek kész írásbeli művelete; a tanuló dönt (Jó / Hibás), utána megtudja a hiba fajtáját és látja a helyes oszlopot. Pontszámláló.
5. **`WrittenOps1000ExamG3Quiz.tsx`** – `WRITTEN_OPS_1000_EXAM_G3_QUESTIONS`: 90 kérdés (30/30/30), 67 ábrával, badge mindenhol, 3 puska. `g3-wops-tudasproba-quiz`.
6. **`WrittenOps1000ExamG3Matcher.tsx`** – `WRITTEN_OPS_1000_EXAM_G3_MATCHER_LEVELS`: írásbeli műveletek oszlopképről; sorrend és hiányzó szám; szöveges feladatok. `g3-wops-tudasproba-matcher`.
7. **`WrittenOps1000ExamG3Sorter.tsx`** – `WRITTEN_OPS_1000_EXAM_G3_SORTER_LEVELS`: mekkora az eredmény (400 alatt / 400–700 / 700 fölött); hibavadász (jó / elfelejtett maradék / rossz sorrend); hogyan oldod meg (egy összeadás / egy kivonás / két lépés). `g3-wops-tudasproba-sorter`.

**Teszt:** `src/test/grade3Topic12WrittenOps1000ExamG3.test.tsx` (90 kérdés, 30/szint, számkör ≤ 1000, generátorok, tipikus hibák, párosító/csoportosító méretek és ábraszám).

## Eltérések a tankönyvtől

- **Nincs külön Megálló oldal a könyvben:** a fejezet a 121. oldallal véget ér, és rögtön jön az írásbeli szorzás. Nálunk külön, fejezetzáró tudáspróba van a négy lecke anyagából.
- **Módszer:** a könyv felváltásos kivonást mutat; nálunk a tanító döntése szerint a hagyományos **pótlásos-maradékos** módszer (egységesen a VIII. fejezettel), az 1000-ből való kivonást is négy oszlopban, kimondott lépésekkel.
- **Törtfogalom túl korán (TK 120/7. f):** „a kilencszáz fele” – a XIV. fejezet anyaga. Nálunk nincs ilyen feladat.
- **Számkör:** a TK 118/2. feladatban a hegymagasság 1000 fölé megy (1014 m). Nálunk minden szám (kérdés és válasz) legfeljebb 1000 – a teszt ezt ellenőrzi.
- **Tudatos didaktikai változtatások:** saját számok, helyzetek, szereplők; a könyv „Igazoljátok számítással!” típusú nyitott feladatai (TK 121/11.) helyett zárt kérdések egyértelmű válasszal; a hibakereső feladatok és a „Jó vagy hibás?” labor a két leggyakoribb gyerekhibára (elfelejtett maradék, fordított pótlás) épül, a csoportosító külön kategóriát ad a rossz műveleti sorrendnek; a rossz válaszok mindig tipikus hibákból készülnek.
