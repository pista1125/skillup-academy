import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

// 1. ábra: a 72 osztópárjai – szivárványívek, a tükörtengely √72 ≈ 8,49
export const DivisorPairsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const divs = [1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72];
  const colors = ['#059669', '#0d9488', '#0284c7', '#4f46e5', '#9333ea', '#db2777'];
  const x0 = 40;
  const step = 44;
  const y = 200;
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        A 72 osztópárjai: a · b = 72
      </text>
      {divs.slice(0, 6).map((d, i) => {
        const xa = x0 + i * step;
        const xb = x0 + (11 - i) * step;
        const r = (xb - xa) / 2;
        return (
          <path
            key={d}
            d={`M ${xa} ${y - 14} A ${r} ${Math.min(r, 150) * 0.95} 0 0 1 ${xb} ${y - 14}`}
            fill="none"
            stroke={colors[i]}
            strokeWidth="2.5"
          />
        );
      })}
      {divs.map((d, i) => (
        <g key={d}>
          <circle cx={x0 + i * step} cy={y} r="14" fill="#ffffff" stroke={i < 6 ? colors[i] : colors[11 - i]} strokeWidth="2" />
          <text x={x0 + i * step} y={y + 5} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f172a">{d}</text>
        </g>
      ))}
      <line x1={x0 + 5.5 * step} y1="50" x2={x0 + 5.5 * step} y2="232" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="5 4" />
      <text x={x0 + 5.5 * step} y="246" fontSize="11" textAnchor="middle" fill="#dc2626" fontWeight="bold">√72 ≈ 8,49</text>
      <text x="90" y="246" fontSize="10.5" textAnchor="middle" fill="#475569">kisebb tényezők</text>
      <text x="470" y="246" fontSize="10.5" textAnchor="middle" fill="#475569">nagyobb tényezők</text>
    </svg>
  );
};

// 2. ábra: a 630 prímtényező-fája (tetszőleges tényezőkre bontva)
export const FactorTreeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  type Node = { x: number; y: number; v: string; prime?: boolean };
  const nodes: Node[] = [
    { x: 280, y: 50, v: '630' },
    { x: 180, y: 110, v: '10' },
    { x: 380, y: 110, v: '63' },
    { x: 130, y: 175, v: '2', prime: true },
    { x: 230, y: 175, v: '5', prime: true },
    { x: 330, y: 175, v: '7', prime: true },
    { x: 430, y: 175, v: '9' },
    { x: 395, y: 235, v: '3', prime: true },
    { x: 465, y: 235, v: '3', prime: true }
  ];
  const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [6, 7], [6, 8]];
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="20" y="30" fontSize="13" fontWeight="bold" fill="#0f172a">Prímtényező-fa</text>
      {edges.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nodes[a].x} y1={nodes[a].y + 12} x2={nodes[b].x} y2={nodes[b].y - 14} stroke="#64748b" strokeWidth="1.8" />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="18" fill={n.prime ? '#d1fae5' : '#ffffff'} stroke={n.prime ? '#059669' : '#334155'} strokeWidth={n.prime ? 2.5 : 1.5} />
          <text x={n.x} y={n.y + 5} fontSize="13" textAnchor="middle" fontWeight="bold" fill={n.prime ? '#065f46' : '#0f172a'}>{n.v}</text>
        </g>
      ))}
      <text x="280" y="280" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#065f46">
        630 = 2 · 3 · 3 · 5 · 7 = 2 · 3² · 5 · 7
      </text>
    </svg>
  );
};

// 3. ábra: osztólétra – 630 és 525 prímtényezős felbontása függőleges vonallal
export const DivisionLadderSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const ladders = [
    { x: 80, rows: [['630', '2'], ['315', '3'], ['105', '3'], ['35', '5'], ['7', '7'], ['1', '']], res: '630 = 2 · 3² · 5 · 7' },
    { x: 330, rows: [['525', '3'], ['175', '5'], ['35', '5'], ['7', '7'], ['1', '']], res: '525 = 3 · 5² · 7' }
  ];
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Osztólétra: mindig a legkisebb prímosztóval osztunk
      </text>
      {ladders.map((l) => (
        <g key={l.x}>
          <line x1={l.x + 70} y1="48" x2={l.x + 70} y2={52 + l.rows.length * 32} stroke="#059669" strokeWidth="2.5" />
          {l.rows.map(([n, p], i) => (
            <g key={i}>
              <text x={l.x + 60} y={72 + i * 32} fontSize="16" textAnchor="end" fontWeight="bold" fill="#0f172a">{n}</text>
              <text x={l.x + 82} y={72 + i * 32} fontSize="16" fontWeight="bold" fill="#059669">{p}</text>
            </g>
          ))}
          <text x={l.x + 70} y="268" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#065f46">{l.res}</text>
        </g>
      ))}
      <text x="280" y="140" fontSize="12" textAnchor="middle" fill="#475569">közös: 3 · 5 · 7</text>
      <text x="280" y="160" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">630 / 525 = 6 / 5</text>
    </svg>
  );
};

// 4. ábra: a pozitív egészek csoportosítása osztóik száma szerint (1–20)
export const DivisorCountBarsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const d = (n: number) => {
    let c = 0;
    for (let i = 1; i <= n; i++) if (n % i === 0) c++;
    return c;
  };
  const nums = Array.from({ length: 20 }, (_, i) => i + 1);
  const x0 = 50;
  const w = 24;
  const base = 220;
  const unit = 26;
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">Hány pozitív osztója van? (1–20)</text>
      {[1, 2, 3, 4, 5, 6].map((k) => (
        <g key={k}>
          <line x1={x0 - 6} y1={base - k * unit} x2={x0 + 20 * w} y2={base - k * unit} stroke="#e2e8f0" />
          <text x={x0 - 12} y={base - k * unit + 4} fontSize="10" textAnchor="end" fill="#64748b">{k}</text>
        </g>
      ))}
      <line x1={x0 - 6} y1={base} x2={x0 + 20 * w} y2={base} stroke="#334155" strokeWidth="1.5" />
      {nums.map((n, i) => {
        const c = d(n);
        const fill = c === 1 ? '#94a3b8' : c === 2 ? '#059669' : '#f59e0b';
        return (
          <g key={n}>
            <rect x={x0 + i * w + 3} y={base - c * unit} width={w - 6} height={c * unit} rx="3" fill={fill} />
            <text x={x0 + i * w + w / 2} y={base + 16} fontSize="10.5" textAnchor="middle" fontWeight="bold" fill="#0f172a">{n}</text>
          </g>
        );
      })}
      <rect x="70" y="252" width="12" height="12" fill="#94a3b8" />
      <text x="88" y="262" fontSize="11" fill="#334155">1: egyetlen osztó</text>
      <rect x="215" y="252" width="12" height="12" fill="#059669" />
      <text x="233" y="262" fontSize="11" fill="#334155">prím: pontosan 2</text>
      <rect x="360" y="252" width="12" height="12" fill="#f59e0b" />
      <text x="378" y="262" fontSize="11" fill="#334155">összetett: 2-nél több</text>
    </svg>
  );
};

// 5. ábra: a 211 prímteszt – elég √211 ≈ 14,5-ig próbálkozni
export const PrimeTestSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const primes = [2, 3, 5, 7, 11, 13, 17, 19];
  const rem = primes.map((p) => 211 % p);
  return (
    <svg viewBox="0 0 560 230" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="220" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">Prím-e a 211? Próbaosztások</text>
      {primes.map((p, i) => {
        const x = 40 + i * 62;
        const tested = p < 14.5;
        return (
          <g key={p}>
            <rect x={x} y="56" width="52" height="52" rx="10" fill={tested ? '#ecfdf5' : '#f1f5f9'} stroke={tested ? '#059669' : '#cbd5e1'} strokeWidth="2" strokeDasharray={tested ? undefined : '4 3'} />
            <text x={x + 26} y="88" fontSize="18" textAnchor="middle" fontWeight="bold" fill={tested ? '#065f46' : '#94a3b8'}>{p}</text>
            <text x={x + 26} y="128" fontSize="11" textAnchor="middle" fill={tested ? '#334155' : '#94a3b8'}>
              {tested ? `maradék ${rem[i]}` : 'felesleges'}
            </text>
          </g>
        );
      })}
      <line x1={40 + 6 * 62 - 5} y1="46" x2={40 + 6 * 62 - 5} y2="140" stroke="#dc2626" strokeWidth="2" strokeDasharray="5 4" />
      <text x={40 + 6 * 62 - 5} y="158" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#dc2626">√211 ≈ 14,5</text>
      <text x="280" y="190" fontSize="13" textAnchor="middle" fill="#0f172a">
        Ha lenne 14,5-nél nagyobb osztópár-tag, a párja 14,5-nél kisebb lenne.
      </text>
      <text x="280" y="210" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#065f46">
        Egyik sem osztója → a 211 prímszám.
      </text>
    </svg>
  );
};
