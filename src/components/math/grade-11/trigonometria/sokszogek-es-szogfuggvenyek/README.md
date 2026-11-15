# 12. Sokszögek és szögfüggvények (12. lecke, 36–37. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 36–37. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A lecke **csoportmunkára** épül: sokszögeket (egyenlő szárú háromszög felosztását, trapéz alakú vasúti töltést, térképen kijelölt városháromszöget) bontunk olyan háromszögekre, amelyekben a szögfüggvények, a szinusztétel, a koszinusztétel és a trigonometrikus területképlet alkalmazható. Az elméleti rész a **tompaszög tangensét** definiálja, a ráadás pedig a helymeghatározás (háromszögelés, GPS) alapjait mutatja be.

---

## 📐 Elmélet: a tompaszög tangense

- Hegyesszögre tg α = sin α / cos α – ezt a képletet használjuk a kiterjesztéshez.
- Derékszögre nem vezet eredményre, mert cos 90° = 0: **a 90°-nak nincs tangense**.
- **Definíció:** az α tompaszög tangense tg α = sin α / cos α. Tompaszögre sin α > 0, cos α < 0, így **tg α < 0**, és tg α = −tg(180° − α).
- Példák: tg 120° = −√3; tg 135° = −1; tg 150° = −√3/3; tg 100° ≈ −5,671.

### Csoportmunka-feladatok (ellenőrzött eredmények)
- **1.** Egyenlő szárú háromszög, 42°-os szárszög, 120 m-es alap 3 × 40 m-re osztva: alapon fekvő szögek 69°, szárak ≈ 167,4 m (magasság ≈ 156,3 m); α = γ (szimmetria); β ≈ 14,6°, α = γ ≈ 13,7°.
- **2.** Vasúti töltés (korona 4,5 m, rézsűk 3,8 m és 4,2 m, alap 10 m) = paralelogramma + 3,8–4,2–5,5 m-es háromszög: emelkedési szögek ≈ 49,7° (meredekebb) és ≈ 43,6° (lankásabb), magasság ≈ 2,9 m.
- **3.** Darus feladat (15 m-es kar, 12 m-es, 42°-os rézsű) – az ábra adatai a szövegből nem egyértelműek, a modul nem dolgozza fel.
- **4.** Pécs–Budapest–Győr (185, 170, 108 km): α (Pécs) ≈ 35,1°, β (Budapest) ≈ 80,1°, γ (Győr) ≈ 64,8°; terület ≈ 9042 km², Magyarország területének ≈ 9,7%-a.

### Házi feladatok
- **HF 1.** 48 cm-es oldal, 39 cm-es súlyvonal, 48° ⇒ T ≈ 695,6 cm²; további oldalak ≈ 29,1 cm és ≈ 57,9 cm, a legnagyobb szög ≈ 94,1°.
- **HF 2.** T = 60 cm², oldalak 15 és 16 cm ⇒ γ = 30° (harmadik oldal ≈ 8,08 cm) vagy γ = 150° (≈ 29,94 cm).
- **HF 3.** Kaposvár–Miskolc ≈ 307,7 km (célszerűen ≈ 310 km), Kaposvár–Tatabánya ≈ 155 km.

### Ráadás – helymeghatározás
AB = 200 m, BC = 300 m, AC = 250 m; P-t B-ből 40°-ban, C-ből 60°-ban látjuk: d₁ = 300 · sin 60° / sin 80° ≈ 264 m, d₂ = 300 · sin 40° / sin 80° ≈ 196 m.

> **⚠️ CSAPDA:** sin γ = 0,5-ből γ = 30° **vagy** 150° – a tompaszöges esetet sem szabad elhagyni (HF 2.). A tangensnél az előjel árulkodó: tg α < 0 ⇒ tompaszög; tg 90° nem létezik.

---

## 💻 Elkészített Komponensek

1. **`PolygonTrigFigures.tsx`**:
   - `IsoscelesSplitSvg`: a 42°-os szárszög felosztása (méretarányos, derékszög-jelölés: negyedkörív ponttal).
   - `EmbankmentSvg`: a vasúti töltés trapéza paralelogrammára és háromszögre bontva.
   - `HungaryTriangleSvg`: a Pécs–Budapest–Győr háromszög szögei és területe.
   - `ObtuseTangentSvg`: a tompaszög tangense az egységkörön (tg 135° = −1).
   - `TriangulationSvg`: előremetszés a ráadás adataival.
2. **`PolygonTrigTheory.tsx`**: csoportmunka-feladatok kidolgozva, a tompaszög tangense (definíció, értéktáblázat), térképes feladat, házi feladatok, ráadás, csapda.
   - **I. Laboratórium:** paralelogramma – oldalak és szög csúszkával, élő terület (a·b·sin α), átlók (koszinusztétel), a két szomszédos szög tangense.
   - **II. Laboratórium:** trapéz (töltés) felbontása – korona, alap, rézsűk megadásával élő emelkedési szögek, magasság, terület, létezés-ellenőrzés.
3. **`PolygonTrigMatcher.tsx`**: 3 szint × 8 pár (tangensértékek, felbontott sokszögek, térkép/terep/terület).
4. **`PolygonTrigSorter.tsx`**: 3 szint × 3 kategória (tangens előjele; koszinusztétel / szinusztétel / területképlet; igaz / hamis / adatfüggő).
5. **`PolygonTrigQuiz.tsx`**: 30 kérdés 3 szinten, 3 puskakártyával (progress id: `g11-trig-sokszogek-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic1PolygonTrig.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
