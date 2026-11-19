# 3. A tizenhárom (1. osztály – VI. Számkörbővítés, számolás 20-ig)

**Források:** OH-MAT01TA_II 56–63. o. („A tizenhárom” 56–57., „Számolás 0-tól 13-ig” 58–63.), OH-MAT01MA_II 34–39. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
- **A tizenhárom (56–57.):** tóparti kép (gólyák, fecskék, békák, tavirózsák: miből van 13), a 13 számjegy, dominópár (5|5 és 3|0), 10 labda hálóban + 3, számegyenes 0–20; ki mit számolt (halak, legyek, kalászok); fészkek tojásokkal jelek szerint, békák a leveleken a 0–14-es számegyenesen, a 13 bontástáblázata (béka + hal).
- **Számolás 0-tól 13-ig (58–63.):** 1 + 2 és 11 + 2 képről; **ugrások a számegyenesen**: 1 + 12 = 1 + 2 + 10 = 1 + 10 + 2, 13 − 11 = 13 − 1 − 10 = 13 − 10 − 1; színes rudak áthúzással (13 − 1, 13 − 11); „11-nél 2-vel több”, „13-nál 3-mal kevesebb”; **tízesátlépés**: 9 + 4 = 9 + 1 + 3, 13 − 5 = 13 − 3 − 2 korongokkal; 9 + 1 … 5 + 8 sorok; béka ugrik a számegyenesen; műveletlánc; „9 egér és 4-gyel több béka”, füllentős játék.
- **Munkafüzet (MF 34–39.):** miből van 13, pöttyök összehasonlítása, jelek, „mennyivel több” jelek; hangya + béka = 13 táblázat, 13 bontása lepkeszárnyon, sorszám szerinti színezés, mintasor; 8 + 5, 9 + 4 korongokkal, nyíl-műveletek, 9 + 1 + 3 = 9 + 4, 13 − 3 − 1 = 13 − 4; virágszirmos műveletcsaládok, számegyenes 0–13, különbségek táblázata; torony (összeg 13), műveletsorok, házak színezése (páros/páratlan, egy-/kétjegyű), nyitott mondatok, „5 békafej látszik, 13 béka a tóban”, számpiramis.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`ATizenharomG1Mese`, 12 oldal, 9 mini-feladat): „Pötyi és a tizenhárom béka”. Kirándulás a tóhoz; 13 béka a tavirózsa-leveleken; 1 tízes és 3 egyes két tízes keretben; a 13 írása; a 12 szomszédai (11 és 13); a béka ugrik a számegyenesen: 1 + 12 = előbb 10, aztán 2; 3 béka a vízbe ugrik (13 − 3 = 10); 9 + 4 (előbb 10-re pótolunk) és 13 − 5 (előbb a 10-ig veszünk el); „2-vel több, mint 11”; 13 > 12.
- **Játszótér** (`FrogHopPlayground`): **Békaugrás** – a béka a 0–13-as számegyenes egyik számán ül, előre vagy hátra ugrik néhány lépést (pl. 9 + 4, 13 − 5); a gyerek a célszámra koppint, és megjelenik az ugrás íve.
- **Játék** (`ATizenharomG1Jatek`): Kérdések 3 × 8 (`A_TIZENHAROM_G1_QUESTIONS`), Párosító 3 szint (`A_TIZENHAROM_G1_PAIRS`: békák ↔ szám, korongok ↔ tízesrúd, művelet ↔ eredmény), Válogató 3 szint (`A_TIZENHAROM_G1_SORT`: 13 / nem 13, **egyjegyű / kétjegyű**, eredmény 12 vagy 13).

Fájlok: `ATizenharomG1Scenes.tsx` (`frogG`, `FrogPondScene` vízbe ugró békákkal, `FrogCard`, `PondFriendsScene`), `ATizenharomG1Parts.tsx`, `ATizenharomG1Mese.tsx`, `ATizenharomG1Jatek.tsx`, `index.ts`. A közös képek az `a-tizenegy/ATizenegyG1Scenes.tsx` fájlból jönnek. Teszt: `src/test/grade1Topic6ATizenharomG1.test.tsx`.

## Eltérések a tankönyvtől
- A számok és a számegyenesek legfeljebb 13-ig mennek. KÖNYVHIBA / pontatlanság: a TK 57/2 számegyenese 14-ig megy, a TK 62/3 és az MF 39/2 számegyenese 20-ig – a 14 még nem ismert. Az MF 39/3 „□□ < 2 11” feladatában az eredmény (9) egyjegyű, mégis két számjegyhely van; az MF 38/2-ben „10 - 1” kötőjellel szerepel a mínuszjel helyett.
- A 13 nagyobb szomszédját (14) nem kérdezzük; helyette a 12 mindkét szomszédja szerepel.
- A számegyenes-ugrásból a könyv két útja közül egyet mutatunk (1 + 12: előbb 10, aztán 2); a 13 − 11 felbontása kimaradt, a 13 − 10 és 13 − 3 képpel szerepel.
- A tízesátlépés a könyv módszerével (9 + 1 + 3, 13 − 3 − 2), de a két tízes keret képével és szóban, felbontott műveletsor nélkül.
- Kimaradt: „mennyivel több” jelölés (szám a relációs jelben), „4-gyel több béka” típusú összehasonlító szöveges feladat (helyette egyszerűbb: „2-vel több, mint 11”), műveletláncok, háromtagú műveletsorok, füllentős játék, színezések.
- Saját mese és saját számok (kirándulás, tavirózsás békák); a könyv szereplői nem jelennek meg.
