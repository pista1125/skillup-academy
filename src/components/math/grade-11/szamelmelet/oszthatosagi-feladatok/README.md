# 6. Oszthatósági feladatok (47. lecke, 140–141. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 140–141. oldal) alapján kidolgozott oktatási modul. A diákzónában a IV. Számelmélet fejezet **6.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Bevezető:** osztható-e 45-tel a 765 és a 2900? Mivel 45 = 5 · 9 és (5; 9) = 1, elég az 5-re és a 9-re tanult szabályt alkalmazni. A 765 5-re végződik, számjegyösszege 18 ⇒ **45 | 765**. A 2900 0-ra végződik, de számjegyösszege 11 ⇒ **45 ∤ 2900**.

---

## 📐 Elmélet: összetett oszthatósági szabályok

Egy természetes szám akkor és csak akkor osztható
- 6-tal, ha 2-vel és 3-mal;
- 10-zel, ha 2-vel és 5-tel (0-ra végződik); 10-zel, 100-zal, 1000-rel…, ha 0-ra, 00-ra, 000-ra… végződik;
- 12-vel, ha 3-mal és 4-gyel;
- 15-tel, ha 3-mal és 5-tel.

Általában: **a | n és b | n és (a; b) = 1 ⇒ a · b | n** – az oszthatóságot mindig relatív prím számpárokra (számhármasokra) vezetjük vissza.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** 1260 = 2² · 3² · 5 · 7, osztóinak száma 3 · 3 · 2 · 2 = **36**.
- **2.** (3xy; xy) = (300 + xy; xy) = (300; xy) = 3 ⇔ xy osztható 3-mal, páratlan, 5-tel nem osztható: 21, 27, 33, 39, 51, 57, 63, 69, 81, 87, 93, 99 (**12** lehetőség).
- **3.** a)–g) igaz; h) hamis (6 = 1 + 5); i) hamis (6 = 2 · 3).
- **4.** a) **2022** (utána 20 évente); b) 2014 volt, legközelebb **2034**; c) **soha** (az elnök- és az EP-választás évei 5-tel osztva 2, ill. 4 maradékot adnak).
- **5.** A = 48, B = 60, C = 75: a) 12; b) 15; c) 300; d) 60. Mindig igaz: b) | c) (továbbá a) | c), a) | d), b) | d)). Két egyenlő is lehet: A = 1, B = 2, C = 3 ⇒ a) = b) = 1.
- **6.** Buszok közös indulásai: 6.00, 6.40, 7.20, 8.00, 8.45, 10.06, 11.45, 13.24, 14.08, 15.36, 16.00, 16.56, 17.52, 18.48, 19.44, 20.12 (**16** alkalom). Feltételezés: az 1. járat ütemváltásai egész számú ütemre esnek (ez a megadott időkkel teljesül), a 2. járat 9.00-tól 11, 16.00-tól 7 percenként indul.
- **7.** Kis Fermat-tétel: 2³ − 2 = 6, 2⁵ − 2 = 30, 3³ − 3 = 24, 3⁵ − 3 = 240, 4³ − 4 = 60, 4⁵ − 4 = 1020, 4⁷ − 4 = 16 380 = 7 · 2340, 5¹³ − 5 = 13 · 93 900 240, 8¹¹ − 8 = 11 · 780 903 144.
- **HF 1.** páros + páros, páratlan + páratlan, páros · páros, páratlan · páros: páros; páros + páratlan, páratlan · páratlan: páratlan.
- **HF 2.** **6 és 48**.
- **HF 3.** (3575; 3125) = 25 < [72; 15] = 360 < [75; 40] = 600 < (5120; 4480) = 640.
- **HF 4.** a) 80 × 80 × 80 cm ([4; 16; 20] = 80); b) **400** doboz; c) 80 × 80 × 160 cm, **800** doboz.

> **⚠️ CSAPDA:** Nem relatív prím tényezőkkel nem szabad összevonni: 2 | 36 és 12 | 36, mégis 24 ∤ 36. Helyesen 24 = 3 · 8.

---

## 💻 Elkészített Komponensek

1. **`DivisibilityProblemsFigures.tsx`**:
   - `CompositeRuleVennSvg`: 5 | n és 9 | n ⇔ 45 | n (765, 2900, 1206 elhelyezve).
   - `DivisorTable1260Svg`: az 1260 mind a 36 osztója táblázatban (2ᵃ · 3ᵇ sorok × 5ᶜ · 7ᵈ oszlopok).
   - `ElectionTimelineSvg`: országgyűlési, elnök- és EP-választások 2014–2042 (közös évek kiemelve).
   - `BusScheduleSvg`: 8 és 5 percenként induló buszok, közös indulás 40 percenként.
   - `BonbonBoxSvg`: a 4 × 16 × 20 cm-es bonbonos doboz és a 80 cm élű kocka.
2. **`DivisibilityProblemsTheory.tsx`**: bevezető, összetett szabályok táblázata, a csoportmunka feladatai (1–6.), kis Fermat-tétel, házi feladatok, csapda.
   - **I. Laboratórium:** összetett oszthatóság ellenőrzése – tetszőleges szám, 12 választható osztó, felbontás relatív prím prímhatványokra és szabályonkénti ellenőrzés.
   - **II. Laboratórium:** két ismétlődő esemény (periódus, kezdőév csúszkák, választási előbeállítások) – lnko, lkkt, közös évek vagy „soha”.
3. **`DivisibilityProblemsMatcher.tsx`**: 3 szint × 8 pár (összetett szabályok; számolások; szöveges feladatok).
4. **`DivisibilityProblemsSorter.tsx`**: 3 szint × 3 kategória (paritás; 45 = 5 · 9; 12 / 18 / 15 oszthatóság).
5. **`DivisibilityProblemsQuiz.tsx`**: 30 kérdés 3 szinten, kérdéstípus-címkékkel és szükség szerint ábrával, 3 puskakártyával (progress id: `g11-num-oszthatosagi-feladatok-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic4DivisibilityProblems.test.tsx` fájlban található: a 4 komponenst, mind az 5 SVG ábrát és a kvíz 10/10/10-es szintbeosztását ellenőrzi.
