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

/** Bevezető: y = 10ˣ grafikonja, a 4 tízes alapú logaritmusa. */
export const CommonLogGraphSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const toS = (x: number, y: number): [number, number] => [200 + x * 150, 255 - y * 50];
  let d = '';
  for (let i = 0; i <= 140; i++) {
    const x = -1.2 + (1.88 * i) / 140;
    const [sx, sy] = toS(x, Math.pow(10, x));
    d += `${i === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)} `;
  }
  const xl = Math.log10(4);
  const [px, py] = toS(xl, 4);
  return (
    <Frame title="Minden pozitív szám felírható a 10 hatványaként" h={290} className={className}>
      <line x1="20" y1="255" x2="535" y2="255" stroke="#64748b" strokeWidth="1.5" />
      <line x1="200" y1="270" x2="200" y2="40" stroke="#64748b" strokeWidth="1.5" />
      {[-1, 1].map((t) => (
        <text key={t} x={toS(t, 0)[0]} y="270" fontSize="11" textAnchor="middle" fill="#64748b">
          {String(t).replace('-', '−')}
        </text>
      ))}
      {[1, 2, 3, 4].map((t) => (
        <g key={t}>
          <line x1="196" y1={toS(0, t)[1]} x2="204" y2={toS(0, t)[1]} stroke="#64748b" />
          <text x="190" y={toS(0, t)[1] + 4} fontSize="11" textAnchor="end" fill="#64748b">{t}</text>
        </g>
      ))}
      <path d={d} fill="none" stroke="#7c3aed" strokeWidth="3" />
      <line x1="200" y1={py} x2={px} y2={py} stroke="#db2777" strokeDasharray="4 3" />
      <line x1={px} y1={py} x2={px} y2="255" stroke="#db2777" strokeDasharray="4 3" />
      <circle cx={px} cy={py} r="5" fill="#db2777" />
      <text x={px} y="272" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#9d174d">lg 4 ≈ 0,602</text>
      <text x="420" y="70" fontSize="13" fontWeight="bold" fill="#7c3aed">y = 10ˣ</text>
      <text x="420" y="100" fontSize="11" fill="#334155">számológépen: log 4 =</text>
      <text x="420" y="118" fontSize="11" fill="#334155">→ 0,60205999…</text>
      <text x="420" y="146" fontSize="13" fontWeight="bold" fill="#334155">
        4 = 10<tspan dy="-8" fontSize="10">lg 4</tspan>
      </text>
    </Frame>
  );
};

/** A tízes alapú logaritmus mint „skála”: a számok helye a lg értékük szerint. */
export const CommonLogScaleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const pos = (v: number) => 60 + (Math.log10(v) + 2) * 88;
  const decades = [0.01, 0.1, 1, 10, 100, 1000, 10000];
  const dLbl = ['0,01', '0,1', '1', '10', '100', '1000', '10 000'];
  const marks = [
    { v: 0.083, l: '0,083' },
    { v: 4, l: '4' },
    { v: 572, l: '572' },
    { v: 4933, l: '4933' }
  ];
  return (
    <Frame title="Hol van a szám a „tízes skálán”? – a helye a tízes alapú logaritmusa" h={210} className={className}>
      <line x1="40" y1="110" x2="540" y2="110" stroke="#334155" strokeWidth="2" />
      {decades.map((v, i) => (
        <g key={v}>
          <line x1={pos(v)} y1="100" x2={pos(v)} y2="120" stroke="#334155" strokeWidth="2" />
          <text x={pos(v)} y="140" fontSize="11" textAnchor="middle" fill="#0f172a">{dLbl[i]}</text>
          <text x={pos(v)} y="92" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#7c3aed">
            {String(i - 2).replace('-', '−')}
          </text>
        </g>
      ))}
      {marks.map((m) => (
        <g key={m.v}>
          <circle cx={pos(m.v)} cy="110" r="5" fill="#db2777" />
          <text x={pos(m.v)} y="165" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#9d174d">{m.l}</text>
          <text x={pos(m.v)} y="182" fontSize="10" textAnchor="middle" fill="#9d174d">
            lg ≈ {Math.log10(m.v).toFixed(4).replace('.', ',').replace('-', '−')}
          </text>
        </g>
      ))}
      <text x="40" y="60" fontSize="11" fill="#7c3aed">lg érték (kitevő) →</text>
    </Frame>
  );
};

/** Kidolgozott feladat: 1,15ˣ = 3 – mikor háromszorozódik meg a tőke? */
export const CommonLogInterestSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const bw = 46;
  const base = 250;
  const sc = 60;
  return (
    <Frame title="Évi 15%-os kamat: A · 1,15ˣ = 3A" h={290} className={className}>
      <line x1="40" y1={base} x2="540" y2={base} stroke="#64748b" strokeWidth="1.5" />
      <line x1="40" y1={base - 3 * sc} x2="540" y2={base - 3 * sc} stroke="#db2777" strokeDasharray="5 4" strokeWidth="1.5" />
      <text x="536" y={base - 3 * sc - 6} fontSize="11" textAnchor="end" fontWeight="bold" fill="#9d174d">3A</text>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
        const v = Math.pow(1.15, n);
        const x = 60 + n * 52;
        return (
          <g key={n}>
            <rect x={x} y={base - v * sc} width={bw} height={v * sc} rx="3" fill={v >= 3 ? '#7c3aed' : '#c4b5fd'} />
            <text x={x + bw / 2} y={base - v * sc - 5} fontSize="9" textAnchor="middle" fill="#334155">
              {v.toFixed(2).replace('.', ',')}A
            </text>
            <text x={x + bw / 2} y={base + 15} fontSize="10" textAnchor="middle" fill="#334155">{n}. év</text>
          </g>
        );
      })}
      <text x="280" y="280" fontSize="11" textAnchor="middle" fill="#334155">
        x = lg 3 / lg 1,15 ≈ 7,86 ⇒ a 8. év végére háromszorozódik meg
      </text>
    </Frame>
  );
};

/** Áttérés 10-es alapra: logₐ b = lg b / lg a. */
export const CommonLogChangeBaseSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="Bármely alapú logaritmus kiszámítható lg segítségével" h={220} className={className}>
    <text x="150" y="105" fontSize="30" fontWeight="bold" textAnchor="middle" fill="#0f172a">
      log
      <tspan fontSize="18" dy="10" fill="#0d9488">a</tspan>
      <tspan dy="-10" fill="#2563eb"> b</tspan>
    </text>
    <text x="250" y="105" fontSize="30" textAnchor="middle" fill="#7c3aed">=</text>
    <text x="350" y="85" fontSize="26" fontWeight="bold" textAnchor="middle" fill="#2563eb">lg b</text>
    <line x1="295" y1="96" x2="405" y2="96" stroke="#0f172a" strokeWidth="2" />
    <text x="350" y="125" fontSize="26" fontWeight="bold" textAnchor="middle" fill="#0d9488">lg a</text>
    <text x="280" y="170" fontSize="13" textAnchor="middle" fill="#334155">
      log₃ 20 = lg 20 / lg 3 ≈ 1,3010 / 0,4771 ≈ 2,7268
    </text>
    <text x="280" y="195" fontSize="13" textAnchor="middle" fill="#334155">
      log₀,₂ 15 = lg 15 / lg 0,2 ≈ 1,1761 / (−0,6990) ≈ −1,6826
    </text>
  </Frame>
);

/** 4. feladat: a lázcsillapítós 0,83ᵗ = 0,5 egyenlet megoldása logaritmussal. */
export const CommonLogHalfLifeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const toS = (t: number, y: number): [number, number] => [60 + t * 55, 240 - y * 190];
  let d = '';
  for (let i = 0; i <= 120; i++) {
    const t = (8 * i) / 120;
    const [x, y] = toS(t, Math.pow(0.83, t));
    d += `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  const T = Math.log10(0.5) / Math.log10(0.83);
  const [px, py] = toS(T, 0.5);
  return (
    <Frame title="0,83ᵗ = 0,5 ⇒ t = lg 0,5 / lg 0,83 ≈ 3,720" h={280} className={className}>
      <line x1="60" y1="240" x2="520" y2="240" stroke="#64748b" strokeWidth="1.5" />
      <line x1="60" y1="240" x2="60" y2="40" stroke="#64748b" strokeWidth="1.5" />
      {[0, 2, 4, 6, 8].map((t) => (
        <text key={t} x={toS(t, 0)[0]} y="256" fontSize="10" textAnchor="middle" fill="#64748b">{t}</text>
      ))}
      <text x="54" y={toS(0, 1)[1] + 4} fontSize="10" textAnchor="end" fill="#64748b">1</text>
      <text x="54" y={toS(0, 0.5)[1] + 4} fontSize="10" textAnchor="end" fill="#64748b">0,5</text>
      <path d={d} fill="none" stroke="#7c3aed" strokeWidth="3" />
      <line x1="60" y1={py} x2={px} y2={py} stroke="#db2777" strokeDasharray="4 3" />
      <line x1={px} y1={py} x2={px} y2="240" stroke="#db2777" strokeDasharray="4 3" />
      <circle cx={px} cy={py} r="5" fill="#db2777" />
      <text x={px + 8} y={py - 8} fontSize="12" fontWeight="bold" fill="#9d174d">t ≈ 3,720 óra</text>
      <text x="515" y="256" fontSize="10" textAnchor="end" fill="#334155">t (óra)</text>
      <text x="290" y="80" fontSize="11" fill="#334155">A 9. leckében táblázattal közelítettük,</text>
      <text x="290" y="96" fontSize="11" fill="#334155">most egy lépésben kiszámoljuk.</text>
    </Frame>
  );
};
