# 5. Megálló – tudáspróba (3. osztály, X. Testek, síkidomok)

**Források:** tankönyv OH-MAT03TA 100–107. oldal, munkafüzet OH-MAT03MA II. kötet 23–31. oldal (a fejezet mind a négy leckéje).

## Mit tartalmaznak a könyv oldalai?

A X. fejezetnek a könyvben **nincs** külön összefoglaló (Megálló / „Ellenőrizd a tudásodat!”) oldala: a TK 100–107. és az MF II/23–31. oldal a négy lecke feladatait tartalmazza:

- **A testek (TK 100–101, MF 23–24):** testek a szobában és az épületeken, testek csoportosítása, építés kis kockákból, alaprajz számokkal (hány kocka áll egymáson).
- **A téglatest és a kocka (TK 102–103, MF 25–26):** téglatestek kis kockákból, kockává egészítés, a lapok alakja és nagysága, testháló, „Melyik testre gondoltunk?”, kakukktojás.
- **Síkidomok, sokszögek (TK 104–105, MF 27–29):** síkidom és sokszög (csak egyenes szakaszok), háromszög, négyszög, ötszög, hatszög; oldalak és csúcsok száma; téglalap, négyzet; igaz–hamis állítások; kakukktojás; pálcikás feladatok.
- **Tükrözések, szimmetria (TK 106–107, MF 30–31):** félbehajtás, tükörtengely, tengelyek száma, tükörkép négyzethálón.

## Mit csinál a DiákZóna tudáspróba?

Az elmélet „Amit már tudsz” összefoglaló a 4 leckéről (testek és lapjaik, alaprajz; téglatest, kocka, háló; síkidom, sokszög, oldal, csúcs; tükörtengely, tükörkép a rácson), 3 vegyes mintapélda, csapdák (a görbe rész nem lap; kör vagy gömb; az alaprajz négyzeteinek száma ≠ kockák száma), és két labor. A 90 kérdés 30-30-30 szinten fedi le a fejezetet; a rossz válaszok a tipikus hibák.

## Komponensek

1. **`ShapesExamG3Parts.tsx`** – `PlaneShape` / `POLY` (21 síkidom: oldalak száma, tükörtengelyek száma, név), `Sticks` (pálcikák), Labor I: `makeMixedTask`, `mix4`; Labor II: `ODD_ROUNDS`, `makeOddRound`, `OddArt`. A testekhez az 1. lecke (`a-testek/SolidsG3Parts`: `Solid`, `FitBuilding`, `PlanGrid`), a téglatesthez/hálóhoz a 2. lecke (`a-teglatest-es-a-kocka/CuboidG3Parts`: `Box`, `NetGrid`, `CuboidNet`, `CUBE_NETS_OK/BAD`), a tükrözéshez a 4. lecke (`tukrozesek-szimmetria/SymmetryG3Parts`) rajzait használja – így a testek, síkidomok ugyanúgy néznek ki és ugyanazt a nevet kapják, mint a leckékben (takart élek szaggatottak, derékszög negyedkörív + pont).
2. **`ShapesExamG3Figures.tsx`** – `ExamSolidsSvg`, `ExamCuboidSvg`, `ExamPolygonsSvg`, `ExamSymmetrySvg`.
3. **`ShapesExamG3CardFigures.tsx`** – `MSolid`, `MShape`, `MHeart`, `MPlan` (párosító), `SSolid`, `SShape`, `SHeart`, `STallBox` (csoportosító).
4. **`ShapesExamG3Theory.tsx`** – `ShapesExamG3Theory`.
   - **Labor I – Vegyes feladatgép:** véletlen feladat 5 fajtából: alaprajz → hány kis kocka; sokszög → hány oldal / csúcs; síkidom → hány tükörtengely; pont a rácson → hány kockányira a tükörkép (a tengelytől vagy a ponttól); test → hány lap. 4 válaszgomb, hiba esetén a hibához illő tipp („A görbe rész nem lap!”, „Add össze az összes számot!”), jó válasznál a magyarázat.
   - **Labor II – Kakukktojás-kereső:** 4 kép (testek, síkidomok, tárgyak, betűk), a gyerek a kakukktojásra koppint; 10 forduló véletlen sorrendben, indoklással.
5. **`ShapesExamG3Quiz.tsx`** – `SHAPES_EXAM_G3_QUESTIONS`: 90 kérdés (30/30/30), 76 ábrával, minden kérdésnél badge, 3 puska. Azonosító: `g3-geom-tudasproba-quiz`.
6. **`ShapesExamG3Matcher.tsx`** – `SHAPES_EXAM_G3_MATCHER_LEVELS`: test ↔ név; sokszög ↔ oldalak száma és név; alaprajz ↔ kockák száma és síkidom ↔ tükörtengelyek száma. Minden kártyapárnak van képe. `g3-geom-tudasproba-matcher`.
7. **`ShapesExamG3Sorter.tsx`** – `SHAPES_EXAM_G3_SORTER_LEVELS`: test / sokszög / nem sokszög síkidom; háromszög / négyszög / ötszög vagy hatszög; „4 oldala van” / „6 lapja van” / „pontosan 1 tükörtengelye van”. Minden elemnek van képe. `g3-geom-tudasproba-sorter`.

**Teszt:** `src/test/grade3Topic10ShapesExamG3.test.tsx` (a kockaháló-kérdések hálóit a 2. lecke `foldsToCube` függvénye ellenőrzi).

## Eltérések a tankönyvtől

- **Nincs összefoglaló oldal a könyvben:** a X. fejezet a 107. oldallal véget ér, Megálló vagy „Ellenőrizd a tudásodat!” nélkül. A tudáspróba teljesen saját feladatsor a 4 lecke anyagából, saját számokkal és ábrákkal.
- **Nevek:** a könyv a testek közül csak a kockát, a téglatestet (és a munkafüzetben a gömböt) nevezi meg, a síkidomok közül a háromszöget, négyszöget, ötszöget, hatszöget, téglalapot, négyzetet, kört. Mi is csak ezeket használjuk; a többi test „piramis / sátor / konzervdoboz / tölcsér / tál alakú test” (mint az 1. leckében), a többi négyszög „ferde négyszög”, „sárkány alakú” (mint a 3–4. leckében). A „hétszög”, „nyolcszög” csak a párosítóban, a könyv szabálya szerint képzett névként („a sokszögeket oldalaik és csúcsaik száma szerint nevezik el”, TK 104) szerepel.
- **„Melyik testre gondoltunk?” (TK 103/5):** a „Van négyzet alakú lapja” állítás három testre is igaz. Nálunk minden „melyik test?” kérdésnek egyetlen jó válasza van.
- **„Hány különböző méretű lap?” (TK 103/4b):** a válasz a téglatesttől függ. Mi egy konkrét, rajzolt téglatestre kérdezünk (3 különböző méret → 3-féle lap).
- **Igaz–hamis állítások (TK 105/5):** a könyv állításait nem vettük át szó szerint; saját állítások, és a kérdés egyszer az igazat, egyszer a hamisat kéri.
- **Tudatos didaktikai változtatások:**
  - A rossz válaszok a tipikus hibák: a görbe részt is lapnak számolja (3 lap a konzervdoboznál), az alaprajz négyzeteit számolja a kockák helyett, kör ↔ gömb, négyzet ↔ kocka, eltolás a tükörkép helyett, a téglalap átlója tükörtengely.
  - Kétlépéses 3. szintű feladatok: két test lapjai összesen, kockává egészítés rétegekkel, az alaprajz hiányzó száma, a pont és a tükörképe közti távolság, a piramis alakú test lapjainak összes oldala.
  - A pálcikás feladatokban (TK 105/7 mintájára) a közös pálcikát csak egyszer számoljuk – ezt a magyarázat kimondja.
