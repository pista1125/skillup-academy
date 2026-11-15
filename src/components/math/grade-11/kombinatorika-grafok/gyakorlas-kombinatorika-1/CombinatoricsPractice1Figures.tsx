import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

// 1. ábra: Ötös lottó szelvény – 90 számból 5
export const LotteryTicketSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const marked = [7, 23, 41, 66, 88];
  const cell = 22;
  const x0 = 30;
  const y0 = 50;
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="280" rx="16" fill="#fef2f2" stroke="#fecaca" strokeWidth="1.5" />
      <text x="140" y="32" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">Ötös lottó: 90 számból 5</text>
      {Array.from({ length: 90 }, (_, i) => {
        const num = i + 1;
        const r = Math.floor(i / 10);
        const c = i % 10;
        const on = marked.includes(num);
        return (
          <g key={num}>
            <rect x={x0 + c * cell} y={y0 + r * cell} width={cell - 2} height={cell - 2} rx="3" fill={on ? '#dc2626' : '#ffffff'} stroke="#fca5a5" />
            <text x={x0 + c * cell + (cell - 2) / 2} y={y0 + r * cell + 14} fontSize="9" textAnchor="middle" fill={on ? '#ffffff' : '#7f1d1d'} fontWeight={on ? 'bold' : 'normal'}>
              {num}
            </text>
          </g>
        );
      })}
      <rect x="275" y="55" width="265" height="200" rx="12" fill="#ffffff" stroke="#fecaca" />
      <text x="407" y="82" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#991b1b">A sorrend nem számít</text>
      <text x="407" y="108" fontSize="12.5" textAnchor="middle" fill="#334155">csak az, melyik 5 szám van megjelölve</text>
      <text x="407" y="140" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f172a">(90 alatt 5) = 43 949 268</text>
      <text x="407" y="172" fontSize="12.5" textAnchor="middle" fill="#334155">Telitalálat 1 szelvénnyel:</text>
      <text x="407" y="196" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#991b1b">P ≈ 1 : 44 000 000 ≈ 0,000 000 023</text>
      <text x="407" y="226" fontSize="11.5" textAnchor="middle" fill="#64748b">Hatos lottó: (45 alatt 6) = 8 145 060</text>
      <text x="407" y="244" fontSize="11.5" textAnchor="middle" fill="#64748b">P ≈ 0,000 000 123</text>
    </svg>
  );
};

// 2. ábra: Találatok szerinti szelvényszámok (5. feladat)
export const LotteryHitsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = [
    ['5', '(5 alatt 5) · (85 alatt 0)', '1'],
    ['4', '(5 alatt 4) · (85 alatt 1)', '425'],
    ['3', '(5 alatt 3) · (85 alatt 2)', '35 700'],
    ['2', '(5 alatt 2) · (85 alatt 3)', '987 700'],
    ['1', '(5 alatt 1) · (85 alatt 4)', '10 123 925'],
    ['0', '(5 alatt 0) · (85 alatt 5)', '32 801 517']
  ];
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Hány szelvény hány találatos? (5 kihúzott, 85 nem kihúzott szám)
      </text>
      {['Találat', 'Számolás', 'Szelvények'].map((h, i) => (
        <text key={h} x={[70, 270, 460][i]} y="60" fontSize="12.5" textAnchor="middle" fontWeight="bold" fill="#334155">{h}</text>
      ))}
      <line x1="25" y1="68" x2="535" y2="68" stroke="#94a3b8" />
      {rows.map((r, i) => (
        <g key={r[0]}>
          {i === 2 && <rect x="25" y={74 + i * 30} width="510" height="26" rx="6" fill="#fef3c7" />}
          <text x="70" y={92 + i * 30} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#b91c1c">{r[0]}</text>
          <text x="270" y={92 + i * 30} fontSize="12.5" textAnchor="middle" fill="#0f172a">{r[1]}</text>
          <text x="460" y={92 + i * 30} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">{r[2]}</text>
        </g>
      ))}
      <line x1="25" y1="256" x2="535" y2="256" stroke="#94a3b8" />
      <text x="280" y="280" fontSize="12.5" textAnchor="middle" fill="#334155">
        Ellenőrzés: az összeg 43 949 268 = (90 alatt 5)
      </text>
    </svg>
  );
};

// 3. ábra: Alapesetek az összeszámlálás során (Ráadás)
export const CountingCasesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const Box: React.FC<{ x: number; y: number; w: number; h: number; fill: string; stroke: string; lines: string[]; bold?: number }> = ({
    x,
    y,
    w,
    h,
    fill,
    stroke,
    lines,
    bold = 0
  }) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill={fill} stroke={stroke} strokeWidth="1.8" />
      {lines.map((l, i) => (
        <text key={i} x={x + w / 2} y={y + 18 + i * 16} fontSize="11.5" textAnchor="middle" fontWeight={i === bold ? 'bold' : 'normal'} fill="#0f172a">
          {l}
        </text>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 560 320" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="310" rx="16" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="1.5" />
      <Box x={180} y={16} w={200} h={40} fill="#ffffff" stroke="#7c3aed" lines={['n különböző elemünk van', 'hányféle lehetőség van…']} />
      <line x1="280" y1="56" x2="95" y2="86" stroke="#7c3aed" strokeWidth="1.5" />
      <line x1="280" y1="56" x2="280" y2="86" stroke="#7c3aed" strokeWidth="1.5" />
      <line x1="280" y1="56" x2="465" y2="86" stroke="#7c3aed" strokeWidth="1.5" />
      <Box x={20} y={86} w={150} h={56} fill="#dbeafe" stroke="#2563eb" lines={['mindet sorba rendezzük', '(permutáció)', 'n! = n · (n − 1) · … · 1']} bold={2} />
      <Box x={195} y={86} w={170} h={56} fill="#fef3c7" stroke="#d97706" lines={['k darabot választunk,', 'SZÁMÍT a sorrend', '(variáció)']} />
      <Box x={390} y={86} w={150} h={56} fill="#f3e8ff" stroke="#9333ea" lines={['k darabot választunk,', 'NEM számít a sorrend', '(kombináció)']} />
      <line x1="280" y1="142" x2="200" y2="172" stroke="#d97706" strokeWidth="1.5" />
      <line x1="280" y1="142" x2="360" y2="172" stroke="#d97706" strokeWidth="1.5" />
      <Box x={110} y={172} w={170} h={56} fill="#ffffff" stroke="#d97706" lines={['az elemek nem ismétlődnek', 'n · (n − 1) · … · (n − k + 1)']} bold={1} />
      <Box x={290} y={172} w={150} h={56} fill="#ffffff" stroke="#d97706" lines={['ismétlődhetnek', 'nᵏ = n · n · … · n', '(k > n is lehet)']} bold={1} />
      <line x1="465" y1="142" x2="465" y2="240" stroke="#9333ea" strokeWidth="1.5" />
      <Box x={380} y={240} w={170} h={56} fill="#ffffff" stroke="#9333ea" lines={['(n alatt k) =', 'n · (n − 1) · … · (n − k + 1) / k!']} bold={1} />
      <text x="190" y="262" fontSize="11.5" textAnchor="middle" fill="#475569">Példák: jelszó 5 · 4 · 3 = 60 vagy 5³ = 125,</text>
      <text x="190" y="280" fontSize="11.5" textAnchor="middle" fill="#475569">cirkuszi sor 5! = 120, 9 elemből 4: (9 alatt 4) = 126</text>
    </svg>
  );
};

// 4. ábra: A TÉGLALAP szó kiolvasása – útszámok rácson
export const WordGridPathsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const letters = ['TÉGLA', 'ÉGLAL', 'GLALA', 'LALAP'];
  const counts = [
    [1, 1, 1, 1, 1],
    [1, 2, 3, 4, 5],
    [1, 3, 6, 10, 15],
    [1, 4, 10, 20, 35]
  ];
  const cell = 46;
  const ax = 30;
  const bx = 300;
  const y0 = 60;
  const path = [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 3],
    [3, 3],
    [3, 4]
  ];
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="280" rx="16" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.5" />
      <text x="140" y="36" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">A TÉGLALAP szó kiolvasása</text>
      <text x="410" y="36" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">Utak száma mezőnként</text>
      <polyline
        points={path.map(([r, c]) => `${ax + c * cell + cell / 2},${y0 + r * cell + cell / 2}`).join(' ')}
        fill="none"
        stroke="#f97316"
        strokeWidth="5"
        strokeLinejoin="round"
        opacity="0.55"
      />
      {letters.map((row, r) =>
        row.split('').map((ch, c) => (
          <g key={`${r}-${c}`}>
            <rect x={ax + c * cell + 3} y={y0 + r * cell + 3} width={cell - 6} height={cell - 6} rx="6" fill="none" stroke="#6ee7b7" />
            <text x={ax + c * cell + cell / 2} y={y0 + r * cell + cell / 2 + 6} fontSize="17" textAnchor="middle" fontWeight="bold" fill="#065f46">
              {ch}
            </text>
          </g>
        ))
      )}
      {counts.map((row, r) =>
        row.map((v, c) => (
          <g key={`n${r}-${c}`}>
            <rect
              x={bx + c * cell + 3}
              y={y0 + r * cell + 3}
              width={cell - 6}
              height={cell - 6}
              rx="6"
              fill={r === 3 && c === 4 ? '#059669' : '#ffffff'}
              stroke="#6ee7b7"
            />
            <text
              x={bx + c * cell + cell / 2}
              y={y0 + r * cell + cell / 2 + 6}
              fontSize="16"
              textAnchor="middle"
              fontWeight="bold"
              fill={r === 3 && c === 4 ? '#ffffff' : '#064e3b'}
            >
              {v}
            </text>
          </g>
        ))
      )}
      <text x="280" y="260" fontSize="12.5" textAnchor="middle" fill="#064e3b">
        Minden mező = a bal oldali + a fölötte lévő szám. 7 lépésből 4 jobbra: (7 alatt 4) = 35
      </text>
    </svg>
  );
};

// 5. ábra: 15 fő három autóban (4. feladat)
export const CarsSeatingSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cars = [
    { seats: 4, x: 30, color: '#2563eb', label: '(15 alatt 4) = 1365' },
    { seats: 5, x: 205, color: '#059669', label: '(11 alatt 5) = 462' },
    { seats: 6, x: 380, color: '#d97706', label: '(6 alatt 6) = 1' }
  ];
  return (
    <svg viewBox="0 0 560 270" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="260" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        15 barát – egy 4, egy 5 és egy 6 személyes autó
      </text>
      {cars.map((car) => (
        <g key={car.seats}>
          <rect x={car.x} y="50" width="150" height="100" rx="22" fill="#ffffff" stroke={car.color} strokeWidth="2.5" />
          <circle cx={car.x + 32} cy="158" r="12" fill="#334155" />
          <circle cx={car.x + 118} cy="158" r="12" fill="#334155" />
          {Array.from({ length: car.seats }, (_, i) => {
            const cols = Math.ceil(car.seats / 2);
            const r = i % 2;
            const c = Math.floor(i / 2);
            return (
              <circle key={i} cx={car.x + 28 + c * (94 / Math.max(1, cols - 1 || 1))} cy={78 + r * 42} r="11" fill={car.color} opacity="0.85" />
            );
          })}
          <text x={car.x + 75} y="194" fontSize="12.5" textAnchor="middle" fontWeight="bold" fill={car.color}>{car.label}</text>
        </g>
      ))}
      <text x="280" y="226" fontSize="12.5" textAnchor="middle" fill="#0f172a">
        a) ülésrend lényegtelen: 1365 · 462 · 1 = 630 630   b) az ülés is számít: 15! ≈ 1,31 · 10¹²
      </text>
      <text x="280" y="248" fontSize="12" textAnchor="middle" fill="#475569">
        c) három egyforma 5 személyes autó: (15 alatt 5) · (10 alatt 5) / 3! = 126 126
      </text>
    </svg>
  );
};
