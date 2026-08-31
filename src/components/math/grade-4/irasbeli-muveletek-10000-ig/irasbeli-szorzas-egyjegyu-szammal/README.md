# 2. Írásbeli szorzás egyjegyű számmal

## Tananyag Áttekintés
Többjegyű számok írásbeli szorzása egyjegyű szorzóval: a helyiértékenkénti szorzás, az átvitelek feljegyzése vagy észben tartása, valamint a szorzás helyes lejegyzése.

---

## A Szorzás Algoritmusa

### 1. Lépések
1. A szorzót a szorzandó mögé írjuk egy szorzóponttal: pl. $1438 \cdot 4$.
2. Aláhúzzuk a szorzást.
3. Jobbról balra haladva szorozzuk a szorzandó egyes számjegyeit:
   - **Egyesek:** $4 \cdot 8 = 32$, leírunk $2$-t, átviszünk $3$-at.
   - **Tízesek:** $4 \cdot 3 = 12$, hozzáadjuk a $3$-at: $12 + 3 = 15$, leírunk $5$-öt, átviszünk $1$-et.
   - **Százasok:** $4 \cdot 4 = 16$, hozzáadjuk az $1$-et: $16 + 1 = 17$, leírunk $7$-et, átviszünk $1$-et.
   - **Ezresek:** $4 \cdot 1 = 4$, hozzáadjuk az $1$-et: $4 + 1 = 5$, leírunk $5$-öt.
4. **Eredmény:** $1438 \cdot 4 = 5752$.

### 2. Nullát Tartalmazó Számok Szorzása
- $2045 \cdot 3 = 6135$
- Ügyelni kell arra, hogy a $3 \cdot 0 = 0$-hoz hozzá kell adni a korábbi átvitelt!
