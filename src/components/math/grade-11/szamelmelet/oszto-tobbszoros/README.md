# 2. Osztó, többszörös (43. lecke, 124–127. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 124–127. oldal) alapján kidolgozott oktatási modul. A diákzónában a IV. Számelmélet fejezet **2.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Bevezető:** 81 takarót egyenlően osztanak szét menedékhelyek között – a menedékhelyek száma a 81 osztója (1; 3; 9; 27; 81). 196 élelmiszercsomag egyenlő szétosztása 1; 2; 4; 7; 14; 28; 49; 98 vagy 196 szállás között lehetséges.

**1. kidolgozott feladat:** az 1; 7; 20; 30; 81; 143; 196; 349; 455 számok osztói táblázatban, osztópárokba rendezve. Tanulságok: az 1 minden számnak osztója; az egymás mellé írt osztók szorzata a szám (**osztópárok**); páratlan sok osztója a **négyzetszámoknak** van; minden szám többszöröse az 1-nek és önmagának; pontosan két osztója van a 2, 3, 5, 7 számoknak; a nagyobb számnak nem feltétlenül van több osztója (30: 8 osztó, 349: 2 osztó).

**2. kidolgozott feladat:** a 630/525 tört egyszerűsítése prímtényezős felbontással (prímtényező-fa és osztólétra): 630 = 2 · 3² · 5 · 7, 525 = 3 · 5² · 7, így 630/525 = 6/5.

**3. kidolgozott feladat:** prím-e a 211? A 72 felbontásai mutatják, hogy egy osztópárból az egyik tag legfeljebb a négyzetgyök – √211 ≈ 14,5, a 2, 3, 5, 7, 11, 13 egyike sem osztó, tehát a 211 prím.

---

## 📐 Fő Fogalmak

- **Definíció:** a b pozitív egész osztható az a pozitív egésszel (a | b), ha van olyan c pozitív egész, hogy a · c = b. Ekkor a osztója b-nek, b többszöröse a-nak. Pl. 27 | 81, de 13 ∤ 20.
- **Nem valódi osztók:** 1 és maga a szám; a többi pozitív osztó **valódi osztó**.
- **Csoportosítás:** az 1-nek egy osztója van; a **prímszámoknak** pontosan kettő (az egyetlen páros prím a 2); az **összetett számoknak** kettőnél több. Az 1 sem prím, sem összetett. Végtelen sok prím van.
- **A 0 (kiterjesztés):** a 0-nak minden természetes szám osztója; az oszthatóság reláció, nem azonos a 0-val való osztással.
- **A számelmélet alaptétele:** minden összetett szám a tényezők sorrendjétől eltekintve egyértelműen felbontható prímek szorzatára.
- **Osztók száma** (megfigyelés a 450 és 1485 feladatokhoz): n = p^a · q^b · … esetén (a + 1)(b + 1)…

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** 700 = 2² · 5² · 7; 990 = 2 · 3² · 5 · 11; 873 = 3² · 97; 1221 = 3 · 11 · 37.
- **2.** 483/1827 = 23/87; 10 450/19 125 = 418/765.
- **3.** (téglalap szétvágása) – a PDF-ből kinyert szövegben a méretek bizonytalanok, a modul nem dolgozza fel.
- **4.** (p a többitől különböző prím) a) hamis; b) igaz (min. 42); c) igaz; d) hamis; e) hamis.
- **5.** 450 = 2 · 3² · 5², 18 osztó.
- **HF 1.** 240 = 2⁴ · 3 · 5; 231 = 3 · 7 · 11; 435 = 3 · 5 · 29; 10 000 = 2⁴ · 5⁴; 75 000 = 2³ · 3 · 5⁵; 315 000 = 2³ · 3² · 5⁴ · 7.
- **HF 2.** 4851/594 = 49/6; 680/1071 = 40/63.
- **HF 3.** 1485 = 3³ · 5 · 11, 16 osztó.
- **HF 4.** 180 cm-es szalag: a 180 osztói, 18 lehetőség.

> **⚠️ CSAPDA:** az 1 nem prím, ezért nem írjuk a prímtényezős felbontásba, és összetett tényező (pl. 9) sem maradhat benne: 630 = 2 · 3² · 5 · 7.

---

## 💻 Elkészített Komponensek

1. **`G11DivisorsMultiplesFigures.tsx`**:
   - `DivisorPairsSvg`: a 72 osztópárjai ívekkel, a √72 ≈ 8,49 tükörtengellyel.
   - `FactorTreeSvg`: a 630 prímtényező-fája (10 · 63).
   - `DivisionLadderSvg`: a 630 és az 525 osztólétrája, 630/525 = 6/5.
   - `DivisorCountBarsSvg`: az 1–20 számok osztóinak száma (1 / prím / összetett).
   - `PrimeTestSvg`: a 211 próbaosztásai √211 ≈ 14,5-ig.
2. **`G11DivisorsMultiplesTheory.tsx`**: bevezető, osztótáblázat, csoportosítás, alaptétel, két felbontási módszer, prímteszt, feladatok eredményei, csapda.
   - **I. Laboratórium:** Eratoszthenész szitája (felső határ csúszka 30–200, lépésenkénti kihúzás, √N-es leállási szabály).
   - **II. Laboratórium:** prímtényezők és osztók (tetszőleges szám: osztólétra, kanonikus alak, osztók száma a kitevőkből, osztópárok, prím/összetett döntés).
3. **`G11DivisorsMultiplesMatcher.tsx`**: 3 szint × 8 pár (fogalmak; prímtényezős alakok; feladateredmények).
4. **`G11DivisorsMultiplesSorter.tsx`**: 3 szint × 3 kategória × 9 elem (prím / összetett / négyzetszám; 4, 6, 8 osztó; az ismeretlen p prím: biztosan igaz / lehet / biztosan hamis).
5. **`G11DivisorsMultiplesQuiz.tsx`**: 30 kérdés 3 szinten, kérdéstípus-címkékkel, 5 kérdésnél ábrával, 3 puskakártyával (progress id: `g11-num-oszto-tobbszoros-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic4DivisorsMultiples.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
