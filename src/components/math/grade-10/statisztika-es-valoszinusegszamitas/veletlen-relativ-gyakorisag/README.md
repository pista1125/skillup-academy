# 6. Véletlen? – Relatív gyakoriság

## Tananyag Áttekintés
A véletlen kísérletek vizsgálata, a kísérleti gyakoriság és relatív gyakoriság fogalma, a relatív gyakoriság empirikus stabilitása (a nagy számok törvénye), valamint a valószínűség megalapozása érmedobások és számítógépes kockaszimulációk segítségével.

---

## Fő Fogalmak és Összefüggések

- **Véletlen kísérlet és esemény:**
  - **Véletlen kísérlet:** Olyan folyamat, amely azonos körülmények között tetszőlegesen sokszor megismételhető, de kimenetele előre nem jósolható meg biztosan.
  - **Esemény ($A$):** A kísérlet kimenetelére vonatkozó állítás, amely vagy bekövetkezik, vagy nem.
  - **Gyakoriság ($k$):** A kedvező bekövetkezések száma az $n$ kísérletből ($0 \le k \le n$).
  - **Relatív gyakoriság ($g$):** A bekövetkezések aránya:
    $$g = \frac{k}{n} \quad (0 \le g \le 1)$$

- **A relatív gyakoriság empirikus stabilitása:**
  - Kis kísérletszámnál a relatív gyakoriság jelentősen ingadozik.
  - A kísérletek számának növelésével ($n \to \infty$) az ingadozás csillapodik, és a relatív gyakoriság egy meghatározott állandó érték, az **elméleti valószínűség ($P(A)$)** körül stabilizálódik.

- **Kombinatorikus mikroállapotok (Tibor csapdája):**
  - Három érme feldobásakor $2^3 = 8$ egyenlően valószínű elemi kimenetel létezik:
    $$\{FFF, FFI, FIF, IFF, FII, IFI, IIF, III\}$$
  - Az „1 fej és 2 írás” esemény 3 elemi esetből áll (FII, IFI, IIF), így valószínűsége $P = \frac{3}{8} = 37,5\%$ (nem pedig $\frac{1}{4}$!).

- **Függetlenség és a „játékos tévedése” (Gambler's Fallacy):**
  - Az érmének és a dobókockának nincs memóriája: korábbi fejek sorozata semmilyen módon nem növeli az írás esélyét a rákövetkező dobásnál.

---

## Elkészült Komponensek

1. **`RandomFrequencyFigures.tsx`:**
   - `CoinFlipLawOfLargeNumbersSvg`: Fejek relatív gyakoriságának stabilizálódása a 400 dobásos tankönyvi kísérletben a $p = 0,5$ vonalhoz simulva.
   - `ThreeCoinsOutcomesSvg`: 3 érme 8 mikroszkopikus elemi eseménye és Tibor csapdájának vizuális cáfolata ($3/8$ vs. $1/4$).
   - `DiceSimulationFrequencySvg`: 850 számítógépes kockadobás hisztogramja, prímszámok ($53,06\%$) és összetett számok ($32,12\%$) kiemelésével.

2. **`RandomFrequencyTheory.tsx`:**
   - Kiemelt **Fontos szabályok & Memóriapanel** 5 aranyszabállyal a tananyag elején.
   - Fejlécben `quickRule` összefoglaló kártya.
   - Interaktív Érmedobó & Stabilitás Szimulátor (élő véletlengenerálás, +10, +50, +100 dobás, valós idejű konvergenciasáv, tankönyvi preszetek).
   - 4 részletes elméleti fejezet érmékkel, kockaszimulációval és gondolkodási csapdákkal.

3. **`RandomFrequencyMatcher.tsx`:**
   - 3 szint × 8 kártyapár (24 párosítás): Alapfogalmak és jelölések, Számítások és kísérleti adatok, Típuscsapdák és valószínűségi törvények.

4. **`RandomFrequencySorter.tsx`:**
   - 3 szint rendezési feladat (Relatív gyakoriságok sorrendje, Kísérleti adatsorok, Valószínűségi események sorrendje).

5. **`RandomFrequencyQuiz.tsx`:**
   - 30 kérdés 3 nehézségi szinten, lépésről-lépésre magyarázatokkal, tippekkel, 3 vizuális puskakártyával, valamint beépített párosító és rendező játékmóddal.
