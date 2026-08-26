import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Target, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpecialRightTrianglesQuizProps {
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
    id: 'srt1',
    category: '30°-60°-90° alapszabály',
    question: 'Egy 30°-60°-90°-os derékszögű háromszög átfogója c = 12 cm. Milyen hosszú a 30°-os szöggel szemközti befogó?',
    options: ['6 cm', '6√3 cm (≈ 10,39 cm)', '12√2 cm', '4 cm'],
    correctIndex: 0,
    explanation: 'A 30°-os szöggel szemközti befogó mindig pontosan fele az átfogónak: a = c / 2 = 12 / 2 = 6 cm.'
  },
  {
    id: 'srt2',
    category: '30°-60°-90° hosszabbik befogó',
    question: 'Egy 30°-60°-90°-os háromszög rövidebbik befogója a = 5 cm. Mennyi a 60°-os szöggel szemközti hosszabbik befogó pontos értéke?',
    options: ['5√3 cm (≈ 8,66 cm)', '10 cm', '5√2 cm', '15 cm'],
    correctIndex: 0,
    explanation: 'A hosszabbik befogó b = a√3 = 5√3 cm (mivel b² = c² - a² = (2a)² - a² = 3a² => b = a√3).'
  },
  {
    id: 'srt3',
    category: '45°-45°-90° oldalarányok',
    question: 'Milyen arányban állnak egymással egy 45°-45°-90°-os egyenlő szárú derékszögű háromszög oldalai (befogó : befogó : átfogó)?',
    options: ['1 : 1 : √2', '1 : √3 : 2', '3 : 4 : 5', '1 : 2 : 3'],
    correctIndex: 0,
    explanation: 'Az egyenlő szárú derékszögű háromszög oldalarányai: a : a : a√2, azaz 1 : 1 : √2.'
  },
  {
    id: 'srt4',
    category: '45°-45°-90° befogó keresése',
    question: 'Egy négyzet átlója d = 10√2 cm. Mekkora a négyzet oldala (a)?',
    options: ['10 cm', '20 cm', '5 cm', '10√3 cm'],
    correctIndex: 0,
    explanation: 'Mivel d = a√2, ezért ha d = 10√2 cm, akkor a = 10 cm.'
  },
  {
    id: 'srt5',
    category: 'Szabályos háromszög felezése',
    question: 'Egy szabályos háromszög magassága mentén félbevágva milyen típusú derékszögű háromszöget kapunk?',
    options: [
      '30°-60°-90°-os félszabályos háromszöget',
      '45°-45°-90°-os háromszöget',
      'Tompaszögű háromszöget',
      '3-4-5-ös háromszöget'
    ],
    correctIndex: 0,
    explanation: 'A 60°-os belső szöget a magasság 30°-30°-ra felezi, a másik szög 60°, az alapnál lévő szög pedig 90°, így 30°-60°-90°-os háromszög jön létre.'
  },
  {
    id: 'srt6',
    category: 'Gyakorlati feladat',
    question: 'Egy létra 60°-os szöget zár be a vízszintes talajjal, és 4 méter magasan éri el a falat. Ha a létra a falnál 30°-os szöget zár be, milyen arányban van a létra hossza a faltól mért távolsághoz képest?',
    options: [
      'A létra hossza pontosan kétszerese a faltól mért távolságnak (2 : 1).',
      'A létra hossza háromszorosa a távolságnak.',
      'Egyenlő a kettő (1 : 1).',
      'Nem határozható meg.'
    ],
    correctIndex: 0,
    explanation: 'A 30°-os szög a falnál van, tehát a talajon lévő távolság a 30°-kal szemközti befogó, ami pontosan a fele az átfogónak (létrának).'
  }
];

export function SpecialRightTrianglesQuiz({ onComplete, onBack }: SpecialRightTrianglesQuizProps) {
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 80 ? 'Nevezetes Háromszög Bajnok!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">6. Nevezetes derékszögű háromszögek kvíz befejezve</p>

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
          <span className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-800 rounded-full border border-indigo-200">
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
            <Target className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">6. Fejezet • Nevezetes Háromszögek</span>
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

export default SpecialRightTrianglesQuiz;
