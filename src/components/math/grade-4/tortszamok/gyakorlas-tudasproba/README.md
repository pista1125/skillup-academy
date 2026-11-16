# 6. Gyakorlás, tudáspróba – A törtszámok (tankönyv 147–152. oldal, munkafüzet II. 66–71., 78–79. és 83. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., „A törtszámok”, 147–152. oldal) és munkafüzet (`OH-MAT04MA_II`, 66–71. oldal, az „Ellenőrizd a tudásodat!” 78–79. oldala és a „Gyakorolj!” 83. oldala – csak a törtes feladatok) alapján kidolgozott fejezetzáró modul. A diákzónában ez a VIII. fejezet 6. leckéje; az 1–5. lecke anyagát foglalja össze.

Szóhasználat a tankönyv szerint: fél / fele, 1 ketted, 1 harmad(a), 3 negyed(e), ötöd, hatod, nyolcad, tized, század, „1 egész”, „1 egész és 1 negyed”, „1 és negyed óra”, „hányad része”. Számláló, nevező, törtvonal és számjegyes törtalak nem szerepel.

---

## 🎯 Tananyag Áttekintés

- **Munkafüzet 78. o., 3. feladat**: síkidomok harmada, negyede, ötöde, fele színezve (kis négyzetek megszámolásával).
- **Munkafüzet 78. o., 4. feladat**: az egész téglalap értéke 2400 – fele 1200, 1 harmada 800, 1 tizenkettede 200, 1 negyede 600.
- **Munkafüzet 79. o., 5. feladat**: a szakasz tizedrésze milliméterben (pl. 120 mm → 12 mm).
- **Munkafüzet 83. o., 8. feladat**: 1 ketted = 4 nyolcad = 2 negyed („Mit tapasztaltál?”).
- **Munkafüzet 83. o., 9. feladat**: 180 diák – kék sátor 90, a maradék harmada zöld sátor 30, jurta 60.
- **Tankönyv 152. o., 20. feladat**: társasjáték – kék 1200, piros 2400, zöld 6000, narancs 3200; a 18 mező (1 ketted, 1 harmad, 3 negyed, 5 tized, 2 negyed, 1 tized, 3 tized, 2 harmad, 1 század …) értéke 60 és 3000 között.
- **Az 1–5. lecke anyaga**: törtrészek neve (szalvéta, pizza, színes rudak, bonbon), egynél kisebb törtek (rácsok, poharak, gyöngyök, céltábla, parkoló, kisegér), 1 egész és egynél nagyobb törtek (3 harmad, 5 negyed, 7 harmad, 3 fél, 1 és negyed óra), összehasonlítás (pizzaszeletek, ugróverseny, 1 km-es pálya, utazás), törtrész kiszámítása (300 Ft és 4000 Ft törtrészei, mérőszalag, pogácsa, szörp, dézsa, Palkó autói).

> **⚠️ CSAPDA:** csak egyenlő részeknek van törtneve; 24-nek a 3 negyede 24 : 4 · 3 = 18 (nem 24 : 3 · 4); „a maradék harmada” a maradékból számolandó.

### A régi README
A mappában nem volt korábbi README.

---

## 💻 Elkészített Komponensek

1. **`FractionsExamFigures.tsx`**:
   - `ChapterSummarySvg`: 1 negyed, 3 negyed, 4 negyed = 1 egész, 5 negyed = 1 egész és 1 negyed pizzákon.
   - `PartNamesSvg`: a törtrészek neve 2–10 egyenlő részre osztott csíkon.
   - `ShapePartsSvg`: MF 78. o., 3. feladat (`SHAPE_PARTS`).
   - `RectValueSvg`: MF 78. o., 4. feladat (`RECT_VALUES`).
   - `SameHalfCirclesSvg`: MF 83. o., 8. feladat.
   - `CampSvg`: MF 83. o., 9. feladat (nomád tábor).
   - `BoardGameSvg`: a tankönyv 152. oldali társasjátéka (`BOARD_FIELDS`, `BOARD_VALUES`, `boardFieldValue`, `BoardGameG`, `GridG`).
2. **`FractionsExamTheory.tsx`**: „Amit már tudsz” (táblázat a 5 leckéről), „Ellenőrizd a tudásodat!”, „Mit tapasztaltál?”, „Nézzük meg együtt!” (tábor, szakasz tizedrésze, utazás, 1 és negyed óra), „Vigyázz!” két csapdával. Exportálja: `makeMixedTask`, `rng`.
   - **I. labor – Vegyes feladatok gépe:** véletlen leolvasós (csíkon), összehasonlítós (<, =, >) és számolós (törtrész két lépésben) feladat, azonnali ellenőrzéssel és pontszámlálóval.
   - **II. labor – Törtes társasjáték:** dobókocka, bábu a tankönyvi táblán; minden mezőn ki kell számolni a szín számának megadott részét, hibánál a bábu helyben marad.
3. **`FractionsExamMatcher.tsx`**: 3 szint × 8 pár (tört neve; egyenlő és egynél nagyobb törtek; törtrész értéke).
4. **`FractionsExamSorter.tsx`**: 3 szint × 3 kategória × 9 elem (1 egészhez képest; a feléhez képest; érték 600 / 800 / 1200).
5. **`FractionsExamQuiz.tsx`**: **90 kérdés** (30 / 30 / 30) a teljes fejezetből, 36 kérdés ábrával (pizza, csík, rács, gyöngyök, poharak, óra, pálya, dézsa, céltábla, parkoló, társasjáték-mező, tábor, szörp, diagram), minden kérdésnek saját jelvénye, 3 puskakártya.

Azonosítók: kvíz `g4-frac-tudasproba-quiz`, párosító `g4-frac-tudasproba-matcher`, csoportosító `g4-frac-tudasproba-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic8FractionsExam.test.tsx` (4 komponens, 7 SVG ábra, 90 kérdéses kvízszerkezet, társasjáték- és munkafüzet-értékek, a feladatgenerátor 300 feladata, csoportosító/párosító, magyar ragsegédek).
