# 15. Gyakorlás (tankönyv 40. lecke, 114–115. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 114–115. oldal) alapján kidolgozott gyakorló modul. A diákzónában a III. fejezet 15. leckéje.

---

## 🎯 Tananyag Áttekintés

Gyakorló óra a logaritmus fogalmára, a tízes alapú logaritmusra (áttérés: logₐ b = lg b / lg a), az exponenciális egyenletekre és egyenlőtlenségekre, valamint természettudományos exponenciális / logaritmusos modellekre.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1. a)** (log₃ 1/9)⁻¹ = (−2)⁻¹ = −1/2; **b)** lg ³√10 − (2/3) · lg 0,0001 = 1/3 + 8/3 = 3; **c)** 1,065ᵏ = 3,45 ⇒ k ≈ 19,66, tehát 19 < k < 20.
- **2. Légnyomás:** p(x) = 1,013 · 10⁵ · 1,133⁻ˣ (Pa).
  - a) Kékestető (1,014 km) ≈ 89 250 Pa; Mont Blanc (4,806 km) ≈ 55 590 Pa; Csomolungma (8,849 km) ≈ 33 550 Pa;
  - b) p = 80 000 Pa ⇒ x ≈ 1,89 km; c) „felezési magasság”: lg 2 / lg 1,133 ≈ 5,55 km.
- **3. Newton-féle hűlési törvény:** K(t) = 60 · 0,87ᵗ (20 °C-os szoba, 80 °C-os kávé).
  - a) K(15) ≈ 7,4 °C; b) a kávé ≈ 27,4 °C; c) felezés: ≈ 4,98 perc;
  - d) 5 perccel korábban: K(−5) ≈ 120,4 ⇒ ≈ 140 °C (a modell itt már irreális); e) 21 °C alá: t > 29,4 ⇒ kb. 30 perc.
- **4. Információ:** Shannon I = −log₂ p, Hartley H = n · log₂ N.
  - a) p = 1/8 ⇒ 3 bit, p = 3/7 ⇒ ≈ 1,22 bit; b) 24 betűs ábécé, 10 karakter: ≈ 45,85 bit; c) 4 jegyű PIN: ≈ 13,29 bit.
- **HF:** log₂ 64 · (log₄ 8 − log₈ 4) = 5; 2,4ˣ = 5,76 ⇒ x = 2; (Érettségi 2011) 2000 € · 1,06ⁿ ≥ 4024 € ⇒ 12 év; 3ˣ⁺¹ = 81 ⇒ x = 3; 4³ˣ⁻¹ = 0,5 ⇒ x = 1/6; log₁/₃ (2 − x): x < 2; log₇ (3x + 16): x > −16/3.
- **Ráadás:** Napier (1614) és Briggs (1617) logaritmustáblázata – a szorzás visszavezetése összeadásra.

> **⚠️ CSAPDA:** 1-nél kisebb alapnál (vagy negatív lg 0,87-del osztva) az egyenlőtlenség iránya megfordul: 0,87ᵗ < 1/60 ⇔ t > 29,4.

> Megjegyzés: a forrásszövegben az 1. b) feladat együtthatója („23”) a 2/3 tört kivonatának tűnik, a modul így értelmezte (az eredmény így egész: 3). A HF 1. b) és a HF 3. c) képlete nem olvasható egyértelműen; a 3. c)-t a modul (7/8)⁵ˣ⁻⁴ < 8/7 alakban dolgozza fel.

---

## 💻 Elkészített Komponensek

1. **`LogPractice2Figures.tsx`**:
   - `CoffeeCoolingSvg`: a K(t) = 60 · 0,87ᵗ hűlési görbe, a felezési idő jelölésével.
   - `PressureAltitudeSvg`: a légnyomás–magasság görbe a Kékestetővel, a Mont Blanc-nal és a Csomolungmával.
   - `LogBetweenIntegersSvg`: 1,065ᵏ = 3,45 – k a 19 és a 20 között.
   - `InformationBitsSvg`: Shannon- és Hartley-képlet, PIN-kód példa.
   - `NapierIdeaSvg`: Ráadás – szorzás logaritmustáblázattal.
2. **`LogPractice2Theory.tsx`**: fejezeti összefoglaló táblázat, a 4 tankönyvi feladat lépésenként, házi feladatok, csapda, ráadás.
   - **I. Laboratórium:** Newton-féle hűlés (szoba, kezdeti hőmérséklet, szorzó, idő, célhőmérséklet) – K(t), T(t), felezési idő, a célhőmérséklet elérésének ideje.
   - **II. Laboratórium:** aˣ = b megoldó – x = lg b / lg a, szomszédos egészek, visszahelyettesítés.
3. **`LogPractice2Matcher.tsx`**: 3 szint × 8 pár (logaritmusértékek; egyenlet ↔ megoldás; modell ↔ eredmény).
4. **`LogPractice2Sorter.tsx`**: 3 szint × 3 kategória (logaritmus előjele; növekedés / csökkenés / logaritmusos képlet; megoldási módszer).
5. **`LogPractice2Quiz.tsx`**: 30 kérdés 3 szinten (10/10/10), kérdéstípus-címkékkel, 6 ábrás kérdéssel, 3 puskakártyával (progress id: `g11-exp-log-gyakorlas-masodik-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic3LogPractice2.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
