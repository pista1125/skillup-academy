import React from 'react';

/**
 * 7. A római számok – ábrák (TK 28., MF I/19. alapján)
 */

type FigProps = { className?: string };
const FONT = 'system-ui, sans-serif';
const SERIF = 'Georgia, "Times New Roman", serif';

/** Az alapjelek: I = 1, V = 5, X = 10. */
export const RomanSignsSvg: React.FC<FigProps> = ({ className }) => {
  const signs = [
    { s: 'I', v: '1', c: '#f97316', note: 'egy ujj' },
    { s: 'V', v: '5', c: '#eab308', note: 'egy kéz' },
    { s: 'X', v: '10', c: '#ef4444', note: 'két kéz' }
  ];
  return (
    <svg viewBox="0 0 380 170" className={className ?? 'w-full h-auto'} fontFamily={FONT} role="img" aria-label="Római alapjelek: I egy, V öt, X tíz">
      <rect x="2" y="2" width="376" height="166" rx="16" fill="#fff7ed" stroke="#fed7aa" strokeWidth="2" />
      {signs.map((g, i) => (
        <g key={g.s}>
          <rect x={22 + i * 120} y="20" width="96" height="86" rx="18" fill="#ffffff" stroke={g.c} strokeWidth="4" />
          <text x={70 + i * 120} y="82" fontSize="52" fontWeight="bold" textAnchor="middle" fill={g.c} fontFamily={SERIF}>{g.s}</text>
          <text x={70 + i * 120} y="132" fontSize="22" fontWeight="bold" textAnchor="middle" fill="#0f172a">= {g.v}</text>
          <text x={70 + i * 120} y="154" fontSize="12" textAnchor="middle" fill="#64748b">{g.note}</text>
        </g>
      ))}
    </svg>
  );
};

/** Összeadás és kivonás szabálya: VI = 5 + 1, IV = 5 − 1, XI = 10 + 1, IX = 10 − 1. */
export const RomanRulesSvg: React.FC<FigProps> = ({ className }) => {
  const rows = [
    { r: 'VI', e: '5 + 1 = 6', c: '#16a34a', t: 'kisebb jel UTÁNA → hozzáadjuk' },
    { r: 'IV', e: '5 − 1 = 4', c: '#dc2626', t: 'I jel ELŐTTE → elvesszük' },
    { r: 'XI', e: '10 + 1 = 11', c: '#16a34a', t: 'kisebb jel UTÁNA → hozzáadjuk' },
    { r: 'IX', e: '10 − 1 = 9', c: '#dc2626', t: 'I jel ELŐTTE → elvesszük' }
  ];
  return (
    <svg viewBox="0 0 380 210" className={className ?? 'w-full h-auto'} fontFamily={FONT} role="img" aria-label="Összeadás és kivonás a római számoknál">
      <rect x="2" y="2" width="376" height="206" rx="16" fill="#fffbeb" stroke="#fde68a" strokeWidth="2" />
      {rows.map((w, i) => (
        <g key={w.r}>
          <rect x="16" y={14 + i * 48} width="74" height="40" rx="10" fill="#fff" stroke={w.c} strokeWidth="3" />
          <text x="53" y={44 + i * 48} fontSize="26" fontWeight="bold" textAnchor="middle" fill="#1e293b" fontFamily={SERIF}>{w.r}</text>
          <text x="104" y={33 + i * 48} fontSize="16" fontWeight="bold" fill={w.c}>{w.e}</text>
          <text x="104" y={50 + i * 48} fontSize="11" fill="#475569">{w.t}</text>
        </g>
      ))}
    </svg>
  );
};

/** Úszósapkák római rajtszámokkal (MF I/19/1.). */
export const SwimCapsSvg: React.FC<FigProps> = ({ className }) => {
  const caps = [
    { t: 'V', c: '#22c55e' },
    { t: 'II', c: '#f97316' },
    { t: 'XXV', c: '#ef4444' },
    { t: 'X', c: '#facc15' },
    { t: 'XX', c: '#8b5cf6' },
    { t: 'VII', c: '#38bdf8' },
    { t: 'XXX', c: '#e879f9' }
  ];
  return (
    <svg viewBox="0 0 400 150" className={className ?? 'w-full h-auto'} fontFamily={FONT} role="img" aria-label="Úszósapkák római számokkal">
      <rect x="2" y="2" width="396" height="146" rx="16" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="2" />
      <path d="M2 110 Q 50 96 100 110 T 200 110 T 300 110 T 398 110 V148 H2 Z" fill="#38bdf8" opacity="0.6" />
      {caps.map((c, i) => {
        const x = 34 + i * 55;
        return (
          <g key={c.t}>
            <circle cx={x} cy="94" r="20" fill="#fde7d4" />
            <circle cx={x - 7} cy="94" r="2.2" fill="#334155" />
            <circle cx={x + 7} cy="94" r="2.2" fill="#334155" />
            <path d={`M${x - 24} 86 A24 26 0 0 1 ${x + 24} 86 Z`} fill={c.c} />
            <text x={x} y="78" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#1e293b" fontFamily={SERIF}>{c.t}</text>
            <rect x={x - 16} y="22" width="32" height="20" rx="4" fill="#fff" stroke="#94a3b8" />
            <text x={x} y="37" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#dc2626">?</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Mona és Manó képeslapja (TK 28/4.). */
export const PostcardSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 400 200" className={className ?? 'w-full h-auto'} fontFamily={FONT} role="img" aria-label="Képeslap római számokkal a címben">
    <rect x="6" y="6" width="388" height="188" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" strokeDasharray="8 4" />
    <text x="22" y="34" fontSize="13" fill="#334155">Feladó: Mona és Manó</text>
    <text x="22" y="76" fontSize="15" fontStyle="italic" fill="#1e293b">Kedves Vali néni!</text>
    <text x="22" y="112" fontSize="15" fontStyle="italic" fill="#1e293b">XI. 2-án reggel érkezünk.</text>
    <text x="22" y="148" fontSize="15" fontStyle="italic" fill="#1e293b">Mona és Manó</text>
    <line x1="200" y1="24" x2="200" y2="176" stroke="#d97706" strokeWidth="1.5" />
    <rect x="330" y="18" width="50" height="40" fill="#fff" stroke="#94a3b8" />
    <text x="295" y="86" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#1e293b">KISS VALÉRIA</text>
    <line x1="215" y1="92" x2="380" y2="92" stroke="#94a3b8" />
    <text x="295" y="110" fontSize="13" textAnchor="middle" fill="#1e293b">VIII. kerület</text>
    <line x1="215" y1="116" x2="380" y2="116" stroke="#94a3b8" />
    <text x="295" y="134" fontSize="13" textAnchor="middle" fill="#1e293b">Aranyos u. 3. XIX/25.</text>
    <line x1="215" y1="140" x2="380" y2="140" stroke="#94a3b8" />
    {['X', 'X', 'I', 'X'].map((t, i) => (
      <g key={i}>
        <rect x={238 + i * 30} y="150" width="26" height="28" fill="#fff" stroke="#475569" />
        <text x={251 + i * 30} y="170" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#1e293b" fontFamily={SERIF}>{t}</text>
      </g>
    ))}
  </svg>
);

/** Óra római számokkal. */
export const RomanClockSvg: React.FC<FigProps> = ({ className }) => {
  const nums = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
  return (
    <svg viewBox="0 0 200 200" className={className ?? 'w-full h-auto'} fontFamily={SERIF} role="img" aria-label="Óralap római számokkal">
      <circle cx="100" cy="100" r="94" fill="#fffbeb" stroke="#b45309" strokeWidth="6" />
      {nums.map((n, i) => {
        const a = (i * Math.PI) / 6;
        const x = 100 + 72 * Math.sin(a);
        const y = 100 - 72 * Math.cos(a);
        return (
          <text key={n} x={Math.round(x * 10) / 10} y={Math.round(y * 10) / 10 + 5} fontSize="15" fontWeight="bold" textAnchor="middle" fill="#78350f">
            {n}
          </text>
        );
      })}
      <line x1="100" y1="100" x2="100" y2="40" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
      <line x1="100" y1="100" x2="140" y2="100" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
      <circle cx="100" cy="100" r="6" fill="#b45309" />
    </svg>
  );
};

/** Gyufaszálas feladvány: XXX − XI = XXI (MF I/19/2. a). */
export const MatchsticksSvg: React.FC<FigProps> = ({ className }) => {
  const stick = (x1: number, y1: number, x2: number, y2: number, k: string) => (
    <g key={k}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
      <circle cx={x1} cy={y1} r="4" fill="#dc2626" />
    </g>
  );
  const X = (x: number, k: string) => [stick(x, 30, x + 26, 80, k + 'a'), stick(x + 26, 30, x, 80, k + 'b')];
  const I = (x: number, k: string) => [stick(x, 30, x, 80, k)];
  const parts: React.ReactNode[] = [
    ...X(14, 'x1'),
    ...X(44, 'x2'),
    ...X(74, 'x3'),
    stick(112, 55, 132, 55, 'm'),
    ...X(144, 'x4'),
    ...I(180, 'i1'),
    stick(196, 48, 216, 48, 'e1'),
    stick(196, 62, 216, 62, 'e2'),
    ...X(228, 'x5'),
    ...X(258, 'x6'),
    ...I(294, 'i2')
  ];
  return (
    <svg viewBox="0 0 320 110" className={className ?? 'w-full h-auto'} fontFamily={FONT} role="img" aria-label="Gyufaszálas római szám feladvány">
      <rect x="2" y="2" width="316" height="106" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      {parts}
      <text x="160" y="100" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#dc2626">Tedd igazzá 1 gyufaszál áthelyezésével!</text>
    </svg>
  );
};
