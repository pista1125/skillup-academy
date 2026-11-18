# 5. Gyakorlás, tudáspróba (VIII. Mérések)

## Források
- Tankönyv II. kötet (`OH-MAT02TA_II.pdf`), 111–113. o. — *Megálló*; 114–117. o. — *Kitekintő*
- Munkafüzet II. kötet (`OH-MAT02MA_II.pdf`), 73–74. o. — *Megálló*; 75–76. o. — *Kitekintő* (a lessons.json 74–79-et írt; a 73. oldal a Megálló eleje)
- A fejezet leckéi: `hosszusag-meres`, `tomeg-meres`, `urtartalom-meres`, `ido-meres` (mértékegységek és jelölés onnan)

## Mit tartalmaznak a könyv oldalai?
- **TK II/111–113 Megálló:** mértékegység kiegészítése szövegben (cm, dm, m, l, dl), szörp szétosztása 1 dl-es és 2 dl-es poharakba (2 l), halak hossza vegyes alakban (2 dm 6 cm, 1 m − 70 cm, 5 · 10 cm, 18 cm + 23 cm), kecskebéka-ugrás (1 m − 70 cm), sorbarendezés-kombinatorika, halak tömege mérlegeken, „nagyot mondó horgászok” igaz–hamis állításai (4 dl = 40 l?, 50 dl = 5 l, 10 dl = 1 l), 1 l − 1 dl, rekordharcsa tömege és hossza.
- **MF II/73–74 Megálló:** mit mivel mérünk (cm, dm, m, kg, l, dl), „eltévedt mértékegységek” újságcikk, mennyiség – tárgy párosítás, kombinatorika (fényképek sorrendje, útvonalak), állatkerti idő („fél 11-től 16 óráig”).
- **Kitekintő (TK II/114–117, MF II/75–76):** számok 1000-ig, kerek százasok, euró és eurócent.

## Mit csinál a DiákZóna-lecke?
- **Tananyag („Amit már tudsz”):** a négy mennyiség (hosszúság, tömeg, űrtartalom, idő) mértékegységekkel és mérőeszközökkel, átváltások (dm–cm, m–dm–cm, l–dl, fél liter, óra–perc, hét–nap), 3 vegyes mintapélda (szalag, mérleg, poharak), csapda: különböző mértékegységek kivonása és „1 óra ≠ 100 perc”.
- **Labor I – Vegyes átváltó:** véletlen feladat 8 típusból (dm → cm, dm cm → cm, l → dl, l dl → dl, hét → nap, óra perc → perc, kg + kg, 1 m − cm), 4 válasz tipikus hibákkal, azonnali visszajelzés és tipp, pontszámláló.
- **Labor II – Melyik mértékegység illik?:** 15 hétköznapi helyzet („Egy pohár tej: 2 ?”); a visszajelzés megmondja, ha rossz mennyiséget (pl. tömeg helyett hossz) vagy rossz nagyságrendet (dl helyett l) választott.
- **Kvíz:** 90 kérdés (30/szint, mind a négy mennyiségből), 56 ábrával. 1. szint: leolvasás, egy lépés; 2. szint: átváltás, vegyes alak, hiányzó tömeg, időtartam; 3. szint: legfeljebb kétlépéses szöveges feladatok.
- **Párosító:** tárgy → mértékegység; leolvasás és átváltás; vegyes mértékek.
- **Csoportosító:** hosszúság / tömeg / űrtartalom; kevesebb / pontosan / több mint 1 l; kevesebb / pontosan / több mint 1 m.

## Fájlok és teszt
- `MeasExamG2Parts.tsx` — `ObjectIcon`, `makeMixTask`, `MixConvertLab`, `UnitPickLab`
- `MeasExamG2Figures.tsx` — `UnitsOverviewSvg`, `ConversionSvg`, `ToolsSvg`, `MixedUnitsSvg`
- `MeasExamG2CardFigures.tsx` — `ObjectCard`; a többi kártyakép a fejezet leckéiből (`RulerCard`, `DmBarCard`, `BalanceCard`, `JugsCard`, `ClockCard`, `SpanCard`, `WeeksCard`)
- `MeasExamG2Theory.tsx`, `MeasExamG2Quiz.tsx` (`g2-meres-tudasproba-quiz`), `MeasExamG2Matcher.tsx` (`g2-meres-tudasproba-matcher`), `MeasExamG2Sorter.tsx` (`g2-meres-tudasproba-sorter`)
- Teszt: `src/test/grade2Topic8MeasExamG2.test.tsx` (a kérdésekben és a laborgenerátorban minden szám ≤ 100)

## Eltérések a tankönyvtől
- **MF II/74/3 „fél 11-kor”:** a „fél 11” (= 10 óra 30 perc) kifejezést a könyv sehol nem tanítja (csak „10 óra 30 perc”, „fél óra = 30 perc”), mégis a Megállóban kéri → nálunk mindig „óra … perc” alak.
- **TK II/111/1:** a horgászbot 16 dm, „4-szer annyi, mint a szék magassága, ami 40 cm” — ehhez 160 cm-rel kell számolni (100 fölött), ráadásul vegyes egységekkel → nem használjuk; a mértékegység-kiegészítést a „Melyik mértékegység illik?” laborban és kvízkérdésekben gyakoroljuk.
- **TK II/113/1 „4 dl = 40 liter”** és hasonló „nagyot mondó” állítások helyett rövid, egyértelmű igaz–hamis mondatok (q75, q82).
- **Kombinatorika (TK II/112/2, MF II/74/1–2)** kihagyva: nem mérési tartalom.
- **Kitekintő (számok 1000-ig, euró)** kihagyva: túllépi a 100-as számkört, és nem a mérések témakör része.
- **Mértékegységek a fejezet leckéi szerint:** cm, dm, m (csak „dm cm” és „m dm” vegyes alak); kg (dkg nincs); l, dl, fél liter (cl nincs); perc, óra, nap, hét, hónap, év.
- **Szorzás csak kis szorzással** (5 · 2 dm, 7 · 7 kg, 3 · 3 dl), osztás csak „egyforma részekre bontásként” magyarázva (15 kg = 5 + 5 + 5).
- Saját nevek, számok, helyzetek; a könyv horgász- és harcsatörténete helyett saját „rekordhal” és horgászfeladat.
