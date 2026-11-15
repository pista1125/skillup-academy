# 13. Meredekség, iránytangens (77. lecke, 248–251. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 248–251. oldal) alapján kidolgozott oktatási modul. A diákzónában a VI. Koordinátageometria fejezet 13. leckéje.

---

## 🎯 Tananyag Áttekintés

A lecke a hegyi utak veszélyt jelző tábláiból indul: a 12%-os emelkedő 100 m vízszintes úton 12 m-t emelkedik, meredeksége 12/100 = 0,12, a vízszintessel bezárt szöge tg α = 0,12 alapján ≈ 6,84°; a 10%-os lejtő meredeksége −0,1, szöge előjelesen ≈ −5,71°. Ezután hat létra egyenesén vezeti be a meredekséget (egységnyi első koordináta-növekedésre jutó második koordináta-változás), majd definiálja az irányszöget és az iránytangenst.

---

## 📐 Fő Fogalmak és Szabályok

- **Meredekség:** m = Δy / Δx = (y₂ − y₁)/(x₂ − x₁); az y = mx + b alakban az x szorzótényezője.
- **Irányszög:** az x tengelyre nem merőleges egyenes és az x tengely pozitív félegyenese által bezárt **előjeles** szög, −90° < α < 90°. Az y tengellyel párhuzamos egyenesek irányszöge 90°, de **nincs meredekségük** (tg 90° nem értelmezett), nem írható fel y = mx + b alakú egyenletük.
- **m = tg α** – ezért m neve **iránytangens** vagy **iránytényező**.
- m > 0: 0° < α < 90° (emelkedő); m < 0: −90° < α < 0° (csökkenő); m = 0: α = 0°, párhuzamos az x tengellyel.
- Ax + By = C (B ≠ 0) alakból: m = −A/B.

### Kidolgozott feladatok (tankönyv)
1. **Létrák (A–F):** A: m = 6/2 = 3, α ≈ 71,6°, y = 3x − 6; B, C: függőleges (x = 0, x = 2), nincs meredekség; D, E: m = 0 (y = 3, y = 0); F: m = −3/0,8 = −3,75, α ≈ −75,1°, y = −3,75x + 3.
2. **Támasztólétra:** 60–70° ⇒ 1,73 ≤ m ≤ 2,75; 65–75° ⇒ 2,14 ≤ m ≤ 3,73.
3. **3x − 2y = −6** ⇒ y = 3/2 x + 3, m = 3/2.
4. Ugyanennek az egyenesnek az x tengellyel bezárt szöge: tg α = 3/2 ⇒ α ≈ 56,3° (PQR derékszögű háromszög, PQ = 1, QR = 3/2).

### Tankönyvi feladatok (ellenőrzött eredmények)
- **F1.** 3x − 5y = 8: y = 3/5 x − 8/5, m = 0,6, α ≈ 30,96°, (0; −1,6); 4x = y + 2: y = 4x − 2, α ≈ 75,96°, (0; −2); x + 3y + 12 = 0: y = −1/3 x − 4, α ≈ −18,43°, (0; −4).
- **F2.** y = 4/5 x + 1: m = 0,8, α ≈ 38,66°. **F3.** m = −4/7: α ≈ −29,74°.
- **F4.** E(6; 0), m = 2/3: y = 2/3 x − 4, további pontok pl. (9; 2), (3; −2), (0; −4); távolság az origótól 24/√52 ≈ 3,33.
- **HF 2.** K(8; 0), m = 0,75: y = 0,75x − 6, távolság az origótól 4,8.
- **HF 3.** m = 2, P(0; −5): (1; −3), (2; −1), (3; 1), (−1; −7); m = −1/3, P(0; 3): (3; 2), (6; 1), (9; 0), (−3; 4).
- **HF 4.** 14°-os emelkedő: tg 14° ≈ 0,2493 ⇒ 25%; 14%-os lejtő: α ≈ 7,97°.

> **⚠️ CSAPDA:** Ax + By = C alakból nem az x együtthatója a meredekség (3x − 2y = −6 meredeksége 3/2, nem 3); a 100%-os emelkedő 45°-os, nem 90°-os.

---

## 💻 Elkészített Komponensek

1. **`SlopeTangentFigures.tsx`**:
   - `SlopeTangentRoadSignSvg`: a 12%-os emelkedő derékszögű háromszöge és táblája.
   - `SlopeTangentRiseRunSvg`: meredekség két pontból (Δx, Δy, α).
   - `SlopeTangentLaddersSvg`: kidolgozott feladat 1. – létrák meredeksége.
   - `SlopeTangentWorkedAngleSvg`: kidolgozott feladat 4. – a 3x − 2y = −6 egyenes és a PQR háromszög.
   - `SlopeTangentInclinationSvg`: előjeles irányszög (e ≈ 25°, f ≈ −41°).
   - `SlopeTangentSignsSvg`: m > 0, m < 0, m = 0, függőleges egyenes.
   - Segédkomponensek: `SlopeTangentPlane` (koordinátasík-ábra), `SlopeAngleMark` (szögív, derékszögnél negyedkörív ponttal), `SlopeArrowHead`, `clipLine`.
2. **`SlopeTangentTheory.tsx`**: bevezető, meredekség két pontból, kidolgozott feladatok 1–4, irányszög-elmélet, tankönyvi feladatok, csapda.
   - **I. Laboratórium:** m- és b-csúszka, élő egyenes, 1 egységes meredekségi háromszög, irányszög és százalékos emelkedés (előbeállítások: 12%, 10%-os lejtő, 3x − 2y = −6, A létra).
   - **II. Laboratórium:** két pont koordinátái ⇒ m, irányszög, egyenlet (függőleges esetben „nincs meredekség”); irányszög-csúszka ⇒ m = tg α és %-os emelkedő.
3. **`SlopeTangentMatcher.tsx`**: 3 szint × 8 pár (fogalmak, egyenletből meredekség, meredekség ↔ irányszög).
4. **`SlopeTangentSorter.tsx`**: 3 szint × 3 kategória × 9 elem (előjel, meredekség értéke, irányszög tartománya).
5. **`SlopeTangentQuiz.tsx`**: 30 kérdés 3 szinten, 12 ábrával, 3 puskakártyával (progress id: `g11-geo-meredekseg-quiz`; párosító: `g11-geo-meredekseg-matcher`, csoportosító: `g11-geo-meredekseg-sorter`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic6SlopeTangent.test.tsx` fájlban található: a 4 komponens renderelése, a kérdésszám (10/10/10), a két pontos labor függőleges esete és mind a 6 SVG ábra.
