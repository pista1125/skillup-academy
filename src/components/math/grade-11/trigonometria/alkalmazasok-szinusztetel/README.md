# 9. Alkalmazások – szinusztétel (9. lecke, 28–31. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 28–31. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A lecke a szinusztétel gyakorlati alkalmazásait mutatja be, és részletesen vizsgálja azt az esetet, amikor **két oldal és az egyikkel szemközti szög** adott – ekkor 0, 1 vagy 2 háromszög tartozhat az adatokhoz.

**Bevezető (repülőgép):** a gép a földi jeladót 27°-os, majd 3000 m repülés után 57°-os depressziószög (lehajlási szög) alatt látja. Az R₁R₂J háromszög szögei 27°, 123°, 30°:
- d = 3000 · sin 123° / sin 30° ≈ **5030 m**, e = 3000 · sin 27° / sin 30° ≈ **2720 m**;
- a repülési magasság az R₁PJ derékszögű háromszögből (27°-os váltószög): h = d · sin 27° ≈ **2280 m**.

---

## 📐 Két oldal és az egyikkel szemközti szög

$$\sin\beta = \frac{b\,\sin\alpha}{a}$$

- **sin β > 1** ⇒ nincs háromszög;
- **sin β = 1** ⇒ β = 90°, egy (derékszögű) háromszög;
- **sin β < 1** ⇒ β₁ (hegyesszög) és β₂ = 180° − β₁ (tompaszög) a jelölt; mindkettőnél ellenőrizni kell, hogy **α + β < 180°**.

### Kidolgozott feladatok
- **1.** a = 4,5 cm, b = 6 cm, α = 45° ⇒ sin β ≈ 0,9428 ⇒ β ≈ 70,53° (γ ≈ 64,47°, hegyesszögű) **vagy** β ≈ 109,47° (γ ≈ 25,53°, tompaszögű). Két nem egybevágó háromszög.
- **2.** b = 7 cm, α = 68°: a) a = 2 cm ⇒ sin β ≈ 3,24, nincs; b) a = 6,5 cm ⇒ sin β ≈ 0,9985, két megoldás (68°, 86,9°, 25,1° és 68°, 93,1°, 18,9°); c) a = 8 cm ⇒ sin β ≈ 0,811, csak 54,2° jó (125,8° túl nagy), szögek 68°, 54,2°, 57,8°.

### Tankönyvi feladatok
- **1.** Hajó: 120 m, α ≈ 73°, β ≈ 52° ⇒ oldalak ≈ 115,4 m és ≈ 140,1 m, a hajó ≈ 110,4 m-re van a parttól.
- **3.** a) 6 / 4,5 / 45° ⇒ egy (β ≈ 32,0°, γ ≈ 103,0°); b) 5 / 10 / 30° ⇒ egy derékszögű (β = 90°, γ = 60°); c) 6 / 7,5 / 65° ⇒ nincs (sin β ≈ 1,133); d) 6 / 7,5 / 30° ⇒ kettő (38,7° / 111,3° vagy 141,3° / 8,7°).
- **4.** Hegy: AB = 223 m, α = 74°, β = 51° ⇒ BH = 223 · sin 74° / sin 55° ≈ 261,7 m; a BKH derékszögű háromszögből (11°) m ≈ 50 m.
- **HF 1.** Pisai torony: 4°-os dőlés dél felé, 77°-os napsugár, 9 m árnyék ⇒ szögek 77°, 94°, 9° ⇒ L ≈ 56 m.
- **HF 2.** Mars-szonda: 31 m-es, 25°-os lejtő, a peremre 22°-os radarsugár ⇒ szögek 65°, 112°, 3° ⇒ a radar ≈ 1,75 m magasan van a kráter aljától.
- **Ráadás:** szerkeszthetőség – a = 10 cm, β = 30°, b = 4 / 5 / 6 cm ⇒ sin α = 5/4 (nincs), 1 (α = 90°, egy), 5/6 (α ≈ 56,44° vagy ≈ 123,56°, kettő).
- A 2. (léggömb), 5. (biliárd) és HF 3. (táblázat) feladatot az ábra nélkül nem lehetett egyértelműen értelmezni, ezért nem dolgoztuk fel.

> **⚠️ CSAPDA:** A sin⁻¹ csak a hegyesszögű jelöltet adja – a tompaszögű 180° − β₁ jelöltet is meg kell vizsgálni, de csak akkor fogadható el, ha α + β < 180°. Ha az adott szög a nagyobb oldallal szemközti (a ≥ b), legfeljebb egy megoldás van.

---

## 💻 Elkészített Komponensek

1. **`SineLawApplicationsFigures.tsx`**:
   - `AirplaneBeaconSvg`: repülőgép és jeladó (27°, 123°, 57°, 30°, d, e, h), méretarányosan.
   - `AmbiguousCaseSvg`: a = 4,5 cm, b = 6 cm, α = 45° – a két háromszög a C körüli körrel.
   - `MountainHeightSvg`: a hegycsúcs magassága (ABH és BKH háromszög, vázlatos térbeli rajz).
   - `ConstructibilitySvg`: ráadás – 0, 1 (érintő) és 2 metszéspont a = 10 cm, β = 30° mellett.
   - `PisaTowerSvg`: a pisai ferde torony „kiegyenesítve”.
   - A derékszögeket negyedkörív + pont jelöli.
2. **`SineLawApplicationsTheory.tsx`**: bevezető, két kidolgozott feladat, 3. feladat táblázata, alkalmazások, ráadás, csapda.
   - **I. Laboratórium:** a, b, α csúszkák – szerkesztési rajz (C körüli kör ∩ alapegyenes), 0 / 1 / 2 megoldás élőben, tankönyvi előbeállításokkal.
   - **II. Laboratórium:** repülési magasság két depressziószögből és a repült távból.
3. **`SineLawApplicationsMatcher.tsx`**: 3 szint × 8 pár (esetek, alkalmazások, megoldások száma).
4. **`SineLawApplicationsSorter.tsx`**: 3 szint × 3 kategória (0 / 1 / 2 megoldás; szinusztétel / derékszögű / szögösszeg; igaz / hamis / adatfüggő).
5. **`SineLawApplicationsQuiz.tsx`**: 30 kérdés 3 szinten, 3 puskakártyával.

Progress ID-k: kvíz `g11-trig-alkalmazasok-quiz`, párosító `g11-trig-alkalmazasok-matcher`, csoportosító `g11-trig-alkalmazasok-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic1SineLawApplications.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
