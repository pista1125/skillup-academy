import React from 'react';

/**
 * Belső rajzsegédek a II. Sorozatok fejezet 6–10. leckéjéhez (nem exportáljuk az index.ts-ből).
 * Oszlopdiagram / pontgrafikon sorozatokhoz, keret a tananyag-ábrákhoz, kis keret a kvízábrákhoz.
 */

export const S_BLUE = '#2563eb';
export const S_RED = '#dc2626';
export const S_GREEN = '#059669';
export const S_PURPLE = '#7c3aed';
export const S_AMBER = '#d97706';
export const S_INK = '#0f172a';
export const S_GRID = '#e2e8f0';

/** Magyar számformátum: tizedesvessző, ezres tagolás szóközzel. */
export const fmtHu = (x: number, d = 2): string => {
  if (!Number.isFinite(x)) return '–';
  const neg = x < 0;
  const fixed = Math.abs(x).toFixed(d);
  const [int, frac] = fixed.split('.');
  const grouped = int.length > 4 ? int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : int;
  const trimmed = frac ? frac.replace(/0+$/, '') : '';
  return (neg ? '−' : '') + grouped + (trimmed ? ',' + trimmed : '');
};

/** Egészre kerekített forintösszeg ezres tagolással. */
export const fmtFt = (x: number): string => fmtHu(Math.round(x), 0);

export const SeqFrame: React.FC<{ title: string; className: string; h?: number; children: React.ReactNode }> = ({
  title,
  className,
  h = 300,
  children
}) => (
  <svg viewBox={`0 0 480 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="472" height={h - 8} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="240" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill={S_INK}>
      {title}
    </text>
    {children}
  </svg>
);

/** Kvízábra kerete (240 × h). */
export const QFig: React.FC<{ h?: number; children: React.ReactNode }> = ({ h = 160, children }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    {children}
  </svg>
);

export const SText: React.FC<{ x: number; y: number; t: string; s?: number; c?: string; a?: 'start' | 'middle' | 'end'; b?: boolean }> = ({
  x,
  y,
  t,
  s = 11,
  c = S_INK,
  a = 'middle',
  b = false
}) => (
  <text x={x} y={y} fontSize={s} fill={c} textAnchor={a} fontWeight={b ? 'bold' : 'normal'}>
    {t}
  </text>
);

export interface SeqBarChartProps {
  values: number[];
  x: number;
  y: number;
  w: number;
  h: number;
  color?: string;
  negColor?: string;
  highlight?: number[];
  highlightColor?: string;
  /** Ha megadjuk, a felső határ (különben max(values, line)). */
  maxV?: number;
  minV?: number;
  /** Másodlagos (pl. halmozott összeg) vonal ugyanazon a skálán. */
  line?: number[];
  lineColor?: string;
  /** Vízszintes referenciavonal (pl. cél). */
  refY?: number;
  refLabel?: string;
  /** Minden k-adik oszlop alá írjuk a sorszámot. */
  labelEvery?: number;
  /** Az oszlopok tetejére írt értékek (ha kevés oszlop van). */
  showValues?: boolean;
  valueDigits?: number;
  points?: boolean;
}

/** Oszlopdiagram (vagy pontgrafikon) egy sorozat tagjaihoz, negatív tagokat is kezel. */
export const SeqBarChart: React.FC<SeqBarChartProps> = ({
  values,
  x,
  y,
  w,
  h,
  color = S_BLUE,
  negColor = S_RED,
  highlight = [],
  highlightColor = S_AMBER,
  maxV,
  minV,
  line,
  lineColor = S_GREEN,
  refY,
  refLabel,
  labelEvery = 1,
  showValues = false,
  valueDigits = 1,
  points = false
}) => {
  const all = [...values, ...(line ?? []), ...(refY !== undefined ? [refY] : [])].filter((v) => Number.isFinite(v));
  const hi = maxV ?? Math.max(0, ...all);
  const lo = minV ?? Math.min(0, ...all);
  const span = hi - lo || 1;
  const Y = (v: number) => y + h - ((Math.max(lo, Math.min(hi, v)) - lo) / span) * h;
  const n = Math.max(values.length, 1);
  const step = w / n;
  const bw = Math.max(1.5, step * 0.68);
  const zeroY = Y(0);
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y + h} stroke="#94a3b8" strokeWidth="1" />
      <line x1={x} y1={zeroY} x2={x + w} y2={zeroY} stroke="#64748b" strokeWidth="1.2" />
      {refY !== undefined && (
        <g>
          <line x1={x} y1={Y(refY)} x2={x + w} y2={Y(refY)} stroke={S_PURPLE} strokeWidth="1.4" strokeDasharray="5 4" />
          {refLabel && <SText x={x + w - 2} y={Y(refY) - 4} t={refLabel} s={10} c={S_PURPLE} a="end" />}
        </g>
      )}
      {values.map((v, i) => {
        const cx = x + step * i + step / 2;
        const top = Math.min(Y(v), zeroY);
        const hh = Math.abs(Y(v) - zeroY);
        const fill = highlight.includes(i) ? highlightColor : v < 0 ? negColor : color;
        return (
          <g key={i}>
            {points ? (
              <circle cx={cx} cy={Y(v)} r={Math.min(4, step * 0.3)} fill={fill} />
            ) : (
              <rect x={cx - bw / 2} y={top} width={bw} height={Math.max(hh, 0.5)} fill={fill} rx={Math.min(2, bw / 4)} opacity={0.9} />
            )}
            {showValues && <SText x={cx} y={v < 0 ? Y(v) + 11 : Y(v) - 3} t={fmtHu(v, valueDigits)} s={9} c={S_INK} />}
            {(i + 1) % labelEvery === 0 || i === 0 ? <SText x={cx} y={y + h + 12} t={String(i + 1)} s={9} c="#475569" /> : null}
          </g>
        );
      })}
      {line && line.length > 1 && (
        <polyline
          points={line.map((v, i) => `${x + step * i + step / 2},${Y(v)}`).join(' ')}
          fill="none"
          stroke={lineColor}
          strokeWidth="2"
        />
      )}
      {line &&
        line.map((v, i) => <circle key={`l${i}`} cx={x + step * i + step / 2} cy={Y(v)} r={Math.min(2.6, step * 0.25)} fill={lineColor} />)}
    </g>
  );
};
