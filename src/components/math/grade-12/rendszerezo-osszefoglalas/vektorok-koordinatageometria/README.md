# 9. Vektorok, koordinátageometria – rendszerező összefoglalás (158–165. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., Rendszerező összefoglalás, „Geometria” blokk – Vektorok, koordinátageometria rész és a geometriai blokk vegyes feladatai, 158–165. oldal) alapján kidolgozott érettségi ismétlő modul. A diákzónában ez a IV. Rendszerező összefoglalás fejezet **9.** leckéje.

---

## 🎯 Tananyag Áttekintés

Vektorok (irányított szakasz, abszolút érték, egyenlőség, nullvektor, összeg, különbség, számszoros, ellentett), bázisvektorok és koordináták, műveletek koordinátákkal; pont koordinátái, AB vektor, két pont távolsága, felezőpont; alakzat egyenlete, az egyenes (y = mx + b, x = c) és a kör egyenlete, párhuzamosság és merőlegesség, egyenesek metszéspontja.

---

## 📐 Fogalmak, tételek, módszerek (tankönyvi táblázat)

- **D – Irányított szakasz, vektor, abszolút érték, egyenlőség, nullvektor.**
- **D – Összeg** (eltolások egymásutánja), **különbség** (a = b + c ⇒ c = a − b), **számszoros** (λ · a; |λ|-szoros hossz, λ < 0: ellentétes irány), **ellentett** (−a).
- **T – Koordináták:** i(1; 0), j(0; 1); a = a₁i + a₂j; a + b, a − b, c · a koordinátánként; |a| = √(a₁² + a₂²).
- **D/T – Pont, AB vektor, távolság, felezőpont:** AB(b₁ − a₁; b₂ − a₂), AB = √((b₁ − a₁)² + (b₂ − a₂)²), F((a₁ + b₁)/2; (a₂ + b₂)/2).
- **D – Alakzat egyenlete. T – Egyenes:** y = mx + b (m meredekség, (0; b)), x = c. **T – Párhuzamos:** m₁ = m₂; **merőleges:** m₁ · m₂ = −1 (vagy tengelyekkel párhuzamosak).
- **T – Kör:** (x − u)² + (y − v)² = r². **M – Metszéspont:** egyenletrendszer.

### Kidolgozott feladatok
6. **A(−5; 3), B(−1; 0), C(4; 12):** AB = 5, BC = 13, AC = 9√2; β ≈ 75,75° (koszinusztétel); az A-ból induló súlyvonal: F(1,5; 6), y = 6/13 · x + 69/13.
7. **e: y = −3x + 6:** f ⊥ e, (−5; 0)-n át: y = x/3 + 5/3; e ∩ (y = 2x − 9) = B(3; −3); a tengelyekkel alkotott háromszög területe 6; Thalész-kör (x − 1)² + (y − 3)² = 10, az origó rajta van.

### Feladatok (a modulban feldolgozva)
- **C1–C12:** F(2; 3); 2a(−6; 16), a + b(4; 6), b − a(10; −10); (x + 5)² + (y − 4)² = 41; PQ = 13; (0,75; 0); k = −1/5; végpont / érinti / számszorosai / y tengelyére; P(0; −3) nincs a körön (8 ≠ 9); AH = b + d/3; C10: A, B, D igaz, C hamis; y = −2/3 · x + 2/3.
- **Q1, Q2, Q4, Q5:** a(5; 4) végpontja rajta van az e: y = 7/8 · x − 3/8 egyenesen (35/8 − 3/8 = 4); b(−1; 2) végpontja nincs a k: (x − 2)² + (y + 3)² = 36 körön (9 + 25 = 34 ≠ 36); |c − a| = √170 > |a + b| = √52; C-nél derékszög, területarány 4/(5π); merőleges egyenesek M(−3; 5), 4 négyzet, középpontok köre (x + 3)² + (y − 5)² = 18; túra: 17 km, Aladár (19; 32), Béla (42,875; 0) 36,125 km, Cecil: nincs ilyen pont.
- **D4, D6, D10, D12, R5, S1:** (−1; −2); √58, (0,5; 3,5); m = −4 és m = 1; (x + 12)² + (y − 5)² = 169; B(0; −4); négyzet beírt köre x² + y² = 6,5, köré írt köre x² + y² = 13.
- A geometriai blokk vegyes (D, R, S) feladatai közül a nem koordinátás feladatokat (pl. húrtrapéz, cölöp, érintőszakaszok) a modul nem dolgozza fel.

> **⚠️ CSAPDA:** a merőleges meredekség a negatív reciprok (−3 ↔ 1/3); a kör egyenletében előjelváltás van, a jobb oldalon r² áll.

> **Megjegyzés:** a mappa korábbi README-je nem létezett; a tartalom a tankönyvi blokk alapján készült (az R5 felezőmerőlegese a tankönyvi oldal szerint valóban y = x/3 + 1; a Q1 a) egyenese y = 7/8 · x − 3/8).

---

## 💻 Elkészített Komponensek

1. **`VectorsCoordinatesSummaryFigures.tsx`**:
   - `VectorOpsSvg`: a + b (paralelogramma-szabály) és a − b.
   - `VectorCoordsSvg`: a = 5i + 3j bázisvektorokkal.
   - `LineSlopeSvg`: y = 0,5x + 1 meredekségi háromszöggel, x = c egyenes.
   - `TriangleMedianSvg`: 6. kidolgozott feladat (ABC háromszög, súlyvonal).
   - `LinesThalesSvg`: 7. kidolgozott feladat (e, f, g egyenesek, Thalész-kör).
   - `CircleEquationSvg`: a kör egyenletének levezetése Pitagorasszal.
2. **`VectorsCoordinatesSummaryTheory.tsx`**: D/T/M táblázatok, 2 kidolgozott feladat, a feladatsor eredményei, csapda.
   - **I. Laboratórium:** vektorösszeg, -különbség és számszoros csúszkákkal, koordinátákkal és hosszal.
   - **II. Laboratórium:** két pontból távolság, felezőpont, meredekség, egyenes, felezőmerőleges és Thalész-kör egyenlete (pontos törtekkel).
3. **`VectorsCoordinatesSummaryMatcher.tsx`**: 3 szint × 8 pár (képletek; vektorműveletek; feladatok eredményei).
4. **`VectorsCoordinatesSummarySorter.tsx`**: 3 szint × 3 kategória × 9 elem (párhuzamos / merőleges / egyik sem; pont és kör; egyenes / kör / egyik sem).
5. **`VectorsCoordinatesSummaryQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 10 kérdésábrával, 3 puskakártyával.
- `sumKit.tsx`: belső rajz-, koordináta- és törtsegédek (nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-sum-vektorok-koordinatageometria-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic4VectorsCoordinatesSummary.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
