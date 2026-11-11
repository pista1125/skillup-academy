import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Ábra: Geometriai teljes négyzetté kiegészítés (ókori módszer)
 * x² + 2dx területe kiegészítve d² négyzetté => (x + d)²
 */
export const CompletingSquareGeometricSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="-20 -20 220 220"
        width={size}
        height={size}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        {/* Nagy x² négyzet */}
        <rect x="0" y="0" width="120" height="120" rx="4" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
        <text x="60" y="65" textAnchor="middle" fill="#4338ca" fontSize="16" fontWeight="bold">x²</text>
        <text x="60" y="-6" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="bold">x</text>
        <text x="-10" y="65" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="bold">x</text>

        {/* Jobb oldali téglalap: (b/2) · x */}
        <rect x="120" y="0" width="50" height="120" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <text x="145" y="65" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="bold">(b/2)·x</text>
        <text x="145" y="-6" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="bold">b/2</text>

        {/* Alsó téglalap: (b/2) · x */}
        <rect x="0" y="120" width="120" height="50" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <text x="60" y="150" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="bold">(b/2)·x</text>
        <text x="-14" y="150" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="bold">b/2</text>

        {/* Hiányzó sarok: (b/2)² négyzet (szaggatott, zöld) */}
        <rect x="120" y="120" width="50" height="50" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" strokeDasharray="4 4" />
        <text x="145" y="148" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="black">+(b/2)²</text>

        {/* Teljes befoglaló négyzet jelölése */}
        <text x="85" y="195" textAnchor="middle" fill="#0f172a" dark:fill="#f8fafc" fontSize="12" fontWeight="black">
          Teljes négyzet: (x + b/2)²
        </text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-amber-600 dark:text-amber-400">Geometriai kiegészítés:</span> x² + bx = (x + b/2)² - (b/2)². A sarok hiányzik a teljes négyzethez!
      </div>
    </div>
  );
};

/**
 * 2. Ábra: Általános és kanonikus alak összehasonlítása a parabolán
 * f(x) = ax² + bx + c és T(-b/(2a); v), y-metszéspont (0; c)
 * Részletes, tankönyvi szintű koordináta-rendszer rácshálóval és pontos csúcsponttal.
 */
export const GeneralToCanonicalParabolaSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 340 260"
        width={size}
        height={(size * 260) / 340}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <pattern id="gcp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.25" />
          </pattern>
          <marker id="gcp-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Háttér kártya és finom koordinátarács */}
        <rect x="15" y="15" width="310" height="230" rx="12" fill="#f8fafc" className="dark:fill-slate-900/60" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="15" y="15" width="310" height="230" rx="12" fill="url(#gcp-grid)" />

        {/* Tengelyek: Origó O(0; 0) a (90, 140) pontban */}
        {/* X-tengely */}
        <line x1="25" y1="140" x2="315" y2="140" stroke="#475569" strokeWidth="1.8" markerEnd="url(#gcp-arrow)" />
        <text x="310" y="132" fill="#475569" fontSize="11" fontWeight="bold">x</text>

        {/* Y-tengely */}
        <line x1="90" y1="235" x2="90" y2="25" stroke="#475569" strokeWidth="1.8" markerEnd="url(#gcp-arrow)" />
        <text x="98" y="32" fill="#475569" fontSize="11" fontWeight="bold">y</text>

        {/* Origó jelzés */}
        <text x="76" y="154" fill="#64748b" fontSize="10" fontWeight="bold">O</text>

        {/* Szimmetriatengely: x = u = -b/(2a) -> x = 160 */}
        <line x1="160" y1="25" x2="160" y2="235" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.8" />
        <rect x="125" y="24" width="70" height="18" rx="4" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="0.8" />
        <text x="160" y="36" fill="#0369a1" fontSize="9" fontWeight="bold" textAnchor="middle">x = -b / (2a)</text>

        {/* Vízszintes vetítés: y = v -> y = 180 */}
        <line x1="90" y1="180" x2="160" y2="180" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.85" />
        <text x="74" y="184" fill="#d97706" fontSize="10" fontWeight="bold" textAnchor="end">v</text>

        {/* Függőleges vetítés az x-tengelyre: u */}
        <line x1="160" y1="140" x2="160" y2="180" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="3 3" />
        <text x="160" y="134" fill="#0284c7" fontSize="10" fontWeight="bold" textAnchor="middle">u</text>

        {/* Parabola: csúcs T(u=160, v=180). Végpontok (60, 50) és (260, 50).
            Apex ellenőrzés: yc = 2 * 180 - 50 = 310.
            t=0.5-nél: 0.5*50 + 0.5*310 = 180 (pontosan T-n fekszik!)
            x=90-nél (y-tengely): y = 180 - (130 / 100^2) * (90-160)^2 = 180 - 0.013 * 4900 = 180 - 63.7 = 116.3 */}
        <path
          d="M 60 50 Q 160 310 260 50"
          fill="none"
          stroke="#ea580c"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* y-tengelymetszet: (0; c) a (90, 116) pontban */}
        <line x1="85" y1="116" x2="95" y2="116" stroke="#2563eb" strokeWidth="1.5" />
        <circle cx="90" cy="116" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
        <rect x="22" y="105" width="62" height="20" rx="4" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
        <text x="53" y="119" fill="#1d4ed8" fontSize="10" fontWeight="bold" textAnchor="middle">(0; c)</text>

        {/* Szimmetrikus párja: (2u; c) a (230, 116) pontban */}
        <circle cx="230" cy="116" r="3.5" fill="#94a3b8" />
        <line x1="90" y1="116" x2="230" y2="116" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

        {/* Csúcspont T(u; v): céltárcsás kiemeléssel a (160, 180) pontban */}
        <circle cx="160" cy="180" r="8" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" opacity="0.8" />
        <circle cx="160" cy="180" r="4.5" fill="#ea580c" stroke="#ffffff" strokeWidth="1.5" />
        <rect x="125" y="194" width="70" height="22" rx="5" fill="#fff7ed" stroke="#fdba74" strokeWidth="1" />
        <text x="160" y="209" fill="#c2410c" fontSize="11" fontWeight="900" textAnchor="middle">T(u; v)</text>

        {/* Képlet kártya felül */}
        <rect x="200" y="24" width="115" height="22" rx="5" fill="#fef2f2" stroke="#fecaca" strokeWidth="1" />
        <text x="257" y="39" fill="#b91c1c" fontSize="10" fontWeight="bold" textAnchor="middle">f(x) = ax² + bx + c</text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-amber-600 dark:text-amber-400">Csúcspont:</span> u = -b / (2a), v = f(u). <span className="font-bold text-blue-600 dark:text-blue-400">Konstans tag:</span> (0; c) az y-tengelymetszet!
      </div>
    </div>
  );
};

/**
 * 3. Ábra: Két egybevágó parabola azonos csúcsponttal: a = 1 és a = -1
 * Precíz matematikai görbék közös T(-2; 5) csúcsponttal és rácshálóval.
 */
export const TwoParabolasSameVertexSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 340 260"
        width={size}
        height={(size * 260) / 340}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <pattern id="tps-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.25" />
          </pattern>
          <marker id="tps-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Háttér és koordinátarács */}
        <rect x="15" y="15" width="310" height="230" rx="12" fill="#f8fafc" className="dark:fill-slate-900/60" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="15" y="15" width="310" height="230" rx="12" fill="url(#tps-grid)" />

        {/* Tengelyek: Origó O(0; 0) a (190, 150) pontban */}
        {/* 1 egység = 20 px */}
        {/* X-tengely */}
        <line x1="25" y1="150" x2="315" y2="150" stroke="#475569" strokeWidth="1.8" markerEnd="url(#tps-arrow)" />
        <text x="310" y="142" fill="#475569" fontSize="11" fontWeight="bold">x</text>

        {/* Y-tengely */}
        <line x1="190" y1="235" x2="190" y2="25" stroke="#475569" strokeWidth="1.8" markerEnd="url(#tps-arrow)" />
        <text x="198" y="32" fill="#475569" fontSize="11" fontWeight="bold">y</text>
        <text x="178" y="164" fill="#64748b" fontSize="10" fontWeight="bold">O</text>

        {/* Csúcspont koordinátái: u = -2 => x = 190 - 2*20 = 150. v = +5 => y = 150 - 5*20 = 50. */}
        {/* Szaggatott vetítővonalak */}
        <line x1="150" y1="25" x2="150" y2="235" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
        <line x1="150" y1="50" x2="190" y2="50" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
        <text x="150" y="164" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">-2</text>
        <text x="202" y="54" fill="#475569" fontSize="10" fontWeight="bold">5</text>

        {/* 1. Parabola: felfelé nyíló (a = 1), f(x) = (x + 2)² + 5
            Csúcs: (150, 50). Végpontok: w = 60 px (3 egység) => x0 = 90, x1 = 210.
            y0 = y1 = 50 - 3^2 * 5 px = 50 - 45 = 5 (felfelé a negatív SVG y felé).
            Apex: yc = 2 * 50 - 5 = 95. t=0.5-nél y = 0.5*5 + 0.5*95 = 50! PONTOS! */}
        <path
          d="M 80 -10 Q 150 110 220 -10"
          fill="none"
          stroke="#16a34a"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* 2. Parabola: lefelé nyíló (a = -1), g(x) = -(x + 2)² + 5
            Csúcs: (150, 50). Végpontok: w = 90 px (4.5 egység) => x0 = 60, x1 = 240.
            y0 = y1 = 50 + 4.5^2 * 8 px ... pl. y0 = 210.
            Apex: yc = 2 * 50 - 210 = -110. t=0.5-nél y = 0.5*210 + 0.5*(-110) = 50! PONTOS! */}
        <path
          d="M 60 212 Q 150 -112 240 212"
          fill="none"
          stroke="#dc2626"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Közös csúcspont T(-2; 5) a (150, 50) helyen */}
        <circle cx="150" cy="50" r="8" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" opacity="0.8" />
        <circle cx="150" cy="50" r="4.5" fill="#4f46e5" stroke="#ffffff" strokeWidth="1.5" />
        <rect x="95" y="20" width="110" height="22" rx="5" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="1" />
        <text x="150" y="35" fill="#3730a3" fontSize="11" fontWeight="900" textAnchor="middle">Közös T(-2; 5)</text>

        {/* Képlet címkék */}
        <rect x="25" y="65" width="105" height="22" rx="4" fill="#ecfdf5" stroke="#bbf7d0" strokeWidth="1" />
        <text x="77" y="80" fill="#15803d" fontSize="10" fontWeight="bold" textAnchor="middle">a = +1: (x + 2)² + 5</text>

        <rect x="25" y="180" width="110" height="22" rx="4" fill="#fef2f2" stroke="#fecaca" strokeWidth="1" />
        <text x="80" y="195" fill="#b91c1c" fontSize="10" fontWeight="bold" textAnchor="middle">a = -1: -(x + 2)² + 5</text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-slate-800 dark:text-slate-200">Tankönyvi feladvány:</span> Adott csúcsponttal (T) és |a| = 1 meredekséggel pontosan <strong>2 egybevágó parabola</strong> létezik: egy felfelé és egy lefelé nyíló!
      </div>
    </div>
  );
};
