# 2. Két vektor különbsége (67. lecke, 216–219. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 216–219. oldal) alapján kidolgozott oktatási modul. A diákzónában a VI. Koordinátageometria fejezet 2. leckéje.

---

## 🎯 Tananyag Áttekintés

A lecke a 66. lecke oldalszeles leszállási példáját fordítja meg: hogyan válassza meg a pilóta a levegőhöz viszonyított →v sebességet, ha a földhöz képest az előírt →e sebességgel kell haladnia, miközben →s sebességű oldalszél fúj? Mivel →e = →v + →s, a megoldás →v = →e + (−→s) = →e − →s – ebből születik a különbségvektor fogalma.

---

## 📐 Fő Fogalmak és Szabályok

- **Definíció:** ha →c = →a + →b, akkor →a a →c és →b különbségvektora: →a = →c − →b. A művelet neve kivonás.
- **Szerkesztés:** →b és →c közös kezdőpontból; →c − →b a kivonandó (→b) végpontjából a kisebbítendő (→c) végpontjába mutat (párhuzamos vektorokra is).
- **Megjegyzés:** →b + (→c − →b) = →c és →c − →b = →c + (−→b).
- **Paralelogramma (2. kidolgozott feladat):** a közös pontból induló oldalvektorokkal az átlók →e = →a + →b és →f = →a − →b.
- **3. kidolgozott feladat:** −(→a − →b) = →b − →a – a kivonás nem felcserélhető.
- **Ráadás – változás:** változás = végállapot − kezdőállapot; az elmozdulásvektor →AB = →b − →a (helyvektorokkal).

### Tankönyvi feladatok (ellenőrzött eredmények)
- **3. a)** Téglalap, AB = 6 cm, AD = 2,5 cm: |→BA + →BC| = |→BD| = 6,5 cm, |→BA − →BC| = |→CA| = 6,5 cm.
- **3. b)** Rombusz, |→BA + →BC| = 8 cm, |→BA − →BC| = 6 cm ⇒ oldal 5 cm, |→AB + →DC| = 10 cm.
- **4.** →a − →b = −→b + →a; →a − →b + →c = →a + →c − →b; →a − (→b + →c) = →a − →b − →c.
- **5.** Konvex deltoid (AC szimmetriaátló): mind a hat állítás (I–VI) igaz; pl. →AB − →CB = →AC, →AB + →BC ⊥ →CD + →BC (= →AC ⊥ →BD), →AB − →CB + →CA = →0.
- **HF 2.** a) →0; b) −→a; c) →a.
- **HF 3.** a) |→u + →v| = |→u − →v| ⟺ →u ⊥ →v (téglalap); b) (→u + →v) ⊥ (→u − →v) ⟺ |→u| = |→v| (rombusz).
- **Ráadás C2.** 12 km északnyugatra, majd 12 km északkeletre ⇒ elmozdulás észak felé, 12√2 ≈ 16,97 km.

> **⚠️ CSAPDA:** közös kezdőpontnál →a − →b nem az →a végpontjából mutat →b végpontjába – az a →b − →a, a helyes eredmény ellentettje.

Jelölés a felületen: „→a”, „→AB”, nullvektor „→0” (a kombinált nyíl, „a⃗”, több gyakori betűtípusban nem jelenik meg). Az SVG-ábrákon a betűk fölé rajzolt nyíl kerül. A tankönyvi ábrás feladatok (1., 2., HF 1., képrejtvény) ábrái a szövegből nem voltak kiolvashatók, ezért nem szerepelnek.

---

## 💻 Elkészített Komponensek

1. **`VectorSubtractionFigures.tsx`**:
   - `PilotCompensationSvg`: →v = →e − →s a leszállópálya felett.
   - `DifferenceConstructionSvg`: a →c − →b szerkesztése közös kezdőpontból.
   - `ParallelogramDiagonalsSvg`: →e = →a + →b és →f = →a − →b átlók.
   - `OppositeDifferenceSvg`: →a − →b és →b − →a ellentettek.
   - `DisplacementChangeSvg`: elmozdulás helyvektorokkal, →AB = →b − →a.
   - `KiteVectorsSvg`: az 5. feladat deltoidja oldalvektorokkal.
   - Segédkomponensek: `VectorSubtractionGrid`, `VectorSubtractionArrow`, `VectorSubtractionLabel`.
2. **`VectorSubtractionTheory.tsx`**: kidolgozott feladatok, definíció és szerkesztés, paralelogramma átlói, tankönyvi és házi feladatok, ráadás (változás), csapda.
   - **I. Laboratórium:** húzható →a és →b közös kezdőpontból; váltás →a − →b / →b − →a között, összegátló, téglalap- és rombuszfelismerés.
   - **II. Laboratórium:** a pilóta rátartása – földsebesség, szélsebesség és szélirány csúszkával; élő |→v| és a gép orrának elfordulása.
3. **`VectorSubtractionMatcher.tsx`**: 3 szint × 8 pár (szabályok, különbségek pontokkal, egyszerűsítés és hosszak).
4. **`VectorSubtractionSorter.tsx`**: 3 szint × 3 kategória × 9 elem (→a − →b / →b − →a / →a + →b; különbségek a paralelogrammában; mikor igaz).
5. **`VectorSubtractionQuiz.tsx`**: 30 kérdés 3 szinten, 16 ábrával, 3 puskakártyával (progress id: `g11-geo-vektor-kulonbseg-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic6VectorSubtraction.test.tsx` fájlban található, a 4 komponenst, a kérdésszámot és mind a 6 SVG ábrát ellenőrzi.
