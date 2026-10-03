# 2. Szöveges feladatok számokról, életkorokról (8. osztály)

Ebben a modulban a 8. osztályos matematika tankönyv (**OH-MAT08TA**) III. fejezetének (Egyenletek) második altémája található: számelméleti és életkori szöveges feladatok modellezése, egyenletté alakítása és megoldása.

---

## 📦 Modul Komponensek

1. **`NumbersAgesTheory.tsx`**: Interaktív tananyag `TheoryTemplate` sablonnal.
   - Vizuális Kísérleti Műhely:
     - **Életkori Időgép Labor**: Anya és gyermeke életkorának dinamikus vizsgálata múltban, jelenben és jövőben csúszkával, kimutatva a korkülönbség állandóságát és a többszörösök megjelenését.
     - **Kétjegyű Szám Labor**: Számjegyek ($a, b$) interaktív állítása, helyiértékes kifejtés ($10a+b$), felcserélt jegyű szám ($10b+a$), a 9-es oszthatóságú különbség és a 11-es oszthatóságú összeg demonstrációja.
   - 5 lépéses mester-algoritmus a szöveges modellezéshez.
   - Számelméleti fogalomtár ($n, n+1$, páros/páratlan sorozatok, arányos felosztás, maradékos osztás).
   - Kidolgozott tankönyvi és felvételi mintapéldák részletes lépésekkel és szöveges ellenőrzéssel.
   - Tipikus csapdák és tévhitek (`TheoryTrapBox`).

2. **`NumbersAgesQuiz.tsx`**: 30 kérdéses adaptív kvíz `QuizTemplate` sablonnal.
   - **1. Szint: Alapfogalmak és Szöveges Átírás** (10 feladat): Gondolt számok, arányok, egymást követő számok.
   - **2. Szint: Kétjegyű Számok és Összetett Életkorok** (10 feladat): Helyiérték ($10a+b$), számjegycsere, 9-es törvény, táblázatos életkori egyenletek.
   - **3. Szint: Felvételi Típusú és Nehezebb Szöveges Feladatok** (10 feladat): Központi felvételi típusok, háromjegyű számok, törtrészek, összetett logikai relációk.
   - 6 interaktív SVG képlettár kártya (CheatSheet).
   - Beépített egyéni játékmódok (Párosító és Csoportosító).

3. **`NumbersAgesMatcher.tsx`**: Interaktív kártyapárosító játék `MatcherTemplate` alapon.
   - 3 szint, szintenként 10-10 pár (összesen 30 pár) hanghatásokkal, időméréssel, ranglistával és animációkkal.

4. **`NumbersAgesSorter.tsx`**: Csoportosító gyakorló játék `SorterTemplate` alapon.
   - 3 szint, szintenként 12 elem 3 pedagógiai kategóriába rendezve (összesen 36 elem).

---

## 🧠 Fő Matematikai Összefüggések

### 1. Helyiértékes Felírás:
Egy kétjegyű szám, melynek tízes helyiértékén $a$, egyes helyiértékén $b$ áll ($a \in \{1,\dots,9\}, b \in \{0,\dots,9\}$):
$$\overline{ab} = 10a + b$$
- Számjegyek felcserélése után: $\overline{ba} = 10b + a$
- Különbségük: $(10a + b) - (10b + a) = 9(a - b)$ $\implies$ **mindig 9-cel osztható!**
- Összegük: $(10a + b) + (10b + a) = 11(a + b)$ $\implies$ **mindig 11-gyel osztható!**

### 2. Egymást Követő Számok:
- Egész számok: $n, n+1, n+2, \dots$
- Páros számok: $2k, 2k+2, 2k+4, \dots$
- Páratlan számok: $2k+1, 2k+3, 2k+5, \dots$

### 3. Életkori Aranyszabály:
Két ember életkorának **különbsége az évek során SOHA nem változik**:
$$K_A(t) - K_B(t) = (A + t) - (B + t) = A - B = \text{konstans}$$
Az életkori feladatoknál mindig 3 oszlopos táblázatot használunk: **Múlt ($-k$) | Jelen | Jövő ($+m$)**.
