import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { TrigRegularPolygonsMatcher } from './TrigRegularPolygonsMatcher';
import { TrigRegularPolygonsSorter } from './TrigRegularPolygonsSorter';

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

// Szabályos n-szög a körben: O(120,76), R = 60, a V0 csúcs felül
const NO: Pt = [120, 76];
const NR = 60;
const ngonPts = (n: number, start = 90): Pt[] =>
  Array.from({ length: n }, (_, k) => {
    const t = ((start - (k * 360) / n) * Math.PI) / 180;
    return [NO[0] + NR * Math.cos(t), NO[1] - NR * Math.sin(t)] as Pt;
  });

const NgonFig: React.FC<{
  n: number;
  angleLabel?: string;
  rLabel?: string;
  sideLabel?: string;
  diagLabel?: string;
  inradiusLabel?: string;
  extra?: React.ReactNode;
}> = ({ n, angleLabel, rLabel, sideLabel, diagLabel, inradiusLabel, extra }) => {
  const V = ngonPts(n);
  const out = (p: Pt, d: number): Pt => {
    const u = unitVec(NO, p);
    return [p[0] + d * u[0], p[1] + d * u[1]];
  };
  const mid = (p: Pt, q: Pt): Pt => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const sideMid = mid(V[0], V[1]);
  const sideLab = out(sideMid, 12);
  const diagMid = diagLabel ? mid(V[0], V[2]) : sideMid;
  const diagLab = out(diagMid, 12);
  const foot = n > 3 ? mid(V[Math.floor(n / 2)], V[Math.floor(n / 2) + 1 === n ? 0 : Math.floor(n / 2) + 1]) : sideMid;
  const angMid = out(mid(V[0], V[1]), 0);
  const angLab = (() => {
    const u = unitVec(NO, angMid);
    return [NO[0] + 28 * u[0], NO[1] + 28 * u[1] + 4] as Pt;
  })();
  return (
    <Fig>
      <circle cx={NO[0]} cy={NO[1]} r={NR} stroke="#94a3b8" strokeDasharray="4 3" />
      <polygon points={V.map((p) => `${f1(p[0])},${f1(p[1])}`).join(' ')} />
      <circle cx={NO[0]} cy={NO[1]} r={2} fill="#334155" stroke="none" />
      <Tx x={NO[0] - 6} y={NO[1] + 14} s={10}>O</Tx>
      {extra}
      {(rLabel || angleLabel) && <line x1={NO[0]} y1={NO[1]} x2={f1(V[0][0])} y2={f1(V[0][1])} stroke={BLUE} />}
      {rLabel && (
        <Tx x={NO[0] - 5} y={f1((NO[1] + V[0][1]) / 2 + 4)} s={10} a="end">
          {rLabel}
        </Tx>
      )}
      {angleLabel && (
        <g>
          <line x1={NO[0]} y1={NO[1]} x2={f1(V[1][0])} y2={f1(V[1][1])} stroke={BLUE} />
          <AngleArc v={NO} p1={V[0]} p2={V[1]} r={16} color={RED} />
          <Tx x={f1(angLab[0])} y={f1(angLab[1])} c={RED}>{angleLabel}</Tx>
        </g>
      )}
      {sideLabel && (
        <g>
          <line x1={f1(V[0][0])} y1={f1(V[0][1])} x2={f1(V[1][0])} y2={f1(V[1][1])} stroke={RED} strokeWidth={2.5} />
          <Tx x={f1(sideLab[0])} y={f1(sideLab[1])} c={RED} s={10} a="start">{sideLabel}</Tx>
        </g>
      )}
      {diagLabel && (
        <g>
          <line x1={f1(V[0][0])} y1={f1(V[0][1])} x2={f1(V[2][0])} y2={f1(V[2][1])} stroke={RED} strokeWidth={2} />
          <Tx x={f1(diagLab[0])} y={f1(diagLab[1])} c={RED} s={10} a="start">{diagLabel}</Tx>
        </g>
      )}
      {inradiusLabel && (
        <g>
          <line x1={NO[0]} y1={NO[1]} x2={f1(foot[0])} y2={f1(foot[1])} stroke={RED} strokeDasharray="4 3" strokeWidth={1.8} />
          <RightAngle v={foot} p1={NO} p2={V[Math.floor(n / 2)]} r={9} />
          <Tx x={NO[0] + 6} y={f1((NO[1] + foot[1]) / 2 + 4)} c={RED} s={10} a="start">{inradiusLabel}</Tx>
        </g>
      )}
    </Fig>
  );
};

// Körcikk / körív / körszelet: O(120,72), R = 58, a szögek matematikai irányban (fok)
const SO: Pt = [120, 72];
const SR = 58;
const sp = (deg: number, d = SR): Pt => [SO[0] + d * Math.cos((deg * Math.PI) / 180), SO[1] - d * Math.sin((deg * Math.PI) / 180)];

const SectorFig: React.FC<{
  a1: number;
  a2: number;
  mode: 'arc' | 'sector' | 'segment' | 'chord';
  rLabel?: string;
  angleLabel?: string;
  angleAsk?: boolean;
  right?: boolean;
  arcLabel?: string;
  areaLabel?: string;
  chordLabel?: string;
  angleDist?: number;
}> = ({ a1, a2, mode, rLabel, angleLabel, angleAsk, right, arcLabel, areaLabel, chordLabel, angleDist = 26 }) => {
  const P1 = sp(a1);
  const P2 = sp(a2);
  const large = a2 - a1 > 180 ? 1 : 0;
  const bis = (a1 + a2) / 2;
  const arcD = `M ${f1(P1[0])} ${f1(P1[1])} A ${SR} ${SR} 0 ${large} 0 ${f1(P2[0])} ${f1(P2[1])}`;
  const rMid = sp(a1, SR / 2);
  const rOff: Pt = [rMid[0] + 12 * Math.cos(((a1 - 90) * Math.PI) / 180), rMid[1] - 12 * Math.sin(((a1 - 90) * Math.PI) / 180)];
  const angLab = sp(bis, angleDist);
  const arcLab = sp(bis, SR + 12);
  const chordD = SR * Math.cos((((a2 - a1) / 2) * Math.PI) / 180);
  const chordLab = sp(bis, chordD + 12);
  const areaLab = mode === 'segment' ? sp(bis, SR + 12) : sp(bis, SR * 0.72);
  return (
    <Fig>
      <circle cx={SO[0]} cy={SO[1]} r={SR} stroke="#94a3b8" strokeDasharray="4 3" />
      {mode === 'sector' && <path d={`M ${SO[0]} ${SO[1]} L ${f1(P1[0])} ${f1(P1[1])} A ${SR} ${SR} 0 ${large} 0 ${f1(P2[0])} ${f1(P2[1])} Z`} fill="#bfdbfe" stroke="none" />}
      {mode === 'segment' && <path d={`${arcD} Z`} fill="#fecaca" stroke="none" />}
      <line x1={SO[0]} y1={SO[1]} x2={f1(P1[0])} y2={f1(P1[1])} />
      <line x1={SO[0]} y1={SO[1]} x2={f1(P2[0])} y2={f1(P2[1])} />
      {(mode === 'segment' || mode === 'chord') && <line x1={f1(P1[0])} y1={f1(P1[1])} x2={f1(P2[0])} y2={f1(P2[1])} stroke={BLUE} strokeWidth={2} />}
      <path d={arcD} stroke={mode === 'arc' ? RED : '#334155'} strokeWidth={mode === 'arc' ? 3 : 2} />
      <circle cx={SO[0]} cy={SO[1]} r={2} fill="#334155" stroke="none" />
      <Tx x={SO[0]} y={SO[1] - 6} s={10}>O</Tx>
      {right ? <RightAngle v={SO} p1={P1} p2={P2} r={12} /> : angleLabel && <AngleArc v={SO} p1={P1} p2={P2} r={14} color={angleAsk ? RED : BLUE} />}
      {angleLabel && (
        <Tx x={f1(angLab[0])} y={f1(angLab[1] + 4)} s={10} c={angleAsk ? RED : '#1e293b'}>
          {angleLabel}
        </Tx>
      )}
      {rLabel && (
        <Tx x={f1(rOff[0])} y={f1(rOff[1] + 4)} s={10}>
          {rLabel}
        </Tx>
      )}
      {arcLabel && (
        <Tx x={f1(arcLab[0])} y={f1(arcLab[1] + 4)} s={10} c={mode === 'arc' ? RED : '#1e293b'}>
          {arcLabel}
        </Tx>
      )}
      {chordLabel && (
        <Tx x={f1(chordLab[0])} y={f1(chordLab[1] + 4)} s={10} c={BLUE}>
          {chordLabel}
        </Tx>
      )}
      {areaLabel && (
        <Tx x={f1(areaLab[0])} y={f1(areaLab[1] + 4)} s={10} c={RED}>
          {areaLabel}
        </Tx>
      )}
    </Fig>
  );
};

const HALF_CHORD_DEG = (Math.asin(0.8) * 180) / Math.PI; // a 1,6r hosszú húr félszöge

const FIG_TRP_TABLE = (
  <Fig>
    <rect x={64} y={2} width={112} height={146} fill="#e0f2fe" stroke="#0284c7" strokeDasharray="4 3" />
    <path d="M 64 44 A 64 64 0 0 0 64 106 Z" fill="#fecaca" stroke="none" />
    <path d="M 176 44 A 64 64 0 0 1 176 106 Z" fill="#fecaca" stroke="none" />
    <circle cx={120} cy={75} r={64} />
    <line x1={64} y1={75} x2={176} y2={75} stroke={BLUE} />
    <line x1={64} y1={70} x2={64} y2={80} stroke={BLUE} />
    <line x1={176} y1={70} x2={176} y2={80} stroke={BLUE} />
    <Tx x={120} y={70} s={10} c={BLUE}>140 cm</Tx>
    <Tx x={44} y={79} c={RED}>?</Tx>
    <Tx x={196} y={79} c={RED}>?</Tx>
    <Tx x={210} y={146} s={10}>Ø 160 cm</Tx>
  </Fig>
);

const FIG_TRP_PIPE = (
  <Fig>
    <path d="M 63.4 92 A 60 60 0 0 0 176.6 92 Z" fill="#bae6fd" stroke="none" />
    <circle cx={120} cy={72} r={60} />
    <line x1={63.4} y1={92} x2={176.6} y2={92} stroke="#0284c7" strokeWidth={2} />
    <line x1={120} y1={72} x2={63.4} y2={92} strokeDasharray="4 3" />
    <line x1={120} y1={72} x2={176.6} y2={92} strokeDasharray="4 3" />
    <circle cx={120} cy={72} r={2} fill="#334155" stroke="none" />
    <Tx x={120} y={66} s={10}>O</Tx>
    <AngleArc v={[120, 72]} p1={[63.4, 92]} p2={[176.6, 92]} r={14} color={RED} />
    <Tx x={120} y={104} c={RED}>?</Tx>
    <line x1={200} y1={92} x2={200} y2={132} stroke={BLUE} />
    <line x1={195} y1={92} x2={205} y2={92} stroke={BLUE} />
    <line x1={195} y1={132} x2={205} y2={132} stroke={BLUE} />
    <Tx x={207} y={116} s={10} a="start" c={BLUE}>20 cm</Tx>
    <Tx x={120} y={146} s={10}>Ø 60 cm</Tx>
  </Fig>
);

const FIG_TRP_COIN = (
  <NgonFig
    n={7}
    extra={
      <g>
        <line x1={60} y1={76} x2={180} y2={76} stroke={BLUE} strokeDasharray="4 3" />
        <Tx x={150} y={71} s={10} c={BLUE}>27,3 mm</Tx>
      </g>
    }
  />
);

const TRIG_REGULAR_POLYGONS_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Fogalmak és képletek (1–10)
  {
    id: 'trp-q1',
    questionTypeBadge: 'Középponti szög',
    figure: <NgonFig n={9} angleLabel="?" />,
    level: 1,
    question: 'Mekkora a szabályos kilencszög egy oldalához tartozó középponti szög?',
    options: ['40°', '20°', '140°', '45°'],
    correctAnswer: 0,
    explanation: 'A 9 egybevágó háromszög a 360°-os teljes szöget egyenlően osztja fel: 360° : 9 = 40°. (A 140° a kilencszög belső szöge.)'
  },
  {
    id: 'trp-q2',
    questionTypeBadge: 'Középponti szög',
    level: 1,
    question: 'Mekkora a szabályos n-szög egy oldalához tartozó középponti szög?',
    options: ['360° : n', '180° : n', '(n − 2) · 180° : n', '360° · n'],
    correctAnswer: 0,
    explanation: 'A középpontból a csúcsokba húzott sugarak n egyenlő részre osztják a 360°-ot. A (n − 2) · 180° : n a belső szög, a 180° : n a középponti szög fele.'
  },
  {
    id: 'trp-q3',
    questionTypeBadge: 'Körív',
    level: 1,
    question: 'Mekkora az r sugarú kör α (fokban mért) középponti szögéhez tartozó körív hossza?',
    options: ['i = rπα / 180°', 'i = r²πα / 360°', 'i = rπα / 360°', 'i = 2rπα / 180°'],
    correctAnswer: 0,
    explanation: 'A körív a kerület (2rπ) 360-ad részének α-szorosa: i = 2rπ · α / 360° = rπα / 180°. Az r²πα / 360° a körcikk területe.'
  },
  {
    id: 'trp-q4',
    questionTypeBadge: 'Körcikk',
    level: 1,
    question: 'Mekkora az r sugarú kör α középponti szögű körcikkének területe?',
    options: ['t = r²πα / 360°', 't = r²πα / 180°', 't = rπα / 180°', 't = r² · sin α / 2'],
    correctAnswer: 0,
    explanation: 'A körcikk a körterület (r²π) 360-ad részének α-szorosa. Az r² · sin α / 2 az AOB háromszög területe, nem a körcikké.'
  },
  {
    id: 'trp-q5',
    questionTypeBadge: 'Körcikk',
    level: 1,
    question: 'Hogyan számolható ki a körcikk területe a körív hosszából (i) és a sugárból (r)?',
    options: ['t = i · r / 2', 't = i · r', 't = i · r²', 't = i / (2r)'],
    correctAnswer: 0,
    explanation: 't = r²πα / 360° = (rπα / 180°) · r / 2 = i · r / 2 – hasonlóan a háromszög „alap · magasság / 2” képletéhez.'
  },
  {
    id: 'trp-q6',
    questionTypeBadge: 'Körszelet',
    level: 1,
    question: 'Hogyan kapjuk meg az AB húr által levágott (kisebbik) körszelet területét?',
    options: [
      'Az AOB körcikk területéből kivonjuk az AOB háromszög területét',
      'Az AOB körcikk területéhez hozzáadjuk az AOB háromszög területét',
      'A kör területéből kivonjuk az AOB körcikk területét',
      'Az AOB háromszög területéből kivonjuk a körcikk területét'
    ],
    correctAnswer: 0,
    explanation: 'A körszelet a húr és az ív közötti rész: körcikk − AOB háromszög (tankönyvi elmélet, 2. pont).'
  },
  {
    id: 'trp-q7',
    questionTypeBadge: 'Területképlet',
    level: 1,
    question: 'Mekkora az AOB háromszög területe, ha OA = OB = r és AOB∠ = α?',
    options: ['r² · sin α / 2', 'r² · sin α', 'r · sin α / 2', 'r² · cos α / 2'],
    correctAnswer: 0,
    explanation: 'A szinuszos területképlet: T = OA · OB · sin α / 2 = r · r · sin α / 2.'
  },
  {
    id: 'trp-q8',
    questionTypeBadge: 'Szabályos hatszög',
    figure: <NgonFig n={6} rLabel="R" sideLabel="a = ?" />,
    level: 1,
    question: 'Mekkora az R sugarú körbe írt szabályos hatszög oldala?',
    options: ['R', 'R / 2', 'R · √3', '2R'],
    correctAnswer: 0,
    explanation: 'A középponti szög 60°, így a 6 háromszög szabályos: a = 2R · sin 30° = R.'
  },
  {
    id: 'trp-q9',
    questionTypeBadge: 'Arányosság',
    level: 1,
    question: 'Milyen kapcsolat van egy körben a középponti szög, a körív hossza és a körcikk területe között?',
    options: ['Egyenesen arányosak', 'Fordítottan arányosak', 'Csak a szög és a körív arányos', 'A körcikk területe a szög négyzetével arányos'],
    correctAnswer: 0,
    explanation: 'Kétszer akkora középponti szöghöz kétszer akkora körív és kétszer akkora körcikk tartozik – egyenes arányosság.'
  },
  {
    id: 'trp-q10',
    questionTypeBadge: 'Körív',
    figure: <SectorFig a1={225} a2={315} mode="arc" right rLabel="10 cm" angleLabel="90°" arcLabel="i = ?" />,
    level: 1,
    question: 'Mekkora a 10 cm sugarú kör 90°-os középponti szögéhez tartozó körív?',
    options: ['5π ≈ 15,71 cm', '10π ≈ 31,42 cm', '25π ≈ 78,54 cm', '2,5π ≈ 7,85 cm'],
    correctAnswer: 0,
    explanation: 'i = rπα / 180° = 10 · π · 90° / 180° = 5π ≈ 15,71 cm (a kerület negyede). A 25π a negyedkör területe.'
  },

  // LEVEL 2: Számolás (11–20)
  {
    id: 'trp-q11',
    questionTypeBadge: 'Szabályos sokszög',
    figure: <NgonFig n={9} rLabel="17,5 cm" sideLabel="x = ?" />,
    level: 2,
    question: 'A dísztárcsa szabályos kilencszögének köré írt köre 17,5 cm sugarú. Mekkora a kilencszög oldala?',
    options: ['≈ 12 cm', '≈ 6 cm', '≈ 11,25 cm', '≈ 16,4 cm'],
    correctAnswer: 0,
    explanation: 'x = 2 · 17,5 · sin 20° ≈ 11,97 ≈ 12 cm. (17,5 · sin 40° ≈ 11,25 a tipikus hiba, 17,5 · cos 20° ≈ 16,4 a beírt kör sugara.)'
  },
  {
    id: 'trp-q12',
    questionTypeBadge: 'Sokszög területe',
    level: 2,
    question: 'Mekkora a 17,5 cm sugarú körbe írt szabályos kilencszög területe?',
    options: ['≈ 886 cm²', '≈ 98,4 cm²', '≈ 1772 cm²', '≈ 962 cm²'],
    correctAnswer: 0,
    explanation: 'T(AOB) = ½ · 17,5² · sin 40° ≈ 98,4 cm², a kilencszög ennek 9-szerese: ≈ 886 cm². (A 962 cm² a kör területe.)'
  },
  {
    id: 'trp-q13',
    questionTypeBadge: 'Körív',
    figure: <SectorFig a1={240} a2={300} mode="arc" rLabel="6 cm" angleLabel="60°" angleDist={22} arcLabel="i = ?" />,
    level: 2,
    question: 'Egy 6 cm sugarú körben mekkora a 60°-os középponti szöghöz tartozó körív?',
    options: ['2π ≈ 6,28 cm', 'π ≈ 3,14 cm', '4π ≈ 12,57 cm', '6π ≈ 18,85 cm'],
    correctAnswer: 0,
    explanation: 'i = 6 · π · 60° / 180° = 2π ≈ 6,28 cm (a kerület hatoda).'
  },
  {
    id: 'trp-q14',
    questionTypeBadge: 'Körcikk',
    figure: <SectorFig a1={240} a2={300} mode="sector" rLabel="6 cm" angleLabel="60°" angleDist={22} areaLabel="t = ?" />,
    level: 2,
    question: 'Egy 6 cm sugarú körben mekkora a 60°-os középponti szögű körcikk területe?',
    options: ['6π ≈ 18,85 cm²', '12π ≈ 37,70 cm²', '3π ≈ 9,42 cm²', '36π ≈ 113,10 cm²'],
    correctAnswer: 0,
    explanation: 't = 6² · π · 60° / 360° = 6π ≈ 18,85 cm² (a körterület hatoda). A 36π a teljes kör területe.'
  },
  {
    id: 'trp-q15',
    questionTypeBadge: 'Körcikk',
    figure: <SectorFig a1={198.4} a2={341.6} mode="sector" rLabel="4 cm" arcLabel="i = 10 cm" areaLabel="t = ?" />,
    level: 2,
    question: 'Egy 4 cm sugarú kör egyik körívének hossza 10 cm. Mekkora a hozzá tartozó körcikk területe?',
    options: ['20 cm²', '40 cm²', '80 cm²', '10 cm²'],
    correctAnswer: 0,
    explanation: 't = i · r / 2 = 10 · 4 / 2 = 20 cm².'
  },
  {
    id: 'trp-q16',
    questionTypeBadge: 'Körszelet',
    figure: <SectorFig a1={225} a2={315} mode="segment" right rLabel="10 cm" angleLabel="90°" areaLabel="t = ?" />,
    level: 2,
    question: 'Egy 10 cm sugarú körben mekkora a 90°-os középponti szöghöz tartozó (kisebbik) körszelet területe?',
    options: ['≈ 28,54 cm²', '≈ 78,54 cm²', '50 cm²', '≈ 128,54 cm²'],
    correctAnswer: 0,
    explanation: 'Körcikk: 25π ≈ 78,54 cm²; háromszög: 10² · sin 90° / 2 = 50 cm². Körszelet: 78,54 − 50 ≈ 28,54 cm².'
  },
  {
    id: 'trp-q17',
    questionTypeBadge: 'Beírt négyzet',
    figure: <NgonFig n={4} rLabel="5 cm" sideLabel="?" />,
    level: 2,
    question: 'Mekkora az 5 cm sugarú körbe írt négyzet oldala?',
    options: ['≈ 7,07 cm', '5 cm', '10 cm', '≈ 3,54 cm'],
    correctAnswer: 0,
    explanation: 'n = 4: a = 2 · 5 · sin 45° = 5√2 ≈ 7,07 cm (a négyzet átlója a kör átmérője, 10 cm).'
  },
  {
    id: 'trp-q18',
    questionTypeBadge: 'Sokszög területe',
    level: 2,
    question: 'Mekkora a 4 cm sugarú körbe írt szabályos hatszög területe?',
    options: ['≈ 41,57 cm²', '≈ 83,14 cm²', '≈ 50,27 cm²', '24 cm²'],
    correctAnswer: 0,
    explanation: 'T = 6 · 4² · sin 60° / 2 = 48 · 0,866 ≈ 41,57 cm². (A 2-vel való osztás nélkül 83,14 jönne ki, a kör területe 16π ≈ 50,27 cm².)'
  },
  {
    id: 'trp-q19',
    questionTypeBadge: 'Húr és középponti szög',
    figure: <SectorFig a1={270 - HALF_CHORD_DEG} a2={270 + HALF_CHORD_DEG} mode="chord" rLabel="8,4 cm" chordLabel="13,44 cm" angleLabel="α = ?" angleAsk angleDist={18} />,
    level: 2,
    question: 'Egy 8,4 cm sugarú körben az AB húr 1,6-szer akkora, mint a sugár. Mekkora az AOB középponti szög?',
    options: ['≈ 106,26°', '≈ 53,13°', '≈ 73,74°', '≈ 96°'],
    correctAnswer: 0,
    explanation: 'Az AOB háromszög magassága felezi a szöget és a húrt: sin(α/2) = 0,8r / r = 0,8 ⇒ α/2 ≈ 53,13°, α ≈ 106,26°. (A 53,13° csak a fele.)'
  },
  {
    id: 'trp-q20',
    questionTypeBadge: 'Beírt kör sugara',
    figure: <NgonFig n={5} rLabel="70 cm" inradiusLabel="ρ = ?" />,
    level: 2,
    question: 'Egy szabályos ötszög alakú terítő csúcsai 70 cm-re vannak a középponttól. Mekkora a beírt kör sugara?',
    options: ['≈ 56,6 cm', '≈ 41,1 cm', '35 cm', '≈ 66,6 cm'],
    correctAnswer: 0,
    explanation: 'ρ = R · cos(180° : 5) = 70 · cos 36° ≈ 56,6 cm. (70 · sin 36° ≈ 41,1 cm az oldal fele.)'
  },

  // LEVEL 3: Összetett, szöveges feladatok (21–30)
  {
    id: 'trp-q21',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG_TRP_TABLE,
    level: 3,
    question: 'Egy 140 cm széles, 160 cm-nél hosszabb terítőt a 160 cm átmérőjű kerek asztalra teszünk úgy, hogy a középpontjuk egybeesik. Mekkora az asztallap fedetlen része?',
    options: ['≈ 1046 cm²', '≈ 523 cm²', '≈ 1600 cm²', '≈ 20 106 cm²'],
    correctAnswer: 0,
    explanation: 'A terítő szélei 70 cm-re vannak a középponttól: cos(α/2) = 70/80 ⇒ α ≈ 57,91°. Egy körszelet ≈ 523,2 cm², a két oldalon együtt ≈ 1046 cm².'
  },
  {
    id: 'trp-q22',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG_TRP_PIPE,
    level: 3,
    question: 'Egy 60 cm átmérőjű vízszintes csőben 20 cm magasan áll a víz. Mekkora középponti szög tartozik a vízfelszínt jelölő húrhoz?',
    options: ['≈ 141,06°', '≈ 70,53°', '≈ 109,47°', '≈ 96,38°'],
    correctAnswer: 0,
    explanation: 'A vízfelszín 30 − 20 = 10 cm-re van a középpont alatt: cos(α/2) = 10/30 ⇒ α/2 ≈ 70,53°, α ≈ 141,06°.'
  },
  {
    id: 'trp-q23',
    questionTypeBadge: 'Térfogat',
    level: 3,
    question: 'Az előző csőszakasz 2,6 m hosszú. Körülbelül mennyi víz van benne?',
    options: ['≈ 214,5 liter', '≈ 825 liter', '≈ 735 liter', '≈ 107 liter'],
    correctAnswer: 0,
    explanation: 'Körszelet: 30²π · 141,06° / 360° − ½ · 30² · sin 141,06° ≈ 825,0 cm². V ≈ 825,0 · 260 ≈ 214 500 cm³ ≈ 214,5 l. (A teli cső kb. 735 l lenne.)'
  },
  {
    id: 'trp-q24',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG_TRP_COIN,
    level: 3,
    question: 'Az 50 pennys érme alaplapja szabályos hétszög, a köré írt kör átmérője 27,3 mm, vastagsága 1,8 mm, sűrűsége 8,7 g/cm³. Kb. hány gramm fém kell hozzá?',
    options: ['≈ 8 g', '≈ 5,1 g', '≈ 0,92 g', '≈ 32 g'],
    correctAnswer: 0,
    explanation: 'R = 1,365 cm, T = 7 · 1,365² · sin(360°/7) / 2 ≈ 5,10 cm², V ≈ 5,10 · 0,18 ≈ 0,918 cm³, m ≈ 0,918 · 8,7 ≈ 8 g. (Ha az átmérőt sugárnak vesszük, kb. 32 g jön ki.)'
  },
  {
    id: 'trp-q25',
    questionTypeBadge: 'Kerület',
    level: 3,
    question: 'A 70 cm-es csúcstávolságú szabályos ötszög alakú terítő szélén díszzsinórt vezetnek végig. Milyen hosszú zsinór kell?',
    options: ['≈ 411,4 cm', '≈ 439,8 cm', '≈ 205,7 cm', '350 cm'],
    correctAnswer: 0,
    explanation: 'Oldal: a = 2 · 70 · sin 36° ≈ 82,29 cm, kerület: 5 · 82,29 ≈ 411,4 cm. (A 439,8 cm a köré írt kör kerülete.)'
  },
  {
    id: 'trp-q26',
    questionTypeBadge: 'Átló',
    figure: <NgonFig n={5} rLabel="70 cm" diagLabel="d = ?" />,
    level: 3,
    question: 'Milyen hosszúak ugyanennek a szabályos ötszögnek (R = 70 cm) az átlói?',
    options: ['≈ 133,1 cm', '≈ 82,3 cm', '≈ 113,3 cm', '140 cm'],
    correctAnswer: 0,
    explanation: 'Az átló két oldalt „ugrik át”, így 2 · 72° = 144°-os középponti szög tartozik hozzá: d = 2 · 70 · sin 72° ≈ 133,1 cm.'
  },
  {
    id: 'trp-q27',
    questionTypeBadge: 'Körszelet',
    figure: <SectorFig a1={270 - HALF_CHORD_DEG} a2={270 + HALF_CHORD_DEG} mode="segment" rLabel="8,4 cm" chordLabel="13,44 cm" areaLabel="t = ?" />,
    level: 3,
    question: 'Egy 8,4 cm sugarú körben az AB húr 13,44 cm (= 1,6r). Mekkora a húr által levágott kisebbik körszelet területe?',
    options: ['≈ 31,56 cm²', '≈ 65,43 cm²', '≈ 33,87 cm²', '≈ 190,11 cm²'],
    correctAnswer: 0,
    explanation: 'α ≈ 106,26°; körcikk ≈ 65,43 cm²; háromszög ≈ 33,87 cm²; körszelet ≈ 65,43 − 33,87 ≈ 31,56 cm². A 190,11 cm² a nagyobbik körszelet.'
  },
  {
    id: 'trp-q28',
    questionTypeBadge: 'Határérték',
    level: 3,
    question: 'Mihez tart az R sugarú körbe írt szabályos n-szög területe, ha n minden határon túl nő?',
    options: ['R²π-hez, a kör területéhez', 'Korlátlanul nő', '2R²-hez', '4R²-hez, a köré írt négyzet területéhez'],
    correctAnswer: 0,
    explanation: 'A beírt sokszögek mindig a körön belül vannak, és egyre jobban kitöltik a kört: T = n · R² · sin(360°/n) / 2 → R²π. (2R² a beírt négyzet területe.)'
  },
  {
    id: 'trp-q29',
    questionTypeBadge: 'Sokszög területe',
    level: 3,
    question: 'Mekkora az 1 egység sugarú körbe írt szabályos 12-szög területe?',
    options: ['Pontosan 3', '≈ 3,14', '≈ 2,6', '6'],
    correctAnswer: 0,
    explanation: 'T = 12 · 1² · sin 30° / 2 = 12 · 0,5 / 2 = 3. (A szabályos hatszögé ≈ 2,6, a körlapé π ≈ 3,14.)'
  },
  {
    id: 'trp-q30',
    questionTypeBadge: 'Körcikk',
    level: 3,
    question: 'Egy 10 cm sugarú körben egy körcikk területe 50 cm². Mekkora a középponti szöge?',
    options: ['≈ 57,3°', '≈ 28,6°', '≈ 114,6°', '50°'],
    correctAnswer: 0,
    explanation: 'r²πα / 360° = 50 ⇒ α = 360° · 50 / (100π) ≈ 57,3°. (Ilyenkor a körív hossza éppen a sugárral egyenlő: i = 2t / r = 10 cm.)'
  }
];

export const TrigRegularPolygonsQuiz: React.FC<{
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
      topicId="g11-trig-szabalyos-sokszogek-quiz"
      subtopicId="a-kor-es-a-szabalyos-sokszogek"
      title="14. A kör és a szabályos sokszögek – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: szabályos sokszögek oldala és területe, körív, körcikk, körszelet."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • KVÍZ"
      questions={TRIG_REGULAR_POLYGONS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Szabályos n-szög (R: köré írt kör sugara)',
          items: [
            'középponti szög: 360° : n',
            'oldal: a = 2R · sin(180° : n)',
            'beírt kör sugara: ρ = R · cos(180° : n)',
            'terület: T = n · R² · sin(360° : n) / 2'
          ]
        },
        {
          title: 'Körív, körcikk, körszelet',
          items: [
            'körív: i = rπα / 180°',
            'körcikk: t = r²πα / 360° = i · r / 2',
            'AOB háromszög: r² · sin α / 2',
            'körszelet = körcikk − AOB háromszög'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            'Kilencszög, R = 17,5 cm: a ≈ 12 cm, T ≈ 886 cm²',
            'Húr 1,6r (r = 8,4 cm): α ≈ 106,26°, körszelet ≈ 31,56 cm²',
            'Cső (r = 30 cm, 20 cm víz): α ≈ 141,06°, ≈ 214,5 l víz',
            'Ötszög, R = 70 cm: ρ ≈ 56,6 cm, K ≈ 411,4 cm, átló ≈ 133,1 cm'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <TrigRegularPolygonsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <TrigRegularPolygonsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default TrigRegularPolygonsQuiz;
