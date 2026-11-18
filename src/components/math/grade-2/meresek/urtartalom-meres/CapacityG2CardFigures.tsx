import React from 'react';
import { JugPart, CupPart, MugPart } from './CapacityG2Parts';

// ---------------------------------------------------------------------------
// 3. Az űrtartalom mérése – kártyaképek (Párosító 150 × 80, Csoportosító 80 × 80)
// ---------------------------------------------------------------------------

const FONT = 'system-ui, Segoe UI, sans-serif';

const Card: React.FC<{ small?: boolean; children: React.ReactNode }> = ({ small, children }) => {
  const W = small ? 80 : 150;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="2" y="2" width={W - 4} height="76" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
      {children}
    </svg>
  );
};

/** `full` darab teli 1 l-es mérőedény + egy edény `part` dl-rel (10 dl-es beosztás). */
export const JugsCard: React.FC<{ full: number; part: number; small?: boolean }> = ({ full, part, small }) => {
  const W = small ? 80 : 150;
  const jw = small ? 20 : 26;
  const gap = small ? 8 : 14;
  const n = full + (part > 0 || full === 0 ? 1 : 0);
  const total = n * jw + (n - 1) * gap;
  const x0 = (W - total) / 2 - (small ? 2 : 4);
  const unit = 5.6;
  return (
    <Card small={small}>
      {Array.from({ length: n }, (_, i) => (
        <JugPart
          key={i}
          x={x0 + i * (jw + gap)}
          yBottom={70}
          w={jw}
          unit={unit}
          max={10}
          fill={i < full ? 10 : part}
          labels={false}
          handle={!small}
        />
      ))}
    </Card>
  );
};

/** `l` teli 1 l-es edény + `dl` darab 1 dl-es pohár. */
export const LitreCupsCard: React.FC<{ l: number; dl: number; small?: boolean }> = ({ l, dl, small }) => {
  const W = small ? 80 : 150;
  const jw = small ? 18 : 24;
  const unit = small ? 4.4 : 5.6;
  const jugsW = l * (jw + 6);
  const perRow = small ? 4 : 5;
  const cupStep = small ? 11 : 15;
  const cupsW = Math.min(dl, perRow) * cupStep;
  const x0 = (W - jugsW - cupsW - 4) / 2;
  const s = small ? 0.45 : 0.6;
  return (
    <Card small={small}>
      {Array.from({ length: l }, (_, i) => (
        <JugPart key={i} x={x0 + i * (jw + 6)} yBottom={72} w={jw} unit={unit} max={10} fill={10} labels={false} handle={false} />
      ))}
      {Array.from({ length: dl }, (_, i) => (
        <CupPart key={`c${i}`} cx={x0 + jugsW + 6 + (i % perRow) * cupStep + cupStep / 2} y={i < perRow ? 40 : 70} s={s} />
      ))}
    </Card>
  );
};

/** `n` bögre, mindegyiken az űrtartalma. */
export const CupsCard: React.FC<{ n: number; each: number; small?: boolean }> = ({ n, each, small }) => {
  const W = small ? 80 : 150;
  const perRow = small ? 2 : 5;
  const step = small ? 32 : 28;
  const rows = Math.ceil(n / perRow);
  const inRow = Math.min(n, perRow);
  const x0 = (W - (inRow - 1) * step) / 2 - 3;
  return (
    <Card small={small}>
      {Array.from({ length: n }, (_, i) => (
        <MugPart
          key={i}
          cx={x0 + (i % perRow) * step}
          y={rows === 1 ? 56 : Math.floor(i / perRow) === 0 ? 38 : 72}
          s={small ? 0.95 : 1}
          color={['#ef4444', '#3b82f6', '#16a34a', '#a855f7', '#f59e0b'][i % 5]}
          label={`${each} dl`}
        />
      ))}
    </Card>
  );
};
