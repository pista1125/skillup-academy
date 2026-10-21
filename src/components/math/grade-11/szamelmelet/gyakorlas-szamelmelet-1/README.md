# 9. Gyakorlás (50. lecke)

## Tananyag Áttekintés
Gyakorló feladatsor számrendszer-átváltásokra, műveletekre, hiányzó számjegyek meghatározására oszthatósági szabályok alapján, és az oszthatósági logikai összefüggésekre.

---

## Fő Gyakorlati Típusfeladatok

- **Hiányzó számjegyek meghatározása:**
  - Példa: Határozzuk meg a $\overline{4a7b}$ négyjegyű szám számjegyeit úgy, hogy osztható legyen 36-tal!
    - $36 = 4 \cdot 9$ és $\text{LNKO}(4, 9) = 1$.
    - 4-gyel való oszthatóság: $\overline{7b}$ osztható 4-gyel $\implies b \in \{2, 6\}$.
    - 9-cel való oszthatóság ($b=2$ esetén): $4 + a + 7 + 2 = 13 + a \implies a = 5$ (a szám: $4572$).
    - 9-cel való oszthatóság ($b=6$ esetén): $4 + a + 7 + 6 = 17 + a \implies a = 1$ (a szám: $4176$).

- **Számrendszerbeli egyenletek:**
  - Pl. melyik alapú rendszerben érvényes: $23_b + 44_b = 100_b$?
    $$(2b + 3) + (4b + 4) = b^2 \implies b^2 - 6b - 7 = 0 \implies (b - 7)(b + 1) = 0 \implies b = 7$$

- **Maradékos és diofantoszi feladatok:**
  - Legkisebb közös osztók és többszörösök szöveges alkalmazásai.
