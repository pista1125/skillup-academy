# 7. Gyakorlás (22. lecke)

## Tananyag Áttekintés
Kombinatorikai feladatok elmélyítése: korlátozott feltételek, ismétléses kombinációk, rácsséta-feladatok és skatulya-elv alkalmazása.

---

## Fő Gyakorló Feladattípusok

- **Ismétléses kombináció ($C_n^{k, \text{ism}}$):**
  - $n$ fajta elemből $k$ darab kiválasztása, ha azonos típusúból többet is választhatunk:
    $$C_n^{k, \text{ism}} = \binom{n + k - 1}{k}$$
  - Példa: Golyók elosztása dobozokba, fagylaltgombócok választása.

- **Rácsséta feladatok:**
  - $m \times n$-es rácson lépkedve csak jobbra és felfelé:
    $$\binom{m + n}{m} = \binom{m + n}{n}$$

- **A skatulya-elv (Dirichlet-elv):**
  - Ha $n+1$ elemet osztunk szét $n$ dobozba, akkor legalább egy dobozba egynél több elem kerül.
