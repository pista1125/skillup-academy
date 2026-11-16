# 3. Az 1 egész és az egynél nagyobb törtek (tankönyv 147., 150–151. oldal, munkafüzet II. 68–71. oldal)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 147., 150–151. oldal) és munkafüzet (`OH-MAT04MA_II`, 68., 70–71. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a VIII. fejezet (A törtszámok) 3. leckéje.

---

## 🎯 Tananyag Áttekintés

A tankönyv nem tanítja külön az egynél nagyobb törteket (számjegyes alakot sem használ), de több helyen előkerül, hogy **minden rész együtt az egész**, és egy helyen az egésznél több is („1 és negyed óra”). A lecke ezekre épít, 2 egészig, szavas törtekkel.

- **Nyitótörténet (147. o.)**: „Kék, fehér, piros, minden szín egy-egy harmad, az összesen három harmad, vagyis egy egész.”
- **14. feladat (150. o.)**: a mérőszalag félbehajtása (fél méter = 50 cm), újabb félbehajtás (negyedek); „Hány centiméter a méter negyede, 2 negyede, 3 negyede, 4 negyede?” → 25, 50, 75, 100 cm.
- **18. c) feladat (151. o.)**: „A pogácsát 1 és negyed óra alatt készítették el. Hány perc?” → 75 perc.
- **18. e) feladat (151. o.)**: a szörp 1 harmada málna, a maradék fele eper, a többi szeder – a kvízben csak a törtrészek (1-1 harmad); a milliliteres számolás az 5. leckéhez tartozik.
- **Munkafüzet II. 68., 8. feladat**: „300 Ft-nak az 5 ötödébe kerül” → 300 Ft (az 5 ötöd az egész).
- **Munkafüzet II. 70., 14. feladat**: a méter tized-, ötöd- és negyedrészei (10 tized m = 1 m).
- **Munkafüzet II. 71., 17. feladat**: a 400 literes dézsa 6 tized része megtelt – még 4 tized részét kell feltölteni.
- **Munkafüzet II. 71., 18. feladat**: sportszelet – 50 dkg keksz (a fele), 25 dkg margarin és 25 dkg cukor (1-1 negyed), együtt 1 egész.
- **Kiegészítés a lecke címéhez**: 5 negyed pizza = 1 egész és 1 negyed, 3 fél alma = 1 és fél, 7 harmad = 2 egész és 1 harmad, törtek a 0-tól 2-ig tartó számegyenesen (negyedek, felek, ötödök).

> **⚠️ CSAPDA:** az 5 negyed nem kisebb 1-nél „mert negyedekről van szó” – 4 negyed már 1 egész, az 5 negyed ennél 1 negyeddel több.

### A régi README javított hibái
- A régi README LaTeX-es törtekkel ($\frac{5}{4}$, vegyes szám képlettel), számláló–nevező összehasonlítással és „áltört / valódi tört” jellegű elnevezésekkel dolgozott. Ezek nincsenek a 4. osztályos tankönyvben; helyettük a tankönyv szavai („3 harmad, vagyis egy egész”, „1 és negyed óra”) és a munkafüzet valódi feladatai szerepelnek.

---

## 💻 Elkészített Komponensek

1. **`ImproperFractionsFigures.tsx`**:
   - `WholeEqualsSvg`: 2 ketted = 3 harmad = 4 negyed = 5 ötöd = 10 tized = 1 egész.
   - `TapeMeasureSvg`: az 1 m-es mérőszalag negyedei (25, 50, 75, 100 cm).
   - `TankSvg`: a dézsa 6 tized vízzel, 4 tized üresen.
   - `RecipeSvg`: a sportszelet összetevői (fele + 1 negyed + 1 negyed).
   - `MorePizzaSvg`: 5 negyed pizza = 1 egész és 1 negyed.
   - `HourQuartersSvg`: 1 és negyed óra = 75 perc időszalagon.
   - `FractionNumberLineSvg`: számegyenes 0-tól 2-ig negyedekkel.
   - Segédek: `FracLineG` (újrahasznosítható törtes számegyenes), `toWholes` („5 negyed” → „1 egész és 1 negyed”), `compareToOne`.
2. **`ImproperFractionsTheory.tsx`**: Mit tanulunk? (francia zászló), az 1 egész sok neve (táblázat), mérőszalag kidolgozva, mennyi hiányzik az egészhez (dézsa, sportszelet), egynél nagyobb törtek (pizza, pogácsa ideje), számegyenes, „Vigyázz!” csapda. Exportálja: `PARTY_TASKS`, `PARTY_DENOMS`, `LINE_TASKS`.
   - **I. labor – Pizzaparti:** 3 pizzát 2–8 egyenlő szeletre vágsz, a + / − gombokkal szeleteket teszel a tálcára; azonnal látszik a tört („7 harmad = 2 egész és 1 harmad”) és hogy egynél kisebb, pontosan 1 egész vagy egynél nagyobb; feladatkártyák ellenőrzéssel.
   - **II. labor – Törtek a számegyenesen:** a 0–2 számegyenesen kell rákoppintani a kért törtre (3 negyed, 4 negyed, 5 negyed, 1 és fél, 1 egész és 3 negyed, 8 ötöd), visszajelzéssel.
3. **`ImproperFractionsMatcher.tsx`**: 3 szint × 8 pár (hány rész ad ki 1 egészet; egészek és részek; óra–perc és méter–cm).
4. **`ImproperFractionsSorter.tsx`**: 3 szint × 3 kategória × 9 elem (egynél kisebb / 1 egész / egynél nagyobb; ugyanez helyzetekkel; 1 / 2 / 3 egész).
5. **`ImproperFractionsQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 16 kérdés ábrával (pizzák, zászló, szalag, mérőszalag, óralap, almák, számegyenes, dézsa, recept), 3 puskakártyával.

Azonosítók: kvíz `g4-frac-egynel-nagyobb-quiz`, párosító `g4-frac-egynel-nagyobb-matcher`, csoportosító `g4-frac-egynel-nagyobb-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic8ImproperFractions.test.tsx` (4 komponens, 7 SVG ábra, kvíz-, párosító- és csoportosító-szerkezet, `toWholes` / `compareToOne`, a csoportosító egészszámai).
