# 3. Páros és páratlan számok (1. osztály – III. Számkörbővítés, számolás 10-ig)

**Források:** OH-MAT01TA_I 80–81. o., OH-MAT01MA_I 43. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
Gyerekek párban („Hogyan nevezzük a párban állókat? Hány gyerek álljon fel, hogy mindenkinek legyen párja?”), zoknik 1–6 darab, párkeresés, „Ezek páros számok / Ezek páratlan számok”, számegyenes színezése (páros piros, páratlan kék, „A 0 páros szám”), vázák páros számú virággal, műveletek eredménye páros/páratlan (házak kéménye), gyöngysorok páros számú zöld gyönggyel. Munkafüzet: cicák és egérzsákok (páros számú egér), gyümölcskosarak páratlan számmal, almák műveletekkel (páros piros, páratlan sárga).

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`ParosEsParatlanSzamokG1Mese`, 11 oldal, 7 mini-feladat): „Pötyi és a katicabál” – a katicák párban táncolnak; 4 katica (mindenkinek van párja), 5 katica (egy egyedül marad); páros = mindenkinek jut pár, páratlan = egy egyedül marad; 3 és 6 zokni a kötélen; a számegyenes 0–6 színesen (a 0 is páros); „Melyik szám páros?”; 2 + 1 eredménye; hány méh kell még, hogy mindenkinek legyen párja.
- **Játszótér** (`PairingPlayground`): „Párba állítás” – 1–6 katica, a gyerek kettesével párba koppintja őket (újra koppintva a pár szétválik), aztán választ: páros vagy páratlan; Pötyi szól, ha még nem állított párba mindenkit.
- **Játék** (`ParosEsParatlanSzamokG1Jatek`): Kérdések 3 × 8 (`PAROS_ES_PARATLAN_SZAMOK_G1_QUESTIONS`; 1. szint párba állított képek, 2. szint számok, számegyenes, dobozok, 3. szint műveletek eredménye, kiegészítés, következő páros szám), Párosító 3 szint (zokni ↔ párja, párba rendezett korongok ↔ szám, művelet ↔ eredmény), Válogató 3 szint (páros / páratlan kosár: képek, számok 0–6, műveletek).

A „páros” és „páratlan” válasz mindig képpel is megjelenik (két korong párban / pár + egy magányos), így olvasás nélkül is választható.

Fájlok: `ParosEsParatlanSzamokG1Scenes.tsx` (zokni, párba állítás, korongpárok, páros/páratlan ikon, színes számegyenes, bál), `ParosEsParatlanSzamokG1Parts.tsx`, `ParosEsParatlanSzamokG1Mese.tsx`, `ParosEsParatlanSzamokG1Jatek.tsx`, `index.ts` (dobozok, sorok: `../a-hat/AHatG1Scenes.tsx`). Teszt: `src/test/grade1Topic3ParosEsParatlanSzamokG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját mese (katicabál) a gyerekcsoport képe helyett; a párokat zöld keret és kézfogás mutatja, a magányost szaggatott kör.
- A könyv a 0-t számegyenes-színezéssel mutatja párosnak – nálunk is a színes számegyenes adja, és kérdés is van rá (a 3. szinten az 5 − 5 eredménye).
- A színezős (váza, kémény, gyöngysor, alma) és labirintusos (cicák–egerek) feladatok koppintós válogatássá / kérdéssé alakultak; a gyöngysoros (több megoldású) feladat kimaradt.
- Számkör: 0–6, ahogy a könyv is.
