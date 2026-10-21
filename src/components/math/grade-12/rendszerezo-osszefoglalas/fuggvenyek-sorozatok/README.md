# 3. Függvények, sorozatok (Rendszerező összefoglalás)

## Fejezet Áttekintés
A középiskolai függvénytan teljes áttekintése: függvényjellemzés, függvénytranszformációk, alapfüggvények grafikonja és tulajdonságai, valamint a számtani és mértani sorozatok és pénzügyi matematika összefoglalása.

---

## 1. Függvényjellemzés Szempontjai

1. **Értelmezési tartomány ($D_f$):** Azon valós számok, amelyekre a függvény kiszámítható (nevező $\neq 0$, páros gyök alatt $\ge 0$, logaritmus argumentuma $> 0$).
2. **Értékkészlet ($R_f$):** A felvett függvényértékek halmaza.
3. **Zérushely(ek):** Azon $x$ értékek, ahol $f(x) = 0$ (metszéspont az $x$-tengellyel).
4. **Tengelymetszet az $y$-tengellyel:** $f(0)$ értéke (ha $0 \in D_f$).
5. **Monotonitás:** Szigorúan monoton növő / csökkenő szakaszok.
6. **Szélsőérték:** Globális és lokális minimum, maximum (hely és érték megadása!).
7. **Paritás:**
   - Páros függvény: $f(-x) = f(x)$ $\implies$ tengelyesen szimmetrikus az $y$-tengelyre (pl. $x^2, \cos x, |x|$).
   - Páratlan függvény: $f(-x) = -f(x)$ $\implies$ középpontosan szimmetrikus az origóra (pl. $x^3, \sin x, \frac{1}{x}$).
8. **Periodicitás:** Létezik $p > 0$, hogy $f(x + p) = f(x)$ (pl. $\sin x, \cos x$: $p = 2\pi$, $\tan x$: $p = \pi$).

---

## 2. Függvénytranszformációk

Ha ismerjük az $y = f(x)$ függvény grafikonját ($c > 0$):
- $y = f(x) + c$: eltolás felfelé $c$ egységgel.
- $y = f(x) - c$: eltolás lefelé $c$ egységgel.
- $y = f(x + c)$: eltolás **balra** $c$ egységgel.
- $y = f(x - c)$: eltolás **jobbra** $c$ egységgel.
- $y = -f(x)$: tükrözés az $x$-tengelyre.
- $y = f(-x)$: tükrözés az $y$-tengelyre.
- $y = |f(x)|$: az $x$-tengely alatti rész tükrözése az $x$-tengelyre.

---

## 3. Alapfüggvények Családja

- **Lineáris függvény:** $f(x) = mx + b$ (egyenes, meredekség $m = \tan\alpha$).
- **Másodfokú függvény:** $f(x) = a(x - u)^2 + v$ (parabola, tengelypont $T(u, v)$).
- **Abszolútérték:** $f(x) = |x|$ ("V" alak, töréspont).
- **Négyzetgyök:** $f(x) = \sqrt{x}$ ($x \ge 0$, fekvő félparabola).
- **Törtfüggvény:** $f(x) = \frac{1}{x}$ (hiperbola, aszimptoták).
- **Exponenciális:** $f(x) = a^x$ ($a > 1$ növő, $0 < a < 1$ csökkenő, átmegy a $(0, 1)$ ponton).
- **Logaritmus:** $f(x) = \log_a x$ (az exponenciális inverze, átmegy az $(1, 0)$ ponton).
- **Trigonometrikus:** $\sin x, \cos x, \tan x$.

---

## 4. Sorozatok és Pénzügyi Matematika

- **Számtani sorozat:**
  $$a_n = a_1 + (n - 1)d, \quad S_n = \frac{a_1 + a_n}{2} \cdot n$$
- **Mértani sorozat:**
  $$a_n = a_1 \cdot q^{n - 1}, \quad S_n = a_1 \cdot \frac{q^n - 1}{q - 1} \quad (q \neq 1)$$
- **Pénzügyi matematika:**
  - Kamatos kamat: $K_n = K_0 \cdot q^n$ ($q = 1 + \frac{p}{100}$).
  - Annuitásos hiteltörlesztés: $H \cdot q^n = a \cdot \frac{q^n - 1}{q - 1}$.
