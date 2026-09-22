import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Gamepad2,
  Trophy,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Split,
  Layers,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Swords
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ==========================================
// 1. A 21-ES (KAVICSLEVÉTELI) JÁTÉK ÉS NYERŐ POZÍCIÓK
// ==========================================
export const NimGame21Diagram: React.FC = () => {
  return (
    <div className="p-4 sm:p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 font-bold text-amber-950 dark:text-amber-200 text-sm sm:text-base">
          <Trophy className="w-5 h-5 text-amber-600" />
          <span>A 21-es Kavicslevételi Játék Nyerő Stratégiája</span>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-amber-200/70 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-mono font-bold">
          4-es Osztási Maradék
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">
        <strong>Szabály:</strong> Az asztalon 21 kavics van. Két játékos felváltva vesz el <strong>1, 2 vagy 3 kavicsot</strong>. Az nyer, aki az <strong>utolsó kavicsot elviszi</strong>!
      </p>

      {/* Visual Winning Numbers Line */}
      <div className="bg-white dark:bg-slate-850 p-4 rounded-xl border border-amber-200 dark:border-amber-800 space-y-3">
        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 text-center">
          Kulcspozíciók és Nyerő Számok (Visszafelé gondolkodás):
        </div>

        <div className="grid grid-cols-6 gap-2 text-center text-xs">
          <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-100 font-bold border-2 border-emerald-400">
            <div className="text-base font-black">4</div>
            <div className="text-[10px]">Célpozíció</div>
          </div>
          <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-100 font-bold border-2 border-emerald-400">
            <div className="text-base font-black">8</div>
            <div className="text-[10px]">Nyerő</div>
          </div>
          <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-100 font-bold border-2 border-emerald-400">
            <div className="text-base font-black">12</div>
            <div className="text-[10px]">Nyerő</div>
          </div>
          <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-100 font-bold border-2 border-emerald-400">
            <div className="text-base font-black">16</div>
            <div className="text-[10px]">Nyerő</div>
          </div>
          <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-100 font-bold border-2 border-emerald-400">
            <div className="text-base font-black">20</div>
            <div className="text-[10px]">Kezdőlépés</div>
          </div>
          <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-900 dark:text-amber-100 font-bold border border-amber-300">
            <div className="text-base font-black">21</div>
            <div className="text-[10px]">Kezdőállás</div>
          </div>
        </div>

        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
          <p>
            👑 <strong>Nyerő stratégia:</strong> Az 1. játékos kezd: <strong>elvesz 1 kavicsot</strong>, így <strong>20 marad</strong> (4-gyel osztható).
          </p>
          <p>
            Ezután bármit lép a 2. játékos (1, 2 vagy 3 kavicsot vesz el), az 1. játékos mindig <strong>4 - k kavicsot</strong> vesz el (kiegészíti 4-re), így az asztalon maradó kavicsok száma mindig 16, 12, 8, 4, 0 lesz!
          </p>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. SZIMMETRIA ALAPÚ NYERŐ STRATÉGIÁK DIAGRAM
// ==========================================
export const SymmetryStrategyDiagram: React.FC = () => {
  return (
    <div className="p-4 sm:p-5 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 font-bold text-indigo-950 dark:text-indigo-200 text-sm sm:text-base">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <span>Szimmetrikus Válaszstratégia (Tükrözés elve)</span>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-200/70 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-mono font-bold">
          Középpontos & Tengelyes
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Kerek Asztal és Érmék */}
        <div className="bg-white dark:bg-slate-850 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-2 text-xs">
          <div className="font-bold text-indigo-900 dark:text-indigo-200 text-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            1. Pénzérmék Kerek Asztalon
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Két játékos felváltva helyez el egyforma érméket egy kerek asztalon úgy, hogy azok nem fedhetik egymást. Az veszít, aki nem tud több érmét letenni.
          </p>
          <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 text-indigo-950 dark:text-indigo-200">
            <strong>Nyerő stratégia (Kezdő):</strong> Az 1. játékos a <strong>legelső érmét pontosan az asztal középpontjába</strong> teszi. Ezután a 2. játékos bármelyik lépésére a <strong>középpontra nézve átellenes (tükrös) helyre</strong> tesz érmét!
          </div>
        </div>

        {/* 2 Kupacos Szimmetrikus Nim */}
        <div className="bg-white dark:bg-slate-850 p-4 rounded-xl border border-purple-200 dark:border-purple-800 space-y-2 text-xs">
          <div className="font-bold text-purple-900 dark:text-purple-200 text-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            2. Két Egyforma Kupacos Nim
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Az asztalon két egyforma kupac van (pl. 7-7 gyufa). Egy lépésben bármelyik kupacból tetszőleges számú gyufa elvehető. Az utolsó gyufát elvevő nyer.
          </p>
          <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 text-purple-950 dark:text-purple-200">
            <strong>Nyerő stratégia (2. játékos):</strong> Ha az 1. játékos az egyik kupacból elvesz $k$ darabot, a 2. játékos <strong>a másik kupacból vesz el pontosan ugyanannyi ($k$) darabot</strong>. Így a lépése után mindig két egyenlő kupac marad!
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. IGAZMONDÓK ÉS HAZUGOK SZIGETE DIAGRAM
// ==========================================
export const KnightsKnavesDiagram: React.FC = () => {
  return (
    <div className="p-4 sm:p-5 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-cyan-200 dark:border-cyan-900/60 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 font-bold text-cyan-950 dark:text-cyan-200 text-sm sm:text-base">
          <Swords className="w-5 h-5 text-cyan-600" />
          <span>Igazmondók és Hazugok Logikája</span>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-200/70 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-mono font-bold">
          Esetszétválasztás
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Igazmondó */}
        <div className="bg-white dark:bg-slate-850 p-4 rounded-xl border-2 border-emerald-300 dark:border-emerald-800 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Lovag (Mindig Igazat Mond)</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Minden állítása <strong>IGAZ</strong>.
          </p>
          <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 font-mono">
            Ha azt mondja: „A = Igaz” → Valóban A = Igaz.
          </div>
          <p className="text-[11px] text-slate-500">
            Soha nem mondhatja magáról, hogy „Én hazug vagyok”, mert az önellentmondás lenne.
          </p>
        </div>

        {/* Hazug */}
        <div className="bg-white dark:bg-slate-850 p-4 rounded-xl border-2 border-rose-300 dark:border-rose-800 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-rose-800 dark:text-rose-200 font-bold text-sm">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>Lókötő (Mindig Hazudik)</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Minden állítása <strong>HAMIS</strong>.
          </p>
          <div className="p-2 rounded bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 font-mono">
            Ha azt mondja: „B = Igaz” → Valójában B = Hamis.
          </div>
          <p className="text-[11px] text-slate-500">
            Mindig az ellenkezője az igaz annak, amit állít.
          </p>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. KVÍZ ÉS GYAKORLÓ FIGURE KOMPONENS
// ==========================================
interface GameSolverFigureProps {
  type: 'stones' | 'symmetry' | 'logic' | 'modulo' | 'piles';
  title?: string;
  data?: any;
}

export const GameSolverFigure: React.FC<GameSolverFigureProps> = ({
  type,
  title,
  data
}) => {
  return (
    <div className="my-3 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center">
      {title && <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">{title}</div>}

      {type === 'stones' && (
        <div className="flex items-center gap-2 text-xs">
          <div className="px-2.5 py-1 rounded bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-mono font-bold">
            Kavicsok: {data?.stones || 21} db
          </div>
          <span className="text-slate-400 font-bold">→</span>
          <div className="px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 font-mono font-bold">
            Elvehető: 1, 2, 3 db
          </div>
        </div>
      )}

      {type === 'symmetry' && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 text-xs text-indigo-800 dark:text-indigo-200">
          <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0" />
          <span>Szimmetrikus válaszstratégia (Középpontos tükrözés)</span>
        </div>
      )}

      {type === 'modulo' && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-200 font-mono">
          <span>Nyerő célpozíciók: 4, 8, 12, 16, 20 (4 többszörösei)</span>
        </div>
      )}

      {type === 'logic' && (
        <div className="flex items-center gap-3 text-xs">
          <span className="px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 font-bold">Lovag: IGAZ</span>
          <span className="text-slate-400">|</span>
          <span className="px-2 py-1 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 font-bold">Lókötő: HAMIS</span>
        </div>
      )}

      {type === 'piles' && (
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-950 text-purple-900 rounded font-bold">1. Kupac: {data?.pile1 || 5}</span>
          <span className="text-slate-400">•</span>
          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-950 text-purple-900 rounded font-bold">2. Kupac: {data?.pile2 || 5}</span>
        </div>
      )}
    </div>
  );
};
