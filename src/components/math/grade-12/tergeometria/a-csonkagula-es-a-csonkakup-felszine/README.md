# 17. A csonkagúla és a csonkakúp felszíne (17. lecke)

## Tananyag Áttekintés
A csonkagúla és a csonkakúp felszínének meghatározása, a palást kiterítése (körgyűrűcikk), és a trapéz oldallapok összegzése.

---

## 1. Csonkagúla Felszíne

Általánosan az alaplap ($T_A$), a fedőlap ($T_F$) és a palást ($T_p$) összege:
$$A = T_A + T_F + T_p$$

### Szabályos csonkagúla esetén:
Ha az alaplap $a$ élű, a fedőlap $b$ élű szabályos $n$-szög, az oldallapok pedig $m_o$ magasságú húrtrapézok:
- Egy oldallap trapéz területe: $T_{\text{trapéz}} = \frac{a + b}{2} \cdot m_o$
- A palást területe: $T_p = n \cdot \frac{a + b}{2} \cdot m_o = \frac{K_A + K_F}{2} \cdot m_o$
$$A = T_A + T_F + \frac{K_A + K_F}{2} \cdot m_o$$

---

## 2. Csonkakúp Felszíne

Legyen az alaplap sugara $R$, a fedőlap sugara $r$, és az alkotó hossza $a$:
- **Alaplap területe:** $T_A = R^2\pi$
- **Fedőlap területe:** $T_F = r^2\pi$
- **Palást területe:** A kiterített felület egy körgyűrűcikk, amelynek területe:
  $$T_p = (R + r)\pi a$$
  *(Értelmezhető úgy is, mint a palást két határoló kör kerületének átlaga szorozva az alkotóval: $T_p = \frac{2R\pi + 2r\pi}{2} \cdot a$)*

### Teljes Felszín Képlete:
$$A = T_A + T_F + T_p = R^2\pi + r^2\pi + (R + r)\pi a = \pi \left[ R^2 + r^2 + (R + r)a \right]$$

---

## Alkotó Számítása
Ha az $m$ magasság és a sugarak adottak:
$$a = \sqrt{m^2 + (R - r)^2}$$
