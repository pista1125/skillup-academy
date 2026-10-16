import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { StatisticsSummaryMatcher } from './StatisticsSummaryMatcher';
import { StatisticsSummarySorter } from './StatisticsSummarySorter';
import {
  QuizSummaryVennSvg,
  QuizSummaryDoubleColumnSvg,
  QuizSummaryPieSvg,
  QuizSummaryMisleadingSvg,
  QuizSummaryTempLineSvg,
  StatOverviewRoadmapSvg,
  ChartComparisonMatrixSvg
} from './StatisticsSummaryDiagrams';

interface StatisticsSummaryQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-stat-flow',
    title: '1. Folyamat & Venn-diagram',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Folyamat:</strong> Kérdésfeltevés {'→'} Adatgyűjtés {'→'} Rendszerezés {'→'} Ábrázolás {'→'} Elemzés.</div>
        <div><strong>Gyakoriság (k):</strong> hányszor fordul elő az adott adat.</div>
        <div><strong>Relatív gyakoriság (f):</strong> f = k / n (összegük kötelezően 1,0 vagy 100%).</div>
        <div><strong>Venn-diagram:</strong> Alaphalmaz (U), metszet (A ∩ B: mindkettő), csak az egyik, egyik sem.</div>
      </div>
    )
  },
  {
    id: 'cs-chart-selection',
    title: '2. Diagramválasztó szabály',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Oszlopdiagram:</strong> Különálló csoportok összehasonlítása (mindig 0-ról induljon a függőleges tengely!).</div>
        <div><strong>Sávdiagram:</strong> Hosszú nevű kategóriák, vízszintes elrendezésű rangsorok.</div>
        <div><strong>Vonalgrafikon:</strong> Időbeli folytonos folyamatok, hőmérséklet- vagy árfolyamváltozási trendek.</div>
        <div><strong>Kördiagram:</strong> Egy teljes egész (100%) arányos részekre bontása.</div>
      </div>
    )
  },
  {
    id: 'cs-pie-rules',
    title: '3. Kördiagram aranyképletek',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Teljes kör:</strong> 100% = 360°</div>
        <div><strong>1% értéke:</strong> 360° : 100 = 3,6°</div>
        <div><strong>Százalékból szög:</strong> α = p × 3,6°</div>
        <div><strong>Szögből százalék:</strong> p = α : 3,6°</div>
        <div className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
          90° = 25% (negyedkör) • 180° = 50% (félkör) • 270° = 75% • 36° = 10%
        </div>
      </div>
    )
  },
  {
    id: 'cs-metrics-rules',
    title: '4. A 4 Statisztikai Mutató',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Átlag (x̄):</strong> Összeg / Darabszám (érzékeny a kiugró adatokra!).</div>
        <div><strong>Medián (Me):</strong> Növekvő sorrendbe rendezett adatok közepe (párosnál a 2 középső átlaga, robusztus!).</div>
        <div><strong>Módusz (Mo):</strong> Leggyakoribb adat az adathalmazban.</div>
        <div><strong>Terjedelem (R):</strong> R = Max - Min (a minta szóródásának legegyszerűbb mutatója).</div>
      </div>
    )
  }
];

const questions: Question[] = [
  // =========================================================================
  // 1. SZINT: KÖNNYŰ (Alapozó összefoglalás - 30 kérdés, sq-1 - sq-30)
  // =========================================================================
  {
    id: 'sq-1',
    difficulty: 1,
    title: 'Venn-diagram kizárólagos részhalmazának leolvasása',
    text: 'A mellékelt Venn-diagram alapján hány diák jár KIZÁRÓLAG sport szakkörre (vagyis nem jár zenére)?',
    figure: <QuizSummaryVennSvg />,
    figureCaption: '30 fős osztály szakköri Venn-diagramja',
    options: [
      '12 tanuló (a kék kör zene nélküli része)',
      '18 tanuló',
      '6 tanuló',
      '8 tanuló'
    ],
    correctAnswer: 0,
    explanation:
      'A Sport kör kizárólagos (metszet nélküli) területén a 12-es szám szerepel. Ők azok a diákok, akik sportolnak, de zene szakkörre nem járnak.'
  },
  {
    id: 'sq-2',
    difficulty: 1,
    title: 'Kettős oszlopdiagram értékének leolvasása',
    text: 'A kettős oszlopdiagram szerint hány 6.A osztályos diák választotta a focit?',
    figure: <QuizSummaryDoubleColumnSvg />,
    figureCaption: '6.A és 6.B sportág választása',
    options: [
      '12 tanuló (a kék oszlop magassága)',
      '9 tanuló',
      '8 tanuló',
      '21 tanuló'
    ],
    correctAnswer: 0,
    explanation:
      'A jelmagyarázat szerint a 6.A a kék oszlop. A Foci kategóriában a kék oszlop magassága pontosan 12.'
  },
  {
    id: 'sq-3',
    difficulty: 1,
    title: 'Félkörös körcikk szöge a kördiagramon',
    text: 'A kördiagramon az Angol szakkörhöz a teljes tanulói kör 50%-a tartozik. Mekkora középponti szög felel meg ennek?',
    figure: <QuizSummaryPieSvg />,
    figureCaption: 'Nyelvi szakkörök kördiagramja',
    options: [
      '180° (egyenesszög, pontosan egy félkörlap)',
      '90° (derékszög)',
      '360° (teljes kör)',
      '100°'
    ],
    correctAnswer: 0,
    explanation:
      'A teljes kör 360°. Ennek az 50%-a: 360° × 0,50 = 180°, ami egy egyenesszöget zár be, pontosan félbevágva a kört.'
  },
  {
    id: 'sq-4',
    difficulty: 1,
    title: 'Módusz leolvasása vonalgrafikonról',
    text: 'A heti hőmérséklet-grafikon alapján melyik hőmérséklet az adatsor módusza (Mo)?',
    figure: <QuizSummaryTempLineSvg />,
    figureCaption: 'Napi hőmérsékletek vonalgrafikonja',
    options: [
      '18°C (3 napon is előfordult: K, Sze, P)',
      '24°C (2 napon volt)',
      '16°C',
      '20°C'
    ],
    correctAnswer: 0,
    explanation:
      'A módusz a leggyakrabban előforduló érték. A 18°C három napon is megjelent (kedden, szerdán és pénteken), ami a legtöbb a héten.'
  },
  {
    id: 'sq-5',
    difficulty: 1,
    title: 'Negyedkör körcikkének szöge',
    text: 'A kördiagramon a Német szakkör a tanulók 25%-át teszi ki. Hány fokos középponti szög tartozik hozzá?',
    figure: <QuizSummaryPieSvg />,
    figureCaption: 'Kördiagram szakkörökkel',
    options: [
      '90° (derékszög)',
      '45°',
      '180°',
      '36°'
    ],
    correctAnswer: 0,
    explanation:
      '25% a kör negyede: 360° : 4 = 90° (vagy 25 × 3,6° = 90°), ami pontosan derékszöget alkot.'
  },
  {
    id: 'sq-6',
    difficulty: 1,
    title: 'Legnépszerűbb kategória azonosítása',
    text: 'A kettős oszlopdiagramon melyik sportág bizonyult a legnépszerűbbnek a 6.B osztály diákjai körében?',
    figure: <QuizSummaryDoubleColumnSvg />,
    figureCaption: 'Sportágak oszlopdiagramja',
    options: [
      'Az Úszás (11 tanulóval)',
      'A Foci (9 tanulóval)',
      'A Kosárlabda (7 tanulóval)',
      'Egyik sem'
    ],
    correctAnswer: 0,
    explanation:
      'A 6.B osztályt a borostyánsárga oszlopok jelzik. Az úszás oszlopa a legmagasabb (11 tanuló).'
  },
  {
    id: 'sq-7',
    difficulty: 1,
    title: 'Külső adatok leolvasása Venn-diagramról',
    text: 'A Venn-diagram alapján hány olyan diák van a 30 fős osztályban, aki SEM a sport, SEM a zene szakkörre nem jár?',
    figure: <QuizSummaryVennSvg />,
    figureCaption: 'Szakköri felmérés Venn-diagramja',
    options: [
      '4 tanuló (a körökön kívül a téglalapban)',
      '6 tanuló',
      '30 tanuló',
      '0 tanuló'
    ],
    correctAnswer: 0,
    explanation:
      'A halmazokon kívül, a téglalap sarkában a 4-es szám található. Ők azok, akik egyik megkérdezett szakkörre sem járnak.'
  },
  {
    id: 'sq-8',
    difficulty: 1,
    title: 'Terjedelem leolvasása heti hőmérsékletekből',
    text: 'A heti hőmérsékleti grafikon alapján mekkora a heti adatok terjedelme (R = Max - Min)?',
    figure: <QuizSummaryTempLineSvg />,
    figureCaption: 'Heti hőmérsékletek',
    options: [
      '8°C (24°C - 16°C = 8°C)',
      '24°C (a maximum)',
      '16°C (a minimum)',
      '4°C'
    ],
    correctAnswer: 0,
    explanation:
      'A hét legmagasabb értéke 24°C, a legalacsonyabb 16°C. Terjedelem: R = 24 - 16 = 8°C.'
  },
  {
    id: 'sq-9',
    difficulty: 1,
    title: 'Félrevezető diagram felismerése',
    text: 'Miért tekintendő manipuláltnak és félrevezetőnek az "A" jelű forgalmi diagram?',
    figure: <QuizSummaryMisleadingSvg />,
    figureCaption: 'Cégforgalom diagramok összehasonlítása',
    options: [
      'Mert a függőleges tengelye nem 0-ról, hanem 98-ról indul, így a 4%-os növekedés háromszoros ugrásnak látszik',
      'Mert sötét színnel rajzolták',
      'Mert a számok nem igazak',
      'Mert vízszintesen kellett volna rajzolni'
    ],
    correctAnswer: 0,
    explanation:
      'Az "A" diagram csonkított tengelyt használ (98-tól indul). Ez optikailag megtéveszti a nézőt, azt a hamis érzetet keltve, mintha a növekedés óriási lenne, miközben a "B" diagramon látható, hogy valójában csak 4%-os.'
  },
  {
    id: 'sq-10',
    difficulty: 1,
    title: 'Helyes diagramtípus kiválasztása',
    text: 'A döntési mátrix szerint melyik diagramtípus a legalkalmasabb egy iskola teljes évi költségvetésének százalékos felosztásának bemutatására?',
    figure: <ChartComparisonMatrixSvg />,
    figureCaption: 'Diagramválasztó útmutató',
    options: [
      'Kördiagram (mert egy teljes egészet bontunk részekre)',
      'Vonalgrafikon',
      'Pontdiagram',
      'Kettős oszlopdiagram'
    ],
    correctAnswer: 0,
    explanation:
      'Ha egyetlen teljes egész (100%) összetételét és százalékos arányait szeretnénk szemléltetni, a kördiagram a legideálisabb eszköz.'
  },
  {
    id: 'sq-11',
    difficulty: 1,
    title: 'Relatív gyakoriság alapfogalma',
    text: 'Hogyan számítjuk ki egy adat relatív gyakoriságát?',
    options: [
      'Az adat gyakoriságát elosztjuk az összes adat számával (f = k / n)',
      'Kivonjuk a legkisebb adatot a legnagyobbból',
      'Összeadjuk az összes számot',
      'Megszorozzuk a gyakoriságot 360-nal'
    ],
    correctAnswer: 0,
    explanation:
      'A relatív gyakoriság megmutatja, hogy az adott adat hányszor fordult elő az összes megfigyeléshez képest: f = k / n. Értéke 0 és 1 közötti tört vagy százalék.'
  },
  {
    id: 'sq-12',
    difficulty: 1,
    title: 'Zene szakkör kizárólagos látogatói',
    text: 'A Venn-diagram alapján hány tanuló jár KIZÁRÓLAG zene szakkörre (tehát nem sportol)?',
    figure: <QuizSummaryVennSvg />,
    figureCaption: 'Szakköri Venn-diagram',
    options: [
      '8 tanuló (a zöld kör önálló része)',
      '14 tanuló',
      '6 tanuló',
      '12 tanuló'
    ],
    correctAnswer: 0,
    explanation:
      'A Zene kör jobb oldali, metszeten kívüli részén a 8-as szám áll. Ők csak zenélnek, sport szakkörre nem járnak.'
  },
  {
    id: 'sq-13',
    difficulty: 1,
    title: 'Teljes kör középponti szöge',
    text: 'Mekkora a teljes kör középponti szöge, amely a kördiagram 100%-ának felel meg?',
    options: [
      '360° (teljes szög)',
      '180°',
      '100°',
      '90°'
    ],
    correctAnswer: 0,
    explanation:
      'A teljes kör középponti szöge 360°. A kördiagramon a teljes minta (100%) mindig 360°-nak felel meg.'
  },
  {
    id: 'sq-14',
    difficulty: 1,
    title: 'Hány fok felel meg 1%-nak a kördiagramon?',
    text: 'Ha a 100%-os egész kör 360°, akkor hány fokos körcikk felel meg pontosan 1%-nak?',
    options: [
      '3,6° (mert 360° : 100 = 3,6°)',
      '1,0°',
      '36°',
      '0,36°'
    ],
    correctAnswer: 0,
    explanation:
      '360 fokot elosztva 100-zal: 360° : 100 = 3,6°. Ez a kördiagram szerkesztésének legfontosabb alapszabálya: 1% mindig 3,6°.'
  },
  {
    id: 'sq-15',
    difficulty: 1,
    title: 'Legkevesebb diák által választott sport a 6.A-ban',
    text: 'A kettős oszlopdiagram szerint melyik sportágat választotta a legkevesebb 6.A osztályos diák?',
    figure: <QuizSummaryDoubleColumnSvg />,
    figureCaption: 'Sportágak oszlopdiagramja',
    options: [
      'Kosárlabda (5 tanuló)',
      'Úszás (8 tanuló)',
      'Foci (12 tanuló)',
      'Mindhármat ugyanannyian'
    ],
    correctAnswer: 0,
    explanation:
      'A 6.A osztály kék oszlopai közül a Kosárlabda a legalacsonyabb, értéke 5 tanuló.'
  },
  {
    id: 'sq-16',
    difficulty: 1,
    title: 'Vonalgrafikon leolvasása: csütörtöki hőmérséklet',
    text: 'A heti hőmérsékleti vonalgrafikon szerint mekkora volt a hőmérséklet csütörtökön?',
    figure: <QuizSummaryTempLineSvg />,
    figureCaption: 'Heti hőmérsékletek vonalgrafikonja',
    options: [
      '22°C (a Csütörtök oszlop fölötti pont magassága)',
      '18°C',
      '24°C',
      '16°C'
    ],
    correctAnswer: 0,
    explanation:
      'A csütörtöki (Cs) naphoz tartozó pont a függőleges tengely 22-es vonalánál helyezkedik el, vagyis 22°C-ot mértek.'
  },
  {
    id: 'sq-17',
    difficulty: 1,
    title: 'Módusz definíciója',
    text: 'Mi a módusz matematikai meghatározása egy statisztikai adathalmazban?',
    options: [
      'A mintában leggyakrabban előforduló érték',
      'A számok számtani közepe',
      'A nagyság szerint rendezett minta pontosan középső eleme',
      'A legnagyobb és legkisebb adat különbsége'
    ],
    correctAnswer: 0,
    explanation:
      'A módusz (jele: Mo) a leggyakoribb adat, a gyakorisági eloszlás "csúcsa".'
  },
  {
    id: 'sq-18',
    difficulty: 1,
    title: 'Terjedelem definíciója és képlete',
    text: 'Hogyan számítjuk ki egy számszerű adatsor terjedelmét (R)?',
    options: [
      'A legnagyobb adatból kivonjuk a legkisebb adatot (R = Max - Min)',
      'Összeadjuk a legnagyobb és legkisebb adatot',
      'Elosztjuk az összeget a darabszámmal',
      'Megkeressük a leggyakoribb számot'
    ],
    correctAnswer: 0,
    explanation:
      'A terjedelem (Range, jele: R) a legnagyobb és legkisebb mért érték különbsége: R = Max - Min.'
  },
  {
    id: 'sq-19',
    difficulty: 1,
    title: 'Mindkét szakkörre járók száma a Venn-diagramon',
    text: 'A Venn-diagramon hány tanuló található a Sport és Zene körök metszetében (közös részében)?',
    figure: <QuizSummaryVennSvg />,
    figureCaption: 'Szakköri Venn-diagram',
    options: [
      '6 tanuló (akik mindkét szakkörre járnak)',
      '12 tanuló',
      '8 tanuló',
      '4 tanuló'
    ],
    correctAnswer: 0,
    explanation:
      'A két kör metszetében a 6-os szám áll. Ők azok a sokoldalú diákok, akik sportolnak ÉS zenélnek is.'
  },
  {
    id: 'sq-20',
    difficulty: 1,
    title: 'Piktogram jellemzője',
    text: 'Mi a piktogram legfőbb sajátossága a statisztikai ábrázolásban?',
    options: [
      'Képecskékkel, szimbólumokkal szemlélteti az adatokat, ahol egy ábra adott darabszámot képvisel',
      'Csak kör alakú lehet',
      'Mindig negatív számokat ábrázol',
      'Nem tartalmazhat jelmagyarázatot'
    ],
    correctAnswer: 0,
    explanation:
      'A piktogram képi diagram: például egy kisautó szimbólum jelenthet 100 eladott gépkocsit. Nagyon látványos és könnyen érthető.'
  },
  {
    id: 'sq-21',
    difficulty: 1,
    title: '10%-os körcikk középponti szöge',
    text: 'Mekkora középponti szög tartozik a kördiagramon a 10%-os arányhoz?',
    figure: <QuizSummaryPieSvg />,
    figureCaption: 'Kördiagram részlete',
    options: [
      '36° (mert 10 × 3,6° = 36°)',
      '10°',
      '45°',
      '18°'
    ],
    correctAnswer: 0,
    explanation:
      'Mivel 1% = 3,6°, így a 10%-hoz: 10 × 3,6° = 36° középponti szög tartozik (ez a 360° tizedrésze).'
  },
  {
    id: 'sq-22',
    difficulty: 1,
    title: '75%-os körcikk középponti szöge',
    text: 'Mekkora középponti szög tartozik a kördiagramon a 75%-os arányhoz (háromnegyed kör)?',
    options: [
      '270° (mert 75 × 3,6° = 270° vagy 3 × 90° = 270°)',
      '180°',
      '300°',
      '240°'
    ],
    correctAnswer: 0,
    explanation:
      '75% a teljes kör háromnegyede: 360° × 0,75 = 270°, vagy 3 × 90° = 270°.'
  },
  {
    id: 'sq-23',
    difficulty: 1,
    title: 'Oszlopdiagram és sávdiagram iránya',
    text: 'Mi a fő vizuális különbség az álló oszlopdiagram és a fekvő sávdiagram között?',
    options: [
      'Az oszlopdiagram függőleges téglalapokból, a sávdiagram vízszintes sávokból áll',
      'Az oszlopdiagram kör alakú, a sávdiagram négyzet',
      'A sávdiagramon nem lehetnek számok',
      'Semmi különbség nincs köztük'
    ],
    correctAnswer: 0,
    explanation:
      'Az oszlopdiagram függőleges oszlopokat használ. A sávdiagram vízszintes sávokkal dolgozik, ami különösen előnyös, ha a kategóriák nevei hosszúak.'
  },
  {
    id: 'sq-24',
    difficulty: 1,
    title: 'Két szám számtani közepe',
    text: 'Mennyi a 14 és a 20 számok számtani közepe (átlaga)?',
    options: [
      '17 (mert (14 + 20) : 2 = 34 : 2 = 17)',
      '16',
      '18',
      '34'
    ],
    correctAnswer: 0,
    explanation:
      'A számtani középhez összeadjuk a számokat, majd elosztjuk a darabszámmal: (14 + 20) : 2 = 34 : 2 = 17.'
  },
  {
    id: 'sq-25',
    difficulty: 1,
    title: 'Medián páratlan elemszám esetén',
    text: 'Hogyan keressük meg a mediánt egy 5 számból álló adatsorban?',
    options: [
      'Növekvő sorrendbe rendezzük a számokat, és kiválasztjuk a pontosan középső (3.) elemet',
      'Kiválasztjuk a legelsőt',
      'Összeadjuk őket és elosztjuk 5-tel',
      'Megkeressük a legnagyobbat'
    ],
    correctAnswer: 0,
    explanation:
      'A mediánhoz először kötelezően nagyság szerint kell rendezni az adatokat. Páratlan elemszámnál a középső szám a medián.'
  },
  {
    id: 'sq-26',
    difficulty: 1,
    title: 'Vonalgrafikon legmelegebb napjai',
    text: 'A heti hőmérsékleti vonalgrafikon szerint mely napokon volt a legmelegebb a héten?',
    figure: <QuizSummaryTempLineSvg />,
    figureCaption: 'Heti hőmérséklet',
    options: [
      'Szombaton és Vasárnap (24°C)',
      'Csütörtökön (22°C)',
      'Hétfőn (16°C)',
      'Kedden és Szerdán'
    ],
    correctAnswer: 0,
    explanation:
      'A grafikon csúcsa a hétvégén található: szombaton és vasárnap is 24°C volt a mért hőmérséklet.'
  },
  {
    id: 'sq-27',
    difficulty: 1,
    title: 'A statisztikai folyamat 1. lépése',
    text: 'A témaköri útiterv szerint mi a statisztikai vizsgálat legelső lépése?',
    figure: <StatOverviewRoadmapSvg />,
    figureCaption: 'Statisztikai folyamat',
    options: [
      'A kutatási kérdés megfogalmazása és az adatgyűjtés (mérés, számlálás)',
      'A kördiagram megrajzolása',
      'Az átlag kiszámítása számológéppel',
      'Következtetések levonása'
    ],
    correctAnswer: 0,
    explanation:
      'A statisztikai folyamat mindig az adatgyűjtéssel indul: mérésekkel, kérdőívekkel, megfigyeléssel.'
  },
  {
    id: 'sq-28',
    difficulty: 1,
    title: 'Gyakorisági táblázat szerepe',
    text: 'Mire szolgál a statisztikában a gyakorisági táblázat?',
    options: [
      'Áttekinthetően megmutatja, hogy az egyes adatok vagy értékek hányszor fordultak elő',
      'Kiszámolja a geometriai kerületet',
      'Kizárólag rajzolásra való',
      'Eltünteti a hibás adatokat'
    ],
    correctAnswer: 0,
    explanation:
      'A gyakorisági táblázat az adatgyűjtés utáni rendszerezés alapja: felsorolja a kategóriákat és melléjük rendeli az előfordulások számát (gyakoriságát).'
  },
  {
    id: 'sq-29',
    difficulty: 1,
    title: 'Gyakoriságok összege',
    text: 'Mivel kell megegyeznie egy statisztikai vizsgálatban a gyakoriságok összegének?',
    options: [
      'A megkérdezettek vagy megmért elemek teljes számával (a mintanagysággal: n)',
      'Mindig 100-zal',
      'Mindig 360-nal',
      'A legnagyobb adat értékével'
    ],
    correctAnswer: 0,
    explanation:
      'A gyakoriságok összege kötelezően kiadja a teljes megfigyelt elemszámot (n), hiszen minden egyes adatot besoroltunk valahová.'
  },
  {
    id: 'sq-30',
    difficulty: 1,
    title: 'Relatív gyakoriságok összege',
    text: 'Mennyi egy felmérés összes kategóriájához tartozó relatív gyakoriságok összege?',
    options: [
      'Pontosan 1 egész (azaz 100%)',
      'Pontosan 360',
      '0',
      'Tetszőleges szám lehet'
    ],
    correctAnswer: 0,
    explanation:
      'Mivel a relatív gyakoriságok a részek arányát fejezik ki az egészhez képest, összegük kötelezően pontosan 1,00, azaz 100%.'
  },

  // =========================================================================
  // 2. SZINT: KÖZEPES (Gyakorló összefoglalás - 30 kérdés, sq-31 - sq-60)
  // =========================================================================
  {
    id: 'sq-31',
    difficulty: 2,
    title: 'Halmazok egyesítésének és metszetének számítása',
    text: 'A Venn-diagram alapján hány diák sportol ÖSSZESEN a 30 fős osztályban (a csak sportolók és a mindkettőre járók együtt)?',
    figure: <QuizSummaryVennSvg />,
    figureCaption: 'Venn-diagram szakkörökről',
    options: [
      '18 tanuló (12 csak sport + 6 mindkettő)',
      '12 tanuló',
      '26 tanuló',
      '20 tanuló'
    ],
    correctAnswer: 0,
    explanation:
      'A Sport teljes halmaza a "csak sport" (12 fő) és a "metszet" (6 fő) összege: 12 + 6 = 18 tanuló.'
  },
  {
    id: 'sq-32',
    difficulty: 2,
    title: 'Hiányzó körcikk és szög kiszámítása',
    text: 'A kördiagramon Angol (50%), Német (25%) és Francia (15%) mellett mekkora a hiányzó Spanyol szakkör százalékos részesedése és középponti szöge?',
    figure: <QuizSummaryPieSvg />,
    figureCaption: 'Nyelvi kördiagram hiányzó szelettel',
    options: [
      '10% és 36° (mert 100 - 90 = 10%, 10 × 3,6° = 36°)',
      '15% és 54°',
      '5% és 18°',
      '20% és 72°'
    ],
    correctAnswer: 0,
    explanation:
      'A teljes kör kötelezően 100%: 100% - (50% + 25% + 15%) = 100% - 90% = 10%. A középponti szög: 10 × 3,6° = 36°.'
  },
  {
    id: 'sq-33',
    difficulty: 2,
    title: 'Heti átlaghőmérséklet pontos kiszámítása',
    text: 'A vonalgrafikon adatai (16, 18, 18, 22, 18, 24, 24 °C) alapján mennyi a heti pontos átlaghőmérséklet?',
    figure: <QuizSummaryTempLineSvg />,
    figureCaption: 'Heti hőmérséklet-grafikon',
    options: [
      '20,0°C (Összeg: 140°C, 140 : 7 = 20,0)',
      '18,5°C',
      '21,0°C',
      '19,5°C'
    ],
    correctAnswer: 0,
    explanation:
      'A 7 nap hőmérsékleteinek összege: 16 + 18 + 18 + 22 + 18 + 24 + 24 = 140°C. Átlag: 140 : 7 = 20,0°C.'
  },
  {
    id: 'sq-34',
    difficulty: 2,
    title: 'Különbség számítása kettős oszlopdiagramról',
    text: 'A diagram szerint mennyivel több diák választotta a focit a 6.A osztályban, mint a 6.B osztályban?',
    figure: <QuizSummaryDoubleColumnSvg />,
    figureCaption: 'Kettős oszlopdiagram',
    options: [
      '3 diákkal több (12 - 9 = 3)',
      '5 diákkal több',
      '2 diákkal több',
      '1 diákkal több'
    ],
    correctAnswer: 0,
    explanation:
      '6.A focisták száma: 12 fő. 6.B focisták száma: 9 fő. Különbség: 12 - 9 = 3 diák.'
  },
  {
    id: 'sq-35',
    difficulty: 2,
    title: 'Medián megállapítása páratlan adatsorból',
    text: 'Mennyi a heti 7 hőmérséklet mediánja (Me)?',
    figure: <QuizSummaryTempLineSvg />,
    figureCaption: 'Heti hőmérsékletek vonalgrafikonja',
    options: [
      '18°C (a növekvő sorrendbe állított 7 adat középső, 4. eleme)',
      '20°C (az átlag)',
      '22°C',
      '19°C'
    ],
    correctAnswer: 0,
    explanation:
      'Az adatok növekvő sorrendbe rendezve: 16, 18, 18, [18], 22, 24, 24. A középső (4.) elem a 18°C, így a medián 18°C.'
  },
  {
    id: 'sq-36',
    difficulty: 2,
    title: 'Relatív gyakoriság és százalék Venn-diagramból',
    text: 'A 30 fős osztályban a tanulók mekkora relatív gyakorisága jár mindkét (Sport ÉS Zene) szakkörre?',
    figure: <QuizSummaryVennSvg />,
    figureCaption: 'Venn-diagram 30 fős osztályról',
    options: [
      '20% (6 / 30 = 1/5 = 0,20)',
      '6%',
      '30%',
      '12%'
    ],
    correctAnswer: 0,
    explanation:
      'Mindkét szakkörre 6 diák jár a 30-ból. Relatív gyakoriság: 6 / 30 = 1/5 = 0,20 = 20%.'
  },
  {
    id: 'sq-37',
    difficulty: 2,
    title: 'Összesített gyakoriság számítása',
    text: 'A diagram alapján hány diák jár úszni a két osztályban (6.A és 6.B) ÖSSZESEN?',
    figure: <QuizSummaryDoubleColumnSvg />,
    figureCaption: '6.A és 6.B sportok',
    options: [
      '19 diák (6.A: 8 fő + 6.B: 11 fő)',
      '21 diák',
      '17 diák',
      '15 diák'
    ],
    correctAnswer: 0,
    explanation:
      'Az Úszás oszlopok: 6.A: 8 tanuló, 6.B: 11 tanuló. Összesen: 8 + 11 = 19 tanuló.'
  },
  {
    id: 'sq-38',
    difficulty: 2,
    title: 'Darabszám visszaszámítása kördiagram százalékából',
    text: 'Ha az iskolában összesen 40 diák tanul nyelveket, hányan tanulnak németül a 25%-os arány alapján?',
    figure: <QuizSummaryPieSvg />,
    figureCaption: 'Nyelvi kördiagram',
    options: [
      '10 tanuló (40 × 0,25 = 10)',
      '25 tanuló',
      '15 tanuló',
      '8 tanuló'
    ],
    correctAnswer: 0,
    explanation:
      '40 tanuló 25%-a (negyede): 40 : 4 = 10 tanuló.'
  },
  {
    id: 'sq-39',
    difficulty: 2,
    title: 'Valós százalékos változás számítása',
    text: 'A cég forgalma 100 millió Ft-ról 104 millió Ft-ra nőtt. Hány százalékos volt a tényleges növekedés a valóságban?',
    figure: <QuizSummaryMisleadingSvg />,
    figureCaption: 'Diagramok és valós adatok',
    options: [
      'Pontosan 4%-os növekedés (4 millió a 100 millióhoz képest)',
      '300%-os növekedés (ahogy az A diagram mutatja)',
      '40%-os növekedés',
      '104%-os növekedés'
    ],
    correctAnswer: 0,
    explanation:
      'A növekmény 104 - 100 = 4 millió Ft. A bázishoz (100 millióhoz) viszonyítva ez pontosan 4 / 100 = 4% növekedés, amit a "B" diagram mutat helyesen.'
  },
  {
    id: 'sq-40',
    difficulty: 2,
    title: 'Diagramtípus alkalmazása valós jelenségre',
    text: 'A döntési mátrix alapján melyik diagramtípus a legmegfelelőbb, ha a Balaton vízhőmérsékletének óránkénti alakulását szeretnénk ábrázolni egy júliusi napon?',
    figure: <ChartComparisonMatrixSvg />,
    figureCaption: 'Diagramválasztási szabályok',
    options: [
      'Vonalgrafikon (mert az időbeli folytonos folyamatot a vonal köti össze a legjobban)',
      'Kördiagram',
      'Halmazábra',
      'Sávdiagram'
    ],
    correctAnswer: 0,
    explanation:
      'Az idő múlása folytonos folyamat, az óránként mért értékek közötti tendenciát (melegedés, lehűlés) a vonalgrafikon mutatja a legszemléletesebben.'
  },
  {
    id: 'sq-41',
    difficulty: 2,
    title: 'Medián páros elemszám esetén',
    text: 'Mennyi a 2, 3, 3, 4, 5, 5 érdemjegyek mediánja (6 adat)?',
    options: [
      '3,5 (a két középső, 3 és 4 átlaga: (3 + 4) : 2 = 3,5)',
      '3 (a leggyakoribb)',
      '4',
      '3,67 (az átlag)'
    ],
    correctAnswer: 0,
    explanation:
      'Páros darabszám esetén a rendezett adatsor két középső elemének számtani közepét vesszük: 2, 3, [3, 4], 5, 5 -> (3 + 4) : 2 = 3,5.'
  },
  {
    id: 'sq-42',
    difficulty: 2,
    title: '15%-os körcikk középponti szöge',
    text: 'A kördiagramon a Francia szakkör 15%-os részesedésű. Hány fokos középponti szög tartozik hozzá?',
    figure: <QuizSummaryPieSvg />,
    figureCaption: 'Francia körcikk',
    options: [
      '54° (mert 15 × 3,6° = 54°)',
      '15°',
      '30°',
      '45°'
    ],
    correctAnswer: 0,
    explanation:
      'Számítás: 15 × 3,6° = 54°, vagy a 360° 15%-a: 360 × 0,15 = 54°.'
  },
  {
    id: 'sq-43',
    difficulty: 2,
    title: '40%-os körcikk középponti szöge',
    text: 'Egy iskolai közvélemény-kutatáson a diákok 40%-a a pizzát választotta. Hány fokos szöget kell szerkeszteni a kördiagramon?',
    options: [
      '144° (mert 40 × 3,6° = 144°)',
      '40°',
      '120°',
      '180°'
    ],
    correctAnswer: 0,
    explanation:
      'Középponti szög: 40 × 3,6° = 144° (vagy 360° × 0,40 = 144°).'
  },
  {
    id: 'sq-44',
    difficulty: 2,
    title: 'Szögből százalék visszaszámolása',
    text: 'Ha egy körcikk középponti szöge 72°, hány százaléka ez a teljes körnek?',
    options: [
      '20% (mert 72° : 3,6° = 20%)',
      '7,2%',
      '25%',
      '15%'
    ],
    correctAnswer: 0,
    explanation:
      'Visszaszámolás: 72° : 3,6° = 20%, vagy (72° / 360°) × 100% = 1/5 × 100% = 20%.'
  },
  {
    id: 'sq-45',
    difficulty: 2,
    title: 'Derékszög fele százalékban',
    text: 'Ha egy körcikk középponti szöge 45° (a derékszög fele), a teljes kör hány százalékát teszi ki?',
    options: [
      '12,5% (mert 45° : 3,6° = 12,5% vagy 25% fele)',
      '45%',
      '10%',
      '15%'
    ],
    correctAnswer: 0,
    explanation:
      'A 90° fele 45°. Mivel 90° = 25%, így 45° = 12,5% (a teljes kör egy nyolcad része).'
  },
  {
    id: 'sq-46',
    difficulty: 2,
    title: 'Zene szakkörösök teljes száma Venn-diagramról',
    text: 'Hány diák jár összesen zene szakkörre a 30 fős osztályban?',
    figure: <QuizSummaryVennSvg />,
    figureCaption: 'Szakköri Venn-diagram',
    options: [
      '14 tanuló (8 csak zene + 6 mindkettő)',
      '8 tanuló',
      '18 tanuló',
      '6 tanuló'
    ],
    correctAnswer: 0,
    explanation:
      'A teljes Zene kör a zene-only (8 fő) és a metszet (6 fő) összege: 8 + 6 = 14 tanuló.'
  },
  {
    id: 'sq-47',
    difficulty: 2,
    title: 'Legalább az egyik szakkörre járók száma',
    text: 'A Venn-diagram szerint hány diák jár LEGALÁBB AZ EGYIK szakkörre (Sportra vagy Zenére)?',
    figure: <QuizSummaryVennSvg />,
    figureCaption: 'Venn-diagram unió',
    options: [
      '26 tanuló (12 + 6 + 8 = 26)',
      '30 tanuló',
      '14 tanuló',
      '18 tanuló'
    ],
    correctAnswer: 0,
    explanation:
      'A két halmaz uniója (egyesítése): 12 (csak sport) + 6 (mindkettő) + 8 (csak zene) = 26 tanuló (vagy a teljes 30-ból kivonva a 4 kívülállót: 30 - 4 = 26).'
  },
  {
    id: 'sq-48',
    difficulty: 2,
    title: 'Kosarasok aránya a 6.A osztályban',
    text: 'A 25 fős 6.A osztályból 5-en kosaraznak. A 6.A hány százaléka kosarazik?',
    figure: <QuizSummaryDoubleColumnSvg />,
    figureCaption: 'Sportágak oszlopdiagramja',
    options: [
      '20% (5 / 25 = 1/5 = 0,20)',
      '5%',
      '25%',
      '15%'
    ],
    correctAnswer: 0,
    explanation:
      'Arány: 5 / 25 = 1/5 = 0,20 = 20%.'
  },
  {
    id: 'sq-49',
    difficulty: 2,
    title: 'Hiányzó dolgozat kiszámítása átlagból',
    text: 'Péter 4 dolgozatának átlaga 4,0. Az első 3 jegye: 3, 4, 5. Hányast kapott a 4. dolgozatra?',
    options: [
      '4-est (mert 4 × 4 = 16, és 16 - (3 + 4 + 5) = 16 - 12 = 4)',
      '5-öst',
      '3-ast',
      '2-est'
    ],
    correctAnswer: 0,
    explanation:
      'Ha az átlag 4,0 négy jegyből, a jegyek összege: 4 × 4 = 16. Az eddigi három jegy összege: 3 + 4 + 5 = 12. A hiányzó negyedik jegy: 16 - 12 = 4.'
  },
  {
    id: 'sq-50',
    difficulty: 2,
    title: 'Több móduszú vagy módusz nélküli adatsor',
    text: 'Mennyi a módusza a következő adatsornak: 3, 7, 11, 15, 19?',
    options: [
      'Nincs módusza (mivel minden szám pontosan egyszer fordul elő)',
      '11 (a középső)',
      '19 (a legnagyobb)',
      '3 (a legkisebb)'
    ],
    correctAnswer: 0,
    explanation:
      'Ha egy adathalmazban minden érték azonos gyakorisággal fordul elő (itt mindenki egyszer), akkor az adatsornak nincs módusza.'
  },
  {
    id: 'sq-51',
    difficulty: 2,
    title: 'Hőmérséklet-ugrás leolvasása vonalgrafikonról',
    text: 'A vonalgrafikon alapján melyik két egymást követő nap között volt a legnagyobb felmelegedés?',
    figure: <QuizSummaryTempLineSvg />,
    figureCaption: 'Heti hőmérséklet',
    options: [
      'Péntek és Szombat között (+6°C: 18°C-ról 24°C-ra)',
      'Hétfő és Kedd között (+2°C)',
      'Szerda és Csütörtök között (+4°C)',
      'Szombat és Vasárnap között (0°C)'
    ],
    correctAnswer: 0,
    explanation:
      'Pénteken 18°C, szombaton 24°C volt: 24 - 18 = +6°C melegedés. Ez a legmeredekebb felfelé ívelő szakasz a grafikonon.'
  },
  {
    id: 'sq-52',
    difficulty: 2,
    title: '60 diák esetén a Francia szakkör létszáma',
    text: 'Ha az iskolában 60 diák tanul nyelveket, hányan tanulnak franciául a 15%-os szelet alapján?',
    figure: <QuizSummaryPieSvg />,
    figureCaption: 'Nyelvi kördiagram',
    options: [
      '9 tanuló (mert 60 × 0,15 = 9)',
      '15 tanuló',
      '6 tanuló',
      '12 tanuló'
    ],
    correctAnswer: 0,
    explanation:
      'Számítás: 60 × 0,15 = 9 tanuló (vagy 60 10%-a 6, 5%-a 3, együtt 6 + 3 = 9).'
  },
  {
    id: 'sq-53',
    difficulty: 2,
    title: '60 diák esetén az Angol szakkör létszáma',
    text: 'Ha 60 diák tanul nyelvet, hányan járnak angolra a kördiagram 50%-os fele alapján?',
    figure: <QuizSummaryPieSvg />,
    figureCaption: 'Angol szakkör körcikke',
    options: [
      '30 tanuló (60 : 2 = 30)',
      '50 tanuló',
      '25 tanuló',
      '36 tanuló'
    ],
    correctAnswer: 0,
    explanation:
      'Az 50% a csoport fele: 60 : 2 = 30 tanuló.'
  },
  {
    id: 'sq-54',
    difficulty: 2,
    title: 'Terjedelem új szélsőérték esetén',
    text: 'Ha a heti hőmérsékletek (16-tól 24-ig) közé bekerül egy 12°C-os fagyos éjszakai mérés is, mennyi lesz az új terjedelem?',
    options: [
      '12°C (mert Max - Min = 24 - 12 = 12°C)',
      '8°C',
      '24°C',
      '14°C'
    ],
    correctAnswer: 0,
    explanation:
      'Az új minimum 12°C lesz, a maximum marad 24°C: R = 24 - 12 = 12°C.'
  },
  {
    id: 'sq-55',
    difficulty: 2,
    title: 'Csak zenélők relatív gyakorisága',
    text: 'A 30 fős osztályban mekkora a KIZÁRÓLAG zene szakkörre járók (8 fő) relatív gyakorisága egyszerűsített törtben?',
    figure: <QuizSummaryVennSvg />,
    figureCaption: 'Venn-diagram 30 fő',
    options: [
      '4 / 15 (mert 8 / 30 = (8:2) / (30:2) = 4 / 15)',
      '8 / 30',
      '1 / 3',
      '2 / 5'
    ],
    correctAnswer: 0,
    explanation:
      'Relatív gyakoriság: 8 / 30. Egyszerűsítve 2-vel: 4 / 15.'
  },
  {
    id: 'sq-56',
    difficulty: 2,
    title: 'Kördiagram használhatóságának határa',
    text: 'Miért NEM ajánlott kördiagramot használni, ha 25 különböző kategóriát szeretnénk ábrázolni?',
    options: [
      'Mert a kör hajszálvékony, áttekinthetetlen szeletekre esne szét, a feliratok nem férnének el',
      'Mert a kördiagram csak 3 színű lehet',
      'Mert a kör szöge nem osztható 25-tel',
      'Mert a kördiagram csak 100-ig tud számolni'
    ],
    correctAnswer: 0,
    explanation:
      'A döntési mátrix szerint a kördiagram legfeljebb 5-7 kategóriára ideális. 25 kategória esetén fekvő sávdiagramot kell választani.'
  },
  {
    id: 'sq-57',
    difficulty: 2,
    title: 'Negatív értékek és kördiagram',
    text: 'Miért nem alkalmas a kördiagram negatív hőmérsékletek (pl. -5°C, -2°C) megoszlásának ábrázolására?',
    options: [
      'Mert a kördiagram terület- és szögmértéke nem lehet negatív; csak pozitív részek arányát tudja kifejezni',
      'Mert a negatív számokhoz nincs körző',
      'Mert negatív számokból nem lehet átlagot számolni',
      'Nincs ilyen korlát, lehet negatív is'
    ],
    correctAnswer: 0,
    explanation:
      'A kördiagram középponti szögei és körcikk-területei csak pozitív mennyiségek lehetnek. Negatív értékeknél oszlopdiagramot kell használni a 0 vonal alá menő oszlopokkal.'
  },
  {
    id: 'sq-58',
    difficulty: 2,
    title: 'Gyakorisági táblázatból számtani közép',
    text: 'Egy családban a gyerekek életkora: 2 éves (1 fő), 4 éves (2 fő), 10 éves (1 fő). Mennyi az átlagéletkor?',
    options: [
      '5,0 év (Összeg: 2 + 4 + 4 + 10 = 20; 20 : 4 = 5)',
      '4,0 év',
      '6,0 év',
      '5,5 év'
    ],
    correctAnswer: 0,
    explanation:
      'A 4 évesből 2 van, így az életkorok összege: 2 + 4 + 4 + 10 = 20 év. Gyerekek száma: 4 fő. Átlag: 20 : 4 = 5,0 év.'
  },
  {
    id: 'sq-59',
    difficulty: 2,
    title: 'Hány fokos szög felel meg 30%-nak?',
    text: 'Mekkora középponti szög tartozik a kördiagramon a 30%-os arányhoz?',
    options: [
      '108° (mert 30 × 3,6° = 108°)',
      '30°',
      '90°',
      '120°'
    ],
    correctAnswer: 0,
    explanation:
      'Számítás: 30 × 3,6° = 108° (vagy 360° 30%-a: 360 × 0,3 = 108°).'
  },
  {
    id: 'sq-60',
    difficulty: 2,
    title: 'Diagramtípus kiválasztása: könyvtári könyvek',
    text: 'Egy iskolai könyvtárban 5 fő kategória (regény, verseskötet, lexikon, képregény, mese) darabszámának arányát akarjuk bemutatni a teljes állományhoz képest. Melyik a legalkalmasabb?',
    options: [
      'Kördiagram (mert 5 kategória részesedését mutatja egy teljes egészhez viszonyítva)',
      'Vonalgrafikon',
      'Halmazábra',
      'Piktorgram'
    ],
    correctAnswer: 0,
    explanation:
      'Kevés (5) kategória és egy teljes egész részekre bontása esetén a kördiagram a leghatékonyabb vizuális eszköz.'
  },

  // =========================================================================
  // 3. SZINT: NEHÉZ (Bajnok vizsgafelkészítő - 30 kérdés, sq-61 - sq-90)
  // =========================================================================
  {
    id: 'sq-61',
    difficulty: 3,
    title: 'Teljes osztálylétszámok rekonstruálása oszlopdiagramról',
    text: 'A sportdiagram alapján hány tanuló jár a 6.A és hányan a 6.B osztályba összesen?',
    figure: <QuizSummaryDoubleColumnSvg />,
    figureCaption: 'Kettős oszlopdiagram adatai',
    options: [
      '6.A: 25 tanuló (12+8+5); 6.B: 27 tanuló (9+11+7)',
      '6.A: 20 tanuló; 6.B: 24 tanuló',
      'Mindkét osztály 30 fős',
      '6.A: 27 tanuló; 6.B: 25 tanuló'
    ],
    correctAnswer: 0,
    explanation:
      '6.A oszlopok összege: 12 + 8 + 5 = 25 tanuló. 6.B oszlopok összege: 9 + 11 + 7 = 27 tanuló.'
  },
  {
    id: 'sq-62',
    difficulty: 3,
    title: 'Adat elhagyásának hatása az átlagra és mediánra',
    text: 'Ha a heti hőmérsékletből a vasárnapi 24°C-os mérést elhagyjuk (így 6 nap marad: 16, 18, 18, 22, 18, 24), mennyi lesz az új heti átlag és medián?',
    figure: <QuizSummaryTempLineSvg />,
    figureCaption: 'Heti hőmérsékletek és adatváltozás',
    options: [
      'Új összeg: 116°C, új átlag: kb. 19,33°C; a medián változatlanul 18°C marad',
      'Új átlag 18°C, új medián 20°C',
      'Mindkettő 20°C marad',
      'Új átlag 21°C'
    ],
    correctAnswer: 0,
    explanation:
      'Új összeg: 140 - 24 = 116°C. Új átlag: 116 : 6 = 19,333... ≈ 19,33°C. Rendezve 6 adat: 16, 18, 18, 18, 22, 24. A két középső a 18 és 18, így a medián (18+18)/2 = 18°C.'
  },
  {
    id: 'sq-63',
    difficulty: 3,
    title: 'Valószínűség számítása Venn-diagramról',
    text: 'Ha a 30 fős osztályból véletlenszerűen kisorsolunk egy tanulót, mekkora az esélye (relatív gyakorisága), hogy olyan diákot húzunk, aki SEMMILYEN szakkörre nem jár?',
    figure: <QuizSummaryVennSvg />,
    figureCaption: 'Szakköri Venn-diagram',
    options: [
      '4 / 30 = 2 / 15 (kb. 13,3%)',
      '1 / 5 (20%)',
      '4 / 26',
      '1 / 30'
    ],
    correctAnswer: 0,
    explanation:
      'Semmilyen szakkörre 4 diák nem jár a teljes 30 fős osztályból. A valószínűség: 4 / 30 = 2 / 15 rész (kb. 13,3%).'
  },
  {
    id: 'sq-64',
    difficulty: 3,
    title: 'Alaphalmaz visszaszámítása százalékból',
    text: 'A kördiagramon a Spanyol szakkörre 6 diák jár, ami a teljes csoport 10%-át teszi ki. Hány diák jár a 4 nyelvi szakkörre összesen?',
    figure: <QuizSummaryPieSvg />,
    figureCaption: 'Kördiagram visszaszámolás',
    options: [
      '60 tanuló (mert 6 : 0,10 = 60)',
      '40 tanuló',
      '36 tanuló',
      '100 tanuló'
    ],
    correctAnswer: 0,
    explanation:
      'Ha 10% = 6 tanuló, akkor a 100% (a teljes egész) a 6 tízszerese: 6 × 10 = 60 tanuló.'
  },
  {
    id: 'sq-65',
    difficulty: 3,
    title: 'A statisztikai folyamat helyes sorrendje',
    text: 'A témaköri útiterv szerint miért nem határozható meg a számtani közép vagy a medián az adatgyűjtés és csoportosítás előtt?',
    figure: <StatOverviewRoadmapSvg />,
    figureCaption: 'Statisztikai útiterv',
    options: [
      'Mert a statisztikai mutatók kizárólag a már összegyűjtött, konkrét mérési adatokból számíthatók ki',
      'Mert a medián csak páros számokra létezik',
      'Mert a kördiagramot kell előbb megszerkeszteni',
      'Nincs ilyen szabály'
    ],
    correctAnswer: 0,
    explanation:
      'A statisztikai mutatók a meglévő minta tulajdonságait összegzik: adatok hiányában nem létezik sem átlag, sem medián, sem szóródás.'
  },
  {
    id: 'sq-66',
    difficulty: 3,
    title: 'Összetett relatív gyakoriság két osztályból',
    text: 'A két osztály összes sportolója (25 + 27 = 52 tanuló) közül mekkora a kosárlabdát választók relatív gyakorisága egyszerűsített törtben?',
    figure: <QuizSummaryDoubleColumnSvg />,
    figureCaption: 'Összesített sport adatok',
    options: [
      '3 / 13 (mert 12 kosaras van az 52 diákból, 12/52 = 3/13)',
      '12 / 50',
      '1 / 4',
      '5 / 26'
    ],
    correctAnswer: 0,
    explanation:
      'Összes kosaras: 6.A: 5 fő + 6.B: 7 fő = 12 diák. Összes tanuló: 52 fő. Relatív gyakoriság: 12 / 52 = (12:4) / (52:4) = 3 / 13.'
  },
  {
    id: 'sq-67',
    difficulty: 3,
    title: 'Előjeles eltérések összege a heti adatoknál',
    text: 'A heti hőmérsékletek átlaga 20°C. Mennyi az adatok (16, 18, 18, 22, 18, 24, 24) átlagtól mért előjeles eltéréseinek összege?',
    figure: <QuizSummaryTempLineSvg />,
    figureCaption: 'Átlagtól vett eltérések',
    options: [
      'Pontosan 0 (mert (-4) + (-2) + (-2) + (+2) + (-2) + (+4) + (+4) = 0)',
      '+2',
      '-2',
      '140'
    ],
    correctAnswer: 0,
    explanation:
      'A számtani közép matematikai alaptulajdonsága, hogy a tőle vett előjeles távolságok összege BÁRMELY valós adatsorban kötelezően pontosan 0!'
  },
  {
    id: 'sq-68',
    difficulty: 3,
    title: 'Manipulált oszlopdiagram leleplezése',
    text: 'Hogyan ellenőrizhetjük a leggyorsabban, hogy egy újságban látott oszlopdiagram torzít-e?',
    figure: <QuizSummaryMisleadingSvg />,
    figureCaption: 'Csalóka diagramok vizsgálata',
    options: [
      'Megnézzük, hogy a függőleges tengely 0-ról indul-e, és hogy a skálabeosztás egyenletes-e',
      'Kiszámoljuk az oszlopok színének kódját',
      'Megnézzük, hány oszlop van',
      'Nem lehet ellenőrizni'
    ],
    correctAnswer: 0,
    explanation:
      'A leggyakoribb manipuláció a csonkított tengely: ha az y tengely nem 0-ról indul, a különbségek sokszorosukra nagyítódnak. Ezért az origó és a skálázás ellenőrzése az első lépés.'
  },
  {
    id: 'sq-69',
    difficulty: 3,
    title: 'Körcikk szögének felezése',
    text: 'A Francia szakkörhöz eredetileg 54°-os körcikk (15%) tartozik. Ha ezt a szakkört felére csökkentik (középponti szög: 27°), hány százalékos lesz az új részesedése?',
    figure: <QuizSummaryPieSvg />,
    figureCaption: 'Kördiagram szögfelezés',
    options: [
      '7,5% (mert 27 : 3,6 = 7,5 vagy 15% : 2 = 7,5%)',
      '5%',
      '10%',
      '13,5%'
    ],
    correctAnswer: 0,
    explanation:
      'A körcikk szöge egyenesen arányos a százalékkal: ha a szög felére csökken (54° → 27°), a százalékos részesedés is pontosan a felére csökken: 15% : 2 = 7,5%.'
  },
  {
    id: 'sq-70',
    difficulty: 3,
    title: 'Helytelen vonalgrafikon használatának felismerése',
    text: 'Egy diák vonalakkal kötötte össze a kedvenc háziállatok (kutya, macska, papagáj) darabszámait. Miért minősül ez súlyos módszertani hibának a döntési mátrix szerint?',
    figure: <ChartComparisonMatrixSvg />,
    figureCaption: 'Módszertani szabályok a döntési mátrixban',
    options: [
      'Mert a háziállatok különálló kategóriák, nem pedig folytonos időbeli folyamat; az összekötő vonalnak nincs valós matematikai jelentése',
      'Mert a vonalgrafikon csak negatív számokra jó',
      'Mert papagájt nem szabad diagramra rajzolni',
      'Mert csak kördiagramot lett volna szabad használni'
    ],
    correctAnswer: 0,
    explanation:
      'A vonalgrafikon folytonos átmenetet sugall két mérési pont között (mint pl. idő és hőmérséklet). A kutya és macska között azonban nincs "átmenet", ezek különálló minőségi kategóriák, így kizárólag oszlop- vagy sávdiagramot szabad használni!'
  },
  {
    id: 'sq-71',
    difficulty: 3,
    title: 'Kiugró érték (outlier) hatása az átlagra vs mediánra',
    text: 'Egy 60 méteres futóversenyen 4 diák ideje: 9,2 s; 9,4 s; 9,5 s; 9,8 s. Az ötödik elesett és 24,0 s alatt ért célba. Hogyan változik az átlag és a medián a kiugró adat miatt?',
    options: [
      'Az átlag drasztikusan leromlik (12,38 s lesz), míg a medián alig mozdul (9,5 s marad)',
      'Mindkettő 24,0 s közelébe ugrik',
      'Az átlag változatlan marad, de a medián megduplázódik',
      'Egyik sem változik'
    ],
    correctAnswer: 0,
    explanation:
      'A számtani közép érzékeny a kiugró adatokra (9,2+9,4+9,5+9,8+24)/5 = 12,38 s. A medián viszont a növekvő sorrend középső eleme marad (9,5 s), így robusztus a hibákkal és szélsőértékekkel szemben.'
  },
  {
    id: 'sq-72',
    difficulty: 3,
    title: 'Hiányzó adatok kikövetkeztetése átlagból és terjedelemből',
    text: 'Három dolgozatjegyből a legrosszabb 2-es, a terjedelem R = 3. Ha a három jegy átlaga kereken 4,0, mekkora a harmadik (középső) jegy?',
    options: [
      '5-ös a maximum (2 + 3 = 5), és a középső jegy 5-ös (mert 3 × 4 = 12, és 12 - (2 + 5) = 5)',
      '4-es',
      '3-as',
      '2-es'
    ],
    correctAnswer: 0,
    explanation:
      'A legkisebb jegy 2. Mivel R = 3, a legnagyobb jegy 2 + 3 = 5. A 3 jegy összege: 3 × 4,0 = 12. A hiányzó harmadik jegy: 12 - (2 + 5) = 12 - 7 = 5. Tehát a jegyek: 2, 5, 5.'
  },
  {
    id: 'sq-73',
    difficulty: 3,
    title: '3D perspektivikus torzítás kördiagramnál',
    text: 'Miért tartják félrevezetőnek a megdöntött, 3D hatású kördiagramokat a tudományos statisztikában?',
    options: [
      'Mert az elöl elhelyezkedő szelet a perspektíva miatt optikailag jóval nagyobbnak látszik a hátul lévőknél, még ha százalékosan kisebb is',
      'Mert a számítógép nem tudja kiszámolni a 3D szögeket',
      'Mert 3D-ben nem lehet színeket használni',
      'Mert a 3D kördiagram mindig négyszögletű'
    ],
    correctAnswer: 0,
    explanation:
      'A megdöntött térhatású kördiagramon az ellipszis elülső íve sokkal hosszabbnak tűnik a szemlélő számára, mint a hátsó ívek, ami optikai csalást idéz elő. Ezért a tudományban mindig sík (2D) ábrát alkalmaznak.'
  },
  {
    id: 'sq-74',
    difficulty: 3,
    title: 'Piktogram kétdimenziós méretnövelésének csalása',
    text: 'Egy újságban az autóeladás megduplázódását úgy ábrázolták, hogy a második autóikon magasságát ÉS szélességét is a kétszeresére növelték. Mi a probléma ezzel?',
    options: [
      'A területe négyszeresére nőtt (2 × 2 = 4), így az olvasó négyszeres növekedést lát a valós kétszeres helyett',
      'Semmi, ez a helyes ábrázolás',
      'Csak a színét szabadott volna megváltoztatni',
      'Nem szabad autót rajzolni a diagramra'
    ],
    correctAnswer: 0,
    explanation:
      'Ha egy síkidom minden méretét kétszeresére növeljük, a területe a duplázás négyzetével (4-szeresére) nő! Az emberi szem a területet érzékeli, így négyszeres növekedést látunk a kétszeres helyett.'
  },
  {
    id: 'sq-75',
    difficulty: 3,
    title: 'Logikai szita-formula a Venn-diagramon',
    text: 'A Venn-diagramon a sportolók száma 18, a zenélőké 14, a mindkettőt űzőké 6. Hogyan ellenőrizhetjük a legalább egy szakkörre járók (26 fő) számát a szita-formulával?',
    figure: <QuizSummaryVennSvg />,
    figureCaption: 'Szita-formula ellenőrzés',
    options: [
      '|A ∪ B| = |A| + |B| - |A ∩ B| = 18 + 14 - 6 = 26 fő',
      '18 + 14 + 6 = 38 fő',
      '18 × 14 : 6 = 42 fő',
      '18 - 14 + 6 = 10 fő'
    ],
    correctAnswer: 0,
    explanation:
      'Ha összeadjuk a sportolókat (18) és a zenélőket (14), a metszetet (6) kétszer számoltuk meg! Ezért le kell vonni egyszer: 18 + 14 - 6 = 26 fő.'
  },
  {
    id: 'sq-76',
    difficulty: 3,
    title: 'Medián robusztusságának gyakorlati haszna',
    text: 'Miért használják a statisztikusok a mediánbért a számtani átlagbér helyett egy ország jövedelmi viszonyainak reális bemutatására?',
    options: [
      'Mert néhány milliárdos extrém magas fizetése nem húzza fel a mediánt, így az a valódi középréteg jövedelmét mutatja',
      'Mert a medián mindig pontosan 500 000 Ft',
      'Mert az átlagbért nehéz kiszámolni',
      'Mert a medián csak egész számokra alkalmazható'
    ],
    correctAnswer: 0,
    explanation:
      'Néhány kiugróan gazdag ember fizetése a számtani közepet mesterségesen magasra húzza. A medián ezzel szemben az a kereset, aminél az emberek fele kevesebbet, fele többet keres.'
  },
  {
    id: 'sq-77',
    difficulty: 3,
    title: 'Kördiagram szögének arányossági törvénye',
    text: 'Ha egy kördiagramon egy adott kategória százaléka a 3-szorosára nő (pl. 5%-ról 15%-ra), hogyan változik a hozzá tartozó körcikk középponti szöge?',
    options: [
      'Pontosan a 3-szorosára nő (18°-ról 54°-ra, egyenes arányosság)',
      'A harmadára csökken',
      '90°-kal nő',
      'Nem változik, mert a teljes kör 360° marad'
    ],
    correctAnswer: 0,
    explanation:
      'A középponti szög egyenesen arányos a százalékkal (α = p × 3,6°). Ha a százalék háromszorozódik, a szög is kötelezően a 3-szorosára nő.'
  },
  {
    id: 'sq-78',
    difficulty: 3,
    title: 'Súlyozott átlag alapjai dolgozatoknál',
    text: 'Anna kapott egy 5-öst egy 1-szeres súlyú feleletre, és egy 2-est egy 2-szeres súlyú témazáróra. Mennyi a súlyozott átlaga?',
    options: [
      '3,00 (mert (1 × 5 + 2 × 2) : 3 = (5 + 4) : 3 = 9 : 3 = 3,00)',
      '3,50 (a sima átlag)',
      '2,00',
      '4,00'
    ],
    correctAnswer: 0,
    explanation:
      'A témazáró kétszeres súlya azt jelenti, mintha két 2-est kapott volna: (5 + 2 + 2) : 3 = 9 : 3 = 3,00.'
  },
  {
    id: 'sq-79',
    difficulty: 3,
    title: 'Két különböző létszámú csoport összevont átlaga',
    text: 'A 20 fős 6.A osztály dolgozatátlaga 4,0; míg a 30 fős 6.B osztály dolgozatátlaga 3,0. Mennyi a két osztály összevont átlaga (50 tanuló)?',
    options: [
      '3,40 (mert (20 × 4,0 + 30 × 3,0) : 50 = (80 + 90) : 50 = 170 : 50 = 3,40)',
      '3,50 (a két átlag számtani közepe)',
      '3,00',
      '3,25'
    ],
    correctAnswer: 0,
    explanation:
      'A két átlagot NEM szabad egyszerűen átlagolni, mert a 6.B-ben többen vannak! Összpontszám: 20 × 4 = 80 pont és 30 × 3 = 90 pont, összesen 170 pont. Összevont átlag: 170 : 50 = 3,40.'
  },
  {
    id: 'sq-80',
    difficulty: 3,
    title: 'Medián helye nagy mintánál',
    text: 'Egy felmérésben pontosan 40 diák válaszolt. Növekvő sorrendbe rendezve hányadik elemek átlaga adja a mediánt?',
    options: [
      'A 20. és a 21. elemek számtani közepe',
      'A 20. elem egyedül',
      'A 19. és 20. elemek közepe',
      'A 40. elem fele'
    ],
    correctAnswer: 0,
    explanation:
      '40 páros szám. A sorrendben balról 20, jobbról 20 elem van, a két középső a 20. és a 21. adat. A medián e két elem számtani közepe.'
  },
  {
    id: 'sq-81',
    difficulty: 3,
    title: 'Terjedelem érzékenysége elírási hibára',
    text: 'Egy 10 fős csoport testmagassága 150 cm és 165 cm között van (R = 15 cm). Egy elírás miatt az egyik 160 cm helyett 260 cm kerül a gépbe. Mi történik a terjedelemmel?',
    options: [
      'A terjedelem 15 cm-ről drasztikusan 110 cm-re ugrik (260 - 150 = 110 cm)',
      'A terjedelem változatlan marad',
      'A terjedelem csökken',
      'A terjedelem negatív lesz'
    ],
    correctAnswer: 0,
    explanation:
      'A terjedelem kizárólag a két szélsőértéktől függ. Egyetlen hibás kiugró maximumadat óriásira torzítja a terjedelmet.'
  },
  {
    id: 'sq-82',
    difficulty: 3,
    title: 'Körcikkek kerekítési hibájának korrekciója',
    text: 'Egy diák három körcikket szerkesztett: 120°, 140° és 99°. Miért szól rá azonnal a tanár a szerkesztésre?',
    options: [
      'Mert a szögek összege 120° + 140° + 99° = 359°, de a teljes körnek kötelezően pontosan 360°-nak kell lennie!',
      'Mert 99°-os szöget nem lehet felvenni',
      'Mert mindháromnak párosnak kell lennie',
      'Mert nincs 180°-os egyenesszög'
    ],
    correctAnswer: 0,
    explanation:
      'A kördiagram alapvető geometriai feltétele, hogy a körcikkek szögeinek összege pontosan 360° legyen. 359°-nál egy 1°-os rés tátongana a diagramon.'
  },
  {
    id: 'sq-83',
    difficulty: 3,
    title: 'Feltételes relatív gyakoriság: Sportolók körében',
    text: 'A Venn-diagram szerint a sportoló tanulók (18 fő) mekkora hányada jár zene szakkörre is?',
    figure: <QuizSummaryVennSvg />,
    figureCaption: 'Sportolók részhalmaza',
    options: [
      '1 / 3 (mert a 18 sportolóból 6 jár zenére: 6 / 18 = 1/3)',
      '1 / 5 (6 / 30)',
      '1 / 2',
      '6 / 14'
    ],
    correctAnswer: 0,
    explanation:
      'Figyelem: a kérdés CSAK a sportolókra vonatkozik (18 fő), nem az egész osztályra! Közülük 6-an zenélnek: 6 / 18 = 1 / 3 (kb. 33,3%).'
  },
  {
    id: 'sq-84',
    difficulty: 3,
    title: 'Feltételes relatív gyakoriság: Zenélők körében',
    text: 'A Venn-diagram alapján a zene szakkörösök (14 fő) mekkora hányada sportol is egyben?',
    figure: <QuizSummaryVennSvg />,
    figureCaption: 'Zenélők részhalmaza',
    options: [
      '3 / 7 (mert a 14 zenészből 6 sportol: 6 / 14 = 3/7)',
      '6 / 30 = 1/5',
      '6 / 18 = 1/3',
      '1 / 2'
    ],
    correctAnswer: 0,
    explanation:
      'Az alap most a 14 zenélő tanuló. Közülük 6-an sportolnak: 6 / 14 = 3 / 7 (kb. 42,9%).'
  },
  {
    id: 'sq-85',
    difficulty: 3,
    title: 'Azonos átlag, eltérő szóródás és terjedelem',
    text: 'Két adatsor: "A": 19, 20, 21 és "B": 10, 20, 30. Mindkettő átlaga 20. Melyik mutató mutatja meg a köztük lévő lényegi különbséget?',
    options: [
      'A terjedelem: "A" terjedelme 2, míg "B" terjedelme 20, így "B" sokkal szétszórtabb',
      'A medián, mert az eltérő',
      'Az átlag, mert nem egyforma',
      'A módusz'
    ],
    correctAnswer: 0,
    explanation:
      'Mindkét minta átlaga és mediánja is 20! A terjedelem (R_A = 21 - 19 = 2, míg R_B = 30 - 10 = 20) mutatja meg, hogy a "B" minta adatai sokkal jobban szóródnak az átlag körül.'
  },
  {
    id: 'sq-86',
    difficulty: 3,
    title: 'Bimodális (kétcsúcsú) adathalmaz',
    text: 'Mit jelent az, ha egy statisztikai felmérés adatsorára azt mondjuk, hogy bimodális?',
    options: [
      'Két különböző csúcsértéke (módusza) van, mindkettő ugyanazzal a maximális gyakorisággal',
      'Nincs benne páratlan szám',
      'Két oszlopdiagramot kell rajzolni hozzá',
      'Az átlag pontosan a duplája a mediánnak'
    ],
    correctAnswer: 0,
    explanation:
      'Ha két különböző adat is holtversenyben a leggyakoribb (pl. a 3-as és az 5-ös jegyből is 8-8 darab van), akkor az eloszlás kétcsúcsú, azaz bimodális.'
  },
  {
    id: 'sq-87',
    difficulty: 3,
    title: 'Jelöletlen skálatörés vonalgrafikonon',
    text: 'Egy részvényárfolyam-grafikonon a függőleges tengely 0 és 500 között 1 centiméter, de 500 és 550 között már 5 centiméter skálázású anélkül, hogy skálatörést jeleznének. Miért megtévesztő ez?',
    options: [
      'Mert az 500 feletti apró árfolyamingadozásokat óriási, meredek hegyeknek és völgyeknek láttatja',
      'Mert 500 felett nem lehet részvényt venni',
      'Mert a vonalgrafikonnak mindig kör alakúnak kell lennie',
      'Mert a negatív számokat nem mutatja'
    ],
    correctAnswer: 0,
    explanation:
      'Ha a tengely léptéke nem egyenletes és nincs jelezve a skálatörés, az arányok felborulnak, és a mikroszkopikus változások drámai ugrásoknak tűnnek.'
  },
  {
    id: 'sq-88',
    difficulty: 3,
    title: 'Adateltolás hatása a számtani középre',
    text: 'Egy adatsor számtani közepe x̄ = 18. Ha az adathalmaz MINDEN egyes eleméhez hozzáadunk 5-öt, mennyi lesz az új adatsor számtani közepe?',
    options: [
      '23 (mert az átlag is pontosan 5-tel nő: 18 + 5 = 23)',
      '18 (változatlan marad)',
      '90 (megszorzódik 5-tel)',
      '28'
    ],
    correctAnswer: 0,
    explanation:
      'Ha minden adathoz hozzáadunk egy állandó c értéket, az összeg n × c-vel nő, így az új átlag is pontosan c-vel növekszik: x̄_új = x̄ + c = 18 + 5 = 23.'
  },
  {
    id: 'sq-89',
    difficulty: 3,
    title: 'Adateltolás hatása a terjedelemre',
    text: 'Egy adathalmazban a terjedelem R = 12. Ha MINDEN egyes adathoz hozzáadunk 5-öt, hogyan változik az adatsor terjedelme?',
    options: [
      'Pontosan 12 marad (mert a maximum és a minimum is 5-tel nőtt, a különbségük változatlan marad: (Max+5) - (Min+5) = Max - Min)',
      '17 lesz (5-tel nő)',
      '60 lesz',
      '7 lesz'
    ],
    correctAnswer: 0,
    explanation:
      'A terjedelem a szélsőértékek távolsága. Ha a teljes adathalmazt eltoljuk a számegyenesen, a pontok egymás közötti távolsága nem változik: (Max + 5) - (Min + 5) = Max - Min = 12.'
  },
  {
    id: 'sq-90',
    difficulty: 3,
    title: 'Adatszorzás hatása az átlagra és terjedelemre',
    text: 'Egy adatsor átlaga 10, terjedelme 6. Ha minden egyes adatot megszorzunk 2-vel, mennyi lesz az új átlag és az új terjedelem?',
    options: [
      'Új átlag: 20; új terjedelem: 12 (mindkét mutató pontosan a 2-szeresére duplázódik)',
      'Új átlag: 20; új terjedelem: 6 (a terjedelem nem változik)',
      'Új átlag: 12; új terjedelem: 8',
      'Egyik sem változik'
    ],
    correctAnswer: 0,
    explanation:
      'Ha minden adatot megszorzunk 2-vel, az összeg duplázódik (átlag: 10 × 2 = 20), és a szélsőértékek távolsága is megkétszereződik: 2·Max - 2·Min = 2·(Max - Min) = 2 × 6 = 12.'
  }
];

export const StatisticsSummaryQuiz: React.FC<StatisticsSummaryQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="5. Statisztika Összefoglaló Kvíz & Tesztfelkészítő"
      subtitle="Átfogó témazáró felkészítő: olvasd le a diagramokat, leplezd le a csalásokat és számítsd ki a mutatókat!"
      badge="VI. STATISZTIKA • 5. ALTÉMA"
      topicId="g6-stat-summary-quiz"
      themeColor="slate"
      matcherComponent={StatisticsSummaryMatcher as any}
      sorterComponent={StatisticsSummarySorter as any}
      MatcherComponent={StatisticsSummaryMatcher}
      SorterComponent={StatisticsSummarySorter}
      difficultyLevels={[
        {
          level: 1,
          title: '1. Szint: Alapozó áttekintés (30 kérdés)',
          description: 'Venn-diagramok, oszlop-, vonal- és kördiagramok alapvető leolvasása, mutatók és fogalmak'
        },
        {
          level: 2,
          title: '2. Szint: Gyakorló számítások (30 kérdés)',
          description: 'Hiányzó körcikkek, heti átlag és medián, relatív gyakoriság, szögből százalék és oszlopösszehasonlítás'
        },
        {
          level: 3,
          title: '3. Szint: Bajnok vizsgafelkészítő (30 kérdés)',
          description: 'Kiugró adatok hatása, csalóka diagramok leleplezése, összetett statisztikai összefüggések és szita-formula'
        }
      ]}
      questions={questions}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onOpenMatcher={onOpenMatcher}
      onOpenSorter={onOpenSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default StatisticsSummaryQuiz;
