# 8. Egyenletmegoldási módszerek: próbálgatás és lebontogatás (7. osztály)

## Tananyag Áttekintés
Az egyenlet, azonosság és egyenlőtlenség alapfogalmai, az alaphalmaz és megoldáshalmaz szerepe, valamint az elemi megoldási stratégiák: a szisztematikus próbálgatás és a lebontogatás (visszafelé gondolkodás).

- **Tankönyv:** 153–155. oldal
- **Munkafüzet:** 94–95. oldal, 103. oldal (összefoglalás)

---

## Főbb Ismeretek és Alapfogalmak

### 1. Alapfogalmak
- **Egyenlet:** Két algebrai kifejezés egyenlőségjelet tartalmazó kapcsolata (pl. $3x + 5 = 26$).
- **Ismeretlen (változó):** Betűvel jelölt keresett érték ($x, y, a, \dots$).
- **Alaphalmaz ($U$):** Az a számhalmaz, amelyből az ismeretlen értékét választhatjuk (pl. $\mathbb{N}, \mathbb{Z}, \mathbb{Q}$).
- **Megoldás (gyök):** Az alaphalmaz azon eleme(i), amelyeket behelyettesítve az egyenletbe mindkét oldal egyenlővé válik.
- **Megoldáshalmaz ($M$):** Az összes megoldás halmaza.
- **Ellenőrzés:** Az eredeti egyenletbe történő behelyettesítés (bal oldal = jobb oldal).

---

### 2. A Próbálgatás Módszere
- Akkor hatékony, ha az alaphalmaz kevés elemből áll (pl. 10-nél kisebb prímszámok), vagy az egyenlet szorzat alakú (osztópárok keresése).
- **Példa:** $x(12 - x) = 32 \implies$ a 32 osztópárjai közül a 4 és a 8 jó, így $x = 4$ vagy $x = 8$.

---

### 3. A Lebontogatás Módszere (Fordított Műveletsor)
Ha az ismeretlennel műveletek láncolatát végezzük el, a műveleteket fordított sorrendben, ellenkező művelettel visszacsinálva jutunk el a megoldáshoz:

*Példa:* Oldjuk meg a $\frac{5x - 4}{3} = 7$ egyenletet lebontogatással!
1. A műveletsor: $x \xrightarrow{\cdot 5} 5x \xrightarrow{- 4} 5x - 4 \xrightarrow{: 3} 7$
2. Visszafelé:
   - $7 \xrightarrow{\cdot 3} 21$ (azaz $5x - 4 = 21$)
   - $21 \xrightarrow{+ 4} 25$ (azaz $5x = 25$)
   - $25 \xrightarrow{: 5} \mathbf{5}$ (azaz $x = 5$)
3. Megoldás: $M = \{5\}$.

---

## Modul Komponensek
- `EquationMethodsTheory.tsx`: Interaktív Lebontogató Gép oda-vissza folyamatábrával, Szisztematikus Próbálgató Laboratórium csúszkával és azonnali kiértékeléssel.
- `EquationMethodsQuiz.tsx`: 30 kérdés 3 nehézségi szinten, 4 interaktív SVG összefoglaló kártya, beépített játékkapcsolat.
- `EquationMethodsMatcher.tsx`: 3 szintű párosító játék (szöveges kifejezések, lebontási lépések, egyenletgyökök).
- `EquationMethodsSorter.tsx`: 3 szintű csoportosító játék (megoldási módszerek, gyökök számhalmaza, alaphalmaz szerinti megoldásszám).
