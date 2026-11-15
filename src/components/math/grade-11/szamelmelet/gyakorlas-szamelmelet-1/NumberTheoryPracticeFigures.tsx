import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

// 1. ábra: a fejezet fogalomtérképe (42–49. lecke)
export const ChapterMapSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const boxes = [
    { x: 20, y: 50, t: 'Számhalmazok', s: 'ℕ ⊂ ℤ ⊂ ℚ, tizedes törtek', c: '#047857' },
    { x: 200, y: 50, t: 'Osztó, többszörös', s: 'prímek, prímtényezős alak', c: '#0d9488' },
    { x: 380, y: 50, t: 'Lnko, lkkt', s: '(a; b) · [a; b] = a · b', c: '#0284c7' },
    { x: 20, y: 160, t: 'Oszthatósági szabályok', s: 'utolsó jegyek, jegyösszeg', c: '#7c3aed' },
    { x: 200, y: 160, t: 'Oszthatóság és logika', s: 'és, vagy, ha…akkor, ellenpélda', c: '#db2777' },
    { x: 380, y: 160, t: 'Számrendszerek', s: 'helyi érték, átváltás', c: '#d97706' }
  ];
  return (
    <svg viewBox="0 0 560 270" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="260" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="32" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">IV. Számelmélet – amit eddig tanultunk</text>
      {[
        [180, 85, 200, 85],
        [360, 85, 380, 85],
        [100, 120, 100, 160],
        [280, 120, 280, 160],
        [460, 120, 460, 160],
        [180, 195, 200, 195],
        [360, 195, 380, 195]
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#94a3b8" strokeWidth="2" />
      ))}
      {boxes.map((b) => (
        <g key={b.t}>
          <rect x={b.x} y={b.y} width="160" height="70" rx="12" fill="#ffffff" stroke={b.c} strokeWidth="2" />
          <text x={b.x + 80} y={b.y + 28} fontSize="12.5" textAnchor="middle" fontWeight="bold" fill={b.c}>{b.t}</text>
          <text x={b.x + 80} y={b.y + 50} fontSize="10" textAnchor="middle" fill="#475569">{b.s}</text>
        </g>
      ))}
      <text x="280" y="254" fontSize="11" textAnchor="middle" fill="#334155">
        A gyakorló feladatokban ezek az eszközök keverednek!
      </text>
    </svg>
  );
};

// 2. ábra: facsemeték sorokban (3. feladat)
export const SaplingRowsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = [8, 9, 10, 12];
  return (
    <svg viewBox="0 0 560 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="270" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Soronként 8, 9, 10 vagy 12 fa – az utolsó sorba mindig 5 jut
      </text>
      {rows.map((r, i) => (
        <g key={r}>
          <text x="40" y={70 + i * 46} fontSize="12" fontWeight="bold" fill="#065f46">{r}-asával</text>
          {Array.from({ length: r }, (_, k) => (
            <g key={k}>
              <circle cx={120 + k * 18} cy={66 + i * 46} r="7" fill="#22c55e" stroke="#15803d" />
              <rect x={119 + k * 18} y={72 + i * 46} width="2" height="6" fill="#92400e" />
            </g>
          ))}
          <text x="340" y={70 + i * 46} fontSize="11" fill="#475569">… teli sorok, majd</text>
          {Array.from({ length: 5 }, (_, k) => (
            <circle key={k} cx={450 + k * 16} cy={66 + i * 46} r="6" fill="#fde047" stroke="#ca8a04" />
          ))}
        </g>
      ))}
      <text x="280" y="250" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#047857">
        n − 5 közös többszöröse 8-nak, 9-nek, 10-nek és 12-nek: [8; 9; 10; 12] = 360
      </text>
      <text x="280" y="268" fontSize="11" textAnchor="middle" fill="#334155">n &lt; 500 ⇒ n = 360 + 5 = ?</text>
    </svg>
  );
};

// 3. ábra: dominók – mikor prím a pöttyök szorzata? (4. feladat)
export const DominoPrimeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const pip = (n: number): [number, number][] => {
    const P: Record<number, [number, number][]> = {
      0: [],
      1: [[0, 0]],
      2: [[-1, -1], [1, 1]],
      3: [[-1, -1], [0, 0], [1, 1]],
      4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
      5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
      6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]]
    };
    return P[n];
  };
  const Domino: React.FC<{ x: number; y: number; a: number; b: number; hl?: boolean }> = ({ x, y, a, b, hl }) => (
    <g>
      <rect x={x} y={y} width="96" height="48" rx="8" fill={hl ? '#ecfdf5' : '#ffffff'} stroke={hl ? '#047857' : '#334155'} strokeWidth="2" />
      <line x1={x + 48} y1={y + 6} x2={x + 48} y2={y + 42} stroke="#334155" strokeWidth="1.5" />
      {pip(a).map(([dx, dy], i) => (
        <circle key={`a${i}`} cx={x + 24 + dx * 12} cy={y + 24 + dy * 12} r="4" fill="#0f172a" />
      ))}
      {pip(b).map(([dx, dy], i) => (
        <circle key={`b${i}`} cx={x + 72 + dx * 12} cy={y + 24 + dy * 12} r="4" fill="#0f172a" />
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 560 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">Dominók 0–6 pöttyel: mikor prím a szorzat?</text>
      <Domino x={40} y={52} a={2} b={6} />
      <text x="88" y="122" fontSize="11" textAnchor="middle" fill="#475569">2 · 6 = 12, összetett</text>
      <Domino x={232} y={52} a={0} b={5} />
      <text x="280" y="122" fontSize="11" textAnchor="middle" fill="#475569">0 · 5 = 0, nem prím</text>
      <Domino x={424} y={52} a={3} b={3} />
      <text x="472" y="122" fontSize="11" textAnchor="middle" fill="#475569">3 · 3 = 9, összetett</text>
      <text x="280" y="152" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#047857">
        Prím szorzathoz az egyik oldalon 1 pötty, a másikon prím kell:
      </text>
      <Domino x={56} y={166} a={1} b={2} hl />
      <Domino x={232} y={166} a={1} b={3} hl />
      <Domino x={408} y={166} a={1} b={5} hl />
    </svg>
  );
};

// 4. ábra: kétjegyű szám mínusz számjegyeinek összege mindig 9 többszöröse (7. feladat)
export const NineMultiplesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cell = 44;
  return (
    <svg viewBox="0 0 560 330" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="320" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="13.5" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        10a + b − (a + b) = 9a – az eredmény mindig 9 többszöröse
      </text>
      {Array.from({ length: 99 }, (_, i) => {
        const n = i + 1;
        const col = i % 11;
        const row = Math.floor(i / 11);
        const nine = n % 9 === 0;
        return (
          <g key={n}>
            <rect x={38 + col * cell} y={42 + row * 30} width={cell - 4} height="26" rx="5" fill={nine ? '#047857' : '#ffffff'} stroke={nine ? '#065f46' : '#cbd5e1'} />
            <text x={38 + col * cell + (cell - 4) / 2} y={60 + row * 30} fontSize="12" textAnchor="middle" fontWeight={nine ? 'bold' : 'normal'} fill={nine ? '#ffffff' : '#64748b'}>{n}</text>
          </g>
        );
      })}
    </svg>
  );
};

// 5. ábra: A, B, C halmazok Venn-diagramja (HF 1., érettségi 2012)
export const SetsVennSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 460 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="450" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <circle cx="170" cy="125" r="85" fill="#10b981" fillOpacity="0.12" stroke="#047857" strokeWidth="2" />
    <circle cx="290" cy="125" r="85" fill="#0ea5e9" fillOpacity="0.12" stroke="#0284c7" strokeWidth="2" />
    <circle cx="230" cy="205" r="85" fill="#a855f7" fillOpacity="0.12" stroke="#7c3aed" strokeWidth="2" />
    <text x="95" y="55" fontSize="16" fontWeight="bold" fill="#047857">A</text>
    <text x="355" y="55" fontSize="16" fontWeight="bold" fill="#0284c7">B</text>
    <text x="320" y="285" fontSize="16" fontWeight="bold" fill="#7c3aed">C</text>
    <text x="320" y="110" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0f172a">114</text>
    <text x="230" y="20" fontSize="10.5" textAnchor="middle" fill="#334155">A: pozitív egészek ≤ 100 · B: 3 többszörösei ≤ 300 · C: 4 többszörösei ≤ 400</text>
    <text x="230" y="165" fontSize="13" textAnchor="middle" fill="#64748b">?</text>
  </svg>
);
