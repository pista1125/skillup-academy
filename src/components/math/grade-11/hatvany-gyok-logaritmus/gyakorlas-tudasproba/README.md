# 16. Gyakorlás, tudáspróba (tankönyv 41. lecke, 116–117. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 116–117. oldal) alapján kidolgozott fejezetzáró modul. A diákzónában a III. fejezet (Hatvány, gyök, logaritmus) 16., utolsó leckéje.

---

## 🎯 Tananyag Áttekintés

A teljes III. fejezet (tankönyv 26–41. lecke) összefoglalása: hatványozás, n-edik gyök, racionális kitevő, pénzügyi számítások, exponenciális függvények és folyamatok, felezési idő, logaritmus, tízes alapú logaritmus, exponenciális egyenletek és egyenlőtlenségek.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1. Város lakossága** (1997: 130 300, 2001: 132 000): a) évi szorzó ⁴√(132 000 / 130 300) ≈ 1,00325; b) L(t) = 130 300 · (132 000 / 130 300)^(t/4); c) 2010: ≈ 135 900 fő.
- **2. Ólomizotóp** (T = 27 perc): a) N(t) = 1,8 · 10²⁴ · (1/2)^(t/27); b) bizmut (T = 19,7 perc) mellett az ólom ≈ 242 perc múlva lesz tízszer annyi.
- **3. Kólibaktérium (érettségi 2013):** a) V ≈ 3,93 · 10⁻¹⁹ m³, A ≈ 3,53 · 10⁻¹² m²; b) 1,5 óra múlva 192 millió; c) 600 millió ≈ 115 perc múlva.
- **4.** Rejtvény-táblázat (író neve) – a modul csak az értékek összehasonlítását veszi át: (−2)³ = −8, −2⁴ = −16, 2⁻³ = 1/8, (−2)⁻⁴ = 1/16.

### Tudáspróba I.
1. 2⁻⁴ · 4^0,5 = 2⁻³; (3^1,5)² = 3³. 2. log₃ 1 = 0; log₄ (1/2) = −1/2; 6^(log₆ 5) = 5; 3^(log₃ 4) = 4. 3. log₈ k = 4/3 ⇒ k = 16; log₀,₅ 4 = −2; logₐ 243 = 5 ⇒ a = 3. 4. (2/3)ˣ ≤ 4/9 ⇒ x ≥ 2.
5. Polónium (havi 0,86-szoros): fél év alatt ≈ 0,405-ére; 20% alá ≈ 10,7 hónap után; felezési idő ≈ 4,6 hónap.
6. Hajni (8%/év, 3 év): ≈ 62 986 Ft; Csilla (0,7%/hó, 34 hó): ≈ 63 383 Ft – Csillának éri meg jobban.

### Tudáspróba II.
1. 3⁻⁴ · 3⁷ = 3³; (2^0,5)⁸ = 2⁴; (⁴√5)³ = 5^(3/4). 2. log₂ 0,5 = −1; log₇ ³√7 = 1/3; 7^(log₇ 4) = 4; (1/3)^(log₃ 12) = 1/12. 3. log₂₇ k = 2/3 ⇒ k = 9; log₀,₅ 8 = −3; logₐ 128 = 7 ⇒ a = 2. 4. 0,64 < 0,8ˣ ⇒ x < 2.
5. 350 000 Ft, 4,5%: 30%-kal több pénz 6 év alatt (lg 1,3 / lg 1,045 ≈ 5,96). 6. N(t) = 4,2 · 10²⁴ · 0,97ᵗ: N(0) = 4,2 · 10²⁴; 1 mol ≈ 63,9 perc múlva; felezési idő ≈ 22,8 perc.

> **⚠️ CSAPDA:** 1-nél kisebb alapnál a kitevők között megfordul a reláció: (2/3)ˣ ≤ (2/3)² ⇔ x ≥ 2.

> Megjegyzés: a forrásszöveg képletei több helyen sérültek; a Tudáspróba 1. feladatának egyes tagjait (pl. ⁷√8², ⁵√10 hatványa) a modul nem dolgozza fel. A Témazáró feladatgyűjtemény nem része a modulnak.

---

## 💻 Elkészített Komponensek

1. **`ExpLogPracticeExamFigures.tsx`**:
   - `ChapterMapSvg`: a fejezet fogalomtérképe (hatvány → gyök → törtkitevő → exponenciális függvény, folyamat → logaritmus).
   - `TownGrowthSvg`: a város lakosságának exponenciális modellje (1997, 2001, 2010).
   - `IsotopeRaceSvg`: ólom- és bizmutizotóp bomlási görbéje.
   - `EcoliCylinderSvg`: a kólibaktérium henger alakja és 15 percenkénti duplázódása.
   - `InvestmentCompareSvg`: Hajni és Csilla befektetésének összehasonlítása.
2. **`ExpLogPracticeExamTheory.tsx`**: fejezeti összefoglaló táblázat, a 3 tankönyvi feladat és mindkét tudáspróba megoldása, csapda, kerekítési tanács.
   - **I. Laboratórium:** exponenciális modell két mérésből (q, N(t), duplázódási / felezési idő, célérték elérése) – előbeállítások: város, polónium, kólibaktérium.
   - **II. Laboratórium:** logaritmus-gyakorló 10 tudáspróba-feladattal (beírás, ellenőrzés, indoklás, pontszám).
3. **`ExpLogPracticeExamMatcher.tsx`**: 3 szint × 8 pár (hatvány/gyök/törtkitevő; logaritmus; szöveges feladat ↔ eredmény).
4. **`ExpLogPracticeExamSorter.tsx`**: 3 szint × 3 kategória (témakör; növekedés / csökkenés / lineáris; egyenlőtlenség megoldáshalmazának alakja).
5. **`ExpLogPracticeExamQuiz.tsx`**: **90 kérdés** 3 szinten (30/30/30) a teljes III. fejezetből, kérdéstípus-címkékkel, 8 ábrás kérdéssel, 3 puskakártyával (progress id: `g11-exp-tudasproba-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic3ExpLogPracticeExam.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
