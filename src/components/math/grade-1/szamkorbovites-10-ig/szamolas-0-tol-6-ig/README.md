# 2. Számolás 0-tól 6-ig (1. osztály – III. Számkörbővítés, számolás 10-ig)

**Források:** OH-MAT01TA_I 76–79. o., OH-MAT01MA_I 40–42. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
Összeadás korongképről (5 + 1, 1 + 5), műveletkártyák kosárképekhez, három egymás melletti szám összege 6, kivonás képről (megevett körték, sünök, egerek, madarak), szőlőfürt-különbségek, műveletkártyák a számegyenesre, műveletsorok (3 + 2 = □ … □ = 6 − 6), négy művelet egy képről, „pótold” relációs nyíllal (pl. 4 <2 □), nyilas műveletláncok (+2, +1 …), 3 × 3-as almatábla (sor/oszlop = 6). Munkafüzet: összeadás és kivonás korongokról, szilva–mogyoró táblázat (összesen 6), gyümölcsök „értéke” és művelet velük, hosszú nyílláncok, műveletek összehasonlítása jelekkel (3 + 2 □ 5 − 2), egyforma körök párosítása.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`Szamolas0Tol6IgG1Mese`, 11 oldal, 7 mini-feladat): „Pötyi és a nagy piknik” – 5 + 1 alma, felcserélés (1 + 5), 6 − 2 eper (áthúzás), Csigusz a számegyenesen előre (2 + 4) és vissza (6 − 3), nyílsor (3 → +2 → 5 → +1 → ?), 1 + 2 + 3 a kosárban, 3 + 2 > 5 − 2, 6 − 6 = 0.
- **Játszótér** (`DiskFlipPlayground`): „Korongfordító” – 3–6 piros korong, a gyerek annyit fordít kékre, amennyit Pötyi kér; alatta élőben látszik a bontás (pl. 4 + 2 = 6).
- **Játék** (`Szamolas0Tol6IgG1Jatek`): Kérdések 3 × 8 (`SZAMOLAS_0_TOL_6_IG_G1_QUESTIONS`; 1. szint képről, 2. szint műveletkártya, számegyenes, nyíl, „? = 2 + 4”, 3. szint két lépés, műveletek összehasonlítása, szöveges feladatok), Párosító 3 szint (`…_PAIRS`: korongkép ↔ összeadás, művelet ↔ eredmény, egyenlő eredményű műveletek), Válogató 3 szint (`…_SORT`: + vagy −, eredmény 4/5/6, háromnál kevesebb / három / több).

Fájlok: `Szamolas0Tol6IgG1Scenes.tsx` (piknik, vegyes sor, műveletek összehasonlítása, nyílsor), `Szamolas0Tol6IgG1Parts.tsx`, `Szamolas0Tol6IgG1Mese.tsx`, `Szamolas0Tol6IgG1Jatek.tsx`, `index.ts` (dobozok, korongok, sorok: `../a-hat/AHatG1Scenes.tsx`). Teszt: `src/test/grade1Topic3Szamolas0Tol6IgG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját mese (piknik a Számkertben) a könyv kosaras, tálcás képei helyett; körte nincs a képkészletben, helyette eper, gomba, alma.
- Számkör: a könyv 78. oldali számegyenese 8-ig tart – nálunk 6-ig.
- Nyitott mondat (□ ismeretlen) itt nincs: a könyv is csak eredmény-dobozokat használ (□ = 2 + 4); nálunk ez „? = 2 + 4”.
- A relációs nyílba írt különbség (4 <2 □, 6 4> □) kimaradt – kevés szöveggel, olvasás nélkül nem érthető; helyette műveletek összehasonlítása (<, >, =) van.
- A „gyümölcsök értéke” (alma = 5, körte = 6 …) kódolásos feladat és a 3 × 3-as almatábla kimaradt (sok egyidejű információ); a több tagú összeadást az 1 + 2 + 3 kosár adja (az A hat leckéből áthozva).
- A hosszú (5 lépéses) nyílláncok helyett legfeljebb két lépés van.
