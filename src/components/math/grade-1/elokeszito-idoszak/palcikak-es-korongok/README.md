# 4. Pálcikák és korongok (1. osztály – I. Előkészítő időszak)

**Források:** OH-MAT01TA_I 18–19. o. (PDF-oldal = nyomtatott + 1); munkafüzeti oldal nincs.

## A könyv oldalai
- TK 18: figurák kirakása számolókorongokból és számolópálcikákból minta szerint, majd emlékezetből; „mi szükséges a második figurához?”; ábrák kirakása („figyelj a színekre és az irányokra”: roller, szék, napernyő); „Csináld, amit mondok!” (vízszintes kék pálcika, két álló, felül összekötve, két piros tetőnek → ház).
- TK 19: színcsere jelek szerint (sárga → piros, piros → kék; kék → piros, piros → zöld) virágon, fagyin, mozdonyon, asztalon; kirakás folytatása szabály szerint (korong–pálcika ritmusok, korong a pálcika fölött/alatt).

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`PalcikakEsKorongokG1Mese`, 10 oldal, 8 koppintós feladat): Pötyi építődobozt hoz. Pálcika és korong, álló és fekvő pálcika, ugyanolyan nap keresése, hiányzó elem a pálcikababáról, korong–pálcika sor folytatása, színvarázslat (sárga → piros), irány (melyik roller ugyanolyan), „Csináld, amit mondok!” (ház).
- **Játszótér** (`CopyFigurePlayground`): „Rakd ki úgy, mint a minta!” – véletlen színű mintafigura (ház, baba, kapu, asztal, szék, roller, nyalóka, fagyi, létra); a gyerek a szürke pálcikákra és korongokra koppintva váltja a színt, a Kész gombra Pötyi ellenőriz. Új feladat gomb.
- **Játék** (`PalcikakEsKorongokG1Jatek`): Kérdések 3 × 8 (`PALCIKAK_ES_KORONGOK_G1_QUESTIONS`): 1. szint elem, szín, álló/fekvő, egyszerű másolás; 2. szint hiányzó elem, sor, irány, egy színszabály; 3. szint két színszabály egyszerre, szóbeli utasítás, korong a pálcika fölött/alatt sor, tükrözött/fordított figura, „csak pálcikából?”. Párosító: pálcika–korong szín szerint, ugyanolyan figura, figura a színcsere után. Válogató: pálcika/korong, álló/fekvő, csak pálcika / korong is.

Fájlok: `PalcikakEsKorongokG1Scenes.tsx` (figurák adatként: `FIG`, `mirror`, `flip`, `recolor`, `without`), `PalcikakEsKorongokG1Parts.tsx`, `PalcikakEsKorongokG1Mese.tsx`, `PalcikakEsKorongokG1Jatek.tsx`, `index.ts`. Teszt: `src/test/grade1Topic1PalcikakEsKorongokG1.test.tsx`.

## Eltérések a tankönyvtől
- A kirakást képernyőn nem lehet valódi pálcikával elvégezni: a mese és a játék a figurák összehasonlítását, kiegészítését kéri, a játszótéren pedig a gyerek minta szerint „kirakja” (kiszínezi) a figurát. A szülői ajánló javasolja az otthoni kirakást valódi eszközzel.
- Az „építsd meg emlékezetből” (takard le) feladat kimaradt.
- A TK 19/2 c sorában a korongok száma is nő (1, 1, 2, 2 …); ez számlálást kíván, ezért mi csak a „fölötte / alatta” váltakozást használjuk.
- A „Csináld, amit mondok!” utasítást Pötyi felolvassa, a gyerek a kész figurák közül választ; a könyv napernyő-figurája helyett saját figurák (kapu, asztal, létra, kerítés, nyalóka) is szerepelnek.
- A könyv a „vízszintes” szót használja; 6 éveseknek a felolvasásban az „álló” és „fekvő” pálcika szerepel (a „fekvő” = vízszintes).
