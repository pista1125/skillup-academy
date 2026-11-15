import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** Görbe pontjai egy adott koordináta-transzformációval. */
const curvePath = (f: (t: number) => number, t0: number, t1: number, sx: (t: number) => number, sy: (y: number) => number, n = 80) => {
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const t = t0 + ((t1 - t0) * i) / n;
    pts.push(`${i === 0 ? 'M' : 'L'}${sx(t).toFixed(1)},${sy(f(t)).toFixed(1)}`);
  }
  return pts.join(' ');
};

// 1. ábra: a kávé hűlése, K(t) = 60 · 0,87^t (3. feladat)
export const CoffeeCoolingSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x0 = 60;
  const y0 = 230;
  const sx = (t: number) => x0 + t * 34;
  const sy = (k: number) => y0 - k * 3.2;
  const half = Math.log10(0.5) / Math.log10(0.87);
  return (
    <svg viewBox="0 0 560 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="270" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Newton-féle hűlési törvény: K(t) = 60 · 0,87ᵗ
      </text>
      {[0, 2, 4, 6, 8, 10, 12].map((t) => (
        <g key={t}>
          <line x1={sx(t)} y1={y0} x2={sx(t)} y2={y0 + 5} stroke="#475569" />
          <text x={sx(t)} y={y0 + 18} fontSize="11" textAnchor="middle" fill="#334155">{t}</text>
        </g>
      ))}
      {[0, 30, 60].map((k) => (
        <g key={k}>
          <line x1={x0 - 5} y1={sy(k)} x2={x0} y2={sy(k)} stroke="#475569" />
          <text x={x0 - 9} y={sy(k) + 4} fontSize="11" textAnchor="end" fill="#334155">{k}</text>
        </g>
      ))}
      <line x1={x0} y1={y0} x2={sx(13.6)} y2={y0} stroke="#475569" strokeWidth="1.5" />
      <line x1={x0} y1={y0} x2={x0} y2={sy(66)} stroke="#475569" strokeWidth="1.5" />
      <text x={sx(13.6)} y={y0 + 34} fontSize="11" textAnchor="end" fill="#334155">t (perc)</text>
      <text x={x0 + 6} y={sy(66) + 4} fontSize="11" fill="#334155">K (°C)</text>
      <line x1={x0} y1={sy(30)} x2={sx(half)} y2={sy(30)} stroke="#db2777" strokeDasharray="5 4" />
      <line x1={sx(half)} y1={sy(30)} x2={sx(half)} y2={y0} stroke="#db2777" strokeDasharray="5 4" />
      <path d={curvePath((t) => 60 * Math.pow(0.87, t), 0, 13, sx, sy)} fill="none" stroke="#7c3aed" strokeWidth="3" />
      <circle cx={sx(half)} cy={sy(30)} r="4.5" fill="#db2777" />
      <text x={sx(half) + 8} y={sy(30) - 8} fontSize="12" fontWeight="bold" fill="#9d174d">felére: t ≈ 4,98 perc</text>
      <rect x="330" y="60" width="210" height="62" rx="10" fill="#ede9fe" stroke="#7c3aed" />
      <text x="435" y="82" fontSize="12" textAnchor="middle" fill="#4c1d95">szoba: 20 °C, kávé kezdetben 80 °C</text>
      <text x="435" y="104" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#4c1d95">T(t) = 20 + K(t)</text>
    </svg>
  );
};

// 2. ábra: légnyomás a magasság függvényében, p(x) = 1,013 · 10⁵ · 1,133^(−x)
export const PressureAltitudeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x0 = 70;
  const y0 = 230;
  const sx = (x: number) => x0 + x * 46;
  const sy = (p: number) => y0 - (p / 1000) * 1.85;
  const p = (x: number) => 1.013e5 * Math.pow(1.133, -x);
  const peaks = [
    { name: 'Kékestető', h: 1.014, lab: '1,014 km' },
    { name: 'Mont Blanc', h: 4.806, lab: '4,806 km' },
    { name: 'Csomolungma', h: 8.849, lab: '8,849 km' }
  ];
  return (
    <svg viewBox="0 0 560 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="270" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        p(x) = 1,013 · 10⁵ · 1,133⁻ˣ (Pa), x: magasság km-ben
      </text>
      <line x1={x0} y1={y0} x2={sx(10.3)} y2={y0} stroke="#475569" strokeWidth="1.5" />
      <line x1={x0} y1={y0} x2={x0} y2={sy(112000)} stroke="#475569" strokeWidth="1.5" />
      {[0, 2, 4, 6, 8, 10].map((x) => (
        <g key={x}>
          <line x1={sx(x)} y1={y0} x2={sx(x)} y2={y0 + 5} stroke="#475569" />
          <text x={sx(x)} y={y0 + 18} fontSize="11" textAnchor="middle" fill="#334155">{x}</text>
        </g>
      ))}
      {[0, 50000, 100000].map((v) => (
        <g key={v}>
          <line x1={x0 - 5} y1={sy(v)} x2={x0} y2={sy(v)} stroke="#475569" />
          <text x={x0 - 9} y={sy(v) + 4} fontSize="10" textAnchor="end" fill="#334155">{v.toLocaleString('hu-HU')}</text>
        </g>
      ))}
      <text x={sx(10.3)} y={y0 + 34} fontSize="11" textAnchor="end" fill="#334155">x (km)</text>
      <path d={curvePath(p, 0, 10, sx, sy)} fill="none" stroke="#0f766e" strokeWidth="3" />
      {peaks.map((pk) => (
        <g key={pk.name}>
          <line x1={sx(pk.h)} y1={y0} x2={sx(pk.h)} y2={sy(p(pk.h))} stroke="#94a3b8" strokeDasharray="4 3" />
          <circle cx={sx(pk.h)} cy={sy(p(pk.h))} r="4.5" fill="#7c3aed" />
          <text x={sx(pk.h) + 6} y={sy(p(pk.h)) - 10} fontSize="11" fontWeight="bold" fill="#4c1d95">{pk.name}</text>
          <text x={sx(pk.h) + 6} y={sy(p(pk.h)) + 4} fontSize="10" fill="#475569">{pk.lab}</text>
        </g>
      ))}
    </svg>
  );
};

// 3. ábra: 1,065^k = 3,45 – a k két szomszédos egész között
export const LogBetweenIntegersSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const sx = (k: number) => 60 + (k - 17) * 110;
  const k = Math.log10(3.45) / Math.log10(1.065);
  return (
    <svg viewBox="0 0 560 220" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="210" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        1,065ᵏ = 3,45  ⇒  k = lg 3,45 / lg 1,065
      </text>
      <line x1="40" y1="120" x2="520" y2="120" stroke="#475569" strokeWidth="2" />
      {[17, 18, 19, 20, 21].map((n) => (
        <g key={n}>
          <line x1={sx(n)} y1="113" x2={sx(n)} y2="127" stroke="#475569" strokeWidth="2" />
          <text x={sx(n)} y="146" fontSize="13" textAnchor="middle" fill="#334155">{n}</text>
          <text x={sx(n)} y="168" fontSize="10" textAnchor="middle" fill="#64748b">
            {Math.pow(1.065, n).toFixed(2).replace('.', ',')}
          </text>
        </g>
      ))}
      <text x="40" y="168" fontSize="10" fill="#64748b">1,065ⁿ:</text>
      <rect x={sx(19)} y="110" width={sx(20) - sx(19)} height="20" fill="#ede9fe" opacity="0.8" />
      <circle cx={sx(k)} cy="120" r="6" fill="#db2777" />
      <text x={sx(k)} y="96" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#9d174d">k ≈ 19,66</text>
      <text x="280" y="198" fontSize="12" textAnchor="middle" fill="#4c1d95">1,065¹⁹ ≈ 3,31 &lt; 3,45 &lt; 3,52 ≈ 1,065²⁰</text>
    </svg>
  );
};

// 4. ábra: információtartalom – Shannon- és Hartley-képlet
export const InformationBitsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = [
    { p: '1/2', i: '1 bit' },
    { p: '1/4', i: '2 bit' },
    { p: '1/8', i: '3 bit' },
    { p: '1/16', i: '4 bit' }
  ];
  return (
    <svg viewBox="0 0 560 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="25" y="20" width="250" height="210" rx="12" fill="#ffffff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="150" y="44" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#4c1d95">Shannon: I = −log₂ p</text>
      <text x="85" y="70" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#334155">p</text>
      <text x="215" y="70" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#334155">I</text>
      {rows.map((r, i) => (
        <g key={r.p}>
          <rect x="45" y={80 + i * 34} width="210" height="28" rx="6" fill={i === 2 ? '#fce7f3' : '#f5f3ff'} />
          <text x="85" y={99 + i * 34} fontSize="13" textAnchor="middle" fill="#0f172a">{r.p}</text>
          <text x="215" y={99 + i * 34} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#6d28d9">{r.i}</text>
        </g>
      ))}
      <rect x="290" y="20" width="250" height="210" rx="12" fill="#ffffff" stroke="#0f766e" strokeWidth="1.5" />
      <text x="415" y="44" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#115e59">Hartley: H = n · log₂ N</text>
      <text x="415" y="78" fontSize="12" textAnchor="middle" fill="#334155">N: a jelkészlet elemszáma</text>
      <text x="415" y="98" fontSize="12" textAnchor="middle" fill="#334155">n: a jelsorozat hossza</text>
      {['0', '1', '2', '7'].map((d, i) => (
        <g key={i}>
          <rect x={343 + i * 38} y="118" width="30" height="36" rx="6" fill="#ccfbf1" stroke="#0f766e" />
          <text x={358 + i * 38} y="142" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#115e59">{d}</text>
        </g>
      ))}
      <text x="415" y="180" fontSize="12" textAnchor="middle" fill="#334155">4 jegyű PIN-kód: N = 10, n = 4</text>
      <text x="415" y="204" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#115e59">H = 4 · log₂ 10 ≈ 13,29 bit</text>
    </svg>
  );
};

// 5. ábra: Napier ötlete – szorzás helyett összeadás a logaritmusokkal
export const NapierIdeaSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 560 230" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height="220" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      Ráadás: logaritmustáblázat (Napier 1614, Briggs 1617)
    </text>
    <rect x="30" y="55" width="150" height="50" rx="10" fill="#ede9fe" stroke="#7c3aed" />
    <text x="105" y="86" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#4c1d95">200 · 50 = ?</text>
    <rect x="205" y="55" width="150" height="50" rx="10" fill="#ffffff" stroke="#0f766e" />
    <text x="280" y="78" fontSize="12" textAnchor="middle" fill="#115e59">táblázatból:</text>
    <text x="280" y="96" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#115e59">lg 200 ≈ 2,301; lg 50 ≈ 1,699</text>
    <rect x="380" y="55" width="150" height="50" rx="10" fill="#fef3c7" stroke="#d97706" />
    <text x="455" y="78" fontSize="12" textAnchor="middle" fill="#92400e">összeadás:</text>
    <text x="455" y="96" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#92400e">2,301 + 1,699 = 4</text>
    <line x1="180" y1="80" x2="205" y2="80" stroke="#475569" strokeWidth="1.5" />
    <line x1="355" y1="80" x2="380" y2="80" stroke="#475569" strokeWidth="1.5" />
    <path d="M455 105 L455 140 L280 140" fill="none" stroke="#475569" strokeWidth="1.5" />
    <polygon points="280,140 288,136 288,144" fill="#475569" />
    <rect x="130" y="125" width="150" height="40" rx="10" fill="#fce7f3" stroke="#db2777" />
    <text x="205" y="150" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#9d174d">10⁴ = 10 000</text>
    <text x="280" y="195" fontSize="12" textAnchor="middle" fill="#475569">
      A sokjegyű számok szorzását a logaritmusok összeadására vezették vissza,
    </text>
    <text x="280" y="212" fontSize="12" textAnchor="middle" fill="#475569">majd a táblázatból visszakeresték az eredményt.</text>
  </svg>
);
