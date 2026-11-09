# 6. Altéma: Másodfokú függvények

## Tananyag Áttekintés
Az általános alakban megadott másodfokú függvények ($f(x) = ax^2 + bx + c$) átalakítása kanonikus alakra ($a(x - u)^2 + v$) teljes négyzetté kiegészítéssel, a parabola csúcspontjának algebrai meghatározása és a függvény tulajdonságainak leolvasása.

---

## Fő Témakörök és Átalakítások

- **A másodfokú függvény két megadási alakja:**
  - **Általános (polinom) alak:** $f(x) = ax^2 + bx + c$ ($a \neq 0$). A $c$ konstans tag azonnal megadja az $y$-tengelymetszetet: $(0; c)$.
  - **Kanonikus (teljes négyzetes) alak:** $f(x) = a(x - u)^2 + v$, ahol $T(u; v)$ a parabola csúcspontja.

- **Áttérés teljes négyzetté kiegészítéssel:**
  1. $a$ kiemelése a másodfokú és elsőfokú tagból: $a \left(x^2 + \frac{b}{a}x\right) + c$.
  2. Belső kifejezés kiegészítése teljes négyzetté: $\left(x + \frac{b}{2a}\right)^2 - \left(\frac{b}{2a}\right)^2$.
  3. Kifejtés és összevonás:
     $$u = -\frac{b}{2a}, \quad v = c - \frac{b^2}{4a} = -\frac{b^2 - 4ac}{4a} = -\frac{D}{4a}$$

- **A csúcspont univerzális képlete:**
  $$T\left(-\frac{b}{2a}; c - \frac{b^2}{4a}\right)$$
  - Ha $a > 0$: a csúcspontban globális minimum van (értéke: $v$). Értékkészlet: $R_f = [v; \infty[$.
  - Ha $a < 0$: a csúcspontban globális maximum van (értéke: $v$). Értékkészlet: $R_f = ]-\infty; v]$.
  - Szimmetriatengely: az $x = -\frac{b}{2a}$ függőleges egyenes.

- **Geometriai kiegészítés (ókori módszer):**
  - $x^2 + bx$ téglalap-felbontása: egy $x^2$ négyzet és két $\frac{b}{2} \cdot x$ téglalap, amelyhez $\left(\frac{b}{2}\right)^2$ sarok hiányzik a teljes négyzethez.
