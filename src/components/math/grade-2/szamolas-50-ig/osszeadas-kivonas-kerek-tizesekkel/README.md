# 4. Összeadás, kivonás kerek tízesekkel (2. osztály, II. témakör)

## Források
- **Tankönyv I. kötet** (`OH-MAT02TA_I.pdf`): 54–55. o. – *Összeadás, kivonás kerek tízesekkel*.
- **Munkafüzet I. kötet** (`OH-MAT02MA_I.pdf`): 35–36. o.

## Mit tartalmaznak a tankönyvi oldalak?
- **TK 54. o.:** korongos képek alapján „kistesó–nagytesó” műveletek (3 + 2 → 30 + 20, 5 − 2 → 50 − 20); egyjegyű és kerek tízes műveletek párban (1 + 5 / 10 + 50); hiányzó tag kerek tízesekkel; gyümölcsárak kifizetése 10, 20, 50 Ft-osokkal többféleképpen.
- **TK 55. o.:** teherautó ládái (3 láda összesen 100 kg); háromtagú műveletsorok (80 − 50 − 20, 30 + 30 + 30); színező kerek tízes műveletekkel.
- **MF 35–36. o.:** tízes gyöngysorok képéről összeadás/kivonás, oszloponkénti szabályfelismerés, háromtagú összegek, kivonás áthúzott gyöngysorokkal, a 100 bontása.

## Mit csinál a DiákZóna lecke?
- Saját ábrák és feladatok, **szigorúan 0–50 között**, csak + és −.
- Tananyag: kerek tízesek tízesrudakkal; kistesó–nagytesó analógia; elvétel áthúzott rudakkal + ellenőrzés összeadással; **kétjegyű szám ± kerek tízes** (csak a tízes változik, T–E táblázat és tízes ugrások a számegyenesen); 40 Ft kifizetése háromféleképpen; mintapéldák; „Vigyázz!” (24 + 20 ≠ 26, ne felejtsd a 0-t).
- **Labor I – Tízesrudak:** véletlen feladat (kerek tízes ± kerek tízes vagy kétjegyű ± kerek tízes); a gyerek kék rudakat tesz hozzá vagy rudakat húz át, majd kiválasztja az eredményt; a hibaüzenet megnevezi a tipikus hibát (az egyesekhez adta a tízeseket).
- **Labor II – Kisbolt:** egy 20–50 Ft-os árut 10, 20, 50 Ft-os érmékkel kell pontosan kifizetni, a különböző megoldásokat gyűjti („Keress másikat is!”).

## Fájlok
- `RoundTens50G2Parts.tsx` – közös SVG-elemek (`RodsPart`, `NumLine50Part`, `CoinPart`) és laborgenerátorok (`makeRodTask`, `makeShopTask`)
- `RoundTens50G2Figures.tsx` – `RoundTensStairsSvg`, `SmallBigAnalogySvg`, `TakeAwayRodsSvg`, `OnlyTensChangeSvg`, `TensJumpsLineSvg`, `PayFortySvg`
- `RoundTens50G2CardFigures.tsx` – kártyaképek (`CubesCard150`, `RodsCard`, `CoinsCard`, `JumpTensCard`, `JumpGapCard80`)
- `RoundTens50G2Theory.tsx`, `RoundTens50G2Quiz.tsx` (30 kérdés, `g2-c50-kerek-quiz`), `RoundTens50G2Matcher.tsx` (`g2-c50-kerek-matcher`), `RoundTens50G2Sorter.tsx` (`g2-c50-kerek-sorter`)
- Teszt: `src/test/grade2Topic2RoundTens50G2.test.tsx`

## Eltérések a tankönyvtől
- **Számkör 50-ig:** a tankönyv 54–55. oldala és a munkafüzet 35–36. oldala már 100-ig számol (90 − 50, 100 − 80, a 100 bontása, 100 kg-os ládák, 70–100 Ft-os gyümölcsök), pedig ez a II. témakör 50-es számköre. A DiákZóna-lecke minden száma 0 és 50 között marad; a 100-as változat a III. témakör kerek tízeses leckéjébe kerül.
- **Kétjegyű szám ± kerek tízes:** a tankönyvi oldal csak kerek tízes ± kerek tízes műveleteket tartalmaz. Mivel 50-ig csak kevés ilyen művelet van, és a témakör további oldalai (24 + 20, 47 − 20 típus) erre építenek, tudatosan hozzávettük („csak a tízes változik”).
- **Mértékegység-feladat elhagyva:** a 100 kg-os teherautós feladat (55/1) számköre és mértékegysége miatt nem került be; helyette 10, 20, 50 Ft-os pénzes feladatok vannak (a 10, 20, 50 Ft-os érmék valódi magyar érmék).
- **Saját számok, saját helyzetek:** a tankönyvi képeket (gyöngysorok, gyümölcsös tál) tízesrudakkal, számegyenessel, érmékkel és saját szöveges feladatokkal helyettesítjük.
- **Interaktivitás:** a papíron statikus áthúzást és fizetést élő laborokban lehet kipróbálni, azonnali visszajelzéssel.
