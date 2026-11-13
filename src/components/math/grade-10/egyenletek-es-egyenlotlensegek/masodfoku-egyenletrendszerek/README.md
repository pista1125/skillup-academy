# 9. Ráadás – Másodfokú egyenletrendszerek

## Tananyag Áttekintés
Olyan kétismeretlenes nemlineáris egyenletrendszerek megoldása, amelyekben legalább az egyik egyenlet másodfokú:
- **Behelyettesítő módszer:** Elsőfokú egyenletből ismeretlen kifejezése $\rightarrow$ másodfokúba helyettesítés $\rightarrow$ diszkrimináns és metszéspontok száma.
- **Szimmetrikus rendszerek:** $x+y = S$ és $xy = P$ alak $\rightarrow$ $u^2 - Su + P = 0$ Viète-segédegyenlet. A szimmetria miatt mindkét rendezett számpár megoldás: $(u_1; u_2)$ és $(u_2; u_1)$. Négyzetösszeg bontása: $x^2 + y^2 = (x+y)^2 - 2xy$.
- **Tagelimináció:** Két másodfokú egyenlet kivonásával a négyzetes tagok ($x^2, y^2$) kiejtése és lineáris kapcsolat nyerése.
- **Geometriai szemlélet:** Egyenes és parabola metszése, kör és egyenes metszéspontjai, érintési feltétel ($D = 0$).

---

## Modul Komponensek

1. **Vizuális elemek (`QuadraticSystemsFigures.tsx`)**:
   - `LineAndParabolaIntersectionSvg`: Egyenes és parabola szelő, érintő és elkerülő esetei.
   - `SymmetricSystemVieteBridgeSvg`: Szimmetrikus rendszer hídja és a Viète-segédegyenlet.
   - `CircleAndLineSystemSvg`: Kör és egyenes metszéspontjai ($x^2 + y^2 = r^2$).
   - `EliminationQuadraticsSvg`: Tagelimináció két másodfokú egyenletnél.
   - `OrderedPairsVerificationSvg`: Rendezett számpárok összerendelése és kötelező próba.

2. **Tananyag (`QuadraticSystemsTheory.tsx`)**:
   - Jobb felső `quickRule` blokk: **FONTOS SZABÁLYOK** a másodfokú rendszerekre.
   - 1. Egy elsőfokú és egy másodfokú egyenletből álló rendszerek (behelyettesítés és diszkrimináns).
   - 2. Szimmetrikus másodfokú egyenletrendszerek (a Viète-híd).
   - 3. Két másodfokú egyenletből álló rendszerek és tagelimináció.
   - 4. Kidolgozott érettségi mintapéldák teljes levezetéssel.
   - 5. Tipikus hibák és pontvesztési csapdák.
   - 6. **Interaktív Másodfokú Rendszer Laboratórium** (Egyenes-parabola szimulátor, Szimmetrikus rendszer kalkulátor és ellenőrző feladat a lecke legvégén).

3. **Párosító játék (`QuadraticSystemsMatcher.tsx`)**:
   - 3 nehézségi szint $\times$ 8 kártyapár (24 egyedi feladvány).
   - 1. Szint: Alapvető behelyettesítés és szimmetrikus számpárok.
   - 2. Szint: Egyenes és parabola / kör metszéspontjai.
   - 3. Szint: Bajnoki egyenletrendszerek és tagelimináció.

4. **Rendszerező játék (`QuadraticSystemsSorter.tsx`)**:
   - 3 nehézségi szint $\times$ 3 kategória (9-9 kártya szintenként).
   - 1. Szint: Megoldási stratégiák (Behelyettesítés, Viète-szimmetria, Tagelimináció).
   - 2. Szint: Valós megoldáspárok száma (2 vagy több pár, 1 pár / érintő, 0 pár / elkerülő).
   - 3. Szint: Geometriai alakzatok metszése (Egyenes és parabola, Kör és egyenes, Két másodfokú görbe).

5. **Kvíz (`QuadraticSystemsQuiz.tsx`)**:
   - 30 kérdés 3 szinten (10 kérdés/szint) puskákkal, tippekkel és részletes levezetésekkel.
   - Beépített játékváltó a Párosító és Rendszerező játékokhoz.
