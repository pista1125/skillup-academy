# 13. A forgáskúp felszíne és térfogata (tankönyv: 14. lecke, 32–33. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 32–33. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a térgeometria fejezet **13.** leckéje. Kiegészítő feladatanyag: a 15. lecke (Gyakorlás, 34–35. o.) kúpos feladatai (papírpohár, „Finom csemege”, gúla és kúp, kráter-tó).

---

## 🎯 Tananyag Áttekintés

A kidolgozott feladat Arkhimédész híres ábrája: forgáshenger (M = 2r), beírt gömb és kúp. Térfogataik aránya **1 : 2 : 3**; r = 5 cm esetén a felszínek: henger 150π ≈ 471 cm², gömb 100π ≈ 314 cm², kúp 25π(1 + √5) ≈ 254 cm².

---

## 📐 Fő Tételek

- A forgáskúp palástja síkba kiterítve **körcikk**: sugara az alkotó (a), íve az alapkör kerülete (2rπ); $T_{körcikk} = i \cdot r_{cikk}/2$ ⇒ $T_{palást} = r\pi a$.
- **Felszín:** $A = r^2\pi + r\pi a = r\pi(r + a)$.
- **Térfogat:** $V = \dfrac{r^2\pi \cdot M}{3}$ – az azonos alapú és magasságú henger harmada.
- A kiterített palást középponti szöge: $α = 360° \cdot r / a$.

### Tankönyvi feladatok (eredmények)
- **1.** d = 7,5 cm, M = 9 cm: a = 9,75 cm, A ≈ 159,0 cm², V ≈ 132,5 cm³, φ ≈ 45,2°, alkotó–alapsík ≈ 67,4°.
- **2.** Alap 4,2 dm, szár 2,9 dm: M = 2 dm, φ ≈ 92,8°, V ≈ 9,24 dm³, palást középponti szöge ≈ 260,7°, A = 10,5π ≈ 33,0 dm².
- **3.** Sóderkupac (d = 3 m, M ≈ 0,8 m): V ≈ 1,88 m³ < 2 m³.
- **4.** Papírcsákó (132°, ív 44 cm): a ≈ 19,1 cm, r ≈ 7,0 cm, M ≈ 18 cm.
- **HF 1.** 35 és 84 mm befogó, a hosszabbik körül: A ≈ 13 854 mm², V ≈ 107 757 mm³.
- **HF 2.** M = 88 mm, 45°: A ≈ 58 734 mm², V ≈ 713 636 mm³.
- **HF 3.** Popcorn-tölcsér (R = 20 cm, ív 60 cm): V ≈ 1678 cm³.

> **⚠️ CSAPDA:** a kiterített palást (körcikk) sugara az alkotó, nem az alapkör sugara; a térfogatba M kerül, nem a.

---

## 💻 Elkészített Komponensek

1. **`ConeAreaVolumeFigures.tsx`**: `ArchimedesSvg`, `ConeNetSvg` (palást kiterítése), `SectorSvg` (körcikk adatai), `GravelPileSvg` (3. feladat), `PartyHatSvg` (4. feladat), `ConeVsCylinderSvg`.
2. **`ConeAreaVolumeTheory.tsx`**: Arkhimédész-feladat, elmélet, táblázat, kidolgozott feladatok, HF-eredmények, csapda.
   - **I. Laboratórium:** a palást kiterítése – r és a csúszkával a körcikk középponti szöge élőben + forgatható kúp (`Solid3DViewer`).
   - **II. Laboratórium:** kúp körcikkből (csákó, popcorn-tölcsér) – sugár és ívhossz csúszkával.
3. **`ConeAreaVolumeMatcher.tsx`**: 3 szint × 8 pár.
4. **`ConeAreaVolumeSorter.tsx`**: 3 szint × 3 kategória × 9 elem.
5. **`ConeAreaVolumeQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), ábrákkal, 3 puskakártyával. Aktivitás-azonosítók: `g12-ter-forgaskup-felszin-terfogat-quiz`, `-matcher`, `-sorter`.

A rajzok a `../a-gula/SolidSketch.tsx` közös SVG-készletét használják.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic1ConeAreaVolume.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
