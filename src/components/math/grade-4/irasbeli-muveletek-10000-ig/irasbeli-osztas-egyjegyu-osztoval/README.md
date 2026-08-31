# 3. Írásbeli osztás egyjegyű osztóval

## Tananyag Áttekintés
Többjegyű számok írásbeli osztása (lépcsős osztás algoritmus) egyjegyű osztóval: bennfoglalás a legmagasabb helyiértéktől balról jobbra, visszaszorzás, maradék képzése és a következő számjegy lehozása.

---

## Az Osztás Algoritmusa

### 1. Példa: $7392 : 6 = 1232$
1. **Első lépés (Ezresek):** $7$-ben a $6$ megvan **$1$**-szer, maradt az **$1$**.
2. **Második lépés (Százasok):** Lehozzuk a $3$-at $\rightarrow 13$. $13$-ban a $6$ megvan **$2$**-szer ($2 \cdot 6 = 12$), maradt az **$1$**.
3. **Harmadik lépés (Tízesek):** Lehozzuk a $9$-et $\rightarrow 19$. $19$-ben a $6$ megvan **$3$**-szor ($3 \cdot 6 = 18$), maradt az **$1$**.
4. **Negyedik lépés (Egyesek):** Lehozzuk a $2$-t $\rightarrow 12$. $12$-ben a $6$ megvan **$2$**-szer ($2 \cdot 6 = 12$), maradt a **$0$**.
5. **Végeredmény:** $1232$, nincs maradék.

---

### 2. Maradékos Írásbeli Osztás és Ellenőrzés
- Ha az utolsó lépés után nem 0 a maradék, akkor a maradékot feljegyezzük: pl. $4583 : 4 = 1145$, m.: $3$.
- **Ellenőrzés képlete:**
  $$\text{Hányados} \cdot \text{Osztó} + \text{Maradék} = \text{Osztandó}$$
  $$1145 \cdot 4 + 3 = 4580 + 3 = 4583$$
