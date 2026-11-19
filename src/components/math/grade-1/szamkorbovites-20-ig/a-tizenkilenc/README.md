# 9. A tizenkilenc (1. osztály – VI. Számkörbővítés, számolás 20-ig)

**Források:** OH-MAT01TA_II 106–111. o. (A tizenkilenc, Számolás 0-tól 19-ig, Megálló 110–111), OH-MAT01MA_II 64–67. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
- **A tizenkilenc (TK 106, MF 64):** baromfiudvar-kép („Miből van tizenkilenc?”), a 19 számjegye, dominók (5|5 és 5|4), háló 10 labdával + 9 labda, a 19 a számegyenesen és számszomszédai, állatcsoportok „Melyik több? Mennyivel?” jelekkel; MF: miből van 19, kockaoszlopok jelekkel, kétjegyű páratlan számok színezése.
- **Számolás 0-tól 19-ig (TK 107–109, MF 65–67):** összeadás és kivonás képekről (csibék, libák, tojások), kártyák a számegyenesre (19 − 7, 19 − 9, 17 − 9, 19 − 5, 14 + 5, 17 − 5, 16 − 8, 19 − 6), „mit tapasztaltál?” sor (19 − 3 − 10 = 19 − 10 − 3 = 19 − 13), tojások a 18-as és 19-es fészekbe (háromtagú műveletek), „3 tyúk, 8-cal több liba, 5 kacsa”, bűvös háromszög, képes egyenletek (kakas + kakas + 1 = 19), lábak száma, nyitott mondat (18 − 9 < □ < 8 + 6); MF: 19 = fehér + fekete táblázat, összeadások, hiányzó szám kiválasztása, 19, 17, 15… sorozat, „19 tojásból 7 már a kosárban”, „11 kiscsibe, 8-cal több kiskacsa”, itatós műveletláncok, 12 + 7 − 11, különbség-háromszögek, nyitott mondatok.
- **Megálló (TK 110–111):** számok helye a számegyenesen és emlékezetből, „számlálás nélkül melyik színből van a legtöbb?”, „Mi változott meg?”, azonos eredményű lufik (13 + 6, 15 + 4 …), összeadótábla képrészletekkel.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`ATizenkilencG1Mese`, „Pötyi és az eperszüret”, 12 oldal, 10 mini-feladat): kosár (10 eper) + 9 szem; Pötyi teli szárnya + 9 egyes; két keret, tízesrúd, dominópár; a 19 a számegyenesen (kisebb szomszéd); a 19 páratlan (a két keretben egy korong pár nélkül marad); Csigusz 16, Zümi 19 epre – mennyivel több?; 8 + 6 + 5 három levélen; a rigó elcsen 9-et: 17 − 9 = 17 − 7 − 2; titkos szám (eper + eper + 1 = 19); színes bogyók – melyikből van a legtöbb? (Megálló).
- **Játszótér** (`EperEpitoPlayground`): „Eperépítő” – Pötyi mond egy számot (11–19); a gyerek kosárral (1 tízes) és szem eperrel (egyesek) rakja ki, a pipával ellenőriz; Pötyi szól, ha hiányzik a tízes, kevés vagy sok (10 szem helyett kosarat kér).
- **Játék** (`ATizenkilencG1Jatek`): Kérdések 3 × 8 (`A_TIZENKILENC_G1_QUESTIONS`; számlálás, tízes és egyes, színes bogyók, 19 − 10, 19 − 8, 19 − □ = 14, 19, 17, 15… sorozat, ugrás a számegyenesen, mennyivel több, képes egyenlet, 9 + 6 + 4, 17 − 9, „8-cal több”, „7 már a kosárban”, nyitott mondat, azonos eredmény, „Mi változott meg?”), Párosító (eprek ↔ szám; a könyv számegyenes-kártyái ↔ eredmény; a Megálló azonos eredményű lufijai), Válogató (19 / nem 19; egyjegyű / kétjegyű; a könyv tojásai a 18-as és 19-es fészekbe).

Fájlok: `ATizenkilencG1Scenes.tsx` (`basketG`, `BasketScene`, `PicEqScene`, `ColorDotsScene`, `DotPic` – egy korábbi ágenstől, megtartva; új: `ThreeLeavesScene`, `SpotScene`, `BasketIcon`, `EperIcon`), `ATizenkilencG1Parts.tsx`, `ATizenkilencG1Mese.tsx`, `ATizenkilencG1Jatek.tsx`, `index.ts`; a közös képek: `../a-tizenot/ATizenotG1Scenes.tsx`. Teszt: `src/test/grade1Topic6ATizenkilencG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját mese (eperszüret a Számkertben; kosár = 1 tízes) a könyv baromfiudvara helyett; a „Számolás 0-tól 19-ig” és a Megálló (TK 110–111) ötletei is ebben a leckében vannak (normál lecke, 3 × 8 kérdés).
- Számkör: csak 0–19. A könyv a 19 mindkét számszomszédját kéri (a 20 még nem tanult), a számegyenesek 20-ig mennek – nálunk csak a kisebb szomszéd (18), a számegyenes 19-ig tart.
- A könyv kártyái közül a 16 − 8 és 17 − 9 is 8 – a Párosítóban (egyértelműség miatt) csak a 17 − 9 maradt, helyette 14 + 5 ↔ 19.
- A „Mi változott meg?” képpárból saját, számolós változat lett (hány eper tűnt el?); a „számlálás nélkül” becslés nálunk megszámolható (8 / 6 / 5, illetve 8 / 7 / 4).
- Kimaradt: bűvös háromszög, lábak száma, emlékezetből írás, összeadótábla képrészletekkel, különbség-háromszögek, 19 = fehér + fekete táblázat, itatós műveletláncok, színezések. A „3 tyúk, 8-cal több liba” helyett „Csigusz 11, Zümi 8-cal több” (MF 66/2 mintájára).
- Könyvhiba nem volt (a tojások, kártyák, képes egyenletek és nyitott mondatok eredményei rendben); csak a tanult számkörön túli 20.
