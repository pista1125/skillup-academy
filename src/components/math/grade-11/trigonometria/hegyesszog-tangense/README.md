# 1. Hegyesszög tangense (1. lecke, 6–7. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 6–7. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A lecke egy gyakorlati problémából indul: hogyan határozható meg egy víztorony magassága, ha 30 m távolságból 38°-os emelkedési szögben látjuk a csúcsát? Kicsinyített rajzon mérve a 38°-os derékszögű háromszög befogóinak aránya 39 : 50 = 0,78, így a torony kb. 30 · 0,78 ≈ 23,4 m magas. Mivel az azonos hegyesszögű derékszögű háromszögek hasonlók, ez az arány csak a szögtől függ – ez a **tangens**.

---

## 📐 Fő Definíció és Tulajdonságok

- **Definíció:** Ha egy derékszögű háromszög egyik hegyesszöge α, akkor a vele szemben lévő befogó és a mellette lévő befogó hosszának hányadosát az α **tangensének** nevezzük. Jelölése: **tg α**.
  $$\text{tg}\,\alpha = \frac{a}{b} = \frac{\text{szemközti befogó}}{\text{melletti befogó}}$$
- **Miért egyértelmű?** Két derékszögű háromszög hasonló, ha egy hegyesszögük egyenlő, ezért $\frac{a}{b} = \frac{d}{e}$.
- **Mérési táblázat (50 mm-es melletti befogó, 1. feladat):** tg 5° ≈ 0,09; tg 15° ≈ 0,27; tg 25° ≈ 0,47; tg 35° ≈ 0,70; tg 45° = 1.
- **Megfigyelés:** a 7,8 cm és 10 cm befogójú derékszögű háromszög kisebbik hegyesszöge 38°-os (tg 38° ≈ 0,78).

### Tankönyvi feladatok
- **2. a)** 35°-os szög, egyik befogó 5 cm ⇒ a másik befogó ≈ 3,5 cm vagy ≈ 7,1 cm (attól függően, melyik befogó az 5 cm).
- **2. b)** Téglalap 23,5 cm × 50 cm ⇒ tg α = 0,47 ⇒ az átló szögei ≈ 25° és 65°.
- **5.** Befogó 12 cm, vele szemközti szög tangense 0,75 ⇒ másik befogó 16 cm, átfogó 20 cm, átfogóhoz tartozó magasság 9,6 cm.
- **HF 1. a)** Befogók 10 cm és 4,7 cm ⇒ szögek ≈ 25°, 65°, 90°. **HF 1. b)** 35 cm és 35° ⇒ rövidebb oldal ≈ 24,5 cm.
- **HF 3.** tg α = 0,55, melletti befogó 1,6 cm ⇒ szemközti befogó 0,88 cm, átfogó ≈ 1,83 cm.

> **⚠️ CSAPDA:** A szemközti és a melletti befogót nem szabad felcserélni – a fordított hányados a pótszög tangense: tg(90° − α) = 1 / tg α.

---

## 💻 Elkészített Komponensek

1. **`AcuteTangentFigures.tsx`**:
   - `WaterTowerSvg`: a víztorony magassága 30 m-ről, 38°-os emelkedési szögben (méretarányos).
   - `SimilarRightTrianglesSvg`: azonos hegyesszögű, hasonló derékszögű háromszögek ($a/b = d/e$).
   - `TangentDefinitionSvg`: szemközti és melletti befogó kiemelése, tg α = a / b.
   - `TangentFanSvg`: a tankönyvi „legyező” 5°, 15°, 25°, 35°, 45°-os szögekkel és 50 mm-es befogóval.
   - `RectangleDiagonalSvg`: 23,5 × 50 cm-es téglalap átlója (≈ 25° és ≈ 65°).
2. **`AcuteTangentTheory.tsx`**: bevezető probléma, definíció, mérési táblázat, kidolgozott feladatok, csapda.
   - **I. Laboratórium:** szög- és befogó-csúszka – a tangens nem függ a háromszög méretétől.
   - **II. Laboratórium:** hiányzó befogó, átfogó és magasság számítása a tangensből.
3. **`AcuteTangentMatcher.tsx`**: 3 szint × 8 pár (fogalmak és értékek, befogók aránya, hiányzó oldalak).
4. **`AcuteTangentSorter.tsx`**: 3 szint × 3 kategória (tg α < 1 / = 1 / > 1; szorzás / osztás / hányados; igaz / hamis / adatfüggő).
5. **`AcuteTangentQuiz.tsx`**: 30 kérdés 3 szinten, 3 puskakártyával.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic1AcuteTangent.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
