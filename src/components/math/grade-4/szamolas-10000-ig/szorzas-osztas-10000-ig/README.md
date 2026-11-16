# 12. Szorzás és osztás 10 000-ig (tankönyv 48–50. oldal, munkafüzet I. 40–43. oldal)

A magyar Oktatási Hivatal tankönyve (`OH-MAT04TA`, Matematika 4., 48–50. oldal) és munkafüzete (`OH-MAT04MA_I`, 40–43. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A lecke a **fejben végzett** szorzást és osztást tanítja a 10 000-es számkörben: szorzás és osztás 10-zel, 100-zal, 1000-rel (helyiérték-táblázatban a számjegyek balra/jobbra lépnek, nullák kerülnek a végére vagy tűnnek el), majd kerek tízesek, százasok szorzása és osztása egyjegyű és kerek számmal, a tényezők ügyes csoportosítása, a műveleti sorrend és szöveges feladatok.

---

## 📐 Fő tartalom

- **TK 48/1–5.:** Teó (10-es), Tóni (100-as), Tódi (1000-es) perselye; 9 · 10 = 90, 9 · 100 = 900, 9 · 1000 = 9000; 380 : 10 = 38, 1500 : 100 = 15, 9000 : 1000 = 9; Tádé 3 · 1000 = 3000; Lilla 1000 · 5 = Lelle 5 · 1000 = 5000 vízirózsa; a kétszeresére növő tavirózsa a 99. napon borítja be a tó felét.
- **TK 49/6–10.:** 4 · 800 = 8 · 400 = 3200 és a négy osztás (érmeképekről); gombák: 150 dkg = 15 gomba, 15 : 5 = 3 és 15 : 3 = 5; csoportosítás (4 · 25 · 21 = 2100, 39 · 50 · 2 = 3900, 2 · 250 · 2 · 9 = 9000); kerek számok (3 · 600, 70 · 40, 2400 : 60, 6400 : 80); nyitott mondatok.
- **TK 50/11–16.:** „Melyik számra gondoltam?” (2800, 2400, 700, 4500, 800, 30); szorzatpiramisok (a: A = 2, B = 5, C = 20, D = 200, E = 50, F = 10 000; b: G = 5, H = 2, I = 5, J = 10, K = 100, L = 10 000); műveleti sorrend (30 · 6 + 120 : 2 = 240; 10 000 − (300 · 30) = 1000); vásár (2000 : 200 = 10; 2500 : 500 = 5); drágakövek törtrészei (5000 + 400 + 900 + 700 + 100 = 7100).
- **MF 40–43.:** szorzás 10-zel, 100-zal, 1000-rel; Csodafalva távolsága (7 km); utcák, házak, lakók; szőlőtőkék (400-asával), must (3 · 700 = 2100 l); osztássorok (150 : 3, 150 : 30, 1500 : 3); perc → óra átváltás; hegyek (3300, 1700, 5000 m); állatok (2300 + 4600 + 2650 = 9550).

> **⚠️ CSAPDA:** Számold meg a nullákat! 70 · 40 = 2800 (nem 280), 2400 : 60 = 40 (nem 400). Műveleti sorrendnél előbb a szorzás és osztás: 30 · 6 + 120 : 2 = 240 (nem 150).

**Javítás a korábbi vázlathoz képest:** a régi README a leckét a tankönyvi tartalomtól függetlenül, címek alapján írta le; most a tankönyv és a munkafüzet valódi feladataira épül, LaTeX-jelölés nélkül.

---

## 💻 Elkészített Komponensek

1. **`MulDiv10000Figures.tsx`**:
   - `MultiplyShiftSvg`: 9 · 10, 9 · 100, 9 · 1000 a helyiérték-táblázatban.
   - `DivideShiftSvg`: 380 : 10, 1500 : 100, 9000 : 1000 a helyiérték-táblázatban.
   - `PiggyBanksSvg`: Teó, Tóni és Tódi perselye.
   - `CoinArraySvg`: 4 sor × 8 százas = 3200, a szorzás-osztás család.
   - `ProductPyramidSvg`: a kitöltött szorzatpiramis (10 000 a csúcson).
   - `MushroomBasketsSvg`: 15 gomba 5, illetve 3 kosárba osztva.
   - Segédelemek: `PlaceShiftTable`, `PiggyBank`, `CoinGrid`, `ProductPyramid`.
2. **`MulDiv10000Theory.tsx`**: perselyek, 10/100/1000-rel szorzás és osztás, kerek számok, kidolgozott példák (gombák, csoportosítás, szorzatpiramis, műveleti sorrend), csapda.
   - **I. Labor:** vándorló nullák – szám és művelet (· / : 10, 100, 1000) kiválasztása, saját válasz ellenőrzése, a számjegyek lépése a helyiérték-táblázatban.
   - **II. Labor:** szorzás-osztás család – érmerács (sorok, érmék soronként, érme értéke) és a hozzá tartozó 2 szorzás + 4 osztás, egy hiányzó eredmény beírásával.
3. **`MulDiv10000Matcher.tsx`**: 3 szint × 8 pár (10/100/1000; kerek számok; „Melyik számra gondoltam?”).
4. **`MulDiv10000Sorter.tsx`**: 3 szint × 3 kategória (eredmény nagysága; azonos szorzatok 3600/2400/4800; 40/400/4000).
5. **`MulDiv10000Quiz.tsx`**: 30 kérdés 3 szinten (10/10/10), ábrákkal, 3 puskakártyával. Azonosító: `g4-count-szorzas-10000-quiz`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic1MulDiv10000.test.tsx` (4 komponens, 6 ábra, kérdésszám és -szerkezet).
