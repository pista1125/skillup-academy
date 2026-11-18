import React from 'react';

// ---------------------------------------------------------------------------
// Kis kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz
// ---------------------------------------------------------------------------

const FONT = 'system-ui, Segoe UI, sans-serif';

/**
 * Korongok áthúzással a kártyákon (total: 1..10, taken: 0..total).
 * Nem írja ki az eredményt!
 */
export const CrossedDiscsCard: React.FC<{
  total: number;
  taken: number;
  small?: boolean;
}> = ({ total, taken, small }) => {
  const W = small ? 80 : 150;
  const H = 80;
  const cols = total <= 5 ? total : Math.ceil(total / 2);
  const rows = total <= 5 ? 1 : 2;
  const r = small ? (cols <= 4 ? 6.5 : 5.5) : (cols <= 4 ? 11 : 9.5);
  const dx = small ? r * 2 + 3.5 : r * 2 + 5;
  const dy = small ? r * 2 + 6 : r * 2 + 7;
  const ox = (W - (cols - 1) * dx) / 2;
  const oy = (H - (rows - 1) * dy) / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width={W - 4} height={H - 4} rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2.5" />
      {Array.from({ length: total }, (_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const cx = ox + col * dx;
        const cy = oy + row * dy;
        const isTaken = i >= total - taken;
        return (
          <g key={i}>
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill={isTaken ? '#e2e8f0' : '#38bdf8'}
              stroke={isTaken ? '#64748b' : '#0369a1'}
              strokeWidth={small ? 2 : 2.6}
            />
            {isTaken && (
              <g stroke="#dc2626" strokeWidth={small ? 2.6 : 3.2} strokeLinecap="round">
                <line x1={cx - r * 0.65} y1={cy - r * 0.65} x2={cx + r * 0.65} y2={cy + r * 0.65} />
                <line x1={cx + r * 0.65} y1={cy - r * 0.65} x2={cx - r * 0.65} y2={cy + r * 0.65} />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/**
 * 2×5-ös tízeskeret kivonással: total kék korong, taken áthúzva.
 */
export const TenFrameSubCard: React.FC<{
  total: number;
  taken: number;
  small?: boolean;
}> = ({ total, taken, small }) => {
  const W = small ? 80 : 150;
  const H = 80;
  const cell = small ? 13 : 24;
  const x0 = (W - 5 * cell) / 2;
  const y0 = (H - 2 * cell) / 2;
  const r = small ? 4.4 : 8.2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width={W - 4} height={H - 4} rx="8" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="2.5" />
      <rect x={x0} y={y0} width={5 * cell} height={2 * cell} fill="#ffffff" stroke="#0f172a" strokeWidth={small ? 2.2 : 3} />
      {[1, 2, 3, 4].map((c) => (
        <line
          key={`vc${c}`}
          x1={x0 + c * cell}
          y1={y0}
          x2={x0 + c * cell}
          y2={y0 + 2 * cell}
          stroke="#94a3b8"
          strokeWidth={small ? 1.2 : 1.8}
        />
      ))}
      <line x1={x0} y1={y0 + cell} x2={x0 + 5 * cell} y2={y0 + cell} stroke="#94a3b8" strokeWidth={small ? 1.2 : 1.8} />
      {Array.from({ length: total }, (_, i) => {
        const c = i % 5;
        const row = Math.floor(i / 5);
        const cx = x0 + c * cell + cell / 2;
        const cy = y0 + row * cell + cell / 2;
        const isTaken = i >= total - taken;
        return (
          <g key={i}>
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill={isTaken ? '#e2e8f0' : '#2563eb'}
              stroke={isTaken ? '#64748b' : '#1e3a8a'}
              strokeWidth={small ? 1.5 : 2}
            />
            {isTaken && (
              <g stroke="#dc2626" strokeWidth={small ? 2.2 : 3} strokeLinecap="round">
                <line x1={cx - r * 0.7} y1={cy - r * 0.7} x2={cx + r * 0.7} y2={cy + r * 0.7} />
                <line x1={cx + r * 0.7} y1={cy - r * 0.7} x2={cx - r * 0.7} y2={cy + r * 0.7} />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/**
 * Mini kivonókerék-szelet kártya: [center] −sub → ?
 * Nagy számjegyek (>= 22), vastag vonalak (>= 3).
 */
export const WheelStepCard: React.FC<{
  center: number;
  sub: number;
  small?: boolean;
}> = ({ center, sub, small }) => {
  if (small) {
    return (
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
        <rect x="2" y="2" width="76" height="76" rx="10" fill="#fefce8" stroke="#f59e0b" strokeWidth="3" />
        <text x="40" y="34" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#0f172a">
          {center}
        </text>
        <text x="40" y="64" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#be123c">
          −{sub}
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="2" y="2" width="146" height="76" rx="10" fill="#fefce8" stroke="#f59e0b" strokeWidth="3" />
      <rect x="10" y="18" width="42" height="44" rx="8" fill="#facc15" stroke="#854d0e" strokeWidth="3" />
      <text x="31" y="48" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#0f172a">
        {center}
      </text>
      <line x1="56" y1="44" x2="98" y2="44" stroke="#334155" strokeWidth="3" />
      <path d="M 94 37 L 103 44 L 94 51" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="77" y="33" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#be123c">
        −{sub}
      </text>
      <circle cx="124" cy="40" r="18" fill="#fee2e2" stroke="#dc2626" strokeWidth="3" />
      <text x="124" y="48" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#dc2626">
        ?
      </text>
    </svg>
  );
};
