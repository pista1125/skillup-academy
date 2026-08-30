# 8. Összeadás, írásbeli összeadás

## Tananyag Áttekintés
Az összeadás fogalma és tagjai (tagok, összeg), fejben számolási stratégiák, az írásbeli összeadás algoritmusa (helyiértékek pontos egymás alá írása, átlépések kezelése) és az eredmény ellenőrzése kivonással vagy a tagok felcserélésével.

---

## Főbb Szabályok és Algoritmus

### 1. Az Összeadás Tagjai és Tulajdonságai
$$\text{első tag} + \text{második tag} = \text{összeg}$$
- **Kommutatív (felcserélhető):** $a + b = b + a$
- **Asszociatív (csoportosítható):** $(a + b) + c = a + (b + c)$

### 2. Írásbeli Összeadás Lépései
1. A számokat egymás alá írjuk úgy, hogy az azonos helyiértékek (egyesek az egyesek alá, tízesek a tízesek alá stb.) pontosan egymás alá kerüljenek.
2. Jobbról balra (az egyesek felől) kezdjük az összeadást.
3. Ha egy helyiértéken az összeg $\ge 10$, a tízeseket átvisszük a következő (balra lévő) helyiértékre (*„maradt az $1$”*).
