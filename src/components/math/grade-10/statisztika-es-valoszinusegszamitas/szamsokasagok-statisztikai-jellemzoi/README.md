# 4. Számsokaságok statisztikai jellemzői

## Tananyag Áttekintés
Adathalmazok és minták átfogó statisztikai leírása: helyzeti középértékek (átlag, módusz, medián), szóródási mutatók (terjedelem), a medián robusztussága kiugró értékekkel (outlier) szemben, valamint adatrekonstrukciós érettségi feladatok.

---

## Fő Fogalmak és Összefüggések

- **Helyzeti mutatók (Középértékek):**
  - **Módusz ($Mo$):** A mintában leggyakrabban előforduló érték (a legnagyobb gyakoriságú adat).
  - **Medián ($Me$):** A növekvő sorba rendezett adatok felezőpontja:
    - Páratlan elemszám ($n$) esetén a pontosan középső, azaz $\frac{n+1}{2}$-edik elem.
    - Páros elemszám ($n$) esetén a két középső ($\frac{n}{2}$ és $\frac{n}{2}+1$) adat számtani közepe.
  - **Átlag ($\bar{x}$):** Az elemek összege osztva az elemszámmal: $\bar{x} = \frac{\sum x_i}{n}$. Súlyozott átlag: $\bar{x} = \frac{\sum f_i x_i}{\sum f_i}$.
  - **Átlagtól vett eltérések összege:** Mindig pontosan nulla: $\sum (x_i - \bar{x}) = 0$.

- **Szóródási mutató:**
  - **Terjedelem ($R$):** A legnagyobb és a legkisebb adat kivonásos különbsége: $R = x_{\max} - x_{\min}$.

- **Robusztusság és szélső értékek:**
  - A **medián robusztus**: nem érzékeny az extrém kiugró értékekre (outlierekre).
  - Az **átlag és a terjedelem érzékeny**: egyetlen extrém adat (pl. kiugró fizetés) drasztikusan eltorzítja őket.
  - **Melyik mutató szerepel biztosan a mintában?** A módusz (ha létezik) és a páratlan elemszámú medián garantáltan eleme az eredeti adathalmaznak; az átlag és a páros medián viszont lehet olyan szám is, ami eredetileg nem szerepelt.

---

## Elkészült Komponensek

1. **`SummaryStatsFigures.tsx`:**
   - `MeanMedianModeSalarySvg`: Céges fizetések gyakorisága a három középértékkel és terjedelemmel.
   - `MedianEvenOddSvg`: Páratlan ($n=5$) és páros ($n=6$) elemszámú medián meghatározás lépésről lépésre.
   - `RangeAndOutlierSvg`: Kiugró érték torzító hatása az átlagra és a terjedelemre a robusztus mediánnal szemben.
   - `FrequencyHistogramStatsSvg`: Félévi kémia osztályzatok gyakorisági hisztogramja és mutatóinak leolvasása.

2. **`SummaryStatsTheory.tsx`:**
   - Kiemelt **Fontos szabályok & Memóriapanel** 5 aranyszabállyal a tananyag elején.
   - Fejlécben `quickRule` azonnali összefoglaló kártya.
   - Interaktív Statisztikai Elemző Labor (dinamikus adatsor, valós idejű mutatók, rendezett buborékok, preszetek).
   - 5 részletes elméleti fejezet érettségi példákkal és csapdákkal.

3. **`SummaryStatsMatcher.tsx`:**
   - 3 szint × 8 kártyapár (24 párosítás): Alapfogalmak és jelölések, Számítások konkrét mintákon, Statisztikai tételek és tulajdonságok.

4. **`SummaryStatsSorter.tsx`:**
   - 3 szint rendezési feladat (Terjedelmek sorrendje, Mediánok sorrendje, Vegyes mutatók értéke).

5. **`SummaryStatsQuiz.tsx`:**
   - 30 kérdés 3 nehézségi szinten, lépésről-lépésre magyarázatokkal, tippekkel, 3 vizuális puskakártyával, valamint beépített párosító és rendező játékmóddal.
