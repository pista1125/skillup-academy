# 8. Exponenciális folyamatok (tankönyvi 33. lecke, 98–99. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 98–99. oldal) alapján kidolgozott oktatási modul. A diákzónában a III. fejezet 8. része.

---

## 🎯 Tananyag Áttekintés

Az időben lejátszódó folyamatok leírásakor olyan függvényeket használunk, amelyek értelmezési tartománya az eltelt idő mérőszámait tartalmazza. Bevezető példa: a bankba tett 250 ezer Ft évi 4%-os kamatos kamattal t év múlva **250 · 1,04ᵗ** ezer Ft (értelmezési tartomány: N egy részhalmaza). Mivel az alap az x ↦ 1,04ˣ növekedő exponenciális függvény, a pénz **exponenciálisan növekszik**.

---

## 📐 Fő Fogalmak

- **Exponenciális változás:** ha egy mennyiség időbeli változását a t ↦ N₀ · kᵗ (N₀, k > 0, k ≠ 1, t valós) függvény adja meg. Növekedő függvény: exponenciális **növekedés**; csökkenő: exponenciális **csökkenés**.
- **N₀ – kezdeti érték:** a t = 0 helyen (a vizsgálat kezdetén) felvett érték.
- **k – növekedési tényező:** egységnyi idő alatt hányszorosára változik a mennyiség. 1 < k: szigorúan monoton növekvő; 0 < k < 1: szigorúan monoton csökkenő.
- **Példák:** E(t) = 0,38 · 1,22ᵗ növekvő; F(t) = 5,67 · 0,79ᵗ csökkenő; G(t) = 3,8 · 1,25⁻ᵗ csökkenő, mert 1,25⁻ᵗ = (1,25⁻¹)ᵗ = 0,8ᵗ.

### Tankönyvi feladatok (node-dal ellenőrzött eredmények)
- **1.** 4ᵗ: k = 4 (növekvő); 4⁻ᵗ: k = 1/4 (csökkenő); 4^{2t}: k = 16 (növekvő); 4^{t/2}: k = 2 (növekvő).
- **2.** a) 6,2 · 1,15ᵗ: N₀ = 6,2, k = 1,15 ↑; b) 6,2 · 1,15^{−2t}: k = 1,15⁻² ≈ 0,756 ↓; c) 10²³ · (1/2)^{4t}: k = 1/16 ↓; d) 6 · 10²³ · 2^{3t}: k = 8 ↑; e) 3,8 · 0,8⁻ᵗ: k = 1,25 ↑; f) 2,1 · 5^{−1,2t}: k = 5^{−1,2} ≈ 0,145 ↓.
- **3.** Baktériumok (120 millió → 180 millió 1 óra alatt): a) N(t) = 120 · 1,5ᵗ millió; b) N(3) = 405 millió, N(0,5) ≈ 147 millió; c) N(−3) ≈ 35,6 millió.
- **4.** Népesség évi −0,2% (2001–2011): **B** és **C** helyes; A hibás (a százalékok nem adódnak össze, 0,998⁵ ≈ 0,99004); D hibás (visszafelé 1/0,998 ≈ 1,002004-del, nem 1,002-del kell szorozni). *(A kivonatban a D állítás „1,0025-szerese” alakban olvasható; ezt 1,002⁵-ként értelmeztük.)*
- **HF 1.** a) 2,25 · 5⁻ᵗ: N₀ = 2,25, k = 0,2; b) 3 · 10²³ · 0,4⁻ᵗ: k = 2,5; c) 0,0134 · 0,5^{2t}: k = 0,25; d) 1270 · 0,3^{t/2}: k = √0,3 ≈ 0,548. *(A c) kitevő a kivonatban „0,52t”; 0,5^{2t}-ként értelmeztük.)*
- **HF 2.** 360 000 → 345 000 egy óra alatt: N(t) = 360 000 · (23/24)ᵗ; N(3,5) ≈ 310 178.
- **HF 3.** Város: 20 · 1,026ᵗ ezer fő. a) 2000: ≈ 260,5 ezer; b) 1920: ≈ 33,4; 1940: ≈ 55,8; 1960: ≈ 93,3; 1980: ≈ 155,9 ezer; c) lineárisan (≈ 2,405 ezer fő/év): 68,1; 116,2; 164,3; 212,4 ezer; e) 400 ezer fő: t ≈ 116,7 ⇒ 2017 körül.

> **⚠️ CSAPDA:** A növekedési tényezőt csak N₀ · kᵗ alakból lehet leolvasni: 1,15^{−2t} = (1,15⁻²)ᵗ ≈ 0,756ᵗ csökkenő, 4^{2t} = 16ᵗ. Exponenciális folyamatban egységnyi idő alatt ugyanannyiszorosára (nem ugyanannyival) változik a mennyiség.

---

## 💻 Elkészített Komponensek

1. **`ExponentialProcessesFigures.tsx`**:
   - `ExponentialProcessesBankSvg`: 250 · 1,04ᵗ egész éveknél (diszkrét értelmezési tartomány).
   - `ExponentialProcessesGrowthDecaySvg`: E(t) = 0,38 · 1,22ᵗ és F(t) = 5,67 · 0,79ᵗ, kezdeti értékekkel.
   - `ExponentialProcessesBacteriaSvg`: N(t) = 120 · 1,5ᵗ a t = −3; 0; 0,5; 1; 3 pontokkal.
   - `ExponentialProcessesPopulationSvg`: 2001 → 2006 → 2011, ×0,998⁵ és ×0,998⁻⁵.
   - `ExponentialProcessesCitySvg`: a város lakossága exponenciális és lineáris modellel.
2. **`ExponentialProcessesTheory.tsx`**: bevezető, elmélet (kezdeti érték, növekedési tényező), 1–2. feladat táblázatban, baktériumok és népesség, házi feladatok, csapda.
   - **I. Laboratórium:** modell két mérésből – N₀ és N₁ ⇒ k, idő csúszka (negatív időre is), grafikon, kettőződési/feleződési idő, előbeállítások (baktériumok, HF 2., bank, népesség).
   - **II. Laboratórium:** exponenciális vs. lineáris növekedés – évi % és küszöb csúszka, közös grafikon, táblázat 20 évenként, a küszöb elérésének éve mindkét modellben.
3. **`ExponentialProcessesMatcher.tsx`**: 3 szint × 8 pár (növekedési tényező; átírás N₀ · kᵗ alakba; alkalmazások).
4. **`ExponentialProcessesSorter.tsx`**: 3 szint × 3 kategória × 9 elem (növekvő / csökkenő / lineáris; k tartománya; helyes / hibás / csak közelítőleg igaz gondolatmenet).
5. **`ExponentialProcessesQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), minden kérdésen típus-címke, 7 kérdésen ábra, 3 puskakártya (progress id: `g11-exp-exponencialis-folyamat-quiz`; matcher: `…-matcher`, sorter: `…-sorter`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic3ExponentialProcesses.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
