# 7. Számrendszerek I. (48. lecke, 142–145. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 142–145. oldal) alapján kidolgozott oktatási modul. A diákzónában a IV. Számelmélet fejezet **7.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Bevezető (csokigyár):** a csomagológép 12 bonbont tesz egy díszdobozba (tucat), 12 díszdobozt egy kartonba (nagytucat = 144). 1347 bonbon: 1347 : 12 = 112, maradék 3; 112 : 12 = 9, maradék 4 ⇒ 9 karton, 4 díszdoboz, 3 bonbon, azaz **943₁₂** = 9 · 12² + 4 · 12 + 3 = 1347.

**1. feladat:** 8-as csomagolás, 725₈ = 7 · 64 + 2 · 8 + 5 = **469** = 331₁₂.

---

## 📐 Elmélet

- A tízes számrendszer helyi értékes: 15 823 = 1 · 10⁴ + 5 · 10³ + 8 · 10² + 2 · 10 + 3.
- Minden számrendszerben **annyi számjegy kell, amennyi az alapszám**: kettes: 0, 1; nyolcas: 0–7; tizenkettes: 0–9, A = 10, B = 11; tizenhatos: 0–9, A–F.
- A 10-estől eltérő alapszámot a szám után jobb alsó indexben jelöljük (20123₄).
- A kettes számrendszer technikai alkalmazása **Neumann János** (1903–1957) nevéhez fűződik.
- Kidolgozott feladatok helyiérték-táblázattal: **20123₄ = 512 + 0 + 16 + 8 + 3 = 539**; **1A7B₁₂ = 1728 + 1440 + 84 + 11 = 3263**.
- Informatika: 10011010₂ = 128 + 16 + 8 + 2 = 154; 6700 = 1101000101100₂ (13 jegy) = **1A2C₁₆** (4 jegy).

### Tankönyvi feladatok (ellenőrzött eredmények)
- **2.** 2113₄ = 151; 3114₅ = 409; 6142₇ = 2137; 6142₈ = 3170.
- **3.** 34₆ (22) < 34₇ (25) < 43₆ (27) < 34₈ (28) < 43₇ (31) < 43₈ (35).
- **4.** a) 1111₅ (= 156); b) 23023₅ (= 1638).
- **5.** a) 1000₂; b) 1000₃; c) 1000₆; d) 1000.
- **6.** Bonifác: n³ = (n² + 4n + 3) + (3n² + 2) ⇒ n = **5** (125 diák, 48 lány, 77 fiú).
- **HF 1.** 1000₆ + 100₈ + 101₂ = 216 + 64 + 5 = **285**.
- **HF 2.** Mindhárom igaz: 100 = 144₈ = 1100100₂ = 84₁₂.
- **HF 3.** 11111111₂ = **255**.
- **HF 4.** 5714₉ = 4225; 4226₇ = 1490; 40013₅ = 2508; 9073₁₁ = 12 059.
- **Ráadás 1.** a) utolsó jegy 2 ⇔ n | 360 (n ≥ 3, n ≠ 10); b) első jegy 2: n = 5, 11, 12, 13 vagy 121 ≤ n ≤ 181. **2.** 1630 különböző jegyű szám. **3.** Hatosban: 2, 3, 6 – az utolsó jegy; 5 – a jegyösszeg alapján.

> **⚠️ CSAPDA:** A számjegy nem lehet az alapszám vagy annál nagyobb: a 6142₆ értelmetlen, a 6-os jegy miatt az alap legalább 7.

---

## 💻 Elkészített Komponensek

1. **`NumeralSystems1Figures.tsx`**:
   - `BaseNum`: segédkomponens alsó indexes alapszámhoz SVG-ben.
   - `BonbonPackingSvg`: 1347 bonbon = 9 karton + 4 díszdoboz + 3 bonbon = 943₁₂.
   - `PlaceValueTableSvg`: a 20123₄ helyiérték-táblázata (helyi, alaki, valódi érték) = 539.
   - `BinaryPlaceValueSvg`: 8 bit, 10011010₂ = 154.
   - `HexPlaceValueSvg`: 6700 = 1A2C₁₆ helyiérték-táblázata, összevetés a 13 jegyű bináris alakkal.
   - `DigitSetsSvg`: a 2-es, 4-es, 8-as, 10-es, 12-es és 16-os számrendszer számjegykészlete.
2. **`NumeralSystems1Theory.tsx`**: bevezető, elmélet, kidolgozott feladatok, összeadás más számrendszerekben, Bonifác, házi feladatok, Ráadás, informatika, csapda.
   - **I. Laboratórium:** bitkapcsolós bináris átváltó – 8 kapcsoló, élő tízes és tizenhatos érték, helyiérték-összeg, tízes szám beírása.
   - **II. Laboratórium:** csomagológép bármely alapszámmal (2–16) – maradékos osztások lépésenként, és visszafelé: tetszőleges alapú szám tízesbe, számjegy-ellenőrzéssel.
3. **`NumeralSystems1Matcher.tsx`**: 3 szint × 8 pár (számrendszerek és számjegyek; átírás tízesbe; felírás más számrendszerben).
4. **`NumeralSystems1Sorter.tsx`**: 3 szint × 3 kategória (lehetséges alapszám; kisebb / egyenlő / nagyobb, mint 100; melyik tízes értékkel egyenlő).
5. **`NumeralSystems1Quiz.tsx`**: 30 kérdés 3 szinten, kérdéstípus-címkékkel és szükség szerint ábrával, 3 puskakártyával (progress id: `g11-num-szamrendszer-elso-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic4NumeralSystems1.test.tsx` fájlban található: a 4 komponenst, mind az 5 SVG ábrát és a kvíz 10/10/10-es szintbeosztását ellenőrzi.
