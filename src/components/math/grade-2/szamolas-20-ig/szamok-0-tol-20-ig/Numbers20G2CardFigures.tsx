import React from 'react';

// ---------------------------------------------------------------------------
// Kis kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz
// ---------------------------------------------------------------------------

const FONT = 'system-ui, Segoe UI, sans-serif';

/**
 * 10-es (lila) és 1-es (zöld) korongok kártyán.
 * onesFirst: az 1-esek vannak elöl (sorrend-csapda).
 * small: 80 × 80-as csoportosító kártya.
 */
export const DiscsCard: React.FC<{ tens: number; ones: number; onesFirst?: boolean; small?: boolean }> = ({
  tens,
  ones,
  onesFirst,
  small,
}) => {
  const W = small ? 80 : 150;
  const H = 80;
  const tenR = small ? 12 : 14;
  const oneR = small ? 7.5 : 8.5;
  const cols = ones > 5 ? 5 : Math.max(1, ones);
  const rows = ones > 5 ? 2 : ones > 0 ? 1 : 0;
  const tensW = tens > 0 ? tens * (tenR * 2 + 4) - 4 : 0;
  const onesW = ones > 0 ? cols * (oneR * 2 + 3) - 3 : 0;
  const gap = tens > 0 && ones > 0 ? 8 : 0;
  const totalW = tensW + gap + onesW;
  const s = Math.min((W - 8) / Math.max(1, totalW), (H - 12) / Math.max(tenR * 2 + 4, rows * (oneR * 2 + 4)), 1.05);
  const ox = (W - totalW * s) / 2;
  const tensX = onesFirst ? onesW + gap : 0;
  const onesX = onesFirst ? 0 : tensW + gap;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <g transform={`translate(${ox} ${H / 2}) scale(${s})`}>
        {Array.from({ length: tens }, (_, i) => {
          const cx = tensX + tenR + i * (tenR * 2 + 4);
          return (
            <g key={`t${i}`}>
              <circle cx={cx} cy={0} r={tenR} fill="#d8b4fe" stroke="#6b21a8" strokeWidth="3" />
              <text x={cx} y={5.5} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#4c1d95">
                10
              </text>
            </g>
          );
        })}
        {Array.from({ length: ones }, (_, i) => {
          const c = i % 5;
          const r = Math.floor(i / 5);
          const cy = rows === 2 ? (r === 0 ? -(oneR + 2) : oneR + 2) : 0;
          const cx = onesX + oneR + c * (oneR * 2 + 3);
          return (
            <g key={`o${i}`}>
              <circle cx={cx} cy={cy} r={oneR} fill="#86efac" stroke="#15803d" strokeWidth="2.6" />
              <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14532d">
                1
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

/**
 * Korongpöttyök kettesével rendezve (páros/páratlan vagy számlálás 0–12).
 * 0 esetén üres szaggatott tálca látszik.
 */
export const DotsPairCard: React.FC<{ count: number; small?: boolean }> = ({ count, small }) => {
  const W = small ? 80 : 150;
  const H = 80;
  if (count === 0) {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
        <rect
          x={10}
          y={14}
          width={W - 20}
          height={H - 28}
          rx="10"
          fill="#f8fafc"
          stroke="#64748b"
          strokeWidth="3"
          strokeDasharray="6 4"
        />
      </svg>
    );
  }
  const cols = Math.ceil(count / 2);
  const maxStep = Math.floor((W - 18) / Math.max(1, cols));
  const r = Math.min(small ? 8 : 10, Math.max(5.5, maxStep * 0.36));
  const stepX = Math.max(r * 2 + 4, Math.min(24, maxStep));
  const totalW = (cols - 1) * stepX + r * 2;
  const x0 = (W - totalW) / 2 + r;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: count }, (_, i) => {
        const col = Math.floor(i / 2);
        const row = i % 2;
        return (
          <circle
            key={i}
            cx={x0 + col * stepX}
            cy={row === 0 ? 25 : 55}
            r={r}
            fill="#fb923c"
            stroke="#9a3412"
            strokeWidth="2.8"
          />
        );
      })}
    </svg>
  );
};

/**
 * Vastag számegyenes-részlet piros nyíllal (a keresett számot jelöli).
 */
export const LineArrowCard: React.FC<{ value: number; lo?: number; hi?: number; small?: boolean }> = ({
  value,
  lo = 0,
  hi = 20,
  small,
}) => {
  const W = small ? 80 : 150;
  const H = 80;
  const x0 = small ? 12 : 16;
  const x1 = W - x0;
  const y = 48;
  const X = (v: number) => x0 + ((x1 - x0) * (v - lo)) / (hi - lo);
  const mid = Math.round((lo + hi) / 2);
  const labels = small ? [lo, hi] : [lo, mid, hi];
  const vx = X(value);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1={x0 - 4} y1={y} x2={x1 + 4} y2={y} stroke="#1e293b" strokeWidth="3.2" strokeLinecap="round" />
      {Array.from({ length: hi - lo + 1 }, (_, i) => {
        const v = lo + i;
        const major = v === lo || v === hi || v === mid;
        return (
          <line
            key={v}
            x1={X(v)}
            y1={major ? y - 8 : y - 4}
            x2={X(v)}
            y2={major ? y + 8 : y + 4}
            stroke="#334155"
            strokeWidth={major ? 2.6 : 1.5}
          />
        );
      })}
      {labels.map((v) => (
        <text key={v} x={X(v)} y={y + 24} textAnchor="middle" fontSize={small ? 18 : 20} fontWeight="bold" fill="#0f172a">
          {v}
        </text>
      ))}
      <line x1={vx} y1={10} x2={vx} y2={y - 12} stroke="#dc2626" strokeWidth="3.4" strokeLinecap="round" />
      <path d={`M ${vx - 6} ${y - 19} L ${vx} ${y - 10} L ${vx + 6} ${y - 19}`} fill="none" stroke="#dc2626" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/**
 * Sorszám-kártya: sorban álló körök, balról a célzott piros színű (szám nélkül).
 */
export const OrdinalDotsCard: React.FC<{ total: number; targetIndex: number }> = ({ total, targetIndex }) => {
  const W = 150;
  const H = 80;
  const step = Math.min(22, Math.floor((W - 20) / total));
  const x0 = (W - (total - 1) * step) / 2;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
      <line x1={x0} y1={22} x2={x0 + 34} y2={22} stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" />
      <path d={`M ${x0 + 27} 16 L ${x0 + 36} 22 L ${x0 + 27} 28`} fill="none" stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {Array.from({ length: total }, (_, i) => {
        const hit = i + 1 === targetIndex;
        return (
          <circle
            key={i}
            cx={x0 + i * step}
            cy={52}
            r={hit ? 9 : 7.5}
            fill={hit ? '#ef4444' : '#e2e8f0'}
            stroke={hit ? '#991b1b' : '#475569'}
            strokeWidth={hit ? 3 : 2.5}
          />
        );
      })}
    </svg>
  );
};
