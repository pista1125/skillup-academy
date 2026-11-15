# 20. Gyakorlás – kombinatorika (20. lecke, 60–63. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 60–63. oldal) alapján kidolgozott gyakorló modul. Összefoglalja a 16–19. lecke (jelszavak, sorba rendezés, kiválasztás sorrend nélkül, binomiális együtthatók) összeszámlálási alapeseteit.

---

## 🎯 Tananyag Áttekintés

A lecke az ötös lottóval indul: 90 számból 5-öt jelölünk meg, a sorrend nem számít, így a lehetséges tippek száma
$$\binom{90}{5} = 43\,949\,268,$$
egy szelvénnyel a telitalálat valószínűsége ≈ 1 : 44 000 000 ≈ 0,000 000 023.

---

## 📐 Alapesetek az összeszámlálás során (Ráadás, 62. o.)

n különböző elemünk van (n, k ∈ ℕ, n ≥ k). Hányféle lehetőség van arra, hogy…

| Eset | Képlet |
|---|---|
| sorba rendezzük az összeset (permutáció) | n! = n · (n − 1) · … · 1 |
| kiválasszunk k darabot, számít a sorrend, nincs ismétlés (variáció) | n · (n − 1) · … · (n − k + 1) |
| kiválasszunk k darabot, számít a sorrend, lehet ismétlés | nᵏ (itt k > n is lehet, pl. teszt kitöltése) |
| kiválasszunk k darabot, nem számít a sorrend (kombináció) | $\binom{n}{k} = \dfrac{n(n-1)\cdots(n-k+1)}{k!}$ |

### Kidolgozott feladatok
- **3 találatos szelvények (ötös lottó):** $\binom{5}{3} \cdot \binom{85}{2} = 10 \cdot 3570 = 35\,700$.
- **A TÉGLALAP szó kiolvasása:** I. megoldás – táblázatban mezőről mezőre összeadjuk a bal oldali és a fölötte lévő útszámot; II. megoldás – 7 lépésből 4 jobbra: $\binom{7}{4} = 35$.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** Hatos lottó: $\binom{45}{6}$ = 8 145 060, a telitalálat esélye ≈ 0,000 000 123.
- **2.** 7 lámpából legalább 5 ég: 21 + 7 + 1 = 29.
- **3.** Zsűri 5 tanárból és 8 diákból: **a)** $\binom{13}{6}$ = 1716; **b)** $\binom{5}{3}\binom{8}{3}$ = 560.
- **4.** 15 barát, 4 + 5 + 6 személyes autó: **a)** 1365 · 462 · 1 = 630 630; **b)** 15! = 1 307 674 368 000; **c)** három egyforma 5 személyes autó: 3003 · 252 / 3! = 126 126.
- **5.** Ötös lottó, találatok szerint: 5 → 1; 4 → 425; 3 → 35 700; 2 → 987 700; 1 → 10 123 925; 0 → 32 801 517 (összesen 43 949 268).
- **6.** Két jutalom 10 főnek: a) 10 · 9 = 90; b) 10 · 10 = 100; c) 10 · 9 / 2 = 45; d) 10 + 10 · 9 / 2 = 55 (a „10 + 9” válasz fölösleges).
- **7.** Páros és páratlan elemszámú részhalmazból mindig ugyanannyi van: 9 elemnél 256–256, 10 elemnél 512–512, általában 2ⁿ⁻¹–2ⁿ⁻¹.
- **Ráadás 2.** MATEMATIKA az 5 × 6-os betűtáblából: $\binom{9}{4}$ = 126.
- **HF 1.** 35 számból 7: a) P = 1 / 6 724 520 ≈ 0,000 000 149; b) 6 találat: 7 · 28 = 196.
- **HF 2.** a) $\binom{32}{5}$ = 201 376; b) $\binom{27}{5}$ = 80 730.
- **HF 3.** Zselés napok: $\binom{14}{4}$ = 1001.
- A HF 4. (szemétégető, kördiagramok), a Ráadás 2. második ábrája és a 3. (kastély, 13. terem) feladat adatai csak az ábrákon szerepelnek, a modul ezeket számszerűen nem dolgozza fel (a II. labor tiltható mezőivel a „kastélyos” feladattípus kipróbálható).

> **⚠️ CSAPDA:** „és” vagy „vagy”? A 3 tanár ÉS 3 diák zsűrinél a lehetőségeket szorozni kell (10 · 56 = 560), nem összeadni (66). Összeadni az egymást kizáró eseteket kell (5 VAGY 6 VAGY 7 lámpa ég).

---

## 💻 Elkészített Komponensek

1. **`CombinatoricsPractice1Figures.tsx`**:
   - `LotteryTicketSvg`: ötös lottószelvény 90 számmal, (90 alatt 5) és a telitalálat valószínűsége.
   - `LotteryHitsSvg`: a szelvények száma a találatok szerint (5. feladat).
   - `CountingCasesSvg`: az összeszámlálás alapeseteinek döntési fája (Ráadás).
   - `WordGridPathsSvg`: a TÉGLALAP szó betűtáblája és az útszámok táblázata (35).
   - `CarsSeatingSvg`: 15 barát a 4, 5 és 6 személyes autóban (4. feladat).
2. **`CombinatoricsPractice1Theory.tsx`**: bevezető (lottó), a 16–19. lecke összefoglaló táblázata, alapesetek, kidolgozott és tankönyvi feladatok, házi feladatok eredményei, csapda.
   - **I. Laboratórium:** modellválasztó döntési fa (mindet sorba? számít a sorrend? lehet ismétlés?) n, k csúszkával, élő képlettel és értékkel, a 6. feladat a)–d) és további előbeállításokkal.
   - **II. Laboratórium:** rácsút-számláló (sorok, oszlopok), kattintással tiltható mezők, élő útszám-táblázat és összevetés a binomiális együtthatóval (TÉGLALAP, MATEMATIKA).
3. **`CombinatoricsPractice1Matcher.tsx`**: 3 szint × 8 pár (alapesetek és szabályok; jutalmak, lámpák, sorok; lottó, zsűri, autók).
4. **`CombinatoricsPractice1Sorter.tsx`**: 3 szint × 3 kategória (melyik alapeset; szorzás / összeadás / osztás; az eredmény nagyságrendje).
5. **`CombinatoricsPractice1Quiz.tsx`**: 30 vegyes kérdés 3 szinten, kérdéstípus-címkékkel és szükség szerint ábrával, 3 puskakártyával (progress id: `g11-comb-gyakorlas-elso-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic2CombinatoricsPractice1.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
