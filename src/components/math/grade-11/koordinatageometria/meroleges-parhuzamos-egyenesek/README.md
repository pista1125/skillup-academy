# 15. Merőleges, párhuzamos egyenesek (79. lecke)

## Tananyag Áttekintés
Párhuzamos és merőleges egyenesek algebrai és vektoros feltételei: normálvektorok, irányvektorok és meredekségek kapcsolata, valamint pont és egyenes távolsága.

---

## Fő Feltételek és Képletek

- **Párhuzamosság feltétele ($e_1 \parallel e_2$):**
  - Normálvektoraik párhuzamosak: $\vec{n}_1 \parallel \vec{n}_2 \implies \vec{n}_2 = \lambda \vec{n}_1$.
  - Meredekségeik egyenlőek:
    $$m_1 = m_2$$
  - Párhuzamos egyenes egyenlete: $A x + B y = C'$ (csak a konstans tag változik!).

- **Merőlegesség feltétele ($e_1 \perp e_2$):**
  - Normálvektoraik merőlegesek, azaz skaláris szorzatuk nulla:
    $$\vec{n}_1 \cdot \vec{n}_2 = 0 \iff A_1 A_2 + B_1 B_2 = 0$$
  - Meredekségeik szorzata $-1$ (negatív reciprok):
    $$m_1 \cdot m_2 = -1 \iff m_2 = -\frac{1}{m_1}$$
  - Merőleges egyenes normálvektora $(-B; A)$, egyenlete: $B x - A y = C''$.

- **Pont és egyenes távolsága:**
  - A $P(x_0; y_0)$ pont távolsága az $A x + B y + C = 0$ egyenestől:
    $$d(P, e) = \frac{|A x_0 + B y_0 + C|}{\sqrt{A^2 + B^2}}$$
