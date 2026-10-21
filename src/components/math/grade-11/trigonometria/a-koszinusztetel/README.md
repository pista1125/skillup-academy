# 12. A koszinusztétel (11. lecke)

## Tananyag Áttekintés
A koszinusztétel kimondása, bizonyítása és alkalmazása: a Pitagorasz-tétel általánosítása tetszőleges háromszögekre, oldalak és szögek egyértelmű kiszámítása.

---

## A Koszinusztétel és Képletei

- **A tétel kimondása:**
  - Bármely háromszögben egy oldal négyzete egyenlő a másik két oldal négyzetösszegének és a két oldal, valamint a közbezárt szög koszinusza kétszeres szorzatának különbségével:
    $$c^2 = a^2 + b^2 - 2ab \cdot \cos \gamma$$
    $$a^2 = b^2 + c^2 - 2bc \cdot \cos \alpha$$
    $$b^2 = a^2 + c^2 - 2ac \cdot \cos \beta$$

- **Kapcsolat a Pitagorasz-tétellel:**
  - Ha $\gamma = 90^\circ$, akkor $\cos 90^\circ = 0$, így visszakapjuk a $c^2 = a^2 + b^2$ tételt.
  - Ha $\gamma > 90^\circ$, $\cos \gamma < 0$, ezért $-2ab\cos \gamma > 0 \implies c^2 > a^2 + b^2$.
  - Ha $\gamma < 90^\circ$, $\cos \gamma > 0$, ezért $c^2 < a^2 + b^2$.

- **Szög kifejezése a három oldalból:**
  $$\cos \gamma = \frac{a^2 + b^2 - c^2}{2ab}$$
  - Előnye: A szög egyértelműen meghatározható (nincs kétértelműség, mint a szinusztételnél, mert $\cos$ előjele azonnal mutatja, hogy hegyesszög vagy tompaszög).
