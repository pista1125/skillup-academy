# 27. A mértani sorozat első n tagjának összege (27. lecke)

## Tananyag Áttekintés
A mértani sorozat első $n$ tagjának összege ($S_n$), az összegképlet levezetése, alkalmazása exponenciális növekedési folyamatokban és legendás problémákban (sakktábla-búzaszemek).

---

## Az Összegképlet Levezetése

Írjuk fel az első $n$ tag összegét:
$$S_n = a_1 + a_1 q + a_1 q^2 + \dots + a_1 q^{n-1}$$

Szorozzuk be mindkét oldalt $q$-val:
$$q \cdot S_n = a_1 q + a_1 q^2 + \dots + a_1 q^{n-1} + a_1 q^n$$

Vonjuk ki a második egyenletből az elsőt (a közbenső tagok mind kiesnek!):
$$q \cdot S_n - S_n = a_1 q^n - a_1$$
$$S_n(q - 1) = a_1(q^n - 1)$$

Ha $q \neq 1$, akkor osztva $(q - 1)$-gyel:
$$S_n = a_1 \cdot \frac{q^n - 1}{q - 1} = a_1 \cdot \frac{1 - q^n}{1 - q}$$

- **Különleges eset ($q = 1$):**
  Ekkor minden tag $a_1$, így:
  $$S_n = n \cdot a_1$$

---

## Mintapélda: A Sakktábla Legendája

> **A legenda:** A sakk feltalálója jutalmul azt kérte a királytól, hogy a sakktábla 1. mezőjére tegyenek 1 búzaszemet, a 2. mezőre 2-t, a 3. mezőre 4-et, és minden további mezőre az előző kétszeresét.
>
> **Kérdés:** Hány búzaszem jár a 64 mezőre összesen?
>
> **Megoldás:**
> Ez egy mértani sorozat: $a_1 = 1$, $q = 2$, $n = 64$.
> $$S_{64} = 1 \cdot \frac{2^{64} - 1}{2 - 1} = 2^{64} - 1$$
> $$2^{64} - 1 \approx 1{,}845 \times 10^{19} \text{ búzaszem}$$
> *(Ez a mennyiség a Föld mai teljes éves búzatermésének több mint 1000-szerese!)*
