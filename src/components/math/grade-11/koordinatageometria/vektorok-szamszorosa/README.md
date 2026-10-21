# 3. Vektorok számszorosa (68. lecke)

## Tananyag Áttekintés
Vektor szorzása valós számmal (skalárral): nagyság és irány változása, párhuzamosság (kollinearitás) és a disztributivitási azonosságok.

---

## Fő Fogalmak és Szabályok

- **A számszoros definíciója:**
  - Legyen $\vec{a}$ tetszőleges vektor és $\lambda \in \mathbb{R}$ valós szám. Ekkor a $\lambda \vec{a}$ vektor:
    - Hossza: $|\lambda \vec{a}| = |\lambda| \cdot |\vec{a}|$
    - Iránya:
      - ha $\lambda > 0$: azonos irányú $\vec{a}$-val
      - ha $\lambda < 0$: ellentétes irányú $\vec{a}$-val
      - ha $\lambda = 0$ vagy $\vec{a} = \vec{0}$: $\lambda \vec{a} = \vec{0}$

- **Párhuzamos vektorok (kollinearitás):**
  - Két nemnulla vektor ($\vec{a}$ és $\vec{b}$) pontosan akkor párhuzamos, ha létezik olyan $\lambda \neq 0$ valós szám, amelyre:
    $$\vec{b} = \lambda \cdot \vec{a}$$

- **Műveleti azonosságok ($\lambda, \mu \in \mathbb{R}$):**
  - $\lambda (\mu \vec{a}) = (\lambda \mu) \vec{a}$
  - $(\lambda + \mu) \vec{a} = \lambda \vec{a} + \mu \vec{a}$
  - $\lambda (\vec{a} + \vec{b}) = \lambda \vec{a} + \lambda \vec{b}$
