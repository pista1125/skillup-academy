# 11. Gyakorlás, tudáspróba (44. lecke, 102–103. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 44. lecke, 102–103. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a III. Statisztika és valószínűségszámítás fejezet **11.**, fejezetzáró leckéje. Kiegészítő feladatanyagként a törölt 43. „Gyakorlás” lecke (100–101. oldal) feladatait is felhasználtuk.

---

## 🎯 Tananyag Áttekintés

A fejezet összefoglalása (képlettár) és érettségi típusú feladatok: reprezentatív minta, átlag, medián, módusz, terjedelem, szórás, relatív szórás, hozam, dobozdiagram (Q0–Q4, félterjedelem Q3 − Q1, kiugró adat: 1,5 · (Q3 − Q1)), osztályközepek, eseménytér, A + B, A · B, Ā, klasszikus, geometriai valószínűség, függetlenség, várható érték (E), visszatevés nélküli és visszatevéses (binomiális) mintavétel.

### 44. lecke – feladatok (ellenőrzött eredmények)
- **1. (érettségi 2021)** Dávid: 3; 3; 3; 5; 5 (medián 3, átlag 3,8) → János jegyei **1; 1; 4; 4; 4**; Eszter éves átlaga (9 · 3 + 6 · 4,5) / 15 = **3,6**.
- **2.** Dobozdiagram 4 osztálya (mindegyik ¼), 12 adat visszatevéssel: a) 0,5¹² ≈ **0,000244**; b) (12 alatt 3) · 0,25³ · 0,75⁹ ≈ **0,258**; c) legfeljebb 2 adat ≥ Q3: ≈ **0,391**.
- **3.** A: átlagos hozam 13%, szórás 3%; B: 24%, 6% → relatív szórás 0,23 ill. 0,25 → **B** a kockázatosabb.
- **4.** Hatoslottó, pontosan 2 szám osztható 6-tal (7 ilyen szám): 21 · 73 815 / 8 145 060 ≈ **0,190**.
- **5.** Kupon: 0,9 · 1000 + 0,08 · 2000 + 0,02 · 8000 = **1220 Ft**.

### Tudáspróba
- **1.** Dobozdiagram kérdései (az ábra adatai a szövegből nem olvashatók ki – a kvízben saját dobozdiagramos kérdések szerepelnek).
- **2.** Két kocka, A: összeg 5, B: szorzat 4: P(A) = 1/9, P(B) = 1/12, P(A · B) = 1/18, P(A + B) = 5/36.
- **3.** Pók (p = 0,7, 5 alkalom): egyszer sem 0,3⁵ ≈ 0,0024; legfeljebb egyszer ≈ 0,0308.
- **4.** Szerencsekerék 3000 Ft (60°), 500 Ft (120°), 200 Ft (150°), 5000 Ft (30°): E = 420 000 / 360 ≈ 1166,67 Ft.
- **5.** 20 tétel, 9 XX. századi, 6 húzás visszatevés nélkül: a) 0,55; b) ≈ 0,306; c) ≈ 0,426.
- **Ráadás:** a katonai erő (3 kocka maximuma) 2: 7/216, 3: 19 dobás, 19/216, 4: 37/216.

### 43. lecke (Gyakorlás) – felhasznált feladatok
- **1.** Valószínűség-összehasonlítások (6 kocka, pontosan 2 hatos ≈ 0,201; 7 szám 1–9-ből, 4 páratlan: 5/9; 10 érme legalább 1 fej; 8 érme több fej: 93/256; selejt 140 termékből legfeljebb 1 ≈ 0,377).
- **2. (érettségi 2012)** András: átlag 3,8, szórás ≈ 0,75; Cili: csupa 4-es; Dávid: 4; 4; 4; 5; 5, 10-féle kitöltés; kördiagram: 7 közepes.
- **3.** Sorsjegy: E = 350 Ft, haszon 150 000 Ft. **4.** Két kocka: P(legalább egy hatos) = 11/36, P(legalább egy 1 vagy 5) = 5/9.
- **HF:** biztosító (≈ 0,089; ≈ 0,017), iskolai átlag ≈ 3,42 (javítás ≈ 0,12; 6 tanulóból 3 kollégista ≈ 0,087), PIN-kód (1/12, három próbából 1/4), hozamok 4%, 8%, −2%, −4% (σ ≈ 4,77%).

> **Megjegyzés a forráshoz:** a tudáspróba 4. kerekén a 30°-os cikk a hiányzó szögből adódik (360° − 60° − 120° − 150°), a nyereményekhez rendelés a szöveg elhelyezéséből; a 44. lecke 3. feladatának táblázatát a szöveg sorrendje alapján rekonstruáltuk (A: 13% / 3%, B: 24% / 6%). Az ábrákat nem lehetett megtekinteni.

> **⚠️ CSAPDA:** nem kizáró eseményeknél P(A + B) = P(A) + P(B) − P(A · B) – a közös részt le kell vonni.

A tankönyv Témazáró feladatgyűjteménye és a Próbaérettségi nem része a modulnak. A korábbi README pontozási útmutatót említett – ilyen a tankönyvben nincs.

---

## 💻 Elkészített Komponensek

1. **`StatProbExam12Figures.tsx`**:
   - `StatProbExam12ChapterMapSvg`: a fejezet 10 leckéjének áttekintő térképe.
   - `StatProbExam12BoxQuartersSvg`: dobozdiagram a négy osztállyal (A, B, C, D).
   - `StatProbExam12StockCompareSvg`: a két részvény jellemzői.
   - `StatProbExam12DiceTableSvg`: két kocka 6 × 6-os táblázata (összeg 5, szorzat 4).
   - `StatProbExam12WheelSvg`: a tudáspróba szerencsekereke.
   - `StatProbExam12GradesPieSvg`: az érettségi eredmények kördiagramja.
2. **`StatProbExam12Theory.tsx`**: áttekintés, képlettár (statisztika, valószínűségszámítás), a 44. lecke feladatai, a tudáspróba, a 43. lecke feladatai, csapda.
   - **I. Laboratórium:** dobozdiagram és kiugró adatok – tetszőleges adatsor, Q0–Q4, félterjedelem, kiugróhatárok, dobozdiagram kiugró pontokkal (előbeállítások: úszóidők, csapadék stb.).
   - **II. Laboratórium:** események két kockával – A és B esemény választása, kiemelt 6 × 6-os táblázat, P(A), P(B), P(A · B), P(A + B), P(Ā), függetlenség vizsgálata.
3. **`StatProbExam12Matcher.tsx`**: 3 szint × 8 pár (statisztikai fogalmak; valószínűségszámítási fogalmak; tudáspróba-eredmények).
4. **`StatProbExam12Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (középérték / szóródás / valószínűség; két kocka: 1/12, 1/9, 1/6; geometriai / visszatevés nélküli / visszatevéses modell).
5. **`StatProbExam12Quiz.tsx`**: **90 kérdés** 3 szinten (30/30/30) a teljes fejezetből, 23 kérdésábrával, 3 puskakártyával.
- `statKit.tsx`: belső rajzsegédek (a fejezet közös készletének másolata `SWheel` szerencsekerékkel; nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-stat-tudasproba-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic3StatProbExam12.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
