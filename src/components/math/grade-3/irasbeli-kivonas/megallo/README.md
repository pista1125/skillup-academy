# 5. Megálló – tudáspróba (3. osztály, VIII. Írásbeli kivonás)

A VIII. fejezet záró leckéje: az egész fejezet (1–4. lecke) ismétlése és 90 kérdéses tudáspróbája.

**Activity base id:** `g3-wsub-tudasproba` (`-quiz`, `-matcher`, `-sorter`)

## Források
- **Tankönyv (OH-MAT03TA):** Megálló 95–96. o., Kitekintő 97. o.; az egész fejezet 86–94. o.
- **Munkafüzet II (OH-MAT03MA_II):** „Ellenőrizd a tudásodat!” 14–15. o., „Gyakorolj!” 16–18. o.; a fejezet 4–13. o.

## Mi van a könyv oldalain?
- **TK 95:** ugrókötél-sorozat (−33-as lépés, a két nyél különbsége), váltakozó szabályú sorozat betűkkel (−73, +20) és betűs műveletek, számkártyák (1, 4, 3) legnagyobb/legkisebb különbsége, sportági táblázat összehasonlítása, „123-mal kevesebb” és „126-tal több, mint” szöveges feladatok.
- **TK 96:** nyitott mondatok képekkel (melyik szám teszi igazzá mindhármat), 167-es különbségű számpárok az ugróiskolában, különbség-piramisok, kivonós társasjáték.
- **TK 97 (Kitekintő):** gondoltam egy számot; két szám, amelyek különbsége 500-nál 278-cal kisebb; körös szabálykeresés; képes egyenletrendszer; számjegykártyák a legkisebb/legnagyobb különbséghez; bűvös négyzetek.
- **MF II/14–15:** vegyes ismétlés (számok 500-ig, szomszédok, szabály, szorzás), becslés százasra + írásbeli összeadás/kivonás, „129-cel többet, mint” feladat.
- **MF II/16–18:** pénztárcák áthúzott érmékkel, tízesre becslés, kivonás + ellenőrzés összeadással és kivonással, hiányzó számok, persely-szakaszos ábra, ugrókötél-verseny, szakaszos ábrák (448 m, 365 kg), műveleti sorrend, szabálytáblázat.

## Mit csinál a DiákZóna lecke?
Saját feladatok, saját számok és szereplők (Áron, Vilma, Noel, Lenke, Bálint, Csilla, Jázmin, Teo); a könyv feladattípusait gyakoroljuk, de nem másoljuk. Minden szám legfeljebb 500, mint a könyv VIII. fejezetében.

- **Elmélet:** „Amit már tudsz” táblázat a 4 leckéről; 6 ábra: kivonás fejben pénzzel (375 Ft − 200 Ft), becslés két számegyenesen (362 − 187 százasra és tízesre), az írásbeli kivonás 3 lépése pótlással és maradékkal (a fejezet közös `WrittenSubG3Column` komponensével, a maradék kis zöld 1-es a következő kivonandó-jegy mellett), ellenőrzés összeadással és kivonással, a szöveges feladat terve (Adatok – Terv – Becslés – Számítás – Ellenőrzés – Válasz), a különbség változásai röviden. Kidolgozott vegyes feladatok (piramis, hiányzó számjegy, nyitott mondat), „Vigyázz!” (fordított pótlás, elfelejtett maradék, „több, mint” szó és a kivonás).
- **Labor I – Írásbeli kivonás lépésről lépésre:** véletlen kivonás 500-ig 5 típusból (nem marad semmi, maradt 1 az egyeseknél, a tízeseknél, kétszer, 0 a tízesek helyén). Előbb becslés (3 lehetőség), aztán oszloponként számjegygombokkal írja be a gyerek az eredményt; a kérdés kimondja a pótlás kezdetét („8 meg 1 az 9. 9-hez mennyi kell?”). A maradék-jel ki-be kapcsolható. A hibára célzott a visszajelzés: „Elfelejtetted a maradékot!”, „Fordítva számoltál! A 2 kisebb, mint a 7, ezért 12-ig pótolok, és maradt 1.”, különben a lépés kimondva („7-hez 5, az 12. Leírom az 5-öt, maradt 1.”). A végén ellenőrzés összeadással.
- **Labor II – Vegyes feladatok:** 6 típus (fejben, becslés, hiányzó szám, szöveges, a különbség változása, ellenőrzés), 4 válaszlehetőség; minden rossz válaszhoz saját tipp (pl. „Ez a pontos eredmény, most előbb kerekíts!”, „Vigyázz! A piros a több, tehát a kékben kevesebb van”, „Fordítva! Ha a kivonandó nő, a különbség csökken”). Pontszámláló.
- **Kvíz:** 90 kérdés (30/30/30), 61 ábrával (oszlopos kivonás, érmék, becslő számegyenesek, szakaszos ábrák, csíkok, táblázatok, sorozatok, piramisok, számkártyák, árcédulák, kivonás-sorok, életkor-táblázat), mind típusjelvénnyel, 3 puskakártya. Egyetlen szám sem nagyobb 500-nál – teszt ellenőrzi.
- **Párosító:** 1. szint kivonás fejben és írásban (oszlopos kártyák), 2. szint maradékkal, 3. szint áthúzott érmék és becslés; szintenként 4 képes kártya.
- **Csoportosító:** 1. szint hányszor marad 1 (0 / 1 / 2), 2. szint az eredmény 200-hoz képest, 3. szint a különbség változása; szintenként 6 képes elem.

## Komponensek
- `WrittenSubExamG3Parts.tsx` – kérdésábrák (ColFig, CoinsFig, EstFig, PartsFig, BarsFig, DataTableFig, ChainFig, PyramidFig, CardsFig, TagsFig, CleverFig, AgeFig; a 4. lecke DiffRowsFig, CompareFig, DiffTableFig elemeit is továbbadja)
- `WrittenSubExamG3Figures.tsx` – WrittenSubExamCoinsSvg, WrittenSubExamEstimateSvg, WrittenSubExamStepsSvg, WrittenSubExamCheckSvg, WrittenSubExamPlanSvg, WrittenSubExamChangesSvg
- `WrittenSubExamG3CardFigures.tsx` – MiniCol, MiniCoins, SortCol
- `WrittenSubExamG3Theory.tsx` – WrittenSubExamG3Theory (+ makeColTask, kindOf, estimateOptions, digitHint, makeMixedTask)
- `WrittenSubExamG3Quiz.tsx` – WrittenSubExamG3Quiz, WRITTEN_SUB_EXAM_G3_QUESTIONS
- `WrittenSubExamG3Matcher.tsx` – WrittenSubExamG3Matcher, WRITTEN_SUB_EXAM_G3_MATCHER_LEVELS
- `WrittenSubExamG3Sorter.tsx` – WrittenSubExamG3Sorter, WRITTEN_SUB_EXAM_G3_SORTER_LEVELS
- Felhasznált közös komponens: `../irasbeli-kivonas/WrittenSubG3Column.tsx` (oszlopos kivonás, pótlásos-maradékos lépések: subSteps, spokenSubStep, carryMarks)
- Teszt: `src/test/grade3Topic8WrittenSubExamG3.test.tsx`

## Eltérések a tankönyvtől
- **TK 97/5 (Kitekintő):** a 3, 5, 6, 7, 9 jegyekből a „lehető legnagyobb különbség” 976 − 35 = 941, ez kilóg a fejezet 500-as számköréből (a 0–1000 számkör csak a XI. fejezetben jön). Ezt a feladatot kihagytuk; a számkártyás feladatunk (2, 3, 4 → 432 − 234 = 198) 500 alatt marad.
- **TK 96/7 és 96/10:** ugyanaz a tollaslabda-kép két feladatban két különböző számot jelöl (7.: 403, 10.: □ − 155 = 323 → 478), ráadásul a könyv más feladatokban azt tanítja, hogy azonos kép azonos számot jelent. Nálunk a keresett szám mindig □ vagy piros „?”.
- **TK 95/2:** a sorozat hiányzó tagjait betűk (A–F) jelölik, és betűs kifejezéseket kell kiszámolni (A − C + D, B + (B − C)). Betűket a 3. osztályban nem használunk képletben; a sorozatot dobozokkal és „?”-lel adjuk meg.
- **TK 95/1:** a „rekord” itt a két kötélnyélen álló szám különbsége – ez erőltetett, félrevezető szóhasználat (a rekord nem különbség). A sorozat-típust megtartottuk, de ilyen kerettörténet nélkül.
- **MF II/17/6 szakaszos ábra:** a szakaszok nem arányosak (a 250 Ft-os szakasz mindkét gyereknél ugyanakkora, de a 290 Ft és a 350 Ft szakaszának hossza nem az összegekkel arányos), így az ábráról rosszul lehet „látni”, mennyi marad. Nálunk minden csík közös léptékkel, arányosan készül.
- **MF II/14 (Ellenőrizd a tudásodat!):** az 1–6. feladat nem a VIII. fejezet anyaga (számok 500-ig, szomszédok, szorzás-osztás). A mi tudáspróbánk a VIII. fejezet anyagára épül: kivonás fejben, becslés, írásbeli kivonás, ellenőrzés, hiányzó számok, szöveges feladatok, a különbség változásai.
- **Módszer (a tanító döntése):** a könyv (TK 89–93) a felváltásos kivonást tanítja (13 e − 7 e, a tízesekből elvesszük a felváltott 1-et). A DiákZóna a hagyományos **pótlásos-maradékos** módszert használja: „7-hez 5, az 12. Leírom az 5-öt, maradt 1. 8 meg 1 az 9. 9-hez 7, az 16 …”. Minden kimondott lépés, magyarázat, ábra és rossz válasz (pl. „elfelejtette a maradékot”) ehhez igazodik. Az ellenőrzés összeadással ugyanaz marad.
- **Didaktikai változtatás:** a maradékot az elméleti ábrán és a laborban kis zöld 1-es mutatja a következő kivonandó-jegy mellett (a laborban kikapcsolható); a kvíz oszlopai jelölés nélküliek (kivéve, ahol épp a maradékról kérdezünk).
- **Didaktikai változtatás:** külön „Vigyázz!” és kérdések szólnak arról, hogy a „több, mint” szó után is lehet kivonás („312 mesekönyv, ez 145-tel több, mint az állatos”). A könyv ezt a csapdát (MF II/15/8, TK 95/6) magyarázat nélkül adja.
- **Didaktikai változtatás:** a laborban a gyerek nemcsak számol, hanem előbb becsül, a végén pedig összeadással ellenőriz – a könyv által javasolt sorrendet (becslés → számítás → ellenőrzés) a gép minden feladatnál végigvezeti.
