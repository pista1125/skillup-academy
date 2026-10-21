# 24. Számtani sorozatok (24. lecke)

## Tananyag Áttekintés
A számtani sorozat definíciója, a differencia ($d$) szerepe, az $n$-edik tag explicit képlete, a számtani közép tulajdonság, valamint a monotonitás vizsgálata.

---

## A Számtani Sorozat Definíciója

- **Definíció:** Egy számsorozatot számtani sorozatnak nevezünk, ha a második tagjától kezdve bármelyik tagjából kivonva az őt megelőző tagot, a különbség mindig állandó:
  $$a_{n+1} - a_n = d \quad (n \ge 1, \quad d \in \mathbb{R})$$
  - $d$: a számtani sorozat **differenciája** (különbsége).
- **Rekurzív képlet:** $a_{n+1} = a_n + d$.

---

## Az n-edik Tag Explicit Képlete

A sorozat tagjai felírhatók az első tag ($a_1$) és a differencia ($d$) segítségével:
- $a_1$
- $a_2 = a_1 + d$
- $a_3 = a_2 + d = a_1 + 2d$
- $a_4 = a_1 + 3d$
- Általánosan az **$n$-edik tag**:
  $$a_n = a_1 + (n - 1)d$$

### Két tetszőleges tag közötti összefüggés:
Bármely $k$ és $m$ index esetén:
$$a_k - a_m = (k - m) \cdot d \implies d = \frac{a_k - a_m}{k - m}$$

---

## Számtani Közép Tulajdonság

A számtani sorozat bármely tagja (a másodiktól kezdve) a két szomszédos tagjának **számtani közepe** (átlaga):
$$a_n = \frac{a_{n-1} + a_{n+1}}{2}$$
Általánosabban: a szimmetrikusan elhelyezkedő tagok közepe is:
$$a_n = \frac{a_{n-k} + a_{n+k}}{2} \quad (1 \le k < n)$$

---

## Monotonitás
- Ha $d > 0$: a sorozat **szigorúan monoton növő**.
- Ha $d < 0$: a sorozat **szigorúan monoton csökkenő**.
- Ha $d = 0$: a sorozat **konstans** ($a_1 = a_2 = a_3 = \dots$).
