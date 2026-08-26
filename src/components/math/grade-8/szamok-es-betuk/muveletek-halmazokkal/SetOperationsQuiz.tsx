import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Layers, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SetOperationsQuizProps {
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
    id: 'so1',
    category: 'Metszet (A ∩ B)',
    question: 'Ha A = {1, 2, 3, 6, 12} (a 12 osztói) és B = {1, 2, 4, 8, 16} (a 16 osztói), akkor mi az A ∩ B?',
    options: ['{1, 2}', '{1, 2, 3, 4}', '{1, 2, 4}', '{1, 2, 4, 6, 8, 12, 16}'],
    correctIndex: 0,
    explanation: 'A metszet a közös elemek halmaza: a 12 és a 16 közös osztói pontosan a {1, 2, 4}? Várjunk: a 12 osztói: 1, 2, 3, 4, 6, 12! Ha A = {1,2,3,6,12}, akkor a 4 nincs benne, így a közös elemek a {1, 2}.'
  },
  {
    id: 'so2',
    category: 'Unió (A ∪ B)',
    question: 'Legyen A = {a, b, c} és B = {c, d, e}. Hány eleme van az A ∪ B halmaznak?',
    options: ['3', '4', '5', '6'],
    correctIndex: 2,
    explanation: 'A ∪ B = {a, b, c, d, e}. A „c” elem mindkettőben szerepel, de a halmazban csak egyszer számoljuk, így |A ∪ B| = 5.'
  },
  {
    id: 'so3',
    category: 'Különbség (A \\ B)',
    question: 'Ha A = {10, 20, 30, 40} és B = {20, 40, 60}, akkor mi az A \\ B halmaz?',
    options: ['{10, 30}', '{60}', '{10, 30, 60}', '{20, 40}'],
    correctIndex: 0,
    explanation: 'Az A \\ B halmaz azokat az elemeket tartalmazza, amelyek A-ban benne vannak, de B-ből hiányoznak. A 20 és a 40 kiesik, marad a {10, 30}.'
  },
  {
    id: 'so4',
    category: 'Szita-formula szöveges feladat',
    question: 'Egy 30 fős osztályban 20 diák focizik és 15 diák kosarazik. Mindenki űzi legalább az egyik sportot. Hányan sportolnak MINDKÉT sportágban?',
    options: ['5 diák', '10 diák', '15 diák', '35 diák'],
    correctIndex: 0,
    explanation: 'Szita-formula: |F ∪ K| = |F| + |K| - |F ∩ K|. Behelyettesítve: 30 = 20 + 15 - |F ∩ K| => 30 = 35 - |F ∩ K| => |F ∩ K| = 5.'
  },
  {
    id: 'so5',
    category: 'Komplementer halmaz',
    question: 'Ha az alaphalmaz U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10} és A a páros számok halmaza, mi az A komplementere (Ā)?',
    options: [
      'A páratlan számok halmaza: {1, 3, 5, 7, 9}',
      'A prímek halmaza: {2, 3, 5, 7}',
      '{1, 2, 3, 4, 5}',
      'Üres halmaz (∅)'
    ],
    correctIndex: 0,
    explanation: 'Az Ā komplementer az összes olyan U-beli elem, ami nem páros, tehát az U-beli páratlan számok halmaza: {1, 3, 5, 7, 9}.'
  },
  {
    id: 'so6',
    category: 'Diszjunkt halmazok',
    question: 'Mikor mondjuk két halmazról, hogy DISZJUNKTAK?',
    options: [
      'Ha A ∪ B = U',
      'Ha A ∩ B = ∅ (nincs közös elemük)',
      'Ha |A| = |B|',
      'Ha A ⊆ B'
    ],
    correctIndex: 1,
    explanation: 'Két halmaz diszjunkt, ha metszetük az üres halmaz, vagyis nincs egyetlen közös elemük sem.'
  }
];

export function SetOperationsQuiz({ onComplete, onBack }: SetOperationsQuizProps) {
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 80 ? 'Kiváló halmazműveletek!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">3. Műveletek halmazokkal kvíz befejezve</p>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-6">
            <div className="text-5xl font-black text-indigo-600 mb-2">{percentage}%</div>
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
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-11 font-bold shadow-md shadow-indigo-200"
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
          <span className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
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
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">3. Fejezet • Halmazműveletek</span>
            <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-1 leading-snug">
              {currentQ.question}
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;
            let btnStyle = "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-700";

            if (showResult) {
              if (isCorrect) {
                btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
              } else if (isSelected && !isCorrect) {
                btnStyle = "border-rose-500 bg-rose-50 text-rose-900";
              } else {
                btnStyle = "border-slate-100 text-slate-400 opacity-60";
              }
            } else if (isSelected) {
              btnStyle = "border-indigo-600 bg-indigo-50 text-indigo-900 font-bold ring-2 ring-indigo-500/20";
            }

            return (
              <button
                key={idx}
                disabled={showResult}
                onClick={() => handleSelect(idx)}
                className={cn(
                  "w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-sm md:text-base",
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
              <HelpCircle className="w-4 h-4 text-indigo-600" /> Magyarázat:
            </div>
            <p>{currentQ.explanation}</p>
          </div>
        )}

        <div className="pt-2">
          {!showResult ? (
            <Button
              disabled={selectedOption === null}
              onClick={checkAnswer}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 rounded-xl font-bold shadow-md shadow-indigo-200"
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

export default SetOperationsQuiz;
