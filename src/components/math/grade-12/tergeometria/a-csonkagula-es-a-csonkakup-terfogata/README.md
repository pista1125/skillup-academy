# 18. A csonkagúla és a csonkakúp térfogata (18. lecke)

## Tananyag Áttekintés
A csonkagúla és a csonkakúp térfogatának levezetése a teljes és kiegészítő test térfogat-különbségéből, az általános csonka test térfogatképletének alkalmazása.

---

## 1. Az Általános Csonkagúla Térfogata

Legyen az alaplap területe $T_A$, a fedőlap területe $T_F$, és a magasság $m$:
$$V = \frac{m}{3} \left( T_A + \sqrt{T_A \cdot T_F} + T_F \right)$$

### A képlet levezetése (vázlat):
- A teljes gúla magassága $M = m + m_1$, a levágott csúcsgúla magassága $m_1$.
- A térfogat a két gúla különbsége: $V = \frac{1}{3}T_A M - \frac{1}{3}T_F m_1$.
- A hasonlóság miatt: $\frac{T_F}{T_A} = \left(\frac{m_1}{M}\right)^2 \implies \frac{\sqrt{T_F}}{\sqrt{T_A}} = \frac{m_1}{m + m_1}$.
- Átrendezve és behelyettesítve adódik az ismert képlet.

---

## 2. A Csonkakúp Térfogata

Behelyettesítve a körök területeit ($T_A = R^2\pi$ és $T_F = r^2\pi$):
$$\sqrt{T_A \cdot T_F} = \sqrt{R^2\pi \cdot r^2\pi} = Rr\pi$$
Ebből a csonkakúp térfogata:
$$V = \frac{m}{3} \left( R^2\pi + Rr\pi + r^2\pi \right) = \frac{m\pi}{3} \left( R^2 + Rr + r^2 \right)$$

---

## Szélsőérték Vizsgálat (Összevetés)

- Ha $r = 0$ (a fedőlap ponttá zsugorodik $\to$ kúp):
  $$V = \frac{m\pi}{3}(R^2 + 0 + 0) = \frac{R^2\pi m}{3} \quad \checkmark$$
- Ha $r = R$ (a fedőlap és alaplap egyenlő $\to$ henger):
  $$V = \frac{m\pi}{3}(R^2 + R^2 + R^2) = \frac{m\pi}{3}(3R^2) = R^2\pi m \quad \checkmark$$
