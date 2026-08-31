# 1. Írásbeli összeadás 1000-ig

## Tananyag Áttekintés
Háromjegyű számok írásbeli összeadásának elmélyítése a teljes $1000$-es számkörben: összeadás kétszeres átlépéssel, három vagy több tag összeadása egymás alá írással, valamint a becslés és helyiértékes lejegyzés szabályai.

---

## 1. Több Tagú Írásbeli Összeadás

### Példa: $348 + 275 + 189$
```
  ²  ²
  3  4  8
  2  7  5
+ 1  8  9
---------
  8  1  2
```

1. **Becslés ($B_t$):** $350 + 280 + 190 = 820$
2. **Egyesek:** $9 + 5 = 14$; $14 + 8 = 22$. Leírom a **$2$**-t, maradt a **$2$** tízes!
3. **Tízesek:** $2 + 8 = 10$; $10 + 7 = 17$; $17 + 4 = 21$. Leírom az **$1$**-et, maradt a **$2$** százas!
4. **Százasok:** $2 + 1 = 3$; $3 + 2 = 5$; $5 + 3 = 8$. Leírom a **$8$**-at.
$$\text{Összeg: } \mathbf{812}$$

---

## 2. Fontos Szabályok
- Ha az összeg eléri vagy meghaladja a $20$-at, a felvitt maradék $2$ (vagy $3$).
- Az összeadandó tagok száma tetszőleges lehet, a helyiértékek pontos egymás alá illesztése kötelező.
