# 1. Írásbeli összeadás és kivonás (tankönyv 70–79. oldal, munkafüzet I. 68–76. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 70–79. oldal) és munkafüzet (`OH-MAT04MA_I`, 68–76. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a III. fejezet (Írásbeli műveletek 0-tól 10 000-ig) 1. leckéje.

---

## 🎯 Tananyag Áttekintés

- **TK 70. (fejezetnyitó):** képzeletbeli utazás a földgömbbel – Nílus 6852 km, Duna 2888 km, magyar szakasz 417 km, kínai nagy fal 7200 km.
- **TK 71/1.:** Laci útiköltsége: vonatjegy 3845 Ft + hajójegy 2850 Ft. Adatok → terv → **becslés** százasra (3800 + 2900 = 6700) és ezresre (4000 + 3000 = 7000) kerekítve → **számítás** E–sz–t–e oszlopokban, az egyesekkel kezdve (8 sz + 8 sz = 16 sz = 1 E + 6 sz) → **ellenőrzés** a tagok felcserélésével → válasz: 6695 Ft.
- **TK 71–72/2–7.:** becslés + összeadás, több tagú összeadások, „melyik számra gondoltam?”, három szám összege 5000 (830 + 1820 + 2350 stb.), repülőutak (Budapest–Párizs 1246 km, Párizs–Róma 1106 km, Párizs–Madrid 1054 km), perselyek euróval.
- **TK 73/8.:** ha a kisebbítendőt és a kivonandót ugyanannyival (10, 100, 1000) növeljük, a különbség nem változik (4876 − 1325 → 4976 − 1425).
- **TK 73/9.:** 7212 − 5410 = 1802 kétféle módszerrel: **Mona** 1 ezrest felvált 10 százasra (12 sz − 4 sz, majd 6 E − 5 E), **Manó** a kisebbítendőhöz 10 százast, a kivonandóhoz 1 ezrest ad (12 sz − 4 sz, 7 E − 6 E). Ellenőrzés összeadással.
- **TK 74–76/10–22.:** becslés + kivonás (pl. 6300 − 3649, 8000 − 2873, 9007 − 2879), az összeg és a különbség változása, hiányzó számok (2624 + □ = 4251), Duna-part hosszai táblázatban (magyar jobb part: 2883 − 2466 = 417 km), határszakaszok, a világ leghosszabb folyói (Amazonas 6992 km, Jangce 6300 km …).
- **TK 77–79/23–33.:** hegycsúcsok, kempingbolt 10 000 Ft-ból (3900, 2490, 4200, 6100, 1490 Ft), cirkusz (7546 − 3778 néző, 648 + 1202 jegy), páros/páratlan összegek, Ópusztaszer évgyűrűi (4925 − 4029 = 896, honfoglalás), számszomszédok.
- **MF I. 68–76.:** becslés + írásbeli összeadás/kivonás ellenőrzéssel, számpiramis, hiányzó számjegyek, úszóverseny 10 km = 10 000 m, teherautó 10 000 kg, vármegyék területe, kilométeróra, hajóutasok, népmese-részek hossza.

> **⚠️ CSAPDA:** kivonásnál nem szabad oszloponként a kisebből a nagyobbat kivonni (7212 − 5410 ≠ 2202), és a maradékot sem szabad elfelejteni (3845 + 2850 ≠ 5695).

### A régi README javított hibái
- A régi leírás „kölcsönkérés”-t írt; a tankönyv a **felváltást** (Mona) és a **kisebbítendő és kivonandó egyforma növelését** (Manó, pótlásos gondolkodás: „4 meg mennyi a 12? 8, maradt 1”) tanítja. A labor Manó módszerét használja, a Mona-féle felváltást ábra mutatja.
- Bekerült a becslés **százasra és ezresre** kerekítve, a feladatmegoldás menete (adatok, terv, becslés, számítás, ellenőrzés, válasz) és a különbség változatlansága.
- A lecke helyes száma a diákzónában: III. fejezet 1. lecke.

---

## 💻 Elkészített Komponensek

1. **`WrittenAddSubFigures.tsx`**:
   - `WrittenAdditionSvg`: 3845 + 2850 = 6695 E–sz–t–e oszlopokban, a maradékkal.
   - `MonaSubtractionSvg`: 7212 − 5410 felváltással (6 | 2 + 10).
   - `ManoSubtractionSvg`: 7212 − 5410 Manó módszerével (+10 százas fent, +1 ezres lent).
   - `EstimateSvg`: becslés százasra (B: 6700) és ezresre (B: 7000).
   - `FlightRouteSvg`: Budapest → Párizs → Róma repülőút.
   - `SameDifferenceSvg`: 4876 − 1325 és 4976 − 1425 különbsége egyenlő.
   - Exportált színek: `PV_COLORS`, `PV_HEADS`.
2. **`WrittenAddSubTheory.tsx`**: Mit tanulunk?, becslés, írásbeli összeadás lépései (táblázat), több tag, írásbeli kivonás Mona és Manó módszerével, repülőút szöveges feladat, „Vigyázz!” csapdák. Exportálja a `columnSteps4` és `roundTo100` segédfüggvényt.
   - **I. labor:** négyjegyű írásbeli összeadás és kivonás lépésről lépésre (számjegy-gombok, maradék kijelzése, segítség pótlásos mondattal, becslés, ellenőrzés).
   - **II. labor:** „Nem változik a különbség” – +10 / +100 / +1000 mindkét számhoz.
3. **`WrittenAddSubMatcher.tsx`**: 3 szint × 8 pár (maradék nélküli műveletek, becslés százasra, írásbeli műveletek maradékkal).
4. **`WrittenAddSubSorter.tsx`**: 3 szint × 3 kategória × 9 elem (három szám összege < / = / > 5000; hány helyen marad 1; becslés ezresre B: 2000/3000/4000).
5. **`WrittenAddSubQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 19 kérdés ábrával (írásbeli elrendezés, repülőút, táblázat, árcédulák, szakaszos ábra), 3 puskakártyával.

Azonosítók: kvíz `g4-wops-osszeadas-kivonas-quiz`, párosító `g4-wops-osszeadas-kivonas-matcher`, csoportosító `g4-wops-osszeadas-kivonas-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic3WrittenAddSub.test.tsx` (4 komponens, 6 SVG ábra, oszloponkénti számítás).
