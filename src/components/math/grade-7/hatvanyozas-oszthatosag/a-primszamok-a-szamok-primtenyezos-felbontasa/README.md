# 5. A prímszámok. A számok prímtényezős felbontása (7. osztály)

## Tananyag Áttekintés
A prímszámok és összetett számok fogalma, a számelmélet alaptétele, a természetes számok egyértelmű prímtényezős felbontása (kanonikus alak) és a felbontás gyakorlati eljárása.

---

## Főbb Ismeretek és Fogalmak

### 1. Prímszámok és Összetett Számok
A pozitív egész számok osztóik száma szerint 3 csoportba oszthatók:
1. **Az 1-es szám:** Pontosan $1$ osztója van $\rightarrow$ **nem prím és nem összetett**.
2. **Prímszámok (törzsszámok):** Pontosan $2$ pozitív osztójuk van: az $1$ és önmaguk ($p \in \{2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, \dots\}$).
   - A **$2$ a legkisebb prímszám**, és az **egyetlen páros prím**.
   - Végtelen sok prímszám létezik (Eukleidész tétele).
3. **Összetett számok:** $2$-nél több pozitív osztójuk van ($4, 6, 8, 9, 10, 12, \dots$). Felbonthatók egynél nagyobb egész számok szorzatára.

---

### 2. A Számelmélet Alaptétele
> [!IMPORTANT]
> **Tétel:** Minden $1$-nél nagyobb természetes szám vagy prímszám, vagy – a tényezők sorrendjétől eltekintve – **egyértelműen felírható prímszámok szorzataként**.

A felírási alak a szám **kanonikus alakja**:
$$n = p_1^{\alpha_1} \cdot p_2^{\alpha_2} \cdot \dots \cdot p_k^{\alpha_k}$$
ahol $p_1 < p_2 < \dots < p_k$ különböző prímszámok, $\alpha_i \in \mathbb{Z}^+$ pedig a hozzájuk tartozó hatványkitevők.

---

### 3. A Prímtényezős Felbontás Módszere (Függőleges Vonalas Eljárás)
A számot szisztematikusan osztjuk a legkisebb lehetséges prímekkel:

```
 360 | 2
 180 | 2
  90 | 2
  45 | 3
  15 | 3
   5 | 5
   1 |
```

A szorzat alak:
$$360 = 2 \cdot 2 \cdot 2 \cdot 3 \cdot 3 \cdot 5 = 2^3 \cdot 3^2 \cdot 5$$

---

### 4. Eratoszthenész Szitája (Prímszámok Keresése 100-ig)
1. Felírjuk a számokat $1$-től $100$-ig.
2. Az $1$-et áthúzzuk (nem prím).
3. A $2$-t bekarikázzuk, majd az összes $2$-nél nagyobb páros számot áthúzzuk.
4. A következő nyitva maradt prím a $3$, áthúzzuk a $3$ többszöröseit.
5. Ugyanígy járunk el $5$-re és $7$-re.
6. Mivel $10^2 = 100$, elegendő $\sqrt{100} = 10$-ig szitálni: az összes megmaradt bekarikázatlan szám **prímszám**!
