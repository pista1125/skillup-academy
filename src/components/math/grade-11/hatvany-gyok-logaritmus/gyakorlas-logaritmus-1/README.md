# 13. Gyakorlás (tankönyv 38. lecke, 110–111. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 110–111. oldal) alapján kidolgozott gyakorló modul. A diákzónában a III. fejezet 13. leckéje.

> A tankönyvi lecke **érettségi feladatokból** álló gyakorlóóra (exponenciális függvény, logaritmusos és exponenciális egyenletek, logaritmikus képletek) – nem a logaritmus azonosságairól szól, ahogy a korábbi README írta.

---

## 🎯 Tananyag Áttekintés

Összefoglaló: hatványozás azonosságai, törtkitevő, kamatos kamat, exponenciális függvény, felezési idő, a logaritmus definíciója (log_a b = c ⇔ aᶜ = b), tízes alapú logaritmus (log_a b = lg b / lg a).

### Órai feladatok (ellenőrzött eredmények)
- **1. (2013)** f: [−2; 1] → R, f(x) = aˣ grafikonja: értékkészlet **[0,5; 4]**, **a = 1/2**.
- **2. a) (2007)** log₁₆ x = −1/2 ⇒ x = 16^(−1/2) = **1/4** (számegyenesen jelölve).
- **2. b) (2012)** log₂ x² = 4 ⇒ x² = 16 ⇒ **x = ±4**.
- **3. (2016)** 2ˣ = 10 ⇒ x = 1 / lg 2 ≈ **3,322**.
- **4. (2015)** 6 · 10²³ részecske, percenként századrészére: 10 perc után 6 · 10²³ · 10⁻²⁰ = **6000**.
- **5. (2006 nyomán)** É = 75,5 − 5 · 10^((6000 − G)/6090): a) G = 1090 ⇒ É ≈ **43,5 év**; b) G = 3270 ⇒ É ≈ 61,5 év, kb. **18 évvel több**; c) É = 68 ⇒ **G ≈ 4928 USD**.
- **6. (2011)** M = −4,42 + (2/3) · lg E: a) E = 1,344 · 10¹⁴ J ⇒ **M ≈ 5,0**; b) M = 9,3 ⇒ **E ≈ 3,8 · 10²⁰ J**; c) ΔM = 2 ⇒ **1000-szeres** energia.

### Házi feladatok
- **1. (2009)** log₃ 81 = **4**.
- **2. (2014)** log₂ (3 − x) értelmezett, ha **x < 3**; log₂ (3 − x) = 0 ⇒ **x = 2**.
- **3. (2018)** 4ˣ = 8 ⇒ **x = 1,5**.
- **4. (2019 nyomán)** f(x) = 0,122 · 2^(0,822x) = 25 ⇒ x ≈ 9,34 ⇒ **2021**.
- **5. (2011)** lg pₘ = 0,8 · lg pᵥ + 0,301: a) pᵥ = 20 Pa ⇒ **pₘ ≈ 22 Pa**; b) pₘ = 50 Pa ⇒ **pᵥ ≈ 55,9 Pa**.

> **⚠️ CSAPDA:** log₂ x² = 4-nél a 2 · log₂ x átalakítás elveszíti a −4 megoldást; logaritmusos egyenletnél mindig ellenőrizzük az értelmezési tartományt.

> Megjegyzés: az 1. feladat grafikonja a szövegkivonatban nem olvasható; az ábra a (−2; 4) és (1; 0,5) végpontú, a = 1/2 alapú grafikont mutatja (a 2013-as érettségi feladat ismert megoldása szerint).

---

## 💻 Elkészített Komponensek

1. **`LogPractice1Figures.tsx`**:
   - `ExpGraphTaskSvg`: az 1. feladat f(x) = aˣ grafikonja a [−2; 1] intervallumon.
   - `LogNumberLineSvg`: log₁₆ x = −1/2 megoldása a számegyenesen.
   - `DecayHundredthSvg`: radioaktív bomlás percenként századrészére (nagyságrendek).
   - `LifeExpectancySvg`: a várható élettartam a GDP függvényében, G = 1090 és 3270.
   - `RichterScaleSvg`: a Richter-skála kategóriái és az M–E összefüggés.
2. **`LogPractice1Theory.tsx`**: összefoglaló táblázat, a 6 órai érettségi feladat kidolgozva, házi feladatok eredménytáblája, csapda.
   - **I. Laboratórium:** Richter-skála kalkulátor – két magnitúdó csúszkával, energia normál alakban, energiaarány.
   - **II. Laboratórium:** érettségi gyorsteszt – 8 feladat válaszbevitellel, ellenőrzéssel, tippel és pontszámmal.
3. **`LogPractice1Matcher.tsx`**: 3 szint × 8 pár (logaritmus ↔ érték; egyenlet ↔ megoldás; szöveges feladat ↔ eredmény).
4. **`LogPractice1Sorter.tsx`**: 3 szint × 3 kategória (megoldási módszer; a logaritmus előjele; megoldások száma).
5. **`LogPractice1Quiz.tsx`**: 30 vegyes, érettségi típusú kérdés 3 szinten, ábrákkal és 3 puskakártyával (progress id: `g11-exp-log-gyakorlas-elso-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic3LogPractice1.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
