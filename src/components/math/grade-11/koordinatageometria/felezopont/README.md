# 7. Felezőpont (71. lecke, 232–233. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 232–233. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a VI. Koordinátageometria fejezet **7.** leckéje.

---

## 🎯 Tananyag Áttekintés

A lecke egy mozgólépcsővel indul: a lépcső az utcaszint alatti A(0; −2) pontból 30 s alatt egyenletesen viszi fel az utasokat a B(12; 4) pontba. 15 s után az utas az AB szakasz felezőpontjában, F(6; 1)-ben van: 6 métert haladt előre, és 1 méterrel van az utcaszint felett.

### Kidolgozott feladat
A(−4; 3), B(10; 7). Az →a és →b helyvektorokkal megrajzolt AOBP paralelogramma átlói felezik egymást, ezért
$$\vec f = \tfrac12\,\overrightarrow{OP} = \tfrac12(\vec a + \vec b) = \tfrac12(6; 10) = (3; 5) \;\Rightarrow\; F(3; 5).$$

---

## 📐 Fő Tétel

- **Felezőpont koordinátái:** ha A(a₁; a₂) és B(b₁; b₂), akkor
  $$F\left(\frac{a_1 + b_1}{2};\ \frac{a_2 + b_2}{2}\right).$$
- Visszafelé: B = 2F − A (meghosszabbítás, tükrözés pontra, paralelogramma/négyzet szemközti csúcsa a középpontból).
- Kiegészítés (a feladatokból): negyedelőpontok, nagyítás/kicsinyítés egy pontból (X′ = O + λ · →OX), a háromszög súlypontja S = (A + B + C)/3.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** P(−4; 16), Q(20; −2): F(8; 7), a Q-hoz legközelebbi negyedelőpont N(14; 2,5), FN = 7,5.
- **2.** A(−2; 5), B(−3; −1), meghosszabbítás B-n túl: C(−4; −7).
- **3.** P(7; −4), Q(−1; 2): F(3; −1); tükörképek P-re (11; −7), Q-ra (−5; 5).
- **4.** Négyzet, K(7; −8), A(−3; 16): C(17; −32), átló 52, terület 1352, kerület 104√2 ≈ 147,08.
- **HF 1.** A(−10; −7), B(10; 3), C(10; 13): oldalfelező pontok (0; −2), (10; 8), (0; 3); középvonalak √125 ≈ 11,18; 5; √200 ≈ 14,14; terület 100.
- **HF 2.** A(−5; −6), B(16; 0), C(10; 6), kicsinyítés A-ból: ½ ⇒ B′(5,5; −3), C′(2,5; 0); ¾ ⇒ B′(10,75; −1,5), C′(6,25; 3).
- **HF 3.** A(−6; 2), B(2; 0), C(1; 7): F(1,5; 3,5); AF negyedelőpontjai (−4,125; 2,375), (−2,25; 2,75), (−0,375; 3,125).
- **HF 4.** Nagyítás P(1; 0)-ból 2-szeresére: A′(−7; 16), B′(3; −10), C′(13; 2).
- **Ráadás.** Oldalfelező pontok P(4; −4) (AC), Q(−1; −3) (AB), R(−2; −1) (BC) ⇒ A(5; −6), B(−7; 0), C(3; −2).

> **⚠️ CSAPDA:** a felezőpontnál a koordinátákat összeadjuk és felezzük. A (b₁ − a₁)/2 stb. az ½ →AB vektor koordinátái, nem a felezőpont (A(−4; 3), B(10; 7) esetén F(7; 2) hibás, F(3; 5) helyes).

---

## 💻 Elkészített Komponensek

1. **`MidpointFigures.tsx`**:
   - `MidpointPlane`: közös koordináta-rendszer komponens (rács, tengelyek, pontok, szakaszok, vektorok, egyenesek, derékszög-jelölés negyedkörívvel és ponttal) – a 8. és 9. lecke is használja.
   - `EscalatorMidpointSvg`, `MidpointParallelogramSvg`, `MidpointFormulaSvg`, `QuarterPointsSvg`, `CentroidSvg`, `VerticesFromMidpointsSvg`.
2. **`MidpointTheory.tsx`**: bevezető, kidolgozott feladat helyvektorokkal, elmélet, összefoglaló táblázat (negyedelőpont, meghosszabbítás, tükrözés, nagyítás, súlypont), tankönyvi feladatok és házi feladatok eredményei, csapda.
   - **I. Laboratórium:** osztópont csúszkával (A, B koordinátái és t = AP/AB), tankönyvi előbeállítások, meghosszabbítás/tükrözés t = 2-nél.
   - **II. Laboratórium:** háromszög oldalfelező pontjai, középvonalai, súlypontja és területe; fordított mód: csúcsok az oldalfelező pontokból (Ráadás).
3. **`MidpointMatcher.tsx`**: 3 szint × 8 pár (képletek, felezőpontok, visszafelé / súlypont / paralelogramma).
4. **`MidpointSorter.tsx`**: 3 szint × 3 kategória × 9 elem (melyik képlet; hol van a pont az AB-hez képest; igaz / hamis / függ).
5. **`MidpointQuiz.tsx`**: 30 kérdés 3 szinten (17 kérdés kis koordinátarendszer-ábrával), 3 puskakártyával (progress id: `g11-geo-felezopont-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic6Midpoint.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
