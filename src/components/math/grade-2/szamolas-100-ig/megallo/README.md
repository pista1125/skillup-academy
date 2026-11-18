# 6. Megálló – tudáspróba (III. témakör)

## Források
- Tankönyv II. kötet (`OH-MAT02TA_II.pdf`, PDF = nyomtatott + 2): 21–22. („Megálló” 60-ig), 59., 82–87. o. („Megálló” 100-ig).
- Munkafüzet II. kötet (`OH-MAT02MA_II.pdf`, PDF = nyomtatott + 2): 74–79. o. (sorrendek, útvonalak, „Kitekintő” 1000-ig, csoportosítás).

## Mit tartalmaznak a könyvoldalak?
- Összeadás/kivonás tízesátlépéssel (32 + 17, 54 − 18, □ − 26 = 28), szabálytáblázat, összeg-színezés, nyíllánc.
- Műveletcsaládok (18 + 66 = 84, 84 − 66 = 18), számpiramis, bűvös négyzet, paritás és nagyság szerinti válogatás.
- Sok szorzás/osztás (3 · 9 + 3 · 3, 63 : 9 m), kombinatorika, logikai állítások, térkép, súlycsoportok, éremtáblázat.

## A DiákZóna-lecke
- Tananyag: „Amit már tudsz” összefoglaló (helyiérték, százas tábla, tízesátlépés két ugrással, piramis, szalagos ábra), csapdák, 2 labor:
  - **Vegyes feladatgép** – 7 feladattípus (helyiérték, szomszédok, összeadás, kivonás, kerek tízesek, hiányzó szám, legnagyobb) vagy vegyesen, pontszámlálóval és a hibához illő tippel;
  - **Számpiramis-építő** – véletlen 3 szintes piramis 100-ig, mezőnkénti visszajelzéssel.
- Kvíz: 90 kérdés (30/szint), 60 ábrával; a teljes III. témakört lefedi.
- Párosító 3 × 8, csoportosító 3 × 3 × 9.

## Komponensek
- `Count100ExamG2Parts.tsx` – ábrák (`RodsFig`, `MarkLineFig`, `WindowFig`, `MagicSquareFig`, `CardsFig`, `PlaceTableFig`, `RuleTableFig`, `QFig`), generátorok (`EXAM_G2_TASK_KINDS`, `makeExamG2Task`, `makePyramidG2Task`), laborok (`MixedTaskLab`, `PyramidLab`); a 4. és 5. lecke közös SVG-elemeit újrahasznosítja.
- `Count100ExamG2Figures.tsx` – `Count100MapSvg`, `Count100HundredSquareSvg`, `Count100BridgeAddSvg`, `Count100BridgeSubSvg`, `Count100PyramidSvg`, `Count100StripSvg`, `Count100RodsSvg`
- `Count100ExamG2CardFigures.tsx` – `PyramidCard`, `WindowCard` + a 4–5. lecke kártyaképei
- `Count100ExamG2Theory.tsx`, `Count100ExamG2Quiz.tsx` (`g2-c100-tudasproba-quiz`), `Count100ExamG2Matcher.tsx` (`g2-c100-tudasproba-matcher`), `Count100ExamG2Sorter.tsx` (`g2-c100-tudasproba-sorter`)
- Teszt: `src/test/grade2Topic3Count100ExamG2.test.tsx`

## Eltérések a tankönyvtől
- **Csak + és −, legfeljebb 100.** A könyv megállói szorzást/osztást (TK 82/1–2, 83/1–2, 85/3), kombinatorikát (TK 86/1–3, MF 74/1–2) és 1000-ig terjedő „Kitekintőt” (MF 75–76.) is tartalmaznak; ezek kimaradnak, mert más témakörbe tartoznak.
- **Számkör-túllépés a könyvben:** TK 84/2 éremtáblázat: az Egyesült Államok összesen 46 + 29 + 29 = **104** érme – túllépi a 100-as számkört. MF 76/1 „Kerek tízesek” zsákjában 120, 130, 150 áll; MF 76/2 építményei 280 és 370 értékűek. A DiákZóna minden adata 100-on belül marad.
- **Valószerűtlen tényadat:** TK 85/2 szerint a 75 kg-os súlyemelőnők világrekordja szakításban 81 kg, lökésben 91 kg – a valós rekordok ennél jóval nagyobbak (130 kg fölött). Ilyen „valós” adatot nem használunk; kitalált, életszerű helyzetek vannak.
- **Ellenőrizendő tényadat:** TK 81/3 szerint a londoni olimpián 2 · 2 · 7 = 28 sportág volt; a 2012-es program hivatalosan 26 sportágat tartalmazott.
- **Egyértelmű kérdések:** a „Mit tapasztaltál?”, „Színezz…”, „Jelöld a térképen…” típusú nyitott feladatok helyett egy válaszos, azonnal ellenőrizhető kérdések szerepelnek (pl. „Melyik igaz?”, „Melyik sor növekvő?”); a relációs jeles kérdések négy állításból választanak.
- **Csapdák külön kérdésként:** fordított összehasonlítás („Ez 18-cal több, mint Hannáé”), tízesek–egyesek sorrendje („7 egyes és 4 tízes”), a 0 nem állhat elöl kétjegyű számban (számkártyák 0, 4, 7).
- Saját feladatok, számok, szereplők; a könyv megállóiból csak a feladattípusokat vettük át.
