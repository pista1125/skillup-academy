import React from 'react';

// ---------------------------------------------------------------------------
// Kis kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.
// Lánc (balról jobbra), kétsoros műveletsor kiemelt első lépéssel, pénztárca
// árcédulákkal, „k-szor ugyanaz” zsák. A végeredmény sosincs a képen.
// (A XII. fejezet 4. és 5. leckéje is ezeket használja.)
// ---------------------------------------------------------------------------

const FONT = 'system-ui, Segoe UI, sans-serif';
const INK = '#0f172a';

/** Kezdőszám dobozban, mellette egymás alatt a két lépés (+ / −). */
export const ChainCard: React.FC<{ start: string; ops: [string, string] }> = ({ start, ops }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="3" y="20" width="56" height="40" rx="9" fill="#bae6fd" stroke="#0369a1" strokeWidth="3" />
    <text x="31" y="48" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>{start}</text>
    <path d="M 62 40 L 70 40" stroke="#64748b" strokeWidth="3" />
    {ops.map((o, i) => (
      <g key={i}>
        <rect x="72" y={3 + i * 40} width="75" height="34" rx="17" fill={o.startsWith('+') ? '#dcfce7' : '#fee2e2'} stroke={o.startsWith('+') ? '#15803d' : '#b91c1c'} strokeWidth="3" />
        <text x="109.5" y={28 + i * 40} textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>{o}</text>
      </g>
    ))}
  </svg>
);

/** Kétsoros műveletsor; az első lépés (hl: 0 = felső sor, 1 = alsó sor) narancs keretben. */
export const StackCard: React.FC<{ rows: [string, string]; hl: 0 | 1; vb?: string }> = ({ rows, hl, vb = '0 0 150 80' }) => {
  const w = Number(vb.split(' ')[2]);
  const fs = w < 100 ? 18 : 22;
  return (
    <svg viewBox={vb} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {rows.map((r, i) => {
        const tw = r.length * fs * 0.56 + 12;
        const y = i === 0 ? 4 : 42;
        return (
          <g key={i}>
            {hl === i && <rect x={w / 2 - tw / 2} y={y} width={tw} height="34" rx="10" fill="#ffedd5" stroke="#ea580c" strokeWidth="3" />}
            <text x={w / 2} y={y + 25} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={INK}>{r}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** 80 × 80: kezdőszám és alatta a két lépés. */
export const SmallChain: React.FC<{ start: string; ops: [string, string] }> = ({ start, ops }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="14" y="2" width="52" height="24" rx="6" fill="#bae6fd" stroke="#0369a1" strokeWidth="3" />
    <text x="40" y="21" textAnchor="middle" fontSize="18" fontWeight="bold" fill={INK}>{start}</text>
    {ops.map((o, i) => (
      <g key={i}>
        <rect x="8" y={29 + i * 26} width="64" height="23" rx="11.5" fill={o.startsWith('+') ? '#dcfce7' : '#fee2e2'} stroke={o.startsWith('+') ? '#15803d' : '#b91c1c'} strokeWidth="3" />
        <text x="40" y={47 + i * 26} textAnchor="middle" fontSize="18" fontWeight="bold" fill={INK}>{o}</text>
      </g>
    ))}
  </svg>
);

/** 80 × 80: pénztárca a pénzzel, alatta két árcédula (amit megveszünk). */
export const SmallWallet: React.FC<{ money: string; tags: [string, string] }> = ({ money, tags }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="6" y="2" width="68" height="32" rx="7" fill="#a16207" stroke="#713f12" strokeWidth="3" />
    <text x="40" y="25" textAnchor="middle" fontSize="19" fontWeight="bold" fill="#fef9c3">{money}</text>
    {tags.map((t, i) => (
      <g key={i}>
        <path d={`M ${2 + i * 40} 42 L ${32 + i * 40} 42 L ${39 + i * 40} 58 L ${32 + i * 40} 74 L ${2 + i * 40} 74 Z`} fill={i ? '#dbeafe' : '#fef3c7'} stroke="#475569" strokeWidth="2.5" />
        <text x={18 + i * 40} y="64" textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>{t}</text>
      </g>
    ))}
  </svg>
);

/** 80 × 80: „k ×” és egy zsák kétsoros tartalommal (pl. 50 / + 30). after: a szorzó a zsák után áll. */
export const SmallBag: React.FC<{ k: string; top: string; bottom: string; after?: boolean }> = ({ k, top, bottom, after }) => {
  const bx = after ? 1 : 27;
  const kx = after ? 66 : 13;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <path d={`M ${bx + 10} 14 Q ${bx + 26} 4 ${bx + 42} 14 L ${bx + 51} 70 Q ${bx + 26} 80 ${bx + 1} 70 Z`} fill="#fde68a" stroke="#92400e" strokeWidth="3" />
      <text x={bx + 26} y="40" textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>{top}</text>
      <text x={bx + 26} y="62" textAnchor="middle" fontSize="15" fontWeight="bold" fill={INK}>{bottom}</text>
      <text x={kx} y="48" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#7c3aed">{k}</text>
    </svg>
  );
};
