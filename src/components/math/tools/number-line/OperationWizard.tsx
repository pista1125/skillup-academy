import React, { useState, useEffect } from 'react';
import { NumberLineMode, MagnitudeScale, FractionDisplayType, NumberArrow, PointMarker } from './types';
import { computeSignRule, formatFractionText, simplifyFraction } from './numberLineMath';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Play,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  CheckCircle2,
  Plus,
  Minus,
  Sparkles,
  Link2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface OperationWizardProps {
  mode: NumberLineMode;
  denominator: number;
  setDenominator: (den: number) => void;
  magnitude: MagnitudeScale;
  fractionDisplay: FractionDisplayType;
  setMarkers: React.Dispatch<React.SetStateAction<PointMarker[]>>;
  setArrows: React.Dispatch<React.SetStateAction<NumberArrow[]>>;
  onCenterRange: (startVal: number, endVal: number) => void;
}

export function OperationWizard({
  mode,
  denominator,
  setDenominator,
  magnitude,
  fractionDisplay,
  setMarkers,
  setArrows,
  onCenterRange
}: OperationWizardProps) {
  // Integer / Magnitude state
  const [startNum, setStartNum] = useState<number>(-2);
  const [operation, setOperation] = useState<'+' | '-'>('+');
  const [stepNum, setStepNum] = useState<number>(-3);

  // Fraction mode specific state
  const [fracStartNumerator, setFracStartNumerator] = useState<number>(3);
  const [fracStepNumerator, setFracStepNumerator] = useState<number>(2);

  // Sync when mode changes
  useEffect(() => {
    if (mode === 'integers') {
      setStartNum(-2);
      setOperation('+');
      setStepNum(-3);
    } else if (mode === 'fractions') {
      setFracStartNumerator(3);
      setOperation('+');
      setFracStepNumerator(2);
    } else if (mode === 'magnitudes') {
      setStartNum(400);
      setOperation('+');
      setStepNum(-650);
    }
  }, [mode]);

  // Derived calculations
  let effectiveStart = startNum;
  let effectiveStep = stepNum;
  let effectiveEnd = startNum;

  let ruleInfo: any = null;

  if (mode === 'fractions') {
    const d = Math.max(1, denominator);
    effectiveStart = fracStartNumerator / d;
    effectiveStep = fracStepNumerator / d;

    // Fractional rule
    const isStepNeg = fracStepNumerator < 0;
    const absStepNum = Math.abs(fracStepNumerator);
    let resolvedSign: '+' | '-' = '+';
    let dir: 'left' | 'right' = 'right';
    let explanation = '';

    if (operation === '+') {
      if (!isStepNeg) {
        resolvedSign = '+';
        dir = 'right';
        explanation = `Pozitív tört hozzáadása: a nevező azonos (${d}), ezért a számlálókat összeadjuk és JOBBRA lépünk ${absStepNum} törtosztást.`;
      } else {
        resolvedSign = '-';
        dir = 'left';
        explanation = `A + (-${absStepNum}/${d}) találkozásakor kivonás lesz (+ és - = mínusz), így BALRA lépünk ${absStepNum} törtosztást.`;
      }
    } else {
      // operation === '-'
      if (!isStepNeg) {
        resolvedSign = '-';
        dir = 'left';
        explanation = `Kivonunk egy törtet: a kivonás csökkenti az értéket, így BALRA lépünk ${absStepNum} törtosztást.`;
      } else {
        resolvedSign = '+';
        dir = 'right';
        explanation = `Két negatív előjel (- és -) összeadássá válik: a kivonás negálása hozzáadás, így JOBBRA lépünk ${absStepNum} törtosztást!`;
      }
    }

    const endNumerator = resolvedSign === '+'
      ? fracStartNumerator + absStepNum
      : fracStartNumerator - absStepNum;

    effectiveEnd = endNumerator / d;

    const opDisplay = isStepNeg ? `(${fracStepNumerator}/${d})` : `${fracStepNumerator}/${d}`;
    const startDisplay = `${fracStartNumerator}/${d}`;
    const resDisplay = `${endNumerator}/${d}`;
    const mixedDisplay = formatFractionText(endNumerator, d, 'mixed');

    ruleInfo = {
      startDisplay,
      opDisplay,
      resolvedSign,
      dir,
      explanation,
      formulaDisplay: `${startDisplay} ${operation} ${opDisplay} = ${resDisplay}${resDisplay !== mixedDisplay ? ` (${mixedDisplay})` : ''}`,
      effectiveEnd,
      stepCount: absStepNum
    };
  } else {
    // Integers / Magnitudes
    ruleInfo = computeSignRule(startNum, operation, stepNum);
    effectiveStart = ruleInfo.start;
    effectiveEnd = ruleInfo.end;
  }

  // Action: Apply step onto Number Line
  const handleApplyStep = () => {
    const isFraction = mode === 'fractions';
    const d = denominator;

    // Start Marker
    const startMarker: PointMarker = {
      id: `start-${Date.now()}`,
      value: effectiveStart,
      isStart: true,
      color: '#10b981', // Emerald
      label: isFraction
        ? `Kezdő: ${formatFractionText(fracStartNumerator, d, fractionDisplay)}`
        : `Kezdő: ${effectiveStart}`
    };

    // End Marker
    const endMarker: PointMarker = {
      id: `end-${Date.now()}`,
      value: effectiveEnd,
      isResult: true,
      color: '#f59e0b', // Amber
      label: isFraction
        ? `Cél: ${formatFractionText(Math.round(effectiveEnd * d), d, fractionDisplay)}`
        : `Cél: ${effectiveEnd}`
    };

    // Jump Arrow
    const arrowLength = effectiveEnd - effectiveStart;
    const arrow: NumberArrow = {
      id: `arrow-${Date.now()}`,
      startValue: effectiveStart,
      length: arrowLength,
      yLevel: 1,
      color: arrowLength >= 0 ? '#3b82f6' : '#ef4444',
      operationText: isFraction
        ? `${operation} ${Math.abs(fracStepNumerator)}/${d}`
        : `${operation} (${stepNum})`,
      effectiveStep: arrowLength
    };

    setMarkers([startMarker, endMarker]);
    setArrows([arrow]);

    // Center and frame nicely
    onCenterRange(effectiveStart, effectiveEnd);
  };

  // Action: Chain Next Step (current end becomes the new start!)
  const handleChainStep = () => {
    if (mode === 'fractions') {
      const d = denominator;
      const currentEndNumerator = Math.round(effectiveEnd * d);
      setFracStartNumerator(currentEndNumerator);
      setFracStepNumerator(1);
    } else {
      setStartNum(effectiveEnd);
      setStepNum(mode === 'magnitudes' ? magnitude * 2 : 2);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Pedagógiai Műveletlevezető & Előjelszabály
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Állítsd be a műveletet, és figyeld meg az előjelek és lépések logikáját!
            </p>
          </div>
        </div>

        <Badge variant="secondary" className="font-mono text-xs">
          {mode === 'integers' && 'Egész számok'}
          {mode === 'fractions' && `Törtek (nevező: ${denominator})`}
          {mode === 'magnitudes' && `${magnitude}-as lépték`}
        </Badge>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
        {/* 1. Start Value */}
        <div className="flex flex-col gap-1.5 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/60">
          <label className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            1. Kezdőpont
          </label>
          {mode === 'fractions' ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Számláló:</span>
              <Input
                type="number"
                value={fracStartNumerator}
                onChange={e => setFracStartNumerator(parseInt(e.target.value) || 0)}
                className="h-8 font-mono font-bold text-center w-20"
              />
              <span className="text-sm font-bold text-slate-500">/ {denominator}</span>
            </div>
          ) : (
            <Input
              type="number"
              step={mode === 'magnitudes' ? magnitude / 2 : 1}
              value={startNum}
              onChange={e => setStartNum(parseFloat(e.target.value) || 0)}
              className="h-9 font-mono font-bold text-base text-center"
            />
          )}
        </div>

        {/* 2. Operation Button (+ or -) */}
        <div className="flex flex-col gap-1.5 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/60">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
            2. Műveleti jel
          </label>
          <div className="grid grid-cols-2 gap-2 h-9">
            <Button
              type="button"
              variant={operation === '+' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setOperation('+')}
              className={cn(
                "h-full font-bold text-base transition-all",
                operation === '+' ? "bg-blue-600 hover:bg-blue-700 text-white" : ""
              )}
            >
              <Plus className="w-4 h-4 mr-1" /> Hozzáadás (+)
            </Button>
            <Button
              type="button"
              variant={operation === '-' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setOperation('-')}
              className={cn(
                "h-full font-bold text-base transition-all",
                operation === '-' ? "bg-red-600 hover:bg-red-700 text-white" : ""
              )}
            >
              <Minus className="w-4 h-4 mr-1" /> Kivonás (−)
            </Button>
          </div>
        </div>

        {/* 3. Step Value (Operand) */}
        <div className="flex flex-col gap-1.5 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700/60">
          <label className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
            3. Lépés nagysága és előjele
          </label>
          {mode === 'fractions' ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Számláló:</span>
              <Input
                type="number"
                value={fracStepNumerator}
                onChange={e => setFracStepNumerator(parseInt(e.target.value) || 0)}
                className="h-8 font-mono font-bold text-center w-20"
              />
              <span className="text-sm font-bold text-slate-500">/ {denominator}</span>
            </div>
          ) : (
            <Input
              type="number"
              step={mode === 'magnitudes' ? magnitude / 2 : 1}
              value={stepNum}
              onChange={e => setStepNum(parseFloat(e.target.value) || 0)}
              className="h-9 font-mono font-bold text-base text-center"
            />
          )}
        </div>
      </div>

      {/* Pedagogical Explanation Card */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200/80 dark:border-blue-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-900 dark:text-blue-200">
              Szabály & Magyarázat:
            </span>
            <Badge
              className={cn(
                "text-[11px] font-bold font-mono",
                (ruleInfo?.direction === 'right' || ruleInfo?.dir === 'right')
                  ? "bg-blue-600 hover:bg-blue-600 text-white"
                  : "bg-red-600 hover:bg-red-600 text-white"
              )}
            >
              {(ruleInfo?.direction === 'right' || ruleInfo?.dir === 'right') ? (
                <span className="flex items-center gap-1"><ArrowRight className="w-3 h-3" /> JOBBRA lépsz</span>
              ) : (
                <span className="flex items-center gap-1"><ArrowLeft className="w-3 h-3" /> BALRA lépsz</span>
              )}
            </Badge>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
            {mode === 'fractions' ? ruleInfo?.explanation : ruleInfo?.pedagogicalNote}
          </p>
        </div>

        {/* Formula Result Pill */}
        <div className="shrink-0 bg-white dark:bg-slate-900 px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-800 shadow-sm text-center">
          <div className="text-[10px] uppercase font-bold text-slate-400">Egyenlet</div>
          <div className="font-mono text-sm sm:text-base font-black text-indigo-700 dark:text-indigo-300">
            {ruleInfo?.formulaDisplay}
          </div>
        </div>
      </div>

      {/* Wizard Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-2">
          <Button
            onClick={handleApplyStep}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-600/20"
          >
            <Play className="w-4 h-4 mr-2" />
            Lépés ábrázolása a számegyenesen
          </Button>

          <Button
            variant="outline"
            onClick={handleChainStep}
            className="border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950"
            title="A mostani eredmény lesz a következő lépés kezdőpontja"
          >
            <Link2 className="w-4 h-4 mr-1.5" />
            Következő lépés láncolása
          </Button>
        </div>

        <div className="text-xs text-slate-400 italic">
          💡 Tipp: a számegyenes szabadon húzható és a görgővel zoomolható!
        </div>
      </div>
    </div>
  );
}
