import React from 'react';
import { FONT, UNK, Coin } from './MulDiv500G3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

/** Párosító: tízesrúd-csoportok keretben (egy rúd = 10). */
export const MiniRodGroups: React.FC<{ groups?: number; per?: number }> = ({ groups = 3, per = 4 }) => {
  const fit = (rw0: number, gap0: number) => {
    const gw0 = per * rw0 + (per - 1) * gap0 + 8;
    const pl0 = Math.max(1, Math.min(groups, Math.floor(146 / (gw0 + 5))));
    return { gw0, pl0, lines0: Math.ceil(groups / pl0) };
  };
  const wide = fit(4.5, 2);
  const narrow = wide.lines0 > 2;
  const rw = narrow ? 3.2 : 4.5;
  const gap = narrow ? 1.4 : 2;
  const { gw0: gw, pl0: perLine, lines0: lines } = narrow ? fit(3.2, 1.4) : wide;
  const rodH = lines === 1 ? 54 : 26;
  const y0 = lines === 1 ? 13 : 6;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {Array.from({ length: groups }).map((_, g) => {
        const line = Math.floor(g / perLine);
        const inLine = Math.min(perLine, groups - line * perLine);
        const lw = inLine * gw + (inLine - 1) * 5;
        const gx = 75 - lw / 2 + (g % perLine) * (gw + 5);
        const gy = y0 + line * (rodH + 12);
        return (
          <g key={g}>
            <rect x={gx} y={gy - 3} width={gw} height={rodH + 6} rx="5" fill="#eff6ff" stroke="#2563eb" strokeWidth="2.2" />
            {Array.from({ length: per }).map((__, k) => (
              <rect key={k} x={gx + 4 + k * (rw + gap)} y={gy} width={rw} height={rodH} rx="1" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.2" />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

/** Párosító: a szám fent, alatta k tányér „?”-lel (részekre osztás). */
export const MiniShare: React.FC<{ total?: number; k?: number }> = ({ total = 240, k = 3 }) => {
  const step = 140 / k;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <text x="75" y="26" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#14532d">{total}</text>
      {Array.from({ length: k }).map((_, i) => {
        const cx = 5 + step / 2 + i * step;
        return (
          <g key={i}>
            <path d={`M 75 32 L ${cx} 48`} stroke="#94a3b8" strokeWidth="2" />
            <ellipse cx={cx} cy={62} rx={Math.min(20, step / 2 - 3)} ry="12" fill="#fff" stroke="#475569" strokeWidth="3" />
            <text x={cx} y="69" textAnchor="middle" fontSize="19" fontWeight="bold" fill={UNK}>?</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Párosító: érmék rácsban (sor × oszlop, egyforma érmék). */
export const MiniCoinGrid: React.FC<{ rows?: number; cols?: number; v?: number }> = ({ rows = 2, cols = 4, v = 50 }) => {
  const r = Math.min(15, (146 / cols - 3) / 2, (78 / rows - 3) / 2);
  const step = 2 * r + 3;
  const x0 = 75 - ((cols - 1) * step) / 2;
  const y0 = 40 - ((rows - 1) * step) / 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <Coin key={i} cx={x0 + (i % cols) * step} cy={y0 + Math.floor(i / cols) * step} v={v} r={r} />
      ))}
    </svg>
  );
};

/** Csoportosító: k zsák (legfeljebb 4), mindegyiken ugyanaz a szám. */
export const SortBags: React.FC<{ k?: number; v?: number }> = ({ k = 4, v = 60 }) => {
  const pos = k === 1 ? [[40, 40]] : k === 2 ? [[21, 40], [59, 40]] : k === 3 ? [[21, 21], [59, 21], [40, 59]] : [[21, 21], [59, 21], [21, 59], [59, 59]];
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {pos.map(([x, y], i) => (
        <g key={i}>
          <path d={`M ${x - 7} ${y - 14} L ${x + 7} ${y - 14} L ${x + 4} ${y - 9} Q ${x + 18} ${y - 4} ${x + 17} ${y + 8} Q ${x + 16} ${y + 17} ${x} ${y + 17} Q ${x - 16} ${y + 17} ${x - 17} ${y + 8} Q ${x - 18} ${y - 4} ${x - 4} ${y - 9} Z`} fill="#fde68a" stroke="#92400e" strokeWidth="2.5" />
          <text x={x} y={y + 10} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#78350f">{v}</text>
        </g>
      ))}
    </svg>
  );
};

/** Csoportosító: a szám fent, alatta k tányér (részekre osztás). */
export const SortShare: React.FC<{ total?: number; k?: number }> = ({ total = 200, k = 4 }) => {
  const step = 76 / k;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <text x="40" y="26" textAnchor="middle" fontSize="23" fontWeight="bold" fill="#14532d">{total}</text>
      {Array.from({ length: k }).map((_, i) => {
        const cx = 2 + step / 2 + i * step;
        return (
          <g key={i}>
            <path d={`M 40 32 L ${cx} 50`} stroke="#94a3b8" strokeWidth="2" />
            <ellipse cx={cx} cy={62} rx={step / 2 - 2} ry="9" fill="#fff" stroke="#475569" strokeWidth="2.5" />
            <text x={cx} y="68" textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>?</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Csoportosító: n egyforma érme (legfeljebb 6, két sorban). */
export const SortCoinSet: React.FC<{ n?: number; v?: number }> = ({ n = 4, v = 50 }) => {
  const top = n > 2 ? Math.ceil(n / 2) : n;
  const r = top >= 3 ? 12 : 15;
  const step = 2 * r + 2;
  const rows = n > 2 ? 2 : 1;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {Array.from({ length: n }).map((_, i) => {
        const row = i < top ? 0 : 1;
        const inRow = row ? n - top : top;
        const k = row ? i - top : i;
        const cx = 40 - ((inRow - 1) * step) / 2 + k * step;
        const cy = rows === 1 ? 40 : row ? 40 + step / 2 + 1 : 40 - step / 2 - 1;
        return <Coin key={i} cx={cx} cy={cy} v={v} r={r} />;
      })}
    </svg>
  );
};
