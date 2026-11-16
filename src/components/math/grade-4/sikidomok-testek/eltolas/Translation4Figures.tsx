import React from 'react';

const GridLines: React.FC<{ x0: number; y0: number; cols: number; rows: number; u: number; color?: string }> = ({
  x0,
  y0,
  cols,
  rows,
  u,
  color = '#cbd5e1'
}) => (
  <g>
    {Array.from({ length: cols + 1 }, (_, i) => (
      <line key={`v${i}`} x1={x0 + i * u} y1={y0} x2={x0 + i * u} y2={y0 + rows * u} stroke={color} strokeWidth="0.8" />
    ))}
    {Array.from({ length: rows + 1 }, (_, i) => (
      <line key={`h${i}`} x1={x0} y1={y0 + i * u} x2={x0 + cols * u} y2={y0 + i * u} stroke={color} strokeWidth="0.8" />
    ))}
  </g>
);

const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; color: string; w?: number; dash?: boolean }> = ({
  x1,
  y1,
  x2,
  y2,
  color,
  w = 2.5,
  dash
}) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = 9;
  const p1 = [x2 - h * Math.cos(a - 0.45), y2 - h * Math.sin(a - 0.45)];
  const p2 = [x2 - h * Math.cos(a + 0.45), y2 - h * Math.sin(a + 0.45)];
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} strokeDasharray={dash ? '5 4' : undefined} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`} fill={color} />
    </g>
  );
};

// ---------------------------------------------------------------------------
// 1. Tanári asztal: mekkora távolságra, milyen irányban? (TK 128/1.)
// ---------------------------------------------------------------------------
export const DeskPushSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 340 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="338" height="188" rx="14" fill="#fff7ed" stroke="#fed7aa" />
    <rect x="10" y="150" width="320" height="8" fill="#e7e5e4" />
    {/* asztal eredeti helyen (szaggatott) */}
    <rect x="30" y="80" width="100" height="16" fill="none" stroke="#a8a29e" strokeWidth="2" strokeDasharray="5 4" />
    <rect x="36" y="96" width="8" height="54" fill="none" stroke="#a8a29e" strokeWidth="2" strokeDasharray="5 4" />
    <rect x="116" y="96" width="8" height="54" fill="none" stroke="#a8a29e" strokeWidth="2" strokeDasharray="5 4" />
    {/* asztal új helyen */}
    <rect x="200" y="80" width="100" height="16" fill="#d97706" stroke="#78350f" strokeWidth="2" />
    <rect x="206" y="96" width="8" height="54" fill="#92400e" />
    <rect x="286" y="96" width="8" height="54" fill="#92400e" />
    <rect x="215" y="96" width="70" height="30" fill="#f59e0b" stroke="#78350f" />
    <Arrow x1={135} y1={118} x2={195} y2={118} color="#2563eb" w={3} />
    <rect x="18" y="16" width="140" height="34" rx="17" fill="#0ea5e9" />
    <text x="88" y="38" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ffffff">Mekkora távolságra?</text>
    <rect x="182" y="16" width="140" height="34" rx="17" fill="#0ea5e9" />
    <text x="252" y="38" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ffffff">Milyen irányban?</text>
    <text x="170" y="178" textAnchor="middle" fontSize="11" fill="#57534e">Az eltoláshoz mindkettőt meg kell mondani!</text>
  </svg>
);

// ---------------------------------------------------------------------------
// 2. Fő- és mellékvilágtájak
// ---------------------------------------------------------------------------
export const CompassRoseSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const c = 110;
  const main = [
    { t: 'É', n: 'észak', a: -90 },
    { t: 'K', n: 'kelet', a: 0 },
    { t: 'D', n: 'dél', a: 90 },
    { t: 'NY', n: 'nyugat', a: 180 }
  ];
  const side = [
    { t: 'ÉK', n: 'északkelet', a: -45 },
    { t: 'DK', n: 'délkelet', a: 45 },
    { t: 'DNY', n: 'délnyugat', a: 135 },
    { t: 'ÉNY', n: 'északnyugat', a: -135 }
  ];
  const rad = (d: number) => (d * Math.PI) / 180;
  return (
    <svg viewBox="0 0 340 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="338" height="218" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
      <circle cx={c} cy={c} r="78" fill="#ffffff" stroke="#93c5fd" strokeWidth="2" />
      {side.map((s) => (
        <g key={s.t}>
          <line x1={c} y1={c} x2={c + 58 * Math.cos(rad(s.a))} y2={c + 58 * Math.sin(rad(s.a))} stroke="#94a3b8" strokeWidth="3" />
          <text x={c + 72 * Math.cos(rad(s.a))} y={c + 72 * Math.sin(rad(s.a)) + 4} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">
            {s.t}
          </text>
        </g>
      ))}
      {main.map((m) => (
        <g key={m.t}>
          <line x1={c} y1={c} x2={c + 62 * Math.cos(rad(m.a))} y2={c + 62 * Math.sin(rad(m.a))} stroke="#dc2626" strokeWidth="5" strokeLinecap="round" />
          <circle cx={c + 92 * Math.cos(rad(m.a))} cy={c + 92 * Math.sin(rad(m.a))} r="13" fill="#dc2626" />
          <text x={c + 92 * Math.cos(rad(m.a))} y={c + 92 * Math.sin(rad(m.a)) + 4.5} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {m.t}
          </text>
        </g>
      ))}
      <circle cx={c} cy={c} r="6" fill="#0f172a" />
      <text x="232" y="34" fontSize="12" fontWeight="bold" fill="#dc2626">Fővilágtájak</text>
      {main.map((m, i) => (
        <text key={m.n} x="232" y={52 + i * 15} fontSize="11" fill="#334155">
          {m.t} = {m.n}
        </text>
      ))}
      <text x="232" y="126" fontSize="12" fontWeight="bold" fill="#475569">Mellékvilágtájak</text>
      {side.map((s, i) => (
        <text key={s.n} x="232" y={144 + i * 15} fontSize="11" fill="#334155">
          {s.t} = {s.n}
        </text>
      ))}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// 3. Szék eltolása keletre és északkeletre (TK 128/2.) – felülnézet négyzethálón
// ---------------------------------------------------------------------------
const Chair: React.FC<{ x: number; y: number; s: number; ghost?: boolean }> = ({ x, y, s, ghost }) => (
  <g opacity={ghost ? 0.45 : 1}>
    <rect x={x} y={y} width={s} height={s} rx="3" fill={ghost ? '#e7e5e4' : '#fcd34d'} stroke="#92400e" strokeWidth="2" strokeDasharray={ghost ? '4 3' : undefined} />
    <rect x={x} y={y - 6} width={s} height="6" fill={ghost ? '#d6d3d1' : '#b91c1c'} stroke="#7f1d1d" />
  </g>
);

export const ChairShiftSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const u = 20;
  return (
    <svg viewBox="0 0 360 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="358" height="168" rx="12" fill="#ffffff" stroke="#e2e8f0" />
      <GridLines x0={10} y0={30} cols={8} rows={5} u={u} />
      <GridLines x0={190} y0={30} cols={8} rows={5} u={u} />
      <Chair x={10 + u} y={30 + 3 * u} s={u} ghost />
      <Chair x={10 + 5 * u} y={30 + 3 * u} s={u} />
      <Arrow x1={10 + 1.5 * u} y1={30 + 3.5 * u} x2={10 + 5.5 * u} y2={30 + 3.5 * u} color="#2563eb" />
      <Chair x={190 + u} y={30 + 3 * u} s={u} ghost />
      <Chair x={190 + 4 * u} y={30 + 0 * u} s={u} />
      <Arrow x1={190 + 1.5 * u} y1={30 + 3.5 * u} x2={190 + 4.5 * u} y2={30 + 0.5 * u} color="#2563eb" />
      <text x="90" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">keletre 4 négyzettel</text>
      <text x="270" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">északkeletre 3 lépéssel</text>
      <text x="180" y="156" textAnchor="middle" fontSize="10.5" fill="#475569">Felülnézet. Észak felfelé van. Az északkeleti lépés átlósan halad.</text>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// 4. Vonatsablon az egyenes mentén (TK 128/3.)
// ---------------------------------------------------------------------------
const Train: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <rect x={x - 22} y={y - 34} width="30" height="24" rx="3" fill="#a5b4fc" stroke="#3730a3" strokeWidth="1.5" />
    <rect x={x - 18} y={y - 30} width="10" height="9" fill="#ffffff" stroke="#3730a3" />
    <rect x={x + 8} y={y - 24} width="18" height="14" fill="#a5b4fc" stroke="#3730a3" strokeWidth="1.5" />
    <rect x={x + 14} y={y - 34} width="6" height="10" fill="#6366f1" />
    <circle cx={x - 12} cy={y - 7} r="6" fill="#e0e7ff" stroke="#3730a3" strokeWidth="1.5" />
    <circle cx={x + 4} cy={y - 7} r="6" fill="#e0e7ff" stroke="#3730a3" strokeWidth="1.5" />
    <circle cx={x + 19} cy={y - 7} r="5" fill="#e0e7ff" stroke="#3730a3" strokeWidth="1.5" />
  </g>
);

export const TrainTemplateSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const pts = [{ l: 'A', x: 45 }, { l: 'B', x: 125 }, { l: 'C', x: 225 }, { l: 'D', x: 305 }];
  return (
    <svg viewBox="0 0 360 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="358" height="118" rx="12" fill="#ffffff" stroke="#e2e8f0" />
      <line x1="15" y1="70" x2="345" y2="70" stroke="#0f172a" strokeWidth="3" />
      {pts.map((p) => (
        <g key={p.l}>
          <Train x={p.x} y={68} />
          <circle cx={p.x} cy={70} r="6" fill="#ef4444" />
          <text x={p.x} y={92} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
            {p.l}
          </text>
        </g>
      ))}
      <text x="180" y="111" textAnchor="middle" fontSize="10.5" fill="#475569">Az eltolás során a vonat alakja és nagysága nem változik.</text>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// 5. Eltolás négyzethálón: minden pont ugyanannyit, ugyanarra mozdul
// ---------------------------------------------------------------------------
export const GridShiftSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const u = 20;
  const x0 = 20;
  const y0 = 16;
  const P = (c: number, r: number) => `${x0 + c * u},${y0 + r * u}`;
  const tri = [[1, 6], [4, 6], [1, 3]];
  const dx = 6;
  const dy = -2;
  return (
    <svg viewBox="0 0 340 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="338" height="188" rx="12" fill="#ffffff" stroke="#e2e8f0" />
      <GridLines x0={x0} y0={y0} cols={12} rows={7} u={u} />
      <polygon points={tri.map(([c, r]) => P(c, r)).join(' ')} fill="#fed7aa" stroke="#c2410c" strokeWidth="2.5" />
      <polygon points={tri.map(([c, r]) => P(c + dx, r + dy)).join(' ')} fill="#fdba74" stroke="#9a3412" strokeWidth="2.5" />
      {tri.map(([c, r], i) => (
        <Arrow key={i} x1={x0 + c * u} y1={y0 + r * u} x2={x0 + (c + dx) * u - 6} y2={y0 + (r + dy) * u + 2} color="#2563eb" w={1.8} dash />
      ))}
      <text x="280" y="40" fontSize="11" fontWeight="bold" fill="#1d4ed8">6 kelet,</text>
      <text x="280" y="55" fontSize="11" fontWeight="bold" fill="#1d4ed8">2 észak</text>
      <text x="170" y="182" textAnchor="middle" fontSize="10.5" fill="#475569">Minden csúcs ugyanannyit és ugyanarra mozdul el.</text>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// 6. Buszmegállók 5 cm-enként (TK 128/4.)
// ---------------------------------------------------------------------------
const Bus: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <rect x={x - 22} y={y - 22} width="44" height="16" rx="4" fill="#38bdf8" stroke="#075985" strokeWidth="1.5" />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={x - 18 + i * 10} y={y - 19} width="7" height="6" fill="#ffffff" />
    ))}
    <circle cx={x - 12} cy={y - 5} r="4" fill="#1e293b" />
    <circle cx={x + 12} cy={y - 5} r="4" fill="#1e293b" />
  </g>
);

export const BusStopsSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const xs = [40, 130, 220, 310];
  return (
    <svg viewBox="0 0 360 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="358" height="118" rx="12" fill="#ffffff" stroke="#e2e8f0" />
      <line x1="15" y1="70" x2="345" y2="70" stroke="#0f172a" strokeWidth="3" />
      {xs.map((x, i) => (
        <g key={x}>
          <Bus x={x} y={68} />
          <circle cx={x} cy={70} r="5" fill="#0f172a" />
          <text x={x} y={90} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">
            {i + 1}. megálló
          </text>
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <text key={i} x={(xs[i] + xs[i + 1]) / 2} y={108} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#c2410c">
          5 cm
        </text>
      ))}
    </svg>
  );
};
