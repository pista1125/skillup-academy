# 35. A logaritmus fogalma (35. lecke, 102–105. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 102–105. oldal) alapján kidolgozott oktatási modul. A diákzónában: **III. fejezet, 10. A logaritmus fogalma**.

---

## 🎯 Tananyag Áttekintés

A lecke három egyenlettel indul, amelyekben az ismeretlen a hatvány más-más része: **x = 5⁶** (hatványérték → hatványozás, x = 15 625), **y⁷ = 2187** (hatványalap → gyökvonás, y = ⁷√2187 = 3), **2ᶻ = 128** (hatványkitevő → **logaritmus**, z = log₂ 128 = 7). A második kidolgozott feladat ugyanezt „csúnya” számokkal teszi: 7x = 5^{2/3} ⇒ x = (1/7)·∛25 ≈ 0,42; y⁷ = 923 ⇒ y = ⁷√923 ≈ 2,65; 2ᶻ = 412 ⇒ z = log₂ 412 ≈ 8,69. A lecke Ráadás része a logarléc történetét és működési elvét mutatja be.

---

## 📐 Fő Fogalmak

- **Definíció:** ha a és b pozitív valós számok és a ≠ 1, akkor **logₐ b** azt a kitevőt jelenti, amelyre az a számot emelve b-t kapunk. a a logaritmus **alapja**, b az **argumentuma** (régiesen numerusa).
- **Megjegyzések:** a logaritmus mindig hatványkitevőt jelöl; aˣ = b megoldása x = logₐ b; képlettel a^(logₐ b) = b.
- **Feltételek:** 1 minden hatványa 1 (⇒ a ≠ 1); a 0 negatív és nulladik hatványa, valamint negatív számok racionális/irracionális hatványai nincsenek értelmezve (⇒ a > 0); pozitív szám minden hatványa pozitív (⇒ b > 0).
- **Példák:** log₅ 25 = 2; log₃ (1/9) = −2; log₄₉ 7 = 1/2; log₂ ∛(1/2) = −1/3.

### Tankönyvi feladatok (node-dal ellenőrzött eredmények)
- **1.** Minta: 2ˣ = 0,25 ⇒ x = log₂ 0,25 = −2; 2ˣ = 32 ⇒ 5; 10ˣ = 100 000 000 ⇒ 8; 10ˣ = ⁷√100 ⇒ 2/7.
- **2.** log₁₃ 169 = 2; log₇ 343 = 3; log₁₆ 4 = 1/2; log₂ 8 = 3; log₄ 0,25 = −1; log₅ 625 = 4.
- **3.** log₃ 1, 3, 9, 27, 81 = 0, 1, 2, 3, 4; log₃ 1/3, 1/9, 1/27, 1/81 = −1, −2, −3, −4.
- **4.** logₖ 25 = 2 ⇒ k = 5; log₅ k = 3 ⇒ k = 125; log₄ 4 = k ⇒ k = 1.
- **5.** 2^(log₂ 5) = 5; 7^(log₇ 8) = 8; 9^(log₉ 0,6) = 0,6; 0,4^(log₀,₄ 7) = 7.
- **6.** a) log₂ 2 + log₂ 4 + log₄ 2 + log₄ 4 = 4,5; b) log₀,₅ 2 + log₀,₅ 4 + log₀,₅ 8 = −6; c) log₃ 3 · log₃ 2 · log₃ 1 = 0.
- **HF 1.** log₂ a nincs értelmezve a = −8, −2, 0 esetén; a = 1, 2, 8, 32, 64, 128, 256, 1024, 2048 esetén 0, 1, 3, 5, 6, 7, 8, 10, 11.
- **HF 2.** 3-as alapú logaritmusa 0 → 1; 1 → 3; 3 → 27; 9 → 19 683.
- **HF 3.** log₄: 4 → 1, 1 → 0, 2 → 1/2, 1/4 → −1; log₉: 3 → 1/2, 1/3 → −1/2, 9 → 1, 1 → 0, 81 → 2; 5^(log₅ 3) = 3, 6^(log₆ 2/3) = 2/3, 0,5^(log₀,₅ 8) = 8.
- **HF 4.** a) log₄ 64 + log₅ 125 = 6; b) log₆₄ 4 − log₂₅ 5 = −1/6.
- **Ráadás – logarléc:** Gunter (1620-as évek), Oughtred (1630) – 2 · 3 = 6, mert lg 2 + lg 3 = lg 6 ≙ 75,26 mm + 119,28 mm = 194,54 mm.

> **⚠️ CSAPDA:** log₂ (−8) nincs értelmezve (2⁻³ = 1/8, nem −8); a kitevő lehet negatív, az argumentum és az alap nem. logₖ 25 = 2 ⇒ k = 5, a −5 nem lehet alap.

*Megjegyzés: a szöveges kivonatban az 1. feladat b), c), f) részének kifejezései (gyökös/törtes alakok) nem olvashatók egyértelműen, ezért a modul a minta mellett az a), d), e) részeket és egy saját, azonos típusú példát (2ˣ = 1/16 ⇒ −4) dolgoz fel.*

---

## 💻 Elkészített Komponensek

1. **`LogarithmConceptFigures.tsx`**:
   - `LogConceptTripleSvg`: x = 5⁶, y⁷ = 2187, 2ᶻ = 128 – az ismeretlen szerepe és a művelet.
   - `LogConceptDefinitionSvg`: aˣ = b ⇔ x = logₐ b, az alap, a kitevő és az argumentum megnevezésével.
   - `LogConceptConditionsSvg`: miért kell a > 0, a ≠ 1, b > 0.
   - `LogConceptGraphSvg`: log₂ 8, log₂ 5, log₂ 0,5 leolvasása az y = 2ˣ grafikonról.
   - `LogConceptSlideRuleSvg`: logarléc, 2 · 3 = 6 a hosszak összeadásával.
2. **`LogarithmConceptTheory.tsx`**: két kidolgozott feladat táblázattal, definíció, megjegyzések, feltételek, feladatmegoldások (1–6., HF 1–4.), csapda, Ráadás.
   - **I. Laboratórium:** kitevőkereső – a és b megadása (gyorsgombok, törtek is), tipp ellenőrzése, logₐ b pontos (tört) vagy közelítő értéke, hatványalak, y = aˣ grafikon az y = b egyenessel; „nincs értelmezve” magyarázatok (a = 1, a ≤ 0, b ≤ 0).
   - **II. Laboratórium:** logarléc-szimulátor – két tényező csúszkával, mozgó nyelv, hosszak mm-ben (250 · lg x), túlcsordulás kezelése (a nyelv 10-es jele).
3. **`LogarithmConceptMatcher.tsx`**: 3 szint × 8 pár (egész értékű logaritmusok; hatványalak ↔ logaritmusalak; törtek, negatív kitevők).
4. **`LogarithmConceptSorter.tsx`**: 3 szint × 3 kategória × 9 elem (pozitív egész / negatív / nincs értelmezve; hatványozás / gyökvonás / logaritmus; negatív / 0 és 1 között / 1 felett).
5. **`LogarithmConceptQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), minden kérdésen típus-címke, 3 kérdésen ábra, 3 puskakártya (progress id: `g11-exp-logaritmus-fogalom-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic3LogarithmConcept.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
