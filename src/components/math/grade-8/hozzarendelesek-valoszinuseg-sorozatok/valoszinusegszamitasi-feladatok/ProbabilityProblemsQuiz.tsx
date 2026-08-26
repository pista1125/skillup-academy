import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Brain, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProbabilityProblemsQuizProps {
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
    id: 'prp1',
    category: 'Két kocka összege legalább 10',
    question: 'Két szabályos dobókockával dobunk. Mekkora a valószínűsége, hogy a dobott pontok összege LEGALÁBB 10 (azaz 10, 11 vagy 12)?',
    options: ['6/36 = 1/6 (≈ 16,7%)', '3/36 = 1/12', '10/36', '4/36 = 1/9'],
    correctIndex: 0,
    explanation: 'A kedvező számpárok (36-ból): Összeg 10: (4,6), (5,5), (6,4) [3 db]; Összeg 11: (5,6), (6,5) [2 db]; Összeg 12: (6,6) [1 db]. Összesen 6 eset => 6/36 = 1/6.'
  },
  {
    id: 'prp2',
    category: 'Visszatevés nélküli húzás',
    question: 'Egy dobozban 4 piros és 6 fehér golyó van. Egymás után 2 golyót húzunk visszatevés nélkül. Mennyi a valószínűsége, hogy MINDKÉT golyó piros lesz?',
    options: ['12/90 = 2/15 (≈ 13,3%)', '16/100 = 16%', '4/10', '8/20 = 40%'],
    correctIndex: 0,
    explanation: '1. húzás: P(1. piros) = 4/10. 2. húzás: már csak 3 piros és 9 összes golyó van => P(2. piros) = 3/9. P = (4/10) · (3/9) = 12/90 = 2/15.'
  },
  {
    id: 'prp3',
    category: 'Érmefeldobások',
    question: 'Háromszor feldobunk egy szabályos pénzérmét. Mekkora a valószínűsége annak, hogy PONTOSAN KÉT FEJET kapunk?',
    options: ['3/8 (37,5%)', '2/3', '1/8', '2/8 = 1/4'],
    correctIndex: 0,
    explanation: 'Összes kimenetel: 2³ = 8. Pontosan két fej: (F,F,Í), (F,Í,F), (Í,F,F) => 3 eset a 8-ból, azaz 3/8.'
  },
  {
    id: 'prp4',
    category: 'Kártyahúzás esélye',
    question: 'Egy 32 lapos magyar kártyacsomagból kihúzunk egy lapot. Mennyi a valószínűsége, hogy PIROS SZÍNŰ VAGY KIRÁLY?',
    options: ['11/32 (≈ 34,4%)', '12/32', '8/32', '4/32'],
    correctIndex: 0,
    explanation: 'Piros lapok: 8 db (köztük a piros király). Nem piros királyok: 3 db (tök, zöld, makk király). Kedvező esetek: 8 + 3 = 11. P = 11/32.'
  },
  {
    id: 'prp5',
    category: 'Legalább egy találat (ellentett)',
    question: 'Két kockával dobva mennyi a valószínűsége, hogy LEGALÁBB EGYETLEN 6-ost dobunk?',
    options: ['11/36 (≈ 30,6%)', '1/6', '2/6 = 1/3', '12/36'],
    correctIndex: 0,
    explanation: 'Ellentettje: egyetlen 6-ost sem dobunk. P(nincs 6-os) = (5/6) · (5/6) = 25/36. P(legalább egy 6-os) = 1 - 25/36 = 11/36.'
  },
  {
    id: 'prp6',
    category: 'Számalkotási valószínűség',
    question: 'Az 1, 2, 3, 4 számjegyekből véletlenszerűen felírunk egy kétjegyű számot (ismétlés nélkül). Mekkora az esélye, hogy a kapott szám PÁROS?',
    options: ['6/12 = 1/2 (50%)', '1/4', '4/12 = 1/3', '2/4'],
    correctIndex: 0,
    explanation: 'Összes kétjegyű szám ismétlés nélkül: 4 · 3 = 12 db. Páros, ha 2-re vagy 4-re végződik: 3 · 2 = 6 db. P = 6/12 = 1/2 = 50%.'
  }
];

export function ProbabilityProblemsQuiz({ onComplete, onBack }: ProbabilityProblemsQuizProps) {
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white shadow-lg shadow-rose-200">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 80 ? 'Valószínűségszámító Zseni!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">9. Valószínűségszámítási feladatok kvíz befejezve</p>

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
          <span className="text-xs font-bold px-3 py-1 bg-rose-50 text-rose-800 rounded-full border border-rose-200">
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
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">9. Fejezet • Valószínűségszámítási Feladatok</span>
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

export default ProbabilityProblemsQuiz;
