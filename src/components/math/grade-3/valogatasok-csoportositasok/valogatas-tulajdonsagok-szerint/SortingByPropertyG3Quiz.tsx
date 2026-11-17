import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SortingByPropertyG3Matcher } from './SortingByPropertyG3Matcher';
import { SortingByPropertyG3Sorter } from './SortingByPropertyG3Sorter';
import { FONT, B, Block, LogicBlock, LabelBox, NumCard, Btn, BT, SewButton } from './SortingByPropertyG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const Txt: React.FC<{ x: number; y: number; s?: number; c?: string; children: React.ReactNode }> = ({ x, y, s = 13, c = '#0f172a', children }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={s} fontWeight="bold" fill={c}>
    {children}
  </text>
);

/** A kérdezett lap (bal oldalt) és mellette egy másik méretű lap, hogy a méret összevethető legyen. */
const OneBlock: React.FC<{ b: Block; other: Block }> = ({ b, other }) => (
  <QFig h={140}>
    <rect x="22" y="8" width="116" height="104" rx="10" fill="#fef2f2" stroke={UNK} strokeWidth="2" strokeDasharray="5 4" />
    <LogicBlock b={b} x={80} y={60} k={1.6} sw={3} />
    <LogicBlock b={other} x={185} y={60} k={1.6} sw={3} />
    <Txt x={80} y={131} s={14} c={UNK}>Milyen ez?</Txt>
  </QFig>
);

/** Számozott lapok sorban (max. 4) vagy két sorban (5–8). */
const Row: React.FC<{ blocks: Block[]; labels?: string[] }> = ({ blocks, labels }) => {
  const n = blocks.length;
  if (n <= 4) {
    const step = 240 / n;
    return (
      <QFig h={110}>
        {blocks.map((b, i) => (
          <g key={i}>
            <LogicBlock b={b} x={step * (i + 0.5)} y={48} k={1.05} />
            <Txt x={step * (i + 0.5)} y={98} s={14}>{labels ? labels[i] : `${i + 1}.`}</Txt>
          </g>
        ))}
      </QFig>
    );
  }
  const perRow = Math.ceil(n / 2);
  const step = 240 / perRow;
  return (
    <QFig h={170}>
      {blocks.map((b, i) => {
        const r = Math.floor(i / perRow);
        const c = i % perRow;
        return (
          <g key={i}>
            <LogicBlock b={b} x={step * (c + 0.5)} y={42 + r * 80} k={0.95} />
            <Txt x={step * (c + 0.5)} y={78 + r * 80} s={12}>{labels ? labels[i] : `${i + 1}.`}</Txt>
          </g>
        );
      })}
    </QFig>
  );
};

/** Számkártyák egy sorban. */
const Nums: React.FC<{ nums: (number | string)[]; title?: string }> = ({ nums, title }) => {
  const step = 240 / nums.length;
  return (
    <QFig h={title ? 100 : 80}>
      {title && <Txt x={120} y={24} s={13}>{title}</Txt>}
      {nums.map((n, i) => (
        <NumCard key={i} x={step * (i + 0.5)} y={title ? 64 : 40} n={n} w={Math.min(50, step - 8)} fs={n === '?' ? 20 : 17} fill={n === '?' ? '#fee2e2' : '#ffffff'} color={n === '?' ? UNK : '#0f172a'} />
      ))}
    </QFig>
  );
};

/** Egy címkés doboz és mellette a „?” elem. */
const BoxAndItem: React.FC<{ label: string; item: React.ReactNode }> = ({ label, item }) => (
  <QFig h={130}>
    <LabelBox x={8} y={30} w={172} h={88} label={label} fs={11} />
    {item}
  </QFig>
);

/** Két címkés doboz. */
const TwoBoxes: React.FC<{ l1: string; l2: string; item: React.ReactNode; c1?: React.ReactNode; c2?: React.ReactNode }> = ({ l1, l2, item, c1, c2 }) => (
  <QFig h={160}>
    <LabelBox x={8} y={26} w={108} h={82} label={l1} fill="#fef2f2" stroke="#dc2626" fs={11} />
    <LabelBox x={124} y={26} w={108} h={82} label={l2} fill="#f1f5f9" stroke="#475569" fs={11} />
    {c1}
    {c2}
    {item}
  </QFig>
);

const ButtonsRow: React.FC<{ btns: Btn[] }> = ({ btns }) => {
  const step = 240 / btns.length;
  return (
    <QFig h={110}>
      {btns.map((b, i) => (
        <g key={i}>
          <SewButton b={b} x={step * (i + 0.5)} y={48} r={Math.min(22, step / 2 - 6)} sw={2.5} />
          <Txt x={step * (i + 0.5)} y={98} s={13}>{i + 1}.</Txt>
        </g>
      ))}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const SORTING_BY_PROPERTY_G3_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint -----
  {
    id: 'sbp-g3-q1',
    level: 1,
    questionTypeBadge: 'Logikai lap',
    figure: <OneBlock b={B('kek', 'haromszog', true, true)} other={B('sarga', 'kor', false, false)} />,
    question: 'Melyik igaz a bal oldali lapra?',
    options: ['nagy, kék, lyukas háromszög', 'kicsi, kék, lyukas háromszög', 'nagy, kék, nem lyukas háromszög', 'nagy, zöld, lyukas háromszög'],
    correctAnswer: 0,
    explanation: 'Nagy, kék, a közepén lyuk van, és háromszög. Mind a négy tulajdonságot nézd meg!'
  },
  {
    id: 'sbp-g3-q2',
    level: 1,
    questionTypeBadge: 'Logikai lap',
    figure: <OneBlock b={B('sarga', 'kor', false, false)} other={B('piros', 'negyzet', true, true)} />,
    question: 'Milyen a bal oldali lap?',
    options: ['kicsi és nem lyukas', 'kicsi és lyukas', 'nagy és nem lyukas', 'nagy és lyukas'],
    correctAnswer: 0,
    explanation: 'Ez egy kicsi sárga kör. Nincs rajta lyuk, tehát nem lyukas.'
  },
  {
    id: 'sbp-g3-q3',
    level: 1,
    questionTypeBadge: 'Logikai lap',
    question: 'Hányféle színű lap van a logikai készletben?',
    options: ['4', '3', '2', '5'],
    correctAnswer: 0,
    explanation: 'Négy szín van: piros, sárga, kék és zöld.'
  },
  {
    id: 'sbp-g3-q4',
    level: 1,
    questionTypeBadge: 'Logikai lap',
    question: 'Hányféle formájú lap van a logikai készletben?',
    options: ['3', '4', '2', '5'],
    correctAnswer: 0,
    explanation: 'Három forma van: kör, háromszög és négyzet. Téglalap nincs a készletben.'
  },
  {
    id: 'sbp-g3-q5',
    level: 1,
    questionTypeBadge: 'Válogatás',
    figure: <Row blocks={[B('piros', 'kor', true, false), B('kek', 'negyzet', false, true), B('piros', 'haromszog', false, true), B('zold', 'kor', true, true), B('piros', 'negyzet', true, true), B('sarga', 'haromszog', true, false)]} />,
    question: 'Hány piros lap van a képen?',
    options: ['3', '2', '4', '6'],
    correctAnswer: 0,
    explanation: 'Az 1., a 3. és az 5. lap piros. Ez 3 lap.'
  },
  {
    id: 'sbp-g3-q6',
    level: 1,
    questionTypeBadge: 'Kakukktojás',
    figure: <Row blocks={[B('zold', 'kor', true, false), B('zold', 'kor', true, false), B('zold', 'negyzet', true, false), B('zold', 'kor', true, false)]} />,
    question: 'Melyik lap nem illik a sorba?',
    options: ['a 3.', 'az 1.', 'a 2.', 'a 4.'],
    correctAnswer: 0,
    explanation: 'A 3. lap négyzet, a többi kör. Minden más tulajdonságuk egyforma.'
  },
  {
    id: 'sbp-g3-q7',
    level: 1,
    questionTypeBadge: 'Kakukktojás',
    figure: <Nums nums={[20, 40, 85, 70]} />,
    question: 'Melyik szám nem illik a sorba?',
    options: ['85', '20', '40', '70'],
    correctAnswer: 0,
    explanation: 'A 20, a 40 és a 70 kerek tízes. A 85 nem az, mert 5-re végződik.'
  },
  {
    id: 'sbp-g3-q8',
    level: 1,
    questionTypeBadge: 'Válogatás',
    figure: (
      <TwoBoxes
        l1="piros lapok"
        l2="nem piros lapok"
        c1={<LogicBlock b={B('piros', 'negyzet', false, false)} x={62} y={70} />}
        c2={<LogicBlock b={B('sarga', 'kor', false, true)} x={177} y={70} />}
        item={
          <g>
            <LogicBlock b={B('kek', 'kor', true, false)} x={100} y={134} k={0.9} />
            <Txt x={140} y={142} s={22} c={UNK}>?</Txt>
          </g>
        }
      />
    ),
    question: 'Hová kerül a kék kör?',
    options: ['a nem piros lapok közé', 'a piros lapok közé', 'egyik dobozba sem', 'mindkét dobozba'],
    correctAnswer: 0,
    explanation: 'A kék kör nem piros. Ezért a „nem piros lapok” közé kerül.'
  },
  {
    id: 'sbp-g3-q9',
    level: 1,
    questionTypeBadge: 'Címke',
    figure: (
      <QFig h={120}>
        <LabelBox x={20} y={26} w={200} h={84} label="?" fs={14} />
        <LogicBlock b={B('piros', 'haromszog', true, true)} x={60} y={70} />
        <LogicBlock b={B('kek', 'haromszog', false, false)} x={120} y={74} />
        <LogicBlock b={B('sarga', 'haromszog', true, false)} x={180} y={70} />
      </QFig>
    ),
    question: 'Melyik címke illik a dobozra?',
    options: ['háromszögek', 'piros lapok', 'lyukas lapok', 'nagy lapok'],
    correctAnswer: 0,
    explanation: 'Mindhárom lap háromszög. A színük, a méretük és a lyukuk különböző.'
  },
  {
    id: 'sbp-g3-q10',
    level: 1,
    questionTypeBadge: 'Számok válogatása',
    figure: <BoxAndItem label="háromjegyű számok" item={<NumCard x={210} y={74} n="?" fill="#fee2e2" color={UNK} />} />,
    question: 'Melyik szám kerülhet a dobozba?',
    options: ['105', '99', '58', '7'],
    correctAnswer: 0,
    explanation: 'A 105-nek három számjegye van: 1, 0, 5. A 99 és az 58 kétjegyű, a 7 egyjegyű.'
  },

  // ----- 2. szint -----
  {
    id: 'sbp-g3-q11',
    level: 2,
    questionTypeBadge: 'Két tulajdonság',
    figure: (
      <Row
        blocks={[
          B('piros', 'kor', true, true),
          B('piros', 'negyzet', true, false),
          B('kek', 'kor', false, true),
          B('piros', 'haromszog', false, true),
          B('sarga', 'negyzet', true, true),
          B('piros', 'kor', false, false),
          B('piros', 'negyzet', false, true),
          B('zold', 'haromszog', true, true)
        ]}
      />
    ),
    question: 'Hány lap piros és lyukas is?',
    options: ['3', '5', '4', '2'],
    correctAnswer: 0,
    explanation: 'Piros és lyukas: az 1., a 4. és a 7. lap. Ez 3 lap. (5 piros lap van, de a 2. és a 6. nem lyukas.)'
  },
  {
    id: 'sbp-g3-q12',
    level: 2,
    questionTypeBadge: 'Válogatás',
    figure: (
      <QFig h={130}>
        <LabelBox x={10} y={24} w={220} h={98} label="lyukas lapok" fs={12} />
        {[B('kek', 'kor', true, true), B('sarga', 'haromszog', false, true), B('piros', 'negyzet', true, true), B('zold', 'kor', true, false), B('kek', 'negyzet', false, true)].map((b, i) => (
          <g key={i}>
            <LogicBlock b={b} x={34 + i * 43} y={66} k={0.85} />
            <Txt x={34 + i * 43} y={110} s={12}>{i + 1}.</Txt>
          </g>
        ))}
      </QFig>
    ),
    question: 'Melyik lap került rossz dobozba?',
    options: ['a 4.', 'az 1.', 'a 2.', 'az 5.'],
    correctAnswer: 0,
    explanation: 'A 4. lap, a zöld kör nem lyukas. Nem lehet a „lyukas lapok” között.'
  },
  {
    id: 'sbp-g3-q13',
    level: 2,
    questionTypeBadge: 'Címke',
    figure: <Nums title="Mi a címke?" nums={[130, 250, 470, 60, 310]} />,
    question: 'Melyik címke illik ezekre a számokra?',
    options: ['kerek tízesek', 'háromjegyű számok', '300-nál nagyobb számok', 'páratlan számok'],
    correctAnswer: 0,
    explanation: 'Mindegyik szám 0-ra végződik, tehát kerek tízes. A 60 kétjegyű, a 130 kisebb 300-nál.'
  },
  {
    id: 'sbp-g3-q14',
    level: 2,
    questionTypeBadge: 'Kakukktojás',
    figure: <Row blocks={[B('piros', 'kor', true, true), B('piros', 'kor', true, false), B('piros', 'kor', true, true), B('piros', 'kor', true, true)]} />,
    question: 'A 2. lap nem illik a sorba. Miért?',
    options: ['mert nem lyukas', 'mert nem piros', 'mert nem kör', 'mert kicsi'],
    correctAnswer: 0,
    explanation: 'Mind a négy lap nagy, piros kör. Csak a 2. lapon nincs lyuk.'
  },
  {
    id: 'sbp-g3-q15',
    level: 2,
    questionTypeBadge: 'Barkochba',
    figure: <Row blocks={[B('piros', 'kor', true, false), B('kek', 'kor', true, false), B('kek', 'kor', false, false), B('kek', 'negyzet', true, false)]} labels={['A', 'B', 'C', 'D']} />,
    question: 'Barkochba: „Piros?” – nem. „Kör?” – igen. „Nagy?” – igen. Melyik lapra gondoltam?',
    options: ['B', 'A', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'Nem piros: az A kiesik. Kör: a D kiesik. Nagy: a C kiesik. Csak a B marad.'
  },
  {
    id: 'sbp-g3-q16',
    level: 2,
    questionTypeBadge: 'Számok válogatása',
    figure: <BoxAndItem label="páros és 300-nál nagyobb" item={<NumCard x={210} y={74} n="?" fill="#fee2e2" color={UNK} />} />,
    question: 'Melyik szám kerülhet a dobozba?',
    options: ['348', '248', '351', '299'],
    correctAnswer: 0,
    explanation: 'A 348 páros (8-ra végződik), és nagyobb 300-nál. A 248 kisebb 300-nál, a 351 és a 299 páratlan.'
  },
  {
    id: 'sbp-g3-q17',
    level: 2,
    questionTypeBadge: 'Barkochba',
    question: 'Barkochba: „Kicsi?” – nem. Mit tudsz biztosan a lapról?',
    options: ['A lap nagy.', 'A lap lyukas.', 'A lap kör.', 'A lap piros.'],
    correctAnswer: 0,
    explanation: 'Minden lap vagy kicsi, vagy nagy. Ha nem kicsi, akkor nagy. A többiről még nem tudunk semmit.'
  },
  {
    id: 'sbp-g3-q18',
    level: 2,
    questionTypeBadge: 'Válogatási fa',
    figure: (
      <QFig h={170}>
        <g stroke="#475569" strokeWidth="2" fill="none">
          <path d="M120 34 L60 66" />
          <path d="M120 34 L180 66" />
          <path d="M60 86 L30 118" />
          <path d="M60 86 L90 118" />
          <path d="M180 86 L150 118" />
          <path d="M180 86 L210 118" />
        </g>
        <rect x="55" y="10" width="130" height="24" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
        <Txt x={120} y={27} s={12}>kicsi, kék lapok</Txt>
        <rect x="22" y="66" width="76" height="20" rx="6" fill="#fff" stroke="#475569" strokeWidth="1.5" />
        <Txt x={60} y={80} s={11}>lyukas</Txt>
        <rect x="136" y="66" width="88" height="20" rx="6" fill="#fff" stroke="#475569" strokeWidth="1.5" />
        <Txt x={180} y={80} s={11}>nem lyukas</Txt>
        <Txt x={30} y={164} s={11}>kör</Txt>
        <Txt x={90} y={164} s={11}>négyzet</Txt>
        <Txt x={150} y={164} s={11}>kör</Txt>
        <Txt x={210} y={164} s={11}>négyzet</Txt>
        <LogicBlock b={B('kek', 'kor', false, true)} x={30} y={136} k={1.05} />
        <LogicBlock b={B('kek', 'negyzet', false, true)} x={90} y={136} k={1.05} />
        <Txt x={150} y={145} s={26} c={UNK}>?</Txt>
        <LogicBlock b={B('kek', 'negyzet', false, false)} x={210} y={136} k={1.05} />
      </QFig>
    ),
    question: 'Melyik lap kerül a kérdőjel helyére?',
    options: ['kicsi, kék, nem lyukas kör', 'kicsi, kék, lyukas kör', 'nagy, kék, nem lyukas kör', 'kicsi, kék, nem lyukas négyzet'],
    correctAnswer: 0,
    explanation: 'A fa teteje: kicsi, kék. Az ág: nem lyukas. Az alsó felirat: kör. Együtt: kicsi, kék, nem lyukas kör.'
  },
  {
    id: 'sbp-g3-q19',
    level: 2,
    questionTypeBadge: 'Kakukktojás',
    figure: <Nums nums={[135, 247, 412, 309, 451]} />,
    question: 'Melyik szám nem illik a sorba?',
    options: ['412', '135', '247', '451'],
    correctAnswer: 0,
    explanation: 'A 135, a 247, a 309 és a 451 páratlan. A 412 páros, mert 2-re végződik.'
  },
  {
    id: 'sbp-g3-q20',
    level: 2,
    questionTypeBadge: 'Számok válogatása',
    figure: (
      <TwoBoxes
        l1={'250-nél\nkisebb'}
        l2={'nem kisebb\n250-nél'}
        c1={<NumCard x={62} y={70} n={180} />}
        c2={<NumCard x={177} y={70} n={320} />}
        item={
          <g>
            <NumCard x={100} y={134} n={250} />
            <Txt x={146} y={142} s={22} c={UNK}>?</Txt>
          </g>
        }
      />
    ),
    question: 'Hová kerül a 250?',
    options: ['a „nem kisebb 250-nél” dobozba', 'a „250-nél kisebb” dobozba', 'mindkét dobozba', 'egyik dobozba sem'],
    correctAnswer: 0,
    explanation: 'A 250 nem kisebb önmagánál. Ezért a „nem kisebb 250-nél” dobozba kerül. Minden számnak van helye.'
  },

  // ----- 3. szint -----
  {
    id: 'sbp-g3-q21',
    level: 3,
    questionTypeBadge: 'Két tulajdonság',
    figure: (
      <Row
        blocks={[
          B('piros', 'kor', true, false),
          B('kek', 'negyzet', false, false),
          B('sarga', 'haromszog', true, true),
          B('zold', 'kor', false, false),
          B('piros', 'negyzet', false, true),
          B('kek', 'haromszog', true, false),
          B('sarga', 'kor', false, true),
          B('zold', 'negyzet', true, false)
        ]}
      />
    ),
    question: 'Hány lap nem piros és nem lyukas?',
    options: ['4', '2', '5', '6'],
    correctAnswer: 0,
    explanation: 'Nem piros és nem lyukas: a 2., a 4., a 6. és a 8. lap. Ez 4 lap. Az 1. lap nem lyukas, de piros.'
  },
  {
    id: 'sbp-g3-q22',
    level: 3,
    questionTypeBadge: 'Barkochba',
    figure: <Row blocks={[B('piros', 'kor', true, true), B('kek', 'negyzet', true, true), B('sarga', 'kor', false, true), B('zold', 'haromszog', false, true)]} labels={['A', 'B', 'C', 'D']} />,
    question: 'Ezek közül gondoltam egyre. Melyik kérdés felesleges, mert mind a négy lapra ugyanaz a válasz?',
    options: ['Lyukas?', 'Nagy?', 'Kör?', 'Piros?'],
    correctAnswer: 0,
    explanation: 'Mind a négy lap lyukas, így a „Lyukas?” kérdésre mindig „igen” a válasz. Egy lapot sem zár ki.'
  },
  {
    id: 'sbp-g3-q23',
    level: 3,
    questionTypeBadge: 'Címke',
    figure: (
      <QFig h={150}>
        <LabelBox x={8} y={24} w={108} h={116} label="?" fill="#eff6ff" stroke="#2563eb" fs={14} />
        <LabelBox x={124} y={24} w={108} h={116} label="páratlan számok" fill="#fff7ed" stroke="#ea580c" fs={11} />
        {[124, 86, 300, 452].map((n, i) => (
          <NumCard key={n} x={36 + (i % 2) * 52} y={i < 2 ? 66 : 112} n={n} w={44} fs={15} />
        ))}
        {[37, 215, 409].map((n, i) => (
          <NumCard key={n} x={152 + (i % 2) * 52} y={i < 2 ? 66 : 112} n={n} w={44} fs={15} />
        ))}
      </QFig>
    ),
    question: 'Mi lehet a bal oldali doboz címkéje?',
    options: ['páros számok', 'háromjegyű számok', '300-nál kisebb számok', 'kerek tízesek'],
    correctAnswer: 0,
    explanation: 'A 124, a 86, a 300 és a 452 mind páros. A 86 nem háromjegyű, a 300 és a 452 nem kisebb 300-nál, a 124 nem kerek tízes.'
  },
  {
    id: 'sbp-g3-q24',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: (
      <QFig h={130}>
        {[
          ['A', 'tejcsoki', '280 Ft', '#fde68a'],
          ['B', 'étcsoki', '250 Ft', '#a16207'],
          ['C', 'tejcsoki', '340 Ft', '#fde68a'],
          ['D', 'fehér', '310 Ft', '#ffffff']
        ].map(([l, n, p, c], i) => (
          <g key={l}>
            <rect x={8 + i * 58} y="14" width="52" height="104" rx="8" fill={c} stroke="#78350f" strokeWidth="2" />
            <Txt x={34 + i * 58} y={36} s={15} c={c === '#a16207' ? '#ffffff' : '#0f172a'}>{l}</Txt>
            <Txt x={34 + i * 58} y={70} s={11} c={c === '#a16207' ? '#ffffff' : '#0f172a'}>{n}</Txt>
            <rect x={13 + i * 58} y="84" width="42" height="24" rx="5" fill="#ffffff" stroke="#78350f" strokeWidth="1.5" />
            <Txt x={34 + i * 58} y={101} s={12}>{p}</Txt>
          </g>
        ))}
      </QFig>
    ),
    question: 'Bálint csokit választ. Legyen 300 Ft-nál olcsóbb, és ne legyen étcsoki. Melyiket veszi meg?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: '300 Ft-nál olcsóbb: az A (280 Ft) és a B (250 Ft). A B étcsoki, ezért az A marad.'
  },
  {
    id: 'sbp-g3-q25',
    level: 3,
    questionTypeBadge: 'Kakukktojás',
    figure: <Row blocks={[B('piros', 'kor', true, true), B('piros', 'negyzet', true, true), B('piros', 'kor', false, true), B('piros', 'kor', true, true)]} />,
    question: 'Ebben a sorban két lap is lehet kakukktojás. Melyik indoklás jó?',
    options: ['A 3. nem illik, mert kicsi.', 'Az 1. nem illik, mert lyukas.', 'A 4. nem illik, mert nagy.', 'A 2. nem illik, mert kicsi.'],
    correctAnswer: 0,
    explanation: 'A 3. lap kicsi, a többi nagy. A 2. lap is kilóg, mert négyzet. Mindegyik lap lyukas és piros.'
  },
  {
    id: 'sbp-g3-q26',
    level: 3,
    questionTypeBadge: 'Válogatási fa',
    figure: (
      <QFig h={172}>
        <g stroke="#475569" strokeWidth="2" fill="none">
          <path d="M120 34 L64 62" />
          <path d="M120 34 L176 62" />
          <path d="M64 84 L30 112" />
          <path d="M64 84 L90 112" />
          <path d="M176 84 L150 112" />
          <path d="M176 84 L210 112" />
        </g>
        <rect x="70" y="10" width="100" height="24" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <Txt x={120} y={27} s={12}>számok 500-ig</Txt>
        <rect x="28" y="62" width="72" height="22" rx="6" fill="#fff" stroke="#475569" strokeWidth="1.5" />
        <Txt x={64} y={77} s={11}>páros</Txt>
        <rect x="134" y="62" width="84" height="22" rx="6" fill="#fff" stroke="#475569" strokeWidth="1.5" />
        <Txt x={176} y={77} s={11}>páratlan</Txt>
        {[
          [30, 'kisebb', 'A'],
          [90, 'nem kisebb', 'B'],
          [150, 'kisebb', 'C'],
          [210, 'nem kisebb', 'D']
        ].map(([x, t, l]) => (
          <g key={l as string}>
            <rect x={(x as number) - 28} y="112" width="56" height="52" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
            <Txt x={x as number} y={125} s={9}>{t}</Txt>
            <Txt x={x as number} y={137} s={9}>300-nál</Txt>
            <Txt x={x as number} y={157} s={15} c="#15803d">{l}</Txt>
          </g>
        ))}
      </QFig>
    ),
    question: 'Melyik ágra kerül a 315?',
    options: ['D', 'A', 'B', 'C'],
    correctAnswer: 0,
    explanation: 'A 315 páratlan (5-re végződik): jobb oldal. Nem kisebb 300-nál: a D ág.'
  },
  {
    id: 'sbp-g3-q27',
    level: 3,
    questionTypeBadge: 'Számok válogatása',
    figure: <Nums title="háromjegyű és páros?" nums={[105, 48, 230, 7, 316, 99]} />,
    question: 'Hány számot kell kivenni a dobozból?',
    options: ['4', '3', '2', '5'],
    correctAnswer: 0,
    explanation: 'Háromjegyű és páros: 230 és 316. A 105 páratlan, a 48 és a 99 kétjegyű, a 7 egyjegyű. 4 számot kell kivenni.'
  },
  {
    id: 'sbp-g3-q28',
    level: 3,
    questionTypeBadge: 'Barkochba',
    question: 'Lili egy lapra gondolt. Nem piros, nem sárga, nem zöld. Nem kör és nem négyzet. Nagy és lyukas. Melyik lap ez?',
    options: ['nagy, kék, lyukas háromszög', 'nagy, kék, lyukas négyzet', 'kicsi, kék, lyukas háromszög', 'nagy, zöld, lyukas háromszög'],
    correctAnswer: 0,
    explanation: 'Nem piros, nem sárga, nem zöld: kék. Nem kör, nem négyzet: háromszög. Plusz nagy és lyukas.'
  },
  {
    id: 'sbp-g3-q29',
    level: 3,
    questionTypeBadge: 'Gombok',
    figure: <ButtonsRow btns={[BT('kerek', 2, 'piros'), BT('kerek', 4, 'kek'), BT('negyzet', 2, 'sarga'), BT('kerek', 2, 'zold'), BT('hatszog', 4, 'lila'), BT('kerek', 2, 'barna')]} />,
    question: 'A dobozba csak kerek, kétlyukú gomb kerülhet. Hány gombot kell kivenni?',
    options: ['3', '2', '4', '1'],
    correctAnswer: 0,
    explanation: 'Kerek és kétlyukú: az 1., a 4. és a 6. A 2. négylyukú, a 3. négyzet, az 5. hatszög. 3 gombot kell kivenni.'
  },
  {
    id: 'sbp-g3-q30',
    level: 3,
    questionTypeBadge: 'Címke',
    figure: (
      <QFig h={130}>
        <LabelBox x={10} y={24} w={220} h={98} label="?" fs={14} />
        {[B('piros', 'kor', false, false), B('kek', 'negyzet', false, false), B('zold', 'haromszog', false, false), B('sarga', 'kor', false, false)].map((b, i) => (
          <LogicBlock key={i} b={b} x={42 + i * 52} y={76} k={1.1} />
        ))}
      </QFig>
    ),
    question: 'Melyik címke illik a dobozra?',
    options: ['kicsi, nem lyukas lapok', 'kicsi körök', 'kicsi, lyukas lapok', 'nagy, nem lyukas lapok'],
    correctAnswer: 0,
    explanation: 'Mindegyik lap kicsi, és egyiken sincs lyuk. A forma és a szín különböző, így „kicsi körök” nem jó.'
  }
];

export const SortingByPropertyG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="valogatasok-csoportositasok"
      topicId="g3-grp-tulajdonsagok-quiz"
      subtopicId="valogatas-tulajdonsagok-szerint"
      title="1. Válogatás tulajdonságok szerint – Kvíz"
      subtitle="30 feladat 3 szinten: logikai lapok, címkék, kakukktojás, barkochba."
      badge="3. OSZTÁLY • VI. VÁLOGATÁSOK, CSOPORTOSÍTÁSOK • KVÍZ"
      questions={SORTING_BY_PROPERTY_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'A logikai lapok',
          items: ['szín: piros, sárga, kék, zöld', 'forma: kör, háromszög, négyzet', 'méret: nagy, kicsi', 'lyukas vagy nem lyukas']
        },
        {
          title: 'Címke',
          items: ['A címke megmondja, mi kerül a dobozba.', '„piros és lyukas”: mindkettő igaz legyen.', '„nem piros”: minden más szín.']
        },
        {
          title: 'Kakukktojás, barkochba',
          items: ['Keresd meg, miben más az egyik!', 'Mondd el az okát is!', 'Barkochba: csak igen / nem a válasz.']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <SortingByPropertyG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <SortingByPropertyG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default SortingByPropertyG3Quiz;
