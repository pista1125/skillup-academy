import React from 'react';

// Közös rajzelemek az idő méréséhez – a Figures, CardFigures, Theory és Quiz fájlok használják.
export const FONT = 'system-ui, Segoe UI, sans-serif';
export const UNK = '#dc2626';
export const INK = '#1e293b';
export const HOUR_C = '#1e3a8a';
export const MIN_C = '#2563eb';
export const SEC_C = '#ea580c';

const rad = (deg: number) => (deg * Math.PI) / 180;
const pt = (cx: number, cy: number, len: number, deg: number): [number, number] => [cx + len * Math.sin(rad(deg)), cy - len * Math.cos(rad(deg))];

/**
 * Mutatós óra számlapja (egy <g>, más SVG-be tehető).
 * h: 0–23 (a számlapon 12 órás), m: perc, s: másodperc (csak ha showSec).
 * numbers: 'all' = 1–12, 'quarters' = 12, 3, 6, 9.
 */
export const ClockFace: React.FC<{
  cx: number;
  cy: number;
  r: number;
  h: number;
  m: number;
  s?: number;
  showSec?: boolean;
  numbers?: 'all' | 'quarters' | 'none';
  minuteTicks?: boolean;
  rim?: string;
  bold?: boolean;
  hideHands?: boolean;
}> = ({ cx, cy, r, h, m, s = 0, showSec = false, numbers = 'all', minuteTicks = true, rim = '#3730a3', bold = false, hideHands = false }) => {
  const ticks: React.ReactNode[] = [];
  for (let i = 0; i < 60; i++) {
    const big = i % 5 === 0;
    if (!big && !minuteTicks) continue;
    const [x1, y1] = pt(cx, cy, r * 0.9, i * 6);
    const [x2, y2] = pt(cx, cy, big ? r * 0.76 : r * 0.83, i * 6);
    ticks.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth={big ? (bold ? r * 0.06 : r * 0.04) : r * 0.018} strokeLinecap="round" />);
  }
  const nums: React.ReactNode[] = [];
  if (numbers !== 'none') {
    for (let n = 1; n <= 12; n++) {
      if (numbers === 'quarters' && n % 3 !== 0) continue;
      const [x, y] = pt(cx, cy, r * 0.6, n * 30);
      const fs = bold ? r * 0.3 : r * 0.2;
      nums.push(
        <text key={n} x={x} y={y + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={INK} fontFamily={FONT}>{n}</text>
      );
    }
  }
  const hourDeg = (h % 12) * 30 + m * 0.5;
  const minDeg = m * 6 + (showSec ? s * 0.1 : 0);
  const [hx, hy] = pt(cx, cy, r * 0.48, hourDeg);
  const [mx, my] = pt(cx, cy, r * 0.8, minDeg);
  const [sx, sy] = pt(cx, cy, r * 0.86, s * 6);
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#ffffff" stroke={rim} strokeWidth={r * (bold ? 0.12 : 0.09)} />
      {ticks}
      {nums}
      {!hideHands && (
        <>
          <line x1={cx} y1={cy} x2={hx} y2={hy} stroke={HOUR_C} strokeWidth={r * (bold ? 0.13 : 0.1)} strokeLinecap="round" />
          <line x1={cx} y1={cy} x2={mx} y2={my} stroke={MIN_C} strokeWidth={r * (bold ? 0.08 : 0.055)} strokeLinecap="round" />
          {showSec && <line x1={cx} y1={cy} x2={sx} y2={sy} stroke={SEC_C} strokeWidth={r * 0.025} strokeLinecap="round" />}
        </>
      )}
      <circle cx={cx} cy={cy} r={r * 0.07} fill={INK} />
    </g>
  );
};

/** Önálló mutatós óra SVG-ként. */
export const Clock: React.FC<{
  h: number;
  m: number;
  s?: number;
  showSec?: boolean;
  numbers?: 'all' | 'quarters' | 'none';
  size?: number;
  className?: string;
}> = ({ h, m, s, showSec, numbers = 'all', size = 120, className = 'w-full h-auto' }) => (
  <svg viewBox={`0 0 ${size} ${size}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <ClockFace cx={size / 2} cy={size / 2} r={size / 2 - size * 0.06} h={h} m={m} s={s} showSec={showSec} numbers={numbers} />
  </svg>
);

/** Stopperóra: 60 másodperces számlap, egy mutató. */
export const StopwatchFace: React.FC<{ cx: number; cy: number; r: number; s: number; bold?: boolean; labels?: boolean; hideHand?: boolean }> = ({
  cx,
  cy,
  r,
  s,
  bold = false,
  labels = true,
  hideHand = false
}) => {
  const ticks: React.ReactNode[] = [];
  for (let i = 0; i < 60; i++) {
    const big = i % 5 === 0;
    if (bold && !big) continue;
    const [x1, y1] = pt(cx, cy, r * 0.9, i * 6);
    const [x2, y2] = pt(cx, cy, big ? r * 0.76 : r * 0.83, i * 6);
    ticks.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth={big ? r * (bold ? 0.07 : 0.04) : r * 0.018} strokeLinecap="round" />);
  }
  const lab: React.ReactNode[] = [];
  if (labels) {
    const step = bold ? 15 : 5;
    for (let v = step; v <= 60; v += step) {
      const [x, y] = pt(cx, cy, r * 0.58, v * 6);
      const fs = bold ? r * 0.3 : r * 0.17;
      lab.push(
        <text key={v} x={x} y={y + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={INK} fontFamily={FONT}>{v}</text>
      );
    }
  }
  const [sx, sy] = pt(cx, cy, r * 0.84, s * 6);
  return (
    <g>
      <rect x={cx - r * 0.16} y={cy - r * 1.32} width={r * 0.32} height={r * 0.22} rx={r * 0.05} fill="#94a3b8" stroke={INK} strokeWidth={r * 0.04} />
      <rect x={cx - r * 0.07} y={cy - r * 1.12} width={r * 0.14} height={r * 0.14} fill="#94a3b8" stroke={INK} strokeWidth={r * 0.03} />
      <circle cx={cx} cy={cy} r={r} fill="#f1f5f9" stroke="#475569" strokeWidth={r * (bold ? 0.13 : 0.1)} />
      {ticks}
      {!hideHand && <line x1={cx} y1={cy} x2={sx} y2={sy} stroke={SEC_C} strokeWidth={r * (bold ? 0.08 : 0.045)} strokeLinecap="round" />}
      <g stroke="#f1f5f9" strokeWidth={r * 0.06} paintOrder="stroke">{lab}</g>
      <circle cx={cx} cy={cy} r={r * 0.08} fill={INK} />
    </g>
  );
};

/** Digitális kijelző: pl. "16:35". */
export const DigitalFace: React.FC<{ x: number; y: number; w: number; h: number; text: string; color?: string }> = ({ x, y, w, h, text, color = '#22c55e' }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={h * 0.18} fill="#0f172a" stroke="#334155" strokeWidth={Math.max(2, h * 0.06)} />
    <text x={x + w / 2} y={y + h * 0.72} textAnchor="middle" fontSize={h * 0.6} fontWeight="bold" fill={text.includes('?') ? '#fca5a5' : color} fontFamily="ui-monospace, Consolas, monospace">{text}</text>
  </g>
);

/** Napocska vagy hold ikon a napszakhoz. */
export const SunIcon: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => (
  <g>
    {Array.from({ length: 8 }, (_, i) => {
      const [x1, y1] = pt(cx, cy, r * 1.3, i * 45);
      const [x2, y2] = pt(cx, cy, r * 1.75, i * 45);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f59e0b" strokeWidth={r * 0.28} strokeLinecap="round" />;
    })}
    <circle cx={cx} cy={cy} r={r} fill="#fde047" stroke="#f59e0b" strokeWidth={r * 0.2} />
  </g>
);

export const MoonIcon: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => (
  <path
    d={`M ${cx + r * 0.25} ${cy - r} A ${r} ${r} 0 0 0 ${cx + r * 0.25} ${cy + r} A ${r * 1.4} ${r * 1.4} 0 0 1 ${cx + r * 0.25} ${cy - r} Z`}
    fill="#fef3c7"
    stroke="#a16207"
    strokeWidth={r * 0.15}
  />
);

export const HU_DAYS_SHORT = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'];
export const HU_MONTHS = ['január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december'];
export const HU_DAYS = ['hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat', 'vasárnap'];

/**
 * Egy hónap naptárlapja (hétfővel kezdődő hét).
 * startDow: az 1. nap hányadik napja a hétnek (0 = hétfő). marks: kiemelt napok színe.
 */
export const MonthGrid: React.FC<{
  x: number;
  y: number;
  title: string;
  days: number;
  startDow: number;
  cell?: number;
  marks?: Record<number, string>;
  qDay?: number;
}> = ({ x, y, title, days, startDow, cell = 26, marks = {}, qDay }) => {
  const head = cell * 0.9;
  const rows = Math.ceil((startDow + days) / 7);
  return (
    <g fontFamily={FONT}>
      <rect x={x} y={y} width={cell * 7} height={head + cell * 0.8 + rows * cell} rx="8" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
      <rect x={x} y={y} width={cell * 7} height={head} rx="8" fill="#0ea5e9" />
      <rect x={x} y={y + head - 8} width={cell * 7} height="8" fill="#0ea5e9" />
      <text x={x + cell * 3.5} y={y + head * 0.7} textAnchor="middle" fontSize={cell * 0.5} fontWeight="bold" fill="#ffffff">{title}</text>
      {HU_DAYS_SHORT.map((d, i) => (
        <text key={d} x={x + cell * (i + 0.5)} y={y + head + cell * 0.58} textAnchor="middle" fontSize={cell * 0.36} fontWeight="bold" fill={i >= 5 ? '#dc2626' : '#475569'}>{d}</text>
      ))}
      {Array.from({ length: days }, (_, k) => {
        const d = k + 1;
        const idx = startDow + k;
        const cx = x + cell * ((idx % 7) + 0.5);
        const cy = y + head + cell * 0.8 + cell * (Math.floor(idx / 7) + 0.5);
        const mk = marks[d];
        const q = qDay === d;
        return (
          <g key={d}>
            {mk && <rect x={cx - cell * 0.44} y={cy - cell * 0.42} width={cell * 0.88} height={cell * 0.84} rx={cell * 0.18} fill={mk} />}
            {q && <rect x={cx - cell * 0.44} y={cy - cell * 0.42} width={cell * 0.88} height={cell * 0.84} rx={cell * 0.18} fill="#fee2e2" stroke={UNK} strokeWidth="1.5" />}
            <text x={cx} y={cy + cell * 0.15} textAnchor="middle" fontSize={cell * 0.42} fontWeight="bold" fill={q ? UNK : idx % 7 >= 5 ? '#dc2626' : INK}>{q ? '?' : d}</text>
          </g>
        );
      })}
    </g>
  );
};

/** Időpont szövegesen: 9:05 */
export const hm = (h: number, m: number) => `${h}:${String(m).padStart(2, '0')}`;
/** Időpont "9 óra 5 perc" formában. */
export const hmWords = (h: number, m: number) => (m === 0 ? `${h} óra` : `${h} óra ${m} perc`);
/** Időtartam percből: "1 óra 25 perc" / "45 perc" / "2 óra". */
export const durWords = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m} perc`;
  if (m === 0) return `${h} óra`;
  return `${h} óra ${m} perc`;
};
