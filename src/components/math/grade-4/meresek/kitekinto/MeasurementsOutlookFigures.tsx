import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

export const TANKS = [
  { n: 'traktor üzemanyagtartálya', v: 100, c: '#3b82f6' },
  { n: 'autóbusz üzemanyagtartálya', v: 300, c: '#eab308' },
  { n: 'személyautó üzemanyagtartálya', v: 50, c: '#16a34a' },
  { n: 'mezőgazdasági helikopter vegyszertartálya', v: 800, c: '#e11d48' }
];

/** 1. ábra: járművek tartályai (Kitekintő 1. feladat) */
export const TankChartSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x0 = 232;
  const sc = 0.34;
  return (
    <svg viewBox="0 0 520 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="216" rx="16" fill="#ffffff" stroke="#cbd5e1" />
      {Array.from({ length: 9 }, (_, i) => (
        <g key={i}>
          <line x1={x0 + i * 100 * sc} y1="18" x2={x0 + i * 100 * sc} y2="180" stroke={i % 2 === 0 ? '#cbd5e1' : '#f1f5f9'} />
          <text x={x0 + i * 100 * sc} y="196" textAnchor="middle" fontSize="10" fill="#475569">{i * 100}</text>
        </g>
      ))}
      {TANKS.map((t, i) => (
        <g key={t.n}>
          <text x={x0 - 8} y={44 + i * 38} textAnchor="end" fontSize={t.n.length > 30 ? 9.5 : 11} fill="#334155">{t.n}</text>
          <rect x={x0} y={30 + i * 38} width={t.v * sc} height="20" rx="4" fill={t.c} />
        </g>
      ))}
      <line x1={x0} y1="180" x2={x0 + 800 * sc + 6} y2="180" stroke="#334155" strokeWidth="1.5" />
      <text x={x0 + 800 * sc + 4} y="210" textAnchor="end" fontSize="10" fontWeight="bold" fill="#334155">liter</text>
    </svg>
  );
};

/** Edény rajza (belső segéd) */
const Vessel: React.FC<{ x: number; cap: number; amount: number; h: number; color?: string }> = ({ x, cap, amount, h, color = '#a855f7' }) => {
  const bottom = 170;
  const w = 60;
  const lvl = bottom - (h * amount) / cap;
  return (
    <g>
      <rect x={x} y={lvl} width={w} height={bottom - lvl} fill={color} opacity="0.75" />
      <path d={`M ${x} ${bottom - h - 6} L ${x} ${bottom} L ${x + w} ${bottom} L ${x + w} ${bottom - h - 6}`} fill="none" stroke="#334155" strokeWidth="3" />
      <text x={x + w / 2} y={bottom + 18} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{cap} literes</text>
      <text x={x + w / 2} y={bottom - h - 14} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#6b21a8">{amount} l</text>
    </g>
  );
};

/** 2. ábra: nagyapa három üvege (Kitekintő 2. feladat) – 8, 5 és 3 literes */
export const GrapeJuiceJugsSvg: React.FC<FigProps & { state?: [number, number, number] }> = ({ className = DEFAULT_CLASS, state = [8, 0, 0] }) => (
  <svg viewBox="0 0 520 210" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="516" height="206" rx="16" fill="#faf5ff" stroke="#d8b4fe" />
    <Vessel x={80} cap={8} amount={state[0]} h={128} />
    <Vessel x={230} cap={5} amount={state[1]} h={80} />
    <Vessel x={380} cap={3} amount={state[2]} h={48} />
  </svg>
);

/** 3. ábra: a két béka ugrásai (Kitekintő 3. feladat) */
export const FrogJumpsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x0 = 30;
  const sc = 0.48; // px / cm
  const jumps = 5;
  return (
    <svg viewBox="0 0 520 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="196" rx="16" fill="#f0fdf4" stroke="#86efac" />
      {[0, 1].map((row) => {
        const y = row === 0 ? 70 : 150;
        const len = row === 0 ? 185 : 100;
        return (
          <g key={row}>
            <line x1={x0} y1={y} x2={x0 + 950 * sc} y2={y} stroke="#334155" strokeWidth="2" />
            {Array.from({ length: jumps }, (_, k) => {
              const a = x0 + k * len * sc;
              const b = x0 + (k + 1) * len * sc;
              return (
                <path key={k} d={`M ${a} ${y} Q ${(a + b) / 2} ${y - 34} ${b} ${y}`} fill="none" stroke={row === 0 ? '#16a34a' : '#ca8a04'} strokeWidth="2.5" />
              );
            })}
            <text x={x0 + jumps * len * sc} y={y + 18} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">{jumps * len} cm</text>
            <text x={x0 + 4} y={y + 18} fontSize="11" fill="#334155">{row === 0 ? 'erdei béka: 185 cm-es ugrások' : 'kecskebéka: 1 m-es ugrások'}</text>
          </g>
        );
      })}
      <text x="260" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#166534">Minden ugrásnál 85 cm-rel nő a különbség</text>
    </svg>
  );
};

/** 4. ábra: cserearányok a debridai vásárban (Kitekintő 4. feladat) */
export const MarketTradeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const row = (y: number, left: string, ln: number, right: string, rn: number) => (
    <g>
      {Array.from({ length: ln }, (_, i) => (
        <text key={`l${i}`} x={40 + i * 40} y={y} fontSize="30">{left}</text>
      ))}
      <text x="150" y={y - 6} fontSize="26" fontWeight="bold" fill="#0f172a">=</text>
      {Array.from({ length: rn }, (_, i) => (
        <text key={`r${i}`} x={190 + i * 62} y={y} fontSize="30">{right}</text>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 520 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="166" rx="16" fill="#fff7ed" stroke="#fdba74" />
      {row(66, '🐴', 2, '🫏', 4)}
      {row(136, '🫏', 2, '🐐', 5)}
      <text x="500" y="24" textAnchor="end" fontSize="12" fontWeight="bold" fill="#9a3412">Hány kecske jár 4 lóért?</text>
    </svg>
  );
};

/** 5. ábra: Mona golyói a dobozban (Kitekintő 5. feladat) – a színek száma ismeretlen */
export const MarbleBoxSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="516" height="186" rx="16" fill="#eff6ff" stroke="#93c5fd" />
    <path d="M 60 60 L 60 160 L 260 160 L 260 60" fill="#fde68a" stroke="#92400e" strokeWidth="3" />
    <polygon points="60,60 100,30 300,30 260,60" fill="#fcd34d" stroke="#92400e" strokeWidth="2" />
    {Array.from({ length: 14 }, (_, i) => (
      <circle key={i} cx={80 + (i % 7) * 26} cy={130 - Math.floor(i / 7) * 26} r="11" fill={i % 3 === 0 ? '#2563eb' : '#dc2626'} opacity="0.85" />
    ))}
    <text x="160" y="52" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#92400e">?</text>
    <text x="290" y="90" fontSize="12" fill="#0f172a">• legalább 7 kell, hogy</text>
    <text x="300" y="106" fontSize="12" fill="#0f172a">biztosan legyen piros</text>
    <text x="290" y="132" fontSize="12" fill="#0f172a">• legalább 13 kell, hogy</text>
    <text x="300" y="148" fontSize="12" fill="#0f172a">biztosan legyen kétféle</text>
  </svg>
);
