# 1. Egybevágó háromszögek, szerkesztések (7. osztály)

Ebben a modulban találhatók a 7. osztályos matematika tankönyv (**OH-MAT07TA**) VII. Geometria fejezetének első leckéjéhez tartozó digitális tananyagok és interaktív feladatok.

---

## 📁 Elkészült Komponensek

1. **[TriangleCongruenceTheory.tsx](./TriangleCongruenceTheory.tsx)**
   - 📖 Részletes interaktív elméleti tananyag
   - Az egybevágóság fogalma és geometriai tulajdonságai
   - A 4 alapeset ($o-o-o, o-sz-o, sz-o-sz, o-o-sz$) részletes SVG ábrái és magyarázata
   - Interaktív alapeset-bemutató stúdió
   - Miért NEM egybevágósági eset a $sz-sz-sz$ ($AAA$) és a kisebb oldallal szemközti szög?
   - A szerkesztés 4 kötelező lépése (Vázlat, Terv, Kivitelezés, Diszkusszió)
   - Lépésről lépésre körzős és vonalzós szerkesztési ábra segédkörívekkel
   - Összefoglaló táblázat és tipikus csapdahelyzetek
   - PDF exportálási lehetőség

2. **[TriangleCongruenceQuiz.tsx](./TriangleCongruenceQuiz.tsx)**
   - 🎯 3 szintű, szintenként 10 kérdésből álló kvíz (összesen 30 feladat)
   - Kérdéskártyákba ágyazott SVG geometriai ábrákkal
   - Wordwall játékmód-választó menü (Kvíz, Párosító, Csoportosító)
   - Képlettár és puskakártyák ábrákkal
   - Pontszámítás, kombó-szorzó és Web Audio hangeffektek
   - Teljesítmény és csillagok automatikus mentése

3. **[TriangleCongruenceMatcher.tsx](./TriangleCongruenceMatcher.tsx)**
   - 🔄 3 szintű párosító kártyajáték (szintenként 8 pár = 24 pár)
   - Alapesetek megnevezése, ábrája, adatai és szerkesztési lépései
   - Beépített SVG ábrák a kártyákon
   - 3 életes / szíves rendszer, stopperóra és ranglista

4. **[TriangleCongruenceSorter.tsx](./TriangleCongruenceSorter.tsx)**
   - 📊 3 szintű csoportosító feladat
   - 1. szint: Valódi alapeset vs. NEM egybevágósági eset (csapda)
   - 2. szint: Melyik eset alapján egybevágóak? ($o-o-o, o-sz-o, sz-o-sz, o-o-sz$)
   - 3. szint: A szerkesztés fázisai (Vázlat & Terv, Kivitelezés, Diszkusszió)
   - SVG ikonok az elemkártyákon és a besorolt kategóriákban
   - 3 élet, kombó-rendszer és ranglista

---

## 📐 Főbb Tananyagtartalom

### 1. A Háromszögek Egybevágóságának 4 Alapesete:
- **$o-o-o$ ($SSS$):** Három oldal páronként egyenlő ($a = a', b = b', c = c'$).
- **$o-sz-o$ ($SAS$):** Két oldal és a **közbezárt szög** páronként egyenlő ($a = a', b = b', \gamma = \gamma'$).
- **$sz-o-sz$ ($ASA$):** Egy oldal és a **rajta fekvő két szög** páronként egyenlő ($c = c', \alpha = \alpha', \beta = \beta'$).
- **$o-o-sz$ ($SsA$):** Két oldal és a **nagyobbik oldallal szemközti szög** páronként egyenlő ($a = a', b = b', \alpha = \alpha'$, ahol $a \ge b$).

### 2. Miért NEM alapeset a $sz-sz-sz$ ($AAA$)?
- Három szög egyenlősége csak a háromszög alakját (arányait) határozza meg, a méretét nem $\rightarrow$ ez a **hasonlóság** esete, nem az egybevágóságé!

### 3. A Szerkesztés 4 Lépése:
1. **Vázlat:** Szabadkézi rajz, adott adatok színessel való kihúzása.
2. **Terv:** A szerkesztési lépések logikai sorrendjének leírása.
3. **Kivitelezés:** Pontos szerkesztés körzővel és vonalzóval, a segédkörívek megtartásával.
4. **Diszkusszió:** Megoldások számának és a feltételeknek (háromszög-egyenlőtlenség, szögösszeg) a vizsgálata.
