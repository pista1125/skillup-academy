# 11. A gúla felszíne és térfogata (tankönyv: 12. lecke, 28–29. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 28–29. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a térgeometria fejezet **11.** leckéje.

---

## 🎯 Tananyag Áttekintés

A lecke kidolgozott feladata a „háromszögletű” tejszínes doboz: tetraéder, amelynek egyik lapja szabályos háromszög, a másik három 10 cm befogójú, egyenlő szárú derékszögű háromszög. A karton mennyisége (felszín + 5%) ≈ 248 cm², a térfogat ≈ 166,7 cm³ (kb. 1,7 dl).

---

## 📐 Fő Tételek

- **Felszín:** a gúlát határoló lapok területének összege: $A = T_{alaplap} + T_{palást}$.
- **Térfogat:** $V = \dfrac{T_{alaplap} \cdot M}{3}$ – az azonos alapterületű és magasságú hasáb térfogatának harmada.
- Tetraédernél bármelyik lap tekinthető alaplapnak, de a kiválasztott laphoz tartozó magassággal kell számolni.
- Szabályos n oldalú gúla palástja: $n \cdot a \cdot m_o / 2$; szabályos tetraéder: $A = a^2\sqrt3$, $V = a^3\sqrt2/12$.
- Szemléltetés: a kocka három egybevágó, közös csúcsú gúlára bontható ($V = a^3/3$).

### Tankönyvi feladatok (eredmények)
- **1.** Három 15 cm magas gúla (rombusz: átlók 18 és 15 cm; szabályos ötszög: a = 9 cm; szabályos háromszög: a = 17 cm): V ≈ 675 / 696,8 / 625,7 cm³, A ≈ 511,5 / 504,5 / 527,6 cm² ⇒ legnagyobb térfogat: ötszög, legkisebb: háromszög; legnagyobb felszín: háromszög, legkisebb: ötszög.
- **2.** Kockába (10 cm) írt tetraéder, AB, BC, CD kockaélek: mind a 4 lap derékszögű háromszög; élek 10, 10, 10, 10√2, 10√2, 10√3 cm; A = 100 + 100√2 ≈ 241,4 cm²; V ≈ 166,7 cm³.
- **3.** Háztető (10 m × 7 m, gerinc 6 m, 3,2 m magas): trapéz lapok ≈ 42,4°, háromszög lapok ≈ 58,0°, a két trapéz síkjának szöge ≈ 95,1°, tetőtér ≈ 97,1 m³.
- **HF 1.** 30 cm élű, négyzet alapú gúla (szabályos, nem tetraéder; 8 él, 5 csúcs): A ≈ 2458,8 cm², V ≈ 6364 cm³; két ilyen gúlából szabályos oktaéder (8 lap, 12 él, 6 csúcs): A ≈ 3117,7 cm², V ≈ 12 728 cm³.
- **HF 2.** Szabályos hatoldalú gúla, a = 12 cm, b = 13 cm: M = 5 cm, V ≈ 623,5 cm³, α ≈ 22,6°, β ≈ 25,7°, A ≈ 789,3 cm².
- **HF 3.** 20 cm élű kocka sarkát levágó sík (egy csúcs három szomszédos csúcsán át): az alaplappal bezárt szög ≈ 54,7° (tg = √2), a részek ≈ 1333,3 cm³ és ≈ 6666,7 cm³.
- **HF 4.** M = 8 cm, oldallapok 57°: a ≈ 10,39 cm, A ≈ 306,2 cm², V ≈ 287,9 cm³, oldalél–alaplap ≈ 47,4°.

> **⚠️ CSAPDA:** a térfogatba a testmagasság (M) kerül, nem az oldallap magassága (mₒ) – és ne maradjon el a harmadolás!

---

## 💻 Elkészített Komponensek

1. **`PyramidAreaVolumeFigures.tsx`**: `MilkTetraSvg` (tejszínes doboz), `PyramidNetSvg` (gúlaháló), `PrismVsPyramidSvg` (hasáb és gúla), `CubeTetraSvg` (2. feladat), `RoofSvg` (3. feladat), `CubeThreePyramidsSvg` (kocka = 3 gúla).
2. **`PyramidAreaVolumeTheory.tsx`**: kidolgozott tejszínes doboz, képletek, táblázat, kidolgozott feladatok, csapda.
   - **I. Laboratórium:** forgatható szabályos gúla (`Solid3DViewer`) n, a, M csúszkával – alapterület, palást, felszín, térfogat, hasáb-összevetés.
   - **II. Laboratórium:** a kocka három egybevágó gúlára bontása (`Solid3DViewer`, kiemelhető gúlák).
3. **`PyramidAreaVolumeMatcher.tsx`**: 3 szint × 8 pár (képletek; egyszerű számolás; tankönyvi feladatok).
4. **`PyramidAreaVolumeSorter.tsx`**: 3 szint × 3 kategória × 9 elem (mértékegység; térfogat nagysága; felszínhez/térfogathoz kell).
5. **`PyramidAreaVolumeQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), ábrákkal, 3 puskakártyával. Aktivitás-azonosítók: `g12-ter-gula-felszin-terfogat-quiz`, `-matcher`, `-sorter`.

A rajzok a `../a-gula/SolidSketch.tsx` közös SVG-készletét használják.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic1PyramidAreaVolume.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
