# 2. Írásbeli szorzás egyjegyű számmal (tankönyv 80–83. oldal, munkafüzet I. 77–81. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 80–83. oldal) és munkafüzet (`OH-MAT04MA_I`, 77–81. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a III. fejezet (Írásbeli műveletek 0-tól 10 000-ig) 2. leckéje.

---

## 🎯 Tananyag Áttekintés

- **TK 80/1.:** óceánjáró 1623 kétszemélyes kabinnal. Adatok → terv (1623 · 2) → becslés (1623 ≈ 1600, 1600 · 2 = 3200) → számítás E–sz–t–e korongokkal és oszlopokban: 2 · 3 e = 6 e, 2 · 2 t = 4 t, 2 · 6 sz = 12 sz = 1 E + 2 sz, 2 · 1 E = 2 E, 2 E + 1 E = 3 E → ellenőrzés összeadással (1623 + 1623 = 3246) → válasz: legfeljebb 3246 személy. Elrendezés: „1623 · 2”, alatta vonal és a szorzat.
- **TK 80/2–3.:** szorzatok becsléssel és ellenőrzéssel (2324 · 3, 1041 · 8, 2549 · 3, 956 · 9 …), képekkel jelölt műveletek.
- **TK 81/4–7.:** számok kétszerese (4398, 1373 …), páros szorzatok; Nemzeti Múzeum (1244 · 3); háromszoros 6000 és 7000 között; Budavári Sikló jegyárai (menetjegy 1200 Ft, retúr 1800 Ft, gyermek 700 / 1100 Ft, 3 év alatt ingyenes).
- **TK 82/8–11.:** Nyugati pályaudvar adatai műveletekből (268 · 7 = 1876 → 1877; 1463 · 6 − 6887 = 1891; 2701 − 7 · 365 = 146 m), Eiffel-torony (4718 · 2), fővárosok távolsága oda-vissza (Madrid 2522 km, Róma 1217 km, Moszkva 1824 km, Berlin 874 km …).
- **TK 83/12–17.:** nyitott mondatok (663 · 7 > □ > 654 · 7), éttermi szállítások (1250 kg · 3), repülő 945 km/óra, dunai hajó 112 fő · 9, óceánjáró: 1641 a fele.
- **MF I. 77–81.:** becslés + szorzás, becsült szorzat 4800 (szorzandók és szorzók párosítása), szorzatpiramis, rigójancsi = 3 · Rákóczi-túrós, hiányzó számjegyek, láncszámolás 372 · 4 · 3 · 2, hiányzó szorzó és szorzandó, Nemzeti Színház 619 · 9, lépéshosszak · 5, „Találj a célba!” (szorzat 4500 és 6000 között), keresztrejtvény.

> **⚠️ CSAPDA:** a maradékot nem szabad elfelejteni (2549 · 3 ≠ 6527), és előbb szorzunk, utána adjuk hozzá a maradékot (nem (4 + 2) · 3).

### A régi README javított hibái
- A régi leírás „jobbról balra” általános szöveget adott; most a tankönyv lépései (1–4. lépés helyi értékenként, beváltás 12 sz = 1 E + 2 sz), a becslés (szorzandó százasra) és az összeadással való ellenőrzés szerepel.
- A lecke helyes száma a diákzónában: III. fejezet 2. lecke.

---

## 💻 Elkészített Komponensek

1. **`WrittenMulOneDigitFigures.tsx`**:
   - `MulStepsSvg`: 1623 · 2 = 3246 E–sz–t–e oszlopokban, maradékkal.
   - `MulCarrySvg`: 2549 · 3 = 7647, három maradékkal.
   - `PlaceValueMulSvg`: helyiérték-korongok, 12 százasból 1 ezres lesz.
   - `MulCheckSvg`: ellenőrzés összeadással (1623 + 1623).
   - `FunicularPricesSvg`: a Budavári Sikló jegyárai.
   - Exportált színek: `MUL_COLORS`, `MUL_HEADS`.
2. **`WrittenMulOneDigitTheory.tsx`**: Mit tanulunk?, 1623 · 2 lépésről lépésre, ellenőrzés összeadással, 2549 · 3 több maradékkal, Sikló szöveges feladat, „Vigyázz!” csapdák. Exportálja a `mulSteps` és `roundTo100` segédfüggvényt.
   - **I. labor:** írásbeli szorzás lépésről lépésre (számjegy-gombok, maradék a szorzat fölött, segítség, becslés, ellenőrzés összeadással).
   - **II. labor:** „Találj a célba!” – szám (1217, 1136, 642, 2547) és szorzó (2–9) választása, a szorzat legyen 4500 és 6000 között; találatok gyűjtése.
3. **`WrittenMulOneDigitMatcher.tsx`**: 3 szint × 8 pár (maradék nélkül, becslés, szorzás maradékkal).
4. **`WrittenMulOneDigitSorter.tsx`**: 3 szint × 3 kategória × 9 elem (becslés B: 2400/3600/4800; szorzat < 5000 / 5000–8000 / > 8000; maradékos helyek száma).
5. **`WrittenMulOneDigitQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 18 kérdés ábrával (szorzás-elrendezés, táblázat, csoportok, számegyenes), 3 puskakártyával.

Azonosítók: kvíz `g4-wops-szorzas-egyjegyu-quiz`, párosító `g4-wops-szorzas-egyjegyu-matcher`, csoportosító `g4-wops-szorzas-egyjegyu-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic3WrittenMulOneDigit.test.tsx` (4 komponens, 5 SVG ábra, szorzás számjegyei és maradékai).
