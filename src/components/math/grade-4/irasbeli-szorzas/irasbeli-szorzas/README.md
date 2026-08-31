# 2. Írásbeli szorzás

## Tananyag Áttekintés
A kétjegyű számmal végzett írásbeli szorzás pontos lejegyzési formája és algoritmusa: a részletszorzatok képzése, helyiérték szerinti eltolása, a részletszorzatok írásbeli összeadása, a maradékok és átvitelek kezelése.

---

## Az Írásbeli Szorzás Algoritmusa

### Példa: $146 \cdot 34$

```
   1 4 6 · 3 4
   ———————————
     4 3 8 0   (146 · 30  -> a 3 tízes miatt 1 helyiértékkel balra tolva, vagy 0-val zárva)
       5 8 4   (146 · 4)
   ———————————
     4 9 6 4   (A két részletszorzat összege)
```

### Lépések Részletesen:
1. **Becslés:** $150 \cdot 30 = 4500$.
2. **1. részletszorzat:** Megszorozzuk a szorzandót a tízesekkel ($3$ tízes):
   - $3 \cdot 6 = 18$, leírom a $8$-at a tízesek alá, maradt $1$.
   - $3 \cdot 4 = 12 + 1 = 13$, leírom a $3$-at, maradt $1$.
   - $3 \cdot 1 = 3 + 1 = 4$, leírom a $4$-et. $\implies 438$ (tízes).
3. **2. részletszorzat:** Megszorozzuk a szorzandót az egyesekkel ($4$ egyes):
   - $4 \cdot 6 = 24$, leírom a $4$-et az egyesek alá, maradt $2$.
   - $4 \cdot 4 = 16 + 2 = 18$, leírom a $8$-at, maradt $1$.
   - $4 \cdot 1 = 4 + 1 = 5$, leírom az $5$-öt. $\implies 584$ (egyes).
4. **Összeadás:** A két részletszorzatot helyiérték szerint pontosan összeadjuk $\implies 4964$.
5. **Ellenőrzés:** Összevetjük a becsléssel ($4964 \approx 4500$).
