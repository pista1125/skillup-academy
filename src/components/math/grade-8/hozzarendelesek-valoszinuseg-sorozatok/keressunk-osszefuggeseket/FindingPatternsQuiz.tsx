import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Search, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FindingPatternsQuizProps {
  onComplete?: (result: QuizResult) => void;
  onBack: () => void;
}

interface Question {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 'fp1',
    category: 'Lineáris minta felismerése',
    question: 'Gyufaszálakból négyzetláncot építünk: 1 négyzet = 4 szál, 2 négyzet = 7 szál, 3 négyzet = 10 szál. Melyik képlet adja meg az n darab négyzethez szükséges gyufák számát?',
    options: ['3n + 1', '4n', '3n - 1', '2n + 2'],
    correctIndex: 0,
    explanation: 'Minden új négyzet hozzáépítése +3 szálat igényel: d = 3. Az 1. négyzetnél 3(1) + b = 4 => b = 1, így a képlet: 3n + 1.'
  },
  {
    id: 'fp2',
    category: 'Kézfogások száma',
    question: 'Egy 10 fős társaságban mindenki mindenkivel pontosan egyszer kezet fog. Hány kézfogás történik összesen?',
    options: ['45 kézfogás', '90 kézfogás', '100 kézfogás', '20 kézfogás'],
    correctIndex: 0,
    explanation: 'Kézfogások száma: n(n - 1) / 2 = 10 · 9 / 2 = 45 kézfogás.'
  },
  {
    id: 'fp3',
    category: 'Háromszögszámok képlete',
    question: 'A háromszögszámok sorozata: 1, 3, 6, 10, 15, ... Mennyi a 8. háromszögszám (T₈)?',
    options: ['36', '28', '64', '45'],
    correctIndex: 0,
    explanation: 'A háromszögszámok képlete: Tₙ = n(n + 1) / 2. T₈ = 8 · 9 / 2 = 36 (ez egyben az első 8 pozitív egész szám összege: 1+2+...+8 = 36).'
  },
  {
    id: 'fp4',
    category: 'Konvex sokszög átlói',
    question: 'Hány átlója van egy konvex nyolcszögnek (n = 8)?',
    options: ['20 átló', '24 átló', '40 átló', '16 átló'],
    correctIndex: 0,
    explanation: 'Az átlók száma képlet: n(n - 3) / 2 = 8 · 5 / 2 = 20 átló.'
  },
  {
    id: 'fp5',
    category: 'Számtáblázat szabálya',
    question: 'Melyik szám hiányzik a sorozatból: 2, 5, 10, 17, 26, [ ? ] ?',
    options: ['37 (mert n² + 1 a szabály)', '35', '36', '40'],
    correctIndex: 0,
    explanation: 'A négyzetszámokhoz 1-et adunk: 1²+1=2, 2²+1=5, 3²+1=10, 4²+1=17, 5²+1=26 => a 6. tag: 6² + 1 = 37.'
  },
  {
    id: 'fp6',
    category: 'Előrejelzés képlettel',
    question: 'Ha egy alakzat elemszámát az a(n) = 5n - 2 szabály adja meg, hányadik alakzat tartalmaz pontosan 148 elemet?',
    options: ['A 30. alakzat', 'A 28. alakzat', 'A 32. alakzat', 'A 25. alakzat'],
    correctIndex: 0,
    explanation: '5n - 2 = 148 => 5n = 150 => n = 30.'
  }
];

export function FindingPatternsQuiz({ onComplete, onBack }: FindingPatternsQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const TOTAL_QUESTIONS = QUESTIONS.length;
  const XP_PER_CORRECT = 15;
  const currentQ = QUESTIONS[currentIndex];

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelectedOption(idx);
  };

  const checkAnswer = () => {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === currentQ.correctIndex;
    setShowResult(true);
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setXpEarned(prev => prev + XP_PER_CORRECT);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      if (onComplete) {
        onComplete({
          totalQuestions: TOTAL_QUESTIONS,
          correctAnswers: correctCount + (selectedOption === currentQ.correctIndex ? 1 : 0),
          percentage: Math.round(((correctCount + (selectedOption === currentQ.correctIndex ? 1 : 0)) / TOTAL_QUESTIONS) * 100),
          xpEarned: xpEarned + (selectedOption === currentQ.correctIndex ? XP_PER_CORRECT : 0),
        });
      }
    }
  };

  if (quizComplete) {
    const finalCorrect = correctCount;
    const percentage = Math.round((finalCorrect / TOTAL_QUESTIONS) * 100);
    const finalXP = finalCorrect * XP_PER_CORRECT;

    return (
      <div className="max-w-xl mx-auto text-center py-6 animate-in fade-in zoom-in-95 duration-300">
        <Button variant="ghost" onClick={onBack} className="mb-6 rounded-xl hover:bg-slate-100">
          <ArrowLeft className="w-4 h-4 mr-2" /> Vissza a témakörökhöz
        </Button>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-amber-200">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 80 ? 'Összefüggés-Kutató Bajnok!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">10. Keressünk összefüggéseket! kvíz befejezve</p>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-6">
            <div className="text-5xl font-black text-amber-600 mb-2">{percentage}%</div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {finalCorrect} / {TOTAL_QUESTIONS} helyes válasz
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <XPBadge xp={finalXP} />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack} className="flex-1 rounded-xl h-11 font-bold">
              Vissza
            </Button>
            <Button
              onClick={() => {
                setCurrentIndex(0);
                setSelectedOption(null);
                setShowResult(false);
                setCorrectCount(0);
                setQuizComplete(false);
                setXpEarned(0);
              }}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white rounded-xl h-11 font-bold shadow-md shadow-amber-200"
            >
              <RotateCcw className="w-4 h-4 mr-2" /> Újra
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack} className="rounded-xl hover:bg-slate-100 text-slate-600 font-bold">
          <ArrowLeft className="w-4 h-4 mr-2" /> Vissza
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-200">
            {currentQ.category}
          </span>
          <XPBadge xp={xpEarned} />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center text-xs font-bold text-slate-400 mb-2">
          <span>Kérdés {currentIndex + 1} / {TOTAL_QUESTIONS}</span>
          <span>{Math.round(((currentIndex + 1) / TOTAL_QUESTIONS) * 100)}%</span>
        </div>
        <ProgressBar current={currentIndex + 1} total={TOTAL_QUESTIONS} variant="default" size="lg" />
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 space-y-6">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">10. Fejezet • Összefüggések és Szabályok</span>
            <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-1 leading-snug">
              {currentQ.question}
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;
            let btnStyle = "border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 text-slate-700";

            if (showResult) {
              if (isCorrect) {
                btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
              } else if (isSelected && !isCorrect) {
                btnStyle = "border-rose-500 bg-rose-50 text-rose-900";
              } else {
                btnStyle = "border-slate-100 text-slate-400 opacity-60";
              }
            } else if (isSelected) {
              btnStyle = "border-amber-600 bg-amber-50 text-amber-900 font-bold ring-2 ring-amber-500/20";
            }

            return (
              <button
                key={idx}
                disabled={showResult}
                onClick={() => handleSelect(idx)}
                className={cn(
                  "w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-sm md:text-base font-medium",
                  btnStyle
                )}
              >
                <span>{opt}</span>
                {showResult && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />}
                {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs md:text-sm text-slate-600 space-y-1 animate-in fade-in-50">
            <div className="font-bold flex items-center gap-1.5 text-slate-800">
              <HelpCircle className="w-4 h-4 text-amber-600" /> Magyarázat:
            </div>
            <p>{currentQ.explanation}</p>
          </div>
        )}

        <div className="pt-2">
          {!showResult ? (
            <Button
              disabled={selectedOption === null}
              onClick={checkAnswer}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white h-12 rounded-xl font-bold shadow-md shadow-amber-200"
            >
              Válasz ellenőrzése
            </Button>
          ) : (
            <Button
              onClick={nextQuestion}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <span>{currentIndex < TOTAL_QUESTIONS - 1 ? 'Következő feladat' : 'Eredmények megtekintése'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FindingPatternsQuiz;
