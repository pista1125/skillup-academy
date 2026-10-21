# 23. Sorozatok megadása (23. lecke)

## Tananyag Áttekintés
Sorozatok megadásának különféle módjai: szöveges meghatározás, tagok felsorolása, explicit hozzárendelési szabály ($n$-edik tag képlete) és rekurzív megadás, valamint a Fibonacci-sorozat.

---

## 1. Explicit Megadás

Az $n$-edik tagot közvetlenül az $n$ index függvényében adjuk meg:
$$a_n = f(n)$$
- **Előnye:** Bármely tetszőleges tag (pl. $a_{100}$) közvetlenül kiszámítható az $n$ behelyettesítésével, nem kell hozzá ismerni az előző tagokat.
- **Példák:**
  - $a_n = 3n - 1 \implies a_1 = 2, a_2 = 5, a_3 = 8, \dots, a_{100} = 299$
  - $b_n = \frac{n}{n + 1} \implies b_1 = \frac{1}{2}, b_2 = \frac{2}{3}, b_3 = \frac{3}{4}, \dots$
  - $c_n = (-1)^n \cdot n \implies c_1 = -1, c_2 = 2, c_3 = -3, c_4 = 4, \dots$

---

## 2. Rekurzív Megadás

Megadjuk a sorozat első tagját (vagy első néhány tagját), és egy összefüggést (rekurziót), amellyel minden további tag kiszámítható a közvetlenül megelőző tagból vagy tagokból:
- **Példa 1 (egy előző tagból):**
  $$a_1 = 4, \quad a_{n+1} = 2a_n - 3 \quad (n \ge 1)$$
  - $a_1 = 4$
  - $a_2 = 2 \cdot 4 - 3 = 5$
  - $a_3 = 2 \cdot 5 - 3 = 7$
  - $a_4 = 2 \cdot 7 - 3 = 11$

- **Példa 2 (két előző tagból) – A Fibonacci-sorozat:**
  $$F_1 = 1, \quad F_2 = 1, \quad F_{n+1} = F_n + F_{n-1} \quad (n \ge 2)$$
  - $F_1 = 1, F_2 = 1, F_3 = 2, F_4 = 3, F_5 = 5, F_6 = 8, F_7 = 13, F_8 = 21, \dots$
  - A természetben és a művészetben (aranymetszés, fenyőtobozok, napraforgó magjai) rendkívül gyakori sorozat!

---

## 3. Szabályfelismerés
Gyakori feladat a megadott első néhány tag alapján az explicit vagy rekurzív szabály felírása:
- $1, 4, 9, 16, 25, \dots \implies a_n = n^2$
- $2, 4, 8, 16, 32, \dots \implies a_n = 2^n$
- $\frac{1}{2}, \frac{1}{4}, \frac{1}{8}, \frac{1}{16}, \dots \implies a_n = \left(\frac{1}{2}\right)^n$
