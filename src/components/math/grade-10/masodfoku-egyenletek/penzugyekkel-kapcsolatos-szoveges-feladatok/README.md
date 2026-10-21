# 9. Pénzügyekkel kapcsolatos szöveges feladatok (37. lecke)

## Tananyag Áttekintés
Gyakorlati gazdasági és pénzügyi szituációk matematikai modellezése másodfokú egyenletekkel: kétszeri egymást követő százalékos árváltozások, kamatos kamatszámítás 2 éves futamidőre, profitmaximalizálás és egységárak.

---

## Fő Témakörök és Modellek

- **Kétszeri egymást követő árváltozás:**
  - Ha az ár először $p\%$-kal nőtt, majd $p\%$-kal csökkent:
    $$Á_{\text{új}} = Á_0 \cdot \left(1 + \frac{p}{100}\right) \cdot \left(1 - \frac{p}{100}\right) = Á_0 \cdot \left(1 - \frac{p^2}{10000}\right)$$
  - Ha az új ár adott, a $p$ százaléklábra másodfokú egyenletet kapunk.

- **Két periódusos kamatos kamat:**
  - $T_2 = T_0 \cdot q^2$, ahol $q = 1 + \frac{p}{100}$ a kamattényező.
  - Ha a végső tőke adott, $q$ meghatározására $q^2 = \frac{T_2}{T_0}$ másodfokú egyenlet vezet.

- **Közös vásárlás és hozzájárulások:**
  - Egy rögzített összeg felosztása több ember között: ha $k$ ember visszalép, a többieknek fejenként többet kell fizetniük $\rightarrow$ törtes másodfokú egyenlet.
