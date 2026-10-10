# 4. Hány százalék? (Százalékláb keresése) (7. osztály, V. témakör)

## Áttekintés
A százalékláb ($p\%$) kiszámítása és értelmezése, ha az alap ($A$) és a százalékérték ($É$) ismert. Kétféle megoldási stratégia (törtrész tizedes alakká alakítása és 1% következtetés), kényelmes nevezők bővítése 100-ra, relatív áremelkedések és árcsökkenések, valamint az alapváltás törvényszerűsége (OFI/OH Tankönyv pp. 143–145, Munkafüzet pp. 87–88).

---

## Modul Komponensei
1. **WhatPercentTheory.tsx**:
   - Interaktív Százalékláb Számológép (részérték és alap csúszkák, telítettségi sávdiagram, és a 2 számítási út párhuzamos bemutatása).
   - Interaktív Alapváltási Szemléltető (A 2000 Ft ➔ 1600 Ft [-20%] vs. 1600 Ft ➔ 2000 Ft [+25%] paradoxon).
   - Tankönyvi részletes feladatok: 256 GB pendrive 192 GB foglalt tárhellyel (75%), emberi test víztartalma (70%), gépkocsi-statisztika (44%), lakás lealkudott ára (92%).
   - Típushibák és vizsgacsapdák: az alap felcserélése, mértékegységek egyeztetésének hiánya (20 perc a 30 másodpercnek = 4000%), hátralévő vs. megtett út.

2. **WhatPercentQuiz.tsx**:
   - 30 kérdés 3 nehézségi szinten (10 Könnyű, 10 Közepes, 10 Nehéz).
   - Részletes levezetések és tankönyvi/munkafüzeti magyarázatok minden kérdéshez.
   - 4 SVG puskakártya: Százalékláb alapképlete, Nevezők bővítése 100-ra, Változás százaléka (régi ár az alap!), Az alapváltási csapda.
   - Integrált fülváltó a kvíz, a párkereső és csoportosító játékok, valamint az elmélet között.

3. **WhatPercentMatcher.tsx**:
   - 3 szintű párkereső játék (24 pár):
     - 1. szint: Törtek és mennyiségek százaléka (24 a 48-nak ➔ 50%, 15 perc az 1 órának ➔ 25%, stb.).
     - 2. szint: Gyakorlati arányok és statisztikák (192 GB a 256 GB-nak ➔ 75%, 42 kg víz a 60 kg-nak ➔ 70%, stb.).
     - 3. szint: Százalékos változások és csalóka alapok (Lázár heti 5 ➔ 7 óra = +40%, 2000 Ft ➔ 1600 Ft = -20%, 1600 Ft ➔ 2000 Ft = +25%, stb.).

4. **WhatPercentSorter.tsx**:
   - 3 szintű csoportosító játék (3 kategória × 4 elem = 12 elem szintenként):
     - 1. szint: Százalékláb nagysága a 100%-hoz képest (< 100%, = 100%, > 100%).
     - 2. szint: Százalékos kérdés jellege (Közvetlen részarány, Csökkenés mértéke, Növekedés mértéke).
     - 3. szint: Mi a viszonyítási alap (Kezdőérték, Teljes kapacitás, Módosult/második érték).

---

## Főbb Tanulási Célok
- Megérteni, hogy a százalékláb a rész és az egész hányadosának 100-szorosa: $p\% = \frac{É}{A} \cdot 100\%$.
- Felismerni, hogy áremelésnél és árcsökkenésnél a különbséget mindig a KIINDULÓ (régi) értékhez viszonyítjuk.
- Elkerülni a mértékegységek figyelmen kívül hagyását és az alap felcserélését.
