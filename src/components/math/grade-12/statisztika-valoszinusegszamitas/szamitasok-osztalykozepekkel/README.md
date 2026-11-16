# 4. Számítások osztályközepekkel (36. lecke, 84–85. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 36. lecke, 84–85. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a statisztika és valószínűségszámítás fejezet **4.** leckéje.

---

## 📐 Elmélet

- Az **osztályba sorolás** segítségével áttekinthetően lehet rendezni, ábrázolni, elemezni az adatokat.
- Semelyik két osztálynak nem lehet közös része, és együtt az osztályok fedjék le az összes adatot. Túl kevés osztály torzíthat, túl sok nehezíti az elemzést (pl. dolgozatok: 5 osztály).
- **Osztályközép:** az osztályt határoló két érték számtani közepe.
- Osztályokba sorolt adatok statisztikai jellemzőit úgy számoljuk, mintha minden adat a hozzá tartozó osztályközéppel lenne egyenlő (súlyozott átlag, szórás, medián a kumulált gyakoriság alapján).

### Tankönyvi feladatok (a modulban feldolgozva)
- **1. (érettségi 2020):** 50 vásárló szögei, 8 osztály (120–124 … 155–159), gyakoriságok 1; 2; 6; 17; 10; 7; 5; 2. Osztályközepekkel: medián 137, átlag 7020 / 50 = 140,4 (szórás ≈ 7,58).
- **2.** Békéscsaba havi csapadéka 2020–2021: gyakoriságok 7; 9; 6; 1; 1, osztályközepek 13; 38; 63; 88; 117 mm. b) x̄ ≈ 42,3 mm (valódi átlag 44,4 mm); c) σ ≈ 26,2 mm; d) az eredeti adatok 17 / 24 ≈ 70,8%-a, osztályközepekkel 15 / 24 = 62,5%-a van az átlaghoz a szórásnál közelebb – a válasz változik.
- **3.** Dolgozat (50 tanuló): x̄ = 59,1 pont, σ ≈ 11,27 pont.
- **4.** Huzaldarabok (25 db): tűrés 14,5 ± 1,6 mm → 22 / 25 = 88% megfelel; x̄ ≈ 14,456 mm; σ ≈ 1,01 mm < 1,2 mm → nem kell állítani a robot működésén.
- **HF 1. (érettségi 2018):** lehetséges legmagasabb átlag 66 pont, osztályközepekkel 61,5 pont (kvízben: legalacsonyabb lehetséges átlag 57, medián 65,5).
- **HF 2.** Tojások (1200 db): S 45–53, M 53–63, L 63–73, XL 73–81 g, darabszámok 90; 452; 563; 95 → x̄ ≈ 63,52 g, σ ≈ 7,15 g.
- A **HF 3.** (IQ-teszt) gyakorisági táblázata a szövegből nem olvasható ki egyértelműen (a 225 és 468 gyakoriság osztályhoz rendelése bizonytalan), ezért nem dolgoztuk fel.

> **⚠️ CSAPDA:** az osztályközepeket a gyakoriságokkal súlyozva kell átlagolni (szögek: 140,4, nem 139,5); az osztályközepes eredmény csak közelítés.

---

## 💻 Elkészített Komponensek

1. **`ClassMidpointsFigures.tsx`**:
   - `NailsHistogramSvg`: a vásárolt szögek gyakorisági oszlopdiagramja osztályközepekkel.
   - `MidpointConceptSvg`: az osztályközép fogalma (125–129 osztály → 127).
   - `RainfallHistogramSvg`: a 24 havi csapadékadat 5 osztályban.
   - `WireToleranceSvg`: a huzaldarabok hossza és a tűréssáv.
   - `ScoresHistogramSvg`: a dolgozatpontszámok gyakorisága.
2. **`ClassMidpointsTheory.tsx`**: osztályba sorolás szabályai, osztályközép, kidolgozott feladatok (1–4., HF 1–2.), csapda, osztályközepek táblázata.
   - **I. Laboratórium:** osztályszélesség csúszkával – a csapadékadatok becsült (osztályközepes) és valódi átlaga, szórása és hisztogramja.
   - **II. Laboratórium:** osztályközepes számoló – tankönyvi előbeállítások, írható gyakoriságok, kumulált gyakoriság, átlag, szórás és a medián osztálya.
3. **`ClassMidpointsMatcher.tsx`**: 3 szint × 8 pár (osztály–osztályközép; fogalmak; tankönyvi eredmények).
4. **`ClassMidpointsSorter.tsx`**: 3 szint × 3 kategória × 9 elem (melyik osztályba esik; helyes/átfedő/hiányos beosztás; átlag/medián/hibás átlag).
5. **`ClassMidpointsQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 19 kérdésábrával, 3 puskakártyával.
- `statKit.tsx`: belső rajzsegédek (nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-stat-osztalykozepek-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic3ClassMidpoints.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
