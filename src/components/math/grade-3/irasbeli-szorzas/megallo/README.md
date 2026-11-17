# 6. Megálló – tudáspróba (3. osztály, XIII. Írásbeli szorzás)

## Források
- Tankönyv: OH-MAT03TA, 132. oldal (Megálló), 133. oldal (Kitekintő); a fejezet többi oldala: 122–131.
- Munkafüzet: OH-MAT03MA_II, 62–66. oldal („Ellenőrizd a tudásodat!”, „Gyakorolj!”); a fejezet többi oldala: 48–61.

## Mi van a könyvben?
- TK 132 (Megálló): számpárok, amelyek szorzata 720; „Melyik nagyobb?” (szorzatok, 114 · 4 + 114 vagy (114 + 114) · 4); „harmadrésze 293”, szorzatok különbsége; múzeum-alaprajz termenként egy feladattal (írásbeli szorzás, hiányzó számjegyek, műveletsor); műveletlánc (314 → · 2 → − 399 → · 4 → − 287).
- TK 133 (Kitekintő): szorzó-virágok, léc darabolása, életkoros és „gondoltam egy számot” fejtörők, dobókockás szorzás.
- MF 62–66: egész éves ismétlés (számegyenes, helyiérték, sorozat, kerekítés, írásbeli összeadás/kivonás becsléssel, testek-síkidomok, osztás); a szorzáshoz: becslés + szorzat (123 · 3, 329 · 2, 113 · 6, 189 · 4, 197 · 5), receptes következtetés (4 → 2 → 8 személy), műveletsorok (800 − 3 · 90).
- A fejezet anyaga (TK 122–131): szorzás egyjegyűvel fejben, bontással; becslés tízesre/százasra kerekítéssel; írásbeli szorzás egyjegyű szorzóval (sz t e táblázat, szorzandó · szorzó = szorzat, ellenőrzés összeadással); összefüggések, következtetések; a műveletek sorrendje.

## Mit csinál a DiákZóna-lecke?
- Elmélet („Amit már tudsz”): fejezet-térkép 5 állomással; bontásos szorzás táblázatban; becslés számegyenessel (335 ≈ 340 / 300) és a „lefelé kerekítettünk → nagyobb lesz” szabály; írásbeli szorzás a könyv elrendezésében a nevekkel (szorzandó, szorzó, szorzat, tényezők); összefüggések táblázata; sorrend + műveletlánc; saját múzeum-alaprajz 6 teremmel, kidolgozva; csapda: elfelejtett maradék (214 · 3 = 632) és a szorzás előtt hozzáadott maradék.
- **Labor I – Vegyes feladatok:** 5 állomás (fejben, becslés, írásban, sorrend, következtetés), mindig új véletlen feladat 1000-ig, „Tipp” gomb, és célzott visszajelzés a tipikus hibára (pontos szorzat a becslés helyett, százasra kerekítés tízes helyett, elfelejtett maradék, balról jobbra számolás, darabszámmal szorzás).
- **Labor II – Írásbeli szorzás lépésenként:** a gyerek helyiértékenként, az egyesektől beírja a leírandó számjegyet; a maradék kicsiben megjelenik a következő oszlop fölött. Felismeri, ha elfelejtette a maradékot, vagy a teljes kétjegyű számot akarja leírni.
- Kvíz: 90 kérdés (30/30/30), 64 ábrával: bontásos szorzás százas lapokkal és tízes rudakkal, becslés számegyenessel, írásbeli szorzás oszlopban (hiányzó szorzó, hiányzó számjegy, hibakeresés), összefüggés-nyilak, ár-következtetés, műveletsor, csomagok, szakaszos ábra, bolt, műveletlánc.
- Párosító: írásbeli szorzás ↔ szorzat; becslés számegyenessel; vegyes (következtetés, összefüggés, sorrend).
- Csoportosító: szorzat nagysága (500 alatt / 500–800 / 800 fölött); hol marad valami (nincs / egyeseknél / tízeseknél); becslés: a pontos szorzat nagyobb / kisebb / ugyanannyi.

## Komponensek
- `WrittenMulExamG3Figures.tsx`: `ChapterMapMulSvg`, `MulNamesSvg`, `EstimateMulSvg`, `ChainMulSvg`, `MuseumMulSvg`
- `WrittenMulExamG3CardFigures.tsx`: `MulCard`, `MulSmall`, `LineCard`, `PriceMini`, `RelCard`
- `WrittenMulExamG3Parts.tsx`: kérdés-építők (`qMul`, `qMental`, `qEst`, `qExpr`), írásbeli szorzás lépései (`mulSteps`, `mulExplain`), tipikus hibák (`mulNoCarry`, `mulCarryBefore`), kérdésábrák (`MulColumn`, `BlocksFig`, `LineFig`, …), labor-generátorok (`makeTask`, `genMulPair`). A műveletsor-kiértékelő a fejezet 5. leckéjéből jön (`../a-muveletek-sorrendje/OrderOpsMulG3Parts`).
- `WrittenMulExamG3Theory.tsx`, `WrittenMulExamG3Quiz.tsx` (`WRITTEN_MUL_EXAM_G3_QUESTIONS`), `WrittenMulExamG3Matcher.tsx` (`WRITTEN_MUL_EXAM_G3_MATCHER_LEVELS`), `WrittenMulExamG3Sorter.tsx` (`WRITTEN_MUL_EXAM_G3_SORTER_LEVELS`)
- Azonosítók: kvíz `g3-wmul-tudasproba-quiz`, párosító `g3-wmul-tudasproba-matcher`, csoportosító `g3-wmul-tudasproba-sorter`.

## Teszt
`src/test/grade3Topic13WrittenMulExamG3.test.tsx`

## Eltérések a tankönyvtől
- **Tört szavak a törtek előtt (TK 132/3. a: „amelynek a harmadrésze 293”, TK 132/4.: „Melyik számnak a harmada a 286?”; Kitekintő 5.: „felének a háromszorosa”; MF 62/4.: „tizedrésze”, „századrésze”):** a törtek csak a XIV. fejezetben jönnek. Nálunk: „Melyik számot osztottuk 3-mal, ha 286 lett?” (□ : 3 = 286), megoldás visszafelé szorzással.
- **Túl sok ismeretlen egy feladatban (TK 132/4., múzeum: ■27 · ■ = 8■9 három különböző színes jellel):** 3. osztályban nehezen követhető. Nálunk feladatonként egy hiányzó számjegy (□27 · 7 = 889, 2□3 · 3 = 729, 1□7 · 2 = 314) vagy egy hiányzó szorzó.
- **A munkafüzet tudáspróba-oldalai (MF 62–66) nem a fejezetről szólnak:** egész éves ismétlés (számegyenes, testek, írásbeli összeadás-kivonás, osztás). A tudáspróbába csak a szorzáshoz tartozó részeket vettük át (becslés + szorzat, következtetés, műveletsor); a többi a saját fejezete tudáspróbájában szerepel.
- **Kitekintő (TK 133) kimarad a kötelező részből:** a léc (3 m 20 cm) és az életkoros feladat a fejezetben nem tanult módszert (részekre osztás arány szerint) kér. A „gondoltam egy számot” és a következtetéses fejtörők saját számokkal bekerültek a 3. szintre.
- **Didaktikai változtatás:** a könyv nem mutatja meg a két tipikus maradék-hibát. Nálunk csapda-doboz, hibakereső kvízkérdés („Bence így szorzott…”), a rossz válaszok ezekből a hibákból készülnek, és mindkét labor felismeri őket.
- **Didaktikai változtatás:** a könyv (TK 127–128) egy-egy példánál mondja ki, hogy lefelé kerekítve a pontos szorzat nagyobb lesz. Nálunk ez külön csoportosító szint és kvízkérdés.
- Az írásbeli szorzás elrendezése a könyvé (sz t e fejléc, „· 3” a szorzandó mellett, vonal, alatta a szorzat); a kimondás: „3 · 4 = 12, leírom a 2-t, marad 1.”
- Saját számok és helyzetek (vonat, gyár, pékség, mozi, uszoda, bolt, saját múzeum) a könyv múzeum-, könyvjelző- és képeslapos feladatai helyett.
