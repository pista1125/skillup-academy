# 1. Átlag, számtani közép

## Tananyag Áttekintés
A számtani közép (átlag) alapfogalma, kiszámításának algoritmusa és tulajdonságai: hogyan jellemezhetünk egy adathalmazt egyetlen középértékkel, mi a súlyozott átlag logikája, és mikor félrevezető az átlag használata.

---

## Fő Fogalmak és Képletek

- **Egyszerű számtani közép ($\bar{x}$):**
  $$\bar{x} = \frac{x_1 + x_2 + \dots + x_n}{n} = \frac{\sum_{i=1}^n x_i}{n}$$
  - Az elemek összege osztva az elemek számával.
  - Összeg visszaszámolása: $\sum_{i=1}^n x_i = n \cdot \bar{x}$.

- **Súlyozott számtani közép:**
  - Ha az egyes értékek különböző gyakorisággal vagy súllyal fordulnak elő:
  $$\bar{x} = \frac{f_1 x_1 + f_2 x_2 + \dots + f_k x_k}{f_1 + f_2 + \dots + f_k} = \frac{\sum_{i=1}^k f_i x_i}{\sum_{i=1}^k f_i}$$

- **Alaptulajdonságok és tételek:**
  - Az átlagtól vett előjeles eltérések összege mindig 0: $\sum_{i=1}^n (x_i - \bar{x}) = 0$.
  - Lineáris hozzáadás: $\overline{x + c} = \bar{x} + c$.
  - Konstans szorzás: $\overline{c \cdot x} = c \cdot \bar{x}$.
  - Az átlag érzékeny a kiugró értékekre (outlierekre), nem robusztus mutató.

---

## Elkészült Komponensek és Források

A tananyag és a feladatok a hivatalos **OH-MAT10TA/II** tankönyv 42–43. oldalának és az **OH-SNE-MAT10M-2** munkafüzetnek a feldolgozásával készültek:

1. **`AverageArithmeticFigures.tsx`**:
   - `BalanceMeanSvg`: Kétkarú mérleg fizikai modellje az átlagról mint súlypontról.
   - `DeviationLineSvg`: Számegyenes előjeles eltérés-vektorokkal és a nullás egyensúllyal.
   - `WeightedMeanBlocksSvg`: Súlyozott átlag vizualizáció gyakorisági blokkokkal.
   - `TargetShootingSvg`: Feri lövészversenyének céltáblája és határérték-számítása.
   - `OutlierImpactSvg`: Kiugró érték torzító hatásának demonstrációja.

2. **`AverageArithmeticTheory.tsx`**:
   - Interaktív Statisztikai Laboratórium:
     - Mérleghinta & Eltérés-vizsgáló dinamikus adatszerkesztővel és élő eltéréstáblázattal.
     - Célátlag Kalkulátor ("Hányas kell még a félévi 4-eshez vagy 5-öshöz?").
   - 5 részletes elméleti szekció definíciókkal, tételekkel, mintapéldákkal és csapdákkal.
   - PDF export (`grade10-average-arithmetic-theory`).

3. **`AverageArithmeticMatcher.tsx`**:
   - 3 szint × 8 összetartozó pár (alapfogalmak, transzformációk, érettségi alkalmazások).

4. **`AverageArithmeticSorter.tsx`**:
   - 3 szintű csoportosító játék (nagyságrendi csoportosítás, matematikai igazság vs. tévhit, adatmódosítások hatása).

5. **`AverageArithmeticQuiz.tsx`**:
   - 3 nehézségi szint × 10 feladat = 30 válogatott, magyarázatokkal és tippekkel ellátott kérdés.
   - 1. Szint: Alapfogalmak és egyszerű számtani közép.
   - 2. Szint: Súlyozott átlag, transzformációk és hiányzó adatok.
   - 3. Szint: Kompetencia, érettségi és összetett szöveges feladatok (lövészverseny, kosárlabda, gyógyszer-minőségellenőrzés).
   - Beépített CheatSheet kártyák és Wordwall stílusú Párosító / Csoportosító játékmódok.
