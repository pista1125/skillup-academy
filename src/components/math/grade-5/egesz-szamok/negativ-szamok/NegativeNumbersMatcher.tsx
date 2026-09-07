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
  Snowflake,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DifficultyLevel } from './NegativeNumbersQuiz';

interface CardItem {
  id: string;
  pairId: string;
  content: string;
  type: 'situation' | 'number';
  isFlipped: boolean;
  isMatched: boolean;
}

interface MatcherLevelConfig {
  pairs: { id: string; situation: string; number: string }[];
}

const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    pairs: [
      { id: 'm1-1', situation: '8 fok fagy ❄️', number: '-8 °C' },
      { id: 'm1-2', situation: '1500 Ft tartozás 💸', number: '-1 500 Ft' },
      { id: 'm1-3', situation: '25 méterrel a tengerszint alatt 🌊', number: '-25 m' },
      { id: 'm1-4', situation: '3. emelet a liftben 🏢', number: '+3. emelet' },
      { id: 'm1-5', situation: '2. mélygarázs szint 🚗', number: '-2. szint' },
      { id: 'm1-6', situation: 'A víz fagyáspontja 🧊', number: '0 °C' },
      { id: 'm1-7', situation: '5000 Ft zsebpénz 💰', number: '+5 000 Ft' },
      { id: 'm1-8', situation: '18 fok kellemes meleg ☀️', number: '+18 °C' }
    ]
  },
  2: {
    pairs: [
      { id: 'm2-1', situation: 'Nullától 4 egységgel balra', number: '-4' },
      { id: 'm2-2', situation: 'A -7 ellentettje', number: '+7' },
      { id: 'm2-3', situation: '-10 és -3 közül a nagyobb', number: '-3' },
      { id: 'm2-4', situation: '0-nál 6-tal kisebb szám', number: '-6' },
      { id: 'm2-5', situation: '-15 és +5 közötti távolság', number: '20 egység' },
      { id: 'm2-6', situation: 'A -1 közvetlen bal szomszédja', number: '-2' },
      { id: 'm2-7', situation: 'A -5 közvetlen jobb szomszédja', number: '-4' },
      { id: 'm2-8', situation: 'A legnagyobb negatív egész szám', number: '-1' }
    ]
  },
  3: {
    pairs: [
      { id: 'm3-1', situation: '-3 °C-ról melegszik 5 °C-ot', number: '+2 °C' },
      { id: 'm3-2', situation: '+4. emeletről lemegy 6 szintet', number: '-2. szint' },
      { id: 'm3-3', situation: '-500 Ft tartozásra befizet 2000 Ft-ot', number: '+1 500 Ft' },
      { id: 'm3-4', situation: '-12-nél 8-cal nagyobb szám', number: '-4' },
      { id: 'm3-5', situation: '-20-nál 5-tel kisebb szám', number: '-25' },
      { id: 'm3-6', situation: 'Tengerszint -15 m-ről felmászik 30 m-t', number: '+15 m' },
      { id: 'm3-7', situation: '-10 és +10 összege', number: '0' },
      { id: 'm3-8', situation: '-100-nál 50-nel nagyobb szám', number: '-50' }
    ]
  }
};

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface NegativeNumbersMatcherProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function NegativeNumbersMatcher({
  level,
  onNextLevel,
  onOpenRules
}: NegativeNumbersMatcherProps) {
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
    const levelPairs = MATCHER_LEVELS[level].pairs;
    const cardList: CardItem[] = [];

    levelPairs.forEach((pair) => {
      cardList.push({
        id: `${pair.id}-sit`,
        pairId: pair.id,
        content: pair.situation,
        type: 'situation',
        isFlipped: false,
        isMatched: false
      });
      cardList.push({
        id: `${pair.id}-num`,
        pairId: pair.id,
        content: pair.number,
        type: 'number',
        isFlipped: false,
        isMatched: false
      });
    });

    setCards(shuffleArray(cardList));
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

  // Timer effect
  useEffect(() => {
    let interval: any;
    if (timerActive && !isCompleted) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, isCompleted]);

  const handleCardClick = (card: CardItem) => {
    if (isChecking || card.isFlipped || card.isMatched) return;

    // Flip the clicked card
    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setIsChecking(true);
      const [first, second] = newSelected;

      if (first.pairId === second.pairId && first.type !== second.type) {
        // Matched!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === first.pairId ? { ...c, isMatched: true, isFlipped: true } : c
            )
          );
          setSelectedCards([]);
          setIsChecking(false);
          const newMatches = matchesCount + 1;
          setMatchesCount(newMatches);

          if (newMatches === MATCHER_LEVELS[level].pairs.length) {
            setIsCompleted(true);
            setTimerActive(false);
            confetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.6 }
            });
          }
        }, 500);
      } else {
        // Mismatch - flip back
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
          setMistakes((prev) => prev + 1);
        }, 1000);
      }
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`;
  };

  if (isCompleted) {
    return (
      <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 shadow-md text-center space-y-5 animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/30">
          <Trophy className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Minden párt sikeresen megtaláltál! 🎉
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Remekül átlátod a negatív számok és hétköznapi párjaik kapcsolatát!
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto bg-slate-50 dark:bg-slate-850 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Idő</div>
            <div className="text-lg font-black font-mono text-slate-800 dark:text-slate-100">
              {formatTime(seconds)}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Hibák</div>
            <div className="text-lg font-black font-mono text-amber-600 dark:text-amber-400">
              {mistakes}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {onNextLevel && (
            <Button
              onClick={onNextLevel}
              className="h-10 px-5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold"
            >
              Következő szint
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          )}

          <Button
            variant="outline"
            onClick={initGame}
            className="h-10 px-4 rounded-xl border-slate-200 dark:border-slate-700 text-xs font-bold"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Újrakezdés
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-3 rounded-2xl border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300">
            <Clock className="w-4 h-4 text-cyan-500" />
            <span className="font-mono">{formatTime(seconds)}</span>
          </div>
          <div className="h-3 w-px bg-slate-200 dark:bg-slate-700" />
          <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
            Találatok: <span className="font-mono text-cyan-600 dark:text-cyan-400 font-black">{matchesCount} / {MATCHER_LEVELS[level].pairs.length}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenRules && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onOpenRules}
              className="h-7 px-2 text-xs text-cyan-700 dark:text-cyan-300"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1" />
              Segédlet
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={initGame}
            className="h-7 px-2 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Újrakeverés
          </Button>
        </div>
      </div>

      {/* 4x4 Grid of Cards (16 cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {cards.map((card) => {
          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={cn(
                "h-24 sm:h-28 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-center p-2.5 text-center select-none perspective-1000",
                card.isMatched
                  ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-800 dark:text-emerald-200 font-black scale-95 opacity-80"
                  : card.isFlipped
                  ? card.type === 'situation'
                    ? "bg-cyan-50 dark:bg-cyan-950/70 border-cyan-400 text-cyan-950 dark:text-cyan-100 font-bold shadow-md"
                    : "bg-amber-50 dark:bg-amber-950/70 border-amber-400 text-amber-950 dark:text-amber-100 font-mono font-black shadow-md"
                  : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 hover:border-cyan-400 hover:bg-cyan-50/40 text-slate-400 hover:text-cyan-600 shadow-xs"
              )}
            >
              {card.isFlipped || card.isMatched ? (
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className={cn(
                    "text-xs sm:text-sm leading-snug",
                    card.type === 'number' && "font-mono font-black text-sm sm:text-base text-cyan-700 dark:text-cyan-300"
                  )}>
                    {card.content}
                  </span>
                  {card.isMatched && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5" />
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-1">
                  <Snowflake className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-cyan-500" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Kattints</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
