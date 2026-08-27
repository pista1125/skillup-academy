# 9. Legkisebb közös többszörös (7. osztály)

## Tananyag Áttekintés
A legkisebb közös többszörös ($\text{LKKT}$) definíciója, kiszámítási módszere a prímtényezős felbontásból, a legkisebb közös nevező meghatározása, valamint az $\text{LNKO}$ és $\text{LKKT}$ közötti alaptétel.

---

## Főbb Ismeretek és Képletek

### 1. A Legkisebb Közös Többszörös Definíciója
Két vagy több pozitív egész szám pozitív közös többszörösei közül a legkisebbet a számok **legkisebb közös többszörösének** nevezzük.
- **Jelölése:** $\text{LKKT}(a, b)$ vagy röviden $[a, b]$.

---

### 2. Kiszámítása Prímtényezős Felbontással
1. Mindegyik számot felbontjuk prímtényezők szorzatára.
2. Kiválasztjuk az **összes olyan prímtényezőt**, amely legalább az egyik számban szerepel.
3. Mindegyik prímhez a **legnagyobb előforduló hatványkitevőt** rendeljük.
4. Ezen hatványokat összeszorozzuk.

#### Mintapélda:
Határozzuk meg az $a = 360$ és $b = 840$ legkisebb közös többszörösét!

1. Prímfelbontások:
   - $360 = 2^3 \cdot 3^2 \cdot 5^1$
   - $840 = 2^3 \cdot 3^1 \cdot 5^1 \cdot 7^1$
2. Összes prímtényező a legnagyobb kitevőkön:
   - 2-es alap: $\max(3, 3) = 3 \rightarrow 2^3$
   - 3-as alap: $\max(2, 1) = 2 \rightarrow 3^2$
   - 5-ös alap: $\max(1, 1) = 1 \rightarrow 5^1$
   - 7-es alap: $\max(0, 1) = 1 \rightarrow 7^1$
3. Szorzat:
   $$\text{LKKT}(360, 840) = 2^3 \cdot 3^2 \cdot 5^1 \cdot 7^1 = 8 \cdot 9 \cdot 5 \cdot 7 = \mathbf{2520}$$

---

### 3. Az LNKO és LKKT Kapcsolata Két Szám Esetén
> [!IMPORTANT]
> **Tétel:** Bármely két $a$ és $b$ pozitív egész szám esetén a legnagyobb közös osztójuk és a legkisebb közös többszörösük szorzata egyenlő a két szám szorzatával:
> $$\text{LNKO}(a, b) \cdot \text{LKKT}(a, b) = a \cdot b$$

*Ellenőrzés az előző példán:*
$$120 \cdot 2520 = 302\ 400 = 360 \cdot 840 \quad \checkmark$$

---

### 4. Alkalmazások a Gyakorlatban
1. **Törtek összeadása és kivonása:** A legkisebb közös nevező a nevezők $\text{LKKT}$-je:
   $$\frac{7}{360} + \frac{11}{840} = \frac{7 \cdot 7}{2520} + \frac{11 \cdot 3}{2520} = \frac{49 + 33}{2520} = \frac{82}{2520} = \frac{41}{1260}$$
2. **Periodikus találkozási feladatok:** Ha egy busz 12 percenként, egy másik 18 percenként indul a végállomásról, mikor indulnak legközelebb egyszerre?
   $$\text{LKKT}(12, 18) = \text{LKKT}(2^2 \cdot 3, 2 \cdot 3^2) = 2^2 \cdot 3^2 = 36\text{ perc múlva}.$$
