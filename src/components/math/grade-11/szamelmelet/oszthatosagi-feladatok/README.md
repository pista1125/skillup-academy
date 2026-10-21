# 6. Oszthatósági feladatok (47. lecke)

## Tananyag Áttekintés
Összetett számelméleti feladatok megoldása: algebrai kifejezések oszthatóságának vizsgálata, szorzattá alakítás, egymást követő számok szorzata és diofantoszi egyenletek.

---

## Fő Megoldási Technikák és Példák

- **Szorzattá alakítás oszthatósági vizsgálathoz:**
  - Példa: Bizonyítsuk be, hogy $n^3 - n$ mindig osztható 6-tal ($n \in \mathbb{Z}$)!
    $$n^3 - n = n(n^2 - 1) = (n - 1)n(n + 1)$$
    - Három egymást követő egész szám között legalább egy osztható 2-vel és pontosan egy osztható 3-mal, így a szorzat osztható $2 \cdot 3 = 6$-tal.

- **Esetszétválasztás osztási maradékok szerint:**
  - Egy tetszőleges egész szám négyzete 3-mal osztva csak 0 vagy 1 maradékot adhat:
    - Ha $n = 3k \implies n^2 = 9k^2 = 3(3k^2)$ (maradék 0)
    - Ha $n = 3k \pm 1 \implies n^2 = 9k^2 \pm 6k + 1 = 3(3k^2 \pm 2k) + 1$ (maradék 1)

- **Lineáris diofantoszi egyenlet:**
  - $a \cdot x + b \cdot y = c$ ($a, b, c \in \mathbb{Z}$) pontosan akkor oldható meg egész számokon, ha $\text{LNKO}(a, b) \mid c$.
