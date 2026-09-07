import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import {
  RotateCcw,
  Trophy,
  Sparkles,
  CheckCircle2,
  Timer,
  Zap,
  ArrowRight,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DifficultyLevel } from './PlaceValueQuiz';

interface MatchCard {
  uid: string;
  pairId: number;
  type: 'expanded' | 'standard';
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface PairItem {
  id: number;
  expanded: string;
  standard: string;
  rule?: string;
}

export const LEVEL_PAIRS: Record<DifficultyLevel, PairItem[]> = {
  1: [
    { id: 1, expanded: '4E + 5Sz + 2T + 3E', standard: '4523', rule: '4000 + 500 + 20 + 3 = 4523' },
    { id: 2, expanded: '7Sz + 8T + 4E', standard: '784', rule: '700 + 80 + 4 = 784' },
    { id: 3, expanded: '2E + 0Sz + 6T + 9E', standard: '2069', rule: '2000 + 60 + 9 = 2069' },
    { id: 4, expanded: '9Sz + 0T + 5E', standard: '905', rule: '900 + 5 = 905' },
    { id: 5, expanded: '3E + 4Sz', standard: '3400', rule: '3000 + 400 = 3400' },
    { id: 6, expanded: '6 ezres valódi értéke', standard: '6000', rule: '6 · 1000 = 6000' },
    { id: 7, expanded: '5 százas valódi értéke', standard: '500', rule: '5 · 100 = 500' },
    { id: 8, expanded: '8 tízes valódi értéke', standard: '80', rule: '8 · 10 = 80' },
    { id: 9, expanded: '1000 + 200 + 30 + 4', standard: '1234', rule: 'Összegalak = 1234' },
    { id: 10, expanded: '5000 + 900 + 90 + 9', standard: '5999', rule: 'Összegalak = 5999' }
  ],
  2: [
    { id: 1, expanded: '5Té + 4E + 3Sz + 2T + 1E', standard: '54 321', rule: '50 000 + 4000 + 300 + 20 + 1' },
    { id: 2, expanded: '3Sze + 2Té + 5Sz + 8E', standard: '320 508', rule: '300 000 + 20 000 + 500 + 8' },
    { id: 3, expanded: '7Té + 9Sz + 4T', standard: '70 940', rule: '70 000 + 900 + 40' },
    { id: 4, expanded: '8 százezres értéke', standard: '800 000', rule: '8 · 100 000 = 800 000' },
    { id: 5, expanded: '4 tízezres értéke', standard: '40 000', rule: '4 · 10 000 = 40 000' },
    { id: 6, expanded: '600 000 + 50 000 + 400', standard: '650 400', rule: '650 400 összegalakja' },
    { id: 7, expanded: '90 000 + 8000 + 70 + 6', standard: '98 076', rule: '98 076 összegalakja' },
    { id: 8, expanded: '1Sze + 5E', standard: '100 005', rule: '100 000 + 5 = 100 005' },
    { id: 9, expanded: '25 darab ezres', standard: '25 000', rule: '25 · 1000 = 25 000' },
    { id: 10, expanded: '40 darab százas', standard: '4000', rule: '40 · 100 = 4000' }
  ],
  3: [
    { id: 1, expanded: '1 millió (1M)', standard: '1 000 000', rule: '1 000 000 = 10 százezres' },
    { id: 2, expanded: '7 · 100 000 + 4 · 1000 + 5 · 10', standard: '704 050', rule: '700 000 + 4000 + 50' },
    { id: 3, expanded: '9 · 100 000 + 9 · 100 + 9 · 1', standard: '900 909', rule: '900 000 + 900 + 9' },
    { id: 4, expanded: '50 darab tízezres', standard: '500 000', rule: '50 · 10 000 = 500 000' },
    { id: 5, expanded: '100 darab ezres', standard: '100 000', rule: '100 · 1000 = 100 000' },
    { id: 6, expanded: 'Legnagyobb 5-jegyű szám', standard: '99 999', rule: '9Té + 9E + 9Sz + 9T + 9E' },
    { id: 7, expanded: 'Legkisebb 6-jegyű szám', standard: '100 000', rule: '1 százezres = 100 000' },
    { id: 8, expanded: '450 darab százas', standard: '45 000', rule: '450 · 100 = 45 000' },
    { id: 9, expanded: '8 · 100 000 + 2 · 10 000', standard: '820 000', rule: '800 000 + 20 000 = 820 000' },
    { id: 10, expanded: '6 · 100 000 + 7 · 100', standard: '600 700', rule: '600 000 + 700 = 600 700' }
  ]
};

interface PlaceValueMatcherProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function PlaceValueMatcher({
  level,
  onNextLevel,
  onOpenRules
}: PlaceValueMatcherProps) {
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<MatchCard[]>([]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [matchedCount, setMatchedCount] = useState(0);
  const [moves, setMoves] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [lastMatchInfo, setLastMatchInfo] = useState<string | null>(null);

  const totalPairs = 10; // All 10 pairs (20 cards)

  const initGame = useCallback(() => {
    const rawPairs = LEVEL_PAIRS[level] || LEVEL_PAIRS[1];
    const shuffledPairs = [...rawPairs].sort(() => Math.random() - 0.5).slice(0, totalPairs);

    const generatedCards: MatchCard[] = [];

    shuffledPairs.forEach((pair) => {
      generatedCards.push({
        uid: `exp-${pair.id}-${Math.random().toString(36).substring(2, 6)}`,
        pairId: pair.id,
        type: 'expanded',
        content: pair.expanded,
        isFlipped: false,
        isMatched: false
      });
      generatedCards.push({
        uid: `std-${pair.id}-${Math.random().toString(36).substring(2, 6)}`,
        pairId: pair.id,
        type: 'standard',
        content: pair.standard,
        isFlipped: false,
        isMatched: false
      });
    });

    setCards(generatedCards.sort(() => Math.random() - 0.5));
    setSelectedCards([]);
    setIsEvaluating(false);
    setMatchedCount(0);
    setMoves(0);
    setSecondsElapsed(0);
    setIsTimerActive(true);
    setIsCompleted(false);
    setLastMatchInfo(null);
  }, [level, totalPairs]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout | null = null;
    if (isTimerActive && !isCompleted) {
      timerInterval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [isTimerActive, isCompleted]);

  useEffect(() => {
    if (isCompleted) {
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 45 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: 0.25, y: 0.6 } });
        confetti({ ...defaults, particleCount, origin: { x: 0.75, y: 0.6 } });
      }, 350);

      return () => clearInterval(interval);
    }
  }, [isCompleted]);

  const handleCardClick = (card: MatchCard) => {
    if (isEvaluating || card.isFlipped || card.isMatched) return;

    const updatedCards = cards.map((c) =>
      c.uid === card.uid ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setIsEvaluating(true);
      setMoves((prev) => prev + 1);

      const [first, second] = newSelected;
      const isMatch = first.pairId === second.pairId && first.type !== second.type;

      if (isMatch) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === first.pairId ? { ...c, isMatched: true, isFlipped: true } : c
            )
          );
          setSelectedCards([]);
          setIsEvaluating(false);
          const nextMatchCount = matchedCount + 1;
          setMatchedCount(nextMatchCount);

          const matchedPairInfo = LEVEL_PAIRS[level].find((p) => p.id === first.pairId);
          if (matchedPairInfo) {
            setLastMatchInfo(`Pár megtalálva: ${matchedPairInfo.expanded} = ${matchedPairInfo.standard} (${matchedPairInfo.rule || ''})`);
          }

          if (nextMatchCount === totalPairs) {
            setIsTimerActive(false);
            setIsCompleted(true);
          }
        }, 400);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.uid === first.uid || c.uid === second.uid
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setSelectedCards([]);
          setIsEvaluating(false);
        }, 900);
      }
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  if (isCompleted) {
    const stars = moves <= totalPairs + 2 ? 3 : moves <= totalPairs + 6 ? 2 : 1;

    return (
      <div className="w-full text-center py-4 animate-in zoom-in-95 duration-300">
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xl max-w-xl mx-auto relative overflow-hidden">
          <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-indigo-600 text-white rounded-3xl flex items-center justify-center mx-auto shadow-lg mb-4 ring-8 ring-blue-100 dark:ring-blue-950/60 animate-bounce">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1">
            Gratulálunk! Mind a {totalPairs} pár megvan! 🎉
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-5">
            Sikeresen teljesítetted a helyiértékes párosító játékot a(z) {level}. szinten!
          </p>

          <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3].map((starIdx) => (
              <Star
                key={starIdx}
                className={cn(
                  "w-8 h-8 transition-transform",
                  starIdx <= stars
                    ? "text-amber-400 fill-amber-400 scale-110"
                    : "text-slate-200 dark:text-slate-700"
                )}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2.5 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 mb-6">
            <div className="text-center">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Idő</div>
              <div className="text-xl font-black text-slate-800 dark:text-slate-100">{formatTime(secondsElapsed)}</div>
            </div>
            <div className="text-center border-x border-slate-200 dark:border-slate-700">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Lépések</div>
              <div className="text-xl font-black text-blue-600 dark:text-blue-400">{moves}</div>
            </div>
            <div className="text-center">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Párok</div>
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">{matchedCount}/{totalPairs}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            {level < 3 && onNextLevel && (
              <Button
                onClick={onNextLevel}
                className="flex-1 h-11 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center justify-center gap-1.5"
              >
                Következő szint: {level + 1}. szint
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}

            <Button
              variant="outline"
              onClick={initGame}
              className="flex-1 h-11 rounded-xl text-sm font-bold border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4 mr-1 text-slate-500" />
              Újrajátszás
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Board Top Status Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Párok:
          </span>
          <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-black text-xs border border-emerald-200 dark:border-emerald-800">
            {matchedCount} / {totalPairs}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <Timer className="w-3.5 h-3.5 text-amber-500" />
            <span>{formatTime(secondsElapsed)}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <Zap className="w-3.5 h-3.5 text-blue-500" />
            <span>{moves} lépés</span>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={initGame}
            title="Kártyák újrakeverése"
            className="h-7 px-2 text-xs rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* 5x4 Grid of 20 Cards (10 Pairs) */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-2.5 w-full">
        {cards.map((card) => {
          const isSelected = selectedCards.some((c) => c.uid === card.uid);

          return (
            <button
              key={card.uid}
              onClick={() => handleCardClick(card)}
              disabled={card.isMatched || isEvaluating}
              className={cn(
                "relative min-h-[80px] sm:min-h-[92px] md:min-h-[102px] p-2 rounded-xl transition-all duration-200 flex flex-col items-center justify-center border-2 select-none shadow-xs",
                card.isMatched
                  ? "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 shadow-inner opacity-90 cursor-default"
                  : card.isFlipped || isSelected
                  ? card.type === 'expanded'
                    ? "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/60 dark:to-slate-900 border-blue-400 dark:border-blue-600 text-blue-900 dark:text-blue-200 shadow-md scale-[1.02]"
                    : "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/60 dark:to-slate-900 border-amber-400 dark:border-amber-600 text-amber-900 dark:text-amber-200 shadow-md scale-[1.02]"
                  : "bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 border-slate-300/90 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 text-slate-400 dark:text-slate-500 cursor-pointer"
              )}
            >
              {card.isFlipped || card.isMatched ? (
                <div className="flex flex-col items-center justify-center gap-1 animate-in zoom-in-75 duration-150 text-center px-1">
                  <span
                    className={cn(
                      "font-black tracking-tight leading-snug",
                      card.content.length > 10 ? "text-xs sm:text-sm" : "text-base sm:text-xl",
                      card.type === 'expanded'
                        ? "font-mono text-blue-900 dark:text-blue-200"
                        : "font-sans font-black text-slate-800 dark:text-slate-100"
                    )}
                  >
                    {card.content}
                  </span>
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-sans font-bold uppercase tracking-wider",
                      card.type === 'expanded'
                        ? "bg-blue-200/60 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300"
                        : "bg-amber-200/60 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300"
                    )}
                  >
                    {card.type === 'expanded' ? 'Felbontás' : 'Szám'}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-0.5 transition-transform hover:scale-105">
                  <span className="text-xl sm:text-2xl filter drop-shadow-xs">
                    🔢
                  </span>
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    Kártya
                  </span>
                </div>
              )}

              {card.isMatched && (
                <div className="absolute top-1.5 right-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Info / Explanation pill */}
      {lastMatchInfo && (
        <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-xs font-medium text-emerald-800 dark:text-emerald-200 flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{lastMatchInfo}</span>
          </div>
          {onOpenRules && (
            <button
              onClick={onOpenRules}
              className="text-[11px] underline font-bold hover:text-emerald-900 dark:hover:text-emerald-100"
            >
              Szabályok
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default PlaceValueMatcher;
