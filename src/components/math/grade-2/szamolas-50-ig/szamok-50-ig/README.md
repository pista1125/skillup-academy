# 1. Számok 50-ig

## Források
- Tankönyv I. kötet (`OH-MAT02TA_I.pdf`): 58–59. o. (Számok 0-tól 30-ig), 86–87. o. (Számok 0-tól 40-ig), 114–115. o. (Számok 0-tól 50-ig).
- Munkafüzet I. kötet (`OH-MAT02MA_I.pdf`): 40. o., 56–57. o., 69–70. o.

## Mit tartalmaznak az oldalak?
- Számlálás 10-es csoportosítással („30 egyes = 3 tízes”), tízesek és egyesek kirakása, „□ tízes + □ egyes” pótlás, t/e rövidítés.
- Számok olvasása, írása betűvel; százas tábla 50-ig.
- Számegyenes (nyilak helye), egyes, páros és tízes számszomszédok, `□ < 37 < □` alakban.
- Összehasonlítás, sorba rendezés, páros/páratlan számok, igaz–hamis állítások.
- Pénz (5, 10, 20 Ft-os érmék), tojástartók (10 tojás), számkártyákból kétjegyű számok alkotása.

## Mit csinál a DiákZóna-lecke?
- Tananyag: helyiérték-tábla rudakkal és kockákkal, betűvel írt számok táblázata, pénz és tojástartó mint tízes, számegyenes 20–50, egyes/páros/tízes szomszédok, összehasonlítás lépésenként, páros–páratlan párba állítással, 3 mintapélda, „Vigyázz!” (felcserélt helyiérték, 10 kocka = 1 rúd).
- 2 labor:
  1. *Rakd ki rudakkal és kockákkal!* — gombokkal tízesrudat és egyeskockát teszünk le; a visszajelzés felismeri a felcserélést és a „12 kocka” beváltatlan alakot. „Új feladat”: véletlen szám 21–50.
  2. *Számegyenes-nyomozó* — a 20–50 számegyenesen a nyíl helyét kell eltalálni 4 lehetőségből; megoldás után megjelennek az egyes és tízes szomszédok és a páros/páratlan jelző.
- Kvíz: 30 saját kérdés (10/szint), 26 ábrával; párosító 3 × 8 pár, csoportosító 3 × 9 elem kártyaképekkel.

## Komponensek
- `Numbers50G2Parts.tsx` — közös SVG-elemek (`BlocksPart`, `NumberLinePart`, `CoinPart`, `EggTrayPart`, `EggPart`, `N50QFig`) és a két labor (`BlocksBuilderLab`, `NumberLineLab`)
- `Numbers50G2Figures.tsx` — `PlaceValueBlocksSvg`, `NeighboursSvg`, `NumberLine2050Svg`, `CompareBlocksSvg`, `EvenOddPairsSvg`, `CoinsAndEggsSvg`
- `Numbers50G2CardFigures.tsx` — `BlocksCard`, `CoinsCard`, `EggsCard`, `NumberLineCard`, `SequenceCard`
- `Numbers50G2Theory.tsx`, `Numbers50G2Quiz.tsx` (`g2-c50-szamok-quiz`), `Numbers50G2Matcher.tsx` (`g2-c50-szamok-matcher`), `Numbers50G2Sorter.tsx` (`g2-c50-szamok-sorter`)
- Teszt: `src/test/grade2Topic2Numbers50G2.test.tsx`

## Eltérések a tankönyvtől
- **Számkör 50-ig:** a TK 115. o. 2.a) számegyenese és a MF 69. o. 2. feladata (`49 < □ < 51`) az 50 fölé is kilóg; nálunk minden szám, nyíl és válaszlehetőség 0–50 között marad.
- **Szorzás/osztás nélkül:** a TK 86. o. („Hányszor annyi zebra…”) és a MF 70. o. 3. rejtvénye („a 10 fele”, „a 9 harmada”, „a tíz kétszerese”) olyan fogalmat kér, amely a II. fejezetben még nincs; ezeket kihagytuk.
- **Tízes szomszéd kerek tízesnél:** a MF 57. o. 4.b) a 40 tízes szomszédjait is kéri, ami nincs definiálva (a 40 maga is kerek tízes). Nálunk tízes szomszédot csak nem kerek tízes számnál kérdezünk.
- **„Páros szomszéd” definiálva:** a MF 69. o. magyarázat nélkül használja; a tananyag példával mondja ki (22 < 24 < 26, 32 < 33 < 34).
- **Egyértelmű kártyafeladat:** a TK 87. o. 4. feladatánál nem derül ki, hogy egy kártya többször is használható-e. A kvízben kimondjuk: két kártyából, mindkettő egyszer (42; a 44 tipikus hibás válasz).
- **Saját tartalom:** saját számok, nevek és képek (tojástartó, érmék, rudak); a sárkányos, állatkertes és vásáros képeket nem vettük át. A t/e rövidítés helyett kiírjuk: „tízes”, „egyes”.
