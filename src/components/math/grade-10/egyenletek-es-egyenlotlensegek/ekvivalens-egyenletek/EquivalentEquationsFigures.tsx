import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Kétkarú mérleg modell (egyenértékű lépések demonstrálása)
export const BalanceScaleSvg: React.FC<FigureProps & { balanced?: boolean; operation?: string }> = ({
  size = 240,
  className = '',
  balanced = true,
  operation = '+5 mindkét oldalhoz'
}) => {
  const leftY = balanced ? 95 : 110;
  const rightY = balanced ? 95 : 80;
  const beamAngle = balanced ? 0 : -7;

  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={(size * 180) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <defs>
        <linearGradient id="balBaseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
        <linearGradient id="balBeamGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="50%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
        <linearGradient id="balPanGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0fdfa" />
          <stop offset="100%" stopColor="#ccfbf1" />
        </linearGradient>
        <filter id="balShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Állapot címke felül */}
      <rect
        x="55"
        y="8"
        width="210"
        height="24"
        rx="12"
        fill={balanced ? '#f0fdfa' : '#fff1f2'}
        stroke={balanced ? '#0d9488' : '#f43f5e'}
        strokeWidth="1.5"
      />
      <text
        x="160"
        y="24"
        fill={balanced ? '#0f766e' : '#be123c'}
        fontSize="11"
        fontWeight="bold"
        textAnchor="middle"
      >
        {balanced ? `✓ EGYENSÚLYBAN (${operation})` : `✗ ELBILLENT (${operation})`}
      </text>

      {/* Alapzat és tartóoszlop */}
      <path d="M 135 168 L 185 168 L 175 145 L 145 145 Z" fill="url(#balBaseGrad)" />
      <rect x="156" y="55" width="8" height="92" rx="4" fill="#0f766e" />

      {/* Központi forgáspont */}
      <circle cx="160" cy="55" r="7" fill="#0d9488" stroke="#ffffff" strokeWidth="2" filter="url(#balShadow)" />

      {/* Mérlegrúd (forgatható) */}
      <g transform={`rotate(${beamAngle} 160 55)`}>
        <rect x="35" y="52" width="250" height="6" rx="3" fill="url(#balBeamGrad)" filter="url(#balShadow)" />
        <circle cx="55" cy="55" r="3.5" fill="#0f766e" />
        <circle cx="265" cy="55" r="3.5" fill="#0f766e" />

        {/* Függesztő zsinórok balra */}
        <line x1="55" y1="55" x2="30" y2={leftY} stroke="#0d9488" strokeWidth="1.5" strokeDasharray="2 1" />
        <line x1="55" y1="55" x2="80" y2={leftY} stroke="#0d9488" strokeWidth="1.5" strokeDasharray="2 1" />

        {/* Függesztő zsinórok jobbra */}
        <line x1="265" y1="55" x2="240" y2={rightY} stroke="#0d9488" strokeWidth="1.5" strokeDasharray="2 1" />
        <line x1="265" y1="55" x2="290" y2={rightY} stroke="#0d9488" strokeWidth="1.5" strokeDasharray="2 1" />
      </g>

      {/* Bal oldali serpenyő */}
      <path
        d={`M 25 ${leftY} Q 55 ${leftY + 20} 85 ${leftY} Z`}
        fill="url(#balPanGrad)"
        stroke="#0d9488"
        strokeWidth="2"
        filter="url(#balShadow)"
      />
      {/* Bal oldali súly: 2x + 3 */}
      <rect x="38" y={leftY - 22} width="34" height="22" rx="4" fill="#0d9488" />
      <text x="55" y={leftY - 7} fill="#ffffff" fontSize="10.5" fontWeight="bold" textAnchor="middle">
        2x + 3
      </text>

      {/* Jobb oldali serpenyő */}
      <path
        d={`M 235 ${rightY} Q 265 ${rightY + 20} 295 ${rightY} Z`}
        fill="url(#balPanGrad)"
        stroke="#0d9488"
        strokeWidth="2"
        filter="url(#balShadow)"
      />
      {/* Jobb oldali súly: 11 */}
      <circle cx="265" cy={rightY - 11} r="11" fill="#0f766e" />
      <text x="265" y={rightY - 7} fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
        11
      </text>
    </svg>
  );
};

// 2. Hamis gyökök keletkezése (négyzetre emelés vizualizáció)
export const ExtraneousRootsSvg: React.FC<FigureProps> = ({ size = 250, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 160"
      width={size}
      height={(size * 160) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      {/* Felső összehasonlító kártyák */}
      <rect x="15" y="12" width="100" height="42" rx="8" fill="#ffffff" stroke="#e11d48" strokeWidth="1.5" />
      <text x="65" y="28" fill="#9f1239" fontSize="13" fontWeight="bold" textAnchor="middle">
        x = 3
      </text>
      <text x="65" y="44" fill="#64748b" fontSize="9" fontWeight="600" textAnchor="middle">
        M = &#123;3&#125;
      </text>

      {/* Átalakítás nyíl */}
      <path d="M 125 33 L 175 33" stroke="#e11d48" strokeWidth="2" strokeDasharray="3 2" />
      <polygon points="182,33 173,28 173,38" fill="#e11d48" />
      <text x="150" y="26" fill="#e11d48" fontSize="10" fontWeight="bold" textAnchor="middle">
        ( )²
      </text>

      <rect x="190" y="12" width="115" height="42" rx="8" fill="#ffffff" stroke="#e11d48" strokeWidth="1.5" />
      <text x="247" y="28" fill="#9f1239" fontSize="13" fontWeight="bold" textAnchor="middle">
        x² = 9
      </text>
      <text x="247" y="44" fill="#b91c1c" fontSize="9" fontWeight="bold" textAnchor="middle">
        Gyökök: -3 és 3 !
      </text>

      {/* Számegyenes */}
      <line x1="20" y1="95" x2="300" y2="95" stroke="#94a3b8" strokeWidth="2" />
      <polygon points="305,95 296,91 296,99" fill="#94a3b8" />

      {/* 0 pont */}
      <line x1="160" y1="88" x2="160" y2="102" stroke="#64748b" strokeWidth="2" />
      <text x="160" y="116" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">
        0
      </text>

      {/* Hamis gyök: x = -3 */}
      <circle cx="80" cy="95" r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
      <text x="80" y="82" fill="#b91c1c" fontSize="10.5" fontWeight="black" textAnchor="middle">
        x = -3 ✗
      </text>
      <text x="80" y="117" fill="#b91c1c" fontSize="9" fontWeight="bold" textAnchor="middle">
        Hamis gyök!
      </text>

      {/* Valódi gyök: x = 3 */}
      <circle cx="240" cy="95" r="8" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
      <text x="240" y="82" fill="#047857" fontSize="10.5" fontWeight="black" textAnchor="middle">
        x = 3 ✓
      </text>
      <text x="240" y="117" fill="#047857" fontSize="9" fontWeight="bold" textAnchor="middle">
        Eredeti gyök
      </text>

      {/* Figyelmeztetés lent */}
      <rect x="20" y="132" width="280" height="20" rx="6" fill="#ffe4e6" />
      <text x="160" y="146" fill="#9f1239" fontSize="8.5" fontWeight="bold" textAnchor="middle">
        ⚠ Négyzetre emeléskor a gyökök kötelezően ellenőrizendők!
      </text>
    </svg>
  );
};

// 3. Gyökvesztés megelőzése (osztás ismeretlennel hiba)
export const LostRootsSvg: React.FC<FigureProps> = ({ size = 250, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 170"
      width={size}
      height={(size * 170) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      {/* Hibás út doboz */}
      <rect x="15" y="10" width="138" height="52" rx="7" fill="#ffffff" stroke="#ef4444" strokeWidth="1.5" />
      <text x="84" y="26" fill="#b91c1c" fontSize="9.5" fontWeight="black" textAnchor="middle">
        HIBÁS: : x osztás
      </text>
      <text x="84" y="41" fill="#475569" fontSize="11" fontWeight="bold" textAnchor="middle">
        x² = 4x ⟹ x = 4
      </text>
      <text x="84" y="54" fill="#b91c1c" fontSize="8.5" fontWeight="bold" textAnchor="middle">
        ✗ x = 0 gyök elveszett!
      </text>

      {/* Helyes út doboz */}
      <rect x="167" y="10" width="138" height="52" rx="7" fill="#ffffff" stroke="#10b981" strokeWidth="1.5" />
      <text x="236" y="26" fill="#047857" fontSize="9.5" fontWeight="black" textAnchor="middle">
        HELYES: szorzattá
      </text>
      <text x="236" y="41" fill="#475569" fontSize="10.5" fontWeight="bold" textAnchor="middle">
        x(x - 4) = 0
      </text>
      <text x="236" y="54" fill="#047857" fontSize="8.5" fontWeight="bold" textAnchor="middle">
        ✓ x₁ = 0 és x₂ = 4
      </text>

      {/* Mini koordináta vázlat */}
      <line x1="45" y1="125" x2="275" y2="125" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="110" y1="75" x2="110" y2="145" stroke="#94a3b8" strokeWidth="1.5" />

      {/* Parabola y = x² */}
      <path d="M 75 80 Q 110 142 165 80" stroke="#3b82f6" strokeWidth="2" fill="none" />
      <text x="170" y="86" fill="#3b82f6" fontSize="9" fontWeight="bold">
        y = x²
      </text>

      {/* Egyenes y = 4x */}
      <line x1="90" y1="145" x2="155" y2="80" stroke="#f59e0b" strokeWidth="2" />
      <text x="156" y="98" fill="#d97706" fontSize="9" fontWeight="bold">
        y = 4x
      </text>

      {/* Metszéspont 1: (0, 0) */}
      <circle cx="110" cy="125" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
      <text x="110" y="140" fill="#b91c1c" fontSize="8.5" fontWeight="bold" textAnchor="middle">
        (0; 0)
      </text>

      {/* Metszéspont 2: (4, 16) */}
      <circle cx="145" cy="90" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
      <text x="145" y="82" fill="#047857" fontSize="8.5" fontWeight="bold" textAnchor="middle">
        (4; 16)
      </text>

      {/* Alsó megjegyzés */}
      <rect x="20" y="148" width="280" height="18" rx="5" fill="#fef08a" />
      <text x="160" y="161" fill="#854d0e" fontSize="8.5" fontWeight="bold" textAnchor="middle">
        Soha ne ossz ismeretlennel! Mindig rendezz 0-ra, majd emelj ki!
      </text>
    </svg>
  );
};

// 4. Értelmezési tartomány és kikötések (tört nevező nem nulla)
export const DomainRestrictionSvg: React.FC<FigureProps> = ({ size = 250, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 150"
      width={size}
      height={(size * 150) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      {/* Egyenlet és kikötés kártya */}
      <rect x="15" y="10" width="290" height="36" rx="7" fill="#ffffff" stroke="#16a34a" strokeWidth="1.5" />
      <text x="95" y="33" fill="#15803d" fontSize="12" fontWeight="black" textAnchor="middle">
        (x² - 4)/(x - 2) = 0
      </text>
      <text x="225" y="33" fill="#dc2626" fontSize="10.5" fontWeight="bold" textAnchor="middle">
        Kikötés: x ≠ 2 !
      </text>

      {/* Számegyenes */}
      <line x1="20" y1="80" x2="300" y2="80" stroke="#15803d" strokeWidth="2.5" />
      <polygon points="305,80 296,76 296,84" fill="#15803d" />

      {/* 0 pont */}
      <line x1="160" y1="73" x2="160" y2="87" stroke="#64748b" strokeWidth="2" />
      <text x="160" y="100" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">
        0
      </text>

      {/* x = -2 Valódi gyök */}
      <circle cx="80" cy="80" r="7" fill="#16a34a" stroke="#ffffff" strokeWidth="2" />
      <text x="80" y="66" fill="#15803d" fontSize="11" fontWeight="black" textAnchor="middle">
        x = -2 ✓
      </text>
      <text x="80" y="100" fill="#15803d" fontSize="8.5" fontWeight="bold" textAnchor="middle">
        Valódi gyök
      </text>

      {/* x = 2 Kizárt pont */}
      <circle cx="240" cy="80" r="7" fill="#ffffff" stroke="#dc2626" strokeWidth="2.5" />
      <line x1="235" y1="75" x2="245" y2="85" stroke="#dc2626" strokeWidth="2" />
      <line x1="245" y1="75" x2="235" y2="85" stroke="#dc2626" strokeWidth="2" />
      <text x="240" y="66" fill="#dc2626" fontSize="11" fontWeight="black" textAnchor="middle">
        x = 2 ✗
      </text>
      <text x="240" y="100" fill="#dc2626" fontSize="8.5" fontWeight="bold" textAnchor="middle">
        Kizárva (0 a nevező!)
      </text>

      {/* Végső megoldáshalmaz sáv */}
      <rect x="35" y="118" width="250" height="24" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1" />
      <text x="160" y="134" fill="#14532d" fontSize="10" fontWeight="black" textAnchor="middle">
        Megoldáshalmaz: M = &#123;-2&#125; (nem &#123;-2; 2&#125;!)
      </text>
    </svg>
  );
};

// 5. Ekvivalencia Döntési Folyamatábra (kompakt, arányos)
export const FlowchartStepSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={(size * 180) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      {/* Felső kiinduló doboz: MŰVELET MINDKÉT OLDALON */}
      <rect x="85" y="8" width="150" height="28" rx="6" fill="#0d9488" stroke="#0f766e" strokeWidth="1.5" />
      <text x="160" y="26" fill="#ffffff" fontSize="10" fontWeight="black" textAnchor="middle">
        MŰVELET A KÉT OLDALON
      </text>

      {/* Nyíl a döntési pont felé */}
      <line x1="160" y1="36" x2="160" y2="48" stroke="#0d9488" strokeWidth="2" />
      <polygon points="160,53 156,46 164,46" fill="#0d9488" />

      {/* Döntési Rombusz: Nullától különböző valós szám? */}
      <polygon
        points="160,53 255,80 160,107 65,80"
        fill="#ffffff"
        stroke="#0d9488"
        strokeWidth="1.5"
      />
      <text x="160" y="77" fill="#0f766e" fontSize="9" fontWeight="bold" textAnchor="middle">
        Nullától különböző
      </text>
      <text x="160" y="89" fill="#0f766e" fontSize="9" fontWeight="bold" textAnchor="middle">
        valós konstans szám?
      </text>

      {/* Bal ág (IGEN) */}
      <line x1="65" y1="80" x2="40" y2="80" stroke="#10b981" strokeWidth="2" />
      <line x1="40" y1="80" x2="40" y2="120" stroke="#10b981" strokeWidth="2" />
      <polygon points="40,125 36,118 44,118" fill="#10b981" />
      <text x="46" y="75" fill="#047857" fontSize="8.5" fontWeight="black">
        IGEN
      </text>

      {/* Bal eredmény doboz: EKVIVALENS */}
      <rect x="5" y="126" width="140" height="44" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="75" y="144" fill="#15803d" fontSize="10" fontWeight="black" textAnchor="middle">
        ✓ EKVIVALENS LÉPÉS
      </text>
      <text x="75" y="159" fill="#166534" fontSize="8" fontWeight="600" textAnchor="middle">
        Megoldáshalmaz nem változik
      </text>

      {/* Jobb ág (NEM) */}
      <line x1="255" y1="80" x2="280" y2="80" stroke="#ef4444" strokeWidth="2" />
      <line x1="280" y1="80" x2="280" y2="120" stroke="#ef4444" strokeWidth="2" />
      <polygon points="280,125 276,118 284,118" fill="#ef4444" />
      <text x="260" y="75" fill="#b91c1c" fontSize="8.5" fontWeight="black">
        NEM
      </text>

      {/* Jobb eredmény doboz: NEM EKVIVALENS */}
      <rect x="175" y="126" width="140" height="44" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="245" y="144" fill="#b91c1c" fontSize="10" fontWeight="black" textAnchor="middle">
        ⚠ NEM EKVIVALENS!
      </text>
      <text x="245" y="159" fill="#991b1b" fontSize="8" fontWeight="bold" textAnchor="middle">
        Kikötés és ellenőrzés kötelező!
      </text>
    </svg>
  );
};
