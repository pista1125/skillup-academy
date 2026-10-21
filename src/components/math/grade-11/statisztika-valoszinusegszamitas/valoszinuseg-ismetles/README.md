# 7. Valószínűség – ismétlés (58. lecke)

## Tananyag Áttekintés
A klasszikus valószínűségi modell felidézése: kísérlet, eseménytér, elemi események, kedvező és összes esetek aránya, eseményalgebra és a komplementer esemény valószínűsége.

---

## Fő Fogalmak és Alapszabályok

- **A klasszikus valószínűségi mező:**
  - Ha az eseménytér véges sok ($n$) egyformán valószínű elemi eseményből áll:
    $$P(A) = \frac{k}{n} = \frac{\text{kedvező esetek száma}}{\text{összes esetek száma}}$$
  - Bármely eseményre: $0 \le P(A) \le 1$.
  - Lehetetlen esemény: $P(\emptyset) = 0$.
  - Biztos esemény: $P(I) = 1$.

- **Komplementer (ellentett) esemény:**
  - $$P(\bar{A}) = 1 - P(A)$$
  - Nagyon hatékony a "legalább egy" típusú feladatoknál:
    $$P(\text{legalább 1}) = 1 - P(\text{egy sem})$$

- **Események uniója és összeadási szabály:**
  - Egymást kizáró események ($A \cap B = \emptyset$):
    $$P(A \cup B) = P(A) + P(B)$$
  - Tetszőleges események:
    $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$
