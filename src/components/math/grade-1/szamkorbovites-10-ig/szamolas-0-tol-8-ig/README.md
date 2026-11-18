# 10. Számolás 0-tól 8-ig (1. osztály – III. Számkörbővítés, számolás 10-ig)

**Források:** OH-MAT01TA_I 100–103. o., OH-MAT01MA_I 52–54. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
Korongképek két színnel (3 + 5 és 5 + 3), összeadás képekről (2-2 művelet), színes rudak a bordó (8) rúd mellé, kakukktojás (ruhák); kivonás képekről (8 − 2, 8 − 6), mókusok: 8 − 1 … 8 − 8, mókus visszafelé ugrik a számegyenesen (7 − 3, 8 − 2, 6 − 4, 8 − 3), oda-vissza ív (3 + 5 / 8 − 5), hiányzó számok (1 + 7, 8 − 7, □ = 5 + 3, 2 < □), két lépéses műveletek összekötése eredménnyel (8 − 2 − 2, 5 − 1 + 2 …), házak a számszomszédoknak, művelet és szám összehasonlítása (2 + 6 □ 5), öltöztetés (kombinatorika), sorozat szabály szerint (+2, −2, −3 +1). Munkafüzet: két összeadás egy képről, pontverseny táblázatból, kivonások a hóemberről, műveletek a számegyenesen, kártyák párosítása számegyenes-ponthoz, több tagú műveletek, korongkép → 2 összeadás + 2 kivonás, „melyik jel melyik számot takarja”.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`Szamolas0Tol8IgG1Mese`, 12 oldal, 6 mini-feladat): hógolyócsata a havas Számkertben. 5 fehér + 3 kék hógolyó; csere (5 + 3 = 3 + 5); a 8 bontásai sapkasorokkal (7 + 1, 6 + 2, 5 + 3, 4 + 4); „Melyik kettő együtt 8?”; 8 − 2 áthúzással; Csigusz visszacsúszik a számegyenesen (7 − 3); Zümi előre ugrik (3 + 5); 2 + 6 > 5; 8 − 2 − 2 (Pötyi kettőt ad Züminek, kettőt Csigusznak); 2, 4, 6, … szabály.
- **Játszótér** (`SnowballCalcPlayground`): „Hógolyó-számoló” – véletlen összeadás vagy kivonás 8-ig tízes kerettel (két szín / áthúzás) és művelettel, a gyerek a 0–8 számgombok egyikére koppint, Pötyi a tipikus hibát nevezi meg.
- **Játék** (`Szamolas0Tol8IgG1Jatek`): Kérdések 3 × 8 (`SZAMOLAS_0_TOL_8_IG_G1_QUESTIONS`), Párosító 3 szint (kép ↔ összeadás; művelet ↔ eredmény; két lépéses művelet ↔ eredmény), Válogató 3 szint (hozzátettünk / elvettünk; eredmény 6, 7, 8; ötnél kevesebb / pont 5 / ötnél több).

Fájlok: `Szamolas0Tol8IgG1Scenes.tsx` (`PicEq`, `HatSplitsScene`, `TwoEqScene`; a téli alapképek az `a-nyolc/ANyolcG1Scenes.tsx`-ből), `Szamolas0Tol8IgG1Parts.tsx`, `Szamolas0Tol8IgG1Mese.tsx`, `Szamolas0Tol8IgG1Jatek.tsx`, `index.ts`. Teszt: `src/test/grade1Topic3Szamolas0Tol8IgG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját történet (hógolyócsata) és saját számok; a könyv mókusai helyett Zümi (előre) és Csigusz (visszafelé) lép a számegyenesen.
- Számkör: a könyv számegyenesei 10-ig tartanak; nálunk minden szám és eredmény 0–8, a számegyenes 8-ig megy. A számszomszéd-házak (□ < 5 − 3 < □) □-et használnak, ezért a Megállóba kerültek, „Melyik a … kisebb / nagyobb szomszédja?” kérdésként.
- A □ jelölés (pl. □ = 5 + 3, 2 < □) a 11. leckében („Nyitott mondatok”) jön; itt az ismeretlen mindig az eredmény, „?”-lel.
- „Írj 2-2 műveletet” helyett kész műveletet választ a gyerek (Párosító 1. szint: kép ↔ összeadás), a csere egy mese-oldalon és egy kérdésben szerepel.
- A „−3 +1” vegyes szabályú sorozatot és az öltöztetős kombinatorikai feladatot kihagytuk (sok olvasást/színezést igényel); a +2 szabály megmaradt.
- A pontverseny-táblázat és a „melyik jel melyik számot takarja” feladat kimaradt (táblázatolvasás, illetve □-es nyitott mondat – utóbbi a következő leckében).
- A színes rudas feladat helyett sapkasorokkal mutatjuk a 8 bontásait.
