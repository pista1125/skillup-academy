# 14. Exponenciális egyenlőtlenségek (39. lecke)

## Tananyag Áttekintés
Exponenciális és logaritmusos egyenlőtlenségek megoldása a szigorú monotonitás figyelembevételével: mikor fordul meg és mikor marad meg a relációjel az alap nagyságától függően.

---

## Fő Szabályok és Megoldási Módszerek

- **Exponenciális egyenlőtlenség alapszabálya:**
  - Tekintsük az $a^{f(x)} > a^{g(x)}$ egyenlőtlenséget ($a > 0, a \neq 1$):
    - **Ha $a > 1$:** az exponenciális függvény szigorúan monoton növő, ezért a relációjel **változatlan marad**:
      $$a^{f(x)} > a^{g(x)} \iff f(x) > g(x)$$
    - **Ha $0 < a < 1$:** az exponenciális függvény szigorúan monoton csökkenő, ezért a relációjel **megfordul**:
      $$a^{f(x)} > a^{g(x)} \iff f(x) < g(x)$$

- **Logaritmikus egyenlőtlenségek alapszabálya:**
  - Tekintsük a $\log_a f(x) > \log_a g(x)$ egyenlőtlenséget (kikötések: $f(x) > 0, g(x) > 0$):
    - **Ha $a > 1$:** relációjel változatlan: $f(x) > g(x)$.
    - **Ha $0 < a < 1$:** relációjel megfordul: $f(x) < g(x)$.

- **Gyakori típusok:**
  - Közös alapra hozható feladatok (pl. $4^x > 8^{x-1} \implies 2^{2x} > 2^{3(x-1)}$).
  - Új ismeretlen bevezetésével másodfokúra visszavezethető egyenlőtlenségek (pl. $a^x = y > 0$).
