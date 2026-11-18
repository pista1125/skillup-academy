# 5. A négy (1. osztály – II. Számolás 0-tól 5-ig)

**Források:** OH-MAT01TA_I 50–53. o., OH-MAT01MA_I 28–31. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
Erdei kép („Miből van 4? Miből van 4-nél kevesebb, több?”), ujjkép, dominókép, a 4-es számjegy (versike), helye a számegyenesen; a 4 írása (két vonással); gombák számlálása; „Minden ágon 4 levél legyen”; dominók a számegyenesen; katicák a leveleken és összehasonlítás jelekkel (<, >, =); „Írj a négyzetbe olyan számot …”; a 3 és a 4 bontása (felül az egész, alul a két rész); csoportosítás négyesével; korongok színezése jelek szerint. Munkafüzet: dominók összehasonlítása nyíllal, ugyanannyi rajzolása, négylábú/kétlábú állatok, számegyenes, gyöngysor-szabály, rejtett számok, a 4 bontásai gombák színezésével.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`ANegyG1Mese`, 12 oldal, 7 koppintós feladat): Pötyi, Zümi és Csigusz négylevelű lóherét keres. Számlálás 1-től 4-ig, a 4-es írása két vonással (a könyv írásiránya szerint), négy ujj és négy pötty, négylábú kutya / kétlábú madár / lábatlan csiga, Csigusz négylábú asztala, a 4 a számegyenesen, Zümi négy ugrása, a 4 bontása (1 piros + ? kék korong, „bontás-ház”), 4 eper > 3 eper.
- **Játszótér** (`SplitPlayground`, `total=4`): „Legyen 2 piros!” – a gyerek koppintással színezi a 4 korongot pirosra/kékre; jó megoldásnál megjelenik a bontás-ház (pl. 4 → 2 | 2). Új feladat gomb.
- **Játék** (`ANegyG1Jatek`): Kérdések 3 × 8 (`A_NEGY_G1_QUESTIONS`), Párosító 3 szint (`A_NEGY_G1_PAIRS`), Válogató 3 szint (`A_NEGY_G1_SORT`).

Fájlok: `ANegyG1Scenes.tsx` (a közös képek egy részét „Az öt” és az „Összeadás 0-tól 5-ig” is használja), `ANegyG1Parts.tsx`, `ANegyG1Mese.tsx`, `ANegyG1Jatek.tsx`, `index.ts`. Teszt: `src/test/grade1Topic2ANegyG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját mese (lóhere, kutya, asztal) a sok részletes erdei kép helyett; a könyv versikéje helyett Pötyi saját hasonlata („mint egy kis zászló”).
- A közös `DigitTrace` 4-ese alulról felfelé, egy vonással írna – ez eltér a könyvtől. A lecke saját `DigitStrokes` képet használ: 1. vonás ferdén le és jobbra, 2. vonás fentről le, ahogy a könyv mutatja.
- A számegyenes csak 0–4-ig tart (a könyv képén 5 és tovább is látszik), hogy ne kerüljön elő még nem tanult szám.
- A könyv „Írj a négyzetbe …” (□) feladatai helyett „Melyik szám jön ide / hiányzik?” kérdések vannak a számegyenesen; a nyitott mondatot (□) később tanuljuk.
- A bontást a könyv két üres keretével („ház”) mutatjuk, `+` jel nélkül – az összeadás csak a 7. leckében jön.
- A csoportosítás négyesével és a gyöngysor-szabály kimaradt (nagyobb számokat igényel, koppintással nehezen kivitelezhető).
