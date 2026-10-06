# 2. Gúlák (8. osztály)

Ez a modul a hivatalos 8. osztályos matematika tanterv (**OH-MAT08TA**) **VII. Testek** fejezetének **2. Gúlák** alfejezetét dolgozza fel.

---

## 📚 Tananyag Áttekintés
A gúla geometriai definíciója, alkotóelemei (alaplap, csúcspont, oldalélek, oldallapok, palást, testmagasság, oldallap-magasság), a szabályos gúlák tulajdonságai, a derékszögű háromszögek és Pitagorasz-kapcsolatok a gúlában, a gúlahálók megszerkesztése és kiterítése, valamint az Euler-féle poliéder-tétel.

---

## 1. A Gúla Alapfogalmai és Részei

- **Gúla (Piramis):** Olyan térbeli test (poliéder), amelynek alaplapja egy tetszőleges $n$-oldalú sokszög, oldallapjai pedig egy közös csúcsban ($M$, testcsúcs) találkozó háromszögek.
- **Részei:**
  - **Alaplap ($T_a$):** Tetszőleges sokszög (háromszög, négyszög, hatszög stb.).
  - **Palást ($T_p$):** Az oldalháromszögek összessége.
  - **Alapélek ($a$):** Az alaplapot határoló szakaszok ($n$ db).
  - **Oldalélek ($b$):** A testcsúcsot az alaplap csúcsaival összekötő élek ($n$ db).
  - **Testmagasság ($m$):** A testcsúcsból az alaplap síkjára bocsátott merőleges szakasz hossza.
  - **Oldallap magassága ($m_o$):** Az oldalháromszög alaphoz tartozó magassága (az oldallap síkjában).

---

## 2. Szabályos Gúlák és Tulajdonságaik
Egy gúla **szabályos**, ha:
1. Az alaplapja egy **szabályos sokszög** (pl. egyenlő oldalú háromszög, négyzet, szabályos hatszög).
2. A csúcs merőleges vetülete pontosan az **alaplap szimmetriaközéppontjába** esik.

**Következmények:**
- Az oldalélek ($b$) mind egyenlő hosszúak: $b_1 = b_2 = \dots = b_n = b$.
- Az oldallapok mind **egybevágó egyenlő szárú háromszögek**.
- Az oldallap-magasságok mind egyenlő hosszúak ($m_o$).

---

## 3. Derékszögű Háromszögek Szabályos Gúlában (Pitagorasz-összefüggések)
1. **Testmagasság és oldallap-magasság kapcsolata:**
   $$m^2 + \left(\frac{a}{2}\right)^2 = m_o^2$$
2. **Oldallap-magasság és oldalél kapcsolata:**
   $$m_o^2 + \left(\frac{a}{2}\right)^2 = b^2$$
3. **Testmagasság és oldalél kapcsolata (lapátló felével):**
   $$m^2 + \left(\frac{d}{2}\right)^2 = b^2, \quad \text{ahol } d = a\sqrt{2} \text{ (négyzet esetén)}$$

---

## 4. Euler-féle Poliéder-tétel
Minden konvex poliéderre, így a gúlákra is igaz:
$$C - É + L = 2$$
Egy $n$-oldalú gúla esetén:
- Csúcsok száma: $C = n + 1$
- Lapok száma: $L = n + 1$
- Élek száma: $É = 2n$
- **Aranyszabály:** Minden gúlára $C = L$ (a csúcsok és lapok száma megegyezik)!

---

## 🧩 Fejlesztett Komponensek
- [**`PyramidsTheory.tsx`**](./PyramidsTheory.tsx): Részletes, interaktív tananyag dinamikus 3D SVG gúla laborral, állítható méretekkel, Pitagorasz-levezetővel és Euler-kalkulátorral.
- [**`PyramidsQuiz.tsx`**](./PyramidsQuiz.tsx): 3 szinten 30 kérdéses adaptív kvíz részletes levezetésekkel, tippekkel és puskakártyákkal.
- [**`PyramidsMatcher.tsx`**](./PyramidsMatcher.tsx): 3 szintes párosító minijáték (fogalmak, élek-csúcsok, képletek).
- [**`PyramidsSorter.tsx`**](./PyramidsSorter.tsx): 3 szintes csoportosító minijáték (gúlatípusok, igaz/hamis állítások, szakaszok funkciói).
