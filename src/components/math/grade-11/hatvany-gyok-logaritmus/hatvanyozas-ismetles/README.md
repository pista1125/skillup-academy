# 26. Hatványozás – ismétlés (26. lecke, 80–83. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 80–83. oldal) alapján kidolgozott oktatási modul – a III. Hatvány, gyök, logaritmus fejezet nyitó leckéje.

---

## 🎯 Tananyag Áttekintés

A lecke egy szabadulószobás rejtvénnyel indul: a lakat háromjegyű kódját 2 hatványaival lehet megfejteni. A megadott számokat 2 hatványaként kell felírni (4¹¹ = 2²², 512² = 2¹⁸, 32³ = 2¹⁵, 16² = 2⁸), majd egy 3 × 3-as „szorzat-bűvös” négyzetet kell kiegészíteni – mivel 2ᵃ · 2ᵇ · 2ᶜ = 2ᵃ⁺ᵇ⁺ᶜ, elég a kitevőket összeadni (bűvös összeg 45). A kitevők angol nevének betűszámai újabb bűvös négyzetet adnak (összeg 21), számjegyeik összege 45, és 45⁻¹ = 0,0222… ⇒ **a kód: 022**.

---

## 📐 Fő Fogalmak és Azonosságok

- **Egész kitevőjű hatvány:** aⁿ = a · a · … · a (n tényező, n > 1); a¹ = a; a⁰ = 1 (a ≠ 0, **0⁰ nem értelmezett**); a⁻ⁿ = (1/a)ⁿ = 1/aⁿ (a ≠ 0, n ∈ N).
- **Hatványazonosságok** (a, b ∈ R, m, n ∈ Z, ha minden hatványnak van értelme):
  - aᵐ · aⁿ = aᵐ⁺ⁿ; aᵐ : aⁿ = aᵐ⁻ⁿ (a ≠ 0);
  - (aᵐ)ⁿ = aᵐ·ⁿ;
  - (a · b)ⁿ = aⁿ · bⁿ; (a / b)ⁿ = aⁿ / bⁿ (b ≠ 0).
- Az azonosságokat pozitív egész kitevőkre bizonyítottuk, majd kiterjesztettük egész kitevőkre.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** Melyik nagyobb? a) 2⁻³ = 1/8 > 3⁻² = 1/9; b) 5⁻² > −5²; c) (−3)² > 3⁻²; d) (−2)⁻² = 1/4 > (−3)⁻² = 1/9; e) (−5)⁻¹ = −0,2 > (−1)⁻⁵ = −1; f) 7⁰ = 1 > 0⁷ = 0.
- **2.** 2 hatványaként: a) 2³ · (2⁻²)⁻⁵ = 2¹³; b) (2⁻³)⁻¹ : (2⁻⁴)⁻³ = 2⁻⁹.
- **3. a)** (3⁻¹ − 3⁻²) : 3 = 2/27.
- **4. a)** a = 123 456 esetén a · (a²)⁻¹ · a⁻³ : ((a⁻³)⁻² · a⁻⁹) = a⁻¹ = 1/123 456 (előbb egyszerűsítünk).
- **5.** Növekvő sorrend: B = (−3)⁷⁵ < E = (−3)⁻⁷⁵ < C = 5⁻¹⁰ < F = (−3)⁻¹⁰ < A = (−7)⁸⁰ < D = (2³)⁸⁰.
- **HF 1. c)** 9² · 27⁻⁶ = 3⁻¹⁴ ⇒ 3²²-nel kell szorozni, hogy 3⁸ legyen; **a)** 3⁴ · (3⁻²)⁻¹ = 3⁶ ⇒ 3²-nel.
- **HF 3.** x³ = 8/27 ⇒ 2/3; x⁻¹ = 1/5 ⇒ 5; x⁴ = 16/81 ⇒ ±2/3; x⁻² = 4/9 ⇒ ±3/2; x⁰ = 1 ⇒ minden x ≠ 0; x⁶ = −1/64 ⇒ nincs megoldás; x⁻¹⁰ = 1024 ⇒ ±1/2.
- **HF 4.** Mind a hat állítás igaz (pl. 0,5² > 0,5³; (−2)⁻² = 1/4; (±1)⁻¹ = ±1; 2²ᵏ = 4ᵏ; −1 páros hatványai).
- *Ráadás:* Dürer (Melankólia I., 1514) és Ramanujan bűvös négyzetei, „hatványozottan” bűvös négyzetek.

> **⚠️ CSAPDA:** A negatív kitevő a reciprokot jelenti, nem negatív számot: 2⁻³ = 1/8 (nem −8, nem −6). A zárójel számít: (−3)² = 9, de −3² = −9.

*Megjegyzés: a 2. c)–e), 3. b)–c), 4. b)–c) és a HF 1. b), d), e), HF 2. feladatok képletei a tankönyv szövegkivonatából nem rekonstruálhatók egyértelműen, ezért nem dolgoztuk fel őket.*

---

## 💻 Elkészített Komponensek

1. **`PowersReviewFigures.tsx`**:
   - `PowersReviewDefinitionSvg`: aⁿ mint n tényezős szorzat; a¹, a⁰, a⁻ⁿ értelmezése.
   - `PowersReviewLadderSvg`: 2 hatványai lépcsőn 2⁴-től 2⁻³-ig (felezés ⇒ 2⁰ = 1, negatív kitevő).
   - `PowersReviewIdentitiesSvg`: az öt hatványazonosság példákkal.
   - `PowersReviewMagicSquareSvg`: a szabadulószoba 2-hatványos bűvös négyzete és a 022-es kód.
   - `PowersReviewOrderingSvg`: az 5. feladat hat hatványa számegyenesen.
2. **`PowersReviewTheory.tsx`**: bevezető rejtvény, értelmezés, azonosságok táblázattal, kidolgozott feladatok (összehasonlítás, 2 hatványai, tört alak, sorrend, visszafelé, igaz–hamis), csapda.
   - **I. Laboratórium:** hatvány-felfedező – alap (−5…10) és kitevő (−8…8) csúszkával, kifejtett szorzat, reciprok alak, előjel- és nagyságszabály, tankönyvi előbeállítások.
   - **II. Laboratórium:** a szabadulószoba bűvös négyzete – a hiányzó kitevők beírása, soronkénti/oszloponkénti/átlónkénti ellenőrzés, majd a kód megfejtése.
3. **`PowersReviewMatcher.tsx`**: 3 szint × 8 pár (azonosságok; hatványértékek; 2 hatványaira átírás).
4. **`PowersReviewSorter.tsx`**: 3 szint × 3 kategória × 9 elem (előjel; viszony 1-hez; igaz / hamis / függ).
5. **`PowersReviewQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), minden kérdésen típus-címke, 2 kérdésen ábra, 3 puskakártya (progress id: `g11-exp-hatvanyozas-ismetles-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic3PowersReview.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
