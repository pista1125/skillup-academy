# 15. Ráadás – Visszatevéssel vagy anélkül? (tankönyv „Ráadás”, 202–205. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 202–205. oldal; a lapok fejlécében „64. lecke – Visszatevéssel vagy anélkül?”) alapján kidolgozott oktatási modul. A diákzónában az V. fejezet (Statisztika és valószínűségszámítás) 15. leckéje, a 16. (Gyakorlás, tudáspróba) előtt.

---

## 🎯 Tananyag Áttekintés

Ugyanazt a kérdést kétféle mintavétellel válaszoljuk meg, és összevetjük az eredményeket:
- **visszatevéssel:** minden húzás ugyanaz a kísérlet, p állandó ⇒ **binomiális eloszlás**: P(k) = (n alatt k) · pᵏ · (1 − p)ⁿ⁻ᵏ;
- **visszatevés nélkül:** kedvező / összes: P(k) = (S alatt k) · (N − S alatt n − k) / (N alatt n).

A két eredmény eltér, de nem nagyon – és minél népesebb a sokaság a mintához képest, annál kisebb az eltérés. Ezért (pl. közvélemény-kutatásnál) az olcsóbb visszatevéses mintavétel is megfelelő.

---

## 📐 Kidolgozott feladat és feladatok (node-dal ellenőrizve)

### Kidolgozott feladat (202. o.)
50 munkadarab, 20 selejtes (40%), 15-öt vizsgálnak; P(5, 6 vagy 7 selejtes):
- a) visszatevéssel: (15 alatt 5) · 0,4⁵ · 0,6¹⁰ + (15 alatt 6) · 0,4⁶ · 0,6⁹ + (15 alatt 7) · 0,4⁷ · 0,6⁸ ≈ 0,186 + 0,207 + 0,177 ≈ **0,57**;
- b) visszatevés nélkül: [(20 alatt 5)(30 alatt 10) + (20 alatt 6)(30 alatt 9) + (20 alatt 7)(30 alatt 8)] / (50 alatt 15) ≈ **0,65**.

### Feladatok (203. o.)
- **1.** Metró, p = 0,92, 50 utas: a) 0,92⁵⁰ ≈ 0,0155; b) 0,08⁵⁰ ≈ 1,4 · 10⁻⁵⁵ ⇒ a főnök (5%-os határ) **egyiket sem** fogadja el.
- **2.** 60 utas, 12 tanulóbérletes, 10 ellenőrzés. Visszatevéssel k = 0…6: 0,107; 0,268; 0,302; 0,201; 0,088; 0,026; 0,006. Visszatevés nélkül: 0,087; 0,267; 0,330; 0,215; 0,081; 0,018; 0,002 (a tankönyv megadott értékei egyeznek). b) Bence legfeljebb egyszer: (59/60)¹⁰ + 10 · (1/60)(59/60)⁹ ≈ **0,989**.
- **3.** Balkezesek, p = 0,11, 17 fő: P(0…6) ≈ 0,1379; 0,2898; 0,2865; 0,1771; 0,0766; 0,0246; 0,0061. c) 3 balkezes egyáltalán nem szokatlan. d) P(1 ≤ k ≤ 4) ≈ **0,830**.
- **4.** Tomi zsákja (4 maszlag, 2 pók, 2 tök, 3 mandragóra, 1 galóca = 12): a) 56/220 = 14/55 ≈ 0,255; b) 1 − (2/3)⁴ = 65/81 ≈ 0,802; c) (1 + x)/(12 + x) > 0,3 ⇒ **x = 4**; d) egyszerre 3, pontosan 2 mandragóra: 27/220 ≈ 0,123 < visszatevéssel 3, legalább 2: 10/64 ≈ 0,156.

### Házi feladatok (204. o.)
- **1.** 24 jelentkező (15 tizenkettedikes, 9 tizenegyedikes), 3 kisorsolt: a) csak a visszatevés nélküli modell pontos; b) 455/2024 ≈ 0,225; c) 945/2024 ≈ 0,467.
- **2.** 60 néző, 12 barát, 5 játékos: a) ≈ 0,209; b) ≈ 0,259.
- **3.** LEGO: 64 csomag, 4 űrhajós, 5 vásárolt: a) (4 alatt 2)(60 alatt 3) / (64 alatt 5) ≈ 0,027; b) (60 alatt 5) / (64 alatt 5) ≈ 0,716.

### Ráadás (204–205. o.)
250 fő, 30% nyugdíjas, 20 könyvutalvány: a két eloszlás (visszatevés nélkül / visszatevéssel) már 250 főnél is közel van (pl. k = 6: 0,1998 és 0,1916), 2500 főnél szinte egybeesik (0,1924 és 0,1916).

> **⚠️ CSAPDA:** ha valakit csak egyszer lehet kiválasztani (sorsolás 24 diák közül), a (15/24)³ ≈ 0,244 csak közelítés; a pontos érték (15 alatt 3)/(24 alatt 3) ≈ 0,225.

> Megjegyzés: a 2. feladat táblázatának hiányzó értékeit és a Ráadás oszlopdiagramjait a modul saját számolással (pontos képletekkel) állítja elő. A Labor II „ismétlődés” része (20 utalvány 250 fő közt visszatevéssel: valaki legalább kettőt nyer ≈ 0,54) a tankönyvi megjegyzés kiegészítése.

---

## 💻 Elkészített Komponensek

1. **`ReplacementComparisonFigures.tsx`**:
   - Segédek: `rcBinom`, `rcBinomialP`, `rcHyperP` (logaritmusos, nagy N-re is), `rcFmt`, `ReplacementComparisonBars` (csoportosított oszlopdiagram, szimulált karikákkal).
   - `ReplacementComparisonQualitySvg`: a kidolgozott feladat 50 munkadarabja és a két eredmény (0,57 / 0,65).
   - `ReplacementComparisonModelsSvg`: a két urnamodell egymás mellett.
   - `ReplacementComparisonBusSvg`: 60 utas, 10 ellenőrzés – két eloszlás.
   - `ReplacementComparisonLeftHandedSvg`: balkezesek a 17 fős csoportban.
   - `ReplacementComparisonVoucher250Svg`, `ReplacementComparisonVoucher2500Svg`: a Ráadás könyvutalvány-sorsolásai.
   - `ReplacementComparisonPotionSvg`: Tomi zsákja.
2. **`ReplacementComparisonTheory.tsx`**: kidolgozott feladat, modell-összevetés, nagy populáció, tankönyvi és házi feladatok, csapda.
   - **I. Laboratórium – a két eloszlás egymás mellett:** N, arány és n csúszkával, élő csoportosított diagram, legnagyobb eltérés, 1000 / 10 000 szimulált mintavétel mindkét módon, tankönyvi előbeállítások.
   - **II. Laboratórium – intervallum-valószínűség és ismétlődés:** P(a ≤ k ≤ b) mindkét modellel és a különbség; visszatevéses mintavételnél az ismétlődés valószínűsége.
3. **`ReplacementComparisonMatcher.tsx`**: 3 szint × 8 pár (fogalmak; urnás valószínűségek; tankönyvi eredmények).
4. **`ReplacementComparisonSorter.tsx`**: 3 szint × 3 kategória × 9 elem (melyik modell; valószínűség nagysága; melyik modell ad nagyobbat).
5. **`ReplacementComparisonQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), kérdéstípus-címkékkel, urna-, sokaság-, zsák- és oszlopdiagram-ábrákkal, 3 puskakártyával (progress id: `g11-stat-visszatevessel-vagy-anelkul-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic5ReplacementComparison.test.tsx` fájlban található: a 4 komponenst, mind a 7 SVG ábrát és a kidolgozott feladat valószínűségeit ellenőrzi.
