# 8. Gráfok jellemzői (23. lecke)

## Tananyag Áttekintés
A gráfelmélet alapfogalmai: csúcsok, élek, fokszámok, egyszerű és többszörös élekkel bíró gráfok, valamint a kézfogási lemma (Euler-tétel).

---

## Fő Fogalmak és Alaptételek

- **A gráf definíciója:**
  - $G = (V, E)$, ahol $V$ a csúcsok (vertices), $E$ az élek (edges) halmaza.
  - Egyszerű gráf: nincsenek benne hurokélek és párhuzamos élek.

- **Fokszám ($d(v)$):**
  - Egy csúcsból kiinduló élek száma.
  - Izolált csúcs: fokszáma 0.

- **A kézfogási lemma (fokszámtétel):**
  - Bármely gráfban a csúcsok fokszámainak összege egyenlő az élek számának kétszeresével:
    $$\sum_{v \in V} d(v) = 2 \cdot |E|$$
  - **Közvetlen következmény:** Minden gráfban a páratlan fokszámú csúcsok száma **páros**!

- **Teljes gráf ($K_n$):**
  - Olyan $n$ csúcsú egyszerű gráf, amelyben bármely két csúcs össze van kötve éllel.
  - Élek száma: $|E| = \binom{n}{2} = \frac{n(n-1)}{2}$.
  - Minden csúcs fokszáma: $n - 1$.
