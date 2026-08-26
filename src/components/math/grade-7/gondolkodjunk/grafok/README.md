# 4. Gráfok (7. osztály)

## Tananyag Áttekintés
A gráfok pontok (csúcsok) és az azokat összekötő vonalak (élek) hálózatai. Segítségükkel kapcsolatokat, úthálózatokat, ismeretségeket és kapcsolatrendszereket szemléltethetünk és elemezhetünk.

---

## Főbb Fogalmak és Tételek

### 1. Alapfogalmak
- **Csúcsok ($V$):** A gráf pontjai (pl. városok, személyek).
- **Élek ($E$):** A csúcsokat összekötő vonalak (pl. utak, ismeretségek).
- **Csúcs fokszáma ($d(v)$):** Az adott csúcsból kiinduló élek száma.
- **Izolált csúcs:** Olyan csúcs, amelynek fokszáma $0$ (nincs éle).
- **Többszörös él és hurokél:**
  - Többszörös él: két csúcs között egynél több él fut.
  - Hurokél: egy csúcsot önmagával köt össze.
- **Egyszerű gráf:** Nincs benne sem többszörös él, sem hurokél.

### 2. A gráfelmélet alaptétele
- Minden él **két** csúcsot köt össze, így minden él pontosan kettővel növeli a fokszámok összegét.
- **Tétel:** A gráf összes csúcsának fokszámösszege egyenlő az élek számának kétszeresével:
  $$\sum_{v \in V} d(v) = 2 \cdot |E|$$
- **Fontos következmény:**
  - A csúcsok fokszámának összege **mindig páros szám**!
  - Bármely gráfban a **páratlan fokszámú csúcsok száma mindig páros**! (Nem létezhet olyan gráf, amelyben pl. pontosan 3 darab páratlan fokszámú csúcs van.)

### 3. Nevezetes gráftípusok
- **Teljes gráf ($K_n$):** Olyan egyszerű gráf $n$ csúccsal, amelyben minden csúcs össze van kötve minden másik csúccsal. Éleinek száma:
  $$\frac{n \cdot (n-1)}{2}$$
- **Összefüggő gráf:** Bármely két csúcsa között vezet út (élek sorozata).
- **Fa gráf:** Olyan összefüggő egyszerű gráf, amely nem tartalmaz kört (zárt hurkot). $n$ csúcsú fának pontosan $n-1$ éle van.
