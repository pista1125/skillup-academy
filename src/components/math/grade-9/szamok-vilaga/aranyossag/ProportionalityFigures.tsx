import React from 'react';

/**
 * Egyenes arányosság grafikonja (origón átmenő egyenes / félegyenes)
 */
export const DirectProportionalitySvg: React.FC<{ size?: number; className?: string }> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 500 320"
        style={size ? { width: size, height: (size * 320) / 500 } : { width: '100%', maxWidth: 500, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        <defs>
          <linearGradient id="directLineGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <marker id="directArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-slate-400 dark:fill-slate-500" />
          </marker>
        </defs>

        {/* Háttér kártya */}
        <rect
          x="10"
          y="10"
          width="480"
          height="300"
          rx="18"
          className="fill-emerald-50/40 dark:fill-emerald-950/20 stroke-emerald-200 dark:stroke-emerald-800/60"
          strokeWidth="1.5"
        />

        {/* Rács és tengelyek */}
        <g className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="3 3">
          <line x1="60" y1="210" x2="450" y2="210" />
          <line x1="60" y1="160" x2="450" y2="160" />
          <line x1="60" y1="110" x2="450" y2="110" />
          <line x1="60" y1="60" x2="450" y2="60" />

          <line x1="150" y1="40" x2="150" y2="260" />
          <line x1="240" y1="40" x2="240" y2="260" />
          <line x1="330" y1="40" x2="330" y2="260" />
          <line x1="420" y1="40" x2="420" y2="260" />
        </g>

        {/* Főtengelyek */}
        <line
          x1="55"
          y1="260"
          x2="465"
          y2="260"
          className="stroke-slate-600 dark:stroke-slate-300"
          strokeWidth="2"
          markerEnd="url(#directArrow)"
        />
        <line
          x1="60"
          y1="265"
          x2="60"
          y2="30"
          className="stroke-slate-600 dark:stroke-slate-300"
          strokeWidth="2"
          markerEnd="url(#directArrow)"
        />

        {/* Tengely feliratok */}
        <text x="460" y="280" className="fill-slate-700 dark:fill-slate-300 font-bold text-xs">x (mennyiség)</text>
        <text x="40" y="32" className="fill-slate-700 dark:fill-slate-300 font-bold text-xs" textAnchor="end">y (ár, út...)</text>
        <text x="50" y="275" className="fill-slate-500 font-mono text-xs">0</text>

        {/* X tengely beosztások */}
        <text x="150" y="278" textAnchor="middle" className="fill-slate-500 font-mono text-xs">1</text>
        <text x="240" y="278" textAnchor="middle" className="fill-slate-500 font-mono text-xs">2</text>
        <text x="330" y="278" textAnchor="middle" className="fill-slate-500 font-mono text-xs">3</text>
        <text x="420" y="278" textAnchor="middle" className="fill-slate-500 font-mono text-xs">4</text>

        {/* Y tengely beosztások */}
        <text x="50" y="214" textAnchor="end" className="fill-slate-500 font-mono text-xs">k</text>
        <text x="50" y="164" textAnchor="end" className="fill-slate-500 font-mono text-xs">2k</text>
        <text x="50" y="114" textAnchor="end" className="fill-slate-500 font-mono text-xs">3k</text>
        <text x="50" y="64" textAnchor="end" className="fill-slate-500 font-mono text-xs">4k</text>

        {/* Vetítési szaggatott vonalak */}
        <g className="stroke-emerald-400 dark:stroke-emerald-500" strokeWidth="1.5" strokeDasharray="4 4">
          <line x1="150" y1="260" x2="150" y2="210" />
          <line x1="60" y1="210" x2="150" y2="210" />

          <line x1="240" y1="260" x2="240" y2="160" />
          <line x1="60" y1="160" x2="240" y2="160" />

          <line x1="330" y1="260" x2="330" y2="110" />
          <line x1="60" y1="110" x2="330" y2="110" />
        </g>

        {/* Egyenes vonala: (60, 260) -> (450, 43.3) */}
        <line
          x1="60"
          y1="260"
          x2="450"
          y2="43.3"
          stroke="url(#directLineGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Pontok kiemelése */}
        <circle cx="60" cy="260" r="4.5" className="fill-emerald-600 stroke-white dark:stroke-slate-900" strokeWidth="2" />
        <circle cx="150" cy="210" r="5" className="fill-emerald-600 stroke-white dark:stroke-slate-900" strokeWidth="2" />
        <circle cx="240" cy="160" r="5" className="fill-emerald-600 stroke-white dark:stroke-slate-900" strokeWidth="2" />
        <circle cx="330" cy="110" r="5" className="fill-emerald-600 stroke-white dark:stroke-slate-900" strokeWidth="2" />

        {/* Szabály felirat badge */}
        <rect
          x="230"
          y="24"
          width="240"
          height="48"
          rx="12"
          className="fill-white/95 dark:fill-slate-900/95 stroke-emerald-300 dark:stroke-emerald-700 shadow-sm"
          strokeWidth="1.5"
        />
        <text x="350" y="44" textAnchor="middle" className="fill-emerald-800 dark:fill-emerald-300 font-extrabold text-[12px]">
          y = k · x &nbsp;(Hányados: y / x = k)
        </text>
        <text x="350" y="60" textAnchor="middle" className="fill-slate-600 dark:text-slate-400 font-medium text-[10.5px]">
          Ha x megduplázódik ⟹ y is megduplázódik!
        </text>
      </svg>
      <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
        1. ábra: Az egyenes arányosság grafikonja az origóból induló egyenes vonal.
      </span>
    </div>
  );
};

/**
 * Fordított arányosság grafikonja (matematikailag pontos hiperbola ág az I. síknegyedben és állandó területek)
 */
export const InverseProportionalitySvg: React.FC<{ size?: number; className?: string }> = ({
  size,
  className = ''
}) => {
  const [selectedArea, setSelectedArea] = React.useState<'all' | '1' | '2' | '3'>('all');

  // Matematikailag pontos hiperbola pontok: y = 8 / x (k = 8)
  // Origó: X0 = 65, Y0 = 265
  // Skála X: 48 px / egység (x: 0.85 -> 8.5)
  // Skála Y: 26 px / egység (y: 8 / x)
  const curvePoints: string[] = [];
  for (let x = 0.84; x <= 8.5; x += 0.08) {
    const px = (65 + x * 48).toFixed(1);
    const py = (265 - (8 / x) * 26).toFixed(1);
    curvePoints.push(`${px},${py}`);
  }
  const hyperbolaPath = `M ${curvePoints.join(' L ')}`;

  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      {/* Interaktív területválasztó fülek */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-2.5">
        <button
          type="button"
          onClick={() => setSelectedArea('all')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            selectedArea === 'all'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Mindhárom terület (T = 8)
        </button>
        <button
          type="button"
          onClick={() => setSelectedArea('1')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            selectedArea === '1'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100'
          }`}
        >
          1. téglalap: 1 × 8
        </button>
        <button
          type="button"
          onClick={() => setSelectedArea('2')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            selectedArea === '2'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100'
          }`}
        >
          2. téglalap: 2 × 4
        </button>
        <button
          type="button"
          onClick={() => setSelectedArea('3')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            selectedArea === '3'
              ? 'bg-cyan-600 text-white shadow-xs'
              : 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100'
          }`}
        >
          3. téglalap: 4 × 2
        </button>
      </div>

      <svg
        viewBox="0 0 520 330"
        style={size ? { width: size, height: (size * 330) / 520 } : { width: '100%', maxWidth: 520, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        <defs>
          <linearGradient id="hyperbolaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id="hyperbolaGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#3b82f6" floodOpacity="0.3" />
          </filter>
          <marker id="invArrowHead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-slate-600 dark:fill-slate-400" />
          </marker>
        </defs>

        {/* Háttér kártya */}
        <rect
          x="8"
          y="8"
          width="504"
          height="314"
          rx="20"
          className="fill-slate-50/60 dark:fill-slate-900/40 stroke-indigo-100 dark:stroke-indigo-900/40"
          strokeWidth="1.5"
        />

        {/* Finom koordináta-háló (grid) */}
        <g className="stroke-slate-200/80 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="3 3">
          {/* Vízszintes hálóvonalak: y = 8 (57px), y = 4 (161px), y = 2 (213px), y = 1 (239px) */}
          <line x1="65" y1="57" x2="480" y2="57" />
          <line x1="65" y1="161" x2="480" y2="161" />
          <line x1="65" y1="213" x2="480" y2="213" />
          <line x1="65" y1="239" x2="480" y2="239" />

          {/* Függőleges hálóvonalak: x = 1 (113px), x = 2 (161px), x = 4 (257px), x = 8 (449px) */}
          <line x1="113" y1="35" x2="113" y2="265" />
          <line x1="161" y1="35" x2="161" y2="265" />
          <line x1="257" y1="35" x2="257" y2="265" />
          <line x1="449" y1="35" x2="449" y2="265" />
        </g>

        {/* 1. téglalap: 1 x 8 (T = 8) */}
        {(selectedArea === 'all' || selectedArea === '1') && (
          <g className="transition-all duration-300">
            <rect
              x="65"
              y="57"
              width="48"
              height="208"
              rx="4"
              fill="rgba(147, 51, 234, 0.14)"
              stroke="#9333ea"
              strokeWidth={selectedArea === '1' ? '2.5' : '1.5'}
              strokeDasharray={selectedArea === '1' ? 'none' : '4 3'}
            />
            <rect x="70" y="145" width="38" height="32" rx="4" fill="white" className="dark:fill-slate-850" />
            <text x="89" y="158" textAnchor="middle" fill="#7e22ce" fontWeight="bold" fontSize="9.5">
              T₁ = 8
            </text>
            <text x="89" y="170" textAnchor="middle" fill="#6b21a8" fontSize="8.5" fontFamily="monospace">
              1 · 8
            </text>
          </g>
        )}

        {/* 2. téglalap: 2 x 4 (T = 8) */}
        {(selectedArea === 'all' || selectedArea === '2') && (
          <g className="transition-all duration-300">
            <rect
              x="65"
              y="161"
              width="96"
              height="104"
              rx="4"
              fill="rgba(37, 99, 235, 0.14)"
              stroke="#2563eb"
              strokeWidth={selectedArea === '2' ? '2.5' : '1.5'}
              strokeDasharray={selectedArea === '2' ? 'none' : '4 3'}
            />
            <rect x="117" y="198" width="40" height="32" rx="4" fill="white" className="dark:fill-slate-850" />
            <text x="137" y="211" textAnchor="middle" fill="#1d4ed8" fontWeight="bold" fontSize="9.5">
              T₂ = 8
            </text>
            <text x="137" y="223" textAnchor="middle" fill="#1e40af" fontSize="8.5" fontFamily="monospace">
              2 · 4
            </text>
          </g>
        )}

        {/* 3. téglalap: 4 x 2 (T = 8) */}
        {(selectedArea === 'all' || selectedArea === '3') && (
          <g className="transition-all duration-300">
            <rect
              x="65"
              y="213"
              width="192"
              height="52"
              rx="4"
              fill="rgba(8, 145, 178, 0.14)"
              stroke="#0891b2"
              strokeWidth={selectedArea === '3' ? '2.5' : '1.5'}
              strokeDasharray={selectedArea === '3' ? 'none' : '4 3'}
            />
            <rect x="180" y="226" width="40" height="32" rx="4" fill="white" className="dark:fill-slate-850" />
            <text x="200" y="239" textAnchor="middle" fill="#0e7490" fontWeight="bold" fontSize="9.5">
              T₃ = 8
            </text>
            <text x="200" y="251" textAnchor="middle" fill="#155e75" fontSize="8.5" fontFamily="monospace">
              4 · 2
            </text>
          </g>
        )}

        {/* Főtengelyek */}
        {/* X tengely */}
        <line
          x1="50"
          y1="265"
          x2="495"
          y2="265"
          className="stroke-slate-700 dark:stroke-slate-200"
          strokeWidth="2.5"
          markerEnd="url(#invArrowHead)"
        />
        {/* Y tengely */}
        <line
          x1="65"
          y1="280"
          x2="65"
          y2="22"
          className="stroke-slate-700 dark:stroke-slate-200"
          strokeWidth="2.5"
          markerEnd="url(#invArrowHead)"
        />

        {/* Tengelyfeliratok */}
        <text x="495" y="284" className="fill-slate-700 dark:fill-slate-200 font-extrabold text-[11.5px]" textAnchor="end">
          x (sebesség, munkások…)
        </text>
        <text x="55" y="24" className="fill-slate-700 dark:fill-slate-200 font-extrabold text-[11.5px]" textAnchor="end">
          y (idő…)
        </text>
        <text x="54" y="278" className="fill-slate-500 font-mono text-xs font-bold">
          0
        </text>

        {/* Beosztások X tengelyen: tick lines és számok */}
        <line x1="113" y1="262" x2="113" y2="268" stroke="#334155" strokeWidth="2" />
        <text x="113" y="282" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300 font-mono text-xs font-bold">
          1
        </text>

        <line x1="161" y1="262" x2="161" y2="268" stroke="#334155" strokeWidth="2" />
        <text x="161" y="282" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300 font-mono text-xs font-bold">
          2
        </text>

        <line x1="257" y1="262" x2="257" y2="268" stroke="#334155" strokeWidth="2" />
        <text x="257" y="282" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300 font-mono text-xs font-bold">
          4
        </text>

        <line x1="449" y1="262" x2="449" y2="268" stroke="#334155" strokeWidth="2" />
        <text x="449" y="282" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300 font-mono text-xs font-bold">
          8
        </text>

        {/* Beosztások Y tengelyen: tick lines és számok */}
        <line x1="62" y1="57" x2="68" y2="57" stroke="#334155" strokeWidth="2" />
        <text x="55" y="61" textAnchor="end" className="fill-slate-600 dark:fill-slate-300 font-mono text-xs font-bold">
          8
        </text>

        <line x1="62" y1="161" x2="68" y2="161" stroke="#334155" strokeWidth="2" />
        <text x="55" y="165" textAnchor="end" className="fill-slate-600 dark:fill-slate-300 font-mono text-xs font-bold">
          4
        </text>

        <line x1="62" y1="213" x2="68" y2="213" stroke="#334155" strokeWidth="2" />
        <text x="55" y="217" textAnchor="end" className="fill-slate-600 dark:fill-slate-300 font-mono text-xs font-bold">
          2
        </text>

        <line x1="62" y1="239" x2="68" y2="239" stroke="#334155" strokeWidth="2" />
        <text x="55" y="243" textAnchor="end" className="fill-slate-600 dark:fill-slate-300 font-mono text-xs font-bold">
          1
        </text>

        {/* A TÖKÉLETES MATEMATIKAI HIPERBOLA GÖRBE */}
        <path
          d={hyperbolaPath}
          fill="none"
          stroke="url(#hyperbolaGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#hyperbolaGlow)"
        />

        {/* Kiemelt pontok és koordináta címkék a görbén */}
        {/* Pont A(1; 8) */}
        <circle cx="113" cy="57" r="5.5" fill="#7e22ce" stroke="#ffffff" strokeWidth="2.5" />
        <g transform="translate(120, 52)">
          <rect x="-2" y="-12" width="46" height="18" rx="5" fill="#f3e8ff" stroke="#c084fc" strokeWidth="1" />
          <text x="21" y="0" textAnchor="middle" fill="#6b21a8" fontWeight="bold" fontSize="10.5" fontFamily="monospace">
            (1; 8)
          </text>
        </g>

        {/* Pont B(2; 4) */}
        <circle cx="161" cy="161" r="5.5" fill="#1d4ed8" stroke="#ffffff" strokeWidth="2.5" />
        <g transform="translate(168, 155)">
          <rect x="-2" y="-12" width="46" height="18" rx="5" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
          <text x="21" y="0" textAnchor="middle" fill="#1e40af" fontWeight="bold" fontSize="10.5" fontFamily="monospace">
            (2; 4)
          </text>
        </g>

        {/* Pont C(4; 2) */}
        <circle cx="257" cy="213" r="5.5" fill="#0891b2" stroke="#ffffff" strokeWidth="2.5" />
        <g transform="translate(264, 203)">
          <rect x="-2" y="-12" width="46" height="18" rx="5" fill="#cffafe" stroke="#67e8f9" strokeWidth="1" />
          <text x="21" y="0" textAnchor="middle" fill="#155e75" fontWeight="bold" fontSize="10.5" fontFamily="monospace">
            (4; 2)
          </text>
        </g>

        {/* Pont D(8; 1) */}
        <circle cx="449" cy="239" r="5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
        <g transform="translate(430, 222)">
          <rect x="-2" y="-12" width="46" height="18" rx="5" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="1" />
          <text x="21" y="0" textAnchor="middle" fill="#0369a1" fontWeight="bold" fontSize="10" fontFamily="monospace">
            (8; 1)
          </text>
        </g>

        {/* Szabály kártya felül a jobb oldalon */}
        <g transform="translate(255, 20)">
          <rect
            x="0"
            y="0"
            width="240"
            height="62"
            rx="12"
            fill="white"
            className="dark:fill-slate-850 stroke-indigo-200 dark:stroke-indigo-800 shadow-sm"
            strokeWidth="1.5"
          />
          <text x="120" y="20" textAnchor="middle" fill="#1e1b4b" className="dark:fill-indigo-200" fontWeight="extrabold" fontSize="12.5">
            x · y = 8 &nbsp;⟺&nbsp; y = 8 / x
          </text>
          <text x="120" y="37" textAnchor="middle" fill="#4338ca" className="dark:fill-indigo-300" fontWeight="bold" fontSize="11">
            Hiperbola görbe (I. síknegyed)
          </text>
          <text x="120" y="52" textAnchor="middle" fill="#64748b" className="dark:fill-slate-400" fontSize="10">
            A tengelyeket nem éri el (aszimptoták)!
          </text>
        </g>
      </svg>

      <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium text-center">
        2. ábra: A fordított arányosság görbéje egy hiperbola. A pontok alatti téglalapok területe mind $T = x \cdot y = 8$!
      </span>
    </div>
  );
};


/**
 * Aránypárok és Keresztszorzat alaptétele (a : b = c : d ⟺ a · d = b · c)
 */
export const ProportionsBalanceSvg: React.FC<{ size?: number; className?: string }> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 520 220"
        style={size ? { width: size, height: (size * 220) / 520 } : { width: '100%', maxWidth: 520, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        <defs>
          <linearGradient id="crossGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="crossGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Kártya keret */}
        <rect
          x="10"
          y="10"
          width="500"
          height="200"
          rx="18"
          className="fill-slate-50/70 dark:fill-slate-900/80 stroke-slate-200 dark:stroke-slate-800"
          strokeWidth="1.5"
        />

        {/* Címke felül */}
        <text x="260" y="36" textAnchor="middle" className="fill-slate-700 dark:fill-slate-200 font-black text-sm uppercase tracking-wider">
          Az Aránypárok Alaptétele (Keresztszorzat)
        </text>

        {/* Bal oldali tört (a / b) */}
        <g transform="translate(130, 95)">
          <rect x="-35" y="-35" width="70" height="70" rx="14" className="fill-emerald-100/70 dark:fill-emerald-950/60 stroke-emerald-500" strokeWidth="2" />
          <text x="0" y="-10" textAnchor="middle" className="fill-emerald-800 dark:fill-emerald-200 font-mono font-black text-2xl">a</text>
          <line x1="-25" y1="2" x2="25" y2="2" className="stroke-slate-500 dark:stroke-slate-400" strokeWidth="2.5" />
          <text x="0" y="24" textAnchor="middle" className="fill-amber-800 dark:fill-amber-200 font-mono font-black text-2xl">b</text>
        </g>

        {/* Egyenlőségjel */}
        <text x="260" y="105" textAnchor="middle" className="fill-slate-800 dark:fill-slate-100 font-mono font-black text-3xl">=</text>

        {/* Jobb oldali tört (c / d) */}
        <g transform="translate(390, 95)">
          <rect x="-35" y="-35" width="70" height="70" rx="14" className="fill-amber-100/70 dark:fill-amber-950/60 stroke-amber-500" strokeWidth="2" />
          <text x="0" y="-10" textAnchor="middle" className="fill-amber-800 dark:fill-amber-200 font-mono font-black text-2xl">c</text>
          <line x1="-25" y1="2" x2="25" y2="2" className="stroke-slate-500 dark:stroke-slate-400" strokeWidth="2.5" />
          <text x="0" y="24" textAnchor="middle" className="fill-emerald-800 dark:fill-emerald-200 font-mono font-black text-2xl">d</text>
        </g>

        {/* Keresztszorzó nyilak */}
        <path d="M 160,80 Q 260,100 360,118" fill="none" stroke="url(#crossGrad1)" strokeWidth="2.5" strokeDasharray="5 3" />
        <path d="M 160,118 Q 260,100 360,80" fill="none" stroke="url(#crossGrad2)" strokeWidth="2.5" strokeDasharray="5 3" />

        {/* Alsó egyenlet és szabály */}
        <rect
          x="80"
          y="155"
          width="360"
          height="40"
          rx="10"
          className="fill-white dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-700 shadow-2xs"
          strokeWidth="1.5"
        />
        <text x="260" y="180" textAnchor="middle" className="font-mono text-sm sm:text-base">
          <tspan className="fill-emerald-600 dark:fill-emerald-400 font-black">a · d</tspan>
          <tspan className="fill-slate-700 dark:fill-slate-200 font-bold"> (külső tagok) = </tspan>
          <tspan className="fill-amber-600 dark:fill-amber-400 font-black">b · c</tspan>
          <tspan className="fill-slate-700 dark:fill-slate-200 font-bold"> (belső tagok)</tspan>
        </text>
      </svg>
      <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
        3. ábra: Az aránypár alaptétele: a külső tagok szorzata egyenlő a belső tagok szorzatával.
      </span>
    </div>
  );
};

/**
 * Hármasszabály táblázat és egységre következtetés ábra
 */
export const UnitaryMethodTableSvg: React.FC<{ size?: number; className?: string }> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 520 230"
        style={size ? { width: size, height: (size * 230) / 520 } : { width: '100%', maxWidth: 520, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        <defs>
          <marker id="stepArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" className="fill-emerald-600 dark:fill-emerald-400" />
          </marker>
        </defs>

        {/* Kártya keret */}
        <rect
          x="10"
          y="10"
          width="500"
          height="210"
          rx="18"
          className="fill-teal-50/40 dark:fill-teal-950/20 stroke-teal-200 dark:stroke-teal-800/60"
          strokeWidth="1.5"
        />

        {/* Címke */}
        <text x="260" y="34" textAnchor="middle" className="fill-teal-900 dark:fill-teal-200 font-black text-xs sm:text-sm uppercase tracking-wider">
          A Hármasszabály Lépései: Egységre Következtetés
        </text>

        {/* Táblázat oszlopok */}
        {/* Bal oszlop (Mennyiség 1, pl. Súly kg) */}
        <rect x="80" y="55" width="160" height="145" rx="12" className="fill-white dark:fill-slate-800 stroke-slate-200 dark:stroke-slate-700" strokeWidth="1.5" />
        <rect x="80" y="55" width="160" height="36" rx="12" className="fill-teal-100/70 dark:fill-teal-950/60 stroke-slate-200 dark:stroke-slate-700" strokeWidth="1.5" />
        <text x="160" y="78" textAnchor="middle" className="fill-teal-900 dark:fill-teal-200 font-extrabold text-xs">Mennyiség A (pl. kg)</text>

        <text x="160" y="115" textAnchor="middle" className="fill-slate-800 dark:fill-slate-100 font-mono font-bold text-sm">3 kg</text>
        <line x1="95" y1="126" x2="225" y2="126" className="stroke-slate-100 dark:stroke-slate-700" strokeWidth="1" />
        <text x="160" y="148" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-mono font-black text-sm">1 kg (egység)</text>
        <line x1="95" y1="160" x2="225" y2="160" className="stroke-slate-100 dark:stroke-slate-700" strokeWidth="1" />
        <text x="160" y="184" textAnchor="middle" className="fill-slate-800 dark:fill-slate-100 font-mono font-bold text-sm">5 kg</text>

        {/* Jobb oszlop (Mennyiség 2, pl. Ár Ft) */}
        <rect x="280" y="55" width="160" height="145" rx="12" className="fill-white dark:fill-slate-800 stroke-slate-200 dark:stroke-slate-700" strokeWidth="1.5" />
        <rect x="280" y="55" width="160" height="36" rx="12" className="fill-cyan-100/70 dark:fill-cyan-950/60 stroke-slate-200 dark:stroke-slate-700" strokeWidth="1.5" />
        <text x="360" y="78" textAnchor="middle" className="fill-cyan-900 dark:fill-cyan-200 font-extrabold text-xs">Mennyiség B (pl. Ft)</text>

        <text x="360" y="115" textAnchor="middle" className="fill-slate-800 dark:fill-slate-100 font-mono font-bold text-sm">1200 Ft</text>
        <line x1="295" y1="126" x2="425" y2="126" className="stroke-slate-100 dark:stroke-slate-700" strokeWidth="1" />
        <text x="360" y="148" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-mono font-black text-sm">400 Ft (egységár)</text>
        <line x1="295" y1="160" x2="425" y2="160" className="stroke-slate-100 dark:stroke-slate-700" strokeWidth="1" />
        <text x="360" y="184" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-300 font-mono font-black text-sm">2000 Ft (?)</text>

        {/* Nyilak bal és jobb oldalon */}
        {/* Bal nyíl 1: :3 */}
        <path d="M 68,110 Q 50,130 68,145" fill="none" className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="1.5" markerEnd="url(#stepArrow)" />
        <text x="44" y="132" className="fill-emerald-700 dark:fill-emerald-300 font-mono text-[10px] font-bold">: 3</text>

        {/* Bal nyíl 2: ·5 */}
        <path d="M 68,150 Q 50,166 68,182" fill="none" className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="1.5" markerEnd="url(#stepArrow)" />
        <text x="44" y="170" className="fill-emerald-700 dark:fill-emerald-300 font-mono text-[10px] font-bold">· 5</text>

        {/* Jobb nyíl 1: :3 */}
        <path d="M 452,110 Q 470,130 452,145" fill="none" className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="1.5" markerEnd="url(#stepArrow)" />
        <text x="474" y="132" className="fill-emerald-700 dark:fill-emerald-300 font-mono text-[10px] font-bold">: 3</text>

        {/* Jobb nyíl 2: ·5 */}
        <path d="M 452,150 Q 470,166 452,182" fill="none" className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="1.5" markerEnd="url(#stepArrow)" />
        <text x="474" y="170" className="fill-emerald-700 dark:fill-emerald-300 font-mono text-[10px] font-bold">· 5</text>
      </svg>
      <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
        4. ábra: Hármasszabály lépései: Előbb 1 egységre osztunk, majd a keresett darabszámmal szorzunk.
      </span>
    </div>
  );
};
