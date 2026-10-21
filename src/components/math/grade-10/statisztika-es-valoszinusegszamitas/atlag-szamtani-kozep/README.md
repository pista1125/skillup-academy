# 1. Átlag, számtani közép (51. lecke)

## Tananyag Áttekintés
A számtani közép (átlag) alapfogalma, kiszámításának algoritmusa és tulajdonságai: hogyan jellemezhetünk egy adathalmazt egyetlen középértékkel, és mikor félrevezető az átlag használata.

---

## Fő Fogalmak és Képletek

- **Egyszerű számtani közép ($\bar{x}$):**
  - $\bar{x} = \frac{x_1 + x_2 + \dots + x_n}{n} = \frac{\sum_{i=1}^n x_i}{n}$
  - Az elemek összege osztva az elemek számával.

- **Súlyozott számtani közép:**
  - Ha az egyes értékek különböző gyakorisággal vagy súllyal fordulnak elő:
  - $\bar{x} = \frac{f_1 x_1 + f_2 x_2 + \dots + f_k x_k}{f_1 + f_2 + \dots + f_k}$

- **Tulajdonságok és érzékenység:**
  - Az átlagtól vett előjeles eltérések összege mindig 0: $\sum (x_i - \bar{x}) = 0$.
  - Az átlag érzékeny a kiugró értékekre (outlierekre).
