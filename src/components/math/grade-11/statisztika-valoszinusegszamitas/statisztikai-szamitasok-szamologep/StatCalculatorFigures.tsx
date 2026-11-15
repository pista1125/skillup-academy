import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** Számológép-kijelző keret. */
const Screen: React.FC<{ x: number; y: number; w: number; h: number; title?: string; children?: React.ReactNode }> = ({ x, y, w, h, title, children }) => (
  <g>
    <rect x={x - 10} y={y - 10} width={w + 20} height={h + 20} rx="14" fill="#334155" />
    <rect x={x} y={y} width={w} height={h} rx="6" fill="#dfe8d8" stroke="#94a3b8" />
    {title && (
      <>
        <rect x={x} y={y} width={w} height="20" rx="6" fill="#1e293b" />
        <text x={x + 8} y={y + 14} fontSize="11" fontWeight="bold" fill="#f8fafc">
          {title}
        </text>
      </>
    )}
    {children}
  </g>
);

// 1. ábra: a statisztika üzemmód elérése
export const StatCalculatorMenuSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const steps = [
    { t: 'MENU (HOME) gomb', d: 'bekapcsolás után' },
    { t: '6: Statisztika', d: 'üzemmód kiválasztása' },
    { t: '1: 1 változós', d: 'egy adatsor (+ gyakoriság)' },
    { t: 'adatok bevitele', d: 'x és Gyak oszlop' },
    { t: 'OPTN → 3: 1-változós stat', d: 'a mutatók listája' }
  ];
  return (
    <svg viewBox="0 0 600 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="190" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Statisztikai számítás számológéppel – a lépések
      </text>
      {steps.map((s, i) => (
        <g key={s.t}>
          <rect x={18 + i * 116} y="60" width="104" height="80" rx="12" fill={i === 4 ? '#e0f2fe' : '#ffffff'} stroke="#0284c7" strokeWidth="1.6" />
          <text x={70 + i * 116} y="82" fontSize="18" textAnchor="middle" fontWeight="bold" fill="#0369a1">
            {i + 1}.
          </text>
          <text x={70 + i * 116} y="104" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#0f172a">
            {s.t.length > 18 ? s.t.split(' → ')[0] + ' →' : s.t}
          </text>
          {s.t.length > 18 && (
            <text x={70 + i * 116} y="117" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#0f172a">
              {s.t.split(' → ')[1]}
            </text>
          )}
          <text x={70 + i * 116} y="132" fontSize="9" textAnchor="middle" fill="#475569">
            {s.d}
          </text>
          {i < 4 && <polygon points={`${124 + i * 116},100 ${132 + i * 116},100 ${128 + i * 116},94`} fill="#475569" transform={`rotate(90 ${128 + i * 116} 98)`} />}
        </g>
      ))}
      <text x="300" y="172" fontSize="11" textAnchor="middle" fill="#475569">
        (A gombok neve típusonként eltérhet; a tankönyv egy elterjedt, érettségin használható géptípust mutat be.)
      </text>
    </svg>
  );
};

// 2. ábra: adatbevitel – a járatok megállószámai gyakorisággal
export const StatCalculatorDataScreenSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = [
    [4, 1],
    [8, 3],
    [11, 5],
    [13, 4],
    [14, 3],
    [15, 2],
    [16, 1],
    [17, 1]
  ];
  return (
    <svg viewBox="0 0 600 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <Screen x={40} y={30} w={250} h={240} title="1 változós – adatok">
        <text x="70" y="70" fontSize="12" fontWeight="bold" fill="#0f172a">
          #
        </text>
        <text x="140" y="70" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0f172a">
          x
        </text>
        <text x="230" y="70" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0f172a">
          Gyak
        </text>
        {rows.map(([x, f], i) => (
          <g key={x}>
            <line x1="45" y1={76 + i * 23} x2="285" y2={76 + i * 23} stroke="#94a3b8" strokeWidth="0.6" />
            <text x="70" y={93 + i * 23} fontSize="12" fill="#334155">
              {i + 1}
            </text>
            <text x="140" y={93 + i * 23} fontSize="13" fontFamily="monospace" textAnchor="middle" fill="#0f172a">
              {x}
            </text>
            <text x="230" y={93 + i * 23} fontSize="13" fontFamily="monospace" textAnchor="middle" fill="#0f172a">
              {f}
            </text>
          </g>
        ))}
      </Screen>
      <text x="330" y="70" fontSize="13" fontWeight="bold" fill="#0369a1">
        20 járat – hány megállós szakaszon járnak?
      </text>
      <text x="330" y="100" fontSize="12" fill="#334155">
        x: a megállók száma
      </text>
      <text x="330" y="122" fontSize="12" fill="#334155">
        Gyak: a járatok száma (gyakoriság)
      </text>
      <text x="330" y="156" fontSize="12" fill="#334155">
        Ha a gyakoriság oszlopot nem töltjük ki,
      </text>
      <text x="330" y="174" fontSize="12" fill="#334155">
        minden adat 1 gyakorisággal számít.
      </text>
      <text x="330" y="210" fontSize="12" fill="#334155">
        Ellenőrzés: 1 + 3 + 5 + 4 + 3 + 2 + 1 + 1 = 20
      </text>
    </svg>
  );
};

// 3. ábra: az eredményképernyő
export const StatCalculatorResultsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const page1 = [
    ['x̄', '12'],
    ['Σx', '240'],
    ['Σx²', '3072'],
    ['σ²x', '9,6'],
    ['σx', '3,098386677'],
    ['s²x', '10,10526316'],
    ['sx', '3,178877657']
  ];
  const page2 = [
    ['n', '20'],
    ['min(x)', '4'],
    ['Q₁', '11'],
    ['Med', '13'],
    ['Q₃', '14'],
    ['max(x)', '17']
  ];
  return (
    <svg viewBox="0 0 600 270" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="260" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <Screen x={30} y={30} w={250} h={210} title="1-változós stat (1. oldal)">
        {page1.map(([k, v], i) => (
          <g key={k}>
            <text x="45" y={72 + i * 24} fontSize="13" fontWeight="bold" fill={k === 'σx' ? '#be123c' : '#0f172a'}>
              {k}
            </text>
            <text x="270" y={72 + i * 24} fontSize="13" fontFamily="monospace" textAnchor="end" fill={k === 'σx' ? '#be123c' : '#0f172a'}>
              = {v}
            </text>
          </g>
        ))}
      </Screen>
      <Screen x={320} y={30} w={250} h={210} title="lapozás lefelé (2. oldal)">
        {page2.map(([k, v], i) => (
          <g key={k}>
            <text x="335" y={72 + i * 26} fontSize="13" fontWeight="bold" fill="#0f172a">
              {k}
            </text>
            <text x="560" y={72 + i * 26} fontSize="13" fontFamily="monospace" textAnchor="end" fill="#0f172a">
              = {v}
            </text>
          </g>
        ))}
      </Screen>
      <text x="155" y="262" fontSize="11" textAnchor="middle" fill="#be123c" fontWeight="bold">
        σx: a tanult (n-nel osztott) szórás
      </text>
    </svg>
  );
};

// 4. ábra: torzított és torzítatlan szórás
export const StatCalculatorBiasSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 600 220" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="590" height="210" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <rect x="30" y="30" width="250" height="120" rx="12" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.6" />
    <text x="155" y="54" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#075985">
      torzított: σ²x, σx
    </text>
    <text x="155" y="88" fontSize="15" textAnchor="middle" fontFamily="monospace" fill="#0f172a">
      σ² = Σ(xᵢ − x̄)² / n
    </text>
    <text x="155" y="122" fontSize="12" textAnchor="middle" fill="#334155">
      ezt tanultuk – ezt használjuk
    </text>
    <rect x="320" y="30" width="250" height="120" rx="12" fill="#fef3c7" stroke="#d97706" strokeWidth="1.6" />
    <text x="445" y="54" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#92400e">
      torzítatlan: s²x, sx
    </text>
    <text x="445" y="88" fontSize="15" textAnchor="middle" fontFamily="monospace" fill="#0f172a">
      s² = Σ(xᵢ − x̄)² / (n − 1)
    </text>
    <text x="445" y="122" fontSize="12" textAnchor="middle" fill="#334155">
      csak a nevezőben tér el
    </text>
    <text x="300" y="180" fontSize="13" textAnchor="middle" fill="#0f172a">
      s² = σ² · n / (n − 1), ezért mindig s ≥ σ; nagy n esetén alig különböznek.
    </text>
    <text x="300" y="202" fontSize="12" textAnchor="middle" fill="#475569">
      Példa (20 járat): σ ≈ 3,098;  s ≈ 3,179
    </text>
  </svg>
);

// 5. ábra: tűzoltóság – napi riasztások oszlopdiagramja
export const StatCalculatorFireSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const vals = [0, 1, 2, 4, 6, 14];
  const f = [1, 11, 6, 8, 4, 1];
  const sx = (v: number) => 60 + (v / 15) * 480;
  return (
    <svg viewBox="0 0 600 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="28" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Napi riasztások száma egy hónapban (31 nap)
      </text>
      {[0, 2, 4, 6, 8, 10, 12].map((g) => (
        <g key={g}>
          <line x1="50" y1={200 - g * 13} x2="550" y2={200 - g * 13} stroke="#e2e8f0" />
          <text x="44" y={204 - g * 13} fontSize="10" textAnchor="end" fill="#64748b">
            {g}
          </text>
        </g>
      ))}
      {vals.map((v, i) => (
        <g key={v}>
          <rect x={sx(v) - 12} y={200 - f[i] * 13} width="24" height={f[i] * 13} fill="#f87171" rx="2" />
          <text x={sx(v)} y={194 - f[i] * 13} fontSize="11" textAnchor="middle" fontWeight="bold" fill="#991b1b">
            {f[i]}
          </text>
        </g>
      ))}
      <line x1="50" y1="200" x2="555" y2="200" stroke="#475569" strokeWidth="1.5" />
      {Array.from({ length: 16 }, (_, k) => k).map((k) => (
        <text key={k} x={sx(k)} y="216" fontSize="10" textAnchor="middle" fill="#334155">
          {k}
        </text>
      ))}
      <line x1={sx(3)} y1="40" x2={sx(3)} y2="200" stroke="#0369a1" strokeWidth="2" strokeDasharray="5 4" />
      <text x={sx(3) + 6} y="52" fontSize="11" fontWeight="bold" fill="#0369a1">
        x̄ = 93 / 31 = 3
      </text>
      <text x="300" y="236" fontSize="11" textAnchor="middle" fill="#475569">
        riasztások száma naponta (a gyakoriság: hány napon fordult elő)
      </text>
    </svg>
  );
};
