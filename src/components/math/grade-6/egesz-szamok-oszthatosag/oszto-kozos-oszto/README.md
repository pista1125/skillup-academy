# 13. Osztó, közös osztó

## Tananyag Áttekintés
Közös osztók és a legnagyobb közös osztó ($\text{LKÖ}$ / $\text{LNKO}$) fogalma, kiszámítási módjai, relatív prímek fogalma és alkalmazása törtek egyszerűsítésénél.

---

## Főbb Ismeretek és Kiszámítási Módszerek

### 1. A Legnagyobb Közös Osztó Definíciója
Két vagy több pozitív egész szám közös osztói közül a legnagyobbat a számok **legnagyobb közös osztójának** nevezzük.
- **Jelölése:** $\text{LKÖ}(a, b)$ vagy $\text{LNKO}(a, b)$ vagy $(a, b)$.

### 2. Kiszámítása Prímtényezős Felbontással
1. Mindegyik számot felbontjuk prímtényezők szorzatára.
2. Kiválasztjuk a számokban **közösen előforduló prímtényezőket**.
3. Mindegyik közös prímhez a **legkisebb előforduló hatványkitevőt** rendeljük.
4. Ezen hatványokat összeszorozzuk.

#### Mintapélda:
Határozzuk meg a $24$ és $36$ legnagyobb közös osztóját!
1. Prímfelbontások:
   - $24 = 2^3 \cdot 3^1$
   - $36 = 2^2 \cdot 3^2$
2. Közös prímek a legkisebb kitevőkön:
   - 2-es alap: $\min(3, 2) = 2 \rightarrow 2^2 = 4$
   - 3-as alap: $\min(1, 2) = 1 \rightarrow 3^1 = 3$
3. Szorzat:
   $$\text{LKÖ}(24, 36) = 2^2 \cdot 3^1 = 4 \cdot 3 = \mathbf{12}$$

### 3. Relatív Prím Számok
- Két szám **relatív prím**, ha a legnagyobb közös osztójuk $1$:
  $$\text{LKÖ}(a, b) = 1$$
- *Példa:* $8$ és $9$ relatív prímek ($\text{LKÖ}(8, 9) = 1$).

### 4. Alkalmazás: Törtek Egyszerűsítése
Ha egy tört számlálóját és nevezőjét elosztjuk az $\text{LKÖ}$-jükkel, akkor a legegyszerűbb, tovább már nem egyszerűsíthető alakot kapjuk.
