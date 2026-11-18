# 3. Osztás 4-gyel

## Források
- *Matematika 2. osztályosoknak I. kötet* (`OH-MAT02TA_I.pdf`), 100–103. o. (Szorzás, osztás 4-gyel), 105–106. o. (Maradékos osztás 4-gyel), 107. o. (Szöveges feladatok – Állatkertben); a 104. oldal (2-es és 4-es tábla kapcsolata) a „kétszer felezés” trükk alapja.
- *Matematika munkafüzet 2. osztályosoknak I. kötet* (`OH-MAT02MA_I.pdf`), 66–68. o.

## Mit tartalmaznak az oldalak?
- **TK 100.** Bennfoglalás (16 zebra, egy karámba 4 fér) és szétosztás (20 köteg széna, egy szamárnak 4 jut) rajzos csoportosítással.
- **TK 101–103.** A 4-es tábla mellett a bennfoglaló tábla (`0 : 4 = 0` … `40 : 4 = 10`), fókák–halak táblázat, képhez illő műveletsor (`12 : 4`, `16 : 4`), „négyszerese / negyede” nyilak, hiányzó számok, betűrejtvény, szabálysorozat (`: 4`, `+ 14`).
- **TK 105–106.** Maradékos osztás: kerekasztal-módszer (23 korong 4 gyereknek), karámajtók 10 pálcikából, 18 alma 4 állatnak, 11 papagáj kalitkákba („Minden kalitkában 4 papagáj lesz?”), csoportosítás négyesével. Jelölés: **„Ennyi csoport: □ Ennyi maradt: □”** (a kötet itt nem ír maradékos műveletet).
- **TK 107.** Állatkerti szöveges feladatok (heringek egy hétre, „négyszer annyi”, banánok 4 majomnak, mangók maradékkal).
- **MF 66–68.** Egyenlő szétosztás (24 hal 4 pingvinnek), osztások, hiányzó osztandó (`9 = □ : 4`), „négyszer annyi” szöveges feladat, maradékos szétosztás (13 narancs 4 majomnak), retkek, vidrák.

## A DiákZóna lecke
- **Tananyag:** bennfoglalás („hány négyes van benne?”), szétosztás 4 részre, a 4-es bennfoglaló tábla a szorzás mellé írva, **négyszerese / negyede**, trükk: **felezd kétszer** (a 2-es tábla segít), **maradékos osztás** a könyv jelölésével („Ennyi csoport lett / Ennyi maradt”) és szorzásos ellenőrzéssel (`5 · 4 + 3 = 23`), „hány kalitka kell?” (felfelé kerekítés), 3 mintapélda, „Vigyázz!” (a maradék kevesebb, mint 4).
- **Labor I – Szétosztás 4 tányérra:** a gyerek koppintással vagy „Mindenkinek 1-1” gombbal osztja ki a sütiket (kerekasztal-módszer), majd megadja, mennyi jutott egy tányérra. Visszajelzés: maradt a kosárban / nem egyforma / jó válasz + ellenőrzés.
- **Labor II – Maradékos osztás 4-gyel:** a gyerek négyesével bekarikázza a korongokat, majd léptetővel megadja a csoportok számát és a maradékot. Ha a maradék ≥ 4, a program figyelmeztet.
- **Kvíz:** 30 kérdés (10/szint), 20 kérdés ábrával; `+ − · :` műveletek, minden szám ≤ 40.
- **Párosító:** 3 × 8 pár (hányados; szorzás ↔ osztás; maradékos osztás). **Csoportosító:** 3 × 9 elem (hányados; maradék 0/1/2; 5-höz viszonyítás, „negyede”).

## Fájlok és teszt
- `Div4G2Parts.tsx` — közös SVG-elemek (`FourBoxPart`, `PlatePart`, `DotRowsPart`, `JumpLinePart`) és a két labor (`ShareLab`, `RemainderLab`)
- `Div4G2Figures.tsx` — `GroupingPensSvg`, `SharingPlatesSvg`, `FourthArrowsSvg`, `HalveTwiceSvg`, `RemainderGroupsSvg`, `RoundUpCagesSvg`
- `Div4G2CardFigures.tsx` — kártyaképek (`PlatesCard`, `BoxesCard`, `JumpsToCard`, `HowManyBoxesCard150`, `DotsCard`)
- `Div4G2Theory.tsx`, `Div4G2Quiz.tsx` (`g2-osztas-4-quiz`), `Div4G2Matcher.tsx` (`g2-osztas-4-matcher`), `Div4G2Sorter.tsx` (`g2-osztas-4-sorter`)
- Teszt: `src/test/grade2Topic5Div4G2.test.tsx`

## Eltérések a tankönyvtől
- **Maradékos jelölés:** a könyv („Ennyi csoport / Ennyi maradt”) jelölését használjuk; nem írunk „23 : 4 = 5 (maradék 3)” alakot. Ellenőrzésként a szorzás + összeadás alakot adjuk (`5 · 4 + 3 = 23`), ami csak ismert műveleteket használ.
- **„A maradék kevesebb, mint 4”:** a könyv ezt nem mondja ki; a DiákZóna „Vigyázz!” dobozban, a laborban és egy kvízkérdésben is kiemeli, mert ez a leggyakoribb hiba.
- **Nincs törtrész:** a TK 105/3. b) („Hogyan osztanád el a maradék almákat a 4 állat között?”) a fél/negyed alma felé vezet, ami tört. A DiákZóna a maradékot egészként hagyja.
- **A tábla határa:** a TK 107/7. feladata (anya kétszer annyi, mint a bocs, összesen 36 hal) `36 : 3 = 12`-t kíván, ami túllép a 3-as táblán, és háromlépéses. Nem vettük át.
- **Félreérthető ábra:** az MF 66/2. feladatában a 8 zsiráf szabálytalan közökkel (2, 3, 2, 1 csoportokban) áll, miközben 4 egyenlő részre kellene osztani. A DiákZóna ábrái mindig egyforma tányérokat, karikákat mutatnak.
- **Felezd kétszer:** a DiákZóna saját kiegészítése a 2-es és 4-es tábla kapcsolatából (TK 104.): a negyed a fele fele.
- **Szétválasztott fejezetek:** a TK 100–103. együtt tanítja a szorzást és az osztást; a 4-es szorzás a „3. Szorzás 4-gyel” leckében van, itt az osztás áll a középpontban.
- **Saját tartalom:** saját szereplők és helyzetek (bárányok, sütik tányéron, golyók, nyuszik, cukrok, matricák); a könyv állatkerti feladatait nem vettük át.
