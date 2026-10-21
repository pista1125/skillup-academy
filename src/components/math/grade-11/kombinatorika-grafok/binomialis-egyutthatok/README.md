# 4. Binomiális együtthatók (19. lecke)

## Tananyag Áttekintés
A $\binom{n}{k}$ binomiális együtthatók algebrai és kombinatorikai tulajdonságai, a Pascal-háromszög szerkezete és a binomiális tétel: $(a+b)^n$ kifejtése.

---

## Fő Azonosságok és Tételek

- **A binomiális együtthatók alaptulajdonságai:**
  - $\binom{n}{0} = \binom{n}{n} = 1$
  - $\binom{n}{1} = \binom{n}{n-1} = n$
  - **Szimmetria:** $\binom{n}{k} = \binom{n}{n-k}$
  - **Pascal-azonosság (összeadási szabály):**
    $$\binom{n}{k} + \binom{n}{k+1} = \binom{n+1}{k+1}$$

- **A Pascal-háromszög:**
  - A háromszög $n$-edik sorának elemei éppen az $\binom{n}{0}, \binom{n}{1}, \dots, \binom{n}{n}$ értékek.
  - A sorösszeg: $\sum_{k=0}^n \binom{n}{k} = 2^n$ (az $n$-elemű halmaz összes részhalmazának száma).

- **A binomiális tétel:**
  $$(a + b)^n = \sum_{k=0}^n \binom{n}{k} a^{n-k} b^k = \binom{n}{0} a^n + \binom{n}{1} a^{n-1}b + \dots + \binom{n}{n} b^n$$
