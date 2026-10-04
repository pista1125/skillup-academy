# 11. Sorozatok (8. osztály)

## Tananyag Áttekintés
A számsorozat mint speciális függvény fogalma (a pozitív egész számokon értelmezett diszkrét függvény, $n \in \mathbb{Z}^+$), tagok indexelése ($a_1, a_2, \dots, a_n$), számtani és mértani sorozatok alapjai, rekurzív és explicit képzési szabályok, valamint a Fibonacci-sorozat és az aranymetszés kapcsolata.

---

## Fő Témakörök és Képletek

### 1. A Sorozat Fogalma és Megadási Módjai
- **Sorozat:** Pozitív egészek halmazán értelmezett függvény: $D = \{1, 2, 3, \dots, n\}$.
- **Grafikon:** Derékszögű koordináta-rendszerben ábrázolva különálló, diszkrét pontok halmaza (nem köthető össze folytonos vonallal!).
- **Megadási módok:**
  1. **Felsorolással:** $a_n = (4, 7, 10, 13, 16, \dots)$
  2. **Explicit (általános) képlettel:** $a_n = 3n + 1$ (közvetlenül kiszámítható bármely távoli tag, pl. $a_{100} = 301$).
  3. **Rekurzív képlettel:** Kezdőtag megadásával és a következő tag előzőből való számításával:
     $$a_1 = 4, \quad a_{n+1} = a_n + 3$$

### 2. Számtani Sorozatok (Aritmetikai)
- A szomszédos tagok **különbsége állandó** ($d$, differencia):
  $$d = a_{n+1} - a_n \implies a_n = a_1 + (n - 1)d$$
- **Monotonitás:**
  - $d > 0 \implies$ szigorúan monoton növekvő
  - $d < 0 \implies$ szigorúan monoton csökkenő
  - $d = 0 \implies$ állandó (konstans)
- **Számtani közép:** Bármely belső tag a közvetlen szomszédjai számtani közepe:
  $$a_k = \frac{a_{k-1} + a_{k+1}}{2}$$

### 3. Mértani Sorozatok (Geometriai)
- A szomszédos nem-nulla tagok **hányadosa állandó** ($q$, kvóciens):
  $$q = \frac{a_{n+1}}{a_n} \implies a_n = a_1 \cdot q^{n-1}$$
- **Mértani közép:** Pozitív tagú sorozatban a tag a szomszédjai mértani közepe:
  $$a_k = \sqrt{a_{k-1} \cdot a_{k+1}}$$
- **Viselkedés:**
  - $q > 1 \implies$ robbanásszerű exponenciális növekedés (pl. baktériumok duplázódása)
  - $0 < q < 1 \implies$ gyors exponenciális csökkenés (feleződés)
  - $q < 0 \implies$ váltakozó előjelű (oszcilláló) sorozat

### 4. A Fibonacci-sorozat és Aranymetszés
- **Rekurzív szabály:**
  $$F_1 = 1, \quad F_2 = 1, \quad F_n = F_{n-1} + F_{n-2} \quad (n \ge 3)$$
  $$1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, \dots$$
- **Aranymetszés:** Nagyobb sorszámoknál a szomszédos tagok hányadosa a görög aranyarányhoz tart:
  $$\lim_{n \to \infty} \frac{F_{n+1}}{F_n} = \Phi = \frac{1 + \sqrt{5}}{2} \approx 1,61803398\dots$$

---

## Modul Komponensei

1. **`SequencesTheory.tsx`**:
   - `TheoryTemplate`-re épülő interaktív elméleti modul (`themeColor="cyan"`).
   - Kiemelt képletkártya (`quickRule`), 4 elméleti fejezet, tipikus tévhitek (`TheoryTrapBox`), és a lecke végén lévő **Interaktív Laboratórium** (Számtani és mértani sorozat generátor grafikonnal + Fibonacci arányvizsgáló).
2. **`SequencesQuiz.tsx`**:
   - `QuizTemplate`-re épülő 30 kérdéses kvíz 3 szinten (`correctAnswer: 0`).
   - 4 db SVG illusztrált Cheat Sheet kártya.
   - Integrált játékmódok a füleken: Kvíz, Párosító és Csoportosító.
3. **`SequencesMatcher.tsx`**:
   - `MatcherTemplate`-re épülő párosító modul 24 kártyapárral 3 szinten.
4. **`SequencesSorter.tsx`**:
   - `SorterTemplate`-re épülő csoportosító modul 36 kártyával 3 szinten (Típusok, Monotonitás és viselkedés, Igaz/Hamis tévhitek).
