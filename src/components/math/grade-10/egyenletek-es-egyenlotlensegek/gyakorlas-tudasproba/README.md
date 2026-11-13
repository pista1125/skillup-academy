# 10. Gyakorlás, fejezeti tudáspróba (66. lecke)

## Tananyag Áttekintés
A *VIII. Egyenletek és egyenlőtlenségek* fejezet teljes körű szintézise és témazáró tudáspróbája a magyar nemzeti alaptanterv (NAT) és az érettségi követelményrendszer alapján:
- **Ekvivalens és nem ekvivalens átalakítások:** Mérlegelv határai, gyökvesztés és hamis gyökök megelőzése.
- **Gyökös (irracionális) egyenletek:** Értelmezési tartomány, kétoldali feltételek, kötelező ellenőrzés.
- **Másodfokú és törtes egyenlőtlenségek:** Parabola-vázlat és előjeltáblázat készítése, nyílt és zárt határok szabatos kezelése.
- **A polinom gyöktényezős alakja és a Viète-formulák:** Szorzattá alakítás, törtek egyszerűsítése, szimmetrikus kifejezések.
- **Másodfokú egyenletrendszerek:** Behelyettesítő módszer, szimmetrikus rendszerek és geometriai metszéspontok.
- **Érettségi javítókulcs:** Részpontszámok, kötelező indoklások és pontmentő stratégiák.

---

## Modul Komponensek

1. **Vizuális elemek (`PracticeExamFigures.tsx`)**:
   - `SynthesisConceptMapSvg`: A fejezet átfogó fogalmi térképe.
   - `ExamChecklistTreeSvg`: Érettségi döntési és ellenőrző fa.
   - `InequalityRegionsSvg`: Egyenlőtlenségek parabola-előjelei és számegyenes intervallumai.
   - `NonlinearSystemsIntersectionSvg`: Kör és egyenes metszéspontjai a síkon.
   - `GradingRubricTrophySvg`: Érettségi javítókulcs és maximális 10 pontos modell.

2. **Tananyag (`PracticeExamTheory.tsx`)**:
   - Jobb felső `quickRule` blokk: **FONTOS SZABÁLYOK** a fejezeti tudáspróbára.
   - 1. Ekvivalens átalakítások és gyökös egyenletek szintézise.
   - 2. Másodfokú és törtes egyenlőtlenségek megoldási sémája.
   - 3. Polinom gyöktényezős alakja és a Viète-formulák.
   - 4. Másodfokú egyenletrendszerek és geometriai metszéspontok.
   - 5. Érettségi javítókulcs és pontmentő stratégiák.
   - 6. **Interaktív Fejezeti Tudáspróba Laboratórium** (Univerzális másodfokú kifejezés és egyenlőtlenség vizsgáló a lecke végén).

3. **Párosító játék (`PracticeExamMatcher.tsx`)**:
   - 3 nehézségi szint $\times$ 8 kártyapár (24 egyedi feladványpár).
   - 1. Szint: Fejezeti alapok és gyökök.
   - 2. Szint: Egyenlőtlenségek, gyöktényezők és rendszerek.
   - 3. Szint: Érettségi és emelt szintű szintézis.

4. **Rendszerező játék (`PracticeExamSorter.tsx`)**:
   - 3 nehézségi szint $\times$ 3 kategória (9-9 kártya szintenként).
   - 1. Szint: Feladványok matematikai típusa (Másodfokú egyenlet, Gyökös egyenlet, Egyenlőtlenség).
   - 2. Szint: Valós megoldások száma (2 megoldás, 1 megoldás, 0 megoldás).
   - 3. Szint: Érettségi feladatok elméleti fókusza (Értelmezési tartomány, Viète & szimmetria, Geometria).

5. **Kvíz (`PracticeExamQuiz.tsx`)**:
   - **90 válogatott feladat 3 szinten (szintenként 30 kérdés!)**:
     - 1. Szint (1–30. kérdés): Fejezeti alapok és gyorsfeladványok.
     - 2. Szint (31–60. kérdés): Középszintű érettségi feladattípusok.
     - 3. Szint (61–90. kérdés): Emelt szintű szintézis és mesterfeladatok.
   - Puskákkal, tippekkel, részletes levezetésekkel és beépített játékmód-váltóval.
