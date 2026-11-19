# 3. Az űrtartalom mérése (1. osztály – V. Mérések)

**Források:** OH-MAT01TA_II 22–25. o., OH-MAT01MA_II 14–15. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
TK 22: edények (bögre, doboz, pohár, kanál, palack, vödör) – mi bennük a közös; törött poharak darabjai; csészéből vödörbe (fér még), vödörből bögrébe (kifolyik). TK 23: kisebb csészével vagy nagyobb bögrével – kinek kell kevesebbszer fordulnia; melyik edénybe fér több (<, =, >); boltos emlékezetjáték. TK 24: konyhai kép (alatt, fölött …, melyikbe fér a legtöbb), sorba rendezés (üveg, kanál, mézesüveg, pohár), 10 db 1 dl-es pohár = 1 l. TK 25: liter és deciliter, 1 l = 10 dl; kancsókban mért literek; mérőedény feltöltése (1 dl … 10 dl). MF 14: bögrék sorrendje, dl-es poharak a tálcán, mérőedény, 8 dl + ? = 1 l. MF 15: dl és l összehasonlítása, +3 dl +4 dl, kiegészítés 1 l-re táblázattal, 1 l − 2 dl − 3 dl.

## A DiákZóna-lecke
- **Mese** (`AzUrtartalomMereseG1Mese`, „Pötyi és a szomjas virágok”, 11 oldal, 9 koppintós feladat): meleg van, öntözni kell; kanál, pohár, bögre, palack, vödör – melyikbe fér a legtöbb; a vödör vize a bögrében kifolyik; a locsolókanna 4 pohár víz; Zümi kis pohárral 6-szor, Csigusz nagy bögrével 3-szor fordul; csésze < vödör; 10 db 1 dl-es pohár = 1 l; a lábas vize 3 kancsó = 3 l; a mérőedény (4 dl); 8 dl + 2 dl = 10 dl.
- **Játszótér** (`FillJugPlayground`): Pötyi kér 2–9 dl vizet; a gyerek „+ 1 dl / − 1 dl” gombokkal tölti a mérőedényt, a „Kész!”-re visszajelzés, Új feladat.
- **Játék** (`AzUrtartalomMereseG1Jatek`): 3 × 8 kérdés (`AZ_URTARTALOM_MERESE_G1_QUESTIONS`) – 1. szint: több/kevesebb fér bele, üres/tele, legtöbb, kifolyik-e, mérés pohárral; 2. szint: dl a tálcán, mérőedény, jelek, liter kancsóval, kisebb edénnyel többször, 1 l = 10 dl; 3. szint: 4 dl + 3 dl, kiegészítés 10 dl-re, 10 dl − 2 dl − 3 dl, 1 l vagy 2 dl, 10 dl = 1 l, legkevesebb pohár, liter a hordóban, 10 dl − 6 dl. Párosító: tálca ↔ poharak száma; mérőedény ↔ dl; mérőedény ↔ mennyi kell még 1 literig. Válogató: üres/tele; sok/kevés fér bele; kevesebb, mint 1 l / pontosan 1 l / több, mint 1 l.

Fájlok: `AzUrtartalomMereseG1Scenes.tsx`, `AzUrtartalomMereseG1Parts.tsx`, `AzUrtartalomMereseG1Mese.tsx`, `AzUrtartalomMereseG1Jatek.tsx`, `index.ts`. Teszt: `src/test/grade1Topic5AzUrtartalomMereseG1.test.tsx`.

## Eltérések a tankönyvtől
- A mérőedény a könyvben csak az „1 dl” és „1 liter” feliratot viseli; nálunk is csak a felső (1 l) vonal feliratos, a deciliteres vonalakat alulról számolja a gyerek.
- A törött poharas (TK 22/2), a boltos emlékezetjáték (TK 23/3) és a „mesélj a képről” feladatok kimaradtak; a sorba rendezés (TK 24/2, MF 14/1) helyett „legtöbb / legkevesebb” kiválasztás van.
- MF 15/1: a könyv vegyesen hasonlít össze dl-t és l-t (1 dl, 2 dl, 1 l, 10 dl); nálunk „1 l vagy 2 dl”, „10 dl □ 1 l” és a háromkosaras válogató képviseli.
- A „kisebb edényből többször kell” gondolat (TK 23/1) szereplői Zümi és Csigusz.
- Az alacsony-széles / magas-keskeny edények „optikai csalódása” (régi README) a könyvben nem szerepel, kimaradt.
