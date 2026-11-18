# 2. Szorzás 3-mal

## Források
- *Matematika 2. – Tankönyv I. kötet* (`OH-MAT02TA_I.pdf`): 72. o. (Számok többszörösei), 73–76. o. (Szorzás, osztás 3-mal).
- *Matematika 2. – Munkafüzet I. kötet* (`OH-MAT02MA_I.pdf`): 46–52. o.

## Mit tartalmaznak az oldalak?
- **TK 72.**: számolás 0–30 között kettesével, ötösével, hatosával, tízesével, tizenötösével; „Ezek a számok a □ többszörösei”; +3-as sorozat; ugráló állat a számegyenesen (ugrásszám ↔ érkezési hely).
- **TK 73–76.**: hármas tornyok, csoportosítás hármasával; ismételt összeadás → szorzás (`2 · 3 = 3 + 3`); a 3-as tábla 0-tól 10-ig táblázatban (a szorzással párhuzamosan a bennfoglalás is: `6 : 3`); pálcikákból kirakott betűk; „háromszorosa / harmada” nyíldiagramok; ceruzák csoportosítása hármasával és tízesével; képek és műveletsorok párosítása (`3 · 8`, `8 · 3`, `3 · 10`, `10 · 3`).
- **MF 46–52.**: hármas sorozat 30-ig, kép → összeadás és szorzás, rajz a műveletekről, kártyapárosítás, hiányzó tényező (`□ · 3 = 21`), összehasonlítás (`5 · 3 □ 3 + 3 + 3`, `24 − 5 □ 6 · 3`), nyitott mondat (`8 · 3 < □ < 9 · 3`), a 2 és a 3 többszörösei az 1–30-as táblán, szorzótábla-kitöltés, betűrejtvény, rövid szöveges feladatok.

## A DiákZóna lecke
- Tananyag: hármas csoportok (lóhere, tricikli, pálcika-háromszög), ismételt összeadás → szorzás, hármas ugrások és **a 3 többszörösei** (a 2, 5, 10 többszöröseivel együtt, mint a TK 72.), 1–30 tábla a 2 és 3 közös többszöröseivel, a 3-as tábla „mindig +3” felépítéssel, felcserélés rácspontokkal, „háromszorosa”, mintapéldák, Vigyázz-doboz (`4 · 3 ≠ 4 + 3`, `0 · 3 = 0`).
- 2 labor: **Pálcika-háromszögek** (háromszögek rakása, élő összeadássor, eredmény választása) és **Hármas ugrások** (n-szer ugrani / ugrásszám keresése `□ · 3 = t` alakban), mindkettő „Új feladat” gombbal.
- Kvíz 30 kérdés (10/szint), 21 kérdésábrával; Párosító 3 × 8 pár; Csoportosító 3 × 3 × 9 elem (eredmény / kinek a többszöröse / hiányzó szám).

## Fájlok és teszt
- `Mult3G2Parts.tsx` – közös SVG-elemek (`CloverPart`, `StickTrianglePart`, `TricyclePart`, `DotGroupsPart`, `DotArrayPart`, `JumpLine3Part`), `szor()` ragképző, laborok (`TriangleLab`, `JumpLab3`)
- `Mult3G2Figures.tsx` – `CloverGroupsSvg`, `ThreeJumpsLineSvg`, `MultiplesBoardSvg`, `ArrayCommute3Svg`, `TrianglesTableSvg`, `TripleArrowSvg`
- `Mult3G2CardFigures.tsx` – kártyaképek (150 × 80 és 80 × 80): `CloverCard`, `TriCard`, `GroupsCard`, `JumpsCard`, `ArrowCard`, `ArrayCard`
- `Mult3G2Theory.tsx`, `Mult3G2Quiz.tsx` (`g2-szorzas-3-quiz`), `Mult3G2Matcher.tsx` (`g2-szorzas-3-matcher`), `Mult3G2Sorter.tsx` (`g2-szorzas-3-sorter`)
- Teszt: `src/test/grade2Topic4Mult3G2.test.tsx`

## Eltérések a tankönyvtől
- **Szorzás és osztás szétválasztva**: a tankönyv (73–76.) együtt vezeti be a szorzást és a bennfoglalást (`6 : 3`, „harmada”). A DiákZóna szorzás-fejezetében csak `+ − ·` szerepel; az osztás és a „harmada” a *V. Osztás / 2. Osztás 3-mal* leckébe került.
- **Saját szereplők és tárgyak**: a könyv háromfejű sárkánycsaládja helyett lóherék, triciklik, pálcika-háromszögek, almás kosarak.
- **Számkör ≤ 30**: a munkafüzet 47. oldalán (1. feladat) a 3-as táblás oldalon 40-es és 60-as szorzat is van (10-es tábla), és az 51. oldali táblázatban `5 · 10 = 50`. A lecke mindenhol a 3-as táblán (0–30) belül marad.
- **Jelölés egyértelműsítése**: mindenhol a könyv konvencióját követjük (`4 · 3` = négyszer 3 = 3 + 3 + 3 + 3), és a felcserélést külön rácsponttal mutatjuk meg, hogy a TK 76. oldali `3 · 8` / `8 · 3` párosítás ne okozzon bizonytalanságot.
- **Pontosított megfogalmazás**: a MF 51. oldali rejtvény „Tizenkettőben a három.” mondata hiányos (nem mondja meg, mit kell kiszámolni); a DiákZóna mindig teljes kérdést tesz fel („Hány hármas ugrás kell?”, „Melyik számnak a háromszorosa a 27?”).
- **Interaktivitás**: a papíron statikus ugrásokat és csoportosítást élő, azonnal visszajelző laborok váltják ki, a kvíz hibalehetőségei tipikus tévedések (`4 · 3 = 7`, ±3 tévesztés, `0 · 3 = 3`).
