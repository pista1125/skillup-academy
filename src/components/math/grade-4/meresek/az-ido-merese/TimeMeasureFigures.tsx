import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const pt = (cx: number, cy: number, len: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: cx + len * Math.sin(a), y: cy - len * Math.cos(a) };
};

/** Mutatós óra (SVG-csoport), beágyazható más SVG-be */
export const ClockFace: React.FC<{ cx: number; cy: number; r: number; hour: number; minute: number; showMinutes?: boolean }> = ({
  cx,
  cy,
  r,
  hour,
  minute,
  showMinutes = true
}) => {
  const hDeg = ((hour % 12) + minute / 60) * 30;
  const mDeg = minute * 6;
  const h = pt(cx, cy, r * 0.46, hDeg);
  const m = pt(cx, cy, r * 0.78, mDeg);
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 5} fill="#1e3a8a" />
      <circle cx={cx} cy={cy} r={r} fill="#ffffff" />
      {showMinutes &&
        Array.from({ length: 60 }, (_, i) => {
          const a = pt(cx, cy, r * 0.93, i * 6);
          const b = pt(cx, cy, r * (i % 5 === 0 ? 0.8 : 0.88), i * 6);
          return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#334155" strokeWidth={i % 5 === 0 ? 2 : 0.8} />;
        })}
      <line x1={cx} y1={cy} x2={h.x} y2={h.y} stroke="#4338ca" strokeWidth={r * 0.09} strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={m.x} y2={m.y} stroke="#6366f1" strokeWidth={r * 0.05} strokeLinecap="round" />
      {[12, 3, 6, 9].map((n) => {
        const p = pt(cx, cy, r * 0.64, (n % 12) * 30);
        return (
          <text key={n} x={p.x} y={p.y + r * 0.08} textAnchor="middle" fontSize={r * 0.24} fontWeight="bold" fill="#0f172a" stroke="#ffffff" strokeWidth={r * 0.06} paintOrder="stroke">
            {n}
          </text>
        );
      })}
      <circle cx={cx} cy={cy} r={r * 0.06} fill="#f97316" />
    </g>
  );
};

/** 1. ábra: mutatós órák a napszakoknak megfelelően (Tankönyv 6. feladat) */
export const ClockReadingsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const clocks = [
    { h: 2, m: 30, a: '2 óra 30 perc', b: '14 óra 30 perc' },
    { h: 7, m: 45, a: '7 óra 45 perc', b: '19 óra 45 perc' },
    { h: 9, m: 15, a: '9 óra 15 perc', b: '21 óra 15 perc' }
  ];
  return (
    <svg viewBox="0 0 520 230" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="226" rx="16" fill="#eef2ff" stroke="#a5b4fc" />
      {clocks.map((c, i) => {
        const cx = 95 + i * 165;
        return (
          <g key={i}>
            <ClockFace cx={cx} cy={95} r={58} hour={c.h} minute={c.m} />
            <text x={cx} y="182" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e3a8a">{c.a}</text>
            <text x={cx} y="200" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9a3412">{c.b}</text>
          </g>
        );
      })}
      <text x="260" y="222" textAnchor="middle" fontSize="11" fill="#475569">Kék: délelőtt / hajnalban • Narancs: délután / este (+ 12 óra)</text>
    </svg>
  );
};

/** 2. ábra: az idő mértékegységei és váltószámai */
export const TimeUnitsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const units = [
    { u: 'nap', c: '#dc2626' },
    { u: 'óra', c: '#ea580c' },
    { u: 'perc', c: '#2563eb' },
    { u: 'másodperc', c: '#16a34a' }
  ];
  const factors = ['· 24', '· 60', '· 60'];
  return (
    <svg viewBox="0 0 520 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="216" rx="16" fill="#fff7ed" stroke="#fdba74" />
      {units.map((d, i) => {
        const x = 16 + i * 126;
        const y = 54 + i * 22;
        return (
          <g key={d.u}>
            <rect x={x} y={y} width="110" height="46" rx="14" fill="#ffffff" stroke={d.c} strokeWidth="3" />
            <text x={x + 55} y={y + 29} textAnchor="middle" fontSize={d.u.length > 6 ? 15 : 18} fontWeight="bold" fill={d.c}>{d.u}</text>
            {i < 3 && (
              <g>
                <path d={`M ${x + 90} ${y - 2} Q ${x + 120} ${y - 26} ${x + 140} ${y + 18}`} fill="none" stroke="#f97316" strokeWidth="3" />
                <polygon points={`${x + 140},${y + 20} ${x + 131},${y + 11} ${x + 141},${y + 8}`} fill="#f97316" />
                <text x={x + 120} y={y - 12} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#c2410c">{factors[i]}</text>
              </g>
            )}
          </g>
        );
      })}
      <text x="260" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9a3412">
        1 nap = 24 óra • 1 óra = 60 perc • 1 perc = 60 másodperc
      </text>
      <rect x="40" y="168" width="440" height="36" rx="12" fill="#ffedd5" />
      <text x="260" y="191" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c2d12">
        1 hét = 7 nap • 1 év = 12 hónap = 365 vagy 366 nap
      </text>
    </svg>
  );
};

/** 3. ábra: napszakok egy nap alatt (Tankönyv 5. feladat) */
export const DayPartsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x0 = 30;
  const sc = 460 / 24;
  const parts = [
    { from: 0, to: 6, n: 'éjszaka', c: '#312e81' },
    { from: 6, to: 9, n: 'reggel', c: '#f59e0b' },
    { from: 9, to: 12, n: 'délelőtt', c: '#fbbf24' },
    { from: 12, to: 13, n: 'dél', c: '#ef4444' },
    { from: 13, to: 18, n: 'délután', c: '#fb923c' },
    { from: 18, to: 22, n: 'este', c: '#7c3aed' },
    { from: 22, to: 24, n: 'éjszaka', c: '#312e81' }
  ];
  return (
    <svg viewBox="0 0 520 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="166" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
      {parts.map((p, i) => (
        <g key={i}>
          <rect x={x0 + p.from * sc} y="50" width={(p.to - p.from) * sc} height="40" fill={p.c} />
          <text
            x={x0 + ((p.from + p.to) / 2) * sc}
            y={i % 2 === 0 ? 40 : 110}
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="#1e293b"
          >
            {p.n}
          </text>
        </g>
      ))}
      {Array.from({ length: 25 }, (_, h) => (
        <g key={h}>
          <line x1={x0 + h * sc} y1="90" x2={x0 + h * sc} y2={h % 6 === 0 ? 100 : 95} stroke="#334155" />
          {h % 3 === 0 && (
            <text x={x0 + h * sc} y="128" textAnchor="middle" fontSize="10" fill="#334155">{h}</text>
          )}
        </g>
      ))}
      <text x="260" y="155" textAnchor="middle" fontSize="11" fill="#475569">Egy nap 24 óra. Délben 12 óra van, éjfélkor 0 (vagy 24) óra.</text>
    </svg>
  );
};

export const TIMETABLE: { stop: string; time: string }[] = [
  { stop: 'Park', time: '7:05' },
  { stop: 'Híd', time: '7:12' },
  { stop: 'Dombtető', time: '7:21' },
  { stop: 'Központ', time: '7:33' },
  { stop: 'Liget', time: '7:40' },
  { stop: 'Iskola', time: '7:46' }
];

/** 4. ábra: a busz menetrendje (Tankönyv 8. feladat) */
export const BusTimetableSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="516" height="216" rx="16" fill="#f0fdf4" stroke="#86efac" />
    <rect x="30" y="20" width="200" height="184" rx="10" fill="#ffffff" stroke="#1e3a8a" strokeWidth="3" />
    <text x="130" y="44" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e3a8a">Menetrend</text>
    {TIMETABLE.map((r, i) => (
      <g key={r.stop}>
        <text x="48" y={72 + i * 22} fontSize="13" fontWeight="bold" fill="#0f172a">{r.stop}</text>
        <text x="212" y={72 + i * 22} textAnchor="end" fontSize="13" fontWeight="bold" fill="#0f172a">{r.time}</text>
      </g>
    ))}
    {/* busz */}
    <rect x="270" y="80" width="220" height="80" rx="14" fill="#f59e0b" />
    {[0, 1, 2, 3].map((k) => (
      <rect key={k} x={282 + k * 50} y="92" width="40" height="30" rx="4" fill="#bae6fd" />
    ))}
    <circle cx="310" cy="164" r="14" fill="#1e293b" />
    <circle cx="450" cy="164" r="14" fill="#1e293b" />
    <text x="380" y="148" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c2d12">Park → Iskola</text>
    <text x="380" y="60" textAnchor="middle" fontSize="12" fill="#14532d">Menetidő = érkezés − indulás</text>
  </svg>
);

/** 5. ábra: Hanna útja a célig (Tankönyv 16. feladat) */
export const HannaRouteSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const pts = [
    { x: 40, y: 140 },
    { x: 160, y: 70 },
    { x: 290, y: 130 },
    { x: 390, y: 80 },
    { x: 480, y: 120 }
  ];
  const labels = ['negyedóra', '24 perc', '660 másodperc', '10 perc'];
  const colors = ['#16a34a', '#2563eb', '#dc2626', '#9333ea'];
  return (
    <svg viewBox="0 0 520 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="186" rx="16" fill="#ecfccb" stroke="#a3e635" />
      {pts.slice(0, -1).map((p, i) => {
        const q = pts[i + 1];
        return (
          <g key={i}>
            <line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={colors[i]} strokeWidth="6" strokeLinecap="round" />
            <rect x={(p.x + q.x) / 2 - 50} y={(p.y + q.y) / 2 - 30} width="100" height="22" rx="8" fill="#ffffff" stroke={colors[i]} />
            <text x={(p.x + q.x) / 2} y={(p.y + q.y) / 2 - 14} textAnchor="middle" fontSize="12" fontWeight="bold" fill={colors[i]}>{labels[i]}</text>
          </g>
        );
      })}
      <rect x="14" y="146" width="56" height="22" rx="4" fill="#78350f" />
      <text x="42" y="162" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">RAJT</text>
      <rect x="452" y="126" width="56" height="22" rx="4" fill="#78350f" />
      <text x="480" y="142" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">CÉL</text>
      <text x="260" y="180" textAnchor="middle" fontSize="11" fill="#365314">Mennyi idő alatt ért célba Hanna? Váltsd át mindet percre!</text>
    </svg>
  );
};
