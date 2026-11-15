# 10. Az egyenes egyenlete (74. lecke, 238–241. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 238–241. oldal) alapján kidolgozott oktatási modul. A diákzónában a VI. Koordinátageometria fejezet 10. leckéje.

---

## 🎯 Tananyag Áttekintés

A lecke egy falnak támasztott létrával indul: a létra talpa a faltól 0,8 m-re van, a teteje 3 m magasan támaszkodik. Milyen magasan van a faltól 0,5 m-re lévő C létrafok, és milyen messze van a faltól a 2,7 m magasan lévő D létrafok?
- **I. módszer (hasonlóság):** CCₓ : (0,8 − 0,5) = 3 : 0,8 ⇒ CCₓ = 1,125 m; DᵧD : (3 − 2,7) = 0,8 : 3 ⇒ DᵧD = 0,08 m.
- **II. módszer (koordináta-rendszer):** A(0,8; 0), B(0; 3) ⇒ a létra egyenese az f(x) = −3,75x + 3 lineáris függvény grafikonja; f(0,5) = 1,125 és −3,75x + 3 = 2,7 ⇒ x = 0,08.

A megjegyzésben a létra öt elhelyezése öt egyenest ad: y = 3x − 6 (a (2; 0) és (4; 6) ponton át), x = 0, x = 2, y = 3, y = 0.

---

## 📐 Fő Fogalmak

- **Az egyenes egyenlete:** a pontjainak koordinátáira vonatkozó olyan összefüggés, amelyet **csakis** az egyenesre illeszkedő P(x; y) pontok koordinátái tesznek igazzá.
- Az y tengellyel **nem párhuzamos** egyenes: **y = mx + b** (m, b ∈ R);
  - **y = mx**: az egyenesre illeszkedik az origó;
  - **y = b**: az egyenes párhuzamos az x tengellyel.
- Az y tengellyel **párhuzamos** egyenes: **x = c** – ez nem függvény grafikonja (egy x-hez végtelen sok y tartozik).
- Minden lineáris függvény grafikonja egyenes, de nem minden egyenes lineáris függvény grafikonja. Függvénynél f(x) = ax + b, egyenesnél y = mx + b vagy x = c.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** y = 3x; y = x + 5; y = −x (második koordináta az első háromszorosa / 5-tel nagyobb / ellentettje).
- **2.** y = 1,5x − 5: P(2; 2) nincs rajta, Q(4; 1) rajta van; y = −1,7x − 2: P(0; −2) rajta van, Q(1; 3,7) nincs; x = 2: P(2; 0) rajta van.
- **4.** Tengelymetszetek: y = −6x + 1 ⇒ (0; 1), (1/6; 0); y = −3 ⇒ csak (0; −3); y = 5 ⇒ csak (0; 5).
- **5.** Két pontra illeszkedő egyenes: (0; 5), (0; −1) ⇒ x = 0; (3; −2), (3; 3,7) ⇒ x = 3; (4; −8), (−3; 6) ⇒ y = −2x; (−7; −5), (2; 0) ⇒ y = (5/9)x − 10/9; (5; 13), (−1; 1) ⇒ y = 2x + 3.
- **HF 1.** y = 0,5x: a második koordináta az első fele; y = x − 2: 2-vel kisebb; y = −x + 3: a koordináták összege 3; y = −8; x = 11.
- **HF 2.** x = 15: A(15; 0) igen, B(0; 15) nem; y = −2,8x + 2: A(−1; −1,8) és B(2; −7,6) egyike sem; y = −8: A(1; −8) igen, B(−8; 1) nem.
- **HF 3.** y = −6x + 5 ⇒ (0; 5), (5/6; 0); y = 2x − 3 ⇒ (0; −3), (1,5; 0); y = 9,7 ⇒ csak (0; 9,7).
- **HF 4.** y = 1; y = −3x; x = −2; y = −2x + 1; y = x − 4.
- **HF 5. b)** 3x − y = 8 ⇔ y = 3x − 8.

A tankönyvi szöveg néhány törtes adata (pl. 1. c–d, 2. c–d, 3., HF 2. c) a forrásszövegben olvashatatlan volt; ezek helyett a modul a fenti, ellenőrzött feladatokat használja.

> **⚠️ CSAPDA:** a meredekséget fordítva számolni: P(4; −8), Q(−3; 6) esetén m = Δy / Δx = 14 / (−7) = −2, nem −1/2. Mindig helyettesítsd vissza mindkét pontot! Az y tengellyel párhuzamos egyenes egyenlete x = c, nem y = c.

---

## 💻 Elkészített Komponensek

1. **`LineEquationFigures.tsx`**:
   - `LadderWallSvg`: a falnak támasztott létra (K derékszög negyedkörívvel és ponttal, Cₓ, Cᵧ, Dₓ, Dᵧ vetületek).
   - `LadderCoordinateSvg`: II. módszer – A(0,8; 0), B(0; 3), f(x) = −3,75x + 3.
   - `LadderCasesSvg`: a létra öt elhelyezése (A–E) és egyenleteik.
   - `LineFormsSvg`: y = mx + b, y = mx, y = b és x = c egy ábrán.
   - `TwoPointLineSvg`: két pontra illeszkedő egyenes meredekségi háromszöggel (y = 2x + 3).
   - `AxisInterceptsSvg`: az y = 2x − 3 egyenes tengelymetszetei.
   - Segédkomponensek: `LineEquationPlane` (általános koordinátasík egyenesekkel, szakaszokkal, körökkel, pontokkal, kattintással), `LineEquationRightAngle`.
2. **`LineEquationTheory.tsx`**: bevezető (két módszer), a létra elhelyezései, elmélet és táblázat, kidolgozott feladatok, házi feladatok eredményei, csapda.
   - **I. Laboratórium:** két pont (kattintással vagy számmal) → élő egyenlet törtekkel, meredekségi háromszög, tengelymetszetek; x = c és egybeeső pontok esete.
   - **II. Laboratórium:** a létra egyenese csúszkákkal (talptávolság, magasság), egy létrafok magassága / faltávolsága, tankönyvi előbeállítás.
3. **`LineEquationMatcher.tsx`**: 3 szint × 8 pár (egyenletalakok, két pont → egyenlet, tengelymetszetek).
4. **`LineEquationSorter.tsx`**: 3 szint × 3 kategória × 9 elem (helyzet; rajta / fölötte / alatta; az egyenlet alakja két pontból).
5. **`LineEquationQuiz.tsx`**: 30 kérdés 3 szinten, 13 koordinátarendszeres / létrás ábrával, 3 puskakártyával (progress id: `g11-geo-egyenes-egyenlete-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic6LineEquation.test.tsx` fájlban található: a 4 komponenst, a 30 kérdés szintenkénti eloszlását mind a 6 SVG ábrát és az összes kvízábrát ellenőrzi.
