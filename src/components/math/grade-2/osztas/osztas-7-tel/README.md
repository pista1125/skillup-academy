# 6. Osztás 7-tel

## Források
- *Matematika 2. osztályosoknak II. kötet* (`OH-MAT02TA_II.pdf`), 45–48. o. (Szorzás, osztás 7-tel), 49. o. (Szöveges feladatok – Bogarak, rovarok), 50. o. (Maradékos osztás 7-tel)
- *Matematika munkafüzet 2. osztályosoknak II. kötet* (`OH-MAT02MA_II.pdf`), 32–34. o.

## Mit tartalmaznak az oldalak?
- **TK 45.** Hány hétpettyes katicához elég a pettysor; naptár: hány hét a 21 nap.
- **TK 46.** A 7-es szorzó- és bennfoglaló tábla egymás mellett (`14 : 7` … `70 : 7`), „hetedannyi” táblázat (sünök almái).
- **TK 47–48.** Szorzás–osztás párosítás, a 7 többszörösei, katicák csápjai/szárnyai/lábai/pettyei táblázatban, osztások páros/páratlan színezése, kaptárak (`: 7` szabály), nyitott mondat (`56 : 7 < ● < 2 · 7`).
- **TK 49.** Szöveges feladatok: hány katica 42 pettyhez, „7-szer annyi” hangya, „melyik számra gondoltam” (felének, negyedének, hetedének …), csiga és katica a fán.
- **TK 50.** Maradékos osztás 7-tel: hangyák csoportosítása hetesével (`□ · 7 + □ = 18`), pálcikák csoportosítása (`8 : 7 = □ marad □, mert 8 = □ · 7 + □`), a hétfejű sárkány 31 almája.
- **MF 32–34.** Tortákon gyertyák, szorzás–osztás gyakorlás, hibás eredmények javítása, hiányzó osztandó (`□ : 7 = 8`), nyitott mondatok, „hetede” szöveges feladat (35 katica, lepkék).

## A DiákZóna lecke
- **Tananyag:** bennfoglalás („hány hetes van benne?”, tulipáncsokrok), szétosztás 7 részre (eper 7 tányéron), **napokból hetek** (naptár: egy sor egy hét), a 7-es bennfoglaló tábla a szorzás mellé írva, **hétszerese / hetede**, **maradékos osztás** a fejezet jelölésével („Ennyi csoport / Ennyi maradt”) és szorzásos ellenőrzéssel (`3 · 7 + 4 = 25`), „hány csónak kell?” (felfelé kerekítés), a hét napjai körbe járnak, bogaras szöveges feladatok, 3 mintapélda, „Vigyázz!” (a maradék kevesebb, mint 7).
- **Labor I – Szétosztás 7 tányérra:** a gyerek koppintással vagy „Mindenkinek 1-1” gombbal osztja ki az epreket, majd megadja, mennyi jutott egy tányérra. Visszajelzés: maradt a kosárban / nem egyforma / jó válasz + ellenőrzés.
- **Labor II – Maradékos osztás 7-tel:** a korongok hetes sorokban állnak; a gyerek soronként bekarikáz 7-et, majd léptetővel megadja a csoportok számát és a maradékot. Ha a maradék ≥ 7, a program figyelmeztet.
- **Kvíz:** 30 kérdés (10/szint), 20 kérdés ábrával; `+ − · :` műveletek, minden szám ≤ 70.
- **Párosító:** 3 × 8 pár (hányados; szorzás ↔ osztás; maradékos osztás). **Csoportosító:** 3 × 9 elem (hányados; maradék 0/1/3; 5-höz viszonyítás, „hetede”).

## Fájlok és teszt
- `Div7G2Parts.tsx` — közös SVG-elemek (`PlatePart`, `DotRowsPart`, `DayGridPart`, `JumpLinePart`) és a két labor (`ShareLab`, `RemainderLab`)
- `Div7G2Figures.tsx` — `GroupingSevensSvg`, `SharingPlatesSvg`, `WeeksDaysSvg`, `SeventhArrowsSvg`, `RemainderGroupsSvg`, `RoundUpBoatsSvg` (+ `Tulip` elem)
- `Div7G2CardFigures.tsx` — kártyaképek (`DotsCard`, `CalendarCard`, `JumpsToCard`, `PlatesCard`, `HowManyWeeksCard150`)
- `Div7G2Theory.tsx`, `Div7G2Quiz.tsx` (`g2-osztas-7-quiz`), `Div7G2Matcher.tsx` (`g2-osztas-7-matcher`), `Div7G2Sorter.tsx` (`g2-osztas-7-sorter`)
- Teszt: `src/test/grade2Topic5Div7G2.test.tsx`

## Eltérések a tankönyvtől
- **Maradékos jelölés:** a TK 50. oldala itt új alakot vezet be (`8 : 7 = □ marad □`). A korábbi maradékos leckékkel egységesen a „Ennyi csoport / Ennyi maradt” jelölést használjuk, és nem írunk „… : 7 = … marad …” egyenlőséget (ez matematikailag nem egyenlőség). Ellenőrzésként a könyv „mert 8 = 1 · 7 + 1” alakját vettük át, `1 · 7 + 1 = 8` formában.
- **„A maradék kevesebb, mint 7”:** a könyv csak a sárkányos feladatban utal rá („7-nél kevesebb almája maradt”); a DiákZóna a „Vigyázz!” dobozban, a laborban és egy kvízkérdésben is kimondja.
- **Háromlépéses feladatok:** a TK 49/4. „24 negyedének és a 7-nek a szorzata” és a TK 49/5. (63 cm hétszer annyi, aztán 35 cm-ről indul) több lépéses. A DiákZóna legfeljebb kétlépéses, rövid feladatokat ad („a 49 hetedének a kétszerese”, „hány szöcske és katica összesen”).
- **Logikai feladat kihagyva:** a TK 49/6. (ki ugrott messzebbre) nem kapcsolódik az osztáshoz.
- **Vegyes tábla a kaptárban:** a TK 48/2. harmadik kaptára `· 6` szabályt kér a 7-es leckében; nem vettük át.
- **Saját kiegészítés:** napokból hetek és a „hét napjai körbe járnak” (15 nap múlva milyen nap lesz) a maradékos osztás hétköznapi alkalmazása; „hány csónak kell?” (felfelé kerekítés) a korábbi leckék kalitkás feladatának párja.
- **Szétválasztott fejezetek:** a TK 45–48. együtt tanítja a szorzást és az osztást; a 7-es szorzás a „6. Szorzás 7-tel” leckében van, itt az osztás áll a középpontban.
- **Saját tartalom:** saját helyzetek (tulipáncsokrok, eper tányéron, matricák, ceruzakötegek, csónakázás, Anna cseresznyéi, szöcskék és katicák). A hétpettyes katica mint természeti tény megmaradt; a könyv sün-, sárkány- és hangyás feladatait nem vettük át.
