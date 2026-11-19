# 1. Vonalak (1. osztály – IV. Geometria)

**Források:** OH-MAT01TA_II 4–11. o. (Vonalak, síkidomok, testek), OH-MAT01MA_II 4–9. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
TK 4: nagy kép, válogatás vonalak / síkidomok / testek szerint. TK 5: számok kirakása pálcikából (egyenes) és fonalból (görbe), a számokon az egyenes vonal zöld, a görbe piros; rajz csak egyenes / csak görbe vonalakból; pontok összekötése vonalzóval, zárt formák. TK 13/4, 19/2: vonalak követése, kusza utak. MF 4: rajzok, amelyeket csak egyenes vonalak határolnak; betűk egyenes/görbe vonalai.

## A DiákZóna-lecke
- **Mese** (`VonalakG1Mese`, „Pötyi és a kanyargós csigacsík”, 12 oldal, 6 koppintós feladat): pálcika = egyenes, fonal = görbe; Zümi egyenesen repül, Csigusz görbén mászik; a számok vonalai (1, 4 zöld, 3, 0 piros); a saláták körüli kerítés zárt vonal, a réses kerítés nyitott; kusza vonalak követése; pontok összekötése zárt formává; csak egyenes vonalakból álló rajz.
- **Játszótér** (`LineHuntPlayground`): véletlen vonal – „egyenes vagy görbe?” vagy „nyitott vagy zárt?”, Pötyi a hibát megnevezi, Új feladat.
- **Játék** (`VonalakG1Jatek`): 3 × 8 kérdés (`VONALAK_G1_QUESTIONS`), Párosító (egyforma vonalak; nyitott → zárt párja; egyenesek száma), Válogató (egyenes/görbe; nyitott/zárt; számjegyek: csak egyenes / csak görbe / mindkettő).

Közös képek: `VonalakG1Scenes.tsx` (`LineFig`, `line`, `DigitFig`, `Drawing` …) – a Síkidomok lecke is használja.
Fájlok: `VonalakG1Scenes.tsx`, `VonalakG1Parts.tsx`, `VonalakG1Mese.tsx`, `VonalakG1Jatek.tsx`, `index.ts`. Teszt: `src/test/grade1Topic4VonalakG1.test.tsx`.

## Eltérések a tankönyvtől
- A könyv nem használja a „nyitott vonal” kifejezést, csak a „zárt formát” (TK 5/3); a nyitott–zárt párost a kerítéses mese vezeti be (a tanítói kérés szerint).
- A betűs feladatok (MF 4/2) kimaradtak – a gyerekek még nem olvasnak; helyettük a számjegyek vonalait válogatjuk (TK 5/1 b).
- Rajzolás, pálcikás kirakás, vonalzós összekötés helyett koppintás és „kövesd az ujjaddal” feladat; a pontösszekötésnél a hiányzó vonalakat számolja meg a gyerek.
- A 9-es és 10-es számjegyek vonaltípusát nem kérdezzük (a kézírásban többféle alakjuk van).
- A cikcakk és lépcsős vonalakat (TK 12/3) nem soroljuk egyenes vagy görbe kosárba – csak „csak egyenes vonalakból áll” értelemben szerepelhetnének.
