import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Layers, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SequencesQuizProps {
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
    id: 'seq1',
    category: 'Számtani sorozat n-edik tagja',
    question: 'Egy számtani sorozat első tagja a₁ = 7, különbsége d = 4. Mennyi a sorozat 20. tagja (a₂₀)?',
    options: ['83', '87', '80', '76'],
    correctIndex: 0,
    explanation: 'a₂₀ = a₁ + 19 · d = 7 + 19 · 4 = 7 + 76 = 83.'
  },
  {
    id: 'seq2',
    category: 'Mértani sorozat fogalma',
    question: 'Egy mértani sorozat tagjai: 2, 6, 18, 54, ... Mennyi a hányados (q), és mennyi a következő (5.) tag?',
    options: ['q = 3, és az 5. tag: 162', 'q = 4, és az 5. tag: 72', 'q = 2, és az 5. tag: 108', 'q = 3, és az 5. tag: 216'],
    correctIndex: 0,
    explanation: 'q = 6 / 2 = 3. Az 5. tag: 54 · 3 = 162 (vagy a₅ = 2 · 3⁴ = 2 · 81 = 162).'
  },
  {
    id: 'seq3',
    category: 'Fibonacci-sorozat',
    question: 'A Fibonacci-sorozat első néhány tagja: 1, 1, 2, 3, 5, 8, 13, 21, ... Melyik szám a következő tag?',
    options: ['34 (mert 13 + 21 = 34)', '29', '30', '42'],
    correctIndex: 0,
    explanation: 'A Fibonacci-sorozat szabálya szerint minden tag az előző két tag összege: 13 + 21 = 34.'
  },
  {
    id: 'seq4',
    category: 'Explicit képlet behelyettesítése',
    question: 'Egy sorozat n-edik tagját az aₙ = n² - 2n szabály adja meg. Mennyi a sorozat 5. tagja (a₅)?',
    options: ['15', '25', '10', '23'],
    correctIndex: 0,
    explanation: 'a₅ = 5² - 2 · 5 = 25 - 10 = 15.'
  },
  {
    id: 'seq5',
    category: 'Számtani sorozat felismerése',
    question: 'Melyik sorozat SZÁMTANI SOROZAT az alábbiak közül?',
    options: [
      '12, 17, 22, 27, 32, ... (d = +5 állandó)',
      '1, 2, 4, 8, 16, ...',
      '1, 4, 9, 16, 25, ...',
      '2, 3, 5, 8, 12, ...'
    ],
    correctIndex: 0,
    explanation: 'Számtani sorozatnál a szomszédos tagok különbsége állandó: 17-12 = 5, 22-17 = 5, 27-22 = 5.'
  },
  {
    id: 'seq6',
    category: 'Sorozat és függvény kapcsolata',
    question: 'Miben különbözik egy számsorozat egy tetszőleges valós függvénytől?',
    options: [
      'A sorozat értelmezési tartománya csak a pozitív egész számok halmaza (Z⁺ = {1, 2, 3, ...}).',
      'A sorozatnak nincsenek értékei.',
      'A sorozat nem ábrázolható koordináta-rendszerben.',
      'Nincs köztük különbség.'
    ],
    correctIndex: 0,
    explanation: 'A számsorozat egy olyan speciális függvény, amelynek bemenetei csak sorszámok (1, 2, 3, ...), emiatt grafikonja mindig pontokból áll.'
  }
];

export function SequencesQuiz({ onComplete, onBack }: SequencesQuizProps) {
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-200">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 80 ? 'Sorozatok Mestere!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">11. Sorozatok kvíz befejezve</p>

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
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider">11. Fejezet • Számsorozatok</span>
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

export default SequencesQuiz;
