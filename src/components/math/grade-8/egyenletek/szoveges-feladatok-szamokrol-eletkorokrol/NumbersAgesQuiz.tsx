import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Users, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NumbersAgesQuizProps {
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
    id: 'na1',
    category: 'Életkori feladat',
    question: 'Egy anya most 36 éves, a lánya 8 éves. Hány év múlva lesz az anya kora pontosan a lánya korának háromszorosa?',
    options: ['6 év múlva', '4 év múlva', '8 év múlva', '5 év múlva'],
    correctIndex: 0,
    explanation: 'Legyen x az évek száma: 36 + x = 3(8 + x) => 36 + x = 24 + 3x => 2x = 12 => x = 6. (6 év múlva: anya 42, lánya 14; 42 = 3 · 14).'
  },
  {
    id: 'na2',
    category: 'Számok összege és aránya',
    question: 'Két szám összege 75, az arányuk 2 : 3. Melyik a nagyobb szám?',
    options: ['45', '30', '50', '40'],
    correctIndex: 0,
    explanation: '2x + 3x = 75 => 5x = 75 => x = 15. A kisebbik szám 2 · 15 = 30, a nagyobbik szám 3 · 15 = 45.'
  },
  {
    id: 'na3',
    category: 'Egymást követő számok',
    question: 'Három egymást követő páros szám összege 102. Melyik a legkisebb szám a három közül?',
    options: ['32', '34', '30', '36'],
    correctIndex: 0,
    explanation: 'A számok: x, x+2, x+4. Összegük: 3x + 6 = 102 => 3x = 96 => x = 32. (A számok: 32, 34, 36; 32 + 34 + 36 = 102).'
  },
  {
    id: 'na4',
    category: 'Kétjegyű számok felírása',
    question: 'Egy kétjegyű szám tízesének és egyesének összege 9. Ha a számjegyeket felcseréljük, az új szám 27-tel nagyobb az eredetinél. Mi az eredeti szám?',
    options: ['36', '63', '27', '45'],
    correctIndex: 0,
    explanation: 'Tízes: a, egyes: 9-a. Eredeti: 10a + (9-a) = 9a + 9. Felcserélt: 10(9-a) + a = 90 - 9a. Egyenlet: (90 - 9a) - (9a + 9) = 27 => 81 - 18a = 27 => 18a = 54 => a = 3. Egyes: 9 - 3 = 6. A szám: 36 (felcserélve 63, és 63 - 36 = 27).'
  },
  {
    id: 'na5',
    category: 'Múltbeli életkor',
    question: 'Péter most kétszer annyi idős, mint Anna. 5 évvel ezelőtt Péter háromszor annyi idős volt, mint Anna. Hány éves most Péter?',
    options: ['20 éves', '10 éves', '24 éves', '18 éves'],
    correctIndex: 0,
    explanation: 'Anna most x, Péter 2x. 5 éve: Anna x-5, Péter 2x-5. Egyenlet: 2x - 5 = 3(x - 5) => 2x - 5 = 3x - 15 => x = 10. Péter most 2 · 10 = 20 éves.'
  },
  {
    id: 'na6',
    category: 'Gondoltam egy számot',
    question: 'Gondoltam egy számot. Ha megszorzom 4-gyel, majd hozzáadok 15-öt, ugyanazt kapom, mintha a számból kivonnék 3-at és megszoroznám 7-tel. Mi a gondolt szám?',
    options: ['12', '10', '14', '8'],
    correctIndex: 0,
    explanation: '4x + 15 = 7(x - 3) => 4x + 15 = 7x - 21 => 3x = 36 => x = 12.'
  }
];

export function NumbersAgesQuiz({ onComplete, onBack }: NumbersAgesQuizProps) {
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-rose-200">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 80 ? 'Szöveges Feladat Mester!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">2. Számok és életkorok kvíz befejezve</p>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-6">
            <div className="text-5xl font-black text-rose-600 mb-2">{percentage}%</div>
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
              className="flex-1 bg-rose-600 hover:bg-rose-700 text-white rounded-xl h-11 font-bold shadow-md shadow-rose-200"
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
          <span className="text-xs font-bold px-3 py-1 bg-rose-50 text-rose-700 rounded-full border border-rose-100">
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
          <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">2. Fejezet • Számok és Életkorok</span>
            <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-1 leading-snug">
              {currentQ.question}
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;
            let btnStyle = "border-slate-200 hover:border-rose-300 hover:bg-rose-50/50 text-slate-700";

            if (showResult) {
              if (isCorrect) {
                btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
              } else if (isSelected && !isCorrect) {
                btnStyle = "border-rose-500 bg-rose-50 text-rose-900";
              } else {
                btnStyle = "border-slate-100 text-slate-400 opacity-60";
              }
            } else if (isSelected) {
              btnStyle = "border-rose-600 bg-rose-50 text-rose-900 font-bold ring-2 ring-rose-500/20";
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
              <HelpCircle className="w-4 h-4 text-rose-600" /> Magyarázat:
            </div>
            <p>{currentQ.explanation}</p>
          </div>
        )}

        <div className="pt-2">
          {!showResult ? (
            <Button
              disabled={selectedOption === null}
              onClick={checkAnswer}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white h-12 rounded-xl font-bold shadow-md shadow-rose-200"
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

export default NumbersAgesQuiz;
