# 12. Megálló (1. osztály – III. Számkörbővítés, számolás 10-ig) – ellenőrző lecke a 8-as számkörben

**Források:** OH-MAT01TA_I 106–107. o. (PDF-oldal = nyomtatott + 1); munkafüzeti oldal nincs. A kérdések a 9–11. leckét (A nyolc, Számolás 0-tól 8-ig, Nyitott mondatok) ismétlik, a korábban tanultakkal (páros/páratlan, számszomszéd, jelek) együtt.

## A könyv oldalai
Rajzolás „mindegyik részben annyi legyen, mint középen” (8 mókus); „Melyik kulcs nyitja a tárolót?” – kizárásos rejtvény műveletekkel és számszomszéddal; emlékezetből kiegészítendő kép; hóember-táblázat: a művelet eredménye mondja meg, melyik szem, száj, orr, kalap, sál kerül a hóemberre; papírtányéros rajzjáték.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`Megallo8G1Mese`, 11 oldal, 7 mini-feladat): a szánkók a lakatos kamrában vannak, öt kulcs lóg a szögön (2, 4, 6, 7, 8). Csigusz feladványai: nem a 3 + 3, nem a 8 kisebb szomszédja, nem a 8 − 6, nem a □ + 4 = 8 – a gyerek mindegyiket kiszámolja, a kulcsokat áthúzzuk, a megmaradt 8-as nyit. Utána 5 + □ = 8 (hógolyók a szánkón) és 8 − 2 > 5.
- **Játszótér** (`KeyPuzzlePlayground`): „Kulcsrejtvény” – öt véletlen számú kulcs (0–8), Csigusz egyenként mond feladványt (összeadás, kivonás vagy nyitott mondat); a gyerek arra a kulcsra koppint, amelyik kiesik, végül a megmaradt kulcsra – kinyílik a kamra.
- **Játék** (`Megallo8G1Jatek`, Pötyi nagy játéka): Kérdések 3 × 12 (1. szint: számlálás, számjegy, ujj-, dominó-, tízeskeret-kép, művelet képről, számegyenes, jel; 2. szint: számegyenes-ugrások, bontás, csere, számház, nyitott mondat képpel, □ < 3, □ > 6, számszomszéd, kiegészítés, „mennyivel több”; 3. szint: művelet ↔ szám jelekkel, két lépés, −2 szabály, igaz/hamis, □ − 3 = 5, a 8 − 3 kisebb szomszédja, kulcsrejtvény, kis történet). Párosító 3 szint (kép ↔ szám; művelet ↔ eredmény; nyitott mondat ↔ szám), Válogató 3 szint (nyolc / nem nyolc; páros / páratlan eredmény; igaz / hamis állítás).

Fájlok: `Megallo8G1Scenes.tsx` (`KeyPic`, `KeysScene`, `ShedScene`), `Megallo8G1Parts.tsx`, `Megallo8G1Mese.tsx`, `Megallo8G1Jatek.tsx`, `index.ts`; a közös képek az `a-nyolc`, `szamolas-0-tol-8-ig` és `nyitott-mondatok` leckéből. Teszt: `src/test/grade1Topic3Megallo8G1.test.tsx`.

## Eltérések a tankönyvtől
- A kulcsos rejtvény saját számokkal és feladványokkal (könyv: 3, 5, 6, 7, 8 kulcs, a 3-as nyit; nálunk 2, 4, 6, 7, 8, a 8-as nyit, és az egyik feladvány nyitott mondat), mesévé bővítve; a Játszótér végtelen sok új rejtvényt ad.
- A rajzolós feladatok (mókusok, emlékezetből rajzolás, hóember-táblázat, papírtányér) kimaradtak: koppintós felületen nem megoldhatók. A hóember-táblázat ötletét (az eredmény választja ki a képet) a Párosító 2. szintje (művelet ↔ eredmény) és a 9. lecke hóember-gombos Játszótere viszi tovább.
- Mivel a könyvi Megálló két oldala kevés feladatot ad, a 36 kérdés a 9–11. lecke teljes anyagát ismétli (a 10. lecke kimaradt számszomszéd-házai: „a 6 nagyobb szomszédja”, „a 8 − 3 kisebb szomszédja”). Minden szám és eredmény 0–8.
