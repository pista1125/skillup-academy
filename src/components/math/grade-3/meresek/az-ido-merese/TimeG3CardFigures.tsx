import React from 'react';
import { FONT, INK, MIN_C, ClockFace, StopwatchFace, DigitalFace, SunIcon, MoonIcon } from './TimeG3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

type Daypart = 'sun' | 'moon';

/** Párosító: egy mutatós óra, bal oldalon választható nap/hold jellel. */
export const MiniClock: React.FC<{ h: number; m: number; part?: Daypart }> = ({ h, m, part }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    {part === 'sun' && <SunIcon cx={28} cy={40} r={11} />}
    {part === 'moon' && <MoonIcon cx={26} cy={40} r={15} />}
    <ClockFace cx={part ? 95 : 75} cy={40} r={35} h={h} m={m} numbers="quarters" minuteTicks={false} bold />
  </svg>
);

/** Párosító: két óra nyíllal – kezdés és vége. */
export const MiniTwoClocks: React.FC<{ h1: number; m1: number; h2: number; m2: number }> = ({ h1, m1, h2, m2 }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <ClockFace cx={36} cy={40} r={32} h={h1} m={m1} numbers="quarters" minuteTicks={false} bold />
    <ClockFace cx={114} cy={40} r={32} h={h2} m={m2} numbers="quarters" minuteTicks={false} bold />
    <path d="M 70 40 L 80 40" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
    <path d="M 76 33 L 82 40 L 76 47" fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Stopper (Párosító 150 × 80 vagy Csoportosító 80 × 80). */
export const MiniStopwatch: React.FC<{ s: number; small?: boolean }> = ({ s, small }) =>
  small ? (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <StopwatchFace cx={40} cy={45} r={29} s={s} bold />
    </svg>
  ) : (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <StopwatchFace cx={75} cy={45} r={30} s={s} bold />
    </svg>
  );

/** Digitális kijelző (Párosító vagy Csoportosító méretben). */
export const MiniDigital: React.FC<{ text: string; small?: boolean }> = ({ text, small }) =>
  small ? (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <DigitalFace x={2} y={22} w={76} h={36} text={text} />
    </svg>
  ) : (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <DigitalFace x={20} y={14} w={110} h={52} text={text} />
    </svg>
  );

/** Csoportosító: óra, amelyen zöld cikk mutatja, mennyit ment a nagymutató (m1 → m2). */
export const SortSweep: React.FC<{ m1: number; m2: number }> = ({ m1, m2 }) => {
  const cx = 40;
  const cy = 40;
  const r = 34;
  const a = (m: number) => (m * 6 * Math.PI) / 180;
  const P = (m: number, L: number) => [cx + L * Math.sin(a(m)), cy - L * Math.cos(a(m))];
  const span = (((m2 - m1) % 60) + 60) % 60;
  const [x1, y1] = P(m1, r * 0.86);
  const [x2, y2] = P(m2, r * 0.86);
  const [sx, sy] = P(m1, r * 0.8);
  const [ex, ey] = P(m2, r * 0.8);
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <circle cx={cx} cy={cy} r={r} fill="#ffffff" stroke="#3730a3" strokeWidth="4" />
      <path d={`M ${cx} ${cy} L ${x1} ${y1} A ${r * 0.86} ${r * 0.86} 0 ${span > 30 ? 1 : 0} 1 ${x2} ${y2} Z`} fill="#86efac" opacity="0.85" />
      {Array.from({ length: 12 }, (_, i) => {
        const [tx1, ty1] = P(i * 5, r * 0.92);
        const [tx2, ty2] = P(i * 5, i % 3 === 0 ? r * 0.62 : r * 0.76);
        return <line key={i} x1={tx1} y1={ty1} x2={tx2} y2={ty2} stroke={INK} strokeWidth={i % 3 === 0 ? 4 : 2.5} strokeLinecap="round" />;
      })}
      <line x1={cx} y1={cy} x2={sx} y2={sy} stroke="#94a3b8" strokeWidth="3.5" strokeDasharray="4 3" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={ex} y2={ey} stroke={MIN_C} strokeWidth="4" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="3.5" fill={INK} />
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Tevékenység-ikonok (80 × 80) – mennyi ideig tart?
// ---------------------------------------------------------------------------
const Box: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    {children}
  </svg>
);

/** Pislogás: szem. */
export const EyeIcon: React.FC = () => (
  <Box>
    <path d="M 8 40 Q 40 12 72 40 Q 40 68 8 40 Z" fill="#ffffff" stroke={INK} strokeWidth="4" />
    <circle cx="40" cy="40" r="12" fill="#2563eb" />
    <circle cx="40" cy="40" r="5" fill={INK} />
    <path d="M 14 26 L 8 18 M 40 16 L 40 6 M 66 26 L 72 18" stroke={INK} strokeWidth="4" strokeLinecap="round" />
  </Box>
);

/** Labda elkapása: labda és kéz-ív. */
export const BallIcon: React.FC = () => (
  <Box>
    <circle cx="40" cy="36" r="22" fill="#f97316" stroke="#7c2d12" strokeWidth="4" />
    <path d="M 18 36 L 62 36 M 40 14 Q 28 36 40 58 M 40 14 Q 52 36 40 58" fill="none" stroke="#7c2d12" strokeWidth="3" />
    <path d="M 14 70 Q 40 78 66 70" fill="none" stroke="#a16207" strokeWidth="5" strokeLinecap="round" />
  </Box>
);

/** Fogmosás: fogkefe. */
export const ToothbrushIcon: React.FC = () => (
  <Box>
    <rect x="8" y="46" width="52" height="10" rx="5" fill="#38bdf8" stroke="#075985" strokeWidth="3.5" transform="rotate(-25 40 50)" />
    <g transform="rotate(-25 40 50)">
      <rect x="54" y="36" width="20" height="10" fill="#ffffff" stroke="#075985" strokeWidth="3" />
      {[58, 63, 68].map((x) => (
        <line key={x} x1={x} y1="36" x2={x} y2="28" stroke="#075985" strokeWidth="3" />
      ))}
    </g>
    <circle cx="20" cy="22" r="6" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2.5" />
    <circle cx="32" cy="14" r="4" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2.5" />
  </Box>
);

/** Tojásfőzés: lábas tojással. */
export const EggPotIcon: React.FC = () => (
  <Box>
    <ellipse cx="40" cy="30" rx="10" ry="13" fill="#fef3c7" stroke="#a16207" strokeWidth="3.5" />
    <path d="M 12 38 L 68 38 L 62 70 L 18 70 Z" fill="#94a3b8" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
    <path d="M 4 42 L 12 42 M 68 42 L 76 42" stroke={INK} strokeWidth="5" strokeLinecap="round" />
    <path d="M 26 18 Q 22 12 26 6 M 54 18 Q 50 12 54 6" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
  </Box>
);

/** Éjszakai alvás: ágy és hold. */
export const BedMoonIcon: React.FC = () => (
  <Box>
    <MoonIcon cx={56} cy={18} r={11} />
    <rect x="8" y="42" width="64" height="18" rx="4" fill="#c4b5fd" stroke="#4c1d95" strokeWidth="4" />
    <rect x="12" y="32" width="20" height="12" rx="5" fill="#ffffff" stroke="#4c1d95" strokeWidth="3.5" />
    <path d="M 8 30 L 8 70 M 72 46 L 72 70" stroke="#4c1d95" strokeWidth="5" strokeLinecap="round" />
  </Box>
);

/** Kirándulás: hegy és zászló. */
export const MountainIcon: React.FC = () => (
  <Box>
    <path d="M 4 72 L 30 26 L 44 46 L 54 34 L 76 72 Z" fill="#86efac" stroke="#14532d" strokeWidth="4" strokeLinejoin="round" />
    <path d="M 30 26 L 30 8" stroke="#14532d" strokeWidth="3.5" />
    <path d="M 30 8 L 44 13 L 30 18 Z" fill="#dc2626" />
    <SunIcon cx={64} cy={16} r={7} />
  </Box>
);

/** Iskola épülete. */
export const SchoolIcon: React.FC = () => (
  <Box>
    <path d="M 8 34 L 40 12 L 72 34 Z" fill="#fca5a5" stroke="#7f1d1d" strokeWidth="4" strokeLinejoin="round" />
    <rect x="12" y="34" width="56" height="36" fill="#fef3c7" stroke="#7f1d1d" strokeWidth="4" />
    <rect x="33" y="48" width="14" height="22" fill="#a16207" />
    <rect x="17" y="42" width="11" height="11" fill="#bfdbfe" stroke="#1e3a8a" strokeWidth="2.5" />
    <rect x="52" y="42" width="11" height="11" fill="#bfdbfe" stroke="#1e3a8a" strokeWidth="2.5" />
  </Box>
);
