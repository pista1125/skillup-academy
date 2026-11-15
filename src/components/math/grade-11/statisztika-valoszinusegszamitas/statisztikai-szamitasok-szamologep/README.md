# 5. Ráadás – Statisztikai számítások számológéppel (tankönyv, 56. lecke utáni Ráadás, 176–177. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 176–177. oldal) alapján kidolgozott oktatási modul. A diákzónában az V. fejezet (Statisztika és valószínűségszámítás) 5. leckéje (Ráadás).

---

## 🎯 Tananyag Áttekintés

**Kidolgozott feladat:** egy városi közlekedési vállalat 20 járata hány megálló hosszúságú szakaszon közlekedik.

| megállók száma | 4 | 8 | 11 | 13 | 14 | 15 | 16 | 17 |
|---|---|---|---|---|---|---|---|---|
| járatok száma | 1 | 3 | 5 | 4 | 3 | 2 | 1 | 1 |

A számológép statisztikai üzemmódjával: **átlag 12, szórás 3,098386677** (Σx = 240, Σx² = 3072, σ²x = 9,6; s²x ≈ 10,105, sx ≈ 3,179; n = 20, min 4, Q₁ = 11, Med = 13, Q₃ = 14, max 17).

---

## 📐 Elmélet

- **Érettségi szabály („Fontos tudnivalók”):** a zsebszámológép indoklás nélkül használható az alapműveletekre, hatványozásra, gyökvonásra, n! és binomiális együttható számítására, a függvénytáblázat helyettesítésére (sin, cos, tg, log és inverzeik), π és e közelítésére, nullára rendezett másodfokú egyenlet gyökeire, valamint **átlag és szórás** kiszámítására, ha a feladat kifejezetten nem követeli meg a részletszámítás bemutatását. Egyéb gépi számítások indoklás nélküli lépésnek számítanak, nem jár értük pont.
- Régebbi gépeken külön gomb van az átlagra és a torzított / torzítatlan szórásra (σ vagy s); az adatbevitel =, M+, STO vagy ENTER gombbal történik.
- **A bemutatott géptípus lépései:** menü gomb → 6: Statisztika → 1: 1 változós; adatok (és gyakoriság) bevitele – üres gyakoriság oszlop esetén minden adat 1-szer számít; OPTN → 3: 1-változós stat.
- **A kijelző:** x̄, Σx, Σx², σ²x és σx (**torzított**: σ² = Σ(xᵢ − x̄)² / n – ezt tanultuk), s²x és sx (**torzítatlan**: s² = Σ(xᵢ − x̄)² / (n − 1)); lapozva n, min, Q₁, Med, Q₃, max.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1. (tűzoltóság, 31 nap; 0, 1, 2, 4, 6, 14 riasztás 1, 11, 6, 8, 4, 1 napon):** átlag 3, σx ≈ 2,69 (sx ≈ 2,73).
- **2. (Márton Anita, 2016):** 17,60; 18,72; 19,39; 19,38; 19,10; 19,87 m → átlag 19,01 m, σx ≈ 0,72 m.
- **3. (cinkelt kocka, 120 dobás):** átlag ≈ 3,49, σx ≈ 1,57.
- **HF 2.:** a) 33, 45, 46, 48: σ ≈ 5,87; b) 33, 33, 45 (6×), 46, 48: σ ≈ 5,08.
- **HF 3. (EB 2021, 18 sebesség):** átlag ≈ 28,16 km/h, σ ≈ 3,39 km/h.
- A HF 1. oszlopdiagramja (két kocka különbsége, 20 dobás) a forrásszövegből nem olvasható ki; a kvíz egy hasonló, saját adatokkal készült oszlopdiagramos kérdést tartalmaz (3, 6, 5, 3, 2, 1 → átlag 1,9, σ ≈ 1,37).

> **⚠️ CSAPDA:** gyakoriság nélkül bevitt adatok (5,87 helyett 5,08 lenne a helyes) és az sx leolvasása σx helyett. Ellenőrizd az n-t!

---

## 💻 Elkészített Komponensek

1. **`StatCalculatorFigures.tsx`**:
   - `StatCalculatorMenuSvg`: a statisztika üzemmód 5 lépése.
   - `StatCalculatorDataScreenSvg`: adatbeviteli kijelző (x és Gyak oszlop, 20 járat).
   - `StatCalculatorResultsSvg`: az „1-változós stat” két kijelzőoldala.
   - `StatCalculatorBiasSvg`: torzított és torzítatlan szórás képlete.
   - `StatCalculatorFireSvg`: a napi riasztások oszlopdiagramja az átlaggal.
2. **`StatCalculatorTheory.tsx`**: kidolgozott feladat, érettségi szabály, lépések, σx / sx, tankönyvi és házi feladatok, csapda.
   - **I. Laboratórium:** virtuális számológép – szerkeszthető x / Gyak táblázat (sor hozzáadása, törlése, Gyak oszlop ki-/bekapcsolása), két lapozható eredményoldal (x̄, Σx, Σx², σ²x, σx, s²x, sx; n, min, Q₁, Med, Q₃, max), tankönyvi előbeállításokkal.
   - **II. Laboratórium:** σx és sx összehasonlítása – az adatsort k-szorosára sokszorozva σx állandó, sx közelít hozzá (grafikon, arány √(n / (n − 1))).
3. **`StatCalculatorMatcher.tsx`**: 3 szint × 8 pár (kijelző jelölései; tankönyvi adatsor ↔ σx; σ²x ↔ s²x).
4. **`StatCalculatorSorter.tsx`**: 3 szint × 3 kategória × 9 elem (kijelzősorok csoportosítása; érettségi szabályok; σx vagy sx).
5. **`StatCalculatorQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 10 ábrával (kijelzők, oszlopdiagramok), kérdéstípus-címkékkel, 3 puskakártyával (progress id: `g11-stat-szamologep-quiz`; matcher: `g11-stat-szamologep-matcher`, sorter: `g11-stat-szamologep-sorter`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic5StatCalculator.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
