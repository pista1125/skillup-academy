# 18. Gyakorlás, tudáspróba (21. lecke, 46–47. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 46–47. oldal) alapján kidolgozott oktatási modul. A diákzónában ez az I. Térgeometria fejezet **18.**, fejezetzáró leckéje. A kvíz a teljes fejezetet (tankönyv 4–47. o.) lefedi; kiegészítő feladatanyag a törölt 8., 15. és 19. tankönyvi leckéből (Gyakorlás).

---

## 🎯 Tananyag Áttekintés

Összefoglalás (képlettár): kocka, téglatest, hasáb, henger, gömb (síkmetszet), gúla, kúp (kiterített palást), csonkagúla, csonkakúp; térelemek távolsága és hajlásszöge; hasonló testek (λ, λ², λ³); gyakorlati számítások (sűrűség, liter, veszteség).

### Feladatok (ellenőrzött eredmények)
- **1.** Antarktisz: 13,8 · 10⁶ km² · 2,2 km ≈ 3,04 · 10⁷ km³ = 3,04 · 10¹⁶ m³, a Föld vízkészletének ≈ 2,1%-a.
- **2.** 12 × 12 × 18 dm-es oszlop: testátló √612 ≈ 24,74 dm; a legnagyobb gúla : oszlop = 1 : 3; oldalél √396 ≈ 19,90 dm; oldalél–alapsík ≈ 64,8°; oldallap–alapsík ≈ 71,6°.
- **3.** Tölcsér: 39,4 + 318,1 + 67,4 + 8,2 ≈ 433 cm³ < 500 cm³ ⇒ a fél liter szörp túlfolyik.
- **4.** 210°-os, 18 cm-es körcikk: r = 10,5 cm, A = 299,25π ≈ 940,1 cm², m ≈ 14,62 cm, V ≈ 1688 cm³, nyílásszög ≈ 71,4°.

### Tudáspróba I.
1. 504 pálca; a testátló ≈ 8,38 dm > 8,3 dm, a pálca elfér. 2. ≈ 3,05 l leves, 22 adag. 3. m = 48 mm. 5. ≈ 58,2 dm² lemez, ≈ 37,3 l víz, élek ≈ 68,0°.

### Tudáspróba II.
1. Testátló ≈ 53,85 cm ⇒ a bot becsomagolható; gúla V = 8000 cm³. 2. m = 108 mm. 3. ≈ 348 cm³ víz, festendő ≈ 1235 cm² (393,25π). 5. Louvre: oldalél ≈ 39,8°, oldallap ≈ 49,7°, üveg ≈ 1892 m².

A Tudáspróba I. 4. (cölöp) és II. 4. (nyerscsavar) feladat adatai csak a tankönyvi ábrából olvashatók ki egyértelműen, ezért a modulban nem szerepelnek számszerűen.

> **⚠️ CSAPDA:** az oldalél hajlásszögéhez a fél **átló**, az oldallapéhoz a fél **alapél** kell: tg α = M / (a√2/2), tg β = M / (a/2).

---

## 💻 Elkészített Komponensek

1. **`SolidsPracticeExamFigures.tsx`**: `SolidsPracticeExamColumnSvg`, `SolidsPracticeExamFunnelSvg`, `SolidsPracticeExamConeSectorSvg`, `SolidsPracticeExamFountainSvg`, `SolidsPracticeExamBowlSvg`, `SolidsPracticeExamLouvreSvg`.
2. **`SolidsPracticeExamTheory.tsx`**: képlettár táblázat (1–17. lecke), távolság/szög, hasonlóság, gyakorlati kártyák, a 46. oldal 4 feladata kidolgozva, a két tudáspróba eredményei, csapda.
   - **I. Laboratórium:** képlettár élőben – 7 test forgatható 3D-ben (`Solid3DViewer`), csúszkákkal, felszín és térfogat.
   - **II. Laboratórium:** hajlásszögek a négyzetes gúlában (oldalél / oldallap derékszögű háromszöge, palást, térfogat) 3D gúlával.
3. **`SolidsPracticeExamMatcher.tsx`**: 3 szint × 8 pár.
4. **`SolidsPracticeExamSorter.tsx`**: 3 szint × 3 kategória × 9 elem.
5. **`SolidsPracticeExamQuiz.tsx`**: fejezetzáró kvíz, **90 kérdés (30/30/30)** a teljes fejezetből, 28 kérdés ábrával, 3 puskakártya (progress id: `g12-ter-tudasproba-quiz`; matcher: `g12-ter-tudasproba-matcher`, sorter: `g12-ter-tudasproba-sorter`).

---

## 🧪 Tesztelés

`src/test/grade12Topic1SolidsPracticeExam.test.tsx` – a 4 komponens és mind a 6 SVG ábra renderelése.
