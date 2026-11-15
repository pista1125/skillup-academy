# 10. Racionális számok, irracionális számok (51. lecke, 152–155. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 152–155. oldal) alapján kidolgozott oktatási modul. A diákzónában a IV. Számelmélet fejezet **10.** leckéje.

---

## 🎯 Tananyag Áttekintés

**1. kidolgozott feladat:** helyezzük el a számítások eredményét a számhalmazok Venn-diagramjában!
a) 12 · 5/2 = 30; b) 8⁰ = 1; c) √144 = 12; d) 82 · 0,25 = 20,5; e) −7; f) √(5² + 12²) = 13; g) 1/5 − 2/3 = −7/15; h) T = 4²π = 16π ≈ 50,27; i) √(1² + 1²) = √2 ≈ 1,41.
ℕ: 1, 12, 13, 30; ℤ ∖ ℕ: −7; ℚ ∖ ℤ: 20,5 és −7/15; irracionális: 16π és √2.

**Elmélet:**
- A négyzetgyökvonás kivezethet a racionális számok halmazából.
- **Irracionális szám:** olyan valós szám, amely nem írható fel két egész szám hányadosaként; tizedes tört alakja **végtelen, nem szakaszos**. Végtelen sok van belőlük: √2, √3, √5, … (ha a gyökjel alatt nem négyzetszám áll – a √4 = 2 racionális!), π, 2π, illetve szabállyal képzett tizedes törtek, pl. 0,12112211122211112222… (indirekt bizonyítás: egy k hosszú szakasz csupa 1-esből állna).
- Szerkesztés: az egységnégyzet átlója √2; a 2 és 1 befogójú derékszögű háromszög átfogója √5; a **Theodorus-spirállal** bármely pozitív egész négyzetgyöke megszerkeszthető. A π hosszúságú szakasz nem szerkeszthető (kör négyszögesítése).
- Az irracionális számok halmaza **nem zárt** a négy alapműveletre; ℚ ∪ ℚ* = ℝ, és ℝ zárt mind a négy alapműveletre.
- Kiegészítésként (a tankönyvi tervben szereplő ötlet alapján): a √2 irracionalitásának indirekt bizonyítása lépésenként, és a szakaszos tizedes tört átírása közönséges törtté.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **2. kidolgozott feladat (két irracionális szám):** A hamis (√2 + (−√2) = 0); B igaz (√3 · 2√3 = 6); C igaz (√8 : √2 = 2; √10 : √2 = √5); D igaz (√2 + (6 − √2) = 6); E hamis (8π − 5π = 3π).
- **3. kidolgozott feladat (racionális és irracionális):** A hamis (0 + √2 = √2); B igaz (0 · √3 = 0); C igaz (8π : 2 = 4π); D igaz (5 · π = 5π).
- **Feladat 1.** A halmazábra számai a kinyert szövegben hiányosak, ezért a modul nem dolgozza fel őket tételesen.
- **Feladat 3.** √13: a 3 és 2 befogójú derékszögű háromszög átfogója.
- **Feladat 4.** Példák: a) −2,5; −2,9; b) −√2; −√3; c) 105, 112, 119; d) 122, 128, 134, 140; e) 1/3; 2/3.
- **Feladat 5.** ℚ ∖ ℚ* = ℚ; ℚ ∩ ℚ* = ∅; ℝ ∖ ℚ* = ℚ; ℝ ∪ ℚ* = ℝ; ℚ ∖ ℝ = ∅; ℤ ∩ ℚ* = ∅.
- **Feladat 6.** P = 5π + 2: a) P + (−5π) = 2; b) pl. 3P = 15π + 6; c) P : P = 1; d) P − 2 = 5π.
- **HF 1.** A igaz; B (√2 reciproka racionális) hamis: 1/√2 = √2/2; C igaz (pl. a két szám számtani közepe); D hamis; E igaz.
- **HF 2.** a = [2² · 3 · 5³ · 7; 3² · 5² · 11] = 2² · 3² · 5³ · 7 · 11 és b = (2³ · 3² · 7³; 2⁴ · 3 · 7) = 2³ · 3 · 7 = 168 gyöke irracionális; c = 700/1575 = 4/9 ⇒ √c = 2/3; d = 2¹³ · 5³² · 7 · 2⁵¹ · 7³ · 11² = 2⁶⁴ · 5³² · 7⁴ · 11² négyzetszám (a d tényezőit a kinyert szövegből rekonstruáltuk); e = 81 · 225 = 135²; f = π⁴ ⇒ √f = π² irracionális.
- **HF 3.** a) −6/9 (= −2/3), egyetlen ilyen szám van (−3/6 = −0,5 véges); b) pl. −√2/2, −π/5.

> **⚠️ CSAPDA:** a gyökjel még nem jelent irracionális számot: √(4/9) = 2/3, √144 = 12, √(81 · 225) = 135. Fordítva: a 22/7 racionális, csak a π közelítése.

---

## 💻 Elkészített Komponensek

1. **`G11RationalIrrationalFigures.tsx`**:
   - `NumberSetsVennSvg`: ℕ ⊂ ℤ ⊂ ℚ és ℚ* a valós számokon belül, a kidolgozott feladat számaival.
   - `UnitSquareDiagonalSvg`: az egységnégyzet átlója (√2) a számegyenesre forgatva.
   - `Sqrt5ConstructionSvg`: √5 szerkesztése a 2 és 1 befogójú háromszöggel.
   - `TheodorusSpiralSvg`: Theodorus-spirál √2-től √17-ig.
   - `DecimalKindsSvg`: véges, végtelen szakaszos és végtelen nem szakaszos tizedes törtek.
   - Segédek: `RightAngleMark` (derékszög negyedkörívvel és ponttal), `theodorusPoints`.
2. **`G11RationalIrrationalTheory.tsx`**: kidolgozott feladat, definíció és példák, szerkesztések, műveletek (2–3. kidolgozott feladat), halmazműveletek, P = 5π + 2, a √2 irracionalitásának lépésenkénti bizonyítása, csapda.
   - **I. Laboratórium:** szakaszos tizedes törtből közönséges tört (egészrész, nem ismétlődő jegyek, szakasz) – a 10ᵏ-szoros kivonásos módszer lépései, egyszerűsítés, véges-e a tizedes alak.
   - **II. Laboratórium:** Theodorus-spirál csúszkával (√2–√17), az átfogók racionális vagy irracionális besorolásával.
3. **`G11RationalIrrationalMatcher.tsx`**: 3 szint × 8 pár (számítás és eredmény; szakaszos tizedes tört és közönséges tört; állítás és példa).
4. **`G11RationalIrrationalSorter.tsx`**: 3 szint × 3 kategória × 9 elem (természetes, racionális vagy irracionális; a tizedes tört alak fajtája; műveletek eredménye).
5. **`G11RationalIrrationalQuiz.tsx`**: 30 kérdés 3 szinten, kérdéstípus-címkékkel és szükség szerint ábrával, 3 puskakártyával (progress id: `g11-num-irracionalis-quiz`; párosító: `g11-num-irracionalis-matcher`; csoportosító: `g11-num-irracionalis-sorter`).

A komponensnevek `G11` előtagot kaptak, mert a `RationalIrrational*` nevek a 9. évfolyamon már foglaltak.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic4G11RationalIrrational.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
