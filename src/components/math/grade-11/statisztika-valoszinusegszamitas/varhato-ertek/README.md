# 9. Várható érték (59. lecke)

## Tananyag Áttekintés
Diszkrét valószínűségi változók és a várható érték ($E(X)$) fogalma: valószínűségi eloszlás táblázatos megadása, szerencsejátékok méltányossága és kockázatelemzés.

---

## Fő Fogalmak és Képletek

- **Diszkrét valószínűségi változó ($X$):**
  - Egy olyan változó, amelynek lehetséges értékei egy véges vagy megszámlálható halmaz elemei ($x_1, x_2, \dots, x_n$), és minden $x_i$ értékhez tartozik egy $p_i = P(X = x_i)$ valószínűség.
  - A valószínűségek összege mindig 1:
    $$\sum_{i=1}^n p_i = 1$$

- **A várható érték ($E(X)$ vagy $M(X)$):**
  - A lehetséges kimenetelek valószínűségekkel súlyozott átlaga:
    $$E(X) = \sum_{i=1}^n x_i \cdot p_i = x_1 \cdot p_1 + x_2 \cdot p_2 + \dots + x_n \cdot p_n$$
  - Jelentése: hosszú távon, sok kísérletet elvégezve a kísérleti átlag a várható értékhez tart (nagy számok törvénye).

- **Méltányos játék:**
  - Egy játék akkor méltányos (fair), ha a játékos nettó nyereményének várható értéke 0.
  - Ha $E(X) < 0$: a játék a ház javára lejt (kaszinók, lottók).
