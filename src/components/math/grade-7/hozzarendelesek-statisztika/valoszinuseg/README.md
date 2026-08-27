# 6. Valószínűség (7. osztály)

## Tananyag Áttekintés
Véletlen kísérletek, események, biztos és lehetetlen események, a klasszikus valószínűségi modell és egyszerű valószínűségszámítási feladatok.

---

## Főbb Fogalmak és a Klasszikus Valószínűségi Modell

### 1. Alapfogalmak
- **Véletlen kísérlet:** Olyan folyamat, amelynek kimenetele nem jósolható meg előre biztosan (pl. kockadobás, pénzfeldobás).
- **Elemi események:** A kísérlet lehetséges egyedi kimenetelei (pl. szabályos dobókockánál: $1, 2, 3, 4, 5, 6$).
- **Események típusai:**
  - **Biztos esemény ($I$):** Minden kísérlet alkalmával biztosan bekövetkezik $\implies P(I) = 1$ ($100\%$). *(Pl. 7-nél kisebb számot dobunk kockával).*
  - **Lehetetlen esemény ($\emptyset$):** Soha nem következhet be $\implies P(\emptyset) = 0$ ($0\%$). *(Pl. 8-ast dobunk normál kockával).*
  - **Véletlen esemény ($A$):** Bekövetkezhet vagy nem $\implies 0 < P(A) < 1$.

---

### 2. A Klasszikus Valószínűség Kiszámítása
Ha egy kísérlet összes lehetséges kimenetele **egyenlően valószínű**:

$$P(A) = \frac{\text{kedvező esetek száma}}{\text{összes eset száma}} = \frac{k}{n}$$

> [!IMPORTANT]
> **Példák:**
> 1. *Páros szám dobása kockával:*
>    - Összes eset: $n = 6$ ($1, 2, 3, 4, 5, 6$)
>    - Kedvező esetek: $k = 3$ ($2, 4, 6$)
>    - $P(\text{páros}) = \frac{3}{6} = \frac{1}{2} = 0{,}5 = \mathbf{50\%}$
>
> 2. *Fej dobása érmével:*
>    - $P(\text{fej}) = \frac{1}{2} = 0{,}5 = \mathbf{50\%}$
>
> 3. *Prímszám dobása kockával:*
>    - Kedvező esetek: $2, 3, 5 \implies k = 3 \implies P(\text{prím}) = \frac{3}{6} = \mathbf{50\%}$
