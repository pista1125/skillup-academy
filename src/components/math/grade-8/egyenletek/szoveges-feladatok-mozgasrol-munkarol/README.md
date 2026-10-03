# 4. Szöveges feladatok mozgásról, munkáról (8. osztály)

## Modul Áttekintés
Ez a modul a 8. osztályos III. Egyenletek témakör **4. altémáját** valósítja meg: egyenletes mozgás matematikai leírása ($s = v \cdot t$), találkozásos és utoléréses feladatok, folyóvízi sodrás és szembeszél, valamint az együttes munkavégzés és tartálytöltés reciprok modellje.

---

## Modul Komponensei

1. **`MotionWorkProblemsTheory.tsx`**: Részletes tananyag `TheoryTemplate` sablonnal.
   - **Témák**:
     1. Az Egyenletes Mozgás Matematikai Modellje ($s = v \cdot t$, $v = s / t$, $t = s / v$, mértékegységek és percek órára váltása).
     2. Találkozási Feladatok: Egymással szembe haladó mozgások ($s_1 + s_2 = s_{\text{összes}} \implies (v_1 + v_2) \cdot t = s$).
     3. Utolérési Feladatok: Egyirányú haladás, előny ledolgozása ($v_{\text{gyors}} \cdot t - v_{\text{lassú}} \cdot t = s_0$).
     4. Folyóvízi Mozgások és Szembeszél ($v_{\text{le}} = v_s + v_f$, $v_{\text{fel}} = v_s - v_f$).
     5. Együttes Munkavégzés és Tartálytöltés (Reciprok szabály: $\frac{1}{t_1} + \frac{1}{t_2} = \frac{1}{t_{\text{együtt}}}$, lefolyó csap kezelése).
     6. **Interaktív Mozgás és Munka Labor Szimulátor** (az elméleti szekciók után elhelyezve):
        - 1. Fül: Mozgás Labor (Találkozás és utolérés szimulációja állítható sebességekkel és távolsággal, vizuális útszakasszal és pontos találkozási idővel/ponttal).
        - 2. Fül: Munka & Medence Labor (Két csap/munkás egyéni idejének állítása, opcionális lefolyó csappal, valós idejű közös munkaidővel).
     7. Részletesen Kidolgozott Mintapéldák a Tankönyvből (eltérő indulású autók, kerékpáros utoléri a gyalogost, két csap feltölt egy medencét).
     8. Gyakori Csapdahelyzetek és Típustévesztések (`TheoryTrapBox`: oda-vissza út átlagsebessége harmonikus átlaggal, percek tizedesórára váltása, munkaidők összeadásának tilalma).
     9. Szöveges Ellenőrzés és Mértékegység Egyeztetés (km/h és óra, m/s és másodperc).

2. **`MotionWorkProblemsQuiz.tsx`**: 30 kérdéses adaptív kvíz `QuizTemplate` sablonnal.
   - **6 CheatSheet kártya** SVG illusztrációkkal (Egyenletes mozgás, Találkozás, Utolérés, Folyóvíz, Együttes munka, Medencetöltő és ürítő csap).
   - **3 Nehézségi szint** (10-10 kérdés szintenként):
     - **1. Szint**: Alapfogalmak és mértékegységek ($s = v \cdot t$ alapszámítások, percek és órák átváltása, m/s és km/h, szimmetrikus találkozás, egyéni munkarész).
     - **2. Szint**: Találkozás, utolérés és medence (szembehaladás eltérő indulással, utolérés előnnyel, folyóvíz, két csap együttes munkája).
     - **3. Szint**: Összetett és versenyfeladatok (harmonikus átlagsebesség, utolérés pihenővel, vonatok előzése, kieső munkások és páros csapok).
   - **Beágyazott Játékmódok**:
     - Matcher (Párosító kártyajáték)
     - Sorter (Csoportosító játék)

3. **`MotionWorkProblemsMatcher.tsx`**: Interaktív kártyapárosító játék `MatcherTemplate` alapon.
   - 3 szint $\times$ 10 pár (Alapképletek és átváltások, Mozgásos és munkamodellek, Feladatok és pontos eredmények).

4. **`MotionWorkProblemsSorter.tsx`**: Csoportosító gyakorló játék `SorterTemplate` alapon.
   - 3 szint $\times$ 12 elem (Mozgástípusok és munkavégzés, Matematikai modellek, Konkrét algebrai egyenletek).

---

## Integráció
- `Grade8View.tsx`: A 4. szekcióban kizárólag **2 kártya** szerepel:
  1. `Mozgás és Munka Tananyag` (`g8-eq-motion-work-theory`)
  2. `Gyakorló Kvíz` (`g8-eq-motion-work`)
- `MathPage.tsx`: Lazy betöltés, kétirányú oda-vissza navigáció Tananyag és Kvíz között.
