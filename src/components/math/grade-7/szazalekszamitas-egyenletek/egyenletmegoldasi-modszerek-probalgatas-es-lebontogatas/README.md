# 8. Egyenletmegoldási módszerek: próbálgatás és lebontogatás (7. osztály)

## Tananyag Áttekintés
Az egyenlet, azonosság és egyenlőtlenség alapfogalmai, az alaphalmaz és megoldáshalmaz szerepe, valamint az elemi megoldási stratégiák: az okos próbálgatás és a lebontogatás (visszafelé gondolkodás).

---

## Főbb Ismeretek és Alapfogalmak

### 1. Alapfogalmak
- **Egyenlet:** Két algebrai kifejezés egyenlőségjelet tartalmazó kapcsolata (pl. $3x + 5 = 26$).
- **Ismeretlen (változó):** Betűvel jelölt keresett érték ($x, y, a, \dots$).
- **Alaphalmaz ($U$):** Az a számhalmaz, amelyből az ismeretlen értékét választhatjuk (pl. $\mathbb{N}, \mathbb{Z}, \mathbb{Q}$).
- **Megoldás (gyök):** Az alaphalmaz azon eleme(i), amelyeket behelyettesítve az egyenletbe mindkét oldal egyenlővé válik.
- **Megoldáshalmaz ($M$):** Az összes megoldás halmaza.

---

### 2. A Próbálgatás Módszere
- Szisztematikus értékbehelyettesítés táblázatban.
- Becsléssel megállapítjuk, hogy a keresett érték kisebb vagy nagyobb a behelyettesítettnél, így fokozatosan szűkítjük az intervallumot.

---

### 3. A Lebontogatás Módszere (Fordított Műveletsor)
Ha az ismeretlennel műveletek láncolatát végezzük el, a műveleteket fordított sorrendben, ellenkező előjellel visszacsinálva jutunk el a megoldáshoz:

*Példa:* Oldjuk meg a $\frac{3x - 7}{4} = 5$ egyenletet lebontogatással!
1. A műveletsor: $x \xrightarrow{\cdot 3} 3x \xrightarrow{- 7} 3x - 7 \xrightarrow{: 4} 5$
2. Visszafelé:
   - $5 \xrightarrow{\cdot 4} 20$ (azaz $3x - 7 = 20$)
   - $20 \xrightarrow{+ 7} 27$ (azaz $3x = 27$)
   - $27 \xrightarrow{: 3} \mathbf{9}$ (azaz $x = 9$)
3. Megoldás: $M = \{9\}$.
