# 7. Számrendszerek I. (48. lecke)

## Tananyag Áttekintés
A helyiértékes számrendszerek működése, a kettes (bináris) és tízes (decimális) számrendszer kapcsolata, valamint számok átváltása a két rendszer között.

---

## Fő Fogalmak és Algoritmusok

- **A helyiértékes elv alapegyenlete:**
  - Egy tetszőleges $b$ alapú ($b \ge 2$) számrendszerben az $a_k a_{k-1} \dots a_1 a_0$ szám értéke a 10-es rendszerben:
    $$N = a_k \cdot b^k + a_{k-1} \cdot b^{k-1} + \dots + a_1 \cdot b^1 + a_0 \cdot b^0$$
  - Felhasználható számjegyek $b$ alap esetén: $\{0, 1, 2, \dots, b-1\}$.

- **Kettes (bináris) számrendszer ($b = 2$):**
  - Számjegyek: $\{0, 1\}$.
  - Helyiértékek: $2^0 = 1, 2^1 = 2, 2^2 = 4, 2^3 = 8, 2^4 = 16, 2^5 = 32, \dots$
  - Példa: $1101_2 = 1 \cdot 8 + 1 \cdot 4 + 0 \cdot 2 + 1 \cdot 1 = 13_{10}$.

- **Tízesből kettesbe váltás (ismételt osztás 2-vel):**
  - A számot egymás után osztjuk 2-vel, feljegyezzük a maradékokat ($0$ vagy $1$).
  - A maradékokat alulról felfelé (visszafelé) olvasva kapjuk meg a bináris alakot.
