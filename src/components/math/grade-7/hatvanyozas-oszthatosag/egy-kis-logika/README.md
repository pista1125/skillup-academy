# 4. Egy kis logika (7. osztály)

## Tananyag Áttekintés
Logikai következtetések a számelméletben: feltételes állítások („ha..., akkor...”), megfordítások, szükséges és elégséges feltételek az oszthatóságban, valamint esetszétválasztásos bizonyítások.

---

## Főbb Ismeretek és Logikai Szabályok

### 1. Feltételes Állítások és Megfordításuk
Egy matematikai tétel leggyakoribb szerkezete:
$$\text{„Ha } A \text{ igaz, akkor } B \text{ is igaz”} \quad (A \implies B)$$
- **$A$:** a feltétel (premissza)
- **$B$:** a következmény (konklúzió)

#### Megfordított állítás:
$$\text{„Ha } B \text{ igaz, akkor } A \text{ is igaz”} \quad (B \implies A)$$

> [!CAUTION]
> **Egy igaz állítás megfordítása nem feltétlenül igaz!**
> - *Eredeti állítás:* „Ha egy egész szám osztható 10-zel, akkor osztható 5-tel is.” $\rightarrow$ **IGAZ**.
> - *Megfordítás:* „Ha egy egész szám osztható 5-tel, akkor osztható 10-zel is.” $\rightarrow$ **HAMIS** (ellenpélda: a $15, 25, 35$ osztható 5-tel, de nem osztható 10-zel).

---

### 2. Szükséges és Elégséges Feltétel
- **Szükséges feltétel:** Olyan feltétel, amely nélkül az állítás nem teljesülhet ($B$ szükséges feltétele $A$-nak, ha $A \implies B$).
  - *Példa:* Ahhoz, hogy egy szám osztható legyen 6-tal, szükséges, hogy páros legyen.
- **Elégséges feltétel:** Olyan feltétel, amely önmagában garantálja a következmény teljesülését ($A$ elégséges feltétele $B$-nek, ha $A \implies B$).
  - *Példa:* Az, hogy egy szám utolsó számjegye 0, elégséges ahhoz, hogy a szám osztható legyen 5-tel.
- **Szükséges és elégséges feltétel (ekvivalencia: $A \iff B$):** Ha az állítás és megfordítása is egyszerre igaz („akkor és csak akkor”).
  - *Példa:* Egy szám akkor és csak akkor osztható 9-cel, ha a számjegyeinek összege osztható 9-cel.

---

### 3. Oszthatósági Bizonyítások Esetszétválasztással

1. **Két egymást követő egész szám szorzata:**
   Bármely két egymást követő egész szám közül az egyik biztosan páros, ezért szorzatuk $n(n+1)$ **mindig osztható 2-vel**.

2. **Három egymást követő egész szám szorzata:**
   Bármely három egymást követő egész szám ($n(n+1)(n+2)$) közül:
   - legalább egy páros (osztható 2-vel),
   - pontosan egy osztható 3-mal,
   - így a szorzatuk **mindig osztható $2 \cdot 3 = 6$-tal**.
