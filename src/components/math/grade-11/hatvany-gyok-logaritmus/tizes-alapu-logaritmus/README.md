# 11. A tízes alapú logaritmus használata (36. lecke)

## Tananyag Áttekintés
A tízes alapú (Briggs-féle) logaritmus ($\lg x$), számológépes használata, nagyságrendi becslések, a természetes logaritmus ($\ln x$) és a logaritmikus skálák a természettudományokban.

---

## Fő Fogalmak és Alkalmazások

- **Tízes alapú logaritmus ($\lg x$):**
  - $\lg x = \log_{10} x \quad (x > 0)$
  - $10^{\lg x} = x$
  - Egész értékek: $\lg 1000 = 3$, $\lg 100 = 2$, $\lg 10 = 1$, $\lg 1 = 0$, $\lg 0{,}1 = -1$, $\lg 0{,}001 = -3$.
  - Ha egy egész szám $k$ jegyű, akkor $10^{k-1} \le N < 10^k$, így $k - 1 \le \lg N < k$.

- **Természetes logaritmus ($\ln x$):**
  - $\ln x = \log_e x$, ahol $e \approx 2{,}71828$ az Euler-féle szám.

- **Áttérés új alapra (bázisváltó formula):**
  - Bármilyen alapú logaritmus kiszámítható tízes alapú vagy természetes logaritmussal:
    $$\log_a b = \frac{\lg b}{\lg a} = \frac{\ln b}{\ln a} \quad (a, b > 0, a \neq 1)$$

- **Gyakorlati logaritmikus skálák:**
  - **pH érték (kémia):** $\text{pH} = -\lg[\text{H}^+]$
  - **Richter-skála (földrengések energiája):** $M = \frac{2}{3} \lg\left(\frac{E}{E_0}\right)$
  - **Decibel skála (hangnyomásszint):** $L = 10 \lg\left(\frac{I}{I_0}\right)$
