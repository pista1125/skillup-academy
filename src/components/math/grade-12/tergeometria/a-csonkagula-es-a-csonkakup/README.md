# 14. A csonkagúla és a csonkakúp (tankönyv: 16. lecke, 36–37. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 36–37. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a térgeometria fejezet **14.** leckéje.

---

## 🎯 Tananyag Áttekintés

A lecke Karinthy Frigyes *A jó tanuló felel* című írásának részletével indul („vegyünk inkább egy csonka gúlát” – „csak le van vágva belőle egy másik gúla”). A csonka testeket a gúla / kúp alaplappal párhuzamos síkkal való elmetszéséből származtatjuk; a kulcs a kiegészítő testtel való középpontos hasonlóság. (Felszín és térfogat a 15–16. leckében.)

---

## 📐 Fogalmak

- Ha egy gúlát / kúpot az alaplapjával párhuzamos síkkal elmetszünk, két test keletkezik: az eredetihez **középpontosan hasonló** gúla / kúp (a **kiegészítő gúla / kúp**) és a **csonkagúla / csonkakúp**.
- A csonka testet két középpontosan hasonló síkidom (**alaplap** és **fedőlap**) és a **palást** határolja. A csonkagúla palástját annyi **trapéz** alkotja, ahány oldala van az alaplapnak.
- **Magasság:** az alaplap és a fedőlap síkjának távolsága. A csonkakúp **alkotói** a teljes kúp alkotóinak palástra eső szakaszai.
- Szabályos n oldalú gúlából szabályos n oldalú csonkagúla lesz; a csonkakúp **tengelymetszete szimmetrikus trapéz**.
- Számolás: $λ = r/R = m_1/M$, $m_1 = \dfrac{r\,m}{R - r}$, $a^2 = m^2 + (R - r)^2$.

### Tankönyvi feladatok (eredmények)
- **1.** Szabályos négyoldalú gúla, M = 8 dm, alapél 5 (a tankönyvben „5 cm”, valószínűleg 5 dm), a csúcstól 2 dm-re vágva: λ = 1/4 ⇒ alapél 5, fedőél 1,25, magasság 6 dm.
- **2.** Szimmetrikus trapéz (16 és 10 cm, 30°): R = 8 cm, r = 5 cm, m = √3 ≈ 1,73 cm, a = 2√3 ≈ 3,46 cm.
- **3.** Bonbon (d₁ = 3,3 cm, d₂ = a = 1,5 cm): m = 1,2 cm ⇒ két réteghez 2,4 cm magas doboz.
- **HF 1.** Derékszögű trapéz (16, 11, ferde szár 12 cm) a derékszögű szár körül: R = 16, r = 11, m = √119 ≈ 10,91, a = 12 cm.
- **HF 2.** M = 20 cm, alapél 6 cm, az alaplaptól 2 cm-re: alapél 6 cm, fedőél 5,4 cm, magasság 2 cm.
- **HF 3.** Szoknya (állvány d = 23 cm, AB = 20 cm, AC = 80 cm, csípő 91 cm): derékbőség ≈ 72,3 cm, a körcikkek ≈ 157,1 cm sugarú körből vághatók ki, a szoknya alja ≈ 147,2 cm.

> **⚠️ CSAPDA:** a hasonlóság arányát a csúcstól mért távolsággal (a kiegészítő test magasságával) kell számolni, nem az alaplaptól mért vágási távolsággal.

**Javítás a korábbi README-hez:** a csonkakúp alapsugarát a tankönyv R-rel, a fedőkörét r-rel jelöli; a lecke nem tárgyal felszínt és térfogatot (azok a következő két leckében vannak).

---

## 💻 Elkészített Komponensek

1. **`FrustumFigures.tsx`**: `FrustumPartsSvg` (csonkagúla és csonkakúp kiegészítő testtel), `PyramidCutSvg` (1. feladat), `TrapezoidRotationSvg` (2. feladat), `BonbonSvg` (3. feladat), `RightTrapezoidSvg` (HF 1.), `SkirtPatternSvg` (HF 3.).
2. **`FrustumTheory.tsx`**: bevezető (Karinthy), fogalmak, összehasonlító táblázat, kidolgozott feladatok, HF-eredmények, csapda.
   - **I. Laboratórium:** csonkolás csúszkával – forgatható csonkagúla / csonkakúp (`Solid3DViewer`) a levágott kiegészítő test éleivel, λ, fedőél, magasság élőben.
   - **II. Laboratórium:** a csonkakúp tengelymetszete (R, r, m csúszkával: alkotó, hajlásszög, kiegészítő kúp magassága).
3. **`FrustumMatcher.tsx`**: 3 szint × 8 pár.
4. **`FrustumSorter.tsx`**: 3 szint × 3 kategória × 9 elem.
5. **`FrustumQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), ábrákkal, 3 puskakártyával. Aktivitás-azonosítók: `g12-ter-csonka-testek-quiz`, `-matcher`, `-sorter`.

A rajzok a `../a-gula/SolidSketch.tsx` közös SVG-készletét használják.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic1Frustum.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
