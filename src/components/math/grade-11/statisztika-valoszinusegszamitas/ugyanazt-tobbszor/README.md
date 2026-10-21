# 12. Ugyanazt többször (62. lecke)

## Tananyag Áttekintés
Független kísérletek sorozata (Bernoulli-kísérletek): ugyanannak a kísérletnek az ismétlése változatlan valószínűségekkel, a binomiális eloszlás felépítése és képlete.

---

## Fő Fogalmak és Képletek

- **Független kísérletsorozat:**
  - Egy kísérletet $n$-szer végzünk el azonos körülmények között (pl. érmedobás, kockadobás, tesztkitöltés).
  - Az egyes kísérletek eredményei teljesen függetlenek egymástól.
  - Siker valószínűsége egy menetben: $p$.
  - Kudarc valószínűsége: $q = 1 - p$.

- **A binomiális eloszlás képlete ($B(n, p)$):**
  - Annak valószínűsége, hogy az $n$ kísérletből pontosan $k$ alkalommal következik be a siker:
    $$P(X = k) = \binom{n}{k} \cdot p^k \cdot (1 - p)^{n - k} \quad (k = 0, 1, 2, \dots, n)$$
  - Magyarázat:
    - $p^k$: a $k$ darab siker valószínűsége
    - $(1-p)^{n-k}$: az $n-k$ darab kudarc valószínűsége
    - $\binom{n}{k}$: a sikerek lehetséges helyei az $n$ menet során

- **Példa:**
  - Egy szabályos dobókockával 5-ször dobunk. Pontosan 2-szer dobtunk hatost:
    $$P = \binom{5}{2} \cdot \left(\frac{1}{6}\right)^2 \cdot \left(\frac{5}{6}\right)^3 = 10 \cdot \frac{1}{36} \cdot \frac{125}{216} \approx 0{,}161$$
