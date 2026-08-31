# 3. Hányféle lehetőség van?

## Tananyag Áttekintés
Kombinatorikai alapismeretek: lehetőségek összeszámlálása, sorbarendezések (permutációk), faágrajz (fadiagram) készítése, és szisztematikus felsorolás a kihagyások és ismétlések elkerülésére.

---

## Módszerek és Esetek Számlálása

### 1. Sorbarendezés (Pl. 3 gyermek sorban állása: Anna, Béla, Cili)
Szisztematikus felírás a kezdőbetűkkel:
1. **A-val kezdődők:** A-B-C, A-C-B (2 eset)
2. **B-vel kezdődők:** B-A-C, B-C-A (2 eset)
3. **C-vel kezdődők:** C-A-B, C-B-A (2 eset)
**Összesen:** $3 \cdot 2 \cdot 1 = 6$ különböző lehetőség.

### 2. Öltözködős Feladat (Póló és nadrág választás)
- Ha van $3$ féle póló (piros, kék, sárga) és $2$ féle nadrág (farmernadrág, melegítő):
- Minden pólóhoz választható 2 nadrág $\implies 3 \cdot 2 = 6$ különböző öltözet állítható össze.

### 3. Fadiagram (Ágrajz) Készítése
A fa gyökeréből kiindulva minden döntési lépésnél újabb ágak nyílnak. Az utolsó ágak végpontjainak száma adja meg az összes lehetőséget.
