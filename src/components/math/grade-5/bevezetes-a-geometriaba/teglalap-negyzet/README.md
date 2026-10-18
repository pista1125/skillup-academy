# 8. Téglalap, négyzet

Az 5. osztályos matematika tankönyv (**OH-MAT05TA**) harmadik fejezetének 8. leckéje.

## Megvalósított Komponensek
- **`QuadsTheory.tsx`**: Részletes elméleti tananyag 5 fejezettel, SVG ábrákkal (magyar derékszög jelölés: negyedkörív + pont), Venn-diagrammal, kiemelt szabállyal (`quickRule`), és a 4. pont után elhelyezett **Interaktív Téglalap- és Négyzetlaboratóriummal** (méretezés csúszkákkal, átlók, 2 vs. 4 tükörtengely, élő kerület- és területszámítás).
- **`QuadsQuiz.tsx`**: 30 kérdéses kvíz 3 szinten, azonnali visszajelzéssel, magyarázatokkal, tippekkel, lépésről lépésre levezetéssel és puskakártyákkal.
- **`QuadsMatcher.tsx`**: Párosító játék 3 szinten, 8-8 párral.
- **`QuadsSorter.tsx`**: Csoportosító játék 3 szinten, 12-12 kártyával.

---

## Főbb Fogalmak és Tulajdonságok
- **Téglalap:** olyan négyszög, amelynek minden szöge derékszög ($90^\circ$).
  - Szemközti oldalai párhuzamosak és egyenlő hosszúak ($a$ és $b$).
  - Átlói egyenlő hosszúak és felezik egymást (de nem merőlegesek).
  - 2 szimmetriatengelye van (az oldalfelező merőlegesek; az átló nem tükörtengely!).
  - Kerülete: $K = 2 \cdot (a + b) = 2a + 2b$.
  - Területe: $T = a \cdot b$.
- **Négyzet:** olyan téglalap, amelynek minden oldala egyenlő hosszú ($a$).
  - Minden szöge derékszög ($90^\circ$).
  - Átlói egyenlő hosszúak, felezik egymást, merőlegesek egymásra és felezik a belső szögeket ($45^\circ$).
  - 4 szimmetriatengelye van (2 oldalfelező és 2 átló).
  - Kerülete: $K = 4 \cdot a$.
  - Területe: $T = a \cdot a = a^2$.
- **Kapcsolat:** Minden négyzet téglalap, de nem minden téglalap négyzet!
