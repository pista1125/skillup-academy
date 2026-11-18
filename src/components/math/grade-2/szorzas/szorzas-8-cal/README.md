# 7. Szorzás 8-cal

## Források
- *Matematika 2. osztályosoknak II. kötet* (`OH-MAT02TA_II.pdf`), 61–64. o. (Szorzás, osztás 8-cal), 65–66. o. (A 2-es, a 4-es és a 8-as szorzótábla kapcsolata), 67. o. (Szöveges feladatok – Egerek és macskák)
- *Matematika munkafüzet 2. osztályosoknak II. kötet* (`OH-MAT02MA_II.pdf`), 40–42. o. (a 39. oldal vegyes számolás, nem a 8-as tábla)

## Mit tartalmaznak az oldalak?
- **TK 61.** Gyöngysor 1–80: minden nyolcadik gyöngy színezése, a 8 többszörösei, utolsó számjegyek; sorozat 80, 72, 64 …; 64 sajtdarab nyolcasával csoportosítva.
- **TK 62–63.** Sajtgyári dobozok (8 cikk): ismételt összeadás → `n · 8`, mellette a bennfoglaló tábla; piramis a szorzatokból; vegyes szorzások/osztások; „körcikk” szabálysorozatok (2-es, 4-es, 8-as); dobozok száma naponta.
- **TK 64.** Táblázat szabállyal (doboz → cikk), nyitott mondatok (`6 · 8 < ● < 9 · 8`), „nyolcszorosa / nyolcada” nyilak.
- **TK 65–66.** A 2-es, 4-es, 8-as tábla kapcsolata: nyílláncok (`· 2`, `· 4` ↔ `· 8`), „fele, nyolcada, nyolcszorosa, negyede”; tejeskancsók (8 dl) 2 dl-es poharakba; gyümölcssaláta 1, 4, 8 tálra; mérleg színes rudakkal (piros, rózsaszín, bordó).
- **TK 67.** Egerek és macskák szöveges feladatai (tej egy hétre, „4-szer ennyi”, „nyolcadannyi”, sajtevő verseny órával, 80 m-es út).
- **MF 40–42.** Minden nyolcadik sajt, sorozatok, `<, >, =` összehasonlítás, a 8 többszöröseinek színezése, kisegerek táblázata, egyenlő értékek színezése, nyitott mondatok.

## A DiákZóna lecke
- **Tananyag:** nyolcas csoportok (pókok lábai), ismételt összeadás → szorzás, a 8-as tábla pontráccsal és táblázattal, nyolcas ugrások a 0–80-as számegyenesen (utolsó jegyek 8, 6, 4, 2, 0), **a 2-es, 4-es és 8-as tábla kapcsolata** (duplázd háromszor; táblázat; színes rudak: 1 bordó = 2 rózsaszín = 4 piros), trükk `9 · 8 = 80 − 8`, `6 · 8 = 40 + 8`, felcserélhetőség, 3 mintapélda, „Vigyázz!” (`8 · 8 ≠ 16`, `0 · 8 = 0`).
- **Labor I – Nyolcas dobozok:** a gyerek dobozonként rakja ki a szorzást (+1 / −1 doboz), majd kiválasztja a szorzatot; célzott hibaüzenet, „Új feladat”.
- **Labor II – Duplázz háromszor!:** három lépés: `n · 2`, `n · 4 = n · 2 + n · 2`, `n · 8 = n · 4 + n · 4`; a pontrács lépésenként 2 → 4 → 8 oszlopra bővül. Hibaüzenet, ha a gyerek duplázás helyett 2-t ad hozzá.
- **Kvíz:** 30 kérdés (10/szint), 22 kérdés ábrával; csak `+ − ·` műveletek, minden szám ≤ 80; pénz csak Ft.
- **Párosító:** 3 × 8 pár (szorzatok; szorzás ↔ ábra / összeadás / duplázás; hiányzó szám). **Csoportosító:** 3 × 9 elem (szorzat; „8-as / csak 4-es / egyik sem” tábla; 40-hez viszonyítás).

## Fájlok és teszt
- `Mult8G2Parts.tsx` — közös SVG-elemek (`EightBoxPart`, `SpiderPart`, `OctopusPart`, `JumpLinePart`, `DotArrayPart`, `RodPart`) és a két labor (`GroupsLab`, `DoubleLab`)
- `Mult8G2Figures.tsx` — `SpiderGroupsSvg`, `EightTableArraySvg`, `EightJumpsLineSvg`, `DoubleChainSvg`, `RodsSvg`, `CommuteArraySvg`
- `Mult8G2CardFigures.tsx` — kártyaképek (`GroupsCard`, `RowsCard`, `JumpsCard`, `DoubleCard150`, `HowManyBoxesCard150`, `FoursCard80`)
- `Mult8G2Theory.tsx`, `Mult8G2Quiz.tsx` (`g2-szorzas-8-quiz`), `Mult8G2Matcher.tsx` (`g2-szorzas-8-matcher`), `Mult8G2Sorter.tsx` (`g2-szorzas-8-sorter`)
- Teszt: `src/test/grade2Topic4Mult8G2.test.tsx`

## Eltérések a tankönyvtől
- **Szétválasztott szorzás és osztás:** a TK 61–66. oldala együtt tanítja a 8-cal való szorzást és osztást (`:`, „nyolcada”, „negyede”, „fele”). Ebben a leckében csak `+ − ·` szerepel; az osztás a „7. Osztás 8-cal” leckébe került. A TK 65/1–2. nyílláncaiból csak a szorzó irányt (duplázás) vettük át.
- **Félrevezető ábra (TK 66/2.):** a mérleges feladatnál a piros rúd hosszabbnak van rajzolva, mint a rózsaszín, holott a piros 2, a rózsaszín 4 egység (a bordó 8). A DiákZóna rúd-ábráján a hosszak arányosak: 1 bordó = 2 rózsaszín = 4 piros.
- **Elírás (TK 66/1.):** „szeretnénekkészíteni” (hiányzó szóköz). A feladatot nem vettük át.
- **Nehéz szöveges feladatok (TK 67.):** a 4. feladat (8 órától 9 óra 4 percig, `64 : 8`) óra–perc átváltást és osztást kér, a 6. feladat (egymással szembe haladó egerek, 80 m, `80 : 16`) a 8-as táblán túli osztást és nem egyértelmű irányt („egyenes vonalban haladnak” – nem mondja, hogy egymás felé). A 3. feladat „nyolcadannyi” szóhasználata visszafelé gondolkodást kíván. Ezeket nem vettük át; helyettük rövid, legfeljebb kétlépéses saját feladatok vannak (egy hét = 7 nap, „8-szor annyi”, „4-szer annyi … összesen”, vásárlás 50 Ft-ból).
- **Saját tartalom:** saját szereplők és kontextusok (pókok, polipok, golyós dobozok, zsírkréta, ceruza és radír Ft-os áron, könyvespolc, matricák); a könyv egér–sajt történeteit nem vettük át. A papíron statikus csoportosítást és duplázást két interaktív labor teszi kipróbálhatóvá.
