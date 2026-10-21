# 2. Számtan, algebra (Rendszerező összefoglalás)

## Fejezet Áttekintés
Számelméleti összefüggések, algebrai azonosságok, hatványozás, gyökvonás, logaritmus, valamint egyenletek, egyenlőtlenségek és egyenletrendszerek érettségi rendszerezése.

---

## 1. Számelmélet

- **Számhalmazok:** $\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}$.
  - Racionális szám: felírható $\frac{p}{q}$ alakban ($p, q \in \mathbb{Z}, q \neq 0$). Véges vagy végtelen szakaszos tizedestört.
  - Irracionális szám: nem írható fel két egész hányadosaként (pl. $\sqrt{2}, \pi, e$). Végtelen nem szakaszos tizedestört.
- **Oszthatósági szabályok:**
  - 2, 5, 10: az utolsó számjegy alapján.
  - 4, 25, 100: az utolsó két számjegy alapján.
  - 8, 125, 1000: az utolsó három számjegy alapján.
  - 3, 9: a számjegyek összege alapján.
- **LNKO és LKKT:** Prímtényezős felbontásból:
  - Legnagyobb közös osztó (LNKO): a közös prímtényezők a legkisebb hatványon.
  - Legkisebb közös többszörös (LKKT): az összes előforduló prímtényező a legnagyobb hatványon.
  - Összefüggés: $a \cdot b = (a, b) \cdot [a, b]$.

---

## 2. Algebrai Azonosságok

- $(a + b)^2 = a^2 + 2ab + b^2$
- $(a - b)^2 = a^2 - 2ab + b^2$
- $(a + b)(a - b) = a^2 - b^2$
- $(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$
- $a^3 - b^3 = (a - b)(a^2 + ab + b^2)$
- $a^3 + b^3 = (a + b)(a^2 - ab + b^2)$

---

## 3. Hatvány, Gyök és Logaritmus

### Hatványozás:
- $a^n \cdot a^m = a^{n+m}$, $\quad \frac{a^n}{a^m} = a^{n-m}$, $\quad (a^n)^m = a^{nm}$
- $(ab)^n = a^n b^n$, $\quad \left(\frac{a}{b}\right)^n = \frac{a^n}{b^n}$
- $a^{-n} = \frac{1}{a^n}$, $\quad a^0 = 1$ ($a \neq 0$), $\quad a^{\frac{m}{n}} = \sqrt[n]{a^m}$ ($a > 0$)

### Logaritmus ($a > 0, a \neq 1, x, y > 0$):
- Definíció: $\log_a b = c \iff a^c = b$.
- $\log_a(x \cdot y) = \log_a x + \log_a y$
- $\log_a\left(\frac{x}{y}\right) = \log_a x - \log_a y$
- $\log_a(x^k) = k \cdot \log_a x$
- Alapáttérés: $\log_a b = \frac{\log_c b}{\log_c a}$

---

## 4. Egyenletek és Egyenlőtlenségek

1. **Másodfokú egyenlet:** $ax^2 + bx + c = 0$
   $$x_{1,2} = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$
   - Diszkrimináns: $D = b^2 - 4ac$.
     - $D > 0$: két valós gyök.
     - $D = 0$: egy valós gyök (kettős gyök).
     - $D < 0$: nincs valós gyök.
   - Viète-formulák: $x_1 + x_2 = -\frac{b}{a}$, $x_1 \cdot x_2 = \frac{c}{a}$.
2. **Gyökös egyenletek:** Értelmezési tartomány vizsgálata, négyzetre emelés után **ellenőrzés kötelező** a hamis gyökök kiszűrésére!
3. **Exponenciális és logaritmusos egyenletek:** Azonos alapra hozás, vagy új ismeretlen bevezetése, szigorú monotonitás alkalmazása.
4. **Egyenlőtlenségek:** Negatív számmal való szorzáskor/osztáskor a relációs jel megfordul!
