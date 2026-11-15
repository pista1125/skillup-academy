import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

type Pt = { x: number; y: number };

const ring = (n: number, cx: number, cy: number, r: number): Pt[] =>
  Array.from({ length: n }, (_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });

const Dot: React.FC<{ p: Pt; color?: string; r?: number }> = ({ p, color = '#2563eb', r = 7 }) => (
  <circle cx={p.x} cy={p.y} r={r} fill={color} stroke="#ffffff" strokeWidth="2" />
);

// 1. ábra: Kidolgozott feladat – 8 versenyző, 23 lejátszott és 5 hátralévő mérkőzés
export const TableTennisGraphSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const P = ring(8, 200, 150, 110);
  const deg = [7, 7, 6, 6, 5, 5, 5, 5];
  // hátralévő mérkőzések (a komplementer gráf élei)
  const remaining = new Set(['2-4', '3-5', '4-6', '5-7', '6-7']);
  const played: [number, number][] = [];
  const rest: [number, number][] = [];
  for (let i = 0; i < 8; i++)
    for (let j = i + 1; j < 8; j++) (remaining.has(`${i}-${j}`) ? rest : played).push([i, j]);
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
      {played.map(([a, b]) => (
        <line key={`p-${a}-${b}`} x1={P[a].x} y1={P[a].y} x2={P[b].x} y2={P[b].y} stroke="#64748b" strokeWidth="1.4" opacity="0.8" />
      ))}
      {rest.map(([a, b]) => (
        <line key={`r-${a}-${b}`} x1={P[a].x} y1={P[a].y} x2={P[b].x} y2={P[b].y} stroke="#dc2626" strokeWidth="2.5" strokeDasharray="6 4" />
      ))}
      {P.map((p, i) => {
        const dx = p.x - 200;
        const dy = p.y - 150;
        const l = Math.hypot(dx, dy) || 1;
        return (
          <g key={i}>
            <Dot p={p} />
            <text x={p.x + (22 * dx) / l} y={p.y + (22 * dy) / l + 4} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#1e3a8a">
              {deg[i]}
            </text>
          </g>
        );
      })}
      <rect x="340" y="40" width="205" height="215" rx="10" fill="#ffffff" stroke="#93c5fd" />
      <text x="442" y="62" fontSize="12.5" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">
        A csúcsok mellett: fokszám
      </text>
      <text x="352" y="88" fontSize="12" fill="#334155">2 · 7 + 2 · 6 + 4 · 5 = 46</text>
      <text x="352" y="108" fontSize="12" fill="#334155">lejátszott: 46 / 2 = 23</text>
      <text x="352" y="128" fontSize="12" fill="#334155">összes: C(8; 2) = 28</text>
      <text x="352" y="148" fontSize="12" fontWeight="bold" fill="#b91c1c">hátralévő: 28 − 23 = 5</text>
      <line x1="352" y1="180" x2="382" y2="180" stroke="#64748b" strokeWidth="1.6" />
      <text x="390" y="184" fontSize="11.5" fill="#334155">lejátszott mérkőzés</text>
      <line x1="352" y1="205" x2="382" y2="205" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="6 4" />
      <text x="390" y="209" fontSize="11.5" fill="#334155">hátralévő mérkőzés</text>
      <text x="442" y="240" fontSize="11" textAnchor="middle" fill="#64748b">(egy lehetséges állás)</text>
    </svg>
  );
};

// 2. ábra: Teljes gráfok 3–6 csúccsal
export const CompleteGraphsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const ns = [3, 4, 5, 6];
  return (
    <svg viewBox="0 0 560 220" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="210" rx="16" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Teljes gráfok: bármely két csúcs között pontosan egy él
      </text>
      {ns.map((n, k) => {
        const cx = 75 + k * 137;
        const P = ring(n, cx, 112, 48);
        const lines: React.ReactNode[] = [];
        for (let i = 0; i < n; i++)
          for (let j = i + 1; j < n; j++)
            lines.push(<line key={`${i}-${j}`} x1={P[i].x} y1={P[i].y} x2={P[j].x} y2={P[j].y} stroke="#7c3aed" strokeWidth="1.8" />);
        return (
          <g key={n}>
            {lines}
            {P.map((p, i) => (
              <Dot key={i} p={p} color="#6d28d9" r={5.5} />
            ))}
            <text x={cx} y={185} fontSize="12.5" textAnchor="middle" fontWeight="bold" fill="#4c1d95">
              {n} csúcs: {(n * (n - 1)) / 2} él
            </text>
            <text x={cx} y={203} fontSize="11" textAnchor="middle" fill="#6b21a8">
              {n} · {n - 1} / 2
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// 3. ábra: Feladat 1 – a konferencia öt résztvevőjének ismeretségi gráfja
export const ConferenceGraphSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const V: Record<string, Pt> = {
    A: { x: 200, y: 60 },
    B: { x: 320, y: 140 },
    C: { x: 270, y: 245 },
    D: { x: 130, y: 245 },
    E: { x: 80, y: 140 }
  };
  const deg: Record<string, number> = { A: 4, B: 3, C: 2, D: 3, E: 2 };
  const E: [string, string][] = [
    ['A', 'B'],
    ['A', 'C'],
    ['A', 'D'],
    ['A', 'E'],
    ['B', 'C'],
    ['B', 'D'],
    ['D', 'E']
  ];
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="280" rx="16" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.5" />
      {E.map(([a, b]) => (
        <line
          key={a + b}
          x1={V[a].x}
          y1={V[a].y}
          x2={V[b].x}
          y2={V[b].y}
          stroke={a === 'D' && b === 'E' ? '#dc2626' : '#15803d'}
          strokeWidth={a === 'D' && b === 'E' ? 3.5 : 2.5}
        />
      ))}
      {Object.entries(V).map(([k, p]) => (
        <g key={k}>
          <Dot p={p} color="#16a34a" r={9} />
          <text x={p.x + (p.x < 200 ? -20 : 20)} y={p.y + (p.y < 100 ? -8 : 5)} fontSize="14" fontWeight="bold" textAnchor="middle" fill="#14532d">
            {k}
          </text>
          <text x={p.x + (p.x < 200 ? -20 : 20)} y={p.y + (p.y < 100 ? 10 : 22)} fontSize="11" textAnchor="middle" fill="#92400e">
            ({deg[k]})
          </text>
        </g>
      ))}
      <rect x="370" y="40" width="175" height="210" rx="10" fill="#ffffff" stroke="#86efac" />
      <text x="457" y="62" fontSize="12.5" textAnchor="middle" fontWeight="bold" fill="#14532d">
        Lépésről lépésre
      </text>
      {['A: mindenkit ismer (4)', 'B: E kivételével (3)', 'C: csak A-t és B-t (2)', 'D: A, B és még egy:', '    C „betelt” ⇒ E (3)', 'E ismerősei: A és D', 'összeg 14 = 2 · 7 él'].map((t, i) => (
        <text key={i} x="380" y={88 + i * 22} fontSize="11.5" fill={i === 5 ? '#b91c1c' : '#334155'} fontWeight={i === 5 ? 'bold' : 'normal'}>
          {t}
        </text>
      ))}
    </svg>
  );
};

// 4. ábra: Csúcsokat vagy éleket választunk? – 5 település, 6 út
export const VertexOrEdgeChoiceSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const P = ring(5, 0, 0, 62);
  const roads: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 0],
    [0, 2]
  ];
  const panel = (ox: number, mode: 'v' | 'e') => (
    <g transform={`translate(${ox}, 140)`}>
      {roads.map(([a, b], i) => {
        const hi = mode === 'e' && (i === 1 || i === 4);
        return (
          <line
            key={i}
            x1={P[a].x}
            y1={P[a].y}
            x2={P[b].x}
            y2={P[b].y}
            stroke={hi ? '#ea580c' : '#94a3b8'}
            strokeWidth={hi ? 5 : 2.5}
          />
        );
      })}
      {P.map((p, i) => {
        const hi = mode === 'v' && (i === 1 || i === 3);
        return <Dot key={i} p={p} color={hi ? '#ea580c' : '#475569'} r={hi ? 10 : 7} />;
      })}
    </g>
  );
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="280" rx="16" fill="#fff7ed" stroke="#fed7aa" strokeWidth="1.5" />
      <text x="140" y="34" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        2 települést választunk
      </text>
      <text x="420" y="34" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        2 utat választunk
      </text>
      <line x1="280" y1="50" x2="280" y2="250" stroke="#fdba74" strokeDasharray="4 4" />
      {panel(140, 'v')}
      {panel(420, 'e')}
      <text x="140" y="245" fontSize="12.5" textAnchor="middle" fill="#9a3412">
        az 5 csúcs közül: C(5; 2) = 10
      </text>
      <text x="420" y="245" fontSize="12.5" textAnchor="middle" fill="#9a3412">
        a 6 él közül: C(6; 2) = 15
      </text>
      <text x="280" y="272" fontSize="11.5" textAnchor="middle" fill="#7c2d12">
        Mindig figyeld meg: a csúcsokra vagy az élekre vonatkozik a kérdés?
      </text>
    </svg>
  );
};

// 5. ábra: HF 1 – a közösségi oldal hat felhasználója
export const SocialNetworkSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const names = ['Anna', 'Bence', 'Cili', 'Dénes', 'Edit', 'Feri'];
  const P = ring(6, 180, 150, 100);
  const E: [number, number][] = [
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [2, 5],
    [1, 4]
  ];
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#fdf2f8" stroke="#fbcfe8" strokeWidth="1.5" />
      {E.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={P[a].x} y1={P[a].y} x2={P[b].x} y2={P[b].y} stroke="#be185d" strokeWidth="3" />
      ))}
      {P.map((p, i) => {
        const dx = p.x - 180;
        const dy = p.y - 150;
        const l = Math.hypot(dx, dy) || 1;
        return (
          <g key={i}>
            <Dot p={p} color="#db2777" r={9} />
            <text x={p.x + (30 * dx) / l} y={p.y + (24 * dy) / l + 4} fontSize="12.5" fontWeight="bold" textAnchor="middle" fill="#831843">
              {names[i]}
            </text>
          </g>
        );
      })}
      <rect x="345" y="45" width="200" height="190" rx="10" fill="#ffffff" stroke="#f9a8d4" />
      <text x="445" y="68" fontSize="12.5" textAnchor="middle" fontWeight="bold" fill="#831843">
        Ismeretségek: 6 él
      </text>
      {['összes pár: C(6; 2) = 15', 'nem ismerősök: 15 − 6 = 9', 'ismerős párost választunk:', '6-féleképpen'].map((t, i) => (
        <text key={i} x="358" y={98 + i * 24} fontSize="12" fill="#334155" fontWeight={i === 1 || i === 3 ? 'bold' : 'normal'}>
          {t}
        </text>
      ))}
    </svg>
  );
};
