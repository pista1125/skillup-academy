import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { GeoIntroG2Matcher } from './GeoIntroG2Matcher';
import { GeoIntroG2Sorter } from './GeoIntroG2Sorter';
import { LINE_PATHS_150, LineKind } from './GeoIntroG2CardFigures';
import {
  GEO_FONT,
  LogicPiece,
  LogicPiecePart,
  P,
  ThingKind,
  ThingPart,
  GridPart,
  RobotPart,
  StarPart,
  ArrowPart,
  KidPart,
  Dir
} from './GeoIntroG2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 120 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={GEO_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const RowFig: React.FC<{ things: ThingKind[] }> = ({ things }) => {
  const step = 220 / things.length;
  return (
    <QFig h={90}>
      <line x1="16" y1="68" x2="244" y2="68" stroke="#a8a29e" strokeWidth="3" />
      {things.map((t, i) => (
        <ThingPart key={i} kind={t} cx={20 + step * i + step / 2} cy={46} s={1.4} />
      ))}
    </QFig>
  );
};

const ShelfFig: React.FC<{ top: ThingKind[]; bottom: ThingKind[] }> = ({ top, bottom }) => (
  <QFig h={140}>
    <rect x="40" y="10" width="180" height="120" rx="5" fill="#fef3c7" stroke="#92400e" strokeWidth="3" />
    <line x1="40" y1="70" x2="220" y2="70" stroke="#92400e" strokeWidth="4" />
    {top.map((t, i) => (
      <ThingPart key={`t${i}`} kind={t} cx={75 + i * 55} cy={45} s={1.25} />
    ))}
    {bottom.map((t, i) => (
      <ThingPart key={`b${i}`} kind={t} cx={75 + i * 55} cy={105} s={1.25} />
    ))}
  </QFig>
);

const LineFig: React.FC<{ kind: LineKind; v?: number }> = ({ kind, v = 0 }) => (
  <QFig h={100}>
    <g transform="translate(40 8) scale(1.2)">
      <path d={LINE_PATHS_150[kind][v]} fill="none" stroke="#1e40af" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </QFig>
);

const ArrowFig: React.FC<{ dir: Dir }> = ({ dir }) => (
  <QFig h={100}>
    <rect x="95" y="15" width="70" height="70" rx="12" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="2.5" />
    <ArrowPart dir={dir} cx={130} cy={50} size={24} />
  </QFig>
);

const PieceFig: React.FC<{ piece: LogicPiece }> = ({ piece }) => (
  <QFig h={110}>
    <LogicPiecePart piece={piece} cx={130} cy={56} unit={34} />
  </QFig>
);

const PiecesRowFig: React.FC<{ pieces: LogicPiece[] }> = ({ pieces }) => (
  <QFig h={120}>
    {pieces.map((p, i) => (
      <g key={i}>
        <LogicPiecePart piece={p} cx={40 + i * 60} cy={52} unit={21} />
        <text x={40 + i * 60} y={106} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
          {i + 1}.
        </text>
      </g>
    ))}
  </QFig>
);

interface Letter {
  c: number;
  r: number;
  ch: string;
}

const GridFig: React.FC<{ cols: number; rows: number; robot: [number, number]; star?: [number, number]; letters?: Letter[] }> = ({
  cols,
  rows,
  robot,
  star,
  letters = []
}) => {
  const cell = Math.min(36, Math.floor(220 / cols), Math.floor(150 / rows));
  const x0 = (260 - cols * cell) / 2;
  const y0 = 10;
  const h = rows * cell + 20;
  const cx = (c: number) => x0 + c * cell + cell / 2;
  const cy = (r: number) => y0 + r * cell + cell / 2;
  return (
    <QFig h={h}>
      <GridPart x={x0} y={y0} cols={cols} rows={rows} cell={cell} />
      <RobotPart cx={cx(robot[0])} cy={cy(robot[1])} s={cell / 26} />
      {star && <StarPart cx={cx(star[0])} cy={cy(star[1])} r={cell * 0.36} />}
      {letters.map((l) => (
        <text key={l.ch} x={cx(l.c)} y={cy(l.r) + 7} textAnchor="middle" fontSize="20" fontWeight="900" fill="#be123c">
          {l.ch}
        </text>
      ))}
    </QFig>
  );
};

const COLS4 = ['A', 'B', 'C', 'D'];
const TableFig: React.FC<{ things?: { code: string; kind: ThingKind }[]; start?: string }> = ({ things = [], start }) => {
  const cell = 40;
  const x0 = 30;
  const y0 = 8;
  const pos = (code: string) => ({ c: COLS4.indexOf(code[0]), r: Number(code[1]) - 1 });
  return (
    <QFig h={160}>
      {COLS4.map((ch, i) => (
        <g key={ch}>
          <rect x={x0 + (i + 1) * cell} y={y0} width={cell} height="24" fill="#dcfce7" stroke="#16a34a" />
          <text x={x0 + (i + 1.5) * cell} y={y0 + 17} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#166534">{ch}</text>
        </g>
      ))}
      {[1, 2, 3].map((n, r) => (
        <g key={n}>
          <rect x={x0} y={y0 + 24 + r * cell} width={cell} height={cell} fill="#dcfce7" stroke="#16a34a" />
          <text x={x0 + cell / 2} y={y0 + 24 + r * cell + 25} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#166534">{n}</text>
          {COLS4.map((_, i) => (
            <rect key={i} x={x0 + (i + 1) * cell} y={y0 + 24 + r * cell} width={cell} height={cell} fill="#ffffff" stroke="#16a34a" />
          ))}
        </g>
      ))}
      {things.map((t) => {
        const { c, r } = pos(t.code);
        return <ThingPart key={t.code} kind={t.kind} cx={x0 + (c + 1.5) * cell} cy={y0 + 24 + (r + 0.5) * cell} s={1.1} />;
      })}
      {start &&
        (() => {
          const { c, r } = pos(start);
          return <RobotPart cx={x0 + (c + 1.5) * cell} cy={y0 + 24 + (r + 0.5) * cell} s={1.3} />;
        })()}
    </QFig>
  );
};

const FourLinesFig: React.FC = () => (
  <QFig h={90}>
    <g transform="translate(6 14) scale(0.4)">
      <path d={LINE_PATHS_150.egyenes[0]} fill="none" stroke="#1e40af" strokeWidth="12" strokeLinecap="round" />
    </g>
    <g transform="translate(68 14) scale(0.4)">
      <path d={LINE_PATHS_150.gorbe[1]} fill="none" stroke="#1e40af" strokeWidth="12" strokeLinecap="round" />
    </g>
    <g transform="translate(130 14) scale(0.4)">
      <path d={LINE_PATHS_150.torott[0]} fill="none" stroke="#1e40af" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <g transform="translate(192 14) scale(0.4)">
      <path d={LINE_PATHS_150.zartgorbe[0]} fill="none" stroke="#1e40af" strokeWidth="12" />
    </g>
    {[1, 2, 3, 4].map((n, i) => (
      <text key={n} x={36 + i * 62} y={74} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">{n}.</text>
    ))}
  </QFig>
);

const HalfCircleFig: React.FC = () => (
  <QFig h={110}>
    <path d="M 70 85 A 60 60 0 0 1 190 85 Z" fill="#fde68a" stroke="#b45309" strokeWidth="4" strokeLinejoin="round" />
  </QFig>
);

const ChainFig: React.FC<{ first: LogicPiece; last?: LogicPiece; candidates: LogicPiece[] }> = ({ first, last, candidates }) => (
  <QFig h={160}>
    <LogicPiecePart piece={first} cx={last ? 70 : 100} cy={40} unit={18} />
    <text x={last ? 130 : 160} y={48} textAnchor="middle" fontSize="24" fontWeight="900" fill="#dc2626">?</text>
    {last && <LogicPiecePart piece={last} cx={190} cy={40} unit={18} />}
    <line x1="14" y1="74" x2="246" y2="74" stroke="#e2e8f0" strokeWidth="2" />
    {candidates.map((p, i) => (
      <g key={i}>
        <LogicPiecePart piece={p} cx={40 + i * 60} cy={108} unit={17} />
        <text x={40 + i * 60} y={150} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">{i + 1}.</text>
      </g>
    ))}
  </QFig>
);

/** Szemből látott gyerek: a saját jobb kezét emeli (a nézőnek bal oldalon). */
const FacingKidFig: React.FC = () => (
  <QFig h={130}>
    <circle cx="130" cy="36" r="16" fill="#fcd9b6" stroke="#9a3412" strokeWidth="1.6" />
    <circle cx="124" cy="34" r="2" fill="#1e293b" />
    <circle cx="136" cy="34" r="2" fill="#1e293b" />
    <path d="M 123 42 Q 130 48 137 42" fill="none" stroke="#9a3412" strokeWidth="1.6" />
    <rect x="112" y="54" width="36" height="42" rx="8" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="1.6" />
    <line x1="114" y1="60" x2="92" y2="26" stroke="#60a5fa" strokeWidth="8" strokeLinecap="round" />
    <circle cx="90" cy="22" r="6" fill="#fcd9b6" stroke="#9a3412" strokeWidth="1.3" />
    <line x1="146" y1="60" x2="160" y2="92" stroke="#60a5fa" strokeWidth="8" strokeLinecap="round" />
    <line x1="122" y1="96" x2="122" y2="118" stroke="#1e293b" strokeWidth="5" />
    <line x1="138" y1="96" x2="138" y2="118" stroke="#1e293b" strokeWidth="5" />
    <text x="40" y="70" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">Bence</text>
    <text x="40" y="85" textAnchor="middle" fontSize="11" fill="#475569">szemben áll</text>
  </QFig>
);

const QueueFig: React.FC<{ names: string[] }> = ({ names }) => (
  <QFig h={120}>
    <rect x="212" y="22" width="34" height="62" rx="4" fill="#bae6fd" stroke="#0369a1" strokeWidth="2.5" />
    <text x="229" y="104" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">ajtó</text>
    {names.map((n, i) => (
      <KidPart key={n} cx={30 + i * 48} cy={60} color={['#f472b6', '#60a5fa', '#facc15', '#4ade80'][i % 4]} name={n} />
    ))}
    <ArrowPart dir="R" cx={110} cy={16} size={10} color="#475569" />
  </QFig>
);

const GateFig: React.FC<{ inside: LogicPiece[]; outside: LogicPiece[] }> = ({ inside, outside }) => (
  <QFig h={150}>
    <rect x="10" y="10" width="140" height="130" rx="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
    <text x="80" y="28" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">átmehetett</text>
    {inside.map((p, i) => (
      <LogicPiecePart key={i} piece={p} cx={45 + (i % 2) * 70} cy={60 + Math.floor(i / 2) * 50} unit={17} />
    ))}
    <rect x="160" y="10" width="90" height="130" rx="10" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
    <text x="205" y="28" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#991b1b">nem mehetett</text>
    {outside.map((p, i) => (
      <LogicPiecePart key={i} piece={p} cx={205} cy={60 + i * 50} unit={17} />
    ))}
  </QFig>
);

const MapFig: React.FC = () => {
  const cell = 34;
  const x0 = 45;
  const y0 = 8;
  const cx = (c: number) => x0 + c * cell + cell / 2;
  const cy = (r: number) => y0 + r * cell + cell / 2;
  return (
    <QFig h={154}>
      <GridPart x={x0} y={y0} cols={5} rows={4} cell={cell} />
      <ThingPart kind="haz" cx={cx(0)} cy={cy(3)} s={1.1} />
      <ThingPart kind="fa" cx={cx(3)} cy={cy(1)} s={1.1} />
      <ThingPart kind="hal" cx={cx(2)} cy={cy(0)} s={1.1} />
      <ThingPart kind="labda" cx={cx(2)} cy={cy(1)} s={1.1} />
      <ThingPart kind="virag" cx={cx(3)} cy={cy(2)} s={1.1} />
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const GEO_INTRO_G2_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'geointro-q1',
    level: 1,
    questionTypeBadge: 'Jobbra',
    figure: <RowFig things={['alma', 'labda', 'csillag']} />,
    question: 'Mi van a labdától jobbra?',
    options: ['a csillag', 'az alma', 'a hal'],
    correctAnswer: 0,
    explanation: 'Jobbra az a kezed, amelyik felé a → nyíl mutat. A labdától jobbra a csillag van.'
  },
  {
    id: 'geointro-q2',
    level: 1,
    questionTypeBadge: 'Fölött',
    figure: <ShelfFig top={['labda', 'csillag', 'alma']} bottom={['hal', 'auto', 'virag']} />,
    question: 'Mi van az autó fölött?',
    options: ['a csillag', 'a hal', 'a virág', 'a labda'],
    correctAnswer: 0,
    explanation: 'Az autó lent van, középen. Fölötte, a felső polcon középen a csillag van.'
  },
  {
    id: 'geointro-q3',
    level: 1,
    questionTypeBadge: 'Között',
    figure: <RowFig things={['fa', 'alma', 'haz', 'labda']} />,
    question: 'Mi van a fa és a ház között?',
    options: ['az alma', 'a labda', 'a hal'],
    correctAnswer: 0,
    explanation: 'Keresd meg a fát és a házat! Ami kettejük közt van, az az alma.'
  },
  {
    id: 'geointro-q4',
    level: 1,
    questionTypeBadge: 'Görbe vonal',
    figure: <LineFig kind="gorbe" v={2} />,
    question: 'Milyen vonal ez?',
    options: ['görbe vonal', 'egyenes vonal', 'törött vonal'],
    correctAnswer: 0,
    explanation: 'A vonal hajlik, mint egy kígyó. Ez görbe vonal.'
  },
  {
    id: 'geointro-q5',
    level: 1,
    questionTypeBadge: 'Törött vonal',
    figure: <LineFig kind="torott" v={0} />,
    question: 'Milyen vonal ez?',
    options: ['törött vonal', 'görbe vonal', 'egyenes vonal'],
    correctAnswer: 0,
    explanation: 'Egyenes darabokból áll, mint a villám. Ez törött vonal.'
  },
  {
    id: 'geointro-q6',
    level: 1,
    questionTypeBadge: 'Zárt vonal',
    figure: <LineFig kind="zartgorbe" v={1} />,
    question: 'Nyitott vagy zárt ez a vonal?',
    options: ['zárt vonal', 'nyitott vonal'],
    correctAnswer: 0,
    explanation: 'A vonal körbeér, nincs vége. Ez zárt vonal.'
  },
  {
    id: 'geointro-q7',
    level: 1,
    questionTypeBadge: 'Nyíl',
    figure: <ArrowFig dir="U" />,
    question: 'Merre lép a robot ennél a nyílnál?',
    options: ['föl', 'le', 'jobbra', 'balra'],
    correctAnswer: 0,
    explanation: 'A nyíl fölfelé mutat. A robot egyet lép föl.'
  },
  {
    id: 'geointro-q8',
    level: 1,
    questionTypeBadge: 'Logikai lap',
    figure: <PieceFig piece={P('kor', 'piros', true, true)} />,
    question: 'Milyen ez a logikai lap?',
    options: ['nagy, piros, lyukas kör', 'kicsi, piros, lyukas kör', 'nagy, piros, sima kör', 'nagy, sárga, lyukas kör'],
    correctAnswer: 0,
    explanation: 'Nagy, piros, és van rajta lyuk. A formája kör.'
  },
  {
    id: 'geointro-q9',
    level: 1,
    questionTypeBadge: 'Kakukktojás',
    figure: (
      <PiecesRowFig
        pieces={[P('haromszog', 'kek', true), P('haromszog', 'piros', false), P('haromszog', 'sarga', true), P('negyzet', 'zold', false)]}
      />
    ),
    question: 'Melyik a kakukktojás?',
    options: ['a 4.', 'az 1.', 'a 2.', 'a 3.'],
    correctAnswer: 0,
    explanation: 'Az 1., a 2. és a 3. háromszög. A 4. négyzet, ez a kakukktojás.'
  },
  {
    id: 'geointro-q10',
    level: 1,
    questionTypeBadge: 'Lépések',
    figure: <GridFig cols={5} rows={3} robot={[0, 1]} star={[3, 1]} />,
    question: 'Hányat lép jobbra a robot a csillagig?',
    options: ['3', '2', '4', '5'],
    correctAnswer: 0,
    explanation: 'Számold a mezőket a robottól a csillagig: 1, 2, 3. Tehát 3 lépés.'
  },

  // ---------- 2. szint ----------
  {
    id: 'geointro-q11',
    level: 2,
    questionTypeBadge: 'Robot útja',
    figure: (
      <GridFig
        cols={6}
        rows={5}
        robot={[2, 2]}
        letters={[
          { c: 4, r: 0, ch: 'C' },
          { c: 0, r: 0, ch: 'A' },
          { c: 3, r: 0, ch: 'B' },
          { c: 4, r: 4, ch: 'D' }
        ]}
      />
    ),
    question: 'A robot lépései: → → ↑ ↑. Melyik betűhöz ér?',
    options: ['C', 'A', 'B', 'D'],
    correctAnswer: 0,
    explanation: 'Két lépés jobbra, aztán két lépés föl. Így a C betűhöz ér.'
  },
  {
    id: 'geointro-q12',
    level: 2,
    questionTypeBadge: 'Nyílsor',
    figure: <GridFig cols={5} rows={3} robot={[1, 2]} star={[3, 1]} />,
    question: 'Melyik nyílsor viszi a robotot a csillaghoz?',
    options: ['→ → ↑', '← ← ↑', '→ → ↓', '→ ↑ ↑'],
    correctAnswer: 0,
    explanation: 'A csillag 2 mezővel jobbra és 1 mezővel fölötte van: → → ↑.'
  },
  {
    id: 'geointro-q13',
    level: 2,
    questionTypeBadge: 'Mezőkód',
    figure: (
      <TableFig
        things={[
          { code: 'B3', kind: 'labda' },
          { code: 'D1', kind: 'fa' },
          { code: 'A2', kind: 'hal' },
          { code: 'C2', kind: 'csillag' }
        ]}
      />
    ),
    question: 'Melyik mezőben van a labda?',
    options: ['B3', 'C3', 'B2', 'A3'],
    correctAnswer: 0,
    explanation: 'A labda a B oszlopban és a 3. sorban van. A kódja: B3.'
  },
  {
    id: 'geointro-q14',
    level: 2,
    questionTypeBadge: 'Vonalak számlálása',
    figure: <FourLinesFig />,
    question: 'Hány görbe vonal van a képen?',
    options: ['2', '1', '3', '4'],
    correctAnswer: 0,
    explanation: 'A 2. nyitott görbe vonal, a 4. zárt görbe vonal. Ez 2 görbe vonal.'
  },
  {
    id: 'geointro-q15',
    level: 2,
    questionTypeBadge: 'Síkidom határa',
    figure: <HalfCircleFig />,
    question: 'Milyen vonalak határolják ezt a síkidomot?',
    options: ['egyenes és görbe vonal is', 'csak egyenes vonalak', 'csak görbe vonal'],
    correctAnswer: 0,
    explanation: 'Az alja egyenes vonal, a teteje görbe vonal. Mindkettő kell hozzá.'
  },
  {
    id: 'geointro-q16',
    level: 2,
    questionTypeBadge: 'Melyik lap?',
    figure: (
      <PiecesRowFig
        pieces={[P('kor', 'zold', true), P('teglalap', 'zold', true), P('negyzet', 'zold', false), P('negyzet', 'zold', true, true)]}
      />
    ),
    question: 'Melyik lap nagy, sima, de nem kör?',
    options: ['a 2.', 'az 1.', 'a 3.', 'a 4.'],
    correctAnswer: 0,
    explanation: 'Az 1. kör. A 3. kicsi. A 4. lyukas. Csak a 2. jó: nagy, sima téglalap.'
  },
  {
    id: 'geointro-q17',
    level: 2,
    questionTypeBadge: 'Lánc',
    figure: (
      <ChainFig
        first={P('haromszog', 'kek', false)}
        candidates={[P('haromszog', 'piros', true), P('negyzet', 'kek', false, true), P('kor', 'kek', false), P('haromszog', 'kek', true, true)]}
      />
    ),
    question: 'Melyik lap jöhet a ? helyére? Csak egy dologban térhet el!',
    options: ['a 3.', 'az 1.', 'a 2.', 'a 4.'],
    correctAnswer: 0,
    explanation: 'A 3. lap is kicsi, kék és sima, csak a formája más: kör. A többi két dologban más.'
  },
  {
    id: 'geointro-q18',
    level: 2,
    questionTypeBadge: 'Szemben',
    figure: <FacingKidFig />,
    question: 'Bence szemben áll veled. Felemeli a jobb kezét. Melyik oldalon látod a kezét?',
    options: ['a bal oldalamon', 'a jobb oldalamon', 'középen'],
    correctAnswer: 0,
    explanation: 'Aki szemben áll, annak minden fordítva van. Az ő jobb keze a te bal oldaladon van.'
  },
  {
    id: 'geointro-q19',
    level: 2,
    questionTypeBadge: 'Előtte',
    figure: <QueueFig names={['Ani', 'Bálint', 'Csenge', 'Dóra']} />,
    question: 'A gyerekek az ajtó felé mennek. Ki áll közvetlenül Bálint előtt?',
    options: ['Csenge', 'Ani', 'Dóra'],
    correctAnswer: 0,
    explanation: 'Előtte az áll, aki közelebb van az ajtóhoz. Bálint előtt Csenge áll. Ani mögötte van.'
  },
  {
    id: 'geointro-q20',
    level: 2,
    questionTypeBadge: 'Különbség',
    figure: <PiecesRowFig pieces={[P('negyzet', 'piros', true), P('negyzet', 'kek', true)]} />,
    question: 'Miben különbözik a két lap?',
    options: ['csak a színükben', 'csak a méretükben', 'csak a formájukban', 'a színükben és a méretükben'],
    correctAnswer: 0,
    explanation: 'Mindkettő nagy, sima négyzet. Csak a színük más: piros és kék.'
  },

  // ---------- 3. szint ----------
  {
    id: 'geointro-q21',
    level: 3,
    questionTypeBadge: 'Hosszú út',
    figure: (
      <GridFig
        cols={6}
        rows={5}
        robot={[1, 3]}
        letters={[
          { c: 2, r: 2, ch: 'B' },
          { c: 3, r: 2, ch: 'A' },
          { c: 1, r: 2, ch: 'C' },
          { c: 2, r: 4, ch: 'D' }
        ]}
      />
    ),
    question: 'A robot lépései: → → → ↑ ← ←. Melyik betűhöz ér?',
    options: ['B', 'A', 'C', 'D'],
    correctAnswer: 0,
    explanation: '3 lépés jobbra, 1 föl, aztán 2 vissza balra. Végül 1 mezővel van jobbra és 1-gyel fölötte: a B betű.'
  },
  {
    id: 'geointro-q22',
    level: 3,
    questionTypeBadge: 'Vissza a helyére',
    question: 'Melyik nyílsor hozza vissza a robotot oda, ahonnan indult?',
    options: ['→ ↑ ← ↓', '→ ↑ → ↓', '→ ↑ ← ↑', '↑ ↑ ← ↓'],
    correctAnswer: 0,
    explanation: 'Egy jobbra és egy balra kioltja egymást. Egy föl és egy le is. Ezért → ↑ ← ↓ visszahozza.'
  },
  {
    id: 'geointro-q23',
    level: 3,
    questionTypeBadge: 'Kitalálós',
    question: 'Melyik lapra gondoltam? Kicsi. Piros. Sima. Nem kör, nem négyzet, nem háromszög.',
    options: ['kicsi, piros, sima téglalap', 'kicsi, piros, sima kör', 'nagy, piros, sima téglalap', 'kicsi, piros, lyukas téglalap'],
    correctAnswer: 0,
    explanation: 'A 4 forma közül csak a téglalap maradt. Tehát kicsi, piros, sima téglalap.'
  },
  {
    id: 'geointro-q24',
    level: 3,
    questionTypeBadge: 'Lánc közepe',
    figure: (
      <ChainFig
        first={P('kor', 'kek', true)}
        last={P('negyzet', 'piros', true)}
        candidates={[P('kor', 'piros', false), P('negyzet', 'kek', true, true), P('negyzet', 'zold', true), P('kor', 'piros', true)]}
      />
    ),
    question: 'Melyik lap kerül középre? Mindkét szomszédjától csak egy dologban térhet el!',
    options: ['a 4.', 'az 1.', 'a 2.', 'a 3.'],
    correctAnswer: 0,
    explanation: 'A 4. nagy, piros, sima kör. A kék körtől csak a színe más, a piros négyzettől csak a formája.'
  },
  {
    id: 'geointro-q25',
    level: 3,
    questionTypeBadge: 'Kapuőr',
    figure: (
      <GateFig
        inside={[P('kor', 'piros', true, true), P('haromszog', 'kek', false, true), P('teglalap', 'sarga', false, true)]}
        outside={[P('kor', 'piros', true, false), P('negyzet', 'kek', false, false)]}
      />
    ),
    question: 'Milyen lapokat enged át a kapuőr?',
    options: ['a lyukas lapokat', 'a piros lapokat', 'a kicsi lapokat', 'a köröket'],
    correctAnswer: 0,
    explanation: 'Minden átengedett lap lyukas. A sima lapok nem mehettek át, még a piros kör sem.'
  },
  {
    id: 'geointro-q26',
    level: 3,
    questionTypeBadge: 'Igaz mondat',
    question: 'Melyik mondat igaz?',
    options: ['A kör határa zárt görbe vonal.', 'A négyzet határa görbe vonal.', 'A törött vonal görbe darabokból áll.', 'A zárt vonalnak két vége van.'],
    correctAnswer: 0,
    explanation: 'A kör határa körbeér, és hajlik. Ezért zárt görbe vonal.'
  },
  {
    id: 'geointro-q27',
    level: 3,
    questionTypeBadge: 'Térkép',
    figure: <MapFig />,
    question: 'A háztól indulsz. Lépj 2-t föl, aztán 3-at jobbra! Hova érsz?',
    options: ['a fához', 'a halhoz', 'a labdához', 'a virághoz'],
    correctAnswer: 0,
    explanation: 'Előbb 2 mező föl, aztán 3 mező jobbra. Ott a fa áll.'
  },
  {
    id: 'geointro-q28',
    level: 3,
    questionTypeBadge: 'Kód és nyíl',
    figure: <TableFig start="A2" />,
    question: 'Az A2 mezőből indulsz: → → ↓. Melyik mezőbe érsz?',
    options: ['C3', 'C1', 'B3', 'D3'],
    correctAnswer: 0,
    explanation: 'A2-ből két lépés jobbra: B2, C2. Aztán egy le: C3.'
  },
  {
    id: 'geointro-q29',
    level: 3,
    questionTypeBadge: 'Szemben ülve',
    question: 'Szemben ülsz Lilivel. Az ő bal keze mellett van egy alma. A te melyik kezed felé van?',
    options: ['a jobb kezem felé', 'a bal kezem felé', 'egyik felé sem'],
    correctAnswer: 0,
    explanation: 'Szemben minden fordítva van. Lili bal keze a te jobb kezed felé van.'
  },
  {
    id: 'geointro-q30',
    level: 3,
    questionTypeBadge: 'Logikai készlet',
    question: 'A teljes logikai készletben hány nagy, piros kör van?',
    options: ['2', '1', '4', '3'],
    correctAnswer: 0,
    explanation: 'Nagy, piros kör van sima és lyukas is. Ez 2 lap.'
  }
];

export const GeoIntroG2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="geometria"
    topicId="g2-geo-bevezeto-quiz"
    subtopicId="bevezeto"
    title="1. Tájékozódás, vonalak, logikai lapok – Kvíz"
    subtitle="30 feladat 3 szinten: merre van, robot a négyzetrácson, vonalak és logikai lapok."
    badge="2. OSZTÁLY • VII. GEOMETRIA • KVÍZ"
    questions={GEO_INTRO_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'Merre van?',
        items: ['↑ föl, ↓ le, → jobbra, ← balra', '1 nyíl = 1 lépés', 'Szemben ülőnél fordítva van a jobb és a bal', 'Mezőkód: előbb a betű, aztán a szám']
      },
      {
        title: 'Vonalak',
        items: ['Egyenes vonal: nem hajlik', 'Görbe vonal: hajlik', 'Törött vonal: egyenes darabokból áll', 'Zárt vonal: körbeér, nincs vége']
      },
      {
        title: 'Logikai lapok',
        items: ['forma: kör, háromszög, négyzet, téglalap', 'szín: piros, sárga, kék, zöld', 'méret: nagy, kicsi', 'lyuk: sima vagy lyukas']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<GeoIntroG2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<GeoIntroG2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default GeoIntroG2Quiz;
