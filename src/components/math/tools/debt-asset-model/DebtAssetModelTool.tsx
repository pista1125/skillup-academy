import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  RotateCcw,
  Plus,
  Minus,
  Sparkles,
  Info,
  CheckCircle2,
  HelpCircle,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Shuffle,
  Trash2,
  Coins,
  ShieldCheck,
  Award,
  ArrowRight,
  Split,
  Layers,
  CircleDollarSign,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Types ---

export interface ChipItem {
  id: string;
  type: 'asset' | 'debt'; // asset: piros (+1), debt: kék (-1)
  isNew?: boolean;
  isPair?: boolean;
  pairId?: string;
  isMarkedForRemoval?: boolean;
  isCancelling?: boolean;
}

export type ToolMode = 'demonstrator' | 'sandbox' | 'quiz' | 'theory';

export interface Presets {
  id: string;
  label: string;
  a: number;
  op: '+' | '-';
  b: number;
  description: string;
  badge?: string;
}

export const PRESETS: Presets[] = [
  {
    id: 'p1',
    label: '5 + (+3)',
    a: 5,
    op: '+',
    b: 3,
    description: '5 vagyonnal indulsz, és még kapsz 3 vagyont',
    badge: 'Alapeset'
  },
  {
    id: 'p2',
    label: '5 + (-3)',
    a: 5,
    op: '+',
    b: -3,
    description: '5 vagyonhoz még kapsz 3 adósságot (nullapárok képzése)',
    badge: 'Nullapárok'
  },
  {
    id: 'p3',
    label: '(-4) + (+6)',
    a: -4,
    op: '+',
    b: 6,
    description: '4 adóssághoz érkezik 6 vagyon (kiejtik egymást, +2 marad)',
    badge: 'Kiejtés'
  },
  {
    id: 'p4',
    label: '(-3) + (-2)',
    a: -3,
    op: '+',
    b: -2,
    description: '3 adóssághoz még további 2 adósság adódik',
    badge: 'Adósság halmozás'
  },
  {
    id: 'p5',
    label: '5 - (+3)',
    a: 5,
    op: '-',
    b: 3,
    description: '5 vagyonból egyszerűen elveszünk 3 vagyont',
    badge: 'Kivonás'
  },
  {
    id: 'p6',
    label: '2 - (+5)',
    a: 2,
    op: '-',
    b: 5,
    description: '2 vagyonból el kell venni 5 vagyont: 3 nullapár hozzáadása szükséges!',
    badge: 'Nullapár-elv'
  },
  {
    id: 'p7',
    label: '5 - (-3)',
    a: 5,
    op: '-',
    b: -3,
    description: '5 vagyonból el kell venni 3 adósságot: 3 nullapár hozzáadása, majd kékek elvétele!',
    badge: 'Kulcs fogalom'
  },
  {
    id: 'p8',
    label: '(-2) - (-5)',
    a: -2,
    op: '-',
    b: -5,
    description: '2 adósságból el kell venni 5 adósságot: 3 nullapár hozzáadása szükséges!',
    badge: 'Adósság elengedése'
  },
  {
    id: 'p9',
    label: '(-3) - (+2)',
    a: -3,
    op: '-',
    b: 2,
    description: '3 adósságból el kell venni 2 vagyont: 2 nullapár hozzáadása szükséges!',
    badge: 'Haladó'
  }
];

// --- Audio Synthesizer (Web Audio API) ---

class SoundEffects {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop(pitch: number = 440) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 0.5, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Ignore audio errors
    }
  }

  playPair() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      [523.25, 659.25].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * 0.04);
        gain.gain.setValueAtTime(0.12, t + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.04 + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t + idx * 0.04);
        osc.stop(t + idx * 0.04 + 0.16);
      });
    } catch {}
  }

  playCancel() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(800, t + 0.12);
      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.16);
    } catch {}
  }

  playSuccess() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * 0.06);
        gain.gain.setValueAtTime(0.15, t + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.06 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t + idx * 0.06);
        osc.stop(t + idx * 0.06 + 0.22);
      });
    } catch {}
  }
}

const sfx = new SoundEffects();

// --- Chip Visual Component ---

export function Chip({
  item,
  onClick,
  onRemove,
  showRemoveButton = false,
  size = 'md',
  isHighlighted = false,
  animating = false
}: {
  item: ChipItem;
  onClick?: () => void;
  onRemove?: () => void;
  showRemoveButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
  isHighlighted?: boolean;
  animating?: boolean;
}) {
  const isAsset = item.type === 'asset';

  const sizeClasses = {
    sm: 'w-10 h-10 text-sm shadow-sm',
    md: 'w-14 h-14 sm:w-16 sm:h-16 text-lg sm:text-xl shadow-md',
    lg: 'w-20 h-20 text-2xl shadow-lg'
  }[size];

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative rounded-full select-none font-black flex flex-col items-center justify-center transition-all duration-300 transform',
        sizeClasses,
        isAsset
          ? 'bg-gradient-to-br from-rose-400 via-rose-500 to-red-700 text-white border-2 border-rose-200/80 shadow-rose-500/25 ring-2 ring-rose-400/30'
          : 'bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-700 text-white border-2 border-blue-200/80 shadow-blue-500/25 ring-2 ring-blue-400/30',
        onClick && 'cursor-pointer hover:scale-110 active:scale-95',
        isHighlighted && 'ring-4 ring-amber-400 ring-offset-2 animate-bounce',
        item.isMarkedForRemoval && 'opacity-35 scale-90 grayscale-[40%] border-dashed',
        item.isCancelling && 'animate-ping opacity-0 scale-50 duration-700',
        item.isNew && 'animate-in fade-in zoom-in-50 duration-300'
      )}
      style={{
        textShadow: '0 2px 4px rgba(0,0,0,0.4)',
        boxShadow: isAsset
          ? 'inset 0 3px 6px rgba(255,255,255,0.4), inset 0 -4px 6px rgba(0,0,0,0.3), 0 8px 16px -4px rgba(225,29,72,0.4)'
          : 'inset 0 3px 6px rgba(255,255,255,0.4), inset 0 -4px 6px rgba(0,0,0,0.3), 0 8px 16px -4px rgba(37,99,235,0.4)'
      }}
    >
      {/* Light sheen reflection highlight */}
      <div className="absolute top-1 left-2 right-2 h-1/3 rounded-full bg-white/25 pointer-events-none blur-[0.5px]" />

      <div className="relative z-10 flex flex-col items-center justify-center leading-none">
        <span className="font-extrabold tracking-tight">
          {isAsset ? '+1' : '-1'}
        </span>
        {size !== 'sm' && (
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider opacity-90 mt-0.5">
            {isAsset ? 'Vagyon' : 'Adósság'}
          </span>
        )}
      </div>

      {showRemoveButton && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-900/80 hover:bg-rose-600 text-white text-xs flex items-center justify-center border border-white/60 transition-colors shadow-sm"
          title="Korong elvétele"
        >
          ×
        </button>
      )}
    </div>
  );
}

// --- Zero Pair Visual Capsule ---

export function ZeroPairCapsule({
  pair,
  onRemove,
  isCancelling = false
}: {
  pair: { asset: ChipItem; debt: ChipItem; id: string };
  onRemove?: () => void;
  isCancelling?: boolean;
}) {
  return (
    <div
      className={cn(
        'relative inline-flex items-center gap-2 p-2 rounded-2xl border-2 border-dashed border-amber-400/80 bg-amber-500/10 dark:bg-amber-400/5 transition-all duration-300 group',
        isCancelling && 'animate-pulse scale-95 opacity-40'
      )}
    >
      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1 whitespace-nowrap">
        <span>0</span>
        <span className="opacity-75">Nullapár</span>
      </div>

      <Chip item={pair.asset} size="sm" />
      <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-xs">+</span>
      <Chip item={pair.debt} size="sm" />

      {onRemove && (
        <button
          onClick={onRemove}
          className="w-5 h-5 ml-0.5 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-rose-500 hover:text-white text-slate-500 text-xs flex items-center justify-center transition-colors"
          title="Nullapár törlése"
        >
          ×
        </button>
      )}
    </div>
  );
}

// --- Main Tool Component ---

export function DebtAssetModelTool({ onBack }: { onBack: () => void }) {
  // Navigation / Tabs
  const [mode, setMode] = useState<ToolMode>('demonstrator');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // --- DEMONSTRATOR STATE ---
  const [selectedPresetId, setSelectedPresetId] = useState<string>('p1');
  const [firstVal, setFirstVal] = useState<number>(5);
  const [operation, setOperation] = useState<'+' | '-'>('+');
  const [secondVal, setSecondVal] = useState<number>(3);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);

  // --- SANDBOX STATE ---
  const [sandboxItems, setSandboxItems] = useState<ChipItem[]>([
    { id: 'sb-1', type: 'asset' },
    { id: 'sb-2', type: 'asset' },
    { id: 'sb-3', type: 'asset' },
    { id: 'sb-4', type: 'debt' },
    { id: 'sb-5', type: 'debt' }
  ]);
  const [pairGroupingView, setPairGroupingView] = useState<boolean>(true);

  // --- QUIZ STATE ---
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizRound, setQuizRound] = useState<number>(1);
  const [quizProblem, setQuizProblem] = useState<{
    type: 'read-value' | 'make-value' | 'needed-pairs' | 'solve-op';
    title: string;
    description: string;
    targetVal?: number;
    chips?: ChipItem[];
    options?: (number | string)[];
    correctAnswer: number | string;
    explanation: string;
  } | null>(null);
  const [quizUserAnswer, setQuizUserAnswer] = useState<any>(null);
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Sync sound settings
  useEffect(() => {
    sfx.enabled = soundEnabled;
  }, [soundEnabled]);

  // Load a preset into demonstrator
  const loadPreset = (preset: Presets) => {
    setSelectedPresetId(preset.id);
    setFirstVal(preset.a);
    setOperation(preset.op);
    setSecondVal(preset.b);
    setStepIndex(0);
    setIsPlayingAuto(false);
    sfx.playPop(520);
  };

  // --- Demonstrator Derivation Steps Engine ---
  // Steps breakdown:
  // 0: Kiindulás (Első érték felrakása)
  // 1: Művelet értelmezése (Mit kell tenni: hozzáadni vagy elvenni?)
  // 2: Nullapárok szükségességének vizsgálata és hozzáadása (ha kivonásnál nincs elég korong)
  // 3: Művelet végrehajtása (Elvétel vagy hozzáadás)
  // 4: Nullapárok képzése és kiejtése (1 vagyon + 1 adósság kiejti egymást)
  // 5: Végeredmény leolvasása és algebrai összegzés

  const demonstratorSteps = useMemo(() => {
    const a = firstVal;
    const op = operation;
    const b = secondVal;

    // Is second value positive or negative?
    const bIsPositive = b >= 0;
    const bAbs = Math.abs(b);

    // Initial chips for 'a'
    const initialAssetCount = a > 0 ? a : 0;
    const initialDebtCount = a < 0 ? Math.abs(a) : 0;

    // Needed zero pairs check for subtraction:
    // When subtracting positive b: we need bAbs assets. If initialAssetCount < bAbs, we need (bAbs - initialAssetCount) zero pairs.
    // When subtracting negative b: we need bAbs debts. If initialDebtCount < bAbs, we need (bAbs - initialDebtCount) zero pairs.
    let neededPairs = 0;
    let missingChipType: 'asset' | 'debt' = 'asset';

    if (op === '-') {
      if (bIsPositive) {
        missingChipType = 'asset';
        if (initialAssetCount < bAbs) {
          neededPairs = bAbs - initialAssetCount;
        }
      } else {
        missingChipType = 'debt';
        if (initialDebtCount < bAbs) {
          neededPairs = bAbs - initialDebtCount;
        }
      }
    }

    const result = op === '+' ? a + b : a - b;

    const steps = [
      {
        stepNumber: 1,
        title: '1. Kezdőállapot: Első tag felhelyezése',
        formula: `${a >= 0 ? `+${a}` : a}`,
        desc:
          a === 0
            ? '0-val, vagyis üres táblával indulsz.'
            : a > 0
            ? `${a} vagyonnal (+${a}) indulsz: kitettünk ${a} db piros korongot.`
            : `${Math.abs(a)} adóssággal (${a}) indulsz: kitettünk ${Math.abs(a)} db kék korongot.`,
        assetsCount: initialAssetCount,
        debtsCount: initialDebtCount,
        zeroPairsCount: 0,
        highlightAction: 'initial',
        markedRemoval: 0,
        markedType: null as 'asset' | 'debt' | null
      },
      {
        stepNumber: 2,
        title: '2. Művelet értelmezése',
        formula: `${a >= 0 ? `(+${a})` : `(${a})`} ${op} ${b >= 0 ? `(+${b})` : `(${b})`}`,
        desc:
          op === '+'
            ? bIsPositive
              ? `Hozzá kell adnunk ${bAbs} vagyont (+${bAbs}), azaz ${bAbs} db piros korong érkezik a táblára.`
              : `Hozzá kell adnunk ${bAbs} adósságot (${b}), azaz ${bAbs} db kék korong érkezik a táblára.`
            : bIsPositive
            ? `El kell vennünk ${bAbs} vagyont (+${bAbs}), azaz ${bAbs} db piros korongot kell leszednünk a tábláról.`
            : `El kell vennünk ${bAbs} adósságot (${b}), azaz ${bAbs} db kék korongot kell leszednünk a tábláról.`,
        assetsCount: initialAssetCount,
        debtsCount: initialDebtCount,
        zeroPairsCount: 0,
        highlightAction: 'explain',
        markedRemoval: 0,
        markedType: null
      }
    ];

    // If zero pairs are needed: insert the zero-pair rule step!
    if (op === '-' && neededPairs > 0) {
      steps.push({
        stepNumber: 3,
        title: '3. Nullapár-szabály: Korongok pótlása',
        formula: `${a >= 0 ? `(+${a})` : `(${a})`} + ${neededPairs} × [(+1) + (-1)]`,
        desc: `Nincs elegendő ${
          missingChipType === 'asset' ? 'piros korong (vagyon)' : 'kék korong (adósság)'
        } az elvételhez! Hozzáadunk ${neededPairs} db nullapárt (${neededPairs} pirosat és ${neededPairs} kéket egyszerre). Mivel (+1) + (-1) = 0, az összérték NEM változik!`,
        assetsCount: initialAssetCount + (missingChipType === 'debt' ? neededPairs : 0),
        debtsCount: initialDebtCount + (missingChipType === 'asset' ? neededPairs : 0),
        zeroPairsCount: neededPairs,
        highlightAction: 'add-pairs',
        markedRemoval: 0,
        markedType: null
      });
    }

    // Step: Perform addition or mark removal
    if (op === '+') {
      steps.push({
        stepNumber: steps.length + 1,
        title: '3. Korongok hozzáadása a táblához',
        formula: `${a >= 0 ? `(+${a})` : `(${a})`} + ${b >= 0 ? `(+${b})` : `(${b})`}`,
        desc: bIsPositive
          ? `Megérkezett még ${bAbs} piros korong a táblára.`
          : `Megérkezett még ${bAbs} kék korong a táblára.`,
        assetsCount: initialAssetCount + (bIsPositive ? bAbs : 0),
        debtsCount: initialDebtCount + (!bIsPositive ? bAbs : 0),
        zeroPairsCount: 0,
        highlightAction: 'added',
        markedRemoval: 0,
        markedType: null
      });
    } else {
      // Subtraction step
      steps.push({
        stepNumber: steps.length + 1,
        title: `${steps.length + 1}. Elvétel végrehajtása`,
        formula: `${a >= 0 ? `(+${a})` : `(${a})`} - ${b >= 0 ? `(+${b})` : `(${b})`}`,
        desc: bIsPositive
          ? `Most már el tudunk venni ${bAbs} db piros korongot (vagyont)!`
          : `Most már el tudunk venni ${bAbs} db kék korongot (adósságot)!`,
        assetsCount:
          initialAssetCount + (neededPairs > 0 && missingChipType === 'debt' ? neededPairs : 0) -
          (bIsPositive ? bAbs : 0),
        debtsCount:
          initialDebtCount + (neededPairs > 0 && missingChipType === 'asset' ? neededPairs : 0) -
          (!bIsPositive ? bAbs : 0),
        zeroPairsCount: 0,
        highlightAction: 'removed',
        markedRemoval: bAbs,
        markedType: bIsPositive ? 'asset' : 'debt'
      });
    }

    // Cancellation of zero pairs step (if both positive and negative chips remain)
    const currentAssets =
      op === '+'
        ? initialAssetCount + (bIsPositive ? bAbs : 0)
        : initialAssetCount + (neededPairs > 0 && missingChipType === 'debt' ? neededPairs : 0) -
          (bIsPositive ? bAbs : 0);
    const currentDebts =
      op === '+'
        ? initialDebtCount + (!bIsPositive ? bAbs : 0)
        : initialDebtCount + (neededPairs > 0 && missingChipType === 'asset' ? neededPairs : 0) -
          (!bIsPositive ? bAbs : 0);

    const cancellablePairs = Math.min(currentAssets, currentDebts);

    if (cancellablePairs > 0) {
      steps.push({
        stepNumber: steps.length + 1,
        title: `${steps.length + 1}. Nullapárok kiejtése (Semlegesítés)`,
        formula: `${cancellablePairs} × [(+1) + (-1) = 0]`,
        desc: `A táblán lévő ${cancellablePairs} piros és ${cancellablePairs} kék korong páronként kiejti egymást, mivel egy vagyon és egy adósság kiegyenlíti egymást (+1 - 1 = 0).`,
        assetsCount: currentAssets - cancellablePairs,
        debtsCount: currentDebts - cancellablePairs,
        zeroPairsCount: cancellablePairs,
        highlightAction: 'cancel-pairs',
        markedRemoval: 0,
        markedType: null
      });
    }

    // Final result step
    const finalAssets = Math.max(0, result);
    const finalDebts = Math.max(0, -result);

    steps.push({
      stepNumber: steps.length + 1,
      title: `${steps.length + 1}. Végeredmény leolvasása`,
      formula: `${a >= 0 ? `(+${a})` : `(${a})`} ${op} ${b >= 0 ? `(+${b})` : `(${b})`} = ${
        result >= 0 ? `+${result}` : result
      }`,
      desc:
        result === 0
          ? 'Minden korong kiejtette egymást: a végeredmény 0 (kiegyenlített egyenleg).'
          : result > 0
          ? `A táblán ${finalAssets} db piros korong maradt, tehát az eredmény: +${result} (vagyon).`
          : `A táblán ${finalDebts} db kék korong maradt, tehát az eredmény: ${result} (adósság).`,
      assetsCount: finalAssets,
      debtsCount: finalDebts,
      zeroPairsCount: 0,
      highlightAction: 'final',
      markedRemoval: 0,
      markedType: null
    });

    return steps;
  }, [firstVal, operation, secondVal]);

  // Clamp current step index
  const safeStepIndex = Math.min(stepIndex, demonstratorSteps.length - 1);
  const currentStep = demonstratorSteps[safeStepIndex];

  // Auto-play timer
  useEffect(() => {
    let timer: any;
    if (isPlayingAuto) {
      timer = setInterval(() => {
        setStepIndex((prev) => {
          if (prev >= demonstratorSteps.length - 1) {
            setIsPlayingAuto(false);
            return prev;
          }
          sfx.playPop(480 + prev * 40);
          return prev + 1;
        });
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlayingAuto, demonstratorSteps.length]);

  // Next and prev step handlers
  const handleNextStep = () => {
    if (safeStepIndex < demonstratorSteps.length - 1) {
      setStepIndex((prev) => prev + 1);
      sfx.playPop(520);
    }
  };

  const handlePrevStep = () => {
    if (safeStepIndex > 0) {
      setStepIndex((prev) => prev - 1);
      sfx.playPop(400);
    }
  };

  const handleResetStep = () => {
    setStepIndex(0);
    setIsPlayingAuto(false);
    sfx.playPop(350);
  };

  // --- SANDBOX HELPERS ---

  const addSandboxAsset = (count: number = 1) => {
    const newItems: ChipItem[] = Array.from({ length: count }).map(() => ({
      id: `asset-${Date.now()}-${Math.random()}`,
      type: 'asset',
      isNew: true
    }));
    setSandboxItems((prev) => [...prev, ...newItems]);
    sfx.playPop(600);
  };

  const addSandboxDebt = (count: number = 1) => {
    const newItems: ChipItem[] = Array.from({ length: count }).map(() => ({
      id: `debt-${Date.now()}-${Math.random()}`,
      type: 'debt',
      isNew: true
    }));
    setSandboxItems((prev) => [...prev, ...newItems]);
    sfx.playPop(350);
  };

  const addSandboxZeroPair = (count: number = 1) => {
    const newItems: ChipItem[] = [];
    for (let i = 0; i < count; i++) {
      const pId = `pair-${Date.now()}-${i}`;
      newItems.push({ id: `asset-${pId}`, type: 'asset', isPair: true, pairId: pId, isNew: true });
      newItems.push({ id: `debt-${pId}`, type: 'debt', isPair: true, pairId: pId, isNew: true });
    }
    setSandboxItems((prev) => [...prev, ...newItems]);
    sfx.playPair();
  };

  const removeSandboxItem = (id: string) => {
    setSandboxItems((prev) => prev.filter((item) => item.id !== id));
    sfx.playPop(300);
  };

  const cancelSandboxPairs = () => {
    const assets = sandboxItems.filter((i) => i.type === 'asset');
    const debts = sandboxItems.filter((i) => i.type === 'debt');
    const cancellable = Math.min(assets.length, debts.length);

    if (cancellable === 0) return;

    // Keep the difference
    const remainingAssets = assets.slice(cancellable);
    const remainingDebts = debts.slice(cancellable);
    setSandboxItems([...remainingAssets, ...remainingDebts]);
    sfx.playCancel();
  };

  const clearSandbox = () => {
    setSandboxItems([]);
    sfx.playPop(250);
  };

  // Sandbox Totals
  const sandboxStats = useMemo(() => {
    const assets = sandboxItems.filter((i) => i.type === 'asset');
    const debts = sandboxItems.filter((i) => i.type === 'debt');
    const pairsCount = Math.min(assets.length, debts.length);
    const netValue = assets.length - debts.length;

    // Grouping pairs
    const pairs: { asset: ChipItem; debt: ChipItem; id: string }[] = [];
    for (let i = 0; i < pairsCount; i++) {
      pairs.push({
        id: `pair-${i}`,
        asset: assets[i],
        debt: debts[i]
      });
    }

    const singleAssets = assets.slice(pairsCount);
    const singleDebts = debts.slice(pairsCount);

    return {
      assetsCount: assets.length,
      debtsCount: debts.length,
      pairsCount,
      netValue,
      pairs,
      singleAssets,
      singleDebts
    };
  }, [sandboxItems]);

  // --- QUIZ GENERATOR ---

  const generateQuizProblem = () => {
    const types: ('read-value' | 'make-value' | 'needed-pairs' | 'solve-op')[] = [
      'read-value',
      'needed-pairs',
      'solve-op',
      'read-value'
    ];
    const pickedType = types[Math.floor(Math.random() * types.length)];

    setQuizUserAnswer(null);
    setQuizFeedback(null);

    if (pickedType === 'read-value') {
      const aCount = Math.floor(Math.random() * 8) + 1;
      const dCount = Math.floor(Math.random() * 8) + 1;
      const net = aCount - dCount;
      const chips: ChipItem[] = [
        ...Array.from({ length: aCount }).map((_, i) => ({ id: `q-a-${i}`, type: 'asset' as const })),
        ...Array.from({ length: dCount }).map((_, i) => ({ id: `q-d-${i}`, type: 'debt' as const }))
      ];

      // Shuffle chips
      chips.sort(() => Math.random() - 0.5);

      const options = [net, net + 1, net - 1, aCount + dCount].sort(() => Math.random() - 0.5);

      setQuizProblem({
        type: 'read-value',
        title: 'Mekkora az egyenleg a táblán?',
        description: `A táblán ${aCount} db piros korong (+1) és ${dCount} db kék korong (-1) van. Mi a nettó érték?`,
        chips,
        options,
        correctAnswer: net,
        explanation: `${Math.min(aCount, dCount)} db nullapár kiejti egymást, így ${
          net >= 0 ? `${net} db piros korong (+${net})` : `${Math.abs(net)} db kék korong (${net})`
        } marad.`
      });
    } else if (pickedType === 'needed-pairs') {
      // Subtraction case where chips are missing
      const a = Math.floor(Math.random() * 6) + 1; // e.g. +3
      const bToTake = a + Math.floor(Math.random() * 4) + 1; // e.g. +5
      const needed = bToTake - a;

      const options = [needed, needed + 1, bToTake, a].sort(() => Math.random() - 0.5);

      setQuizProblem({
        type: 'needed-pairs',
        title: 'Hány nullapárt kell hozzáadnod?',
        description: `A táblán jelenleg ${a} db piros korong (+${a}) van. El szeretnénk venni ${bToTake} db piros korongot (+${bToTake}). Hány nullapárt kell feltenned a táblára, hogy el tudd venni a szükséges mennyiséget?`,
        options,
        correctAnswer: needed,
        explanation: `Jelenleg csak ${a} piros korong van, de ${bToTake} darabra van szükségünk. Ezért ${needed} db nullapárt kell hozzáadni, ami ${needed} pirosat és ${needed} kéket hoz be, miközben az összérték nem változik!`
      });
    } else {
      // solve-op
      const a = Math.floor(Math.random() * 11) - 5; // -5 to 5
      const b = Math.floor(Math.random() * 11) - 5;
      const op: '+' | '-' = Math.random() > 0.5 ? '+' : '-';
      const ans = op === '+' ? a + b : a - b;

      const wrong1 = ans + 2;
      const wrong2 = ans - 2;
      const wrong3 = op === '+' ? a - b : a + b;
      const options = Array.from(new Set([ans, wrong1, wrong2, wrong3])).slice(0, 4);
      options.sort(() => Math.random() - 0.5);

      setQuizProblem({
        type: 'solve-op',
        title: 'Számold ki korongos gondolkodással!',
        description: `Mennyi az eredmény? (${a >= 0 ? `+${a}` : a}) ${op} (${b >= 0 ? `+${b}` : b}) = ?`,
        options,
        correctAnswer: ans,
        explanation:
          op === '-' && b < 0
            ? `Negatív szám kivonása adósság elvételét jelenti! Mivel adósságot veszel el, a vagyonod nő: (${a}) - (${b}) = ${a} + ${Math.abs(
                b
              )} = ${ans}.`
            : `A korongok kirakásával és a nullapárok képzésével a kapott érték: ${ans}.`
      });
    }
  };

  // Start quiz on mount if needed
  useEffect(() => {
    if (mode === 'quiz' && !quizProblem) {
      generateQuizProblem();
    }
  }, [mode]);

  const handleQuizSubmit = (selected: any) => {
    if (!quizProblem) return;
    setQuizUserAnswer(selected);
    const isCorrect = selected === quizProblem.correctAnswer;
    if (isCorrect) {
      setQuizScore((prev) => prev + 10);
      setQuizFeedback({
        isCorrect: true,
        message: 'Kiváló válasz! Pontosan így működik a vagyon-adósság modell!'
      });
      sfx.playSuccess();
    } else {
      setQuizFeedback({
        isCorrect: false,
        message: `Nem pontos. A helyes válasz: ${quizProblem.correctAnswer}.`
      });
      sfx.playPop(260);
    }
  };

  const handleNextQuizRound = () => {
    setQuizRound((prev) => prev + 1);
    generateQuizProblem();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-3 sm:p-6 transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={onBack}
              className="rounded-2xl shrink-0 hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Vissza a menühöz"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 font-bold px-2.5 py-0.5 rounded-full text-xs"
                >
                  🔵🔴 Interaktív Manipulatív Eszköz
                </Badge>
                <Badge
                  variant="outline"
                  className="border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-400 font-semibold text-xs"
                >
                  5–6. Osztály
                </Badge>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight mt-1 flex items-center gap-2 text-slate-900 dark:text-white">
                Adósság és Vagyon Modell
                <span className="text-base sm:text-lg font-normal text-slate-500 dark:text-slate-400">
                  (Piros-kék korongok)
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 self-end md:self-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              title={soundEnabled ? 'Hangok némítása' : 'Hangok bekapcsolása'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-indigo-600" /> : <VolumeX className="w-5 h-5" />}
            </Button>

            <Tabs
              value={mode}
              onValueChange={(val) => setMode(val as ToolMode)}
              className="bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl"
            >
              <TabsList className="bg-transparent h-9 p-0 gap-1">
                <TabsTrigger
                  value="demonstrator"
                  className="rounded-xl text-xs sm:text-sm font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm"
                >
                  🎓 Műveletvezető
                </TabsTrigger>
                <TabsTrigger
                  value="sandbox"
                  className="rounded-xl text-xs sm:text-sm font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm"
                >
                  🧪 Szabad Műhely
                </TabsTrigger>
                <TabsTrigger
                  value="quiz"
                  className="rounded-xl text-xs sm:text-sm font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm"
                >
                  🎯 Gyakorló Kvíz
                </TabsTrigger>
                <TabsTrigger
                  value="theory"
                  className="rounded-xl text-xs sm:text-sm font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm"
                >
                  📖 Kisokos
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* --- 1. DEMONSTRATOR MODE (MŰVELETVEZETŐ) --- */}
        {mode === 'demonstrator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Control Column (Presets & Custom Operation) */}
            <div className="lg:col-span-4 space-y-5">
              {/* Presets Card */}
              <Card className="rounded-3xl border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-4 bg-slate-100/70 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                      Iskolai Mintapéldák
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">Válassz egyet!</span>
                </div>
                <CardContent className="p-3 sm:p-4 space-y-2 max-h-[340px] overflow-y-auto">
                  {PRESETS.map((preset) => {
                    const isSelected = selectedPresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => loadPreset(preset)}
                        className={cn(
                          'w-full text-left p-3 rounded-2xl border transition-all flex items-start justify-between gap-2',
                          isSelected
                            ? 'bg-indigo-50 border-indigo-300 dark:bg-indigo-950/40 dark:border-indigo-700 shadow-sm ring-1 ring-indigo-400'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-200 hover:bg-slate-50 dark:hover:bg-slate-850'
                        )}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-base text-slate-900 dark:text-white">
                              {preset.label}
                            </span>
                            {preset.badge && (
                              <Badge
                                variant="outline"
                                className={cn(
                                  'text-[10px] font-bold px-1.5 py-0',
                                  isSelected
                                    ? 'border-indigo-300 text-indigo-700 dark:text-indigo-300'
                                    : 'text-slate-500'
                                )}
                              >
                                {preset.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                            {preset.description}
                          </p>
                        </div>
                        <ArrowRight
                          className={cn(
                            'w-4 h-4 mt-1 transition-transform',
                            isSelected ? 'text-indigo-600 translate-x-1' : 'text-slate-400'
                          )}
                        />
                      </button>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Custom Operation Creator */}
              <Card className="rounded-3xl border-slate-200/80 dark:border-slate-800 shadow-sm p-4 sm:p-5">
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-blue-600" />
                  Egyedi Művelet Beállítása
                </h3>
                <div className="flex items-center justify-center gap-2 sm:gap-3 py-2 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  {/* First value */}
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase">1. Tag</span>
                    <div className="flex items-center gap-1 mt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 w-7 p-0 rounded-lg"
                        onClick={() => {
                          setFirstVal((prev) => Math.max(-10, prev - 1));
                          setSelectedPresetId('');
                          setStepIndex(0);
                        }}
                      >
                        -
                      </Button>
                      <span className="w-10 text-center font-mono font-black text-lg">
                        {firstVal >= 0 ? `+${firstVal}` : firstVal}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 w-7 p-0 rounded-lg"
                        onClick={() => {
                          setFirstVal((prev) => Math.min(10, prev + 1));
                          setSelectedPresetId('');
                          setStepIndex(0);
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* Operation */}
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase">Művelet</span>
                    <div className="flex gap-1 mt-1">
                      <Button
                        size="sm"
                        variant={operation === '+' ? 'default' : 'outline'}
                        className={cn('h-7 w-8 font-mono font-bold rounded-lg', operation === '+' && 'bg-blue-600')}
                        onClick={() => {
                          setOperation('+');
                          setSelectedPresetId('');
                          setStepIndex(0);
                        }}
                      >
                        +
                      </Button>
                      <Button
                        size="sm"
                        variant={operation === '-' ? 'default' : 'outline'}
                        className={cn('h-7 w-8 font-mono font-bold rounded-lg', operation === '-' && 'bg-rose-600')}
                        onClick={() => {
                          setOperation('-');
                          setSelectedPresetId('');
                          setStepIndex(0);
                        }}
                      >
                        −
                      </Button>
                    </div>
                  </div>

                  {/* Second value */}
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase">2. Tag</span>
                    <div className="flex items-center gap-1 mt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 w-7 p-0 rounded-lg"
                        onClick={() => {
                          setSecondVal((prev) => Math.max(-10, prev - 1));
                          setSelectedPresetId('');
                          setStepIndex(0);
                        }}
                      >
                        -
                      </Button>
                      <span className="w-10 text-center font-mono font-black text-lg">
                        {secondVal >= 0 ? `+${secondVal}` : secondVal}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 w-7 p-0 rounded-lg"
                        onClick={() => {
                          setSecondVal((prev) => Math.min(10, prev + 1));
                          setSelectedPresetId('');
                          setStepIndex(0);
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <span className="text-xs text-slate-500">Kifejezés: </span>
                  <span className="font-mono font-extrabold text-sm text-indigo-700 dark:text-indigo-400">
                    ({firstVal >= 0 ? `+${firstVal}` : firstVal}) {operation} (
                    {secondVal >= 0 ? `+${secondVal}` : secondVal})
                  </span>
                </div>
              </Card>

              {/* Rules summary reminder */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-900 dark:to-slate-800/80 border border-indigo-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-300 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  Alapszabályok röviden
                </div>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pl-1">
                  <li className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold">🔴</span>
                    <span>
                      <strong>1 Piros korong</strong> = +1 Vagyon (Megtakarítás)
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">🔵</span>
                    <span>
                      <strong>1 Kék korong</strong> = -1 Adósság (Tartozás)
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">⚪</span>
                    <span>
                      <strong>1 Piros + 1 Kék</strong> = 0 (Nullapár, kiejtik egymást)
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-indigo-600 font-bold">💡</span>
                    <span>
                      Bármikor adhatsz hozzá <strong>nullapárokat</strong>, az egyenleg nem változik!
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Interactive Board Column */}
            <div className="lg:col-span-8 space-y-5">
              {/* Stepper Navigation Bar */}
              <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-indigo-600 text-white font-mono px-2.5 py-1 text-xs rounded-xl">
                      Lépés {safeStepIndex + 1} / {demonstratorSteps.length}
                    </Badge>
                    <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      {currentStep.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleResetStep}
                      className="rounded-xl h-8 px-2.5 text-xs gap-1"
                      title="Újrakezdés az 1. lépéstől"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Újra
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevStep}
                      disabled={safeStepIndex === 0}
                      className="rounded-xl h-8 px-2.5 text-xs gap-1"
                    >
                      <SkipBack className="w-3.5 h-3.5" />
                      Vissza
                    </Button>
                    <Button
                      variant={safeStepIndex === demonstratorSteps.length - 1 ? 'outline' : 'default'}
                      size="sm"
                      onClick={handleNextStep}
                      disabled={safeStepIndex === demonstratorSteps.length - 1}
                      className={cn(
                        'rounded-xl h-8 px-3 text-xs gap-1 font-bold',
                        safeStepIndex !== demonstratorSteps.length - 1 && 'bg-indigo-600 hover:bg-indigo-700'
                      )}
                    >
                      Tovább
                      <SkipForward className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setIsPlayingAuto(!isPlayingAuto)}
                      className="rounded-xl h-8 px-2.5 text-xs gap-1"
                      title="Automatikus lejátszás"
                    >
                      {isPlayingAuto ? (
                        <>
                          <Pause className="w-3.5 h-3.5 text-amber-600" />
                          Szünet
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 text-emerald-600" />
                          Lejátszás
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Step indicator progress track */}
                <div className="grid grid-cols-5 sm:grid-cols-6 gap-1.5 pt-1">
                  {demonstratorSteps.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setStepIndex(idx);
                        sfx.playPop(450 + idx * 30);
                      }}
                      className={cn(
                        'h-2 rounded-full transition-all duration-300',
                        idx === safeStepIndex
                          ? 'bg-indigo-600 ring-2 ring-indigo-300 dark:ring-indigo-700'
                          : idx < safeStepIndex
                          ? 'bg-indigo-300 dark:bg-indigo-800'
                          : 'bg-slate-200 dark:bg-slate-800'
                      )}
                      title={`Ugrás ide: ${step.title}`}
                    />
                  ))}
                </div>

                {/* Explanation Card */}
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-indigo-700 dark:text-indigo-400">
                      {currentStep.formula}
                    </span>
                    {currentStep.zeroPairsCount > 0 && (
                      <Badge className="bg-amber-500 text-slate-950 text-[10px] font-black">
                        {currentStep.zeroPairsCount} db Nullapár
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                    {currentStep.desc}
                  </p>
                </div>
              </div>

              {/* Demonstrator Board Display */}
              <Card className="rounded-3xl border-slate-200/80 dark:border-slate-800 shadow-md overflow-hidden bg-slate-900/5 dark:bg-slate-900/40 backdrop-blur-sm">
                <div className="p-4 bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {currentStep.assetsCount} Vagyon (+{currentStep.assetsCount})
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {currentStep.debtsCount} Adósság (-{currentStep.debtsCount})
                      </span>
                    </div>
                  </div>

                  {/* Net Value Pill */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">Aktuális egyenleg:</span>
                    <Badge
                      className={cn(
                        'text-sm font-black px-3 py-1 rounded-xl shadow-sm',
                        currentStep.assetsCount - currentStep.debtsCount > 0
                          ? 'bg-rose-600 text-white'
                          : currentStep.assetsCount - currentStep.debtsCount < 0
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-600 text-white'
                      )}
                    >
                      {currentStep.assetsCount - currentStep.debtsCount > 0
                        ? `+${currentStep.assetsCount - currentStep.debtsCount} Ft (Vagyon)`
                        : currentStep.assetsCount - currentStep.debtsCount < 0
                        ? `${currentStep.assetsCount - currentStep.debtsCount} Ft (Adósság)`
                        : '0 Ft (Kiegyenlített)'}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 sm:p-10 min-h-[360px] flex flex-col items-center justify-center gap-6">
                  {/* When board is empty */}
                  {currentStep.assetsCount === 0 && currentStep.debtsCount === 0 && (
                    <div className="text-center py-12 text-slate-400 dark:text-slate-500 space-y-2">
                      <CircleDollarSign className="w-12 h-12 mx-auto stroke-1 opacity-50" />
                      <p className="text-sm font-medium">A tábla üres (értéke 0 Ft).</p>
                    </div>
                  )}

                  {/* Normal or Paired View on board */}
                  <div className="w-full flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                    {/* Assets (Blue Chips) */}
                    {Array.from({ length: currentStep.assetsCount }).map((_, idx) => (
                      <Chip
                        key={`demo-asset-${idx}`}
                        item={{ id: `asset-${idx}`, type: 'asset' }}
                        size="md"
                        isHighlighted={
                          currentStep.highlightAction === 'added' && operation === '+' && secondVal > 0
                        }
                      />
                    ))}

                    {/* Debts (Red Chips) */}
                    {Array.from({ length: currentStep.debtsCount }).map((_, idx) => (
                      <Chip
                        key={`demo-debt-${idx}`}
                        item={{ id: `debt-${idx}`, type: 'debt' }}
                        size="md"
                        isHighlighted={
                          currentStep.highlightAction === 'added' && operation === '+' && secondVal < 0
                        }
                      />
                    ))}
                  </div>

                  {/* Visual reminder if zero-pairs were added */}
                  {currentStep.zeroPairsCount > 0 && currentStep.highlightAction === 'add-pairs' && (
                    <div className="p-3 bg-amber-500/10 border border-amber-400/50 rounded-2xl text-center text-xs font-semibold text-amber-800 dark:text-amber-300 animate-pulse">
                      ✨ A hozzáadott nullapárok összege (+1) + (-1) = 0, így nem módosítják a kezdő egyenleget!
                    </div>
                  )}

                  {/* Final step celebration */}
                  {currentStep.highlightAction === 'final' && (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-400/50 rounded-2xl text-center space-y-1">
                      <div className="flex items-center justify-center gap-2 text-emerald-700 dark:text-emerald-300 font-black text-lg">
                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        {firstVal >= 0 ? `(+${firstVal})` : `(${firstVal})`} {operation}{' '}
                        {secondVal >= 0 ? `(+${secondVal})` : `(${secondVal})`} ={' '}
                        <span className="underline decoration-wavy decoration-emerald-500">
                          {operation === '+' ? firstVal + secondVal : firstVal - secondVal}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-800 dark:text-emerald-200">
                        Sikeresen levezetted a műveletet az adósság-vagyon korongos modellel!
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* --- 2. SANDBOX MODE (SZABAD MŰHELY) --- */}
        {mode === 'sandbox' && (
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  onClick={() => addSandboxAsset(1)}
                  className="rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-bold gap-2 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  +1 Piros (Vagyon)
                </Button>
                <Button
                  onClick={() => addSandboxDebt(1)}
                  className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold gap-2 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  +1 Kék (Adósság)
                </Button>
                <Button
                  onClick={() => addSandboxZeroPair(1)}
                  variant="outline"
                  className="rounded-2xl border-2 border-dashed border-amber-500 text-amber-700 dark:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 font-bold gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  +1 Nullapár (Piros + Kék)
                </Button>

                {/* Quick Adders dropdown or buttons */}
                <div className="flex items-center gap-1 pl-2 border-l border-slate-200 dark:border-slate-800">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => addSandboxAsset(3)}
                    className="text-xs text-rose-600 font-bold"
                  >
                    +3 Piros
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => addSandboxDebt(3)}
                    className="text-xs text-blue-600 font-bold"
                  >
                    +3 Kék
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => addSandboxZeroPair(3)}
                    className="text-xs text-amber-600 font-bold"
                  >
                    +3 Pár
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={cancelSandboxPairs}
                  disabled={sandboxStats.pairsCount === 0}
                  className="rounded-xl border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-xs font-bold gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Nullapárok kiejtése ({sandboxStats.pairsCount})
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPairGroupingView(!pairGroupingView)}
                  className="rounded-xl text-xs gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5" />
                  {pairGroupingView ? 'Párosított nézet' : 'Szabad nézet'}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSandbox}
                  className="rounded-xl text-xs text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Törlés
                </Button>
              </div>
            </div>

            {/* Live Balance Dashboard */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <Card className="p-4 rounded-3xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center font-black text-lg">
                  🔴
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase">Piros (Vagyon)</span>
                  <div className="text-xl font-black text-slate-900 dark:text-white">
                    {sandboxStats.assetsCount} db
                  </div>
                </div>
              </Card>

              <Card className="p-4 rounded-3xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-lg">
                  🔵
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase">Kék (Adósság)</span>
                  <div className="text-xl font-black text-slate-900 dark:text-white">
                    {sandboxStats.debtsCount} db
                  </div>
                </div>
              </Card>

              <Card className="p-4 rounded-3xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-lg">
                  ⚪
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase">Nullapárok (=0)</span>
                  <div className="text-xl font-black text-amber-600 dark:text-amber-400">
                    {sandboxStats.pairsCount} pár
                  </div>
                </div>
              </Card>

              <Card
                className={cn(
                  'p-4 rounded-3xl border flex items-center gap-3 transition-colors',
                  sandboxStats.netValue > 0
                    ? 'bg-rose-50/70 border-rose-200 dark:bg-rose-950/30 dark:border-rose-800'
                    : sandboxStats.netValue < 0
                    ? 'bg-blue-50/70 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800'
                    : 'bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-800'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg',
                    sandboxStats.netValue > 0
                      ? 'bg-rose-600 text-white'
                      : sandboxStats.netValue < 0
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-600 text-white'
                  )}
                >
                  {sandboxStats.netValue > 0 ? (
                    <TrendingUp className="w-5 h-5" />
                  ) : sandboxStats.netValue < 0 ? (
                    <TrendingDown className="w-5 h-5" />
                  ) : (
                    <Coins className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase">Nettó Egyenleg</span>
                  <div
                    className={cn(
                      'text-xl font-black',
                      sandboxStats.netValue > 0
                        ? 'text-rose-700 dark:text-rose-300'
                        : sandboxStats.netValue < 0
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-slate-700 dark:text-slate-300'
                    )}
                  >
                    {sandboxStats.netValue > 0
                      ? `+${sandboxStats.netValue} (Vagyon)`
                      : sandboxStats.netValue < 0
                      ? `${sandboxStats.netValue} (Adósság)`
                      : '0 (Kiegyenlített)'}
                  </div>
                </div>
              </Card>
            </div>

            {/* Sandbox Workboard */}
            <Card className="rounded-3xl border-slate-200/80 dark:border-slate-800 shadow-md bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm min-h-[420px] p-6 relative">
              <div className="text-center mb-6">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  Munkaasztal • Kattints bármelyik korongra vagy a × gombra az elvételéhez!
                </span>
              </div>

              {sandboxItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center text-slate-400 space-y-3">
                  <Coins className="w-16 h-16 stroke-1 text-slate-300 dark:text-slate-700" />
                  <p className="text-base font-bold text-slate-600 dark:text-slate-400">
                    A táblán még nincsenek korongok.
                  </p>
                  <p className="text-xs text-slate-400 max-w-sm">
                    Használd a fenti gombokat kék korongok (vagyon), piros korongok (adósság) vagy komplett
                    nullapárok hozzáadásához!
                  </p>
                </div>
              ) : pairGroupingView ? (
                /* Paired structured view */
                <div className="space-y-6">
                  {/* Zero Pairs section if any */}
                  {sandboxStats.pairs.length > 0 && (
                    <div className="p-4 rounded-3xl bg-amber-500/5 border border-dashed border-amber-300/60 dark:border-amber-700/60 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          Összekapcsolt Nullapárok ({sandboxStats.pairs.length} db = 0 Ft)
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={cancelSandboxPairs}
                          className="h-7 text-xs text-amber-700 hover:text-amber-900 hover:bg-amber-100 font-bold"
                        >
                          Összes nullapár kiejtése
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {sandboxStats.pairs.map((p) => (
                          <ZeroPairCapsule
                            key={p.id}
                            pair={p}
                            onRemove={() => {
                              removeSandboxItem(p.asset.id);
                              removeSandboxItem(p.debt.id);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Remaining Single Chips */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {sandboxStats.singleAssets.length > 0 &&
                        `Fennmaradó Vagyon (+${sandboxStats.singleAssets.length})`}
                      {sandboxStats.singleDebts.length > 0 &&
                        `Fennmaradó Adósság (-${sandboxStats.singleDebts.length})`}
                      {sandboxStats.singleAssets.length === 0 &&
                        sandboxStats.singleDebts.length === 0 &&
                        'Nincs páratlan korong (Egyenleg: 0)'}
                    </span>

                    <div className="flex flex-wrap gap-4 items-center">
                      {sandboxStats.singleAssets.map((item) => (
                        <Chip
                          key={item.id}
                          item={item}
                          size="md"
                          showRemoveButton
                          onRemove={() => removeSandboxItem(item.id)}
                          onClick={() => removeSandboxItem(item.id)}
                        />
                      ))}
                      {sandboxStats.singleDebts.map((item) => (
                        <Chip
                          key={item.id}
                          item={item}
                          size="md"
                          showRemoveButton
                          onRemove={() => removeSandboxItem(item.id)}
                          onClick={() => removeSandboxItem(item.id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Free grid view */
                <div className="flex flex-wrap gap-4 items-center justify-center py-6">
                  {sandboxItems.map((item) => (
                    <Chip
                      key={item.id}
                      item={item}
                      size="md"
                      showRemoveButton
                      onRemove={() => removeSandboxItem(item.id)}
                      onClick={() => removeSandboxItem(item.id)}
                    />
                  ))}
                </div>
              )}
            </Card>
          </div>
        )}

        {/* --- 3. QUIZ MODE (GYAKORLÓ KVÍZ) --- */}
        {mode === 'quiz' && (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Quiz Header Card */}
            <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900 dark:text-white">Gyakorló Kihívás</h3>
                  <p className="text-xs text-slate-500">
                    {quizRound}. Forduló • Teszteld a korongos gondolkodást!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] font-semibold uppercase text-slate-400">Pontszám</span>
                  <div className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                    {quizScore} XP
                  </div>
                </div>
              </div>
            </div>

            {/* Quiz Problem Card */}
            {quizProblem && (
              <Card className="rounded-3xl border-slate-200/80 dark:border-slate-800 shadow-md p-6 sm:p-8 space-y-6 bg-white dark:bg-slate-900">
                <div className="space-y-2">
                  <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-bold">
                    {quizProblem.type === 'read-value'
                      ? 'Érték megállapítása'
                      : quizProblem.type === 'needed-pairs'
                      ? 'Nullapárok száma'
                      : 'Művelet megoldása'}
                  </Badge>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {quizProblem.title}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
                    {quizProblem.description}
                  </p>
                </div>

                {/* Display Chips for 'read-value' problem */}
                {quizProblem.chips && quizProblem.chips.length > 0 && (
                  <div className="p-6 bg-slate-50 dark:bg-slate-950/60 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-wrap gap-3 items-center justify-center min-h-[160px]">
                    {quizProblem.chips.map((chip) => (
                      <Chip key={chip.id} item={chip} size="sm" />
                    ))}
                  </div>
                )}

                {/* Options grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {quizProblem.options?.map((option, idx) => {
                    const isSelected = quizUserAnswer === option;
                    const isCorrect = option === quizProblem.correctAnswer;
                    const showFeedback = quizUserAnswer !== null;

                    let btnVariant = 'outline';
                    let extraClasses = 'border-slate-200 dark:border-slate-800 hover:border-indigo-300';

                    if (showFeedback) {
                      if (isCorrect) {
                        extraClasses =
                          'bg-emerald-50 border-emerald-400 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-600 dark:text-emerald-200 font-black ring-2 ring-emerald-400';
                      } else if (isSelected) {
                        extraClasses =
                          'bg-rose-50 border-rose-400 text-rose-800 dark:bg-rose-950/40 dark:border-rose-600 dark:text-rose-200 font-black';
                      }
                    } else if (isSelected) {
                      extraClasses = 'border-indigo-600 bg-indigo-50 font-bold';
                    }

                    return (
                      <Button
                        key={idx}
                        variant={btnVariant as any}
                        disabled={quizUserAnswer !== null}
                        onClick={() => handleQuizSubmit(option)}
                        className={cn(
                          'h-14 sm:h-16 text-lg sm:text-xl font-mono font-black rounded-2xl transition-all',
                          extraClasses
                        )}
                      >
                        {typeof option === 'number' && option > 0 ? `+${option}` : option}
                      </Button>
                    );
                  })}
                </div>

                {/* Feedback Box */}
                {quizFeedback && (
                  <div
                    className={cn(
                      'p-4 rounded-2xl border space-y-2 animate-in fade-in zoom-in-95',
                      quizFeedback.isCorrect
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                        : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                    )}
                  >
                    <div className="flex items-center gap-2 font-black text-sm">
                      {quizFeedback.isCorrect ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          Helyes megoldás! (+10 XP)
                        </>
                      ) : (
                        <>
                          <Info className="w-5 h-5 text-rose-600" />
                          Nézd meg a magyarázatot!
                        </>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm font-medium leading-relaxed">
                      {quizFeedback.message} {quizProblem.explanation}
                    </p>

                    <div className="pt-2 flex justify-end">
                      <Button
                        onClick={handleNextQuizRound}
                        className="rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white gap-2 shadow-sm"
                      >
                        Következő feladat
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            )}
          </div>
        )}

        {/* --- 4. THEORY & HANDBOOK MODE (KISOKOS) --- */}
        {mode === 'theory' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2 py-4">
              <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-bold px-3 py-1 text-xs">
                Pedagógiai Útmutató
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Hogyan működik az Adósság-Vagyon Modell?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                A negatív számokkal végzett műveletek kézzelfogható, vizuális alapja. A konkrét korongok
                segítenek megérteni az előjelszabályokat magolás nélkül!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1 */}
              <Card className="p-5 rounded-3xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 flex items-center justify-center font-black">
                  🔴
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  1. Piros Korong: A Vagyon (+1)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Minden egyes piros korong <strong>+1 Ft vagyont</strong>, megtakarítást vagy pozitív egész
                  számot képvisel. Ha több piros korongod van, gazdagabb vagy.
                </p>
              </Card>

              {/* Card 2 */}
              <Card className="p-5 rounded-3xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center font-black">
                  🔵
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  2. Kék Korong: Az Adósság (-1)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Minden egyes kék korong <strong>-1 Ft tartozást</strong>, kötelezettséget vagy negatív
                  egész számot jelent. A kék korongok csökkentik a vagyonodat.
                </p>
              </Card>

              {/* Card 3 */}
              <Card className="p-5 rounded-3xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center font-black">
                  ⚪
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  3. A Nullapár Elve: (+1) + (-1) = 0
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Ha van 1 Ft vagyonod (piros) és 1 Ft tartozásod (kék), a kettő <strong>pontosan kiejti egymást</strong>.
                  Együtt 0 Ft-ot érnek! Bármennyi nullapárt hozzáadhatsz vagy elvehetsz anélkül, hogy a tábla
                  összértéke megváltozna.
                </p>
              </Card>

              {/* Card 4 */}
              <Card className="p-5 rounded-3xl border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 flex items-center justify-center font-black">
                  ✨
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  4. Miért lesz a negatív kivonása pozitív?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Gondolj a tartozás elengedésére! Ha a bank elengedi a 3 Ft adósságodat (<strong>- (-3)</strong>
                  ), akkor a te vagyonod valójában <strong>3 Ft-tal több lesz</strong>! Korongokkal: kiteszel 3
                  nullapárt, majd eldobod a 3 kék adósságot — megmarad a 3 piros vagyon!
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default DebtAssetModelTool;
