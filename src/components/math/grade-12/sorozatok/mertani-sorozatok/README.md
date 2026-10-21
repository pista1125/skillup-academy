# 26. Mértani sorozatok (26. lecke)

## Tananyag Áttekintés
A mértani (geometriai) sorozat fogalma, a hányados ($q$), az $n$-edik tag explicit képlete, a mértani közép tulajdonság, valamint az oszcilláló és monoton sorozatok.

---

## A Mértani Sorozat Definíciója

- **Definíció:** Egy számsorozatot mértani sorozatnak nevezünk, ha a második tagjától kezdve bármely tagjának és az őt közvetlenül megelőző tagjának hányadosa állandó:
  $$\frac{a_{n+1}}{a_n} = q \quad (n \ge 1, \quad a_1 \neq 0, \quad q \neq 0)$$
  - $q$: a mértani sorozat **hányadosa** (kvóciense).
- **Rekurzív képlet:** $a_{n+1} = a_n \cdot q$.

---

## Az n-edik Tag Képlete

Az egymást követő tagok kifejezése az első taggal ($a_1$) és a hányadossal ($q$):
- $a_1$
- $a_2 = a_1 \cdot q$
- $a_3 = a_2 \cdot q = a_1 \cdot q^2$
- $a_4 = a_1 \cdot q^3$
- Általánosan az **$n$-edik tag**:
  $$a_n = a_1 \cdot q^{n-1}$$

### Két tetszőleges tag kapcsolata:
Bármely $k$ és $m$ index esetén:
$$\frac{a_k}{a_m} = q^{k - m} \implies q = \sqrt[k - m]{\frac{a_k}{a_m}}$$

---

## Mértani Közép Tulajdonság

A mértani sorozat bármely tagjának négyzete a két szomszédos tagjának szorzatával egyenlő:
$$a_n^2 = a_{n-1} \cdot a_{n+1}$$
Ha a sorozat tagjai pozitívak:
$$a_n = \sqrt{a_{n-1} \cdot a_{n+1}}$$
*(A tag a két szomszédjának mértani közepe.)*

---

## Monotonitás és Viselkedés ($a_1 > 0$ esetén)
- Ha $q > 1$: a sorozat **szigorúan monoton növő** (exponenciálisan nő).
- Ha $0 < q < 1$: a sorozat **szigorúan monoton csökkenő** (0-hoz tart).
- Ha $q = 1$: a sorozat **konstans** ($a_1 = a_2 = \dots$).
- Ha $q < 0$: a tagok előjele felváltva pozitív és negatív (**alternáló vagy oszcilláló** sorozat, nem monoton).
