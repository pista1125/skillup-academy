# 12. A kör (7. osztály)

## Tananyag Áttekintés
A kör és a körlap definíciója, elemei és részei (sugár, átmérő, húr, körív, körcikk, körszelet, körgyűrű), valamint egyenes és kör, illetve két kör kölcsönös helyzete.

---

## Főbb Ismeretek és Fogalmak

### 1. A Kör és Körlap Definíciója
- **Kör (körvonal):** A sík azon pontjainak halmaza, amelyek a sík egy rögzített $O$ pontjától (középpont) adott $r > 0$ távolságra (sugár) vannak:
  $$k(O, r) = \{ P \in \text{sík} \mid |OP| = r \}$$
- **Körlap (körlemez):** A sík azon pontjainak halmaza, amelyek távolsága a középponttól legfeljebb $r$ ($|OP| \le r$).
- **Kör belső pontjai:** $|OP| < r$.
- **Kör külső pontjai:** $|OP| > r$.

---

### 2. A Kör Vonalas Elemei és Részei
- **Sugár ($r$):** A középpontot a körvonal tetszőleges pontjával összekötő szakasz (vagy ennek hossza).
- **Átmérő ($d$):** A kör középpontján átmenő húr. Hossza a sugár kétszerese: $d = 2r$.
- **Húr:** A körvonal bármely két pontját összekötő szakasz. (A leghosszabb húr az átmérő).
- **Körív:** A körvonal két pontja közé eső része.
- **Körcikk (körszektor):** A körlapnak két sugár és a hozzájuk tartozó körív által határolt része.
- **Körszelet (körszegmens):** A körlapnak egy húr és a hozzá tartozó körív által határolt része.
- **Körgyűrű:** Két közös középpontú (koncentrikus), de különböző sugarú kör közötti síkrész.

---

### 3. Egyenes és Kör Kölcsönös Helyzete
Legyen a kör középpontjának távolsága az egyenestől $d(O, e)$:

| Helyzet | Távolság ($d$) | Közös pontok száma | Neve | Jellemző |
|---|---|---|---|---|
| **Elkerülő egyenes** | $d > r$ | $0$ | Elkerülő | Nincs közös pont |
| **Érintő egyenes** | $d = r$ | **$1$** | **Érintő ($e$)** | Merőleges az érintési pontba húzott sugárra ($e \perp r$) |
| **Szelő egyenes** | $d < r$ | **$2$** | **Szelő ($s$)** | Két pontban metszi a kört; a metszéspontok közötti szakasz a húr |

---

### 4. Két Kör Kölcsönös Helyzete
Két kör középpontjának távolsága $d = |O_1 O_2|$, sugaraik $r_1$ és $r_2$ ($r_1 \ge r_2$):
1. **Koncentrikus körök:** $d = 0$ (közös középpont).
2. **Egymásban lévő körök (metszés nélkül):** $d < r_1 - r_2$.
3. **Belülről érintkező körök:** $d = r_1 - r_2$ (1 közös pont).
4. **Metsző körök:** $r_1 - r_2 < d < r_1 + r_2$ (2 közös pont).
5. **Kívülről érintkező körök:** $d = r_1 + r_2$ (1 közös pont).
6. **Egymáson kívül lévő körök:** $d > r_1 + r_2$ (0 közös pont).

---

### 5. Thalész-tétel (Előzetes / Alapvető ismeret)
Ha a kör átmérőjének két végpontját összekötjük a körvonal bármely más pontjával, akkor **derékszögű háromszöget** kapunk.
Másképp: A derékszögű háromszög köré írt körének középpontja az átfogó felezőpontja.
