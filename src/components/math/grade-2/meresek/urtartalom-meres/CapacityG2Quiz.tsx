import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { CapacityG2Matcher } from './CapacityG2Matcher';
import { CapacityG2Sorter } from './CapacityG2Sorter';
import { CAP_FONT, JugPart, CupPart, MugPart, BucketPart, SpoonPart, BottlePart } from './CapacityG2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 120 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={CAP_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const Q: React.FC<{ x: number; y: number; size?: number; text?: string }> = ({ x, y, size = 18, text = '?' }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight="900" fill={UNK}>
    {text}
  </text>
);

const ContainersQ: React.FC = () => (
  <QFig h={110}>
    <SpoonPart cx={50} y={80} s={1.5} />
    <CupPart cx={135} y={80} s={1.4} />
    <BucketPart cx={210} y={82} s={1.1} />
    <text x="56" y="100" textAnchor="middle" fontSize="12" fontWeight="900" fill="#334155">
      kanál
    </text>
    <text x="135" y="100" textAnchor="middle" fontSize="12" fontWeight="900" fill="#334155">
      pohár
    </text>
    <text x="210" y="100" textAnchor="middle" fontSize="12" fontWeight="900" fill="#334155">
      vödör
    </text>
  </QFig>
);

const TenCupsQ: React.FC = () => (
  <QFig h={124}>
    {Array.from({ length: 10 }, (_, i) => (
      <CupPart key={i} cx={24 + (i % 5) * 26} y={i < 5 ? 52 : 100} s={0.85} label="1 dl" />
    ))}
    <text x="160" y="76" textAnchor="middle" fontSize="20" fontWeight="900" fill="#7c3aed">
      =
    </text>
    <JugPart x={180} yBottom={112} w={44} unit={9} max={10} fill={10} fontSize={12} />
  </QFig>
);

const JugQ: React.FC<{ fill: number; max?: number }> = ({ fill, max = 10 }) => {
  const unit = max === 10 ? 10 : 6;
  return (
    <QFig h={max === 10 ? 130 : 146}>
      <JugPart x={98} yBottom={max === 10 ? 118 : 134} w={60} unit={unit} max={max} fill={fill} fontSize={12} />
      <Q x={210} y={70} size={24} text="? dl" />
    </QFig>
  );
};

const PourQ: React.FC = () => (
  <QFig h={120}>
    <g transform="rotate(-35 70 60)">
      <JugPart x={40} yBottom={90} w={44} unit={6} max={10} fill={8} labels={false} />
    </g>
    <path d="M 108 44 Q 130 50 140 70" fill="none" stroke="#60a5fa" strokeWidth="5" />
    <CupPart cx={160} y={108} s={1.5} />
    <path d="M 142 70 q -6 20 -2 38 M 178 70 q 6 20 2 38" fill="none" stroke="#60a5fa" strokeWidth="3" />
    <text x="222" y="70" textAnchor="middle" fontSize="12" fontWeight="900" fill="#b91c1c">
      kifolyik!
    </text>
  </QFig>
);

const CupsToJugQ: React.FC = () => (
  <QFig h={120}>
    {Array.from({ length: 4 }, (_, i) => (
      <CupPart key={i} cx={30 + i * 34} y={96} s={1.2} />
    ))}
    <text x="166" y="76" textAnchor="middle" fontSize="20" fontWeight="900" fill="#7c3aed">
      →
    </text>
    <JugPart x={186} yBottom={108} w={44} unit={8.6} max={10} fill={10} labels={false} />
  </QFig>
);

const HalfJugQ: React.FC = () => (
  <QFig h={130}>
    <JugPart x={80} yBottom={118} w={60} unit={10} max={10} fill={5} fontSize={12} />
    <text x="200" y="64" textAnchor="middle" fontSize="15" fontWeight="900" fill="#0f172a">
      fél liter
    </text>
    <Q x={200} y={90} size={18} text="= ? dl" />
  </QFig>
);

const TwoJugsQ: React.FC<{ caption: React.ReactNode }> = ({ caption }) => (
  <QFig h={130}>
    <JugPart x={40} yBottom={100} w={44} unit={8} max={10} fill={10} fontSize={11} />
    <JugPart x={120} yBottom={100} w={44} unit={8} max={10} fill={10} fontSize={11} />
    <text x="130" y="120" textAnchor="middle" fontSize="15" fontWeight="900" fill="#0f172a">
      {caption}
    </text>
  </QFig>
);

const JugPlusCupsQ: React.FC = () => (
  <QFig h={130}>
    <JugPart x={30} yBottom={100} w={44} unit={8} max={10} fill={10} fontSize={11} />
    <text x="104" y="74" textAnchor="middle" fontSize="20" fontWeight="900" fill="#334155">
      +
    </text>
    {Array.from({ length: 4 }, (_, i) => (
      <CupPart key={i} cx={130 + i * 30} y={96} s={1} label="1 dl" />
    ))}
    <text x="130" y="124" textAnchor="middle" fontSize="14" fontWeight="900" fill="#0f172a">
      1 l 4 dl = <tspan fill={UNK}>?</tspan> dl
    </text>
  </QFig>
);

const MugVsCupQ: React.FC = () => (
  <QFig h={120}>
    <JugPart x={14} yBottom={104} w={40} unit={8.4} max={10} fill={10} labels={false} />
    {Array.from({ length: 3 }, (_, i) => (
      <MugPart key={i} cx={96 + i * 40} y={46} s={1} color="#ef4444" />
    ))}
    <text x="232" y="40" textAnchor="middle" fontSize="13" fontWeight="900" fill="#b91c1c">
      3 bögre
    </text>
    {Array.from({ length: 6 }, (_, i) => (
      <CupPart key={i} cx={86 + i * 22} y={104} s={0.75} />
    ))}
    <text x="232" y="100" textAnchor="middle" fontSize="13" fontWeight="900" fill="#1d4ed8">
      6 pohár
    </text>
  </QFig>
);

const SumJugsQ: React.FC = () => (
  <QFig h={130}>
    <JugPart x={36} yBottom={104} w={40} unit={8} max={10} fill={6} labels={false} />
    <text x="56" y="122" textAnchor="middle" fontSize="13" fontWeight="900" fill="#334155">
      6 dl
    </text>
    <text x="108" y="70" textAnchor="middle" fontSize="20" fontWeight="900" fill="#334155">
      +
    </text>
    <JugPart x={128} yBottom={104} w={40} unit={8} max={10} fill={4} labels={false} />
    <text x="148" y="122" textAnchor="middle" fontSize="13" fontWeight="900" fill="#334155">
      4 dl
    </text>
    <Q x={226} y={74} size={20} text="= ?" />
  </QFig>
);

const BottlePourQ: React.FC = () => (
  <QFig h={120}>
    <BottlePart cx={70} y={104} s={1.3} label="1 l" />
    <path d="M 100 40 Q 140 30 160 60" fill="none" stroke="#7c3aed" strokeWidth="2.5" />
    <polygon points="156,54 164,66 152,64" fill="#7c3aed" />
    <CupPart cx={180} y={104} s={1.5} label="3 dl" />
    <Q x={210} y={30} size={14} text="Mennyi marad?" />
  </QFig>
);

const CompareJugsQ: React.FC = () => (
  <QFig h={146}>
    <JugPart x={40} yBottom={134} w={52} unit={6} max={20} fill={7} fontSize={11} />
    <JugPart x={150} yBottom={134} w={52} unit={6} max={20} fill={12} fontSize={11} />
    <text x="66" y="12" textAnchor="middle" fontSize="11" fontWeight="900" fill="#334155">
      1. edény
    </text>
    <text x="176" y="12" textAnchor="middle" fontSize="11" fontWeight="900" fill="#334155">
      2. edény
    </text>
  </QFig>
);

const PartyQ: React.FC = () => (
  <QFig h={124}>
    {[
      { x: 30, f: 7, n: 'narancs', c: '#fb923c' },
      { x: 110, f: 5, n: 'alma', c: '#fde047' },
      { x: 190, f: 8, n: 'meggy', c: '#be123c' }
    ].map((d) => (
      <g key={d.n}>
        <JugPart x={d.x} yBottom={92} w={40} unit={7} max={10} fill={d.f} labels={false} />
        <rect x={d.x} y={92 - d.f * 7} width="40" height={d.f * 7} fill={d.c} opacity="0.55" />
        <text x={d.x + 20} y={108} textAnchor="middle" fontSize="12" fontWeight="900" fill="#0f172a">
          {d.f} dl
        </text>
      </g>
    ))}
  </QFig>
);

const CartonQ: React.FC = () => (
  <QFig h={120}>
    <rect x="24" y="30" width="50" height="76" rx="3" fill="#fb923c" stroke="#9a3412" strokeWidth="2" />
    <polygon points="24,30 49,14 74,30" fill="#fdba74" stroke="#9a3412" strokeWidth="2" />
    <text x="49" y="74" textAnchor="middle" fontSize="16" fontWeight="900" fill="#fff">
      2 l
    </text>
    {Array.from({ length: 4 }, (_, i) => (
      <CupPart key={i} cx={110 + i * 34} y={92} s={1.2} full={false} label="3 dl" />
    ))}
    <Q x={232} y={60} size={20} text="…?" />
  </QFig>
);

const ThermosQ: React.FC = () => (
  <QFig h={120}>
    <rect x="30" y="22" width="40" height="84" rx="10" fill="#14b8a6" stroke="#115e59" strokeWidth="2" />
    <rect x="34" y="14" width="32" height="12" rx="3" fill="#0f766e" />
    <text x="50" y="70" textAnchor="middle" fontSize="12" fontWeight="900" fill="#fff">
      fél l
    </text>
    {Array.from({ length: 3 }, (_, i) => (
      <g key={i}>
        <path d={`M ${106 + i * 44} 80 L ${110 + i * 44} 100 L ${132 + i * 44} 100 L ${136 + i * 44} 80 Z`} fill="#fef3c7" stroke="#92400e" strokeWidth="1.6" />
        <path d={`M ${136 + i * 44} 84 q 8 2 0 10`} fill="none" stroke="#92400e" strokeWidth="1.6" />
        <text x={121 + i * 44} y={114} textAnchor="middle" fontSize="10" fontWeight="900" fill="#334155">
          1 dl
        </text>
      </g>
    ))}
    <Q x={170} y={50} size={18} text="Hány csésze?" />
  </QFig>
);

const BarrelQ: React.FC = () => (
  <QFig h={120}>
    <ellipse cx="70" cy="24" rx="38" ry="8" fill="#a16207" stroke="#422006" strokeWidth="2" />
    <path d="M 32 24 Q 24 62 32 100 L 108 100 Q 116 62 108 24" fill="#ca8a04" stroke="#422006" strokeWidth="2" />
    <line x1="28" y1="48" x2="112" y2="48" stroke="#422006" strokeWidth="2" />
    <line x1="28" y1="78" x2="112" y2="78" stroke="#422006" strokeWidth="2" />
    <text x="70" y="68" textAnchor="middle" fontSize="15" fontWeight="900" fill="#fff">
      100 l
    </text>
    <text x="178" y="52" textAnchor="middle" fontSize="16" fontWeight="900" fill="#b91c1c">
      − 35 l
    </text>
    <Q x={178} y={84} size={18} text="marad: ?" />
  </QFig>
);

const ChainQ: React.FC = () => (
  <QFig h={84}>
    {[
      { x: 12, t: '14 dl', c: '#0f172a' },
      { x: 102, t: '?', c: UNK },
      { x: 192, t: '?', c: UNK }
    ].map((b, i) => (
      <g key={i}>
        <rect x={b.x} y={30} width="56" height="30" rx="10" fill="#fff" stroke="#334155" strokeWidth="2" />
        <text x={b.x + 28} y={51} textAnchor="middle" fontSize="15" fontWeight="900" fill={b.c}>
          {b.t}
        </text>
      </g>
    ))}
    {[
      { x: 70, t: '+ 6 dl' },
      { x: 160, t: '− 5 dl' }
    ].map((a) => (
      <g key={a.t}>
        <line x1={a.x} y1={45} x2={a.x + 28} y2={45} stroke="#334155" strokeWidth="2" />
        <polygon points={`${a.x + 28},40 ${a.x + 32},45 ${a.x + 28},50`} fill="#334155" />
        <text x={a.x + 16} y={26} textAnchor="middle" fontSize="11" fontWeight="900" fill="#7c3aed">
          {a.t}
        </text>
      </g>
    ))}
  </QFig>
);

const MugsQ: React.FC = () => (
  <QFig h={96}>
    {Array.from({ length: 4 }, (_, i) => (
      <MugPart key={i} cx={40 + i * 50} y={70} s={1.3} color={['#ef4444', '#3b82f6', '#16a34a', '#a855f7'][i]} label="2 dl" />
    ))}
  </QFig>
);

const TwoDrinkersQ: React.FC = () => (
  <QFig h={124}>
    <text x="60" y="20" textAnchor="middle" fontSize="13" fontWeight="900" fill="#1d4ed8">
      Bori: 5 pohár
    </text>
    {Array.from({ length: 5 }, (_, i) => (
      <CupPart key={i} cx={18 + i * 21} y={80} s={1.1} />
    ))}
    <text x="190" y="20" textAnchor="middle" fontSize="13" fontWeight="900" fill="#be185d">
      Dani: 6 pohár
    </text>
    {Array.from({ length: 6 }, (_, i) => (
      <CupPart key={i} cx={140 + i * 20} y={80} s={0.7} />
    ))}
    <Q x={130} y={110} size={14} text="Ki ivott több vizet?" />
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const CAPACITY_G2_QUESTIONS: QuizQuestion[] = [
  // ---- 1. szint ----
  {
    id: 'capg2-q1',
    level: 1,
    questionTypeBadge: 'Melyikbe fér több?',
    figure: <ContainersQ />,
    question: 'Melyikbe fér a legtöbb víz?',
    options: ['a vödörbe', 'a pohárba', 'a kanálba', 'mindbe ugyanannyi'],
    correctAnswer: 0,
    explanation: 'A vödör a legnagyobb edény, abba fér a legtöbb víz.'
  },
  {
    id: 'capg2-q2',
    level: 1,
    questionTypeBadge: 'Liter és deciliter',
    figure: <TenCupsQ />,
    question: 'Hány deciliter 1 liter?',
    options: ['10', '100', '1', '5'],
    correctAnswer: 0,
    explanation: '10 darab 1 dl-es pohár tölti meg az 1 l-es edényt. 1 l = 10 dl.'
  },
  {
    id: 'capg2-q3',
    level: 1,
    questionTypeBadge: 'Mérőeszköz',
    question: 'Mivel mérjük meg, mennyi víz fér egy edénybe?',
    options: ['mérőpohárral', 'mérleggel', 'vonalzóval', 'órával'],
    correctAnswer: 0,
    explanation: 'Az űrtartalmat mérőpohárral, mérőedénnyel mérjük.'
  },
  {
    id: 'capg2-q4',
    level: 1,
    questionTypeBadge: 'Leolvasás',
    figure: <JugQ fill={4} />,
    question: 'Hány dl víz van a mérőedényben?',
    options: ['4 dl', '5 dl', '3 dl', '4 l'],
    correctAnswer: 0,
    explanation: 'Számold a vonásokat alulról: 1, 2, 3, 4. Ez 4 dl.'
  },
  {
    id: 'capg2-q5',
    level: 1,
    questionTypeBadge: 'Becslés',
    question: 'Mennyi víz fér egy vödörbe?',
    options: ['10 l', '10 dl', '10 cm', '10 kg'],
    correctAnswer: 0,
    explanation: 'Egy vödörbe sok víz fér, kb. 10 l. A 10 dl csak 1 l lenne.'
  },
  {
    id: 'capg2-q6',
    level: 1,
    questionTypeBadge: 'Áttöltés',
    figure: <PourQ />,
    question: 'A kancsóból a pohárba töltünk. A víz kifolyik. Melyikbe fér több?',
    options: ['a kancsóba', 'a pohárba', 'egyformán'],
    correctAnswer: 0,
    explanation: 'A pohár hamar megtelt, és még maradt víz. Tehát a kancsóba fér több.'
  },
  {
    id: 'capg2-q7',
    level: 1,
    questionTypeBadge: 'Becslés',
    question: 'Mennyi tej fér egy pohárba?',
    options: ['2 dl', '2 l', '20 l', '2 kg'],
    correctAnswer: 0,
    explanation: 'Egy pohárba kb. 2 dl fér. 2 l egy nagy üvegnyi lenne.'
  },
  {
    id: 'capg2-q8',
    level: 1,
    questionTypeBadge: 'Mérés pohárral',
    figure: <CupsToJugQ />,
    question: 'Zsófi pohárral töltötte tele a kancsót. Hány pohár kellett?',
    options: ['4', '3', '5', '8'],
    correctAnswer: 0,
    explanation: 'Számold meg a poharakat: 1, 2, 3, 4.'
  },
  {
    id: 'capg2-q9',
    level: 1,
    questionTypeBadge: 'Fél liter',
    figure: <HalfJugQ />,
    question: 'Hány dl a fél liter?',
    options: ['5', '50', '2', '10'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl. Ennek a fele 5 dl, mert 5 + 5 = 10.'
  },
  {
    id: 'capg2-q10',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a több: 1 l vagy 1 dl?',
    options: ['1 l', '1 dl', 'egyforma'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl. Az 1 liter tízszer annyi, mint 1 deciliter.'
  },

  // ---- 2. szint ----
  {
    id: 'capg2-q11',
    level: 2,
    questionTypeBadge: 'Leolvasás',
    figure: <JugQ fill={13} max={20} />,
    question: 'Hány dl víz van a mérőedényben?',
    options: ['13 dl', '3 dl', '12 dl', '31 dl'],
    correctAnswer: 0,
    explanation: 'Az 1 l-es vonásig 10 dl, fölötte még 3 vonás. 10 + 3 = 13 dl.'
  },
  {
    id: 'capg2-q12',
    level: 2,
    questionTypeBadge: 'Átváltás',
    figure: <TwoJugsQ caption={<>2 l = <tspan fill={UNK}>?</tspan> dl</>} />,
    question: 'Hány deciliter 2 liter?',
    options: ['20', '2', '12', '200'],
    correctAnswer: 0,
    explanation: 'Egy liter 10 dl. Két liter: 10 + 10 = 20 dl.'
  },
  {
    id: 'capg2-q13',
    level: 2,
    questionTypeBadge: 'l és dl',
    figure: <JugPlusCupsQ />,
    question: 'Hány deciliter 1 l 4 dl?',
    options: ['14', '5', '41', '104'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl. 10 dl + 4 dl = 14 dl.'
  },
  {
    id: 'capg2-q14',
    level: 2,
    questionTypeBadge: 'Bontás',
    question: 'Mennyi 15 dl literrel és deciliterrel?',
    options: ['1 l 5 dl', '5 l 1 dl', '15 l', '1 l 50 dl'],
    correctAnswer: 0,
    explanation: '15 dl = 10 dl + 5 dl. 10 dl = 1 l. Tehát 1 l 5 dl.'
  },
  {
    id: 'capg2-q15',
    level: 2,
    questionTypeBadge: 'Kisebb egység',
    figure: <MugVsCupQ />,
    question: 'Ugyanazt a kancsót 3 bögrével vagy 6 pohárral lehet megtölteni. Melyikbe fér több?',
    options: ['a bögrébe', 'a pohárba', 'egyformán'],
    correctAnswer: 0,
    explanation: 'Bögréből kevesebb kellett. Akiből kevesebb kell, abba több fér.'
  },
  {
    id: 'capg2-q16',
    level: 2,
    questionTypeBadge: 'Összeadás',
    figure: <SumJugsQ />,
    question: 'Mennyi 6 dl + 4 dl?',
    options: ['1 l', '10 l', '2 dl', '100 dl'],
    correctAnswer: 0,
    explanation: '6 dl + 4 dl = 10 dl. 10 dl = 1 l.'
  },
  {
    id: 'capg2-q17',
    level: 2,
    questionTypeBadge: 'Relációjel',
    question: 'Melyik jel kerül a ○ helyére? 8 l ○ 50 dl',
    options: ['>', '<', '='],
    correctAnswer: 0,
    explanation: '8 l = 80 dl. A 80 több, mint 50, ezért 8 l > 50 dl. Ne csak a számot nézd, hanem a mértékegységet is!'
  },
  {
    id: 'capg2-q18',
    level: 2,
    questionTypeBadge: 'Mennyi maradt?',
    figure: <BottlePourQ />,
    question: 'Egy 1 literes üvegből kitöltöttünk 3 dl-t. Mennyi maradt az üvegben?',
    options: ['7 dl', '2 dl', '4 dl', '13 dl'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl. 10 − 3 = 7, tehát 7 dl maradt.'
  },
  {
    id: 'capg2-q19',
    level: 2,
    questionTypeBadge: 'Két edény',
    figure: <CompareJugsQ />,
    question: 'Mennyivel több víz van a 2. edényben, mint az 1.-ben?',
    options: ['5 dl', '19 dl', '4 dl', '12 dl'],
    correctAnswer: 0,
    explanation: 'Az 1. edényben 7 dl, a 2.-ban 12 dl. 12 − 7 = 5 dl.'
  },
  {
    id: 'capg2-q20',
    level: 2,
    questionTypeBadge: 'Hamis mondat',
    question: 'Melyik mondat HAMIS?',
    options: ['Egy evőkanálba 5 dl leves fér.', 'Egy bögrébe kb. 2 dl tea fér.', 'Egy vödörbe kb. 10 l víz fér.', 'Egy nagy üdítős üvegben 2 l üdítő van.'],
    correctAnswer: 0,
    explanation: '5 dl fél liter – ez egy egész tányér leves! Egy kanálba sokkal kevesebb fér.'
  },

  // ---- 3. szint ----
  {
    id: 'capg2-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <PartyQ />,
    question: 'A zsúron 7 dl narancslé, 5 dl almalé és 8 dl meggylé fogyott. Hány liter ez összesen?',
    options: ['2 l', '20 l', '1 l', '3 l'],
    correctAnswer: 0,
    explanation: '7 + 5 + 8 = 20 dl. 20 dl = 2 l.'
  },
  {
    id: 'capg2-q22',
    level: 3,
    questionTypeBadge: 'Hány pohár?',
    figure: <CartonQ />,
    question: 'A dobozban 2 l gyümölcslé van. 3 dl-es poharakat töltünk tele. Hány pohár lesz tele?',
    options: ['6', '7', '5', '10'],
    correctAnswer: 0,
    explanation: '2 l = 20 dl. 3, 6, 9, 12, 15, 18 – ez 6 teli pohár, és 2 dl marad.'
  },
  {
    id: 'capg2-q23',
    level: 3,
    questionTypeBadge: 'Fél liter',
    figure: <ThermosQ />,
    question: 'A termoszban fél liter tea van. 1 dl-es csészékbe töltjük. Hány csésze lesz tele?',
    options: ['5', '10', '50', '2'],
    correctAnswer: 0,
    explanation: 'Fél liter = 5 dl. 5 dl-ből 5 csésze telik meg.'
  },
  {
    id: 'capg2-q24',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BarrelQ />,
    question: 'A 100 literes hordóból kiöntöttek 35 l vizet. Mennyi maradt benne?',
    options: ['65 l', '75 l', '135 l', '35 l'],
    correctAnswer: 0,
    explanation: '100 − 35 = 65. A hordóban 65 l maradt.'
  },
  {
    id: 'capg2-q25',
    level: 3,
    questionTypeBadge: 'Mennyi hiányzik?',
    figure: <JugQ fill={17} max={20} />,
    question: 'Mennyi víz hiányzik még, hogy 2 l legyen az edényben?',
    options: ['3 dl', '17 dl', '2 dl', '13 dl'],
    correctAnswer: 0,
    explanation: 'Az edényben 17 dl van. 2 l = 20 dl. 20 − 17 = 3 dl hiányzik.'
  },
  {
    id: 'capg2-q26',
    level: 3,
    questionTypeBadge: 'Legtöbb',
    question: 'Melyik a legtöbb?',
    options: ['1 l 2 dl', '11 dl', '1 l', '9 dl'],
    correctAnswer: 0,
    explanation: 'Írd át dl-re: 1 l 2 dl = 12 dl, 11 dl, 1 l = 10 dl, 9 dl. A 12 dl a legtöbb.'
  },
  {
    id: 'capg2-q27',
    level: 3,
    questionTypeBadge: 'Műveletsor',
    figure: <ChainQ />,
    question: 'Mi kerül az utolsó helyre? 14 dl + 6 dl − 5 dl',
    options: ['15 dl', '25 dl', '5 dl', '14 dl'],
    correctAnswer: 0,
    explanation: '14 + 6 = 20, és 20 − 5 = 15. Az utolsó helyen 15 dl áll.'
  },
  {
    id: 'capg2-q28',
    level: 3,
    questionTypeBadge: 'Bögrék',
    figure: <MugsQ />,
    question: 'Anya 4 bögre teát főzött. Mindegyik bögre 2 dl. Hány dl tea ez?',
    options: ['8 dl', '6 dl', '2 dl', '1 l'],
    correctAnswer: 0,
    explanation: '2 + 2 + 2 + 2 = 8 dl (4 · 2 = 8).'
  },
  {
    id: 'capg2-q29',
    level: 3,
    questionTypeBadge: 'Gondolkodj!',
    figure: <TwoDrinkersQ />,
    question: 'Bori 5 pohár, Dani 6 pohár vizet ivott. Biztos, hogy Dani ivott többet?',
    options: ['Nem tudjuk, a poharak mérete is számít.', 'Igen, Dani ivott többet.', 'Nem, Bori ivott többet.', 'Egyformán ittak.'],
    correctAnswer: 0,
    explanation: 'Dani pohara kisebb lehet! Csak egyforma poharaknál dönthetünk a darabszám alapján.'
  },
  {
    id: 'capg2-q30',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Petra 1 l 5 dl vizet töltött a kannába. Meglocsolt vele egy virágot, elhasznált 8 dl-t. Mennyi maradt?',
    options: ['7 dl', '13 dl', '3 dl', '6 dl'],
    correctAnswer: 0,
    explanation: '1 l 5 dl = 15 dl. 15 − 8 = 7, tehát 7 dl maradt.'
  }
];

export const CapacityG2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={2}
      chapterId="meresek"
      topicId="g2-meres-urtartalom-quiz"
      subtopicId="urtartalom-meres"
      title="3. Az űrtartalom mérése – Kvíz"
      subtitle="30 feladat 3 szinten: melyikbe fér több, liter és deciliter, mérőedény leolvasása, átváltás és szöveges feladatok."
      badge="2. OSZTÁLY • VIII. MÉRÉSEK • KVÍZ"
      questions={CAPACITY_G2_QUESTIONS}
      cheatSheets={[
        {
          title: 'Liter és deciliter',
          items: ['1 l = 10 dl', 'fél liter = 5 dl', '2 l = 20 dl', '1 l 4 dl = 14 dl']
        },
        {
          title: 'Mérőedény',
          items: ['Minden kis vonás 1 dl', 'Az 1 l-es vonás = 10 dl', 'Alulról számolj!', 'Fölötte: 10 dl + a többi']
        },
        {
          title: 'Mérés pohárral',
          items: ['Kisebb pohárból több kell', 'Csak egyforma poharakat hasonlíts!', 'Előbb írd át dl-re, aztán számolj', '8 l = 80 dl > 50 dl']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <CapacityG2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <CapacityG2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default CapacityG2Quiz;
