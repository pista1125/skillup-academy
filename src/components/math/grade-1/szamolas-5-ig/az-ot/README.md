# 6. Az öt (1. osztály – II. Számolás 0-tól 5-ig)

**Források:** OH-MAT01TA_I 54–57. o., OH-MAT01MA_I 32–33. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
Kerti szüret-kép („Miből van 5? Miből van 5-nél több, kevesebb?”), ujjkép (egész kéz), dominókép, az 5-ös számjegy (versike), számegyenes; csoportosítás ötösével; az 5 írása; zöldségek kosárban, összehasonlítás jelekkel; „Mennyivel több?” – párba állítás és jelölés (5 1> 4); hiányzó számok a számegyenesen; az 5 bontása piros–kék korongokkal (kockaképben) és madárijesztős táblázattal. Munkafüzet: 5-5 levél színezése, 5 tök a talicskában, gombák pöttyei a jelek szerint, ásók–gereblyék bontása, 5 madár a madárijesztő két vállán.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`AzOtG1Mese`, 12 oldal, 7 koppintós feladat): szilvaszüret a Számkertben Pötyivel, Zümivel és Csigusszal. 5 szilva a fán, egy kéz öt ujja, az 5-ös írása (a könyv írásiránya szerint, `DigitStrokes`), tengeri csillag és dominó, 5 szilva a kosárban, az 5 a számegyenesen, „mennyivel több?” párba állítással (5 szilva – 4 körte), 5 > 4, az 5 bontása korongokkal (3 piros + ? kék), madárijesztő 2 + 3 madárral.
- **Játszótér** (`WheelbarrowPlayground`): a talicskában már van 0–4 tök; a gyerek a halomból koppint, amíg pontosan 5 nem lesz (túl soknál kivehet). Új feladat gomb.
- **Játék** (`AzOtG1Jatek`): Kérdések 3 × 8 (`AZ_OT_G1_QUESTIONS`), Párosító 3 szint (`AZ_OT_G1_PAIRS`), Válogató 3 szint (`AZ_OT_G1_SORT`).

Fájlok: `AzOtG1Scenes.tsx`, `AzOtG1Parts.tsx`, `AzOtG1Mese.tsx`, `AzOtG1Jatek.tsx`, `index.ts` (közös képek: `../a-negy/ANegyG1Scenes.tsx`). Teszt: `src/test/grade1Topic2AzOtG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját mese (szilvaszüret) a sok szereplős kerti kép helyett; a versike helyett Pötyi saját leírása („kalap és kerek pocak”).
- A közös `DigitTrace` 5-öse a felső vonallal kezdene; a könyv szerint először lefelé és a pocak, aztán a kalap – a lecke saját `DigitStrokes` képe így mutatja.
- A könyv 56. oldalán a számegyenes 6-ig tart, és az 54. oldalon 10-ig – ez itt még nem tanult szám; nálunk a számegyenes 0–5.
- A „mennyivel több?” jelölését (a szám a jel csőrében: 5 1> 4) nem írjuk ki, csak szóban és párba állítással kérdezzük; a jelölés kis gyereknek, olvasás nélkül nehezen érthető.
- A „Rajzolj annyit, hogy 5 legyen” helyett koppintós talicska-játék és „Hány tök fér még bele?” kérdés (szaggatott üres helyekkel) van.
- A csoportosítás ötösével és a „színezz 5-5 levelet” kimaradt (5-nél több tárgyat kíván).
