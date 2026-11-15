# 10. Ráadás – Magasságtétel, befogótétel (128–129. oldal)

A magyar Nemzeti Köznevelési Portál és az Oktatási Hivatal hivatalos tankönyve (`OH-MAT10TA/II`, 128–129. oldal) és munkafüzete (`OH-SNE-MAT10M-2`) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A modul a derékszögű háromszögek metrikus tételeit dolgozza fel, amelyek az átfogóhoz tartozó magasság által létrehozott 3 hasonló derékszögű háromszögön alapulnak. Bemutatja a magasságtételt, a befogótételt, a Pitagorasz-tétel ezen tételekből történő elegáns levezetését, a terepi sziklamagasság-mérést, valamint a számtani és mértani közép közötti egyenlőtlenség Thálész-félkörös geometriai bizonyítását.

---

## 📐 Fő Tételek és Matematikai Képletek

### 1. A felbontott derékszögű háromszög jelölései
- Derékszögű háromszög átfogója: $c$, befogói: $a, b$.
- Átfogóhoz tartozó magasság: $m = m_c$.
- Átfogószeletek (merőleges vetületek az átfogón):
  - $p$: az $a$ befogó merőleges vetülete
  - $q$: a $b$ befogó merőleges vetülete
  - $c = p + q$
- Hasonló háromszögek: $\Delta ABC \sim \Delta C_1BC \sim \Delta AC_1C$ (I. alapeset: sz-sz).

### 2. A magasságtétel
Az átfogóhoz tartozó magasság hossza a két átfogószelet mértani közepe:
$$m^2 = p \cdot q \iff m = \sqrt{p \cdot q}$$

### 3. A befogótétel
Bármelyik befogó hossza az átfogó és a befogó átfogóra eső merőleges vetületének mértani közepe:
$$a^2 = p \cdot c \iff a = \sqrt{p \cdot c}$$
$$b^2 = q \cdot c \iff b = \sqrt{q \cdot c}$$

### 4. A Pitagorasz-tétel levezetése a befogótételből
A két befogótétel összeadásával:
$$a^2 + b^2 = pc + qc = (p + q)c = c \cdot c = c^2$$

### 5. A számtani és mértani közép egyenlőtlensége geometriai úton
Thálész-félkörben $c = p + q$ átmérő mellett:
- Sugár (számtani közép): $r = \frac{p + q}{2}$
- Magasság (mértani közép): $m = \sqrt{p \cdot q}$
- Mivel a körben $m \le r$:
  $$\sqrt{p \cdot q} \le \frac{p + q}{2}$$
  Egyenlőség $\iff p = q$ (egyenlő szárú derékszögű háromszög).

---

## 💻 Elkészített Komponensek

1. **`AltitudeLegTheoremsFigures.tsx`**:
   - `AltitudeAndLegTheoremsSvg`: Fő ábra az átfogóval, magassággal, szeletekkel és képletekkel.
   - `ThreeSimilarTrianglesSvg`: A 3 hasonló derékszögű háromszög szétbontása és hasonlósági arányai.
   - `PythagorasFromLegsSvg`: Pitagorasz-tétel levezetésének geometriai területi ábrája.
   - `CliffMeasurementSvg`: Szikla magasságának mérése $p = 42\text{ m}, q = 15\text{ m} \implies m \approx 25,1\text{ m}$.
   - `ArithmeticGeometricInequalitySvg`: AM-GM egyenlőtlenség Thálész-félkörös geometriai bizonyítása ($m \le r$).

2. **`AltitudeLegTheoremsTheory.tsx`**:
   - Részletes elmélet, aranyszabály, PDF összefoglaló letöltési lehetőség.
   - **I. Laboratórium:** Interaktív metrikus kalkulátor és AM-GM szimulátor ($p$ és $q$ csúszkák, $m, a, b, c, T, R$ azonnali számítása).
   - **II. Laboratórium:** Tankönyvi mintapéldák lépésről lépésre (szikla magassága, $2 \times 3\text{ cm}$ szeletek, $30 \times 45\text{ cm}$ befogó-átfogó, $5,4 \times 9,6\text{ cm}$ szeletek).

3. **`AltitudeLegTheoremsMatcher.tsx`**:
   - 3 nehézségi szint $\times$ 8 pár = 24 tanító kártyapár.

4. **`AltitudeLegTheoremsSorter.tsx`**:
   - 3 nehézségi szint $\times$ 3 kategória a tételek, számításos eredmények és geometriai állítások szerint.

5. **`AltitudeLegTheoremsQuiz.tsx`**:
   - 30 kérdésből álló kvíz (azonnali visszajelzés, vizsga mód, időmérő), 3 részletes puskafüllel.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade10Topic9AltitudeLegTheorems.test.tsx` fájlban található, mind az 5 komponenst és 5 SVG ábrát ellenőrzi.
