# 28. Vegyes feladatok (28. lecke)

## Tananyag Áttekintés
Számtani és mértani sorozatokat együttesen tartalmazó komplex feladatok megoldása, egyenletrendszerek felállítása és megoldása, geometriai alkalmazások.

---

## Tipikus Érettségi Típusfeladatok

### 1. "Számtaniból mértani" feladattípus
> **Mintafeladat:** Három egymást követő szám összege 21. Ha az első számhoz hozzáadunk 1-et, a másodikhoz 2-t, a harmadikhoz pedig 9-et, akkor egy mértani sorozat három egymást követő tagját kapjuk. Mik voltak az eredeti számok?
>
> **Megoldás menete:**
> 1. Három egymást követő számtani tag felírása szimmetrikusan:
>    $a - d, \quad a, \quad a + d$
> 2. Összegük:
>    $$(a - d) + a + (a + d) = 21 \implies 3a = 21 \implies a = 7$$
>    Az eredeti számok tehát: $7 - d, \quad 7, \quad 7 + d$.
> 3. Az új számok (hozzáadás után):
>    - $b_1 = (7 - d) + 1 = 8 - d$
>    - $b_2 = 7 + 2 = 9$
>    - $b_3 = (7 + d) + 9 = 16 + d$
> 4. Mivel $b_1, b_2, b_3$ mértani sorozatot alkot, teljesül a mértani közép tulajdonság:
>    $$b_2^2 = b_1 \cdot b_3 \implies 9^2 = (8 - d)(16 + d)$$
>    $$81 = 128 + 8d - 16d - d^2 \implies 81 = 128 - 8d - d^2$$
>    $$d^2 + 8d - 47 = 0$$
>    Ebből a másodfokú egyenlet megoldása adja meg a lehetséges $d$ értékeket, és a számhármasokat.

---

### 2. Geometriai alkalmazások
- **Derékszögű háromszög oldalai:** Ha egy derékszögű háromszög oldalai számtani sorozatot alkotnak ($a-d, a, a+d$), a Pitagorasz-tételből mindig következik, hogy az oldalak aránya **3 : 4 : 5**.
- **Háromszög belső szögei:** Ha a belső szögek számtani sorozatot alkotnak ($\alpha, \beta, \gamma$), a középső szög mindig **$60^\circ$**!
