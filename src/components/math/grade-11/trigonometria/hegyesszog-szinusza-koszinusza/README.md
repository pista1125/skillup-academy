# 3. Hegyesszög szinusza, koszinusza (3. lecke, 12–13. oldal)

A magyar Nemzeti Köznevelési Portál és az Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, 12–13. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A lecke egy felfedező feladattal indul: milliméterpapírra rajzolt, 25 mm átfogójú derékszögű háromszögekben a befogók és az átfogó aránya csak a hegyesszögtől függ. Ebből születik a szinusz és a koszinusz definíciója. A modul feldolgozza a számológép használatát (sin, cos, sin⁻¹, cos⁻¹, DEG mód), az értékkészletet (0 < sin α, cos α < 1), valamint a tankönyv feladatait: téglalap átlója, turistaút szintkülönbsége és térképi távolsága, egyenlő szárú háromszög alapja és magasságai, palló hajlásszöge.

---

## 📐 Fő definíciók

- **Szinusz:** a szöggel szemben lévő befogó és az átfogó hányadosa: $\sin \alpha = \frac{a}{c}$
- **Koszinusz:** a szög mellett lévő befogó és az átfogó hányadosa: $\cos \alpha = \frac{b}{c}$
- **Tangens (ismétlés):** $\operatorname{tg} \alpha = \frac{a}{b}$
- A szinusz, koszinusz és tangens együtt a szög **szögfüggvényei**.
- Más betűzésnél (φ szöggel szemközti k, melletti l, átfogó m): $\sin \varphi = \frac{k}{m}$, $\cos \varphi = \frac{l}{m}$, $\operatorname{tg} \varphi = \frac{k}{l}$.
- **Értékkészlet:** a befogó rövidebb az átfogónál, ezért hegyesszögre $0 < \sin \alpha < 1$ és $0 < \cos \alpha < 1$.
- **Számológép:** DEG (D) mód! Szögből érték: `sin`, `cos`; értékből szög: `sin⁻¹`, `cos⁻¹`.

> **⚠️ CSAPDA:** RAD módban a gép a 30-at radiánnak veszi: sin 30 ≈ −0,988 a helyes 0,5 helyett.

---

## 🧮 Tankönyvi feladatok ellenőrzött eredményei

| Feladat | Eredmény |
|---|---|
| 2. a) átfogó 14 cm, 40° | befogók ≈ 9,0 cm és ≈ 10,7 cm |
| 2. b) téglalap, átló 20 cm, oldal 17,3 cm | ≈ 30,1° és ≈ 59,9° |
| 3. 500 m-es út, 15° | szintkülönbség ≈ 129,4 m; térképen (1 : 8000) ≈ 6,04 cm |
| 4. szárak 14 cm, szárszög 44° | alap ≈ 10,49 cm; $m_a$ ≈ 12,98 cm; $m_b$ ≈ 9,73 cm |
| HF 1. 0,5 m plató, 2 m palló | ≈ 14,5° |
| HF 2. befogó 1,8 cm, átfogó 4,7 cm | sin ≈ 0,383, cos ≈ 0,924, tg ≈ 0,415; szögek ≈ 22,5° és 67,5° |
| HF 3. átfogó 25 cm, 35° | befogók ≈ 14,34 és 20,48 cm; magasság ≈ 11,75 cm |
| HF 4. szárak 28 cm, alap 10 cm | ≈ 79,7°, 79,7°, 20,6° |

---

## 💻 Elkészített Komponensek

1. **`AcuteSineCosineFigures.tsx`**:
   - `SinCosDefinitionSvg`: derékszögű háromszög a szinusz, koszinusz, tangens definíciójával.
   - `MillimeterHypotenuseSvg`: 25 mm átfogójú háromszögek milliméterrácson (felfedező feladat).
   - `HikingPathSvg`: 500 m-es, 15°-os turistaút.
   - `IsoscelesApexSvg`: egyenlő szárú háromszög felezése (14 cm, 44°).
   - `CalculatorKeysSvg`: sin, cos, sin⁻¹, cos⁻¹ billentyűk és DEG mód.
   - `RectangleDiagonalSvg`: téglalap 20 cm-es átlóval és 17,3 cm-es oldallal.
2. **`AcuteSineCosineTheory.tsx`**: felfedezés táblázattal, definíciók, számológép-csapda, értékkészlet indoklása, kidolgozott feladatok.
   - **I. Laboratórium:** szög- és átfogó-csúszka, élő háromszög; a sin, cos, tg csak a szögtől függ.
   - **II. Laboratórium:** derékszögű háromszög-számoló (szög + átfogó → befogók; befogó + átfogó → szög) lépésenkénti levezetéssel.
3. **`AcuteSineCosineMatcher.tsx`**: 3 szint × 8 pár (definíciók, értékek és képletek, tankönyvi eredmények).
4. **`AcuteSineCosineSorter.tsx`**: 3 szint × 3 kategória (melyik szögfüggvény; lehetséges/lehetetlen érték; oldalt, szöget vagy magasságot ad).
5. **`AcuteSineCosineQuiz.tsx`**: 30 kérdés 3 szinten, magyarázatokkal, 3 puskával.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade11Topic1AcuteSineCosine.test.tsx`.
