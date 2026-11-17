import React from 'react';

// ---------------------------------------------------------------------------
// Kis kártyaképek: Párosító (150 × 80) és Csoportosító (80 × 80).
// Az eredmény sosincs a képen; a keresett szám piros „?”.
// ---------------------------------------------------------------------------

const FONT = 'system-ui, Segoe UI, sans-serif';
const UNK = '#dc2626';
const INK = '#0f172a';

/** Írásbeli szorzás a könyv elrendezésében, a szorzat helyén „???”. */
export const MulCard: React.FC<{ a: number; d: number }> = ({ a, d }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    {String(a)
      .split('')
      .map((s, i) => (
        <text key={i} x={36 + i * 24} y="32" textAnchor="middle" fontSize="26" fontWeight="bold" fill={INK}>{s}</text>
      ))}
    <text x="118" y="32" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#ea580c">{`· ${d}`}</text>
    <line x1="22" y1="42" x2="98" y2="42" stroke={INK} strokeWidth="3" />
    {[0, 1, 2].map((i) => (
      <text key={i} x={36 + i * 24} y="72" textAnchor="middle" fontSize="26" fontWeight="bold" fill={UNK}>?</text>
    ))}
  </svg>
);

/** Csoportosító: kis írásbeli szorzás (szám, alatta · d, vonal, ?). */
export const MulSmall: React.FC<{ a: number; d: number }> = ({ a, d }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="2" y="2" width="76" height="76" rx="10" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="2" />
    <text x="40" y="28" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>{a}</text>
    <text x="40" y="50" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#ea580c">{`· ${d}`}</text>
    <line x1="12" y1="56" x2="68" y2="56" stroke={INK} strokeWidth="3" />
    <text x="40" y="76" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>?</text>
  </svg>
);

/** Számegyenes-részlet: a szám két kerek tízes között (kerekítéshez). */
export const LineCard: React.FC<{ n: number }> = ({ n }) => {
  const lo = Math.floor(n / 10) * 10;
  const x = (v: number) => 20 + ((v - lo) / 10) * 110;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1="10" y1="44" x2="140" y2="44" stroke="#334155" strokeWidth="3" />
      {[lo, lo + 5, lo + 10].map((v) => (
        <line key={v} x1={x(v)} y1={v === lo + 5 ? 38 : 32} x2={x(v)} y2={v === lo + 5 ? 50 : 56} stroke="#334155" strokeWidth="3" />
      ))}
      <text x={x(lo)} y="76" textAnchor="middle" fontSize="18" fontWeight="bold" fill={INK}>{lo}</text>
      <text x={x(lo + 10)} y="76" textAnchor="middle" fontSize="18" fontWeight="bold" fill={INK}>{lo + 10}</text>
      <circle cx={x(n)} cy="44" r="6" fill={UNK} />
      <text x={x(n)} y="24" textAnchor="middle" fontSize="20" fontWeight="bold" fill={UNK}>{n}</text>
    </svg>
  );
};

/** Ár-következtetés: „n1 db → p1”, „n2 db → ?”. */
export const PriceMini: React.FC<{ n1: number; p1: number; n2: number }> = ({ n1, p1, n2 }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <text x="34" y="30" textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>{`${n1} db`}</text>
    <polygon points="82,23 70,17 70,29" fill="#334155" />
    <rect x="86" y="6" width="60" height="28" rx="6" fill="#fde68a" stroke="#b45309" strokeWidth="2.5" />
    <text x="116" y="27" textAnchor="middle" fontSize="18" fontWeight="bold" fill={INK}>{p1}</text>
    <text x="34" y="70" textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>{`${n2} db`}</text>
    <polygon points="82,63 70,57 70,69" fill="#334155" />
    <rect x="86" y="46" width="60" height="28" rx="6" fill="#fff" stroke="#b45309" strokeWidth="2.5" strokeDasharray="5 3" />
    <text x="116" y="68" textAnchor="middle" fontSize="22" fontWeight="bold" fill={UNK}>?</text>
  </svg>
);

/** Ismert szorzás fent, az új lent „?”-lel, bal oldalt nyíl a változással. */
export const RelCard: React.FC<{ top: string; bottom: string; op: string }> = ({ top, bottom, op }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <path d="M 22 18 C 4 28, 4 50, 20 62" fill="none" stroke="#ea580c" strokeWidth="3" />
    <polygon points="22,64 13,61 19,55" fill="#ea580c" />
    <text x="14" y="45" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#c2410c">{op}</text>
    <text x="88" y="28" textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>{top}</text>
    <text x="88" y="68" textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>
      {bottom} <tspan fill={UNK}>?</tspan>
    </text>
  </svg>
);
