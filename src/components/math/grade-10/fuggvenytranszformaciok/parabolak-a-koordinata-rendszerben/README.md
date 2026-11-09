# 2. Altéma: Parabolák a koordináta-rendszerben

## Tananyag Áttekintés
Az $f(x) = x^2$ alapfüggvény (normálparabola) geometriai és algebrai tulajdonságai, szimmetriája, csúcspontja (tengelypontja), valamint az első párhuzamos eltolások az $x$- és $y$-tengelyek mentén.

---

## Fő Témakörök és Jellemzés

- **Az $f(x) = x^2$ alapfüggvény vizsgálata:**
  - **Értelmezési tartomány:** $D_f = \mathbb{R}$.
  - **Értékkészlet:** $R_f = [0; \infty[$ (nemnegatív valós számok).
  - **Zérushely:** $x = 0$ (az origóban érinti az $x$-tengelyt).
  - **Szélsőérték:** Globális minimuma van az $x = 0$ helyen, értéke $y = 0$. Maximuma nincs.
  - **Monotonitás:** Szigorúan monoton csökken a $]-\infty; 0]$ intervallumon, szigorúan monoton nő a $[0; \infty[$ intervallumon.
  - **Paritás és szimmetria:** Páros függvény ($f(-x) = (-x)^2 = x^2 = f(x)$), a grafikon tengelyesen szimmetrikus az $y$-tengelyre ($x = 0$).
  - **Csúcspont (tengelypont):** $T(0; 0)$.
  - **A páratlan lépések szabálya:** A csúcspontból jobbra/balra 1 egységet lépve felfelé $1, 3, 5, 7 \dots$ egységet lépünk ($1=1^2, 1+3=2^2=4, 1+3+5=3^2=9$).

- **Függőleges eltolás az $y$-tengely mentén ($f(x) = x^2 \pm c$):**
  - Ha $c > 0$: a parabola felfelé tolódik $c$ egységgel. Új csúcspont: $T(0; c)$.
  - Ha $c < 0$: a parabola lefelé tolódik $|c|$ egységgel. Új csúcspont: $T(0; c)$.
  - Értékkészlet: $R_f = [c; \infty[$.
  - Zérushelyek száma:
    - $c < 0 \implies 2$ db ($x_{1,2} = \pm\sqrt{-c}$).
    - $c = 0 \implies 1$ db ($x = 0$).
    - $c > 0 \implies 0$ db (a parabola az $x$-tengely felett lebeg).

- **Vízszintes eltolás az $x$-tengely mentén ($f(x) = (x \mp u)^2$):**
  - **Ellentétes előjel szabálya:** A zárójelen belüli művelet fordítva hat az $x$-koordinátákra!
  - $f(x) = (x - u)^2 \implies$ jobbra tolódik $u$ egységgel ($u > 0$). Csúcspont: $T(u; 0)$.
  - $f(x) = (x + u)^2 \implies$ balra tolódik $u$ egységgel ($u > 0$). Csúcspont: $T(-u; 0)$.
  - Értékkészlet: változatlanul $R_f = [0; \infty[$.
  - Zérushely: pontosan 1 db az új csúcspontban ($x = u$, illetve $x = -u$).

- **Együttes tengelypárhuzamos eltolások ($f(x) = (x - u)^2 + c$):**
  - Csúcspont koordinátái közvetlenül leolvashatók: $T(u; c)$.
  - Szimmetriatengely: az $x = u$ függőleges egyenes.
