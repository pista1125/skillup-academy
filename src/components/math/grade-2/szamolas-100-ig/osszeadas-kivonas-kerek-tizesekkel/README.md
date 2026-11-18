# 4. Összeadás, kivonás kerek tízesekkel

## Források
- Tankönyv I. kötet (`OH-MAT02TA_I.pdf`), 54–55. o. (PDF 55–56.)
- Munkafüzet I. kötet (`OH-MAT02MA_I.pdf`), 35–36. o. (PDF 37–38.)
- Tankönyv II. kötet 16–19. o. (PDF 18–21.): „+ 10, + 20” lépések kétjegyű számokkal (pl. 44 + 10 + 4) a 60-as számkörben.

## Mit tartalmaznak a könyvoldalak?
- TK 54.: 10-es korongos képekről műveletírás (3 + 2 → 30 + 20), analóg számolás (1 + 5 → 10 + 50), hiányzó tag 100-ig, fizetés 10, 20, 50 Ft-osokkal.
- TK 55.: 100 kg-ra pótlás három tagból, háromtagú műveletsorok kerek tízesekkel, színező műveletekkel.
- MF 35–36.: tízes gyöngysorokról összeadás és kivonás (áthúzással), oszloponkénti szabálykeresés, háromtagú összegek, 100 bontása két tagra.

## A DiákZóna-lecke
- Kerek tízesek tízesrudakkal; „kistesó”-analógia (3 + 5 = 8 → 30 + 50 = 80).
- Kétjegyű szám ± kerek tízes (47 + 30, 86 − 50): csak a tízesek változnak, az egyesek maradnak.
- Tízes ugrások a 0–100-as számegyenesen, hiányzó szám, 100 bontása, pénz (10, 20, 50 Ft), két lépéses műveletsor.
- 2 labor: **Tízesrudak** (rudak hozzáadása/áthúzása, majd eredmény választása, hibára célzott visszajelzés) és **Fizess kerek tízesekkel!** (érmék a tálcára, „még ennyi hiányzik / ennyivel több”).

## Komponensek
- `RoundTens100G2Parts.tsx` – közös SVG-elemek (`RodsPart`, `NumLine100Part`, `CoinPart`, `ArrowChainPart`, `PyramidPart`, `QFig`) és a laborok (`RodsLab`, `CoinsLab`, `makeRodTask`)
- `RoundTens100G2Figures.tsx` – `RoundTensStairsSvg`, `SmallBigAnalogySvg`, `KeepOnesAddSvg`, `TakeTensSvg`, `TensJumpLineSvg`, `HundredSplitCoinsSvg`
- `RoundTens100G2CardFigures.tsx` – kártyaképek (`RodsCard150`, `RodsCard80`, `JumpCard`, `CoinsCard`, `HundredSplitCard`, `ChainCard`)
- `RoundTens100G2Theory.tsx`, `RoundTens100G2Quiz.tsx` (`g2-c100-kerek-quiz`), `RoundTens100G2Matcher.tsx` (`g2-c100-kerek-matcher`), `RoundTens100G2Sorter.tsx` (`g2-c100-kerek-sorter`)
- Teszt: `src/test/grade2Topic3RoundTens100G2.test.tsx`

## Eltérések a tankönyvtől
- **Kétjegyű ± kerek tízes is bekerült.** A TK/MF I. kötet 54–55./35–36. oldala csak kerek tízes ± kerek tízes műveleteket tartalmaz; a kétjegyű szám ± kerek tízes (47 + 30, 86 − 50) a II. kötet 60-as/100-as számkörében, „+ 10, + 20” lépésként jelenik meg. A DiákZóna ezt a két típust egy leckében, egymásra építve tanítja.
- **Saját modell:** a könyv 10-es korongjai és gyöngysorai helyett tízesrúd + egyeskocka modellt használunk (a kockák látványosan „nem változnak”), és a számegyenesen tízes ugrásokat.
- **A szorzás kimarad.** A TK 55. oldal környezetében és a II. kötetben a fejezetet szorzótábla-oldalak szakítják meg; a III. témakörben csak + és − szerepel.
- **Egyértelmű utasítás.** A TK 55/2.b („Mit tapasztaltatok? Keressetek összefüggéseket!”) nyitott, ellenőrizhetetlen kérdését konkrét, egy választ adó kérdésekre bontottuk (pl. sorozat folytatása, legnagyobb kiválasztása).
- **Saját feladatok és számok** (pl. labda 70 Ft, gyöngyfűzés 40 + 30), saját szereplők; a fizetős feladat élő laborrá vált, amely azonnal jelzi a hiányt vagy a többletet.
