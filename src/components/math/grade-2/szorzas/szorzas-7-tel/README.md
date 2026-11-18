# 6. Szorzás 7-tel

## Források
- *Matematika 2. osztályosoknak II. kötet* (`OH-MAT02TA_II.pdf`), 45–48. o. (Szorzás, osztás 7-tel), 49. o. (Szöveges feladatok – Bogarak, rovarok; csak a szorzásos típusok)
- *Matematika munkafüzet 2. osztályosoknak II. kötet* (`OH-MAT02MA_II.pdf`), 32–34. o. (a 31. oldal vegyes összeadás-kivonás gyakorlás)

## Mit tartalmaznak az oldalak?
- **TK 45.** Alakzatok 7 pálcikából (összeadás és szorzás), hétpettyes katicák rajzolása adott számú pettyből, asztali naptár: hány nap 1, 2, 4 hét, hány hét a 21 nap.
- **TK 46.** A 7-es szorzó- és bennfoglaló tábla katicákkal (ismételt összeadás → `n · 7` → `n · 7 : 7`), „hetedannyi” táblázat (sünök almái).
- **TK 47.** Egyenlő értékek párosítása (`6 · 7` – `42`, `49 : 7` – `7` …), a katica a 7 többszörösein repül, táblázat: katicák csápjai (2), szárnyai (4), lábai (6), pettyei (7).
- **TK 48.** Műveletek és páros/páratlan színezés, „kaptárak” (`· 7`, `: 7`, `· 6` szabály), nyitott mondatok (`56 : 7 < ● < 2 · 7`).
- **TK 49.** Bogaras szöveges feladatok (3 katica pettyei, „7-szer annyi”, „melyik számra gondoltam”, csiga és katica a fán, logikai feladat).
- **MF 32–34.** Tortákon gyertyák (szorzás/osztás), szorzótábla-gyakorlás, hibás eredmények javítása (hegedűk), hiányzó számok, „4-szer olyan magasra”, sorozat 7-esével, kisvonat értéke.

## A DiákZóna lecke
- **Tananyag:** hetes csoportok a hét napjaival (1 hét = 7 nap), ismételt összeadás → szorzás, a 7-es tábla pontráccsal és táblázattal, páros–páratlan váltakozás, a szöcske 7-es ugrásai (a 7 többszörösei), **trükk: 7 = 5 + 2** (`n · 7 = n · 5 + n · 2`), felcserélhetőség (`3 · 7 = 7 · 3`), „Bogarak, rovarok” rövid szöveges feladatok, 3 mintapélda, „Vigyázz!” (`7 · 7 ≠ 14`, `0 · 7 = 0`).
- **Labor I – Hetes csíkok:** a gyerek hetenként rakja ki a naptárcsíkokat (+1 / −1 hét), majd kiválasztja, hány nap ez; célzott hibaüzenet (egy héttel elszámolta), „Új feladat”.
- **Labor II – 5 + 2 trükk:** három lépés: `n · 5` (kék korongok), `n · 2` (narancs korongok), majd az összeg; ha a gyerek csak 2-t ad hozzá, a program szól.
- **Kvíz:** 30 kérdés (10/szint), 20 kérdés ábrával; csak `+ − ·` műveletek, minden szám ≤ 70.
- **Párosító:** 3 × 8 pár (szorzatok; szorzás ↔ ábra / ismételt összeadás / 5 + 2 bontás; hiányzó szám, hetek és napok). **Csoportosító:** 3 × 9 elem (szorzat; „7-es tábla páros / páratlan / nincs benne”; 35-höz viszonyítás).

## Fájlok és teszt
- `Mult7G2Parts.tsx` — közös SVG-elemek (`WeekStripPart`, `JumpLinePart`, `DotArrayPart`) és a két labor (`WeeksLab`, `FivePlusTwoLab`)
- `Mult7G2Figures.tsx` — `WeekStripsSvg`, `SevenTableArraySvg`, `SevenJumpsSvg`, `FivePlusTwoSvg`, `CommuteSevenSvg`, `LadybugsSvg` (+ `Ladybug` elem)
- `Mult7G2CardFigures.tsx` — kártyaképek (`WeeksCard`, `ArrayCard`, `JumpsCard`, `HowManyWeeksCard150`)
- `Mult7G2Theory.tsx`, `Mult7G2Quiz.tsx` (`g2-szorzas-7-quiz`), `Mult7G2Matcher.tsx` (`g2-szorzas-7-matcher`), `Mult7G2Sorter.tsx` (`g2-szorzas-7-sorter`)
- Teszt: `src/test/grade2Topic4Mult7G2.test.tsx`

## Eltérések a tankönyvtől
- **Szétválasztott szorzás és osztás:** a TK 45–48. és az MF 32–33. együtt tanítja a 7-tel való szorzást és osztást (`:` jel, „hetedannyi”, bennfoglaló tábla). Itt csak `+ − ·` szerepel; az osztás a „6. Osztás 7-tel” leckébe került.
- **Szöveges feladatok (TK 49.):** csak a szorzásos típusokat vettük át saját számokkal (katicák pettyei, „7-szer annyi”). A pettyekből katicák számát kereső, „hányad része”, „melyik számra gondoltam” (felezés, negyedelés, hetedelés) feladatok az osztás leckébe kerültek; a 6. logikai feladat (ki ugrott messzebbre) nem kapcsolódik a 7-es táblához, kihagytuk.
- **Vegyes tábla a kaptárban:** a TK 48/2. harmadik kaptára `· 6` szabályt ad a 7-es lecke közepén. A DiákZóna ezt nem keveri be; a 6-os tábla csak összehasonlításban (`5 · 7` vagy `6 · 6`) jelenik meg.
- **Háromtényezős szorzatok:** az MF 34/2. (`2 · 1 · 2 · 7`, `3 · 2 · 1 · 4`) és a TK 48/3. (`3 · 2 · 7`) három-négy tényezős szorzatot kér, amit a fejezet sehol nem tanít külön. A DiákZóna kétlépéses feladatai legfeljebb egy szorzást és egy összeadást/kivonást tartalmaznak.
- **Saját kiegészítés – 7 = 5 + 2:** a könyv ezen az oldalon csak ismételt összeadással építi fel a táblát. A DiákZóna az ismert 5-ös és 2-es táblából vezeti le (kék–narancs pontrács, labor).
- **Saját tartalom:** a hét napjai (naptárcsíkok), zsírkrétás dobozok, szöcske a számegyenesen, saját szereplők (Mira, Zoli, Peti, Lili, Bence, Dóri). A hétpettyes katica mint természeti tény megmaradt, de saját feladatokkal; a könyv sün-, sárkány- és hegedűs feladatait nem vettük át.
