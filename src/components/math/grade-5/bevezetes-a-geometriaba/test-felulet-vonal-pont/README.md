# 3. Test, felület, vonal, pont

Az 5. osztályos matematika tankönyv (**OH-MAT05TA**) harmadik fejezetének 3. leckéje: **Test, felület, vonal, pont** (`g5-geom-bodies`).

## Elkészült Komponensek
- **`BodiesTheory.tsx`**: 5 szekciós prémium tananyag:
  1. A geometriai dimenziók hierarchiája (0D → 3D) vizuális SVG ábrákkal és keletkezési szabályokkal
  2. A térbeli testek felépítése: lapok (L), élek (É), csúcsok (C) definíciói és 3D kocka modell
  3. Síklapú testek (Poliéderek) és az Euler-féle poliédertétel ($C + L - \acute{E} = 2$)
  4. Görbe felületű testek és forgástestek (henger, kúp, gömb)
  5. Pontok és vonalak: egyenes, félegyenes, szakasz, illeszkedés és kölcsönös helyzetek
  6. Gyakori csapdák & tipikus tévhitek (`TheoryTrapBox`)
- **`BodiesQuiz.tsx`**: 30 kérdéses kvíz 3 nehézségi szinten, pontszámítással, tippekkel, levezetésekkel, beépített csalólapokkal és játékmód-választóval.
- **`BodiesMatcher.tsx`**: Párosító játék 3 szinten (24 geometriai kártyapár SVG illusztrációkkal, élekkel, lapokkal, csúcsokkal és Euler-formulákkal).
- **`BodiesSorter.tsx`**: Csoportosító játék 3 szinten (dimenziók 0D/1D/2D/3D, poliéder vs. forgástest, csúcsszám szerinti rendezés).
- **`index.ts`**: Tiszta központi export.
