# 10. A tompaszög és a derékszög koszinusza (10. lecke, 32–33. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 32–33. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A hegyesszögeknek van szinusza és koszinusza, a derékszög és a tompaszög szinuszát pedig már az előző leckékben értelmeztük. Ebben a leckében a **koszinuszt** is kiterjesztjük derékszögre és tompaszögre úgy, hogy illeszkedjen az eddigiekhez. Az eszköz az **egységkör**: az x tengely pozitív félegyenesével α szöget bezáró, 1 egység hosszú OP szakasz végpontja P(cos α; sin α).

---

## 📐 Fő Definíciók és Tulajdonságok

- **Hegyesszög az egységkörön (a):** sin α = y / 1, cos α = x / 1, így P(cos α; sin α).
- **Tompaszög (b):** a II. síknegyedbeli Q pontra Q(cos β; sin β). Az ábra alapján, ha β tompaszög:
  $$\cos\beta = -\cos(180^\circ - \beta), \qquad \sin\beta = \sin(180^\circ - \beta)$$
- **Derékszög (c):** M(0; 1) = M(cos 90°; sin 90°), tehát **cos 90° = 0**, sin 90° = 1.
- **(d)** A gondolatmenet tetszőleges forgásszögre folytatható (figyelve a forgás irányára).
- **Definíció:** Tompaszög koszinusza egyenlő kiegészítő szöge koszinuszának ellentettjével: cos α = −cos(180° − α). Derékszög koszinusza 0.
- Hegyes-, derék- és tompaszögre egyaránt: **sin² α + cos² α = 1**.
- **Előjelek:** hegyesszögre 0 < cos α < 1, tompaszögre −1 < cos β < 0; γ és δ kiegészítő szögekre sin γ = sin δ, cos γ = −cos δ.
- **Számológép:** a cos billentyű tompaszögre is működik; negatív értékre a cos⁻¹ tompaszöget ad.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** cos 92° ≈ −0,0349; cos 102° ≈ −0,2079; cos 112° ≈ −0,3746; cos 122° ≈ −0,5299; cos 132° ≈ −0,6691; cos 142° ≈ −0,7880; cos 152° ≈ −0,8829; cos 162° ≈ −0,9511; cos 172° ≈ −0,9903 (a szinuszok: 0,9994 … 0,1392).
- **2. a)** cos 0,5 és 0 ⇒ 60°, 90° ⇒ harmadik szög 30°: cos = √3/2, sin = 1/2. **b)** √3/2 és −0,5 ⇒ 30°, 120° ⇒ harmadik szög 30°.
- **3.** sin α = √2/2 ⇒ cos α = ±√2/2; sin α = 0,7355 ⇒ cos α ≈ ±0,6775.
- **4. a)** cos = −0,777 ⇒ szárszög ≈ 141,0°, alapszögek ≈ 19,5°. **b)** cos = 0,726 (≈ 43,4°) ⇒ alapszögként: szárszög ≈ 93,1°; szárszögként: alapszögek ≈ 68,3°. **c)** sin = 0,428 ⇒ ≈ 25,3° vagy ≈ 154,7° (három eset).
- **HF 1.** cos⁻¹ 0,7924 ≈ 37,6°; cos⁻¹(−0,5) = 120°; cos⁻¹ 0,5 = 60°; cos⁻¹(−√3/2) = 150°; cos⁻¹(−√2/2) = 135°.
- **HF 2.** Paralelogramma, cos = −0,591 ⇒ szögek ≈ 126,2° és ≈ 53,8°; koszinuszok ∓0,591, szinusz mindegyiknél ≈ 0,8067.
- **HF 3.** sin α = 0,5 ⇒ cos α = ±√3/2; √3/2 ⇒ ±1/2; 0,472 ⇒ ≈ ±0,8816.

> **⚠️ CSAPDA:** A kiegészítő szögek szinusza egyenlő, de a koszinuszuk ellentett: cos 120° = −cos 60° = −0,5, nem +0,5. Szinuszból a koszinusz csak előjel erejéig határozható meg: cos α = ±√(1 − sin² α).

---

## 💻 Elkészített Komponensek

1. **`ObtuseCosineFigures.tsx`**:
   - `UnitCircleAcuteSvg`: hegyesszög az egységkörön, P(cos α; sin α).
   - `UnitCircleObtuseSvg`: tompaszög a II. síknegyedben, tükrözés: cos β = −cos(180° − β).
   - `RightAngleCosineSvg`: M(0; 1), cos 90° = 0 (derékszög-jelölés: negyedkörív ponttal).
   - `CosineGraphSvg`: cos α értékei 0° és 180° között, előjelek.
   - `IsoscelesObtuseSvg`: a 4. a) feladat egyenlő szárú háromszöge (cos γ = −0,777).
2. **`ObtuseCosineTheory.tsx`**: egységkör-bevezető, definíciók, előjeltáblázat, az 1. feladat kitöltött táblázata, kidolgozott feladatok (2., 3., 4. a–b), csapda.
   - **I. Laboratórium:** egységkör 0°–180° csúszkával, a kiegészítő szög tükörpontjával és élő sin/cos értékekkel.
   - **II. Laboratórium:** szögkereső – cos-ból egyértelmű szög (cos⁻¹), sin-ből két eset (hegyes/tompa).
3. **`ObtuseCosineMatcher.tsx`**: 3 szint × 8 pár (nevezetes értékek, számológépes értékek, feladatok).
4. **`ObtuseCosineSorter.tsx`**: 3 szint × 3 kategória (előjel; hány szög tartozik hozzá; igaz / hamis / adatfüggő).
5. **`ObtuseCosineQuiz.tsx`**: 30 kérdés 3 szinten, 3 puskakártyával (progress id: `g11-trig-tompaszog-koszinusz-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic1ObtuseCosine.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
