# 19. Szöveges feladatok (1. osztály – III. Számkörbővítés, számolás 10-ig)

**Források:** OH-MAT01TA_I 128–129. o., OH-MAT01MA_I 66–67. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
TK 128: a megoldás lépései („Készíts rajzot! Jegyezd le számokkal is! Írd le művelettel! Válaszolj a kérdésre!”), cinke két etetőben (4 + 6), 7 cinke és 3 veréb, 2 vaddisznó + 3 szarvas + 5 nyúl. TK 129: nyuszi 10 répájából 4-et megevett, „7 mókus és 2-vel kevesebb nyúl”, őzike és vaddisznó „2-vel kevesebb” táblázat. MF 66: hógolyók összesen (3 + 4), „először 5, aztán még 3”, „6 dió és 2-vel több mogyoró”. MF 67: 8 almából 4-et megettek (áthúzással), „9 síel, 3-mal kevesebben szánkóznak”, hóember: 4 gomb leesett, 3 maradt – hány volt?

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`SzovegesFeladatokG1Mese`, „Pötyi mesedélutánja”, 11 oldal, 8 mini-feladat): Pötyi rövid meséket mond, a gép felolvassa. A négy lépés képpel (hallgasd meg – nézd meg – + vagy − – válaszolj); hógolyók összesen (melyik művelet? aztán mennyi?), Csigusz megeszi az almákat (8 − 3), jön még 3 madár, 4 madár elrepül, „2-vel több” hópehely, „3-mal kevesebb” hógolyó, melyik kép illik a meséhez.
- **Játszótér** (`StoryMachinePlayground`): Pötyi mesegépe – véletlen egylépéses mese (összeadás vagy kivonás 10-ig, hógolyó/madár/alma), képpel; a gyerek előbb a + vagy − jelet választja, aztán az eredményt (0–10). A mese újrahallgatható.
- **Játék** (`SzovegesFeladatokG1Jatek`): Kérdések 3 × 8 (`SZOVEGES_FELADATOK_G1_QUESTIONS`): 1. szint egylépéses mesék képpel (összesen, maradt, jött még, kép a meséhez); 2. szint: melyik művelet / melyik mondat illik a meséhez; 3. szint: ennyivel több / kevesebb, hány volt az elején, kiegészítés 10-re, mennyivel több. Párosító (kép ↔ művelet, művelet ↔ eredmény, „mennyivel több” kép ↔ szám), Válogató (+ vagy −; jön vagy megy a nyíl; hallgatott mese: több lett vagy kevesebb).

Fájlok: `SzovegesFeladatokG1Scenes.tsx` (`StoryStepsScene`, `TwoPilesScene`, `MoreLessScene`, `ArrowCard`, `SpeakerFig`, `FallenButtonsExtra`), `SzovegesFeladatokG1Parts.tsx`, `SzovegesFeladatokG1Mese.tsx`, `SzovegesFeladatokG1Jatek.tsx`, `index.ts`. Közös képek: `a-tiz` (etető, Pötyi szárnyai, két sor), `a-nyolc` (`CountBox`, `MiniBox`, `EqCard`, `SnowmanScene`), `szamolas-0-tol-10-ig` (`PinsScene`). Teszt: `src/test/grade1Topic3SzovegesFeladatokG1.test.tsx`.

## Eltérések a tankönyvtől
- A gyerek nem olvas: minden mesét a gép mond el (a kérdés 1 rövid mondat a képernyőn). A könyv „Írd le művelettel! Válaszolj!” lépéseit két koppintás helyettesíti: melyik művelet illik a meséhez, aztán mennyi az eredmény. A „Készíts rajzot!” helyett a gyerek kiválasztja a meséhez illő képet.
- Csak egylépéses mesék (a brief szerint): a háromtagú összeadás (TK 128/3: 2 + 3 + 5) kimaradt.
- „Hány volt?” (MF 67/3) fordított feladat: a képen a leesett gombok is látszanak, így visszarakással (összeadással) megoldható.
- Az őzike–vaddisznó „2-vel kevesebb” táblázat (TK 129/3) helyett két külön „ennyivel kevesebb” mese van; a „mennyivel több” kérdés párba állítós képpel.
- Saját szereplők és tárgyak (Pötyi, Zümi, Csigusz; hógolyó, madár, alma, bábu); a könyv gyerekszereplői és erdei állatai nem szerepelnek.
