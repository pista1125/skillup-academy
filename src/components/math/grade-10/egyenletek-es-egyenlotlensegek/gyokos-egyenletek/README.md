# 2. Gyökös egyenletek (61. lecke)

## Tananyag Áttekintés
Ismeretlent a négyzetgyökjel alatt tartalmazó (irracionális) egyenletek megoldásának szisztematikus lépései: a gyökös kifejezés izolálása, négyzetre emelés és a hamis gyökök kizárása.

---

## Fő Megoldási Lépések és Feltételek

- **1. Értelmezési tartomány és értékkészlet (kétirányú kikötés):**
  - A négyzetgyök alatti kifejezés nemnegatív: ha $\sqrt{f(x)}$ szerepel, akkor $f(x) \ge 0$.
  - A négyzetgyök értéke definíció szerint nemnegatív: ha $\sqrt{f(x)} = g(x)$, akkor szükséges feltétel, hogy $g(x) \ge 0$.

- **2. A gyökjel izolálása:**
  - Rendezés úgy, hogy a gyökös kifejezés egyedül álljon az egyik oldalon: $\sqrt{f(x)} = g(x)$.

- **3. Négyzetre emelés:**
  - $f(x) = (g(x))^2$.
  - Figyelem: $A = B \implies A^2 = B^2$, de a megfordítás nem igaz! Ezért keletkezhetnek hamis gyökök.

- **4. Másodfokú vagy elsőfokú egyenlet megoldása.**

- **5. Ellenőrzés:**
  - Kötelező behelyettesítés az eredeti egyenletbe.

---

## Elkészült Komponensek és Modulok

1. **`RadicalEquationsFigures.tsx`**:
   - `RadicalStepFlowSvg`: 4-lépéses algoritmus folyamatábrája.
   - `RadicalParabolaIntersectionSvg`: Fekvő parabola és egyenes metszéspontjai (valódi vs. hamis gyök grafikus szemléltetése).
   - `RadicalDomainSvg`: Számegyenes kikötések összevetése és közös tartomány.
   - `TwoRadicalsSvg`: Két gyökös kifejezés helyes izolálása.
   - `ExtraneousRootDetectorSvg`: Hamis gyök detektor teszt behelyettesítéssel.

2. **`RadicalEquationsTheory.tsx`**:
   - 5 részletes elméleti fejezet kidolgozott érettségi mintapéldákkal és buktatókkal.
   - Fejléc jobb oldalán kiemelt aranyszabályok kártya (`quickRule`).
   - 6. fejezetként a tananyag végén **Interaktív Gyökös Egyenlet Laboratórium** és gyors gyök-döntő villámkvíz.

3. **`RadicalEquationsQuiz.tsx`**:
   - 3 szint × 10 kérdés = 30 professzionális kérdés segítő tippekkel és részletes magyarázatokkal.
   - Szintek előtti CheatSheet kártyák és beágyazott mini-játékok (Matcher, Sorter).

4. **`RadicalEquationsMatcher.tsx`**:
   - 3 szint × 8 pár (összesen 24 párkereső feladat).

5. **`RadicalEquationsSorter.tsx`**:
   - 3 szint × 3 kategória (Megoldások száma, Gyökjelöltek minősítése, Szabályok és tévhitek).
