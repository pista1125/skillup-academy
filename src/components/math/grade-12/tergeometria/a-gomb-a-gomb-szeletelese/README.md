# 6. A gömb, a gömb szeletelése (tankönyv 6. lecke, 16–17. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 16–17. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a térgeometria fejezet **6.** leckéje.

---

## 🎯 Tananyag Áttekintés

A lecke egy kidolgozott feladattal indul: egy **8 cm átmérőjű narancsot** a középpontjától **2 cm-re** vágunk ketté. A narancsot gömbbel modellezzük; az O középpont, annak a vágási síkra eső Q vetülete és a gömbfelület egy P pontja derékszögű háromszöget alkot: r² = 4² − 2² = 12, így **r = √12 ≈ 3,5 cm**.

---

## 📐 Fő Definíciók és Tételek

- **Gömbfelület:** a tér egy adott pontjától adott távolságra lévő pontok halmaza. A gömbfelület által határolt test a **gömb**, az adott távolság a gömb **sugara**.
- **Síkmetszet:** bármely metsző sík a gömböt egy **körben**, a gömbfelületet egy **körvonalban** metszi.
- **Főkör:** a középpontra illeszkedő sík metszete; sugara egyenlő a gömb sugarával.
- **Gömbsüveg:** a gömböt bármely síkmetszete két gömbsüvegre bontja (a tankönyv szóhasználata).
- **Derékszögű háromszög:** ha a metszet nem főkör, a gömbsugár (R), a metszetkör sugara (r) és a sík középponttól mért távolsága (d) derékszögű háromszöget alkot:
  $$R^2 = r^2 + d^2, \qquad r = \sqrt{R^2 - d^2}$$
- Kiegészítés: d = R esetén a sík érinti a gömböt (egy közös pont), d > R esetén nincs közös pont.

### Tankönyvi feladatok
- **1.** Dinnye 5 db 4 cm magas részre vágva ⇒ R = 10 cm, a vágósíkok 6 és 2 cm-re ⇒ r = 8 cm és √96 ≈ 9,8 cm.
- **2.** d = 3 cm, r = 4 cm ⇒ R = 5 cm; a párhuzamos, 1 cm-re lévő síkok: r = √21 ≈ 4,58 cm és r = 3 cm.
- **3.** A 8 cm élű kocka éleit érintő gömb: R = 4√2; a lapokon a gömbön kívüli rész 6 · (64 − 16π) = 384 − 96π ≈ 82,4 cm².
- **4.** Ráktérítő (É 23°26′, R = 6371 km): r = 6371 · cos 23°26′ ≈ 5846 km, hossza ≈ 36 700 km.
- **HF 1.** R = 12,8 cm, metszetátmérő 10,2 / 21,7 / 25,6 cm ⇒ d ≈ 11,74 / 6,79 / 0 cm.
- **HF 2.** R = 3,2 dm, a sugár felezőmerőleges síkja ⇒ T = 7,68π ≈ 24,13 dm².
- **HF 3.** R = 6,2 cm, merőleges síkok az egész pontokban ⇒ 13 sík metszi a gömböt; pl. az 5-ös síknál T = 13,44π ≈ 42,2 cm².
- **HF 4.** A főkörök kerülete 10 cm-rel tér el ⇒ R₁ − R₂ = 10 / (2π) ≈ 1,59 cm.
- **Ráadás.** Amundsen–Scott-kupola: alapkör 50 m, magasság 16 m ⇒ (R − 16)² + 25² = R² ⇒ R ≈ 27,5 m.

> **⚠️ CSAPDA:** a metszetkör sugara nem R − d (az a kisebbik gömbsüveg magassága), hanem √(R² − d²). Átmérő esetén előbb felezni kell!

---

## 💻 Elkészített Komponensek

1. **`SphereSectionsFigures.tsx`**:
   - `OrangeSectionSvg`: a kettévágott narancs térbeli képe és a főkör-metszet az OQP derékszögű háromszöggel.
   - `SphereTermsSvg`: középpont, főkör, síkmetszet.
   - `SectionTriangleSvg`: R, r, d derékszögű háromszöge, a két gömbsüveg.
   - `MelonSlicesSvg`: a 20 cm-es dinnye 5 db 4 cm-es szelete.
   - `CubeSphereSvg`: a kocka éleit érintő gömb (lap és élre merőleges metszet).
   - `DomeSvg`: a gömbsüveg alakú kupola (Ráadás).
2. **`SphereSectionsTheory.tsx`**: bevezető, definíciók, esettáblázat, kidolgozott feladatok (dinnye, R a metszetből, kocka, Ráktérítő, kupola), csapda.
   - **I. Laboratórium:** forgatható 3D gömb (`Solid3DViewer`) csúsztatható metszősíkkal: r, metszetterület, a két gömbsüveg magassága.
   - **II. Laboratórium:** gömbsüveg alapkör-sugarából és magasságából a gömb sugara, rajzzal.
3. **`SphereSectionsMatcher.tsx`**: 3 szint × 8 pár (fogalmak, R–d–r hármasok, tankönyvi feladatok).
4. **`SphereSectionsSorter.tsx`**: 3 szint × 3 kategória × 9 elem (főkör / kisebb kör / pont vagy semmi; melyik képlet; igaz / hamis / adatfüggő).
5. **`SphereSectionsQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), kérdésábrákkal, 3 puskakártyával. Haladás-azonosító: `g12-ter-gomb-szeletelese-quiz`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic1SphereSections.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
