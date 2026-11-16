# 8. Geometriai valószínűség (40. lecke, 92–93. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 40. lecke, 92–93. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a statisztika és valószínűségszámítás fejezet **8.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Kidolgozott feladat:** céltábla, a belső kör átmérője 10 cm, a két körgyűrű 10-10 cm széles (sugarak 5, 15, 25 cm). Az elemi események a tábla pontjai – végtelen sok –, ezért a kedvező terület és a teljes terület hányadosát vesszük: P(belső kör) = 1/25, P(belső körgyűrű) = 8/25, P(külső körgyűrű) = 16/25 (komplementerrel is: 1 − (1/25 + 8/25)).

---

## 📐 Elmélet

- **Geometriai valószínűség:** ha egy esemény bekövetkezését geometriai mennyiséggel (hosszúság, terület, térfogat, szög) jellemezzük, a valószínűség arányos e mennyiség mértékével: P = az eseményhez tartozó mérték / a teljes eseménytér ugyanilyen mértéke.
- **Szerencsekerék:** P = a körcikk középponti szöge / 360°.

### Tankönyvi feladatok (a modulban feldolgozva)
- **1.** Hangya a méterrúdon: a) 1/2, b) 1/2 (25–75 cm), c) 0,6 (0–60 cm).
- **2.** Közelebb a középponthoz: körlapon 1/4, gömbben 1/8.
- **3.** 2,8 cm-es érme 20 cm-es csempén, 0,5 cm-es fugával: 17,2² / 20,5² ≈ 0,704.
- **4.** R = 16 cm, 4 egyenlő valószínűségű tartomány: sugarak 8; 8√2 ≈ 11,31; 8√3 ≈ 13,86; 16 cm.
- **5.** Csonkakúp alakú cserép (d = 18 és 12 cm, alkotó 10 cm): m = √91, a fedőlaptól ≤ 3 cm-re eső szelet ≈ 395,4 cm³ / 1708,2 cm³ ≈ 0,23 (a 12 cm-es kört tekintettük fedőlapnak, ahogy a szöveg mondja).
- **HF 2.** 20 × 30-as lap, minden csúcstól > 10 cm: (600 − 100π)/600 ≈ 0,476.
- **HF 3.** Kettétört festett rúd: ⚠️ az ábra nem látható a szövegben; a modul azt feltételezi (és ki is írja), hogy a 0–10 cm-es szakasz piros: 42 cm-es darab 22/42 ≈ 0,524, 58 cm-es darab 28/58 ≈ 0,483.
- **HF 4.** Négy részre osztott céltábla (belső átmérő = külső fele): P(10) = 3/8, P(40) = 1/8, P(≥ 40) = 1/4 (a szövegben látható 10–20–50–40 elrendezés alapján).
- **HF 1.** A monitor A–D tartományainak elhelyezkedése a szövegből nem derül ki; a modul csak a kör eltalálását kérdezi (8²π / (34,5 · 19,5) ≈ 0,299).

> **⚠️ CSAPDA:** területarány = a sugarak arányának négyzete (5/25 helyett (5/25)² = 1/25), térfogatnál a köbe.

A korábbi README a „találkozási feladatot” és μ(A)/μ(Ω) jelölést is tartalmazott; ezek nincsenek a tankönyvi leckében – a modul a tankönyvet követi.

---

## 💻 Elkészített Komponensek

1. **`GeometricProbabilityFigures.tsx`**:
   - `TargetRingsSvg`: a kidolgozott feladat céltáblája a három valószínűséggel.
   - `LuckyWheelSvg`: szerencsekerék (120°, 90°, 60°, 90°).
   - `AntRodSvg`: hangya a méterrúdon, az a)–c) kedvező szakaszok.
   - `TileCoinSvg`: érme a csempén, a középpont kedvező négyzete.
   - `FlowerPotSvg`: a virágcserép tengelymetszete (derékszög: negyedkörív ponttal).
   - `PaperCornersSvg`: papírlap a négy negyedkörrel.
   - (belső segédek: `Target`, `RightAngleMark`)
2. **`GeometricProbabilityTheory.tsx`**: kidolgozott feladat, definíció és mértéktáblázat, a tankönyv 1–5. feladata, HF 2. és HF 4., csapda.
   - **I. Laboratórium:** céltábla-szimulátor – a két belső sugár csúszkával állítható, véletlen lövések (1/10/100/1000), elméleti valószínűség és relatív gyakoriság.
   - **II. Laboratórium:** szerencsekerék – állítható középponti szögek, pörgetés-szimuláció, P = szög / 360° összevetése a relatív gyakorisággal.
3. **`GeometricProbabilityMatcher.tsx`**: 3 szint × 8 pár (képletek; szerencsekerék és méterrúd; tankönyvi feladatok).
4. **`GeometricProbabilitySorter.tsx`**: 3 szint × 3 kategória × 9 elem (hossz / terület / térfogat; 1/4 / 1/2 / 1/8; < 0,5 / 0,5–0,75 / > 0,75).
5. **`GeometricProbabilityQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 17 kérdésábrával, 3 puskakártyával.
- `probKit.tsx`: belső rajzsegédek – nem exportáljuk az `index.ts`-ből.

Aktivitás-azonosítók: `g12-stat-geometriai-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic3GeometricProbability.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
