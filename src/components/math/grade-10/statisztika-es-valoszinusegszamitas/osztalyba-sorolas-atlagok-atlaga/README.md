# 5. Osztályba sorolás, átlagok átlaga

## Tananyag Áttekintés
Nagy adathalmazok és mérési eredmények csoportosítása, gyakorisági táblázatok és folytonos hisztogramok készítése osztályközök segítségével, az osztályközepekkel történő közelítő átlagszámítás, valamint a részcsoportok átlagainak helyes (súlyozott) összevonása.

---

## Fő Fogalmak és Összefüggések

- **Osztályba sorolás (csoportosítás):**
  - Folytonos vagy nagyszámú diszkrét adat diszjunkt intervallumokba ([a; b[) rendezése.
  - **Diszjunktivitás követelménye:** Minden adat pontosan egyetlen osztályba kell hogy essen (nincs átfedés, nincs kihagyás).
  - **Osztályközép ($x_{\text{közép}}$):** Az osztály alsó és felső határának számtani közepe:
    $$x_{\text{közép}} = \frac{a + b}{2}$$
  - **Csoportosított adatok becsült átlaga:**
    $$\bar{x} \approx \frac{\sum f_i \cdot x_{\text{közép}, i}}{\sum f_i}$$

- **Az „Átlagok átlaga” csapda (Bence típushibája):**
  - Ha különböző létszámú részcsoportok átlagait akarjuk összevonni, az egyszerű átlagolás ($\frac{\bar{x}_1 + \bar{x}_2}{2}$) **hibás eredményt ad**!
  - Csoportátlagokat egyszerűen átlagolni **CSAK akkor szabad, ha a csoportok létszáma egyenlő** ($n_1 = n_2$).
  - Eltérő létszámok esetén kötelező a **súlyozott átlag**:
    $$\bar{x}_{\text{összes}} = \frac{n_1 \bar{x}_1 + n_2 \bar{x}_2 + \dots + n_k \bar{x}_k}{n_1 + n_2 + \dots + n_k}$$

- **Mérlegelmélet és létszámarányok:**
  - A kombinált súlyozott átlag mindig közelebb van a nagyobb létszámú csoport átlagához.
  - A két csoportátlagtól mért távolságok fordítottan arányosak a létszámokkal:
    $$\frac{n_1}{n_2} = \frac{|\bar{x}_2 - \bar{x}_{\text{összes}}|}{|\bar{x}_{\text{összes}} - \bar{x}_1|}$$

---

## Elkészült Komponensek

1. **`ClassIntervalFigures.tsx`:**
   - `BenceTrapAverageOfAveragesSvg`: Bence hibás egyszerű átlaga (4,5) és a helyes súlyozott átlag (4,2).
   - `ClassIntervalHistogramSvg`: 200 izzó élettartamának osztályba sorolása és osztályközepei.
   - `Grade10CohortHeightSvg`: 10. évfolyam testmagasság: 4 részcsoport súlyozott egyesítése.

2. **`ClassIntervalTheory.tsx`:**
   - Kiemelt **Fontos szabályok & Memóriapanel** 5 aranyszabállyal a tananyag elején.
   - Fejlécben `quickRule` azonnali összefoglaló kártya.
   - Interaktív Súlyozott Átlag & Csoportátlag Labor (2 csoport csúszkái, valós idejű összehasonlítás, eltérés kijelzése, preszetek).
   - 4 részletes elméleti fejezet érettségi példákkal (Bence házi feladata, városi életkorok, izzók élettartama, kosárlabda dobószázalék).

3. **`ClassIntervalMatcher.tsx`:**
   - 3 szint × 8 kártyapár (24 párosítás): Alapfogalmak és osztályközök, Osztályközepek és csoportátlagok számítása, Statisztikai törvények és érvelés.

4. **`ClassIntervalSorter.tsx`:**
   - 3 szint rendezési feladat (Osztályközepek sorrendje, Súlyozott csoportátlagok sorrendje, Vegyes statisztikai feladványok).

5. **`ClassIntervalQuiz.tsx`:**
   - 30 kérdés 3 nehézségi szinten, lépésről-lépésre magyarázatokkal, tippekkel, 3 vizuális puskakártyával, valamint beépített párosító és rendező játékmóddal (beleértve a 2014-es emelt szintű érettségi kosárlabda dobószázalék feladatát is).
