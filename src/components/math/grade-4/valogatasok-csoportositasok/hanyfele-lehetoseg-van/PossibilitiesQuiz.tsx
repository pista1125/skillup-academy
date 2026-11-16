import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { PossibilitiesMatcher } from './PossibilitiesMatcher';
import { PossibilitiesSorter } from './PossibilitiesSorter';
import { RunnersTreeSvg, PodiumSvg, PairsSvg, NapkinsSvg, NumberCardsSvg } from './PossibilitiesFigures';
import { LogicBlock, BlockColor, BlockShape } from '../valogatasok-halmazokba/SetSortingFigures';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const QCLS = 'w-full max-w-[300px] h-auto mx-auto';

const FIG_TREE_Q = <RunnersTreeSvg className={QCLS} hideLeaves />;
const FIG_PODIUM_A = <PodiumSvg className={QCLS} names={['A', '?', '?']} />;
const FIG_PODIUM = <PodiumSvg className={QCLS} />;
const FIG_LAKES4 = <PairsSvg className={QCLS} labels={['A', 'B', 'C', 'D']} showLines={false} />;
const FIG_LAKES5 = <PairsSvg className={QCLS} showLines={false} />;
const FIG_FRIENDS3 = <PairsSvg className={QCLS} labels={['Á', 'B', 'C']} showLines={false} />;
const FIG_NAPKINS = <NapkinsSvg className={QCLS} />;
const FIG_CARDS12 = <NumberCardsSvg className="w-full max-w-[160px] h-auto mx-auto" digits={['1', '2']} />;
const FIG_CARDS123 = <NumberCardsSvg className="w-full max-w-[220px] h-auto mx-auto" />;
const FIG_CARDS057 = <NumberCardsSvg className="w-full max-w-[220px] h-auto mx-auto" digits={['0', '5', '7']} />;

const blocksFig = (colors: BlockColor[], shapes: BlockShape[]) => (
  <svg viewBox="0 0 300 100" className={QCLS} fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="296" height="96" rx="10" fill="#f5f3ff" />
    <text x="12" y="22" fontSize="11" fontWeight="bold" fill="#4c1d95">
      Színek:
    </text>
    {colors.map((c, i) => (
      <g key={c}>
        <LogicBlock x={86 + i * 46} y={20} shape="négyzet" color={c} s={18} />
        <text x={86 + i * 46} y={42} fontSize="9" textAnchor="middle" fill="#334155">
          {c}
        </text>
      </g>
    ))}
    <text x="12" y="74" fontSize="11" fontWeight="bold" fill="#4c1d95">
      Alakok:
    </text>
    {shapes.map((s, i) => (
      <g key={s}>
        <LogicBlock x={86 + i * 56} y={70} shape={s} color="sárga" s={18} />
        <text x={86 + i * 56} y={92} fontSize="9" textAnchor="middle" fill="#334155">
          {s}
        </text>
      </g>
    ))}
  </svg>
);

const FIG_HATS = (
  <svg viewBox="0 0 300 110" className={QCLS} fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="296" height="106" rx="10" fill="#f0fdf4" />
    <text x="70" y="20" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#166534">
      sapkák
    </text>
    <text x="220" y="20" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#166534">
      sálak
    </text>
    {['#ef4444', '#3b82f6'].map((c, i) => (
      <path key={c} d={`M ${30 + i * 50} 70 Q ${50 + i * 50} 28 ${70 + i * 50} 70 Z`} fill={c} stroke="#334155" />
    ))}
    {['#ef4444', '#3b82f6'].map((c, i) => (
      <circle key={c + 'b'} cx={50 + i * 50} cy={34} r="5" fill="#fff" stroke="#334155" />
    ))}
    <g>
      <rect x="180" y="40" width="80" height="14" fill="#fde68a" stroke="#334155" />
      {[0, 1, 2, 3].map((k) => (
        <rect key={k} x={188 + k * 18} y="40" width="8" height="14" fill="#16a34a" />
      ))}
      <rect x="180" y="70" width="80" height="14" fill="#e9d5ff" stroke="#334155" />
      {[0, 1, 2, 3, 4].map((k) => (
        <circle key={k} cx={188 + k * 16} cy="77" r="3" fill="#7c3aed" />
      ))}
    </g>
    <text x="220" y="100" fontSize="9.5" textAnchor="middle" fill="#334155">
      csíkos · pöttyös
    </text>
    <text x="70" y="90" fontSize="9.5" textAnchor="middle" fill="#334155">
      piros · kék
    </text>
  </svg>
);

const FIG_MENU = (
  <svg viewBox="0 0 300 100" className={QCLS} fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="296" height="96" rx="10" fill="#fffbeb" stroke="#fcd34d" />
    <text x="76" y="22" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#92400e">
      Levesek
    </text>
    <text x="224" y="22" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#92400e">
      Főételek
    </text>
    {['🍅 paradicsomleves', '🥕 zöldségleves', '🍲 gulyásleves'].map((t, i) => (
      <text key={t} x="20" y={44 + i * 20} fontSize="11" fill="#1e293b">
        {t}
      </text>
    ))}
    {['🍝 spagetti', '🍗 rántott hús'].map((t, i) => (
      <text key={t} x="176" y={44 + i * 20} fontSize="11" fill="#1e293b">
        {t}
      </text>
    ))}
  </svg>
);

const FIG_FLAG = (
  <svg viewBox="0 0 300 100" className={QCLS} fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="296" height="96" rx="10" fill="#f8fafc" stroke="#e2e8f0" />
    <line x1="40" y1="14" x2="40" y2="90" stroke="#475569" strokeWidth="3" />
    <rect x="42" y="16" width="80" height="24" fill="#ffffff" stroke="#475569" />
    <rect x="42" y="40" width="80" height="24" fill="#ffffff" stroke="#475569" />
    <text x="82" y="33" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#dc2626">
      ?
    </text>
    <text x="82" y="57" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#dc2626">
      ?
    </text>
    {[
      ['#ef4444', 'piros'],
      ['#ffffff', 'fehér'],
      ['#22c55e', 'zöld']
    ].map(([c, t], i) => (
      <g key={t}>
        <rect x={160 + i * 44} y="30" width="30" height="22" fill={c} stroke="#475569" />
        <text x={175 + i * 44} y="68" fontSize="10" textAnchor="middle" fill="#334155">
          {t}
        </text>
      </g>
    ))}
  </svg>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const POSSIBILITIES_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'pv-q1',
    level: 1,
    questionTypeBadge: 'Sorrend',
    question: 'Máté, Bence és Gergő egy csapatban versenyez a sorversenyen. Hányféle sorrendben versenyezhetnek?',
    options: ['6', '3', '9', '4'],
    correctAnswer: 0,
    explanation: 'Kezdőbetűkkel: MBG, MGB, BMG, BGM, GMB, GBM. Mindegyik fiúval 2 sorrend kezdődik: 3 · 2 = 6.'
  },
  {
    id: 'pv-q2',
    level: 1,
    questionTypeBadge: 'Dobogó',
    figure: FIG_PODIUM_A,
    question: 'Anna, Bianka és Cecília áll a dobogón. Anna lett az első. Hányféleképpen állhat a másik kettő a 2. és a 3. helyen?',
    options: ['2', '3', '1', '6'],
    correctAnswer: 0,
    explanation: 'A 2. hely lehet Bianka vagy Cecília, a 3. helyre a másik kerül: A–B–C vagy A–C–B. Ez 2 lehetőség.'
  },
  {
    id: 'pv-q3',
    level: 1,
    questionTypeBadge: 'Elágazásos rajz',
    figure: FIG_TREE_Q,
    question: 'Dániel fut be elsőnek. Hány különböző sorrendet mutat ez az elágazásos rajz?',
    options: ['6', '3', '4', '24'],
    correctAnswer: 0,
    explanation: 'Számold meg az ágvégeket! A 2. helyre 3 fiú jöhet, mindegyik után 2 lehetőség marad: 3 · 2 = 6 sorrend.'
  },
  {
    id: 'pv-q4',
    level: 1,
    questionTypeBadge: 'Sorrend',
    question: 'Anna szülei közrefogják a kisfiút, fogják a kezét. Hányféleképpen haladhatnak hárman egymás mellett?',
    options: ['2', '1', '3', '6'],
    correctAnswer: 0,
    explanation: 'A kisfiú mindig középen van. Apa lehet bal oldalt vagy jobb oldalt: apa–fiú–anya vagy anya–fiú–apa. Ez 2 lehetőség.'
  },
  {
    id: 'pv-q5',
    level: 1,
    questionTypeBadge: 'Csoportok',
    question: 'Kitti a ceruzákat előbb szín szerint (kékek, nem kékek), aztán radír szerint (radíros, nem radíros) válogatta. Hány csoportot kapott?',
    options: ['4', '2', '3', '8'],
    correctAnswer: 0,
    explanation: 'Mindkét színcsoport kettéválik: 2 · 2 = 4 csoport (kék radíros, kék nem radíros, nem kék radíros, nem kék nem radíros).'
  },
  {
    id: 'pv-q6',
    level: 1,
    questionTypeBadge: 'Számkártyák',
    figure: FIG_CARDS12,
    question: 'Hány kétjegyű számot rakhatsz ki az 1-es és a 2-es kártyával, ha mindkettőt felhasználod?',
    options: ['2', '1', '4', '3'],
    correctAnswer: 0,
    explanation: 'Elöl állhat az 1-es vagy a 2-es: 12 és 21. Ez 2 szám.'
  },
  {
    id: 'pv-q7',
    level: 1,
    questionTypeBadge: 'Hiányzó lehetőség',
    question: 'Három gyerek (A, B, C) sorrendjeit írtuk fel: ABC, ACB, BAC, BCA, CAB. Melyik hiányzik?',
    options: ['CBA', 'ABC', 'BAC', 'ACC'],
    correctAnswer: 0,
    explanation: 'A C-vel kezdődők közül csak a CAB van meg. Hiányzik a CBA. (Az ACC nem jó, mert C kétszer szerepel benne.)'
  },
  {
    id: 'pv-q8',
    level: 1,
    questionTypeBadge: 'Párosítás',
    figure: FIG_HATS,
    question: 'Van 2 sapkád (piros, kék) és 2 sálad (csíkos, pöttyös). Hányféleképpen veheted fel egy sapkával és egy sállal?',
    options: ['4', '2', '3', '6'],
    correctAnswer: 0,
    explanation: 'Mindkét sapkához 2 sál választható: piros–csíkos, piros–pöttyös, kék–csíkos, kék–pöttyös. 2 · 2 = 4.'
  },
  {
    id: 'pv-q9',
    level: 1,
    questionTypeBadge: 'Párok',
    figure: FIG_FRIENDS3,
    question: 'Ádám, Bori és Cili párokban játszik. Hány különböző pár alakítható? (ÁB ugyanaz, mint BÁ.)',
    options: ['3', '6', '2', '9'],
    correctAnswer: 0,
    explanation: 'ÁB, ÁC, BC – ez 3 pár. A BÁ, CÁ, CB nem új pár, mert ugyanazok a gyerekek.'
  },
  {
    id: 'pv-q10',
    level: 1,
    questionTypeBadge: 'Menü',
    figure: FIG_MENU,
    question: 'A menzán 3-féle levesből és 2-féle főételből lehet választani (egy levest és egy főételt). Hányféle ebéd állítható össze?',
    options: ['6', '5', '3', '9'],
    correctAnswer: 0,
    explanation: 'Mindegyik leveshez 2 főétel választható: 3 · 2 = 6. (Az 5 hiba: összeadtuk a 3-at és a 2-t.)'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'pv-q11',
    level: 2,
    questionTypeBadge: 'Számkártyák',
    figure: FIG_CARDS123,
    question: 'Melyik számot NEM lehet kirakni az 1, 2, 3 kártyával, ha mindegyiket pontosan egyszer használod?',
    options: ['322', '132', '213', '321'],
    correctAnswer: 0,
    explanation: 'A 322-ben kétszer van 2-es, de csak egy 2-es kártyánk van. A többi szám mindhárom kártyát egyszer használja.'
  },
  {
    id: 'pv-q12',
    level: 2,
    questionTypeBadge: 'Számkártyák',
    figure: FIG_CARDS123,
    question: 'Hány háromjegyű szám rakható ki az 1, 2, 3 kártyával (mindegyiket egyszer használva)?',
    options: ['6', '3', '9', '27'],
    correctAnswer: 0,
    explanation: '123, 132, 213, 231, 312, 321 – ez 6 szám. Mindegyik számjeggyel 2 szám kezdődik: 3 · 2 = 6.'
  },
  {
    id: 'pv-q13',
    level: 2,
    questionTypeBadge: 'Számkártyák',
    figure: FIG_CARDS057,
    question: 'Hány háromjegyű szám rakható ki a 0, 5, 7 kártyával (mindegyiket egyszer használva)?',
    options: ['4', '6', '3', '2'],
    correctAnswer: 0,
    explanation: 'A 0 nem állhat elöl: 507, 570, 705, 750. Ez 4 szám. (A 057 és a 075 nem háromjegyű.)'
  },
  {
    id: 'pv-q14',
    level: 2,
    questionTypeBadge: 'Logikai lapok',
    figure: blocksFig(['piros', 'kék'], ['kör', 'háromszög', 'négyzet']),
    question: 'Minden színből minden alakot elkészítünk. Hányféle logikai lap lesz?',
    options: ['6', '5', '3', '8'],
    correctAnswer: 0,
    explanation: 'Mindkét színhez 3 alak tartozik: 2 · 3 = 6 lap. (Az 5 az összeadás hibája: 2 + 3.)'
  },
  {
    id: 'pv-q15',
    level: 2,
    questionTypeBadge: 'Logikai lapok',
    figure: blocksFig(['piros', 'kék', 'sárga'], ['kör']),
    question: 'Piros, kék és sárga köröket gyártunk, mindegyik színből lyukasat is és nem lyukasat is. Hányféle kör lesz?',
    options: ['6', '5', '3', '4'],
    correctAnswer: 0,
    explanation: 'Minden színhez 2 lehetőség (lyukas, nem lyukas): 3 · 2 = 6 különböző kör.'
  },
  {
    id: 'pv-q16',
    level: 2,
    questionTypeBadge: 'Párok',
    figure: FIG_LAKES4,
    question: 'Az A, B, C, D tavakat párba állítjuk (AB = BA). Hány pár van?',
    options: ['6', '12', '4', '8'],
    correctAnswer: 0,
    explanation: 'Rendszerezve: AB, AC, AD, BC, BD, CD. Ez 3 + 2 + 1 = 6 pár. A 12 akkor jönne ki, ha AB-t és BA-t is számolnánk.'
  },
  {
    id: 'pv-q17',
    level: 2,
    questionTypeBadge: 'Párok',
    figure: FIG_LAKES5,
    question: 'Az A, B, C, D, E tavakat párba állítjuk (a párok ne ismétlődjenek, AB = BA). Hány pár van?',
    options: ['10', '20', '5', '15'],
    correctAnswer: 0,
    explanation: 'A-val 4 pár (AB, AC, AD, AE), B-vel 3 (BC, BD, BE), C-vel 2 (CD, CE), D-vel 1 (DE): 4 + 3 + 2 + 1 = 10.'
  },
  {
    id: 'pv-q18',
    level: 2,
    questionTypeBadge: 'Sorrend',
    question: 'Máté, Bence és Gergő mellé beállt Balázs, aki mindig utolsóként versenyez. Hányféle sorrend lehetséges most?',
    options: ['6', '24', '4', '8'],
    correctAnswer: 0,
    explanation: 'Balázs helye biztos (utolsó), ezért csak a másik három sorrendje változik: 6 lehetőség, ugyanannyi, mint előtte.'
  },
  {
    id: 'pv-q19',
    level: 2,
    questionTypeBadge: 'Sorrend',
    question: 'Zoli, Peti és Andris libasorban megy a kilátóhoz. Hányféle sorrendben mehetnek, ha Zoli halad elöl?',
    options: ['2', '3', '6', '1'],
    correctAnswer: 0,
    explanation: 'Zoli az első. Mögötte Peti–Andris vagy Andris–Peti. Ez 2 lehetőség.'
  },
  {
    id: 'pv-q20',
    level: 2,
    questionTypeBadge: 'Dobogó',
    figure: FIG_PODIUM,
    question: 'Anna, Bianka és Cecília állhatott a dobogóra (holtverseny nem volt). Hány lehetőség van összesen?',
    options: ['6', '3', '9', '4'],
    correctAnswer: 0,
    explanation: 'Az 1. hely 3-féle lehet, a 2. helyre 2 lány marad, a 3. helyre 1: 3 · 2 · 1 = 6.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'pv-q21',
    level: 3,
    questionTypeBadge: 'Sorrend',
    question: 'Alex, Barna, Csaba és Dániel versenyt fut. Hányféle sorrendben érhetnek célba, ha bárki lehet az első?',
    options: ['24', '12', '16', '6'],
    correctAnswer: 0,
    explanation: 'Ha Dániel az első, 6 sorrend van. Ugyanígy 6-6, ha Alex, Barna vagy Csaba az első: 4 · 6 = 24.'
  },
  {
    id: 'pv-q22',
    level: 3,
    questionTypeBadge: 'Feltétel',
    question: 'A négy fiú (A, B, Cs, D) futóversenyén Alex megelőzi Barnát és Csabát is. Hányféle sorrend lehet?',
    options: ['8', '6', '12', '4'],
    correctAnswer: 0,
    explanation: 'Ha D-t kihagyjuk, A–B–Cs vagy A–Cs–B a sorrend (2). Dániel ezek közé 4 helyre állhat (elöl, két fiú közé, a végére): 2 · 4 = 8.'
  },
  {
    id: 'pv-q23',
    level: 3,
    questionTypeBadge: 'Feltétel',
    question: 'A négy fiú versenyén Csaba fut be másodiknak, és Dániel előbb ér célba, mint Barna. Hány sorrend lehet?',
    options: ['3', '2', '6', '4'],
    correctAnswer: 0,
    explanation: 'A 2. hely: Cs. A többi helyre A, B, D kerül úgy, hogy D előbb legyen B-nél: A–Cs–D–B, D–Cs–A–B, D–Cs–B–A. Ez 3.'
  },
  {
    id: 'pv-q24',
    level: 3,
    questionTypeBadge: 'Választás',
    figure: FIG_NAPKINS,
    question: 'A papírboltban 5 színű szalvéta van. Hányféleképpen vásárolhatsz 3 különböző színűt? (A sorrend nem számít.)',
    options: ['10', '15', '60', '5'],
    correctAnswer: 0,
    explanation: 'Rendszerezve, kezdőbetűkkel: SPK, SPZ, SPF, SKZ, SKF, SZF, PKZ, PKF, PZF, KZF. Ez 10 lehetőség.'
  },
  {
    id: 'pv-q25',
    level: 3,
    questionTypeBadge: 'Sorrend',
    question: 'A szülők közrefogják a kisfiút. Anna, a nővére is velük sétál. Hányféleképpen haladhatnak négyen egymás mellett?',
    options: ['4', '2', '6', '24'],
    correctAnswer: 0,
    explanation: 'Apa–fiú–anya vagy anya–fiú–apa (2). Anna a sor bal vagy jobb szélére állhat (2): 2 · 2 = 4.'
  },
  {
    id: 'pv-q26',
    level: 3,
    questionTypeBadge: 'Csoportok',
    question: 'Két fiú, két lány és két kiskutya labdázik. Hárman szaladnak a labda után. Hányféle lehet a hármas, ha csak azt figyeljük, hány fiú, hány lány és hány kutya van benne?',
    options: ['7', '6', '8', '3'],
    correctAnswer: 0,
    explanation: 'F = fiú, L = lány, K = kutya: FFL, FFK, LLF, LLK, KKF, KKL és FLK. Hármat egyforma nem lehet, mert mindegyikből csak 2 van. Ez 7.'
  },
  {
    id: 'pv-q27',
    level: 3,
    questionTypeBadge: 'Ismétlés keresése',
    question: 'Négy barát (A, B, C, D) párjait írta fel Dóri: AB, AC, AD, BA, BC, BD, CD. Melyik pár szerepel kétszer?',
    options: ['BA', 'BC', 'CD', 'AD'],
    correctAnswer: 0,
    explanation: 'A BA ugyanaz a pár, mint az AB. Rendszerezve elég: AB, AC, AD, BC, BD, CD – ez 6 pár.'
  },
  {
    id: 'pv-q28',
    level: 3,
    questionTypeBadge: 'Zászló',
    figure: FIG_FLAG,
    question: 'Két csíkos zászlót festünk, a felső és az alsó csík különböző színű. 3 szín közül választhatunk (piros, fehér, zöld). Hányféle zászló lehet?',
    options: ['6', '3', '9', '5'],
    correctAnswer: 0,
    explanation: 'Itt a sorrend számít (fent piros, lent fehér ≠ fent fehér, lent piros). A felső csík 3-féle, az alsó 2-féle: 3 · 2 = 6.'
  },
  {
    id: 'pv-q29',
    level: 3,
    questionTypeBadge: 'Helyi érték',
    question: 'Kétjegyű számot készítünk: a tízesek helyére 1, 2 vagy 3 kerülhet, az egyesek helyére 4 vagy 5. Hány ilyen szám van?',
    options: ['6', '5', '9', '3'],
    correctAnswer: 0,
    explanation: '14, 15, 24, 25, 34, 35. Mindegyik tízeshez 2 egyes: 3 · 2 = 6.'
  },
  {
    id: 'pv-q30',
    level: 3,
    questionTypeBadge: 'Kézfogás',
    question: '6 barát találkozik, és mindenki mindenkivel egyszer kezet fog. Hány kézfogás lesz?',
    options: ['15', '30', '36', '12'],
    correctAnswer: 0,
    explanation: 'Az első 5 társával fog kezet, a második még 4 újjal, aztán 3, 2, 1: 5 + 4 + 3 + 2 + 1 = 15. (A 30 hiba: minden kézfogást kétszer számolnánk.)'
  }
];

export const PossibilitiesQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="valogatasok-csoportositasok"
      topicId="g4-group-lehetosegek-quiz"
      subtopicId="hanyfele-lehetoseg-van"
      title="3. Hányféle lehetőség van? – Kvíz"
      subtitle="30 feladat 3 szinten: sorrendek, elágazásos rajz, számkártyák, párok, választások, feltételes sorrendek."
      badge="4. OSZTÁLY • VI. VÁLOGATÁSOK, CSOPORTOSÍTÁSOK • KVÍZ"
      questions={POSSIBILITIES_QUESTIONS}
      cheatSheets={[
        {
          title: 'Sorrendek',
          items: ['2 elem: 2 sorrend (AB, BA).', '3 elem: 3 · 2 · 1 = 6 sorrend.', '4 elem: 4 · 3 · 2 · 1 = 24 sorrend.', 'Ha egy hely biztos, azt nem kell „választani”.']
        },
        {
          title: 'Elágazásos rajz',
          items: ['Kezdőbetűkkel írj!', 'Minden ág újra elágazik.', 'Az ágvégeket számold meg.', 'Két választás egymás után: szorozd össze (2 · 3 = 6).']
        },
        {
          title: 'Párok és választások',
          items: ['AB = BA, ha csak az számít, kik vannak együtt.', '4 elem párjai: 3 + 2 + 1 = 6.', '5 elem párjai: 4 + 3 + 2 + 1 = 10.', 'A 0-s kártya nem állhat a szám elején.']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <PossibilitiesMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <PossibilitiesSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default PossibilitiesQuiz;
