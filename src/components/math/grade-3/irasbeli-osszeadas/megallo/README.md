# 6. Megálló – tudáspróba (3. osztály, VII. Írásbeli összeadás)

**Források:** tankönyv OH-MAT03TA 83–85. oldal (Megálló, Kitekintő) és a fejezet 74–82. oldala; munkafüzet OH-MAT03MA I. kötet 81–95. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 83. (Megálló):** építmények értéke (piros négyzet = 100, kék háromszög = 10, sárga kör = 1) és két építmény összege írásban; „Melyik számra gondoltam?” (két szám összege, „…-val nagyobb”); háromtagú összegek becslése százasra kerekítve, ellenőrzés a tagok felcserélésével; hiányos összeadások (157 + □ = 472, □ + 313 = 432, 490 = □ + 254); nyitott mondatok (199 + 162 < ● < 243 + 228, 291 + ■ < 500); letakart számjegyek írásbeli összeadásokban.
- **TK 84.:** amőbajáték (kerek tízesek összeadása és kivonása, hiányzó jegyek, írásbeli összeadások); szöveges feladat alkotása két szalag hosszából.
- **TK 85. (Kitekintő):** dobókocka szemközti lapjai (összeg 500), célba dobás pontjai, betűrejtvények (VÉG + ÉG = 408), három szám kiválasztása 500-as összeghez.
- **TK 74–82., MF 81–95.:** a fejezet anyaga (fejben összeadás, becslés, írásbeli összeadás két és három taggal, az összeg változásai, szöveges feladatok).

## Mit csinál a DiákZóna lecke?

**Tananyag („Amit már tudsz”):** a fejezet öt témája egy-egy rövid összefoglalóban, saját példákkal: fejben (418 + 300, 270 + 50), becslés számegyenesen (278 ≈ 280, 145 ≈ 150 → B: 430, a pontos 423), írásbeli összeadás két beváltással kimondott lépésekkel (278 + 145) és három taggal (207 + 164 + 98), hiányzó számjegyek oszloponként (?48 + 1?5 = 423) és hiányos összeadás (168 + □ = 435), az összeg változása (+100 és −20 → +80), kétlépéses és csapdás szöveges feladat; „Vigyázz!”: elfelejtett maradék, rossz oszlopba írt kétjegyű szám.

**Kvíz:** 90 feladat (30 / szint), a fejezet összes leckéjéből, 60 ábrával.

## Komponensek

1. **`WrittenAddExamG3Parts.tsx`** – `CompareSumsFig`, `speakAdd()` (az írásbeli összeadás lépései a tankönyv szavaival: „8 meg 5 az 13, leírom a 3-at, maradt 1. …”), `sumNoCarry` újraexportálva. A többi rajzelem a 4. lecke (`SumChangesG3Parts`), az 5. lecke (`AddWordProblemsG3Parts`) és a 3. lecke közös `WrittenAddG3Column` komponenséből jön.
2. **`WrittenAddExamG3Figures.tsx`** – `ExamOverviewSvg`, `ExamColumnSvg`, `ExamThreeSvg`, `ExamDigitsSvg`, `ExamEstimateSvg`, `ExamChangesSvg`.
3. **`WrittenAddExamG3CardFigures.tsx`** – `MiniColumn` (párosító), `SortColumn` (csoportosító); a párosító 2. szintje az 5. lecke `MiniTags` ikonját használja.
4. **`WrittenAddExamG3Theory.tsx`** – `WrittenAddExamG3Theory`, `makeExamTask`, `EXAM_KINDS`, `makeDigitTask`, `digitRows`, `digitHint`.
   - **Labor I – Tudáspróba-gép:** véletlen feladat hat fajtából (fejben, becslés, írásbeli, három tag, az összeg változása, szöveges), választható témával vagy vegyesen; „Elsőre jó: x / y” számláló. Minden rossz válaszra célzott tipp (elfelejtett maradék, csak levágott egyesek kerekítés helyett, „ez már a kettő együtt”, előjelhiba…). Írásbeli feladatnál oszlopos ábra, jó válasz után a beváltott jegyekkel.
   - **Labor II – Számjegy-nyomozó:** véletlen írásbeli összeadás 2–3 elrejtett számjeggyel (oszloponként legfeljebb egy, így mindig egyértelmű). A gyerek jobbról balra halad, az aktuális oszlop ki van emelve, 0–9 gombokkal válaszol; minden oszlophoz tipp (pl. „Tízesek: 4 + ? + 1 (maradék) = 2 vagy 12. Melyik szám kell a ? helyére?”).
5. **`WrittenAddExamG3Quiz.tsx`** – `WRITTEN_ADD_EXAM_G3_QUESTIONS`: 90 kérdés (30/30/30), 60 ábrával (oszlopos összeadás, rejtett jegyek, összeg-sorok, csíkok, árcédulák, étlap, táblázat); minden kérdésnél badge és magyarázat (az írásbeli feladatoknál a lépések kimondva), 3 puska. Azonosító: `g3-wadd-tudasproba-quiz`. Minden szám ≤ 1000.
6. **`WrittenAddExamG3Matcher.tsx`** – `WRITTEN_ADD_EXAM_G3_MATCHER_LEVELS`: oszlopos összeadás és fejszámolás ↔ eredmény; árcédulák és kerekítések ↔ becslés; rejtett számjegy és hiányos összeadás ↔ a hiányzó jegy/szám. `g3-wadd-tudasproba-matcher`.
7. **`WrittenAddExamG3Sorter.tsx`** – `WRITTEN_ADD_EXAM_G3_SORTER_LEVELS`: hányszor marad 1 (0 / 1 / 2 beváltás); összeg < 500 / 500–700 / > 700; „A ? = 1 / 5 / 8”. Szintenként 6 képes elem. `g3-wadd-tudasproba-sorter`.

**Teszt:** `src/test/grade3Topic7WrittenAddExamG3.test.tsx`

## Eltérések a tankönyvtől

- **Azonos színű négyzet – különböző számjegy (TK 83/6.):** a letakart számjegyes feladatokban egy összeadáson belül ugyanolyan színű négyzet takar különböző jegyeket (pl. ■52 + 3■5 = 46■: a három sárga négyzet alatt 1, 1 és 7 van). Két oldallal később (TK 85/3.) viszont az a szabály, hogy azonos jel azonos számjegyet jelent. Ez összezavarhatja a gyereket. Nálunk minden rejtett jegy külön „?” dobozban van, és oszloponként, jobbról balra kérdezzük.
- **Hiányos összeadás módszer nélkül (TK 83/4.):** a könyv azt írja, hogy „hiányos írásbeli összeadással oldhatjátok meg”, de nem mutatja meg, hogyan. Mi kidolgozott példát adunk („7 meg mennyi az 12? 5, maradt 1. …”) a tananyagban, a kvízben és a magyarázatokban is.
- **Kivonás az összeadás-megállóban (TK 84/7.):** az amőbajáték köreinek egy része kivonás (340 − 50, 420 − 110, 210 − 70); az írásbeli kivonás csak a VIII. fejezetben jön. A tudáspróbánk csak összeadást kér (a nyitott mondatnál is összeadással ellenőrzünk: 276 + 224 = 500, ezért a 276 + □ < 500 mondatban a legnagyobb jó szám 223).
- **Párban játszandó feladatok:** az amőbajáték és a „szöveges feladat alkotása” társat és tanári ellenőrzést kíván. Helyettük: Tudáspróba-gép azonnali visszajelzéssel, és „Melyik kérdésre felel ez a művelet?” típusú kvízkérdések.
- **Becslés százasra a háromtagú összegeknél (TK 83/3.):** százasra kerekítve a becslés messze kerülhet a pontos értéktől (pl. 238 + 149 + 312: B: 600, a pontos 699). Nálunk a háromtagú becslés tízesre kerekít (B: 700), és a gyerek látja, hogy ez sokkal közelebb van.
- **Saját feladatok:** minden szám, helyzet és szereplő saját (Nóri, Mesi, Ádám; papírgyűjtés, bábszínház, vonat, palacsintázó); a könyv feladatainak számait nem vettük át. A TK 85/4. ötletéből saját számhalmaz (124, 233 és 143 a jó hármas).
- **Tudatos didaktikai változtatások:**
  - A kvízábrákon – mint a könyvben – nem írjuk ki a beváltott jegyet; a laborokban a helyes válasz után kis zöld körben megjelenik, így ellenőrizhető a gondolatmenet.
  - Az írásbeli összeadás minden kvízmagyarázata a könyv szavaival mondja ki a lépéseket („leírom a 3-at, maradt 1”), automatikusan, így nem lehet benne számolási hiba.
  - A rossz válaszok a tipikus hibák: elfelejtett maradék, rossz oszlopba írt kétjegyű tag (358 + 64 → 998), csak az első lépés eredménye, kivonás összeadás helyett.
