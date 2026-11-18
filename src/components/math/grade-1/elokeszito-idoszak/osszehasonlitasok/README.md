# 2. Összehasonlítások (1. osztály – I. Előkészítő időszak)

**Források:** OH-MAT01TA_I 8–13. o., OH-MAT01MA_I 8–11. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
- TK 8–9: gyerekek sorban (magasabb, alacsonyabb, legmagasabb), fák, kerítéslécek (legkeskenyebb, legszélesebb), ecsetek (legvékonyabb, legvastagabb), házak (alacsony/magas, széles/keskeny); írás-előkészítő vonalak.
- TK 10–11: labirintus, „rajzolj úgy, hogy igaz legyen” (hosszabb, magasabb, szélesebb, rövidebb, alacsonyabb, keskenyebb), állatok magasság szerint nyíllal, hosszabb horgászbot/szalag, színezés különböző színekkel.
- TK 12–13: ugyanolyan tárgyak összekötése, „melyik nem ugyanolyan”, ugyanolyan alakú ábrák, legkisebb/legnagyobb/egyenlő nagyságú ábra.
- MF 8–11: legszélesebb út, legkeskenyebb vonal, legmagasabb szék, legalacsonyabb fa, legrövidebb nadrág, ugyanolyan alma, legnagyobb/legkisebb/leghosszabb/legrövidebb, ki ugrott legmesszebbre, másolás, árnyékkép.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`OsszehasonlitasokG1Mese`, 11 oldal, 8 koppintós feladat): kerti verseny a Számkertben – magasabb/alacsonyabb virág, legmagasabb fa, hosszabb szalag, legszélesebb út, vékonyabb ág, legkisebb labda, csigaverseny (ki jutott legmesszebbre), ugyanolyan alakú forma, árnyékkép.
- **Játszótér** (`CompareRacePlayground`): véletlen tulajdonság (magas, hosszú, nagy, széles, vastag), 3–4 kép, „koppints a leg…-re”; hibánál a tipikus tévedést megnevező tipp. Új feladat gomb.
- **Játék** (`OsszehasonlitasokG1Jatek`): Kérdések 3 × 8 (`OSSZEHASONLITASOK_G1_QUESTIONS`): 1. szint két dolog, 2. szint „leg…”, alak, árnyék, 3. szint két szempont, ugyanakkora, sorba rendezés, kockatornyok (nem a több kocka a magasabb). Párosító: tárgy–árnyék, ugyanolyan alak, ugyanolyan hosszú. Válogató: nagy/kicsi, hosszú/rövid, magas/alacsony.

Minden összehasonlító kép ugyanabban a 100×100-as keretben van, így a gombokon is valódi a méretkülönbség; a hosszakat mindig közös kezdővonaltól mutatjuk. A tárgyrajzok az 1. lecke `ValogatasokG1Scenes.tsx` készletéből jönnek.

Fájlok: `OsszehasonlitasokG1Scenes.tsx`, `OsszehasonlitasokG1Parts.tsx`, `OsszehasonlitasokG1Mese.tsx`, `OsszehasonlitasokG1Jatek.tsx`, `index.ts`. Teszt: `src/test/grade1Topic1OsszehasonlitasokG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját történet (kerti verseny) és saját képek; a könyv gyerekszereplői (pl. Bálint, Judit) nem szerepelnek.
- Az írás-előkészítő vonalgyakorlatok, a labirintus, a rajzolós és színezős feladatok (rajzolj kéményt, színezd a ruhákat, másold át) képernyőn nem végezhetők: kimaradtak, a lényegük (összehasonlítás) koppintós kérdésként szerepel.
- A könyv a hosszakat néha ferdén/görbén mutatja (horgászbot, kanyargós szalag, ceruzavonalak); mi közös kezdővonaltól, egyenesen rajzolunk, hogy szemre is egyértelmű legyen. A görbe vonal hosszának becslése később, a mérésnél jön.
- A Judit-féle „hányféleképpen öltözhet” kombinatorikai feladat (MF 9/3) számolást igényel, kimaradt.
- Új, a könyvben nem szereplő csapda a 3. szinten: kockatornyok, ahol a kevesebb, de nagyobb kockából épült torony a magasabb (a magasság ≠ darabszám).
