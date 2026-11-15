# 25. Gyakorlás, tudáspróba (25. lecke, 74–75. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 74–75. oldal) alapján kidolgozott oktatási modul. A tankönyvben ezután következő *Témazáró feladatgyűjtemény* (76–79. o.) nem része ennek a modulnak.

---

## 🎯 Tananyag Áttekintés

A kombinatorika, gráfok fejezet lezáró gyakorló leckéje: összefoglaló (jelszavak, sorba rendezés, kiválasztás sorrenddel és sorrend nélkül, binomiális együtthatók, esetszétválasztás, gráfok fokszámai, teljes gráf), egy betűrejtvény, négy gyakorló feladat (köztük két érettségi), valamint egy könnyebb és egy nehezebb tudáspróba (5–5 feladat).

A tankönyvben ebben a fejezetben a gráfelmélet a csúcs, él, fokszám, hurokél, teljes gráf fogalmára és a **fokszámok összege = 2 · élek száma** tételre épül (fák és Euler-vonal nem szerepelnek).

---

## 📐 Feladatok és eredmények (node-dal ellenőrizve)

### Gyakorló feladatok (74. o.)
- **1. Rejtvény:** 8 gyerek, Zsófi a szélen: 2 · 7! = 10 080 (R); {p; a; l; i; 1; 2; 3}, 3 betű + 4 számjegy: 4³ · 3⁴ = 5184 (E); négyjegyű páros számok 7 nélkül: 8 · 9 · 9 · 5 = 3240 (D); 3 nap novemberben: 30 alatt a 3 = 4060 (E); 5 csúcs, 7 él: fokszámösszeg 14 (N); 8 pontú teljes gráf: 28 él (H). Megfejtés: **HEREND** – herendi porcelán.
- **2. Rendszámok:** BBB-SzSzSz: 26³ · 10³ = 17 576 000. a) B-Sz-B-Sz-B-Sz: 1-szeres; b) BB-BB-SzSz: 2,6-szeres; c) BB-SzSz-SzSz: 10/26 ≈ 0,38-szoros; d) BB-BB-SzSzSz: **26-szoros – ebből lehet a legtöbb**.
- **3. Buszjegy (9 mező):** a) 2–5 lyuk: 36 + 84 + 126 + 126 = **372**; b) 5 lyuk középpontosan szimmetrikusan: a középső mező lyukas + 2 pár a 4-ből = **6**.
- **4. Koccintás (érettségi, 2017):** 1 + 2 + 2 + 3 + 3 + 6 + 6 = 23 páratlan ⇒ **nem lehetséges** (a két 6-os fokú miatt mindenkinek legalább 2 koccintása lenne).
- **5. Álláshirdetés (érettségi, 2005):** élek A–B, A–C, B–C, A–D; b) **4** ismerős pár; c) 6 − 4 = **2** kézfogás.

### Tudáspróba I. (75. o.)
- **1.** 6 játékos: a) 15 mérkőzés; b) 2 · 3 + 3 = 9 mérkőzés.
- **2. (érettségi, 2014)** 0; 1; 2; 2; 2; 5; 0; 0; 4; 4; 2 ⇒ összeg 22 ⇒ **11 kézfogás** (egy lehetséges gráf az ábrán).
- **3.** 17 főből 3 felelő: a) 680; b) 4080.
- **4.** Hajni és Bence nem egymás mellett: 24 − 12 = 12.
- **5.** Okmányazonosító: a) nem (kezdődhet 0-val); b) 900 000; c) 1 000 000; d) 676; e) 676 000 000 ⇒ igen.

### Tudáspróba II. (75. o.)
- **1.** Teljes gráf: a) 9; b) 19; c) 15 csúcs.
- **2.** Teszt (10 kérdés, 4 válasz): a) 4¹⁰ = 1 048 576; b) 3⁵ = 243; c) 30.
- **3.** 27 fő (15 lány): a) 80 730; b) 80 730 − 3003 = 77 727.
- **4.** Hatjegyű páros számok, amelyekben van 0: 450 000 − 236 196 = **213 804**.
- **5. (érettségi alapján, 2011)** Telefonszám két billentyűoszlopból: 216 + 288 = **504**.

> **⚠️ CSAPDA:** Ha a kiválasztott elemek ugyanabba a szerepbe kerülnek (ugyanaz a feladat), nem számít a sorrend – a variációt k!-sal osztani kell (4080 helyett 680). A fokszámok összege nem az élek száma, hanem annak kétszerese (22 helyett 11 kézfogás).

---

## 💻 Elkészített Komponensek

1. **`CombinatoricsPracticeExamFigures.tsx`**:
   - `LicensePlatesSvg`: régi (BBB-SzSzSz) és új (BB-BB-SzSzSz) rendszám, darabszámok.
   - `BusTicketSvg`: 3 × 3-as lyukasztómező, középpontosan szimmetrikus 5 lyukas lyukasztás.
   - `AcquaintanceGraphSvg`: Aladár, Béla, Cecil, Dénes ismeretségi gráfja, a 2 kézfogás szaggatottan.
   - `HandshakeGraphSvg`: a focicsapat egy lehetséges kézfogási gráfja (11 él, 3 izolált csúcs).
   - `PhoneKeypadSvg`: telefon-billentyűzet a három oszloppal és az 504-es számolással.
   - `CountingModelTreeSvg`: döntési fa – permutáció, variáció, ismétléses variáció, kombináció.
2. **`CombinatoricsPracticeExamTheory.tsx`**: fejezet-összefoglaló kártyák és modelltáblázat, a rejtvény táblázatos megoldása, a gyakorló feladatok és mindkét tudáspróba kidolgozva, csapda.
   - **I. Laboratórium:** modellválasztó kalkulátor (n, k csúszka; sorba rendezés / számít a sorrend / ismétlődhet kapcsolók) élő képlettel és eredménnyel.
   - **II. Laboratórium:** „Létezik-e ilyen gráf?” – fokszámsorozat-ellenőrző (paritás, maximális fokszám, lépésenkénti lebontás), tankönyvi előbeállításokkal.
3. **`CombinatoricsPracticeExamMatcher.tsx`**: 3 szint × 8 pár (képletek és fogalmak; rejtvény és gyakorló feladatok; tudáspróbák).
4. **`CombinatoricsPracticeExamSorter.tsx`**: 3 szint × 3 kategória × 9 elem (melyik modell; létezik-e a gráf; komplementer / esetszétválasztás / csak szorzás).
5. **`CombinatoricsPracticeExamQuiz.tsx`**: **90 kérdés (szintenként 30)** a teljes fejezetből (16–25. lecke), 3 puskakártyával (progress id: `g11-comb-tudasproba-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic2CombinatoricsPracticeExam.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
