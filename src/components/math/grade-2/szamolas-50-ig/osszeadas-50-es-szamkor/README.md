# 2. Összeadás 50-es számkör

## Források
- Tankönyv I. kötet (`OH-MAT02TA_I.pdf`): 60–63. o. (Összeadás 0-tól 30-ig), 88–91. o. (Összeadás 0-tól 40-ig), 116–117. o. (Összeadás 0-tól 50-ig).
- Munkafüzet I. kötet (`OH-MAT02MA_I.pdf`): 41–42. o., 58–60. o., 71–72. o. (a 43–45., 60–63., 73–74. o. kivonásos részeit a 3. lecke dolgozza fel).

## Mit tartalmaznak az oldalak?
- Kerek tízes + egyes (20 + 6, 30 + 14), pálcikás és csészés képekről összeadás írása, tagok felcserélése.
- Analógiás sorok („oszloponként dolgozz”): 4 + 3, 14 + 3, 24 + 3, 34 + 3.
- Kerek tízesig pótlás (23 + 7, 28 + 2), majd tízesátlépés bontással: 26 + 7 = 26 + 4 + 3, 16 + 5 = 16 + 4 + 1.
- Kétjegyű szám hozzáadása számegyenesen két úton (15 + 13; 16 + 19 = 16 + 10 + 9 vagy 16 + 4 + 15).
- Háromtagú összegek, szabályos sorozatok, hiányzó tag, összegek egyenlősége, táblázatos szöveges feladatok, pénz.

## Mit csinál a DiákZóna-lecke?
- Tananyag: kerek tízes + egyes, analógia (kistesó), pótlás kerek tízesig, tízesátlépés bontással (3 lépéses kártyák + táblázat), kétjegyű szám hozzáadása (rudak + számpiramis, kétutas ugrás), 3 mintapélda, „Vigyázz!” (elfelejtett új tízes, számjegyek egymás mellé írása).
- 2 labor:
  1. *Ugrás a kerek tízesig* — a gyerek kiválasztja az első ugrást (kerek tízesig), a számegyenes megmutatja, hová ért; utána kiválasztja a végeredményt. A visszajelzés megnevezi a hibát (rövid ugrás, átugrott tízes, elfelejtett új tízes). „Új feladat”: véletlen tízesátlépéses összeadás 50-ig.
  2. *Mennyi kell még?* — `a + □ = kerek tízes` pótlás rudakkal és kockákkal (+/− rúd, +/− kocka); figyelmeztet, ha 10 kockát nem cserélt rúdra.
- Kvíz: 30 saját kérdés (10/szint), 22 ábrával; párosító 3 × 8, csoportosító 3 × 9 kártyaképekkel.

## Komponensek
- `Add50G2Parts.tsx` — `A50QFig`, `FillBlocksPart`, `TwoNumberBlocksPart`, `JumpsPart`, `PyramidPart`, `BalancePart`, laborok: `BridgeJumpLab`, `FillUpLab` (a rudak/számegyenes alapelemei a `../szamok-50-ig/Numbers50G2Parts.tsx`-ből jönnek)
- `Add50G2Figures.tsx` — `RoundTenPlusOnesSvg`, `AnalogyTensSvg`, `FillToTenSvg`, `BridgeJumpSvg`, `TwoDigitJumpSvg`, `BlocksSumPyramidSvg`
- `Add50G2CardFigures.tsx` — `BlocksAddCard`, `JumpCard`, `PyramidCard`, `BalanceCard` (+ `CoinsCard` az 1. leckéből)
- `Add50G2Theory.tsx`, `Add50G2Quiz.tsx` (`g2-c50-osszeadas-quiz`), `Add50G2Matcher.tsx` (`g2-c50-osszeadas-matcher`), `Add50G2Sorter.tsx` (`g2-c50-osszeadas-sorter`)
- Teszt: `src/test/grade2Topic2Add50G2.test.tsx`

## Eltérések a tankönyvtől
- **Csak összeadás:** a könyv oldalai keverik az összeadást, kivonást (TK 62. o. 4. sorozat −7, −5 lépésekkel; MF 60. o. 4.) és a szorzótáblákat; itt csak összeadás van, a kivonás a 3. leckébe került.
- **Ismétlődő cella:** a MF 41. o. 2. feladatában a „16 + 9” kétszer szerepel a táblázatban; a mi csoportosítóinkban minden elem egyedi.
- **Párok nélküli kártyák:** a TK 63. o. 2. feladatában a „3 + 9” és a „4 + 7” kártyának nincs egyenlő párja, ami félrevezető „színezd ugyanolyan színűre” utasításnál. Nálunk minden párosító kártyának pontosan egy párja van.
- **Pótlás 50-ig két lépésben:** a MF 71. o. 4. feladata (mennyi kell még 50-ig) nálunk ugrásos ábrával jelenik meg (26 → 30 → 50), mert két lépés.
- **Saját tartalom:** saját számok és szereplők (Bori, Dani, krétás doboz, tojástartó); a sárkányos, állatkertes és vásáros feladatokat nem vettük át.
