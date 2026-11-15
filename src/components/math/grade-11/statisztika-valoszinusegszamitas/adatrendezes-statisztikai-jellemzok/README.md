# 1. Adatrendezés – statisztikai jellemzők (tankönyv 53. lecke, 160–161. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 160–161. oldal) alapján kidolgozott oktatási modul. A diákzónában az V. fejezet (Statisztika és valószínűségszámítás) 1. leckéje.

---

## 🎯 Tananyag Áttekintés

**Bevezető (tűzoltók):** 31 nap riasztásai (0: 1 nap, 1: 11, 2: 6, 4: 8, 6: 4, 14: 1 nap). Átlag 93 : 31 = 3 (a kiugró 14 nélkül 79 : 30 ≈ 2,63), medián 2 (a 16. adat), módusz 1. Mindhárom tűzoltónak igaza van – más-más középértékre gondoltak.

**Elmélet:** egy véges számsokaság legfőbb jellemzői: **átlag** (összeg : darabszám), **módusz** (leggyakoribb adat, lehet több is), **medián** (a rendezett sor középső eleme, páros elemszámnál a két középső átlaga), **minimum**, **maximum**, **terjedelem** (maximum − minimum). Az átlag, módusz és medián a **középértékek**.

### Feladatok (node-dal ellenőrizve)
- **1.** Osztálylétszámok (A–D gimnázium, E–G szakiskola): évfolyamátlagok 9.: 33; 10.: ≈ 29,29; 11.: 27; 12.: 30,25. K = 518 : 16 = 32,375; L = 228 : 9 ≈ 25,33; (16K + 9L) : 25 = 746 : 25 = 29,84 – a 25 osztály átlagos létszáma.
- **2.** A 25 létszám: módusz 36, medián 31, minimum 12, maximum 38, terjedelem 26.
- **3.** 32, 18, 20, 18, 20, 24, 15, 18, 55, 10: átlag 23, módusz 18, medián 19. b) pl. 18; 18; 19; 80; 95. c) pl. 15; 15; 19; 30; 36.
- **4. (érettségi, 2017)** 1; 1; 1; 1; 2; 2; 2; 3; 3.
- **5. (érettségi, 2021)** Balaton-átúszás: 0,36 · 35 + 0,64 · 38 = **36,92 év**.
- **HF 1.** Jegyek 2: 9, 3: 8, 4: 6, 5: 5 (28 dolgozat): terjedelem 3, módusz 2, medián 3, átlag 3,25; relatív gyakoriságok 32,1%, 28,6%, 21,4%, 17,9%.
- **HF 2.** 25 dolgozat, átlag 3,16 ⇒ összeg 79; csak 3-as és 4-es: 21 + 4 darab – lehetséges.
- **HF 3.** Bence lázmérései (átlag 36,8 °C, összeg 184): mind a négy eset elképzelhető (példák a tananyagban).

> **⚠️ CSAPDA:** a mediánt a nagyság szerint rendezett sorból keressük, nem a felsorolásból (22 helyett 19). Terjedelemnél a ténylegesen előforduló adatokat nézzük (1-es nem volt ⇒ 5 − 2 = 3).

> Megjegyzés: a HF 2. b)–d) nyitott feladatok, ezeket a modul nem dolgozza fel egyenként.

---

## 💻 Elkészített Komponensek

1. **`DataStatisticsFigures.tsx`** (újrahasznosítható `MiniBarChart` oszlopdiagram és `DotStrip` pontdiagram komponensekkel):
   - `DataStatsFireAlarmSvg`: a riasztások gyakorisági oszlopdiagramja, kiemelt módusszal.
   - `DataStatsClassSizeChartSvg`: az évfolyamok átlagos osztálylétszáma (1. b).
   - `DataStatsMeasuresSvg`: a 3. feladat adatai pontdiagramon minimum, medián, átlag, maximum jelöléssel.
   - `DataStatsGradesSvg`: a dolgozatjegyek gyakorisága és relatív gyakorisága (HF 1.).
   - `DataStatsWeightedMeanSvg`: súlyozott átlag a Balaton-átúszás adataival.
2. **`DataStatisticsTheory.tsx`**: bevezető, elméleti táblázat, kidolgozott feladatok és házi feladatok, csapda.
   - **I. Laboratórium:** számsokaság-elemző – tetszőleges adatsor rendezése, átlag, medián, módusz(ok), minimum, maximum, terjedelem, pontdiagram átlag- és mediánjelöléssel.
   - **II. Laboratórium:** osztályzatok gyakorisága csúszkákkal – élő oszlopdiagram, relatív gyakoriságok, átlag, medián, módusz, terjedelem.
3. **`DataStatisticsMatcher.tsx`**: 3 szint × 8 pár (fogalom ↔ jelentés; adatsor ↔ medián; adatsor ↔ átlag).
4. **`DataStatisticsSorter.tsx`**: 3 szint × 3 kategória (átlag / medián / módusz; átlag és medián viszonya; mi változik az adatok módosításakor).
5. **`DataStatisticsQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), kérdéstípus-címkékkel, 21 diagramos/táblázatos kérdéssel, 3 puskakártyával (progress id: `g11-stat-adatrendezes-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic5DataStatistics.test.tsx` fájlban található, a 4 komponenst és mind az 5 ábrát ellenőrzi.
