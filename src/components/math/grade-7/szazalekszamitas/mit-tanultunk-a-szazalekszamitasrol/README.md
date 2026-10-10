# 2. Mit tanultunk a százalékszámításról? (7. osztály, V. témakör)

## Áttekintés
A százalék és ezrelék matematikai fogalma, átváltások tört, tizedes tört és százalék között, a százalékszámítás három alapfogalma (Alap, Százalékláb, Százalékérték), a százalékérték kiszámításának 3 stratégiája (következtetés 1%-kal, tört alakban szorzás, tizedes szorzótényező), árengedmények, áremelések, keverékek és a hibás dolgozatok javítása (OFI/OH Tankönyv pp. 138–140, Munkafüzet pp. 84–86).

---

## Modul Komponensei
1. **PercentReviewTheory.tsx**:
   - Interaktív Százalékérték Szemléltető (alap és százalékláb csúszkák, arányos sávdiagram, és a 3 számítási mód dinamikus összevetése).
   - Interaktív Árengedmény & Növekedés Szimulátor (3400 Ft-os könyv leárazása, szorzótényezős szemlélet).
   - Digi testsúlya és az egymást követő százalékos változások (százalékok nem adódnak össze!).
   - Keverékek százalékszámítása (2 l 25% és 3 l 40% narancslé) és halmazos metszetek (sulibuli feladat).
   - Munkafüzeti tipikus hibák és vizsgacsapdák (Péter és Paula dolgozatai: engedmény vs. új ár, hibás mértékegység-váltás négyzetre emeléskor).

2. **PercentReviewQuiz.tsx**:
   - 30 kérdés 3 nehézségi szinten (10 Könnyű, 10 Közepes, 10 Nehéz).
   - Részletes magyarázatok és tankönyvi/munkafüzeti levezetések minden feladathoz.
   - Puskakártyák (Százalék & ezrelék alapfogalmak, Gyakori tört-százalék párok, Árengedmény és áremelés szorzói, Keverékek és egymást követő változások).
   - Integrált navigáció a kvíz, a párkereső és csoportosító játékok, valamint az elmélet között.

3. **PercentReviewMatcher.tsx**:
   - 3 szintű párosító játék (összesen 24 pár):
     - 1. szint: Törtek, tizedesek és százalékok egyenlőségei (fejszámolási alapok).
     - 2. szint: Százalékértékek kiszámítása (650 40%-a, 150 g 24%-a, 25 kg 40%-a, stb.).
     - 3. szint: Kedvezmények, keverékek és összetett feladatok eredményei.

4. **PercentReviewSorter.tsx**:
   - 3 szintű csoportosító / rendező játék (3 kategória × 4 elem = 12 elem szintenként):
     - 1. szint: Százalék nagysága az egészhez képest (< 100%, = 100%, > 100%).
     - 2. szint: A három alapfogalom azonosítása szövegben (Alap, Százalékláb, Százalékérték).
     - 3. szint: Változások szorzótényezői (Csökkenés < 1, Változatlan = 1, Növekedés > 1).

---

## Főbb Tanulási Célok
- Megérteni, hogy $1\% = \frac{1}{100} = 0{,}01$ és $1‰ = \frac{1}{1000} = 0{,}001$.
- Biztonsággal kiszámítani a százalékértéket mindhárom módszerrel: $É = A \cdot \frac{p}{100} = A \cdot 0{,}0p = (A : 100) \cdot p$.
- Felismerni, hogy a kedvezmény mértéke levonandó az alapból, vagy közvetlenül az új ár szorzójával számolható ($100 - p)\%$.
- Elkerülni az egymást követő százalékok és a keverékek százalékos töménységének téves összeadását.
