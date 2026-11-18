import React from 'react';
import { MULT3_FONT, MULT3_COLORS, CloverPart, StickTrianglePart } from './Mult3G2Parts';

// ---------------------------------------------------------------------------
// Kártyaképek: Párosító (150 × 80) és Csoportosító (80 × 80, small)
// Egyik sem írja ki az eredményt.
// ---------------------------------------------------------------------------

const Frame: React.FC<{ small?: boolean; children: React.ReactNode; fill?: string }> = ({ small, children, fill = '#f8fafc' }) => {
  const w = small ? 80 : 150;
  return (
    <svg viewBox={`0 0 ${w} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT3_FONT}>
      <rect x="2" y="2" width={w - 4} height="76" rx="10" fill={fill} stroke="#334155" strokeWidth="3" />
      {children}
    </svg>
  );
};

/** Elrendezés: hány elem fér egy sorba. */
const layout = (n: number, small?: boolean) => {
  const perRow = small ? 3 : 5;
  const rows = Math.ceil(n / perRow);
  return { perRow, rows };
};

/** `n` darab háromlevelű lóhere. */
export const CloverCard: React.FC<{ n: number; small?: boolean }> = ({ n, small }) => {
  const { perRow, rows } = layout(n, small);
  const r = small ? 5.2 : 6.8;
  const dx = small ? 24 : 27;
  const dy = small ? 24 : 32;
  const w = small ? 80 : 150;
  const totalH = rows * dy;
  const y0 = 40 - totalH / 2 + dy * 0.38;
  return (
    <Frame small={small} fill="#f0fdf4">
      {Array.from({ length: n }, (_, i) => {
        const r0 = Math.floor(i / perRow);
        const inRow = Math.min(perRow, n - r0 * perRow);
        const c = i % perRow;
        const cx = w / 2 + (c - (inRow - 1) / 2) * dx;
        return <CloverPart key={i} cx={cx} cy={y0 + r0 * dy} r={r} />;
      })}
    </Frame>
  );
};

/** `n` darab pálcika-háromszög. */
export const TriCard: React.FC<{ n: number; small?: boolean }> = ({ n, small }) => {
  const { perRow, rows } = layout(n, small);
  const s = small ? 19 : 22;
  const dx = small ? 24 : 27;
  const dy = small ? 24 : 32;
  const w = small ? 80 : 150;
  const y0 = 40 - (rows * dy) / 2 + (dy - s) / 2;
  return (
    <Frame small={small} fill="#fff7ed">
      {Array.from({ length: n }, (_, i) => {
        const r0 = Math.floor(i / perRow);
        const inRow = Math.min(perRow, n - r0 * perRow);
        const c = i % perRow;
        const cx = w / 2 + (c - (inRow - 1) / 2) * dx;
        return <StickTrianglePart key={i} x={cx - s / 2} y={y0 + r0 * dy} s={s} w={3.2} />;
      })}
    </Frame>
  );
};

/** `groups` karika, mindegyikben `each` (2 vagy 3) korong. */
export const GroupsCard: React.FC<{ groups: number; each?: number; small?: boolean }> = ({ groups, each = 3, small }) => {
  const { perRow, rows } = layout(groups, small);
  const size = small ? 22 : 26;
  const dx = small ? 24 : 28;
  const w = small ? 80 : 150;
  const y0 = 40 - (rows * dx) / 2 + 1;
  return (
    <Frame small={small}>
      {Array.from({ length: groups }, (_, g) => {
        const r0 = Math.floor(g / perRow);
        const inRow = Math.min(perRow, groups - r0 * perRow);
        const c = g % perRow;
        const cx = w / 2 + (c - (inRow - 1) / 2) * dx;
        const cy = y0 + r0 * dx + size / 2;
        const rr = size * 0.16;
        const pts =
          each === 3
            ? [
                { x: cx, y: cy - size * 0.19 },
                { x: cx - size * 0.21, y: cy + size * 0.17 },
                { x: cx + size * 0.21, y: cy + size * 0.17 }
              ]
            : [
                { x: cx - size * 0.18, y: cy },
                { x: cx + size * 0.18, y: cy }
              ];
        return (
          <g key={g}>
            <circle cx={cx} cy={cy} r={size / 2 - 1} fill="#fff" stroke="#475569" strokeWidth="2.2" />
            {pts.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={rr} fill={MULT3_COLORS[g % MULT3_COLORS.length]} stroke="#1e293b" strokeWidth="1" />
            ))}
          </g>
        );
      })}
    </Frame>
  );
};

/** Hármas ugrások 0-tól; a végén `endLabel` (alapból „?”). */
export const JumpsCard: React.FC<{ jumps: number; small?: boolean; endLabel?: string }> = ({ jumps, small, endLabel = '?' }) => {
  const w = small ? 80 : 150;
  const x0 = small ? 8 : 10;
  const unit = small ? 2.13 : 4.3;
  const y = small ? 48 : 46;
  const X = (v: number) => x0 + v * unit;
  return (
    <Frame small={small} fill="#faf5ff">
      <line x1={X(0)} y1={y} x2={X(30) + 2} y2={y} stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={X(i * 3)} y1={y - 4} x2={X(i * 3)} y2={y + 4} stroke="#334155" strokeWidth="1.6" />
      ))}
      {Array.from({ length: jumps }, (_, i) => {
        const a = X(i * 3);
        const b = X((i + 1) * 3);
        const m = (a + b) / 2;
        return <path key={i} d={`M ${a} ${y - 2} Q ${m} ${y - (small ? 14 : 24)} ${b} ${y - 2}`} fill="none" stroke="#7c3aed" strokeWidth={small ? 2 : 2.6} />;
      })}
      <text x={X(0)} y={y + 20} textAnchor="middle" fontSize={small ? 13 : 15} fontWeight="900" fill="#334155">
        0
      </text>
      <text
        x={Math.min(X(jumps * 3), w - (small ? 12 : 14))}
        y={y + 22}
        textAnchor="middle"
        fontSize={small ? 15 : 18}
        fontWeight="900"
        fill="#dc2626"
      >
        {endLabel}
      </text>
    </Frame>
  );
};

/** Nyíl-gép: `from` → · 3 → `to` (bármelyik lehet „?”). */
export const ArrowCard: React.FC<{ from: string; to: string; small?: boolean }> = ({ from, to, small }) => {
  if (small) {
    return (
      <Frame small fill="#ecfeff">
        <rect x="18" y="7" width="44" height="22" rx="6" fill="#fff" stroke="#db2777" strokeWidth="2.5" />
        <text x="40" y="24" textAnchor="middle" fontSize="16" fontWeight="900" fill={from === '?' ? '#dc2626' : '#831843'}>
          {from}
        </text>
        <line x1="40" y1="31" x2="40" y2="47" stroke="#0891b2" strokeWidth="3" />
        <path d="M 34 44 L 40 51 L 46 44 Z" fill="#0891b2" />
        <text x="60" y="45" textAnchor="middle" fontSize="13" fontWeight="900" fill="#0e7490">
          ·3
        </text>
        <rect x="18" y="52" width="44" height="22" rx="6" fill="#fff" stroke="#db2777" strokeWidth="2.5" />
        <text x="40" y="69" textAnchor="middle" fontSize="16" fontWeight="900" fill={to === '?' ? '#dc2626' : '#831843'}>
          {to}
        </text>
      </Frame>
    );
  }
  return (
    <Frame fill="#ecfeff">
      <rect x="10" y="22" width="40" height="36" rx="8" fill="#fff" stroke="#db2777" strokeWidth="3" />
      <text x="30" y="48" textAnchor="middle" fontSize="20" fontWeight="900" fill={from === '?' ? '#dc2626' : '#831843'}>
        {from}
      </text>
      <line x1="54" y1="40" x2="92" y2="40" stroke="#0891b2" strokeWidth="3.5" />
      <path d="M 88 33 L 97 40 L 88 47 Z" fill="#0891b2" />
      <text x="75" y="31" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0e7490">
        · 3
      </text>
      <rect x="100" y="22" width="40" height="36" rx="8" fill="#fff" stroke="#db2777" strokeWidth="3" />
      <text x="120" y="48" textAnchor="middle" fontSize="20" fontWeight="900" fill={to === '?' ? '#dc2626' : '#831843'}>
        {to}
      </text>
    </Frame>
  );
};

/** Rácspontok: `rows` sor × `cols` oszlop. */
export const ArrayCard: React.FC<{ rows: number; cols: number; small?: boolean }> = ({ rows, cols, small }) => {
  const w = small ? 80 : 150;
  const step = small ? Math.min(14, 64 / cols) : Math.min(16, 130 / cols);
  const r = step * 0.36;
  const x0 = w / 2 - ((cols - 1) * step) / 2;
  const y0 = 40 - ((rows - 1) * step) / 2;
  return (
    <Frame small={small} fill="#eff6ff">
      {Array.from({ length: rows * cols }, (_, i) => {
        const rr = Math.floor(i / cols);
        const c = i % cols;
        return (
          <circle key={i} cx={x0 + c * step} cy={y0 + rr * step} r={r} fill={['#ef4444', '#3b82f6', '#f59e0b'][rr % 3]} stroke="#1e293b" strokeWidth="1.1" />
        );
      })}
    </Frame>
  );
};
