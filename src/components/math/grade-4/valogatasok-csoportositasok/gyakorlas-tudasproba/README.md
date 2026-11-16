# 5. Gyakorlás, tudáspróba (VI. fejezet, fejezetzáró)

A VI. fejezet (Válogatások, csoportosítások) összefoglaló, fejezetzáró modulja – a tankönyv (`OH-MAT04TA`, 131–134. o.) és a munkafüzet (`OH-MAT04MA II`, 48–51. o.) teljes anyagára, valamint az 1–4. lecke feladataira épül. A fejezetnek ezen az oldalszakaszon nincs külön „Megálló” / „Ellenőrizd a tudásodat!” oldala, ezért a tudáspróba a négy lecke tankönyvi és munkafüzeti feladataiból, illetve azok változataiból áll.

---

## 🎯 Tananyag Áttekintés („Amit már tudsz”)

1. **Válogatások halmazokba** – alaphalmaz (keret), címke, közös rész, karikán kívüli rész, halmaz a halmazban, kakukktojás; logikai lapok három karikában (TK 134/8.).
2. **Válogatások táblázatokba** – 2 × 2-es táblázat (Kitti fája, Manó táblázata, Mona halmazábrája – TK 133/4.), sor- és oszlopösszegek, üres mező.
3. **Hányféle lehetőség van?** – elágazásos rajz kezdőbetűkkel (TK 25/11.), sorrendek (6, 24), két választás egymás után (szorzás), párok (AB = BA), számkártyák.
4. **Igaz vagy hamis?** – mindegyik, van olyan, egyik sem, nincs olyan, nem mindegyik (TK 132/1. b), 132/3. a), MF II/51/10.), ellenpélda.

Kidolgozott vegyes feladatok: MF II/51/9. (műveletek eredménye halmazokba: 1500 – D, F, G, I; 2800 – A, E, J; 7200 – B, C, H), egy válogatás három rajzon, Páros / 3 többszöröse halmazábra az 1–12 számokkal, 2 póló · 3 nadrág = 6 öltözet.

> **⚠️ CSAPDÁK:** csak az egyik címke megvizsgálása; összeadás szorzás helyett (2 + 3 a 2 · 3 helyett); AB és BA kétszeri számolása; „nem mindegyik” összekeverése az „egyik sem”-mel.

---

## 💻 Elkészített Komponensek

1. **`GroupingExamFigures.tsx`** – `ChapterMapSvg`, `EvenTripleVennSvg`, `BlocksTableSvg`, `OutfitGridSvg` (a többi ábrát az 1–4. lecke Figures-fájljaiból veszi át).
2. **`GroupingExamTheory.tsx`** – összefoglaló kártyák a 4 leckéről, 4 kidolgozott vegyes feladat, csapdák.
   - **I. Laboratórium – Vegyes válogató:** generált címkepár + szám, a helyét a halmazábrán kell kiválasztani (a gombon a megfelelő táblázatmező is látszik), pontszámlálóval.
   - **II. Laboratórium – Állításgyár:** generált 5 elemű számhalmaz + „mindegyik / van olyan / egyik sem / nem mindegyik” állítás, I/H döntés, visszajelzés.
3. **`GroupingExamMatcher.tsx`** – 3 szint × 8 pár (a fejezet szavai; hová kerül; feladat és eredmény).
4. **`GroupingExamSorter.tsx`** – 3 szint × 3 kategória × 3 elem (melyik eszköz; igaz / hamis / ugyanazt jelenti; hány lehetőség).
5. **`GroupingExamQuiz.tsx`** – **90 kérdés (30 / 30 / 30)**, mind a négy leckéből, 64 kérdés ábrával, mindegyik kérdéstípus-jelvénnyel, 3 puskával.

---

## 🧪 Tesztelés

`src/test/grade4Topic6GroupingExam.test.tsx` – renderelés, 90 kérdés / szintenként 30, egyedi azonosítók, a feladatgenerátorok determinisztikussága és helyessége, az I. labor visszajelzése.
