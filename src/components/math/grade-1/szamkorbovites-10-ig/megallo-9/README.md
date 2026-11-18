# 16. Megálló (1. osztály – III. Számkörbővítés, számolás 10-ig) – 9-es számkör

**Források:** OH-MAT01TA_I 118–119. o. (PDF-oldal = nyomtatott + 1); munkafüzeti oldal nincs. A kérdések a 12. Megálló óta tanultakat fedik le (13. A kilenc, 14. Számolás 0-tól 9-ig, 15. A sorszámnevek), a korábbi tudásra (jelek, páros/páratlan, nyitott mondatok) építve.

## A könyv oldalai
TK 118: sálak – „Becsüld meg, melyik színű sálból van több! Számolással ellenőrizd!”, két összeadás és két kivonás a képről; postaládák (7, 8, 9, 6): „Nem az 5 + 2-nél 2-vel több. Nem a 9 − 5 + 2. Nem a 2 + 2 + 2 + 1.” (megoldás: 8); fenyők logikai lapokból – hány lapból épültek. TK 119: táblázat „hányadik sor, hányadik oszlop” (alakzatok helye), műveletek kiolvasása a betűkép-ajándékról és fejben számolás, bögrék színezése minta szerint (3 kék, 2 piros).

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`Megallo9G1Mese`, 10 oldal, 7 mini-feladat): „Pötyi, a téli postás” – sálak: becslés + számolás (5 sárga, 4 zöld), 5 + 4 = 9 és 9 − 4 = 5 ugyanarról a képről, postaládás kizárásos fejtörő (6, 7, 8, 9; súgások: 6 + 3, 9 − 3, 4 + 3 → 8), fenyő 9 háromszögből, bögreminta (3 kék, 2 piros), táblázat sorszámokkal (hányadik sor), levél a toronyház 4. szintjére, 6 + □ = 9.
- **Játszótér** (`LetterPlayground`): „Levélhordó” – a levélen egy művelet (összeadás, kivonás vagy háromtagú összeadás 9-ig), 4 postaláda számokkal; a gyerek a jó ládára koppint, Pötyi ellenőriz.
- **Nagy játék** (`Megallo9G1Jatek`, vizsga): Kérdések 3 × 12 (`MEGALLO9_G1_QUESTIONS`): a 9 számlálása, számjegye, ujj- és dominóképe, számegyenes, páratlan; dobogó, első a sorban, a sorszám jelölése; összeadás, kivonás képről, nyíl szerint, nyitott mondatok (8 + □ = 9, 9 − □ = 5, □ − 3 = 6, 6 + 3 > □ > 7), kiegészítés a számegyenesen, mennyivel több, minta, táblázat, füzér, „előtte”, jelek műveletek között, postaládás fejtörő, három szám, két lépés, logikai lapos fenyő, kis történetek, kakukktojás. Párosító 3 szint (`MEGALLO9_G1_PAIRS`: kép ↔ szám, művelet ↔ eredmény, nyitott mondat / színezett hely ↔ szám / sorszám), Válogató 3 szint (`MEGALLO9_G1_SORT`: páros vagy páratlan; pont 9 vagy nem; eredmény < 7, = 7, > 7).

Fájlok: `Megallo9G1Scenes.tsx` (MailboxesScene, PostScene, ScarfScene, ScarfPic, PieceTree, MugPattern, MugPic, GridScene, ShapePic), `Megallo9G1Parts.tsx`, `Megallo9G1Mese.tsx`, `Megallo9G1Jatek.tsx`, `index.ts`. Felhasznált közös képek: `a-kilenc`, `szamolas-0-tol-9-ig`, `a-sorszamnevek`, `a-nyolc`. Teszt: `src/test/grade1Topic3Megallo9G1.test.tsx`.

## Eltérések a tankönyvtől
- Saját keret: a könyv különálló feladatai helyett egy mese (Pötyi, a téli postás) fogja össze az ismétlést; saját számok.
- A postaládás fejtörő súgásai egyszerűbbek: egy lépéses műveletek (6 + 3, 9 − 3, 4 + 3) a könyv „5 + 2-nél 2-vel több”, „9 − 5 + 2” és négytagú „2 + 2 + 2 + 1” alakjai helyett; a súgásokat a gép felolvassa. A nagy játékban egy második változat háromtagú súgással (2 + 2 + 4).
- A logikai lapos fenyőket nem kell megépíteni: a kirakott fenyőn a lapokat számolja meg a gyerek (9 háromszög; 4 háromszög + 1 négyzet).
- A táblázat (TK 119/1) 3 × 3-as, és egyszerre csak egy kérdést teszünk fel (hányadik sor VAGY hányadik oszlop); a sorokat fentről, az oszlopokat balról számoljuk – ezt a mese kimondja.
- A bögreminta színezése helyett: „Milyen színű a következő bögre?” (két különböző hosszúságú sorral).
- Kimaradt: a betűképes ajándékról műveletek kiolvasása és emlékezetből leírása (olvasás, írás kell hozzá).
