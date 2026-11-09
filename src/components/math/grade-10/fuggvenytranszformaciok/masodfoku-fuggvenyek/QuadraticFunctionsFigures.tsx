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
        <rect x="0" y="0" width="120" height="120" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
        <text x="60" y="65" textAnchor="middle" fill="#4338ca" fontSize="16" fontWeight="bold">x²</text>
        <text x="60" y="-6" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="bold">x</text>
        <text x="-10" y="65" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="bold">x</text>

        {/* Jobb oldali téglalap: (b/2) · x */}
        <rect x="120" y="0" width="50" height="120" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <text x="145" y="65" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="bold">(b/2)·x</text>
        <text x="145" y="-6" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="bold">b/2</text>

        {/* Alsó téglalap: (b/2) · x */}
        <rect x="0" y="120" width="120" height="50" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <text x="60" y="150" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="bold">(b/2)·x</text>
        <text x="-14" y="150" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="bold">b/2</text>

        {/* Hiányzó sarok: (b/2)² négyzet (szaggatott, zöld) */}
        <rect x="120" y="120" width="50" height="50" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" strokeDasharray="4 4" />
        <text x="145" y="148" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="black">+(b/2)²</text>

        {/* Teljes befoglaló négyzet jelölése */}
        <text x="85" y="195" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="black">
          Teljes négyzet: (x + b/2)²
        </text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-amber-600">Geometriai kiegészítés:</span> x² + bx = (x + b/2)² - (b/2)². A sarok hiányzik a teljes négyzethez!
      </div>
    </div>
  );
};

/**
 * 2. Ábra: Általános és kanonikus alak összehasonlítása a parabolán
 * f(x) = ax² + bx + c és T(-b/(2a); v), y-metszéspont (0; c)
 */
export const GeneralToCanonicalParabolaSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="-130 -110 260 210"
        width={size}
        height={(size * 210) / 260}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <marker id="gcp-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Tengelyek */}
        <line x1="-120" y1="20" x2="120" y2="20" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#gcp-arrow)" />
        <line x1="0" y1="80" x2="0" y2="-90" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#gcp-arrow)" />
        <text x="114" y="34" fill="#64748b" fontSize="11" fontWeight="bold">x</text>
        <text x="-16" y="-78" fill="#64748b" fontSize="11" fontWeight="bold">y</text>

        {/* Parabola ív: T(30; 50) lent => felfelé nyíló, c pontnál (0; 5) metszi az y tengelyt */}
        {/* csúcs: (30; 50) => y = 0.05*(x - 30)² + 50. x=0-nál: 0.05*900+50 = 45+50 = 95 ? Nem, invertált SVG */}
        {/* SVG y koordináták: csúcs legyen (30; 50), tengely y=20-nál van */}
        <path d="M -30 -60 Q 30 70 90 -60" fill="none" stroke="#d97706" strokeWidth="2.5" />

        {/* Szimmetriatengely x = -b/(2a) */}
        <line x1="30" y1="-80" x2="30" y2="70" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
        <text x="34" y="-70" fill="#94a3b8" fontSize="10">x = -b/(2a)</text>

        {/* y-tengelymetszet (0; c) */}
        <circle cx="0" cy="5" r="4" fill="#2563eb" />
        <text x="-32" y="8" fill="#2563eb" fontSize="10" fontWeight="bold">(0; c)</text>

        {/* Csúcspont T(u; v) */}
        <circle cx="30" cy="50" r="4.5" fill="#d97706" />
        <text x="36" y="58" fill="#b45309" fontSize="11" fontWeight="black">T(u; v)</text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-amber-600">Csúcspont:</span> u = -b / (2a), v = f(u). <span className="font-bold text-blue-600">Konstans tag:</span> (0; c) az y-tengelymetszet!
      </div>
    </div>
  );
};

/**
 * 3. Ábra: Két egybevágó parabola azonos csúcsponttal: a = 1 és a = -1
 */
export const TwoParabolasSameVertexSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="-130 -110 260 210"
        width={size}
        height={(size * 210) / 260}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <marker id="tps-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Tengelyek */}
        <line x1="-120" y1="20" x2="120" y2="20" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#tps-arrow)" />
        <line x1="0" y1="80" x2="0" y2="-90" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#tps-arrow)" />
        <text x="114" y="34" fill="#64748b" fontSize="11" fontWeight="bold">x</text>
        <text x="-16" y="-78" fill="#64748b" fontSize="11" fontWeight="bold">y</text>

        {/* Csúcspont: T(-2; 5) => SVG: x = -40, y = -50 */}
        <circle cx="-40" cy="-50" r="4.5" fill="#0f172a" />
        <text x="-40" y="-60" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="black">T(-2; 5)</text>

        {/* 1. Parabola: felfelé nyíló (a = 1) */}
        <path d="M -90 -100 Q -40 -50 10 -100" fill="none" stroke="#16a34a" strokeWidth="2.5" />
        <text x="-105" y="-95" fill="#15803d" fontSize="10" fontWeight="bold">(x + 2)² + 5</text>

        {/* 2. Parabola: lefelé nyíló (a = -1) */}
        <path d="M -90 0 Q -40 -50 10 0" fill="none" stroke="#dc2626" strokeWidth="2.5" />
        <text x="-115" y="15" fill="#b91c1c" fontSize="10" fontWeight="bold">-(x + 2)² + 5</text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-slate-800 dark:text-slate-200">Tankönyvi feladvány:</span> Adott csúcsponttal (T) és görbülettel pontosan <strong>2 egybevágó parabola</strong> létezik: egy felfelé és egy lefelé nyíló!
      </div>
    </div>
  );
};

