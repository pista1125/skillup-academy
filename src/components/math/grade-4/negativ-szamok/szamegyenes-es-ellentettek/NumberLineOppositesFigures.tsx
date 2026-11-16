import React from 'react';

const FONT = 'system-ui, sans-serif';
export const NEG_BLUE = '#2563eb';
export const POS_RED = '#dc2626';

/** Szám kiírása a tankönyv szerint: negatív előjel „−”, ötjegyűtől szóköz. */
export const fmtNum = (n: number): string => {
  const a = Math.abs(n);
  const s = a >= 10000 ? String(a).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(a);
  return n < 0 ? `−${s}` : s;
};

// ---------------------------------------------------------------------------
// Általános számegyenes (SVG <g>)
// ---------------------------------------------------------------------------
export interface NLPoint {
  v: number;
  label?: string;
  color?: string;
}
export interface NLJump {
  from: number;
  to: number;
  color?: string;
}
export interface NumberLineProps {
  x0?: number;
  x1?: number;
  y?: number;
  min: number;
  max: number;
  /** ennyi egységenként van osztás */
  tick?: number;
  /** ezeket a számokat írjuk ki; alapból minden osztást */
  labels?: number[];
  points?: NLPoint[];
  jumps?: NLJump[];
  /** színezze-e a negatív/pozitív számokat */
  colored?: boolean;
  fontSize?: number;
  onPick?: (v: number) => void;
  highlight?: number | null;
}

export const NumberLineGroup: React.FC<NumberLineProps> = ({
  x0 = 20,
  x1 = 320,
  y = 60,
  min,
  max,
  tick = 1,
  labels,
  points = [],
  jumps = [],
  colored = true,
  fontSize = 10,
  onPick,
  highlight = null
}) => {
  const X = (v: number) => x0 + ((v - min) / (max - min)) * (x1 - x0);
  const ticks: number[] = [];
  for (let v = min; v <= max + 1e-9; v += tick) ticks.push(Math.round(v));
  const shown = labels ?? ticks;
  const col = (v: number) => (!colored || v === 0 ? '#0f172a' : v < 0 ? NEG_BLUE : POS_RED);
  return (
    <g fontFamily={FONT}>
      <line x1={x0 - 10} y1={y} x2={x1 + 12} y2={y} stroke="#334155" strokeWidth="1.6" />
      <polygon points={`${x1 + 18},${y} ${x1 + 9},${y - 4} ${x1 + 9},${y + 4}`} fill="#334155" />
      {ticks.map((v) => (
        <g key={v}>
          <line x1={X(v)} y1={y - (v === 0 ? 8 : 5)} x2={X(v)} y2={y + (v === 0 ? 8 : 5)} stroke="#334155" strokeWidth={v === 0 ? 2 : 1} />
          {shown.includes(v) && (
            <text x={X(v)} y={y + 18} textAnchor="middle" fontSize={fontSize} fontWeight={v === 0 ? 'bold' : 'normal'} fill={col(v)}>
              {fmtNum(v)}
            </text>
          )}
          {onPick && (
            <rect
              x={X(v) - ((x1 - x0) / ((max - min) / tick)) / 2}
              y={y - 16}
              width={(x1 - x0) / ((max - min) / tick)}
              height="40"
              fill={highlight === v ? 'rgba(250,204,21,0.35)' : 'transparent'}
              style={{ cursor: 'pointer' }}
              onClick={() => onPick(v)}
              data-testid={`nl-pick-${v}`}
            />
          )}
        </g>
      ))}
      {jumps.map((j, i) => {
        const a = X(j.from);
        const b = X(j.to);
        const hgt = Math.min(34, 8 + Math.abs(b - a) * 0.3);
        const c = j.color ?? '#16a34a';
        const dir = b > a ? 1 : -1;
        return (
          <g key={i}>
            <path d={`M ${a} ${y - 4} Q ${(a + b) / 2} ${y - 4 - hgt * 2} ${b} ${y - 4}`} fill="none" stroke={c} strokeWidth="2" />
            <polygon points={`${b},${y - 3} ${b - dir * 7},${y - 9} ${b - dir * 2},${y - 11}`} fill={c} />
          </g>
        );
      })}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={X(p.v)} cy={y} r="4.5" fill={p.color ?? col(p.v)} stroke="#ffffff" strokeWidth="1" />
          {p.label && (
            <text x={X(p.v)} y={y - 10} textAnchor="middle" fontSize={fontSize + 2} fontWeight="bold" fill={p.color ?? col(p.v)}>
              {p.label}
            </text>
          )}
        </g>
      ))}
    </g>
  );
};

/** A tankönyv 90. oldali számegyenese: balra kék negatív, jobbra piros pozitív számok. */
export const NumberLineSvg: React.FC<{ className?: string }> = ({ className }) => {
  const pts: NLPoint[] = [];
  for (let v = -10; v <= 10; v++) if (v !== 0) pts.push({ v });
  return (
    <svg viewBox="0 0 340 150" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="338" height="148" rx="12" fill="#fff7ed" stroke="#fed7aa" />
      <NumberLineGroup min={-10} max={10} y={50} points={pts} fontSize={8} />
      <rect x="14" y="84" width="140" height="52" rx="10" fill="#ffffff" stroke="#93c5fd" />
      <text x="84" y="104" textAnchor="middle" fontSize="11" fill="#0f172a">A 0-tól <tspan fill={NEG_BLUE} fontWeight="bold">balra</tspan></text>
      <text x="84" y="122" textAnchor="middle" fontSize="11" fill="#0f172a">a <tspan fontWeight="bold">negatív</tspan> számok.</text>
      <rect x="186" y="84" width="140" height="52" rx="10" fill="#ffffff" stroke="#fca5a5" />
      <text x="256" y="104" textAnchor="middle" fontSize="11" fill="#0f172a">A 0-tól <tspan fill={POS_RED} fontWeight="bold">jobbra</tspan></text>
      <text x="256" y="122" textAnchor="middle" fontSize="11" fill="#0f172a">a <tspan fontWeight="bold">pozitív</tspan> számok.</text>
    </svg>
  );
};

/** Ellentett számok: ugyanolyan messze a 0-tól, két oldalán. */
export const OppositesSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 340 170" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="338" height="168" rx="12" fill="#f5f3ff" stroke="#c4b5fd" />
    <NumberLineGroup
      min={-6}
      max={6}
      y={100}
      points={[
        { v: -4, label: '−4' },
        { v: 4, label: '4' }
      ]}
      jumps={[
        { from: 0, to: -4, color: NEG_BLUE },
        { from: 0, to: 4, color: POS_RED }
      ]}
    />
    <text x="98" y="40" textAnchor="middle" fontSize="11" fontWeight="bold" fill={NEG_BLUE}>4 lépés balra</text>
    <text x="242" y="40" textAnchor="middle" fontSize="11" fontWeight="bold" fill={POS_RED}>4 lépés jobbra</text>
    <text x="170" y="146" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#5b21b6">A 4 és a −4 ellentett számok.</text>
    <text x="170" y="162" textAnchor="middle" fontSize="10" fill="#475569">Ugyanolyan messze vannak a 0-tól, csak a két oldalán.</text>
  </svg>
);

/** A szöcske ugrásai (tankönyv 90. o., 12. feladat): 3-ról jobbra 4-et. */
export const GrasshopperSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 340 130" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="338" height="128" rx="12" fill="#f0fdf4" stroke="#86efac" />
    <NumberLineGroup
      min={-6}
      max={10}
      y={86}
      points={[{ v: 3, color: '#16a34a' }, { v: 7, label: '7', color: '#16a34a' }]}
      jumps={[{ from: 3, to: 4 }, { from: 4, to: 5 }, { from: 5, to: 6 }, { from: 6, to: 7 }]}
    />
    <text x="148" y="76" fontSize="16">🦗</text>
    <text x="20" y="24" fontSize="11" fontWeight="bold" fill="#166534">Start: 3. Jobbra 4 ugrás: 3 → 4 → 5 → 6 → 7</text>
  </svg>
);

/** A búvárok merülési mélysége (munkafüzet 85. o., 13. feladat). */
export const DIVERS: { n: string; d: number }[] = [
  { n: 'A', d: -28 },
  { n: 'B', d: -8 },
  { n: 'C', d: -14 },
  { n: 'D', d: -23 },
  { n: 'E', d: -7 }
];

export const DiversSvg: React.FC<{ className?: string; ask?: string | null; showAll?: boolean }> = ({ className, ask = null, showAll = true }) => {
  const Y = (d: number) => 24 + (-d / 30) * 150;
  return (
    <svg viewBox="0 0 320 200" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="318" height="198" rx="12" fill="#ffffff" stroke="#cbd5e1" />
      <rect x="46" y="24" width="262" height="150" fill="#e0f2fe" />
      {Array.from({ length: 30 }, (_, k) => -k - 1)
        .filter((d) => d % 5 !== 0)
        .map((d) => (
          <line key={`m${d}`} x1="46" y1={Y(d)} x2="308" y2={Y(d)} stroke="#bfdbfe" strokeWidth="0.5" />
        ))}
      {[0, -5, -10, -15, -20, -25, -30].map((d) => (
        <g key={d}>
          <line x1="42" y1={Y(d)} x2="308" y2={Y(d)} stroke={d === 0 ? '#1d4ed8' : '#bae6fd'} strokeWidth={d === 0 ? 2 : 1} />
          <text x="38" y={Y(d) + 3} textAnchor="end" fontSize="9" fill="#334155">{fmtNum(d)}</text>
        </g>
      ))}
      <text x="10" y="16" fontSize="9" fill="#334155">méter</text>
      {DIVERS.map((dv, i) => {
        const x = 70 + i * 50;
        const hidden = !showAll && ask !== dv.n;
        return (
          <g key={dv.n}>
            <rect x={x - 12} y={Y(0)} width="24" height={Y(dv.d) - Y(0)} fill={ask === dv.n ? '#f97316' : '#3b82f6'} opacity={hidden ? 0.5 : 1} />
            <text x={x} y={Y(0) + 12} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">{dv.n}</text>
            <text x={x} y={Y(dv.d) + 4} textAnchor="middle" fontSize="12">🤿</text>
          </g>
        );
      })}
      <text x="177" y="192" textAnchor="middle" fontSize="10" fill="#334155">Búvárok – a víz felszíne a 0 m</text>
    </svg>
  );
};

/** Számszomszédok a negatív számoknál (munkafüzet 86. o., 15. feladat): −15. */
export const NeighboursSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 340 150" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="338" height="148" rx="12" fill="#fefce8" stroke="#fde047" />
    <NumberLineGroup
      min={-22}
      max={-8}
      y={60}
      labels={[-20, -16, -15, -14, -10]}
      points={[
        { v: -20, label: '−20', color: '#7c3aed' },
        { v: -16, label: '−16', color: '#0891b2' },
        { v: -15, label: '−15', color: '#dc2626' },
        { v: -14, label: '−14', color: '#0891b2' },
        { v: -10, label: '−10', color: '#7c3aed' }
      ]}
      fontSize={9}
    />
    <text x="170" y="104" textAnchor="middle" fontSize="11" fill="#0f172a">kisebb egyes szomszéd: <tspan fontWeight="bold" fill="#0891b2">−16</tspan> • nagyobb: <tspan fontWeight="bold" fill="#0891b2">−14</tspan></text>
    <text x="170" y="124" textAnchor="middle" fontSize="11" fill="#0f172a">kisebb tízes szomszéd: <tspan fontWeight="bold" fill="#7c3aed">−20</tspan> • nagyobb: <tspan fontWeight="bold" fill="#7c3aed">−10</tspan></text>
    <text x="170" y="142" textAnchor="middle" fontSize="9" fill="#475569">A kisebb szomszéd mindig balra van!</text>
  </svg>
);

/** Számegyenes 100-asával (tankönyv 90. o., 8. c) mintájára). */
export const ScaledLineSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 340 120" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="338" height="118" rx="12" fill="#ffffff" stroke="#cbd5e1" />
    <NumberLineGroup
      min={-600}
      max={600}
      tick={100}
      y={58}
      labels={[0, 100]}
      points={[
        { v: -500, label: 'A' },
        { v: -200, label: 'B' },
        { v: 300, label: 'C' }
      ]}
    />
    <text x="170" y="100" textAnchor="middle" fontSize="11" fill="#0f172a">Egy osztás 100. A = −500, B = −200, C = 300</text>
  </svg>
);
