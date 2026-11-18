# 5. Színesrúd-készlet (1. osztály – I. Előkészítő időszak)

**Források:** OH-MAT01TA_I 20–21. o. (PDF 21–22). Munkafüzeti oldal nincs. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
- 20. o.: ismerkedés a készlettel (színek, leghosszabb, legrövidebb), lépcsőépítés, a színek felsorolása alulról fölfelé és fentről lefelé (csukott szemmel is), formák építése; a lépcső rúdjainak kiszínezése.
- 21. o.: „Tedd, amit mondok!” (rudak elhelyezése egymáshoz képest), sorozatok folytatása (rózsaszín-rózsaszín-fehér…, fehér-fehér-lila…, piros-fehér-világoskék-világoskék-piros…), „Melyik rúdra gondoltam?” találós (a világoskéknél rövidebb, de nem a legrövidebb; a barnánál hosszabb, a narancssárgánál rövidebb), melyik rúd illik az ábrára.
- A színek a könyv szerint: 1 fehér, 2 rózsaszín, 3 világoskék, 4 piros, 5 sárga, 6 lila, 7 fekete, 8 barna, 9 kék, 10 narancssárga.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`SzinesrudKeszletG1Mese`): Pötyi a Számkertben egy doboz színes rudat talál. Megnézi a színeket, megkeresi a leghosszabbat és a legrövidebbet, lépcsőt épít és felmászik rá, pótolja a kiesett rudat, elmondja a színeket alulról fölfelé, sorozatot folytat, kaput épít, és találós kérdést ad fel. 11 oldal, 6 koppintós feladat.
- **Játszótér** (`RodFitPlayground`): „Melyik rúd fér pontosan a helyére?” – szaggatott hely és 4 rúd ugyanabban a léptékben; Pötyi megmondja, ha a rúd kilóg vagy rövid. Új feladat gomb.
- **Játék** (`SzinesrudKeszletG1Jatek`): 3 × 8 kérdés (színek, hosszabb/rövidebb; lépcső, sorozat, építés; találós, rúdvonatok), Párosító (rúd–szín, rúd–hely, rúd–fehérkocka-sor), Válogató (rövid/hosszú; a sárgához képest; a piroshoz képest rövidebb/ugyanolyan/hosszabb).
- Ahol hosszt kell összevetni, a válaszkép maga tartalmazza a helyet vagy a mintarudat (fent minta, lent a jelölt) – így a gombok eltérő mérete nem zavar.

Fájlok: `SzinesrudKeszletG1Scenes.tsx`, `SzinesrudKeszletG1Parts.tsx`, `SzinesrudKeszletG1Mese.tsx`, `SzinesrudKeszletG1Jatek.tsx`, `index.ts`. Teszt: `src/test/grade1Topic1SzinesrudKeszletG1.test.tsx`.

## Eltérések a tankönyvtől
- A 20. oldali lépcsőrajz a narancssárga alatt még egy zöld és egy drapp (barnás) rudat is mutat, amelyek hosszabbak a narancssárgánál – ilyen rúd a tízes készletben nincs, és ellentmond a 21. o. találósának (a barna rövidebb a narancssárgánál). A lecke a 10 rudas készlettel dolgozik (1 fehér … 10 narancssárga).
- A régi README-vázlat a 6-os rudat sötétzöldnek írta; a könyv (20. o. színezés) szerint **lila** – ezt követjük.
- A „Tedd, amit mondok” (bal oldalára, jobbra, függőlegesen) feladat kimaradt: a jobb–bal tájékozódás a következő leckében (Tájékozódás) jön; helyette kapu-, pad- és toronyépítés van („melyik rúd illik az ábrára?”).
- A rudak egymás utáni „vonatai” (két rózsaszín olyan hosszú, mint a piros; piros + fehér = sárga) a könyv „építs formákat” ötletét viszik tovább, számok nélkül, csak hosszúság-összevetéssel.
- Saját történet és ábrák; a színek és a hosszak a könyv szerintiek.
