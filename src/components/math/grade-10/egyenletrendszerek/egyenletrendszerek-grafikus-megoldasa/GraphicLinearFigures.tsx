import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Metsző egyenesek ábrája: y = 7 - x és y = 10 - 2x, metszéspont (3; 4)
export const IntersectingLinesSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 320"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <defs>
        <pattern id="grid-intersect" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="1" />
        </pattern>
        <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="grad-amber" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>

      {/* Rácsháló */}
      <rect width="320" height="320" fill="url(#grid-intersect)" />

      {/* Tengelyek: Origó: (50, 270), 1 egység = 24px */}
      {/* X tengely */}
      <line x1="30" y1="270" x2="300" y2="270" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
      {/* Y tengely */}
      <line x1="50" y1="290" x2="50" y2="20" stroke="#94a3b8" strokeWidth="2" />

      {/* Tengely feliratok */}
      <text x="295" y="262" fill="#cbd5e1" fontSize="13" fontWeight="bold">x</text>
      <text x="35" y="30" fill="#cbd5e1" fontSize="13" fontWeight="bold">y</text>
      <text x="38" y="285" fill="#64748b" fontSize="11">O</text>

      {/* Tengely osztások */}
      {/* x = 1..10 -> px = 50 + x*24 */}
      {[1, 2, 3, 4, 5, 6, 7].map(n => (
        <g key={`x-${n}`}>
          <line x1={50 + n * 24} y1="267" x2={50 + n * 24} y2="273" stroke="#94a3b8" strokeWidth="1.5" />
          <text x={50 + n * 24} y="286" fill="#94a3b8" fontSize="10" textAnchor="middle">{n}</text>
        </g>
      ))}

      {/* y = 1..10 -> py = 270 - y*24 */}
      {[2, 4, 6, 8, 10].map(n => (
        <g key={`y-${n}`}>
          <line x1="47" y1={270 - n * 24} x2="53" y2={270 - n * 24} stroke="#94a3b8" strokeWidth="1.5" />
          <text x="40" y={274 - n * 24} fill="#94a3b8" fontSize="10" textAnchor="end">{n}</text>
        </g>
      ))}

      {/* Egyenes 1: y = 7 - x (kék)
          x=0 -> y=7 (py=270 - 7*24 = 102)
          x=7 -> y=0 (px=50 + 7*24 = 218, py=270)
          hosszabbítva: x=-0.5 -> px=38, py=90; x=8 -> px=242, py=294 */}
      <line x1="38" y1="90" x2="235" y2="287" stroke="url(#grad-blue)" strokeWidth="3" />
      <text x="175" y="145" fill="#38bdf8" fontSize="12" fontWeight="bold">e₁: y = 7 − x</text>

      {/* Egyenes 2: y = 10 - 2x (narancs/piros)
          x=1 -> y=8 (px=74, py=78)
          x=3 -> y=4 (px=122, py=174)
          x=5 -> y=0 (px=170, py=270)
          hosszabbítva: x=0.5 -> px=62, py=54; x=5.5 -> px=182, py=294 */}
      <line x1="62" y1="54" x2="182" y2="294" stroke="url(#grad-amber)" strokeWidth="3" />
      <text x="80" y="70" fill="#f59e0b" fontSize="12" fontWeight="bold">e₂: y = 10 − 2x</text>

      {/* Metszéspont (3; 4): px = 50 + 3*24 = 122, py = 270 - 4*24 = 174 */}
      {/* Szaggatott vetítővonalak */}
      <line x1="122" y1="174" x2="122" y2="270" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="122" y1="174" x2="50" y2="174" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Metszéspont pötty */}
      <circle cx="122" cy="174" r="6" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
      <circle cx="122" cy="174" r="10" fill="none" stroke="#a855f7" strokeWidth="1.5" opacity="0.6" />

      {/* Címke a metszéspont mellett */}
      <rect x="135" y="160" width="85" height="26" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="#a855f7" strokeWidth="1.5" />
      <text x="177" y="177" fill="#f1f5f9" fontSize="12" fontWeight="bold" textAnchor="middle">M (3; 4)</text>

      {/* Magyarázó szöveg lent */}
      <rect x="20" y="293" width="280" height="22" rx="4" fill="rgba(30, 41, 59, 0.7)" />
      <text x="160" y="308" fill="#a7f3d0" fontSize="11" textAnchor="middle" fontWeight="bold">
        Egyetlen metszéspont ⟺ Pontosan 1 megoldás: (3; 4)
      </text>
    </svg>
  );
};

// 2. Párhuzamos egyenesek ábrája: m1 = m2, b1 != b2 -> Nincs megoldás (ellentmondás)
export const ParallelLinesSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 320"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <defs>
        <pattern id="grid-parallel" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="320" height="320" fill="url(#grid-parallel)" />

      {/* Tengelyek */}
      <line x1="30" y1="160" x2="300" y2="160" stroke="#94a3b8" strokeWidth="2" />
      <line x1="160" y1="290" x2="160" y2="30" stroke="#94a3b8" strokeWidth="2" />
      <text x="295" y="152" fill="#cbd5e1" fontSize="13" fontWeight="bold">x</text>
      <text x="168" y="42" fill="#cbd5e1" fontSize="13" fontWeight="bold">y</text>

      {/* e1: y = 0.8x + 2 (rózsaszín) */}
      <line x1="40" y1="205" x2="280" y2="60" stroke="#ec4899" strokeWidth="3" />
      <text x="195" y="90" fill="#f472b6" fontSize="11" fontWeight="bold">e₁: y = 0,8x + 2</text>

      {/* e2: y = 0.8x - 2 (kék) */}
      <line x1="40" y1="260" x2="280" y2="115" stroke="#3b82f6" strokeWidth="3" />
      <text x="195" y="145" fill="#60a5fa" fontSize="11" fontWeight="bold">e₂: y = 0,8x − 2</text>

      {/* Meredekség azonosságának jelölése */}
      <rect x="35" y="50" width="115" height="52" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="#ec4899" strokeWidth="1.2" />
      <text x="92" y="68" fill="#f9a8d4" fontSize="11" fontWeight="bold" textAnchor="middle">m₁ = m₂ = 0,8</text>
      <text x="92" y="85" fill="#cbd5e1" fontSize="10" textAnchor="middle">b₁ ≠ b₂ (2 ≠ −2)</text>
      <text x="92" y="97" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">e₁ ∥ e₂ (nincs közös pont)</text>

      {/* Alsó kiemelés */}
      <rect x="25" y="275" width="270" height="30" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="1.5" />
      <text x="160" y="295" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">
        Párhuzamos egyenesek ⟹ Nincs megoldás! (∅)
      </text>
    </svg>
  );
};

// 3. Egybeeső egyenesek ábrája: m1 = m2 és b1 = b2 -> Végtelen sok megoldás
export const CoincidentLinesSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 320"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <defs>
        <pattern id="grid-coincide" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="320" height="320" fill="url(#grid-coincide)" />

      {/* Tengelyek */}
      <line x1="30" y1="160" x2="300" y2="160" stroke="#94a3b8" strokeWidth="2" />
      <line x1="160" y1="290" x2="160" y2="30" stroke="#94a3b8" strokeWidth="2" />
      <text x="295" y="152" fill="#cbd5e1" fontSize="13" fontWeight="bold">x</text>
      <text x="168" y="42" fill="#cbd5e1" fontSize="13" fontWeight="bold">y</text>

      {/* Alap egyenes vastag smaragd */}
      <line x1="45" y1="260" x2="275" y2="60" stroke="#10b981" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
      {/* Felülíró szaggatott sárga vonal */}
      <line x1="45" y1="260" x2="275" y2="60" stroke="#fbbf24" strokeWidth="3" strokeDasharray="8 6" strokeLinecap="round" />

      {/* Megoldáspontok sora a vonalon */}
      {[
        { x: 95, y: 216, label: 'P₁' },
        { x: 160, y: 160, label: 'P₂' },
        { x: 225, y: 104, label: 'P₃' }
      ].map((pt, i) => (
        <g key={`pt-${i}`}>
          <circle cx={pt.x} cy={pt.y} r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
          <text x={pt.x + 10} y={pt.y - 6} fill="#a7f3d0" fontSize="10" fontWeight="bold">{pt.label}</text>
        </g>
      ))}

      {/* Egyenletek kártyája */}
      <rect x="30" y="45" width="135" height="58" rx="6" fill="rgba(15, 23, 42, 0.9)" stroke="#10b981" strokeWidth="1.5" />
      <text x="97" y="65" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">I: 2x − y = 1</text>
      <text x="97" y="80" fill="#fde047" fontSize="11" fontWeight="bold" textAnchor="middle">II: 4x − 2y = 2</text>
      <text x="97" y="95" fill="#94a3b8" fontSize="9" textAnchor="middle">II = 2 · I (egymás többszörösei)</text>

      {/* Alsó kiemelés */}
      <rect x="20" y="275" width="280" height="30" rx="6" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="1.5" />
      <text x="160" y="295" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="middle">
        Egybeeső egyenesek ⟹ Végtelen sok megoldás!
      </text>
    </svg>
  );
};

// 4. Tyúk és nyúl modell: 7 fej és 20 láb
export const ChickensRabbitsSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 320"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <defs>
        <linearGradient id="grad-rabbit" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="grad-hen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>

      {/* Cím doboz */}
      <rect x="20" y="15" width="280" height="40" rx="8" fill="rgba(30, 41, 59, 0.85)" stroke="#64748b" strokeWidth="1" />
      <text x="160" y="32" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
        Ókori feladvány: 7 fej és 20 láb
      </text>
      <text x="160" y="48" fill="#94a3b8" fontSize="10" textAnchor="middle">
        x = nyulak száma (4 láb) | y = tyúkok száma (2 láb)
      </text>

      {/* Nyulak kártya (3 db) */}
      <rect x="25" y="70" width="130" height="110" rx="8" fill="rgba(2, 132, 199, 0.15)" stroke="#0284c7" strokeWidth="1.5" />
      <text x="90" y="90" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Nyulak (x = 3)</text>
      <text x="90" y="112" fill="#ffffff" fontSize="22" textAnchor="middle">🐰 🐰 🐰</text>
      <text x="90" y="138" fill="#bae6fd" fontSize="11" textAnchor="middle">Fejek: 3 × 1 = 3</text>
      <text x="90" y="158" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Lábak: 3 × 4 = 12</text>

      {/* Tyúkok kártya (4 db) */}
      <rect x="165" y="70" width="130" height="110" rx="8" fill="rgba(234, 88, 12, 0.15)" stroke="#ea580c" strokeWidth="1.5" />
      <text x="230" y="90" fill="#fb923c" fontSize="12" fontWeight="bold" textAnchor="middle">Tyúkok (y = 4)</text>
      <text x="230" y="112" fill="#ffffff" fontSize="22" textAnchor="middle">🐔 🐔 🐔 🐔</text>
      <text x="230" y="138" fill="#ffedd5" fontSize="11" textAnchor="middle">Fejek: 4 × 1 = 4</text>
      <text x="230" y="158" fill="#fb923c" fontSize="12" fontWeight="bold" textAnchor="middle">Lábak: 4 × 2 = 8</text>

      {/* Egyenletrendszer összesítés */}
      <rect x="25" y="195" width="270" height="75" rx="8" fill="rgba(15, 23, 42, 0.9)" stroke="#818cf8" strokeWidth="1.5" />
      <text x="40" y="222" fill="#c7d2fe" fontSize="14" fontWeight="bold" fontFamily="monospace">
        ⎧ x + y = 7
      </text>
      <text x="40" y="248" fill="#c7d2fe" fontSize="14" fontWeight="bold" fontFamily="monospace">
        ⎩ 4x + 2y = 20  ⟹  2x + y = 10
      </text>
      <text x="210" y="228" fill="#a7f3d0" fontSize="11" fontWeight="bold">Fejek: 3 + 4 = 7 ✓</text>
      <text x="210" y="248" fill="#a7f3d0" fontSize="11" fontWeight="bold">Lábak: 12 + 8 = 20 ✓</text>

      {/* Alsó megjegyzés */}
      <rect x="25" y="280" width="270" height="26" rx="6" fill="rgba(99, 102, 241, 0.2)" />
      <text x="160" y="297" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">
        Grafikusan a két egyenes a (3; 4) pontban metszi egymást!
      </text>
    </svg>
  );
};

// 5. Dani és Anyukája találkozási mozgása (720 méteres szakasz)
export const MotionMeetingSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 200"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <rect width="320" height="200" fill="#0f172a" />

      {/* Cím */}
      <text x="160" y="24" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">
        Találkozási feladat (720 méter távolság)
      </text>

      {/* Útvonal egyenes */}
      <line x1="40" y1="90" x2="280" y2="90" stroke="#475569" strokeWidth="4" strokeLinecap="round" />

      {/* Iskola pont (balra, x=720 vagy x=0) */}
      <circle cx="40" cy="90" r="7" fill="#3b82f6" />
      <text x="40" y="70" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">Iskola (Dani)</text>
      <text x="40" y="115" fill="#94a3b8" fontSize="10" textAnchor="middle">v₁ = 60 m/perc</text>
      <text x="75" y="82" fill="#38bdf8" fontSize="14">➔</text>

      {/* Otthon pont (jobbra) */}
      <circle cx="280" cy="90" r="7" fill="#ec4899" />
      <text x="280" y="70" fill="#f472b6" fontSize="11" fontWeight="bold" textAnchor="middle">Otthon (Anya)</text>
      <text x="280" y="115" fill="#94a3b8" fontSize="10" textAnchor="middle">v₂ = 30 m/perc</text>
      <text x="245" y="82" fill="#f472b6" fontSize="14">⬅</text>

      {/* Találkozási pont M: 240 m otthontól, 480 m iskolától: x = 40 + 480*(240/720) = 40 + 160 = 200 */}
      <line x1="200" y1="65" x2="200" y2="120" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="200" cy="90" r="9" fill="#eab308" stroke="#ffffff" strokeWidth="2" />
      <text x="200" y="55" fill="#fde047" fontSize="11" fontWeight="bold" textAnchor="middle">Találkozás M</text>
      <text x="200" y="135" fill="#fde047" fontSize="10" fontWeight="bold" textAnchor="middle">t = 8 perc</text>

      {/* Távolság feliratok */}
      <rect x="25" y="150" width="270" height="35" rx="6" fill="rgba(30, 41, 59, 0.8)" border="1" />
      <text x="160" y="166" fill="#cbd5e1" fontSize="10" textAnchor="middle">
        Együttes sebesség: 60 + 30 = 90 m/perc ⟹ t = 720 / 90 = 8 perc
      </text>
      <text x="160" y="180" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
        Távolság otthontól: 30 · 8 = 240 méter (iskolától: 480 m)
      </text>
    </svg>
  );
};

// 6. Bolha rácsponti ugrásai
export const FleaGridSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 280 200"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <defs>
        <pattern id="flea-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="280" height="200" fill="url(#flea-grid)" />

      {/* Tengelyek: Origó: (60, 150), 1 egység = 25px */}
      <line x1="30" y1="150" x2="260" y2="150" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="60" y1="180" x2="60" y2="20" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="255" y="145" fill="#cbd5e1" fontSize="10" fontWeight="bold">x</text>
      <text x="65" y="30" fill="#cbd5e1" fontSize="10" fontWeight="bold">y</text>

      {/* 1. bolha ugrásai: (0; -2) -> (1; 0) -> (2; 2) -> (3; 4) */}
      {/* px = 60 + x*25, py = 150 - y*25 */}
      {/* (0; -2) -> (60, 200) - nem fér el, ugrások: (1; 0)->(85, 150), (2; 2)->(110, 100), (3; 4)->(135, 50) */}
      <line x1="60" y1="200" x2="160" y2="0" stroke="#38bdf8" strokeWidth="2.5" />
      <circle cx="85" cy="150" r="4" fill="#38bdf8" />
      <circle cx="110" cy="100" r="4" fill="#38bdf8" />

      {/* 2. bolha: x + y = 7 egyenes: x=0, y=7; x=3, y=4; x=5, y=2 */}
      {/* (3; 4) -> px = 135, py = 50; (5; 2) -> px = 185, py = 100 */}
      <line x1="85" y1="0" x2="235" y2="150" stroke="#f43f5e" strokeWidth="2.5" />

      {/* Közös pont M(3; 4): px = 135, py = 50 */}
      <circle cx="135" cy="50" r="7" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
      <rect x="150" y="40" width="95" height="22" rx="4" fill="rgba(15, 23, 42, 0.9)" stroke="#fbbf24" strokeWidth="1" />
      <text x="197" y="55" fill="#fde047" fontSize="10" fontWeight="bold" textAnchor="middle">Közös pont: (3; 4)</text>

      {/* Jelmagyarázat */}
      <rect x="20" y="165" width="240" height="26" rx="4" fill="rgba(30, 41, 59, 0.85)" />
      <text x="140" y="182" fill="#cbd5e1" fontSize="10" textAnchor="middle">
        1. bolha: y = 2x − 2  |  2. bolha: x + y = 7
      </text>
    </svg>
  );
};


