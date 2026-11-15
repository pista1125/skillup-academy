# 5. Vektorok a koordináta-rendszerben (69. lecke, 226–229. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 226–229. oldal) alapján kidolgozott oktatási modul. A diákzónában a VI. Koordinátageometria fejezet 5. szakasza.

---

## 🎯 Tananyag Áttekintés

**Bevezető:** az egymásra merőleges →i és →j egységvektorok segítségével felbontjuk a rácspontok közötti vektorokat: →a = 3→i + 0→j, →b = 0→i − 2→j, →c = →a + →b = 3→i − 2→j, →d = −2→i + 3→j. Közös (origó) kezdőpontból rajzolva az együtthatók megegyeznek a végpontok koordinátáival: A(3; 0), B(0; −2), C(3; −2), D(−2; 3).

---

## 📐 Elmélet

- **Bázisvektorok:** az origóból az (1; 0) pontba mutató →i és a (0; 1) pontba mutató →j – bázist alkotnak.
- **Vektor koordinátái:** a sík bármely →a vektora egyértelműen felírható →a = a₁→i + a₂→j alakban; →a(a₁; a₂).
- **Helyvektor:** az origóból az A(a₁; a₂) pontba mutató vektor; a pont koordinátái = a helyvektor koordinátái.
- **→AB koordinátái:** →AB(b₁ − a₁; b₂ − a₂) – végpont mínusz kezdőpont.
- **Műveletek:** →a ± →b(a₁ ± b₁; a₂ ± b₂), c · →a(c · a₁; c · a₂).
- **90°-os elforgatás:** (v₁; v₂) → +90°: (−v₂; v₁), −90°: (v₂; −v₁).
- **Hossz:** $|\vec v| = \sqrt{v_1^2 + v_2^2}$, $|\overrightarrow{AB}| = \sqrt{(b_1-a_1)^2 + (b_2-a_2)^2}$.

### Kidolgozott feladat (227. o.)
A(1; 2), B(2; 5), C(3; 3), D(6; 2), F(2; −2), E(−1; −1), G(−3; 1), O(0; 0):
→p = →AB(1; 3), →q = →CD(3; −1), →r = →FE(−3; 1), →s = →GO(3; −1). Mindegyik hossza √(1² + 3²) = √10; →q = →s = −→r, →p mindháromra merőleges. Műveletek: →p + →q = (4; 2), →p − →s = (−2; 4), 2→r = (−6; 2). Megjegyzés: →v(−2; −7) hossza √53.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **2.** Párhuzamos, fele olyan hosszú: a) →u = 6→i ⇒ (3; 0), (−3; 0); b) →u = 2→i − 4→j ⇒ (1; −2), (−1; 2).
- **3.** Merőleges, háromszor olyan hosszú: a) →v = →i + →j ⇒ (−3; 3), (3; −3); b) →v(−1; 2) ⇒ (−6; −3), (6; 3).
- **4.** →u = →i − 5→j, →v = 2→i + →j: →u + →v = (3; −4), |→u + →v| = 5; →u − →v = (−1; −6), →v − →u = (1; 6), mindkettő hossza √37.
- **HF 1.** →a(3; −4), →b(12; 5), →c(−20; −21): hosszuk 5, 13, 29; →a + →b = (15; 1), →a − →c = (23; 17).
- **HF 2.** Párhuzamos, kétszeres: a) (0; ±6); b) ±(2; −6); c) (±8; 0); d) ±(2; −2).
- **HF 3.** Merőleges, kétszeres: a) (±6; 0); b) ±(6; 2); c) (0; ±8); d) ±(2; 2).
- **HF 4.** →a = 5→i − 12→j, →b = 4→i − 3→j: →a + →b = (9; −15), 3→a = (15; −36), 2→b − →a = (3; 6); |→a| = 13, |→b| = 5, |→a + →b| = √306 = 3√34 ≈ 17,49.
- (Az 1. feladat és a HF 5. a tankönyvi ábrára épül, ezért a modul nem közöl rá eredményt.)

> **⚠️ CSAPDA:** →AB = végpont − kezdőpont (a fordított kivonás a →BA vektort adja), és a hossz képletében (−2)² = 4, nem −4.

---

## 💻 Elkészített Komponensek

1. **`CoordinateVectorsFigures.tsx`**:
   - `BasisVectorsIntroSvg`: →i, →j és az →a, →b, →c, →d helyvektorok A, B, C, D végpontokkal.
   - `GridVectorsReadingSvg`: a kidolgozott feladat →p, →q, →r, →s vektorai rácspontok között.
   - `EqualPositionVectorsSvg`: a velük egyenlő helyvektorok (→q = →s).
   - `CoordinateOperationsSvg`: →p + →q, →p − →s, 2→r koordinátákkal.
   - `VectorRotationSvg`: →v(3; 1) ±90°-os elforgatottjai (derékszög: negyedkörív ponttal).
   - `VectorLengthSvg`: |→AB| = √(1² + 3²) = √10 a derékszögű háromszögből.
   - Segédkomponensek: `CVGrid` (koordináta-rendszer, tengelyfeliratok, kattintható rács), `CVArrow`, `CVLabel`, `CVRightAngle`.
2. **`CoordinateVectorsTheory.tsx`**: bevezető, definíciók, kidolgozott feladat (táblázat, hosszak, műveletek), összefoglaló képlettáblázat, feladatok és házi feladatok eredményei, csapda.
   - **I. Laboratórium:** pontok, vektor, hossz a rácson – A és B kattintással vagy csúszkával, élő →AB koordináták, az egyenlő helyvektor, a Pitagorasz-háromszög és a hossz.
   - **II. Laboratórium:** műveletek koordinátákkal – →u, →v csúszkákkal; összeg, különbség, c · →u, ±90°-os elforgatás; eredmény rajzzal, koordinátákkal és (egyszerűsített gyökös) hosszal.
3. **`CoordinateVectorsMatcher.tsx`**: 3 szint × 8 pár (fogalmak és képletek; számolás koordinátákkal; vektorok hossza).
4. **`CoordinateVectorsSorter.tsx`**: 3 szint × 3 kategória × 9 elem (párhuzamos / merőleges / egyik sem; hossz 5 / √10 / 13; igaz / hamis / adatfüggő).
5. **`CoordinateVectorsQuiz.tsx`**: 30 kérdés 3 szinten (14 koordináta-rendszeres ábrával), 3 puskakártyával (progress id: `g11-geo-vektor-koordinatak-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic6CoordinateVectors.test.tsx` fájlban található: a 4 komponens, a kvízábrák és mind a 6 SVG ábra renderelését, valamint a kérdések számát és szintenkénti eloszlását ellenőrzi.
