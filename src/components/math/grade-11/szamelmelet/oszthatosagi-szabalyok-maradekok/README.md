# 4. Oszthatósági szabályok, osztási maradékok (45. lecke, 132–135. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 132–135. oldal) alapján kidolgozott oktatási modul. A diákzónában a IV. Számelmélet fejezet **4.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Bevezető / 1. kidolgozott feladat:** egy részvénytársaság 11 385 részvényét egyenlően szét lehet-e osztani 2, 9 vagy 25 tag között? Hosszadalmas osztás helyett szabályokkal: 2 ∤ 11 385 (az utolsó jegy 5), 9 | 11 385 (a jegyek összege 18), 25 ∤ 11 385 (25 ∤ 85). Csak 9 tag között lehetséges.

**2. kidolgozott feladat (Gólyák és Végzősök):** a 15, 13, 12, 14, 16, 19 fős csoportok közül melyik vezetője mondhatta, hogy a többi csoportban kétszer annyi a Gólya, mint a Végzős? A többiek létszáma 3 egység, így 3 többszöröse; a 3-mal vett maradékok 0; 1; 0; 2; 1; 1 – csak a **14 fős** csoport elhagyásával marad 3-mal osztható összeg (75 = 50 Gólya + 25 Végzős).

---

## 📐 Fő Fogalmak

- **2, 4, 8:** az utolsó egy, két, három jegyből álló szám osztható vele.
- **5, 25, 125:** az utolsó egy, két, három jegyből álló szám osztható vele.
- **3, 9:** a számjegyek összege osztható vele.
- **Megjegyzés:** a 10ⁿ osztóinál az utolsó n jegy dönt.
- **Jelölés ismeretlen jeggyel:** 123a5 (a 4. jegy ismeretlen), abab (1. = 3., 2. = 4. jegy).
- **Maradékos osztás:** b = a · k + r, ahol r ∈ {0; 1; …; a − 1}. Pl. 1200 = 3 · 350 + 150.
- **Maradékosztályok:** a-val osztva pontosan a darab; 5-tel: 5k, 5k + 1, …, 5k + 4; 7-tel: 7k, …, 7k + 6 (naptár!).
- **Ráadás:** 7-es próba háromjegyűekre (utolsó jegy kétszeresét levonjuk), 11-es szabály (váltakozó előjelű jegyösszeg).

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** 2, 5, 7, 8 jegyekből (egyszer): 2-vel osztható 12, 9-cel 0, 25-tel 4, 4-gyel 6.
- **2.** (igaz/hamis állítások hatványokkal) – a PDF-ből kinyert szövegben a kitevők nem egyértelműek, a modul nem dolgozza fel.
- **3.** A = 4Y13Y, B = Y6Y52, C = 104YY, D = 5Y283: 4-gyel biztosan osztható B, biztosan nem D; 125-tel egyik sem; 3-mal egyik sem dönthető el. D: Y = 0 vagy 9. B 8-cal: a 3. jegy páratlan (152, 352, 552, 752, 952 végződés). A d) részt (C + D) a modul nem dolgozza fel.
- **4.** a) 35; b) 10, 30, 50, 70, 90; c) pl. 117 (40k + 37); d) pl. 37, 79 (42k + 37).
- **5.** a) kedd + 100 nap = csütörtök; b) szökőév, jan. 1. szombat ⇒ ápr. 1. szombat (91 nap).
- **6.** (gördülő óralap) – az ábra a kinyert szövegből nem rekonstruálható biztosan, a modul nem dolgozza fel.
- **HF 1.** 1x687y: 4-gyel y = 2 vagy 6; 3-mal x + y ∈ {2, 5, 8, 11, 14, 17}; 8-cal y = 2; 9-cel x + y = 5 vagy 14.
- **HF 2.** négyjegyű számok: 6-tal osztva 5 maradék: 1500; 7-tel osztva 6 maradék: 1286.
- **HF 3–4.** (hatványos maradékok, keresztrejtvény) – a kinyert szöveg kétértelmű, a modul nem dolgozza fel.
- **Ráadás:** 805 és 959 osztható 7-tel, 352 és 410 nem; 10⁴ − 1, 10⁵ + 1, 10⁹ + 1 osztható 11-gyel; 352, 3190, 5599, 6391, 572 osztható 11-gyel; 247 maradéka 5.

> **⚠️ CSAPDA:** a 8-as szabálynál három jegy kell: 3132 nem osztható 8-cal, bár 8 | 32 (132 = 8 · 16 + 4).

---

## 💻 Elkészített Komponensek

1. **`G11DivisibilityRulesFigures.tsx`**:
   - `LastDigitsRulesSvg`: 11 385 – az utolsó 1, 2, 3 jegy szabályai.
   - `DigitSumSvg`: 11 385 jegyösszege 18 ⇒ 9 | 11 385.
   - `DivisionRemainderSvg`: 1200 = 3 · 350 + 150 szalagmodellel.
   - `RemainderClassesSvg`: a 7-es maradékosztályok táblázata.
   - `WeekdayCycleSvg`: a hét napjai körben, kedd + 100 nap = csütörtök.
   - `ExcursionGroupsSvg`: a kirándulócsoportok 3-mal vett maradékai.
2. **`G11DivisibilityRulesTheory.tsx`**: bevezető, szabálytáblázat, 10ⁿ-megjegyzés, ismeretlen jegyek, Gólyák–Végzősök feladat, maradékos osztás, maradékosztályok, naptár, feladateredmények, ráadás, csapda.
   - **I. Laboratórium:** szabályellenőrző (tetszőleges, legfeljebb 30 jegyű szám: 2, 4, 8, 5, 25, 125, 3, 9, 11 szabálya, a vizsgált rész, döntés és maradék).
   - **II. Laboratórium:** maradékosztály-óra (osztó 2–12, szám 0–400, b = a · k + r, az osztály tagjai; 7-nél naptár mód a kezdőnap kiválasztásával).
3. **`G11DivisibilityRulesMatcher.tsx`**: 3 szint × 8 pár (szabályok; maradékos osztások; tankönyvi feladatok).
4. **`G11DivisibilityRulesSorter.tsx`**: 3 szint × 3 kategória × 9 elem (9 / 3 / egyik sem; 8 / 4 / egyik sem; 7k + 1 / 7k + 2 / 7k + 3).
5. **`G11DivisibilityRulesQuiz.tsx`**: 30 kérdés 3 szinten, kérdéstípus-címkékkel, 8 kérdésnél ábrával, 3 puskakártyával (progress id: `g11-num-oszthatosagi-szabalyok-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic4DivisibilityRules.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
