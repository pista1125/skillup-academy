import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Award, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Chapter5PythagorasSummaryQuizProps {
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
    id: 'pys1',
    category: 'Alapvető Pitagorasz-tétel',
    question: 'Egy derékszögű háromszög átfogója c = 26 cm, egyik befogója a = 10 cm. Mekkora a másik befogó (b)?',
    options: ['24 cm', '20 cm', '16 cm', '22 cm'],
    correctIndex: 0,
    explanation: 'b² = 26² - 10² = 676 - 100 = 576 => b = √576 = 24 cm (az 5-12-13 kétszerese).'
  },
  {
    id: 'pys2',
    category: 'Kocka testátlója',
    question: 'Egy a = 4 cm élhosszúságú kocka testátlója (D) pontosan mekkora?',
    options: ['4√3 cm (≈ 6,93 cm)', '4√2 cm', '8 cm', '12 cm'],
    correctIndex: 0,
    explanation: 'A kocka testátlójának képlete: D = a√3 = 4√3 cm.'
  },
  {
    id: 'pys3',
    category: 'Téglatest testátlója',
    question: 'Egy téglatest élei a = 2 cm, b = 3 cm, c = 6 cm. Mekkora a téglatest testátlója (D)?',
    options: ['7 cm', '11 cm', '√11 cm', '36 cm'],
    correctIndex: 0,
    explanation: 'D = √(a² + b² + c²) = √(2² + 3² + 6²) = √(4 + 9 + 36) = √49 = 7 cm.'
  },
  {
    id: 'pys4',
    category: 'Szabályos háromszög területe',
    question: 'Mennyi egy 6 cm oldalú szabályos (egyenlő oldalú) háromszög pontos területe?',
    options: ['9√3 cm² (≈ 15,59 cm²)', '18 cm²', '12√3 cm²', '36 cm²'],
    correctIndex: 0,
    explanation: 'Magasság: m = (6√3)/2 = 3√3 cm. Terület: T = (a · m)/2 = (6 · 3√3)/2 = 9√3 cm² (képlettel: T = a²√3 / 4 = 36√3 / 4 = 9√3 cm²).'
  },
  {
    id: 'pys5',
    category: 'Derékszögűség megfordítása',
    question: 'Egy háromszög oldalai 9 cm, 12 cm és 15 cm. Mi mondható el a háromszög típusáról?',
    options: [
      'Derékszögű háromszög (9² + 12² = 81 + 144 = 225 = 15²)',
      'Tompaszögű háromszög',
      'Hegyesszögű háromszög',
      'Nem szerkeszthető meg'
    ],
    correctIndex: 0,
    explanation: 'Mivel a 3-4-5 számhármas 3-szorosa: 9² + 12² = 225 = 15², a Pitagorasz-tétel megfordítása miatt a háromszög derékszögű.'
  },
  {
    id: 'pys6',
    category: '30°-60°-90° félszabályos háromszög',
    question: 'Egy derékszögű háromszög egyik hegyesszöge 30°, és az ezzel szemközti befogója 8 cm. Mennyi az átfogója és a másik befogója?',
    options: [
      'Átfogó: 16 cm, másik befogó: 8√3 cm (≈ 13,86 cm)',
      'Átfogó: 8√2 cm, másik befogó: 8 cm',
      'Átfogó: 12 cm, másik befogó: 10 cm',
      'Átfogó: 24 cm, másik befogó: 16 cm'
    ],
    correctIndex: 0,
    explanation: 'A 30°-kal szemközti oldal az átfogó fele, így c = 2 · 8 = 16 cm. A hosszabbik befogó b = a√3 = 8√3 cm.'
  },
  {
    id: 'pys7',
    category: 'Rombusz és Pitagorasz',
    question: 'Egy rombusz oldala a = 13 cm, egyik átlója e = 24 cm. Mekkora a rombusz másik átlója (f)?',
    options: ['10 cm', '5 cm', '12 cm', '20 cm'],
    correctIndex: 0,
    explanation: 'A fél átló e/2 = 12 cm. (f/2)² = 13² - 12² = 169 - 144 = 25 => f/2 = 5 cm => a teljes másik átló f = 10 cm.'
  },
  {
    id: 'pys8',
    category: 'Kör érintője',
    question: 'Egy r = 5 cm sugarú kör középpontjától d = 13 cm távolságra lévő P pontból érintőt húzunk a körhöz. Milyen hosszú az érintőszakasz (e)?',
    options: ['12 cm', '8 cm', '18 cm', '√194 cm'],
    correctIndex: 0,
    explanation: 'Az érintési pontba húzott sugár merőleges az érintőre: e² + r² = d² => e² = 13² - 5² = 169 - 25 = 144 => e = 12 cm.'
  }
];

export function Chapter5PythagorasSummaryQuiz({ onComplete, onBack }: Chapter5PythagorasSummaryQuizProps) {
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white shadow-lg shadow-amber-200">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 80 ? 'Pitagorasz Nagymester!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">V. Fejezet • Pitagorasz-tétel Témazáró Kvíz befejezve</p>

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
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">7. Fejezet • V. Fejezet Összefoglalás</span>
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

export default Chapter5PythagorasSummaryQuiz;
