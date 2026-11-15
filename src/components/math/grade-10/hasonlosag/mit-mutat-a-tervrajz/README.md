# 5. Ráadás – Mit mutat a tervrajz?

## Tananyag Áttekintés
Mérnöki tervrajzok, méretarányok ($1 : N$ kicsinyítés, $N : 1$ nagyítás, $1 : 1$ természetes nagyság), gépészeti kótázási szabályok (méretek milliméterben), a Gyulai Várfürdő Lovarda épületének fa tető tartóváza (kerekítési anomáliák és a 181° magyarázata), a medence egyenes fektetett trapéz alapú hasábjának geometriája és víztérfogata ($V = 364\text{ m}^3$), térképi területszámítás és vonalas mérték.

---

## Fő Fogalmak és Összefüggések

- **Méretarány és kótázás:**
  - $M = 1 : 100 \implies$ rajzbeli 1 cm = valóságos 1 m (100 cm).
  - Gépészeti és építészeti rajzokon a méretalapegység a **milliméter (mm)**; a mértékegységet nem írják ki a rajzon.
  - **Kótabölcsesség:** A tervrajzra nyomtatott kótaszám mindig a készítendő valós darab méretét jelenti, függetlenül a lap tényleges nyomtatási vagy fénymásolási méretétől.
  - Nagyító méretarány: $N : 1$ (pl. $5 : 1$ mikrocsipekhez, óraalkatrészekhez).

- **Gyulai Várfürdő Lovarda fa tartóváza (116. oldal):**
  - Gerendák méretei mm-ben: 13 036 mm ($= 13{,}036\text{ m}$), 7113 mm, 6523 mm, 7664 mm.
  - Belső szögek összege a tervrajzon: $24^\circ + 24^\circ + 133^\circ = 181^\circ$. Ennek oka a tervezői kerekítés: a milliméteres méretek a pontosak, a szögeket a kivitelezéshez egész fokra kerekítették, így a kerekítési hibák összeadódtak.

- **Lovarda úszómedence geometriája (117. oldal 2. feladat):**
  - Méretek: hosszúság 20 m, szélesség 13 m, mélység 1,2 m – 1,6 m (egyenletesen mélyül).
  - **Hasábmodell (Bence vs. Jocó vita):** Egyenes, fektetett trapéz alapú hasáb! A két párhuzamos hosszanti oldalfal derékszögű trapéz ($T_{\text{trapéz}} = \frac{1{,}2 + 1{,}6}{2} \cdot 20 = 28\text{ m}^2$), a hasáb magassága a medence 13 m-es szélessége.
  - **Teljes víztérfogat:** $V = 28\text{ m}^2 \cdot 13\text{ m} = 364\text{ m}^3$ (364 000 liter).
  - **Ferde fenéklemez hossza:** Pitagorasz-tétellel $\sqrt{20^2 + 0{,}4^2} \approx 20{,}004\text{ m}$.

- **Térképi mérések és makettek:**
  - Távolság: $\text{Valóság} = \text{Rajz} \cdot N$.
  - Terület: $\text{Valóság} = \text{Rajz} \cdot N^2$ (pl. $1 : 50\,000$ térképen $4\text{ cm}^2 = 100\text{ ha}$).
  - Tömör makett tömege: $\text{Makett} = \text{Valóság} / N^3$ (azonos anyagsűrűség esetén).
  - Vonalas mérték: fénymásolás-biztos grafikus lépték a térkép szélén.

---

## Elkészült Komponensek és Források

A tananyag és a feladatok a hivatalos **OH-MAT10TA/II** tankönyv Ráadás leckéjének (116–117. oldal) és az **OH-SNE-MAT10M-2** munkafüzetnek a feldolgozásával készültek:

1. **`BlueprintFigures.tsx`**:
   - `RoofTrussGyulaSvg`: A Gyulai Várfürdő Lovarda épületének fa tartóváza méretekkel (13 036, 7113, 7664, 6523 mm, 24°, 65°, 133° szögek, $1 : 100$ jelölés).
   - `PoolGeometrySvg`: A 20 m × 13 m-es, 1,2 m – 1,6 m mély úszómedence 3D axonometriája és fektetett trapéz alapú hasábja ($V = 364\text{ m}^3$).
   - `ScaleBarMapSvg`: Vonalas mértékek és számszerű méretarányok ($1:100$ és $1:50\,000$).
   - `EngineeringDimensioningSvg`: Gépészeti méretháló, kótázási szabályok, mm alapegység.
   - `ScaleReductionEnlargementSvg`: Kicsinyítés ($1 : 100$) vs. Nagyítás ($5 : 1$) alkalmazása.

2. **`BlueprintTheory.tsx`**:
   - **Laboratórium I:** Interaktív Tervrajzi Méretarány & Terület Kalkulátor (választható 7-féle skála, állítható távolság és terület, valós m/km és m²/ha átszámítás).
   - **Laboratórium II:** Lovarda Építészeti és Vízgépészeti Szimuláció (Úszómedence hasáb és víztérfogat állítható mélységekkel, Tartóváz szögelemzés és táblázat, 1:200 kiterített háló).
   - 5 részletes fejezet, érettségi buktatók (`TheoryTrapBox`), mérnöki kódex (`quickRule`) és PDF export.

3. **`BlueprintMatcher.tsx`**:
   - 3 nehézségi szint $\times$ 8 pár = **24 kártyapár** (méretarányok, Gyulai Lovarda adatai, térképi és makett összefüggések).

4. **`BlueprintSorter.tsx`**:
   - 3 szintű csoportosító játék:
     - 1. szint: Méretarány típusok (Kicsinyítés, Természetes nagyság, Nagyítás).
     - 2. szint: A Lovarda medence felületei (Derékszögű trapéz, Téglalap / ferde téglalap, Nem határoló).
     - 3. szint: Állítások méretarányokról és tervrajzokról (Mindig igaz, Feltételes, Hamis).

5. **`BlueprintQuiz.tsx`**:
   - 3 nehézségi szint $\times$ 10 feladat = **30 válogatott feladat** részletes magyarázatokkal a tankönyvi Lovarda-projektre és mérnöki tervrajzokra építve.
   - 3 beépített CheatSheet kártya és közvetlen játékmód-váltás.
