import React from 'react';
import { cn } from '@/lib/utils';
import {
  Utensils,
  Shirt,
  MapPin,
  GitBranch,
  KeyRound,
  Dices,
  CircleDot,
  Layers,
  ArrowRight,
  Plus,
  X,
  Sparkles
} from 'lucide-react';

// ==========================================
// 1. ÖSSZEADÁSI SZABÁLY DIAGRAM (Kölcsönösen kizáró utak: A + B)
// ==========================================
export const AdditionRuleDiagram: React.FC = () => {
  return (
    <div className="p-4 sm:p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200 text-sm sm:text-base">
          <Plus className="w-5 h-5 text-amber-600" />
          <span>Összeadási Szabály: VAGY kapcsolat (Egymást kizáró lehetőségek)</span>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-amber-200/70 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-mono font-bold">
          3 + 4 = 7 lehetőség
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">
        Példa: Budapestről Debrecenbe utazunk. Vagy vonattal megyünk (3 járat), VAGY busszal (4 járat). A két mód kizárja egymást, így a lehetőségek összeadódnak!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {/* Vonat ág */}
        <div className="bg-white dark:bg-slate-850 p-3.5 rounded-xl border-2 border-amber-200 dark:border-amber-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-black text-xs text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
              🚆 1. Út: Vonat járatok
            </span>
            <span className="text-xs font-mono font-bold bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 px-2 py-0.5 rounded-md">
              3 járat
            </span>
          </div>
          <div className="flex gap-2">
            {['Reggeli IC (07:30)', 'Déli Gyors (12:00)', 'Délutáni IC (16:45)'].map((train, i) => (
              <div
                key={i}
                className="flex-1 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] font-bold text-amber-900 dark:text-amber-200 text-center"
              >
                {train}
              </div>
            ))}
          </div>
        </div>

        {/* Busz ág */}
        <div className="bg-white dark:bg-slate-850 p-3.5 rounded-xl border-2 border-orange-200 dark:border-orange-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-black text-xs text-orange-700 dark:text-orange-300 flex items-center gap-1.5">
              🚌 2. Út: Busz járatok
            </span>
            <span className="text-xs font-mono font-bold bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 px-2 py-0.5 rounded-md">
              4 járat
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {['Volán 08:00', 'Volán 11:30', 'Volán 14:15', 'Volán 18:00'].map((bus, i) => (
              <div
                key={i}
                className="p-1.5 rounded-lg bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-[11px] font-bold text-orange-900 dark:text-orange-200 text-center"
              >
                {bus}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-amber-100/70 dark:bg-amber-950/60 p-2.5 rounded-xl text-center font-mono font-bold text-xs sm:text-sm text-amber-900 dark:text-amber-200">
        Összesen: |Vonat ∪ Busz| = 3 + 4 = <span className="text-amber-600 dark:text-amber-400 text-base">7 különböző utazási lehetőség</span>
      </div>
    </div>
  );
};

// ==========================================
// 2. SZORZÁSI SZABÁLY DIAGRAM (Független rész-döntések: p · q · r)
// ==========================================
export const MultiplicationRuleDiagram: React.FC = () => {
  return (
    <div className="p-4 sm:p-5 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 font-bold text-indigo-900 dark:text-indigo-200 text-sm sm:text-base">
          <X className="w-5 h-5 text-indigo-600" />
          <span>Szorzási Szabály: ÉS kapcsolat (Egymást követő független döntések)</span>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-200/70 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-mono font-bold">
          3 · 4 · 2 = 24 menü
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">
        Példa: 3-fogásos ebéd összeállítása. Minden lépésben egy-egy fogást választunk a kínálatból!
      </p>

      {/* 3 Lépés kártya szorzási jellel összekötve */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-2.5 mb-4">
        {/* 1. Lépés: Levesek */}
        <div className="flex-1 w-full bg-white dark:bg-slate-850 p-3 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 text-center shadow-xs">
          <div className="text-[11px] font-bold uppercase text-indigo-600 dark:text-indigo-400 mb-1">1. Lépés: Leves</div>
          <div className="text-lg font-black text-indigo-900 dark:text-indigo-100 mb-1.5">3 féle</div>
          <div className="flex flex-col gap-1 text-[10px] text-slate-600 dark:text-slate-400">
            <span className="bg-indigo-50 dark:bg-indigo-950/50 py-0.5 rounded">🍲 Húsleves</span>
            <span className="bg-indigo-50 dark:bg-indigo-950/50 py-0.5 rounded">🥣 Gulyásleves</span>
            <span className="bg-indigo-50 dark:bg-indigo-950/50 py-0.5 rounded">🥦 Krémleves</span>
          </div>
        </div>

        <div className="text-indigo-500 font-black text-xl px-1">·</div>

        {/* 2. Lépés: Főételek */}
        <div className="flex-1 w-full bg-white dark:bg-slate-850 p-3 rounded-xl border-2 border-blue-200 dark:border-blue-800 text-center shadow-xs">
          <div className="text-[11px] font-bold uppercase text-blue-600 dark:text-blue-400 mb-1">2. Lépés: Főétel</div>
          <div className="text-lg font-black text-blue-900 dark:text-blue-100 mb-1.5">4 féle</div>
          <div className="flex flex-col gap-1 text-[10px] text-slate-600 dark:text-slate-400">
            <span className="bg-blue-50 dark:bg-blue-950/50 py-0.5 rounded">🍗 Rántott hús</span>
            <span className="bg-blue-50 dark:bg-blue-950/50 py-0.5 rounded">🍝 Bolognai</span>
            <span className="bg-blue-50 dark:bg-blue-950/50 py-0.5 rounded">🐟 Rántott hal</span>
            <span className="bg-blue-50 dark:bg-blue-950/50 py-0.5 rounded">🧀 Rántott sajt</span>
          </div>
        </div>

        <div className="text-indigo-500 font-black text-xl px-1">·</div>

        {/* 3. Lépés: Desszertek */}
        <div className="flex-1 w-full bg-white dark:bg-slate-850 p-3 rounded-xl border-2 border-purple-200 dark:border-purple-800 text-center shadow-xs">
          <div className="text-[11px] font-bold uppercase text-purple-600 dark:text-purple-400 mb-1">3. Lépés: Desszert</div>
          <div className="text-lg font-black text-purple-900 dark:text-purple-100 mb-1.5">2 féle</div>
          <div className="flex flex-col gap-1 text-[10px] text-slate-600 dark:text-slate-400">
            <span className="bg-purple-50 dark:bg-purple-950/50 py-0.5 rounded">🥞 Palacsinta</span>
            <span className="bg-purple-50 dark:bg-purple-950/50 py-0.5 rounded">🍰 Somlói galuska</span>
          </div>
        </div>
      </div>

      <div className="bg-indigo-100/70 dark:bg-indigo-950/60 p-2.5 rounded-xl text-center font-mono font-bold text-xs sm:text-sm text-indigo-900 dark:text-indigo-200">
        Kiszámítás: 3 · 4 · 2 = <span className="text-indigo-600 dark:text-indigo-400 text-base">24 különböző komplett ebédmenü</span>
      </div>
    </div>
  );
};

// ==========================================
// 3. FA-DIAGRAM ÉS DÖNTÉSI ÁGAK (Decision Tree Diagram)
// ==========================================
export const DecisionTreeDiagram: React.FC = () => {
  return (
    <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900/60 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-200 text-sm sm:text-base">
          <GitBranch className="w-5 h-5 text-emerald-600" />
          <span>Fa-diagram: 3 pénzérme feldobásának kimenetelei (2 · 2 · 2 = 8 eset)</span>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">
        A fa-diagram minden elágazása egy-egy döntési pontot (fej = F vagy írás = Í) ábrázol. A gyökértől a levélig haladva megkapjuk az összes lehetséges kimenetelt!
      </p>

      {/* SVG Tree Visual */}
      <div className="w-full overflow-x-auto">
        <svg viewBox="0 0 600 220" className="w-full min-w-[500px] h-auto max-h-56">
          {/* Levels indicators */}
          <text x="30" y="20" fill="#94a3b8" fontSize="11" fontWeight="bold">Start</text>
          <text x="170" y="20" fill="#94a3b8" fontSize="11" fontWeight="bold">1. Érme (2)</text>
          <text x="330" y="20" fill="#94a3b8" fontSize="11" fontWeight="bold">2. Érme (4)</text>
          <text x="490" y="20" fill="#94a3b8" fontSize="11" fontWeight="bold">3. Érme (8 ág)</text>

          {/* Root node */}
          <circle cx="40" cy="115" r="10" fill="#10b981" />
          <text x="40" y="119" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">●</text>

          {/* Lines to Level 1 */}
          <path d="M 50 115 L 180 65" stroke="#10b981" strokeWidth="2.5" fill="none" />
          <path d="M 50 115 L 180 165" stroke="#10b981" strokeWidth="2.5" fill="none" />

          {/* Level 1 Nodes */}
          <g>
            <circle cx="180" cy="65" r="14" fill="#3b82f6" />
            <text x="180" y="70" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">F</text>

            <circle cx="180" cy="165" r="14" fill="#f59e0b" />
            <text x="180" y="170" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Í</text>
          </g>

          {/* Lines to Level 2 */}
          <path d="M 194 65 L 340 40" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <path d="M 194 65 L 340 90" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <path d="M 194 165 L 340 140" stroke="#f59e0b" strokeWidth="2" fill="none" />
          <path d="M 194 165 L 340 190" stroke="#f59e0b" strokeWidth="2" fill="none" />

          {/* Level 2 Nodes */}
          <g>
            <circle cx="340" cy="40" r="12" fill="#3b82f6" />
            <text x="340" y="44" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">F</text>
            <circle cx="340" cy="90" r="12" fill="#f59e0b" />
            <text x="340" y="94" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Í</text>
            <circle cx="340" cy="140" r="12" fill="#3b82f6" />
            <text x="340" y="144" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">F</text>
            <circle cx="340" cy="190" r="12" fill="#f59e0b" />
            <text x="340" y="194" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Í</text>
          </g>

          {/* Lines to Level 3 / Leaves */}
          {[
            { y1: 40, y2: 25, val: 'FFF', c: '#8b5cf6' },
            { y1: 40, y2: 55, val: 'FFÍ', c: '#8b5cf6' },
            { y1: 90, y2: 75, val: 'FÍF', c: '#8b5cf6' },
            { y1: 90, y2: 105, val: 'FÍÍ', c: '#8b5cf6' },
            { y1: 140, y2: 125, val: 'ÍFF', c: '#8b5cf6' },
            { y1: 140, y2: 155, val: 'ÍFÍ', c: '#8b5cf6' },
            { y1: 190, y2: 175, val: 'ÍÍF', c: '#8b5cf6' },
            { y1: 190, y2: 205, val: 'ÍÍÍ', c: '#8b5cf6' }
          ].map((item, idx) => (
            <g key={idx}>
              <path d={`M 352 ${item.y1} L 490 ${item.y2}`} stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
              <rect x="490" y={item.y2 - 10} width="46" height="20" rx="6" fill="#f1f5f9" stroke="#94a3b8" />
              <text x="513" y={item.y2 + 4} fill="#0f172a" fontSize="10" fontWeight="black" textAnchor="middle">
                {item.val}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-2 text-center text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">
        2 · 2 · 2 = 2³ = 8 különböző kimenetel
      </div>
    </div>
  );
};

// ==========================================
// 4. VISSZATEVÉSSEL VS VISSZATEVÉS NÉLKÜL (PIN vs Különböző jegyek)
// ==========================================
export const ReplacementCompareDiagram: React.FC = () => {
  return (
    <div className="p-4 sm:p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-purple-200 dark:border-purple-900/60 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 font-bold text-purple-900 dark:text-purple-200 text-sm sm:text-base">
          <KeyRound className="w-5 h-5 text-purple-600" />
          <span>Visszatevéssel (Ismétléses) vs Visszatevés nélkül (Különböző elemek)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ismétléssel (Visszatevéssel) */}
        <div className="bg-white dark:bg-slate-850 p-4 rounded-xl border-2 border-purple-300 dark:border-purple-800 shadow-xs">
          <div className="font-black text-xs text-purple-700 dark:text-purple-300 mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            Ismétlés MEGMEGEDETT (Visszatevéssel)
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
            Pl. 3-jegyű kód az 1, 2, 3, 4, 5 jegyekből (a számjegyek többször is szerepelhetnek):
          </p>

          <div className="flex justify-center gap-2 mb-3">
            {[
              { pos: '1. jegy', opt: '5' },
              { pos: '2. jegy', opt: '5' },
              { pos: '3. jegy', opt: '5' }
            ].map((slot, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-12 rounded-lg bg-purple-100 dark:bg-purple-950/80 border-2 border-purple-400 flex items-center justify-center font-black text-purple-900 dark:text-purple-100 text-lg">
                  {slot.opt}
                </div>
                <span className="text-[10px] text-slate-500 font-bold">{slot.pos}</span>
              </div>
            ))}
          </div>

          <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-center font-mono font-bold text-xs text-purple-800 dark:text-purple-200">
            5 · 5 · 5 = 5³ = <strong className="text-purple-600 dark:text-purple-400">125 kód</strong>
          </div>
        </div>

        {/* Ismétlés NÉLKÜL (Visszatevés nélkül) */}
        <div className="bg-white dark:bg-slate-850 p-4 rounded-xl border-2 border-pink-300 dark:border-pink-800 shadow-xs">
          <div className="font-black text-xs text-pink-700 dark:text-pink-300 mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-pink-500"></span>
            Minden elem KÜLÖNBÖZŐ (Visszatevés nélkül)
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
            Pl. 3-jegyű szám az 1, 2, 3, 4, 5 jegyekből (minden jegyet csak egyszer használhatunk):
          </p>

          <div className="flex justify-center gap-2 mb-3">
            {[
              { pos: '1. jegy', opt: '5' },
              { pos: '2. jegy', opt: '4' },
              { pos: '3. jegy', opt: '3' }
            ].map((slot, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-12 rounded-lg bg-pink-100 dark:bg-pink-950/80 border-2 border-pink-400 flex items-center justify-center font-black text-pink-900 dark:text-pink-100 text-lg">
                  {slot.opt}
                </div>
                <span className="text-[10px] text-slate-500 font-bold">{slot.pos}</span>
              </div>
            ))}
          </div>

          <div className="p-2 rounded-lg bg-pink-50 dark:bg-pink-950/50 text-center font-mono font-bold text-xs text-pink-800 dark:text-pink-200">
            5 · 4 · 3 = <strong className="text-pink-600 dark:text-pink-400">60 szám</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. MINI ÁBRÁK A KVÍZHEZ (PossibilitiesSolverFigure)
// ==========================================
export interface PossibilitiesSolverFigureProps {
  type: 'menu' | 'outfit' | 'roads' | 'tree' | 'pin' | 'dice_coin' | 'venn' | 'slots';
}

export const PossibilitiesSolverFigure: React.FC<PossibilitiesSolverFigureProps> = ({ type }) => {
  switch (type) {
    case 'menu':
      return (
        <div className="flex items-center justify-center gap-2 p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 my-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-200">
            <span>🍲 Leves (p)</span>
            <span className="text-amber-500 font-black">×</span>
            <span>🍗 Főétel (q)</span>
            <span className="text-amber-500 font-black">×</span>
            <span>🍰 Desszert (r)</span>
          </div>
        </div>
      );

    case 'outfit':
      return (
        <div className="flex items-center justify-center gap-2 p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 my-2">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-800 dark:text-indigo-200">
            <span>👕 Pólók (a)</span>
            <span className="text-indigo-500 font-black">×</span>
            <span>👖 Nadrágok (b)</span>
            <span className="text-indigo-500 font-black">×</span>
            <span>👟 Cipők (c)</span>
          </div>
        </div>
      );

    case 'roads':
      return (
        <div className="flex items-center justify-center gap-2 p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 my-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-800 dark:text-blue-200">
            <span className="px-2 py-1 rounded bg-blue-200 dark:bg-blue-900">A</span>
            <span className="text-blue-500 font-black">── 3 út ──▶</span>
            <span className="px-2 py-1 rounded bg-blue-200 dark:bg-blue-900">B</span>
            <span className="text-blue-500 font-black">── 4 út ──▶</span>
            <span className="px-2 py-1 rounded bg-blue-200 dark:bg-blue-900">C</span>
          </div>
        </div>
      );

    case 'tree':
      return (
        <div className="flex items-center justify-center gap-2 p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 my-2">
          <GitBranch className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-200">
            Elágazások: 2 · 2 · 2 = 2³ = 8 ág
          </span>
        </div>
      );

    case 'pin':
      return (
        <div className="flex items-center justify-center gap-1.5 p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 my-2">
          {[1, 2, 3, 4].map((slot) => (
            <div
              key={slot}
              className="w-8 h-8 rounded bg-purple-200 dark:bg-purple-900 border border-purple-400 flex items-center justify-center font-mono font-black text-purple-900 dark:text-purple-100 text-xs"
            >
              10
            </div>
          ))}
          <span className="ml-2 font-mono font-bold text-xs text-purple-800 dark:text-purple-200">
            = 10⁴ = 10 000
          </span>
        </div>
      );

    case 'dice_coin':
      return (
        <div className="flex items-center justify-center gap-2.5 p-2.5 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-800 my-2">
          <Dices className="w-5 h-5 text-rose-600 shrink-0" />
          <span className="text-xs font-bold text-rose-800 dark:text-rose-200 font-mono">
            Kocka (6) · Érme (2) = 12 kimenetel
          </span>
        </div>
      );

    case 'venn':
      return (
        <div className="flex items-center justify-center gap-2 p-2.5 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-200 dark:border-teal-800 my-2">
          <Layers className="w-5 h-5 text-teal-600 shrink-0" />
          <span className="text-xs font-mono font-bold text-teal-800 dark:text-teal-200">
            |A ∪ B| = |A| + |B| - |A ∩ B|
          </span>
        </div>
      );

    case 'slots':
    default:
      return (
        <div className="flex items-center justify-center gap-1.5 p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 my-2">
          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
            [ p₁ ] · [ p₂ ] · [ p₃ ] ··· [ pₖ ]
          </span>
        </div>
      );
  }
};

// ==========================================
// 6. MINI ÁBRÁK PÁROSÍTÓHOZ ÉS CSOPORTOSÍTÓHOZ (PossibilitiesMatcherFigure)
// ==========================================
export interface PossibilitiesMatcherFigureProps {
  type: 'addition' | 'multiplication' | 'tree' | 'roads' | 'pin' | 'outfit' | 'dice' | 'sieve' | 'replacement';
  size?: number;
}

export const PossibilitiesMatcherFigure: React.FC<PossibilitiesMatcherFigureProps> = ({
  type,
  size = 24
}) => {
  switch (type) {
    case 'addition':
      return (
        <div className="flex items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-950/60 p-1.5 text-amber-700 dark:text-amber-300">
          <Plus style={{ width: size, height: size }} />
        </div>
      );
    case 'multiplication':
      return (
        <div className="flex items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-950/60 p-1.5 text-indigo-700 dark:text-indigo-300">
          <X style={{ width: size, height: size }} />
        </div>
      );
    case 'tree':
      return (
        <div className="flex items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/60 p-1.5 text-emerald-700 dark:text-emerald-300">
          <GitBranch style={{ width: size, height: size }} />
        </div>
      );
    case 'roads':
      return (
        <div className="flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950/60 p-1.5 text-blue-700 dark:text-blue-300">
          <MapPin style={{ width: size, height: size }} />
        </div>
      );
    case 'pin':
      return (
        <div className="flex items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950/60 p-1.5 text-purple-700 dark:text-purple-300">
          <KeyRound style={{ width: size, height: size }} />
        </div>
      );
    case 'outfit':
      return (
        <div className="flex items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-950/60 p-1.5 text-pink-700 dark:text-pink-300">
          <Shirt style={{ width: size, height: size }} />
        </div>
      );
    case 'dice':
      return (
        <div className="flex items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-950/60 p-1.5 text-rose-700 dark:text-rose-300">
          <Dices style={{ width: size, height: size }} />
        </div>
      );
    case 'sieve':
      return (
        <div className="flex items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-950/60 p-1.5 text-teal-700 dark:text-teal-300">
          <Layers style={{ width: size, height: size }} />
        </div>
      );
    case 'replacement':
    default:
      return (
        <div className="flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 p-1.5 text-slate-700 dark:text-slate-300">
          <CircleDot style={{ width: size, height: size }} />
        </div>
      );
  }
};
