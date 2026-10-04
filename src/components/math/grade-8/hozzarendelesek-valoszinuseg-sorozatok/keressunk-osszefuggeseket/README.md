# 10. Keressünk összefüggéseket! (8. osztály)

## Tananyag Áttekintés
Számpárok, táblázatok, geometriai mintázatok (pontrácsok, gyufaszál-alakzatok) és sorozatok mögött rejlő szabályszerűségek felismerése, algebrai képlettel való leírása ($n \mapsto f(n)$), valamint összefüggések igazolása és inverz feladatok (adott elemszámhoz tartozó alakzatsorszám kiszámítása).

---

## Fő Témakörök és Képletek

### 1. Szabályfelismerés és Különbségvizsgálat
1. **Adatok táblázatba foglalása:** Az alakzat sorszáma ($n = 1, 2, 3, 4, \dots$) és a hozzá tartozó érték ($y$).
2. **Első rendű különbségek ($d$):**
   - Ha a szomszédos értékek különbsége állandó: a szabály **lineáris** $\implies f(n) = d \cdot n + b$.
   - A $b$ konstans kiszámítása: $b = f(1) - d$.
3. **Másodrendű különbségek:**
   - Ha a különbségek különbsége állandó: a szabály **másodfokú** $\implies f(n) = a \cdot n^2 + b \cdot n + c$.
4. **Általánosítás és előrejelzés:** A képlet segítségével kiszámítható tetszőleges $n$ sorszámú alakzat értéke, vagy egyenletmegoldással visszafelé meghatározható a sorszám.

### 2. Gyufaszál-láncok és Keretek
- **Négyzetlánc (egy oldal közös):** $f(n) = 3n + 1$ (4, 7, 10, 13, ...)
- **Háromszöglánc (egy oldal közös):** $f(n) = 2n + 1$ (3, 5, 7, 9, ...)
- **Házikólánc:** $f(n) = 5n + 1$ (6, 11, 16, 21, ...)
- **Ötszöglánc:** $f(n) = 4n + 1$ (5, 9, 13, 17, ...)

### 3. Háromszögszámok, Kézfogások és Sokszögek Átlói
- **Gauss-féle összegképlet (Háromszögszámok):**
  $$T_n = 1 + 2 + 3 + \dots + n = \frac{n(n+1)}{2}$$
- **Négyszögszámok kapcsolata:**
  $$T_{n-1} + T_n = n^2$$
- **Kézfogások száma $n$ fős társaságban:**
  $$K = \frac{n(n-1)}{2}$$
- **Konvex $n$-szög átlóinak száma:**
  $$\text{Átlók} = \frac{n(n-3)}{2}$$
  Egy csúcsból $(n - 3)$ átló húzható.

---

## Modul Komponensei

1. **`FindingPatternsTheory.tsx`**:
   - `TheoryTemplate`-re épülő interaktív elméleti modul (`themeColor="amber"`).
   - Kiemelt összefoglaló kártya (`quickRule`), 4 elméleti fejezet, tipikus tévhitek (`TheoryTrapBox`), és a lecke végén elhelyezett **Interaktív Laboratórium** (Gyufaszál Lánc Építő + Háromszögszám & Kézfogás Kalkulátor pontrács megjelenítéssel).
2. **`FindingPatternsQuiz.tsx`**:
   - `QuizTemplate`-re épülő 30 kérdéses kvíz 3 nehézségi szinten (minden kérdésnél `correctAnswer: 0`).
   - 4 db SVG illusztrált Cheat Sheet kártya az összefüggésekhez.
   - Integrált játékmódok a füleken: Kvíz, Párosító és Csoportosító.
3. **`FindingPatternsMatcher.tsx`**:
   - `MatcherTemplate`-re épülő interaktív párosító játék 24 kártyapárral 3 szinten (Alapképletek, Gyufaszálak, Speciális összefüggések).
4. **`FindingPatternsSorter.tsx`**:
   - `SorterTemplate`-re épülő csoportosító modul 36 kártyával 3 szinten (Növekedési típusok, Alkalmazási területek, Igaz/Hamis állítások).
