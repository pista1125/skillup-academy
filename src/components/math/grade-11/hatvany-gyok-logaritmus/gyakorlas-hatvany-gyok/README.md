# 5. Gyakorlás – hatvány, gyök (tankönyv 30. lecke, 92–93. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 92–93. oldal) alapján kidolgozott gyakorló modul. A diákzónában a III. fejezet 5. leckéje.

---

## 🎯 Tananyag Áttekintés

Gyakorló óra a fejezet első négy leckéjéhez (hatványozás ismétlése, számok n-edik gyöke, racionális kitevő I–II.). A feladatok számológép nélkül oldandók meg: hatványok **összehasonlítása**, számok elhelyezése a **számegyenesen**, kifejezések felírása **2 hatványaként**, és **kitevő-helyettesítés** (ha 5ᵏ = 3, mennyi 5³ᵏ⁻²?).

### Összefoglaló
| Fogalom | Szabály | Feltétel |
|---|---|---|
| Nulla és negatív egész kitevő | a⁰ = 1, a⁻ⁿ = 1/aⁿ | a ≠ 0 |
| n-edik gyök | ⁿ√a | páros n esetén a ≥ 0 |
| 1/n kitevő | a^(1/n) = ⁿ√a | a ≥ 0 |
| p/q kitevő | a^(p/q) = (q-adik gyök a)^p, a^(−p/q) = 1/a^(p/q) | a > 0 |

Azonosságok (pozitív alap, racionális kitevő): aᵐaⁿ = aᵐ⁺ⁿ; aᵐ : aⁿ = aᵐ⁻ⁿ; (ab)ⁿ = aⁿbⁿ; (a/b)ⁿ = aⁿ/bⁿ; (aᵐ)ⁿ = aᵐⁿ.

---

## 📐 Tankönyvi feladatok (ellenőrzött eredmények)

- **1.** Melyik a nagyobb? a) 4^0,5 = 2 > 2^0,25 ≈ 1,19; b) 3⁵ · 3⁻⁸ = 1/27 > (1/27)² ; c) 25^(3/2) = 125 > 27^(2/3) = 9; d) 3⁻² = 1/9 < 16^(−3/4) = 1/8.
- **2.** Számegyenes (válogatás): ∛(−125/8) = −5/2; −3⁰ = −1; ∛27 · 2⁻⁴ = 3/16; 16 · 10⁻² = 0,16; π⁰ − 2⁴ · 4⁻² = 0.
- **3.** A 2 hatványaként: a) ⁵√16 · 2⁻³ = 2^(−11/5); d) 4^1,5 · 8⁻² = 2⁻³.
- **4.** Ha 5ᵏ = 3: 5⁻ᵏ = 1/3; 5²ᵏ = 9; 5ᵏ⁺¹ = 15; 5³ᵏ⁻² = 27/25.
- **5.** Ha 7ᵏ = 4 és 7ᵐ = 5: 7ᵏ⁺ᵐ = 20; 7ᵏ⁻ᵐ⁺² = 196/5 = 39,2; 7³ᵏ⁻²ᵐ = 64/25.
- **HF 2. a)** a⁻¹ + a⁻² = (a + 1)/a².
- **HF 4.** Ha 10ᵏ = 7: 10ᵏ⁺³ = 7000; 10⁴ᵏ = 2401; 10⁻²ᵏ = 1/49.
- **Ráadás 2.** ∛((3³)³) = 3³; ∛(3^(3³)) = 3⁹; ⁴√((2⁴)⁸) = 2⁸; ⁴√(2^(4⁸)) = 2^(4⁷) = 2¹⁶³⁸⁴.

> **⚠️ CSAPDA:** 5ᵏ⁺¹ ≠ 5ᵏ + 1! A kitevőben álló összeg szorzatot jelent: 5ᵏ⁺¹ = 5ᵏ · 5 = 15.

> Megjegyzés: a tankönyvi szövegkivonatban a 2. feladat c), d), g), i) tétele, a 3. b), c), a 4. e), az 5. d), e) feladat, a házi feladatok többsége és a Ráadás 1. nem olvasható egyértelműen, ezért a modul ezeket nem dolgozza fel. A kvíz 28. kérdése (7²ᵐ⁻ᵏ = 25/4) a tankönyvi 5. feladat mintájára készült.

---

## 💻 Elkészített Komponensek

1. **`PowerRootPracticeFigures.tsx`**:
   - `ChapterMapSvg`: a fejezet eddigi útja (egész kitevő → n-edik gyök → 1/n → p/q kitevő).
   - `PracticeNumberLineSvg`: a 2. feladat számai a számegyenesen.
   - `PowersOfTwoSvg`: számok 2 hatványaként (egész és törtkitevő).
   - `ExponentSubstitutionSvg`: ha 5ᵏ = 3 – 5³ᵏ⁻² = 27/25 és 5ᵏ⁺¹ = 15.
   - `CompareZoomSvg`: 3⁻² = 1/9 és 16^(−3/4) = 1/8 összehasonlítása.
2. **`PowerRootPracticeTheory.tsx`**: strukturált összefoglaló táblázattal, kidolgozott tankönyvi feladatok (1–5., HF, Ráadás), csapda.
   - **I. Laboratórium:** kitevő-helyettesítő (alap 5/7/10, bᵏ értéke, k szorzója, hozzáadott szám) – lépésenkénti átalakítás, pontos tört és numerikus ellenőrzés.
   - **II. Laboratórium:** „Melyik a nagyobb?” játék 8 párral, pontszámmal és magyarázattal.
3. **`PowerRootPracticeMatcher.tsx`**: 3 szint × 8 pár (értékek; 2 hatványai; kitevő-helyettesítés).
4. **`PowerRootPracticeSorter.tsx`**: 3 szint × 3 kategória (előjel; = 2⁻³ / 2³ / 2^(1/2); összeg / különbség / szorzó a kitevőben).
5. **`PowerRootPracticeQuiz.tsx`**: 30 vegyes kérdés 3 szinten, kérdéstípus-címkékkel, mérleg- és helyettesítés-ábrákkal, 3 puskakártyával (progress id: `g11-exp-hatvany-gyok-gyakorlas-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic3PowerRootPractice.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
