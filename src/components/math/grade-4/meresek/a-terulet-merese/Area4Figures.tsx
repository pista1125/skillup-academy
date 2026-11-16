import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const Grid: React.FC<{ x: number; y: number; cols: number; rows: number; u: number; fill: string; stroke: string }> = ({
  x,
  y,
  cols,
  rows,
  u,
  fill,
  stroke
}) => (
  <g>
    {Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => (
        <rect key={`${r}-${c}`} x={x + c * u} y={y + r * u} width={u} height={u} fill={fill} stroke={stroke} strokeWidth="1.2" />
      ))
    )}
  </g>
);

/** 1. ábra: a füzet lefedése nagy és kis négyzet alakú lapokkal */
export const NotebookCoverSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="516" height="216" rx="16" fill="#fdf4ff" stroke="#e879f9" />
    <text x="130" y="28" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#86198f">Nagy lapokkal</text>
    <Grid x={40} y={40} cols={3} rows={4} u={40} fill="#f0abfc" stroke="#a21caf" />
    <text x="100" y="208" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#701a75">3 · 4 = 12 lap</text>
    <text x="390" y="28" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0e7490">Kis lapokkal</text>
    <Grid x={300} y={40} cols={6} rows={8} u={20} fill="#a5f3fc" stroke="#0e7490" />
    <text x="360" y="208" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#164e63">6 · 8 = 48 lap</text>
    <text x="210" y="110" fontSize="12" fill="#475569">Ugyanaz a füzet!</text>
    <text x="198" y="128" fontSize="12" fill="#475569">Kisebb lapból több kell.</text>
  </svg>
);

/** 2. ábra: sorok és oszlopok – 6 · 3 = 18 kis négyzet */
export const RowsColumnsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const u = 40;
  const x0 = 80;
  const y0 = 40;
  return (
    <svg viewBox="0 0 520 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="216" rx="16" fill="#fefce8" stroke="#facc15" />
      {[0, 1, 2].map((r) => (
        <g key={r}>
          {Array.from({ length: 6 }, (_, c) => (
            <rect
              key={c}
              x={x0 + c * u}
              y={y0 + r * u}
              width={u}
              height={u}
              fill={['#fde047', '#fdba74', '#fca5a5'][r]}
              stroke="#a16207"
              strokeWidth="1.5"
            />
          ))}
          <text x={x0 - 12} y={y0 + r * u + 26} textAnchor="end" fontSize="13" fontWeight="bold" fill="#713f12">
            {r + 1}. sor
          </text>
        </g>
      ))}
      {Array.from({ length: 6 }, (_, c) => (
        <text key={c} x={x0 + c * u + u / 2} y={y0 - 8} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#713f12">
          {c + 1}
        </text>
      ))}
      <text x={x0 + 6 * u + 20} y={y0 + 50} fontSize="14" fontWeight="bold" fill="#713f12">egy sorban 6</text>
      <text x={x0 + 6 * u + 20} y={y0 + 72} fontSize="14" fontWeight="bold" fill="#713f12">3 sor van</text>
      <text x="260" y="200" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#92400e">
        6 · 3 = 18 kis négyzet
      </text>
    </svg>
  );
};

/** 3. ábra: ugyanaz a téglalap különböző egységekkel lefedve */
export const UnitChoicesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const u = 22;
  const panel = (px: number, title: string, count: string, kind: 'sq' | 'tri' | 'dom' | 'big', color: string) => (
    <g>
      <text x={px + 44} y="28" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{title}</text>
      {Array.from({ length: 4 }, (_, r) =>
        Array.from({ length: 4 }, (_, c) => (
          <rect key={`${r}-${c}`} x={px + c * u} y={40 + r * u} width={u} height={u} fill={color} stroke="#ffffff" strokeWidth="0.8" />
        ))
      )}
      {kind === 'sq' &&
        Array.from({ length: 4 }, (_, r) =>
          Array.from({ length: 4 }, (_, c) => (
            <rect key={`s${r}-${c}`} x={px + c * u} y={40 + r * u} width={u} height={u} fill="none" stroke="#1e293b" strokeWidth="1.5" />
          ))
        )}
      {kind === 'tri' &&
        Array.from({ length: 4 }, (_, r) =>
          Array.from({ length: 4 }, (_, c) => (
            <g key={`t${r}-${c}`}>
              <rect x={px + c * u} y={40 + r * u} width={u} height={u} fill="none" stroke="#1e293b" strokeWidth="1.5" />
              <line x1={px + c * u} y1={40 + r * u} x2={px + (c + 1) * u} y2={40 + (r + 1) * u} stroke="#1e293b" strokeWidth="1.5" />
            </g>
          ))
        )}
      {kind === 'dom' &&
        Array.from({ length: 4 }, (_, r) =>
          Array.from({ length: 2 }, (_, c) => (
            <rect key={`d${r}-${c}`} x={px + c * 2 * u} y={40 + r * u} width={2 * u} height={u} fill="none" stroke="#1e293b" strokeWidth="2" />
          ))
        )}
      {kind === 'big' && (
        <g>
          {[0, 1].map((r) =>
            [0, 1].map((c) => (
              <rect key={`b${r}-${c}`} x={px + c * 2 * u} y={40 + r * 2 * u} width={2 * u} height={2 * u} fill="none" stroke="#1e293b" strokeWidth="2" />
            ))
          )}
        </g>
      )}
      <text x={px + 44} y="146" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b91c1c">{count}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 520 180" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="176" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
      {panel(20, 'kis négyzet', '16 db', 'sq', '#93c5fd')}
      {panel(145, 'háromszög (fél)', '32 db', 'tri', '#86efac')}
      {panel(270, 'dominó (2 kicsi)', '8 db', 'dom', '#fcd34d')}
      {panel(395, 'nagy négyzet (4)', '4 db', 'big', '#f9a8d4')}
      <text x="260" y="168" textAnchor="middle" fontSize="12" fill="#475569">
        Minél kisebb az egység, annál több darab kell ugyanahhoz a területhez.
      </text>
    </svg>
  );
};

/** 4. ábra: röplabdapálya (18 m × 9 m) és strandröplabdapálya (16 m × 8 m) kicsinyítve */
export const VolleyballCourtsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const u = 12;
  return (
    <svg viewBox="0 0 520 260" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="256" rx="16" fill="#fff7ed" stroke="#fdba74" />
      <Grid x={20} y={40} cols={18} rows={9} u={u} fill="#fb923c" stroke="#fff7ed" />
      <line x1={20 + 9 * u} y1="36" x2={20 + 9 * u} y2={40 + 9 * u + 4} stroke="#ffffff" strokeWidth="3" />
      <text x={20 + 9 * u} y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#9a3412">Röplabdapálya: 18 m × 9 m</text>
      <text x={20 + 9 * u} y={40 + 9 * u + 22} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c2d12">T = 18 · 9 = 162 egység</text>
      <Grid x={270} y={110} cols={16} rows={8} u={u - 1} fill="#facc15" stroke="#fff7ed" />
      <line x1={270 + 8 * (u - 1)} y1="106" x2={270 + 8 * (u - 1)} y2={110 + 8 * (u - 1) + 4} stroke="#ffffff" strokeWidth="3" />
      <text x={270 + 8 * (u - 1)} y="100" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#854d0e">Strandröplabda: 16 m × 8 m</text>
      <text x={270 + 8 * (u - 1)} y={110 + 8 * (u - 1) + 22} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#713f12">T = 16 · 8 = 128 egység</text>
      <rect x="30" y="225" width={u} height={u} fill="#fb923c" stroke="#9a3412" />
      <text x={36 + u} y="235" fontSize="12" fill="#7c2d12">Egység: 1 m oldalú négyzet</text>
    </svg>
  );
};

/** 5. ábra: a négyzetbe írt „rombusz” és a téglalapba írt háromszög a terület fele */
export const HalfAreaSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const u = 22;
  return (
    <svg viewBox="0 0 520 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="216" rx="16" fill="#f0fdf4" stroke="#86efac" />
      <Grid x={40} y={30} cols={6} rows={6} u={u} fill="#ffffff" stroke="#bbf7d0" />
      <rect x={40} y={30} width={6 * u} height={6 * u} fill="none" stroke="#166534" strokeWidth="2.5" />
      <polygon
        points={`${40 + 3 * u},30 ${40 + 6 * u},${30 + 3 * u} ${40 + 3 * u},${30 + 6 * u} 40,${30 + 3 * u}`}
        fill="#4ade80"
        fillOpacity="0.7"
        stroke="#14532d"
        strokeWidth="2.5"
      />
      <text x={40 + 3 * u} y="195" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#14532d">négyzet: 36 • belső: 18</text>
      <Grid x={300} y={30} cols={8} rows={6} u={u} fill="#ffffff" stroke="#bbf7d0" />
      <rect x={300} y={30} width={8 * u} height={6 * u} fill="none" stroke="#166534" strokeWidth="2.5" />
      <polygon points={`${300 + 4 * u},30 ${300 + 8 * u},${30 + 6 * u} 300,${30 + 6 * u}`} fill="#60a5fa" fillOpacity="0.7" stroke="#1e3a8a" strokeWidth="2.5" />
      <text x={300 + 4 * u} y="195" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e3a8a">téglalap: 48 • háromszög: 24</text>
      <text x="260" y="212" textAnchor="middle" fontSize="11" fill="#475569">
        A levágott sarkokból éppen kirakható a belső alakzat: a nagy terület a kicsi kétszerese.
      </text>
    </svg>
  );
};
