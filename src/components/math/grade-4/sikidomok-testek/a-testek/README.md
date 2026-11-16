# 3. A testek (V. Síkidomok és testek, 3. lecke)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., **118–122. oldal**) és munkafüzet (`OH-MAT04MA_II`, **31–36. oldal**) alapján kidolgozott modul 4. osztályosoknak.

---

## Tananyag Áttekintés

- **Tankönyv 118. o.:** melyik tárgy melyik testre hasonlít (vödör, hógolyó, iglu, jégkocka, jégtömb, hógolyókupac – félgömb, kúp, kocka, gömb, henger, gúla, téglatest); „A gömböt görbe felület határolja.”, „A téglatestet síklapok határolják.”; csoportosítás halmazábrában (síklapok / görbe felületek határolják).
- **119. o.:** tárgyak válogatása (Rubik-kocka, dinnye, tejesdoboz, konzerv, labda, sakkfigurák); építmények kis kockákból – kockák megszámolása, **alaprajz** készítése, építés alaprajz alapján (A: 3 3 3 / 2 2 2 / 1 / 1; B: 2 4 2 / 4 2 4 / 2 4 2; C: 2 _ 2 / 1 2 1; D: 3 3 3 / 2 _ 2 / 2 _ 2); kiegészítés kockává; lépcsők (1, 3, 6, 10 kocka); kockák és téglatestek színes rudakból.
- **120. o.:** a **téglatest hálója** (6 téglalap, kettő-kettő egyforma), a kocka hálói; téglatest összeállítása; „A test lapjainak a találkozását a test **éleinek** nevezzük.”; a kocka élváza számolópálcikákból; „A test éleinek a találkozását a test **csúcsainak** nevezzük.”
- **121. o.:** bojt (gömb); gömb alakú tárgyak; tapintásos játék zsákkal – biztos / lehet, de nem biztos / lehetetlen; lépkedés égtájak szerint síkidomok és testek táblázatában.
- **122. o.:** **elölnézet, felülnézet, oldalnézet** (iglu, jégtáblák, fóka); kis kockás építmények nézetei.
- **Munkafüzet 31–36. o.:** fogalmak (test, síkidom, lap, él, csúcs, oldal); vonalak / síkidomok / testek csoportosítása; hangszerek és testek; „Ez lapja ennek” nyilak síkidomok és testek között; kiegészítés kockává; kocka- és téglatesthálók színezése (szemben lévő lapok azonos színűek), élek mérése; gömb alakú tárgyak mérete (16 mm, 3 cm 8 mm, 6 cm 6 mm, 2 dm 2 cm, 1 m 9 dm); teniszlabdák dobozai (66 mm); négyzet alapú kókuszgolyó-piramis; labdaháló (legfeljebb 30 cm); fényképek iránya (elölről, felülről, oldalról); építmények és felülnézetük; gurítható és nyugalomban lévő tárgyak.

## Szabályok

- A **téglatestnek** és a **kockának** 6 lapja, 12 éle és 8 csúcsa van. A kocka lapjai egyforma négyzetek, a téglatest lapjai téglalapok (a szemben lévők egyformák).
- Síklapok határolják: kocka, téglatest, gúla; görbe felület határolja: gömb; sík lap és görbe felület is: henger, kúp, félgömb.
- **Alaprajz:** felülnézet, a mezőkben a tornyok magasságával; a számok összege a kis kockák száma.
- Téglatest kis kockákból: egy réteg kockái (sor · oszlop) · rétegek száma.

> **Csapda:** a rajzon nem látható (szaggatott) éleket, csúcsokat, illetve a takart kis kockákat kihagyni a számolásból.

> **Javítás a régi README-hez képest:** a korábbi leírás „poliéderek és forgástestek” fogalmakat, a henger „2 görbe élét”, a kúp csúcsát és a kocka „11 különböző hálóját” tanította. A 4. osztályos tankönyv ezeket nem tárgyalja: a hangsúly a síklapok / görbe felület megkülönböztetésén, a lap–él–csúcs fogalmán (téglatest, kocka), a hálón, a kis kockás építményeken, az alaprajzon és a nézeteken van. A modul ezt követi (a gúla, a henger és a kúp neve a tankönyv ábráiról ismert, élszámot csak a gúlánál adunk meg).

---

## Elkészített Komponensek

1. **`Solids4Figures.tsx`** (ferde vetület, a takart élek szaggatottak)
   - `SolidsFamilySvg`: kocka, téglatest, gúla, gömb, henger, kúp, félgömb.
   - `FlatCurvedSvg`: síklapok / görbe felület / mindkettő halmazábra.
   - `CuboidPartsSvg`: a téglatest lapja, éle, csúcsa.
   - `CuboidNetSvg`: a téglatest és a kocka hálója.
   - `CubeStairsSvg`: lépcsők 1, 3, 6, 10 kis kockából.
   - `ViewsSvg`: kis kockás építmény elöl-, oldal- és felülnézete (alaprajz).
   - Segédek: `Solids4UnitCube`, `Solids4Building` (építmény alaprajzból), `Solids4Box`, `Solids4Pyramid`, `Solids4Cylinder`, `Solids4Cone`, `Solids4Sphere`, `Solids4Hemisphere`, `DEPTH`.
2. **`Solids4Theory.tsx`**: testek körülöttünk, síklapok és görbe felület, lap–él–csúcs (táblázat), háló, alaprajz és nézetek, lépcsők, kidolgozott példák (kiegészítés kockává, teniszlabdák, labdaháló), csapda.
   - **Labor I – Téglatest-építő:** hosszúság, szélesség, magasság +/− gombokkal (kis kockákból épül), a program felismeri a kockát, feladatok (pl. „kocka 8 kis kockából”, „téglatest 24 kockából, 2 kocka magas”), kis kockák számának tippelése magyarázattal; a lapok, élek, csúcsok kiemelhetők és sorszámozva megszámolhatók (a takartak szaggatottan), a gyerek tippel (6 / 12 / 8).
   - **Labor II – Alaprajz-építő:** a mezőkre kattintva épül a torony (0–4 kocka), élőben látszik az építmény, a kockák száma, az elölnézet és az oldalnézet; a tankönyv 4. c) A–D alaprajzai ellenőrizhetők, a hibás mezők pirosak.
3. **`Solids4Matcher.tsx`**: 3 szint × 8 pár (tárgy ↔ test, fogalmak és számok, kis kockák és mérések).
4. **`Solids4Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (vonal / síkidom / test; síklapok / görbe felület / mindkettő; 10-nél kevesebb / 10 / több kis kocka).
5. **`Solids4Quiz.tsx`**: 30 kérdés (10–10–10), 15 kérdésnél ábra (testek, kockás építmények, alaprajz, háló), minden kérdésnek típus-címkéje van, 3 puskakártya.

Azonosítók: kvíz `g4-geom-testek-quiz`, párosító `g4-geom-testek-matcher`, csoportosító `g4-geom-testek-sorter`.

---

## Tesztelés

`src/test/grade4Topic5Solids4.test.tsx` – a 4 komponens és mind a 6 SVG ábra renderelése.
