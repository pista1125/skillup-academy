import React from 'react';

/** Belső rajz- és számsegédek a rendszerező összefoglalás leckéihez (nem exportáljuk az index.ts-ből). */

export const S_BLUE = '#2563eb';
export const S_RED = '#dc2626';
export const S_GREEN = '#059669';
export const S_PURPLE = '#7c3aed';
export const S_AMBER = '#d97706';
export const S_INK = '#0f172a';
export const S_GRID = '#e2e8f0';

/** Magyar formátum: tizedesvessző, felesleges nullák nélkül. */
export const fmt = (x: number, d = 2): string => {
  if (!Number.isFinite(x)) return '–';
  const r = Math.round(x * 10 ** d) / 10 ** d;
  let s = r.toFixed(d);
  if (s.includes('.')) s = s.replace(/0+$/, '').replace(/\.$/, '');
  return (s === '-0' ? '0' : s).replace('.', ',').replace('-', '−');
};

/** Ezres tagolás (szóközzel) egész számokra. */
export const fmtInt = (x: number): string => {
  if (!Number.isFinite(x)) return '–';
  const neg = x < 0;
  const s = Math.round(Math.abs(x)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return (neg ? '−' : '') + s;
};

export interface SeqPlotProps {
  values: number[];
  w?: number;
  h?: number;
  color?: string;
  /** 0-alapú indexek, amelyeket kiemelünk */
  highlight?: number[];
  /** 0-alapú index, amelynek a helyére „?” kerül (a pont nem látszik) */
  unknown?: number;
  /** pontok fölé írjuk-e az értéket */
  showValues?: boolean;
  /** vízszintes segédvonal (pl. korlát) */
  hLine?: { y: number; label?: string; color?: string };
  yLabel?: string;
  title?: string;
  className?: string;
}

/** Sorozat pontgrafikonja: diszkrét pontok, nincs összekötő vonal. */
export const SeqPlot: React.FC<SeqPlotProps> = ({
  values,
  w = 300,
  h = 190,
  color = S_BLUE,
  highlight = [],
  unknown,
  showValues = false,
  hLine,
  yLabel = 'aₙ',
  title,
  className = 'w-full max-w-[320px] h-auto mx-auto'
}) => {
  const padL = 34;
  const padR = 14;
  const padT = title ? 30 : 16;
  const padB = 26;
  const finite = values.filter((v) => Number.isFinite(v));
  const extra = hLine ? [hLine.y] : [];
  let lo = Math.min(0, ...finite, ...extra);
  let hi = Math.max(0, ...finite, ...extra);
  if (hi - lo < 1e-9) hi = lo + 1;
  const span = hi - lo;
  lo -= span * 0.06;
  hi += span * 0.1;
  const n = values.length;
  const X = (i: number) => padL + ((i + 1) / (n + 0.6)) * (w - padL - padR);
  const Y = (v: number) => padT + ((hi - v) / (hi - lo)) * (h - padT - padB);
  const y0 = Y(0);
  // y-tengely beosztás
  const rawStep = (hi - lo) / 4;
  const mag = 10 ** Math.floor(Math.log10(rawStep));
  const step = [1, 2, 5, 10].map((k) => k * mag).find((s) => s >= rawStep) ?? rawStep;
  const ticks: number[] = [];
  for (let t = Math.ceil(lo / step) * step; t <= hi; t += step) ticks.push(Math.round(t * 1e9) / 1e9);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width={w - 2} height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      {title && (
        <text x={w / 2} y="19" fontSize="12" textAnchor="middle" fontWeight="bold" fill={S_INK}>
          {title}
        </text>
      )}
      {ticks.map((t) => (
        <g key={`t${t}`}>
          <line x1={padL} x2={w - padR} y1={Y(t)} y2={Y(t)} stroke={S_GRID} strokeWidth="1" />
          <text x={padL - 4} y={Y(t) + 3.5} fontSize="9" textAnchor="end" fill="#64748b">
            {fmt(t, 2)}
          </text>
        </g>
      ))}
      <line x1={padL} x2={w - padR + 4} y1={y0} y2={y0} stroke={S_INK} strokeWidth="1.4" />
      <line x1={padL} x2={padL} y1={h - padB + 4} y2={padT - 6} stroke={S_INK} strokeWidth="1.4" />
      <text x={w - padR + 2} y={y0 - 5} fontSize="10" textAnchor="end" fill={S_INK} fontStyle="italic">
        n
      </text>
      <text x={padL + 5} y={padT - 2} fontSize="10" fill={S_INK} fontStyle="italic">
        {yLabel}
      </text>
      {hLine && (
        <g>
          <line x1={padL} x2={w - padR} y1={Y(hLine.y)} y2={Y(hLine.y)} stroke={hLine.color ?? S_RED} strokeDasharray="5 4" strokeWidth="1.3" />
          {hLine.label && (
            <text x={w - padR - 2} y={Y(hLine.y) - 4} fontSize="9.5" textAnchor="end" fill={hLine.color ?? S_RED}>
              {hLine.label}
            </text>
          )}
        </g>
      )}
      {values.map((v, i) => (
        <g key={`p${i}`}>
          <line x1={X(i)} x2={X(i)} y1={y0 - 2.5} y2={y0 + 2.5} stroke={S_INK} />
          {(n <= 12 || (i + 1) % 2 === 1) && (
            <text x={X(i)} y={h - 9} fontSize="9" textAnchor="middle" fill="#475569">
              {i + 1}
            </text>
          )}
          {i === unknown ? (
            <text x={X(i)} y={Math.min(Y(0), padT + 14)} fontSize="13" fontWeight="bold" textAnchor="middle" fill={S_RED}>
              ?
            </text>
          ) : (
            Number.isFinite(v) && (
              <>
                <line x1={X(i)} x2={X(i)} y1={y0} y2={Y(v)} stroke={color} strokeOpacity="0.18" strokeDasharray="2 3" />
                <circle cx={X(i)} cy={Y(v)} r={highlight.includes(i) ? 5 : 3.6} fill={highlight.includes(i) ? S_RED : color} />
                {showValues && (
                  <text x={X(i)} y={Y(v) + (v >= 0 ? -7 : 13)} fontSize="9" textAnchor="middle" fill={S_INK}>
                    {fmt(v, 2)}
                  </text>
                )}
              </>
            )
          )}
        </g>
      ))}
    </svg>
  );
};

export interface SeqChainProps {
  terms: string[];
  /** a nyilak fölé írt művelet (pl. „+d”, „·q”); lehet tagonként eltérő */
  ops: string | string[];
  color?: string;
  title?: string;
  className?: string;
}

/** Tagok sora dobozokban, közöttük ívelt nyilak a művelettel. */
export const SeqChain: React.FC<SeqChainProps> = ({ terms, ops, color = S_BLUE, title, className = 'w-full max-w-[340px] h-auto mx-auto' }) => {
  const bw = Math.max(46, Math.max(...terms.map((t) => t.length)) * 7.4 + 12);
  const gap = 16;
  const w = 16 + terms.length * bw + (terms.length - 1) * gap + 16;
  const top = title ? 52 : 36;
  const h = top + 44;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width={w - 2} height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      {title && (
        <text x={w / 2} y="18" fontSize="12" textAnchor="middle" fontWeight="bold" fill={S_INK}>
          {title}
        </text>
      )}
      {terms.map((t, i) => {
        const x = 16 + i * (bw + gap);
        const op = Array.isArray(ops) ? ops[i] : ops;
        return (
          <g key={`c${i}`}>
            <rect x={x} y={top} width={bw} height="28" rx="7" fill={t === '?' ? '#fee2e2' : '#eff6ff'} stroke={t === '?' ? S_RED : color} strokeWidth="1.5" />
            <text x={x + bw / 2} y={top + 18.5} fontSize="12" textAnchor="middle" fontWeight="bold" fill={t === '?' ? S_RED : S_INK}>
              {t}
            </text>
            {i < terms.length - 1 && op && (
              <g>
                <path
                  d={`M ${x + bw / 2 + 6} ${top - 2} Q ${x + bw + gap / 2} ${top - 22} ${x + bw + gap + bw / 2 - 6} ${top - 2}`}
                  fill="none"
                  stroke={color}
                  strokeWidth="1.4"
                />
                <path
                  d={`M ${x + bw + gap + bw / 2 - 6} ${top - 2} l -6 -3 m 6 3 l -1.5 -6.5`}
                  fill="none"
                  stroke={color}
                  strokeWidth="1.4"
                />
                <text x={x + bw + gap / 2} y={top - 17} fontSize="10.5" textAnchor="middle" fill={color} fontWeight="bold">
                  {op}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/** Derékszög jelölése: negyedkörív ponttal (magyar jelölés). u1, u2: egységvektorok a csúcsból. */
export const RightMark: React.FC<{ v: [number, number]; u1: [number, number]; u2: [number, number]; r?: number; color?: string }> = ({
  v,
  u1,
  u2,
  r = 12,
  color = S_INK
}) => {
  const p1 = [v[0] + r * u1[0], v[1] + r * u1[1]];
  const p2 = [v[0] + r * u2[0], v[1] + r * u2[1]];
  const cross = u1[0] * u2[1] - u1[1] * u2[0];
  const sweep = cross > 0 ? 1 : 0;
  const bx = u1[0] + u2[0];
  const by = u1[1] + u2[1];
  const bl = Math.hypot(bx, by) || 1;
  return (
    <g>
      <path d={`M ${p1[0]} ${p1[1]} A ${r} ${r} 0 0 ${sweep} ${p2[0]} ${p2[1]}`} fill="none" stroke={color} strokeWidth="1.2" />
      <circle cx={v[0] + (0.55 * r * bx) / bl} cy={v[1] + (0.55 * r * by) / bl} r="1.7" fill={color} />
    </g>
  );
};

/** Keretes ábra címmel (480 széles). */
export const Frame: React.FC<{ title: string; children: React.ReactNode; className: string; h?: number; w?: number }> = ({
  title,
  children,
  className,
  h = 300,
  w = 480
}) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width={w - 8} height={h - 8} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x={w / 2} y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill={S_INK}>
      {title}
    </text>
    {children}
  </svg>
);

export const DEFAULT_FIG_CLASS = 'w-full h-auto max-w-xl mx-auto';
export const numIn = 'w-20 px-2 py-1 rounded-lg border border-slate-300 text-sm font-mono';
