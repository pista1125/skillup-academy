import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { LogicBlocks4Matcher } from './LogicBlocks4Matcher';
import { LogicBlocks4Sorter } from './LogicBlocks4Sorter';
import { BlockShapeG, LogicBlock, BlockColor, BlockShape, BlockSize } from './LogicBlocks4Figures';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek. Az ismeretlen: piros „?”.
// ---------------------------------------------------------------------------
const UNK = '#dc2626';
const B = (color: BlockColor, shape: BlockShape, size: BlockSize, holed = false): LogicBlock => ({ color, shape, size, holed });

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 100 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[300px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#ecfdf5" stroke="#a7f3d0" />
    {children}
  </svg>
);

/** Sorozat: lapok nyilakkal, a végén „?”. */
const SeqFig: React.FC<{ items: LogicBlock[]; tail?: boolean }> = ({ items, tail = true }) => (
  <QFig h={80}>
    {items.map((b, i) => (
      <g key={i}>
        <BlockShapeG b={b} cx={40 + i * 70} cy={40} />
        {(i < items.length - 1 || tail) && (
          <text x={75 + i * 70} y={46} fontSize="18" fontWeight="bold" textAnchor="middle" fill="#64748b">→</text>
        )}
      </g>
    ))}
    {tail && (
      <text x={40 + items.length * 70} y={48} fontSize="24" fontWeight="bold" textAnchor="middle" fill={UNK}>?</text>
    )}
  </QFig>
);

/** Betűjeles lapok (A, B, C, D). */
const LettersFig: React.FC<{ items: LogicBlock[] }> = ({ items }) => (
  <QFig h={96}>
    {items.map((b, i) => (
      <g key={i}>
        <BlockShapeG b={b} cx={40 + i * 60} cy={42} />
        <text x={40 + i * 60} y={86} fontSize="14" fontWeight="bold" textAnchor="middle" fill="#065f46">{String.fromCharCode(65 + i)}</text>
      </g>
    ))}
  </QFig>
);

/** Lapok sora (Rontó játék). */
const RowFig: React.FC<{ items: LogicBlock[]; note: string; unknown?: boolean }> = ({ items, note, unknown = true }) => (
  <QFig h={96}>
    {items.map((b, i) => (
      <BlockShapeG key={i} b={b} cx={30 + i * 44} cy={40} scale={0.85} />
    ))}
    {unknown && (
      <text x={30 + items.length * 44} y={48} fontSize="22" fontWeight="bold" textAnchor="middle" fill={UNK}>?</text>
    )}
    <text x="130" y="86" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#4c1d95">{note}</text>
  </QFig>
);

/** Felmutatott lap és a közös tulajdonságok száma. */
const ShownFig: React.FC<{ b: LogicBlock; common: string }> = ({ b, common }) => (
  <QFig h={96}>
    <text x="60" y="20" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#334155">felmutatott lap</text>
    <BlockShapeG b={b} cx={60} cy={54} />
    <text x="170" y="20" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#334155">közös tulajdonság</text>
    <text x="170" y="62" fontSize="28" fontWeight="bold" textAnchor="middle" fill="#92400e">{common}</text>
    <text x="230" y="62" fontSize="22" fontWeight="bold" textAnchor="middle" fill={UNK}>?</text>
  </QFig>
);

/** Két halmaz (Venn-diagram) a közös résszel. */
const VennFig: React.FC = () => (
  <QFig h={120}>
    <circle cx="100" cy="62" r="46" fill="#fecaca" fillOpacity="0.7" stroke="#dc2626" strokeWidth="2" />
    <circle cx="160" cy="62" r="46" fill="#bfdbfe" fillOpacity="0.7" stroke="#2563eb" strokeWidth="2" />
    <text x="72" y="20" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#b91c1c">piros: 12</text>
    <text x="190" y="20" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1d4ed8">kör: 16</text>
    <text x="130" y="60" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#334155">piros kör</text>
    <text x="130" y="76" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#334155">4</text>
    <text x="130" y="116" fontSize="12" fontWeight="bold" textAnchor="middle" fill={UNK}>piros vagy kör: ?</text>
  </QFig>
);

/** „Négyzet vagy kör”: a háromszög áthúzva. */
const OrShapesFig: React.FC = () => (
  <QFig h={90}>
    <BlockShapeG b={B('kék', 'négyzet', 'nagy')} cx={50} cy={42} />
    <text x="50" y="80" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#16a34a">✓</text>
    <text x="95" y="48" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#334155">vagy</text>
    <BlockShapeG b={B('kék', 'kör', 'nagy')} cx={140} cy={42} />
    <text x="140" y="80" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#16a34a">✓</text>
    <BlockShapeG b={B('kék', 'háromszög', 'nagy')} cx={215} cy={42} dim />
    <line x1="195" y1="22" x2="235" y2="62" stroke={UNK} strokeWidth="3" />
    <text x="215" y="80" fontSize="12" fontWeight="bold" textAnchor="middle" fill={UNK}>✗</text>
  </QFig>
);

/** Példák kicsi, lyukas lapokra. */
const ExamplesFig: React.FC<{ items: LogicBlock[]; note: string }> = ({ items, note }) => (
  <QFig h={90}>
    {items.map((b, i) => (
      <BlockShapeG key={i} b={b} cx={30 + i * 40} cy={38} />
    ))}
    <text x={30 + items.length * 40} y={44} fontSize="16" fontWeight="bold" textAnchor="middle" fill="#334155">…</text>
    <text x="130" y="80" fontSize="12" fontWeight="bold" textAnchor="middle" fill={UNK}>{note}</text>
  </QFig>
);

/** Az asztalon maradt piros lapok, egy hely üres. */
const MissingFig: React.FC = () => {
  const reds: LogicBlock[] = (['kör', 'négyzet', 'háromszög'] as BlockShape[]).flatMap((sh) =>
    (['nagy', 'kicsi'] as BlockSize[]).flatMap((sz) => [true, false].map((h) => B('piros', sh, sz, h)))
  );
  return (
    <QFig h={110}>
      {reds.map((b, i) => {
        const cx = 26 + (i % 6) * 42;
        const cy = 30 + Math.floor(i / 6) * 48;
        return i === 7 ? (
          <g key={i}>
            <rect x={cx - 16} y={cy - 16} width="32" height="32" rx="6" fill="none" stroke={UNK} strokeDasharray="4 3" strokeWidth="2" />
            <text x={cx} y={cy + 6} fontSize="16" fontWeight="bold" textAnchor="middle" fill={UNK}>?</text>
          </g>
        ) : (
          <BlockShapeG key={i} b={b} cx={cx} cy={cy} scale={0.7} />
        );
      })}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const LOGIC_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'lb-q1',
    level: 1,
    questionTypeBadge: 'Készlet',
    question: 'Hány lapból áll a logikai készlet?',
    options: ['48', '24', '36', '64'],
    correctAnswer: 0,
    explanation: '4 szín · 3 forma · 2 méret · 2 (lyukas / nem lyukas) = 48 lap.'
  },
  {
    id: 'lb-q2',
    level: 1,
    questionTypeBadge: 'Tulajdonságok',
    question: 'Hányféle színű lap van a logikai készletben?',
    options: ['4', '3', '2', '6'],
    correctAnswer: 0,
    explanation: 'Négy szín van: piros, sárga, kék és zöld.'
  },
  {
    id: 'lb-q3',
    level: 1,
    questionTypeBadge: 'Tulajdonságok',
    question: 'Melyik forma NINCS a logikai készletben?',
    options: ['téglalap', 'kör', 'négyzet', 'háromszög'],
    correctAnswer: 0,
    explanation: 'A készletben háromféle forma van: kör, négyzet és háromszög. Téglalap nincs benne.'
  },
  {
    id: 'lb-q4',
    level: 1,
    questionTypeBadge: 'Sorozat',
    figure: <SeqFig items={[B('sárga', 'négyzet', 'kicsi'), B('sárga', 'négyzet', 'nagy')]} />,
    question: 'Melyik tulajdonság változott a sorozatban?',
    options: ['a mérete', 'a színe', 'a formája', 'lyukas lett'],
    correctAnswer: 0,
    explanation: 'Mindkét lap sárga, nem lyukas négyzet. Csak a méret változott: kicsiből nagy lett.'
  },
  {
    id: 'lb-q5',
    level: 1,
    questionTypeBadge: 'Sorozat',
    figure: <SeqFig items={[B('piros', 'négyzet', 'kicsi'), B('piros', 'négyzet', 'kicsi', true)]} />,
    question: 'Melyik tulajdonság változott a sorozatban?',
    options: ['lyukas lett', 'a színe', 'a mérete', 'a formája'],
    correctAnswer: 0,
    explanation: 'Mindkettő kicsi piros négyzet, de a második lyukas.'
  },
  {
    id: 'lb-q6',
    level: 1,
    questionTypeBadge: 'Sorozat',
    figure: <SeqFig items={[B('sárga', 'négyzet', 'kicsi'), B('kék', 'négyzet', 'kicsi')]} />,
    question: 'Melyik tulajdonság változott a sorozatban?',
    options: ['a színe', 'a mérete', 'a formája', 'lyukas lett'],
    correctAnswer: 0,
    explanation: 'Mindkettő kicsi, nem lyukas négyzet; a sárgából kék lett.'
  },
  {
    id: 'lb-q7',
    level: 1,
    questionTypeBadge: 'Forma',
    question: 'Melyik logikai lapot határolja „csak görbe vonal”?',
    options: ['a kört', 'a négyzetet', 'a háromszöget', 'egyiket sem'],
    correctAnswer: 0,
    explanation: 'A négyzetet és a háromszöget egyenes vonalak határolják, a kört csak görbe vonal.'
  },
  {
    id: 'lb-q8',
    level: 1,
    questionTypeBadge: 'Számolás',
    question: 'Hány piros lap van a készletben?',
    options: ['12', '4', '16', '24'],
    correctAnswer: 0,
    explanation: 'Piros lapból 3 forma · 2 méret · 2 (lyukas / nem lyukas) = 12 van.'
  },
  {
    id: 'lb-q9',
    level: 1,
    questionTypeBadge: 'Számolás',
    question: 'Hány kör van a készletben?',
    options: ['16', '12', '4', '24'],
    correctAnswer: 0,
    explanation: 'Körből 4 szín · 2 méret · 2 (lyukas / nem lyukas) = 16 van.'
  },
  {
    id: 'lb-q10',
    level: 1,
    questionTypeBadge: 'Lap megnevezése',
    figure: <LettersFig items={[B('kék', 'háromszög', 'nagy', true), B('kék', 'háromszög', 'kicsi', true), B('kék', 'háromszög', 'nagy'), B('zöld', 'háromszög', 'nagy', true)]} />,
    question: 'Melyik lap a „nagy, kék, lyukas háromszög”?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'A B kicsi, a C nem lyukas, a D zöld. Csak az A nagy, kék, lyukas háromszög.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'lb-q11',
    level: 2,
    questionTypeBadge: 'Számolás',
    question: 'Hány nagy piros lap van a készletben?',
    options: ['6', '12', '3', '24'],
    correctAnswer: 0,
    explanation: 'Nagy piros: 3 forma · 2 (lyukas / nem lyukas) = 6 lap.'
  },
  {
    id: 'lb-q12',
    level: 2,
    questionTypeBadge: 'Számolás',
    question: 'Hány piros kör van a készletben?',
    options: ['4', '2', '16', '12'],
    correctAnswer: 0,
    explanation: 'Piros kör: nagy lyukas, nagy nem lyukas, kicsi lyukas, kicsi nem lyukas = 4 lap.'
  },
  {
    id: 'lb-q13',
    level: 2,
    questionTypeBadge: '„vagy”',
    figure: <OrShapesFig />,
    question: '„Négyzet vagy kör.” Hány lapra igaz ez az állítás?',
    options: ['32', '16', '8', '24'],
    correctAnswer: 0,
    explanation: '16 négyzet és 16 kör van: 16 + 16 = 32. Csak a 16 háromszögre hamis.'
  },
  {
    id: 'lb-q14',
    level: 2,
    questionTypeBadge: '„és”, „nem”',
    question: '„Nem kék, és nem zöld.” Melyik lapra igaz?',
    options: ['nagy piros kör', 'kicsi kék négyzet', 'nagy zöld háromszög', 'kicsi kék kör'],
    correctAnswer: 0,
    explanation: 'A lap nem lehet kék és nem lehet zöld, tehát piros vagy sárga. Csak a piros kör jó.'
  },
  {
    id: 'lb-q15',
    level: 2,
    questionTypeBadge: 'Sorozat',
    figure: <SeqFig items={[B('piros', 'háromszög', 'nagy'), B('piros', 'háromszög', 'kicsi', true)]} />,
    question: 'Melyik KÉT tulajdonság változott a sorozatban?',
    options: ['a mérete és a lyukassága', 'a színe és a mérete', 'a formája és a színe', 'csak a mérete'],
    correctAnswer: 0,
    explanation: 'Mindkettő piros háromszög. A nagyból kicsi lett, és lyukas lett.'
  },
  {
    id: 'lb-q16',
    level: 2,
    questionTypeBadge: 'Sorozat',
    figure: <SeqFig items={[B('zöld', 'kör', 'nagy'), B('kék', 'kör', 'kicsi')]} />,
    question: 'Melyik KÉT tulajdonság változott a sorozatban?',
    options: ['a színe és a mérete', 'a formája és a mérete', 'a színe és a lyukassága', 'a formája és a színe'],
    correctAnswer: 0,
    explanation: 'Mindkettő nem lyukas kör. A zöldből kék lett, a nagyból kicsi.'
  },
  {
    id: 'lb-q17',
    level: 2,
    questionTypeBadge: 'Hazudós barkochba',
    question: 'Hazudós barkochbában minden válasz hamis. A kérdés: „Nagy?” A válasz: „igen”. Mit tudunk a lapról?',
    options: ['A lap kicsi.', 'A lap nagy.', 'A lap lyukas.', 'Semmit sem tudunk.'],
    correctAnswer: 0,
    explanation: 'A válasz hamis, tehát az ellenkezője igaz: a lap nem nagy, vagyis kicsi.'
  },
  {
    id: 'lb-q18',
    level: 2,
    questionTypeBadge: '„ha … akkor”',
    question: '„Ha sárga, akkor kicsi.” Melyik lapra HAMIS ez az állítás?',
    options: ['nagy sárga kör', 'kicsi sárga kör', 'nagy piros kör', 'kicsi kék négyzet'],
    correctAnswer: 0,
    explanation: 'Az állítás csak akkor hamis, ha a lap sárga, de nem kicsi. A nagy sárga kör ilyen. A piros és kék lapokra igaz.'
  },
  {
    id: 'lb-q19',
    level: 2,
    questionTypeBadge: 'Rontó játék',
    figure: <RowFig items={[B('sárga', 'háromszög', 'kicsi', true), B('sárga', 'kör', 'kicsi')]} note="Minden elem sárga." />,
    question: 'A sorról igaz: „Minden elem sárga.” Melyik lap RONTJA EL ezt az állítást?',
    options: ['kicsi kék kör', 'nagy sárga négyzet', 'kicsi sárga háromszög', 'nagy sárga kör'],
    correctAnswer: 0,
    explanation: 'Csak egy nem sárga lap rontja el. A kicsi kék kör kék, így már nem minden elem sárga.'
  },
  {
    id: 'lb-q20',
    level: 2,
    questionTypeBadge: 'Számolás',
    figure: <ExamplesFig items={[B('piros', 'kör', 'kicsi', true), B('sárga', 'négyzet', 'kicsi', true), B('kék', 'háromszög', 'kicsi', true), B('zöld', 'kör', 'kicsi', true)]} note="Ilyen lapokból hány van? ?" />,
    question: 'Hány olyan lap van, amely kicsi és lyukas?',
    options: ['12', '24', '6', '48'],
    correctAnswer: 0,
    explanation: 'Kicsi és lyukas: 4 szín · 3 forma = 12 lap.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'lb-q21',
    level: 3,
    questionTypeBadge: 'Szűrés lépésenként',
    question: 'Egymás után: „Négyzet vagy kör.” „Csak görbe vonal határolja.” „Nem lyukas.” „Nem kék, és nem zöld.” „Ha sárga, akkor kicsi.” „Nem kicsi.” Melyik lap marad?',
    options: ['nagy, piros, nem lyukas kör', 'nagy, sárga, nem lyukas kör', 'kicsi, piros, nem lyukas kör', 'nagy, piros, lyukas kör'],
    correctAnswer: 0,
    explanation: 'Kör (16) → nem lyukas (8) → piros vagy sárga (4) → a nagy sárga kimegy (3) → nem kicsi: a nagy piros nem lyukas kör marad.'
  },
  {
    id: 'lb-q22',
    level: 3,
    questionTypeBadge: 'Hazudós barkochba',
    question: 'Hazudós barkochba: Nagy? – igen. Kör? – igen. Négyzet? – nem. Lyukas? – igen. Sárga vagy zöld? – igen. Kék? – nem. Melyik a lap?',
    options: ['kicsi, kék, nem lyukas négyzet', 'nagy, kék, lyukas kör', 'kicsi, piros, nem lyukas négyzet', 'kicsi, kék, lyukas háromszög'],
    correctAnswer: 0,
    explanation: 'Minden válasz fordítva igaz: kicsi, nem kör, négyzet, nem lyukas, nem sárga és nem zöld, kék. → kicsi, kék, nem lyukas négyzet.'
  },
  {
    id: 'lb-q23',
    level: 3,
    questionTypeBadge: 'Közös tulajdonságok',
    figure: <ShownFig b={B('kék', 'négyzet', 'kicsi', true)} common="3" />,
    question: 'A gondolt lapról már tudjuk: kicsi, lyukas, négyzet, nem piros és nem sárga. A kicsi, lyukas, KÉK négyzettel 3 közös tulajdonsága van. Melyik a gondolt lap?',
    options: ['kicsi, zöld, lyukas négyzet', 'kicsi, kék, lyukas négyzet', 'kicsi, zöld, lyukas kör', 'nagy, zöld, lyukas négyzet'],
    correctAnswer: 0,
    explanation: 'A 3 közös tulajdonság: kicsi, lyukas, négyzet. A negyedik, a szín, nem egyezik: a lap nem kék. Nem piros és nem sárga sem, tehát zöld: kicsi, zöld, lyukas négyzet.'
  },
  {
    id: 'lb-q24',
    level: 3,
    questionTypeBadge: 'Közös tulajdonságok',
    figure: <ShownFig b={B('piros', 'kör', 'nagy')} common="0" />,
    question: 'A felmutatott nagy, piros, nem lyukas körnek és a gondolt lapnak 0 közös tulajdonsága van. Mit tudunk a gondolt lapról?',
    options: ['nem kör, nem piros, kicsi, lyukas', 'kör, piros, nagy, nem lyukas', 'nem kör, piros, kicsi, lyukas', 'semmit sem tudunk'],
    correctAnswer: 0,
    explanation: 'Egyik tulajdonság sem egyezik: nem piros, nem kör, nem nagy (tehát kicsi), és nem „nem lyukas” (tehát lyukas).'
  },
  {
    id: 'lb-q25',
    level: 3,
    questionTypeBadge: '„vagy”',
    figure: <VennFig />,
    question: '„Piros vagy kör.” Hány lapra igaz ez az állítás?',
    options: ['24', '28', '4', '16'],
    correctAnswer: 0,
    explanation: '12 piros + 16 kör = 28, de a 4 piros kört kétszer számoltuk: 28 − 4 = 24.'
  },
  {
    id: 'lb-q26',
    level: 3,
    questionTypeBadge: '„és”, „nem”',
    question: 'Hány olyan lap van, amely nem piros, és nem kicsi?',
    options: ['18', '24', '36', '12'],
    correctAnswer: 0,
    explanation: 'Nem piros: 3 szín. Nem kicsi: nagy. 3 szín · 3 forma · 2 (lyukas / nem lyukas) = 18 lap.'
  },
  {
    id: 'lb-q27',
    level: 3,
    questionTypeBadge: 'Én vagyok a szarka',
    figure: <MissingFig />,
    question: 'Valaki elvett egy lapot. Az asztalon csak 11 piros lap maradt. Mit tudunk biztosan a kivett lapról?',
    options: ['piros', 'nem piros', 'kör', 'semmit'],
    correctAnswer: 0,
    explanation: 'A teljes készletben 12 piros lap van. Ha csak 11 maradt, a hiányzó lap piros.'
  },
  {
    id: 'lb-q28',
    level: 3,
    questionTypeBadge: 'Rontó játék',
    figure: (
      <RowFig
        items={[B('sárga', 'háromszög', 'kicsi', true), B('sárga', 'kör', 'kicsi'), B('kék', 'kör', 'kicsi'), B('kék', 'kör', 'nagy'), B('zöld', 'háromszög', 'nagy')]}
        note="Mi igaz az egész sorra?"
        unknown={false}
      />
    ),
    question: 'A sor: kicsi sárga lyukas háromszög, kicsi sárga kör, kicsi kék kör, nagy kék kör, nagy zöld háromszög. Melyik állítás IGAZ?',
    options: ['Minden elem háromszög vagy kör.', 'Minden elem kék vagy sárga.', 'Minden elem kicsi.', 'Minden elem lyukas.'],
    correctAnswer: 0,
    explanation: 'A zöld háromszög elrontotta a „kék vagy sárga” állítást. De minden elem háromszög vagy kör – ez igaz.'
  },
  {
    id: 'lb-q29',
    level: 3,
    questionTypeBadge: 'Barkochba',
    question: 'Barkochbában melyik első kérdés zárja ki biztosan a lapok FELÉT (24-et)?',
    options: ['Nagy?', 'Piros?', 'Kör?', 'Nagy piros kör?'],
    correctAnswer: 0,
    explanation: '24 nagy és 24 kicsi lap van, így a „Nagy?” kérdés után mindig 24 lap marad. A „Piros?” után 12 vagy 36, a „Kör?” után 16 vagy 32.'
  },
  {
    id: 'lb-q30',
    level: 3,
    questionTypeBadge: 'Különbség',
    question: 'Hány olyan lap van, amely PONTOSAN EGY tulajdonságban különbözik a nagy, piros, lyukas körtől?',
    options: ['7', '4', '3', '47'],
    correctAnswer: 0,
    explanation: 'Más szín: 3 (sárga, kék, zöld), más forma: 2 (négyzet, háromszög), más méret: 1, nem lyukas: 1. 3 + 2 + 1 + 1 = 7.'
  }
];

export const LogicBlocks4Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId="g4-count-logikai-lapok-quiz"
      subtopicId="jatekok-a-logikai-lapokkal"
      title="8. Játékok a logikai lapokkal – Kvíz"
      subtitle="30 feladat 3 szinten: tulajdonságok, sorozatok, „és”, „vagy”, „nem”, barkochba és Rontó játék."
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • KVÍZ"
      themeColor="emerald"
      questions={LOGIC_QUESTIONS}
      cheatSheets={[
        {
          title: 'A készlet',
          items: ['Szín: piros, sárga, kék, zöld (4)', 'Forma: kör, négyzet, háromszög (3)', 'Méret: nagy, kicsi; lyukas vagy nem lyukas', '4 · 3 · 2 · 2 = 48 lap, nincs két egyforma']
        },
        {
          title: 'Hány lap?',
          items: ['Egy szín: 12 lap; egy forma: 16 lap', 'Nagy: 24, lyukas: 24', 'Piros kör: 4; nagy piros kör: 2', '„Piros vagy kör”: 12 + 16 − 4 = 24']
        },
        {
          title: 'Logikai szavak',
          items: ['„és”: mindkettő igaz legyen', '„vagy”: legalább az egyik igaz', '„nem”: az ellenkezője igaz', '„Ha sárga, akkor kicsi”: csak a nagy sárgára hamis']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <LogicBlocks4Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <LogicBlocks4Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default LogicBlocks4Quiz;
