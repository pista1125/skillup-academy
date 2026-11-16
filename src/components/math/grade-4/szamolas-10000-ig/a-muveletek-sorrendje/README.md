# 4. A műveletek sorrendje (tankönyv 21. oldal, munkafüzet I. 16–17. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 21. oldal) és munkafüzet (`OH-MAT04MA_I`, 16–17. oldal) alapján kidolgozott oktatási modul. A diákzónában ez az I. fejezet 4. leckéje.

---

## 🎯 Tananyag Áttekintés

- **A tankönyv szabálya** (1. feladat, a gyerekek szövegbuborékában): „Ha a műveletsor több különböző műveletet (szorzást, osztást, kivonást, összeadást) tartalmaz, akkor először balról jobbra haladva a szorzásokat, osztásokat végezzük el, utána balról jobbra haladva az összeadásokat, kivonásokat.” „A zárójel kijelöli a műveletek sorrendjét.”
- **1. feladat**: 350 − 190 + 680 + 160 = 1000; 60 · 5 : 100 · 80 = 240; 70 · 9 − 8 · 40 = 310; 1000 : (350 − 250) = 10; 500 + 4 · 90 = 860; 70 · (9 − 8) · 4 = 280.
- **2. feladat (horgászbotok képe)**: botok 124 · 8 − 129 · 6 = 218 cm, 97 · 9 − 663 = 210 cm, 739 − 67 · 8 = 203 cm; úszó távolsága 46 · 3 + 47 · 5 = 373 dm, 764 − 127 · 4 = 256 dm, 6 · 124 − 525 = 219 dm.
- **3. feladat**: Karcsi bácsi 480 perc, Pista bácsi 480 : 2 + 30 = 270 perc; összesen 750 perc, együtt legfeljebb 270 perc.
- **4. feladat**: 3 kg-os hal és egy 34 dkg-mal könnyebb (266 dkg) → együtt 566 dkg.
- **Munkafüzet I. 16.**: a sorrend jelölése körökben (180 + 8 · 42 − 9 · 11 = 417, 255 · 3 − 535 = 230, 970 − 324 · 2 = 322, (142 + 108) · 3 = 750, 970 − (688 − 538) = 820, (3 · 86) + (4 · 66) = 522, (460 − 267) · 5 − 400 = 565, 7 · (724 − 654) = 490); nyitott mondatok (480 : 10 + 320 > □, 220 − □ < 800 : 8 : 4); halivadékok (550, 120, 670).
- **Munkafüzet I. 17.**: „Melyik számra gondoltam?” (240 + 10 · 7 = 310; 50 · 7 − 40 · 3 = 230), **malomjáték**: Levente zárójel nélkül (449, 135, 534), Márk zárójellel (195, 558, 768).

> **⚠️ CSAPDA:** nem szabad mindig balról jobbra számolni: 500 + 4 · 90 ≠ 504 · 90. Először a szorzás, osztás – kivéve, ha zárójel mást mond.

### A régi README javított hibái
- LaTeX-képletek helyett 4. osztályos jelölés.
- A régi mintapéldák (50 + 6 · 8 − 20 stb.) nem a tankönyvből valók; helyettük a tankönyv és a munkafüzet feladatai szerepelnek.

---

## 💻 Elkészített Komponensek

1. **`OrderOfOps1000Figures.tsx`**:
   - `OrderRulesSvg`: a sorrend 3 lépése (zárójel → · és : → + és −).
   - `StepCirclesSvg`: 180 + 8 · 42 − 9 · 11 bekarikázott sorszámokkal, lépésenként.
   - `FishingRodsSvg`: a három horgászbot és zsinór műveletsorai.
   - `ParenthesesCompareSvg`: 3 · 139 + 117 = 534 és 3 · (139 + 117) = 768.
   - `MillBoardSvg`: malomtábla a munkafüzet 24 számával (segédek: `MillBoardLines`, `MILL_POINTS`).
2. **`OrderOfOps1000Theory.tsx`**: Mit tanulunk? (tankönyvi szabály), kidolgozott 1. feladat táblázatban, sorrend jelölése, zárójel szerepe, horgászos szöveges feladatok, „Vigyázz!” csapda. Exportálja a `tokenize`, `nextOpIndex`, `reduceAt`, `evaluate` segédfüggvényeket.
   - **I. labor:** „Melyik művelet jön?” – a gyerek a következő műveleti jelre kattint, a műveletsor lépésenként egyszerűsödik, magyarázó visszajelzéssel.
   - **II. labor:** malom – Levente és Márk műveletsorait kiszámolva a korongot a táblán a helyes eredményre kell tenni.
3. **`OrderOfOps1000Matcher.tsx`**: 3 szint × 8 pár (rövid műveletsorok, munkafüzeti műveletsorok, zárójellel/anélkül).
4. **`OrderOfOps1000Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (mivel kezdünk; eredmény < 300 / 300–600 / > 600; a zárójel hatása).
5. **`OrderOfOps1000Quiz.tsx`**: 30 kérdés 3 szinten (10/10/10), ábrákkal (műveletsor-kártyák, horgászbotok, idővonal), 3 puskakártyával.

Azonosítók: kvíz `g4-count-sorrend-quiz`, párosító `g4-count-sorrend-matcher`, csoportosító `g4-count-sorrend-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic1OrderOfOps1000.test.tsx` (4 komponens, 5 SVG ábra, műveletsor-kiértékelés).
