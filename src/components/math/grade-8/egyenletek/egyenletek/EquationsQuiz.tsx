import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Scale, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EquationsQuizProps {
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
    id: 'eq1',
    category: 'Mérlegelv alapjai',
    question: 'Oldd meg az egyenletet: 5x - 7 = 3x + 9',
    options: ['x = 8', 'x = 1', 'x = 4', 'x = 16'],
    correctIndex: 0,
    explanation: '5x - 7 = 3x + 9 => Kivonunk 3x-et: 2x - 7 = 9 => Hozzáadunk 7-et: 2x = 16 => Osztunk 2-vel: x = 8.'
  },
  {
    id: 'eq2',
    category: 'Zárójelbontás',
    question: 'Mi az egyenlet megoldása: 3(2x - 4) - 2(x + 1) = 10?',
    options: ['x = 6', 'x = 4', 'x = 5', 'x = 8'],
    correctIndex: 0,
    explanation: '3(2x - 4) - 2(x + 1) = 10 => 6x - 12 - 2x - 2 = 10 => 4x - 14 = 10 => 4x = 24 => x = 6.'
  },
  {
    id: 'eq3',
    category: 'Törtes egyenlet',
    question: 'Oldd meg az egyenletet: (x + 2) / 3 + (x - 1) / 2 = 6',
    options: ['x = 7', 'x = 5', 'x = 8', 'x = 6'],
    correctIndex: 0,
    explanation: 'Szorzunk 6-tal: 2(x + 2) + 3(x - 1) = 36 => 2x + 4 + 3x - 3 = 36 => 5x + 1 = 36 => 5x = 35 => x = 7.'
  },
  {
    id: 'eq4',
    category: 'Értelmezési tartomány / Kikötés',
    question: 'Mi a helyes kikötés az alábbi egyenletnél: 8 / (x - 5) = 4?',
    options: ['x ≠ 5', 'x ≠ 0', 'x ≠ -5', 'x > 5'],
    correctIndex: 0,
    explanation: 'A tört nevezője sosem lehet 0, ezért x - 5 ≠ 0, azaz x ≠ 5.'
  },
  {
    id: 'eq5',
    category: 'Azonosság és ellentmondás',
    question: 'Mit jelent, ha egy egyenlet rendezése után 0 = 0 egyenlőségre jutunk?',
    options: [
      'Az egyenlet azonosság: a sík/valós számok minden eleme megoldás (végtelen sok megoldás van).',
      'Az egyenletnek nincs megoldása.',
      'A megoldás x = 0.',
      'Hibásan számoltunk, ilyen nem fordulhat elő.'
    ],
    correctIndex: 0,
    explanation: 'A 0 = 0 azonosságot jelent, tehát x bármilyen megengedett valós szám lehet, az egyenlőség mindig teljesül.'
  },
  {
    id: 'eq6',
    category: 'Ellentmondásos egyenlet',
    question: 'Mit mondhatunk a 2(x + 3) = 2x + 7 egyenlet megoldásáról?',
    options: [
      'Nincs megoldása (ellentmondás, mert 2x + 6 = 2x + 7 => 6 = 7).',
      'x = 1',
      'Minden szám megoldás',
      'x = 0'
    ],
    correctIndex: 0,
    explanation: '2x + 6 = 2x + 7 => mindkét oldalból 2x-et kivonva 6 = 7 adódik, ami lehetetlen, így a megoldáshalmaz üres: L = ∅.'
  }
];

export function EquationsQuiz({ onComplete, onBack }: EquationsQuizProps) {
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-200">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 80 ? 'Egyenlet Bajnok!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">1. Egyenletek kvíz befejezve</p>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-6">
            <div className="text-5xl font-black text-purple-600 mb-2">{percentage}%</div>
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
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-11 font-bold shadow-md shadow-purple-200"
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
          <span className="text-xs font-bold px-3 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-100">
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
          <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">1. Fejezet • Egyenletek</span>
            <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-1 leading-snug">
              {currentQ.question}
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;
            let btnStyle = "border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 text-slate-700";

            if (showResult) {
              if (isCorrect) {
                btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
              } else if (isSelected && !isCorrect) {
                btnStyle = "border-rose-500 bg-rose-50 text-rose-900";
              } else {
                btnStyle = "border-slate-100 text-slate-400 opacity-60";
              }
            } else if (isSelected) {
              btnStyle = "border-purple-600 bg-purple-50 text-purple-900 font-bold ring-2 ring-purple-500/20";
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
              <HelpCircle className="w-4 h-4 text-purple-600" /> Magyarázat:
            </div>
            <p>{currentQ.explanation}</p>
          </div>
        )}

        <div className="pt-2">
          {!showResult ? (
            <Button
              disabled={selectedOption === null}
              onClick={checkAnswer}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12 rounded-xl font-bold shadow-md shadow-purple-200"
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

export default EquationsQuiz;
