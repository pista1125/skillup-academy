# 1. Válogatás tulajdonságok szerint (3. osztály, VI. Válogatások, csoportosítások)

**Források:** tankönyv OH-MAT03TA 68–69. és 72–73. oldal (a 70. oldal logikai lapos feladatai – 9–11. – is ide tartoznak); munkafüzet OH-MAT03MA I/77–78. oldal (2., 3. feladat). A halmazábrás feladatokat (TK 70/8, 71/13, 73/19c, MF I/77/1, 78/4–6, 79–80) a 2. lecke dolgozza fel, az igaz/hamis állításokat és a sorba rendezést a 3. lecke.

## Mit tartalmaznak a könyv oldalai?

- **TK 68/1–4.:** tornaórai csoportok karikákban; csoportalkotás szempontok szerint (fiúk – lányok, szőkék – nem szőkék, évszak); magasság szerint „135 cm-nél alacsonyabbak / nem alacsonyabbak”; nevek gyűjtése tulajdonság szerint.
- **TK 69/5.:** a kicsi logikai lapok válogatási fája (lyukas? → forma → szín), hiányzó lapok pótlása. **69/6.:** 8 lap szétválogatása „piros / nem piros” szerint. **69/7.:** logikai lapos „szudoku”.
- **TK 70/9–11.:** igaz-hamis állítások egy képről; barkochba; jelekkel megadott lap kitalálása.
- **TK 71/12.:** járművek válogatási fája (szárazföldi? van kereke? hány kereke?).
- **TK 72/15–18.:** versenylovak adatlapja (több feltétel egyszerre), „Melyik nem illik a sorba?”, hiányzó lovacska, számok kiválogatása („csak háromjegyű / páratlan / 150-nél kisebb maradhat”).
- **TK 73/19–20.:** címke keresése számcsoporthoz („150 < □ < 200”), gombos doboz rekeszeinek felirata, kakukktojás gombokkal.
- **MF I/77/2–3.:** melyik lapot kell elvenni, hogy igaz legyen az állítás; állítások egy számhalmazról.

## Mit csinál a DiákZóna lecke?

A logikai lapok négy tulajdonsága (szín: piros, sárga, kék, zöld; forma: kör, háromszög, négyzet; méret: nagy, kicsi; lyukas / nem lyukas – összesen 48 lap, nincs két egyforma). Válogatás egy tulajdonság szerint (címke, „nem piros”), két tulajdonság szerint („és”: mindkettő igaz legyen), számok válogatása 500-ig (páros, páratlan, kétjegyű, háromjegyű, kerek tízes, „300-nál kisebb / nem kisebb”), a címke kitalálása, kakukktojás indoklással (több jó megoldás is lehet), válogatási fa, barkochba. Saját példák (gombok, csokik, számkártyák); a könyv szereplőit és lovait nem vettük át.

## Komponensek

1. **`SortingByPropertyG3Parts.tsx`** – a fejezet közös rajzai: `LogicBlock` (a 48 lapos készlet egységes rajza, `ALL_BLOCKS`, `blockName`), `SewButton` (varrógomb: kerek / négyzet / hatszög, 2 vagy 4 lyuk), `NumCard`, `LabelBox` (címkés doboz, többsoros címke is).
2. **`SortingByPropertyG3Figures.tsx`** – `LogicSetSvg`, `OnePropertySortSvg`, `TwoPropertiesSvg`, `OddOneOutSvg`, `SortingTreeSvg`, `NumberLabelsSvg`.
3. **`SortingByPropertyG3CardFigures.tsx`** – kártyaábrák: `BlockCard`, `BlockGroupCard`, `BlockRowCard`, `ButtonCard`, `NumberRowCard`.
4. **`SortingByPropertyG3Theory.tsx`** – Mit tanulunk?, a logikai lapok, egy és két tulajdonság, számok válogatása, kakukktojás, válogatási fa, 3 mintapélda (címke, kakukktojás, barkochba), „Vigyázz!” („kicsi és piros”: mindkettő kell; a határszám: 250 nem kisebb 250-nél).
   - **Labor I – Válogass a címke szerint!** 8 véletlen lap és egy véletlen címke (pl. „nem zöld lapok”, „kicsi és kék lapok”, „lyukas négyzetek”). A gyerek kijelöli a lapokat, „Ellenőrzés”: a rossz lapnál megmondja, melyik tulajdonság nem stimmel („Ez a lap nem kék, hanem sárga.”), a hiányzókat szaggatott keret jelzi. „Új feladat”.
   - **Labor II – Barkochba.** A gép gondol egy lapra a 48-ból; a gyerek gombokkal kérdez (Piros? … Kör? … Nagy? Lyukas?), a kizárt lapok elhalványulnak, látszik, hány lap jöhet még szóba; tippelni a lapra koppintva lehet. „Új feladat”.
5. **`SortingByPropertyG3Quiz.tsx`** – `SORTING_BY_PROPERTY_G3_QUESTIONS`: 30 kérdés (10/10/10), 26 kérdésnél ábra, minden kérdésnél badge, 3 puska. Azonosító: `g3-grp-tulajdonsagok-quiz`.
6. **`SortingByPropertyG3Matcher.tsx`** – `SORTING_BY_PROPERTY_G3_MATCHER_LEVELS`: lap képe ↔ leírása (8/8 kép); csoport ↔ címke (4 lapcsoport-kép + 4 számcsoport); kakukktojás-sor ↔ „A 3., mert nem kör.” (8/8 kép). `g3-grp-tulajdonsagok-matcher`.
7. **`SortingByPropertyG3Sorter.tsx`** – `SORTING_BY_PROPERTY_G3_SORTER_LEVELS`: körök / háromszögek / négyzetek; nagy és lyukas / nagy, nem lyukas / kicsi; gombok: kerek kétlyukú / kerek négylyukú / nem kerek. Kategóriánként 5 képes elem. `g3-grp-tulajdonsagok-sorter`.

**Teszt:** `src/test/grade3Topic6SortingByPropertyG3.test.tsx`

## Eltérések a tankönyvtől

- **A logikai készlet pontosan a könyvé:** 4 szín × 3 forma × 2 méret × lyukas / nem lyukas = 48 lap (TK 69/5 fája, 70/11 jelei, MF I/79/9). A mappa korábbi README-je téglalapot és „vastag / vékony” tulajdonságot is írt – ilyen a könyv készletében nincs, nálunk sincs.
- **Kétféle szó ugyanarra:** a tankönyv „nem lyukas”-t ír (TK 70/11), a munkafüzet „sima”-t (MF I/79/9). Mi végig a „lyukas / nem lyukas” párt használjuk.
- **Kétértelmű címke (TK 70/8):** „Pirosak és kicsik” – jelentheti a piros ÉS kicsi lapokat, de a pirosakat meg a kicsiket is. Nálunk a két tulajdonságú címke mindig egyértelmű („kicsi és piros lapok” = mindkettő igaz), és ezt külön el is magyarázzuk.
- **A határszám nincs tisztázva (TK 72/18c, 73/19):** a „150-nél kisebb” és a „150 < □ < 200” címke mellett a 150 egyik csoportba sem kerül, de a könyv ezt nem mondja ki. Nálunk a „Vigyázz!” doboz és egy kvízkérdés kifejezetten erről szól: a 250 a „nem kisebb 250-nél” csoportba tartozik (a TK 68/3 „nem alacsonyabbak” mintájára).
- **Üres és bizonytalan ág a válogatási fában (TK 71/12):** a szárazföldi, kerék nélküli ágra a felsorolt járművek közül egy sem kerül, a roller pedig lehet két- vagy háromkerekű. A mi fáinkban minden ágon van elem, és minden tulajdonság egyértelmű.
- **Magyarázat nélküli jel (TK 69/5):** a fa első elágazásán a lyukas / nem lyukas szürke folt-jel csak a következő oldalon (70/11) kap magyarázatot. Nálunk az ágakon szöveg áll.
- **Színek (TK 70/9):** a kép „kék” lapjai világoskékek (cián), más oldalakon sötétkékek. Mi egyetlen, rögzített színkészlettel rajzolunk.
- **Nehezen érthető állítás (MF I/77/3):** „Van olyan szám, amelyben benne van a legkisebb alaki értékű számjegy” – a 0-ra gondol, de egy 3. osztályosnak nehéz kibogozni. Ilyen megfogalmazást nem használunk.
- **Tudatos didaktikai változtatások:**
  - Egyetlen lap képéről nem látszik, kicsi-e vagy nagy. A kvízben ezért a kérdezett lap mellett mindig van egy másik méretű lap, a laborban és a kártyákon minden lap ugyanakkora léptékben szerepel.
  - A barkochbát a gép „játssza”: a kizárt lapok elhalványulnak, így a gyerek látja, melyik kérdés zár ki sok lapot (a papíron ez nem látszik).
  - A címke szerinti válogatásnál a hibás lapra konkrét indoklás jön („Ez a lap nem kék, hanem sárga.”).
  - A kakukktojásnál kimondjuk, hogy több jó megoldás lehet; a kvízben ilyenkor az indoklást kell kiválasztani.
  - Saját kontextusok: varrógombok, csokik árcédulával (a versenylovas adatlap helyett), számkártyák 500-ig.
