# 11. Sorozatok (8. osztály)

## Tananyag Áttekintés
A számsorozat mint speciális függvény fogalma (a pozitív egész számokon értelmezett függvény, $n \in \mathbb{Z}^+$), tagok indexelése ($a_1, a_2, \dots, a_n$), számtani és mértani sorozatok alapjai, rekurzív és explicit képzési szabályok, valamint a Fibonacci-sorozat.

---

## 1. A Sorozat Fogalma és Megadási Módjai
- **Sorozat:** Olyan függvény, amelynek értelmezési tartománya a pozitív egész számok halmaza ($D = \{1, 2, 3, \dots, n\}$).
- **Megadási módok:**
  1. **Felsorolással:** $a_n = (3, 7, 11, 15, 19, \dots)$
  2. **Explicit (általános) képlettel:** $a_n = 4n - 1$ (közvetlenül kiszámítható az $n$-edik tag).
  3. **Rekurzív képlettel:** Az első tag megadásával és a következő tag előzőből való számításával:
     $$a_1 = 3, \quad a_{n+1} = a_n + 4$$

---

## 2. Számtani és Mértani Sorozatok

### A. Számtani Sorozat (Aritmetikai)
- A szomszédos tagok **különbsége állandó** ($d$, differencia):
  $$a_{n+1} - a_n = d \implies a_n = a_1 + (n - 1)d$$
- **Példa:** $2, 5, 8, 11, 14, \dots \implies a_1 = 2, d = 3 \implies a_{10} = 2 + 9 \cdot 3 = 29$.

### B. Mértani Sorozat (Geometriai)
- A szomszédos tagok **hányadosa állandó** ($q$, kvóciens):
  $$\frac{a_{n+1}}{a_n} = q \implies a_n = a_1 \cdot q^{n-1}$$
- **Példa:** $3, 6, 12, 24, 48, \dots \implies a_1 = 3, q = 2 \implies a_6 = 3 \cdot 2^5 = 96$.

---

## 3. A Fibonacci-sorozat
$$F_1 = 1, \quad F_2 = 1, \quad F_{n} = F_{n-1} + F_{n-2} \quad (n \ge 3)$$
$$1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, \dots$$
*Minden tag az előző két tag összege. A természetben (virágszirmok, fenyőtobozok, napraforgó magjai) és az aranymetszésben is megjelenik.*
