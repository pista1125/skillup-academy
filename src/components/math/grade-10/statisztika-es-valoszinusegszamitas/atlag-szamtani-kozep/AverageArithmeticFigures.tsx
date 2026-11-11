import React from 'react';

// --- 1. Kétkarú mérleg / forgatónyomaték ábra (Súlypont analógia) ---
export const BalanceMeanSvg: React.FC<{ size?: number }> = ({ size = 260 }) => {
  return (
    <svg
      viewBox="0 0 320 200"
      width={size}
      height={(size * 200) / 320}
      className="max-w-full h-auto select-none"
    >
      <defs>
        <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="fulcrumGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <filter id="shadowMean" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Alapzat */}
      <rect x="20" y="180" width="280" height="8" rx="4" fill="#cbd5e1" />
      <line x1="20" y1="180" x2="300" y2="180" stroke="#94a3b8" strokeWidth="2" />

      {/* Forgáspont (Ék / Alátámasztás az átlagnál) */}
      <polygon points="160,110 142,180 178,180" fill="url(#fulcrumGrad)" filter="url(#shadowMean)" />
      <circle cx="160" cy="110" r="5" fill="#ffffff" stroke="#047857" strokeWidth="2.5" />
      
      {/* Forgáspont felirat: Átlag */}
      <g transform="translate(160, 160)">
        <rect x="-32" y="-12" width="64" height="20" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
        <text x="0" y="2" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
          x̄ (Átlag)
        </text>
      </g>

      {/* Mérleghinta / Vízszintes tengely */}
      <rect x="30" y="105" width="260" height="10" rx="5" fill="url(#beamGrad)" filter="url(#shadowMean)" />

      {/* Beosztás a tengelyen */}
      {[50, 90, 130, 160, 190, 230, 270].map((x, i) => (
        <line key={i} x1={x} y1="102" x2={x} y2="118" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
      ))}

      {/* Súlyok a bal oldalon (negatív eltérések) */}
      {/* Súly az 50-es pontnál (távolság: 110) */}
      <g transform="translate(50, 75)">
        <rect x="-14" y="-20" width="28" height="28" rx="6" fill="#3b82f6" filter="url(#shadowMean)" />
        <text x="0" y="-3" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">x₁</text>
        {/* Kar távolság nyíl */}
        <line x1="0" y1="23" x2="105" y2="23" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="52" y="35" textAnchor="middle" fill="#2563eb" fontSize="9" fontWeight="bold">d₁ = x₁ - x̄ &lt; 0</text>
      </g>

      {/* Súly a 90-es pontnál (távolság: 70) */}
      <g transform="translate(90, 83)">
        <rect x="-12" y="-16" width="24" height="24" rx="5" fill="#60a5fa" filter="url(#shadowMean)" />
        <text x="0" y="0" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">x₂</text>
      </g>

      {/* Súlyok a jobb oldalon (pozitív eltérések) */}
      {/* Súly a 230-as pontnál */}
      <g transform="translate(230, 83)">
        <rect x="-12" y="-16" width="24" height="24" rx="5" fill="#818cf8" filter="url(#shadowMean)" />
        <text x="0" y="0" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">x₃</text>
      </g>

      {/* Súly a 270-es pontnál */}
      <g transform="translate(270, 75)">
        <rect x="-14" y="-20" width="28" height="28" rx="6" fill="#6366f1" filter="url(#shadowMean)" />
        <text x="0" y="-3" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">x₄</text>
        {/* Kar távolság nyíl */}
        <line x1="-105" y1="23" x2="0" y2="23" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="-52" y="35" textAnchor="middle" fill="#4f46e5" fontSize="9" fontWeight="bold">d₄ = x₄ - x̄ &gt; 0</text>
      </g>

      {/* Fő összefüggés felül */}
      <g transform="translate(160, 24)">
        <rect x="-95" y="-14" width="190" height="28" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" filter="url(#shadowMean)" />
        <text x="0" y="4" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
          Σ (xᵢ - x̄) = 0 • Egyensúlyi pont
        </text>
      </g>
    </svg>
  );
};

// --- 2. Átlagtól vett eltérések számegyenesen (Deviation vectors) ---
export const DeviationLineSvg: React.FC<{ size?: number }> = ({ size = 260 }) => {
  return (
    <svg
      viewBox="0 0 340 180"
      width={size}
      height={(size * 180) / 340}
      className="max-w-full h-auto select-none"
    >
      <defs>
        <marker id="arrowRed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#ef4444" />
        </marker>
        <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#3b82f6" />
        </marker>
      </defs>

      {/* Számegyenes tengely */}
      <line x1="20" y1="120" x2="320" y2="120" stroke="#64748b" strokeWidth="2.5" />
      <polygon points="325,120 315,115 315,125" fill="#64748b" />

      {/* Skálaosztások: 10, 20, 30, 40, 50, 60 */}
      {[
        { val: 10, x: 50 },
        { val: 20, x: 100 },
        { val: 30, x: 150 },
        { val: 40, x: 200 },
        { val: 50, x: 250 },
        { val: 60, x: 300 }
      ].map((pt) => (
        <g key={pt.val}>
          <line x1={pt.x} y1="114" x2={pt.x} y2="126" stroke="#94a3b8" strokeWidth="2" />
          <text x={pt.x} y="142" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold">
            {pt.val}
          </text>
        </g>
      ))}

      {/* Átlag vonal: x̄ = 35 */}
      <line x1="175" y1="30" x2="175" y2="120" stroke="#10b981" strokeWidth="2.5" strokeDasharray="4 3" />
      <circle cx="175" cy="120" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
      <g transform="translate(175, 20)">
        <rect x="-35" y="-12" width="70" height="22" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
        <text x="0" y="3" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="bold">
          x̄ = 35
        </text>
      </g>

      {/* Adatpont 1: 15 (eltérés -20) */}
      <circle cx="75" cy="120" r="5" fill="#ef4444" />
      <path d="M 75 80 L 168 80" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)" />
      <text x="120" y="73" textAnchor="middle" fill="#b91c1c" fontSize="10" fontWeight="bold">
        -20
      </text>

      {/* Adatpont 2: 25 (eltérés -10) */}
      <circle cx="125" cy="120" r="5" fill="#ef4444" />
      <path d="M 125 95 L 168 95" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)" />
      <text x="146" y="90" textAnchor="middle" fill="#b91c1c" fontSize="10" fontWeight="bold">
        -10
      </text>

      {/* Adatpont 3: 45 (eltérés +10) */}
      <circle cx="225" cy="120" r="5" fill="#3b82f6" />
      <path d="M 225 95 L 182 95" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBlue)" />
      <text x="204" y="90" textAnchor="middle" fill="#1d4ed8" fontSize="10" fontWeight="bold">
        +10
      </text>

      {/* Adatpont 4: 55 (eltérés +20) */}
      <circle cx="275" cy="120" r="5" fill="#3b82f6" />
      <path d="M 275 80 L 182 80" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBlue)" />
      <text x="230" y="73" textAnchor="middle" fill="#1d4ed8" fontSize="10" fontWeight="bold">
        +20
      </text>

      {/* Magyarázat alul */}
      <text x="170" y="168" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">
        Negatív eltérések: (-20) + (-10) = -30  |  Pozitív eltérések: (+10) + (+20) = +30  ➔  Összeg: 0
      </text>
    </svg>
  );
};

// --- 3. Súlyozott számtani közép (Weighted Mean Blocks) ---
export const WeightedMeanBlocksSvg: React.FC<{ size?: number }> = ({ size = 260 }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={(size * 180) / 320}
      className="max-w-full h-auto select-none"
    >
      <defs>
        <linearGradient id="weightGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="weightGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="weightGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* Fejléc felirat */}
      <text x="160" y="22" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">
        Súlyozott átlag: érték × gyakoriság (súly)
      </text>

      {/* Oszlop 1: Érték 3, Súly 4 (pl. 4 db hármas jegy) */}
      <g transform="translate(40, 40)">
        <rect x="0" y="20" width="60" height="70" rx="8" fill="url(#weightGrad1)" />
        <text x="30" y="50" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">3</text>
        <text x="30" y="70" textAnchor="middle" fill="#e0f2fe" fontSize="10">4 db jegy</text>
        <text x="30" y="105" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">
          3 × 4 = 12
        </text>
      </g>

      {/* Plusz jel */}
      <text x="120" y="95" textAnchor="middle" fill="#64748b" fontSize="20" fontWeight="bold">+</text>

      {/* Oszlop 2: Érték 4, Súly 2 (pl. 2 db négyes jegy) */}
      <g transform="translate(135, 40)">
        <rect x="0" y="45" width="60" height="45" rx="8" fill="url(#weightGrad2)" />
        <text x="30" y="68" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">4</text>
        <text x="30" y="82" textAnchor="middle" fill="#e0e7ff" fontSize="10">2 db jegy</text>
        <text x="30" y="105" textAnchor="middle" fill="#4338ca" fontSize="11" fontWeight="bold">
          4 × 2 = 8
        </text>
      </g>

      {/* Plusz jel */}
      <text x="215" y="95" textAnchor="middle" fill="#64748b" fontSize="20" fontWeight="bold">+</text>

      {/* Oszlop 3: Érték 5, Súly 4 (pl. 4 db ötös jegy) */}
      <g transform="translate(230, 40)">
        <rect x="0" y="20" width="60" height="70" rx="8" fill="url(#weightGrad3)" />
        <text x="30" y="50" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">5</text>
        <text x="30" y="70" textAnchor="middle" fill="#ecfdf5" fontSize="10">4 db jegy</text>
        <text x="30" y="105" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="bold">
          5 × 4 = 20
        </text>
      </g>

      {/* Összesítés képlet alul */}
      <g transform="translate(160, 155)">
        <rect x="-140" y="-16" width="280" height="28" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
        <text x="0" y="2" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">
          x̄ = (12 + 8 + 20) / (4 + 2 + 4) = 40 / 10 = 4,00
        </text>
      </g>
    </svg>
  );
};

// --- 4. Feri lövészversenye (Target shooting visualization) ---
export const TargetShootingSvg: React.FC<{ size?: number }> = ({ size = 260 }) => {
  return (
    <svg
      viewBox="0 0 300 200"
      width={size}
      height={(size * 200) / 300}
      className="max-w-full h-auto select-none"
    >
      {/* Céltábla körök */}
      <g transform="translate(100, 100)">
        <circle cx="0" cy="0" r="75" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="60" fill="#f1f5f9" stroke="#0f172a" strokeWidth="1" />
        <circle cx="0" cy="0" r="45" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1" />
        <circle cx="0" cy="0" r="30" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
        <circle cx="0" cy="0" r="15" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
        <circle cx="0" cy="0" r="4" fill="#ffffff" />

        {/* Körszámok */}
        <text x="0" y="-64" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">7</text>
        <text x="0" y="-49" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold">8</text>
        <text x="0" y="-34" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">9</text>
        <text x="0" y="-18" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">10</text>

        {/* Feri eddigi 4 találata (8, 8, 9, 10) */}
        {/* Találat 1: 8-as kör */}
        <circle cx="-38" cy="20" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
        {/* Találat 2: 8-as kör */}
        <circle cx="28" cy="32" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
        {/* Találat 3: 9-es kör */}
        <circle cx="18" cy="-14" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
        {/* Találat 4: 10-es telitalálat */}
        <circle cx="-5" cy="5" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />

        {/* 5. kérdéses találat (cél: 9 vagy 10) */}
        <circle cx="2" cy="-6" r="6" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3 2" />
        <text x="6" y="-8" fill="#10b981" fontSize="10" fontWeight="black">5.?</text>
      </g>

      {/* Számítási panel a jobb oldalon */}
      <g transform="translate(190, 30)">
        <rect x="0" y="0" width="105" height="140" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
        <text x="10" y="20" fill="#0f172a" fontSize="10" fontWeight="bold">Lövészverseny:</text>
        
        <text x="10" y="40" fill="#475569" fontSize="9">1. lövés: 8 pont</text>
        <text x="10" y="54" fill="#475569" fontSize="9">2. lövés: 8 pont</text>
        <text x="10" y="68" fill="#475569" fontSize="9">3. lövés: 9 pont</text>
        <text x="10" y="82" fill="#475569" fontSize="9">4. lövés: 10 pont</text>
        <line x1="10" y1="88" x2="95" y2="88" stroke="#cbd5e1" strokeWidth="1" />
        <text x="10" y="100" fill="#1e293b" fontSize="9" fontWeight="bold">Eddig: 35 pont</text>
        <text x="10" y="115" fill="#047857" fontSize="9" fontWeight="bold">Cél: átlag &gt; 8,6</text>
        <text x="10" y="128" fill="#047857" fontSize="9">Összeg &gt; 43 ➔</text>
        <text x="68" y="128" fill="#b91c1c" fontSize="10" fontWeight="black">x ≥ 9</text>
      </g>
    </svg>
  );
};

// --- 5. Kiugró érték / Outlier torzító hatása ---
export const OutlierImpactSvg: React.FC<{ size?: number }> = ({ size = 260 }) => {
  return (
    <svg
      viewBox="0 0 320 170"
      width={size}
      height={(size * 170) / 320}
      className="max-w-full h-auto select-none"
    >
      {/* 1. Eset: Kiugró érték nélkül */}
      <g transform="translate(10, 20)">
        <text x="0" y="12" fill="#0f172a" fontSize="10" fontWeight="bold">Normál fizetések (4 dolgozó): 200, 210, 220, 230 ezer Ft</text>
        <line x1="0" y1="35" x2="290" y2="35" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="50" cy="35" r="5" fill="#3b82f6" />
        <circle cx="65" cy="35" r="5" fill="#3b82f6" />
        <circle cx="80" cy="35" r="5" fill="#3b82f6" />
        <circle cx="95" cy="35" r="5" fill="#3b82f6" />
        {/* Átlag: 215 */}
        <polygon points="72.5,45 66,55 79,55" fill="#10b981" />
        <text x="72.5" y="68" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="bold">Átlag: 215 ezer</text>
      </g>

      {/* 2. Eset: 1 kiugró értékkel (igazgató: 1 500 ezer Ft) */}
      <g transform="translate(10, 95)">
        <text x="0" y="12" fill="#b91c1c" fontSize="10" fontWeight="bold">+1 kiugró adat (igazgató: 1500 ezer Ft) ➔ Elcsúszott átlag!</text>
        <line x1="0" y1="35" x2="290" y2="35" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="50" cy="35" r="4.5" fill="#3b82f6" />
        <circle cx="65" cy="35" r="4.5" fill="#3b82f6" />
        <circle cx="80" cy="35" r="4.5" fill="#3b82f6" />
        <circle cx="95" cy="35" r="4.5" fill="#3b82f6" />
        {/* Kiugró pont a jobb szélen */}
        <circle cx="280" cy="35" r="6" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
        <text x="280" y="24" textAnchor="middle" fill="#b91c1c" fontSize="9" fontWeight="bold">Outlier</text>
        {/* Új elcsúszott átlag: 472 ezer */}
        <polygon points="160,45 153,55 167,55" fill="#ef4444" />
        <text x="160" y="68" textAnchor="middle" fill="#b91c1c" fontSize="10" fontWeight="bold">Új átlag: 472 ezer Ft (4 dolgozó kevesebbet keres!)</text>
      </g>
    </svg>
  );
};

