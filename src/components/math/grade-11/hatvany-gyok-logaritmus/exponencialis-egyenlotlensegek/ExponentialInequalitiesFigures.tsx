import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const poly = (f: (x: number) => number, x0: number, x1: number, X: (x: number) => number, Y: (y: number) => number, n = 80) =>
  Array.from({ length: n + 1 }, (_, i) => x0 + ((x1 - x0) * i) / n)
    .map((x) => `${X(x).toFixed(1)},${Y(f(x)).toFixed(1)}`)
    .join(' ');

// 1. ábra: kidolgozott feladat – x ↦ 1,002ˣ, a 1,15 < 1,002ˣ < 1,2 sáv
export const StockModelSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const X = (x: number) => 60 + (x / 120) * 450;
  const Y = (y: number) => 220 - ((y - 0.95) / 0.32) * 180;
  const x1 = Math.log10(1.15) / Math.log10(1.002);
  const x2 = Math.log10(1.2) / Math.log10(1.002);
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="26" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        1,15 &lt; 1,002ˣ &lt; 1,2  (2300 &lt; 2000 · 1,002ˣ &lt; 2400)
      </text>
      <rect x="60" y={Y(1.2)} width="450" height={Y(1.15) - Y(1.2)} fill="#fce7f3" opacity="0.8" />
      <rect x={X(x1)} y="40" width={X(x2) - X(x1)} height="180" fill="#ede9fe" opacity="0.7" />
      {[1, 1.15, 1.2].map((v) => (
        <g key={v}>
          <line x1="60" y1={Y(v)} x2="510" y2={Y(v)} stroke={v === 1 ? '#e2e8f0' : '#db2777'} strokeDasharray={v === 1 ? '' : '4 3'} />
          <text x="54" y={Y(v) + 4} fontSize="11" textAnchor="end" fill="#334155">{String(v).replace('.', ',')}</text>
        </g>
      ))}
      <line x1="60" y1="220" x2="520" y2="220" stroke="#334155" strokeWidth="1.5" />
      <line x1="60" y1="225" x2="60" y2="36" stroke="#334155" strokeWidth="1.5" />
      <text x="525" y="236" fontSize="11" fill="#334155">x (nap)</text>
      <polyline points={poly((x) => Math.pow(1.002, x), 0, 120, X, Y)} fill="none" stroke="#7c3aed" strokeWidth="3" />
      {[x1, x2].map((x, i) => (
        <g key={i}>
          <line x1={X(x)} y1={Y(Math.pow(1.002, x))} x2={X(x)} y2="220" stroke="#7c3aed" strokeDasharray="4 3" />
          <circle cx={X(x)} cy={Y(Math.pow(1.002, x))} r="4.5" fill="#7c3aed" />
          <text x={X(x)} y="236" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#4c1d95">{i ? '91,25' : '69,95'}</text>
        </g>
      ))}
      <line x1={X(x1)} y1="248" x2={X(x2)} y2="248" stroke="#7c3aed" strokeWidth="4" />
      <text x={X(110)} y="80" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#4c1d95">y = 1,002ˣ</text>
    </svg>
  );
};

// 2. ábra: monotonitás – a > 1 esetén marad, 0 < a < 1 esetén megfordul a relációjel
export const MonotonicityRuleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const panel = (ox: number, a: number, title: string, rule: string, color: string) => {
    const X = (x: number) => ox + 125 + x * 30;
    const Y = (y: number) => 200 - y * 30;
    const f = (x: number) => Math.pow(a, x);
    const xa = a > 1 ? 0.5 : -2;
    const xb = a > 1 ? 2 : -0.5;
    return (
      <g>
        <text x={ox + 125} y="34" fontSize="13" textAnchor="middle" fontWeight="bold" fill={color}>{title}</text>
        <line x1={ox + 15} y1={Y(0)} x2={ox + 240} y2={Y(0)} stroke="#334155" strokeWidth="1.3" />
        <line x1={X(0)} y1={Y(0) + 5} x2={X(0)} y2="44" stroke="#334155" strokeWidth="1.3" />
        <polyline points={poly(f, -3.5, 3.5, X, Y).split(' ').filter((p) => Number(p.split(',')[1]) > 44).join(' ')} fill="none" stroke={color} strokeWidth="3" />
        {[xa, xb].map((x, i) => (
          <g key={i}>
            <line x1={X(x)} y1={Y(0)} x2={X(x)} y2={Y(f(x))} stroke="#64748b" strokeDasharray="3 2" />
            <line x1={X(0)} y1={Y(f(x))} x2={X(x)} y2={Y(f(x))} stroke="#64748b" strokeDasharray="3 2" />
            <circle cx={X(x)} cy={Y(f(x))} r="3.5" fill={color} />
            <text x={X(x)} y={Y(0) + 14} fontSize="11" textAnchor="middle" fill="#334155">{i ? 'x₂' : 'x₁'}</text>
          </g>
        ))}
        <text x={ox + 125} y="232" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f172a">{rule}</text>
      </g>
    );
  };
  return (
    <svg viewBox="0 0 560 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      {panel(20, 2, 'a > 1: szigorúan növő', 'x₁ < x₂ ⇔ f(x₁) < f(x₂)', '#7c3aed')}
      {panel(290, 0.5, '0 < a < 1: szigorúan csökkenő', 'x₁ < x₂ ⇔ f(x₁) > f(x₂)', '#db2777')}
      <line x1="280" y1="40" x2="280" y2="215" stroke="#cbd5e1" />
    </svg>
  );
};

// 3. ábra: 1. feladat – x ↦ 1,2ˣ grafikonja, leolvasás: 1,2ˣ ≥ 1,44 és 1,2ˣ < 1
export const GraphReadingSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const X = (x: number) => 280 + x * 40;
  const Y = (y: number) => 215 - y * 70;
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="26" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">y = 1,2ˣ: hol van a grafikon az y = 1,44 egyenes fölött?</text>
      {Array.from({ length: 13 }, (_, i) => i - 6).map((i) => (
        <line key={i} x1={X(i)} y1={Y(0)} x2={X(i)} y2={Y(2.5)} stroke="#e2e8f0" />
      ))}
      <line x1={X(-6.3)} y1={Y(0)} x2={X(6.4)} y2={Y(0)} stroke="#334155" strokeWidth="1.5" />
      <line x1={X(0)} y1={Y(-0.05)} x2={X(0)} y2={Y(2.6)} stroke="#334155" strokeWidth="1.5" />
      {[-6, -4, -2, 2, 4, 6].map((i) => (
        <text key={i} x={X(i)} y={Y(0) + 15} fontSize="11" textAnchor="middle" fill="#334155">{i < 0 ? `−${-i}` : i}</text>
      ))}
      <text x={X(0) - 6} y={Y(1) + 4} fontSize="11" textAnchor="end" fill="#334155">1</text>
      <text x={X(0) - 6} y={Y(1.44) + 4} fontSize="11" textAnchor="end" fontWeight="bold" fill="#db2777">1,44</text>
      <line x1={X(-6.3)} y1={Y(1.44)} x2={X(6.4)} y2={Y(1.44)} stroke="#db2777" strokeDasharray="5 3" strokeWidth="1.5" />
      <polyline points={poly((x) => Math.pow(1.2, x), -6.3, 5.1, X, Y)} fill="none" stroke="#7c3aed" strokeWidth="3" />
      <circle cx={X(2)} cy={Y(1.44)} r="5" fill="#db2777" />
      <line x1={X(2)} y1={Y(0) + 26} x2={X(6.4)} y2={Y(0) + 26} stroke="#7c3aed" strokeWidth="5" />
      <circle cx={X(2)} cy={Y(0) + 26} r="5" fill="#7c3aed" />
      <text x={X(4.2)} y={Y(0) + 22} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#4c1d95">x ≥ 2</text>
      <text x={X(-4.2)} y={Y(1.44) - 10} fontSize="12" textAnchor="middle" fill="#334155">1,2² = 1,44</text>
    </svg>
  );
};

// 4. ábra: 4. feladat – korosztályok P(x) = 50 · 0,94ˣ millió fő, 40 < x < 75
export const AgeDistributionSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const ages = Array.from({ length: 34 }, (_, i) => 41 + i);
  const X = (x: number) => 60 + (x - 40) * 13.2;
  const Y = (y: number) => 220 - (y / 5) * 180;
  const lim = Math.log10(0.02) / Math.log10(0.94);
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="26" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        P(x) = 50 · 0,94ˣ (millió fő), 40 &lt; x &lt; 75
      </text>
      {[0, 1, 2, 3, 4, 5].map((v) => (
        <g key={v}>
          <line x1="60" y1={Y(v)} x2="515" y2={Y(v)} stroke="#e2e8f0" />
          <text x="54" y={Y(v) + 4} fontSize="10" textAnchor="end" fill="#64748b">{v}</text>
        </g>
      ))}
      {ages.map((a) => (
        <rect key={a} x={X(a) - 5.5} y={Y(50 * Math.pow(0.94, a))} width="11" height={220 - Y(50 * Math.pow(0.94, a))} fill={a < lim ? '#7c3aed' : '#c4b5fd'} />
      ))}
      <line x1="60" y1={Y(1)} x2="515" y2={Y(1)} stroke="#db2777" strokeWidth="2" strokeDasharray="5 3" />
      <text x="512" y={Y(1) - 6} fontSize="11" textAnchor="end" fontWeight="bold" fill="#9d174d">1 millió</text>
      <line x1="60" y1="220" x2="520" y2="220" stroke="#334155" strokeWidth="1.5" />
      {[45, 50, 55, 60, 65, 70].map((a) => (
        <text key={a} x={X(a)} y="236" fontSize="10" textAnchor="middle" fill="#64748b">{a}</text>
      ))}
      <text x="520" y="250" fontSize="10" textAnchor="end" fill="#334155">életkor (év)</text>
    </svg>
  );
};

// 5. ábra: házi feladat 3. – tigrisek t(x) = 3600 · 0,854ˣ, 900 alá csökkenés
export const TigerDeclineSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const X = (x: number) => 60 + (x / 12) * 450;
  const Y = (y: number) => 220 - (y / 4000) * 180;
  const xs = Math.log10(0.25) / Math.log10(0.854);
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="26" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Tigrisek Indiában: t(x) = 3600 · 0,854ˣ (x: évek 2014 vége óta)
      </text>
      {[0, 900, 2000, 3000, 4000].map((v) => (
        <g key={v}>
          <line x1="60" y1={Y(v)} x2="515" y2={Y(v)} stroke={v === 900 ? '#db2777' : '#e2e8f0'} strokeDasharray={v === 900 ? '5 3' : ''} strokeWidth={v === 900 ? 2 : 1} />
          <text x="54" y={Y(v) + 4} fontSize="10" textAnchor="end" fill={v === 900 ? '#9d174d' : '#64748b'}>{v}</text>
        </g>
      ))}
      {Array.from({ length: 13 }, (_, x) => (
        <g key={x}>
          <circle cx={X(x)} cy={Y(3600 * Math.pow(0.854, x))} r="4" fill={x > xs ? '#db2777' : '#7c3aed'} />
          <text x={X(x)} y="236" fontSize="9" textAnchor="middle" fill="#64748b">{2014 + x}</text>
        </g>
      ))}
      <polyline points={poly((x) => 3600 * Math.pow(0.854, x), 0, 12, X, Y)} fill="none" stroke="#7c3aed" strokeWidth="2" opacity="0.6" />
      <line x1="60" y1="220" x2="520" y2="220" stroke="#334155" strokeWidth="1.5" />
    </svg>
  );
};
