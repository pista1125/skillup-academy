import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** BSE-modell: E(t) = 500 · 1,056^t, 0 ≤ t ≤ 37 (hónap, t = 0: 1988. december). */
const E = (t: number) => 500 * Math.pow(1.056, t);

// 1. ábra: a BSE-járvány havi új eseteinek stilizált oszlopdiagramja (1985–1997)
export const BseBarChartSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  // stilizált havi értékek: lassú kezdet, exponenciális szakasz 1988 végétől, csúcs 1992 eleje, majd csökkenés
  const months = 12 * 12; // 1986–1997
  const bars: number[] = [];
  for (let m = 0; m < months; m++) {
    let v: number;
    if (m < 36) v = 20 + m * 13; // 1986–1988 vége: ~500-ig
    else if (m < 73) v = E(m - 36); // 1988. dec. – 1992. jan.
    else v = 3800 * Math.pow(0.945, m - 72); // 1992 eleje után csökkenés
    bars.push(Math.min(v, 3900));
  }
  const x0 = 50;
  const w = 470 / months;
  const yOf = (v: number) => 220 - (v / 4000) * 180;
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="26" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        BSE: havonta diagnosztizált új esetek Nagy-Britanniában
      </text>
      {[0, 1000, 2000, 3000, 4000].map((v) => (
        <g key={v}>
          <line x1={x0} y1={yOf(v)} x2={x0 + 470} y2={yOf(v)} stroke="#e2e8f0" />
          <text x={x0 - 6} y={yOf(v) + 4} fontSize="10" textAnchor="end" fill="#64748b">{v}</text>
        </g>
      ))}
      {bars.map((v, i) => (
        <rect
          key={i}
          x={x0 + i * w}
          y={yOf(v)}
          width={Math.max(w - 0.6, 0.8)}
          height={220 - yOf(v)}
          fill={i >= 36 && i <= 73 ? '#7c3aed' : '#c4b5fd'}
        />
      ))}
      <line x1={x0} y1="220" x2={x0 + 470} y2="220" stroke="#334155" strokeWidth="1.5" />
      {Array.from({ length: 12 }, (_, k) => (
        <text key={k} x={x0 + (k + 0.5) * 12 * w} y="236" fontSize="9" textAnchor="middle" fill="#475569">
          {k === 0 ? '1985–86' : 1986 + k}
        </text>
      ))}
      <rect x="62" y="44" width="200" height="38" rx="8" fill="#ede9fe" stroke="#7c3aed" />
      <text x="162" y="60" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#4c1d95">sötét: exponenciális szakasz</text>
      <text x="162" y="75" fontSize="10" textAnchor="middle" fill="#6d28d9">1988. dec. – 1992. jan. (37 hónap)</text>
    </svg>
  );
};

// 2. ábra: az E(t) = 500 · 1,056^t modell grafikonja a két kérdéssel
export const BseModelCurveSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const xOf = (t: number) => 60 + (t / 37) * 440;
  const yOf = (v: number) => 220 - (v / 4000) * 180;
  const pts = Array.from({ length: 75 }, (_, i) => i / 2).map((t) => `${xOf(t).toFixed(1)},${yOf(E(t)).toFixed(1)}`);
  const t3000 = Math.log10(6) / Math.log10(1.056);
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="26" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        E(t) = 500 · 1,056ᵗ  (t: hónap 1988 decembere óta)
      </text>
      {[0, 1000, 2000, 3000, 4000].map((v) => (
        <g key={v}>
          <line x1="60" y1={yOf(v)} x2="500" y2={yOf(v)} stroke="#e2e8f0" />
          <text x="54" y={yOf(v) + 4} fontSize="10" textAnchor="end" fill="#64748b">{v}</text>
        </g>
      ))}
      {[0, 5, 10, 15, 20, 25, 30, 35].map((t) => (
        <text key={t} x={xOf(t)} y="236" fontSize="10" textAnchor="middle" fill="#64748b">{t}</text>
      ))}
      <line x1="60" y1="220" x2="510" y2="220" stroke="#334155" strokeWidth="1.5" />
      <line x1="60" y1="220" x2="60" y2="36" stroke="#334155" strokeWidth="1.5" />
      <text x="520" y="236" fontSize="10" fill="#334155">t</text>
      <polyline points={pts.join(' ')} fill="none" stroke="#7c3aed" strokeWidth="3" />
      {/* a) t = 25 */}
      <line x1={xOf(25)} y1="220" x2={xOf(25)} y2={yOf(E(25))} stroke="#0f766e" strokeDasharray="4 3" strokeWidth="1.5" />
      <line x1="60" y1={yOf(E(25))} x2={xOf(25)} y2={yOf(E(25))} stroke="#0f766e" strokeDasharray="4 3" strokeWidth="1.5" />
      <circle cx={xOf(25)} cy={yOf(E(25))} r="5" fill="#0f766e" />
      <text x={xOf(25) - 8} y={yOf(E(25)) - 8} fontSize="11" textAnchor="end" fontWeight="bold" fill="#0f766e">a) E(25) ≈ 1950</text>
      {/* b) E = 3000 */}
      <line x1="60" y1={yOf(3000)} x2={xOf(t3000)} y2={yOf(3000)} stroke="#db2777" strokeDasharray="4 3" strokeWidth="1.5" />
      <line x1={xOf(t3000)} y1={yOf(3000)} x2={xOf(t3000)} y2="220" stroke="#db2777" strokeDasharray="4 3" strokeWidth="1.5" />
      <circle cx={xOf(t3000)} cy={yOf(3000)} r="5" fill="#db2777" />
      <text x={xOf(t3000) - 8} y={yOf(3000) - 10} fontSize="11" textAnchor="end" fontWeight="bold" fill="#9d174d">b) 3000 → t ≈ 33</text>
    </svg>
  );
};

// 3. ábra: az exponenciális egyenlet megoldásának lépései
export const LogSolveStepsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const steps = [
    { t: '3000 = 500 · 1,056ᵗ', n: 'az egyenlet' },
    { t: '1,056ᵗ = 6', n: 'osztás 500-zal' },
    { t: 't = log₁,₀₅₆ 6', n: 'a logaritmus definíciója' },
    { t: 't = lg 6 / lg 1,056', n: 'áttérés tízes alapra' },
    { t: 't ≈ 32,88 ≈ 33', n: 'számológéppel' }
  ];
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        aˣ = b  ⇒  x = log_a b = lg b / lg a
      </text>
      {steps.map((s, i) => (
        <g key={s.t}>
          <rect x="40" y={42 + i * 50} width="270" height="38" rx="10" fill={i === 4 ? '#fce7f3' : i === 0 ? '#ede9fe' : '#ffffff'} stroke={i === 4 ? '#db2777' : '#7c3aed'} strokeWidth="1.8" />
          <text x="175" y={66 + i * 50} fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f172a">{s.t}</text>
          <text x="330" y={66 + i * 50} fontSize="12" fill="#475569">{s.n}</text>
          {i < 4 && <polygon points={`170,${82 + i * 50} 180,${82 + i * 50} 175,${90 + i * 50}`} fill="#7c3aed" />}
        </g>
      ))}
    </svg>
  );
};

// 4. ábra: mobilhívások havi száma (2017-es érettségi), 350 000 · 1,065ⁿ eléri a 100 milliót
export const MobileCallsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const nMax = 110;
  const xOf = (n: number) => 60 + (n / nMax) * 440;
  // logaritmikus függőleges skála: 10^5 … 10^9
  const yOf = (v: number) => 220 - ((Math.log10(v) - 5) / 4) * 180;
  const f = (n: number) => 350000 * Math.pow(1.065, n);
  const pts = Array.from({ length: nMax + 1 }, (_, n) => `${xOf(n).toFixed(1)},${yOf(f(n)).toFixed(1)}`);
  const nStar = Math.log10(1e8 / 350000) / Math.log10(1.065);
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="26" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Havi mobilhívások: 350 000 · 1,065ⁿ (n: hónap 1991 januárja óta)
      </text>
      {[
        [1e5, '100 ezer'],
        [1e6, '1 millió'],
        [1e7, '10 millió'],
        [1e8, '100 millió'],
        [1e9, '1 milliárd']
      ].map(([v, l]) => (
        <g key={String(l)}>
          <line x1="60" y1={yOf(v as number)} x2="500" y2={yOf(v as number)} stroke="#e2e8f0" />
          <text x="56" y={yOf(v as number) + 4} fontSize="9" textAnchor="end" fill="#64748b">{l}</text>
        </g>
      ))}
      {[0, 24, 48, 72, 96].map((n) => (
        <text key={n} x={xOf(n)} y="236" fontSize="10" textAnchor="middle" fill="#64748b">{1991 + n / 12}</text>
      ))}
      <line x1="60" y1="220" x2="510" y2="220" stroke="#334155" strokeWidth="1.5" />
      <polyline points={pts.join(' ')} fill="none" stroke="#7c3aed" strokeWidth="3" />
      <line x1="60" y1={yOf(1e8)} x2={xOf(nStar)} y2={yOf(1e8)} stroke="#db2777" strokeWidth="2" strokeDasharray="5 3" />
      <line x1={xOf(nStar)} y1={yOf(1e8)} x2={xOf(nStar)} y2="220" stroke="#db2777" strokeWidth="2" strokeDasharray="5 3" />
      <circle cx={xOf(nStar)} cy={yOf(1e8)} r="5" fill="#db2777" />
      <text x={xOf(nStar) + 8} y={yOf(1e8) + 18} fontSize="11" fontWeight="bold" fill="#9d174d">n ≈ 89,8 → 1998</text>
      <text x="290" y="250" fontSize="9" textAnchor="middle" fill="#64748b">(a függőleges tengely logaritmikus skálájú)</text>
    </svg>
  );
};

// 5. ábra: Ráadás – a növekedési tényező meghatározása két adatból
export const GrowthFactorSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 560 220" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height="210" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      Ráadás: honnan jön az 1,056?
    </text>
    <rect x="30" y="50" width="140" height="56" rx="12" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
    <text x="100" y="74" fontSize="12" textAnchor="middle" fill="#4c1d95">1988 vége (t = 0)</text>
    <text x="100" y="96" fontSize="17" textAnchor="middle" fontWeight="bold" fill="#4c1d95">≈ 500 / hó</text>
    <rect x="390" y="50" width="140" height="56" rx="12" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />
    <text x="460" y="74" fontSize="12" textAnchor="middle" fill="#9d174d">1992 eleje (t = 37)</text>
    <text x="460" y="96" fontSize="17" textAnchor="middle" fontWeight="bold" fill="#9d174d">≈ 3800 / hó</text>
    <line x1="170" y1="78" x2="390" y2="78" stroke="#475569" strokeWidth="2" />
    <polygon points="390,78 380,73 380,83" fill="#475569" />
    <text x="280" y="70" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#475569">37 hónap, havonta q-szoros</text>
    <text x="280" y="140" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f172a">500 · q³⁷ = 3800  ⇒  q³⁷ = 7,6</text>
    <text x="280" y="168" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#7c3aed">q = ³⁷√7,6 ≈ 1,056</text>
    <text x="280" y="196" fontSize="12" textAnchor="middle" fill="#475569">tehát havi kb. 5,6%-os növekedés: E(t) = 500 · 1,056ᵗ</text>
  </svg>
);
