# 5. A henger felszíne és térfogata (5. lecke, 14–15. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 5. lecke, 14–15. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a térgeometria fejezet **5.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Kidolgozott feladat – májkrémkonzervek:** a kisebb doboz r = 2,5 cm, M = 3 cm; a nagyobb minden mérete kétszeres.
- a) alumínium a kisebbhez: 12,5π + 15π = 27,5π ≈ **86,4 cm²**;
- b) a nagyobb felszíne 110π, az arány **4 = 2²**;
- c) térfogatok: 150π és 18,75π, az arány **8 = 2³** ⇒ 8 · 65 g = **520 g** májkrém.

---

## 📐 Elmélet

- A palást kiteríthető: 2rπ × M-es téglalap.
- **Felszín:** $A = 2 \cdot T_{alaplap} + K_{alaplap} \cdot M = 2r^2\pi + 2r\pi M$.
- **Térfogat:** $V = T_{alaplap} \cdot M = r^2\pi M$.
- Egyenlő oldalú henger (M = 2r): A = 6r²π, V = 2r³π (kiegészítés a feladatokhoz).

### Tankönyvi feladatok (a modulban feldolgozva)
- **1.** 2,6 × 4,5 cm-es téglalap forgatása: rövidebb oldal körül A ≈ 200,75 cm², V ≈ 165,40 cm³; hosszabb körül A ≈ 115,99 cm², V ≈ 95,57 cm³.
- **2.** Festőhenger (r = 2 cm, 20 cm széles, 3 ml/fordulat): 40 m²-hez ≈ 4,8 liter; a 16 cm-es vödörben ≈ 23,7 cm magas.
- **3.** A4-es karton (29,7 × 21): r = 3 cm → A = 108π ≈ 339,3 cm², r = 4 cm → 136π ≈ 427,3 cm², r = 5 cm nem lehet; 2rπ = 29,7 esetén r ≈ 4,73 cm, ≈ 22,5% hulladék.
- **4.** Koncertterem (téglalap + félkör, 4,5 m magas, 4 ajtó): ≈ 637,4 m² – *feltételezve, hogy a 22 m a téglalap hossza (az ábra a szövegből nem egyértelmű).*
- **HF 1.** Medence (d = 3 m, 1,2 m víz): ≈ 8,48 m³, ≈ 0,47 hónap, ≈ 5259 Ft; 160 cm magas medence bevont belső felülete ≈ 22,15 m².
- **HF 2.** Mézes üvegek: a magasabb térfogata fele a másikénak, az alacsonyabb a jobb vétel.
- **HF 3.** a × 4a-s téglalap: a rövidebb oldal körül 4-szer akkora térfogat.
- **HF 4.** 37,7 cm kerületű edény, +4,5 dl: a víz ≈ 16 cm magasan áll.

> **⚠️ CSAPDA:** A képletekben a sugár szerepel – átmérő megadásakor először felezni kell; nyitott edénynél csak egy alapkör számít.

---

## 💻 Elkészített Komponensek

1. **`CylinderAreaVolumeFigures.tsx`**:
   - `TwoCansSvg`: a két hasonló konzervdoboz.
   - `CylinderNetSvg`: a henger hálója (két körlap + 2rπ × M téglalap).
   - `CardboardCutSvg`: A4-es karton kivágási terve.
   - `PaintRollerSvg`: festőhenger egy fordulata.
   - `ConcertHallSvg`: a koncertterem alaprajza.
2. **`CylinderAreaVolumeTheory.tsx`**: kidolgozott feladat (a–c), képlettáblázat, kidolgozott feladatok (A–D), HF-eredmények, csapda.
   - **I. Laboratórium:** a palást animált kiterítése (Solid3DViewer, egyedi kiteríthető henger), élő A és V.
   - **II. Laboratórium:** konzervdoboz-optimalizáló – adott V mellett az A(r) görbe és a forgatható doboz; minimum M = 2r-nél.
3. **`CylinderAreaVolumeMatcher.tsx`**: 3 szint × 8 pár.
4. **`CylinderAreaVolumeSorter.tsx`**: 3 szint × 3 kategória × 9 elem.
5. **`CylinderAreaVolumeQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 12 kérdésábrával, 3 puskakártyával.
- `figKit.tsx`: belső rajzsegédek (nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-ter-henger-felszin-terfogat-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic1CylinderAreaVolume.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
