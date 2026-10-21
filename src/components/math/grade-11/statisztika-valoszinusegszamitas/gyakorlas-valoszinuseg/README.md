# 14. Gyakorlás (64. lecke)

## Tananyag Áttekintés
Gyakorló feladatsor összetett valószínűségszámítási problémákra: visszatevéses és visszatevés nélküli mintavétel felismerése és kiszámítása, várható érték kalkulációk és szerencsejátékok elemzése.

---

## Fő Gyakorlati Elemek és Típusfeladatok

- **Modellfelismerési stratégia:**
  - Visszatevés nélküli (hipergeometrikus): kis sokaság esetén a húzások megváltoztatják a valószínűségeket $\to \frac{\binom{S}{k}\binom{N-S}{n-k}}{\binom{N}{n}}$.
  - Visszatevéses (binomiális): az esélyek nem változnak a kísérletek során $\to \binom{n}{k} p^k (1-p)^{n-k}$.

- **"Legalább egy" típusú kérdések:**
  - Annak valószínűsége, hogy 10 kockadobásból legalább egyszer hatost dobunk:
    $$P(\text{legalább 1 hatos}) = 1 - P(\text{nulla hatos}) = 1 - \left(\frac{5}{6}\right)^{10} \approx 1 - 0{,}1615 = 0{,}8385$$

- **Várható érték kiszámítása összetett játékokban:**
  - Például: tombola, lottósorsolás vagy rulett tétje és kifizetése.
