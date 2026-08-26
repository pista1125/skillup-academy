# 9. Valószínűségszámítási feladatok (8. osztály)

## Tananyag Áttekintés
Összetett, több lépésből álló véletlen kísérletek valószínűsége: fa-diagramok használata, független és függő események, golyóhúzás visszatevéssel és visszatevés nélkül, valamint kombinatorikus esetszámlálás.

---

## 1. Modellezési Technikák Összetett Kísérleteknél

### A. Táblázatos Módszer (pl. Két Kocka Dobása)
Két kocka esetén $6 \times 6 = 36$ egyenlően valószínű elemi kimenetel van:

| Dobás | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| **1** | (1,1) | (1,2) | (1,3) | (1,4) | (1,5) | (1,6) |
| **...** | ... | ... | ... | ... | ... | ... |
| **6** | (6,1) | (6,2) | (6,3) | (6,4) | (6,5) | (6,6) |

---

### B. Fa-diagram (Útvonal-szabály)
- Az egymást követő lépések valószínűségeit az élekre írjuk.
- Egy adott kimenetelhez vezető ágon a valószínűségeket **összeszorozzuk** (*szorzási szabály*):
  $$P(A \cap B) = P(A) \cdot P(B|A)$$
- Ha egy esemény több ágon is bekövetkezhet, az ágak valószínűségeit **összeadjuk** (*összeadási szabály*).

---

## 2. Visszatevéses vs. Visszatevés Nélküli Mintavétel
- **Visszatevéssel:** Az összetétel nem változik a húzások között $\implies$ független kísérletek.
- **Visszatevés nélkül:** Minden húzás után 1-gyel csökken az összes golyó száma, és a kihúzott színű golyók száma is $\implies$ a valószínűségek lépésről lépésre változnak!
