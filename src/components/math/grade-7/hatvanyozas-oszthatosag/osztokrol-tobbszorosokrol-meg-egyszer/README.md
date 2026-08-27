# 7. Osztókról, többszörösökről még egyszer (7. osztály)

## Tananyag Áttekintés
Egy szám összes osztójának szisztematikus felírása osztópárokkal, az osztók számának ($d(n)$) meghatározása a prímtényezős felbontásból, és a négyzetszámok osztóinak különleges jellemzői.

---

## Főbb Ismeretek és Képletek

### 1. Osztópárok Módszere
Ha $d$ osztója $n$-nek, akkor létezik egy hozzá tartozó $d'$ osztó is, amelyre:
$$d \cdot d' = n$$
Emiatt az osztók keresésekor elegendő csak $\sqrt{n}$-ig vizsgálni a számokat:
- *Példa ($n = 60$):* $\sqrt{60} \approx 7{,}74$
  - $1 \cdot 60 = 60$
  - $2 \cdot 30 = 60$
  - $3 \cdot 20 = 60$
  - $4 \cdot 15 = 60$
  - $5 \cdot 12 = 60$
  - $6 \cdot 10 = 60$
  - $7$ nem osztója $\implies$ Kész!
- A $60$ összes pozitív osztója: $\{1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60\}$ (összesen $12$ darab).

---

### 2. Az Osztók Számának Kiszámítása Prímfelbontásból
Legyen a szám kanonikus alakja:
$$n = p_1^{\alpha_1} \cdot p_2^{\alpha_2} \cdot \dots \cdot p_k^{\alpha_k}$$

Ekkor $n$ pozitív osztóinak száma ($d(n)$):
$$d(n) = (\alpha_1 + 1) \cdot (\alpha_2 + 1) \cdot \dots \cdot (\alpha_k + 1)$$

#### Magyarázat:
Minden osztóban a $p_1$ prímtényező kitevője lehet $0, 1, 2, \dots, \alpha_1$ (ez $\alpha_1 + 1$ lehetőség), a $p_2$ kitevője lehet $0, 1, \dots, \alpha_2$ ($\alpha_2 + 1$ lehetőség), és így tovább.

#### Példák:
- $60 = 2^2 \cdot 3^1 \cdot 5^1 \implies d(60) = (2+1)(1+1)(1+1) = 3 \cdot 2 \cdot 2 = \mathbf{12}$ osztó.
- $360 = 2^3 \cdot 3^2 \cdot 5^1 \implies d(360) = (3+1)(2+1)(1+1) = 4 \cdot 3 \cdot 2 = \mathbf{24}$ osztó.

---

### 3. A Négyzetszámok Osztóinak Különleges Tulajdonsága
> [!NOTE]
> **Tétel:** Egy pozitív egész számnak akkor és csak akkor van **páratlan számú pozitív osztója**, ha a szám **négyzetszám**!

#### Miért?
- Általános esetben minden osztóhoz tartozik egy tőle különböző osztópár ($d \neq d'$), így az osztók párokba állíthatók (páros számú osztó).
- Négyzetszámoknál ($n = k^2$) a $\sqrt{n} = k$ osztópárja önmaga ($k \cdot k = n$), ami egyetlen önálló osztóként jelenik meg:
  - *Példa ($n = 36$):* $1 \cdot 36, 2 \cdot 18, 3 \cdot 12, 4 \cdot 9, \mathbf{6 \cdot 6} \implies 9$ darab osztó (páratlan!).
  - Prímfelbontásból: $36 = 2^2 \cdot 3^2 \implies d(36) = (2+1)(2+1) = 3 \cdot 3 = 9$.
