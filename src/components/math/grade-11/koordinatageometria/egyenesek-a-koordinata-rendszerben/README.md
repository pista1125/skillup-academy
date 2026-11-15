# 9. Egyenesek a koordináta-rendszerben (73. lecke, 236–237. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 236–237. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a VI. Koordinátageometria fejezet **9.** leckéje.

---

## 🎯 Tananyag Áttekintés

A sík minden pontja két koordinátájával azonosítható, és minden alakzat pontok halmaza – ezért egy alakzat megadható a pontjai koordinátái közötti olyan összefüggéssel, amely pontosan az alakzat pontjaira igaz. A bevezető három egyenese:
- **a:** minden pont második koordinátája 2 ⇒ **y = 2**;
- **b:** a tengelyek két derékszögének szögfelezője, a két koordináta egyenlő ⇒ **y = x**;
- **c:** a b eltoltja a (0; 5) vektorral ⇒ **y = x + 5**. Az A(−2,9; 2,1) rajta van (2,1 = −2,9 + 5), a B(4,3; 9,4) nincs (9,4 ≠ 9,3).

---

## 📐 Elmélet

1. Az x tengelyre merőleges, azt az (a; 0) pontban metsző e egyenes egyenlete **x = a**.
2. Az y tengelyre merőleges, azt a (0; b) pontban metsző f egyenes egyenlete **y = b**.
3. A mindkét tengelyt metsző g egyenes egyenlete **y = ax + b**.

**Alakzat egyenlete:** olyan x és y változókat tartalmazó egyenlőség, melyet azoknak és csakis azoknak a P(x; y) pontoknak a koordinátái tesznek igazzá, amelyek illeszkednek az alakzatra.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **2.** x = 7; y = x − 3 ((0; −3), (3; 0)); y = −x − 5 ((0; −5), (−5; 0)).
- **3.** y = −x + 1: rajta van A(−4; 5), D(5; −4), E(100; −99); nincs rajta B(−1; 3), C(2; 2), F(871; −872).
- **HF 2.** x = −4; y = x − 4; y = −x + 4.
- **HF 3.** y = x − 5: rajta van B(−1; −6), D(5; 0); nincs rajta A(−5; −9), C(2; −2), E(100; 105), F(871; −866).
- (Az 1. feladat és a HF 1. a tankönyvi ábráról olvastatja le az egyenleteket; a kvíz saját ábrás leolvasó feladatokat tartalmaz.)

### Kitekintés (a tananyagterv kérése szerint)
A tankönyvi lecke nem használ irány- és normálvektort; a modul egy rövid kitekintő részben, az előző leckék vektoros ismereteire (90°-os elforgatás, eltolás) építve mutatja meg: y = ax + b egy irányvektora (1; a), normálvektora (−a; 1); x = a esetén (0; 1) és (1; 0), y = b esetén (1; 0) és (0; 1). Irányvektorral eltolva az egyenes önmagába megy át.

> **⚠️ CSAPDA:** az x = 7 függőleges (az első koordináta rögzített), az y = 2 vízszintes egyenes (a második koordináta rögzített) – nem fordítva.

---

## 💻 Elkészített Komponensek

1. **`LinesInPlaneFigures.tsx`** (a `../felezopont/MidpointFigures` `MidpointPlane` komponensére épül):
   - `IntroLinesSvg` (a, b, c egyenes a tankönyvi pontokkal), `AxisParallelLinesSvg` (x = a, y = b), `GeneralLineSvg` (y = ax + b), `TranslatedLineSvg` (eltolás a (0; 5) vektorral), `PointOnLineSvg` (3. feladat), `DirectionNormalSvg` (irány- és normálvektor, derékszög negyedkörívvel és ponttal).
2. **`LinesInPlaneTheory.tsx`**: bevezető, elmélet (három egyenestípus, alakzat egyenlete), kidolgozott feladatok és házi feladatok, eltolás vektorral, kitekintés (irány- és normálvektor), csapda.
   - **I. Laboratórium:** egyenestípus (x = a / y = b / y = ax + b) és paraméterek csúszkával, P pont – élő behelyettesítés, rajta van-e; irány- és normálvektor megjelenítése.
   - **II. Laboratórium:** az y = ax egyenes eltolása (v₁; v₂) vektorral – a kép egyenlete élőben; irányvektorral eltolva önmagába megy át.
3. **`LinesInPlaneMatcher.tsx`**: 3 szint × 8 pár (egyenlet ↔ leírás; két pontból az egyenlet; irány, normális, eltolás).
4. **`LinesInPlaneSorter.tsx`**: 3 szint × 3 kategória × 9 elem (helyzet; melyik egyenesen van a pont; irány-/normálvektor/egyik sem).
5. **`LinesInPlaneQuiz.tsx`**: 30 kérdés 3 szinten (13 kérdés ábrával), 3 puskakártyával (progress id: `g11-geo-egyenes-iranyvektor-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic6LinesInPlane.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
