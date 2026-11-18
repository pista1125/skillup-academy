# 11. Nyitott mondatok (1. osztály – III. Számkörbővítés, számolás 10-ig)

**Források:** OH-MAT01TA_I 104–105. o., OH-MAT01MA_I 55. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
Téli kép, mondatok befejezése („Több sapka van, mint…”); korongképek: 5 + □ = 8, 8 − □ = 5, 5 + □ = 6, 6 − □ = 5; fenyők és lombhullató fák: 5 + □ = 8, □ + 5 = 8, 8 − □ = 3, □ − 5 = 3 …; csengettyűk színezése (□ < 4, □ > 4, „milyen lett a 4-es?”), számegyenesen jelölés (□ > 5, 3 < □ < 8), karikázás (8 > □, 5 < □, 5 < □ < 8). Munkafüzet: □ + 5 = 8, 8 − □ = 3, 5 + □ = 6, □ − 1 = 5, □ + 2 = 7, 7 − □ = 2 képekkel; „karikázd be azokat a számokat, amelyek igazzá teszik” (□ < 8, □ > 2, 2 < □ < 6); hóember-gombok (6 < □ < 8, 2 + 5 > □ > 3 + 2, 7 − 3 < □ < 8 − 2).

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`NyitottMondatokG1Mese`, 12 oldal, 8 mini-feladat): éjjel havazott, és a hó betakart egy számot Pötyi számkártyái között – ott most üres doboz (□) van. 3 + □ = 5 hógolyókkal; próba: 3 + 2 = 5 igaz, 3 + 4 hamis; □ + 5 = 8 korongokkal; 8 − □ = 5 és □ − 5 = 3 áthúzással; □ < 4: a 0, 1, 2, 3 is jó (a 4 nem); „Melyik teszi igazzá?” (□ < 4, □ > 5, 2 < □ < 6); igaz vagy hamis (8 − 3 = 4); a végén elolvad a hó.
- **Játszótér** (`OpenSentencePlayground`): „Melyik szám bújt a hó alá?” – véletlen nyitott mondat (a + □ = c, □ + b = c, a − □ = c, □ − b = c, □ < k, □ > k, a < □ < b, 0–8), a gyerek kipróbál egy számot, a szám beíródik a dobozba, Pötyi megmondja, igaz-e. Egyenlőtlenségnél a jó számok zöldek maradnak, és Pötyi addig biztat („más szám is jó lehet”), amíg mindet meg nem találja.
- **Játék** (`NyitottMondatokG1Jatek`): Kérdések 3 × 8 (1. szint: nyitott mondat képpel; 2. szint: melyik szám teszi igazzá / melyik nem, kép nélküli nyitott mondat; 3. szint: igaz vagy hamis, □ − 5 = 3 típus, kis történetek), Párosító 3 szint (nyitott mondat ↔ szám; elvételes; kép ↔ nyitott mondat), Válogató 3 szint (igaz / hamis műveletek; 0–8 számai: □ < 4 igaz vagy hamis; 2 < □ < 6 igaz vagy hamis).

Fájlok: `NyitottMondatokG1Scenes.tsx` (`TruthIcon`, `IGAZ`/`HAMIS` válaszkép, `SnowyCardsScene`; az `EqCard` a □-et lila szaggatott dobozként rajzolja, kitölthető), `NyitottMondatokG1Parts.tsx`, `NyitottMondatokG1Mese.tsx`, `NyitottMondatokG1Jatek.tsx`, `index.ts`. Teszt: `src/test/grade1Topic3NyitottMondatokG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját történet (behavazott számkártyák) és saját számok; a □ „a hó alá bújt szám”.
- A többmegoldásos egyenlőtlenségeknél („karikázd be az összes jót”) a kérdésekben mindig pontosan egy válaszlehetőség igaz („Melyik szám teszi igazzá?”, illetve „Melyik NEM?”); az összes megoldást a Válogató 2–3. szintje (0–8 minden számát igaz/hamis kosárba) és a Játszótér kéri.
- A színezős (csengettyűk) és rajzolós (hóember-gombok) feladatok helyett koppintás; a csengettyűk kérdését („milyen lett a 4?”) a mese mondja el: a 4 nem kisebb, mint 4.
- A hóember-gombos összetett feladatokat (2 + 5 > □ > 3 + 2, 7 − 3 < □ < 8 − 2) kihagytuk – két művelet és két jel egyszerre túl nehéz olvasás nélkül; helyettük 6 < □ < 8 egyszerű formában.
- Az „Fogalmazz meg igaz állításokat a képről” beszélgetős feladatot az igaz/hamis kérdések (zöld pipa / piros kereszt) helyettesítik.
- A beszédhang a □-et „valahány”-nak olvassa (a közös felolvasó szabálya), a mesében „doboz”-nak hívjuk.
