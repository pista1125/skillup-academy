# 2. Számolás szögek tangensével (2. lecke, 8–11. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 8–11. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A szögek tangense számológéppel is kiszámítható. A lecke bemutatja a szögmód (DEG / RAD / GRAD) beállítását, a **tan** és a **tan⁻¹** (2ndf tan / SHIFT tan) funkciót, a szögperc átváltását tizedes fokra, valamint azt, hogy a mérési pontatlanság miatt nincs értelme sok tizedesjegyet kiírni. Alkalmazások: torony magassága hibahatárokkal, kert területe, lejtők meredeksége százalékban. Ráadás: a négyjegyű függvénytáblázat és a lineáris interpoláció.

---

## 📐 Fő Szabályok és Mintapéldák

- **Szögmód:** fokokhoz a **D / DEG** állás kell (DRG gomb vagy MODE menü). Ellenőrzés: tan 45 = 1.
- **tan:** szög → tangens. Például tg 64° ≈ 2,0503.
- **Szögperc:** 14° 24′ = 14 + 24/60 = 14,4° ⇒ tg 14° 24′ ≈ 0,2568.
- **tan⁻¹ (2ndf tan):** tangens → hegyesszög. tg α = 0,2308 ⇒ α ≈ 13°; tg α = 5 ⇒ α ≈ 78,69°.
- **Kidolgozott feladat (torony 30 m-ről):** h = 30 · tg α.
  - 36°…38° ⇒ 21,8 m < h < 23,4 m;
  - 36,5°…37,5° ⇒ 22,2 m < h < 23,0 m.
- **Lejtők:** p% meredekség ⇔ tg α = p / 100. 9% ≈ 5°; 15° ≈ 26,8%; 100% = 45°.

### Tankönyvi feladatok
- **1.** tg 1,2° ≈ 0,0209; tg 12° ≈ 0,2126; tg 24,6° ≈ 0,4578; tg 59,9° ≈ 1,7251; tg 78,3° ≈ 4,8288; tg 88,4° ≈ 35,8006; tg 89,9° ≈ 572,9572.
- **2.** tan⁻¹ 94,5 ≈ 89,39°; tan⁻¹ 29,2 ≈ 88,04°; tan⁻¹ 8,4 ≈ 83,21°; tan⁻¹ 3,2 ≈ 72,65°; tan⁻¹ 1 = 45°; tan⁻¹ 0,28 ≈ 15,64°.
- **3.** 0,001 fényév eltérés ≈ 9,47 · 10⁹ km.
- **4.** Kert: 25 m-es oldal, 39,5°…40,5° ⇒ T ≈ 515 m² … 534 m².
- **5.** Hegycsúcs 1 km-re, 26°…28° ⇒ ≈ 488 m … 532 m.
- **6.** 15° ⇒ ≈ 26,8%; 15°-os úton 30 m emelkedés ⇒ vízszintesen ≈ 112 m, az úton ≈ 115,9 m; 250 m úton 23 m süllyedés ⇒ ≈ 9,2%, ≈ 5,3°; 100% ⇒ 45°.
- **Ráadás:** tg 11° 33′ ≈ 0,2035 + 3 · 0,0003 = 0,2044 (lineáris interpoláció); a 0,1370 tangensű szög 7° 48′ = 7,8°.

> **⚠️ CSAPDA:** RAD módban a tan 64 = eredménye 2,3478… (64 radián!), a helyes tg 64° ≈ 2,0503 csak D módban jön ki.

---

## 💻 Elkészített Komponensek

1. **`TangentCalcFigures.tsx`**:
   - `CalculatorKeysSvg`: számológép DEG kijelzővel, tan és 2ndf (tan⁻¹) gombokkal.
   - `TowerMeasurementRangeSvg`: a torony magassága 30 m-ről, 36° és 38° közötti szögekkel (≈ 21,8–23,4 m).
   - `SlopePercentSvg`: 9%-os emelkedő (100 m vízszintes, 9 m emelkedés, ≈ 5°).
   - `GardenRectangleSvg`: téglalap alakú kert 25 m-es oldallal, az átló szöge 39,5°–40,5°.
   - `InterpolationTableSvg`: lineáris interpoláció a függvénytáblázatban (tg 11° 33′ ≈ 0,2044).
2. **`TangentCalcTheory.tsx`**: számológép-használat, tan⁻¹ táblázat, kidolgozott mérési feladat, lejtők és kert, csapda, Ráadás.
   - **I. Laboratórium:** számológép-szimulátor DEG / RAD / GRAD móddal, fok–perc bevitellel, tan és 2ndf tan funkcióval.
   - **II. Laboratórium:** százalék ↔ fok átváltó, valamint magasság-intervallum a szögmérés hibahatáraiból.
3. **`TangentCalcMatcher.tsx`**: 3 szint × 8 pár (funkciók és átváltások, szögek és tangensek, alkalmazások).
4. **`TangentCalcSorter.tsx`**: 3 szint × 3 kategória (tan / tan⁻¹ / szögmód; tg < 1 / = 1 / > 1; szorzás / osztás / Pitagorasz).
5. **`TangentCalcQuiz.tsx`**: 30 kérdés 3 szinten, 3 puskakártyával.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic1TangentCalc.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
