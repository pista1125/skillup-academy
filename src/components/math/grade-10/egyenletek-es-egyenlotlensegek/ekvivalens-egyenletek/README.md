# 1. Ekvivalens egyenletek (60. lecke)

## Tananyag Áttekintés
Az egyenletmegoldási lépések algebrai és logikai megalapozása: ekvivalens (egyenértékű) átalakítások, a mérlegelv fizikai és matematikai modellje, valamint a gyökvesztést vagy hamis gyököket eredményező műveletek felismerése és megelőzése.

---

## Fő Fogalmak és Átalakítások

- **Ekvivalens átalakítások:**
  - Olyan átalakítások, amelyek nem változtatják meg az egyenlet alaphalmazán belüli megoldáshalmazát ($M_1 = M_2$).
  - Mindkét oldalhoz ugyanannak a valós számnak vagy kifejezésnek a hozzáadása / kivonása.
  - Mindkét oldal szorzása vagy osztása nullától különböző valós számmal ($c \neq 0$).
  - Azonos algebrai átalakítások az egyik oldalon (zárójelfelbontás, összevonás).

- **Nem ekvivalens lépések:**
  - **Hamis gyökök keletkezése:** Páros kitevőre emelés (négyzetre emelés), mindkét oldal szorzása ismeretlent tartalmazó kifejezéssel.
  - **Gyökvesztés veszélye:** Mindkét oldal osztása ismeretlent tartalmazó kifejezéssel (pl. osztás $x$-szel).
  - **Kizárt pontok törtes kifejezéseknél:** A nevező zérushelyei nem tartozhatnak a megoldáshalmazba.

- **Kikötések és ellenőrzés szerepe:**
  - Értelmezési tartomány (alaphalmaz) rögzítése a megoldás megkezdése előtt.
  - Nem ekvivalens lépések után az ellenőrzés az eredeti egyenletbe való behelyettesítéssel a bizonyítás elengedhetetlen része!

---

## Elkészült Komponensek és Források

A tananyag és a feladatok a hivatalos **OH-MAT10TA/II** tankönyv 60. leckéjének (76–77. oldal) és az **OH-SNE-MAT10M-2** munkafüzetnek a feldolgozásával készültek:

1. **`EquivalentEquationsFigures.tsx`**:
   - `BalanceScaleSvg`: Kétkarú mérleg modell az egyensúly és a mérlegelv szemléltetésére.
   - `ExtraneousRootsSvg`: Hamis gyökök keletkezése négyzetre emeléskor ($x = 3 \implies x^2 = 9 \implies \{-3; 3\}$).
   - `LostRootsSvg`: Gyökvesztés vizualizációja koordináta-rendszerben az $x$-szel való tiltott osztáskor ($x^2 = 4x$).
   - `DomainRestrictionSvg`: Tört nevezőjének kikötése és kizárt pont a számegyenesen.
   - `FlowchartStepSvg`: Ekvivalencia döntési folyamatábra.

2. **`EquivalentEquationsTheory.tsx`**:
   - Interaktív Kétkarú Mérleg Laboratórium dinamikus egyensúly- és műveletvizsgálóval.
   - Interaktív Lépéselemző & Buktató Detektor 6 forgatókönyvvel és matematikai indoklással.
   - 5 részletes elméleti fejezet definíciókkal, folyamatábrával, táblázatokkal, érettségi mintapéldákkal és csapdákkal.
   - PDF export (`grade10-equivalent-equations-theory`).

3. **`EquivalentEquationsMatcher.tsx`**:
   - 3 nehézségi szint × 8 pár = 24 összetartozó fogalom, egyenletpár és érettségi buktató.

4. **`EquivalentEquationsSorter.tsx`**:
   - 3 szintű csoportosító játék (Átalakítás típusa, Matematikai igazság vs. tévhit, Ekvivalencia alaphalmazonként).

5. **`EquivalentEquationsQuiz.tsx`**:
   - 3 nehézségi szint × 10 feladat = 30 válogatott, magyarázatokkal és tippekkel ellátott kérdés.
   - Beépített CheatSheet kártyák és Wordwall stílusú Párosító / Csoportosító játékmódok.
