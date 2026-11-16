# 7. Elforgatás (V. fejezet, 7. lecke)

A hivatalos tankönyv (`OH-MAT04TA`, Matematika 4., 129. oldal) és munkafüzet (`OH-MAT04MA_II`, 40. oldal, „Eltolás, elforgatás” 4. feladat) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

- **TK 129/1.** Mi a közös a körhintában, a pörgettyűben, a földgömbben és a játszótéri forgóban? (Forognak.)
- **TK 129/2.** a) Figura forgatása a lapba bökött ceruzahegy körül. b) Sablon rögzítése a szélénél egy **gombostűvel**, forgatás kicsit arrébb és körberajzolás – virágminta („gombostű helye”).
- **TK 129/3.** Logikai lapokból épített építmény forgatása **negyed fordulattal jobbra**. *„Milyen szögben áll az eredetihez képest?”* (derékszögben)
- **TK 129/4.** Másolópapír + gombostű: az alakzat pirossal jelölt csúcsát az X pontba kell forgatni a **tű** körül. Megváltozott-e a síkidom mérete, formája? (Nem.)
- **MF 40/4.** Alakzatok (nyíl, háromszögekből álló alakzat) elforgatott képének megrajzolása másolópapír segítségével, a tű körül.

Kiegészítés a tankönyv szóhasználatával: negyed fordulat = egy derékszögnyi forgatás; fél, háromnegyed, egész fordulat (az óra nagymutatójával: 15, 30, 45, 60 perc); jobbra = az óramutató járásával megegyező irányban (a munkafüzet II. kötete is így fogalmaz, pl. a 18. oldal 6. feladatában), balra = ellentétesen.

> **⚠️ CSAPDA:** a fél fordulat nem tükrözés – a papírt nem fordítjuk meg, csak a tű körül forgatjuk.

(A korábbi README „forgási középpont (O)”, LaTeX-jelölés és „jobbra le / balra fel” megfogalmazást tartalmazott, és fokban adott szögeket – a tankönyv negyed fordulatról, derékszögről és a gombostű/tű helyéről beszél.)

---

## 💻 Elkészített Komponensek

1. **`Rotation4Figures.tsx`** (exportálja a `rotQ` segédfüggvényt is):
   - `SpinningThingsSvg`: körhinta, pörgettyű, földgömb, játszótéri forgó.
   - `PinTemplateSvg`: sablon, gombostű helye, körberajzolt virág.
   - `TurnAmountsSvg`: negyed / fél / háromnegyed / egész fordulat (derékszög negyedkörívvel és ponttal).
   - `QuarterTurnsSvg`: a logikai lapos építmény négy helyzete negyed fordulatonként.
   - `TracingPaperSvg`: háromszög, tű, piros csúcs → X (negyed fordulat jobbra).
   - `GridRotationSvg`: zászló négy helyzete az O pont körül négyzethálón.
2. **`Rotation4Theory.tsx`**: forgó tárgyak, gombostűs sablon, fordulatok táblázata (óra), logikai lapok, másolópapíros kidolgozott példa, csapda.
   - **I. Labor – Forgató:** ↻ / ↺ gombokkal negyed fordulatonként (animálva) kell a zászlót a tű körül a kért helyzetbe forgatni (pl. a piros csúcs az X-be); ellenőrzés.
   - **II. Labor – Rajzold meg az elforgatott képet:** az O rácspont körül negyed / fél fordulattal elforgatott alakzat négyzeteit kell kattintással kiszínezni; ellenőrzés cellánként.
3. **`Rotation4Matcher.tsx`**: 3 szint × 8 pár (fordulatok fogalmai, az óra nagymutatója, forgatások eredménye).
4. **`Rotation4Sorter.tsx`**: 3 szint × 3 kategória × 9 elem (elforgatás / eltolás / tükrözés; negyed / fél / egész fordulat; igaz / hamis / attól függ).
5. **`Rotation4Quiz.tsx`**: 30 kérdés 3 szinten (10/10/10), ábrákkal, 3 puskakártyával. Azonosítók: `g4-geom-elforgatas-quiz`, `-matcher`, `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade4Topic5Rotation4.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
