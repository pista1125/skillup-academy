# 6. A középpontos tükrözés alkalmazása (7. osztály)

## Tananyag Áttekintés
A középpontos tükrözés mint hatékony problémamegoldó és bizonyítási eszköz a geometriában: szakaszok felezőpontjára való tükrözés, párhuzamosság és egyenlőség bizonyítása, valamint a háromszög középvonal-tételének igazolása.

---

## Főbb Ismeretek és Bizonyítások

### 1. Szakaszok Felezőpontjára Való Tükrözés
Ha egy alakzatot egy adott szakasz $F$ felezőpontjára tükrözünk:
- A szakasz egyik végpontja a másik végpontjába megy át: $A' = B$ és $B' = A$.
- Ezzel a módszerrel egymást metsző szakaszok esetén gyakran hozhatunk létre paralelogrammákat és igazolhatunk egyenlőségeket.

---

### 2. A Háromszög Középvonal-tételének Bizonyítása
- **Állítás:** A háromszög bármely két oldalának felezőpontját összekötő szakasz (középvonal) párhuzamos a harmadik oldallal, és hossza annak fele.
- **Bizonyítás pontra tükrözéssel:**
  1. Legyen a $\triangle ABC$ két oldalfelezője $F_{AC}$ és $F_{BC}$.
  2. Tükrözzük az $A$ csúcsot az $F_{BC}$ pontra $\rightarrow$ kapjuk az $A'$ pontot.
  3. A középpontos tükrözés miatt az $AC$ oldal képe az $A'B$ oldal, így $A'B \parallel AC$ és $|A'B| = |AC|$.
  4. Mivel $F_{AC}$ felezi $AC$-t, a középvonal párhuzamos lesz $c$-vel, és a kapott paralelogramma segítségével belátható:
     $$k \parallel c \quad \text{és} \quad k = \frac{c}{2}$$

---

### 3. Paralelogramma Átlóinak Tulajdonsága
- **Tétel:** Egy négyszög akkor és csak akkor paralelogramma, ha az átlói felezik egymást.
- **Bizonyítás pontra tükrözéssel:**
  - Ha az átlók metszéspontja $O$, és $O$ felezi az $AC$ és $BD$ átlókat, akkor az $O$-ra vonatkozó középpontos tükrözés az $A$-t $C$-be, a $B$-t $D$-be viszi.
  - Ekkor az $AB$ szakasz képe a $CD$ szakasz, amiből következik:
    $$AB \parallel CD \quad \text{és} \quad |AB| = |CD|$$
  - Ugyanígy $BC \parallel AD$ és $|BC| = |AD|$, tehát a négyszög valóban paralelogramma.

---

### 4. Tipikus Feladatmegoldási Stratégiák
1. **Két pont távolságának átvitele:** Tükrözéssel az egymástól távol eső szakaszokat egy közös háromszögbe hozzuk.
2. **Közös szimmetriaközéppont keresése:** Ha egy feladatban szakaszfelező pont vagy átlómetszéspont szerepel, érdemes az adott pontra vonatkozó középpontos tükrözést megvizsgálni.
3. **Párhuzamos egyenesek előállítása:** Bármely egyenes nem a centrumon átmenő középpontos tükörképe garantáltan párhuzamos az eredetivel.
