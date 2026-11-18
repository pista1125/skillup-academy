# 7. Számszomszédok (1. osztály – III. Számkörbővítés, számolás 10-ig)

**Források:** OH-MAT01TA_I 92–93. o., OH-MAT01MA_I 49. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
Házsor 0–7 (a nullás ház üres) – „Kinek ki a szomszédja?”, a számszomszédok jelölése a számegyenesen (3, 5, 6, 1), hiányzó számok `0 < □ < 2 < 3 < □ …` láncban, a nagyobb szomszéd bekarikázása; páros / páratlan színezés a számegyenesen és szomszéd-táblázat (a páros számok szomszédai páratlanok és fordítva), `□ < 5 < □`, a szám fölé a nagyobb, alá a kisebb szomszéd. Munkafüzet: állatok helye a számegyenesen és szomszédaik, `1 < □ < 3` típusú hiányzó számok, a szám szomszédait mutató zoknik színezése, kisebb és nagyobb szomszéd beírása.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`SzamszomszedokG1Mese`, 12 oldal, 6 mini-feladat): a Számutca 0–7 házakkal; Pötyi a hármasban lakik, szomszédai Zümi (2) és Csigusz (4). Előtte / utána a számegyenesen, „Mi jön az 5 után?”, „Mi van a 6 előtt?”, 2 < 3 < 4, Csigusz egyet lép hátra, az 1 szomszédai, az utca eleje (a 0 előtt nincs szám) és vége (a 7 utáni házat később ismerjük meg), a páratlan 3 szomszédai párosak.
- **Játszótér** (`NeighbourPlayground`): Szomszédkereső – középen egy szám (1–6) Pötyi házán, a gyerek a 0–7 gombokkal előbb a kisebb, aztán a nagyobb szomszédot választja; Pötyi megnevezi a hibát (ez nagyobb / kisebb / messzebb lakik / maga a szám).
- **Játék** (`SzamszomszedokG1Jatek`): Kérdések 3 × 8, Párosító 3 szint (házsor ↔ következő szám, szám ↔ két szomszéd, `3 < ? < 5` ↔ szám), Válogató 3 szint (a 3 szomszédja / nem; a 4 előtt / után; számpár szomszéd / nem szomszéd).

Fájlok: `SzamszomszedokG1Parts.tsx`, `SzamszomszedokG1Mese.tsx`, `SzamszomszedokG1Jatek.tsx`, `index.ts`; a képeket (házsor, számkártyák) az `a-het/AHetG1Scenes.tsx`-ből veszi. Teszt: `src/test/grade1Topic3SzamszomszedokG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját mese: a törpés házsor helyett a Számutca, ahol Pötyi és barátai laknak (Pötyi a 3-asban, szomszédai Zümi és Csigusz).
- A 7 nagyobb szomszédját (8) nem kérdezzük, mert a 8 még nem ismert; a mese jelzi, hogy „később megismerjük”. A 0-nak csak nagyobb szomszédja van.
- Az ismeretlent „?” jelöli (nem □), a beírásos táblázatok koppintós kérdések lettek; a színezés helyett Válogató van.
- A páros-páratlan szomszéd-megfigyelést egy-egy kérdésre szűkítettük (3 szomszédai párosak, 4 szomszédai páratlanok).
