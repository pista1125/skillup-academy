# 7. Hány osztója van?

## Tananyag Áttekintés
Prímszámok, összetett számok fogalma, a számok prímtényezős felbontása (kanonikus alak) és a pozitív osztók számának kiszámítása.

---

## Főbb Ismeretek

### 1. Prímszámok és Összetett Számok
- **Prímszám (törzsszám):** Olyan $1$-nél nagyobb természetes szám, amelynek pontosan két pozitív osztója van: az $1$ és önmaga.
  - *Prímszámok:* $2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, \dots$
  - A $2$ az egyetlen páros prímszám!
- **Összetett szám:** Olyan $1$-nél nagyobb szám, amelynek kettőnél több osztója van.
- Az **$1$** se nem prím, se nem összetett (csak egyetlen osztója van).

### 2. A Számelmélet Alaptétele (Prímtényezős Felbontás)
- Minden $1$-nél nagyobb összetett szám egyértelműen (a tényezők sorrendjétől eltekintve) felírható prímszámok szorzataként.
- **Kanonikus alak:** A prímhatványok növekvő sorrendű szorzata.
  - *Példa:* $360 = 2^3 \cdot 3^2 \cdot 5^1$.

### 3. Az Osztók Számának Meghatározása
Ha egy szám kanonikus alakja:
$$n = p_1^{\alpha_1} \cdot p_2^{\alpha_2} \cdot \dots \cdot p_k^{\alpha_k}$$
akkor a pozitív osztók száma ($d(n)$):
$$d(n) = (\alpha_1 + 1) \cdot (\alpha_2 + 1) \cdot \dots \cdot (\alpha_k + 1)$$

*Példa:* Hány osztója van a $360$-nak?
- $360 = 2^3 \cdot 3^2 \cdot 5^1$
- $d(360) = (3 + 1) \cdot (2 + 1) \cdot (1 + 1) = 4 \cdot 3 \cdot 2 = \mathbf{24}$ darab osztója van.
