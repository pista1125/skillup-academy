# 4. Megálló – 0-tól 6-ig (1. osztály – III. Számkörbővítés, számolás 10-ig)

**Források:** OH-MAT01TA_I 82–83. o. (PDF-oldal = nyomtatott + 1); munkafüzeti oldal nincs.

## A könyv oldalai
Képrészletek felismerése a 72. oldali kamraképből, igaz–hamis állítások a képről („A kamrában 6-nál több szörp van” …), almaosztás-rejtvény (5 alma, 5 ember, egy a kosárban marad), hogyan változik a kosár tartalma (6, 5, 4 … alma), katicák pöttyei műveletekkel (6 − 5, 6 − 2 …), számok megjegyzése és a párosak bekarikázása, 4 × 4-es „szudoku” magokkal, „Hopp!” számkitalálós csoportjáték.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`Megallo6G1Mese`, 11 oldal, 8 mini-feladat): „Pötyi és a hatos megálló” – hogyan változik a dobozsor (6, 5, 4, ?), katica pöttyei a 6 − 2 művelethez, igaz vagy hamis („hat eper van a dobozban”), színes számok közül a páratlan, hat katica párban (a 6 páros), rejtett almák (3 + ? = 6), 5 labda < 6 labda, nyílsor két lépéssel (2 → +4 → −3), 3 + 3 levél páros-e.
- **Játszótér** (`LadybugOpsPlayground`): „Katicapöttyök” – a kártyán egy összeadás vagy kivonás 6-ig, a gyerek annyi pöttyöt rak a katica hátára, amennyi az eredmény (az A hat lecke `PotyiDotsPlayground` játszóterét használja `mode="op"` módban).
- **Játék** (`Megallo6G1Jatek`, „Pötyi nagy játéka”): Kérdések 3 × 12 (`MEGALLO_6_G1_QUESTIONS`) – a teljes 0–6 blokk: a hat (számlálás, számjegy, ujjkép, dominó), összeadás és kivonás képről, kártyán, számegyenesen, nyilakkal, „? = 1 + 3”, sorozat, igaz–hamis, rejtett rész, műveletek összehasonlítása, három tag összege, páros/páratlan (párba állítás, a 0, műveletek eredménye), szöveges feladatok. Párosító 3 szint (szám ↔ kép, művelet ↔ eredmény, művelet ↔ katica pöttyökkel), Válogató 3 szint (páros/páratlan képek, 5 vagy 6 lesz, páros/páratlan eredmény).

Fájlok: `Megallo6G1Scenes.tsx` (megálló, dobozsor, katica művelettel, színes számok, igaz/hamis ikon, pöttyös katica), `Megallo6G1Parts.tsx`, `Megallo6G1Mese.tsx`, `Megallo6G1Jatek.tsx`, `index.ts`. A többi képet az `a-hat`, `szamolas-0-tol-6-ig` és `paros-es-paratlan-szamok` mappából veszi. Teszt: `src/test/grade1Topic3Megallo6G1.test.tsx` (`perLevel: 12`).

## Eltérések a tankönyvtől
- A kamrakép-részletek felismerése és a képről szóló igaz–hamis állítások helyett (a nyitóképünk más) az igaz–hamis döntés saját, egyszerű képről és egyenlőtlenségekről szól (6 > 5, 4 > 6).
- Az almaosztós rejtvény (az utolsó ember a kosárral együtt kapja az almát) kimaradt: szójátékon alapul, koppintással nem játszható el.
- A 4 × 4-es „szudoku” és a „Hopp!” csoportjáték kimaradt (osztálytermi / sok egyidejű információ).
- „Jegyezd meg a számokat, csukott szemmel sorold fel” → a színes számok közül kell a páratlant kiválasztani.
