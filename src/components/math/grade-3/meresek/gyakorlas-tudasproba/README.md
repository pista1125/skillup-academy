# 10. Gyakorlás, tudáspróba (3. osztály, IV. Mérések)

**Források:** tankönyv OH-MAT03TA 44–51. oldal (Mit mivel mérünk?, A tömeg mérése, Az űrtartalom mérése, Megálló, Kitekintő) és 138–149. oldal (Az idő mérése, A hosszúság mérése, A kerület mérése, A téglalap és a négyzet kerülete, A terület mérése, A téglalap és a négyzet területe); munkafüzet OH-MAT03MA I. kötet 56–60. oldal (Ellenőrizd a tudásodat!, Gyakorolj!) és II. kötet 71–83. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 49–50. (Megálló):** reggeli összetevői dkg-ban és cl-ben (mennyivel több, mekkora bögre kell, a szendvics tömege), tortához kimért alapanyagok összege és maradéka, kétkarú mérleg (csokoládé = fele + 5 dkg), mérlegekről leolvasott tömegek (kg-os és dkg-os súlyok), napi folyadékszükséglet táblázata, 500 doboz · 2 dl, kanna 2 l + fél l + 5 dl, 20 zsák · 50 kg, mennyiségek sorba rendezése (6 dl, 9 cl, 2 l, 7 l, 7 cl).
- **TK 51. (Kitekintő):** zsiráfos szöveg kiegészítése a megfelelő mértékegységgel (dm, kg, l, cm, m, dkg), állatok vízszükséglete cl-ben, tengerimalac és törpenyúl itala, fűegerek és csincsilla a mérlegen.
- **TK 138–149.:** idő (óra, másodperc, menetrend, naptár), hosszúság (mm, cm, dm, m), kerület (az oldalak összege, „K”), téglalap és négyzet kerülete (szemben lévő oldalak), terület lefedése egységekkel, téglalap területe sorok és oszlopok alapján.
- **MF I/56–60.:** főleg a III. fejezet ismétlése; mérésekhez kapcsolódik: mennyiségek összehasonlítása (32 dl ⬚ 3 l, 10 dkg ⬚ 1 kg, 2 kg ⬚ 170 dkg), űrtartalmak sorba rendezése nyíllal, 1 kg-os kosarak összeállítása.
- **MF II/71–83.:** az idő, a hosszúság, a kerület és a terület munkafüzeti feladatai (menetrend, átváltás, szakaszok mérése, kerület négyzethálón és mm-ben, park és medence kerülete, lefedés, térkövek, járólapok).

## Mit csinál a DiákZóna lecke?

A fejezet minden leckéjét összefoglalja saját számokkal és helyzetekkel. A jelölés követi a fejezet többi leckéjét: tömeg csak **kg, dkg** (gramm nincs), űrtartalom **l, dl, cl**, hosszúság **mm, cm, dm, m**, idő **másodperc, perc, óra, nap, hét, hónap, év** (kiírva). A kerületet szóval mondjuk („a kerülete 20 cm”), betűs képlet nincs; a téglalapnál „a szemben lévő oldalak egyenlők”. A területet kis négyzetekkel (egységekkel) mérjük, a téglalapnál „sorok száma · egy sorban lévő kis négyzetek”. Törtszó (fél, negyed) feladatban nincs – csak az óraleolvasás kifejezéseiben (fél 4, negyed 5), ahogy a könyv is tanítja.

## Komponensek

1. **`MeasurementsExamG3Parts.tsx`** – közös rajzelemek: `QFig`, derékszögjel negyedkörívvel és ponttal (`RightMark`, `RectRight`), kétkarú mérleg (`Balance`, súlyok két sorban: szám + egység), konyhai mérleg számlapja (`Dial`), mérőkancsó (`Jug`), vonalzó mm-beosztással (`Ruler`), négyzetrácsos alakzat (`GridShape`, `rectCells`, `cellPerimeter`), sokszög oldalfeliratokkal (`Poly`), kártyasor (`Cards`). Az óra, stopper, digitális kijelző és naptárlap a 9. lecke (`../az-ido-merese/TimeG3Parts`) elemei.
2. **`MeasurementsExamG3Figures.tsx`** – `UnitsOverviewSvg` (a négy mennyiség váltószámai), `ToolsSvg` (vonalzó, konyhai mérleg, mérőkancsó, óra), `ConversionSvg` (m → dm → cm → mm lépcső és 3 átváltás), `PerimeterAreaSvg` (ugyanaz a 4 · 3-as téglalap: kerület 14 egység körbeszámozva, terület 12 kis négyzet), `RectSidesSvg` (szemben lévő oldalak színezve, 6 + 4 + 6 + 4 = 20 cm).
3. **`MeasurementsExamG3CardFigures.tsx`** – kártyaikonok: `MiniJug`, `MiniDial`, `MiniRuler`, `MiniGrid`, `SortGridRect`, `MiniRect`, mérőeszköz-ikonok (`RulerIcon`, `TapeIcon`, `BalanceIcon`, `KitchenScaleIcon`, `CupIcon`, `BottleIcon`); a `MiniClock` és `MiniTwoClocks` a 9. leckéből jön.
4. **`MeasurementsExamG3Theory.tsx`** – „Amit már tudsz” (mértékegység-áttekintés), mit mivel mérünk (táblázat), mértékváltás („előbb válts át, aztán hasonlíts”), kerület és terület egymás mellett, az idő (ugrás az egész óráig), 3 vegyes mintapélda (bevásárlás, kerítés, csempe), „Vigyázz!” (1 m 5 cm ≠ 15 cm; kerület vagy terület).
   - **Labor I – Mértékváltó:** véletlen átváltás 9 fajtából (kg dkg, l dl, dl cl, l cl, m cm, m dm, cm mm, óra perc, perc másodperc) → kisebb egység; 4 gomb, a rossz válaszok a tipikus hibák (egymás mellé írás, 100 a 60 helyett, kimaradt maradék, rossz váltószám), mindegyikre külön tipp; pontszámláló.
   - **Labor II – Kerület vagy terület?:** véletlen téglalap négyzethálón (2–7 · 2–5), véletlenül kerületet vagy területet kérdez; ha a gyerek a másikat adja meg, megmondja, hogy az a terület/kerület; jó válasz után kiszínezi a szélét vagy a belsejét, és mindkét értéket kiírja.
5. **`MeasurementsExamG3Quiz.tsx`** – `MEASUREMENTS_EXAM_G3_QUESTIONS`: **90 kérdés (30/30/30)**, szintenként minden témából (mérőeszköz, tömeg, űrtartalom, hosszúság, kerület, téglalap és négyzet kerülete, terület, téglalap területe, idő); 65 kérdésnél ábra (mérleg, számlap, kancsó, vonalzó, sokszög, négyzetrács, téglalap derékszögjelekkel, óra, stopper, naptár, kártyák); minden kérdésnél badge, 3 puska. Azonosító: `g3-meas-tudasproba-quiz`.
6. **`MeasurementsExamG3Matcher.tsx`** – `MEASUREMENTS_EXAM_G3_MATCHER_LEVELS`, 3 szint × 8 pár (leolvasás + váltószámok; átváltás + rácsos kerület/terület; kerület, terület, eltelt idő, műveletek mértékegységgel), szintenként 4 képes kártya. `g3-meas-tudasproba-matcher`.
7. **`MeasurementsExamG3Sorter.tsx`** – `MEASUREMENTS_EXAM_G3_SORTER_LEVELS`, 3 szint × 3 kategória × 9 elem (mit mér: hosszúság / tömeg / űrtartalom eszköz-ikonokkal; 1 l-nél kevesebb / pontosan 1 l / több kancsókkal; kerülete 12 / 14 / 16 egység rácsos téglalapokkal), szintenként 4–6 képes elem. `g3-meas-tudasproba-sorter`.

**Teszt:** `src/test/grade3Topic4MeasurementsExamG3.test.tsx`

## Eltérések a tankönyvtől

- **Százalék (TK 49/1.):** „1,5%-os tej” – a százalék nem 3. osztályos tananyag. Nálunk csak „tej” vagy „üdítő” szerepel.
- **Tört és egyenlet-szerű gondolkodás (TK 49/3.):** „egy tábla csokoládé = a csokoládé fele + 5 dkg” – a „fele” a XIV. fejezet anyaga, és a feladat valójában egyenletmegoldás. Nálunk ugyanez a mérleg-gondolkodás egész egységekkel szerepel: 3 egyforma alma = 60 dkg → 1 alma 20 dkg.
- **Átfedő korosztályok (TK 50/7.):** „1–2, 2–3, 3–6, 6–10 év…” – egy 2 vagy 6 éves gyerek két oszlopba is beleillik. Ilyen táblázatot nem használunk.
- **„Fél l” (TK 50/9., TK 48/5–6.):** tört a törtek előtt. Nálunk 5 dl / 50 cl szerepel, mint a 3. leckében.
- **Valószerűtlen tömeg (TK 51/4.):** a feladat szerint a csincsilla 21 dkg (7 fűegér), valójában egy csincsilla kb. 40–60 dkg. Nálunk a tárgyak és állatok tömege a valóságnak megfelelő (alma 15–20 dkg, táska 5 dkg).
- **Az MF I/56–60. „Ellenőrizd a tudásodat!” oldalai** szinte csak a III. fejezetet (számolás 200-ig) ellenőrzik; mérésről csak 3 feladat szól. A tudáspróbát ezért a TK 44–51. és 138–149. oldalak és az MF II/71–83. feladattípusaiból állítottuk össze, saját számokkal.
- **A régi fejezet-README hibái:** g, t, ml, hl, km és „K = 2 · (a + b)”, „T = a · b” képletek – ezeket a 3. osztályos könyv nem tanítja. Nálunk csak a könyv egységei és szóbeli szabályai szerepelnek.
- **Tudatos didaktikai változtatások:**
  - Minden összehasonlításnál a magyarázat kimondja: előbb azonos egységre váltunk (8 dl = 80 cl < 90 cl; 1 kg 5 dkg = 105 dkg).
  - A kerület és a terület mindig egymás mellett, ugyanazon az alakzaton jelenik meg (Tananyag-ábra, Labor II, 84. kérdés), mert a gyerekek gyakran összekeverik.
  - A rossz válaszok a tipikus hibák: 1 m 5 cm = 15 cm, 1 óra = 100 perc, csak két oldal összeadása, a négyzetek megszámolása kerület helyett, 17 − 13 = 4 nap.
  - A tankönyvi számokat (pl. 155 cm-es ágyás, 8 · 6 járólap) saját számokra cseréltük (135 cm, 9 · 5).
