# 4. Altéma: „Soványabb”, „kövérebb”

## Tananyag Áttekintés
A függvénygrafikonok nyújtása és zsugorítása az $y$-tengely mentén (függőleges skálázás, merőleges affinitás), valamint tükrözés az $x$-tengelyre. Az $a$ együttható abszolút értékének és előjelének geometriai hatása különböző függvénycsaládokon (másodfokú, abszolútérték, négyzetgyök, reciprok).

---

## Fő Transzformációk és Törvények

- **Merőleges affinitás az $x$-tengelyre:**
  - Hozzárendelési szabály: $g(x) = a \cdot f(x)$ ($a \in \mathbb{R}, a \neq 0$).
  - Ponttranszformáció: $P(x; y) \longmapsto P'(x; a \cdot y)$.
  - Az $x$-koordináta változatlan marad, az $y$-koordináta $a$-szorosára módosul.
  - A zérushelyek helye és az origóbeli csúcspont nem mozdul el ($a \cdot 0 = 0$).

- **Nyújtás és zsugorítás ($|a|$ szerepe):**
  - **Ha $|a| > 1$:** A grafikon az $y$-tengely mentén nyúlik $\implies$ „soványabb”, meredekebb görbe jön létre (pl. $g(x) = 2x^2$, $g(x) = 3|x|$).
  - **Ha $0 < |a| < 1$:** A grafikon az $y$-tengely mentén zsugorodik $\implies$ „kövérebb”, laposabb, öblösebb görbe keletkezik (pl. $g(x) = 0,5x^2$, $g(x) = \frac{1}{3}|x|$).

- **Tükrözés az $x$-tengelyre ($a < 0$ szerepe):**
  - Hozzárendelési szabály: $g(x) = -f(x)$.
  - Ha $a < 0$: a parabola szárai lefelé nyílnak (konkáv alak).
  - A korábbi minimumból globális **maximum** lesz!
  - Értékkészlet: $R_f = ]-\infty; 0]$.
  - A monotonitási viszonyok megfordulnak: $]-\infty; 0]$ intervallumon szigorúan monoton nő, $[0; \infty[$ intervallumon szigorúan monoton csökken.

- **A páratlan lépések szabályának módosulása:**
  - $f(x) = a \cdot x^2$ esetén a csúcspontból jobbra 1-et lépve sorban $a \cdot 1, a \cdot 3, a \cdot 5 \dots$ egységet lépünk fel (vagy le).

- **A parabola mértani definíciója:**
  - A sík azon pontjainak halmaza, amelyek a fókusztól ($F$) és a vezéregyenestől ($v$) egyenlő távolságra vannak: $d(P, F) = d(P, v)$.
