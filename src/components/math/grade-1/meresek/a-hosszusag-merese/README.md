# 1. A hosszúság mérése (1. osztály – V. Mérések)

**Források:** OH-MAT01TA_II 12–17. o., OH-MAT01MA_II 10–11. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
TK 12: gyöngysorok hossza, távolság mérése fonallal/szívószállal, kanyargós vonalak hossza fonallal. TK 13: tornyok, vonatok, utak építése – legmagasabb, leghosszabb; ki az alacsonyabb; legalacsonyabb/legmagasabb ember. TK 14: hosszú, rövid, magas, alacsony, széles, keskeny; tárgyak összehasonlítása a narancssárga rúddal (vonalzó-kép). TK 15: tárgyak a mérőszalaghoz képest; méter és deciméter, 1 m = 10 dm. TK 16: magasság leolvasása a méterrúdról (dm), mekkora lehet a valóságban (m, dm). TK 17: mérés különböző rudakkal (becslés, mérés), a terem mérése lépéssel (eltérő lépéshossz) és méterrúddal; ceruza – hurkapálcika – rúd mérőszámai. MF 10–11: tárgyak a méterrúdhoz és az 1 dm-es rúdhoz képest (<, =, >), mérés különböző színű rudakkal, „mi lehet 1 m-nél magasabb / 1 dm-nél hosszabb”, összeadás-kivonás dm-rel 10-ig, szalagos szöveges feladat.

## A DiákZóna-lecke
- **Mese** (`AHosszusagMereseG1Mese`, „Pötyi és Csigusz szülinapi szalagjai”, 11 oldal, 8 koppintós feladat): Csigusz születésnapjára díszítik a kertet. Két szalag összehasonlítása közös kezdővonalról; legmagasabb napraforgó; Zümi egyenes és Csigusz kanyargós útja (fonallal mérve a kanyargós a hosszabb); a pad mérése pálcikával (5); az asztal mérése araszolva (4); az út lépésekkel: kis cipő 6, nagy csizma 3 lépés (kisebb egységből több kell); a narancssárga rúd = 1 dm, rövidebb/hosszabb nála; 10 rúd = a méterrúd, 1 m = 10 dm; a torta magassága rudakkal (4 dm).
- **Játszótér** (`RodMeasurePlayground`): véletlen hosszú szalag/ceruza/pálca (2–8 rúd); a gyerek „+ rúd / − rúd” gombokkal rakja le a rudakat, a „Kész!”-re Pötyi jelez (még nem ér a végéig / kilóg), Új feladat.
- **Játék** (`AHosszusagMereseG1Jatek`): 3 × 8 kérdés (`A_HOSSZUSAG_MERESE_G1_QUESTIONS`) – 1. szint: hosszabb/rövidebb, legmagasabb/legalacsonyabb, széles/keskeny, mérés pálcikával és lépéssel; 2. szint: arasz, a rúdnál rövidebb/hosszabb, magasság dm-ben, fonalas út, 1 m = 10 dm; 3. szint: kisebb egységből több kell, 2 dm + 7 dm, 10 dm − 4 dm, becslés (1 m-nél magasabb, 1 dm-nél rövidebb), legmagasabb torony, mennyivel hosszabb. Párosító: pálcikasor ↔ szám; rúdtorony ↔ dm; ház/fa/bicikli/ceruza ↔ 10 m / 5 m / 1 m / 2 dm. Válogató: széles/keskeny; 1 m-nél magasabb/alacsonyabb; a rúdnál rövidebb / ugyanolyan / hosszabb.

Fájlok: `AHosszusagMereseG1Scenes.tsx`, `AHosszusagMereseG1Parts.tsx`, `AHosszusagMereseG1Mese.tsx`, `AHosszusagMereseG1Jatek.tsx`, `index.ts`. Teszt: `src/test/grade1Topic5AHosszusagMereseG1.test.tsx`.

## Eltérések a tankönyvtől
- A tanítói kérésnek megfelelően a nem szabványos egységek (pálcika, arasz, lépés) kerülnek előre; a könyv az araszt nem említi, a lépést csak a TK 17-en, a terem szélességénél.
- A könyv a rudak színét (rózsaszín, piros, narancssárga) használja; a leckében csak a narancssárga rúd (1 dm) szerepel, a „rövidebb mérőeszközből több kell” gondolatot rövid pálcika ↔ hosszú pálca és kis cipő ↔ nagy csizma mutatja.
- A centiméter a könyvben sem szerepel; a vonalzós kép (TK 14) helyett közös kezdővonalról induló, a rúddal összevetett tárgyképek vannak.
- MF 10/1: a ház „12 m” – ez túllépi a 10-es számkört; nálunk a ház 10 m, a fa 5 m, a bicikli 1 m.
- A becslős feladatok (MF 11/1–2, TK 16/2–3) feleletválasztósak; a méréses ellenőrzés otthoni tevékenységként szerepel a szülői megjegyzésben.
- Rajzolás, színezés, pontrács, bekötött szemű tapogatás (TK 13/2–4) kimaradt; a sorszámos kérdések (hányadik a legmagasabb) helyett a legmagasabb/legalacsonyabb kiválasztása van.
