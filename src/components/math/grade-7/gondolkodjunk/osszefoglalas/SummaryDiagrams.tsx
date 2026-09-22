import React from 'react';
import { cn } from '@/lib/utils';
import {
  Trophy,
  Sparkles,
  Calculator,
  ArrowDownUp,
  GitBranch,
  Network,
  Scale,
  Gamepad2,
  CheckCircle2,
  Layers,
  HelpCircle,
  Boxes
} from 'lucide-react';

// ==========================================
// 1. FEJEZETI ÁTTEKINTŐ FORMULATÁR DIAGRAM
// ==========================================
export const Chapter1FormulaOverviewDiagram: React.FC = () => {
  return (
    <div className="p-4 sm:p-5 bg-gradient-to-br from-rose-50 to-purple-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-rose-200 dark:border-rose-900/60 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 font-bold text-rose-950 dark:text-rose-200 text-sm sm:text-base">
          <Trophy className="w-5 h-5 text-rose-600" />
          <span>I. Gondolkodjunk! Fejezet Képlettára</span>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-rose-200/70 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-mono font-bold">
          6 Fő Témakör
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
        {/* 1. Számold össze */}
        <div className="p-3 bg-white dark:bg-slate-850 rounded-xl border border-blue-200 dark:border-blue-900/50 space-y-1">
          <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Calculator className="w-4 h-4 text-blue-600" />
            <span>1. Számold össze!</span>
          </div>
          <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
            Szorzási szabály: a · b · c...
          </div>
          <p className="text-[11px] text-slate-500">
            Független döntések lehetőségeinek szorzata.
          </p>
        </div>

        {/* 2. Rendezd sorba */}
        <div className="p-3 bg-white dark:bg-slate-850 rounded-xl border border-violet-200 dark:border-violet-900/50 space-y-1">
          <div className="font-bold text-violet-700 dark:text-violet-300 flex items-center gap-1.5">
            <ArrowDownUp className="w-4 h-4 text-violet-600" />
            <span>2. Rendezd sorba!</span>
          </div>
          <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
            n! = n · (n - 1) · ... · 1
          </div>
          <p className="text-[11px] text-slate-500">
            n különböző elem sorrendjeinek száma.
          </p>
        </div>

        {/* 3. Hány eset van */}
        <div className="p-3 bg-white dark:bg-slate-850 rounded-xl border border-emerald-200 dark:border-emerald-900/50 space-y-1">
          <div className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
            <GitBranch className="w-4 h-4 text-emerald-600" />
            <span>3. Hány eset van?</span>
          </div>
          <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
            Visszatevéses: nᵏ • Nélküli: n(n-1)
          </div>
          <p className="text-[11px] text-slate-500">
            Kiválasztás sorrenddel vagy anélkül.
          </p>
        </div>

        {/* 4. Gráfok */}
        <div className="p-3 bg-white dark:bg-slate-850 rounded-xl border border-teal-200 dark:border-teal-900/50 space-y-1">
          <div className="font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
            <Network className="w-4 h-4 text-teal-600" />
            <span>4. Gráfok</span>
          </div>
          <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
            Σ d(v) = 2 · |E| • Kₙ: n(n-1)/2
          </div>
          <p className="text-[11px] text-slate-500">
            Fokszámösszeg páros, fa gráf: n - 1 él.
          </p>
        </div>

        {/* 5. Igazold! Cáfold! */}
        <div className="p-3 bg-white dark:bg-slate-850 rounded-xl border border-cyan-200 dark:border-cyan-900/50 space-y-1">
          <div className="font-bold text-cyan-700 dark:text-cyan-300 flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-cyan-600" />
            <span>5. Igazold! Cáfold!</span>
          </div>
          <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
            Igazolás: levezetés • Cáfolat: 1 ellenpélda
          </div>
          <p className="text-[11px] text-slate-500">
            Skatulya-elv: ⌈n/k⌉ elem legalább egy dobozban.
          </p>
        </div>

        {/* 6. Matematikai játékok */}
        <div className="p-3 bg-white dark:bg-slate-850 rounded-xl border border-amber-200 dark:border-amber-900/50 space-y-1">
          <div className="font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
            <Gamepad2 className="w-4 h-4 text-amber-600" />
            <span>6. Matematikai játékok</span>
          </div>
          <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
            21-es: (4k) cél • Szimmetria tükrözés
          </div>
          <p className="text-[11px] text-slate-500">
            Visszafelé elemzés, Nim játékok, Lovagok és Lókötők.
          </p>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. KVÍZ ÉS GYAKORLÓ FIGURE KOMPONENS
// ==========================================
interface SummarySolverFigureProps {
  type: 'counting' | 'permutation' | 'tree' | 'graph' | 'logic' | 'game' | 'pigeonhole';
  title?: string;
  data?: any;
}

export const SummarySolverFigure: React.FC<SummarySolverFigureProps> = ({
  type,
  title,
  data
}) => {
  return (
    <div className="my-3 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center">
      {title && <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">{title}</div>}

      {type === 'counting' && (
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="p-1.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 font-bold">1. lépés: {data?.a || 'a'}</span>
          <span className="text-slate-400">·</span>
          <span className="p-1.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 font-bold">2. lépés: {data?.b || 'b'}</span>
          <span className="text-slate-400">=</span>
          <span className="p-1.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 font-bold">{data?.total || 'a · b'}</span>
        </div>
      )}

      {type === 'permutation' && (
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-violet-100 dark:bg-violet-950 text-violet-900 font-black">
            P({data?.n || 'n'}) = {data?.n || 'n'}! = {data?.val || 'n · (n-1) · ... · 1'}
          </span>
        </div>
      )}

      {type === 'tree' && (
        <div className="flex items-center gap-2 text-xs">
          <GitBranch className="w-4 h-4 text-emerald-600" />
          <span>Elágazások: Fa-diagram szerinti leszámlálás</span>
        </div>
      )}

      {type === 'graph' && (
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2 py-1 rounded bg-teal-100 dark:bg-teal-950 text-teal-900 font-bold">
            Σ d(v) = 2 · {data?.edges || '|E|'} = {data?.sum || '2|E| (Páros)'}
          </span>
        </div>
      )}

      {type === 'pigeonhole' && (
        <div className="flex items-center gap-2 text-xs">
          <Boxes className="w-4 h-4 text-amber-600" />
          <span>Skatulya-elv: <strong>{data?.items || 'n+1'} elem</strong> → <strong>{data?.boxes || 'n'} skatulya</strong></span>
        </div>
      )}

      {type === 'logic' && (
        <div className="flex items-center gap-2 text-xs">
          <Scale className="w-4 h-4 text-cyan-600" />
          <span>Kijelentések: Általános bizonyítás vs. Ellenpélda</span>
        </div>
      )}

      {type === 'game' && (
        <div className="flex items-center gap-2 text-xs">
          <Gamepad2 className="w-4 h-4 text-amber-600" />
          <span>Nyerő stratégia: Visszafelé gondolkodás & Szimmetria</span>
        </div>
      )}
    </div>
  );
};
