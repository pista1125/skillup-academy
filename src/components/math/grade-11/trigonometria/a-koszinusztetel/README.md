# 11. A koszinusztétel (11. lecke, 34–35. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 34–35. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A lecke egy navigációs problémából indul: két kisrepülőgép Budapestről Bécs (233 km), illetve Zágráb (309 km) felé indul, útirányuk 60,9°-ot zár be. Mekkora a Bécs–Zágráb-távolság? A háromszöget a Bécsből induló magassággal két derékszögű háromszögre bontva, a Pitagorasz-tételt és az x = 233 · cos 60,9° összefüggést használva adódik:
$$c^2 = 233^2 + 309^2 - 2 \cdot 309 \cdot 233 \cdot \cos 60{,}9^\circ \;\Rightarrow\; c \approx 282\ \text{km}.$$

---

## 📐 Fő Tétel és Megjegyzések

- **Koszinusztétel:** ha a, b és c egy háromszög oldalainak hossza, γ pedig a c oldallal szemközti szög, akkor
  $$c^2 = a^2 + b^2 - 2ab\cos\gamma.$$
- Igaz **minden háromszögre** (γ hegyes-, derék- vagy tompaszög).
- γ = 90° esetén cos γ = 0, így a tétel a **Pitagorasz-tétel** – a koszinusztétel annak általánosítása.
- **Mikor használjuk?**
  - két oldal és a közbezárt szög ismert, a harmadik oldal a kérdés;
  - mindhárom oldal ismert, a szögek a kérdések – ekkor célszerű a **leghosszabb oldallal szemközti** szöget koszinusztétellel, egy további hegyesszöget szinusztétellel számolni.

### Kidolgozott feladat
Ha mindkét gép Bécsből szállna fel: 309² = 282² + 233² − 2 · 282 · 233 · cos α ⇒ cos α ≈ 0,292 ⇒ **α ≈ 73°**. (Nagy távolságoknál a Föld görbülete miatt a síkbeli számolás pontatlan.)

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** 53 mm és 71 mm: **a)** 60° ⇒ ≈ 63,9 mm; **b)** 147° ⇒ ≈ 119,0 mm.
- **2.** Legnagyobb szög: **a)** 5, 6, 7 cm ⇒ ≈ 78,5°; **b)** 27,2; 51,0; 57,8 mm ⇒ 90° (derékszögű); **c)** 13,2; 14,1; 24,5 m ⇒ ≈ 127,6°.
- **3.** Vízmolekula (98 pm, 104,5°) ⇒ a hidrogénatommagok távolsága ≈ 155 pm.
- **4.** Paralelogramma 24 cm, 32 cm, hosszabbik átló 42 cm ⇒ szögei ≈ 96,1° és ≈ 83,9°; rövidebbik átló ≈ 37,9 cm.
- **HF 1.** Vasúti megállók (12 km, 17 km, 52°) ⇒ ≈ 13,5 km.
- **HF 2. a)** 4,1; 5,3; 9,9 cm ⇒ **nincs ilyen háromszög** (4,1 + 5,3 < 9,9). **b)** 14; 33,6; 36,4 m ⇒ ≈ 22,6°, ≈ 67,4°, 90°.
- **HF 3.** Fahíd (4 m, 1,3 m, 115°) ⇒ ≈ 4,7 m.

> **⚠️ CSAPDA:** A tételben mindig a kiszámítandó oldallal szemközti (a két ismert oldal által közbezárt) szög szerepel, és tompaszögnél a koszinusz negatív – előjel nélkül számolva az 53–71 mm-es, 147°-os esetben 119,0 mm helyett hibásan ≈ 39,2 mm jönne ki.

---

## 💻 Elkészített Komponensek

1. **`CosineLawFigures.tsx`**:
   - `FlightMapSvg`: Budapest–Bécs–Zágráb háromszög (233 km, 309 km, 60,9°).
   - `CosineLawDerivationSvg`: felbontás magassággal két derékszögű háromszögre (x, 309 − x, h; derékszög-jelölés: negyedkörív ponttal).
   - `CosineLawGeneralSvg`: az általános háromszög és a c² = a² + b² − 2ab cos γ képlet.
   - `WaterMoleculeSvg`: a vízmolekula kötésszöge (104,5°) és a H–H távolság.
   - `ParallelogramDiagonalsSvg`: a 24 × 32 cm-es paralelogramma átlói (42 cm és ≈ 37,9 cm).
2. **`CosineLawTheory.tsx`**: bevezető probléma, levezetés, tétel és megjegyzések, döntési táblázat (szinusz- vagy koszinusztétel?), kidolgozott feladatok, házi feladatok eredményei, csapda.
   - **I. Laboratórium:** két oldal és a közbezárt szög csúszkával – élő harmadik oldal, a −2ab cos γ korrekciós tag és összevetés a Pitagorasz-tétellel.
   - **II. Laboratórium:** három oldalból a három szög, háromszög-egyenlőtlenség ellenőrzése, hegyes/derék/tompaszögű besorolás, tankönyvi előbeállítások.
3. **`CosineLawMatcher.tsx`**: 3 szint × 8 pár (a tétel és használata, harmadik oldal, szögek három oldalból).
4. **`CosineLawSorter.tsx`**: 3 szint × 3 kategória (melyik tétel; hegyes/derék/tompaszögű; igaz / hamis / adatfüggő).
5. **`CosineLawQuiz.tsx`**: 30 kérdés 3 szinten, 3 puskakártyával (progress id: `g11-trig-koszinusztetel-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic1CosineLaw.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
