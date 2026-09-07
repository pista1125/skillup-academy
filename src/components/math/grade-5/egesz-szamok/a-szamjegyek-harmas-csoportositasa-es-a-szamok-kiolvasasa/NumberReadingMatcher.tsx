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
import { DifficultyLevel } from './NumberReadingQuiz';

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
    { id: 1, digits: '4 520', words: 'négyezer-ötszázhúsz', rule: '4 ezer + 520' },
    { id: 2, digits: '12 300', words: 'tizenkétezer-háromszáz', rule: '12 ezer + 300' },
    { id: 3, digits: '70 005', words: 'hetvenezer-öt', rule: '70 ezer + 5' },
    { id: 4, digits: '8 090', words: 'nyolcezer-kilencven', rule: '8 ezer + 90' },
    { id: 5, digits: '35 450', words: 'harmincötezer-négyszázötven', rule: '35 ezer + 450' },
    { id: 6, digits: '99 999', words: 'kilencvenkilencezer-kilencszázkilencvenkilenc', rule: '99 ezer + 999' },
    { id: 7, digits: '1 001', words: 'ezer-egy', rule: '1 ezer + 1' },
    { id: 8, digits: '50 500', words: 'ötvenezer-ötszáz', rule: '50 ezer + 500' },
    { id: 9, digits: '20 020', words: 'húszezer-húsz', rule: '20 ezer + 20' },
    { id: 10, digits: '64 008', words: 'hatvannégyezer-nyolc', rule: '64 ezer + 8' }
  ],
  2: [
    { id: 1, digits: '100 000', words: 'egyszázezer', rule: '100 ezres' },
    { id: 2, digits: '350 400', words: 'háromszázötvenezer-négyszáz', rule: '350 ezer + 400' },
    { id: 3, digits: '500 050', words: 'ötszázezer-ötven', rule: '500 ezer + 50' },
    { id: 4, digits: '704 002', words: 'hétszáznégyezer-kettő', rule: '704 ezer + 2' },
    { id: 5, digits: '990 000', words: 'kilencszázkilencvenezer', rule: '990 ezer' },
    { id: 6, digits: '208 500', words: 'ktszáznyolcezer-ötszáz', rule: '208 ezer + 500' },
    { id: 7, digits: '400 004', words: 'négyszázezer-négy', rule: '400 ezer + 4' },
    { id: 8, digits: '625 300', words: 'hatszázhuszonötezer-háromszáz', rule: '625 ezer + 300' },
    { id: 9, digits: '801 010', words: 'nyolcszázegyezer-tíz', rule: '801 ezer + 10' },
    { id: 10, digits: '999 000', words: 'kilencszázkilencvenkilencezer', rule: '999 ezer' }
  ],
  3: [
    { id: 1, digits: '1 000 000', words: 'egymillió', rule: '1 millió' },
    { id: 2, digits: '5 000 000', words: 'ötmillió', rule: '5 millió' },
    { id: 3, digits: '12 000 000', words: 'tizenkétmillió', rule: '12 millió' },
    { id: 4, digits: '2 500 000', words: 'kétmillió-ötszázezer', rule: '2 millió + 500 ezer' },
    { id: 5, digits: '10 050 000', words: 'tízmillió-ötvenezer', rule: '10 millió + 50 ezer' },
    { id: 6, digits: '100 000 000', words: 'százmillió', rule: '100 millió' },
    { id: 7, digits: '4 000 008', words: 'négymillió-nyolc', rule: '4 millió + 8' },
    { id: 8, digits: '25 400 000', words: 'huszonötmillió-négyszázezer', rule: '25 millió + 400 ezer' },
    { id: 9, digits: '7 300 050', words: 'hétmillió-háromszázezer-ötven', rule: '7 millió + 300 ezer + 50' },
    { id: 10, digits: '50 000 005', words: 'ötvenmillió-öt', rule: '50 millió + 5' }
  ]
};

interface NumberReadingMatcherProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function NumberReadingMatcher({
  level,
  onNextLevel,
  onOpenRules
}: NumberReadingMatcherProps) {
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<MatchCard[]>([]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [matchedCount, setMatchedCount] = useState(0);
  const [moves, setMoves] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [lastMatchInfo, setLastMatchInfo] = useState<string | null>(null);

  const totalPairs = 10;

  const initGame = useCallback(() => {
    const rawPairs = LEVEL_PAIRS[level] || LEVEL_PAIRS[1];
    const shuffledPairs = [...rawPairs].sort(() => Math.random() - 0.5).slice(0, totalPairs);

    const generatedCards: MatchCard[] = [];

    shuffledPairs.forEach((pair) => {
      generatedCards.push({
        uid: `dig-${pair.id}-${Math.random().toString(36).substring(2, 6)}`,
        pairId: pair.id,
        type: 'digits',
        content: pair.digits,
        isFlipped: false,
        isMatched: false
      });
      generatedCards.push({
        uid: `wrd-${pair.id}-${Math.random().toString(36).substring(2, 6)}`,
        pairId: pair.id,
        type: 'words',
        content: pair.words,
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
            setLastMatchInfo(`Pár megtalálva: ${matchedPairInfo.digits} = ${matchedPairInfo.words}`);
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
          <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-violet-600 text-white rounded-3xl flex items-center justify-center mx-auto shadow-lg mb-4 ring-8 ring-indigo-100 dark:ring-indigo-950/60 animate-bounce">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1">
            Gratulálunk! Mind a {totalPairs} pár megvan! 🎉
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-5">
            Sikeresen teljesítetted a számok kiolvasása párosító játékot a(z) {level}. szinten!
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
              <div className="text-xl font-black text-indigo-600 dark:text-indigo-400">{moves}</div>
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
                className="flex-1 h-11 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md flex items-center justify-center gap-1.5"
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
                  ? card.type === 'digits'
                    ? "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/60 dark:to-slate-900 border-indigo-400 dark:border-indigo-600 text-indigo-900 dark:text-indigo-200 shadow-md scale-[1.02]"
                    : "bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/60 dark:to-slate-900 border-teal-400 dark:border-teal-600 text-teal-900 dark:text-teal-200 shadow-md scale-[1.02]"
                  : "bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 border-slate-300/90 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 text-slate-400 dark:text-slate-500 cursor-pointer"
              )}
            >
              {card.isFlipped || card.isMatched ? (
                <div className="flex flex-col items-center justify-center gap-1 animate-in zoom-in-75 duration-150 text-center px-1 w-full">
                  <span
                    className={cn(
                      "font-black tracking-tight leading-snug line-clamp-2",
                      card.type === 'digits'
                        ? "font-mono text-base sm:text-lg text-indigo-900 dark:text-indigo-200"
                        : "font-sans text-[11px] sm:text-xs text-teal-900 dark:text-teal-200 font-bold"
                    )}
                  >
                    {card.content}
                  </span>
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-sans font-bold uppercase tracking-wider shrink-0",
                      card.type === 'digits'
                        ? "bg-indigo-200/60 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300"
                        : "bg-teal-200/60 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300"
                    )}
                  >
                    {card.type === 'digits' ? 'Szám' : 'Kiolvasás'}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-0.5 transition-transform hover:scale-105">
                  <span className="text-xl sm:text-2xl filter drop-shadow-xs">
                    🗣️
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

export default NumberReadingMatcher;
