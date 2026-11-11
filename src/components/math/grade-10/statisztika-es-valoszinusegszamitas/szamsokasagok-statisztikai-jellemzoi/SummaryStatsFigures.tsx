import React from 'react';

interface FigureProps {
  className?: string;
  size?: number;
}

/**
 * 1. Céges fizetések gyakorisága: Átlag, Medián és Módusz összehasonlítása
 * A tankönyvi bevezető példa alapján: 80e (3 fő), 120e (6 fő), 200e (5 fő), 250e (5 fő), 300e (1 fő)
 */
export const MeanMedianModeSalarySvg: React.FC<FigureProps> = ({ className = '', size = 320 }) => {
  return (
    <svg
      viewBox="0 0 440 280"
      className={`w-full h-auto max-w-[440px] select-none ${className}`}
      style={{ maxHeight: size }}
    >
      <defs>
        <linearGradient id="salaryBarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="modeBarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0.7" />
        </linearGradient>
        <filter id="shadowSalary" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Háttér kártya */}
      <rect width="440" height="280" rx="16" fill="#f8fafc" className="dark:fill-slate-900" />
      <rect width="440" height="280" rx="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800" />

      {/* Cím és megjegyzés */}
      <text x="220" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">
        Céges fizetések (20 dolgozó) gyakorisági eloszlása
      </text>
      <text x="220" y="40" textAnchor="middle" fontSize="10" fill="#64748b" className="dark:fill-slate-400">
        Módusz: 120 ezer Ft | Medián: 200 ezer Ft | Átlag: 175,5 ezer Ft
      </text>

      {/* Rácsvonalak & Tengelyek */}
      <g stroke="#cbd5e1" strokeDasharray="3 3" strokeWidth="1" className="dark:stroke-slate-800">
        <line x1="50" y1="60" x2="400" y2="60" />
        <line x1="50" y1="100" x2="400" y2="100" />
        <line x1="50" y1="140" x2="400" y2="140" />
        <line x1="50" y1="180" x2="400" y2="180" />
      </g>

      {/* Y tengely skála (gyakoriság) */}
      <g fontSize="10" fill="#64748b" className="dark:fill-slate-400" textAnchor="end">
        <text x="42" y="64">6 fő</text>
        <text x="42" y="104">4 fő</text>
        <text x="42" y="144">2 fő</text>
        <text x="42" y="184">0</text>
      </g>

      {/* Oszlopok: 80k (3), 120k (6 - módusz), 200k (5), 250k (5), 300k (1) */}
      {/* 80k: gyakoriság 3 -> magasság = 3 * 20 = 60 px, y = 180 - 60 = 120 */}
      <rect x="70" y="120" width="45" height="60" rx="4" fill="url(#salaryBarGrad)" filter="url(#shadowSalary)" />
      <text x="92.5" y="112" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2563eb">3 fő</text>
      <text x="92.5" y="196" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569" className="dark:fill-slate-300">80e</text>

      {/* 120k: gyakoriság 6 -> magasság = 120 px, y = 180 - 120 = 60 -> MÓDUSZ (arany/borostyán) */}
      <rect x="140" y="60" width="45" height="120" rx="4" fill="url(#modeBarGrad)" filter="url(#shadowSalary)" />
      <text x="162.5" y="52" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#d97706">6 fő ★</text>
      <text x="162.5" y="196" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#d97706">120e</text>

      {/* 200k: gyakoriság 5 -> magasság = 100 px, y = 180 - 100 = 80 */}
      <rect x="210" y="80" width="45" height="100" rx="4" fill="url(#salaryBarGrad)" filter="url(#shadowSalary)" />
      <text x="232.5" y="72" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2563eb">5 fő</text>
      <text x="232.5" y="196" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569" className="dark:fill-slate-300">200e</text>

      {/* 250k: gyakoriság 5 -> magasság = 100 px, y = 80 */}
      <rect x="280" y="80" width="45" height="100" rx="4" fill="url(#salaryBarGrad)" filter="url(#shadowSalary)" />
      <text x="302.5" y="72" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2563eb">5 fő</text>
      <text x="302.5" y="196" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569" className="dark:fill-slate-300">250e</text>

      {/* 300k: gyakoriság 1 -> magasság = 20 px, y = 160 */}
      <rect x="350" y="160" width="45" height="20" rx="4" fill="url(#salaryBarGrad)" filter="url(#shadowSalary)" />
      <text x="372.5" y="152" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2563eb">1 fő</text>
      <text x="372.5" y="196" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569" className="dark:fill-slate-300">300e</text>

      {/* X tengely alapvonal */}
      <line x1="50" y1="180" x2="410" y2="180" stroke="#94a3b8" strokeWidth="2" />
      <text x="410" y="196" fontSize="10" fill="#64748b" textAnchor="start">Ft</text>

      {/* Mutatók jelölése lent: Terjedelem és mutató dobozok */}
      {/* Terjedelem nyíl: 80-tól 300-ig */}
      <line x1="92" y1="216" x2="372" y2="216" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow)" />
      <circle cx="92.5" cy="216" r="3" fill="#6366f1" />
      <circle cx="372.5" cy="216" r="3" fill="#6366f1" />
      <text x="232" y="213" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#4f46e5" className="dark:fill-indigo-300">
        Terjedelem: R = 300 - 80 = 220 ezer Ft
      </text>

      {/* Statisztikai jellemzők összegző sávja */}
      <g transform="translate(45, 230)">
        <rect width="105" height="34" rx="8" fill="#fef3c7" className="dark:fill-amber-950/60" stroke="#f59e0b" strokeWidth="1" />
        <text x="52.5" y="15" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#b45309" className="dark:fill-amber-300">Módusz (Mo)</text>
        <text x="52.5" y="28" textAnchor="middle" fontSize="11" fontWeight="black" fill="#92400e" className="dark:fill-amber-200">120 ezer Ft</text>

        <rect x="120" width="110" height="34" rx="8" fill="#dbeafe" className="dark:fill-blue-950/60" stroke="#3b82f6" strokeWidth="1" />
        <text x="175" y="15" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#1d4ed8" className="dark:fill-blue-300">Medián (Me)</text>
        <text x="175" y="28" textAnchor="middle" fontSize="11" fontWeight="black" fill="#1e40af" className="dark:fill-blue-200">200 ezer Ft</text>

        <rect x="245" width="105" height="34" rx="8" fill="#dcfce7" className="dark:fill-emerald-950/60" stroke="#10b981" strokeWidth="1" />
        <text x="297.5" y="15" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#047857" className="dark:fill-emerald-300">Átlag (x̄)</text>
        <text x="297.5" y="28" textAnchor="middle" fontSize="11" fontWeight="black" fill="#065f46" className="dark:fill-emerald-200">175,5 ezer Ft</text>
      </g>
    </svg>
  );
};

/**
 * 2. Páratlan és Páros elemszámú medián meghatározása
 * Vizuális összehasonlító rajz
 */
export const MedianEvenOddSvg: React.FC<FigureProps> = ({ className = '', size = 320 }) => {
  return (
    <svg
      viewBox="0 0 440 270"
      className={`w-full h-auto max-w-[440px] select-none ${className}`}
      style={{ maxHeight: size }}
    >
      {/* Háttér kártya */}
      <rect width="440" height="270" rx="16" fill="#f8fafc" className="dark:fill-slate-900" />
      <rect width="440" height="270" rx="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800" />

      {/* Cím */}
      <text x="220" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">
        A medián (Me) meghatározása rendezett mintában
      </text>

      {/* 1. ESET: PÁRATLAN ELEMSZÁM (n = 5) */}
      <g transform="translate(20, 42)">
        <rect width="400" height="95" rx="12" fill="#eff6ff" className="dark:fill-blue-950/40 dark:stroke-blue-800" stroke="#bfdbfe" strokeWidth="1" />
        <text x="14" y="20" fontSize="11" fontWeight="bold" fill="#1d4ed8" className="dark:fill-blue-300">
          A) Páratlan elemszám (n = 5) ➔ Pontosan egyetlen középső elem!
        </text>

        {/* 5 kártya növekvő sorban: 3, 5, [7], 9, 14 */}
        <g transform="translate(30, 32)">
          {/* Elem 1: 3 */}
          <rect x="0" y="0" width="55" height="42" rx="8" fill="#ffffff" className="dark:fill-slate-800" stroke="#cbd5e1" strokeWidth="1.5" />
          <text x="27.5" y="26" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#475569" className="dark:fill-slate-300">3</text>
          <text x="27.5" y="52" textAnchor="middle" fontSize="9" fill="#94a3b8">1. hely</text>

          {/* Elem 2: 5 */}
          <rect x="70" y="0" width="55" height="42" rx="8" fill="#ffffff" className="dark:fill-slate-800" stroke="#cbd5e1" strokeWidth="1.5" />
          <text x="97.5" y="26" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#475569" className="dark:fill-slate-300">5</text>
          <text x="97.5" y="52" textAnchor="middle" fontSize="9" fill="#94a3b8">2. hely</text>

          {/* Elem 3: 7 -> KÖZÉPSŐ (KIEMELT MEDIÁN) */}
          <rect x="140" y="0" width="60" height="42" rx="8" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
          <text x="170" y="26" textAnchor="middle" fontSize="16" fontWeight="black" fill="#ffffff">7</text>
          <text x="170" y="54" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#2563eb" className="dark:fill-blue-400">Me = 7 ★</text>

          {/* Elem 4: 9 */}
          <rect x="215" y="0" width="55" height="42" rx="8" fill="#ffffff" className="dark:fill-slate-800" stroke="#cbd5e1" strokeWidth="1.5" />
          <text x="242.5" y="26" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#475569" className="dark:fill-slate-300">9</text>
          <text x="242.5" y="52" textAnchor="middle" fontSize="9" fill="#94a3b8">4. hely</text>

          {/* Elem 5: 14 */}
          <rect x="285" y="0" width="55" height="42" rx="8" fill="#ffffff" className="dark:fill-slate-800" stroke="#cbd5e1" strokeWidth="1.5" />
          <text x="312.5" y="26" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#475569" className="dark:fill-slate-300">14</text>
          <text x="312.5" y="52" textAnchor="middle" fontSize="9" fill="#94a3b8">5. hely</text>
        </g>
      </g>

      {/* 2. ESET: PÁROS ELEMSZÁM (n = 6) */}
      <g transform="translate(20, 150)">
        <rect width="400" height="105" rx="12" fill="#faf5ff" className="dark:fill-purple-950/40 dark:stroke-purple-800" stroke="#e9d5ff" strokeWidth="1" />
        <text x="14" y="20" fontSize="11" fontWeight="bold" fill="#7e22ce" className="dark:fill-purple-300">
          B) Páros elemszám (n = 6) ➔ A két középső szám számtani közepe!
        </text>

        {/* 6 kártya növekvő sorban: 4, 8, [10, 12], 18, 20 */}
        <g transform="translate(15, 32)">
          {/* Elem 1: 4 */}
          <rect x="0" y="0" width="50" height="38" rx="7" fill="#ffffff" className="dark:fill-slate-800" stroke="#cbd5e1" strokeWidth="1.2" />
          <text x="25" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#475569" className="dark:fill-slate-300">4</text>

          {/* Elem 2: 8 */}
          <rect x="60" y="0" width="50" height="38" rx="7" fill="#ffffff" className="dark:fill-slate-800" stroke="#cbd5e1" strokeWidth="1.2" />
          <text x="85" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#475569" className="dark:fill-slate-300">8</text>

          {/* Elem 3: 10 (Középső bal) */}
          <rect x="120" y="0" width="54" height="38" rx="7" fill="#f3e8ff" className="dark:fill-purple-900/60" stroke="#a855f7" strokeWidth="1.8" />
          <text x="147" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#6b21a8" className="dark:fill-purple-200">10</text>

          {/* Elem 4: 12 (Középső jobb) */}
          <rect x="184" y="0" width="54" height="38" rx="7" fill="#f3e8ff" className="dark:fill-purple-900/60" stroke="#a855f7" strokeWidth="1.8" />
          <text x="211" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#6b21a8" className="dark:fill-purple-200">12</text>

          {/* Elem 5: 18 */}
          <rect x="250" y="0" width="50" height="38" rx="7" fill="#ffffff" className="dark:fill-slate-800" stroke="#cbd5e1" strokeWidth="1.2" />
          <text x="275" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#475569" className="dark:fill-slate-300">18</text>

          {/* Elem 6: 20 */}
          <rect x="310" y="0" width="50" height="38" rx="7" fill="#ffffff" className="dark:fill-slate-800" stroke="#cbd5e1" strokeWidth="1.2" />
          <text x="335" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#475569" className="dark:fill-slate-300">20</text>
        </g>

        {/* Középső két elem összekötése és felezése */}
        <path d="M 162 76 Q 194 92 226 76" fill="none" stroke="#9333ea" strokeWidth="1.5" />
        <text x="194" y="66" textAnchor="middle" fontSize="11" fontWeight="black" fill="#7e22ce" className="dark:fill-purple-300">
          Me = (10 + 12) / 2 = 11
        </text>
      </g>
    </svg>
  );
};

/**
 * 3. Terjedelem és Kiugró érték (Outlier) hatása
 * Szemlélteti, hogy egyetlen extrém érték hogyan rántja el az átlagot és terjedelmet, míg a medián változatlan marad.
 */
export const RangeAndOutlierSvg: React.FC<FigureProps> = ({ className = '', size = 320 }) => {
  return (
    <svg
      viewBox="0 0 440 260"
      className={`w-full h-auto max-w-[440px] select-none ${className}`}
      style={{ maxHeight: size }}
    >
      <rect width="440" height="260" rx="16" fill="#f8fafc" className="dark:fill-slate-900" />
      <rect width="440" height="260" rx="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800" />

      <text x="220" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">
        Robusztusság: Medián vs. Átlag kiugró érték (outlier) esetén
      </text>

      {/* Számegyenes skála */}
      <line x1="40" y1="120" x2="400" y2="120" stroke="#94a3b8" strokeWidth="2" />
      {/* Osztások */}
      <g fontSize="10" fill="#64748b" className="dark:fill-slate-400" textAnchor="middle">
        <line x1="50" y1="115" x2="50" y2="125" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="50" y="140">10</text>

        <line x1="120" y1="115" x2="120" y2="125" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="120" y="140">20</text>

        <line x1="190" y1="115" x2="190" y2="125" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="190" y="140">30</text>

        <line x1="260" y1="115" x2="260" y2="125" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="260" y="140">40</text>

        <line x1="330" y1="115" x2="330" y2="125" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="330" y="140">50</text>

        <line x1="390" y1="115" x2="390" y2="125" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="390" y="140">60</text>
      </g>

      {/* Tipikus csoport pontjai: 12, 14, 15, 16, 18 -> kék pöttyök */}
      <g fill="#2563eb">
        <circle cx="64" cy="120" r="6" />
        <circle cx="78" cy="120" r="6" />
        <circle cx="85" cy="120" r="6" />
        <circle cx="92" cy="120" r="6" />
        <circle cx="106" cy="120" r="6" />
      </g>
      <text x="85" y="90" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#1e40af" className="dark:fill-blue-300">
        Fő adatcsoport (12–18)
      </text>
      <rect x="58" y="98" width="55" height="4" rx="2" fill="#3b82f6" opacity="0.4" />

      {/* Extrém kiugró érték: 58 (távol jobb szélen, piros pötty) */}
      <circle cx="376" cy="120" r="8" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
      <text x="376" y="90" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#b91c1c" className="dark:fill-rose-300">
        Kiugró érték: 58!
      </text>

      {/* Medián jelölő (15-nél áll) */}
      <g transform="translate(85, 45)">
        <rect x="-35" y="0" width="70" height="24" rx="6" fill="#10b981" />
        <text x="0" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">Me = 15</text>
        <path d="M 0 24 L 0 65" stroke="#10b981" strokeWidth="2" strokeDasharray="2 2" />
      </g>

      {/* Átlag jelölő (elhúzva 22-höz) */}
      <g transform="translate(134, 45)">
        <rect x="-40" y="0" width="80" height="24" rx="6" fill="#f59e0b" />
        <text x="0" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">Átlag: 22,2 ➔</text>
        <path d="M 0 24 L 0 65" stroke="#f59e0b" strokeWidth="2" strokeDasharray="2 2" />
      </g>

      {/* Terjedelem bemutatása: R = 58 - 12 = 46 */}
      <g transform="translate(40, 165)">
        <line x1="24" y1="10" x2="336" y2="10" stroke="#dc2626" strokeWidth="2" />
        <circle cx="24" cy="10" r="3" fill="#dc2626" />
        <circle cx="336" cy="10" r="3" fill="#dc2626" />
        <text x="180" y="28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c" className="dark:fill-rose-300">
          Torzult terjedelem: R = 58 - 12 = 46 (a kiugró érték miatt 6 helyett 46!)
        </text>
      </g>

      {/* Összegző tanulság kártya */}
      <g transform="translate(25, 205)">
        <rect width="390" height="42" rx="8" fill="#f1f5f9" className="dark:fill-slate-800" stroke="#cbd5e1" strokeWidth="1" />
        <text x="195" y="17" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155" className="dark:fill-slate-200">
          💡 A medián ROBUSZTUS: az 58-as érték nem mozdítja el a helyét!
        </text>
        <text x="195" y="32" textAnchor="middle" fontSize="9.5" fill="#64748b" className="dark:fill-slate-400">
          Az átlag és a terjedelem ezzel szemben rendkívül érzékeny a szélsőséges adatokra.
        </text>
      </g>
    </svg>
  );
};

/**
 * 4. Osztályzatok és Gyakorisági Diagram Statisztikai Mutatókkal
 * Kémia osztályzatok (1-es: 0, 2-es: 2, 3-as: 8, 4-es: 6, 5-ös: 4; n = 20)
 */
export const FrequencyHistogramStatsSvg: React.FC<FigureProps> = ({ className = '', size = 320 }) => {
  return (
    <svg
      viewBox="0 0 440 260"
      className={`w-full h-auto max-w-[440px] select-none ${className}`}
      style={{ maxHeight: size }}
    >
      <rect width="440" height="260" rx="16" fill="#f8fafc" className="dark:fill-slate-900" />
      <rect width="440" height="260" rx="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800" />

      <text x="220" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">
        Kémia félévi jegyek (20 diák) gyakorisági hisztogramja
      </text>

      {/* Rácsvonalak */}
      <g stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" className="dark:stroke-slate-800">
        <line x1="50" y1="50" x2="390" y2="50" />
        <line x1="50" y1="85" x2="390" y2="85" />
        <line x1="50" y1="120" x2="390" y2="120" />
        <line x1="50" y1="155" x2="390" y2="155" />
      </g>

      {/* Y tengely skála */}
      <g fontSize="10" fill="#64748b" className="dark:fill-slate-400" textAnchor="end">
        <text x="42" y="54">8 fő</text>
        <text x="42" y="89">6 fő</text>
        <text x="42" y="124">4 fő</text>
        <text x="42" y="159">2 fő</text>
        <text x="42" y="194">0</text>
      </g>

      {/* Oszlopok: 1-es (0), 2-es (2), 3-as (8 - módusz), 4-es (6), 5-ös (4) */}
      {/* 1-es: 0 fő */}
      <rect x="70" y="190" width="45" height="0" rx="3" fill="#94a3b8" />
      <text x="92.5" y="208" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#64748b">1</text>

      {/* 2-es: 2 fő -> magasság: 35 px, y = 190 - 35 = 155 */}
      <rect x="135" y="155" width="45" height="35" rx="4" fill="#3b82f6" opacity="0.8" />
      <text x="157.5" y="148" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1d4ed8">2</text>
      <text x="157.5" y="208" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155" className="dark:fill-slate-200">2</text>

      {/* 3-as: 8 fő -> magasság: 140 px, y = 190 - 140 = 50 -> MÓDUSZ (arany) */}
      <rect x="200" y="50" width="45" height="140" rx="4" fill="#f59e0b" />
      <text x="222.5" y="42" textAnchor="middle" fontSize="11" fontWeight="black" fill="#b45309">8 fő ★</text>
      <text x="222.5" y="208" textAnchor="middle" fontSize="12" fontWeight="black" fill="#b45309">3</text>

      {/* 4-es: 6 fő -> magasság: 105 px, y = 85 */}
      <rect x="265" y="85" width="45" height="105" rx="4" fill="#3b82f6" opacity="0.8" />
      <text x="287.5" y="78" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1d4ed8">6</text>
      <text x="287.5" y="208" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155" className="dark:fill-slate-200">4</text>

      {/* 5-ös: 4 fő -> magasság: 70 px, y = 120 */}
      <rect x="330" y="120" width="45" height="70" rx="4" fill="#3b82f6" opacity="0.8" />
      <text x="352.5" y="112" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1d4ed8">4</text>
      <text x="352.5" y="208" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155" className="dark:fill-slate-200">5</text>

      {/* X tengely */}
      <line x1="50" y1="190" x2="395" y2="190" stroke="#94a3b8" strokeWidth="2" />
      <text x="395" y="208" fontSize="10.5" fill="#64748b" textAnchor="start">Jegy</text>

      {/* Összesítő mutatók lenti sáv */}
      <g transform="translate(45, 222)">
        <text x="0" y="14" fontSize="11" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-200">
          • Módusz: <tspan fill="#d97706">3</tspan> (8 db) | • Medián: <tspan fill="#2563eb">3,5</tspan> (10. és 11. diák: 3 és 4 átlaga) | • Átlag: <tspan fill="#059669">3,60</tspan>
        </text>
      </g>
    </svg>
  );
};

