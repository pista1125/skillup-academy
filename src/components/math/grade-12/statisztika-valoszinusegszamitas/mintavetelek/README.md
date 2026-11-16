# 10. Mintavételek (42. lecke, 96–99. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 42. lecke, 96–99. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a statisztika és valószínűségszámítás fejezet **10.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Bevezető:** az ötöslottóban a kéttalálatos szelvény valószínűsége: 2 szám az 5 nyerőből, 3 a többi 85-ből. P = (5 alatt 2) · (85 alatt 3) / (90 alatt 5) = 10 · 98 770 / 43 949 268 ≈ **0,0225**.

---

## 📐 Elmélet

- **Mintavételek (ismétlés):** egy halmaz elemei közül néhányat kiválasztunk, és azt vizsgáljuk, hány rendelkezik egy adott tulajdonsággal. A kiválasztás történhet visszatevés nélkül vagy visszatevéssel.
- **Visszatevés nélküli mintavétel:** N elemből M rendelkezik a tulajdonsággal, n elemet választunk: P(k) = (M alatt k) · (N − M alatt n − k) / (N alatt n).
- **Visszatevéses mintavétel – a binomiális eloszlás:** n-szer ismételt kísérlet, mindegyik p valószínűséggel kedvező: P(pontosan k kedvező) = (n alatt k) · p^k · (1 − p)^(n − k).

### Kidolgozott feladatok
- **1.** 12. a: 11 lány, 13 fiú; 12. b: 15 lány, 10 fiú. a) egy-egy diák a két osztályból, mindkettő lány: 165 / 600 = **0,275**; b) két diák a 49-ből: (26 alatt 2) / (49 alatt 2) = 325 / 1176 ≈ **0,276** (visszatevés nélküli mintavétel).
- **2.** Mellékhatás 3%, 100 vizsgálat (binomiális): a) egyszer sem 0,97^100 ≈ **0,048**; b) éppen 3: ≈ **0,227**; c) háromnál kevesebb: ≈ **0,420**.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** Sándor kedvenc számai (négyzet- vagy köbszám 90-ig): 11 db. a) 462 / 43 949 268 ≈ 0,0000105; b) 165 · 3081 / 43 949 268 ≈ 0,0116; c) 11 · (79 alatt 4) / (90 alatt 5) ≈ 0,376.
- **2.** Palacsinta (n = 8, p = 0,1): pontosan 1: ≈ 0,383; pontosan 2: ≈ 0,149; legfeljebb 2: ≈ 0,962.
- **3.** Szerencsekerék (n = 10, p = 0,25): pontosan 2: ≈ 0,282; pontosan 3: ≈ 0,250; 2 vagy 3: ≈ 0,532.
- **4.** Pizza kördiagram (80°, 120°, 160° → 8, 12, 16 tanuló), 5 tanuló: a) 56 / 376 992 ≈ 0,00015; b) ≈ 0,354; c) ≈ 0,206.
- **5.** Kosárra dobás: (9 alatt 3) = 84, (12 alatt 3) = 220, (9 alatt 4) = 126, (13 alatt 4) = 715; a hiányzó válasz: 12 mellé, 3 talált → (15 alatt 3) = **455**.
- **HF 1. (érettségi 2021)** {1; …; 5}, két különböző szám átlaga egész: 4 / 10 = 0,4.
- **HF 2.** Legalább hármas (p = 2/3), 4 játékos: a) 16/81 ≈ 0,198; b) 24/81 ≈ 0,296.
- **HF 3.** p² = 0,64 → p = 0,8.
- **HF 4. (érettségi 2022)** 5 natúr + 15 csokis edényből 4: 5 · (15 alatt 3) / (20 alatt 4) ≈ 0,470.
- **Ráadás („Az élet nem igazságos…”):** 4 pénzfeldobás: P(2–2) = 0,375, nem 2–2: 0,625; 100 feldobásnál 50–50: ≈ 0,08, egyéb: ≈ 0,92.

> **Megjegyzés a forráshoz:** a 4. feladat kördiagramján a szögek (80°, 120°, 160°) és a pizzafajták összerendelése a szöveg sorrendjéből származik; az ábrát nem lehetett megtekinteni.

> **⚠️ CSAPDA:** a binomiális képletből nem maradhat el a (n alatt k) tényező; és ha a kiválasztott elemeket nem tesszük vissza, a hipergeometrikus (nem a binomiális) modell a jó.

A korábbi README a binomiális eloszlás várható értékét és szórását (E = np, D = √(np(1 − p))) tananyagként írta le – a tankönyvi lecke ezt nem tárgyalja; a modulban csak a laborban szerepel tájékoztatásként az n · p érték.

---

## 💻 Elkészített Komponensek

1. **`Sampling12Figures.tsx`**:
   - `LottoSplitSvg`: a kéttalálatos szelvény kedvező eseteinek sémája.
   - `HypergeometricSvg`: a visszatevés nélküli mintavétel sémája (M / N − M, k / n − k).
   - `TwoClassesSvg`: a két végzős osztály lányai és fiúi.
   - `SideEffectBinomialSvg`: a mellékhatások számának binomiális eloszlása (n = 100, p = 0,03).
   - `PizzaPieSvg`: a 4. feladat kördiagramja.
   - `FairnessBarsSvg`: a ráadás 4 pénzfeldobásos eloszlása.
2. **`Sampling12Theory.tsx`**: bevezető, elmélet (két modell), két kidolgozott feladat, tankönyvi és házi feladatok, ráadás, csapda.
   - **I. Laboratórium:** binomiális eloszlás – n, p, k csúszkákkal, oszlopdiagram, P(pontosan k), P(legfeljebb k), P(legalább k), legvalószínűbb k, tankönyvi előbeállítások.
   - **II. Laboratórium:** visszatevéssel vagy anélkül? – N, M, n csúszkákkal a hipergeometrikus és a binomiális eloszlás összehasonlítása diagramon és táblázatban.
3. **`Sampling12Matcher.tsx`**: 3 szint × 8 pár (fogalmak; binomiális együtthatók; feladateredmények).
4. **`Sampling12Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (mintavétel típusa; valószínűségek nagysága; melyik képlet kell).
5. **`Sampling12Quiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 10 kérdésábrával, 3 puskakártyával.
- `statKit.tsx`: belső rajzsegédek (a fejezet közös készletének másolata `SWheel` szerencsekerékkel; nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-stat-mintavetelek-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic3Sampling12.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
