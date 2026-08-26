import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Target, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SquareRootsQuizProps {
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
    id: 'sr1',
    category: 'Négyzetszámok gyöke',
    question: 'Mennyi a √225 pontos értéke?',
    options: ['13', '15', '25', '35'],
    correctIndex: 1,
    explanation: '15² = 225, ezért √225 = 15.'
  },
  {
    id: 'sr2',
    category: 'Szorzat négyzetgyöke',
    question: 'Számítsd ki a √8 · √2 szorzat értékét!',
    options: ['√16 = 4', '√10', '16', '2√2'],
    correctIndex: 0,
    explanation: '√a · √b = √(a · b). Tehát √8 · √2 = √(8 · 2) = √16 = 4.'
  },
  {
    id: 'sr3',
    category: 'Tört négyzetgyöke',
    question: 'Mennyi a √(36/121) kifejezés értéke?',
    options: ['6/11', '18/60', '6/12', '36/121'],
    correctIndex: 0,
    explanation: '√(a/b) = √a / √b. Ezért √(36/121) = √36 / √121 = 6/11.'
  },
  {
    id: 'sr4',
    category: 'Kiemelés a gyökjel elé',
    question: 'Melyik egyenlő a √50 kifejezéssel legegyszerűbb gyökös alakban?',
    options: ['25√2', '5√2', '2√5', '10√5'],
    correctIndex: 1,
    explanation: '√50 = √(25 · 2) = √25 · √2 = 5√2.'
  },
  {
    id: 'sr5',
    category: 'Tizedestört négyzetgyöke',
    question: 'Mennyi a √0,04 értéke?',
    options: ['0,2', '0,02', '0,002', '2'],
    correctIndex: 0,
    explanation: '√0,04 = √(4/100) = √4 / √100 = 2/10 = 0,2. (Mert 0,2 · 0,2 = 0,04).'
  },
  {
    id: 'sr6',
    category: 'Gyökök becslése',
    question: 'Melyik két szomszédos egész szám közé esik a √30?',
    options: ['4 és 5', '5 és 6', '6 és 7', '3 és 4'],
    correctIndex: 1,
    explanation: 'Mivel 5² = 25 és 6² = 36, valamint 25 < 30 < 36, ezért 5 < √30 < 6.'
  },
  {
    id: 'sr7',
    category: 'Gyakori hiba elkerülése',
    question: 'Mennyi a √(9 + 16) értéke?',
    options: ['7 (mert √9 + √16 = 3 + 4)', '5 (mert √(25) = 5)', '12', '√7'],
    correctIndex: 1,
    explanation: 'Összegre NEM érvényes a tagonkénti gyökvonás! Először a gyök alatt kell összeadni: 9 + 16 = 25, és √25 = 5.'
  },
  {
    id: 'sr8',
    category: 'Bevitel a gyökjel alá',
    question: 'Írd fel egyetlen gyök alatt: 3√7 = ?',
    options: ['√21', '√42', '√63', '√147'],
    correctIndex: 2,
    explanation: '3√7 = √(3² · 7) = √(9 · 7) = √63.'
  }
];

export function SquareRootsQuiz({ onComplete, onBack }: SquareRootsQuizProps) {
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-pink-200">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 80 ? 'Gyökvonás Profi!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">8. Számok négyzetgyöke kvíz befejezve</p>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-6">
            <div className="text-5xl font-black text-pink-600 mb-2">{percentage}%</div>
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
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white rounded-xl h-11 font-bold shadow-md shadow-pink-200"
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
          <span className="text-xs font-bold px-3 py-1 bg-pink-50 text-pink-700 rounded-full border border-pink-100">
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
          <div className="p-2.5 bg-pink-50 text-pink-600 rounded-xl">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">8. Fejezet • Számok Négyzetgyöke</span>
            <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-1 leading-snug">
              {currentQ.question}
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;
            let btnStyle = "border-slate-200 hover:border-pink-300 hover:bg-pink-50/50 text-slate-700";

            if (showResult) {
              if (isCorrect) {
                btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
              } else if (isSelected && !isCorrect) {
                btnStyle = "border-rose-500 bg-rose-50 text-rose-900";
              } else {
                btnStyle = "border-slate-100 text-slate-400 opacity-60";
              }
            } else if (isSelected) {
              btnStyle = "border-pink-600 bg-pink-50 text-pink-900 font-bold ring-2 ring-pink-500/20";
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
              <HelpCircle className="w-4 h-4 text-pink-600" /> Magyarázat:
            </div>
            <p>{currentQ.explanation}</p>
          </div>
        )}

        <div className="pt-2">
          {!showResult ? (
            <Button
              disabled={selectedOption === null}
              onClick={checkAnswer}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white h-12 rounded-xl font-bold shadow-md shadow-pink-200"
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

export default SquareRootsQuiz;
