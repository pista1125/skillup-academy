# 14. Egyenesek metszéspontja (78. lecke, 252–253. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 252–253. oldal) alapján kidolgozott oktatási modul. A diákzónában a VI. Koordinátageometria fejezet 14. leckéje.

---

## 🎯 Tananyag Áttekintés

A lecke egy hajózási feladattal indul: a NewSea az e: 5x + 4y = 7, a DrunkenSailor az f: 4x − y = 14 egyenesen halad. A pontok koordinátáit behelyettesítve eldönthető, melyik pálya halad át rajtuk; a mindkét egyenletet kielégítő B(3; −2) a két pálya metszéspontja. Az elmélet általánosítja: két alakzat egyenletéből álló egyenletrendszer megoldásai a közös pontokat adják.

---

## 📐 Fő Fogalmak és Szabályok

- **Illeszkedés:** egy pont akkor van az egyenesen, ha koordinátáit az egyenletbe helyettesítve igaz kijelentést kapunk.
- **Metszéspont:** a két egyenes egyenletéből felírt egyenletrendszer megoldása (behelyettesítő módszer vagy egyenlő együtthatók módszere).
- **Megoldások száma ↔ kölcsönös helyzet:** 1 megoldás – metsző; nincs megoldás – párhuzamos; végtelen sok – egybeeső egyenesek.

### Kidolgozott feladat és elmélet (tankönyv)
- Hajók: A(−1; 3) csak e-n, C(4; 2) csak f-en, B(3; −2) mindkettőn ⇒ a metszéspont B(3; −2).
- 3x + y = −1 és 2x − 3y = −19 ⇒ (−2; 5).
- 5x + 3y = 43 és 15x + 9y = 7 ⇒ üres megoldáshalmaz, nincs közös pont.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **F1.** a) (−7; −2); b) (5; −1); c) 6x − 10y = 3 és −3x + 5y = 2: nincs közös pont (párhuzamosak); d) x − y = 4 és 5x − 5y = 20: egybeesnek.
- **F2.** e: −3x + 2y = 10. a) pl. x = −3 vagy y = 0,5 (a (−3; 0,5) pont rajta van e-n); b) y = 3/2 x; c) e 2 abszcisszájú pontja (2; 8), a keresett egyenes y = −3x + 14.
- **F3.** AB: 7x − 3y = −13, C-ből induló súlyvonal −6x + 2y = 14 ⇒ AB felezőpontja F(−4; −5).
- **HF 1.** 4x − 5y = 13 metszéspontja: x + 2y = 0-val (2; −1), x + 3y = 2-vel (49/17; −5/17), x + 4y = 4-gyel (24/7; 1/7).
- **HF 2.** f: 5x − 3y = 7. a) (−1; −4) rajta van f-en, pl. x = −1; b) y = 3/5 x; c) f 1 ordinátájú pontja (2; 1), y = −3x + 7.
- **HF 3.** Súlyvonalak 2x + 6y = 5 és x − 5y = 6,5 ⇒ súlypont S(4; −0,5).
- A Ráadás (kányavári fahíd, kör és egyenesek metszése) adatai a szövegkivonatban nem olvashatók egyértelműen, ezért a modul nem dolgozza fel.

> **⚠️ CSAPDA:** a metszéspontnak mindkét egyenletet ki kell elégítenie – az A(−1; 3) csak az e-re illeszkedik, ezért nem metszéspont.

---

## 💻 Elkészített Komponensek

1. **`LineIntersectionFigures.tsx`**:
   - `LineIntersectionShipsSvg`: a két hajó pályája A, B, C pontokkal.
   - `LineIntersectionExampleSvg`: 3x + y = −1 és 2x − 3y = −19 metszéspontja (−2; 5).
   - `LineIntersectionCasesSvg`: metsző, párhuzamos, egybeeső egyenesek és a megoldások száma.
   - `LineIntersectionMedianSvg`: 3. feladat – AB oldalegyenes és súlyvonal, F felezőpont.
   - Segédkomponensek: `LineIntersectionPlane` (koordinátasík, kattintható rácspontokkal), `LineIntersectionAngleMark`, `LineIntersectionArrowHead`, `liClipLine`.
2. **`LineIntersectionTheory.tsx`**: kidolgozott hajós feladat, elmélet két példával, kölcsönös helyzetek, tankönyvi feladatok, csapda.
   - **I. Laboratórium:** két egyenes együtthatói beírhatók (ax + by = c), élő rajz, egyenlő együtthatók módszere, metszéspont tört alakban vagy „párhuzamos / egybeeső” döntés (tankönyvi előbeállítások).
   - **II. Laboratórium:** rácspontra kattintva vagy A, B, C gombbal: behelyettesítés mindkét hajópálya egyenletébe, igaz/hamis kiértékelés.
3. **`LineIntersectionMatcher.tsx`**: 3 szint × 8 pár (fogalmak, egyenletrendszer ↔ megoldás, alkalmazások).
4. **`LineIntersectionSorter.tsx`**: 3 szint × 3 kategória × 9 elem (melyik pályán van a pont; közös pontok száma; a metszéspont síknegyede).
5. **`LineIntersectionQuiz.tsx`**: 30 kérdés 3 szinten, 11 ábrával, 3 puskakártyával (progress id: `g11-geo-metszespont-quiz`; párosító: `g11-geo-metszespont-matcher`, csoportosító: `g11-geo-metszespont-sorter`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic6LineIntersection.test.tsx` fájlban található: a 4 komponens renderelése, a kérdésszám (10/10/10), mindkét labor működése (metszéspont, párhuzamos és egybeeső eset, pontellenőrzés) és mind a 4 SVG ábra.
