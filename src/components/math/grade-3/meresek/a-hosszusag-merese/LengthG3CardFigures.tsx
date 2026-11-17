import React from 'react';
import { FONT, Ant, Door, Pencil, GridPath, Dir } from './LengthG3Parts';

// Kis, vastag vonalas kártyaábrák a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.

/** Vonalzó-kártya (150 × 80): kék szakasz a vonalzó fölött. from/to cm-ben (tizedes = mm). */
export const RulerCard: React.FC<{ from?: number; to: number; cm?: number; mm?: boolean }> = ({ from = 0, to, cm = 6, mm = false }) => {
  const pad = 9;
  const s = (150 - 2 * pad - 4) / cm;
  const x0 = 2 + pad;
  const y = 40;
  const ticks: React.ReactNode[] = [];
  const n = mm ? cm * 10 : cm;
  for (let i = 0; i <= n; i++) {
    const isCm = !mm || i % 10 === 0;
    const isHalf = mm && i % 5 === 0 && !isCm;
    const tx = x0 + (mm ? (i * s) / 10 : i * s);
    ticks.push(<line key={i} x1={tx} y1={y} x2={tx} y2={y + (isCm ? 14 : isHalf ? 10 : 6)} stroke="#1e293b" strokeWidth={isCm ? 2.2 : 1.1} />);
    if (isCm) {
      const c = mm ? i / 10 : i;
      ticks.push(
        <text key={`t${i}`} x={tx} y={y + 33} textAnchor="middle" fontSize="17" fontWeight="bold" fill="#1e293b">{c}</text>
      );
    }
  }
  const a = x0 + from * s;
  const b = x0 + to * s;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="2" y={y} width={146} height={38} rx="4" fill="#fde047" stroke="#a16207" strokeWidth="2" />
      {ticks}
      <g stroke="#2563eb" strokeLinecap="round">
        <line x1={a} y1={24} x2={b} y2={24} strokeWidth="6" />
        <line x1={a} y1={14} x2={a} y2={36} strokeWidth="3.5" />
        <line x1={b} y1={14} x2={b} y2={36} strokeWidth="3.5" />
      </g>
    </svg>
  );
};

/** Út a négyzetrácson. Párosító: 150 × 80, csoportosító: 80 × 80. */
export const PathCard: React.FC<{ start: [number, number]; path: Dir[]; small?: boolean }> = ({ start, path, small = false }) => {
  const W = small ? 80 : 150;
  const cols = small ? 5 : 9;
  const rows = small ? 5 : 4;
  const s = small ? 13 : 16;
  const x = (W - cols * s) / 2;
  const y = (80 - rows * s) / 2;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <GridPath x={x} y={y} cols={cols} rows={rows} s={s} start={start} path={path} w={4} arrows={false} color="#16a34a" />
    </svg>
  );
};

/** Csík összehasonlítva a szürke 1 dm-es (vagy 1 m-es) mintával. len: a minta hányszorosa (1 = ugyanakkora). 80 × 80 */
export const BarCard: React.FC<{ len: number; color?: string }> = ({ len, color = '#2563eb' }) => {
  const ref = 50;
  const x = 8;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x={x} y={18} width={ref} height={14} rx="2" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
      <line x1={x} y1={10} x2={x} y2={70} stroke="#475569" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1={x + ref} y1={10} x2={x + ref} y2={70} stroke="#475569" strokeWidth="1.5" strokeDasharray="3 2" />
      <rect x={x} y={46} width={ref * len} height={14} rx="2" fill={color} stroke="#1e293b" strokeWidth="2" />
    </svg>
  );
};

const Box: React.FC<{ children: React.ReactNode; W?: number }> = ({ children, W = 80 }) => (
  <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    {children}
  </svg>
);

export const AntCard: React.FC = () => (
  <Box>
    <Ant cx={42} cy={42} k={2.1} />
  </Box>
);

export const LadybugCard: React.FC = () => (
  <Box>
    <circle cx="40" cy="26" r="9" fill="#1f2937" />
    <ellipse cx="40" cy="48" rx="22" ry="20" fill="#dc2626" stroke="#1f2937" strokeWidth="3" />
    <line x1="40" y1="29" x2="40" y2="68" stroke="#1f2937" strokeWidth="3" />
    {[[30, 42], [50, 42], [29, 57], [51, 57]].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="4.5" fill="#1f2937" />
    ))}
  </Box>
);

export const PencilCard: React.FC = () => (
  <Box>
    <g transform="rotate(-30 40 40)">
      <Pencil x1={6} x2={74} y={40} t={14} />
    </g>
  </Box>
);

export const DoorCard: React.FC = () => (
  <Box>
    <Door x={22} y={6} w={36} h={70} />
  </Box>
);

export const TreeCard: React.FC = () => (
  <Box>
    <rect x="34" y="50" width="12" height="26" fill="#92400e" stroke="#451a03" strokeWidth="2" />
    <circle cx="40" cy="32" r="24" fill="#22c55e" stroke="#14532d" strokeWidth="3" />
  </Box>
);

export const SpoonCard: React.FC = () => (
  <Box>
    <g transform="rotate(-35 40 40)">
      <ellipse cx="18" cy="40" rx="13" ry="9" fill="#cbd5e1" stroke="#334155" strokeWidth="3" />
      <rect x="30" y="37" width="44" height="6" rx="3" fill="#cbd5e1" stroke="#334155" strokeWidth="2.5" />
    </g>
  </Box>
);

export const BusCard: React.FC = () => (
  <Box>
    <rect x="5" y="22" width="70" height="38" rx="6" fill="#facc15" stroke="#713f12" strokeWidth="3" />
    <rect x="11" y="28" width="14" height="12" fill="#bae6fd" stroke="#0c4a6e" strokeWidth="2" />
    <rect x="30" y="28" width="14" height="12" fill="#bae6fd" stroke="#0c4a6e" strokeWidth="2" />
    <rect x="49" y="28" width="14" height="12" fill="#bae6fd" stroke="#0c4a6e" strokeWidth="2" />
    <circle cx="20" cy="62" r="7" fill="#1f2937" />
    <circle cx="60" cy="62" r="7" fill="#1f2937" />
  </Box>
);
