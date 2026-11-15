import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** Szám alsó indexes alapszámmal SVG-ben (pl. 943₁₂). */
export const BaseNum: React.FC<{
  x: number;
  y: number;
  value: string;
  base: number | string;
  size?: number;
  fill?: string;
  anchor?: 'start' | 'middle' | 'end';
  bold?: boolean;
}> = ({ x, y, value, base, size = 14, fill = '#0f172a', anchor = 'middle', bold = true }) => (
  <text x={x} y={y} fontSize={size} textAnchor={anchor} fill={fill} fontWeight={bold ? 'bold' : 'normal'}>
    {value}
    <tspan fontSize={size * 0.62} dy={size * 0.3}>{base}</tspan>
  </text>
);

// 1. ábra: a bevezető csomagolása – 1347 bonbon = 9 karton + 4 díszdoboz + 3 bonbon
export const BonbonPackingSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const dot = (cx: number, cy: number, k: number) => <circle key={k} cx={cx} cy={cy} r="4" fill="#92400e" />;
  return (
    <svg viewBox="0 0 560 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="270" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">1347 bonbon csomagolása tizenkettesével</text>
      {/* kartonok */}
      {Array.from({ length: 9 }, (_, i) => (
        <g key={i}>
          <rect x={25 + (i % 3) * 52} y={50 + Math.floor(i / 3) * 52} width="46" height="46" rx="5" fill="#d1fae5" stroke="#047857" strokeWidth="1.5" />
          <text x={48 + (i % 3) * 52} y={78 + Math.floor(i / 3) * 52} fontSize="10" textAnchor="middle" fill="#065f46">144</text>
        </g>
      ))}
      <text x="100" y="222" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#065f46">9 karton (nagytucat)</text>
      <text x="100" y="240" fontSize="11" textAnchor="middle" fill="#065f46">9 · 12² = 1296</text>
      {/* díszdobozok */}
      {Array.from({ length: 4 }, (_, i) => (
        <g key={i}>
          <rect x={210 + (i % 2) * 58} y={70 + Math.floor(i / 2) * 58} width="50" height="50" rx="5" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          {Array.from({ length: 12 }, (_, j) => (
            <circle key={j} cx={219 + (i % 2) * 58 + (j % 4) * 11} cy={81 + Math.floor(i / 2) * 58 + Math.floor(j / 4) * 13} r="3.5" fill="#92400e" />
          ))}
        </g>
      ))}
      <text x="264" y="222" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">4 díszdoboz (tucat)</text>
      <text x="264" y="240" fontSize="11" textAnchor="middle" fill="#1e3a8a">4 · 12 = 48</text>
      {/* maradék */}
      <rect x="350" y="100" width="56" height="50" rx="8" fill="#fef3c7" stroke="#d97706" strokeDasharray="4 3" />
      {[0, 1, 2].map((k) => dot(364 + k * 14, 125, k))}
      <text x="378" y="222" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#92400e">3 bonbon</text>
      <text x="378" y="240" fontSize="11" textAnchor="middle" fill="#92400e">3 · 1 = 3</text>
      {/* eredmény */}
      <rect x="425" y="80" width="118" height="110" rx="12" fill="#ffffff" stroke="#059669" strokeWidth="2" />
      <text x="484" y="108" fontSize="11" textAnchor="middle" fill="#334155">1296 + 48 + 3</text>
      <text x="484" y="130" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f172a">= 1347</text>
      <BaseNum x={484} y={168} value="943" base="12" size={22} fill="#047857" />
      <text x="280" y="264" fontSize="11.5" textAnchor="middle" fill="#334155">1347 : 12 = 112, maradék 3;  112 : 12 = 9, maradék 4</text>
    </svg>
  );
};

// 2. ábra: helyiérték-táblázat – 20123₄ = 539
export const PlaceValueTableSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const digits = [2, 0, 1, 2, 3];
  const powers = [4, 3, 2, 1, 0];
  const values = digits.map((d, i) => d * 4 ** powers[i]);
  const x0 = 140;
  const cw = 80;
  return (
    <svg viewBox="0 0 560 240" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="230" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">Helyiérték-táblázat a 4-es számrendszerben</text>
      {['Helyi érték', 'Alaki érték', 'Valódi érték'].map((h, r) => (
        <g key={h}>
          <rect x="20" y={48 + r * 50} width="112" height="42" rx="6" fill="#059669" />
          <text x="76" y={74 + r * 50} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#ffffff">{h}</text>
        </g>
      ))}
      {digits.map((d, i) => (
        <g key={i}>
          <rect x={x0 + i * cw} y="48" width={cw - 6} height="42" rx="6" fill="#ecfdf5" stroke="#a7f3d0" />
          <text x={x0 + i * cw + (cw - 6) / 2} y="75" fontSize="14" textAnchor="middle" fill="#065f46">
            {powers[i] === 0 ? '1' : '4'}
            {powers[i] > 1 && <tspan fontSize="9" dy="-7">{powers[i]}</tspan>}
          </text>
          <rect x={x0 + i * cw} y="98" width={cw - 6} height="42" rx="6" fill="#ffffff" stroke="#a7f3d0" />
          <text x={x0 + i * cw + (cw - 6) / 2} y="126" fontSize="18" textAnchor="middle" fontWeight="bold" fill="#0f172a">{d}</text>
          <rect x={x0 + i * cw} y="148" width={cw - 6} height="42" rx="6" fill="#fef3c7" stroke="#fcd34d" />
          <text x={x0 + i * cw + (cw - 6) / 2} y="175" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#92400e">{values[i]}</text>
        </g>
      ))}
      <BaseNum x={150} y={222} value="20123" base="4" size={15} anchor="start" />
      <text x="215" y="222" fontSize="15" fill="#0f172a">= 512 + 0 + 16 + 8 + 3 = </text>
      <text x="420" y="222" fontSize="15" fontWeight="bold" fill="#047857">539</text>
    </svg>
  );
};

// 3. ábra: kettes számrendszer – 10011010₂ = 154
export const BinaryPlaceValueSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const bits = [1, 0, 0, 1, 1, 0, 1, 0];
  const x0 = 40;
  const cw = 61;
  return (
    <svg viewBox="0 0 560 220" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="210" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">Egy bájt: 8 bit, helyi értékek 2⁷ … 2⁰</text>
      {bits.map((b, i) => {
        const pv = 2 ** (7 - i);
        return (
          <g key={i}>
            <text x={x0 + i * cw + 26} y="58" fontSize="12" textAnchor="middle" fill="#475569">{pv}</text>
            <rect x={x0 + i * cw} y="68" width="52" height="52" rx="10" fill={b ? '#10b981' : '#e2e8f0'} stroke={b ? '#047857' : '#94a3b8'} strokeWidth="2" />
            <text x={x0 + i * cw + 26} y="103" fontSize="24" textAnchor="middle" fontWeight="bold" fill={b ? '#ffffff' : '#64748b'}>{b}</text>
            <text x={x0 + i * cw + 26} y="145" fontSize="13" textAnchor="middle" fontWeight="bold" fill={b ? '#047857' : '#cbd5e1'}>{b ? pv : 0}</text>
          </g>
        );
      })}
      <BaseNum x={150} y={190} value="10011010" base="2" size={16} anchor="start" />
      <text x="248" y="190" fontSize="16" fill="#0f172a">= 128 + 16 + 8 + 2 = </text>
      <text x="438" y="190" fontSize="16" fontWeight="bold" fill="#047857">154</text>
    </svg>
  );
};

// 4. ábra: tizenhatos számrendszer – 6700 = 1A2C₁₆
export const HexPlaceValueSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cols = [
    { pv: '16³ = 4096', digit: '1', val: '1 · 4096' },
    { pv: '16² = 256', digit: 'A', val: '10 · 256' },
    { pv: '16¹ = 16', digit: '2', val: '2 · 16' },
    { pv: '1', digit: 'C', val: '12 · 1' }
  ];
  return (
    <svg viewBox="0 0 560 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">6700 a 16-os (hexadecimális) számrendszerben</text>
      {cols.map((c, i) => (
        <g key={c.pv}>
          <rect x={40 + i * 125} y="48" width="115" height="34" rx="6" fill="#4f46e5" />
          <text x={97 + i * 125} y="70" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#ffffff">{c.pv}</text>
          <rect x={40 + i * 125} y="88" width="115" height="48" rx="6" fill="#ffffff" stroke="#c7d2fe" />
          <text x={97 + i * 125} y="122" fontSize="26" textAnchor="middle" fontWeight="bold" fill="#3730a3">{c.digit}</text>
          <rect x={40 + i * 125} y="142" width="115" height="34" rx="6" fill="#eef2ff" stroke="#c7d2fe" />
          <text x={97 + i * 125} y="164" fontSize="12" textAnchor="middle" fill="#3730a3">{c.val}</text>
        </g>
      ))}
      <text x="280" y="200" fontSize="13" textAnchor="middle" fill="#334155">A = 10, B = 11, …, F = 15  •  13 kettes jegy helyett 4 hexadecimális jegy</text>
      <text x="200" y="228" fontSize="15" textAnchor="end" fill="#0f172a">6700 =</text>
      <BaseNum x={208} y={228} value="1101000101100" base="2" size={15} anchor="start" fill="#64748b" />
      <text x="360" y="228" fontSize="15" fill="#0f172a">=</text>
      <BaseNum x={378} y={228} value="1A2C" base="16" size={18} anchor="start" fill="#4338ca" />
    </svg>
  );
};

// 5. ábra: számrendszerek számjegykészlete
export const DigitSetsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows: { base: number; color: string }[] = [
    { base: 2, color: '#059669' },
    { base: 4, color: '#0d9488' },
    { base: 8, color: '#2563eb' },
    { base: 10, color: '#475569' },
    { base: 12, color: '#d97706' },
    { base: 16, color: '#7c3aed' }
  ];
  const sym = (d: number) => '0123456789ABCDEF'[d];
  return (
    <svg viewBox="0 0 560 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="270" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">n-es számrendszer: n darab számjegy (0, 1, …, n − 1)</text>
      {rows.map((r, i) => (
        <g key={r.base}>
          <text x="25" y={66 + i * 38} fontSize="12" fontWeight="bold" fill={r.color}>{r.base}-es alap</text>
          {Array.from({ length: r.base }, (_, d) => (
            <g key={d}>
              <rect x={110 + d * 27} y={48 + i * 38} width="24" height="26" rx="5" fill={d >= 10 ? '#fef3c7' : '#ffffff'} stroke={r.color} />
              <text x={122 + d * 27} y={66 + i * 38} fontSize="13" textAnchor="middle" fontWeight="bold" fill={r.color}>{sym(d)}</text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
};
