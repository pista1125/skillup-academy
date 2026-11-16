# 2. Összeadás és kivonás 1000-ig (tankönyv 11–16. oldal, munkafüzet I. 8–11. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 11–16. oldal) és munkafüzet (`OH-MAT04MA_I`, 8–11. oldal) alapján kidolgozott oktatási modul. A diákzónában ez az I. fejezet 2. leckéje.

---

## 🎯 Tananyag Áttekintés

- **Adatok a diagramról** (1. feladat: melyik nemzeti parkot látogatnák a 4.-esek), azonos eredményű műveletek párosítása kódokkal (2. feladat: pl. 32 + 48 = 96 − 16).
- **Fejben számolás bontással** (4. és 10. feladat): 250 + 170 = 250 + 100 + 70 = 250 + 50 + 120 = 420; 450 − 170 = 450 − 100 − 70 = 280.
- **Kerek tízesek, százasok** összeadása, kivonása, **kiegészítés 1000-re** (5–6., 11. feladat).
- **Szöveges feladatok**: ajándékvásárlás 1000 Ft-ból (plakát 290, könyv 530, képeslap 70, kitűző 80, hűtőmágnes 450 Ft), strand 540 + 280 + 120 látogató, belépők 450 + 350 Ft.
- **Hiányzó számok** (13. feladat: □ + 250 = 520, 620 − □ = 370), nyitott mondatok (14. feladat: 370 + 100 − 350 > □).
- **Írásbeli összeadás** (16. feladat): becslés százasra kerekítve (448 ≈ 400, 263 ≈ 300, B: 700), helyi érték szerint egymás alá, az egyesekkel kezdünk; **tagok, összeg**; ellenőrzés a tagok felcserélésével vagy kivonással (448 + 263 = 711).
- **Írásbeli kivonás** (20. feladat): becslés (931 ≈ 900, 456 ≈ 500, B: 400), **kisebbítendő, kivonandó, különbség**; ellenőrzés összeadással (931 − 456 = 475).
- **Gyakorlás**: 21. feladat (becslés + kivonás), 22. feladat tábori plakát (934 − 456 = 478, 237 + 457 = 694, 1000 − 657 = 343, 873 − 254 = 619, 264 + 672 = 936, 645 − 297 = 348, 764 − 467 = 297).
- **Munkafüzet I. 8–11.**: diagram-leolvasás, kakukktojás háromtagú összegekben, egyenlők összekötése, sorozatok, hordó (650 l-es hordó, 410 + 320 > 650), túraút 940 − 780 m, írásbeli műveletek becsléssel és ellenőrzéssel.

> **⚠️ CSAPDA:** írásbeli kivonásnál nem szabad oszloponként a kisebből a nagyobbat kivonni (931 − 456 ≠ 525), és az átvitelt sem szabad elfelejteni (448 + 263 ≠ 601).

### A régi README javított hibái
- LaTeX-képletek (`$$…$$`) helyett 4. osztályos jelölés.
- A kivonást nem „kölcsönkéréssel”, hanem a magyar tankönyvi **pótlásos** gondolkodással tanítjuk (6 meg mennyi a 11? 5, maradt 1).
- Bekerült a becslés százasra kerekítéssel és a műveleti tagok neve, ami a régi leírásból hiányzott.

---

## 💻 Elkészített Komponensek

1. **`AddSub1000Figures.tsx`**:
   - `MentalJumpSvg`: 250 + 170 = 250 + 100 + 70 ugrásokkal a számegyenesen.
   - `WrittenAdditionSvg`: 448 + 263 = 711 sz–t–e oszlopokban, átvitellel, tagok/összeg.
   - `WrittenSubtractionSvg`: 931 − 456 = 475, kisebbítendő/kivonandó/különbség.
   - `EstimateSvg`: becslés százasra kerekített értékekkel (B: 700).
   - `GiftShopSvg`: ajándékbolt árcédulákkal (tankönyv 7. feladat).
2. **`AddSub1000Theory.tsx`**: Mit tanulunk?, fejben számolás bontással, írásbeli összeadás lépései (táblázat), írásbeli kivonás pótlással, vásárlás 1000 Ft-ból, „Vigyázz!” csapdák. Exportálja a `columnSteps` segédfüggvényt.
   - **I. labor:** írásbeli összeadás lépésről lépésre (számjegy-gombok, átvitel kijelzése, segítség, ellenőrzés).
   - **II. labor:** írásbeli kivonás pótlással lépésről lépésre.
3. **`AddSub1000Matcher.tsx`**: 3 szint × 8 pár (azonos eredményű műveletek, fejben kerek számokkal, írásbeli műveletek).
4. **`AddSub1000Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (< 500 / = 500 / > 500; 0/1/2 átvitel; becslés B: 400/500/600).
5. **`AddSub1000Quiz.tsx`**: 30 kérdés 3 szinten (10/10/10), ábrákkal (írásbeli elrendezés, ugrások, árcédulák, jegyek, hordó), 3 puskakártyával.

Azonosítók: kvíz `g4-count-osszeadas-1000-quiz`, párosító `g4-count-osszeadas-1000-matcher`, csoportosító `g4-count-osszeadas-1000-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic1AddSub1000.test.tsx` (4 komponens, 5 SVG ábra, oszloponkénti számítás).
