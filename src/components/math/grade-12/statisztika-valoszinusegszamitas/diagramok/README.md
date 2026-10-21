# 35. Diagramok (35. lecke)

## Tananyag Áttekintés
Adatok vizuális megjelenítése különféle diagramtípusokkal (oszlop-, kör-, vonaldiagram, hisztogram), a dobozdiagram (boxplot) felépítése és elemzése, valamint a megtévesztő diagramok felismerése.

---

## Diagramtípusok

1. **Oszlopdiagram és sávdiagram:**
   - Különálló kategóriák vagy diszkrét mennyiségek gyakoriságának szemléltetése téglalapokkal.
   - Az oszlopok magassága (vagy a sávok hossza) arányos az abszolút vagy relatív gyakorisággal.
2. **Kördiagram:**
   - A teljes sokaság (100% = $360^\circ$) részeinek arányos bemutatása körcikkekkel.
   - A körszelet középponti szöge: $\alpha_i = g_i \cdot 360^\circ$.
3. **Vonaldiagram:**
   - Idősorok, folyamatok időbeli alakulásának ábrázolása pontok összekötésével.
4. **Hisztogram:**
   - Folytonos adatok osztályközös gyakoriságának ábrázolása szomszédos, hézag nélküli oszlopokkal.
   - Az oszlopok **területe** arányos az adott osztályköz gyakoriságával.

---

## A Dobozdiagram (Boxplot)

A dobozdiagram az úgynevezett **5 számos összefoglaláson** alapul:
$$\min, \quad Q_1, \quad Me \ (Q_2), \quad Q_3, \quad \max$$

- **A doboz:** Az alsó kvártilistől ($Q_1$) a felső kvártilisig ($Q_3$) tart. A doboz hossza az interkvartilis terjedelem ($IQR = Q_3 - Q_1$). A mintaelemek középső 50%-át foglalja magában.
- **A vonal a dobozban:** A medián ($Me$) helyét jelöli.
- **A "bajuszok" (tüskék):** A doboz szélétől a minimumig, illetve a maximumig terjednek (vagy kiugró értékek hiányában legfeljebb $1{,}5 \cdot IQR$ távolságig).
- **Szimmetria vs. ferdeség:**
  - Ha a medián a doboz közepén van, az eloszlás szimmetrikus.
  - Ha a medián közelebb van $Q_1$-hez, az eloszlás jobbra ferde (jobbra nyúlt).

---

## Megtévesztő Diagramok Kiszűrése
- **Elvágott skála:** A függőleges tengely nem 0-ról indul, ami vizuálisan eltúlozza az apró eltéréseket.
- **Nem egyenletes skálázás:** Az intervallumok hossza vagy felosztása nem egyenletes.
- **3D torzítás:** A perspektivikus 3D diagramok az elöl lévő szeleteket aránytalanul nagynak mutatják.
