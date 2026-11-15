import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { CombinatoricsPractice2Matcher } from './CombinatoricsPractice2Matcher';
import { CombinatoricsPractice2Sorter } from './CombinatoricsPractice2Sorter';

// ---- Kis ábrák a kvízkérdésekhez (a végeredményt nem árulják el) ----
const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

const FlagFig: React.FC<{ note: string }> = ({ note }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS} xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="238" height="148" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    <line x1="40" y1="18" x2="40" y2="140" stroke="#475569" strokeWidth="3" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x="44" y={22 + i * 24} width="100" height="24" fill="#ffffff" stroke="#475569" strokeWidth="1.2" />
        <text x="94" y={39 + i * 24} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#7c3aed">
          ?
        </text>
      </g>
    ))}
    {['#dc2626', '#f8fafc', '#16a34a', '#2563eb', '#eab308', '#f97316'].map((c, i) => (
      <rect key={c} x={160 + (i % 2) * 30} y={26 + Math.floor(i / 2) * 26} width="22" height="18" rx="3" fill={c} stroke="#64748b" />
    ))}
    <text x="190" y="118" fontSize="10" textAnchor="middle" fill="#334155">6 szín</text>
    <text x="120" y="142" fontSize="10" textAnchor="middle" fill="#334155">{note}</text>
  </svg>
);

const BadgeFig: React.FC = () => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS} xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="238" height="148" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    <circle cx="80" cy="75" r="55" fill="#ffffff" stroke="#475569" strokeWidth="2" />
    <line x1="80" y1="75" x2="80" y2="20" stroke="#475569" strokeWidth="2" />
    <line x1="80" y1="75" x2={80 + 55 * Math.cos(Math.PI / 6)} y2={75 + 55 * Math.sin(Math.PI / 6)} stroke="#475569" strokeWidth="2" />
    <line x1="80" y1="75" x2={80 - 55 * Math.cos(Math.PI / 6)} y2={75 + 55 * Math.sin(Math.PI / 6)} stroke="#475569" strokeWidth="2" />
    <text x="106" y="62" fontSize="14" fontWeight="bold" fill="#7c3aed">?</text>
    <text x="50" y="62" fontSize="14" fontWeight="bold" fill="#7c3aed">?</text>
    <text x="76" y="115" fontSize="14" fontWeight="bold" fill="#7c3aed">?</text>
    {['#dc2626', '#2563eb', '#f8fafc', '#eab308', '#16a34a'].map((c, i) => (
      <rect key={c} x="165" y={22 + i * 22} width="40" height="16" rx="3" fill={c} stroke="#64748b" />
    ))}
    <text x="185" y="140" fontSize="10" textAnchor="middle" fill="#334155">5 szín</text>
  </svg>
);

const JetsFig: React.FC<{ note: string }> = ({ note }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS} xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="238" height="148" rx="10" fill="#f0f9ff" stroke="#bae6fd" />
    <rect x="20" y="108" width="200" height="10" rx="4" fill="#94a3b8" />
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const x = 40 + i * 32;
      return (
        <g key={i}>
          <path d={`M ${x - 4} 108 C ${x - 7} 80, ${x - 2} 50, ${x} 30 C ${x + 2} 50, ${x + 7} 80, ${x + 4} 108 Z`} fill="#cbd5e1" />
          <text x={x} y="24" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0369a1">?</text>
        </g>
      );
    })}
    <text x="120" y="138" fontSize="10" textAnchor="middle" fill="#334155">{note}</text>
  </svg>
);

const ExamRoomFig: React.FC = () => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS} xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="238" height="148" rx="10" fill="#fffbeb" stroke="#fde68a" />
    <rect x="85" y="8" width="70" height="16" rx="4" fill="#fef3c7" stroke="#d97706" />
    <text x="120" y="20" fontSize="10" textAnchor="middle" fill="#92400e">Tanár</text>
    {[0, 1, 2].map((r) =>
      [0, 1, 2, 3].map((c) => (
        <rect key={`${r}-${c}`} x={22 + c * 52} y={34 + r * 34} width="40" height="24" rx="4" fill="#ffffff" stroke="#94a3b8" />
      ))
    )}
    {['A', 'B', 'C', 'D'].map((l, c) => (
      <text key={l} x={42 + c * 52} y="50" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#78350f">
        {l}
      </text>
    ))}
    <text x="120" y="144" fontSize="10" textAnchor="middle" fill="#334155">12 pad: 4 oszlop × 3 sor</text>
  </svg>
);

const CompartmentFig: React.FC = () => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS} xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="238" height="148" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x={28 + i * 48} y="22" width="40" height="34" rx="5" fill="#e0e7ff" stroke="#4f46e5" />
        <text x={48 + i * 48} y="44" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#3730a3">{i + 1}.</text>
        <rect x={28 + i * 48} y="94" width="40" height="34" rx="5" fill="#e0e7ff" stroke="#4f46e5" />
        <text x={48 + i * 48} y="116" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#3730a3">{i + 5}.</text>
      </g>
    ))}
    <text x="120" y="80" fontSize="10" textAnchor="middle" fill="#475569">egymással szemben 4-4 ülés</text>
  </svg>
);

const COMBINATORICS_PRACTICE2_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: A fejezet alapmodelljei (1–10)
  {
    id: 'cp2-q1',
    level: 1,
    questionTypeBadge: 'Kombináció',
    question: 'Egy 10 elemű halmaznak hány 4 elemű részhalmaza van?',
    options: ['210', '5040', '220', '40'],
    correctAnswer: 0,
    explanation: 'A sorrend nem számít: C(10; 4) = (10 · 9 · 8 · 7) / (4 · 3 · 2 · 1) = 210. Az 5040 = 10 · 9 · 8 · 7 a sorrendet is figyelembe venné.'
  },
  {
    id: 'cp2-q2',
    level: 1,
    questionTypeBadge: 'Ismétléses variáció',
    question: 'Hányféle 7 karakteres kód képezhető a 0 és 1 számjegyekből?',
    options: ['128', '14', '49', '64'],
    correctAnswer: 0,
    explanation: 'Mind a 7 helyre 2-féle jegy kerülhet (ismétléses variáció): 2⁷ = 128.'
  },
  {
    id: 'cp2-q3',
    level: 1,
    questionTypeBadge: 'Permutáció',
    question: 'Hányféleképpen állhat sorba 5 gyerek?',
    options: ['120', '25', '125', '60'],
    correctAnswer: 0,
    explanation: 'Permutáció: 5! = 5 · 4 · 3 · 2 · 1 = 120.'
  },
  {
    id: 'cp2-q4',
    level: 1,
    questionTypeBadge: 'Ismétléses variáció',
    question: 'Egy dobókockával 3-szor dobunk. Hányféle dobássorozatot kaphatunk?',
    options: ['216', '18', '56', '729'],
    correctAnswer: 0,
    explanation: 'Mindhárom dobás 6-féle lehet: 6³ = 216.'
  },
  {
    id: 'cp2-q5',
    level: 1,
    questionTypeBadge: 'Ismétléses permutáció',
    question: 'Hányféleképpen állíthatunk sorba 3 (egyforma) fehér és 4 (egyforma) piros bábut?',
    options: ['35', '5040', '12', '144'],
    correctAnswer: 0,
    explanation: 'Ismétléses permutáció: 7! / (3! · 4!) = 35. Ugyanez: a 7 helyből kiválasztjuk a 3 fehér helyét, C(7; 3) = 35.'
  },
  {
    id: 'cp2-q6',
    level: 1,
    questionTypeBadge: 'Variáció',
    question: 'Hányféleképpen választhatunk ki 10 gyerek közül egy titkárt és egy jegyzőt?',
    options: ['90', '45', '100', '20'],
    correctAnswer: 0,
    explanation: 'A két tisztség különböző, ezért számít a sorrend: 10 · 9 = 90. (45 lenne, ha két egyforma tisztséget töltenénk be.)'
  },
  {
    id: 'cp2-q7',
    level: 1,
    questionTypeBadge: 'Variáció',
    question: 'A 8 fős döntőben hányféle lehet az első 3 helyezett, ha nincs holtverseny?',
    options: ['336', '56', '512', '24'],
    correctAnswer: 0,
    explanation: 'Számít a sorrend, ismétlés nincs: 8 · 7 · 6 = 336. (A 56 = C(8; 3) a dobogósok halmaza, sorrend nélkül.)'
  },
  {
    id: 'cp2-q8',
    level: 1,
    questionTypeBadge: 'Szorzási szabály',
    question: 'Hány háromjegyű pozitív egész szám létezik?',
    options: ['900', '999', '1000', '720'],
    correctAnswer: 0,
    explanation: 'Az első jegy 9-féle (nem lehet 0), a másik kettő 10-10-féle: 9 · 10 · 10 = 900.'
  },
  {
    id: 'cp2-q9',
    level: 1,
    questionTypeBadge: 'Kombináció',
    question: '7 csapat körmérkőzést játszik (mindenki mindenkivel pontosan egyszer). Hány mérkőzésre kerül sor?',
    options: ['21', '42', '49', '14'],
    correctAnswer: 0,
    explanation: 'Minden mérkőzés egy csapatpár: C(7; 2) = 7 · 6 / 2 = 21. A 42 minden meccset kétszer számolna.'
  },
  {
    id: 'cp2-q10',
    level: 1,
    questionTypeBadge: 'Szorzási szabály',
    question: 'Hány olyan háromjegyű pozitív egész szám van, amelynek minden számjegye páros?',
    options: ['100', '125', '80', '64'],
    correctAnswer: 0,
    explanation: 'Páros jegyek: 0, 2, 4, 6, 8. Az első helyre a 0 nem kerülhet (4-féle), a többire 5-5-féle: 4 · 5 · 5 = 100.'
  },

  // LEVEL 2: Tankönyvi és érettségi feladatok (11–20)
  {
    id: 'cp2-q11',
    level: 2,
    questionTypeBadge: 'Színezés',
    figure: <FlagFig note="négy sáv, két-két sáv azonos színű" />,
    question: 'Egy négysávos zászlót 6 színből kétszínűre színezünk úgy, hogy két-két sáv azonos színű. Hányféle zászló lehet?',
    options: ['90', '180', '30', '360'],
    correctAnswer: 0,
    explanation: 'Melyik sáv egyezzen a felsővel: 3-féle. A felső pár 6-féle, a másik pár 5-féle színű: 3 · 6 · 5 = 90.'
  },
  {
    id: 'cp2-q12',
    level: 2,
    questionTypeBadge: 'Színezés',
    figure: <BadgeFig />,
    question: 'Egy kitűző három mezőjét 5 színből színezzük (mezőnként egy szín). Hányféle háromszínű kitűző készíthető?',
    options: ['60', '10', '125', '15'],
    correctAnswer: 0,
    explanation: 'A három mező különböző színű: 5 · 4 · 3 = 60. (A 10 = C(5; 3) csak a színhármast választaná ki, a mezőkre osztást nem.)'
  },
  {
    id: 'cp2-q13',
    level: 2,
    questionTypeBadge: 'Komplementer',
    figure: <BadgeFig />,
    question: 'Ugyanennél a kitűzőnél (3 mező, 5 szín, a mezők lehetnek azonos színűek) hányféle kétszínű kitűző készíthető?',
    options: ['60', '20', '30', '120'],
    correctAnswer: 0,
    explanation: 'Összesen 5³ = 125 színezés, ebből 5 egyszínű és 60 háromszínű: 125 − 5 − 60 = 60. Másképp: C(5; 2) · (2³ − 2) = 10 · 6 = 60.'
  },
  {
    id: 'cp2-q14',
    level: 2,
    questionTypeBadge: 'Színezés',
    figure: <JetsFig note="kék, piros vagy sárga – 3-3 azonos színű" />,
    question: 'Hat vízsugár mindegyike kék, piros vagy sárga. Hányféle látvány lehet, ha három-három vízsugár azonos színű, de nem mind a hat?',
    options: ['60', '120', '20', '40'],
    correctAnswer: 0,
    explanation: 'A két szín C(3; 2) = 3-féle; a 6 sugárból kiválasztjuk, melyik 3 kapja az egyik színt: C(6; 3) = 20. 3 · 20 = 60. A 120 minden látványt kétszer számolna (a két szín szerepcseréje).'
  },
  {
    id: 'cp2-q15',
    level: 2,
    questionTypeBadge: 'Szorzási szabály',
    question: 'Hatféle fagylaltból háromgombócos, pontosan kétféle ízű fagylaltot kérünk, és számít a gombócok sorrendje. Hányféle kérés lehet?',
    options: ['90', '30', '180', '60'],
    correctAnswer: 0,
    explanation: 'A kétszer szereplő íz 6-féle, az egyszer szereplő 5-féle (30), az egyszeri íz helye 3-féle: 30 · 3 = 90.'
  },
  {
    id: 'cp2-q16',
    level: 2,
    questionTypeBadge: 'Komplementer',
    question: 'Hány olyan háromjegyű szám van, amelyben szerepel a 9-es számjegy?',
    options: ['252', '280', '200', '100'],
    correctAnswer: 0,
    explanation: 'Összes háromjegyű szám 900, kilences nélküli 8 · 9 · 9 = 648, így 900 − 648 = 252. A 280 és a 200 többször számolt eseteket tartalmaz.'
  },
  {
    id: 'cp2-q17',
    level: 2,
    questionTypeBadge: 'Szorzási szabály',
    question: 'Hány olyan háromjegyű szám van, amelyben NINCS 9-es számjegy?',
    options: ['648', '729', '576', '512'],
    correctAnswer: 0,
    explanation: 'Első jegy: nem 0 és nem 9, 8-féle; a második és harmadik: nem 9, 9-9-féle: 8 · 9 · 9 = 648.'
  },
  {
    id: 'cp2-q18',
    level: 2,
    questionTypeBadge: 'Permutáció',
    question: 'Hányféleképpen állhat 3 házaspár egy sorban úgy, hogy minden férj a felesége mellett álljon?',
    options: ['48', '6', '8', '720'],
    correctAnswer: 0,
    explanation: 'A 3 pár sorrendje 3! = 6, minden páron belül 2-féle sorrend: 6 · 2 · 2 · 2 = 48.'
  },
  {
    id: 'cp2-q19',
    level: 2,
    questionTypeBadge: 'Párosítás',
    question: 'Egy 8 csapatos bajnokságban minden csapat pontosan egy meccset játszik az első fordulóban. Hányféle lehet a forduló beosztása?',
    options: ['105', '28', '2520', '210'],
    correctAnswer: 0,
    explanation: 'Az 1. csapat ellenfele 7-féle, a következő párosítatlan csapaté 5-féle, majd 3-féle, végül 1: 7 · 5 · 3 · 1 = 105. A 2520 a párok sorrendjét is megkülönböztetné.'
  },
  {
    id: 'cp2-q20',
    level: 2,
    questionTypeBadge: 'Permutáció',
    question: 'Hányféleképpen alakíthat 4 fiú és 4 lány 4 táncoló párt, ha minden fiú lánnyal táncol, és a párok sorrendje nem számít?',
    options: ['24', '16', '70', '576'],
    correctAnswer: 0,
    explanation: 'Rendeljünk minden fiúhoz egy lányt: 4 · 3 · 2 · 1 = 24. A 576 = 4! · 4! a párok sorrendjét is számolná.'
  },

  // LEVEL 3: Összetett feladatok, hibakeresés (21–30)
  {
    id: 'cp2-q21',
    level: 3,
    questionTypeBadge: 'Ülésrend',
    figure: <ExamRoomFig />,
    question: 'A vizsgateremben 12 pad van 4 oszlopban, oszloponként 3 egymás mögötti paddal. Hányféleképpen ülhet le a 12 vizsgázó, ha Julcsi és Tercsi két egymás melletti padban ül?',
    options: ['18 · 10! = 65 318 400', '9 · 10! = 32 659 200', '12! = 479 001 600', '34 · 10! = 123 379 200'],
    correctAnswer: 0,
    explanation: 'Soronként 3 egymás melletti padpár, a 3 sorban 9; a lányok 2-féle sorrendben: 18. A többiek 10!-féleképpen: 18 · 10! = 65 318 400. (A 34 · 10! az egymás mögötti padokat is megengedné.)'
  },
  {
    id: 'cp2-q22',
    level: 3,
    questionTypeBadge: 'Ülésrend',
    figure: <CompartmentFig />,
    question: 'Egy vasúti fülkében egymással szemben 4-4 számozott ülés van. Hányféleképpen ülhet le 8 ember úgy, hogy Juci és Piri egymás mellett vagy egymással szemben üljön?',
    options: ['14 400', '8640', '5760', '40 320'],
    correctAnswer: 0,
    explanation: 'Egymás melletti helypár 2 · 3 = 6, szemközti 4: 10 helypár, a két lány 2-féle sorrendben, a többiek 6! = 720-féleképpen: 10 · 2 · 720 = 14 400. (8640 csak az egymás mellettieket, 5760 csak a szemközti helyeket számolná.)'
  },
  {
    id: 'cp2-q23',
    level: 3,
    questionTypeBadge: 'Esetszétválasztás',
    question: 'Hány legfeljebb 3 elemű részhalmaza van a pozitív egyjegyű számok halmazának (az üres halmazt is beleértve)?',
    options: ['130', '84', '120', '512'],
    correctAnswer: 0,
    explanation: 'Esetszétválasztás az elemszám szerint: C(9; 0) + C(9; 1) + C(9; 2) + C(9; 3) = 1 + 9 + 36 + 84 = 130.'
  },
  {
    id: 'cp2-q24',
    level: 3,
    questionTypeBadge: 'Kombináció',
    question: 'Zoli egyesével kivett egy ládából 7 almát, köztük 2 hibásat. Hányféleképpen alakulhatott, hogy hányadikra húzta a hibásakat?',
    options: ['21', '42', '49', '14'],
    correctAnswer: 0,
    explanation: 'A 7 sorszámból kell kiválasztani a 2 hibás sorszámát, a sorrend nem számít: C(7; 2) = 21.'
  },
  {
    id: 'cp2-q25',
    level: 3,
    questionTypeBadge: 'Rejtvény',
    question: 'A 7. lecke házi feladatában a helyes válaszok betűiből (R = 24, N = 100, A = 130, A/Y = 21) egy magyar költő neve rakható ki. Ki ő?',
    options: ['Arany János', 'Ady Endre', 'József Attila', 'Petőfi Sándor'],
    correctAnswer: 0,
    explanation: 'A betűk: R, N, A, valamint kétszer a 21-hez tartozó A és Y – ezekből ARANY rakható ki.'
  },
  {
    id: 'cp2-q26',
    level: 3,
    questionTypeBadge: 'Komplementer',
    question: 'Hány olyan négyjegyű szám van, amelyben szerepel a 0 számjegy?',
    options: ['2439', '729', '2916', '3000'],
    correctAnswer: 0,
    explanation: 'Négyjegyű szám 9000 van. Nulla nélkül minden helyre 9-féle jegy: 9⁴ = 6561. 9000 − 6561 = 2439.'
  },
  {
    id: 'cp2-q27',
    level: 3,
    questionTypeBadge: 'Komplementer',
    question: 'Hány olyan négyjegyű szám van, amelyben szerepel az 5-ös számjegy?',
    options: ['3168', '3439', '2916', '4000'],
    correctAnswer: 0,
    explanation: 'Ötös nélkül: első jegy 8-féle (nem 0, nem 5), a többi 9-9-féle: 8 · 9³ = 5832. 9000 − 5832 = 3168. A 3439 = 10⁴ − 9⁴ a 0-val kezdődő „számokat” is beszámítaná.'
  },
  {
    id: 'cp2-q28',
    level: 3,
    questionTypeBadge: 'Hibakeresés',
    question: 'Mi a hiba a következő gondolatmenetben? „A 9-es az 1., a 2. vagy a 3. helyen áll: 1 · 10 · 10 + 9 · 1 · 10 + 9 · 10 · 1 = 280 háromjegyű szám tartalmaz 9-est.”',
    options: [
      'A több 9-est tartalmazó számokat (pl. 299) többször számolja',
      'Kimaradnak a 9-esre végződő számok',
      'A 0-val kezdődő számokat is beszámítja',
      'Nincs hiba, a helyes válasz 280'
    ],
    correctAnswer: 0,
    explanation: 'Az esetek átfedik egymást: a 299 a 2. és a 3. esetben is szerepel, a 999 mindháromban. A helyes válasz 252.'
  },
  {
    id: 'cp2-q29',
    level: 3,
    questionTypeBadge: 'Színezés',
    figure: <FlagFig note="szomszédos sávok különböző színűek" />,
    question: 'Egy négysávos zászló minden sávját 6 szín valamelyikére festjük úgy, hogy szomszédos sávok különböző színűek legyenek. Hányféle zászló lehet?',
    options: ['750', '1296', '360', '625'],
    correctAnswer: 0,
    explanation: 'Felső sáv 6-féle, minden további csak a fölötte lévőtől kell, hogy eltérjen: 6 · 5 · 5 · 5 = 750. (A 360 = 6 · 5 · 4 · 3 minden sávot különbözőre festene.)'
  },
  {
    id: 'cp2-q30',
    level: 3,
    questionTypeBadge: 'Komplementer',
    figure: <JetsFig note="kék, piros vagy sárga – nem mind azonos" />,
    question: 'A hat vízsugár mindegyike kék, piros vagy sárga lehet, de nem lehet mind a hat azonos színű. Hányféle látvány lehetséges?',
    options: ['726', '729', '720', '60'],
    correctAnswer: 0,
    explanation: 'Komplementer: összes 3⁶ = 729 színezés, ebből 3 egyszínű, így 729 − 3 = 726.'
  }
];

export const CombinatoricsPractice2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId="g11-comb-gyakorlas-masodik-quiz"
      subtopicId="gyakorlas-kombinatorika-2"
      title="7. Gyakorlás – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: alapmodellek, érettségi feladatok, komplementer és esetszétválasztás, hibakeresés."
      badge="11. OSZTÁLY • II. KOMBINATORIKA, GRÁFOK • KVÍZ"
      questions={COMBINATORICS_PRACTICE2_QUESTIONS}
      cheatSheets={[
        {
          title: 'Alapmodellek',
          items: [
            'Permutáció: n!; ismétléses: n! / (k₁! · k₂! · …)',
            'Variáció: n · (n − 1) · … · (n − k + 1); ismétléses: nᵏ',
            'Kombináció: C(n; k) = n! / (k! · (n − k)!)',
            'Háromjegyű számok: 9 · 10 · 10 = 900'
          ]
        },
        {
          title: 'Ötletek',
          items: [
            'Különálló esetek ⇒ összeadás (ne legyen átfedés!)',
            'Egymás utáni, egyformán folytatható döntések ⇒ szorzás',
            '„Jó” = összes − „rossz” (pl. van benne 9-es)',
            'Kevés eset ⇒ rendszerezett felsorolás; sok elem ⇒ próbáld kisebbel'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            'Zászló 90; kitűző háromszínű 60, kétszínű 60; szökőkút 60',
            'Fagylalt 90; vizsgaterem 18 · 10! = 65 318 400',
            '9-est tartalmazó háromjegyű: 900 − 648 = 252',
            'Házaspárok 48; vasúti fülke 14 400; 8 csapat 105; költő: ARANY'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <CombinatoricsPractice2Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <CombinatoricsPractice2Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default CombinatoricsPractice2Quiz;
