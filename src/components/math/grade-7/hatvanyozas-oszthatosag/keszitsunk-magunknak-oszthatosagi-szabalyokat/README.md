# 6. Készítsünk magunknak oszthatósági szabályokat! (7. osztály)

## Tananyag Áttekintés
Összetett számokkal való oszthatósági szabályok származtatása a relatív prím tényezők szorzatára épülő szabály segítségével, és ismeretlen számjegyek kiszámítása oszthatósági feltételekből.

---

## Főbb Ismeretek és Szabályalkotás

### 1. A Relatív Prímekre Épülő Oszthatósági Alaptétel
> [!IMPORTANT]
> **Tétel:** Ha egy szám osztható az $a$ és $b$ számokkal, ÉS $a$ és $b$ **relatív prímek** ($\text{LNKO}(a, b) = 1$), akkor a szám osztható az $a \cdot b$ szorzattal is!

#### Miért fontos a relatív prím feltétel?
- A $12 = 3 \cdot 4$. Mivel $\text{LNKO}(3, 4) = 1$, egy szám **akkor és csak akkor osztható 12-vel, ha osztható 3-mal ÉS 4-gyel**.
- Hibás lenne $12 = 2 \cdot 6$-ra bontani, mert $\text{LNKO}(2, 6) = 2 \neq 1$. (Például a $18$ osztható 2-vel és 6-tal is, de $18$ **nem** osztható 12-vel!).

---

### 2. Készíthető Összetett Oszthatósági Szabályok

| Osztó ($c$) | Tényezők ($a \cdot b$) | Feltétel ($\text{LNKO}=1$) | Oszthatósági szabály |
|---|---|---|---|
| **6** | $2 \cdot 3$ | $\text{LNKO}(2, 3) = 1$ | Osztható **2-vel** (páros) ÉS **3-mal** (számjegyösszeg). |
| **12** | $3 \cdot 4$ | $\text{LNKO}(3, 4) = 1$ | Osztható **3-mal** ÉS az utolsó 2 számjegy osztható **4-gyel**. |
| **15** | $3 \cdot 5$ | $\text{LNKO}(3, 5) = 1$ | $0$-ra vagy $5$-re végződik ÉS a számjegyösszeg osztható **3-mal**. |
| **18** | $2 \cdot 9$ | $\text{LNKO}(2, 9) = 1$ | **Páros** ÉS a számjegyösszege osztható **9-cel**. |
| **20** | $4 \cdot 5$ | $\text{LNKO}(4, 5) = 1$ | $0$-ra végződik ÉS a tízes helyiértéken álló jegy páros ($00, 20, 40, 60, 80$). |
| **24** | $3 \cdot 8$ | $\text{LNKO}(3, 8) = 1$ | Osztható **3-mal** ÉS az utolsó 3 számjegy osztható **8-cal**. |
| **36** | $4 \cdot 9$ | $\text{LNKO}(4, 9) = 1$ | Utolsó 2 jegy osztható **4-gyel** ÉS számjegyösszeg osztható **9-cel**. |
| **45** | $5 \cdot 9$ | $\text{LNKO}(5, 9) = 1$ | $0$-ra vagy $5$-re végződik ÉS számjegyösszeg osztható **9-cel**. |

---

### 3. Típusfeladat: Rejtvényes Számjegyek Meghatározása
*Feladat:* Határozzuk meg az $x$ és $y$ számjegyeket úgy, hogy a $\overline{43x2y}$ ötjegyű szám **osztható legyen 36-tal**!

*Megoldási lépések:*
1. **Feltétel felbontása:** $36 = 4 \cdot 9$, tehát a számnak oszthatónak kell lennie 4-gyel és 9-cel.
2. **Oszthatóság 4-gyel:** Az utolsó két jegyből képzett $\overline{2y}$ számnak oszthatónak kell lennie 4-gyel $\implies y \in \{0, 4, 8\}$.
3. **Oszthatóság 9-cel ($y$ esetei szerint):**
   - *1. eset ($y = 0$):* $\overline{43x20} \rightarrow 4+3+x+2+0 = 9 + x$. Mivel $9 \mid (9+x)$, ezért $x = 0$ vagy $x = 9$. $\implies \mathbf{43020}, \mathbf{43920}$.
   - *2. eset ($y = 4$):* $\overline{43x24} \rightarrow 4+3+x+2+4 = 13 + x \implies x = 5$. $\implies \mathbf{43524}$.
   - *3. eset ($y = 8$):* $\overline{43x28} \rightarrow 4+3+x+2+8 = 17 + x \implies x = 1$. $\implies \mathbf{43128}$.
