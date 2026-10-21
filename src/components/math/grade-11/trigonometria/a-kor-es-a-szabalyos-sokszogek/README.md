# 14. A kör és a szabályos sokszögek (13. lecke)

## Tananyag Áttekintés
Szabályos sokszögek metrikus vizsgálata szögfüggvényekkel: beírt és köré írt kör sugara, oldalhossz, kerület, terület és határátmenet a kör területéhez ($n \to \infty$).

---

## Fő Összefüggések és Képletek

- **A szabályos $n$-szög elemi háromszöge:**
  - A szabályos $n$-szög $n$ darab egybevágó, egyenlő szárú háromszögre bomlik, melyek szárai a köré írt kör sugarai ($R$), alapjuk az oldal ($a$), és magasságuk a beírt kör sugara ($r$ vagy $\rho$).
  - Középponti szög felének szögfüggvényei ($\omega = \frac{180^\circ}{n}$):
    $$\sin\left(\frac{180^\circ}{n}\right) = \frac{a/2}{R} \implies a = 2R \cdot \sin\left(\frac{180^\circ}{n}\right)$$
    $$\mathrm{tg}\left(\frac{180^\circ}{n}\right) = \frac{a/2}{r} \implies a = 2r \cdot \mathrm{tg}\left(\frac{180^\circ}{n}\right)$$
    $$\cos\left(\frac{180^\circ}{n}\right) = \frac{r}{R} \implies r = R \cdot \cos\left(\frac{180^\circ}{n}\right)$$

- **Szabályos $n$-szög területe:**
  $$T = n \cdot \frac{R^2 \cdot \sin(360^\circ / n)}{2} = n \cdot r^2 \cdot \mathrm{tg}\left(\frac{180^\circ}{n}\right) = \frac{K \cdot r}{2}$$

- **Kapcsolat a $\pi$-vel:**
  - $n \to \infty$ esetén a szabályos sokszögek kerülete a kör kerületéhez ($2\pi R$), területe a kör területéhez ($\pi R^2$) tart (Arkhimédész-féle közelítés).
