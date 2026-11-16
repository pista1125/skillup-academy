import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { FractionsExamMatcher } from './FractionsExamMatcher';
import { FractionsExamSorter } from './FractionsExamSorter';
import { GridG, BOARD_FILL, BOARD_VALUES } from './FractionsExamFigures';
import { BarG, PieG } from '../tortek-osszehasonlitasa/FractionCompare4Figures';
import { ClockFaceG } from '../tortresz-szamitasa/FractionOfAmountFigures';

// ---------------------------------------------------------------------------
// Kérdésábrák – kis SVG-k, az ismeretlent „?” jelöli
// ---------------------------------------------------------------------------
const QFig: React.FC<{ children: React.ReactNode; title?: string; h?: number }> = ({ children, title, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {title && (
      <text x="120" y="17" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#334155">
        {title}
      </text>
    )}
    {children}
  </svg>
);

const T: React.FC<{ x: number; y: number; t: string; s?: number; c?: string; a?: 'start' | 'middle' | 'end' }> = ({ x, y, t, s = 12, c, a = 'middle' }) => (
  <text x={x} y={y} fontSize={s} fontWeight="bold" textAnchor={a} fill={t.includes('?') ? '#dc2626' : c ?? '#0f172a'}>
    {t}
  </text>
);

const Pie1: React.FC<{ parts: number; filled: number; title?: string; note: string; color?: string }> = ({ parts, filled, title, note, color }) => (
  <QFig title={title} h={140}>
    <PieG cx={120} cy={70} r={44} parts={parts} filled={filled} pizza={!color} color={color ?? '#fb923c'} empty="#ffffff" />
    <T x={120} y={132} t={note} />
  </QFig>
);

const Bar1: React.FC<{ parts: number; filled: number; title?: string; note: string; color?: string }> = ({ parts, filled, title, note, color = '#f97316' }) => (
  <QFig title={title} h={100}>
    <BarG x={20} y={30} w={200} h={30} parts={parts} filled={filled} color={color} />
    <T x={120} y={86} t={note} />
  </QFig>
);

const Grid1: React.FC<{ rows: number; cols: number; filled: number[]; title?: string; note: string; color?: string; cell?: number }> = ({ rows, cols, filled, title, note, color, cell = 22 }) => (
  <QFig title={title} h={rows * cell + 64}>
    <GridG x={120 - (cols * cell) / 2} y={28} rows={rows} cols={cols} cell={cell} filled={filled} color={color} />
    <T x={120} y={rows * cell + 52} t={note} />
  </QFig>
);

const Dots: React.FC<{ colors: string[]; title?: string; note: string; r?: number; cols?: number }> = ({ colors, title, note, r = 10, cols = 8 }) => {
  const step = 2 * r + 6;
  const rows = Math.ceil(colors.length / cols);
  const x0 = 120 - ((Math.min(cols, colors.length) - 1) * step) / 2;
  return (
    <QFig title={title} h={rows * step + 64}>
      {colors.map((c, i) => (
        <circle key={i} cx={x0 + (i % cols) * step} cy={40 + Math.floor(i / cols) * step} r={r} fill={c} stroke="#334155" strokeWidth={1.2} />
      ))}
      <T x={120} y={rows * step + 50} t={note} />
    </QFig>
  );
};

const Clock1: React.FC<{ minutes: number; note: string }> = ({ minutes, note }) => (
  <QFig title="1 óra = 60 perc" h={140}>
    <ClockFaceG cx={120} cy={74} r={46} minutes={minutes} />
    <T x={120} y={134} t={note} />
  </QFig>
);

const Track: React.FC<{ note: string }> = ({ note }) => {
  const X = (m: number) => 20 + (200 * m) / 1000;
  return (
    <QFig title="Az 1 km-es versenypálya" h={120}>
      <line x1={20} y1={64} x2={226} y2={64} stroke="#334155" strokeWidth={2} />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={X(i * 100)} y1={i % 5 === 0 ? 57 : 60} x2={X(i * 100)} y2={i % 5 === 0 ? 71 : 68} stroke="#334155" strokeWidth={i % 5 === 0 ? 2 : 1.2} />
      ))}
      <T x={X(0)} y={86} t="0 m" s={10} />
      <T x={X(500)} y={86} t="500 m" s={10} />
      <T x={X(1000)} y={86} t="1 km" s={10} />
      <T x={X(0)} y={46} t="RAJT" s={10} c="#15803d" />
      <T x={X(1000)} y={46} t="CÉL" s={10} c="#b91c1c" />
      <T x={120} y={108} t={note} s={11} c="#1d4ed8" />
    </QFig>
  );
};

const BoardField: React.FC<{ c: keyof typeof BOARD_VALUES; label: string }> = ({ c, label }) => (
  <QFig title="Társasjáték: a szín egy számot jelent" h={110}>
    <rect x={60} y={28} width={120} height={28} rx={14} fill={BOARD_FILL[c]} />
    <T x={120} y={47} t={String(BOARD_VALUES[c])} s={14} c="#ffffff" />
    <rect x={60} y={64} width={120} height={28} rx={6} fill={BOARD_FILL[c]} stroke="#334155" />
    <T x={120} y={83} t={label} s={13} c="#ffffff" />
    <T x={210} y={83} t="?" s={18} />
  </QFig>
);

const TwoPies: React.FC<{ a: [number, number]; b: [number, number]; la: string; lb: string; title?: string }> = ({ a, b, la, lb, title }) => (
  <QFig title={title} h={140}>
    <PieG cx={62} cy={72} r={40} parts={a[1]} filled={a[0]} pizza />
    <T x={62} y={130} t={la} c="#9a3412" />
    <T x={120} y={80} t="?" s={22} />
    <PieG cx={178} cy={72} r={40} parts={b[1]} filled={b[0]} pizza />
    <T x={178} y={130} t={lb} c="#9a3412" />
  </QFig>
);

const RED = '#ef4444';
const YEL = '#facc15';
const BLU = '#3b82f6';
const GRN = '#22c55e';

// ---- Ábrák ----
const F1 = <Pie1 parts={6} filled={1} note="a színes rész: ?" />;
const F2 = (
  <QFig title="A téglalap 1 egészet ér" h={100}>
    {[0, 1, 2].map((i) => (
      <rect key={i} x={60 + i * 40} y={26} width={40} height={50} fill={i === 1 ? GRN : '#ffffff'} stroke="#334155" strokeWidth={1.5} />
    ))}
    <T x={120} y={92} t="a zöld rész: ?" />
  </QFig>
);
const F4 = <Bar1 parts={5} filled={3} note="a színes rész: ?" />;
const F5 = <Bar1 parts={4} filled={3} note="a fehér rész: ?" color={BLU} />;
const F7 = (
  <QFig title="A francia zászló" h={110}>
    <rect x={60} y={26} width={40} height={60} fill="#1d4ed8" stroke="#334155" />
    <rect x={100} y={26} width={40} height={60} fill="#ffffff" stroke="#334155" />
    <rect x={140} y={26} width={40} height={60} fill="#dc2626" stroke="#334155" />
    <T x={120} y={102} t="kék + fehér + piros = ?" />
  </QFig>
);
const F13 = <Clock1 minutes={30} note="fél óra = ? perc" />;
const F14 = <Dots colors={[RED, YEL, YEL]} title="Gyöngysor" note="a piros gyöngyök: ?" r={14} />;
const F15 = <Grid1 rows={4} cols={4} filled={[]} title="A nagy négyzet 1 egészet ér" note="a negyede: ? kis négyzet" cell={20} />;
const F18 = <TwoPies a={[1, 5]} b={[1, 10]} la="1 ötöd" lb="1 tized" title="Két egyforma pizzából 1-1 szelet" />;
const F21 = <Dots colors={[RED, RED, RED, RED, YEL, YEL, YEL, YEL, YEL, YEL, YEL, YEL]} title="12 pohár" note="a piros poharak: ?" r={9} cols={6} />;
const F27 = <Pie1 parts={8} filled={8} note="színes: ? nyolcad" />;

const F31 = <Grid1 rows={3} cols={4} filled={[0, 4, 8]} title="Az ábra 1 egészet ér" note="a kék rész: ?" color={BLU} />;
const F32 = <Grid1 rows={3} cols={4} filled={[1, 2, 3, 5, 6, 7, 9, 10, 11]} title="Az ábra 1 egészet ér" note="a sárga rész: ?" color={YEL} />;
const F37 = <Grid1 rows={2} cols={2} filled={[3]} title="Az egész téglalap értéke 2400" note="a zöld rész értéke: ?" cell={30} />;
const F38 = (
  <QFig title="Az egész téglalap értéke 2400" h={120}>
    {[0, 1, 2].map((i) => (
      <rect key={i} x={70} y={28 + i * 22} width={100} height={22} fill={i === 1 ? '#84cc16' : '#ffffff'} stroke="#334155" strokeWidth={1.5} />
    ))}
    <T x={120} y={112} t="a zöld rész értéke: ?" />
  </QFig>
);
const F42 = (
  <QFig title="7 harmad pizza" h={120}>
    {[0, 1, 2].map((i) => (
      <PieG key={i} cx={50 + i * 70} cy={60} r={30} parts={3} filled={i < 2 ? 3 : 1} pizza />
    ))}
    <T x={120} y={110} t="? egész és ? harmad" />
  </QFig>
);
const F43 = (
  <QFig title="3 fél alma" h={110}>
    {[0, 1, 2].map((i) => (
      <path key={i} d={`M ${60 + i * 60} 30 A 26 26 0 0 0 ${60 + i * 60} 82 Z`} fill="#ef4444" stroke="#7f1d1d" strokeWidth={1.5} />
    ))}
    <T x={120} y={100} t="? alma" />
  </QFig>
);
const F45 = <Track note="1 km 1 negyede = ? m" />;
const F47 = (
  <QFig title="A 400 literes dézsa" h={150}>
    <rect x={80} y={26} width={80} height={110} rx={6} fill="#ffffff" stroke="#334155" strokeWidth={2} />
    {Array.from({ length: 10 }, (_, i) => (
      <rect key={i} x={80} y={26 + i * 11} width={80} height={11} fill={i >= 4 ? '#60a5fa' : '#ffffff'} stroke="#94a3b8" strokeWidth={0.8} />
    ))}
    <T x={40} y={100} t="6 tized" s={11} c="#1d4ed8" />
    <T x={200} y={100} t="? liter" s={12} />
  </QFig>
);
const F52 = <Dots colors={[GRN, GRN, GRN, GRN, GRN, GRN, GRN, GRN, '#cbd5e1', '#cbd5e1']} title="Janka 10 lövése (zöld: találat)" note="a találatok: ?" r={9} cols={10} />;
const F53 = <Dots colors={[BLU, RED, GRN, GRN, BLU, GRN, RED, GRN, BLU, GRN, RED, GRN]} title="12 autó a parkolóban" note="3 kék • 3 piros • 6 zöld" r={9} cols={6} />;
const F56 = <Pie1 parts={3} filled={1} title="A pizza 2 harmadát megettük" note="ennyi maradt: ?" />;
const F58 = <Track note="3 ötöd km • 3 negyed km – melyik messzebb?" />;

const F62 = (
  <QFig title="180 diák a táborban" h={120}>
    <rect x={20} y={32} width={100} height={28} fill={BLU} stroke="#334155" />
    <T x={70} y={51} t="fele: kék" s={11} c="#ffffff" />
    <rect x={120} y={32} width={100} height={28} fill="#ffffff" stroke="#334155" />
    <T x={170} y={51} t="maradék" s={11} c="#334155" />
    <T x={170} y={80} t="harmada: zöld sátor" s={10} c="#15803d" />
    <T x={120} y={106} t="zöld sátorban: ? diák" />
  </QFig>
);
const F64 = (
  <QFig title="15 liter szörp" h={110}>
    <rect x={20} y={30} width={200} height={28} fill="#ffffff" stroke="#334155" strokeWidth={2} />
    <rect x={20} y={30} width={66.7} height={28} fill="#f43f5e" stroke="#334155" />
    <T x={53} y={49} t="málna" s={10} c="#ffffff" />
    <T x={153} y={49} t="maradék" s={10} c="#334155" />
    <T x={120} y={78} t="a maradék fele eper" s={11} c="#334155" />
    <T x={120} y={98} t="eper: ? liter" />
  </QFig>
);
const F66 = (
  <QFig title="Ugróverseny – 2 m = 200 cm" h={110}>
    <T x={14} y={38} t="mókus: 3 negyed" a="start" s={11} />
    <BarG x={14} y={43} w={180} h={14} parts={4} filled={3} color="#f97316" />
    <T x={14} y={76} t="béka: 4 tized" a="start" s={11} />
    <BarG x={14} y={81} w={180} h={14} parts={10} filled={4} color={GRN} />
    <T x={216} y={70} t="?" s={18} />
  </QFig>
);
const F72 = <BoardField c="zöld" label="1 század" />;
const F73 = <BoardField c="narancs" label="1 tized" />;
const F74 = <BoardField c="piros" label="3 negyed" />;
const F75 = (
  <QFig title="Palkó 60 autója" h={110}>
    <rect x={40} y={30} width={20} height={12} rx={3} fill={GRN} stroke="#334155" />
    <T x={70} y={40} t="1 negyede zöld" a="start" s={11} />
    <rect x={40} y={52} width={20} height={12} rx={3} fill={RED} stroke="#334155" />
    <T x={70} y={62} t="1 harmada piros" a="start" s={11} />
    <T x={120} y={96} t="zöld vagy piros: ? autó" />
  </QFig>
);
const F78 = <Bar1 parts={8} filled={1} title="A sajt három nap után (sárga: ami maradt)" note="megette: ? rész" color="#fde047" />;
const F80 = (
  <QFig title="2 pizza, 4-4 szelet – a megmaradt szeletek" h={130}>
    <PieG cx={70} cy={66} r={38} parts={4} filled={4} pizza />
    <PieG cx={170} cy={66} r={38} parts={4} filled={1} pizza />
    <T x={120} y={122} t="Hány negyed pizza maradt? ?" />
  </QFig>
);
const F81 = (
  <QFig title="Busz: 3 negyed óra • Séta: 1 és negyed óra" h={120}>
    <ClockFaceG cx={50} cy={66} r={30} minutes={45} showLabels={false} />
    <ClockFaceG cx={130} cy={66} r={30} minutes={60} showLabels={false} />
    <ClockFaceG cx={200} cy={66} r={30} minutes={15} showLabels={false} />
    <T x={120} y={112} t="összesen: ? perc" />
  </QFig>
);
const F83 = (
  <QFig title="Kerékpártúra: 60 km" h={110}>
    <BarG x={20} y={30} w={200} h={26} parts={3} filled={1} color="#0ea5e9" />
    <T x={53} y={74} t="1. nap" s={10} />
    <T x={153} y={74} t="maradék fele: 2. nap" s={10} />
    <T x={120} y={98} t="3. napra marad: ? km" />
  </QFig>
);
const F85 = (
  <QFig title="Eladott virágok (összesen 3000 szál)" h={110}>
    <rect x={20} y={32} width={200} height={20} fill="#ef4444" stroke="#334155" />
    <T x={226} y={47} t="3000" s={9} a="end" c="#ffffff" />
    <rect x={20} y={62} width={40} height={20} fill="#84cc16" stroke="#334155" />
    <T x={66} y={77} t="gerbera: 600" s={10} a="start" />
    <T x={120} y={102} t="a gerberák: ? rész" />
  </QFig>
);
const F86 = (
  <QFig title="A kék szakasz: 12 cm" h={90}>
    <line x1={20} y1={44} x2={220} y2={44} stroke="#2563eb" strokeWidth={4} strokeLinecap="round" />
    <line x1={20} y1={58} x2={36.7} y2={58} stroke="#dc2626" strokeWidth={4} strokeLinecap="round" />
    <T x={120} y={80} t="a tizedrésze (piros): ?" />
  </QFig>
);

export const FRACTIONS_EXAM_QUESTIONS: QuizQuestion[] = [
  // ======================= 1. SZINT (30) =======================
  { id: 'fe-q1', questionTypeBadge: 'Törtrész neve', figure: F1, level: 1, question: 'Hányad részét színeztük ki a pizzának?', options: ['1 hatod', '1 ötöd', '6 egész', '1 harmad'], correctAnswer: 0, explanation: 'A pizzát 6 egyenlő részre vágtuk, ebből 1 színes: 1 hatod.' },
  { id: 'fe-q2', questionTypeBadge: 'Törtrész neve', figure: F2, level: 1, question: 'A téglalap 1 egészet ér. Hányad része zöld?', options: ['1 harmad', '1 ketted', '3 harmad', '1 negyed'], correctAnswer: 0, explanation: '3 egyenlő részből 1 zöld: ez 1 harmad.' },
  { id: 'fe-q3', questionTypeBadge: 'Egyenlő részek', level: 1, question: 'A tortából egy szelet 1 nyolcad. Hány egyenlő szeletre vágták a tortát?', options: ['8', '1', '4', '18'], correctAnswer: 0, explanation: 'A „nyolcad” azt jelenti, hogy 8 egyenlő részre vágtuk az egészet.' },
  { id: 'fe-q4', questionTypeBadge: 'Egynél kisebb tört', figure: F4, level: 1, question: 'A csík 1 egészet ér. Hányad része színes?', options: ['3 ötöd', '2 ötöd', '3 harmad', '5 harmad'], correctAnswer: 0, explanation: '5 egyenlő részből 3 színes: 3 ötöd.' },
  { id: 'fe-q5', questionTypeBadge: 'Fehér rész', figure: F5, level: 1, question: 'A csík 1 egészet ér. Hányad része fehér?', options: ['1 negyed', '3 negyed', '1 harmad', '4 negyed'], correctAnswer: 0, explanation: '4 egyenlő részből 3 kék, 1 fehér: a fehér rész 1 negyed.' },
  { id: 'fe-q6', questionTypeBadge: '1 egész', level: 1, question: 'Hány negyed van 1 egészben?', options: ['4', '2', '1', '8'], correctAnswer: 0, explanation: 'Ha az egészet 4 egyenlő részre vágjuk, 4 negyedet kapunk: 4 negyed = 1 egész.' },
  { id: 'fe-q7', questionTypeBadge: '1 egész', figure: F7, level: 1, question: 'A francia zászló kék, fehér és piros része együtt hányad része a zászlónak?', options: ['3 harmad, vagyis 1 egész', '2 harmad', '1 harmad', '3 egész'], correctAnswer: 0, explanation: 'Minden szín 1 harmad, a három együtt 3 harmad, vagyis egy egész (Tankönyv 147. o.).' },
  { id: 'fe-q8', questionTypeBadge: 'Összehasonlítás', level: 1, question: 'Ugyanakkora pizzákból melyik a nagyobb szelet: 1 ketted vagy 1 negyed?', options: ['1 ketted', '1 negyed', 'egyformák'], correctAnswer: 0, explanation: 'Kevesebb részre vágva nagyobb egy rész. Az 1 ketted a pizza fele, ez nagyobb, mint 1 negyed.' },
  { id: 'fe-q9', questionTypeBadge: 'Relációs jel', level: 1, question: 'Melyik jel kerül a helyére? 3 tized ☐ 7 tized', options: ['<', '>', '='], correctAnswer: 0, explanation: 'Ugyanolyan részek (tizedek): a 3 kevesebb, mint a 7. 3 tized < 7 tized.' },
  { id: 'fe-q10', questionTypeBadge: 'Osztozkodás', level: 1, question: 'Hárman osztoznak igazságosan 12 bonbonon. Hány bonbon jut egy gyereknek?', options: ['4', '3', '9', '36'], correctAnswer: 0, explanation: '12 : 3 = 4. Mindenki a bonbonok 1 harmadát kapja.' },
  { id: 'fe-q11', questionTypeBadge: 'Törtrész kiszámítása', level: 1, question: 'Mennyi a 24 papírtányér fele?', options: ['12', '2', '22', '48'], correctAnswer: 0, explanation: 'A fele: 24 : 2 = 12 tányér.' },
  { id: 'fe-q12', questionTypeBadge: 'Hosszúság', level: 1, question: 'Hány centiméter a méter negyede?', options: ['25 cm', '4 cm', '40 cm', '50 cm'], correctAnswer: 0, explanation: '1 m = 100 cm. 100 : 4 = 25 cm.' },
  { id: 'fe-q13', questionTypeBadge: 'Idő', figure: F13, level: 1, question: 'Hány perc a fél óra?', options: ['30 perc', '50 perc', '20 perc', '15 perc'], correctAnswer: 0, explanation: '1 óra = 60 perc. A fele: 60 : 2 = 30 perc.' },
  { id: 'fe-q14', questionTypeBadge: 'Gyöngyök', figure: F14, level: 1, question: 'A gyöngyök hányad része piros?', options: ['1 harmad', '2 harmad', '1 ketted', '3 harmad'], correctAnswer: 0, explanation: '3 gyöngyből 1 piros: a gyöngyök 1 harmada piros.' },
  { id: 'fe-q15', questionTypeBadge: 'Színezés', figure: F15, level: 1, question: 'A nagy négyzet 16 kis négyzetből áll. Hány kis négyzetet színezz ki, hogy a negyede legyen színes?', options: ['4', '1', '2', '8'], correctAnswer: 0, explanation: '16 : 4 = 4 kis négyzet a negyede.' },
  { id: 'fe-q16', questionTypeBadge: '1 egész', level: 1, question: 'Hány tized ad ki 1 egészet?', options: ['10 tized', '1 tized', '100 tized', '5 tized'], correctAnswer: 0, explanation: 'A tized részeknél 10 egyenlő részre vágtunk, így 10 tized = 1 egész.' },
  { id: 'fe-q17', questionTypeBadge: 'Egyenlő törtek', level: 1, question: 'Melyik egyenlő 1 ketteddel (a felével)?', options: ['2 negyed', '1 negyed', '2 harmad', '3 negyed'], correctAnswer: 0, explanation: 'A 4 negyed rész fele 2 negyed. 1 ketted = 2 negyed.' },
  { id: 'fe-q18', questionTypeBadge: 'Összehasonlítás', figure: F18, level: 1, question: 'Két egyforma pizzából vágtunk 1-1 szeletet. Melyik a nagyobb?', options: ['1 ötöd', '1 tized', 'egyformák'], correctAnswer: 0, explanation: 'Az ötödnél 5, a tizednél 10 részre vágtuk a pizzát. Kevesebb részre vágva nagyobb a szelet: 1 ötöd > 1 tized.' },
  { id: 'fe-q19', questionTypeBadge: 'Egyenlő részek', level: 1, question: 'Egy rész neve 1 ötöd. Hány egyenlő részre osztottuk az egészet?', options: ['5', '1', '4', '10'], correctAnswer: 0, explanation: 'Az „ötöd” szó jelzi: 5 egyenlő részre osztottuk az egészet.' },
  { id: 'fe-q20', questionTypeBadge: 'Hosszúság', level: 1, question: 'Hány centiméter 100 cm tizede?', options: ['10 cm', '1 cm', '100 cm', '90 cm'], correctAnswer: 0, explanation: '100 : 10 = 10 cm. (1 tized m = 1 dm = 10 cm.)' },
  { id: 'fe-q21', questionTypeBadge: 'Poharak', figure: F21, level: 1, question: '12 pohárból 4 piros. A poharak hányad része piros?', options: ['1 harmad', '1 negyed', '2 harmad', '1 ketted'], correctAnswer: 0, explanation: 'A 12 poharat 3 egyenlő csoportba tehetjük, 4-4 pohárral. A piros 4 pohár 1 csoport: 1 harmad.' },
  { id: 'fe-q22', questionTypeBadge: 'Egynél kisebb tört', level: 1, question: 'Melyik tört kisebb 1 egésznél?', options: ['2 harmad', '3 harmad', '4 harmad', '5 negyed'], correctAnswer: 0, explanation: 'Az 1 egész 3 harmad. A 2 harmadból még 1 harmad hiányzik, tehát kisebb 1 egésznél.' },
  { id: 'fe-q23', questionTypeBadge: 'Egynél nagyobb tört', level: 1, question: 'Melyik tört nagyobb 1 egésznél?', options: ['5 negyed', '4 negyed', '3 negyed', '1 negyed'], correctAnswer: 0, explanation: '4 negyed = 1 egész. Az 5 negyed ennél 1 negyeddel több: 1 egész és 1 negyed.' },
  { id: 'fe-q24', questionTypeBadge: 'Tömeg', level: 1, question: 'Mennyi a 30 dkg vaj fele?', options: ['15 dkg', '60 dkg', '10 dkg', '28 dkg'], correctAnswer: 0, explanation: '30 : 2 = 15 dkg.' },
  { id: 'fe-q25', questionTypeBadge: 'Pénz', level: 1, question: 'A füzet a 4000 Ft-os tolltartó árának felébe kerül. Mennyibe kerül a füzet?', options: ['2000 Ft', '4000 Ft', '1000 Ft', '8000 Ft'], correctAnswer: 0, explanation: 'A fele: 4000 : 2 = 2000 Ft.' },
  { id: 'fe-q26', questionTypeBadge: 'Tömeg', level: 1, question: '1 kg = 1000 g. Hány gramm a fél kilogramm?', options: ['500 g', '50 g', '200 g', '5000 g'], correctAnswer: 0, explanation: '1000 : 2 = 500 g.' },
  { id: 'fe-q27', questionTypeBadge: '1 egész', figure: F27, level: 1, question: 'A pizza mind a 8 szelete színes. Mennyi ez?', options: ['8 nyolcad, vagyis 1 egész', '1 nyolcad', '8 egész', '4 nyolcad'], correctAnswer: 0, explanation: 'Mind a 8 nyolcad színes: 8 nyolcad = 1 egész pizza.' },
  { id: 'fe-q28', questionTypeBadge: 'Tört jelentése', level: 1, question: 'Mit jelent a 2 ötöd?', options: ['5 egyenlő részből 2 részt', '2 egyenlő részből 5 részt', '5 egyenlő részből 3 részt', '2 egészet és 5 részt'], correctAnswer: 0, explanation: 'Az „ötöd” megmondja, hogy 5 egyenlő részre vágtunk, a 2 pedig azt, hogy 2 részt veszünk.' },
  { id: 'fe-q29', questionTypeBadge: 'Relációs jel', level: 1, question: 'Melyik jel kerül a helyére? 1 harmad ☐ 1 hatod', options: ['>', '<', '='], correctAnswer: 0, explanation: 'Az 1 harmad 2 hatoddal egyenlő, ezért nagyobb 1 hatodnál.' },
  { id: 'fe-q30', questionTypeBadge: 'Maradék', level: 1, question: 'Az éhes kisegér az első nap megette a sajt felét. Hányad része maradt a sajtnak?', options: ['a fele (1 ketted)', '1 negyed', 'semmi', '2 ketted'], correctAnswer: 0, explanation: 'Ha az egész felét megette, a másik fele maradt meg: 1 ketted.' },

  // ======================= 2. SZINT (30) =======================
  { id: 'fe-q31', questionTypeBadge: 'Rács', figure: F31, level: 2, question: 'Az ábra 1 egészet ér. Hányad része kék?', options: ['1 negyed', '1 harmad', '3 negyed', '1 hatod'], correctAnswer: 0, explanation: '12 négyzetből 3 kék. A 12 négyzet 4 egyenlő részre osztható (3-3 négyzet), ebből 1 rész kék: 1 negyed.' },
  { id: 'fe-q32', questionTypeBadge: 'Rács', figure: F32, level: 2, question: 'Az ábra 1 egészet ér. Hányad része sárga?', options: ['3 negyed', '1 negyed', '2 harmad', '9 negyed'], correctAnswer: 0, explanation: '12 négyzetből 9 sárga, ez 4 egyenlő részből 3 rész: 3 negyed.' },
  { id: 'fe-q33', questionTypeBadge: 'Két lépés', level: 2, question: 'Mennyi 12-nek a 2 harmada?', options: ['8', '4', '18', '6'], correctAnswer: 0, explanation: '12 : 3 = 4 (1 harmad). 4 · 2 = 8 (2 harmad).' },
  { id: 'fe-q34', questionTypeBadge: 'Pénz', level: 2, question: 'A toll 300 Ft-nak a 4 ötödébe kerül. Mennyibe kerül?', options: ['240 Ft', '60 Ft', '375 Ft', '200 Ft'], correctAnswer: 0, explanation: '300 : 5 = 60 Ft. 60 · 4 = 240 Ft (Munkafüzet II. 68. o.).' },
  { id: 'fe-q35', questionTypeBadge: 'Pénz', level: 2, question: 'A könyv 4000 Ft-nak a 3 ötödébe kerül. Mennyibe kerül?', options: ['2400 Ft', '800 Ft', '1200 Ft', '3000 Ft'], correctAnswer: 0, explanation: '4000 : 5 = 800 Ft. 800 · 3 = 2400 Ft.' },
  { id: 'fe-q36', questionTypeBadge: 'Hosszúság', level: 2, question: 'Hány centiméter a fél méter és a negyed méter együtt?', options: ['75 cm', '50 cm', '25 cm', '30 cm'], correctAnswer: 0, explanation: 'Fél méter = 50 cm, negyed méter = 25 cm. 50 + 25 = 75 cm, ez a méter 3 negyede.' },
  { id: 'fe-q37', questionTypeBadge: 'Téglalap értéke', figure: F37, level: 2, question: 'Az egész téglalap értéke 2400. Mennyit ér a zöld rész?', options: ['600', '1200', '800', '400'], correctAnswer: 0, explanation: '4 egyenlő részből 1 zöld: 1 negyed. 2400 : 4 = 600 (Munkafüzet II. 78. o.).' },
  { id: 'fe-q38', questionTypeBadge: 'Téglalap értéke', figure: F38, level: 2, question: 'Az egész téglalap értéke 2400. Mennyit ér a zöld csík?', options: ['800', '1200', '600', '2400'], correctAnswer: 0, explanation: '3 egyenlő csíkból 1 zöld: 1 harmad. 2400 : 3 = 800.' },
  { id: 'fe-q39', questionTypeBadge: 'Relációs jel', level: 2, question: 'Melyik jel kerül a helyére? 2 harmad ☐ 2 negyed', options: ['>', '<', '='], correctAnswer: 0, explanation: 'Mindkettőből 2 részt veszünk. Egy harmad nagyobb, mint egy negyed, ezért 2 harmad > 2 negyed.' },
  { id: 'fe-q40', questionTypeBadge: 'Egyenlő törtek', level: 2, question: 'Melyik jel kerül a helyére? 3 negyed ☐ 6 nyolcad', options: ['=', '<', '>'], correctAnswer: 0, explanation: 'Minden negyedet kettévágva 2 nyolcadot kapunk. 3 negyed = 6 nyolcad.' },
  { id: 'fe-q41', questionTypeBadge: 'Sorba rendezés', level: 2, question: 'Melyik a helyes növekvő sorrend?', options: ['1 tized < 1 ötöd < 1 ketted < 1 egész', '1 egész < 1 ketted < 1 ötöd < 1 tized', '1 ötöd < 1 tized < 1 ketted < 1 egész', '1 ketted < 1 ötöd < 1 tized < 1 egész'], correctAnswer: 0, explanation: 'Minél több részre vágunk, annál kisebb egy rész. A legkisebb az 1 tized, a legnagyobb az 1 egész.' },
  { id: 'fe-q42', questionTypeBadge: 'Egynél nagyobb tört', figure: F42, level: 2, question: 'Hány egész és hány harmad a 7 harmad?', options: ['2 egész és 1 harmad', '7 egész és 3 harmad', '2 egész és 2 harmad', '3 egész és 1 harmad'], correctAnswer: 0, explanation: '3 harmad = 1 egész. 7 harmadban kétszer van 3 harmad (6 harmad = 2 egész), és marad 1 harmad.' },
  { id: 'fe-q43', questionTypeBadge: 'Egynél nagyobb tört', figure: F43, level: 2, question: 'Hány alma 3 fél alma?', options: ['1 és fél alma', '3 alma', '1 alma', '2 alma'], correctAnswer: 0, explanation: '2 fél alma = 1 egész alma. A harmadik fél almával együtt: 1 és fél alma.' },
  { id: 'fe-q44', questionTypeBadge: 'Idő', level: 2, question: 'Hány perc az 1 és fél óra?', options: ['90 perc', '150 perc', '65 perc', '30 perc'], correctAnswer: 0, explanation: '1 óra = 60 perc, fél óra = 30 perc. 60 + 30 = 90 perc.' },
  { id: 'fe-q45', questionTypeBadge: 'Pálya', figure: F45, level: 2, question: 'Hányadik méternél áll az 1 negyed km-es zászló?', options: ['250 m-nél', '4 m-nél', '400 m-nél', '25 m-nél'], correctAnswer: 0, explanation: '1 km = 1000 m. 1000 : 4 = 250 m (Munkafüzet II. 70. o., 15. feladat).' },
  { id: 'fe-q46', questionTypeBadge: 'Mértékváltás', level: 2, question: 'Hány méter a 3 tized km?', options: ['300 m', '30 m', '3 m', '700 m'], correctAnswer: 0, explanation: '1000 : 10 = 100 m (1 tized km). 100 · 3 = 300 m.' },
  { id: 'fe-q47', questionTypeBadge: 'Űrtartalom', figure: F47, level: 2, question: 'A 400 literes dézsa 6 tized része megtelt. Hány liter víz van benne?', options: ['240 liter', '60 liter', '160 liter', '600 liter'], correctAnswer: 0, explanation: '400 : 10 = 40 liter (1 tized). 40 · 6 = 240 liter.' },
  { id: 'fe-q48', questionTypeBadge: 'Mértékváltás', level: 2, question: '1 dm = 100 mm. Hány milliméter a 8 tized dm?', options: ['80 mm', '8 mm', '800 mm', '20 mm'], correctAnswer: 0, explanation: '100 : 10 = 10 mm (1 tized dm). 10 · 8 = 80 mm (Munkafüzet II. 70. o., 13. feladat).' },
  { id: 'fe-q49', questionTypeBadge: 'Mértékváltás', level: 2, question: '1 m = 1000 mm. Hány milliméter a 7 tized m?', options: ['700 mm', '70 mm', '7 mm', '7000 mm'], correctAnswer: 0, explanation: '1000 : 10 = 100 mm. 100 · 7 = 700 mm. (7 tized m = 7 dm = 70 cm = 700 mm.)' },
  { id: 'fe-q50', questionTypeBadge: 'Kakukktojás', level: 2, question: 'Melyik a kakukktojás?', options: ['2 harmad', '2 negyed', '5 tized', '4 nyolcad'], correctAnswer: 0, explanation: 'A 2 negyed, az 5 tized és a 4 nyolcad mind a fele. A 2 harmad több a felénél, ő a kakukktojás.' },
  { id: 'fe-q51', questionTypeBadge: 'Pizza ára', level: 2, question: 'Az egész pizza 2400 Ft. Mennyibe kerül 2 hatod szelet?', options: ['800 Ft', '400 Ft', '1200 Ft', '4800 Ft'], correctAnswer: 0, explanation: '2400 : 6 = 400 Ft egy hatod szelet. 400 · 2 = 800 Ft.' },
  { id: 'fe-q52', questionTypeBadge: 'Céltábla', figure: F52, level: 2, question: 'Janka 10-szer lőtt, ebből 8 lövés talált. A lövések hányad részével ért el találatot?', options: ['8 tized', '2 tized', '1 tized', '8 egész'], correctAnswer: 0, explanation: '10 lövésből 8: a lövések 8 tizede talált (Munkafüzet II. 67. o.).' },
  { id: 'fe-q53', questionTypeBadge: 'Parkoló', figure: F53, level: 2, question: 'A parkolóban 12 autó áll: 3 kék, 3 piros és 6 zöld. Melyik állítás igaz?', options: ['Az autók 1 kettede zöld.', 'Az autók 1 harmada kék.', 'Az autók 1 negyede zöld.', 'Az autók 1 harmada piros.'], correctAnswer: 0, explanation: '6 zöld a 12 autó fele: 1 ketted. A kék és a piros autók 1-1 negyedet tesznek ki (12 : 4 = 3).' },
  { id: 'fe-q54', questionTypeBadge: 'Darab', level: 2, question: 'Palkó 60 autójának 1 hatoda sárga. Hány sárga autója van?', options: ['10', '6', '54', '16'], correctAnswer: 0, explanation: '60 : 6 = 10 sárga autó.' },
  { id: 'fe-q55', questionTypeBadge: 'Két lépés', level: 2, question: 'Mennyi 18-nak az 5 hatoda?', options: ['15', '3', '30', '12'], correctAnswer: 0, explanation: '18 : 6 = 3 (1 hatod). 3 · 5 = 15 (5 hatod).' },
  { id: 'fe-q56', questionTypeBadge: 'Maradék', figure: F56, level: 2, question: 'A pizza 2 harmadát megettük. Hányad része maradt a pizzának?', options: ['1 harmad', '2 harmad', '1 ketted', '3 harmad'], correctAnswer: 0, explanation: 'Az egész pizza 3 harmad. 3 harmad − 2 harmad = 1 harmad maradt.' },
  { id: 'fe-q57', questionTypeBadge: '1 egész', level: 2, question: 'Melyik jel kerül a helyére? 10 tized ☐ 1 egész', options: ['=', '<', '>'], correctAnswer: 0, explanation: 'Mind a 10 tized részt vesszük: ez az egész. 10 tized = 1 egész.' },
  { id: 'fe-q58', questionTypeBadge: 'Pálya', figure: F58, level: 2, question: 'Melyik zászló van messzebb a RAJT-tól: a 3 ötöd km-es vagy a 3 negyed km-es?', options: ['a 3 negyed km-es (750 m)', 'a 3 ötöd km-es (600 m)', 'a 3 ötöd km-es (750 m)', 'egyforma messze vannak'], correctAnswer: 0, explanation: '1000 : 5 · 3 = 600 m és 1000 : 4 · 3 = 750 m. Mindkettő 3 rész, de a negyed nagyobb rész, mint az ötöd.' },
  { id: 'fe-q59', questionTypeBadge: 'Hosszúság', level: 2, question: 'A nyúl a 2 m-es táv 4 ötödét ugrotta meg. Hány centimétert ugrott?', options: ['160 cm', '40 cm', '250 cm', '80 cm'], correctAnswer: 0, explanation: '2 m = 200 cm. 200 : 5 = 40 cm. 40 · 4 = 160 cm.' },
  { id: 'fe-q60', questionTypeBadge: 'Társasjáték', level: 2, question: 'A társasjátékban a kék szín az 1200-at jelenti. Mennyi a kék „3 negyed” mező értéke?', options: ['900', '300', '400', '1600'], correctAnswer: 0, explanation: '1200 : 4 = 300 (1 negyed). 300 · 3 = 900 (3 negyed).' },

  // ======================= 3. SZINT (30) =======================
  { id: 'fe-q61', questionTypeBadge: 'Szöveges feladat', level: 3, question: 'A szülinapra 30 lufit vettek. A lufik fele piros, harmada kék, a többi sárga. Hány sárga lufi van?', options: ['5', '10', '15', '25'], correctAnswer: 0, explanation: 'Piros: 30 : 2 = 15. Kék: 30 : 3 = 10. Sárga: 30 − 15 − 10 = 5.' },
  { id: 'fe-q62', questionTypeBadge: 'Maradék', figure: F62, level: 3, question: 'A nomád táborban 180 diák volt. A fele kék sátrakban lakott, a maradék gyerekek harmada zöld sátrakban. Hányan laktak zöld sátrakban?', options: ['30', '60', '90', '45'], correctAnswer: 0, explanation: 'Kék: 180 : 2 = 90. Maradék: 180 − 90 = 90. Zöld: 90 : 3 = 30. (Nem a 180 harmada!)' },
  { id: 'fe-q63', questionTypeBadge: 'Szöveges feladat', level: 3, question: 'Ugyanebben a táborban hányan laktak kék vagy zöld sátrakban összesen?', options: ['120', '90', '150', '60'], correctAnswer: 0, explanation: 'Kék sátor 90, zöld sátor 30 diák: 90 + 30 = 120. (A többi 60 diák jurtában lakott.)' },
  { id: 'fe-q64', questionTypeBadge: 'Űrtartalom', figure: F64, level: 3, question: 'A 15 liter szörp 1 harmada málna, a maradék fele eper. Hány liter eperszörp van?', options: ['5 liter', '10 liter', '7 liter', '3 liter'], correctAnswer: 0, explanation: 'Málna: 15 : 3 = 5 l. Maradék: 15 − 5 = 10 l. Eper: 10 : 2 = 5 l.' },
  { id: 'fe-q65', questionTypeBadge: 'Utazás', level: 3, question: 'Mona családja a 684 km-re lévő Münchenbe utazik. Az út 1 negyedénél tartanak. Hány kilométert tettek már meg?', options: ['171 km-t', '342 km-t', '168 km-t', '513 km-t'], correctAnswer: 0, explanation: '684 : 4 = 171 km. (A 342 km az út fele lenne, az 513 km a 3 negyede.)' },
  { id: 'fe-q66', questionTypeBadge: 'Ugróverseny', figure: F66, level: 3, question: 'A 2 m-es pályán a mókus a táv 3 negyedét, a béka a 4 tizedét ugrotta meg. Hány centiméterrel ugrott többet a mókus?', options: ['70 cm-rel', '150 cm-rel', '80 cm-rel', '1 cm-rel'], correctAnswer: 0, explanation: 'Mókus: 200 : 4 · 3 = 150 cm. Béka: 200 : 10 · 4 = 80 cm. 150 − 80 = 70 cm.' },
  { id: 'fe-q67', questionTypeBadge: 'Pizza ára', level: 3, question: 'Az egész pizza 2400 Ft. Kitti egy 1 harmad, Dóra egy 1 negyed szeletet vett. Mennyit fizettek együtt?', options: ['1400 Ft', '1200 Ft', '700 Ft', '200 Ft'], correctAnswer: 0, explanation: 'Kitti: 2400 : 3 = 800 Ft. Dóra: 2400 : 4 = 600 Ft. Együtt: 800 + 600 = 1400 Ft.' },
  { id: 'fe-q68', questionTypeBadge: 'Tömeg', level: 3, question: 'Az 1 kg lisztnek az 5 tizedét felhasználták. Hány dekagramm liszt maradt? (1 kg = 100 dkg)', options: ['50 dkg', '500 dkg', '5 dkg', '95 dkg'], correctAnswer: 0, explanation: 'Felhasználták: 100 : 10 · 5 = 50 dkg. Maradt: 100 − 50 = 50 dkg (= 500 g).' },
  { id: 'fe-q69', questionTypeBadge: 'Tömeg', level: 3, question: 'A 30 dkg vajnak a 2 harmada maradt meg. Hány dekagramm vaj maradt?', options: ['20 dkg', '10 dkg', '15 dkg', '45 dkg'], correctAnswer: 0, explanation: '30 : 3 = 10 dkg (1 harmad). 10 · 2 = 20 dkg (2 harmad).' },
  { id: 'fe-q70', questionTypeBadge: 'Űrtartalom', level: 3, question: 'A 400 literes dézsa 6 tized része megtelt. Hányad része üres még, és ez hány liter?', options: ['4 tized, 160 liter', '6 tized, 240 liter', '4 tized, 240 liter', '1 tized, 40 liter'], correctAnswer: 0, explanation: '10 tized − 6 tized = 4 tized üres. 400 : 10 · 4 = 160 liter.' },
  { id: 'fe-q71', questionTypeBadge: 'Recept', level: 3, question: 'A tálban 50 dkg keksz, 25 dkg margarin és 25 dkg cukor van. Hány dkg az összes, és a cukor hányad része ennek?', options: ['100 dkg, 1 negyed', '100 dkg, 1 ketted', '75 dkg, 1 harmad', '100 dkg, 1 harmad'], correctAnswer: 0, explanation: '50 + 25 + 25 = 100 dkg. A 25 dkg a 100 dkg negyede (100 : 4 = 25).' },
  { id: 'fe-q72', questionTypeBadge: 'Társasjáték', figure: F72, level: 3, question: 'A zöld szín a 6000-et jelenti. Mennyi a zöld „1 század” mező értéke?', options: ['60', '600', '6', '100'], correctAnswer: 0, explanation: 'Század rész: 100 egyenlő részre osztunk. 6000 : 100 = 60.' },
  { id: 'fe-q73', questionTypeBadge: 'Társasjáték', figure: F73, level: 3, question: 'A narancs szín a 3200-at jelenti. Mennyi a narancs „1 tized” mező értéke?', options: ['320', '32', '3190', '310'], correctAnswer: 0, explanation: '3200 : 10 = 320.' },
  { id: 'fe-q74', questionTypeBadge: 'Társasjáték', figure: F74, level: 3, question: 'A piros szín a 2400-at jelenti. Mennyi a piros „3 negyed” mező értéke?', options: ['1800', '600', '3200', '800'], correctAnswer: 0, explanation: '2400 : 4 = 600 (1 negyed). 600 · 3 = 1800 (3 negyed).' },
  { id: 'fe-q75', questionTypeBadge: 'Szöveges feladat', figure: F75, level: 3, question: 'Palkó 60 autójának 1 negyede zöld, 1 harmada piros. Hány autó zöld vagy piros?', options: ['35', '15', '20', '7'], correctAnswer: 0, explanation: 'Zöld: 60 : 4 = 15. Piros: 60 : 3 = 20. Együtt: 15 + 20 = 35 autó.' },
  { id: 'fe-q76', questionTypeBadge: 'Pénz', level: 3, question: 'Melyik állítás igaz 4000 Ft-nak a 2 tizedére és az 1 ötödére?', options: ['Ugyanannyiba kerülnek: 800 Ft.', 'A 2 tizede drágább.', 'Az 1 ötöde drágább.', 'Ugyanannyiba kerülnek: 400 Ft.'], correctAnswer: 0, explanation: '4000 : 10 · 2 = 800 Ft és 4000 : 5 = 800 Ft. A 2 tized és az 1 ötöd egyenlő.' },
  { id: 'fe-q77', questionTypeBadge: 'Összehasonlítás', level: 3, question: 'Melyik a nagyobb: 12-nek a 3 negyede vagy 12-nek a 2 harmada?', options: ['12-nek a 3 negyede (9)', '12-nek a 2 harmada (8)', 'egyenlők (8)', '12-nek a 2 harmada (9)'], correctAnswer: 0, explanation: '12 : 4 · 3 = 9 és 12 : 3 · 2 = 8. A 9 a nagyobb, tehát 3 negyed > 2 harmad.' },
  { id: 'fe-q78', questionTypeBadge: 'Kisegér', figure: F78, level: 3, question: 'A kisegér három nap alatt mindig a megmaradt sajt felét ette meg, így 1 nyolcad maradt. Hányad részét ette meg összesen?', options: ['7 nyolcad', '1 nyolcad', '3 nyolcad', '6 nyolcad'], correctAnswer: 0, explanation: 'Az egész 8 nyolcad. 8 nyolcad − 1 nyolcad = 7 nyolcad részt evett meg.' },
  { id: 'fe-q79', questionTypeBadge: 'Űrtartalom', level: 3, question: 'Bence 7 negyed liter limonádét ivott. Hány milliliter ez? (1 l = 1000 ml)', options: ['1750 ml', '700 ml', '1075 ml', '1250 ml'], correctAnswer: 0, explanation: '1000 : 4 = 250 ml (negyed liter). 250 · 7 = 1750 ml, vagyis 1 liter és 3 negyed liter.' },
  { id: 'fe-q80', questionTypeBadge: 'Egynél nagyobb tört', figure: F80, level: 3, question: 'Anya 2 pizzát 4-4 szeletre vágott. 5 szelet maradt meg. Hány negyed pizza maradt, és ez több vagy kevesebb 1 egésznél?', options: ['5 negyed, több mint 1 egész', '5 negyed, kevesebb, mint 1 egész', '3 negyed, kevesebb, mint 1 egész', '5 nyolcad, kevesebb, mint 1 egész'], correctAnswer: 0, explanation: 'Minden szelet 1 negyed pizza, 5 szelet 5 negyed. 4 negyed = 1 egész, így 5 negyed = 1 egész és 1 negyed.' },
  { id: 'fe-q81', questionTypeBadge: 'Idő', figure: F81, level: 3, question: 'A kiránduláson a buszút 3 negyed óráig, a séta 1 és negyed óráig tartott. Hány percig tartott a kettő együtt?', options: ['120 perc', '90 perc', '100 perc', '60 perc'], correctAnswer: 0, explanation: '3 negyed óra = 45 perc, 1 és negyed óra = 75 perc. 45 + 75 = 120 perc = 2 óra.' },
  { id: 'fe-q82', questionTypeBadge: 'Pénz', level: 3, question: 'Egy 1200 Ft-os könyv árának 3 negyedét Manó fizette, a többit Mona. Mennyit fizetett Mona?', options: ['300 Ft', '900 Ft', '400 Ft', '600 Ft'], correctAnswer: 0, explanation: 'Manó: 1200 : 4 · 3 = 900 Ft. Mona: 1200 − 900 = 300 Ft (ez 1 negyed).' },
  { id: 'fe-q83', questionTypeBadge: 'Maradék', figure: F83, level: 3, question: 'A 60 km-es kerékpártúrából az első nap az út 1 harmadát tették meg, a második nap a maradék felét. Hány km maradt a harmadik napra?', options: ['20 km', '10 km', '30 km', '40 km'], correctAnswer: 0, explanation: '1. nap: 60 : 3 = 20 km. Maradék: 60 − 20 = 40 km. 2. nap: 40 : 2 = 20 km. Maradt: 40 − 20 = 20 km.' },
  { id: 'fe-q84', questionTypeBadge: 'Igaz vagy hamis', level: 3, question: 'Melyik állítás HAMIS?', options: ['1 hatod > 1 ötöd', '2 negyed = 1 ketted', '3 harmad = 1 egész', '4 ötöd > 3 ötöd'], correctAnswer: 0, explanation: 'Az 1 hatod kisebb, mint 1 ötöd, mert 6 részre vágva kisebb egy rész. A többi állítás igaz.' },
  { id: 'fe-q85', questionTypeBadge: 'Diagram', figure: F85, level: 3, question: 'Egy virágárus 3000 szál virágot adott el, ebből 600 szál gerbera volt. Hányad része az összesnek a gerbera?', options: ['1 ötöd', '1 hatod', '1 harmad', '6 tized'], correctAnswer: 0, explanation: '3000 : 5 = 600, tehát a 600 a 3000 ötöd része: 1 ötöd.' },
  { id: 'fe-q86', questionTypeBadge: 'Mérés', figure: F86, level: 3, question: 'A kék szakasz 12 cm hosszú. Milyen hosszú a tizedrésze?', options: ['12 mm', '12 cm', '1 cm', '120 mm'], correctAnswer: 0, explanation: '12 cm = 120 mm. 120 : 10 = 12 mm, vagyis 1 cm 2 mm.' },
  { id: 'fe-q87', questionTypeBadge: 'Csokoládé', level: 3, question: 'A 10 kockás csokoládé 3 tizedét Zsófi, 2 tizedét az öccse ette meg. Hány kocka maradt?', options: ['5', '7', '8', '2'], correctAnswer: 0, explanation: 'Megettek 3 + 2 = 5 kockát (5 tized). 10 − 5 = 5 kocka maradt, ez a csoki fele.' },
  { id: 'fe-q88', questionTypeBadge: 'Összehasonlítás', level: 3, question: 'Melyik a leghosszabb: a méter 3 negyede, a méter 4 ötöde vagy a méter 7 tizede?', options: ['a méter 4 ötöde (80 cm)', 'a méter 3 negyede (75 cm)', 'a méter 7 tizede (70 cm)', 'a méter 3 negyede (80 cm)'], correctAnswer: 0, explanation: '100 : 4 · 3 = 75 cm, 100 : 5 · 4 = 80 cm, 100 : 10 · 7 = 70 cm. A leghosszabb a 4 ötöd.' },
  { id: 'fe-q89', questionTypeBadge: 'Szöveges feladat', level: 3, question: 'Egy 24 fős osztály 3 nyolcada fiú. Hány lány jár az osztályba?', options: ['15', '9', '21', '16'], correctAnswer: 0, explanation: 'Fiúk: 24 : 8 · 3 = 9. Lányok: 24 − 9 = 15.' },
  { id: 'fe-q90', questionTypeBadge: 'Pálya', level: 3, question: 'Az 1 km-es pályán a ló a 3 tized km-nél jár. Hány métert kell még megtennie a 4 ötöd km-es zászlóig?', options: ['500 m-t', '300 m-t', '800 m-t', '100 m-t'], correctAnswer: 0, explanation: '3 tized km = 300 m, 4 ötöd km = 800 m. 800 − 300 = 500 m.' }
];

export const FractionsExamQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="tortszamok"
      topicId="g4-frac-tudasproba-quiz"
      subtopicId="gyakorlas-tudasproba"
      title="6. Gyakorlás, tudáspróba – Kvíz"
      subtitle="90 feladat 3 szinten a teljes fejezetből: törtrészek neve, egynél kisebb és nagyobb törtek, összehasonlítás, törtrész kiszámítása, szöveges feladatok."
      badge="4. OSZTÁLY • VIII. A TÖRTSZÁMOK • TUDÁSPRÓBA"
      questions={FRACTIONS_EXAM_QUESTIONS}
      cheatSheets={[
        {
          title: 'A törtrész neve',
          items: [
            '2 rész: fél (1 ketted) • 3: harmad • 4: negyed • 5: ötöd',
            '6: hatod • 8: nyolcad • 10: tized • 100: század',
            '3 negyed: 4 egyenlő részből 3 rész',
            'Minden rész együtt 1 egész: 4 negyed = 1 egész; 5 negyed = 1 egész és 1 negyed'
          ]
        },
        {
          title: 'Összehasonlítás',
          items: [
            'Ugyanolyan részek: több rész = több (1 negyed < 3 negyed)',
            'Ugyanannyi rész: több részre vágva kisebb egy rész (1 harmad > 1 negyed)',
            'fele = 1 ketted = 2 negyed = 4 nyolcad = 5 tized',
            'Ha nem látod: számold ki mindkét törtrészt!'
          ]
        },
        {
          title: 'Törtrész kiszámítása',
          items: [
            '1. osztás, 2. szorzás: 12-nek a 3 negyede = 12 : 4 · 3 = 9',
            '1 m = 100 cm • 1 km = 1000 m • 1 óra = 60 perc',
            '1 kg = 100 dkg = 1000 g • 1 l = 1000 ml',
            '„a maradék fele”: előbb a maradékot számold ki!'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <FractionsExamMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <FractionsExamSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default FractionsExamQuiz;
