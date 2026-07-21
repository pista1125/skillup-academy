import React from 'react';

/**
 * Visual SVG diagram showing Prime Factorization & LNKO/LKKT Venn Diagram
 * for 24 = 2^3 * 3 and 36 = 2^2 * 3^2
 */
export function PrimesVennDiagram() {
  return (
    <div className="my-6 p-5 bg-gradient-to-br from-blue-50/60 via-white to-indigo-50/60 rounded-2xl border border-blue-200 shadow-sm flex flex-col items-center text-center">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider rounded-full">
          Számelméleti Szemléltetés
        </span>
        <h4 className="text-sm font-bold text-slate-800">LNKO és LKKT Prímtényezős Venn-diagramja (24 és 36)</h4>
      </div>
      <p className="text-xs text-slate-500 mb-4 max-w-lg">
        $24 = 2 \\cdot 2 \\cdot 2 \\cdot 3$ és $36 = 2 \\cdot 2 \\cdot 3 \\cdot 3$. A közös prímtényezők adják az LNKO-t, az összes prímtényező uniója az LKKT-t.
      </p>

      <div className="w-full max-w-md aspect-[16/9] relative flex items-center justify-center">
        <svg viewBox="0 0 420 230" className="w-full h-full drop-shadow-xs">
          <defs>
            <linearGradient id="grad24" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="grad36" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#4338ca" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Universal container */}
          <rect x="10" y="10" width="400" height="210" rx="18" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />

          {/* 24 Circle */}
          <circle cx="160" cy="115" r="75" fill="url(#grad24)" stroke="#2563eb" strokeWidth="2.5" />
          <text x="115" y="65" fill="#1e40af" fontSize="15" fontWeight="900">24 prímtényezői</text>

          {/* 36 Circle */}
          <circle cx="260" cy="115" r="75" fill="url(#grad36)" stroke="#4f46e5" strokeWidth="2.5" />
          <text x="305" y="65" fill="#3730a3" fontSize="15" fontWeight="900">36 prímtényezői</text>

          {/* Exclusive to 24: prime 2 */}
          <circle cx="120" cy="115" r="14" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <text x="120" y="120" fill="#1e40af" fontSize="14" fontWeight="900" textAnchor="middle">2</text>

          {/* Intersection: primes 2, 2, 3 */}
          <circle cx="210" cy="90" r="13" fill="#e0e7ff" stroke="#4338ca" strokeWidth="1.5" />
          <text x="210" y="95" fill="#312e81" fontSize="13" fontWeight="900" textAnchor="middle">2</text>

          <circle cx="210" cy="118" r="13" fill="#e0e7ff" stroke="#4338ca" strokeWidth="1.5" />
          <text x="210" y="123" fill="#312e81" fontSize="13" fontWeight="900" textAnchor="middle">2</text>

          <circle cx="210" cy="146" r="13" fill="#e0e7ff" stroke="#4338ca" strokeWidth="1.5" />
          <text x="210" y="151" fill="#312e81" fontSize="13" fontWeight="900" textAnchor="middle">3</text>

          {/* Exclusive to 36: prime 3 */}
          <circle cx="300" cy="115" r="14" fill="#e0e7ff" stroke="#4338ca" strokeWidth="1.5" />
          <text x="300" y="120" fill="#3730a3" fontSize="14" fontWeight="900" textAnchor="middle">3</text>
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full mt-4 text-xs font-semibold">
        <div className="p-3 bg-blue-100/90 text-blue-950 rounded-xl border border-blue-200">
          <span className="block font-black text-sm">LNKO(24, 36) = 12</span>
          <span className="text-[11px] text-blue-800">Metszet: $2 \\cdot 2 \\cdot 3 = 12$</span>
        </div>
        <div className="p-3 bg-indigo-100/90 text-indigo-950 rounded-xl border border-indigo-200">
          <span className="block font-black text-sm">LKKT(24, 36) = 72</span>
          <span className="text-[11px] text-indigo-800">Unió: $2^3 \\cdot 3^2 = 72$</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Visual SVG diagram showing Geometric Proof of Means Inequality (AM >= GM)
 */
export function MeansInequalityDiagram() {
  return (
    <div className="my-6 p-5 bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/70 rounded-2xl border border-indigo-200 shadow-sm flex flex-col items-center text-center">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider rounded-full">
          Geometriai Bizonyítás
        </span>
        <h4 className="text-sm font-bold text-slate-800">Számtani és Mértani Közép Egyenlőtlensége ($\frac{a+b}{2} \ge \sqrt{ab}$)</h4>
      </div>
      <p className="text-xs text-slate-500 mb-4 max-w-lg">
        Az $a+b$ átmérőjű félkör sugara a számtani közép ($\frac{a+b}{2}$), míg az $a$ és $b$ szakaszok érintkezési pontjából emelt merőleges magasság a mértani közép ($\sqrt{ab}$). A sugár mindig $\ge$ mint a magasság!
      </p>

      <div className="w-full max-w-md aspect-[16/9] relative flex items-center justify-center">
        <svg viewBox="0 0 400 220" className="w-full h-full">
          {/* Base line */}
          <line x1="30" y1="180" x2="370" y2="180" stroke="#334155" strokeWidth="3" />

          {/* Semicircle */}
          <path d="M 30 180 A 170 170 0 0 1 370 180 Z" fill="#e0e7ff" fillOpacity="0.4" stroke="#4f46e5" strokeWidth="2.5" />

          {/* Division point P between a and b */}
          <line x1="130" y1="180" x2="130" y2="47" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="3 3" />
          <circle cx="130" cy="47" r="4" fill="#dc2626" />

          {/* Center point O */}
          <circle cx="200" cy="180" r="4" fill="#1e1b4b" />
          <line x1="200" y1="180" x2="130" y2="47" stroke="#16a34a" strokeWidth="2.5" />

          {/* Radius to top */}
          <line x1="200" y1="180" x2="200" y2="10" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 4" />

          {/* Labels */}
          <text x="80" y="198" fill="#1e293b" fontSize="13" fontWeight="bold">a</text>
          <text x="250" y="198" fill="#1e293b" fontSize="13" fontWeight="bold">b</text>

          {/* Height (GM) */}
          <text x="120" y="110" fill="#dc2626" fontSize="12" fontWeight="900" textAnchor="end">Mértani közép (√ab)</text>

          {/* Radius (AM) */}
          <text x="175" y="110" fill="#16a34a" fontSize="12" fontWeight="900" textAnchor="start">Számtani közép (a+b)/2</text>
        </svg>
      </div>

      <div className="mt-3 p-2 bg-indigo-100/80 text-indigo-950 rounded-xl text-xs font-semibold w-full">
        💡 Mivel a derékszögű háromszög átfogója (sugár) mindig hosszabb a befogójánál (magasság), ezért $\frac{a+b}{2} \ge \sqrt{ab}$!
      </div>
    </div>
  );
}

/**
 * Visual SVG diagram showing Quadratic Parabola roots & discriminant
 */
export function QuadraticParabolaDiagram() {
  return (
    <div className="my-6 p-5 bg-gradient-to-br from-purple-50/60 via-white to-pink-50/60 rounded-2xl border border-purple-200 shadow-sm flex flex-col items-center text-center">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 bg-purple-600 text-white text-[10px] font-black uppercase tracking-wider rounded-full">
          Másodfokú Függvény
        </span>
        <h4 className="text-sm font-bold text-slate-800">Parabola és a Diszkrimináns ($D = b^2 - 4ac$)</h4>
      </div>

      <div className="w-full max-w-md aspect-[16/9] relative flex items-center justify-center">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {/* Axis */}
          <line x1="20" y1="140" x2="380" y2="140" stroke="#64748b" strokeWidth="2" />
          <text x="375" y="130" fill="#475569" fontSize="12" fontWeight="bold">x</text>

          {/* D > 0 Parabola (2 roots) */}
          <path d="M 40 40 Q 110 180 180 40" fill="none" stroke="#9333ea" strokeWidth="3" />
          <circle cx="78" cy="140" r="5" fill="#7e22ce" />
          <circle cx="142" cy="140" r="5" fill="#7e22ce" />
          <text x="110" y="190" fill="#7e22ce" fontSize="11" fontWeight="bold">D &gt; 0 (2 gyök)</text>

          {/* D = 0 Parabola (1 root) */}
          <path d="M 190 60 Q 250 140 310 60" fill="none" stroke="#2563eb" strokeWidth="3" />
          <circle cx="250" cy="140" r="5" fill="#1d4ed8" />
          <text x="250" y="160" fill="#1d4ed8" fontSize="11" fontWeight="bold">D = 0 (1 gyök)</text>

          {/* D < 0 Parabola (0 roots) */}
          <path d="M 310 40 Q 355 90 390 40" fill="none" stroke="#dc2626" strokeWidth="3" />
          <text x="355" y="115" fill="#dc2626" fontSize="11" fontWeight="bold">D &lt; 0 (0 gyök)</text>
        </svg>
      </div>
    </div>
  );
}
