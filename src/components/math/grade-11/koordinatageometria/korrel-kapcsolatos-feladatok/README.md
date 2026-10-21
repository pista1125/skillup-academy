# 12. Körrel kapcsolatos feladatok (76. lecke)

## Tananyag Áttekintés
Kör és pont kölcsönös helyzete, kör és egyenes metszéspontjai, kör érintőjének egyenlete adott érintési pontban és külső pontból húzott érintők.

---

## Fő Típusfeladatok és Módszerek

- **Pont és kör helyzete:**
  - Behelyettesítve a $P(x_0; y_0)$ koordinátáit a kör egyenletének bal oldalába ($S = (x_0 - u)^2 + (y_0 - v)^2$):
    - Ha $S < r^2$: $P$ a körön **belül** van.
    - Ha $S = r^2$: $P$ a körvonalon **rajta** van.
    - Ha $S > r^2$: $P$ a körön **kívül** van.

- **Kör és egyenes metszéspontjai:**
  - Az egyenes elsőfokú és a kör másodfokú egyenletéből álló egyenletrendszer megoldása:
    - Két valós gyök ($D > 0$): szelő (két metszéspont).
    - Egy valós gyök ($D = 0$): érintő (egy érintési pont).
    - Nincs valós gyök ($D < 0$): elkerülő egyenes.

- **Kör érintője az érintési pontban ($E(x_E; y_E)$):**
  - A középpontból az érintési pontba mutató sugárvektor ($\vec{KE}$) maga az érintő egy normálvektora:
    $$\vec{n} = \vec{KE} = (x_E - u; \; y_E - v)$$
  - Az érintő egyenlete:
    $$(x_E - u)(x - u) + (y_E - v)(y - v) = r^2$$
