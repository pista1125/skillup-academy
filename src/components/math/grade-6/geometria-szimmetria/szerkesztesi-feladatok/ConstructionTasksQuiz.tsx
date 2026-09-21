import React from 'react';
import { QuizTemplate, QuizLevelConfig } from '../QuizTemplate';
import { ConstructionTasksMiniFigure } from './ConstructionTasksDiagrams';
import { ConstructionTasksMatcher } from './ConstructionTasksMatcher';
import { ConstructionTasksSorter } from './ConstructionTasksSorter';

export interface ConstructionTasksQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

export function ConstructionTasksQuiz({ onBack, onSwitchToTheory }: ConstructionTasksQuizProps) {
  const levelsConfig: Record<1 | 2 | 3, QuizLevelConfig> = {
    // =========================================================================
    // 1. SZINT: ALAPFOGALMAK, 4 LÉPÉS ÉS HÁROMSZÖG-EGYENLŐTLENSÉG (10 FELADAT)
    // =========================================================================
    1: {
      level: 1,
      title: '1. Szint: A szerkesztés lépései és a háromszög-egyenlőtlenség',
      subtitle: 'Vázlatkészítés, alapesetek (ooo, oszo, szosz), szerkeszthetőség',
      range: '1–10. feladat',
      focus: 'Szerkesztési alapszabályok, háromszög-egyenlőtlenség és segédvonalak',
      questions: [
        {
          id: 'q1-1',
          question: 'Mi a geometriai szerkesztés 4 fázisának helyes sorrendje?',
          options: [
            '1. Vázlat & elemzés → 2. Szerkesztési terv → 3. Pontos szerkesztés → 4. Bizonyítás & diszkusszió',
            '1. Pontos szerkesztés → 2. Vázlat → 3. Számolás → 4. Ellenőrzés',
            '1. Mérés vonalzóval → 2. Szögmérés → 3. Radírozás → 4. Kész rajz',
            '1. Terv → 2. Rajzolás → 3. Vázlat → 4. Kifestés'
          ],
          correctAnswer: '1. Vázlat & elemzés → 2. Szerkesztési terv → 3. Pontos szerkesztés → 4. Bizonyítás & diszkusszió',
          explanation: 'A szerkesztés módszertana szigorúan a vázlatkészítéssel és elemzéssel kezdődik, ezt követi a lépések leírása (terv), a körzővel-vonalzóval végzett pontos szerkesztés, végül a bizonyítás és a megoldások számának vizsgálata (diszkusszió).',
          figure: <ConstructionTasksMiniFigure type="sketch_analysis" />
        },
        {
          id: 'q1-2',
          question: 'Szerkeszthető-e háromszög az alábbi oldalhosszakkal: a = 3 cm, b = 4 cm, c = 8 cm?',
          options: [
            'Nem, mert a két rövidebb oldal összege kisebb a harmadiknál: 3 + 4 = 7 < 8',
            'Igen, mert mindhárom szám pozitív',
            'Igen, mert derékszögű háromszög keletkezik',
            'Nem, mert páros számú oldal nem lehet benne'
          ],
          correctAnswer: 'Nem, mert a két rövidebb oldal összege kisebb a harmadiknál: 3 + 4 = 7 < 8',
          explanation: 'A háromszög-egyenlőtlenség szerint bármely két oldal összegének nagyobbnak kell lennie a harmadiknál. Mivel 3 + 4 = 7 < 8, a körzővel rajzolt körívek nem érik el egymást, így nem létezik ilyen háromszög.',
          figure: <ConstructionTasksMiniFigure type="triangle_inequality_fail" />
        },
        {
          id: 'q1-3',
          question: 'Szerkeszthető-e háromszög az a = 5 cm, b = 6 cm, c = 7 cm oldalhosszakkal?',
          options: [
            'Igen, mert 5 + 6 = 11 > 7 (teljesül a háromszög-egyenlőtlenség)',
            'Nem, mert a számok egymást követő egész számok',
            'Nem, mert a körívek 2 különböző háromszöget adnának',
            'Csak tompaszögű háromszögként szerkeszthető'
          ],
          correctAnswer: 'Igen, mert 5 + 6 = 11 > 7 (teljesül a háromszög-egyenlőtlenség)',
          explanation: 'A két kisebb oldal összege 5 + 6 = 11 cm, ami nagyobb a leghosszabb 7 cm-es oldalnál, így a háromszög-egyenlőtlenség teljesül, a háromszög megszerkeszthető.',
          figure: <ConstructionTasksMiniFigure type="triangle_inequality_ok" />
        },
        {
          id: 'q1-4',
          question: 'Mit jelent az „ooo” (vagy SSS) háromszög-szerkesztési alapeset?',
          options: [
            'Háromszög szerkesztése mindhárom oldalának (a, b, c) ismeretében',
            'Három egyforma szög szerkesztése',
            'Oldal, osztópont és origó szerkesztése',
            'Három egymást metsző egyenes felvétele'
          ],
          correctAnswer: 'Háromszög szerkesztése mindhárom oldalának (a, b, c) ismeretében',
          explanation: 'Az ooo alapeset (oldal-oldal-oldal / SSS) azt jelenti, hogy a háromszög három oldalának hossza adott, és körívezéssel határozzuk meg a 3. csúcspontot.',
          figure: <ConstructionTasksMiniFigure type="triangle_sss" />
        },
        {
          id: 'q1-5',
          question: 'Mit jelent az „oszo” (SAS) háromszög-szerkesztési alapeset?',
          options: [
            'Két oldal és a kettőjük által közbezárt szög ismeretében végzett szerkesztés',
            'Oldal, szögfelező és magasság ismeretében történő szerkesztés',
            'Két szög és egy külső oldal ismerete',
            'Csak tompaszögű háromszögekre érvényes eljárás'
          ],
          correctAnswer: 'Két oldal és a kettőjük által közbezárt szög ismeretében végzett szerkesztés',
          explanation: 'Az oszo alapeset (oldal-szög-oldal / SAS) során felmérünk egy oldalt, annak egyik végpontjába felmérjük a közbezárt szöget, majd a kapott szögszárra felmérjük a második oldalt.',
          figure: <ConstructionTasksMiniFigure type="triangle_sas" />
        },
        {
          id: 'q1-6',
          question: 'Mit jelent a „szosz” (ASA) háromszög-szerkesztési alapeset?',
          options: [
            'Egy oldal és a rajta fekvő két belső szög ismeretében végzett szerkesztés',
            'Szögfelező és oldalfelező metszéspontjának kijelölése',
            'Három szög ismeretében végzett szerkesztés',
            'Szimmetriatengely körüli tükrözés'
          ],
          correctAnswer: 'Egy oldal és a rajta fekvő két belső szög ismeretében végzett szerkesztés',
          explanation: 'A szosz alapesetben (szög-oldal-szög / ASA) felmérjük az adott szakaszt, mindkét végpontjába felmérjük a megfelelő szöget, és a két szögszár metszéspontja adja a 3. csúcsot.',
          figure: <ConstructionTasksMiniFigure type="triangle_asa" />
        },
        {
          id: 'q1-7',
          question: 'Mi a körző szerepe a háromszög 3 oldalból (ooo) történő szerkesztésekor?',
          options: [
            'A megadott oldalhosszúságok körívként történő kimérése a csúcsokból a metszéspont megtalálásához',
            'Csak díszítő körök rajzolása az ábra köré',
            'A szögek fokban való leolvasása',
            'A vonalzó helyettesítése egyenes vonalak húzására'
          ],
          correctAnswer: 'A megadott oldalhosszúságok körívként történő kimérése a csúcsokból a metszéspont megtalálásához',
          explanation: 'A körző azon pontok összességét (köríveket) rajzolja meg, amelyek adott távolságra vannak a csúcstól. A két körív metszéspontja mindkét csúcstól egyszerre a kívánt távolságra van.',
          figure: <ConstructionTasksMiniFigure type="compass_straightedge" />
        },
        {
          id: 'q1-8',
          question: 'Szabad-e kiradírozni a szerkesztési köríveket és segédvonalakat a feladat végén?',
          options: [
            'Nem, mert a segédvonalak és körívek igazolják a szerkesztés geometriai pontosságát és menetét',
            'Igen, csak a tiszta végleges alakzat maradhat a lapon',
            'Csak akkor, ha túl vastagra sikerültek a körívek',
            'Igen, mert a segédvonalakért pontlevonás jár'
          ],
          correctAnswer: 'Nem, mert a segédvonalak és körívek igazolják a szerkesztés geometriai pontosságát és menetét',
          explanation: 'A geometriai szerkesztés lényegi része a segédvonal-hálózat (körívek, felezőmerőlegesek, metszéspontok). Ezeket halványan rajzoljuk, de sosem radírozzuk ki!',
          figure: <ConstructionTasksMiniFigure type="triangle_sss" />
        },
        {
          id: 'q1-9',
          question: 'Szerkeszthető-e olyan háromszög, melynek megadott belső szögei: α = 95° és β = 90°?',
          options: [
            'Nem, mert 95° + 90° = 185° > 180°, ami meghaladja a háromszög belső szögeinek összegét',
            'Igen, mert két szög ismeretében mindig szerkeszthető háromszög',
            'Igen, ha a harmadik szög negatív',
            'Csak akkor, ha az oldal nem adott'
          ],
          correctAnswer: 'Nem, mert 95° + 90° = 185° > 180°, ami meghaladja a háromszög belső szögeinek összegét',
          explanation: 'Bármely háromszög belső szögeinek összege pontosan 180°. Mivel már két szög összege is 185°, a szárak széttartanak, nem fognak metszeni egymást.',
          figure: <ConstructionTasksMiniFigure type="angle_sum_check" />
        },
        {
          id: 'q1-10',
          question: 'Hány független adat szükséges egy háromszög egyértelmű megszerkesztéséhez?',
          options: [
            '3 független adat (amelyek közül legalább egynek oldalhossznak kell lennie)',
            '2 adat mindig elegendő',
            'Csak 1 adat kell (a kerülete)',
            'Legalább 5 adat szükséges'
          ],
          correctAnswer: '3 független adat (amelyek közül legalább egynek oldalhossznak kell lennie)',
          explanation: 'A háromszögek egyértelmű szerkesztéséhez 3 független adat kell (pl. 3 oldal, 2 oldal + szög, vagy 1 oldal + 2 szög). Csak szögekből nem határozható meg a méret.',
          figure: <ConstructionTasksMiniFigure type="sketch_analysis" />
        }
      ]
    },

    // =========================================================================
    // 2. SZINT: TENGELYES SZIMMETRIÁRA ÉPÜLŐ SZERKESZTÉSEK (10 FELADAT)
    // =========================================================================
    2: {
      level: 2,
      title: '2. Szint: Szimmetrikus alakzatok szerkesztési tervei',
      subtitle: 'Egyenlő szárú és szabályos háromszög, rombusz, deltoid, húrtrapéz',
      range: '11–20. feladat',
      focus: 'Szakaszfelező merőleges, átlók felezése és szimmetriatengely használata',
      questions: [
        {
          id: 'q2-1',
          question: 'Hogyan szerkesztünk egyenlő szárú háromszöget az alap (c = 6 cm) és a magasság (m_c = 4 cm) ismeretében?',
          options: [
            'Felmérjük az AB = 6 cm alapot, megszerkesztjük a felezőmerőlegesét, és arra rámérjük az m_c = 4 cm-t',
            'Körzővel 4 cm sugarú kört rajzolunk A és B pontokból',
            'Az alap végpontjaiba 45°-os szögeket szerkesztünk',
            'A vonalzót ferdén tartva összekötjük a végpontokat'
          ],
          correctAnswer: 'Felmérjük az AB = 6 cm alapot, megszerkesztjük a felezőmerőlegesét, és arra rámérjük az m_c = 4 cm-t',
          explanation: 'Mivel az egyenlő szárú háromszög szimmetriatengelye az alap felezőmerőlegese, a C csúcs ezen a felezőmerőlegesen fekszik pontosan m_c távolságra az F felezőponttól.',
          figure: <ConstructionTasksMiniFigure type="isosceles_base_height" />
        },
        {
          id: 'q2-2',
          question: 'Hogyan szerkeszthető meg egy rombusz, ha adott a két átlója: e = 8 cm és f = 6 cm?',
          options: [
            'Felvesszük az e = 8 cm átlót, megszerkesztjük a felezőmerőlegesét, majd a felezőpontból f/2 = 3 cm-t mérünk fel és le',
            'Egy 8 cm-es és egy 6 cm-es oldalt egymásra merőlegesen felmérünk',
            'Csak akkor szerkeszthető, ha az oldala is meg van adva',
            'Körzővel 8 cm-es sugarat mérünk a 6 cm-es szakaszra'
          ],
          correctAnswer: 'Felvesszük az e = 8 cm átlót, megszerkesztjük a felezőmerőlegesét, majd a felezőpontból f/2 = 3 cm-t mérünk fel és le',
          explanation: 'A rombusz átlói merőlegesen felezik egymást! Így az AC átló felezőmerőlegesén a középponttól 3 cm-re fel és le helyezkedik el a másik két csúcs (B és D).',
          figure: <ConstructionTasksMiniFigure type="rhombus_diagonals" />
        },
        {
          id: 'q2-3',
          question: 'Hány független adat elegendő egy rombusz egyértelmű megszerkesztéséhez?',
          options: [
            '2 független adat (pl. a két átló hossza, vagy az oldalhossz és egy szög)',
            '5 adat szükséges',
            '4 adat szükséges',
            '1 adat elegendő'
          ],
          correctAnswer: '2 független adat (pl. a két átló hossza, vagy az oldalhossz és egy szög)',
          explanation: 'A rombusznak mind a 4 oldala egyenlő és szimmetrikus, így elegendő 2 független adat (pl. a két átló, vagy egy oldal és egy szög, vagy egy oldal és egy átló).',
          figure: <ConstructionTasksMiniFigure type="rhombus_diagonals" />
        },
        {
          id: 'q2-4',
          question: 'Hogyan szerkesztünk szabályos háromszöget, ha adott az oldalhossza: a = 5 cm?',
          options: [
            'Felmérjük az AB = 5 cm szakaszt, majd mindkét végpontjából 5 cm sugarú körívet húzunk',
            'Felmérünk egy 5 cm-es szakaszt és mindkét végébe 90°-ot szerkesztünk',
            'Megrajzolunk egy 5 cm átmérőjű kört és beleteszünk egy tetszőleges háromszöget',
            'Három darab 60 cm-es vonalat húzunk'
          ],
          correctAnswer: 'Felmérjük az AB = 5 cm szakaszt, majd mindkét végpontjából 5 cm sugarú körívet húzunk',
          explanation: 'A szabályos háromszög mindhárom oldala 5 cm. Ezért az AB szakasz A és B végpontjaiból r = 5 cm sugarú köríveket metszünk, így megkapjuk a C csúcsot.',
          figure: <ConstructionTasksMiniFigure type="equilateral_construction" />
        },
        {
          id: 'q2-5',
          question: 'Deltoid szerkesztésekor adott a szimmetriaátló e = 7 cm és a két oldal: a = 4 cm, b = 6 cm. Hogyan kapjuk meg a hiányzó B és D csúcsokat?',
          options: [
            'Az A csúcsból k(A; 4 cm), a C csúcsból k(C; 6 cm) köríveket húzunk mindkét oldalon; ezek metszéspontjai B és D',
            'A szimmetriaátló felezőpontjába merőlegest állítunk és felmérjük a 10 cm-t',
            'Összeadjuk a két oldalt és kört rajzolunk',
            'Nem szerkeszthető, mert a deltoidhoz 4 különböző adat kell'
          ],
          correctAnswer: 'Az A csúcsból k(A; 4 cm), a C csúcsból k(C; 6 cm) köríveket húzunk mindkét oldalon; ezek metszéspontjai B és D',
          explanation: 'A deltoidban a szomszédos oldalpárok egyenlők (AB = AD = 4 cm és CB = CD = 6 cm). Így az A és C pontokból húzott körívek felső és alsó metszéspontja adja B-t és D-t.',
          figure: <ConstructionTasksMiniFigure type="deltoid_construction" />
        },
        {
          id: 'q2-6',
          question: 'Hogyan egészítünk ki egy alakzatot, ha adott a szimmetriatengely (t) és az alakzat egyik fele?',
          options: [
            'A csúcspontokból merőlegest állítunk a t tengelyre, és átmérjük a tengelytől való távolságot a túloldalra',
            'Szabadkézzel lemásoljuk a jobb oldalra',
            'A tengelyt elforgatjuk 90 fokkal',
            'Körzővel körbe rajzoljuk az egész lapot'
          ],
          correctAnswer: 'A csúcspontokból merőlegest állítunk a t tengelyre, és átmérjük a tengelytől való távolságot a túloldalra',
          explanation: 'Tengelyes tükrözésnél a tükörkép pontjai a tengelyre bocsátott merőleges egyenesen helyezkednek el, a tengelytől pontosan ugyanolyan távolságra, mint az eredeti pontok.',
          figure: <ConstructionTasksMiniFigure type="symmetric_completion" />
        },
        {
          id: 'q2-7',
          question: 'Melyik vonal a szimmetrikus trapéz (húrtrapéz) szimmetriatengelye a szerkesztés során?',
          options: [
            'A két párhuzamos alap közös szakaszfelező merőlegese',
            'A trapéz hosszabbik átlója',
            'A trapéz egyik szára',
            'A trapéz középvonala'
          ],
          correctAnswer: 'A két párhuzamos alap közös szakaszfelező merőlegese',
          explanation: 'A húrtrapéz szimmetriatengelye merőleges a két alapra, és mindkét alapot pontosan a felezőpontjában metszi.',
          figure: <ConstructionTasksMiniFigure type="trapezoid_construction" />
        },
        {
          id: 'q2-8',
          question: 'Hány független adat szükséges egy téglalap megszerkesztéséhez?',
          options: [
            '2 független adat (pl. a két szomszédos oldalhossz: a és b, vagy egy oldal és az átló)',
            '4 független adat',
            '1 független adat',
            '6 adat'
          ],
          correctAnswer: '2 független adat (pl. a két szomszédos oldalhossz: a és b, vagy egy oldal és az átló)',
          explanation: 'Mivel a téglalap minden szöge 90° és a szemközti oldalai egyenlők, elegendő megadni a két oldal hosszát (a, b) a teljes szerkesztéshez.',
          figure: <ConstructionTasksMiniFigure type="rectangle_construction" />
        },
        {
          id: 'q2-9',
          question: 'Hány független adat szükséges egy négyzet megszerkesztéséhez?',
          options: [
            '1 független adat (pl. az oldalhossz vagy az átló hossza)',
            '2 adat (oldal és szög)',
            '4 adat (mind a 4 oldal)',
            '3 adat'
          ],
          correctAnswer: '1 független adat (pl. az oldalhossz vagy az átló hossza)',
          explanation: 'A négyzetnek minden oldala egyenlő és minden szöge 90°, ezért már egyetlen adatból (pl. a = 4 cm oldalból) egyértelműen megszerkeszthető.',
          figure: <ConstructionTasksMiniFigure type="square_construction" />
        },
        {
          id: 'q2-10',
          question: 'Hogyan szerkeszthető egy egyenes adott P pontjában pontosan 90°-os merőleges egyenes?',
          options: [
            'P pontból azonos távolságra metszünk az egyenesen mindkét irányban, majd ezen segédpontokból felezőmerőlegest szerkesztünk',
            'Vonalzóval megpróbáljuk szemre függőlegesen húzni',
            'Csak szögmérővel lehet derékszöget csinálni',
            'Egy 10 cm-es kört rajzolunk a pont köré'
          ],
          correctAnswer: 'P pontból azonos távolságra metszünk az egyenesen mindkét irányban, majd ezen segédpontokból felezőmerőlegest szerkesztünk',
          explanation: 'A P pontból mindkét irányba felmért egyenlő távolságok kijelölnek egy szakaszt, amelynek P a felezőpontja. Ennek a szakasznak a felezőmerőlegese pontosan a P-beli merőleges.',
          figure: <ConstructionTasksMiniFigure type="perpendicular_bisector" />
        }
      ]
    },

    // =========================================================================
    // 3. SZINT: ÖSSZETETT SZERKESZTÉSEK ÉS DISZKUSSZIÓ (10 FELADAT)
    // =========================================================================
    3: {
      level: 3,
      title: '3. Szint: Összetett szerkesztések, diszkusszió és megoldásszám',
      subtitle: 'Megoldhatósági feltételek, speciális négyszögek és többmegoldásos esetek',
      range: '21–30. feladat',
      focus: 'Körívek metszéspontjai, határértékek, elégséges adatok és diszkusszió',
      questions: [
        {
          id: 'q3-1',
          question: 'Adott két oldal: b = 7 cm, a = 4 cm és a kisebbik oldallal szemközti szög α = 30° (oosz eset, ahol a < b). Hány megoldás jöhet létre a félsíkban?',
          options: [
            '2 megoldás vagy 0 megoldás (mert a körív 2 pontban metszheti a szögszárat, vagy el sem éri azt)',
            'Mindig pontosan 1 megoldás',
            'Végtelen sok megoldás',
            'Ilyen adatokból sosem lehet szerkeszteni'
          ],
          correctAnswer: '2 megoldás vagy 0 megoldás (mert a körív 2 pontban metszheti a szögszárat, vagy el sem éri azt)',
          explanation: 'Ha a megadott szög a kisebbik oldallal szemközti, a C pontból húzott körív kétszer metszi a szemközti szögszárat (két különböző B₁ és B₂ csúcsot adva), vagy ha túl rövid a szár, egyáltalán nem éri el.',
          figure: <ConstructionTasksMiniFigure type="two_solutions" />
        },
        {
          id: 'q3-2',
          question: 'Egy háromszög két oldala a = 4 cm és b = 9 cm. Milyen nyílt intervallumba kell esnie a harmadik oldal (c) hosszának a szerkeszthetőséghez?',
          options: [
            '5 cm < c < 13 cm (|9 - 4| < c < 9 + 4)',
            '0 cm < c < 9 cm',
            'c > 13 cm',
            '4 cm < c < 9 cm'
          ],
          correctAnswer: '5 cm < c < 13 cm (|9 - 4| < c < 9 + 4)',
          explanation: 'A háromszög-egyenlőtlenség szerint a harmadik oldalnak nagyobbnak kell lennie a két oldal különbségénél (9 - 4 = 5 cm), és kisebbnek kell lennie az összegüknél (9 + 4 = 13 cm).',
          figure: <ConstructionTasksMiniFigure type="triangle_inequality_ok" />
        },
        {
          id: 'q3-3',
          question: 'Egy rombusz oldala a = 6 cm, egyik belső szöge α = 60°. Milyen alakzatokra bontja a rombuszt a rövidebb átlója?',
          options: [
            'Két egybevágó szabályos háromszögre (oldalaik 6 cm)',
            'Két derékszögű háromszögre',
            'Két tompaszögű háromszögre',
            'Négy egyenlő szárú háromszögre'
          ],
          correctAnswer: 'Két egybevágó szabályos háromszögre (oldalaik 6 cm)',
          explanation: 'Mivel a rombusz szomszédos oldalai 6 cm-esek és a közbezárt szög 60°, az egyenlő szárú háromszög alapon fekvő szögei is (180°-60°)/2 = 60°-osak, tehát szabályos háromszög jön létre.',
          figure: <ConstructionTasksMiniFigure type="rhombus_diagonals" />
        },
        {
          id: 'q3-4',
          question: 'Háromszög szerkesztésénél az oldalak: a = 5 cm, b = 5 cm, c = 10 cm. Mi történik a körívekkel a szerkesztés során?',
          options: [
            'A két körív pontosan egyetlen pontban (az AB szakasz felezőpontján) érinti egymást, így nem jön létre valódi háromszög (elfajuló eset)',
            'A körívek két pontban metszik egymást',
            'A körívek egyáltalán nem érnek össze',
            'Egy szabályos háromszög keletkezik'
          ],
          correctAnswer: 'A két körív pontosan egyetlen pontban (az AB szakasz felezőpontján) érinti egymást, így nem jön létre valódi háromszög (elfajuló eset)',
          explanation: 'Mivel 5 + 5 = 10, a két körív összeér az egyenesen, a harmadik csúcs az AB szakaszra esik, így a háromszög területe 0 lesz (elfajult eset, nem szerkeszthető háromszög).',
          figure: <ConstructionTasksMiniFigure type="triangle_inequality_fail" />
        },
        {
          id: 'q3-5',
          question: 'Adott egy háromszög AB alapja és az alaphoz tartozó m_c magasság. Hol helyezkedhet el a C csúcs a síkban?',
          options: [
            'Az AB egyenessel párhuzamos, tőle m_c távolságra lévő két egyenes valamelyikén',
            'Csak az AB felezőmerőlegesén',
            'Az A körüli m_c sugarú körön',
            'Az AB szakasz tetszőleges pontjában'
          ],
          correctAnswer: 'Az AB egyenessel párhuzamos, tőle m_c távolságra lévő két egyenes valamelyikén',
          explanation: 'Egy egyenestől adott távolságra lévő pontok mértani helye a síkban két, az eredeti egyenessel párhuzamos egyenes (a megadott m_c távolságban).',
          figure: <ConstructionTasksMiniFigure type="isosceles_base_height" />
        },
        {
          id: 'q3-6',
          question: 'Hány független adatra van szükség egy általános (aszimmetrikus) négyszög egyértelmű megszerkesztéséhez?',
          options: [
            '5 független adatra (pl. 4 oldal és 1 szög vagy átló)',
            '4 adatra',
            '3 adatra',
            '6 adatra'
          ],
          correctAnswer: '5 független adatra (pl. 4 oldal és 1 szög vagy átló)',
          explanation: 'Mivel a négyszöget egy átlója két háromszögre bontja, és egy háromszöghöz 3 adat kell, a közös oldal miatt összesen 3 + 3 - 1 = 5 független adat szükséges egy általános négyszög szerkesztéséhez.',
          figure: <ConstructionTasksMiniFigure type="sketch_analysis" />
        },
        {
          id: 'q3-7',
          question: 'Szimmetrikus trapéz alapjai a = 10 cm, c = 4 cm. Mekkora szakaszt vág le az alsó alapból a felső csúcsból bocsátott magasságvonal (x)?',
          options: [
            'x = (a - c) / 2 = (10 - 4) / 2 = 3 cm',
            'x = 6 cm',
            'x = 2 cm',
            'x = 4 cm'
          ],
          correctAnswer: 'x = (a - c) / 2 = (10 - 4) / 2 = 3 cm',
          explanation: 'A szimmetria miatt a két szár alatti levágott szakasz egyenlő hosszúságú: x = (a - c) / 2 = (10 - 4) / 2 = 3 cm. Ez az összefüggés elengedhetetlen a húrtrapéz szerkesztéséhez.',
          figure: <ConstructionTasksMiniFigure type="trapezoid_construction" />
        },
        {
          id: 'q3-8',
          question: 'Mit nevezünk egy geometriai szerkesztési feladat „diszkussziójának”?',
          options: [
            'Annak vizsgálatát, hogy a megadott adatokkal létezik-e megoldás, és ha igen, hány nem egybevágó megoldás van',
            'A szerkesztés során elkövetett rajzolási hibák megbeszélését',
            'A szögek fokban történő átváltását radiánba',
            'A kész rajz bekeretezését és kifestését'
          ],
          correctAnswer: 'Annak vizsgálatát, hogy a megadott adatokkal létezik-e megoldás, és ha igen, hány nem egybevágó megoldás van',
          explanation: 'A diszkusszió a megoldhatóság feltételeinek és a megoldások számának (0, 1 vagy több nem egybevágó alakzat) szisztematikus elemzése.',
          figure: <ConstructionTasksMiniFigure type="triangle_inequality_ok" />
        },
        {
          id: 'q3-9',
          question: 'Egy háromszög alapja c = 8 cm, a rajta fekvő két szög α = 45° és β = 45°. Milyen háromszöget kapunk a szerkesztés végén?',
          options: [
            'Egyenlő szárú derékszögű háromszöget (γ = 90°)',
            'Szabályos háromszöget',
            'Tompaszögű háromszöget',
            'Általános háromszöget'
          ],
          correctAnswer: 'Egyenlő szárú derékszögű háromszöget (γ = 90°)',
          explanation: 'A harmadik szög γ = 180° - (45° + 45°) = 90°, tehát a háromszög derékszögű, és mivel két szöge egyenlő (45°-45°), egyenlő szárú is.',
          figure: <ConstructionTasksMiniFigure type="triangle_asa" />
        },
        {
          id: 'q3-10',
          question: 'Egy egyenesre nem illeszkedő P pontból merőlegest szeretnénk bocsátani az egyenesre. Mi a körzővel végzett első lépés?',
          options: [
            'P pontból olyan körívet húzunk, amely két pontban metszi az adott egyenest',
            'Vonalzóval azonnal összekötjük a legközelebbi ponttal',
            'P-be 90 fokos szöget másolunk',
            'Körzővel megkeressük az egyenes felezőpontját'
          ],
          correctAnswer: 'P pontból olyan körívet húzunk, amely két pontban metszi az adott egyenest',
          explanation: 'A P pontból húzott körív két A és B pontban metszi az egyenest (AP = BP), majd az AB szakasz felezőmerőlegese pontosan a P-ből bocsátott merőleges lesz.',
          figure: <ConstructionTasksMiniFigure type="perpendicular_bisector" />
        }
      ]
    }
  };

  return (
    <QuizTemplate
      grade={6}
      chapterId="g6-geometry"
      title="Szerkesztési feladatok kvíz"
      subtitle="A szerkesztés lépései, alapesetek és szimmetrikus alakzatok 3 szinten"
      badge="📐 6. Osztály • III. Geometria • 10. Fejezet"
      topicId="g6-construction-tasks-quiz"
      themeColor="teal"
      levels={levelsConfig}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      renderMatcher={(props) => <ConstructionTasksMatcher {...props} />}
      renderSorter={(props) => <ConstructionTasksSorter {...props} />}
      matcherComponent={
        <ConstructionTasksMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <ConstructionTasksSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
}
