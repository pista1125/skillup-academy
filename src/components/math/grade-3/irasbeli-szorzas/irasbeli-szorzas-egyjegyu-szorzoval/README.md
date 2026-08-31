# 3. Írásbeli szorzás egyjegyű szorzóval

## Tananyag Áttekintés
Az írásbeli szorzás algoritmusa egyjegyű szorzóval: helyiértékes lejegyzés, szorzás az egyesekkel kezdve jobbról balra, átlépések (tízes-, százasátlépés) és a továbbvitt maradék pontos kezelése.

---

## Az Algoritmus Lépései

### Példa: $164 \cdot 4$
```
  ¹  ¹
  1  6  4  · 4
  ------------
  6  5  6
```

1. **Egyesek:** $4 \cdot 4 = 16$. Leírom a **$6$**-ot az egyesek alá, megjegyzek **$1$ tízest**!
2. **Tízesek:** $4 \cdot 6 = 24$; $24 + 1 = 25$. Leírom az **$5$**-öt a tízesek alá, megjegyzek **$2$ százast**!
3. **Százasok:** $4 \cdot 1 = 4$; $4 + 2 = 6$. Leírom a **$6$**-ot a százasok alá.
$$\text{Szorzat: } \mathbf{656}$$

---

### Alapszabályok
- Mindig az **egyesek felől** (jobbról balra) haladunk.
- A szorzás eredményéhez **mindig hozzáadjuk a továbbvitt maradékot**, mielőtt a következő helyiértéket leírnánk!
