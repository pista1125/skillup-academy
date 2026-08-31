# 3. Írásbeli összeadás

## Tananyag Áttekintés
Az írásbeli összeadás teljes algoritmusa a 3. osztályban: átlépés nélküli összeadás, egyszeres átlépés (tízesátlépés vagy százasátlépés), és kétszeres átlépés a maradék pontos továbbvitelével.

---

## Az Algoritmus Lépései

### 1. Tízesátlépéssel ($247 + 138$)
```
      ¹
  2   4   7
+ 1   3   8
-----------
  3   8   5
```
1. **Egyesek:** $7 + 8 = 15$. Leírom az **$5$**-öt az egyesek alá, maradt az **$1$ tízes**, amit felviszek a tízesekhez.
2. **Tízesek:** $1 + 4 + 3 = 8$. Leírom a **$8$**-at a tízesek alá.
3. **Százasok:** $2 + 1 = 3$. Leírom a **$3$**-at a százasok alá.
$$\text{Összeg: } \mathbf{385}$$

### 2. Kétszeres Átlépéssel ($268 + 175$)
```
  ¹   ¹
  2   6   8
+ 1   7   5
-----------
  4   4   3
```
1. Egyesek: $8 + 5 = 13 \implies$ leírom a $3$-at, maradt az $1$.
2. Tízesek: $1 + 6 + 7 = 14 \implies$ leírom a $4$-et, maradt az $1$.
3. Százasok: $1 + 2 + 1 = 4 \implies$ leírom a $4$-et.
$$\text{Összeg: } \mathbf{443}$$
