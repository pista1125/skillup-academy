# 5. Az eseménytér (37. lecke, 86–87. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 37. lecke, 86–87. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a statisztika és valószínűségszámítás fejezet **5.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Kidolgozott feladat:** egy 10, egy 20 és egy 50 forintost feldobunk, és sorrendben feljegyezzük a fej (F) / írás (I) eredményt. A lehetséges kimenetelek száma 2³ = 8 (FFF, FFI, FIF, FII, IFF, IFI, IIF, III); több fej, mint írás 4 esetben van (FFF, FFI, FIF, IFF); egyenlő számú fej és írás nem lehetséges (3 páratlan).

---

## 📐 Elmélet

- **Elemi események:** egy véletlen kísérlet lehetséges kimenetelei.
- **Eseménytér (H):** az elemi események halmaza. **Esemény:** az eseménytér részhalmaza (jele: A, B, …).
- **Biztos esemény:** biztosan bekövetkezik; **lehetetlen esemény:** nem következhet be.
- **Komplementer (Ā):** pontosan akkor következik be, amikor A nem.
- **Egymást kizáró események:** egyszerre nem következhetnek be (pl. A és Ā).
- Példák a három érme kísérletében: biztos – „a fejek száma ≤ 3”; lehetetlen – „a fejek és írások száma egyenlő”; A = „10 Ft-ossal fej” = {FFF, FFI, FIF, FII}, Ā = {IFF, IFI, IIF, III}.

### Tankönyvi feladatok (a modulban feldolgozva)
- **1.** Nyelvóra (13 olasz, 10 spanyol, 7 mindkettő, 16 diák, 4-et választunk): „van köztük olaszos” biztos, „mind spanyolt tanul, olaszt nem” lehetetlen (csak 3 ilyen diák van).
- **2.** Két játék kezdője 4 barát közül: 16 elemi esemény; „Anna kezdi az elsőt”: AA, AB, AC, AD; kizáró párok: K–L, K–N, L–M, M–N; a komplementerek megfogalmazása.
- **3.** Fehér és fekete kocka (6 × 6 = 36): A (fehér hatos) 6, B (pontosan egy hatos) 10, C (van hatos) 11, D (mindkettő hatos) 1, E (egyik sem hatos) 25, F (van nem hatos) 35; komplementerek: C–E, D–F; 5 elemű esemény: „az összeg 8”; L (összeg < 36) biztos, M (összeg 1) lehetetlen.
- **HF 1.** Három dobás: „első fej vagy második írás” 6 elemi esemény; „első két dobás fej és második két dobás írás” lehetetlen.
- **HF 2.** Két kocka: „szorzat > 16” (10 eset) és „összeg < 9” (26 eset) komplementerek.

> **⚠️ CSAPDA:** Az egymást kizáró események nem feltétlenül komplementerek (pl. „mindkettő hatos” és „egyik sem hatos”: 1 + 25 ≠ 36).

A korábbi (címek alapján írt) README Ω-val jelölte az eseményteret és valószínűségeket is tárgyalt; a tankönyv H-val jelöl, és ebben a leckében még nem számol valószínűséget – a modul a tankönyvet követi.

---

## 💻 Elkészített Komponensek

1. **`SampleSpaceFigures.tsx`**:
   - `ThreeCoinsTreeSvg`: a három pénzérme fadiagramja a 8 kimenetellel.
   - `SampleSpaceVennSvg`: eseménytér, elemi események, események (Venn).
   - `DiceTableSvg`: két kocka 6 × 6-os táblázata a hatosokkal.
   - `ComplementExclusiveSvg`: komplementer esemény és egymást kizáró események.
   - `TwoGamesStarterSvg`: a két játék kezdőinek 4 × 4-es táblázata.
2. **`SampleSpaceTheory.tsx`**: kidolgozott feladat, fogalomtáblázat, példák, a tankönyv 1–3. feladata kidolgozva, csapda.
   - **I. Laboratórium:** eseményválasztó a 6 × 6-os táblázatban (összeg, szorzat, hatos, prím…, k csúszka, komplementer kapcsoló) – elemszám, biztos/lehetetlen.
   - **II. Laboratórium:** n pénzérme (1–5) eseménytere, „pontosan / legalább / legfeljebb k fej” események kiemelése.
3. **`SampleSpaceMatcher.tsx`**: 3 szint × 8 pár (fogalmak; eseménytér-méretek; két kocka eseményei).
4. **`SampleSpaceSorter.tsx`**: 3 szint × 3 kategória × 9 elem (biztos / lehetetlen / egyik sem; 5 / 6 / 10 elemi esemény; komplementer / kizáró / egyszerre bekövetkezhet).
5. **`SampleSpaceQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 9 kérdésábrával, 3 puskakártyával.
- `probKit.tsx`: belső rajzsegédek (Venn-diagram, kockatáblázat, érme) – nem exportáljuk az `index.ts`-ből.

Aktivitás-azonosítók: `g12-stat-esemenyter-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic3SampleSpace.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
