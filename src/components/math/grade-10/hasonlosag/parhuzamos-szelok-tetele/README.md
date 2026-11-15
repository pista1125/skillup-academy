# 7. Ráadás – Párhuzamos szelők tétele (122–123. oldal)

A magyar Nemzeti Köznevelési Portál és az Oktatási Hivatal hivatalos tankönyve (`OH-MAT10TA/II`, 122–123. oldal) és munkafüzete (`OH-SNE-MAT10M-2`) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A modul a párhuzamos szelők és párhuzamos szelőszakaszok tételét, a tétel megfordítását (párhuzamosság bizonyítása), szakaszok adott arányú felosztását, a negyedik arányos szerkesztését, valamint a tankönyv klasszikus feladatait (54 m²-es lakás arányos helyiségei, 539 m²-es telek kettős 2 : 5 felosztása 4 parcellára, szabályos ötszög aranymetszése, 11 cm kerületű háromszög párhuzamos szelője) dolgozza fel.

---

## 📐 Fő Tételek és Matematikai Képletek

### 1. Párhuzamos szelők tétele
Ha egy szög szárait párhuzamos egyenesekkel ($p_1 \parallel p_2 \parallel p_3$) metsszük:
- **Szomszédos szárdarabok aránya:**
  $$\frac{A_1A_2}{A_2A_3} = \frac{B_1B_2}{B_2B_3}$$
- **Csúcstól mért szakaszok aránya:**
  $$\frac{OA_1}{OA_2} = \frac{OB_1}{OB_2} \quad \text{és} \quad \frac{OA_1}{A_1A_2} = \frac{OB_1}{B_1B_2}$$

### 2. A párhuzamos szelőszakaszok tétele
A párhuzamos egyenesek szög szárai közé eső szakaszai ($c_1 = A_1B_1$, $c_2 = A_2B_2$):
$$\frac{c_1}{c_2} = \frac{OA_1}{OA_2} = \frac{OB_1}{OB_2}$$

> **⚠️ HALÁLOS CSAPDA:** A szelőszakaszok aránya **NEM** egyezik meg a trapéz száraival!
> $$\frac{c_1}{c_2} \neq \frac{A_1A_2}{B_1B_2}$$
> A szelőszakaszok mindig csak a csúcstól mért távolságokkal arányosak, mert a hasonló háromszögek oldalai $OA_1$ és $OA_2$!

### 3. Szerkesztési eljárások
- **Szakaszfelosztás $m : n$ arányban:** Segédfélegyenesre $m + n$ egyenlő egység felmérése körzővel, az utolsó pont összekötése a szakasz végével, majd párhuzamos húzása az $m$-edik osztóponton keresztül.
- **Negyedik arányos szerkesztése:** $a / b = c / x \implies x = \frac{b \cdot c}{a}$.

---

## 💻 Elkészített Komponensek

1. **`ParallelInterceptFigures.tsx`**:
   - `ParallelInterceptTheoremSvg`: Szögszárak és párhuzamos szelők aránypárjai.
   - `ParallelChordsTheoremSvg`: Szelőszakaszok és a trapézszárak összehasonlítása.
   - `SegmentPartitionSvg`: Szakasz arányos felosztása segédfélegyenessel.
   - `RectangleFourPartsSvg`: 539 m²-es telek kettős 2 : 5 felosztása 4 téglalapra (44, 110, 110, 275 m²).
   - `FourthProportionalSvg`: Negyedik arányos szakasz szerkesztése szelőtétellel.

2. **`ParallelInterceptTheory.tsx`**:
   - Részletes elmélet, aranyszabály, halálos csapda kiemelés, PDF összefoglaló letöltési lehetőség.
   - **I. Laboratórium:** Interaktív szakaszfelosztó és negyedik arányos kalkulátor.
   - **II. Laboratórium:** Tankönyvi esettanulmányok interaktív tabokkal (lakásméretek, telekosztás, ötszög aranymetszése, háromszög szelője).

3. **`ParallelInterceptMatcher.tsx`**:
   - 3 nehézségi szint (Kezdő, Haladó, Mester), szintenként 8 pár = összesen 24 tanító párosítás.

4. **`ParallelInterceptSorter.tsx`**:
   - 3 nehézségi szint, szintenként 3 kategória arányszámítási, tételfelismerési és geometriai tulajdonságok szerint.

5. **`ParallelInterceptQuiz.tsx`**:
   - 30 kérdésből álló kvíz (azonnali visszajelzés, vizsga mód, időmérő), 3 puskafüllel (tételek és aránypárok, szerkesztési lépések, telekosztási mintafeladatok).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade10Topic9ParallelIntercept.test.tsx` fájlban található, mind az 5 komponens renderelését és funkcionalitását ellenőrzi.
