# 6. A mértani sorozat első n tagjának összege (27. lecke, 62–63. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 27. lecke, 62–63. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a II. Sorozatok fejezet **6.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Kidolgozott feladat (járvány):** a csökkenő fázisban az új megbetegedések száma naponta az előző napi 90%-a, az első napon 600. Az első 20 nap összesen: 0,9 · S₂₀ − S₂₀ = 0,9²⁰ · 600 − 600 ⇒ S₂₀ = 600 · (0,9²⁰ − 1)/(0,9 − 1) ≈ **5271** megbetegedés.

---

## 📐 Elmélet

- **Összegképlet:** ha a mértani sorozat első tagja a₁, kvóciense q, akkor
  - q ≠ 1 esetén **Sₙ = a₁ · (qⁿ − 1)/(q − 1)**,
  - q = 1 esetén **Sₙ = n · a₁**.
- **Bizonyítás:** Sₙ = a₁ + q·a₁ + … + qⁿ⁻¹·a₁ és q·Sₙ = q·a₁ + … + qⁿ·a₁ különbségében két tag marad: q·Sₙ − Sₙ = qⁿ·a₁ − a₁, majd (q − 1)-gyel osztunk.

### Tankönyvi feladatok (a modulban feldolgozva, ellenőrzött eredmények)
- **1.** a₁ = 18, a₂ = 27 (q = 1,5): S₄ = 146,25; S₁₀ ≈ 2039,94; S₂₅ ≈ 909 006,06.
- **2.** a₁ = 49, q = −1: S₅ = 49, S₁₀ = 0, S₇₉ = 49.
- **3.** Családfa 10 generációra: 2 + 4 + … + 2¹⁰ = 2046 ős.
- **4.** a₁ = 2, q = 3, Sₙ = 177 146 ⇒ 3ⁿ = 177 147 ⇒ n = 11.
- **5.** a₂ = 20, a₄ = 500 ⇒ q = ±5: S₆ = 15 624 (q = 5) vagy 10 416 (q = −5).
- **6. (Érettségi, 2007)** Sál: 8 cm, naponta +20%, 2 m: 1,2ⁿ ≥ 6 ⇒ 10 nap (S₉ ≈ 166,4 cm, S₁₀ ≈ 207,7 cm).
- **HF 1. c)** a₁ = 512, q = 0,5, Sₙ = 1023 ⇒ n = 10, aₙ = 1.
- **HF 2.** 120 kg, hetente −1,5%: 5 / 15 / 20 hét alatt ≈ 8,73 / 24,34 / 31,30 kg fogyás; 85 kg a 23. hét után.
- **HF 3.** 42 kg → 65 kg hetente +1%-kal: 44 hét.
- **HF 4.** 520 fertőzött, hetente +35%: 5 / 15 / 20 hét alatt ≈ 5176 / 132 464 / 599 149.
- **Ráadás:** Sissa ibn Dahir sakktáblája: 1 + 2 + … + 2⁶³ = 2⁶⁴ − 1 ≈ 1,84 · 10¹⁹ búzaszem (≈ 700 milliárd tonna).
- A HF 1. a)–b) sorainak táblázata a szövegből nem egyértelmű, ezért azokat nem dolgoztuk fel.

> **⚠️ CSAPDA:** az összegképletben a kitevő n (a tagok száma), nem n − 1: a₁ = 3, q = 2 esetén S₅ = 3 · 31 = 93, nem 3 · 15 = 45.

---

## 💻 Elkészített Komponensek

1. **`GeometricSumFigures.tsx`**:
   - `EpidemicBarsSvg`: a járvány napi esetszámai (a₁ = 600, q = 0,9) oszlopdiagramon.
   - `SumDerivationSvg`: Sₙ és q·Sₙ tagjai egymás alatt eltolva – a közbülső tagok kiesnek.
   - `ChessboardWheatSvg`: Sissa sakktáblája 1, 2, 4, … búzaszemmel.
   - `FamilyTreeSvg`: családfa, generációnként kétszer annyi ős.
   - `ScarfGrowthSvg`: a sál napi darabjai és a halmozott hossz a 2 m-es célvonallal.
2. **`GeometricSumTheory.tsx`**: járvány kidolgozott feladat, összegképlet és bizonyítás, kidolgozott feladatok (1–6.), házi feladatok tanulságai, Ráadás, csapda.
   - **I. Laboratórium:** a₁, q, n csúszka; tagok és részletösszegek grafikonja, a tagonként összeadott és a képlettel számolt összeg összevetése.
   - **II. Laboratórium:** Sissa jutalma – k mező feltöltése, a k-adik mező és az összes szem, tömeg tonnában.
3. **`GeometricSumMatcher.tsx`**: 3 szint × 8 pár (képletek; összegek értéke; szöveges feladatok).
4. **`GeometricSumSorter.tsx`**: 3 szint × 3 kategória × 9 elem (Sₙ előjele; q tartománya; aₙ / Sₙ / n a keresett mennyiség).
5. **`GeometricSumQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 9 kérdésábrával, 3 puskakártyával.
- `seqKit.tsx`: belső rajzsegédek (oszlopdiagram, keretek, magyar számformátum); a fejezet 7–10. leckéi is ezt használják. Nem exportáljuk az `index.ts`-ből.

Aktivitás-azonosítók: `g12-seq-mertani-osszeg-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic2GeometricSum.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
