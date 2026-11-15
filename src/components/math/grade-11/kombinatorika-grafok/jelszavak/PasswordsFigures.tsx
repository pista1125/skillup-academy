import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** „Rekeszek” sora: minden rekesz fölött a lehetőségek száma, alatta a rekesz neve. */
const SlotRow: React.FC<{
  x: number;
  y: number;
  counts: string[];
  labels?: string[];
  color?: string;
  fill?: string;
  w?: number;
  h?: number;
  gap?: number;
  highlight?: number[];
}> = ({ x, y, counts, labels, color = '#2563eb', fill = '#eff6ff', w = 90, h = 54, gap = 34, highlight = [] }) => (
  <g>
    {counts.map((c, i) => {
      const bx = x + i * (w + gap);
      const hl = highlight.includes(i);
      return (
        <g key={i}>
          <rect
            x={bx}
            y={y}
            width={w}
            height={h}
            rx="10"
            fill={hl ? '#fef3c7' : fill}
            stroke={hl ? '#d97706' : color}
            strokeWidth="2"
          />
          <text x={bx + w / 2} y={y + h / 2 + 7} fontSize="20" fontWeight="bold" textAnchor="middle" fill={hl ? '#92400e' : color}>
            {c}
          </text>
          {labels && (
            <text x={bx + w / 2} y={y + h + 18} fontSize="11" textAnchor="middle" fill="#475569">
              {labels[i]}
            </text>
          )}
          {i < counts.length - 1 && (
            <text x={bx + w + gap / 2} y={y + h / 2 + 7} fontSize="20" fontWeight="bold" textAnchor="middle" fill="#0f172a">
              ·
            </text>
          )}
        </g>
      );
    })}
  </g>
);

// 1. ábra: Bevezető a) – három különböző karakter
export const PasswordSlotsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 560 230" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height="220" rx="16" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1.5" />
    <text x="280" y="32" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      Bendi jelszava a {'{'}B; e; n; 1; 7{'}'} karakterekből – nincs ismétlődés
    </text>
    {['B', 'e', 'n', '1', '7'].map((ch, i) => (
      <g key={ch}>
        <circle cx={190 + i * 45} cy={62} r="16" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" />
        <text x={190 + i * 45} y={68} fontSize="15" fontWeight="bold" textAnchor="middle" fill="#0369a1">
          {ch}
        </text>
      </g>
    ))}
    <SlotRow
      x={94}
      y={98}
      counts={['5-féle', '4-féle', '3-féle']}
      labels={['1. karakter', '2. karakter', '3. karakter']}
    />
    <text x="280" y="205" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">
      5 · 4 · 3 = 60 különböző jelszó
    </text>
  </svg>
);

// 2. ábra: Bevezető b) – a karakterek ismétlődhetnek
export const PasswordSlotsRepeatSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 560 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height="190" rx="16" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.5" />
    <text x="280" y="32" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      Ha a karakterek ismétlődhetnek
    </text>
    <SlotRow
      x={94}
      y={60}
      counts={['5-féle', '5-féle', '5-féle']}
      labels={['1. karakter', '2. karakter', '3. karakter']}
      color="#059669"
      fill="#d1fae5"
    />
    <text x="280" y="172" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#047857">
      5 · 5 · 5 = 5³ = 125 különböző jelszó
    </text>
  </svg>
);

// 3. ábra: Fadiagram – miért szorzunk?
export const PasswordTreeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const first = ['B', 'e', 'n'];
  const rootX = 280;
  const rootY = 44;
  const lvl1Y = 120;
  const lvl2Y = 210;
  const lvl1X = [110, 280, 450];
  return (
    <svg viewBox="0 0 560 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="270" rx="16" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="1.5" />
      <text x="20" y="30" fontSize="13" fontWeight="bold" fill="#0f172a">
        Kétkarakteres jelszavak a {'{'}B; e; n{'}'} halmazból, ismétlés nélkül
      </text>
      <circle cx={rootX} cy={rootY} r="7" fill="#7c3aed" />
      {first.map((f, i) => {
        const others = first.filter((o) => o !== f);
        return (
          <g key={f}>
            <line x1={rootX} y1={rootY} x2={lvl1X[i]} y2={lvl1Y - 16} stroke="#7c3aed" strokeWidth="2" />
            <circle cx={lvl1X[i]} cy={lvl1Y} r="16" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
            <text x={lvl1X[i]} y={lvl1Y + 6} fontSize="15" fontWeight="bold" textAnchor="middle" fill="#5b21b6">
              {f}
            </text>
            {others.map((o, j) => {
              const x2 = lvl1X[i] + (j === 0 ? -42 : 42);
              return (
                <g key={o}>
                  <line x1={lvl1X[i]} y1={lvl1Y + 16} x2={x2} y2={lvl2Y - 15} stroke="#a78bfa" strokeWidth="1.8" />
                  <circle cx={x2} cy={lvl2Y} r="15" fill="#ffffff" stroke="#a78bfa" strokeWidth="2" />
                  <text x={x2} y={lvl2Y + 5} fontSize="14" fontWeight="bold" textAnchor="middle" fill="#6d28d9">
                    {o}
                  </text>
                  <text x={x2} y={lvl2Y + 34} fontSize="12" textAnchor="middle" fill="#334155">
                    {f}
                    {o}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
      <text x="540" y={lvl1Y + 5} fontSize="12" textAnchor="end" fill="#475569">1. karakter: 3-féle</text>
      <text x="280" y="266" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#5b21b6">
        minden ághoz 2-féle folytatás ⇒ 3 · 2 = 6 jelszó
      </text>
    </svg>
  );
};

// 4. ábra: A 6. feladat „rekeszes” ábrái (négyjegyű számok)
export const FourDigitSchemesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows: { tag: string; vals: string[]; text: string; hl?: number[] }[] = [
    { tag: 'E', vals: ['9', '10', '10', '10'], text: 'a) összes négyjegyű szám = 9000' },
    { tag: 'A', vals: ['9', '9', '8', '7'], text: 'b) minden jegy különböző = 4536' },
    { tag: 'C', vals: ['9', '10', '1', '10'], text: 'c) ismétlődhet, 3. jegy 8-as = 900', hl: [2] },
    { tag: 'B', vals: ['8', '8', '1', '7'], text: 'd) különböző, 3. jegy 4-es = 448', hl: [2] },
    { tag: '?', vals: ['4', '5', '5', '5'], text: 'e) ismétlődhet, mind páros = 500' },
    { tag: 'D', vals: ['4', '4', '3', '2'], text: 'f) különböző és páros = 96' }
  ];
  return (
    <svg viewBox="0 0 560 330" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="320" rx="16" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Négyjegyű számok „rekeszekkel” (6. feladat)
      </text>
      {rows.map((r, i) => {
        const y = 44 + i * 46;
        return (
          <g key={r.tag + i}>
            <rect x="18" y={y} width="30" height="34" rx="8" fill={r.tag === '?' ? '#fee2e2' : '#fde68a'} stroke="#d97706" />
            <text x="33" y={y + 23} fontSize="15" fontWeight="bold" textAnchor="middle" fill={r.tag === '?' ? '#b91c1c' : '#92400e'}>
              {r.tag}
            </text>
            {r.vals.map((v, j) => {
              const hl = r.hl?.includes(j);
              return (
                <g key={j}>
                  <rect
                    x={62 + j * 50}
                    y={y}
                    width="38"
                    height="34"
                    rx="6"
                    fill={hl ? '#fef3c7' : '#ffffff'}
                    stroke={hl ? '#d97706' : '#2563eb'}
                    strokeWidth="1.6"
                  />
                  <text x={81 + j * 50} y={y + 23} fontSize="15" fontWeight="bold" textAnchor="middle" fill="#1e3a8a">
                    {v}
                  </text>
                  {j < 3 && (
                    <text x={106 + j * 50} y={y + 22} fontSize="14" textAnchor="middle" fill="#0f172a">
                      ·
                    </text>
                  )}
                </g>
              );
            })}
            <text x="270" y={y + 22} fontSize="13" fill="#334155">
              {r.text}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// 5. ábra: A logó három tartománya (5. feladat)
export const LogoColoringSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const palette = ['#ef4444', '#facc15', '#3b82f6', '#22c55e', '#f97316', '#a855f7'];
  return (
    <svg viewBox="0 0 560 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="20" y="30" fontSize="14" fontWeight="bold" fill="#0f172a">
        Logó: 3 tartomány, 6 szín
      </text>
      {/* középső tartomány */}
      <rect x="60" y="95" width="200" height="60" rx="10" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
      {/* felső nyíl */}
      <polygon points="70,85 210,85 210,60 255,95 70,95" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />
      {/* alsó nyíl */}
      <polygon points="250,165 110,165 110,190 65,155 250,155" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />
      <text x="160" y="131" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#ffffff">
        középső tartomány
      </text>
      <text x="140" y="80" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#ffffff">
        1. nyíl
      </text>
      <text x="180" y="181" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#ffffff">
        2. nyíl
      </text>
      {palette.map((c, i) => (
        <circle key={c} cx={310 + i * 36} cy={70} r="13" fill={c} stroke="#0f172a" strokeWidth="1" />
      ))}
      <text x="300" y="120" fontSize="13" fill="#0f172a">a) mind különböző:</text>
      <text x="300" y="140" fontSize="14" fontWeight="bold" fill="#1d4ed8">6 · 5 · 4 = 120</text>
      <text x="300" y="175" fontSize="13" fill="#0f172a">b) a két nyíl lehet egyforma:</text>
      <text x="300" y="195" fontSize="14" fontWeight="bold" fill="#047857">6 · 5 · 5 = 150</text>
      <text x="300" y="218" fontSize="11" fill="#475569">(középső: 6, mindkét nyíl: 5-5 – a középsőtől eltér)</text>
    </svg>
  );
};
