# 8. Számrendszerek II. (49. lecke)

## Tananyag Áttekintés
Tetszőleges alapú számrendszerek (különösen a 8-as / oktális és 16-os / hexadecimális rendszerek), alapműveletek (összeadás, szorzás) idegen számrendszerben, és közvetlen átváltások 2-es hatványú alapok között.

---

## Fő Rendszerek és Műveletek

- **Hexadecimális (16-os) számrendszer:**
  - Számjegyek: $0, 1, 2, 3, 4, 5, 6, 7, 8, 9, \text{A}(10), \text{B}(11), \text{C}(12), \text{D}(13), \text{E}(14), \text{F}(15)$.
  - Helyiértékek: $16^0 = 1, 16^1 = 16, 16^2 = 256, 16^3 = 4096, \dots$
  - Példa: $2\text{F}_{16} = 2 \cdot 16 + 15 \cdot 1 = 47_{10}$.

- **Közvetlen átváltás 2-es, 8-as és 16-os rendszerek között:**
  - Mivel $8 = 2^3$, minden oktális számjegy pontosan 3 bináris jegynek (bitnek) felel meg (pl. $7_8 = 111_2$).
  - Mivel $16 = 2^4$, minden hexadecimális számjegy pontosan 4 bináris jegynek (nibble) felel meg (pl. $\text{A}_{16} = 1010_2$).

- **Műveletek idegen számrendszerben:**
  - Összeadás: átvitel keletkezik, ha a helyiértéken lévő összeg eléri vagy meghaladja az alapot ($b$).
  - Kivonás: kölcsönvételkor $b$ érték adódik a kisebbik helyiértékhez.
