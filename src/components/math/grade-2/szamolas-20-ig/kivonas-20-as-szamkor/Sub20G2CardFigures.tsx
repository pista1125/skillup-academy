import React from 'react';
import { SUB20_FONT } from './Sub20G2Parts';

// ---------------------------------------------------------------------------
// Kis kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz
// ---------------------------------------------------------------------------

/**
 * 2 × 10-es korongrács kivonással: `total` korongból `taken` át van húzva.
 * Nem írja ki az eredményt!
 */
export const FrameSubCard: React.FC<{ total: number; taken: number; small?: boolean }> = ({
  total,
  taken,
  small
}) => {
  const W = small ? 80 : 150;
  const H = 80;
  const remaining = Math.max(0, total - taken);

  if (small) {
    // 4 rows of 5 discs inside 80x80 for crisp legibility
    const stepX = 13.5;
    const stepY = 16;
    const x0 = 13;
    const y0 = 16;
    return (
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="76" height="76" rx="8" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
        <line x1="6" y1="40" x2="74" y2="40" stroke="#16a34a" strokeWidth="2.5" strokeDasharray="3 2" />
        {Array.from({ length: total }, (_, i) => {
          const r = Math.floor(i / 5);
          const c = i % 5;
          const cx = x0 + c * stepX;
          const cy = y0 + r * stepY;
          const isTaken = i >= remaining;
          return (
            <g key={i}>
              <circle
                cx={cx}
                cy={cy}
                r="5.2"
                fill={isTaken ? '#e2e8f0' : i < 10 ? '#0284c7' : '#f59e0b'}
                stroke={isTaken ? '#64748b' : i < 10 ? '#0c4a6e' : '#92400e'}
                strokeWidth="1.8"
              />
              {isTaken && (
                <g stroke="#dc2626" strokeWidth="2.4" strokeLinecap="round">
                  <line x1={cx - 4} y1={cy - 4} x2={cx + 4} y2={cy + 4} />
                  <line x1={cx + 4} y1={cy - 4} x2={cx - 4} y2={cy + 4} />
                </g>
              )}
            </g>
          );
        })}
      </svg>
    );
  }

  const stepX = 13;
  const x0 = 9;
  const rowY = [25, 55];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="144" height="68" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
      <line x1="8" y1="40" x2="142" y2="40" stroke="#16a34a" strokeWidth="2.5" strokeDasharray="4 3" />
      <line x1={x0 + 5 * stepX} y1="10" x2={x0 + 5 * stepX} y2="70" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />
      {Array.from({ length: 20 }, (_, i) => {
        const r = Math.floor(i / 10);
        const c = i % 10;
        const cx = x0 + c * stepX + 6 + (c >= 5 ? 3 : 0);
        const cy = rowY[r];
        const present = i < total;
        const isTaken = present && i >= remaining;
        return (
          <g key={i}>
            <circle
              cx={cx}
              cy={cy}
              r="5.2"
              fill={
                !present
                  ? '#f1f5f9'
                  : isTaken
                  ? '#e2e8f0'
                  : i < 10
                  ? '#0284c7'
                  : '#f59e0b'
              }
              stroke={
                !present
                  ? '#cbd5e1'
                  : isTaken
                  ? '#64748b'
                  : i < 10
                  ? '#0c4a6e'
                  : '#92400e'
              }
              strokeWidth="1.6"
            />
            {isTaken && (
              <g stroke="#dc2626" strokeWidth="2.4" strokeLinecap="round">
                <line x1={cx - 4} y1={cy - 4} x2={cx + 4} y2={cy + 4} />
                <line x1={cx + 4} y1={cy - 4} x2={cx - 4} y2={cy + 4} />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/**
 * Visszaugrás a számegyenesen: ? <- (-sub) <- start
 */
export const BackwardJumpCard: React.FC<{ start: number; sub: number; small?: boolean }> = ({
  start,
  sub,
  small
}) => {
  if (small) {
    return (
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={SUB20_FONT}>
        <rect x="2" y="2" width="76" height="76" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
        <line x1="6" y1="54" x2="74" y2="54" stroke="#334155" strokeWidth="3" />
        <path d="M 60 50 Q 40 16 18 46" fill="none" stroke="#dc2626" strokeWidth="3.5" />
        <path d="M 16 38 L 17 48 L 26 45" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="40" y="25" textAnchor="middle" fontSize="22" fontWeight="900" fill="#dc2626">
          −{sub}
        </text>
        <text x="19" y="74" textAnchor="middle" fontSize="22" fontWeight="900" fill="#dc2626">
          ?
        </text>
        <text x="60" y="74" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0f172a">
          {start}
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={SUB20_FONT}>
      <rect x="2" y="2" width="146" height="76" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
      <line x1="10" y1="50" x2="140" y2="50" stroke="#334155" strokeWidth="3" />
      <circle cx="32" cy="50" r="4.5" fill="#dc2626" />
      <circle cx="118" cy="50" r="4.5" fill="#0f172a" />
      <path d="M 118 44 Q 75 6 35 42" fill="none" stroke="#dc2626" strokeWidth="3.5" />
      <path d="M 34 33 L 33 43 L 43 41" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="75" y="23" textAnchor="middle" fontSize="24" fontWeight="900" fill="#dc2626">
        −{sub}
      </text>
      <text x="32" y="71" textAnchor="middle" fontSize="22" fontWeight="900" fill="#dc2626">
        ?
      </text>
      <text x="118" y="71" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0f172a">
        {start}
      </text>
    </svg>
  );
};

/**
 * Mini kivonókerék-szelet kártya: [center] −sub → ?
 */
export const WheelStep20Card: React.FC<{ center: number; sub: number; small?: boolean }> = ({
  center,
  sub,
  small
}) => {
  if (small) {
    return (
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={SUB20_FONT}>
        <rect x="2" y="2" width="76" height="76" rx="10" fill="#fefce8" stroke="#f59e0b" strokeWidth="3" />
        <text x="40" y="34" textAnchor="middle" fontSize="24" fontWeight="900" fill="#0f172a">
          {center}
        </text>
        <text x="40" y="64" textAnchor="middle" fontSize="24" fontWeight="900" fill="#be123c">
          −{sub}
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={SUB20_FONT}>
      <rect x="2" y="2" width="146" height="76" rx="10" fill="#fefce8" stroke="#f59e0b" strokeWidth="3" />
      <rect x="10" y="18" width="42" height="44" rx="8" fill="#facc15" stroke="#854d0e" strokeWidth="3" />
      <text x="31" y="48" textAnchor="middle" fontSize="24" fontWeight="900" fill="#0f172a">
        {center}
      </text>
      <line x1="56" y1="44" x2="98" y2="44" stroke="#334155" strokeWidth="3" />
      <path d="M 94 37 L 103 44 L 94 51" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="77" y="33" textAnchor="middle" fontSize="22" fontWeight="900" fill="#be123c">
        −{sub}
      </text>
      <circle cx="124" cy="40" r="18" fill="#fee2e2" stroke="#dc2626" strokeWidth="3" />
      <text x="124" y="48" textAnchor="middle" fontSize="24" fontWeight="900" fill="#dc2626">
        ?
      </text>
    </svg>
  );
};

/**
 * Mérleg / kétoldali egyenlet kártya (150 × 80): pl. 16−5 | 18−?
 */
export const BalanceSubCard150: React.FC<{ leftExpr: string; rightExpr: string }> = ({
  leftExpr,
  rightExpr
}) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={SUB20_FONT}>
    <polygon points="75,48 64,74 86,74" fill="#475569" />
    <line x1="18" y1="48" x2="132" y2="48" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
    <rect x="4" y="10" width="64" height="32" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="3" />
    <text x="36" y="34" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1e3a8a">
      {leftExpr}
    </text>
    <rect x="82" y="10" width="64" height="32" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="3" />
    <text x="114" y="34" textAnchor="middle" fontSize="22" fontWeight="900" fill="#b91c1c">
      {rightExpr}
    </text>
  </svg>
);

/**
 * Mini kivonási lánc kártya (150 × 80 vagy 80 × 80): start, −a, −b
 */
export const ChainStepCard: React.FC<{ start: number; step1: number; step2: number; small?: boolean }> = ({
  start,
  step1,
  step2,
  small
}) => {
  if (small) {
    return (
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={SUB20_FONT}>
        <rect x="2" y="2" width="76" height="76" rx="10" fill="#fdf4ff" stroke="#a855f7" strokeWidth="3" />
        <text x="40" y="27" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0f172a">
          {start}
        </text>
        <text x="40" y="51" textAnchor="middle" fontSize="20" fontWeight="900" fill="#dc2626">
          −{step1} −{step2}
        </text>
        <text x="40" y="72" textAnchor="middle" fontSize="20" fontWeight="900" fill="#7e22ce">
          = ?
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={SUB20_FONT}>
      <rect x="2" y="2" width="146" height="76" rx="10" fill="#fdf4ff" stroke="#a855f7" strokeWidth="3" />
      <rect x="6" y="22" width="34" height="36" rx="7" fill="#ffffff" stroke="#7e22ce" strokeWidth="3" />
      <text x="23" y="48" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0f172a">
        {start}
      </text>
      <text x="76" y="34" textAnchor="middle" fontSize="19" fontWeight="900" fill="#dc2626">
        −{step1} −{step2}
      </text>
      <line x1="45" y1="50" x2="105" y2="50" stroke="#7e22ce" strokeWidth="3" />
      <path d="M 101 44 L 109 50 L 101 56" fill="none" stroke="#7e22ce" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="129" cy="40" r="16" fill="#fee2e2" stroke="#dc2626" strokeWidth="3" />
      <text x="129" y="48" textAnchor="middle" fontSize="22" fontWeight="900" fill="#dc2626">
        ?
      </text>
    </svg>
  );
};
