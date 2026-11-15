# 12. Hatvány, gyök, logaritmus (tankönyv 37. lecke, 108–109. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 108–109. oldal) alapján kidolgozott oktatási modul. A diákzónában a III. fejezet 12. leckéje.

> A korábbi README a logaritmus azonosságait írta le – a tankönyvben ez a lecke valójában **exponenciális egyenletek megoldása valós modellekben logaritmussal**.

---

## 🎯 Tananyag Áttekintés

**Kidolgozott feladat – a marhavész (BSE) Angliában:** a havonta diagnosztizált új esetek számát 1988 vége és 1992 eleje között az

$$E(t) = 500 \cdot 1{,}056^t \qquad (0 \le t \le 37,\ t = 0:\ 1988.\ \text{december})$$

összefüggés modellezi.

- **a)** 1991 januárja: t = 25, E(25) = 500 · 1,056²⁵ ≈ **1950** új eset.
- **b)** 3000 új eset: 3000 = 500 · 1,056ᵗ ⇒ 1,056ᵗ = 6 ⇒ t = log₁,₀₅₆ 6 = lg 6 / lg 1,056 ≈ 32,88 ≈ **33** hónap → **1991. szeptember**.

> **Szabály:** aˣ = b ⇒ x = log_a b = lg b / lg a (a > 0, a ≠ 1, b > 0).
> Ha az ismeretlen a hatványérték → hatványozás; az alap → gyökvonás; a kitevő → logaritmus.

---

## 📐 Feladatok (ellenőrzött eredmények)

- **1. a)** Havi növekedés: 1,056 = 1 + 0,056 → **5,6%**.
- **1. b)** Az érvényességi körön kívül: 1992. dec. (t = 48) ≈ 6837; 1993. dec. (t = 60) ≈ 13 146; 1994. dec. (t = 72) ≈ 25 280 – a valóságban 1992-ben megállt a növekedés.
- **1. c)** 1500 eset: 1,056ᵗ = 3 ⇒ t ≈ 20,2 → 1990 augusztusa körül.
- **2. (Érettségi, 2017)** a) 12 / 7 ≈ 1,714 → **71,4%**-os növekedés; b) f(x) = 51 · 1,667ˣ (ezer), f(8) ≈ 3041 ezer ≈ **3 millió** előfizető 2000 végén; c) 350 000 · 1,065ⁿ = 10⁸ ⇒ n ≈ 89,8 → a 90. hónap, **1998** (július).
- **HF 1.** 1989. jan. → dec. (11 hónap): 1,056¹¹ ≈ 1,82-szeres; 1990. jan. → dec. ugyanígy ≈ 1,82; 1989. jan. → 1990. dec. (23 hónap): ≈ 3,5-szeres.
- **HF 2.** B(t) = 3800 · 0,945ᵗ (t = 0: 1992. dec.): 1995. szept. (t = 33) ≈ **588** eset; „felezési idő” lg 0,5 / lg 0,945 ≈ **12,25 hónap**.
- **HF 3.** Népesség 1980: 10,71 millió, 2010: 10 millió → q = ³⁰√(10 / 10,71) ≈ 0,99772 (évi ≈ 0,23%-os csökkenés); 9 millió: n ≈ 76,1 év → **2056**.
- **Ráadás:** 500 · q³⁷ = 3800 ⇒ q³⁷ = 7,6 ⇒ q = ³⁷√7,6 ≈ 1,056 – így készült a modell.

> **⚠️ CSAPDA:** lg 6 / lg 1,056 ≠ 6 / 1,056; és 500 · 1,056ᵗ ≠ 528ᵗ.

---

## 💻 Elkészített Komponensek

1. **`PowerRootLogFigures.tsx`**:
   - `BseBarChartSvg`: a BSE-járvány havi új eseteinek stilizált oszlopdiagramja, kiemelt exponenciális szakasszal.
   - `BseModelCurveSvg`: az E(t) = 500 · 1,056ᵗ grafikonja az a) és b) kérdéssel.
   - `LogSolveStepsSvg`: a 3000 = 500 · 1,056ᵗ egyenlet megoldásának lépései.
   - `MobileCallsSvg`: havi mobilhívások 350 000 · 1,065ⁿ (logaritmikus skálán), a 100 milliós szint.
   - `GrowthFactorSvg`: Ráadás – a q növekedési tényező meghatározása (q³⁷ = 7,6).
2. **`PowerRootLogTheory.tsx`**: bevezető, kidolgozott feladat, hatvány/gyök/logaritmus szerepe, feladattáblázat, érvényességi kör, házi feladatok, érettségi feladat, ráadás, csapda.
   - **I. Laboratórium:** BSE-modell – t csúszka (0–37) a dátummal és E(t)-vel, célérték megadása → t = lg(cél / 500) / lg 1,056, a grafikonon jelölve, érvényességi figyelmeztetéssel.
   - **II. Laboratórium:** c · aˣ = b megoldó lépésenként (osztás, logaritmus, számolás, ellenőrzés), tankönyvi előbeállításokkal.
3. **`PowerRootLogMatcher.tsx`**: 3 szint × 8 pár (fejben megoldható egyenletek; lg-s megoldóképlet; modellkérdés ↔ eredmény).
4. **`PowerRootLogSorter.tsx`**: 3 szint × 3 kategória (hatvány / gyök / logaritmus; növekedés / csökkenés / állandó; x > 1 / 0 < x < 1 / x < 0).
5. **`PowerRootLogQuiz.tsx`**: 30 kérdés 3 szinten, kérdéstípus-címkékkel, grafikonos ábrákkal, 3 puskakártyával (progress id: `g11-exp-logaritmus-modellek-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic3PowerRootLog.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
