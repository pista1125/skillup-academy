import React from 'react';

// 1. Egységnégyzet és lefedés ábra
export const UnitSquareAreaSvg: React.FC = () => (
  <svg viewBox="0 0 420 135" className="w-full max-w-[420px] h-auto select-none">
    <defs>
      <marker id="poly-arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 1 L 9 5 L 0 9 z" fill="#10b981" />
      </marker>
      <marker id="poly-arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 1 L 9 5 L 0 9 z" fill="#3b82f6" />
      </marker>
    </defs>

    {/* Bal oldal: 1 egységnégyzet */}
    <g transform="translate(25, 20)">
      <rect x="0" y="0" width="55" height="55" rx="4" fill="#10b98125" stroke="#10b981" strokeWidth="2" />
      <text x="27.5" y="-6" textAnchor="middle" fill="currentColor" className="text-slate-600 dark:text-slate-400 text-[11px] font-bold">1 cm</text>
      <text x="63" y="32" textAnchor="start" fill="currentColor" className="text-slate-600 dark:text-slate-400 text-[11px] font-bold">1 cm</text>
      <text x="27.5" y="32" textAnchor="middle" fill="currentColor" className="text-emerald-700 dark:text-emerald-300 text-xs font-black">1 cm²</text>
      <text x="27.5" y="75" textAnchor="middle" fill="currentColor" className="text-slate-700 dark:text-slate-300 text-[11px] font-bold">Egységnégyzet</text>
    </g>

    {/* Nyíl a két ábra között */}
    <g transform="translate(108, 50)">
      <line x1="0" y1="0" x2="35" y2="0" stroke="#10b981" strokeWidth="2" markerEnd="url(#poly-arrow-green)" />
      <text x="17.5" y="-8" textAnchor="middle" fill="currentColor" className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">Lefedés</text>
      <text x="17.5" y="15" textAnchor="middle" fill="currentColor" className="text-slate-500 dark:text-slate-400 text-[10px]">12 darab</text>
    </g>

    {/* Jobb oldal: 4x3-as téglalap rács (12 db egységnégyzet) */}
    <g transform="translate(165, 12)">
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => {
          const num = row * 4 + col + 1;
          return (
            <g key={`cell-${row}-${col}`}>
              <rect
                x={col * 45}
                y={row * 28}
                width="45"
                height="28"
                fill="#10b98115"
                stroke="#10b981"
                strokeWidth="1.2"
              />
              <text
                x={col * 45 + 22.5}
                y={row * 28 + 17}
                textAnchor="middle"
                fill="currentColor"
                className="text-emerald-800/80 dark:text-emerald-300/80 text-[10px] font-mono font-bold"
              >
                {num}
              </text>
            </g>
          );
        })
      )}

      {/* Méretjelölések */}
      <line x1="0" y1="94" x2="180" y2="94" stroke="#3b82f6" strokeWidth="1.5" markerStart="url(#poly-arrow-blue)" markerEnd="url(#poly-arrow-blue)" />
      <text x="90" y="108" textAnchor="middle" fill="currentColor" className="text-blue-600 dark:text-blue-400 text-[11px] font-bold font-mono">
        alap = 4 cm (4 oszlop)
      </text>

      <line x1="192" y1="0" x2="192" y2="84" stroke="#3b82f6" strokeWidth="1.5" markerStart="url(#poly-arrow-blue)" markerEnd="url(#poly-arrow-blue)" />
      <text x="200" y="46" textAnchor="start" fill="currentColor" className="text-blue-600 dark:text-blue-400 text-[11px] font-bold font-mono">
        3 cm (3 sor)
      </text>
    </g>
  </svg>
);

// 2. Négyzet területe ábra
export const SquareAreaSvg: React.FC = () => (
  <svg viewBox="0 0 220 135" className="w-full max-w-[220px] h-auto select-none">
    <defs>
      <marker id="poly-sq-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 1 L 9 5 L 0 9 z" fill="#10b981" />
      </marker>
    </defs>
    <g transform="translate(45, 12)">
      {/* Négyzet 85x85 */}
      <rect x="0" y="0" width="85" height="85" rx="3" fill="#10b98120" stroke="#10b981" strokeWidth="2.5" />
      
      {/* 3x3 belső rács halványan */}
      <line x1="28.3" y1="0" x2="28.3" y2="85" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2" opacity="0.35" />
      <line x1="56.6" y1="0" x2="56.6" y2="85" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2" opacity="0.35" />
      <line x1="0" y1="28.3" x2="85" y2="28.3" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2" opacity="0.35" />
      <line x1="0" y1="56.6" x2="85" y2="56.6" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2" opacity="0.35" />

      {/* Derékszög jel bal lent (magyar szabvány: negyedkörív + pont) */}
      <path d="M 0 70 A 15 15 0 0 1 15 85" fill="none" stroke="#10b981" strokeWidth="1.5" />
      <circle cx="5.5" cy="79.5" r="1.5" fill="#10b981" />

      {/* Oldalcímkék */}
      <text x="42.5" y="-6" textAnchor="middle" fill="currentColor" className="text-slate-700 dark:text-slate-300 text-xs font-bold">a</text>
      <text x="96" y="46" textAnchor="start" fill="currentColor" className="text-slate-700 dark:text-slate-300 text-xs font-bold">a</text>
      <text x="-10" y="46" textAnchor="end" fill="currentColor" className="text-slate-700 dark:text-slate-300 text-xs font-bold">a</text>

      {/* Alsó méretjelző */}
      <line x1="0" y1="96" x2="85" y2="96" stroke="#10b981" strokeWidth="1.5" markerStart="url(#poly-sq-arrow)" markerEnd="url(#poly-sq-arrow)" />
      <text x="42.5" y="111" textAnchor="middle" fill="currentColor" className="text-emerald-700 dark:text-emerald-300 text-[11px] font-bold font-mono">oldal = a</text>

      {/* Középső felirat kártya */}
      <rect x="18" y="30" width="50" height="24" rx="6" fill="#ffffff" className="dark:fill-slate-900" stroke="#10b981" strokeWidth="1" />
      <text x="43" y="46" textAnchor="middle" fill="currentColor" className="text-emerald-800 dark:text-emerald-300 text-xs font-black font-mono">T = a²</text>
    </g>
  </svg>
);

// 3. Téglalap területe ábra
export const RectangleAreaSvg: React.FC = () => (
  <svg viewBox="0 0 240 135" className="w-full max-w-[240px] h-auto select-none">
    <defs>
      <marker id="poly-rect-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 1 L 9 5 L 0 9 z" fill="#0d9488" />
      </marker>
    </defs>
    <g transform="translate(30, 15)">
      {/* Téglalap 130x70 */}
      <rect x="0" y="0" width="130" height="70" rx="3" fill="#0d948820" stroke="#0d9488" strokeWidth="2.5" />
      {/* 4x2 belső rács */}
      <line x1="32.5" y1="0" x2="32.5" y2="70" stroke="#0d9488" strokeWidth="1" strokeDasharray="2,2" opacity="0.35" />
      <line x1="65" y1="0" x2="65" y2="70" stroke="#0d9488" strokeWidth="1" strokeDasharray="2,2" opacity="0.35" />
      <line x1="97.5" y1="0" x2="97.5" y2="70" stroke="#0d9488" strokeWidth="1" strokeDasharray="2,2" opacity="0.35" />
      <line x1="0" y1="35" x2="130" y2="35" stroke="#0d9488" strokeWidth="1" strokeDasharray="2,2" opacity="0.35" />

      {/* Derékszög jel bal lent (magyar szabvány: negyedkörív + pont) */}
      <path d="M 0 55 A 15 15 0 0 1 15 70" fill="none" stroke="#0d9488" strokeWidth="1.5" />
      <circle cx="5.5" cy="64.5" r="1.5" fill="#0d9488" />

      {/* Oldalcímkék */}
      <text x="65" y="-6" textAnchor="middle" fill="currentColor" className="text-slate-700 dark:text-slate-300 text-xs font-bold">a (hosszúság)</text>
      <text x="142" y="39" textAnchor="start" fill="currentColor" className="text-slate-700 dark:text-slate-300 text-xs font-bold">b</text>

      {/* Alsó méretjelző */}
      <line x1="0" y1="82" x2="130" y2="82" stroke="#0d9488" strokeWidth="1.5" markerStart="url(#poly-rect-arrow)" markerEnd="url(#poly-rect-arrow)" />
      <text x="65" y="96" textAnchor="middle" fill="currentColor" className="text-teal-700 dark:text-teal-300 text-[11px] font-bold font-mono">alap = a</text>

      {/* Jobb oldali méretjelző */}
      <line x1="160" y1="0" x2="160" y2="70" stroke="#0d9488" strokeWidth="1.5" markerStart="url(#poly-rect-arrow)" markerEnd="url(#poly-rect-arrow)" />
      <text x="170" y="38" textAnchor="start" fill="currentColor" className="text-teal-700 dark:text-teal-300 text-[11px] font-bold font-mono">szélesség = b</text>

      {/* Középső felirat */}
      <rect x="35" y="23" width="60" height="24" rx="6" fill="#ffffff" className="dark:fill-slate-900" stroke="#0d9488" strokeWidth="1" />
      <text x="65" y="39" textAnchor="middle" fill="currentColor" className="text-teal-800 dark:text-teal-300 text-xs font-black font-mono">T = a · b</text>
    </g>
  </svg>
);

// 4. Derékszögű háromszög ábra (a téglalap fele)
export const RightTriangleAreaSvg: React.FC = () => (
  <svg viewBox="0 0 260 145" className="w-full max-w-[260px] h-auto select-none">
    <defs>
      <marker id="poly-rt-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 1 L 9 5 L 0 9 z" fill="#3b82f6" />
      </marker>
    </defs>
    <g transform="translate(35, 14)">
      {/* Kiegészítő téglalap másik fele (szaggatott) */}
      <polygon points="0,0 150,0 150,85" fill="#3b82f608" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" />
      <text x="100" y="32" textAnchor="middle" fill="currentColor" className="text-slate-500 dark:text-slate-400 text-[10px] font-medium italic">
        + egybevágó fél
      </text>

      {/* Fő derékszögű háromszög */}
      <polygon points="0,85 150,85 0,0" fill="#3b82f625" stroke="#3b82f6" strokeWidth="2.5" />

      {/* Derékszög jel bal lent (magyar szabvány: negyedkörív + pont) */}
      <path d="M 0 70 A 15 15 0 0 1 15 85" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
      <circle cx="5.5" cy="79.5" r="1.5" fill="#3b82f6" />

      {/* Oldalak */}
      <text x="75" y="103" textAnchor="middle" fill="currentColor" className="text-blue-700 dark:text-blue-400 text-xs font-bold">
        a (alap / befogó)
      </text>
      <text x="-10" y="46" textAnchor="end" fill="currentColor" className="text-blue-700 dark:text-blue-400 text-xs font-bold">
        b (magasság)
      </text>
      <text x="86" y="38" textAnchor="start" fill="currentColor" className="text-slate-600 dark:text-slate-400 text-[10px] font-semibold">
        c (átfogó)
      </text>

      {/* Alsó méretvonal */}
      <line x1="0" y1="89" x2="150" y2="89" stroke="#3b82f6" strokeWidth="1.5" markerStart="url(#poly-rt-arrow)" markerEnd="url(#poly-rt-arrow)" />

      {/* Középső felirat */}
      <rect x="25" y="48" width="70" height="24" rx="6" fill="#ffffff" className="dark:fill-slate-900" stroke="#3b82f6" strokeWidth="1" />
      <text x="60" y="64" textAnchor="middle" fill="currentColor" className="text-blue-800 dark:text-blue-300 text-xs font-black font-mono">
        T = (a · b) / 2
      </text>
    </g>
  </svg>
);

// 5. Általános háromszög és magasságvonal ábra
export const GeneralTriangleAreaSvg: React.FC = () => (
  <svg viewBox="0 0 280 145" className="w-full max-w-[280px] h-auto select-none">
    <defs>
      <marker id="poly-gt-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 1 L 9 5 L 0 9 z" fill="#10b981" />
      </marker>
    </defs>
    <g transform="translate(25, 14)">
      {/* Szaggatott iker-háromszög, amivel paralelogrammát alkot */}
      <polygon points="135,85 240,10 105,10" fill="#10b98108" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" />
      <text x="175" y="32" textAnchor="middle" fill="currentColor" className="text-slate-500 dark:text-slate-400 text-[10px] font-medium italic">
        iker háromszög
      </text>

      {/* Fő háromszög */}
      <polygon points="0,85 135,85 105,10" fill="#10b98125" stroke="#10b981" strokeWidth="2.5" />

      {/* Magasságvonal (ma) */}
      <line x1="105" y1="10" x2="105" y2="85" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,2" />
      {/* Derékszög jel a magasság talppontjánál (magyar szabvány: negyedkörív + pont) */}
      <path d="M 105 71 A 14 14 0 0 1 119 85" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
      <circle cx="110" cy="80" r="1.5" fill="#f59e0b" />
      <text x="113" y="52" textAnchor="start" fill="currentColor" className="text-amber-600 dark:text-amber-400 text-xs font-black font-mono">
        mₐ
      </text>

      {/* Csúcsok */}
      <text x="105" y="2" textAnchor="middle" fill="currentColor" className="text-slate-700 dark:text-slate-300 text-[10px] font-black">C</text>
      <text x="-8" y="94" textAnchor="end" fill="currentColor" className="text-slate-700 dark:text-slate-300 text-[10px] font-black">A</text>
      <text x="144" y="94" textAnchor="start" fill="currentColor" className="text-slate-700 dark:text-slate-300 text-[10px] font-black">B</text>

      {/* Alap 'a' méretvonal */}
      <line x1="0" y1="92" x2="135" y2="92" stroke="#10b981" strokeWidth="1.5" markerStart="url(#poly-gt-arrow)" markerEnd="url(#poly-gt-arrow)" />
      <text x="67" y="107" textAnchor="middle" fill="currentColor" className="text-emerald-700 dark:text-emerald-300 text-xs font-bold font-mono">
        alap = a
      </text>

      {/* Képlet kártya */}
      <rect x="18" y="44" width="75" height="24" rx="6" fill="#ffffff" className="dark:fill-slate-900" stroke="#10b981" strokeWidth="1" />
      <text x="55.5" y="60" textAnchor="middle" fill="currentColor" className="text-emerald-800 dark:text-emerald-300 text-xs font-black font-mono">
        T = (a · mₐ) / 2
      </text>
    </g>
  </svg>
);

// 6. Paralelogramma átdarabolása ábra
export const ParallelogramAreaSvg: React.FC = () => (
  <svg viewBox="0 0 300 150" className="w-full max-w-[300px] h-auto select-none">
    <defs>
      <marker id="poly-para-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 1 L 9 5 L 0 9 z" fill="#6366f1" />
      </marker>
      <marker id="poly-cut-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 1 L 9 5 L 0 9 z" fill="#ec4899" />
      </marker>
    </defs>
    <g transform="translate(25, 22)">
      {/* 1. Bal oldali levágandó háromszög */}
      <polygon points="0,80 40,80 40,10" fill="#ec489920" stroke="#ec4899" strokeWidth="2" strokeDasharray="3,3" />
      <text x="18" y="62" textAnchor="middle" fill="currentColor" className="text-pink-700 dark:fill-pink-300 text-[10px] font-bold">levágás</text>

      {/* 2. Középső trapéz test */}
      <polygon points="40,80 150,80 190,10 40,10" fill="#6366f125" stroke="#6366f1" strokeWidth="2.5" />

      {/* 3. Jobb oldali áthelyezett háromszög */}
      <polygon points="150,80 190,80 190,10" fill="#10b98125" stroke="#10b981" strokeWidth="2" strokeDasharray="3,3" />
      <text x="172" y="62" textAnchor="middle" fill="currentColor" className="text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">beillesztés</text>

      {/* Átdarabolás íves nyíl */}
      <path d="M 25 5 Q 100 -20 170 5" fill="none" stroke="#ec4899" strokeWidth="1.8" strokeDasharray="3,2" markerEnd="url(#poly-cut-arrow)" />
      <text x="100" y="-8" textAnchor="middle" fill="currentColor" className="text-pink-600 dark:text-pink-400 text-[10px] font-bold">átdarabolás téglalappá</text>

      {/* Magasságvonal (ma) */}
      <line x1="40" y1="10" x2="40" y2="80" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,2" />
      <path d="M 40 66 A 14 14 0 0 1 54 80" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
      <circle cx="45" cy="75" r="1.5" fill="#f59e0b" />
      <text x="45" y="48" textAnchor="start" fill="currentColor" className="text-amber-600 dark:text-amber-400 text-xs font-black font-mono">mₐ</text>

      {/* Oldalcímkék */}
      <text x="-8" y="42" textAnchor="end" fill="currentColor" className="text-slate-600 dark:text-slate-400 text-[11px] font-semibold">b (ferde)</text>
      <text x="115" y="3" textAnchor="middle" fill="currentColor" className="text-slate-700 dark:text-slate-300 text-[11px] font-bold">a</text>

      {/* Alsó alap méretvonal */}
      <line x1="0" y1="88" x2="150" y2="88" stroke="#6366f1" strokeWidth="1.5" markerStart="url(#poly-para-arrow)" markerEnd="url(#poly-para-arrow)" />
      <text x="75" y="103" textAnchor="middle" fill="currentColor" className="text-indigo-700 dark:text-indigo-300 text-xs font-bold font-mono">alap = a</text>

      {/* Képlet kártya */}
      <rect x="65" y="32" width="65" height="24" rx="6" fill="#ffffff" className="dark:fill-slate-900" stroke="#6366f1" strokeWidth="1" />
      <text x="97.5" y="48" textAnchor="middle" fill="currentColor" className="text-indigo-800 dark:text-indigo-300 text-xs font-black font-mono">T = a · mₐ</text>
    </g>
  </svg>
);

// 7. Rombusz ábra (merőleges átlók)
export const RhombusAreaSvg: React.FC = () => (
  <svg viewBox="0 0 260 145" className="w-full max-w-[260px] h-auto select-none">
    <g transform="translate(30, 15)">
      {/* Befoglaló téglalap szaggatottan (e x f méretű) */}
      <rect x="0" y="0" width="160" height="90" fill="#8b5cf608" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="4,4" rx="3" />
      <text x="80" y="-5" textAnchor="middle" fill="currentColor" className="text-slate-500 dark:text-slate-400 text-[9px]">e × f befoglaló téglalap fele</text>

      {/* Rombusz alakzat */}
      <polygon points="80,0 160,45 80,90 0,45" fill="#8b5cf625" stroke="#8b5cf6" strokeWidth="2.5" />

      {/* Átlók */}
      <line x1="0" y1="45" x2="160" y2="45" stroke="#0ea5e9" strokeWidth="1.8" strokeDasharray="3,2" />
      <line x1="80" y1="0" x2="80" y2="90" stroke="#0ea5e9" strokeWidth="1.8" strokeDasharray="3,2" />

      {/* Merőleges jel a metszéspontban (magyar szabvány: negyedkörív + pont) */}
      <path d="M 92 45 A 12 12 0 0 1 80 57" fill="none" stroke="#0ea5e9" strokeWidth="1.2" />
      <circle cx="84.5" cy="49.5" r="1.2" fill="#0ea5e9" />

      {/* Átlócímkék */}
      <text x="35" y="40" textAnchor="middle" fill="currentColor" className="text-sky-700 dark:text-sky-300 text-xs font-black font-mono">e</text>
      <text x="88" y="24" textAnchor="start" fill="currentColor" className="text-sky-700 dark:text-sky-300 text-xs font-black font-mono">f</text>

      {/* Oldalhossz jelölés 'a' */}
      <text x="130" y="20" textAnchor="middle" fill="currentColor" className="text-purple-700 dark:text-purple-300 text-[11px] font-bold">a</text>

      {/* Képlet kártya */}
      <rect x="42" y="60" width="76" height="22" rx="5" fill="#ffffff" className="dark:fill-slate-900" stroke="#8b5cf6" strokeWidth="1" />
      <text x="80" y="75" textAnchor="middle" fill="currentColor" className="text-purple-800 dark:text-purple-300 text-[11px] font-black font-mono">T = (e · f) / 2</text>
    </g>
  </svg>
);

// 8. Trapéz területe ábra
export const TrapezoidAreaSvg: React.FC = () => (
  <svg viewBox="0 0 290 145" className="w-full max-w-[290px] h-auto select-none">
    <defs>
      <marker id="poly-trap-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 1 L 9 5 L 0 9 z" fill="#f59e0b" />
      </marker>
    </defs>
    <g transform="translate(25, 18)">
      {/* 2. Megfordított iker trapéz szaggatottan -> együtt paralelogrammát alkotnak */}
      <polygon points="120,80 175,80 205,10 85,10" fill="#f59e0b0a" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" />
      <text x="150" y="48" textAnchor="middle" fill="currentColor" className="text-slate-500 dark:text-slate-400 text-[9px] font-medium italic">
        iker trapéz
      </text>

      {/* 1. Eredeti trapéz */}
      <polygon points="0,80 120,80 85,10 30,10" fill="#f59e0b25" stroke="#f59e0b" strokeWidth="2.5" />

      {/* Magasságvonal */}
      <line x1="30" y1="10" x2="30" y2="80" stroke="#ec4899" strokeWidth="2" strokeDasharray="3,2" />
      <path d="M 30 66 A 14 14 0 0 1 44 80" fill="none" stroke="#ec4899" strokeWidth="1.5" />
      <circle cx="35" cy="75" r="1.5" fill="#ec4899" />
      <text x="24" y="48" textAnchor="end" fill="currentColor" className="text-pink-600 dark:text-pink-400 text-xs font-black font-mono">m</text>

      {/* Alapcímkék */}
      <text x="57" y="4" textAnchor="middle" fill="currentColor" className="text-amber-700 dark:text-amber-300 text-xs font-bold font-mono">c (fedőlap)</text>
      <text x="60" y="96" textAnchor="middle" fill="currentColor" className="text-amber-700 dark:text-amber-300 text-xs font-bold font-mono">a (alap)</text>
      <text x="147" y="96" textAnchor="middle" fill="currentColor" className="text-slate-500 dark:text-slate-400 text-[10px] font-bold font-mono">+ c</text>

      {/* Alsó teljes méretvonal (a + c) */}
      <line x1="0" y1="84" x2="175" y2="84" stroke="#f59e0b" strokeWidth="1.5" markerStart="url(#poly-trap-arrow)" markerEnd="url(#poly-trap-arrow)" />

      {/* Képlet kártya */}
      <rect x="40" y="35" width="85" height="24" rx="6" fill="#ffffff" className="dark:fill-slate-900" stroke="#f59e0b" strokeWidth="1" />
      <text x="82.5" y="51" textAnchor="middle" fill="currentColor" className="text-amber-800 dark:text-amber-300 text-[11px] font-black font-mono">
        T = [(a+c)·m] / 2
      </text>
    </g>
  </svg>
);

// 9. Deltoid területe ábra
export const DeltoidAreaSvg: React.FC = () => (
  <svg viewBox="0 0 250 145" className="w-full max-w-[250px] h-auto select-none">
    <g transform="translate(30, 10)">
      {/* Befoglaló téglalap (e x f méretű) */}
      <rect x="0" y="0" width="130" height="115" fill="#f43f5e08" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="4,4" rx="3" />
      <text x="65" y="-4" textAnchor="middle" fill="currentColor" className="text-slate-500 dark:text-slate-400 text-[9px]">e × f téglalap fele</text>

      {/* Deltoid alakzat */}
      <polygon points="65,0 130,40 65,115 0,40" fill="#f43f5e25" stroke="#f43f5e" strokeWidth="2.5" />

      {/* Átlók */}
      <line x1="0" y1="40" x2="130" y2="40" stroke="#0284c7" strokeWidth="1.8" strokeDasharray="3,2" />
      <line x1="65" y1="0" x2="65" y2="115" stroke="#0284c7" strokeWidth="1.8" strokeDasharray="3,2" />

      {/* Merőleges jel (magyar szabvány: negyedkörív + pont) */}
      <path d="M 77 40 A 12 12 0 0 1 65 52" fill="none" stroke="#0284c7" strokeWidth="1.2" />
      <circle cx="69.5" cy="44.5" r="1.2" fill="#0284c7" />

      {/* Címkék */}
      <text x="73" y="24" textAnchor="start" fill="currentColor" className="text-sky-700 dark:text-sky-300 text-xs font-black font-mono">e</text>
      <text x="25" y="34" textAnchor="middle" fill="currentColor" className="text-sky-700 dark:text-sky-300 text-xs font-black font-mono">f</text>

      {/* Képlet kártya */}
      <rect x="25" y="70" width="80" height="22" rx="5" fill="#ffffff" className="dark:fill-slate-900" stroke="#f43f5e" strokeWidth="1" />
      <text x="65" y="85" textAnchor="middle" fill="currentColor" className="text-rose-800 dark:text-rose-300 text-[11px] font-black font-mono">
        T = (e · f) / 2
      </text>
    </g>
  </svg>
);

// 10. Összetett alakzat: Felbontási módszer (Összeadás)
export const CompoundAdditiveSvg: React.FC = () => (
  <svg viewBox="0 0 250 140" className="w-full max-w-[250px] h-auto select-none">
    <g transform="translate(25, 12)">
      {/* T1 téglalap (bal oszlop) */}
      <rect x="0" y="0" width="55" height="90" rx="2" fill="#10b98125" stroke="#10b981" strokeWidth="2" />
      <text x="27.5" y="44" textAnchor="middle" fill="currentColor" className="text-emerald-800 dark:text-emerald-300 text-xs font-black font-mono">T₁</text>
      <text x="27.5" y="58" textAnchor="middle" fill="currentColor" className="text-emerald-700 dark:text-emerald-400 text-[10px] font-bold font-mono">3 × 6 = 18</text>

      {/* T2 téglalap (jobb alsó rész) */}
      <rect x="55" y="42" width="85" height="48" rx="2" fill="#06b6d425" stroke="#06b6d4" strokeWidth="2" />
      <text x="97.5" y="66" textAnchor="middle" fill="currentColor" className="text-cyan-800 dark:text-cyan-300 text-xs font-black font-mono">T₂</text>
      <text x="97.5" y="80" textAnchor="middle" fill="currentColor" className="text-cyan-700 dark:text-cyan-400 text-[10px] font-bold font-mono">5 × 3 = 15</text>

      {/* Választóvonal (szaggatott) */}
      <line x1="55" y1="42" x2="55" y2="90" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,2" />

      {/* Méretek */}
      <text x="27.5" y="-5" textAnchor="middle" fill="currentColor" className="text-slate-600 dark:text-slate-400 text-[10px] font-bold">3 m</text>
      <text x="-8" y="48" textAnchor="end" fill="currentColor" className="text-slate-600 dark:text-slate-400 text-[10px] font-bold">6 m</text>
      <text x="97.5" y="37" textAnchor="middle" fill="currentColor" className="text-slate-600 dark:text-slate-400 text-[10px] font-bold">5 m</text>
      <text x="146" y="68" textAnchor="start" fill="currentColor" className="text-slate-600 dark:text-slate-400 text-[10px] font-bold">3 m</text>

      {/* Összegző badge */}
      <rect x="15" y="100" width="110" height="20" rx="4" fill="#ffffff" className="dark:fill-slate-900" stroke="#10b981" strokeWidth="1" />
      <text x="70" y="114" textAnchor="middle" fill="currentColor" className="text-emerald-800 dark:text-emerald-300 text-[11px] font-bold font-mono">
        T = T₁ + T₂ = 33 m²
      </text>
    </g>
  </svg>
);

// 11. Összetett alakzat: Kiegészítési módszer (Kivonás)
export const CompoundSubtractiveSvg: React.FC = () => (
  <svg viewBox="0 0 250 140" className="w-full max-w-[250px] h-auto select-none">
    <g transform="translate(25, 12)">
      {/* Nagy téglalap keret */}
      <rect x="0" y="0" width="140" height="90" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" rx="2" />

      {/* L-alakzat (a megmaradó terület) */}
      <path d="M 0 0 L 55 0 L 55 42 L 140 42 L 140 90 L 0 90 Z" fill="#06b6d425" stroke="#06b6d4" strokeWidth="2" />
      <text x="35" y="70" textAnchor="middle" fill="currentColor" className="text-cyan-800 dark:text-cyan-300 text-xs font-black font-mono">T_alakzat</text>

      {/* Kivágott sarok (kivonandó terület) */}
      <rect x="55" y="0" width="85" height="42" fill="#f43f5e15" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3,2" />
      <text x="97.5" y="20" textAnchor="middle" fill="currentColor" className="text-rose-700 dark:text-rose-400 text-[10px] font-bold font-mono">T_kivágott (-)</text>
      <text x="97.5" y="34" textAnchor="middle" fill="currentColor" className="text-rose-600 dark:text-rose-400 text-[9px] font-mono">5 × 3 = 15</text>

      {/* Külső befoglaló méretek */}
      <text x="70" y="-5" textAnchor="middle" fill="currentColor" className="text-slate-600 dark:text-slate-400 text-[10px] font-bold">8 m (teljes szélesség)</text>
      <text x="-8" y="48" textAnchor="end" fill="currentColor" className="text-slate-600 dark:text-slate-400 text-[10px] font-bold">6 m</text>

      {/* Összegző badge */}
      <rect x="10" y="100" width="120" height="20" rx="4" fill="#ffffff" className="dark:fill-slate-900" stroke="#06b6d4" strokeWidth="1" />
      <text x="70" y="114" textAnchor="middle" fill="currentColor" className="text-cyan-800 dark:text-cyan-300 text-[11px] font-bold font-mono">
        T = T_nagy - T_kivágott
      </text>
    </g>
  </svg>
);
