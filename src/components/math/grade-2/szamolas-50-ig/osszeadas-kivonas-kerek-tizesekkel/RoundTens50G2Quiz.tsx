import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { RoundTens50G2Matcher } from './RoundTens50G2Matcher';
import { RoundTens50G2Sorter } from './RoundTens50G2Sorter';
import {
  RTQFig,
  RodsPart,
  RodGroup,
  rodsWidth,
  NumLine50Part,
  JumpArc,
  CoinPart,
  ROD_BLUE,
  ROD_GREEN,
  RT_INK,
  RT_UNK
} from './RoundTens50G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const RodsFig: React.FC<{ groups: RodGroup[]; ones?: number; crossed?: number; caption?: string }> = ({
  groups,
  ones = 0,
  crossed = 0,
  caption
}) => {
  const cell = 7;
  const w = rodsWidth(groups, ones, cell, 12);
  return (
    <RTQFig h={caption ? 112 : 96}>
      <RodsPart x={(260 - w) / 2} y={13} cell={cell} groups={groups} ones={ones} crossed={crossed} groupGap={12} />
      {caption && (
        <text x="130" y="102" textAnchor="middle" fontSize="14" fontWeight="900" fill={RT_INK}>
          {caption}
        </text>
      )}
    </RTQFig>
  );
};

const LineFig: React.FC<{ jumps: JumpArc[]; start: number; end?: number; endLabel?: string }> = ({
  jumps,
  start,
  end,
  endLabel = '?'
}) => (
  <RTQFig h={112}>
    <NumLine50Part
      x0={16}
      x1={236}
      y={66}
      jumps={jumps}
      marks={[
        { v: start, label: String(start), color: '#2563eb' },
        ...(end !== undefined ? [{ v: end, label: endLabel, color: RT_UNK }] : [])
      ]}
    />
  </RTQFig>
);

const CoinsFig: React.FC<{ coins: (number | '?')[] }> = ({ coins }) => {
  const step = 48;
  const x0 = 130 - ((coins.length - 1) * step) / 2;
  return (
    <RTQFig h={80}>
      {coins.map((c, i) => (
        <CoinPart key={i} cx={x0 + i * step} cy={40} value={c} r={20} />
      ))}
    </RTQFig>
  );
};

const AppleFig: React.FC = () => (
  <RTQFig h={90}>
    <circle cx="95" cy="48" r="26" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
    <path d="M95 22 q4 -10 12 -12" fill="none" stroke="#166534" strokeWidth="3" strokeLinecap="round" />
    <ellipse cx="86" cy="40" rx="6" ry="4" fill="#fca5a5" />
    <rect x="138" y="32" width="70" height="30" rx="7" fill="#fff" stroke={RT_INK} strokeWidth="2.5" />
    <text x="173" y="53" textAnchor="middle" fontSize="17" fontWeight="900" fill={RT_INK}>
      40 Ft
    </text>
  </RTQFig>
);

const PencilFig: React.FC = () => (
  <RTQFig h={96}>
    <CoinPart cx={60} cy={42} value={50} r={24} />
    <text x="60" y="86" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">
      Lili pénze
    </text>
    <polygon points="112,30 200,30 214,37 200,44 112,44" fill="#facc15" stroke="#a16207" strokeWidth="2" />
    <polygon points="200,30 214,37 200,44" fill="#fde68a" stroke="#a16207" strokeWidth="1.5" />
    <rect x="104" y="30" width="10" height="14" fill="#f472b6" stroke="#9d174d" strokeWidth="1.5" />
    <rect x="132" y="56" width="62" height="26" rx="6" fill="#fff" stroke={RT_INK} strokeWidth="2" />
    <text x="163" y="74" textAnchor="middle" fontSize="15" fontWeight="900" fill={RT_INK}>
      30 Ft
    </text>
  </RTQFig>
);

const TEFig: React.FC<{ t: number; e: number; addT: number }> = ({ t, e, addT }) => (
  <RTQFig h={122}>
    <text x="104" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400e">
      T
    </text>
    <text x="150" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
      E
    </text>
    {[
      { y: 28, tt: String(t), ee: String(e) },
      { y: 58, tt: `+${addT}`, ee: '0' },
      { y: 90, tt: '?', ee: '?' }
    ].map((r, i) => (
      <g key={i}>
        <rect x="82" y={r.y} width="44" height="26" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <rect x="128" y={r.y} width="44" height="26" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="104" y={r.y + 19} textAnchor="middle" fontSize="16" fontWeight="900" fill={r.tt === '?' ? RT_UNK : '#92400e'}>
          {r.tt}
        </text>
        <text x="150" y={r.y + 19} textAnchor="middle" fontSize="16" fontWeight="900" fill={r.ee === '?' ? RT_UNK : '#166534'}>
          {r.ee}
        </text>
      </g>
    ))}
    <line x1="82" y1="87" x2="172" y2="87" stroke={RT_INK} strokeWidth="2" />
  </RTQFig>
);

const CardsFig: React.FC<{ items: string[] }> = ({ items }) => {
  const step = 46;
  const x0 = 130 - ((items.length - 1) * step) / 2;
  return (
    <RTQFig h={74}>
      {items.map((it, i) => (
        <g key={i}>
          <rect
            x={x0 + i * step - 20}
            y={17}
            width="40"
            height="40"
            rx="8"
            fill={it === '?' ? '#fff1f2' : '#fef3c7'}
            stroke={it === '?' ? RT_UNK : '#d97706'}
            strokeWidth="2"
          />
          <text x={x0 + i * step} y={44} textAnchor="middle" fontSize="18" fontWeight="900" fill={it === '?' ? RT_UNK : RT_INK}>
            {it}
          </text>
        </g>
      ))}
    </RTQFig>
  );
};

const PyramidFig: React.FC<{ rows: string[][] }> = ({ rows }) => {
  const bw = 52;
  const bh = 28;
  return (
    <RTQFig h={rows.length * bh + 22}>
      {rows.map((row, r) => {
        const x0 = 130 - (row.length * bw) / 2;
        return row.map((v, i) => (
          <g key={`${r}-${i}`}>
            <rect
              x={x0 + i * bw}
              y={11 + r * bh}
              width={bw}
              height={bh}
              fill={v === '?' ? '#fff1f2' : '#e0f2fe'}
              stroke="#0369a1"
              strokeWidth="1.6"
            />
            <text x={x0 + i * bw + bw / 2} y={11 + r * bh + 20} textAnchor="middle" fontSize="16" fontWeight="900" fill={v === '?' ? RT_UNK : RT_INK}>
              {v}
            </text>
          </g>
        ));
      })}
    </RTQFig>
  );
};

const BusFig: React.FC = () => (
  <RTQFig h={110}>
    <rect x="60" y="18" width="140" height="56" rx="10" fill="#fde047" stroke="#a16207" strokeWidth="2.5" />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={70 + i * 30} y={26} width="22" height="18" rx="3" fill="#e0f2fe" stroke="#0369a1" strokeWidth="1.5" />
    ))}
    <circle cx="88" cy="76" r="9" fill="#334155" />
    <circle cx="172" cy="76" r="9" fill="#334155" />
    <text x="130" y="64" textAnchor="middle" fontSize="15" fontWeight="900" fill={RT_INK}>
      34 utas
    </text>
    <path d="M44 30 L44 62 M37 54 L44 63 L51 54" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
    <text x="30" y="100" fontSize="13" fontWeight="900" fill="#dc2626">
      le: 10
    </text>
    <path d="M216 62 L216 30 M209 38 L216 29 L223 38" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
    <text x="196" y="100" fontSize="13" fontWeight="900" fill="#16a34a">
      fel: 20
    </text>
    <text x="130" y="102" textAnchor="middle" fontSize="14" fontWeight="900" fill={RT_UNK}>
      most: ?
    </text>
  </RTQFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const ROUND_TENS50_G2_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint -----
  {
    id: 'rt50g2-q1',
    level: 1,
    questionTypeBadge: 'Kerek tízes',
    figure: <RodsFig groups={[{ count: 3 }]} />,
    question: 'Hány tízesrúd van a képen? Melyik szám ez?',
    options: ['30', '3', '13', '40'],
    correctAnswer: 0,
    explanation: '3 tízesrúd van. 3 tízes = 30.'
  },
  {
    id: 'rt50g2-q2',
    level: 1,
    questionTypeBadge: 'Összeadás rudakkal',
    figure: <RodsFig groups={[{ count: 2 }, { count: 2, ...ROD_BLUE }]} caption="20 + 20 = ?" />,
    question: 'Mennyi 20 + 20?',
    options: ['40', '4', '22', '30'],
    correctAnswer: 0,
    explanation: '2 tízes + 2 tízes = 4 tízes. Ez 40.'
  },
  {
    id: 'rt50g2-q3',
    level: 1,
    questionTypeBadge: 'Összeadás',
    figure: <RodsFig groups={[{ count: 1 }, { count: 3, ...ROD_BLUE }]} caption="10 + 30 = ?" />,
    question: 'Mennyi 10 + 30?',
    options: ['40', '4', '31', '50'],
    correctAnswer: 0,
    explanation: '1 tízes + 3 tízes = 4 tízes, vagyis 40. Ne felejtsd el a 0-t!'
  },
  {
    id: 'rt50g2-q4',
    level: 1,
    questionTypeBadge: 'Kistesó',
    question: '3 + 1 = 4. Akkor mennyi 30 + 10?',
    options: ['40', '31', '4', '13'],
    correctAnswer: 0,
    explanation: '3 tízes + 1 tízes = 4 tízes. Tehát 30 + 10 = 40.'
  },
  {
    id: 'rt50g2-q5',
    level: 1,
    questionTypeBadge: 'Kivonás rudakkal',
    figure: <RodsFig groups={[{ count: 5 }]} crossed={2} caption="50 − 20 = ?" />,
    question: 'Két rudat áthúztunk. Mennyi 50 − 20?',
    options: ['30', '3', '20', '40'],
    correctAnswer: 0,
    explanation: '5 tízesből elveszünk 2 tízest. 3 tízes marad: 30.'
  },
  {
    id: 'rt50g2-q6',
    level: 1,
    questionTypeBadge: 'Kivonás',
    figure: <RodsFig groups={[{ count: 4 }]} crossed={1} caption="40 − 10 = ?" />,
    question: 'Mennyi 40 − 10?',
    options: ['30', '3', '39', '50'],
    correctAnswer: 0,
    explanation: '4 tízes − 1 tízes = 3 tízes. Ez 30. (A 39 akkor jönne ki, ha csak 1-et vennél el.)'
  },
  {
    id: 'rt50g2-q7',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <CoinsFig coins={[20, 20, 10]} />,
    question: 'Mennyi pénz van itt összesen?',
    options: ['50 Ft', '3 Ft', '40 Ft', '30 Ft'],
    correctAnswer: 0,
    explanation: '20 + 20 = 40, és 40 + 10 = 50. Összesen 50 Ft. Nem az érmék számát kérdeztük!'
  },
  {
    id: 'rt50g2-q8',
    level: 1,
    questionTypeBadge: 'Mi a kerek tízes?',
    question: 'Melyik szám kerek tízes?',
    options: ['30', '23', '32', '13'],
    correctAnswer: 0,
    explanation: 'A kerek tízes 0-ra végződik: 10, 20, 30, 40, 50. A 30 ilyen.'
  },
  {
    id: 'rt50g2-q9',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: (
      <LineFig
        start={10}
        end={30}
        jumps={[
          { from: 10, to: 20, label: '+10' },
          { from: 20, to: 30, label: '+10' }
        ]}
      />
    ),
    question: 'A béka a 10-ről kettőt ugrik. Mindig 10-et ugrik. Hová ér?',
    options: ['30', '12', '20', '40'],
    correctAnswer: 0,
    explanation: '10 + 10 = 20, és 20 + 10 = 30. A béka a 30-ra ér.'
  },
  {
    id: 'rt50g2-q10',
    level: 1,
    questionTypeBadge: 'Mind elvesszük',
    question: 'Mennyi 30 − 30?',
    options: ['0', '30', '10', '3'],
    correctAnswer: 0,
    explanation: 'Ha mind a 3 tízest elveszed, semmi sem marad: 30 − 30 = 0.'
  },

  // ----- 2. szint -----
  {
    id: 'rt50g2-q11',
    level: 2,
    questionTypeBadge: 'Kétjegyű + tízes',
    figure: <RodsFig groups={[{ count: 2 }, { count: 2, ...ROD_BLUE }]} ones={4} caption="24 + 20 = ?" />,
    question: 'Mennyi 24 + 20?',
    options: ['44', '26', '46', '42'],
    correctAnswer: 0,
    explanation: 'Csak a tízesek változnak: 2 tízes + 2 tízes = 4 tízes. A 4 egyes marad. 24 + 20 = 44.'
  },
  {
    id: 'rt50g2-q12',
    level: 2,
    questionTypeBadge: 'Tízes ugrások',
    figure: (
      <LineFig
        start={13}
        end={43}
        jumps={[
          { from: 13, to: 23, label: '+10' },
          { from: 23, to: 33, label: '+10' },
          { from: 33, to: 43, label: '+10' }
        ]}
      />
    ),
    question: 'Mennyi 13 + 30?',
    options: ['43', '16', '33', '34'],
    correctAnswer: 0,
    explanation: 'Három tízes ugrás: 13 → 23 → 33 → 43. A 16 hibás: ott az egyesekhez adtál 3-at.'
  },
  {
    id: 'rt50g2-q13',
    level: 2,
    questionTypeBadge: 'Kétjegyű − tízes',
    figure: <RodsFig groups={[{ count: 4 }]} ones={7} crossed={2} caption="47 − 20 = ?" />,
    question: 'Mennyi 47 − 20?',
    options: ['27', '45', '37', '25'],
    correctAnswer: 0,
    explanation: '4 tízes − 2 tízes = 2 tízes. A 7 egyes marad. 47 − 20 = 27.'
  },
  {
    id: 'rt50g2-q14',
    level: 2,
    questionTypeBadge: 'Csak egyes marad',
    question: 'Mennyi 35 − 30?',
    options: ['5', '32', '15', '25'],
    correctAnswer: 0,
    explanation: '3 tízesből 3 tízest veszünk el, 0 tízes marad. Az 5 egyes megvan: 35 − 30 = 5.'
  },
  {
    id: 'rt50g2-q15',
    level: 2,
    questionTypeBadge: 'Hiányzó tag',
    figure: <RodsFig groups={[{ count: 2 }]} caption="20 + □ = 50" />,
    question: 'Melyik szám kerül a □ helyére? 20 + □ = 50',
    options: ['30', '3', '20', '40'],
    correctAnswer: 0,
    explanation: '2 tízeshez még 3 tízes kell, hogy 5 tízes legyen. □ = 30.'
  },
  {
    id: 'rt50g2-q16',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Melyik szám kerül a □ helyére? □ − 10 = 30',
    options: ['40', '20', '4', '30'],
    correctAnswer: 0,
    explanation: 'Melyik számból 10-et elvéve marad 30? 30 + 10 = 40. Ellenőrzés: 40 − 10 = 30.'
  },
  {
    id: 'rt50g2-q17',
    level: 2,
    questionTypeBadge: 'Fizetés',
    figure: <AppleFig />,
    question: 'Az alma 40 Ft. Melyik érmékkel fizethetsz pontosan?',
    options: ['20 Ft + 20 Ft', '20 Ft + 10 Ft', '50 Ft + 10 Ft', '10 Ft + 10 Ft + 10 Ft'],
    correctAnswer: 0,
    explanation: '20 + 20 = 40. A többi: 30 Ft, 60 Ft és 30 Ft – ezek nem pontosan 40 Ft.'
  },
  {
    id: 'rt50g2-q18',
    level: 2,
    questionTypeBadge: 'Visszafelé ugrás',
    figure: (
      <LineFig
        start={46}
        end={26}
        jumps={[
          { from: 46, to: 36, label: '−10' },
          { from: 36, to: 26, label: '−10' }
        ]}
      />
    ),
    question: 'Mennyi 46 − 20?',
    options: ['26', '44', '36', '16'],
    correctAnswer: 0,
    explanation: 'Két tízes ugrás visszafelé: 46 → 36 → 26.'
  },
  {
    id: 'rt50g2-q19',
    level: 2,
    questionTypeBadge: 'Helyiérték',
    figure: <TEFig t={1} e={8} addT={3} />,
    question: 'A 18-hoz 3 tízest adunk. Mennyi lesz?',
    options: ['48', '21', '38', '45'],
    correctAnswer: 0,
    explanation: '1 tízes + 3 tízes = 4 tízes. A 8 egyes marad. 18 + 30 = 48.'
  },
  {
    id: 'rt50g2-q20',
    level: 2,
    questionTypeBadge: 'Hány tízes?',
    question: 'Hány tízest kell adni a 12-höz, hogy 42 legyen?',
    options: ['3 tízest', '4 tízest', '2 tízest', '30 tízest'],
    correctAnswer: 0,
    explanation: 'A 12-ben 1 tízes van, a 42-ben 4 tízes. 3 tízes kell még: 12 + 30 = 42.'
  },

  // ----- 3. szint -----
  {
    id: 'rt50g2-q21',
    level: 3,
    questionTypeBadge: 'Három tag',
    figure: (
      <RodsFig
        groups={[{ count: 1 }, { count: 2, ...ROD_BLUE }, { count: 1, ...ROD_GREEN }]}
        caption="10 + 20 + 10 = ?"
      />
    ),
    question: 'Mennyi 10 + 20 + 10?',
    options: ['40', '30', '4', '50'],
    correctAnswer: 0,
    explanation: '10 + 20 = 30, és 30 + 10 = 40. Rudakkal: 1 + 2 + 1 = 4 tízes.'
  },
  {
    id: 'rt50g2-q22',
    level: 3,
    questionTypeBadge: 'Két elvétel',
    figure: <RodsFig groups={[{ count: 5 }]} crossed={4} caption="50 − 20 − 20 = ?" />,
    question: 'Mennyi 50 − 20 − 20?',
    options: ['10', '30', '0', '20'],
    correctAnswer: 0,
    explanation: '50 − 20 = 30, és 30 − 20 = 10. Egy rúd maradt meg.'
  },
  {
    id: 'rt50g2-q23',
    level: 3,
    questionTypeBadge: 'Szöveges: kap még',
    figure: (
      <LineFig
        start={25}
        end={45}
        jumps={[
          { from: 25, to: 35, label: '+10' },
          { from: 35, to: 45, label: '+10' }
        ]}
      />
    ),
    question: 'Peti 25 matricát gyűjtött. Kap még 20-at. Hány matricája lesz?',
    options: ['45', '27', '35', '47'],
    correctAnswer: 0,
    explanation: '25 + 20 = 45. Két tízest ugrunk: 25 → 35 → 45. Petinek 45 matricája lesz.'
  },
  {
    id: 'rt50g2-q24',
    level: 3,
    questionTypeBadge: 'Szöveges: elvétel',
    question: 'A fán 38 levél van. A szél lefúj 20-at. Hány levél marad?',
    options: ['18', '36', '28', '8'],
    correctAnswer: 0,
    explanation: '38 − 20 = 18. A 3 tízesből 2-t elveszünk: 1 tízes és 8 egyes marad.'
  },
  {
    id: 'rt50g2-q25',
    level: 3,
    questionTypeBadge: 'Vásárlás',
    figure: <PencilFig />,
    question: 'Lilinek 50 Ft-ja van. Vesz egy 30 Ft-os ceruzát. Mennyi pénze marad?',
    options: ['20 Ft', '30 Ft', '10 Ft', '2 Ft'],
    correctAnswer: 0,
    explanation: '50 − 30 = 20. Lilinek 20 Ft-ja marad.'
  },
  {
    id: 'rt50g2-q26',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik ér többet: 20 + 20 vagy 50 − 20?',
    options: ['20 + 20', '50 − 20', 'Egyformák', 'Nem lehet tudni'],
    correctAnswer: 0,
    explanation: '20 + 20 = 40 és 50 − 20 = 30. A 40 több, mint a 30.'
  },
  {
    id: 'rt50g2-q27',
    level: 3,
    questionTypeBadge: 'Sorozat',
    figure: <CardsFig items={['7', '17', '27', '37', '?']} />,
    question: 'Mindig 10-zel nő. Melyik szám jön?',
    options: ['47', '38', '40', '45'],
    correctAnswer: 0,
    explanation: '37 + 10 = 47. Az egyes (7) mindig ugyanaz, csak a tízes nő.'
  },
  {
    id: 'rt50g2-q28',
    level: 3,
    questionTypeBadge: 'Számpiramis',
    figure: <PyramidFig rows={[['?'], ['?', '?'], ['10', '10', '20']]} />,
    question: 'Két szomszéd tégla összege kerül föléjük. Mi lesz a csúcson?',
    options: ['50', '40', '30', '20'],
    correctAnswer: 0,
    explanation: '10 + 10 = 20 és 10 + 20 = 30. A csúcs: 20 + 30 = 50.'
  },
  {
    id: 'rt50g2-q29',
    level: 3,
    questionTypeBadge: 'Egyenlőség',
    question: 'Melyik szám kerül a □ helyére? 30 + 10 = 20 + □',
    options: ['20', '40', '10', '30'],
    correctAnswer: 0,
    explanation: 'A bal oldal: 30 + 10 = 40. A jobb oldal is 40 legyen: 20 + 20 = 40. □ = 20.'
  },
  {
    id: 'rt50g2-q30',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <BusFig />,
    question: 'A buszon 34 ember ül. Leszáll 10, felszáll 20. Hányan ülnek most?',
    options: ['44', '24', '4', '14'],
    correctAnswer: 0,
    explanation: '34 − 10 = 24. Aztán 24 + 20 = 44. Most 44-en ülnek a buszon.'
  }
];

export const RoundTens50G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={2}
      chapterId="szamolas-50-ig"
      topicId="g2-c50-kerek-quiz"
      subtopicId="osszeadas-kivonas-kerek-tizesekkel"
      title="4. Összeadás, kivonás kerek tízesekkel – Kvíz"
      subtitle="30 feladat 3 szinten: kerek tízesek, kétjegyű szám ± kerek tízes, pénz és szöveges feladatok 50-ig."
      badge="2. OSZTÁLY • II. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 50-IG • KVÍZ"
      questions={ROUND_TENS50_G2_QUESTIONS}
      cheatSheets={[
        {
          title: 'Kerek tízesek',
          items: ['10, 20, 30, 40, 50', '3 + 2 = 5 → 30 + 20 = 50', '5 − 2 = 3 → 50 − 20 = 30', 'A végére írd oda a 0-t!']
        },
        {
          title: 'Csak a tízesek változnak',
          items: ['24 + 20 = 44', '47 − 20 = 27', 'Az egyesek maradnak!', 'Számegyenesen: tízes ugrások']
        },
        {
          title: 'Pénz és szöveg',
          items: ['Érmék: 10 Ft, 20 Ft, 50 Ft', '40 Ft = 20 Ft + 20 Ft', 'Kap még → összeadás', 'Elvesz, lefúj, elkölt → kivonás']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <RoundTens50G2Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <RoundTens50G2Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default RoundTens50G2Quiz;
