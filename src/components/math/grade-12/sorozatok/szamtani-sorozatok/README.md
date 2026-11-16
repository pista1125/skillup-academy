# 3. Számtani sorozatok (24. lecke, 56–57. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 24. lecke, 56–57. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a sorozatok fejezet **3.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Bevezető:** a világ gabonatermelése 1960 és 2010 között évente átlagosan kb. 27 millió tonnával nőtt (1960-ban kb. 824 millió tonna). Modell: a₁ = 824, minden tag 27-tel nagyobb – az egymás utáni tagok különbsége állandó (a valódi adatok kissé eltérnek a trendtől).

---

## 📐 Elmélet

- **Definíció:** az {aₙ} sorozat számtani sorozat, ha a második tagtól kezdve aₙ − aₙ₋₁ állandó. Ez az állandó a **differencia**, jele **d**.
- **n-edik tag:** aₙ = a₁ + (n − 1)d.
- **Két tag meghatározza a sorozatot:** pl. a₁₂ = 40, a₁₅ = 46 ⇒ 3d = 6 ⇒ d = 2.
- **Szimmetrikus jelölés:** három egymást követő tag a − d; a; a + d.

### Kidolgozott feladat
- Tibor perselye: havonta 100 Ft-tal többet tesz be; április–június összesen 8100 Ft ⇒ 3c = 8100, a májusi c = 2700 Ft, a januári 2300 Ft.

### Tankönyvi feladatok (a modulban feldolgozva)
- **1.** 33-nál nagyobb párosok: a₁ = 34, d = 2, a₇₇ = 186, az 1948 a 958. tag.
- **2.** a₁₀ + a₁₁ + a₁₂ = 63 ⇒ a₁₁ = 21; d = 5 ⇒ a₁ = −29; d = 7 ⇒ a₁₀ = 14, a₁₂ = 28; a₁₁ a szomszédok számtani közepe.
- **3.** b₇ − b₁ = 24, b₇ + b₁ = 4 ⇒ d = 4, b₁ = −10, b₇ = 14, b₄ = 2.
- **4.** Hatszöglapos főtér: körönként 6; 12; 18; … lap (aₖ = 6k); a 12. körben 72; a 20. körben 30-cal több, mint a 15.-ben; 16 szín kell 100-nál kevesebb lapból.
- **5.** a₂₈ = 96, a₃₂ = 112 ⇒ d = 4, a 192 az 52. tag.
- **6.** (Érettségi, 2022) a₁ = −1, d = 7.
- **HF 1.** 5 és 8 közé 4 szám: d = 0,6. **HF 2.** (Érettségi, 2017) strandbüfé: d = 11 liter, július 31-én 374 liter. **HF 3.** 37-tel osztva 3 maradék: 1002, 9993, 244 négyjegyű tag. **HF 4.** a₁ = 39, d = −2.

> **⚠️ CSAPDA:** aₙ = a₁ + (n − 1)d, nem a₁ + nd; két tag között (m − k)d a különbség.

---

## 💻 Elkészített Komponensek

1. **`ArithmeticSequenceFigures.tsx`**:
   - `GrainTrendSvg`: a gabonatermelés számtanisorozat-modellje (824 + 27 évente).
   - `ArithmeticChainSvg`: a₁ … a₇ „+d” lépésekkel, aₙ = a₁ + (n − 1)d.
   - `PiggyBankSvg`: Tibor perselye, szimmetrikus jelölés.
   - `HexRingsSvg`: hatszöglapos burkolás körei (6; 12; 18).
   - `TwoTermsSvg`: két ismert tagból a differencia (a₂₈, a₃₂).
2. **`ArithmeticSequenceTheory.tsx`**: bevezető, definíció, n-edik tag, két tag, szimmetrikus jelölés, kidolgozott feladat, a lecke feladatai, csapda.
   - **I. Laboratórium:** a₁ és d csúszka, pontgrafikon, aₙ tetszőleges n-re, „hányadik tag?” kereső.
   - **II. Laboratórium:** két tagból a sorozat (sorszámok és értékek beírásával, tankönyvi előbeállításokkal).
3. **`ArithmeticSequenceMatcher.tsx`**: 3 szint × 8 pár (sorozat ↔ d; adatok ↔ tag; feladatok eredményei).
4. **`ArithmeticSequenceSorter.tsx`**: 3 szint × 3 kategória × 9 elem (növő / csökkenő / nem számtani; melyik sorozat tagja; d = 2 / 4 / −2).
5. **`ArithmeticSequenceQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 7 kérdésábrával, 3 puskakártyával.
- `seqKit.tsx`: belső rajzsegédek (nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-seq-szamtani-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic2ArithmeticSequence.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
