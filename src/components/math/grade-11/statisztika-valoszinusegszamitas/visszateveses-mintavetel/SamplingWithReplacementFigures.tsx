import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const INK = '#0f172a';
const MUTED = '#475569';
const HIT = '#059669';
const MISS = '#e11d48';

const C = (n: number, k: number): number => {
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return Math.round(r);
};

const hu = (x: number, d = 4): string => (Math.round(x * Math.pow(10, d)) / Math.pow(10, d)).toString().replace('.', ',');

/** Egymás alá írt binomiális együttható SVG-ben: (n alatt k). */
const BinomSvg: React.FC<{ x: number; y: number; n: string; k: string; size?: number; fill?: string }> = ({ x, y, n, k, size = 16, fill = INK }) => (
  <g>
    <text x={x} y={y + size * 0.35} fontSize={size * 2.1} fill={fill} textAnchor="middle" fontWeight="300">
      (
    </text>
    <text x={x + size * 0.85} y={y - size * 0.15} fontSize={size} fill={fill} textAnchor="middle" fontWeight="bold">
      {n}
    </text>
    <text x={x + size * 0.85} y={y + size * 0.95} fontSize={size} fill={fill} textAnchor="middle" fontWeight="bold">
      {k}
    </text>
    <text x={x + size * 1.7} y={y + size * 0.35} fontSize={size * 2.1} fill={fill} textAnchor="middle" fontWeight="300">
      )
    </text>
  </g>
);

// 1. ábra: visszatevéses mintavétel – húzás, feljegyzés, visszatevés
export const SamplingWithReplacementUrnSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const balls: [number, number, boolean][] = [
    [95, 150, true],
    [125, 160, false],
    [155, 148, false],
    [110, 125, false],
    [140, 128, true],
    [170, 168, false],
    [80, 172, false],
    [128, 186, true],
    [160, 192, false],
    [98, 196, false]
  ];
  return (
    <svg viewBox="0 0 600 270" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="swrArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#0369a1" />
        </marker>
      </defs>
      <rect x="5" y="5" width="590" height="260" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="30" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        Visszatevéses mintavétel: minden húzás ugyanazok közül az elemek közül történik
      </text>
      <path d="M 60 100 L 60 205 Q 60 220 75 220 L 185 220 Q 200 220 200 205 L 200 100" fill="#e0f2fe" stroke="#0369a1" strokeWidth="2.5" />
      {balls.map(([x, y, red], i) => (
        <circle key={i} cx={x} cy={y} r="11" fill={red ? '#f43f5e' : '#ffffff'} stroke={red ? '#be123c' : '#64748b'} strokeWidth="1.5" />
      ))}
      <text x="130" y="245" fontSize="12" textAnchor="middle" fill={MUTED}>
        10 golyó, ebből 3 piros: p = 3/10
      </text>
      <path d="M 210 120 Q 270 70 330 110" fill="none" stroke="#0369a1" strokeWidth="2" markerEnd="url(#swrArrow)" />
      <text x="270" y="78" fontSize="12" textAnchor="middle" fill="#0369a1" fontWeight="bold">
        1. húzunk
      </text>
      <circle cx="370" cy="130" r="16" fill="#f43f5e" stroke="#be123c" strokeWidth="2" />
      <rect x="400" y="110" width="170" height="44" rx="10" fill="#ffffff" stroke="#cbd5e1" />
      <text x="485" y="128" fontSize="12" textAnchor="middle" fill={INK}>
        2. feljegyezzük:
      </text>
      <text x="485" y="145" fontSize="12" textAnchor="middle" fill={MISS} fontWeight="bold">
        piros
      </text>
      <path d="M 350 160 Q 280 215 212 190" fill="none" stroke="#059669" strokeWidth="2" markerEnd="url(#swrArrow)" />
      <text x="290" y="222" fontSize="12" textAnchor="middle" fill={HIT} fontWeight="bold">
        3. visszatesszük
      </text>
      <text x="470" y="200" fontSize="11.5" textAnchor="middle" fill={MUTED}>
        A következő húzásnál újra
      </text>
      <text x="470" y="216" fontSize="11.5" textAnchor="middle" fill={MUTED}>
        10 golyóból húzunk, és
      </text>
      <text x="470" y="232" fontSize="11.5" textAnchor="middle" fill={MUTED}>
        ismét p = 3/10 – a húzások függetlenek.
      </text>
    </svg>
  );
};

// 2. ábra: 5 kísérletből pontosan 3 sikeres – a 10 elrendezés
export const SamplingWithReplacementArrangementsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const arr: number[][] = [];
  for (let a = 0; a < 5; a++) for (let b = a + 1; b < 5; b++) for (let c = b + 1; c < 5; c++) arr.push([a, b, c]);
  return (
    <svg viewBox="0 0 600 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="28" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        5 kísérletből pontosan 3 sikeres (p = 0,8): hol lehet a 3 siker?
      </text>
      {arr.map((sel, i) => {
        const col = i < 5 ? 0 : 1;
        const row = i % 5;
        const x0 = 40 + col * 270;
        const y = 62 + row * 34;
        return (
          <g key={i}>
            <text x={x0} y={y + 4} fontSize="11" fill={MUTED}>
              {i + 1}.
            </text>
            {[0, 1, 2, 3, 4].map((j) => {
              const ok = sel.includes(j);
              return (
                <g key={j}>
                  <rect x={x0 + 22 + j * 26} y={y - 10} width="20" height="20" rx="5" fill={ok ? '#d1fae5' : '#ffe4e6'} stroke={ok ? HIT : MISS} strokeWidth="1.4" />
                  <text x={x0 + 32 + j * 26} y={y + 4} fontSize="10" fontWeight="bold" textAnchor="middle" fill={ok ? HIT : MISS}>
                    {ok ? 'S' : 'K'}
                  </text>
                </g>
              );
            })}
            <text x={x0 + 160} y={y + 4} fontSize="11" fill={INK} fontFamily="monospace">
              0,8³ · 0,2²
            </text>
          </g>
        );
      })}
      <text x="80" y="255" fontSize="13" fill={INK}>
        az elrendezések száma:
      </text>
      <BinomSvg x={232} y={250} n="5" k="3" size={13} fill="#0369a1" />
      <text x="262" y="255" fontSize="13" fill={INK}>
        = 10, mindegyik valószínűsége 0,8³ · 0,2² = 0,02048
      </text>
      <text x="300" y="282" fontSize="13.5" fontWeight="bold" textAnchor="middle" fill="#0369a1">
        P(pontosan 3 siker) = 10 · 0,02048 = 0,2048 ≈ 0,205
      </text>
    </svg>
  );
};

// 3. ábra: a binomiális eloszlás képlete magyarázó feliratokkal
export const SamplingWithReplacementFormulaSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 600 230" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="590" height="220" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="300" y="30" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
      n kísérletből pontosan k sikeres
    </text>
    <text x="70" y="92" fontSize="24" fill={INK}>
      P =
    </text>
    <BinomSvg x={138} y={86} n="n" k="k" size={18} fill="#7c3aed" />
    <text x="196" y="92" fontSize="24" fill={INK}>
      ·
    </text>
    <text x="225" y="92" fontSize="24" fill={HIT} fontStyle="italic">
      p
      <tspan dy="-11" fontSize="15">
        k
      </tspan>
    </text>
    <text x="270" y="92" fontSize="24" fill={INK}>
      ·
    </text>
    <text x="298" y="92" fontSize="24" fill={MISS} fontStyle="italic">
      (1 − p)
      <tspan dy="-11" fontSize="15">
        n − k
      </tspan>
    </text>
    <line x1="160" y1="125" x2="110" y2="150" stroke="#7c3aed" />
    <line x1="236" y1="110" x2="275" y2="150" stroke={HIT} />
    <line x1="350" y1="110" x2="455" y2="150" stroke={MISS} />
    {[
      { x: 110, color: '#7c3aed', lines: ['ennyiféleképpen', 'választhatjuk ki,', 'hányadik kísérlet', 'lesz sikeres'] },
      { x: 280, color: HIT, lines: ['a kiválasztott', 'k kísérlet', 'sikeres'] },
      { x: 455, color: MISS, lines: ['a többi n − k', 'kísérlet', 'nem sikeres'] }
    ].map((b) => (
      <g key={b.x}>
        {b.lines.map((l, i) => (
          <text key={i} x={b.x} y={168 + i * 15} fontSize="12" textAnchor="middle" fill={b.color}>
            {l}
          </text>
        ))}
      </g>
    ))}
  </svg>
);

const FERKO = [0, 1, 2, 3, 4, 5].map((k) => C(5, k) * Math.pow(0.15, k) * Math.pow(0.85, 5 - k));

/** Valószínűség-oszlopdiagram (binomiális eloszlás). */
const ProbBars: React.FC<{ values: number[]; highlight?: number[]; yMax: number; ticks: number[]; xTitle: string; title: string; note?: string; className: string }> = ({
  values,
  highlight = [],
  yMax,
  ticks,
  xTitle,
  title,
  note,
  className
}) => {
  const left = 60;
  const right = 570;
  const base = 230;
  const top = 50;
  const bw = (right - left) / values.length;
  const y = (v: number) => base - (v / yMax) * (base - top);
  return (
    <svg viewBox="0 0 600 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="30" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        {title}
      </text>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={left} y1={y(t)} x2={right} y2={y(t)} stroke="#e2e8f0" />
          <text x={left - 6} y={y(t) + 4} fontSize="10" textAnchor="end" fill={MUTED}>
            {hu(t, 2)}
          </text>
        </g>
      ))}
      <line x1={left} y1={base} x2={right} y2={base} stroke="#334155" strokeWidth="1.5" />
      {values.map((v, i) => {
        const x = left + i * bw;
        const hl = highlight.includes(i);
        return (
          <g key={i}>
            <rect x={x + bw * 0.18} y={y(v)} width={bw * 0.64} height={base - y(v)} rx="3" fill={hl ? '#d97706' : '#0284c7'} />
            {values.length <= 11 && (
              <text x={x + bw / 2} y={y(v) - 5} fontSize="10" textAnchor="middle" fontWeight="bold" fill={INK}>
                {hu(v, values.length > 6 ? 3 : 4)}
              </text>
            )}
            <text x={x + bw / 2} y={base + 15} fontSize="11" textAnchor="middle" fill={INK}>
              {i}
            </text>
          </g>
        );
      })}
      <text x={(left + right) / 2} y={base + 32} fontSize="11" textAnchor="middle" fill={MUTED}>
        {xTitle}
      </text>
      {note && (
        <text x={(left + right) / 2} y={base + 48} fontSize="11" textAnchor="middle" fill="#b45309">
          {note}
        </text>
      )}
    </svg>
  );
};

// 4. ábra: Ferkó öt lövése – a találatok számának eloszlása
export const SamplingWithReplacementFerkoChartSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <ProbBars
    values={FERKO}
    yMax={0.5}
    ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5]}
    xTitle="elért találat (5 lövésből, p = 0,15)"
    title="Ferkó öt lövése: a találatok számának valószínűsége"
    note="A legvalószínűbb a 0 találat (≈ 44%), de majdnem ugyanennyi az 1 találat (≈ 39%)."
    className={className}
  />
);

const COIN10 = Array.from({ length: 11 }, (_, k) => C(10, k) / 1024);

// 5. ábra: Jocó érvelése – 10 érmedobás, a fejek száma
export const SamplingWithReplacementCoinTenSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <ProbBars
    values={COIN10}
    highlight={[5]}
    yMax={0.3}
    ticks={[0, 0.1, 0.2, 0.3]}
    xTitle="fejek száma 10 dobásból"
    title="10 érmedobás: ugyanannyi fej és írás valószínűsége"
    note="P(5 fej, 5 írás) = (10 alatt 5) / 2¹⁰ = 252/1024 ≈ 0,246 – nem 0,5!"
    className={className}
  />
);
