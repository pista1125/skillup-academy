# 2. Testek, síkidomok (2. osztály, VII. Geometria)

## Források
- **TK II/4**: osztálytermi kép síkidomokkal és építőkockákkal (leltár), testek tapintása csukott szemmel, testek építése fehér kockákból („Hány kockát kellett felhasználni?”).
- **TK II/5**: tárgyak párosítása testekkel (téglatest, kocka, gömb, henger, kúp), testek és síkidomok helye kódos táblázatban.
- **TK II/6**: rúd oldallapjainak körberajzolása, „Melyik testhez mely lapok tartozhatnak?” (gömb, kocka, gúlák, henger, kúp, hasábok), „Melyik testhez nem találtál lapot?”.
- **TK II/7**: testek és síkidomok csoportosítása, síkidomok számolópálcikákból („hány oldala van”), háromszögek hajtogatása, logikai lapos sorok.
- **TK II/8–9**: kakukktojás síkidomsorokban, ábrák logikai lapokból, síkidomos sorminta, kódfejtés (NÉGYZET, TÉGLALAP, HÁROMSZÖG) és a síkidomok befejezése vonalzóval.
- **MF II/4–5**: testek / síkidomok / vonalak csoportosítása, egyforma síkidomok színezése, ábrák logikai lapokból, tervezés négyzetrácson, síkidomok egyenes vagy görbe határ szerint.

## Mit tanul a gyerek a DiákZónán?
- **Test vagy síkidom?** – a test megfogható, a síkidom lapos.
- **6 test neve**: kocka, téglatest, gömb, henger, kúp, gúla; mire hasonlít, gurul-e, milyenek a lapjai. A rajzokon a nem látható élek szaggatottak.
- **Körberajzolás (lenyomat)**: a test lapja síkidom; a gömbnek nincs lapja.
- **Síkidomok**: háromszög, négyzet, téglalap, ötszög, hatszög, kör; oldal és csúcs, pálcikákból kirakva.
- **Építés kockákból**: oszloponkénti számlálás, egy rejtett hátsó sor.
- **2 interaktív labor**:
  1. *Kockaépítő* – véletlen épületet kell oszloponként + / − gombokkal megépíteni; a hibás oszlopokat megnevezi.
  2. *Lenyomat-nyomozó* – egy körberajzolt lap (kör, négyzet, téglalap, háromszög) alapján ki kell jelölni az összes testet, amely ilyen nyomot hagyhat (pl. kör: henger és kúp is); a gömb választásakor elmagyarázza, hogy nincs lapja.

## Fájlok és teszt
- `ShapesG2Parts.tsx` – `SolidPart` (testek szaggatott hátsó élekkel), `FlatPart`, `SticksPart`, `CubeBuildingPart`, a két labor
- `ShapesG2Figures.tsx` – `SolidVsFlatSvg`, `SolidsGallerySvg`, `FacesPrintSvg`, `FlatShapesSvg`, `SideCornerSvg`, `CubeBuildSvg`
- `ShapesG2CardFigures.tsx` – kártyaképek (test, síkidom, pálcika-síkidom, kockaépítmény, vonal)
- `ShapesG2Theory.tsx` – tananyag
- `ShapesG2Quiz.tsx` – 30 kérdés (`g2-geo-testek-quiz`)
- `ShapesG2Matcher.tsx` – 3 × 8 pár (`g2-geo-testek-matcher`)
- `ShapesG2Sorter.tsx` – 3 × 3 × 9 elem (`g2-geo-testek-sorter`)
- Teszt: `src/test/grade2Topic7ShapesG2.test.tsx`

## Eltérések a tankönyvtől
- **A testek nevét kimondjuk**: a tankönyv a testeket csak képen mutatja (II/5–6), a nevüket nem írja le. A DiákZóna megtanítja a kocka, téglatest, gömb, henger, kúp, gúla nevét. A hasábokat (II/6, hatszög és háromszög alapú) nem nevezzük meg, mert 2. osztályban nem cél.
- **Szaggatott hátsó élek**: a tankönyv testrajzain a nem látható élek nem látszanak; mi a magyar rajzi szokás szerint szaggatott vonallal jelöljük őket.
- **Szókincs**: testeknél „lap”, síkidomoknál „oldal” és „csúcs” (a könyv II/7-en „oldala”, II/13-on „csúcspont”). Az „él” szót nem vezetjük be, mert a könyv sem használja.
- **Egyértelmű téglatest**: a mi téglatestünk lapjai mind téglalapok (nincs négyzet lapja), így a lenyomat-feladatok egyértelműek; a „négyzet nyomot” a kocka és a négyzet alapú gúla hagyja.
- **A négyzet is téglalap**: ezt egy mondatban kimondjuk, ezért egyetlen feladatban sem kell választani a „négyzet” és a „téglalap” név között egy négyzet esetén.
- **Rejtett kockák**: a TK II/4/3 első épületében hátsó, nem látható kockák is vannak, de a feladat ezt nem jelzi. Nálunk a rejtett sor szövegben is szerepel („mögötte még ugyanennyi”).
- **Kódos táblázat**: a TK II/5 kódos feladatát a tájékozódás lecke (1. lecke) dolgozza fel egységes kódolással.
- Minden feladat, név és ábra saját.
