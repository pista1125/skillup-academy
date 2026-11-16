# 2. Statisztikai jellemzők (34. lecke, 78–79. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 34. lecke, 78–79. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a statisztika és valószínűségszámítás fejezet **2.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Bevezető:** a szórást a befektetések (pl. részvények) kockázatának mérésére használják. A hozam: hány %-kal nőtt vagy csökkent az árfolyam az előző évhez képest. 6%, 4%, 5% hozam: átlag 5%; 10%, −2%, 10%: átlag 6%, de jóval nagyobb szórás → kockázatosabb.

---

## 📐 Elmélet

- Ismétlés: **átlag** (x̄), **medián**, **módusz**, **terjedelem**.
- **A szórás meghatározása** (jelölés: x̄ az átlag, σ a szórás): 1. átlag; 2. az adatok és az átlag különbségének négyzete; 3. ezek átlaga = szórásnégyzet σ²; 4. σ = √σ².
- Azonos átlagos hozamnál a **nagyobb szórású** részvény a kockázatosabb; eltérő átlagnál a **relatív szórást** (σ / x̄) vesszük figyelembe.

### Tankönyvi feladatok (a modulban feldolgozva)
- **Kidolgozott feladat:** A részvény 2018–2022: 2600; 2756; 3060; 3000; 3150 Ft → hozamok 6%, 11%, −2%, 5%; B részvény: 4700; 5170; 4963; 5560; 5670 Ft → 10%, −4%, 12%, 2%. Mindkét átlag 5%, σ_A = √21,5 ≈ 4,64%, σ_B = √41 ≈ 6,40% → B a kockázatosabb.
- **1.** 6150; 7380; 7011; 8063; 8789 Ft → hozamok 20%, −5%, ≈15%, ≈9%; átlag 9,75%, szórás ≈ 9,36%.
- **HF 1.** Hozamok 15%, 12%, 3%, 8%: átlag 9,5%, szórás 4,5%.
- **HF 2.** Röplabdacsapat (168: 2, 170: 3, 171: 4, 172: 3, 175: 3 fő): átlag 171,4 cm, szórás ≈ 2,15 cm (módusz és medián 171 cm).
- **2.** Nehézségi gyorsulás, 40 mérés (a diagramról): 9,70 (2), 9,75 (7), 9,80 (10), 9,85 (8), 9,90 (7), 9,95 (6) → módusz 9,80, medián 9,85, átlag ≈ 9,84, szórás ≈ 0,072 m/s².
- **3.** Érettségi 2022 (a diagramról): fiúk/lányok 12. a 18/14, 12. b 24/6, 12. c 18/17, 12. d 12/15. a) 12. d: 15/12 = 125%; b) lányok terjedelme 11, átlaga 13, szórása √17,5 ≈ 4,18; c) 12. b fiúk átlaga (123 − 27) / 24 = 4,0.

> **⚠️ CSAPDA:** a szórásnégyzet nem a szórás – a végén gyököt kell vonni (21,5 → √21,5 ≈ 4,64).

---

## 💻 Elkészített Komponensek

1. **`StatMeasuresFigures.tsx`**:
   - `StockPricesSvg`: a két részvény árfolyama vonaldiagramon.
   - `ReturnsBarSvg`: az éves hozamok oszlopdiagramja az 5%-os átlaggal.
   - `DeviationTableSvg`: eltérések és eltérésnégyzetek táblázata, σ_A és σ_B.
   - `StdDevStepsSvg`: a szórás kiszámításának 4 lépése.
   - `VolleyballHeightsSvg`: a röplabdacsapat testmagasságainak gyakorisági diagramja.
2. **`StatMeasuresTheory.tsx`**: bevezető, jellemzők táblázata, kidolgozott feladat, további tankönyvi feladatok, relatív szórás, csapda.
   - **I. Laboratórium:** adatsor-szerkesztő – tetszőleges adatsor, élő átlag, medián, módusz, terjedelem, σ², σ, relatív szórás és pontdiagram x̄ ± σ sávval.
   - **II. Laboratórium:** két részvény hozamai csúszkákkal – átlag, szórás, relatív szórás és döntés a kockázatról.
3. **`StatMeasuresMatcher.tsx`**: 3 szint × 8 pár (fogalmak; adatsor–szórás; feladateredmények).
4. **`StatMeasuresSorter.tsx`**: 3 szint × 3 kategória × 9 elem (átlag/módusz/terjedelem; σ = 0/3/5; a szórás változása).
5. **`StatMeasuresQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 14 kérdésábrával, 3 puskakártyával.
- `statKit.tsx`: belső rajzsegédek (nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-stat-jellemzok-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic3StatMeasures.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
