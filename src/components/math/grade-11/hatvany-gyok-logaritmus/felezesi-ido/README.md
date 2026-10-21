# 9. Felezési idő (34. lecke)

## Tananyag Áttekintés
Radioaktív bomlás és exponenciális csillapodás vizsgálata: a felezési idő fogalma, bomlástörvény és radiometrikus kormeghatározás (pl. C-14 izotóp).

---

## Fő Fogalmak és Képletek

- **A felezési idő ($T_{1/2}$):**
  - Az az időtartam, amely alatt egy radioaktív izotóp atommagjainak száma vagy egy hatóanyag koncentrációja a felére csökken.

- **A radioaktív bomlástörvény:**
  - $$N(t) = N_0 \cdot \left(\frac{1}{2}\right)^{\frac{t}{T_{1/2}}} = N_0 \cdot 2^{-\frac{t}{T_{1/2}}}$$
    - $N_0$: kezdeti magok száma ($t = 0$)
    - $N(t)$: el nem bomlott magok száma $t$ idő elteltével
    - $t$: eltelt idő
    - $T_{1/2}$: felezési idő (ugyanolyan mértékegységben, mint $t$)

- **Alkalmazások:**
  - **Radiokarbon kormeghatározás (C-14):**
    - A szén 14-es izotópjának felezési ideje kb. 5730 év.
    - Elhalt élőlények maradványaiban a megmaradt C-14 arányából következtetnek az életkorra:
      $$\frac{N(t)}{N_0} = \left(\frac{1}{2}\right)^{\frac{t}{5730}} \implies t = 5730 \cdot \frac{\log(N(t)/N_0)}{\log(0{,}5)}$$
  - Gyógyszerek kiürülése az emberi szervezetből (farmakokinetikai felezési idő).
