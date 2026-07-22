import React from 'react';

/**
 * Visual SVG diagram showing Right Triangle, Pythagorean Theorem & Trigonometric Ratios
 */
export function TrianglePythagorasDiagram() {
  return (
    <div className="my-6 p-5 bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/60 rounded-2xl border border-emerald-200 shadow-sm flex flex-col items-center text-center">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider rounded-full">
          Geometriai Szemléltetés
        </span>
        <h4 className="text-sm font-bold text-slate-800">Derékszögű Háromszög és Pitagorasz-tétel (a² + b² = c²)</h4>
      </div>
      <p className="text-xs text-slate-500 mb-4 max-w-lg">
        a, b: befogók, c: átfogó. sin(α) = a / c, cos(α) = b / c, tan(α) = a / b.
      </p>

      <div className="w-full max-w-md aspect-[16/9] relative flex items-center justify-center">
        <svg viewBox="0 0 400 230" className="w-full h-full drop-shadow-xs">
          <defs>
            <linearGradient id="gradTriangle" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Right Angle Triangle A(50, 180), B(320, 180), C(50, 40) */}
          <polygon points="50,180 320,180 50,40" fill="url(#gradTriangle)" stroke="#059669" strokeWidth="3" />

          {/* Right angle indicator at (50, 180) */}
          <path d="M 50 160 L 70 160 L 70 180" fill="none" stroke="#047857" strokeWidth="2" />
          <circle cx="60" cy="170" r="2.5" fill="#047857" />

          {/* Angle alpha arc at B(320, 180) */}
          <path d="M 280 180 A 40 40 0 0 0 295 165" fill="none" stroke="#d97706" strokeWidth="2" />
          <text x="270" y="172" fill="#b45309" fontSize="13" fontWeight="bold">α</text>

          {/* Labels for Vertices */}
          <text x="35" y="195" fill="#1e293b" fontSize="13" fontWeight="900">C (derékszög)</text>
          <text x="330" y="195" fill="#1e293b" fontSize="13" fontWeight="900">B</text>
          <text x="40" y="30" fill="#1e293b" fontSize="13" fontWeight="900">A</text>

          {/* Sides */}
          <text x="30" y="115" fill="#047857" fontSize="14" fontWeight="900" textAnchor="end">a (befogó)</text>
          <text x="185" y="200" fill="#047857" fontSize="14" fontWeight="900" textAnchor="middle">b (befogó)</text>
          <text x="195" y="100" fill="#2563eb" fontSize="14" fontWeight="900" textAnchor="start">c (átfogó)</text>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 w-full mt-3 text-xs font-semibold">
        <div className="p-2 bg-emerald-100/90 text-emerald-950 rounded-xl border border-emerald-200">
          <span className="block font-black">Pitagorasz</span>
          <span className="text-[10px] text-emerald-800">a² + b² = c²</span>
        </div>
        <div className="p-2 bg-blue-100/90 text-blue-950 rounded-xl border border-blue-200">
          <span className="block font-black">Szinusz (α)</span>
          <span className="text-[10px] text-blue-800">sin(α) = a / c</span>
        </div>
        <div className="p-2 bg-amber-100/90 text-amber-950 rounded-xl border border-amber-200">
          <span className="block font-black">Koszinusz (α)</span>
          <span className="text-[10px] text-amber-800">cos(α) = b / c</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Visual SVG diagram showing Triangle Special Lines (Height, Median, Bisector, S)
 */
export function TriangleSpecialLinesDiagram() {
  return (
    <div className="my-6 p-5 bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/60 rounded-2xl border border-purple-200 shadow-sm flex flex-col items-center text-center">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 bg-purple-600 text-white text-[10px] font-black uppercase tracking-wider rounded-full">
          Háromszög Nevezetes Vonalai
        </span>
        <h4 className="text-sm font-bold text-slate-800">Magasságvonal (mₐ), Súlyvonal (sₐ) és Súlypont (S)</h4>
      </div>

      <div className="w-full max-w-md aspect-[16/9] relative flex items-center justify-center">
        <svg viewBox="0 0 400 220" className="w-full h-full">
          {/* Triangle A(80, 180), B(340, 180), C(160, 40) */}
          <polygon points="80,180 340,180 160,40" fill="#faf5ff" stroke="#7e22ce" strokeWidth="2.5" />

          {/* Height ma from C perpendicular to AB at (160, 180) */}
          <line x1="160" y1="40" x2="160" y2="180" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 4" />
          <text x="145" y="115" fill="#dc2626" fontSize="11" fontWeight="bold">mₐ (magasság)</text>

          {/* Median sa from C to midpoint of AB at (210, 180) */}
          <line x1="160" y1="40" x2="210" y2="180" stroke="#2563eb" strokeWidth="2" />
          <text x="195" y="115" fill="#2563eb" fontSize="11" fontWeight="bold">sₐ (súlyvonal)</text>

          {/* Centroid S at (193, 133) */}
          <circle cx="193" cy="133" r="4.5" fill="#4338ca" />
          <text x="208" y="137" fill="#312e81" fontSize="12" fontWeight="900">S (Súlypont 2:1)</text>

          {/* Vertices */}
          <text x="65" y="195" fill="#1e293b" fontSize="13" fontWeight="bold">A</text>
          <text x="348" y="195" fill="#1e293b" fontSize="13" fontWeight="bold">B</text>
          <text x="160" y="30" fill="#1e293b" fontSize="13" fontWeight="bold" textAnchor="middle">C</text>
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full mt-3 text-xs font-semibold">
        <div className="p-2 bg-red-50 text-red-900 rounded-xl border border-red-200">
          <span className="block font-black">Magasság (mₐ)</span>
          <span className="text-[10px] text-red-700">Merőleges a szemközti oldalra</span>
        </div>
        <div className="p-2 bg-indigo-50 text-indigo-900 rounded-xl border border-indigo-200">
          <span className="block font-black">Súlypont (S)</span>
          <span className="text-[10px] text-indigo-700">2:1 arányban osztja a súlyvonalat</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Visual SVG diagram showing Circle, Tangent & Thales Theorem
 */
export function CircleTangentThalesDiagram() {
  return (
    <div className="my-6 p-5 bg-gradient-to-br from-blue-50/60 via-white to-purple-50/60 rounded-2xl border border-blue-200 shadow-sm flex flex-col items-center text-center">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider rounded-full">
          Kör Geometria
        </span>
        <h4 className="text-sm font-bold text-slate-800">Thalész-tétel és Kör Érintője</h4>
      </div>

      <div className="w-full max-w-md aspect-[16/9] relative flex items-center justify-center">
        <svg viewBox="0 0 400 230" className="w-full h-full">
          {/* Main Circle */}
          <circle cx="200" cy="125" r="75" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2.5" />
          <circle cx="200" cy="125" r="3.5" fill="#0369a1" />
          <text x="200" y="142" fill="#0369a1" fontSize="11" fontWeight="bold" textAnchor="middle">O (Középpont)</text>

          {/* Diameter AB */}
          <line x1="125" y1="125" x2="275" y2="125" stroke="#334155" strokeWidth="2" />
          <circle cx="125" cy="125" r="4" fill="#1e293b" />
          <circle cx="275" cy="125" r="4" fill="#1e293b" />
          <text x="110" y="130" fill="#1e293b" fontSize="12" fontWeight="bold">A</text>
          <text x="285" y="130" fill="#1e293b" fontSize="12" fontWeight="bold">B</text>

          {/* Point C on circle for Thales Triangle */}
          <polygon points="125,125 275,125 200,50" fill="none" stroke="#9333ea" strokeWidth="2" />
          <circle cx="200" cy="50" r="4" fill="#7e22ce" />
          <text x="200" y="38" fill="#7e22ce" fontSize="12" fontWeight="900" textAnchor="middle">C (90° szög!)</text>

          {/* Tangent line at B */}
          <line x1="275" y1="40" x2="275" y2="210" stroke="#dc2626" strokeWidth="2.5" />
          <text x="282" y="55" fill="#dc2626" fontSize="11" fontWeight="extrabold">e (Érintő)</text>

          {/* Right angle at B for tangent & radius */}
          <path d="M 275 140 L 260 140 L 260 125" fill="none" stroke="#dc2626" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="mt-2 text-xs text-slate-600 font-medium">
        💡 <strong>Thalész-tétel:</strong> Az átmérőből (AB) a körvonal bármely C pontjába húzott szög derékszög (90°). Az érintő mindig merőleges a sugárra!
      </div>
    </div>
  );
}

/**
 * Visual SVG diagram showing Circle Equation in Coordinate Plane
 */
export function CircleEquationDiagram() {
  return (
    <div className="my-6 p-5 bg-gradient-to-br from-sky-50/60 via-white to-blue-50/60 rounded-2xl border border-sky-200 shadow-sm flex flex-col items-center text-center">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 bg-sky-600 text-white text-[10px] font-black uppercase tracking-wider rounded-full">
          Koordinátageometria
        </span>
        <h4 className="text-sm font-bold text-slate-800">Kör Egyenlete: (x - u)² + (y - v)² = r²</h4>
      </div>

      <div className="w-full max-w-md aspect-[16/9] relative flex items-center justify-center">
        <svg viewBox="0 0 400 220" className="w-full h-full">
          {/* Axes */}
          <line x1="30" y1="170" x2="370" y2="170" stroke="#94a3b8" strokeWidth="2" />
          <line x1="100" y1="20" x2="100" y2="200" stroke="#94a3b8" strokeWidth="2" />
          <text x="365" y="160" fill="#64748b" fontSize="12" fontWeight="bold">x</text>
          <text x="110" y="30" fill="#64748b" fontSize="12" fontWeight="bold">y</text>

          {/* Circle C(220, 90) r=60 */}
          <circle cx="220" cy="90" r="60" fill="#e0f2fe" fillOpacity="0.5" stroke="#0284c7" strokeWidth="2.5" />
          <circle cx="220" cy="90" r="4" fill="#0369a1" />
          <text x="220" y="108" fill="#0369a1" fontSize="12" fontWeight="900" textAnchor="middle">C(u, v)</text>

          {/* Radius line to P(x, y) */}
          <line x1="220" y1="90" x2="265" y2="50" stroke="#0284c7" strokeWidth="2" />
          <circle cx="265" cy="50" r="4" fill="#0284c7" />
          <text x="275" y="48" fill="#0369a1" fontSize="11" fontWeight="bold">P(x, y)</text>
          <text x="248" y="65" fill="#0284c7" fontSize="11" fontWeight="extrabold">r</text>
        </svg>
      </div>
    </div>
  );
}

/**
 * Visual SVG diagram showing Coordinate Geometry Line & Normal Vector
 */
export function CoordinateLineVectorDiagram() {
  return (
    <div className="my-6 p-5 bg-gradient-to-br from-indigo-50/60 via-white to-slate-50/60 rounded-2xl border border-indigo-200 shadow-sm flex flex-col items-center text-center">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider rounded-full">
          Koordinátageometria
        </span>
        <h4 className="text-sm font-bold text-slate-800">Egyenes Normálvektoros Egyenlete (Ax + By = C)</h4>
      </div>

      <div className="w-full max-w-md aspect-[16/9] relative flex items-center justify-center">
        <svg viewBox="0 0 400 220" className="w-full h-full">
          {/* Axes */}
          <line x1="30" y1="170" x2="370" y2="170" stroke="#94a3b8" strokeWidth="2" />
          <line x1="100" y1="20" x2="100" y2="200" stroke="#94a3b8" strokeWidth="2" />
          <text x="365" y="160" fill="#64748b" fontSize="12" fontWeight="bold">x</text>
          <text x="110" y="30" fill="#64748b" fontSize="12" fontWeight="bold">y</text>

          {/* Line e: Ax + By = C */}
          <line x1="50" y1="180" x2="350" y2="40" stroke="#2563eb" strokeWidth="3" />
          <text x="330" y="30" fill="#1d4ed8" fontSize="13" fontWeight="900">e egyenes</text>

          {/* Given Point P(x0, y0) */}
          <circle cx="200" cy="110" r="5" fill="#1d4ed8" />
          <text x="210" y="125" fill="#1e3a8a" fontSize="12" fontWeight="bold">P₀(x₀, y₀)</text>

          {/* Normal Vector n(A, B) perpendicular to e */}
          <line x1="200" y1="110" x2="140" y2="30" stroke="#dc2626" strokeWidth="3" />
          <polygon points="140,30 148,42 136,44" fill="#dc2626" />
          <text x="120" y="45" fill="#b91c1c" fontSize="13" fontWeight="900">n⃗(A, B)</text>
        </svg>
      </div>

      <div className="mt-2 p-2 bg-indigo-100/90 text-indigo-950 rounded-xl text-xs font-semibold w-full">
        Az e egyenes normálvektora n⃗(A, B) merőleges az egyenesre. Egyenlete: A(x - x₀) + B(y - y₀) = 0.
      </div>
    </div>
  );
}

/**
 * Visual SVG diagram showing Quadrilaterals (Trapezoid, Parallelogram, Rhombus)
 */
export function QuadrilateralsDiagram() {
  return (
    <div className="my-6 p-5 bg-gradient-to-br from-amber-50/60 via-white to-orange-50/60 rounded-2xl border border-amber-200 shadow-sm flex flex-col items-center text-center">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 bg-amber-600 text-white text-[10px] font-black uppercase tracking-wider rounded-full">
          Négyszögek Geometriája
        </span>
        <h4 className="text-sm font-bold text-slate-800">Trapéz és Paralelogramma Területe</h4>
      </div>

      <div className="w-full max-w-md aspect-[16/9] relative flex items-center justify-center">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {/* Trapezoid A(40,160), B(200,160), C(160,60), D(80,60) */}
          <polygon points="40,160 200,160 160,60 80,60" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
          <line x1="80" y1="60" x2="80" y2="160" stroke="#dc2626" strokeWidth="2" strokeDasharray="3 3" />
          <text x="70" y="115" fill="#dc2626" fontSize="11" fontWeight="bold">m</text>
          <text x="120" y="175" fill="#b45309" fontSize="12" fontWeight="bold">a (alap)</text>
          <text x="120" y="52" fill="#b45309" fontSize="12" fontWeight="bold">c (fedőlap)</text>

          {/* Parallelogram A(240,160), B(370,160), C(340,60), D(210,60) */}
          <polygon points="240,160 370,160 330,60 200,60" fill="#ffedd5" stroke="#ea580c" strokeWidth="2.5" />
          <text x="285" y="175" fill="#c2410c" fontSize="12" fontWeight="bold">a</text>
          <text x="355" y="110" fill="#c2410c" fontSize="12" fontWeight="bold">b</text>
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full mt-2 text-xs font-semibold">
        <div className="p-2 bg-amber-100 text-amber-950 rounded-xl">
          Trapéz Terület: T = (a + c) · m / 2
        </div>
        <div className="p-2 bg-orange-100 text-orange-950 rounded-xl">
          Paralelogramma Terület: T = a · mₐ = ab sin(γ)
        </div>
      </div>
    </div>
  );
}

/**
 * Visual SVG diagram showing Trigonometric Unit Circle
 */
export function TrigUnitCircleDiagram() {
  return (
    <div className="my-6 p-5 bg-gradient-to-br from-purple-50/60 via-white to-pink-50/60 rounded-2xl border border-purple-200 shadow-sm flex flex-col items-center text-center">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 bg-purple-600 text-white text-[10px] font-black uppercase tracking-wider rounded-full">
          Trigonometrikus Egységkör
        </span>
        <h4 className="text-sm font-bold text-slate-800">Szinusz (sin α) és Koszinusz (cos α) Vetülete</h4>
      </div>

      <div className="w-full max-w-md aspect-[16/9] relative flex items-center justify-center">
        <svg viewBox="0 0 400 220" className="w-full h-full">
          {/* Unit Circle Radius r = 70 */}
          <circle cx="200" cy="110" r="70" fill="#fdf4ff" stroke="#a855f7" strokeWidth="2" />
          <line x1="100" y1="110" x2="300" y2="110" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="200" y1="30" x2="200" y2="190" stroke="#94a3b8" strokeWidth="1.5" />

          {/* Angle 45 deg point P */}
          <line x1="200" y1="110" x2="250" y2="60" stroke="#7e22ce" strokeWidth="2.5" />
          <circle cx="250" cy="60" r="4" fill="#6b21a8" />

          {/* Cosine projection on x */}
          <line x1="200" y1="110" x2="250" y2="110" stroke="#2563eb" strokeWidth="3" />
          <text x="225" y="125" fill="#1d4ed8" fontSize="12" fontWeight="900" textAnchor="middle">cos α</text>

          {/* Sine projection on y */}
          <line x1="250" y1="110" x2="250" y2="60" stroke="#dc2626" strokeWidth="3" strokeDasharray="3 3" />
          <text x="260" y="85" fill="#b91c1c" fontSize="12" fontWeight="900">sin α</text>

          {/* Angle arc */}
          <path d="M 225 110 A 25 25 0 0 0 218 92" fill="none" stroke="#a855f7" strokeWidth="2" />
          <text x="226" y="98" fill="#7e22ce" fontSize="11" fontWeight="bold">α</text>
        </svg>
      </div>
    </div>
  );
}
