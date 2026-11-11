# 7. Megismerhető véletlen – Klasszikus valószínűségszámítás

## Tananyag Áttekintés
A valószínűség klasszikus matematikai modellje (Laplace-modell): véletlen kísérletek, eseménytér felírása, mikroszkopikus elemi események egyenlő valószínűsége, a két dobókockás kísérlet rácsmodellezése, Zsombor paradoxonának feloldása (7 vs. 8 összeg), szorzattáblázat és szimmetrikus játékok (kő-papír-olló, gyík-Spock, kártyahúzás visszatevés nélkül).

---

## Fő Fogalmak és Modellek

- **Véletlen kísérlet és eseménytér ($\Omega$):**
  - Véletlen kísérlet: Azonos körülmények között tetszőlegesen sokszor megismételhető, bizonytalan egyedi kimenetelű folyamat.
  - Elemi esemény: A kísérlet egyetlen legfinomabb, tovább nem bontható kimenetele.
  - Eseménytér ($\Omega$): Az összes elemi esemény halmaza.

- **A klasszikus valószínűségi mező feltétele (Laplace-modell):**
  - Véges sok lehetséges kimenetel ($n$).
  - Szimmetria: Minden elemi esemény egyenlően valószínű.
  - Képlete: $P(A) = \frac{\text{kedvező elemi események száma}}{\text{összes elemi esemény száma}} = \frac{k}{n}$.
  - Tulajdonságok: $0 \le P(A) \le 1$, biztos esemény $P(I) = 1$, lehetetlen esemény $P(\emptyset) = 0$, ellentett esemény $P(\bar{A}) = 1 - P(A)$.

- **Két dobókocka dobása és Zsombor csapdája:**
  - $6 \times 6 = 36$ rendezett kimenetel. A természet a megkülönböztetett kockák modelljét követi!
  - 7-es összeg: 6 kedvező mező ((1,6), (6,1), (2,5), (5,2), (3,4), (4,3)) $\implies P(7) = 6/36 = 1/6 \approx 16,7\%$.
  - 8-as összeg: 5 kedvező mező ((2,6), (6,2), (3,5), (5,3), (4,4)) $\implies P(8) = 5/36 \approx 13,9\%$.
  - Miért nem egyenlőek? Mert a $4+4$ csak 1 rácsmező, míg az eltérő párok kétszer fordulnak elő!

- **Két kocka szorzata:**
  - $1 \le x_1 \cdot x_2 \le 36$.
  - Négyzetszámok (1, 4, 9, 16, 25, 36): 8 mező $\implies P = 8/36 = 2/9 \approx 22,2\%$.
  - Szorzat = 6: 4 mező $\implies P = 4/36 = 1/9 \approx 11,1\%$.
  - Páros szorzat: $36 - 9 = 27$ mező $\implies P = 27/36 = 3/4 = 75\%$.

- **Szimmetrikus játékok és kombinatorikus húzások:**
  - Kő-papír-olló: $3 \times 3 = 9$ eset, döntetlen: $3/9 = 1/3$. Fair játék: $P(\text{nyer}) = P(\text{veszít}) = 1/3$.
  - Kő-papír-olló-gyík-Spock: $5 \times 5 = 25$ eset, döntetlen: $5/25 = 1/5$. Fair játék.
  - Kártyák {A, E, M, Z} visszatevés nélkül: $4 \times 3 = 12$ kimenetel, értelmes szó (AZ, EZ, MA): $3/12 = 1/4 = 25\%$.
  - Visszatevés nélküli mintavétel: $n \cdot (n - 1)$ eset; visszatevéssel: $n^2$ eset.

---

## Elkészült Komponensek
- `ClassicalProbFigures.tsx`: Két kocka 6×6-os rácsa (7 vs. 8), Kő-papír-olló-gyík-Spock mátrix és betűkártyák fadiagramja SVG ábrák.
- `ClassicalProbMatcher.tsx`: 3 szintű interaktív párosító játék (24 pár).
- `ClassicalProbSorter.tsx`: 3 szintű rendező játék valószínűségek és esélyek összehasonlítására.
- `ClassicalProbTheory.tsx`: Átfogó elméleti tananyag 5 szabállyal a tetején, interaktív 6×6 rácslaboratóriummal és szimulátorral.
- `ClassicalProbQuiz.tsx`: 30 kérdéses 3 szintű kvíz részletes magyarázatokkal, puskakártyákkal és beágyazott párosító/rendező modulokkal.
