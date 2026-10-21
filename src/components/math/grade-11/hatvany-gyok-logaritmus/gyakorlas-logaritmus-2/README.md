# 15. Gyakorlás (40. lecke)

## Tananyag Áttekintés
Összetett exponenciális és logaritmusos egyenletek, egyenletrendszerek és szöveges feladatok megoldásának gyakorlása, ellenőrzése és diszkussziója.

---

## Fő Megoldási Stratégiák és Típusok

- **Azonos alapra hozás:**
  - Mindkét oldal kifejezése azonos alap hatványaként vagy azonos alapú logaritmusaként.

- **Új ismeretlen bevezetése (helyettesítés):**
  - Ha az egyenletben $a^x$ és $a^{2x} = (a^x)^2$ szerepel, legyen $u = a^x$ ($u > 0$).
  - Ha $\log_a x$ és $\log_a^2 x$ szerepel, legyen $v = \log_a x$.

- **Mindkét oldal logaritmizálása:**
  - Ha a két oldal alapja különböző, és nem hozhatók közös alapra (pl. $2^x = 3^{x-1}$):
    $$\lg(2^x) = \lg(3^{x-1}) \implies x \lg 2 = (x-1) \lg 3 \implies x(\lg 3 - \lg 2) = \lg 3$$

- **Kikötések és ellenőrzés fontossága:**
  - A kapott gyökök behelyettesítése a kezdeti értelmezési tartományba (logaritmus argumentuma szigorúan pozitív kell legyen).
  - Hamis gyökök kizárása.
