# 8. Megálló – tudáspróba (3. osztály, I. Számolás 0-tól 100-ig)

Az I. fejezet záró leckéje: az egész fejezet (1–7. lecke) ismétlése és 90 kérdéses tudáspróbája.

## Források

- **Tankönyv (OH-MAT03TA):** Megálló 22–24. o., Kitekintő 25. o.; az egész fejezet 4–21. o.
- **Munkafüzet I. (OH-MAT03MA_I):** „Ellenőrizd a tudásodat!” 30–31. o., „Gyakorolj!” 32–34. o.; a fejezet 4–27. o.
- A római számok (MF I/28–29.) a II. fejezethez tartoznak, itt nem szerepelnek.

## Mi van a tankönyvi és munkafüzeti oldalakon?

- **TK 22.:** papírsárkányok összehasonlítása; kockalépcsők (1, 3, 6 … kocka); virágsorminták; 4 dominóból négyzet, minden oldalon 10 pötty (8-as változat keresése).
- **TK 23.:** logikai lapok takarnak számokat (pl. ● + 25 = 50, 69 − ■ = 54), az ábra értéke; útvonalak Pécs – Mohács – Dunaújváros (3 · 4 = 12 lehetőség); szorzatok párosítása (24, 18, 30, 36).
- **TK 24.:** társasjáték műveletsorokkal (pl. 7 · 7 + 5 · 3, (54 − 18) : 6, 4 · (9 − 2) : 7); az osztály „fele, fele, fele” feladat.
- **TK 25. (Kitekintő):** nyilakkal megadott szabályok (+2, −3, ·2; −5, +10, :2); „ki nőtt többet” szöveges rejtvény; üdülő 6 négyszemélyes asztallal (21, 22 vagy 23 fő); kosárlabda-pontok; iskolabusz (45 hely, 8 üres); kisebbítendő–kivonandó–különbség rejtvény.
- **MF 30–31.:** sorba rendezés, páratlan számok, sorozat, számszomszéd-táblázat, összeadás–kivonás, szorzótábla-részlet, műveletsorok, nyitott mondat, szabálytáblázat, maradékos osztás.
- **MF 32–34.:** számírás, bontott alak, számegyenes, számszomszédok, műveleti táblák, sorozatok két szabállyal, nyitott mondatok, szöveges feladat, összehasonlítás, műveletlánc visszafelé, hányadosok, műveletsorok, maradékos osztás.

## Mit csinál a DiákZóna lecke?

Saját feladatok, saját számok és helyzetek – a könyv feladattípusait gyakoroljuk, de nem másoljuk.

- **Elmélet:** „Amit már tudsz” táblázat (leckeszámokkal), 2 ábrás kártya (tízesrúd, számegyenes), 5 kidolgozott feladat („Nézzük meg együtt!”: szöveges feladat 5 lépésben, maradékos osztás korongokkal, műveleti sorrend számozott lépésekkel, dominó-négyzet, műveletlánc és szakaszos ábra), „Vigyázz!” csapda (túl nagy maradék; csak kivonásnál balról jobbra).
- **Labor I – Vegyes feladatok:** 8 feladattípus (szomszédok, összeadás, kivonás, szorzás, osztás, maradékos osztás, sorrend, zárójel), „Új feladat” gomb, véletlen számok 0 és 100 között. A visszajelzés a gyerek konkrét hibájára reagál (pl. „Balról jobbra számoltál”, „Elfelejtetted az új tízest”, „A maradék nem lehet ennyi”).
- **Labor II – Korongos maradékos osztás:** a gyerek gombnyomással rakja ki a csoportokat, a megmaradt (lila) korongok a maradék; ezután beírja a hányadost és a maradékot, és ellenőrző szorzást kap.
- **Kvíz:** 90 kérdés (30/30/30), 59 kérdés ábrával, mind típusjelvénnyel, 3 puskakártya.
- **Párosító:** 3 szint × 8 pár (számok és szomszédok; szorzótábla és osztás; műveleti sorrend és zárójel).
- **Csoportosító:** 3 szint × 3 kategória × 9 elem (kerek tízes / páros / páratlan; maradék 0 / 1 / 2; = 20 / 30 / 40).

## Komponensek

- `Count100ExamG3Figures.tsx`: `Count100TensOnesSvg`, `Count100NumberLineSvg`, `Count100RemainderSvg`, `Count100OrderStepsSvg`, `Count100DominoSquareSvg`, `Count100ChainSvg`
- `Count100ExamG3Parts.tsx`: közös rajzoló elemek (tízesrúd, számegyenes, táblázat, kártyák, pénzérmék, tányérok, korongcsoportok, műveletlánc, logikai lapok, szakaszos ábra, lépcső, útvonalak, dominó-négyzet, csoki, asztalok, szorzótábla)
- `Count100ExamG3Theory.tsx`: `Count100ExamG3Theory`, `makeCount100Task`, `makeDivTask`
- `Count100ExamG3Quiz.tsx`: `Count100ExamG3Quiz`, `COUNT100_EXAM_G3_QUESTIONS` (azonosító: `g3-c100-tudasproba-quiz`)
- `Count100ExamG3Matcher.tsx`: `Count100ExamG3Matcher` (`g3-c100-tudasproba-matcher`)
- `Count100ExamG3Sorter.tsx`: `Count100ExamG3Sorter` (`g3-c100-tudasproba-sorter`)

Teszt: `src/test/grade3Topic1Count100ExamG3.test.tsx`

## Eltérések a tankönyvtől

1. **Hibás szabály a munkafüzetben (MF 31/9.):** „Ügyelj arra, hogy a maradék ne legyen több az osztónál!” – ez hibás, mert a maradék az osztóval **egyenlő sem lehet** (pl. 26 : 4 = 5, marad 4 rossz). DiákZóna: „A maradék mindig **kisebb**, mint az osztó.” Erre külön csapdakártya, kvízkérdés (legnagyobb maradék 5-tel osztva: 4) és hibakereső kérdés készült, a Labor II pedig figyelmeztet, ha a maradék nem kisebb az osztónál.
2. **Római számok a műveleti sorrend jelölésére (TK 19–21.):** a könyv I., II., III. római számokkal jelöli a műveletek sorrendjét, pedig a római számokat csak a II. fejezet (TK 26.) tanítja. DiákZóna: színes karikában arab sorszám (1., 2.).
3. **Törtfogalmak a fejezetben (TK 24/9., 25/2., 25/4.; korábban 13/10., 17/6., 19/9., 20/4.):** a könyv „fele”, „harmada”, „tizede”, „nyolcada” szavakat használ, a törteket viszont csak a XIV. fejezet tanítja. DiákZóna ebben a leckében ezek helyett „osztom 2-vel / 8-cal”, „kétszerese”, „hatszorosa” megfogalmazást használ (pl. „A 24 és a 16 összegét elosztom 8-cal”).
4. **Pontatlan kérdés (TK 25/5.):** „Hányan utaznak a buszon?” – a sofőr és az esetleg álló utasok miatt nem egyértelmű. DiákZóna: „Hány utas ül a buszon?”
5. **Következetlen nyílszabály (TK 25/1.):** az első szakaszban csak egy „+2” lépés van, a többiben kettő, így a szabály nehezen ismerhető fel. DiákZóna műveletláncain minden nyíl fölé oda van írva a művelet, a két szabályt váltogató sorozatban pedig a váltakozás szabályos.
6. **Kétértelmű adat (TK 24/9.):** „A szoknyások fele, azaz három gyerek hosszú hajú” – nem derül ki, hogy más hosszú hajú gyerek is lehet-e az osztályban. A feladatot (törtfogalom miatt is) nem vettük át; helyette egyértelmű „kevesebb, mint” típusú szöveges feladat van (13 lány, a fiúk 4-gyel kevesebben).
7. **Didaktikai változtatások:** a könyv dominó-négyzetét (TK 22/4.) 9-es összeggel és egy hiányzó dominófél kiszámításával adjuk; a „Megálló” társasjáték műveletsorai helyett véletlen feladatgenerátor ad azonnali, hibára szabott visszajelzést; a maradékos osztást előbb korongokkal rakatjuk ki (konkrét → képi → jel), csak utána írjuk le; a szöveges feladatokhoz szakaszos ábra készült, a könyv szereplői és történetei helyett saját helyzetekkel (matricák, szalag, csónakázás, tábor).
8. A régi README a címek alapján készült és LaTeX-jelölést (`$M < O$`) használt – most a valódi oldalak alapján átírtuk, jelölés a könyv szerint (·, :, □, „marad”).
