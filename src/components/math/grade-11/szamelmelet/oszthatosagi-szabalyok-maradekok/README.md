# 4. Oszthatósági szabályok, osztási maradékok (45. lecke)

## Tananyag Áttekintés
Oszthatósági szabályok tízes számrendszerben, helyiértékes indoklásuk, a maradékos osztás alaptétele és a maradékosztályok fogalma.

---

## Fő Szabályok és Összefüggések

- **A maradékos osztás tétele:**
  - Bármely $a \in \mathbb{Z}$ és $m \in \mathbb{Z}^+$ esetén egyértelműen létezik olyan $q, r \in \mathbb{Z}$, hogy:
    $$a = m \cdot q + r, \quad \text{ahol } 0 \le r < m$$
  - $r$ az $a$ szám $m$-mel való osztási maradéka.

- **Utolsó számjegyek alapján:**
  - 2-vel, 5-tel, 10-zel: az utolsó számjegy osztható az adott számmal.
  - 4-gyel, 25-tel, 100-zal: az utolsó két számjegyből képzett szám osztható az adott számmal.
  - 8-cal, 125-tel, 1000-rel: az utolsó három számjegyből képzett szám osztható az adott számmal.

- **Számjegyösszeg alapján:**
  - 3-mal, 9-cel: a számjegyek összege osztható 3-mal, illetve 9-cel (a maradék is megegyezik a számjegyösszeg maradékával!).

- **Váltakozó számjegyösszeg alapján:**
  - 11-gyel: a páratlan és páros helyiértékeken álló számjegyek összegének különbsége osztható 11-gyel.

- **Összetett számokkal való oszthatóság:**
  - Ha $m = p \cdot q$ és $\text{LNKO}(p, q) = 1$, akkor egy szám pontosan akkor osztható $m$-mel, ha külön-külön osztható $p$-vel és $q$-val is (pl. 6-tal, ha 2-vel és 3-mal; 12-vel, ha 3-mal és 4-gyel).
