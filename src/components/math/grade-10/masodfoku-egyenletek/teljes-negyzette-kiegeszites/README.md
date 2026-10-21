# 1. Teljes négyzetté kiegészítés (29. lecke)

## Tananyag Áttekintés
A hiányos és teljes másodfokú egyenletek megoldásának bevezetése algebrai azonosságok segítségével, a teljes négyzetté kiegészítés módszerének elméleti alapjai és lépései.

---

## Fő Témakörök és Módszerek

- **Hiányos másodfokú egyenletek:**
  - $c = 0$ eset ($ax^2 + bx = 0$): szorzattá alakítás kiemeléssel: $x(ax + b) = 0 \Rightarrow x_1 = 0$, $x_2 = -\frac{b}{a}$.
  - $b = 0$ eset ($ax^2 + c = 0$): közvetlen gyökvonás: $x^2 = -\frac{c}{a}$ (ha $-\frac{c}{a} \ge 0$, akkor $x_{1,2} = \pm\sqrt{-\frac{c}{a}}$).

- **Teljes négyzetté kiegészítés elve:**
  - Az $(x + d)^2 = x^2 + 2dx + d^2$ azonosság felhasználása.
  - Az $x^2 + px$ tagok kiegészítése $\left(\frac{p}{2}\right)^2$ hozzáadásával és levonásával:
    $$x^2 + px + q = \left(x + \frac{p}{2}\right)^2 - \left(\frac{p}{2}\right)^2 + q = 0$$
  - Átrendezés után közvetlen négyzetgyökvonással adódik a megoldás.
