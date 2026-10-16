import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { ChartsDiagramsMatcher } from './ChartsDiagramsMatcher';
import { ChartsDiagramsSorter } from './ChartsDiagramsSorter';
import {
  QuizSportColumnSvg,
  QuizLibraryBarSvg,
  QuizTempLineSvg,
  QuizGradesDoubleColumnSvg,
  QuizMisleadingSvg,
  QuizRainfallColumnSvg,
  QuizHikeLineSvg
} from './ChartsDiagramsDiagrams';

interface ChartsDiagramsQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cs-column-bar',
    title: '1. Oszlop- és sávdiagram',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Oszlopdiagram:</strong> Függőleges oszlopok, magasságuk arányos a mért értékkel. Kategóriák (pl. sportágak, jegyek) összevetésére.</div>
        <div><strong>Sávdiagram:</strong> Vízszintes sávok, hosszúságuk mutatja az adatot. Hosszabb kategórianeveknél és rangsoroknál praktikus.</div>
        <div className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
          Aranyszabály: Az oszlopok szélessége és a köztük lévő távolság mindig legyen egyforma!
        </div>
      </div>
    )
  },
  {
    id: 'cs-line-charts',
    title: '2. Vonaldiagram és folyamatok',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Cél:</strong> Időbeli folyamatos változások (hőmérséklet, vízállás, megtett út) szemléltetése.</div>
        <div><strong>Emelkedő vonal:</strong> Növekedés • <strong>Vízszintes:</strong> Állandó (stagnálás, pihenő) • <strong>Lejtő:</strong> Csökkenés (hűlés).</div>
        <div><strong>Meredekség:</strong> Minél meredekebb a vonal, annál gyorsabb a változás üteme.</div>
        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
          Szélsőértékek: Legfelső pont a Maximum, legalsó pont a Minimum.
        </div>
      </div>
    )
  },
  {
    id: 'cs-scales-axes',
    title: '3. Tengelyek és a jelmagyarázat',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Vízszintes (X) tengely:</strong> Kategóriák vagy időpontok.</div>
        <div><strong>Függőleges (Y) tengely:</strong> Számszerű értékek mértékegységgel (fő, °C, db, mm, km).</div>
        <div><strong>Jelmagyarázat (Legenda):</strong> Ha több csoportot (pl. 6.A és 6.B) hasonlítunk össze, megmutatja, melyik szín kihez tartozik.</div>
        <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
          A skálabeosztásnak egyenletesnek és 0-ról indulónak kell lennie!
        </div>
      </div>
    )
  },
  {
    id: 'cs-misleading',
    title: '4. Félrevezető diagramok veszélyei',
    content: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
        <div><strong>Csonkolt tengely:</strong> Ha a függőleges tengely nem 0-ról indul, az elenyésző különbségek óriásinak látszanak!</div>
        <div><strong>Hiányzó skála:</strong> Ha nincsenek számok a tengelyen, a diagram semmit sem bizonyít.</div>
        <div><strong>3D döntés:</strong> Az elöl lévő cikkelyeket optikailag felnagyítja.</div>
        <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
          Kritikus ellenőrzés: Mindig nézd meg, 0-ról indul-e a függőleges tengely!
        </div>
      </div>
    )
  }
];

const questions: Question[] = [
  // ==========================================
  // 1. SZINT: KÖZVETLEN DIAGRAMLEOLVASÁS ÉS ALAPOK (1-10)
  // ==========================================
  {
    id: 'cd-q1',
    level: 1,
    question: 'A mellékelt oszlopdiagram alapján hány tanuló választotta a kosárlabdát?',
    figure: <QuizSportColumnSvg />,
    figureCaption: 'Egy 6. osztály kedvenc sportágainak megoszlása',
    options: ['8 tanuló', '12 tanuló', '6 tanuló', '4 tanuló'],
    correctAnswer: '8 tanuló',
    explanation: 'A kosárlabda oszlopának teteje pontosan a függőleges tengely 8-as értékéig ér, így 8 tanuló választotta ezt a sportot.'
  },
  {
    id: 'cd-q2',
    level: 1,
    question: 'A könyvtári sávdiagram szerint melyik műfajból kölcsönözték a legtöbb darabot a diákok?',
    figure: <QuizLibraryBarSvg />,
    figureCaption: 'Könyvtári kölcsönzések műfajonkénti bontásban',
    options: ['Képregény (30 db)', 'Kalandregény (25 db)', 'Sci-fi (15 db)', 'Ismeretterjesztő (10 db)'],
    correctAnswer: 'Képregény (30 db)',
    explanation: 'A leghosszabb sáv a képregényhez tartozik, hossza eléri a 30 darabot a vízszintes skálán.'
  },
  {
    id: 'cd-q3',
    level: 1,
    question: 'A napi hőmérséklet-grafikon alapján hány °C volt a hőmérséklet reggel 06:00 órakor?',
    figure: <QuizTempLineSvg />,
    figureCaption: 'Tavaszi nap hőmérsékletének alakulása (06:00 – 18:00)',
    options: ['4 °C (Min)', '8 °C', '0 °C', '14 °C'],
    correctAnswer: '4 °C (Min)',
    explanation: 'A grafikon legelső, legalsó pontja 06:00-nál található, értéke pontosan 4 °C (ez volt a napi minimum).'
  },
  {
    id: 'cd-q4',
    level: 1,
    question: 'A kettős oszlopdiagram szerint hány tanuló kapott jó (4-es) érdemjegyet a 6.B osztályban (narancssárga oszlop)?',
    figure: <QuizGradesDoubleColumnSvg />,
    figureCaption: '6.A és 6.B matematika dolgozatainak érdemjegyei',
    options: ['12 tanuló', '10 tanuló', '8 tanuló', '5 tanuló'],
    correctAnswer: '12 tanuló',
    explanation: 'A 4-es érdemjegy oszloppárjában a narancssárga oszlop (6.B) teteje a 12-es jelölésig ér.'
  },
  {
    id: 'cd-q5',
    level: 1,
    question: 'Az évszakos csapadékdiagram alapján melyik évszakban hullott a legkevesebb csapadék?',
    figure: <QuizRainfallColumnSvg />,
    figureCaption: 'Évszakos összesített csapadékmennyiség milliméterben',
    options: ['Tél (100 mm)', 'Tavasz (140 mm)', 'Ősz (160 mm)', 'Nyár (180 mm)'],
    correctAnswer: 'Tél (100 mm)',
    explanation: 'A legalacsonyabb oszlop a téli időszakhoz tartozik, mindössze 100 mm-es értékkel.'
  },
  {
    id: 'cd-q6',
    level: 1,
    question: 'A könyvtári sávdiagram alapján hány darab sci-fi könyvet kölcsönöztek?',
    figure: <QuizLibraryBarSvg />,
    figureCaption: 'Könyvtári kölcsönzések műfajonként',
    options: ['15 db', '25 db', '30 db', '10 db'],
    correctAnswer: '15 db',
    explanation: 'A sci-fi sáv a vízszintes tengelyen pontosan a 15-ös beosztásig ér.'
  },
  {
    id: 'cd-q7',
    level: 1,
    question: 'A sportágak oszlopdiagramja szerint melyik sportág oszlopa a legalacsonyabb?',
    figure: <QuizSportColumnSvg />,
    figureCaption: 'Kedvenc sportágak létszáma',
    options: ['Futás (4 fő)', 'Úszás (6 fő)', 'Kosárlabda (8 fő)', 'Foci (12 fő)'],
    correctAnswer: 'Futás (4 fő)',
    explanation: 'A legkisebb oszlop a futás, mely mindössze 4 fő magasságú.'
  },
  {
    id: 'cd-q8',
    level: 1,
    question: 'A túrázó mozgásának grafikonja szerint mekkora távolságot tett meg az 1. óra (1h) végére?',
    figure: <QuizHikeLineSvg />,
    figureCaption: 'Gyalogtúrázó által megtett út az eltelt idő függvényében',
    options: ['4 km', '8 km', '0 km', '2 km'],
    correctAnswer: '4 km',
    explanation: 'Az 1h vízszintes beosztáshoz tartozó pont magassága pontosan 4 km a függőleges tengelyen.'
  },
  {
    id: 'cd-q9',
    level: 1,
    question: 'A hőmérséklet vonaldiagramja alapján mikor mérték a nap legmagasabb hőmérsékletét (a maximumot)?',
    figure: <QuizTempLineSvg />,
    figureCaption: 'Napi hőmérséklet változása óránként',
    options: ['14:00-kor (21 °C)', '12:00-kor (18 °C)', '16:00-kor (17 °C)', '18:00-kor (12 °C)'],
    correctAnswer: '14:00-kor (21 °C)',
    explanation: 'A grafikon csúcspontja (maximuma) a 14:00 időpontnál van, 21 °C-os értékkel.'
  },
  {
    id: 'cd-q10',
    level: 1,
    question: 'A kettős oszlopdiagram jelmagyarázata szerint melyik osztály adatait ábrázolják a kék színű oszlopok?',
    figure: <QuizGradesDoubleColumnSvg />,
    figureCaption: 'Osztályok dolgozateredményei',
    options: ['6.A osztály', '6.B osztály', 'A két osztály együtt', 'Nem derül ki a rajzról'],
    correctAnswer: '6.A osztály',
    explanation: 'A jobb felső sarokban látható jelmagyarázat (legenda) szerint a kék téglalap a 6.A osztályt jelöli.'
  },

  // ==========================================
  // 2. SZINT: SZÁMÍTÁSOK ÉS ÖSSZEHASONLÍTÁSOK DIAGRAMOKRÓL (11-20)
  // ==========================================
  {
    id: 'cd-q11',
    level: 2,
    question: 'A sportágak oszlopdiagramja alapján hány tanuló sportol összesen a négy sportágban?',
    figure: <QuizSportColumnSvg />,
    figureCaption: 'Sportágak: Foci 12, Kosár 8, Úszás 6, Futás 4',
    options: ['30 tanuló', '26 tanuló', '32 tanuló', '28 tanuló'],
    correctAnswer: '30 tanuló',
    explanation: 'Az oszlopok értékeit összeadjuk: 12 (foci) + 8 (kosár) + 6 (úszás) + 4 (futás) = 30 tanuló.'
  },
  {
    id: 'cd-q12',
    level: 2,
    question: 'A könyvtári sávdiagram szerint hányszor annyi képregényt kölcsönöztek, mint sci-fi könyvet?',
    figure: <QuizLibraryBarSvg />,
    figureCaption: 'Képregény: 30 db, Sci-fi: 15 db',
    options: ['2-szer annyit', '15-ször annyit', '3-szor annyit', '1,5-szer annyit'],
    correctAnswer: '2-szer annyit',
    explanation: 'Képregény = 30 db, Sci-fi = 15 db. 30 : 15 = 2, vagyis pontosan kétszer annyi képregényt kölcsönöztek.'
  },
  {
    id: 'cd-q13',
    level: 2,
    question: 'A hőmérséklet vonaldiagramja alapján mekkora volt a teljes napi hőingás (maximum és minimum különbsége)?',
    figure: <QuizTempLineSvg />,
    figureCaption: 'Maximum: 21 °C, Minimum: 4 °C',
    options: ['17 °C', '21 °C', '15 °C', '25 °C'],
    correctAnswer: '17 °C',
    explanation: 'A maximum 21 °C (14:00-kor), a minimum 4 °C (06:00-kor). A különbség: 21 - 4 = 17 °C.'
  },
  {
    id: 'cd-q14',
    level: 2,
    question: 'A kettős oszlopdiagram alapján hány jeles (5-ös) dolgozat született a két osztályban együttvéve?',
    figure: <QuizGradesDoubleColumnSvg />,
    figureCaption: 'Jelesek (5): 6.A-ban 8 fő, 6.B-ben 5 fő',
    options: ['13 dolgozat', '8 dolgozat', '5 dolgozat', '15 dolgozat'],
    correctAnswer: '13 dolgozat',
    explanation: 'A 6.A-ban 8, a 6.B-ben 5 jeles született. Összesen: 8 + 5 = 13 dolgozat.'
  },
  {
    id: 'cd-q15',
    level: 2,
    question: 'A túrázó mozgását ábrázoló grafikonon mit csinált a kiránduló a 2. és a 3. óra között (2h – 3h)?',
    figure: <QuizHikeLineSvg />,
    figureCaption: 'Túrázó távolsága az idő függvényében',
    options: ['Pihent (a megtett út változatlanul 8 km maradt)', 'Gyorsan futni kezdett', 'Visszafordult a hegyről', 'Elindult lefelé a völgybe'],
    correctAnswer: 'Pihent (a megtett út változatlanul 8 km maradt)',
    explanation: 'A grafikon vonala 2h és 3h között teljesen vízszintes egyenes szakasz, azaz az idő telt, de a megtett út nem nőtt: a túrázó pihent.'
  },
  {
    id: 'cd-q16',
    level: 2,
    question: 'Az évszakos csapadékdiagram alapján mennyi volt az egész éves összes csapadékmennyiség?',
    figure: <QuizRainfallColumnSvg />,
    figureCaption: 'Csapadék: Tavasz 140 mm, Nyár 180 mm, Ősz 160 mm, Tél 100 mm',
    options: ['580 mm', '480 mm', '600 mm', '500 mm'],
    correctAnswer: '580 mm',
    explanation: '140 (tavasz) + 180 (nyár) + 160 (ősz) + 100 (tél) = 580 mm.'
  },
  {
    id: 'cd-q17',
    level: 2,
    question: 'A hőmérséklet grafikonján hány °C-ot emelkedett a levegő hőmérséklete 08:00 és 10:00 óra között?',
    figure: <QuizTempLineSvg />,
    figureCaption: '08:00-kor 8 °C, 10:00-kor 14 °C',
    options: ['6 °C-ot', '14 °C-ot', '8 °C-ot', '2 °C-ot'],
    correctAnswer: '6 °C-ot',
    explanation: '10:00-kor 14 °C volt, 08:00-kor 8 °C. A felmelegedés mértéke: 14 - 8 = 6 °C.'
  },
  {
    id: 'cd-q18',
    level: 2,
    question: 'A sportágak oszlopdiagramja szerint hány fővel választották többen a labdarúgást, mint az úszást?',
    figure: <QuizSportColumnSvg />,
    figureCaption: 'Foci: 12 fő, Úszás: 6 fő',
    options: ['6 fővel többen', '8 fővel többen', '4 fővel többen', '2 fővel többen'],
    correctAnswer: '6 fővel többen',
    explanation: 'Foci = 12 fő, Úszás = 6 fő. Különbség: 12 - 6 = 6 fő.'
  },
  {
    id: 'cd-q19',
    level: 2,
    question: 'A könyvtári sávdiagram alapján hány darabbal több kalandregényt kölcsönöztek, mint ismeretterjesztő könyvet?',
    figure: <QuizLibraryBarSvg />,
    figureCaption: 'Kaland: 25 db, Ismeretterjesztő: 10 db',
    options: ['15 darabbal többet', '25 darabbal többet', '10 darabbal többet', '5 darabbal többet'],
    correctAnswer: '15 darabbal többet',
    explanation: 'Kalandregény = 25 db, Ismeretterjesztő = 10 db. 25 - 10 = 15 darabbal többet.'
  },
  {
    id: 'cd-q20',
    level: 2,
    question: 'A kettős oszlopdiagram szerint hány tanuló írta meg a dolgozatot a 6.A osztályban (kék oszlopok összege: 8 + 10 + 6 + 2)?',
    figure: <QuizGradesDoubleColumnSvg />,
    figureCaption: '6.A jegyei: 8 jeles, 10 jó, 6 közepes, 2 elégséges',
    options: ['26 tanuló', '24 tanuló', '28 tanuló', '30 tanuló'],
    correctAnswer: '26 tanuló',
    explanation: '8 + 10 + 6 + 2 = 26 diák írta meg a dolgozatot a 6.A-ban.'
  },

  // ==========================================
  // 3. SZINT: TRENDEK, ARÁNYOK ÉS MANIPULÁCIÓK ELEMZÉSE (21-30)
  // ==========================================
  {
    id: 'cd-q21',
    level: 3,
    question: 'A mellékelt összehasonlító ábra szerint miért tekinthető félrevezetőnek a bal oldali csonkolt diagram?',
    figure: <QuizMisleadingSvg />,
    figureCaption: 'Bal oldal: 95-től induló tengely • Jobb oldal: 0-tól induló korrekt tengely',
    options: ['Mert a 95-től induló skála miatt az apró 2 pontos különbség többszörösnek látszik', 'Mert a B iskola oszlopa sötétebb piros', 'Mert hiányzik az A iskola neve', 'Mert nem lehet százalékot számolni'],
    correctAnswer: 'Mert a 95-től induló skála miatt az apró 2 pontos különbség többszörösnek látszik',
    explanation: 'A bal oldali diagram levágta a 0 és 95 közötti részt, emiatt a 98 pont oszlopa háromszor olyan magasnak tűnik, mint a 96 ponté, ami durván eltúlozza a valós arányokat.'
  },
  {
    id: 'cd-q22',
    level: 3,
    question: 'A túrázó grafikonján melyik órában haladt a legnagyobb sebességgel (hol a legmeredekebb a vonal)?',
    figure: <QuizHikeLineSvg />,
    figureCaption: 'Meredekség = haladási sebesség',
    options: ['A 4. órában (3h és 4h között 6 km-t haladt)', 'Az 1. órában (4 km-t haladt)', 'A 2. órában (4 km-t haladt)', 'A 3. órában (0 km-t haladt)'],
    correctAnswer: 'A 4. órában (3h és 4h között 6 km-t haladt)',
    explanation: 'A 3. órától a 4. óráig a távolság 8 km-ről 14 km-re nőtt (1 óra alatt 6 km-t haladt, 6 km/h sebességgel). Ez a grafikon legmeredekebb szakasza.'
  },
  {
    id: 'cd-q23',
    level: 3,
    question: 'A hőmérséklet grafikonján melyik 2 órás szakaszban történt a leggyorsabb felmelegedés?',
    figure: <QuizTempLineSvg />,
    figureCaption: 'Vonal meredekségének vizsgálata',
    options: ['08:00 és 10:00 között (+6 °C emelkedés)', '06:00 és 08:00 között (+4 °C emelkedés)', '10:00 és 12:00 között (+4 °C emelkedés)', '12:00 és 14:00 között (+3 °C emelkedés)'],
    correctAnswer: '08:00 és 10:00 között (+6 °C emelkedés)',
    explanation: '08:00 és 10:00 között a hőmérséklet 8-ról 14 °C-ra ugrott (+6 °C), ez a diagram legmeredekebben emelkedő szakasza.'
  },
  {
    id: 'cd-q24',
    level: 3,
    question: 'A sportágak diagramja alapján (30 tanuló) a diákok hány százaléka választotta a labdarúgást (12 fő)?',
    figure: <QuizSportColumnSvg />,
    figureCaption: 'Összesen 30 fő, Foci: 12 fő',
    options: ['40 %', '30 %', '25 %', '12 %'],
    correctAnswer: '40 %',
    explanation: '12 : 30 = 0,40 = 40%. A diákok 40%-a választotta a focit.'
  },
  {
    id: 'cd-q25',
    level: 3,
    question: 'A négy sportág (Foci 12, Kosár 8, Úszás 6, Futás 4) alapján mennyi az egy sportágra jutó átlagos létszám a 6. osztályban?',
    figure: <QuizSportColumnSvg />,
    figureCaption: 'Összlétszám = 30 fő, 4 kategória',
    options: ['7,5 fő', '8 fő', '7 fő', '10 fő'],
    correctAnswer: '7,5 fő',
    explanation: '30 : 4 = 7,5 fő sportáganként.'
  },
  {
    id: 'cd-q26',
    level: 3,
    question: 'A kettős oszlopdiagram szerint a 6.B osztályban hány tanuló írta meg a dolgozatot (narancssárga oszlopok összege: 5 + 12 + 8 + 3)?',
    figure: <QuizGradesDoubleColumnSvg />,
    figureCaption: '6.B érdemjegyei: 5 jeles, 12 jó, 8 közepes, 3 elégséges',
    options: ['28 tanuló', '26 tanuló', '30 tanuló', '25 tanuló'],
    correctAnswer: '28 tanuló',
    explanation: '5 + 12 + 8 + 3 = 28 diák írta meg a dolgozatot a 6.B-ben.'
  },
  {
    id: 'cd-q27',
    level: 3,
    question: 'A hőmérséklet-grafikonon 14:00 és 18:00 között a vonal folyamatosan lejt (21°C-ról 12°C-ra). Mit jelent ez a valóságban?',
    figure: <QuizTempLineSvg />,
    figureCaption: 'Délutáni szakasz vizsgálata',
    options: ['Folyamatos hűlés ment végbe délután', 'Felforrt a levegő', 'Megállt az idő', 'A hőmérséklet negatív lett'],
    correctAnswer: 'Folyamatos hűlés ment végbe délután',
    explanation: 'A lefelé haladó görbe a mért érték csökkenését jelzi: a levegő 21 °C-ról 12 °C-ra hűlt vissza.'
  },
  {
    id: 'cd-q28',
    level: 3,
    question: 'Az évszakos csapadékdiagram alapján az éves összcsapadék (580 mm) hány százaléka hullott a nyári évszakban (180 mm)?',
    figure: <QuizRainfallColumnSvg />,
    figureCaption: 'Nyári csapadék: 180 mm, Teljes összeg: 580 mm',
    options: ['kb. 31 %', 'kb. 50 %', 'kb. 18 %', 'kb. 42 %'],
    correctAnswer: 'kb. 31 %',
    explanation: '180 : 580 ≈ 0,3103 = 31%.'
  },
  {
    id: 'cd-q29',
    level: 3,
    question: 'A 6.A osztály tanulóinak dolgozatátlaga a diagram adatai szerint (8 ötös, 10 négyes, 6 hármas, 2 kettes, összesen 26 tanuló) mennyi?',
    figure: <QuizGradesDoubleColumnSvg />,
    figureCaption: '6.A osztály jegyeinek átlaga',
    options: ['kb. 3,92', 'kb. 4,20', 'kb. 3,50', 'kb. 4,50'],
    correctAnswer: 'kb. 3,92',
    explanation: 'Összpont: (8·5) + (10·4) + (6·3) + (2·2) = 40 + 40 + 18 + 4 = 102. Átlag: 102 : 26 ≈ 3,92.'
  },
  {
    id: 'cd-q30',
    level: 3,
    question: 'A korrekt jobb oldali diagram alapján mekkora a valóságos pontkülönbség a két iskola között?',
    figure: <QuizMisleadingSvg />,
    figureCaption: 'A iskola: 96 pont, B iskola: 98 pont',
    options: ['Csak 2 pont (98 - 96 = 2)', '40 pont', '20 pont', '3 pont'],
    correctAnswer: 'Csak 2 pont (98 - 96 = 2)',
    explanation: 'A valóságos különbség 98 - 96 = 2 pont, ami a 100 pontos skálán szinte észrevehetetlen eltérés, szemben a bal oldali csonkolt diagram optikai csalásával.'
  }
];

export const ChartsDiagramsQuiz: React.FC<ChartsDiagramsQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Grafikonok és diagramok kvíz"
      subtitle="Teszteld tudásodat valós diagramok és grafikonok közvetlen leolvasásával, elemzésével 3 szinten!"
      topicBadge="6. OSZTÁLY • VI. STATISZTIKA • 2. GRAFIKONOK, DIAGRAMOK"
      badgeText="6. OSZTÁLY • VI. STATISZTIKA • 2. GRAFIKONOK, DIAGRAMOK"
      themeColor="blue"
      topicId="g6-charts-diagrams-quiz"
      topicTitle="Grafikonok, diagramok, összefüggések"
      questions={questions}
      cheatSheetCards={cheatSheetCards}
      matcherComponent={ChartsDiagramsMatcher as any}
      sorterComponent={ChartsDiagramsSorter as any}
      onBack={onBack}
      onOpenMatcher={onOpenMatcher}
      onOpenSorter={onOpenSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default ChartsDiagramsQuiz;
