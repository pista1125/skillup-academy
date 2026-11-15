# 7. A tompaszög és a derékszög szinusza (7. lecke, 24–25. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 24–25. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A lecke a 6. leckében megismert **T = ab · sin γ / 2** területképletből indul. A kidolgozott feladatban egy háromszög két oldala 26 cm és 45 cm, a közbezárt szög a) 52°, b) 128°. Az a) esetben m = 26 · sin 52°, T ≈ 461 cm². A b) esetben a 45 cm-es oldalhoz tartozó magasság egy, a háromszöghöz toldott derékszögű háromszögben számolható, ahol a magassággal szemközti szög a 128° mellékszöge, 52° – így a magasság és a terület is ugyanakkora. A két háromszög egymás mellé helyezve (közös 26 cm-es oldal, mellékszögek a közös csúcsnál) szemléletesen mutatja ezt.

---

## 📐 Fő Definíciók és Összefüggések

- **Tompaszög szinusza:** Az ABC (tompaszögű) és CBD háromszögek területe egyenlő (AC = CD = b, közös magasság). Hogy a T = ab · sin γ / 2 képlet tompaszögre is teljesüljön:
  $$\sin\gamma = \sin(180^\circ - \gamma)$$
  **Definíció:** tompaszög szinusza egyenlő kiegészítő szögének szinuszával.
- **Derékszög szinusza:** a derékszögű háromszögre T = ab / 2, ezért **sin 90° = 1**.
- **Számológép:** a `sin` gomb tompaszögre és derékszögre is működik, de a `sin⁻¹` funkció **mindig hegyesszöget** ad – ha tompaszöget keresünk, a megoldás a kiegészítő szög: **180° − α**.

### Tankönyvi feladatok
- **1.** Táblázat (T = ab · sin γ / 2): 38 cm, 29 cm, 142° ⇒ T ≈ 339,2 cm²; 19 cm, 150°, 80,75 cm² ⇒ b = 17 cm; 17 km, 30°, 80,75 km² ⇒ a = 19 km; 49 mm, 54 mm, 1323 mm² ⇒ sin γ = 1, γ = 90°; 8 m, 90°, 48 m² ⇒ a = 12 m.
- **2.** Dóri a = 94 mm-rel számolt: sin γ ≈ 0,5213 ⇒ γ ≈ 31,4° – **hiányos**, mert γ ≈ 148,6° is megoldás.
- **3.** „Nyílhegy” egy 16 részre osztott 4 cm sugarú körben – az ábra nélkül nem dolgoztuk fel.
- **HF 1.** Vitorla 9 m, 4,4 m, 93° ⇒ T ≈ 19,77 m², +12% ⇒ ≈ 22,1 m².
- **HF 2.** a) 10 cm, 12 cm, 37° ⇒ T ≈ 36,1 cm²; b) T = 36,1 cm² ⇒ sin γ ≈ 0,602 ⇒ γ ≈ 37° vagy **γ ≈ 143°** (lehet tompaszögű).
- **HF 3.** Paralelogramma a) 36 mm, 54 mm, 145° ⇒ T ≈ 1115 mm²; b) átlók 36 mm, 54 mm, 35° ⇒ T = e · f · sin φ / 2 ≈ 558 mm².

> **⚠️ CSAPDA:** A `sin⁻¹` eredménye nem mindig az egyetlen megoldás: ha 0 < sin γ < 1, akkor γ₁ hegyesszög és γ₂ = 180° − γ₁ tompaszög is szóba jöhet. Csak sin γ = 1 esetén egyértelmű (γ = 90°), sin γ > 1 esetén nincs ilyen háromszög.

---

## 💻 Elkészített Komponensek

1. **`ObtuseSineFigures.tsx`**:
   - `ObtuseAreaPairSvg`: a kidolgozott feladat két háromszöge (52° és 128°), közös magassággal, méretarányosan.
   - `SideBySideTrianglesSvg`: a két háromszög egymás mellett (tankönyvi megjegyzés).
   - `SupplementarySineDefinitionSvg`: az ABC és CBD háromszög – sin γ = sin (180° − γ).
   - `RightAngleSineSvg`: derékszögű háromszög, T = ab / 2 ⇒ sin 90° = 1 (derékszög jelölése: negyedkörív ponttal).
   - `SineInverseTwoAnglesSvg`: α és 180° − α azonos „magassággal” – a sin⁻¹ csak a hegyesszöget adja.
2. **`ObtuseSineTheory.tsx`**: kidolgozott feladat, definíciók, táblázatos feladat, Dóri hibája, házi feladatok, csapda.
   - **I. Laboratórium:** γ csúszka 1°–179°, oldalcsúszkák – magasság és terület élőben, a kiegészítő szög ugyanazt a területet adja.
   - **II. Laboratórium:** szög visszakeresése két oldalból és területből (két / egy / nincs megoldás), tankönyvi előbeállításokkal.
3. **`ObtuseSineMatcher.tsx`**: 3 szint × 8 pár (nevezetes értékek, területszámítás, visszakeresés).
4. **`ObtuseSineSorter.tsx`**: 3 szint × 3 kategória (hegyes-/derék-/tompaszög; 0,5 / √3/2 / 1; két / egy / nincs megoldás).
5. **`ObtuseSineQuiz.tsx`**: 30 kérdés 3 szinten, 3 puskakártyával.

Progress ID-k: kvíz `g11-trig-tompaszog-szinusz-quiz`, párosító `g11-trig-tompaszog-szinusz-matcher`, csoportosító `g11-trig-tompaszog-szinusz-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic1ObtuseSine.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
