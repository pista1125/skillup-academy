# 8. Szorzás 9-cel

## Források
- *Matematika 2. osztályosoknak II. kötet* (`OH-MAT02TA_II.pdf`), 76–79. o. (Szorzás, osztás 9-cel; A 3-as, 6-os, 9-es szorzótáblák kapcsolata)
- *Matematika munkafüzet 2. osztályosoknak II. kötet* (`OH-MAT02MA_II.pdf`), 48–49. o. (az 50. oldal az osztást gyakorolja)

## Mit tartalmaznak az oldalak?
- **TK 76.** Kilencesével számolás (9, 18, 27 …), a számjegyek összege; 9 fős futócsapatok (2, 4, 6 csapat); 18 versenyző 9 személyes kisbuszokban (bennfoglalás).
- **TK 77.** A 9-es szorzó- és bennfoglaló tábla tekebábukkal (ismételt összeadás → `n · 9` → `n·9 : 9`), a szorzatok számjegyösszege; művelet–eredmény párosítás.
- **TK 78.** Hiányzó tényezők és osztandók vegyesen (`6 · □ = 54`, `9 = □ : 4`), szorzótábla-rács (3, 6, 9 × 9, 6, 3) páros/páratlan szorzatokkal, „focilabda útja”: mindig a 9-cel nagyobb eredmény felé (benne `5 · 2 · 9`, `56 : 7`, `8 · 8`).
- **TK 79.** A 3-as, 6-os, 9-es tábla kapcsolata: szorzótáblázat 1–10-ig, egyenlő szorzatok karikázása (`4 · 3 = 2 · 6`), szorzás- és osztásláncok (`4 ·2→ □ ·3→ □`, összevont `· □`), a 3, 6, 9 többszörösei és közös többszöröseik.
- **MF 48–49.** Minden 9. zászló kiszínezése 1–90-ig, összeadás és szorzás képről (kosárlabdák, súlyzók), rajz–művelet párosítás, „kilencszer olyan messzire” táblázat, egyenlő eredmények színezése.

## A DiákZóna lecke
- **Tananyag:** kilences csoportok (karkötő gyöngyökkel), ismételt összeadás → szorzás, a 9-es tábla pontráccsal és táblázattal, számjegy-mintázat (a tízes nő, az egyes csökken, a jegyek összege 9), **tízes trükk** (`7 · 9 = 70 − 7`), **ujjtrükk**, **a 3-as, 6-os, 9-es tábla kapcsolata** (egy 9-es ugrás = három 3-as ugrás; az egyforma szorzatok színezett táblázata: `3 · 6 = 2 · 9`, `6 · 6 = 4 · 9`), felcserélhetőség, 3 mintapélda, „Vigyázz!” (`7 · 9 ≠ 69`, `9 · 9 ≠ 18`).
- **Labor I – Kilences dobozok:** a gyerek dobozonként (3 × 3 golyó) rakja ki a szorzást, majd kiválasztja a szorzatot; célzott hibaüzenet, „Új feladat”.
- **Labor II – Tízes trükk:** két lépés: `n · 10`, majd `n · 10 − n`; a második lépésben a pontrács utolsó oszlopa áthúzódik. Külön visszajelzés a „csak 1-et vettem el” (`70 − 1`) és a „10-et vettem el” hibára.
- **Kvíz:** 30 kérdés (10/szint), 21 kérdés ábrával; csak `+ − ·` műveletek, minden szám ≤ 90.
- **Párosító:** 3 × 8 pár (szorzatok; szorzás ↔ ábra / összeadás / tízes trükk; hiányzó szám). **Csoportosító:** 3 × 9 elem (szorzat 18/36/54 — a 3-as, 6-os, 9-es tábla egyenlő szorzataival; „9-es / csak 3-as / egyik sem” tábla hármas-oszlopos ábrákkal; 45-höz viszonyítás).

## Fájlok és teszt
- `Mult9G2Parts.tsx` — közös SVG-elemek (`NineBoxPart`, `JumpLinePart`, `DotArrayPart`) és a két labor (`GroupsLab`, `TenTrickLab`)
- `Mult9G2Figures.tsx` — `BeadStringsSvg`, `NineTableArraySvg`, `TenMinusOneSvg`, `FingerTrickSvg`, `ThreeSixNineTableSvg`, `ThreeNineJumpsSvg`
- `Mult9G2CardFigures.tsx` — kártyaképek (`GroupsCard`, `RowsCard`, `JumpsCard`, `TenMinusCard150`, `HowManyBoxesCard150`, `TriplesCard80`)
- `Mult9G2Theory.tsx`, `Mult9G2Quiz.tsx` (`g2-szorzas-9-quiz`), `Mult9G2Matcher.tsx` (`g2-szorzas-9-matcher`), `Mult9G2Sorter.tsx` (`g2-szorzas-9-sorter`)
- Teszt: `src/test/grade2Topic4Mult9G2.test.tsx`

## Eltérések a tankönyvtől
- **Szétválasztott szorzás és osztás:** a TK 76–78. oldala és a TK 79/2. láncai együtt tanítják a 9-cel való szorzást és osztást (bennfoglaló tábla, `45 : □ = 5`, `: 3` nyilak). Ebben a leckében csak `+ − ·` szerepel; az osztás a „8. Osztás 9-cel” leckébe került.
- **Nincs három tényező és idegen tábla a 9-es feladatokban:** a TK 78/3. „labdaútja” `5 · 2 · 9`-et (háromtényezős szorzat, amit a könyv nem tanít) és `56 : 7`, `8 · 8` csalikat tartalmaz. A DiákZóna feladataiban legfeljebb egy szorzás + egy összeadás/kivonás van.
- **A 3-as tábla kapcsolata a 9-essel tábla-határon belül:** a „szorozz 3-mal, aztán még egyszer 3-mal” út általában túllépne a szorzótáblán (pl. `7 · 3 = 21`, `21 · 3`), ezért a kapcsolatot ugrásokkal (1 kilences ugrás = 3 hármas ugrás) és az egyenlő szorzatok táblázatával mutatjuk be, ahogy a TK 79/1.
- **„Többszörös” a táblán belül:** a csoportosítóban „A 3-as táblában van” kategóriát használunk (≤ 30), nem „a 3 többszöröse” megnevezést, mert pl. a 36 a 3 többszöröse, de nincs benne a 3-as szorzótáblában — a könyv a 79/3. feladatban (36, 42, 45, 54) ezt nem különíti el.
- **Életszerűbb számok:** az MF 49/2. táblázatában Ádám 10 m-re löki a súlygolyót és Zoli 90 m-re dobja a kislabdát — 2. osztályosoknál ez nem életszerű. A DiákZóna „kilencszer annyi” feladata matricákkal dolgozik.
- **DiákZóna-kiegészítések:** a tízes trükk (`n · 10 − n`) és az ujjtrükk nincs a könyvben; mindkettő csak ismert műveletet használ (10-es tábla, kivonás 100-ig). A számjegyösszeg-mintázatot (TK 76/1. b, 77/1. c) „próbaként” használjuk.
- **Saját tartalom:** saját szereplők és helyzetek (karkötő gyöngyökkel, bonbonos és krétás doboz, székek a teremben, kisvonat, szöcske és béka a számegyenesen); a könyv sportos (futóverseny, Ultrabalaton, tekepálya) feladatait nem vettük át.
