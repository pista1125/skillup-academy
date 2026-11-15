import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ title: string; h: number; children: React.ReactNode; className: string }> = ({ title, h, children, className }) => (
  <svg viewBox={`0 0 560 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height={h - 10} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      {title}
    </text>
    {children}
  </svg>
);

const hu = (x: number, d = 1) => Number(x.toFixed(d)).toString().replace('.', ',');

/** Útvonal a t ↦ N0·kᵗ függvényhez (X, Y: képernyő-transzformáció). */
const pathOf = (f: (t: number) => number, t0: number, t1: number, X: (t: number) => number, Y: (v: number) => number) => {
  let d = '';
  for (let i = 0; i <= 200; i++) {
    const t = t0 + ((t1 - t0) * i) / 200;
    d += `${i === 0 ? 'M' : 'L'} ${X(t).toFixed(1)} ${Y(f(t)).toFixed(1)} `;
  }
  return d;
};

/** Bevezető: 250 ezer Ft évi 4%-kal – az értelmezési tartomány egész évekből áll. */
export const ExponentialProcessesBankSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const X = (t: number) => 70 + t * 44;
  const Y = (v: number) => 250 - (v / 400) * 200;
  return (
    <Frame title="t ↦ 250 · 1,04ᵗ (ezer Ft): a pénz exponenciálisan nő" h={290} className={className}>
      <line x1="60" y1="250" x2="530" y2="250" stroke="#64748b" strokeWidth="1.5" />
      <line x1="60" y1="250" x2="60" y2="45" stroke="#64748b" strokeWidth="1.5" />
      <path d={pathOf((t) => 250 * Math.pow(1.04, t), 0, 10, X, Y)} fill="none" stroke="#c4b5fd" strokeWidth="2" strokeDasharray="5 4" />
      {Array.from({ length: 11 }, (_, t) => (
        <g key={t}>
          <circle cx={X(t)} cy={Y(250 * Math.pow(1.04, t))} r="5" fill="#7c3aed" />
          <text x={X(t)} y="266" fontSize="10" textAnchor="middle" fill="#475569">
            {t}
          </text>
        </g>
      ))}
      {[0, 5, 10].map((t) => (
        <text key={t} x={X(t)} y={Y(250 * Math.pow(1.04, t)) - 10} fontSize="11" textAnchor="middle" fill="#4c1d95" fontWeight="bold">
          {hu(250 * Math.pow(1.04, t))}
        </text>
      ))}
      <text x="56" y={Y(250) + 4} fontSize="10" textAnchor="end" fill="#475569">
        250
      </text>
      <text x="56" y={Y(400) + 4} fontSize="10" textAnchor="end" fill="#475569">
        400
      </text>
      <text x="300" y="283" fontSize="11" textAnchor="middle" fill="#475569">
        t (év) – csak egész évek: az értelmezési tartomány N egy részhalmaza
      </text>
    </Frame>
  );
};

/** Elmélet: exponenciálisan növekvő és csökkenő folyamat, kezdeti érték és növekedési tényező. */
export const ExponentialProcessesGrowthDecaySvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const X = (t: number) => 60 + t * 60;
  const Y = (v: number) => 250 - v * 32;
  return (
    <Frame title="N(t) = N₀ · kᵗ: k > 1 növekvő, 0 < k < 1 csökkenő" h={290} className={className}>
      {[1, 2, 3, 4, 5, 6, 7].map((t) => (
        <line key={t} x1={X(t)} y1="45" x2={X(t)} y2="250" stroke="#e2e8f0" />
      ))}
      <line x1="60" y1="250" x2="530" y2="250" stroke="#64748b" strokeWidth="1.5" />
      <line x1="60" y1="255" x2="60" y2="40" stroke="#64748b" strokeWidth="1.5" />
      <path d={pathOf((t) => 0.38 * Math.pow(1.22, t), 0, 7.6, X, Y)} fill="none" stroke="#e11d48" strokeWidth="3" />
      <path d={pathOf((t) => 5.67 * Math.pow(0.79, t), 0, 7.6, X, Y)} fill="none" stroke="#0ea5e9" strokeWidth="3" />
      <circle cx={X(0)} cy={Y(0.38)} r="5" fill="#e11d48" />
      <circle cx={X(0)} cy={Y(5.67)} r="5" fill="#0ea5e9" />
      <text x="68" y={Y(0.38) - 8} fontSize="11" fill="#e11d48" fontWeight="bold">
        N₀ = 0,38
      </text>
      <text x="68" y={Y(5.67) - 8} fontSize="11" fill="#0369a1" fontWeight="bold">
        N₀ = 5,67
      </text>
      <text x="520" y="75" fontSize="12" textAnchor="end" fill="#e11d48" fontWeight="bold">
        E(t) = 0,38 · 1,22ᵗ (k = 1,22)
      </text>
      <text x="520" y="225" fontSize="12" textAnchor="end" fill="#0369a1" fontWeight="bold">
        F(t) = 5,67 · 0,79ᵗ (k = 0,79)
      </text>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((t) => (
        <text key={t} x={X(t)} y="266" fontSize="10" textAnchor="middle" fill="#475569">
          {t}
        </text>
      ))}
      <text x="300" y="283" fontSize="11" textAnchor="middle" fill="#475569">
        idő (t) — egységnyi idő alatt k-szorosára változik a mennyiség
      </text>
    </Frame>
  );
};

/** 3. feladat: baktériumtenyészet, 120 millió → 180 millió egy óra alatt. */
export const ExponentialProcessesBacteriaSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const X = (t: number) => 280 + t * 70;
  const Y = (v: number) => 255 - (v / 420) * 210;
  const N = (t: number) => 120 * Math.pow(1.5, t);
  const marks = [-3, 0, 0.5, 1, 3];
  return (
    <Frame title="Baktériumok: N(t) = 120 · 1,5ᵗ millió (t órában)" h={295} className={className}>
      {[-3, -2, -1, 1, 2, 3].map((t) => (
        <g key={t}>
          <line x1={X(t)} y1="40" x2={X(t)} y2="255" stroke="#e2e8f0" />
          <text x={X(t)} y="270" fontSize="10" textAnchor="middle" fill="#475569">
            {String(t).replace('-', '−')}
          </text>
        </g>
      ))}
      <line x1="60" y1="255" x2="510" y2="255" stroke="#64748b" strokeWidth="1.5" />
      <line x1={X(0)} y1="260" x2={X(0)} y2="38" stroke="#64748b" strokeWidth="1.5" />
      <path d={pathOf(N, -3.3, 3.1, X, Y)} fill="none" stroke="#059669" strokeWidth="3" />
      {marks.map((t) => (
        <g key={t}>
          <circle cx={X(t)} cy={Y(N(t))} r="5" fill={t === 0 || t === 1 ? '#7c3aed' : '#be185d'} />
          <text
            x={X(t) + (t === 3 ? -8 : 8)}
            y={Y(N(t)) - 8}
            fontSize="11"
            textAnchor={t === 3 ? 'end' : 'start'}
            fill={t === 0 || t === 1 ? '#6d28d9' : '#9d174d'}
            fontWeight="bold"
          >
            {hu(N(t))}
          </text>
        </g>
      ))}
      <text x="70" y="60" fontSize="11" fill="#334155">
        mérés: t = 0 → 120 millió, t = 1 → 180 millió
      </text>
      <text x="70" y="76" fontSize="11" fill="#334155">
        k = 180 / 120 = 1,5 (óránként 1,5-szeres)
      </text>
      <text x="300" y="288" fontSize="11" textAnchor="middle" fill="#475569">
        t (óra) — negatív t: az első mérés előtti időpont
      </text>
    </Frame>
  );
};

/** 4. feladat: népességcsökkenés évi 0,2%-kal, 2001 → 2006 → 2011. */
export const ExponentialProcessesPopulationSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const box = (x: number, label: string) => (
    <g>
      <rect x={x - 55} y="100" width="110" height="46" rx="10" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
      <text x={x} y="129" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#4c1d95">
        {label}
      </text>
    </g>
  );
  return (
    <Frame title="Évente az előző évi szám 99,8%-a: mindig szorzunk, nem összeadunk" h={240} className={className}>
      <defs>
        <marker id="epArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#334155" />
        </marker>
      </defs>
      {box(90, '2001')}
      {box(280, '2006')}
      {box(470, '2011')}
      <path d="M150 112 L222 112" stroke="#334155" strokeWidth="2" markerEnd="url(#epArrow)" />
      <text x="186" y="96" fontSize="12" textAnchor="middle" fill="#059669" fontWeight="bold">
        × 0,998⁵
      </text>
      <path d="M340 112 L412 112" stroke="#334155" strokeWidth="2" markerEnd="url(#epArrow)" />
      <text x="376" y="96" fontSize="12" textAnchor="middle" fill="#059669" fontWeight="bold">
        × 0,998⁵
      </text>
      <path d="M412 136 L340 136" stroke="#be185d" strokeWidth="2" markerEnd="url(#epArrow)" />
      <text x="376" y="164" fontSize="12" textAnchor="middle" fill="#be185d" fontWeight="bold">
        × 0,998⁻⁵
      </text>
      <text x="280" y="196" fontSize="12" textAnchor="middle" fill="#334155">
        Egy év visszafelé: osztás 0,998-dal, azaz szorzás 1/0,998 ≈ 1,002004-del (nem pontosan 1,002!)
      </text>
      <text x="280" y="216" fontSize="12" textAnchor="middle" fill="#b91c1c">
        5 év alatt nem 5 · 0,2% = 1% a csökkenés, hanem 1 − 0,998⁵ ≈ 0,996%
      </text>
    </Frame>
  );
};

/** HF 3.: a város lakossága 1900–2000 – exponenciális és lineáris növekedés. */
export const ExponentialProcessesCitySvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const X = (t: number) => 70 + t * 4.4;
  const Y = (v: number) => 250 - (v / 280) * 200;
  const E = (t: number) => 20 * Math.pow(1.026, t);
  const slope = (E(100) - 20) / 100;
  return (
    <Frame title="Város lakossága (ezer fő): 20 · 1,026ᵗ vagy lineáris növekedés?" h={290} className={className}>
      {[0, 20, 40, 60, 80, 100].map((t) => (
        <g key={t}>
          <line x1={X(t)} y1="45" x2={X(t)} y2="250" stroke="#e2e8f0" />
          <text x={X(t)} y="266" fontSize="10" textAnchor="middle" fill="#475569">
            {1900 + t}
          </text>
        </g>
      ))}
      {[100, 200].map((v) => (
        <text key={v} x="64" y={Y(v) + 4} fontSize="10" textAnchor="end" fill="#475569">
          {v}
        </text>
      ))}
      <line x1="60" y1="250" x2="530" y2="250" stroke="#64748b" strokeWidth="1.5" />
      <line x1="70" y1="255" x2="70" y2="40" stroke="#64748b" strokeWidth="1.5" />
      <path d={`M ${X(0)} ${Y(20)} L ${X(100)} ${Y(E(100))}`} stroke="#0ea5e9" strokeWidth="2.5" />
      <path d={pathOf(E, 0, 100, X, Y)} fill="none" stroke="#7c3aed" strokeWidth="3" />
      {[20, 40, 60, 80].map((t) => (
        <g key={t}>
          <circle cx={X(t)} cy={Y(E(t))} r="4" fill="#7c3aed" />
          <circle cx={X(t)} cy={Y(20 + slope * t)} r="4" fill="#0ea5e9" />
        </g>
      ))}
      <circle cx={X(100)} cy={Y(E(100))} r="5" fill="#be185d" />
      <text x={X(100) - 6} y={Y(E(100)) - 8} fontSize="11" textAnchor="end" fill="#be185d" fontWeight="bold">
        2000: ≈ 260,5 ezer
      </text>
      <text x={X(30)} y={Y(150)} fontSize="11" fill="#0369a1" fontWeight="bold">
        lineáris
      </text>
      <text x={X(72)} y={Y(70)} fontSize="11" fill="#6d28d9" fontWeight="bold">
        exponenciális
      </text>
    </Frame>
  );
};
