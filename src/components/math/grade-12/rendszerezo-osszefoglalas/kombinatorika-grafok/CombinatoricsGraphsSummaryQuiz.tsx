import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { CombinatoricsGraphsSummaryMatcher } from './CombinatoricsGraphsSummaryMatcher';
import { CombinatoricsGraphsSummarySorter } from './CombinatoricsGraphsSummarySorter';
import { GraphDraw, circlePts, completeEdges, G_RED, G_BLUE, G_INK, B3_PTS, B3_EDGES } from './graphKit';

const QSVG: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 160 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const FIG_K6 = (
  <QSVG>
    <GraphDraw pts={circlePts(6, 90, 82, 60)} edges={completeEdges(6)} labels={['1', '2', '3', '4', '5', '6']} r={10} />
    <text x="190" y="75" fontSize="11" textAnchor="middle" fill={G_RED} fontWeight="bold">élek száma:</text>
    <text x="190" y="95" fontSize="16" textAnchor="middle" fill={G_RED} fontWeight="bold">?</text>
  </QSVG>
);

const FIG_DEG = (
  <QSVG>
    <GraphDraw pts={B3_PTS} edges={B3_EDGES} r={5} />
  </QSVG>
);

const FIG_7EDGES = (
  <QSVG>
    <GraphDraw
      pts={[
        [50, 40],
        [150, 35],
        [200, 100],
        [120, 135],
        [40, 115]
      ]}
      edges={[
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 0],
        [0, 2],
        [1, 3]
      ]}
      labels={['A', 'B', 'C', 'D', 'E']}
    />
    <text x="205" y="30" fontSize="10.5" textAnchor="middle" fill={G_RED} fontWeight="bold">Σ fok = ?</text>
  </QSVG>
);

const FIG_DICE = (
  <QSVG h={110}>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={40 + i * 60} y="30" width="44" height="44" rx="8" fill="#fff" stroke={G_BLUE} strokeWidth="2" />
        <text x={62 + i * 60} y="58" fontSize="16" fontWeight="bold" textAnchor="middle" fill={G_INK}>?</text>
        <text x={62 + i * 60} y="92" fontSize="10" textAnchor="middle" fill="#475569">{i + 1}. dobás</text>
      </g>
    ))}
  </QSVG>
);

const FIG_DIGITS = (
  <QSVG h={110}>
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i}>
        <rect x={30 + i * 38} y="30" width="32" height="38" rx="6" fill="#fff" stroke={G_BLUE} strokeWidth="1.8" />
        <text x={46 + i * 38} y="55" fontSize="14" fontWeight="bold" textAnchor="middle" fill={G_INK}>?</text>
        {i < 4 && (
          <text x={65 + i * 38} y="54" fontSize="12" textAnchor="middle" fill={G_RED} fontWeight="bold">
            &gt;
          </text>
        )}
      </g>
    ))}
    <text x="120" y="92" fontSize="10.5" textAnchor="middle" fill="#475569">minden jegy nagyobb a rákövetkezőnél</text>
  </QSVG>
);

const FIG_ROW8 = (
  <QSVG h={110}>
    {Array.from({ length: 8 }, (_, i) => (
      <g key={i}>
        <rect x={16 + i * 27} y="36" width="23" height="30" rx="5" fill={i === 0 || i === 7 ? '#fde68a' : '#fff'} stroke="#64748b" />
        <text x={27.5 + i * 27} y="56" fontSize="10" textAnchor="middle" fill={G_INK}>{i === 0 || i === 7 ? 'A?' : ''}</text>
      </g>
    ))}
    <text x="120" y="90" fontSize="10.5" textAnchor="middle" fill="#475569">Arnold (A) valamelyik szélső székre ül</text>
  </QSVG>
);

export const COMBINATORICS_GRAPHS_SUMMARY_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'cg-q1',
    questionTypeBadge: 'Faktoriális',
    level: 1,
    question: 'Hányféle sorrendben állhat sorba 5 különböző ember?',
    options: ['120', '25', '15', '60'],
    correctAnswer: 0,
    explanation: '5! = 5 · 4 · 3 · 2 · 1 = 120. (A 15 az 1 + 2 + … + 5 összeg lenne.)'
  },
  {
    id: 'cg-q2',
    questionTypeBadge: 'Faktoriális',
    level: 1,
    question: 'Mennyi 0! értéke?',
    options: ['1', '0', 'nincs értelmezve', '10'],
    correctAnswer: 0,
    explanation: 'Megállapodás szerint 0! = 1; így pl. (n alatt 0) = n! / (0! · n!) = 1.'
  },
  {
    id: 'cg-q3',
    questionTypeBadge: 'Variáció',
    level: 1,
    question: 'Egy versenyen 8 versenyző indul. Hányféleképpen alakulhat az első három helyezés, ha nincs holtverseny?',
    options: ['336', '56', '512', '24'],
    correctAnswer: 0,
    explanation: 'Számít a sorrend, és senki sem lehet két helyen: 8 · 7 · 6 = 336. (56 = (8 alatt 3) a sorrend nélküli eset.)'
  },
  {
    id: 'cg-q4',
    questionTypeBadge: 'Ismétléses variáció',
    figure: FIG_DICE,
    level: 1,
    question: 'Háromszor dobunk egy dobókockával, és sorban felírjuk az eredményeket. Hány különböző sorozat lehetséges?',
    options: ['216', '18', '120', '20'],
    correctAnswer: 0,
    explanation: 'Mindhárom dobás 6-féle lehet, és az eredmények ismétlődhetnek: 6³ = 216.'
  },
  {
    id: 'cg-q5',
    questionTypeBadge: 'Kombináció',
    level: 1,
    question: '8 gyerek közül hányféleképpen választhatunk ki egy 3 fős csoportot (a sorrend nem számít)?',
    options: ['56', '336', '24', '512'],
    correctAnswer: 0,
    explanation: '(8 alatt 3) = 8 · 7 · 6 / 3! = 336 / 6 = 56.'
  },
  {
    id: 'cg-q6',
    questionTypeBadge: 'Binomiális együttható',
    level: 1,
    question: 'Melyik egyenlő (10 alatt 3)-mal?',
    options: ['(10 alatt 7)', '(7 alatt 3)', '(10 alatt 4)', '(3 alatt 10)'],
    correctAnswer: 0,
    explanation: '(n alatt k) = (n alatt n − k): 3 elem kiválasztása ugyanannyiféle, mint a maradó 7 kiválasztása. Mindkettő 120.'
  },
  {
    id: 'cg-q7',
    questionTypeBadge: 'Teljes gráf',
    figure: FIG_K6,
    level: 1,
    question: '6 cégvezető közül mindenki mindenkivel pontosan egyszer kezet fog. Hány kézfogás történik?',
    options: ['15', '30', '36', '12'],
    correctAnswer: 0,
    explanation: '6 · 5 = 30, de minden kézfogást kétszer számoltunk: 30 / 2 = 15 = (6 alatt 2).'
  },
  {
    id: 'cg-q8',
    questionTypeBadge: 'Teljes gráf',
    figure: FIG_DEG,
    level: 1,
    question: 'Az ábrán látható gráfot hány éllel kell kiegészíteni ahhoz, hogy bármely két csúcsa között pontosan egy él fusson? (B3. a))',
    options: ['19', '28', '9', '20'],
    correctAnswer: 0,
    explanation: 'A gráfnak 8 csúcsa és 9 éle van. A 8 csúcsú teljes gráf éleinek száma 8 · 7 / 2 = 28, tehát 28 − 9 = 19 él hiányzik. (A 28 a teljes gráf élszáma, nem a hiányzó élek száma.)'
  },
  {
    id: 'cg-q9',
    questionTypeBadge: 'Fokszámtétel',
    figure: FIG_7EDGES,
    level: 1,
    question: 'Egy gráfnak 7 éle van. Mennyi a csúcsok fokszámának összege?',
    options: ['14', '7', '21', '49'],
    correctAnswer: 0,
    explanation: 'A fokszámok összege az élek számának kétszerese: 2 · 7 = 14.'
  },
  {
    id: 'cg-q10',
    questionTypeBadge: 'Részhalmazok',
    level: 1,
    question: 'A 63 pozitív osztói: 1; 3; 7; 9; 21; 63. Hányféleképpen választhatunk ki közülük valahányat, ha legalább egyet kiválasztunk, és a sorrend nem számít? (P2. c))',
    options: ['63', '64', '6', '720'],
    correctAnswer: 0,
    explanation: 'A 6 elemű halmaz részhalmazainak száma 2⁶ = 64; ebből az üres halmazt el kell hagyni: 64 − 1 = 63. (720 = 6! a sorba rendezések száma.)'
  },
  // ---------- 2. szint ----------
  {
    id: 'cg-q11',
    questionTypeBadge: 'Sorrend feltétellel',
    level: 2,
    question: 'Hét ember (köztük Péter) egyesével lép be egy terembe. Hányféle sorrendben léphetnek be, ha Péter nem másodikként lép be?',
    options: ['4320', '5040', '720', '4200'],
    correctAnswer: 0,
    explanation: 'Összes sorrend 7! = 5040; ebből Péter második: 6! = 720. 5040 − 720 = 4320.'
  },
  {
    id: 'cg-q12',
    questionTypeBadge: 'Komplementer módszer',
    level: 2,
    question: 'Hány olyan négyjegyű pozitív egész szám van, amelyben szerepel az 5-ös számjegy?',
    options: ['3168', '5832', '3439', '3000'],
    correctAnswer: 0,
    explanation: 'Négyjegyű szám 9000 van; 5-ös nélkül 8 · 9 · 9 · 9 = 5832. 9000 − 5832 = 3168. (3439 = 10⁴ − 9⁴ a 0-val kezdődőket is számolná.)'
  },
  {
    id: 'cg-q13',
    questionTypeBadge: 'Ismeretségek',
    level: 2,
    question: 'Egy 4 fős és egy 5 fős család nyaral együtt; kezdetben csak a családtagok ismerik egymást. Hány ismeretség van a 9 ember között a nyaralás kezdetén?',
    options: ['16', '36', '20', '26'],
    correctAnswer: 0,
    explanation: '(4 alatt 2) + (5 alatt 2) = 6 + 10 = 16. A végén, amikor mindenki ismer mindenkit: (9 alatt 2) = 36.'
  },
  {
    id: 'cg-q14',
    questionTypeBadge: 'Részhalmazok',
    level: 2,
    question: 'Hány részhalmaza van a 15-nél kisebb pozitív páros számok halmazának?',
    options: ['128', '64', '256', '127'],
    correctAnswer: 0,
    explanation: 'A halmaz {2; 4; 6; 8; 10; 12; 14}, 7 elemű, így 2⁷ = 128 részhalmaza van.'
  },
  {
    id: 'cg-q15',
    questionTypeBadge: 'Részhalmazok',
    level: 2,
    question: 'Egy kerékpáros lámpában 5 LED van, bekapcsoláskor legalább egy világít. Hányféleképpen világíthat a lámpa (két világítás különbözik, ha nem ugyanazok a LED-ek égnek)?',
    options: ['31', '32', '5', '120'],
    correctAnswer: 0,
    explanation: 'Minden LED ég vagy nem: 2⁵ = 32; ebből levonjuk, amikor egyik sem ég: 31.'
  },
  {
    id: 'cg-q16',
    questionTypeBadge: 'Ismétléses variáció',
    level: 2,
    question: 'Az 5 LED-es lámpában mindegyik LED fehéren vagy pirosan világíthat, vagy nem ég; legalább egy világít. Hány lehetőség van?',
    options: ['242', '243', '62', '31'],
    correctAnswer: 0,
    explanation: 'Minden LED 3 állapotú: 3⁵ = 243; levonva a „semmi sem ég” esetet: 242.'
  },
  {
    id: 'cg-q17',
    questionTypeBadge: 'Sorrend feltétellel',
    figure: FIG_ROW8,
    level: 2,
    question: 'Egy 8 fős társaság (köztük Arnold) egy 8 üléses sorba ül le. Hányféleképpen, ha Arnold a sor valamelyik szélén ül?',
    options: ['10 080', '5040', '40 320', '2520'],
    correctAnswer: 0,
    explanation: 'Arnold 2 helyre ülhet, a többi 7 ember 7! = 5040-féleképpen: 2 · 5040 = 10 080.'
  },
  {
    id: 'cg-q18',
    questionTypeBadge: 'Részhalmazok',
    level: 2,
    question: 'Egy 10 elemű halmaznak hány olyan részhalmaza van, amelynek legalább 7 eleme van?',
    options: ['176', '120', '56', '386'],
    correctAnswer: 0,
    explanation: '(10 alatt 7) + (10 alatt 8) + (10 alatt 9) + (10 alatt 10) = 120 + 45 + 10 + 1 = 176.'
  },
  {
    id: 'cg-q19',
    questionTypeBadge: 'Gráf élszáma',
    level: 2,
    question: 'Egy gráf csúcsai a kocka lapjai, két csúcs között akkor fut él, ha a lapok szomszédosak. Hány éle van a gráfnak?',
    options: ['12', '6', '24', '15'],
    correctAnswer: 0,
    explanation: 'Minden lapnak 4 szomszédja van: 6 · 4 / 2 = 12 él (a kocka éleinek száma is 12).'
  },
  {
    id: 'cg-q20',
    questionTypeBadge: 'Számjegyek',
    level: 2,
    question: 'Hány olyan ötjegyű szám van, amelynek mindegyik számjegye különböző?',
    options: ['27 216', '30 240', '15 120', '59 049'],
    correctAnswer: 0,
    explanation: 'Az első jegy 9-féle (nem 0), a többi 9, 8, 7, 6: 9 · 9 · 8 · 7 · 6 = 27 216. (30 240 = 10 · 9 · 8 · 7 · 6 a 0-val kezdődőket is számolja.)'
  },
  // ---------- 3. szint ----------
  {
    id: 'cg-q21',
    questionTypeBadge: 'Kombináció',
    figure: FIG_DIGITS,
    level: 3,
    question: 'Hány olyan ötjegyű szám van, amelynek az utolsót kivéve mindegyik számjegye nagyobb a rákövetkezőnél?',
    options: ['252', '30 240', '126', '120'],
    correctAnswer: 0,
    explanation: 'Bármely 5 különböző számjegyből pontosan egy csökkenő szám képezhető (a 0 a végére kerül), így (10 alatt 5) = 252.'
  },
  {
    id: 'cg-q22',
    questionTypeBadge: 'Részhalmazok',
    level: 3,
    question: 'A 6 cégvezető 15 kézfogásáról készült fotók közül a szerkesztők kiválasztják, melyek kerülnek a honlapra (legalább egy). Hányféleképpen tehetik?',
    options: ['32 767', '32 768', '225', '15'],
    correctAnswer: 0,
    explanation: 'Minden fotó felkerül vagy nem: 2¹⁵ = 32 768, ebből levonjuk az üres választást: 32 767.'
  },
  {
    id: 'cg-q23',
    questionTypeBadge: 'Több kiválasztás',
    level: 3,
    question: 'Egy 34 fős osztály 2 képviselőt és 4 felelőst választ (a sorrend nem számít, senki sem kap két tisztséget). Hányféle lehet az eredmény?',
    options: ['20 173 560', '26 016 936', '1 344 904', '36 521'],
    correctAnswer: 0,
    explanation: '(34 alatt 2) · (32 alatt 4) = 561 · 35 960 = 20 173 560. A 26 016 936 megengedné a két tisztséget; az 1 344 904 = (34 alatt 6) nem különbözteti meg a tisztségeket.'
  },
  {
    id: 'cg-q24',
    questionTypeBadge: 'Kockadobás',
    level: 3,
    question: 'Egy kockát háromszor dobunk, a sorrend számít. Hány esetben lesz a három szám között pontosan kettő egyforma?',
    options: ['90', '120', '30', '15'],
    correctAnswer: 0,
    explanation: 'Összes 216, mind egyforma 6, mind különböző 6 · 5 · 4 = 120: 216 − 6 − 120 = 90. (Közvetlenül: 3 · 6 · 5 = 90.)'
  },
  {
    id: 'cg-q25',
    questionTypeBadge: 'Legalább',
    level: 3,
    question: 'Egy zsákban 10 fehér és 20 más színű golyó van. Ötöt húzunk visszatevés nélkül. Hány olyan húzás van, amelyben legalább 2 golyó fehér?',
    options: ['78 552', '147 420', '142 506', '63 954'],
    correctAnswer: 0,
    explanation: 'Összes (30 alatt 5) = 142 506; nincs fehér: (20 alatt 5) = 15 504; pontosan 1 fehér: 10 · (20 alatt 4) = 48 450. 142 506 − 15 504 − 48 450 = 78 552. (147 420 = (10 alatt 2) · (28 alatt 3) többször számol.)'
  },
  {
    id: 'cg-q26',
    questionTypeBadge: 'Egyenlet binomiálissal',
    level: 3,
    question: 'Az A halmaz kételemű részhalmazainak száma 1575-tel több, mint az egyelemű részhalmazai számának 50-szerese. Hány elemű A?',
    options: ['126', '101', '50', '75'],
    correctAnswer: 0,
    explanation: 'n(n − 1)/2 = 50n + 1575 ⇒ n² − 101n − 3150 = 0 ⇒ n = 126 (a másik gyök −25).'
  },
  {
    id: 'cg-q27',
    questionTypeBadge: 'Számjegyek',
    level: 3,
    question: 'Hány olyan hatjegyű szám van, amelyben a számjegyek különbözők, és balról jobbra növekvő sorrendben követik egymást?',
    options: ['84', '210', '60 480', '126'],
    correctAnswer: 0,
    explanation: 'A 0 nem lehet benne (az állna elöl), így az 1–9 jegyekből választunk 6-ot: (9 alatt 6) = 84. A 210 = (10 alatt 6) a 0-t is megengedné.'
  },
  {
    id: 'cg-q28',
    questionTypeBadge: 'Fokszámtétel',
    level: 3,
    question: '7 vállalkozás pályázik, minden projektben pontosan 2 dolgozik együtt. Miért nem lehet, hogy mind a 7 pontosan 3 projektben vesz részt?',
    options: [
      'mert a fokszámok összege 7 · 3 = 21 lenne, ami páratlan',
      'mert 7 vállalkozásból csak (7 alatt 2) = 21 pár képezhető',
      'mert 3 projekthez legalább 8 vállalkozás kell',
      'mert egy gráfban nem lehet minden csúcs fokszáma azonos'
    ],
    correctAnswer: 0,
    explanation: 'Csúcs = vállalkozás, él = projekt. A fokszámok összege az élszám kétszerese, tehát páros; 21 nem lehet. (Azonos fokszámú gráf létezik, pl. a teljes gráf.)'
  },
  {
    id: 'cg-q29',
    questionTypeBadge: 'Gráf és kombináció',
    level: 3,
    question: 'A 7 vállalkozás közül 4 három, 3 pedig két projektben vett részt (minden projektben 2 vállalkozás). Hányféleképpen választható ki ellenőrzésre 4 projekt?',
    options: ['126', '3024', '35', '210'],
    correctAnswer: 0,
    explanation: 'Fokszámösszeg 4 · 3 + 3 · 2 = 18 ⇒ 9 projekt (él). (9 alatt 4) = 126. (35 = (7 alatt 4) a vállalkozásokat választaná.)'
  },
  {
    id: 'cg-q30',
    questionTypeBadge: 'Szimmetria',
    level: 3,
    question: '5 gyerek (köztük Anna és Péter) úszóversenyt rendez, holtverseny nincs. Hány végeredmény lehet, ha Anna előrébb végez, mint Péter?',
    options: ['60', '120', '24', '30'],
    correctAnswer: 0,
    explanation: 'A 120 sorrend fele-fele arányban oszlik meg aszerint, hogy Anna vagy Péter végez előrébb: 120 / 2 = 60.'
  }
];

export const CombinatoricsGraphsSummaryQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId="g12-sum-kombinatorika-grafok-quiz"
      subtopicId="kombinatorika-grafok"
      title="2. Kombinatorika, gráfok – Kvíz"
      subtitle="30 érettségi típusú kérdés 3 szinten: sorba rendezés, kiválasztás, binomiális együtthatók, részhalmazok, gráfok, fokszámtétel."
      badge="12. OSZTÁLY • IV. RENDSZEREZŐ ÖSSZEFOGLALÁS • KVÍZ"
      questions={COMBINATORICS_GRAPHS_SUMMARY_QUESTIONS}
      cheatSheets={[
        {
          title: 'Sorrend számít',
          items: ['n elem sorba: n!', 'k-t n-ből, ismétlés nélkül: n · (n − 1) · … · (n − k + 1)', 'ismétléssel: nᵏ', '0! = 1']
        },
        {
          title: 'Sorrend nem számít',
          items: ['(n alatt k) = n! / (k! · (n − k)!)', '(n alatt k) = (n alatt n − k)', 'k elemű részhalmazok: (n alatt k)', 'összes részhalmaz: 2ⁿ']
        },
        {
          title: 'Gráfok',
          items: ['fokszám: a csúcsból induló élek száma', 'Σ fokszám = 2 · élek száma', 'n pontú teljes gráf: (n alatt 2) él', '„Legalább” → komplementer módszer']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <CombinatoricsGraphsSummaryMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <CombinatoricsGraphsSummarySorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default CombinatoricsGraphsSummaryQuiz;
