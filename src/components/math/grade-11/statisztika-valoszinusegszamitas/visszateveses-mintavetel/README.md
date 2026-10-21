# 13. Visszatevéses mintavétel (63. lecke)

## Tananyag Áttekintés
Visszatevéses mintavétel mint a Bernoulli-féle független kísérletsorozat egyik legfontosabb formája: az esélyek állandósága, minőségellenőrzési és közvélemény-kutatási modellek.

---

## Fő Jellemzők és Képletek

- **A modell működése:**
  - Minden húzás után a kihúzott elemet visszatesszük a sokaságba (urnába), és alaposan összekeverjük.
  - A sokaság mérete és összetétele minden húzás előtt pontosan ugyanaz ($N$).
  - A siker valószínűsége állandó: $p = \frac{S}{N}$.

- **A kísérlet leírása:**
  - $n$ darab visszatevéses húzás esetén a sikerek száma binomiális eloszlást követ:
    $$P(X = k) = \binom{n}{k} p^k (1 - p)^{n-k}$$

- **Várható érték és szórás binomiális eloszlásnál:**
  - Várható érték:
    $$E(X) = n \cdot p$$
  - Szórás:
    $$\sigma = \sqrt{n \cdot p \cdot (1 - p)}$$
  - Példa: 100 dobás szabályos kockával, a 6-osok várható száma: $100 \cdot \frac{1}{6} \approx 16{,}67$.
