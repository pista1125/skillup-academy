import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { MeasExamG2Matcher } from './MeasExamG2Matcher';
import { MeasExamG2Sorter } from './MeasExamG2Sorter';
import { EXAM_FONT, ObjectIcon, ObjKind } from './MeasExamG2Parts';
import { RulerPart, StripePart } from '../hosszusag-meres/LengthG2Parts';
import { BalancePart, PanItem } from '../tomeg-meres/MassG2Parts';
import { JugPart, CupPart } from '../urtartalom-meres/CapacityG2Parts';
import { ClockPart, DigitalPart, CalendarPart } from '../ido-meres/TimeG2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 130 }) => (
  <svg
    viewBox={`0 0 260 ${h}`}
    className="w-full max-w-[280px] h-auto mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fontFamily={EXAM_FONT}
  >
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const RulerQ: React.FC<{ stripes: { start: number; len: number; color: string }[]; end?: number }> = ({ stripes, end }) => {
  const last = end ?? Math.max(10, ...stripes.map((s) => s.start + s.len + 1));
  const x0 = 18;
  const unit = 222 / last;
  const px = (v: number) => x0 + v * unit;
  const top = 22;
  const gap = 24;
  const rulerY = top + stripes.length * gap;
  return (
    <QFig h={rulerY + 44}>
      {stripes.map((s, i) => (
        <StripePart key={i} x1={px(s.start)} x2={px(s.start + s.len)} y={top + i * gap} color={s.color} h={12} />
      ))}
      <RulerPart x={x0} y={rulerY} unit={unit} from={0} to={last} h={32} fontSize={last > 12 ? 10 : 12} />
    </QFig>
  );
};

const BalQ: React.FC<{ left: PanItem[]; right: PanItem[]; tilt?: number }> = ({ left, right, tilt = 0 }) => (
  <QFig h={126}>
    <BalancePart cx={130} y={40} half={80} tilt={tilt} left={left} right={right} panW={84} />
  </QFig>
);

const w = (kg: number): PanItem => ({ kind: 'w', kg });
const bag = (label: string): PanItem => ({ kind: 'bag', label });

const JugQ: React.FC<{ fill: number; max?: number; showQ?: boolean }> = ({ fill, max = 10, showQ = true }) => {
  const unit = max === 10 ? 10 : 6;
  return (
    <QFig h={max === 10 ? 130 : 146}>
      <JugPart x={98} yBottom={max === 10 ? 118 : 134} w={60} unit={unit} max={max} fill={fill} fontSize={12} />
      {showQ && (
        <text x="210" y="76" textAnchor="middle" fontSize="24" fontWeight="bold" fill={UNK}>
          ?
        </text>
      )}
    </QFig>
  );
};

const TwoJugsQ: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <QFig h={130}>
    <JugPart x={50} yBottom={112} w={50} unit={9} max={10} fill={a} fontSize={11} />
    <JugPart x={160} yBottom={112} w={50} unit={9} max={10} fill={b} fontSize={11} />
    <text x="130" y="70" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#7c3aed">
      +
    </text>
  </QFig>
);

const CupsQ: React.FC<{ n: number; each: number; extra?: React.ReactNode }> = ({ n, each, extra }) => {
  const step = 44;
  const x0 = 130 - ((n - 1) * step) / 2 - (extra ? 40 : 0);
  return (
    <QFig h={110}>
      {Array.from({ length: n }, (_, i) => (
        <CupPart key={i} cx={x0 + i * step} y={78} s={1.6} label={`${each} dl`} />
      ))}
      {extra}
    </QFig>
  );
};

const ObjQ: React.FC<{ kind: ObjKind; label?: string }> = ({ kind, label }) => (
  <QFig h={124}>
    <ObjectIcon kind={kind} x={81} y={6} s={1.4} label={label} />
  </QFig>
);

const ClockQ: React.FC<{ h: number; m?: number; sector?: number }> = ({ h, m = 0, sector }) => (
  <QFig h={140}>
    <ClockPart
      cx={130}
      cy={70}
      r={60}
      hour={h}
      minute={m}
      showHands={sector === undefined}
      sector={sector === undefined ? undefined : { from: 0, to: sector }}
      rim="#d97706"
    />
  </QFig>
);

const DigitalQ: React.FC<{ text: string; caption?: string }> = ({ text, caption }) => (
  <QFig h={caption ? 120 : 100}>
    <DigitalPart x={55} y={14} w={150} h={70} text={text} />
    {caption && (
      <text x="130" y="108" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">
        {caption}
      </text>
    )}
  </QFig>
);

const SpanQ: React.FC<{ from: string; to: string; a: string; b: string }> = ({ from, to, a, b }) => (
  <QFig h={110}>
    <text x="65" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
      {a}
    </text>
    <DigitalPart x={14} y={32} w={102} h={50} text={from} />
    <path d="M120 57 L136 57" stroke="#334155" strokeWidth="3" />
    <polygon points="134,50 134,64 144,57" fill="#334155" />
    <text x="196" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
      {b}
    </text>
    <DigitalPart x={145} y={32} w={102} h={50} text={to} color="#fbbf24" />
    <text x="130" y="100" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>
      Hány óra telik el?
    </text>
  </QFig>
);

const WeekRowQ: React.FC<{ missing: number }> = ({ missing }) => {
  const short = ['H', 'K', 'Sz', 'Cs', 'P', 'Sz', 'V'];
  return (
    <QFig h={80}>
      {short.map((d, i) => (
        <g key={i}>
          <rect
            x={12 + i * 34}
            y="18"
            width="30"
            height="44"
            rx="7"
            fill={i === missing ? '#fee2e2' : i >= 5 ? '#fecaca' : '#dbeafe'}
            stroke={i === missing ? UNK : '#334155'}
            strokeWidth="2"
          />
          <text x={27 + i * 34} y="47" textAnchor="middle" fontSize="15" fontWeight="bold" fill={i === missing ? UNK : '#0f172a'}>
            {i === missing ? '?' : d}
          </text>
        </g>
      ))}
    </QFig>
  );
};

const StripTextQ: React.FC<{ items: string[]; colors: string[] }> = ({ items, colors }) => {
  const n = items.length;
  const bw = 62;
  const gap = 12;
  const x0 = 130 - (n * bw + (n - 1) * gap) / 2;
  return (
    <QFig h={80}>
      {items.map((t, i) => (
        <g key={i}>
          <rect x={x0 + i * (bw + gap)} y="20" width={bw} height="40" rx="9" fill={colors[i]} stroke={t === '?' ? UNK : '#334155'} strokeWidth="2" />
          <text x={x0 + i * (bw + gap) + bw / 2} y="46" textAnchor="middle" fontSize={t === '?' ? 20 : 14} fontWeight="bold" fill={t === '?' ? UNK : '#0f172a'}>
            {t}
          </text>
        </g>
      ))}
    </QFig>
  );
};

const WeekBlocksQ: React.FC<{ days: number }> = ({ days }) => {
  const cell = 22;
  const rows = Math.ceil(days / 7);
  return (
    <QFig h={rows * cell + 30}>
      {Array.from({ length: days }, (_, i) => (
        <rect
          key={i}
          x={53 + (i % 7) * cell}
          y={15 + Math.floor(i / 7) * cell}
          width={cell - 4}
          height={cell - 4}
          rx="4"
          fill="#3b82f6"
          stroke="#1e3a8a"
          strokeWidth="1.5"
        />
      ))}
    </QFig>
  );
};

const CalendarQ: React.FC<{ today: number }> = ({ today }) => (
  <QFig h={232}>
    <CalendarPart x={25} y={14} cell={30} days={30} startDow={2} title="ÁPRILIS" highlight={{ [today]: '#fde68a' }} />
  </QFig>
);

const MonthSheetQ: React.FC<{ name: string }> = ({ name }) => (
  <QFig h={110}>
    <rect x="80" y="14" width="100" height="84" rx="10" fill="#ffffff" stroke="#334155" strokeWidth="2.5" />
    <rect x="80" y="14" width="100" height="24" rx="8" fill="#ef4444" />
    <text x="130" y="74" textAnchor="middle" fontSize={name.length > 7 ? 15 : 19} fontWeight="bold" fill="#0f172a">
      {name}
    </text>
  </QFig>
);

const BoardQ: React.FC<{ title: string; rows: [string, string][] }> = ({ title, rows }) => (
  <QFig h={120}>
    <rect x="30" y="10" width="200" height="100" rx="10" fill="#ecfeff" stroke="#0891b2" strokeWidth="2.5" />
    <text x="130" y="34" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0e7490">
      {title}
    </text>
    {rows.map(([a, b], i) => (
      <g key={a}>
        <text x="48" y={66 + i * 28} fontSize="15" fontWeight="bold" fill="#0f172a">
          {a}
        </text>
        <text x="212" y={66 + i * 28} textAnchor="end" fontSize="15" fontWeight="bold" fill="#0f172a">
          {b}
        </text>
      </g>
    ))}
  </QFig>
);

/** Szalagmodell: teljes hossz felül, alatta két rész (egyik ismeretlen). */
const TapeQ: React.FC<{ total: string; known: string; knownRatio: number; knownFirst?: boolean }> = ({
  total,
  known,
  knownRatio,
  knownFirst = false
}) => {
  const x0 = 20;
  const W = 220;
  const kw = W * knownRatio;
  const kx = knownFirst ? x0 : x0 + W - kw;
  const ux = knownFirst ? x0 + kw : x0;
  const uw = W - kw;
  return (
    <QFig h={120}>
      <rect x={x0} y="16" width={W} height="30" rx="6" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2" />
      <text x={x0 + W / 2} y="37" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e3a8a">
        {total}
      </text>
      <rect x={kx} y="62" width={kw} height="30" rx="6" fill="#fecaca" stroke="#b91c1c" strokeWidth="2" />
      <text x={kx + kw / 2} y="83" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#7f1d1d">
        {known}
      </text>
      <rect x={ux} y="62" width={uw} height="30" rx="6" fill="#ffffff" stroke={UNK} strokeWidth="2" strokeDasharray="5 4" />
      <text x={ux + uw / 2} y="84" textAnchor="middle" fontSize="20" fontWeight="bold" fill={UNK}>
        ?
      </text>
    </QFig>
  );
};

const RodsQ: React.FC<{ n: number; label: string }> = ({ n, label }) => {
  const rw = 44;
  const x0 = 130 - (n * rw) / 2;
  return (
    <QFig h={90}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <rect x={x0 + i * rw} y="22" width={rw} height="22" fill={i % 2 === 0 ? '#fb923c' : '#facc15'} stroke="#9a3412" strokeWidth="2" />
          <text x={x0 + i * rw + rw / 2} y="38" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c2d12">
            {label}
          </text>
        </g>
      ))}
      <text x="130" y="72" textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>
        2 dm + 2 dm + … = ?
      </text>
    </QFig>
  );
};

const DaysKgQ: React.FC = () => {
  const short = ['H', 'K', 'Sz', 'Cs', 'P', 'Sz', 'V'];
  return (
    <QFig h={90}>
      {short.map((d, i) => (
        <g key={i}>
          <rect x={12 + i * 34} y="14" width="30" height="58" rx="7" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
          <text x={27 + i * 34} y="34" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
            {d}
          </text>
          <text x={27 + i * 34} y="58" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">
            7 kg
          </text>
        </g>
      ))}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const MEAS_EXAM_G2_QUESTIONS: QuizQuestion[] = [
  // =================== 1. szint ===================
  {
    id: 'measexamg2-q1',
    level: 1,
    questionTypeBadge: 'Mérés vonalzóval',
    figure: <RulerQ stripes={[{ start: 0, len: 7, color: '#3b82f6' }]} />,
    question: 'Milyen hosszú a kék csík?',
    options: ['7 cm', '8 cm', '6 cm', '7 dm'],
    correctAnswer: 0,
    explanation: 'A csík a 0-nál kezdődik és a 7-nél ér véget. Ez 7 cm.'
  },
  {
    id: 'measexamg2-q2',
    level: 1,
    questionTypeBadge: 'dm és cm',
    question: 'Hány cm 1 dm?',
    options: ['10 cm', '100 cm', '1 cm', '5 cm'],
    correctAnswer: 0,
    explanation: '1 dm = 10 cm. A vonalzón 10 kis lépés egy deciméter.'
  },
  {
    id: 'measexamg2-q3',
    level: 1,
    questionTypeBadge: 'm és dm',
    question: 'Hány dm 1 m?',
    options: ['10 dm', '100 dm', '1 dm', '20 dm'],
    correctAnswer: 0,
    explanation: '1 m = 10 dm. (És 1 m = 100 cm.)'
  },
  {
    id: 'measexamg2-q4',
    level: 1,
    questionTypeBadge: 'Melyik mértékegység?',
    figure: <ObjQ kind="pencil" />,
    question: 'Melyik mértékegységgel mérjük a ceruza hosszát?',
    options: ['cm', 'kg', 'l', 'perc'],
    correctAnswer: 0,
    explanation: 'A hosszúságot cm-rel, dm-rel vagy m-rel mérjük. A ceruza rövid: cm.'
  },
  {
    id: 'measexamg2-q5',
    level: 1,
    questionTypeBadge: 'Becslés',
    figure: <ObjQ kind="door" />,
    question: 'Milyen magas lehet egy ajtó?',
    options: ['2 m', '2 cm', '2 dm', '20 m'],
    correctAnswer: 0,
    explanation: 'Egy ajtó magasabb egy felnőttnél: kb. 2 m. A 2 cm és 2 dm nagyon kicsi, a 20 m egy ház magassága.'
  },
  {
    id: 'measexamg2-q6',
    level: 1,
    questionTypeBadge: 'Hosszabb – rövidebb',
    figure: (
      <RulerQ
        stripes={[
          { start: 0, len: 5, color: '#3b82f6' },
          { start: 0, len: 9, color: '#ef4444' }
        ]}
      />
    ),
    question: 'Melyik csík a hosszabb?',
    options: ['a piros', 'a kék', 'egyformák', 'nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'A kék 5 cm, a piros 9 cm. A piros a hosszabb.'
  },
  {
    id: 'measexamg2-q7',
    level: 1,
    questionTypeBadge: 'Leghosszabb',
    question: 'Melyik a leghosszabb?',
    options: ['1 m', '1 dm', '1 cm', '9 cm'],
    correctAnswer: 0,
    explanation: '1 m = 100 cm. Ez sokkal több, mint 1 dm (10 cm) vagy 9 cm.'
  },
  {
    id: 'measexamg2-q8',
    level: 1,
    questionTypeBadge: 'Mérés vonalzóval',
    figure: <RulerQ stripes={[{ start: 0, len: 12, color: '#22c55e' }]} end={14} />,
    question: 'Milyen hosszú a zöld csík?',
    options: ['12 cm', '11 cm', '13 cm', '12 dm'],
    correctAnswer: 0,
    explanation: 'A csík a 0-tól a 12-ig tart: 12 cm.'
  },
  {
    id: 'measexamg2-q9',
    level: 1,
    questionTypeBadge: 'Nehezebb',
    figure: <BalQ left={[{ kind: 'melon' }]} right={[{ kind: 'apple' }]} tilt={-12} />,
    question: 'Melyik nehezebb?',
    options: ['a dinnye', 'az alma', 'egyformák', 'nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'A nehezebb oldal lemegy. A dinnye oldala lent van, tehát a dinnye a nehezebb.'
  },
  {
    id: 'measexamg2-q10',
    level: 1,
    questionTypeBadge: 'kg',
    question: 'Melyik a tömeg mértékegysége?',
    options: ['kg', 'l', 'cm', 'perc'],
    correctAnswer: 0,
    explanation: 'A tömeget kilogrammal mérjük, röviden kg.'
  },
  {
    id: 'measexamg2-q11',
    level: 1,
    questionTypeBadge: 'Egyensúly',
    figure: <BalQ left={[{ kind: 'box' }]} right={[w(5)]} />,
    question: 'A mérleg egyensúlyban van. Hány kg a doboz?',
    options: ['5 kg', '4 kg', '6 kg', '10 kg'],
    correctAnswer: 0,
    explanation: 'Egyensúlynál a két oldal ugyanannyi. A doboz 5 kg.'
  },
  {
    id: 'measexamg2-q12',
    level: 1,
    questionTypeBadge: 'Súlyok összege',
    figure: <BalQ left={[{ kind: 'q' }]} right={[w(10), w(2)]} />,
    question: 'A mérleg egyensúlyban van. Hány kg a ?',
    options: ['12 kg', '10 kg', '2 kg', '8 kg'],
    correctAnswer: 0,
    explanation: 'A jobb oldalon 10 kg + 2 kg = 12 kg van. A ? is 12 kg.'
  },
  {
    id: 'measexamg2-q13',
    level: 1,
    questionTypeBadge: 'Mérőeszköz',
    figure: <ObjQ kind="sack" />,
    question: 'Mivel mérjük meg, milyen nehéz a zsák krumpli?',
    options: ['mérleggel', 'vonalzóval', 'órával', 'mérőedénnyel'],
    correctAnswer: 0,
    explanation: 'A tömeget mérleggel mérjük.'
  },
  {
    id: 'measexamg2-q14',
    level: 1,
    questionTypeBadge: '1 kg-nál könnyebb',
    question: 'Melyik könnyebb 1 kg-nál?',
    options: ['egy toll', 'egy görögdinnye', 'egy kerékpár', 'egy zsák liszt'],
    correctAnswer: 0,
    explanation: 'Egy toll nagyon könnyű, sokkal kevesebb 1 kg-nál. A többi nehezebb.'
  },
  {
    id: 'measexamg2-q15',
    level: 1,
    questionTypeBadge: 'Összeadás kg-mal',
    question: 'Mennyi 20 kg + 30 kg?',
    options: ['50 kg', '40 kg', '23 kg', '60 kg'],
    correctAnswer: 0,
    explanation: '2 tízes + 3 tízes = 5 tízes. 20 kg + 30 kg = 50 kg.'
  },
  {
    id: 'measexamg2-q16',
    level: 1,
    questionTypeBadge: 'Mérőedény',
    figure: <JugQ fill={6} />,
    question: 'Hány dl víz van a mérőedényben?',
    options: ['6 dl', '5 dl', '7 dl', '6 l'],
    correctAnswer: 0,
    explanation: 'A víz a 6. vonalig ér. Ez 6 dl.'
  },
  {
    id: 'measexamg2-q17',
    level: 1,
    questionTypeBadge: 'l és dl',
    question: 'Hány dl 1 l?',
    options: ['10 dl', '100 dl', '1 dl', '5 dl'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl. 10 darab 1 dl-es pohár tölt meg 1 litert.'
  },
  {
    id: 'measexamg2-q18',
    level: 1,
    questionTypeBadge: 'Becslés',
    figure: <ObjQ kind="bucket" />,
    question: 'Mennyi víz fér egy vödörbe?',
    options: ['10 l', '10 dl', '1 dl', '100 l'],
    correctAnswer: 0,
    explanation: 'Egy vödörbe kb. 10 liter víz fér. Az 1 dl egy kis pohárka, a 100 l egy hordó.'
  },
  {
    id: 'measexamg2-q19',
    level: 1,
    questionTypeBadge: 'Becslés',
    figure: <ObjQ kind="mug" />,
    question: 'Mennyi tea fér egy bögrébe?',
    options: ['2 dl', '2 l', '20 l', '20 dl'],
    correctAnswer: 0,
    explanation: 'Egy bögrébe kb. 2 dl fér. A 2 l egy nagy üveg, az nem fér egy bögrébe.'
  },
  {
    id: 'measexamg2-q20',
    level: 1,
    questionTypeBadge: 'Fél liter',
    figure: <JugQ fill={5} showQ={false} />,
    question: 'Fél liter van a mérőedényben. Hány dl ez?',
    options: ['5 dl', '50 dl', '2 dl', '10 dl'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl. Ennek a fele 5 dl. Fél liter = 5 dl.'
  },
  {
    id: 'measexamg2-q21',
    level: 1,
    questionTypeBadge: 'Több – kevesebb',
    question: 'Melyik a legtöbb?',
    options: ['1 l', '1 dl', '9 dl', '5 dl'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl. Ez több, mint 9 dl, 5 dl vagy 1 dl.'
  },
  {
    id: 'measexamg2-q22',
    level: 1,
    questionTypeBadge: 'Mérőeszköz',
    figure: <ObjQ kind="bottle" />,
    question: 'Mivel mérjük meg, mennyi víz fér az üvegbe?',
    options: ['mérőedénnyel', 'mérleggel', 'vonalzóval', 'naptárral'],
    correctAnswer: 0,
    explanation: 'Az űrtartalmat mérőedénnyel mérjük (literben, deciliterben).'
  },
  {
    id: 'measexamg2-q23',
    level: 1,
    questionTypeBadge: 'Egész óra',
    figure: <ClockQ h={5} />,
    question: 'Hány órát mutat az óra?',
    options: ['5 óra', '12 óra', '6 óra', '4 óra'],
    correctAnswer: 0,
    explanation: 'A rövid kismutató az 5-ön áll, a nagymutató a 12-n: 5 óra.'
  },
  {
    id: 'measexamg2-q24',
    level: 1,
    questionTypeBadge: '30 perc',
    figure: <ClockQ h={2} m={30} />,
    question: 'Mennyi az idő?',
    options: ['2 óra 30 perc', '3 óra 30 perc', '2 óra 6 perc', '6 óra 10 perc'],
    correctAnswer: 0,
    explanation: 'A nagymutató a 6-on: 30 perc. A kismutató a 2 és a 3 között: 2 óra 30 perc.'
  },
  {
    id: 'measexamg2-q25',
    level: 1,
    questionTypeBadge: 'Óra és perc',
    question: 'Hány perc 1 óra?',
    options: ['60 perc', '100 perc', '24 perc', '30 perc'],
    correctAnswer: 0,
    explanation: '1 óra = 60 perc. A 30 perc csak fél óra.'
  },
  {
    id: 'measexamg2-q26',
    level: 1,
    questionTypeBadge: '1 hét',
    question: 'Hány nap 1 hét?',
    options: ['7 nap', '5 nap', '10 nap', '12 nap'],
    correctAnswer: 0,
    explanation: 'Egy hét 7 nap: hétfőtől vasárnapig.'
  },
  {
    id: 'measexamg2-q27',
    level: 1,
    questionTypeBadge: 'A hét napjai',
    figure: <WeekRowQ missing={4} />,
    question: 'Melyik nap hiányzik?',
    options: ['péntek', 'csütörtök', 'szombat', 'szerda'],
    correctAnswer: 0,
    explanation: 'Hétfő, kedd, szerda, csütörtök, péntek, szombat, vasárnap. A csütörtök után a péntek jön.'
  },
  {
    id: 'measexamg2-q28',
    level: 1,
    questionTypeBadge: 'Évszakok',
    figure: <StripTextQ items={['ősz', 'tél', '?']} colors={['#fed7aa', '#bae6fd', '#ffffff']} />,
    question: 'Melyik évszak jön a tél után?',
    options: ['tavasz', 'nyár', 'ősz', 'december'],
    correctAnswer: 0,
    explanation: 'Tavasz, nyár, ősz, tél – aztán újra tavasz jön.'
  },
  {
    id: 'measexamg2-q29',
    level: 1,
    questionTypeBadge: 'Digitális óra',
    figure: <DigitalQ text="9:15" />,
    question: 'Mennyi az idő?',
    options: ['9 óra 15 perc', '15 óra 9 perc', '9 óra 1 perc', '10 óra 15 perc'],
    correctAnswer: 0,
    explanation: 'A kettőspont előtt az óra (9), utána a perc (15): 9 óra 15 perc.'
  },
  {
    id: 'measexamg2-q30',
    level: 1,
    questionTypeBadge: 'Napszakok',
    figure: <ObjQ kind="sunset" />,
    question: 'A Nap éppen lemegy. Melyik napszak van?',
    options: ['este', 'reggel', 'dél', 'délelőtt'],
    correctAnswer: 0,
    explanation: 'Este megy le a Nap. Reggel jön fel, délben jár a legmagasabban.'
  },

  // =================== 2. szint ===================
  {
    id: 'measexamg2-q31',
    level: 2,
    questionTypeBadge: 'Nem a 0-tól',
    figure: <RulerQ stripes={[{ start: 3, len: 8, color: '#a855f7' }]} end={13} />,
    question: 'Milyen hosszú a lila csík?',
    options: ['8 cm', '11 cm', '3 cm', '9 cm'],
    correctAnswer: 0,
    explanation: 'A csík a 3-nál kezdődik és a 11-nél ér véget. 11 − 3 = 8 cm.'
  },
  {
    id: 'measexamg2-q32',
    level: 2,
    questionTypeBadge: 'Átváltás',
    question: 'Hány cm 4 dm?',
    options: ['40 cm', '4 cm', '14 cm', '44 cm'],
    correctAnswer: 0,
    explanation: '1 dm = 10 cm, így 4 dm = 40 cm.'
  },
  {
    id: 'measexamg2-q33',
    level: 2,
    questionTypeBadge: 'Átváltás',
    question: 'Hány cm 2 dm 7 cm?',
    options: ['27 cm', '9 cm', '72 cm', '20 cm'],
    correctAnswer: 0,
    explanation: '2 dm = 20 cm. 20 cm + 7 cm = 27 cm.'
  },
  {
    id: 'measexamg2-q34',
    level: 2,
    questionTypeBadge: 'Átváltás',
    question: 'Mennyi 63 cm deciméterrel és centiméterrel?',
    options: ['6 dm 3 cm', '3 dm 6 cm', '63 dm', '6 m 3 cm'],
    correctAnswer: 0,
    explanation: '63 cm = 60 cm + 3 cm. 60 cm = 6 dm. Tehát 6 dm 3 cm.'
  },
  {
    id: 'measexamg2-q35',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik jel kerül a ○ helyére? 1 m ○ 95 cm',
    options: ['>', '<', '=', 'nem lehet összehasonlítani'],
    correctAnswer: 0,
    explanation: '1 m = 100 cm. A 100 cm több, mint 95 cm, ezért 1 m > 95 cm.'
  },
  {
    id: 'measexamg2-q36',
    level: 2,
    questionTypeBadge: 'Különbség',
    figure: (
      <RulerQ
        stripes={[
          { start: 0, len: 6, color: '#3b82f6' },
          { start: 0, len: 10, color: '#ef4444' }
        ]}
        end={12}
      />
    ),
    question: 'Hány cm-rel hosszabb a piros csík a kéknél?',
    options: ['4 cm', '16 cm', '10 cm', '6 cm'],
    correctAnswer: 0,
    explanation: 'A piros 10 cm, a kék 6 cm. 10 − 6 = 4 cm-rel hosszabb.'
  },
  {
    id: 'measexamg2-q37',
    level: 2,
    questionTypeBadge: 'Összeadás dm-rel',
    question: 'Mennyi 5 dm + 5 dm?',
    options: ['1 m', '10 cm', '55 dm', '1 dm'],
    correctAnswer: 0,
    explanation: '5 dm + 5 dm = 10 dm. 10 dm = 1 m.'
  },
  {
    id: 'measexamg2-q38',
    level: 2,
    questionTypeBadge: 'Becslés',
    figure: <ObjQ kind="pencil" />,
    question: 'Milyen hosszú lehet egy új ceruza?',
    options: ['18 cm', '18 dm', '18 m', '1 cm'],
    correctAnswer: 0,
    explanation: 'Egy új ceruza kb. 18 cm, kicsit hosszabb a tenyerednél. A 18 dm magasabb lenne egy felnőttnél!'
  },
  {
    id: 'measexamg2-q39',
    level: 2,
    questionTypeBadge: 'Hiányzó tömeg',
    figure: <BalQ left={[{ kind: 'pumpkin' }, w(2)]} right={[w(10)]} />,
    question: 'A mérleg egyensúlyban van. Hány kg a tök?',
    options: ['8 kg', '12 kg', '10 kg', '2 kg'],
    correctAnswer: 0,
    explanation: 'A tök + 2 kg = 10 kg. 10 − 2 = 8, a tök 8 kg.'
  },
  {
    id: 'measexamg2-q40',
    level: 2,
    questionTypeBadge: 'Egyforma dobozok',
    figure: <BalQ left={[{ kind: 'box' }, { kind: 'box' }]} right={[w(5), w(1)]} />,
    question: 'A két doboz egyforma. Hány kg egy doboz?',
    options: ['3 kg', '6 kg', '2 kg', '12 kg'],
    correctAnswer: 0,
    explanation: 'A jobb oldal 5 kg + 1 kg = 6 kg. Két egyforma doboz 6 kg, így egy doboz 3 kg (3 + 3 = 6).'
  },
  {
    id: 'measexamg2-q41',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik jel kerül a ○ helyére? 38 kg ○ 83 kg',
    options: ['<', '>', '=', 'nem lehet összehasonlítani'],
    correctAnswer: 0,
    explanation: 'Nézd a tízeseket: 3 tízes kevesebb, mint 8 tízes. 38 kg < 83 kg.'
  },
  {
    id: 'measexamg2-q42',
    level: 2,
    questionTypeBadge: 'Mennyi maradt?',
    figure: <ObjQ kind="sack" label="40 kg" />,
    question: 'A zsákban 40 kg liszt volt. Elhasználtak 15 kg-ot. Mennyi maradt?',
    options: ['25 kg', '35 kg', '55 kg', '15 kg'],
    correctAnswer: 0,
    explanation: '40 − 15 = 25. 25 kg liszt maradt.'
  },
  {
    id: 'measexamg2-q43',
    level: 2,
    questionTypeBadge: 'Súlyok összege',
    figure: <BalQ left={[w(10), w(5), w(2)]} right={[{ kind: 'q' }]} />,
    question: 'A mérleg egyensúlyban van. Hány kg a ?',
    options: ['17 kg', '15 kg', '12 kg', '7 kg'],
    correctAnswer: 0,
    explanation: '10 kg + 5 kg + 2 kg = 17 kg. A ? is 17 kg.'
  },
  {
    id: 'measexamg2-q44',
    level: 2,
    questionTypeBadge: 'Gondolkodj!',
    question: 'Melyik nehezebb: 1 kg toll vagy 1 kg vas?',
    options: ['egyformák', 'a vas', 'a toll', 'nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'Mindkettő 1 kg, tehát egyformán nehezek. A toll csak sokkal több helyet foglal.'
  },
  {
    id: 'measexamg2-q45',
    level: 2,
    questionTypeBadge: 'Összeadás kg-mal',
    figure: <BalQ left={[bag('3 kg'), bag('4 kg')]} right={[{ kind: 'q' }]} />,
    question: 'A kosárban 3 kg alma és 4 kg körte van. Hány kg gyümölcs van összesen?',
    options: ['7 kg', '1 kg', '34 kg', '12 kg'],
    correctAnswer: 0,
    explanation: '3 kg + 4 kg = 7 kg.'
  },
  {
    id: 'measexamg2-q46',
    level: 2,
    questionTypeBadge: 'Mérőedény',
    figure: <JugQ fill={14} max={20} />,
    question: 'Mennyi víz van a mérőedényben?',
    options: ['1 l 4 dl', '4 dl', '14 l', '1 l 2 dl'],
    correctAnswer: 0,
    explanation: 'Az 1 l vonal fölött még 4 kis vonalig ér a víz: 1 l 4 dl (= 14 dl).'
  },
  {
    id: 'measexamg2-q47',
    level: 2,
    questionTypeBadge: 'Átváltás',
    question: 'Hány dl 3 l?',
    options: ['30 dl', '3 dl', '13 dl', '33 dl'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl, így 3 l = 30 dl.'
  },
  {
    id: 'measexamg2-q48',
    level: 2,
    questionTypeBadge: 'Átváltás',
    question: 'Hány dl 1 l 6 dl?',
    options: ['16 dl', '7 dl', '61 dl', '10 dl'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl. 10 dl + 6 dl = 16 dl.'
  },
  {
    id: 'measexamg2-q49',
    level: 2,
    questionTypeBadge: 'Átváltás',
    question: 'Mennyi 12 dl literrel és deciliterrel?',
    options: ['1 l 2 dl', '12 l', '2 l 1 dl', '1 l'],
    correctAnswer: 0,
    explanation: '12 dl = 10 dl + 2 dl. 10 dl = 1 l. Tehát 1 l 2 dl.'
  },
  {
    id: 'measexamg2-q50',
    level: 2,
    questionTypeBadge: 'Poharak',
    figure: <CupsQ n={4} each={2} />,
    question: 'Négy pohárban 2-2 dl víz van. Mennyi víz ez összesen?',
    options: ['8 dl', '6 dl', '42 dl', '2 dl'],
    correctAnswer: 0,
    explanation: '2 dl + 2 dl + 2 dl + 2 dl = 4 · 2 dl = 8 dl.'
  },
  {
    id: 'measexamg2-q51',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik jel kerül a ○ helyére? 2 l ○ 20 dl',
    options: ['=', '<', '>', 'nem lehet összehasonlítani'],
    correctAnswer: 0,
    explanation: '2 l = 20 dl. A két oldal ugyanannyi: 2 l = 20 dl.'
  },
  {
    id: 'measexamg2-q52',
    level: 2,
    questionTypeBadge: 'Mennyi hiányzik?',
    figure: <JugQ fill={6} />,
    question: 'Az 1 literes edényben 6 dl szörp van. Mennyi kell még, hogy tele legyen?',
    options: ['4 dl', '6 dl', '16 dl', '5 dl'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl. 10 − 6 = 4. Még 4 dl kell.'
  },
  {
    id: 'measexamg2-q53',
    level: 2,
    questionTypeBadge: 'Két név',
    figure: <ClockQ h={3} />,
    question: 'Délután van. Hány óra van most?',
    options: ['15 óra', '13 óra', '5 óra', '23 óra'],
    correctAnswer: 0,
    explanation: 'Az óra 3 órát mutat. Délután adj hozzá 12-t: 3 + 12 = 15 óra.'
  },
  {
    id: 'measexamg2-q54',
    level: 2,
    questionTypeBadge: 'Perc a nagymutatón',
    figure: <ClockQ h={10} m={45} />,
    question: 'Mennyi az idő?',
    options: ['10 óra 45 perc', '11 óra 45 perc', '9 óra 55 perc', '10 óra 9 perc'],
    correctAnswer: 0,
    explanation: 'A nagymutató a 9-en: 45 perc. A kismutató már közel van a 11-hez, de még nem érte el: 10 óra 45 perc.'
  },
  {
    id: 'measexamg2-q55',
    level: 2,
    questionTypeBadge: 'Eltelt perc',
    figure: <ClockQ h={12} sector={35} />,
    question: 'A nagymutató végigment a sárga részen. Hány perc telt el?',
    options: ['35 perc', '7 perc', '30 perc', '40 perc'],
    correctAnswer: 0,
    explanation: 'A sárga rész a 12-től a 7-ig tart. Ötösével: 5, 10, 15, 20, 25, 30, 35. Ez 35 perc.'
  },
  {
    id: 'measexamg2-q56',
    level: 2,
    questionTypeBadge: 'Eltelt órák',
    figure: <SpanQ from="9:00" to="14:00" a="kezdés" b="vége" />,
    question: 'Hány óra telik el 9 órától 14 óráig?',
    options: ['5 óra', '4 óra', '6 óra', '23 óra'],
    correctAnswer: 0,
    explanation: '14 − 9 = 5. Tehát 5 óra telik el.'
  },
  {
    id: 'measexamg2-q57',
    level: 2,
    questionTypeBadge: 'Hét és nap',
    figure: <WeekBlocksQ days={21} />,
    question: '3 hét hány nap?',
    options: ['21 nap', '10 nap', '14 nap', '24 nap'],
    correctAnswer: 0,
    explanation: '1 hét = 7 nap. 3 hét = 7 + 7 + 7 = 21 nap.'
  },
  {
    id: 'measexamg2-q58',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a leghosszabb idő?',
    options: ['1 óra 10 perc', '65 perc', '1 óra', 'fél óra'],
    correctAnswer: 0,
    explanation: '1 óra 10 perc = 60 + 10 = 70 perc. Ez több, mint 65 perc, 60 perc vagy 30 perc.'
  },
  {
    id: 'measexamg2-q59',
    level: 2,
    questionTypeBadge: 'A hónap napjai',
    figure: <MonthSheetQ name="NOVEMBER" />,
    question: 'Hány napos a november?',
    options: ['30 nap', '31 nap', '28 nap', '29 nap'],
    correctAnswer: 0,
    explanation: 'A november 30 napos, mint az április, a június és a szeptember.'
  },
  {
    id: 'measexamg2-q60',
    level: 2,
    questionTypeBadge: 'Naptár',
    figure: <CalendarQ today={12} />,
    question: 'Ma április 12. van. Melyik napon lesz 2 hét múlva?',
    options: ['április 26.', 'április 19.', 'április 14.', 'április 25.'],
    correctAnswer: 0,
    explanation: '2 hét = 14 nap. 12 + 14 = 26. A naptárban két sorral lejjebb, ugyanabban az oszlopban.'
  },

  // =================== 3. szint ===================
  {
    id: 'measexamg2-q61',
    level: 3,
    questionTypeBadge: 'Szalag',
    figure: <TapeQ total="1 m" known="40 cm" knownRatio={0.4} />,
    question: 'A szalag 1 m hosszú. Levágtak belőle 40 cm-t. Mennyi maradt?',
    options: ['60 cm', '40 cm', '6 cm', '70 cm'],
    correctAnswer: 0,
    explanation: '1 m = 100 cm. 100 cm − 40 cm = 60 cm maradt.'
  },
  {
    id: 'measexamg2-q62',
    level: 3,
    questionTypeBadge: 'Vegyes mértékek',
    question: 'A kék csík 2 dm 5 cm. A piros 8 cm-rel hosszabb. Milyen hosszú a piros csík?',
    options: ['33 cm', '17 cm', '32 cm', '3 dm 8 cm'],
    correctAnswer: 0,
    explanation: '2 dm 5 cm = 25 cm. 25 cm + 8 cm = 33 cm.'
  },
  {
    id: 'measexamg2-q63',
    level: 3,
    questionTypeBadge: 'Pálcák sorban',
    figure: <RodsQ n={5} label="2 dm" />,
    question: 'Öt egyforma, 2 dm-es pálcát tettünk egymás után. Milyen hosszú a sor?',
    options: ['1 m', '7 dm', '10 cm', '52 dm'],
    correctAnswer: 0,
    explanation: '5 · 2 dm = 10 dm. 10 dm = 1 m.'
  },
  {
    id: 'measexamg2-q64',
    level: 3,
    questionTypeBadge: 'Melyik NEM?',
    question: 'Melyik NEM 50 cm?',
    options: ['5 m', '5 dm', '25 cm + 25 cm', '1 m − 50 cm'],
    correctAnswer: 0,
    explanation: '5 dm = 50 cm, 25 + 25 = 50 cm, 100 − 50 = 50 cm. Az 5 m viszont nagyon hosszú: már 1 m is 100 cm!'
  },
  {
    id: 'measexamg2-q65',
    level: 3,
    questionTypeBadge: 'Horgászat',
    question: 'A horgász csak a 30 cm-nél hosszabb halat viheti haza. Melyiket viheti haza?',
    options: ['3 dm 5 cm', '2 dm 9 cm', '3 dm', '25 cm'],
    correctAnswer: 0,
    explanation: '3 dm 5 cm = 35 cm, ez hosszabb 30 cm-nél. A 3 dm pont 30 cm, az nem hosszabb. 29 cm és 25 cm rövidebb.'
  },
  {
    id: 'measexamg2-q66',
    level: 3,
    questionTypeBadge: 'Nem a 0-tól',
    figure: (
      <RulerQ
        stripes={[
          { start: 2, len: 5, color: '#3b82f6' },
          { start: 4, len: 8, color: '#ef4444' }
        ]}
        end={14}
      />
    ),
    question: 'Hány cm-rel hosszabb a piros csík a kéknél?',
    options: ['3 cm', '5 cm', '8 cm', '12 cm'],
    correctAnswer: 0,
    explanation: 'A kék: 7 − 2 = 5 cm. A piros: 12 − 4 = 8 cm. 8 − 5 = 3 cm-rel hosszabb.'
  },
  {
    id: 'measexamg2-q67',
    level: 3,
    questionTypeBadge: 'Távolugrás',
    figure: <TapeQ total="1 m" known="75 cm" knownRatio={0.75} knownFirst />,
    question: 'Dóri 75 cm-t ugrott, Máté 1 m-t. Mennyivel ugrott többet Máté?',
    options: ['25 cm', '75 cm', '35 cm', '26 cm'],
    correctAnswer: 0,
    explanation: '1 m = 100 cm. 100 cm − 75 cm = 25 cm-rel ugrott többet Máté.'
  },
  {
    id: 'measexamg2-q68',
    level: 3,
    questionTypeBadge: 'Sorba rendezés',
    question: 'Melyik a jó sorrend? Kezdd a legrövidebbel!',
    options: ['9 cm, 1 dm, 15 cm, 1 m', '1 dm, 9 cm, 15 cm, 1 m', '9 cm, 15 cm, 1 dm, 1 m', '1 m, 15 cm, 1 dm, 9 cm'],
    correctAnswer: 0,
    explanation: 'Váltsd át cm-re: 9 cm, 1 dm = 10 cm, 15 cm, 1 m = 100 cm. Így 9 < 10 < 15 < 100.'
  },
  {
    id: 'measexamg2-q69',
    level: 3,
    questionTypeBadge: 'Egyforma dobozok',
    figure: <BalQ left={[{ kind: 'box' }, { kind: 'box' }, { kind: 'box' }]} right={[w(10), w(5)]} />,
    question: 'A három doboz egyforma. Hány kg egy doboz?',
    options: ['5 kg', '15 kg', '3 kg', '12 kg'],
    correctAnswer: 0,
    explanation: 'A jobb oldal 10 kg + 5 kg = 15 kg. 15 kg három egyenlő része: 5 kg (5 + 5 + 5 = 15).'
  },
  {
    id: 'measexamg2-q70',
    level: 3,
    questionTypeBadge: 'Egy hét alatt',
    figure: <DaysKgQ />,
    question: 'Az állatkert tigrise minden nap 7 kg húst eszik. Mennyit eszik egy hét alatt?',
    options: ['49 kg', '14 kg', '7 kg', '56 kg'],
    correctAnswer: 0,
    explanation: '1 hét = 7 nap. 7 · 7 kg = 49 kg.'
  },
  {
    id: 'measexamg2-q71',
    level: 3,
    questionTypeBadge: 'Mennyi hiányzik?',
    question: 'A kocsin 36 kg és 48 kg csomag van. Hány kg hiányzik még a 100 kg-hoz?',
    options: ['16 kg', '84 kg', '26 kg', '14 kg'],
    correctAnswer: 0,
    explanation: '36 kg + 48 kg = 84 kg. 100 − 84 = 16 kg hiányzik.'
  },
  {
    id: 'measexamg2-q72',
    level: 3,
    questionTypeBadge: 'Rekordhal',
    question: 'Az idei legnagyobb hal 42 kg. A tavalyi 6 kg-mal könnyebb volt. Mennyi a két hal együtt?',
    options: ['78 kg', '36 kg', '84 kg', '90 kg'],
    correctAnswer: 0,
    explanation: 'A tavalyi: 42 − 6 = 36 kg. Együtt: 42 + 36 = 78 kg.'
  },
  {
    id: 'measexamg2-q73',
    level: 3,
    questionTypeBadge: 'Hiányzó tömeg',
    figure: <BalQ left={[{ kind: 'pumpkin' }, w(5)]} right={[w(10), w(10)]} />,
    question: 'A mérleg egyensúlyban van. Hány kg a tök?',
    options: ['15 kg', '25 kg', '20 kg', '5 kg'],
    correctAnswer: 0,
    explanation: 'A jobb oldal 10 kg + 10 kg = 20 kg. A tök + 5 kg = 20 kg, így a tök 20 − 5 = 15 kg.'
  },
  {
    id: 'measexamg2-q74',
    level: 3,
    questionTypeBadge: 'Egyensúly',
    figure: <BalQ left={[bag('25 kg')]} right={[bag('18 kg')]} tilt={-10} />,
    question: 'Hány kg-ot tegyünk a jobb oldalra, hogy egyensúly legyen?',
    options: ['7 kg', '43 kg', '18 kg', '13 kg'],
    correctAnswer: 0,
    explanation: 'Bal oldalon 25 kg, jobb oldalon 18 kg. 25 − 18 = 7 kg kell még a jobb oldalra.'
  },
  {
    id: 'measexamg2-q75',
    level: 3,
    questionTypeBadge: 'Igaz mondat',
    question: 'Melyik mondat igaz?',
    options: [
      '1 kg toll ugyanolyan nehéz, mint 1 kg vas.',
      'A nagyobb tárgy mindig nehezebb.',
      'A tömeget literrel mérjük.',
      'A mérleg nehezebb oldala felemelkedik.'
    ],
    correctAnswer: 0,
    explanation: 'Az 1 kg mindig 1 kg. A nagy tárgy lehet könnyű (léggömb). A tömeget kg-mal mérjük, és a nehezebb oldal lemegy.'
  },
  {
    id: 'measexamg2-q76',
    level: 3,
    questionTypeBadge: 'Zsúr',
    figure: <TwoJugsQ a={6} b={9} />,
    question: 'A zsúron 6 dl almalé és 9 dl narancslé fogyott. Mennyi ez összesen?',
    options: ['1 l 5 dl', '15 l', '1 l 6 dl', '5 dl'],
    correctAnswer: 0,
    explanation: '6 dl + 9 dl = 15 dl. 15 dl = 10 dl + 5 dl = 1 l 5 dl.'
  },
  {
    id: 'measexamg2-q77',
    level: 3,
    questionTypeBadge: 'Hány pohár?',
    figure: <JugQ fill={20} max={20} showQ={false} />,
    question: 'A kancsóban 2 l víz van. 4 dl-es poharakat töltünk tele. Hány pohár lesz tele?',
    options: ['5', '4', '8', '6'],
    correctAnswer: 0,
    explanation: '2 l = 20 dl. 4 + 4 + 4 + 4 + 4 = 20, tehát 5 pohár lesz tele.'
  },
  {
    id: 'measexamg2-q78',
    level: 3,
    questionTypeBadge: 'Mennyi hiányzik?',
    figure: <JugQ fill={13} max={20} />,
    question: 'Mennyi víz hiányzik még, hogy 2 l legyen az edényben?',
    options: ['7 dl', '13 dl', '3 dl', '8 dl'],
    correctAnswer: 0,
    explanation: 'Az edényben 1 l 3 dl = 13 dl van. 2 l = 20 dl. 20 − 13 = 7 dl hiányzik.'
  },
  {
    id: 'measexamg2-q79',
    level: 3,
    questionTypeBadge: 'Esővizes hordó',
    question: 'A hordóban 80 l víz volt. Elhasználtak 35 l-t, aztán esett, és lett benne még 10 l. Mennyi víz van most benne?',
    options: ['55 l', '45 l', '35 l', '65 l'],
    correctAnswer: 0,
    explanation: '80 − 35 = 45 l maradt. 45 + 10 = 55 l van most a hordóban.'
  },
  {
    id: 'measexamg2-q80',
    level: 3,
    questionTypeBadge: 'Legtöbb',
    question: 'Melyik a legtöbb?',
    options: ['1 l 3 dl', '12 dl', '1 l', '9 dl'],
    correctAnswer: 0,
    explanation: 'Váltsd át dl-re: 1 l 3 dl = 13 dl, 12 dl, 1 l = 10 dl, 9 dl. A 13 dl a legtöbb.'
  },
  {
    id: 'measexamg2-q81',
    level: 3,
    questionTypeBadge: 'Elég lesz?',
    figure: <CupsQ n={3} each={3} />,
    question: 'Csenge 3 pohár limonádét tölt, mindegyikbe 3 dl kell. 1 l limonádéja van. Elég lesz?',
    options: ['Igen, és 1 dl marad.', 'Nem, 1 dl hiányzik.', 'Igen, és 7 dl marad.', 'Nem, 3 dl hiányzik.'],
    correctAnswer: 0,
    explanation: '3 · 3 dl = 9 dl kell. 1 l = 10 dl. 10 − 9 = 1, tehát elég, és 1 dl marad.'
  },
  {
    id: 'measexamg2-q82',
    level: 3,
    questionTypeBadge: 'Hamis mondat',
    question: 'Melyik mondat HAMIS?',
    options: ['A fél liter 50 dl.', 'Az 1 liter 10 dl.', 'A 2 liter 20 dl.', 'A fél liter 5 dl.'],
    correctAnswer: 0,
    explanation: 'A fél liter 5 dl, nem 50 dl. Az 50 dl 5 liter lenne!'
  },
  {
    id: 'measexamg2-q83',
    level: 3,
    questionTypeBadge: 'Mikor érkezik?',
    figure: <ClockQ h={8} m={40} />,
    question: 'Noé ekkor indul el. Az út 20 percig tart. Mikor ér oda?',
    options: ['9 óra', '8 óra 20 perc', '10 óra', '9 óra 20 perc'],
    correctAnswer: 0,
    explanation: 'Az óra 8 óra 40 percet mutat. 40 perc + 20 perc = 60 perc = 1 óra. Noé 9 órakor ér oda.'
  },
  {
    id: 'measexamg2-q84',
    level: 3,
    questionTypeBadge: 'Éjfélen át',
    figure: <SpanQ from="20:00" to="6:00" a="lefekszik" b="felkel" />,
    question: 'Panni este 20 órakor fekszik le, és reggel 6 órakor kel fel. Hány órát alszik?',
    options: ['10 órát', '14 órát', '26 órát', '9 órát'],
    correctAnswer: 0,
    explanation: '20 órától éjfélig (24 óráig) 4 óra. Éjféltől reggel 6-ig még 6 óra. 4 + 6 = 10 óra.'
  },
  {
    id: 'measexamg2-q85',
    level: 3,
    questionTypeBadge: 'Egész óráig',
    figure: <DigitalQ text="7:15" caption="Mikor lesz 8:00?" />,
    question: 'Hány perc múlva lesz 8 óra?',
    options: ['45 perc', '15 perc', '85 perc', '55 perc'],
    correctAnswer: 0,
    explanation: '1 óra = 60 perc. 15 perc után még 60 − 15 = 45 perc kell a 8 óráig.'
  },
  {
    id: 'measexamg2-q86',
    level: 3,
    questionTypeBadge: 'Naptár',
    figure: <CalendarQ today={6} />,
    question: 'Ma április 6. van. A hét melyik napjára esik április 20.?',
    options: ['hétfő', 'vasárnap', 'kedd', 'szerda'],
    correctAnswer: 0,
    explanation: 'Április 6. hétfő. 20 − 6 = 14 nap = 2 hét. 2 hét múlva újra hétfő van.'
  },
  {
    id: 'measexamg2-q87',
    level: 3,
    questionTypeBadge: 'Hét és nap',
    question: 'Zsófi 25 nap alatt olvasott el egy könyvet, Ádám 3 hét alatt. Ki volt gyorsabb, és hány nappal?',
    options: ['Ádám, 4 nappal', 'Zsófi, 4 nappal', 'Ádám, 22 nappal', 'Zsófi, 22 nappal'],
    correctAnswer: 0,
    explanation: '3 hét = 21 nap. 21 nap kevesebb, mint 25 nap, tehát Ádám volt gyorsabb. 25 − 21 = 4 nappal.'
  },
  {
    id: 'measexamg2-q88',
    level: 3,
    questionTypeBadge: 'Nyitvatartás',
    figure: (
      <BoardQ
        title="ÁLLATKERT – NYITVA"
        rows={[
          ['kedd', '9–16 óráig'],
          ['szombat', '10–20 óráig']
        ]}
      />
    ),
    question: 'Hány órával van tovább nyitva az állatkert szombaton, mint kedden?',
    options: ['3 órával', '10 órával', '7 órával', '4 órával'],
    correctAnswer: 0,
    explanation: 'Kedden: 16 − 9 = 7 óra. Szombaton: 20 − 10 = 10 óra. 10 − 7 = 3 órával tovább.'
  },
  {
    id: 'measexamg2-q89',
    level: 3,
    questionTypeBadge: 'Óra és perc',
    question: 'Hány perc 1 óra 15 perc?',
    options: ['75 perc', '16 perc', '65 perc', '85 perc'],
    correctAnswer: 0,
    explanation: '1 óra = 60 perc. 60 perc + 15 perc = 75 perc.'
  },
  {
    id: 'measexamg2-q90',
    level: 3,
    questionTypeBadge: 'Hét és nap',
    figure: <WeekBlocksQ days={17} />,
    question: 'Hány nap 2 hét és 3 nap?',
    options: ['17 nap', '23 nap', '5 nap', '10 nap'],
    correctAnswer: 0,
    explanation: '2 hét = 14 nap. 14 + 3 = 17 nap.'
  }
];

export const MeasExamG2Quiz: React.FC<{
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
      topicId="g2-meres-tudasproba-quiz"
      subtopicId="gyakorlas-tudasproba"
      title="5. Gyakorlás, tudáspróba – Kvíz"
      subtitle="90 feladat 3 szinten: hosszúság, tömeg, űrtartalom és idő – mérés, átváltás és szöveges feladatok."
      badge="2. OSZTÁLY • VIII. MÉRÉSEK • KVÍZ"
      questions={MEAS_EXAM_G2_QUESTIONS}
      cheatSheets={[
        {
          title: 'Hosszúság és tömeg',
          items: [
            '1 dm = 10 cm, 1 m = 10 dm = 100 cm',
            'Vonalzó: a 0-tól mérj, különben vége − eleje',
            'Tömeg: kg, mérleggel mérjük',
            'Egyensúly: a két oldal ugyanannyi'
          ]
        },
        {
          title: 'Űrtartalom',
          items: ['1 l = 10 dl', 'fél liter = 5 dl', '14 dl = 1 l 4 dl', 'Mérőedénnyel mérjük']
        },
        {
          title: 'Idő',
          items: [
            '1 óra = 60 perc, 1 nap = 24 óra',
            '1 hét = 7 nap, 1 év = 12 hónap',
            'Kismutató: óra, nagymutató: perc',
            'Délután + 12: 3 óra = 15 óra'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <MeasExamG2Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <MeasExamG2Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default MeasExamG2Quiz;
