# 11. Összetett oszthatósági szabályok

## Tananyag Áttekintés
Összetett számokkal (pl. 6, 12, 15, 25, 45) való oszthatóság szabályai relatív prím tényezőkre bontással.

---

## Főbb Ismeretek és Szabályok

### 1. Az Összetett Szabályok Alapelve
Egy szám akkor és csak akkor osztható egy $m = a \cdot b$ összetett számmal (ahol $a$ és $b$ **relatív prímek**, vagyis nincs 1-nél nagyobb közös osztójuk), ha a szám **külön-külön osztható $a$-val és $b$-vel is**.

### 2. Gyakori Összetett Szabályok

| Osztó | Felbontás ($a \cdot b$) | Szabály |
|---|---|---|
| **6** | $2 \cdot 3$ | A szám páros ÉS a számjegyeinek összege osztható 3-mal. |
| **12** | $3 \cdot 4$ | A számjegyeinek összege osztható 3-mal ÉS az utolsó két számjegye osztható 4-gyel. |
| **15** | $3 \cdot 5$ | A számjegyeinek összege osztható 3-mal ÉS az utolsó számjegye 0 vagy 5. |
| **18** | $2 \cdot 9$ | A szám páros ÉS a számjegyeinek összege osztható 9-cel. |
| **20** | $4 \cdot 5$ | Az utolsó számjegye 0 ÉS a tízesek helyén álló szám páros (vagyis 00, 20, 40, 60, 80-ra végződik). |
| **25** | $25$ | Az utolsó két számjegye 00, 25, 50 vagy 75. |
| **36** | $4 \cdot 9$ | Osztható 4-gyel ÉS osztható 9-cel is. |
| **45** | $5 \cdot 9$ | 0-ra vagy 5-re végződik ÉS a számjegyek összege osztható 9-cel. |

> **Fontos figyelmeztetés:** Csak akkor bonthatjuk szét a feltételt, ha a tényezők **relatív prímek**! Például a $8$-cal való oszthatóság NEM ellenőrizhető úgy, hogy osztható-e $2$-vel és $4$-gyel, mert $2$ és $4$ nem relatív prímek (pl. a $12$ osztható 2-vel és 4-gyel is, de 8-cal nem)!
