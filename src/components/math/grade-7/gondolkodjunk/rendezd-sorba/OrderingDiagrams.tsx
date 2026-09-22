import React from 'react';

// =========================================================================
// 1. ÁTFOGÓ ELMÉLETI DIAGRAMOK (Theory Diagrams)
// =========================================================================

/**
 * 1. Helykitöltéses Faktoriális Diagram (4! = 4 · 3 · 2 · 1 = 24)
 */
export const FactorialSlotsDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-violet-200/80 dark:border-violet-900/60 shadow-xs ${className || ''}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h4 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-violet-500"></span>
          A Faktoriális és a Sorbarendezési Szabály
        </h4>
        <span className="text-[11px] font-bold text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950 px-2.5 py-0.5 rounded-md border border-violet-200 dark:border-violet-800">
          4 elem sorrendje = 4! = 24 eset
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around gap-6 py-2">
        <svg viewBox="0 0 360 160" className="w-80 sm:w-96 h-auto select-none overflow-visible">
          {/* 4 Position Slots */}
          {[
            { pos: '1. pozíció', count: '4 lehetőség', sub: 'bármelyik a 4-ből', color: '#8b5cf6', bg: '#f5f3ff' },
            { pos: '2. pozíció', count: '3 lehetőség', sub: 'maradék 3-ból', color: '#6366f1', bg: '#eef2ff' },
            { pos: '3. pozíció', count: '2 lehetőség', sub: 'maradék 2-ből', color: '#3b82f6', bg: '#eff6ff' },
            { pos: '4. pozíció', count: '1 lehetőség', sub: 'utolsó megmaradt', color: '#10b981', bg: '#ecfdf5' }
          ].map((slot, idx) => (
            <g key={idx}>
              {/* Box */}
              <rect
                x={15 + idx * 85}
                y={30}
                width={75}
                height={90}
                rx={12}
                fill={slot.bg}
                stroke={slot.color}
                strokeWidth={2}
                className="dark:fill-slate-800"
              />
              {/* Position Header */}
              <text
                x={52.5 + idx * 85}
                y={48}
                textAnchor="middle"
                className="text-[10px] font-bold fill-slate-500 dark:fill-slate-400"
              >
                {slot.pos}
              </text>
              {/* Main Number */}
              <text
                x={52.5 + idx * 85}
                y={84}
                textAnchor="middle"
                fill={slot.color}
                className="text-2xl font-mono font-black"
              >
                {4 - idx}
              </text>
              {/* Subtext */}
              <text
                x={52.5 + idx * 85}
                y={106}
                textAnchor="middle"
                className="text-[8.5px] font-medium fill-slate-600 dark:fill-slate-300"
              >
                {slot.sub}
              </text>

              {/* Multiplication symbol between boxes */}
              {idx < 3 && (
                <text
                  x={95 + idx * 85}
                  y={82}
                  textAnchor="middle"
                  className="text-xl font-black fill-slate-400"
                >
                  ·
                </text>
              )}
            </g>
          ))}

          {/* Bottom Result Banner */}
          <rect x="50" y="132" width="260" height="24" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" className="dark:fill-slate-850 dark:stroke-slate-700" />
          <text x="180" y="148" textAnchor="middle" className="text-xs font-mono font-black fill-violet-700 dark:fill-violet-300">
            Összesen = 4 · 3 · 2 · 1 = 4! = 24 sorrend
          </text>
        </svg>

        <div className="space-y-2.5 text-xs max-w-xs">
          <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800">
            <div className="font-bold text-violet-900 dark:text-violet-200">A Faktoriális Képlete:</div>
            <div className="font-mono text-sm font-black text-violet-700 dark:text-violet-300 mt-0.5">
              n! = n · (n - 1) · (n - 2) ··· 1
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
            Ha <strong>n különböző elemet</strong> rendezünk sorba úgy, hogy minden elemet pontosan egyszer használunk fel, a lehetséges sorrendek száma <strong>n!</strong> (n faktoriális).
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * 2. Permutációs Fa Diagram (3 elem: A, B, C -> 6 sorrend)
 */
export const PermutationTreeDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-indigo-200/80 dark:border-indigo-900/60 shadow-xs ${className || ''}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h4 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
          Három elem (A, B, C) Permutációs Fája
        </h4>
        <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800">
          3! = 3 · 2 · 1 = 6 ág
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around gap-6 py-2">
        <svg viewBox="0 0 380 200" className="w-80 sm:w-[400px] h-auto select-none overflow-visible">
          {/* Start Root */}
          <circle cx="25" cy="100" r="12" fill="#6366f1" />
          <text x="25" y="104" textAnchor="middle" className="text-[10px] font-black fill-white">Start</text>

          {/* Level 1: 3 choices (A, B, C) */}
          {/* Node A */}
          <line x1="37" y1="100" x2="110" y2="40" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="110" cy="40" r="11" fill="#3b82f6" />
          <text x="110" y="44" textAnchor="middle" className="text-xs font-black fill-white">A</text>

          {/* Node B */}
          <line x1="37" y1="100" x2="110" y2="100" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="110" cy="100" r="11" fill="#3b82f6" />
          <text x="110" y="104" textAnchor="middle" className="text-xs font-black fill-white">B</text>

          {/* Node C */}
          <line x1="37" y1="100" x2="110" y2="160" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="110" cy="160" r="11" fill="#3b82f6" />
          <text x="110" y="164" textAnchor="middle" className="text-xs font-black fill-white">C</text>

          {/* Level 2: 2 choices each */}
          {/* From A -> B, C */}
          <line x1="121" y1="40" x2="200" y2="25" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="200" cy="25" r="9" fill="#10b981" />
          <text x="200" y="28" textAnchor="middle" className="text-[10px] font-bold fill-white">B</text>

          <line x1="121" y1="40" x2="200" y2="55" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="200" cy="55" r="9" fill="#10b981" />
          <text x="200" y="58" textAnchor="middle" className="text-[10px] font-bold fill-white">C</text>

          {/* From B -> A, C */}
          <line x1="121" y1="100" x2="200" y2="85" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="200" cy="85" r="9" fill="#10b981" />
          <text x="200" y="88" textAnchor="middle" className="text-[10px] font-bold fill-white">A</text>

          <line x1="121" y1="100" x2="200" y2="115" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="200" cy="115" r="9" fill="#10b981" />
          <text x="200" y="118" textAnchor="middle" className="text-[10px] font-bold fill-white">C</text>

          {/* From C -> A, B */}
          <line x1="121" y1="160" x2="200" y2="145" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="200" cy="145" r="9" fill="#10b981" />
          <text x="200" y="148" textAnchor="middle" className="text-[10px] font-bold fill-white">A</text>

          <line x1="121" y1="160" x2="200" y2="175" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="200" cy="175" r="9" fill="#10b981" />
          <text x="200" y="178" textAnchor="middle" className="text-[10px] font-bold fill-white">B</text>

          {/* Level 3 & Outcome Labels */}
          {/* ABC */}
          <line x1="209" y1="25" x2="270" y2="25" stroke="#cbd5e1" strokeWidth="1" />
          <text x="280" y="29" className="text-xs font-mono font-bold fill-slate-800 dark:fill-slate-100">1. (A, B, C)</text>

          {/* ACB */}
          <line x1="209" y1="55" x2="270" y2="55" stroke="#cbd5e1" strokeWidth="1" />
          <text x="280" y="59" className="text-xs font-mono font-bold fill-slate-800 dark:fill-slate-100">2. (A, C, B)</text>

          {/* BAC */}
          <line x1="209" y1="85" x2="270" y2="85" stroke="#cbd5e1" strokeWidth="1" />
          <text x="280" y="89" className="text-xs font-mono font-bold fill-slate-800 dark:fill-slate-100">3. (B, A, C)</text>

          {/* BCA */}
          <line x1="209" y1="115" x2="270" y2="115" stroke="#cbd5e1" strokeWidth="1" />
          <text x="280" y="119" className="text-xs font-mono font-bold fill-slate-800 dark:fill-slate-100">4. (B, C, A)</text>

          {/* CAB */}
          <line x1="209" y1="145" x2="270" y2="145" stroke="#cbd5e1" strokeWidth="1" />
          <text x="280" y="149" className="text-xs font-mono font-bold fill-slate-800 dark:fill-slate-100">5. (C, A, B)</text>

          {/* CBA */}
          <line x1="209" y1="175" x2="270" y2="175" stroke="#cbd5e1" strokeWidth="1" />
          <text x="280" y="179" className="text-xs font-mono font-bold fill-slate-800 dark:fill-slate-100">6. (C, B, A)</text>
        </svg>

        <div className="space-y-2 text-xs max-w-xs">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
            <div className="font-bold text-indigo-900 dark:text-indigo-200">Lexikografikus sorrend:</div>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-1">
              Ha ABC rendben írjuk fel az ágakat: ABC, ACB, BAC, BCA, CAB, CBA. Így biztosan nem marad ki egyetlen lehetőség sem!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 3. Megkötés a 0 számjegyre (0, 3, 5, 8 -> 3-jegyű számok)
 */
export const ZeroConstraintDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-amber-200/80 dark:border-amber-900/60 shadow-xs ${className || ''}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h4 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          Megkötések: A 0 Nem Lehet az Első Számjegy!
        </h4>
        <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950 px-2.5 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
          3 · 3 · 2 = 18 szám
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around gap-6 py-2">
        <svg viewBox="0 0 320 140" className="w-72 sm:w-80 h-auto select-none overflow-visible">
          {/* Slot 1: 100-asok (NEM 0) */}
          <rect x="20" y="20" width="80" height="90" rx="10" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" className="dark:fill-rose-950/40" />
          <text x="60" y="38" textAnchor="middle" className="text-[10px] font-black fill-rose-600">Százasok (1.)</text>
          <text x="60" y="70" textAnchor="middle" className="text-2xl font-mono font-black fill-rose-600">3</text>
          <text x="60" y="90" textAnchor="middle" className="text-[9px] font-bold fill-rose-500">Csak 3, 5, 8</text>
          <text x="60" y="102" textAnchor="middle" className="text-[8px] font-black fill-red-700">(0 nem lehet!)</text>

          {/* Dot */}
          <text x="110" y="70" textAnchor="middle" className="text-xl font-black fill-slate-400">·</text>

          {/* Slot 2: 10-esek (most már lehet 0) */}
          <rect x="120" y="20" width="80" height="90" rx="10" fill="#f0fdf4" stroke="#10b981" strokeWidth="2" className="dark:fill-emerald-950/40" />
          <text x="160" y="38" textAnchor="middle" className="text-[10px] font-black fill-emerald-600">Tízesek (2.)</text>
          <text x="160" y="70" textAnchor="middle" className="text-2xl font-mono font-black fill-emerald-600">3</text>
          <text x="160" y="90" textAnchor="middle" className="text-[9px] font-bold fill-emerald-600">Maradék 3</text>
          <text x="160" y="102" textAnchor="middle" className="text-[8px] font-bold fill-emerald-700">(a 0 is jöhet!)</text>

          {/* Dot */}
          <text x="210" y="70" textAnchor="middle" className="text-xl font-black fill-slate-400">·</text>

          {/* Slot 3: 1-esek */}
          <rect x="220" y="20" width="80" height="90" rx="10" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" className="dark:fill-blue-950/40" />
          <text x="260" y="38" textAnchor="middle" className="text-[10px] font-black fill-blue-600">Egyesek (3.)</text>
          <text x="260" y="70" textAnchor="middle" className="text-2xl font-mono font-black fill-blue-600">2</text>
          <text x="260" y="90" textAnchor="middle" className="text-[9px] font-bold fill-blue-600">Maradék 2</text>
          <text x="260" y="102" textAnchor="middle" className="text-[8px] font-bold fill-blue-700">utolsó jegy</text>

          <text x="160" y="130" textAnchor="middle" className="text-xs font-mono font-bold fill-slate-700 dark:fill-slate-300">
            Összes 3-jegyű szám = 3 · 3 · 2 = 18 szám
          </text>
        </svg>

        <div className="space-y-2 text-xs max-w-xs">
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
            <span className="font-bold text-amber-900 dark:text-amber-200">Gyakori hiba:</span>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-1">
              Ha 4 számjegyből képezünk 3-jegyű számot, 0 nélkül 4 · 3 · 2 = 24 lenne. Mivel a 0 nem lehet az első helyen, az első helyre csak 3 lehetőség van!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 4. Körasztal Köré Ültetés Diagram ((n - 1)!)
 */
export const CirclePermutationDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-teal-200/80 dark:border-teal-900/60 shadow-xs ${className || ''}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h4 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
          Körasztal Köré Ültetés (Forgatási Szimmetria)
        </h4>
        <span className="text-[11px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950 px-2.5 py-0.5 rounded-md border border-teal-200 dark:border-teal-800">
          (n - 1)! = (4 - 1)! = 3! = 6 sorrend
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around gap-6 py-2">
        <svg viewBox="0 0 280 160" className="w-64 sm:w-72 h-auto select-none overflow-visible">
          {/* Round Table */}
          <circle cx="140" cy="80" r="45" fill="#f8fafc" stroke="#0d9488" strokeWidth="2.5" className="dark:fill-slate-800" />
          <text x="140" y="84" textAnchor="middle" className="text-xs font-bold fill-teal-700 dark:fill-teal-300">Körasztal</text>

          {/* Chair 1 (Top) - A */}
          <circle cx="140" cy="22" r="14" fill="#3b82f6" />
          <text x="140" y="26" textAnchor="middle" className="text-xs font-black fill-white">A</text>
          <text x="140" y="6" textAnchor="middle" className="text-[9px] font-black fill-blue-600">1. rögzített</text>

          {/* Chair 2 (Right) - B */}
          <circle cx="198" cy="80" r="14" fill="#10b981" />
          <text x="198" y="84" textAnchor="middle" className="text-xs font-black fill-white">B</text>

          {/* Chair 3 (Bottom) - C */}
          <circle cx="140" cy="138" r="14" fill="#f59e0b" />
          <text x="140" y="142" textAnchor="middle" className="text-xs font-black fill-white">C</text>

          {/* Chair 4 (Left) - D */}
          <circle cx="82" cy="80" r="14" fill="#8b5cf6" />
          <text x="82" y="84" textAnchor="middle" className="text-xs font-black fill-white">D</text>

          {/* Rotation arrow */}
          <path d="M 175 45 A 45 45 0 0 1 175 115" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeDasharray="3 3" />
        </svg>

        <div className="space-y-2 text-xs max-w-xs">
          <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
            <span className="font-bold text-teal-900 dark:text-teal-200">Miért (n - 1)! a képlet?</span>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-1">
              A körasztal elforgatásával ugyanazt a szomszédsági viszonyt kapjuk. Ezért az <strong>1. személyt rögzítjük</strong>, és a maradék <strong>n - 1</strong> embert rendezzük sorba: <strong>(n - 1)!</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 2. DEDIKÁLT KVÍZ ÁBRÁK (OrderingSolverFigure)
// =========================================================================

export type OrderingFigType =
  | 'slots_4'
  | 'slots_3'
  | 'queue'
  | 'books'
  | 'circle'
  | 'digits'
  | 'anagram'
  | 'blocks';

export interface OrderingSolverFigureProps {
  type: OrderingFigType;
  param1?: string | number;
  param2?: string | number;
  className?: string;
}

export const OrderingSolverFigure: React.FC<OrderingSolverFigureProps> = ({
  type,
  param1,
  param2,
  className
}) => {
  switch (type) {
    case 'slots_4':
      return (
        <svg viewBox="0 0 240 70" className={`w-60 sm:w-68 h-auto select-none ${className || ''}`}>
          {[4, 3, 2, 1].map((val, idx) => (
            <g key={idx}>
              <rect x={15 + idx * 55} y="10" width="45" height="45" rx="8" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="2" className="dark:fill-slate-800" />
              <text x={37.5 + idx * 55} y="38" textAnchor="middle" className="text-base font-mono font-black fill-violet-600 dark:fill-violet-300">
                {val}
              </text>
              {idx < 3 && (
                <text x={65 + idx * 55} y="38" textAnchor="middle" className="text-base font-black fill-slate-400">
                  ·
                </text>
              )}
            </g>
          ))}
          <text x="120" y="65" textAnchor="middle" className="text-[10px] font-bold fill-slate-500">4! = 24 sorrend</text>
        </svg>
      );

    case 'slots_3':
      return (
        <svg viewBox="0 0 180 70" className={`w-48 sm:w-56 h-auto select-none ${className || ''}`}>
          {[3, 2, 1].map((val, idx) => (
            <g key={idx}>
              <rect x={15 + idx * 55} y="10" width="45" height="45" rx="8" fill="#eef2ff" stroke="#6366f1" strokeWidth="2" className="dark:fill-slate-800" />
              <text x={37.5 + idx * 55} y="38" textAnchor="middle" className="text-base font-mono font-black fill-indigo-600 dark:fill-indigo-300">
                {val}
              </text>
              {idx < 2 && (
                <text x={65 + idx * 55} y="38" textAnchor="middle" className="text-base font-black fill-slate-400">
                  ·
                </text>
              )}
            </g>
          ))}
          <text x="90" y="65" textAnchor="middle" className="text-[10px] font-bold fill-slate-500">3! = 6 sorrend</text>
        </svg>
      );

    case 'queue':
      return (
        <svg viewBox="0 0 220 80" className={`w-56 sm:w-64 h-auto select-none ${className || ''}`}>
          {/* 4 people icons in line */}
          {['#3b82f6', '#10b981', '#f59e0b', '#ec4899'].map((col, idx) => (
            <g key={idx}>
              <circle cx={35 + idx * 50} cy="28" r="12" fill={col} />
              <rect x={27 + idx * 50} y="44" width="16" height="24" rx="4" fill={col} />
              <text x={35 + idx * 50} y="32" textAnchor="middle" className="text-[10px] font-black fill-white">{idx + 1}</text>
            </g>
          ))}
        </svg>
      );

    case 'books':
      return (
        <svg viewBox="0 0 200 80" className={`w-52 sm:w-60 h-auto select-none ${className || ''}`}>
          {/* Shelf baseline */}
          <line x1="10" y1="70" x2="190" y2="70" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
          {/* Books */}
          <rect x="25" y="15" width="22" height="55" rx="3" fill="#3b82f6" />
          <text x="36" y="45" textAnchor="middle" className="text-[9px] font-bold fill-white" transform="rotate(-90 36 45)">Matek</text>

          <rect x="52" y="20" width="20" height="50" rx="3" fill="#10b981" />
          <text x="62" y="48" textAnchor="middle" className="text-[9px] font-bold fill-white" transform="rotate(-90 62 48)">Fizika</text>

          <rect x="77" y="10" width="24" height="60" rx="3" fill="#ec4899" />
          <text x="89" y="43" textAnchor="middle" className="text-[9px] font-bold fill-white" transform="rotate(-90 89 43)">Kémia</text>

          <rect x="106" y="25" width="20" height="45" rx="3" fill="#f59e0b" />
          <text x="116" y="50" textAnchor="middle" className="text-[9px] font-bold fill-white" transform="rotate(-90 116 50)">Töri</text>

          <rect x="131" y="15" width="24" height="55" rx="3" fill="#8b5cf6" />
          <text x="143" y="45" textAnchor="middle" className="text-[9px] font-bold fill-white" transform="rotate(-90 143 45)">Angol</text>
        </svg>
      );

    case 'circle':
      return (
        <svg viewBox="0 0 160 100" className={`w-44 sm:w-52 h-auto select-none ${className || ''}`}>
          <circle cx="80" cy="50" r="28" fill="#f8fafc" stroke="#0d9488" strokeWidth="2" className="dark:fill-slate-800" />
          <circle cx="80" cy="14" r="8" fill="#3b82f6" />
          <circle cx="116" cy="50" r="8" fill="#10b981" />
          <circle cx="80" cy="86" r="8" fill="#f59e0b" />
          <circle cx="44" cy="50" r="8" fill="#8b5cf6" />
        </svg>
      );

    case 'digits':
      return (
        <svg viewBox="0 0 200 65" className={`w-52 sm:w-60 h-auto select-none ${className || ''}`}>
          {['0', '4', '7', '9'].map((digit, idx) => (
            <g key={idx}>
              <rect x={15 + idx * 45} y="10" width="38" height="45" rx="6" fill={idx === 0 ? '#fee2e2' : '#eff6ff'} stroke={idx === 0 ? '#ef4444' : '#3b82f6'} strokeWidth="1.8" />
              <text x={34 + idx * 45} y="38" textAnchor="middle" className={`text-lg font-mono font-black ${idx === 0 ? 'fill-rose-600' : 'fill-blue-600'}`}>
                {digit}
              </text>
            </g>
          ))}
        </svg>
      );

    case 'anagram':
      return (
        <svg viewBox="0 0 200 65" className={`w-52 sm:w-60 h-auto select-none ${className || ''}`}>
          {['M', 'A', 'T', 'E', 'K'].map((char, idx) => (
            <g key={idx}>
              <rect x={10 + idx * 36} y="10" width="32" height="42" rx="6" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.8" />
              <text x={26 + idx * 36} y="36" textAnchor="middle" className="text-base font-mono font-black fill-violet-600">
                {char}
              </text>
            </g>
          ))}
        </svg>
      );

    case 'blocks':
      return (
        <svg viewBox="0 0 220 75" className={`w-56 sm:w-64 h-auto select-none ${className || ''}`}>
          {/* Block 1 (AB together) */}
          <rect x="15" y="10" width="75" height="50" rx="8" fill="#fdf4ff" stroke="#c084fc" strokeWidth="2.5" strokeDasharray="3 2" />
          <text x="52.5" y="68" textAnchor="middle" className="text-[8px] font-black fill-purple-600">1 blokk (AB)</text>
          <circle cx="35" cy="32" r="11" fill="#ec4899" />
          <text x="35" y="36" textAnchor="middle" className="text-xs font-black fill-white">A</text>
          <circle cx="65" cy="32" r="11" fill="#ec4899" />
          <text x="65" y="36" textAnchor="middle" className="text-xs font-black fill-white">B</text>

          {/* Block 2: C */}
          <circle cx="125" cy="32" r="13" fill="#3b82f6" />
          <text x="125" y="36" textAnchor="middle" className="text-xs font-black fill-white">C</text>

          {/* Block 3: D */}
          <circle cx="175" cy="32" r="13" fill="#10b981" />
          <text x="175" y="36" textAnchor="middle" className="text-xs font-black fill-white">D</text>
        </svg>
      );

    default:
      return null;
  }
};

// =========================================================================
// 3. MINI ÁBRÁK PÁROSÍTÓHOZ ÉS CSOPORTOSÍTÓHOZ (OrderingMatcherFigure)
// =========================================================================

export type OrderingMiniFigType =
  | 'slots'
  | 'queue'
  | 'books'
  | 'circle'
  | 'digits'
  | 'anagram'
  | 'blocks'
  | 'tree';

export interface OrderingMatcherFigureProps {
  type: OrderingMiniFigType;
  size?: number;
  className?: string;
}

export const OrderingMatcherFigure: React.FC<OrderingMatcherFigureProps> = ({
  type,
  size = 36,
  className
}) => {
  switch (type) {
    case 'slots':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={`shrink-0 ${className || ''}`}>
          <rect x="4" y="12" width="9" height="16" rx="2" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.2" />
          <rect x="15" y="12" width="9" height="16" rx="2" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.2" />
          <rect x="26" y="12" width="9" height="16" rx="2" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.2" />
          <text x="8.5" y="24" textAnchor="middle" className="text-[9px] font-black fill-violet-700">3</text>
          <text x="19.5" y="24" textAnchor="middle" className="text-[9px] font-black fill-violet-700">2</text>
          <text x="30.5" y="24" textAnchor="middle" className="text-[9px] font-black fill-violet-700">1</text>
        </svg>
      );

    case 'queue':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={`shrink-0 ${className || ''}`}>
          <circle cx="9" cy="14" r="4" fill="#3b82f6" />
          <rect x="6" y="20" width="6" height="12" rx="1.5" fill="#3b82f6" />
          <circle cx="20" cy="14" r="4" fill="#10b981" />
          <rect x="17" y="20" width="6" height="12" rx="1.5" fill="#10b981" />
          <circle cx="31" cy="14" r="4" fill="#f59e0b" />
          <rect x="28" y="20" width="6" height="12" rx="1.5" fill="#f59e0b" />
        </svg>
      );

    case 'books':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={`shrink-0 ${className || ''}`}>
          <line x1="4" y1="32" x2="36" y2="32" stroke="#94a3b8" strokeWidth="2" />
          <rect x="8" y="10" width="6" height="22" rx="1" fill="#3b82f6" />
          <rect x="16" y="14" width="6" height="18" rx="1" fill="#ec4899" />
          <rect x="24" y="8" width="7" height="24" rx="1" fill="#10b981" />
        </svg>
      );

    case 'circle':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={`shrink-0 ${className || ''}`}>
          <circle cx="20" cy="20" r="11" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
          <circle cx="20" cy="6" r="3" fill="#3b82f6" />
          <circle cx="34" cy="20" r="3" fill="#10b981" />
          <circle cx="20" cy="34" r="3" fill="#f59e0b" />
          <circle cx="6" cy="20" r="3" fill="#8b5cf6" />
        </svg>
      );

    case 'digits':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={`shrink-0 ${className || ''}`}>
          <rect x="6" y="10" width="12" height="18" rx="2" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.2" />
          <text x="12" y="23" textAnchor="middle" className="text-[10px] font-black fill-rose-600">0</text>
          <rect x="22" y="10" width="12" height="18" rx="2" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.2" />
          <text x="28" y="23" textAnchor="middle" className="text-[10px] font-black fill-blue-600">5</text>
        </svg>
      );

    case 'anagram':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={`shrink-0 ${className || ''}`}>
          <rect x="6" y="10" width="12" height="18" rx="2" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.2" />
          <text x="12" y="23" textAnchor="middle" className="text-[10px] font-black fill-violet-700">A</text>
          <rect x="22" y="10" width="12" height="18" rx="2" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.2" />
          <text x="28" y="23" textAnchor="middle" className="text-[10px] font-black fill-violet-700">B</text>
        </svg>
      );

    case 'blocks':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={`shrink-0 ${className || ''}`}>
          <rect x="4" y="8" width="22" height="24" rx="4" fill="#fae8ff" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="10" cy="20" r="3.5" fill="#ec4899" />
          <circle cx="20" cy="20" r="3.5" fill="#ec4899" />
          <circle cx="32" cy="20" r="4.5" fill="#3b82f6" />
        </svg>
      );

    case 'tree':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={`shrink-0 ${className || ''}`}>
          <circle cx="8" cy="20" r="3" fill="#6366f1" />
          <line x1="11" y1="20" x2="20" y2="12" stroke="#6366f1" strokeWidth="1.5" />
          <line x1="11" y1="20" x2="20" y2="28" stroke="#6366f1" strokeWidth="1.5" />
          <circle cx="20" cy="12" r="2.5" fill="#3b82f6" />
          <circle cx="20" cy="28" r="2.5" fill="#3b82f6" />
          <line x1="23" y1="12" x2="32" y2="8" stroke="#94a3b8" strokeWidth="1.2" />
          <line x1="23" y1="12" x2="32" y2="16" stroke="#94a3b8" strokeWidth="1.2" />
          <circle cx="32" cy="8" r="2" fill="#10b981" />
          <circle cx="32" cy="16" r="2" fill="#10b981" />
        </svg>
      );

    default:
      return null;
  }
};
