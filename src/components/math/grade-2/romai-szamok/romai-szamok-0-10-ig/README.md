# 2. Római számok 1-től 10-ig

> A mappa neve (`romai-szamok-0-10-ig`) régi, megtartjuk. A tartalom **1-től 10-ig** szól, mert a római számírásban **nincs nulla**.

## Források
- *Matematika 2. osztályosoknak I. kötet* (`OH-MAT02TA_I.pdf`), **46–47. oldal**: 1–10 arab és római tábla, I, V, X jelek, pajzsok (V, VI, VIII, IX), kártyák a számegyenesen (VII, VIII).
- *Matematika munkafüzet 2. osztályosoknak I. kötet* (`OH-MAT02MA_I.pdf`), **28–29. oldal**: pajzsos katonák I–X a 0–20 számegyenesen, toronyóra római számlappal, római számlapos órák.

## Mit csinál a DiákZóna-lecke?
- A teljes sor I–X, színes csoportokkal: I-ek (1–3), V-család (6–8 = 5 + 1, 2, 3), „egy hiányzik” (IV = 5 − 1, IX = 10 − 1), V és X önálló jel.
- Sorrend a számegyenesen, szomszédok, összehasonlítás („előbb írd át arab számmá”), csapda: nem a jelek száma számít (VIII < IX).
- Római óra: csak egész óra, a nagymutató a XII-n, a kismutató számát olvassuk.
- Egyszerű + és − csak „írd át arab számmá, aztán számolj” formában, 10-en belül.
- 2 labor: **Átváltó játék** (arab ↔ római, 4 választás, sorozatszámláló, tipikus hibák a disztraktorokban: IV/VI, IX/XI, szomszéd), **Állítsd be a római órát!** (kismutató forgatása ±1 órával, egész órák 1–10).

## Fájlok és teszt
- `Roman10G2Parts.tsx` – `ConverterLab`, `makeConvertTask`, `ClockSetLab` (a közös segédek a `../romai-szamok-ertelmezese/RomanIntroG2Parts.tsx`-ben)
- `Roman10G2Figures.tsx` – `Roman1To10TableSvg`, `FiveFamilySvg`, `OneMissingSvg`, `RomanLine10Svg`, `RomanClockSevenSvg`
- `Roman10G2CardFigures.tsx` – közös kártyaképek + `DotsCard80`
- `Roman10G2Theory.tsx`, `Roman10G2Quiz.tsx` (`g2-romai-10-quiz`, 30 kérdés), `Roman10G2Matcher.tsx` (`g2-romai-10-matcher`), `Roman10G2Sorter.tsx` (`g2-romai-10-sorter`)
- Teszt: `src/test/grade2Topic6Roman10G2.test.tsx`

## Eltérések a tankönyvtől
- **Nincs nulla – a mappanév félrevezető**: a régi cím „0-10-ig” volt, de a 0-nak nincs római jele. A lecke címe és tartalma 1-től 10-ig szól, és ezt ki is mondjuk. A könyv számegyenesei 0-val kezdődnek, ott a 0 fölé nem kerül római szám.
- **A régi README hibái**: L és C jelet, valamint LaTeX-jelölést használt – kivettük (L, C a 3. osztályban jön).
- **Csoportosítás „hogyan gondold” szerint**: a könyv csak táblát mutat; nálunk színek segítenek (I-ek, V-család, egy hiányzik).
- **Óra**: csak egész órák, a kismutató leolvasása; legfeljebb egy „3 óra múlva” lépés 12-n belül. Az MF 29/3 fél órás időtartam-számítását kihagytuk. Megjegyezzük, hogy egyes órákon IIII áll a IV helyett.
- **Számolás római számokkal** csak úgy, hogy előbb arab számmá írjuk (pl. X − IV → 10 − 4 = 6); a könyv pálcika-áthelyezéses műveleti rejtvényeit (MF 29/4) nem vettük át.
- **Saját feladatok**: pajzsos katonák helyett pálcikák, korongok, lift, saját számok.
