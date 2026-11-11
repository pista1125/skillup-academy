# 3. Változások

## Tananyag Áttekintés
Adatsorok és statisztikai mutatók változásainak vizsgálata: abszolút változás, relatív változás, bázis- és láncviszonyszámok, a bázis-eltolódás jelensége, valamint százalékpont és százalékos relatív változás szigorú megkülönböztetése.

---

## Fő Fogalmak és Összefüggések

- **Abszolút és relatív változás:**
  - **Abszolút változás:** $\Delta x = x_1 - x_0$ (értékbeli különbség konkrét mértékegységgel: Ft, km, kg, fő).
  - **Relatív változás:** $\frac{\Delta x}{x_0} = \frac{x_1 - x_0}{x_0}$ (a kezdeti bázisértékhez viszonyított arány, százalékban kifejezve).

- **Százalék és százalékpont:**
  - Százalékban megadott ráták (pl. banki kamat, infláció, munkanélküliségi arány) megváltozásakor a különbség **százalékpont** (sz.p.).
  - Példa: 4%-ról 5%-ra növekedés esetén a változás $+1$ százalékpont, de $+25\%$ relatív emelkedés ($\frac{1}{4} = 0,25$).

- **Bázis-eltolódási csapda (Aszimmetria):**
  - Ha egy értéket először $+p\%$-kal növelünk, majd a megemelt értéket $-p\%$-kal csökkentünk, a végeredmény mindig kisebb lesz az eredetinél:
    $$(1 + \frac{p}{100})(1 - \frac{p}{100}) = 1 - \frac{p^2}{10000} < 1$$

- **Dinamikus viszonyszámok:**
  - **Bázisviszonyszám ($B_i$):** Egy rögzített időpont (bázis) adatához viszonyított hányados: $B_i = \frac{x_i}{x_0}$.
  - **Láncviszonyszám ($L_i$):** A közvetlenül megelőző időszak adatához viszonyított arány: $L_i = \frac{x_i}{x_{i-1}}$.
  - **A viszonyszámok szorzatának tétele:** A láncviszonyszámok szorzata megadja a periódus bázisviszonyszámát:
    $$B_n = L_1 \cdot L_2 \cdots L_n$$
  - **Átlagos évi növekedési ütem:** A láncviszonyszámok mértani közepe:
    $$\bar{L} = \sqrt[n]{B_n} = \sqrt[n]{L_1 \cdot L_2 \cdots L_n}$$

---

## Elkészült Komponensek

1. **`ChangesFigures.tsx`:**
   - `AbsoluteVsRelativeSvg`: Abszolút vs. relatív skálázás és növekmény diagram.
   - `PercentVsPercentagePointSvg`: 4% → 5% kamatváltozás: +1 sz.p. vs. +25% relatív.
   - `BaseChainIndexSvg`: Lánc- és bázishálózat vizualizáció teleszkopikus szorzással.
   - `CarDepreciationChainSvg`: Autó értékvesztési lánc (-20%, -15%).

2. **`ChangesTheory.tsx`:**
   - Kiemelt **Fontos szabályok & Memóriapanel** 5 aranyszabállyal a tananyag elején.
   - Fejlécben `quickRule` azonnali összefoglaló kártya.
   - Interaktív Változás és Bázis-eltolódás kalkulátor labor (kerékpártúra, amortizáció, infláció prezetekkel).
   - 5 részletes elméleti szekció valós mintapéldákkal és típuscsapdákkal.

3. **`ChangesMatcher.tsx`:**
   - 3 szint × 8 kártyapár (24 párosítás): Fogalmak és formulák, Számítások és százalékpont, Gazdasági dinamika és viszonyszámok.

4. **`ChangesSorter.tsx`:**
   - 3 szint rendezési feladat (Növekmények és szorzók sorrendje, Gazdasági folyamatok és bázisok sorrendje, Viszonyszámok és átlagos ütemek sorrendje).

5. **`ChangesQuiz.tsx`:**
   - 3 szint × 10 kérdés = 30 kérdés részletes magyarázatokkal, tippekkel, puskakártyákkal és beépített párosító/rendező móddal.
