# 9. Egyenesek a koordináta-rendszerben (73. lecke)

## Tananyag Áttekintés
Az egyenes egyértelmű megadása a koordinátasíkon: pont és irányvektor, pont és normálvektor, két pont által meghatározott egyenes.

---

## Fő Fogalmak és Vektoros Jellemzők

- **Irányvektor ($\vec{v}(v_1; v_2)$):**
  - Olyan nemnulla vektor, amely párhuzamos az egyenessel.
  - Két pont ($A(x_1; y_1)$ és $B(x_2; y_2)$) esetén egy lehetséges irányvektor:
    $$\vec{v} = \vec{AB} = (x_2 - x_1; \; y_2 - y_1)$$

- **Normálvektor ($\vec{n}(A; B)$):**
  - Olyan nemnulla vektor, amely merőleges az egyenesre.
  - Irányvektorból normálvektor képzése ($90^\circ$-os elforgatással):
    - Ha $\vec{v}(v_1; v_2)$, akkor $\vec{n}(-v_2; v_1)$ vagy $\vec{n}(v_2; -v_1)$.
    - Mivel $\vec{v} \cdot \vec{n} = v_1(-v_2) + v_2(v_1) = 0$ (skaláris szorzatuk nulla).

- **Pont és vektor kapcsolata:**
  - Ha az egyenes átmegy a $P_0(x_0; y_0)$ ponton, akkor a rajta lévő tetszőleges $P(x; y)$ pont esetén:
    - $\vec{P_0P} \parallel \vec{v}$ (irányvektorral párhuzamos)
    - $\vec{P_0P} \perp \vec{n}$ (normálvektorra merőleges)
