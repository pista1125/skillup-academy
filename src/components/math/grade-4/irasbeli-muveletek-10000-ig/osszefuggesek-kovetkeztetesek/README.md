# 5. Összefüggések, következtetések (tankönyv 103–104. oldal, munkafüzet II. 17–18. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 103–104. oldal) és munkafüzet (`OH-MAT04MA_II`, 17–18. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a III. fejezet (Írásbeli műveletek) 5. leckéje.

---

## 🎯 Tananyag Áttekintés

- **Tankönyv 103. o.**
  - **1. feladat** – a japán gyorsvonat 600 km/óra: 2, 3, 4, 5, 6 óra alatt 1200, 1800, 2400, 3000, 3600 km; 5400 km → 9 óra, 6000 km → 10 óra, 6600 km → 11 óra; Székesfehérvár–Debrecen 300 km → 30 perc.
  - **2. feladat** – egyenlő hányadosok osztás nélkül: 12 : 4 = 120 : 40 = 1200 : 400 = 3; 12 : 3 = 240 : 60 = 120 : 30 = 4; 120 : 4 = 1200 : 40 = 30 (számegyenesen jelölve).
  - **3. feladat** – a szorzat ne változzon: 600 · 8, 300 · 9, 3600 · 2, 1600 · 4, 1000 · 5, 330 · 6 (pl. 1200 · 4, 900 · 3, 1800 · 4, 800 · 8, 500 · 10, 660 · 3).
  - **4. feladat** – nyíldiagram: ha egy szám kétszerese 1500, a szám 750, négyszerese 3000, nyolcszorosa 6000.
  - **5. feladat** – M2-es metró: 3 percenként 1023 utas → negyedóra alatt 5 · 1023 = 5115 utas.
- **Tankönyv 104. o.**
  - **6. feladat** – kiszámítható-e az adatokból? Csak a komp: 4 oda-vissza út = 8 út, 3208 m : 8 = 401 m. (A vonat, a helyi járat és Eszter busza nem számolható.)
  - **7. feladat** – 240 palánta: 2, 3, 4, 5, 6, 10 kertész → 120, 80, 60, 48, 40, 24 palánta fejenként (fordított összefüggés).
  - **8. feladat** – akvárium: 900 dl 9 perc alatt → 100 dl percenként; 100 l = 1000 dl → 10 perc.
  - **9. feladat** – 12 kiskanál 768 Ft → 6 kiskanál 384 Ft (felezés nyíllal).
- **Munkafüzet II. 17. o.**: 10 lufi 600 Ft (60 Ft → 1, 300 → 5, 360 → 6, 180 → 3, 540 → 9 lufi); 456 : 2 : 3 = 456 : 6 = 76, 912 : 2 : 4 = 912 : 8 = 114; Ági lépése 6 dm, húgáé 3 dm, 83 m 4 dm = 834 dm → 139 és 278 lépés; képfeladvány: mókus 70, bagoly 90, macska 80.
- **Munkafüzet II. 18. o.**: 4080 Ft-os társasjáték: 10, 5, 2, 4, 8 barát → 408, 816, 2040, 1020, 510 Ft; hatszögek: minden mező az előző kétszerese (50, 100, 200 …; 150, 300, 600 …), az azonos színű mezőkben a második hatszög száma az első háromszorosa.

> **⚠️ CSAPDA:** fordított összefüggésnél nem szorzunk: 240 palánta 4 kertész között 240 : 4 = 60, nem 240 · 4.

### A régi README javított hibái
- A régi README általános „mintázat, képlet” leírás volt LaTeX-jelöléssel ($b = 2 \cdot a + 3$, ⟹), és „Ha… akkor…” logikai állításokkal – ezek nem szerepelnek a tankönyv 103–104. oldalán.
- Helyette a tankönyv valódi tartalma: következtetés egyről többre és többről egyre, egyenes és fordított összefüggés táblázatban, változatlan szorzat és hányados, „kiszámítható-e?” feladatok.

---

## 💻 Elkészített Komponensek

1. **`Relations4Figures.tsx`**:
   - `SpeedTrainSvg`: gyorsvonat és idő–út táblázat („?” mezőkkel).
   - `EqualQuotientsSvg`: az egyenlő hányadosú osztások színes kártyái és a hányadosok számegyenesen (3, 4, 30).
   - `DoublingChainSvg`: a tankönyv nyíldiagramja (· 2, · 4, · 8).
   - `SpoonsHalvingSvg`: 12 kiskanál → 768 Ft, : 2 → 6 kiskanál → ? Ft.
   - `GardenersTableSvg`: 240 palánta, kertészek száma – palánta fejenként táblázat.
2. **`Relations4Theory.tsx`**: Mit tanulunk?, kidolgozott példák táblázatban (vonat, kanál, akvárium, metró), nyíldiagram, változatlan szorzat és hányados, fordított összefüggés és „van elég adat?”, „Vigyázz!” csapda. Exportálja a `TABLE_SCENARIOS`, `canApply`, `applyOp` segédeket.
   - **I. labor:** „Töltsd ki a táblázatot!” – 4 történet (vonat, lufi, társasjáték, palánták), a gyerek beírja a hiányzó számokat, ellenőrzés zöld/piros mezőkkel és tippel.
   - **II. labor:** „Szorzatőrző és hányadosőrző” – gombokkal (· 2, : 2, · 3, : 3, · 10, : 10) változtatja a tényezőket / az osztandót és az osztót úgy, hogy az eredmény ne változzon; a megtalált megoldások listája.
3. **`Relations4Matcher.tsx`**: 3 szint × 8 pár (vonat és lufi; egyenlő szorzatok és hányadosok; fejenként mennyi?).
4. **`Relations4Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (egyenes / fordított összefüggés / nincs elég adat; hányados 3, 4, 30; szorzat 4800, 2700, 7200).
5. **`Relations4Quiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 14 kérdésnél ábra (táblázat, nyíllánc, képfeladvány, hatszög), kérdéstípus-jelvények, 3 puskakártya.

Azonosítók: kvíz `g4-wops-osszefuggesek-quiz`, párosító `g4-wops-osszefuggesek-matcher`, csoportosító `g4-wops-osszefuggesek-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic3Relations4.test.tsx` (4 komponens, 5 SVG ábra, a labor táblázatainak és műveleteinek ellenőrzése).
