import React from 'react';
import { FONT, UNK, HundredFlat, Blocks, Coin, Note, NumLine } from './Numbers1000G3Parts';

const CLS = 'w-full h-auto max-w-[560px] mx-auto';

/** Tíz százas lap, százasával 100-tól 1000-ig. */
export const TenHundredsSvg: React.FC<{ className?: string }> = ({ className = CLS }) => (
  <svg viewBox="0 0 360 214" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="212" rx="14" fill="#fff7ed" stroke="#fdba74" />
    <text x="180" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#9a3412">Számolj százasával!</text>
    {Array.from({ length: 10 }, (_, i) => {
      const r = Math.floor(i / 5);
      const c = i % 5;
      const x = 28 + c * 64;
      const y = 30 + r * 76;
      return (
        <g key={i}>
          <HundredFlat x={x} y={y} s={5} color={i === 9 ? '#22c55e' : '#ef4444'} />
          <text x={x + 25} y={y + 66} textAnchor="middle" fontSize="13" fontWeight="bold" fill={i === 9 ? '#15803d' : '#7f1d1d'}>{(i + 1) * 100}</text>
        </g>
      );
    })}
    <text x="180" y="202" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#166534">10 százas = 1 ezres = 1000</text>
  </svg>
);

/** 999 + 1 = 1000: minden helyen átlépünk. */
export const ThousandStepSvg: React.FC<{ className?: string }> = ({ className = CLS }) => {
  const box = (x: number, d: string, col: string) => (
    <g>
      <rect x={x} y="40" width="34" height="46" rx="7" fill="#fff" stroke={col} strokeWidth="2.2" />
      <text x={x + 17} y="74" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#0f172a">{d}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="148" rx="14" fill="#f0fdf4" stroke="#86efac" />
      <text x="180" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#166534">Az első négyjegyű szám</text>
      {box(40, '9', '#ef4444')}
      {box(78, '9', '#3b82f6')}
      {box(116, '9', '#eab308')}
      <path d="M 160 63 L 188 63" stroke="#16a34a" strokeWidth="3" />
      <path d="M 182 56 L 190 63 L 182 70" fill="none" stroke="#16a34a" strokeWidth="3" />
      <text x="174" y="52" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#16a34a">+1</text>
      {box(198, '1', '#22c55e')}
      {box(236, '0', '#ef4444')}
      {box(274, '0', '#3b82f6')}
      {box(312, '0', '#eab308')}
      <text x="96" y="106" textAnchor="middle" fontSize="12" fill="#334155">999: háromjegyű</text>
      <text x="273" y="106" textAnchor="middle" fontSize="12" fill="#334155">1000: négyjegyű</text>
      <text x="180" y="134" textAnchor="middle" fontSize="12" fill="#166534">10 egyes = 1 tízes, 10 tízes = 1 százas, 10 százas = 1 ezres</text>
    </svg>
  );
};

/** Helyiérték-táblázat ezres oszloppal; a 0 szerepe. */
export const PlaceValueTableSvg: React.FC<{ className?: string }> = ({ className = CLS }) => {
  const cols = [
    { name: 'Ezres', fill: '#bbf7d0', ink: '#166534' },
    { name: 'Százas', fill: '#fecaca', ink: '#991b1b' },
    { name: 'Tízes', fill: '#bae6fd', ink: '#075985' },
    { name: 'Egyes', fill: '#fef08a', ink: '#854d0e' }
  ];
  const rows: [string, string[]][] = [
    ['1000', ['1', '0', '0', '0']],
    ['706', ['', '7', '0', '6']],
    ['960', ['', '9', '6', '0']],
    ['69', ['', '', '6', '9']]
  ];
  const X0 = 84;
  const CW = 66;
  return (
    <svg viewBox="0 0 360 196" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="194" rx="12" fill="#fff" stroke="#cbd5e1" />
      <rect x={X0} y="10" width={CW * 4} height="24" fill="#f97316" />
      <text x={X0 + CW * 2} y="27" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">Helyiérték</text>
      <rect x="12" y="34" width={X0 - 12} height="26" fill="#e2e8f0" stroke="#94a3b8" />
      <text x={(12 + X0) / 2} y="52" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#334155">Szám</text>
      {cols.map((c, i) => (
        <g key={c.name}>
          <rect x={X0 + i * CW} y="34" width={CW} height="26" fill={c.fill} stroke="#94a3b8" />
          <text x={X0 + i * CW + CW / 2} y="52" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={c.ink}>{c.name}</text>
        </g>
      ))}
      {rows.map(([num, ds], r) => (
        <g key={num}>
          <rect x="12" y={60 + r * 32} width={X0 - 12} height="32" fill="#f8fafc" stroke="#94a3b8" />
          <text x={(12 + X0) / 2} y={82 + r * 32} textAnchor="middle" fontSize="17" fontWeight="bold" fill="#0f172a">{num}</text>
          {ds.map((d, i) => (
            <g key={i}>
              <rect x={X0 + i * CW} y={60 + r * 32} width={CW} height="32" fill="#fff" stroke="#94a3b8" />
              <text x={X0 + i * CW + CW / 2} y={83 + r * 32} textAnchor="middle" fontSize="19" fontWeight="bold" fill={d === '0' ? UNK : cols[i].ink}>{d}</text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
};

/** 685 kirakva: 6 lap, 8 rúd, 5 kocka. */
export const Blocks685Svg: React.FC<{ className?: string }> = ({ className = CLS }) => (
  <svg viewBox="0 0 360 236" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="234" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <Blocks x={46} y={14} sz={6} t={8} e={5} s={5} />
    <text x="330" y="100" textAnchor="end" fontSize="13" fontWeight="bold" fill="#991b1b">6 százas</text>
    <text x="330" y="150" textAnchor="end" fontSize="13" fontWeight="bold" fill="#1d4ed8">8 tízes</text>
    <text x="330" y="170" textAnchor="end" fontSize="13" fontWeight="bold" fill="#a16207">5 egyes</text>
    <text x="180" y="222" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">6 sz + 8 t + 5 e = 600 + 80 + 5 = 685</text>
  </svg>
);

/** Számegyenes 0-tól 1000-ig (50-es osztás). */
export const NumberLine1000Svg: React.FC<{ className?: string }> = ({ className = CLS }) => (
  <NumLine
    lo={0}
    hi={1000}
    tick={50}
    big={100}
    labels={[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]}
    marks={[
      { v: 250, color: '#ea580c' },
      { v: 600, color: '#2563eb' },
      { v: 950, color: '#16a34a' }
    ]}
    W={360}
    H={100}
    className={className}
  />
);

/** 1000 Ft háromféleképpen. */
export const Pay1000Svg: React.FC<{ className?: string }> = ({ className = CLS }) => (
  <svg viewBox="0 0 360 196" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="194" rx="14" fill="#fefce8" stroke="#fde047" />
    <Note x={24} y={14} v={1000} w={84} />
    <text x="336" y="40" textAnchor="end" fontSize="16" fontWeight="bold" fill="#0f172a">= 1000 Ft</text>
    <Note x={24} y={74} v={500} w={84} />
    <Note x={118} y={74} v={500} w={84} />
    <text x="336" y="100" textAnchor="end" fontSize="16" fontWeight="bold" fill="#0f172a">= 1000 Ft</text>
    <Note x={24} y={134} v={500} w={84} />
    <Coin cx={136} cy={155} v={200} r={19} />
    <Coin cx={178} cy={155} v={200} r={19} />
    <Coin cx={220} cy={155} v={100} r={18} />
    <text x="336" y="160" textAnchor="end" fontSize="16" fontWeight="bold" fill="#0f172a">= 1000 Ft</text>
  </svg>
);
