import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Szakaszfelező merőleges szerkesztése: AB szakasz, R sugarú körívek A és B-ből, metszéspontok P és Q, felezőpont F
export const SegmentBisectorSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 360 240"
      width={size}
      height={size * 0.67}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="350" height="230" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* AB szakasz: A(90, 120), B(270, 120) */}
      <line x1="90" y1="120" x2="270" y2="120" stroke="#2563eb" strokeWidth="2.5" />
      <circle cx="90" cy="120" r="4.5" fill="#1d4ed8" />
      <circle cx="270" cy="120" r="4.5" fill="#1d4ed8" />
      <text x="75" y="125" fontSize="13" fontWeight="bold" fill="#1e40af">A</text>
      <text x="280" y="125" fontSize="13" fontWeight="bold" fill="#1e40af">B</text>

      {/* Felezőpont F(180, 120) */}
      <circle cx="180" cy="120" r="4" fill="#d97706" />
      <text x="185" y="138" fontSize="12" fontWeight="bold" fill="#b45309">F</text>

      {/* Körívek A-ból és B-ből R=110 sugárral */}
      {/* P(180, 57) és Q(180, 183) */}
      {/* Ív A-ból felfelé és lefelé */}
      <path d="M 165 40 A 110 110 0 0 1 195 75" fill="none" stroke="#93c5fd" strokeWidth="1.5" />
      <path d="M 165 200 A 110 110 0 0 0 195 165" fill="none" stroke="#93c5fd" strokeWidth="1.5" />

      {/* Ív B-ből felfelé és lefelé */}
      <path d="M 195 40 A 110 110 0 0 0 165 75" fill="none" stroke="#86efac" strokeWidth="1.5" />
      <path d="M 195 200 A 110 110 0 0 1 165 165" fill="none" stroke="#86efac" strokeWidth="1.5" />

      {/* P és Q metszéspontok */}
      <circle cx="180" cy="57" r="3.5" fill="#ef4444" />
      <text x="188" y="55" fontSize="11" fontWeight="bold" fill="#dc2626">P</text>
      <circle cx="180" cy="183" r="3.5" fill="#ef4444" />
      <text x="188" y="195" fontSize="11" fontWeight="bold" fill="#dc2626">Q</text>

      {/* Szakaszfelező merőleges egyenes PQ */}
      <line x1="180" y1="25" x2="180" y2="215" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 3" />
      <text x="188" y="32" fontSize="12" fontStyle="italic" fontWeight="bold" fill="#dc2626">f_AB</text>

      {/* Derékszög jel F-nél (magyar szabvány: negyedkörív belső ponttal) */}
      <path d="M 170 120 A 10 10 0 0 1 180 110" fill="none" stroke="#64748b" strokeWidth="1.2" />
      <circle cx="175.5" cy="115.5" r="1.2" fill="#64748b" />

      {/* Alsó megjegyzés */}
      <text x="180" y="222" fontSize="10.5" fontWeight="600" fill="#475569" textAnchor="middle">
        R &gt; AB/2 körzőnyílás • |PA| = |PB| és |QA| = |QB|
      </text>
    </svg>
  );
};

// 2. Szögfelező szerkesztése: V csúcs, szárak, ív, metszéspontok K és L, P metszéspont, szögfelező
export const AngleBisectorSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 360 230"
      width={size}
      height={size * 0.64}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="350" height="220" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* V csúcs: (60, 160) */}
      {/* 1. szár: vízszintes (60, 160) -> (310, 160) */}
      <line x1="60" y1="160" x2="310" y2="160" stroke="#64748b" strokeWidth="2" />
      <text x="315" y="164" fontSize="12" fontStyle="italic" fill="#475569">e</text>

      {/* 2. szár: 60 fokos (60, 160) -> (60 + 240*cos(60°), 160 - 240*sin(60°)) = (180, 160 - 208) = (180, -48) -> (200, 30) */}
      <line x1="60" y1="160" x2="200" y2="30" stroke="#64748b" strokeWidth="2" />
      <text x="205" y="32" fontSize="12" fontStyle="italic" fill="#475569">f</text>

      <circle cx="60" cy="160" r="4.5" fill="#1e293b" />
      <text x="42" y="172" fontSize="13" fontWeight="bold" fill="#1e293b">V</text>

      {/* 1. lépés: Körív V-ből R=90 sugárral */}
      {/* Metszi e-t K(150, 160)-ban, f-et L(105, 78)-ban */}
      <path d="M 150 160 A 90 90 0 0 0 105 78" fill="none" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="150" cy="160" r="3.5" fill="#2563eb" />
      <text x="145" y="178" fontSize="11" fontWeight="bold" fill="#2563eb">K</text>
      <circle cx="105" cy="78" r="3.5" fill="#2563eb" />
      <text x="92" y="74" fontSize="11" fontWeight="bold" fill="#2563eb">L</text>

      {/* 2. lépés: K-ból és L-ből egyenlő r=75 sugarú ívek metszete P(215, 105) */}
      <path d="M 205 90 A 75 75 0 0 1 225 120" fill="none" stroke="#86efac" strokeWidth="1.5" />
      <path d="M 205 120 A 75 75 0 0 1 225 90" fill="none" stroke="#86efac" strokeWidth="1.5" />
      <circle cx="215" cy="105" r="4" fill="#10b981" />
      <text x="225" y="105" fontSize="12" fontWeight="bold" fill="#047857">P</text>

      {/* Szögfelező félegyenes V-ből P-n keresztül */}
      <line x1="60" y1="160" x2="280" y2="82" stroke="#10b981" strokeWidth="2.5" />
      <text x="285" y="85" fontSize="12" fontStyle="italic" fontWeight="bold" fill="#047857">f_α</text>

      {/* Szögfelezés ívei α/2 */}
      <text x="95" y="148" fontSize="10" fontWeight="bold" fill="#10b981">α/2</text>
      <text x="82" y="125" fontSize="10" fontWeight="bold" fill="#10b981">α/2</text>

      {/* Alsó leírás */}
      <text x="180" y="210" fontSize="10.5" fontWeight="600" fill="#475569" textAnchor="middle">
        A szögfelező minden pontja egyenlő távol van a száraktól: d(P, e) = d(P, f)
      </text>
    </svg>
  );
};

// 3. Nevezetes szögek szerkesztése körzővel: 60° (szabályos háromszög), 90° (merőleges) és 75° (60° + 15°)
export const ConstructibleAnglesSvg: React.FC<FigureProps> = ({ size = 380, className = '' }) => {
  return (
    <svg
      viewBox="0 0 440 210"
      width={size}
      height={size * 0.48}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="430" height="200" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* 1. 60° szerkesztése (Szabályos 3-szögből) */}
      <g transform="translate(15, 20)">
        <text x="60" y="18" fontSize="11.5" fontWeight="bold" fill="#1e293b" textAnchor="middle">60° (Szabályos 3-szög)</text>
        <line x1="10" y1="110" x2="115" y2="110" stroke="#64748b" strokeWidth="1.5" />
        {/* R sugár O-ból: (10, 110) -> (75, 110) és ív */}
        <circle cx="10" cy="110" r="3.5" fill="#1e293b" />
        <text x="5" y="125" fontSize="11" fontWeight="bold" fill="#1e293b">O</text>
        {/* Körív O-ból R=65 */}
        <path d="M 75 110 A 65 65 0 0 0 42 54" fill="none" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="3 2" />
        {/* Körív (75, 110)-ből */}
        <path d="M 35 50 A 65 65 0 0 1 50 65" fill="none" stroke="#86efac" strokeWidth="1.5" />
        {/* 60 fokos szár O-ból (42, 54)-en át */}
        <line x1="10" y1="110" x2="55" y2="35" stroke="#2563eb" strokeWidth="2.5" />
        <circle cx="42.5" cy="53.7" r="3" fill="#2563eb" />
        <text x="35" y="95" fontSize="11" fontWeight="bold" fill="#2563eb">60°</text>
      </g>

      {/* Elválasztó vonal */}
      <line x1="145" y1="25" x2="145" y2="175" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* 2. 90° és 45° szerkesztése (Merőleges és felezés) */}
      <g transform="translate(155, 20)">
        <text x="65" y="18" fontSize="11.5" fontWeight="bold" fill="#1e293b" textAnchor="middle">90° és 45° (Merőleges & Felezés)</text>
        <line x1="10" y1="110" x2="120" y2="110" stroke="#64748b" strokeWidth="1.5" />
        <circle cx="45" cy="110" r="3.5" fill="#1e293b" />
        <text x="40" y="125" fontSize="11" fontWeight="bold" fill="#1e293b">O</text>
        {/* 90 fokos szár */}
        <line x1="45" y1="110" x2="45" y2="30" stroke="#059669" strokeWidth="2" />
        <text x="48" y="40" fontSize="10" fontWeight="bold" fill="#059669">90°</text>
        {/* 45 fokos szögfelező */}
        <line x1="45" y1="110" x2="105" y2="50" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 2" />
        <text x="92" y="65" fontSize="10.5" fontWeight="bold" fill="#7c3aed">45°</text>
        {/* Derékszög jel (magyar szabvány: negyedkörív belső ponttal) */}
        <path d="M 45 100 A 10 10 0 0 1 55 110" fill="none" stroke="#64748b" strokeWidth="1.2" />
        <circle cx="49.5" cy="105.5" r="1.2" fill="#64748b" />
      </g>

      {/* Elválasztó vonal */}
      <line x1="290" y1="25" x2="290" y2="175" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* 3. Összetett szögek (75° = 60° + 15°, 120° = 180° - 60°) */}
      <g transform="translate(300, 20)">
        <text x="65" y="18" fontSize="11.5" fontWeight="bold" fill="#1e293b" textAnchor="middle">Összetett Szögek</text>
        <rect x="5" y="32" width="125" height="24" rx="4" fill="#eff6ff" />
        <text x="12" y="48" fontSize="11" fontWeight="bold" fill="#1e40af">30° = 60° felezése</text>

        <rect x="5" y="62" width="125" height="24" rx="4" fill="#f0fdf4" />
        <text x="12" y="78" fontSize="11" fontWeight="bold" fill="#166534">75° = 60° + 15°</text>

        <rect x="5" y="92" width="125" height="24" rx="4" fill="#faf5ff" />
        <text x="12" y="108" fontSize="11" fontWeight="bold" fill="#6b21a8">105° = 90° + 15°</text>

        <rect x="5" y="122" width="125" height="24" rx="4" fill="#fffbeb" />
        <text x="12" y="138" fontSize="11" fontWeight="bold" fill="#92400e">120° = 180° − 60°</text>
      </g>

      {/* Alsó összefoglalás */}
      <rect x="25" y="170" width="390" height="26" rx="6" fill="#ffffff" stroke="#e2e8f0" />
      <text x="220" y="187" fontSize="10.5" fontWeight="600" fill="#475569" textAnchor="middle">
        Minden 15° többszöröse megszerkeszthető csak körzővel és vonalzóval!
      </text>
    </svg>
  );
};
