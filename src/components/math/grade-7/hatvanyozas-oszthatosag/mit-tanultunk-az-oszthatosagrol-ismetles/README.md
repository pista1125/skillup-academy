# 3. Mit tanultunk az oszthatóságról? (Ismétlés) (7. osztály)

## Tananyag Áttekintés
Az oszthatóság matematikai fogalma és jelölése, a korábban tanult alapvető oszthatósági szabályok rendszerezése és az összeg, különbség és szorzat oszthatósági törvényszerűségei.

---

## Főbb Ismeretek és Szabályok

### 1. Az Oszthatóság Fogalma
Egy $a$ egész szám **osztható** egy $b \neq 0$ egész számmal (jelölése: $b \mid a$, olvasd: „$b$ osztója $a$-nak”), ha létezik olyan $k$ egész szám, amelyre:
$$a = b \cdot k$$
- Ha $b \mid a$, akkor $a$-t $b$ **többszörösének**, $b$-t pedig $a$ **osztójának** nevezzük.
- Ha az osztásnak nem nulla a maradéka: $b \nmid a$ („$b$ nem osztója $a$-nak”).

---

### 2. Alapvető Oszthatósági Szabályok

| Osztó | Oszthatósági szabály | Példa |
|---|---|---|
| **2** | Az utolsó számjegy páros ($0, 2, 4, 6, 8$). | $1\ 356$ ($6$ páros) $\checkmark$ |
| **5** | Az utolsó számjegy $0$ vagy $5$. | $4\ 825$ ($5$-re végződik) $\checkmark$ |
| **10** | Az utolsó számjegy $0$. | $7\ 890$ ($0$-ra végződik) $\checkmark$ |
| **4** | Az utolsó két számjegyből képzett szám osztható 4-gyel ($100 = 4 \cdot 25$). | $5\ 728$ ($28 = 4 \cdot 7$) $\checkmark$ |
| **25** | Az utolsó két számjegy $00, 25, 50$ vagy $75$. | $1\ 975$ ($75$) $\checkmark$ |
| **100** | Az utolsó két számjegy $00$. | $3\ 400$ $\checkmark$ |
| **8** | Az utolsó három számjegyből képzett szám osztható 8-cal ($1000 = 8 \cdot 125$). | $12\ 168$ ($168 = 8 \cdot 21$) $\checkmark$ |
| **125** | Az utolsó három számjegy $000, 125, 250, 375, 500, 625, 750, 875$. | $4\ 625$ $\checkmark$ |
| **3** | A számjegyek összege osztható 3-mal. | $738 \rightarrow 7+3+8=18$ ($3 \mid 18$) $\checkmark$ |
| **9** | A számjegyek összege osztható 9-cel. | $4\ 581 \rightarrow 4+5+8+1=18$ ($9 \mid 18$) $\checkmark$ |

---

### 3. Műveletek és Oszthatóság

1. **Összeg és különbség:**
   - Ha egy szám osztója két számnak, akkor **osztója az összegüknek és különbségüknek is**:
     $$c \mid a \quad \text{és} \quad c \mid b \implies c \mid (a + b) \quad \text{és} \quad c \mid (a - b)$$
   - Ha $c \mid a$, de $c \nmid b$, akkor a szummájuknak **nem lehet osztója**: $c \nmid (a + b)$.

2. **Szorzat:**
   - Ha egy szám osztója a szorzat valamelyik tényezőjének, akkor **osztója az egész szorzatnak is**:
     $$c \mid a \implies c \mid (a \cdot b) \quad \text{bármely egész } b \text{ esetén}$$
