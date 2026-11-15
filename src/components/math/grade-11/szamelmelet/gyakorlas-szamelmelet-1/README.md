# 9. Gyakorlás (50. lecke, 150–151. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 150–151. oldal) alapján kidolgozott gyakorló modul. A diákzónában a IV. Számelmélet fejezet **9.** leckéje; a fejezet eddigi (1–8.) leckéinek anyagát ismétli érettségi típusú feladatokkal.

---

## 🎯 Tananyag Áttekintés (összefoglalás)

- **Számhalmazok:** ℕ ⊂ ℤ ⊂ ℚ; ℕ zárt az összeadásra és szorzásra, ℤ a kivonásra is, ℚ mind a négy alapműveletre. Egy tovább nem egyszerűsíthető tört pontosan akkor véges tizedes tört, ha a nevező prímtényezői csak 2 és 5.
- **Osztó, többszörös, prím:** prímtényezős felbontás (egyértelmű), osztók száma (α + 1)(β + 1)…
- **Lnko, lkkt:** közös prímek a kisebbik, illetve minden prím a nagyobbik kitevőn; (a; b) · [a; b] = a · b; relatív prímek.
- **Oszthatósági szabályok, maradékok:** utolsó jegy(ek), jegyösszeg; összetett szabály csak relatív prím tényezőkkel (12 = 3 · 4, 45 = 5 · 9, 72 = 8 · 9); összeg és szorzat maradéka a maradékokból.
- **Logika:** állítás, tagadás, és, vagy, ha…akkor, ellenpélda.
- **Számrendszerek:** helyiérték-táblázat, ismételt osztás, bitcsoportosítás.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** Kettes számrendszerbeli összehasonlítások tintapacával – a pacák helye csak a tankönyvi ábrán látható, ezért a modul nem dolgozza fel.
- **2.** a = 2⁴ · 3⁵ · 5² · 7 · 11², b = 2ᵏ · 3ˡ · 5ᵐ · 7ⁿ · 11ᵖ: a) k ≥ 4, l = 2, m = 0, n ≥ 1, p = 1; b) k = 6, 0 ≤ l ≤ 5, m = 3, n = 3, p = 6; c) b = 2⁶ · 3 · 5 · 7 · 11³; d) k, m, p páros, l, n páratlan (legkisebb b = 21); e) k ≥ 4, l ≥ 2, m ≥ 1.
- **3.** a) [8; 9; 10; 12] = 360 ⇒ **365** csemete; b) 365 = 5 · 73 ⇒ 73 sor, soronként 5 fa.
- **4.** (Érettségi 2018) dominók prím szorzattal: 1-2, 1-3, 1-5 ⇒ **3**.
- **5.** p = 86 420, q = 13 579, r = 123 456 maradékai (2, 3, 4, 5-tel): p + q: 1, 0, 3, 4; p + q + r: 1, 0, 3, 0; p + 4q: 0, 0, 0, 1; p · q: 0, 2, 0, 0; q² · r: 0, 0, 0, 1.
- **6.** a) igaz; b) igaz; c) hamis (…945 nem osztható 25-tel); d) igaz (8 | 024, jegyösszeg 9).
- **7.** 10a + b − (a + b) = 9a: a 9 többszörösei mellett mindig ugyanaz a szimbólum áll.
- **HF 1.** (Érettségi 2012) 114: csak B; 52: A és C; 78: A és B; 124: csak C; 216: B és C.
- **HF 2.** a) 25 756 = 2² · 47 · 137 ⇒ a kapitány 47 éves; b) 6401 = 37 · 173 ⇒ 37 éves.
- **HF 3.** 6 · 9 = 42 a 13-as számrendszerben (4 · 13 + 2 = 54).
- **HF 4.** (Érettségi 2007, 2013) a) hamis (30); b) igaz (77); c) hamis ((3; 6) = 3); d) igaz; e) hamis.
- **HF 5.** a) hamis (18); b) helyes; c) hamis (21); d) helyes (72 | b ⇒ 9 | b).

> **⚠️ CSAPDA:** „4 | n és 6 | n ⇒ 24 | n” hamis (ellenpélda: 12). Osztók szorzatával csak relatív prímeknél vonhatunk össze; általában [4; 6] = 12 | n.

---

## 💻 Elkészített Komponensek

1. **`NumberTheoryPracticeFigures.tsx`**:
   - `ChapterMapSvg`: a fejezet fogalomtérképe (számhalmazok → számrendszerek).
   - `SaplingRowsSvg`: facsemeték 8, 9, 10, 12 fás sorokban, 5 maradékkal.
   - `DominoPrimeSvg`: dominók, a prím szorzatú 1-2, 1-3, 1-5 kiemelve.
   - `NineMultiplesSvg`: 1–99 táblázat a 9 többszöröseivel (10a + b − (a + b) = 9a).
   - `SetsVennSvg`: az A, B, C halmazok Venn-diagramja (HF 1.).
2. **`NumberTheoryPracticeTheory.tsx`**: strukturált fejezet-összefoglaló, a tankönyvi feladatok kidolgozott megoldása, csapda.
   - **I. Laboratórium:** prímtényezős műhely – két szám felbontása, kitevőtáblázat, lnko, lkkt, osztók száma, relatív prím és négyzetszám vizsgálat.
   - **II. Laboratórium:** maradékok számolás nélkül – x, y és az osztó (2–12) megadása, x + y, x + 4y, x · y, y² · x maradéka a maradékokból és ellenőrzéssel.
3. **`NumberTheoryPracticeMatcher.tsx`**: 3 szint × 8 pár (fogalmak és szabályok; számolások; tankönyvi és érettségi feladatok).
4. **`NumberTheoryPracticeSorter.tsx`**: 3 szint × 3 kategória × 9 elem (legszűkebb számhalmaz; oszthatóság 12-vel és 6-tal; igaz, hamis vagy nem állítás).
5. **`NumberTheoryPracticeQuiz.tsx`**: 30 vegyes kérdés 3 szinten, kérdéstípus-címkékkel és szükség szerint ábrával, 3 puskakártyával (progress id: `g11-num-gyakorlas-quiz`; párosító: `g11-num-gyakorlas-matcher`; csoportosító: `g11-num-gyakorlas-sorter`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic4NumberTheoryPractice.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
