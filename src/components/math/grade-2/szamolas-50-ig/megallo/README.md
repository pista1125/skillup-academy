# 6. Megálló – tudáspróba (2. osztály, II. Számkörbővítés és számolás 50-ig)

A II. témakör (1–5. lecke) záró összefoglaló leckéje és 90 kérdéses tudáspróbája.

## Források
- **Tankönyv I. kötet** (`OH-MAT02TA_I.pdf`): *Megálló* 68–69., 97–98. és 121. o., valamint a témakör oldalai (54–55., 58–67., 81–82., 86–96., 114–120. o.).
- **Munkafüzet:** külön megálló-oldal nincs.

## Mit tartalmaznak a tankönyvi oldalak?
- **TK 68. o.:** kígyós társasjáték 0–30 dobókockával; képről összeadás és kivonás (14 + 16 = 30 és fordítva).
- **TK 69. o.:** hiányzó számok (11 + 8 …, 30 − 1 …, 15 + □ = 25 …); számpiramisok páros/páratlan és feltételes (nagyobb, mint 9, de nem nagyobb 15-nél) karikázással.
- **TK 97. o.:** képről összeadás/kivonás (tigrisek, majmok); állatkerti térkép kifutónkénti összegekkel; „14-gyel több” szöveges feladat.
- **TK 98. o.:** hiányzó számok kivonásban és összeadásban, egyenlő eredményű kivonások színezése, 3 × 3-as bűvös négyzetek.
- **TK 121. o.:** zsákok (melyik két szám összege a felső szám), betűkódos műveletek, nyitott mondatok relációs jellel.

## Mit csinál a DiákZóna lecke?
- Saját feladatok, **0–50**, csak + és −.
- Tananyag: „Amit már tudsz” térkép és táblázat (1–5. lecke); helyiérték tízesrudakkal és T–E táblázattal; egyes és tízes szomszédok; páros/páratlan számtáblán (21–50); tízesátlépés oda-vissza a számegyenesen; számpiramis; mintapéldák (hiányzó szám, két lépés, csavaros szöveg); „Vigyázz!” (43 − 6 ≠ 43; nyitott mondatnál a 0 is megoldás).
- **Labor I – Vegyes gyakorló:** 7 feladattípus (tízesek-egyesek, számszomszédok, összeadás és kivonás tízesátlépéssel, kerek tízesek, hiányzó szám, szöveges feladat a 5. lecke generátorából), számbeírás, tipikus hibára szabott visszajelzés, pontszámláló.
- **Labor II – Számpiramis-építő:** véletlen 3 szintes piramis (csúcs 25–50), lépésenkénti visszajelzéssel.
- **Kvíz:** 90 kérdés (30/szint), 60 kérdés ábrával (tízesrúd, számegyenes, számkártya, korong, szalagos ábra, piramis, számtábla, mérleg, bűvös négyzet, érme).

## Fájlok
- `Count50ExamG2Parts.tsx` – `CardsRowPart`, `PyramidPart`, `NumberTablePart`, `BalancePart`, `MagicSquarePart`, generátorok (`makeExam50Task`, `makePyramid50Task`)
- `Count50ExamG2Figures.tsx` – `Count50MapSvg`, `Count50PlaceValueSvg`, `Count50NeighborsSvg`, `Count50BridgeSvg`, `Count50EvenOddSvg`, `Count50PyramidSvg`
- `Count50ExamG2CardFigures.tsx` – a 4. és 5. lecke kártyaképeinek újrahasznosítása (`RodsCard`, `JumpTensCard`, `DotsCard`, `BarCard`, `CompareCard`)
- `Count50ExamG2Theory.tsx`, `Count50ExamG2Quiz.tsx` (90 kérdés, `g2-c50-tudasproba-quiz`), `Count50ExamG2Matcher.tsx` (`g2-c50-tudasproba-matcher`), `Count50ExamG2Sorter.tsx` (`g2-c50-tudasproba-sorter`)
- Teszt: `src/test/grade2Topic2Count50ExamG2.test.tsx`

## Eltérések a tankönyvtől
- **Nyitott mondatok alaphalmaza:** a TK 121/3 nyitott mondatai (pl. 50 − 15 + 7 > ○, 42 − 17 − 8 > ○) nagyon sok megoldást engednek, és nem mondják meg, milyen számok jöhetnek szóba. Nálunk a nyitott mondatoknak kevés, pontosan felsorolható megoldása van, és kimondjuk, hogy a 0 is megoldás.
- **Szorzás nélkül:** a II. témakör megállói mellett a könyv szorzótáblás oldalakat is tartalmaz; a tudáspróbában csak + és − szerepel.
- **Számkör:** minden kérdés, opció és laborfeladat 0 és 50 között marad (a TK 68. oldali kígyós játék 0–30, a többi oldal 50-ig rendben van).
- **Betűkódos feladat (TK 121/2)** helyett rövid, ábrás kérdések; a „színezd ki” jellegű feladatok (TK 69/2, 98/2) helyett válogatós Csoportosító.
- **Bűvös négyzet:** a könyv négyzeteiben sok mező üres; nálunk csak egy mező hiányzik, és a sorösszeget egy teli sorból ki lehet számolni (egyértelmű megoldás).
- **Saját helyzetek és számok:** a könyvi állatkerti térkép, tigrisek/majmok, cifraszűr, zsákok helyett saját kontextusok.
