import React from 'react';
import { BalancePart, PanItem, PanItemPart } from './MassG2Parts';

// ---------------------------------------------------------------------------
// 2. A tömeg mérése – kártyaképek (Párosító 150 × 80, Csoportosító 80 × 80)
// ---------------------------------------------------------------------------

const FONT = 'system-ui, Segoe UI, sans-serif';

const Card: React.FC<{ small?: boolean; children: React.ReactNode; bg?: string }> = ({ small, children, bg = '#f8fafc' }) => {
  const W = small ? 80 : 150;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="2" y="2" width={W - 4} height="76" rx="10" fill={bg} stroke="#334155" strokeWidth="3" />
      {children}
    </svg>
  );
};

/** Kétkarú mérleg a kártyán (talp nélkül, egyszerű állvánnyal). */
export const BalanceCard: React.FC<{ left: PanItem[]; right: PanItem[]; tilt?: number; small?: boolean }> = ({
  left,
  right,
  tilt = 0,
  small
}) => {
  const W = small ? 80 : 150;
  const cx = W / 2;
  const y = small ? 30 : 24;
  return (
    <Card small={small}>
      <line x1={cx} y1={y} x2={cx} y2={72} stroke="#475569" strokeWidth="3" />
      <rect x={cx - 14} y={70} width="28" height="5" rx="2" fill="#334155" />
      <BalancePart cx={cx} y={y} half={small ? 23 : 50} tilt={tilt} left={left} right={right} panW={small ? 28 : 56} base={false} />
    </Card>
  );
};

/** `n` egyforma láda, mindegyiken a tömege. */
export const CratesCard: React.FC<{ n: number; each: number; small?: boolean }> = ({ n, each, small }) => {
  if (small) {
    return (
      <Card small>
        {Array.from({ length: n }, (_, i) => (
          <g key={i}>
            <rect x={16} y={56 - i * 19} width="48" height="17" rx="2" fill="#d6a76c" stroke="#78350f" strokeWidth="1.6" />
            <text x={40} y={69 - i * 19} textAnchor="middle" fontSize="12" fontWeight="900" fill="#422006">
              {each} kg
            </text>
          </g>
        ))}
        <rect x="10" y="73" width="60" height="4" fill="#64748b" />
      </Card>
    );
  }
  const bw = 26;
  const gap = 2;
  const x0 = 75 - (n * bw + (n - 1) * gap) / 2;
  return (
    <Card>
      <rect x="10" y="56" width="130" height="10" rx="3" fill="#94a3b8" stroke="#334155" strokeWidth="1.5" />
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <rect x={x0 + i * (bw + gap)} y={30} width={bw} height={26} rx="2" fill="#d6a76c" stroke="#78350f" strokeWidth="1.6" />
          <text x={x0 + i * (bw + gap) + bw / 2} y={48} textAnchor="middle" fontSize="10" fontWeight="900" fill="#422006">
            {each} kg
          </text>
        </g>
      ))}
    </Card>
  );
};

/** Súlyok egy tálcán (80 × 80). */
export const WeightsCard: React.FC<{ ws: number[] }> = ({ ws }) => {
  const rows = ws.length > 2 ? [ws.slice(0, 2), ws.slice(2)] : [ws];
  return (
    <Card small>
      {rows.map((row, r) => {
        const widths = row.map((kg) => (kg >= 10 ? 32 : kg >= 5 ? 27 : kg >= 2 ? 22 : 18));
        const total = widths.reduce((s, w) => s + w + 4, -4);
        let cur = 40 - total / 2;
        const y = rows.length === 1 ? 56 : r === 0 ? 38 : 70;
        return (
          <g key={r}>
            {row.map((kg, i) => {
              const x = cur + widths[i] / 2;
              cur += widths[i] + 4;
              return <PanItemPart key={i} it={{ kind: 'w', kg }} x={x} y={y} />;
            })}
          </g>
        );
      })}
      {rows.length === 1 && <rect x="10" y="57" width="60" height="5" rx="2" fill="#94a3b8" />}
    </Card>
  );
};
