import React from 'react';
import { DIV8_FONT, EightBoxPart } from './Div8G2Parts';

/** n korong soronként 8-asával; a teli sorok lilák, a nem teli utolsó sor narancs. 150 × 80 vagy 80 × 80. */
export const DotsCard: React.FC<{ n: number; small?: boolean }> = ({ n, small = false }) => {
  const W = small ? 80 : 150;
  const rows = Math.ceil(n / 8);
  const full = Math.floor(n / 8);
  const gx = small ? 8 : 14;
  const gy = Math.min(small ? 11 : 12, 64 / rows);
  const r = Math.min(small ? 3.4 : 5, gy * 0.42);
  const x0 = (W - 7 * gx) / 2;
  const y0 = 40 - ((rows - 1) * gy) / 2;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#eef2ff" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => {
        const rr = Math.floor(i / 8);
        return (
          <circle
            key={i}
            cx={x0 + (i % 8) * gx}
            cy={y0 + rr * gy}
            r={r}
            fill={rr < full ? '#6366f1' : '#f97316'}
            stroke="#1e293b"
            strokeWidth="1.1"
          />
        );
      })}
    </svg>
  );
};

/** Számegyenes 0–80: az első 8-as ugrás látszik, a cél piros pont a számmal. Hány ugrás? */
export const JumpsToCard: React.FC<{ target: number; small?: boolean }> = ({ target, small = false }) => {
  const W = small ? 80 : 150;
  const x0 = small ? 8 : 12;
  const w = small ? 62 : 124;
  const u = w / 80;
  const y = small ? 52 : 54;
  const end = x0 + target * u;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV8_FONT}>
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
      <line x1={x0 - 2} y1={y} x2={x0 + w + 4} y2={y} stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={x0 + i * 8 * u} y1={y - 4} x2={x0 + i * 8 * u} y2={y + 4} stroke="#334155" strokeWidth="1.6" />
      ))}
      <text x={x0} y={y + 20} textAnchor="middle" fontSize={small ? 12 : 14} fontWeight="bold" fill="#334155">
        0
      </text>
      <path d={`M ${x0} ${y - 2} Q ${x0 + 4 * u} ${y - 22} ${x0 + 8 * u} ${y - 2}`} fill="none" stroke="#4f46e5" strokeWidth="2.6" />
      <text x={x0 + 4 * u} y={y - 16} textAnchor="middle" fontSize={small ? 10 : 12} fontWeight="bold" fill="#4f46e5">
        8
      </text>
      <line x1={x0 + 8 * u} y1={y - 8} x2={end} y2={y - 8} stroke="#4f46e5" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx={end} cy={y} r="4" fill="#dc2626" />
      <text x={Math.min(end, W - 14)} y={y + 20} textAnchor="middle" fontSize={small ? 13 : 16} fontWeight="bold" fill="#dc2626">
        {target}
      </text>
    </svg>
  );
};

/** total süti, 8 üres tányér „?”-lel (150 × 80). */
export const PlatesCard150: React.FC<{ total: number }> = ({ total }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV8_FONT}>
    <rect x="3" y="3" width="144" height="74" rx="10" fill="#fffbeb" stroke="#334155" strokeWidth="3" />
    <rect x="10" y="24" width="38" height="32" rx="8" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
    <text x="29" y="47" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#78350f">
      {total}
    </text>
    {Array.from({ length: 8 }, (_, i) => (
      <g key={i}>
        <ellipse cx={66 + (i % 4) * 22} cy={i < 4 ? 26 : 56} rx="10" ry="7" fill="#ffffff" stroke="#475569" strokeWidth="2" />
        <text x={66 + (i % 4) * 22} y={i < 4 ? 31 : 61} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#dc2626">
          ?
        </text>
      </g>
    ))}
  </svg>
);

/** „? · (nyolcas doboz) = total” — hány doboz telik meg? */
export const HowManyBoxesCard150: React.FC<{ total: number }> = ({ total }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV8_FONT}>
    <rect x="3" y="3" width="144" height="74" rx="10" fill="#eef2ff" stroke="#334155" strokeWidth="3" />
    <text x="20" y="50" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#dc2626">
      ?
    </text>
    <text x="36" y="50" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">
      ·
    </text>
    <EightBoxPart x={44} y={28} h={24} color="#6366f1" />
    <text x="120" y="49" textAnchor="middle" fontSize="19" fontWeight="bold" fill="#334155">
      = {total}
    </text>
  </svg>
);

/** Felezés háromszor: start → fele → fele → ? (150 × 80). */
export const HalveCard150: React.FC<{ start: number }> = ({ start }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV8_FONT}>
    <rect x="3" y="3" width="144" height="74" rx="10" fill="#f0f9ff" stroke="#334155" strokeWidth="3" />
    <text x="75" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">
      : 2 → : 2 → : 2
    </text>
    <text x="75" y="54" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#0c4a6e">
      {start} → {start / 2} → {start / 4} → <tspan fill="#dc2626">?</tspan>
    </text>
  </svg>
);
