import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  History,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Layers,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Maximize2,
  Minimize2,
  Plus,
  BookOpen,
  Table as TableIcon,
  BarChart2,
  Calculator as CalcIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  CasioEvaluator,
  CasioMemory,
  AngleMode,
  CalculationHistoryItem,
  formatCasioNumber,
  decimalToFraction,
  decimalToDms,
  calculate1VarStats,
  generateTable,
  StatResult,
  TableRow
} from './scientific/casioEvaluator';

interface ScientificCalculatorProps {
  onBack?: () => void;
}

type CalculatorMode = 'COMP' | 'STAT' | 'TABLE';

const INITIAL_MEMORY: CasioMemory = {
  Ans: 0,
  A: 0,
  B: 0,
  C: 0,
  D: 0,
  E: 0,
  F: 0,
  X: 0,
  Y: 0,
  M: 0,
};

export function ScientificCalculator({ onBack }: ScientificCalculatorProps) {
  // Calculator State
  const [expression, setExpression] = useState<string>('');
  const [cursorPos, setCursorPos] = useState<number>(0);
  const [result, setResult] = useState<string>('0');
  const [rawNumericResult, setRawNumericResult] = useState<number | null>(null);
  const [isShift, setIsShift] = useState<boolean>(false);
  const [isAlpha, setIsAlpha] = useState<boolean>(false);
  const [isHyp, setIsHyp] = useState<boolean>(false);
  const [isSto, setIsSto] = useState<boolean>(false);
  const [isRcl, setIsRcl] = useState<boolean>(false);
  const [angleMode, setAngleMode] = useState<AngleMode>('DEG');
  const [calcMode, setCalcMode] = useState<CalculatorMode>('COMP');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [resultDisplayType, setResultDisplayType] = useState<'standard' | 'fraction' | 'dms'>('standard');

  // Memory & History
  const [memory, setMemory] = useState<CasioMemory>(INITIAL_MEMORY);
  const [history, setHistory] = useState<CalculationHistoryItem[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Modals & Panels
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [showVariables, setShowVariables] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [showModeDialog, setShowModeDialog] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // STAT Mode State
  const [statData, setStatData] = useState<number[]>([12, 15, 14, 18, 22, 19, 15]);
  const [newStatInput, setNewStatInput] = useState<string>('');
  const [statResult, setStatResult] = useState<StatResult | null>(null);

  // TABLE Mode State
  const [tableFormula, setTableFormula] = useState<string>('X^2 - 3*X + 2');
  const [tableStart, setTableStart] = useState<string>('-2');
  const [tableEnd, setTableEnd] = useState<string>('4');
  const [tableStep, setTableStep] = useState<string>('1');
  const [tableRows, setTableRows] = useState<TableRow[]>([]);

  // Sound Synthesizer via Web Audio API
  const audioCtxRef = useRef<AudioContext | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const playClickSound = (freq = 900, type: OscillatorType = 'sine', duration = 0.02) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context maybe blocked by browser autoplay policy
    }
  };

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {});
      } else if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing in text inputs
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key >= '0' && e.key <= '9') {
        insertText(e.key);
      } else if (e.key === '.') {
        insertText('.');
      } else if (e.key === '+') {
        insertText('+');
      } else if (e.key === '-') {
        insertText('−');
      } else if (e.key === '*') {
        insertText('×');
      } else if (e.key === '/') {
        insertText('÷');
      } else if (e.key === '(') {
        insertText('(');
      } else if (e.key === ')') {
        insertText(')');
      } else if (e.key === '^') {
        insertText('^');
      } else if (e.key === '%') {
        insertText('%');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleDelete();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        if (isFullscreen && !document.fullscreenElement) {
          setIsFullscreen(false);
        } else {
          handleAllClear();
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        moveCursor('left');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        moveCursor('right');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        replayHistory('prev');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        replayHistory('next');
      } else if (e.key.toLowerCase() === 's' && !e.ctrlKey) {
        insertText('sin(');
      } else if (e.key.toLowerCase() === 'c' && !e.ctrlKey) {
        insertText('cos(');
      } else if (e.key.toLowerCase() === 't' && !e.ctrlKey) {
        insertText('tan(');
      } else if (e.key.toLowerCase() === 'l' && !e.ctrlKey) {
        insertText('ln(');
      } else if (e.key.toLowerCase() === 'p' && !e.ctrlKey) {
        insertText('π');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expression, cursorPos, rawNumericResult, history, historyIndex, isShift, isAlpha, isHyp, isSto, isRcl, angleMode, isFullscreen]);

  // Evaluate Expression
  const handleEquals = () => {
    playClickSound(1200, 'triangle', 0.04);
    if (!expression || expression.trim() === '') return;

    try {
      const evaluator = new CasioEvaluator(memory, angleMode);
      const val = evaluator.evaluate(expression);

      setRawNumericResult(val);
      const formatted = formatCasioNumber(val);
      setResult(formatted);
      setResultDisplayType('standard');

      // Update Ans memory
      const updatedMem = { ...memory, Ans: val };
      setMemory(updatedMem);

      // Add to history
      const frac = decimalToFraction(val);
      const fracStr = frac && frac.den !== 1 ? `${frac.num}/${frac.den}` : undefined;

      const newItem: CalculationHistoryItem = {
        id: Date.now().toString(),
        expression,
        displayExpression: expression,
        result: val,
        displayResult: formatted,
        fractionResult: fracStr,
        timestamp: Date.now(),
        angleMode,
      };

      setHistory(prev => [newItem, ...prev.slice(0, 49)]);
      setHistoryIndex(-1);
    } catch (err: any) {
      setResult(err.message || 'Math ERROR');
      setRawNumericResult(null);
    }

    setIsShift(false);
    setIsAlpha(false);
    setIsHyp(false);
    setIsSto(false);
    setIsRcl(false);
  };

  // Insert string at cursor position
  const insertText = (text: string) => {
    playClickSound(800, 'sine', 0.015);
    const before = expression.slice(0, cursorPos);
    const after = expression.slice(cursorPos);
    const newExpr = before + text + after;
    setExpression(newExpr);
    setCursorPos(cursorPos + text.length);

    // Reset modifier states if active
    setIsShift(false);
    setIsAlpha(false);
    setIsHyp(false);
  };

  // Move Cursor
  const moveCursor = (dir: 'left' | 'right') => {
    playClickSound(600, 'sine', 0.01);
    if (dir === 'left') {
      setCursorPos(prev => Math.max(0, prev - 1));
    } else {
      setCursorPos(prev => Math.min(expression.length, prev + 1));
    }
  };

  // Replay History
  const replayHistory = (dir: 'prev' | 'next') => {
    playClickSound(700, 'triangle', 0.02);
    if (history.length === 0) return;

    if (dir === 'prev') {
      const nextIdx = Math.min(history.length - 1, historyIndex + 1);
      setHistoryIndex(nextIdx);
      setExpression(history[nextIdx].expression);
      setCursorPos(history[nextIdx].expression.length);
      setResult(history[nextIdx].displayResult);
      setRawNumericResult(history[nextIdx].result);
    } else {
      const nextIdx = Math.max(-1, historyIndex - 1);
      setHistoryIndex(nextIdx);
      if (nextIdx === -1) {
        setExpression('');
        setCursorPos(0);
        setResult('0');
        setRawNumericResult(null);
      } else {
        setExpression(history[nextIdx].expression);
        setCursorPos(history[nextIdx].expression.length);
        setResult(history[nextIdx].displayResult);
        setRawNumericResult(history[nextIdx].result);
      }
    }
  };

  // Delete single character at cursor
  const handleDelete = () => {
    playClickSound(450, 'square', 0.02);
    if (cursorPos === 0) return;
    const before = expression.slice(0, cursorPos - 1);
    const after = expression.slice(cursorPos);
    setExpression(before + after);
    setCursorPos(cursorPos - 1);
  };

  // Clear All
  const handleAllClear = () => {
    playClickSound(400, 'square', 0.03);
    setExpression('');
    setCursorPos(0);
    setResult('0');
    setRawNumericResult(null);
    setIsShift(false);
    setIsAlpha(false);
    setIsHyp(false);
    setIsSto(false);
    setIsRcl(false);
    setHistoryIndex(-1);
  };

  // S<=>D Toggle (Standard to Decimal converter)
  const handleSDToggle = () => {
    playClickSound(950, 'sine', 0.02);
    if (rawNumericResult === null) return;

    if (resultDisplayType === 'standard') {
      const frac = decimalToFraction(rawNumericResult);
      if (frac && frac.den !== 1) {
        setResult(`${frac.num}/${frac.den}`);
        setResultDisplayType('fraction');
      } else {
        setResult(decimalToDms(rawNumericResult));
        setResultDisplayType('dms');
      }
    } else if (resultDisplayType === 'fraction') {
      setResult(decimalToDms(rawNumericResult));
      setResultDisplayType('dms');
    } else {
      setResult(formatCasioNumber(rawNumericResult));
      setResultDisplayType('standard');
    }
  };

  // Variable Storage & Recall handler
  const handleVariableKey = (varName: keyof CasioMemory) => {
    if (isSto) {
      const valToStore = rawNumericResult !== null ? rawNumericResult : (parseFloat(result) || 0);
      setMemory(prev => ({ ...prev, [varName]: valToStore }));
      toast.success(`${valToStore} elmentve a(z) ${varName} változóba!`, { duration: 2000 });
      setIsSto(false);
      setIsShift(false);
    } else if (isRcl) {
      insertText(varName);
      setIsRcl(false);
    } else if (isAlpha) {
      insertText(varName);
      setIsAlpha(false);
    } else {
      insertText(varName);
    }
  };

  // STAT Mode calculations
  const runStatCalculation = () => {
    try {
      const stats = calculate1VarStats(statData);
      setStatResult(stats);
      toast.success('Statisztikai számítás sikeres!');
    } catch (e: any) {
      toast.error(e.message || 'Hiba a statisztikai számításban');
    }
  };

  // TABLE Mode calculations
  const runTableCalculation = () => {
    try {
      const s = parseFloat(tableStart);
      const e = parseFloat(tableEnd);
      const st = parseFloat(tableStep);
      const rows = generateTable(tableFormula, s, e, st, memory, angleMode);
      setTableRows(rows);
      toast.success('Függvénytáblázat legenerálva!');
    } catch (e: any) {
      toast.error(e.message || 'Hiba a függvénytáblázat generálásakor');
    }
  };

  // Copy result to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Kimásolva a vágólapra!');
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Switch Angle Mode (DEG -> RAD -> GRA -> DEG)
  const cycleAngleMode = () => {
    playClickSound(1000, 'sine', 0.02);
    setAngleMode(prev => {
      if (prev === 'DEG') return 'RAD';
      if (prev === 'RAD') return 'GRA';
      return 'DEG';
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "min-h-screen bg-[#12151e] text-slate-100 flex flex-col items-center transition-all duration-300",
        isFullscreen ? "p-2 sm:p-4 justify-center" : "p-4 md:p-8"
      )}
    >
      {/* Top Header & Navigation (Hidden or Minimized in Fullscreen) */}
      <div className={cn(
        "w-full max-w-5xl flex items-center justify-between mb-4 transition-all",
        isFullscreen ? "max-w-4xl" : ""
      )}>
        <div className="flex items-center gap-3">
          {onBack && !isFullscreen && (
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white transition-all gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Vissza az eszközökhöz</span>
            </Button>
          )}
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#3a4163] text-cyan-300 rounded-lg border border-[#4d5683]">
              <CalcIcon className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                Casio fx-82ES
                <span className="text-cyan-400 font-mono italic text-xs tracking-wider">NATURAL DISPLAY</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-1.5">
          {/* Sound Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="text-slate-400 hover:text-white hover:bg-slate-800 h-8 w-8"
            title={soundEnabled ? 'Hanghatások némítása' : 'Hanghatások bekapcsolása'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </Button>

          {/* Fullscreen Toggle */}
          <Button
            variant={isFullscreen ? "default" : "outline"}
            size="sm"
            onClick={toggleFullscreen}
            className={cn(
              "h-8 gap-1.5 text-xs font-semibold transition-all",
              isFullscreen
                ? "bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-400 shadow-lg shadow-cyan-500/20"
                : "bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white"
            )}
            title={isFullscreen ? "Kilépés a teljes képernyőből (ESC)" : "Teljes képernyős mód"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{isFullscreen ? "Kilépés" : "Teljes képernyő"}</span>
          </Button>

          {/* Variables modal */}
          {!isFullscreen && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowVariables(true)}
              className="bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white gap-1 text-xs h-8 hidden sm:flex"
            >
              <Layers className="w-3.5 h-3.5 text-rose-400" />
              <span>Változók</span>
            </Button>
          )}

          {/* History modal */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHistory(true)}
            className="bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white gap-1 text-xs h-8"
          >
            <History className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Előzmények</span>
            <span className="text-[10px] text-slate-400">({history.length})</span>
          </Button>

          {/* Guide modal */}
          {!isFullscreen && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowGuide(true)}
              className="bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white gap-1 text-xs h-8 hidden sm:flex"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Kisokos</span>
            </Button>
          )}
        </div>
      </div>

      {/* Main Container */}
      <div className={cn(
        "w-full max-w-5xl grid items-start justify-center gap-6",
        isFullscreen ? "grid-cols-1 max-w-3xl" : "grid-cols-1 lg:grid-cols-12"
      )}>
        
        {/* CASIO HARDWARE BODY - EXACT BLUE / NAVY REPLICA FROM SCREENSHOT */}
        <div className={cn(
          "flex justify-center transition-all duration-300",
          isFullscreen ? "col-span-1" : "lg:col-span-7"
        )}>
          <div className={cn(
            "w-full max-w-[370px] rounded-[38px] p-4 pt-3 pb-5 select-none relative shadow-2xl transition-all duration-300",
            // Authentic Navy-Blue / Periwinkle-shaded plastic case
            "bg-gradient-to-b from-[#404563] via-[#353954] to-[#2a2e46] border-[3px] border-[#4a5074] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.25)]",
            isFullscreen ? "scale-100 sm:scale-105 my-auto" : ""
          )}>
            
            {/* Top Brand & Model Header */}
            <div className="flex items-baseline justify-between mb-1.5 px-3">
              <span className="text-white font-black tracking-wider text-sm drop-shadow-sm font-sans">CASIO</span>
              <div className="text-right">
                <span className="text-[8px] font-bold text-slate-300 tracking-wider uppercase mr-1">SCIENTIFIC CALCULATOR</span>
                <span className="text-[13px] font-bold text-white italic tracking-tight font-serif">fx-82ES</span>
              </div>
            </div>

            {/* NATURAL DISPLAY Label */}
            <div className="text-center mb-1.5">
              <span className="text-[#3be8c4] font-extrabold italic text-[11px] tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-sans">
                NATURAL DISPLAY
              </span>
            </div>

            {/* AUTHENTIC GREEN LCD SCREEN */}
            <div className="bg-[#242738] rounded-2xl p-2 pb-1.5 border-2 border-[#1c1e2d] shadow-[inset_0_4px_8px_rgba(0,0,0,0.7),0_1px_2px_rgba(255,255,255,0.1)] mb-3">
              <div className="bg-gradient-to-b from-[#b8cc99] to-[#a6bc86] text-[#131b0f] rounded-xl p-2.5 min-h-[92px] flex flex-col justify-between shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)] border border-[#8da16f] font-mono select-text relative">
                
                {/* LCD Top Status Matrix Banner */}
                <div className="flex items-center justify-between text-[7.5px] font-bold tracking-tight text-[#1b2616]/80 border-b border-[#1b2616]/20 pb-0.5 select-none">
                  <div className="flex items-center gap-1 font-black">
                    <span className={isShift ? "bg-[#1b2616] text-[#b8cc99] px-0.5 rounded-sm" : "opacity-25"}>S</span>
                    <span className={isAlpha ? "bg-[#1b2616] text-[#b8cc99] px-0.5 rounded-sm" : "opacity-25"}>A</span>
                    <span className={memory.M !== 0 ? "font-black" : "opacity-25"}>M</span>
                    <span className={isSto ? "font-black" : "opacity-25"}>STO</span>
                    <span className={isRcl ? "font-black" : "opacity-25"}>RCL</span>
                    <span className={calcMode === 'STAT' ? "font-black bg-[#1b2616] text-[#b8cc99] px-0.5 rounded-sm" : "opacity-25"}>STAT</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={cycleAngleMode}
                      className="font-black px-1 rounded hover:bg-black/10 cursor-pointer"
                      title="Szögegység váltása (DEG / RAD / GRA)"
                    >
                      {angleMode === 'DEG' ? 'D' : angleMode === 'RAD' ? 'R' : 'G'}
                    </button>
                    <span className="font-black">Math</span>
                    <span className="text-[7px]">
                      {historyIndex >= 0 || history.length > 0 ? '▲▼' : '  '}
                    </span>
                    <span className="opacity-40">Disp</span>
                  </div>
                </div>

                {/* LCD Line 1: Expression with blinking cursor */}
                <div className="text-[15px] leading-tight font-medium tracking-normal overflow-x-auto whitespace-nowrap scrollbar-none py-1 min-h-[26px] flex items-center">
                  {expression.length === 0 ? (
                    <span className="animate-pulse font-black text-lg">|</span>
                  ) : (
                    <span>
                      {expression.slice(0, cursorPos)}
                      <span className="animate-pulse bg-[#131b0f] w-[2px] inline-block h-[15px] align-middle mx-[0.5px]"></span>
                      {expression.slice(cursorPos)}
                    </span>
                  )}
                </div>

                {/* LCD Line 2: Evaluated result */}
                <div className="text-right text-[22px] font-bold leading-none tracking-tight overflow-x-auto whitespace-nowrap flex items-center justify-end min-h-[28px]">
                  {result}
                </div>
              </div>
            </div>

            {/* TOP CONTROLS: 4 LAVENDER OVAL BUTTONS + CENTRAL ROUND REPLAY D-PAD */}
            <div className="relative flex items-center justify-between mb-2.5 px-1">
              
              {/* Left Column: SHIFT & ALPHA */}
              <div className="flex flex-col gap-1.5 z-10">
                {/* SHIFT */}
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-bold text-[#facc15] leading-none mb-0.5">SHIFT</span>
                  <button
                    onClick={() => {
                      playClickSound(1000, 'sine', 0.02);
                      setIsShift(!isShift);
                      setIsAlpha(false);
                    }}
                    className={cn(
                      "w-11 h-6 rounded-full bg-gradient-to-b from-[#b8c2e6] via-[#9ea7cc] to-[#8892b8] border border-[#7881a6] shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.6)] active:translate-y-[1px] active:shadow-none transition-all",
                      isShift ? "ring-2 ring-[#facc15] brightness-125" : ""
                    )}
                  />
                </div>

                {/* ALPHA */}
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-bold text-[#f43f5e] leading-none mb-0.5">ALPHA</span>
                  <button
                    onClick={() => {
                      playClickSound(1000, 'sine', 0.02);
                      setIsAlpha(!isAlpha);
                      setIsShift(false);
                    }}
                    className={cn(
                      "w-11 h-6 rounded-full bg-gradient-to-b from-[#b8c2e6] via-[#9ea7cc] to-[#8892b8] border border-[#7881a6] shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.6)] active:translate-y-[1px] active:shadow-none transition-all",
                      isAlpha ? "ring-2 ring-[#f43f5e] brightness-125" : ""
                    )}
                  />
                </div>
              </div>

              {/* Center: CIRCULAR REPLAY D-PAD */}
              <div className="relative mx-auto my-[-4px]">
                <div className="w-[74px] h-[74px] rounded-full bg-gradient-to-b from-[#b4bee4] via-[#9ba5cd] to-[#7f8ab5] border-[2px] border-[#6b76a0] shadow-[0_4px_8px_rgba(0,0,0,0.5),inset_0_2px_3px_rgba(255,255,255,0.6)] flex items-center justify-center relative">
                  
                  {/* Up */}
                  <button
                    onClick={() => replayHistory('prev')}
                    className="absolute top-1 text-[#434b70] hover:text-white active:scale-90 p-1"
                    title="Előző számítás"
                  >
                    <ChevronUp className="w-4 h-4 stroke-[3]" />
                  </button>

                  {/* Left */}
                  <button
                    onClick={() => moveCursor('left')}
                    className="absolute left-1 text-[#434b70] hover:text-white active:scale-90 p-1"
                    title="Kurzor balra"
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[3]" />
                  </button>

                  {/* Center Text */}
                  <span className="text-[7.5px] font-black text-[#434b70]/80 tracking-tighter uppercase select-none">
                    REPLAY
                  </span>

                  {/* Right */}
                  <button
                    onClick={() => moveCursor('right')}
                    className="absolute right-1 text-[#434b70] hover:text-white active:scale-90 p-1"
                    title="Kurzor jobbra"
                  >
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>

                  {/* Down */}
                  <button
                    onClick={() => replayHistory('next')}
                    className="absolute bottom-1 text-[#434b70] hover:text-white active:scale-90 p-1"
                    title="Következő számítás"
                  >
                    <ChevronDown className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>

              {/* Right Column: MODE SETUP & ON */}
              <div className="flex flex-col gap-1.5 z-10">
                {/* MODE SETUP */}
                <div className="flex flex-col items-center">
                  <div className="flex gap-1 text-[8.5px] font-bold leading-none mb-0.5">
                    <span className="text-[#facc15]">SETUP</span>
                    <span className="text-slate-200">MODE</span>
                  </div>
                  <button
                    onClick={() => {
                      playClickSound(900, 'sine', 0.02);
                      if (isShift) {
                        cycleAngleMode();
                        setIsShift(false);
                      } else {
                        setShowModeDialog(true);
                      }
                    }}
                    className="w-11 h-6 rounded-full bg-gradient-to-b from-[#b8c2e6] via-[#9ea7cc] to-[#8892b8] border border-[#7881a6] shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.6)] active:translate-y-[1px] active:shadow-none transition-all"
                  />
                </div>

                {/* ON */}
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-bold text-slate-200 leading-none mb-0.5">ON</span>
                  <button
                    onClick={() => {
                      playClickSound(1100, 'sine', 0.03);
                      handleAllClear();
                    }}
                    className="w-11 h-6 rounded-full bg-gradient-to-b from-[#b8c2e6] via-[#9ea7cc] to-[#8892b8] border border-[#7881a6] shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.6)] active:translate-y-[1px] active:shadow-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* SCIENTIFIC FUNCTION KEYPAD (ROWS 1-4) */}
            <div className="space-y-1.5 mb-2.5">
              
              {/* Function Row 1: Abs, x^3, x^-1, log_box */}
              <div className="grid grid-cols-4 gap-2 px-1">
                {/* Abs */}
                <div className="flex flex-col items-center">
                  <span className="text-[7.5px] font-bold text-[#f43f5e] h-2.5 flex items-center">:</span>
                  <button
                    onClick={() => insertText('abs(')}
                    className="w-full h-6 rounded bg-gradient-to-b from-[#383d57] to-[#25283b] text-white text-[10px] font-semibold border border-[#1e2030] shadow-[0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]"
                  >
                    Abs
                  </button>
                </div>

                {/* x^3 */}
                <div className="flex flex-col items-center">
                  <span className="text-[7.5px] font-bold text-[#facc15] h-2.5 flex items-center">∛</span>
                  <button
                    onClick={() => isShift ? insertText('∛(') : insertText('^3')}
                    className="w-full h-6 rounded bg-gradient-to-b from-[#383d57] to-[#25283b] text-white text-[10px] font-semibold border border-[#1e2030] shadow-[0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]"
                  >
                    x³
                  </button>
                </div>

                {/* x^-1 */}
                <div className="flex flex-col items-center">
                  <span className="text-[7.5px] font-bold text-[#facc15] h-2.5 flex items-center">x!</span>
                  <button
                    onClick={() => isShift ? insertText('!') : insertText('^(-1)')}
                    className="w-full h-6 rounded bg-gradient-to-b from-[#383d57] to-[#25283b] text-white text-[10px] font-semibold border border-[#1e2030] shadow-[0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]"
                  >
                    x⁻¹
                  </button>
                </div>

                {/* log_box */}
                <div className="flex flex-col items-center">
                  <span className="text-[7.5px] font-bold text-[#facc15] h-2.5 flex items-center">10^□</span>
                  <button
                    onClick={() => isShift ? insertText('10^(') : insertText('log(')}
                    className="w-full h-6 rounded bg-gradient-to-b from-[#383d57] to-[#25283b] text-white text-[10px] font-semibold border border-[#1e2030] shadow-[0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]"
                  >
                    log■□
                  </button>
                </div>
              </div>

              {/* Function Row 2: fraction, sqrt, x^2, x^box, log, ln */}
              <div className="grid grid-cols-6 gap-1 px-1">
                {/* Fraction */}
                <div className="flex flex-col items-center">
                  <span className="text-[7px] font-bold text-[#facc15] h-2.5 flex items-center">■■/□</span>
                  <button
                    onClick={() => insertText('/')}
                    className="w-full h-6 rounded bg-gradient-to-b from-[#383d57] to-[#25283b] text-white text-[10px] font-semibold border border-[#1e2030] shadow-[0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]"
                  >
                    ■/□
                  </button>
                </div>

                {/* sqrt */}
                <div className="flex flex-col items-center">
                  <span className="text-[7px] font-bold text-[#facc15] h-2.5 flex items-center">∛□</span>
                  <button
                    onClick={() => isShift ? insertText('∛(') : insertText('√(')}
                    className="w-full h-6 rounded bg-gradient-to-b from-[#383d57] to-[#25283b] text-white text-[10px] font-semibold border border-[#1e2030] shadow-[0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]"
                  >
                    √□
                  </button>
                </div>

                {/* x^2 */}
                <div className="flex flex-col items-center">
                  <span className="text-[7px] font-bold text-[#facc15] h-2.5 flex items-center">x³</span>
                  <button
                    onClick={() => isShift ? insertText('^3') : insertText('^2')}
                    className="w-full h-6 rounded bg-gradient-to-b from-[#383d57] to-[#25283b] text-white text-[10px] font-semibold border border-[#1e2030] shadow-[0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]"
                  >
                    x²
                  </button>
                </div>

                {/* x^box */}
                <div className="flex flex-col items-center">
                  <span className="text-[7px] font-bold text-[#facc15] h-2.5 flex items-center">x√□</span>
                  <button
                    onClick={() => insertText('^(')}
                    className="w-full h-6 rounded bg-gradient-to-b from-[#383d57] to-[#25283b] text-white text-[10px] font-semibold border border-[#1e2030] shadow-[0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]"
                  >
                    x^■
                  </button>
                </div>

                {/* log */}
                <div className="flex flex-col items-center">
                  <span className="text-[7px] font-bold text-[#facc15] h-2.5 flex items-center">10^■</span>
                  <button
                    onClick={() => isShift ? insertText('10^(') : insertText('log(')}
                    className="w-full h-6 rounded bg-gradient-to-b from-[#383d57] to-[#25283b] text-white text-[10px] font-semibold border border-[#1e2030] shadow-[0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]"
                  >
                    log
                  </button>
                </div>

                {/* ln */}
                <div className="flex flex-col items-center">
                  <span className="text-[7px] font-bold text-[#facc15] h-2.5 flex items-center">e^■</span>
                  <button
                    onClick={() => isShift ? insertText('e^(') : insertText('ln(')}
                    className="w-full h-6 rounded bg-gradient-to-b from-[#383d57] to-[#25283b] text-white text-[10px] font-semibold border border-[#1e2030] shadow-[0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]"
                  >
                    ln
                  </button>
                </div>
              </div>

              {/* Function Row 3: (-), dms, hyp, sin, cos, tan */}
              <div className="grid grid-cols-6 gap-1 px-1">
                {/* (-) */}
                <div className="flex flex-col items-center">
                  <span className="text-[7px] font-bold text-[#f43f5e] h-2.5 flex items-center">A</span>
                  <button
                    onClick={() => isAlpha ? handleVariableKey('A') : insertText('-')}
                    className="w-full h-6 rounded bg-gradient-to-b from-[#383d57] to-[#25283b] text-white text-[10px] font-semibold border border-[#1e2030] shadow-[0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]"
                  >
                    (−)
                  </button>
                </div>

                {/* dms */}
                <div className="flex flex-col items-center">
                  <div className="flex gap-0.5 text-[7px] font-bold h-2.5 items-center">
                    <span className="text-[#facc15]">←</span>
                    <span className="text-[#f43f5e]">B</span>
                  </div>
                  <button
                    onClick={() => isAlpha ? handleVariableKey('B') : handleSDToggle()}
                    className="w-full h-6 rounded bg-gradient-to-b from-[#383d57] to-[#25283b] text-white text-[10px] font-semibold border border-[#1e2030] shadow-[0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]"
                  >
                    ° ′ ″
                  </button>
                </div>

                {/* hyp */}
                <div className="flex flex-col items-center">
                  <span className="text-[7px] font-bold text-[#f43f5e] h-2.5 flex items-center">C</span>
                  <button
                    onClick={() => {
                      playClickSound(850, 'sine', 0.02);
                      setIsHyp(!isHyp);
                    }}
                    className={cn(
                      "w-full h-6 rounded bg-gradient-to-b from-[#383d57] to-[#25283b] text-white text-[10px] font-semibold border border-[#1e2030] shadow-[0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]",
                      isHyp ? "ring-1 ring-cyan-400" : ""
                    )}
                  >
                    hyp
                  </button>
                </div>

                {/* sin */}
                <div className="flex flex-col items-center">
                  <div className="flex gap-0.5 text-[7px] font-bold h-2.5 items-center">
                    <span className="text-[#facc15]">sin⁻¹</span>
                    <span className="text-[#f43f5e]">D</span>
                  </div>
                  <button
                    onClick={() => {
                      if (isAlpha) handleVariableKey('D');
                      else if (isShift && isHyp) insertText('sinh⁻¹(');
                      else if (isShift) insertText('sin⁻¹(');
                      else if (isHyp) insertText('sinh(');
                      else insertText('sin(');
                    }}
                    className="w-full h-6 rounded bg-gradient-to-b from-[#383d57] to-[#25283b] text-white text-[10px] font-semibold border border-[#1e2030] shadow-[0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]"
                  >
                    sin
                  </button>
                </div>

                {/* cos */}
                <div className="flex flex-col items-center">
                  <div className="flex gap-0.5 text-[7px] font-bold h-2.5 items-center">
                    <span className="text-[#facc15]">cos⁻¹</span>
                    <span className="text-[#f43f5e]">E</span>
                  </div>
                  <button
                    onClick={() => {
                      if (isAlpha) handleVariableKey('E');
                      else if (isShift && isHyp) insertText('cosh⁻¹(');
                      else if (isShift) insertText('cos⁻¹(');
                      else if (isHyp) insertText('cosh(');
                      else insertText('cos(');
                    }}
                    className="w-full h-6 rounded bg-gradient-to-b from-[#383d57] to-[#25283b] text-white text-[10px] font-semibold border border-[#1e2030] shadow-[0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]"
                  >
                    cos
                  </button>
                </div>

                {/* tan */}
                <div className="flex flex-col items-center">
                  <div className="flex gap-0.5 text-[7px] font-bold h-2.5 items-center">
                    <span className="text-[#facc15]">tan⁻¹</span>
                    <span className="text-[#f43f5e]">F</span>
                  </div>
                  <button
                    onClick={() => {
                      if (isAlpha) handleVariableKey('F');
                      else if (isShift && isHyp) insertText('tanh⁻¹(');
                      else if (isShift) insertText('tan⁻¹(');
                      else if (isHyp) insertText('tanh(');
                      else insertText('tan(');
                    }}
                    className="w-full h-6 rounded bg-gradient-to-b from-[#383d57] to-[#25283b] text-white text-[10px] font-semibold border border-[#1e2030] shadow-[0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]"
                  >
                    tan
                  </button>
                </div>
              </div>

              {/* Function Row 4: RCL, ENG, (, ), S<=>D, M+ */}
              <div className="grid grid-cols-6 gap-1 px-1">
                {/* RCL */}
                <div className="flex flex-col items-center">
                  <span className="text-[7px] font-bold text-[#facc15] h-2.5 flex items-center">STO</span>
                  <button
                    onClick={() => {
                      playClickSound(900, 'sine', 0.02);
                      if (isShift) {
                        setIsSto(!isSto);
                        setIsRcl(false);
                      } else {
                        setIsRcl(!isRcl);
                        setIsSto(false);
                      }
                    }}
                    className={cn(
                      "w-full h-6 rounded bg-gradient-to-b from-[#383d57] to-[#25283b] text-white text-[10px] font-semibold border border-[#1e2030] shadow-[0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]",
                      isSto || isRcl ? "ring-1 ring-purple-400" : ""
                    )}
                  >
                    RCL
                  </button>
                </div>

                {/* ENG */}
                <div className="flex flex-col items-center">
                  <span className="text-[7px] font-bold text-[#facc15] h-2.5 flex items-center">←</span>
                  <button
                    onClick={() => {
                      if (rawNumericResult !== null) {
                        setResult(rawNumericResult.toExponential(4));
                      }
                    }}
                    className="w-full h-6 rounded bg-gradient-to-b from-[#383d57] to-[#25283b] text-white text-[10px] font-semibold border border-[#1e2030] shadow-[0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]"
                  >
                    ENG
                  </button>
                </div>

                {/* ( */}
                <div className="flex flex-col items-center">
                  <div className="flex gap-0.5 text-[7px] font-bold h-2.5 items-center">
                    <span className="text-[#facc15]">%</span>
                    <span className="text-[#f43f5e]">X</span>
                  </div>
                  <button
                    onClick={() => isShift ? insertText('%') : isAlpha ? handleVariableKey('X') : insertText('(')}
                    className="w-full h-6 rounded bg-gradient-to-b from-[#383d57] to-[#25283b] text-white text-[10px] font-semibold border border-[#1e2030] shadow-[0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]"
                  >
                    (
                  </button>
                </div>

                {/* ) */}
                <div className="flex flex-col items-center">
                  <div className="flex gap-0.5 text-[7px] font-bold h-2.5 items-center">
                    <span className="text-[#facc15]">,</span>
                    <span className="text-[#f43f5e]">Y</span>
                  </div>
                  <button
                    onClick={() => isShift ? insertText(',') : isAlpha ? handleVariableKey('Y') : insertText(')')}
                    className="w-full h-6 rounded bg-gradient-to-b from-[#383d57] to-[#25283b] text-white text-[10px] font-semibold border border-[#1e2030] shadow-[0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]"
                  >
                    )
                  </button>
                </div>

                {/* S<=>D */}
                <div className="flex flex-col items-center">
                  <div className="flex gap-0.5 text-[7px] font-bold h-2.5 items-center">
                    <span className="text-[#facc15]">a b/c</span>
                    <span className="text-[#f43f5e]">M</span>
                  </div>
                  <button
                    onClick={handleSDToggle}
                    className="w-full h-6 rounded bg-gradient-to-b from-[#383d57] to-[#25283b] text-white text-[10px] font-semibold border border-[#1e2030] shadow-[0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]"
                  >
                    S⇔D
                  </button>
                </div>

                {/* M+ */}
                <div className="flex flex-col items-center">
                  <div className="flex gap-0.5 text-[7px] font-bold h-2.5 items-center">
                    <span className="text-[#facc15]">M−</span>
                    <span className="text-[#f43f5e]">M</span>
                  </div>
                  <button
                    onClick={() => {
                      if (isAlpha) handleVariableKey('M');
                      else {
                        const val = rawNumericResult !== null ? rawNumericResult : (parseFloat(result) || 0);
                        if (isShift) {
                          setMemory(prev => ({ ...prev, M: prev.M - val }));
                          toast.info(`M- : ${val}`);
                        } else {
                          setMemory(prev => ({ ...prev, M: prev.M + val }));
                          toast.info(`M+ : ${val}`);
                        }
                        setIsShift(false);
                      }
                    }}
                    className="w-full h-6 rounded bg-gradient-to-b from-[#383d57] to-[#25283b] text-white text-[10px] font-semibold border border-[#1e2030] shadow-[0_2px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]"
                  >
                    M+
                  </button>
                </div>
              </div>
            </div>

            {/* NUMERIC & OPERATOR KEYPAD (5 COLUMNS) */}
            <div className="space-y-1.5 px-0.5">
              
              {/* Row 5: 7, 8, 9, DEL (Plum/Pink), AC (Plum/Pink) */}
              <div className="grid grid-cols-5 gap-1.5">
                <button
                  onClick={() => insertText('7')}
                  className="h-9 rounded-lg bg-gradient-to-b from-[#2e3144] to-[#1f2130] text-white text-base font-bold border border-[#161722] shadow-[0_3px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] active:translate-y-[1px]"
                >
                  7
                </button>
                <button
                  onClick={() => insertText('8')}
                  className="h-9 rounded-lg bg-gradient-to-b from-[#2e3144] to-[#1f2130] text-white text-base font-bold border border-[#161722] shadow-[0_3px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] active:translate-y-[1px]"
                >
                  8
                </button>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => insertText('9')}
                    className="w-full h-9 rounded-lg bg-gradient-to-b from-[#2e3144] to-[#1f2130] text-white text-base font-bold border border-[#161722] shadow-[0_3px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] active:translate-y-[1px] relative"
                  >
                    <span className="text-[6.5px] font-bold text-[#facc15] absolute -top-2 left-1/2 -translate-x-1/2">CLR</span>
                    9
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    onClick={handleDelete}
                    className="w-full h-9 rounded-lg bg-gradient-to-b from-[#b57396] via-[#9e5f80] to-[#874b6b] text-white text-xs font-black border border-[#6b3552] shadow-[0_3px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] active:translate-y-[1px] relative"
                  >
                    <span className="text-[6.5px] font-bold text-[#facc15] absolute -top-2 left-1/2 -translate-x-1/2">INS</span>
                    DEL
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    onClick={handleAllClear}
                    className="w-full h-9 rounded-lg bg-gradient-to-b from-[#b57396] via-[#9e5f80] to-[#874b6b] text-white text-xs font-black border border-[#6b3552] shadow-[0_3px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] active:translate-y-[1px] relative"
                  >
                    <span className="text-[6.5px] font-bold text-[#facc15] absolute -top-2 left-1/2 -translate-x-1/2">OFF</span>
                    AC
                  </button>
                </div>
              </div>

              {/* Row 6: 4, 5, 6, *, / */}
              <div className="grid grid-cols-5 gap-1.5">
                <button
                  onClick={() => insertText('4')}
                  className="h-9 rounded-lg bg-gradient-to-b from-[#2e3144] to-[#1f2130] text-white text-base font-bold border border-[#161722] shadow-[0_3px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] active:translate-y-[1px]"
                >
                  4
                </button>
                <button
                  onClick={() => insertText('5')}
                  className="h-9 rounded-lg bg-gradient-to-b from-[#2e3144] to-[#1f2130] text-white text-base font-bold border border-[#161722] shadow-[0_3px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] active:translate-y-[1px]"
                >
                  5
                </button>
                <button
                  onClick={() => insertText('6')}
                  className="h-9 rounded-lg bg-gradient-to-b from-[#2e3144] to-[#1f2130] text-white text-base font-bold border border-[#161722] shadow-[0_3px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] active:translate-y-[1px]"
                >
                  6
                </button>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => isShift ? insertText('nPr') : insertText('×')}
                    className="w-full h-9 rounded-lg bg-gradient-to-b from-[#2e3144] to-[#1f2130] text-white text-base font-bold border border-[#161722] shadow-[0_3px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] active:translate-y-[1px] relative"
                  >
                    <span className="text-[6.5px] font-bold text-[#facc15] absolute -top-2 left-1/2 -translate-x-1/2">nPr</span>
                    ×
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => isShift ? insertText('nCr') : insertText('÷')}
                    className="w-full h-9 rounded-lg bg-gradient-to-b from-[#2e3144] to-[#1f2130] text-white text-base font-bold border border-[#161722] shadow-[0_3px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] active:translate-y-[1px] relative"
                  >
                    <span className="text-[6.5px] font-bold text-[#facc15] absolute -top-2 left-1/2 -translate-x-1/2">nCr</span>
                    ÷
                  </button>
                </div>
              </div>

              {/* Row 7: 1, 2, 3, +, - */}
              <div className="grid grid-cols-5 gap-1.5">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => isShift ? insertText('Pol(') : insertText('1')}
                    className="w-full h-9 rounded-lg bg-gradient-to-b from-[#2e3144] to-[#1f2130] text-white text-base font-bold border border-[#161722] shadow-[0_3px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] active:translate-y-[1px] relative"
                  >
                    <span className="text-[6.5px] font-bold text-[#facc15] absolute -top-2 left-1/2 -translate-x-1/2">[STAT]</span>
                    1
                  </button>
                </div>
                <button
                  onClick={() => insertText('2')}
                  className="h-9 rounded-lg bg-gradient-to-b from-[#2e3144] to-[#1f2130] text-white text-base font-bold border border-[#161722] shadow-[0_3px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] active:translate-y-[1px]"
                >
                  2
                </button>
                <button
                  onClick={() => insertText('3')}
                  className="h-9 rounded-lg bg-gradient-to-b from-[#2e3144] to-[#1f2130] text-white text-base font-bold border border-[#161722] shadow-[0_3px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] active:translate-y-[1px]"
                >
                  3
                </button>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => isShift ? insertText('Pol(') : insertText('+')}
                    className="w-full h-9 rounded-lg bg-gradient-to-b from-[#2e3144] to-[#1f2130] text-white text-base font-bold border border-[#161722] shadow-[0_3px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] active:translate-y-[1px] relative"
                  >
                    <span className="text-[6.5px] font-bold text-[#facc15] absolute -top-2 left-1/2 -translate-x-1/2">Pol</span>
                    +
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => isShift ? insertText('Rec(') : insertText('−')}
                    className="w-full h-9 rounded-lg bg-gradient-to-b from-[#2e3144] to-[#1f2130] text-white text-base font-bold border border-[#161722] shadow-[0_3px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] active:translate-y-[1px] relative"
                  >
                    <span className="text-[6.5px] font-bold text-[#facc15] absolute -top-2 left-1/2 -translate-x-1/2">Rec</span>
                    −
                  </button>
                </div>
              </div>

              {/* Row 8: 0, ., x10^x, Ans, = */}
              <div className="grid grid-cols-5 gap-1.5">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => insertText('0')}
                    className="w-full h-9 rounded-lg bg-gradient-to-b from-[#2e3144] to-[#1f2130] text-white text-base font-bold border border-[#161722] shadow-[0_3px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] active:translate-y-[1px] relative"
                  >
                    <span className="text-[6.5px] font-bold text-[#facc15] absolute -top-2 left-1/2 -translate-x-1/2">Rnd</span>
                    0
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => isShift ? insertText('Ran#') : insertText('.')}
                    className="w-full h-9 rounded-lg bg-gradient-to-b from-[#2e3144] to-[#1f2130] text-white text-base font-bold border border-[#161722] shadow-[0_3px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] active:translate-y-[1px] relative"
                  >
                    <span className="text-[6.5px] font-bold text-[#facc15] absolute -top-2 left-1/2 -translate-x-1/2">Ran#</span>
                    •
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => isShift ? insertText('π') : isAlpha ? insertText('e') : insertText('×10^(')}
                    className="w-full h-9 rounded-lg bg-gradient-to-b from-[#2e3144] to-[#1f2130] text-white text-xs font-bold border border-[#161722] shadow-[0_3px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] active:translate-y-[1px] relative"
                  >
                    <div className="flex gap-0.5 text-[6.5px] font-bold absolute -top-2 left-1/2 -translate-x-1/2">
                      <span className="text-[#facc15]">π</span>
                      <span className="text-[#f43f5e]">e</span>
                    </div>
                    ×10ˣ
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => isShift ? insertText('%') : insertText('Ans')}
                    className="w-full h-9 rounded-lg bg-gradient-to-b from-[#2e3144] to-[#1f2130] text-white text-xs font-bold border border-[#161722] shadow-[0_3px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] active:translate-y-[1px] relative"
                  >
                    <span className="text-[6.5px] font-bold text-[#facc15] absolute -top-2 left-1/2 -translate-x-1/2">DRG▶</span>
                    Ans
                  </button>
                </div>
                <button
                  onClick={handleEquals}
                  className="h-9 rounded-lg bg-gradient-to-b from-[#383d57] via-[#2a2e44] to-[#1c1e2e] text-white text-lg font-black border border-[#121420] shadow-[0_3px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] active:translate-y-[1px]"
                >
                  =
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE PANEL: STAT & TABLE MODES + RECENT LOGS (Hidden in Fullscreen) */}
        {!isFullscreen && (
          <div className="lg:col-span-5 space-y-4">
            <Card className="bg-slate-900/90 border-slate-800 backdrop-blur shadow-xl">
              <CardContent className="p-4">
                <Tabs value={calcMode} onValueChange={(v) => setCalcMode(v as CalculatorMode)}>
                  <TabsList className="grid grid-cols-3 bg-slate-950 border border-slate-800 p-1 mb-4">
                    <TabsTrigger value="COMP" className="data-[state=active]:bg-[#3b436a] data-[state=active]:text-white text-xs gap-1">
                      <CalcIcon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>COMP</span>
                    </TabsTrigger>
                    <TabsTrigger value="STAT" className="data-[state=active]:bg-[#3b436a] data-[state=active]:text-white text-xs gap-1">
                      <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>STAT</span>
                    </TabsTrigger>
                    <TabsTrigger value="TABLE" className="data-[state=active]:bg-[#3b436a] data-[state=active]:text-white text-xs gap-1">
                      <TableIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>TABLE</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* COMP MODE DETAILS */}
                  <TabsContent value="COMP" className="space-y-4 mt-0">
                    <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Gyorssegédlet</span>
                        <Badge variant="outline" className="text-[10px] text-cyan-400 border-cyan-500/30">Mód: COMP</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800/80">
                          <span className="text-slate-400 block text-[10px]">Törtbeírás:</span>
                          <span className="font-mono text-emerald-400">■/□ vagy /</span>
                        </div>
                        <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800/80">
                          <span className="text-slate-400 block text-[10px]">Tört ↔ Tizedes:</span>
                          <span className="font-mono text-cyan-400">S⇔D gomb</span>
                        </div>
                        <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800/80">
                          <span className="text-slate-400 block text-[10px]">Szögegység:</span>
                          <span className="font-mono text-purple-400">{angleMode}</span>
                        </div>
                        <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800/80">
                          <span className="text-slate-400 block text-[10px]">Billentyűzet:</span>
                          <span className="font-mono text-blue-400">Numpad + Enter</span>
                        </div>
                      </div>
                    </div>

                    {/* Recent History Preview */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                          <History className="w-3.5 h-3.5 text-purple-400" />
                          Legutóbbi számítások
                        </span>
                        {history.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setHistory([])}
                            className="text-[10px] h-6 text-slate-500 hover:text-red-400"
                          >
                            Törlés
                          </Button>
                        )}
                      </div>
                      {history.length === 0 ? (
                        <div className="text-center py-6 text-slate-500 text-xs bg-slate-950/40 rounded-xl border border-slate-800/50">
                          Még nincsenek elmentett számítások.
                        </div>
                      ) : (
                        <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin">
                          {history.slice(0, 5).map((item) => (
                            <div
                              key={item.id}
                              className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center justify-between group"
                            >
                              <div
                                className="cursor-pointer flex-1"
                                onClick={() => {
                                  setExpression(item.expression);
                                  setCursorPos(item.expression.length);
                                  setResult(item.displayResult);
                                  setRawNumericResult(item.result);
                                }}
                              >
                                <div className="text-xs text-slate-400 font-mono truncate">{item.expression}</div>
                                <div className="text-sm font-bold text-emerald-400 font-mono flex items-center gap-2">
                                  = {item.displayResult}
                                  {item.fractionResult && (
                                    <span className="text-[10px] text-cyan-400">({item.fractionResult})</span>
                                  )}
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => copyToClipboard(item.displayResult, item.id)}
                                className="w-7 h-7 text-slate-500 hover:text-white"
                                title="Eredmény másolása"
                              >
                                {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* STAT MODE */}
                  <TabsContent value="STAT" className="space-y-4 mt-0">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-300">Adatsor (x értékek):</span>
                        <Badge variant="outline" className="text-[10px] text-emerald-400 border-emerald-500/30">
                          n = {statData.length}
                        </Badge>
                      </div>

                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Új érték hozzáadása..."
                          value={newStatInput}
                          onChange={(e) => setNewStatInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && newStatInput.trim() !== '') {
                              const val = parseFloat(newStatInput);
                              if (!isNaN(val)) {
                                setStatData([...statData, val]);
                                setNewStatInput('');
                              }
                            }
                          }}
                          className="bg-slate-950 border-slate-800 text-xs h-8"
                        />
                        <Button
                          size="sm"
                          onClick={() => {
                            const val = parseFloat(newStatInput);
                            if (!isNaN(val)) {
                              setStatData([...statData, val]);
                              setNewStatInput('');
                            }
                          }}
                          className="h-8 text-xs bg-emerald-600 hover:bg-emerald-500 gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Hozzáad
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-1.5 p-2 bg-slate-950/60 rounded-xl border border-slate-800 max-h-[90px] overflow-y-auto">
                        {statData.map((val, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="bg-slate-800 text-slate-200 hover:bg-red-900/50 hover:text-red-200 transition-all cursor-pointer text-xs font-mono gap-1"
                            onClick={() => {
                              setStatData(statData.filter((_, i) => i !== idx));
                            }}
                            title="Kattints a törléshez"
                          >
                            <span>{val}</span>
                            <span className="text-[9px] opacity-60">×</span>
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={runStatCalculation}
                          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs h-8 font-semibold"
                        >
                          Statisztika Számítása
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setStatData([])}
                          className="border-slate-800 text-slate-400 hover:text-red-400 text-xs h-8"
                        >
                          Törlés
                        </Button>
                      </div>

                      {statResult && (
                        <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 space-y-1.5 text-xs font-mono">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex justify-between border-b border-slate-800/80 py-0.5">
                              <span className="text-slate-400">Átlag (x̄):</span>
                              <span className="font-bold text-emerald-400">{formatCasioNumber(statResult.mean)}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800/80 py-0.5">
                              <span className="text-slate-400">Elemek (n):</span>
                              <span className="font-bold text-slate-200">{statResult.n}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800/80 py-0.5">
                              <span className="text-slate-400">Összeg (Σx):</span>
                              <span className="font-bold text-slate-200">{formatCasioNumber(statResult.sumX)}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800/80 py-0.5">
                              <span className="text-slate-400">Négyzetösszeg:</span>
                              <span className="font-bold text-slate-200">{formatCasioNumber(statResult.sumX2)}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800/80 py-0.5">
                              <span className="text-slate-400">Minta szórás (s):</span>
                              <span className="font-bold text-cyan-400">{formatCasioNumber(statResult.sampleStdDev)}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800/80 py-0.5">
                              <span className="text-slate-400">Pop. szórás (σ):</span>
                              <span className="font-bold text-cyan-400">{formatCasioNumber(statResult.popStdDev)}</span>
                            </div>
                            <div className="flex justify-between py-0.5">
                              <span className="text-slate-400">Medián:</span>
                              <span className="font-bold text-amber-400">{formatCasioNumber(statResult.median)}</span>
                            </div>
                            <div className="flex justify-between py-0.5">
                              <span className="text-slate-400">Terjedelem:</span>
                              <span className="font-bold text-amber-400">{statResult.max - statResult.min}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* TABLE MODE */}
                  <TabsContent value="TABLE" className="space-y-3 mt-0">
                    <div className="space-y-2">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400 block mb-1">Függvény f(X):</label>
                        <Input
                          value={tableFormula}
                          onChange={(e) => setTableFormula(e.target.value)}
                          placeholder="pl. X^2 - 3*X + 2"
                          className="bg-slate-950 border-slate-800 text-xs font-mono h-8"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">Start:</label>
                          <Input
                            value={tableStart}
                            onChange={(e) => setTableStart(e.target.value)}
                            className="bg-slate-950 border-slate-800 text-xs font-mono h-8"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">End:</label>
                          <Input
                            value={tableEnd}
                            onChange={(e) => setTableEnd(e.target.value)}
                            className="bg-slate-950 border-slate-800 text-xs font-mono h-8"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">Step:</label>
                          <Input
                            value={tableStep}
                            onChange={(e) => setTableStep(e.target.value)}
                            className="bg-slate-950 border-slate-800 text-xs font-mono h-8"
                          />
                        </div>
                      </div>

                      <Button
                        size="sm"
                        onClick={runTableCalculation}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white text-xs h-8 font-semibold"
                      >
                        Táblázat Generálása
                      </Button>

                      {tableRows.length > 0 && (
                        <div className="bg-slate-950 rounded-xl border border-slate-800 max-h-[160px] overflow-y-auto font-mono text-xs">
                          <table className="w-full text-left">
                            <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 sticky top-0">
                              <tr>
                                <th className="p-1.5 pl-3">#</th>
                                <th className="p-1.5">X</th>
                                <th className="p-1.5 pr-3 text-right">f(X)</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60">
                              {tableRows.map((row) => (
                                <tr key={row.stepIndex} className="hover:bg-slate-900/50">
                                  <td className="p-1.5 pl-3 text-slate-500">{row.stepIndex}</td>
                                  <td className="p-1.5 font-bold text-cyan-400">{row.x}</td>
                                  <td className="p-1.5 pr-3 text-right font-bold text-emerald-400">
                                    {row.fx !== null ? formatCasioNumber(row.fx) : <span className="text-red-400 text-[10px]">{row.error}</span>}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* MODE SELECTION DIALOG */}
      <Dialog open={showModeDialog} onOpenChange={setShowModeDialog}>
        <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <CalcIcon className="w-5 h-5 text-cyan-400" />
              Casio Módválasztó (MODE)
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-400">
              Válaszd ki a számítási módot:
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-2 pt-2">
            <Button
              variant={calcMode === 'COMP' ? 'default' : 'outline'}
              onClick={() => {
                setCalcMode('COMP');
                setShowModeDialog(false);
              }}
              className="justify-start gap-3 h-12 border-slate-700 bg-slate-800/60 hover:bg-slate-700"
            >
              <Badge variant="outline" className="font-mono text-xs text-cyan-300">1</Badge>
              <div className="text-left">
                <div className="font-bold text-sm">COMP (Normál számolás)</div>
                <div className="text-[10px] text-slate-400">Aritmetika, trigonometria, algebra</div>
              </div>
            </Button>
            <Button
              variant={calcMode === 'STAT' ? 'default' : 'outline'}
              onClick={() => {
                setCalcMode('STAT');
                setShowModeDialog(false);
              }}
              className="justify-start gap-3 h-12 border-slate-700 bg-slate-800/60 hover:bg-slate-700"
            >
              <Badge variant="outline" className="font-mono text-xs text-emerald-300">2</Badge>
              <div className="text-left">
                <div className="font-bold text-sm">STAT (1-Változós Statisztika)</div>
                <div className="text-[10px] text-slate-400">Átlag, szórás, medián, adatsor elemzés</div>
              </div>
            </Button>
            <Button
              variant={calcMode === 'TABLE' ? 'default' : 'outline'}
              onClick={() => {
                setCalcMode('TABLE');
                setShowModeDialog(false);
              }}
              className="justify-start gap-3 h-12 border-slate-700 bg-slate-800/60 hover:bg-slate-700"
            >
              <Badge variant="outline" className="font-mono text-xs text-amber-300">3</Badge>
              <div className="text-left">
                <div className="font-bold text-sm">TABLE (Függvényérték-táblázat)</div>
                <div className="text-[10px] text-slate-400">f(x) függvény értékei lépésközzel</div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* VARIABLES INSPECTION DIALOG */}
      <Dialog open={showVariables} onOpenChange={setShowVariables}>
        <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <Layers className="w-5 h-5 text-rose-400" />
              Casio Memória és Változók (STO / RCL)
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-400">
              A számológép 9 különálló változót és egy automatikus Ans memóriát kezel:
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-2 font-mono">
            {Object.entries(memory).map(([key, val]) => (
              <div
                key={key}
                className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "w-5 h-5 rounded flex items-center justify-center font-bold text-xs",
                    key === 'Ans' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-rose-500/20 text-rose-400'
                  )}>
                    {key}
                  </span>
                  <span className="text-xs font-bold text-slate-200">{formatCasioNumber(val)}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => insertText(key)}
                  className="w-6 h-6 text-slate-400 hover:text-white"
                  title="Beillesztés a számításba"
                >
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setMemory(INITIAL_MEMORY);
                toast.success('Összes változó törölve!');
              }}
              className="border-slate-700 text-xs text-red-400 hover:bg-red-950/30"
            >
              Törlés
            </Button>
            <Button
              size="sm"
              onClick={() => setShowVariables(false)}
              className="bg-cyan-600 hover:bg-cyan-500 text-xs"
            >
              Bezárás
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* CALCULATION HISTORY DIALOG */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <History className="w-5 h-5 text-purple-400" />
              Számolási Előzmények ({history.length})
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-400">
              Kattints a korábbi számításra a visszatöltéshez:
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1 py-2">
            {history.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-sm">
                Még nincsenek elmentett számítások.
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-950 p-3 rounded-xl border border-slate-800 hover:border-cyan-500/50 transition-all flex items-center justify-between"
                >
                  <div
                    className="cursor-pointer flex-1"
                    onClick={() => {
                      setExpression(item.expression);
                      setCursorPos(item.expression.length);
                      setResult(item.displayResult);
                      setRawNumericResult(item.result);
                      setShowHistory(false);
                      toast.info('Számítás visszatöltve a számológépbe!');
                    }}
                  >
                    <div className="text-xs text-slate-400 font-mono">{item.expression}</div>
                    <div className="text-base font-bold text-emerald-400 font-mono">
                      = {item.displayResult}
                      {item.fractionResult && (
                        <span className="text-xs text-cyan-400 ml-2">({item.fractionResult})</span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(item.displayResult, item.id)}
                    className="w-8 h-8 text-slate-400 hover:text-white"
                    title="Eredmény másolása"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setHistory([]);
                toast.success('Előzmények törölve!');
              }}
              disabled={history.length === 0}
              className="border-slate-700 text-xs text-red-400"
            >
              Törlés
            </Button>
            <Button
              size="sm"
              onClick={() => setShowHistory(false)}
              className="bg-cyan-600 hover:bg-cyan-500 text-xs"
            >
              Bezárás
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* CASIO KISOKOS DIALOG */}
      <Dialog open={showGuide} onOpenChange={setShowGuide}>
        <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 max-w-xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              Casio fx-82ES Útmutató és Kisokos
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-400">
              Hasznos gombok és tippek az érettségihez és a dolgozatokhoz:
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 text-xs pt-2">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <h3 className="font-bold text-[#facc15] text-sm flex items-center gap-1.5">
                <span>1. Törtbeírás és S⇔D konverzió</span>
              </h3>
              <p className="text-slate-300">
                A <span className="font-mono bg-slate-800 px-1 py-0.5 rounded text-emerald-400">■/□</span> gombbal írhatsz be törteket (pl. <span className="font-mono">3 / 4</span>).
                A számítás elvégzése után a <span className="font-mono bg-slate-800 px-1 py-0.5 rounded text-cyan-400">S⇔D</span> gomb lenyomásával tudsz váltani a <strong>pontos törtalak</strong> (<span className="font-mono">3/4</span>) és a <strong>tizedestört</strong> (<span className="font-mono">0.75</span>) között.
              </p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <h3 className="font-bold text-[#facc15] text-sm flex items-center gap-1.5">
                <span>2. Szögegységek (Fok / Radián)</span>
              </h3>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li><strong className="text-white">D (DEG - Fok):</strong> pl. <span className="font-mono">sin(30°) = 0.5</span>.</li>
                <li><strong className="text-white">R (RAD - Radián):</strong> pl. <span className="font-mono">sin(π/2) = 1</span>.</li>
              </ul>
              <p className="text-slate-400 text-[11px]">
                A szögegység egyszerűen váltható a kijelző tetején lévő <strong>D / R / G</strong> betűre kattintva.
              </p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <h3 className="font-bold text-[#facc15] text-sm flex items-center gap-1.5">
                <span>3. Változók és Memória (Ans, STO, RCL)</span>
              </h3>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li><strong className="text-white">Ans:</strong> Mindig automatikusan tartalmazza az utolsó eredményt.</li>
                <li><strong className="text-white">SHIFT + RCL (STO) + Betű (A..F, X, Y, M):</strong> Elmenti a jelenlegi számot.</li>
                <li><strong className="text-white">ALPHA + Betű:</strong> Beilleszti a változó betűjelét a képletbe.</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <h3 className="font-bold text-[#facc15] text-sm flex items-center gap-1.5">
                <span>4. Kombinatorika</span>
              </h3>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li><strong className="text-white">Faktoriális:</strong> <span className="font-mono">5! = 120</span> (<span className="font-mono">SHIFT + x⁻¹</span>)</li>
                <li><strong className="text-white">Kombináció:</strong> <span className="font-mono">5 nCr 2 = 10</span> (<span className="font-mono">SHIFT + ÷</span>)</li>
                <li><strong className="text-white">Permutáció:</strong> <span className="font-mono">5 nPr 2 = 20</span> (<span className="font-mono">SHIFT + ×</span>)</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-800">
            <Button
              size="sm"
              onClick={() => setShowGuide(false)}
              className="bg-cyan-600 hover:bg-cyan-500 text-xs"
            >
              Rendben
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
