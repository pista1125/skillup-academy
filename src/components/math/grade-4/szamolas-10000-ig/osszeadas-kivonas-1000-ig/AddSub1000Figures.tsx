import React from 'react';

const FONT = 'system-ui, sans-serif';
const C_SZ = '#dc2626';
const C_T = '#0ea5e9';
const C_E = '#eab308';

/** Fejben számolás: 250 + 170 = 250 + 100 + 70 ugrásokkal a számegyenesen (tankönyv 12. o.). */
export const MentalJumpSvg: React.FC<{ className?: string }> = ({ className }) => {
  const x0 = 20;
  const x1 = 380;
  const sx = (v: number) => x0 + ((x1 - x0) * (v - 200)) / 250;
  return (
    <svg viewBox="0 0 400 150" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="398" height="148" rx="12" fill="#eef2ff" stroke="#a5b4fc" />
      <text x="200" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#3730a3">
        250 + 170 = 250 + 100 + 70
      </text>
      <line x1={x0} y1="105" x2={x1 + 8} y2="105" stroke="#0f172a" strokeWidth="2" />
      <polygon points={`${x1 + 12},105 ${x1 + 4},100 ${x1 + 4},110`} fill="#0f172a" />
      {Array.from({ length: 26 }).map((_, i) => {
        const v = 200 + i * 10;
        const big = v % 50 === 0;
        return <line key={v} x1={sx(v)} x2={sx(v)} y1={big ? 97 : 101} y2={big ? 113 : 109} stroke="#334155" strokeWidth={big ? 1.5 : 0.7} />;
      })}
      {[200, 250, 300, 350, 400, 450].map((v) => (
        <text key={v} x={sx(v)} y="130" textAnchor="middle" fontSize="11" fill="#334155">
          {v}
        </text>
      ))}
      <path d={`M ${sx(250)} 100 Q ${(sx(250) + sx(350)) / 2} 40 ${sx(350)} 100`} fill="none" stroke="#6366f1" strokeWidth="3" />
      <path d={`M ${sx(350)} 100 Q ${(sx(350) + sx(420)) / 2} 55 ${sx(420)} 100`} fill="none" stroke="#ec4899" strokeWidth="3" />
      <text x={(sx(250) + sx(350)) / 2} y="58" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#4f46e5">+100</text>
      <text x={(sx(350) + sx(420)) / 2} y="68" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#db2777">+70</text>
      <circle cx={sx(250)} cy="105" r="5" fill="#4f46e5" />
      <circle cx={sx(350)} cy="105" r="4" fill="#6366f1" />
      <circle cx={sx(420)} cy="105" r="6" fill="#db2777" />
      <text x={sx(420)} y="90" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#be185d">420</text>
    </svg>
  );
};

/** Írásbeli művelet elrendezése sz–t–e oszlopokban, átvitellel. */
const ColumnLayout: React.FC<{
  top: string;
  bottom: string;
  result: string;
  sign: '+' | '−';
  carries: string[];
  labels: [string, string, string];
  labelColors: [string, string, string];
  className?: string;
}> = ({ top, bottom, result, sign, carries, labels, labelColors, className }) => {
  const colX = [110, 150, 190];
  const heads = [
    { t: 'sz', c: C_SZ },
    { t: 't', c: C_T },
    { t: 'e', c: C_E }
  ];
  return (
    <svg viewBox="0 0 340 200" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="338" height="198" rx="12" fill="#fff7ed" stroke="#fdba74" />
      {heads.map((h, i) => (
        <g key={h.t}>
          <rect x={colX[i] - 18} y="14" width="36" height="22" fill={h.c} />
          <text x={colX[i]} y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ffffff">
            {h.t}
          </text>
          <rect x={colX[i] - 18} y="36" width="36" height="126" fill={h.c} opacity="0.12" />
        </g>
      ))}
      {[top, bottom, result].map((row, r) =>
        row.split('').map((d, i) => (
          <text
            key={`${r}-${i}`}
            x={colX[i]}
            y={[66, 104, 150][r]}
            textAnchor="middle"
            fontSize="24"
            fontWeight="bold"
            fill={labelColors[r]}
          >
            {d}
          </text>
        ))
      )}
      {carries.map((c, i) =>
        c ? (
          <text key={`c${i}`} x={colX[i] + 13} y="86" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#64748b">
            {c}
          </text>
        ) : null
      )}
      <text x="78" y="104" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#0f172a">
        {sign}
      </text>
      <line x1="66" y1="116" x2="212" y2="116" stroke="#0f172a" strokeWidth="2.5" />
      {labels.map((l, r) => (
        <g key={`${l}-${r}`}>
          <line x1="222" y1={[58, 96, 142][r]} x2="244" y2={[58, 96, 142][r]} stroke={labelColors[r]} strokeWidth="1.5" />
          <text x="250" y={[62, 100, 146][r]} fontSize="13" fontWeight="bold" fill={labelColors[r]}>
            {l}
          </text>
        </g>
      ))}
      <text x="170" y="188" textAnchor="middle" fontSize="11" fill="#9a3412">
        Az egyesekkel kezdünk! A kis szám az átvitel.
      </text>
    </svg>
  );
};

/** Írásbeli összeadás: 448 + 263 = 711, tagok és összeg (tankönyv 15. o.). */
export const WrittenAdditionSvg: React.FC<{ className?: string }> = ({ className }) => (
  <ColumnLayout
    className={className}
    top="448"
    bottom="263"
    result="711"
    sign="+"
    carries={['1', '1', '']}
    labels={['tag', 'tag', 'összeg']}
    labelColors={['#dc2626', '#dc2626', '#0284c7']}
  />
);

/** Írásbeli kivonás: 931 − 456 = 475 (tankönyv 16. o.). */
export const WrittenSubtractionSvg: React.FC<{ className?: string }> = ({ className }) => (
  <ColumnLayout
    className={className}
    top="931"
    bottom="456"
    result="475"
    sign="−"
    carries={['1', '1', '']}
    labels={['kisebbítendő', 'kivonandó', 'különbség']}
    labelColors={['#dc2626', '#16a34a', '#0284c7']}
  />
);

/** Becslés százasra kerekített értékekkel (tankönyv 15. o.). */
export const EstimateSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 340 150" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="338" height="148" rx="12" fill="#f0fdf4" stroke="#86efac" />
    <text x="170" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#166534">
      Először becsülünk!
    </text>
    <rect x="30" y="40" width="120" height="40" rx="10" fill="#dcfce7" stroke="#16a34a" />
    <text x="90" y="66" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#14532d">448 ≈ 400</text>
    <rect x="190" y="40" width="120" height="40" rx="10" fill="#dcfce7" stroke="#16a34a" />
    <text x="250" y="66" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#14532d">263 ≈ 300</text>
    <text x="170" y="108" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">400 + 300 = 700</text>
    <text x="170" y="134" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#15803d">B: 700 → pontos összeg: 711</text>
  </svg>
);

/** Ajándékbolt árcédulákkal (tankönyv 13. o., 7. feladat). */
export const GiftShopSvg: React.FC<{ className?: string }> = ({ className }) => {
  const items = [
    { n: 'Plakát', p: 290, c: '#f97316' },
    { n: 'Könyv', p: 530, c: '#8b5cf6' },
    { n: 'Képeslap', p: 70, c: '#0ea5e9' },
    { n: 'Kitűző', p: 80, c: '#22c55e' },
    { n: 'Hűtőmágnes', p: 450, c: '#ec4899' }
  ];
  return (
    <svg viewBox="0 0 360 150" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="148" rx="12" fill="#fdf4ff" stroke="#f0abfc" />
      <text x="180" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#86198f">
        Ajándékbolt – Dávidnak 1000 Ft-ja van
      </text>
      {items.map((it, i) => {
        const x = 12 + i * 69;
        return (
          <g key={it.n}>
            <rect x={x} y="36" width="64" height="70" rx="8" fill="#ffffff" stroke={it.c} strokeWidth="2" />
            <circle cx={x + 32} cy="58" r="13" fill={it.c} opacity="0.85" />
            <text x={x + 32} y="90" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#334155">
              {it.n}
            </text>
            <rect x={x + 8} y="112" width="48" height="22" rx="6" fill={it.c} />
            <text x={x + 32} y="127" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">
              {it.p} Ft
            </text>
          </g>
        );
      })}
    </svg>
  );
};
