import React from 'react';
import { FONT, ROD, ROD_DARK, UNK, INK } from './MulDiv200G3Parts';

// ---------------------------------------------------------------------------
// Kis kártyaképek a Párosítóhoz (≈150 × 80) és a Csoportosítóhoz (≈80 × 80).
// Egyszerű, vastag vonalas ikonok. Egy kék rúd = 1 tízes (10).
// ---------------------------------------------------------------------------

/** Tízesrúd-csoportok kártyán. size: 'm' = párosító (150×80), 's' = csoportosító (80×80). */
export const CardRods: React.FC<{ groups: number; per: number; size?: 'm' | 's' }> = ({ groups, per, size = 'm' }) => {
  const W = size === 'm' ? 150 : 80;
  const H = 80;
  // Csoportosító (80×80): 1–2 csoport egymás alatt, 3–4 csoport 2 × 2-es rácsban.
  const lines = size === 's' ? (groups <= 2 ? groups : 2) : groups > 5 ? 2 : 1;
  const perLine = Math.ceil(groups / lines);
  const pad = 4;
  const gap = 4;
  const gw = (W - 2 * pad - (perLine - 1) * gap) / perLine;
  const gh = (H - 2 * pad - (lines - 1) * gap) / lines;
  const rw = Math.min(8, (gw - 6) / (per * 1.6));
  const rg = rw * 0.6;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: groups }).map((_, g) => {
        const line = Math.floor(g / perLine);
        const inLine = Math.min(perLine, groups - line * perLine);
        const off = ((perLine - inLine) * (gw + gap)) / 2;
        const gx = pad + off + (g % perLine) * (gw + gap);
        const gy = pad + line * (gh + gap);
        const inner = per * rw + (per - 1) * rg;
        return (
          <g key={g}>
            <rect x={gx} y={gy} width={gw} height={gh} rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2.5" />
            {Array.from({ length: per }).map((__, k) => (
              <rect
                key={k}
                x={gx + (gw - inner) / 2 + k * (rw + rg)}
                y={gy + 6}
                width={rw}
                height={gh - 12}
                rx="1.5"
                fill={ROD}
                stroke={ROD_DARK}
                strokeWidth="1.5"
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

/** Szétosztás: nagy szám fölül, alatta n tányér kérdőjellel. */
export const CardSplit: React.FC<{ total: number; n: number; size?: 'm' | 's' }> = ({ total, n, size = 'm' }) => {
  const W = size === 'm' ? 150 : 80;
  const r = Math.min(13, (W - 8) / n / 2 - 2);
  const step = (W - 8) / n;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <text x={W / 2} y="30" textAnchor="middle" fontSize={size === 'm' ? 30 : 26} fontWeight="bold" fill={INK}>
        {total}
      </text>
      {Array.from({ length: n }).map((_, i) => (
        <g key={i}>
          <circle cx={4 + step * (i + 0.5)} cy="58" r={r} fill="#fff" stroke="#64748b" strokeWidth="3" />
          {r >= 9 && (
            <text x={4 + step * (i + 0.5)} y={58 + r * 0.45} textAnchor="middle" fontSize={r * 1.3} fontWeight="bold" fill={UNK}>
              ?
            </text>
          )}
        </g>
      ))}
    </svg>
  );
};

/** Ugrások 0-tól a végpontig, egyforma ívekkel; a végpont nagy számmal. */
export const CardJumps: React.FC<{ jumps: number; end: number }> = ({ jumps, end }) => {
  const x0 = 10;
  const x1 = 116;
  const y = 62;
  const step = (x1 - x0) / jumps;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1="4" y1={y} x2="146" y2={y} stroke={INK} strokeWidth="3" />
      {Array.from({ length: jumps + 1 }).map((_, i) => (
        <line key={i} x1={x0 + i * step} y1={y - 6} x2={x0 + i * step} y2={y + 6} stroke={INK} strokeWidth="3" />
      ))}
      {Array.from({ length: jumps }).map((_, i) => {
        const a = x0 + i * step;
        const b = a + step;
        return <path key={i} d={`M ${a} ${y - 6} Q ${(a + b) / 2} ${y - 6 - step * 0.9} ${b} ${y - 6}`} fill="none" stroke="#f97316" strokeWidth="3.5" />;
      })}
      <text x={x1 + 4} y="30" textAnchor="middle" fontSize="24" fontWeight="bold" fill={INK}>
        {end}
      </text>
      <text x={x0} y="30" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>
        0
      </text>
    </svg>
  );
};

/** Nagy felirat kártyán (pl. „120 : 40”), ha egy képen kell egy művelet. */
export const CardBig: React.FC<{ text: string; size?: 'm' | 's' }> = ({ text, size = 'm' }) => {
  const W = size === 'm' ? 150 : 80;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <text x={W / 2} y="52" textAnchor="middle" fontSize={size === 'm' ? 30 : 24} fontWeight="bold" fill={INK}>
        {text}
      </text>
    </svg>
  );
};

/** „n · érme”: szorzó és egy nagy pénzérme (pl. 6 · 20 Ft). */
export const CardCoinMul: React.FC<{ n: number; v: number; size?: 'm' | 's' }> = ({ n, v, size = 's' }) => {
  const W = size === 'm' ? 150 : 80;
  const gold = v === 5 || v === 20;
  const two = n >= 10;
  const r = size === 's' ? (two ? 20 : 22) : 26;
  const cx = W - r - 4;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <text x={size === 'm' ? 50 : two ? 17 : 15} y="49" textAnchor="middle" fontSize={two ? 20 : 26} fontWeight="bold" fill={INK}>
        {n} ·
      </text>
      <circle cx={cx} cy="40" r={r} fill={gold || v >= 100 ? '#fcd34d' : '#e2e8f0'} stroke={gold || v >= 100 ? '#b45309' : '#475569'} strokeWidth="3" />
      {v >= 100 && <circle cx={cx} cy="40" r={r - 6} fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />}
      <text x={cx} y="44" textAnchor="middle" fontSize={size === 's' ? (v >= 100 ? 16 : 20) : 22} fontWeight="bold" fill={INK}>
        {v}
      </text>
      <text x={cx} y={size === 's' ? 57 : 60} textAnchor="middle" fontSize={size === 's' ? 10 : 12} fontWeight="bold" fill="#334155">
        Ft
      </text>
    </svg>
  );
};
