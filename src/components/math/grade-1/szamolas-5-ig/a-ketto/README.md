# 2. A kettő (1. osztály – II. Számolás 0-tól 5-ig)

**Források:** OH-MAT01TA_I 42–43. o., OH-MAT01MA_I 23–24. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
Erdei kép kisvasúttal („Miből van kettő? Miből van kettőnél több / kevesebb?”), ujjkép, dominókép, a 2-es számjegy és helye a számegyenesen, csoportosítás kettesével (gesztenyék), színezés („amelyikből 2 van”), a 2 írása, kártya–dominó összekötés, állatok számának lejegyzése és összehasonlítása (<, >, =). Munkafüzet: rajzolással / áthúzással legyen 2, a 2 felismerése ujj- és dobókocka-képen, madarak rajzolása jelek szerint, dominó a számegyenesen, „melyik béka ugrott kettőt?”, termések pöttyözése és összehasonlítása.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`AKettoG1Mese`, 11 oldal, 5 mini-feladat): Pötyi a Számkertben találkozik Zümivel, a méhecskével. Zümi két szárnya, egy virág és még egy virág, „Hol van két virág?”, a 2-es írásiránya (DigitTrace), két ujj és két pötty, párban lógó cseresznyék, a 2 a számegyenesen az 1 után, Zümi két ugrása a számegyenesen, 2 eper > 1 eper.
- **Játszótér** (`MakeTwoPlayground`): „Legyen itt kettő!” – 1, 3 vagy 4 tárgyból indul; a gyerek „Még egy” gombbal tesz hozzá, vagy koppintással vesz el (a munkafüzet „rajzolj vagy húzd át” feladata), Pötyi visszajelez.
- **Játék** (`AKettoG1Jatek`): Kérdések 3 × 8 (`A_KETTO_G1_QUESTIONS`), Párosító 3 szint (`A_KETTO_G1_PAIRS`), Válogató 3 szint (`A_KETTO_G1_SORT`; 3. szint: párban járó dolgok – zokni, szemek, kesztyű, cseresznye – és amiből egy van).

Fájlok: `AKettoG1Scenes.tsx` (a `GroupBox`, `MiniGroup`, `CompareScene`, `DotPairs` dobozokat a nulla és a három leckéje is használja), `AKettoG1Parts.tsx`, `AKettoG1Mese.tsx`, `AKettoG1Jatek.tsx`, `index.ts`. Teszt: `src/test/grade1Topic2AKettoG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját mese és képek: a sok részletes erdei kép helyett Zümi, a méh mutatja a kettőt (szárnyak, virágok, cseresznye).
- Számkör: válaszként csak az 1 és a 2 szerepel; a nagyobb mennyiségek csak képen, „több / sok” néven jelennek meg (a könyv számegyenese 10-ig, a munkafüzeté 5-ig tart – a mi számegyenesünk 5-ig, de csak az 1 és a 2 a kérdés). A 0 még nem válasz (a nulla a következő lecke).
- A 2-es írását a gyerek a levegőbe „írja” (zöld kezdőpont, szaggatott nyomvonal); a könyvi hattyús vers helyett saját kép: „olyan, mint egy kis kacsa a vízen”.
- A „melyik béka ugrott kettőt” feladat helyett Zümi ugrál a számegyenesen, és azt kérdezzük, hová ért.
- A gesztenyék kettesével csoportosítását a „párban járó dolgok” válogatója és a párban lógó cseresznye helyettesíti.
