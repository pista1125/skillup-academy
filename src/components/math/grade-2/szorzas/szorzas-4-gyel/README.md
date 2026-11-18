# 3. Szorzás 4-gyel

## Források
- *Matematika 2. osztályosoknak I. kötet* (`OH-MAT02TA_I.pdf`), 99–104. o. (Számok többszörösei; Szorzás, osztás 4-gyel; A 2-es és 4-es szorzótábla kapcsolata)
- *Matematika munkafüzet 2. osztályosoknak I. kötet* (`OH-MAT02MA_I.pdf`), 64–65., 67. o.

## Mit tartalmaznak az oldalak?
- **TK 99.** Béka (2), nyúl (3) és kenguru (4) ugrásai a 0–40-es számegyenesen; a 2, 3, 4 többszörösei; falevelek színezése (4 és 3 többszörösei).
- **TK 100–103.** Pálcikás alakzatok (4 pálcika), csoportosítás négyesével; a 4-es tábla ismételt összeadással (kecskegidák lábai); képhez illő műveletsorok; „négyszerese / negyede” nyilak; hiányzó tényezők; betűrejtvény; szabálysorozatok (+1, · 4); szénakötegek 6 napra; számegyenes-állítások (`7 · 4 < ●`). A könyv itt a szorzást és az osztást együtt tanítja.
- **TK 104.** A 2-es és a 4-es tábla kapcsolata: egyenlő szorzatok színezése (`8 · 2 = 4 · 4`), pingvin- és jegesmedvelábak táblázata, kétpúpú tevék (púpok és lábak), béka és kenguru közös érintési pontjai.
- **MF 64–65., 67.** Szorzatok, kutya–ól párosítás, hiányzó tényező, halmazábra (3 és 4 többszörösei), „4-szer annyi” szöveges feladatok, számkeresztrejtvény.

## A DiákZóna lecke
- **Tananyag:** négyes csoportok (lóhere), ismételt összeadás → szorzás, a 4-es tábla pontráccsal és táblázattal (az utolsó jegyek mintázata), a kenguru és a béka ugrásai (a 4 többszörösei), a **2-es és 4-es tábla kapcsolata** („szorozz 2-vel, és duplázd meg”), felcserélhetőség (`3 · 4 = 4 · 3`), 3 mintapélda, „Vigyázz!” (`4 · 4 ≠ 8`, `0 · 4 = 0`).
- **Labor I – Négyes dobozok:** a gyerek dobozonként rakja ki a szorzást (+1 / −1 doboz), majd kiválasztja a szorzatot; célzott hibaüzenet (egy dobozzal elszámolta stb.), „Új feladat”.
- **Labor II – Szorozz 2-vel, és duplázd meg!:** két lépés: `n · 2`, majd `n · 2 + n · 2`; a pontrács a második lépésben kétszínűre bővül (2 + 2 oszlop).
- **Kvíz:** 30 kérdés (10/szint), 23 kérdés ábrával; csak `+ − ·` műveletek, minden szám ≤ 40.
- **Párosító:** 3 × 8 pár (szorzatok, szorzás ↔ ábra / ismételt összeadás, hiányzó szám). **Csoportosító:** 3 × 9 elem (szorzat; „4-es / csak 2-es / egyik sem” tábla; 20-hoz viszonyítás).

## Fájlok és teszt
- `Mult4G2Parts.tsx` — közös SVG-elemek (`FourBoxPart`, `JumpLinePart`, `DotArrayPart`) és a két labor (`GroupsLab`, `DoubleLab`)
- `Mult4G2Figures.tsx` — `CloverGroupsSvg`, `FourTableArraySvg`, `KangarooFrogLineSvg`, `DoubleDoubleSvg`, `CommuteArraySvg`
- `Mult4G2CardFigures.tsx` — kártyaképek (`GroupsCard`, `ColumnsCard`, `JumpsCard`, `DoubleCard150`, `HowManyBoxesCard150`, `PairsCard80`)
- `Mult4G2Theory.tsx`, `Mult4G2Quiz.tsx` (`g2-szorzas-4-quiz`), `Mult4G2Matcher.tsx` (`g2-szorzas-4-matcher`), `Mult4G2Sorter.tsx` (`g2-szorzas-4-sorter`)
- Teszt: `src/test/grade2Topic4Mult4G2.test.tsx`

## Eltérések a tankönyvtől
- **Szétválasztott szorzás és osztás:** a TK 100–103. oldala együtt tanítja a 4-gyel való szorzást és osztást (`:` jel, „negyede”). Ebben a leckében csak `+ − ·` szerepel; az osztás a „3. Osztás 4-gyel” leckébe került.
- **Számkör ≤ 40:** a TK 99/2. (falevél) és az MF 65/1. (halmazábra) feladatában a **44** is szerepel a 4 többszörösei között, pedig a 4-es tábla 40-ig tart. A DiákZóna feladatai 40-nél megállnak.
- **Rövidebb szöveges feladatok:** az MF 65/3. feladata (36 látogató, felnőttek, „háromszor annyi” kisfiú, a maradék kislány) három lépéses; 2. osztályban legfeljebb kétlépéses, nagyon rövid feladatokat adunk.
- **Egyértelmű kategóriák:** a csoportosítóban „Sem a 2-es, sem a 4-es táblában” szerepel „egyik sem” helyett, mert pl. a 15 és a 21 a 3-as/5-ös táblában benne van.
- **Saját tartalom:** saját szereplők és kontextusok (lóhere, muffinos doboz, kutya és tyúk, autók kereke, matricák); a könyv állatkerti feladatait nem vettük át. A papíron statikus csoportosítást és duplázást két interaktív labor teszi kipróbálhatóvá.
