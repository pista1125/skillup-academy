# 11. Visszatevés nélküli mintavétel (61. lecke)

## Tananyag Áttekintés
Egymás utáni, visszatevés nélküli húzások vizsgálata: valószínűségi fák (fa-diagram), a húzások egymásra gyakorolt hatása és az egyidejű húzással való ekvivalencia.

---

## Fő Fogalmak és Összefüggések

- **Visszatevés nélküli egymás utáni húzás:**
  - Minden húzás után csökken az összes elemek száma ($N \to N - 1 \to N - 2 \dots$).
  - A húzott típusok aránya megváltozik a következő húzásra.

- **Valószínűségi fa és szorzási szabály:**
  - Az egymást követő ágak valószínűségei megszorzódnak:
    $$P(A_1 \cap A_2) = P(A_1) \cdot P(A_2 \mid A_1)$$
  - Példa: 10 golyóból 4 piros, 6 kék. Két piros húzása egymás után:
    $$P = \frac{4}{10} \cdot \frac{3}{9} = \frac{12}{90} = \frac{2}{15}$$

- **Ekvivalencia az egyszerre húzással:**
  - Matematikailag az $n$ elem egymás utáni visszatevés nélküli kihúzása teljesen egyenértékű az $n$ elem egyszerre történő kihúzásával!
    $$\frac{4}{10} \cdot \frac{3}{9} = \frac{\binom{4}{2}}{\binom{10}{2}} = \frac{6}{45} = \frac{2}{15}$$
