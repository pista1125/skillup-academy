import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { CombinationsMatcher } from './CombinationsMatcher';
import { CombinationsSorter } from './CombinationsSorter';

const FIG_CLASS = 'w-full max-w-[300px] h-auto mx-auto';

const polygonPoints = (cx: number, cy: number, R: number, n: number) =>
  Array.from({ length: n }, (_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
  });

const COMB_FIG_SUBSET = (
  <svg viewBox="0 0 260 120" className={FIG_CLASS} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="256" height="116" rx="12" fill="#f0fdf4" stroke="#bbf7d0" />
    <ellipse cx="130" cy="58" rx="112" ry="40" fill="#ffffff" stroke="#16a34a" strokeWidth="1.8" />
    <text x="24" y="24" fontSize="12" fontWeight="bold" fill="#166534">H</text>
    {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'].map((l, i) => (
      <text key={l} x={42 + i * 22} y={63} fontSize="14" fontWeight="bold" textAnchor="middle" fill="#15803d">
        {l}
      </text>
    ))}
    <text x="130" y="112" fontSize="11" textAnchor="middle" fill="#475569">hány 4 elemű részhalmaz? (?)</text>
  </svg>
);

const COMB_FIG_TEAMS = (() => {
  const pts = polygonPoints(130, 72, 50, 6);
  return (
    <svg viewBox="0 0 260 150" className={FIG_CLASS} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="256" height="146" rx="12" fill="#fff7ed" stroke="#fed7aa" />
      <line x1={pts[0].x} y1={pts[0].y} x2={pts[1].x} y2={pts[1].y} stroke="#ea580c" strokeWidth="2.5" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="12" fill="#ffffff" stroke="#ea580c" strokeWidth="2" />
          <text x={p.x} y={p.y + 4} fontSize="11" fontWeight="bold" textAnchor="middle" fill="#9a3412">
            {i + 1}
          </text>
        </g>
      ))}
      <text x="130" y="142" fontSize="10" textAnchor="middle" fill="#475569">egy szakasz = egy meccs (pl. 1–2); összesen ?</text>
    </svg>
  );
})();

const COMB_FIG_HEPTAGON = (() => {
  const pts = polygonPoints(130, 74, 52, 7);
  const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  return (
    <svg viewBox="0 0 260 150" className={FIG_CLASS} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="256" height="146" rx="12" fill="#faf5ff" stroke="#e9d5ff" />
      <polygon points={pts.map((p) => `${p.x},${p.y}`).join(' ')} fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" />
      <line x1={pts[0].x} y1={pts[0].y} x2={pts[3].x} y2={pts[3].y} stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5 3" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="3.5" fill="#7c3aed" />
          <text x={130 + 64 * Math.cos(-Math.PI / 2 + (i * 2 * Math.PI) / 7)} y={78 + 64 * Math.sin(-Math.PI / 2 + (i * 2 * Math.PI) / 7)} fontSize="11" fontWeight="bold" textAnchor="middle" fill="#5b21b6">
            {labels[i]}
          </text>
        </g>
      ))}
      <text x="130" y="144" fontSize="10" textAnchor="middle" fill="#475569">konvex hétszög; szaggatott: egy átló (AD)</text>
    </svg>
  );
})();

const COMB_FIG_CARDS = (
  <svg viewBox="0 0 260 120" className={FIG_CLASS} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="256" height="116" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i} transform={`rotate(${(i - 2) * 12} 130 150)`}>
        <rect x="110" y="24" width="40" height="58" rx="5" fill="#ffffff" stroke="#334155" strokeWidth="1.5" />
        <text x="130" y="60" fontSize="15" fontWeight="bold" textAnchor="middle" fill={i % 2 === 0 ? '#dc2626' : '#0f172a'}>
          {i + 1}
        </text>
      </g>
    ))}
    <text x="130" y="110" fontSize="10" textAnchor="middle" fill="#475569">5 lap; egyszerre 2-t húzunk</text>
  </svg>
);

const COMB_FIG_LIFT = (
  <svg viewBox="0 0 260 120" className={FIG_CLASS} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="256" height="116" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {Array.from({ length: 12 }, (_, i) => (
      <circle key={i} cx={22 + (i % 6) * 24} cy={42 + Math.floor(i / 6) * 30} r="9" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.2" />
    ))}
    <rect x="182" y="20" width="58" height="76" rx="6" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="2" />
    <line x1="211" y1="20" x2="211" y2="96" stroke="#1d4ed8" strokeWidth="1" />
    <text x="211" y="62" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#1e3a8a">4 fő</text>
    <text x="80" y="108" fontSize="10" textAnchor="middle" fill="#475569">12 fős társaság</text>
  </svg>
);

const COMB_FIG_TICKET = (
  <svg viewBox="0 0 260 130" className={FIG_CLASS} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="256" height="126" rx="12" fill="#fefce8" stroke="#fde68a" />
    <rect x="70" y="12" width="120" height="106" rx="8" fill="#fde047" stroke="#a16207" strokeWidth="1.8" />
    {Array.from({ length: 9 }, (_, i) => (
      <text key={i} x={95 + (i % 3) * 35} y={40 + Math.floor(i / 3) * 32} fontSize="15" fontWeight="bold" textAnchor="middle" fill="#713f12">
        {i + 1}
      </text>
    ))}
  </svg>
);

const COMBINATIONS_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Részhalmazok, a fogalom (1–10)
  {
    id: 'comb-q1',
    level: 1,
    questionTypeBadge: 'Részhalmazok',
    figure: COMB_FIG_SUBSET,
    question: 'Hány 4 elemű részhalmaza van a H = {a, b, c, d, e, f, g, h, i} halmaznak?',
    options: ['126', '3024', '36', '24'],
    correctAnswer: 0,
    explanation: 'Sorban kiválasztva 9 · 8 · 7 · 6 = 3024, de minden részhalmazt 4! = 24-szer számoltunk: 3024 : 24 = 126.'
  },
  {
    id: 'comb-q2',
    level: 1,
    questionTypeBadge: 'Részhalmazok',
    question: 'Hány 2 elemű részhalmaza van az {A; n; d; o; r} halmaznak?',
    options: ['10', '20', '5', '25'],
    correctAnswer: 0,
    explanation: '5 · 4 / 2! = 10. (A 20 = 5 · 4 a sorrendet is figyelembe venné.)'
  },
  {
    id: 'comb-q3',
    level: 1,
    questionTypeBadge: 'Részhalmazok',
    question: 'Hány 1 elemű részhalmaza van az {A; n; d; o; r} halmaznak?',
    options: ['5', '1', '10', '25'],
    correctAnswer: 0,
    explanation: 'Minden elem egy-egy 1 elemű részhalmazt ad: {A}, {n}, {d}, {o}, {r} – összesen 5.'
  },
  {
    id: 'comb-q4',
    level: 1,
    questionTypeBadge: 'Részhalmazok',
    question: 'Hány 3 elemű részhalmaza van egy 4 elemű halmaznak?',
    options: ['4', '24', '12', '64'],
    correctAnswer: 0,
    explanation: '4 · 3 · 2 / 3! = 24 / 6 = 4. (Minden 3 elemű részhalmazt az egyetlen kimaradó elem határoz meg.)'
  },
  {
    id: 'comb-q5',
    level: 1,
    questionTypeBadge: 'Kombináció',
    figure: COMB_FIG_TEAMS,
    question: 'A röplabdabajnokságra 6 csapat nevezett, minden csapat minden csapattal pontosan egy meccset játszik. Hány mérkőzésre kerül sor?',
    options: ['15', '30', '36', '12'],
    correctAnswer: 0,
    explanation: 'Egy mérkőzést a két csapat határoz meg, a sorrendjük nem számít: 6 · 5 / 2! = 15. (30 lenne, ha oda-visszavágót is játszanának.)'
  },
  {
    id: 'comb-q6',
    level: 1,
    questionTypeBadge: 'Kombináció',
    figure: COMB_FIG_CARDS,
    question: 'Apa 5 lapot tart a kezében, Csilla egyszerre kettőt kihúz. Hányféle lehet a kihúzott két lap, ha a sorrend nem számít?',
    options: ['10', '20', '25', '5'],
    correctAnswer: 0,
    explanation: '5 · 4 / 2! = 10.'
  },
  {
    id: 'comb-q7',
    level: 1,
    questionTypeBadge: 'Kombináció',
    question: 'Egy tárgyalás előtt a 7 résztvevő mindegyike kezet fogott mindenkivel. Összesen hány kézfogás történt?',
    options: ['21', '42', '49', '14'],
    correctAnswer: 0,
    explanation: 'Egy kézfogást két ember határoz meg: 7 · 6 / 2! = 21. (A 42 minden kézfogást kétszer számol.)'
  },
  {
    id: 'comb-q8',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Mit jelent az „n alatt a k” szám?',
    options: [
      'Az n elemű halmaz k elemű részhalmazainak számát',
      'n különböző elem k-féle sorrendjét',
      'Az nᵏ hatványt',
      'Az n · k szorzatot'
    ],
    correctAnswer: 0,
    explanation: 'Az „n alatt a k” jel az n elemű halmaz k elemű részhalmazainak számát jelöli: n · (n − 1) · … · (n − k + 1) / k!.'
  },
  {
    id: 'comb-q9',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Ha k elemet sorban választunk ki, de a sorrend nem számít, mit kell tennünk a sorban kiválasztott esetek számával?',
    options: ['Elosztjuk k!-sal', 'Megszorozzuk k!-sal', 'Elosztjuk n!-sal', 'Kivonunk belőle k-t'],
    correctAnswer: 0,
    explanation: 'Minden k elemű kiválasztást k!-szor számoltunk (ennyiféleképpen rendezhető sorba), ezért k!-sal osztunk.'
  },
  {
    id: 'comb-q10',
    level: 1,
    questionTypeBadge: 'Számít a sorrend?',
    question: 'Melyik feladatban NEM számít a kiválasztás sorrendje?',
    options: [
      '9 unokából 3 megfőzi az első esti paprikás krumplit',
      '9 unokából 3 segít: egyikük bevásárol, másikuk csomagol, harmadikuk előkészíti a táborhelyet',
      '90 résztvevő között két különböző nyereményt sorsolnak ki',
      '25 tanulóból 3 küldött irodalom-, történelem- és földrajzvetélkedőre megy'
    ],
    correctAnswer: 0,
    explanation: 'A vacsorát hárman közösen főzik, csak az számít, kik ők. A többi esetben a kiválasztottak különböző szerepet kapnak.'
  },

  // LEVEL 2: Számolás, sorrenddel és nélküle (11–20)
  {
    id: 'comb-q11',
    level: 2,
    questionTypeBadge: 'Kombináció',
    question: 'Mennyi „10 alatt a 3” értéke?',
    options: ['120', '720', '30', '1000'],
    correctAnswer: 0,
    explanation: '10 · 9 · 8 / 3! = 720 / 6 = 120.'
  },
  {
    id: 'comb-q12',
    level: 2,
    questionTypeBadge: 'Kombináció',
    question: 'Mennyi „12 alatt a 4” értéke?',
    options: ['495', '11 880', '48', '1980'],
    correctAnswer: 0,
    explanation: '12 · 11 · 10 · 9 / 4! = 11 880 / 24 = 495. (1980 = 11 880 / 3!, rossz osztó.)'
  },
  {
    id: 'comb-q13',
    level: 2,
    questionTypeBadge: 'Számít a sorrend?',
    question: 'A nagyszülők 9 unokájuk közül hármat hívnak korábban: egyikük a bevásárlásban, másikuk a csomagolásban, harmadikuk a táborhely előkészítésében segít. Hányféleképpen választhatók ki?',
    options: ['504', '84', '729', '27'],
    correctAnswer: 0,
    explanation: 'Mindegyikük más feladatot kap, így számít a sorrend: 9 · 8 · 7 = 504.'
  },
  {
    id: 'comb-q14',
    level: 2,
    questionTypeBadge: 'Kombináció',
    question: 'Hányféleképpen választható ki a 9 unoka közül az a 3, aki a kempingben az első este megfőzi a paprikás krumplit?',
    options: ['84', '504', '27', '168'],
    correctAnswer: 0,
    explanation: 'Nem számít a sorrend: 9 · 8 · 7 / 3! = 504 / 6 = 84.'
  },
  {
    id: 'comb-q15',
    level: 2,
    questionTypeBadge: 'Kombináció',
    figure: COMB_FIG_LIFT,
    question: 'Egy 12 fős társaság érkezik egy lifthez, amelyben egyszerre 4 személy utazhat. Hányféle lehet az első utazó négyes?',
    options: ['495', '11 880', '1980', '70'],
    correctAnswer: 0,
    explanation: 'A négyesen belül nem számít a sorrend: 12 · 11 · 10 · 9 / 4! = 495.'
  },
  {
    id: 'comb-q16',
    level: 2,
    questionTypeBadge: 'Kombináció',
    question: 'Az első 4 ember már felment a lifttel. A maradék 8 közül hányféleképpen választható ki a második menet négyese?',
    options: ['70', '1680', '495', '8'],
    correctAnswer: 0,
    explanation: '8 · 7 · 6 · 5 / 4! = 1680 / 24 = 70.'
  },
  {
    id: 'comb-q17',
    level: 2,
    questionTypeBadge: 'Sokszög szakaszai',
    figure: COMB_FIG_HEPTAGON,
    question: 'Hány összekötő szakasz (átló vagy oldal) rajzolható egy konvex hétszög csúcsai közé?',
    options: ['21', '14', '35', '42'],
    correctAnswer: 0,
    explanation: 'Bármely két csúcs egy szakaszt határoz meg: 7 · 6 / 2! = 21 (7 oldal és 14 átló).'
  },
  {
    id: 'comb-q18',
    level: 2,
    questionTypeBadge: 'Számít a sorrend?',
    question: 'Egy 25 fős osztály 3 tagú küldöttséget jelöl ki: egyikük az irodalom-, másikuk a történelem-, harmadikuk a földrajzvetélkedőn indul. Hányféleképpen tehetik ezt meg?',
    options: ['13 800', '2300', '15 625', '75'],
    correctAnswer: 0,
    explanation: 'Különböző vetélkedők ⇒ számít a sorrend: 25 · 24 · 23 = 13 800.'
  },
  {
    id: 'comb-q19',
    level: 2,
    questionTypeBadge: 'Kombináció',
    question: 'Egy 25 fős osztály 3 tagú küldöttséget jelöl ki, mindhárman a matematikavetélkedőn indulnak. Hányféleképpen tehetik ezt meg?',
    options: ['2300', '13 800', '75', '4600'],
    correctAnswer: 0,
    explanation: 'Nem számít a sorrend: 25 · 24 · 23 / 3! = 13 800 / 6 = 2300.'
  },
  {
    id: 'comb-q20',
    level: 2,
    questionTypeBadge: 'Részhalmazok',
    question: 'Miért van az {A; n; d; o; r} halmaznak ugyanannyi (10) 2 elemű, mint 3 elemű részhalmaza?',
    options: [
      'Mert minden 2 elemű részhalmaz egyértelműen kijelöli a kimaradó 3 elemet',
      'Mert 2 + 3 = 5 véletlenül osztható 5-tel',
      'Mert 2 elemnek és 3 elemnek ugyanannyi sorrendje van',
      'Mert minden részhalmazt kétszer számoltunk'
    ],
    correctAnswer: 0,
    explanation: 'A 2 elem kiválasztása egyúttal a 3 kimaradó elem kiválasztása – a kettő között kölcsönösen egyértelmű megfeleltetés van.'
  },

  // LEVEL 3: Összetett feladatok (21–30)
  {
    id: 'comb-q21',
    level: 3,
    questionTypeBadge: 'Lift',
    figure: COMB_FIG_LIFT,
    question: 'Hányféleképpen utazhat fel az emeletre a 12 fős társaság a 4 személyes lifttel 3 menetben?',
    options: ['34 650', '5775', '1485', '479 001 600'],
    correctAnswer: 0,
    explanation: 'Az első négyes 495-féle, a második 70-féle, a harmadik 1-féle; a menetek sorrendje számít: 495 · 70 · 1 = 34 650.'
  },
  {
    id: 'comb-q22',
    level: 3,
    questionTypeBadge: 'Kombináció',
    question: 'Két ugyanolyan nyereményt sorsolnak ki 90 résztvevő között, mindenki legfeljebb egyet nyerhet. Hányféle lehet a végeredmény?',
    options: ['4005', '8010', '8100', '4095'],
    correctAnswer: 0,
    explanation: 'Csak a két nyertes személye számít: 90 · 89 / 2! = 4005.'
  },
  {
    id: 'comb-q23',
    level: 3,
    questionTypeBadge: 'Számít a sorrend?',
    question: 'Két különböző nyereményt sorsolnak ki 90 résztvevő között, mindenki csak egyet nyerhet. Hányféle lehet a végeredmény?',
    options: ['8010', '4005', '8100', '4095'],
    correctAnswer: 0,
    explanation: 'Számít, ki melyik nyereményt kapja: 90 · 89 = 8010.'
  },
  {
    id: 'comb-q24',
    level: 3,
    questionTypeBadge: 'Ismétléssel',
    question: 'Két különböző nyereményt sorsolnak ki 90 résztvevő között, és ugyanaz a résztvevő mindkettőt is megnyerheti. Hányféle lehet a végeredmény?',
    options: ['8100', '8010', '4095', '4005'],
    correctAnswer: 0,
    explanation: 'Mindkét nyeremény 90-féle emberhez kerülhet: 90 · 90 = 8100.'
  },
  {
    id: 'comb-q25',
    level: 3,
    questionTypeBadge: 'Esetszétválasztás',
    question: 'Két ugyanolyan nyereményt sorsolnak ki 90 résztvevő között, és akár egy ember is nyerheti mindkettőt. Hányféle lehet a végeredmény?',
    options: ['4095', '4005', '8100', '8010'],
    correctAnswer: 0,
    explanation: 'Két különböző nyertes: 4005 eset; egy ember nyeri mindkettőt: 90 eset. Összesen 4005 + 90 = 4095.'
  },
  {
    id: 'comb-q26',
    level: 3,
    questionTypeBadge: 'Részhalmazok',
    question: 'Egy 8 elemű halmaznak hány olyan részhalmaza van, amely legfeljebb 3 elemű (az üres halmazt is beleértve)?',
    options: ['93', '56', '163', '64'],
    correctAnswer: 0,
    explanation: '0 elemű: 1, 1 elemű: 8, 2 elemű: 28, 3 elemű: 56; összesen 1 + 8 + 28 + 56 = 93.'
  },
  {
    id: 'comb-q27',
    level: 3,
    questionTypeBadge: 'Kombináció',
    figure: COMB_FIG_TICKET,
    question: 'A lyukasztós buszjegyen 9 szám szerepel. Hány olyan lyukasztás van, amely során 3 lyukat vág a gép?',
    options: ['84', '504', '27', '729'],
    correctAnswer: 0,
    explanation: 'Csak az számít, melyik 3 szám helyén van lyuk: 9 · 8 · 7 / 3! = 84.'
  },
  {
    id: 'comb-q28',
    level: 3,
    questionTypeBadge: 'Kombináció',
    figure: COMB_FIG_TICKET,
    question: 'A 9 számos lyukasztós buszjegyen hány olyan lyukasztás van, amely során 4 lyukat vág a gép?',
    options: ['126', '3024', '36', '84'],
    correctAnswer: 0,
    explanation: '9 · 8 · 7 · 6 / 4! = 126 – ugyanannyi, ahány 4 elemű részhalmaza van egy 9 elemű halmaznak.'
  },
  {
    id: 'comb-q29',
    level: 3,
    questionTypeBadge: 'Kombináció',
    question: 'Az ötöslottón 90 számból 5-öt húznak ki, a húzás sorrendje nem számít. Hány különböző húzás lehetséges?',
    options: ['43 949 268', '5 273 912 160', '450', '90⁵'],
    correctAnswer: 0,
    explanation: '90 · 89 · 88 · 87 · 86 / 5! = 5 273 912 160 / 120 = 43 949 268.'
  },
  {
    id: 'comb-q30',
    level: 3,
    questionTypeBadge: 'Sokszög szakaszai',
    figure: COMB_FIG_HEPTAGON,
    question: 'Hány átlója van egy konvex hétszögnek?',
    options: ['14', '21', '7', '28'],
    correctAnswer: 0,
    explanation: 'A 7 csúcs közötti összes szakasz 7 · 6 / 2 = 21, ebből 7 oldal, tehát 21 − 7 = 14 átló.'
  }
];

export const CombinationsQuiz: React.FC<{
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
      topicId="g11-comb-kombinacio-quiz"
      subtopicId="amikor-nem-szamit-a-kivalasztas-sorrendje"
      title="3. Amikor nem számít a kiválasztás sorrendje – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: részhalmazok száma, „n alatt a k”, számít-e a sorrend, lift, nyereménysorsolás, lottó."
      badge="11. OSZTÁLY • II. KOMBINATORIKA, GRÁFOK • KVÍZ"
      questions={COMBINATIONS_QUESTIONS}
      cheatSheets={[
        {
          title: 'n alatt a k',
          items: [
            'Az n elemű halmaz k elemű részhalmazainak száma.',
            '= n · (n − 1) · … · (n − k + 1) / k!',
            '10 alatt a 3 = 120; 12 alatt a 4 = 495; 9 alatt a 4 = 126.',
            'n alatt a k = n alatt az (n − k): 5 alatt a 2 = 5 alatt a 3 = 10.'
          ]
        },
        {
          title: 'Számít-e a sorrend?',
          items: [
            'Különböző szerep, feladat, nyeremény ⇒ számít: n · (n − 1) · …',
            'Csak az számít, kik a kiválasztottak ⇒ nem számít: osztunk k!-sal.',
            'Mérkőzés, kézfogás, szakasz: 2 elemű részhalmaz.',
            'Lift: menetek sorrendje számít, a menetben lévők sorrendje nem.'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            'Röplabda: 15 meccs; kézfogás (7 fő): 21; hétszög: 21 szakasz',
            'Unokák: 504 és 84; küldöttség: 13 800 és 2300',
            'Lift: 495, 70, 1 ⇒ 34 650',
            'Nyeremények (90 fő): 4005, 8010, 8100, 4095; buszjegy: 84 és 126'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <CombinationsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <CombinationsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default CombinationsQuiz;
