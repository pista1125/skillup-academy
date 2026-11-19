# 5. A tizenöt (1. osztály – VI. Számkörbővítés, számolás 20-ig)

**Források:** OH-MAT01TA_II 74–85. o. (A tizenöt, Számolás 0-tól 15-ig, Megálló), OH-MAT01MA_II 46–51. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
- **A tizenöt (TK 74–75, MF 46–47):** állatkerti kép („Miből van tizenöt?”), a 15 számjegye, dominók (5|5 és 5|0), tízes háló + 5 labda, a 15 a 0–20-as számegyenesen és számszomszédai, állatsorok karikázása, kakukktojás, banánok jelek szerint (> 3, < 2), „15 = zsiráf + zebra” táblázat, páratlan / kétjegyű számok; MF: miből van 15, nyitott mondatok (9 < □ < 14), „Melyik több? Mennyivel?”, páros-páratlan a számegyenesen, jelek.
- **Számolás 0-tól 15-ig (TK 76–81, MF 48–51):** gyöngysoros műveletek (11 + 4, 15 − 4), analógiák (3 + 2 → 13 + 2), 15 − 10 − 3; a **tízen átlépés a tízre pótlással**: 8 + 7 = 8 + 2 + 5, 9 + 6 ↔ 9 + 1 + 5 (párosítás), 15 − 6 = 15 − 5 − 1, 15 − 8 ↔ 15 − 5 − 3; korongképek (két ötös dominóminta), szöveges feladatok („6-tal több”, fókák), kártyák a számegyenesre, □-es pótlás, nyilas sorozatok, jelek (<, >, =).
- **Megálló (TK 82–85):** nyitott mondatok (9 < □, 15 > □ > 9), csökkenő sorrend kövekre írva + páratlanok, egyjegyű / páros számok, számházak (12–15), „9-cel több lepke”, összeg-kártyák 14-re és 15-re, „A 15-nél 7-tel kisebb”, sorozatok (+3, +2 +1), kombinatorika (virágok sorrendje), labirintus.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`ATizenotG1Mese`, „Pötyi és a halastó”, 12 oldal, 9 mini-feladat): 10 + 5 hal a tóban; Pötyi teli szárnya (1 tízes) + levél 5 pöttyel (5 egyes); két tízes keret, tízesrúd, dominópár; a 15 a számegyenesen (kisebb szomszéd, páratlan); ötösével számolás (5, 10, 15); **tízre pótlás**: 8 + 7 → „hány kell a tízhez?” → 8 + 2 + 5; kivonás a tízen át: 15 − 6 = 15 − 5 − 1; Csigusz visszafelé lépked a köveken (Megálló-ötlet); 15 hal > 12 hal.
- **Játszótér** (`FishNetPlayground`): „Halak a hálóba!” – a táblán egy szám (6–15, többnyire 11–15), a gyerek annyi halat (korongot) tesz a két tízes keretbe, előbb az első telik meg.
- **Játék** (`ATizenotG1Jatek`): Kérdések 3 × 8 (`A_TIZENOT_G1_QUESTIONS`; 3. szint: jelek, tízen át kivonás, számház, történetek, nyitott mondat, „9-cel több”), Párosító (hal ↔ szám; két keret ↔ tízesrúd; a könyv párosítója: 9 + 6 ↔ 9 + 1 + 5 stb.), Válogató (15 / nem 15; páros / páratlan; összeg pont 15 vagy kevesebb).

Fájlok: `ATizenotG1Scenes.tsx` (közös képek a 15–18-as leckékhez: `TwoFrames`, `MiniFrames`, `TensRod`, `GroupBox`/`MiniGroup` 0–20 tárggyal, `CompareScene`, `ScatterScene`, `ExprScene` (több soros művelet), `SeqStrip`, `HopLine` (0–max), `DominoPair`, `PotyiTenScene`, `FriendsScene`, `NumberHouse`; saját: `PondScene`, `FivesScene`, `StonesScene`), `ATizenotG1Parts.tsx`, `ATizenotG1Mese.tsx`, `ATizenotG1Jatek.tsx`, `index.ts`. Teszt: `src/test/grade1Topic6ATizenotG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját mese (halastó, halak, tavirózsák, kövek a patakon) a könyv állatkertje helyett; a lecke egyben feldolgozza a „Számolás 0-tól 15-ig” és a Megálló (TK 82–85) ötleteit is.
- Számkör: csak 0–15. A könyv a 15 mindkét számszomszédját kéri, a számegyenesek 20-ig mennek – nálunk csak a kisebb szomszéd (14), a számegyenes 15-ig tart. A könyv 15-öt meghaladó kártyái/ugrásai kimaradtak.
- A tízen átlépést pontosan a könyv módszerével tanítjuk (előbb a tízig, aztán tovább; a kivonásnál előbb vissza a tízig), a két tízes keret kék korongjai mutatják, mennyi kell a tízhez.
- A „relációs nyilas” jelölés (15 >5 □: „5-tel kisebb”) kimaradt, helyette szóban kérdezünk („9-cel többet”). A többmegoldásos nyitott mondatokat (9 < □ < 14) egyetlen megoldásúra szűkítettük (12 < □ < 14).
- Kimaradt: színezés, rajzolás, banánok rajzolása jelek szerint, magasabb/könnyebb állat, igaz-hamis állítások (olvasást igényelnek), kombinatorika (virágok sorrendje), labirintus, pénzes szövegalkotás, táblázatkitöltés (a 15 bontásait a számház és a Válogató 3. szintje helyettesíti).
- Könyvhiba nem volt (a kipróbált műveletek, párosítások és sorozatok eredményei rendben).
