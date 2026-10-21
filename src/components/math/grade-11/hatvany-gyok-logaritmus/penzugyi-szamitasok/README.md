# 6. Pénzügyi számítások (31. lecke)

## Tananyag Áttekintés
Gyakorlati pénzügyi matematika: egyszerű és kamatos kamatozás, tőkésítés, futamidő, infláció és jövőérték számítása hatványozás segítségével.

---

## Fő Fogalmak és Képletek

- **Egyszerű kamat:**
  - Ha a kamatot minden periódus végén kifizetik (nem tőkésítik):
    $$K = T_0 \cdot \frac{p}{100} \cdot n$$
    $$T_n = T_0 \cdot \left(1 + n \cdot \frac{p}{100}\right)$$

- **Kamatos kamat (éves tőkésítés):**
  - Ha a kamat a tőkéhez adódik, és a következő időszakban maga is kamatozik:
    $$T_n = T_0 \cdot \left(1 + \frac{p}{100}\right)^n = T_0 \cdot q^n$$
    - $T_0$: kezdőtőke
    - $p$: éves kamatláb (%)
    - $q = 1 + \frac{p}{100}$: kamattényező (növekedési szorzó)
    - $n$: futamidő (évek száma)

- **Gyakoribb tőkésítés (évi $m$ alkalommal):**
  - $$T_n = T_0 \cdot \left(1 + \frac{p}{100 \cdot m}\right)^{n \cdot m}$$

- **Kezdőtőke, kamatláb és futamidő visszakeresése:**
  - Kezdőtőke: $T_0 = \frac{T_n}{q^n}$
  - Kamattényező: $q = \sqrt[n]{\frac{T_n}{T_0}}$ (gyökvonással)
  - Futamidő: $n = \log_q \left(\frac{T_n}{T_0}\right)$ (logaritmussal)
