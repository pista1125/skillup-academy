# 6. A tizenhat (1. osztály – VI. Számkörbővítés, számolás 20-ig)

**Források:** OH-MAT01TA_II 86–91. o. (A tizenhat, Számolás 0-tól 16-ig), OH-MAT01MA_II 52–55. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
- **A tizenhat (TK 86, MF 52–53):** szárítókötél-kép (pólók, nadrágok; „Miből van tizenhat?”), a 16 számjegye, dominók (5|5 és 5|1), tízes háló + 6 labda, a 16 a 0–20-as számegyenesen és számszomszédai, csipeszek táblázata (16 = piros + sárga), mezek színezése (egyjegyű/kétjegyű, páros/páratlan); MF: miből van 16, zoknik színezése 2-esével, 4-esével, 8-asával, „Melyik több? Mennyivel?”, sorszámozás 16-ig, számszomszédok, jelek.
- **Számolás 0-tól 16-ig (TK 87–91, MF 54–55):** színesrudas műveletnégyesek (11 + 5, 5 + 11, 16 − 11, 16 − 5), relációs nyilak, pólók és nadrágok párosítása (12 + 4 ↔ 16), „□ = 16 − 4” alak, „3-mal több” szabály és táblázat, **tízen átlépés**: 7 + 9 = 7 + 3 + 6, 16 − 8 = 16 − 6 − 2, összegtáblázat (9 + 4 … 9 + 7), különbségek, szöveges feladatok („7-tel kevesebb kék zokni”, csíkos és zöld pólók), nyilas sorozatok, kártyák a számegyenesre, csipesz-táblázat (pólónként 2); MF: 16 = □ + □ + □, mérőszámok dm-rel, sorszámnév a meztől balra/jobbra.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`ATizenhatG1Mese`, „Pötyi és a pillangók tánca”, 12 oldal, 9 mini-feladat): 10 lila + 6 narancs pillangó; Pötyi teli szárnya (1 tízes) + 6 egyes; két keret, tízesrúd, dominópár; a 16 a számegyenesen (kisebb szomszéd); párban táncoló pillangók – kettesével 16-ig, a 16 páros; 8 + 8 a tízen át; 7 + 9 → „hány kell a tízhez?” → 7 + 3 + 6; 16 − 8 = 16 − 6 − 2; négyesével 16-ig.
- **Játszótér** (`TenBridgePlayground`): „Előbb a tízig!” – véletlen tízen átlépő összeadás (6–9 + valamennyi, összeg 11–16). 1. lépés: hány kell a tízhez (két keret, piros korongok); 2. lépés: mennyi összesen (megjelennek a kékek és a 7 + 3 + 6 alak).
- **Játék** (`ATizenhatG1Jatek`): Kérdések 3 × 8 (`A_TIZENHAT_G1_QUESTIONS`; párok száma, kettesével sorozat, 16 = 8 + 8, számház, „3-mal több”, sorszámnév), Párosító (pillangók ↔ szám; két keret ↔ 10 + egyes; 7 + 9 ↔ 7 + 3 + 6 stb.), Válogató (16 / nem 16; páros / páratlan a könyv mezeinek számaival; összegek 14, 15, 16 kosárba).

Fájlok: `ATizenhatG1Scenes.tsx` (`ButterflyScene`, `GroupRow` – csoportonként váltakozó szín, `ButterflyRow` – sorszámnévhez), `ATizenhatG1Parts.tsx`, `ATizenhatG1Mese.tsx`, `ATizenhatG1Jatek.tsx`, `index.ts`; a közös képek: `../a-tizenot/ATizenotG1Scenes.tsx`. Teszt: `src/test/grade1Topic6ATizenhatG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját mese (pillangók a Számkertben) a könyv szárítókötele és ruhái helyett; a „Számolás 0-tól 16-ig” rész is ebben a leckében van.
- Számkör: csak 0–16. A könyv a 16 mindkét számszomszédját kéri (a 17 még nem tanult szám), a számegyenesek 20-ig mennek – nálunk csak a kisebb szomszéd (15), a számegyenes 16-ig tart.
- A 8-asával színezés (MF 52/2) helyett a mesében 2-esével és 4-esével számolunk; a „□ = 16 − 4” fordított alak, a relációs nyilak, a dm-es mérőszámok és a 16 = □ + □ + □ hármas bontás kimaradt.
- Sorszámnév: a könyv „a meztől balra/jobbra” feladata helyett egy irányban (Csigusztól) számolunk, hogy a jobb–bal ne zavarja a gyereket.
- Kimaradt: színezés, táblázatkitöltés (a bontásokat a számház és a Válogató 3. szintje helyettesíti), szöveges „7-tel kevesebb” feladat (helyette „3-mal több” és elvételes történet).
- Könyvhiba nem volt (a táblázatok, sorozatok és párosítások eredményei rendben).
