# 9. Gyakorlás, tudáspróba (V. fejezet, 9. lecke – fejezetzáró)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 111–130. oldal) és munkafüzet (`OH-MAT04MA_II`, 42–47. oldal: „Ellenőrizd a tudásodat!”, „Gyakorolj!”) alapján kidolgozott fejezetzáró modul a V. Síkidomok és testek fejezet mind a 8 leckéjéhez.

---

## 🎯 Tananyag Áttekintés

A munkafüzet 42–47. oldalán az írásbeli osztás feladatai (1–3., 1–8.) mellett a fejezet geometriai feladatai:

- **MF 43/4.** Mekkora szöget zárnak be a vonalak? Csoportosítás derékszögű vonalzóval: *derékszögnél kisebb / derékszögű / derékszögnél nagyobb*.
- **MF 43/5.** a) Karikázd be a testek ábráját (kocka, gömb, téglatest, gúla – négyzet, kör, ferde négyszög között)! b) Színezd a kockát!
- **MF 43/6.** Sokszögek a halmazábrában: *Vannak párhuzamos oldalai* és *Négyszögek* a SOKSZÖGEK alaphalmazban.
- **MF 47/9.** Síkidomok gumigyűrűvel és pontrácson.
- **MF 47/10.** Síkidomok csoportosítása: van / nincs derékszöge, van / nincs párhuzamos oldalpárja, van / nincs szimmetriatengelye.
- **MF 47/11.** Térbeli alakzatok színes rudakból és a tükörképük.

A modul a fejezet minden leckéjét ismétli (a kifejezéseket az 1–4. lecke elkészült moduljaihoz igazítva):
1. Síkidomok, sokszögek (csúcs, oldal, átló; derékszög; párhuzamos; téglalap, négyzet) – 2. A kör (középpont, körvonal, körlap, körző, körzőnyílás) – 3. A testek (lap, él, csúcs; alaprajz, nézetek) – 4. A tükrözés (tükörkép, tükörtengely, szimmetriatengely) – 5. Nagyítás, kicsinyítés – 6. Eltolás – 7. Elforgatás – 8. Tájékozódás.

> **⚠️ CSAPDA:** a takart (szaggatott) élek kihagyása (a téglatestnek 12 éle van, nem 9); a téglalap átlóját szimmetriatengelynek hinni; nagyításkor hozzáadni szorzás helyett; a mezőkód sorrendje és a számozás iránya.

(A mappában korábban nem volt README.)

---

## 💻 Elkészített Komponensek

1. **`ShapesExamFigures.tsx`** (exportált segédek: `ExamRightMark` – derékszög negyedkörívvel és ponttal, `ExamAngle`, `ExamCuboid` – szaggatott takart élekkel, `ExamSphere`, `ExamPyramid`, `ExamCylinder`, `ExamBuilding`, `EXAM_FLAG`, `examPoly`, `examRotQ`):
   - `AngleGroupsSvg`: hat szög három csoportban (MF 43/4.).
   - `SolidsVsShapesSvg`: testek és síkidomok (MF 43/5.).
   - `PolygonVennSvg`: sokszögek halmazábrája (MF 43/6.).
   - `ShapePropertiesSvg`: derékszög, párhuzamos oldalpár, szimmetriatengely táblázata (MF 47/10.).
   - `MovesOverviewSvg`: tükrözés, eltolás, elforgatás, nagyítás egymás mellett.
   - `BuildingPlanSvg`: kis kockás építmény és alaprajza.
2. **`ShapesExamTheory.tsx`**: „Amit már tudsz” – 8 leckekártya, kidolgozott vegyes feladatok (A–E), a négy mozgás összehasonlító táblázata, csapda.
   - **I. Labor – Vegyes feladatsor:** 14 feladat a 8 leckéből, azonnali visszajelzéssel és pontszámlálóval.
   - **II. Labor – Melyik mozgás volt?:** 9 ábrapár; el kell dönteni, hogy tükrözés, eltolás, elforgatás vagy nagyítás/kicsinyítés történt (a fél fordulat és a vízszintes tükrözés megkülönböztetésével).
3. **`ShapesExamMatcher.tsx`**: 3 szint × 8 pár (síkidomok és kör; testek és szimmetria; mozgások és tájékozódás).
4. **`ShapesExamSorter.tsx`**: 3 szint × 3 kategória × 9 elem (síkidom / sokszög / test; szögek; tükrözés / eltolás / elforgatás).
5. **`ShapesExamQuiz.tsx`**: **90 kérdés** (30 / 30 / 30), mind a 8 leckéből, 46 kérdés ábrával, 3 puskakártyával. Azonosítók: `g4-geom-tudasproba-quiz`, `-matcher`, `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade4Topic5ShapesExam.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
