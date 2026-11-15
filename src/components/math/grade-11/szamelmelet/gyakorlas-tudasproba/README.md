# 11. Gyakorlás, tudáspróba (tankönyv 52. lecke, 156–157. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 156–157. oldal) alapján kidolgozott oktatási modul. A diákzónában a IV. fejezet (Számelmélet) 11., lezáró leckéje. A tankönyvben ezután következő *Témazáró feladatgyűjtemény* nem része ennek a modulnak.

---

## 🎯 Tananyag Áttekintés

A számelmélet fejezet összefoglalása: számhalmazok és zártság, osztó, többszörös, prímszám, prímtényezős felbontás, osztók száma, LNKO és LKKT, oszthatósági szabályok (2, 4, 8, 5, 25, 125, 3, 9, 11) és osztási maradékok, oszthatóság és logika (és, vagy, tagadás, megfordítás), számrendszerek, racionális és irracionális számok. Hat gyakorló feladat és két tudáspróba (5–5 feladat).

Jelölések a tankönyv szerint: a | b (a osztója b-nek), (a; b) legnagyobb közös osztó, [a; b] legkisebb közös többszörös, 1201₃ (alsó index: alapszám).

---

## 📐 Feladatok és eredmények (node-dal ellenőrizve)

### Gyakorló feladatok (156. o.)
- **1.** K = 2⁴ · 3 · 5 = 240, L = 2² · 3³ · 7 = 756: a) (K; L) + [K; L] = 12 + 15 120 = **15 132**; b) pl. M = 3 · 7; c) pl. N = 3³ · 5² · 7³ (a 2 kitevője 0–4).
- **2.** n < 30: a) 4 | 132 457 + n: n = 3; 7; 11; 15; 19; 23; 27; b) 9 | 3471 − 2n: n = 3; 12; 21; c) 5 | 1516 + 7n: n = 2; 7; 12; 17; 22; 27; d) 15 | 6n − 42: n = 7; 12; 17; 22; 27 (6n − 42 ≥ 0 esetén).
- **3.** a) igaz; b) igaz; c) hamis (3 és 6); d) hamis (összeg 129); e) igaz (négyzetszámok).
- **4.** b = 2 · 3⁴ · 5⁶ · 7² · 11.
- **5.** p igaz (53 = 110101₂), q hamis (18 háromjegyű szám), r igaz (8-as alap), s igaz. b) Nem tagadás. c) p vagy q: I; p és r: I; q és s: H; q vagy s: I. d) A megfordítás igaz.
- **6.** 12/A, B/18, 51/C, 72/D: a) A = 7; 9; b) 10 összetett szám; c) C = 34 (p = 17); d) D = 2; 3; e) A = 1; 2; 3; 4; 5; 6; 8; f) a B/18 bármelyik másik törttel.

### Tudáspróba I. (157. o.)
- **1.** 3A407B: a) 4-gyel: B = 2 vagy 6, A tetszőleges; b) 15-tel: (A; B) = (1; 0), (4; 0), (7; 0), (2; 5), (5; 5), (8; 5).
- **2.** [45; 18; 30] = 90 nap, 90 = 12 · 7 + 6 ⇒ szombat után **péntek** – igaza volt.
- **3.** a) 1201₃ = 46; b) 53 = 110101₂.
- **4.** a) hamis (0, 1); b) igaz (ababab = ab · 10 101 = ab · 3 · 7 · 13 · 37); c) igaz (pl. 1050 = 5 · 210); d) igaz; e) hamis (15).
- **5.** (2100; 450; 735) = **15** lerakat; 140 doboz csempe, 30 léc, 49 zsák cement.

### Tudáspróba II. (157. o.)
- **1.** b = 3³ · 5² · 7³.
- **2.** A138B2: a) 4-gyel: B = 1; 3; 5; 7; 9; b) 24-gyel: B = 3 (A = 1; 4; 7) vagy B = 7 (A = 3; 6; 9).
- **3.** 60k + 1 alakú és osztható 11-gyel: **121** fő (11 × 11).
- **4.** 11021₃ = 115 = 1110011₂.
- **5.** A (38/22 = 19/11) igaz, B hamis (24), C igaz, D hamis (2 + 3), E hamis (p és 2p). B megfordítása igaz; A vagy D: igaz; C és E: hamis.

> **⚠️ CSAPDA:** 6 | n és 8 | n-ből nem következik 48 | n, csak [6; 8] = 24 | n. Összetett osztót relatív prím tényezőkre bontva vizsgálunk: 24 = 3 · 8 (nem 4 · 6).

> Megjegyzés: a forrásszöveg kitevői és törtjei a PDF-ből kinyert szövegben „lelapultak” (pl. „24 ∙ 3 ∙ 5” = 2⁴ · 3 · 5, „3822” = 38/22); a modul a matematikailag értelmes olvasatot használja.

---

## 💻 Elkészített Komponensek

1. **`NumberTheoryPracticeExamFigures.tsx`**:
   - `NumberTheoryExamExponentTableSvg`: kitevőtáblázat – a, (a; b), [a; b] és b (4. feladat).
   - `NumberTheoryExamDigitsSvg`: a 3A407B szám 4-gyel és 15-tel való oszthatósága.
   - `NumberTheoryExamCalendarSvg`: 45, 18, 30 naponkénti látogatás, [45; 18; 30] = 90, hétnapos kerék (szombat → péntek).
   - `NumberTheoryExamBaseConversionSvg`: 53 → 110101₂ ismételt osztással, 1201₃ helyiérték-táblázattal.
   - `NumberTheoryExamNumberSetsSvg`: N ⊂ Z ⊂ Q, irracionális számok (Q*), valós számok (R).
   - `NumberTheoryExamTheodorusSvg`: Theodorus-spirál √2-től √10-ig (derékszögek negyedkörív + pont jelöléssel).
2. **`NumberTheoryPracticeExamTheory.tsx`**: fejezetösszefoglaló, a 6 gyakorló feladat és a két tudáspróba kidolgozva, csapda.
   - **I. Laboratórium:** LNKO, LKKT és osztók száma két számra, kitevőtáblázattal és (a; b) · [a; b] = a · b ellenőrzéssel.
   - **II. Laboratórium:** számrendszer-átváltó (alapszám csúszkával 2–16), ismételt maradékos osztás lépésenként és visszaellenőrzés.
3. **`NumberTheoryPracticeExamMatcher.tsx`**: 3 szint × 8 pár (szám ↔ prímtényezős alak; LNKO/LKKT ↔ érték; más alapú szám ↔ tízes alak).
4. **`NumberTheoryPracticeExamSorter.tsx`**: 3 szint × 3 kategória × 9 elem (4 / 9 / 25 osztó; véges / végtelen szakaszos / irracionális; állítás és megfordítása).
5. **`NumberTheoryPracticeExamQuiz.tsx`**: fejezetzáró kvíz, **90 kérdés (30/30/30)** a teljes fejezetből, kérdéstípus-címkékkel, 18 ábrás kérdéssel, 3 puskakártyával (progress id: `g11-num-tudasproba-quiz`; párosító: `g11-num-tudasproba-matcher`; csoportosító: `g11-num-tudasproba-sorter`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic4NumberTheoryPracticeExam.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
