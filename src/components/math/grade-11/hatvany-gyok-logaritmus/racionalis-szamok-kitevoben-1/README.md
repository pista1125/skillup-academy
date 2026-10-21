# 3. Racionális számok a kitevőben I. (28. lecke)

## Tananyag Áttekintés
A hatványozás kiterjesztése törtkitevőkre: a racionális kitevőjű hatvány és a gyök kapcsolatának megértése, valamint az alapvető átváltások és értelmezési tartományok.

---

## Fő Fogalmak és Összefüggések

- **Törtkitevőjű hatvány definíciója:**
  - Legyen $a > 0$, $p \in \mathbb{Z}$, $q \in \mathbb{Z}^+, q \ge 2$:
    $$a^{\frac{p}{q}} = \sqrt[q]{a^p} = (\sqrt[q]{a})^p$$
  - Speciálisan:
    $$a^{\frac{1}{n}} = \sqrt[n]{a}$$
    $$a^{-\frac{p}{q}} = \frac{1}{a^{\frac{p}{q}}} = \frac{1}{\sqrt[q]{a^p}}$$

- **Miért szükséges az $a > 0$ feltétel?**
  - Negatív alap esetén az egyszerűsítés ellentmondáshoz vezetne: $(-8)^{\frac{1}{3}} = -2$, de $(-8)^{\frac{2}{6}} = \sqrt[6]{(-8)^2} = \sqrt[6]{64} = 2$.
  - Ezért a törtkitevőjű hatványozás **kizárólag pozitív alapra** van definiálva.

- **Egyszerűsítések és átírások:**
  - Gyökös kifejezések átírása hatvány alakra algebrai műveletek előtt:
    $$\sqrt{x \cdot \sqrt{x}} = \sqrt{x^{1 + \frac{1}{2}}} = \sqrt{x^{\frac{3}{2}}} = x^{\frac{3}{4}}$$
