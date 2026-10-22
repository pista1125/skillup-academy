# 2. Gráfok (9. Osztály)

## Tananyag és Modul Áttekintés
Átfogó gráfelméleti modul a 9. osztályos matematika I. témaköréhez (Kombinatorika, halmazok).

---

## Modul Struktúra
1. **GraphsTheory.tsx**:
   - 8 részletes fejezet gazdag elméleti és gyakorlati magyarázatokkal.
   - 10 részletes pedagógiai SVG ábra (egyszerű vs. multigráf, izolált és levélcsúcsok, Euler-tétel levezetése, lehetséges vs. lehetetlen fokszám-sorozatok, nevezetes gráfcsaládok K_n, C_n, P_n, S_n, fák családja, K_3,3 páros gráf, 4 fős bajnokság irányított gráfja, n-1 élű csapda, és feladatmegoldó döntési fa).
   - 2 interaktív labor: Fokszám- és élszám kalkulátor paritásellenőrzéssel, valamint Teljes gráf kalkulátor.
   - 3 kérdéses gyors önellenőrző mini kvíz közvetlen visszajelzéssel.
2. **GraphsQuiz.tsx**:
   - 30 kérdés 3 nehézségi szinten (Alapok, Fokszámok és paritás, Haladó gráftételek).
   - Részletes lépésről-lépésre magyarázatok és segítség (hints).
   - Beépített felugró képlettár és gráfelméleti összefoglaló.
3. **GraphsMatcher.tsx**:
   - 3 szint × 8 kártyapár (24 kártyapár) mini SVG ábrákkal a kártyákon.
4. **GraphsSorter.tsx**:
   - 3 szint × 12 elem (36 kártya) 3-3 kategóriába rendezve (alapfogalmak, fokszám-sorozatok megvalósíthatósága, nevezetes gráfok tulajdonságai).
5. **index.ts**:
   - Komponensek központi exportja.

---

## Fő Fogalmak és Képletek
- **Egyszerű gráf**: Nincs hurokél és nincsenek többszörös élek.
- **Euler-tétel (Kézfogási lemma)**: $\sum_{v \in V} d(v) = 2 \cdot |E|$.
- **Paritási következmény**: A páratlan fokszámú csúcsok száma mindig páros.
- **Teljes gráf**: $|E(K_n)| = \frac{n(n-1)}{2}$.
- **Körgráf**: $|E(C_n)| = n$, minden csúcs foka $d = 2$.
- **Fa tétel**: Minden $n$ csúcsú összefüggő, körmentes fának pontosan $n - 1$ éle van.
- **Teljes kétparti gráf**: $|E(K_{n,m})| = n \cdot m$.
