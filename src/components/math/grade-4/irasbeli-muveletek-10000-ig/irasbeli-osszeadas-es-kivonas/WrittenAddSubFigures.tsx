import React from 'react';

const FONT = 'system-ui, sans-serif';
export const PV_COLORS = ['#16a34a', '#dc2626', '#0ea5e9', '#eab308']; // E, sz, t, e
export const PV_HEADS = ['E', 'sz', 't', 'e'];

/** Négyjegyű írásbeli művelet E–sz–t–e oszlopokban. */
const Column4: React.FC<{
  rows: string[];
  sign: '+' | '−';
  result: string;
  carries?: string[]; // E, sz, t, e oszlop alá írt kis szám (a második sorban)
  minuendNotes?: string[]; // a felső sor fölé írt piros megjegyzés
  subtrahendNotes?: string[];
  title: string;
  bg: string;
  stroke: string;
  className?: string;
}> = ({ rows, sign, result, carries, minuendNotes, subtrahendNotes, title, bg, stroke, className }) => {
  const colX = [130, 180, 230, 280];
  const rowY = rows.map((_, i) => 82 + i * 34);
  const lineY = rowY[rowY.length - 1] + 14;
  const resY = lineY + 30;
  const cells = (row: string, y: number, key: string) =>
    row
      .padStart(4, ' ')
      .split('')
      .map((d, i) => (
        <text key={`${key}${i}`} x={colX[i]} y={y} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">
          {d.trim()}
        </text>
      ));
  return (
    <svg viewBox={`0 0 400 ${resY + 22}`} className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="398" height={resY + 20} rx="12" fill={bg} stroke={stroke} />
      <text x="200" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">
        {title}
      </text>
      {PV_HEADS.map((h, i) => (
        <g key={h}>
          <rect x={colX[i] - 20} y="34" width="40" height="22" fill={PV_COLORS[i]} />
          <text x={colX[i]} y="50" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ffffff">
            {h}
          </text>
          <rect x={colX[i] - 20} y="56" width="40" height={resY - 44} fill={PV_COLORS[i]} opacity="0.12" />
        </g>
      ))}
      {rows.map((r, i) => cells(r, rowY[i], `r${i}`))}
      {minuendNotes?.map((n, i) =>
        n ? (
          <text key={`mn${i}`} x={colX[i] + 15} y={rowY[0] - 14} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">
            {n}
          </text>
        ) : null
      )}
      {subtrahendNotes?.map((n, i) =>
        n ? (
          <text key={`sn${i}`} x={colX[i] - 20} y={rowY[rows.length - 1] - 2} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">
            {n}
          </text>
        ) : null
      )}
      {carries?.map((c, i) =>
        c ? (
          <text key={`c${i}`} x={colX[i] + 14} y={rowY[rows.length - 1] + 10} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#64748b">
            {c}
          </text>
        ) : null
      )}
      <text x={colX[0] - 40} y={rowY[rows.length - 1]} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">
        {sign}
      </text>
      <line x1={colX[0] - 52} y1={lineY} x2={colX[3] + 22} y2={lineY} stroke="#0f172a" strokeWidth="2.5" />
      {cells(result, resY, 'res')}
    </svg>
  );
};

/** 3845 + 2850 = 6695 (tankönyv 71. o., 1. feladat). */
export const WrittenAdditionSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Column4
    title="3845 + 2850 = 6695 (vonatjegy + hajójegy)"
    rows={['3845', '2850']}
    sign="+"
    result="6695"
    carries={['1', '', '', '']}
    bg="#fff7ed"
    stroke="#fdba74"
    className={className}
  />
);

/** Mona módszere: 1 ezrest felváltunk 10 százasra (tankönyv 73. o.). */
export const MonaSubtractionSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Column4
    title="Mona: 1 ezrest felvált 10 százasra"
    rows={['7212', '5410']}
    sign="−"
    result="1802"
    minuendNotes={['6', '+10', '', '']}
    bg="#fdf2f8"
    stroke="#f9a8d4"
    className={className}
  />
);

/** Manó módszere: +10 százas a kisebbítendőhöz, +1 ezres a kivonandóhoz (tankönyv 73. o.). */
export const ManoSubtractionSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Column4
    title="Manó: +10 százas fent, +1 ezres lent"
    rows={['7212', '5410']}
    sign="−"
    result="1802"
    minuendNotes={['', '+10', '', '']}
    subtrahendNotes={['+1', '', '', '']}
    bg="#eff6ff"
    stroke="#93c5fd"
    className={className}
  />
);

/** Becslés százasra és ezresre kerekítéssel. */
export const EstimateSvg: React.FC<{ className?: string }> = ({ className }) => {
  const box = (x: number, title: string, lines: string[], color: string, fill: string) => (
    <g>
      <rect x={x} y="40" width="180" height="120" rx="12" fill={fill} stroke={color} strokeWidth="2" />
      <text x={x + 90} y="64" textAnchor="middle" fontSize="13" fontWeight="bold" fill={color}>
        {title}
      </text>
      {lines.map((l, i) => (
        <text key={l} x={x + 90} y={92 + i * 26} textAnchor="middle" fontSize={i === 2 ? 16 : 14} fontWeight="bold" fill="#0f172a">
          {l}
        </text>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 400 180" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="398" height="178" rx="12" fill="#f0fdf4" stroke="#86efac" />
      <text x="200" y="26" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">
        Becslés: 3845 + 2850
      </text>
      {box(14, 'Százasra kerekítve', ['3845 ≈ 3800', '2850 ≈ 2900', 'B: 6700'], '#7c3aed', '#f5f3ff')}
      {box(206, 'Ezresre kerekítve', ['3845 ≈ 4000', '2850 ≈ 3000', 'B: 7000'], '#ea580c', '#fff7ed')}
    </svg>
  );
};

/** Repülőút: Budapest → Párizs → Róma (tankönyv 72. o., 6. feladat). */
export const FlightRouteSvg: React.FC<{ className?: string }> = ({ className }) => {
  const city = (x: number, name: string) => (
    <g>
      <rect x={x - 48} y="60" width="96" height="34" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
      <text x={x} y="82" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#075985">
        {name}
      </text>
    </g>
  );
  const plane = (cx: number) => (
    <g transform={`translate(${cx} 40)`}>
      <path d="M -16 0 L 14 0 L 20 -3 L 14 2 L -16 2 Z" fill="#334155" />
      <path d="M -2 0 L -8 -9 L -3 -9 L 6 0 Z" fill="#475569" />
      <path d="M -2 2 L -8 11 L -3 11 L 6 2 Z" fill="#475569" />
    </g>
  );
  return (
    <svg viewBox="0 0 400 150" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="398" height="148" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      {city(56, 'Budapest')}
      {city(200, 'Párizs')}
      {city(344, 'Róma')}
      {[104, 248].map((x) => (
        <g key={x}>
          <line x1={x + 4} y1="77" x2={x + 40} y2="77" stroke="#ea580c" strokeWidth="2.5" />
          <polygon points={`${x + 44},77 ${x + 36},72 ${x + 36},82`} fill="#ea580c" />
        </g>
      ))}
      {plane(128)}
      {plane(272)}
      <rect x="82" y="104" width="92" height="24" rx="6" fill="#fed7aa" />
      <text x="128" y="121" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c2d12">1246 km</text>
      <rect x="226" y="104" width="92" height="24" rx="6" fill="#fed7aa" />
      <text x="272" y="121" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c2d12">1106 km</text>
      <text x="200" y="144" textAnchor="middle" fontSize="11" fill="#475569">Összesen: 1246 km + 1106 km</text>
    </svg>
  );
};

/** Ha a kisebbítendőt és a kivonandót ugyanannyival növeljük, a különbség nem változik (8. feladat). */
export const SameDifferenceSvg: React.FC<{ className?: string }> = ({ className }) => {
  const op = (x: number, a: string, b: string, d: string) => (
    <g>
      <text x={x} y="66" textAnchor="end" fontSize="20" fontWeight="bold" fill="#0f172a">{a}</text>
      <text x={x} y="96" textAnchor="end" fontSize="20" fontWeight="bold" fill="#0f172a">−{b}</text>
      <line x1={x - 62} y1="104" x2={x + 2} y2="104" stroke="#0f172a" strokeWidth="2" />
      <text x={x} y="130" textAnchor="end" fontSize="20" fontWeight="bold" fill="#7c3aed">{d}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 400 160" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="398" height="158" rx="12" fill="#faf5ff" stroke="#d8b4fe" />
      <text x="200" y="26" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#6b21a8">
        Mindkettőhöz + 100 → a különbség ugyanannyi!
      </text>
      {op(130, '4876', '1325', '3551')}
      {op(330, '4976', '1425', '3551')}
      {[60, 90].map((y) => (
        <g key={y}>
          <line x1="160" y1={y} x2="240" y2={y} stroke="#dc2626" strokeWidth="2" />
          <polygon points={`246,${y} 238,${y - 5} 238,${y + 5}`} fill="#dc2626" />
          <text x="200" y={y - 5} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">+ 100</text>
        </g>
      ))}
    </svg>
  );
};
