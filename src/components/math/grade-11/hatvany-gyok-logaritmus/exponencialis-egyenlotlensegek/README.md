# 14. Exponenciális egyenlőtlenségek (tankönyv 39. lecke, 112–113. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 112–113. oldal) alapján kidolgozott oktatási modul. A diákzónában a III. fejezet 14. leckéje.

---

## 🎯 Tananyag Áttekintés

**Kidolgozott feladat – részvény:** f(x) = 2000 · 1,002ˣ Ft (x: eltelt napok); 2300 és 2400 Ft között érdemes eladni.

1. 2300 < 2000 · 1,002ˣ < 2400 ⇒ (osztás 2000-rel) **1,15 < 1,002ˣ < 1,2**.
2. x ↦ 1,002ˣ szigorúan növő (alap > 1), a relációjelek maradnak.
3. Határok: lg 1,15 / lg 1,002 ≈ **69,95** és lg 1,2 / lg 1,002 ≈ **91,25**.
4. Egész napokra: **70 ≤ x ≤ 91** (legkorábban a 70., legkésőbb a 91. napon).

> **Monotonitás:** a > 1 ⇒ x ↦ aˣ növő, a relációjel marad; 0 < a < 1 ⇒ csökkenő, a relációjel **megfordul**. Mivel aˣ > 0, az aˣ < b (b ≤ 0) egyenlőtlenségnek nincs megoldása.

---

## 📐 Feladatok (ellenőrzött eredmények)

- **1.** x ↦ 1,2ˣ grafikonjáról: a) 1,2ˣ ≥ 1,44 ⇔ **x ≥ 2**; b) 1,2ˣ < 1 ⇔ **x < 0**.
- **2.** Webáruház, N(x) = 10 · 1,08ˣ: a) 1,08ˣ > 10 ⇔ x > 29,92 ⇒ a **30. napon**; b) 125 < 1,08ˣ < 175 ⇔ 62,74 < x < 67,11 ⇒ kb. **63–67 nap**.
- **3.** a) (1/2)ˣ < 8 ⇔ **x > −3**; b) 1 ≤ 1,5ˣ ≤ 10 ⇔ **0 ≤ x ≤ 5,679**.
- **4.** P(x) = 50 · 0,94ˣ (millió fő; P(53) ≈ 1,88, P(70) ≈ 0,66): 0,94ˣ > 0,02 ⇔ x < 63,22 ⇒ a **41–63 évesek**.
- **HF 1.** ¹⁴C, felezési idő 5730 év: (1/2)^(t/5730) > 0,15 ⇔ t < **≈ 15 683 év**.
- **HF 2.** a) 3ˣ ≤ 2187 = 3⁷ ⇔ **x ≤ 7**; b) 0,06 < 0,6ˣ < 6 ⇔ **−3,508 < x < 5,508**.
- **HF 3. (érettségi, 2015)** t(x) = 3600 · 0,854ˣ: a) 0,854² ≈ 0,7293 ⇒ **≈ 27,1%**-os csökkenés 2016 végéig; b) 0,854ˣ < 0,25 ⇔ x > 8,78 ⇒ **2023**.

> **⚠️ CSAPDA:** 0 < a < 1 alapnál (pl. 0,94ˣ > 0,02) elfelejteni megfordítani a relációjelet; algebrailag a negatív lg a-val való osztás fordítja meg.

> Megjegyzés: a 3. a) feladat a szövegkivonatban torzult; a modul (1/2)ˣ < 8 alakban dolgozza fel.

---

## 💻 Elkészített Komponensek

1. **`ExponentialInequalitiesFigures.tsx`**:
   - `StockModelSvg`: x ↦ 1,002ˣ a 1,15–1,2 sávval és a 69,95 < x < 91,25 megoldással.
   - `MonotonicityRuleSvg`: a > 1 (növő) és 0 < a < 1 (csökkenő) összevetése.
   - `GraphReadingSvg`: x ↦ 1,2ˣ és az y = 1,44 egyenes, x ≥ 2 leolvasás.
   - `AgeDistributionSvg`: P(x) = 50 · 0,94ˣ oszlopdiagram az 1 milliós határral.
   - `TigerDeclineSvg`: t(x) = 3600 · 0,854ˣ éves értékei a 900-as határral.
2. **`ExponentialInequalitiesTheory.tsx`**: kidolgozott feladat, monotonitás, feladattáblázat, modellfeladatok, házi feladatok, csapda.
   - **I. Laboratórium (grafikus megoldó):** a alap csúszkával (0,2–3), relációjel-választó, jobb oldal; a grafikon, az y = b egyenes és a megoldáshalmaz kiemelése az x tengelyen, a relációjel-fordulás jelzése, b ≤ 0 eset kezelése.
   - **II. Laboratórium:** kettős egyenlőtlenség c · aˣ alakú modellekben (részvény, webáruház, tigrisek, korosztályok előbeállításokkal), határok logaritmussal, egész megoldások.
3. **`ExponentialInequalitiesMatcher.tsx`**: 3 szint × 8 pár (közös alap; határok lg-vel; modellfeladat ↔ eredmény).
4. **`ExponentialInequalitiesSorter.tsx`**: 3 szint × 3 kategória (marad / fordul / nem kell számolni; megoldáshalmaz alakja; minden x / üres / részhalmaz).
5. **`ExponentialInequalitiesQuiz.tsx`**: 30 kérdés 3 szinten, grafikonos ábrákkal, 3 puskakártyával (progress id: `g11-exp-exponencialis-egyenlotlenseg-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic3ExponentialInequalities.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
