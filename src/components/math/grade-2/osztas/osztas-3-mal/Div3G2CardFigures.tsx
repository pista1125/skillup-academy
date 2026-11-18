import React from 'react';
import { DIV3_FONT, DIV3_COLORS, PlatePart } from './Div3G2Parts';

// ---------------------------------------------------------------------------
// Kártyaképek: Párosító (150 × 80) és Csoportosító (80 × 80, small)
// Egyik sem írja ki az eredményt.
// ---------------------------------------------------------------------------

const Frame: React.FC<{ small?: boolean; children: React.ReactNode; fill?: string }> = ({ small, children, fill = '#f8fafc' }) => {
  const w = small ? 80 : 150;
  return (
    <svg viewBox={`0 0 ${w} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV3_FONT}>
      <rect x="2" y="2" width={w - 4} height="76" rx="10" fill={fill} stroke="#334155" strokeWidth="3" />
      {children}
    </svg>
  );
};

/** 3 tányér, mindegyiken `each` süti. */
export const PlatesCard: React.FC<{ each: number; small?: boolean }> = ({ each, small }) => {
  if (small) {
    return (
      <Frame small fill="#fffbeb">
        {[0, 1, 2].map((p) => {
          const cy = 17 + p * 23;
          const dx = Math.min(9, 56 / Math.max(1, each));
          return (
            <g key={p}>
              <ellipse cx="40" cy={cy} rx="34" ry="9.5" fill="#fff" stroke="#64748b" strokeWidth="2" />
              {Array.from({ length: each }, (_, i) => (
                <circle key={i} cx={40 + (i - (each - 1) / 2) * dx} cy={cy} r={Math.min(3.8, dx * 0.42)} fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
              ))}
            </g>
          );
        })}
      </Frame>
    );
  }
  return (
    <Frame fill="#fffbeb">
      {[0, 1, 2].map((p) => (
        <PlatePart key={p} cx={28 + p * 47} cy={42} w={44} count={each} />
      ))}
    </Frame>
  );
};

/** Egy doboz `n` sütivel és 3 üres tányér (kérdés: mennyi jut egyre?). */
export const PileCard: React.FC<{ n: number; small?: boolean }> = ({ n, small }) => {
  if (small) {
    return (
      <Frame small fill="#fffbeb">
        <rect x="20" y="8" width="40" height="30" rx="6" fill="#fde68a" stroke="#92400e" strokeWidth="2.5" />
        <text x="40" y="31" textAnchor="middle" fontSize="20" fontWeight="900" fill="#78350f">
          {n}
        </text>
        {[0, 1, 2].map((p) => (
          <ellipse key={p} cx={16 + p * 24} cy="60" rx="11" ry="7" fill="#fff" stroke="#64748b" strokeWidth="2.5" />
        ))}
      </Frame>
    );
  }
  return (
    <Frame fill="#fffbeb">
      <rect x="10" y="20" width="46" height="40" rx="7" fill="#fde68a" stroke="#92400e" strokeWidth="2.5" />
      <text x="33" y="48" textAnchor="middle" fontSize="22" fontWeight="900" fill="#78350f">
        {n}
      </text>
      <path d="M 60 40 L 74 40" stroke="#0891b2" strokeWidth="3" />
      <path d="M 71 35 L 78 40 L 71 45 Z" fill="#0891b2" />
      {[0, 1, 2].map((p) => (
        <ellipse key={p} cx={96 + (p % 2) * 26} cy={p < 2 ? 28 : 56} rx="13" ry="7" fill="#fff" stroke="#64748b" strokeWidth="2" transform={p === 2 ? 'translate(13 0)' : undefined} />
      ))}
    </Frame>
  );
};

/** `groups` karika, mindegyikben 3 korong. */
export const RingsCard: React.FC<{ groups: number; small?: boolean }> = ({ groups, small }) => {
  const perRow = small ? 3 : 5;
  const rows = Math.ceil(groups / perRow);
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
        return (
          <g key={g}>
            <circle cx={cx} cy={cy} r={size / 2 - 1} fill="#fef9c3" stroke="#ca8a04" strokeWidth="2.2" />
            {[
              { x: cx, y: cy - size * 0.19 },
              { x: cx - size * 0.21, y: cy + size * 0.17 },
              { x: cx + size * 0.21, y: cy + size * 0.17 }
            ].map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={rr} fill={DIV3_COLORS[g % DIV3_COLORS.length]} stroke="#1e293b" strokeWidth="1" />
            ))}
          </g>
        );
      })}
    </Frame>
  );
};

/** `n` korong hármas oszlopokban (karika nélkül). */
export const DotsBy3Card: React.FC<{ n: number; small?: boolean }> = ({ n, small }) => {
  const w = small ? 80 : 150;
  const cols = Math.ceil(n / 3);
  const step = small ? Math.min(11, 66 / cols) : Math.min(16, 132 / cols);
  const r = Math.min(small ? 4 : 5.5, step * 0.38);
  const x0 = w / 2 - ((cols - 1) * step) / 2;
  const vStep = small ? 18 : 20;
  return (
    <Frame small={small} fill="#eff6ff">
      {Array.from({ length: n }, (_, i) => {
        const c = Math.floor(i / 3);
        const rr = i % 3;
        return <circle key={i} cx={x0 + c * step} cy={22 + rr * vStep} r={r} fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.1" />;
      })}
    </Frame>
  );
};

/** Nyíl-gép: `from` → : 3 → `to` (bármelyik lehet „?”). */
export const ThirdArrowCard: React.FC<{ from: string; to: string; small?: boolean }> = ({ from, to, small }) => {
  if (small) {
    return (
      <Frame small fill="#fff1f2">
        <rect x="18" y="7" width="44" height="22" rx="6" fill="#fff" stroke="#e11d48" strokeWidth="2.5" />
        <text x="40" y="24" textAnchor="middle" fontSize="16" fontWeight="900" fill={from === '?' ? '#dc2626' : '#881337'}>
          {from}
        </text>
        <line x1="40" y1="31" x2="40" y2="47" stroke="#0891b2" strokeWidth="3" />
        <path d="M 34 44 L 40 51 L 46 44 Z" fill="#0891b2" />
        <text x="61" y="45" textAnchor="middle" fontSize="13" fontWeight="900" fill="#0e7490">
          :3
        </text>
        <rect x="18" y="52" width="44" height="22" rx="6" fill="#fff" stroke="#e11d48" strokeWidth="2.5" />
        <text x="40" y="69" textAnchor="middle" fontSize="16" fontWeight="900" fill={to === '?' ? '#dc2626' : '#881337'}>
          {to}
        </text>
      </Frame>
    );
  }
  return (
    <Frame fill="#fff1f2">
      <rect x="10" y="22" width="40" height="36" rx="8" fill="#fff" stroke="#e11d48" strokeWidth="3" />
      <text x="30" y="48" textAnchor="middle" fontSize="20" fontWeight="900" fill={from === '?' ? '#dc2626' : '#881337'}>
        {from}
      </text>
      <line x1="54" y1="40" x2="92" y2="40" stroke="#0891b2" strokeWidth="3.5" />
      <path d="M 88 33 L 97 40 L 88 47 Z" fill="#0891b2" />
      <text x="75" y="31" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0e7490">
        : 3
      </text>
      <rect x="100" y="22" width="40" height="36" rx="8" fill="#fff" stroke="#e11d48" strokeWidth="3" />
      <text x="120" y="48" textAnchor="middle" fontSize="20" fontWeight="900" fill={to === '?' ? '#dc2626' : '#881337'}>
        {to}
      </text>
    </Frame>
  );
};

/** Visszafelé hármas ugrások `start`-tól, amíg 3-nál kevesebb marad. */
export const JumpBackCard: React.FC<{ start: number; small?: boolean }> = ({ start, small }) => {
  const w = small ? 80 : 150;
  const x0 = small ? 8 : 10;
  const unit = small ? 2.13 : 4.3;
  const y = small ? 48 : 46;
  const X = (v: number) => x0 + v * unit;
  const k = Math.floor(start / 3);
  return (
    <Frame small={small} fill="#fff1f2">
      <line x1={X(0)} y1={y} x2={X(30) + 2} y2={y} stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: 31 }, (_, v) => (
        <line key={v} x1={X(v)} y1={y - (v % 10 === 0 ? 5 : 2.5)} x2={X(v)} y2={y + (v % 10 === 0 ? 5 : 2.5)} stroke="#334155" strokeWidth={v % 10 === 0 ? 1.8 : 1} />
      ))}
      {Array.from({ length: k }, (_, i) => {
        const a = X(start - i * 3);
        const b = X(start - (i + 1) * 3);
        const m = (a + b) / 2;
        return <path key={i} d={`M ${a} ${y - 2} Q ${m} ${y - (small ? 14 : 24)} ${b} ${y - 2}`} fill="none" stroke="#e11d48" strokeWidth={small ? 2 : 2.6} />;
      })}
      <text x={X(0)} y={y + 20} textAnchor="middle" fontSize={small ? 12 : 14} fontWeight="900" fill="#334155">
        0
      </text>
      <text x={Math.min(X(start), w - (small ? 12 : 14))} y={y + 22} textAnchor="middle" fontSize={small ? 15 : 18} fontWeight="900" fill="#be123c">
        {start}
      </text>
    </Frame>
  );
};
