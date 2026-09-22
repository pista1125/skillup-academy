import React from 'react';
import { cn } from '@/lib/utils';
import {
  Lightbulb,
  CheckCircle2,
  XCircle,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  Scale,
  ShieldCheck,
  ShieldAlert,
  Boxes,
  Layers,
  ArrowRight,
  Split
} from 'lucide-react';

// ==========================================
// 1. KIJELENTÉSEK ÉS IGAZSÁGÉRTÉKEK DIAGRAM
// ==========================================
export const StatementTruthDiagram: React.FC = () => {
  return (
    <div className="p-4 sm:p-5 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-cyan-200 dark:border-cyan-900/60 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 font-bold text-cyan-950 dark:text-cyan-200 text-sm sm:text-base">
          <Lightbulb className="w-5 h-5 text-cyan-600" />
          <span>Kijelentések és Igazságértékek</span>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-200/70 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-mono font-bold">
          Logikai Alapok
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">
        A matematikában <strong>kijelentésnek (állításnak)</strong> nevezünk minden olyan értelmes kijelentő mondatot, amelyről egyértelműen eldönthető, hogy <strong>IGAZ (I)</strong> vagy <strong>HAMIS (H)</strong>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Kijelentések */}
        <div className="bg-white dark:bg-slate-850 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
          <div className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-300 text-sm mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Kijelentések (Egyértelmű I / H)</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between">
              <span>„A 12 páros szám és osztható 3-mal.”</span>
              <span className="font-bold text-emerald-600 ml-2">IGAZ (I)</span>
            </div>
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:dark:border-emerald-900/40 flex items-center justify-between">
              <span>„Minden háromszög belső szögeinek összege 180°.”</span>
              <span className="font-bold text-emerald-600 ml-2">IGAZ (I)</span>
            </div>
            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/40 flex items-center justify-between">
              <span>„A 15 prímszám.”</span>
              <span className="font-bold text-red-600 ml-2">HAMIS (H)</span>
            </div>
            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/40 flex items-center justify-between">
              <span>„$7 + 5 = 14$”</span>
              <span className="font-bold text-red-600 ml-2">HAMIS (H)</span>
            </div>
          </div>
        </div>

        {/* NEM Kijelentések */}
        <div className="bg-white dark:bg-slate-850 p-4 rounded-xl border border-amber-200 dark:border-amber-800/60">
          <div className="flex items-center gap-2 font-bold text-amber-700 dark:text-amber-300 text-sm mb-3">
            <XCircle className="w-4 h-4 text-amber-600" />
            <span>NEM Kijelentések (Nincs igazságértékük)</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span>„Mennyi az idő?”</span>
              <span className="text-slate-500 font-mono text-[11px]">Kérdés</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span>„Gyere ide azonnal!”</span>
              <span className="text-slate-500 font-mono text-[11px]">Felszólítás</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span>„A matematika a legszebb tantárgy.”</span>
              <span className="text-slate-500 font-mono text-[11px]">Vélemény</span>
            </div>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 flex items-center justify-between">
              <span>„$x + 5 = 12$”</span>
              <span className="text-amber-700 dark:text-amber-300 font-bold text-[11px]">Nyitott mondat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. KVANTOROK ÉS TAGADÁSI SZABÁLYOK DIAGRAM
// ==========================================
export const QuantifiersNegationDiagram: React.FC = () => {
  return (
    <div className="p-4 sm:p-5 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 font-bold text-indigo-950 dark:text-indigo-200 text-sm sm:text-base">
          <Split className="w-5 h-5 text-indigo-600" />
          <span>Általános és Létezési Állítások Tagadása</span>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-200/70 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-mono font-bold">
          Minden ↔ Van olyan
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">
        Egy <strong>„Minden...”</strong> típusú állítás tagadása <strong>NEM „Egyik sem...”</strong>, hanem: <strong>„Van olyan, amelyik nem...”</strong>!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Minden tagadása */}
        <div className="bg-white dark:bg-slate-850 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800">
          <div className="text-xs font-bold text-indigo-900 dark:text-indigo-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            1. Eset: „MINDEN...” tagadása
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40">
              <div className="text-slate-500 font-semibold mb-0.5">Eredeti állítás (A):</div>
              <div className="font-bold text-indigo-950 dark:text-indigo-200">„Minden prímszám páratlan.” (HAMIS)</div>
            </div>

            <div className="flex justify-center text-indigo-500 font-bold text-xs py-0.5">
              ↓ Pontos logikai tagadás (Nem A) ↓
            </div>

            <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40">
              <div className="text-emerald-700 dark:text-emerald-300 font-semibold mb-0.5">Helyes tagadás:</div>
              <div className="font-bold text-emerald-950 dark:text-emerald-200">
                „Van olyan prímszám, amelyik páros (nem páratlan).” (IGAZ, mert a 2 páros prím)
              </div>
            </div>

            <div className="p-2 rounded bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 text-[11px] text-red-700 dark:text-red-300">
              ❌ <strong>Gyakori hiba:</strong> „Egyik prímszám sem páratlan.” (Ez is HAMIS!)
            </div>
          </div>
        </div>

        {/* Van olyan tagadása */}
        <div className="bg-white dark:bg-slate-850 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
          <div className="text-xs font-bold text-purple-900 dark:text-purple-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            2. Eset: „VAN OLYAN...” tagadása
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40">
              <div className="text-slate-500 font-semibold mb-0.5">Eredeti állítás (B):</div>
              <div className="font-bold text-purple-950 dark:text-purple-200">„Van olyan háromszög, amelynek 2 derékszöge van.” (HAMIS)</div>
            </div>

            <div className="flex justify-center text-purple-500 font-bold text-xs py-0.5">
              ↓ Pontos logikai tagadás (Nem B) ↓
            </div>

            <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40">
              <div className="text-emerald-700 dark:text-emerald-300 font-semibold mb-0.5">Helyes tagadás:</div>
              <div className="font-bold text-emerald-950 dark:text-emerald-200">
                „Egyetlen háromszögnek sincs 2 derékszöge.” (Minden háromszögnek legfeljebb 1 derékszöge lehet.)
              </div>
            </div>

            <div className="p-2 rounded bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/40 text-[11px] text-indigo-700 dark:text-indigo-300">
              💡 <strong>Szabály:</strong> „Létezik $X$” tagadása $\rightarrow$ „Mindenre NEM $X$” (vagy „Nincs olyan $X$”).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. IGAZOLÁS ÉS ELLENPÉLDA (CÁFOLAT) DIAGRAM
// ==========================================
export const CounterexampleVisualizerDiagram: React.FC = () => {
  return (
    <div className="p-4 sm:p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900/60 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 font-bold text-emerald-950 dark:text-emerald-200 text-sm sm:text-base">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>Hogyan Igazolunk és Hogyan Cáfolunk?</span>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-200/70 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono font-bold">
          Bizonyítás vs Ellenpélda
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Általános Igazolás */}
        <div className="bg-white dark:bg-slate-850 p-4 rounded-xl border-2 border-emerald-300 dark:border-emerald-800">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200 font-bold text-sm mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>1. IGAZOLÁS (Bizonyítás)</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
            Egy általános állítást <strong>NEM elég néhány példával alátámasztani</strong>! Általánosan, minden lehetséges esetre érvényes levezetéssel kell bizonyítani.
          </p>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 text-xs space-y-1.5">
            <div className="font-bold text-emerald-900 dark:text-emerald-100">
              Állítás: „Két egymást követő egész szám összege mindig páratlan.”
            </div>
            <div className="text-slate-700 dark:text-slate-300">
              <strong>Bizonyítás:</strong> Legyen a kisebb szám $n$, a rákövetkező $n + 1$.
            </div>
            <div className="font-mono font-bold text-emerald-800 dark:text-emerald-200 bg-white dark:bg-slate-850 p-1.5 rounded border border-emerald-300 text-center">
              Összeg = n + (n + 1) = 2n + 1
            </div>
            <div className="text-slate-600 dark:text-slate-400 text-[11px]">
              Mivel $2n$ mindig páros szám, hozzáadva $1$-et az eredmény kivétel nélkül <strong>mindig páratlan</strong>! ✓
            </div>
          </div>
        </div>

        {/* Cáfolat ellenpéldával */}
        <div className="bg-white dark:bg-slate-850 p-4 rounded-xl border-2 border-rose-300 dark:border-rose-800">
          <div className="flex items-center gap-2 text-rose-800 dark:text-rose-200 font-bold text-sm mb-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>2. CÁFOLAT (Egyetlen Ellenpélda elég!)</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
            Egy „minden”-re vonatkozó állítás megdöntéséhez <strong>egyetlenegy működő ellenpélda (Counterexample)</strong> felmutatása tökéletesen elegendő!
          </p>
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-lg border border-rose-200 dark:border-rose-800 text-xs space-y-1.5">
            <div className="font-bold text-rose-900 dark:text-rose-100">
              Állítás: „Ha egy szám osztható 4-gyel és 6-tal, akkor osztható 24-gyel is.”
            </div>
            <div className="font-mono font-bold text-rose-800 dark:text-rose-200 bg-white dark:bg-slate-850 p-1.5 rounded border border-rose-300 text-center">
              Ellenpélda: a 12
            </div>
            <div className="text-slate-600 dark:text-slate-400 text-[11px]">
              A $12$ osztható $4$-gyel ($12 : 4 = 3$) és $6$-tal is ($12 : 6 = 2$), de $12$ <strong>NEM osztható 24-gyel</strong>! Az állítás tehát <strong>HAMIS</strong>! ✗
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. A SKATULYA-ELV DIAGRAM (Dirichlet-elv)
// ==========================================
export const PigeonholePrincipleDiagram: React.FC = () => {
  return (
    <div className="p-4 sm:p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 font-bold text-amber-950 dark:text-amber-200 text-sm sm:text-base">
          <Boxes className="w-5 h-5 text-amber-600" />
          <span>A Skatulya-elv (Dirichlet-elv) Logikája</span>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-amber-200/70 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-mono font-bold">
          n + 1 elem → n skatulya
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">
        Ha $n + 1$ darab tárgyat helyezünk el $n$ darab dobozban (skatulyában), akkor <strong>biztosan lesz legalább egy olyan doboz, amelybe legalább 2 tárgy kerül</strong>.
      </p>

      {/* Visual Skatulya illustration */}
      <div className="bg-white dark:bg-slate-850 p-4 rounded-xl border border-amber-200 dark:border-amber-800 flex flex-col items-center">
        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-3 text-center">
          Példa: 4 golyó elhelyezése 3 dobozban
        </div>

        <div className="grid grid-cols-3 gap-3 w-full max-w-md">
          {/* Box 1 */}
          <div className="border-2 border-dashed border-amber-400 dark:border-amber-600 rounded-xl p-3 flex flex-col items-center justify-between min-h-[100px] bg-amber-50/50 dark:bg-amber-950/20">
            <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300">1. Skatulya</span>
            <div className="flex gap-1.5 my-auto">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center shadow">1</span>
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center shadow">2</span>
            </div>
            <span className="text-[10px] text-amber-700 font-bold">2 db golyó!</span>
          </div>

          {/* Box 2 */}
          <div className="border-2 border-dashed border-amber-400 dark:border-amber-600 rounded-xl p-3 flex flex-col items-center justify-between min-h-[100px] bg-amber-50/50 dark:bg-amber-950/20">
            <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300">2. Skatulya</span>
            <div className="flex gap-1.5 my-auto">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center shadow">3</span>
            </div>
            <span className="text-[10px] text-slate-500">1 db golyó</span>
          </div>

          {/* Box 3 */}
          <div className="border-2 border-dashed border-amber-400 dark:border-amber-600 rounded-xl p-3 flex flex-col items-center justify-between min-h-[100px] bg-amber-50/50 dark:bg-amber-950/20">
            <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300">3. Skatulya</span>
            <div className="flex gap-1.5 my-auto">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center shadow">4</span>
            </div>
            <span className="text-[10px] text-slate-500">1 db golyó</span>
          </div>
        </div>

        <div className="mt-4 p-2.5 rounded-lg bg-amber-100/70 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700 text-xs text-amber-950 dark:text-amber-100 text-center w-full max-w-md">
          🧦 <strong>Zoknis feladat:</strong> A fiókban fekete és fehér zoknik vannak. Legalább <strong>3 darabot</strong> kell vakon kihúzni, hogy <strong>biztosan legyen köztük egy pár azonos színű</strong> (2 skatulya = 2 szín $\rightarrow$ 3 zokni kell).
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 5. KVÍZ ÉS GYAKORLÓ FIGURE KOMPONENS
// ==========================================
interface ProofSolverFigureProps {
  type: 'statement' | 'counterexample' | 'pigeonhole' | 'negation' | 'parity' | 'divisibility';
  title?: string;
  data?: any;
}

export const ProofSolverFigure: React.FC<ProofSolverFigureProps> = ({
  type,
  title,
  data
}) => {
  return (
    <div className="my-3 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center">
      {title && <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">{title}</div>}

      {type === 'statement' && (
        <div className="flex items-center gap-3 text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 font-bold border border-emerald-300">
            IGAZ (I)
          </div>
          <span className="text-slate-400 font-bold">VAGY</span>
          <div className="px-3 py-1.5 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 font-bold border border-rose-300">
            HAMIS (H)
          </div>
        </div>
      )}

      {type === 'counterexample' && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 text-xs text-rose-800 dark:text-rose-200">
          <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>Elég <strong>1 db ellenpélda</strong> az állítás megdöntéséhez!</span>
        </div>
      )}

      {type === 'pigeonhole' && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 text-xs text-amber-800 dark:text-amber-200">
          <Boxes className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Skatulya-elv: <strong>{data?.items || 'k + 1'} elem</strong> elhelyezése <strong>{data?.boxes || 'k'} skatulyában</strong></span>
        </div>
      )}

      {type === 'negation' && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 text-xs text-indigo-800 dark:text-indigo-200">
          <Split className="w-4 h-4 text-indigo-600 flex-shrink-0" />
          <span>„Minden...” ellentéte $\rightarrow$ <strong>„Van olyan, amelyik NEM...”</strong></span>
        </div>
      )}

      {type === 'parity' && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-teal-50 dark:bg-teal-950/50 border border-teal-200 text-xs text-teal-800 dark:text-teal-200 font-mono">
          <span>páros + páros = PÁROS</span>
          <span className="text-slate-400">|</span>
          <span>páratlan + páratlan = PÁROS</span>
        </div>
      )}

      {type === 'divisibility' && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-200 text-xs text-cyan-800 dark:text-cyan-200">
          <span>Oszthatósági szabályok vizsgálata prímtényezőkkel</span>
        </div>
      )}
    </div>
  );
};
