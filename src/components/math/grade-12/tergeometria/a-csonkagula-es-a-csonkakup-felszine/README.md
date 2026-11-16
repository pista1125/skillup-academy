# 15. A csonkagúla és a csonkakúp felszíne (17. lecke, 38–39. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 38–39. oldal) alapján kidolgozott oktatási modul. A diákzónában ez az I. Térgeometria fejezet **15.** leckéje.

---

## 🎯 Tananyag Áttekintés

A bevezető probléma: Szotyi kutyus lámpaernyő alakú védőgallérja egy csonkakúp palástja. A csonkagúla és a forgáskúpból származtatott csonkakúp **felszíne** az alaplap, a fedőlap és a palást területének összege: **A = T + t + P**.

---

## 📐 Fő Összefüggések

- A csonkakúp hálója két körlap és a kiterített palást, amely egy **körgyűrűcikk**. A körgyűrűcikk területe a határoló körívek hossza számtani közepének és a szélességnek a szorzata:
  $$T_{palást} = \frac{2R\pi + 2r\pi}{2}\cdot a = (R + r)\pi a$$
  $$A_{cs.k.} = R^2\pi + r^2\pi + (R + r)\pi a = \pi\,[R^2 + r^2 + (R + r)a]$$
- **Megjegyzés 1:** a palástképlet a trapéz területképletére hasonlít.
- **Megjegyzés 2:** a szabályos n oldalú csonkagúla palástja n egybevágó szimmetrikus trapéz: $A = T + t + n\cdot T_{trapéz}$. Szabályos négyoldalú csonkagúlára (alapél a, fedőél b, oldallapmagasság m): $A = a^2 + b^2 + 2(a + b)m$.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1. feladat (gallér):** r = 47/(2π) ≈ 7,5 cm, R = 17,5 cm, alkotó 20 cm.
  - *Antal:* 35 cm oldalú szabályos háromszög forgatása → kúp; λ = 7,5/17,5 = 3/7, kis kúp alkotója 15 cm, maradék 20 cm; a kis kúp palástja 9/49, a csonkakúpé 40/49 rész; teljes palást 612,5π ≈ 1924 cm² ⇒ gallér **500π ≈ 1571 cm²**.
  - *Bandi:* 35 cm sugarú félkör, ív 35π ≈ 110 cm; kivágott félkör sugara x = 15 cm; félkörök területe 612,5π ≈ 1924 cm² és 112,5π ≈ 353 cm² ⇒ gallér **500π ≈ 1571 cm²** (egyezik).
- **2. feladat:** A = 274 cm², a = 11 cm, b = 5 cm ⇒ oldallapmagasság **4 cm**, oldalél **5 cm**, oldallap–alaplap szöge **≈ 41,4°** (cos α = 3/4).
- **HF 1. (táblázat):** I. R = 12, r = 6, a = 10: T = 144π, t = 36π, P = 180π, A = 360π ≈ 1131 cm², M = 8 cm; II. R = 12, r = 3, a = 10: A = 303π ≈ 951,9 cm², M = √19 ≈ 4,36 cm; III. R = 6,15, r = 4,76, a = 3,11: T ≈ 118,8, t ≈ 71,2, P ≈ 106,6, A ≈ 296,6 cm², M ≈ 2,78 cm.
- **HF 2.:** A = 914 cm², a = 17 cm, m = 12 cm ⇒ b² + 24b − 217 = 0 ⇒ fedőél **7 cm**, oldalél 13 cm, oldalél–alaplap szöge **≈ 57,0°**.

> **⚠️ CSAPDA:** a palástképletben az **a alkotó** (csonkagúlánál az **m oldallapmagasság**) szerepel, nem a test M magassága: a = √(M² + (R − r)²).

---

## 💻 Elkészített Komponensek

1. **`FrustumAreaFigures.tsx`**: `FrustumAreaCollarSvg` (csonkakúp R, r, a, M), `FrustumAreaNetSvg` (háló: körgyűrűcikk + két kör), `FrustumAreaAntalSvg` (35 cm-es szabályos háromszög tengelymetszet, 15 / 20 cm), `FrustumAreaBandiSvg` (félkör-körgyűrű, x = 15), `FrustumAreaSquareSvg` (négyzetes csonkagúla + 11/5/4 trapéz oldallap), `FrustumAreaTrapezoidAnalogySvg` (trapéz ↔ körgyűrűcikk).
2. **`FrustumAreaTheory.tsx`**: bevezető, háló és képletek, Antal és Bandi terve, 2. feladat és HF 2., HF 1. táblázata, csapda.
   - **I. Laboratórium:** forgatható 3D csonkakúp / négyzetes csonkagúla (`Solid3DViewer`), R/a, r/b, M csúszkákkal – alkotó, palást, felszín élőben.
   - **II. Laboratórium:** a palást kiterítése – körgyűrűcikk rajza, sugarai, középponti szöge, területe összevetve a képlettel.
3. **`FrustumAreaMatcher.tsx`**: 3 szint × 8 pár (képletek, csonkakúp-adatok, csonkagúla-feladatok).
4. **`FrustumAreaSorter.tsx`**: 3 szint × 3 kategória × 9 elem (alaplap / fedőlap / palást; számolási lépés; igaz / hamis / adatfüggő).
5. **`FrustumAreaQuiz.tsx`**: 30 kérdés (10/10/10), 16 kérdés ábrával, 3 puskakártya (progress id: `g12-ter-csonka-felszin-quiz`; matcher: `g12-ter-csonka-felszin-matcher`, sorter: `g12-ter-csonka-felszin-sorter`).

---

## 🧪 Tesztelés

`src/test/grade12Topic1FrustumArea.test.tsx` – a 4 komponens és mind a 6 SVG ábra renderelése.
