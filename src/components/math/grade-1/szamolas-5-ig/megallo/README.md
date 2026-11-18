# 9. Megálló (1. osztály – II. Számolás 0-tól 5-ig) – témakörzáró

**Források:** OH-MAT01TA_I 67–71. o. (PDF-oldal = nyomtatott + 1); munkafüzeti oldal nincs. A kérdések a teljes II. témakört lefedik (Az egy … Kivonás 0-tól 5-ig).

## A könyv oldalai
TK 67: gyümölcstál részletei, „Minden… / Van olyan… / Egyik sem…” állítások; ládatorony („az alma a körte és a szilva közötti ládában”, „a gesztenye nem a legfelsőben”); „Hány ujjadat fogom?” párjáték. TK 68: háromszögsor helyének megtalálása, ujjkép – rajzolás – „3 = 2 + 1” alak, jel–szám kódtábla. TK 69: állatok összehasonlítása („melyik több, mennyivel?”), zöldségfigurákról összeadás és kivonás, talicskák: „mindig 5 sárgarépa, mennyi a terítő alatt?” (5 − 1 = …). TK 70: útvesztő, 5 alma sárga és piros szín szerint (az 5 bontása táblázatban), számpiramis (a felső almába az alsó kettő összege). TK 71: „Zöldséges futam” társasjáték (összeadás 5-re, kivonás 3-ra, az 5 bontása).

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`Megallo5G1Mese`, 12 oldal, 7 mini-feladat): szüreti ünnep a Számkertben – almák számlálása, a 0–5 számegyenes, ujjkép ↔ dominó, gombák összehasonlítása (<), Zümi hoz még gombát (3 + 2), Csigusz megeszik egy epret (4 − 1 = 3), répák a kendő alatt (5 = 2 + 3, felfedéssel), ládatorony (legfelül), Zümi ugrásai a számegyenesen.
- **Játszótér** (`UnderClothPlayground`): „Mi van a kendő alatt?” – a talicskában összesen 2–5 répa, ebből 0–4 kilátszik; a gyerek a 0–5 gombokkal megmondja, mennyi van a kendő alatt, Pötyi összeadással ellenőriz és felfedi a kendőt.
- **Nagy játék** (`Megallo5G1Jatek`, vizsga): Kérdések 3 × 12 (`MEGALLO5_G1_QUESTIONS`): számlálás, számjegyek (4, 5), ujjkép, dominó, nulla, ugyanannyi, Pötyi pöttyei, elvétel/hozzáadás képről, számegyenes (előre, vissza), <, >, =, melyik művelet illik a képhez, fent/lent/között, legkisebb szám, bontás (kendő alatt), számpiramis, mennyivel több, jel műveletek között, kakukktojás, két lépéses történet. Párosító 3 szint (`MEGALLO5_G1_PAIRS`: szám ↔ kép, kép ↔ kép, művelet ↔ eredmény), Válogató 3 szint (`MEGALLO5_G1_SORT`: 4 vagy 5; összeadás vagy kivonás; eredmény 3-nál kevesebb / 3 / több).

Fájlok: `Megallo5G1Scenes.tsx` (HarvestScene, AddScene, WheelbarrowScene, ApplePyramid, CrateTowerScene), `Megallo5G1Parts.tsx`, `Megallo5G1Mese.tsx`, `Megallo5G1Jatek.tsx`, `index.ts`. Felhasznált közös képek: `a-ketto` (dobozok, összehasonlítás, ugrás), `a-harom` (három barát), `a-nulla` (kosár, fészek), `kivonas-0-tol-5-ig` (elrepülés, piknik, művelet-kép, visszalépés). Teszt: `src/test/grade1Topic2Megallo5G1.test.tsx`.

## Eltérések a tankönyvtől
- Saját keret: a könyv különálló feladatai helyett egy mese (Pötyi szüreti ünnepe) fogja össze az ismétlést; saját tárgyak és számok.
- A talicskás „terítő alatt” feladat (TK 69) a Játszótérre és 2 kérdésbe került; a könyv kivonással írja (5 − 1), mi kiegészítésként kérdezzük, és összeadással ellenőrizzük (1 + 4 = 5), □ nélkül.
- A számpiramisból (TK 70) két egylépéses kérdés lett (fent hiányzik / lent hiányzik).
- A ládatorony logikai állításait (TK 67) egyszerűsítettük: „Mi van a legalsó ládában?”, „Mi van az eper és a gomba között?”.
- Kimaradt: gyümölcstál-részletek, útvesztő, színezés, kódtábla, „Hány ujjadat fogom?” és a „Zöldséges futam” társasjáték (párban, kockával játszandó; koppintós felületen nem értelmes). A „mondj olyan összeadást, amelynek 5 az eredménye” mezőt az „Melyiknek 5 az eredménye?” kérdés és a Válogató helyettesíti.
- A „3 = 2 + 1” fordított írásmódot nem kérdezzük (a nyitott mondatok és fordított alakok később jönnek).
