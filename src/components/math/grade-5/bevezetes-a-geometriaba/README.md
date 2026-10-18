# III. Bevezetés a geometriába (5. osztály)

Ebben a mappában találhatók az 5. osztályos matematika tankönyv (**OH-MAT05TA**) harmadik fejezetének anyagai, leckéi, kvízei és játékos feladatai.

## A fejezet altémái (leckéi) a tanterv szerint:

1. **1. Csoportosítások** (`g5-geom-grouping`)
   - Tárgyak és geometriai formák tulajdonságok szerinti szétválogatása, Venn-diagramok alapjai.
2. **2. Halmazok** (`g5-geom-sets`)
   - Geometriai alakzatok halmazai, részhalmaz, metszet, unió szemléletes bemutatása.
3. **3. Test, felület, vonal, pont** (`g5-geom-bodies`)
   - Geometriai alapelemek hierarchiája: pont (0D), vonal/egyenes/szakasz (1D), felület/lap (2D), test (3D).
4. **4. A szög** (`g5-geom-angles`)
   - Szögek fogalma, szögfajták (hegyesszög, derékszög, tompaszög, egyenesszög, homorúszög, teljesszög), szögmérés és szögmásolás.
5. **5. Síkidomok, sokszögek** (`g5-geom-triangles`)
   - Háromszögek, négyszögek, kör, szabályos sokszögek tulajdonságai és csoportosítása.
6. **6. Testek építése, szemléltetése** (`g5-geom-building`)
   - Kockákból épített testek, nézetek (elöl-, oldal-, felülnézet), testek hálói.
7. **7. Egyenesek síkban, térben** (`g5-geom-lines`)
   - Párhuzamos, metsző, merőleges és kitérő egyenesek, távolság mérése.
8. **8. Téglalap, négyzet** (`g5-geom-quads`)
   - Kerület, terület előkészítése, szimmetriatengelyek, oldalak és szögek tulajdonságai.
9. **9. Összefoglalás** (`g5-geom-summary`)
   - Átfogó fejezeti ismétlés, tudáspróba, geometriai fogalomtár.

---

## Közös Template-ek (SVG Ábra Támogatással Felkészítve)

A fejezet közös komponensei kifejezetten fel vannak készítve nagyszámú geometriai SVG ábra kezelésére:

- **`TheoryTemplate.tsx`**:
  - `GeometrySvgFrame`: Reszponzív, kontrasztos keret geometriai ábrákhoz négyzethálós vagy pontrácsos háttérrel, felirattal.
  - `GeometryFigureCard`: Kártya SVG ábrával, címmel, tulajdonságlistával, képlettel és magyarázattal.
  - `GeometryFigureGrid`: 2, 3 vagy 4 oszlopos reszponzív rács ábrák összehasonlításához.
  - `FormulaFigureCard`: Képlet és SVG ábra egymás melletti megjelenítése.
  - `ConstructionStepCard`: Körzővel és vonalzóval végzett szerkesztési lépések kártyája (lépésszám, utasítás, ábra, eszközök).
  - `TheorySection`, `TheoryCard`, `TheoryCallout`, `TheoryTrapBox`, `TheoryTable`.
  - PDF export (`5_osztaly_III_geometria_tananyag.pdf`).

- **`QuizTemplate.tsx`**:
  - SVG ábrás kérdések kiemelt, reszponzív megjelenítése (`currentQuestion.figure`, `figureHeight`, `figureCaption`).
  - SVG ábrás válaszopciók támogatása (ha maga a 4 válaszopció geometriai ábra).
  - Lépésenkénti levezetés (`breakdown`, `steps`) és Képlettár (`cheatSheetCards`) SVG ábrákkal.
  - Gamification: életek (❤️), kombó (🔥), ranglista, billentyűzet-vezérlés `[1, 2, 3, 4]`.

- **`MatcherTemplate.tsx`**:
  - Kártyákban geometriai ábrák (`promptFigure`, `valueFigure`, `figure`) megjelenítése megfelelő kártyamagassággal és SVG arányokkal.
  - Ranglista, időmérés, csillagok és életrendszer.

- **`SorterTemplate.tsx`**:
  - Csoportosítandó elemeknél (`item.figure`) előnézeti bélyegkép mind a kiinduló kártyákon, mind a célcsoportokba dobott elemeknél.
  - 2, 3 vagy 4 kategóriás felosztás támogatása.
