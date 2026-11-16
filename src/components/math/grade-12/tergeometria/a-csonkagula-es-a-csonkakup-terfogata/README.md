# 16. A csonkagúla és a csonkakúp térfogata (18. lecke, 40–41. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 40–41. oldal) alapján kidolgozott oktatási modul. A diákzónában ez az I. Térgeometria fejezet **16.** leckéje. Kiegészítő feladatanyag a törölt 19. tankönyvi lecke (Gyakorlás, 42–43. o.) feladataiból.

---

## 🎯 Tananyag Áttekintés

Bevezető: a Valençay-kecskesajt csonkagúla alakú – a legenda szerint Napóleon egy kardcsapással levágta a piramis formájú sajt tetejét. A levágott kis gúla középpontosan hasonló az eredetihez, így a csonka test térfogata **V_nagy − V_kicsi = (1 − λ³) · V_nagy**.

---

## 📐 Fő Összefüggések

- **1. módszer:** az eredeti gúla / kúp és a lemetszett, hozzá hasonló gúla / kúp térfogatának különbsége.
- **2. módszer (képlet):** alaplap T, fedőlap t, magasság M:
  $$V_{csonka} = \frac{M}{3}\left(T + \sqrt{T\cdot t} + t\right)$$
  - szabályos négyoldalú csonkagúla: $V = \frac{M}{3}(a^2 + ab + b^2)$
  - csonkakúp: $V = \frac{M\pi}{3}(R^2 + Rr + r^2)$

### Kidolgozott feladat (sajt)
Alapél 4 cm, oldalél 7 cm, a kis gúla magassága az eredeti 60%-a: λ³ = 0,216, V_csonka = 0,784 · V_nagy; M = √(49 − 8) = √41 ≈ 6,4 cm; V_nagy ≈ 34,1 cm³; **V_csonka ≈ 26,7 cm³** (tankönyvi kerekítés; pontosan ≈ 26,8 cm³).

### Feladatok (ellenőrzött eredmények)
- **1.** m = 8 cm, 45°-os oldallapok: T = 256 cm², levágott 6 cm-es gúla alapja 144 cm²; V_nagy ≈ 682,7 cm³, V_kicsi = 288 cm³, V_csonka ≈ 394,7 cm³; felszínek: kis gúla 144 + 144√2 ≈ 347,6 cm², csonkagúla 400 + 112√2 ≈ 558,4 cm².
- **2.** a = 12, b = 8, M = 6: kiegészítő gúla **12 cm**, V = **608 cm³**.
- **3.** r = 3, m = 12 cm, vágás a csúcstól 4 és 8 cm-re: 4π/3 ≈ 4,19; 28π/3 ≈ 29,32; 76π/3 ≈ 79,59 cm³ (1 : 7 : 19).
- **HF 1.** oldalél 10 cm, 52°: M ≈ 7,88 cm, alapél ≈ 8,71 cm, V ≈ 199,1 cm³; az alaptól 2 cm-re vágva ≈ 82,7 és ≈ 116,4 cm³.
- **HF 2.** R = 10, r = 4, M = 5: eredeti kúp 25/3 ≈ 8,33 cm; kiegészítő kúp 160π/9 ≈ 55,9 cm³, csonkakúp 260π ≈ 816,8 cm³.
- **HF 3.** zselés cukor: V ≈ 4115 mm³ ≈ 4,12 cm³, sűrűség ≈ 1,52 g/cm³.
- **Ráadás (1895):** nyolcszög alapú csonkagúla, oldaltávol 72 dm, 75°, m = 96 dm ⇒ A ≈ 63 230 dm², V ≈ 1 130 000 dm³.
- **19. lecke (extra):** Rio székesegyház fedőköre ≈ 26 m, V ≈ 243 400 m³; háromoldalú gúla harmadolása (kis gúla ≈ 25,1 cm³); margarinos csésze ≈ 500,3 cm³; sótartó ≈ 22,35 cm³ (22 töltés); 63/27 mm-es, 60°-os csonkagúla ≈ 94,0 cm³; kúp felezése az alaptól ≈ 3,09 cm-re.

> **⚠️ CSAPDA:** V ≠ M · (T + t)/2 – az alapterületek átlagolása mindig túl nagy értéket ad (a = 12, b = 8, M = 6: 624 cm³ a helyes 608 cm³ helyett).

---

## 💻 Elkészített Komponensek

1. **`FrustumVolumeFigures.tsx`**: `FrustumVolumeCheeseSvg` (levágott gúla A–E, O), `FrustumVolumeHeightTriangleSvg` (2√2, 7, M), `FrustumVolumeFormulasSvg` (T/t/M, a/b/M, R/r/M), `FrustumVolumeConeCutsSvg` (3. feladat), `FrustumVolumeComplementSvg` (kiegészítő gúla, 2. feladat), `FrustumVolumeDifferenceSvg` (nagy − kicsi = csonka).
2. **`FrustumVolumeTheory.tsx`**: bevezető, kidolgozott sajtfeladat, a két módszer és a képlet levezetésének vázlata, megoldott feladatok és házi feladatok, Ráadás, képlettábla, csapda.
   - **I. Laboratórium:** forgatható 3D csonkagúla / csonkakúp (`Solid3DViewer`) a levágott kis test szaggatott éleivel; alapméret, magasság és λ csúszkák, V_nagy, V_kicsi, különbség és képlet élőben.
   - **II. Laboratórium:** a képlet levezetése lépésenként (gombokkal): kiegészítő gúla, két gúla térfogata, különbség, képlet és a hibás átlagolás.
3. **`FrustumVolumeMatcher.tsx`**: 3 szint × 8 pár.
4. **`FrustumVolumeSorter.tsx`**: 3 szint × 3 kategória × 9 elem.
5. **`FrustumVolumeQuiz.tsx`**: 30 kérdés (10/10/10), 14 kérdés ábrával, 3 puskakártya (progress id: `g12-ter-csonka-terfogat-quiz`; matcher: `g12-ter-csonka-terfogat-matcher`, sorter: `g12-ter-csonka-terfogat-sorter`).

---

## 🧪 Tesztelés

`src/test/grade12Topic1FrustumVolume.test.tsx` – a 4 komponens és mind a 6 SVG ábra renderelése.
