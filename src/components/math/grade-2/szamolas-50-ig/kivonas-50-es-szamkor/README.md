# 3. Kivonás 50-es számkör

## Források
- Tankönyv I. kötet (`OH-MAT02TA_I.pdf`): 64–67. o. (Kivonás 0-tól 30-ig), 92–95. o. (Kivonás 0-tól 40-ig), 118–119. o. (Kivonás 0-tól 50-ig).
- Munkafüzet I. kötet (`OH-MAT02MA_I.pdf`): 43–45. o., 60–63. o., 71. o. (4.), 73–74. o. kivonásos feladatai.

## Mit tartalmaznak az oldalak?
- Pálcikás képekről kivonás írása, analógiás sorok (7 − 3, 17 − 3, 27 − 3, 37 − 3), kerek tízesből kivonás (30 − 4, 40 − 7).
- Tízesátlépés bontással, vissza a kerek tízesig: 18 − 9 = 18 − 8 − 1, 32 − 5 = 32 − 2 − 3; számegyenes visszaugrásokkal.
- Kerek tízesek elvétele (25 − 20), kétjegyű szám kivonása két úton (28 − 23; 36 − 19 = 36 − 10 − 9 vagy 36 − 6 − 13).
- Hiányzó kisebbítendő / kivonandó, kivonás ellenőrzése összeadással (44 − 18 = 26 ↔ 26 + 18 = 44), szabálytáblák, sorozatok, „mennyivel több”, szöveges feladatok, pénz.

## Mit csinál a DiákZóna-lecke?
- Tananyag: analógia (kistesó), tízesek elvétele és kerek tízesből kivonás rúdbontással, tízesátlépés bontással (3 lépéses kártyák + táblázat), kétjegyű szám kivonása háromugrásos számegyenesen, ellenőrzés összeadással (számháromszög), 3 mintapélda, „Vigyázz!” (megfordított egyesek: 32 − 5 ≠ 33; összeadás helyett kivonás).
- 2 labor:
  1. *Visszaugrás a kerek tízesig* — első ugrás kiválasztása, majd a végeredmény; a visszajelzés felismeri a „5 − 2” fordítási hibát és a „nem léptük át a tízest” hibát. „Új feladat”: véletlen tízesátlépéses kivonás.
  2. *Vegyél el rudakból és kockákból!* — kocka- és rúdelvétel, „Rúd → 10 kocka” bontás gomb; számlálja az elvett és a maradt mennyiséget, a végén ellenőrzést mutat összeadással.
- Kvíz: 30 saját kérdés (10/szint), 22 ábrával; párosító 3 × 8, csoportosító 3 × 9 kártyaképekkel (áthúzott rudak/kockák, visszaugrások, piramis, mérleg).

## Komponensek
- `Sub50G2Parts.tsx` — `S50QFig`, `TakeBlocksPart`, `takeBlocksWidth`, laborok: `BackJumpLab`, `TakeAwayLab` (a számegyenes/ugrás/rúd elemek az 1–2. leckéből jönnek)
- `Sub50G2Figures.tsx` — `AnalogySubSvg`, `FromRoundTenSvg`, `TakeTensSvg`, `BackBridgeSvg`, `TwoDigitBackSvg`, `CheckByAddingSvg`
- `Sub50G2CardFigures.tsx` — `TakeCard`, `BackJumpCard` (+ `PyramidCard`, `BalanceCard` a 2. leckéből)
- `Sub50G2Theory.tsx`, `Sub50G2Quiz.tsx` (`g2-c50-kivonas-quiz`), `Sub50G2Matcher.tsx` (`g2-c50-kivonas-matcher`), `Sub50G2Sorter.tsx` (`g2-c50-kivonas-sorter`)
- Teszt: `src/test/grade2Topic2Sub50G2.test.tsx`

## Eltérések a tankönyvtől
- **Egyértelmű szöveg:** a TK 94. o. 2.a) („a kecskék már elfogyasztottak 13, 23, 16, 26 répát”) úgy olvasható, mintha mind a négy mennyiséget megették volna (13 + 23 + 16 + 26 = 78 > 39). Nálunk minden szöveges feladat egyetlen, egyértelmű helyzetet ír le.
- **Ismétlődő cella:** a MF 43. o. 2. feladatában a „15 − 6” kétszer szerepel; a mi kártyáink mind különbözők.
- **Fordított szövegezés nélkül:** a MF 63. o. 2. és a MF 74. o. 1. feladata („Ez 14 kg-mal több, mint amennyit a farkasok kaptak”) 7–8 évesnek nehéz, félrevezető kulcsszavas szöveg; a 3. szinten is csak egyenes, legfeljebb kétlépéses szöveg van.
- **Nem szabványos jelölés:** a MF 74. o. 3. feladata a „<” jel fölé írt számmal jelöli a különbséget; nálunk csak `<`, `>`, `=` és □ szerepel.
- **Csak kivonás (és ellenőrző összeadás):** a könyv oldalain keveredő szorzótáblás feladatokat kihagytuk; az összeadás csak ellenőrzésként és pótlásként jelenik meg.
- **Saját tartalom:** saját számok és szereplők (Zsófi, Panna, Tomi, almás kosár, tojástartó); a sárkányos, majmos, vásáros feladatokat nem vettük át.
