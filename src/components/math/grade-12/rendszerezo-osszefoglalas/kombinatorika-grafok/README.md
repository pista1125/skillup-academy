# 2. Kombinatorika, gráfok – összefoglalás (Rendszerező összefoglalás, 108–115. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., Rendszerező összefoglalás – „Halmazok, logika, kombinatorika, gráfok” blokk, 108–115. oldal; a kombinatorikai és gráfos fogalmak a 110. oldalon) alapján kidolgozott érettségi ismétlő modul. A diákzónában ez a rendszerező összefoglalás fejezet **2.** leckéje; a blokk halmazos és logikai része az **1. leckében** (`halmazok-logika`) található.

---

## 🎯 Tananyag Áttekintés

A tankönyvi „FOGALMAK, TÉTELEK, MÓDSZEREK” táblázat kombinatorikai és gráfelméleti sorai:

- **D** Faktoriális: n! = 1 · 2 · … · n, 0! = 1.
- **T** Sorba rendezés: n! (permutáció), pl. 5! = 120.
- **T** Kiválasztás, ha számít a sorrend: n · (n − 1) · … · (n − k + 1) (pl. dobogó 8 versenyzőből: 336), ismétléssel nᵏ (3 kockadobás: 6³ = 216) – variáció.
- **D** Binomiális együttható: (n alatt k) = n! / (k! · (n − k)!).
- **T** Kiválasztás, ha nem számít a sorrend: (n alatt k) (pl. 8 gyerekből 3: 56) – kombináció.
- **T** Összefüggések: (n alatt k) = (n alatt n − k), (n alatt 0) = (n alatt n) = 1, (n alatt 1) = n.
- **T** k elemű részhalmazok száma (n alatt k), összes részhalmaz 2ⁿ.
- **D** Gráf, fokszám; **T** a fokszámok összege az élek számának kétszerese (mindig páros).

### Kidolgozott feladatok
- **2.** Csökkenő számjegyű ötjegyű számok: (10 alatt 5) = 252.
- **3.** 6 cégvezető: 15 kézfogás (6 pontú teljes gráf); a fotók kiválasztása 2¹⁵ − 1 = 32 767-féle.

### Tankönyvi feladatok (a modulban feldolgozva)
- **A4.** 5 csúcs, 7 él, fokszámok < 4 (pl. 3, 3, 3, 3, 2). **A5.** 7! − 6! = 4320. **A6.** 9000 − 8 · 9³ = 3168.
- **A7.** 16, illetve 36 ismeretség. **A8.** 2⁷ = 128. **A9.** a kocka lapjainak gráfja: 6 csúcs, 12 él.
- **A12.** 31, illetve 3⁵ − 1 = 242. **B5.** 7 csúcsú, 2-reguláris gráf (7 él). **B6.** 2 · 7! = 10 080. **B9.** 176.
- **B11.** (34 alatt 2) · (32 alatt 4) = 20 173 560. **B12.** 2500, illetve 27 216.
- **P1. c)** 5! / 2 = 60. **P4.** kockadobások: 6; 120; 90; 6. **P5.** golyók: 11; 21; 252; 78 552.
- **Q1. a)** n = 126. **Q3.** hatjegyűek: 427 608 (van 8-as), 9720 (háromféle jegy, mindből kettő), 84 (növekvő jegyek). **Q4. b)** 22 950. **Q5.** 21 koccintás; a 7 · 3 = 21 páratlan fokszámösszeg miatt lehetetlen; 9 projektből 4: 126.

> **⚠️ CSAPDA:** kézfogásnál, csoportválasztásnál nem számít a sorrend – a sorrendes darabszámot k!-sal osztjuk; „legalább” típusú kérdésnél a komplementer módszer gyorsabb.

---

## 💻 Elkészített Komponensek

1. **`CombinatoricsGraphsSummaryFigures.tsx`**:
   - `CountingBoxesSvg`: „dobozos” szemléltetés: 5!, 8 · 7 · 6, 6³.
   - `PascalTriangleSvg`: Pascal-háromszög n = 0…7, szimmetria, sorösszeg 2ⁿ.
   - `HandshakeGraphSvg`: 6 pontú teljes gráf, 15 kézfogás, 2¹⁵ − 1 fotóválasztás.
   - `DegreeSumSvg`: 5 csúcsú, 7 élű gráf fokszámokkal (fokszámtétel).
   - `DescendingDigitsSvg`: a csökkenő számjegyű ötjegyű számok kiválasztásos megoldása.
2. **`CombinatoricsGraphsSummaryTheory.tsx`**: fogalomtár (D/T/M táblázat), két kidolgozott feladat, gráfok és fokszámtétel, a blokk feladatai, csapda.
   - **I. Laboratórium:** „melyik képlet kell?” – n, k csúszka, sorrend / ismétlés kapcsoló, élő eredmény, Pascal-sor kiemeléssel, tankönyvi előbeállítások.
   - **II. Laboratórium:** 6 csúcsú gráfépítő (élek be/ki kapcsolása), fokszámok és fokszámtétel élő ellenőrzése, előbeállítások (teljes gráf, kör, kocka lapjai).
3. **`CombinatoricsGraphsSummaryMatcher.tsx`**: 3 szint × 8 pár (helyzet ↔ képlet; kifejezés ↔ érték; feladat ↔ eredmény).
4. **`CombinatoricsGraphsSummarySorter.tsx`**: 3 szint × 3 kategória × 9 elem (variáció / ismétléses variáció / kombináció; értéktartományok; létezik-e a fokszámsorozatú gráf).
5. **`CombinatoricsGraphsSummaryQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 6 kérdésábrával, 3 puskakártyával.
- `graphKit.tsx`: belső gráfrajzoló és kombinatorikai segédfüggvények (nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-sum-kombinatorika-grafok-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic4CombinatoricsGraphsSummary.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
