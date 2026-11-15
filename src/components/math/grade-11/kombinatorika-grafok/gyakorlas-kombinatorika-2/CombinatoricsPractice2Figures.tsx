import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

// 1. ábra: Bevezető – a „helyes válaszok” labirintusa (3 × 3 mező)
export const PracticeMazeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cells = [
    { r: 0, c: 0, q: '10 elemű halmaz', q2: '4 elemű részhalmazai', a: '210' },
    { r: 0, c: 1, q: '7 karakteres kód', q2: 'a 0; 1 jegyekből', a: '128' },
    { r: 0, c: 2, q: '5 gyerek', q2: 'sorba állása', a: '120' },
    { r: 1, c: 0, q: 'Kocka 3 dobása:', q2: 'dobássorozatok', a: '216' },
    { r: 1, c: 1, q: '3 fehér + 4 piros', q2: 'bábu sorba', a: '35' },
    { r: 1, c: 2, q: '10 gyerekből titkár', q2: 'és jegyző', a: '90' },
    { r: 2, c: 0, q: '8 fős döntő:', q2: 'első 3 helyezett', a: '336' },
    { r: 2, c: 1, q: 'Háromjegyű', q2: 'pozitív egészek', a: '900' }
  ];
  const W = 170;
  const H = 88;
  const x0 = 25;
  const y0 = 45;
  return (
    <svg viewBox="0 0 560 330" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="320" rx="16" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Bevezető: lépj mindig a helyes válasz irányába!
      </text>
      {cells.map((cell) => {
        const x = x0 + cell.c * (W + 6);
        const y = y0 + cell.r * (H + 6);
        return (
          <g key={`${cell.r}-${cell.c}`}>
            <rect x={x} y={y} width={W} height={H} rx="10" fill="#ffffff" stroke="#a78bfa" strokeWidth="1.5" />
            <text x={x + 8} y={y + 16} fontSize="10" fontWeight="bold" fill="#7c3aed">
              {String.fromCharCode(65 + cell.r)}
              {cell.c + 1}
            </text>
            <text x={x + W / 2} y={y + 34} fontSize="11.5" textAnchor="middle" fill="#334155">
              {cell.q}
            </text>
            <text x={x + W / 2} y={y + 50} fontSize="11.5" textAnchor="middle" fill="#334155">
              {cell.q2}
            </text>
            <rect x={x + W / 2 - 28} y={y + 58} width="56" height="22" rx="11" fill="#ede9fe" />
            <text x={x + W / 2} y={y + 74} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#5b21b6">
              {cell.a}
            </text>
          </g>
        );
      })}
      <g>
        <rect x={x0 + 2 * (W + 6)} y={y0 + 2 * (H + 6)} width={W} height={H} rx="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
        <text x={x0 + 2 * (W + 6) + W / 2} y={y0 + 2 * (H + 6) + 50} fontSize="18" textAnchor="middle" fontWeight="bold" fill="#15803d">
          CÉL
        </text>
      </g>
    </svg>
  );
};

// 2. ábra: Kidolgozott feladat 1 – a négysávos, kétszínű zászló
export const FlagColoringSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  // a felső sávval azonos színű sáv: 2., 3. vagy 4.
  const layouts = [
    [0, 0, 1, 1],
    [0, 1, 0, 1],
    [0, 1, 1, 0]
  ];
  const fill = ['#94a3b8', '#ffffff'];
  return (
    <svg viewBox="0 0 560 270" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="260" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        1. lépés: melyik sáv színe egyezzen a felsőével? (3 lehetőség)
      </text>
      {layouts.map((lay, i) => {
        const x = 50 + i * 170;
        return (
          <g key={i}>
            <line x1={x - 8} y1={50} x2={x - 8} y2={200} stroke="#475569" strokeWidth="3" />
            {lay.map((s, j) => (
              <rect key={j} x={x} y={52 + j * 30} width="120" height="30" fill={fill[s]} stroke="#475569" strokeWidth="1.5" />
            ))}
            <text x={x + 60} y={192} fontSize="12" textAnchor="middle" fill="#334155">
              {i + 2}. sáv = 1. sáv
            </text>
          </g>
        );
      })}
      <rect x="80" y="210" width="400" height="44" rx="10" fill="#ffffff" stroke="#c4b5fd" />
      <text x="280" y="229" fontSize="12" textAnchor="middle" fill="#4c1d95">
        2. lépés: szürke sávok 6-féle, fehér sávok 5-féle színűek ⇒ 6 · 5 = 30
      </text>
      <text x="280" y="246" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#4c1d95">
        Összesen: 3 · 30 = 90 zászló
      </text>
    </svg>
  );
};

// 3. ábra: Érettségi 2014 – a szökőkút hat vízsugara (3-3 azonos szín)
export const FountainColoringSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const colors = ['#2563eb', '#eab308', '#eab308', '#2563eb', '#eab308', '#2563eb'];
  const names = ['kék', 'sárga', 'sárga', 'kék', 'sárga', 'kék'];
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="250" rx="16" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Hat vízsugár: három-három azonos színű
      </text>
      <rect x="60" y="180" width="440" height="18" rx="6" fill="#94a3b8" />
      {colors.map((col, i) => {
        const x = 100 + i * 72;
        return (
          <g key={i}>
            <path d={`M ${x - 6} 180 C ${x - 10} 120, ${x - 4} 80, ${x} 60 C ${x + 4} 80, ${x + 10} 120, ${x + 6} 180 Z`} fill={col} opacity="0.75" />
            <circle cx={x} cy={189} r="5" fill="#334155" />
            <text x={x} y={216} fontSize="11" textAnchor="middle" fill="#334155">
              {names[i]}
            </text>
          </g>
        );
      })}
      <text x="280" y="242" fontSize="12.5" textAnchor="middle" fontWeight="bold" fill="#075985">
        színpár: 3-féle · a 6 helyből 3 az egyik színé: C(6; 3) = 20 ⇒ 3 · 20 = 60 látvány
      </text>
    </svg>
  );
};

// 4. ábra: Érettségi 2018 – a vizsgaterem 4 oszlop × 3 sor paddal
export const ExamRoomSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cols = ['A', 'B', 'C', 'D'];
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />
      <rect x="200" y="22" width="160" height="28" rx="6" fill="#fef3c7" stroke="#d97706" />
      <text x="280" y="41" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#92400e">
        Tanár
      </text>
      {[0, 1, 2].map((r) =>
        cols.map((c, ci) => {
          const x = 70 + ci * 110;
          const y = 70 + r * 60;
          const highlight = r === 0 && (ci === 0 || ci === 1);
          return (
            <g key={`${r}-${c}`}>
              <rect
                x={x}
                y={y}
                width="80"
                height="38"
                rx="6"
                fill={highlight ? '#fde68a' : '#ffffff'}
                stroke={highlight ? '#d97706' : '#94a3b8'}
                strokeWidth={highlight ? 2.5 : 1.5}
              />
              {r === 0 && (
                <text x={x + 40} y={y + 24} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#78350f">
                  {c}
                </text>
              )}
            </g>
          );
        })
      )}
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((k) => (
          <line
            key={`p-${r}-${k}`}
            x1={150 + k * 110}
            y1={89 + r * 60}
            x2={180 + k * 110}
            y2={89 + r * 60}
            stroke="#dc2626"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
        ))
      )}
      <text x="280" y="262" fontSize="12.5" textAnchor="middle" fill="#7c2d12">
        Egymás melletti padpárok: 3 sor · 3 = 9; a két lány sorrendje 2-féle
      </text>
      <text x="280" y="282" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#7c2d12">
        9 · 2 · 10! = 18 · 10! = 65 318 400 ülésrend
      </text>
    </svg>
  );
};

// 5. ábra: Kidolgozott feladat 2 – a „rossz esetek” levonása
export const NineDigitComplementSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const total = 900;
  const bad = 648;
  const w = 460;
  const badW = (w * bad) / total;
  return (
    <svg viewBox="0 0 560 210" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="200" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Háromjegyű számok, amelyekben van 9-es
      </text>
      <rect x="50" y="55" width={w} height="40" rx="6" fill="#e2e8f0" stroke="#64748b" />
      <text x={50 + w / 2} y="80" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        összes háromjegyű szám: 9 · 10 · 10 = 900
      </text>
      <rect x="50" y="110" width={badW} height="40" rx="6" fill="#fecaca" stroke="#dc2626" />
      <text x={50 + badW / 2} y="135" fontSize="12.5" textAnchor="middle" fontWeight="bold" fill="#991b1b">
        nincs benne 9-es: 8 · 9 · 9 = 648
      </text>
      <rect x={50 + badW} y="110" width={w - badW} height="40" rx="6" fill="#bbf7d0" stroke="#16a34a" />
      <text x={50 + badW + (w - badW) / 2} y="135" fontSize="12.5" textAnchor="middle" fontWeight="bold" fill="#166534">
        252
      </text>
      <text x="280" y="180" fontSize="13" textAnchor="middle" fill="#334155">
        „jó” esetek = összes − „rossz” esetek = 900 − 648 = 252
      </text>
    </svg>
  );
};
