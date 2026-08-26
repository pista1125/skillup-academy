import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Award, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Chapter7SolidsSummaryQuizProps {
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
    id: 'c7s1',
    category: 'Négyzet alapú gúla térfogata',
    question: 'Egy szabályos négyzet alapú gúla alapéle a = 9 cm, testmagassága m = 8 cm. Mennyi a térfogata?',
    options: ['216 cm³', '648 cm³', '108 cm³', '72 cm³'],
    correctIndex: 0,
    explanation: 'Alapterület: Tₐ = 9² = 81 cm². Térfogat: V = (81 · 8) / 3 = 27 · 8 = 216 cm³.'
  },
  {
    id: 'c7s2',
    category: 'Gömb felszíne',
    question: 'Egy gömb sugara r = 10 cm. Mennyi a felszíne (π ≈ 3,14)?',
    options: ['1256 cm²', '314 cm²', '4187 cm²', '628 cm²'],
    correctIndex: 0,
    explanation: 'A = 4 · π · r² = 4 · 3,14 · 100 = 1256 cm².'
  },
  {
    id: 'c7s3',
    category: 'Gúla és hasáb aránya',
    question: 'Egy hasáb térfogata 450 cm³. Mekkora az azonos alapterületű és magasságú gúla térfogata?',
    options: ['150 cm³ (a harmada)', '225 cm³', '900 cm³', '1350 cm³'],
    correctIndex: 0,
    explanation: 'V_gúla = V_hasáb / 3 = 450 / 3 = 150 cm³.'
  },
  {
    id: 'c7s4',
    category: 'Pitagorasz-tétel a gúlában',
    question: 'Egy szabályos négyzet alapú gúla alapéle 16 cm (fele 8 cm), oldalmagassága 17 cm. Milyen magas a gúla (m)?',
    options: ['15 cm', '12 cm', '10 cm', '9 cm'],
    correctIndex: 0,
    explanation: 'm = √(mₒ² - (a/2)²) = √(17² - 8²) = √(289 - 64) = √225 = 15 cm.'
  },
  {
    id: 'c7s5',
    category: 'Föld Egyenlítőjének hossza',
    question: 'Hozzávetőlegesen mekkora a Föld Egyenlítőjének kerülete?',
    options: ['kb. 40 000 km', 'kb. 6 370 km', 'kb. 12 740 km', 'kb. 510 000 km'],
    correctIndex: 0,
    explanation: 'A Föld sugara R ≈ 6370 km, az Egyenlítő kerülete K = 2πR ≈ 40 000 km.'
  },
  {
    id: 'c7s6',
    category: 'Henger térfogata',
    question: 'Egy egyenes körhenger sugara r = 4 cm, magassága m = 5 cm. Mennyi a térfogata (π ≈ 3,14)?',
    options: ['80π ≈ 251,2 cm³', '20π ≈ 62,8 cm³', '40π ≈ 125,6 cm³', '160π cm³'],
    correctIndex: 0,
    explanation: 'V = r² · π · m = 4² · π · 5 = 16 · 5 · π = 80π ≈ 251,2 cm³.'
  },
  {
    id: 'c7s7',
    category: 'Gömb és köré írt henger',
    question: 'Arkhimédész híres tétele szerint egy 2r magasságú és r sugarú henger térfogatának hányadrésze a belé írható gömb térfogata?',
    options: ['2/3 része', '1/2 része', '3/4 része', '1/3 része'],
    correctIndex: 0,
    explanation: 'V_henger = r²π · 2r = 2πr³. V_gömb = (4/3)πr³ = (2/3) · (2πr³) = (2/3) · V_henger.'
  },
  {
    id: 'c7s8',
    category: 'Mértékegység átváltás',
    question: 'Hány dm³ 0,08 m³?',
    options: ['80 dm³ (80 liter)', '8 dm³', '800 dm³', '0,8 dm³'],
    correctIndex: 0,
    explanation: '1 m³ = 1000 dm³, így 0,08 m³ = 0,08 · 1000 = 80 dm³.'
  }
];

export function Chapter7SolidsSummaryQuiz({ onComplete, onBack }: Chapter7SolidsSummaryQuizProps) {
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 80 ? 'Testek Nagymester!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">VII. Fejezet • Testek Témazáró Kvíz befejezve</p>

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
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">6. Fejezet • VII. Fejezet Összefoglalás</span>
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

export default Chapter7SolidsSummaryQuiz;
