# 11. Szabályos sokszögek (7. osztály)

## Tananyag Áttekintés
A szabályos sokszögek fogalma, geometriai képletei (belső és külső szögek összege és nagysága, középponti szögek, átlók száma), tengelyes és középpontos szimmetriatulajdonságai.

---

## Főbb Ismeretek és Képletek

### 1. A Szabályos Sokszög Definíciója
Olyan síkbeli sokszög, amelynek:
- minden **oldala egyenlő hosszú** ($a$), ÉS
- minden **belső szöge egyenlő nagyságú** ($\alpha$).

*(Példák: szabályos 3-szög = egyenlő oldalú háromszög; szabályos 4-szög = négyzet; szabályos 6-szög = szabályos hatszög).*

---

### 2. Szögek Kiszámítása ($n$-oldalú szabályos sokszögben)

1. **Belső szögek összege ($S_n$):**
   Egy csúcsból $(n - 3)$ átló húzható, ami a sokszöget $(n - 2)$ darab háromszögre bontja:
   $$S_n = (n - 2) \cdot 180^\circ$$
2. **Egy belső szög nagysága ($\alpha$):**
   Mivel mind az $n$ darab belső szög egyenlő:
   $$\alpha = \frac{(n - 2) \cdot 180^\circ}{n}$$
3. **Külső szögek összege és egy külső szög ($\alpha'$):**
   - Bármely konvex sokszög külső szögeinek összege **mindig $360^\circ$**.
   - Egy külső szög:
     $$\alpha' = \frac{360^\circ}{n} = 180^\circ - \alpha$$
4. **Középponti szög ($\omega$):**
   A sokszög köré írt körének középpontjából egy oldalhoz tartozó szög:
   $$\omega = \frac{360^\circ}{n} = \alpha'$$

---

### 3. Átlók Száma
- Egy csúcsból húzható átlók száma: $n - 3$
- Az összes átló száma ($A_n$):
  $$A_n = \frac{n \cdot (n - 3)}{2}$$

---

### 4. Nevezetes Szabályos Sokszögek Adattára

| Név ($n$) | Belső szögek összege | Egy belső szög ($\alpha$) | Egy külső szög ($\alpha'$) | Átlók száma | Szimmetriatengelyek | Középpontosan szimmetrikus? |
|---|---|---|---|---|---|---|
| **Szabályos 3-szög** | $180^\circ$ | $60^\circ$ | $120^\circ$ | $0$ | $3$ | **Nem** |
| **Négyzet ($n=4$)** | $360^\circ$ | $90^\circ$ | $90^\circ$ | $2$ | $4$ | **Igen** |
| **Szabályos 5-szög** | $540^\circ$ | $108^\circ$ | $72^\circ$ | $5$ | $5$ | **Nem** |
| **Szabályos 6-szög** | $720^\circ$ | $120^\circ$ | $60^\circ$ | $9$ | $6$ | **Igen** |
| **Szabályos 8-szög** | $1080^\circ$ | $135^\circ$ | $45^\circ$ | $20$ | $8$ | **Igen** |
| **Szabályos 10-szög** | $1440^\circ$ | $144^\circ$ | $36^\circ$ | $35$ | $10$ | **Igen** |
| **Szabályos 12-szög** | $1800^\circ$ | $150^\circ$ | $30^\circ$ | $54$ | $12$ | **Igen** |

---

### 5. A Szabályos Hatszög Különleges Tulajdonsága
A szabályos hatszög a középpontjából a csúcsokhoz húzott sugaraival **6 darab egybevágó, egyenlő oldalú (szabályos) háromszögre** bontható fel. Ezért a köré írt kör sugara pontosan megegyezik a hatszög oldalának hosszával:
$$R = a$$
Ez a tulajdonság teszi lehetővé a szabályos hatszög egyszerű szerkesztését körzővel.
