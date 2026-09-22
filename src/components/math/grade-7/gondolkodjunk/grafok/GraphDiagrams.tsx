import React from 'react';
import { cn } from '@/lib/utils';
import {
  Network,
  Share2,
  GitBranch,
  CircleDot,
  CheckCircle2,
  XCircle,
  Sparkles,
  HelpCircle,
  Flame,
  Layers,
  ArrowRight
} from 'lucide-react';

// ==========================================
// 1. FOKSZÁMÖSSZEG ÉS KÉZFOGÁSI TÉTEL DIAGRAM (Σ d(v) = 2 · |E|)
// ==========================================
export const DegreeSumTheoremDiagram: React.FC = () => {
  return (
    <div className="p-4 sm:p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900/60 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-200 text-sm sm:text-base">
          <Network className="w-5 h-5 text-emerald-600" />
          <span>A Gráfelmélet Alaptétele (Kézfogási Tétel)</span>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-200/70 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono font-bold">
          Σ d(v) = 2 · |E|
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">
        Minden él pontosan <strong>két csúcsot köt össze</strong>, így minden új él megrajzolása pontosan <strong>2-vel növeli a fokszámok összegét</strong>. Emiatt a csúcsok fokszámának összege <strong>mindig páros szám</strong>!
      </p>

      {/* SVG Demonstration: 4-vertex graph with degree labels */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-850 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
        <div className="flex-1 flex justify-center">
          <svg viewBox="0 0 240 160" className="w-56 h-auto">
            {/* Edges */}
            <line x1="40" y1="40" x2="200" y2="40" stroke="#10b981" strokeWidth="3" />
            <line x1="200" y1="40" x2="200" y2="120" stroke="#10b981" strokeWidth="3" />
            <line x1="200" y1="120" x2="40" y2="120" stroke="#10b981" strokeWidth="3" />
            <line x1="40" y1="120" x2="40" y2="40" stroke="#10b981" strokeWidth="3" />
            <line x1="40" y1="40" x2="200" y2="120" stroke="#10b981" strokeWidth="3" />

            {/* Edge count indicators (5 edges) */}
            <text x="120" y="32" fill="#047857" fontSize="10" fontWeight="bold" textAnchor="middle">e₁</text>
            <text x="212" y="85" fill="#047857" fontSize="10" fontWeight="bold">e₂</text>
            <text x="120" y="138" fill="#047857" fontSize="10" fontWeight="bold" textAnchor="middle">e₃</text>
            <text x="25" y="85" fill="#047857" fontSize="10" fontWeight="bold">e₄</text>
            <text x="110" y="75" fill="#047857" fontSize="10" fontWeight="bold">e₅ (átló)</text>

            {/* Vertices: A(3), B(2), C(3), D(2) */}
            <circle cx="40" cy="40" r="14" fill="#059669" stroke="#ffffff" strokeWidth="2" />
            <text x="40" y="44" fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle">A: 3</text>

            <circle cx="200" cy="40" r="14" fill="#059669" stroke="#ffffff" strokeWidth="2" />
            <text x="200" y="44" fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle">B: 2</text>

            <circle cx="200" cy="120" r="14" fill="#059669" stroke="#ffffff" strokeWidth="2" />
            <text x="200" y="124" fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle">C: 3</text>

            <circle cx="40" cy="120" r="14" fill="#059669" stroke="#ffffff" strokeWidth="2" />
            <text x="40" y="124" fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle">D: 2</text>
          </svg>
        </div>

        {/* Calculation breakdown */}
        <div className="flex-1 space-y-2 text-xs sm:text-sm">
          <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
            <div className="font-black text-emerald-800 dark:text-emerald-200">1. Csúcsok fokszámainak összege:</div>
            <div className="font-mono text-emerald-700 dark:text-emerald-300 font-bold">
              d(A) + d(B) + d(C) + d(D) = 3 + 2 + 3 + 2 = <span className="text-base text-emerald-900 dark:text-white">10</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
            <div className="font-black text-teal-800 dark:text-teal-200">2. Élek száma és kétszerese:</div>
            <div className="font-mono text-teal-700 dark:text-teal-300 font-bold">
              |E| = 5 él ⟹ 2 · |E| = 2 · 5 = <span className="text-base text-teal-900 dark:text-white">10</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
            Megjegyzés: A páratlan fokszámú csúcsok száma 2 db (A és C: fokszám 3), ami páros szám!
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. TELJES GRÁFOK DIAGRAM (K_n: n(n-1)/2 él)
// ==========================================
export const CompleteGraphKnDiagram: React.FC = () => {
  return (
    <div className="p-4 sm:p-5 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 font-bold text-indigo-900 dark:text-indigo-200 text-sm sm:text-base">
          <Share2 className="w-5 h-5 text-indigo-600" />
          <span>Teljes Gráfok (K_n) és Élszámaik</span>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-200/70 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-mono font-bold">
          Élek: n · (n - 1) / 2
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">
        A <strong>teljes gráfban ($K_n$)</strong> minden csúcs össze van kötve minden másik csúccsal. Ez felel meg annak, mikor egy társaságban mindenki mindenkivel kezet fog vagy minden csapat játszik mindenkivel!
      </p>

      {/* Grid of K3, K4, K5 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* K3: Háromszög */}
        <div className="bg-white dark:bg-slate-850 p-3 rounded-xl border border-indigo-200 dark:border-indigo-800 text-center shadow-xs">
          <div className="font-black text-xs text-indigo-700 dark:text-indigo-300 mb-1">K₃ (3 csúcs)</div>
          <svg viewBox="0 0 120 100" className="w-24 h-20 mx-auto my-1">
            <polygon points="60,15 20,85 100,85" fill="none" stroke="#6366f1" strokeWidth="2.5" />
            <circle cx="60" cy="15" r="7" fill="#4f46e5" />
            <circle cx="20" cy="85" r="7" fill="#4f46e5" />
            <circle cx="100" cy="85" r="7" fill="#4f46e5" />
          </svg>
          <div className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
            (3 · 2) / 2 = <strong className="text-indigo-600">3 él</strong>
          </div>
          <div className="text-[10px] text-slate-500">Minden csúcs foka: 2</div>
        </div>

        {/* K4: Négyszög átlókkal */}
        <div className="bg-white dark:bg-slate-850 p-3 rounded-xl border border-indigo-200 dark:border-indigo-800 text-center shadow-xs">
          <div className="font-black text-xs text-indigo-700 dark:text-indigo-300 mb-1">K₄ (4 csúcs)</div>
          <svg viewBox="0 0 120 100" className="w-24 h-20 mx-auto my-1">
            <rect x="25" y="15" width="70" height="70" fill="none" stroke="#6366f1" strokeWidth="2" />
            <line x1="25" y1="15" x2="95" y2="85" stroke="#6366f1" strokeWidth="2" />
            <line x1="95" y1="15" x2="25" y2="85" stroke="#6366f1" strokeWidth="2" />
            <circle cx="25" cy="15" r="6" fill="#4f46e5" />
            <circle cx="95" cy="15" r="6" fill="#4f46e5" />
            <circle cx="95" cy="85" r="6" fill="#4f46e5" />
            <circle cx="25" cy="85" r="6" fill="#4f46e5" />
          </svg>
          <div className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
            (4 · 3) / 2 = <strong className="text-indigo-600">6 él</strong>
          </div>
          <div className="text-[10px] text-slate-500">Minden csúcs foka: 3</div>
        </div>

        {/* K5: Ötszög csillaggal */}
        <div className="bg-white dark:bg-slate-850 p-3 rounded-xl border border-indigo-200 dark:border-indigo-800 text-center shadow-xs">
          <div className="font-black text-xs text-indigo-700 dark:text-indigo-300 mb-1">K₅ (5 csúcs)</div>
          <svg viewBox="0 0 120 100" className="w-24 h-20 mx-auto my-1">
            {/* Pentagram edges */}
            <polygon points="60,10 105,45 88,90 32,90 15,45" fill="none" stroke="#6366f1" strokeWidth="1.5" />
            <line x1="60" y1="10" x2="88" y2="90" stroke="#818cf8" strokeWidth="1.5" />
            <line x1="60" y1="10" x2="32" y2="90" stroke="#818cf8" strokeWidth="1.5" />
            <line x1="105" y1="45" x2="32" y2="90" stroke="#818cf8" strokeWidth="1.5" />
            <line x1="105" y1="45" x2="15" y2="45" stroke="#818cf8" strokeWidth="1.5" />
            <line x1="88" y1="90" x2="15" y2="45" stroke="#818cf8" strokeWidth="1.5" />
            {/* Vertices */}
            <circle cx="60" cy="10" r="5" fill="#4f46e5" />
            <circle cx="105" cy="45" r="5" fill="#4f46e5" />
            <circle cx="88" cy="90" r="5" fill="#4f46e5" />
            <circle cx="32" cy="90" r="5" fill="#4f46e5" />
            <circle cx="15" cy="45" r="5" fill="#4f46e5" />
          </svg>
          <div className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
            (5 · 4) / 2 = <strong className="text-indigo-600">10 él</strong>
          </div>
          <div className="text-[10px] text-slate-500">Minden csúcs foka: 4</div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. FA GRÁFOK DIAGRAM (Körmentes összefüggő: |E| = n - 1)
// ==========================================
export const TreeGraphDiagram: React.FC = () => {
  return (
    <div className="p-4 sm:p-5 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200 text-sm sm:text-base">
          <GitBranch className="w-5 h-5 text-amber-600" />
          <span>Fa Gráfok: Összefüggő, Körmentes Hálózatok</span>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-amber-200/70 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-mono font-bold">
          Élek száma: |E| = n - 1
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fa gráf */}
        <div className="bg-white dark:bg-slate-850 p-4 rounded-xl border-2 border-emerald-300 dark:border-emerald-800 shadow-xs">
          <div className="flex items-center gap-1.5 font-black text-xs text-emerald-700 dark:text-emerald-300 mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Fa gráf (n = 6 csúcs, |E| = 5 él)</span>
          </div>
          <svg viewBox="0 0 200 110" className="w-full h-24">
            {/* Tree edges */}
            <line x1="100" y1="20" x2="50" y2="60" stroke="#10b981" strokeWidth="2.5" />
            <line x1="100" y1="20" x2="150" y2="60" stroke="#10b981" strokeWidth="2.5" />
            <line x1="50" y1="60" x2="30" y2="95" stroke="#10b981" strokeWidth="2.5" />
            <line x1="50" y1="60" x2="70" y2="95" stroke="#10b981" strokeWidth="2.5" />
            <line x1="150" y1="60" x2="150" y2="95" stroke="#10b981" strokeWidth="2.5" />
            {/* Vertices */}
            <circle cx="100" cy="20" r="7" fill="#059669" />
            <circle cx="50" cy="60" r="7" fill="#059669" />
            <circle cx="150" cy="60" r="7" fill="#059669" />
            <circle cx="30" cy="95" r="7" fill="#059669" />
            <circle cx="70" cy="95" r="7" fill="#059669" />
            <circle cx="150" cy="95" r="7" fill="#059669" />
          </svg>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            ✓ Nincs benne zárt kör (hurok). Bármely 2 csúcs között pontosan 1 út vezet!
          </div>
        </div>

        {/* Nem fa gráf (Kört tartalmaz) */}
        <div className="bg-white dark:bg-slate-850 p-4 rounded-xl border-2 border-rose-300 dark:border-rose-800 shadow-xs">
          <div className="flex items-center gap-1.5 font-black text-xs text-rose-700 dark:text-rose-300 mb-2">
            <XCircle className="w-4 h-4 text-rose-600" />
            <span>NEM fa gráf (Kört / zárt hurkot tartalmaz)</span>
          </div>
          <svg viewBox="0 0 200 110" className="w-full h-24">
            {/* Cycle edges */}
            <polygon points="50,25 150,25 150,85 50,85" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
            <line x1="150" y1="25" x2="185" y2="55" stroke="#f43f5e" strokeWidth="2.5" />
            {/* Vertices */}
            <circle cx="50" cy="25" r="7" fill="#e11d48" />
            <circle cx="150" cy="25" r="7" fill="#e11d48" />
            <circle cx="150" cy="85" r="7" fill="#e11d48" />
            <circle cx="50" cy="85" r="7" fill="#e11d48" />
            <circle cx="185" cy="55" r="7" fill="#e11d48" />
          </svg>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            ✗ A 4 csúcsú négyzet körutat alkot, így ez a gráf nem fa!
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. MINI ÁBRÁK A KVÍZHEZ (GraphSolverFigure)
// ==========================================
export interface GraphSolverFigureProps {
  type: 'complete_k4' | 'complete_k5' | 'tree' | 'degrees' | 'cycle' | 'handshake' | 'isolated' | 'network';
}

export const GraphSolverFigure: React.FC<GraphSolverFigureProps> = ({ type }) => {
  switch (type) {
    case 'complete_k4':
      return (
        <div className="flex items-center justify-center gap-2 p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 my-2">
          <Share2 className="w-5 h-5 text-indigo-600 shrink-0" />
          <span className="text-xs font-mono font-bold text-indigo-800 dark:text-indigo-200">
            K₄ teljes gráf: 4 csúcs, (4·3)/2 = 6 él
          </span>
        </div>
      );

    case 'complete_k5':
      return (
        <div className="flex items-center justify-center gap-2 p-2 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 my-2">
          <Share2 className="w-5 h-5 text-purple-600 shrink-0" />
          <span className="text-xs font-mono font-bold text-purple-800 dark:text-purple-200">
            K₅ teljes gráf: 5 csúcs, (5·4)/2 = 10 él
          </span>
        </div>
      );

    case 'tree':
      return (
        <div className="flex items-center justify-center gap-2 p-2 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 my-2">
          <GitBranch className="w-5 h-5 text-amber-600 shrink-0" />
          <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-200">
            Fa gráf: n csúcs ⟹ n - 1 él (körmentes)
          </span>
        </div>
      );

    case 'handshake':
      return (
        <div className="flex items-center justify-center gap-2 p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 my-2">
          <Network className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-200">
            Fokszámösszeg = 2 · |E| (mindig páros)
          </span>
        </div>
      );

    case 'degrees':
      return (
        <div className="flex items-center justify-center gap-2 p-2 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 my-2">
          <span className="text-xs font-mono font-bold text-blue-800 dark:text-blue-200">
            Csúcsok fokszámai: d(v₁) + d(v₂) + ··· + d(vₙ)
          </span>
        </div>
      );

    case 'isolated':
      return (
        <div className="flex items-center justify-center gap-2 p-2 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-800 my-2">
          <CircleDot className="w-5 h-5 text-rose-600 shrink-0" />
          <span className="text-xs font-mono font-bold text-rose-800 dark:text-rose-200">
            Izolált csúcs: d(v) = 0 (nincs csatlakozó él)
          </span>
        </div>
      );

    case 'cycle':
      return (
        <div className="flex items-center justify-center gap-2 p-2 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-200 dark:border-teal-800 my-2">
          <span className="text-xs font-mono font-bold text-teal-800 dark:text-teal-200">
            Kör gráf (Cₙ): n csúcs, n él, minden fokszám = 2
          </span>
        </div>
      );

    case 'network':
    default:
      return (
        <div className="flex items-center justify-center gap-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 my-2">
          <Network className="w-5 h-5 text-slate-600 dark:text-slate-400 shrink-0" />
          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
            Gráf: V csúcshalmaz és E élhalmaz
          </span>
        </div>
      );
  }
};

// ==========================================
// 5. MINI ÁBRÁK PÁROSÍTÓHOZ ÉS CSOPORTOSÍTÓHOZ (GraphMatcherFigure)
// ==========================================
export interface GraphMatcherFigureProps {
  type: 'complete' | 'tree' | 'handshake' | 'cycle' | 'isolated' | 'simple' | 'degree';
  size?: number;
}

export const GraphMatcherFigure: React.FC<GraphMatcherFigureProps> = ({
  type,
  size = 24
}) => {
  switch (type) {
    case 'complete':
      return (
        <div className="flex items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-950/60 p-1.5 text-indigo-700 dark:text-indigo-300">
          <Share2 style={{ width: size, height: size }} />
        </div>
      );
    case 'tree':
      return (
        <div className="flex items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-950/60 p-1.5 text-amber-700 dark:text-amber-300">
          <GitBranch style={{ width: size, height: size }} />
        </div>
      );
    case 'handshake':
      return (
        <div className="flex items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950/60 p-1.5 text-emerald-700 dark:text-emerald-300">
          <Network style={{ width: size, height: size }} />
        </div>
      );
    case 'cycle':
      return (
        <div className="flex items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-950/60 p-1.5 text-teal-700 dark:text-teal-300">
          <CircleDot style={{ width: size, height: size }} />
        </div>
      );
    case 'isolated':
      return (
        <div className="flex items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-950/60 p-1.5 text-rose-700 dark:text-rose-300">
          <XCircle style={{ width: size, height: size }} />
        </div>
      );
    case 'simple':
      return (
        <div className="flex items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950/60 p-1.5 text-purple-700 dark:text-purple-300">
          <CheckCircle2 style={{ width: size, height: size }} />
        </div>
      );
    case 'degree':
    default:
      return (
        <div className="flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950/60 p-1.5 text-blue-700 dark:text-blue-300">
          <Layers style={{ width: size, height: size }} />
        </div>
      );
  }
};
