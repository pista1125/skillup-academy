# 17. Térgeometria a hétköznapi életben (20. lecke, 44–45. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 44–45. oldal) alapján kidolgozott oktatási modul. A diákzónában ez az I. Térgeometria fejezet **17.** leckéje. Kiegészítő anyag: a törölt 8. tankönyvi lecke (Gyakorlás) falfesték-feladata.

---

## 🎯 Tananyag Áttekintés

Gyakorlati modellezés: a tárgyakat tanult testekkel közelítjük (gömb, kúp, hasáb, henger, gúla, csonkakúp, összetett testek), majd térfogatot (tömeg, űrtartalom) vagy felszínt (festék, papír, karton) számolunk; mértékegységek (1 dm³ = 1 l, 1 g/cm³ = 1 kg/dm³), veszteség és ráhagyás százalékban, gyakorlatias kerekítés.

### Feladatok (ellenőrzött eredmények)
- **1.** Fenyőfa gömbök (⌀ 4,2 dm) és kúpok (⌀ 4,2 dm, m = 5,4 dm), 2-2 db, ρ = 0,43 g/cm³: gömb ≈ 38,79 dm³, kúp ≈ 24,94 dm³ ⇒ tömeg ≈ **54,8 kg**; festendő (2 gömb + 2 kúppalást) ≈ **187,3 dm²**.
- **2.** Szív alakú torta: 20 × 20 × 8 cm-es hasáb + a négyzet két szomszédos oldalához illesztett két félhenger (egy ⌀ 20 cm-es, 8 cm magas henger) ≈ 3200 + 2513,3 ≈ 5713,3 cm³; 120 cm³-es szeletekkel ≈ **47 ember**.
- **3. (érettségi, 2007)** Gúla alakú gyertya (a = 5 cm, oldalél 8 cm): M ≈ 7,18 cm, V ≈ **60 cm³**; 130 db, 6% veszteség: 7774 / 0,94 ≈ 8271 cm³ ≈ **8,3 l**; felszín ≈ 101,0 cm², 136%-kal 40 dobozra ≈ **5494 cm²**.
- **4.** Farsangi kalap (m = 40 cm, kerület 54 cm): r ≈ 8,59 cm, a ≈ 40,91 cm, karton ≈ **1105 cm²**, körcikk ≈ 75,6°; kartonlap ≈ 50,2 × 40,9 cm (szimmetrikus) vagy ≈ 40,9 × 39,6 cm.
- **5.** Kúpos fogaskerék (R = 1,5, r = 1 cm, palást 40%-a): 45° ⇒ ≈ **2,22 cm²**, 50° ⇒ ≈ **2,44 cm²**.
- **HF:** homokkúp (80 cm, 120°) ≈ 1,61 m³ ⇒ 8 forduló; sajttömb 4,8 kg, egy darab ≈ 100,5 cm³, csomagolás ≈ 219,5 cm²; vízelvezető árok (trapéz keresztmetszet 60/30 cm, szárak 30 cm, m = 15√3 ≈ 26 cm, 24 m hosszú) ≈ 2,81 m³ föld, 240 db 30 × 30 cm-es kőlap; víztároló 99π ≈ 311,0 m³, festendő ≈ 247,3 m²; üvegdísz ≈ 18,8 g.
- **8. lecke (extra):** falfesték: 15 l → 120–135 m², réteg ≈ 0,11–0,125 mm, 53 m²-es lakás ⇒ 3 vödör.


> **⚠️ CSAPDA:** p% veszteségnél a szükséges anyag hasznos / (1 − p/100), nem hasznos · (1 + p/100).

---

## 💻 Elkészített Komponensek

1. **`SolidsEverydayFigures.tsx`**: `SolidsEverydayGateSvg`, `SolidsEverydayCakeSvg`, `SolidsEverydayCandleSvg`, `SolidsEverydayHatSvg`, `SolidsEverydayGearSvg`, `SolidsEverydayTankSvg`, `SolidsEverydayDitchSvg` (HF 2. vízelvezető árok).
2. **`SolidsEverydayTheory.tsx`**: a modellezés lépései, átváltási táblázat, az 5 feladat és a házi feladatok kidolgozva, csapda.
   - **I. Laboratórium:** anyagszükséglet- és tömegkalkulátor – 5 test forgatható 3D-ben (`Solid3DViewer`), anyag (sűrűség), darabszám, veszteség, ráhagyás.
   - **II. Laboratórium:** farsangi kalap tervező – körcikk, középponti szög, karton mérete.
3. **`SolidsEverydayMatcher.tsx`**: 3 szint × 8 pár.
4. **`SolidsEverydaySorter.tsx`**: 3 szint × 3 kategória × 9 elem.
5. **`SolidsEverydayQuiz.tsx`**: 30 kérdés (10/10/10), 12 kérdés ábrával, 3 puskakártya (progress id: `g12-ter-hetkoznapi-quiz`; matcher: `g12-ter-hetkoznapi-matcher`, sorter: `g12-ter-hetkoznapi-sorter`).

---

## 🧪 Tesztelés

`src/test/grade12Topic1SolidsEveryday.test.tsx` – a 4 komponens és mind a 6 SVG ábra renderelése.
