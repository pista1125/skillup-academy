# 7. Becslés, kerekítés

## Tananyag Áttekintés
A kerekítés célja és szabályai, kerekítés tízesre, százasra, ezresre, a felfelé és lefelé kerekítés feltételei, valamint a műveleti eredmények előzetes becslése.

---

## Kerekítési Szabályok

### 1. A Kerekítés Menete
1. Megkeressük a kerekítendő helyiértéket.
2. Megnézzük a **közvetlenül utána (jobbra)** álló számjegyet:
   - Ha ez **$0, 1, 2, 3, 4$**, akkor **lefelé** kerekítünk (a helyiérték nem változik, az utána lévő számjegyek $0$-k lesznek).
   - Ha ez **$5, 6, 7, 8, 9$**, akkor **felfelé** kerekítünk (a helyiértéket $1$-gyel növeljük, az utána lévő számjegyek $0$-k lesznek).

### Példák ($n = 4376$):
- **Tízesekre:** $4380$ (mert a jobbra lévő $6 \ge 5$)
- **Százasokra:** $4400$ (mert a jobbra lévő $7 \ge 5$)
- **Ezresekre:** $4000$ (mert a jobbra lévő $3 < 5$)

### 2. Becslés Szerepe
- Műveletek elvégzése előtt kerekített értékekkel becsüljük az eredményt ($E \approx B$), így azonnal észrevehető a durva számolási hiba.
