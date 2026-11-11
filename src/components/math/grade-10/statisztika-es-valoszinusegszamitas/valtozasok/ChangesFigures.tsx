import React from 'react';

// 1. Abszolút vs Relatív változás összehasonlító SVG (pl. kerékpártúra: +14 km vs +15%)
export const AbsoluteVsRelativeSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 280,
  className = ''
}) => {
  return (
    <svg
      viewBox="0 0 320 200"
      className={`max-w-full h-auto drop-shadow-sm select-none ${className}`}
      style={{ width: size, height: (size * 200) / 320 }}
    >
      <defs>
        <linearGradient id="absRelGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="absRelGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e11d48" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#e11d48" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* 1. Panel: Abszolút változás (+14 km majd -14 km) */}
      <g transform="translate(15, 20)">
        <rect x="0" y="0" width="138" height="135" rx="10" fill="url(#absRelGrad1)" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="69" y="18" fill="#0369a1" className="dark:fill-sky-300" fontSize="10" fontWeight="black" textAnchor="middle">
          ABSZOLÚT VÁLTOZÁS
        </text>
        <text x="69" y="32" fill="#64748b" fontSize="9" textAnchor="middle">
          (Összeadás és kivonás)
        </text>

        {/* Lépések */}
        <text x="12" y="55" fill="#334155" className="dark:fill-slate-300" fontSize="10">Kezdő táv: <b>62 km</b></text>
        <text x="12" y="73" fill="#0284c7" fontSize="10">1. lépés: <b>+14 km</b> ➔ 76 km</text>
        <text x="12" y="91" fill="#0284c7" fontSize="10">2. lépés: <b>-14 km</b> ➔ 62 km</text>

        <rect x="8" y="102" width="122" height="24" rx="6" fill="#0284c7" fillOpacity="0.1" />
        <text x="69" y="118" fill="#0369a1" className="dark:fill-sky-200" fontSize="10" fontWeight="bold" textAnchor="middle">
          Eredmény: 62 = 62 km (Azonos!)
        </text>
      </g>

      {/* 2. Panel: Relatív változás (+15% majd -15%) */}
      <g transform="translate(167, 20)">
        <rect x="0" y="0" width="138" height="135" rx="10" fill="url(#absRelGrad2)" stroke="#f43f5e" strokeWidth="1.5" />
        <text x="69" y="18" fill="#be123c" className="dark:fill-rose-300" fontSize="10" fontWeight="black" textAnchor="middle">
          RELATÍV VÁLTOZÁS
        </text>
        <text x="69" y="32" fill="#64748b" fontSize="9" textAnchor="middle">
          (Százalék és szorzás)
        </text>

        {/* Lépések */}
        <text x="12" y="55" fill="#334155" className="dark:fill-slate-300" fontSize="10">Kezdő táv: <b>62 km</b></text>
        <text x="12" y="73" fill="#e11d48" fontSize="10">1. lépés: <b>+15%</b> ➔ 71,3 km</text>
        <text x="12" y="91" fill="#e11d48" fontSize="10">2. lépés: <b>-15%</b> ➔ 60,6 km</text>

        <rect x="8" y="102" width="122" height="24" rx="6" fill="#e11d48" fillOpacity="0.1" />
        <text x="69" y="118" fill="#9f1239" className="dark:fill-rose-200" fontSize="10" fontWeight="bold" textAnchor="middle">
          Eredmény: 60,6 &lt; 62 km (Kisebb!)
        </text>
      </g>

      {/* Alsó tanulság banner */}
      <rect x="15" y="165" width="290" height="26" rx="6" fill="#f8fafc" className="dark:fill-slate-800" stroke="#cbd5e1" strokeWidth="1" />
      <text x="160" y="182" fill="#0f172a" className="dark:fill-slate-200" fontSize="10" fontWeight="black" textAnchor="middle">
        A százalékos növelés majd csökkentés a bázis eltolódása miatt mindig veszteséget okoz!
      </text>
    </svg>
  );
};

// 2. Százalék vs Százalékpont szemléltető SVG
export const PercentVsPercentagePointSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 280,
  className = ''
}) => {
  return (
    <svg
      viewBox="0 0 320 200"
      className={`max-w-full h-auto drop-shadow-sm select-none ${className}`}
      style={{ width: size, height: (size * 200) / 320 }}
    >
      {/* Kezdő ráta: 4% */}
      <g transform="translate(30, 35)">
        <rect x="0" y="0" width="70" height="110" rx="8" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
        <text x="35" y="30" fill="#0369a1" fontSize="10" fontWeight="bold" textAnchor="middle">Kezdő ráta</text>
        <text x="35" y="65" fill="#0284c7" fontSize="24" fontWeight="black" textAnchor="middle">4%</text>
        <text x="35" y="90" fill="#64748b" fontSize="9" textAnchor="middle">(Alapadat)</text>
      </g>

      {/* Átmenet nyíl */}
      <g transform="translate(110, 75)">
        <line x1="0" y1="15" x2="35" y2="15" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowPoint)" />
        <polygon points="35,11 43,15 35,19" fill="#64748b" />
        <text x="20" y="8" fill="#475569" fontSize="9" fontWeight="bold" textAnchor="middle">Növekedés</text>
      </g>

      {/* Új ráta: 5% */}
      <g transform="translate(160, 25)">
        <rect x="0" y="0" width="70" height="120" rx="8" fill="#ecfdf5" stroke="#34d399" strokeWidth="2" />
        <text x="35" y="30" fill="#065f46" fontSize="10" fontWeight="bold" textAnchor="middle">Új ráta</text>
        <text x="35" y="68" fill="#059669" fontSize="26" fontWeight="black" textAnchor="middle">5%</text>
        <text x="35" y="95" fill="#64748b" fontSize="9" textAnchor="middle">(Megváltozott)</text>
      </g>

      {/* Jobb oldali kétféle értelmezés */}
      <g transform="translate(240, 25)">
        {/* Százalékpont kártya */}
        <rect x="0" y="0" width="70" height="55" rx="6" fill="#fdf4ff" stroke="#d946ef" strokeWidth="1.5" />
        <text x="35" y="14" fill="#a21caf" fontSize="8" fontWeight="black" textAnchor="middle">ABSZOLÚT</text>
        <text x="35" y="32" fill="#86198f" fontSize="14" fontWeight="black" textAnchor="middle">+1 sz.p.</text>
        <text x="35" y="47" fill="#64748b" fontSize="7" textAnchor="middle">(5% - 4% = 1%pont)</text>

        {/* Százalékos növekedés kártya */}
        <rect x="0" y="65" width="70" height="55" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="35" y="79" fill="#1d4ed8" fontSize="8" fontWeight="black" textAnchor="middle">RELATÍV</text>
        <text x="35" y="97" fill="#1e40af" fontSize="14" fontWeight="black" textAnchor="middle">+25%</text>
        <text x="35" y="112" fill="#64748b" fontSize="7" textAnchor="middle">(1 / 4 = 25% növekedés)</text>
      </g>

      {/* Alsó megjegyzés */}
      <rect x="20" y="160" width="280" height="30" rx="8" fill="#fff7ed" stroke="#fdba74" strokeWidth="1" />
      <text x="160" y="179" fill="#9a3412" fontSize="10" fontWeight="bold" textAnchor="middle">
        ⚠️ 1 százalékpontos emelkedés itt 25%-os relatív növekedést jelent!
      </text>
    </svg>
  );
};

// 3. Bázisviszonyszám és Láncviszonyszám idővonal SVG
export const BaseChainIndexSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 280,
  className = ''
}) => {
  return (
    <svg
      viewBox="0 0 320 190"
      className={`max-w-full h-auto drop-shadow-sm select-none ${className}`}
      style={{ width: size, height: (size * 190) / 320 }}
    >
      {/* Időtengely pontok: 2020 (x0), 2021 (x1), 2022 (x2), 2023 (x3) */}
      <line x1="30" y1="95" x2="290" y2="95" stroke="#94a3b8" strokeWidth="2" />

      {/* 2020: x0 (Bázis) */}
      <circle cx="50" cy="95" r="7" fill="#0284c7" />
      <text x="50" y="80" fill="#0284c7" fontSize="10" fontWeight="black" textAnchor="middle">x₀</text>
      <text x="50" y="112" fill="#64748b" fontSize="9" textAnchor="middle">2020 (Bázis)</text>

      {/* 2021: x1 */}
      <circle cx="120" cy="95" r="5" fill="#475569" />
      <text x="120" y="80" fill="#334155" className="dark:fill-slate-300" fontSize="10" fontWeight="bold" textAnchor="middle">x₁</text>
      <text x="120" y="112" fill="#64748b" fontSize="9" textAnchor="middle">2021</text>

      {/* 2022: x2 */}
      <circle cx="190" cy="95" r="5" fill="#475569" />
      <text x="190" y="80" fill="#334155" className="dark:fill-slate-300" fontSize="10" fontWeight="bold" textAnchor="middle">x₂</text>
      <text x="190" y="112" fill="#64748b" fontSize="9" textAnchor="middle">2022</text>

      {/* 2023: x3 */}
      <circle cx="260" cy="95" r="5" fill="#475569" />
      <text x="260" y="80" fill="#334155" className="dark:fill-slate-300" fontSize="10" fontWeight="bold" textAnchor="middle">x₃</text>
      <text x="260" y="112" fill="#64748b" fontSize="9" textAnchor="middle">2023</text>

      {/* Láncviszonyszám ívek fent */}
      <path d="M 53 70 Q 85 45 117 70" fill="none" stroke="#10b981" strokeWidth="2" />
      <text x="85" y="50" fill="#059669" fontSize="9" fontWeight="bold" textAnchor="middle">L₁ = x₁/x₀</text>

      <path d="M 123 70 Q 155 45 187 70" fill="none" stroke="#10b981" strokeWidth="2" />
      <text x="155" y="50" fill="#059669" fontSize="9" fontWeight="bold" textAnchor="middle">L₂ = x₂/x₁</text>

      <path d="M 193 70 Q 225 45 257 70" fill="none" stroke="#10b981" strokeWidth="2" />
      <text x="225" y="50" fill="#059669" fontSize="9" fontWeight="bold" textAnchor="middle">L₃ = x₃/x₂</text>

      {/* Bázisviszonyszám nagy ív lent */}
      <path d="M 53 125 Q 155 170 257 125" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeDasharray="4 2" />
      <text x="155" y="165" fill="#4f46e5" fontSize="10" fontWeight="black" textAnchor="middle">
        Bázisviszonyszám: B₃ = x₃ / x₀ = L₁ · L₂ · L₃
      </text>

      <text x="160" y="20" fill="#0f172a" className="dark:fill-slate-200" fontSize="11" fontWeight="black" textAnchor="middle">
        A láncviszonyszámok szorzata megadja a bázisviszonyszámot!
      </text>
    </svg>
  );
};

// 4. Autó Értékvesztési Waterfall Grafikon SVG
export const CarDepreciationChainSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 280,
  className = ''
}) => {
  return (
    <svg
      viewBox="0 0 320 190"
      className={`max-w-full h-auto drop-shadow-sm select-none ${className}`}
      style={{ width: size, height: (size * 190) / 320 }}
    >
      {/* Oszlopok: Vételár (4,2M), 1. év (-20% -> 3,36M), 2. év (-15% -> 2,856M) */}
      {/* 1. Vételár oszlop */}
      <g transform="translate(30, 30)">
        <rect x="0" y="10" width="55" height="120" rx="6" fill="#0284c7" />
        <text x="27" y="5" fill="#0369a1" fontSize="10" fontWeight="bold" textAnchor="middle">Új autó</text>
        <text x="27" y="70" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">4,20 M</text>
        <text x="27" y="145" fill="#64748b" fontSize="9" textAnchor="middle">Kezdetben</text>
      </g>

      {/* 1. Csökkenés nyíl (-20%) */}
      <g transform="translate(95, 55)">
        <path d="M 0 10 L 25 10" stroke="#ef4444" strokeWidth="2" />
        <polygon points="25,6 32,10 25,14" fill="#ef4444" />
        <text x="16" y="0" fill="#dc2626" fontSize="9" fontWeight="black" textAnchor="middle">-20%</text>
        <text x="16" y="24" fill="#64748b" fontSize="8" textAnchor="middle">(-0,84 M)</text>
      </g>

      {/* 1. Év oszlop (3,36M) */}
      <g transform="translate(135, 54)">
        <rect x="0" y="10" width="55" height="96" rx="6" fill="#0d9488" />
        <text x="27" y="5" fill="#0f766e" fontSize="10" fontWeight="bold" textAnchor="middle">1 év után</text>
        <text x="27" y="55" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">3,36 M</text>
        <text x="27" y="121" fill="#64748b" fontSize="9" textAnchor="middle">q₁ = 0,80</text>
      </g>

      {/* 2. Csökkenés nyíl (-15%) */}
      <g transform="translate(200, 75)">
        <path d="M 0 10 L 25 10" stroke="#ef4444" strokeWidth="2" />
        <polygon points="25,6 32,10 25,14" fill="#ef4444" />
        <text x="16" y="0" fill="#dc2626" fontSize="9" fontWeight="black" textAnchor="middle">-15%</text>
        <text x="16" y="24" fill="#64748b" fontSize="8" textAnchor="middle">(-0,504 M)</text>
      </g>

      {/* 2. Év oszlop (2,856M) */}
      <g transform="translate(240, 68)">
        <rect x="0" y="10" width="55" height="82" rx="6" fill="#10b981" />
        <text x="27" y="5" fill="#047857" fontSize="10" fontWeight="bold" textAnchor="middle">2 év után</text>
        <text x="27" y="50" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">2,856 M</text>
        <text x="27" y="107" fill="#64748b" fontSize="9" textAnchor="middle">q₂ = 0,85</text>
      </g>

      {/* Alsó tanulság szöveg */}
      <text x="160" y="180" fill="#0f172a" className="dark:fill-slate-200" fontSize="10" fontWeight="bold" textAnchor="middle">
        Összesített értékvesztés: 1 - (0,80 · 0,85) = 1 - 0,68 = 32% (NEM 35%!)
      </text>
    </svg>
  );
};

