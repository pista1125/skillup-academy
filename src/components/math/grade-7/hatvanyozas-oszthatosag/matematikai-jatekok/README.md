# 10. Matematikai játékok (7. osztály)

## Tananyag Áttekintés
Kétszemélyes logikai és számelméleti játékok, az oszthatósági szabályokra és prímfelbontásra épülő nyerő stratégiák, a paritás és a maradékos osztás szerepe a játékok elemzésében.

---

## Főbb Játékok és Nyerő Stratégiák

### 1. Az Osztó-Játék (Nim Variánsok)
- **Szabály:** Adott egy $N$ pozitív egész szám. A két játékos felváltva kivon a számból egy olyan $d$ számot, amely valódi osztója a pillanatnyi számnak ($1 \le d < n$). Az veszít, aki nem tud lépni (ha a szám elérte az $1$-et).
- **Stratégia:**
  - A páratlan prímekből csak $1$-et lehet kivonni (páros számot kap a következő játékos).
  - Páros számból mindig lehet páratlant kivonni, így a következő játékos páratlan számot kap.
  - A nyerő pozíció a **páros számok fenntartása**.

---

### 2. A 100-as Számverseny (Maradékos Számolás)
- **Szabály:** 1-től indulva felváltva adunk hozzá $1$-et, $2$-t vagy $3$-at. Az nyer, aki pontosan eléri a $100$-at.
- **Stratégia:**
  - A lépésköz legfeljebb $3$, így egy lépéspár összege $4$-re egészíthető ki ($1+3, 2+2, 3+1$).
  - A nyerő kulcsszámok: $100 - 4k$, azaz $100, 96, 92, 88, \dots, 8, 4$.
  - Mivel $100 = 4 \cdot 25$, a **második játékos** nyerhet biztosan, ha mindig $4$ többszörösére egészíti ki a lépéseket.

---

### 3. Prímszámvadászat és Oszthatósági Rejtvények
- Két játékos felváltva ír fel számjegyeket egy többjegyű számba.
- Az egyik célja, hogy a végén a szám osztható legyen egy előre megadott számmal (pl. 9-cel vagy 11-gyel), a másik célja ezt megakadályozni.
- **Nyerő taktika:** Az utolsó lépés birtoklása és az oszthatósági szabályok (számjegyösszeg, utolsó jegyek) kontrollálása.
