# 7. Valószínűség – ismétlés (tankönyv 58. lecke, 180–181. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 180–181. oldal) alapján kidolgozott oktatási modul. A diákzónában az V. fejezet (Statisztika és valószínűségszámítás) 7. leckéje.

---

## 🎯 Tananyag Áttekintés

**Bevezető (útvesztő):** szabályos dobókockával dobunk – osztója 6-nak: 4/6; prímszám: 3/6; relatív prím a 30-hoz: 1/6; osztható 5-tel: 1/6; osztója 5!-nak: 6/6; négyzetszám: 2/6; osztója 5-nek: 2/6; faktoriálisa páros: 5/6.

---

## 📐 Elmélet

- Ha az elemi események egyformán valószínűek: **P(A) = kedvező elemi események száma / összes elemi esemény száma**.
- Sokszor ismételt kísérletnél a relatív gyakoriság a valószínűséghez közeli érték.
- 0 ≤ P(A) ≤ 1; komplementer esemény: P(A) = 1 − P(nem A).
- Egyforma tárgyakat (golyók, kockák, érmék) gondolatban megkülönböztetünk; két kockánál az elemi események 6 × 6-os táblázatban sorolhatók fel.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1. Magnus Carlsen:** világossal 384 / 303 / 78 (765), sötéttel 250 / 419 / 65 (734), összesen 1499 játszma. a) 765/1499 ≈ 0,510; b) 634/1499 ≈ 0,423; c) az ellenfél sötéttel nyert = Carlsen világossal kikapott: 78/1499 ≈ 0,052.
- **2. Két kocka, szorzat:** nagyobb, mint 10: 17/36; négyzetszám: 8/36 = 2/9; páros: 27/36 = 3/4; prímszám: 6/36 = 1/6. c) 100 dobásos kísérlet (a II. laborban szimulálható).
- **HF 2.:** 60 osztói (12 db), 56 osztói (8 db), közös: 1, 2, 4. a) 3/12 = 1/4; b) 3/8; c) 3/17 (A ∪ B 17 elemű).
- **HF 3.:** két fiú és két lány négy helyen: P(a lányok nem ülnek egymás mellett) = 12/24 = 1/2.

> **⚠️ CSAPDA:** a rendezetlen számpárok nem egyformán valószínűek – két kockánál mindig a 36 rendezett párral számolj (pl. P(egy 1-es és egy 2-es) = 2/36, nem 1/21).

> Megjegyzés: a HF 1. (repülőjáratok gráfja) éleit a forrásszöveg nem tartalmazza olvasható formában, ezért a modul csak a megoldás módszerét (fokszám / élek száma) közli.

---

## 💻 Elkészített Komponensek

1. **`ProbabilityReviewFigures.tsx`**:
   - `ProbabilityReviewDieEventsSvg`: kockalapok, a kedvező elemi események kiemelve (bevezető).
   - `ProbabilityReviewCarlsenPiesSvg`: Carlsen játszmái világossal és sötéttel (két kördiagram).
   - `ProbabilityReviewProductTableSvg`: két kocka szorzatainak 6 × 6-os táblázata.
   - `ProbabilityReviewDivisorsVennSvg`: 60 és 56 pozitív osztói Venn-diagramon.
   - `ProbabilityReviewSeatsSvg`: két fiú és két lány helyének 6 mintázata.
   - segédek: `ProbabilityReviewDieFace`, `ProbabilityReviewCountPie`.
2. **`ProbabilityReviewTheory.tsx`**: bevezető táblázat, elmélet, Carlsen-feladat, szorzattáblázat, házi feladatok, csapda.
   - **I. Laboratórium:** kocka- és érmeszimulátor (érme / kocka / két kocka összege; +1, +10, +100, +1000 dobás) – relatív gyakoriság oszlopai a valószínűség vonalaival.
   - **II. Laboratórium:** 6 × 6-os táblázat (összeg / szorzat / nagyobbik dobás; páros, prím, négyzetszám, > k, = k) – kiemelt kedvező cellák, P egyszerűsítve, 100 dobásos szimuláció.
3. **`ProbabilityReviewMatcher.tsx`**: 3 szint × 8 pár (egy kocka; két kocka; tankönyvi feladatok).
4. **`ProbabilityReviewSorter.tsx`**: 3 szint × 3 kategória × 9 elem (biztos / lehetetlen / véletlen; P < 1/2, = 1/2, > 1/2; két kocka: 1/6, 1/9, 1/4).
5. **`ProbabilityReviewQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), kérdéstípus-címkékkel, 19 ábrás kérdéssel (kockák, érmék, kördiagram, 6 × 6-os rács, Venn-diagram), 3 puskakártyával (progress id: `g11-stat-valoszinuseg-ismetles-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic5ProbabilityReview.test.tsx` fájlban található, a 4 komponenst (a szimulátor egy kattintásával) és mind az 5 SVG ábrát ellenőrzi.
