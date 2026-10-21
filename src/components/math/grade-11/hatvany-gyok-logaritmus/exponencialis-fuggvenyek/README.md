# 7. Exponenciális függvények (32. lecke)

## Tananyag Áttekintés
Az $f(x) = a^x$ alakú exponenciális függvény definíciója, képe, szigorú monotonitása az alap ($a > 1$ vagy $0 < a < 1$) függvényében, és alaptulajdonságai.

---

## Fő Fogalmak és Függvényelemzés

- **Definíció:**
  - $f: \mathbb{R} \to \mathbb{R}^+, \quad f(x) = a^x$, ahol $a > 0$ és $a \neq 1$.
  - Értelmezési tartomány: $D_f = \mathbb{R}$
  - Értékkészlet: $R_f = \mathbb{R}^+ = ]0; +\infty[$ (soha nem nulla és nem negatív!)

- **Két alaptípus a növekedési viselkedés szerint:**
  - **Ha $a > 1$:**
    - A függvény **szigorúan monoton növő**: ha $x_1 < x_2 \implies a^{x_1} < a^{x_2}$.
    - Bal felé a vízszintes tengelyhez simul ($\lim_{x \to -\infty} a^x = 0$), jobb felé gyorsan növekszik.
  - **Ha $0 < a < 1$:**
    - A függvény **szigorúan monoton csökkenő**: ha $x_1 < x_2 \implies a^{x_1} > a^{x_2}$.
    - Jobb felé a vízszintes tengelyhez simul ($\lim_{x \to +\infty} a^x = 0$).

- **Közös nevezetes pontok és aszimptota:**
  - Minden alap esetén $a^0 = 1$, így a grafikon mindig átmegy a $(0; 1)$ ponton.
  - $a^1 = a$, átmegy az $(1; a)$ ponton.
  - Aszimptota: az $x$-tengely ($y = 0$).
  - Nincs zérushelye, kölcsönösen egyértelmű (injektív) leképezés.
