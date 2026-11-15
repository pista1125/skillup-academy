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

/** 1. kidolgozott feladat: az ismeretlen szerepe a hatványban – három művelet. */
export const LogConceptTripleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cols = [
    { eq: 'x = 5⁶', role: 'hatványérték', op: 'hatványozás', sol: 'x = 15 625', color: '#0d9488', hi: 0 },
    { eq: 'y⁷ = 2187', role: 'hatványalap', op: 'gyökvonás', sol: 'y = ⁷√2187 = 3', color: '#2563eb', hi: 1 },
    { eq: '2ᶻ = 128', role: 'hatványkitevő', op: 'logaritmus', sol: 'z = log₂ 128 = 7', color: '#7c3aed', hi: 2 }
  ];
  return (
    <Frame title="Melyik részét keressük a hatványnak?" h={250} className={className}>
      {cols.map((c, i) => {
        const x = 25 + i * 178;
        return (
          <g key={i}>
            <rect x={x} y="45" width="164" height="190" rx="12" fill="#fff" stroke={c.color} strokeWidth="2" />
            <text x={x + 82} y="80" fontSize="20" fontWeight="bold" textAnchor="middle" fill={c.color}>
              {c.eq}
            </text>
            <text x={x + 82} y="112" fontSize="11" textAnchor="middle" fill="#475569">az ismeretlen:</text>
            <text x={x + 82} y="130" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0f172a">{c.role}</text>
            <text x={x + 82} y="158" fontSize="11" textAnchor="middle" fill="#475569">művelet:</text>
            <rect x={x + 22} y="165" width="120" height="24" rx="12" fill={c.color} opacity="0.15" />
            <text x={x + 82} y="182" fontSize="13" fontWeight="bold" textAnchor="middle" fill={c.color}>{c.op}</text>
            <text x={x + 82} y="218" fontSize="13" textAnchor="middle" fill="#0f172a">{c.sol}</text>
          </g>
        );
      })}
    </Frame>
  );
};

/** A definíció: aˣ = b ⇔ x = logₐ b, a részek elnevezésével. */
export const LogConceptDefinitionSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="A logaritmus definíciója" h={230} className={className}>
    <text x="140" y="105" fontSize="34" fontWeight="bold" textAnchor="middle" fill="#0f172a">
      a
    </text>
    <text x="160" y="80" fontSize="22" fontWeight="bold" fill="#db2777">
      x
    </text>
    <text x="210" y="105" fontSize="34" fontWeight="bold" textAnchor="middle" fill="#0f172a">
      = b
    </text>
    <text x="280" y="102" fontSize="28" textAnchor="middle" fill="#7c3aed">
      ⇔
    </text>
    <text x="330" y="105" fontSize="34" fontWeight="bold" fill="#db2777">
      x
    </text>
    <text x="360" y="105" fontSize="34" fontWeight="bold" fill="#0f172a">
      = log
    </text>
    <text x="452" y="117" fontSize="20" fontWeight="bold" fill="#0d9488">
      a
    </text>
    <text x="470" y="105" fontSize="34" fontWeight="bold" fill="#2563eb">
      b
    </text>
    <line x1="140" y1="118" x2="140" y2="150" stroke="#0d9488" />
    <text x="140" y="165" fontSize="12" textAnchor="middle" fill="#0d9488">alap</text>
    <line x1="166" y1="62" x2="166" y2="50" stroke="#db2777" />
    <text x="166" y="46" fontSize="12" textAnchor="middle" fill="#db2777">kitevő</text>
    <line x1="460" y1="122" x2="460" y2="150" stroke="#0d9488" />
    <text x="455" y="165" fontSize="12" textAnchor="middle" fill="#0d9488">alap</text>
    <line x1="480" y1="112" x2="490" y2="150" stroke="#2563eb" />
    <text x="510" y="165" fontSize="12" textAnchor="middle" fill="#2563eb">argumentum</text>
    <text x="342" y="140" fontSize="12" textAnchor="middle" fill="#db2777">kitevő</text>
    <text x="280" y="200" fontSize="13" textAnchor="middle" fill="#334155">
      Feltételek: a &gt; 0, a ≠ 1, b &gt; 0. Képlettel: a<tspan dy="-8" fontSize="10">logₐ b</tspan><tspan dy="8"> = b</tspan>
    </text>
  </Frame>
);

/** y = 2ˣ grafikonja: log₂ b a b magassághoz tartozó x érték. */
export const LogConceptGraphSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const toS = (x: number, y: number): [number, number] => [200 + x * 55, 255 - y * 24];
  let d = '';
  for (let i = 0; i <= 140; i++) {
    const x = -3 + (6.15 * i) / 140;
    const [sx, sy] = toS(x, Math.pow(2, x));
    d += `${i === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)} `;
  }
  const pts = [
    { b: 8, lbl: 'log₂ 8 = 3' },
    { b: 5, lbl: 'log₂ 5 ≈ 2,32' },
    { b: 0.5, lbl: 'log₂ 0,5 = −1' }
  ];
  return (
    <Frame title="A logaritmus leolvasása az y = 2ˣ grafikonról" h={290} className={className}>
      <line x1="30" y1="255" x2="535" y2="255" stroke="#64748b" strokeWidth="1.5" />
      <line x1="200" y1="270" x2="200" y2="40" stroke="#64748b" strokeWidth="1.5" />
      {[-3, -2, -1, 1, 2, 3, 4, 5].map((t) => (
        <text key={t} x={toS(t, 0)[0]} y="270" fontSize="10" textAnchor="middle" fill="#64748b">
          {String(t).replace('-', '−')}
        </text>
      ))}
      {[2, 4, 6, 8].map((t) => (
        <text key={t} x="193" y={toS(0, t)[1] + 4} fontSize="10" textAnchor="end" fill="#64748b">
          {t}
        </text>
      ))}
      <path d={d} fill="none" stroke="#7c3aed" strokeWidth="3" />
      {pts.map((p, i) => {
        const x = Math.log2(p.b);
        const [sx, sy] = toS(x, p.b);
        return (
          <g key={i}>
            <line x1="200" y1={sy} x2={sx} y2={sy} stroke="#db2777" strokeDasharray="4 3" />
            <line x1={sx} y1={sy} x2={sx} y2="255" stroke="#db2777" strokeDasharray="4 3" />
            <circle cx={sx} cy={sy} r="4.5" fill="#db2777" />
            <text x={i === 2 ? sx - 8 : sx + 8} y={sy - 6} fontSize="11" fontWeight="bold" textAnchor={i === 2 ? 'end' : 'start'} fill="#9d174d">
              {p.lbl}
            </text>
          </g>
        );
      })}
      <text x="530" y="50" fontSize="12" textAnchor="end" fill="#7c3aed" fontWeight="bold">y = 2ˣ</text>
      <text x="525" y="285" fontSize="10" textAnchor="end" fill="#475569">A görbe minden pozitív b-t pontosan egyszer ér el – negatívat és 0-t soha.</text>
    </Frame>
  );
};

/** Miért kell a > 0, a ≠ 1 és b > 0? */
export const LogConceptConditionsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const panels = [
    { t: 'a = 1', l1: '1ˣ = 1 minden x-re', l2: 'log₁ 5: nincs ilyen kitevő', l3: 'log₁ 1: bármi lehetne', c: '#e11d48' },
    { t: 'a = 0 vagy a < 0', l1: '0⁰, 0⁻¹ nincs értelmezve', l2: 'negatív alap: √−2 sincs', l3: '⇒ a > 0 kell', c: '#ea580c' },
    { t: 'b ≤ 0', l1: 'aˣ > 0 minden x-re', l2: 'log₂ (−8), log₂ 0', l3: 'nincs értelmezve', c: '#7c3aed' }
  ];
  return (
    <Frame title="A logaritmus feltételei: a > 0, a ≠ 1, b > 0" h={210} className={className}>
      {panels.map((p, i) => {
        const x = 25 + i * 178;
        return (
          <g key={i}>
            <rect x={x} y="45" width="164" height="145" rx="12" fill="#fff" stroke={p.c} strokeWidth="2" />
            <text x={x + 82} y="74" fontSize="15" fontWeight="bold" textAnchor="middle" fill={p.c}>{p.t}</text>
            <text x={x + 82} y="108" fontSize="11" textAnchor="middle" fill="#0f172a">{p.l1}</text>
            <text x={x + 82} y="132" fontSize="11" textAnchor="middle" fill="#0f172a">{p.l2}</text>
            <text x={x + 82} y="156" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#334155">{p.l3}</text>
          </g>
        );
      })}
    </Frame>
  );
};

/** Ráadás: a logarléc – 2 · 3 = 6 szorzás hosszak összeadásával (1 dekád = 250 mm). */
export const LogConceptSlideRuleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const k = 1.9; // px / mm: 1 dekád = 250 mm = 475 px
  const X0 = 40;
  const pos = (v: number, shift = 0) => X0 + shift + Math.log10(v) * 250 * k;
  const shift = Math.log10(3) * 250 * k;
  const ticks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <Frame title="Logarléc: 2 · 3 = 6, mert lg 2 + lg 3 = lg 6" h={230} className={className}>
      {/* alsó (álló) skála */}
      <rect x={X0} y="130" width={250 * k} height="40" fill="#fef3c7" stroke="#b45309" />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={pos(t)} y1="130" x2={pos(t)} y2="142" stroke="#78350f" />
          <text x={pos(t)} y="158" fontSize="11" textAnchor="middle" fill="#78350f">{t}</text>
        </g>
      ))}
      {/* nyelv (mozgó skála), 3-hoz tolva */}
      <rect x={X0 + shift} y="88" width={250 * k * 0.55} height="40" fill="#ede9fe" stroke="#7c3aed" />
      {[1, 2, 3].map((t) => (
        <g key={t}>
          <line x1={pos(t, shift)} y1="116" x2={pos(t, shift)} y2="128" stroke="#5b21b6" />
          <text x={pos(t, shift)} y="110" fontSize="11" textAnchor="middle" fill="#5b21b6">{t}</text>
        </g>
      ))}
      <line x1={pos(6)} y1="80" x2={pos(6)} y2="175" stroke="#db2777" strokeWidth="2" />
      <text x={pos(6)} y="190" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#db2777">6</text>
      {/* hosszak */}
      <line x1={X0} y1="60" x2={pos(3)} y2="60" stroke="#b45309" strokeWidth="2" />
      <text x={(X0 + pos(3)) / 2} y="54" fontSize="10" textAnchor="middle" fill="#b45309">lg 3 ≙ 119,28 mm</text>
      <line x1={pos(3)} y1="60" x2={pos(6)} y2="60" stroke="#7c3aed" strokeWidth="2" />
      <text x={(pos(3) + pos(6)) / 2} y="54" fontSize="10" textAnchor="middle" fill="#7c3aed">lg 2 ≙ 75,26 mm</text>
      <text x="280" y="214" fontSize="12" textAnchor="middle" fill="#334155">
        119,28 mm + 75,26 mm = 194,54 mm ≙ lg 6
      </text>
    </Frame>
  );
};
