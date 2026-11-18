# 3. Szimmetria, tükrözés (2. osztály, VII. Geometria)

## Források
- **TK II/10**: tükrös mozgásjáték, festékes félbehajtás, kivágott alakzatok párosítása a félbehajtott papírral, betűk (A, T, H, I) felének színezése a tengelyhez.
- **TK II/11**: síkidomok félbehajtása, a hajtásvonal megrajzolása (kör, négyzet, téglalap, háromszög, deltoid), bal–jobb oldal eltéréseinek keresése, ábrák másik felének megrajzolása négyzetrácson („Ezek az alakzatok szimmetrikusak”).
- **TK II/12**: békák tükörképe a vízben, kislány tükörképe, vitorlások és tükörképeik párosítása.
- **TK II/13**: háromszög tükrözése gombostűvel, kódok szerinti színezés és tükrözés, tükrözés négyzetrácson tükörrel.
- **MF II/6–11**: félbehajtás és nyírás, képek felezése, szimmetrikus vár kiválasztása, ábrák másik felének megrajzolása (függőleges és vízszintes tengely), cserép másik fele, a sor elején lévő ábra tükörképe, kutya és tükörképe, logikai lapos ábrák tükrözése, cica színezése a tükör szerint, síkidomok félbehajtása, számok a tükörben (3, 8, 0, 30, 38, 88), tükrözés pontrácson (ferde tengellyel is), síkidomok csoportosítása „van / nincs tükörtengelye”, tükrös számtáblás játék.

## Mit tanul a gyerek a DiákZónán?
- **Tükörkép**: a jobb és a bal felcserélődik, a tükörkép ugyanolyan messze van a tükörtől; a víz tükre (vízszintes tengely).
- **Tükörtengely**: félbehajtva a két rész fedi egymást; szimmetrikus (tükrös) alakzat.
- **Tükrözés négyzetrácson**: mezőszámlálás a tengelytől, ugyanabban a sorban.
- **Tükrös betűk, számjegyek, síkidomok**: függőleges / vízszintes tengely, a négyzetnek 4, a téglalapnak 2, az egyenlő szárú háromszögnek 1 tengelye van; az átló nem mindig tengely.
- **2 interaktív labor**:
  1. *Tükörrajzoló* – véletlen minta függőleges vagy vízszintes tengellyel; a gyerek a túloldalon mezőkre koppintva rajzolja meg a tükörképet, a gép jelzi a hiányzó / fölösleges mezőket, és külön felismeri, ha a mintát csak áttolta; „Segítség” gomb.
  2. *Tükrös vagy nem?* – véletlen rácsminta, amely tükrös vagy egy mezővel elrontott; válasz után sárgán megmutatja a pár nélküli mezőt.

## Fájlok és teszt
- `SymmetryG2Parts.tsx` – rács, tükrözőfüggvények, vonalas betűk és számjegyek, síkidomok tengelyekkel, a két labor
- `SymmetryG2Figures.tsx` – `MirrorKidSvg`, `FoldCutSvg`, `GridMirrorSvg`, `SymmetricLettersSvg`, `ShapeAxesSvg`, `WaterReflectionSvg`
- `SymmetryG2CardFigures.tsx` – kártyaképek (fél és egész alakzat, síkidom, betű, oszlopcsík, minitükrözés)
- `SymmetryG2Theory.tsx` – tananyag
- `SymmetryG2Quiz.tsx` – 30 kérdés (`g2-geo-szimmetria-quiz`)
- `SymmetryG2Matcher.tsx` – 3 × 8 pár (`g2-geo-szimmetria-matcher`)
- `SymmetryG2Sorter.tsx` – 3 × 3 × 9 elem (`g2-geo-szimmetria-sorter`)
- Teszt: `src/test/grade2Topic7SymmetryG2.test.tsx`

## Eltérések a tankönyvtől
- **Egységes mezőkód**: a TK II/13/2 kódjaiban a betű a sort, a szám az oszlopot jelöli, a TK II/5-ön fordítva. Mi kódok helyett „hányadik oszlop / hányadik sor a tengelytől” számlálással dolgozunk, a kódolást az 1. lecke egységesen tanítja.
- **Csak függőleges és vízszintes tengely**: a MF II/10/3 ferde (átlós) tengelyű tükrözése pontrácson 2. osztályban túl nehéz és papír/tükör nélkül nem ellenőrizhető; a DiákZóna csak függőleges és vízszintes tengellyel tükröz. Helyette kimondjuk, hogy a téglalap átlója nem tengely (gyakori tévhit).
- **Nincs szorzás a geometria leckében**: a MF II/11/2 tükrös számtáblás játéka szorzásokat kér; ezt kihagytuk, a geometriában csak darabszámot számolunk.
- **„Áttolás” mint tipikus hiba**: a könyv nem figyelmeztet arra, hogy sok gyerek tükrözés helyett átmásolja (eltolja) a mintát. Nálunk ez külön csapda, külön csoportosító-kategória és a labor is felismeri.
- **Fogalmak kimondása**: a könyv a „tükörtengely” szót csak a MF II/11-en, a „szimmetrikus” szót a TK II/11-en használja definíció nélkül; mi egy mondatban meghatározzuk („félbehajtva a két rész fedi egymást”).
- **Tengelyek száma**: a párosító 2. szintjén a szabályos ötszög és hatszög tengelyszáma is szerepel – ez a könyvben nincs, a gyerek próbálgatással (hajtogatással) fedezheti fel.
- Minden feladat, név és ábra saját.
