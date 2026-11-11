# Számtani közép, mértani közép

## Tananyag Áttekintés
Két nemnegatív valós szám számtani és mértani közepe közötti nevezetes egyenlőtlenség vizsgálata, geometriai és algebrai bizonyítása, valamint alkalmazása szélsőérték-feladatokban.

---

## Fő Fogalmak és Összefüggések

- **Számtani közép ($A$):**
  - Két valós szám számtani közepe: $A = \frac{a + b}{2}$
  - Történeti háttér: a számtani arányból ($a - x = x - b$) származó középarányos.

- **Mértani közép ($G$):**
  - Két nemnegatív szám mértani közepe: $G = \sqrt{a \cdot b}$
  - Történeti háttér: a mértani arányból ($a : x = x : b$) származó középarányos.
  - Geometriai jelentése: a magasságtétel és a befogótétel derékszögű háromszögekben.

- **A számtani és mértani közép közötti egyenlőtlenség (AM-GM):**
  - Bármely $a, b > 0$ valós szám esetén:
    $$\frac{a + b}{2} \ge \sqrt{ab}$$
  - Egyenlőség akkor és csakis akkor áll fenn, ha $a = b$.
  - Algebrai bizonyítás alapja: $(a - b)^2 \ge 0$.

- **Geometriai szemléltetés (Thálész-kör és magasságtétel):**
  - Átmérő: $a + b$, sugár $R = \frac{a+b}{2}$, érintési magasság $m = \sqrt{ab}$.
  - Mivel a magasság soha nem haladhatja meg a sugarat: $m \le R \iff \sqrt{ab} \le \frac{a+b}{2}$.

- **Szélsőérték-feladatok algebrai és geometriai megoldása:**
  - Ha két pozitív szám összege állandó ($a + b = K$), szorzatuk akkor maximális, ha $a = b$ (adott kerülethez a négyzet területe a legnagyobb).
  - Ha két pozitív szám szorzata állandó ($a \cdot b = P$), összegük akkor minimális, ha $a = b$ (adott területhez a négyzet kerülete a legkisebb).

- **Nevezetes reciprok-összeg:**
  - Pozitív számra: $a + \frac{1}{a} \ge 2$ (minimum: $2$, ha $a = 1$).
  - Negatív számra: $a + \frac{1}{a} \le -2$ (maximum: $-2$, ha $a = -1$).

---

## Elkészült Komponensek

1. **`ArithmeticGeometricFigures.tsx`** – Vektorgrafikus SVG szemléltető ábrák:
   - `AmGmThalesSvg`: Thálész-félkörös geometriai bizonyítás magasságtétellel.
   - `RectangleSquareComparisonSvg`: Téglalap vs. Négyzet terület- és kerület-összehasonlítás.
   - `ReciprocalSumGraphSvg`: Az $f(x) = x + 1/x$ függvény grafikonja és minimuma.
   - `SalaryGrowthComparisonSvg`: Antal (lineáris) vs. Benő (mértani) bérnövekedési görbéje.

2. **`ArithmeticGeometricTheory.tsx`** – Interaktív elméleti tananyag:
   - Kiemelt **Fontos szabályok** memóriapanel a tananyag tetején és `quickRule` a fejlécben.
   - **Interaktív Középérték & Szélsőérték Labor**: dinamikus csúszkák, Thálész-diagram és felületszámítás.
   - 5 részletes elméleti szakasz algebrai és geometriai levezetésekkel, tankönyvi példákkal.

3. **`ArithmeticGeometricMatcher.tsx`** – 3 szintű kártyapárosító játék ($3 \times 8 = 24$ pár).
4. **`ArithmeticGeometricSorter.tsx`** – 3 szintű csoportosító / kategorizáló játék.
5. **`ArithmeticGeometricQuiz.tsx`** – 30 feladatos interaktív kvíz 3 nehézségi fokozatban, puskakártyákkal és részletes levezetésekkel.
