import React from 'react';

/** Óra (csak arab számokkal) – időtartam. */
export const ClockFace: React.FC<{ hour?: number; minute?: number; cx?: number; cy?: number; r?: number; label?: string }> = ({ hour = 3, minute = 0, cx = 60, cy = 60, r = 50, label }) => {
  const ha = (((hour % 12) + minute / 60) / 12) * 2 * Math.PI;
  const ma = (minute / 60) * 2 * Math.PI;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#fff" stroke="#1e293b" strokeWidth="3" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = ((i + 1) / 12) * 2 * Math.PI;
        return (
          <text key={i} x={cx + Math.sin(a) * r * 0.78} y={cy - Math.cos(a) * r * 0.78 + 4} textAnchor="middle" fontSize={r * 0.2} fontWeight="bold" fill="#334155">
            {i + 1}
          </text>
        );
      })}
      <line x1={cx} y1={cy} x2={cx + Math.sin(ha) * r * 0.48} y2={cy - Math.cos(ha) * r * 0.48} stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx + Math.sin(ma) * r * 0.6} y2={cy - Math.cos(ma) * r * 0.6} stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="3" fill="#1e293b" />
      {label && (
        <text x={cx} y={cy + r + 18} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">{label}</text>
      )}
    </g>
  );
};
