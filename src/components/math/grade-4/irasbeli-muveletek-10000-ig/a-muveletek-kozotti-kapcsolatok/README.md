# 6. A műveletek közötti kapcsolatok (tankönyv 105. oldal, munkafüzet II. 19–20. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 105. oldal) és munkafüzet (`OH-MAT04MA_II`, 19–20. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a III. fejezet (Írásbeli műveletek) 6. leckéje.

---

## 🎯 Tananyag Áttekintés

- **Tankönyv 105. o., 1. feladat** – nyílláncok, betűk helyére számok, a „?” helyére egy összevont művelet:
  - 1258 + 2425 = 3683 (A), + 3575 = 7258 (B) → **+ 6000**; 2682 + 1564 = 4246 (C), + 2536 = 6782 (D) → **+ 4100**;
  - 4258 − 1425 = 2833 (E), − 1275 = 1558 (F) → **− 2700**; 6823 − 1564 = 5259 (G), − 1436 = 3823 (H) → **− 3000**;
  - 8248 : 4 = 2062 (J), : 2 = 1031 (K) → **: 8**; 6828 : 3 = 2276 (L), : 2 = 1138 (M) → **: 6**;
  - 1066 · 2 = 2132 (P), · 3 = 6396 (Q) → **· 6**; 942 · 2 = 1884 (R), · 4 = 7536 (S) → **· 8**.
- **2. feladat – Melyik számra gondoltam?** A) + 1345 → 4135 és − 1345 → 1445: a szám **2790** (1445-től 4135-ig + 2690). B) · 2 → 3600 és : 2 → 900: a szám **1800** (900-tól 3600-ig · 4).
- **3. feladat** – (□ + 2400) · 2 = 7200 → □ = **1200**; □ + 2 · 2400 = 7200 → □ = **2400**.
- **4. feladat** – műveletsor felírása: (4646 + 3788) : 2 = **4217**; 4646 : 2 + 3788 : 2 = 2323 + 1894 = **4217**; 5436 : 3 − 3042 : 3 = 1812 − 1014 = **798**.
- **Munkafüzet II. 19. o.** – folyamatábra (adj hozzá 1348-at, amíg az összeg kisebb 5000-nél, aztán oszd el 2-vel): 1348, 2696 és 4044 kiindulással is **2696** a végeredmény (5392 : 2). Repülő 963 km/óra, gyorsvonat 119 km/óra: 7 óra alatt 6741 − 833 = 7 · 844 = **5908 km** a különbség, 9 óra alatt 9 · 844 = **7596 km**.
- **Munkafüzet II. 20. o.** – hiányzó számok és jelek: 9426 − 3142 − 3142 (6284, 3142; − 6284), 9426 : 2 : 3 (4713, 1571; : 6), 1356 · 2 · 3 (2712, 8136; · 6), 1264 + 2478 + 2478 (3742, 6220; + 4956). A műveletek tagjai: osztandó 528 · 7 + 2 = **3698**; kisebbítendő 3645 + 3587 = **7232**; harmadik tag 9564 − 789 − 4789 = **3986**; szorzandó 2492 : 7 = **356**.

> **⚠️ CSAPDA:** visszafelé számoláskor az utolsó lépést kell először visszacsinálni: (□ + 2400) · 2 = 7200 → 7200 : 2 = 3600, 3600 − 2400 = 1200 (nem 7200 − 2400 = 4800, 4800 : 2 = 2400).

### A régi README javított hibái
- A régi README betűs, LaTeX-es képleteket használt ($a + b = c \iff c - b = a$, $b \neq 0$), és felső tagozatos fogalmakat (kommutativitás, asszociativitás, disztributivitás) – ezek nincsenek a 4. osztályos tankönyvben.
- Helyette a tankönyv 105. oldalának és a munkafüzet 19–20. oldalának valódi feladatai szerepelnek (nyílláncok összevonása, gondolt szám, folyamatábra, a műveletek tagjainak kiszámítása), 4. osztályos jelöléssel (□, ·, :), LaTeX nélkül.

---

## 💻 Elkészített Komponensek

1. **`InverseOpsFigures.tsx`**:
   - `InversePairsSvg`: + ⇄ − és · ⇄ : – a műveletek, amelyek visszacsinálják egymást.
   - `CombineArrowsSvg`: két nyíl összevonása (1258 + 2425 + 3575 → + 6000; 8248 : 4 : 2 → : 8).
   - `ThinkNumberSvg`: „Melyik számra gondoltam?” ötszöges ábrája (1445 ← − 1345 ⬠ + 1345 → 4135).
   - `FlowchartSvg`: a munkafüzet folyamatábrája (kiemelhető aktív dobozzal, `active` prop).
   - `HalfOfSumSvg`: szalagmodell – az összeg fele = a felek összege.
2. **`InverseOpsTheory.tsx`**: ellentett műveletek, nyílláncok összevonása táblázatban, gondolt szám visszafelé, hiányzó tagok, repülő–vonat feladat, „Vigyázz!” csapda. Exportálja az `applyStep`, `inverseOf`, `solveBackwards`, `runFlowchart`, `BACK_TASKS` segédeket.
   - **I. labor:** „Visszafelé gép” – 6 feladvány; a gyerek lépésenként kiválasztja az ellentett műveletet, a gép kiszámolja a köztes számot, a végén ellenőrzés előre.
   - **II. labor:** „Folyamatábra-futtató” – kiinduló szám választása (1348, 2696, 4044, 1000, 3000), lépésenkénti futtatás kiemelt dobozzal és naplóval; a három tankönyvi szám után magyarázat.
3. **`InverseOpsMatcher.tsx`**: 3 szint × 8 pár (ellentett lépések; két nyíl helyett egy; gondolt szám).
4. **`InverseOpsSorter.tsx`**: 3 szint × 3 kategória × 9 elem (ellenőrzés módja; nagyobb / kisebb / ugyanannyi; hiányzó szám kiszámítása).
5. **`InverseOpsQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 17 kérdésnél ábra (nyíllánc, szalagmodell, folyamatábra), kérdéstípus-jelvények, 3 puskakártya.

Azonosítók: kvíz `g4-wops-kapcsolatok-quiz`, párosító `g4-wops-kapcsolatok-matcher`, csoportosító `g4-wops-kapcsolatok-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic3InverseOps.test.tsx` (4 komponens, 5 SVG ábra, visszafelé számolás és folyamatábra ellenőrzése).
