import React from 'react';

/** Az összes sorrend (a tankönyv elágazásos rajzának sorrendjében). */
export const permutations = <T,>(a: T[]): T[][] =>
  a.length <= 1 ? [a] : a.flatMap((x, i) => permutations([...a.slice(0, i), ...a.slice(i + 1)]).map((p) => [x, ...p]));

/** Párok listája rendszerezve (AB = BA, tehát mindegyik csak egyszer). */
export const pairsOf = <T,>(a: T[]): [T, T][] => a.flatMap((x, i) => a.slice(i + 1).map((y) => [x, y] as [T, T]));

/** Kiválasztás: k különböző elem, a sorrend nem számít. */
export const choose = <T,>(a: T[], k: number): T[][] =>
  k === 0 ? [[]] : a.flatMap((x, i) => choose(a.slice(i + 1), k - 1).map((r) => [x, ...r]));

// ---------------------------------------------------------------------------
// Elágazásos rajz: TK 25/11. a) – Dániel fut be elsőnek
// ---------------------------------------------------------------------------
export const RunnersTreeSvg: React.FC<{ className?: string; hideLeaves?: boolean }> = ({ className = 'w-full h-auto', hideLeaves }) => {
  const second = ['A', 'B', 'Cs'];
  const rest = (s: string) => second.filter((x) => x !== s);
  const xs = [40, 120, 210, 300];
  const heads = ['1. helyezett', '2. helyezett', '3. helyezett', '4. helyezett'];
  return (
    <svg viewBox="0 0 340 230" className={className} fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="336" height="226" rx="12" fill="#ffedd5" />
      {heads.map((h, i) => (
        <g key={h}>
          <rect x={xs[i] - 36} y="8" width="72" height="20" rx="6" fill="#fef3c7" />
          <text x={xs[i]} y="22" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#92400e">
            {h}
          </text>
        </g>
      ))}
      <text x={xs[0]} y="128" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#1e293b">
        D
      </text>
      {second.map((s, i) => {
        const y2 = 64 + i * 64;
        return (
          <g key={s}>
            <line x1={xs[0] + 10} y1="124" x2={xs[1] - 14} y2={y2 - 4} stroke="#475569" strokeWidth="1.5" />
            <text x={xs[1]} y={y2} fontSize="14" fontWeight="bold" textAnchor="middle" fill="#1e293b">
              {s}
            </text>
            {rest(s).map((t, j) => {
              const y3 = y2 - 14 + j * 28;
              const last = rest(s).filter((x) => x !== t)[0];
              return (
                <g key={t}>
                  <line x1={xs[1] + 12} y1={y2 - 4} x2={xs[2] - 14} y2={y3 - 4} stroke="#475569" strokeWidth="1.3" />
                  <text x={xs[2]} y={y3} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#1e293b">
                    {t}
                  </text>
                  <line x1={xs[2] + 14} y1={y3 - 4} x2={xs[3] - 16} y2={y3 - 4} stroke="#475569" strokeWidth="1.3" markerEnd="url(#rt-arrow)" />
                  <text x={xs[3]} y={y3} fontSize="13" fontWeight="bold" textAnchor="middle" fill={hideLeaves ? '#dc2626' : '#1e293b'}>
                    {hideLeaves ? '?' : last}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
      <defs>
        <marker id="rt-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
        </marker>
      </defs>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Dobogó: TK 86/3. – Anna, Bianka, Cecília
// ---------------------------------------------------------------------------
export const PodiumSvg: React.FC<{ className?: string; names?: [string, string, string] }> = ({ className = 'w-full h-auto', names = ['?', '?', '?'] }) => (
  <svg viewBox="0 0 300 170" className={className} fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="296" height="166" rx="12" fill="#eff6ff" />
    {[
      { x: 110, h: 90, n: '1.', name: names[0], c: '#facc15' },
      { x: 30, h: 64, n: '2.', name: names[1], c: '#cbd5e1' },
      { x: 190, h: 44, n: '3.', name: names[2], c: '#fdba74' }
    ].map((s) => (
      <g key={s.n}>
        <rect x={s.x} y={160 - s.h} width="80" height={s.h} fill={s.c} stroke="#475569" strokeWidth="1.5" />
        <text x={s.x + 40} y={160 - s.h / 2 + 8} fontSize="22" fontWeight="bold" textAnchor="middle" fill="#334155">
          {s.n}
        </text>
        <circle cx={s.x + 40} cy={160 - s.h - 30} r="16" fill="#ffffff" stroke="#475569" strokeWidth="1.5" />
        <text
          x={s.x + 40}
          y={160 - s.h - 25}
          fontSize={s.name.length > 2 ? 10 : 15}
          fontWeight="bold"
          textAnchor="middle"
          fill={s.name === '?' ? '#dc2626' : '#1e293b'}
        >
          {s.name}
        </text>
      </g>
    ))}
  </svg>
);

// ---------------------------------------------------------------------------
// Párosítás: MF I – az A, B, C, D, E tavak párjai (AB = BA)
// ---------------------------------------------------------------------------
export const PairsSvg: React.FC<{ className?: string; labels?: string[]; showLines?: boolean }> = ({
  className = 'w-full h-auto',
  labels = ['A', 'B', 'C', 'D', 'E'],
  showLines = true
}) => {
  const n = labels.length;
  const pts = labels.map((_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return [100 + 70 * Math.cos(a), 100 + 70 * Math.sin(a)];
  });
  const colors = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'];
  return (
    <svg viewBox="0 0 340 200" className={className} fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="336" height="196" rx="12" fill="#f0f9ff" />
      {showLines &&
        pairsOf(pts.map((_, i) => i)).map(([i, j]) => (
          <line key={`${i}${j}`} x1={pts[i][0]} y1={pts[i][1]} x2={pts[j][0]} y2={pts[j][1]} stroke={colors[i]} strokeWidth="2" strokeOpacity="0.75" />
        ))}
      {pts.map(([x, y], i) => (
        <g key={labels[i]}>
          <ellipse cx={x} cy={y} rx="17" ry="13" fill="#7dd3fc" stroke="#0369a1" strokeWidth="1.5" />
          <text x={x} y={y + 5} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
            {labels[i]}
          </text>
        </g>
      ))}
      {showLines &&
        labels.slice(0, -1).map((l, i) => (
          <text key={l} x="200" y={34 + i * 26} fontSize="12.5" fontWeight="bold" fill={colors[i]}>
            {labels
              .slice(i + 1)
              .map((m) => l + m)
              .join('  ')}
          </text>
        ))}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Szalvéták: MF I – 5 színből 3 különböző
// ---------------------------------------------------------------------------
export const NAPKINS: { k: string; name: string; fill: string }[] = [
  { k: 'S', name: 'sárga', fill: '#facc15' },
  { k: 'P', name: 'piros', fill: '#ef4444' },
  { k: 'K', name: 'kék', fill: '#3b82f6' },
  { k: 'Z', name: 'zöld', fill: '#22c55e' },
  { k: 'F', name: 'fehér', fill: '#ffffff' }
];

export const NapkinsSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 320 110" className={className} fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="316" height="106" rx="12" fill="#f8fafc" stroke="#e2e8f0" />
    {NAPKINS.map((n, i) => (
      <g key={n.k}>
        <rect x={18 + i * 60} y="18" width="44" height="44" rx="4" fill={n.fill} stroke="#475569" strokeWidth="1.5" transform={`rotate(${i % 2 ? 4 : -4} ${40 + i * 60} 40)`} />
        <text x={40 + i * 60} y="46" fontSize="16" fontWeight="bold" textAnchor="middle" fill={n.k === 'F' || n.k === 'S' ? '#334155' : '#ffffff'}>
          {n.k}
        </text>
        <text x={40 + i * 60} y="86" fontSize="11" textAnchor="middle" fill="#334155">
          {n.name}
        </text>
      </g>
    ))}
  </svg>
);

// ---------------------------------------------------------------------------
// Számkártyák
// ---------------------------------------------------------------------------
export const NumberCardsSvg: React.FC<{ className?: string; digits?: string[] }> = ({ className = 'w-full h-auto', digits = ['1', '2', '3'] }) => (
  <svg viewBox={`0 0 ${digits.length * 64 + 16} 90`} className={className} fontFamily="system-ui, sans-serif">
    {digits.map((d, i) => (
      <g key={d + i}>
        <rect x={12 + i * 64} y="8" width="52" height="72" rx="8" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
        <text x={38 + i * 64} y="56" fontSize="32" fontWeight="bold" textAnchor="middle" fill="#9a3412">
          {d}
        </text>
      </g>
    ))}
  </svg>
);

// ---------------------------------------------------------------------------
// Szorzás ágrajzzal: 2 szín · 3 alak
// ---------------------------------------------------------------------------
export const BranchProductSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const colors = [
    { n: 'piros', c: '#ef4444' },
    { n: 'kék', c: '#3b82f6' }
  ];
  const shapes = ['kör', 'háromszög', 'négyzet'];
  const shapeEl = (s: string, x: number, y: number, c: string) =>
    s === 'kör' ? (
      <circle cx={x} cy={y} r="8" fill={c} stroke="#334155" />
    ) : s === 'háromszög' ? (
      <polygon points={`${x},${y - 9} ${x + 9},${y + 7} ${x - 9},${y + 7}`} fill={c} stroke="#334155" />
    ) : (
      <rect x={x - 8} y={y - 8} width="16" height="16" fill={c} stroke="#334155" />
    );
  return (
    <svg viewBox="0 0 340 210" className={className} fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="336" height="206" rx="12" fill="#f5f3ff" />
      <text x="34" y="110" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#4c1d95">
        lapok
      </text>
      {colors.map((col, i) => {
        const y1 = 56 + i * 100;
        return (
          <g key={col.n}>
            <line x1="56" y1="106" x2="104" y2={y1} stroke="#7c3aed" strokeWidth="2" />
            <rect x="104" y={y1 - 11} width="50" height="22" rx="8" fill={col.c} />
            <text x="129" y={y1 + 4} fontSize="11" fontWeight="bold" textAnchor="middle" fill="#fff">
              {col.n}
            </text>
            {shapes.map((s, j) => {
              const y2 = y1 - 30 + j * 30;
              return (
                <g key={s}>
                  <line x1="154" y1={y1} x2="196" y2={y2} stroke="#7c3aed" strokeWidth="1.5" />
                  <text x="200" y={y2 + 4} fontSize="11" fill="#334155">
                    {s}
                  </text>
                  {shapeEl(s, 300, y2, col.c)}
                </g>
              );
            })}
          </g>
        );
      })}
      <text x="40" y="196" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#4c1d95">
        2 · 3 = 6
      </text>
    </svg>
  );
};
