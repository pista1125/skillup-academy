# 3. Amikor nem számít a kiválasztás sorrendje (18. lecke)

## Tananyag Áttekintés
Kombinációk fogalma: kiválasztás sorrend nélkül, az $n$ elem $k$-ad osztályú ismétlés nélküli kombinációjának képlete és a lottó típusú sorsolások.

---

## Fő Fogalmak és Képletek

- **Ismétlés nélküli kombináció ($C_n^k$ vagy $\binom{n}{k}$):**
  - $n$ különböző elemből $k$ elem kiválasztása úgy, hogy a sorrend **nem számít**:
    $$C_n^k = \binom{n}{k} = \frac{n!}{k! \cdot (n-k)!} = \frac{n \cdot (n-1) \dots (n-k+1)}{k!}$$

- **Különbség a variáció és a kombináció között:**
  - Variáció ($V_n^k = \frac{n!}{(n-k)!}$): A sorrend számít (pl. dobogós helyezések).
  - Kombináció ($C_n^k = \frac{V_n^k}{k!}$): A kiválasztott elemek belső átrendezése ($k!$) egyetlen esetnek számít (pl. csapat kiválasztása, lottószámok).

- **Klasszikus példa – 5-ös lottó:**
  - 90 számból 5 kihúzott szám összes lehetséges szelvénye:
    $$\binom{90}{5} = \frac{90 \cdot 89 \cdot 88 \cdot 87 \cdot 86}{5 \cdot 4 \cdot 3 \cdot 2 \cdot 1} = 43\,949\,268$$
