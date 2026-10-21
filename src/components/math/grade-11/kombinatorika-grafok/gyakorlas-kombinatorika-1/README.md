# 5. Gyakorlás (20. lecke)

## Tananyag Áttekintés
Összetett kombinatorikai feladatok megoldásának gyakorlása: permutáció, variáció és kombináció felismerése és helyes megválasztása konkrét szituációkban.

---

## Fő Döntési Szempontok

- **A 3 alapvető kérdés minden feladatnál:**
  1. *Minden elemet felhasználunk?*
     - Igen $\implies$ **Permutáció** ($n!$ vagy $\frac{n!}{k_1!\dots k_r!}$).
     - Nem (csak $k$ darabot az $n$-ből) $\implies$ tovább a 2. kérdésre.
  2. *Számít a sorrend?*
     - Igen $\implies$ **Variáció** ($n^k$ ha ismétlődhet, $\frac{n!}{(n-k)!}$ ha nem).
     - Nem $\implies$ **Kombináció** ($\binom{n}{k}$).
  3. *Ismétlődhetnek-e az elemek?*

- **Gyakorló feladattípusok:**
  - Versenyek, sorsolások, csapatösszeállítások.
  - Számjegyekből képezhető számok (0-val való kezdés tiltása).
  - Kártyaosztások (pl. pókerminták száma).
