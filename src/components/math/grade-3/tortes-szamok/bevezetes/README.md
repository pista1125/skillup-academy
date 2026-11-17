# 1. Egyenlő részekre osztás (3. osztály, XIV. Ismerkedés a törtekkel)

## Források
- Tankönyv: OH-MAT03TA, 134. oldal („Ismerkedés a törtekkel” 1–2. feladat).
- Munkafüzet: OH-MAT03MA_II, 67. oldal (2–3. feladat: elfogyott tortarészek, kiszínezett téglalaprészek).

## Mi van a könyvben?
- TK 134/1: írólap kétszeri félbehajtása, kinyitva 4 egyenlő rész; „1 negyed” elnevezés, kiszínezés, a negyedek egymás mellé rakása („4 negyed”, „3 negyed”).
- TK 134/2: ugyanakkora torták 2, 3, 4, 6, 8 egyenlő részre vágva, 1 szelet a tányéron; a szeletek nagyságának összehasonlítása.
- MF 67: tortákból elfogyott részek, téglalapok egy kiszínezett része.

## Mit csinál a DiákZóna-lecke?
- A tört fogalma előtti lépés: **mikor egyenlők a részek**, és **hány egyenlő részre** osztottuk az egészet. A rész neve (1 ketted = fél, 1 harmad, 1 negyed, 1 ötöd, 1 hatod, 1 nyolcad, 1 tized) itt jelenik meg először; a „3 negyed” típusú nevek a 2. leckében.
- Ábrák: hajtogatás lépésenként, egyenlő / nem egyenlő részek (pipa / X), ugyanaz a torta 2–8 részre vágva tányéros szelettel, egy négyzet 4 egyenlő részre háromféleképpen.
- Csapda: „4 rész még nem 4 egyenlő rész”; „a részeket számold, ne a vágásokat” (3 vágás → 4 rész).
- **Labor I – Hajtogató:** cél (2, 4 vagy 8 egyenlő rész); a gyerek „jobbról balra” vagy „alulról felfelé” hajtja félbe a lapot (animáltan zsugorodik), kinyitja, és megszámolja a részeket. Célzott visszajelzés: elszámolta / kevesebbet vagy többet hajtott.
- **Labor II – Egyenlő részek?** véletlen kör vagy csík egyenlő vagy láthatóan nem egyenlő részekkel. Ha a gyerek téved, a legnagyobb és a legkisebb részt kiszínezzük (zöld/piros). Egyenlő részeknél meg is kell számolni a részeket (koppintással számozható).
- Kvíz: 30 kérdés (10/10/10), 27 ábrával. Párosító: kép ↔ részek száma, kép ↔ a rész neve, hajtogatás/vágás leírása ↔ kép. Csoportosító: 2/3/4 egyenlő rész, egyenlő / nem egyenlő / egész, 1 ketted / 1 negyed / 1 nyolcad.

## Komponensek
- `EqualPartsG3Figures.tsx`: `FoldPaperSvg`, `EqualOrNotSvg`, `CakesCutSvg`, `ManyWaysSvg`
- `EqualPartsG3CardFigures.tsx`: `PieCard`, `BarCard`, `GridCard`, `DiagCard`
- `EqualPartsG3Parts.tsx`: közös rajzelemek (`Pie`, `Bar`, `Grid`, `DiagSquare`, `PlateSlice`), névtáblák (`PART_NAME`…), generátorok (`unequalAngles`, `unequalCuts`) – a 2. lecke is ezt használja
- `EqualPartsG3Theory.tsx`, `EqualPartsG3Quiz.tsx` (`EQUAL_PARTS_G3_QUESTIONS`), `EqualPartsG3Matcher.tsx` (`EQUAL_PARTS_G3_MATCHER_LEVELS`), `EqualPartsG3Sorter.tsx` (`EQUAL_PARTS_G3_SORTER_LEVELS`)
- Azonosítók: kvíz `g3-frac-reszek-quiz`, párosító `g3-frac-reszek-matcher`, csoportosító `g3-frac-reszek-sorter`.

## Teszt
`src/test/grade3Topic14EqualPartsG3.test.tsx`

## Eltérések a tankönyvtől
- **Hiányzó „egyenlő-e?” lépés (TK 134):** a könyv csak egyenlő részeket mutat, így nem derül ki, miért fontos, hogy a részek egyenlők legyenek. Nálunk külön szakasz, labor és kvízkérdések mutatnak nem egyenlő részeket is (igazságos-e így osztozni?).
- **Hajtások száma ↔ részek száma:** a könyv egyszer hajtat kétszer félbe. Nálunk a gyerek maga választja a hajtások számát (1–3), és látja: minden félbehajtás kétszer annyi részt ad (2 → 4 → 8).
- **Vágások vs. részek:** tipikus hiba, hogy a gyerek a vágásokat számolja. A könyvben nincs erre feladat; nálunk csapda-doboz és kvízkérdések (4 vágás → 5 darab, 6 darabhoz 5 vágás).
- **TK 134/2:** a könyv a tányérra tett szeleteket kérdezi „hányad rész?” formában, de az egyes torták részeinek száma a képen nehezen számolható (perspektivikus rajz). Nálunk felülnézetes, jól számolható tortarajzok vannak.
- Saját helyzetek (pizza, csokitábla, szalag, kalács, zsemle) és saját számok; a könyv szereplőit nem használjuk.
