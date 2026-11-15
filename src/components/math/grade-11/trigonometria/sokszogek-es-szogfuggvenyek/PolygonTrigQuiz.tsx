import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { PolygonTrigMatcher } from './PolygonTrigMatcher';
import { PolygonTrigSorter } from './PolygonTrigSorter';

// ---- Kvízábrák (belső segédkomponensek, nem exportáljuk) ----
type Pt = [number, number];
const unitVec = (a: Pt, b: Pt): Pt => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const l = Math.hypot(dx, dy);
  return [dx / l, dy / l];
};
const f1 = (n: number) => Math.round(n * 10) / 10;

const Fig: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 240 150" className="w-full max-w-[280px] h-auto mx-auto" fill="none" stroke="#334155" strokeWidth={1.5}>
    {children}
  </svg>
);

const Tx: React.FC<{ x: number; y: number; c?: string; a?: 'start' | 'middle' | 'end'; s?: number; children: React.ReactNode }> = ({ x, y, c = '#1e293b', a = 'middle', s = 11, children }) => (
  <text x={x} y={y} fill={c} stroke="none" fontSize={s} textAnchor={a} fontFamily="sans-serif">
    {children}
  </text>
);

const AngleArc: React.FC<{ v: Pt; p1: Pt; p2: Pt; r?: number; color?: string }> = ({ v, p1, p2, r = 16, color = '#2563eb' }) => {
  const u1 = unitVec(v, p1);
  const u2 = unitVec(v, p2);
  const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
  return (
    <path
      d={`M ${f1(v[0] + r * u1[0])} ${f1(v[1] + r * u1[1])} A ${r} ${r} 0 0 ${sweep} ${f1(v[0] + r * u2[0])} ${f1(v[1] + r * u2[1])}`}
      stroke={color}
      strokeWidth={1.5}
    />
  );
};

// Derékszög: negyedkörív ponttal (magyar jelölés)
const RightAngle: React.FC<{ v: Pt; p1: Pt; p2: Pt; r?: number }> = ({ v, p1, p2, r = 12 }) => {
  const u1 = unitVec(v, p1);
  const u2 = unitVec(v, p2);
  const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
  const bx = u1[0] + u2[0];
  const by = u1[1] + u2[1];
  const bl = Math.hypot(bx, by);
  return (
    <g>
      <path
        d={`M ${f1(v[0] + r * u1[0])} ${f1(v[1] + r * u1[1])} A ${r} ${r} 0 0 ${sweep} ${f1(v[0] + r * u2[0])} ${f1(v[1] + r * u2[1])}`}
        stroke="#334155"
        strokeWidth={1.3}
      />
      <circle cx={f1(v[0] + (0.55 * r * bx) / bl)} cy={f1(v[1] + (0.55 * r * by) / bl)} r={1.8} fill="#334155" stroke="none" />
    </g>
  );
};

const RED = '#dc2626';
const BLUE = '#2563eb';

const UnitCircleFig: React.FC<{ deg: number }> = ({ deg }) => {
  const O: Pt = [120, 88];
  const R = 56;
  const t = (deg * Math.PI) / 180;
  const P: Pt = [O[0] + R * Math.cos(t), O[1] - R * Math.sin(t)];
  const b = t / 2;
  return (
    <Fig>
      <line x1={40} y1={88} x2={205} y2={88} stroke="#64748b" />
      <line x1={120} y1={145} x2={120} y2={18} stroke="#64748b" />
      <circle cx={120} cy={88} r={R} stroke="#94a3b8" strokeDasharray="4 3" />
      <line x1={O[0]} y1={O[1]} x2={f1(P[0])} y2={f1(P[1])} stroke={BLUE} strokeWidth={2} />
      <circle cx={f1(P[0])} cy={f1(P[1])} r={3} fill={BLUE} stroke="none" />
      <AngleArc v={O} p1={[200, 88]} p2={P} r={16} />
      <Tx x={f1(O[0] + 36 * Math.cos(b))} y={f1(O[1] - 36 * Math.sin(b) + 4)} s={10}>{deg}°</Tx>
      <Tx x={f1(P[0] - 8)} y={f1(P[1] - 6)}>P</Tx>
      <Tx x={180} y={100} s={10}>1</Tx>
      <Tx x={112} y={100} s={10}>O</Tx>
      <Tx x={210} y={92} s={10}>x</Tx>
      <Tx x={128} y={22} s={10}>y</Tx>
      <Tx x={196} y={30} c={RED}>tg {deg}° = ?</Tx>
    </Fig>
  );
};

// Egyenlő szárú háromszög: C(120,15), A(60,135), B(180,135)
const ISO_C: Pt = [120, 15];
const ISO_A: Pt = [60, 135];
const ISO_B: Pt = [180, 135];

const FIG_PT_BASE_ANGLES = (
  <Fig>
    <polygon points="60,135 180,135 120,15" />
    <AngleArc v={ISO_C} p1={ISO_A} p2={ISO_B} r={20} />
    <Tx x={120} y={51} s={10}>42°</Tx>
    <AngleArc v={ISO_A} p1={ISO_B} p2={ISO_C} r={18} color={RED} />
    <AngleArc v={ISO_B} p1={ISO_A} p2={ISO_C} r={18} color={RED} />
    <Tx x={86} y={127} c={RED}>?</Tx>
    <Tx x={154} y={127} c={RED}>?</Tx>
  </Fig>
);

const FIG_PT_ISO_LEGS = (
  <Fig>
    <polygon points="60,135 180,135 120,15" />
    <line x1={60} y1={135} x2={120} y2={15} stroke={RED} strokeWidth={2} />
    <line x1={180} y1={135} x2={120} y2={15} stroke={RED} strokeWidth={2} />
    <AngleArc v={ISO_C} p1={ISO_A} p2={ISO_B} r={20} />
    <Tx x={120} y={51} s={10}>42°</Tx>
    <Tx x={120} y={148}>120 m</Tx>
    <Tx x={80} y={75} c={RED}>?</Tx>
    <Tx x={160} y={75} c={RED}>?</Tx>
  </Fig>
);

const IsoThirdsFig: React.FC<{ ask: 'beta' | 'alpha' }> = ({ ask }) => (
  <Fig>
    <polygon points="60,135 180,135 120,15" />
    <line x1={120} y1={15} x2={100} y2={135} />
    <line x1={120} y1={15} x2={140} y2={135} />
    <Tx x={80} y={147} s={9}>40 m</Tx>
    <Tx x={120} y={147} s={9}>40 m</Tx>
    <Tx x={160} y={147} s={9}>40 m</Tx>
    <Tx x={196} y={22} s={10}>szárszög: 42°</Tx>
    <AngleArc v={ISO_C} p1={[100, 135]} p2={[140, 135]} r={42} color={ask === 'beta' ? RED : BLUE} />
    <Tx x={120} y={78} s={10} c={ask === 'beta' ? RED : '#1e293b'}>{ask === 'beta' ? '?' : 'β'}</Tx>
    <AngleArc v={ISO_C} p1={ISO_A} p2={[100, 135]} r={72} color={ask === 'alpha' ? RED : BLUE} />
    <AngleArc v={ISO_C} p1={[140, 135]} p2={ISO_B} r={72} color={BLUE} />
    <Tx x={90} y={110} s={10} c={ask === 'alpha' ? RED : '#1e293b'}>{ask === 'alpha' ? '?' : 'α'}</Tx>
    <Tx x={150} y={110} s={10}>γ</Tx>
  </Fig>
);

// Vasúti töltés keresztmetszete (méretarányos: 1 m = 20 px)
const EmbankmentFig: React.FC<{ mode: 'split' | 'angle' | 'height' }> = ({ mode }) => (
  <Fig>
    <polygon points="20,125 220,125 159,67 69,67" />
    {mode === 'split' && <line x1={110} y1={125} x2={159} y2={67} stroke={BLUE} strokeDasharray="4 3" />}
    {mode === 'angle' && (
      <g>
        <AngleArc v={[20, 125]} p1={[220, 125]} p2={[69, 67]} r={20} color={RED} />
        <Tx x={52} y={116} s={10} c={RED}>φ = ?</Tx>
      </g>
    )}
    {mode === 'height' && (
      <g>
        <line x1={69} y1={67} x2={69} y2={125} stroke={RED} strokeDasharray="4 3" />
        <RightAngle v={[69, 125]} p1={[69, 67]} p2={[20, 125]} r={10} />
        <Tx x={90} y={102} s={10} c={RED}>m = ?</Tx>
      </g>
    )}
    <Tx x={114} y={61} s={10}>4,5 m</Tx>
    <Tx x={120} y={140} s={10}>10 m</Tx>
    <Tx x={40} y={90} s={10} a="end">3,8 m</Tx>
    <Tx x={196} y={90} s={10} a="start">4,2 m</Tx>
  </Fig>
);

const FIG_PT_CITIES = (
  <Fig>
    <polygon points="95,30 160,30 142,130" />
    <AngleArc v={[160, 30]} p1={[95, 30]} p2={[142, 130]} r={16} color={RED} />
    <Tx x={145} y={56} c={RED}>?</Tx>
    <Tx x={88} y={34} s={10} a="end">Győr</Tx>
    <Tx x={167} y={34} s={10} a="start">Budapest</Tx>
    <Tx x={142} y={144} s={10}>Pécs</Tx>
    <Tx x={127} y={24} s={10}>108 km</Tx>
    <Tx x={160} y={86} s={10} a="start">170 km</Tx>
    <Tx x={112} y={86} s={10} a="end">185 km</Tx>
  </Fig>
);

// Paralelogramma: A(25,125), B(145,125), C(214,85), D(94,85)
const ParallelogramFig: React.FC<{ a: string; b: string; ang: string; ask: 'area' | 'diag' }> = ({ a, b, ang, ask }) => (
  <Fig>
    <polygon points="25,125 145,125 214,85 94,85" />
    <AngleArc v={[25, 125]} p1={[145, 125]} p2={[94, 85]} r={22} />
    <Tx x={58} y={120} s={10}>{ang}</Tx>
    <Tx x={85} y={140} s={10}>{a}</Tx>
    <Tx x={52} y={101} s={10} a="end">{b}</Tx>
    {ask === 'area' && <Tx x={128} y={110} c={RED}>T = ?</Tx>}
    {ask === 'diag' && (
      <g>
        <line x1={25} y1={125} x2={214} y2={85} stroke={RED} strokeWidth={2} strokeDasharray="5 3" />
        <Tx x={126} y={96} c={RED}>?</Tx>
      </g>
    )}
  </Fig>
);

const FIG_PT_FORWARD = (
  <Fig>
    <polygon points="30,120 210,120 151.3,18.3" />
    <line x1={30} y1={120} x2={151.3} y2={18.3} stroke={RED} strokeWidth={2} />
    <AngleArc v={[30, 120]} p1={[210, 120]} p2={[151.3, 18.3]} r={20} />
    <AngleArc v={[210, 120]} p1={[30, 120]} p2={[151.3, 18.3]} r={20} />
    <Tx x={62} y={113} s={10}>40°</Tx>
    <Tx x={180} y={110} s={10}>60°</Tx>
    <Tx x={22} y={128} a="end">B</Tx>
    <Tx x={218} y={128} a="start">C</Tx>
    <Tx x={151} y={12}>P</Tx>
    <Tx x={120} y={136} s={10}>300 m</Tx>
    <Tx x={82} y={60} c={RED}>?</Tx>
  </Fig>
);

const MedianFig: React.FC<{ ask: 'area' | 'side' }> = ({ ask }) => (
  <Fig>
    <polygon points="40,125 184,125 190,38" />
    <line x1={112} y1={125} x2={190} y2={38} stroke={BLUE} />
    {ask === 'side' && <line x1={40} y1={125} x2={190} y2={38} stroke={RED} strokeWidth={2} />}
    <AngleArc v={[112, 125]} p1={[184, 125]} p2={[190, 38]} r={18} />
    <Tx x={142} y={116} s={10}>48°</Tx>
    <Tx x={76} y={139} s={10}>24 cm</Tx>
    <Tx x={148} y={139} s={10}>24 cm</Tx>
    <Tx x={140} y={92} s={9} a="end">39 cm</Tx>
    <Tx x={34} y={130} a="end">A</Tx>
    <Tx x={190} y={135} a="start">B</Tx>
    <Tx x={196} y={36} a="start">C</Tx>
    <Tx x={112} y={139} s={9}>F</Tx>
    {ask === 'area' && <Tx x={100} y={112} c={RED}>T = ?</Tx>}
    {ask === 'side' && <Tx x={108} y={72} c={RED}>?</Tx>}
  </Fig>
);

const FIG_PT_AREA_ANGLE = (
  <Fig>
    <polygon points="40,120 175,120 132.6,10" />
    <AngleArc v={[40, 120]} p1={[175, 120]} p2={[132.6, 10]} r={20} color={RED} />
    <Tx x={80} y={110} s={10} c={RED}>γ = ?</Tx>
    <Tx x={107} y={135} s={10}>15 cm</Tx>
    <Tx x={80} y={62} s={10} a="end">16 cm</Tx>
    <Tx x={128} y={92} s={10}>T = 60 cm²</Tx>
  </Fig>
);

const FIG_PT_MAP = (
  <Fig>
    <polygon points="60,120 190,120 191.4,40" />
    <line x1={60} y1={120} x2={191.4} y2={40} stroke={RED} strokeWidth={2} />
    <AngleArc v={[190, 120]} p1={[60, 120]} p2={[191.4, 40]} r={16} />
    <Tx x={171} y={106} s={10}>91°</Tx>
    <Tx x={60} y={136} s={10}>Kaposvár</Tx>
    <Tx x={190} y={136} s={10}>Békéscsaba</Tx>
    <Tx x={191} y={32} s={10}>Miskolc</Tx>
    <Tx x={125} y={134} s={10}>260 km</Tx>
    <Tx x={198} y={84} s={10} a="start">160 km</Tx>
    <Tx x={118} y={72} c={RED}>?</Tx>
  </Fig>
);

const POLYGON_TRIG_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Tompaszög tangense, alapfogalmak (1–10)
  {
    id: 'pt-q1',
    questionTypeBadge: 'Tompaszög tangense',
    level: 1,
    question: 'Melyik képlettel terjesztjük ki a tangenst tompaszögekre?',
    options: ['tg α = sin α / cos α', 'tg α = cos α / sin α', 'tg α = sin α · cos α', 'tg α = 1 − cos α'],
    correctAnswer: 0,
    explanation: 'Hegyesszögre tg α = sin α / cos α; a tankönyv ezzel a képlettel definiálja a tompaszög tangensét is.'
  },
  {
    id: 'pt-q2',
    questionTypeBadge: 'Nevezetes érték',
    level: 1,
    question: 'Mennyi tg 90°?',
    options: ['Nincs értelmezve', '0', '1', 'Végtelen nagy pozitív szám'],
    correctAnswer: 0,
    explanation: 'tg 90° = sin 90° / cos 90° = 1 / 0 lenne, de 0-val nem lehet osztani – a 90°-nak nincs tangense.'
  },
  {
    id: 'pt-q3',
    questionTypeBadge: 'Előjel',
    level: 1,
    question: 'Milyen előjelű egy tompaszög tangense?',
    options: ['Negatív', 'Pozitív', 'Nulla', 'A szögtől függően bármelyik'],
    correctAnswer: 0,
    explanation: 'Tompaszögre sin α > 0 és cos α < 0, így a hányadosuk negatív.'
  },
  {
    id: 'pt-q4',
    questionTypeBadge: 'Tompaszög tangense',
    figure: <UnitCircleFig deg={135} />,
    level: 1,
    question: 'Mennyi tg 135°?',
    options: ['−1', '1', '−√2/2', '√2'],
    correctAnswer: 0,
    explanation: 'tg 135° = sin 135° / cos 135° = (√2/2) / (−√2/2) = −1.'
  },
  {
    id: 'pt-q5',
    questionTypeBadge: 'Tompaszög tangense',
    figure: <UnitCircleFig deg={120} />,
    level: 1,
    question: 'Mennyi tg 120°?',
    options: ['−√3', '√3', '−√3/3', '−1/2'],
    correctAnswer: 0,
    explanation: 'tg 120° = (√3/2) / (−1/2) = −√3 ≈ −1,732.'
  },
  {
    id: 'pt-q6',
    questionTypeBadge: 'Tompaszög tangense',
    level: 1,
    question: 'Mennyi tg 150°?',
    options: ['−√3/3', '√3/3', '−√3', '−√3/2'],
    correctAnswer: 0,
    explanation: 'tg 150° = (1/2) / (−√3/2) = −1/√3 = −√3/3 ≈ −0,577.'
  },
  {
    id: 'pt-q7',
    questionTypeBadge: 'Kiegészítő szög',
    level: 1,
    question: 'Mi az összefüggés egy α hegyesszög és a kiegészítő szöge tangense között?',
    options: ['tg(180° − α) = −tg α', 'tg(180° − α) = tg α', 'tg(180° − α) = 1 / tg α', 'tg(180° − α) = −1 / tg α'],
    correctAnswer: 0,
    explanation: 'A kiegészítő szögek szinusza egyenlő, koszinusza ellentett, így a hányadosuk (a tangens) is ellentett.'
  },
  {
    id: 'pt-q8',
    questionTypeBadge: 'Egyenlő szárú háromszög',
    figure: FIG_PT_BASE_ANGLES,
    level: 1,
    question: 'Egy egyenlő szárú háromszög szárszöge 42°. Mekkorák az alapon fekvő szögei?',
    options: ['69°', '138°', '48°', '21°'],
    correctAnswer: 0,
    explanation: '(180° − 42°) / 2 = 69°.'
  },
  {
    id: 'pt-q9',
    questionTypeBadge: 'Paralelogramma területe',
    figure: <ParallelogramFig a="a" b="b" ang="α" ask="area" />,
    level: 1,
    question: 'Mennyi az a és b oldalú, α szögű paralelogramma területe?',
    options: ['T = a · b · sin α', 'T = ½ · a · b · sin α', 'T = a · b · cos α', 'T = a · b'],
    correctAnswer: 0,
    explanation: 'Az átló két egybevágó, ½ · a · b · sin α területű háromszögre bontja a paralelogrammát, így T = a · b · sin α.'
  },
  {
    id: 'pt-q10',
    questionTypeBadge: 'Sokszög felbontása',
    figure: <EmbankmentFig mode="split" />,
    level: 1,
    question: 'A vasúti töltés trapéz alakú keresztmetszetét (korona 4,5 m, alap 10 m, rézsűk 3,8 m és 4,2 m) egy paralelogrammára és egy háromszögre bontjuk. Mekkorák a háromszög oldalai?',
    options: ['3,8 m, 4,2 m és 5,5 m', '3,8 m, 4,2 m és 10 m', '3,8 m, 4,2 m és 4,5 m', '4,5 m, 5,5 m és 10 m'],
    correctAnswer: 0,
    explanation: 'A 4,5 m-es koronával és a 3,8 m-es rézsűvel paralelogramma alakul ki; a maradék háromszög alapja 10 − 4,5 = 5,5 m, szárai 3,8 m és 4,2 m.'
  },

  // LEVEL 2: A csoportmunka-feladatok (11–20)
  {
    id: 'pt-q11',
    questionTypeBadge: 'Egyenlő szárú háromszög',
    figure: FIG_PT_ISO_LEGS,
    level: 2,
    question: 'A 42°-os szárszögű, 120 m-es alapú egyenlő szárú háromszögnek mekkorák a szárai?',
    options: ['≈ 167,4 m', '≈ 156,3 m', '≈ 64,3 m', '≈ 120 m'],
    correctAnswer: 0,
    explanation: 'A magasság felezi az alapot: szár = 60 / cos 69° ≈ 167,4 m. (156,3 m a magasság, 60 · tg 69°.)'
  },
  {
    id: 'pt-q12',
    questionTypeBadge: 'Szögszámítás',
    figure: <IsoThirdsFig ask="beta" />,
    level: 2,
    question: 'Ugyanebben a háromszögben a szögszárak 40 m-es részekre osztják az alapot. Mekkora a középső β szög?',
    options: ['≈ 14,6°', '14°', '≈ 13,7°', '≈ 7,3°'],
    correctAnswer: 0,
    explanation: 'A magasság m ≈ 156,3 m. A középső háromszög felére: tg(β/2) = 20 / 156,3 ⇒ β/2 ≈ 7,3°, β ≈ 14,6°. (A 42°/3 = 14° hibás, a szögek nem egyenlők!)'
  },
  {
    id: 'pt-q13',
    questionTypeBadge: 'Szögszámítás',
    figure: <IsoThirdsFig ask="alpha" />,
    level: 2,
    question: 'És mekkora a szélső α (= γ) szög?',
    options: ['≈ 13,7°', '14°', '≈ 14,6°', '≈ 27,4°'],
    correctAnswer: 0,
    explanation: 'α = γ a szimmetria miatt, így α = (42° − 14,6°) / 2 ≈ 13,7°.'
  },
  {
    id: 'pt-q14',
    questionTypeBadge: 'Koszinusztétel',
    figure: <EmbankmentFig mode="angle" />,
    level: 2,
    question: 'Mekkora a vasúti töltés meredekebb rézsűjének emelkedési szöge (korona 4,5 m, alap 10 m, rézsűk 3,8 m és 4,2 m)?',
    options: ['≈ 49,7°', '≈ 43,6°', '≈ 86,7°', '≈ 40,3°'],
    correctAnswer: 0,
    explanation: 'A 3,8–4,2–5,5 m-es háromszögben cos φ = (3,8² + 5,5² − 4,2²) / (2 · 3,8 · 5,5) ≈ 0,647 ⇒ φ ≈ 49,7° (a rövidebb, 3,8 m-es rézsű a meredekebb). A lankásabb oldalé ≈ 43,6°.'
  },
  {
    id: 'pt-q15',
    questionTypeBadge: 'Magasság',
    figure: <EmbankmentFig mode="height" />,
    level: 2,
    question: 'Milyen magas ez a vasúti töltés?',
    options: ['≈ 2,9 m', '≈ 2,5 m', '≈ 3,8 m', '≈ 4,0 m'],
    correctAnswer: 0,
    explanation: 'm = 3,8 · sin 49,7° ≈ 2,9 m (ugyanennyi 4,2 · sin 43,6°). A 2,5 m a 3,8 · cos 49,7° vízszintes vetület lenne.'
  },
  {
    id: 'pt-q16',
    questionTypeBadge: 'Koszinusztétel',
    figure: FIG_PT_CITIES,
    level: 2,
    question: 'Győr–Budapest 108 km, Budapest–Pécs 170 km, Pécs–Győr 185 km. Mekkora a Budapestnél lévő szög?',
    options: ['≈ 80,1°', '≈ 64,8°', '≈ 35,1°', '90°'],
    correctAnswer: 0,
    explanation: 'Ez a leghosszabb, 185 km-es oldallal szemközti szög: cos β = (108² + 170² − 185²) / (2 · 108 · 170) ≈ 0,173 ⇒ β ≈ 80,1°.'
  },
  {
    id: 'pt-q17',
    questionTypeBadge: 'Területképlet',
    level: 2,
    question: 'Mekkora a Pécs–Budapest–Győr „háromszög” területe?',
    options: ['≈ 9042 km²', '9180 km²', '≈ 18 084 km²', '≈ 4521 km²'],
    correctAnswer: 0,
    explanation: 'T = ½ · 108 · 170 · sin 80,1° ≈ 9042 km². (9180 km² = ½ · 108 · 170 – a sin β szorzó nélkül.)'
  },
  {
    id: 'pt-q18',
    questionTypeBadge: 'Százalékszámítás',
    level: 2,
    question: 'Hány százaléka ez Magyarország területének (93 030 km²)?',
    options: ['≈ 9,7%', '≈ 19,4%', '≈ 0,97%', '≈ 97%'],
    correctAnswer: 0,
    explanation: '9042 / 93 030 ≈ 0,097, vagyis ≈ 9,7%.'
  },
  {
    id: 'pt-q19',
    questionTypeBadge: 'Paralelogramma területe',
    figure: <ParallelogramFig a="8 cm" b="6 cm" ang="30°" ask="area" />,
    level: 2,
    question: 'Mekkora annak a paralelogrammának a területe, amelynek oldalai 6 cm és 8 cm, egyik szöge 30°?',
    options: ['24 cm²', '12 cm²', '48 cm²', '≈ 41,6 cm²'],
    correctAnswer: 0,
    explanation: 'T = 6 · 8 · sin 30° = 48 · 0,5 = 24 cm². (A 150°-os szöggel ugyanez jön ki, mert sin 150° = sin 30°.)'
  },
  {
    id: 'pt-q20',
    questionTypeBadge: 'Szinusztétel',
    figure: FIG_PT_FORWARD,
    level: 2,
    question: 'Előremetszés: BC = 300 m, a P tereptárgyat B-ből 40°-ban, C-ből 60°-ban látjuk a BC szakaszhoz képest. Milyen messze van P a B ponttól?',
    options: ['≈ 264 m', '≈ 196 m', '≈ 223 m', '≈ 300 m'],
    correctAnswer: 0,
    explanation: 'A P-nél lévő szög 180° − 40° − 60° = 80°. BP a C-nél lévő 60°-os szöggel szemközti oldal: BP = 300 · sin 60° / sin 80° ≈ 264 m. (CP ≈ 196 m.)'
  },

  // LEVEL 3: Házi feladatok és összetett esetek (21–30)
  {
    id: 'pt-q21',
    questionTypeBadge: 'Súlyvonal, terület',
    figure: <MedianFig ask="area" />,
    level: 3,
    question: 'Egy háromszög 48 cm-es oldala a hozzá tartozó 39 cm-es súlyvonallal 48°-os szöget alkot. Mekkora a háromszög területe?',
    options: ['≈ 695,6 cm²', '≈ 347,8 cm²', '936 cm²', '≈ 626,3 cm²'],
    correctAnswer: 0,
    explanation: 'A súlyvonal két 24 cm-es alapú, egyenlő területű részre vágja: T = 2 · ½ · 24 · 39 · sin 48° ≈ 695,6 cm².'
  },
  {
    id: 'pt-q22',
    questionTypeBadge: 'Koszinusztétel',
    figure: <MedianFig ask="side" />,
    level: 3,
    question: 'Ugyanennek a háromszögnek mekkora a leghosszabb oldala?',
    options: ['≈ 57,9 cm', '≈ 29,1 cm', '≈ 45,8 cm', '63 cm'],
    correctAnswer: 0,
    explanation: 'A 132°-os szöget bezáró részháromszögben: √(24² + 39² − 2 · 24 · 39 · cos 132°) ≈ 57,9 cm. (A másik oldal, 48°-kal, ≈ 29,1 cm.)'
  },
  {
    id: 'pt-q23',
    questionTypeBadge: 'Területképlet',
    figure: FIG_PT_AREA_ANGLE,
    level: 3,
    question: 'Egy háromszög területe 60 cm², két oldala 15 cm és 16 cm. Mekkora lehet a két oldal által közbezárt szög?',
    options: ['30° vagy 150°', 'Csak 30°', 'Csak 150°', '60° vagy 120°'],
    correctAnswer: 0,
    explanation: '60 = ½ · 15 · 16 · sin γ ⇒ sin γ = 0,5 ⇒ γ = 30° vagy γ = 150°. Mindkét eset jó háromszöget ad.'
  },
  {
    id: 'pt-q24',
    questionTypeBadge: 'Koszinusztétel',
    level: 3,
    question: 'Az előző háromszögben (60 cm², 15 cm, 16 cm) mekkora a harmadik oldal, ha a közbezárt szög tompaszög?',
    options: ['≈ 29,94 cm', '≈ 8,08 cm', '31 cm', '≈ 21,93 cm'],
    correctAnswer: 0,
    explanation: 'c² = 15² + 16² − 2 · 15 · 16 · cos 150° ≈ 481 + 415,7 = 896,7 ⇒ c ≈ 29,94 cm. (A 30°-os esetben ≈ 8,08 cm.)'
  },
  {
    id: 'pt-q25',
    questionTypeBadge: 'Koszinusztétel',
    figure: FIG_PT_MAP,
    level: 3,
    question: 'Kaposvár–Békéscsaba 260 km, Békéscsaba–Miskolc 160 km, a Békéscsabánál lévő szög 91°. Mekkora a Kaposvár–Miskolc-távolság?',
    options: ['≈ 308 km', '≈ 305 km', '420 km', '≈ 100 km'],
    correctAnswer: 0,
    explanation: 'Koszinusztétellel: √(260² + 160² − 2 · 260 · 160 · cos 91°) ≈ 307,7 km. (A 305 km a 90°-kal számolt Pitagorasz-érték.) Az adatok pontossága miatt célszerűbb ≈ 310 km-nek mondani.'
  },
  {
    id: 'pt-q26',
    questionTypeBadge: 'Szinusztétel',
    level: 3,
    question: 'Ugyanezen a térképen Tatabánya–Miskolc 190 km, a Tatabányánál lévő szög (a Kaposvár–Tatabánya–Miskolc háromszögben) 126°. Mekkora a Kaposvár–Tatabánya-távolság?',
    options: ['≈ 155 km', '≈ 190 km', '≈ 118 km', '≈ 250 km'],
    correctAnswer: 0,
    explanation: 'Szinusztétel: sin K = 190 · sin 126° / 307,7 ⇒ K ≈ 30,0°; a Miskolcnál lévő szög 180° − 126° − 30,0° ≈ 24,0°; KT = 307,7 · sin 24,0° / sin 126° ≈ 155 km.'
  },
  {
    id: 'pt-q27',
    questionTypeBadge: 'Tompaszög tangense',
    level: 3,
    question: 'Melyik szögre igaz, hogy tg α = −1 (0° < α < 180°)?',
    options: ['135°', '45°', '−45°', 'Nincs ilyen szög'],
    correctAnswer: 0,
    explanation: 'Negatív tangens ⇒ tompaszög; tg 45° = 1, így tg 135° = −tg 45° = −1.'
  },
  {
    id: 'pt-q28',
    questionTypeBadge: 'Összehasonlítás',
    level: 3,
    question: 'Melyik a legkisebb az alábbiak közül?',
    options: ['tg 100°', 'tg 135°', 'tg 170°', 'tg 10°'],
    correctAnswer: 0,
    explanation: 'tg 100° = −tg 80° ≈ −5,671; tg 135° = −1; tg 170° ≈ −0,176; tg 10° ≈ 0,176. A 90°-hoz közeli tompaszög tangense nagy abszolút értékű negatív szám.'
  },
  {
    id: 'pt-q29',
    questionTypeBadge: 'Paralelogramma átlója',
    figure: <ParallelogramFig a="8 cm" b="6 cm" ang="30°" ask="diag" />,
    level: 3,
    question: 'Egy paralelogramma oldalai 6 cm és 8 cm, egyik szöge 30°. Mekkora a hosszabbik átlója?',
    options: ['≈ 13,5 cm', '≈ 4,1 cm', '10 cm', '14 cm'],
    correctAnswer: 0,
    explanation: 'A hosszabbik átló a 150°-os szöggel szemközti: √(36 + 64 − 2 · 6 · 8 · cos 150°) ≈ √183,1 ≈ 13,5 cm. (A rövidebbik ≈ 4,1 cm.)'
  },
  {
    id: 'pt-q30',
    questionTypeBadge: 'Igaz vagy hamis?',
    level: 3,
    question: 'Melyik állítás HAMIS?',
    options: [
      'Ha egy paralelogramma szögét a kiegészítő szögére cseréljük, a területe megváltozik',
      'A tompaszög tangense negatív',
      'A 90°-nak nincs tangense',
      'A paralelogramma két szomszédos szögének tangense egymás ellentettje'
    ],
    correctAnswer: 0,
    explanation: 'T = a · b · sin α, és sin(180° − α) = sin α, ezért a terület nem változik. A többi állítás igaz (90°-os szögű paralelogramma – téglalap – esetén a tangens nem értelmezett).'
  }
];

export const PolygonTrigQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="trigonometria"
      topicId="g11-trig-sokszogek-quiz"
      subtopicId="sokszogek-es-szogfuggvenyek"
      title="13. Sokszögek és szögfüggvények – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: a tompaszög tangense, sokszögek felbontása, térképes és területszámítási feladatok."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • KVÍZ"
      questions={POLYGON_TRIG_QUESTIONS}
      cheatSheets={[
        {
          title: 'A tompaszög tangense',
          items: [
            'tg α = sin α / cos α (α ≠ 90°).',
            'A 90°-nak nincs tangense (cos 90° = 0).',
            'Tompaszögre tg α < 0; tg(180° − α) = −tg α.',
            'tg 120° = −√3; tg 135° = −1; tg 150° = −√3/3'
          ]
        },
        {
          title: 'Sokszögek felbontása',
          items: [
            'Szimmetria, magasság, átló ⇒ háromszögek.',
            'Trapéz = paralelogramma + háromszög (alap − korona).',
            'Háromszög: T = ½ · a · b · sin γ; paralelogramma: T = a · b · sin α.',
            'sin γ ismeretében két szög jöhet szóba: γ és 180° − γ.'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            '42°-os szárszög: alapszögek 69°, szár ≈ 167,4 m, β ≈ 14,6°, α = γ ≈ 13,7°',
            'Töltés: rézsűszögek ≈ 49,7° és ≈ 43,6°, magasság ≈ 2,9 m',
            'Pécs–Budapest–Győr: ≈ 35,1°, ≈ 80,1°, ≈ 64,8°; T ≈ 9042 km² (≈ 9,7%)',
            'Előremetszés: d₁ ≈ 264 m, d₂ ≈ 196 m'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <PolygonTrigMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <PolygonTrigSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default PolygonTrigQuiz;
