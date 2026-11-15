import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

// 1. ábra: a 10ⁿ osztóira vonatkozó szabályok – az utolsó 1, 2, 3 jegy dönt
export const LastDigitsRulesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const digits = ['1', '1', '3', '8', '5'];
  const x0 = 150;
  const w = 52;
  const rows = [
    { n: 1, y: 140, c: '#059669', text: '2-vel, 5-tel: az utolsó jegy dönt (5) → 2 ∤, 5 |' },
    { n: 2, y: 180, c: '#0284c7', text: '4-gyel, 25-tel: az utolsó két jegy (85) → 4 ∤, 25 ∤' },
    { n: 3, y: 220, c: '#9333ea', text: '8-cal, 125-tel: az utolsó három jegy (385) → 8 ∤, 125 ∤' }
  ];
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">10, 100, 1000 osztói: csak a szám vége számít</text>
      {digits.map((d, i) => (
        <g key={i}>
          <rect x={x0 + i * w} y="44" width={w - 6} height="56" rx="10" fill="#ffffff" stroke="#334155" strokeWidth="1.5" />
          <text x={x0 + i * w + (w - 6) / 2} y="82" fontSize="28" textAnchor="middle" fontWeight="bold" fill="#0f172a">{d}</text>
        </g>
      ))}
      {rows.map((r) => (
        <g key={r.n}>
          <path
            d={`M ${x0 + (5 - r.n) * w} ${100 + r.n * 6} L ${x0 + (5 - r.n) * w} ${108 + r.n * 6} L ${x0 + 5 * w - 6} ${108 + r.n * 6} L ${x0 + 5 * w - 6} ${100 + r.n * 6}`}
            fill="none"
            stroke={r.c}
            strokeWidth="2.5"
          />
          <text x="40" y={r.y} fontSize="13" fontWeight="bold" fill={r.c}>{r.text}</text>
        </g>
      ))}
    </svg>
  );
};

// 2. ábra: a 3-mal és 9-cel való oszthatóság – számjegyek összege
export const DigitSumSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const digits = [1, 1, 3, 8, 5];
  return (
    <svg viewBox="0 0 560 230" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="220" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">3 és 9: a számjegyek összege dönt</text>
      {digits.map((d, i) => (
        <g key={i}>
          <circle cx={100 + i * 70} cy="80" r="24" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
          <text x={100 + i * 70} y="89" fontSize="22" textAnchor="middle" fontWeight="bold" fill="#065f46">{d}</text>
          {i < 4 && <text x={135 + i * 70} y="88" fontSize="20" textAnchor="middle" fontWeight="bold" fill="#334155">+</text>}
          <line x1={100 + i * 70} y1="106" x2="280" y2="140" stroke="#94a3b8" strokeWidth="1.2" />
        </g>
      ))}
      <rect x="230" y="140" width="100" height="36" rx="10" fill="#059669" />
      <text x="280" y="165" fontSize="18" textAnchor="middle" fontWeight="bold" fill="#ffffff">18</text>
      <text x="280" y="205" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        9 | 18 ⇒ 9 | 11 385 (és 3 | 11 385)
      </text>
    </svg>
  );
};

// 3. ábra: maradékos osztás – 1200 Ft-ból 350 Ft-os csokik
export const DivisionRemainderSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const sc = 0.4;
  const x0 = 40;
  return (
    <svg viewBox="0 0 560 210" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="200" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">b = a · k + r, ahol 0 ≤ r &lt; a</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={x0 + i * 350 * sc} y="60" width={350 * sc} height="50" fill="#a7f3d0" stroke="#047857" strokeWidth="1.5" />
          <text x={x0 + i * 350 * sc + 70} y="90" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#065f46">350 Ft</text>
        </g>
      ))}
      <rect x={x0 + 1050 * sc} y="60" width={150 * sc} height="50" fill="#fde68a" stroke="#b45309" strokeWidth="1.5" />
      <text x={x0 + 1125 * sc} y="90" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#92400e">150</text>
      <line x1={x0} y1="126" x2={x0 + 1200 * sc} y2="126" stroke="#334155" />
      <text x={x0 + 600 * sc} y="144" fontSize="12" textAnchor="middle" fill="#334155">1200 Ft</text>
      <text x="280" y="180" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        1200 = 3 · 350 + 150   (osztandó = hányados · osztó + maradék)
      </text>
    </svg>
  );
};

// 4. ábra: maradékosztályok 7-tel osztva
export const RemainderClassesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const colors = ['#059669', '#0d9488', '#0284c7', '#4f46e5', '#9333ea', '#db2777', '#ea580c'];
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">7 maradékosztály: 7k, 7k + 1, …, 7k + 6</text>
      {colors.map((c, j) => (
        <g key={j}>
          <rect x={30 + j * 72} y="42" width="66" height="28" rx="8" fill={c} />
          <text x={63 + j * 72} y="61" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#ffffff">{j === 0 ? '7k' : `7k + ${j}`}</text>
          {[0, 1, 2, 3, 4].map((r) => (
            <text key={r} x={63 + j * 72} y={96 + r * 30} fontSize="15" textAnchor="middle" fontWeight="bold" fill={c}>
              {r === 4 ? '…' : 7 * (r + 1) + j}
            </text>
          ))}
        </g>
      ))}
    </svg>
  );
};

// 5. ábra: a hét napjai körben – 100 nap múlva
export const WeekdayCycleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const days = ['hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat', 'vasárnap'];
  const cx = 170;
  const cy = 135;
  const R = 92;
  return (
    <svg viewBox="0 0 560 270" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="260" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#cbd5e1" strokeWidth="2" />
      {days.map((d, i) => {
        const ang = -Math.PI / 2 + (i * 2 * Math.PI) / 7;
        const x = cx + R * Math.cos(ang);
        const y = cy + R * Math.sin(ang);
        const hl = i === 1 ? '#059669' : i === 3 ? '#d97706' : '#ffffff';
        return (
          <g key={d}>
            <circle cx={x} cy={y} r="24" fill={hl} stroke="#334155" strokeWidth="1.5" />
            <text x={x} y={y + 4} fontSize="10" textAnchor="middle" fontWeight="bold" fill={i === 1 || i === 3 ? '#ffffff' : '#0f172a'}>{d}</text>
          </g>
        );
      })}
      <text x={cx} y={cy - 4} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#334155">100 = 7 · 14 + 2</text>
      <text x={cx} y={cy + 14} fontSize="11" textAnchor="middle" fill="#64748b">14 teljes hét + 2 nap</text>
      <text x="420" y="110" fontSize="13" textAnchor="middle" fill="#0f172a">Ma kedd van.</text>
      <text x="420" y="135" fontSize="13" textAnchor="middle" fill="#0f172a">100 nap múlva:</text>
      <text x="420" y="160" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#d97706">csütörtök</text>
    </svg>
  );
};

// 6. ábra: a kirándulócsoportok létszáma és 3-mal vett maradéka
export const ExcursionGroupsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const groups = [15, 13, 12, 14, 16, 19];
  return (
    <svg viewBox="0 0 560 230" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="220" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">Melyik csoport nélkül lesz a többiek létszáma 3 többszöröse?</text>
      {groups.map((g, i) => {
        const x = 30 + i * 85;
        const hl = g === 14;
        return (
          <g key={g}>
            <rect x={x} y="50" width="75" height="70" rx="12" fill={hl ? '#fef3c7' : '#ffffff'} stroke={hl ? '#d97706' : '#334155'} strokeWidth={hl ? 2.5 : 1.5} />
            <text x={x + 37.5} y="82" fontSize="20" textAnchor="middle" fontWeight="bold" fill="#0f172a">{g}</text>
            <text x={x + 37.5} y="106" fontSize="10" textAnchor="middle" fill="#475569">fő</text>
            <text x={x + 37.5} y="145" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#059669">mar. {g % 3}</text>
          </g>
        );
      })}
      <text x="280" y="180" fontSize="13" textAnchor="middle" fill="#0f172a">összes: 89 fő, 89 = 3 · 29 + 2 ⇒ a kihagyott csoport maradéka is 2</text>
      <text x="280" y="204" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#b45309">a 14 fős csoport: 75 fő marad = 50 Gólya + 25 Végzős</text>
    </svg>
  );
};
