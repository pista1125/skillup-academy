# 14. Csoportverseny (14. lecke, 40–41. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 40–41. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

Négyfős csoportok versenye a trigonometria fejezet eszközeivel. A csoportok 6 kijelölt feladatot oldanak meg: az 1–5. feladat eredménye egy-egy betű (A–E), a 6. feladat ezekből számolja a táblára felírandó végeredményt. Az nyer, aki először írja fel a jó eredményt; minden csoport egyszer javíthat. **Jótanács:** érdemes gondolkozni, mielőtt nekiugrotok a formális számolásnak! A verseny végén az első 3 csapat bemutatja, hol nem kellett számolni.

---

## 📐 A versenyfeladatok és megoldásuk

- **1. feladat (A):** paralelogramma átlói 30 és 50 mm, tompaszögük 120°. Koszinusztétel a fél átlókkal: oldalak 35 mm és √475 ≈ 21,79 ≈ 22 mm ⇒ K = 2 · (35 + 22) = 114 mm ⇒ **A = 1 + 1 + 4 = 6**.
- **2. feladat (B):** oldalak 10 és 70 mm, szögük 150° ⇒ T = 10 · 70 · sin 150° = 350 mm² ⇒ **B = 3 · 5 · 0 = 0**.
- **3. feladat (C):** PQ = 15 m, PQB∠ = 42°, QPB∠ = 53°, TQB∠ = 72° ⇒ PBQ∠ = 85°, QB = 15 · sin 53° / sin 85° ≈ 12,03 m, TB = QB · tg 72° ≈ 37,01 m ⇒ **C = 37**.
- **4. feladat (D):** a = 50 mm, b = 74 mm, α = 37° ⇒ sin β ≈ 0,8907, β₁ ≈ 62,96°, β₂ ≈ 117,04° ⇒ **D = 180** (kiegészítő szögek – számolás nélkül is).
- **5. feladat (E):** r = 20 cm, 110°-os középponti szög ⇒ körszelet ≈ 383,97 − 187,94 ≈ 196,03 cm² ⇒ **E = 196**.
- **6. feladat:** $(15\cdot A - \frac{D}{2})\cdot C - B^2 + E = (90 - 90)\cdot 37 - 0 + 196 =$ **196**. A zárójel 0, ezért a torony magasságát (C) ki sem kell számolni.

> A szövegkivonatban a 6. feladat képlete `(15 · A − D2) · C − B2 + E` alakban szerepel; ezt (15 · A − D/2) · C − B² + E-ként értelmeztük (B = 0 miatt B² és B/2 ugyanazt adja). Ez az értelmezés adja a „gondolkozz előbb” jótanácshoz illő kiesést.

### Házi feladatok
- **1.** Trapéz: alapok 57 és 41 cm, a hosszabb alapon fekvő 73°-os szög melletti szár 38 cm ⇒ átlók ≈ 63,5 cm és ≈ 58,5 cm, a másik szár ≈ 36,7 cm.
- **2.** 2 cm sugarú körbe írt húrnégyszög, középponti szögek 70°, 120°, 110° (és 60°) ⇒ a) a szemközti szögek összege 180°; b) K ≈ 11,04 cm, T ≈ 7,22 cm²; c) körszeletek ≈ 0,56; 2,46; 1,96; 0,36 cm². (A d) átlós részt nem dolgoztuk fel, mert a szövegből nem derül ki egyértelműen a szögek sorrendje.)

### Ráadás – a szinuszgörbe
A 0° < α < 180° szögekhez rendelt sin α értékek táblázata (sin 15° ≈ 0,2588; sin 30° = 0,5; … sin 90° = 1) és grafikonja; a görbe a 90°-ra szimmetrikus, mert sin(180° − α) = sin α.

> **⚠️ CSAPDA:** A 4. feladatban a számológép csak a hegyesszöget adja – a tompaszögű megoldás is létezik. Az 1. feladatban az oldalakat előbb kell kerekíteni (114, nem 113,6).

---

## 💻 Elkészített Komponensek

1. **`TrigGroupCompetitionFigures.tsx`**:
   - `ParallelogramDiagonalsSvg`: 1. feladat – átlók 30 és 50 mm, 120°/60°.
   - `ParallelogramAreaSvg`: 2. feladat – 10 × 70 mm, 150°.
   - `TowerTriangleSvg`: 3. feladat – vízszintes PQB és függőleges QBT háromszög (derékszög B-nél).
   - `AmbiguousTrianglesSvg`: 4. feladat – a két lehetséges háromszög (β₁ + β₂ = 180°).
   - `Segment110Svg`: 5. feladat – 20 cm sugarú kör, 110°-os körszelet.
   - `SineCurveSvg`: ráadás – szinuszgörbe a tankönyvi táblázat pontjaival.
2. **`TrigGroupCompetitionTheory.tsx`**: versenyszabályok és eszköztár, az 5+1 feladat kidolgozva, „egyszerű módszerek”, házi feladatok, ráadás, csapda.
   - **I. Laboratórium:** versenyszimulátor – A–E betűk beírása és ellenőrzése, élő végeredmény, javításszámláló.
   - **II. Laboratórium:** szinuszgörbe-rajzoló – α-csúszka, sin α és sin(180° − α) pontja a görbén.
3. **`TrigGroupCompetitionMatcher.tsx`**: 3 szint × 8 pár (eszköztár; a verseny betűi; részeredmények és házi feladatok).
4. **`TrigGroupCompetitionSorter.tsx`**: 3 szint × 3 kategória × 9 elem (szinusztétel / koszinusztétel / területképlet; számolás nélkül / fejben / számológéppel; pozitív / negatív / nulla).
5. **`TrigGroupCompetitionQuiz.tsx`**: 30 kérdés 3 szinten, 3 puskakártyával (progress id: `g11-trig-csoportverseny-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic1TrigGroupCompetition.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
