import React from 'react';
import { SIGN_COLOR, SIGN_VALUE, signOps } from './RomanBasicsG3Utils';

// ---------------------------------------------------------------------------
// Kis kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.
// A jelek színe ugyanaz, mint a tananyagban (I kék, V zöld, X narancs, L lila, C piros).
// A végeredmény sosincs a képen.
// ---------------------------------------------------------------------------

const SERIF = 'Georgia, "Times New Roman", serif';
const SANS = 'system-ui, Segoe UI, sans-serif';

/** n pötty tízes keretekben (5 × 2 rács keretenként), a keretek egymás mellett. */
export const TenFramesCard: React.FC<{ n: number }> = ({ n }) => {
  const frames = Math.max(1, Math.ceil(n / 10));
  const cell = Math.min(20, (140 - (frames - 1) * 6) / (frames * 5));
  const fw = cell * 5;
  const gap = 6;
  const total = frames * fw + (frames - 1) * gap;
  const x0 = (150 - total) / 2;
  const y0 = 40 - cell;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: frames }, (_, f) => (
        <g key={f}>
          <rect x={x0 + f * (fw + gap)} y={y0} width={fw} height={cell * 2} fill="#fff" stroke="#334155" strokeWidth="2.5" />
          {[1, 2, 3, 4].map((k) => (
            <line key={k} x1={x0 + f * (fw + gap) + k * cell} y1={y0} x2={x0 + f * (fw + gap) + k * cell} y2={y0 + cell * 2} stroke="#334155" strokeWidth="1.2" />
          ))}
          <line x1={x0 + f * (fw + gap)} y1={y0 + cell} x2={x0 + f * (fw + gap) + fw} y2={y0 + cell} stroke="#334155" strokeWidth="1.2" />
          {Array.from({ length: 10 }, (_, k) => {
            const idx = f * 10 + k;
            if (idx >= n) return null;
            return (
              <circle
                key={k}
                cx={x0 + f * (fw + gap) + (k % 5) * cell + cell / 2}
                cy={y0 + Math.floor(k / 5) * cell + cell / 2}
                r={cell * 0.36}
                fill="#ef4444"
                stroke="#7f1d1d"
                strokeWidth="1.2"
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
};

/** Színes római szám; minden jel alatt +/− jelvény (a tananyag szabályábrája szerint). */
export const SignBadgeCard: React.FC<{ s: string }> = ({ s }) => {
  const ops = signOps(s);
  const step = 40;
  const x0 = 75 - ((ops.length - 1) * step) / 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      {ops.map((o, i) => (
        <g key={i}>
          <text x={x0 + i * step} y="42" textAnchor="middle" fontSize="38" fontWeight="bold" fontFamily={SERIF} fill={SIGN_COLOR[o.ch]}>
            {o.ch}
          </text>
          <circle cx={x0 + i * step} cy="62" r="12" fill={o.minus ? '#ffe4e6' : '#dcfce7'} stroke={o.minus ? '#e11d48' : '#16a34a'} strokeWidth="2.5" />
          <line x1={x0 + i * step - 6} y1="62" x2={x0 + i * step + 6} y2="62" stroke={o.minus ? '#e11d48' : '#16a34a'} strokeWidth="3.5" strokeLinecap="round" />
          {!o.minus && <line x1={x0 + i * step} y1="56" x2={x0 + i * step} y2="68" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" />}
        </g>
      ))}
    </svg>
  );
};

/** Csoportosító (80 × 80): a római szám színes jelei, alattuk az értékük kis korongon. */
export const SignChipsCard: React.FC<{ s: string }> = ({ s }) => {
  const chars = s.split('');
  const step = Math.min(26, 76 / chars.length);
  const x0 = 40 - ((chars.length - 1) * step) / 2;
  const fs = Math.min(30, step * 1.15);
  const r = Math.min(12, step / 2 - 0.5);
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      {chars.map((ch, i) => {
        const v = SIGN_VALUE[ch];
        return (
          <g key={i}>
            <text x={x0 + i * step} y="36" textAnchor="middle" fontSize={fs} fontWeight="bold" fontFamily={SERIF} fill={SIGN_COLOR[ch]}>
              {ch}
            </text>
            <circle cx={x0 + i * step} cy="60" r={r} fill="#fff" stroke={SIGN_COLOR[ch]} strokeWidth="2.5" />
            <text x={x0 + i * step} y={60 + r * 0.42} textAnchor="middle" fontSize={v >= 10 ? r * 1.05 : r * 1.25} fontWeight="bold" fontFamily={SANS} fill={SIGN_COLOR[ch]}>
              {v}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const BAR_H: Record<string, number> = { I: 8, V: 16, X: 24, L: 32, C: 40 };

/** Csoportosító (80 × 80): a jelek fölött oszlop – minél nagyobb a jel értéke, annál magasabb. */
export const SignBarsCard: React.FC<{ s: string }> = ({ s }) => {
  const chars = s.split('');
  const step = Math.min(22, 76 / chars.length);
  const x0 = 40 - ((chars.length - 1) * step) / 2;
  const bw = step * 0.62;
  const fs = Math.min(26, step * 1.2);
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <line x1="2" y1="46" x2="78" y2="46" stroke="#94a3b8" strokeWidth="2" />
      {chars.map((ch, i) => (
        <g key={i}>
          <rect x={x0 + i * step - bw / 2} y={46 - BAR_H[ch]} width={bw} height={BAR_H[ch]} rx="2" fill={SIGN_COLOR[ch]} opacity="0.85" />
          <text x={x0 + i * step} y="74" textAnchor="middle" fontSize={fs} fontWeight="bold" fontFamily={SERIF} fill={SIGN_COLOR[ch]}>
            {ch}
          </text>
        </g>
      ))}
    </svg>
  );
};
