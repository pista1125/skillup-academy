import React from 'react';

// ---------------------------------------------------------------------------
// Adatok
// ---------------------------------------------------------------------------
/** A TK 131. oldali kép állatai (a 132/1. b) feladat állításaihoz). */
export const GLOBE_ANIMALS: { e: string; n: string; kind: 'emlős' | 'madár' | 'hüllő' | 'kétéltű'; repul?: boolean }[] = [
  { e: '🐻‍❄️', n: 'jegesmedve', kind: 'emlős' },
  { e: '🐻', n: 'barnamedve', kind: 'emlős' },
  { e: '🐼', n: 'panda', kind: 'emlős' },
  { e: '🐺', n: 'farkas', kind: 'emlős' },
  { e: '🐈', n: 'hiúz', kind: 'emlős' },
  { e: '🐅', n: 'tigris', kind: 'emlős' },
  { e: '🦦', n: 'vidra', kind: 'emlős' },
  { e: '🦉', n: 'hóbagoly', kind: 'madár', repul: true },
  { e: '🦅', n: 'rétisas', kind: 'madár', repul: true },
  { e: '🐧', n: 'pingvin', kind: 'madár', repul: false },
  { e: '🦢', n: 'kócsag', kind: 'madár', repul: true },
  { e: '🐦', n: 'szürke gém', kind: 'madár', repul: true },
  { e: '🐢', n: 'teknős', kind: 'hüllő' },
  { e: '🦎', n: 'szalamandra', kind: 'kétéltű' }
];

/** TK 132/3. a) – a három halmaz. */
export const TK_SETS: Record<'A' | 'B' | 'C', number[]> = {
  A: [1246, 54, 600, 8002, 9998],
  B: [475, 33, 6606, 48, 9579],
  C: [1005, 8889, 77, 1001, 423]
};

/** MF II/51/10. – a halmaz számai. */
export const MF_SET = [3063, 4016, 7000, 6624, 8808, 9705, 5939];

// ---------------------------------------------------------------------------
// Ábrák
// ---------------------------------------------------------------------------
export const AnimalsGlobeSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 340 250" className={className} fontFamily="system-ui, sans-serif">
    <defs>
      <radialGradient id="tf-globe" cx="40%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#7dd3fc" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </radialGradient>
    </defs>
    <rect x="2" y="2" width="336" height="246" rx="14" fill="#e0f2fe" />
    <circle cx="170" cy="125" r="112" fill="url(#tf-globe)" />
    <path d="M 120 60 Q 150 40 180 70 Q 200 100 170 120 Q 140 140 150 180 Q 120 170 110 130 Q 95 95 120 60 Z" fill="#86efac" opacity="0.8" />
    <path d="M 210 90 Q 245 80 255 120 Q 250 160 220 170 Q 200 140 210 90 Z" fill="#86efac" opacity="0.8" />
    {GLOBE_ANIMALS.map((a, i) => {
      const cols = 4;
      const x = 62 + (i % cols) * 72;
      const y = 40 + Math.floor(i / cols) * 54;
      return (
        <g key={a.n}>
          <text x={x} y={y + 6} fontSize="24" textAnchor="middle">
            {a.e}
          </text>
          <rect x={x - 32} y={y + 12} width="64" height="14" rx="7" fill="#ffffff" fillOpacity="0.9" />
          <text x={x} y={y + 22} fontSize="9" fontWeight="bold" textAnchor="middle" fill="#0f172a">
            {a.n}
          </text>
        </g>
      );
    })}
  </svg>
);

/** TK 132/3. a): A, B, C halmaz. */
export const ThreeSetsSvg: React.FC<{ className?: string; only?: ('A' | 'B' | 'C')[] }> = ({ className = 'w-full h-auto', only }) => {
  const style: Record<'A' | 'B' | 'C', { fill: string }> = {
    A: { fill: '#facc15' },
    B: { fill: '#f472b6' },
    C: { fill: '#fb923c' }
  };
  const keys = (only ?? (['A', 'B', 'C'] as const)) as ('A' | 'B' | 'C')[];
  return (
    <svg viewBox="0 0 340 120" className={className} fontFamily="system-ui, sans-serif">
      {keys.map((k, idx) => {
        const { fill } = style[k];
        const x = (340 - keys.length * 112) / 2 + 4 + idx * 112;
        const nums = TK_SETS[k];
        return (
          <g key={k}>
            {k === 'A' ? (
              <ellipse cx={x + 50} cy="64" rx="50" ry="46" fill={fill} />
            ) : (
              <rect x={x} y="18" width="100" height="92" rx={k === 'C' ? 16 : 0} fill={fill} />
            )}
            <rect x={x + 42} y="8" width="16" height="16" fill="#ffffffcc" />
            <text x={x + 50} y="21" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#334155">
              {k}
            </text>
            {nums.map((n, i) => (
              <text
                key={n}
                x={x + [26, 74, 50, 26, 74][i]}
                y={[44, 44, 66, 90, 90][i]}
                fontSize="12"
                fontWeight="bold"
                textAnchor="middle"
                fill="#1e293b"
              >
                {n}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
};

/** MF II/51/10.: a halmaz számai keretben. */
export const MfSetSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 200 150" className={className} fontFamily="system-ui, sans-serif">
    <rect x="6" y="6" width="188" height="138" rx="6" fill="#fefce8" stroke="#a16207" strokeWidth="2" />
    {MF_SET.map((n, i) => (
      <text key={n} x={i % 2 ? 136 : 60} y={30 + i * 16.5} fontSize="14" fontWeight="bold" textAnchor="middle" fill="#1e293b">
        {n}
      </text>
    ))}
  </svg>
);

/** Mindegyik – van olyan – egyik sem: három doboz pöttyökkel. */
export const QuantifierBoxesSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const boxes = [
    { t: 'Mindegyik piros', dots: [1, 1, 1, 1, 1, 1], c: '#16a34a' },
    { t: 'Van olyan, amelyik piros', dots: [0, 1, 0, 0, 1, 0], c: '#2563eb' },
    { t: 'Egyik sem piros', dots: [0, 0, 0, 0, 0, 0], c: '#9333ea' }
  ];
  return (
    <svg viewBox="0 0 340 130" className={className} fontFamily="system-ui, sans-serif">
      {boxes.map((b, k) => (
        <g key={b.t}>
          <rect x={6 + k * 112} y="8" width="104" height="90" rx="12" fill="#fff" stroke={b.c} strokeWidth="2.2" />
          {b.dots.map((d, i) => (
            <circle key={i} cx={30 + k * 112 + (i % 3) * 28} cy={36 + Math.floor(i / 3) * 32} r="10" fill={d ? '#ef4444' : '#cbd5e1'} stroke="#475569" />
          ))}
          <text x={58 + k * 112} y="116" fontSize="9.5" fontWeight="bold" textAnchor="middle" fill={b.c}>
            {b.t}
          </text>
        </g>
      ))}
    </svg>
  );
};

/** Ellenpélda: egyetlen kivétel elég, hogy a „mindegyik” állítás hamis legyen. */
export const CounterexampleSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const nums = [475, 33, 6606, 48, 9579];
  return (
    <svg viewBox="0 0 340 120" className={className} fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="336" height="116" rx="12" fill="#fff1f2" />
      <text x="170" y="22" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#9f1239">
        „Mindegyik eleme páratlan.” – a B halmazra igaz?
      </text>
      {nums.map((n, i) => {
        const odd = n % 2 === 1;
        const x = 40 + i * 65;
        return (
          <g key={n}>
            <rect x={x - 28} y="38" width="56" height="34" rx="8" fill={odd ? '#dcfce7' : '#fee2e2'} stroke={odd ? '#16a34a' : '#dc2626'} strokeWidth={odd ? 1.5 : 3} />
            <text x={x} y="60" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#1e293b">
              {n}
            </text>
            <text x={x} y="90" fontSize="16" textAnchor="middle">
              {odd ? '✔' : '✘'}
            </text>
          </g>
        );
      })}
      <text x="170" y="111" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#9f1239">
        A 6606 és a 48 páros → ellenpélda → az állítás HAMIS.
      </text>
    </svg>
  );
};
