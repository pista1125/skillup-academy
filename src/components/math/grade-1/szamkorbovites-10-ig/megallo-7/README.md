# 8. Megálló (1. osztály – III. Számkörbővítés, számolás 10-ig) – témazáró ismétlés 7-ig

**Források:** OH-MAT01TA_I 94–95. o. (PDF-oldal = nyomtatott + 1); munkafüzeti oldal nincs. Az ismétlés a 4. Megálló (6-ig) óta tanultakat fogja át: 5. A hét, 6. Számolás 0-tól 7-ig, 7. Számszomszédok, plusz alapok (számlálás, jelek, páros/páratlan).

## A könyv oldalai
Hóember másolása négyzethálóra; „melyik ládában vannak az ajándékok?” (6, 4, 5, 7 – „nem a 7 − 3, nem a 2 + 3, nem a 4 + 2”); a dobókocka szemközti lapjain együtt 7 pötty, az alsó lap pöttyeinek kitalálása; 7 korong pohárból kiborítva – műveletek a színek szerint (4 + 3, 3 + 4, 7 − 4, 7 − 3); húzás kendő alól (5 piros, 2 kék) eseménytáblázattal; színezés folytatása (sorminta); ritmusjáték (taps, koppantás, dobbantás).

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`Megallo7G1Mese`, 11 oldal, 8 mini-feladat): Pötyi kincsvadászata állomásokkal – 7 csillag számlálása, ládás logikai feladvány (3, 5, 6, 7 láda; „nem a 6 − 3, nem a 7 − 2, nem a 3 + 3”), a varázskocka titka (szemközti lapokon együtt 7), „fent 2, lent mennyi?”, egy korongkép – négy művelet („melyik NEM illik?”), forma-sorminta, az 5 szomszédai, a 7 páratlan (Pötyi pöttyei párba állítva), 3 + 3 < 7.
- **Játszótér** (`DicePlayground`): Pötyi dobókockája – véletlen felső lap (1–6), a gyerek a hat kockalap közül kiválasztja az alsót; Pötyi szól, ha kevés vagy sok (együtt 7 kell).
- **Játék** (`Megallo7G1Jatek`, „Pötyi nagy játéka”): Kérdések 3 × 12 (`MEGALLO_7_G1_QUESTIONS`: számlálás, hetes, ujj- és dominókép, számegyenes, összeadás / elvétel képről és számegyenesen, kiegészítés 7-re, számszomszédok, páros-páratlan, sorminta, dobókocka, műveletek összehasonlítása, kéttagú lépések, történetek, ládás logika), Párosító 3 szint (kép ↔ szám, művelet ↔ eredmény, a kocka szemközti lapjai), Válogató 3 szint (páros / páratlan; pont 7 / kevesebb; `<`, `=`, `>`).

Fájlok: `Megallo7G1Scenes.tsx` (sorminta, kockalap), `Megallo7G1Parts.tsx`, `Megallo7G1Mese.tsx`, `Megallo7G1Jatek.tsx`, `index.ts`; a többi képet az `a-het/AHetG1Scenes.tsx`-ből veszi. Teszt: `src/test/grade1Topic3Megallo7G1.test.tsx` (`perLevel: 12`).

## Eltérések a tankönyvtől
- Saját keret (kincsvadászat) és saját számok: a ládás feladványban más ládák és más műveletek szerepelnek (mesében 3, 5, 6, 7; a játékban 2, 4, 5, 6).
- A dobókocka-feladatot kétdimenziós kockalapokkal (fent / lent) adjuk; a térbeli kockakép helyett a szabályt Pötyi kimondja.
- A négyzethálós másolás, a kendős húzás (valószínűség) és a ritmusjáték kimaradt – koppintós, olvasás nélküli felületen nem valósítható meg értelmesen; a színezés-folytatás forma-sorminta kérdés lett.
- A 8-at nem használjuk (a kocka „több, mint hét” visszajelzése szám nélkül szól).
