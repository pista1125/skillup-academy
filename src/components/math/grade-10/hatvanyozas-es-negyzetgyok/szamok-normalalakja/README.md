# 4. Számok normálalakja (15. lecke)

## Tananyag Áttekintés
A természettudományokban (fizika, csillagászat, kémia, biológia) előforduló rendkívül nagy (makrokozmosz) és rendkívül kicsi (mikrokozmosz) számok egységes, áttekinthető kezelése a tízes alapú normálalak segítségével.

---

## Fő Témakörök és Műveletek

- **A normálalak definíciója:**
  - Bármely $x \neq 0$ valós szám egyértelműen felírható a következő alakban:
    $$x = a \cdot 10^k$$
    ahol $1 \le |a| < 10$ ($a$ a mantissza) és $k \in \mathbb{Z}$ (a karakterisztika / nagyságrendi kitevő).
  - Ha $k > 0$: 10-nél nagyobb abszolút értékű számok (pl. $3{,}84 \cdot 10^5 \text{ km}$ a Föld-Hold távolság).
  - Ha $k < 0$: 1-nél kisebb pozitív számok (pl. $1{,}6 \cdot 10^{-19} \text{ C}$ az elektron töltése).

- **Műveletek normálalakú számokkal:**
  - **Szorzás:** $(a \cdot 10^k) \cdot (b \cdot 10^m) = (a \cdot b) \cdot 10^{k+m}$, majd ha $|a \cdot b| \ge 10$, a mantissza újra normálalakra igazítása.
  - **Osztás:** $\frac{a \cdot 10^k}{b \cdot 10^m} = \frac{a}{b} \cdot 10^{k-m}$.
  - **Összeadás és kivonás:** Csak azonos kitevőre hozás után végezhető el a mantisszák összevonásával.

- **Mértékegység-prefixumok (SI előtagok):**
  - Nagyok: tera ($10^{12}$), giga ($10^9$), mega ($10^6$), kilo ($10^3$).
  - Kicsik: milli ($10^{-3}$), mikro ($10^{-6}$), nano ($10^{-9}$), piko ($10^{-12}$).
