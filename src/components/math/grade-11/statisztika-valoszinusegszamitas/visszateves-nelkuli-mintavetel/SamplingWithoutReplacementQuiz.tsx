import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SamplingWithoutReplacementMatcher } from './SamplingWithoutReplacementMatcher';
import { SamplingWithoutReplacementSorter } from './SamplingWithoutReplacementSorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

const BALL: Record<string, { fill: string; stroke: string; label: string }> = {
  red: { fill: '#fb7185', stroke: '#be123c', label: 'piros' },
  yellow: { fill: '#fde047', stroke: '#a16207', label: 'sárga' },
  blue: { fill: '#38bdf8', stroke: '#0369a1', label: 'kék' },
  white: { fill: '#ffffff', stroke: '#475569', label: 'fehér' },
  black: { fill: '#334155', stroke: '#0f172a', label: 'fekete' }
};

/** Urna golyókkal és felirattal. */
const UrnFig: React.FC<{ groups: { color: keyof typeof BALL; count: number }[]; caption: string }> = ({ groups, caption }) => {
  const balls = groups.flatMap((g) => Array.from({ length: g.count }, () => g.color));
  const cols = Math.min(8, balls.length);
  const step = 22;
  const rows = Math.ceil(balls.length / cols);
  const w = cols * step;
  const x0 = 120 - w / 2 + step / 2;
  const bottom = 26 + rows * step + 6;
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="146" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      <path
        d={`M ${120 - w / 2 - 8} 12 L ${120 - w / 2 - 8} ${bottom - 8} Q ${120 - w / 2 - 8} ${bottom} ${120 - w / 2} ${bottom} L ${120 + w / 2} ${bottom} Q ${120 + w / 2 + 8} ${bottom} ${120 + w / 2 + 8} ${bottom - 8} L ${120 + w / 2 + 8} 12`}
        fill="#f1f5f9"
        stroke="#64748b"
        strokeWidth="1.5"
      />
      {balls.map((c, i) => (
        <circle key={i} cx={x0 + (i % cols) * step} cy={26 + Math.floor(i / cols) * step} r="9" fill={BALL[c].fill} stroke={BALL[c].stroke} strokeWidth="1.3" />
      ))}
      <text x="120" y={Math.min(bottom + 18, 128)} fontSize="10" textAnchor="middle" fill="#334155">
        {groups.map((g) => `${g.count} ${BALL[g.color].label}`).join(', ')}
      </text>
      <text x="120" y={Math.min(bottom + 32, 142)} fontSize="10" textAnchor="middle" fontWeight="bold" fill="#0c4a6e">
        {caption}
      </text>
    </svg>
  );
};

/** Kétszintű valószínűségi fa (4 piros, 6 sárga, 2 húzás); a `labels` a 6 ág felirata. */
const TreeFig: React.FC<{ labels: [string, string, string, string, string, string]; highlight?: number[] }> = ({ labels, highlight = [] }) => {
  const root = { x: 20, y: 75 };
  const l1 = [
    { x: 100, y: 38, c: BALL.red },
    { x: 100, y: 112, c: BALL.yellow }
  ];
  const l2 = [
    { from: 0, x: 180, y: 18, c: BALL.red, t: 'PP' },
    { from: 0, x: 180, y: 58, c: BALL.yellow, t: 'PS' },
    { from: 1, x: 180, y: 92, c: BALL.red, t: 'SP' },
    { from: 1, x: 180, y: 132, c: BALL.yellow, t: 'SS' }
  ];
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="146" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      {l1.map((n, i) => (
        <g key={i}>
          <line x1={root.x} y1={root.y} x2={n.x} y2={n.y} stroke="#64748b" strokeWidth="1.5" />
          <text x={(root.x + n.x) / 2 - 4} y={(root.y + n.y) / 2 - 4} fontSize="9" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
            {labels[i]}
          </text>
        </g>
      ))}
      {l2.map((n, i) => {
        const a = l1[n.from];
        const hot = highlight.includes(i);
        return (
          <g key={i}>
            <line x1={a.x} y1={a.y} x2={n.x} y2={n.y} stroke={hot ? '#0284c7' : '#64748b'} strokeWidth={hot ? 2.5 : 1.5} />
            <text x={(a.x + n.x) / 2} y={(a.y + n.y) / 2 - 3} fontSize="9" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
              {labels[i + 2]}
            </text>
            <circle cx={n.x} cy={n.y} r="7" fill={n.c.fill} stroke={n.c.stroke} />
            <text x={n.x + 12} y={n.y + 3} fontSize="9" fill={hot ? '#0c4a6e' : '#334155'} fontWeight={hot ? 'bold' : 'normal'}>
              {n.t}
            </text>
          </g>
        );
      })}
      <circle cx={root.x} cy={root.y} r="5" fill="#334155" />
      {l1.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="8" fill={n.c.fill} stroke={n.c.stroke} />
      ))}
    </svg>
  );
};

/** Két (vagy több) csoport, k elemű mintával. */
const GroupsFig: React.FC<{ total: string; a: string; b: string; k: string }> = ({ total, a, b, k }) => (
  <svg viewBox="0 0 240 120" className={FIG_CLASS}>
    <rect x="2" y="2" width="236" height="116" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    <rect x="14" y="12" width="212" height="66" rx="10" fill="#ffffff" stroke="#334155" />
    <text x="120" y="28" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#1e293b">
      {total}
    </text>
    <rect x="22" y="36" width="94" height="34" rx="7" fill="#fef3c7" stroke="#d97706" />
    <text x="69" y="57" fontSize="10" textAnchor="middle" fill="#92400e">
      {a}
    </text>
    <rect x="124" y="36" width="94" height="34" rx="7" fill="#e0f2fe" stroke="#0284c7" />
    <text x="171" y="57" fontSize="10" textAnchor="middle" fill="#0c4a6e">
      {b}
    </text>
    <text x="120" y="100" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
      {k}
    </text>
  </svg>
);

const URN_4R6Y = [
  { color: 'red' as const, count: 4 },
  { color: 'yellow' as const, count: 6 }
];

const SAMPLING_WITHOUT_REPLACEMENT_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1
  {
    id: 'swr-q1',
    level: 1,
    questionTypeBadge: 'Urnamodell',
    question: 'A 4 piros és 6 sárga golyó közül véletlenszerűen kihúzunk 5-öt. Mennyi a valószínűsége, hogy mindegyik sárga?',
    figure: <UrnFig groups={URN_4R6Y} caption="5 golyót húzunk: mind sárga?" />,
    options: ['6/252 ≈ 0,024', '(3/5)⁵ ≈ 0,078', '5/6 ≈ 0,833', '1/252 ≈ 0,004'],
    correctAnswer: 0,
    explanation: 'Összes eset: (10 alatt 5) = 252; kedvező: a 6 sárgából 5: (6 alatt 5) = 6. p = 6/252 ≈ 0,024.'
  },
  {
    id: 'swr-q2',
    level: 1,
    questionTypeBadge: 'Összes eset',
    question: '10 golyóból egyszerre 5-öt húzunk. Hány lehetséges kimenetel van, ha a golyókat megkülönböztetjük?',
    options: ['252', '30 240', '50', '100 000'],
    correctAnswer: 0,
    explanation: 'Sorrend nélküli kiválasztás: (10 alatt 5) = 10 · 9 · 8 · 7 · 6 / 5! = 252. A 30 240 a sorrendet is figyelembe venné.'
  },
  {
    id: 'swr-q3',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Mit jelent a visszatevés nélküli mintavétel?',
    options: [
      'a már kiválasztott elemet nem tesszük vissza, nem választható ki újra',
      'minden húzás után visszatesszük a kihúzott elemet',
      'csak egyetlen elemet választunk ki',
      'a kihúzott elemek sorrendje mindig számít'
    ],
    correctAnswer: 0,
    explanation: 'Visszatevés nélkül a kiválasztott elem kikerül a halmazból. Ez történhet egyszerre húzással vagy egymás után, visszatevés nélkül.'
  },
  {
    id: 'swr-q4',
    level: 1,
    questionTypeBadge: '„És” ⇒ szorzás',
    question: 'A kedvező esethez 3 sárga ÉS 2 piros golyó kell. Mit kell tenni a sárgák és a pirosak kiválasztási lehetőségeinek számával?',
    options: ['össze kell szorozni', 'össze kell adni', 'ki kell vonni egymásból', 'el kell osztani egymással'],
    correctAnswer: 0,
    explanation: 'A 3 sárga minden esete bármelyik 2 piros húzásával párosítható, ezért szorzunk: (6 alatt 3) · (4 alatt 2) = 20 · 6 = 120.'
  },
  {
    id: 'swr-q5',
    level: 1,
    questionTypeBadge: 'Valószínűségi fa',
    question: 'Két golyót húzunk egymás után, visszatevés nélkül (4 piros, 6 sárga). Mennyi a valószínűsége, hogy mindkettő piros?',
    figure: <TreeFig labels={['4/10', '6/10', '?', '6/9', '4/9', '5/9']} highlight={[0]} />,
    options: ['2/15', '4/25', '2/5', '1/3'],
    correctAnswer: 0,
    explanation: 'Az első piros 4/10, utána 9 golyóból 3 piros: 3/9. P(PP) = 4/10 · 3/9 = 12/90 = 2/15. (A 4/25 visszatevéssel adódna.)'
  },
  {
    id: 'swr-q6',
    level: 1,
    questionTypeBadge: 'Valószínűségi fa',
    question: 'A 4 piros, 6 sárga golyó közül elsőre pirosat húztunk, és nem tettük vissza. Mennyi a valószínűsége, hogy a második is piros?',
    figure: <UrnFig groups={[{ color: 'red', count: 3 }, { color: 'yellow', count: 6 }]} caption="az első (piros) golyó már kint van" />,
    options: ['1/3', '2/5', '3/10', '4/9'],
    correctAnswer: 0,
    explanation: 'Maradt 9 golyó, közülük 3 piros: 3/9 = 1/3.'
  },
  {
    id: 'swr-q7',
    level: 1,
    questionTypeBadge: 'Urnamodell',
    question: 'Az urnából egyszerre 2 golyót húzunk. Mennyi a valószínűsége, hogy pontosan 1 piros lesz közöttük?',
    figure: <UrnFig groups={[{ color: 'red', count: 3 }, { color: 'blue', count: 2 }]} caption="egyszerre 2 golyót húzunk" />,
    options: ['3/5', '3/10', '1/2', '12/25'],
    correctAnswer: 0,
    explanation: 'Kedvező: 3 · 2 = 6 (egy piros és egy kék), összes: (5 alatt 2) = 10. p = 6/10 = 3/5.'
  },
  {
    id: 'swr-q8',
    level: 1,
    questionTypeBadge: 'Zenekar',
    question: 'A vonószenekarban 14 hegedűs és 10 másik zenész van. Két zenészt választunk. Mennyi a valószínűsége, hogy mindkettő hegedűs?',
    figure: <GroupsFig total="24 zenész" a="hegedűs: 14" b="más: 10" k="2 zenészt választunk" />,
    options: ['91/276 ≈ 0,330', '49/144 ≈ 0,340', '14/24 ≈ 0,583', '7/12 · 7/12'],
    correctAnswer: 0,
    explanation: '(14 alatt 2) / (24 alatt 2) = 91/276 ≈ 0,330.'
  },
  {
    id: 'swr-q9',
    level: 1,
    questionTypeBadge: 'Összes eset',
    question: 'A 12 pályára lépett játékos közül hármat választunk ki. Hányféleképpen tehetjük ezt meg?',
    options: ['220', '1320', '36', '1728'],
    correctAnswer: 0,
    explanation: '(12 alatt 3) = 12 · 11 · 10 / 3! = 220. Az 1320 a sorrendet is figyelembe venné.'
  },
  {
    id: 'swr-q10',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Ugyanannyi elemet húzunk egyszerre, illetve egymás után visszatevés nélkül. Mit mondhatunk a valószínűségekről?',
    options: [
      'ugyanazokat a valószínűségeket kapjuk',
      'az egyszerre húzás mindig valószínűbb',
      'az egymás utáni húzás mindig valószínűbb',
      'csak visszatevéssel lehet egymás után húzni'
    ],
    correctAnswer: 0,
    explanation: 'Mindkettő visszatevés nélküli mintavétel: pl. 4/10 · 3/9 = 2/15 = (4 alatt 2) / (10 alatt 2).'
  },

  // LEVEL 2
  {
    id: 'swr-q11',
    level: 2,
    questionTypeBadge: 'Pontosan j',
    question: 'A 4 piros és 6 sárga golyó közül kihúzunk 5-öt. Mennyi a valószínűsége, hogy pontosan 3 sárga lesz köztük?',
    figure: <UrnFig groups={URN_4R6Y} caption="5 golyót húzunk: pontosan 3 sárga?" />,
    options: ['120/252 ≈ 0,476', '20/252 ≈ 0,079', '26/252 ≈ 0,103', '3/5 = 0,6'],
    correctAnswer: 0,
    explanation: '3 sárga ÉS 2 piros: (6 alatt 3) · (4 alatt 2) = 20 · 6 = 120. p = 120/252 ≈ 0,476. (20/252 a pirosakat felejti ki, 26/252 összead szorzás helyett.)'
  },
  {
    id: 'swr-q12',
    level: 2,
    questionTypeBadge: 'Zenekar',
    question: 'A 24 fős zenekarból (14 hegedűs) két zenészt választunk. Mennyi a valószínűsége, hogy egyikük hegedűs, a másik nem?',
    figure: <GroupsFig total="24 zenész" a="hegedűs: 14" b="más: 10" k="2 zenészt választunk" />,
    options: ['140/276 ≈ 0,507', '140/576 ≈ 0,243', '70/276 ≈ 0,254', '91/276 ≈ 0,330'],
    correctAnswer: 0,
    explanation: 'Egy hegedűs (14 lehetőség) és egy nem hegedűs (10 lehetőség): 14 · 10 = 140 kedvező eset. p = 140/276 ≈ 0,507.'
  },
  {
    id: 'swr-q13',
    level: 2,
    questionTypeBadge: 'Zenekar',
    question: 'A zenekarban 14 hegedűs, 4 brácsás, 4 csellós és 2 nagybőgős van. Két zenészt választunk. Mennyi a valószínűsége, hogy egyik brácsás, a másik hegedűs?',
    options: ['56/276 ≈ 0,203', '18/276 ≈ 0,065', '56/552 ≈ 0,101', '6/276 ≈ 0,022'],
    correctAnswer: 0,
    explanation: '4 · 14 = 56 kedvező pár, összes: (24 alatt 2) = 276. p = 56/276 ≈ 0,203.'
  },
  {
    id: 'swr-q14',
    level: 2,
    questionTypeBadge: 'Aranycsapat',
    question: 'A 12 játékosból 3 lőtt gólt. Hármat választunk. Mennyi a valószínűsége, hogy egyik kiválasztott sem lőtt gólt?',
    figure: <GroupsFig total="12 játékos" a="gólszerző: 3" b="nem lőtt gólt: 9" k="3 játékost választunk" />,
    options: ['84/220 ≈ 0,382', '27/64 ≈ 0,422', '9/12 = 0,75', '1/220 ≈ 0,005'],
    correctAnswer: 0,
    explanation: 'Mind a 3 a 9 nem gólszerzőből: (9 alatt 3) / (12 alatt 3) = 84/220 ≈ 0,382.'
  },
  {
    id: 'swr-q15',
    level: 2,
    questionTypeBadge: 'Aranycsapat',
    question: 'A 12 játékosból (3 gólszerző) hármat választunk. Mennyi a valószínűsége, hogy pontosan 1 gólszerző lesz köztük?',
    options: ['108/220 ≈ 0,491', '36/220 ≈ 0,164', '27/220 ≈ 0,123', '1/4'],
    correctAnswer: 0,
    explanation: '(3 alatt 1) · (9 alatt 2) = 3 · 36 = 108 kedvező eset. p = 108/220 ≈ 0,491.'
  },
  {
    id: 'swr-q16',
    level: 2,
    questionTypeBadge: 'Valószínűségi fa',
    question: 'Két golyót húzunk egymás után, visszatevés nélkül (4 piros, 6 sárga). Mennyi a valószínűsége, hogy pontosan egy piros lesz köztük?',
    figure: <TreeFig labels={['4/10', '6/10', '3/9', '6/9', '4/9', '5/9']} highlight={[1, 2]} />,
    options: ['8/15', '4/15', '12/25', '2/5'],
    correctAnswer: 0,
    explanation: 'Két út vezet ide: PS: 4/10 · 6/9 = 24/90 és SP: 6/10 · 4/9 = 24/90. Összesen 48/90 = 8/15. (4/15 csak az egyik utat számolja.)'
  },
  {
    id: 'swr-q17',
    level: 2,
    questionTypeBadge: 'Pontosan j',
    question: 'Egyszerre 3 golyót húzunk. Mennyi a valószínűsége, hogy pontosan 2 fehér lesz köztük?',
    figure: <UrnFig groups={[{ color: 'white', count: 5 }, { color: 'black', count: 3 }]} caption="egyszerre 3 golyót húzunk" />,
    options: ['15/28', '5/28', '3/8', '225/512'],
    correctAnswer: 0,
    explanation: '(5 alatt 2) · (3 alatt 1) = 10 · 3 = 30, összes: (8 alatt 3) = 56. p = 30/56 = 15/28 ≈ 0,536. (225/512 visszatevéssel adódna.)'
  },
  {
    id: 'swr-q18',
    level: 2,
    questionTypeBadge: 'Lehetetlen esemény',
    question: '50 pohár közül 3 csorba. Négy poharat választunk. Mennyi a valószínűsége, hogy mind a négy csorba?',
    figure: <GroupsFig total="50 pohár" a="csorba: 3" b="ép: 47" k="4 poharat választunk" />,
    options: ['0', '(3/50)⁴', '3/230 300', '1/230 300'],
    correctAnswer: 0,
    explanation: 'Csak 3 csorba pohár van, így 4 csorbát nem választhatunk: (3 alatt 4) = 0. Lehetetlen esemény.'
  },
  {
    id: 'swr-q19',
    level: 2,
    questionTypeBadge: 'Minőségellenőrzés',
    question: '50 pohár közül 3 csorba. Négy poharat választunk. Mennyi a valószínűsége, hogy mind a négy ép?',
    options: ['≈ 0,774', '≈ 0,781', '≈ 0,94', '≈ 0,226'],
    correctAnswer: 0,
    explanation: '(47 alatt 4) / (50 alatt 4) = 178 365 / 230 300 ≈ 0,774. (0,781 ≈ 0,94⁴ visszatevéses lenne; 0,226 a „legalább egy csorba”.)'
  },
  {
    id: 'swr-q20',
    level: 2,
    questionTypeBadge: 'Kártya',
    question: 'A 32 lapos magyar kártyából (8 makk) 3 lapot osztanak. Mennyi a valószínűsége, hogy pontosan 1 makk lesz köztük?',
    figure: <GroupsFig total="32 lap" a="makk: 8" b="nem makk: 24" k="3 lapot osztanak" />,
    options: ['≈ 0,445', '≈ 0,422', '≈ 0,148', '≈ 0,25'],
    correctAnswer: 0,
    explanation: '(8 alatt 1) · (24 alatt 2) / (32 alatt 3) = 8 · 276 / 4960 = 2208/4960 ≈ 0,445. (0,422 = 3 · 1/4 · (3/4)² visszatevéssel.)'
  },

  // LEVEL 3
  {
    id: 'swr-q21',
    level: 3,
    questionTypeBadge: 'Várható érték',
    question: 'A 12 játékosból (3 gólszerző) hármat választunk. A gólszerzők számának eloszlása: 0: 84/220, 1: 108/220, 2: 27/220, 3: 1/220. Mennyi a gólszerzők számának várható értéke?',
    options: ['0,75', '1', '1,5', '0,5'],
    correctAnswer: 0,
    explanation: 'E = (0 · 84 + 1 · 108 + 2 · 27 + 3 · 1)/220 = 165/220 = 0,75. (Ellenőrzés: 3 · 3/12 = 0,75.)'
  },
  {
    id: 'swr-q22',
    level: 3,
    questionTypeBadge: 'Pontosan j',
    question: 'Egy 36 fős osztályban 5-en gitároznak. Négy gyereket választunk. Mennyi a valószínűsége, hogy pontosan egyikük gitározik?',
    figure: <GroupsFig total="36 diák" a="gitáros: 5" b="nem gitáros: 31" k="4 diákot választunk" />,
    options: ['≈ 0,382', '≈ 0,355', '≈ 0,139', '≈ 0,079'],
    correctAnswer: 0,
    explanation: '(5 alatt 1) · (31 alatt 3) / (36 alatt 4) = 5 · 4495 / 58 905 = 22 475 / 58 905 ≈ 0,382.'
  },
  {
    id: 'swr-q23',
    level: 3,
    questionTypeBadge: 'Pontosan j',
    question: 'A 36 fős osztályból (5 gitáros) négy gyereket választunk. Mennyi a valószínűsége, hogy pontosan 2 gitározik közülük?',
    options: ['≈ 0,079', '≈ 0,086', '≈ 0,382', '≈ 0,017'],
    correctAnswer: 0,
    explanation: '(5 alatt 2) · (31 alatt 2) / (36 alatt 4) = 10 · 465 / 58 905 = 4650 / 58 905 ≈ 0,079.'
  },
  {
    id: 'swr-q24',
    level: 3,
    questionTypeBadge: 'Pontosan j',
    question: 'Egy 35 fős osztályban 10 tanulónak télen van a születésnapja. Négy tanulót választunk. Mennyi a valószínűsége, hogy pontosan hárman születtek télen?',
    figure: <GroupsFig total="35 tanuló" a="télen: 10" b="máskor: 25" k="4 tanulót választunk" />,
    options: ['≈ 0,057', '≈ 0,067', '≈ 0,0023', '≈ 0,004'],
    correctAnswer: 0,
    explanation: '(10 alatt 3) · (25 alatt 1) / (35 alatt 4) = 120 · 25 / 52 360 = 3000 / 52 360 ≈ 0,057. (0,067 visszatevéssel; 0,004 a „mind a 4 télen”.)'
  },
  {
    id: 'swr-q25',
    level: 3,
    questionTypeBadge: 'Minőségellenőrzés',
    question: '50 pohár közül 3 csorba. Négy poharat választunk. Mennyi a valószínűsége, hogy kettő csorba és kettő ép?',
    options: ['≈ 0,014', '≈ 0,019', '≈ 0,0047', '≈ 0,21'],
    correctAnswer: 0,
    explanation: '(3 alatt 2) · (47 alatt 2) / (50 alatt 4) = 3 · 1081 / 230 300 = 3243 / 230 300 ≈ 0,014.'
  },
  {
    id: 'swr-q26',
    level: 3,
    questionTypeBadge: 'Olimpia',
    question: 'Az 1952-es helsinki olimpia 189 magyar indulója közül 77 nyert érmet. Öt indulót választunk. Mennyi a valószínűsége, hogy pontosan ketten nyertek érmet?',
    figure: <GroupsFig total="189 induló" a="érmes: 77" b="nem érmes: 112" k="5 indulót választunk" />,
    options: ['≈ 0,350', '≈ 0,345', '≈ 0,166', '≈ 0,041'],
    correctAnswer: 0,
    explanation: '(77 alatt 2) · (112 alatt 3) / (189 alatt 5) ≈ 0,350. (0,345 a visszatevéses közelítés.)'
  },
  {
    id: 'swr-q27',
    level: 3,
    questionTypeBadge: 'Lottó',
    question: 'Mennyi a valószínűsége, hogy az ötös lottón pontosan 2 találatunk lesz?',
    figure: <GroupsFig total="90 szám" a="nyerő: 5" b="nem nyerő: 85" k="5 számot jelölünk meg" />,
    options: ['≈ 0,0225', '≈ 0,230', '≈ 0,0008', '≈ 0,0001'],
    correctAnswer: 0,
    explanation: '(5 alatt 2) · (85 alatt 3) / (90 alatt 5) = 10 · 98 770 / 43 949 268 ≈ 0,0225. (0,230 az egy találat valószínűsége.)'
  },
  {
    id: 'swr-q28',
    level: 3,
    questionTypeBadge: 'Lottó',
    question: 'Mennyi a valószínűsége, hogy az ötös lottón pontosan 1 találatunk lesz?',
    options: ['≈ 0,230', '≈ 0,221', '≈ 0,056', '≈ 0,746'],
    correctAnswer: 0,
    explanation: '(5 alatt 1) · (85 alatt 4) / (90 alatt 5) = 5 · 2 024 785 / 43 949 268 ≈ 0,230. (0,746 a nulla találat valószínűsége.)'
  },
  {
    id: 'swr-q29',
    level: 3,
    questionTypeBadge: 'Eloszlás',
    question: 'A 4 piros és 6 sárga golyó közül 5-öt húzunk. A 252 esetből hányban lesz pontosan 4 sárga golyó?',
    figure: <UrnFig groups={URN_4R6Y} caption="5 golyót húzunk: pontosan 4 sárga?" />,
    options: ['60', '15', '120', '19'],
    correctAnswer: 0,
    explanation: '(6 alatt 4) · (4 alatt 1) = 15 · 4 = 60. (Az összes eloszlás: 0 + 6 + 60 + 120 + 60 + 6 = 252 a 0, 1, …, 5 sárgára – az 1 sárgához 6 eset tartozik, a 0 sárga lehetetlen.)'
  },
  {
    id: 'swr-q30',
    level: 3,
    questionTypeBadge: 'Valószínűségi fa',
    question: 'Három golyót húzunk egymás után, visszatevés nélkül a 4 piros és 6 sárga közül. Mennyi a valószínűsége, hogy pontosan 2 piros lesz köztük?',
    figure: <UrnFig groups={URN_4R6Y} caption="3 húzás egymás után, visszatevés nélkül" />,
    options: ['3/10', '1/10', '36/125', '1/2'],
    correctAnswer: 0,
    explanation: 'Három út: PPS, PSP, SPP, mindegyik 4 · 3 · 6 / 720 = 72/720. Összesen 216/720 = 3/10. Kombinációkkal: (4 alatt 2) · (6 alatt 1) / (10 alatt 3) = 36/120 = 3/10. (36/125 visszatevéssel adódna.)'
  }
];

export const SamplingWithoutReplacementQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId="g11-stat-visszateves-nelkul-quiz"
      subtopicId="visszateves-nelkuli-mintavetel"
      title="11. Visszatevés nélküli mintavétel – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: pontosan j elem a mintában, valószínűségi fa, zenekar, Aranycsapat, lottó."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      themeColor="cyan"
      questions={SAMPLING_WITHOUT_REPLACEMENT_QUESTIONS}
      cheatSheets={[
        {
          title: 'Pontosan j elem',
          items: [
            'P = (m alatt j) · (n − m alatt k − j) / (n alatt k)',
            '„és” ⇒ a lehetőségek számát szorozzuk',
            '4 piros, 6 sárga, 5 húzás: P(3 sárga) = 120/252',
            'ellenőrzés: az összes j-re a valószínűségek összege 1'
          ]
        },
        {
          title: 'Valószínűségi fa',
          items: [
            'egy ág mentén: szorzás (4/10 · 3/9)',
            'több kedvező út: összeadás (24/90 + 24/90)',
            'minden húzás után eggyel kevesebb elem marad',
            'egymás után = egyszerre (visszatevés nélkül)'
          ]
        },
        {
          title: 'Ellenőrzött eredmények',
          items: [
            'zenekar: 91/276; 140/276; 56/276',
            'gólszerzők: 84, 108, 27, 1 a 220-ból; E = 0,75',
            'poharak: mind ép ≈ 0,774; 2 csorba + 2 ép ≈ 0,014',
            'gitárosok: pontosan 1 ≈ 0,382; pontosan 2 ≈ 0,079'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <SamplingWithoutReplacementMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <SamplingWithoutReplacementSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default SamplingWithoutReplacementQuiz;
