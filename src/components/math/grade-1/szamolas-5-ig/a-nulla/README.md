# 3. A nulla (1. osztály – II. Számolás 0-tól 5-ig)

**Források:** OH-MAT01TA_I 44–45. o., OH-MAT01MA_I 25. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
Őszi erdei kép („Miből mennyit látsz? Hány almája van a sününek?”), ököl (0 ujj), üres dominó, a 0 számjegy és helye a számegyenes elején, üres zsákok színezése („0 alma”), gyümölcsrajzolás 2, 1, 0 szerint és jelek, a 0 írása, képek a számegyenesen, logikai lapok számlálása. Munkafüzet: „mi változott?” két kép összevetése, „amiből egy sem volt”, a 0 1 2 írása, állatok számlálása (2, 1, 0) és jelek.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`ANullaG1Mese`, 11 oldal, 5 mini-feladat): Pötyi és Zümi a Számkertben madárfészket talál, benne két tojással. Másnap a fiókák elrepültek: a fészek üres – ez a nulla. Üres kosár keresése, a 0 írásiránya, ököl és üres dominó, a pöttytelen katica, a 0 a számegyenes elején, Csigusz megeszi a két levelet („hány maradt?”), 2 alma > 0 alma.
- **Játszótér** (`ZeroCountPlayground`): kosár, katica, dominó vagy kéz – a gyerek a 0, 1, 2 gombokkal mondja meg, hány van rajta (a nulla gyakrabban jön), Pötyi visszajelez.
- **Játék** (`ANullaG1Jatek`): Kérdések 3 × 8 (`A_NULLA_G1_QUESTIONS`), Párosító 3 szint (`A_NULLA_G1_PAIRS`), Válogató 3 szint (`A_NULLA_G1_SORT`).

Fájlok: `ANullaG1Scenes.tsx`, `ANullaG1Parts.tsx`, `ANullaG1Mese.tsx`, `ANullaG1Jatek.tsx`, `index.ts` (a dobozokat és a jeles képeket az `a-ketto/AKettoG1Scenes.tsx`-ből veszi). Teszt: `src/test/grade1Topic2ANullaG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját mese: a süni almája és az erdei kép helyett az üres madárfészek, Csigusz üres kosara és a pöttytelen katica mutatja a nullát.
- Számkör: csak 0, 1, 2. A könyv 45. oldali logikai lapos feladatában 3 sárga négyzet is van (a hármat csak a következő lecke tanítja) – ezt kihagytuk; a számegyenes-feladatnál is csak 0–2 a kérdés.
- A „Mi változott?” feladatot (két 3×3-as kép) egyszerű előtte–utána képpel adjuk: „Csigusz megette a leveleket, hány maradt?” – kivonásjel nélkül, csak számlálással.
- A 0-t a gyerek a levegőbe „írja” (zöld kezdőpont fent, balra körbe).
