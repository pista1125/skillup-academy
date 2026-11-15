# 9. Háromszög középvonalai és súlyvonalai (73. lecke, 126–127. oldal)

A magyar Nemzeti Köznevelési Portál és az Oktatási Hivatal hivatalos tankönyve (`OH-MAT10TA/II`, 126–127. oldal) és munkafüzete (`OH-SNE-MAT10M-2`) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A modul a háromszög középvonalainak és súlyvonalainak geometriai tulajdonságait, a középvonal-tétel hasonlósági bizonyítását (II. alapeset: o-sz-o), a súlypont létezését és $2 : 1$ arányú metszésének hasonlósági igazolását (I. alapeset: sz-sz), a területfelezési törvényeket ($T/2$, $T/4$, $T/6$, $T/3$), valamint a tankönyvi és érettségi mintafeladatokat (2 : 8 : 9 arányú háromszög, 255 dm kerületű 5 : 12 : 13 derékszögű háromszög, derékszögű háromszög átfogó-súlyvonala $s_c = c/2 = R$) dolgozza fel.

---

## 📐 Fő Tételek és Matematikai Képletek

### 1. A háromszög középvonala
- **Definíció:** Két oldal felezőpontját összekötő szakasz.
- **Középvonal-tétel:** A középvonal párhuzamos a harmadik oldallal, és hossza fele a harmadik oldal hosszának:
  $$k_c \parallel c \quad \text{és} \quad k_c = \frac{c}{2}$$
- **A 3 középvonal felosztása:** Az eredeti háromszöget 4 egymással egybevágó, az eredetihez hasonló ($\lambda = 1/2$) háromszögre osztja.
  - Kerület: $K_{\text{közép}} = \frac{K}{2}$
  - Terület: $T_{\text{közép}} = \frac{T}{4}$ (mivel $\lambda^2 = (1/2)^2 = 1/4$)

### 2. A háromszög súlyvonalai és súlypontja ($S$)
- **Definíció:** A háromszög csúcsát a szemközti oldal felezőpontjával összekötő szakasz ($s_a, s_b, s_c$).
- **Súlypont tétele:**
  - A három súlyvonal egyetlen közös pontban, a súlypontban ($S$) metszi egymást.
  - A súlypont a súlyvonalakat $2 : 1$ arányban osztja, a hosszabb szakasz a csúcs felé esik:
    $$AS = \frac{2}{3} s_a \quad \text{és} \quad SF_a = \frac{1}{3} s_a$$
  - Bizonyítás: $\Delta ABS \sim \Delta DES$ homokóra-alakzat (I. eset: sz-sz), $\lambda = AB / DE = 2$.

### 3. Területfelosztási szabályok
- 1 súlyvonal: felezi a területet ($T / 2$).
- 3 súlyvonal: 6 egyenlő területű kisebb háromszögre oszt ($T / 6$).
- Súlypontot a 3 csúccsal összekötve: 3 egyenlő területű háromszög keletkezik ($T / 3$).

### 4. Derékszögű háromszög speciális összefüggése
- Thálész-tétel miatt az átfogó felezőpontja a körülírt kör középpontja ($F_c = K$):
  $$s_c = \frac{c}{2} = R$$

---

## 💻 Elkészített Komponensek

1. **`MidlinesMediansFigures.tsx`**:
   - `MidlineTheoremSvg`: Középvonal-tétel és hasonlósági bizonyítása ($\Delta EDC \sim \Delta ABC$).
   - `FourMidlineTrianglesSvg`: A 3 középvonal 4 egybevágó háromszögre bontja az idomot ($K/2$, $T/4$).
   - `MediansCentroidRatioSvg`: Súlyvonalak $2 : 1$ arányú osztása és homokóra-bizonyítása ($\Delta ABS \sim \Delta DES$).
   - `SixEqualAreaTrianglesSvg`: A súlyvonalak területfelosztása: 6 darab $T/6$ és 3 darab $T/3$ terület.
   - `RightTriangleMedianSvg`: Derékszögű háromszög átfogó-súlyvonala ($s_c = c/2 = R$).

2. **`MidlinesMediansTheory.tsx`**:
   - Részletes elmélet, aranyszabály, PDF export lehetőség.
   - **I. Laboratórium:** Interaktív középvonal- és súlypont-kalkulátor (oldalakból középvonalak, $K/2, T/4$, valamint derékszögű háromszög átfogó-súlyvonala és súlypont távolságai).
   - **II. Laboratórium:** Tankönyvi mintapéldák lépésről lépésre (2:8:9 háromszög, 5:12:13 derékszögű háromszög, derékszögű háromszög 14 és 33,6 cm befogókkal, egyenlő szárú háromszög 42 mm alappal és 29 mm szárral).

3. **`MidlinesMediansMatcher.tsx`**:
   - 3 nehézségi szint $\times$ 8 pár = 24 tanító kártyapár.

4. **`MidlinesMediansSorter.tsx`**:
   - 3 nehézségi szint, szintenként 3 kategória a vonalak, arányszámok és matematikai állítások szerint.

5. **`MidlinesMediansQuiz.tsx`**:
   - 30 kérdésből álló kvíz (azonnali visszajelzés, vizsga mód, időmérő), 3 részletes puskafüllel.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade10Topic9MidlinesMedians.test.tsx` fájlban található, mind az 5 komponenst és 5 SVG ábrát ellenőrzi.
