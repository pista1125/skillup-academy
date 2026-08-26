# 6. Vegyes feladatok (8. osztály)

## Tananyag Áttekintés
Összetett, több lépésből álló szöveges feladatok, középiskolai felvételi típusú szöveges egyenletek, kétismeretlenes egyenletrendszerek alkalmazása és logikai összefüggések modellezése.

---

## Módszertan és Stratégiák

### 1. Ismeretlenek Megválasztása
- Gyakran a kérdezett mennyiséget érdemes $x$-szel jelölni.
- Ha több ismeretlen van, fejezzük ki mindegyiket egyetlen közös változóval, vagy írjunk fel egyenletrendszert:
  $$\begin{cases} x + y = A \\ c_1 x + c_2 y = B \end{cases}$$

### 2. Kétismeretlenes Lineáris Egyenletrendszerek Megoldási Módszerei
1. **Behelyettesítő módszer:**
   - Az egyik egyenletből kifejezzük az egyik ismeretlent ($x = \dots$), és behelyettesítjük a másik egyenletbe.
2. **Egyenlő együtthatók módszere (Algebrai összeadás):**
   - Az egyenleteket beszorozzuk megfelelő számokkal, hogy az egyik ismeretlen együtthatói ellentétesek legyenek, majd összeadjuk a két egyenletet.

---

## Mintafeladatok

### 1. „Fejek és lábak” típusú feladat:
> *Egy udvarban tyúkok és nyulak vannak. Összesen 35 fejük és 94 lábuk van. Hány tyúk és hány nyúl van?*
- Legyen a tyúkok száma $x$, ekkor a nyulak száma $35 - x$.
- Lábak száma: Tyúknak 2, nyúlnak 4 lába van.
- Egyenlet: $2x + 4(35 - x) = 94$
- $2x + 140 - 4x = 94 \implies -2x + 140 = 94 \implies 2x = 46 \implies x = 23$ tyúk.
- Nyulak: $35 - 23 = 12$ nyúl.
- **Ellenőrzés:** $23 \cdot 2 + 12 \cdot 4 = 46 + 48 = 94$ láb. Helyes!

### 2. Jegyvásárlás / Kétféle ár:
> *Összesen 120 darab mozijegyet adtak el 280 000 Ft értékben. A diákjegy 2000 Ft, a felnőttjegy 3000 Ft. Hány diákjegyet adtak el?*
- Diákjegyek száma: $x$, felnőttjegyek: $120 - x$.
- Egyenlet: $2000x + 3000(120 - x) = 280\,000$
- $2000x + 360\,000 - 3000x = 280\,000 \implies -1000x = -80\,000 \implies x = 80$ diákjegy.
