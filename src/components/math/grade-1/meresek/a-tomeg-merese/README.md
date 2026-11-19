# 2. A tömeg mérése (1. osztály – V. Mérések)

**Források:** OH-MAT01TA_II 18–21. o., OH-MAT01MA_II 12–13. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
TK 18: táska és tornazsák emelése (melyik könnyebb, nehezebb), „kitárt karral” becslés, kétkarú mérlegek, házi mérleg vállfából és zacskókból (mérés színes rudakkal), melyik könyv nehezebb a mérlegen. TK 19: vállfás mérlegek – tedd ki a jelet (<, =, >); kusza utak; három könyv golyókkal mérve – legnehezebb, legkönnyebb. TK 20: piaci kép (könnyű, nehéz, mit tudnál felemelni), nyíl a nehezebb felé, jelek a tárgyak közé. TK 21: mérlegfajták, a kilogramm és jele (kg), összehasonlítás 1 kg sóval. MF 12: mi lehet 1 kg-nál nehezebb, mérés kg-ban, pótlás kg-mal 10-ig. MF 13: bevásárlás összeadása kg-ban, zsákok sorozata (2, 4, 6 kg …).

## A DiákZóna-lecke
- **Mese** (`ATomegMereseG1Mese`, „Pötyi és a piaci mérleg”, 11 oldal, 9 koppintós feladat): piac a Számkertben; libikóka (Csigusz lent – ő a nehezebb); a kétkarú mérleg olyan, mint a libikóka (tök – alma); egyensúly (egyforma nehéz); a nagy léggömb könnyebb a kis kőnél; mérés golyókkal (körte = 3 golyó); alma 2 golyó, méz 5 golyó; dinnye > eper; az 1 kg-os súly és a liszt; 2 kg + 3 kg.
- **Játszótér** (`BalancePlayground`): véletlen gyümölcs/méz a bal serpenyőben (1–8 golyó); a gyerek „+ golyó / − golyó” gombokkal teszi egyensúlyba a mérleget, a mérleg élőben billen, Pötyi jelez, Új feladat.
- **Játék** (`ATomegMereseG1Jatek`): 3 × 8 kérdés (`A_TOMEG_MERESE_G1_QUESTIONS`) – 1. szint: libikóka, mérleg (nehezebb, könnyebb, egyensúly), golyók, nehéz–könnyű a valóságban; 2. szint: golyók száma, a nagyobb nem mindig nehezebb, jelek (<, >, =), 1 kg, összehasonlítás golyószámmal; 3. szint: kg összeadás/kivonás 10-ig, sorozat (2, 4, 6, 8 kg), legnehezebb/legkönnyebb golyókkal, hány golyó hiányzik az egyensúlyhoz. Párosító: mérleg ↔ golyószám; mérleg ↔ jel; kg-művelet ↔ eredmény. Válogató: nehéz/könnyű; bal / egyforma / jobb oldal nehezebb; 1 kg-nál nehezebb/könnyebb.

Fájlok: `ATomegMereseG1Scenes.tsx`, `ATomegMereseG1Parts.tsx`, `ATomegMereseG1Mese.tsx`, `ATomegMereseG1Jatek.tsx`, `index.ts`. Teszt: `src/test/grade1Topic5ATomegMereseG1.test.tsx`.

## Eltérések a tankönyvtől
- A libikókát mint a kétkarú mérleg „előképét” mi tettük be (a könyv a kézzel emeléssel kezd) – a gyerek a képernyőn nem tud emelgetni; az emelgetés a szülői megjegyzésben otthoni játék.
- A könyv a mérlegen színes rudakkal és golyókkal mér; nálunk egységesen golyók szerepelnek.
- A jeleknél (<, >, =) Pötyi szóban is elmondja: „a jel szája a nehezebb felé nyílik” (a könyv nyilat is használ a nehezebb felé – az kimaradt).
- A „melyik mérleggel mit mérünk” (fürdőszobai, konyhai mérleg, TK 21/1) és a dekagramm nem szerepel; a dkg a könyvben sincs.
- A MF 13/2 sorozat a könyvben 10 kg-ig megy (2, 4, 6, □, □□); nálunk csak a következő tag (8 kg) a kérdés.
- Rajzolás, színezés, kusza utak (TK 19/2) kimaradtak.
