# 10. Testek térben és síkban (7. osztály)

## Tananyag Áttekintés
Térbeli geometriai testek síkbeli ábrázolása: testhálók kiterítése és összehajtása, vetületi ábrázolás (háromkép-rendszer: elöl-, felül-, oldalnézet), él-, csúcs- és lapszámok, valamint az Euler-tétel.

---

## Főbb Ismeretek és Térszemlélet

### 1. Testhálók (Síkba Kiterítés)
- A **testháló** egy olyan összefüggő síkidom, amelyet a test lapjai alkotnak, és élek mentén összehajtogatva visszaadja a testet anélkül, hogy a lapok átfednék egymást.
- *Példa:* Egy kockának összesen $11$ különböző kiterített síkbeli hálózata létezik (mindegyik 6 összefüggő négyzetből áll).

---

### 2. Vetületi Ábrázolás (A Három Képsík Rendszere)
Térbeli testek egyértelmű leírása síkbeli merőleges vetületekkel:
1. **Elölnézet (főnézet):** A testre szemből vetülő kép (függőleges képsík).
2. **Felülnézet (alaprajz):** A testre fentről vetülő kép (vízszintes képsík).
3. **Oldalnézet (balnézet):** A testre balról vetülő kép (profil képsík).

---

### 3. Poliéderek Élei, Csúcsai és Lapjai (Euler-féle Poliédertétel)
> [!NOTE]
> **Euler-tétel:** Minden konvex poliéder esetén a csúcsok ($C$) és lapok ($L$) számának összege kettővel több az élek ($E$) számánál:
> $$C + L = E + 2 \quad \text{azaz} \quad C - E + L = 2$$

| Test | Csúcsok száma ($C$) | Lapok száma ($L$) | Élek száma ($E$) | Euler-összefüggés ($C+L=E+2$) |
|---|---|---|---|---|
| **Kocka / Téglatest** | $8$ | $6$ | $12$ | $8 + 6 = 12 + 2 = 14 \checkmark$ |
| **Háromoldalú hasáb** | $6$ | $5$ | $9$ | $6 + 5 = 9 + 2 = 11 \checkmark$ |
| **Négyoldalú gúla** | $5$ | $5$ | $8$ | $5 + 5 = 8 + 2 = 10 \checkmark$ |
| **Tetraéder** | $4$ | $4$ | $6$ | $4 + 4 = 6 + 2 = 8 \checkmark$ |
