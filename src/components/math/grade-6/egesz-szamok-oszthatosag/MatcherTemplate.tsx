import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import {
  RotateCcw,
  Trophy,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  ArrowRightLeft,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DifficultyLevel } from './QuizTemplate';

export interface MatcherPair {
  id: string;
  prompt: string;
  value: string;
}

export interface MatcherLevelConfig {
  pairs: MatcherPair[];
}

export interface MatcherTemplateProps {
  level: DifficultyLevel;
  title?: string;
  subtitle?: string;
  levels: Record<DifficultyLevel, MatcherLevelConfig>;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  themeColor?: string;
}

interface CardItem {
  id: string;
  pairId: string;
  content: string;
  type: 'prompt' | 'value';
  isFlipped: boolean;
  isMatched: boolean;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function MatcherTemplate({
  level,
  title = 'Kártyás Párosító',
  subtitle = 'Kattints a kártyákra, és találd meg a feladvány-eredmény párokat!',
  levels,
  onNextLevel,
  onOpenRules
}: MatcherTemplateProps) {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardItem[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [matchesCount, setMatchesCount] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Initialize level cards
  const initGame = () => {
    const levelPairs = levels[level]?.pairs || [];
    const cardDeck: CardItem[] = [];

    levelPairs.forEach((pair) => {
      cardDeck.push({
        id: `${pair.id}-p`,
        pairId: pair.id,
        content: pair.prompt,
        type: 'prompt',
        isFlipped: false,
        isMatched: false
      });
      cardDeck.push({
        id: `${pair.id}-v`,
        pairId: pair.id,
        content: pair.value,
        type: 'value',
        isFlipped: false,
        isMatched: false
      });
    });

    setCards(shuffleArray(cardDeck));
    setSelectedCards([]);
    setIsChecking(false);
    setMatchesCount(0);
    setMistakes(0);
    setSeconds(0);
    setTimerActive(true);
    setIsCompleted(false);
  };

  useEffect(() => {
    initGame();
  }, [level]);

  // Timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && !isCompleted) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, isCompleted]);

  const handleCardClick = (clickedCard: CardItem) => {
    if (
      isChecking ||
      clickedCard.isFlipped ||
      clickedCard.isMatched ||
      selectedCards.length >= 2
    ) {
      return;
    }

    const updatedCards = cards.map((c) =>
      c.id === clickedCard.id ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);

    const newSelected = [...selectedCards, clickedCard];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setIsChecking(true);
      const [first, second] = newSelected;

      if (first.pairId === second.pairId && first.id !== second.id) {
        // MATCH!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === first.pairId ? { ...c, isMatched: true } : c
            )
          );
          setSelectedCards([]);
          setIsChecking(false);
          setMatchesCount((prev) => {
            const updated = prev + 1;
            const currentLevelPairs = levels[level]?.pairs || [];
            if (updated === currentLevelPairs.length) {
              handleWin();
            }
            return updated;
          });
        }, 400);
      } else {
        // MISMATCH
        setMistakes((prev) => prev + 1);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setSelectedCards([]);
          setIsChecking(false);
        }, 900);
      }
    }
  };

  const handleWin = () => {
    setTimerActive(false);
    setIsCompleted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const totalPairs = levels[level]?.pairs?.length || 0;

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Top Controls & Stats */}
      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-black text-slate-800 dark:text-slate-200">
              {title} ({level}. szint)
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {subtitle}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-xs">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span>{formatTime(seconds)}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>
              {matchesCount} / {totalPairs} pár
            </span>
          </div>

          {mistakes > 0 && (
            <div className="px-2.5 py-1.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-bold">
              {mistakes} hiba
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={initGame}
            className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 border-slate-200 dark:border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Újrakezdés
          </Button>

          {onOpenRules && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenRules}
              className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 text-slate-700 dark:text-slate-300"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Szabályzat
            </Button>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      {!isCompleted ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {cards.map((card) => {
            const isFlipped = card.isFlipped || card.isMatched;

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => handleCardClick(card)}
                disabled={card.isMatched || isChecking}
                className={cn(
                  'h-24 sm:h-28 p-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 flex flex-col items-center justify-center text-center select-none shadow-xs relative border-2',
                  card.isMatched
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400/80 text-emerald-700 dark:text-emerald-300 opacity-80 cursor-default scale-95'
                    : isFlipped
                    ? card.type === 'prompt'
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-md scale-[1.02]'
                      : 'bg-teal-600 text-white border-teal-700 shadow-md scale-[1.02]'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0'
                )}
              >
                {isFlipped ? (
                  <div className="animate-in zoom-in-75 duration-200 flex flex-col items-center justify-center h-full w-full">
                    <span className="leading-snug font-mono font-bold text-xs sm:text-sm px-1">{card.content}</span>
                    {card.isMatched && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 absolute top-2 right-2" />
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1.5 text-slate-400 dark:text-slate-500">
                    <Sparkles className="w-4 h-4 opacity-40 text-emerald-500" />
                    <span className="text-[10px] font-bold tracking-wider uppercase opacity-60">
                      Kattints ide!
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        /* Completion Screen */
        <div className="bg-gradient-to-b from-emerald-50/80 to-white dark:from-slate-850 dark:to-slate-900 border-2 border-emerald-300 dark:border-emerald-800/80 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-xl animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-400 to-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Fantasztikus! Mind a {totalPairs} párt megtaláltad!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Sikeresen teljesítetted a {level}. szint párosító feladatait!
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 max-w-xs mx-auto">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex-1">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase">Időeredmény</div>
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {formatTime(seconds)}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex-1">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase">Hibák</div>
              <div className="text-lg font-black text-slate-800 dark:text-slate-200 font-mono">
                {mistakes} db
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <Button
              onClick={initGame}
              variant="outline"
              className="rounded-xl h-10 px-5 font-bold border-2 border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Párosítás Újra
            </Button>

            {level < 3 && onNextLevel && (
              <Button
                onClick={onNextLevel}
                className="rounded-xl h-10 px-5 font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md text-xs sm:text-sm"
              >
                Következő Szint ({level + 1}. szint)
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
