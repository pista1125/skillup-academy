import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

// 1. ábra: 3 egyforma jutalom 12 diák között – három eset
export const PrizeCasesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cases = [
    { x: 20, title: '1. eset', sub: 'egy diák kapja mind a 3-at', calc: '12', color: '#2563eb', stacks: [3] },
    { x: 200, title: '2. eset', sub: 'egy diák 2-t, egy másik 1-et', calc: '12 · 11 = 132', color: '#d97706', stacks: [2, 1] },
    { x: 380, title: '3. eset', sub: '3 különböző diák 1-1-et', calc: '(12 alatt 3) = 220', color: '#059669', stacks: [1, 1, 1] }
  ];
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        3 egyforma jutalom 12 diák között – válasszuk külön az eseteket!
      </text>
      {cases.map((c) => (
        <g key={c.title}>
          <rect x={c.x} y="46" width="160" height="180" rx="14" fill="#ffffff" stroke={c.color} strokeWidth="2" />
          <text x={c.x + 80} y="70" fontSize="13" textAnchor="middle" fontWeight="bold" fill={c.color}>{c.title}</text>
          <text x={c.x + 80} y="88" fontSize="10.5" textAnchor="middle" fill="#334155">{c.sub}</text>
          {c.stacks.map((h, i) => {
            const w = 160 / c.stacks.length;
            const cx = c.x + w * i + w / 2;
            return (
              <g key={i}>
                <circle cx={cx} cy="180" r="13" fill="#e2e8f0" stroke="#64748b" />
                <rect x={cx - 11} y="193" width="22" height="18" rx="5" fill="#e2e8f0" stroke="#64748b" />
                {Array.from({ length: h }, (_, j) => (
                  <g key={j}>
                    <rect x={cx - 10} y={146 - j * 22} width="20" height="16" rx="3" fill={c.color} />
                    <line x1={cx} y1={146 - j * 22} x2={cx} y2={162 - j * 22} stroke="#ffffff" strokeWidth="2" />
                  </g>
                ))}
              </g>
            );
          })}
          <text x={c.x + 80} y="248" fontSize="13" textAnchor="middle" fontWeight="bold" fill={c.color}>{c.calc}</text>
        </g>
      ))}
      <text x="280" y="275" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Az esetek kizárják egymást: 12 + 132 + 220 = 364
      </text>
    </svg>
  );
};

// 2. ábra: 3 × 3-as tábla két bástyával (1. feladat)
export const RookBoardSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cell = 58;
  const x0 = 70;
  const y0 = 50;
  const white = { r: 0, c: 1 };
  const Rook: React.FC<{ cx: number; cy: number; fill: string; stroke: string }> = ({ cx, cy, fill, stroke }) => (
    <g fill={fill} stroke={stroke} strokeWidth="1.5">
      <rect x={cx - 14} y={cy + 8} width="28" height="8" rx="2" />
      <rect x={cx - 10} y={cy - 8} width="20" height="16" />
      <path d={`M ${cx - 13} ${cy - 8} v -9 h 6 v 5 h 4 v -5 h 6 v 5 h 4 v -5 h 6 v 9 z`} />
    </g>
  );
  return (
    <svg viewBox="0 0 560 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="270" rx="16" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />
      {['A', 'B', 'C'].map((l, i) => (
        <text key={l} x={x0 + i * cell + cell / 2} y={y0 - 10} fontSize="14" textAnchor="middle" fontWeight="bold" fill="#334155">{l}</text>
      ))}
      {[1, 2, 3].map((l, i) => (
        <text key={l} x={x0 - 16} y={y0 + i * cell + cell / 2 + 5} fontSize="14" textAnchor="middle" fontWeight="bold" fill="#334155">{l}</text>
      ))}
      {Array.from({ length: 9 }, (_, i) => {
        const r = Math.floor(i / 3);
        const c = i % 3;
        const attacked = (r === white.r || c === white.c) && !(r === white.r && c === white.c);
        const isWhite = r === white.r && c === white.c;
        return (
          <rect
            key={i}
            x={x0 + c * cell}
            y={y0 + r * cell}
            width={cell}
            height={cell}
            fill={isWhite ? '#fde68a' : attacked ? '#fecaca' : '#dcfce7'}
            stroke="#92400e"
            strokeWidth="1.5"
          />
        );
      })}
      <Rook cx={x0 + white.c * cell + cell / 2} cy={y0 + white.r * cell + cell / 2} fill="#ffffff" stroke="#0f172a" />
      <Rook cx={x0 + 2 * cell + cell / 2} cy={y0 + 2 * cell + cell / 2} fill="#0f172a" stroke="#0f172a" />
      <text x="400" y="62" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">Bástyák, amelyek nem ütik egymást</text>
      <text x="400" y="92" fontSize="12" textAnchor="middle" fill="#334155">Fehér bástya: 9 mező</text>
      <text x="400" y="112" fontSize="12" textAnchor="middle" fill="#991b1b">sorát és oszlopát kizárjuk (piros)</text>
      <text x="400" y="132" fontSize="12" textAnchor="middle" fill="#166534">fekete bástya: a maradék 4 mező (zöld)</text>
      <text x="400" y="170" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#92400e">a) 9 · 4 = 36</text>
      <text x="400" y="200" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#92400e">b) egyforma bástyák: 36 / 2 = 18</text>
      <text x="400" y="228" fontSize="11" textAnchor="middle" fill="#64748b">(a két bástya felcserélése ugyanazt adja)</text>
    </svg>
  );
};

// 3. ábra: 3 sávos zászló – piros csak felül (2. feladat)
export const FlagStripesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const Flag: React.FC<{ x: number; colors: string[]; label: string }> = ({ x, colors, label }) => (
    <g>
      <line x1={x} y1="60" x2={x} y2="200" stroke="#475569" strokeWidth="3" />
      {colors.map((c, i) => (
        <rect key={i} x={x + 2} y={62 + i * 30} width="110" height="30" fill={c} stroke="#334155" strokeWidth="1" />
      ))}
      <text x={x + 57} y="176" fontSize="12" textAnchor="middle" fill="#0f172a" fontWeight="bold">{label}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 560 270" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="260" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="32" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        3 sávos zászló 4 színnel; szomszédos sávok különbözők, piros csak felül lehet
      </text>
      <Flag x={50} colors={['#ef4444', '#22c55e', '#facc15']} label="1. eset: felül piros" />
      <Flag x={330} colors={['#3b82f6', '#facc15', '#22c55e']} label="2. eset: felül nem piros" />
      <text x="160" y="214" fontSize="12.5" textAnchor="middle" fill="#334155">felső: 1 (piros), közép: 3, alsó: 2</text>
      <text x="160" y="236" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#b91c1c">1 · 3 · 2 = 6</text>
      <text x="420" y="214" fontSize="12.5" textAnchor="middle" fill="#334155">felső: 3, közép: 2, alsó: 2</text>
      <text x="420" y="236" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">3 · 2 · 2 = 12</text>
      <text x="280" y="256" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">Összesen: 6 + 12 = 18 zászló</text>
    </svg>
  );
};

// 4. ábra: Társasjáték – 22 lépés 4 dobással (4. feladat)
export const DiceTargetSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const Die: React.FC<{ x: number; y: number; v: number }> = ({ x, y, v }) => {
    const pips: Record<number, [number, number][]> = {
      4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
      5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
      6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]]
    };
    return (
      <g>
        <rect x={x} y={y} width="30" height="30" rx="6" fill="#ffffff" stroke="#334155" strokeWidth="1.5" />
        {pips[v].map(([px, py], i) => (
          <circle key={i} cx={x + 15 + px * 8} cy={y + 15 + py * 8} r="2.6" fill="#0f172a" />
        ))}
      </g>
    );
  };
  const rows = [
    { dice: [6, 6, 6, 6], label: 'összeg 24: mind hatos', count: '1' },
    { dice: [5, 6, 6, 6], label: 'összeg 23: egy ötös, három hatos', count: '(4 alatt 1) = 4' },
    { dice: [4, 6, 6, 6], label: 'összeg 22: egy négyes', count: '(4 alatt 1) = 4' },
    { dice: [5, 5, 6, 6], label: 'összeg 22: két ötös', count: '(4 alatt 2) = 6' }
  ];
  return (
    <svg viewBox="0 0 560 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="270" rx="16" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        22 lépés a célig, 4 dobás: az összeg legalább 22 legyen
      </text>
      {rows.map((r, i) => (
        <g key={i}>
          {r.dice.map((v, j) => (
            <Die key={j} x={30 + j * 36} y={48 + i * 46} v={v} />
          ))}
          <text x="190" y={68 + i * 46} fontSize="12.5" fill="#134e4a">{r.label}</text>
          <text x="470" y={68 + i * 46} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f766e">{r.count}</text>
        </g>
      ))}
      <text x="280" y="250" fontSize="12" textAnchor="middle" fill="#334155">
        (A kockák sorrendje számít: a dobássorozatokat számoljuk.)
      </text>
      <text x="280" y="268" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Összesen: 1 + 4 + 4 + 6 = 15 dobássorozat
      </text>
    </svg>
  );
};

// 5. ábra: 9 tigris két kifutóban (6. feladat)
export const TigerEnclosuresSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const Pen: React.FC<{ x: number; y: number; w: number; m: number; f: number; label: string }> = ({ x, y, w, m, f, label }) => (
    <g>
      <rect x={x} y={y} width={w} height="56" rx="10" fill="#ffffff" stroke="#c2410c" strokeWidth="2" strokeDasharray="6 3" />
      {Array.from({ length: m + f }, (_, i) => (
        <g key={i}>
          <circle cx={x + 18 + i * 22} cy={y + 24} r="9" fill={i < m ? '#2563eb' : '#db2777'} />
          <text x={x + 18 + i * 22} y={y + 28} fontSize="10" textAnchor="middle" fill="#ffffff" fontWeight="bold">{i < m ? 'H' : 'N'}</text>
        </g>
      ))}
      <text x={x + w / 2} y={y + 49} fontSize="10.5" textAnchor="middle" fill="#7c2d12">{label}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#fff7ed" stroke="#fed7aa" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        4 hím (H) és 5 nőstény (N) tigris – kisebb és nagyobb kifutó
      </text>
      <text x="280" y="46" fontSize="11" textAnchor="middle" fill="#475569">
        min. 3 tigris kifutónként • a nagyobba több kerül • mindkettőben hím és nőstény • hímből nem több, mint nőstényből
      </text>
      <text x="30" y="80" fontSize="13" fontWeight="bold" fill="#c2410c">1. eset: 3 + 6</text>
      <Pen x={30} y={88} w={80} m={1} f={2} label="kisebb: 1 H + 2 N" />
      <Pen x={130} y={88} w={150} m={3} f={3} label="nagyobb: 3 H + 3 N" />
      <text x="420" y="122" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#7c2d12">(4 alatt 1) · (5 alatt 2) = 40</text>
      <text x="30" y="178" fontSize="13" fontWeight="bold" fill="#c2410c">2. eset: 4 + 5</text>
      <Pen x={30} y={186} w={100} m={2} f={2} label="kisebb: 2 H + 2 N" />
      <Pen x={150} y={186} w={124} m={2} f={3} label="nagyobb: 2 H + 3 N" />
      <text x="420" y="220" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#7c2d12">(4 alatt 2) · (5 alatt 2) = 60</text>
      <text x="280" y="270" fontSize="12" textAnchor="middle" fill="#475569">A 4 + 5-ös esetben az 1 H + 3 N kisebb kifutó nem jó: a nagyobbikba 3 H + 2 N kerülne.</text>
      <text x="280" y="288" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">Összesen: 40 + 60 = 100 elhelyezés</text>
    </svg>
  );
};
