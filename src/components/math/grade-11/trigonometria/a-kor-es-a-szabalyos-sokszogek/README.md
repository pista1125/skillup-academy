# 13. A kör és a szabályos sokszögek (13. lecke, 38–39. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 38–39. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A lecke egy hétköznapi tárgyból indul: a kilencküllős autós dísztárcsa „csúcspontjai” szabályos kilencszöget alkotnak (OA = 17,5 cm). A középpontból húzott sugarak a kilencszöget 9 egybevágó, egyenlő szárú háromszögre bontják, így a középponti szög, az oldal és a terület szögfüggvényekkel számolható. Az elméleti rész a **körív**, a **körcikk** és a **körszelet** kiszámítását foglalja össze.

---

## 📐 Fő Összefüggések

- **Kidolgozott feladat (dísztárcsa):**
  - a) AOB∠ = 360° : 9 = 40°.
  - b) Koszinusztétellel: x² = 17,5² + 17,5² − 2 · 17,5 · 17,5 · cos 40°, vagy az APO derékszögű háromszögből: x = 2 · 17,5 · sin 20° ≈ 12 cm.
  - c) T(AOB) = ½ · 17,5² · sin 40° ≈ 98,4 cm², a kilencszög területe ennek 9-szerese ≈ 886 cm².
- **Szabályos n-szög (R sugarú körbe írva):** középponti szög 360° : n; $a = 2R\sin\frac{180^\circ}{n}$; $\rho = R\cos\frac{180^\circ}{n}$; $T = n\cdot\frac{R^2\sin(360^\circ/n)}{2}$ (n → ∞ esetén T → R²π).
- **Körív és körcikk (elmélet 1.):** a középponti szög, a körív hossza és a körcikk területe egyenesen arányos.
  $$i = \frac{2r\pi}{360^\circ}\cdot\alpha = \frac{r\pi\alpha}{180^\circ},\qquad t = \frac{r^2\pi}{360^\circ}\cdot\alpha = \frac{i\cdot r}{2}$$
- **Körszelet (elmélet 2.):** körcikk − AOB háromszög, ahol $T_{AOB} = \frac{r\cdot r\cdot\sin\alpha}{2}$.

### Tankönyvi feladatok
- **1.** r = 8,4 cm, AB = 1,6r ⇒ AOB∠ ≈ 106,26°; T(AOB) ≈ 33,87 cm²; ívek ≈ 15,58 cm és ≈ 37,20 cm; körcikkek ≈ 65,43 cm² és ≈ 156,24 cm²; körszeletek ≈ 31,56 cm² és ≈ 190,11 cm².
- **2.** 50 pennys érme (szabályos hétszög, köré írt kör átmérője 27,3 mm, vastagság 1,8 mm, ρ = 8,7 g/cm³) ⇒ alapterület ≈ 5,10 cm², térfogat ≈ 0,918 cm³, tömeg ≈ 8 g.
- **3. a)** 140 cm széles terítő a 160 cm átmérőjű asztalon, közös középponttal ⇒ fedetlen rész ≈ 1046 cm² (2 körszelet, α ≈ 57,91°).
- **HF 1.** 60 cm átmérőjű, 2,6 m hosszú cső, 20 cm magas víz ⇒ α ≈ 141,06°, körszelet ≈ 825,0 cm², ≈ 214,5 liter víz, a térfogat ≈ 29%-a.
- **HF 2.** Szabályos ötszög alakú terítő, R = 70 cm ⇒ lefedhető asztal átmérője ≈ 113,3 cm, zsinór ≈ 411,4 cm, átló ≈ 133,1 cm.

> **⚠️ CSAPDA:** Az oldalhoz a FÉL középponti szög szinusza kell: a = 2R · sin(180° : n), nem R · sin(360° : n). A körszelet nem azonos a körcikkel – az AOB háromszöget ki kell vonni.

---

## 💻 Elkészített Komponensek

1. **`TrigRegularPolygonsFigures.tsx`**:
   - `HubcapNonagonSvg`: kilencküllős dísztárcsa, szabályos kilencszög, 40°-os középponti szög.
   - `NonagonTriangleSvg`: az AOB egyenlő szárú háromszög OP magassággal (20° + 20°, derékszög P-nél).
   - `ArcSectorSvg`: körív (i) és körcikk (t) képletei.
   - `CircularSegmentSvg`: körszelet = körcikk − AOB háromszög.
   - `ChordCircleSvg`: 1. feladat – 8,4 cm sugarú kör, AB = 1,6r.
   - `PipeWaterSvg`: HF 1. – a vízszintes cső keresztmetszete 20 cm magas vízzel.
2. **`TrigRegularPolygonsTheory.tsx`**: kidolgozott dísztárcsa-feladat két módszerrel, szabályos n-szög képletei táblázattal, körív/körcikk/körszelet elmélet, 4 kidolgozott feladat, csapda.
   - **I. Laboratórium:** n- és R-csúszka – oldal, beírt kör sugara, kerület, terület, π-közelítés.
   - **II. Laboratórium:** r- és α-csúszka – körív, körcikk, húr, AOB háromszög, körszelet élőben.
3. **`TrigRegularPolygonsMatcher.tsx`**: 3 szint × 8 pár (képletek; szabályos sokszögek adatai; körív/körcikk/körszelet feladatok).
4. **`TrigRegularPolygonsSorter.tsx`**: 3 szint × 3 kategória × 9 elem (körív / körcikk / körszelet; sin / cos / tg az elemi háromszögben; igaz / hamis / adatfüggő).
5. **`TrigRegularPolygonsQuiz.tsx`**: 30 kérdés 3 szinten, 3 puskakártyával (progress id: `g11-trig-szabalyos-sokszogek-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic1TrigRegularPolygons.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
