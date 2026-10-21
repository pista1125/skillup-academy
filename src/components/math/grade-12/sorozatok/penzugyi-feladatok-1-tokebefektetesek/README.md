# 29. Pénzügyi feladatok I. – tőkebefektetések (29. lecke)

## Tananyag Áttekintés
Pénzügyi alapismeretek, egyszerű kamat és kamatos kamat számítása, kamattényező ($q$), valamint a rendszeres megtakarítások (gyűjtőjáradék) mértani sorozattal történő modellezése.

---

## 1. Kamatos Kamat Számítása

Ha egy $K_0$ kezdőtőkét évi $p\%$ kamatláb mellett befektetünk $n$ évre, és a kamatot a tőkéhez írják (kamatos kamat):
- **Kamattényező ($q$):**
  $$q = 1 + \frac{p}{100}$$
- **A megnövekedett tőke $n$ év elteltével ($K_n$):**
  $$K_n = K_0 \cdot q^n = K_0 \cdot \left(1 + \frac{p}{100}\right)^n$$
- **A kamatösszeg:** $K_{\text{kamat}} = K_n - K_0$.
- **Futamidő meghatározása logaritmussal:**
  Ha azt kérdezik, hány év alatt duplázódik meg a tőke ($K_n = 2K_0$):
  $$q^n = 2 \implies n = \frac{\log 2}{\log q}$$

---

## 2. Rendszeres Megtakarítás (Gyűjtőjáradék)

Ha minden év elején elhelyezünk $a$ összeget a bankban évi $p\%$ kamatos kamat mellett ($q = 1 + \frac{p}{100}$):
- Az 1. befizetés $n$ évig kamatozik: $a \cdot q^n$
- A 2. befizetés $n - 1$ évig kamatozik: $a \cdot q^{n-1}$
- $\dots$
- Az utolsó ($n$-edik) befizetés 1 évig kamatozik: $a \cdot q$

Az összes megtakarítás az $n$ év végén egy mértani sorozat összege:
$$S_n = a \cdot q + a \cdot q^2 + \dots + a \cdot q^n = a \cdot q \cdot \frac{q^n - 1}{q - 1}$$

- **Ha a befizetés minden év végén történik:**
  Az utolsó befizetés nem kamatozik ($a$), így:
  $$S_n = a + a \cdot q + \dots + a \cdot q^{n-1} = a \cdot \frac{q^n - 1}{q - 1}$$
