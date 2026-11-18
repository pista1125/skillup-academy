# 5. Kivonás 20-as számkör

## Források (útmutató)
- **Tankönyv I (`OH-MAT02TA/I`)**: 12–17. oldal (`Összeadás, kivonás 0-tól 20-ig` – kivonási részek)
- **Munkafüzet I (`OH-MAT02MA/I`)**: 7–8. és 10–14. oldal

## Tananyag és készségek (0–20 számkör)
- Visszalépés 10-re (`14 − 4 = 10`) és a 10 elvétele (`16 − 10 = 6`).
- Kivonás tízesátlépés nélkül, a 10-es számkör analógiájával (`8 − 3 = 5` → `18 − 3 = 15`).
- Kivonás tízesátlépéssel: a kivonandó felbontása és visszalépés a 10-es határon át (`14 − 7 = 14 − 4 − 3 = 10 − 3 = 7`).
- Kétjegyűből kétjegyű szám kivonása 3 ügyes úton (`17 − 13`: `17 − 10 − 3`, `17 − 3 − 10`, `17 − 7 − 6`).
- Ellenőrzés összeadással, hiányzó kisebbítendő és kivonandó (`□ − 7 = 8`, `16 − □ = 9`), kétoldali egyenletek (`17 − 5 = 19 − □`), 20-as kivonókerék, műveletlánc, szabálytáblázat és nyitott egyenlőtlenségek (`▲ < 14 − 8`).

## Komponensek
- `Sub20G2Parts.tsx` – Újrafelhasználható 2×10-es kivonási korongkeret és 0–20-as számegyenes
- `Sub20G2Figures.tsx` – Tananyag SVG-ábrák (`ReachTenAndSubTenSvg`, `AnalogySubNoCrossSvg`, `BridgingDownTwentyFrameSvg`, `ThreeStrategiesLineSvg`, `RadialTwentyWheelSvg`, `ArrowChainSubSvg`)
- `Sub20G2CardFigures.tsx` – Kis kártyaábrák a Párosító (`150 × 80`) és Csoportosító (`80 × 80`) játékhoz
- `Sub20G2Theory.tsx` – Tananyag két interaktív laborral (20-as keret áthúzással, kivonásmérleg)
- `Sub20G2Quiz.tsx` – 30 feladat 3 szinten (`g2-c20-kivonas20-quiz`)
- `Sub20G2Matcher.tsx` – 3×8 párosító (`g2-c20-kivonas20-matcher`)
- `Sub20G2Sorter.tsx` – 3×3×9 csoportosító (`g2-c20-kivonas20-sorter`)

## Teszt
- `src/test/grade2Topic1Sub20G2.test.tsx`

## Eltérések a tankönyvtől
- **Szigorú 0–20-as számkör**: A munkafüzet 14. oldalának 3. feladatában két csökkenő sorozat 21-ről indul (`21, 19, 17, ...` és `21, 18, 15, ...`), pedig a fejezet címe `0-tól 20-ig`. A DiákZónában minden szám, sorozat és művelet szigorúan a `0–20` tartományban marad (`20, 17, 14, ...`).
- **Egyértelmű alaphalmaz a nyitott egyenlőtlenségeknél**: A `▲ < 14 − 8` és `16 − 9 > ▲ + 2` típusú feladatoknál mindig pontosan rögzítjük, hogy a `0–20`-as számkör számait vizsgáljuk (beleértve a `0`-t is).
- **Saját feladatok és jelölés**: A könyv szereplőit és feladatait nem másoltuk át; saját példákat és egyértelmű ábrákat használunk, betűs képletek és LaTeX nélkül.
