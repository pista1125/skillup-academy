# 2. A tizenkettő (1. osztály – VI. Számkörbővítés, számolás 20-ig)

**Források:** OH-MAT01TA_II 42–51. o. („A tizenkettő” 42–43., „Számolás 0-tól 12-ig” 44–49., „Megálló” 50–51.), OH-MAT01MA_II 26–31. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
- **A tizenkettő (42–43.):** születésnapi zsúr képe (miből van 12), a 12 számjegy, dominópár (5|5 és 2|0), 10 labda hálóban + 2, számegyenes 0–20; sütik tálcán, jelek; szívószálak „1-gyel kevesebb” jelekkel, színes poharak számokkal (13-ig), mintasor (melyik a 12. helyen), 12 bontástáblázata (piros + kék pohár).
- **Számolás 0-tól 12-ig (44–49.):** 10 + 2, 2 + 10, 12 − 2, 12 − 10 képről; oszloponként 11 ± 1, 12 − 0 …; **tízesátlépés**: 8 + 4 = 8 + 2 + 2, 6 + 6 = 6 + 4 + 2, 7 + 5 = 7 + 3 + 2, 9 + 3 korongokkal; 12 − 4 = 12 − 2 − 2, 12 − 5 = 12 − 2 − 3; 12 bontása formákkal (12 = 4 + □ + 2); műveletek a számegyenesen; szöveges feladatok (12 − 5 cukorka, 12 − 4 − 3 palacsinta, „5 kék és 7-tel több piros lufi”); műveletlánc 12 − 6 + 4 + 2 − 8 + 3.
- **Megálló (50–51.):** csoportok megnevezése (terítéktárgyak / ennivalók), ablakok koordinátákkal (A1), párok száma, gyümölcsök számlálása, torta felvágása, **területfoglaló** két dobókockával (1–12), „Varázsos 11” ujjjáték.
- **Munkafüzet (MF 26–31.):** miből van 12, összehasonlítás jelekkel, szalvéták színezése, szaloncukrok bontása, pontok összekötése sorrendben, 9 + 3 = 9 + 1 + 2 és 12 − 3 = 12 − 2 − 1 korongokkal, dominók jelek szerint, 12 = 6 + □ …, színes rudak (5 + 7), három muffin összege 12, sorozat + 2, + 3, nyitott mondatok, szöveges feladat (8 és 5-tel kevesebb rétes), sorrendek a zsúrasztalon.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`ATizenkettoG1Mese`, 12 oldal, 9 mini-feladat): „Pötyi születésnapja”. 12 lufi; 1 tízes és 2 egyes két tízes keretben; a 12 írása; a 11 két szomszédja (10 és 12); a torta 12 epre két egyforma részre: 6 + 6, a 12 páros; 2 lufi kipukkad (12 − 2 = 10); 8 + 4 (előbb 10-re pótolunk) és 12 − 4 (előbb a 10-ig veszünk el); kockázás (6 + 6); rendrakás: melyik nem ennivaló.
- **Játszótér** (`DiceBoardPlayground`): **Területfoglaló** – Pötyi két kockával dob, a gyerek a pöttyök összegére koppint a 2–12-es körök közül; a jó kör Pötyi-korongot kap. „Új feladat” = új dobás, „Tiszta tábla” = új játék.
- **Játék** (`ATizenkettoG1Jatek`): Kérdések 3 × 8 (`A_TIZENKETTO_G1_QUESTIONS`), Párosító 3 szint (`A_TIZENKETTO_G1_PAIRS`: kép ↔ szám, két kocka ↔ összeg, művelet ↔ eredmény), Válogató 3 szint (`A_TIZENKETTO_G1_SORT`: ennivaló / játék, páros / páratlan 5–12, eredmény 11 vagy 12).

Fájlok: `ATizenkettoG1Scenes.tsx` (`BalloonsScene`, `DiceScene`, `DiceCard`, `diceG`), `ATizenkettoG1Parts.tsx`, `ATizenkettoG1Mese.tsx`, `ATizenkettoG1Jatek.tsx`, `index.ts`. A közös képek (`TwoFrames`, `TensRod`, `GroupBox`, `CompareScene`, `ExprScene`, `SeqStrip`, `PotyiScene` …) az `a-tizenegy/ATizenegyG1Scenes.tsx` fájlból jönnek. Teszt: `src/test/grade1Topic6ATizenkettoG1.test.tsx`.

## Eltérések a tankönyvtől
- A számok és a számegyenes legfeljebb 12-ig mennek (a könyvben 20-ig; a TK 43/2 poharain 13 is szerepel). A 12 nagyobb szomszédját (13) nem kérdezzük; helyette a 11 mindkét szomszédja szerepel.
- A tízesátlépést a könyv szerint tanítjuk (előbb 10-re pótolunk / a 10-ig veszünk el), felbontott műveletsor (8 + 2 + 2) helyett a két tízes keret képével és szóban.
- A Megállóból a válogatást (ennivaló / játék) és a területfoglalót vettük át; a területfoglaló táblán 2–12 van, mert két kockával 1-et nem lehet dobni (a könyv táblája 1-től indul). Kimaradt: ablak-koordináták, párok és sorrendek száma (kombinatorika), torta felvágása, ujjjáték, „mennyivel több” jelölés, műveletlánc, háromtagú műveletek.
- Saját mese és saját számok (Pötyi zsúrja, lufik, sütik, kockázás); a könyv szereplői nem jelennek meg. Könyvhibát nem találtunk.
