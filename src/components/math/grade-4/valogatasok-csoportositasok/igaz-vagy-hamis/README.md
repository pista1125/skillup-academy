# 4. Igaz vagy hamis?

## Tananyag Áttekintés
Logikai feladatok és következtetések: állítások igazságtartalmának ellenőrzése, a „minden”, „van olyan / létezik” és „egyik sem” szavak helyes értelmezése, logikai fejtörők és Sudoku.

---

## Logikai Szabályok és Példák

### 1. A Kvantorok Jelentése
- **„Minden”:** Az állításnak a csoport **összes** tagjára igaznak kell lennie. Ha csak egyetlen ellenpélda van, az állítás már **hamis**!
  - *„Minden háromszögnek 3 oldala van.”* $\rightarrow$ **IGAZ**.
  - *„Minden páros szám osztható 4-gyel.”* $\rightarrow$ **HAMIS** (ellenpélda: a $6$ páros, de nem osztható 4-gyel).
- **„Van olyan” (létezik legalább egy):** Elég, ha **egyetlenegy** olyan elem van a csoportban, amire igaz.
  - *„Van olyan négyszög, amelynek minden oldala egyenlő.”* $\rightarrow$ **IGAZ** (a négyzet és a rombusz ilyen).
- **„Egyik sem”:** A csoport **egyetlen** tagjára sem igaz a tulajdonság.

### 2. A Sudoku Alapszabályai
- Egy $4 \times 4$-es vagy $6 \times 6$-os rácsban minden szám csak **egyszer** szerepelhet minden sorban, minden oszlopban és minden vastag vonallal határolt kis blokkban.
- Következtetési lánc: *„Mivel ebben a sorban már van 1, 2 és 4, ide csak a 3 kerülhet.”*
