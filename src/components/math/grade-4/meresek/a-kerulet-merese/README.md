# 2. A kerület mérése (II. Mérések, 2. lecke)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., **57–58. oldal**) és munkafüzet (`OH-MAT04MA_I`, **48–50. oldal**) alapján kidolgozott modul 4. osztályosoknak.

---

## Tananyag Áttekintés

- **57. o.:** a füzet körbekerítése fonallal, majd az oldalak megmérése és összeadása – a kettő ugyanazt adja: ez a **kerület**. Állatkert terve négyzetrácson: hány egység kerítés kell az egyes állatok helye köré? Pálcikákból (8 cm) kirakott sokszögek (A négyzet 4, B téglalap 6, C trapéz 5, D hatszög 6, E rombusz 4, F paralelogramma 6 pálcika); háromszög, négyszög, ötszög oldalainak mérése.
- **58. o.:** téglalapok és négyzetek oldalainak mérése mm pontossággal; uszodamedence 33 m × 21 m (K = 108 m); homokozók: négyzet 2000 mm oldallal (8 m), hatszög 3 m oldallal (18 m); ház és konyhakert alaprajza: telek 22 m × 12 m (68 m drót, 2 méterenként 34 oszlop), veteményes 5 m × 12 m (34 m), füves rész 17 m × 12 m (58 m).
- **Munkafüzet 48–50. o.:** szívószálból kirakott betűk; sokszögek fonalból; egyenlő oldalú sokszögek 40 mm-es oldallal (120, 160, 200, 240 mm); a ház síkidomjai; tablókeretek (500 × 350 mm → 1700 mm, 420 × 297 mm → 1434 mm, 700 × 500 mm → 2400 mm); négyzet alakú kerti tavak (2 m, 200 cm, 2000 mm → 8 m; 2500 mm, 2 m 50 cm, 2 m 5 dm → 10 m); lakás alaprajza négyzethálón (szegélyléc).

## Szabályok

- **Kerület (K)** = a síkidomot határoló oldalak hosszának összege; mértékegysége hosszúság.
- Téglalap: K = a + b + a + b. Négyzet: K = 4 · a. Egyenlő oldalú sokszög: oldalak száma · oldalhossz.
- Összeadás előtt azonos mértékegységre váltunk.

> **Csapda:** a téglalapnál csak két oldalt összeadni (33 + 21 = 54 m) – ez a kerület fele. A kerületet nem szabad összekeverni a területtel.

> **Javítás a régi README-hez képest:** a korábbi leírás LaTeX-képleteket és betűs jelölést használt; a tankönyv szavakkal, konkrét számokkal és pálcikás/négyzetrácsos ábrákkal tanítja a kerületet – a modul ezt követi.

---

## Elkészített Komponensek

1. **`Perimeter4Figures.tsx`**
   - `WalkAroundRectSvg`: katica körbejárja a 6 cm × 4 cm-es téglalapot (K = 20 cm).
   - `StickPolygonsSvg`: 8 cm-es pálcikákból kirakott sokszögek (A–D).
   - `SwimmingPoolSvg`: a 33 m × 21 m-es medence.
   - `GardenPlanSvg`: telek, ház, füves rész és veteményes (22 m × 12 m, 5 m).
   - `GridPerimeterSvg`: négyzetrácsos alakzat kerülete (14 egység).
2. **`Perimeter4Theory.tsx`**: fogalom, négyzetrács, téglalap / négyzet / egyenlő oldalú sokszög, tavak táblázata, kidolgozott példák (medence, homokozók, tablók, telek), csapda.
   - **Labor I – Négyzetrácsos kerületrajzoló:** a gyerek négyzeteket színez, megtippeli a kerületet, a gép ellenőrzi.
   - **Labor II – Kerítésépítő:** +/− gombokkal téglalap alakú kertet épít, amelynek kerülete pontosan a megadott szám; azonnali visszajelzés.
3. **`Perimeter4Matcher.tsx`**: 3 szint × 8 pár.
4. **`Perimeter4Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (kerület / szakasz / nem hosszúság; K < 20 / = 20 / > 20 cm; tavak 8 / 10 / 12 m).
5. **`Perimeter4Quiz.tsx`**: 30 kérdés (10–10–10), 20 kérdésnél ábra, 3 puskakártya.

Azonosítók: kvíz `g4-meas-kerulet-quiz`, párosító `g4-meas-kerulet-matcher`, csoportosító `g4-meas-kerulet-sorter`.

---

## Tesztelés

`src/test/grade4Topic2Perimeter4.test.tsx` – a 4 komponens és mind az 5 SVG ábra renderelése.
