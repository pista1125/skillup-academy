import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** 1. ábra: kétkarú mérleg egyensúlyban: 1 kg = 100 dkg */
export const BalanceScaleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 230" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="516" height="226" rx="16" fill="#eff6ff" stroke="#93c5fd" />
    <polygon points="260,70 230,200 290,200" fill="#64748b" />
    <rect x="200" y="196" width="120" height="14" rx="6" fill="#334155" />
    <line x1="110" y1="70" x2="410" y2="70" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
    <circle cx="260" cy="70" r="9" fill="#f59e0b" />
    <line x1="110" y1="70" x2="80" y2="140" stroke="#475569" strokeWidth="2" />
    <line x1="110" y1="70" x2="140" y2="140" stroke="#475569" strokeWidth="2" />
    <line x1="410" y1="70" x2="380" y2="140" stroke="#475569" strokeWidth="2" />
    <line x1="410" y1="70" x2="440" y2="140" stroke="#475569" strokeWidth="2" />
    <path d="M 60 140 Q 110 170 160 140 Z" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
    <path d="M 360 140 Q 410 170 460 140 Z" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
    <rect x="85" y="100" width="50" height="40" rx="6" fill="#fde68a" stroke="#a16207" strokeWidth="2" />
    <text x="110" y="126" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#713f12">1 kg</text>
    {[0, 1, 2, 3, 4].map((i) => (
      <rect key={i} x={368 + i * 17} y="120" width="15" height="20" rx="3" fill="#cbd5e1" stroke="#334155" />
    ))}
    <text x="410" y="112" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e3a8a">5 · 20 dkg</text>
    <text x="260" y="40" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1d4ed8">
      1 kg = 100 dkg
    </text>
    <text x="260" y="224" textAnchor="middle" fontSize="11" fill="#475569">
      Ha a mérleg karja vízszintes, a két oldalon ugyanakkora a tömeg.
    </text>
  </svg>
);

/** 2. ábra: tömeg-mértékegységek lépcsője: kg → dkg → g */
export const MassUnitLadderSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const box = (x: number, y: number, u: string, name: string, color: string) => (
    <g>
      <rect x={x} y={y} width="110" height="56" rx="14" fill="#ffffff" stroke={color} strokeWidth="3" />
      <text x={x + 55} y={y + 28} textAnchor="middle" fontSize="22" fontWeight="bold" fill={color}>{u}</text>
      <text x={x + 55} y={y + 46} textAnchor="middle" fontSize="11" fill="#475569">{name}</text>
    </g>
  );
  const arrow = (x1: number, y1: number, x2: number, y2: number, t: string) => (
    <g>
      <path d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${y1 - 40} ${x2} ${y2}`} fill="none" stroke="#f97316" strokeWidth="3" />
      <polygon points={`${x2},${y2} ${x2 - 10},${y2 - 6} ${x2 - 3},${y2 - 12}`} fill="#f97316" />
      <text x={(x1 + x2) / 2} y={y1 - 28} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#c2410c">{t}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 520 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="196" rx="16" fill="#fff7ed" stroke="#fdba74" />
      {box(30, 80, 'kg', 'kilogramm', '#dc2626')}
      {box(205, 100, 'dkg', 'dekagramm', '#2563eb')}
      {box(380, 120, 'g', 'gramm', '#16a34a')}
      {arrow(110, 78, 225, 98, '· 100')}
      {arrow(285, 98, 400, 118, '· 10')}
      <text x="260" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9a3412">
        1 kg = 100 dkg = 1000 g • 1 dkg = 10 g
      </text>
      <text x="260" y="192" textAnchor="middle" fontSize="11" fill="#475569">
        A grammot a nagyon könnyű dolgokhoz használjuk (fűszer, csokoládé).
      </text>
    </svg>
  );
};

/** 3. ábra: a családi gazdaság termése (oszlopdiagram, kg) */
export const HarvestChartSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const data = [
    { n: 'fokhagyma', v: 1000, c: '#eab308' },
    { n: 'vöröshagyma', v: 750, c: '#f97316' },
    { n: 'sütőtök', v: 300, c: '#22c55e' },
    { n: 'burgonya', v: 1000, c: '#3b82f6' },
    { n: 'sárgarépa', v: 600, c: '#f43f5e' }
  ];
  const x0 = 120;
  const sc = 0.36;
  return (
    <svg viewBox="0 0 520 240" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="236" rx="16" fill="#ffffff" stroke="#cbd5e1" />
      {Array.from({ length: 11 }, (_, i) => (
        <g key={i}>
          <line x1={x0 + i * 100 * sc} y1="20" x2={x0 + i * 100 * sc} y2="200" stroke="#e2e8f0" />
          <text x={x0 + i * 100 * sc} y="216" textAnchor="middle" fontSize="10" fill="#475569">{i * 100}</text>
        </g>
      ))}
      <text x={x0 + 1000 * sc + 14} y="216" fontSize="10" fill="#475569">kg</text>
      {data.map((d, i) => (
        <g key={d.n}>
          <text x={x0 - 8} y={42 + i * 34} textAnchor="end" fontSize="12" fill="#334155">{d.n}</text>
          <rect x={x0} y={28 + i * 34} width={d.v * sc} height="20" rx="4" fill={d.c} />
        </g>
      ))}
      <line x1={x0} y1="20" x2={x0} y2="200" stroke="#334155" strokeWidth="1.5" />
      <line x1={x0} y1="200" x2={x0 + 1000 * sc + 10} y2="200" stroke="#334155" strokeWidth="1.5" />
      <text x="260" y="232" textAnchor="middle" fontSize="11" fill="#475569">Melyik zöldségből mennyi termett?</text>
    </svg>
  );
};

/** 4. ábra: konténerek a szállítójárművön (6000 kg össztömeg, üresen 3800 kg) */
export const ContainersSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const items = [
    { t: '1600 kg', s: 'sárgarépa' },
    { t: '2020 kg', s: 'hagyma' },
    { t: '180 kg', s: 'burgonya' }
  ];
  return (
    <svg viewBox="0 0 520 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="196" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
      {items.map((it, i) => {
        const x = 20 + i * 168;
        return (
          <g key={it.s}>
            <rect x={x} y="40" width="148" height="80" rx="4" fill="#1e40af" />
            {Array.from({ length: 9 }, (_, k) => (
              <line key={k} x1={x + 10 + k * 15} y1="44" x2={x + 10 + k * 15} y2="116" stroke="#3b82f6" strokeWidth="3" />
            ))}
            <rect x={x + 24} y="58" width="100" height="44" rx="6" fill="#1e3a8a" opacity="0.85" />
            <text x={x + 74} y="78" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#ffffff">{it.t}</text>
            <text x={x + 74} y="96" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#bfdbfe">{it.s}</text>
          </g>
        );
      })}
      <text x="260" y="150" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
        Megengedett össztömeg: 6000 kg • Az üres konténer: 3800 kg
      </text>
      <text x="260" y="174" textAnchor="middle" fontSize="13" fill="#334155">
        Rakomány legfeljebb: 6000 kg − 3800 kg = 2200 kg
      </text>
    </svg>
  );
};

/** 5. ábra: konyhai mérleg – 1 dkg = 10 g és 1 kg liszt = 1000 g */
export const KitchenScalesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const scale = (x: number, display: string) => (
    <g>
      <ellipse cx={x} cy="150" rx="90" ry="22" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
      <ellipse cx={x} cy="140" rx="80" ry="16" fill="#e2e8f0" stroke="#475569" />
      <rect x={x - 32} y="160" width="64" height="18" rx="4" fill="#0f172a" />
      <text x={x} y="174" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#4ade80" fontFamily="monospace">{display}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 520 210" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="206" rx="16" fill="#fff1f2" stroke="#fda4af" />
      {scale(140, '10 g')}
      {scale(380, '1000 g')}
      <rect x="128" y="112" width="24" height="26" rx="4" fill="#475569" />
      <rect x="134" y="104" width="12" height="8" rx="2" fill="#475569" />
      <text x="140" y="130" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff">1 dkg</text>
      <rect x="345" y="58" width="70" height="80" rx="6" fill="#fef3c7" stroke="#a16207" strokeWidth="2" />
      <text x="380" y="92" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#713f12">liszt</text>
      <text x="380" y="112" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#713f12">1 kg</text>
      <text x="260" y="34" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#9f1239">
        A gramm jele: g • 1 dkg = 10 g • 1 kg = 1000 g
      </text>
    </svg>
  );
};
