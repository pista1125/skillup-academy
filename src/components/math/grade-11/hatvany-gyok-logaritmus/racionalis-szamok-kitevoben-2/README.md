# 4. Racionális számok a kitevőben II. (tankönyv 29. lecke, 90–91. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 90–91. oldal) alapján kidolgozott oktatási modul. A diákzónában a III. fejezet 4. leckéje.

---

## 🎯 Tananyag Áttekintés

**Bevezető:** a népességmodell N(t) = 6,98 · 1,011ᵗ (milliárd fő). 2011. június végétől 2012. február végéig 2/3 év telik el. Harmad évenként x = ∛1,011-szeres a növekedés, így 2/3 év alatt x²-szeres:

$$1{,}011^{\frac{2}{3}} = \left(\sqrt[3]{1{,}011}\right)^2 = \sqrt[3]{1{,}011^2} \approx 1{,}0073,$$

a népesség tehát kb. 6,98 · 1,0073 ≈ **7,031 milliárd** fő volt.

---

## 📐 Definíciók és azonosságok

> Ha **0 < a**, p és q pozitív egész szám, de q ≠ 1, akkor
> $$a^{\frac{p}{q}} = \left(a^{\frac{1}{q}}\right)^p = \left(\sqrt[q]{a}\right)^p = \sqrt[q]{a^p}.$$

Például 32^(3/5) = (⁵√32)³ = 2³ = 8.

> **A negatív törtkitevőjű hatvány egyenlő az ellentett kitevőjű hatvány reciprokával:** a^(−p/q) = 1 / a^(p/q).

Például 32^(−3/5) = 1/8, 81^(−1/2) = 1/9.

**Kidolgozott feladat:** a) 28^(1/3) · 28^(1/3) = (28^(1/3))² = 28^(2/3); b) 28^(2/3) · 28^(4/3) = (28^(1/3))² · (28^(1/3))⁴ = (28^(1/3))⁶ = 28^(6/3) = 28².

**Permanenciaelv:** pozitív a, b és racionális m, n esetén érvényes: aᵐ · aⁿ = aᵐ⁺ⁿ; aᵐ : aⁿ = aᵐ⁻ⁿ; (ab)ⁿ = aⁿbⁿ; (a/b)ⁿ = aⁿ/bⁿ; (aᵐ)ⁿ = aᵐⁿ. Példák: 8^(5/3) = (2³)^(5/3) = 2⁵ = 32; 6,25^(1/3) · 6,25^(1/6) = 6,25^(1/2) = 2,5.

- Negatív alapra nem értelmezzük: (−8)^(1/3) = −2 és (−8)^(2/6) = ⁶√64 = 2 ellentmondana egymásnak.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** 25^(3/2) = 125; 64^(3/2) = 512; 9^(3/2) = 27; 27^(2/3) = 9; 8^(5/3) = 32; 125^(4/3) = 625.
- **2.** (∛10)⁶ = 10²; 8^(1/3) · 8^(2/3) = 8; 16^(1/2) · 16⁻¹ = 16^(−1/2); 5^(5/7) · 5^(−5/7) = 5⁰; (1/9)^(−3/2) = 27.
- **3.** ¹⁵√(7⁶) = 7^(2/5) = ⁵√49 mintájára: ⁸√(6²) = ⁴√6; ²⁰√(3¹⁰) = √3; ³⁶√(7⁵⁴) = √(7³).
- **4.** 27^(4/3) = 81; 81^(3/4) = 27; 36^0,4 · 36^0,6 = 36; 5^1,8 · 25^(−0,4) = 5.
- **HF (válogatás):** 7^(2/5) · 7^(8/5) = 49; (225 · 196)^(1/2) = 210; (81/16)^(1/4) = 3/2.

> **⚠️ CSAPDA:** a negatív kitevő nem negatív előjel: 81^(−1/2) = 1/9, nem −9.

> Megjegyzés: a tankönyvi szövegkivonat 5. feladata és a HF egyes tételei (pl. HF 1. b, e, f; HF 2.) a forrásszövegben nem olvashatók egyértelműen, ezért a modul ezeket nem dolgozza fel.

---

## 💻 Elkészített Komponensek

1. **`RationalExponents2Figures.tsx`**:
   - `PopulationTwoThirdsSvg`: népességtáblázat harmad évenként, 1,011^(2/3) = (∛1,011)².
   - `TwoPathsSvg`: 32^(3/5) két úton (előbb gyök / előbb hatvány).
   - `NegativeFractionalSvg`: negatív törtkitevő = reciprok (32^(−3/5), 81^(−1/2), (1/9)^(−3/2)).
   - `IdentityTableSvg`: az öt azonosság racionális kitevőkre, példákkal.
   - `RootIndexReduceSvg`: gyökkitevő csökkentése (¹⁵√(7⁶) = ⁵√49).
2. **`RationalExponents2Theory.tsx`**: bevezető, definíciók, negatív alap ellentmondása, 1. feladat táblázata, kidolgozott feladat, permanenciaelv, tankönyvi feladatok, csapda.
   - **I. Laboratórium:** törtkitevő két úton (alap, p ∈ [−6; 6], q ∈ [2; 8]) – egyszerűsített kitevő, reciprok, pontos/közelítő érték.
   - **II. Laboratórium:** lépésenkénti egyszerűsítő 9 tankönyvi kifejezésre („Következő lépés” / „Teljes megoldás” / „Újra”).
3. **`RationalExponents2Matcher.tsx`**: 3 szint × 8 pár (gyökös alak; értékek; azonosságok).
4. **`RationalExponents2Sorter.tsx`**: 3 szint × 3 kategória (> 1 / = 1 / 0 és 1 között; melyik azonosság; egész / racionális / irracionális).
5. **`RationalExponents2Quiz.tsx`**: 30 kérdés 3 szinten, kérdéstípus-címkékkel, néhány ábrával, 3 puskakártyával (progress id: `g11-exp-tortkitevo-masodik-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic3RationalExponents2.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
