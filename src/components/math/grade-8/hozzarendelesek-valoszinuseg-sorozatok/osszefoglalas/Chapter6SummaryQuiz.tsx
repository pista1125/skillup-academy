import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Award, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Chapter6SummaryQuizProps {
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
    id: 'c6s1',
    category: 'Lineáris függvény tulajdonságai',
    question: 'Mi a meredeksége, y-tengelymetszete és zérushelye az f(x) = -2x + 6 függvénynek?',
    options: [
      'Meredekség: a = -2, y-metszet: (0; 6), zérushely: x = 3',
      'Meredekség: 6, y-metszet: (0; -2), zérushely: x = -3',
      'Meredekség: -2, y-metszet: (6; 0), zérushely: x = 6',
      'Meredekség: 2, y-metszet: (0; 3), zérushely: x = 2'
    ],
    correctIndex: 0,
    explanation: 'a = -2, b = 6 => y-metszet (0; 6). Zérushely: -2x + 6 = 0 => 2x = 6 => x = 3.'
  },
  {
    id: 'c6s2',
    category: 'Fordított arányosság számolás',
    question: 'Egy tartályt 3 egyforma csap 10 óra alatt tölt fel. Hány óra alatt töltené fel 5 ugyanilyen csap?',
    options: ['6 óra alatt', '15 óra alatt', '8 óra alatt', '4 óra alatt'],
    correctIndex: 0,
    explanation: 'Fordított arányosság: 3 · 10 = 30 csap-óra szükséges. 5 csap esetén: 30 / 5 = 6 óra.'
  },
  {
    id: 'c6s3',
    category: 'Statisztikai medián és átlag',
    question: 'Egy csoport tagjainak kora: 12, 13, 14, 14, 17. Mennyi a medián és az átlag?',
    options: [
      'Medián: 14, átlag: 14',
      'Medián: 13, átlag: 15',
      'Medián: 14, átlag: 13,5',
      'Medián: 17, átlag: 14'
    ],
    correctIndex: 0,
    explanation: 'Rendezett adatok középső eleme: 14 (medián). Átlag: (12 + 13 + 14 + 14 + 17) / 5 = 70 / 5 = 14.'
  },
  {
    id: 'c6s4',
    category: 'Valószínűségszámítás',
    question: 'Két szabályos pénzérmét feldobva mekkora a valószínűsége annak, hogy LEGALÁBB EGY FEJET kapunk?',
    options: ['3/4 = 75%', '1/2 = 50%', '1/4 = 25%', '2/3 ≈ 66,7%'],
    correctIndex: 0,
    explanation: 'Összes eset: (F,F), (F,Í), (Í,F), (Í,Í) [4 eset]. Legalább egy fej: 3 eset. P = 3/4 = 75%.'
  },
  {
    id: 'c6s5',
    category: 'Számtani sorozat',
    question: 'Egy számtani sorozatban a₁ = 5 és a₅ = 21. Mennyi a sorozat differenciája (d)?',
    options: ['d = 4', 'd = 5', 'd = 3', 'd = 16'],
    correctIndex: 0,
    explanation: 'a₅ = a₁ + 4d => 21 = 5 + 4d => 4d = 16 => d = 4.'
  },
  {
    id: 'c6s6',
    category: 'Mértani sorozat',
    question: 'Egy mértani sorozat első tagja 4, hányadosa q = -2. Mennyi a sorozat 4. tagja (a₄)?',
    options: ['-32', '32', '-16', '16'],
    correctIndex: 0,
    explanation: 'a₄ = a₁ · q³ = 4 · (-2)³ = 4 · (-8) = -32.'
  },
  {
    id: 'c6s7',
    category: 'Összefüggés felismerése',
    question: 'Egy sorozat tagjai: 0, 3, 8, 15, 24, 35, ... Melyik képlet határozza meg a sorozat n-edik tagját?',
    options: ['aₙ = n² - 1', 'aₙ = 3n - 3', 'aₙ = n² + 1', 'aₙ = 2n² - 2'],
    correctIndex: 0,
    explanation: '1²-1=0, 2²-1=3, 3²-1=8, 4²-1=15, 5²-1=24, 6²-1=35 => aₙ = n² - 1.'
  },
  {
    id: 'c6s8',
    category: 'Grafikon és zérushely',
    question: 'Hol metszi az x-tengelyt az f(x) = 3x + 12 függvény grafikonja?',
    options: ['(-4; 0)', '(4; 0)', '(0; 12)', '(0; -4)'],
    correctIndex: 0,
    explanation: '3x + 12 = 0 => 3x = -12 => x = -4. A metszéspont a (-4; 0) koordinátájú pont.'
  }
];

export function Chapter6SummaryQuiz({ onComplete, onBack }: Chapter6SummaryQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const TOTAL_QUESTIONS = QUESTIONS.length;
  const XP_PER_CORRECT = 20;
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-200">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 80 ? 'VI. Fejezet Nagymester!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">VI. Fejezet • Hozzárendelések, Valószínűség, Sorozatok Témazáró Kvíz befejezve</p>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-6">
            <div className="text-5xl font-black text-cyan-600 mb-2">{percentage}%</div>
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
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl h-11 font-bold shadow-md shadow-cyan-200"
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
          <span className="text-xs font-bold px-3 py-1 bg-cyan-50 text-cyan-800 rounded-full border border-cyan-200">
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
          <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider">12. Fejezet • VI. Fejezet Összefoglalás</span>
            <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-1 leading-snug">
              {currentQ.question}
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;
            let btnStyle = "border-slate-200 hover:border-cyan-300 hover:bg-cyan-50/50 text-slate-700";

            if (showResult) {
              if (isCorrect) {
                btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
              } else if (isSelected && !isCorrect) {
                btnStyle = "border-rose-500 bg-rose-50 text-rose-900";
              } else {
                btnStyle = "border-slate-100 text-slate-400 opacity-60";
              }
            } else if (isSelected) {
              btnStyle = "border-cyan-600 bg-cyan-50 text-cyan-900 font-bold ring-2 ring-cyan-500/20";
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
              <HelpCircle className="w-4 h-4 text-cyan-600" /> Magyarázat:
            </div>
            <p>{currentQ.explanation}</p>
          </div>
        )}

        <div className="pt-2">
          {!showResult ? (
            <Button
              disabled={selectedOption === null}
              onClick={checkAnswer}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white h-12 rounded-xl font-bold shadow-md shadow-cyan-200"
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

export default Chapter6SummaryQuiz;
