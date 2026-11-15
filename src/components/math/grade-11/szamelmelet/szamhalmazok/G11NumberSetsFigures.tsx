import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

// 1. ábra: Venn-diagram – Q ⊃ Z ⊃ N, a kidolgozott feladat számaival
export const G11NumberSetsVennSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const nat = [
    { t: '12/2 = 6', x: 250, y: 150 },
    { t: '0', x: 310, y: 170 },
    { t: '3', x: 355, y: 145 },
    { t: '100', x: 232, y: 195 },
    { t: '7/7 = 1', x: 265, y: 220 },
    { t: '(−10)/(−5) = 2', x: 345, y: 200 }
  ];
  const ints = [
    { t: '−4', x: 140, y: 120 },
    { t: '−9', x: 445, y: 120 },
    { t: '−5/5 = −1', x: 130, y: 205 },
    { t: '−17', x: 455, y: 200 },
    { t: '−13', x: 175, y: 255 },
    { t: '−8/4 = −2', x: 420, y: 255 }
  ];
  const rats = [
    { t: '2,3', x: 60, y: 90 },
    { t: '8/7', x: 520, y: 95 },
    { t: '54/45', x: 50, y: 175 },
    { t: '−46,071', x: 70, y: 275 },
    { t: '879/250', x: 540, y: 250 },
    { t: '3/5', x: 535, y: 185 }
  ];
  return (
    <svg viewBox="0 0 600 340" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="330" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="20" y="40" width="560" height="270" rx="30" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
      <text x="34" y="62" fontSize="13" fontWeight="bold" fill="#065f46">racionális számok (Q)</text>
      <rect x="100" y="80" width="400" height="200" rx="26" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <text x="114" y="100" fontSize="13" fontWeight="bold" fill="#075985">egész számok (Z)</text>
      <rect x="200" y="100" width="200" height="130" rx="22" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
      <text x="300" y="120" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#5b21b6">természetes számok (N)</text>
      {nat.map((n) => (
        <text key={n.t} x={n.x} y={n.y} fontSize="12" textAnchor="middle" fill="#4c1d95" fontWeight="bold">{n.t}</text>
      ))}
      {ints.map((n) => (
        <text key={n.t} x={n.x} y={n.y} fontSize="12" textAnchor="middle" fill="#075985" fontWeight="bold">{n.t}</text>
      ))}
      {rats.map((n) => (
        <text key={n.t} x={n.x} y={n.y} fontSize="12" textAnchor="middle" fill="#065f46" fontWeight="bold">{n.t}</text>
      ))}
      <text x="300" y="328" fontSize="12" textAnchor="middle" fill="#9f1239" fontWeight="bold">Egyik halmaznak sem eleme: √8; √5</text>
    </svg>
  );
};

// 2. ábra: műveletek, amelyek kivezetnek a halmazból
export const G11ClosureOperationsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <ellipse cx="280" cy="160" rx="255" ry="125" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
    <ellipse cx="320" cy="170" rx="175" ry="88" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
    <ellipse cx="360" cy="180" rx="95" ry="50" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
    <text x="70" y="110" fontSize="13" fontWeight="bold" fill="#065f46">Q</text>
    <text x="175" y="130" fontSize="13" fontWeight="bold" fill="#075985">Z</text>
    <text x="300" y="170" fontSize="13" fontWeight="bold" fill="#5b21b6">N</text>
    <text x="380" y="180" fontSize="11" textAnchor="middle" fill="#5b21b6">összeadás, szorzás</text>
    <text x="380" y="196" fontSize="11" textAnchor="middle" fill="#5b21b6">nem vezet ki</text>
    <path d="M300 200 C 270 230, 240 230, 215 215" fill="none" stroke="#0284c7" strokeWidth="2.5" />
    <polygon points="215,215 226,214 221,224" fill="#0284c7" />
    <text x="250" y="248" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#075985">kivonás: 1 − 3 = −2</text>
    <path d="M170 180 C 140 200, 115 200, 95 185" fill="none" stroke="#059669" strokeWidth="2.5" />
    <polygon points="95,185 106,184 101,194" fill="#059669" />
    <text x="120" y="222" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#065f46">osztás: 3 : (−2) = −1,5</text>
    <text x="280" y="28" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      Q zárt mind a négy alapműveletre (0-val nem osztunk)
    </text>
  </svg>
);

// 3. ábra: véges vagy végtelen szakaszos tizedes tört – a nevező prímtényezői
export const G11DecimalTypesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const fin = [
    ['3/10', '10 = 2 · 5', '0,3'],
    ['13/8', '8 = 2³', '1,625'],
    ['7/25', '25 = 5²', '0,28'],
    ['21/28 = 3/4', '4 = 2²', '0,75'],
    ['49/32', '32 = 2⁵', '1,53125']
  ];
  const inf = [
    ['4/9', '9 = 3²', '0,4̇'],
    ['10/12 = 5/6', '6 = 2 · 3', '0,83̇'],
    ['17/11', '11', '1,5̇4̇'],
    ['2111/990', '990 = 2 · 3² · 5 · 11', '2,13̇2̇'],
    ['18/14 = 9/7', '7', '1,2̇85714̇']
  ];
  return (
    <svg viewBox="0 0 600 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="20" y="20" width="275" height="260" rx="12" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
      <text x="157" y="44" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#065f46">véges tizedes tört</text>
      <text x="157" y="62" fontSize="11" textAnchor="middle" fill="#065f46">nevező: csak 2 és 5 prímtényező</text>
      {fin.map((r, i) => (
        <g key={r[0]}>
          <text x="32" y={96 + i * 38} fontSize="13" fontWeight="bold" fill="#0f172a">{r[0]}</text>
          <text x="32" y={112 + i * 38} fontSize="10" fill="#475569">{r[1]}</text>
          <text x="282" y={102 + i * 38} fontSize="13" textAnchor="end" fontWeight="bold" fill="#047857">{r[2]}</text>
        </g>
      ))}
      <rect x="305" y="20" width="275" height="260" rx="12" fill="#fff1f2" stroke="#e11d48" strokeWidth="1.5" />
      <text x="442" y="44" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#9f1239">végtelen szakaszos</text>
      <text x="442" y="62" fontSize="11" textAnchor="middle" fill="#9f1239">nevezőben más prímtényező is van</text>
      {inf.map((r, i) => (
        <g key={r[0]}>
          <text x="317" y={96 + i * 38} fontSize="13" fontWeight="bold" fill="#0f172a">{r[0]}</text>
          <text x="317" y={112 + i * 38} fontSize="10" fill="#475569">{r[1]}</text>
          <text x="568" y={102 + i * 38} fontSize="13" textAnchor="end" fontWeight="bold" fill="#be123c">{r[2]}</text>
        </g>
      ))}
    </svg>
  );
};

// 4. ábra: döntési folyamat – milyen lesz a tizedes tört alak?
export const G11DenominatorRuleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 560 250" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    {[
      { x: 20, t1: '1. Egyszerűsíts!', t2: '63/35 = 9/5' },
      { x: 200, t1: '2. Bontsd fel a nevezőt!', t2: '5 = 5' },
      { x: 380, t1: '3. Csak 2 és 5?', t2: 'igen ⇒ véges' }
    ].map((b) => (
      <g key={b.t1}>
        <rect x={b.x} y="40" width="160" height="62" rx="12" fill="#ecfdf5" stroke="#059669" strokeWidth="1.8" />
        <text x={b.x + 80} y="66" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#065f46">{b.t1}</text>
        <text x={b.x + 80} y="88" fontSize="12" textAnchor="middle" fill="#334155">{b.t2}</text>
      </g>
    ))}
    <line x1="180" y1="71" x2="200" y2="71" stroke="#475569" strokeWidth="2" />
    <line x1="360" y1="71" x2="380" y2="71" stroke="#475569" strokeWidth="2" />
    <rect x="40" y="130" width="230" height="90" rx="12" fill="#ffffff" stroke="#059669" />
    <text x="155" y="155" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#047857">véges tizedes tört</text>
    <text x="155" y="177" fontSize="12" textAnchor="middle" fill="#334155">bővíthető 10 hatványára:</text>
    <text x="155" y="199" fontSize="12" textAnchor="middle" fill="#334155">9/5 = 18/10 = 1,8</text>
    <rect x="290" y="130" width="230" height="90" rx="12" fill="#ffffff" stroke="#e11d48" />
    <text x="405" y="155" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#be123c">végtelen szakaszos</text>
    <text x="405" y="177" fontSize="12" textAnchor="middle" fill="#334155">ha a nevezőben 3, 7, 11, …</text>
    <text x="405" y="199" fontSize="12" textAnchor="middle" fill="#334155">5/6 = 0,83̇;  9/7 = 1,2̇85714̇</text>
  </svg>
);

// 5. ábra: Ráadás – végtelen szakaszos tizedes tört átírása közönséges törtté
export const G11RepeatingToFractionSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 560 240" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height="230" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">A = 24,7̇ közönséges tört alakja</text>
    <rect x="60" y="50" width="440" height="40" rx="10" fill="#ecfdf5" stroke="#059669" />
    <text x="280" y="76" fontSize="15" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fill="#065f46">10A = 247,777…</text>
    <rect x="60" y="98" width="440" height="40" rx="10" fill="#e0f2fe" stroke="#0284c7" />
    <text x="280" y="124" fontSize="15" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fill="#075985">−  A =  24,777…</text>
    <line x1="80" y1="148" x2="480" y2="148" stroke="#475569" strokeWidth="2" />
    <rect x="60" y="156" width="440" height="40" rx="10" fill="#fef3c7" stroke="#d97706" />
    <text x="280" y="182" fontSize="15" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fill="#92400e">9A = 223  ⇒  A = 223/9</text>
    <text x="280" y="220" fontSize="12" textAnchor="middle" fill="#475569">
      Olyan többszörösöket képzünk, amelyekben a tizedesjegyek megegyeznek – a különbség egész szám.
    </text>
  </svg>
);
