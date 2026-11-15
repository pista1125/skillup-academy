import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** n alatt k (lebegőpontosan, nagy n-re is stabil). */
export const rcBinom = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  const kk = Math.min(k, n - k);
  let r = 1;
  for (let i = 1; i <= kk; i++) r = (r * (n - kk + i)) / i;
  return r;
};

/** Visszatevéses mintavétel: binomiális eloszlás. */
export const rcBinomialP = (n: number, k: number, p: number): number => rcBinom(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);

/** Visszatevés nélküli mintavétel: N elem, S „jó” közülük, n-et választunk, pontosan k jó. */
export const rcHyperP = (N: number, S: number, n: number, k: number): number => {
  if (n > N) return 0;
  // logaritmusokkal, hogy nagy N-re se csorduljon túl
  const lnC = (a: number, b: number): number => {
    if (b < 0 || b > a) return -Infinity;
    let s = 0;
    const bb = Math.min(b, a - b);
    for (let i = 1; i <= bb; i++) s += Math.log(a - bb + i) - Math.log(i);
    return s;
  };
  const v = lnC(S, k) + lnC(N - S, n - k) - lnC(N, n);
  return Number.isFinite(v) ? Math.exp(v) : 0;
};

export const rcFmt = (x: number, d = 3): string =>
  Number.isFinite(x) ? x.toLocaleString('hu-HU', { minimumFractionDigits: d, maximumFractionDigits: d }) : '–';

export const RC_WITH_COLOR = '#0284c7';
export const RC_WITHOUT_COLOR = '#d97706';

/** Csoportosított oszlopdiagram: minden k-hoz két oszlop (visszatevéssel / visszatevés nélkül). */
export const ReplacementComparisonBars: React.FC<{
  withRep: number[];
  withoutRep?: number[];
  yMax?: number;
  xLabel?: string;
  title?: string;
  highlight?: number[];
  width?: number;
  height?: number;
  showLegend?: boolean;
  className?: string;
  empiricalWith?: number[];
  empiricalWithout?: number[];
}> = ({
  withRep,
  withoutRep,
  yMax,
  xLabel = 'k',
  title,
  highlight,
  width = 560,
  height = 300,
  showLegend = true,
  className = DEFAULT_CLASS,
  empiricalWith,
  empiricalWithout
}) => {
  const n = withRep.length;
  const left = 46;
  const right = 12;
  const top = title ? 40 : 18;
  const bottom = 46;
  const plotW = width - left - right;
  const plotH = height - top - bottom;
  const maxVal = yMax ?? Math.max(0.05, ...withRep, ...(withoutRep ?? []));
  const step = niceStep(maxVal);
  const yTop = Math.ceil(maxVal / step - 1e-9) * step;
  const slot = plotW / n;
  const barW = Math.max(2, (slot * (withoutRep ? 0.42 : 0.7)));
  const y = (v: number) => top + plotH - (v / yTop) * plotH;
  const ticks: number[] = [];
  for (let t = 0; t <= yTop + 1e-9; t += step) ticks.push(t);
  const labelEvery = n > 24 ? 5 : n > 12 ? 2 : 1;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width={width - 4} height={height - 4} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      {title && (
        <text x={width / 2} y="24" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
          {title}
        </text>
      )}
      {ticks.map((t) => (
        <g key={t}>
          <line x1={left} y1={y(t)} x2={width - right} y2={y(t)} stroke="#e2e8f0" />
          <text x={left - 5} y={y(t) + 3.5} fontSize="9.5" textAnchor="end" fill="#475569">
            {t.toLocaleString('hu-HU', { maximumFractionDigits: 3 })}
          </text>
        </g>
      ))}
      <line x1={left} y1={top + plotH} x2={width - right} y2={top + plotH} stroke="#334155" />
      <line x1={left} y1={top} x2={left} y2={top + plotH} stroke="#334155" />
      {withRep.map((v, k) => {
        const cx = left + slot * k + slot / 2;
        const hl = highlight?.includes(k);
        const w2 = withoutRep ? withoutRep[k] : 0;
        return (
          <g key={k}>
            {hl && <rect x={left + slot * k + 1} y={top} width={slot - 2} height={plotH} fill="#fef9c3" opacity="0.8" />}
            <rect
              x={withoutRep ? cx - barW : cx - barW / 2}
              y={y(v)}
              width={barW}
              height={Math.max(0, top + plotH - y(v))}
              fill={RC_WITH_COLOR}
              opacity="0.9"
            />
            {withoutRep && <rect x={cx} y={y(w2)} width={barW} height={Math.max(0, top + plotH - y(w2))} fill={RC_WITHOUT_COLOR} opacity="0.9" />}
            {empiricalWith && empiricalWith[k] > 0 && (
              <circle cx={withoutRep ? cx - barW / 2 : cx} cy={y(Math.min(empiricalWith[k], yTop))} r="2.6" fill="#ffffff" stroke="#0c4a6e" strokeWidth="1.4" />
            )}
            {empiricalWithout && empiricalWithout[k] > 0 && (
              <circle cx={cx + barW / 2} cy={y(Math.min(empiricalWithout[k], yTop))} r="2.6" fill="#ffffff" stroke="#78350f" strokeWidth="1.4" />
            )}
            {k % labelEvery === 0 && (
              <text x={cx} y={top + plotH + 13} fontSize="9.5" textAnchor="middle" fill="#334155">
                {k}
              </text>
            )}
          </g>
        );
      })}
      <text x={left + plotW / 2} y={height - 18} fontSize="10" textAnchor="middle" fill="#334155">
        {xLabel}
      </text>
      {showLegend && (
        <g>
          <rect x={left + 8} y={height - 12} width="10" height="8" fill={RC_WITH_COLOR} />
          <text x={left + 22} y={height - 5} fontSize="9.5" fill="#0c4a6e">
            visszatevéssel (binomiális)
          </text>
          {withoutRep && (
            <>
              <rect x={left + 190} y={height - 12} width="10" height="8" fill={RC_WITHOUT_COLOR} />
              <text x={left + 204} y={height - 5} fontSize="9.5" fill="#78350f">
                visszatevés nélkül
              </text>
            </>
          )}
        </g>
      )}
    </svg>
  );
};

function niceStep(maxVal: number): number {
  const candidates = [0.01, 0.02, 0.05, 0.1, 0.2, 0.25, 0.5, 1];
  for (const c of candidates) if (maxVal / c <= 6) return c;
  return 1;
}

// 1. ábra: minőség-ellenőrzés – 50 munkadarab, 20 selejtes, 15-öt vizsgálunk
export const ReplacementComparisonQualitySvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 600 330" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="592" height="322" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="300" y="28" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
      50 munkadarab: 20 selejtes (40%), 30 jó – 15 darabot vizsgálunk
    </text>
    {Array.from({ length: 50 }, (_, i) => {
      const col = i % 25;
      const row = Math.floor(i / 25);
      const bad = i % 5 === 1 || i % 5 === 3;
      return (
        <g key={i}>
          <rect
            x={28 + col * 22}
            y={44 + row * 26}
            width="17"
            height="19"
            rx="3"
            fill={bad ? '#fecaca' : '#dcfce7'}
            stroke={bad ? '#b91c1c' : '#15803d'}
            strokeWidth="1.2"
          />
          {bad && (
            <text x={36.5 + col * 22} y={58 + row * 26} fontSize="11" textAnchor="middle" fontWeight="bold" fill="#b91c1c">
              ×
            </text>
          )}
        </g>
      );
    })}
    <rect x="22" y="112" width="270" height="200" rx="12" fill="#ffffff" stroke={RC_WITH_COLOR} strokeWidth="1.6" />
    <text x="157" y="134" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
      a) visszatevéssel
    </text>
    <text x="157" y="156" fontSize="11" textAnchor="middle" fill="#334155">
      minden húzásnál p = 0,4 (selejtes)
    </text>
    <text x="157" y="180" fontSize="11" textAnchor="middle" fill="#334155">
      P(k) = (15 alatt k) · 0,4<tspan fontSize="8" dy="-5">k</tspan>
      <tspan dy="5"> · 0,6</tspan>
      <tspan fontSize="8" dy="-5">15 − k</tspan>
    </text>
    <text x="157" y="206" fontSize="11" textAnchor="middle" fill="#334155">
      k = 5: 0,186   k = 6: 0,207   k = 7: 0,177
    </text>
    <text x="157" y="246" fontSize="22" fontWeight="bold" textAnchor="middle" fill={RC_WITH_COLOR}>
      P(5, 6 vagy 7) ≈ 0,57
    </text>
    <text x="157" y="276" fontSize="10.5" textAnchor="middle" fill="#475569">
      binomiális eloszlás
    </text>
    <rect x="308" y="112" width="270" height="200" rx="12" fill="#ffffff" stroke={RC_WITHOUT_COLOR} strokeWidth="1.6" />
    <text x="443" y="134" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#78350f">
      b) visszatevés nélkül
    </text>
    <text x="443" y="156" fontSize="11" textAnchor="middle" fill="#334155">
      összes eset: (50 alatt 15)
    </text>
    <text x="443" y="180" fontSize="11" textAnchor="middle" fill="#334155">
      kedvező: (20 alatt k) · (30 alatt 15 − k)
    </text>
    <text x="443" y="206" fontSize="11" textAnchor="middle" fill="#334155">
      k = 5: 0,207   k = 6: 0,246   k = 7: 0,202
    </text>
    <text x="443" y="246" fontSize="22" fontWeight="bold" textAnchor="middle" fill={RC_WITHOUT_COLOR}>
      P(5, 6 vagy 7) ≈ 0,65
    </text>
    <text x="443" y="276" fontSize="10.5" textAnchor="middle" fill="#475569">
      kedvező / összes (egyszerre húzás)
    </text>
  </svg>
);

/** Kis urna golyókkal (segéd). */
const MiniUrn: React.FC<{ x: number; y: number; reds: number; blues: number; faded?: number }> = ({ x, y, reds, blues, faded = -1 }) => {
  const total = reds + blues;
  return (
    <g>
      <path d={`M ${x} ${y} L ${x} ${y + 70} Q ${x} ${y + 82} ${x + 12} ${y + 82} L ${x + 118} ${y + 82} Q ${x + 130} ${y + 82} ${x + 130} ${y + 70} L ${x + 130} ${y}`} fill="#f1f5f9" stroke="#64748b" strokeWidth="1.8" />
      {Array.from({ length: total }, (_, i) => (
        <circle
          key={i}
          cx={x + 20 + (i % 5) * 22}
          cy={y + 22 + Math.floor(i / 5) * 24}
          r="9"
          fill={i < reds ? '#fb7185' : '#38bdf8'}
          stroke={i < reds ? '#be123c' : '#0369a1'}
          opacity={i === faded ? 0.15 : 1}
        />
      ))}
    </g>
  );
};

// 2. ábra: a két mintavételi modell
export const ReplacementComparisonModelsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 600 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="rc-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 z" fill="#334155" />
      </marker>
    </defs>
    <rect x="4" y="4" width="592" height="292" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="150" y="28" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
      Visszatevéssel
    </text>
    <text x="450" y="28" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#78350f">
      Visszatevés nélkül
    </text>
    <line x1="300" y1="14" x2="300" y2="286" stroke="#cbd5e1" strokeDasharray="5 4" />
    <MiniUrn x={40} y={50} reds={4} blues={6} />
    <circle cx="230" cy="80" r="9" fill="#fb7185" stroke="#be123c" />
    <path d="M 172 70 Q 200 52 220 72" fill="none" stroke="#334155" strokeWidth="1.5" markerEnd="url(#rc-arrow)" />
    <path d="M 222 94 Q 200 116 174 104" fill="none" stroke="#0284c7" strokeWidth="1.5" markerEnd="url(#rc-arrow)" />
    <text x="236" y="122" fontSize="10" fill="#0369a1">
      vissza!
    </text>
    <text x="150" y="168" fontSize="11.5" textAnchor="middle" fill="#334155">
      1. húzás: P(piros) = 4/10
    </text>
    <text x="150" y="188" fontSize="11.5" textAnchor="middle" fill="#334155">
      2. húzás: P(piros) = 4/10
    </text>
    <text x="150" y="216" fontSize="11" textAnchor="middle" fill="#0369a1" fontWeight="bold">
      független húzások, állandó p
    </text>
    <text x="150" y="240" fontSize="11" textAnchor="middle" fill="#0369a1">
      binomiális eloszlás
    </text>
    <text x="150" y="262" fontSize="10.5" textAnchor="middle" fill="#475569">
      ugyanaz az elem többször is sorra kerülhet
    </text>
    <MiniUrn x={340} y={50} reds={4} blues={6} faded={0} />
    <circle cx="530" cy="80" r="9" fill="#fb7185" stroke="#be123c" />
    <path d="M 472 70 Q 500 52 520 72" fill="none" stroke="#334155" strokeWidth="1.5" markerEnd="url(#rc-arrow)" />
    <text x="514" y="112" fontSize="10" fill="#78350f">
      félretesszük
    </text>
    <text x="450" y="168" fontSize="11.5" textAnchor="middle" fill="#334155">
      1. húzás: P(piros) = 4/10
    </text>
    <text x="450" y="188" fontSize="11.5" textAnchor="middle" fill="#334155">
      2. húzás (ha az első piros): 3/9
    </text>
    <text x="450" y="216" fontSize="11" textAnchor="middle" fill="#78350f" fontWeight="bold">
      a húzások hatnak egymásra
    </text>
    <text x="450" y="240" fontSize="11" textAnchor="middle" fill="#78350f">
      (S alatt k)(N − S alatt n − k) / (N alatt n)
    </text>
    <text x="450" y="262" fontSize="10.5" textAnchor="middle" fill="#475569">
      = egyszerre húzás; minden elem legfeljebb egyszer
    </text>
  </svg>
);

const range = (n: number) => Array.from({ length: n + 1 }, (_, k) => k);

// 3. ábra: buszos ellenőrzés – 60 utas, 12 tanulóbérletes, 10 ellenőrzés (2. feladat)
export const ReplacementComparisonBusSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <ReplacementComparisonBars
    className={className}
    title="60 utas, 12 tanulóbérletes, 10 ellenőrzés"
    withRep={range(10).map((k) => rcBinomialP(10, k, 0.2))}
    withoutRep={range(10).map((k) => rcHyperP(60, 12, 10, k))}
    xLabel="tanulóbérletes utasok száma a 10 ellenőrzött között"
  />
);

// 4. ábra: balkezesek egy 17 fős csoportban, p = 0,11 (3. feladat)
export const ReplacementComparisonLeftHandedSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <ReplacementComparisonBars
    className={className}
    title="Balkezesek száma egy 17 fős csoportban (p = 0,11)"
    withRep={range(6).map((k) => rcBinomialP(17, k, 0.11))}
    xLabel="balkezesek száma"
    highlight={[3]}
  />
);

// 5. ábra: 20 könyvutalvány, 30% nyugdíjas – 250 fő (Ráadás)
export const ReplacementComparisonVoucher250Svg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <ReplacementComparisonBars
    className={className}
    title="250 fő (75 nyugdíjas), 20 könyvutalvány"
    withRep={range(20).map((k) => rcBinomialP(20, k, 0.3))}
    withoutRep={range(20).map((k) => rcHyperP(250, 75, 20, k))}
    yMax={0.2}
    xLabel="nyugdíjas korú által nyert könyvutalványok száma"
  />
);

// 6. ábra: ugyanez 2500 fővel
export const ReplacementComparisonVoucher2500Svg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <ReplacementComparisonBars
    className={className}
    title="2500 fő (750 nyugdíjas), 20 könyvutalvány"
    withRep={range(20).map((k) => rcBinomialP(20, k, 0.3))}
    withoutRep={range(20).map((k) => rcHyperP(2500, 750, 20, k))}
    yMax={0.2}
    xLabel="nyugdíjas korú által nyert könyvutalványok száma"
  />
);

// 7. ábra: Tomi zsákja (4. feladat)
export const RC_POTION_ITEMS: { name: string; count: number; fill: string; stroke: string }[] = [
  { name: 'csattanó maszlag', count: 4, fill: '#fde68a', stroke: '#b45309' },
  { name: 'keresztes pók', count: 2, fill: '#cbd5e1', stroke: '#334155' },
  { name: 'tök', count: 2, fill: '#fdba74', stroke: '#c2410c' },
  { name: 'mandragóra', count: 3, fill: '#bbf7d0', stroke: '#15803d' },
  { name: 'légyölő galóca', count: 1, fill: '#fca5a5', stroke: '#b91c1c' }
];

export const ReplacementComparisonPotionSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  let idx = 0;
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="552" height="252" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="280" y="28" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        Tomi zsákja: 12 összetevő
      </text>
      <path d="M 40 70 Q 30 60 50 52 L 250 52 Q 270 60 260 70 L 280 220 Q 282 240 260 240 L 40 240 Q 18 240 20 220 Z" fill="#fef3c7" stroke="#92400e" strokeWidth="2" />
      {RC_POTION_ITEMS.map((it) =>
        Array.from({ length: it.count }, () => {
          const i = idx++;
          return <circle key={`${it.name}-${i}`} cx={66 + (i % 4) * 56} cy={92 + Math.floor(i / 4) * 50} r="18" fill={it.fill} stroke={it.stroke} strokeWidth="2" />;
        })
      )}
      {RC_POTION_ITEMS.map((it, i) => (
        <g key={it.name}>
          <circle cx="320" cy={70 + i * 36} r="11" fill={it.fill} stroke={it.stroke} strokeWidth="2" />
          <text x="340" y={75 + i * 36} fontSize="13" fill="#0f172a">
            {it.count} db {it.name}
          </text>
        </g>
      ))}
    </svg>
  );
};
