# 24. Kombinatorika és gráfok (24. lecke, 72–73. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 72–73. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A lecke egy asztalitenisz-bajnoksággal indul: 8 versenyző, mindenki mindenkivel egyszer játszik. Ketten 7, ketten 6, négyen 5 lejátszott meccset mondanak. A válaszok összegében minden mérkőzés kétszer szerepel: 2 · 7 + 2 · 6 + 4 · 5 = 46 ⇒ **23** lejátszott mérkőzés. A teljes bajnokság C(8; 2) = 28 mérkőzés, így **5** van hátra.

---

## 📐 Elmélet

1. **Teljes gráf:** bármely két csúcsa között pontosan egy él fut. Az n pontú teljes gráf (n ∈ ℕ, n ≥ 2) éleinek száma
   $$\binom{n}{2} = \frac{n(n-1)}{2},$$
   minden csúcs fokszáma n − 1.
2. **A fokszámok összege (tétel):** a gráf fokszámainak összege egyenlő az élek számának kétszeresével.
   - Következmény: a fokszámok összege mindig **páros**.
   - Minden él kétszer számít bele – annál a két csúcsnál, amelyet összeköt.
   - Hurokélt tartalmazó gráfokra is teljesül.
3. **Kiválasztási feladatok gráfokban:** figyeld meg, a **csúcsok** vagy az **élek** közül választunk! Pl. 5 település, 6 út: 2 település C(5; 2) = 10-féleképpen, 2 út C(6; 2) = 15-féleképpen választható.

### Feladatok (ellenőrzött eredmények)
- **1. (2020)** Konferencia: A mindenkit ismer, B mindenkit E kivételével, C kettőt, D hármat ⇒ C ismerősei A és B, D ismerősei A, B, E ⇒ **E ismerősei: A és D**; koccintások: C(5; 2) = **10**.
- **2.** Létezik-e? a) 5 csúcs, 7 él, fokszámösszeg 12: **nem** (14 kellene); b) 1, 2, 2, 2, 3, 3: **nem** (13 páratlan); c) 7 csúcs, mind 3-as fokú: **nem** (21 páratlan); d) 7 csúcs, azonos fokszámok: **igen** (pl. hétszög; a közös fokszám páros).
- **3.** Teljes gráf: a) 36 él ⇒ **9 csúcs**; b) fokszámösszeg 156 ⇒ 78 él ⇒ **13 csúcs**.
- **4.** 8 cég szerződései (élek): 4 szerződés kiválasztása C(e; 4)-féleképpen, ahol e a szerződések száma; b) minden cég csak akkor érintett, ha a 4 él páronként diszjunkt (teljes párosítás).
- **5.** Eljegyzés: Tóth (5 fő) **10**, Lengyel (8 fő) **28**, a két család között 5 · 8 = **40** koccintás (összesen 78 = C(13; 2)).
- **HF 1. (2021)** Ismeretségek: Anna–Cili, Anna–Dénes, Anna–Edit, Anna–Feri, Cili–Feri, Bence–Edit (6 él) ⇒ nem ismerős párok: 15 − 6 = **9**; ismerős páros: **6**-féle.
- **HF 2. (2018)** 7 csapat, 9 lejátszott meccs ⇒ hátra van 21 − 9 = **12**; 3 meccs kiválasztása: C(9; 3) = **84**.
- **HF 3.** 120 élű teljes gráf ⇒ 16 csúcs; 4 csúcs: C(16; 4) = **1820**; 4 él: C(120; 4) = **8 214 570**.

> **⚠️ CSAPDA:** A válaszok (fokszámok) összege nem a mérkőzések száma, hanem annak kétszerese; és 8 · 7 = 56 minden párt kétszer számol. Helyesen: 46 / 2 = 23 lejátszott, 8 · 7 / 2 = 28 összes.

> **Megjegyzés:** A 4. feladat gráfja (8 cég szerződései) a szövegkivonatból nem rekonstruálható, ezért ott csak a módszert közöljük. Az asztalitenisz-ábra egy lehetséges állás.

---

## 💻 Elkészített Komponensek

1. **`CombinatoricsGraphsFigures.tsx`**:
   - `TableTennisGraphSvg`: 8 versenyző egy lehetséges állása (fokszámok 7, 7, 6, 6, 5, 5, 5, 5), szaggatottan az 5 hátralévő meccs.
   - `CompleteGraphsSvg`: 3, 4, 5, 6 pontú teljes gráfok (3, 6, 10, 15 él).
   - `ConferenceGraphSvg`: a konferencia 5 résztvevőjének ismeretségi gráfja.
   - `VertexOrEdgeChoiceSvg`: 5 település, 6 út – csúcsot vagy élt választunk?
   - `SocialNetworkSvg`: a HF 1. közösségi oldalának ismeretségi gráfja.
2. **`CombinatoricsGraphsTheory.tsx`**: kidolgozott feladat, teljes gráf és fokszámtétel, kiválasztás csúcsok/élek közül, feladatok és házi feladatok megoldásai, csapda.
   - **I. Laboratórium – A bajnokság állása:** 3–10 versenyző, a lejátszott meccsek száma +/− gombokkal; élő fokszámösszeg, lejátszott és hátralévő meccsek, páratlan összeg vagy lehetetlen állás jelzése; előbeállítások.
   - **II. Laboratórium – Teljes gráf:** n = 2–12 csúcsú teljes gráf rajza, élszám és fokszámok, k csúcs vs. k él kiválasztásának száma; visszafelé: élszámból a csúcsok száma (36 → 9, 78 → 13, 120 → 16, 40 → nincs).
3. **`CombinatoricsGraphsMatcher.tsx`**: 3 szint × 8 pár (teljes gráfok élszáma, tankönyvi eredmények, fogalmak és tételek).
4. **`CombinatoricsGraphsSorter.tsx`**: 3 szint × 3 kategória × 9 elem (csúcs / él / teljes gráf élszáma; van / páratlan összeg / más ok; igaz / hamis / gráftól függ).
5. **`CombinatoricsGraphsQuiz.tsx`**: 30 kérdés 3 szinten, kérdéstípus-címkékkel és 8 kérdésnél ábrával, 3 puskakártyával (progress id: `g11-comb-kombinatorika-grafok-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic2CombinatoricsGraphs.test.tsx` fájlban található: a 4 komponens és mind az 5 SVG ábra renderelése, valamint a bajnokság-labor ellenőrzése (23 lejátszott; páratlan összeg jelzése).
