# 4. Adatsokaság szórása (tankönyv 56. lecke, 172–175. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 172–175. oldal) alapján kidolgozott oktatási modul. A diákzónában az V. fejezet (Statisztika és valószínűségszámítás) 4. leckéje.

---

## 🎯 Tananyag Áttekintés

**Bevezető:** több osztály ugyanazt a 12 pontos dolgozatot írta; mindhárom bemutatott osztály átlaga 7, mégis más az eloszlás (hasonló felkészültség / jobban szóródó eredmények / két elkülönülő csoport, átlagos pontszám nélkül). Kell egy mutató, amely a szóródást jellemzi: a **szórás**. (A modul ábrája saját, 7-es átlagú adatokkal szemlélteti a tankönyv grafikonjait.)

---

## 📐 Elmélet

- Nagyszámú adatnál az átlag kevés információt hordoz; a szórás az **átlagtól való eltéréseket** veszi alapul. Az eltéréseket négyzetre emeljük, így nem számít az előjelük. A szórás nemnegatív; ha minden adat egyenlő, 0.
- **Definíció:** x₁, …, xₙ adatok, átlaguk x̄. A ((x₁ − x̄)² + … + (xₙ − x̄)²) / n szám a **szórásnégyzet**, négyzetgyöke a **szórás**, jele σ.
- Lépések: átlag → eltérések → eltérésnégyzetek → ezek átlaga → négyzetgyök. Táblázat segít; ismert gyakoriságnál az eltérésnégyzeteket a gyakoriságokkal súlyozzuk.

### Kidolgozott feladat
33, 33, 45, 45, 45, 45, 45, 45, 46, 48: x̄ = 430 / 10 = 43; eltérések −10, 2, 3, 5; σ² = (2 · 100 + 6 · 4 + 9 + 25) / 10 = 25,8; **σ ≈ 5,1**.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1. (cinkelt kocka, 120 dobás: 21, 18, 4, 45, 22, 10):** átlag 419 / 120 ≈ 3,49; medián 4; módusz 4; terjedelem 5; σ ≈ 1,57.
- **2. (−10; 0; 10; 15; 35):** átlag 10, terjedelem 45; σ² = 230, σ ≈ 15,17.
- **3. (kávékóstoló, érettségi 2014 alapján):** mindkét csoport átlaga 6; σ₁ ≈ 1,30 (σ² = 1,7), σ₂ ≈ 3,74 (σ² = 14); dobozdiagramok: 3; 5; 6; 6,5; 9 és 2; 2; 5; 10; 10 – a szélesebb doboz nagyobb szórással jár.
- **HF 1.:** rendezve 2, 2, 2, 2, 3, 3, 4, 4, 4, 5, 6, 6, 7, 8, 9; terjedelem 7; átlag 67 / 15 ≈ 4,47; σ ≈ 2,22.
- **HF 2. (érettségi 2020 alapján):** Márton Anita dobásai a tankönyvi táblázat szerint 17,60; 18,72; 19,39; 19,38; 19,10; 19,87 m – átlag 19,01 m, σ ≈ 0,72 m. (A táblázat kitöltése és a b) kérdés a forrásszövegből nem olvasható ki egyértelműen, ezeket a modul nem dolgozza fel.)
- **Ráadás (két izzógyár, 1000-1000 izzó):** terjedelem 770 / 770, módusz 1010 / 1010, medián 1010 / 1000, átlag ≈ 1002 / ≈ 1001; a szórás ≈ 43,6 / ≈ 110,5 óra – az 1. gyár ígérete megbízhatóbb.

> **⚠️ CSAPDA:** a 25,8 még csak a szórásnégyzet – gyököt kell vonni (σ ≈ 5,1); és a gyakoriságokat nem szabad elfelejteni.

---

## 💻 Elkészített Komponensek

1. **`StandardDeviationFigures.tsx`**:
   - `StandardDeviationClassesSvg`: három osztály oszlopdiagramja azonos (7-es) átlaggal, eltérő szórással.
   - `StandardDeviationStepsSvg`: a szórás kiszámításának 5 lépése.
   - `StandardDeviationTableSvg`: a kidolgozott feladat táblázata.
   - `StandardDeviationSpreadSvg`: eltérések az átlagtól a számegyenesen (−10; 0; 10; 15; 35).
   - `StandardDeviationBulbsSvg`: Ráadás – a két izzógyár oszlopdiagramja.
   - `StandardDeviationCoffeeSvg`: a kávékóstoló két csoportjának dobozdiagramja és szórása.
2. **`StandardDeviationTheory.tsx`**: bevezető, definíció, kidolgozott feladat, tankönyvi és házi feladatok, Ráadás, csapda.
   - **I. Laboratórium:** húzható adatpontok (0–12), élő átlagvonal, eltérésszakaszok, eltérés-táblázat, σ², σ; eltolás (+1 / −1), nagyítás (×2), átlaghoz közeli új adat.
   - **II. Laboratórium:** dobókocka-gyakorisági táblázat (+/−), súlyozott számolás lépésenként (tankönyvi cinkelt kocka, egyenletes, csak 1 és 6, mind 4).
3. **`StandardDeviationMatcher.tsx`**: 3 szint × 8 pár (fogalmak, egyszerű adatsokaságok szórása, tankönyvi adatsokaságok szórása).
4. **`StandardDeviationSorter.tsx`**: 3 szint × 3 kategória × 9 elem (hogyan változik a szórás; σ = 0 / 0 < σ < 2 / σ ≥ 2; középérték / szóródási mutató / diagram).
5. **`StandardDeviationQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 8 ábrával (pontdiagram, oszlopdiagram, dobozdiagram), kérdéstípus-címkékkel, 3 puskakártyával (progress id: `g11-stat-szoras-quiz`; matcher: `g11-stat-szoras-matcher`, sorter: `g11-stat-szoras-sorter`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic5StandardDeviation.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
