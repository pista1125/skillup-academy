# Ráadás: Milyen magas a torony? (a 6. lecke utáni Ráadás, 22–23. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 22–23. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

Sík vidéken, egy folyó közelében álló torony magasságát (AB) kell megállapítani, de csak a folyó túlsó partján lehet mérni – a talppontot nem érjük el. A megoldás **két derékszögű háromszög** a térben: egy a **vízszintes síkban** (AKL, derékszög K-nál), egy a **függőleges síkban** (AKB, derékszög A-nál). A lecke további feladatai is térbeli derékszögű háromszögekre épülnek (LED-lámpák, háztető, téglatest, kocka, tetraéder).

---

## 📐 Kidolgozott feladatok

- **1.** A toronnyal szemközti K pontból AKB∢ = 32°, ezért AB = AK · tg 32°. AK-ra merőlegesen 250 m-t megyünk az L pontba, ott ALK∢ = 36°. Az ALK derékszögű háromszögből $AK = 250 \cdot \text{tg}\,36° \approx 182$ m, így $AB = AK \cdot \text{tg}\,32° \approx 114$ m.
- **2.** Az AB függőleges, ezért merőleges az AL egyenesre is: az LAB háromszög derékszögű. $AL = 250 : \cos 36° \approx 309$ m, $\text{tg}\,\lambda = 114/309 \approx 0{,}369$ ⇒ $\lambda \approx 20°$.

### Tankönyvi feladatok
- **1. a)** A KL felezőpontjából: AM = √(182² + 125²) ≈ 220,5 m ⇒ ≈ 27,2°. **1. b)** 15°-os látószöghöz A-tól ≈ 423,6 m kell, ez K-tól a parton ≈ 383 m.
- **2.** LED-lámpák 40 cm magasan: 40°-os ⇒ ≈ 29,1 cm, 110°-os ⇒ ≈ 114,3 cm átmérőjű kör; 80 cm-es asztalhoz 0,6 m-ről legalább ≈ 67,4°-os világítási szög kell.
- **3.** Gúla alakú tető 10 m × 10 m-es alapon, 40°-os oldallapokkal: h ≈ 4,2 m, tetőfelület ≈ 130,5 m², oldalél ≈ 8,2 m, hajlásszöge ≈ 30,7°; két szomszédos oldalél ≈ 74,9°-ot, két szemközti a csúcsnál ≈ 118,6°-ot zár be.
- **4.** Téglatest (3,2 m; 6,9 m; 8,4 m): testátló ≈ 11,33 m, a lapokkal ≈ 16,4°, ≈ 37,5°, ≈ 47,8°.
- **5.** Kocka (él 3,2 cm): az ABC háromszög B-nél derékszögű, oldalai 3,2; ≈ 4,53; ≈ 5,54 cm; a testátló és a fedőlap szöge ≈ 35,3°.
- **6.** Szabályos tetraéder: oldalél és magasság ≈ 35,3°, oldalél és alaplap ≈ 54,7°.
- **HF 1.** Szemmagasság 6 m, fa alja 10°-os depressziószögben, teteje 22°-os emelkedési szögben ⇒ távolság ≈ 34,0 m, fa ≈ 19,7 m.
- **HF 2.** 76°-os spotlámpa 260 cm magasan ⇒ ≈ 13,0 m²; legfeljebb 8 m²-hez legfeljebb ≈ 2,04 m magasan.
- **HF 3.** A kocka A csúcsa és a fedőlap F középpontja: a fedőlappal és az alaplappal ≈ 54,7°, az oldallapokkal ≈ 24,1°.
- **HF 4.** K-ból 28°, a 250 m-re lévő L-ből 18°, AKL∢ = 90° ⇒ $AL^2 = AK^2 + 250^2$ ⇒ a torony ≈ 102,6 m.
- **Ráadás:** a Szabadság-szobor (47 m-es talapzat, 46 m-es szobor) kb. $\sqrt{47 \cdot 93} \approx 66$ m-ről látszik a legnagyobb, ≈ 19,2°-os szögben.

> **⚠️ CSAPDA:** Az ALK∢ = 36° a vízszintes síkban mért szög, nem emelkedési szög. Az L-ből mért emelkedési szöghöz az AL ≈ 309 m kell, nem a KL = 250 m (a hibás tg λ = 114/250 ≈ 24,4°-ot adna).

---

## 💻 Elkészített Komponensek

1. **`TowerHeightTrigFigures.tsx`**:
   - `TowerPerspectiveSvg`: a mérés térben – folyó, torony, K és L pont, 32° és 36°.
   - `TowerTwoTrianglesSvg`: felülnézet (AKL △) és oldalnézet (AKB △).
   - `TowerFromLSvg`: az LAB derékszögű háromszög, λ ≈ 20°.
   - `LedLampSvg`: 40°-os és 110°-os LED-lámpa 40 cm magasan.
   - `PyramidRoofSvg`: gúla alakú háztető (h, oldalmagasság, x, α).
   - `CubeDiagonalSvg`: a kocka ABC háromszöge, testátló és fedőlap szöge.
   - Minden derékszög magyar jelöléssel (negyedkörív ponttal) szerepel.
2. **`TowerHeightTrigTheory.tsx`**: két kidolgozott feladat, térbeli feladatok, házi feladatok, Ráadás (Szabadság-szobor), csapda.
   - **I. Laboratórium:** toronymérés-szimulátor – KL, ALK∢, AKB∢ csúszkák, felül- és oldalnézet, élő AK, AB, AL, λ.
   - **II. Laboratórium:** látószög-kereső – távolságcsúszka, élő látószög és grafikon a maximummal.
3. **`TowerHeightTrigMatcher.tsx`**: 3 szint × 8 pár (fogalmak, toronymérés adatai, lámpák és testek).
4. **`TowerHeightTrigSorter.tsx`**: 3 szint × 3 kategória × 9 elem (tg / cos / sin; emelkedési / depresszió / vízszintes szög; igaz / hamis / adatfüggő).
5. **`TowerHeightTrigQuiz.tsx`**: 30 kérdés 3 szinten, 3 puskakártyával.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic1TowerHeightTrig.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
