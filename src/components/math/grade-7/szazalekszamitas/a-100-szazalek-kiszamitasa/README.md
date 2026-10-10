# 3. A 100% kiszámítása (Százalékalap meghatározása) (7. osztály, V. témakör)

## Áttekintés
A százalékalap ($A$) meghatározása (a 100% visszaszámolása), ha a százalékérték ($É$) és a százalékláb ($p\%$) ismert. Kiszámítási stratégiák (következtetés 1%-kal, osztás tizedestörttel), valamint a megemelt ($100\% + p\%$) és csökkentett ($100\% - p\%$) árakból való helyes visszafejtés mindennapi és gazdasági helyzetekben (OFI/OH Tankönyv pp. 141–142, Munkafüzet pp. 86–87).

---

## Modul Komponensei
1. **CalculateHundredTheory.tsx**:
   - Interaktív 100% Visszafejtő Szimulátor (százalékérték és százalékláb csúszkák, 1% köztes lépés és teljességi aránysáv).
   - Visszaszámolás Drágulásból és Akcióból (Autó +20% ➔ 120%, Számítógép -20% ➔ 80% szimuláció).
   - Tankönyvi részletes példák: 84 zeneis diák (12%), 40 sportoló (32%), napelemes tetőfelület (30%), 7500 € házfoglaló (10%).
   - Típushibák és vizsgacsapdák: a megemelt árból való 20%-os levonás tilalma, maradék százalék azonosítása (Albert 72 szava = 60%).

2. **CalculateHundredQuiz.tsx**:
   - 30 kérdés 3 nehézségi szinten (10 Könnyű, 10 Közepes, 10 Nehéz).
   - Részletes magyarázatok és tankönyvi/munkafüzeti levezetések minden feladathoz.
   - 4 SVG puskakártya: Következtetés 1%-kal, Képlet és tizedes osztás, Visszaszámolás drágulásból, Visszaszámolás akcióból.
   - Integrált fülváltó a kvíz, a játékok és az elmélet között.

3. **CalculateHundredMatcher.tsx**:
   - 3 szintű párkereső játék (24 pár):
     - 1. szint: Alapvető 100% visszaszámolások (1% = 29 ➔ 2900, 20% = 40 ➔ 200, stb.).
     - 2. szint: Szöveges iskolai és mindennapi alapok (84 zenetanuló ➔ 700, 72 perc ➔ 180 perc, stb.).
     - 3. szint: Áremelés, akció és összetett visszaszámítás (Autó ➔ 3 800 000 Ft, Számítógép ➔ 245 000 Ft, stb.).

4. **CalculateHundredSorter.tsx**:
   - 3 szintű csoportosító játék (3 kategória × 4 elem = 12 elem szintenként):
     - 1. szint: Az alap és a részérték viszonya (Alap > Érték, Alap = Érték, Alap < Érték).
     - 2. szint: Százalékarány azonosítása szövegből (Közvetlen rész, Drágulás, Kedvezmény/maradék).
     - 3. szint: Visszaszámítási műveletstratégiák (Osztás közvetlen tizedessel, emelt értékkel, csökkentett értékkel).

---

## Főbb Tanulási Célok
- Megérteni, hogy a 100% (az alap) a teljes kiinduló egész, és meghatározható az $1\%$ kiszámításával: $A = (É : p) \cdot 100$.
- Készségszinten alkalmazni a tizedestörtes osztást: $A = É : 0{,}0p$.
- Magabiztosan kezelni az áremelés és akció utáni visszafejtést anélkül, hogy az új árból vonnánk le hibásan a százalékot.
