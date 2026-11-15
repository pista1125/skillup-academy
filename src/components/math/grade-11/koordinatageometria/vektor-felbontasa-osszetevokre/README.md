# 4. Ráadás – Vektor felbontása összetevőkre (Ráadás a 68. lecke után, 224–225. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 224–225. oldal) alapján kidolgozott oktatási modul. A diákzónában a VI. Koordinátageometria fejezet 4. szakasza.

---

## 🎯 Tananyag Áttekintés

A lecke egy kidolgozott feladatból indul: egy katamarán a mesterséges tó A partjáról indul, 1 másodperc alatt **12 m**-t mozdul el, az elmozdulásvektor (→r) a parttal **30°**-os szöget zár be; a túlpart **1,2 km**-re van.
Az →r vektort a partra merőleges (→rₘ) és a parttal párhuzamos (→rₚ) összetevőre bontjuk. A szabályos háromszög tulajdonságai alapján
$$|\vec r_m| = \frac{|\vec r|}{2} = 6\ \text{m}, \qquad |\vec r_p| = \frac{|\vec r|\sqrt3}{2} = 6\sqrt3 \approx 10{,}4\ \text{m}.$$
- **a)** Az átkelés ideje 1200 : 6 = **200 s**.
- **b)** A parton haladó kamerás autó sebessége 10,4 m/s ≈ **37,4 km/h**.

---

## 📐 Elmélet

- **Felbontási tétel:** legyen →a és →b a sík két nem párhuzamos vektora. Ekkor a sík tetszőleges →v vektora **egyértelműen** felbontható az →a és →b vektorokkal párhuzamos összetevőkre:
  $$\vec v = m\vec a + n\vec b, \qquad m, n \in \mathbb{R},\ \vec a \nparallel \vec b.$$
- **A szerkesztés lépései:** →a, →b, →v közös kezdőpontból; →a és →b egyenesének megrajzolása; →v végpontján át párhuzamosok a két egyenessel; a kapott paralelogramma oldalvektorai az összetevők (m · →a és n · →b), →v az átlója.
- →v ∥ →a esetén n = 0; a nullvektorra m = n = 0. Párhuzamos →a és →b irányába egy velük nem párhuzamos vektor nem bontható fel.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** Az ábra →v vektorának megszerkesztése →a és →b irányú összetevőkre (paralelogramma-módszer).
- **2.** Szabályos hatszögben: két párhuzamos vektor (pl. szemközti oldalak) irányába a velük nem párhuzamos vektor nem bontható fel; nem párhuzamos vektorpár esetén igen. (A modul saját példái: →a = →AB, →b = →AF esetén →AO = →a + →b, →AC = 2→a + →b, →AD = 2→a + 2→b.)
- **3.** →u = 2→b + 0→c (→b kétszerese), →v = 0→b + (−2)→c (→c-vel ellentétes, kétszeres hosszú), →w = 0→b + 0→c = →0.
- **4.** 20 N súlyú tárgy két fonálon (a fonalak a vízszintessel 60°-ot, illetve 30°-ot zárnak be, egymásra merőlegesek): az összetevők 20 · sin 60° ≈ **17,3 N** és 20 · sin 30° = **10 N**.
- **HF 1.** →p = 1/3 · →u + 1 · →v, →q = −1 · →u + 3/2 · →v, →s = →u − 2→v megrajzolása.

### Kitekintés (TERV.md: „Lejtőn ható erők”)
A lejtőn álló test súlyerejének felbontása: G∥ = G · sin α (lejtővel párhuzamos), G⊥ = G · cos α (lejtőre merőleges); pl. 50 N, 30° ⇒ 25 N és ≈ 43,3 N.

> **⚠️ CSAPDA:** A vektorok adódnak össze, nem a hosszaik: →r = →rₘ + →rₚ, de 12 ≠ 6 + 10,4. Merőleges összetevőknél |→r|² = |→rₘ|² + |→rₚ|² (36 + 108 = 144).

---

## 💻 Elkészített Komponensek

1. **`VectorDecompositionFigures.tsx`**:
   - `CatamaranLakeSvg`: a tó két partja, A, B, C pontok, 1,2 km, a 30°-os →r.
   - `CatamaranComponentsSvg`: →r = →rₘ + →rₚ, 30°/60°, derékszög-jelölés (negyedkörív ponttal).
   - `DecompositionStepsSvg`: a szerkesztés lépései (közös kezdőpont, egyenesek, paralelogramma, m · →a, n · →b).
   - `HangingWeightSvg`: 20 N súly felbontása a 60°-os és 30°-os fonallal párhuzamos összetevőkre.
   - `InclineForcesSvg`: lejtőn álló test, G∥ és G⊥.
   - `GridDecompositionSvg`: négyzetrácson →v = 2→a + →b.
   - Segédkomponensek: `VDGrid`, `VDArrow`, `VDLabel`, `VDRightAngle` (rácsos vektorábrák a laborokhoz és a kvízhez).
2. **`VectorDecompositionTheory.tsx`**: bevezető probléma, megoldás összetevőkkel, tétel, szerkesztés, esetek táblázata, 6 kidolgozott feladat, lejtős kitekintés, csapda.
   - **I. Laboratórium:** felbontás négyzetrácson – bázisválasztó, m és n csúszka, élő paralelogramma és koordináták, feladvány mód célvektorral.
   - **II. Laboratórium:** erők a lejtőn – α és G csúszka, G∥ = G sin α, G⊥ = G cos α, Pitagorasz-ellenőrzés.
3. **`VectorDecompositionMatcher.tsx`**: 3 szint × 8 pár (fogalmak; katamarán, fonál, lejtő; hatszög és négyzetrács).
4. **`VectorDecompositionSorter.tsx`**: 3 szint × 3 kategória × 9 elem (felbontható-e; együttható előjele; igaz / hamis / adatfüggő).
5. **`VectorDecompositionQuiz.tsx`**: 30 kérdés 3 szinten (20 ábrával), 3 puskakártyával (progress id: `g11-geo-vektor-felbontas-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic6VectorDecomposition.test.tsx` fájlban található: a 4 komponens, a kvízábrák és mind a 6 SVG ábra renderelését, valamint a kérdések számát és szintenkénti eloszlását ellenőrzi.
