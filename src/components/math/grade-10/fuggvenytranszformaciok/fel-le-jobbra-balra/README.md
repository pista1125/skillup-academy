# 3. Altéma: „Fel”-, „le”, „jobbra”-, „balra”

## Tananyag Áttekintés
A függvénygrafikonok párhuzamos eltolása a koordináta-tengelyek mentén: függőleges eltolás ($y$-tengely) és vízszintes eltolás ($x$-tengely). A hozzárendelési szabály külső és belső algebrai módosításának geometriai hatása különböző függvénycsaládokon (másodfokú, abszolútérték, négyzetgyök, reciprok).

---

## Fő Transzformációk és Törvények

- **Függőleges (külső) eltolás az $y$-tengely mentén:**
  - Hozzárendelési szabály: $g(x) = f(x) \pm c$.
  - Ha $c > 0$: a grafikon felfelé tolódik $c$ egységgel.
  - Ha $c < 0$: a grafikon lefelé tolódik $|c|$ egységgel.
  - Geometriailag: minden $(x; y)$ pont átmegy az $(x; y \pm c)$ pontba.
  - Hatása: az értelmezési tartomány ($D_f$) változatlan marad; az értékkészlet ($R_f$) határai és a szélsőérték értéke $c$-vel eltolódik.

- **Vízszintes (belső) eltolás az $x$-tengely mentén:**
  - Hozzárendelési szabály: $g(x) = f(x \mp u)$.
  - **Ellentétes előjel szabálya:**
    - Ha $u > 0$ (azaz $f(x - u)$): a grafikon **jobbra** tolódik el $u$ egységgel!
    - Ha $u < 0$ (azaz $f(x + |u|)$): a grafikon **balra** tolódik el $|u|$ egységgel!
  - Geometriailag: minden $(x; y)$ pont átmegy az $(x \pm u; y)$ pontba.
  - Hatása: az értékkészlet ($R_f$) és a szélsőérték értéke változatlan marad; az értelmezési tartomány ($D_f$) és a szélsőérték helye eltolódik $u$-val.

- **Együttes eltolás $\vec{v}(u; c)$ vektorral:**
  - Szabály: $g(x) = f(x - u) + c$.
  - Ponttranszformáció: $(x; y) \longmapsto (x + u; y + c)$.
  - Kitüntetett pontok vándorlása az origóból $(0; 0) \to (u; c)$ helyre:
    - Másodfokú függvény: csúcspont $T(u; c)$
    - Abszolútérték-függvény: töréspont $V(u; c)$
    - Négyzetgyökfüggvény: kezdőpont $K(u; c)$, és $D_g = [u; \infty[$, $R_g = [c; \infty[$
    - Reciprok függvény: aszimptoták metszéspontja $C(u; c)$, aszimptoták: $x = u$ és $y = c$.
