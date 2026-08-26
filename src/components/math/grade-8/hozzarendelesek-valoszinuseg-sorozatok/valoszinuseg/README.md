# 8. Valószínűség (8. osztály)

## Tananyag Áttekintés
A valószínűségszámítás alapfogalmai: véletlen kísérlet, eseménytér, elemi események, biztos esemény ($P=1$), lehetetlen esemény ($P=0$), a klasszikus valószínűségi mező képlete és a relatív gyakoriság kapcsolata a valószínűséggel (a nagy számok törvénye).

---

## 1. A Klasszikus Valószínűség Definíciója

Ha egy véletlen kísérletnek $n$ darab véges, egymást kizáró és **egyenlően valószínű** kimenetele van, és ezek közül $k$ darab kimenetel kedvez egy $A$ esemény bekövetkezésének:

> [!IMPORTANT]
> **Klasszikus valószínűség képlete:**
> $$P(A) = \frac{\text{kedvező esetek száma}}{\text{összes lehetséges esetek száma}} = \frac{k}{n}$$

---

## 2. A Valószínűség Alaptulajdonságai

1. **Értékkészlet:** A valószínűség mindig $0$ és $1$ közötti valós szám (százalékban $0\%$ és $100\%$ között):
   $$0 \le P(A) \le 1$$
2. **Biztos esemény ($I$):** Minden kimenetel kedvező $\implies P(I) = 1$ ($100\%$).
3. **Lehetetlen esemény ($\emptyset$):** Egyetlen kimenetel sem kedvező $\implies P(\emptyset) = 0$ ($0\%$).
4. **Komplementer (ellentett) esemény ($\bar{A}$):**
   $$P(\bar{A}) = 1 - P(A)$$
   *„Annak az esélye, hogy NEM következik be: $1 - P(A)$”.*

---

## 3. A Nagy Számok Törvénye (Empirikus Valószínűség)
Ha egy véletlen kísérletet sokszor elvégzünk ($N \to \infty$), akkor egy $A$ esemény relatív gyakorisága ingadozik ugyan, de a kísérletek számának növekedésével egyre közelebb kerül az elméleti valószínűséghez ($P(A)$).
