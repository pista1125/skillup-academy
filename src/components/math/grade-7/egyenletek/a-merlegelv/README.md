# 9. A mérlegelv (7. osztály)

## Tananyag Áttekintés
A mérlegelv matematikai és szemléleti alapjai: a kétkarú mérleg fizikai és algebrai modellje, az ekvivalens (egyenértékű) átalakítások szabályai, az egyenletrendezés lépései és az ellenőrzés fontossága.

- **Tankönyv:** 156–159. oldal
- **Munkafüzet:** 96–97. oldal

---

## Főbb Ismeretek és A Mérlegelv Szabályai

### 1. A Kétkarú Mérleg Modellje
Az egyenlet két oldalát egy egyensúlyban lévő kétkarú mérleg két serpenyőjeként képzeljük el.
- Az **egyenlőségjel ($=$)** a mérleg egyensúlyi állapotát jelenti.
- Az egyensúly fennmarad, ha mindkét serpenyővel **ugyanazt a műveletet** végezzük el.

---

### 2. Az Ekvivalens (Egyenértékű) Átalakítások
Olyan lépések, amelyek nem változtatják meg az egyenlet megoldáshalmazát:

1. **Mindkét oldalhoz ugyanazt a számot vagy kifejezést hozzáadhatjuk:**
   $$A = B \iff A + c = B + c$$
2. **Mindkét oldalból ugyanazt a számot vagy kifejezést kivonhatjuk:**
   $$A = B \iff A - c = B - c$$
3. **Mindkét oldalt megszorozhatjuk ugyanazzal a nullától különböző számmal:**
   $$A = B \iff A \cdot c = B \cdot c \quad (c \neq 0)$$
4. **Mindkét oldalt eloszthatjuk ugyanazzal a nullától különböző számmal:**
   $$A = B \iff A : c = B : c \quad (c \neq 0)$$

> [!CAUTION]
> Nullával való szorzás és osztás **TILOS** (nem ekvivalens átalakítás!).

---

### 3. A 4 Lépéses Rendezési Algoritmus
1. **Előkészítés:** Zárójelfelbontás és oldalankénti összevonás.
2. **Ismeretlenek egy oldalra:** A kisebb együtthatójú $x$-es tag kivonása/hozzáadása mindkét oldalon.
3. **Konstans számok a másik oldalra:** A számok eltüntetése az ismeretlen mellől ellentétes művelettel.
4. **Osztás az ismeretlen együtthatójával:** Mindkét oldal osztása $x$ szorzójával, majd **ellenőrzés** behelyettesítéssel.

---

## Modul Komponensek
- `BalanceScaleTheory.tsx`: Interaktív Kétkarú Mérleg Szimulátor animált SVG grafikával, lépésről lépésre követhető serpenyő-átalakulásokkal és algebrai levezetéssel.
- `BalanceScaleQuiz.tsx`: 30 kérdés 3 nehézségi szinten, 4 interaktív SVG összefoglaló kártya, beépített játékkapcsolat.
- `BalanceScaleMatcher.tsx`: 3 szintű párosító játék (kezdőállapotok és első lépések, átrendezett alakok, egyenletgyökök).
- `BalanceScaleSorter.tsx`: 3 szintű csoportosító játék (lépések célja, műveletek érvényessége a mérlegen, gyökök típusa).
