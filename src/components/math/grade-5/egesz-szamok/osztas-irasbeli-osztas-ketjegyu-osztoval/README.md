# 11. Osztás, írásbeli osztás kétjegyű osztóval

## Tananyag Áttekintés
Az osztás fogalma és tagjai (osztandó, osztó, hányados, maradék), pontos és maradékos osztás, valamint a kétjegyű osztóval végzett lépcsős írásbeli osztás lépései, kerekítéssel segített becslés és ellenőrzés.

---

## Főbb Szabályok és Algoritmus

### 1. Az Osztás Tagjai és Maradékos Osztás
$$\text{osztandó} : \text{osztó} = \text{hányados}$$
- **Maradékos osztás alaptétele:**
  $$\text{osztandó} = \text{osztó} \cdot \text{hányados} + \text{maradék}$$
  ahol $0 \le \text{maradék} < \text{osztó}$.

### 2. Kétjegyű Osztás Lépései
1. **Kijelölés:** Balról kijelölünk az osztandóból annyi számjegyet, amiben az osztó legalább egyszer megvan.
2. **Becslés:** Az osztót és a kijelölt részt kerek tízesekre kerekítve megbecsüljük a hányados következő számjegyét.
3. **Szorzás és Kivonás:** Visszaszorzunk, kivonjuk, és leírjuk a részletmaradékot.
4. **Lehozás:** Lehozzuk a következő számjegyet, és megismételjük a lépéseket.
