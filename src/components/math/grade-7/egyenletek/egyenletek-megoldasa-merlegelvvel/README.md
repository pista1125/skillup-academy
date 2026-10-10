# 10. Egyenletek megoldása mérlegelvvel (7. osztály)

## Tananyag Áttekintés
Elsőfokú, egyismeretlenes algebrai egyenletek szabatos megoldási algoritmusa: zárójelfelbontás, összevonás, mindkét oldalon szereplő ismeretlenek rendezése, törtek kiküszöbölése és a speciális esetek (azonosság, ellentmondás).

---

## Főbb Ismeretek és Algoritmus

### 1. Az Egyenletmegoldás Lépései (Algoritmus)

1. **Értelmezési tartomány / alaphalmaz rögzítése** (alapértelmezetten $U = \mathbb{Q}$ vagy $\mathbb{R}$).
2. **Törtek eltüntetése:** Mindkét oldalt beszorozzuk a nevezők legkisebb közös többszörösével ($\text{LKKT}$).
3. **Zárójelek felbontása:** A disztributivitás szabályai szerint (vigyázat a zárójel előtti negatív előjelre!).
4. **Összevonás mindkét oldalon külön-külön.**
5. **Rendezés a mérlegelvvel:** Az ismeretlenes tagokat az egyik oldalra, a tiszta számtagokat a másik oldalra visszük (+ / - műveletekkel).
6. **Osztás az ismeretlen együtthatójával:** $ax = b \implies x = \frac{b}{a}$ ($a \neq 0$).
7. **Ellenőrzés behelyettesítéssel és válaszadás.**

---

### 2. Mintapélda Zárójeles Egyenletre

$$5(2x - 3) - 2(3x + 1) = 3(x + 4) - 9$$

1. Zárójelek felbontása:
   $$10x - 15 - 6x - 2 = 3x + 12 - 9$$
2. Összevonás oldalanként:
   $$4x - 17 = 3x + 3$$
3. Rendezés ($-3x$ mindkét oldalból):
   $$x - 17 = 3$$
4. $+17$ mindkét oldalhoz:
   $$x = 20$$
5. Ellenőrzés:
   - Bal oldal: $5(40-3) - 2(60+1) = 5(37) - 2(61) = 185 - 122 = 63$
   - Jobb oldal: $3(20+4) - 9 = 3(24) - 9 = 72 - 9 = 63$
   - $B = J = 63 \implies \mathbf{M = \{20\}}$.

---

### 3. Speciális Esetek

- **Azonosság (végtelen sok megoldás):**
  $$0x = 0$$
  Minden alaphalmazbeli szám megoldás ($M = U$).
- **Ellentmondás (nincs megoldás):**
  $$0x = 8$$
  Nincs olyan szám, amit 0-val szorozva 8-at kapnánk ($M = \emptyset$, üres halmaz).
