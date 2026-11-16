import React from 'react';

const FONT = 'system-ui, sans-serif';

const Arrow: React.FC<{ id: string; color: string }> = ({ id, color }) => (
  <marker id={id} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
    <path d="M0,0 L8,4 L0,8 z" fill={color} />
  </marker>
);

/** A szorzandó 100-zal nő → a szorzat 100 · 23 = 2300-zal nő (tankönyv 144. o., 1. a)). */
export const FactorChangeSvg: React.FC<{ className?: string }> = ({ className }) => {
  const rows = [
    ['126 · 23', '2898'],
    ['226 · 23', '5198'],
    ['326 · 23', '7498']
  ];
  return (
    <svg viewBox="0 0 400 200" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <defs>
        <Arrow id="fcgA" color="#7c3aed" />
        <Arrow id="fcgB" color="#16a34a" />
      </defs>
      <rect x="1" y="1" width="398" height="198" rx="12" fill="#f5f3ff" stroke="#c4b5fd" />
      <text x="200" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#4c1d95">
        Figyeld meg a tényezők és a szorzat változását!
      </text>
      {rows.map(([m, p], i) => {
        const y = 62 + i * 52;
        return (
          <g key={m}>
            <rect x="90" y={y - 20} width="110" height="32" rx="8" fill="#fff" stroke="#8b5cf6" strokeWidth="2" />
            <text x="145" y={y + 2} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e293b">
              {m}
            </text>
            <text x="222" y={y + 2} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#334155">
              =
            </text>
            <rect x="244" y={y - 20} width="80" height="32" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
            <text x="284" y={y + 2} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#166534">
              {p}
            </text>
          </g>
        );
      })}
      {[0, 1].map((i) => {
        const y1 = 62 + i * 52 + 12;
        const y2 = y1 + 28;
        return (
          <g key={i}>
            <path d={`M88 ${y1 - 8} Q58 ${(y1 + y2) / 2 - 8} 88 ${y2 - 12}`} fill="none" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#fcgA)" />
            <text x="42" y={(y1 + y2) / 2 - 4} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c3aed">
              +100
            </text>
            <path d={`M326 ${y1 - 8} Q356 ${(y1 + y2) / 2 - 8} 326 ${y2 - 12}`} fill="none" stroke="#16a34a" strokeWidth="2" markerEnd="url(#fcgB)" />
            <text x="368" y={(y1 + y2) / 2 - 4} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#16a34a">
              +2300
            </text>
          </g>
        );
      })}
      <text x="200" y="192" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#4c1d95">
        100-zal több szorzandó → 100 · 23 = 2300-zal több a szorzat.
      </text>
    </svg>
  );
};

/** Egyik tényező kétszerese, a másik fele → a szorzat nem változik (tankönyv 144. o., 1. b)). */
export const DoubleHalfSvg: React.FC<{ className?: string }> = ({ className }) => {
  const items = ['61 · 80', '122 · 40', '244 · 20'];
  return (
    <svg viewBox="0 0 400 180" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <defs>
        <Arrow id="dhA" color="#ea580c" />
      </defs>
      <rect x="1" y="1" width="398" height="178" rx="12" fill="#fff7ed" stroke="#fdba74" />
      {items.map((t, i) => (
        <g key={t}>
          <rect x={20 + i * 130} y="56" width="100" height="40" rx="10" fill="#fff" stroke="#ea580c" strokeWidth="2" />
          <text x={70 + i * 130} y="82" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e293b">
            {t}
          </text>
          <text x={70 + i * 130} y="122" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#16a34a">
            = 4880
          </text>
        </g>
      ))}
      {[0, 1].map((i) => (
        <g key={i}>
          <path d={`M${110 + i * 130} 52 Q${135 + i * 130} 24 ${160 + i * 130} 52`} fill="none" stroke="#ea580c" strokeWidth="2" markerEnd="url(#dhA)" />
          <text x={135 + i * 130} y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#c2410c">
            · 2 és : 2
          </text>
        </g>
      ))}
      <text x="200" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9a3412">
        Szorzandó kétszerese, szorzó fele → a szorzat nem változik.
      </text>
    </svg>
  );
};

/** A madarak napi útja (tankönyv 144. o., 5. feladat): seregély 40 km, gólya 200 km, sarki csér 300 km. */
export const BIRDS = [
  { name: 'seregély', km: 40, color: '#2563eb' },
  { name: 'gólya', km: 200, color: '#059669' },
  { name: 'sarki csér', km: 300, color: '#ea580c' }
];
export const BirdsChartSvg: React.FC<{ className?: string; showValues?: boolean }> = ({ className, showValues = false }) => {
  const x0 = 100;
  const scale = 0.7; // 1 km = 0.7 px → 400 km = 280 px
  return (
    <svg viewBox="0 0 400 200" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="398" height="198" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="200" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b">
        Hány km-t repülnek a madarak 1 nap alatt?
      </text>
      {Array.from({ length: 17 }).map((_, i) => (
        <line
          key={i}
          x1={x0 + i * 25 * scale}
          y1="32"
          x2={x0 + i * 25 * scale}
          y2="160"
          stroke={i % 4 === 0 ? '#94a3b8' : '#e2e8f0'}
          strokeWidth={i % 4 === 0 ? 1.4 : 1}
        />
      ))}
      <line x1={x0} y1="160" x2={x0 + 400 * scale} y2="160" stroke="#0f172a" strokeWidth="2" />
      {[0, 100, 200, 300, 400].map((v) => (
        <text key={v} x={x0 + v * scale} y="176" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">
          {v}
        </text>
      ))}
      <text x={x0 + 400 * scale} y="192" textAnchor="end" fontSize="11" fill="#334155">
        km
      </text>
      {BIRDS.map((b, i) => (
        <g key={b.name}>
          <text x={x0 - 8} y={58 + i * 40} textAnchor="end" fontSize="12" fontWeight="bold" fill="#334155">
            {b.name}
          </text>
          <rect x={x0} y={44 + i * 40} width={b.km * scale} height="20" rx="3" fill={b.color} />
          {showValues && (
            <text x={x0 + b.km * scale + 6} y={59 + i * 40} fontSize="12" fontWeight="bold" fill={b.color}>
              {b.km} km
            </text>
          )}
        </g>
      ))}
    </svg>
  );
};

/** Belépőjegyek táblázata: 320 Ft fejenként (munkafüzet II. 63. o., 1. feladat). */
export const TICKET_PEOPLE = [10, 11, 12, 15, 20, 24, 25, 30, 31];
export const TicketTableSvg: React.FC<{ className?: string; filled?: boolean }> = ({ className, filled = true }) => (
  <svg viewBox="0 0 420 120" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="418" height="118" rx="12" fill="#ecfeff" stroke="#67e8f9" />
    <text x="210" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#155e75">
      Belépőjegy: 320 Ft fejenként
    </text>
    <rect x="10" y="32" width="50" height="34" fill="#0891b2" />
    <text x="35" y="54" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">
      Fő
    </text>
    <rect x="10" y="66" width="50" height="34" fill="#0e7490" />
    <text x="35" y="88" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">
      Ft
    </text>
    {TICKET_PEOPLE.map((p, i) => (
      <g key={p}>
        <rect x={60 + i * 39} y="32" width="39" height="34" fill="#fff" stroke="#67e8f9" />
        <text x={79.5 + i * 39} y="54" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
          {p}
        </text>
        <rect x={60 + i * 39} y="66" width="39" height="34" fill="#f0fdfa" stroke="#67e8f9" />
        <text x={79.5 + i * 39} y="88" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill={filled ? '#0f766e' : '#dc2626'}>
          {filled ? p * 320 : '?'}
        </text>
      </g>
    ))}
  </svg>
);

/** Összevonás: 26 · 14 + 45 · 14 = (26 + 45) · 14 = 71 · 14 (munkafüzet II. 63. o., 2. feladat). */
export const DistributiveSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 190" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="398" height="188" rx="12" fill="#f0fdf4" stroke="#86efac" />
    <text x="200" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#166534">
      26 · 14 + 45 · 14 = (26 + 45) · 14
    </text>
    <rect x="40" y="44" width="104" height="70" fill="#bbf7d0" stroke="#15803d" strokeWidth="2" />
    <rect x="144" y="44" width="180" height="70" fill="#86efac" stroke="#15803d" strokeWidth="2" />
    <text x="92" y="84" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#14532d">
      26 · 14
    </text>
    <text x="234" y="84" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#14532d">
      45 · 14
    </text>
    <text x="92" y="132" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
      26
    </text>
    <text x="234" y="132" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
      45
    </text>
    <text x="340" y="84" fontSize="12" fontWeight="bold" fill="#166534">
      14
    </text>
    <path d="M40 140 L40 146 L324 146 L324 140" fill="none" stroke="#166534" strokeWidth="1.6" />
    <text x="182" y="164" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#166534">
      26 + 45 = 71
    </text>
    <text x="200" y="182" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">
      71 · 14 = 994
    </text>
  </svg>
);

/** Kétszeri szorzás egyetlen szorzással: 61 · 10 · 10 = 61 · 100 (munkafüzet II. 64. o., 3. feladat). */
export const ChainShortcutSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 170" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <defs>
      <Arrow id="csA" color="#2563eb" />
    </defs>
    <rect x="1" y="1" width="398" height="168" rx="12" fill="#eff6ff" stroke="#93c5fd" />
    <text x="40" y="66" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">
      61
    </text>
    <line x1="60" y1="60" x2="148" y2="60" stroke="#2563eb" strokeWidth="2" markerEnd="url(#csA)" />
    <text x="104" y="50" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#2563eb">
      · 10
    </text>
    <rect x="152" y="42" width="70" height="34" rx="6" fill="#fff" stroke="#0f172a" strokeWidth="1.6" />
    <text x="187" y="65" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1d4ed8">
      610
    </text>
    <line x1="224" y1="60" x2="300" y2="60" stroke="#2563eb" strokeWidth="2" markerEnd="url(#csA)" />
    <text x="262" y="50" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#2563eb">
      · 10
    </text>
    <rect x="304" y="42" width="76" height="34" rx="6" fill="#fff" stroke="#0f172a" strokeWidth="1.6" />
    <text x="342" y="65" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1d4ed8">
      6100
    </text>
    <path d="M40 76 L40 118 L342 118 L342 82" fill="none" stroke="#2563eb" strokeWidth="2" markerEnd="url(#csA)" />
    <rect x="160" y="104" width="64" height="28" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.6" />
    <text x="192" y="124" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e40af">
      · 100
    </text>
    <text x="200" y="156" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e3a8a">
      Kétszer 10-zel szorozni ugyanaz, mint egyszer 100-zal (10 · 10 = 100).
    </text>
  </svg>
);
