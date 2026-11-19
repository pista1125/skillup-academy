// „Vonalak” – a mese és a játék képei. A vonalrajzokat (LineFig) a Síkidomok lecke is használja.
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS } from '../../shared/G1Pics';

/** Vonalfajták egy 120×80-as rajzlapon. */
export type LineKind =
  | 'egyenes'
  | 'ferde'
  | 'allo'
  | 'hullam'
  | 'iv'
  | 'kanyar'
  | 'csigavonal'
  | 'kor'
  | 'tojas'
  | 'paca'
  | 'haromszog'
  | 'negyzet'
  | 'haz'
  | 'nyitottkor'
  | 'nyitottpaca'
  | 'nyitottharomszog'
  | 'nyitottnegyzet'
  | 'cikcakk';

export const LINE_PATH: Record<LineKind, string> = {
  egyenes: 'M14 40 L106 40',
  ferde: 'M22 68 L98 12',
  allo: 'M60 8 L60 72',
  hullam: 'M10 40 Q35 4 60 40 T110 40',
  iv: 'M14 64 Q60 -6 106 64',
  kanyar: 'M10 62 C40 -4 80 84 110 18',
  csigavonal: 'M60 40 a6 6 0 1 1 12 0 a12 12 0 1 1 -24 0 a18 18 0 1 1 36 0 a24 24 0 1 1 -48 0',
  kor: 'M60 10 A30 30 0 1 1 59.9 10 Z',
  tojas: 'M60 8 C88 8 104 30 104 44 C104 62 84 72 60 72 C36 72 16 62 16 44 C16 30 32 8 60 8 Z',
  paca: 'M60 10 C95 6 112 38 92 58 C72 78 30 76 20 55 C8 32 28 12 60 10 Z',
  haromszog: 'M60 10 L102 70 L18 70 Z',
  negyzet: 'M32 12 L88 12 L88 68 L32 68 Z',
  haz: 'M60 8 L96 34 L96 72 L24 72 L24 34 Z',
  nyitottkor: 'M81 19 A30 30 0 1 0 90 38',
  nyitottpaca: 'M70 10 C100 10 112 40 92 58 C72 78 30 76 20 55 C10 34 26 16 48 11',
  nyitottharomszog: 'M18 70 L60 10 L102 70',
  nyitottnegyzet: 'M32 12 L32 68 L88 68 L88 12',
  cikcakk: 'M10 62 L30 18 L50 62 L70 18 L90 62 L110 18',
};

export const LINE_SAY: Record<LineKind, string> = {
  egyenes: 'egyenes vonal',
  ferde: 'ferde egyenes vonal',
  allo: 'álló egyenes vonal',
  hullam: 'hullámos görbe vonal',
  iv: 'görbe vonal, mint a szivárvány',
  kanyar: 'kanyargós görbe vonal',
  csigavonal: 'csigavonal',
  kor: 'kör alakú zárt vonal',
  tojas: 'tojás alakú zárt vonal',
  paca: 'paca alakú zárt vonal',
  haromszog: 'háromszög alakú zárt vonal',
  negyzet: 'négyzet alakú zárt vonal',
  haz: 'ház alakú zárt vonal',
  nyitottkor: 'nyitott görbe vonal, majdnem kör',
  nyitottpaca: 'nyitott görbe vonal',
  nyitottharomszog: 'nyitott vonal, mint egy sátor',
  nyitottnegyzet: 'nyitott vonal, mint egy doboz teteje nélkül',
  cikcakk: 'cikcakk vonal',
};

/** Csak egyenes vonalakból áll? (a görbe vonalat tartalmazók: false) */
export const ONLY_STRAIGHT: Record<LineKind, boolean> = {
  egyenes: true,
  ferde: true,
  allo: true,
  hullam: false,
  iv: false,
  kanyar: false,
  csigavonal: false,
  kor: false,
  tojas: false,
  paca: false,
  haromszog: true,
  negyzet: true,
  haz: true,
  nyitottkor: false,
  nyitottpaca: false,
  nyitottharomszog: true,
  nyitottnegyzet: true,
  cikcakk: true,
};

export const CLOSED: Record<LineKind, boolean> = {
  egyenes: false,
  ferde: false,
  allo: false,
  hullam: false,
  iv: false,
  kanyar: false,
  csigavonal: false,
  kor: true,
  tojas: true,
  paca: true,
  haromszog: true,
  negyzet: true,
  haz: true,
  nyitottkor: false,
  nyitottpaca: false,
  nyitottharomszog: false,
  nyitottnegyzet: false,
  cikcakk: false,
};

/** Egy vonal kártyán (válaszgombhoz, párosítóhoz). */
export const LineFig: React.FC<{ k: LineKind; color?: string; className?: string; frame?: boolean; fill?: string }> = ({ k, color = '#2563eb', className = 'w-28 h-20', frame = true, fill = 'none' }) => (
  <svg viewBox="0 0 120 80" className={className}>
    {frame && <rect x="2" y="2" width="116" height="76" rx="12" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />}
    <path d={LINE_PATH[k]} fill={CLOSED[k] ? fill : 'none'} stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Nyitott kártya-ikon: line → { figure, say } */
export const line = (k: LineKind, color?: string, say?: string) => ({ figure: <LineFig k={k} color={color} />, say: say ?? LINE_SAY[k] });

const garden = (w: number, h: number) => (
  <>
    <rect x="0" y="0" width={w} height={h} rx="18" fill="#e0f2fe" />
    <path d={`M0 ${h - 70} Q${w / 3} ${h - 100} ${w / 2} ${h - 75} T${w} ${h - 80} V${h} H0 Z`} fill="#86efac" />
  </>
);

/** 1. oldal: Pötyi, Zümi és Csigusz a Számkertben, a fűben egy pálcika és egy fonal. */
export const LinesHelloScene: React.FC = () => (
  <svg viewBox="0 0 480 250">
    {garden(480, 250)}
    <Potyi mood="cheer" dots={7} x={20} y={40} size={170} />
    {ICONS.meh({ x: 300, y: 60, s: 1.6 })}
    <path d="M318 60 Q360 30 400 70" fill="none" stroke="#64748b" strokeWidth="3" strokeDasharray="6 6" />
    {ICONS.csiga({ x: 400, y: 200, s: 1.7 })}
    <path d="M200 215 L300 195" stroke="#a16207" strokeWidth="8" strokeLinecap="round" />
    <path d="M210 236 Q240 214 266 236 T330 232" fill="none" stroke="#db2777" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

/** Pálcika (egyenes) és fonal (görbe) egymás mellett. */
export const StickThreadScene: React.FC = () => (
  <svg viewBox="0 0 480 200">
    <rect x="0" y="0" width="480" height="200" rx="18" fill="#fef3c7" />
    <rect x="30" y="30" width="190" height="140" rx="16" fill="#fff" stroke="#16a34a" strokeWidth="4" />
    <path d="M55 130 L195 70" stroke="#a16207" strokeWidth="12" strokeLinecap="round" />
    <path d="M55 130 L195 70" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
    <rect x="260" y="30" width="190" height="140" rx="16" fill="#fff" stroke="#e11d48" strokeWidth="4" />
    <path d="M280 110 C300 40 340 160 365 90 S420 60 430 120" fill="none" stroke="#db2777" strokeWidth="7" strokeLinecap="round" />
  </svg>
);

/** Zümi egyenesen repül virágtól virágig, Csigusz kanyarogva mászik. */
export const BeeSnailPathScene: React.FC<{ show?: 'both' | 'bee' | 'snail' }> = ({ show = 'both' }) => (
  <svg viewBox="0 0 480 240">
    {garden(480, 240)}
    {ICONS.virag({ x: 50, y: 60, s: 1.2 })}
    {ICONS.virag({ x: 430, y: 60, s: 1.2, color: '#a855f7' })}
    {show !== 'snail' && (
      <>
        <path d="M80 60 L400 60" stroke="#f59e0b" strokeWidth="6" strokeDasharray="14 10" strokeLinecap="round" />
        {ICONS.meh({ x: 240, y: 60, s: 1.3 })}
      </>
    )}
    {ICONS.level({ x: 50, y: 190, s: 1.2 })}
    {ICONS.level({ x: 430, y: 190, s: 1.2 })}
    {show !== 'bee' && (
      <>
        <path d="M80 190 C130 120 170 240 230 180 S330 130 400 190" fill="none" stroke="#94a3b8" strokeWidth="9" strokeLinecap="round" />
        {ICONS.csiga({ x: 300, y: 158, s: 1.2 })}
      </>
    )}
  </svg>
);

/** A számok vonalai: egyenes zölddel, görbe pirossal (a könyv színei). */
export const DigitLinesScene: React.FC = () => (
  <svg viewBox="0 0 480 170">
    <rect x="0" y="0" width="480" height="170" rx="18" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
    {/* 1 */}
    <path d="M60 45 L80 30 L80 140" fill="none" stroke="#16a34a" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
    {/* 4 */}
    <path d="M170 30 L140 110 L200 110 M182 70 L182 140" fill="none" stroke="#16a34a" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
    {/* 3 */}
    <path d="M262 45 C280 20 320 30 312 60 C306 80 286 84 284 84 C310 84 326 100 318 122 C308 146 270 146 258 126" fill="none" stroke="#e11d48" strokeWidth="9" strokeLinecap="round" />
    {/* 0 */}
    <ellipse cx="410" cy="85" rx="30" ry="55" fill="none" stroke="#e11d48" strokeWidth="9" />
  </svg>
);

/** Kerítés a saláta körül: zárt (closed) vagy egy résen nyitott. Csigusz kívül vár. */
export const FenceScene: React.FC<{ closed: boolean; snailInside?: boolean }> = ({ closed, snailInside = false }) => (
  <svg viewBox="0 0 480 240">
    {garden(480, 240)}
    {closed ? (
      <ellipse cx="240" cy="140" rx="130" ry="75" fill="#bbf7d0" stroke="#92400e" strokeWidth="10" />
    ) : (
      <>
        <ellipse cx="240" cy="140" rx="130" ry="75" fill="#bbf7d0" stroke="none" />
        <path d="M367 124 A130 75 0 1 0 362 168" fill="none" stroke="#92400e" strokeWidth="10" strokeLinecap="round" />
      </>
    )}
    {/* saláták */}
    {[[200, 130], [250, 160], [290, 120]].map(([x, y], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="18" fill="#4ade80" stroke="#15803d" strokeWidth="3" />
        <path d={`M${x - 10} ${y} Q${x} ${y - 14} ${x + 10} ${y}`} fill="none" stroke="#15803d" strokeWidth="3" />
      </g>
    ))}
    {snailInside ? ICONS.csiga({ x: 330, y: 150, s: 1.1 }) : ICONS.csiga({ x: 430, y: 150, s: 1.3 })}
    <Potyi mood={closed ? 'happy' : 'think'} dots={7} x={10} y={10} size={90} />
  </svg>
);

/** Kusza vonalak: 3 kezdőpont fent (Pötyi, Zümi, Csigusz), 3 cél lent. Mindegyik vonal azonos színű. */
export const TANGLE_PATHS = [
  'M80 62 C80 150 400 110 400 196', // Pötyi → jobb lent
  'M240 62 C240 160 80 100 80 196', // Zümi → bal lent
  'M400 62 C400 140 240 120 240 196', // Csigusz → közép lent
];
export const TangleScene: React.FC<{ highlight?: number }> = ({ highlight }) => (
  <svg viewBox="0 0 480 250">
    <rect x="0" y="0" width="480" height="250" rx="18" fill="#f0fdf4" />
    <Potyi dots={7} x={50} y={2} size={60} />
    {ICONS.meh({ x: 240, y: 32, s: 1.2 })}
    {ICONS.csiga({ x: 400, y: 34, s: 1.2 })}
    {TANGLE_PATHS.map((d, i) => (
      <path key={i} d={d} fill="none" stroke={highlight === i ? '#e11d48' : '#334155'} strokeWidth="6" strokeLinecap="round" />
    ))}
    {/* célok: bal lent kaptár, közép lent levél, jobb lent virág */}
    <g transform="translate(80 222)">
      <path d="M-22 18 Q-26 -14 0 -22 Q26 -14 22 18 Z" fill="#fbbf24" stroke="#92400e" strokeWidth="3" />
      <path d="M-20 0 H20 M-22 10 H22 M-16 -10 H16" stroke="#92400e" strokeWidth="2.5" />
    </g>
    {ICONS.level({ x: 240, y: 222, s: 1.1 })}
    {ICONS.virag({ x: 400, y: 222, s: 1.0 })}
  </svg>
);

/** A célpontok képe (válaszgombhoz). */
export const Hive: React.FC<{ className?: string }> = ({ className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 60 60" className={className}>
    <g transform="translate(30 32)">
      <path d="M-22 18 Q-26 -14 0 -22 Q26 -14 22 18 Z" fill="#fbbf24" stroke="#92400e" strokeWidth="3" />
      <path d="M-20 0 H20 M-22 10 H22 M-16 -10 H16" stroke="#92400e" strokeWidth="2.5" />
    </g>
  </svg>
);
export const IconFig: React.FC<{ icon: keyof typeof ICONS; className?: string; color?: string }> = ({ icon, className = 'w-20 h-20', color }) => (
  <svg viewBox="0 0 60 60" className={className}>
    {ICONS[icon]({ x: 30, y: 30, s: 1.2, color })}
  </svg>
);

/** Pontok összekötése: zárt forma a pontokból (a kész vonalak + a hiányzó szakasz szaggatva). */
export const DotsShapeScene: React.FC<{ pts: [number, number][]; drawn: number }> = ({ pts, drawn }) => (
  <svg viewBox="0 0 480 220">
    <rect x="0" y="0" width="480" height="220" rx="18" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
    {pts.map((p, i) => {
      const q = pts[(i + 1) % pts.length];
      return i < drawn ? (
        <path key={`l${i}`} d={`M${p[0]} ${p[1]} L${q[0]} ${q[1]}`} stroke="#e11d48" strokeWidth="6" strokeLinecap="round" />
      ) : (
        <path key={`l${i}`} d={`M${p[0]} ${p[1]} L${q[0]} ${q[1]}`} stroke="#94a3b8" strokeWidth="3" strokeDasharray="8 8" />
      );
    })}
    {pts.map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="9" fill="#111827" />
    ))}
  </svg>
);

/** Rajzok: egyenes vonalakból (ház, kerítés) vagy görbékből (nap, alma, felhő). */
export type DrawingKind = 'haz' | 'kerites' | 'zaszlo' | 'felho' | 'alma' | 'nap' | 'hold' | 'fa';
export const DRAWING_SAY: Record<DrawingKind, string> = {
  haz: 'ház',
  kerites: 'kerítés',
  zaszlo: 'zászló',
  felho: 'felhő',
  alma: 'alma',
  nap: 'nap',
  hold: 'hold',
  fa: 'fa',
};
export const DRAWING_STRAIGHT: Record<DrawingKind, boolean> = { haz: true, kerites: true, zaszlo: true, felho: false, alma: false, nap: false, hold: false, fa: false };
export const Drawing: React.FC<{ k: DrawingKind; className?: string }> = ({ k, className = 'w-24 h-24' }) => {
  const st = { fill: 'none', stroke: '#1e293b', strokeWidth: 4, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <rect x="2" y="2" width="96" height="96" rx="14" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
      {k === 'haz' && <path d="M20 50 L50 22 L80 50 V84 H20 Z M42 84 V64 H58 V84" {...st} />}
      {k === 'kerites' && <path d="M18 82 V36 L24 28 L30 36 V82 M44 82 V36 L50 28 L56 36 V82 M70 82 V36 L76 28 L82 36 V82 M12 50 H88 M12 70 H88" {...st} />}
      {k === 'zaszlo' && <path d="M28 88 V14 L78 30 L28 46" {...st} />}
      {k === 'felho' && <path d="M24 70 C10 70 10 50 26 50 C24 32 46 28 52 40 C58 26 82 30 78 50 C92 50 92 70 78 70 Z" {...st} />}
      {k === 'alma' && <path d="M50 34 C38 22 16 30 20 54 C24 76 40 84 50 78 C60 84 76 76 80 54 C84 30 62 22 50 34 C50 26 54 20 60 16" {...st} />}
      {k === 'nap' && (
        <>
          <circle cx="50" cy="50" r="18" {...st} />
          <path d="M50 20 Q54 14 50 10 M50 80 Q46 86 50 90 M20 50 Q14 46 10 50 M80 50 Q86 54 90 50" {...st} />
        </>
      )}
      {k === 'hold' && <path d="M60 16 C36 18 24 40 30 60 C36 80 60 88 76 78 C52 76 42 56 46 40 C48 28 54 20 60 16 Z" {...st} />}
      {k === 'fa' && <path d="M44 86 C46 74 46 66 44 58 M56 86 C54 74 54 66 56 58 M44 58 C20 62 16 34 34 28 C38 12 64 12 68 28 C86 32 82 62 56 58" {...st} />}
    </svg>
  );
};
export const drawing = (k: DrawingKind) => ({ figure: <Drawing k={k} />, say: DRAWING_SAY[k] });

/** Számkártya a vonalválogatóhoz (a könyv kézírásos számaihoz hasonló, egyszerű vonalakból). */
export const DIGIT_PATH: Record<number, string> = {
  0: 'M40 14 C62 14 66 36 66 50 C66 64 62 86 40 86 C18 86 14 64 14 50 C14 36 18 14 40 14 Z',
  1: 'M28 28 L46 14 L46 86',
  2: 'M18 30 C22 12 60 10 60 32 C60 50 30 64 18 86 L64 86',
  3: 'M20 24 C34 6 64 14 58 36 C54 48 42 50 38 50 C58 50 66 62 62 72 C56 90 26 92 18 76',
  4: 'M48 14 L14 64 L66 64 M52 40 L52 86',
  5: 'M60 14 L26 14 L22 46 C36 36 62 40 62 62 C62 84 30 92 18 76',
  6: 'M58 18 C40 8 18 24 18 56 C18 80 34 88 44 88 C58 88 64 76 64 66 C64 52 52 46 42 46 C30 46 20 54 18 62',
  7: 'M16 16 L64 16 L34 86 M28 50 L56 50',
  8: 'M40 50 C22 50 18 38 20 28 C24 14 56 14 60 28 C62 38 58 50 40 50 C18 50 14 64 16 72 C20 90 60 90 64 72 C66 64 62 50 40 50 Z',
};
export const DigitFig: React.FC<{ d: number; className?: string; color?: string }> = ({ d, className = 'w-16 h-20', color = '#1e293b' }) => (
  <svg viewBox="0 0 80 100" className={className}>
    <rect x="2" y="2" width="76" height="96" rx="12" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
    <path d={DIGIT_PATH[d]} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
/** Melyik számjegy áll csak egyenesekből (1, 4, 7), csak görbékből (0, 3, 6, 8), vagy mindkettőből (2, 5)? */
export const DIGIT_KIND: Record<number, 'egyenes' | 'gorbe' | 'vegyes'> = { 0: 'gorbe', 1: 'egyenes', 2: 'vegyes', 3: 'gorbe', 4: 'egyenes', 5: 'vegyes', 6: 'gorbe', 7: 'egyenes', 8: 'gorbe' };

/** Pálcika (az egyenes vonal jele) és fonal (a görbe vonal jele) kis képe. */
export const StickFig: React.FC<{ className?: string }> = ({ className = 'w-20 h-12' }) => (
  <svg viewBox="0 0 80 50" className={className}>
    <path d="M10 40 L70 10" stroke="#a16207" strokeWidth="8" strokeLinecap="round" />
  </svg>
);
export const ThreadFig: React.FC<{ className?: string }> = ({ className = 'w-20 h-12' }) => (
  <svg viewBox="0 0 80 50" className={className}>
    <path d="M8 30 C20 0 34 50 46 22 S68 10 74 34" fill="none" stroke="#db2777" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

/** Vonalak egy sorban (számláláshoz): mindegyik egy 120×80-as cellában. */
export const LineRowScene: React.FC<{ kinds: LineKind[]; color?: string; className?: string }> = ({ kinds, color = '#2563eb', className }) => {
  const w = kinds.length * 92 + 16;
  return (
    <svg viewBox={`0 0 ${w} 96`} className={className}>
      <rect x="2" y="2" width={w - 4} height="92" rx="14" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
      {kinds.map((k, i) => (
        <g key={i} transform={`translate(${12 + i * 92} 14) scale(0.72)`}>
          <path d={LINE_PATH[k]} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
    </svg>
  );
};
