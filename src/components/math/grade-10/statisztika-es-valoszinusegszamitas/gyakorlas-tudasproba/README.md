# Gyakorlás, tudáspróba (10. osztály – Statisztika és valószínűségszámítás)

A teljes fejezet átfogó szintézise, reprezentatív kompetenciamérési és érettségi típusfeladatokkal.

## Tartalom
- **Elmélet & Szabálytár (`ChapterSynthesisTheory.tsx`)**:
  - Kiemelt "Fontos szabályok & Memóriapanel" 5 aranyszabállyal a tananyag legelején.
  - Gyorsszabály (`quickRule`) a fejlécben.
  - Interaktív Tudáspróba Laboratórium:
    - 1. Jánosék almaárusítása a piacon (Kompetenciamérés 2016): napi bevételek, heti összbevétel és napi átlagos bevétel.
    - 2. 30 fős osztály matematika érettségi jegyei (Érettségi 2017): interaktív jegyeloszlás, átlag (3,20), medián (3), módusz (3).
    - 3. Kétkockás kétjegyű számok eseménytere (Érettségi 2009): 36 eset, négyzetszámok (4/36 = 1/9), azonos jegyek (6/36 = 1/6), összeg ≤ 9 (30/36 = 5/6).
  - 5 részletes elméleti szekció matematikai levezetésekkel:
    1. Középértékek szintézise: számtani és mértani közép ($A \ge G$).
    2. Helyzeti és szóródási mutatók: medián, módusz, terjedelem, szórás.
    3. Változások mértéke és osztályba sorolás.
    4. A valószínűség alapjai és a klasszikus Laplace-modell.
    5. Érettségi és kompetenciamérési mesterfeladatok (két iskola versenye, kamarakórus, zoknihúzás, Peti fényképei).
- **Gyakorló Kvíz (`ChapterSynthesisQuiz.tsx`)**:
  - **90 kérdéses nagy tudáspróba** (3 szint × 30 kérdés):
    - 1. szint: 30 kérdés – Statisztikai alapmutatók és Laplace-alapok.
    - 2. szint: 30 kérdés – Súlyozott mutatók, diagramok és összetett események.
    - 3. szint: 30 kérdés – Érettségi és emelt szintű szintetizáló feladatok.
  - 3 db képlettár kártya (`cheatSheetCards`).
- **Párosító játék (`ChapterSynthesisMatcher.tsx`)**: 3 szint × 8 pár = 24 pár.
- **Sorrendező játék (`ChapterSynthesisSorter.tsx`)**: 3 szint növekvő sorrendezési feladatokkal.
- **Ábrák (`ChapterSynthesisFigures.tsx`)**:
  - `StatisticsProbabilityOverviewMapSvg`: A fejezet átfogó fogalmi térképe.
  - `AppleMarketWeightedAverageSvg`: Jánosék almái és a súlyozott átlag struktúrája.
  - `MathExamGradeDistributionSvg`: A 30 fős osztály matematika érettségi jegyeinek oszlopdiagramja.
