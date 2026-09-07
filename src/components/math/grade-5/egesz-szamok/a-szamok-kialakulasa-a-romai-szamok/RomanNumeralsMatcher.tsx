import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  RotateCcw,
  Trophy,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Timer,
  Zap,
  ArrowRight,
  Eye,
  Star,
  Award,
  BookOpen,
  Shuffle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DifficultyLevel } from './RomanNumeralsQuiz';

interface MatchCard {
  uid: string;
  pairId: number;
  type: 'roman' | 'arabic';
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface PairItem {
  id: number;
  roman: string;
  arabic: string;
  rule?: string;
}

export const LEVEL_PAIRS: Record<DifficultyLevel, PairItem[]> = {
  1: [
    { id: 1, roman: 'V', arabic: '5', rule: '5 alapjele' },
    { id: 2, roman: 'VIII', arabic: '8', rule: '5 + 3 = 8' },
    { id: 3, roman: 'IV', arabic: '4', rule: '5 - 1 = 4' },
    { id: 4, roman: 'IX', arabic: '9', rule: '10 - 1 = 9' },
    { id: 5, roman: 'XII', arabic: '12', rule: '10 + 2 = 12' },
    { id: 6, roman: 'XIV', arabic: '14', rule: '10 + 4 = 14' },
    { id: 7, roman: 'XVI', arabic: '16', rule: '10 + 6 = 16' },
    { id: 8, roman: 'XIX', arabic: '19', rule: '10 + 9 = 19' },
    { id: 9, roman: 'XX', arabic: '20', rule: '10 + 10 = 20' },
    { id: 10, roman: 'XVIII', arabic: '18', rule: '10 + 8 = 18' }
  ],
  2: [
    { id: 1, roman: 'XXIV', arabic: '24', rule: '20 + 4 = 24' },
    { id: 2, roman: 'XXIX', arabic: '29', rule: '20 + 9 = 29' },
    { id: 3, roman: 'XXXIII', arabic: '33', rule: '30 + 3 = 33' },
    { id: 4, roman: 'XXXVIII', arabic: '38', rule: '30 + 8 = 38' },
    { id: 5, roman: 'XL', arabic: '40', rule: '50 - 10 = 40' },
    { id: 6, roman: 'XLV', arabic: '45', rule: '40 + 5 = 45' },
    { id: 7, roman: 'XLIV', arabic: '44', rule: '40 + 4 = 44' },
    { id: 8, roman: 'XLIX', arabic: '49', rule: '40 + 9 = 49' },
    { id: 9, roman: 'L', arabic: '50', rule: '50 alapjele' },
    { id: 10, roman: 'XLVII', arabic: '47', rule: '40 + 7 = 47' }
  ],
  3: [
    { id: 1, roman: 'LVIII', arabic: '58', rule: '50 + 8 = 58' },
    { id: 2, roman: 'LXIV', arabic: '64', rule: '60 + 4 = 64' },
    { id: 3, roman: 'LXXIII', arabic: '73', rule: '70 + 3 = 73' },
    { id: 4, roman: 'LXXVI', arabic: '76', rule: '70 + 6 = 76' },
    { id: 5, roman: 'LXXXIV', arabic: '84', rule: '80 + 4 = 84' },
    { id: 6, roman: 'LXXXIX', arabic: '89', rule: '80 + 9 = 89' },
    { id: 7, roman: 'XC', arabic: '90', rule: '100 - 10 = 90' },
    { id: 8, roman: 'XCIV', arabic: '94', rule: '90 + 4 = 94' },
    { id: 9, roman: 'XCIX', arabic: '99', rule: '90 + 9 = 99' },
    { id: 10, roman: 'C', arabic: '100', rule: '100 alapjele (centum)' }
  ]
};

interface RomanNumeralsMatcherProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function RomanNumeralsMatcher({
  level,
  onNextLevel,
  onOpenRules
}: RomanNumeralsMatcherProps) {
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<MatchCard[]>([]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [matchedCount, setMatchedCount] = useState(0);
  const [moves, setMoves] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [lastMatchInfo, setLastMatchInfo] = useState<string | null>(null);

  const totalPairs = 10; // All 10 pairs (20 cards total)

  // Initialize/Shuffle game board
  const initGame = useCallback(() => {
    const rawPairs = LEVEL_PAIRS[level] || LEVEL_PAIRS[1];
    // Include all 10 pairs
    const shuffledPairs = [...rawPairs].sort(() => Math.random() - 0.5).slice(0, totalPairs);

    const generatedCards: MatchCard[] = [];

    shuffledPairs.forEach((pair) => {
      // Roman card
      generatedCards.push({
        uid: `roman-${pair.id}-${Math.random().toString(36).substring(2, 6)}`,
        pairId: pair.id,
        type: 'roman',
        content: pair.roman,
        isFlipped: false,
        isMatched: false
      });
      // Arabic card
      generatedCards.push({
        uid: `arabic-${pair.id}-${Math.random().toString(36).substring(2, 6)}`,
        pairId: pair.id,
        type: 'arabic',
        content: pair.arabic,
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle the 16 cards
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

  // Timer effect
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

  // Confetti on win
  useEffect(() => {
    if (isCompleted) {
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 45 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: 0.25, y: 0.6 } });
        confetti({ ...defaults, particleCount, origin: { x: 0.75, y: 0.6 } });
      }, 350);

      return () => clearInterval(interval);
    }
  }, [isCompleted]);

  // Card click handler
  const handleCardClick = (card: MatchCard) => {
    if (isEvaluating || card.isFlipped || card.isMatched) return;

    // Flip the card
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
        // Success match
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
            setLastMatchInfo(`Pár megtalálva: ${matchedPairInfo.roman} = ${matchedPairInfo.arabic} (${matchedPairInfo.rule || ''})`);
          }

          if (nextMatchCount === totalPairs) {
            setIsTimerActive(false);
            setIsCompleted(true);
          }
        }, 400);
      } else {
        // Mismatch - flip back after delay
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

  // 1. Victory Screen
  if (isCompleted) {
    const stars = moves <= totalPairs + 2 ? 3 : moves <= totalPairs + 6 ? 2 : 1;

    return (
      <div className="w-full text-center py-4 animate-in zoom-in-95 duration-300">
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-xl max-w-xl mx-auto relative overflow-hidden">
          <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-yellow-500 text-white rounded-3xl flex items-center justify-center mx-auto shadow-lg mb-4 ring-8 ring-amber-100 dark:ring-amber-950/60 animate-bounce">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1">
            Gratulálunk! Mind a {totalPairs} pár megvan! 🎉
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-5">
            Sikeresen teljesítetted a római számok párosító játékát a(z) {level}. szinten!
          </p>

          {/* Star rating */}
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

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-2.5 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 mb-6">
            <div className="text-center">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Idő</div>
              <div className="text-xl font-black text-slate-800 dark:text-slate-100">{formatTime(secondsElapsed)}</div>
            </div>
            <div className="text-center border-x border-slate-200 dark:border-slate-700">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Lépések</div>
              <div className="text-xl font-black text-amber-600 dark:text-amber-400">{moves}</div>
            </div>
            <div className="text-center">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Párok</div>
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">{matchedCount}/{totalPairs}</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            {level < 3 && onNextLevel && (
              <Button
                onClick={onNextLevel}
                className="flex-1 h-11 rounded-xl text-sm font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-md flex items-center justify-center gap-1.5"
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

  // 2. Active Card Board
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
            <Zap className="w-3.5 h-3.5 text-indigo-500" />
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
                  ? card.type === 'roman'
                    ? "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/60 dark:to-slate-900 border-amber-400 dark:border-amber-600 text-amber-900 dark:text-amber-200 shadow-md scale-[1.02]"
                    : "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-indigo-950/60 dark:to-slate-900 border-indigo-400 dark:border-indigo-600 text-indigo-900 dark:text-indigo-200 shadow-md scale-[1.02]"
                  : "bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 border-slate-300/90 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 text-slate-400 dark:text-slate-500 cursor-pointer"
              )}
            >
              {card.isFlipped || card.isMatched ? (
                <div className="flex flex-col items-center justify-center gap-1 animate-in zoom-in-75 duration-150">
                  <span
                    className={cn(
                      "font-black tracking-wide leading-none",
                      card.type === 'roman'
                        ? "font-serif text-xl sm:text-2xl text-amber-900 dark:text-amber-200"
                        : "font-sans text-xl sm:text-2xl text-indigo-900 dark:text-indigo-200"
                    )}
                  >
                    {card.content}
                  </span>
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-sans font-bold uppercase tracking-wider",
                      card.type === 'roman'
                        ? "bg-amber-200/60 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300"
                        : "bg-indigo-200/60 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300"
                    )}
                  >
                    {card.type === 'roman' ? 'Római' : 'Arab'}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-0.5 transition-transform hover:scale-105">
                  <span className="text-xl sm:text-2xl filter drop-shadow-xs">
                    🏛️
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

export default RomanNumeralsMatcher;
