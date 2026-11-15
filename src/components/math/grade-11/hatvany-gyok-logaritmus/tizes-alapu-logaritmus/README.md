# 36. A tízes alapú logaritmus használata (36. lecke, 106–107. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 106–107. oldal) alapján kidolgozott oktatási modul. A diákzónában: **III. fejezet, 11. A tízes alapú logaritmus használata**.

---

## 🎯 Tananyag Áttekintés

A tízes alapú exponenciális függvény értékkészlete a pozitív valós számok halmaza, ezért **minden pozitív szám felírható a 10 hatványaként**: 4 = 10^(log₁₀ 4) ≈ 10^0,60206. A tízes alapú logaritmus jele **lg** (lg 4 ≈ 0,60206), számológépen a `log` / `lg` billentyűvel kapjuk. A kidolgozott feladat: hány év alatt háromszorozódik meg az évi 15%-os kamatos kamattal gyarapodó tőke? 1,15ˣ = 3 ⇒ 10^(x · lg 1,15) = 10^(lg 3) ⇒ x = lg 3 : lg 1,15 ≈ **7,86 ⇒ 8 év**. Ebből adódik az áttérési képlet: **logₐ b = lg b : lg a**.

---

## 📐 Fő Fogalmak

- **lg b = log₁₀ b**; b = 10^(lg b) minden b > 0-ra.
- **Áttérés tízes alapra:** ha a, b > 0 és a ≠ 1, akkor logₐ b = lg b : lg a (emeletes törtként írva). Pl. log₃ 20 ≈ 2,7268 (3^2,7268 ≈ 20), log₀,₂ 15 ≈ −1,6826.
- **Indoklás:** aˣ = b ⇒ (10^(lg a))ˣ = 10^(lg b) ⇒ x · lg a = lg b (a 10-es alapú exponenciális függvény szigorúan monoton).
- **Egyenletmegoldás:** rendezzük c · qˣ = d alakról qˣ = d : c alakra, majd x = lg (d : c) : lg q.

### Tankönyvi feladatok (node-dal ellenőrzött eredmények)
- **1.** lg 2 ≈ 0,3010; lg 572 ≈ 2,7574; lg 4933 ≈ 3,6931; lg 0,0092 ≈ −2,0362; lg 0,083 ≈ −1,0809; lg 0,836 ≈ −0,0778.
- **2.** log₂ 5 ≈ 2,32; log₁,₀₅ 0,2 ≈ −32,99; log₆ 703 ≈ 3,66; log₄,₅ 21 ≈ 2,02.
- **3.** a) log₅ 125 = 3; log₂₅ 5 = 1/2; log₁/₅ 5 = −1; log₁/₅ 25 = −2. b) log₄ (1/64) = −3; log₄ 1 = 0; log₁/₄ (1/64) = 3; log₁/₄ 1 = 0.
- **4.** 0,83ᵗ = 0,5: t = log₀,₈₃ 0,5 = lg 0,5 : lg 0,83 ≈ 3,720 (egyezik a 34. lecke táblázatos közelítésével).
- **5.** a) 8,5 · 10ˣ = 212,5 ⇒ x = lg 25 ≈ 1,398; b) 4,55 · 1,2ˣ = 3,64 ⇒ x ≈ −1,224; c) 4,2^(−2x) = 5,3 ⇒ x ≈ −0,581; d) 6^(x+2) = 30 ⇒ x ≈ −0,102.
- **HF 1.** log₁₀₀ 50 ≈ 0,8495; log₀,₁ 2 ≈ −0,3010; log₅ 8,7 ≈ 1,3441; lg 5 + lg 2 = 1.
- **HF 2.** 1,06ˣ = 2 ⇒ x = log₁,₀₆ 2 = lg 2 : lg 1,06 ≈ 11,896.
- **HF 3.** M(t) = 105 · 1,24^(−t): M(0) = 105; T = lg 2 : lg 1,24 ≈ 3,222.
- **HF 4.** a) 10^(3x) = 8,4 ⇒ x ≈ 0,308; b) 2^(−x) = 17 ⇒ x ≈ −4,087.

> **⚠️ CSAPDA:** logₐ b = lg b : lg a, és nem lg (b : a) = lg b − lg a, sem lg a : lg b. Pl. log₃ 20 ≈ 2,7268, nem 0,8239 és nem 0,3667. Becsülj előre a hatványokkal (3² < 20 < 3³)!

*Megjegyzés: a szöveges kivonatban a 3. b) feladat kifejezései részben olvashatatlanok; a modul a log₄ (1/64), log₄ 1, log₁/₄ (1/64), log₁/₄ 1 értelmezést használja. A logarlécről szóló Ráadás a tankönyvben a 35. leckéhez tartozik (ott dolgoztuk fel).*

---

## 💻 Elkészített Komponensek

1. **`CommonLogarithmFigures.tsx`**:
   - `CommonLogGraphSvg`: y = 10ˣ grafikonja, a 4 = 10^(lg 4) leolvasása (lg 4 ≈ 0,602).
   - `CommonLogScaleSvg`: „tízes skála” – a számok helye a lg értékük szerint (0,083; 4; 572; 4933).
   - `CommonLogInterestSvg`: a tőke 15%-os kamattal évenként, a 3A szint átlépése a 8. évben.
   - `CommonLogChangeBaseSvg`: logₐ b = lg b / lg a, a log₃ 20 és log₀,₂ 15 példával.
   - `CommonLogHalfLifeSvg`: 0,83ᵗ = 0,5 megoldása logaritmussal (t ≈ 3,720).
2. **`CommonLogarithmTheory.tsx`**: bevezető, 1. feladat táblázata, kidolgozott feladat lépésenként, áttérési tétel indoklással és példákkal, feladatmegoldások (2–5., HF 1–4.), kerekítési megjegyzés (7,86 → 8 év), csapda.
   - **I. Laboratórium:** logaritmus bármely alapra lg-gel – a és b megadása (előbeállítások a tankönyvből), lg értékek, hányados, ellenőrzés hatványozással, előjel-magyarázat.
   - **II. Laboratórium:** exponenciális egyenlet-megoldó – c · qˣ = d, lépések (osztás, logaritmus), ellenőrzés; tankönyvi előbeállítások (kamat, 5. a–b, lázcsillapító, HF 2–3).
3. **`CommonLogarithmMatcher.tsx`**: 3 szint × 8 pár (lg értékek; áttérési alak; egyenlet ↔ megoldás).
4. **`CommonLogarithmSorter.tsx`**: 3 szint × 3 kategória × 9 elem (lg k nagysága; fejben / számológéppel / nincs értelmezve; a megoldás nagysága).
5. **`CommonLogarithmQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), minden kérdésen típus-címke, 4 kérdésen ábra, 3 puskakártya (progress id: `g11-exp-tizes-logaritmus-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic3CommonLogarithm.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
