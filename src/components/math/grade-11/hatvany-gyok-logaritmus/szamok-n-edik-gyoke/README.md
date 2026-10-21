# 2. Számok n-edik gyöke (27. lecke)

## Tananyag Áttekintés
A négyzetgyök fogalmának általánosítása tetszőleges $n$-edik gyökre ($n \in \mathbb{N}, n \ge 2$), páros és páratlan kitevőjű gyökök tulajdonságai és a gyökvonás azonosságai.

---

## Fő Fogalmak és Definíciók

- **Páros gyökkitevő ($n = 2k$):**
  - Egy nemnegatív $a$ valós szám $2k$-adik gyökén azt a nemnegatív valós számot értjük, amelynek $2k$-adik hatványa $a$.
  - Jelölés: $\sqrt[2k]{a}$, feltétel: $a \ge 0$, és $\sqrt[2k]{a} \ge 0$.
  - $\sqrt[2k]{a^{2k}} = |a|$ (abszolútérték kötelező!).

- **Páratlan gyökkitevő ($n = 2k+1$):**
  - Bármely $a \in \mathbb{R}$ szám $(2k+1)$-edik gyöke az az egyértelmű valós szám, amelynek $(2k+1)$-edik hatványa $a$.
  - Negatív számokból is vonható páratlan gyök: $\sqrt[3]{-8} = -2$.

- **A gyökvonás alapazonosságai ($a, b \ge 0$ esetén):**
  - Szorzat gyöke: $\sqrt[n]{a \cdot b} = \sqrt[n]{a} \cdot \sqrt[n]{b}$
  - Hányados gyöke: $\sqrt[n]{\frac{a}{b}} = \frac{\sqrt[n]{a}}{\sqrt[n]{b}}$ ($b > 0$)
  - Gyök hatványa: $(\sqrt[n]{a})^k = \sqrt[n]{a^k}$
  - Gyök gyöke: $\sqrt[m]{\sqrt[n]{a}} = \sqrt[m \cdot n]{a}$
  - Gyökkitevő bővítése/egyszerűsítése: $\sqrt[n]{a^k} = \sqrt[n \cdot p]{a^{k \cdot p}}$ ($p \in \mathbb{Z}^+$)
