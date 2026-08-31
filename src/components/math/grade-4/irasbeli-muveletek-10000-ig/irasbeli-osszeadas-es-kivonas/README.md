# 1. Írásbeli összeadás és kivonás

## Tananyag Áttekintés
Írásbeli összeadás és kivonás a 10 000-es számkörben: a helyiértékek pontos egymás alá rendezése, többszörös átlépések (maradékok és kölcsönkérések) kezelése, előzetes becslés és pontos ellenőrzés.

---

## Algoritmusok és Lépések

### 1. Írásbeli Összeadás
- **Rendezés:** Egyes alá egyes, tízes alá tízes, százas alá százas, ezres alá ezres.
- **Számolás:** Jobbról balra haladva az egyesek oszlopától.
- **Továbbvitel (maradék):** Ha egy oszlop összege $\ge 10$, a tízesek számát átvisszük a balra lévő következő helyiértékre.
- **Példa:**
  $$\begin{array}{r@{\quad}l} 3684 \\ +\; 2548 \\ \hline 6232 \end{array}$$

### 2. Írásbeli Kivonás
- **Számolás:** Mennyit kell adni az alsó számjegyhez, hogy a felsőt kapjuk?
- **Átváltás / Kölcsönkérés:** Ha a felső számjegy kisebb, 1-et kölcsönkérünk a bal szomszédos helyiértékről (ami 10-et ér).
- **Nullás számok esete:** Pl. $5000 - 2367$ esetén a nullákon át történő kölcsönkérés szabálya.
- **Példa:**
  $$\begin{array}{r@{\quad}l} 7420 \\ -\; 3865 \\ \hline 3555 \end{array}$$

### 3. Becslés és Ellenőrzés
- **Becslés (B):** Kerekített értékekkel számolunk a durva hibák elkerülésére.
- **Ellenőrzés (E):** Összeadás ellenőrzése kivonással, kivonás ellenőrzése összeadással.
