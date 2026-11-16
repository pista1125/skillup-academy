# 10. A gúla (tankönyv: 11. lecke, 26–27. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 26–27. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a térgeometria fejezet **10.** leckéje.

---

## 🎯 Tananyag Áttekintés

A lecke a gízai piramisokból indul: a Kheopsz-piramis szabályos négyoldalú gúla (alapél 232,4 m, magasság 146,7 m). Megismerjük a gúla fogalmát és részeit, a szabályos gúlát, a tetraédert és a szabályos tetraédert, majd a szabályos gúla derékszögű háromszögeiben számolunk élhosszakat és hajlásszögeket.

---

## 📐 Fogalmak

- **Gúla:** síklapokkal határolt test (poliéder), amelyet egy sokszög és annyi háromszög határol, ahány oldalú a sokszög. Részei: alaplap, oldallapok, alapélek, oldalélek, a gúla csúcsa.
- **Testmagasság (M):** a gúla csúcsának az alapsíktól való távolsága.
- n oldalú gúla: **n + 1 lap, 2n él, n + 1 csúcs** (az ötoldalú gúlának 6 lapja van). A gúlának nincs testátlója.
- **Szabályos gúla:** alaplapja szabályos sokszög, és minden oldaléle egyenlő hosszú.
- Ha egy gúla minden oldaléle egyenlő, az alaplap körbe írható, és a kör középpontja a csúcs merőleges vetülete.
- **Tetraéder:** háromoldalú gúla (4 lap, bármelyik lehet alaplap). **Szabályos tetraéder:** mind a 4 lapja szabályos háromszög.
- Szabályos gúla derékszögű háromszögei: $M^2 + \rho^2 = m_o^2$, $M^2 + R^2 = b^2$, $m_o^2 + (a/2)^2 = b^2$ (ρ: beírt, R: köré írt kör sugara).
- Oldalél–alaplap szög: $\text{tg}\,\alpha = M/R$; oldallap–alaplap szög: $\text{tg}\,\beta = M/\rho$, mindig β > α.

### Tankönyvi feladatok (eredmények)
- **1.** Kheopsz-piramis: $m_o ≈ 187{,}1$ m, $m_o : (a/2) ≈ 1{,}61$ (aranymetszés); oldallap területe ≈ 21 746 m² és M² ≈ 21 521 m² (ezresekre kerekítve egyaránt 22 000 m²); α ≈ 41,8°, β ≈ 51,6° (≈ 10°-kal nagyobb).
- **2.** Szabályos hatoldalú gúla, oldalél 7√2, 45° ⇒ a = 7, oldallap–alaplap szög ≈ 49,1°.
- **3.** Szabályos tetraéder (8 cm) lapjainak szöge: cos φ = 1/3 ⇒ φ ≈ 70,5°.
- **HF 1.** A: igaz, B: igaz, C: hamis (nincs testátló), D: igaz.
- **HF 2.** Szabályos háromszög oldallapok, $T_{alap} = 100$ cm² ⇒ M = 5√2 ≈ 7,07 cm, β ≈ 54,7°, α = 45°.
- **HF 3.** Alap: 5 és 12 cm befogójú derékszögű háromszög, merőleges 12 cm-es oldalél ⇒ ismeretlen élek 13, 13 és 12√2 ≈ 16,97 cm; legnagyobb lap ≈ 83,6 cm².

> **⚠️ CSAPDA:** az oldalél és az oldallap hajlásszögét nem szabad összekeverni: az oldallapnál a beírt kör sugarával (négyzetnél a/2), az oldalélnél a köré írt kör sugarával (négyzetnél a√2/2) kell számolni.

---

## 💻 Elkészített Komponensek

1. **`PyramidFigures.tsx`**: `PyramidPartsSvg` (a gúla részei), `PyramidTypesSvg` (háromoldalú, szabályos háromoldalú gúla, szabályos tetraéder), `CheopsSvg` (Kheopsz-piramis), `PyramidRightTrianglesSvg` (nevezetes derékszögű háromszögek, α és β), `HexPyramidSvg` (2. feladat), `TetraDihedralSvg` (3. feladat).
2. **`PyramidTheory.tsx`**: bevezető, fogalmak, szabályos gúla és tetraéder, derékszögű háromszögek, kidolgozott feladatok, csapda.
   - **I. Laboratórium:** forgatható szabályos n oldalú gúla (`Solid3DViewer`) n, a, M csúszkával; R, ρ, mₒ, b, α, β élőben.
   - **II. Laboratórium:** Piramis-kalkulátor (metszet-háromszög, aranymetszés-ellenőrzés, oldallap területe vs. M²).
3. **`PyramidMatcher.tsx`**: 3 szint × 8 pár (fogalmak; lapok/élek/sugarak; számolás).
4. **`PyramidSorter.tsx`**: 3 szint × 3 kategória × 9 elem (hány oldalú; melyik derékszögű háromszög; igaz/hamis/adatfüggő).
5. **`PyramidQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), ábrákkal, 3 puskakártyával. Aktivitás-azonosítók: `g12-ter-gula-quiz`, `-matcher`, `-sorter`.
6. **`SolidSketch.tsx`**: közös SVG-rajzkészlet (ferde vetítés, takart élek szaggatva, negyedkörív-derékszög) a 10–14. lecke ábráihoz.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic1Pyramid.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
