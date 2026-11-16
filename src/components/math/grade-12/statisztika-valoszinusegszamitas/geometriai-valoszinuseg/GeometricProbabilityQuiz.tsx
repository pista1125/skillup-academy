import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { GeometricProbabilityMatcher } from './GeometricProbabilityMatcher';
import { GeometricProbabilitySorter } from './GeometricProbabilitySorter';
import { Target, RightAngleMark } from './GeometricProbabilityFigures';
import { QFig, T, F_RED, F_AMBER, F_BLUE, F_GREEN, F_PURPLE, C_EDGE, C_BLUE, C_RED, C_GREEN, C_PURPLE, C_AMBER } from './probKit';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const FIG_TARGET = (
  <QFig w={240} h={170}>
    <Target cx={85} cy={85} radii={[15, 45, 75]} fills={[F_RED, F_AMBER, F_BLUE]} />
    <line x1={85} y1={85} x2={160} y2={85} stroke={C_EDGE} strokeDasharray="3 2" />
    <T x={198} y={40} t="belső kör: d = 10" s={9.5} />
    <T x={198} y={60} t="gyűrűk: 10 cm" s={9.5} />
    <T x={198} y={80} t="szélesek" s={9.5} />
  </QFig>
);

const FIG_BOARD_RECT = (
  <QFig w={240} h={160}>
    <rect x={60} y={20} width={120} height={120} fill="#ffffff" stroke={C_EDGE} strokeWidth={1.6} />
    <rect x={84} y={44} width={48} height={60} fill={F_GREEN} stroke={C_GREEN} strokeWidth={1.4} />
    <T x={120} y={152} t="10 cm" s={10} b />
    <T x={48} y={80} t="10 cm" s={10} b a="end" />
    <T x={108} y={114} t="4 cm" s={9.5} c={C_GREEN} b />
    <T x={146} y={74} t="5 cm" s={9.5} c={C_GREEN} b />
  </QFig>
);

const rodFig = (marks: { at: number; t: string; c: string }[], shade?: [number, number][], note?: string) => {
  const X = (cm: number) => 20 + cm * 2;
  return (
    <QFig w={240} h={90}>
      <rect x={X(0)} y={36} width={200} height={12} fill="#ffffff" stroke={C_EDGE} />
      {(shade ?? []).map(([a, b], i) => (
        <rect key={i} x={X(a)} y={36} width={X(b) - X(a)} height={12} fill={F_RED} stroke={C_EDGE} strokeWidth={0.6} />
      ))}
      {Array.from({ length: 11 }, (_, i) => (
        <T key={i} x={X(i * 10)} y={28} t={String(i * 10)} s={8} c="#475569" />
      ))}
      {marks.map((m, i) => (
        <g key={i}>
          <line x1={X(m.at)} y1={30} x2={X(m.at)} y2={56} stroke={m.c} strokeWidth={1.6} />
          <T x={X(m.at)} y={64} t={m.t} s={9} c={m.c} b />
        </g>
      ))}
      {note && <T x={120} y={82} t={note} s={9} c="#475569" />}
    </QFig>
  );
};
const FIG_ROD_20 = rodFig([{ at: 20, t: '20 cm-es pont', c: C_RED }], undefined, 'a hangya helye véletlenszerű');
const FIG_ROD_BROKEN = rodFig(
  [{ at: 42, t: 'törés: 42 cm', c: C_PURPLE }],
  [
    [0, 10],
    [20, 30],
    [40, 50],
    [60, 70],
    [80, 90]
  ],
  '0–10 cm piros, majd 10 cm-enként felváltva'
);

const FIG_SQUARE_CIRCLE = (
  <QFig w={240} h={160}>
    <rect x={50} y={10} width={140} height={140} fill="#ffffff" stroke={C_EDGE} strokeWidth={1.6} />
    <circle cx={120} cy={80} r={70} fill={F_BLUE} stroke={C_BLUE} strokeWidth={1.4} />
    <T x={120} y={156} t="20 cm" s={10} b />
  </QFig>
);

const FIG_PAPER = (
  <QFig w={240} h={160}>
    <rect x={30} y={20} width={180} height={120} fill={F_GREEN} stroke={C_EDGE} strokeWidth={1.5} />
    <path d="M 30 20 L 90 20 A 60 60 0 0 1 30 80 Z" fill="#ffffff" stroke={C_RED} />
    <path d="M 210 20 L 210 80 A 60 60 0 0 1 150 20 Z" fill="#ffffff" stroke={C_RED} />
    <path d="M 30 140 L 30 80 A 60 60 0 0 1 90 140 Z" fill="#ffffff" stroke={C_RED} />
    <path d="M 210 140 L 150 140 A 60 60 0 0 1 210 80 Z" fill="#ffffff" stroke={C_RED} />
    <T x={120} y={12} t="30 cm" s={10} b />
    <T x={22} y={110} t="20" s={10} b a="end" />
    <T x={50} y={34} t="10" s={9} c={C_RED} />
    <T x={120} y={80} t="?" s={16} b c={C_GREEN} />
  </QFig>
);

const FIG_DARTS = (() => {
  const cx = 120;
  const cy = 80;
  const R = 70;
  return (
    <QFig w={240} h={160}>
      <circle cx={cx} cy={cy} r={R} fill={F_BLUE} stroke={C_EDGE} strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={R / 2} fill={F_AMBER} stroke={C_EDGE} strokeWidth={1.5} />
      <line x1={cx - R} y1={cy} x2={cx + R} y2={cy} stroke={C_EDGE} strokeWidth={1.4} />
      <line x1={cx} y1={cy - R} x2={cx} y2={cy + R} stroke={C_EDGE} strokeWidth={1.4} />
      <T x={cx - 42} y={cy - 42} t="10" s={11} b />
      <T x={cx + 42} y={cy - 42} t="20" s={11} b />
      <T x={cx - 42} y={cy + 42} t="20" s={11} b />
      <T x={cx + 42} y={cy + 42} t="10" s={11} b />
      <T x={cx - 14} y={cy - 14} t="50" s={10} b />
      <T x={cx + 14} y={cy - 14} t="40" s={10} b />
      <T x={cx - 14} y={cy + 14} t="40" s={10} b />
      <T x={cx + 14} y={cy + 14} t="50" s={10} b />
    </QFig>
  );
})();

const FIG_MONITOR = (
  <QFig w={240} h={150}>
    <rect x={20} y={16} width={200} height={113} fill="#ffffff" stroke={C_EDGE} strokeWidth={1.8} rx={3} />
    <circle cx={120} cy={72.5} r={46.4} fill={F_PURPLE} stroke={C_PURPLE} strokeWidth={1.4} />
    <T x={120} y={10} t="34,5 cm" s={10} b />
    <T x={14} y={72} t="19,5" s={10} b a="end" />
    <line x1={120} y1={72.5} x2={166.4} y2={72.5} stroke={C_PURPLE} strokeDasharray="3 2" />
    <T x={143} y={64} t="8 cm" s={9.5} c={C_PURPLE} b />
    <T x={120} y={142} t="kör a monitor közepén" s={9.5} c="#475569" />
  </QFig>
);

const FIG_TILE = (
  <QFig w={240} h={160}>
    <rect x={40} y={10} width={140} height={140} fill="#94a3b8" />
    <rect x={44} y={14} width={132} height={132} fill="#f1f5f9" stroke={C_EDGE} />
    <circle cx={70} cy={60} r={9} fill="#fde68a" stroke={C_AMBER} strokeWidth={1.4} />
    <T x={110} y={84} t="20 cm" s={11} b />
    <T x={210} y={40} t="fuga:" s={9.5} />
    <T x={210} y={54} t="0,5 cm" s={9.5} b />
    <T x={210} y={84} t="érme:" s={9.5} />
    <T x={210} y={98} t="d = 2,8 cm" s={9.5} b c={C_AMBER} />
  </QFig>
);

const FIG_POT = (() => {
  const s = 7;
  const cx = 100;
  const yb = 140;
  const m = Math.sqrt(91);
  const yt = yb - m * s;
  const A: [number, number] = [cx - 9 * s, yb];
  const C: [number, number] = [cx + 6 * s, yt];
  const foot: [number, number] = [C[0], yb];
  return (
    <QFig w={240} h={160}>
      <polygon points={`${cx - 9 * s},${yb} ${cx + 9 * s},${yb} ${cx + 6 * s},${yt} ${cx - 6 * s},${yt}`} fill="#fef3c7" stroke={C_EDGE} strokeWidth={1.6} />
      <line x1={cx - (6 + 9 / m) * s} y1={yt + 3 * s} x2={cx + (6 + 9 / m) * s} y2={yt + 3 * s} stroke={C_AMBER} strokeWidth={1.4} strokeDasharray="4 3" />
      <line x1={C[0]} y1={C[1]} x2={foot[0]} y2={foot[1]} stroke={C_PURPLE} strokeDasharray="3 2" />
      <RightAngleMark v={foot} p1={C} p2={A} r={9} c={C_PURPLE} />
      <T x={cx} y={yb + 12} t="d = 18 cm" s={9.5} b c={C_BLUE} />
      <T x={cx} y={yt - 8} t="d = 12 cm" s={9.5} b c={C_BLUE} />
      <T x={cx + 9 * s + 4} y={(yb + yt) / 2} t="10" s={9.5} b c={C_RED} a="start" />
      <T x={cx - 6 * s - 6} y={yt + 1.5 * s} t="3 cm" s={9.5} b c="#92400e" a="end" />
      <T x={205} y={70} t="P = ?" s={12} b c={C_PURPLE} />
    </QFig>
  );
})();

const FIG_TARGET16 = (
  <QFig w={240} h={160}>
    <Target cx={90} cy={80} radii={[30, 42.4, 52, 60].map((r) => r * 1.15)} fills={[F_RED, F_AMBER, F_GREEN, F_BLUE]} />
    <line x1={90} y1={80} x2={90 + 69} y2={80} stroke={C_EDGE} strokeDasharray="3 2" />
    <T x={130} y={72} t="16 cm" s={9.5} b />
    <T x={200} y={50} t="4 tartomány," s={9.5} />
    <T x={200} y={64} t="egyenlő" s={9.5} />
    <T x={200} y={78} t="valószínűség" s={9.5} />
    <T x={200} y={100} t="r₁, r₂, r₃ = ?" s={10} b c={C_PURPLE} />
  </QFig>
);

const GEOMETRIC_PROBABILITY_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- 1. szint ----------------------------
  {
    id: 'gp-q1',
    questionTypeBadge: 'Fogalom',
    level: 1,
    question: 'Hogyan számoljuk ki a geometriai valószínűséget?',
    options: ['az eseményhez tartozó mérték / a teljes eseménytér ugyanilyen mértéke', 'a kedvező pontok száma / az összes pont száma', 'a teljes mérték / az eseményhez tartozó mérték', 'a kedvező terület / a kedvezőtlen terület'],
    correctAnswer: 0,
    explanation: 'Végtelen sok pont van, ezért darabszámok helyett mértékeket (hossz, terület, térfogat, szög) osztunk: kedvező mérték / teljes mérték.'
  },
  {
    id: 'gp-q2',
    questionTypeBadge: 'Szerencsekerék',
    level: 1,
    question: 'Egy szerencsekeréken a nyerő körcikk középponti szöge 90°. Mennyi a nyerés valószínűsége?',
    options: ['1/4', '1/3', '1/2', '1/90'],
    correctAnswer: 0,
    explanation: 'P = 90° / 360° = 1/4.'
  },
  {
    id: 'gp-q3',
    questionTypeBadge: 'Szerencsekerék',
    level: 1,
    question: 'Egy szerencsekeréken a piros körcikk középponti szöge 120°. Mennyi a valószínűsége, hogy a mutató pirosnál áll meg?',
    options: ['1/3', '1/4', '1/120', '2/3'],
    correctAnswer: 0,
    explanation: 'P = 120° / 360° = 1/3.'
  },
  {
    id: 'gp-q4',
    questionTypeBadge: 'Hosszúság',
    level: 1,
    question: 'Egy hangya véletlenszerű helyen van egy 1 m hosszú rúdon. Mennyi a valószínűsége, hogy a 0 cm-es végtől legfeljebb 30 cm-re van?',
    options: ['0,3', '0,7', '0,03', '0,09'],
    correctAnswer: 0,
    explanation: 'Kedvező szakasz: 30 cm, teljes: 100 cm. P = 30/100 = 0,3.'
  },
  {
    id: 'gp-q5',
    questionTypeBadge: 'Céltábla',
    figure: FIG_TARGET,
    level: 1,
    question: 'A céltábla belső körének átmérője 10 cm, a két körgyűrű 10-10 cm széles. Mennyi a valószínűsége, hogy egy táblát eltaláló lövés a belső körbe megy?',
    options: ['1/25', '1/5', '1/3', '1/9'],
    correctAnswer: 0,
    explanation: 'Sugarak: 5, 15, 25 cm. P = 5²π / 25²π = 25/625 = 1/25. (1/5 a sugarak aránya – a területek a négyzetükkel arányosak.)'
  },
  {
    id: 'gp-q6',
    questionTypeBadge: 'Terület',
    figure: FIG_BOARD_RECT,
    level: 1,
    question: 'Egy 10 cm × 10 cm-es négyzetben van egy 4 cm × 5 cm-es zöld téglalap. Egy véletlen pont a négyzetbe esik. Mennyi a valószínűsége, hogy a zöld részbe esik?',
    options: ['0,2', '0,09', '0,4', '0,45'],
    correctAnswer: 0,
    explanation: 'P = 20 cm² / 100 cm² = 0,2.'
  },
  {
    id: 'gp-q7',
    questionTypeBadge: 'Hosszúság',
    level: 1,
    question: 'A hangya véletlenszerű helyen van az 1 m-es rúdon. Mennyi a valószínűsége, hogy közelebb van a 0-val jelölt végéhez, mint a 100-zal jelölthöz?',
    options: ['1/2', '1/4', '1/3', '1'],
    correctAnswer: 0,
    explanation: 'A két végtől egyenlő távolságra a 50 cm-es pont van; a kedvező rész 0–50 cm. P = 50/100 = 1/2.'
  },
  {
    id: 'gp-q8',
    questionTypeBadge: 'Szerencsekerék',
    level: 1,
    question: 'Egy szerencsekerék egyik körcikkének középponti szöge 60°. Mennyi a valószínűsége, hogy a mutató NEM ebben a körcikkben áll meg?',
    options: ['5/6', '1/6', '1/3', '2/3'],
    correctAnswer: 0,
    explanation: 'P(ebben) = 60°/360° = 1/6, a komplementer: 1 − 1/6 = 5/6.'
  },
  {
    id: 'gp-q9',
    questionTypeBadge: 'Kör',
    level: 1,
    question: 'Egy körlapon véletlenszerűen választunk egy pontot. Mennyi a valószínűsége, hogy közelebb van a kör középpontjához, mint a körvonalhoz?',
    options: ['1/4', '1/2', '1/8', 'π/4'],
    correctAnswer: 0,
    explanation: 'A kedvező pontok az R/2 sugarú körlapon vannak: (R/2)²π / R²π = 1/4.'
  },
  {
    id: 'gp-q10',
    questionTypeBadge: 'Fogalom',
    level: 1,
    question: 'Miért nem használható a céltáblás feladatnál a „kedvező / összes elemi esemény” képlet?',
    options: ['mert végtelen sok elemi esemény (pont) van', 'mert a lövések nem véletlenszerűek', 'mert a körgyűrűk nem egyforma szélesek', 'mert a valószínűség nagyobb lenne 1-nél'],
    correctAnswer: 0,
    explanation: 'A céltábla minden pontja egy elemi esemény, ezekből végtelen sok van – végtelent végtelennel nem tudunk osztani. Ezért területeket osztunk.'
  },
  // ---------------------------- 2. szint ----------------------------
  {
    id: 'gp-q11',
    questionTypeBadge: 'Céltábla',
    figure: FIG_TARGET,
    level: 2,
    question: 'Ugyanezen a céltáblán (sugarak 5, 15, 25 cm) mennyi a valószínűsége, hogy a lövés a belső körgyűrűbe megy?',
    options: ['8/25', '9/25', '1/3', '2/5'],
    correctAnswer: 0,
    explanation: 'P = (15² − 5²)π / 25²π = (225 − 25)/625 = 200/625 = 8/25. (A 9/25 = 15²/25² a teljes 15 cm sugarú körlap.)'
  },
  {
    id: 'gp-q12',
    questionTypeBadge: 'Céltábla',
    figure: FIG_TARGET,
    level: 2,
    question: 'Ugyanezen a céltáblán mennyi a valószínűsége, hogy a lövés a külső körgyűrűbe megy?',
    options: ['16/25', '2/5', '9/25', '4/5'],
    correctAnswer: 0,
    explanation: 'P = (25² − 15²)/25² = 400/625 = 16/25; vagy 1 − (1/25 + 8/25) = 16/25.'
  },
  {
    id: 'gp-q13',
    questionTypeBadge: 'Hosszúság',
    level: 2,
    question: 'A hangya véletlenszerű helyen van az 1 m-es rúdon. Mennyi a valószínűsége, hogy közelebb van a rúd középpontjához, mint valamelyik végéhez?',
    options: ['1/2', '1/4', '1/3', '3/4'],
    correctAnswer: 0,
    explanation: 'A középpont (50 cm) és a végek között félúton a 25 és 75 cm-es pont van. Kedvező: 25–75 cm, 50 cm hosszú: P = 1/2.'
  },
  {
    id: 'gp-q14',
    questionTypeBadge: 'Hosszúság',
    figure: FIG_ROD_20,
    level: 2,
    question: 'Mennyi a valószínűsége, hogy a hangya közelebb van a rúd 20 cm-es pontjához, mint a 100 cm-es végéhez?',
    options: ['0,6', '0,2', '0,4', '0,8'],
    correctAnswer: 0,
    explanation: 'A 20 cm-es és a 100 cm-es pont felezőpontja 60 cm-nél van. Kedvező: 0–60 cm, P = 60/100 = 0,6.'
  },
  {
    id: 'gp-q15',
    questionTypeBadge: 'Terület',
    figure: FIG_SQUARE_CIRCLE,
    level: 2,
    question: 'Egy 20 cm oldalú négyzetbe beírtuk a kört. Mennyi a valószínűsége, hogy a négyzet egy véletlen pontja a körbe esik?',
    options: ['π/4 ≈ 0,785', 'π/2 ≈ 1,571', '1/2', 'π/20 ≈ 0,157'],
    correctAnswer: 0,
    explanation: 'P = 10²π / 20² = 100π/400 = π/4 ≈ 0,785.'
  },
  {
    id: 'gp-q16',
    questionTypeBadge: 'Térfogat',
    level: 2,
    question: 'Egy gömb belsejében véletlenszerűen választunk egy pontot. Mennyi a valószínűsége, hogy közelebb van a középponthoz, mint a gömbfelülethez?',
    options: ['1/8', '1/4', '1/2', '1/6'],
    correctAnswer: 0,
    explanation: 'Kedvező: az R/2 sugarú gömb. P = (4/3)(R/2)³π / (4/3)R³π = 1/8 – térben a köbbel arányos.'
  },
  {
    id: 'gp-q17',
    questionTypeBadge: 'Terület',
    figure: FIG_PAPER,
    level: 2,
    question: 'Egy 20 cm × 30 cm-es papírlapon véletlenszerűen választunk egy pontot. Mennyi a valószínűsége, hogy minden csúcstól 10 cm-nél távolabb esik?',
    options: ['≈ 0,476', '≈ 0,524', '≈ 0,869', '≈ 0,833'],
    correctAnswer: 0,
    explanation: 'A 4 negyedkör együtt egy 10 cm sugarú kör: 100π ≈ 314,2 cm². P = (600 − 100π)/600 ≈ 0,476. (0,524 a komplementer.)'
  },
  {
    id: 'gp-q18',
    questionTypeBadge: 'Céltábla',
    figure: FIG_DARTS,
    level: 2,
    question: 'A céltábla belső körének átmérője feleakkora, mint a külsőé, és két merőleges átmérő négy részre osztja. Mennyi a valószínűsége, hogy a lövés értéke 40?',
    options: ['1/8', '1/4', '1/16', '3/8'],
    correctAnswer: 0,
    explanation: 'A belső kör a tábla 1/4 része, egy negyede 1/16. Két 40-es rész van: P = 2/16 = 1/8.'
  },
  {
    id: 'gp-q19',
    questionTypeBadge: 'Céltábla',
    figure: FIG_DARTS,
    level: 2,
    question: 'Ugyanezen a céltáblán mennyi a valószínűsége, hogy a lövés értéke 10?',
    options: ['3/8', '1/4', '3/16', '1/8'],
    correctAnswer: 0,
    explanation: 'A külső gyűrű a tábla 3/4 része, egy negyede 3/16. Két 10-es rész van: P = 2 · 3/16 = 3/8.'
  },
  {
    id: 'gp-q20',
    questionTypeBadge: 'Terület',
    figure: FIG_MONITOR,
    level: 2,
    question: 'Egy 34,5 cm × 19,5 cm-es monitor közepére 8 cm sugarú kört rajzolunk. Egy pont véletlenszerűen villan fel a monitoron. Mennyi a valószínűsége, hogy a körbe esik?',
    options: ['≈ 0,299', '≈ 0,149', '≈ 0,701', '≈ 0,037'],
    correctAnswer: 0,
    explanation: 'Kör: 8²π ≈ 201,1 cm², monitor: 34,5 · 19,5 = 672,75 cm². P ≈ 201,1 / 672,75 ≈ 0,299.'
  },
  // ---------------------------- 3. szint ----------------------------
  {
    id: 'gp-q21',
    questionTypeBadge: 'Érme a csempén',
    figure: FIG_TILE,
    level: 3,
    question: 'A padló 20 cm-es négyzet alakú csempéi között 0,5 cm-es fuga van. Leejtünk egy 2,8 cm átmérőjű 50 forintost. Mennyi a valószínűsége, hogy nem érint fugát?',
    options: ['≈ 0,704', '≈ 0,740', '≈ 0,860', '≈ 0,839'],
    correctAnswer: 0,
    explanation: 'Az érme középpontjának egy (20 − 2 · 1,4) = 17,2 cm oldalú négyzetben kell lennie. Egy csempére 20,5 cm × 20,5 cm jut. P = 17,2² / 20,5² = 295,84 / 420,25 ≈ 0,704.'
  },
  {
    id: 'gp-q22',
    questionTypeBadge: 'Céltábla',
    figure: FIG_TARGET16,
    level: 3,
    question: 'Egy 16 cm sugarú céltáblát koncentrikus körökkel 4 egyenlő valószínűségű tartományra osztunk. Mekkora a legbelső kör sugara?',
    options: ['8 cm', '4 cm', '6 cm', '2 cm'],
    correctAnswer: 0,
    explanation: 'r₁²/16² = 1/4 ⇒ r₁ = 16/2 = 8 cm. (A 4 cm a sugár negyede, de a terület a négyzettel arányos.)'
  },
  {
    id: 'gp-q23',
    questionTypeBadge: 'Céltábla',
    figure: FIG_TARGET16,
    level: 3,
    question: 'Ugyanezen a táblán (R = 16 cm, 4 egyenlő valószínűségű tartomány) mekkora a második kör sugara?',
    options: ['8√2 ≈ 11,31 cm', '12 cm', '8√3 ≈ 13,86 cm', '10 cm'],
    correctAnswer: 0,
    explanation: 'r₂²/16² = 2/4 ⇒ r₂ = 16 · √(1/2) = 8√2 ≈ 11,31 cm. A harmadik sugár 8√3 ≈ 13,86 cm.'
  },
  {
    id: 'gp-q24',
    questionTypeBadge: 'Térfogat',
    figure: FIG_POT,
    level: 3,
    question: 'Csonkakúp alakú cserép: alapkör átmérője 18 cm, fedőkör átmérője 12 cm, alkotó 10 cm. Tele van homokkal, benne véletlenszerűen mászik egy bogár. Mennyi a valószínűsége, hogy a fedőlap síkjától legfeljebb 3 cm-re van?',
    options: ['≈ 0,23', '≈ 0,31', '≈ 0,20', '≈ 0,10'],
    correctAnswer: 0,
    explanation: 'm = √(10² − 3²) = √91 ≈ 9,54 cm. A felső 3 cm-es szelet alsó sugara 6 + 9/√91 ≈ 6,94 cm, térfogata ≈ 395,4 cm³; a cserépé ≈ 1708,2 cm³. P ≈ 0,23. (0,31 ≈ 3/9,54 lenne a magasságok aránya.)'
  },
  {
    id: 'gp-q25',
    questionTypeBadge: 'Hosszúság',
    figure: FIG_ROD_BROKEN,
    level: 3,
    question: 'A méterrúd 10 cm-enként felváltva piros és fehér (a 0–10 cm piros). A 42 cm-es pontnál kettétörik. A rövidebb darabon véletlen helyen jár egy hangya. Mennyi a valószínűsége, hogy piros részen jár?',
    options: ['22/42 ≈ 0,524', '20/42 ≈ 0,476', '1/2', '28/58 ≈ 0,483'],
    correctAnswer: 0,
    explanation: 'A 0–42 cm-es darabon piros: 0–10, 20–30, 40–42 → 22 cm. P = 22/42 ≈ 0,524.'
  },
  {
    id: 'gp-q26',
    questionTypeBadge: 'Hosszúság',
    figure: FIG_ROD_BROKEN,
    level: 3,
    question: 'Ugyanennél a rúdnál melyik darabon nagyobb a valószínűsége, hogy a hangya piros részen jár?',
    options: ['a 42 cm-es darabon (≈ 0,524 > ≈ 0,483)', 'az 58 cm-es darabon (≈ 0,517 > ≈ 0,476)', 'egyenlő, mindkettő 1/2', 'az 58 cm-es darabon, mert hosszabb'],
    correctAnswer: 0,
    explanation: 'A 42–100 cm-es darabon piros: 42–50, 60–70, 80–90 → 28 cm, P = 28/58 ≈ 0,483. A rövidebb darabon 22/42 ≈ 0,524, ez a nagyobb.'
  },
  {
    id: 'gp-q27',
    questionTypeBadge: 'Térfogat',
    level: 3,
    question: 'Egy kockába beírjuk a gömböt. A kocka belsejében véletlenszerűen választunk egy pontot. Mennyi a valószínűsége, hogy a gömbbe esik?',
    options: ['π/6 ≈ 0,524', 'π/4 ≈ 0,785', 'π/8 ≈ 0,393', '2/3'],
    correctAnswer: 0,
    explanation: 'Kocka éle a, gömb sugara a/2: (4/3)π(a/2)³ / a³ = π/6 ≈ 0,524. (A π/4 a síkbeli megfelelő: kör a négyzetben.)'
  },
  {
    id: 'gp-q28',
    questionTypeBadge: 'Szerencsekerék',
    level: 3,
    question: 'Egy szerencsekeréken annak a valószínűsége, hogy a mutató a piros körcikkben áll meg, 0,15. Mekkora a piros körcikk középponti szöge?',
    options: ['54°', '15°', '45°', '36°'],
    correctAnswer: 0,
    explanation: 'α / 360° = 0,15 ⇒ α = 0,15 · 360° = 54°.'
  },
  {
    id: 'gp-q29',
    questionTypeBadge: 'Céltábla',
    figure: FIG_DARTS,
    level: 3,
    question: 'A négy részre osztott céltáblán (belső kör átmérője a külső fele) mennyi a valószínűsége, hogy a lövés értéke legalább 40?',
    options: ['1/4', '1/2', '1/8', '3/8'],
    correctAnswer: 0,
    explanation: 'Legalább 40 pontot a 40-es és 50-es részek érnek – ez a teljes belső kör: (R/2)²π / R²π = 1/4.'
  },
  {
    id: 'gp-q30',
    questionTypeBadge: 'Céltábla',
    level: 3,
    question: 'Egy 20 cm sugarú céltábla közepére kört rajzolunk. Mekkora legyen a sugara, hogy egy táblát eltaláló lövés 0,25 valószínűséggel essen bele?',
    options: ['10 cm', '5 cm', '≈ 14,14 cm', '15 cm'],
    correctAnswer: 0,
    explanation: 'r²/20² = 0,25 ⇒ r² = 100 ⇒ r = 10 cm. (Az 5 cm a sugár negyede: annak valószínűsége csak 1/16 lenne.)'
  }
];

export const GeometricProbabilityQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId="g12-stat-geometriai-quiz"
      subtopicId="geometriai-valoszinuseg"
      title="8. Geometriai valószínűség – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: hosszúságok, területek, szögek és térfogatok aránya – céltábla, szerencsekerék, méterrúd, csempe, cserép."
      badge="12. OSZTÁLY • III. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      questions={GEOMETRIC_PROBABILITY_QUESTIONS}
      cheatSheets={[
        {
          title: 'A modell',
          items: [
            'P(A) = az A-hoz tartozó mérték / a teljes mérték.',
            'Mérték: hosszúság, terület, térfogat vagy szög.',
            'Szerencsekerék: P = középponti szög / 360°.',
            'Komplementer itt is: P(Ā) = 1 − P(A).'
          ]
        },
        {
          title: 'Kör és gömb',
          items: [
            'Kör: P(r sugarú belső kör) = r²/R².',
            'Körgyűrű: (R₂² − R₁²)/R².',
            'Közelebb a középponthoz: síkban 1/4, térben 1/8.',
            'n egyenlő tartomány: rₖ = R · √(k/n).'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            'Céltábla (5, 15, 25 cm): 1/25, 8/25, 16/25.',
            'Méterrúd: 1/2, 1/2, 0,6.',
            'Csempe + érme: 17,2²/20,5² ≈ 0,704.',
            'Papírlap: (600 − 100π)/600 ≈ 0,476.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <GeometricProbabilityMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <GeometricProbabilitySorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default GeometricProbabilityQuiz;
