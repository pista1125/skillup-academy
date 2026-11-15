# 27. Számok n-edik gyöke (27. lecke, 84–87. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 84–87. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A lecke kocka élének kiszámításával indul: felszínből (6a² = 294 ⇒ a = 7 cm; 6a² = 102 ⇒ a = √17 ≈ 4,12 cm) és térfogatból (a³ = 64 ⇒ a = 4 cm; a³ = 45 ⇒ a = ∛45 ≈ 3,56 cm, mert 3,5³ < 45 < 3,6³). A harmadik kidolgozott feladat a népességstatisztika Pₙ = P₀(1 + r)ⁿ képletével Magyarország átlagos évi népességfogyását határozza meg 2001 és 2021 között: (1 + r)²⁰ ≈ 0,95 ⇒ 1 + r = ²⁰√0,95 ≈ 0,9974 ⇒ **≈ 0,26% fogyás évente**. Ehhez kell a 20. gyök – így jutunk az n-edik gyök általános fogalmához.

*(A gyökvonás azonosságai ebben a leckében még nem szerepelnek.)*

---

## 📐 Fő Fogalmak

- **Páros gyökkitevő:** ha a ≥ 0 és n > 1 páros, akkor ⁿ√a az a **nemnegatív** valós szám, amelynek n-edik hatványa a. (Páros kitevőjű hatvány sosem negatív, ezért negatív számnak nincs páros gyöke.) Pl. ⁴√81 = 3, ⁶√0,015625 = 0,5.
- **Páratlan gyökkitevő:** tetszőleges valós a és páratlan n > 1 esetén ⁿ√a az a valós szám, amelynek n-edik hatványa a. Pl. ∛−216 = −6, ⁵√−0,03125 = −0,5, ⁷√128 = 2.
- **Megjegyzések:** a az alap, n a gyökkitevő (n ∈ N⁺ \ {1}); ²√64 helyett √64 = 8; ∛64 = 4 („köbgyök”); ⁿ√0 = 0.
- Számológépen: `ˣ√` vagy `x^(1/y)` gomb.

### Tankönyvi feladatok (node-dal ellenőrzött eredmények)
- **1.** √100 = 10; ∛−1000 = −10; ∛1 000 000 = 100; ⁶√1 000 000 = 10; ∛1 = 1; ∛−125 = −5; ¹⁰√1024 = 2; ⁴√625 = 5; ∛0,001 = 0,1; ∛(27/8) = 3/2; ⁴√(1/16) = 1/2.
- **2.** ∛a: 2,15; 3,91; 4,93; 9,73; 10; 21,54 — ⁴√a: 1,78; 2,78; 3,31; 5,51; 5,62; 10 (a = 10; 60; 120; 920; 1000; 10 000).
- **3.** Bűvös kocka V = 216 cm³ ⇒ a = 6 cm ⇒ A = 216 cm².
- **4.** Hidroglóbusz V = 113 m³ ⇒ R = ∛(3V/(4π)) ≈ 3,00 m; burkolat A = 4πR² ≈ 113 m².
- **5.** Hollandia: a) 1950–2013 (10 → 16,78 millió): ≈ 0,82%/év; b) 2014–2021 (16,83 → 17,26 millió): ≈ 0,36%/év.
- **6.** KSH-táblázat hiányzó adatai: 1920 ≈ 7987 ezer fő; 1960 ≈ 9961 ezer fő; az 1970-es sor hiányzó %-a ≈ 0,369%. *(A megadott adatokból visszaszámolva a %-os érték a sor évétől a következő adatig tartó időszakra vonatkozik, bár a fejléc „az előző adathoz viszonyítva” szöveget írja – ezt a lecke jelzi.)*
- **HF 1.** √0,49 = 0,7; ⁴√256 = 4; ∛27 = 3; ⁵√(3⁴ · 3⁶) = 9; ∛1 = 1 (a c) feladat a kivonatban „3 27”, ∛27-ként értelmeztük).
- **HF 2.** V = 42 cm³ ⇒ A = 6 · (∛42)² ≈ 72,50 cm² (a c) válasz).
- **HF 3. (érettségi nyomán, 2014)** Alga: 1,5 · q⁷ = 27 ⇒ q = ⁷√18 ≈ 1,51-szeresére nő naponta.
- **Ráadás:** √3346 jegyenkénti kiszámítása: 5, 7, 8, majd a következő jegy 4 ⇒ √3346 ≈ 57,84.

> **⚠️ CSAPDA:** A páros gyök egyetlen nemnegatív szám: ⁴√81 = 3, nem ±3 (az x⁴ = 81 egyenletnek viszont két megoldása van: ±3). Negatív számnak nincs páros gyöke a valós számok körében (⁴√−16 nincs értelmezve), páratlan gyöke viszont van (∛−8 = −2).

*Megjegyzés: a tankönyv a népességes példában a 9,7/10,2 ≈ 0,951 arányt 0,95-re kerekíti, így kap ≈ 0,26%-ot; kerekítés nélkül ≈ 0,25% adódik (a II. labor ezt mutatja).*

---

## 💻 Elkészített Komponensek

1. **`NthRootFigures.tsx`**:
   - `NthRootCubeSvg`: kocka éle a felszínből (√17) és a térfogatból (∛45).
   - `NthRootDefinitionSvg`: ⁿ√a jelölése (alap, gyökkitevő), páros és páratlan eset példákkal.
   - `NthRootEvenOddSvg`: y = x⁴ és y = x³ grafikonja vízszintes egyenessel – két, illetve egy metszéspont.
   - `NthRootPopulationSvg`: Magyarország népessége 2001–2021 és a ²⁰√0,95 számolás.
   - `NthRootSphereSvg`: a hidroglóbusz gömbtartálya (V = 113 m³, R = ?).
2. **`NthRootTheory.tsx`**: kidolgozott feladatok (kocka, népesség), az n-edik gyök definíciója, táblázatos példák, feladatmegoldások (közelítő értékek, bűvös kocka, gömb, Hollandia, KSH-táblázat, házi feladatok, ráadás), csapda.
   - **I. Laboratórium:** gyök-felfedező – n (2–10) és a (−10…10) csúszkával; y = xⁿ grafikon, y = a egyenes, metszéspontok, ⁿ√a értéke és ellenőrzése, „nincs értelmezve” eset.
   - **II. Laboratórium:** átlagos évi változás kalkulátor – P₀, Pₙ, n ⇒ 1 + r = ⁿ√(Pₙ/P₀), tankönyvi előbeállításokkal (Magyarország, Hollandia, algás tó).
3. **`NthRootMatcher.tsx`**: 3 szint × 8 pár (definíció példái; gyökvonás; alkalmazások).
4. **`NthRootSorter.tsx`**: 3 szint × 3 kategória × 9 elem (egész / nem egész / nincs értelmezve; közelítő érték; megoldások száma).
5. **`NthRootQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), minden kérdésen típus-címke, 4 kérdésen ábra, 3 puskakártya (progress id: `g11-exp-n-edik-gyok-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic3NthRoot.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
