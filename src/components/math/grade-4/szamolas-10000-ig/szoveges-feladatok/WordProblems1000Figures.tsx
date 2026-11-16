import React from 'react';

/**
 * 6. Szöveges feladatok – ábrák (TK 23–27. oldal alapján)
 */

type FigProps = { className?: string };
const FONT = 'system-ui, sans-serif';

/** A megoldás lépései (TK 23/1.) lépcsőként. */
export const SolvingStepsSvg: React.FC<FigProps> = ({ className }) => {
  const steps = [
    { t: '1. Jegyezd le az adatokat!', c: '#f97316' },
    { t: '2. Írj műveletet, rajzolj!', c: '#f59e0b' },
    { t: '3. Becsüld meg az eredményt!', c: '#84cc16' },
    { t: '4. Számolj!', c: '#14b8a6' },
    { t: '5. Ellenőrizz!', c: '#3b82f6' },
    { t: '6. Válaszolj írásban!', c: '#8b5cf6' }
  ];
  return (
    <svg viewBox="0 0 380 250" className={className ?? 'w-full h-auto'} fontFamily={FONT} role="img" aria-label="A szöveges feladat megoldásának 6 lépése">
      <rect x="2" y="2" width="376" height="246" rx="16" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="2" />
      {steps.map((s, i) => (
        <g key={s.t}>
          <rect x={14 + i * 22} y={16 + i * 38} width="230" height="30" rx="10" fill={s.c} />
          <text x={26 + i * 22} y={36 + i * 38} fontSize="13" fontWeight="bold" fill="#fff">{s.t}</text>
        </g>
      ))}
      <text x="300" y="232" fontSize="30" textAnchor="middle">🏁</text>
    </svg>
  );
};

/** Futóverseny (TK 23/2.): szakaszos ábra – 88 lány, 3 · 88 fiú, ? felnőtt, összesen 613. */
export const RunnersBarSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 380 150" className={className ?? 'w-full h-auto'} fontFamily={FONT} role="img" aria-label="Szakaszos ábra a futóversenyről">
    <rect x="2" y="2" width="376" height="146" rx="16" fill="#fff7ed" stroke="#fed7aa" strokeWidth="2" />
    <text x="64" y="30" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#ea580c">88</text>
    <text x="157" y="30" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0284c7">3 · 88</text>
    <text x="290" y="30" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#dc2626">?</text>
    <rect x="20" y="40" width="88" height="34" rx="6" fill="#fdba74" />
    <rect x="108" y="40" width="98" height="34" rx="6" fill="#7dd3fc" />
    <rect x="206" y="40" width="160" height="34" rx="6" fill="#e2e8f0" stroke="#94a3b8" strokeDasharray="5 3" />
    <text x="64" y="62" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#7c2d12">lány</text>
    <text x="157" y="62" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">fiú</text>
    <text x="286" y="62" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#334155">felnőtt</text>
    <path d="M20 84 Q20 96 32 96 H180 Q193 96 193 108 Q193 96 206 96 H354 Q366 96 366 84" fill="none" stroke="#475569" strokeWidth="2" />
    <text x="193" y="128" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#0f172a">613 versenyző</text>
  </svg>
);

/** Párok a számegyenesen (TK 23/4.): 11 pár, köztük 50 cm. */
export const PairsLineSvg: React.FC<FigProps> = ({ className }) => {
  const x0 = 24;
  const step = 32;
  return (
    <svg viewBox="0 0 380 140" className={className ?? 'w-full h-auto'} fontFamily={FONT} role="img" aria-label="11 pár a számegyenesen 50 centiméterenként">
      <rect x="2" y="2" width="376" height="136" rx="16" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="2" />
      <text x="190" y="22" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0369a1">22 gyerek → 11 pár</text>
      <line x1="16" y1="86" x2="368" y2="86" stroke="#334155" strokeWidth="2" />
      <polygon points="370,86 360,80 360,92" fill="#334155" />
      {Array.from({ length: 11 }, (_, i) => (
        <g key={i}>
          <line x1={x0 + i * step} y1="80" x2={x0 + i * step} y2="92" stroke="#334155" strokeWidth="2" />
          <circle cx={x0 + i * step - 5} cy="62" r="6" fill={i % 2 ? '#f472b6' : '#60a5fa'} />
          <circle cx={x0 + i * step + 5} cy="62" r="6" fill={i % 2 ? '#60a5fa' : '#f472b6'} />
          <text x={x0 + i * step} y="44" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#475569">{i + 1}.</text>
        </g>
      ))}
      <text x={x0} y="108" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#334155">0</text>
      <text x={x0 + step} y="108" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#334155">50</text>
      <text x="190" y="128" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#dc2626">11 pár között csak 10 köz van!</text>
    </svg>
  );
};

/** Színes rudak (TK 24/6.): Kristóf 1, anyukája 3, nagymamája 6 kocka, együtt 110 év. */
export const ColorRodsSvg: React.FC<FigProps> = ({ className }) => {
  const u = 26;
  const Rod: React.FC<{ x: number; n: number; fill: string; label: string }> = ({ x, n, fill, label }) => (
    <g>
      <text x={x + (n * u) / 2} y="38" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#334155">{label}</text>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={x + i * u} y="48" width={u} height={u} fill={fill} stroke="#475569" strokeWidth="1.5" />
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 380 140" className={className ?? 'w-full h-auto'} fontFamily={FONT} role="img" aria-label="Színes rudak Kristóf, anyukája és nagymamája életkorához">
      <rect x="2" y="2" width="376" height="136" rx="16" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="2" />
      <Rod x={14} n={1} fill="#ffffff" label="Kristóf" />
      <Rod x={52} n={3} fill="#93c5fd" label="anyukája" />
      <Rod x={142} n={6} fill="#a78bfa" label="nagymamája" />
      <path d="M14 84 Q14 96 26 96 H144 Q156 96 156 108 Q156 96 168 96 H286 Q298 96 298 84" fill="none" stroke="#475569" strokeWidth="2" />
      <text x="156" y="126" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#0f172a">együtt 110 év = 10 kocka</text>
      <text x="340" y="70" fontSize="22" textAnchor="middle">🧩</text>
    </svg>
  );
};

/** Ádám és Roland találkozása (TK 24/8.): 1000 m, 140 m/perc és 60 m/perc. */
export const MeetingPathSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 380 150" className={className ?? 'w-full h-auto'} fontFamily={FONT} role="img" aria-label="Ádám kerékpárral és Roland gyalog egymás felé indul 1000 méterről">
    <rect x="2" y="2" width="376" height="146" rx="16" fill="#f7fee7" stroke="#d9f99d" strokeWidth="2" />
    <text x="30" y="40" fontSize="24" textAnchor="middle">🏠</text>
    <text x="350" y="40" fontSize="24" textAnchor="middle">🏠</text>
    <line x1="30" y1="62" x2="350" y2="62" stroke="#65a30d" strokeWidth="6" strokeLinecap="round" />
    {Array.from({ length: 11 }, (_, i) => (
      <line key={i} x1={30 + i * 32} y1="56" x2={30 + i * 32} y2="68" stroke="#365314" strokeWidth="1.5" />
    ))}
    <text x="60" y="94" fontSize="22" textAnchor="middle">🚲</text>
    <text x="320" y="94" fontSize="22" textAnchor="middle">🚶</text>
    <text x="12" y="114" fontSize="12" fontWeight="bold" textAnchor="start" fill="#1d4ed8">Ádám: 140 m / perc</text>
    <text x="368" y="114" fontSize="12" fontWeight="bold" textAnchor="end" fill="#be185d">Roland: 60 m / perc</text>
    <text x="190" y="34" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#365314">1000 m</text>
    <text x="190" y="138" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#dc2626">Hol és mikor találkoznak?</text>
  </svg>
);

/** Máté és Ádám pénze (TK 25/12.). */
export const CoinsShareSvg: React.FC<FigProps> = ({ className }) => {
  const Coin: React.FC<{ x: number; y: number; v: string }> = ({ x, y, v }) => (
    <g>
      <circle cx={x} cy={y} r="15" fill={v === '100' ? '#facc15' : '#cbd5e1'} stroke={v === '100' ? '#a16207' : '#64748b'} strokeWidth="2" />
      {v === '100' && <circle cx={x} cy={y} r="9" fill="#e2e8f0" stroke="#a16207" />}
      <text x={x} y={y + 4} fontSize="9" fontWeight="bold" textAnchor="middle" fill="#334155">{v}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 380 130" className={className ?? 'w-full h-auto'} fontFamily={FONT} role="img" aria-label="Máté 350 forintja és Ádám 650 forintja">
      <rect x="2" y="2" width="376" height="126" rx="16" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
      <rect x="10" y="12" width="150" height="104" rx="12" fill="#ecfccb" stroke="#84cc16" strokeWidth="2" />
      <rect x="170" y="12" width="200" height="104" rx="12" fill="#ecfccb" stroke="#84cc16" strokeWidth="2" />
      <text x="85" y="32" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#3f6212">Máté – 350 Ft</text>
      <text x="270" y="32" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#3f6212">Ádám – 650 Ft</text>
      {[0, 1, 2].map((i) => (
        <Coin key={i} x={30 + i * 36} y={70} v="100" />
      ))}
      <Coin x={138} y={70} v="50" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Coin key={i} x={190 + (i % 4) * 36} y={i < 4 ? 58 : 94} v="100" />
      ))}
      <Coin x={262} y={94} v="50" />
    </svg>
  );
};
