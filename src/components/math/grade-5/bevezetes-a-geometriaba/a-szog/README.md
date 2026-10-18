# 4. A szög

Az 5. osztályos matematika tankönyv (**OH-MAT05TA**) harmadik fejezetének 4. leckéje: **A szög** (`g5-geom-angles`).

## Elkészült Komponensek
- **`AnglesTheory.tsx`**: 6 szekciós gazdag tananyag:
  1. A szög fogalma, alkotóelemei (szögcsúcs, szögszárak, tartományok) és jelölései ($\alpha$, $\angle AOB$, $\angle(a, b)$)
  2. Szögfajták nagyságuk szerint ($0^\circ$-tól $360^\circ$-ig) SVG illusztrációkkal és összefoglaló táblázattal
  3. Szögmérés és a szögmérő használata lépésről lépésre, a 3 aranyszabály és a skálaválasztás titka
  4. Szögek az óralapon: az óraköz ($30^\circ$) és a percköz ($6^\circ$) logikája, nevezetes óraállások
  5. Szögpárok és műveletek: pótszögek ($90^\circ$), kiegészítő szögek / mellékszögek ($180^\circ$), csúcsszögek, szögfelezés, sokszögek belső szögei
  6. Gyakori tévhitek és csapdák (`TheoryTrapBox`)
- **`AnglesQuiz.tsx`**: 30 kérdéses kvíz 3 szinten, tippekkel, levezetésekkel, beépített csalólapokkal és játékmód-választóval.
- **`AnglesMatcher.tsx`**: Párosító játék 3 szinten (24 kártyapár szögfajtákkal, óralap-állásokkal és szögpárokkal).
- **`AnglesSorter.tsx`**: Csoportosító játék 3 szinten (hegyes/derék/tompa, domború/homorú, óralap szerinti válogatás).
- **`index.ts`**: Tiszta központi export.
