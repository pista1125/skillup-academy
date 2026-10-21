# 36. Számítások osztályközepekkel (36. lecke)

## Tananyag Áttekintés
Csoportosított (osztályközös) adatok statisztikai elemzése, osztályközép meghatározása, valamint az átlag és szórás becslése osztályközepek segítségével.

---

## Osztályközös Gyakorisági Sorok

Amikor egy folytonos változóból (pl. magasságok, teszteredmények pontszámai, fizetések) nagyszámú adat áll rendelkezésre, az adatokat diszjunkt intervallumokba (**osztályközökbe**) csoportosítjuk:
$$[a_1, b_1[, \quad [a_2, b_2[, \dots, [a_k, b_k[$$
- **Osztályszélesség ($h_i$):** $h_i = b_i - a_i$. Leggyakrabban egyenlő szélességű osztályokat használunk.
- **Gyakoriság ($f_i$):** Az adott intervallumba eső megfigyelések száma.

---

## Az Osztályközép ($x_i^*$)

Mivel az osztályozás után az eredeti egyedi adatokat már nem látjuk, minden intervallumot annak geometriai középpontjával, az **osztályközéppel** reprezentálunk:
$$x_i^* = \frac{a_i + b_i}{2}$$

---

## Számítások Osztályközepekkel

### 1. Becsült Számtani Közép ($\bar{x}$)
Az osztályközepeknek a gyakoriságokkal súlyozott átlagát vesszük:
$$\bar{x} \approx \frac{\sum_{i=1}^k f_i \cdot x_i^*}{\sum_{i=1}^k f_i} = \frac{\sum f_i \cdot x_i^*}{N}$$

### 2. Becsült Szórás ($s$)
Az osztályközepek átlagtól vett négyzetes eltéréseinek súlyozott átlagának négyzetgyöke:
$$s^2 \approx \frac{\sum_{i=1}^k f_i \cdot (x_i^* - \bar{x})^2}{N} \implies s = \sqrt{s^2}$$

---

## Mintapélda

| Osztályköz (cm) | Osztályközép ($x_i^*$) | Gyakoriság ($f_i$) | $f_i \cdot x_i^*$ |
|---|---|---|---|
| $150 \le x < 160$ | $155$ | $4$ | $620$ |
| $160 \le x < 170$ | $165$ | $10$ | $1650$ |
| $170 \le x < 180$ | $175$ | $12$ | $2100$ |
| $180 \le x < 190$ | $185$ | $4$ | $740$ |
| **Összesen** | – | **$N = 30$** | **$5110$** |

**Becsült átlagmagasság:**
$$\bar{x} \approx \frac{5110}{30} \approx 170{,}33\text{ cm}$$
