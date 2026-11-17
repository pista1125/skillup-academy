import React from 'react';

// ---------------------------------------------------------------------------
// Kis kártyaképek: Párosító (150 × 80) és Csoportosító (80 × 80).
// A keresett szám mindig „?” – az eredmény sosincs a képen.
// ---------------------------------------------------------------------------

const FONT = 'system-ui, Segoe UI, sans-serif';
const UNK = '#dc2626';

/** Ismert szorzat fent, az új szorzat lent „?”-lel; bal oldalt narancs nyíl a változással. */
export const ChangeCard: React.FC<{ top: string; bottom: string; op: string }> = ({ top, bottom, op }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <path d="M 22 18 C 4 28, 4 50, 20 62" fill="none" stroke="#ea580c" strokeWidth="3" />
    <polygon points="22,64 13,61 19,55" fill="#ea580c" />
    <text x="14" y="45" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#c2410c">{op}</text>
    <text x="88" y="28" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{top}</text>
    <text x="88" y="68" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">
      {bottom} <tspan fill={UNK}>?</tspan>
    </text>
  </svg>
);

/** Mini szorzótáblázat: egy sor, két oszlop; a második cella „?”. */
export const TableCard: React.FC<{ row: number; c1: number; c2: number; v1: number }> = ({ row, c1, c2, v1 }) => {
  const cells = [
    ['·', String(c1), String(c2)],
    [String(row), String(v1), '?']
  ];
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {cells.map((r, i) =>
        r.map((t, j) => (
          <g key={`${i}-${j}`}>
            <rect x={3 + j * 48} y={3 + i * 37} width="48" height="37" fill={i === 0 || j === 0 ? '#22c55e' : '#dcfce7'} stroke="#fff" strokeWidth="2.5" />
            <text x={27 + j * 48} y={30 + i * 37} textAnchor="middle" fontSize="22" fontWeight="bold" fill={t === '?' ? UNK : i === 0 || j === 0 ? '#fff' : '#0f172a'}>
              {t}
            </text>
          </g>
        ))
      )}
    </svg>
  );
};

/** Ár-következtetés: „2 db → 180 Ft” fent, „6 db → ?” lent. */
export const PriceCard: React.FC<{ n1: number; p1: number; n2: number; unit?: string }> = ({ n1, p1, n2, unit = 'db' }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <text x="34" y="30" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{`${n1} ${unit}`}</text>
    <line x1="64" y1="23" x2="78" y2="23" stroke="#334155" strokeWidth="3" />
    <polygon points="82,23 75,18 75,28" fill="#334155" />
    <rect x="86" y="6" width="60" height="28" rx="6" fill="#fde68a" stroke="#b45309" strokeWidth="2.5" />
    <text x="116" y="27" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">{p1}</text>
    <text x="34" y="70" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{`${n2} ${unit}`}</text>
    <line x1="64" y1="63" x2="78" y2="63" stroke="#334155" strokeWidth="3" />
    <polygon points="82,63 75,58 75,68" fill="#334155" />
    <rect x="86" y="46" width="60" height="28" rx="6" fill="#fff" stroke="#b45309" strokeWidth="2.5" strokeDasharray="5 3" />
    <text x="116" y="68" textAnchor="middle" fontSize="22" fontWeight="bold" fill={UNK}>?</text>
  </svg>
);

/** Csoportosító: a régi és az új szorzás egymás alatt, a változás nyilakkal. */
export const ChangeSmall: React.FC<{ a: number; b: number; a2: number; b2: number }> = ({ a, b, a2, b2 }) => {
  const mark = (x: number, from: number, to: number) =>
    from === to ? null : (
      <g>
        <line x1={x} y1="34" x2={x} y2="48" stroke={to > from ? '#ea580c' : '#7c3aed'} strokeWidth="3" />
        <polygon points={`${x},52 ${x - 5},45 ${x + 5},45`} fill={to > from ? '#ea580c' : '#7c3aed'} />
      </g>
    );
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="2" y="2" width="76" height="76" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      <text x="20" y="27" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{a}</text>
      <text x="40" y="27" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">·</text>
      <text x="60" y="27" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{b}</text>
      {mark(20, a, a2)}
      {mark(60, b, b2)}
      <text x="20" y="72" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{a2}</text>
      <text x="40" y="72" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">·</text>
      <text x="60" y="72" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{b2}</text>
    </svg>
  );
};

/** Csoportosító: n egyforma doboz, mindegyiken ugyanaz a szám (2 vagy 3 doboz). */
export const BoxesSmall: React.FC<{ n: 2 | 3; v: number }> = ({ n, v }) => {
  const h = n === 2 ? 32 : 22;
  const gap = n === 2 ? 6 : 4;
  const y0 = (80 - n * h - (n - 1) * gap) / 2;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <rect x="6" y={y0 + i * (h + gap)} width="68" height={h} rx="5" fill="#fdba74" stroke="#9a3412" strokeWidth="3" />
          <text x="40" y={y0 + i * (h + gap) + h / 2 + (n === 2 ? 8 : 6)} textAnchor="middle" fontSize={n === 2 ? 22 : 18} fontWeight="bold" fill="#431407">
            {v}
          </text>
        </g>
      ))}
    </svg>
  );
};

/** Csoportosító: „2 db 180” fent, „4 db ?” lent. */
export const PriceSmall: React.FC<{ n1: number; p1: number; n2: number }> = ({ n1, p1, n2 }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="2" y="2" width="76" height="36" rx="7" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
    <text x="22" y="27" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">{n1}</text>
    <text x="56" y="27" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#92400e">{p1}</text>
    <rect x="2" y="42" width="76" height="36" rx="7" fill="#fff" stroke="#d97706" strokeWidth="2.5" />
    <text x="22" y="67" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">{n2}</text>
    <text x="56" y="67" textAnchor="middle" fontSize="20" fontWeight="bold" fill={UNK}>?</text>
    <line x1="38" y1="8" x2="38" y2="72" stroke="#d97706" strokeWidth="2" strokeDasharray="3 3" />
  </svg>
);
