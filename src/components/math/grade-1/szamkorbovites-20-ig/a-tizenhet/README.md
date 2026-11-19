# 7. A tizenhét (1. osztály – VI. Számkörbővítés, számolás 20-ig)

**Források:** OH-MAT01TA_II 92–99. o. (A tizenhét 92., Számolás 0-tól 17-ig 93–99.), OH-MAT01MA_II 56–59. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
- **A tizenhét (TK 92, MF 56):** játszótér-kép („Miből van tizenhét?”), a 17 számjegye, dominók (5|5 és 5|2), tízes háló + 7 labda, a 17 a 0–20-as számegyenesen és számszomszédai, tárgyak színezése és számlálása; MF: miből van 17, „Melyik több? Mennyivel?”, pontok összekötése 1–17.
- **Számolás 0-tól 17-ig (TK 93–99, MF 57–59):** 12 + 5, 5 + 12 korongokról, **számológép** (□ + △ = ○ táblázat), 17 − 5, 17 − 4, különbségek 17-ből; vödrök azonos eredménnyel + páros/páratlan, **három tag összege 17** (vödör + lapát + labda), kombinatorika (3 játék sorrendje); **tízen átlépés**: 9 + 8 = 9 + 1 + 7, 8 + 9 = 8 + 2 + 7, 17 − 8 = 17 − 7 − 1, 17 − 9 = 17 − 7 − 2, párosítás (17 − 9 ↔ 17 − 7 − 2, 16 − 8 ↔ 16 − 6 − 2), papírsárkányok összeggel, nyilak a számegyenesen, „8 lapát a vödörben, 17-ből hány hiányzik” szöveges feladat, hiányzó tagok (9 + □ = 17), betűrejtvény („labda”), **rejtvény azonos képekkel** (3 sapka = 15), **háromszög-szabály** (a sarkok összege a körben: 7, 1, 9 → 17), ritmusjáték, pénzfeldobás; MF: számházak 15–17, 17 = piros + sárga + kék forma, műveletkerekek (+ 8, − 5), nyitott mondatok (11 < □ < 17), „8 fiú, 4 lány és néhány felnőtt”, kártyák a számegyenesre, nyilas táblázatok (+ 6, − 7, + 8, − 9), △ + □ − 5 szabály, jelek.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`ATizenhetG1Mese`, „Pötyi és a gombaerdő”, 12 oldal, 10 mini-feladat): eső után gombák nőnek; 10 piros + 7 barna gomba; Pötyi teli szárnya (1 tízes) + 7 egyes; két keret, tízesrúd, dominópár; a 17 a számegyenesen (kisebb szomszéd 16, a 17 páratlan); Zümi számológépe (12 → + 5 → ?); 9 + 8 → „hány kell a tízhez?” → 9 + 1 + 7; 17 − 8 = 17 − 7 − 1; Csigusz visszafelé mászik a számegyenesen (17 − 9: előbb a 10-ig, aztán még 2); három kosár gomba (6 + 5 + 6).
- **Játszótér** (`BackToTenPlayground`): „Vissza a tízig!” – véletlen tízen átlépő kivonás (11–17 − valamennyi, eredmény 2–9). 1. lépés: mennyit veszünk el, hogy pont 10 maradjon; 2. lépés: mennyi marad (megjelenik a 17 − 7 − 1 alak, a korongok áthúzódnak).
- **Játék** (`ATizenhetG1Jatek`): Kérdések 3 × 8 (`A_TIZENHET_G1_QUESTIONS`; számlálás, tízes és egyes, számológép, tízre pótlás, 8 + 9, három kosár összege, jelek, 17 − 9 két lépésben, 9 + □ = 17, háromszög-szabály, „3 egyforma kosárban 15 gomba”, kis történetek), Párosító (gombák ↔ szám; tízesrúd ↔ 10 + egyes; 9 + 8 ↔ 9 + 1 + 7, 17 − 9 ↔ 17 − 7 − 2 stb.), Válogató (17 / nem 17; egyjegyű / kétjegyű; eredmény 15, 16 vagy 17).

Fájlok: `ATizenhetG1Scenes.tsx` (`ForestScene`, `MachineScene` – Zümi számológépe, `ThreeBaskets` – három kosár, „?”-es fedett kosarakkal is, `TriangleScene`), `ATizenhetG1Parts.tsx`, `ATizenhetG1Mese.tsx`, `ATizenhetG1Jatek.tsx`, `index.ts`; a közös képek: `../a-tizenot/ATizenotG1Scenes.tsx`. Teszt: `src/test/grade1Topic6ATizenhetG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját mese (gombaerdő a Számkert mellett) a könyv játszótere helyett; a könyv gyerekszereplői nem jelennek meg.
- Számkör: csak 0–17. A könyv a 17 mindkét számszomszédját kéri (a 18 még nem tanult szám), a számegyenesek (TK 92, 95, 96, MF 59/1) 20-ig mennek – nálunk csak a kisebb szomszéd (16), a számegyenes 17-ig tart.
- A számológépet (TK 93/2) egy szabállyal („mindig hozzáad 5-öt / 4-et”) mutatjuk, nem két bemenettel; a műveletkerekeket és nyilas táblázatokat ez helyettesíti.
- A „3 sapka = 15” képes rejtvényből (TK 99/1) csak az első lépés maradt (3 egyforma kosár, összesen 15 → 5, ötösével számolva); a többi sor (labda, zokni) kimaradt.
- A „8 lapát a vödörben, összesen 17” szöveges feladatot (TK 96/4) gombákkal mondjuk el; a „8 fiú, 4 lány, felnőttek” (MF 58/3) kimaradt.
- Kimaradt: színezés, pontok összekötése, kombinatorika (3 játék sorrendje), betűrejtvény, ritmus- és pénzfeldobós játék, többmegoldásos nyitott mondatok (11 < □ < 17), △ + □ − 5 szabály, „mennyivel nagyobb” jelölés.
- Könyvhiba nem volt (a táblázatok, számházak, kerekek és nyilas sorok eredményei rendben). Megjegyzés: az MF 57/3 „Színezz ki 2 formát” feladat mintasorában 3 forma (△ ○ □) áll, ami félreérthető.
