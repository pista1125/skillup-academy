import React from 'react';
import { FONT, SERIF, StickText } from './RomanEverydayG3Parts';

// ---------------------------------------------------------------------------
// Kis kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz
// ---------------------------------------------------------------------------

/** Számlap számok nélkül, vastag osztásokkal és kismutatóval (h óra). */
export const MiniClockCard: React.FC<{ hour: number }> = ({ hour }) => {
  const cx = 75;
  const cy = 40;
  const r = 34;
  const a = ((hour % 12) * 30 - 90) * (Math.PI / 180);
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      <circle cx={cx} cy={cy} r={r} fill="#fef9c3" stroke="#78350f" strokeWidth="4" />
      {Array.from({ length: 12 }, (_, k) => {
        const b = (k * 30 - 90) * (Math.PI / 180);
        const big = k % 3 === 0;
        return (
          <line
            key={k}
            x1={cx + (r - 3) * Math.cos(b)}
            y1={cy + (r - 3) * Math.sin(b)}
            x2={cx + (r - (big ? 11 : 8)) * Math.cos(b)}
            y2={cy + (r - (big ? 11 : 8)) * Math.sin(b)}
            stroke="#78350f"
            strokeWidth={big ? 4 : 3}
            strokeLinecap="round"
          />
        );
      })}
      <line x1={cx} y1={cy} x2={cx} y2={cy - r + 9} stroke="#1e3a8a" strokeWidth="3" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx + (r - 15) * Math.cos(a)} y2={cy + (r - 15) * Math.sin(a)} stroke="#b91c1c" strokeWidth="5.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="4" fill="#1e293b" />
    </svg>
  );
};

/** Nyitott könyv a fejezet római számával. */
export const MiniBookCard: React.FC<{ label: string }> = ({ label }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={SERIF}>
    <path d="M 18 12 Q 46 4 75 12 Q 104 4 132 12 L 132 72 Q 104 64 75 72 Q 46 64 18 72 Z" fill="#fff" stroke="#7c3aed" strokeWidth="3.5" />
    <line x1="75" y1="12" x2="75" y2="72" stroke="#7c3aed" strokeWidth="3" />
    <text x="46" y="50" textAnchor="middle" fontSize={label.length > 4 ? 19 : 24} fontWeight="bold" fill="#5b21b6">
      {label}
    </text>
    {[30, 42, 54].map((y) => (
      <line key={y} x1="86" y1={y} x2="122" y2={y} stroke="#cbd5e1" strokeWidth="3" />
    ))}
  </svg>
);

/** Kék utcatábla a kerület római számával. */
export const MiniSignCard: React.FC<{ label: string }> = ({ label }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={SERIF}>
    <rect x="14" y="14" width="122" height="52" rx="6" fill="#1e3a8a" stroke="#172554" strokeWidth="3" />
    <rect x="20" y="20" width="110" height="40" rx="4" fill="none" stroke="#fff" strokeWidth="2.5" />
    <text x="75" y="50" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#fde047">
      {label}
    </text>
  </svg>
);

/** Korona a király sorszámával. */
export const MiniCrownCard: React.FC<{ label: string }> = ({ label }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={SERIF}>
    <path d="M 22 40 L 30 10 L 48 28 L 60 6 L 72 28 L 90 10 L 98 40 Z" fill="#fbbf24" stroke="#92400e" strokeWidth="3" strokeLinejoin="round" />
    <rect x="22" y="40" width="76" height="10" fill="#f59e0b" stroke="#92400e" strokeWidth="3" />
    <text x="125" y="54" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#0f172a">
      {label}
    </text>
  </svg>
);

/** Naptárlap: csak a dátum (római hónap + nap). w: 150 vagy 80 széles változat. */
export const MiniCalCard: React.FC<{ text: string; small?: boolean }> = ({ text, small }) => {
  const W = small ? 80 : 150;
  const cw = small ? 70 : 136;
  const x = (W - cw) / 2;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={SERIF}>
      <rect x={x} y="6" width={cw} height="68" rx="7" fill="#fff" stroke="#475569" strokeWidth="3" />
      <rect x={x} y="6" width={cw} height="18" rx="7" fill="#ef4444" />
      <rect x={x} y="16" width={cw} height="8" fill="#ef4444" />
      <text x={W / 2} y="59" textAnchor="middle" fontSize={Math.min(small ? 24 : 27, (cw - 10) / (text.length * 0.6))} fontWeight="bold" fill="#0f172a">
        {text}
      </text>
    </svg>
  );
};

/** Pálcikákból kirakott római szám, csoportosító kártyára (80 × 80). */
export const MiniSticksCard: React.FC<{ text: string }> = ({ text }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <StickText text={text} cx={40} y={16} h={48} maxW={70} />
  </svg>
);

/** Pálcikákból kirakott szöveg párosító kártyára (150 × 80). */
export const MiniSticksWideCard: React.FC<{ text: string }> = ({ text }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <StickText text={text} cx={75} y={14} h={52} maxW={136} />
  </svg>
);
