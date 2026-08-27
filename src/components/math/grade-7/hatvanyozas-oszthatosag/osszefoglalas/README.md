# 11. Összefoglalás (7. osztály)

## Tananyag Áttekintés
A 7. osztályos **IV. Hatványozás, oszthatóság** fejezet átfogó, rendszerező áttekintése: a hatványozási azonosságok, a normálalak, az oszthatósági szabályok, a prímtényezős felbontás, az osztók száma, az LNKO és LKKT szabályai és típusfeladatai.

---

## Átfogó Fejezeti Rendszerezés

### 1. A Hatványozási Azonosságok Gyorskalauza

| Azonosság | Képlet | Feltétel / Példa |
|---|---|---|
| **Azonos alapok szorzása** | $a^n \cdot a^m = a^{n + m}$ | $2^3 \cdot 2^4 = 2^7$ |
| **Azonos alapok osztása** | $\frac{a^n}{a^m} = a^{n - m}$ | $\frac{5^6}{5^2} = 5^4 \quad (a \neq 0, n \ge m)$ |
| **Szorzat hatványa** | $(a \cdot b)^n = a^n \cdot b^n$ | $(3 \cdot 4)^2 = 3^2 \cdot 4^2 = 144$ |
| **Tört hatványa** | $\left(\frac{a}{b}\right)^n = \frac{a^n}{b^n}$ | $\left(\frac{3}{5}\right)^2 = \frac{9}{25} \quad (b \neq 0)$ |
| **Hatvány hatványozása** | $(a^n)^m = a^{n \cdot m}$ | $(2^3)^2 = 2^6 = 64$ |
| **Nulladik hatvány** | $a^0 = 1$ | $a \neq 0$ |
| **Normálalak** | $a \cdot 10^k$ | $1 \le a < 10, k \in \mathbb{Z}$ |

---

### 2. Oszthatósági Szabályok Gyorskeresője

| Osztó | Vizsgált tulajdonság |
|---|---|
| **2, 5, 10** | Az **utolsó 1 számjegy**: páros ($2$), $0$ vagy $5$ ($5$), $0$ ($10$). |
| **4, 25, 100** | Az **utolsó 2 számjegyből** álló szám osztható 4-gyel ($4$), $00, 25, 50, 75$ ($25$), $00$ ($100$). |
| **8, 125, 1000** | Az **utolsó 3 számjegyből** álló szám osztható 8-cal ($8$), 125-tel ($125$). |
| **3, 9** | A **számjegyek összege** osztható 3-mal ($3$), illetve 9-cel ($9$). |
| **6** | Osztható **2-vel ÉS 3-mal**. |
| **12** | Osztható **3-mal ÉS 4-gyel**. |
| **15** | Osztható **3-mal ÉS 5-tel**. |
| **18** | Osztható **2-vel ÉS 9-cel**. |
| **36** | Osztható **4-gyel ÉS 9-cel**. |
| **45** | Osztható **5-tel ÉS 9-cel**. |

---

### 3. Számelméleti Fogalmak és Algoritmusok

1. **Számelmélet alaptétele:** Minden 1-nél nagyobb összetett szám egyértelműen felírható prímszámok szorzataként:
   $$n = p_1^{\alpha_1} \cdot p_2^{\alpha_2} \dots p_k^{\alpha_k}$$
2. **Osztók száma:**
   $$d(n) = (\alpha_1 + 1)(\alpha_2 + 1)\dots(\alpha_k + 1)$$
   - Páratlan számú osztója **csak a négyzetszámoknak** van!
3. **Legnagyobb közös osztó ($\text{LNKO}$):**
   - **Közös** prímek a **legkisebb** hatványkitevőn.
   - Ha $\text{LNKO}(a, b) = 1 \implies a$ és $b$ **relatív prímek**.
4. **Legkisebb közös többszörös ($\text{LKKT}$):**
   - **Összes előforduló** prím a **legnagyobb** hatványkitevőn.
   - Két számra: $\text{LNKO}(a, b) \cdot \text{LKKT}(a, b) = a \cdot b$.
