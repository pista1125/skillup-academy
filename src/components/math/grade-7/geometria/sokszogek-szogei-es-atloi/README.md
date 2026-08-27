# 3. Sokszögek szögei és átlói (7. osztály)

## Tananyag Áttekintés
Konvex sokszögek tulajdonságai: egy csúcsból induló és összes átló száma, belső szögek összege, külső szögek összege és a szabályos sokszögek szögképletei.

---

## Főbb Képletek és Törvényszerűségek

Egy konvex $n$-oldalú sokszög esetén ($n \ge 3$):

### 1. Átlók Száma
- **Egy csúcsból húzható átlók száma:**
  $$d_1 = n - 3$$
  *(Önmagába és a 2 szomszédos csúcsba nem húzható átló).*
- **Egy csúcsból húzott átlók által felosztott háromszögek száma:**
  $$h = n - 2$$
- **Az összes átló száma:**
  $$d_n = \frac{n \cdot (n - 3)}{2}$$

#### Példák átlók számára:
- Négyszög ($n = 4$): $\frac{4 \cdot 1}{2} = \mathbf{2}$ átló.
- Ötszög ($n = 5$): $\frac{5 \cdot 2}{2} = \mathbf{5}$ átló.
- Hatszög ($n = 6$): $\frac{6 \cdot 3}{2} = \mathbf{9}$ átló.
- Nyolcszög ($n = 8$): $\frac{8 \cdot 5}{2} = \mathbf{20}$ átló.

---

### 2. Szögek Összege
- **Belső szögek összege ($S_n$):**
  $$S_n = (n - 2) \cdot 180^\circ$$
  - Háromszög ($n=3$): $(3-2)\cdot 180^\circ = 180^\circ$
  - Négyszög ($n=4$): $(4-2)\cdot 180^\circ = 360^\circ$
  - Ötszög ($n=5$): $(5-2)\cdot 180^\circ = 540^\circ$
  - Hatszög ($n=6$): $(6-2)\cdot 180^\circ = 720^\circ$

- **Külső szögek összege:**
  $$\sum \alpha_i' = \mathbf{360^\circ} \quad (\text{mindig állandó bármely konvex sokszögre!})$$

---

### 3. Szabályos Sokszögek Szögei
Egy szabályos $n$-oldalú sokszög minden oldala és minden belső szöge egyenlő:
- **Egy belső szög nagysága ($\alpha$):**
  $$\alpha = \frac{(n - 2) \cdot 180^\circ}{n}$$
- **Egy külső szög nagysága ($\alpha'$):**
  $$\alpha' = \frac{360^\circ}{n}$$
  *(Pl. szabályos ötszög: $\alpha' = 360^\circ : 5 = 72^\circ \implies \alpha = 180^\circ - 72^\circ = 108^\circ$).*
