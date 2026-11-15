# 1. Vektorok összeadása (66. lecke, 212–215. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 212–215. oldal) alapján kidolgozott oktatási modul. A diákzónában a VI. Koordinátageometria fejezet 1. leckéje.

---

## 🎯 Tananyag Áttekintés

A lecke a skalár- és vektormennyiségek megkülönböztetésével indul (távolság, tömeg, idő ↔ elmozdulás, sebesség, erő). Ezután felidézi a vektor fogalmát (párhuzamos, azonos irányú, azonos hosszúságú irányított szakaszok halmaza), az abszolút értéket, az ellentett vektort és a nullvektort, majd egy leszálló repülőgép oldalszeles példáján vezeti be két vektor összegét.

---

## 📐 Fő Fogalmak és Szabályok

- **Vektor:** iránya és abszolút értéke (hossza, |→v|) jellemzi; bármelyik reprezentáló irányított szakasz használható.
- **Ellentett vektor:** párhuzamos, egyenlő hosszú, ellentétes irányú; jele −→v, és −(−→v) = →v.
- **Összegvektor:** az a vektor, amely ugyanazt az eltolást hozza létre, mint az →a-val és →b-vel való eltolás egymásutánja.
  - **Összefűzés (háromszögmódszer):** az összeg az első vektor kezdőpontjából az utolsó végpontjába mutat (több és párhuzamos vektorra is): →AB + →BC = →AC.
  - **Paralelogrammamódszer:** közös kezdőpontból felvett, nem párhuzamos vektorok esetén az összeg a közös pontból induló átlóvektor.
- **Nullvektor (→0):** ellentett vektorok összege; hossza 0, iránya tetszőleges (minden vektorral párhuzamos, mindegyikre merőleges).
- Fizikában a vektorok összegének neve **eredő**.
- Tulajdonságok: →a + →b = →b + →a; ||→a| − |→b|| ≤ |→a + →b| ≤ |→a| + |→b|.

### Kidolgozott feladat
Oldalszél: a gép szélcsendben R-ből R₁-be jutna (→a), a szél →b-vel sodorja; a tényleges elmozdulás →c = →a + →b, a gép R₂-be kerülne.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** 2 cm-es ABCD négyzet: 12 csúcsból csúcsba mutató vektor; 8 vektor hossza egyenlő |→AB|-vel, →AB-vel párhuzamos →BA, →CD, →DC; |→AC| = 2√2 ≈ 2,83 cm (→CA, →BD, →DB is ilyen), →AC-vel párhuzamos →CA, merőleges →BD és →DB.
- **3.** Rácsvektorok hossza Pitagorasz-tétellel; →a + →b = →b + →a (a tankönyvi ábra rácsvektorai helyett saját, hasonló példák).
- **5. / HF 2.** Grafikonok eltolása: két eltolás egymásutánja = eltolás az összegvektorral (pl. x² → (x − 1)² + 4).
- **HF 3.** |→a| = 6 cm, |→b| = 2,5 cm: max 8,5 cm, min 3,5 cm, merőlegesen 6,5 cm.
- **HF 4.** Trapéz (AB = 6 cm, DC = 3 cm), K az átlók metszéspontja: →KA + →KB + →KC + →KD = ½(→KA + →KB), végpontja az AB felezőpontja.

> **⚠️ CSAPDA:** |→a + →b| általában nem |→a| + |→b| – merőleges 6 és 2,5 cm-es vektorok összege 6,5 cm, nem 8,5 cm.

Jelölés a felületen: a vektorokat „→a”, „→AB”, a nullvektort „→0” formában írjuk (a kombinált nyíl, „a⃗”, több gyakori betűtípusban nem jelenik meg). Az SVG-ábrákon a betűk fölé rajzolt nyíl kerül.

---

## 💻 Elkészített Komponensek

1. **`G11VectorAdditionFigures.tsx`**:
   - `VectorConceptSvg`: kezdőpont, végpont, egyenlő irányított szakaszok, ellentett vektor.
   - `CrosswindLandingSvg`: a leszálló repülőgép elmozdulása oldalszélben (R, R₁, R₂).
   - `ChainMethodSvg`: összefűzés két és négy vektorra.
   - `ParallelogramMethodSvg`: paralelogrammamódszer.
   - `GridSumCommutativeSvg`: →a + →b = →b + →a a rácson.
   - `TrapezoidVectorSumSvg`: HF 4. – a K-ból a trapéz csúcsaiba mutató vektorok összege.
   - Segédkomponensek: `G11VectorAdditionGrid`, `G11VectorAdditionArrow`, `G11VectorAdditionLabel`.
2. **`G11VectorAdditionTheory.tsx`**: bevezető, fogalmak, kidolgozott feladat, összeadási módszerek, tankönyvi feladatok, csapda.
   - **I. Laboratórium:** húzható vektorok a rácson, váltás összefűzés és paralelogrammamódszer között, élő hosszak és háromszög-egyenlőtlenség.
   - **II. Laboratórium:** |→a|, |→b| és a szög csúszkával – az összegvektor hossza koszinusztétellel (HF 3. előbeállítások).
3. **`G11VectorAdditionMatcher.tsx`**: 3 szint × 8 pár (fogalmak, összegek pontokkal, összegvektor hossza).
4. **`G11VectorAdditionSorter.tsx`**: 3 szint × 3 kategória × 9 elem (skalár / vektor / művelet; mi az összeg; |→a + →b| és |→a| + |→b|).
5. **`G11VectorAdditionQuiz.tsx`**: 30 kérdés 3 szinten, 18 ábrával, 3 puskakártyával (progress id: `g11-geo-vektor-osszeadas-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic6G11VectorAddition.test.tsx` fájlban található, a 4 komponenst, a kérdésszámot és mind a 6 SVG ábrát ellenőrzi.
