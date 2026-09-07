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
import { DifficultyLevel } from './NumberSpellingQuiz';

interface MatchCard {
  uid: string;
  pairId: number;
  type: 'digits' | 'words';
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface PairItem {
  id: number;
  digits: string;
  words: string;
  rule?: string;
}

export const LEVEL_PAIRS: Record<DifficultyLevel, PairItem[]> = {
  1: [
    { id: 1, digits: '15', words: 'tizenöt', rule: '≤ 2 000: egybeírjuk' },
    { id: 2, digits: '482', words: 'négyszáznyolcvankettő', rule: '≤ 2 000: egybeírjuk' },
    { id: 3, digits: '1 500', words: 'ezerötszáz', rule: '≤ 2 000: egybeírjuk' },
    { id: 4, digits: '1 999', words: 'ezerkilencszázkilencvenkilenc', rule: '≤ 2 000: egybeírjuk' },
    { id: 5, digits: '2 000', words: 'kétezer', rule: '≤ 2 000: egybeírjuk' },
    { id: 6, digits: '5.', words: 'ötödik', rule: 'Sorszámnév ponttal' },
    { id: 7, digits: '350', words: 'háromszázötven', rule: '≤ 2 000: egybeírjuk' },
    { id: 8, digits: '780', words: 'hétszáznyolcvan', rule: '≤ 2 000: egybeírjuk' },
    { id: 9, digits: '12.', words: 'tizenkettedik', rule: 'Sorszámnév ponttal' },
    { id: 10, digits: '900', words: 'kilencszáz', rule: '≤ 2 000: egybeírjuk' }
  ],
  2: [
    { id: 1, digits: '2 001', words: 'kétezer-egy', rule: '> 2 000: kötőjel' },
    { id: 2, digits: '2 500', words: 'kétezer-ötszáz', rule: '> 2 000: kötőjel' },
    { id: 3, digits: '3 000', words: 'háromezer', rule: 'Kerek ezres: egybeírjuk' },
    { id: 4, digits: '4 520', words: 'négyezer-ötszázhúsz', rule: '> 2 000: kötőjel' },
    { id: 5, digits: '12 300', words: 'tizenkétezer-háromszáz', rule: '> 2 000: kötőjel' },
    { id: 6, digits: '20 000', words: 'húszezer', rule: 'Kerek tízezres: egybeírjuk' },
    { id: 7, digits: '45 800', words: 'negyvenötezer-nyolcszáz', rule: '> 2 000: kötőjel' },
    { id: 8, digits: '70 005', words: 'hetvenezer-öt', rule: '> 2 000: kötőjel' },
    { id: 9, digits: '99 999', words: 'kilencvenkilencezer-kilencszázkilencvenkilenc', rule: '> 2 000: kötőjel' },
    { id: 10, digits: '8.', words: 'nyolcadik', rule: 'Sorszámnév ponttal' }
  ],
  3: [
    { id: 1, digits: '1 000 000', words: 'egymillió', rule: 'Kerek milliós' },
    { id: 2, digits: '1 250 000', words: 'egymillió-kétszázötvenezer', rule: 'Millió és ezres kötőjellel' },
    { id: 3, digits: '4 520 030', words: 'négymillió-ötszázhúszezer-harminc', rule: 'Több kötőjeles szám' },
    { id: 4, digits: '10 000 000', words: 'tízmillió', rule: 'Kerek tízmilliós' },
    { id: 5, digits: '5 000 020', words: 'ötmillió-húsz', rule: 'Millió és egyes kötőjellel' },
    { id: 6, digits: '100 005', words: 'egyszázezer-öt', rule: '> 2 000: kötőjel' },
    { id: 7, digits: '3 000 000', words: 'hárommillió', rule: 'Kerek milliós' },
    { id: 8, digits: '50.', words: 'ötvenedik', rule: 'Sorszámnév ponttal' },
    { id: 9, digits: '750 000', words: 'hétszázötvenezer', rule: 'Kerek százezres' },
    { id: 10, digits: '100.', words: 'századik', rule: 'Sorszámnév ponttal' }
  ]
};

interface NumberSpellingMatcherProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onRestartLevel?: () => void;
  onOpenRules?: () => void;
}

export function NumberSpellingMatcher({
  level,
  onNextLevel,
  onRestartLevel,
  onOpenRules
}: NumberSpellingMatcherProps) {
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<MatchCard[]>([]);
  const [matchedPairsCount, setMatchedPairsCount] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isGameActive, setIsGameActive] = useState<boolean>(true);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [lastMatchRule, setLastMatchRule] = useState<string | null>(null);

  // Initialize and shuffle cards (10 pairs = 20 cards)
  const initGame = useCallback(() => {
    const pairItems = LEVEL_PAIRS[level] || LEVEL_PAIRS[1];
    const generatedCards: MatchCard[] = [];

    pairItems.forEach((pair) => {
      generatedCards.push({
        uid: `card-${pair.id}-digits`,
        pairId: pair.id,
        type: 'digits',
        content: pair.digits,
        isFlipped: false,
        isMatched: false
      });
      generatedCards.push({
        uid: `card-${pair.id}-words`,
        pairId: pair.id,
        type: 'words',
        content: pair.words,
        isFlipped: false,
        isMatched: false
      });
    });

    // Fisher-Yates shuffle
    for (let i = generatedCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [generatedCards[i], generatedCards[j]] = [generatedCards[j], generatedCards[i]];
    }

    setCards(generatedCards);
    setSelectedCards([]);
    setMatchedPairsCount(0);
    setMoves(0);
    setSeconds(0);
    setIsGameActive(true);
    setIsCompleted(false);
    setLastMatchRule(null);
  }, [level]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isGameActive && !isCompleted) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGameActive, isCompleted]);

  // Handle card click
  const handleCardClick = (clickedCard: MatchCard) => {
    if (!isGameActive || isCompleted) return;
    if (clickedCard.isFlipped || clickedCard.isMatched) return;
    if (selectedCards.length >= 2) return;

    // Flip the clicked card
    const updatedCards = cards.map((c) =>
      c.uid === clickedCard.uid ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);

    const newSelected = [...selectedCards, clickedCard];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newSelected;

      if (first.pairId === second.pairId && first.type !== second.type) {
        // MATCH!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === first.pairId ? { ...c, isMatched: true, isFlipped: true } : c
            )
          );
          setSelectedCards([]);
          setMatchedPairsCount((count) => {
            const nextCount = count + 1;
            const totalPairs = (LEVEL_PAIRS[level] || []).length;
            if (nextCount === totalPairs) {
              setIsCompleted(true);
              setIsGameActive(false);
              confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 }
              });
            }
            return nextCount;
          });

          // Show rule hint
          const matchedPair = LEVEL_PAIRS[level]?.find((p) => p.id === first.pairId);
          if (matchedPair?.rule) {
            setLastMatchRule(`${matchedPair.digits} ➜ ${matchedPair.words} (${matchedPair.rule})`);
          }
        }, 500);
      } else {
        // NO MATCH -> flip back after brief pause
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.uid === first.uid || c.uid === second.uid ? { ...c, isFlipped: false } : c
            )
          );
          setSelectedCards([]);
        }, 900);
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const totalPairs = (LEVEL_PAIRS[level] || []).length;

  return (
    <div className="w-full space-y-4">
      {/* Top Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 font-bold text-xs sm:text-sm">
            <Timer className="w-4 h-4" />
            <span>{formatTime(seconds)}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm border border-slate-200 dark:border-slate-700">
            <span>Lépések:</span>
            <span className="font-mono text-violet-600 dark:text-violet-400">{moves}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold text-xs sm:text-sm border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-4 h-4" />
            <span>{matchedPairsCount} / {totalPairs} pár</span>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={initGame}
          className="rounded-xl h-8 text-xs font-bold text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1" /> Újrakeverés
        </Button>
      </div>

      {/* Last matched rule pill */}
      {lastMatchRule && !isCompleted && (
        <div className="p-2.5 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-300 text-center animate-in fade-in duration-200 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Találat: {lastMatchRule}</span>
        </div>
      )}

      {/* 4x5 Cards Grid (20 cards) */}
      {!isCompleted ? (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-2.5">
          {cards.map((card) => {
            const isFlipped = card.isFlipped || card.isMatched;

            return (
              <button
                key={card.uid}
                type="button"
                onClick={() => handleCardClick(card)}
                disabled={card.isMatched || selectedCards.length >= 2}
                className={cn(
                  'relative h-20 sm:h-24 p-2 rounded-2xl border-2 transition-all duration-300 transform select-none flex items-center justify-center text-center shadow-xs',
                  card.isMatched
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 opacity-90 scale-95'
                    : isFlipped
                    ? 'bg-white dark:bg-slate-800 border-violet-400 dark:border-violet-500 shadow-md scale-100'
                    : 'bg-gradient-to-br from-violet-500 to-indigo-600 dark:from-violet-700 dark:to-indigo-800 border-violet-400/50 hover:brightness-105 active:scale-95 cursor-pointer'
                )}
              >
                {isFlipped ? (
                  <div className="space-y-0.5 animate-in zoom-in-95 duration-200">
                    <span
                      className={cn(
                        'block font-black leading-tight',
                        card.type === 'digits'
                          ? 'font-mono text-base sm:text-lg text-violet-700 dark:text-violet-300'
                          : 'font-serif text-xs sm:text-xs text-slate-800 dark:text-slate-100 px-1 line-clamp-3'
                      )}
                    >
                      {card.content}
                    </span>
                    {card.isMatched && (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                        ✓ Pár
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-white/80">
                    <Star className="w-5 h-5 mb-0.5 opacity-60" />
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                      Nyiss ki
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        /* Completed Screen */
        <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border-2 border-emerald-300 dark:border-emerald-800 text-center space-y-4 shadow-sm animate-in zoom-in-95 duration-300">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xs">
            <Trophy className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Gratulálok! Mind a 10 párt megtaláltad!
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Idő: <strong className="text-slate-900 dark:text-white">{formatTime(seconds)}</strong> • Lépések száma: <strong className="text-slate-900 dark:text-white">{moves}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              onClick={initGame}
              className="rounded-xl font-bold text-xs sm:text-sm border-slate-200 dark:border-slate-700"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" /> Újra ezen a szinten
            </Button>

            {level < 3 && onNextLevel && (
              <Button
                onClick={onNextLevel}
                className="rounded-xl font-bold text-xs sm:text-sm bg-violet-600 hover:bg-violet-700 text-white shadow-sm"
              >
                <span>Következő szint ({level + 1}. szint)</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NumberSpellingMatcher;
