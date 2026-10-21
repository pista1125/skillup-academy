# 10. A logaritmus fogalma (35. lecke)

## Tananyag Áttekintés
A logaritmus fogalma mint a hatványozás egyik megfordított művelete: a kitevő keresése adott alap és hatványérték esetén. Definíció, kikötések és alapvető azonosságok.

---

## Fő Definíció és Tulajdonságok

- **A logaritmus definíciója:**
  - Legyen $a > 0, a \neq 1$ és $b > 0$. Ekkor $\log_a b$ az a valós kitevő, amelyre az $a$ alapot emelve $b$-t kapunk:
    $$\log_a b = c \iff a^c = b$$
  - Alapvető azonosság:
    $$a^{\log_a b} = b \quad (b > 0)$$

- **Miért szükségesek a kikötések?**
  - $a > 0$: negatív alap esetén nem értelmezhető minden valós kitevőre a hatványozás.
  - $a \neq 1$: $1^c = 1$ mindig, így nem létezne egyértelmű kitevő (vagy nincs megoldás, ha $b \neq 1$).
  - $b > 0$: pozitív alap bármely valós kitevőjű hatványa mindig szigorúan pozitív!

- **Alapvető logaritmus értékek:**
  - $\log_a 1 = 0$, mert $a^0 = 1$
  - $\log_a a = 1$, mert $a^1 = a$
  - $\log_a (a^k) = k$

- **A három művelet kapcsolata:**
  - $a^c = b$ (hatványozás: keressük $b$-t)
  - $\sqrt[c]{b} = a$ (gyökvonás: keressük az alapot, $a$-t)
  - $\log_a b = c$ (logaritmus: keressük a kitevőt, $c$-t)
