# 10. Oszthatóság 4-gyel és 100-zal

## Tananyag Áttekintés
Az utolsó két számjegy alapján működő oszthatósági szabályok vizsgálata.

---

## Oszthatósági Szabályok

### 1. Oszthatóság 4-gyel
- **Szabály:** Egy egész szám akkor és csak akkor osztható $4$-gyel, ha az **utolsó két számjegyéből képzett kétjegyű szám** osztható $4$-gyel (vagy $00$-ra végződik).
- *Példák:*
  - $1524 \rightarrow$ utolsó két számjegy $24$. Mivel $24 : 4 = 6$, ezért $1524$ osztható $4$-gyel.
  - $3718 \rightarrow$ utolsó két számjegy $18$. Mivel $18$ nem osztható $4$-gyel, ezért $3718$ sem osztható $4$-gyel.

### 2. Oszthatóság 100-zal
- **Szabály:** Egy egész szám akkor és csak akkor osztható $100$-zal, ha az utolsó két számjegye $00$.
- *Példa:* $4500$ osztható $100$-zal, $4520$ nem osztható $100$-zal.

### Miért az utolsó két számjegy dönt?
Mivel a $100$ maradék nélkül osztható $4$-gyel ($100 = 4 \cdot 25$) és $100$-zal is, a szám százasok feletti része ($100 \cdot k$) mindig osztható. Így az egész szám oszthatósága csak az utolsó két számjegytől függ.
