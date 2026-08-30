# 12. Tizedes törtek összeadása és kivonása

## Tananyag Áttekintés
Tizedestörtek írásbeli összeadása és kivonása, az aranyszabály: *a tizedesvesszőknek pontosan egymás alá kell kerülniük*, nullákkal való kiegészítés és az eredmény becslése kerekítéssel.

---

## Főbb Szabályok és Algoritmus

### 1. Írásbeli Összeadás és Kivonás
1. A számokat úgy írjuk egymás alá, hogy a **tizedesvesszők pontosan egymás alá** essenek (így az egész részek és a tizedek is a helyükre kerülnek).
2. Szükség esetén a tizedesjegyek számát a végére írt nullákkal egyenlővé tesszük.
3. A műveletet úgy végezzük el, mint az egész számoknál (jobbról balra, átlépésekkel).
4. Az eredménybe a tizedesvesszőt **ugyanabba az oszlopba** tesszük le.

### Példa:
$$\begin{array}{r@{\quad}l}
  & 12{,}450 \\
+ & \phantom{0}3{,}782 \\
\hline
  & 16{,}232
\end{array}$$
