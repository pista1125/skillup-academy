# 9. A nyolc (1. osztály – III. Számkörbővítés, számolás 10-ig)

**Források:** OH-MAT01TA_I 96–99. o., OH-MAT01MA_I 50–51. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
Téli mesekép („Miből van nyolc? Nyolcnál több / kevesebb?”), ujjkép (5 és 3), dominó (4|4), a 8-as számjegy, a 8 a számegyenesen és számszomszédai, hógolyók csoportosítása nyolcasával, a 8 írása, kabátok összehasonlítása („Mennyivel több?”), gombok a hóemberre jelek szerint, a mókus egyenlő ugrásai a számegyenesen, sapkasorok: a 8 bontásai táblázatban (8 = 8 + 0 … 0 + 8), sálak színezése összeadás szerint (3 + □ = □), számházak (4, 7, 8), „rajzolj annyi kört, hogy 8 legyen”, logikai színezés (sapkák). Munkafüzet: miből van nyolc (összekötés), hány dolog van (karikázás), jelek, a 8 írása, dominók jelek szerint, „Mit mond a kép?” műveletírás.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`ANyolcG1Mese`, 12 oldal, 6 mini-feladat): leesik az első hó a Számkertben. 8 hópehely; egy hópehely Pötyi 7 pöttye mellé esik: 7 meg 1 az 8; a 8-as írásiránya („mint egy hóember”); 8 ujj (5 és 3), dominó 4|4, tízes keret; „Hol van 8 hógolyó?”; a hóemberen 6 gomb – hány kell még a 8-hoz?; a 8 a számegyenesen, kisebb szomszédja; 5 piros + 3 kék sapka; 8 sapka > 7 sapka; Zümi kettesével ugrik 8-ig.
- **Játszótér** (`SnowmanButtonsPlayground`): „Gombok a hóemberre!” – a táblán egy szám (0–8, leggyakrabban 8), a gyerek annyi gombot tesz a hóemberre (Még egy / Elveszek), Pötyi visszajelez.
- **Játék** (`ANyolcG1Jatek`): Kérdések 3 × 8 (`A_NYOLC_G1_QUESTIONS`), Párosító 3 szint (`A_NYOLC_G1_PAIRS`), Válogató 3 szint (`A_NYOLC_G1_SORT`; 3. szint: összeadások – nyolcnál kevesebb vagy pont nyolc).

Fájlok: `ANyolcG1Scenes.tsx` (téli ikonok: hópehely, hógolyó, sapka, gomb; `CountBox` 0–10 tárggyal, `CompareBoxes`, `TwoHands`, `EqCard` (műveletsor □-vel), `HopLine`, `NumberHouse`, jelenetek – a 10–12. lecke is ezeket használja), `ANyolcG1Parts.tsx`, `ANyolcG1Mese.tsx`, `ANyolcG1Jatek.tsx`, `index.ts`. Teszt: `src/test/grade1Topic3ANyolcG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját mese és tárgyak (első hó, hópelyhek, hógolyók, hóember, sapkák) a könyv népes téli képe helyett; a 8-at Pötyi 7 pöttye + 1 hópehely vezeti be.
- Számkör: csak 0–8. A könyv a 8 két számszomszédját kéri (7 és 9), a számegyenes 10-ig tart – a 9 még nem ismert, ezért nálunk csak a kisebb szomszéd (7) szerepel, a számegyenes 8-ig megy. „Nyolcnál több” mennyiség nincs (9-et kellene számolni).
- A □ jelölés (3 + □ = □, számházak) a 11. leckében („Nyitott mondatok”) jön; itt a kiegészítést szóban/képpel kérdezzük („Hány gomb kell még, hogy 8 legyen?”). A bontás táblázatot a sapkasor és a Válogató 3. szintje (melyik összeg pont 8) helyettesíti; a teljes bontás a 10. leckében.
- A mókus egyenlő ugrásait (2-esével 10-ig) Zümi 2-es ugrásai adják 8-ig.
- A színezős és logikai színezős (sapkák) feladatok kimaradtak: koppintós felületen nem megoldhatók értelmesen. A „Mennyivel több?” a 10. leckébe került.
- A kit `DigitTrace` 8-asa a közepéről indul (a könyv a felső kör jobb széléről): a mese csak „a zöld pöttytől” beszél, a gyerek egy vonallal rajzolja.
