# 4. Gyakorlás, tudáspróba (VI. A római számok)

## Források
- *Matematika 2. osztályosoknak I. kötet* (`OH-MAT02TA_I.pdf`), **46–47. oldal** – a teljes római szám fejezet (a könyvben külön gyakorló oldal nincs).
- *Matematika munkafüzet 2. osztályosoknak I. kötet* (`OH-MAT02MA_I.pdf`), **28–29. oldal** – pajzsok a számegyenesen, 11–20 táblázat, óralapok, hónapok, pálcika-rejtvények.

## Mit csinál a DiákZóna-lecke?
- „Amit már tudsz” összefoglaló a három leckéből: három jel + két szabály + nincs nulla, a teljes 1–20 tábla, olvasás 3 lépésben (nézd meg → bontsd részekre → add össze), tipikus hibák javítással (IIII → IV, VV → X, IIX → VIII, XIIII → XIV).
- Vegyes mintafeladatok: olvasás, írás, római óra „3 óra múlva”, számolás átírással.
- 2 labor: **Vegyes feladatgenerátor** (5 típus: olvasás, írás, <, >, =, római óra, számolás átírással; „első próbára jó” számláló, típushoz kötött segítség), **Szabályos vagy hibás?** (véletlen jó és tipikus hibás írások, magyarázattal).
- **Tudáspróba: 90 kérdés** (szintenként 30), 65 kérdés ábrával.

## Fájlok és teszt
- `RomanExamG2Parts.tsx` – `romanBreakdown`, `ROMAN_EXAM_TASK_KINDS`, `makeRomanExamTask`, `RomanMixedLab`, `makeValidityTask`, `RomanValidityLab`
- `RomanExamG2Figures.tsx` – `RomanRecapRulesSvg`, `RomanFullTableSvg`, `RomanReadStepsSvg`, `RomanMistakesSvg`
- `RomanExamG2CardFigures.tsx` – közös kártyaképek + `PlainSignCard80`
- `RomanExamG2Theory.tsx`, `RomanExamG2Quiz.tsx` (`g2-romai-tudasproba-quiz`, 90 kérdés), `RomanExamG2Matcher.tsx` (`g2-romai-tudasproba-matcher`), `RomanExamG2Sorter.tsx` (`g2-romai-tudasproba-sorter`)
- Teszt: `src/test/grade2Topic6RomanExamG2.test.tsx`

## Eltérések a tankönyvtől
- **Saját összefoglaló**: a könyvben nincs külön gyakorló/tudáspróba oldal a római számokhoz; a 90 kérdés és a laborok saját feladatok.
- **Szigorúan 1–20, csak I, V, X**: egyetlen kérdés, opció vagy generált feladat sem lép 20 fölé; L, C nem szerepel (3. osztály). A 0-ról külön kérdések mondják ki, hogy nincs római jele.
- **Óra: csak egész órák**, legfeljebb egy egyszerű „… óra múlva / előbb” lépés 12-n belül. Az MF 29/3 félórás időtartam-számítása kimaradt.
- **Számolás római számokkal csak átírással** (pl. XX − VIII → 20 − 8 = 12), legfeljebb két lépés (X + X − V).
- **Pálcika-rejtvények egyszerűsítve**: az MF 29/4 egyenlőség-javító rejtvényei helyett egy pálcika áthelyezése egyetlen számon belül (VI → IV, XI → IX) és pálcikaszámlálás.
- **Hónapok**: csak „az X. hónap melyik?” típusú kérdés (megadjuk, hogy az I. hónap a január); a névnap-kutatás (MF 29/2) kimaradt.
