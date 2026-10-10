# 5. A százalékszámítás gyakorlása (7. osztály)

## Tananyag Áttekintés
A három alapfeladat típus (százalékérték, alap, százalékláb) gyors felismerése szöveges feladatokban, az ÁFA (Általános Forgalmi Adó) és bruttó/nettó árak kalkulációja, a százalékos alapváltási csapda (teve fogyása és visszahízása), egymást követő árváltozások (palacsintázó dilemmája, leárazások) és halmazos szöveges feladatok.

---

## Moduláris Felépítés

1. **PracticeTheory.tsx**:
   - Részletes elmélet mind a 3 alaptípus gyorskeresőjével.
   - **Interaktív ÁFA és Árképzés Szimulátor:** 5%, 18% és 27%-os törvényi kulcsok, kétirányú kalkuláció (Nettóból bruttó és Bruttóból nettó) vizuális aránysávval és képletekkel.
   - **Interaktív Teve Súlyváltozás és Alapváltási Vizualizáció:** A 40%-os fogyás után miért 66,7%-os hízás szükséges az eredeti súlyhoz.
   - Halmazos százalékszámítás (méz és mazsola, Lázár varázslatai).
   - Egymást követő változások (+20% vs. kétszer +10% palacsintázó).
   - Geometriai és láncolt százalékszámítás (négyzet területe és oldala).

2. **PracticeQuiz.tsx**:
   - 30 kérdés 3 nehézségi szinten (10 Könnyű, 10 Közepes, 10 Nehéz).
   - 4 infókártya (SVG ábrákkal kísért összefoglalók).
   - Beépített módváltó (Kvíz, Párkereső, Csoportosító, Elmélet).

3. **PracticeMatcher.tsx**:
   - 3 nehézségi szint, szintenként 8 pár (összesen 24 pár).
   - 1. szint: Alapesetek és ÁFA fejszámolás.
   - 2. szint: Szöveges árváltozások és alapváltások.
   - 3. szint: Halmazok, láncolt százalékok és geometria.

4. **PracticeSorter.tsx**:
   - 3 szint, szintenként 3 kategória × 4 kártya (összesen 36 elem).
   - 1. szint: A három alaptípus azonosítása (Érték, Alap, Százalékláb).
   - 2. szint: ÁFA kulcsok és árképzési kategóriák (5%, 18%, 27%).
   - 3. szint: A változások végeredménye az eredetihez képest (Kisebb, Egyenlő, Nagyobb).

---

## Főbb Szabályok és Képletek

- **Bruttó ár:** $\text{Bruttó} = \text{Nettó} \cdot (1 + \text{ÁFA} / 100)$
- **Nettó ár:** $\text{Nettó} = \frac{\text{Bruttó}}{1 + \text{ÁFA} / 100}$
- **Alapváltás szabálya:** A csökkentett érték az új 100%, így a visszanövekedés százaléka mindig nagyobb, mint az előzetes csökkenésé.
- **Halmazok metszete:** $\text{Metszet \%} = A\% + B\% - 100\%$
