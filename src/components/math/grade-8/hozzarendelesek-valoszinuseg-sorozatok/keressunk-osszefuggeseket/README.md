# 10. Keressünk összefüggéseket! (8. osztály)

## Tananyag Áttekintés
Számpárok, táblázatok, geometriai mintázatok (pontrácsok, gyufaszál-alakzatok) és sorozatok mögött rejlő szabályszerűségek felismerése, algebrai képlettel való leírása ($n \mapsto f(n)$), valamint összefüggések igazolása.

---

## 1. Szabályfelismerés Lépései
1. **Adatok táblázatba foglalása:** Az alakzat sorszáma ($n = 1, 2, 3, 4, \dots$) és a hozzá tartozó érték ($y$).
2. **Különbségek vizsgálata:**
   - Ha a szomszédos értékek különbsége állandó ($d$): a szabály **lineáris** $\implies f(n) = d \cdot n + b$.
   - Ha a különbségek különbsége állandó: a szabály **másodfokú** $\implies f(n) = a \cdot n^2 + b \cdot n + c$.
3. **Képlet megalkotása és ellenőrzése:** A felírt képletet teszteljük az összes ismert sorszámra ($n = 1, 2, 3$).
4. **Általánosítás és előrejelzés:** A képlet segítségével kiszámítható az $n = 50.$ vagy $n = 100.$ alakzat elemszáma is.

---

## 2. Tipikus Geometriai Mintázatok
- **Háromszögszámok:** $1, 3, 6, 10, 15, \dots \implies T_n = \frac{n(n+1)}{2}$.
- **Nézetszámok:** $1, 4, 9, 16, 25, \dots \implies N_n = n^2$.
- **Kézfogások száma $n$ ember között:** $\frac{n(n-1)}{2}$.
- **Konvex $n$-szög átlóinak száma:** $\frac{n(n-3)}{2}$.
