import React from 'react';

interface FigureProps {
  className?: string;
  size?: number;
}

/**
 * 1. A Valószínűségi Spektrum (0-tól 1-ig)
 * Szemlélteti a lehetetlen (P = 0), véletlen (0 < P < 1) és biztos (P = 1) események tengelyét,
 * valós kockás és érmés példákkal.
 */
export const CertaintySpectrumSvg: React.FC<FigureProps> = ({ className = '', size = 300 }) => {
  return (
    <svg
      viewBox="0 0 460 220"
      className={`w-full h-auto max-w-[460px] select-none ${className}`}
      style={{ maxHeight: size }}
    >
      <rect width="460" height="220" rx="16" fill="#f8fafc" className="dark:fill-slate-900" />
      <rect width="460" height="220" rx="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800" />

      {/* Cím */}
      <text x="230" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">
        A valószínűség skálája: 0-tól 1-ig (0% – 100%)
      </text>

      {/* Spektrum gradiens sáv */}
      <defs>
        <linearGradient id="spectrumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="25%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="75%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>

      {/* Fő tengely */}
      <g transform="translate(40, 75)">
        <rect x="0" y="0" width="380" height="14" rx="7" fill="url(#spectrumGradient)" />
        <rect x="0" y="0" width="380" height="14" rx="7" fill="none" stroke="#cbd5e1" strokeWidth="1" className="dark:stroke-slate-700" />

        {/* 0 pont: Lehetetlen esemény */}
        <circle cx="0" cy="7" r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
        <line x1="0" y1="14" x2="0" y2="30" stroke="#ef4444" strokeWidth="2" />
        <text x="0" y="44" textAnchor="middle" fontSize="12" fontWeight="black" fill="#dc2626" className="dark:fill-rose-400">
          P = 0 (0%)
        </text>
        <text x="0" y="58" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b" className="dark:fill-rose-300">
          LEHETETLEN
        </text>
        <text x="0" y="72" textAnchor="middle" fontSize="9" fill="#64748b" className="dark:fill-slate-400">
          pl. Két kocka összege: 13
        </text>

        {/* 0.5 pont: 50-50% */}
        <circle cx="190" cy="7" r="6" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
        <line x1="190" y1="14" x2="190" y2="30" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="190" y="44" textAnchor="middle" fontSize="12" fontWeight="black" fill="#2563eb" className="dark:fill-blue-400">
          P = 0,5 (50%)
        </text>
        <text x="190" y="58" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1d4ed8" className="dark:fill-blue-300">
          FELE-FELE ESÉLY
        </text>
        <text x="190" y="72" textAnchor="middle" fontSize="9" fill="#64748b" className="dark:fill-slate-400">
          pl. Érmével fej; Páros szám kockán
        </text>

        {/* 1 pont: Biztos esemény */}
        <circle cx="380" cy="7" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
        <line x1="380" y1="14" x2="380" y2="30" stroke="#10b981" strokeWidth="2" />
        <text x="380" y="44" textAnchor="middle" fontSize="12" fontWeight="black" fill="#059669" className="dark:fill-emerald-400">
          P = 1 (100%)
        </text>
        <text x="380" y="58" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46" className="dark:fill-emerald-300">
          BIZTOS ESEMÉNY
        </text>
        <text x="380" y="72" textAnchor="middle" fontSize="9" fill="#64748b" className="dark:fill-slate-400">
          pl. Két kocka összege ≤ 12
        </text>

        {/* Véletlen események zónája felül */}
        <path d="M 15 -12 L 365 -12" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="190" y="-18" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569" className="dark:fill-slate-300">
          ← VÉLETLEN (LEHETSÉGES) ESEMÉNYEK TARTOMÁNYA: 0 &lt; P(A) &lt; 1 →
        </text>
      </g>

      {/* Alsó megjegyzés doboz */}
      <rect x="30" y="172" width="400" height="34" rx="8" fill="#f1f5f9" className="dark:fill-slate-800/80" />
      <text x="230" y="193" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155" className="dark:fill-slate-300">
        Minden lehetséges A eseményre igaz: 0 ≤ P(A) ≤ 1 és P(A) + P(nem A) = 1
      </text>
    </svg>
  );
};

/**
 * 2. Venn-diagram: Komplementer (Ellentett) Események
 * Szemlélteti az A és nem A (A-komplementer) partíciót a teljes eseménytérben.
 */
export const VennComplementSvg: React.FC<FigureProps> = ({ className = '', size = 280 }) => {
  return (
    <svg
      viewBox="0 0 400 240"
      className={`w-full h-auto max-w-[400px] select-none ${className}`}
      style={{ maxHeight: size }}
    >
      <rect width="400" height="240" rx="16" fill="#f8fafc" className="dark:fill-slate-900" />
      <rect width="400" height="240" rx="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800" />

      <text x="200" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">
        Eseménytér (Ω) és Komplementer események (A és Ā)
      </text>

      {/* Eseménytér téglalap: Ω */}
      <g transform="translate(40, 42)">
        {/* Teljes háttér mint Ā */}
        <rect x="0" y="0" width="320" height="135" rx="12" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" className="dark:fill-indigo-950/40 dark:stroke-indigo-600" />
        <text x="18" y="22" fontSize="13" fontWeight="black" fill="#4338ca" className="dark:fill-indigo-300">Ω (Eseménytér)</text>

        {/* Belső ellipszis: A esemény */}
        <ellipse cx="115" cy="72" rx="75" ry="46" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" className="dark:fill-amber-950/50 dark:stroke-amber-500" />
        <text x="115" y="65" textAnchor="middle" fontSize="13" fontWeight="black" fill="#b45309" className="dark:fill-amber-300">
          A esemény
        </text>
        <text x="115" y="82" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e" className="dark:fill-amber-400">
          P(A) = p
        </text>

        {/* Ā (nem A) tartomány felirat */}
        <text x="245" y="65" textAnchor="middle" fontSize="13" fontWeight="black" fill="#3730a3" className="dark:fill-indigo-300">
          Ā (Ellentett)
        </text>
        <text x="245" y="82" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#4338ca" className="dark:fill-indigo-400">
          P(Ā) = 1 – p
        </text>
        <text x="245" y="100" textAnchor="middle" fontSize="9" fill="#6366f1" className="dark:fill-indigo-300">
          „A nem következik be”
        </text>
      </g>

      {/* Képlet és szabály az alján */}
      <g transform="translate(40, 188)">
        <rect x="0" y="0" width="320" height="38" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-slate-700" />
        <text x="160" y="16" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a" className="dark:fill-white">
          A ∩ Ā = ∅ (kizárják egymást) &nbsp;|&nbsp; A ∪ Ā = Ω (lefedik a teret)
        </text>
        <text x="160" y="30" textAnchor="middle" fontSize="10" fontWeight="black" fill="#b45309" className="dark:fill-amber-400">
          P(A) + P(Ā) = 1 &nbsp;⟺&nbsp; P(Ā) = 1 – P(A)
        </text>
      </g>
    </svg>
  );
};

/**
 * 3. Gyöngyök és Müzliszeletek Arányos Modellje
 * Szemlélteti az egymást kizáró események összeadását (fehér 1/6, piros 1/4, zöld 1/2, sárga 1/12).
 */
export const BeadProbabilityDistributionSvg: React.FC<FigureProps> = ({ className = '', size = 280 }) => {
  return (
    <svg
      viewBox="0 0 440 230"
      className={`w-full h-auto max-w-[440px] select-none ${className}`}
      style={{ maxHeight: size }}
    >
      <rect width="440" height="230" rx="16" fill="#f8fafc" className="dark:fill-slate-900" />
      <rect width="440" height="230" rx="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800" />

      <text x="220" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">
        Gyöngyök dobozban: Teljes eseménytér felosztása
      </text>

      {/* Oszlopos aránycsík (összesen 12 egység: fehér 2, piros 3, zöld 6, sárga 1) */}
      <g transform="translate(35, 48)">
        {/* Fehér gyöngy: 1/6 = 2/12 (kb. 61.6px) */}
        <rect x="0" y="0" width="61.6" height="42" rx="4" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="30.8" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569">Fehér</text>
        <text x="30.8" y="34" textAnchor="middle" fontSize="9" fontWeight="black" fill="#334155">1/6 (2/12)</text>

        {/* Piros gyöngy: 25% = 1/4 = 3/12 (92.5px) */}
        <rect x="61.6" y="0" width="92.5" height="42" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="107.8" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#dc2626">Piros</text>
        <text x="107.8" y="34" textAnchor="middle" fontSize="9" fontWeight="black" fill="#b91c1c">25% = 1/4</text>

        {/* Zöld gyöngy: 1/2 = 6/12 (185px) */}
        <rect x="154.1" y="0" width="185" height="42" rx="4" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
        <text x="246.6" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#16a34a">Zöld (legnagyobb rész)</text>
        <text x="246.6" y="34" textAnchor="middle" fontSize="9" fontWeight="black" fill="#15803d">1/2 (6/12) = 50%</text>

        {/* Sárga gyöngy: maradék 1/12 (30.8px) */}
        <rect x="339.1" y="0" width="30.8" height="42" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="354.5" y="22" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#d97706">Sárga</text>
        <text x="354.5" y="34" textAnchor="middle" fontSize="8" fontWeight="black" fill="#b45309">1/12</text>
      </g>

      {/* Levezetés és számítások alul */}
      <g transform="translate(35, 105)">
        <rect x="0" y="0" width="370" height="105" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-slate-700" />

        <text x="15" y="24" fontSize="11" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-200">
          1. Sárga esélye: P(sárga) = 1 – (1/6 + 1/4 + 1/2) = 1 – 11/12 = 1/12 (kb. 8,3%)
        </text>

        <text x="15" y="48" fontSize="11" fontWeight="bold" fill="#2563eb" className="dark:fill-blue-400">
          2. Piros VAGY Zöld: Egymást kizáró események összeadása:
        </text>
        <text x="35" y="65" fontSize="10" fontWeight="mono" fill="#1d4ed8" className="dark:fill-blue-300">
          P(piros ∪ zöld) = P(piros) + P(zöld) = 1/4 + 1/2 = 3/4 (75%)
        </text>

        <text x="15" y="88" fontSize="11" fontWeight="bold" fill="#dc2626" className="dark:fill-rose-400">
          3. Kék gyöngy esélye: P(kék) = 0 (Lehetetlen esemény, nincs kék gyöngy!)
        </text>
      </g>
    </svg>
  );
};

