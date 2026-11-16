import React from 'react';

const FONT = 'system-ui, sans-serif';
export const PV_COLORS = ['#16a34a', '#dc2626', '#0ea5e9', '#eab308']; // E, sz, t, e
export const PV_HEADS = ['E', 'sz', 't', 'e'];

/** Egy pénzérme rajza. */
const Coin: React.FC<{ x: number; y: number; value: number; fill: string }> = ({ x, y, value, fill }) => (
  <g>
    <circle cx={x} cy={y} r="15" fill={fill} stroke="#475569" strokeWidth="1.5" />
    <circle cx={x} cy={y} r="11.5" fill="none" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="1" />
    <text x={x} y={y + 4.5} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e293b">
      {value}
    </text>
  </g>
);

/** Érmék csoportjai (tankönyv 136. o., 1. feladat): 12 darab 20 forintos = 12 · 20 = 240 Ft. */
export const CoinGroupsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const coins = Array.from({ length: 12 });
  return (
    <svg viewBox="0 0 400 210" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="398" height="208" rx="12" fill="#eff6ff" stroke="#93c5fd" />
      <rect x="140" y="12" width="120" height="24" rx="12" fill="#3b82f6" />
      <text x="200" y="29" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">
        Barnabás pénze
      </text>
      {coins.map((_, i) => (
        <Coin key={i} x={70 + (i % 6) * 52} y={70 + Math.floor(i / 6) * 42} value={20} fill="#d9c56b" />
      ))}
      <text x="200" y="164" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e3a8a">
        12 darab 20 forintos
      </text>
      <text x="200" y="190" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#1d4ed8">
        12 · 20 = 12 · 2 tízes = 24 tízes = 240 Ft
      </text>
    </svg>
  );
};

/** Helyiérték-táblázat: 71 · 10 = 710 és 893 · 10 = 8930, a számjegyek egy hellyel balra lépnek. */
export const TimesTenTableSvg: React.FC<{ className?: string }> = ({ className }) => {
  const colX = [60, 100, 140, 180];
  const colX2 = [240, 280, 320, 360];
  const table = (xs: number[], top: string, bottom: string, key: string) => (
    <g key={key}>
      {PV_HEADS.map((h, i) => (
        <g key={h}>
          <rect x={xs[i] - 20} y="44" width="40" height="22" fill={PV_COLORS[i]} />
          <text x={xs[i]} y="60" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">
            {h}
          </text>
          <rect x={xs[i] - 20} y="66" width="40" height="80" fill={PV_COLORS[i]} opacity="0.13" />
        </g>
      ))}
      {top
        .padStart(4, ' ')
        .split('')
        .map((d, i) => (
          <text key={`t${i}`} x={xs[i]} y="94" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">
            {d.trim()}
          </text>
        ))}
      {bottom
        .padStart(4, ' ')
        .split('')
        .map((d, i) => (
          <text
            key={`b${i}`}
            x={xs[i]}
            y="134"
            textAnchor="middle"
            fontSize="22"
            fontWeight="bold"
            fill={i === 3 ? '#dc2626' : '#1d4ed8'}
          >
            {d.trim()}
          </text>
        ))}
      {top
        .padStart(4, ' ')
        .split('')
        .map((d, i) =>
          d.trim() && i > 0 ? (
            <line
              key={`a${i}`}
              x1={xs[i] - 4}
              y1="100"
              x2={xs[i - 1] + 6}
              y2="116"
              stroke="#334155"
              strokeWidth="1.6"
              markerEnd="url(#ttArrow)"
            />
          ) : null
        )}
    </g>
  );
  return (
    <svg viewBox="0 0 400 200" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <defs>
        <marker id="ttArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#334155" />
        </marker>
      </defs>
      <rect x="1" y="1" width="398" height="198" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="200" y="28" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">
        Szorzás 10-zel: minden számjegy egy hellyel balra lép
      </text>
      {table(colX, '71', '710', 'l')}
      {table(colX2, '893', '8930', 'r')}
      <text x="120" y="172" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
        71 · 10 = 710
      </text>
      <text x="300" y="172" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
        893 · 10 = 8930
      </text>
      <text x="200" y="192" textAnchor="middle" fontSize="11" fill="#dc2626" fontWeight="bold">
        Az egyesek helyére 0 kerül.
      </text>
    </svg>
  );
};

/** Hogyan változik a szorzat, ha a szorzót 10-szeresére, 100-szorosára változtatjuk (tankönyv 137. o., 3. feladat). */
export const FactorChainSvg: React.FC<{ className?: string }> = ({ className }) => {
  const rows = [
    { m: '· 7', r: '63', c: '#b91c1c' },
    { m: '· 70', r: '630', c: '#ea580c' },
    { m: '· 700', r: '6300', c: '#ca8a04' }
  ];
  return (
    <svg viewBox="0 0 400 200" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <defs>
        <marker id="fcArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#475569" />
        </marker>
        <marker id="fcArrowR" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#dc2626" />
        </marker>
      </defs>
      <rect x="1" y="1" width="398" height="198" rx="12" fill="#fffbeb" stroke="#fcd34d" />
      <rect x="40" y="82" width="60" height="34" rx="17" fill="#fde047" stroke="#ca8a04" />
      <text x="70" y="105" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#713f12">
        9
      </text>
      {rows.map((row, i) => {
        const y = 45 + i * 55;
        return (
          <g key={row.m}>
            <path d={`M100 99 L130 99 L130 ${y} L240 ${y}`} fill="none" stroke="#475569" strokeWidth="1.8" markerEnd="url(#fcArrow)" />
            <text x="175" y={y - 7} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">
              {row.m}
            </text>
            <rect x="248" y={y - 17} width="80" height="34" rx="17" fill={row.c} />
            <text x="288" y={y + 6} textAnchor="middle" fontSize="17" fontWeight="bold" fill="#fff">
              {row.r}
            </text>
          </g>
        );
      })}
      <path d="M332 52 Q365 72 332 92" fill="none" stroke="#dc2626" strokeWidth="2" markerEnd="url(#fcArrowR)" />
      <path d="M332 107 Q365 127 332 147" fill="none" stroke="#dc2626" strokeWidth="2" markerEnd="url(#fcArrowR)" />
      <text x="378" y="76" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">
        · 10
      </text>
      <text x="378" y="131" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">
        · 10
      </text>
      <text x="200" y="190" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400e">
        A szorzó 10-szerese → a szorzat is 10-szerese lesz.
      </text>
    </svg>
  );
};

/** Szorzás kerek tízessel: 23 · 50 = 23 · 5 · 10 = 1150. */
export const RoundTensSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 190" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <defs>
      <marker id="rtArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 z" fill="#7c3aed" />
      </marker>
    </defs>
    <rect x="1" y="1" width="398" height="188" rx="12" fill="#f5f3ff" stroke="#c4b5fd" />
    <text x="200" y="28" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#4c1d95">
      23 · 50 = ?
    </text>
    <rect x="24" y="52" width="100" height="44" rx="10" fill="#fff" stroke="#8b5cf6" strokeWidth="2" />
    <text x="74" y="80" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e293b">
      23
    </text>
    <line x1="126" y1="74" x2="166" y2="74" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#rtArrow)" />
    <text x="146" y="66" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c3aed">
      · 5
    </text>
    <rect x="172" y="52" width="80" height="44" rx="10" fill="#fff" stroke="#8b5cf6" strokeWidth="2" />
    <text x="212" y="80" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e293b">
      115
    </text>
    <line x1="254" y1="74" x2="294" y2="74" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#rtArrow)" />
    <text x="274" y="66" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c3aed">
      · 10
    </text>
    <rect x="300" y="52" width="80" height="44" rx="10" fill="#7c3aed" />
    <text x="340" y="80" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff">
      1150
    </text>
    <text x="200" y="128" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">
      50 = 5 · 10, ezért előbb 5-tel, aztán 10-zel szorzok.
    </text>
    <text x="200" y="156" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">
      23 · 5 = 115 → 115 · 10 = 1150
    </text>
    <text x="200" y="178" textAnchor="middle" fontSize="12" fill="#6d28d9">
      Röviden: szorozz a tízesek számával, és írj a végére egy 0-t!
    </text>
  </svg>
);

/** Szorzás tagonként: 130 · 60 = 100 · 60 + 30 · 60 = 6000 + 1800 = 7800 (tankönyv 137. o., 4. feladat). */
export const SplitMulSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 190" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="398" height="188" rx="12" fill="#fff7ed" stroke="#fdba74" />
    <text x="200" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#9a3412">
      130 · 60 = (100 + 30) · 60
    </text>
    {/* téglalap két részre bontva */}
    <rect x="40" y="48" width="200" height="70" fill="#fdba74" stroke="#c2410c" strokeWidth="2" />
    <rect x="240" y="48" width="60" height="70" fill="#fed7aa" stroke="#c2410c" strokeWidth="2" />
    <text x="140" y="80" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#7c2d12">
      100 · 60
    </text>
    <text x="140" y="102" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#7c2d12">
      6000
    </text>
    <text x="270" y="80" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c2d12">
      30 · 60
    </text>
    <text x="270" y="102" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#7c2d12">
      1800
    </text>
    <text x="140" y="138" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9a3412">
      100
    </text>
    <text x="270" y="138" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9a3412">
      30
    </text>
    <text x="320" y="88" fontSize="12" fontWeight="bold" fill="#9a3412">
      60
    </text>
    <text x="200" y="172" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#c2410c">
      6000 + 1800 = 7800
    </text>
  </svg>
);
