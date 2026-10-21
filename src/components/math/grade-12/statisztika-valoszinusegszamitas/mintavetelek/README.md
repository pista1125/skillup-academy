# 42. Mintavételek (42. lecke)

## Tananyag Áttekintés
A visszatevéses és visszatevés nélküli mintavétel matematikai modelljei: a binomiális eloszlás Bernoulli-kísérletekre, valamint a hipergeometrikus eloszlás (lottó, selejtarány) alkalmazása.

---

## 1. Visszatevéses Mintavétel (Binomiális Eloszlás)

- **Modell:** Egy kísérletet $n$-szer egymástól **függetlenül** megismétlünk. Minden egyes lépésben a "kedvező" esemény bekövetkezésének valószínűsége állandó: $p$, a kedvezőtlené $q = 1 - p$.
- **Kérdés:** Mekkora a valószínűsége, hogy az $n$ kísérletből pontosan $k$-szor következik be a kedvező esemény?
- **Képlet (Binomiális tétel szerint):**
  $$P(X = k) = \binom{n}{k} \cdot p^k \cdot (1 - p)^{n - k} \quad (k = 0, 1, 2, \dots, n)$$
  - $\binom{n}{k}$: a kedvező kimenetelek kiválasztásának sorrendjei száma.
- **Várható érték és szórás:**
  $$E(X) = n \cdot p, \quad D(X) = \sqrt{n \cdot p \cdot (1 - p)}$$

---

## 2. Visszatevés Nélküli Mintavétel (Hipergeometrikus Eloszlás)

- **Modell:** Egy $N$ elemű sokaságban $M$ darab kedvező (pl. nyerő szám, hibátlan termék) és $N - M$ darab nem kedvező elem van. Visszatevés nélkül (vagy egyszerre) kihúzunk $n$ elemet.
- **Kérdés:** Mekkora a valószínűsége, hogy a kihúzottak között pontosan $k$ darab kedvező elem lesz?
- **Képlet:**
  $$P(X = k) = \frac{\binom{M}{k} \cdot \binom{N - M}{n - k}}{\binom{N}{n}}$$

---

## Mintapélda: Ötöslottó Találatok

Az ötöslottón 90 számból 5-öt húznak ki ($N = 90, n = 5$). Mi 5 számot jelöltünk be ($M = 5$).
- **Telitalálat ($k = 5$):**
  $$P(5\text{ találat}) = \frac{\binom{5}{5} \cdot \binom{85}{0}}{\binom{90}{5}} = \frac{1}{\binom{90}{5}} \approx \frac{1}{43\ 949\ 268}$$
- **Négyes találat ($k = 4$):**
  $$P(4\text{ találat}) = \frac{\binom{5}{4} \cdot \binom{85}{1}}{\binom{90}{5}} = \frac{5 \cdot 85}{43\ 949\ 268} \approx \frac{1}{103\ 410}$$
- **Hármas találat ($k = 3$):**
  $$P(3\text{ találat}) = \frac{\binom{5}{3} \cdot \binom{85}{2}}{\binom{90}{5}} = \frac{10 \cdot 3570}{43\ 949\ 268} \approx \frac{1}{1231}$$
