# 8. Legnagyobb közös osztó (7. osztály)

## Tananyag Áttekintés
A legnagyobb közös osztó ($\text{LNKO}$) szabatos definíciója, kiszámítása a prímtényezős felbontásból és a prímtényezők halmazával (Venn-diagram), a relatív prímek fogalma és a törtek egyszerűsítésének elve.

---

## Főbb Ismeretek és Kiszámítási Módszerek

### 1. A Legnagyobb Közös Osztó Definíciója
Két vagy több pozitív egész szám közös osztói közül a legnagyobbat a számok **legnagyobb közös osztójának** nevezzük.
- **Jelölése:** $\text{LNKO}(a, b)$ vagy röviden $(a, b)$.

---

### 2. Kiszámítása Prímtényezős Felbontással
1. Mindegyik számot felbontjuk prímtényezők szorzatára (kanonikus alak).
2. Kiválasztjuk a számokban **közösen előforduló prímtényezőket**.
3. Mindegyik közös prímhez a **legkisebb előforduló hatványkitevőt** rendeljük.
4. Ezen hatványokat összeszorozzuk.

#### Mintapélda:
Határozzuk meg az $a = 360$ és $b = 840$ legnagyobb közös osztóját!

1. Prímfelbontások:
   - $360 = 2^3 \cdot 3^2 \cdot 5^1$
   - $840 = 2^3 \cdot 3^1 \cdot 5^1 \cdot 7^1$
2. Közös prímtényezők a legkisebb kitevőkön:
   - 2-es alap: $\min(3, 3) = 3 \rightarrow 2^3$
   - 3-as alap: $\min(2, 1) = 1 \rightarrow 3^1$
   - 5-ös alap: $\min(1, 1) = 1 \rightarrow 5^1$
   - 7-es alap: nem közös ($\min(0, 1) = 0$)
3. Szorzat:
   $$\text{LNKO}(360, 840) = 2^3 \cdot 3^1 \cdot 5^1 = 8 \cdot 3 \cdot 5 = \mathbf{120}$$

---

### 3. Relatív Prím Számok
- **Definíció:** Két számot **relatív prímnek** nevezünk, ha a legnagyobb közös osztójuk $1$:
  $$\text{LNKO}(a, b) = 1$$
- *Példák:*
  - A $8 = 2^3$ és $9 = 3^2$ relatív prímek ($\text{LNKO}(8, 9) = 1$), pedig külön-külön egyik sem prím!
  - Bármely két egymást követő egész szám ($n$ és $n+1$) mindig relatív prím: $\text{LNKO}(n, n+1) = 1$.

---

### 4. Alkalmazás: Törtek Tovább Nem Egyszerűsíthető Alakra Hozása
Egy tört számlálóját és nevezőjét az $\text{LNKO}$-jukkal elosztva a legegyszerűbb, tovább már nem egyszerűsíthető alakot kapjuk:
$$\frac{360}{840} = \frac{360 : 120}{840 : 120} = \frac{\mathbf{3}}{\mathbf{7}}$$
Mivel $\text{LNKO}(3, 7) = 1$, a tört tovább nem egyszerűsíthető.
