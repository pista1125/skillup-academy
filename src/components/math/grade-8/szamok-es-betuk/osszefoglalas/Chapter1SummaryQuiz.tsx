import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Award, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Chapter1SummaryQuizProps {
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
    id: 'sum1',
    category: '1. Logika',
    question: 'Mi a helyes tagadása a következőnek: „Minden páros szám osztható 4-gyel.”?',
    options: [
      'Egyetlen páros szám sem osztható 4-gyel.',
      'Van olyan páros szám, amely nem osztható 4-gyel.',
      'Minden páratlan szám osztható 4-gyel.',
      'A páros számok fele nem osztható 4-gyel.'
    ],
    correctIndex: 1,
    explanation: 'A „Minden...” állítás tagadása: „Van olyan..., amely nem...”. (Pl. a 6 páros, de nem osztható 4-gyel).'
  },
  {
    id: 'sum2',
    category: '2-3. Halmazok',
    question: 'Ha |A| = 12, |B| = 15 és |A ∩ B| = 5, akkor hány eleme van az A ∪ B egyesítésnek?',
    options: ['22', '27', '17', '32'],
    correctIndex: 0,
    explanation: 'Szita-formula: |A ∪ B| = |A| + |B| - |A ∩ B| = 12 + 15 - 5 = 22.'
  },
  {
    id: 'sum3',
    category: '4. Racionális számok',
    question: 'Melyik szám irracionális az alábbiak közül?',
    options: ['-4/7', '0,̇3 (0,333...)', '√18', '√144'],
    correctIndex: 2,
    explanation: 'A √18 = 3√2 nem írható fel két egész hányadosaként (irracionális). A √144 = 12 racionális.'
  },
  {
    id: 'sum4',
    category: '5. Műveletek',
    question: 'Mennyi a [-12 + (-4) · (-3)] : (-2) kifejezés értéke?',
    options: ['0', '-12', '12', '-6'],
    correctIndex: 0,
    explanation: '(-4) · (-3) = +12. A szögletes zárójelben: -12 + 12 = 0. Végül: 0 : (-2) = 0.'
  },
  {
    id: 'sum5',
    category: '6. Hatványozás',
    question: 'Egyszerűsítsd a (3⁴ · 3⁻²)³ hatványkifejezést!',
    options: ['3⁶ (= 729)', '3⁵', '3⁻²⁴', '9⁶'],
    correctIndex: 0,
    explanation: 'A zárójelben: 3⁴ · 3⁻² = 3⁴⁺⁽⁻²⁾ = 3². Hatvány hatványozása: (3²)³ = 3²·³ = 3⁶ = 729.'
  },
  {
    id: 'sum6',
    category: '6. Normálalak',
    question: 'Mennyi a (6 · 10⁸) : (3 · 10⁻³) hányados normálalakban?',
    options: ['2 · 10⁵', '2 · 10¹¹', '3 · 10¹¹', '2 · 10⁻²⁴'],
    correctIndex: 1,
    explanation: '(6 : 3) · 10⁸⁻⁽⁻³⁾ = 2 · 10⁸⁺³ = 2 · 10¹¹.'
  },
  {
    id: 'sum7',
    category: '7-8. Négyzetgyök',
    question: 'Számítsd ki a √50 - √18 kifejezés egyszerűsített értékét!',
    options: ['√32', '2√2', '4√2', '√2'],
    correctIndex: 1,
    explanation: '√50 = 5√2 és √18 = 3√2. A különbség: 5√2 - 3√2 = 2√2.'
  },
  {
    id: 'sum8',
    category: '7. Gyök definíció',
    question: 'Melyik állítás HAMIS a négyzetgyökről a valós számok körében?',
    options: [
      '√(a²) = |a| minden valós a számra.',
      '√(ab) = √a · √b ha a ≥ 0 és b ≥ 0.',
      '√(a + b) = √a + √b minden a, b ≥ 0 számra.',
      '√a ≥ 0 minden értelmezett a-ra.'
    ],
    correctIndex: 2,
    explanation: 'A gyökvonás NEM bontható szét összegre! Pl. √(9+16) = √25 = 5 ≠ 3+4 = 7.'
  },
  {
    id: 'sum9',
    category: '9. Helyettesítési érték',
    question: 'Mennyi a 3x² - 4x + 1 értéke, ha x = -3?',
    options: ['40', '-14', '46', '28'],
    correctIndex: 0,
    explanation: '3 · (-3)² - 4 · (-3) + 1 = 3 · 9 + 12 + 1 = 27 + 12 + 1 = 40.'
  },
  {
    id: 'sum10',
    category: '10. Kiemelés',
    question: 'Alakítsd szorzattá: 6x³ - 9x² = ?',
    options: ['3x²(2x - 3)', '3x(2x² - 3x)', 'x²(6x - 9)', '3x²(2x + 3)'],
    correctIndex: 0,
    explanation: 'A legnagyobb közös szorzótényező a 3x², kiemelve: 3x²(2x - 3).'
  },
  {
    id: 'sum11',
    category: '11. Nevezetes azonosság',
    question: 'Mennyi a (3x - 4y)² kifejezés kifejtett alakja?',
    options: [
      '9x² - 16y²',
      '9x² - 24xy + 16y²',
      '9x² - 12xy + 16y²',
      '6x² - 24xy + 8y²'
    ],
    correctIndex: 1,
    explanation: '(a - b)² = a² - 2ab + b² => (3x)² - 2·(3x)·(4y) + (4y)² = 9x² - 24xy + 16y².'
  },
  {
    id: 'sum12',
    category: '11. Négyzetek különbsége',
    question: 'Alakítsd szorzattá: 25a² - 49 = ?',
    options: [
      '(5a - 7)²',
      '(5a + 7)(5a - 7)',
      '(25a - 7)(a + 7)',
      '(5a + 7)²'
    ],
    correctIndex: 1,
    explanation: 'a² - b² = (a + b)(a - b). Mivel 25a² = (5a)² és 49 = 7², a szorzat: (5a + 7)(5a - 7).'
  }
];

export function Chapter1SummaryQuiz({ onComplete, onBack }: Chapter1SummaryQuizProps) {
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-200">
            <Award className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 85 ? 'Kiemelkedő Témazáró Eredmény! 🏆' : percentage >= 65 ? 'Szép eredmény! 👏' : 'Érdemes még ismételned! 📚'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">I. Számok és betűk átfogó témazáró kvíz befejezve</p>

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
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">12. Fejezet • Átfogó Összefoglalás</span>
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

export default Chapter1SummaryQuiz;
