# 6. Megálló – tudáspróba (3. osztály, III. Számolás 0-tól 200-ig)

A III. fejezet záró leckéje: az egész fejezet (1–5. lecke) ismétlése és 90 kérdéses tudáspróbája.

## Források

- **Tankönyv (OH-MAT03TA):** Megálló 41–42. o., Kitekintő 43. o.; az egész fejezet 28–40. o.
- **Munkafüzet I. (OH-MAT03MA_I):** a fejezet 35–47. o.; „Ellenőrizd a tudásodat!” 56–57. o. és „Gyakorolj!” 58–60. o. 200-as számkörbe tartozó feladatai.
- A mérés-feladatok (MF 57/8., 60/12–13.: dl, l, dkg, kg) a IV. fejezethez tartoznak, itt nem szerepelnek.

## Mi van a tankönyvi és munkafüzeti oldalakon?

- **TK 41.:** gyöngysorok értéke (piros = 100, kék = 10, sárga = 1); a 176 bontása többféle sorrendben; két persely (120 Ft és 170 Ft) – érmék, különbség, „legalább hány forint kell”; indulási idők táblázata (7 óra 40 perc).
- **TK 42.:** hiányzó számok nyíldiagramokon (60 + 30 → ■, ■ − 30 → 40 …); kisebb, nagyobb, egyenlő (80 · 2 □ 200, 180 : 30 □ 70 …); lépőkő-útvonal műveletekkel (70 + 90, 200 : 5, 100 + 60 : 2 …).
- **TK 43. (Kitekintő):** házikó-ábra 10–50 számokkal; 200-nál kisebb háromjegyű számok 13-as számjegyösszeggel; „Hamis minimalom” műveletsorokkal; ki milyen szoknyát visel (logika); autók a lámpánál.
- **MF 35–47.:** számtábla 101–200, számírás betűvel, pénztárcák, golyós számkép, helyiérték-táblázat, alaki/helyi/valódi érték, számegyenes, számszomszédok, kerekítés tízesre, összeadás–kivonás kerek tízesekkel, szorzás–osztás kerek tízesekkel.
- **MF 56–60.:** gondolt szám (1 sz + 8 t + 12 e), sorba rendezés, halmazábra, számegyenes + kerekítés, szomszédtáblázat, −30-as sorozat, műveletek, műveletsorok, nyitott mondat (60 + 70 < □ < 190 − 50), szöveges feladat (palánták), összegek és különbségek, sorozatok, „hatodáért” vett füzet, műveleti sorrend.

## Mit csinál a DiákZóna lecke?

Saját feladatok, saját számok és helyzetek (könyvtár, kert, tojástálca, kisbusz, perselyek, iskolába járás diagramja) – a könyv feladattípusait gyakoroljuk, de nem másoljuk.

- **Elmélet:** „Amit már tudsz” táblázat a fejezet 5 leckéjéről, 6 ábra (számkép + helyiérték-táblázat, számegyenes, kerekítés, 60 + 50 két lépésben, szorzás–osztás tányérokkal, pénz), 4 kidolgozott vegyes feladat, „Vigyázz!” (hiányzó tízes: 1 százas + 8 egyes = 108; kerekítés 5-nél).
- **Labor I – Vegyes feladatok:** 8 feladattípus (számok, szomszédok, kerekítés, összeadás, kivonás, szorzás, osztás, sorrend), nagy számgombokkal; „Új feladat” véletlen számokkal 0 és 200 között. A visszajelzés a konkrét hibára reagál (pl. „Felcserélted a tízeseket és az egyeseket”, „Ha az egyesek helyén 5 áll, a nagyobb tízesre kerekítünk”, „Balról jobbra számoltál”, „Ez csak 12 : 4 …”).
- **Labor II – Építsd meg a számot!:** a gyerek százas lapot, tízesrudat és egyeskockát tesz ki +/− gombokkal egy számjeggyel vagy betűvel megadott számhoz (pl. „százötvennyolc”), a rajz azonnal mutatja; a visszajelzés megmondja, melyik helyiértékkel van baj, és szól a tízes–egyes cseréről.
- **Kvíz:** 90 kérdés (30/30/30), 63 ábrával, mind típusjelvénnyel, 3 puskakártya. Egyetlen szám (válaszlehetőségben sem) nagyobb 200-nál.
- **Párosító:** 3 szint × 8 pár, szintenként 4 képes kártya (számkép ↔ szám; kerekítés szakaszon ↔ kerek tízes; érmék ↔ összeg).
- **Csoportosító:** 3 szint × 3 kategória × 9 elem (a tízesek helyén 4 / 6 / 8 áll; árcédulák kerekítve ≈ 150 / 160 / 170 Ft; eredmény 120 / 150 / 180), 33 képes elem.

## Komponensek

- `Count200ExamG3Figures.tsx`: `Count200BlocksSvg`, `Count200NumberLineSvg`, `Count200RoundingSvg`, `Count200AddSubSvg`, `Count200MulDivSvg`, `Count200MoneySvg`
- `Count200ExamG3Parts.tsx`: rajzelemek (számkép, számegyenes, cellasor, helyiérték-táblázat, számtábla-részlet, oszlopdiagram, műveletlánc, érmék, kártyák); az 5. lecke `MulDiv200G3Parts.tsx` elemeire épül
- `Count200ExamG3CardFigures.tsx`: kártyaképek (`CardBlocks`, `CardTag`, `CardRoundLine`, `CardCoins`, valamint az 5. leckéből `CardRods`, `CardCoinMul`)
- `Count200ExamG3Theory.tsx`: `Count200ExamG3Theory`, `makeCount200Task`, `makeBuildTarget`, `numberWord`
- `Count200ExamG3Quiz.tsx`: `Count200ExamG3Quiz`, `COUNT200_EXAM_G3_QUESTIONS` (azonosító: `g3-c200-tudasproba-quiz`)
- `Count200ExamG3Matcher.tsx`: `Count200ExamG3Matcher`, `COUNT200_EXAM_G3_MATCHER_LEVELS` (`g3-c200-tudasproba-matcher`)
- `Count200ExamG3Sorter.tsx`: `Count200ExamG3Sorter`, `COUNT200_EXAM_G3_SORTER_LEVELS` (`g3-c200-tudasproba-sorter`)

Teszt: `src/test/grade3Topic3Count200ExamG3.test.tsx`

## Eltérések a tankönyvtől

1. **Kétértelmű és pontatlan pénzfeladat (TK 41/3. d):** „Legalább hány forintot kell Karcsinak a perselyébe tennie, hogy neki legyen több pénze?” – nem derül ki, hogy a c) részben Katinak bedobott 30 Ft-tal vagy anélkül kell számolni (51 vagy 81 Ft). Ráadásul forintérmékkel 51 Ft nem rakható ki, a legkisebb valódi összeg 55 Ft (50 + 5). DiákZóna: egyértelmű adatok (120 Ft és 170 Ft), az érmék felsorolva, a helyes válasz 55 Ft, a magyarázat kitér arra, hogy az 50 Ft csak egyenlőséget ad, az 51 Ft-ot pedig nem lehet érmékből kirakni.
2. **Törtfogalom túl korán (MF 60/10., MF 37/10.):** „Pénzének hatodáért egy füzetet vásárolt”, „A százasok helyén a négy fele van” – a törteket csak a XIV. fejezet tanítja. DiákZóna nem használ törtszavakat; helyette egyenlő részekre osztás („A 60-at 3 egyenlő részre osztjuk”).
3. **Más fejezet anyaga (TK 41/4., MF 57/8., 60/12–13.):** időszámítás (7 óra 40 perc) és mértékegységek (dl, l, dkg, kg) a IV. Mérések fejezethez tartoznak; a tudáspróba csak a III. fejezet anyagát kéri számon.
4. **Félrevezető „legfeljebb” (TK 43/5.):** „Kocsija ott van az első négy és az utolsó három jármű között. Legfeljebb hány jármű várakozik?” – a feltételből pontosan 8 jármű következik, a „legfeljebb” félrevezető. A feladatot nem vettük át.
5. **Számkör betartása a rossz válaszokban is:** a tudáspróbában egyetlen szám – a hibás válaszlehetőségek is – legfeljebb 200 (pl. „százhuszonhét” mellé 172, 117, 107; „1 sz + 8 t + 12 e” mellé 182, 128, 180). Ezt teszt is ellenőrzi.
6. **Didaktikai változtatások:** a könyv gyöngysorai (TK 41/1.) helyett a fejezet többi leckéjével egyező számképet használunk (százas lap piros, tízesrúd kék, egyeskocka sárga), és a gyerek maga is kirakhatja (Labor II). A lépőkő-útvonal és a „hamis minimalom” helyett véletlen feladatgenerátor ad azonnali, hibára szabott visszajelzést. A kerekítést mindig kis számegyenes-részlettel mutatjuk, és külön kártya tanítja az 5-ös szabályt. A Kitekintő gondolkodtató feladataiból saját fejtörők lettek (□ + △ = 150, □ − △ = 50; 12-es számjegyösszeg; legnagyobb páros szám 200 alatt).
7. A régi README a címek alapján készült, és százasra kerekítést is ígért, pedig a tankönyv (TK 33–34.) csak tízesre kerekít. DiákZóna is csak tízesre kerekít.
