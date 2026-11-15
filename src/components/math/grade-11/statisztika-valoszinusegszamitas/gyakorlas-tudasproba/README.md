# 16. Gyakorlás, tudáspróba (tankönyv 65. lecke, 206–207. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 206–207. oldal) alapján kidolgozott oktatási modul. A diákzónában az V. fejezet (Statisztika és valószínűségszámítás) 16., lezáró leckéje. A tankönyvben ezután következő *Témazáró feladatgyűjtemény* nem része ennek a modulnak.

---

## 🎯 Tananyag Áttekintés

A fejezet összefoglalása: átlag, medián, módusz, terjedelem, kvartilisek, félterjedelem, dobozdiagram, szórás, kör- és sávdiagram; klasszikus valószínűség, komplementer, várható érték és méltányos játék, egyszerre húzás, visszatevés nélküli és visszatevéses (binomiális) mintavétel, a két mintavétel összevetése. Hét gyakorló feladat és egy ötfeladatos tudáspróba.

Kvartilisek a tankönyv szabálya szerint: páratlan elemszámnál a mediánt elhagyjuk, és a két „fél” mediánját vesszük. Szórás: σ = √(eltérésnégyzetek átlaga) (n-nel osztunk).

---

## 📐 Feladatok és eredmények (node-dal ellenőrizve)

### Gyakorló feladatok (206. o.)
- **1.** (érettségi, 2010) 17 dolgozat, medián 4, módusz 4, terjedelem 4, átlag ≈ 3,41 (összeg 58): **A** igaz (a 9.–17. jegy legalább 4-es); **B** hamis (terjedelem 4 ⇒ van 1-es).
- **2.** 15 db 222: módusz = medián = 222, terjedelem 0, szórás 0; b) igaz; c) igaz; d) hamis (pl. −1; 1).
- **3.** Dobozdiagram leolvasása (min, Q₁, Me, Q₃, max, terjedelem, félterjedelem) – a tankönyvi ábra értékei a forrásszövegből nem olvashatók ki, ezért a modul módszertanilag dolgozza fel, és saját dobozdiagramokkal gyakoroltat.
- **4.** (érettségi alapján, 2005) 19 tömegmérés: gyakoriság 33:2, 35:4, 36:4, 37:6, 38:2, 40:1; átlag 688/19 ≈ 36,21 ⇒ **36 g**; medián **36**, módusz **37**; dobozdiagram: 33 / 35 / 36 / 37 / 40.
- **5.** Részvény (3200 Ft; 0,2: változatlan, 0,4: +15%, 0,4: −10%): E = **3264 Ft**.
- **6.** 36 fős osztály, 12 + 10 olvasó, 14 egyiket sem; 4 tanuló: a) 1001/58 905 ≈ **0,017**; b) 2200/58 905 ≈ **0,037**.
- **7.** (érettségi, 2019) automata, p = 0,8, 5 nap, legalább 4: 0,4096 + 0,32768 = **0,73728**.

### Tudáspróba (207. o.)
- **1.** 24 dolgozat kördiagramja (1 tanuló = 15°): jeles 45° (3), jó 60° (4), közepes 135° (9), elégséges 90° (6), elégtelen 30° (2). Átlag **3**, módusz **3**, medián **3**, szórás √1,25 ≈ **1,12**.
- **2.** 14–20 (gyakoriság 1, 2, 3, 3, 2, 1, 1), 13 adat: min 14, Q₁ = **15,5**, Me = **17**, Q₃ = **18**, max 20.
- **3.** Kocka: 3 lapon 1, 2 lapon 3, 1 lapon 6 pont: p = 1/2, 1/3, 1/6; E = **2,5**.
- **4.** 1–50, három szám: a) (25 alatt 3)/(50 alatt 3) = 2300/19 600 ≈ **0,117**; b) (10 alatt 2) · 40 / 19 600 ≈ **0,092**.
- **5.** (érettségi, 2020) díszkő, rossz matrica 0,01, 21 doboz, legalább 20 jó: 0,99²¹ + 21 · 0,01 · 0,99²⁰ ≈ **0,981**.

> **⚠️ CSAPDA:** „legalább 4 napon” ≠ 0,8⁴. A „legalább” több, egymást kizáró esetet jelent: (5 alatt 4) · 0,8⁴ · 0,2 + 0,8⁵.

> Megjegyzés: a tudáspróba 1. kördiagramjának szög–osztályzat hozzárendelése a forrásszöveg elrendezéséből következtetett (az átlag így pontosan 3 lesz, ami megerősíti); a pontos ábrát érdemes a tankönyvvel összevetni.

---

## 💻 Elkészített Komponensek

1. **`StatProbPracticeExamFigures.tsx`** (újrahasznosítja a `diagramok` lecke `PieChart` és a `gyakorlas-statisztika` lecke `StatisticsPracticeBoxPlot` segédjét):
   - Segédek: `STAT_PROB_EXAM_GRADES`, `STAT_PROB_EXAM_MASSES`, `statProbExamStats` (tankönyvi kvartilis-szabály), `spFmt`.
   - `StatProbExamChapterMapSvg`: a fejezet 16 leckéjének áttekintő térképe.
   - `StatProbExamGradesPieSvg`: a 24 osztályzat kördiagramja.
   - `StatProbExamMassBoxPlotSvg`: a tömegmérés dobozdiagramja.
   - `StatProbExamFrequencyBoxPlotSvg`: gyakorisági táblázat és dobozdiagram (tudáspróba 2.).
   - `StatProbExamVennSvg`: a két könyv olvasói (Venn-diagram).
   - `StatProbExamStockSvg`: a részvény három kimenetele.
   - `StatProbExamSpecialDieSvg`: a különleges dobókocka.
2. **`StatProbPracticeExamTheory.tsx`**: statisztikai és valószínűségi összefoglaló táblázatok, a 7 gyakorló feladat és az 5 tudáspróba-feladat kidolgozása, csapda.
   - **I. Laboratórium – statisztikai jellemzők:** tetszőleges adatsor beírása, élő átlag, medián, módusz, kvartilisek, terjedelem, félterjedelem, szórás és dobozdiagram; tankönyvi előbeállítások.
   - **II. Laboratórium – valószínűségi modellek:** binomiális vagy visszatevés nélküli modell, „pontosan / legalább / legfeljebb k” valószínűség, eloszlás-oszlopdiagram, várható érték; előbeállítások (automata, díszkő, osztály, 1–50).
3. **`StatProbPracticeExamMatcher.tsx`**: 3 szint × 8 pár (fogalmak; adatsokaság ↔ jellemző; feladat ↔ valószínűség / várható érték).
4. **`StatProbPracticeExamSorter.tsx`**: 3 szint × 3 kategória × 9 elem (középérték / szóródás / diagram; valószínűség nagysága; megoldási modell).
5. **`StatProbPracticeExamQuiz.tsx`**: **90 kérdés (30/30/30)** a teljes fejezetből, kérdéstípus-címkékkel, kördiagram-, dobozdiagram-, gyakorisági táblázat-, Venn-, urna- és kockaábrákkal, 3 puskakártyával (progress id: `g11-stat-tudasproba-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic5StatProbPracticeExam.test.tsx` fájlban található: a 4 komponenst, mind a 7 SVG ábrát és a tankönyvi kvartilis-számítást ellenőrzi.
