import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  RotateCcw,
  Trophy,
  Sparkles,
  Clock,
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  Flame,
  Zap,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type MatcherLevel = 1 | 2 | 3;

interface CardItem {
  id: string;
  pairId: string;
  content: string;
  type: 'prompt' | 'target';
  matched: boolean;
}

interface LevelData {
  title: string;
  subtitle: string;
  badge: string;
  pairs: { prompt: string; target: string }[];
}

const MATCHER_LEVELS: Record<MatcherLevel, LevelData> = {
  1: {
    title: '1. Könnyű szint',
    subtitle: 'Pontok, alapfogalmak és egyes szomszédok',
    badge: 'Alapok',
    pairs: [
      { prompt: 'A(4) koordinátája', target: '4-es pont az egyenesen' },
      { prompt: 'B(12) koordinátája', target: '12-es pont az egyenesen' },
      { prompt: 'Origó', target: '0 kezdőpont' },
      { prompt: 'Nyíl a számegyenesen', target: 'Növekedés iránya (jobbra)' },
      { prompt: '8 egyes szomszédai', target: '7 és 9' },
      { prompt: '15 egyes szomszédai', target: '14 és 16' },
      { prompt: '0, 2, 4, 6... skála', target: 'Kettesével lépked' },
      { prompt: '0, 5, 10, 15... skála', target: 'Ötösével lépked' },
      { prompt: 'Távolság 3 és 8 között', target: '5 egység' },
      { prompt: 'Távolság 10 és 17 között', target: '7 egység' }
    ]
  },
  2: {
    title: '2. Közepes szint',
    subtitle: 'Tízes/százas szomszédok, távolságok és felezőpontok',
    badge: 'Közepes',
    pairs: [
      { prompt: '647 tízes szomszédai', target: '640 és 650' },
      { prompt: '823 százas szomszédai', target: '800 és 900' },
      { prompt: '156 tízes szomszédai', target: '150 és 160' },
      { prompt: '3800 ezres szomszédai', target: '3000 és 4000' },
      { prompt: '20 és 80 felezőpontja', target: '50' },
      { prompt: '100 és 300 felezőpontja', target: '200' },
      { prompt: 'Távolság 35 és 90 között', target: '55 egység' },
      { prompt: 'Távolság 120 és 450 között', target: '330 egység' },
      { prompt: '0 és 100 közt 5 szakasz', target: 'Lépésköz = 20' },
      { prompt: '0 és 500 közt 5 szakasz', target: 'Lépésköz = 100' }
    ]
  },
  3: {
    title: '3. Haladó szint',
    subtitle: 'Nagy számok, összetett lépésközök és felezőpontok',
    badge: 'Haladó',
    pairs: [
      { prompt: '2400 és 3600 felezőpontja', target: '3000' },
      { prompt: '150 és 850 felezőpontja', target: '500' },
      { prompt: '7500 tízes szomszédai', target: '7490 és 7510' },
      { prompt: '45210 százas szomszédai', target: '45200 és 45300' },
      { prompt: '200 és 600 közt 8 szakasz', target: 'Lépésköz = 50' },
      { prompt: '1000 és 5000 közt 4 szakasz', target: 'Lépésköz = 1000' },
      { prompt: 'Távolság 1250 és 3750 közt', target: '2500 egység' },
      { prompt: 'Távolság 840 és 2140 közt', target: '1300 egység' },
      { prompt: 'A(300) és B(700) közepe', target: 'M(500)' },
      { prompt: 'X(1200) és Y(1800) távolsága', target: 'd = 600' }
    ]
  }
};

function shuffleCards(level: MatcherLevel): CardItem[] {
  const data = MATCHER_LEVELS[level];
  const cards: CardItem[] = [];

  data.pairs.forEach((p, idx) => {
    const pairId = `p-${idx}`;
    cards.push({
      id: `${pairId}-prompt`,
      pairId,
      content: p.prompt,
      type: 'prompt',
      matched: false
    });
    cards.push({
      id: `${pairId}-target`,
      pairId,
      content: p.target,
      type: 'target',
      matched: false
    });
  });

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}

interface NumberLineMatcherProps {
  initialLevel?: MatcherLevel;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
}

export function NumberLineMatcher({
  initialLevel = 1,
  onBack,
  onSwitchToQuiz
}: NumberLineMatcherProps) {
  const [level, setLevel] = useState<MatcherLevel>(initialLevel);
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardItem[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    initGame(level);
  }, [level]);

  useEffect(() => {
    let interval: any = null;
    if (timerActive && !isCompleted) {
      interval = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, isCompleted]);

  const initGame = (lvl: MatcherLevel) => {
    setCards(shuffleCards(lvl));
    setSelectedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setTime(0);
    setTimerActive(false);
    setIsCompleted(false);
  };

  const handleCardClick = (card: CardItem) => {
    if (card.matched || selectedCards.some((c) => c.id === card.id) || selectedCards.length >= 2) {
      return;
    }

    if (!timerActive) {
      setTimerActive(true);
    }

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newSelected;

      if (first.pairId === second.pairId && first.type !== second.type) {
        // Match found!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.pairId === first.pairId ? { ...c, matched: true } : c))
          );
          setSelectedCards([]);
          setMatchedPairs((mp) => {
            const next = mp + 1;
            if (next === 10) {
              handleVictory();
            }
            return next;
          });
        }, 300);
      } else {
        // No match
        setTimeout(() => {
          setSelectedCards([]);
        }, 900);
      }
    }
  };

  const handleVictory = () => {
    setIsCompleted(true);
    setTimerActive(false);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-3.5 text-left animate-in fade-in duration-200">
      {/* Top Header Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white dark:bg-slate-900 p-3 rounded-2xl border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-1.5">
          {([1, 2, 3] as MatcherLevel[]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setLevel(lvl);
                initGame(lvl);
              }}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1",
                level === lvl
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
              )}
            >
              <Flame className={cn("w-3.5 h-3.5", level === lvl ? "text-amber-300" : "text-slate-400")} />
              {lvl}. szint
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>{formatTime(time)}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>{moves} lépés</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{matchedPairs} / 10 pár</span>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => initGame(level)}
            className="rounded-xl h-8 px-2 text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" /> Újra
          </Button>
        </div>
      </div>

      {/* Cards 4x5 Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
        {cards.map((card) => {
          const isSelected = selectedCards.some((c) => c.id === card.id);
          const isMatched = card.matched;

          let cardStyle = "bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-emerald-500 hover:shadow-xs";

          if (isMatched) {
            cardStyle = "bg-emerald-50/70 dark:bg-emerald-950/40 border-2 border-emerald-400/80 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 opacity-60 pointer-events-none scale-95 transition-transform";
          } else if (isSelected) {
            cardStyle = "bg-emerald-100 dark:bg-emerald-900/80 border-2 border-emerald-500 text-emerald-950 dark:text-emerald-100 shadow-sm scale-102 transition-transform";
          }

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              disabled={isMatched}
              className={cn(
                "h-20 sm:h-22 p-2 rounded-2xl font-bold text-xs sm:text-sm flex flex-col items-center justify-center text-center transition-all duration-150 relative overflow-hidden select-none",
                cardStyle
              )}
            >
              <div className="line-clamp-3 leading-snug">
                {card.content}
              </div>

              {isMatched && (
                <div className="absolute bottom-1 right-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Completion Modal */}
      {isCompleted && (
        <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-emerald-950/60 rounded-3xl border-2 border-emerald-300 dark:border-emerald-800 shadow-lg text-center animate-in zoom-in-95 duration-200">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <Trophy className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">
            Gratulálunk! Mind a 10 párt megtaláltad! 🌟
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
            Idő: <strong className="text-slate-900 dark:text-white">{formatTime(time)}</strong> • Lépések száma: <strong className="text-slate-900 dark:text-white">{moves}</strong>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {level < 3 && (
              <Button
                onClick={() => {
                  setLevel((l) => (l + 1) as MatcherLevel);
                }}
                className="h-9 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
              >
                Következő szint: {level + 1}. szint
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            )}

            <Button
              variant="outline"
              onClick={() => initGame(level)}
              className="h-9 px-4 rounded-xl text-xs font-bold border-slate-200 dark:border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Újrapróbálom
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NumberLineMatcher;
