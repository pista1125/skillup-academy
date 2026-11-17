# 1. A testek (3. osztály, X. Testek, síkidomok)

**Források:** tankönyv OH-MAT03TA 100–101. oldal; munkafüzet OH-MAT03MA II/23–24. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 100/1.:** gyerekszoba képe (térbeli viszonyok: alatta, fölötte, mellette…); 10 lerajzolt test, hasonló tárgyak keresése a képen; csoportosítás a testek sorszámával. **100/2.:** építőkockás vár „leltára”.
- **TK 101/3.:** testek készítése kis kockából, színes rúdból, gyurmából – melyiket csak gyurmából lehet? **101/4.:** kódtáblázat (tárgyak és testek). **101/5.:** építmények és alaprajzuk (a négyzetben: hány kocka áll ott egymáson); építés alaprajz szerint.
- **MF II/23/1–3.:** tárgy ↔ test, épületek ↔ test, sütemények ↔ sütőforma. **MF II/24/4.:** melyik testhez melyik lapok tartozhatnak (kör, téglalap, háromszög, négyzet). **24/5–6.:** építmények kockaszáma, alaprajz kitöltése, építés alaprajz szerint.

A könyv ezen az oldalpáron név szerint csak a **kockát**, a **téglatestet** (102. o.) és – a munkafüzet „nevezzétek meg” feladatában – a **gömböt** várja. Szavai: *test, lap, határolja, alaprajz, kis kocka*. Él és csúcs (testnél), henger, kúp, gúla, síklap, görbe felület **nem** szerepel.

## Mit csinál a DiákZóna lecke?

Testek a környezetünkben (dobókocka, cipősdoboz, labda, konzervdoboz, fagyitölcsér, piramis, sátor, fordított tál), a test **lapjai** (körberajzolva: négyzet, téglalap, háromszög, kör), a testek csoportosítása: **csak lapok határolják** / **görbe része is van** (gurul, csak gyurmából építhető), építés kis kockákból és az **alaprajz** (a szám = hány kocka áll egymáson, az összes kocka = a számok összege, a takart kockák is ott vannak). Saját példák és számok; a könyv szereplőit (Manó stb.) nem vettük át.

## Komponensek

1. **`SolidsG3Parts.tsx`** – a fejezet közös testrajzai: általános konvex-test rajzoló (`PolySolid`, a látható lapokat a lap normálisa dönti el, a **takart élek szaggatottak**), `boxGeom`, `pyramid4Geom`, `pyramid3Geom`, `tentGeom`, görbe testek (`CylinderShape`, `ConeShape`, `SphereShape`, `DomeShape`), egységes testkészlet (`Solid`, `SOLID_INFO`), kis kockás építmény (`CubeBuilding`, `FitBuilding`) és alaprajz (`PlanGrid`). A 2. lecke is ezt használja.
2. **`SolidsG3Figures.tsx`** – `SolidsAroundUsSvg`, `SolidFacesSvg`, `FlatOrCurvedSvg`, `BuildingPlanSvg`.
3. **`SolidsG3CardFigures.tsx`** – kártyaábrák: `SolidCard`, `PlanCard`, `BuildingCard`.
4. **`SolidsG3Theory.tsx`** – Mit tanulunk?, a test lapjai, csak lapok / görbe rész, építés és alaprajz, 3 mintapélda, „Vigyázz!” (a görbe rész nem lap; a rejtett kockák).
   - **Labor I – Írd fel az alaprajzot!** Véletlen lépcsős építmény (2 × 3 alaprajz). A gyerek a négyzetekre koppintva állítja be a számokat, mellette élőben megépül az ő építménye. Ellenőrzésnél megmondja, hol tér el („hátul középen 2 kocka áll egymáson, nálad 1”), utána: „Hány kis kocka van összesen?” – ha a négyzetek számát írja, erre külön figyelmeztet. „Új feladat”.
   - **Labor II – Melyik testre gondoltam?** 1–3 nyom (pl. „Van görbe része.” „2 kör alakú lapja van.”), a gép mindig olyan nyomokat választ, amelyek pontosan egy testre igazak a 9-ből. Rossz tippnél leírja a választott test lapjait, és megmutatja, melyik nyom nem igaz rá. „Új feladat”.
5. **`SolidsG3Quiz.tsx`** – `SOLIDS_G3_QUESTIONS`: 30 kérdés (10/10/10), 29 kérdésnél ábra, minden kérdésnél badge, 3 puska. Azonosító: `g3-geom-testek-quiz`.
6. **`SolidsG3Matcher.tsx`** – `SOLIDS_G3_MATCHER_LEVELS`: test képe ↔ hasonló tárgy (8/8 kép); építmény vagy alaprajz ↔ kockák száma (8/8 kép); leírás ↔ test képe (8/8 kép). `g3-geom-testek-matcher`.
7. **`SolidsG3Sorter.tsx`** – `SOLIDS_G3_SORTER_LEVELS`: csak lapok / lap és görbe rész / csak görbe rész; van háromszög lapja / van kör lapja / csak négyzet és téglalap lapja; 6 lap / 5 lap / 1 vagy 2 lap. Kategóriánként 4–5 képes elem. `g3-geom-testek-sorter`.

**Teszt:** `src/test/grade3Topic10SolidsG3.test.tsx`

## Eltérések a tankönyvtől

- **Megnevezés előtti névkérés (MF II/25/2b):** a munkafüzet a fehéren maradt testek megnevezését kéri, de a gömb nevét a 3. osztályos könyv sehol sem tanítja. Nálunk a gömb név az elején, a labdához kötve szerepel; a többi görbe és hegyes test (henger, kúp, gúla – ezeket a könyv sem nevezi meg) nálunk „konzervdoboz alakú”, „tölcsér alakú”, „piramis alakú”, „sátor alakú”, „tál alakú” test. Új szakszót nem vezetünk be.
- **„Lap” és görbe rész (TK 101/3, 103/5d):** a könyv a henger alját „kör alakú lap”-nak hívja, de azt nem mondja ki, hogy a görbe oldal nem lap, és nem ad szót a görbe részre. Nálunk egyértelmű: a lap lapos; a görbe rész nem lap (a konzervdoboznak 2 lapja van, nem 3). A „Vigyázz!” doboz pont erről szól; a könyv szóhasználata alapján „görbe rész”-t mondunk („görbe vonal” a 104. oldalon szerepel), nem „görbe felület”-et.
- **A gyurmás kérdés (TK 101/3)** – „melyiket nem lehetett másból megformálni? Miért?” – válasz nélkül marad. Nálunk kimondjuk: a görbe részű testeket kis kockákból nem lehet megépíteni.
- **Alaprajz:** a könyv nem mondja ki, hogy a hátsó sor van fölül, és hogy a takart kockákat is számolni kell. Nálunk az alaprajzokon „hátul / elöl” felirat van, és a laborban élőben látszik, mi épül a számokból. A kvízben a „négyzetek száma” a tipikus rossz válasz (külön magyarázattal).
- **Tudatos didaktikai változtatások:**
  - A testek tiszta, egységes ferde rajzon szerepelnek, a takart élek szaggatottak (a könyv rajzai is így), a görbe testeknél a hátsó alapkör-ív szaggatott.
  - A „Melyik testre gondoltunk?” (TK 103/5) mintájára készült rejtvény-labor mindig egyértelmű (a könyvben a b) állítás három testre is igaz – lásd a 2. leckét).
  - A tárgyak (sütemény, épület, szoba) helyett saját, egyszerű mindennapi tárgyak.
