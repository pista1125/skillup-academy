# 1. Számsorozatok (22. lecke, 52–53. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 22. lecke, 52–53. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a sorozatok fejezet **1.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Kidolgozott feladat (lépcső):** felfelé haladva egyszerre 1 vagy 2 fokot lépünk. Az n-edik fokra jutás lehetőségeinek száma aₙ: a₁ = 1, a₂ = 2, és n ≥ 3 esetén aₙ = aₙ₋₁ + aₙ₋₂ (az utolsó lépés 1 vagy 2). A tagok: 1; 2; 3; 5; 8; 13; 21; 34 – a 8. fokra 34-féleképpen juthatunk fel. Figyelmeztetés: az 1; 2; 3 kezdet után nem 4 jön.

---

## 📐 Elmélet

- **Sorozat (számsorozat):** valós számok végtelen sok tagból álló felsorolása.
- **Sorozat mint függvény:** értelmezési tartománya a pozitív egész számok halmaza, képhalmaza a valós számok halmaza; n ↦ aₙ.
- **Jelölés:** a sorozat {aₙ}, tagjai a₁, a₂, a₃, …, az n-edik tag aₙ.
- **Ábrázolás:** pontgrafikon – különálló (n; aₙ) pontok, nem kötjük össze őket (a modul kiegészítése a feladatok grafikonjai alapján).

> A korábbi, cím alapján írt README a monotonitást és a korlátosságot is ehhez a leckéhez sorolta – ezek a tankönyv 22. leckéjében **nem szerepelnek**, ezért a modul nem tárgyalja őket.

### Tankönyvi feladatok (a modulban feldolgozva)
- **2.** a₁₈, a₁₉, a₂₀ jelentése; a₁₈ = 4181, a₂₀ = 10 946 ⇒ a₁₉ = 6765, a₁₇ = 2584.
- **3.** 5/7 = 0,714285…: a 8. jegy 1, a 90. jegy 5, a 970. jegy 2.
- **4.** kₙ: 0; 1; 3; 6; 10; 15 (n(n − 1)/2); a felsorolt függvények közül az i(n) = (n² − n)/2 egyezik meg vele.
- **HF 1.** Vicc terjedése: új hallgatók 3; 9; 27; 81; 243; 729, összesen 4; 13; 40; 121; 364; 1093.
- **HF 2.** Hüllőállomány: 201; 202; 204; 208; …; 712 – nem marad közel azonos; aₙ₊₁ = 2aₙ − 200.
- **1.** Grafikonok: a) 6; 3; 2; 1,5; 1,2; 1; … ⇒ aₙ = 6/n; b) 3,75; 3,5; 3,25; … ⇒ bₙ = 4 − n/4; c) 1; 2; 4; 8 ⇒ cₙ = 2ⁿ⁻¹ (elmélet + kvíz ns-q17, ns-q20).
- **HF 3.** aₙ = (60 + n)/n: 61; 31; 21; 16; 13; bₙ = n/(n + 1) és cₙ = log₄ n első öt tagja.

> **⚠️ CSAPDA:** Néhány tag nem határozza meg a sorozatot; a pontgrafikon pontjait nem kötjük össze.

---

## 💻 Elkészített Komponensek

1. **`NumberSequencesFigures.tsx`**:
   - `StairsSvg`: a lépcső, a két érkezési móddal és az a₁…a₈ értékekkel.
   - `SequenceFunctionSvg`: a sorozat mint ℤ⁺ → ℝ hozzárendelés.
   - `PointGraphSvg`: a kₙ = n(n − 1)/2 sorozat pontgrafikonja.
   - `JokeTreeSvg`: a vicc terjedésének fája.
   - `RepeatingDecimalSvg`: az 5/7 periodikus tizedesjegyei.
2. **`NumberSequencesTheory.tsx`**: kidolgozott lépcsős feladat, fogalom és jelölés, pontgrafikon, a feladatok megoldása (lépcső visszafelé, 5/7 jegyei, vicc, hüllők), csapda.
   - **I. Laboratórium:** pontgrafikon-rajzoló 8 képlettel, tagszám- és kiemelt-tag csúszkával.
   - **II. Laboratórium:** lépcsőszámláló (1–2 vagy 1–3 fokos lépések), n ≤ 6 esetén az összes lépéssorozat felsorolásával.
3. **`NumberSequencesMatcher.tsx`**: 3 szint × 8 pár (fogalmak; képlet ↔ tagok; mintafeladatok eredményei).
4. **`NumberSequencesSorter.tsx`**: 3 szint × 3 kategória × 9 elem (sorszám / tag / sorozat; melyik sorozat tagja; 5/7 jegyei).
5. **`NumberSequencesQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 6 kérdésábrával, 3 puskakártyával.
- `seqKit.tsx`: belső rajzsegédek (pontgrafikon, tagsor, derékszögjel; nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-seq-szamsorozatok-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic2NumberSequences.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
