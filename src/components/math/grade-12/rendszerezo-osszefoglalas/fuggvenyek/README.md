# 5. Függvények – összefoglalás (Rendszerező összefoglalás, 128–137. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., Rendszerező összefoglalás – „Függvények, sorozatok” blokk függvényes része, 128–137. oldal) alapján kidolgozott érettségi ismétlő modul. A diákzónában ez a rendszerező összefoglalás fejezet **5.** leckéje; a blokk sorozatos része a **6. leckében** (`sorozatok`) található.

---

## 🎯 Tananyag Áttekintés

A tankönyvi „FOGALMAK, TÉTELEK, MÓDSZEREK” táblázat (128–132. o.):

- **D** Függvény (az A halmaz minden eleméhez B pontosan egy elemét rendeli), értelmezési tartomány, képhalmaz, értékkészlet; példa: országok → fővárosok.
- **D** Hozzárendelési szabály, függvénytani jelölések (f: ℕ → ℝ, x ↦ 3x; D_f, R_f), helyettesítési érték.
- **D** Kölcsönösen egyértelmű függvény, függvény megfordítása (inverz: 3x ↔ x/3, elem ↔ vegyjel).
- **M** A függvény grafikonja; **D** zérushely, maximum/minimum és helyük; monotonitás (monoton / szigorúan monoton nő, csökken).
- **D** Lineáris függvény (konstans, elsőfokú, egyenes arányosság), fordított arányosság (a/x), abszolútérték-függvény, másodfokú függvény, négyzetgyökfüggvény, a alapú exponenciális függvény.
- **M** Függvénytranszformációk: eltolás, nyújtás/zsugorítás, tükrözés ((x − 4)², x² − 3, 2x², |x² − 3|).

### Kidolgozott feladatok
- **1.** A(−5; 6), B(5; −2) ⇒ f(x) = −0,8x + 2; f(123) = −96,4; f(x) = 456 ⇒ x = −567,5; zérushely 2,5; f(x) < 0 ⇔ x > 2,5.
- **2.** x² eltolása a v(−3; −4) vektorral: g(x) = (x + 3)² − 4; zérushelyek −5 és −1; minimum −4 (x = −3); g(x) = −3 ⇔ x = −4 vagy −2.- **3.** f(x) = 1/x + 2 (R_f = ℝ ∖ {2}), g = |f| (R_g = [0; ∞[, minimumhely −1/2), h = f az [1; 4]-en (R_h = [2,25; 3]).

### Tankönyvi feladatok (a modulban feldolgozva)
- **A1.** Függvény / nem kölcsönösen egyértelmű / kölcsönösen egyértelmű hozzárendelések. **A2.** 1 és −1/2. **A3.** f(x) = 0,25x + 2,75.
- **A5.** (x − 2)² − 5 grafikonja. **A6.** 16. **A7.** igaz/hamis állítások. **A8.** szigorúan csökkenő. **A9.** x = 3/7. **A10.** 27 függvény, 6 kölcsönösen egyértelmű. **A11.** 5x − 2, (x + 4)², −|x|, √x + 6.
- **P1.** Ferde hajítás: 5 m, csúcs (2 s; 9 m), 8 m-en 1 s és 3 s, talajra ér 5 s-nál. **P2.** 3 − 2x = x² ⇒ −3 és 1; f > g a ]−3; 1[-en.
- **P3.** Csomagküldés: 640 Ft fix díj, 12 Ft/dkg, 450 g ⇒ 1180 Ft, 1600 Ft ⇒ 0,8 kg. **P5.** Sörhab 14 · 0,991ᵗ: 14 mm, 1 perc után ≈ 8,1 mm, 3 mm ≈ 170,4 s után.
- **Ráadás.** D(h) = √(12 740h + h²): 455 m-ről ≈ 76 km, 300 km-hez h ≈ 7,06 km.

> **⚠️ CSAPDA:** f(x − 4) jobbra tol (nem balra); a képhalmaz és az értékkészlet nem ugyanaz; mértékegység-váltás (g ↔ dkg, m ↔ km) a modellfeladatokban.

---

## 💻 Elkészített Komponensek

1. **`FunctionsSummaryFigures.tsx`**:
   - `MappingSvg`: országok → fővárosok hozzárendelés (értelmezési tartomány, képhalmaz, értékkészlet).
   - `BasicFunctionsSvg`: a hat alapfüggvény grafikonja (ax + b, 1/x, |x|, x², √x, 2ˣ).
   - `TransformationsSvg`: (x − 4)², x² − 3, 2x², |x² − 3| az x² alapfüggvényhez képest.
   - `LinearExampleSvg`: kidolgozott 1. feladat (A, B pont, zérushely).
   - `ShiftExampleSvg`: kidolgozott 2. feladat (eltolás v(−3; −4)-gyel, metszés a h(x) = −3 egyenessel).
   - `ReciprocalExampleSvg`: kidolgozott 3. feladat (1/x + 2, |f|, leszűkítés [1; 4]-re).
2. **`FunctionsSummaryTheory.tsx`**: két fogalomtár-táblázat (fogalmak; alapfüggvények és transzformációk), három kidolgozott feladat, a blokk feladatai, csapda.
   - **I. Laboratórium:** függvénytranszformátor – alapfüggvény választása (x², |x|, √x, 1/x, 2ˣ), u, v eltolás, k szorzó, külső abszolút érték; élő képlet, leírás és grafikon.
   - **II. Laboratórium:** lineáris függvény két pontból – meredekség, képlet, helyettesítési érték, f(x) = y₀ megoldása, monotonitás, zérushely, grafikon.
3. **`FunctionsSummaryMatcher.tsx`**: 3 szint × 8 pár (alapfüggvény ↔ tulajdonság; transzformáció ↔ hatás; feladat ↔ eredmény).
4. **`FunctionsSummarySorter.tsx`**: 3 szint × 3 kategória × 9 elem (függvény / kölcsönösen egyértelmű; monotonitás; zérushelyek száma).
5. **`FunctionsSummaryQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 6 kérdésábrával, 3 puskakártyával.
- `plotKit.tsx`: belső koordináta-rendszer- és görberajzoló segédek (nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-sum-fuggvenyek-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic4FunctionsSummary.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
