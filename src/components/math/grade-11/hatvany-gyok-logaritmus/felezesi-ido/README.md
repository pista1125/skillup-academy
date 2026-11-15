# 34. Felezési idő (34. lecke, 100–101. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 100–101. oldal) alapján kidolgozott oktatási modul. A diákzónában: **III. fejezet, 9. Felezési idő**.

---

## 🎯 Tananyag Áttekintés

A lecke egy hétköznapi helyzettel indul: apa délben lázcsillapítót vett be, és amíg a gyógyszer ki nem ürül, nem ihat bort. A kidolgozott feladatban a hatóanyag mennyisége t óra múlva **m(t) = m₀ · 0,83ᵗ** (m₀ = 500 mg metamizol-nátrium). A 250 = 500 · 0,83ᵗ egyenletből 0,5 = 0,83ᵗ adódik, amelyet **behelyettesítéssel, táblázatos közelítéssel** oldunk meg (0,83³ ≈ 0,572; 0,83⁴ ≈ 0,474; 0,83^3,7 ≈ 0,502; 0,83^3,8 ≈ 0,493; 0,83^3,72 ≈ 0,500) ⇒ **t ≈ 3,72 óra**. A 300 mg-os tablettánál ugyanez az egyenlet és ugyanez az idő jön ki – ebből születik a felezési idő fogalma.

*(Logaritmust ez a lecke még nem használ; a következő leckében vezetjük be.)*

---

## 📐 Fő Fogalmak

- **Felezési idő (T):** az időben exponenciálisan csökkenő mennyiségeknél az az időtartam, amely alatt a vizsgált mennyiség a kezdeti érték felére csökken.
- **Megjegyzések:** T a folyamatra jellemző állandó, nem függ a kezdeti értéktől; különösen fontos a radioaktivitás vizsgálatakor.
- **Grafikon:** ha t-ben k az érték, akkor t + T-ben k/2, t + 2T-ben k/4, t + 3T-ben k/8.
- n felezési idő után 1/2ⁿ rész marad; képlettel m(t) = m₀ · (1/2)^(t/T); m₀ · qᵗ esetén q^T = 0,5.

### Tankönyvi feladatok (node-dal ellenőrzött eredmények)
- **1. a)** Déltől este 7-ig (7 óra): 0,83⁷ ≈ 0,271 ⇒ **≈ 27,1%** marad. **b)** A hétórai mennyiséghez képest is ≈ **3,72 óra** alatt feleződik. **c)** 500 · 0,83ᵗ < 5: 24 óránál 5,71 mg, 25 óránál 4,74 mg ⇒ **kb. 25 óra** (≈ 24,7 óra). **d)** Nyolcadára 3T ≈ **11,16 óra**, tizenhatodára 4T ≈ **14,88 óra**.
- **2.** Szerszámgép, T = 4,5 év: 12,5% = 1/8 ⇒ **13,5 év**.
- **3.** a) f(t) = 340 · (1/2)ᵗ ⇒ **T = 1 óra**; b) g(t) = 2,4 · (1/2)^(t/3) ⇒ **T = 3 óra**; c) h(t) = 54 · 2^(−5t) ⇒ **T = 0,2 óra = 12 perc**.
- **4.** ¹⁴C (T = 5730 év): 6 · 10¹² → 3,75 · 10¹¹ a 16-od rész = 4 felezés ⇒ **22 920 év**.
- **HF 1.** M(t) = 58 · 0,9ᵗ: M(0) = 58, T ≈ 6,58 (0,9⁶ ≈ 0,531; 0,9⁷ ≈ 0,478).
- **HF 2.** Jód-131 (T ≈ 8 nap), cézium-137 (T ≈ 30 év). a) 0,5% alá ≈ 7,64 felezés után: jód ≈ 61 nap, cézium ≈ 229 év (egész felezésekkel: 8 felezés = 64 nap, ill. 240 év). b) 4 év után: jód gyakorlatilag 0% (≈ 10⁻⁵⁵ rész), cézium ≈ 91,2%.
- **HF 3.** M(t) = 28,9 · 2^(−t/8): M(0) = 28,9, T = 8.

> **⚠️ CSAPDA:** A felezés nem egyenletes fogyás: két felezési idő után nem fogy el a mennyiség, hanem a negyede marad (100 → 50 → 25). Minden felezési idő alatt a *megmaradt* mennyiség feleződik.

*Megjegyzés: a HF 2. a) feladatban a „kevesebb mint 0,5%” határt pontosan ≈ 7,64 felezési idő után éri el a mennyiség; a megoldás mindkét értelmezést (pontos érték / egész számú felezés) megadja.*

---

## 💻 Elkészített Komponensek

1. **`HalfLifeFigures.tsx`**:
   - `HalfLifeDrugSvg`: m(t) = 500 · 0,83ᵗ grafikonja, 250, 125, 62,5 mg a T, 2T, 3T helyeken.
   - `HalfLifeTableSvg`: a 0,5 = 0,83ᵗ egyenlet táblázatos közelítése három lépésben.
   - `HalfLifeGraphSvg`: a tankönyvi elméleti grafikon (k, k/2, k/4, k/8; t, t + T, t + 2T, t + 3T).
   - `HalfLifeCarbonSvg`: a ¹⁴C atomok számának feleződése 6 · 10¹²-ről 3,75 · 10¹¹-re.
   - `HalfLifeIsotopeSvg`: a jód-131 és a cézium-137 feleződésének összehasonlítása.
2. **`HalfLifeTheory.tsx`**: kidolgozott feladat (lázcsillapító, a/b), a felezési idő fogalma és megjegyzései, táblázat, feladatmegoldások (1–4., HF 1–3.), csapda.
   - **I. Laboratórium:** bomlás-szimulátor – tankönyvi előbeállítások (lázcsillapító, szén-14, jód-131, cézium-137, szerszámgép), eltelt idő csúszkával (0–6T), élő görbe, megmaradt mennyiség és százalék.
   - **II. Laboratórium:** a felezési idő keresése lépésenként – q csúszka, „Következő lépés” gomb, a q^t = 0,5 egyenlet megoldásának intervallumfelezéses szűkítése (a tankönyv behelyettesítéses módszere).
3. **`HalfLifeMatcher.tsx`**: 3 szint × 8 pár (felezések száma ↔ százalék; képlet ↔ T; alkalmazás ↔ eredmény).
4. **`HalfLifeSorter.tsx`**: 3 szint × 3 kategória × 9 elem (csökkenő / növekvő / nem exponenciális; T nagysága; megmaradt rész).
5. **`HalfLifeQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), minden kérdésen típus-címke, 8 kérdésen ábra, 3 puskakártya (progress id: `g11-exp-felezesi-ido-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic3HalfLife.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
