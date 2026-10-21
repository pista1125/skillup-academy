# 30. Pénzügyi feladatok II. – hitelek és kockázatok (30. lecke)

## Tananyag Áttekintés
A hitelek felvétele és visszafizetése, annuitásos hiteltörlesztés (egyenlő törlesztőrészletek), a tőke- és kamattartalom változása, valamint a THM és a pénzügyi kockázatok.

---

## 1. Annuitásos Hiteltörlesztés

A leggyakoribb hiteltípusnál az adós minden törlesztési időszak végén azonos $a$ összeget (annuitást) fizet vissza.
- $H$: a felvett hitel összege (kölcsön)
- $p\%$: kamatláb egy időszakra
- $q = 1 + \frac{p}{100}$: kamattényező
- $n$: a törlesztési időszakok száma
- $a$: az egyenletes törlesztőrészlet

### Az Alapegyenlet Felállítása:
A hitel $n$ időszak utáni felkamatolt értékének meg kell egyeznie a befizetett törlesztőrészletek felkamatolt összegével:
$$H \cdot q^n = a \cdot \frac{q^n - 1}{q - 1}$$

Ebből a **rendszeres törlesztőrészlet ($a$)**:
$$a = H \cdot \frac{q^n \cdot (q - 1)}{q^n - 1}$$

---

## 2. A Törlesztőrészlet Összetétele

Minden törlesztőrészlet két részből áll:
$$\text{Törlesztőrészlet} = \text{Kamatfizetés} + \text{Tőketörlesztés}$$
- A futamidő **elején** a fennálló tőketartozás nagy, ezért a törlesztőrészlet jelentős része a kamat megfizetésére megy el, és csak kis része csökkenti a tényleges tőkét.
- A futamidő **végéhez közeledve** a tőketartozás csökken, így a kamatteher kicsi, és a törlesztőrészlet szinte teljes egészében a tőkét fogyasztja el.

---

## 3. Pénzügyi Mutatók és Kockázatok

- **THM (Teljes Hiteldíj Mutató):** A hitel felvételéhez kapcsolódó valamennyi költséget (kamat, kezelési költség, folyósítási díj stb.) tartalmazó éves százalékos mutató.
- **Kamatkockázat:** Változó kamatozású hiteleknél a referenciakamat emelkedése megemeli a havi törlesztőrészletet.
- **Árfolyamkockázat:** Devizahiteleknél a forint gyengülése növeli a forintban fizetendő részletet és a fennálló tőketartozást.
- **Infláció:** Csökkenti a pénz vásárlóerejét.
