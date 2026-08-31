# 2. Írásbeli kivonás 1000-ig

## Tananyag Áttekintés
A háromjegyű számok írásbeli kivonása többszöri átváltással és különleges esetek kezelése: kivonás kerek százasokból és a négyjegyű $1000$-ből (nullák átváltása a szomszédos helyiértékekről), valamint a pontos ellenőrzés írásbeli összeadással.

---

## 1. Kivonás 1000-ből (Nullák Átváltása)

### Példa: $1000 - 364$
```
        .  .
  1  0  0  0
-    3  6  4
------------
     6  3  6
```

1. **Egyesek:** $4$-hez, hogy $0$ legyen, nem tudunk adni. Átváltunk a balra lévő legközelebbi nem nulla helyiértékről (az ezresből): $4$-hez, hogy **$10$** legyen, kell adni **$6$**-ot. Leírom a $6$-ot.
2. **Tízesek:** A felbontott tízes miatt: $1 + 6 = 7$. $7$-hez, hogy **$10$** legyen, kell adni **$3$**-at. Leírom a $3$-at.
3. **Százasok:** $1 + 3 = 4$. $4$-hez, hogy **$10$** legyen, kell adni **$6$**-ot. Leírom a $6$-ot.
$$\text{Különbség: } \mathbf{636}$$

---

## 2. Ellenőrzés Írásbeli Összeadással
$$\text{Különbség} + \text{Kivonandó} = \text{Kisebbítendő}$$
```
  ¹  ¹  ¹
     6  3  6
+    3  6  4
------------
  1  0  0  0   <-- Helyes!
```
