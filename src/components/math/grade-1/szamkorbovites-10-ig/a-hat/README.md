# 1. A hat (1. osztály – III. Számkörbővítés, számolás 10-ig)

**Források:** OH-MAT01TA_I 72–75. o., OH-MAT01MA_I 38–39. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
Kamrakép („Miből van hat? Hatnál több / kevesebb?”), ujjkép (5 + 1), dominó (5 | 1), a 6-os számjegy és helye a számegyenesen, csigás vers, „egészítsd ki, hogy 6 legyen”, a 6 írása, csoportosítás hatosával, hiányzó számok a számegyenesen, kosarak összehasonlítása jelekkel és „mennyivel több”, rajzolás jelek szerint, a 6 bontásai almasorokkal (6 = 6 + 0, 5 + 1 …) és táblázattal, a 6 több tag összegére bontása, színezés jelek szerint. Munkafüzet: melyik kosárban van 6, dominók jelekkel, a 6 írása, számok összehasonlítása (0–6), +2 / −1 nyilak, „egészítsd ki” almák/körték.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`AHatG1Mese`, 12 oldal, 5 mini-feladat): Pötyi hátán ma hat pötty ragyog (5 az egyik szárnyon + 1 a másikon); Pötyi hat lába; öt katica + még egy; „Hol van hat eper?”; a 6-os írásiránya; hat ujj (5 + 1) és a hatos dominó; a 6 a számegyenesen; 6 eper > 5 eper; a hat bontásai korongokkal (5 + 1, 4 + 2, 3 + 3); hány alma bújik a levél alatt (4 + ? = 6).
- **Játszótér** (`PotyiDotsPlayground`): „Pötyi pöttyei” – a kártyán egy szám (leggyakrabban 6), a gyerek pöttyöt tesz Pötyi hátára / vesz el, Pötyi visszajelez (kevés / sok / jó). `mode="op"` változatát a Megálló használja.
- **Játék** (`AHatG1Jatek`): Kérdések 3 × 8 (`A_HAT_G1_QUESTIONS`), Párosító 3 szint (`A_HAT_G1_PAIRS`; 3. szint: bontások korongképpel), Válogató 3 szint (`A_HAT_G1_SORT`; 3. szint: „hat lesz / nem hat” műveletkártyák).

Fájlok: `AHatG1Scenes.tsx` (a 0–6-os dobozok, ujjkép 6-ig, rejtő levél, összehasonlító kép – a III/2–4. lecke is innen importál), `AHatG1Parts.tsx`, `AHatG1Mese.tsx`, `AHatG1Jatek.tsx`, `index.ts`. Teszt: `src/test/grade1Topic3AHatG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját mese: a kamrakép és a vers helyett Pötyi hat pöttye és hat lába mutatja a hatot (a rovaroknak hat lábuk van).
- Számkör: válaszként csak 0–6; a könyv számegyenese 10-ig, a munkafüzeté 7-ig megy – nálunk a számegyenes 6-ig tart.
- A „mennyivel több” jelet (szám a relációjelben, pl. „<5”) nem használjuk; a különbséget külön kérdés kérdezi („Mennyivel több alma van bal oldalon?”).
- A bontás-táblázatot (6 = 6 + 0 … 0 + 6) korongsorok és a Párosító 3. szintje helyettesíti; a több tagú összegre bontás (6 = 1 + 2 + 3) a Számolás 0-tól 6-ig leckébe került át, mert ott gyakoroljuk a műveleteket.
- Írás, csoportosítás karikázással, színezés: koppintós felületen nem végezhető – a 6 írását a gyerek a levegőbe „írja”, a kiegészítést a Játszótér és a rejtett-levél feladat adja.
