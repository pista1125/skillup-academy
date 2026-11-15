import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** Hatvány tört kitevővel SVG-ben. */
const FracPow: React.FC<{ x: number; y: number; base: string; e: string; size?: number; fill?: string; anchor?: 'start' | 'middle' | 'end' }> = ({
  x,
  y,
  base,
  e,
  size = 16,
  fill = '#0f172a',
  anchor = 'middle'
}) => (
  <text x={x} y={y} fontSize={size} textAnchor={anchor} fontWeight="bold" fill={fill}>
    {base}
    <tspan fontSize={size * 0.62} dy={-size * 0.45}>
      {e}
    </tspan>
  </text>
);

// 1. ábra: a világ népessége 2011. június – 2012. június, harmad évenként x-szeres
export const PopulationTwoThirdsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cols = [
    { date: '2011. június', val: '6,98', t: '0' },
    { date: '2011. október', val: '6,98 · x', t: '1/3' },
    { date: '2012. február', val: '6,98 · x²', t: '2/3' },
    { date: '2012. június', val: '6,98 · x³', t: '1' }
  ];
  return (
    <svg viewBox="0 0 560 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Népesség (milliárd fő), x = ∛1,011 ≈ 1,0037
      </text>
      {cols.map((c, i) => (
        <g key={c.date}>
          <rect x={25 + i * 130} y="48" width="120" height="110" rx="10" fill={i === 2 ? '#fce7f3' : '#ffffff'} stroke={i === 2 ? '#db2777' : '#a78bfa'} strokeWidth={i === 2 ? 2.5 : 1.5} />
          <text x={85 + i * 130} y="72" fontSize="12" textAnchor="middle" fill="#334155">{c.date}</text>
          <text x={85 + i * 130} y="100" fontSize="11" textAnchor="middle" fill="#64748b">t = {c.t} év</text>
          <text x={85 + i * 130} y="134" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#4c1d95">{c.val}</text>
        </g>
      ))}
      <rect x="70" y="176" width="420" height="54" rx="12" fill="#ede9fe" stroke="#7c3aed" />
      <text x="280" y="200" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#4c1d95">
        2/3 év alatt: x² = (∛1,011)² = ∛(1,011²) ≈ 1,0073
      </text>
      <text x="280" y="220" fontSize="12" textAnchor="middle" fill="#6d28d9">ezt a szorzót jelöljük így: 1,011^(2/3)</text>
    </svg>
  );
};

// 2. ábra: a^(p/q) két úton – előbb gyök, aztán hatvány, vagy fordítva
export const TwoPathsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 560 270" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height="260" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <FracPow x={280} y={36} base="32" e="3/5" size={22} fill="#4c1d95" />
    <text x="280" y="58" fontSize="11" textAnchor="middle" fill="#64748b">a nevező a gyökkitevő, a számláló a hatványkitevő</text>
    <rect x="30" y="110" width="90" height="46" rx="10" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
    <text x="75" y="140" fontSize="20" textAnchor="middle" fontWeight="bold" fill="#4c1d95">32</text>
    <rect x="235" y="76" width="90" height="42" rx="10" fill="#ffffff" stroke="#0f766e" strokeWidth="2" />
    <text x="280" y="104" fontSize="18" textAnchor="middle" fontWeight="bold" fill="#0f766e">2</text>
    <rect x="225" y="160" width="110" height="42" rx="10" fill="#ffffff" stroke="#c2410c" strokeWidth="2" />
    <text x="280" y="188" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#c2410c">32 768</text>
    <rect x="440" y="110" width="90" height="46" rx="10" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />
    <text x="485" y="140" fontSize="20" textAnchor="middle" fontWeight="bold" fill="#9d174d">8</text>
    <line x1="120" y1="122" x2="235" y2="98" stroke="#0f766e" strokeWidth="2" />
    <text x="170" y="96" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f766e">⁵√</text>
    <line x1="325" y1="98" x2="440" y2="122" stroke="#0f766e" strokeWidth="2" />
    <text x="388" y="96" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f766e">( )³</text>
    <line x1="120" y1="144" x2="225" y2="178" stroke="#c2410c" strokeWidth="2" />
    <text x="160" y="182" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#c2410c">( )³</text>
    <line x1="335" y1="178" x2="440" y2="144" stroke="#c2410c" strokeWidth="2" />
    <text x="398" y="182" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#c2410c">⁵√</text>
    <text x="280" y="232" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      (⁵√32)³ = 2³ = 8   és   ⁵√(32³) = ⁵√32 768 = 8
    </text>
    <text x="280" y="252" fontSize="11" textAnchor="middle" fill="#64748b">az első út (előbb gyök) általában kisebb számokkal dolgozik</text>
  </svg>
);

// 3. ábra: negatív törtkitevő = az ellentett kitevőjű hatvány reciproka
export const NegativeFractionalSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = [
    { l: '32', e: '−3/5', mid: '1 / 32^(3/5)', val: '1/8' },
    { l: '81', e: '−1/2', mid: '1 / 81^(1/2)', val: '1/9' },
    { l: '(1/9)', e: '−3/2', mid: '9^(3/2)', val: '27' }
  ];
  return (
    <svg viewBox="0 0 560 230" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="220" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Negatív kitevő: reciprok, és NEM negatív szám!
      </text>
      {rows.map((r, i) => (
        <g key={r.l}>
          <rect x="30" y={50 + i * 56} width="500" height="44" rx="10" fill={i % 2 ? '#ffffff' : '#f5f3ff'} stroke="#ddd6fe" />
          <FracPow x={100} y={79 + i * 56} base={r.l} e={r.e} size={17} fill="#4c1d95" />
          <text x="185" y={79 + i * 56} fontSize="16" textAnchor="middle" fill="#334155">=</text>
          <text x="300" y={79 + i * 56} fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f766e">{r.mid}</text>
          <text x="410" y={79 + i * 56} fontSize="16" textAnchor="middle" fill="#334155">=</text>
          <text x="470" y={79 + i * 56} fontSize="17" textAnchor="middle" fontWeight="bold" fill="#db2777">{r.val}</text>
        </g>
      ))}
    </svg>
  );
};

// 4. ábra: a hatványozás azonosságai pozitív alapra, racionális kitevőkre (permanenciaelv)
export const IdentityTableSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const ids = [
    { f: 'aᵐ · aⁿ = aᵐ⁺ⁿ', ex: '6,25^(1/3) · 6,25^(1/6) = 6,25^(1/2) = 2,5' },
    { f: 'aᵐ : aⁿ = aᵐ⁻ⁿ', ex: '5^(5/7) : 5^(5/7) = 5⁰ = 1' },
    { f: '(a · b)ⁿ = aⁿ · bⁿ', ex: '(225 · 196)^(1/2) = 15 · 14 = 210' },
    { f: '(a / b)ⁿ = aⁿ / bⁿ', ex: '(81/16)^(1/4) = 3/2' },
    { f: '(aᵐ)ⁿ = aᵐ·ⁿ', ex: '8^(5/3) = (2³)^(5/3) = 2⁵ = 32' }
  ];
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        a, b &gt; 0; m, n racionális – az azonosságok változatlanok
      </text>
      {ids.map((r, i) => (
        <g key={r.f}>
          <rect x="20" y={42 + i * 47} width="190" height="38" rx="8" fill="#7c3aed" />
          <text x="115" y={66 + i * 47} fontSize="15" textAnchor="middle" fontWeight="bold" fill="#ffffff">{r.f}</text>
          <rect x="220" y={42 + i * 47} width="320" height="38" rx="8" fill="#ffffff" stroke="#ddd6fe" />
          <text x="380" y={66 + i * 47} fontSize="12" textAnchor="middle" fill="#334155">{r.ex}</text>
        </g>
      ))}
    </svg>
  );
};

// 5. ábra: gyökkitevő csökkentése a törtkitevő egyszerűsítésével
export const RootIndexReduceSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const steps = ['¹⁵√(7⁶)', '7^(6/15)', '7^(2/5)', '(7²)^(1/5)', '⁵√49'];
  return (
    <svg viewBox="0 0 560 170" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="160" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Kisebb gyökkitevő: egyszerűsítsük a törtkitevőt!
      </text>
      {steps.map((s, i) => (
        <g key={s}>
          <rect x={18 + i * 108} y="56" width="94" height="44" rx="10" fill={i === 0 ? '#ede9fe' : i === 4 ? '#fce7f3' : '#ffffff'} stroke={i === 4 ? '#db2777' : '#7c3aed'} strokeWidth="1.8" />
          <text x={65 + i * 108} y="84" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">{s}</text>
          {i < 4 && <polygon points={`${114 + i * 108},74 ${124 + i * 108},78 ${114 + i * 108},82`} fill="#7c3aed" />}
        </g>
      ))}
      <text x="280" y="130" fontSize="12" textAnchor="middle" fill="#475569">6/15 = 2/5 (egyszerűsítés 3-mal)</text>
      <text x="280" y="150" fontSize="12" textAnchor="middle" fill="#475569">Ugyanígy: ⁸√(6²) = ⁴√6;  ²⁰√(3¹⁰) = √3;  ³⁶√(7⁵⁴) = √(7³)</text>
    </svg>
  );
};
