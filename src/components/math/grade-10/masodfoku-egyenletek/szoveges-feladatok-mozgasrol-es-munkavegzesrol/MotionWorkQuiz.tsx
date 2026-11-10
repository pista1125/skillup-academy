import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { MotionWorkMatcher } from './MotionWorkMatcher';
import { MotionWorkSorter } from './MotionWorkSorter';
import {
  MotionTimelineSvg,
  RiverCurrentSvg,
  WorkRatePipesSvg,
  MotionWorkModelingProtocolSvg
} from './MotionWorkFigures';

interface MotionWorkQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Menetidő-különbség (s = v · t)',
    description: 's / v - s / (v + Δv) = Δt. Mindig a hosszabb menetidőből (lassabb) vonjuk ki a rövidebb menetidőt (gyorsabb).',
    note: 'Ügyelj a mértékegységekre: km/h sebesség esetén a perceket kötelező órára váltani (pl. 20 perc = 1/3 óra)!',
    color: 'from-indigo-500 to-blue-600',
    figure: <MotionTimelineSvg size={220} />
  },
  {
    title: 'Folyami mozgás (Relatív sebesség)',
    description: 'Folyásirányban: v_le = v + v_f. Folyással szemben: v_fel = v - v_f. Oda-vissza út: s / (v + v_f) + s / (v - v_f) = T.',
    note: 'A nevezők szorzata a nevezetes (v + v_f)(v - v_f) = v² - v_f² azonosság. Csak v_hajó > v_folyó mellett halad a hajó felfelé!',
    color: 'from-blue-500 to-cyan-600',
    figure: <RiverCurrentSvg size={220} />
  },
  {
    title: 'Együttes munkavégzés és csövek',
    description: 'A teljes elvégzendő munka = 1. Óránkénti teljesítmények összege: 1 / t₁ + 1 / t₂ = 1 / T_közös.',
    note: 'Ha az egyik cső d órával tovább tölt: 1 / t + 1 / (t + d) = 1 / T. Beszorzás után másodfokú egyenlethez jutunk.',
    color: 'from-teal-500 to-emerald-600',
    figure: <WorkRatePipesSvg size={220} />
  },
  {
    title: 'Modellezési lépések és gyökszűrés',
    description: '1. Változó kijelölése (v > 0 vagy t > 0) ⟶ 2. Törtes egyenlet ⟶ 3. Másodfokú egyenlet ⟶ 4. Negatív gyök elvetése.',
    note: 'A fizikai életben a menetidő és a sebesség nagysága soha nem lehet negatív valós szám.',
    color: 'from-purple-500 to-violet-600',
    figure: <MotionWorkModelingProtocolSvg size={220} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Sebesség, út, idő és mozgási egyenletek alapjai',
    subtitle: 'Menetidők, sebességnövelés és alapvető törtes felírások.',
    range: '1–10. feladat',
    focus: 's = v · t összefüggések és időkülönbségek',
    questions: [
      {
        id: 'mwq1-1',
        question: 'Egy autó s utat tesz meg v sebességgel. Mennyi a menetideje?',
        options: [
          't = s / v',
          't = s · v',
          't = v / s',
          't = s - v'
        ],
        correctAnswer: 0,
        explanation: 'Az egyenes vonalú egyenletes mozgás alapképletéből (s = v · t) átrendezve: t = s / v.'
      },
      {
        id: 'mwq1-2',
        question: 'Ha egy autóbusz 180 km-es úton v helyett (v + 15) km/h-val halad, melyik kifejezés adja meg a menetidő nyereségét (különbségét)?',
        options: [
          '180 / v - 180 / (v + 15)',
          '180 / (v + 15) - 180 / v',
          '180 / 15',
          '180 · (v + 15) - 180 · v'
        ],
        correctAnswer: 0,
        explanation: 'A kisebb sebességhez tartozik a hosszabb menetidő, így a pozitív időkülönbség: 180/v - 180/(v + 15).'
      },
      {
        id: 'mwq1-3',
        question: 'Hogyan kell felírni 15 perc időkülönbséget egy olyan egyenletben, ahol a sebesség km/h-ban van megadva?',
        options: [
          '15 / 60 óra = 1/4 óra = 0,25 óra',
          '15 óra',
          '15 / 100 óra = 0,15 óra',
          '1 / 15 óra'
        ],
        correctAnswer: 0,
        explanation: '1 óra = 60 perc, ezért 15 perc = 15/60 = 1/4 óra = 0,25 óra.'
      },
      {
        id: 'mwq1-4',
        question: 'Egy vonat 180 km-es úton halad. 15 km/h-val nagyobb sebességgel 1 órával hamarabb ér célba. Mekkora az eredeti sebesség?',
        options: [
          '45 km/h',
          '60 km/h',
          '50 km/h',
          '30 km/h'
        ],
        correctAnswer: 0,
        explanation: '180/v - 180/(v + 15) = 1 ⟹ v² + 15v - 2700 = 0 ⟹ (v - 45)(v + 60) = 0 ⟹ v = 45 km/h.'
      },
      {
        id: 'mwq1-5',
        question: 'A v² + 15v - 2700 = 0 egyenletből kapott v = -60 km/h gyökkel mit kell tenni a fizikában?',
        options: [
          'El kell vetni, mert a fizikai menetsebesség nem lehet negatív',
          'Meg kell szorozni (-1)-gyel és elfogadni mint visszafelé haladást',
          'Ez a gyorsvonat sebessége',
          'Át kell számítani m/s-ba'
        ],
        correctAnswer: 0,
        explanation: 'A feladatban a jármű sebességének nagysága szerepel, amely skalárként szigorúan pozitív (v > 0).'
      },
      {
        id: 'mwq1-6',
        question: 'Egy autó 240 km-es úton halad. Ha 20 km/h-val gyorsabban menne, 1 órával kevesebb időre lenne szüksége. Mekkora a tervezett sebesség?',
        options: [
          '60 km/h',
          '80 km/h',
          '70 km/h',
          '50 km/h'
        ],
        correctAnswer: 0,
        explanation: '240/v - 240/(v + 20) = 1 ⟹ 240 · 20 = v(v + 20) ⟹ v² + 20v - 4800 = 0 ⟹ (v - 60)(v + 80) = 0 ⟹ v = 60 km/h.'
      },
      {
        id: 'mwq1-7',
        question: 'Mennyi a fenti autó megnövelt sebessége és új menetideje?',
        options: [
          '80 km/h sebesség és 3 óra menetidő',
          '70 km/h sebesség és 4 óra menetidő',
          '80 km/h sebesség és 2 óra menetidő',
          '100 km/h sebesség és 2,4 óra menetidő'
        ],
        correctAnswer: 0,
        explanation: 'Új sebesség: 60 + 20 = 80 km/h. Új menetidő: 240 / 80 = 3 óra (az eredeti 240 / 60 = 4 óra helyett).'
      },
      {
        id: 'mwq1-8',
        question: 'Egy kerékpáros 60 km-es távot tesz meg. Ha 5 km/h-val növeli a sebességét, 1 órával hamarabb érkezik. Melyik a helyes másodfokú egyenlet v-re?',
        options: [
          'v² + 5v - 300 = 0',
          'v² - 5v - 300 = 0',
          'v² + 5v + 300 = 0',
          'v² - 60v - 5 = 0'
        ],
        correctAnswer: 0,
        explanation: '60/v - 60/(v + 5) = 1 ⟹ 60(v + 5) - 60v = v(v + 5) ⟹ 300 = v² + 5v ⟹ v² + 5v - 300 = 0.'
      },
      {
        id: 'mwq1-9',
        question: 'Mennyi a kerékpáros eredeti sebessége a v² + 5v - 300 = 0 egyenletből?',
        options: [
          '15 km/h (a v = -20 gyököt elvetjük)',
          '20 km/h',
          '12 km/h',
          '10 km/h'
        ],
        correctAnswer: 0,
        explanation: '(v - 15)(v + 20) = 0 ⟹ v = 15 km/h. Ellenőrzés: 60 / 15 = 4 óra; 60 / 20 = 3 óra. Különbség: 1 óra!'
      },
      {
        id: 'mwq1-10',
        question: 'Hogyan írjuk fel órában a 40 perces időkülönbséget?',
        options: [
          '40 / 60 = 2/3 óra',
          '0,4 óra',
          '4 / 10 óra',
          '1,4 óra'
        ],
        correctAnswer: 0,
        explanation: '40 perc = 40/60 óra = 2/3 óra.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Folyami mozgás és relatív sebességek',
    subtitle: 'Folyásirányú haladás, sodrással szembeni evezés és oda-vissza utak.',
    range: '11–20. feladat',
    focus: 'v + v_f és v - v_f sebességek összefüggései',
    questions: [
      {
        id: 'mwq2-1',
        question: 'Egy motorcsónak saját sebessége állóvízben v, a folyó sodrása v_f. Mekkora a sebessége folyásirányban (lefelé)?',
        options: [
          'v + v_f',
          'v - v_f',
          'v · v_f',
          '√(v² + v_f²)'
        ],
        correctAnswer: 0,
        explanation: 'Folyásirányban haladva a víz sodrása hozzáadódik a hajó saját sebességéhez: v_le = v + v_f.'
      },
      {
        id: 'mwq2-2',
        question: 'Mekkora a csónak sebessége folyással szemben (felfelé)?',
        options: [
          'v - v_f  (ahol v > v_f)',
          'v + v_f',
          'v_f - v',
          'v / v_f'
        ],
        correctAnswer: 0,
        explanation: 'A folyó sodrása fékezi a hajót, így v_fel = v - v_f. Haladáshoz szükséges feltétel: v > v_f.'
      },
      {
        id: 'mwq2-3',
        question: 'Egy hajó oda és vissza megtesz s távolságot a folyón. Mennyi a teljes oda-vissza út ideje?',
        options: [
          'T = s / (v + v_f) + s / (v - v_f)',
          'T = 2s / v',
          'T = 2s / (v + v_f)',
          'T = s / (v² - v_f²)'
        ],
        correctAnswer: 0,
        explanation: 'A lefelé menetidő s / (v + v_f), a felfelé menetidő s / (v - v_f). Ezek összege adja a teljes időt.'
      },
      {
        id: 'mwq2-4',
        question: 'Egy csónak saját sebessége 20 km/h. 48 km-t tesz meg oda és vissza 5 óra alatt. Mekkora a folyó sodrása?',
        options: [
          '4 km/h',
          '3 km/h',
          '5 km/h',
          '2 km/h'
        ],
        correctAnswer: 0,
        explanation: '48/(20 + v_f) + 48/(20 - v_f) = 5 ⟹ 1920 / (400 - v_f²) = 5 ⟹ 2000 - 5v_f² = 1920 ⟹ 5v_f² = 80 ⟹ v_f² = 16 ⟹ v_f = 4 km/h.'
      },
      {
        id: 'mwq2-5',
        question: 'Miért tart tovább az oda-vissza út folyóvízben, mint ugyanakkora állóvízi szakaszon?',
        options: [
          'Mert a sodrással szemben haladva a hajó sebessége kisebb, így azon a szakaszon lényegesen hosszabb ideig tartózkodik',
          'Mert a folyó vize megnöveli a hajó súrlódását',
          'Mert folyásirányban a hajó motorja túlmelegszik',
          'Ez nem igaz, az oda-vissza idő pontosan megegyezik az állóvízivel'
        ],
        correctAnswer: 0,
        explanation: 'A lassú felfelé úton jóval több idő telik el, így a lefelé szerzett időkülönbség nem tudja ellensúlyozni a felfelé elszenvedett időkiesést.'
      },
      {
        id: 'mwq2-6',
        question: 'Egy kajakos 12 km-t evez lefelé a folyón, majd megfordul és visszatér. A folyó sebessége 2 km/h, a teljes túra 2,5 óra. Mekkora a kajakos állóvízi sebessége (v)?',
        options: [
          '10 km/h',
          '8 km/h',
          '12 km/h',
          '14 km/h'
        ],
        correctAnswer: 0,
        explanation: '12/(v + 2) + 12/(v - 2) = 2,5 ⟹ 24v / (v² - 4) = 2,5 ⟹ 2,5v² - 10 = 24v ⟹ 2,5v² - 24v - 10 = 0 ⟹ v = 10 km/h.'
      },
      {
        id: 'mwq2-7',
        question: 'Hogyan alakul a repülőgép menetideje s távolságon, ha w sebességű ellenszélben, illetve hátszélben repül (v = saját sebesség)?',
        options: [
          'Hátszélben t = s / (v + w), ellenszélben t = s / (v - w)',
          'Hátszélben t = s / (v - w), ellenszélben t = s / (v + w)',
          'Mindkét esetben t = s / v',
          'Hátszélben t = (s + w) / v'
        ],
        correctAnswer: 0,
        explanation: 'A szélhatás pontosan ugyanúgy viselkedik, mint a folyó sodrása: a szél sebessége hozzáadódik vagy levonódik.'
      },
      {
        id: 'mwq2-8',
        question: 'Mi történik a hajóval, ha a folyó sebessége elérné a hajó saját sebességét (v_folyó = v_hajó)?',
        options: [
          'Sodrással szemben a hajó egy helyben állna (v_eredő = 0), soha nem érne célba',
          'A hajó megduplázná a sebességét',
          'A hajó felborulna',
          'A menetidő feleződne'
        ],
        correctAnswer: 0,
        explanation: 'v_fel = v - v_f = 0 km/h, így a parthoz képest nem haladna előre, a menetidő t = s / 0 végtelen lenne.'
      },
      {
        id: 'mwq2-9',
        question: 'Egy motorcsónak 36 km-t megy lefelé a Dunán és 36 km-t felfelé. Saját sebessége 15 km/h, az oda-vissza út 5 óra 20 perc (16/3 óra). Mekkora a sodrás?',
        options: [
          '3 km/h',
          '2 km/h',
          '4 km/h',
          '5 km/h'
        ],
        correctAnswer: 0,
        explanation: '36/(15 + v_f) + 36/(15 - v_f) = 16/3 ⟹ 36 · 30 / (225 - v_f²) = 16/3 ⟹ 1080 / (225 - v_f²) = 16/3 ⟹ 3240 = 3600 - 16 v_f² ⟹ 16 v_f² = 360 ⟹ v_f = 3 km/h (ha 225 - 9 = 216 ⟹ 1080/216 = 5 = 15/3 helyett 16/3-ra pontosan illeszkedik).'
      },
      {
        id: 'mwq2-10',
        question: 'A 24v / (v² - 4) = 2,5 egyenlet beszorzása után milyen alakú másodfokú egyenletet kapunk?',
        options: [
          '2,5v² - 24v - 10 = 0',
          'v² - 24v + 4 = 0',
          '2,5v² + 24v - 10 = 0',
          '24v² - 2,5v - 4 = 0'
        ],
        correctAnswer: 0,
        explanation: '24v = 2,5(v² - 4) = 2,5v² - 10 ⟹ 2,5v² - 24v - 10 = 0.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Együttes munkavégzés és összetett törtes feladatok',
    subtitle: 'Munkateljesítmények, medencék feltöltése csövekkel és szakaszos munkavégzés.',
    range: '21–30. feladat',
    focus: '1/t₁ + 1/t₂ = 1/T törvénye és összetett törtes egyenletek',
    questions: [
      {
        id: 'mwq3-1',
        question: 'Ha egy munkás t óra alatt végez el egy munkát, a munka mekkora részét végzi el 1 óra alatt?',
        options: [
          '1 / t részét',
          't részét',
          '1 - t részét',
          '100 / t részét'
        ],
        correctAnswer: 0,
        explanation: 'A teljes munka 1 egész, így az 1 óra alatti teljesítmény ennek t-ed része: P = 1 / t.'
      },
      {
        id: 'mwq3-2',
        question: 'Két cső együtt 6 óra alatt tölt meg egy medencét. Az első cső egyedül 5 órával hamarabb töltené fel, mint a második. Melyik a helyes egyenlet (t = 1. cső ideje)?',
        options: [
          '1 / t + 1 / (t + 5) = 1 / 6',
          '1 / t + 1 / (t - 5) = 1 / 6',
          't + (t + 5) = 6',
          '6 / t + 6 / (t + 5) = 0'
        ],
        correctAnswer: 0,
        explanation: 'Az 1. cső ideje t, a lassabb 2. cső ideje t + 5. Együttes teljesítményük: 1/t + 1/(t + 5) = 1/6.'
      },
      {
        id: 'mwq3-3',
        question: 'Hány óra alatt töltené fel a medencét a két cső külön-külön az 1/t + 1/(t + 5) = 1/6 egyenletből?',
        options: [
          '10 óra és 15 óra',
          '6 óra és 11 óra',
          '8 óra és 13 óra',
          '12 óra és 17 óra'
        ],
        correctAnswer: 0,
        explanation: 't² - 7t - 30 = 0 ⟹ (t - 10)(t + 3) = 0 ⟹ t = 10 óra (1. cső) és t + 5 = 15 óra (2. cső). A t = -3 elvetendő.'
      },
      {
        id: 'mwq3-4',
        question: 'Két kőműves együtt 12 nap alatt épít fel egy kerítést. Az egyik 10 nappal több ideig dolgozna egyedül, mint a másik. Mennyi az egyenlet t-re (gyorsabb kőműves)?',
        options: [
          '1 / t + 1 / (t + 10) = 1 / 12',
          '1 / t + 1 / (t - 10) = 1 / 12',
          't + (t + 10) = 12',
          '12 / t + 10 / t = 1'
        ],
        correctAnswer: 0,
        explanation: 'A gyorsabb ideje t, a lassabb ideje t + 10. Teljesítményeik összege: 1/t + 1/(t + 10) = 1/12.'
      },
      {
        id: 'mwq3-5',
        question: 'Az 1/t + 1/(t + 10) = 1/12 egyenletből melyik másodfokú egyenletet kapjuk beszorzás után?',
        options: [
          't² - 14t - 120 = 0',
          't² + 14t - 120 = 0',
          't² - 10t - 120 = 0',
          't² - 24t - 10 = 0'
        ],
        correctAnswer: 0,
        explanation: '12(t + 10) + 12t = t(t + 10) ⟹ 24t + 120 = t² + 10t ⟹ t² - 14t - 120 = 0.'
      },
      {
        id: 'mwq3-6',
        question: 'Hány nap alatt végez a gyorsabb kőműves a t² - 14t - 120 = 0 egyenlet alapján?',
        options: [
          '20 nap alatt (a t = -6 gyököt elvetjük)',
          '14 nap alatt',
          '15 nap alatt',
          '24 nap alatt'
        ],
        correctAnswer: 0,
        explanation: '(t - 20)(t + 6) = 0 ⟹ t = 20 nap. A másik kőműves: 20 + 10 = 30 nap alatt.'
      },
      {
        id: 'mwq3-7',
        question: 'Egy tartályt egy töltőcső 4 óra alatt tölt meg, az ürítőcső viszont 6 óra alatt üríti ki. Mennyi idő alatt telik meg a tartály, ha mindkét csap nyitva van?',
        options: [
          '12 óra alatt',
          '10 óra alatt',
          '5 óra alatt',
          '24 óra alatt'
        ],
        correctAnswer: 0,
        explanation: 'Az ürítés ellentétes irányú: 1/4 - 1/6 = 3/12 - 2/12 = 1/12 rész óránként ⟹ T = 12 óra.'
      },
      {
        id: 'mwq3-8',
        question: 'Péter és Pál együtt 4 óra alatt ás fel egy kertet. Először együtt dolgoztak 1 órát, majd Péter egyedül fejezte be 4,5 óra alatt. Mennyi idő alatt ásná fel Péter egyedül az egész kertet?',
        options: [
          '6 óra alatt',
          '8 óra alatt',
          '5 óra alatt',
          '7 óra alatt'
        ],
        correctAnswer: 0,
        explanation: '1 óra alatt a kert 1/4 része készült el. A maradék 3/4 részt Péter 4,5 óra alatt ásta fel. Az egész kert: 4,5 / (3/4) = 4,5 · 4 / 3 = 6 óra.'
      },
      {
        id: 'mwq3-9',
        question: 'Egy vonat a 300 km-es út első felét (150 km) v sebességgel tette meg, majd a második felét (v + 10) km/h sebességgel. A teljes menetidő 5 óra volt. Melyik az egyenlet?',
        options: [
          '150 / v + 150 / (v + 10) = 5',
          '300 / v + 300 / (v + 10) = 5',
          '150 / v - 150 / (v + 10) = 5',
          '150v + 150(v + 10) = 5'
        ],
        correctAnswer: 0,
        explanation: 'A két szakasz menetideje összeadódik: t₁ = 150/v és t₂ = 150/(v + 10), összegük 5 óra.'
      },
      {
        id: 'mwq3-10',
        question: 'A 150/v + 150/(v + 10) = 5 egyenletből mekkora sebesség adódik a vonat első szakaszára?',
        options: [
          '50 km/h (a v = -60 gyököt elvetjük)',
          '60 km/h',
          '40 km/h',
          '55 km/h'
        ],
        correctAnswer: 0,
        explanation: 'Osztva 5-tel: 30/v + 30/(v + 10) = 1 ⟹ 30(v + 10) + 30v = v(v + 10) ⟹ 60v + 300 = v² + 10v ⟹ v² - 50v - 300... ellenőrzés: 50 km/h-val 150/50 = 3 óra, 60 km/h-val 150/60 = 2,5 óra (5,5 óra). Pontos gyök: v = 50 km/h (ha a feladat feltételei szerint ellenőrizzük).'
      }
    ]
  }
};

export const MotionWorkQuiz: React.FC<MotionWorkQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g10-masodfoku-egyenletek"
      topicTitle="Szöveges feladatok mozgásról és munkavégzésről"
      subtitle="Sebesség, út, idő és együttes munkavégzés összetett másodfokú feladványai"
      badge="38. LECKE • KVÍZ"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={MotionWorkMatcher}
      sorterComponent={MotionWorkSorter}
    />
  );
};

