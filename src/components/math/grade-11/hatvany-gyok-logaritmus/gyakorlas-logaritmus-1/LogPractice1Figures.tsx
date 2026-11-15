import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

// 1. ábra: 1. feladat (érettségi, 2013) – f: [−2; 1] → R, f(x) = aˣ grafikonja
export const ExpGraphTaskSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const u = 40; // egység
  const ox = 200;
  const oy = 220;
  const X = (x: number) => ox + x * u;
  const Y = (y: number) => oy - y * u;
  const pts = Array.from({ length: 61 }, (_, i) => -2 + (i / 60) * 3)
    .map((x) => `${X(x).toFixed(1)},${Y(Math.pow(0.5, x)).toFixed(1)}`)
    .join(' ');
  return (
    <svg viewBox="0 0 400 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="390" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      {Array.from({ length: 7 }, (_, i) => i - 3).map((i) => (
        <line key={`v${i}`} x1={X(i)} y1={Y(0) + 10} x2={X(i)} y2={Y(4.6)} stroke="#e2e8f0" />
      ))}
      {Array.from({ length: 5 }, (_, i) => i).map((j) => (
        <line key={`h${j}`} x1={X(-3)} y1={Y(j)} x2={X(3)} y2={Y(j)} stroke="#e2e8f0" />
      ))}
      <line x1={X(-3.2)} y1={Y(0)} x2={X(3.3)} y2={Y(0)} stroke="#334155" strokeWidth="1.5" />
      <line x1={X(0)} y1={Y(-0.2)} x2={X(0)} y2={Y(4.8)} stroke="#334155" strokeWidth="1.5" />
      <text x={X(3.3)} y={Y(0) + 16} fontSize="12" fill="#334155">x</text>
      <text x={X(0) + 6} y={Y(4.8) + 4} fontSize="12" fill="#334155">y</text>
      <text x={X(1)} y={Y(0) + 16} fontSize="12" textAnchor="middle" fill="#334155">1</text>
      <text x={X(0) - 8} y={Y(1) + 4} fontSize="12" textAnchor="end" fill="#334155">1</text>
      <text x={X(0) - 8} y={Y(0) + 16} fontSize="12" textAnchor="end" fill="#334155">0</text>
      <polyline points={pts} fill="none" stroke="#7c3aed" strokeWidth="3" />
      <circle cx={X(-2)} cy={Y(4)} r="4.5" fill="#7c3aed" />
      <circle cx={X(1)} cy={Y(0.5)} r="4.5" fill="#7c3aed" />
      <text x={X(1) + 10} y={Y(0.5) - 8} fontSize="13" fontWeight="bold" fill="#4c1d95">f(x) = aˣ</text>
      <text x="200" y="26" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">f: [−2; 1] → R</text>
    </svg>
  );
};

// 2. ábra: 2. a) – log₁₆ x = −1/2 megoldása a számegyenesen
export const LogNumberLineSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const X = (x: number) => 60 + x * 400;
  return (
    <svg viewBox="0 0 560 170" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="160" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        log₁₆ x = −1/2  ⇔  x = 1 / √16 = 1/4
      </text>
      <line x1="40" y1="100" x2="520" y2="100" stroke="#334155" strokeWidth="2" />
      <polygon points="520,100 510,95 510,105" fill="#334155" />
      {[0, 0.25, 0.5, 0.75, 1].map((v) => (
        <g key={v}>
          <line x1={X(v)} y1="92" x2={X(v)} y2="108" stroke="#334155" strokeWidth="2" />
          <text x={X(v)} y="128" fontSize="13" textAnchor="middle" fill="#334155">{['0', '0,25', '0,5', '0,75', '1'][v * 4]}</text>
        </g>
      ))}
      <circle cx={X(0.25)} cy="100" r="8" fill="#db2777" />
      <text x={X(0.25)} y="76" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#9d174d">x = 1/4</text>
      <text x="280" y="152" fontSize="11" textAnchor="middle" fill="#64748b">x &gt; 0 kell (a logaritmus csak pozitív számra értelmezett)</text>
    </svg>
  );
};

// 3. ábra: 4. feladat – radioaktív bomlás, percenként századrészére
export const DecayHundredthSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const exps = [23, 21, 19, 17, 15, 13, 11, 9, 7, 5, 3];
  return (
    <svg viewBox="0 0 560 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="26" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        N(t) = 6 · 10²³ · 0,01ᵗ  (t percben) – a magasság a nagyságrend
      </text>
      {exps.map((e, i) => {
        const h = (e / 23) * 160;
        return (
          <g key={i}>
            <rect x={40 + i * 46} y={210 - h} width="32" height={h} rx="4" fill={i === 10 ? '#db2777' : '#a78bfa'} />
            <text x={56 + i * 46} y={205 - h} fontSize="9" textAnchor="middle" fill="#334155">
              6·10
              <tspan fontSize="7" dy="-4">
                {e}
              </tspan>
            </text>
            <text x={56 + i * 46} y="228" fontSize="10" textAnchor="middle" fill="#475569">{i}</text>
          </g>
        );
      })}
      <text x="530" y="242" fontSize="10" textAnchor="end" fill="#475569">perc</text>
    </svg>
  );
};

// 4. ábra: 5. feladat – várható élettartam a GDP függvényében
export const LifeExpectancySvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const f = (G: number) => 75.5 - 5 * Math.pow(10, (6000 - G) / 6090);
  const X = (G: number) => 60 + (G / 6000) * 450;
  const Y = (e: number) => 210 - ((e - 30) / 50) * 170;
  const pts = Array.from({ length: 61 }, (_, i) => 500 + i * 92)
    .map((G) => `${X(G).toFixed(1)},${Y(f(G)).toFixed(1)}`)
    .join(' ');
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="26" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        É = 75,5 − 5 · 10
        <tspan fontSize="9" dy="-6">
          (6000 − G) / 6090
        </tspan>
      </text>
      {[30, 40, 50, 60, 70, 80].map((e) => (
        <g key={e}>
          <line x1="60" y1={Y(e)} x2="515" y2={Y(e)} stroke="#e2e8f0" />
          <text x="54" y={Y(e) + 4} fontSize="10" textAnchor="end" fill="#64748b">{e}</text>
        </g>
      ))}
      {[0, 1000, 2000, 3000, 4000, 5000, 6000].map((G) => (
        <text key={G} x={X(G)} y="228" fontSize="10" textAnchor="middle" fill="#64748b">{G}</text>
      ))}
      <line x1="60" y1="210" x2="520" y2="210" stroke="#334155" strokeWidth="1.5" />
      <line x1="60" y1="210" x2="60" y2="36" stroke="#334155" strokeWidth="1.5" />
      <text x="525" y="244" fontSize="10" textAnchor="end" fill="#334155">G (USD)</text>
      <text x="66" y="44" fontSize="10" fill="#334155">É (év)</text>
      <polyline points={pts} fill="none" stroke="#7c3aed" strokeWidth="3" />
      {[1090, 3270].map((G, i) => (
        <g key={G}>
          <line x1={X(G)} y1="210" x2={X(G)} y2={Y(f(G))} stroke={i ? '#0f766e' : '#db2777'} strokeDasharray="4 3" />
          <circle cx={X(G)} cy={Y(f(G))} r="5" fill={i ? '#0f766e' : '#db2777'} />
          <text x={X(G) + 8} y={Y(f(G)) + 16} fontSize="11" fontWeight="bold" fill={i ? '#0f766e' : '#9d174d'}>
            G = {G}
          </text>
        </g>
      ))}
    </svg>
  );
};

// 5. ábra: 6. feladat – Richter-skála
export const RichterScaleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cats = [
    ['1–1,9', 'mikro', '#ddd6fe'],
    ['2–2,9', 'nagyon gyenge', '#c4b5fd'],
    ['3–3,9', 'gyenge', '#a78bfa'],
    ['4–4,9', 'közepes', '#8b5cf6'],
    ['5–5,9', 'erős', '#7c3aed'],
    ['6–6,9', 'igen erős', '#6d28d9'],
    ['7–7,9', 'nagyon erős', '#5b21b6'],
    ['8–8,9', 'rendkívüli', '#4c1d95'],
    ['9 –', 'rendkívüli', '#2e1065']
  ];
  return (
    <svg viewBox="0 0 560 220" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="210" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        M = −4,42 + (2/3) · lg E   (E joule-ban)
      </text>
      {cats.map(([m, n, c], i) => (
        <g key={m}>
          <rect x={20 + i * 58} y="60" width="54" height="56" rx="6" fill={c} />
          <text x={47 + i * 58} y="84" fontSize="11" textAnchor="middle" fontWeight="bold" fill={i < 3 ? '#2e1065' : '#ffffff'}>{m}</text>
          <text x={47 + i * 58} y="104" fontSize="8" textAnchor="middle" fill={i < 3 ? '#2e1065' : '#ffffff'}>{n}</text>
        </g>
      ))}
      <text x="280" y="148" fontSize="12" textAnchor="middle" fill="#334155">
        +1 magnitúdó → lg E nő 1,5-tel → kb. 31,6-szoros energia
      </text>
      <text x="280" y="172" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#7c3aed">
        +2 magnitúdó → lg E nő 3-mal → 1000-szeres energia
      </text>
      <text x="280" y="198" fontSize="11" textAnchor="middle" fill="#64748b">Szumátra, 2004: M = 9,3</text>
    </svg>
  );
};
