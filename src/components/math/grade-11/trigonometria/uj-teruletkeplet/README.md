# 6. Új területképlet (6. lecke, 20–21. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 20–21. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A lecke egy gyakorlati becslésből indul: mennyi víz van egy víztározóban, amelynek alakja a térképen egy 1,2 km és 1,3 km oldalú, 41°-os hegyesszögű paralelogrammával közelíthető, átlagos mélysége 2,5 m? A paralelogramma magassága egy derékszögű háromszög befogója: $m = 1{,}2 \cdot \sin 41°$, így a terület $T = 1{,}3 \cdot 1{,}2 \cdot \sin 41° \approx 1$ km² $= 10^6$ m², a víz térfogata kb. $2{,}5 \cdot 10^6$ m³ (25 millió hektoliter). A hosszúságegységek egyeztetésére figyelni kell!

---

## 📐 Elmélet

- **Paralelogramma:** ha két szomszédos oldala $a$ és $b$, az általuk közrefogott hegyesszög $\gamma$, akkor $m_a = b \cdot \sin\gamma$ és
  $$T = a \cdot m_a = a \cdot b \cdot \sin\gamma$$
- **Háromszög:** ha két oldala $a$ és $b$, az általuk közrefogott hegyesszög $\gamma$, akkor $m_a = b \cdot \sin\gamma$ és
  $$T = \frac{a \cdot m_a}{2} = \frac{a \cdot b \cdot \sin\gamma}{2}$$
- **Példa:** $a = 4{,}5$ cm, $b = 2{,}8$ cm, $\gamma = 73°$ ⇒ $T = (4{,}5 \cdot 2{,}8 \cdot \sin 73°) : 2 \approx 6{,}0$ cm².
- A lecke a képletet hegyesszögre mondja ki; a tompaszög szinusza a 7. leckében következik.

### Tankönyvi feladatok
- **1. b)** ±1%-os hosszmérési hiba ⇒ a valódi és mért alaprajz hasonló, a területarány a hasonlósági arány négyzete: $1{,}01^2 = 1{,}0201$, $0{,}99^2 = 0{,}9801$ ⇒ kb. **±2%**.
- **2.** $r = 18$ cm, $AB = 30$ cm: $\sin(AKB\angle/2) = 15/18$ ⇒ $AKB\angle \approx 112{,}9°$; ívek ≈ 35,5 cm és ≈ 77,6 cm; körcikkek ≈ 319,2 cm² és ≈ 698,7 cm²; az AKB háromszög területe (a húr távolsága $\sqrt{99} \approx 9{,}95$ cm) ≈ 149,2 cm².
- **3. a)** $T = 45$ cm², oldalak 8 cm és 7,5 cm ⇒ $\sin\gamma = 0{,}75$ ⇒ $\gamma \approx 48{,}6°$.
- **3. b)** $\gamma = 40°$, $T = 0{,}3214$ m², $K = 3$ m ⇒ $ab \approx 0{,}5$, $a + b = 1{,}5$ ⇒ az oldalak **1 m és 0,5 m**.
- **HF 1. a)** Deltoid 7 cm és 14 cm oldallal, köztük 82,2° ⇒ $T = 7 \cdot 14 \cdot \sin 82{,}2° \approx 97{,}1$ cm².
- **HF 1. b)** Deltoid 7 cm, 14 cm, egyik átló 7 cm ⇒ szögek 60°, ≈ 135,5°, ≈ 29,0°, ≈ 135,5°; másik átló ≈ 19,6 cm; $T \approx 68{,}7$ cm².
- **HF 2.** 132,6°-os középponti szöghöz 12 cm-es húr ⇒ $r = 6 : \sin 66{,}3° \approx 6{,}55$ cm, a húr távolsága ≈ 2,63 cm, a háromszög területe ≈ 15,8 cm².
- (Az 1. a) szoba-alaprajz, a 4. Pentagon-becslés és a HF 3. hatszög feladat ábrája a szövegből nem rekonstruálható pontosan, ezért konkrét számokkal nem szerepelnek a modulban.)

> **⚠️ CSAPDA:** A képletben mindig a két ismert oldal által **közrefogott** szög szerepel. Háromszögnél 2-vel osztunk, paralelogrammánál nem. Mértékegységek: 1 km² = 10⁶ m², 1 m³ = 10 hl.

---

## 💻 Elkészített Komponensek

1. **`TrigAreaFormulaFigures.tsx`**:
   - `ReservoirParallelogramSvg`: a víztározó paralelogrammás közelítése (1,3 km, 1,2 km, 41°, Markaz, Üdülőtelep).
   - `ParallelogramAreaSvg`: $m_a = b \cdot \sin\gamma$, $T = ab\sin\gamma$.
   - `TriangleAreaSvg`: $T = ab\sin\gamma/2$ a tankönyvi példával (4,5 cm, 2,8 cm, 73°).
   - `ChordSectorSvg`: 18 cm sugarú kör 30 cm-es húrral, körcikk és AKB háromszög.
   - `KiteAreaSvg`: deltoid két egybevágó háromszögre bontva (7 cm, 14 cm, 82,2°).
   - Minden derékszög magyar jelöléssel (negyedkörív ponttal) szerepel.
2. **`TrigAreaFormulaTheory.tsx`**: víztározós bevezető, elmélet, kidolgozott feladatok (szög a területből, oldalak a területből és kerületből, húr-körcikk, mérési hiba), házi feladatok, csapda.
   - **I. Laboratórium:** háromszög / paralelogramma váltó, a, b, γ csúszkák, élő magasság és terület.
   - **II. Laboratórium:** víztározó-becslő – km² → m² → m³ → hl átváltással.
3. **`TrigAreaFormulaMatcher.tsx`**: 3 szint × 8 pár (képletek, területszámítás, visszafelé számolás).
4. **`TrigAreaFormulaSorter.tsx`**: 3 szint × 3 kategória × 9 elem (melyik képlet; nő / csökken / nem változik; igaz / hamis / adatfüggő).
5. **`TrigAreaFormulaQuiz.tsx`**: 30 kérdés 3 szinten, 3 puskakártyával.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic1TrigAreaFormula.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
