# 2. Síkidomok (1. osztály – IV. Geometria)

**Források:** OH-MAT01TA_II 4–11. és 130–133. o. (Vonalak, síkidomok, testek; Játék a tükörrel), OH-MAT01MA_II 4–9. és 76–79. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
TK 6: sorminta (kör, négyzet, háromszög), a négy név: **kör, háromszög, négyzet, téglalap**; másolás négyzethálóra; „melyik síkidom nem illik a zsákba?”. TK 7: formákból kirakott képek, formák számlálása színezéssel. TK 8: téglalapsor, egyforma ábrák, bűvös négyzet („melyik ábra illik az üres helyre?”). TK 130: csoportosítás vonal/síkidom/test, logikai lapos kirakás, „hány négyzet van az ábrán?”. MF 6, 8: pontok összekötése síkidommá, síkidomok pálcikákból (hány pálcika kell?). TK 132–133, MF 78–79 (Játék a tükörrel): tükörkép felismerése, összehajtható ábrák, tükrözés négyzethálón.

## A DiákZóna-lecke
- **Mese** (`SikidomokG1Mese`, „Pötyi és a formás zsák”, 12 oldal, 8 koppintós feladat): a négy síkidom bemutatása; háromszög 3 pálcikából; négyzet és téglalap különbsége (egyforma / hosszúkás oldalak); Zümi sormintája; melyik nem illik a háromszöges zsákba; háromszögek számlálása a kirakott rakétán; Csigusz házának teteje; tükörkép a tócsában, tükörkép a piros vonalon túl; összehajtható rajz.
- **Játszótér** (`ShapeHuntPlayground`): „Koppints minden háromszögre!” – 8 véletlen, különböző színű, méretű, elforgatott forma közül kell kijelölni az összes kértet; Pötyi szól, ha valami hiányzik vagy nem odavaló.
- **Játék** (`SikidomokG1Jatek`): 3 × 8 kérdés (`SIKIDOMOK_G1_QUESTIONS`), Párosító (egyforma formák; tárgy ↔ síkidom; pálcikák száma), Válogató (kör/háromszög; négyzet/téglalap/háromszög; összehajtható igen/nem).

Fájlok: `SikidomokG1Scenes.tsx`, `SikidomokG1Parts.tsx`, `SikidomokG1Mese.tsx`, `SikidomokG1Jatek.tsx`, `index.ts`. Teszt: `src/test/grade1Topic4SikidomokG1.test.tsx`.

## Eltérések a tankönyvtől
- Csak a könyv négy nevét használjuk (kör, háromszög, négyzet, téglalap); a „sarok” és az „oldal” szót csak magyarázatként, nem kérdezve. A trapéz, ötszög, hatszög (TK 4, MF 8) név nélkül sem szerepel, hogy ne keveredjenek a négy alapformával.
- A „hányadik a sorban” kérdést (TK 6/1) és a négyzethálós másolást, tükrözést (TK 6/2, 133/3) nem lehet koppintással jól gyakorolni – kimaradt; a tükrözést egy kész „melyik a tükörképe?” választás helyettesíti.
- TK 130/3 „Hány négyzet van?” – csak a legegyszerűbb ábrát (nagy négyzet + egy kicsi a sarkában = 2) kérdezzük; a 4 kis négyzetre osztott ábra (5 négyzet) első osztályban, olvasás nélkül túl nehéz.
- A ferdén álló négyzet is négyzet (mint a TK 8/3 E ábrája) – a válogatóban szerepel, a tippek külön figyelmeztetnek rá.
- A betűs tükrözés (MF 78/3: A, M, T, H) kimaradt (olvasás).
