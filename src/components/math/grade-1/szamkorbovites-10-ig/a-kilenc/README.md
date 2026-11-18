# 13. A kilenc (1. osztály – III. Számkörbővítés, számolás 10-ig)

**Források:** OH-MAT01TA_I 108–111. o., OH-MAT01MA_I 56–57. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
TK 108: téli erdei kép („Miből van kilenc? Kilencnél több / kevesebb?”), ujjkép (5 és 4), dominó (5|4), a 9-es számjegy, gyerekek a 0–10-es számegyenesen, vers a 9-ről („megfordítva hatos lehet”), „Jelöld a 9 számszomszédait!”, táblázat a kép tárgyairól. TK 109: a 9 írása; tobozok a fenyőfákon különbség-jelöléssel (6 <3 □, 9 >5 □), szaloncukrok rajzolása jelek szerint. TK 110: számsor 0–9 (páros piros, páratlan kék), jelek (9 □ 6 …), bögrék színezése: a 9 bontásai táblázatban (9 = 9 + 0 … 9 = □ + □). TK 111: képek összekötése a számegyenessel, fenyők díszítése 9 dísszel háromféle színnel (9 = 1 + 5 + 3). Munkafüzet 56–57: „színezd, amiből pontosan 9 van”, a 9 írása, termések összehasonlítása jelekkel, dominók összehasonlítása, diók (a két szám összege 9), műveletek képről, fenyő számokkal (minden sorban 9).

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`AKilencG1Mese`, 12 oldal, 6 mini-feladat): „Pötyi és az ünnepi fenyőfa” – a barátok feldíszítik a Számkert fenyőjét: 9 dísz; 8 piros meg 1 kék dísz = 9 (tízes keret); a 9-es írásiránya („megfordítva hatos lesz”); 9 ujj (5 és 4), dominó 5|4, tízes keret; „Hol van 9 toboz?”; a 9 a számegyenesen, kisebb szomszédja; 6 kék + 3 piros bögre (bontás); a szél lefújt díszeket – hány kell még a 9-hez?; 9 ajándék > 7 ajándék; párba rakott díszek – a 9 páratlan.
- **Játszótér** (`DecorateTreePlayground`): „Díszítsd fel a fát!” – a táblán egy szám (3–9, leggyakrabban 9), a gyerek a fa 9 akasztójára koppintva díszeket tesz fel / vesz le, Pötyi visszajelez (kevés / sok / pont).
- **Játék** (`AKilencG1Jatek`): Kérdések 3 × 8 (`A_KILENC_G1_QUESTIONS`), Párosító 3 szint (`A_KILENC_G1_PAIRS`), Válogató 3 szint (`A_KILENC_G1_SORT`; 3. szint: összeadások – kilencnél kevesebb vagy pont kilenc).

Fájlok: `AKilencG1Scenes.tsx` (ünnepi ikonok `XMAS`: dísz, toboz, csengő, ajándék, bögre, mézeskalács csillag/szív, sál, boríték, szánkó; `XBox`/`XMini` 0–10 tárggyal, `XCompare`, `XRow`, `TreeScene` 9 akasztóval, `HolidayGardenScene`, `PairUpScene`, `TwoRows` – a 14–16. lecke is ezeket használja), `AKilencG1Parts.tsx`, `AKilencG1Mese.tsx`, `AKilencG1Jatek.tsx`, `index.ts`. Felhasznált közös képek: `a-nyolc` (`TwoHands`, `EqCard`, havas háttér, téli ikonok), `a-ketto` (`DotPairs`). Teszt: `src/test/grade1Topic3AKilencG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját mese és tárgyak (ünnepi fenyőfa, díszek, tobozok, bögrék, ajándékok) a könyv népes téli képe és gyerekszereplői helyett; a 9-et 8 + 1 dísz vezeti be.
- Számkör: csak 0–9. A könyv a 9 mindkét számszomszédját kéri (8 és 10), a számegyenesek 10-ig tartanak – a 10 még nem ismert, ezért csak a kisebb szomszéd (8) szerepel, a számegyenes 9-ig megy.
- A „6 <3 □” különbség-jelölés (TK 109) helyett szóban kérdezzük: „Mennyivel több a piros?” – két sor egymás alatt, hogy a párok látszódjanak.
- A bontástáblázat (bögrék, TK 110) helyett a mese bögresora (6 + 3), a „9 = 4 + □” és „7 + □ = 9” nyitott mondatok és a Válogató 3. szintje (melyik összeg pont 9).
- A háromféle színű díszítés (9 = 1 + 5 + 3) és a fenyő számokkal (MF 57) háromtagú összeadás – ez a 14. leckébe („Számolás 0-tól 9-ig”) került.
- Kimaradt: színezés, rajzolás, írásgyakorlás, a tárgytáblázat (koppintós felületen nem értelmes). A számjegyírást a mese a levegőbe „íratja”.
- A régi README „3 × 3-as számképe”, „legnagyobb egyjegyű szám” és színes rúd (kék rúd = 3 világoskék) a könyv ezen oldalain nem szerepel – kimaradt.
