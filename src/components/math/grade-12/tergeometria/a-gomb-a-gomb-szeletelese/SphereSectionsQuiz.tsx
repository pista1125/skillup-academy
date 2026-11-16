import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SphereSectionsMatcher } from './SphereSectionsMatcher';
import { SphereSectionsSorter } from './SphereSectionsSorter';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek (nem exportált)
// Derékszög jelölése: negyedkörív ponttal (magyar jelölés).
// ---------------------------------------------------------------------------
type FPt = [number, number];
const fR = (n: number) => Math.round(n * 10) / 10;
const fUnit = (p: FPt): FPt => {
  const l = Math.hypot(p[0], p[1]) || 1;
  return [p[0] / l, p[1] / l];
};
const F_INK = '#0f172a';
const F_SPH = '#2563eb';
const F_SEC = '#059669';
const F_RAD = '#dc2626';
const F_UNK = '#dc2626';
const F_AUX = '#64748b';

const QFig: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <svg viewBox="0 0 240 150" className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height="148" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {title && (
      <text x="120" y="15" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#334155">
        {title}
      </text>
    )}
    {children}
  </svg>
);

const QText: React.FC<{ p: FPt; t: string; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }> = ({
  p,
  t,
  size = 11,
  color,
  anchor = 'middle'
}) => (
  <text
    x={fR(p[0])}
    y={fR(p[1])}
    fontSize={size}
    fontWeight="bold"
    textAnchor={anchor}
    dominantBaseline="middle"
    fill={t.includes('?') ? F_UNK : color ?? F_INK}
  >
    {t}
  </text>
);

const QRight: React.FC<{ v: FPt; p1: FPt; p2: FPt; r?: number }> = ({ v, p1, p2, r = 10 }) => {
  const u1 = fUnit([p1[0] - v[0], p1[1] - v[1]]);
  const u2 = fUnit([p2[0] - v[0], p2[1] - v[1]]);
  const s: FPt = [v[0] + u1[0] * r, v[1] + u1[1] * r];
  const e: FPt = [v[0] + u2[0] * r, v[1] + u2[1] * r];
  const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
  const b = fUnit([u1[0] + u2[0], u1[1] + u2[1]]);
  return (
    <g>
      <path d={`M ${fR(s[0])} ${fR(s[1])} A ${r} ${r} 0 0 ${sweep} ${fR(e[0])} ${fR(e[1])}`} fill="none" stroke={F_INK} strokeWidth="1.2" />
      <circle cx={fR(v[0] + b[0] * r * 0.55)} cy={fR(v[1] + b[1] * r * 0.55)} r="1.6" fill={F_INK} />
    </g>
  );
};

/** Elöl folytonos, hátul szaggatott vízszintes ellipszis. */
const QEll: React.FC<{ cx: number; cy: number; rx: number; ry: number; color?: string; fill?: string }> = ({ cx, cy, rx, ry, color = F_SEC, fill }) => (
  <g>
    {fill && <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} />}
    <path d={`M ${fR(cx - rx)} ${cy} A ${fR(rx)} ${fR(ry)} 0 0 1 ${fR(cx + rx)} ${cy}`} fill="none" stroke={color} strokeWidth="1.4" strokeDasharray="4 3" />
    <path d={`M ${fR(cx - rx)} ${cy} A ${fR(rx)} ${fR(ry)} 0 0 0 ${fR(cx + rx)} ${cy}`} fill="none" stroke={color} strokeWidth="1.6" />
  </g>
);

/**
 * A gömb középponton átmenő, a metsző síkra merőleges metszete:
 * kör, a metsző sík nyomvonala d távolságra, OQP derékszögű háromszög.
 */
const SecFig: React.FC<{ ratio: number; R?: string; r?: string; d?: string; title?: string; note?: string }> = ({ ratio, R, r, d, title, note }) => {
  const C: FPt = [85, 86];
  const RP = 56;
  const dp = ratio * RP;
  const rp = Math.sqrt(RP * RP - dp * dp);
  const Q: FPt = [C[0], C[1] - dp];
  const P: FPt = [C[0] + rp, C[1] - dp];
  return (
    <QFig title={title}>
      <circle cx={C[0]} cy={C[1]} r={RP} fill="rgba(37,99,235,0.06)" stroke={F_SPH} strokeWidth="1.8" />
      <line x1={C[0] - rp} y1={Q[1]} x2={P[0]} y2={P[1]} stroke={F_SEC} strokeWidth="2.2" />
      <line x1={C[0]} y1={C[1]} x2={Q[0]} y2={Q[1]} stroke={F_RAD} strokeWidth="1.8" />
      <line x1={C[0]} y1={C[1]} x2={P[0]} y2={P[1]} stroke={F_SPH} strokeWidth="1.8" />
      {dp > 6 && <QRight v={Q} p1={C} p2={P} r={8} />}
      <circle cx={C[0]} cy={C[1]} r="2.2" fill={F_INK} />
      <QText p={[C[0] - 8, C[1] + 8]} t="O" size={10} />
      {d && <QText p={[C[0] - 6, C[1] - dp / 2]} t={d} anchor="end" color={F_RAD} />}
      {r && <QText p={[(Q[0] + P[0]) / 2, Q[1] - 8]} t={r} color={F_SEC} />}
      {R && <QText p={[(C[0] + P[0]) / 2 + 9, (C[1] + P[1]) / 2 + 7]} t={R} anchor="start" color={F_SPH} />}
      {note && (
        <text x="160" y="80" fontSize="10" fill={F_AUX} fontWeight="bold">
          {note.split('|').map((ln, i) => (
            <tspan key={i} x="160" dy={i === 0 ? 0 : 13}>
              {ln}
            </tspan>
          ))}
        </text>
      )}
    </QFig>
  );
};

/** Térbeli gömb a síkmetszettel. */
const Sphere3DFig: React.FC<{ ratio: number; title?: string; labels?: { R?: string; d?: string; r?: string } }> = ({ ratio, title, labels = {} }) => {
  const C: FPt = [120, 84];
  const RP = 54;
  const dp = ratio * RP;
  const rp = Math.sqrt(RP * RP - dp * dp);
  return (
    <QFig title={title}>
      <circle cx={C[0]} cy={C[1]} r={RP} fill="rgba(251,146,60,0.12)" stroke="#ea580c" strokeWidth="1.8" />
      <QEll cx={C[0]} cy={C[1]} rx={RP} ry={RP * 0.28} color="#fdba74" />
      <QEll cx={C[0]} cy={C[1] - dp} rx={rp} ry={rp * 0.28} color={F_SEC} fill="rgba(16,185,129,0.15)" />
      <line x1={C[0]} y1={C[1]} x2={C[0]} y2={C[1] - dp} stroke={F_RAD} strokeWidth="1.8" />
      <line x1={C[0]} y1={C[1] - dp} x2={C[0] + rp} y2={C[1] - dp} stroke={F_SEC} strokeWidth="1.8" />
      <line x1={C[0]} y1={C[1]} x2={C[0] - RP} y2={C[1]} stroke={F_SPH} strokeWidth="1.6" />
      <circle cx={C[0]} cy={C[1]} r="2.2" fill={F_INK} />
      <QText p={[C[0] + 7, C[1] + 8]} t="O" size={10} />
      {labels.R && <QText p={[C[0] - RP / 2, C[1] - 8]} t={labels.R} color={F_SPH} />}
      {labels.d && <QText p={[C[0] - 8, C[1] - dp / 2]} t={labels.d} anchor="end" color={F_RAD} />}
      {labels.r && <QText p={[C[0] + rp / 2, C[1] - dp - 8]} t={labels.r} color={F_SEC} />}
    </QFig>
  );
};

// --- egyedi ábrák ---
const FIG_MELON = (
  <QFig title="20 cm átmérő, 5 db 4 cm-es rész">
    <circle cx="90" cy="82" r="60" fill="rgba(34,197,94,0.12)" stroke="#16a34a" strokeWidth="1.8" />
    {[-36, -12, 12, 36].map((y) => {
      const h = Math.sqrt(3600 - y * y);
      return <line key={y} x1={90 - h} y1={82 - y} x2={90 + h} y2={82 - y} stroke={F_RAD} strokeWidth="1.6" />;
    })}
    {[-60, -36, -12, 12, 36, 60].map((y) => (
      <line key={`t${y}`} x1="18" y1={82 - y} x2="24" y2={82 - y} stroke={F_INK} strokeWidth="1.2" />
    ))}
    <line x1="21" y1="22" x2="21" y2="142" stroke={F_INK} strokeWidth="1" />
    <QText p={[12, 34]} t="4" size={9.5} />
    <QText p={[12, 130]} t="4" size={9.5} />
    <QText p={[150, 46]} t="r₁ = ?" anchor="start" />
    <line x1="132" y1="46" x2="146" y2="46" stroke={F_AUX} strokeWidth="1" />
    <circle cx="90" cy="82" r="2" fill={F_INK} />
  </QFig>
);

const FIG_CUBE_EDGE = (
  <QFig title="Élre merőleges metszet a középponton át">
    <rect x="70" y="35" width="100" height="100" fill="rgba(15,23,42,0.04)" stroke={F_INK} strokeWidth="1.6" />
    <circle cx="120" cy="85" r={50 * Math.SQRT2} fill="none" stroke={F_SPH} strokeWidth="1.5" strokeDasharray="4 3" />
    <line x1="120" y1="85" x2="170" y2="35" stroke={F_RAD} strokeWidth="1.8" />
    <circle cx="120" cy="85" r="2.2" fill={F_INK} />
    <QText p={[154, 66]} t="R = ?" anchor="start" />
    <QText p={[120, 143]} t="8 cm" size={10} />
  </QFig>
);

const FIG_CUBE_FACE = (
  <QFig title="A kocka egy lapja">
    <defs>
      <mask id="ssq-face-mask">
        <rect x="70" y="30" width="100" height="100" fill="white" />
        <circle cx="120" cy="80" r="50" fill="black" />
      </mask>
    </defs>
    <rect x="70" y="30" width="100" height="100" fill="#f59e0b" opacity="0.4" mask="url(#ssq-face-mask)" />
    <rect x="70" y="30" width="100" height="100" fill="none" stroke={F_INK} strokeWidth="1.6" />
    <circle cx="120" cy="80" r="50" fill="none" stroke={F_SEC} strokeWidth="1.6" />
    <QText p={[120, 140]} t="8 cm" size={10} />
    <QText p={[205, 80]} t="T = ?" />
    <text x="186" y="100" fontSize="9" fill={F_AUX}>(6 lapon)</text>
  </QFig>
);

const FIG_EARTH = (
  <QFig title="Ráktérítő: É 23°26′">
    <circle cx="95" cy="82" r="58" fill="rgba(37,99,235,0.08)" stroke={F_SPH} strokeWidth="1.8" />
    <line x1="37" y1="82" x2="153" y2="82" stroke={F_AUX} strokeWidth="1.2" strokeDasharray="4 3" />
    {(() => {
      const a = (23.43 * Math.PI) / 180;
      const P: FPt = [95 + 58 * Math.cos(a), 82 - 58 * Math.sin(a)];
      const Q: FPt = [95, P[1]];
      return (
        <g>
          <line x1={95 - (P[0] - 95)} y1={P[1]} x2={P[0]} y2={P[1]} stroke={F_SEC} strokeWidth="2" />
          <line x1="95" y1="82" x2={P[0]} y2={P[1]} stroke={F_INK} strokeWidth="1.6" />
          <line x1="95" y1="82" x2="95" y2={Q[1]} stroke={F_RAD} strokeWidth="1.2" />
          <path d={`M 120 82 A 25 25 0 0 0 ${fR(95 + 25 * Math.cos(a))} ${fR(82 - 25 * Math.sin(a))}`} fill="none" stroke="#d97706" strokeWidth="1.4" />
          <QText p={[136, 74]} t="23°26′" size={8.5} color="#b45309" anchor="start" />
          <QText p={[118, 52]} t="6371" size={9} />
          <QText p={[120, Q[1] - 8]} t="r = ?" size={10} />
        </g>
      );
    })()}
    <circle cx="95" cy="82" r="2" fill={F_INK} />
    <text x="160" y="100" fontSize="9" fill={F_AUX}>Egyenlítő síkja</text>
  </QFig>
);

const FIG_DOME = (
  <QFig title="Gömbsüveg alakú kupola">
    {(() => {
      const s = 2.2;
      const Rg = 27.53 * s;
      const base = 92;
      const O: FPt = [120, base + (27.53 - 16) * s];
      const half = 25 * s;
      return (
        <g>
          <path d={`M ${fR(120 - half)} ${base} A ${fR(Rg)} ${fR(Rg)} 0 0 1 ${fR(120 + half)} ${base} Z`} fill="rgba(37,99,235,0.12)" stroke={F_SPH} strokeWidth="1.8" />
          <line x1="20" y1={base} x2="220" y2={base} stroke="#94a3b8" strokeWidth="1.4" />
          <line x1="120" y1={base - 16 * s} x2="120" y2={O[1]} stroke={F_RAD} strokeWidth="1.3" strokeDasharray="4 3" />
          <line x1="120" y1={O[1]} x2={120 + half} y2={base} stroke={F_SPH} strokeWidth="1.5" />
          <QRight v={[120, base]} p1={[120, base - 20]} p2={[140, base]} r={7} />
          <circle cx="120" cy={O[1]} r="2" fill={F_INK} />
          <QText p={[110, O[1] + 4]} t="O" size={10} />
          <QText p={[100, base - 18]} t="16 m" size={9.5} anchor="end" />
          <QText p={[120, base + 30]} t="alapkör átmérője 50 m" size={9.5} />
          <QText p={[156, base + 8]} t="R = ?" size={10} anchor="start" />
        </g>
      );
    })()}
  </QFig>
);

const FIG_AXIS = (
  <QFig title="R = 6,2 cm; síkok az egész számoknál">
    <circle cx="120" cy="80" r="62" fill="rgba(37,99,235,0.06)" stroke={F_SPH} strokeWidth="1.6" />
    <line x1="40" y1="80" x2="200" y2="80" stroke={F_INK} strokeWidth="1.2" />
    {Array.from({ length: 15 }, (_, i) => i - 7).map((k) => (
      <line key={k} x1={120 + k * 10} y1="14" x2={120 + k * 10} y2="146" stroke={Math.abs(k) <= 6 ? F_SEC : '#cbd5e1'} strokeWidth="0.8" />
    ))}
    <QText p={[120, 90]} t="0" size={9} />
    <QText p={[130, 90]} t="1" size={9} />
  </QFig>
);

const FIG_TWO_PLANES = (
  <QFig title="Két párhuzamos sík, a középpont egyik oldalán">
    <circle cx="90" cy="86" r="56" fill="rgba(37,99,235,0.06)" stroke={F_SPH} strokeWidth="1.6" />
    <line x1={90 - 33.6} y1={86 - 44.8} x2={90 + 33.6} y2={86 - 44.8} stroke={F_SEC} strokeWidth="2" />
    <line x1={90 - 44.8} y1={86 - 33.6} x2={90 + 44.8} y2={86 - 33.6} stroke={F_SEC} strokeWidth="2" />
    <circle cx="90" cy="86" r="2" fill={F_INK} />
    <QText p={[82, 94]} t="O" size={10} />
    <QText p={[150, 38]} t="r = 3 cm" size={9.5} anchor="start" />
    <QText p={[150, 54]} t="r = 4 cm" size={9.5} anchor="start" />
    <QText p={[150, 100]} t="R = 5 cm" size={9.5} anchor="start" color={F_SPH} />
    <QText p={[150, 120]} t="távolságuk = ?" size={9.5} anchor="start" />
  </QFig>
);

const FIG_CAPS = (
  <QFig title="R = 10 cm, d = 6 cm">
    <path d="M 45.2 52.4 A 56 56 0 0 1 134.8 52.4 Z" fill="rgba(245,158,11,0.3)" stroke="none" />
    <circle cx="90" cy="86" r="56" fill="none" stroke={F_SPH} strokeWidth="1.6" />
    <line x1={90 - 44.8} y1={86 - 33.6} x2={90 + 44.8} y2={86 - 33.6} stroke={F_SEC} strokeWidth="2" />
    <line x1="90" y1="86" x2="90" y2={86 - 33.6} stroke={F_RAD} strokeWidth="1.5" />
    <circle cx="90" cy="86" r="2" fill={F_INK} />
    <QText p={[82, 94]} t="O" size={10} />
    <QText p={[100, 70]} t="6" size={10} color={F_RAD} anchor="start" />
    <QText p={[165, 40]} t="m = ?" size={10} anchor="start" />
    <line x1="140" y1="30" x2="162" y2="40" stroke={F_AUX} strokeWidth="1" />
  </QFig>
);

const SPHERE_SECTIONS_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'ss-q1',
    questionTypeBadge: 'Fogalom',
    level: 1,
    question: 'Mi a gömbfelület?',
    options: [
      'A tér egy adott pontjától adott távolságra lévő pontok halmaza',
      'A sík egy adott pontjától adott távolságra lévő pontok halmaza',
      'A tér egy adott pontjától legfeljebb adott távolságra lévő pontok halmaza',
      'Egy kör kerületének pontjai'
    ],
    correctAnswer: 0,
    explanation: 'A gömbfelület térbeli alakzat: a tér egy adott pontjától (középpont) adott távolságra (sugár) lévő pontok halmaza. A síkban ugyanez a körvonal lenne; a „legfeljebb” a gömb (test) pontjait adja.'
  },
  {
    id: 'ss-q2',
    questionTypeBadge: 'Főkör',
    level: 1,
    question: 'Mekkora egy 7 cm sugarú gömb főkörének sugara?',
    options: ['7 cm', '3,5 cm', '14 cm', '√7 cm'],
    correctAnswer: 0,
    explanation: 'A főkört a középponton átmenő sík metszi ki (d = 0), ezért sugara egyenlő a gömb sugarával: r = R = 7 cm.'
  },
  {
    id: 'ss-q3',
    questionTypeBadge: 'Síkmetszet',
    level: 1,
    question: 'Milyen alakzatot metsz ki egy metsző sík a gömbből?',
    options: ['Kört (a gömbfelületből körvonalat)', 'Ellipszist', 'Négyzetet', 'Mindig félkört'],
    correctAnswer: 0,
    explanation: 'Bármely metsző sík a gömböt egy körben, a gömbfelületet egy körvonalban metszi. (Ferde nézetben rajzolva látszik ellipszisnek, de valójában kör.)'
  },
  {
    id: 'ss-q4',
    questionTypeBadge: 'Metszetkör sugara',
    figure: <SecFig ratio={0.6} R="5" d="3" r="r = ?" />,
    level: 1,
    question: 'Egy 5 cm sugarú gömböt a középpontjától 3 cm-re lévő sík metsz. Mekkora a metszetkör sugara?',
    options: ['4 cm', '2 cm', '√34 ≈ 5,83 cm', '8 cm'],
    correctAnswer: 0,
    explanation: 'r = √(R² − d²) = √(25 − 9) = √16 = 4 cm. (5 − 3 = 2 a kisebb gömbsüveg magassága, nem a sugár.)'
  },
  {
    id: 'ss-q5',
    questionTypeBadge: 'Metszetkör sugara',
    figure: <SecFig ratio={0.6} R="10" d="6" r="r = ?" />,
    level: 1,
    question: 'Egy 10 cm sugarú gömböt a középpontjától 6 cm-re lévő sík metsz. Mekkora a metszetkör sugara?',
    options: ['8 cm', '4 cm', '≈ 11,66 cm', '16 cm'],
    correctAnswer: 0,
    explanation: 'r = √(10² − 6²) = √(100 − 36) = √64 = 8 cm.'
  },
  {
    id: 'ss-q6',
    questionTypeBadge: 'Sík távolsága',
    figure: <SecFig ratio={12 / 13} R="13" r="5" d="d = ?" />,
    level: 1,
    question: 'Egy 13 cm sugarú gömb egyik síkmetszetének sugara 5 cm. Milyen messze van a sík a középponttól?',
    options: ['12 cm', '8 cm', '≈ 13,93 cm', '18 cm'],
    correctAnswer: 0,
    explanation: 'd = √(R² − r²) = √(169 − 25) = √144 = 12 cm.'
  },
  {
    id: 'ss-q7',
    questionTypeBadge: 'Főkör',
    level: 1,
    question: 'Mikor főkör egy gömb síkmetszete?',
    options: [
      'Ha a metsző sík átmegy a gömb középpontján',
      'Ha a metsző sík érinti a gömböt',
      'Ha a metsző sík a középponttól R/2 távolságra van',
      'Ha a metsző sík vízszintes'
    ],
    correctAnswer: 0,
    explanation: 'A főkör a középpontra illeszkedő sík metszete (d = 0); sugara egyenlő a gömb sugarával. A sík iránya nem számít.'
  },
  {
    id: 'ss-q8',
    questionTypeBadge: 'Érintősík',
    level: 1,
    question: 'Hány közös pontja van egy R sugarú gömbnek és egy olyan síknak, amely a középponttól pontosan R távolságra van?',
    options: ['Pontosan egy', 'Nincs közös pontjuk', 'Egy körvonalnyi', 'Kettő'],
    correctAnswer: 0,
    explanation: 'Ha d = R, akkor r = √(R² − R²) = 0: a sík egyetlen pontban érinti a gömböt (érintősík). Ha d > R, nincs közös pont.'
  },
  {
    id: 'ss-q9',
    questionTypeBadge: 'Kidolgozott feladat',
    figure: <Sphere3DFig ratio={0.5} title="Narancs: átmérő 8 cm" labels={{ d: '2', r: 'r = ?' }} />,
    level: 1,
    question: 'Egy 8 cm átmérőjű narancsot a középpontjától 2 cm-re vágtunk ketté. Mekkora a metszetkör sugara?',
    options: ['√12 ≈ 3,46 cm', '√60 ≈ 7,75 cm', '2 cm', '6 cm'],
    correctAnswer: 0,
    explanation: 'A sugár R = 4 cm (az átmérő fele!). r² = 4² − 2² = 12, így r = √12 ≈ 3,46 ≈ 3,5 cm. A √60 a 8 cm-es „sugárral” számolt hibás eredmény.'
  },
  {
    id: 'ss-q10',
    questionTypeBadge: 'Gömbsugár',
    figure: <SecFig ratio={0.6} R="R = ?" d="3" r="4" />,
    level: 1,
    question: 'Egy gömböt a középpontjától 3 cm-re lévő síkkal elmetszve 4 cm sugarú kört kapunk. Mekkora a gömb sugara?',
    options: ['5 cm', '7 cm', '√7 ≈ 2,65 cm', '1 cm'],
    correctAnswer: 0,
    explanation: 'A gömbsugár az átfogó: R = √(d² + r²) = √(9 + 16) = √25 = 5 cm.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'ss-q11',
    questionTypeBadge: 'Dinnye szeletei',
    figure: <SecFig ratio={0.2} R="10" d="2" r="r = ?" />,
    level: 2,
    question: 'Egy 20 cm átmérőjű gömb alakú dinnyét a középpontjától 2 cm-re vágjuk el. Mekkora a vágási kör sugara?',
    options: ['√96 ≈ 9,80 cm', '8 cm', '√396 ≈ 19,9 cm', '√104 ≈ 10,2 cm'],
    correctAnswer: 0,
    explanation: 'R = 10 cm, d = 2 cm: r = √(100 − 4) = √96 ≈ 9,80 cm.'
  },
  {
    id: 'ss-q12',
    questionTypeBadge: 'Dinnye szeletei',
    figure: FIG_MELON,
    level: 2,
    question: 'Egy gömb alakú dinnyét párhuzamos vágásokkal 5 egyenlő, 4 cm magas részre vágtuk. Mekkora sugarú kör határolja a két szélső (legkisebb) részt?',
    options: ['8 cm', '9,8 cm', '6 cm', '4 cm'],
    correctAnswer: 0,
    explanation: 'Az átmérő 5 · 4 = 20 cm, R = 10 cm. A szélső vágások a középponttól 10 − 4 = 6 cm-re vannak: r = √(100 − 36) = 8 cm. (A középső vágások 2 cm-re vannak, ott r ≈ 9,8 cm.)'
  },
  {
    id: 'ss-q13',
    questionTypeBadge: 'Párhuzamos síkok',
    figure: <SecFig ratio={0.8} R="5" d="4" r="r = ?" />,
    level: 2,
    question: 'Az 5 cm sugarú gömböt a középponttól 3 cm-re lévő sík metszi. A vele párhuzamos, tőle 1 cm-re, a középponttól távolabb lévő sík mekkora sugarú kört metsz ki?',
    options: ['3 cm', '4 cm', '√21 ≈ 4,58 cm', '1 cm'],
    correctAnswer: 0,
    explanation: 'Ez a sík a középponttól 3 + 1 = 4 cm-re van: r = √(25 − 16) = √9 = 3 cm.'
  },
  {
    id: 'ss-q14',
    questionTypeBadge: 'Párhuzamos síkok',
    level: 2,
    question: 'Az 5 cm sugarú gömböt a középponttól 3 cm-re lévő sík metszi. A vele párhuzamos, tőle 1 cm-re, a középponthoz közelebb lévő sík mekkora sugarú kört metsz ki?',
    options: ['√21 ≈ 4,58 cm', '3 cm', '4 cm', '√29 ≈ 5,39 cm'],
    correctAnswer: 0,
    explanation: 'Ez a sík a középponttól 3 − 1 = 2 cm-re van: r = √(25 − 4) = √21 ≈ 4,58 cm.'
  },
  {
    id: 'ss-q15',
    questionTypeBadge: 'Sík távolsága',
    figure: <SecFig ratio={11.74 / 12.8} R="12,8" r="5,1" d="d = ?" />,
    level: 2,
    question: 'Egy 12,8 cm sugarú gömb síkmetszetének átmérője 10,2 cm. Milyen messze van a metsző sík a középponttól?',
    options: ['≈ 11,74 cm', '≈ 7,73 cm', '2,6 cm', '≈ 13,78 cm'],
    correctAnswer: 0,
    explanation: 'A metszetkör sugara 5,1 cm. d = √(12,8² − 5,1²) = √(163,84 − 26,01) = √137,83 ≈ 11,74 cm. (A 7,73 az átmérővel számolt hibás érték.)'
  },
  {
    id: 'ss-q16',
    questionTypeBadge: 'Sík távolsága',
    level: 2,
    question: 'Egy 12,8 cm sugarú gömb síkmetszetének átmérője 21,7 cm. Milyen messze van a metsző sík a középponttól?',
    options: ['≈ 6,79 cm', '≈ 1,95 cm', '≈ 11,74 cm', '≈ 16,78 cm'],
    correctAnswer: 0,
    explanation: 'r = 10,85 cm, d = √(163,84 − 117,7225) = √46,1175 ≈ 6,79 cm.'
  },
  {
    id: 'ss-q17',
    questionTypeBadge: 'Főkör',
    level: 2,
    question: 'Egy 12,8 cm sugarú gömb síkmetszetének átmérője 25,6 cm. Milyen messze van a metsző sík a középponttól?',
    options: ['0 cm (a metszet főkör)', '12,8 cm', '6,4 cm', 'Ilyen síkmetszet nem létezik'],
    correctAnswer: 0,
    explanation: 'Az átmérő 25,6 cm, vagyis r = 12,8 cm = R. Ez csak a főkör lehet: a sík átmegy a középponton, d = 0.'
  },
  {
    id: 'ss-q18',
    questionTypeBadge: 'Metszet területe',
    figure: <SecFig ratio={0.5} R="3,2" d="1,6" r="r" title="A sugár felezőmerőleges síkja" note="T = ?" />,
    level: 2,
    question: 'Mekkora területű a 3,2 dm sugarú gömbnek az a síkmetszete, amely az egyik sugár felezőmerőleges síkjában van?',
    options: ['7,68π ≈ 24,13 dm²', '2,56π ≈ 8,04 dm²', '10,24π ≈ 32,17 dm²', '1,6√3 · π ≈ 8,71 dm²'],
    correctAnswer: 0,
    explanation: 'A felezőmerőleges sík a középponttól d = 1,6 dm-re van. r² = 3,2² − 1,6² = 10,24 − 2,56 = 7,68, a terület T = r²π = 7,68π ≈ 24,13 dm².'
  },
  {
    id: 'ss-q19',
    questionTypeBadge: 'Főkör kerülete',
    level: 2,
    question: 'Két gömb közül az egyik főkörének kerülete 10 cm-rel nagyobb a másikénál. Mekkora a két gömb sugarának különbsége?',
    options: ['10 / (2π) ≈ 1,59 cm', '10 cm', '5 cm', '10 / π ≈ 3,18 cm'],
    correctAnswer: 0,
    explanation: '2πR₁ − 2πR₂ = 10 ⇒ R₁ − R₂ = 10 / (2π) ≈ 1,59 cm – a gömbök méretétől függetlenül!'
  },
  {
    id: 'ss-q20',
    questionTypeBadge: 'Metszet területe',
    figure: <SecFig ratio={2.5 / 6.5} R="6,5" d="2,5" r="r" note="T = ?" />,
    level: 2,
    question: 'Egy 6,5 cm sugarú gömböt a középponttól 2,5 cm-re lévő sík metsz. Mekkora a metszet területe?',
    options: ['36π ≈ 113,1 cm²', '16π ≈ 50,3 cm²', '6π ≈ 18,8 cm²', '42,25π ≈ 132,7 cm²'],
    correctAnswer: 0,
    explanation: 'r² = 6,5² − 2,5² = 42,25 − 6,25 = 36, így r = 6 cm és T = 36π ≈ 113,1 cm². (16π a (6,5 − 2,5)² hibás képletből jönne.)'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'ss-q21',
    questionTypeBadge: 'Kocka és gömb',
    figure: FIG_CUBE_EDGE,
    level: 3,
    question: 'Egy gömb középpontja a 8 cm élű kocka középpontja, és a gömb érinti a kocka éleit. Mekkora a gömb sugara?',
    options: ['4√2 ≈ 5,66 cm', '4 cm', '4√3 ≈ 6,93 cm', '8 cm'],
    correctAnswer: 0,
    explanation: 'A középpont távolsága egy éltől a lapátló fele: R = 8√2 / 2 = 4√2 ≈ 5,66 cm. (4 cm a lapokat, 4√3 a csúcsokat érintő gömb sugara lenne.)'
  },
  {
    id: 'ss-q22',
    questionTypeBadge: 'Kocka és gömb',
    figure: FIG_CUBE_FACE,
    level: 3,
    question: 'A 8 cm élű kocka éleit érintő gömb középpontja a kocka középpontja. Mekkora összesen a kocka lapjainak a gömbön kívül eső része?',
    options: ['384 − 96π ≈ 82,4 cm²', '64 − 16π ≈ 13,7 cm²', '384 − 32π ≈ 283,5 cm²', '96π ≈ 301,6 cm²'],
    correctAnswer: 0,
    explanation: 'A lapsík d = 4 cm-re van, a metszetkör sugara √(32 − 16) = 4 cm – épp a lapba írt kör. Egy lapon 64 − 16π, a 6 lapon 384 − 96π ≈ 82,4 cm². (13,7 cm² csak egy lap.)'
  },
  {
    id: 'ss-q23',
    questionTypeBadge: 'Ráktérítő',
    figure: FIG_EARTH,
    level: 3,
    question: 'A Ráktérítő az északi szélesség 23°26′ mentén halad. A Földet 6371 km sugarú gömbnek tekintve mekkora sugarú kört alkot?',
    options: ['≈ 5846 km', '≈ 2534 km', '≈ 6945 km', '6371 km'],
    correctAnswer: 0,
    explanation: 'A középpontot a Ráktérítő egy pontjával összekötő 6371 km-es szakasz az Egyenlítő síkjával 23°26′-et zár be; a metszetkör sugara a szög melletti befogó: r = 6371 · cos 23°26′ ≈ 5846 km. (2534 km a sin-nel számolt távolság a síktól.)'
  },
  {
    id: 'ss-q24',
    questionTypeBadge: 'Ráktérítő',
    level: 3,
    question: 'Körülbelül milyen hosszú a Ráktérítő, ha a sugara ≈ 5846 km?',
    options: ['≈ 36 700 km', '≈ 40 030 km', '≈ 18 400 km', '≈ 107 000 km'],
    correctAnswer: 0,
    explanation: 'A kör kerülete 2rπ ≈ 2 · 5846 · π ≈ 36 730 km ≈ 36 700 km. (40 030 km az Egyenlítő hossza, 18 400 km csak rπ.)'
  },
  {
    id: 'ss-q25',
    questionTypeBadge: 'Gömbsüveg',
    figure: FIG_DOME,
    level: 3,
    question: 'Egy gömbsüveg alakú kupola alapkörének átmérője 50 m, magassága 16 m. Mekkora sugarú gömbből származik?',
    options: ['≈ 27,5 m', '≈ 29,7 m', '25 m', '≈ 12,3 m'],
    correctAnswer: 0,
    explanation: '(R − 16)² + 25² = R² ⇒ −32R + 256 + 625 = 0 ⇒ R = 881 / 32 ≈ 27,5 m. (29,7 ≈ √(25² + 16²) a hibás „átfogó” gondolat.)',
    breakdown: ['A középpont az alapsík alatt R − 16 távolságra van', '(R − 16)² + 25² = R²', '32R = 881', 'R ≈ 27,53 m']
  },
  {
    id: 'ss-q26',
    questionTypeBadge: 'Síkok száma',
    figure: FIG_AXIS,
    level: 3,
    question: 'Egy 6,2 cm sugarú gömb átmérőjére 1 cm-es egységű számegyenest fektetünk, 0 pontja a középpontban. Az egész számoknál merőleges síkokat állítunk. Hány sík metszi a gömböt?',
    options: ['13', '12', '6', '14'],
    correctAnswer: 0,
    explanation: 'A gömböt azok a síkok metszik, amelyek a középponttól 6,2 cm-nél közelebb vannak: −6, −5, …, 5, 6 – összesen 13 sík.'
  },
  {
    id: 'ss-q27',
    questionTypeBadge: 'Metszet területe',
    level: 3,
    question: 'Az előző 6,2 cm sugarú gömbnél mekkora az 5-ös pontnál állított sík metszetének területe?',
    options: ['13,44π ≈ 42,22 cm²', '1,2²π ≈ 4,52 cm²', '38,44π ≈ 120,8 cm²', '√13,44 · π ≈ 11,52 cm²'],
    correctAnswer: 0,
    explanation: 'd = 5 cm: r² = 6,2² − 5² = 38,44 − 25 = 13,44, így T = r²π = 13,44π ≈ 42,22 cm².'
  },
  {
    id: 'ss-q28',
    questionTypeBadge: 'Párhuzamos síkok',
    figure: FIG_TWO_PLANES,
    level: 3,
    question: 'Két párhuzamos sík egy 5 cm sugarú gömbből 3 cm és 4 cm sugarú köröket metsz ki; a középpont nem a két sík között van. Mekkora a síkok távolsága?',
    options: ['1 cm', '7 cm', '2 cm', '5 cm'],
    correctAnswer: 0,
    explanation: 'A 3 cm sugarú kör síkja d₁ = √(25 − 9) = 4 cm-re, a 4 cm sugarúé d₂ = √(25 − 16) = 3 cm-re van a középponttól. Egy oldalon: 4 − 3 = 1 cm. (7 cm lenne, ha a középpont a síkok között volna.)'
  },
  {
    id: 'ss-q29',
    questionTypeBadge: 'Metszet területe',
    level: 3,
    question: 'Egy 10 cm sugarú gömböt milyen messze kell a középponttól elmetszeni, hogy a metszet területe a főkör területének fele legyen?',
    options: ['10 / √2 ≈ 7,07 cm', '5 cm', '≈ 2,93 cm', '≈ 8,66 cm'],
    correctAnswer: 0,
    explanation: 'r²π = ½ · R²π ⇒ r² = 50 ⇒ d² = R² − r² = 100 − 50 = 50 ⇒ d = √50 ≈ 7,07 cm. (d = 5 esetén r² = 75, a terület 3/4 része lenne.)'
  },
  {
    id: 'ss-q30',
    questionTypeBadge: 'Gömbsüveg',
    figure: FIG_CAPS,
    level: 3,
    question: 'Egy 10 cm sugarú gömböt a középpontjától 6 cm-re lévő sík két gömbsüvegre bont. Mekkora a kisebbik gömbsüveg magassága?',
    options: ['4 cm', '8 cm', '6 cm', '16 cm'],
    correctAnswer: 0,
    explanation: 'A kisebbik süveg a sík és a gömbfelület közötti rész a középponttól távolabbi oldalon: magassága R − d = 10 − 6 = 4 cm. A nagyobbiké R + d = 16 cm; 8 cm a metszetkör sugara.'
  }
];

export const SphereSectionsQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={12}
      chapterId="tergeometria"
      topicId="g12-ter-gomb-szeletelese-quiz"
      subtopicId="a-gomb-a-gomb-szeletelese"
      title="6. A gömb, a gömb szeletelése – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: síkmetszetek, főkör, a metszetkör sugara és a gyakorlati alkalmazások."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • KVÍZ"
      questions={SPHERE_SECTIONS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Fogalmak',
          items: [
            'Gömbfelület: adott ponttól adott távolságra lévő pontok a térben.',
            'Bármely metsző sík kört metsz ki a gömbből.',
            'Főkör: a középponton átmenő sík metszete, sugara R.',
            'A síkmetszet a gömböt két gömbsüvegre bontja.'
          ]
        },
        {
          title: 'A derékszögű háromszög',
          items: [
            'R² = r² + d² (R az átfogó)',
            'r = √(R² − d²); d = √(R² − r²); R = √(r² + d²)',
            'd = 0: főkör; d = R: érintősík (1 pont); d > R: nincs metszet',
            'A metszet területe: T = r²π = (R² − d²)π'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            'Narancs: R = 4, d = 2 ⇒ r = √12 ≈ 3,5 cm',
            'Dinnye 20 cm, 4 cm-es szeletek ⇒ r = 8 cm és ≈ 9,8 cm',
            'Kocka 8 cm, élet érintő gömb: R = 4√2; kívül eső rész 384 − 96π ≈ 82,4 cm²',
            'Kupola: ϱ = 25 m, m = 16 m ⇒ R = (ϱ² + m²) / (2m) ≈ 27,5 m'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <SphereSectionsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <SphereSectionsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default SphereSectionsQuiz;
