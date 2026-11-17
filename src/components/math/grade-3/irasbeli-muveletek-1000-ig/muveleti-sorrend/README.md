# 3. A műveletek sorrendje és a zárójelek (3. osztály, XII. Írásbeli műveletek 1000-ig)

## Források
- Tankönyv: OH-MAT03TA, 120–121. oldal (képek helyettesítése műveletsorokba, zárójeles műveletsorok, „Melyik számra gondoltam?”).
- Munkafüzet: OH-MAT03MA_II, 46–47. oldal.

## Mi van a könyvben?
- Összeadásból és kivonásból álló műveletsorok 1000-ig, zárójellel és anélkül (TK 120/8.: a képek helyére számokat írunk, pl. „+ ( – )”).
- Kétlépéses „Melyik számra gondoltam?” feladatok, ahol a sorrend a szövegből derül ki.

## Mit csinál a DiákZóna-lecke?
- A sorrend három szabálya egyszerű mondatokban: 1. zárójel, 2. szorzás és osztás, 3. összeadás és kivonás balról jobbra. Saját mintapéldák lépésenként, pl. 645 − 280 + 136, 850 − 30 · 9, 1000 − (385 + 240) vásárlásnál.
- „Ügyes számolás zárójellel”: kerek számot keresünk (367 + 148 + 52), figyelmeztetés, hogy kivonásnál nem szabad tetszés szerint csoportosítani.
- „Vigyázz!” doboz: 850 − 30 · 9 (nem balról jobbra!) és 700 − (250 − 100).
- **Labor I – Melyiket számolod először?** Véletlen műveletsor. A gyerek a következő műveletre koppint, a műveletsor lépésenként rövidül. Ha rossz műveletre koppint, célzott tippet kap. Van „Új feladat” gomb.
- **Labor II – Hová tegyük a zárójelet?** Ugyanaz a műveletsor háromféle írásmódban szerepel (zárójel nélkül, illetve kétféle zárójelezéssel). A gyerek azt választja ki, melyiknél lesz az eredmény a megadott szám. Azonnali visszajelzést kap, és van „Új feladat” gomb.
- Kvíz: 30 kérdés (10/10/10), a legtöbbjükhöz tartozik ábra (műveletsor buborékokkal, lánc, pénztárca, csoportok). Párosító: „csak + és −”, „szorzás és osztás előbb”, „zárójel”. Csoportosító: „mi az első lépés”, „mennyi az eredmény”, „mit tesz a zárójel”.

## Komponensek
- `OrderOps1000G3Figures.tsx`: `OrderOps1000RuleSvg`, `OrderOps1000ChainSvg`, `OrderOps1000BracketFirstSvg`, `OrderOps1000BracketCompareSvg`, `OrderOps1000ShopSvg`
- `OrderOps1000G3CardFigures.tsx`: `ChainCard`, `StackCard`, `SmallChain`, `SmallWallet`, `SmallBag`
- `OrderOps1000G3Parts.tsx`: műveletsor-elemző (`parse`, `steps`, `nextIdx`, `genExpr`, `genBracketTask`) és kvízábrák (`ExprFig`, `ChainFig`, `WalletFig`, `GroupsFig`, `NoteFig`)
- `OrderOps1000G3Theory.tsx`, `OrderOps1000G3Quiz.tsx`, `OrderOps1000G3Matcher.tsx` (`ORDER_OPS_1000_G3_MATCHER_LEVELS`), `OrderOps1000G3Sorter.tsx`
- Azonosítók: kvíz `g3-wops-sorrend-quiz`, párosító `g3-wops-sorrend-matcher`, csoportosító `g3-wops-sorrend-sorter`.

## Teszt
`src/test/grade3Topic12OrderOps1000G3.test.tsx`

## Eltérések a tankönyvtől
- **Didaktikai bővítés:** ezeken az oldalakon a könyv csak összeadást és kivonást ad zárójellel. Mi visszahozzuk a „szorzás és osztás előbb” szabályt is (az I. témakörben 100-ig már tanulták), kerek tízesekkel 1000-ig, mert a vegyes műveletsoroknál ez a leggyakoribb hiba.
- **Didaktikai változtatás:** a könyv képek helyére íratja be a számokat. A DiákZóna lépkedő laborjában a gyerek maga választja ki, melyik műveletet végzi el először, és azonnal látja, ha rossz sorrendet választott.
- A könyv képes feladatai helyett saját számokat és helyzeteket használunk (vásárlás 1000 Ft-ból, csomagok, lánc-műveletek).
- *Megjegyzés:* az eredeti ágens-riport egy API-hiba miatt elveszett. Ezt a README-t a kész lecke és a tankönyvoldalak alapján írtam újra.
