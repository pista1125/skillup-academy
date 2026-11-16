# 1. Számok 0-tól 1000-ig (tankönyv 4–10. oldal, munkafüzet I. 4–7. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 4–10. oldal) és munkafüzet (`OH-MAT04MA_I`, 4–7. oldal) alapján kidolgozott oktatási modul. A diákzónában ez az I. fejezet 1. leckéje.

---

## 🎯 Tananyag Áttekintés

A 3. osztályban tanult 1000-es számkör ismétlése. A nyitóoldalon a gyerekek nyári élményei (Megyer-hegy 324 m, Szent Anna-tó 946 m) adják a háromjegyű számokat.

- **Számtáblázat** 0-tól 990-ig tízesével (2. feladat), betűk a számok helyén.
- **Golyós számológép** (3. feladat): piros golyó = 100, kék = 10, sárga = 1.
- **Zsebkendők** 100-as dobozban és 10-es csomagban (4. feladat), **pénz** forintban és euróban (5–6. feladat).
- **Helyiérték-táblázat** (7. feladat): ezres (E), százas (sz), tízes (t), egyes (e); **alaki érték** (a leírt számjegy), **helyi érték** (a hely), **valódi érték** (amennyit ér). Példa: 641 = 6 százas + 4 tízes + 1 egyes = 600 + 40 + 1.
- **Számok betűvel**: hatszáznegyvenegy, kétszázhuszonhat, négyszázhat …
- **Számegyenes** (12–13. feladat), **számszomszédok** táblázata (15. feladat: 198 → 100, 190, 197 | 199, 200, 200).
- **Kerekítés** (16. feladat, tankönyvi szabálydoboz): tízesre/százasra a közelebbi szomszédhoz; középen a nagyobbhoz (595 ≈ 600, 950 ≈ 1000); kerek számé maga a szám.
- **Fejtörők**: rajtszámok a 9, 7, 0, 8 számjegyekből (14. feladat), kitalálós rajtszám 695 és 360 (16. feladat), a legnagyobb 300-ra kerekedő szám 349, a legkisebb 260-ra kerekedő 255 (17. feladat), sorozatok (18–20. feladat), főnyeremény 228 (21. feladat).
- **Munkafüzet I. 4–7.**: számtáblák kiegészítése, páros/páratlan, milliméterpapír (100-as négyzet, 10-es csík), nyitott mondatok (445 < □ < 448), számszomszéd-táblázat, helyi érték szerinti bontás, dobókockás számalkotás.

> **⚠️ CSAPDA:** ha nincs tízes, a helyére 0 kerül: négyszázhat = 406, nem 46. A 0 nem állhat háromjegyű szám elején.

### A régi README javított hibái
- „E” az **ezres** rövidítése a tankönyvben (nem az egyesé); egyes = e, tízes = t, százas = sz.
- LaTeX-képletek helyett egyszerű, 4. osztályos jelölés.

---

## 💻 Elkészített Komponensek

1. **`Numbers1000Figures.tsx`**:
   - `AbacusSvg`: golyós számológép 346-tal (piros 100, kék 10, sárga 1).
   - `PlaceValueTableSvg`: tankönyvi színes helyiérték-táblázat (alaki és valódi érték, 273).
   - `NumberLine1000Svg`: számegyenes 0–1000, a 242, 756, 928 helyével.
   - `RoundingLineSvg`: tízesre kerekítés 590–610 között (590, 595, 600, 608).
   - `TissueBoxesSvg`: 100-as dobozok, 10-es csomagok, darabok (235).
   - `HundredGridSvg`: milliméterpapír-négyzetek (224).
2. **`Numbers1000Theory.tsx`**: Mit tanulunk?, helyi érték, „Nézzük meg együtt!” számlálások, számszomszédok, kerekítés, rajtszám-fejtörők, „Vigyázz!” csapda. Exportálja a `numberToHungarianWords` segédfüggvényt is.
   - **I. labor:** számépítő golyós számológép (+/− gombok, betűvel írt alak, célszám ellenőrzése).
   - **II. labor:** kerekítő számegyenes (tízesre/százasra, azonnali visszajelzés).
3. **`Numbers1000Matcher.tsx`**: 3 szint × 8 pár (betűvel–számjeggyel, felbontás, szomszédok és kerekítés).
4. **`Numbers1000Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (páros/páratlan/kerek tízes; ≈ 300/400/500; a 7-es valódi értéke 7/70/700).
5. **`Numbers1000Quiz.tsx`**: 30 kérdés 3 szinten (10/10/10), ábrákkal (golyós számológép, számegyenes, pénz, zsebkendők, számkártyák, sorozatok), 3 puskakártyával.

Azonosítók: kvíz `g4-count-szamok-1000-quiz`, párosító `g4-count-szamok-1000-matcher`, csoportosító `g4-count-szamok-1000-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic1Numbers1000.test.tsx` (4 komponens, 6 SVG ábra, betűvel írás).
