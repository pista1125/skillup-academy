# 37. Az eseménytér (37. lecke)

## Tananyag Áttekintés
A véletlen kísérlet és az elemi események fogalma, az eseménytér ($\Omega$), az események halmazelméleti értelmezése, biztos és lehetetlen esemény, valamint az eseménytér modellezése fa- és Venn-diagrammal.

---

## Alapfogalmak

- **Véletlen kísérlet:** Olyan megfigyelés vagy kísérlet, amelyet azonos körülmények között tetszőlegesen sokszor megismételhetünk, de kimenetele előre nem jósolható meg biztosan (pl. pénzfeldobás, kockadobás, lottóhúzás).
- **Elemi esemény ($\omega$):** A kísérlet egyetlen, tovább nem bontható lehetséges kimenetele.
- **Eseménytér ($\Omega$):** Az összes lehetséges elemi esemény halmaza.
  - *Példa 1:* Szabályos pénzérme feldobása: $\Omega = \{\text{fej}, \text{írás}\}$.
  - *Példa 2:* Egy kocka eldobása: $\Omega = \{1, 2, 3, 4, 5, 6\}$.
  - *Példa 3:* Két érme feldobása: $\Omega = \{(F,F), (F,Í), (Í,F), (Í,Í)\}$.

---

## Események mint Részhalmazok

- **Esemény ($A$):** Az eseménytér tetszőleges részhalmaza ($A \subseteq \Omega$).
  - Egy esemény akkor következik be, ha a kísérlet kimenetele az adott részhalmazba tartozik.
  - *Példa:* Páros számot dobunk kockával: $A = \{2, 4, 6\} \subset \Omega$.

### Speciális Események:
1. **Biztos esemény ($\Omega$):** A kísérlet elvégzésekor minden körülmények között bekövetkezik ($P(\Omega) = 1$).
2. **Lehetetlen esemény ($\emptyset$):** Soha nem következhet be, az üres halmaz ($P(\emptyset) = 0$).
3. **Ellentett (komplementer) esemény ($\bar{A}$):** Pontosan akkor következik be, amikor $A$ nem következik be:
   $$\bar{A} = \Omega \setminus A$$
4. **Egymást kizáró események:** Ha nem következhetnek be egyszerre, azaz közös részük üres halmaz:
   $$A \cap B = \emptyset$$

---

## Eseménytér Modellezése
- **Venn-diagram:** Események metszeteinek és unióinak síkbeli ábrázolása zárt görbékkel.
- **Fadiagram (eseményfa):** Többlépcsős kísérletek (pl. egymás utáni húzások, dobozokból választás) lehetséges ágainak vizuális feltérképezése.
