# 5. A hét (1. osztály – III. Számkörbővítés, számolás 10-ig)

**Források:** OH-MAT01TA_I 84–87. o., OH-MAT01MA_I 44–45. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
Családi kép („Miből van hét? Hétnél több / kevesebb?”), ujjkép (5 + 2), dominókép (5|2), a 7-es számjegy (kasza-vers), helye a számegyenesen, „rajzolj, hogy 7 legyen”; a 7 írása, narancsos zsákok összehasonlítása jelekkel, rajzolás jelek szerint; hiányzó számok 0–7 sorban, csökkenő sorrend, `<`/`>` számpárok, a 7 bontása zoknikkal (7 = 7 + 0 … 0 + 7) táblázattal, csoportosítás összeadás szerint (3 + □, 4 + □, 2 + □), számházikók (5, 6, 7), a 7 több tagra bontása színes formákkal. Munkafüzet: miből van 7 (kösd a számhoz), dominók összehasonlítása, a 7 írása, bögrék pöttyei jelek szerint, számfenyők (5, 6, 7 bontása), hiányzó számok jelekkel, 7 zokni piros–zöld táblázata, sálak színezése jelek szerint.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`AHetG1Mese`, 12 oldal, 6 mini-feladat): Pötyi elárulja a titkát – ő hétpöttyös katica. A gyerek megszámolja a pöttyeit (egyik szárnyon 5, a másikon 2), hét ujj és a 7 pöttyös dominó, 6 + 1 = 7 („a hét eggyel több, mint a hat”), a 7-es írásiránya, „Hol van 7 virág?”, a hét 7 napja, a 7 a számegyenesen a 6 után, 7 korong két színnel (4 piros + ? kék), 7 eper > 5 eper.
- **Játszótér** (`SevenDotsPlayground`): „Pöttyözd ki Pötyit!” – egy nagy szám (4–7, leggyakrabban 7) mellett Pötyi; a gyerek pöttyöt tesz rá / vesz le, Pötyi visszajelez (kevés / sok / jó).
- **Játék** (`AHetG1Jatek`): Kérdések 3 × 8 (`A_HET_G1_QUESTIONS`), Párosító 3 szint (`A_HET_G1_PAIRS`; 3. szint: korongkép ↔ összeadás), Válogató 3 szint (`A_HET_G1_SORT`; 2. szint: hétnél kevesebb / pont 7, 3. szint: összeadások 6 vagy 7 eredménnyel).

Fájlok: `AHetG1Scenes.tsx` (a 7-ig tartó leckék közös képei is: `GroupBox` 0–7, `OpScene`, `ExprScene`, `SeqStrip`, `HousesScene`, `PinsScene`, `ChestCard`, `BirdsScene`), `AHetG1Parts.tsx`, `AHetG1Mese.tsx`, `AHetG1Jatek.tsx`, `index.ts`. Teszt: `src/test/grade1Topic3AHetG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját mese: a családi kép helyett Pötyi saját hét pöttye a kiindulás (5 + 2 a két szárnyon) – ez egyben az ujjkép és a dominókép is. A hét 7 napja saját kiegészítés.
- A kasza-vers helyett Pötyi szóban írja le a 7 írását (felül jobbra, ferdén le, kézírásban középen kis vonal); a gyerek a levegőbe írja.
- A könyv 84. oldali számegyenese 10-ig megy, nálunk csak 7-ig (a 8–10 még nem ismert).
- A bontást (7 = 4 + 3 stb.) korongképpel és „Hány kék korong van?” kérdéssel adjuk; üres négyzet (□) nincs, mert a nyitott mondat csak később jön.
- A „mennyivel több” jelölést (szám a relációs jelben) nem használjuk; a rajzolós, színezős feladatok koppintós formában (jelválasztás, válogatás) jelennek meg.
