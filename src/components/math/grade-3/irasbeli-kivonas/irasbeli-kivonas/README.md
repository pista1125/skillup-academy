# 3. Írásbeli kivonás

## Tananyag Áttekintés
Az írásbeli kivonás pontos algoritmusa a pótlásos eljárással: átváltás nélküli kivonás, tízesátváltás, százasátváltás, és kétszeres átváltás, valamint az elengedhetetlen ellenőrzés írásbeli összeadással.

---

## Az Algoritmus Lépései (Pótlásos Eljárás)

### 1. Tízesátváltással ($382 - 147$)
```
        .
  3  8  2
- 1  4  7
---------
  2  3  5
```
1. **Egyesek:** $7$-hez, hogy $2$ legyen, nem tudunk adni. Átváltunk egy tízest: $7$-hez, hogy **$12$** legyen, kell adni **$5$**-öt. Leírom az $5$-öt, a tízes fölé pontot teszek (vagy a levont $1$-et megjegyzem).
2. **Tízesek:** $1 + 4 = 5$. $5$-höz, hogy $8$ legyen, kell adni **$3$**-at. Leírom a $3$-at.
3. **Százasok:** $1$-hez, hogy $3$ legyen, kell adni **$2$**-t. Leírom a $2$-t.
$$\text{Különbség: } \mathbf{235}$$

### 2. Ellenőrzés Írásbeli Összeadással
$$\text{Különbség} + \text{Kivonandó} = \text{Kisebbítendő}$$
```
    ¹
  2  3  5
+ 1  4  7
---------
  3  8  2   <-- Megegyezik a kisebbítendővel!
```
